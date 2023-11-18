import QEasing, { EaseType } from "./QEasing";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QRotateAction extends QEasing {

    @property()
    delay: number = 0;

    @property({tooltip: "初始角度，顺时针为负数"})
    angle: number = 0;

    @property()
    duration: number = 0;

    @property()
    loop: boolean = false;

    @property()
    revert: boolean = false;

    private _originAngle: number = 0;
    private _tween: cc.Tween = null;

    onLoad(){
        this._originAngle = this.node.angle;
        let delayTween:cc.Tween = cc.tween().delay(this.delay);
        let actionTween: cc.Tween = cc.tween();
        if(this.revert){
            actionTween.by(this.duration/2,{angle: this.angle}).by(this.duration/2, {angle: -this.angle}, {easing: this._getEase()});
        }else{
            actionTween.by(this.duration, {angle: this.angle}, {easing: this._getEase()});
        }

        this._tween = cc.tween(this.node);
        this._tween.then(delayTween);
        this._tween.then(actionTween);
        if(this.loop){
            this._tween.repeatForever();
        }
    }

    onEnable(){
        this.node.angle = this._originAngle;
        this._tween.start();
    }
}
