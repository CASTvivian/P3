
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/TweenEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxUd2VlbkVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUFpRCxFQUFFLENBQUMsVUFBVSxFQUE1RCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFDckUsSUFBWSxRQXFDWDtBQXJDRCxXQUFZLFFBQVE7SUFDaEIsdUNBQVEsQ0FBQTtJQUNSLHVDQUFJLENBQUE7SUFDSiwyQ0FBTSxDQUFBO0lBQ04sNkNBQU8sQ0FBQTtJQUNQLGlEQUFTLENBQUE7SUFDVCxpRUFBaUIsQ0FBQTtJQUNqQixtRUFBa0IsQ0FBQTtJQUNsQix1RUFBb0IsQ0FBQTtJQUNwQixtREFBVSxDQUFBO0lBQ1YscURBQVcsQ0FBQTtJQUNYLDBEQUFhLENBQUE7SUFDYiwwREFBYSxDQUFBO0lBQ2IsNERBQWMsQ0FBQTtJQUNkLGdFQUFnQixDQUFBO0lBQ2hCLHdEQUFZLENBQUE7SUFDWiwwREFBYSxDQUFBO0lBQ2IsOERBQWUsQ0FBQTtJQUNmLG9EQUFVLENBQUE7SUFDVixzREFBVyxDQUFBO0lBQ1gsMERBQWEsQ0FBQTtJQUNiLGdFQUFnQixDQUFBO0lBQ2hCLDBFQUFxQixDQUFBO0lBQ3JCLDRFQUFzQixDQUFBO0lBQ3RCLGdGQUF3QixDQUFBO0lBQ3hCLHNFQUFtQixDQUFBO0lBQ25CLHdFQUFvQixDQUFBO0lBQ3BCLDRFQUFzQixDQUFBO0lBQ3RCLHNFQUFtQixDQUFBO0lBQ25CLHdFQUFvQixDQUFBO0lBQ3BCLDRFQUFzQixDQUFBO0lBQ3RCLG9FQUFrQixDQUFBO0lBQ2xCLHNFQUFtQixDQUFBO0lBQ25CLDBFQUFxQixDQUFBO0lBQ3JCLGtFQUFpQixDQUFBO0lBQ2pCLG9FQUFrQixDQUFBO0lBQ2xCLHdFQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFyQ1csUUFB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QUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7OENBQzlCO0lBR2xCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzZDQUMvQjtJQUdqQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDOytDQUN4QztJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztrREFDSDtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0Q0FDN0s7SUFHaEI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFjLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7OENBQzdEO0lBM0JiLFdBQVc7UUFGL0IsT0FBTztRQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztPQUNMLFdBQVcsQ0EyTi9CO0lBQUQsa0JBQUM7Q0EzTkQsQUEyTkMsQ0EzTndDLEVBQUUsQ0FBQyxTQUFTLEdBMk5wRDtrQkEzTm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSwgZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmV4cG9ydCBlbnVtIEVhc2VUeXBlIHtcclxuICAgIG5vbmUgPSAwLFxyXG4gICAgZmFkZSxcclxuICAgIGVhc2VJbixcclxuICAgIGVhc2VPdXQsXHJcbiAgICBlYXNlSW5PdXQsXHJcbiAgICBlYXNlRXhwb25lbnRpYWxJbixcclxuICAgIGVhc2VFeHBvbmVudGlhbE91dCxcclxuICAgIGVhc2VFeHBvbmVudGlhbEluT3V0LFxyXG4gICAgZWFzZVNpbmVJbixcclxuICAgIGVhc2VTaW5lT3V0LFxyXG4gICAgZWFzZVNpbmVJbk91dCxcclxuICAgIGVhc2VFbGFzdGljSW4sXHJcbiAgICBlYXNlRWxhc3RpY091dCxcclxuICAgIGVhc2VFbGFzdGljSW5PdXQsXHJcbiAgICBlYXNlQm91bmNlSW4sXHJcbiAgICBlYXNlQm91bmNlT3V0LFxyXG4gICAgZWFzZUJvdW5jZUluT3V0LFxyXG4gICAgZWFzZUJhY2tJbixcclxuICAgIGVhc2VCYWNrT3V0LFxyXG4gICAgZWFzZUJhY2tJbk91dCxcclxuICAgIGVhc2VCZXppZXJBY3Rpb24sXHJcbiAgICBlYXNlUXVhZHJhdGljQWN0aW9uSW4sXHJcbiAgICBlYXNlUXVhZHJhdGljQWN0aW9uT3V0LFxyXG4gICAgZWFzZVF1YWRyYXRpY0FjdGlvbkluT3V0LFxyXG4gICAgZWFzZVF1YXJ0aWNBY3Rpb25JbixcclxuICAgIGVhc2VRdWFydGljQWN0aW9uT3V0LFxyXG4gICAgZWFzZVF1YXJ0aWNBY3Rpb25Jbk91dCxcclxuICAgIGVhc2VRdWludGljQWN0aW9uSW4sXHJcbiAgICBlYXNlUXVpbnRpY0FjdGlvbk91dCxcclxuICAgIGVhc2VRdWludGljQWN0aW9uSW5PdXQsXHJcbiAgICBlYXNlQ2lyY2xlQWN0aW9uSW4sXHJcbiAgICBlYXNlQ2lyY2xlQWN0aW9uT3V0LFxyXG4gICAgZWFzZUNpcmNsZUFjdGlvbkluT3V0LFxyXG4gICAgZWFzZUN1YmljQWN0aW9uSW4sXHJcbiAgICBlYXNlQ3ViaWNBY3Rpb25PdXQsXHJcbiAgICBlYXNlQ3ViaWNBY3Rpb25Jbk91dFxyXG59XHJcblxyXG5lbnVtIFR3ZWVuVHlwZSB7XHJcbiAgICBub25lLFxyXG4gICAgbGluZSxcclxuICAgIGFuZ2xlLFxyXG4gICAgb3BhY2l0eSxcclxuICAgIHNjYWxlLFxyXG4gICAgc2tld1ksXHJcbiAgICBzaGFrZSxcclxuICAgIGZsaXBcclxuXHJcbn1cclxuXHJcbmVudW0gUnVuVGltZSB7XHJcbiAgICBvbkxvYWQsXHJcbiAgICBzdGFydCxcclxuICAgIG9uRW5hYmxlXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiVG9vbHMvVHdlZW5FZmZlY3RcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHdlZW5FZmZlY3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oVHdlZW5UeXBlKSwgdG9vbHRpcDogXCLliqjkvZznsbvlnotcIiB9KVxyXG4gICAgdHlwZTogVHdlZW5UeXBlID0gVHdlZW5UeXBlLm5vbmU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShFYXNlVHlwZSkgfSlcclxuICAgIGVhc2VUeXBlOiBFYXNlVHlwZSA9IEVhc2VUeXBlLm5vbmU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShSdW5UaW1lKSwgdG9vbHRpcDogXCLov5DooYzmnaHku7ZcIiB9KVxyXG4gICAgcnVuOiBSdW5UaW1lID0gUnVuVGltZS5zdGFydDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLlvIDlp4vlu7bov5/ml7bpl7RcIiB9KVxyXG4gICAgZGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Y2V5qyh6L+Q6KGM5pe26Ze0XCIgfSlcclxuICAgIHRpbWU6IG51bWJlciA9IDE7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgdG9vbHRpcDogXCLph43lpI3mrKHmlbAgLTHmsLjkuYXph43lpI0gMOS4jemHjeWkjVwiIH0pXHJcbiAgICByZXBlYXQ6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm5YCS572uXCIgfSlcclxuICAgIGlzUmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi55uu5qCH5YC8XCIsIHZpc2libGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudHlwZSA9PSBUd2VlblR5cGUuYW5nbGUgfHwgdGhpcy50eXBlID09IFR3ZWVuVHlwZS5vcGFjaXR5IHx8IHRoaXMudHlwZSA9PSBUd2VlblR5cGUuc2NhbGUgfHwgdGhpcy50eXBlID09IFR3ZWVuVHlwZS5za2V3WSB9IH0pXHJcbiAgICBudW06IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLnm67moIflnZDmoIdcIiwgdmlzaWJsZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy50eXBlID09IFR3ZWVuVHlwZS5saW5lIH0gfSlcclxuICAgIHRvUG9zOiBjYy5WZWMzID0gY2MuVmVjMy5aRVJPO1xyXG5cclxuICAgIHByaXZhdGUgX3R3ID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3R3ID0gY2MudHdlZW4odGhpcy5ub2RlKTtcclxuICAgICAgICAvLyDpl7TpmpQgXHJcbiAgICAgICAgdGhpcy5fdHcuZGVsYXkodGhpcy5kZWxheSk7XHJcbiAgICAgICAgLy8g5Yqo5L2c57G75Z6LXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUd2VlblR5cGUubGluZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUd2VlblR5cGUuYW5nbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFR3ZWVuVHlwZS5vcGFjaXR5OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGFjaXR5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFR3ZWVuVHlwZS5zY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVHdlZW5UeXBlLnNrZXdZOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2V3WSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUd2VlblR5cGUuc2hha2U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoYWtlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFR3ZWVuVHlwZS5mbGlwOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mbGlwKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlvqrnjq9cclxuICAgICAgICBpZiAodGhpcy5yZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3LnVuaW9uKCkucmVwZWF0KHRoaXMucmVwZWF0KVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXBlYXQgPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHcudW5pb24oKS5yZXBlYXRGb3JldmVyKClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6L+Q6KGMXHJcbiAgICAgICAgaWYgKHRoaXMucnVuID09IFJ1blRpbWUub25Mb2FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3LnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVuID09IFJ1blRpbWUuc3RhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHcuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ydW4gPT0gUnVuVGltZS5vbkVuYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5fdHcuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog57q/5oCn5pWI5p6cICovXHJcbiAgICBwcml2YXRlIF9saW5lKCkge1xyXG4gICAgICAgIHRoaXMuX3R3LmJ5KHRoaXMudGltZSwgeyBwb3NpdGlvbjogdGhpcy50b1BvcyB9LCB7IGVhc2luZzogVHdlZW5FZmZlY3QuZ2V0RWFzZSh0aGlzLmVhc2VUeXBlKSB9KVxyXG4gICAgICAgIGlmICh0aGlzLmlzUmV2ZXJzZSkgdGhpcy5fdHcuYnkodGhpcy50aW1lLCB7IHBvc2l0aW9uOiB0aGlzLnRvUG9zLm5lZygpIH0sIHsgZWFzaW5nOiBUd2VlbkVmZmVjdC5nZXRFYXNlKHRoaXMuZWFzZVR5cGUpIH0pXHJcbiAgICB9XHJcbiAgICAvKiog5peL6L2s5pWI5p6cICovXHJcbiAgICBwcml2YXRlIF9hbmdsZSgpIHtcclxuICAgICAgICB0aGlzLl90dy5ieSh0aGlzLnRpbWUsIHsgYW5nbGU6IHRoaXMubnVtIH0sIHsgZWFzaW5nOiBUd2VlbkVmZmVjdC5nZXRFYXNlKHRoaXMuZWFzZVR5cGUpIH0pXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXZlcnNlKSB0aGlzLl90dy5ieSh0aGlzLnRpbWUsIHsgYW5nbGU6IC10aGlzLm51bSB9LCB7IGVhc2luZzogVHdlZW5FZmZlY3QuZ2V0RWFzZSh0aGlzLmVhc2VUeXBlKSB9KVxyXG4gICAgfVxyXG4gICAgLyoqIOmAj+aYjuaViOaenCAqL1xyXG4gICAgcHJpdmF0ZSBfb3BhY2l0eSgpIHtcclxuICAgICAgICB0aGlzLl90dy5ieSh0aGlzLnRpbWUsIHsgb3BhY2l0eTogdGhpcy5udW0gfSwgeyBlYXNpbmc6IFR3ZWVuRWZmZWN0LmdldEVhc2UodGhpcy5lYXNlVHlwZSkgfSlcclxuICAgICAgICBpZiAodGhpcy5pc1JldmVyc2UpIHRoaXMuX3R3LmJ5KHRoaXMudGltZSwgeyBvcGFjaXR5OiAtdGhpcy5udW0gfSwgeyBlYXNpbmc6IFR3ZWVuRWZmZWN0LmdldEVhc2UodGhpcy5lYXNlVHlwZSkgfSlcclxuICAgIH1cclxuICAgIC8qKiDnvKnmlL7mlYjmnpwgKi9cclxuICAgIHByaXZhdGUgX3NjYWxlKCkge1xyXG4gICAgICAgIHRoaXMuX3R3LmJ5KHRoaXMudGltZSwgeyBzY2FsZTogdGhpcy5udW0gfSwgeyBlYXNpbmc6IFR3ZWVuRWZmZWN0LmdldEVhc2UodGhpcy5lYXNlVHlwZSkgfSlcclxuICAgICAgICBpZiAodGhpcy5pc1JldmVyc2UpIHRoaXMuX3R3LmJ5KHRoaXMudGltZSwgeyBzY2FsZTogLXRoaXMubnVtIH0sIHsgZWFzaW5nOiBUd2VlbkVmZmVjdC5nZXRFYXNlKHRoaXMuZWFzZVR5cGUpIH0pXHJcbiAgICB9XHJcbiAgICAvKiog5YGP5pac5pWI5p6cICovXHJcbiAgICBwcml2YXRlIF9za2V3WSgpIHtcclxuICAgICAgICB0aGlzLl90dy5ieSh0aGlzLnRpbWUsIHsgc2tld1k6IHRoaXMubnVtIH0sIHsgZWFzaW5nOiBUd2VlbkVmZmVjdC5nZXRFYXNlKHRoaXMuZWFzZVR5cGUpIH0pXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXZlcnNlKSB0aGlzLl90dy5ieSh0aGlzLnRpbWUsIHsgc2tld1k6IC10aGlzLm51bSB9LCB7IGVhc2luZzogVHdlZW5FZmZlY3QuZ2V0RWFzZSh0aGlzLmVhc2VUeXBlKSB9KVxyXG4gICAgfVxyXG4gICAgLyoqIOaZg+WKqOaViOaenCAqL1xyXG4gICAgcHJpdmF0ZSBfc2hha2UoKSB7XHJcbiAgICAgICAgdGhpcy5fdHdcclxuICAgICAgICAgICAgLmJ5KHRoaXMudGltZSwgeyBhbmdsZTogdGhpcy5udW0gfSwgeyBlYXNpbmc6IFR3ZWVuRWZmZWN0LmdldEVhc2UodGhpcy5lYXNlVHlwZSkgfSlcclxuICAgICAgICAgICAgLmJ5KHRoaXMudGltZSAqIDIsIHsgYW5nbGU6IC0yICogdGhpcy5udW0gfSwgeyBlYXNpbmc6IFR3ZWVuRWZmZWN0LmdldEVhc2UodGhpcy5lYXNlVHlwZSkgfSlcclxuICAgICAgICAgICAgLmJ5KHRoaXMudGltZSwgeyBhbmdsZTogdGhpcy5udW0gfSwgeyBlYXNpbmc6IFR3ZWVuRWZmZWN0LmdldEVhc2UodGhpcy5lYXNlVHlwZSkgfSlcclxuICAgIH1cclxuICAgIC8qKiDnv7vovazmlYjmnpwgKi9cclxuICAgIHByaXZhdGUgX2ZsaXAoKSB7XHJcbiAgICAgICAgdGhpcy5fdHdcclxuICAgICAgICAgICAgLnRvKHRoaXMudGltZSwgeyBzY2FsZVg6IC10aGlzLm5vZGUuc2NhbGVYIH0sIHsgZWFzaW5nOiBUd2VlbkVmZmVjdC5nZXRFYXNlKHRoaXMuZWFzZVR5cGUpIH0pXHJcbiAgICAgICAgICAgIC50byh0aGlzLnRpbWUsIHsgc2NhbGVYOiB0aGlzLm5vZGUuc2NhbGVYIH0sIHsgZWFzaW5nOiBUd2VlbkVmZmVjdC5nZXRFYXNlKHRoaXMuZWFzZVR5cGUpIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAgIOW8ueeql+aViOaenCAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKiog6YGu572p5riQ5pi+ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhbmVsX21hc2tfb3BhY2l0eShub2RlOiBjYy5Ob2RlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9wYWNpdHlCYWNrID0gbm9kZS5vcGFjaXR5O1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4yLCB7IG9wYWNpdHk6IG9wYWNpdHlCYWNrIH0pLmNhbGwoKCkgPT4geyBjYWxsYmFjayAmJiBjYWxsYmFjaygpOyB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnp7vliqhZ6L20X+aJk+W8gCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwYW5lbF9vcGVuX21vdmVZKG5vZGU6IGNjLk5vZGUsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBub2RlLnkgKz0gMTAwMDtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjUsIHsgeTogbm9kZS55IC0gMTAwMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSkuY2FsbCgoKSA9PiB7IGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7IH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICAvKiog56e75YqoWei9tF/lhbPpl60gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFuZWxfY2xvc2VfbW92ZVkobm9kZTogY2MuTm9kZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuNSwgeyB5OiBub2RlLnkgKyAxMDAwIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pLmNhbGwoKCkgPT4geyBjYWxsYmFjayAmJiBjYWxsYmFjaygpOyB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnvKnmlL5Z6L20X+aJk+W8gCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwYW5lbF9vcGVuX3NjYWxlWShub2RlOiBjYy5Ob2RlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbm9kZS5zY2FsZVkgPSAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuNSwgeyBzY2FsZVk6IDEgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pLmNhbGwoKCkgPT4geyBjYWxsYmFjayAmJiBjYWxsYmFjaygpOyB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgLyoqIOe8qeaUvlnovbRf5YWz6ZetICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhbmVsX2Nsb3NlX3NjYWxlWShub2RlOiBjYy5Ob2RlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC41LCB7IHNjYWxlWTogMCB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KS5jYWxsKCgpID0+IHsgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTsgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pW05L2T57yp5pS+X+aJk+W8gCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwYW5lbF9vcGVuX3NjYWxlKG5vZGU6IGNjLk5vZGUsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBub2RlLnNjYWxlID0gMDtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjUsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pLmNhbGwoKCkgPT4geyBjYWxsYmFjayAmJiBjYWxsYmFjaygpOyB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgLyoqIOaVtOS9k+e8qeaUvl/lhbPpl60gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFuZWxfY2xvc2Vfc2NhbGUobm9kZTogY2MuTm9kZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuNSwgeyBzY2FsZTogMCB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KS5jYWxsKCgpID0+IHsgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTsgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6YCP5piO5bqm57yp5pS+X+aJk+W8gCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwYW5lbF9vcGVuX29wYWNpdHlfc2NhbGUobm9kZTogY2MuTm9kZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbm9kZS5zY2FsZSA9IDEuNTtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjUsIHsgb3BhY2l0eTogMjU1LCBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJmYWRlXCIgfSkuY2FsbCgoKSA9PiB7IGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7IH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICAvKiog6YCP5piO5bqm57yp5pS+X+WFs+mXrSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwYW5lbF9jbG9zZV9vcGFjaXR5X3NjYWxlKG5vZGU6IGNjLk5vZGUsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjUsIHsgb3BhY2l0eTogMCwgc2NhbGU6IDIgfSwgeyBlYXNpbmc6IFwiZmFkZVwiIH0pLmNhbGwoKCkgPT4geyBjYWxsYmFjayAmJiBjYWxsYmFjaygpOyB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDojrflj5ZlYXNl57G75Z6LICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVhc2UodHlwZTogRWFzZVR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5ub25lOiByZXR1cm4gXCJsaW5lYXJcIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5mYWRlOiByZXR1cm4gXCJmYWRlXCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZU91dDogcmV0dXJuIFwiZWFzZU91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VJbk91dDogcmV0dXJuIFwiZWFzZUluT3V0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUV4cG9uZW50aWFsSW46IHJldHVybiBcImVhc2VFeHBvbmVudGlhbEluXCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUV4cG9uZW50aWFsT3V0OiByZXR1cm4gXCJlYXNlRXhwb25lbnRpYWxPdXRcIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlRXhwb25lbnRpYWxJbk91dDogcmV0dXJuIFwiZWFzZUV4cG9uZW50aWFsSW5PdXRcIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlU2luZUluOiByZXR1cm4gXCJzaW5lSW5cIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlU2luZU91dDogcmV0dXJuIFwic2luZU91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VTaW5lSW5PdXQ6IHJldHVybiBcInNpbmVJbk91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VFbGFzdGljSW46IHJldHVybiBcImVsYXN0aWNJblwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VFbGFzdGljT3V0OiByZXR1cm4gXCJlbGFzdGljT3V0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUVsYXN0aWNJbk91dDogcmV0dXJuIFwiZWxhc3RpY0luT3V0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUJvdW5jZUluOiByZXR1cm4gXCJib3VuY2VJblwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VCb3VuY2VPdXQ6IHJldHVybiBcImJvdW5jZU91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VCYWNrSW46IHJldHVybiBcImJhY2tJblwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VCYWNrT3V0OiByZXR1cm4gJ2JhY2tPdXQnO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VCYWNrSW5PdXQ6IHJldHVybiBcImJhY2tJbk91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VRdWFkcmF0aWNBY3Rpb25JbjogcmV0dXJuIFwicXVhZHJhdGljQWN0aW9uSW5cIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVhZHJhdGljQWN0aW9uT3V0OiByZXR1cm4gXCJxdWFkcmF0aWNBY3Rpb25PdXRcIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQ6IHJldHVybiBcInF1YWRyYXRpY0FjdGlvbkluT3V0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZVF1YXJ0aWNBY3Rpb25JbjogcmV0dXJuIFwicXVhcnRpY0FjdGlvbkluXCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZVF1YXJ0aWNBY3Rpb25PdXQ6IHJldHVybiBcInF1YXJ0aWNBY3Rpb25PdXRcIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVhcnRpY0FjdGlvbkluT3V0OiByZXR1cm4gXCJxdWFydGljQWN0aW9uSW5PdXRcIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVpbnRpY0FjdGlvbkluOiByZXR1cm4gXCJxdWludGljQWN0aW9uSW5cIjtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVpbnRpY0FjdGlvbk91dDogcmV0dXJuIFwicXVpbnRpY0FjdGlvbk91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VRdWludGljQWN0aW9uSW5PdXQ6IHJldHVybiBcInF1aW50aWNBY3Rpb25Jbk91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VDaXJjbGVBY3Rpb25JbjogcmV0dXJuIFwiZWFzZUNpcmNsZUFjdGlvbkluXCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUNpcmNsZUFjdGlvbk91dDogcmV0dXJuIFwiY2lyY2xlQWN0aW9uT3V0XCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUNpcmNsZUFjdGlvbkluT3V0OiByZXR1cm4gXCJjaXJjbGVBY3Rpb25Jbk91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VDdWJpY0FjdGlvbkluOiByZXR1cm4gXCJjdWJpY0FjdGlvbkluXCI7XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUN1YmljQWN0aW9uT3V0OiByZXR1cm4gXCJjdWJpY0FjdGlvbk91dFwiO1xyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VDdWJpY0FjdGlvbkluT3V0OiByZXR1cm4gXCJjdWJpY0FjdGlvbkluT3V0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=