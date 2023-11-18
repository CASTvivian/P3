const { ccclass, property } = cc._decorator;

export let guideLayer: GuideLayer = null;
@ccclass
export default class GuideLayer extends cc.Component {
    @property(cc.Node)
    bgLoadNode: cc.Node = null;
    @property(cc.Node)
    points: cc.Node = null;

    @property(cc.Node)
    fjLoadNode: cc.Node = null;
    @property(sp.Skeleton)
    fjAni: sp.Skeleton = null;

    onLoad() {
        guideLayer = this;
        cc.game.addPersistRootNode(this.node);
        this.node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.node.setContentSize(cc.winSize);
    }

    start() {
        this.showPoint();
        this.schedule(this.showPoint, 0.5);
    }

    /////////////////////// 过渡动画 ///////////////////////////////
    curIndex = 0;
    /** 点变化效果 */
    showPoint() {
        for (let i = 0; i < this.points.childrenCount; i++) {
            if (i <= this.curIndex) {
                this.points.children[i].opacity = 255;
            } else {
                this.points.children[i].opacity = 0;
            }
        }
        if (++this.curIndex > this.points.childrenCount) {
            this.curIndex = 0;
        }
    }

    /** 显示过渡动画 */
    showBgAni() {
        this.bgLoadNode.active = true;
        this.curIndex = 0;
    }

    /** 隐藏过度动画 */
    hideBgAni() {
        this.bgLoadNode.active = false;
    }


    /////////////////////// 加载动画（直升机） ///////////////////////////////
    /** 显示飞机动画 */
    showFjAni() {
        this.fjLoadNode.active = true;
        this.fjAni.setAnimation(0, "jiazai", false);
        this.fjAni.addAnimation(0, "jiazai2", true);
    }

    /** 隐藏飞机动画 */
    hideFjAni() {
        this.fjLoadNode.active = false;
    }

}
