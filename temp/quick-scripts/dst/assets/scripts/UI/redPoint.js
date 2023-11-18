
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/redPoint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7a7b3Y69OtMNbE1nJjYg0PX', 'redPoint');
// scripts/UI/redPoint.ts

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
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var gameDate_1 = require("../Game/gameDate");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RedPointType;
(function (RedPointType) {
    RedPointType[RedPointType["none"] = 0] = "none";
    RedPointType[RedPointType["sign"] = 1] = "sign";
    RedPointType[RedPointType["turntable"] = 2] = "turntable";
    RedPointType[RedPointType["online"] = 3] = "online";
})(RedPointType || (RedPointType = {}));
var RedPoint = /** @class */ (function (_super) {
    __extends(RedPoint, _super);
    function RedPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = RedPointType.none;
        _this.refreshOnClick = true;
        _this.isRefresh = false;
        _this.isTweenAngle = false;
        _this.isTweenScale = false;
        _this.isListen = false;
        return _this;
    }
    RedPoint.prototype.start = function () {
        var _this = this;
        this.node.opacity = 0;
        // 刷新
        this.setRedPoint();
        if (this.isRefresh) {
            cc.tween(this.node)
                .delay(1)
                .call(function () { _this.setRedPoint(); })
                .union()
                .repeatForever()
                .start();
        }
        // 缓动角度
        if (this.isTweenAngle) {
            cc.tween(this.node).by(0.25, { angle: 15 }).by(0.25 * 2, { angle: -30 }).by(0.25, { angle: 15 }).delay(1).union().repeatForever().start();
        }
        // 缓动缩放
        if (this.isTweenScale) {
            cc.tween(this.node).by(0.25, { scale: 0.1 }).by(0.25 * 2, { scale: -0.2 }).by(0.25, { scale: 0.1 }).delay(1).union().repeatForever().start();
        }
        // 监听事件
        if (this.isListen) {
            cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        }
    };
    /** 销毁监听 */
    RedPoint.prototype.onDestroy = function () {
        cc.game.targetOff(this);
    };
    /** 监听事件 */
    RedPoint.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
        }
    };
    /** 监听消息 */
    RedPoint.prototype.onClick = function () {
        // 本地存储
        switch (this.type) {
        }
        // 点击父节点刷新红点
        if (this.refreshOnClick) {
            this.setRedPoint();
        }
    };
    /** 显示 */
    RedPoint.prototype.show = function () {
        this.node.opacity = 255;
        // 点击监听
        if (this.node.parent) {
            this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
        }
    };
    /** 隐藏 */
    RedPoint.prototype.hide = function () {
        this.node.opacity = 0;
        // 取消监听
        if (this.node.parent) {
            this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
        }
    };
    /** 设置红点  */
    RedPoint.prototype.setRedPoint = function () {
        switch (this.type) {
            case RedPointType.sign: {
                var bool = (new Date().toDateString() != CocosZ_1.cocosz.dataMgr.LastDailyBonusTime);
                bool ? this.show() : this.hide();
                break;
            }
            case RedPointType.turntable: {
                var bool = (CocosZ_1.cocosz.useCJTimes < Constant_1.default.commonCJTimes);
                bool ? this.show() : this.hide();
                break;
            }
            case RedPointType.online: {
                var arr = CocosZ_1.cocosz.dataMgr.receiveToday;
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i]) {
                        if (CocosZ_1.cocosz.dataMgr.OnlineToday > gameDate_1.default.TimeReward[i].time) {
                            this.show();
                            return;
                        }
                    }
                }
                this.hide();
                break;
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(RedPointType), tooltip: "红点类型" })
    ], RedPoint.prototype, "type", void 0);
    __decorate([
        property({ tooltip: "点击父节点刷新红点" })
    ], RedPoint.prototype, "refreshOnClick", void 0);
    __decorate([
        property({ tooltip: "是否刷新" })
    ], RedPoint.prototype, "isRefresh", void 0);
    __decorate([
        property({ tooltip: "是否缓动角度" })
    ], RedPoint.prototype, "isTweenAngle", void 0);
    __decorate([
        property({ tooltip: "是否缓动缩放" })
    ], RedPoint.prototype, "isTweenScale", void 0);
    __decorate([
        property({ tooltip: "是否监听" })
    ], RedPoint.prototype, "isListen", void 0);
    RedPoint = __decorate([
        ccclass
    ], RedPoint);
    return RedPoint;
}(cc.Component));
exports.default = RedPoint;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXHJlZFBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUM3QyxrREFBNkM7QUFDN0MsNkNBQXdDO0FBR2xDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssWUFLSjtBQUxELFdBQUssWUFBWTtJQUNiLCtDQUFRLENBQUE7SUFDUiwrQ0FBSSxDQUFBO0lBQ0oseURBQVMsQ0FBQTtJQUNULG1EQUFNLENBQUE7QUFDVixDQUFDLEVBTEksWUFBWSxLQUFaLFlBQVksUUFLaEI7QUFHRDtJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWtIQztRQS9HRyxVQUFJLEdBQVcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUdqQyxvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQVksS0FBSyxDQUFBO1FBRzFCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLGNBQVEsR0FBWSxLQUFLLENBQUM7O0lBZ0c5QixDQUFDO0lBOUZHLHdCQUFLLEdBQUw7UUFBQSxpQkF3QkM7UUF2QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEtBQUs7UUFDTCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDZCxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNSLElBQUksQ0FBQyxjQUFRLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkMsS0FBSyxFQUFFO2lCQUNQLGFBQWEsRUFBRTtpQkFDZixLQUFLLEVB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LEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzBDQUMxQjtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztvREFDSjtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzsrQ0FDSjtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztrREFDRjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztrREFDRjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs4Q0FDSjtJQWxCVCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBa0g1QjtJQUFELGVBQUM7Q0FsSEQsQUFrSEMsQ0FsSHFDLEVBQUUsQ0FBQyxTQUFTLEdBa0hqRDtrQkFsSG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgQ29uc3RhbnQgZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5pbXBvcnQgR2FtZURhdGUgZnJvbSBcIi4uL0dhbWUvZ2FtZURhdGVcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBSZWRQb2ludFR5cGUge1xyXG4gICAgbm9uZSA9IDAsXHJcbiAgICBzaWduLFxyXG4gICAgdHVybnRhYmxlLFxyXG4gICAgb25saW5lXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZFBvaW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKFJlZFBvaW50VHlwZSksIHRvb2x0aXA6IFwi57qi54K557G75Z6LXCIgfSlcclxuICAgIHR5cGU6IG51bWJlciA9IFJlZFBvaW50VHlwZS5ub25lO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi54K55Ye754i26IqC54K55Yi35paw57qi54K5XCIgfSlcclxuICAgIHJlZnJlc2hPbkNsaWNrOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuaYr+WQpuWIt+aWsFwiIH0pXHJcbiAgICBpc1JlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm57yT5Yqo6KeS5bqmXCIgfSlcclxuICAgIGlzVHdlZW5BbmdsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm57yT5Yqo57yp5pS+XCIgfSlcclxuICAgIGlzVHdlZW5TY2FsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm55uR5ZCsXCIgfSlcclxuICAgIGlzTGlzdGVuOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIC8vIOWIt+aWsFxyXG4gICAgICAgIHRoaXMuc2V0UmVkUG9pbnQoKTtcclxuICAgICAgICBpZiAodGhpcy5pc1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDEpXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMuc2V0UmVkUG9pbnQoKTsgfSlcclxuICAgICAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgICAgICAucmVwZWF0Rm9yZXZlcigpXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57yT5Yqo6KeS5bqmXHJcbiAgICAgICAgaWYgKHRoaXMuaXNUd2VlbkFuZ2xlKSB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuYnkoMC4yNSwgeyBhbmdsZTogMTUgfSkuYnkoMC4yNSAqIDIsIHsgYW5nbGU6IC0zMCB9KS5ieSgwLjI1LCB7IGFuZ2xlOiAxNSB9KS5kZWxheSgxKS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnvJPliqjnvKnmlL5cclxuICAgICAgICBpZiAodGhpcy5pc1R3ZWVuU2NhbGUpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLjI1LCB7IHNjYWxlOiAwLjEgfSkuYnkoMC4yNSAqIDIsIHsgc2NhbGU6IC0wLjIgfSkuYnkoMC4yNSwgeyBzY2FsZTogMC4xIH0pLmRlbGF5KDEpLnVuaW9uKCkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOebkeWQrOS6i+S7tlxyXG4gICAgICAgIGlmICh0aGlzLmlzTGlzdGVuKSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB0aGlzLl9vbkdhbWVNZXNzYWdlSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDplIDmr4Hnm5HlkKwgKi9cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOebkeWQrOS6i+S7tiAqL1xyXG4gICAgcHJpdmF0ZSBfb25HYW1lTWVzc2FnZUhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOebkeWQrOa2iOaBryAqL1xyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICAvLyDmnKzlnLDlrZjlgqhcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkgeyB9XHJcbiAgICAgICAgLy8g54K55Ye754i26IqC54K55Yi35paw57qi54K5XHJcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaE9uQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSZWRQb2ludCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5pi+56S6ICovXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIC8vIOeCueWHu+ebkeWQrFxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6ZqQ6JePICovXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAvLyDlj5bmtojnm5HlkKxcclxuICAgICAgICBpZiAodGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DbGljaywgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDorr7nva7nuqLngrkgICovXHJcbiAgICBzZXRSZWRQb2ludCgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJlZFBvaW50VHlwZS5zaWduOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9vbCA9IChuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpICE9IGNvY29zei5kYXRhTWdyLkxhc3REYWlseUJvbnVzVGltZSk7XHJcbiAgICAgICAgICAgICAgICBib29sID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUmVkUG9pbnRUeXBlLnR1cm50YWJsZToge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvb2wgPSAoY29jb3N6LnVzZUNKVGltZXMgPCBDb25zdGFudC5jb21tb25DSlRpbWVzKTtcclxuICAgICAgICAgICAgICAgIGJvb2wgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBSZWRQb2ludFR5cGUub25saW5lOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gY29jb3N6LmRhdGFNZ3IucmVjZWl2ZVRvZGF5O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFycltpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuT25saW5lVG9kYXkgPiBHYW1lRGF0ZS5UaW1lUmV3YXJkW2ldLnRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=