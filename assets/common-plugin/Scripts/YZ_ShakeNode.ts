

const {ccclass, property} = cc._decorator;

@ccclass
export default class YZ_ShakeNode extends cc.Component 
{
    start()
    {
        this.schedule(this.shake, 3);
    }

    shake()
    {
        let duration = 0.03;
        let action = cc.repeat(cc.sequence(cc.rotateTo(duration, 5), cc.rotateTo(duration,0) ,cc.rotateTo(duration,-5), cc.rotateTo(duration,0)),5);
        this.node.runAction(action);
    }
}
