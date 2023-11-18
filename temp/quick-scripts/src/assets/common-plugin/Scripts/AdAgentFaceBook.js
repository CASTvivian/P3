"use strict";
cc._RF.push(module, 'a545elsu55MprEh4ZOD19/a', 'AdAgentFaceBook');
// common-plugin/Scripts/AdAgentFaceBook.ts

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
var FBAdManager_1 = require("./FaceBookSdk/FBAdManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentFaceBook = /** @class */ (function (_super) {
    __extends(AdAgentFaceBook, _super);
    function AdAgentFaceBook() {
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
        _this.qq = window.qq;
        _this._bannerShow = false;
        _this._bannerSizePercent = 0.5;
        _this._bannerBottom = 0;
        _this._oldBannerLocation = YZ_Constant_1.BannerLocation.None;
        _this._curBannerHeight = 240;
        _this._moveBtn = null;
        _this._cur_level = null;
        _this._showBannerTimerId = 0;
        _this._isShow = false;
        return _this;
    }
    AdAgentFaceBook.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsFaceBook) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initAd();
            }, this);
        }
    };
    Object.defineProperty(AdAgentFaceBook.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.Tool_Facebook.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentFaceBook.prototype._initAd = function () {
        Utils_1.utils.showLog("facebook init ad>>>>>>>>");
        FBAdManager_1.default.addInterstitial(Utils_1.utils.config.faceBookConfig.insertId, 3);
        FBAdManager_1.default.addRewardedVideo(Utils_1.utils.config.faceBookConfig.videoId, 3);
        FBAdManager_1.default.addBanner(Utils_1.utils.config.faceBookConfig.bannerId);
        setTimeout(function () {
            FBAdManager_1.default.loadAll();
        }, 3000);
    };
    AdAgentFaceBook.prototype._createBanner = function (location, args) {
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsFaceBook) {
            FBAdManager_1.default.showBannerAsync().then(function () {
                Utils_1.utils.showLog("显示Banner广告: 成功");
            }).catch(function (e) {
                Utils_1.utils.showLog("显示Banner广告: 失败，原因: " + e.message);
            });
        }
    };
    AdAgentFaceBook.prototype._showBannerTimer = function (location, args) {
        var locationTmp = location;
        var argsTmp = args;
        Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544Axxx\uFF01location:" + locationTmp + "; \u95F4\u9694\u65F6\u95F4:" + Utils_1.utils.Tool_Facebook.ServerConfig.refresh_ad_time + ":\u4F18\u5148\u7EA7\uFF1A" + this.ServerConfig.banner_first_ad);
        this._createBanner(locationTmp, argsTmp);
    };
    AdAgentFaceBook.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsFaceBook) {
            if (Utils_1.utils.ServerConfig) {
                var locationTmp = location;
                var argsTmp = args;
                this._moveBtn = args ? args.moveBtn : null;
                this._cur_level = args ? args.cur_level : null;
                this._showBannerTimer(locationTmp, argsTmp);
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentFaceBook.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsFaceBook) {
            Utils_1.utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            FBAdManager_1.default.hideBannerAsync().then(function () {
                Utils_1.utils.showLog("隐藏Banner广告: 成功");
            }).catch(function (e) {
                Utils_1.utils.showLog("隐藏Banner广告: 失败，原因: " + e.message);
            });
        }
    };
    AdAgentFaceBook.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsFaceBook) {
            this._videoCallback = callback;
            if (FBAdManager_1.default.isRewardedVideoReady()) {
                FBAdManager_1.default.showRewardedVideo().then(function () {
                    Utils_1.utils.showLog("播放激励视频广告: 成功");
                    if (_this._videoCallback) {
                        _this._videoCallback(true, "");
                        _this._videoCallback = null;
                    }
                }).catch(function (e) {
                    Utils_1.utils.showLog("视频播放失败：" + e.message);
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "Ad playback failed!");
                        _this._videoCallback = null;
                    }
                });
            }
            else {
                Utils_1.utils.showLog("激励视频广告未加载！");
                if (this._videoCallback) {
                    this._videoCallback(false, "Video ad not loaded successfully！");
                    this._videoCallback = null;
                }
            }
        }
    };
    /**
     * 显示插屏
     * 2001	触发频率限制	小程序启动一定时间内不允许展示插屏广告
     * 2002	触发频率限制	距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告
     * 2003	触发频率限制	当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告
     * 2004	广告渲染失败	该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败
     * 2005	广告调用异常	插屏广告实例不允许跨页面调用
     * 销毁插屏广告后才能重新创建
     * @param location
     */
    AdAgentFaceBook.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsFaceBook) {
            if (this.ServerConfig) {
                Utils_1.utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
            }
            else {
                this._createInsterstitial.bind(this);
            }
        }
    };
    AdAgentFaceBook.prototype._createInsterstitial = function () {
        if (FBAdManager_1.default.isInterstitialAdReady()) {
            FBAdManager_1.default.showInterstitialAd().then(function () {
                Utils_1.utils.showLog("播放插屏广告: 成功");
            }).catch(function (e) {
                Utils_1.utils.showLog("播放插屏广告: 失败，原因: " + e.message);
            });
        }
        else {
            Utils_1.utils.showLog("插屏广告没有加载成功！");
        }
    };
    AdAgentFaceBook = __decorate([
        ccclass
    ], AdAgentFaceBook);
    return AdAgentFaceBook;
}(AdAgent_1.default));
exports.default = AdAgentFaceBook;

cc._RF.pop();