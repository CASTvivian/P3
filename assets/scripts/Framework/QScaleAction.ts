import QEasing, { EaseType } from "./QEasing";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QScaleAction extends QEasing {

    @property()
    delay: number = 0;

    @property()
    fromScale: cc.Vec2 = cc.Vec2.ZERO;

    @property(cc.Vec2)
    targetScale: cc.Vec2 = cc.Vec2.ZERO;

    @property()
    duration: number = 0;

    @property()
    loop: boolean = false;

    @property()
    revert: boolean = false;

    private _tween: cc.Tween = null;

    onLoad(){
        this.node.scaleX = this.fromScale.x;
        this.node.scaleY = this.fromScale.y;

        let delayTween: cc.Tween = cc.tween();
        delayTween.delay(this.delay);

        let actionTween: cc.Tween = cc.tween();
        if(this.revert){
            actionTween.to(this.duration*0.5, {scaleX: this.targetScale.x, scaleY: this.targetScale.y}, {easing: this._getEase()});
            actionTween.to(this.duration*0.5, {scaleX: this.fromScale.x, scaleY: this.fromScale.y}, {easing: this._getEase()});
        }else{
            actionTween.to(this.duration, {scaleX: this.targetScale.x, scaleY: this.targetScale.y}, {easing: this._getEase()});
        }

        this._tween = cc.tween(this.node);
        this._tween.then(delayTween);
        this._tween.then(actionTween);
        if(this.loop){
            this._tween.repeatForever();
        }
    }

    onEnable() {
        this.node.scaleX = this.fromScale.x;
        this.node.scaleY = this.fromScale.y;
        this._tween.start();
    }
}
