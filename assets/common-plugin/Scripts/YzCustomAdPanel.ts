import { utils } from "./Utils";
import { BannerLocation } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YzCustomAdPanel extends cc.Component {

    @property({ type: cc.Node })
    exitBtn: cc.Node = null;
    closeCallFunc: Function = null;

    //关闭按钮点击次数
    closeCount: number = 1;
    closeBtnClickCount: number = 0;

    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        utils.adManager.showCustomAd({ location: 100 })
        let ratio = 0;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.75;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        if (utils.getConfigByKey("custom_panel_close_count")) {
            this.closeCount = utils.getConfigByKey("custom_panel_close_count");
        }
        cc.find("Panel", this.node).scale = ratio;
        this.exitBtn.runAction(cc.fadeIn(3));

    }

    onExitBtnClickListener() {
        utils.showLog("退出游戏模版弹窗！");
        this.closeBtnClickCount++;
        if (this.closeCount == this.closeBtnClickCount) {
            cc.director.emit("CloseCustomADPanel");
            this.node.destroy();
            utils.adManager.hideCustomAd({ location: 100 });
            this.closeCallFunc && this.closeCallFunc();
        }
    }
}
