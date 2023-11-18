
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/WithdrawalNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba4b6OkUPVGs6rVbTzptHpa', 'WithdrawalNode');
// common-plugin/Scripts/WithdrawalNode.ts

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
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WithdrawalNode = /** @class */ (function (_super) {
    __extends(WithdrawalNode, _super);
    function WithdrawalNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.balanceLbl = null;
        return _this;
    }
    WithdrawalNode.prototype.onLoad = function () {
        this.balanceLbl = this.node.getComponentInChildren(cc.Label);
    };
    WithdrawalNode.prototype.init = function (data) {
        if (Utils_1.utils.yzRedBagInfo.balance > 0) {
            this.balanceLbl.string = "\u00A5" + Utils_1.utils.yzRedBagInfo.balance;
        }
        else {
            this.balanceLbl.string = "\u00A50.00";
        }
    };
    WithdrawalNode.prototype.showWithdrawalPanel = function () {
        Utils_1.utils.SendEvent("红包提现框-点击提现按钮！");
        Utils_1.utils.showWithdrawalPanel();
    };
    WithdrawalNode.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.SendEvent("红包提现框-展示成功！");
        this.init();
        cc.game.on("YZ_RED_BAG_BALANCE_CHANGE", function () {
            _this.init();
        }, this);
    };
    WithdrawalNode.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
        cc.game.targetOff(this);
    };
    WithdrawalNode = __decorate([
        ccclass
    ], WithdrawalNode);
    return WithdrawalNode;
}(cc.Component));
exports.default = WithdrawalNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcV2l0aGRyYXdhbE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBSzFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBdUNDO1FBdENHLGdCQUFVLEdBQWEsSUFBSSxDQUFDOztJQXNDaEMsQ0FBQztJQXBDRywrQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRU0sNkJBQUksR0FBWCxVQUFZLElBQVU7UUFDbEIsSUFBSSxhQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsV0FBSSxhQUFLLENBQUMsWUFBWSxDQUFDLE9BQVMsQ0FBQTtTQUM1RDthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBTyxDQUFBO1NBQ25DO0lBQ0wsQ0FBQztJQUdELDRDQUFtQixHQUFuQjtRQUNJLGFBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakMsYUFBSyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUdELGlDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLGFBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMkJBQTJCLEVBQUU7WUFDcEMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQWxDZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVDbEM7SUFBRCxxQkFBQztDQXZDRCxBQXVDQyxDQXZDMkMsRUFBRSxDQUFDLFNBQVMsR0F1Q3ZEO2tCQXZDb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXRoZHJhd2FsTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBiYWxhbmNlTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuYmFsYW5jZUxibCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBpZiAodXRpbHMueXpSZWRCYWdJbmZvLmJhbGFuY2UgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZUxibC5zdHJpbmcgPSBgwqUke3V0aWxzLnl6UmVkQmFnSW5mby5iYWxhbmNlfWBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2VMYmwuc3RyaW5nID0gYMKlMC4wMGBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dXaXRoZHJhd2FsUGFuZWwoKSB7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi57qi5YyF5o+Q546w5qGGLeeCueWHu+aPkOeOsOaMiemSru+8gVwiKTtcclxuICAgICAgICB1dGlscy5zaG93V2l0aGRyYXdhbFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue6ouWMheaPkOeOsOahhi3lsZXnpLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihcIllaX1JFRF9CQUdfQkFMQU5DRV9DSEFOR0VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19