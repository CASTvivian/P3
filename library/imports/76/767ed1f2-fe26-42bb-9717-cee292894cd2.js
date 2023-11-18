"use strict";
cc._RF.push(module, '767edHy/iZCu5cXzuKSiUzS', 'AdAgentKwai');
// common-plugin/Scripts/AdAgentKwai.ts

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
var AdAgent_1 = require("./AdAgent");
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentKwai = /** @class */ (function (_super) {
    __extends(AdAgentKwai, _super);
    function AdAgentKwai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._isVideoShow = false;
        _this._isVideoLoaded = false;
        //@ts-ignore
        _this.kwaigame = window.kwaigame;
        _this.canShowVideo = false;
        _this._interstitialAd = null;
        return _this;
    }
    AdAgentKwai.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsKwai) {
            // this.kwaigame.getSystemInfo({
            //     response: (result) => {
            //         this._sysData = result;
            //         utils.showLog("快手>>>获取系统信息:" + JSON.stringify(result));
            //     }
            // });
            // utils.showLog(this.kwaigame.isSupport({ feature: this.kwaigame.Support.features.RewardVideo }) + "<<<<<");
            // this.canShowVideo = this.kwaigame.isSupport({ feature: this.kwaigame.Support.features.RewardVideo });
            // utils.showLog(`当前平台：${this.canShowVideo == true ? "支持" : "不支持"}视频广告！`);
            // if (this.canShowVideo) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initVideoAd();
            }, this);
            // }
        }
    };
    AdAgentKwai.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        Utils_1.utils.showLog("快手平台没有banner广告！");
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentKwai.prototype.showStatementAds = function () {
        var result = { "type": 0, "node": null };
        var node = null;
        var resType = 0;
        Utils_1.utils.showLog("结算广告 >> 显示插屏广告+6个互推");
        this.ShowInterstitial();
        node = Utils_1.utils.showCrossWidget6();
        resType = 1;
        result.type = resType;
        result.node = node;
        return result;
    };
    AdAgentKwai.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
    };
    AdAgentKwai.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        Utils_1.utils.showLog("显示快手插屏");
        if (Utils_1.utils.config.kwaiConfig.insertId) {
            if (!this._interstitialAd) {
                this._interstitialAd = this.kwaigame.createInterstitialAd({ adUnitId: Utils_1.utils.config.kwaiConfig.insertId });
                this._interstitialAd.onError(function (err) {
                    Utils_1.utils.showLog("插屏广告显示异常：" + JSON.stringify(err));
                });
                this._interstitialAd.onClose(function (res) {
                    Utils_1.utils.showLog("用户点击了【关闭广告】按钮");
                });
            }
            this._interstitialAd && this._interstitialAd.show()
                .then(function () { return Utils_1.utils.showLog('插屏 广告显示成功！'); }).catch(function (err) {
                Utils_1.utils.showLog("插屏 广告显示失败 >>" + JSON.stringify(err));
            });
        }
        else {
            Utils_1.utils.showLog("未配置插屏广告ID");
        }
    };
    AdAgentKwai.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsKwai) {
            // 视频广告
            if (this._videoCallback) {
                return;
            }
            else {
                this._videoCallback = callback;
            }
            this._isVideoShow = true;
            if (!this._videoAd) {
                this._initVideoAd();
                if (this._videoCallback) {
                    this._videoCallback(false, "激励视频加载失败!");
                    this._videoCallback = null;
                }
            }
            else {
                this._videoAd.show({
                    success: function () {
                        Utils_1.utils.showLog("激励视频播放成功");
                    },
                    fail: function (error) {
                        Utils_1.utils.showLog("激励视频播放失败: " + JSON.stringify(error));
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "激励视频加载失败!");
                            _this._videoCallback = null;
                        }
                    }
                });
            }
        }
    };
    AdAgentKwai.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            var param = {};
            param.adUnitId = Utils_1.utils.config.kwaiConfig.videoId;
            this._videoAd = this.kwaigame.createRewardedVideoAd(param);
            if (this._videoAd) {
                Utils_1.utils.showLog("激励广告组件获取成功!");
                this._videoAd.onClose(function (result) {
                    Utils_1.utils.showLog("激励视频关闭回调: " + JSON.stringify(result));
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                        _this._videoCallback = null;
                    }
                });
                this._videoAd.onReward(function (result) {
                    Utils_1.utils.showLog("激励视频奖励回调: " + JSON.stringify(result));
                    if (_this._videoCallback) {
                        _this._videoCallback(true, "");
                        _this._videoCallback = null;
                    }
                });
            }
            else {
                Utils_1.utils.showLog("激励广告组件获取失败");
            }
        }
    };
    AdAgentKwai = __decorate([
        ccclass
    ], AdAgentKwai);
    return AdAgentKwai;
}(AdAgent_1.default));
exports.default = AdAgentKwai;

cc._RF.pop();