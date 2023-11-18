"use strict";
cc._RF.push(module, '4db21W0NW9ALaQL6EjOywaw', 'AdAgentBaidu');
// common-plugin/Scripts/AdAgentBaidu.ts

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
var AdAgentBaidu = /** @class */ (function (_super) {
    __extends(AdAgentBaidu, _super);
    function AdAgentBaidu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._baiduVersion = "";
        _this._recorder = null;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._isVideoShow = false;
        _this._isVideoLoaded = false;
        //@ts-ignore
        _this.swan = window.swan;
        _this._bannerSizePercent = 0.1;
        _this._bannerBottom = 0;
        return _this;
    }
    AdAgentBaidu.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsBaidu) {
            this._sysData = this.swan.getSystemInfoSync();
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initVideoAd();
            }, this);
        }
    };
    AdAgentBaidu.prototype.ShowBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsBaidu) {
            if (Utils_1.utils.isShowRecommondGamesBanner() && Utils_1.utils.isSupportnavigateToMiniGame()) {
                Utils_1.utils.showRecommendGamesBanner();
                Utils_1.utils.showLog("\u670D\u52A1\u5668\u914D\u7F6E\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                return;
            }
            Utils_1.utils.showLog("显示banner广告...");
            var argsTmp = args;
            if (argsTmp && argsTmp.width) {
                if (cc.winSize.height / cc.winSize.width < 1) {
                    this._bannerSizePercent = argsTmp.width;
                }
                else {
                    this._bannerSizePercent = ((argsTmp.width <= 0.8) ? 0.8 : argsTmp.width);
                }
                this._bannerSizePercent = ((argsTmp.width > 1) ? 1 : this._bannerSizePercent);
            }
            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                this._bannerBottom = ((this._bannerBottom < 0) ? 0 : this._bannerBottom);
                this._bannerBottom = ((this._bannerBottom > this._sysData.screenHeight) ? this._sysData.screenHeight : this._bannerBottom);
            }
            // banner 广告
            if (Utils_1.utils.config.baiduconfig
                && Utils_1.utils.config.baiduconfig.bannerId
                && Utils_1.utils.config.baiduconfig.appSID) {
                var left = (this._sysData.screenWidth - this._sysData.screenWidth * this._bannerSizePercent) / 2;
                var width_1 = this._sysData.screenWidth * this._bannerSizePercent;
                var bannerOpts = {
                    adUnitId: Utils_1.utils.config.baiduconfig.bannerId,
                    appSid: Utils_1.utils.config.baiduconfig.appSID,
                    style: {
                        top: 0,
                        left: left,
                        width: width_1
                    }
                };
                var bannerAd_1 = null;
                var oldBannerAd_1 = this._bannerAd;
                var onLoadFunc_1 = function () {
                    if (bannerAd_1) {
                        bannerAd_1.show().then(function () {
                            _this._bannerAd = bannerAd_1;
                            if (oldBannerAd_1) {
                                oldBannerAd_1.destroy();
                                oldBannerAd_1.offLoad(onLoadFunc_1);
                                oldBannerAd_1.offError(onErrorFunc_1);
                            }
                            Utils_1.utils.showLog("Banner显示成功！");
                        }).catch(function () {
                            Utils_1.utils.showLog("Banner显示出错!");
                        });
                    }
                };
                var onErrorFunc_1 = function (err) {
                    if (err) {
                        Utils_1.utils.showLog("Banner 广告出错 : ", err.errCode, err.errMsg);
                    }
                };
                var onResizeFunc = function (res) {
                    bannerAd_1.style.width = width_1;
                    bannerAd_1.style.top = _this._sysData.screenHeight - res.height - _this._bannerBottom;
                };
                bannerAd_1 = this.swan.createBannerAd(bannerOpts);
                if (bannerAd_1) {
                    bannerAd_1.onLoad(onLoadFunc_1);
                    bannerAd_1.onError(onErrorFunc_1);
                    bannerAd_1.onResize(onResizeFunc);
                    bannerAd_1.style.width = width_1 + 1;
                    if (PlatUtils_1.default.IsIOS) {
                        bannerAd_1.style.top = this._sysData.screenHeight;
                    }
                }
            }
            else {
                cc.warn("百度广告配置文件出错!");
            }
        }
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentBaidu.prototype.showStatementAds = function () {
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
    AdAgentBaidu.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsBaidu) {
            if (this._bannerAd) {
                this._bannerAd.hide();
            }
        }
    };
    AdAgentBaidu.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        console.warn("百度没有插屏");
    };
    AdAgentBaidu.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsBaidu) {
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
            }
            else {
                if (this._isVideoLoaded) {
                    this._videoAd.show().then(function () {
                        Utils_1.utils.showLog("视频显示成功!");
                        _this._isVideoLoaded = false;
                    }).catch(function (err) {
                    });
                }
                else {
                    this._videoAd.load().catch(function (err) {
                    });
                }
            }
        }
    };
    AdAgentBaidu.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (!(Utils_1.utils.config.baiduconfig
                && Utils_1.utils.config.baiduconfig.appSID
                && Utils_1.utils.config.baiduconfig.videoId)) {
                Utils_1.utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            var videoOpts = {
                adUnitId: Utils_1.utils.config.baiduconfig.videoId,
                appSid: Utils_1.utils.config.baiduconfig.appSID
            };
            Utils_1.utils.showLog("视频广告参数:", JSON.stringify(videoOpts));
            this._videoAd = this.swan.createRewardedVideoAd(videoOpts);
            if (this._videoAd) {
                this._videoAd.onLoad(function () {
                    Utils_1.utils.showLog("视频加载成功");
                    _this._isVideoLoaded = true;
                    if (_this._isVideoShow) {
                        _this._videoAd.show().then(function () {
                            _this._isVideoLoaded = false;
                        }).catch(function () {
                            Utils_1.utils.showLog("视频播放失败！");
                        });
                    }
                });
                this._videoAd.onClose(function (res) {
                    _this._isVideoShow = false;
                    if (res && res.isEnded) {
                        Utils_1.utils.showLog("正常播放结束，可以下发游戏奖励");
                        if (_this._videoCallback) {
                            _this._videoCallback(true, "");
                            _this._videoCallback = null;
                        }
                    }
                    else {
                        Utils_1.utils.showLog("播放中途退出，不下发游戏奖励");
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "观看完视频才能获得奖励!");
                            _this._videoCallback = null;
                        }
                    }
                });
                this._videoAd.onError(function (err) {
                    Utils_1.utils.showLog("激励视频异常!", err.errCode);
                    _this._isVideoLoaded = false;
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "暂无视频广告!");
                        _this._videoCallback = null;
                    }
                });
            }
        }
    };
    AdAgentBaidu = __decorate([
        ccclass
    ], AdAgentBaidu);
    return AdAgentBaidu;
}(AdAgent_1.default));
exports.default = AdAgentBaidu;

cc._RF.pop();