
const { ccclass, property } = cc._decorator;

@ccclass
export default class HandAction extends cc.Component {

    @property({ type: cc.Float })
    runTime: number = 0.3;

    onLoad() {
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.node.scale = cc.view.getDesignResolutionSize().width / 1920 * 0.5;
        } else {
            this.node.scale = cc.view.getDesignResolutionSize().width / 1080 * 0.5;
        }
    }

    onEnable() {
        this.node.runAction(cc.sequence(cc.moveBy(this.runTime, cc.v2(-50, +50)), cc.moveBy(this.runTime, cc.v2(+50, -50))).repeatForever())
    }


    onDisable() {
        this.node.stopAllActions();
    }
    // update (dt) {}
}
