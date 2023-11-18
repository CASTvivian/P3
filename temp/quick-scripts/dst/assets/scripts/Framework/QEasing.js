
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/QEasing.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96829TvMTFNgKlOd5JpyJkO', 'QEasing');
// scripts/Framework/QEasing.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EaseType;
(function (EaseType) {
    EaseType[EaseType["none"] = 0] = "none";
    EaseType[EaseType["easeIn"] = 1] = "easeIn";
    EaseType[EaseType["easeOut"] = 2] = "easeOut";
    EaseType[EaseType["easeInOut"] = 3] = "easeInOut";
    EaseType[EaseType["easeExponentialIn"] = 4] = "easeExponentialIn";
    EaseType[EaseType["easeExponentialOut"] = 5] = "easeExponentialOut";
    EaseType[EaseType["easeExponentialInOut"] = 6] = "easeExponentialInOut";
    EaseType[EaseType["easeSineIn"] = 7] = "easeSineIn";
    EaseType[EaseType["easeSineOut"] = 8] = "easeSineOut";
    EaseType[EaseType["easeSineInOut"] = 9] = "easeSineInOut";
    EaseType[EaseType["easeElasticIn"] = 10] = "easeElasticIn";
    EaseType[EaseType["easeElasticOut"] = 11] = "easeElasticOut";
    EaseType[EaseType["easeElasticInOut"] = 12] = "easeElasticInOut";
    EaseType[EaseType["easeBounceIn"] = 13] = "easeBounceIn";
    EaseType[EaseType["easeBounceOut"] = 14] = "easeBounceOut";
    EaseType[EaseType["easeBounceInOut"] = 15] = "easeBounceInOut";
    EaseType[EaseType["easeBackIn"] = 16] = "easeBackIn";
    EaseType[EaseType["easeBackOut"] = 17] = "easeBackOut";
    EaseType[EaseType["easeBackInOut"] = 18] = "easeBackInOut";
    EaseType[EaseType["easeBezierAction"] = 19] = "easeBezierAction";
    EaseType[EaseType["easeQuadraticActionIn"] = 20] = "easeQuadraticActionIn";
    EaseType[EaseType["easeQuadraticActionOut"] = 21] = "easeQuadraticActionOut";
    EaseType[EaseType["easeQuadraticActionInOut"] = 22] = "easeQuadraticActionInOut";
    EaseType[EaseType["easeQuarticActionIn"] = 23] = "easeQuarticActionIn";
    EaseType[EaseType["easeQuarticActionOut"] = 24] = "easeQuarticActionOut";
    EaseType[EaseType["easeQuarticActionInOut"] = 25] = "easeQuarticActionInOut";
    EaseType[EaseType["easeQuinticActionIn"] = 26] = "easeQuinticActionIn";
    EaseType[EaseType["easeQuinticActionOut"] = 27] = "easeQuinticActionOut";
    EaseType[EaseType["easeQuinticActionInOut"] = 28] = "easeQuinticActionInOut";
    EaseType[EaseType["easeCircleActionIn"] = 29] = "easeCircleActionIn";
    EaseType[EaseType["easeCircleActionOut"] = 30] = "easeCircleActionOut";
    EaseType[EaseType["easeCircleActionInOut"] = 31] = "easeCircleActionInOut";
    EaseType[EaseType["easeCubicActionIn"] = 32] = "easeCubicActionIn";
    EaseType[EaseType["easeCubicActionOut"] = 33] = "easeCubicActionOut";
    EaseType[EaseType["easeCubicActionInOut"] = 34] = "easeCubicActionInOut";
})(EaseType = exports.EaseType || (exports.EaseType = {}));
var QEasing = /** @class */ (function (_super) {
    __extends(QEasing, _super);
    function QEasing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.easeType = EaseType.none;
        return _this;
    }
    QEasing.prototype._getEase = function () {
        switch (this.easeType) {
            case EaseType.none: {
                return "linear";
            }
            case EaseType.easeOut: {
                return "easeOut";
            }
            case EaseType.easeInOut: {
                return "easeInOut";
            }
            case EaseType.easeExponentialIn: {
                return "easeExponentialIn";
            }
            case EaseType.easeExponentialOut: {
                return "easeExponentialOut";
            }
            case EaseType.easeExponentialInOut: {
                return "easeExponentialInOut";
            }
            case EaseType.easeSineIn: {
                return "sineIn";
            }
            case EaseType.easeSineOut: {
                return "sineOut";
            }
            case EaseType.easeSineInOut: {
                return "sineInOut";
            }
            case EaseType.easeElasticIn: {
                return "elasticIn";
            }
            case EaseType.easeElasticOut: {
                return "elasticOut";
            }
            case EaseType.easeElasticInOut: {
                return "elasticInOut";
            }
            case EaseType.easeBounceIn: {
                return "bounceIn";
            }
            case EaseType.easeBounceOut: {
                return "bounceOut";
            }
            case EaseType.easeBackIn: {
                return "backIn";
            }
            case EaseType.easeBackOut: {
                return 'backOut';
            }
            case EaseType.easeBackInOut: {
                return "backInOut";
            }
            case EaseType.easeQuadraticActionIn: {
                return "quadraticActionIn";
            }
            case EaseType.easeQuadraticActionOut: {
                return "quadraticActionOut";
            }
            case EaseType.easeQuadraticActionInOut: {
                return "quadraticActionInOut";
            }
            case EaseType.easeQuarticActionIn: {
                return "quarticActionIn";
            }
            case EaseType.easeQuarticActionOut: {
                return "quarticActionOut";
            }
            case EaseType.easeQuarticActionInOut: {
                return "quarticActionInOut";
            }
            case EaseType.easeQuinticActionIn: {
                return "quinticActionIn";
            }
            case EaseType.easeQuinticActionOut: {
                return "quinticActionOut";
            }
            case EaseType.easeQuinticActionInOut: {
                return "quinticActionInOut";
            }
            case EaseType.easeCircleActionIn: {
                return "easeCircleActionIn";
            }
            case EaseType.easeCircleActionOut: {
                return "circleActionOut";
            }
            case EaseType.easeCircleActionInOut: {
                return "circleActionInOut";
            }
            case EaseType.easeCubicActionIn: {
                return "cubicActionIn";
            }
            case EaseType.easeCubicActionOut: {
                return "cubicActionOut";
            }
            case EaseType.easeCubicActionInOut: {
                return "cubicActionInOut";
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(EaseType) })
    ], QEasing.prototype, "easeType", void 0);
    QEasing = __decorate([
        ccclass
    ], QEasing);
    return QEasing;
}(cc.Component));
exports.default = QEasing;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxRRWFzaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QyxJQUFZLFFBb0NYO0FBcENELFdBQVksUUFBUTtJQUNoQix1Q0FBUSxDQUFBO0lBQ1IsMkNBQU0sQ0FBQTtJQUNOLDZDQUFPLENBQUE7SUFDUCxpREFBUyxDQUFBO0lBQ1QsaUVBQWlCLENBQUE7SUFDakIsbUVBQWtCLENBQUE7SUFDbEIsdUVBQW9CLENBQUE7SUFDcEIsbURBQVUsQ0FBQTtJQUNWLHFEQUFXLENBQUE7SUFDWCx5REFBYSxDQUFBO0lBQ2IsMERBQWEsQ0FBQTtJQUNiLDREQUFjLENBQUE7SUFDZCxnRUFBZ0IsQ0FBQTtJQUNoQix3REFBWSxDQUFBO0lBQ1osMERBQWEsQ0FBQTtJQUNiLDhEQUFlLENBQUE7SUFDZixvREFBVSxDQUFBO0lBQ1Ysc0RBQVcsQ0FBQTtJQUNYLDBEQUFhLENBQUE7SUFDYixnRUFBZ0IsQ0FBQTtJQUNoQiwwRUFBcUIsQ0FBQTtJQUNyQiw0RUFBc0IsQ0FBQTtJQUN0QixnRkFBd0IsQ0FBQTtJQUN4QixzRUFBbUIsQ0FBQTtJQUNuQix3RUFBb0IsQ0FBQTtJQUNwQiw0RUFBc0IsQ0FBQTtJQUN0QixzRUFBbUIsQ0FBQTtJQUNuQix3RUFBb0IsQ0FBQTtJQUNwQiw0RUFBc0IsQ0FBQTtJQUN0QixvRUFBa0IsQ0FBQTtJQUNsQixzRUFBbUIsQ0FBQTtJQUNuQiwwRUFBcUIsQ0FBQTtJQUNyQixrRUFBaUIsQ0FBQTtJQUNqQixvRUFBa0IsQ0FBQTtJQUNsQix3RUFBb0IsQ0FBQTtBQUN4QixDQUFDLEVBcENXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBb0NuQjtBQUdEO0lBQXFDLDJCQUFZO0lBQWpE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QUNELEtBQUssUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzlCLE9BQU8sb0JBQW9CLENBQUM7YUFDL0I7WUFDRCxLQUFLLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUMvQixPQUFPLGlCQUFpQixDQUFDO2FBQzVCO1lBQ0QsS0FBSyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDakMsT0FBTyxtQkFBbUIsQ0FBQzthQUM5QjtZQUNELEtBQUssUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdCLE9BQU8sZUFBZSxDQUFDO2FBQzFCO1lBQ0QsS0FBSyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxnQkFBZ0IsQ0FBQzthQUMzQjtZQUNELEtBQUssUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sa0JBQWtCLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7SUFyR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDOzZDQUNIO0lBSGxCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0EwRzNCO0lBQUQsY0FBQztDQTFHRCxBQTBHQyxDQTFHb0MsRUFBRSxDQUFDLFNBQVMsR0EwR2hEO2tCQTFHb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuXHJcbmV4cG9ydCBlbnVtIEVhc2VUeXBlIHtcclxuICAgIG5vbmUgPSAwLFxyXG4gICAgZWFzZUluLFxyXG4gICAgZWFzZU91dCxcclxuICAgIGVhc2VJbk91dCxcclxuICAgIGVhc2VFeHBvbmVudGlhbEluLFxyXG4gICAgZWFzZUV4cG9uZW50aWFsT3V0LFxyXG4gICAgZWFzZUV4cG9uZW50aWFsSW5PdXQsXHJcbiAgICBlYXNlU2luZUluLFxyXG4gICAgZWFzZVNpbmVPdXQsXHJcbiAgICBlYXNlU2luZUluT3V0LFxyXG4gICAgZWFzZUVsYXN0aWNJbixcclxuICAgIGVhc2VFbGFzdGljT3V0LFxyXG4gICAgZWFzZUVsYXN0aWNJbk91dCxcclxuICAgIGVhc2VCb3VuY2VJbixcclxuICAgIGVhc2VCb3VuY2VPdXQsXHJcbiAgICBlYXNlQm91bmNlSW5PdXQsXHJcbiAgICBlYXNlQmFja0luLFxyXG4gICAgZWFzZUJhY2tPdXQsXHJcbiAgICBlYXNlQmFja0luT3V0LFxyXG4gICAgZWFzZUJlemllckFjdGlvbixcclxuICAgIGVhc2VRdWFkcmF0aWNBY3Rpb25JbixcclxuICAgIGVhc2VRdWFkcmF0aWNBY3Rpb25PdXQsXHJcbiAgICBlYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQsXHJcbiAgICBlYXNlUXVhcnRpY0FjdGlvbkluLFxyXG4gICAgZWFzZVF1YXJ0aWNBY3Rpb25PdXQsXHJcbiAgICBlYXNlUXVhcnRpY0FjdGlvbkluT3V0LFxyXG4gICAgZWFzZVF1aW50aWNBY3Rpb25JbixcclxuICAgIGVhc2VRdWludGljQWN0aW9uT3V0LFxyXG4gICAgZWFzZVF1aW50aWNBY3Rpb25Jbk91dCxcclxuICAgIGVhc2VDaXJjbGVBY3Rpb25JbixcclxuICAgIGVhc2VDaXJjbGVBY3Rpb25PdXQsXHJcbiAgICBlYXNlQ2lyY2xlQWN0aW9uSW5PdXQsXHJcbiAgICBlYXNlQ3ViaWNBY3Rpb25JbixcclxuICAgIGVhc2VDdWJpY0FjdGlvbk91dCxcclxuICAgIGVhc2VDdWJpY0FjdGlvbkluT3V0XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFFFYXNpbmcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oRWFzZVR5cGUpIH0pXHJcbiAgICBlYXNlVHlwZTogRWFzZVR5cGUgPSBFYXNlVHlwZS5ub25lO1xyXG5cclxuICAgIHByb3RlY3RlZCBfZ2V0RWFzZSgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZWFzZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5ub25lOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJsaW5lYXJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VPdXQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImVhc2VPdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VJbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWFzZUluT3V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlRXhwb25lbnRpYWxJbjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWFzZUV4cG9uZW50aWFsSW5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VFeHBvbmVudGlhbE91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWFzZUV4cG9uZW50aWFsT3V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlRXhwb25lbnRpYWxJbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWFzZUV4cG9uZW50aWFsSW5PdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VTaW5lSW46IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInNpbmVJblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZVNpbmVPdXQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInNpbmVPdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VTaW5lSW5PdXQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInNpbmVJbk91dFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUVsYXN0aWNJbjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWxhc3RpY0luXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlRWxhc3RpY091dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWxhc3RpY091dFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUVsYXN0aWNJbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWxhc3RpY0luT3V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlQm91bmNlSW46IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImJvdW5jZUluXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlQm91bmNlT3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJib3VuY2VPdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VCYWNrSW46IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImJhY2tJblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZUJhY2tPdXQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnYmFja091dCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlQmFja0luT3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJiYWNrSW5PdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VRdWFkcmF0aWNBY3Rpb25Jbjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicXVhZHJhdGljQWN0aW9uSW5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInF1YWRyYXRpY0FjdGlvbk91dFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZVF1YWRyYXRpY0FjdGlvbkluT3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJxdWFkcmF0aWNBY3Rpb25Jbk91dFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZVF1YXJ0aWNBY3Rpb25Jbjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicXVhcnRpY0FjdGlvbkluXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVhcnRpY0FjdGlvbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicXVhcnRpY0FjdGlvbk91dFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRWFzZVR5cGUuZWFzZVF1YXJ0aWNBY3Rpb25Jbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicXVhcnRpY0FjdGlvbkluT3V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVpbnRpY0FjdGlvbkluOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJxdWludGljQWN0aW9uSW5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VRdWludGljQWN0aW9uT3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJxdWludGljQWN0aW9uT3V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlUXVpbnRpY0FjdGlvbkluT3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJxdWludGljQWN0aW9uSW5PdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VDaXJjbGVBY3Rpb25Jbjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWFzZUNpcmNsZUFjdGlvbkluXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlQ2lyY2xlQWN0aW9uT3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjaXJjbGVBY3Rpb25PdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VDaXJjbGVBY3Rpb25Jbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2lyY2xlQWN0aW9uSW5PdXRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVhc2VUeXBlLmVhc2VDdWJpY0FjdGlvbkluOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjdWJpY0FjdGlvbkluXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlQ3ViaWNBY3Rpb25PdXQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImN1YmljQWN0aW9uT3V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFYXNlVHlwZS5lYXNlQ3ViaWNBY3Rpb25Jbk91dDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY3ViaWNBY3Rpb25Jbk91dFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=