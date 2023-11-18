"use strict";
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