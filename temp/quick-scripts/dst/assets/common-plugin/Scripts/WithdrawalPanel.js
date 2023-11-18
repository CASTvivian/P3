
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/WithdrawalPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcV2l0aGRyYXdhbFBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlDQUFnQztBQUNoQyw2Q0FBNEQ7QUFLdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFtSEM7UUFqSFcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUNsQyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWlCLElBQUksQ0FBQztRQUd6QyxlQUFTLEdBQWdCLHlCQUFXLENBQUMsVUFBVSxDQUFDO1FBMkNoRCw2QkFBdUIsR0FBVyxDQUFDLENBQUMsQ0FBQzs7SUE2RHpDLENBQUM7SUF0R0csZ0NBQU0sR0FBTjtRQUNJLElBQUksYUFBSyxDQUFDLFdBQVcsSUFBSSxhQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztTQUM3QztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNuRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFF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SUFFSixzQ0FBWSxHQUFaO1FBQ0ksYUFBSyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTztJQUNYLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksWUFBMEI7SUFFdEMsQ0FBQztJQUVNLDhCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVNLDhCQUFJLEdBQVg7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsNktBQTZLO1FBQzdLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixRQUFRO1FBQ1Isb0NBQW9DO1FBQ3BDLHVEQUF1RDtRQUN2RCxJQUFJO0lBQ1IsQ0FBQztJQUVNLDJDQUFpQixHQUF4QixVQUF5QixLQUFVLEVBQUUsSUFBUztRQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQWxIZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQW1IbkM7SUFBRCxzQkFBQztDQW5IRCxBQW1IQyxDQW5INEMsRUFBRSxDQUFDLFNBQVMsR0FtSHhEO2tCQW5Ib0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lSXRlbSBmcm9tIFwiLi9HYW1lSXRlbVwiO1xyXG5pbXBvcnQgUUNyb3NzV2lkZ2V0SXRlbSBmcm9tIFwiLi9RQ3Jvc3NXaWRnZXRJdGVtXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24sIFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcbmltcG9ydCB7IFl6UmVkQmFnSW5mbyB9IGZyb20gXCIuL0NvbW1vbkNvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXRoZHJhd2FsUGFuZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgX2Nsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3dpdGhkcmF3YWxCdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbW9uZXlJdGVtTm9kZXM6IGNjLk5vZGVbXSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9iYWxhbmNlTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVkQmFnSW5mbzogWXpSZWRCYWdJbmZvID0gbnVsbDtcclxuXHJcblxyXG4gICAgX2xvY2F0aW9uOiBTdWJMb2NhdGlvbiA9IFN1YkxvY2F0aW9uLmlzTW9yZUdhbWU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmICh1dGlscy5vdGhlckNvbmZpZyAmJiB1dGlscy5vdGhlckNvbmZpZy5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGFuZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLl9tb25leUl0ZW1Ob2RlcyA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiV2l0aGRyYXdhbFByaWNlTm9kZXNcIikuY2hpbGRyZW47XHJcbiAgICAgICAgdGhpcy5fYmFsYW5jZUxibCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiYmFsYW5jZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9yZWRCYWdJbmZvID0gdXRpbHMueXpSZWRCYWdJbmZvO1xyXG5cclxuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcGFuZWwuc2NhbGUgPSByYXRpbztcclxuICAgICAgICB0aGlzLl9pbml0V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIF9pbml0V2lkZ2V0KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmVkQmFnSW5mby5iYWxhbmNlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYWxhbmNlTGJsLnN0cmluZyA9IGAke3RoaXMuX3JlZEJhZ0luZm8uYmFsYW5jZX3lhYNgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB1dGlscy55elJlZEJhZ0luZm8ud2l0aGRyYXdhTW9uZXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9uZXlJdGVtTm9kZXNbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmljZUxibFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2RhdGF95YWDYFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9uZXlJdGVtTm9kZXNbaV0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9uZXlOb2RlKGkpXHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2VsZWN0ZWRNb25leUl0ZW1JbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBzZWxlY3RlZE1vbmV5Tm9kZShpdGVtSW5kZXgpIHtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZWRCYWdJbmZvLmJhbGFuY2UgPj0gdXRpbHMueXpSZWRCYWdJbmZvLndpdGhkcmF3YU1vbmV5c1tpdGVtSW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkTW9uZXlJdGVtSW5kZXggPSBpdGVtSW5kZXg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9tb25leUl0ZW1Ob2Rlcy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmRleCAhPSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vbmV5SXRlbU5vZGVzW2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInNlbGVjdGVkQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9tb25leUl0ZW1Ob2Rlc1tpdGVtSW5kZXhdLmdldENoaWxkQnlOYW1lKFwic2VsZWN0ZWRCZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLlvZPliY3kvZnpop3kuI3otrPvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdpdGhEcmF3YWxNb25leSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm1vbmV5XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZE1vbmV5SXRlbUluZGV4ID4gLTEpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcIuivt+mAieaLqeimgeaPkOeOsOeahOmHkemine+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKCkge1xyXG4gICAgLy8gICAgIGlmICh0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX3VwZGF0ZVBhbmVsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIF91cGRhdGVQYW5lbCgpIHtcclxuICAgICAgICB1dGlscy5wb3N0UmVjb21tZW50U2hvd0RhdGEodGhpcy5fbG9jYXRpb24pO1xyXG4gICAgICAgIHRoaXMuX2luaXRXaWRnZXQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoWXpSZWRCYWdJbmZvOiBZelJlZEJhZ0luZm8pIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIHRoaXMuX3BhbmVsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4zLCBDb21wYXRpYmxlVG9vbC5wb3NpdGlvbigtdGhpcy5fcGFuZWwuZ2V0Q29udGVudFNpemUoKS53aWR0aCwgMCkpLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uT3V0KCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH0pKSk7XHJcbiAgICAgICAgLy8gaWYgKCFQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKEJhbm5lckxvY2F0aW9uLkhvbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZUJ0bkhhbmRsZXIoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19