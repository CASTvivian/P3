import { utils } from "./Utils";
import RecommendGamesNode from "./RecommendGamesNode";
import { SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecommendGamesWidget extends cc.Component {

    _recommendNode: RecommendGamesNode = null;
    _isInit: boolean = false;

    onLoad() {
        this._recommendNode = this.getComponentInChildren("RecommendGamesNode");
        this._recommendNode.node.active = false;
    }

    onEnable() {
        utils.registerServerInitEvent(() => {
            this._initWidget();
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }

    _initWidget() {
        if (this._isInit) return;

        let valid: boolean = true;

        if (utils.isShowRecommondGamesList()) {
            if (PlatUtils.IsDouyin) {
                if (!utils.Tool_Douyin.isShowMoreGamesModal()) {
                    this.node.destroy();
                }
            }
            let data: any = utils.getRecommondGameList();
            if (data) {
                if (data.length > 0) {
                    this._isInit = true;
                    this._recommendNode.init(data);
                    this._recommendNode.node.active = true;

                } else {
                    cc.warn("交叉推广数据长度为0");
                    valid = false;
                }
            } else {
                cc.warn("交叉推广数据为null!");
                valid = false;
            }
        }

        if (!valid) {
            this.node.destroy();
        }
    }
}
