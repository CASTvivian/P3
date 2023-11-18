import { utils } from "./Utils";
import { BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { YzRedBagInfo } from "./CommonConfig";

const { ccclass, property } = cc._decorator;


@ccclass
export default class OpenRedBagPanel extends cc.Component {

    private _panel: cc.Node = null;
    private _moneyLbl: cc.Label = null;
    private _totalMoneyLbl: cc.Label = null;
    private _openPanel: cc.Node = null;
    private _rewardPanel: cc.Node = null;
    private _btnOpen: cc.Node = null;

    private _redBagInfo: YzRedBagInfo = null;

    private _btnClose: cc.Node = null;

    private _btnVideoOpen: cc.Node = null;

    private _title: cc.Node = null;
    private _btnDouble: cc.Node = null;

    private _proInfo: any = null;

    // _location: SubLocation = SubLocation.isMoreGame;

    onLoad() {


        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }

        if (!PlatUtils.IsNativeAndroid) {
            utils.adManager.HideBanner(BannerLocation.Home);
        }

        this._panel = this.node.getChildByName("Panel");
        this._openPanel = this._panel.getChildByName("onOpenPanel");

        this._openPanel.setScale(0.5);
        this._openPanel.runAction(cc.scaleTo(0.3, 1));


        this._rewardPanel = this._panel.getChildByName("rewardPanel");
        this._btnOpen = this._openPanel.getChildByName("btnOpen");
        this._btnClose = this._panel.getChildByName("btnClose");
        this._btnVideoOpen = this._btnOpen.getChildByName("btn_openVideo");
        this._title = this._openPanel.getChildByName("title");


        this._totalMoneyLbl = this._rewardPanel.getChildByName("totalMoneyLabel").getComponent(cc.Label);
        this._moneyLbl = this._rewardPanel.getChildByName("moneyLbl").getComponent(cc.Label);
        this._btnDouble = this._rewardPanel.getChildByName("btnDouble");
        setTimeout(() => {
            this._btnOpen.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }, 500);



        this._redBagInfo = utils.yzRedBagInfo;
        this._proInfo = utils.yzRedBagInfo.curProgressInfo;
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this._panel.scale = ratio;
        this.init();
    }


    _money: number = 0;
    openRedBag() {

        if (this._redBagInfo.progress < this._redBagInfo.totalProgress && !this._redBagInfo.isFreeRedBag && this._redBagInfo.freeRedBagCount <= 0) return;
        this._btnClose.opacity = 0;
        this._btnClose.active = true;
        let timeout: number = utils.ServerConfig.red_bag_close_btn_show_delay ? utils.ServerConfig.red_bag_close_btn_show_delay : 0;
        setTimeout(() => {
            utils.showLog("拆红包关闭按钮延迟显示 " + timeout + "秒显示！");
            this._btnClose.runAction(cc.fadeIn(0.3));
        }, timeout * 1000)

        setTimeout(() => {
            this._btnDouble.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }, 500);
        if (this._canShowVideoOpen) {

            utils.adManager.ShowVideo((res, msg) => {
                if (res) {
                    utils.SendEvent('拆红包弹窗-视频拆红包成功！');
                    this.scheduleOnce(() => {
                        this.showRedBag();
                    })
                } else {
                    this._btnClose.runAction(cc.fadeIn(0.3));
                    utils.SendEvent('拆红包弹窗-视频拆红包失败！');
                    utils.showMsg(msg ? msg : "视频加载失败！");
                }
            })
        } else {
            this.showRedBag();
        }
    }

    showRedBag() {
        let money = 0;

        let proInfo = this._proInfo;
        cc.log("proInfo ", JSON.stringify(proInfo));
        money = parseFloat((Math.random() * (proInfo.max_money - proInfo.min_money) + proInfo.min_money).toFixed(3));
        cc.log("红包金额：" + money);
        // let max = this._redBagInfo.withdrawaMoneys[0];
        // if (this._redBagInfo.balance <= 0) {
        //     money = parseFloat((Math.random() * (max / 4)).toFixed(3));
        // } else if (this._redBagInfo.balance <= (max / 2.8)) {
        //     money = parseFloat((Math.random() * (max / 5)).toFixed(3));
        // } else if (this._redBagInfo.balance >= (max - 1)) {
        //     money = Math.random();
        //     money = parseFloat((money * 0.01 + 0.001).toFixed(3))
        // } else if (this._redBagInfo.balance >= max - 2) {
        //     money = Math.random();
        //     money = parseFloat((money * 0.01 + 0.001).toFixed(3))
        // } else {
        //     money = Math.random();
        //     if (money > 0.1) {
        //         money = parseFloat((money * 0.1).toFixed(3))
        //     } else {
        //         money = parseFloat(money.toFixed(3));
        //     }
        // }
        // utils.SendEvent("拆红包弹窗-获得红包：" + money + "元");
        this._money = money;
        this._redBagInfo.balance = parseFloat((this._redBagInfo.balance + money).toFixed(3));

        if (this._redBagInfo.isFreeRedBag && this._show_type == 1) {
            this._redBagInfo.lastOpenFreeRedBagTime = new Date().toDateString();
        }

        if (this._show_type == 2) {
            this._redBagInfo.progress -= this._redBagInfo.totalProgress;
        }

        this._redBagInfo.totalMoney = parseFloat((this._redBagInfo.totalMoney + money).toFixed(3));


        this._moneyLbl.string = `¥${money}元`
        this._totalMoneyLbl.string = `累计获得现金${this._redBagInfo.totalMoney}元`
        this._rewardPanel.scaleX = 0;
        this._rewardPanel.active = true;
        this._openPanel.runAction(cc.sequence(cc.scaleTo(0.3, 0, 1), cc.callFunc(() => {
            this._openPanel.active = false;
            this._rewardPanel.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.callFunc(() => {
            })))
        })))
        if (utils.currentLevel > parseInt(this._redBagInfo.lastOpenLevel) && this._show_type == 2) {
            this._redBagInfo.lastOpenLevel = utils.currentLevel.toString();
        }


    }

    onBtnDoubleMoney(event, data) {
        utils.SendEvent("拆红包弹窗-点击视频双倍领取");
        utils.adManager.ShowVideo((ret, msg) => {
            if (ret) {
                this._redBagInfo.balance = parseFloat((this._redBagInfo.balance + this._money).toFixed(3));
                this._redBagInfo.totalMoney = parseFloat((this._redBagInfo.totalMoney + this._money).toFixed(3));

                this._totalMoneyLbl.string = `累计获得现金${this._redBagInfo.totalMoney}元`
                utils.showMsg("领取双倍红包成功！");
                utils.SendEvent("拆红包弹窗-视频双倍领取成功");
                event.target.active = false;
            } else {
                utils.showMsg(msg);
                utils.SendEvent("拆红包弹窗-视频双倍领取失败");
            }
        })
    }


    showWithDrawalPanel() {
        utils.SendEvent("拆红包弹窗-点击提现上报");
        utils.showWithdrawalPanel();
    }
    // update() {
    //     if (this._dataDirty) {
    //         this._dataDirty = false;
    //         this._updatePanel();
    //     }
    // }

    _canShowVideoOpen: boolean = false;
    public init() {
        utils.SendEvent("拆红包弹窗-展示成功！" + this._show_type + " :" + this._redBagInfo.isFreeRedBag);

        this._title.children[0].active = this._show_type == 1 && this._redBagInfo.isFreeRedBag;
        this._title.children[1].active = this._show_type == 2;
        this._title.children[2].active = this._show_type == 3;

        if (this._proInfo.type == 2 && this._show_type == 2) {
            this._canShowVideoOpen = true;
            this._btnVideoOpen.active = true;
        } else {
            this._canShowVideoOpen = false;
            this._btnVideoOpen.active = false;
        }

        // utils.ServerConfig.red_bag_open_view_close_btn_show_delay = 1;
        if (utils.ServerConfig.red_bag_open_view_close_btn_show_delay && utils.ServerConfig.red_bag_open_view_close_btn_show_delay > 0) {
            this._btnClose.opacity = 0;
            let timeout: number = utils.ServerConfig.red_bag_open_view_close_btn_show_delay ? utils.ServerConfig.red_bag_open_view_close_btn_show_delay : 0;
            setTimeout(() => {
                utils.showLog("拆红包关闭按钮延迟显示 " + timeout + "秒显示！");
                this._btnClose.runAction(cc.fadeIn(0.3));
            }, timeout * 1000)
        } else {
            if (this._redBagInfo.progress < this._redBagInfo.totalProgress && !this._redBagInfo.isFreeRedBag && this._redBagInfo.freeRedBagCount <= 0) {
                this._btnOpen.children[0].active = true;
                this._btnOpen.children[1].getComponent(cc.Button).enableAutoGrayEffect = true;
                this._btnClose.opacity = 0;
                let timeout: number = utils.ServerConfig.red_bag_close_btn_show_delay ? utils.ServerConfig.red_bag_close_btn_show_delay : 0;
                setTimeout(() => {
                    utils.showLog("拆红包关闭按钮延迟显示 " + timeout + "秒显示！");
                    this._btnClose.runAction(cc.fadeIn(0.3));
                }, timeout * 1000)
            } else {
                this._btnClose.active = false;
            }
        }

        this._totalMoneyLbl.string = `累计获得现金${this._redBagInfo.totalMoney}元`;
    }

    _show_type: number = 1; // 1、每日红包 2、闯关红包 3、现金红包
    initData(showType: number) {
        this._show_type = showType;
    }

    public show() {
        this.node.active = true;
    }


    public hide() {
        // console.log(utils.rewardCloseFunc, "<<callFUnc");
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        this.node.active = false;
        utils.rewardCloseFunc && utils.rewardCloseFunc();
        if (utils.rewardCloseFunc) {
            utils.rewardCloseFunc = null;
        }
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    }

    public onCloseBtnHandler(event: any, data: any) {
        this.hide();
    }
}
