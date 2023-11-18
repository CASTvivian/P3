"use strict";
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