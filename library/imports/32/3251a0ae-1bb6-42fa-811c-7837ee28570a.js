"use strict";
cc._RF.push(module, '3251aCuG7ZC+oEceDfuKFcK', 'LuckBoxPannel');
// common-plugin/Scripts/LuckBoxPannel.ts

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
var AldUtils_1 = require("./AldUtils");
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 五倍奖励宝箱
 */
var LuckBoxPanel = /** @class */ (function (_super) {
    __extends(LuckBoxPanel, _super);
    function LuckBoxPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showVideoBtn = null;
        _this.clickBtn = null;
        _this.btnLabel = null;
        _this.panel = null;
        _this.videoIcon = null;
        _this.progressBar = null;
        _this.boxNode = null;
        /**
         * 奖励回调
         */
        _this.rewardCallFunc = null;
        /**
         * 奖励值
         */
        _this.rewardValue = 0;
        //幸运宝箱显示的广告类型
        _this._luck_box_ad_type = "1";
        //跳过按钮延迟显示时间
        _this._delay_show_btn_time = 0;
        //幸运宝箱开始回退的时间
        _this._luck_box_progressbar_back_time = 1000;
        /**
         * 展示广告的进度条百分比
         */
        _this._showAdProgress = 0.8;
        _this._openSlowDown = false;
        _this._timetaskId = 0;
        _this._cancelSlowDown = false;
        _this._slowDownSpeed = 0.2;
        _this._progresss = 0;
        _this._totalProgress = 5;
        _this._isShowAd = false;
        _this._videoIsPlay = false;
        return _this;
    }
    LuckBoxPanel.prototype.onLoad = function () {
        var _this = this;
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this.rewardCallFunc = Utils_1.utils.rewardCallFunc;
        this.rewardValue = Utils_1.utils.rewardValue;
        this.panel.scale = 0;
        Utils_1.utils.SendEvent("幸运宝箱-显示成功！");
        this.clickBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.clickBtnTouchCancel.bind(this));
        this.clickBtn.on(cc.Node.EventType.TOUCH_END, this.clickBtnTouchCancel.bind(this));
        this.progressBar.progress = 0;
        this.btnLabel.node.opacity = 0;
        this.btnLabel.node.active = false;
        Utils_1.utils.luckBoxShowCount++;
        var adTypes = Utils_1.utils.ServerConfig.luck_box_ad_type ? Utils_1.utils.ServerConfig.luck_box_ad_type.split(",") : this._luck_box_ad_type;
        var closeBtnShowDelays = Utils_1.utils.ServerConfig.luck_box_close_btn_show_delay ? Utils_1.utils.ServerConfig.luck_box_close_btn_show_delay.split(",") : this._delay_show_btn_time;
        var progressbarBackTimes = Utils_1.utils.ServerConfig.luck_box_progressbar_back_time ? Utils_1.utils.ServerConfig.luck_box_progressbar_back_time.split(",") : this._luck_box_progressbar_back_time;
        if (Utils_1.utils.luckBoxShowCount > adTypes.length - 1) {
            Utils_1.utils.luckBoxShowCount = 0;
        }
        Utils_1.utils.showLog("\u5E78\u8FD0\u5B9D\u7BB1\u663E\u793A\u6B21\u6570\uFF1A" + Utils_1.utils.luckBoxShowCount);
        this._luck_box_ad_type = adTypes[Utils_1.utils.luckBoxShowCount];
        this._delay_show_btn_time = closeBtnShowDelays[Utils_1.utils.luckBoxShowCount];
        this._luck_box_progressbar_back_time = progressbarBackTimes[Utils_1.utils.luckBoxShowCount];
        if (Utils_1.utils.ServerConfig.luck_box_show_ad_progress_percent) {
            var showAdProPercents = Utils_1.utils.ServerConfig.luck_box_show_ad_progress_percent.split(",");
            this._showAdProgress = showAdProPercents[Utils_1.utils.luckBoxShowCount];
        }
        else {
            switch (this._luck_box_ad_type) {
                case "1":
                case "5":
                    this._showAdProgress = 0.45;
                    break;
                case "2":
                    this._showAdProgress = 0.3;
                    break;
                case "3":
                    //插屏点击进度超过0.3就调用广告
                    this._showAdProgress = 0.85;
                    break;
                case "4":
                    this._showAdProgress = 0.85;
                    break;
                default:
                    this._showAdProgress = 0.45;
                    break;
            }
        }
        Utils_1.utils.showLog("\u5E78\u8FD0\u5B9D\u7BB1\u663E\u793A\u7C7B\u578B\uFF1A" + this._luck_box_ad_type + " #showBtnTime=" + this._delay_show_btn_time + " #progressbarBackTime=" + this._luck_box_progressbar_back_time);
        if (this._luck_box_ad_type != "4") {
            this.scheduleOnce(function () {
                if (_this.btnLabel.node && cc.isValid(_this.btnLabel.node)) {
                    _this.btnLabel.node.active = true;
                    _this.btnLabel.node.runAction(cc.fadeIn(0.3));
                }
            }, this._delay_show_btn_time);
        }
        if (Utils_1.utils.ServerConfig.luck_box_video_icon_is_show && Utils_1.utils.ServerConfig.luck_box_video_icon_is_show == "true") {
            this.videoIcon.active = true;
        }
        else {
            this.videoIcon.active = false;
        }
        if (this._luck_box_ad_type == "1") {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
            if (PlatUtils_1.default.IsIOS && PlatUtils_1.default.IsQQ) {
                this.scheduleOnce(function () {
                    if (_this.clickBtn && cc.isValid(_this.clickBtn)) {
                        _this.clickBtn.setPosition(_this.clickBtn.x, _this.progressBar.node.position.y - 200);
                    }
                }, 10);
            }
        }
        else {
            this.clickBtn.getComponent(cc.Widget).isAlignBottom = false;
            this.clickBtn.getComponent(cc.Widget).updateAlignment();
            this.clickBtn.setPosition(this.clickBtn.x, this.progressBar.node.position.y - 200);
        }
        // this.boxNode.runAction(cc.sequence(cc.scaleTo(1, 1.3).easing(cc.easeElasticIn(1.0)), cc.scaleTo(1, 1).easing(cc.easeElasticOut(3.0)), cc.delayTime(1)).repeatForever())
    };
    LuckBoxPanel.prototype.clickBtnTouchCancel = function () {
        var _this = this;
        clearTimeout(this._timetaskId);
        this._timetaskId = setTimeout(function () {
            _this._openSlowDown = true;
        }, this._luck_box_progressbar_back_time * 1000);
    };
    LuckBoxPanel.prototype.update = function (dt) {
        if (this.progressBar.progress > 0 && this.progressBar.progress < 1 && this._openSlowDown && !this._cancelSlowDown) {
            this.progressBar.progress -= dt * this._slowDownSpeed;
            if (this.progressBar.progress <= 0) {
                this.progressBar.progress = 0;
            }
        }
    };
    LuckBoxPanel.prototype.onEnable = function () {
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this.panel.scale = ratio;
    };
    LuckBoxPanel.prototype.onDestroy = function () {
        Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        Utils_1.utils.hideRecommendGamesBanner();
        if (Utils_1.utils.rewardLuckBoxPanelCloseFunc) {
            Utils_1.utils.rewardLuckBoxPanelCloseFunc();
            Utils_1.utils.rewardBoxPanelCloseFunc = null;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    LuckBoxPanel.prototype.onClose = function () {
        var _this = this;
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
            _this.node.destroy();
        })));
    };
    /**
     * 狂点
     */
    LuckBoxPanel.prototype.onBtnClick = function () {
        var _this = this;
        this._openSlowDown = false;
        if (this.progressBar.progress < 1) {
            this.progressBar.progress += 0.10;
            if (this.progressBar.progress >= 1) {
                this.progressBar.progress = 1;
                this.openLuckBox();
            }
        }
        if (this.videoIcon.active && !this._videoIsPlay) {
            this._videoIsPlay = true;
            Utils_1.utils.adManager.ShowVideo(function (res, msg) {
                if (PlatUtils_1.default.IsDouyin) {
                    if (res) {
                        Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                        var result = new YZ_Constant_1.YZ_Reward();
                        result.rewardValue = _this.rewardValue;
                        if (_this.rewardCallFunc) {
                            _this.rewardCallFunc(result);
                        }
                        _this.onClose();
                    }
                    else {
                        _this._videoIsPlay = false;
                        Utils_1.utils.showMsg(msg ? msg : "视频加载失败！");
                    }
                }
                else {
                    Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                    var result = new YZ_Constant_1.YZ_Reward();
                    result.rewardValue = _this.rewardValue;
                    if (_this.rewardCallFunc) {
                        _this.rewardCallFunc(result);
                    }
                    _this.onClose();
                }
            });
        }
        if (this.progressBar.progress >= this._showAdProgress && !this._isShowAd) {
            this._isShowAd = true;
            //1、banner（默认） 2、插屏 3、盒子广告 4、视频广告 
            switch (this._luck_box_ad_type) {
                case "1":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-banner广告！");
                    Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
                    setTimeout(function () {
                        if (_this.clickBtn && cc.isValid(_this.clickBtn)) {
                            _this.clickBtn.setPosition(_this.clickBtn.x, _this.progressBar.node.position.y - 200);
                        }
                    }, 900);
                    break;
                case "2":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-插屏广告！");
                    Utils_1.utils.adManager.ShowInterstitial();
                    break;
                case "3":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-盒子广告！");
                    Utils_1.utils.adManager.ShowAppBox();
                    break;
                case "4":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-视频广告！");
                    // this.progressBar.progress = 1;
                    this.videoIcon.active = true;
                    // cc.find("Background/clickTxt", this.clickBtn).active = false;
                    // cc.find("Background/btn_ok", this.clickBtn).active = true;
                    this._cancelSlowDown = true;
                    this.scheduleOnce(function () {
                        if (_this.btnLabel.node && cc.isValid(_this.btnLabel.node)) {
                            _this.btnLabel.node.active = true;
                            _this.btnLabel.node.runAction(cc.fadeIn(0.3));
                        }
                    }, this._delay_show_btn_time);
                    break;
                case "5":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-互推banner广告！");
                    Utils_1.utils.showRecommendGamesBanner();
                    break;
                default:
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示banner广告！");
                    Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
                    setTimeout(function () {
                        if (_this.clickBtn && cc.isValid(_this.clickBtn)) {
                            _this.clickBtn.setPosition(_this.clickBtn.x, _this.progressBar.node.position.y - 200);
                        }
                    }, 500);
                    break;
            }
        }
    };
    /**
     * 打开宝箱
     */
    LuckBoxPanel.prototype.openLuckBox = function () {
        if (Utils_1.utils.ServerConfig.luck_box_play_video == "true") {
            this.onPlayVideo();
            this.onClose();
        }
        else {
            Utils_1.utils.showMsg("获得奖励! +" + this.rewardValue);
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = this.rewardValue;
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        }
    };
    LuckBoxPanel.prototype.onHideBtn = function () {
        this.onClose();
    };
    LuckBoxPanel.prototype.onPlayVideo = function () {
        var _this = this;
        Utils_1.utils.adManager.ShowVideo(function (ret, msg) {
            if (ret) {
                Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                _this.rewardValue = _this.rewardValue;
                AldUtils_1.default.SendEvent("幸运宝箱-获取奖励成功！");
            }
            else {
                Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                AldUtils_1.default.SendEvent("幸运宝箱-视频播放失败！");
            }
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = _this.rewardValue;
            if (_this.rewardCallFunc) {
                _this.rewardCallFunc(result);
            }
            _this.onClose();
        });
    };
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "showVideoBtn", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "clickBtn", void 0);
    __decorate([
        property(cc.Label)
    ], LuckBoxPanel.prototype, "btnLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "videoIcon", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], LuckBoxPanel.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "boxNode", void 0);
    LuckBoxPanel = __decorate([
        ccclass
    ], LuckBoxPanel);
    return LuckBoxPanel;
}(cc.Component));
exports.default = LuckBoxPanel;

cc._RF.pop();