"use strict";
cc._RF.push(module, 'ede9al62i9NEYE1+EQcGsFh', 'QScaleAction');
// scripts/Framework/QScaleAction.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var QEasing_1 = require("./QEasing");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var QScaleAction = /** @class */ (function (_super) {
    __extends(QScaleAction, _super);
    function QScaleAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delay = 0;
        _this.fromScale = cc.Vec2.ZERO;
        _this.targetScale = cc.Vec2.ZERO;
        _this.duration = 0;
        _this.loop = false;
        _this.revert = false;
        _this._tween = null;
        return _this;
    }
    QScaleAction.prototype.onLoad = function () {
        this.node.scaleX = this.fromScale.x;
        this.node.scaleY = this.fromScale.y;
        var delayTween = cc.tween();
        delayTween.delay(this.delay);
        var actionTween = cc.tween();
        if (this.revert) {
            actionTween.to(this.duration * 0.5, { scaleX: this.targetScale.x, scaleY: this.targetScale.y }, { easing: this._getEase() });
            actionTween.to(this.duration * 0.5, { scaleX: this.fromScale.x, scaleY: this.fromScale.y }, { easing: this._getEase() });
        }
        else {
            actionTween.to(this.duration, { scaleX: this.targetScale.x, scaleY: this.targetScale.y }, { easing: this._getEase() });
        }
        this._tween = cc.tween(this.node);
        this._tween.then(delayTween);
        this._tween.then(actionTween);
        if (this.loop) {
            this._tween.repeatForever();
        }
    };
    QScaleAction.prototype.onEnable = function () {
        this.node.scaleX = this.fromScale.x;
        this.node.scaleY = this.fromScale.y;
        this._tween.start();
    };
    __decorate([
        property()
    ], QScaleAction.prototype, "delay", void 0);
    __decorate([
        property()
    ], QScaleAction.prototype, "fromScale", void 0);
    __decorate([
        property(cc.Vec2)
    ], QScaleAction.prototype, "targetScale", void 0);
    __decorate([
        property()
    ], QScaleAction.prototype, "duration", void 0);
    __decorate([
        property()
    ], QScaleAction.prototype, "loop", void 0);
    __decorate([
        property()
    ], QScaleAction.prototype, "revert", void 0);
    QScaleAction = __decorate([
        ccclass
    ], QScaleAction);
    return QScaleAction;
}(QEasing_1.default));
exports.default = QScaleAction;

cc._RF.pop();