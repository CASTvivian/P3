
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/OpenRedBagPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'adbe7B8cB1B7Y2iqH4nM4BD', 'OpenRedBagPanel');
// common-plugin/Scripts/OpenRedBagPanel.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OpenRedBagPanel = /** @class */ (function (_super) {
    __extends(OpenRedBagPanel, _super);
    function OpenRedBagPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._moneyLbl = null;
        _this._totalMoneyLbl = null;
        _this._openPanel = null;
        _this._rewardPanel = null;
        _this._btnOpen = null;
        _this._redBagInfo = null;
        _this._btnClose = null;
        _this._btnVideoOpen = null;
        _this._title = null;
        _this._btnDouble = null;
        _this._proInfo = null;
        _this._money = 0;
        // update() {
        //     if (this._dataDirty) {
        //         this._dataDirty = false;
        //         this._updatePanel();
        //     }
        // }
        _this._canShowVideoOpen = false;
        _this._show_type = 1; // 1、每日红包 2、闯关红包 3、现金红包
        return _this;
    }
    // _location: SubLocation = SubLocation.isMoreGame;
    OpenRedBagPanel.prototype.onLoad = function () {
        var _this = this;
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        if (!PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Home);
        }
        this._panel = this.node.getChildByName("Panel");
        this._openPanel = this._panel.getChildByName("onOpenPanel");
        this._openPanel.setScale(0.5);
        this._openPanel.runAction(cc.scaleTo(0.3, 1));
        this._rewardPanel = this._panel.getChildByName("rewardPanel");
        this._btnOpen = this._openPanel.getChildByName("btnOpen");
        this._btnClose = this._panel.getChildByName("btnClose");
        this._btnVideoOpen = this._btnOpen.getChildByName("btn_openVideo");
        this._title = this._openPanel.getChildByName("title");
        this._totalMoneyLbl = this._rewardPanel.getChildByName("totalMoneyLabel").getComponent(cc.Label);
        this._moneyLbl = this._rewardPanel.getChildByName("moneyLbl").getComponent(cc.Label);
        this._btnDouble = this._rewardPanel.getChildByName("btnDouble");
        setTimeout(function () {
            _this._btnOpen.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }, 500);
        this._redBagInfo = Utils_1.utils.yzRedBagInfo;
        this._proInfo = Utils_1.utils.yzRedBagInfo.curProgressInfo;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this.init();
    };
    OpenRedBagPanel.prototype.openRedBag = function () {
        var _this = this;
        if (this._redBagInfo.progress < this._redBagInfo.totalProgress && !this._redBagInfo.isFreeRedBag && this._redBagInfo.freeRedBagCount <= 0)
            return;
        this._btnClose.opacity = 0;
        this._btnClose.active = true;
        var timeout = Utils_1.utils.ServerConfig.red_bag_close_btn_show_delay ? Utils_1.utils.ServerConfig.red_bag_close_btn_show_delay : 0;
        setTimeout(function () {
            Utils_1.utils.showLog("拆红包关闭按钮延迟显示 " + timeout + "秒显示！");
            _this._btnClose.runAction(cc.fadeIn(0.3));
        }, timeout * 1000);
        setTimeout(function () {
            _this._btnDouble.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }, 500);
        if (this._canShowVideoOpen) {
            Utils_1.utils.adManager.ShowVideo(function (res, msg) {
                if (res) {
                    Utils_1.utils.SendEvent('拆红包弹窗-视频拆红包成功！');
                    _this.scheduleOnce(function () {
                        _this.showRedBag();
                    });
                }
                else {
                    _this._btnClose.runAction(cc.fadeIn(0.3));
                    Utils_1.utils.SendEvent('拆红包弹窗-视频拆红包失败！');
                    Utils_1.utils.showMsg(msg ? msg : "视频加载失败！");
                }
            });
        }
        else {
            this.showRedBag();
        }
    };
    OpenRedBagPanel.prototype.showRedBag = function () {
        var _this = this;
        var money = 0;
        var proInfo = this._proInfo;
        cc.log("proInfo ", JSON.stringify(proInfo));
        money = parseFloat((Math.random() * (proInfo.max_money - proInfo.min_money) + proInfo.min_money).toFixed(3));
        cc.log("红包金额：" + money);
        // let max = this._redBagInfo.withdrawaMoneys[0];
        // if (this._redBagInfo.balance <= 0) {
        //     money = parseFloat((Math.random() * (max / 4)).toFixed(3));
        // } else if (this._redBagInfo.balance <= (max / 2.8)) {
        //     money = parseFloat((Math.random() * (max / 5)).toFixed(3));
        // } else if (this._redBagInfo.balance >= (max - 1)) {
        //     money = Math.random();
        //     money = parseFloat((money * 0.01 + 0.001).toFixed(3))
        // } else if (this._redBagInfo.balance >= max - 2) {
        //     money = Math.random();
        //     money = parseFloat((money * 0.01 + 0.001).toFixed(3))
        // } else {
        //     money = Math.random();
        //     if (money > 0.1) {
        //         money = parseFloat((money * 0.1).toFixed(3))
        //     } else {
        //         money = parseFloat(money.toFixed(3));
        //     }
        // }
        // utils.SendEvent("拆红包弹窗-获得红包：" + money + "元");
        this._money = money;
        this._redBagInfo.balance = parseFloat((this._redBagInfo.balance + money).toFixed(3));
        if (this._redBagInfo.isFreeRedBag && this._show_type == 1) {
            this._redBagInfo.lastOpenFreeRedBagTime = new Date().toDateString();
        }
        if (this._show_type == 2) {
            this._redBagInfo.progress -= this._redBagInfo.totalProgress;
        }
        this._redBagInfo.totalMoney = parseFloat((this._redBagInfo.totalMoney + money).toFixed(3));
        this._moneyLbl.string = "\u00A5" + money + "\u5143";
        this._totalMoneyLbl.string = "\u7D2F\u8BA1\u83B7\u5F97\u73B0\u91D1" + this._redBagInfo.totalMoney + "\u5143";
        this._rewardPanel.scaleX = 0;
        this._rewardPanel.active = true;
        this._openPanel.runAction(cc.sequence(cc.scaleTo(0.3, 0, 1), cc.callFunc(function () {
            _this._openPanel.active = false;
            _this._rewardPanel.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.callFunc(function () {
            })));
        })));
        if (Utils_1.utils.currentLevel > parseInt(this._redBagInfo.lastOpenLevel) && this._show_type == 2) {
            this._redBagInfo.lastOpenLevel = Utils_1.utils.currentLevel.toString();
        }
    };
    OpenRedBagPanel.prototype.onBtnDoubleMoney = function (event, data) {
        var _this = this;
        Utils_1.utils.SendEvent("拆红包弹窗-点击视频双倍领取");
        Utils_1.utils.adManager.ShowVideo(function (ret, msg) {
            if (ret) {
                _this._redBagInfo.balance = parseFloat((_this._redBagInfo.balance + _this._money).toFixed(3));
                _this._redBagInfo.totalMoney = parseFloat((_this._redBagInfo.totalMoney + _this._money).toFixed(3));
                _this._totalMoneyLbl.string = "\u7D2F\u8BA1\u83B7\u5F97\u73B0\u91D1" + _this._redBagInfo.totalMoney + "\u5143";
                Utils_1.utils.showMsg("领取双倍红包成功！");
                Utils_1.utils.SendEvent("拆红包弹窗-视频双倍领取成功");
                event.target.active = false;
            }
            else {
                Utils_1.utils.showMsg(msg);
                Utils_1.utils.SendEvent("拆红包弹窗-视频双倍领取失败");
            }
        });
    };
    OpenRedBagPanel.prototype.showWithDrawalPanel = function () {
        Utils_1.utils.SendEvent("拆红包弹窗-点击提现上报");
        Utils_1.utils.showWithdrawalPanel();
    };
    OpenRedBagPanel.prototype.init = function () {
        var _this = this;
        Utils_1.utils.SendEvent("拆红包弹窗-展示成功！" + this._show_type + " :" + this._redBagInfo.isFreeRedBag);
        this._title.children[0].active = this._show_type == 1 && this._redBagInfo.isFreeRedBag;
        this._title.children[1].active = this._show_type == 2;
        this._title.children[2].active = this._show_type == 3;
        if (this._proInfo.type == 2 && this._show_type == 2) {
            this._canShowVideoOpen = true;
            this._btnVideoOpen.active = true;
        }
        else {
            this._canShowVideoOpen = false;
            this._btnVideoOpen.active = false;
        }
        // utils.ServerConfig.red_bag_open_view_close_btn_show_delay = 1;
        if (Utils_1.utils.ServerConfig.red_bag_open_view_close_btn_show_delay && Utils_1.utils.ServerConfig.red_bag_open_view_close_btn_show_delay > 0) {
            this._btnClose.opacity = 0;
            var timeout_1 = Utils_1.utils.ServerConfig.red_bag_open_view_close_btn_show_delay ? Utils_1.utils.ServerConfig.red_bag_open_view_close_btn_show_delay : 0;
            setTimeout(function () {
                Utils_1.utils.showLog("拆红包关闭按钮延迟显示 " + timeout_1 + "秒显示！");
                _this._btnClose.runAction(cc.fadeIn(0.3));
            }, timeout_1 * 1000);
        }
        else {
            if (this._redBagInfo.progress < this._redBagInfo.totalProgress && !this._redBagInfo.isFreeRedBag && this._redBagInfo.freeRedBagCount <= 0) {
                this._btnOpen.children[0].active = true;
                this._btnOpen.children[1].getComponent(cc.Button).enableAutoGrayEffect = true;
                this._btnClose.opacity = 0;
                var timeout_2 = Utils_1.utils.ServerConfig.red_bag_close_btn_show_delay ? Utils_1.utils.ServerConfig.red_bag_close_btn_show_delay : 0;
                setTimeout(function () {
                    Utils_1.utils.showLog("拆红包关闭按钮延迟显示 " + timeout_2 + "秒显示！");
                    _this._btnClose.runAction(cc.fadeIn(0.3));
                }, timeout_2 * 1000);
            }
            else {
                this._btnClose.active = false;
            }
        }
        this._totalMoneyLbl.string = "\u7D2F\u8BA1\u83B7\u5F97\u73B0\u91D1" + this._redBagInfo.totalMoney + "\u5143";
    };
    OpenRedBagPanel.prototype.initData = function (showType) {
        this._show_type = showType;
    };
    OpenRedBagPanel.prototype.show = function () {
        this.node.active = true;
    };
    OpenRedBagPanel.prototype.hide = function () {
        // console.log(utils.rewardCloseFunc, "<<callFUnc");
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        this.node.active = false;
        Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
        if (Utils_1.utils.rewardCloseFunc) {
            Utils_1.utils.rewardCloseFunc = null;
        }
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    };
    OpenRedBagPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    OpenRedBagPanel = __decorate([
        ccclass
    ], OpenRedBagPanel);
    return OpenRedBagPanel;
}(cc.Component));
exports.default = OpenRedBagPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcT3BlblJlZEJhZ1BhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUNoQyw2Q0FBNEQ7QUFDNUQseUNBQW9DO0FBRzlCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBcVFDO1FBblFXLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGlCQUFXLEdBQWlCLElBQUksQ0FBQztRQUVqQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsY0FBUSxHQUFRLElBQUksQ0FBQztRQXFEN0IsWUFBTSxHQUFXLENBQUMsQ0FBQztRQWtIbkIsYUFBYTtRQUNiLDZCQUE2QjtRQUM3QixtQ0FBbUM7UUFDbkMsK0JBQStCO1FBQy9CLFFBQVE7UUFDUixJQUFJO1FBRUosdUJBQWlCLEdBQVksS0FBSyxDQUFDO1FBMENuQyxnQkFBVSxHQUFXLENBQUMsQ0FBQyxDQUFDLHVCQUF1Qjs7SUEyQm5ELENBQUM7SUFqUEcsbURBQW1EO0lBRW5ELGdDQUFNLEdBQU47UUFBQSxpQkE4Q0M7UUEzQ0csSUFBSSxhQUFLLENBQUMsV0FBVyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJ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RDtRQUNwRCw2S0FBNks7UUFDN0ssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGFBQUssQ0FBQyxlQUFlLElBQUksYUFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2pELElBQUksYUFBSyxDQUFDLGVBQWUsRUFBRTtZQUN2QixhQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUNoQztRQUNELFFBQVE7UUFDUixvQ0FBb0M7UUFDcEMsdURBQXVEO1FBQ3ZELElBQUk7SUFDUixDQUFDO0lBRU0sMkNBQWlCLEdBQXhCLFVBQXlCLEtBQVUsRUFBRSxJQUFTO1FBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBcFFnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBcVFuQztJQUFELHNCQUFDO0NBclFELEFBcVFDLENBclE0QyxFQUFFLENBQUMsU0FBUyxHQXFReEQ7a0JBclFvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiwgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyBZelJlZEJhZ0luZm8gfSBmcm9tIFwiLi9Db21tb25Db25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3BlblJlZEJhZ1BhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tb25leUxibDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdG90YWxNb25leUxibDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfb3BlblBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Jld2FyZFBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0bk9wZW46IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3JlZEJhZ0luZm86IFl6UmVkQmFnSW5mbyA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnRuQ2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2J0blZpZGVvT3BlbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGl0bGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnRuRG91YmxlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9wcm9JbmZvOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIF9sb2NhdGlvbjogU3ViTG9jYXRpb24gPSBTdWJMb2NhdGlvbi5pc01vcmVHYW1lO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgICAgIGlmICh1dGlscy5vdGhlckNvbmZpZyAmJiB1dGlscy5vdGhlckNvbmZpZy5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5Ib21lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XHJcbiAgICAgICAgdGhpcy5fb3BlblBhbmVsID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJvbk9wZW5QYW5lbFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3BlblBhbmVsLnNldFNjYWxlKDAuNSk7XHJcbiAgICAgICAgdGhpcy5fb3BlblBhbmVsLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcmV3YXJkUGFuZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0bk9wZW4gPSB0aGlzLl9vcGVuUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJidG5PcGVuXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0bkNsb3NlID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJidG5DbG9zZVwiKTtcclxuICAgICAgICB0aGlzLl9idG5WaWRlb09wZW4gPSB0aGlzLl9idG5PcGVuLmdldENoaWxkQnlOYW1lKFwiYnRuX29wZW5WaWRlb1wiKTtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IHRoaXMuX29wZW5QYW5lbC5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fdG90YWxNb25leUxibCA9IHRoaXMuX3Jld2FyZFBhbmVsLmdldENoaWxkQnlOYW1lKFwidG90YWxNb25leUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fbW9uZXlMYmwgPSB0aGlzLl9yZXdhcmRQYW5lbC5nZXRDaGlsZEJ5TmFtZShcIm1vbmV5TGJsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fYnRuRG91YmxlID0gdGhpcy5fcmV3YXJkUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Eb3VibGVcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bk9wZW4ucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMiksIGNjLnNjYWxlVG8oMC41LCAxKSkpKTtcclxuICAgICAgICB9LCA1MDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3JlZEJhZ0luZm8gPSB1dGlscy55elJlZEJhZ0luZm87XHJcbiAgICAgICAgdGhpcy5fcHJvSW5mbyA9IHV0aWxzLnl6UmVkQmFnSW5mby5jdXJQcm9ncmVzc0luZm87XHJcbiAgICAgICAgbGV0IHJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgLy8g5qiq5bGP5ri45oiPXHJcbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDE5MjAgKiAwLjU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTA4MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BhbmVsLnNjYWxlID0gcmF0aW87XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9tb25leTogbnVtYmVyID0gMDtcclxuICAgIG9wZW5SZWRCYWcoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZWRCYWdJbmZvLnByb2dyZXNzIDwgdGhpcy5fcmVkQmFnSW5mby50b3RhbFByb2dyZXNzICYmICF0aGlzLl9yZWRCYWdJbmZvLmlzRnJlZVJlZEJhZyAmJiB0aGlzLl9yZWRCYWdJbmZvLmZyZWVSZWRCYWdDb3VudCA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fYnRuQ2xvc2Uub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5fYnRuQ2xvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGltZW91dDogbnVtYmVyID0gdXRpbHMuU2VydmVyQ29uZmlnLnJlZF9iYWdfY2xvc2VfYnRuX3Nob3dfZGVsYXkgPyB1dGlscy5TZXJ2ZXJDb25maWcucmVkX2JhZ19jbG9zZV9idG5fc2hvd19kZWxheSA6IDA7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmi4bnuqLljIXlhbPpl63mjInpkq7lu7bov5/mmL7npLogXCIgKyB0aW1lb3V0ICsgXCLnp5LmmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bkNsb3NlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4zKSk7XHJcbiAgICAgICAgfSwgdGltZW91dCAqIDEwMDApXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9idG5Eb3VibGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMiksIGNjLnNjYWxlVG8oMC41LCAxKSkpKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW5TaG93VmlkZW9PcGVuKSB7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKChyZXMsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudCgn5ouG57qi5YyF5by556qXLeinhumikeaLhue6ouWMheaIkOWKn++8gScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVkQmFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuQ2xvc2UucnVuQWN0aW9uKGNjLmZhZGVJbigwLjMpKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoJ+aLhue6ouWMheW8ueeqly3op4bpopHmi4bnuqLljIXlpLHotKXvvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKG1zZyA/IG1zZyA6IFwi6KeG6aKR5Yqg6L295aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1JlZEJhZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UmVkQmFnKCkge1xyXG4gICAgICAgIGxldCBtb25leSA9IDA7XHJcblxyXG4gICAgICAgIGxldCBwcm9JbmZvID0gdGhpcy5fcHJvSW5mbztcclxuICAgICAgICBjYy5sb2coXCJwcm9JbmZvIFwiLCBKU09OLnN0cmluZ2lmeShwcm9JbmZvKSk7XHJcbiAgICAgICAgbW9uZXkgPSBwYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogKHByb0luZm8ubWF4X21vbmV5IC0gcHJvSW5mby5taW5fbW9uZXkpICsgcHJvSW5mby5taW5fbW9uZXkpLnRvRml4ZWQoMykpO1xyXG4gICAgICAgIGNjLmxvZyhcIue6ouWMhemHkemine+8mlwiICsgbW9uZXkpO1xyXG4gICAgICAgIC8vIGxldCBtYXggPSB0aGlzLl9yZWRCYWdJbmZvLndpdGhkcmF3YU1vbmV5c1swXTtcclxuICAgICAgICAvLyBpZiAodGhpcy5fcmVkQmFnSW5mby5iYWxhbmNlIDw9IDApIHtcclxuICAgICAgICAvLyAgICAgbW9uZXkgPSBwYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogKG1heCAvIDQpKS50b0ZpeGVkKDMpKTtcclxuICAgICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuX3JlZEJhZ0luZm8uYmFsYW5jZSA8PSAobWF4IC8gMi44KSkge1xyXG4gICAgICAgIC8vICAgICBtb25leSA9IHBhcnNlRmxvYXQoKE1hdGgucmFuZG9tKCkgKiAobWF4IC8gNSkpLnRvRml4ZWQoMykpO1xyXG4gICAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy5fcmVkQmFnSW5mby5iYWxhbmNlID49IChtYXggLSAxKSkge1xyXG4gICAgICAgIC8vICAgICBtb25leSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgLy8gICAgIG1vbmV5ID0gcGFyc2VGbG9hdCgobW9uZXkgKiAwLjAxICsgMC4wMDEpLnRvRml4ZWQoMykpXHJcbiAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLl9yZWRCYWdJbmZvLmJhbGFuY2UgPj0gbWF4IC0gMikge1xyXG4gICAgICAgIC8vICAgICBtb25leSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgLy8gICAgIG1vbmV5ID0gcGFyc2VGbG9hdCgobW9uZXkgKiAwLjAxICsgMC4wMDEpLnRvRml4ZWQoMykpXHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgbW9uZXkgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIC8vICAgICBpZiAobW9uZXkgPiAwLjEpIHtcclxuICAgICAgICAvLyAgICAgICAgIG1vbmV5ID0gcGFyc2VGbG9hdCgobW9uZXkgKiAwLjEpLnRvRml4ZWQoMykpXHJcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICBtb25leSA9IHBhcnNlRmxvYXQobW9uZXkudG9GaXhlZCgzKSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdXRpbHMuU2VuZEV2ZW50KFwi5ouG57qi5YyF5by556qXLeiOt+W+l+e6ouWMhe+8mlwiICsgbW9uZXkgKyBcIuWFg1wiKTtcclxuICAgICAgICB0aGlzLl9tb25leSA9IG1vbmV5O1xyXG4gICAgICAgIHRoaXMuX3JlZEJhZ0luZm8uYmFsYW5jZSA9IHBhcnNlRmxvYXQoKHRoaXMuX3JlZEJhZ0luZm8uYmFsYW5jZSArIG1vbmV5KS50b0ZpeGVkKDMpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JlZEJhZ0luZm8uaXNGcmVlUmVkQmFnICYmIHRoaXMuX3Nob3dfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZEJhZ0luZm8ubGFzdE9wZW5GcmVlUmVkQmFnVGltZSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2hvd190eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVkQmFnSW5mby5wcm9ncmVzcyAtPSB0aGlzLl9yZWRCYWdJbmZvLnRvdGFsUHJvZ3Jlc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWRCYWdJbmZvLnRvdGFsTW9uZXkgPSBwYXJzZUZsb2F0KCh0aGlzLl9yZWRCYWdJbmZvLnRvdGFsTW9uZXkgKyBtb25leSkudG9GaXhlZCgzKSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9tb25leUxibC5zdHJpbmcgPSBgwqUke21vbmV5feWFg2BcclxuICAgICAgICB0aGlzLl90b3RhbE1vbmV5TGJsLnN0cmluZyA9IGDntK/orqHojrflvpfnjrDph5Eke3RoaXMuX3JlZEJhZ0luZm8udG90YWxNb25leX3lhYNgXHJcbiAgICAgICAgdGhpcy5fcmV3YXJkUGFuZWwuc2NhbGVYID0gMDtcclxuICAgICAgICB0aGlzLl9yZXdhcmRQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX29wZW5QYW5lbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDAsIDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wZW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkUGFuZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB9KSkpXHJcbiAgICAgICAgfSkpKVxyXG4gICAgICAgIGlmICh1dGlscy5jdXJyZW50TGV2ZWwgPiBwYXJzZUludCh0aGlzLl9yZWRCYWdJbmZvLmxhc3RPcGVuTGV2ZWwpICYmIHRoaXMuX3Nob3dfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZEJhZ0luZm8ubGFzdE9wZW5MZXZlbCA9IHV0aWxzLmN1cnJlbnRMZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuRG91YmxlTW9uZXkoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLmi4bnuqLljIXlvLnnqpct54K55Ye76KeG6aKR5Y+M5YCN6aKG5Y+WXCIpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93VmlkZW8oKHJldCwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZEJhZ0luZm8uYmFsYW5jZSA9IHBhcnNlRmxvYXQoKHRoaXMuX3JlZEJhZ0luZm8uYmFsYW5jZSArIHRoaXMuX21vbmV5KS50b0ZpeGVkKDMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZEJhZ0luZm8udG90YWxNb25leSA9IHBhcnNlRmxvYXQoKHRoaXMuX3JlZEJhZ0luZm8udG90YWxNb25leSArIHRoaXMuX21vbmV5KS50b0ZpeGVkKDMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b3RhbE1vbmV5TGJsLnN0cmluZyA9IGDntK/orqHojrflvpfnjrDph5Eke3RoaXMuX3JlZEJhZ0luZm8udG90YWxNb25leX3lhYNgXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwi6aKG5Y+W5Y+M5YCN57qi5YyF5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5ouG57qi5YyF5by556qXLeinhumikeWPjOWAjemihuWPluaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2cobXNnKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuaLhue6ouWMheW8ueeqly3op4bpopHlj4zlgI3pooblj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93V2l0aERyYXdhbFBhbmVsKCkge1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuaLhue6ouWMheW8ueeqly3ngrnlh7vmj5DnjrDkuIrmiqVcIik7XHJcbiAgICAgICAgdXRpbHMuc2hvd1dpdGhkcmF3YWxQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlKCkge1xyXG4gICAgLy8gICAgIGlmICh0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX3VwZGF0ZVBhbmVsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIF9jYW5TaG93VmlkZW9PcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaW5pdCgpIHtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLmi4bnuqLljIXlvLnnqpct5bGV56S65oiQ5Yqf77yBXCIgKyB0aGlzLl9zaG93X3R5cGUgKyBcIiA6XCIgKyB0aGlzLl9yZWRCYWdJbmZvLmlzRnJlZVJlZEJhZyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpdGxlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRoaXMuX3Nob3dfdHlwZSA9PSAxICYmIHRoaXMuX3JlZEJhZ0luZm8uaXNGcmVlUmVkQmFnO1xyXG4gICAgICAgIHRoaXMuX3RpdGxlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRoaXMuX3Nob3dfdHlwZSA9PSAyO1xyXG4gICAgICAgIHRoaXMuX3RpdGxlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRoaXMuX3Nob3dfdHlwZSA9PSAzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcHJvSW5mby50eXBlID09IDIgJiYgdGhpcy5fc2hvd190eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FuU2hvd1ZpZGVvT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0blZpZGVvT3Blbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhblNob3dWaWRlb09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYnRuVmlkZW9PcGVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXRpbHMuU2VydmVyQ29uZmlnLnJlZF9iYWdfb3Blbl92aWV3X2Nsb3NlX2J0bl9zaG93X2RlbGF5ID0gMTtcclxuICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLnJlZF9iYWdfb3Blbl92aWV3X2Nsb3NlX2J0bl9zaG93X2RlbGF5ICYmIHV0aWxzLlNlcnZlckNvbmZpZy5yZWRfYmFnX29wZW5fdmlld19jbG9zZV9idG5fc2hvd19kZWxheSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuQ2xvc2Uub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0aW1lb3V0OiBudW1iZXIgPSB1dGlscy5TZXJ2ZXJDb25maWcucmVkX2JhZ19vcGVuX3ZpZXdfY2xvc2VfYnRuX3Nob3dfZGVsYXkgPyB1dGlscy5TZXJ2ZXJDb25maWcucmVkX2JhZ19vcGVuX3ZpZXdfY2xvc2VfYnRuX3Nob3dfZGVsYXkgOiAwO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmi4bnuqLljIXlhbPpl63mjInpkq7lu7bov5/mmL7npLogXCIgKyB0aW1lb3V0ICsgXCLnp5LmmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5DbG9zZS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMykpO1xyXG4gICAgICAgICAgICB9LCB0aW1lb3V0ICogMTAwMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVkQmFnSW5mby5wcm9ncmVzcyA8IHRoaXMuX3JlZEJhZ0luZm8udG90YWxQcm9ncmVzcyAmJiAhdGhpcy5fcmVkQmFnSW5mby5pc0ZyZWVSZWRCYWcgJiYgdGhpcy5fcmVkQmFnSW5mby5mcmVlUmVkQmFnQ291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuT3Blbi5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuT3Blbi5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5lbmFibGVBdXRvR3JheUVmZmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5DbG9zZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lb3V0OiBudW1iZXIgPSB1dGlscy5TZXJ2ZXJDb25maWcucmVkX2JhZ19jbG9zZV9idG5fc2hvd19kZWxheSA/IHV0aWxzLlNlcnZlckNvbmZpZy5yZWRfYmFnX2Nsb3NlX2J0bl9zaG93X2RlbGF5IDogMDtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmi4bnuqLljIXlhbPpl63mjInpkq7lu7bov5/mmL7npLogXCIgKyB0aW1lb3V0ICsgXCLnp5LmmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuQ2xvc2UucnVuQWN0aW9uKGNjLmZhZGVJbigwLjMpKTtcclxuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQgKiAxMDAwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuQ2xvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3RvdGFsTW9uZXlMYmwuc3RyaW5nID0gYOe0r+iuoeiOt+W+l+eOsOmHkSR7dGhpcy5fcmVkQmFnSW5mby50b3RhbE1vbmV5feWFg2A7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dfdHlwZTogbnVtYmVyID0gMTsgLy8gMeOAgeavj+aXpee6ouWMhSAy44CB6Zev5YWz57qi5YyFIDPjgIHnjrDph5HnuqLljIVcclxuICAgIGluaXREYXRhKHNob3dUeXBlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zaG93X3R5cGUgPSBzaG93VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codXRpbHMucmV3YXJkQ2xvc2VGdW5jLCBcIjw8Y2FsbEZVbmNcIik7XHJcbiAgICAgICAgLy8gdGhpcy5fcGFuZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjMsIENvbXBhdGlibGVUb29sLnBvc2l0aW9uKC10aGlzLl9wYW5lbC5nZXRDb250ZW50U2l6ZSgpLndpZHRoLCAwKSkuZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jICYmIHV0aWxzLnJld2FyZENsb3NlRnVuYygpO1xyXG4gICAgICAgIGlmICh1dGlscy5yZXdhcmRDbG9zZUZ1bmMpIHtcclxuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gfSkpKTtcclxuICAgICAgICAvLyBpZiAoIVBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAvLyAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dCYW5uZXIoQmFubmVyTG9jYXRpb24uSG9tZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsb3NlQnRuSGFuZGxlcihldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG4iXX0=