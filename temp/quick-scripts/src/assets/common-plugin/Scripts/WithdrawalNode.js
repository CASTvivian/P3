"use strict";
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