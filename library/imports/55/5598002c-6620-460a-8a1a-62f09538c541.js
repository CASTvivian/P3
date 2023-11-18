"use strict";
cc._RF.push(module, '55980AsZiBGCooaYvCVOMVB', 'AdAgentUC');
// common-plugin/Scripts/AdAgentUC.ts

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
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * uc广告组件
 */
var AdAgentUC = /** @class */ (function (_super) {
    __extends(AdAgentUC, _super);
    function AdAgentUC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        _this._bannerAd = null;
        //@ts-ignore
        _this.uc = window.uc;
        _this._sysInfo = {};
        return _this;
    }
    AdAgentUC.prototype.Init = function () {
        Utils_1.utils.showLog("UC 广告初始化");
        this.initVideo();
        if (!this._sysInfo) {
            this._sysInfo = this.uc.getSystemInfoSync();
            if (typeof this._sysInfo === 'string') {
                try {
                    this._sysInfo = JSON.parse(this._sysInfo);
                }
                catch (e) { }
            }
        }
    };
    AdAgentUC.prototype.ShowBanner = function () {
        if (this._bannerAd) {
            this._bannerAd.destroy();
            this._bannerAd = null;
        }
        // 0:左上 1：顶部居中 2：右上
        // 3：左边垂直居中 4：居中 5：右边垂直居中
        // 6：左下 7：底部居中 8：右下 （默认为0）
        Utils_1.utils.showLog("uc banner width>>", this._sysInfo.screenWidth, " #height>>", this._sysInfo.screenWidth * 194 / 345);
        this._bannerAd = this.uc.createBannerAd({
            style: {
                gravity: 7,
                bottom: 0,
                width: cc.winSize.height < cc.winSize.width ? 250 : this._sysInfo.screenWidth,
                height: this._sysInfo.screenWidth / 4,
            }
        });
        if (this._bannerAd) {
            this._bannerAd.show();
            this._bannerAd.onError(function (err) {
                Utils_1.utils.showLog("UC平台banner出错" + err);
            });
        }
    };
    AdAgentUC.prototype.ShowInterstitial = function () {
        // if(this.)
        Utils_1.utils.showLog("展示插屏广告");
        var interstitialAd = this.uc.createInterstitialAd();
        interstitialAd.load()
            .then()
            .catch(function (err) { return Utils_1.utils.showLog("\u63D2\u5C4F\u52A0\u8F7D\u5F02\u5E38\uFF1A" + err); });
        interstitialAd.onLoad(function () {
            interstitialAd.offLoad(); // 取消 load 事件的监听，不传 callback 的话会取消所有的监听
            interstitialAd
                .show()
                .then()
                .catch(function (err) { return Utils_1.utils.showLog("\u63D2\u5C4F\u5C55\u793A\u5F02\u5E38\uFF1A" + err); });
            Utils_1.utils.showLog('UC插屏广告加载成功');
        });
        interstitialAd.onError(function (err) {
            Utils_1.utils.showLog(err);
        });
    };
    AdAgentUC.prototype.initVideo = function () {
        var _this = this;
        this._videoAd = this.uc.createRewardVideoAd();
        this._videoAd.onLoad(function () {
            Utils_1.utils.showLog('激励视频 广告加载成功');
        });
        this._videoAd.onError(function (err) {
            Utils_1.utils.showLog("出错了：" + err);
            if (_this._videoCallback) {
                _this._videoCallback(false, "暂无视频广告");
                _this._videoCallback = null;
            }
        });
        this._videoAd.onClose(function (res) {
            Utils_1.utils.showLog("用户关闭视频" + res);
            if (res && res.isEnded) {
                if (_this._videoCallback) {
                    _this._videoCallback(true, "");
                    _this._videoCallback = null;
                }
            }
            else {
                if (_this._videoCallback) {
                    _this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                    _this._videoCallback = null;
                }
            }
        });
    };
    AdAgentUC.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.ISUC) {
            this._videoCallback = callback;
            if (!this._videoAd) {
                this.initVideo();
            }
            else {
                this._videoAd.show();
            }
        }
    };
    AdAgentUC = __decorate([
        ccclass
    ], AdAgentUC);
    return AdAgentUC;
}(AdAgent_1.default));
exports.default = AdAgentUC;

cc._RF.pop();