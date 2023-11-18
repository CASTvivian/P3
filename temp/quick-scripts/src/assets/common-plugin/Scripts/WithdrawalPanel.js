"use strict";
cc._RF.push(module, '4495aojZMBHxqGZ7aIISklf', 'WithdrawalPanel');
// common-plugin/Scripts/WithdrawalPanel.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WithdrawalPanel = /** @class */ (function (_super) {
    __extends(WithdrawalPanel, _super);
    function WithdrawalPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._closeBtn = null;
        _this._withdrawalBtn = null;
        _this._moneyItemNodes = null;
        _this._panel = null;
        _this._balanceLbl = null;
        _this._redBagInfo = null;
        _this._location = YZ_Constant_1.SubLocation.isMoreGame;
        _this._selectedMoneyItemIndex = -1;
        return _this;
    }
    WithdrawalPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");
        this._moneyItemNodes = this._panel.getChildByName("WithdrawalPriceNodes").children;
        this._balanceLbl = this._panel.getChildByName("balanceLabel").getComponent(cc.Label);
        // this.node.active = false;
        this._redBagInfo = Utils_1.utils.yzRedBagInfo;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this._initWidget();
    };
    WithdrawalPanel.prototype._initWidget = function () {
        var _this = this;
        if (this._redBagInfo.balance > 0) {
            this._balanceLbl.string = this._redBagInfo.balance + "\u5143";
        }
        var _loop_1 = function (i) {
            var data = Utils_1.utils.yzRedBagInfo.withdrawaMoneys[i];
            if (data) {
                this_1._moneyItemNodes[i].getChildByName("PriceLbl").getComponent(cc.Label).string = data + "\u5143";
                this_1._moneyItemNodes[i].on(cc.Node.EventType.TOUCH_START, function () {
                    _this.selectedMoneyNode(i);
                }, this_1);
            }
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    WithdrawalPanel.prototype.selectedMoneyNode = function (itemIndex) {
        var _this = this;
        if (this._redBagInfo.balance >= Utils_1.utils.yzRedBagInfo.withdrawaMoneys[itemIndex]) {
            this._selectedMoneyItemIndex = itemIndex;
            this._moneyItemNodes.forEach(function (element, index) {
                if (itemIndex != index) {
                    _this._moneyItemNodes[index].getChildByName("selectedBg").active = false;
                }
            });
            this._moneyItemNodes[itemIndex].getChildByName("selectedBg").active = true;
        }
        else {
            Utils_1.utils.showMsg("当前余额不足！");
        }
    };
    WithdrawalPanel.prototype.withDrawalMoney = function () {
        console.log("money");
        if (this._selectedMoneyItemIndex > -1) {
        }
        else {
            Utils_1.utils.showMsg("请选择要提现的金额！");
        }
    };
    // update() {
    //     if (this._dataDirty) {
    //         this._dataDirty = false;
    //         this._updatePanel();
    //     }
    // }
    WithdrawalPanel.prototype._updatePanel = function () {
        Utils_1.utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    };
    WithdrawalPanel.prototype.init = function (YzRedBagInfo) {
    };
    WithdrawalPanel.prototype.show = function () {
        this.node.active = true;
    };
    WithdrawalPanel.prototype.hide = function () {
        var self = this;
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        self.node.active = false;
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    };
    WithdrawalPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    WithdrawalPanel = __decorate([
        ccclass
    ], WithdrawalPanel);
    return WithdrawalPanel;
}(cc.Component));
exports.default = WithdrawalPanel;

cc._RF.pop();