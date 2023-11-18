"use strict";
cc._RF.push(module, '54110rONwJBArNNreXEArQY', 'TweenEffect');
// scripts/Framework/TweenEffect.ts

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
exports.EaseType = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
var EaseType;
(function (EaseType) {
    EaseType[EaseType["none"] = 0] = "none";
    EaseType[EaseType["fade"] = 1] = "fade";
    EaseType[EaseType["easeIn"] = 2] = "easeIn";
    EaseType[EaseType["easeOut"] = 3] = "easeOut";
    EaseType[EaseType["easeInOut"] = 4] = "easeInOut";
    EaseType[EaseType["easeExponentialIn"] = 5] = "easeExponentialIn";
    EaseType[EaseType["easeExponentialOut"] = 6] = "easeExponentialOut";
    EaseType[EaseType["easeExponentialInOut"] = 7] = "easeExponentialInOut";
    EaseType[EaseType["easeSineIn"] = 8] = "easeSineIn";
    EaseType[EaseType["easeSineOut"] = 9] = "easeSineOut";
    EaseType[EaseType["easeSineInOut"] = 10] = "easeSineInOut";
    EaseType[EaseType["easeElasticIn"] = 11] = "easeElasticIn";
    EaseType[EaseType["easeElasticOut"] = 12] = "easeElasticOut";
    EaseType[EaseType["easeElasticInOut"] = 13] = "easeElasticInOut";
    EaseType[EaseType["easeBounceIn"] = 14] = "easeBounceIn";
    EaseType[EaseType["easeBounceOut"] = 15] = "easeBounceOut";
    EaseType[EaseType["easeBounceInOut"] = 16] = "easeBounceInOut";
    EaseType[EaseType["easeBackIn"] = 17] = "easeBackIn";
    EaseType[EaseType["easeBackOut"] = 18] = "easeBackOut";
    EaseType[EaseType["easeBackInOut"] = 19] = "easeBackInOut";
    EaseType[EaseType["easeBezierAction"] = 20] = "easeBezierAction";
    EaseType[EaseType["easeQuadraticActionIn"] = 21] = "easeQuadraticActionIn";
    EaseType[EaseType["easeQuadraticActionOut"] = 22] = "easeQuadraticActionOut";
    EaseType[EaseType["easeQuadraticActionInOut"] = 23] = "easeQuadraticActionInOut";
    EaseType[EaseType["easeQuarticActionIn"] = 24] = "easeQuarticActionIn";
    EaseType[EaseType["easeQuarticActionOut"] = 25] = "easeQuarticActionOut";
    EaseType[EaseType["easeQuarticActionInOut"] = 26] = "easeQuarticActionInOut";
    EaseType[EaseType["easeQuinticActionIn"] = 27] = "easeQuinticActionIn";
    EaseType[EaseType["easeQuinticActionOut"] = 28] = "easeQuinticActionOut";
    EaseType[EaseType["easeQuinticActionInOut"] = 29] = "easeQuinticActionInOut";
    EaseType[EaseType["easeCircleActionIn"] = 30] = "easeCircleActionIn";
    EaseType[EaseType["easeCircleActionOut"] = 31] = "easeCircleActionOut";
    EaseType[EaseType["easeCircleActionInOut"] = 32] = "easeCircleActionInOut";
    EaseType[EaseType["easeCubicActionIn"] = 33] = "easeCubicActionIn";
    EaseType[EaseType["easeCubicActionOut"] = 34] = "easeCubicActionOut";
    EaseType[EaseType["easeCubicActionInOut"] = 35] = "easeCubicActionInOut";
})(EaseType = exports.EaseType || (exports.EaseType = {}));
var TweenType;
(function (TweenType) {
    TweenType[TweenType["none"] = 0] = "none";
    TweenType[TweenType["line"] = 1] = "line";
    TweenType[TweenType["angle"] = 2] = "angle";
    TweenType[TweenType["opacity"] = 3] = "opacity";
    TweenType[TweenType["scale"] = 4] = "scale";
    TweenType[TweenType["skewY"] = 5] = "skewY";
    TweenType[TweenType["shake"] = 6] = "shake";
    TweenType[TweenType["flip"] = 7] = "flip";
})(TweenType || (TweenType = {}));
var RunTime;
(function (RunTime) {
    RunTime[RunTime["onLoad"] = 0] = "onLoad";
    RunTime[RunTime["start"] = 1] = "start";
    RunTime[RunTime["onEnable"] = 2] = "onEnable";
})(RunTime || (RunTime = {}));
var TweenEffect = /** @class */ (function (_super) {
    __extends(TweenEffect, _super);
    function TweenEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = TweenType.none;
        _this.easeType = EaseType.none;
        _this.run = RunTime.start;
        _this.delay = 0;
        _this.time = 1;
        _this.repeat = -1;
        _this.isReverse = false;
        _this.num = 0;
        _this.toPos = cc.Vec3.ZERO;
        _this._tw = null;
        return _this;
    }
    TweenEffect_1 = TweenEffect;
    TweenEffect.prototype.onLoad = function () {
        this._tw = cc.tween(this.node);
        // 间隔 
        this._tw.delay(this.delay);
        // 动作类型
        switch (this.type) {
            case TweenType.line: {
                this._line();
                break;
            }
            case TweenType.angle: {
                this._angle();
                break;
            }
            case TweenType.opacity: {
                this._opacity();
                break;
            }
            case TweenType.scale: {
                this._scale();
                break;
            }
            case TweenType.skewY: {
                this._skewY();
                break;
            }
            case TweenType.shake: {
                this._shake();
                break;
            }
            case TweenType.flip: {
                this._flip();
                break;
            }
        }
        // 循环
        if (this.repeat > 0) {
            this._tw.union().repeat(this.repeat);
        }
        else if (this.repeat == -1) {
            this._tw.union().repeatForever();
        }
        // 运行
        if (this.run == RunTime.onLoad) {
            this._tw.start();
        }
    };
    TweenEffect.prototype.start = function () {
        if (this.run == RunTime.start) {
            this._tw.start();
        }
    };
    TweenEffect.prototype.onEnable = function () {
        if (this.run == RunTime.onEnable) {
            this.node.stopAllActions();
            this._tw.start();
        }
    };
    /** 线性效果 */
    TweenEffect.prototype._line = function () {
        this._tw.by(this.time, { position: this.toPos }, { easing: TweenEffect_1.getEase(this.easeType) });
        if (this.isReverse)
            this._tw.by(this.time, { position: this.toPos.neg() }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    /** 旋转效果 */
    TweenEffect.prototype._angle = function () {
        this._tw.by(this.time, { angle: this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
        if (this.isReverse)
            this._tw.by(this.time, { angle: -this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    /** 透明效果 */
    TweenEffect.prototype._opacity = function () {
        this._tw.by(this.time, { opacity: this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
        if (this.isReverse)
            this._tw.by(this.time, { opacity: -this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    /** 缩放效果 */
    TweenEffect.prototype._scale = function () {
        this._tw.by(this.time, { scale: this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
        if (this.isReverse)
            this._tw.by(this.time, { scale: -this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    /** 偏斜效果 */
    TweenEffect.prototype._skewY = function () {
        this._tw.by(this.time, { skewY: this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
        if (this.isReverse)
            this._tw.by(this.time, { skewY: -this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    /** 晃动效果 */
    TweenEffect.prototype._shake = function () {
        this._tw
            .by(this.time, { angle: this.num }, { easing: TweenEffect_1.getEase(this.easeType) })
            .by(this.time * 2, { angle: -2 * this.num }, { easing: TweenEffect_1.getEase(this.easeType) })
            .by(this.time, { angle: this.num }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    /** 翻转效果 */
    TweenEffect.prototype._flip = function () {
        this._tw
            .to(this.time, { scaleX: -this.node.scaleX }, { easing: TweenEffect_1.getEase(this.easeType) })
            .to(this.time, { scaleX: this.node.scaleX }, { easing: TweenEffect_1.getEase(this.easeType) });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////    弹窗效果    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 遮罩渐显 */
    TweenEffect.panel_mask_opacity = function (node, callback) {
        var opacityBack = node.opacity;
        node.opacity = 0;
        cc.tween(node).to(0.2, { opacity: opacityBack }).call(function () { callback && callback(); }).start();
    };
    /** 移动Y轴_打开 */
    TweenEffect.panel_open_moveY = function (node, callback) {
        node.y += 1000;
        cc.tween(node).to(0.5, { y: node.y - 1000 }, { easing: "sineOut" }).call(function () { callback && callback(); }).start();
    };
    /** 移动Y轴_关闭 */
    TweenEffect.panel_close_moveY = function (node, callback) {
        cc.tween(node).to(0.5, { y: node.y + 1000 }, { easing: "sineIn" }).call(function () { callback && callback(); }).start();
    };
    /** 缩放Y轴_打开 */
    TweenEffect.panel_open_scaleY = function (node, callback) {
        node.scaleY = 0;
        cc.tween(node).to(0.5, { scaleY: 1 }, { easing: "sineOut" }).call(function () { callback && callback(); }).start();
    };
    /** 缩放Y轴_关闭 */
    TweenEffect.panel_close_scaleY = function (node, callback) {
        cc.tween(node).to(0.5, { scaleY: 0 }, { easing: "sineIn" }).call(function () { callback && callback(); }).start();
    };
    /** 整体缩放_打开 */
    TweenEffect.panel_open_scale = function (node, callback) {
        node.scale = 0;
        cc.tween(node).to(0.5, { scale: 1 }, { easing: "sineOut" }).call(function () { callback && callback(); }).start();
    };
    /** 整体缩放_关闭 */
    TweenEffect.panel_close_scale = function (node, callback) {
        cc.tween(node).to(0.5, { scale: 0 }, { easing: "sineIn" }).call(function () { callback && callback(); }).start();
    };
    /** 透明度缩放_打开 */
    TweenEffect.panel_open_opacity_scale = function (node, callback) {
        node.opacity = 0;
        node.scale = 1.5;
        cc.tween(node).to(0.5, { opacity: 255, scale: 1 }, { easing: "fade" }).call(function () { callback && callback(); }).start();
    };
    /** 透明度缩放_关闭 */
    TweenEffect.panel_close_opacity_scale = function (node, callback) {
        cc.tween(node).to(0.5, { opacity: 0, scale: 2 }, { easing: "fade" }).call(function () { callback && callback(); }).start();
    };
    /** 获取ease类型 */
    TweenEffect.getEase = function (type) {
        switch (type) {
            case EaseType.none: return "linear";
            case EaseType.fade: return "fade";
            case EaseType.easeOut: return "easeOut";
            case EaseType.easeInOut: return "easeInOut";
            case EaseType.easeExponentialIn: return "easeExponentialIn";
            case EaseType.easeExponentialOut: return "easeExponentialOut";
            case EaseType.easeExponentialInOut: return "easeExponentialInOut";
            case EaseType.easeSineIn: return "sineIn";
            case EaseType.easeSineOut: return "sineOut";
            case EaseType.easeSineInOut: return "sineInOut";
            case EaseType.easeElasticIn: return "elasticIn";
            case EaseType.easeElasticOut: return "elasticOut";
            case EaseType.easeElasticInOut: return "elasticInOut";
            case EaseType.easeBounceIn: return "bounceIn";
            case EaseType.easeBounceOut: return "bounceOut";
            case EaseType.easeBackIn: return "backIn";
            case EaseType.easeBackOut: return 'backOut';
            case EaseType.easeBackInOut: return "backInOut";
            case EaseType.easeQuadraticActionIn: return "quadraticActionIn";
            case EaseType.easeQuadraticActionOut: return "quadraticActionOut";
            case EaseType.easeQuadraticActionInOut: return "quadraticActionInOut";
            case EaseType.easeQuarticActionIn: return "quarticActionIn";
            case EaseType.easeQuarticActionOut: return "quarticActionOut";
            case EaseType.easeQuarticActionInOut: return "quarticActionInOut";
            case EaseType.easeQuinticActionIn: return "quinticActionIn";
            case EaseType.easeQuinticActionOut: return "quinticActionOut";
            case EaseType.easeQuinticActionInOut: return "quinticActionInOut";
            case EaseType.easeCircleActionIn: return "easeCircleActionIn";
            case EaseType.easeCircleActionOut: return "circleActionOut";
            case EaseType.easeCircleActionInOut: return "circleActionInOut";
            case EaseType.easeCubicActionIn: return "cubicActionIn";
            case EaseType.easeCubicActionOut: return "cubicActionOut";
            case EaseType.easeCubicActionInOut: return "cubicActionInOut";
        }
    };
    var TweenEffect_1;
    __decorate([
        property({ type: cc.Enum(TweenType), tooltip: "动作类型" })
    ], TweenEffect.prototype, "type", void 0);
    __decorate([
        property({ type: cc.Enum(EaseType) })
    ], TweenEffect.prototype, "easeType", void 0);
    __decorate([
        property({ type: cc.Enum(RunTime), tooltip: "运行条件" })
    ], TweenEffect.prototype, "run", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "开始延迟时间" })
    ], TweenEffect.prototype, "delay", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "单次运行时间" })
    ], TweenEffect.prototype, "time", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: "重复次数 -1永久重复 0不重复" })
    ], TweenEffect.prototype, "repeat", void 0);
    __decorate([
        property({ tooltip: "是否倒置" })
    ], TweenEffect.prototype, "isReverse", void 0);
    __decorate([
        property({ tooltip: "目标值", visible: function () { return this.type == TweenType.angle || this.type == TweenType.opacity || this.type == TweenType.scale || this.type == TweenType.skewY; } })
    ], TweenEffect.prototype, "num", void 0);
    __decorate([
        property({ tooltip: "目标坐标", visible: function () { return this.type == TweenType.line; } })
    ], TweenEffect.prototype, "toPos", void 0);
    TweenEffect = TweenEffect_1 = __decorate([
        ccclass,
        menu("Tools/TweenEffect")
    ], TweenEffect);
    return TweenEffect;
}(cc.Component));
exports.default = TweenEffect;

cc._RF.pop();