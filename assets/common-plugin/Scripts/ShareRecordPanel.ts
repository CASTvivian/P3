import { utils } from "./Utils";
import { YZ_Reward, BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import GameItem from "./GameItem";
import QCrossWidgetItem from "./QCrossWidgetItem";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

/**
 * 分享录屏面板
 */
@ccclass
export default class ShareRecordPanel extends cc.Component {

    bg: cc.Node = null;
    btnOk: cc.Node = null;
    btnCancel: cc.Node = null;
    glodNode: cc.Node = null;
    glodLabel: cc.Label = null;
    sharePanel: cc.Node = null;
    RecPanel: cc.Node = null;



    _panel: cc.Node = null;
    _gameList: cc.Node = null;
    _originScale: number = 1;

    _gameItems: GameItem[] = [];
    _jumpList: any = null;
    _dataDirty: boolean = false;


    _star: cc.Node = null;
    private gameItemNode: cc.Node = null;

    /**
     * 奖励回调
     */
    rewardCallFunc: Function = null;

    /**
     * 奖励值
     */
    rewardValue: number = 0;


    onLoad() {
        utils.SendEvent("结算前广告-分享弹窗-展示成功！");

        this.rewardValue = utils.rewardValue;

        this.rewardCallFunc = utils.rewardCallFunc;
        this.initUi();

        if (cc.winSize.height < cc.winSize.width) {
            utils.adManager.HideBanner(BannerLocation.Game);
        } else {
            utils.adManager.ShowBanner(BannerLocation.Game);
        }

        if (PlatUtils.IsOPPO) {
            if (utils.ServerConfig.st_recomment_is_hide_banner && utils.ServerConfig.st_recomment_is_hide_banner == "true") {
                utils.showLog("服务器配置显示互推后隐藏banner >>>");
                utils.adManager.HideBanner(BannerLocation.Game);
                utils.adManager.HideBanner(BannerLocation.Over);
            }
        }

    }

    /**
     * 初始化UI
     */
    protected initUi(): void {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        this.bg = this.node.getChildByName("Bg");
        this.sharePanel = this.bg.getChildByName("SharePanel");
        this.RecPanel = this.bg.getChildByName("RecPanel");

        if (!PlatUtils.IsOPPO) {
            this.sharePanel.active = true;
            this.RecPanel.active = false;
            this.btnCancel = this.sharePanel.getChildByName("btnCancel");
            this.btnOk = this.sharePanel.getChildByName("btnOk");
            this.glodNode = this.sharePanel.getChildByName("rewardNode");
            this.glodLabel = this.glodNode.getChildByName("goldLbl").getComponent(cc.Label);

            utils.showSkipBtn(this.btnCancel);
            this.glodLabel.string = "/" + this.rewardValue;
            if (this.rewardValue == 0) {
                this.glodNode.active = false;
            }
        } else {
            this.sharePanel.active = false;
            this.RecPanel.active = true;
            this.btnCancel = this.RecPanel.getChildByName("btnCancel");

            this._gameList = this.RecPanel.getChildByName("PageView").getComponent(cc.PageView).content.getChildByName("Panel");
            this.gameItemNode = this._gameList.children[0];
            this._initRecPanel();
            utils.showSkipBtn(this.btnCancel);
        }
    }

    private _initRecPanel() {
        this._gameList.removeAllChildren();
        this._jumpList = utils.getRecommondGameList();

        for (let i = 0; i < this._jumpList.length; i++) {
            let data: any = this._jumpList[i];
            if (data && data.logo) {
                let tempNode = cc.instantiate(this.gameItemNode);
                let qcrossWidgetItem: QCrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = SubLocation.isMoreGame;
                qcrossWidgetItem.init(data);
                this._gameList.addChild(tempNode);
            }
        }
    }

    onDestroy() {
        utils.adManager.HideBanner(BannerLocation.Game)
        if (utils.shareRecordPanelCloseFunc) {
            utils.shareRecordPanelCloseFunc();
            utils.shareRecordPanelCloseFunc = null;;
        } else {
            utils.rewardCloseFunc && utils.rewardCloseFunc();
            utils.rewardCloseFunc = null;
        }

    }

    onClose() {
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
            this.node.destroy();
        })));
    }

    onEnable() {
        this.bg.scale = 0;
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        } else {
            ratio = cc.winSize.width / 1080;
        }
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()), cc.callFunc(() => {
            if (this.glodNode && this.glodNode.active == true) {
                this.glodNode.runAction(cc.sequence(
                    cc.moveBy(0.3, CompatibleTool.position(0, +50)),
                    cc.moveBy(0.3, CompatibleTool.position(0, -50))
                ).repeatForever());
            }
        })));
    }



    // /**
    // * 初始化事件回调
    // * @param closeCallFunc 
    // * @param rewardCallFunc 
    // */
    // init(closeCallFunc: Function, rewardCallFunc: Function, reward: number) {
    //     this.closeCallFunc = closeCallFunc;
    //     this.rewardCallFunc = rewardCallFunc;
    //     this.rewardValue = reward;
    // }



    onCancelClickListener() {
        if (PlatUtils.IsDouyin && utils.ServerConfig && utils.ServerConfig.cancel_btn_is_share && utils.ServerConfig.cancel_btn_is_share == "true") {
            utils.showLog("服务器配置取消按钮也会触发分享！");
            utils.share(this.rewardFunc.bind(this));
        } else {
            this.onClose();
        }
    }

    onOkBtnClickListener() {
        utils.share(this.rewardFunc.bind(this));
    }

    // /**
    //  * 初始化监听事件
    //  */
    // protected initListener(): void {
    //     console.log("this.btnCancel", this.btnCancel);
    //     this.btnCancel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
    //         this.btnCancel.runAction(cc.sequence(cc.scaleTo(0.1, 0.85), cc.scaleTo(0.1, 1), cc.callFunc(() => {
    //             // if (utils.Tool_Douyin) {
    //             if (PlatUtils.IsDouyin && utils.ServerConfig && utils.ServerConfig.cancel_btn_is_share && utils.ServerConfig.cancel_btn_is_share == "true") {
    //                 utils.showLog("服务器配置取消按钮也会触发分享！");
    //                 utils.share(this.rewardFunc.bind(this));
    //             } else {
    //                 this.onClose();
    //             }
    //             // }

    //         })));
    //     });

    //     this.btnOk && this.btnOk.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
    //         this.btnOk.runAction(cc.sequence(cc.scaleTo(0.1, 0.85), cc.scaleTo(0.1, 1), cc.callFunc(() => {
    //             utils.share(this.rewardFunc.bind(this));
    //         })));
    //     })
    // }


    /**
     * 分享回调
     * @param ret 
     * @param msg 
     */
    rewardFunc(ret, msg) {
        if (ret) {
            utils.SendEvent("结算前广告-分享弹窗-分享成功！");
            let result: YZ_Reward = new YZ_Reward();
            result.rewardValue = this.rewardValue;
            utils.showMsg("分享成功！奖励：+" + this.rewardValue);
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        } else {
            utils.SendEvent("结算前广告-分享弹窗-分享失败！");
            utils.showMsg(msg ? msg : "分享失败！");
            this.onClose();
        }
    }


    /**
     * 初始化数据
     */
    protected initData(): void {

    }

    // update (dt) {}
}
