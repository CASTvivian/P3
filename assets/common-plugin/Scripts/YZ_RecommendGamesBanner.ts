import { utils } from "./Utils";
import YZ_ListView from "./YZ_ListView";
import PlatUtils from "./PlatUtils";
import { SubLocation } from "./YZ_Constant";


const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_RecommendGamesBanner extends cc.Component {

    _listView: YZ_ListView = null;

    _isInit: boolean = false;

    closeBtn: cc.Node = null;


    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        this._listView = this.getComponentInChildren("YZ_ListView");
        this._listView.node.active = false;
        this.closeBtn = cc.find("bg/close", this.node);
    }

    onEnable() {
        utils.registerServerInitEvent(() => {
            this._initWidget();
            this.closeBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.node.destroy();
            });
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
        this.closeBtn.targetOff(this);
    }

    _initWidget() {
        if (this._isInit) return;

        if (utils.isShowRecommondGamesBanner()) {
            let data: any = utils.getRecommondGameList();
            if (data) {
                if (data.length > 0) {
                    if (data.length >= 6) {
                        this._isInit = true;
                        this._listView.init(data);
                        this._listView.node.active = true;
                        utils.postRecommentShowData(SubLocation.isYzBanner);

                        if (PlatUtils.IsOPPO) {
                            utils.oppoTool.countYzBannerShowCount();
                            utils.adManager.hideKyxBanner();
                        }
                    } else {
                        cc.warn("交叉推广数据长度小于6");
                    }
                } else {
                    cc.warn("交叉推广数据长度为0");
                }
            } else {
                cc.warn("交叉推广数据为null!");
            }
        } else {
            this.node.destroy();
        }
    }
}
