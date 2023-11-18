// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class ShowDate extends cc.Component {

    start() {
        if (CC_EDITOR) {
            let label = this.node.getComponent(cc.Label);
            if (label) {
                let d = new Date();
                label.string = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            }
        }
        this.node.zIndex = cc.macro.MAX_ZINDEX;
    }

}
