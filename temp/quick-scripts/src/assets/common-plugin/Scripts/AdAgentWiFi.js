"use strict";
cc._RF.push(module, 'a74c2u0w9xBuLKuXchK/Ass', 'AdAgentWiFi');
// common-plugin/Scripts/AdAgentWiFi.ts

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
var AdAgentWiFi = /** @class */ (function (_super) {
    __extends(AdAgentWiFi, _super);
    function AdAgentWiFi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._curBannerAd = null;
        _this._videoAd = null;
        _this._insertAd = null;
        _this._oldAd = null;
        _this._appBox = null; //游戏盒子广告
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._isVideoShow = false;
        //@ts-ignore
        _this.wuji = window.wuji;
        _this._bannerShow = true;
        _this._showBannerTimerId = 0;
        return _this;
    }
    AdAgentWiFi.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsWiFi) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._sysData = Utils_1.utils.wifiTool.getSystemInfo();
            }, this);
        }
    };
    Object.defineProperty(AdAgentWiFi.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.wifiTool.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentWiFi.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            Utils_1.utils.showLog("初始化视频!");
            var example = {
                adUnitId: '',
            };
            this._videoAd = this.wuji.createRewardedVideoAd(example);
            this._videoAd.onLoad(function () {
                Utils_1.utils.showLog('激励视频加载完成');
                _this._videoAd
                    .show()
                    .then(function () { return Utils_1.utils.showLog('激励视频展示成功'); })
                    .catch(function (err) {
                    Utils_1.utils.showLog('激励视频展示失败', err);
                    // 可以手动加载一次
                    _this._videoAd
                        .load()
                        .then(function () {
                        Utils_1.utils.showLog("手动加载成功");
                        // 加载成功后需要再显示广告
                        return _this._videoAd.show();
                    });
                });
            });
            this._videoAd.onError(function (err) {
                Utils_1.utils.showLog('激励视频错误', err);
                if (_this._videoCallback) {
                    _this._videoCallback(false, "暂无视频广告!");
                    _this._videoCallback = null;
                }
            });
            this._videoAd.onClose(function (res) {
                _this._isVideoShow = false;
                if (res.isEnded) {
                    // 正常播放结束，可以下发游戏奖励
                    Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                    if (_this._videoCallback) {
                        _this._videoCallback(true, "");
                        _this._videoCallback = null;
                    }
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "观看完视频才能获得奖励!");
                        _this._videoCallback = null;
                    }
                }
            });
        }
    };
    AdAgentWiFi.prototype._createBanner = function (location, args) {
        var _this = this;
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWiFi) {
            var _a = this._sysData, windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
            var targetBannerAdWidth = windowWidth - 20;
            var example = {
                adUnitId: '',
                style: {
                    top: windowHeight,
                    left: (windowWidth - targetBannerAdWidth) / 2,
                    width: targetBannerAdWidth,
                }
            };
            this._curBannerAd = this.wuji.createBannerAd(example);
            this._curBannerAd.onLoad(function () {
                _this._curBannerAd.show()
                    .then(function () { return Utils_1.utils.showLog('banner ad 展示成功'); })
                    .catch(function (err) { return Utils_1.utils.showLog(err); });
            });
        }
    };
    AdAgentWiFi.prototype._showBannerTimer = function (location, args) {
        var locationTmp = location;
        var argsTmp = args;
        this._createBanner(locationTmp, argsTmp);
    };
    AdAgentWiFi.prototype.ShowInterstitial = function () {
        Utils_1.utils.showLog("连尚小游戏没有插屏广告！");
    };
    AdAgentWiFi.prototype.ShowBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWiFi) {
            if (this.ServerConfig) {
                var locationTmp = location;
                var argsTmp = args;
                var interval = 30;
                if (this.ServerConfig.refresh_ad_time) {
                    interval = this.ServerConfig.refresh_ad_time;
                }
                Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544A\uFF01location:" + locationTmp + "; args:" + JSON.stringify(argsTmp) + "; \u95F4\u9694\u65F6\u95F4:" + this.ServerConfig.refresh_ad_time);
                var _a = this._sysData, windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
                var targetBannerAdWidth = windowWidth - 20;
                var example = {
                    adUnitId: '',
                    adIntervals: interval,
                    style: {
                        top: windowHeight,
                        left: (windowWidth - targetBannerAdWidth) / 2,
                        width: targetBannerAdWidth,
                    }
                };
                if (this._curBannerAd) {
                    this._curBannerAd.offLoad();
                    this._curBannerAd.destroy();
                }
                this._curBannerAd = this.wuji.createBannerAd(example);
                this._curBannerAd.onLoad(function () {
                    _this._curBannerAd.show()
                        .then(function () { return Utils_1.utils.showLog('banner ad 展示成功'); })
                        .catch(function (err) { return Utils_1.utils.showLog(err); });
                });
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentWiFi.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsWiFi) {
            Utils_1.utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            if (this._curBannerAd) {
                this._curBannerAd.hide();
            }
        }
    };
    AdAgentWiFi.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsWiFi) {
            this._videoCallback = callback;
            this._isVideoShow = true;
            if (!this._videoAd) {
                this._initVideoAd();
            }
            else {
                this._videoAd.load();
            }
        }
    };
    AdAgentWiFi = __decorate([
        ccclass
    ], AdAgentWiFi);
    return AdAgentWiFi;
}(AdAgent_1.default));
exports.default = AdAgentWiFi;

cc._RF.pop();