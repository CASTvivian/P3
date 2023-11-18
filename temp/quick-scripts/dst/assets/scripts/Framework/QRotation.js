
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/QRotation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxRUm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQThDO0FBRXhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBMENDO1FBdkNHLFdBQUssR0FBVyxDQUFDLENBQUM7UUFHbEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUdsQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLFVBQUksR0FBWSxLQUFLLENBQUM7UUFHdEIsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUVoQixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixZQUFNLEdBQWEsSUFBSSxDQUFDOztJQXdCcEMsQ0FBQztJQXRCRyw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLFVBQVUsR0FBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLFdBQVcsR0FBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ1gsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsQ0FBQztTQUM1SDthQUFJO1lBQ0QsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUM7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQXRDRDtRQURDLFFBQVEsRUFBRTtnREFDTztJQUdsQjtRQURDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUMsQ0FBQztnREFDakI7SUFHbEI7UUFEQyxRQUFRLEVBQUU7bURBQ1U7SUFHckI7UUFEQyxRQUFRLEVBQUU7K0NBQ1c7SUFHdEI7UUFEQyxRQUFRLEVBQUU7aURBQ2E7SUFmUCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBMENqQztJQUFELG9CQUFDO0NBMUNELEFBMENDLENBMUMwQyxpQkFBTyxHQTBDakQ7a0JBMUNvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFFFYXNpbmcsIHsgRWFzZVR5cGUgfSBmcm9tIFwiLi9RRWFzaW5nXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFFSb3RhdGVBY3Rpb24gZXh0ZW5kcyBRRWFzaW5nIHtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgZGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0b29sdGlwOiBcIuWIneWni+inkuW6pu+8jOmhuuaXtumSiOS4uui0n+aVsFwifSlcclxuICAgIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBkdXJhdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICByZXZlcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9vcmlnaW5BbmdsZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3R3ZWVuOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luQW5nbGUgPSB0aGlzLm5vZGUuYW5nbGU7XHJcbiAgICAgICAgbGV0IGRlbGF5VHdlZW46Y2MuVHdlZW4gPSBjYy50d2VlbigpLmRlbGF5KHRoaXMuZGVsYXkpO1xyXG4gICAgICAgIGxldCBhY3Rpb25Ud2VlbjogY2MuVHdlZW4gPSBjYy50d2VlbigpO1xyXG4gICAgICAgIGlmKHRoaXMucmV2ZXJ0KXtcclxuICAgICAgICAgICAgYWN0aW9uVHdlZW4uYnkodGhpcy5kdXJhdGlvbi8yLHthbmdsZTogdGhpcy5hbmdsZX0pLmJ5KHRoaXMuZHVyYXRpb24vMiwge2FuZ2xlOiAtdGhpcy5hbmdsZX0sIHtlYXNpbmc6IHRoaXMuX2dldEVhc2UoKX0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhY3Rpb25Ud2Vlbi5ieSh0aGlzLmR1cmF0aW9uLCB7YW5nbGU6IHRoaXMuYW5nbGV9LCB7ZWFzaW5nOiB0aGlzLl9nZXRFYXNlKCl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3R3ZWVuID0gY2MudHdlZW4odGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl90d2Vlbi50aGVuKGRlbGF5VHdlZW4pO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuLnRoZW4oYWN0aW9uVHdlZW4pO1xyXG4gICAgICAgIGlmKHRoaXMubG9vcCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3ZWVuLnJlcGVhdEZvcmV2ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSB0aGlzLl9vcmlnaW5BbmdsZTtcclxuICAgICAgICB0aGlzLl90d2Vlbi5zdGFydCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==