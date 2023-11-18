// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    isContact: boolean = false;
    onBeginContact() {
        this.isContact = true;
    }

    getContact() {
        this.node.destroy();
        return this.isContact;
    }
    // update (dt) {}
}
