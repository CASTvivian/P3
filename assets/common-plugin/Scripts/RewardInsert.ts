import { utils } from "./Utils";
import QCrossWidgetItem from "./QCrossWidgetItem";
import AldUtils from "./AldUtils";
import { SubLocation } from "./YZ_Constant";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

/**
 * 激励插屏
 */
@ccclass
export default class RewardInsert extends cc.Component {

    private _jumpList: any = null;
    private _items: QCrossWidgetItem[] = [];
    public isShow: boolean = false;

    _panel: cc.Node = null;
    _mask: cc.Node = null;

    onLoad() {

        cc.game.addPersistRootNode(this.node);
        this._mask = this.node.getChildByName("Mask");

        this._panel = this.node.getChildByName("Panel");
        for (let i = 0; i < 6; i++) {
            let item: cc.Node = this._panel.getChildByName(`Item${i}`);
            let qcrossWidgetItem: QCrossWidgetItem = item.getComponent("QCrossWidgetItem");
            qcrossWidgetItem._location = SubLocation.isReward;
            this._items.push(qcrossWidgetItem);
        }

        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this._panel.scale = ratio;
    }

    start() {
        this._jumpList = utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        } else {
            cc.warn("交叉推广数据为null,激励插屏组件不显示!");
            utils.adManager.videoCallBack && utils.adManager.videoCallBack(false, "激励组件加载失败！");
            utils.adManager.videoCallBack = null;
            this.node.destroy();
        }
    }

    private _initWidget() {
        let idx: number = 0;
        for (let i = 0; i < this._jumpList.length; i++) {
            let data: any = this._jumpList[i];
            if (data && data.logo) {
                let itemIdx: number = idx;
                if (itemIdx >= this._items.length) {
                    return;
                }
                idx++;
                this._items[itemIdx].init(data);
            }
        }
    }

    public hide() {

        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        this._panel.active = false;
        this._mask.active = false;
        // })));
    }

    public onCloseBtnHandler(event: any, data: any) {
        this.hide();
        utils.adManager.videoCallBack && utils.adManager.videoCallBack(false, "未点击试玩奖励！");
        utils.adManager.videoCallBack = null;
    }

    update(dt: number) {
        if (!this.isShow) {
            utils.showLog("show insertReward>>>>>");

            AldUtils.SendEvent("显示激励插屏");
            this.isShow = true;
            this._panel.active = true;
            this._mask.active = true;
        }
    }
}
