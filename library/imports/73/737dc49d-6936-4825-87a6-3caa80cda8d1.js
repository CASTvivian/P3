"use strict";
cc._RF.push(module, '737dcSdaTZIJYemPKqAzajR', 'AdAgentHago');
// common-plugin/Scripts/AdAgentHago.ts

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
// const i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentHago = /** @class */ (function (_super) {
    __extends(AdAgentHago, _super);
    function AdAgentHago() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._isVideoShow = false;
        _this._isVideoLoaded = false;
        //@ts-ignore
        _this.hg = window.hg;
        _this.canShowVideo = false;
        return _this;
    }
    AdAgentHago.prototype.Init = function () {
        if (PlatUtils_1.default.IsHago) {
            this.initVideoAd();
            Utils_1.utils.showLog("hago 平台广告初始化成功！");
        }
    };
    AdAgentHago.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        Utils_1.utils.showLog("Hago平台没有banner广告！");
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentHago.prototype.showStatementAds = function () {
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
    AdAgentHago.prototype.initVideoAd = function () {
        var _this = this;
        this._videoAd = this.hg.createRewardedVideoAd({
            adUnitId: parseInt(Utils_1.utils.config.hagoConfig.videoId) //测试使用9999，上线前必须申请独立的，否则无法分成!   注意：要下载最新的app测试版本9999才能生效。
        });
        this._videoAd.onClose = function (res) {
            if (res.isEnded) {
                _this._videoCallback(true);
                _this._videoCallback = null;
            }
            else {
                if (_this._videoCallback) {
                    _this._videoCallback(false, i18n.t('ad.video_not_played_complete'));
                    _this._videoCallback = null;
                }
            }
        };
        //中途关闭广告或者拉去广告失败。
        this._videoAd.onError = function () {
            if (_this._videoCallback) {
                _this._videoCallback(false, i18n.t('ad.video_load_fail'));
                _this._videoCallback = null;
            }
        };
    };
    AdAgentHago.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
    };
    AdAgentHago.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        console.warn("Hago没有插屏");
    };
    AdAgentHago.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsHago) {
            // 视频广告
            if (this._videoCallback) {
                return;
            }
            this._videoCallback = callback;
            if (!this._videoAd) {
                this.initVideoAd();
            }
            this._videoAd.show().then(function () {
                Utils_1.utils.showLog("video show success");
            });
        }
    };
    AdAgentHago = __decorate([
        ccclass
    ], AdAgentHago);
    return AdAgentHago;
}(AdAgent_1.default));
exports.default = AdAgentHago;

cc._RF.pop();