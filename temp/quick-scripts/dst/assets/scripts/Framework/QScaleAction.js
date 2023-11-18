
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/QScaleAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxRU2NhbGVBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFPO0lBQWpEO1FBQUEscUVBa0RDO1FBL0NHLFdBQUssR0FBVyxDQUFDLENBQUM7UUFHbEIsZUFBUyxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBR2xDLGlCQUFXLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFHcEMsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixVQUFJLEdBQVksS0FBSyxDQUFDO1FBR3RCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFFaEIsWUFBTSxHQUFhLElBQUksQ0FBQzs7SUE4QnBDLENBQUM7SUE1QkcsNkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRXBDLElBQUksVUFBVSxHQUFhLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixJQUFJLFdBQVcsR0FBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ1gsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1lBQ3ZILFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxHQUFHLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsQ0FBQztTQUN0SDthQUFJO1lBQ0QsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDLENBQUM7U0FDdEg7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlCLElBQUcsSUFBSSxDQUFDLElBQUksRUFBQztZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTlDRDtRQURDLFFBQVEsRUFBRTsrQ0FDTztJQUdsQjtRQURDLFFBQVEsRUFBRTttREFDdUI7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDa0I7SUFHcEM7UUFEQyxRQUFRLEVBQUU7a0RBQ1U7SUFHckI7UUFEQyxRQUFRLEVBQUU7OENBQ1c7SUFHdEI7UUFEQyxRQUFRLEVBQUU7Z0RBQ2E7SUFsQlAsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWtEaEM7SUFBRCxtQkFBQztDQWxERCxBQWtEQyxDQWxEeUMsaUJBQU8sR0FrRGhEO2tCQWxEb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBRRWFzaW5nLCB7IEVhc2VUeXBlIH0gZnJvbSBcIi4vUUVhc2luZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFFTY2FsZUFjdGlvbiBleHRlbmRzIFFFYXNpbmcge1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBkZWxheTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgZnJvbVNjYWxlOiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5WZWMyKVxyXG4gICAgdGFyZ2V0U2NhbGU6IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBsb29wOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIHJldmVydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3R3ZWVuOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuZnJvbVNjYWxlLng7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IHRoaXMuZnJvbVNjYWxlLnk7XHJcblxyXG4gICAgICAgIGxldCBkZWxheVR3ZWVuOiBjYy5Ud2VlbiA9IGNjLnR3ZWVuKCk7XHJcbiAgICAgICAgZGVsYXlUd2Vlbi5kZWxheSh0aGlzLmRlbGF5KTtcclxuXHJcbiAgICAgICAgbGV0IGFjdGlvblR3ZWVuOiBjYy5Ud2VlbiA9IGNjLnR3ZWVuKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZXZlcnQpe1xyXG4gICAgICAgICAgICBhY3Rpb25Ud2Vlbi50byh0aGlzLmR1cmF0aW9uKjAuNSwge3NjYWxlWDogdGhpcy50YXJnZXRTY2FsZS54LCBzY2FsZVk6IHRoaXMudGFyZ2V0U2NhbGUueX0sIHtlYXNpbmc6IHRoaXMuX2dldEVhc2UoKX0pO1xyXG4gICAgICAgICAgICBhY3Rpb25Ud2Vlbi50byh0aGlzLmR1cmF0aW9uKjAuNSwge3NjYWxlWDogdGhpcy5mcm9tU2NhbGUueCwgc2NhbGVZOiB0aGlzLmZyb21TY2FsZS55fSwge2Vhc2luZzogdGhpcy5fZ2V0RWFzZSgpfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFjdGlvblR3ZWVuLnRvKHRoaXMuZHVyYXRpb24sIHtzY2FsZVg6IHRoaXMudGFyZ2V0U2NhbGUueCwgc2NhbGVZOiB0aGlzLnRhcmdldFNjYWxlLnl9LCB7ZWFzaW5nOiB0aGlzLl9nZXRFYXNlKCl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3R3ZWVuID0gY2MudHdlZW4odGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl90d2Vlbi50aGVuKGRlbGF5VHdlZW4pO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuLnRoZW4oYWN0aW9uVHdlZW4pO1xyXG4gICAgICAgIGlmKHRoaXMubG9vcCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3ZWVuLnJlcGVhdEZvcmV2ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuZnJvbVNjYWxlLng7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IHRoaXMuZnJvbVNjYWxlLnk7XHJcbiAgICAgICAgdGhpcy5fdHdlZW4uc3RhcnQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=