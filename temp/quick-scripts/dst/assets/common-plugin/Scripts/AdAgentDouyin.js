
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentDouyin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudERvdXlpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNkNBQStFO0FBQy9FLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQU87SUFBbEQ7UUFBQSxxRUEwYkM7UUF4YkcsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFFckIsZ0JBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFNL0IsWUFBWTtRQUNaLFFBQUUsR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDO1FBYXBCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBa0gxQiwrQkFBeUIsR0FBVyxDQUFDLENBQUE7UUFrQjdCLG9CQUFjLEdBQUcsSUFBSSxDQUFDO1FBa0Q5QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBWSxHQUFZLEtBQUssQ0FBQzs7SUF1T2xDLENBQUM7SUFqYkcsc0JBQVcsdUNBQVk7YUFBdkI7WUFDSSxPQUFPLGFBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBSU0sNEJBQUksR0FBWDtRQUNJLElBQUksbUJBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsWUFBWTtZQUVaLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDM0Msd0NBQXdDO1lBQ3hDLDhCQUE4QjtZQUU5QixXQUFXO1NBQ2Q7SUFDTCxDQUFDO0lBR00s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ZEFnZW50XCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uLCBMZXZlbFN0YXR1cywgQmVGb3JHYW1lT3ZlckFkSWQgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRBZ2VudERvdXlpbiBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuICAgIF9iYW5uZXJBZDogYW55ID0gbnVsbDtcclxuICAgIF92aWRlb0FkOiBhbnkgPSBudWxsO1xyXG4gICAgX3N5c0RhdGE6IGFueSA9IG51bGw7XHJcblxyXG4gICAgX2Jhbm5lckFkczogYW55W10gPSBbXTtcclxuICAgIF9pc0Jhbm5lclNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdXRpbHMuVG9vbF9Eb3V5aW4uU2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgdHQ6IGFueSA9IHdpbmRvdy50dDtcclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zeXNEYXRhID0gdXRpbHMuVG9vbF9Eb3V5aW4uX3N5c0luZm87XHJcbiAgICAgICAgICAgIC8vIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB9LCB0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYmFubmVyQm90dG9tOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIFNob3dCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBhcmdzOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkgJiYgdXRpbHMuVG9vbF9Eb3V5aW4uaXNTaG93TW9yZUdhbWVzTW9kYWwoKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd1JlY29tbWVuZEdhbWVzQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmnI3liqHlmajphY3nva7lsZXnpLroh6rlrprkuYliYW5uZXJgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9Eb3V5aW4uaXNOZXdzQXJ0aWNsZUxpdGUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlpLTmnaHmnoHpgJ/niYjkuI3mmL7npLpCYW5uZXLlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ29uZmlnVmFsaWQoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhcmdzVG1wID0gYXJncztcclxuICAgICAgICAgICAgICAgIGxldCBiYW5uZXJTaXplUGVyY2VudDogbnVtYmVyID0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzVG1wICYmIGFyZ3NUbXAud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYW5uZXJTaXplUGVyY2VudCA9ICgoYXJnc1RtcC53aWR0aCA8IDApID8gMC4xIDogYXJnc1RtcC53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyU2l6ZVBlcmNlbnQgPSAoKGFyZ3NUbXAud2lkdGggPiAxKSA/IDEgOiBiYW5uZXJTaXplUGVyY2VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NUbXAgJiYgYXJnc1RtcC5ib3R0b20pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSBhcmdzVG1wLmJvdHRvbSAvIHRoaXMuX3N5c0RhdGEucGl4ZWxSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSAoKHRoaXMuX2Jhbm5lckJvdHRvbSA8IDApID8gMCA6IHRoaXMuX2Jhbm5lckJvdHRvbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQm90dG9tID0gKCh0aGlzLl9iYW5uZXJCb3R0b20gPiB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCkgPyB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCA6IHRoaXMuX2Jhbm5lckJvdHRvbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldEJhbm5lckFkV2lkdGggPSA2MDtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSAodGhpcy5fc3lzRGF0YS5zY3JlZW5XaWR0aCAtIHRhcmdldEJhbm5lckFkV2lkdGgpICogMC41O1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gdGhpcy5fc3lzRGF0YS5zY3JlZW5IZWlnaHQgLSAodGFyZ2V0QmFubmVyQWRXaWR0aCAvIDE2ICogOSAtIHRoaXMuX2Jhbm5lckJvdHRvbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5Yib5bu65LiA5Liq5bGF5LqO5bGP5bmV5bqV6YOo5q2j5Lit55qE5bm/5ZGKXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFubmVySWQ6IHN0cmluZyA9IHV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcuYmFubmVySWQ7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S6QmFubmVy5bm/5ZGKOiBiYW5uZXJJZD1cIiArIGJhbm5lcklkICsgXCIgI3RhcmdldEJhbm5lckFkV2lkdGg9XCIsIHRhcmdldEJhbm5lckFkV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJBZCA9IHRoaXMudHQuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogYmFubmVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGFyZ2V0QmFubmVyQWRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uTG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5bm/5ZGK5pi+56S65oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLl9iYW5uZXJBZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX2Jhbm5lckFkc1tpXSAhPSBiYW5uZXJBZCAmJiBzZWxmLl9iYW5uZXJBZHNbaV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fYmFubmVyQWRzW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9iYW5uZXJBZHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9iYW5uZXJBZHMucHVzaChiYW5uZXJBZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOW5v+WRiue7hOS7tuWHuueOsOmXrumimCAgJHtlcnIuZXJyQ29kZSwgZXJyLmVyck1zZ31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYEJhbm5lciDlub/lkYrlh7rplJk6IGVyckNvZGU6ICAke2Vyci5lcnJDb2RlfSBlcnJNc2c6JHtlcnIuZXJyTXNnfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uUmVzaXplKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOS4gOW8gOWni+iuvue9rueahCBiYW5uZXIg5a695bqm6LaF6L+H5LqG57O757uf6ZmQ5Yi277yM5Y+v5Lul5Zyo5q2k5aSE5Yqg5Lul6LCD5pW0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5zdHlsZS50b3AgPSB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCAtIHJlcy5oZWlnaHQgLSB0aGlzLl9iYW5uZXJCb3R0b207XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5zdHlsZS5sZWZ0ID0gKHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGggLSByZXMud2lkdGgpICogMC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5zdHlsZS5sZWZ0ID0gKHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGggLSB0YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkcy5wdXNoKGJhbm5lckFkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmipbpn7PlsI/muLjmiI/phY3nva7mlofku7blh7rplJkhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIEhpZGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2Jhbm5lckFkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Jhbm5lckFkc1tpXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWRzW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBZHMubGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tDYW5TaG93SW50ZXJzdGl0aWFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR0LmNyZWF0ZUludGVyc3RpdGlhbEFkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sYXN0U2hvd0ludGVyc3RpdGlhbFRpbWU6IG51bWJlciA9IDBcclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tDYW5TaG93SW50ZXJzdGl0aWFsKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9sYXN0U2hvd0ludGVyc3RpdGlhbFRpbWUpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnZhbCA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIui3neemu+aPkuWxj+W5v+WRiuaIluiAhea/gOWKseinhumikeW5v+WRiuS4iuasoeaSreaUvuaXtumXtOmXtOmalOS4jei2szMw56eSXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTaG93SW50ZXJzdGl0aWFsVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeWuouaIt+err+eJiOacrOS4jeaUr+aMgeaPkuWxj++8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVyc3RpdGlhbEFkID0gbnVsbDtcclxuICAgIHB1YmxpYyBfY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcuaW5zZXJ0SWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY9JROmFjee9ruacieivr1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnN0aXRpYWxBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyc3RpdGlhbEFkID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnRlcnN0aXRpYWxBZCA9IHRoaXMudHQuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcuaW5zZXJ0SWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJzdGl0aWFsQWQubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnN0aXRpYWxBZC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyLmVyckNvZGU6XCIgKyBlcnIuZXJyQ29kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChlcnIuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjAwMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWwj+eoi+W6j+WQr+WKqOS4gOWumuaXtumXtOWGheS4jeWFgeiuuOWxleekuuaPkuWxj+W5v+WRilwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIwMDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLot53nprvlsI/nqIvluo/mj5LlsY/lub/lkYrmiJbogIXmv4DlirHop4bpopHlub/lkYrkuIrmrKHmkq3mlL7ml7bpl7Tpl7TpmpTkuI3otrPvvIzkuI3lhYHorrjlsZXnpLrmj5LlsY/lub/lkYpcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5q2j5Zyo5pKt5pS+5r+A5Yqx6KeG6aKR5bm/5ZGK5oiW6ICF5o+S5bGP5bm/5ZGK77yM5LiN5YWB6K645YaN5qyh5bGV56S65o+S5bGP5bm/5ZGKXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjAwNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivpemhuemUmeivr+S4jeaYr+W8gOWPkeiAheeahOW8guW4uOaDheWGte+8jOaIluWboOWwj+eoi+W6j+mhtemdouWIh+aNouWvvOiHtOW5v+WRiua4suafk+Wksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIwMDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrlrp7kvovkuI3lhYHorrjot6jpobXpnaLosIPnlKhcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+C6ICDIGh0dHBzOi8vbWluaWdhbWUudml2by5jb20uY24vZG9jdW1lbnRzLyMvbGVzc29uL29wZW4tYWJpbGl0eS9hZD9pZD3lub/lkYrplJnor6/noIHkv6Hmga8g5a+56ZSZ6K+v56CB5YGa5YiG57G75aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrlsZXnpLrlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIF92aWRlb0NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzVmlkZW9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfRG91eWluLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvc0lkOiBzdHJpbmcgPSB1dGlscy5jb25maWcuZG91eWluY29uZmlnLnZpZGVvSWQudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInZpZGVv5bm/5ZGKSUQ6XCIgKyBwb3NJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkID0gdHQuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHBvc0lkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIneWni+WMluazqOWGjOinhumikeWbnuiwgyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3ZpZGVvQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIiwgdGhpcy5faXNWaWRlb1Nob3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5faXNWaWRlb0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBpZiAodGhpcy5faXNWaWRlb1Nob3cpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmv4DlirHop4bpopHlh7rplJk6ICR7ZXJyLmNvZGUsIGVyci5tc2d9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uQ2xvc2UoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a/gOWKseinhumikeW5v+WRiuWujOaIkO+8jOWPkeaUvuWlluWKsScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR5bm/5ZGK5Y+W5raI5YWz6Zet77yM5LiN5Y+R5pS+5aWW5YqxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLop4LnnIvlrozop4bpopHmiY3og73ojrflvpflpZblirEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aWRlb0FkIOWvueixoeWIm+W7uuWksei0pe+8jOaSreaUvuWksei0pSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLl9pc1ZpZGVvTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fdmlkZW9BZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHmkq3mlL7miJDlip8hXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pLmNhdGNoKChlcm8pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeaSreaUvuWksei0pSEgPj4+PlwiICsgZXJvKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeG6aKR5pKt5pS+5aSx6LSlLOivt+eojeWQjuWGjeivlSFcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2lzVmlkZW9TaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeaSreaUvuaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTaG93SW50ZXJzdGl0aWFsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeaSreaUvuWksei0pSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuinhumikeaSreaUvuWksei0pSzor7fnqI3lkI7lho3or5UhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YaN5qyh5pKt5pS+6KeG6aKR6LWE5rqQ5Yqg6L295aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuinhumikeaSreaUvuWksei0pSzor7fnqI3lkI7lho3or5UhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bphY3nva7lpLHotKXvvIzop4bpopHml6Dms5Xmkq3mlL4hXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIF9pbml0VmlkZW9BZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfRG91eWluLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvc0lkOiBzdHJpbmcgPSB1dGlscy5jb25maWcuZG91eWluY29uZmlnLnZpZGVvSWQudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInZpZGVv5bm/5ZGKSUQ6XCIgKyBwb3NJZCk7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQgPSB0dC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiBwb3NJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yid5aeL5YyW5rOo5YaM6KeG6aKR5Zue6LCDIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIiwgdGhpcy5faXNWaWRlb1Nob3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmlkZW9TaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5pKt5pS+5oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5pKt5pS+5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuinhumikeaSreaUvuWksei0pSzor7fnqI3lkI7lho3or5UhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9TaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmv4DlirHop4bpopHlh7rplJk6ICR7ZXJyLmNvZGUsIGVyci5tc2d9YCwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkNsb3NlKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmlzRW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a/gOWKseinhumikeW5v+WRiuWujOaIkO+8jOWPkeaUvuWlluWKsScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR5bm/5ZGK5Y+W5raI5YWz6Zet77yM5LiN5Y+R5pS+5aWW5YqxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeC55yL5a6M6KeG6aKR5omN6IO96I635b6X5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz6Zet6KeG6aKR5ZCO6YeN5paw5Yqg6L296KeG6aKR6LWE5rqQ5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9pc0NvbmZpZ1ZhbGlkKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuICh1dGlscy5jb25maWcuZG91eWluY29uZmlnXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuZG91eWluY29uZmlnLmFwcElEXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuZG91eWluY29uZmlnLmJhbm5lcklkXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuZG91eWluY29uZmlnLnZpZGVvSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dDbG9zZUJ0bkJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lLCBhcmdzOiBhbnkpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiU2hvd0Nsb3NlQnRuQmFubmVyID4+Pj4+Pj4+Pi5cIik7XHJcblxyXG4gICAgICAgIGxldCBpc01vdmVCdG4gPSAwO1xyXG4gICAgICAgIGxldCBmYWRlSW5UaW1lID0gMDtcclxuICAgICAgICBsZXQgYnRuOiBjYy5Ob2RlID0gYXJncy5jbG9zZUJ0bjtcclxuICAgICAgICBsZXQgd2luSGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGJ0bi5vcGFjaXR5ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuc2hvd19jbG9zZV9idG5fZGVsYXkpIHtcclxuICAgICAgICAgICAgICAgIGZhZGVJblRpbWUgPSB0aGlzLlNlcnZlckNvbmZpZy5zaG93X2Nsb3NlX2J0bl9kZWxheTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuW7tui/n+iwg+eUqOWFs+mXreaMiemSrueahEJhbm5lciA+Pj4+XCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5TaG93QmFubmVyKGxvY2F0aW9uLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYWRZID0gMjAwO1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZygndXRpbHMgLSBhZFk6JyArIGFkWSk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoYWRZID4gMCAmJiBidG4pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBidG4ueSA9IC0od2luSGVpZ2h0IC8gMiAtIGFkWSkgKyBidG4uaGVpZ2h0O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHV0aWxzLnNob3dMb2coXCJidG5DbG9zZS55XCIgKyBidG4ueSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0sIGlzTW92ZUJ0bik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMykpO1xyXG4gICAgICAgICAgICB9LCBmYWRlSW5UaW1lICogMTAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==