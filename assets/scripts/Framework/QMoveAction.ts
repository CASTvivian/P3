import QEasing, { EaseType } from "./QEasing";

const { ccclass, property } = cc._decorator;


@ccclass
export default class QMoveAction extends QEasing {

    @property()
    delay: number = 0;

    @property(cc.Vec2)
    delPos: cc.Vec2 = cc.Vec2.ZERO;

    @property()
    duration: number = 0;

    @property()
    interval: number = 0;

    @property()
    loop: boolean = false;

    @property()
    revert: boolean = false;

    private _tween: cc.Tween = null;
    private _originPos: cc.Vec3 = cc.Vec3.ZERO;

    onLoad() {
        this._originPos = cc.v3(this.node.x, this.node.y);
        this.node.position = cc.v3(this._originPos.x - this.delPos.x, this._originPos.y - this.delPos.y);

        let widget: cc.Widget = this.getComponent(cc.Widget);
        if (widget) {
            widget.enabled = false;
        }

        let delayTween: cc.Tween = cc.tween().delay(this.delay);
        let actionTween: cc.Tween = cc.tween();
        actionTween.call(() => {
            this.node.position = cc.v3(this._originPos.x - this.delPos.x, this._originPos.y - this.delPos.y);
        });
        if (this.revert) {
            actionTween.by(this.duration * 0.5, { position: cc.v3(this.delPos.x, this.delPos.y) }, { easing: this._getEase() });
            actionTween.by(this.duration * 0.5, { position: cc.v3(-this.delPos.x, -this.delPos.y) }, { easing: this._getEase() });
        } else {
            actionTween.by(this.duration, { position: cc.v3(this.delPos.x, this.delPos.y) }, { easing: this._getEase() });
        }
        actionTween.delay(this.interval);

        this._tween = cc.tween(this.node);
        this._tween.then(delayTween);
        this._tween.then(actionTween);
        if (this.loop) {
            this._tween.repeatForever();
        }
    }

    onEnable() {
        this.node.position = cc.v3(this._originPos.x - this.delPos.x, this._originPos.y - this.delPos.y);
        this._tween.start();
    }



}
