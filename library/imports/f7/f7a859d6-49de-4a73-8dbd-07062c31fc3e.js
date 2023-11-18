"use strict";
cc._RF.push(module, 'f7a85nWSd5Kc429BwYsMfw+', 'AdAgentDouyin');
// common-plugin/Scripts/AdAgentDouyin.ts

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
var AdAgentDouyin = /** @class */ (function (_super) {
    __extends(AdAgentDouyin, _super);
    function AdAgentDouyin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._sysData = null;
        _this._bannerAds = [];
        _this._isBannerShow = false;
        //@ts-ignore
        _this.tt = window.tt;
        _this._bannerBottom = 0;
        _this._lastShowInterstitialTime = 0;
        _this.interstitialAd = null;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._isVideoShow = false;
        return _this;
    }
    Object.defineProperty(AdAgentDouyin.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.Tool_Douyin.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentDouyin.prototype.Init = function () {
        if (PlatUtils_1.default.IsDouyin) {
            //@ts-ignore
            this._sysData = Utils_1.utils.Tool_Douyin._sysInfo;
            // utils.registerServerInitEvent(() => {
            //     // this._initVideoAd();
            // }, this)
        }
    };
    AdAgentDouyin.prototype.ShowBanner = function (location, args) {
        var _this = this;
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsDouyin) {
            if (Utils_1.utils.isShowRecommondGamesBanner() && Utils_1.utils.Tool_Douyin.isShowMoreGamesModal()) {
                Utils_1.utils.showRecommendGamesBanner();
                Utils_1.utils.showLog("\u670D\u52A1\u5668\u914D\u7F6E\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                return;
            }
            if (Utils_1.utils.Tool_Douyin.isNewsArticleLite) {
                Utils_1.utils.showLog("头条极速版不显示Banner广告");
                return;
            }
            if (this._isConfigValid()) {
                var argsTmp = args;
                var bannerSizePercent = 1;
                if (argsTmp && argsTmp.width) {
                    bannerSizePercent = ((argsTmp.width < 0) ? 0.1 : argsTmp.width);
                    bannerSizePercent = ((argsTmp.width > 1) ? 1 : bannerSizePercent);
                }
                if (argsTmp && argsTmp.bottom) {
                    this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                    this._bannerBottom = ((this._bannerBottom < 0) ? 0 : this._bannerBottom);
                    this._bannerBottom = ((this._bannerBottom > this._sysData.screenHeight) ? this._sysData.screenHeight : this._bannerBottom);
                }
                var targetBannerAdWidth_1 = 60;
                var left = (this._sysData.screenWidth - targetBannerAdWidth_1) * 0.5;
                var top = this._sysData.screenHeight - (targetBannerAdWidth_1 / 16 * 9 - this._bannerBottom);
                // 创建一个居于屏幕底部正中的广告
                var bannerId = Utils_1.utils.config.douyinconfig.bannerId;
                Utils_1.utils.showLog("显示Banner广告: bannerId=" + bannerId + " #targetBannerAdWidth=", targetBannerAdWidth_1);
                //@ts-ignore
                try {
                    var bannerAd_1 = this.tt.createBannerAd({
                        adUnitId: bannerId,
                        style: {
                            width: targetBannerAdWidth_1,
                            left: left,
                            top: top
                        }
                    });
                    if (bannerAd_1) {
                        var self_1 = this;
                        bannerAd_1.onLoad(function () {
                            bannerAd_1.show().then(function () {
                                Utils_1.utils.showLog('广告显示成功');
                                for (var i = 0; i < self_1._bannerAds.length; i++) {
                                    if (self_1._bannerAds[i] != bannerAd_1 && self_1._bannerAds[i] != null) {
                                        self_1._bannerAds[i].destroy();
                                    }
                                }
                                self_1._bannerAds.length = 0;
                                self_1._bannerAds.push(bannerAd_1);
                            }).catch(function (err) {
                                Utils_1.utils.showLog("\u5E7F\u544A\u7EC4\u4EF6\u51FA\u73B0\u95EE\u9898  " + (err.errCode, err.errMsg));
                            });
                        });
                        bannerAd_1.onError(function (err) {
                            if (err) {
                                Utils_1.utils.showLog("Banner \u5E7F\u544A\u51FA\u9519: errCode:  " + err.errCode + " errMsg:" + err.errMsg);
                            }
                        });
                        bannerAd_1.onResize(function (res) {
                            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
                            bannerAd_1.style.top = _this._sysData.screenHeight - res.height - _this._bannerBottom;
                            if (res.width > 0) {
                                bannerAd_1.style.left = (_this._sysData.screenWidth - res.width) * 0.5;
                            }
                            else {
                                bannerAd_1.style.left = (_this._sysData.screenWidth - targetBannerAdWidth_1) / 2;
                            }
                        });
                        this._bannerAds.push(bannerAd_1);
                    }
                }
                catch (error) {
                }
            }
            else {
                Utils_1.utils.showLog("抖音小游戏配置文件出错!");
            }
        }
    };
    AdAgentDouyin.prototype.HideBanner = function (location) {
        if (PlatUtils_1.default.IsDouyin) {
            for (var i = 0; i < this._bannerAds.length; i++) {
                if (this._bannerAds[i] != null) {
                    this._bannerAds[i].destroy();
                }
            }
            this._bannerAds.length = 0;
        }
    };
    AdAgentDouyin.prototype.checkCanShowInterstitial = function () {
        if (this.tt.createInterstitialAd) {
            return true;
        }
        return false;
    };
    AdAgentDouyin.prototype.ShowInterstitial = function (location) {
        if (PlatUtils_1.default.IsDouyin) {
            if (this.checkCanShowInterstitial()) {
                var curTime = new Date().getTime();
                var interval = (curTime - this._lastShowInterstitialTime) / 1000;
                if (interval < 30) {
                    Utils_1.utils.showLog("距离插屏广告或者激励视频广告上次播放时间间隔不足30秒");
                    return;
                }
                this._lastShowInterstitialTime = curTime;
                Utils_1.utils.delayCall(this._createMiniGameInsertAd.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
            }
            else {
                Utils_1.utils.showLog("当前客户端版本不支持插屏！");
            }
        }
    };
    AdAgentDouyin.prototype._createMiniGameInsertAd = function () {
        var _this = this;
        try {
            if (!Utils_1.utils.config.douyinconfig.insertId) {
                Utils_1.utils.showLog("插屏ID配置有误");
                return;
            }
            if (this.interstitialAd) {
                this.interstitialAd.destroy();
                this.interstitialAd = null;
            }
            this.interstitialAd = this.tt.createInterstitialAd({
                adUnitId: Utils_1.utils.config.douyinconfig.insertId
            });
            this.interstitialAd.load().then(function () {
                _this.interstitialAd.show();
            }).catch(function (err) {
                Utils_1.utils.showLog(err);
                Utils_1.utils.showLog("err.errCode:" + err.errCode);
                switch (err.errCode) {
                    case 2001:
                        Utils_1.utils.showLog("小程序启动一定时间内不允许展示插屏广告");
                        break;
                    case 2002:
                        Utils_1.utils.showLog("距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告");
                        break;
                    case 2003:
                        Utils_1.utils.showLog("当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告");
                        break;
                    case 2004:
                        Utils_1.utils.showLog("该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败");
                        break;
                    case 2005:
                        Utils_1.utils.showLog("插屏广告实例不允许跨页面调用");
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        Utils_1.utils.showLog("插屏广告展示失败");
                        break;
                }
            });
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    AdAgentDouyin.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsDouyin) {
            this._videoCallback = callback;
            this._isVideoShow = true;
            if (Utils_1.utils.Tool_Douyin.ServerConfig) {
                var posId = Utils_1.utils.config.douyinconfig.videoId.trim();
                Utils_1.utils.showLog("video广告ID:" + posId);
                if (!this._videoAd) {
                    //@ts-ignore
                    this._videoAd = tt.createRewardedVideoAd({
                        adUnitId: posId
                    });
                    if (this._videoAd) {
                        Utils_1.utils.showLog("初始化注册视频回调!");
                        // this._videoAd.onLoad(() => {
                        //     utils.showLog("激励视频加载成功", this._isVideoShow);
                        //     // this._isVideoLoaded = true;
                        //     // if (this._isVideoShow) {
                        //     //     this._isVideoShow = false;
                        //     // }
                        // })
                        this._videoAd.onError(function (err) {
                            Utils_1.utils.showLog("\u6FC0\u52B1\u89C6\u9891\u51FA\u9519: " + (err.code, err.msg));
                            _this._isVideoLoaded = false;
                            if (_this._videoCallback) {
                                _this._videoCallback(false, "暂无视频广告!");
                                _this._videoCallback = null;
                            }
                        });
                        this._videoAd.onClose(function (res) {
                            _this._isVideoShow = false;
                            _this._isVideoLoaded = false;
                            if (res.isEnded) {
                                Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                                if (_this._videoCallback) {
                                    _this._videoCallback(true, "");
                                    _this._videoCallback = null;
                                }
                            }
                            else {
                                Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                                if (_this._videoCallback) {
                                    _this._videoCallback(false, "观看完视频才能获得奖励!");
                                    _this._videoCallback = null;
                                }
                            }
                        });
                    }
                    else {
                        Utils_1.utils.showLog("videoAd 对象创建失败，播放失败!");
                        if (this._videoCallback) {
                            this._videoCallback(false, "暂无视频广告!");
                            this._videoCallback = null;
                        }
                    }
                }
                // else {
                // if (this._isVideoLoaded) {
                //     this._videoAd.show().then(() => {
                //         utils.showLog("激励视频播放成功!");
                //     }).catch((ero) => {
                //         utils.showLog("激励视频播放失败! >>>>" + ero);
                //         if (this._videoCallback) {
                //             this._videoCallback(false, "视频播放失败,请稍后再试!");
                //             this._videoCallback = null;
                //         }
                //     });
                //     this._isVideoShow = false;
                // } else {
                this._videoAd.load().then(function () {
                    Utils_1.utils.showLog("激励视频加载成功");
                    _this._videoAd.show().then(function () {
                        Utils_1.utils.showLog("激励视频播放成功!");
                        _this._lastShowInterstitialTime = new Date().getTime();
                    }).catch(function () {
                        Utils_1.utils.showLog("激励视频播放失败!");
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "视频播放失败,请稍后再试!");
                            _this._videoCallback = null;
                        }
                    });
                }).catch(function () {
                    Utils_1.utils.showLog("再次播放视频资源加载失败!");
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "视频播放失败,请稍后再试!");
                        _this._videoCallback = null;
                    }
                });
            }
            // }
        }
        else {
            Utils_1.utils.showLog("获取配置失败，视频无法播放!");
            if (this._videoCallback) {
                this._videoCallback(false, "暂无视频广告!");
                this._videoCallback = null;
            }
        }
        // }
    };
    AdAgentDouyin.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (Utils_1.utils.Tool_Douyin.ServerConfig) {
                var posId = Utils_1.utils.config.douyinconfig.videoId.trim();
                Utils_1.utils.showLog("video广告ID:" + posId);
                //@ts-ignore
                this._videoAd = tt.createRewardedVideoAd({
                    adUnitId: posId
                });
                if (this._videoAd) {
                    Utils_1.utils.showLog("初始化注册视频回调!");
                    this._videoAd.onLoad(function () {
                        Utils_1.utils.showLog("激励视频加载成功", _this._isVideoShow);
                        _this._isVideoLoaded = true;
                        if (_this._isVideoShow) {
                            _this._videoAd.show().then(function () {
                                Utils_1.utils.showLog("激励视频播放成功!");
                            }).catch(function () {
                                Utils_1.utils.showLog("激励视频播放失败!");
                                if (_this._videoCallback) {
                                    _this._videoCallback(false, "视频播放失败,请稍后再试!");
                                    _this._videoCallback = null;
                                }
                            });
                            _this._isVideoShow = false;
                        }
                    });
                    this._videoAd.onError(function (err) {
                        Utils_1.utils.showLog("\u6FC0\u52B1\u89C6\u9891\u51FA\u9519: " + (err.code, err.msg), err);
                        _this._isVideoLoaded = false;
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "暂无视频广告!");
                            _this._videoCallback = null;
                        }
                    });
                    this._videoAd.onClose(function (res) {
                        _this._isVideoShow = false;
                        _this._isVideoLoaded = false;
                        if (res.isEnded) {
                            Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                            if (_this._videoCallback) {
                                _this._videoCallback(true, "");
                                _this._videoCallback = null;
                            }
                        }
                        else {
                            Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                            if (_this._videoCallback) {
                                _this._videoCallback(false, "观看完视频才能获得奖励!");
                                _this._videoCallback = null;
                            }
                        }
                        _this._videoAd.load().then(function () {
                            Utils_1.utils.showLog("关闭视频后重新加载视频资源成功！");
                            _this._isVideoShow = false;
                            _this._isVideoLoaded = true;
                        });
                    });
                }
                else {
                    Utils_1.utils.showLog("暂无视频广告!");
                    if (this._videoCallback) {
                        this._videoCallback(false, "暂无视频广告!");
                        this._videoCallback = null;
                    }
                }
            }
            else {
                Utils_1.utils.showLog("暂无视频广告!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            }
        }
    };
    AdAgentDouyin.prototype._isConfigValid = function () {
        if (PlatUtils_1.default.IsDouyin) {
            return (Utils_1.utils.config.douyinconfig
                && Utils_1.utils.config.douyinconfig.appID
                && Utils_1.utils.config.douyinconfig.bannerId
                && Utils_1.utils.config.douyinconfig.videoId);
        }
        return false;
    };
    AdAgentDouyin.prototype.ShowCloseBtnBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        Utils_1.utils.showLog("ShowCloseBtnBanner >>>>>>>>>.");
        var isMoveBtn = 0;
        var fadeInTime = 0;
        var btn = args.closeBtn;
        var winHeight = cc.winSize.height;
        btn.opacity = 0;
        if (this.ServerConfig) {
            if (this.ServerConfig.show_close_btn_delay) {
                fadeInTime = this.ServerConfig.show_close_btn_delay;
            }
            // setTimeout(() => {
            //     utils.showLog("延迟调用关闭按钮的Banner >>>>");
            //     this.ShowBanner(location, args);
            //     var adY = 200;
            //     utils.showLog('utils - adY:' + adY);
            //     if (adY > 0 && btn) {
            //         btn.y = -(winHeight / 2 - adY) + btn.height;
            //         utils.showLog("btnClose.y" + btn.y);
            //     }
            // }, isMoveBtn);
            setTimeout(function () {
                btn.runAction(cc.fadeIn(0.3));
            }, fadeInTime * 1000);
        }
    };
    AdAgentDouyin = __decorate([
        ccclass
    ], AdAgentDouyin);
    return AdAgentDouyin;
}(AdAgent_1.default));
exports.default = AdAgentDouyin;

cc._RF.pop();