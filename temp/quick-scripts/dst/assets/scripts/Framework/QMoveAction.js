
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/QMoveAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6fc8aO5YvdLWLunFhyStsI8', 'QMoveAction');
// scripts/Framework/QMoveAction.ts

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
var QMoveAction = /** @class */ (function (_super) {
    __extends(QMoveAction, _super);
    function QMoveAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delay = 0;
        _this.delPos = cc.Vec2.ZERO;
        _this.duration = 0;
        _this.interval = 0;
        _this.loop = false;
        _this.revert = false;
        _this._tween = null;
        _this._originPos = cc.Vec3.ZERO;
        return _this;
    }
    QMoveAction.prototype.onLoad = function () {
        var _this = this;
        this._originPos = cc.v3(this.node.x, this.node.y);
        this.node.position = cc.v3(this._originPos.x - this.delPos.x, this._originPos.y - this.delPos.y);
        var widget = this.getComponent(cc.Widget);
        if (widget) {
            widget.enabled = false;
        }
        var delayTween = cc.tween().delay(this.delay);
        var actionTween = cc.tween();
        actionTween.call(function () {
            _this.node.position = cc.v3(_this._originPos.x - _this.delPos.x, _this._originPos.y - _this.delPos.y);
        });
        if (this.revert) {
            actionTween.by(this.duration * 0.5, { position: cc.v3(this.delPos.x, this.delPos.y) }, { easing: this._getEase() });
            actionTween.by(this.duration * 0.5, { position: cc.v3(-this.delPos.x, -this.delPos.y) }, { easing: this._getEase() });
        }
        else {
            actionTween.by(this.duration, { position: cc.v3(this.delPos.x, this.delPos.y) }, { easing: this._getEase() });
        }
        actionTween.delay(this.interval);
        this._tween = cc.tween(this.node);
        this._tween.then(delayTween);
        this._tween.then(actionTween);
        if (this.loop) {
            this._tween.repeatForever();
        }
    };
    QMoveAction.prototype.onEnable = function () {
        this.node.position = cc.v3(this._originPos.x - this.delPos.x, this._originPos.y - this.delPos.y);
        this._tween.start();
    };
    __decorate([
        property()
    ], QMoveAction.prototype, "delay", void 0);
    __decorate([
        property(cc.Vec2)
    ], QMoveAction.prototype, "delPos", void 0);
    __decorate([
        property()
    ], QMoveAction.prototype, "duration", void 0);
    __decorate([
        property()
    ], QMoveAction.prototype, "interval", void 0);
    __decorate([
        property()
    ], QMoveAction.prototype, "loop", void 0);
    __decorate([
        property()
    ], QMoveAction.prototype, "revert", void 0);
    QMoveAction = __decorate([
        ccclass
    ], QMoveAction);
    return QMoveAction;
}(QEasing_1.default));
exports.default = QMoveAction;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxRTW92ZUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBeUMsK0JBQU87SUFBaEQ7UUFBQSxxRUE0REM7UUF6REcsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUdsQixZQUFNLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFHL0IsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLFVBQUksR0FBWSxLQUFLLENBQUM7UUFHdEIsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUVoQixZQUFNLEdBQWEsSUFBSSxDQUFDO1FBQ3hCLGdCQUFVLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O0lBdUMvQyxDQUFDO0lBckNHLDRCQUFNLEdBQU47UUFBQSxpQkE0QkM7UUEzQkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpHLElBQUksTUFBTSxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JE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O0lBR3RCO1FBREMsUUFBUSxFQUFFOytDQUNhO0lBbEJQLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E0RC9CO0lBQUQsa0JBQUM7Q0E1REQsQUE0REMsQ0E1RHdDLGlCQUFPLEdBNEQvQztrQkE1RG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUUVhc2luZywgeyBFYXNlVHlwZSB9IGZyb20gXCIuL1FFYXNpbmdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUU1vdmVBY3Rpb24gZXh0ZW5kcyBRRWFzaW5nIHtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgZGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlZlYzIpXHJcbiAgICBkZWxQb3M6IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBpbnRlcnZhbDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICByZXZlcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF90d2VlbjogY2MuVHdlZW4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfb3JpZ2luUG9zOiBjYy5WZWMzID0gY2MuVmVjMy5aRVJPO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9vcmlnaW5Qb3MgPSBjYy52Myh0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuX29yaWdpblBvcy54IC0gdGhpcy5kZWxQb3MueCwgdGhpcy5fb3JpZ2luUG9zLnkgLSB0aGlzLmRlbFBvcy55KTtcclxuXHJcbiAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBpZiAod2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpZGdldC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVsYXlUd2VlbjogY2MuVHdlZW4gPSBjYy50d2VlbigpLmRlbGF5KHRoaXMuZGVsYXkpO1xyXG4gICAgICAgIGxldCBhY3Rpb25Ud2VlbjogY2MuVHdlZW4gPSBjYy50d2VlbigpO1xyXG4gICAgICAgIGFjdGlvblR3ZWVuLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBjYy52Myh0aGlzLl9vcmlnaW5Qb3MueCAtIHRoaXMuZGVsUG9zLngsIHRoaXMuX29yaWdpblBvcy55IC0gdGhpcy5kZWxQb3MueSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucmV2ZXJ0KSB7XHJcbiAgICAgICAgICAgIGFjdGlvblR3ZWVuLmJ5KHRoaXMuZHVyYXRpb24gKiAwLjUsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMuZGVsUG9zLngsIHRoaXMuZGVsUG9zLnkpIH0sIHsgZWFzaW5nOiB0aGlzLl9nZXRFYXNlKCkgfSk7XHJcbiAgICAgICAgICAgIGFjdGlvblR3ZWVuLmJ5KHRoaXMuZHVyYXRpb24gKiAwLjUsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLmRlbFBvcy54LCAtdGhpcy5kZWxQb3MueSkgfSwgeyBlYXNpbmc6IHRoaXMuX2dldEVhc2UoKSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY3Rpb25Ud2Vlbi5ieSh0aGlzLmR1cmF0aW9uLCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLmRlbFBvcy54LCB0aGlzLmRlbFBvcy55KSB9LCB7IGVhc2luZzogdGhpcy5fZ2V0RWFzZSgpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhY3Rpb25Ud2Vlbi5kZWxheSh0aGlzLmludGVydmFsKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHdlZW4gPSBjYy50d2Vlbih0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuLnRoZW4oZGVsYXlUd2Vlbik7XHJcbiAgICAgICAgdGhpcy5fdHdlZW4udGhlbihhY3Rpb25Ud2Vlbik7XHJcbiAgICAgICAgaWYgKHRoaXMubG9vcCkge1xyXG4gICAgICAgICAgICB0aGlzLl90d2Vlbi5yZXBlYXRGb3JldmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuX29yaWdpblBvcy54IC0gdGhpcy5kZWxQb3MueCwgdGhpcy5fb3JpZ2luUG9zLnkgLSB0aGlzLmRlbFBvcy55KTtcclxuICAgICAgICB0aGlzLl90d2Vlbi5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==