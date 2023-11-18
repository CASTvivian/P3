
const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_ActionScale extends cc.Component {
    isRunAction: boolean = true;
    onLoad() {
        if (this.isRunAction) this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1), cc.scaleTo(1, 0.5))));
    }
}
