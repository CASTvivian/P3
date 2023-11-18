import GameItem from "./GameItem";
import QCrossWidgetItem from "./QCrossWidgetItem";
import { utils } from "./Utils";
import { BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";
import { YzRedBagInfo } from "./CommonConfig";

const { ccclass, property } = cc._decorator;


@ccclass
export default class WithdrawalPanel extends cc.Component {

    private _closeBtn: cc.Node = null;
    private _withdrawalBtn: cc.Node = null;
    private _moneyItemNodes: cc.Node[] = null;
    private _panel: cc.Node = null;
    private _balanceLbl: cc.Label = null;

    private _redBagInfo: YzRedBagInfo = null;


    _location: SubLocation = SubLocation.isMoreGame;

    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");
        this._moneyItemNodes = this._panel.getChildByName("WithdrawalPriceNodes").children;
        this._balanceLbl = this._panel.getChildByName("balanceLabel").getComponent(cc.Label);
        // this.node.active = false;

        this._redBagInfo = utils.yzRedBagInfo;

        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this._panel.scale = ratio;
        this._initWidget();
    }



    private _initWidget() {

        if (this._redBagInfo.balance > 0) {
            this._balanceLbl.string = `${this._redBagInfo.balance}元`
        }
        for (let i = 0; i < 4; i++) {
            let data: any = utils.yzRedBagInfo.withdrawaMoneys[i];
            if (data) {
                this._moneyItemNodes[i].getChildByName("PriceLbl").getComponent(cc.Label).string = `${data}元`
                this._moneyItemNodes[i].on(cc.Node.EventType.TOUCH_START, () => {
                    this.selectedMoneyNode(i)
                }, this);
            }
        }
    }

    _selectedMoneyItemIndex: number = -1;
    selectedMoneyNode(itemIndex) {


        if (this._redBagInfo.balance >= utils.yzRedBagInfo.withdrawaMoneys[itemIndex]) {
            this._selectedMoneyItemIndex = itemIndex;

            this._moneyItemNodes.forEach((element, index) => {
                if (itemIndex != index) {
                    this._moneyItemNodes[index].getChildByName("selectedBg").active = false;
                }
            });
            this._moneyItemNodes[itemIndex].getChildByName("selectedBg").active = true;
        } else {
            utils.showMsg("当前余额不足！");
        }
    }

    withDrawalMoney() {
        console.log("money");
        if (this._selectedMoneyItemIndex > -1) {

        } else {
            utils.showMsg("请选择要提现的金额！");
        }
    }

    // update() {
    //     if (this._dataDirty) {
    //         this._dataDirty = false;
    //         this._updatePanel();
    //     }
    // }

    _updatePanel() {
        utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    }

    public init(YzRedBagInfo: YzRedBagInfo) {

    }

    public show() {
        this.node.active = true;
    }

    public hide() {
        let self = this;
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        self.node.active = false;
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    }

    public onCloseBtnHandler(event: any, data: any) {
        this.hide();
    }
}
