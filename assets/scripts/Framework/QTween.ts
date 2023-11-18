export enum TweenTyep {
    move = 0,
    circle,
    bezier,
    rotate,
    scale
}

const { ccclass, property } = cc._decorator;

@ccclass("TweenMess")
export class TweenMess {
    @property({ type: cc.Enum(TweenTyep) })
    tweenType: TweenTyep = TweenTyep.move;
    @property({ type: [cc.Vec2] })
    posList: Array<cc.Vec2> = [cc.v2(0, 0)];
    @property({ visible() { return this.tweenType == TweenTyep.circle || this.tweenType == TweenTyep.rotate } })
    angleV: number = 0;
    @property()
    actTime: number = 1;
    @property()
    delayTime: number = 0;
}

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: [TweenMess] })
    tweenList: Array<TweenMess> = [];

    // @property
    // delayTime: number = 0;

    start() {
        this.creatTween();
        this.node.opacity = 255;
    }

    startNum: number = 0;
    mainTween: cc.Tween = null;
    creatTween() {
        this.mainTween = cc.tween(this.node);
        if (this.tweenList.length <= 0) return;
        for (let i = 0; i < this.tweenList.length; i++) {
            let tw = this.tweenList[i];
            if (tw.tweenType == TweenTyep.move) {
                this.mainTween.to(tw.actTime, { position: tw.posList[0] }).delay(tw.delayTime);
            }
            else if (tw.tweenType == TweenTyep.bezier) {
                this.runRotate();
                this.mainTween.bezierTo(tw.actTime, tw.posList[0], tw.posList[1], tw.posList[2]).delay(tw.delayTime);
            }
            else if (tw.tweenType == TweenTyep.circle) {
                this.mainTween.call(() => {
                    this.CurAngle = 0;
                    this.centerPos = tw.posList[0];

                    // @ts-ignore
                    let tween = cc.tween(this).to(tw.actTime, { CurAngle: tw.angleV * tw.actTime }).start();

                }).delay(tw.actTime + tw.delayTime);
            }
            else if (tw.tweenType == TweenTyep.rotate) {
                this.mainTween.by(tw.actTime, { angle: tw.angleV });
            }
            else if (tw.tweenType == TweenTyep.scale) {
                this.mainTween.to(tw.actTime, { scaleX: tw.posList[0].x, scaleY: tw.posList[0].y }).delay(tw.delayTime);
            }
        }
        this.mainTween.union().repeatForever().start();
    }

    angleConut: number = 0;
    centerPos: cc.Vec2 = cc.v2(0, 0);
    get CurAngle() {
        return this.angleConut;
    }

    set CurAngle(num) {
        if (Math.abs(this.angleConut - num) < 10) {
            let pos: cc.Vec2 = cc.v2(this.node.getPosition());
            pos = pos.sub(this.centerPos).rotate((num - this.angleConut) / 180 * Math.PI).add(this.centerPos);
            this.node.setPosition(pos);
        }
        this.angleConut = num;
    }

    isRotate: boolean = false;
    runRotate() {
        if (this.isRotate) return;
        this.isRotate = true;
        if (this.node.x < 0) {
            this.schedule(() => { this.node.angle += 3 }, 0.01);
        }
        else {
            this.schedule(() => { this.node.angle -= 3 }, 0.01);
        }
    }
}
