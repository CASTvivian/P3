import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_BaiduRecommendWidget extends cc.Component {

    _widget: cc.Widget = null;

    onLoad() {
        this._widget = this.getComponent(cc.Widget);
    }

    onEnable() {
        this.getComponent(cc.Sprite).enabled = false;
        if (!PlatUtils.IsBaidu || !(PlatUtils.IsBaidu && utils.Tool_Baidu && utils.Tool_Baidu.canShowRecommendButton())) {
            utils.showLog("不支持交叉推广组件!");
            this.node.destroy();
        } else {
            if (PlatUtils.IsBaidu && utils.Tool_Baidu && utils.Tool_Baidu.canShowRecommendButton()) {
                if (this._widget) {
                    utils.Tool_Baidu.showRecommendationButton(CompatibleTool.position(this._widget.left, this._widget.top));
                } else {
                    utils.showLog("baidu recommend button widget component is null");
                }
            }
        }
    }

    onDisable() {
        if (PlatUtils.IsBaidu && utils.Tool_Baidu && utils.Tool_Baidu.canShowRecommendButton()) {
        }
    }
}
