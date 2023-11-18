"use strict";
cc._RF.push(module, '71041IFI81OEb+n+xBiAdfv', 'QRotation');
// scripts/Framework/QRotation.ts

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
var QRotateAction = /** @class */ (function (_super) {
    __extends(QRotateAction, _super);
    function QRotateAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delay = 0;
        _this.angle = 0;
        _this.duration = 0;
        _this.loop = false;
        _this.revert = false;
        _this._originAngle = 0;
        _this._tween = null;
        return _this;
    }
    QRotateAction.prototype.onLoad = function () {
        this._originAngle = this.node.angle;
        var delayTween = cc.tween().delay(this.delay);
        var actionTween = cc.tween();
        if (this.revert) {
            actionTween.by(this.duration / 2, { angle: this.angle }).by(this.duration / 2, { angle: -this.angle }, { easing: this._getEase() });
        }
        else {
            actionTween.by(this.duration, { angle: this.angle }, { easing: this._getEase() });
        }
        this._tween = cc.tween(this.node);
        this._tween.then(delayTween);
        this._tween.then(actionTween);
        if (this.loop) {
            this._tween.repeatForever();
        }
    };
    QRotateAction.prototype.onEnable = function () {
        this.node.angle = this._originAngle;
        this._tween.start();
    };
    __decorate([
        property()
    ], QRotateAction.prototype, "delay", void 0);
    __decorate([
        property({ tooltip: "初始角度，顺时针为负数" })
    ], QRotateAction.prototype, "angle", void 0);
    __decorate([
        property()
    ], QRotateAction.prototype, "duration", void 0);
    __decorate([
        property()
    ], QRotateAction.prototype, "loop", void 0);
    __decorate([
        property()
    ], QRotateAction.prototype, "revert", void 0);
    QRotateAction = __decorate([
        ccclass
    ], QRotateAction);
    return QRotateAction;
}(QEasing_1.default));
exports.default = QRotateAction;

cc._RF.pop();