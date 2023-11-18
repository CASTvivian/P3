
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentWechat.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e11aZbbXVLHacOspfN2ARf', 'AdAgentWechat');
// common-plugin/Scripts/AdAgentWechat.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentWechat = /** @class */ (function (_super) {
    __extends(AdAgentWechat, _super);
    function AdAgentWechat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._curBannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._insertAd = null;
        _this._rewardInsertNode = null;
        _this._sysInfo = null;
        _this._bannerSizePercent = 0.1;
        _this._bannerBottom = 0;
        _this._oldBannerLocation = YZ_Constant_1.BannerLocation.None;
        _this._showBannerTimerId = 0;
        _this.isFirstShowInsertAd = true; //首次展示广告
        _this._customAdObjs = [];
        _this._nativeCustomAdObjs = [];
        _this.nativeBannerAd = null;
        _this.nativeIntersititialAd = null;
        return _this;
    }
    Object.defineProperty(AdAgentWechat.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.wechatTool.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdAgentWechat.prototype, "sysInfo", {
        get: function () {
            if (this._sysInfo)
                return this._sysInfo;
            this._sysInfo = Utils_1.utils.wechatTool.getSystemInfo();
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentWechat.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initVideoAd();
                _this._initInsertAd();
                if (Utils_1.utils.getConfigByKey("game_time_report")) {
                    Utils_1.utils.scheduleOnce(function () {
                        Utils_1.utils.wechatTool.reportAttributedEvent(YZ_Constant_1.AttributedType.GameAddiction, YZ_Constant_1.AttributedKey.GameAddiction, YZ_Constant_1.AttributedValue.GameTimeAction);
                    }, Utils_1.utils.getConfigByKey("game_time_report"));
                }
            }, this);
        }
    };
    AdAgentWechat.prototype._initVideoAd = function () {
        if (PlatUtils_1.default.IsWechat) {
            if (!Utils_1.utils.wechatTool.isOverMinVersion("2.0.4")) {
                Utils_1.utils.showLog("当前版本不支持视频广告!");
                return;
            }
            if (!this._videoAd) {
                Utils_1.utils.showLog("初始化视频!");
                if (!Utils_1.utils.config.wechatconfig.videoId) {
                    Utils_1.utils.showLog("视频ID配置错误!");
                    return;
                }
                Utils_1.utils.showLog("视频广告ID:", Utils_1.utils.config.wechatconfig.videoId.trim());
                //@ts-ignore
                this._videoAd = wx.createRewardedVideoAd({
                    adUnitId: Utils_1.utils.config.wechatconfig.videoId
                });
                var self_1 = this;
                if (this._videoAd) {
                    Utils_1.utils.showLog("初始化注册视频回调!");
                    this._videoAd.onLoad(function () {
                        Utils_1.utils.showLog("激励视频加载成功");
                        // this._isVideoLoaded = true;
                    }.bind(this));
                    this._videoAd.onError(function (err) {
                        Utils_1.utils.showLog("激励视频加载失败!", err.code, err.msg);
                        // this._isVideoLoaded = false;
                    }.bind(this));
                    this._videoAd.onClose(function (res) {
                        // this._isVideoLoaded = false;
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                            if (self_1._videoCallback) {
                                self_1._videoCallback(true, "");
                                self_1._videoCallback = null;
                            }
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                            if (self_1._videoCallback) {
                                self_1._videoCallback(false, "观看完视频才能获得奖励!");
                                self_1._videoCallback = null;
                            }
                        }
                    }.bind(this));
                }
                else {
                    Utils_1.utils.showLog("激励视频初始化失败!");
                }
            }
        }
    };
    AdAgentWechat.prototype._createBanner = function (location, args) {
        var _this = this;
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWechat) {
            var locationTmp = location;
            var argsTmp = args;
            if (argsTmp && argsTmp.width) {
                this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
                this._bannerSizePercent = argsTmp.width > 1 ? 1 : argsTmp.width;
            }
            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom < 0 ? 0 : argsTmp.bottom;
                this._bannerBottom = argsTmp.bottom > cc.winSize.height ? cc.winSize.height : argsTmp.bottom;
            }
            var params = {
                adUnitId: Utils_1.utils.config.wechatconfig.getBannerId(locationTmp),
                style: {
                    left: 0,
                    width: 300,
                    top: 0
                }
            };
            if (this._oldBannerLocation != locationTmp && this._curBannerAd) {
                this._curBannerAd.destroy();
                this._oldBannerLocation = locationTmp;
            }
            //@ts-ignore
            var curBannerAd_1 = wx.createBannerAd(params);
            if (curBannerAd_1) {
                curBannerAd_1.onError(function (err) {
                    Utils_1.utils.showLog("广告条加载失败! ", JSON.stringify(err));
                    if (curBannerAd_1) {
                        curBannerAd_1.destroy();
                    }
                    if (_this.ServerConfig.banner_first_ad && _this.ServerConfig.banner_first_ad == "default") {
                        _this.showNativeBannerAd(location, args);
                    }
                });
                var self_2 = this;
                curBannerAd_1.onLoad(function () {
                    curBannerAd_1.show().then(function () {
                        var old = self_2._curBannerAd;
                        if (old) {
                            old.destroy();
                        }
                        self_2._curBannerAd = curBannerAd_1;
                        Utils_1.utils.showLog("默认Banner广告显示成功!");
                        _this.HideNativeBanner();
                    }).catch(function (err) {
                        Utils_1.utils.showLog("Banner广告出错", JSON.stringify(err));
                        if (curBannerAd_1) {
                            curBannerAd_1.destroy();
                        }
                        if (_this.ServerConfig.banner_first_ad && _this.ServerConfig.banner_first_ad == "default") {
                            _this.showNativeBannerAd(location, args);
                        }
                    });
                });
                curBannerAd_1.onResize(function (res) {
                    curBannerAd_1.style.width = Utils_1.utils.wechatTool.getSystemInfo().screenWidth * self_2._bannerSizePercent;
                    curBannerAd_1.style.left = (Utils_1.utils.wechatTool.getSystemInfo().screenWidth - res.width) * 0.5;
                    if (self_2._bannerBottom == cc.winSize.height) {
                        curBannerAd_1.style.top = 0;
                    }
                    else {
                        curBannerAd_1.style.top = Utils_1.utils.wechatTool.getSystemInfo().screenHeight - res.height - self_2._bannerBottom;
                    }
                });
            }
            else {
                Utils_1.utils.showLog("广告条创建失败!");
            }
        }
    };
    AdAgentWechat.prototype.createCustomADBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Game; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWechat) {
            var locationTmp_1 = location;
            if (!Utils_1.utils.config.wechatconfig.getBannerId(locationTmp_1)) {
                locationTmp_1 = YZ_Constant_1.BannerLocation.Home;
            }
            var argsTmp_1 = args;
            if (argsTmp_1 && argsTmp_1.width) {
                this._bannerSizePercent = argsTmp_1.width < 0 ? 0 : argsTmp_1.width;
                this._bannerSizePercent = argsTmp_1.width > 1 ? 1 : argsTmp_1.width;
            }
            if (argsTmp_1 && argsTmp_1.bottom) {
                this._bannerBottom = argsTmp_1.bottom < 0 ? 0 : argsTmp_1.bottom;
                this._bannerBottom = argsTmp_1.bottom > cc.winSize.height ? cc.winSize.height : argsTmp_1.bottom;
            }
            var params = {
                adUnitId: Utils_1.utils.config.wechatconfig.getBannerId(locationTmp_1),
                style: {
                    left: 0,
                    width: 300,
                    top: 0
                }
            };
            if (this._oldBannerLocation != locationTmp_1 && this._curBannerAd) {
                this._curBannerAd.destroy();
                this._oldBannerLocation = locationTmp_1;
            }
            //@ts-ignore
            var curBannerAd_2 = wx.createBannerAd(params);
            if (curBannerAd_2) {
                curBannerAd_2.onError(function (err) {
                    Utils_1.utils.showLog("广告条加载失败! ", JSON.stringify(err));
                    if (curBannerAd_2) {
                        curBannerAd_2.destroy();
                    }
                });
                var self_3 = this;
                curBannerAd_2.onLoad(function () {
                    cc.director.on("CloseCustomADPanel", (function () {
                        curBannerAd_2.show().then(function () {
                            var old = self_3._curBannerAd;
                            if (old) {
                                old.destroy();
                            }
                            self_3._curBannerAd = curBannerAd_2;
                            Utils_1.utils.showLog("Banner广告显示成功!");
                            var interval = 18;
                            if (Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time) {
                                interval = Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time;
                            }
                            clearInterval(self_3._showBannerTimerId);
                            //@ts-ignore
                            self_3._showBannerTimerId = setInterval(function () {
                                Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544A\uFF01location:" + locationTmp_1 + "; args:" + JSON.stringify(argsTmp_1) + "; \u95F4\u9694\u65F6\u95F4:" + Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time);
                                self_3._showBannerTimer(locationTmp_1, argsTmp_1);
                            }.bind(self_3), interval * 1000);
                        }).catch(function (err) {
                            Utils_1.utils.showLog("Banner广告出错", JSON.stringify(err));
                            if (curBannerAd_2) {
                                curBannerAd_2.destroy();
                            }
                        });
                        cc.director.targetOff(self_3);
                    }), self_3);
                });
                curBannerAd_2.onResize(function (res) {
                    curBannerAd_2.style.width = Utils_1.utils.wechatTool.getSystemInfo().screenWidth * self_3._bannerSizePercent;
                    curBannerAd_2.style.left = (Utils_1.utils.wechatTool.getSystemInfo().screenWidth - res.width) * 0.5;
                    if (self_3._bannerBottom == cc.winSize.height) {
                        curBannerAd_2.style.top = 0;
                    }
                    else {
                        curBannerAd_2.style.top = Utils_1.utils.wechatTool.getSystemInfo().screenHeight - res.height - self_3._bannerBottom;
                    }
                });
            }
            else {
                Utils_1.utils.showLog("广告条创建失败!");
            }
        }
    };
    AdAgentWechat.prototype._initInsertAd = function () {
        var _this = this;
        if (PlatUtils_1.default.IsWechat) {
            if (!Utils_1.utils.wechatTool.isOverMinVersion("2.6.0")) {
                Utils_1.utils.showLog("当前版本不支持插屏广告!");
                return;
            }
            if (!this._insertAd) {
                Utils_1.utils.showLog("初始化插屏广告!");
                if (!Utils_1.utils.config.wechatconfig.insertId) {
                    Utils_1.utils.showLog("插屏广告ID配置错误!");
                    return;
                }
                Utils_1.utils.showLog("插屏广告ID:", Utils_1.utils.config.wechatconfig.insertId.trim());
                //@ts-ignore
                this._insertAd = wx.createInterstitialAd({
                    adUnitId: Utils_1.utils.config.wechatconfig.insertId.trim()
                });
                if (this._insertAd) {
                    this._insertAd.onLoad(function () {
                        Utils_1.utils.showLog("插屏广告拉取成功!");
                    });
                    this._insertAd.onError(function (err) {
                        Utils_1.utils.showLog("插屏广告拉取失败!", JSON.stringify(err));
                        if (_this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "default") {
                            _this.showNativeIntersititialAd();
                        }
                    });
                    this._insertAd.onClose(function () {
                        Utils_1.utils.showLog("插屏广告被关闭!");
                    });
                }
                else {
                    Utils_1.utils.showLog("插屏组件初始化失败!");
                }
            }
        }
    };
    AdAgentWechat.prototype._showBannerTimer = function (location, args) {
        var locationTmp = location;
        var argsTmp = args;
        Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544Axxx\uFF01location:" + locationTmp + "; args:" + JSON.stringify(argsTmp) + "; \u95F4\u9694\u65F6\u95F4:" + Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time + ";\u4F18\u5148\u7EA7\uFF1A" + this.ServerConfig.banner_first_ad);
        if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "native") {
            this.showNativeBannerAd(location, args);
        }
        else {
            if (locationTmp == YZ_Constant_1.BannerLocation.None) {
                Utils_1.utils.showLog("未定义的BannerLocation,", locationTmp);
            }
            else {
                if (Utils_1.utils.config.wechatconfig.getBannerId(locationTmp)) {
                    this._createBanner(locationTmp, argsTmp);
                }
                else {
                    Utils_1.utils.showLog("\u672A\u627E\u5230\u4F4D\u7F6E\u4E3A " + locationTmp + " \u7684\u5E7F\u544AID!");
                    this._createBanner(YZ_Constant_1.BannerLocation.Home, argsTmp);
                }
            }
        }
    };
    AdAgentWechat.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWechat) {
            if (!Utils_1.utils.wechatTool.isOverMinVersion("2.0.4")) {
                Utils_1.utils.showLog("当前版本不支持Banner广告!");
                return;
            }
            if (Utils_1.utils.wechatTool.ServerConfig) {
                var locationTmp_2 = location;
                var argsTmp_2 = args;
                this._showBannerTimer(locationTmp_2, argsTmp_2);
                var interval = 18;
                if (Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time) {
                    interval = Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time;
                }
                clearInterval(this._showBannerTimerId);
                //@ts-ignore
                this._showBannerTimerId = setInterval(function () {
                    Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544A\uFF01location:" + locationTmp_2 + "; args:" + JSON.stringify(argsTmp_2) + "; \u95F4\u9694\u65F6\u95F4:" + Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time);
                    this._showBannerTimer(locationTmp_2, argsTmp_2);
                }.bind(this), interval * 1000);
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentWechat.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.showLog("隐藏广告条");
            clearInterval(this._showBannerTimerId);
            this.HideDefaultBanner();
            this.HideNativeBanner();
        }
    };
    AdAgentWechat.prototype.HideDefaultBanner = function () {
        this._curBannerAd && this._curBannerAd.hide();
    };
    AdAgentWechat.prototype.HideNativeBanner = function () {
        this.nativeBannerAd && this.nativeBannerAd.hide();
    };
    AdAgentWechat.prototype.ShowInterstitial = function (location) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsWechat) {
            if (!Utils_1.utils.wechatTool.isOverMinVersion("2.6.0")) {
                Utils_1.utils.showLog("当前版本不支持插屏广告!");
                return;
            }
            var delayTime = 0;
            if (Utils_1.utils.wechatTool
                && Utils_1.utils.wechatTool.ServerConfig
                && Utils_1.utils.wechatTool.ServerConfig.intersititia_delay_show_time) {
                delayTime = Utils_1.utils.wechatTool.ServerConfig.intersititia_delay_show_time;
            }
            Utils_1.utils.showLog("\u63D2\u5C4F\u5E7F\u544A\u5EF6\u65F6\u5C55\u793A\uFF01 delayTime:" + delayTime + "\u79D2");
            setTimeout(function () {
                if (_this.ServerConfig && _this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "box") {
                    Utils_1.utils.showLog("优先展示盒子插屏广告!");
                    if (_this.canShowBoxInsertAd()) {
                        _this._createBoxInsertAd();
                    }
                    else {
                        Utils_1.utils.showLog("盒子插屏广告展示失败，展示默认插屏!");
                        _this._createMiniGameInsertAd();
                    }
                }
                else if (_this.ServerConfig && _this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "native") {
                    _this.showNativeIntersititialAd();
                }
                else {
                    Utils_1.utils.showLog("优先展示小游戏插屏广告!");
                    _this._createMiniGameInsertAd();
                }
            }, delayTime * 1000);
        }
    };
    AdAgentWechat.prototype._createBoxInsertAd = function () {
        Utils_1.utils.rewardCallFunc = null;
        Utils_1.utils.rewardCloseFunc = null;
        if (Utils_1.utils.config && Utils_1.utils.config.otherconfig.beforGameOverRecGamesPanel && Utils_1.utils.getRecommondGameList()) {
            var panel = cc.instantiate(Utils_1.utils.config.otherconfig.beforGameOverRecGamesPanel);
            panel.zIndex = 999999;
            var morePanel = panel.getComponent("BeforGameOverRecGamesPanel");
            cc.director.getScene().addChild(panel);
            morePanel._location = YZ_Constant_1.SubLocation.isBoxInsertAd;
            morePanel.init(Utils_1.utils.getRecommondGameList());
            morePanel.show();
        }
        else {
            Utils_1.utils.showLog("互推插屏展示失败！");
        }
    };
    /**
     * 是否能够显示互推插屏
     */
    AdAgentWechat.prototype.canShowBoxInsertAd = function () {
        var jumpList = Utils_1.utils.getRecommondGameList();
        if (jumpList && jumpList.length > 0) {
            return true;
        }
        return false;
    };
    AdAgentWechat.prototype._createMiniGameInsertAd = function () {
        var _this = this;
        if (this._insertAd) {
            this._insertAd.show().then(function () {
                Utils_1.utils.showLog("插屏广告展示成功!");
                if (_this.isFirstShowInsertAd && Utils_1.utils.getConfigByKey("insert_ad_first_show_active") == "true") {
                    _this.isFirstShowInsertAd = false;
                    Utils_1.utils.wechatTool.reportAttributedEvent(YZ_Constant_1.AttributedType.GameAddiction, YZ_Constant_1.AttributedKey.GameAddiction, YZ_Constant_1.AttributedValue.InsertAdFirstShowAction);
                }
            }).catch(function (err) {
                Utils_1.utils.showLog("插屏广告展示失败!", JSON.stringify(err));
                if (_this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "default") {
                    _this.showNativeIntersititialAd();
                }
                // if (this.ServerConfig && this.ServerConfig.intersititial_first_ad == "default") {
                //     utils.showLog("优先展示默认插屏，显示备选盒子插屏！");
                //     if (this.canShowBoxInsertAd()) {
                //         this._createBoxInsertAd();
                //     }
                // }
            });
        }
        else {
            Utils_1.utils.showLog("插屏广告未初始化");
            if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "default") {
                this.showNativeIntersititialAd();
            }
            // if (this.ServerConfig && this.ServerConfig.intersititial_first_ad == "default") {
            //     utils.showLog("优先展示默认插屏，显示备选盒子插屏！");
            //     if (this.canShowBoxInsertAd()) {
            //         this._createBoxInsertAd();
            //     }
            // }
        }
    };
    AdAgentWechat.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsWechat) {
            this._videoCallback = callback;
            if (this.checkRewardInsertIsShow() && Utils_1.utils.wechatTool
                && Utils_1.utils.wechatTool.ServerConfig
                && Utils_1.utils.wechatTool.ServerConfig.reward_first_ad && Utils_1.utils.wechatTool.ServerConfig.reward_first_ad != "video") {
                Utils_1.utils.showLog("<<<服务器默认优先展示激励插屏>>>");
                this.showRewardInsert();
                return;
            }
            if (!Utils_1.utils.wechatTool.isOverMinVersion("2.0.4")) {
                Utils_1.utils.showLog("当前版本不支持视频广告!");
                if (this._videoCallback) {
                    // this._videoCallback(false, "暂无视频广告!");
                    this.showRewardInsert();
                }
                return;
            }
            if (this._videoAd) {
                this._videoAd.show().then(function () {
                    Utils_1.utils.showLog("视频显示成功！");
                }.bind(this)).catch(function (err) {
                    Utils_1.utils.showLog("视频未加载！");
                    this._videoAd.load();
                    if (this._videoCallback) {
                        // this._videoCallback(false, "暂无视频广告!");
                        this.showRewardInsert();
                    }
                }.bind(this));
            }
            else {
                Utils_1.utils.showLog("视频未初始化!");
                if (this._videoCallback) {
                    // this._videoCallback(false, "暂无视频广告!");
                    this.showRewardInsert();
                }
            }
        }
    };
    /**
     * 验证是否显示激励插屏
     */
    AdAgentWechat.prototype.checkRewardInsertIsShow = function () {
        var jumpList = Utils_1.utils.getRecommondGameList();
        if (Utils_1.utils.isSupportnavigateToMiniGame()) {
            if (Utils_1.utils.wechatTool
                && Utils_1.utils.wechatTool.ServerConfig
                && Utils_1.utils.wechatTool.ServerConfig.is_reward_intersititia) {
                if (Utils_1.utils.wechatTool.ServerConfig.is_reward_intersititia == "true"
                    && jumpList && jumpList.length > 0) {
                    Utils_1.utils.showLog("激励插屏显示环境验证通过！");
                    return true;
                }
                else {
                    cc.warn("is_reward_intersititia 参数为false，激励插屏组件不显示！");
                    return false;
                }
            }
            else {
                cc.warn("配置中没有is_reward_intersititia参数，激励插屏组件组件不显示！");
                return false;
            }
        }
        Utils_1.utils.showLog("当前平台不支持小程序跳转！");
        return false;
    };
    /**
    * 显示激励插屏组件
    */
    AdAgentWechat.prototype.showRewardInsert = function () {
        Utils_1.utils.showLog("show reward");
        if (!this.checkRewardInsertIsShow()) {
            Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(false, "暂无视频广告！");
            Utils_1.utils.adManager.videoCallBack = null;
            return;
        }
        if (((!cc.isValid(this._rewardInsertNode)) || !this._rewardInsertNode) && Utils_1.utils.config.otherconfig.rewardInsert) {
            Utils_1.utils.showLog("创建激励插屏广告");
            this._rewardInsertNode = cc.instantiate(Utils_1.utils.config.otherconfig.rewardInsert);
            this._rewardInsertNode.position = CompatibleTool_1.default.position(cc.winSize.width / 2, cc.winSize.height / 2);
            cc.director.getScene().addChild(this._rewardInsertNode, 9999);
        }
        if (this._rewardInsertNode) {
            var rewardInsert = this._rewardInsertNode.getComponent("RewardInsert");
            if (rewardInsert) {
                rewardInsert.isShow = false;
                Utils_1.utils.showLog("显示激励插屏组件！");
            }
            else {
                Utils_1.utils.showLog("RewardInsert组件不存在!");
            }
        }
        else {
            Utils_1.utils.showLog("激励插屏没有创建！");
        }
    };
    AdAgentWechat.prototype.hideRewardInsert = function () {
        if (this._rewardInsertNode) {
            var rewardInsert = this._rewardInsertNode.getComponent("RewardInsert");
            if (rewardInsert) {
                rewardInsert.hide();
                Utils_1.utils.showLog("隐藏激励插屏组件！");
            }
            else {
                Utils_1.utils.showLog("RewardInsert组件不存在!");
            }
        }
        else {
            Utils_1.utils.showLog("激励插屏没有创建！");
        }
    };
    AdAgentWechat.prototype.ShowCloseBtnBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsWechat) {
            if (Utils_1.utils.wechatTool && !Utils_1.utils.wechatTool.isOverMinVersion("2.0.4")) {
                Utils_1.utils.showLog("当前版本不支持Banner广告!");
                return;
            }
            if (Utils_1.utils.wechatTool.ServerConfig && (!Utils_1.utils.wechatTool.ServerConfig.isMoveBtn || Utils_1.utils.wechatTool.ServerConfig.isMoveBtn != "true")) {
                Utils_1.utils.showLog("服务器没有开启移动按钮，不显示广告！");
                return;
            }
            if (Utils_1.utils.wechatTool && Utils_1.utils.wechatTool.ServerConfig) {
                if (PlatUtils_1.default.IsWechat) {
                    var locationTmp = location;
                    // let argsTmp: any = args;
                    var params = {
                        adUnitId: Utils_1.utils.config.wechatconfig.getBannerId(locationTmp),
                        style: {
                            left: 0,
                            width: 300,
                            top: 0
                        }
                    };
                    if (this._oldBannerLocation != locationTmp && this._curBannerAd) {
                        this._curBannerAd.destroy();
                        this._oldBannerLocation = locationTmp;
                    }
                    //@ts-ignore
                    var curBannerAd_3 = wx.createBannerAd(params);
                    if (curBannerAd_3) {
                        curBannerAd_3.onError(function (err) {
                            Utils_1.utils.showLog("广告条加载失败! ", JSON.stringify(err));
                            if (curBannerAd_3) {
                                curBannerAd_3.destroy();
                            }
                        });
                        var self_4 = this;
                        curBannerAd_3.onLoad(function () {
                            curBannerAd_3.show().then(function () {
                                var old = self_4._curBannerAd;
                                if (old) {
                                    old.destroy();
                                }
                                self_4._curBannerAd = curBannerAd_3;
                                var closeBtn = args.closeBtn;
                                if (!closeBtn) {
                                    return;
                                }
                                // closeBtn.active = true;
                                //调整关闭按钮位置
                                var winHeight = cc.winSize.height;
                                var adY = self_4.getBannerAdHeight();
                                Utils_1.utils.showLog('utils - adY:', adY);
                                if (adY > 0) {
                                    closeBtn.y = -(winHeight / 2 - adY) + closeBtn.height;
                                    Utils_1.utils.showLog("btnClose.y", closeBtn.y);
                                }
                                Utils_1.utils.showLog("关闭按钮---Banner广告显示成功!");
                            }).catch(function (err) {
                                Utils_1.utils.showLog("Banner广告出错", JSON.stringify(err));
                                if (curBannerAd_3) {
                                    curBannerAd_3.destroy();
                                }
                            });
                        });
                        curBannerAd_3.onResize(function (res) {
                            curBannerAd_3.style.width = Utils_1.utils.wechatTool.getSystemInfo().screenWidth * 0.6;
                            curBannerAd_3.style.left = (Utils_1.utils.wechatTool.getSystemInfo().screenWidth - res.width) * 0.5;
                            // if (self._bannerBottom == cc.winSize.height) {
                            //     curBannerAd.style.top = 0;
                            // } else {
                            curBannerAd_3.style.top = Utils_1.utils.wechatTool.getSystemInfo().screenHeight - res.height;
                            // }
                        });
                    }
                    else {
                        Utils_1.utils.showLog("广告条创建失败!");
                    }
                }
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    /**
  * 是否能显示6个元素的交叉推广组件
  */
    AdAgentWechat.prototype.canShowCrossWidget6 = function () {
        if (PlatUtils_1.default.IsWechat) {
            if (Utils_1.utils.isSupportnavigateToMiniGame()) {
                return true;
            }
            else {
                cc.warn("当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
                return false;
            }
        }
    };
    /**
    * 显示6元素交叉推广组件
    */
    AdAgentWechat.prototype.showCrossWidget6 = function () {
        if (this.canShowCrossWidget6()) {
            if (Utils_1.utils.config.otherconfig.crossWidget6) {
                return cc.instantiate(Utils_1.utils.config.otherconfig.crossWidget6);
            }
            else {
                Utils_1.utils.showLog("未找到预制体 CrossWidget6, 请查看CommonUtils组件上是否赋值！");
            }
        }
        return null;
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentWechat.prototype.showStatementAds = function (data) {
        var result = { "type": 0, "node": null };
        var node = null;
        this.ShowInterstitial();
        if (Utils_1.utils.canShowCrossWidget6()) {
            Utils_1.utils.showLog("服务器配置显示6个互推组件");
            node = this.showCrossWidget6();
            result.type = 1;
            result.node = node;
            return result;
        }
        return result;
        // if (this.ServerConfig && this.ServerConfig.statement_type) {
        //     // let type = this.ServerConfig.statement_type;
        //     let node: cc.Node = null;
        //     let resType: number = 0;
        //     this.ShowInterstitial();
        //     if (this.canShowCrossWidget6()) {
        //         node = this.showCrossWidget6();
        //         resType = 1;
        //     }
        //     // switch (type) {
        //     //     case 1:
        //     //         utils.showLog("结算广告 >> 只显示小游戏插屏广告");
        //     //         this.ShowInterstitial();
        //     //         break;
        //     //     case 2:
        //     //         utils.showLog("结算广告 >> 只显示6个互推广告");
        //     //         node = this.showCrossWidget6();
        //     //         resType = 1;
        //     //         break;
        //     //     case 3:
        //     //         utils.showLog("结算广告 >> 显示插屏广告+6个互推");
        //     //         this.ShowInterstitial();
        //     //         node = this.showCrossWidget6();
        //     //         resType = 1;
        //     //         break;
        //     //     default:
        //     //         utils.showLog("非法的结算广告类型，：", type)
        //     //         break;
        //     // }
        //     result.type = resType;
        //     result.node = node;
        //     return result;
        // } else {
        //     cc.warn("配置未初始化！");
        //     return result;
        // }
    };
    /**
     * 获取banner广告高度
     */
    AdAgentWechat.prototype.getBannerAdHeight = function () {
        if (this._curBannerAd) {
            var i = this._curBannerAd.style.realHeight * 2;
            if (i === null || i === undefined || isNaN(i)) {
                return 0;
            }
            else {
                return i;
            }
        }
        return 0;
    };
    AdAgentWechat.prototype.showNativeTryGameWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!Utils_1.utils.wechatTool.isOverMinVersion("2.11.1")) {
            Utils_1.utils.showLog("当前版本不支持原生广告!");
            return;
        }
        if (!this.ServerConfig) {
            Utils_1.utils.showLog("组件未初始化！");
            return;
        }
        if (!Utils_1.utils.config.wechatconfig.bannerBoxId) {
            Utils_1.utils.showLog("原生广告ID不存在");
            return;
        }
        var top = 0;
        var left = 0;
        if (params.top) {
            top = params.top / cc.winSize.height * this.sysInfo.screenHeight;
        }
        else {
            top = this.sysInfo.screenHeight - 112 - params.bottom / cc.winSize.height * this.sysInfo.screenHeight;
        }
        if (params.left) {
            left = params.left / cc.winSize.width * this.sysInfo.screenWidth;
        }
        else if (params.right) {
            left = this.sysInfo.screenWidth - 70 - params.right / cc.winSize.width * this.sysInfo.screenWidth;
        }
        //@ts-ignore
        var customAd = wx.createCustomAd({
            // adUnitId: utils.config.wechatconfig.bannerBoxId,
            adUnitId: Utils_1.utils.config.wechatconfig.bannerBoxId,
            adIntervals: 30,
            style: {
                left: left,
                top: top
            }
        });
        customAd.onError(function (erro) {
            Utils_1.utils.showLog("原生广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            if (params.onError) {
                Utils_1.utils.showLog("执行微信原生广告异常回调！");
                params.onError();
            }
        });
        customAd.onLoad(function () {
            Utils_1.utils.showLog("微信原生广告加载成功！");
            customAd.show().then(function () {
                if (params.onSuccess) {
                    Utils_1.utils.showLog("执行微信原生广告显示成功回调！");
                    params.onSuccess();
                }
                Utils_1.utils.showLog("微信原生广告显示成功！");
            }).catch(function (err) {
                Utils_1.utils.showLog("微信原生广告显示失败！");
            });
        });
        this._customAdObjs.push(customAd);
    };
    AdAgentWechat.prototype.showCustomAd = function (params) {
        if (params === void 0) { params = null; }
        if (!Utils_1.utils.wechatTool.isOverMinVersion("2.11.1")) {
            Utils_1.utils.showLog("当前版本不支持原生模版广告!");
            return;
        }
        if (!this.ServerConfig) {
            Utils_1.utils.showLog("组件未初始化！");
            return;
        }
        if (Utils_1.utils.config.wechatconfig.customAdInfos.length < 1) {
            Utils_1.utils.showLog("原生广告配置不存在");
            return;
        }
        var customAdInfo = Utils_1.utils.config.wechatconfig.getCustomAdInfoInfo(params.location);
        if (!customAdInfo) {
            Utils_1.utils.showLog("当前位置未配置模版广告！");
            return;
        }
        // utils.showLog("显示原生模版广告：位置：" + params.location + "，配置:" + customAdInfo.toStrong);
        var top = 0;
        var left = 0;
        //   about：左右居中
        //   updown:上下
        //   all:上下和左右居中
        //  false:自定义对齐方式
        if (customAdInfo.is_center == "false") {
            if (customAdInfo.top > -1) {
                top = customAdInfo.top / cc.winSize.height * this.sysInfo.screenHeight;
            }
            else {
                top = this.sysInfo.screenHeight - customAdInfo.height - customAdInfo.bottom / cc.winSize.height * this.sysInfo.screenHeight;
            }
            if (customAdInfo.left > -1) {
                left = customAdInfo.left / cc.winSize.width * this.sysInfo.screenWidth;
            }
            else {
                left = this.sysInfo.screenWidth - customAdInfo.width - customAdInfo.right / cc.winSize.width * this.sysInfo.screenWidth;
            }
        }
        else if (customAdInfo.is_center == "updown") {
            Utils_1.utils.showLog("原生模版上下居中对齐！");
            if (customAdInfo.left > -1) {
                left = customAdInfo.left / cc.winSize.width * this.sysInfo.screenWidth;
            }
            else {
                left = this.sysInfo.screenWidth - customAdInfo.width - customAdInfo.right / cc.winSize.width * this.sysInfo.screenWidth;
            }
            top = (this.sysInfo.screenHeight - customAdInfo.height) / 2;
        }
        else if (customAdInfo.is_center == "about") {
            Utils_1.utils.showLog("原生模版左右居中对齐！");
            left = (this.sysInfo.screenWidth - customAdInfo.width) / 2;
            if (customAdInfo.top > -1) {
                top = customAdInfo.top / cc.winSize.height * this.sysInfo.screenHeight;
            }
            else {
                top = this.sysInfo.screenHeight - customAdInfo.height - customAdInfo.bottom / cc.winSize.height * this.sysInfo.screenHeight;
            }
        }
        else {
            Utils_1.utils.showLog("原生模版上下左右居中对齐！");
            left = (this.sysInfo.screenWidth - customAdInfo.width) / 2;
            top = (this.sysInfo.screenHeight - customAdInfo.height) / 2;
        }
        //@ts-ignore
        var customAd = wx.createCustomAd({
            adUnitId: customAdInfo.id,
            adIntervals: customAdInfo.refresh_time,
            style: {
                left: left,
                top: top,
                width: customAdInfo.width
            }
        });
        customAd.location = params.location;
        Utils_1.utils.showLog("customAd style left=" + left + ",top=" + top + ";  screenWidth=" + this.sysInfo.screenWidth + ", screenHeight=" + this.sysInfo.screenHeight);
        customAd.onError(function (erro) {
            Utils_1.utils.showLog("原生广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            if (params.onError) {
                Utils_1.utils.showLog("执行微信原生广告异常回调！");
                params.onError();
            }
        });
        customAd.onLoad(function () {
            Utils_1.utils.showLog("微信原生广告加载成功！");
            customAd.show().then(function () {
                if (params.onSuccess) {
                    Utils_1.utils.showLog("执行微信原生广告显示成功回调！");
                    params.onSuccess();
                }
                Utils_1.utils.showLog("微信原生广告显示成功！");
            }).catch(function (err) {
                Utils_1.utils.showLog("微信原生广告显示失败！");
            });
        });
        this._customAdObjs.push(customAd);
    };
    /**
     * 隐藏原生模版广告
     */
    AdAgentWechat.prototype.hideCustomAd = function (params) {
        for (var i = 0; i < this._customAdObjs.length; i++) {
            if (this._customAdObjs[i]) {
                if (params && "location" in params) {
                    if (this._customAdObjs[i].location == params.location) {
                        Utils_1.utils.showLog("隐藏位置：" + params.location + "的原生模版广告");
                        this._customAdObjs[i].destroy();
                        this._customAdObjs.splice(i, 1);
                    }
                }
                else {
                    this._customAdObjs[i].destroy();
                    this._customAdObjs.splice(i, 1);
                }
            }
        }
        if (!params || !("location" in params))
            Utils_1.utils.showLog("隐藏所有位置的原生模版广告");
    };
    /**
     * 隐藏原生试玩广告
     */
    AdAgentWechat.prototype.hideNativeTryGameWidget = function () {
        for (var i = 0; i < this._customAdObjs.length; i++) {
            if (this._customAdObjs[i]) {
                this._customAdObjs[i].destroy();
            }
        }
        for (var i = 0; i < this._customAdObjs.length; i++) {
            this._customAdObjs.splice(i, 1);
        }
    };
    AdAgentWechat.prototype.showNativeBannerAd = function (location, args) {
        var _this = this;
        if (args === void 0) { args = null; }
        Utils_1.utils.showLog("展示原生banner广告!");
        if (!Utils_1.utils.wechatTool.isOverMinVersion("2.11.1")) {
            Utils_1.utils.showLog("当前版本不支持原生模版广告!");
            return;
        }
        if (!this.ServerConfig) {
            Utils_1.utils.showLog("组件未初始化！");
            return;
        }
        if (!Utils_1.utils.config.wechatconfig.nativeBannerId) {
            Utils_1.utils.showLog("原生Banner广告ID配置不存在");
            return;
        }
        var bannerWidth = 325;
        var bannerHeight = 100;
        var left = (this.sysInfo.screenWidth - bannerWidth) / 2;
        var top = this.sysInfo.screenHeight - bannerHeight;
        if (this.nativeBannerAd) {
            if (this.nativeBannerAd.isShow()) {
                Utils_1.utils.showLog("原生Banner正在显示，不重新创建！");
            }
            else {
                this.nativeBannerAd.show().then(function () {
                    Utils_1.utils.showLog("原生Banner广告显示成功！");
                    _this.HideDefaultBanner();
                }).catch(function (err) {
                    Utils_1.utils.showLog("原生Banner广告显示失败！");
                    _this.nativeBannerAd && _this.nativeBannerAd.destroy();
                    _this.nativeBannerAd = null;
                    if (_this.ServerConfig.banner_first_ad && _this.ServerConfig.banner_first_ad == "native") {
                        _this._createBanner(location, args);
                    }
                });
            }
            return;
        }
        //@ts-ignore
        var customAd = wx.createCustomAd({
            adUnitId: Utils_1.utils.config.wechatconfig.nativeBannerId,
            adIntervals: Utils_1.utils.wechatTool.ServerConfig.refresh_ad_time || 30,
            style: {
                left: left,
                top: top,
                width: bannerWidth
            }
        });
        Utils_1.utils.showLog("native nanner ad style left=" + left + ",top=" + top + ";  screenWidth=" + this.sysInfo.screenWidth + ", screenHeight=" + this.sysInfo.screenHeight);
        customAd.onError(function (erro) {
            Utils_1.utils.showLog("原生Banner广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            _this.nativeBannerAd && _this.nativeBannerAd.destroy();
            _this.nativeBannerAd = null;
            if (_this.ServerConfig.banner_first_ad && _this.ServerConfig.banner_first_ad == "native") {
                _this._createBanner(location, args);
            }
        });
        customAd.onLoad(function () {
            Utils_1.utils.showLog("原生Banner广告加载成功！");
            customAd.show().then(function () {
                _this.nativeBannerAd && _this.nativeBannerAd.destroy();
                _this.nativeBannerAd = customAd;
                Utils_1.utils.showLog("原生Banner广告显示成功！");
                _this.HideDefaultBanner();
            }).catch(function (err) {
                Utils_1.utils.showLog("原生Banner广告显示失败！");
                _this.nativeBannerAd && _this.nativeBannerAd.destroy();
                _this.nativeBannerAd = null;
                if (_this.ServerConfig.banner_first_ad && _this.ServerConfig.banner_first_ad == "native") {
                    _this._createBanner(location, args);
                }
            });
        });
    };
    AdAgentWechat.prototype.showNativeIntersititialAd = function () {
        var _this = this;
        Utils_1.utils.showLog("展示原生插屏广告!");
        if (!Utils_1.utils.wechatTool.isOverMinVersion("2.11.1")) {
            Utils_1.utils.showLog("当前版本不支持原生模版广告!");
            return;
        }
        if (!this.ServerConfig) {
            Utils_1.utils.showLog("组件未初始化！");
            return;
        }
        if (!Utils_1.utils.config.wechatconfig.nativeInsertIds) {
            Utils_1.utils.showLog("原生插屏广告ID配置不存在");
            return;
        }
        var insertWidth = 345;
        var insertHeight = 420;
        if (cc.winSize.width > cc.winSize.height) {
            insertHeight = 300;
        }
        var left = (this.sysInfo.screenWidth - insertWidth) / 2;
        var top = (this.sysInfo.screenHeight - insertHeight) / 2;
        if (this.nativeIntersititialAd) {
            if (this.nativeIntersititialAd.isShow()) {
                Utils_1.utils.showLog("原生插屏正在显示，不重新创建！");
            }
            else {
                this.nativeIntersititialAd.show().then(function () {
                    Utils_1.utils.showLog("原生插屏广告显示成功！");
                }).catch(function (err) {
                    Utils_1.utils.showLog("原生插屏广告显示失败！");
                    _this.nativeIntersititialAd && _this.nativeIntersititialAd.destroy();
                    _this.nativeIntersititialAd = null;
                    if (_this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "native") {
                        _this._createMiniGameInsertAd();
                    }
                });
            }
            return;
        }
        //@ts-ignore
        var customAd = wx.createCustomAd({
            adUnitId: Utils_1.utils.config.wechatconfig.nativeInsertIds,
            adIntervals: 60,
            style: {
                left: left,
                top: top,
                width: insertWidth
            }
        });
        Utils_1.utils.showLog("native insert ad style left=" + left + ",top=" + top + ";  screenWidth=" + this.sysInfo.screenWidth + ", screenHeight=" + this.sysInfo.screenHeight);
        customAd.onError(function (erro) {
            Utils_1.utils.showLog("原生插屏广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            _this.nativeIntersititialAd && _this.nativeIntersititialAd.destroy();
            _this.nativeIntersititialAd = null;
            if (_this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "native") {
                _this._createMiniGameInsertAd();
            }
        });
        customAd.onLoad(function () {
            Utils_1.utils.showLog("原生插屏广告加载成功！");
            customAd.show().then(function () {
                _this.nativeIntersititialAd && _this.nativeIntersititialAd.destroy();
                _this.nativeIntersititialAd = customAd;
                Utils_1.utils.showLog("原生插屏广告显示成功！");
            }).catch(function (err) {
                Utils_1.utils.showLog("原生插屏广告显示失败！");
                _this.nativeIntersititialAd && _this.nativeIntersititialAd.destroy();
                _this.nativeIntersititialAd = null;
                if (_this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "native") {
                    _this._createMiniGameInsertAd();
                }
            });
        });
    };
    AdAgentWechat = __decorate([
        ccclass
    ], AdAgentWechat);
    return AdAgentWechat;
}(AdAgent_1.default));
exports.default = AdAgentWechat;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFdlY2hhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNkNBQTRHO0FBQzVHLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFFaEMsbURBQThDO0FBSXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBMHBDQztRQXhwQ0csa0JBQVksR0FBUSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLHVCQUFpQixHQUFZLElBQUksQ0FBQztRQUtsQyxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBK0VyQix3QkFBa0IsR0FBVyxHQUFHLENBQUM7UUFDakMsbUJBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsd0JBQWtCLEdBQW1CLDRCQUFjLENBQUMsSUFBSSxDQUFDO1FBdU96RCx3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFpSC9CLHlCQUFtQixHQUFZLElBQUksQ0FBQyxDQUFDLFFBQVE7UUE2VzdDLG1CQUFhLEdBQVUsRUFBRSxDQUFDO1FBb0UxQix5QkFBbUIsR0FBVSxFQUFFLENBQUM7UUFpSmhDLG9CQUFjLEdBQVEsSUFBSSxDQUFDO1FBbUYzQiwyQkFBcUIsR0FBUSxJQUFJLENBQUM7O0lBaUZ0QyxDQUFDO0lBbnBDRyxzQkFBVyx1Q0FBWTthQUF2QjtZQUNJLE9BQU8sYUFBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxrQ0FBTzthQUFsQjtZQUNJLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxJ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Q0FBQztnQkFDbEMsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLElBQUksUUFBUSxFQUFFO29CQUNsRyxLQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztpQkFDbEM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQXpwQ2dCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwcENqQztJQUFELG9CQUFDO0NBMXBDRCxBQTBwQ0MsQ0ExcEMwQyxpQkFBTyxHQTBwQ2pEO2tCQTFwQ29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZWRLZXksIEF0dHJpYnV0ZWRUeXBlLCBBdHRyaWJ1dGVkVmFsdWUsIEJhbm5lckxvY2F0aW9uLCBTdWJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFJld2FyZEluc2VydCBmcm9tIFwiLi9SZXdhcmRJbnNlcnRcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcbmltcG9ydCBCZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbCBmcm9tIFwiLi9CZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbFwiO1xyXG5pbXBvcnQgeyBDdXN0b21BZEluZm8gfSBmcm9tIFwiLi9Db21tb25Db25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50V2VjaGF0IGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgX2N1ckJhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX2luc2VydEFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3Jld2FyZEluc2VydE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIF9zeXNJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBzeXNJbmZvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zeXNJbmZvKSByZXR1cm4gdGhpcy5fc3lzSW5mbztcclxuICAgICAgICB0aGlzLl9zeXNJbmZvID0gdXRpbHMud2VjaGF0VG9vbC5nZXRTeXN0ZW1JbmZvKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0luZm87XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmdldENvbmZpZ0J5S2V5KFwiZ2FtZV90aW1lX3JlcG9ydFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLndlY2hhdFRvb2wucmVwb3J0QXR0cmlidXRlZEV2ZW50KEF0dHJpYnV0ZWRUeXBlLkdhbWVBZGRpY3Rpb24sIEF0dHJpYnV0ZWRLZXkuR2FtZUFkZGljdGlvbiwgQXR0cmlidXRlZFZhbHVlLkdhbWVUaW1lQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB1dGlscy5nZXRDb25maWdCeUtleShcImdhbWVfdGltZV9yZXBvcnRcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRWaWRlb0FkKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy53ZWNoYXRUb29sLmlzT3Zlck1pblZlcnNpb24oXCIyLjAuNFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yid5aeL5YyW6KeG6aKRIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy52aWRlb0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikUlE6YWN572u6ZSZ6K+vIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeW5v+WRiklEOlwiLCB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLnZpZGVvSWQudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZCA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcudmlkZW9JZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yid5aeL5YyW5rOo5YaM6KeG6aKR5Zue6LCDIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcihmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3lpLHotKUhXCIsIGVyci5jb2RlLCBlcnIubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5faXNWaWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZShmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmv4DlirHop4bpopHlub/lkYrlrozmiJDvvIzlj5HmlL7lpZblirEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9DYWxsYmFjayh0cnVlLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR5bm/5ZGK5Y+W5raI5YWz6Zet77yM5LiN5Y+R5pS+5aWW5YqxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeC55yL5a6M6KeG6aKR5omN6IO96I635b6X5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliJ3lp4vljJblpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9iYW5uZXJTaXplUGVyY2VudDogbnVtYmVyID0gMC4xO1xyXG4gICAgX2Jhbm5lckJvdHRvbTogbnVtYmVyID0gMDtcclxuICAgIF9vbGRCYW5uZXJMb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ob25lO1xyXG4gICAgX2NyZWF0ZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24sIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGxldCBsb2NhdGlvblRtcDogQmFubmVyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgbGV0IGFyZ3NUbXA6IGFueSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJnc1RtcCAmJiBhcmdzVG1wLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9IGFyZ3NUbXAud2lkdGggPCAwID8gMCA6IGFyZ3NUbXAud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9IGFyZ3NUbXAud2lkdGggPiAxID8gMSA6IGFyZ3NUbXAud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzVG1wICYmIGFyZ3NUbXAuYm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSBhcmdzVG1wLmJvdHRvbSA8IDAgPyAwIDogYXJnc1RtcC5ib3R0b207XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSBhcmdzVG1wLmJvdHRvbSA+IGNjLndpblNpemUuaGVpZ2h0ID8gY2Mud2luU2l6ZS5oZWlnaHQgOiBhcmdzVG1wLmJvdHRvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuZ2V0QmFubmVySWQobG9jYXRpb25UbXApLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fb2xkQmFubmVyTG9jYXRpb24gIT0gbG9jYXRpb25UbXAgJiYgdGhpcy5fY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckJhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29sZEJhbm5lckxvY2F0aW9uID0gbG9jYXRpb25UbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCBjdXJCYW5uZXJBZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmIChjdXJCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgY3VyQmFubmVyQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW5v+WRiuadoeWKoOi9veWksei0pSEgXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZUJhbm5lckFkKGxvY2F0aW9uLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZCA9IHNlbGYuX2N1ckJhbm5lckFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2N1ckJhbm5lckFkID0gY3VyQmFubmVyQWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpu5jorqRCYW5uZXLlub/lkYrmmL7npLrmiJDlip8hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVOYXRpdmVCYW5uZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiQmFubmVy5bm/5ZGK5Ye66ZSZXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkICYmIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlQmFubmVyQWQobG9jYXRpb24sIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5vblJlc2l6ZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyQmFubmVyQWQuc3R5bGUud2lkdGggPSB1dGlscy53ZWNoYXRUb29sLmdldFN5c3RlbUluZm8oKS5zY3JlZW5XaWR0aCAqIHNlbGYuX2Jhbm5lclNpemVQZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLnN0eWxlLmxlZnQgPSAodXRpbHMud2VjaGF0VG9vbC5nZXRTeXN0ZW1JbmZvKCkuc2NyZWVuV2lkdGggLSByZXMud2lkdGgpICogMC41O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fYmFubmVyQm90dG9tID09IGNjLndpblNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQmFubmVyQWQuc3R5bGUudG9wID0gdXRpbHMud2VjaGF0VG9vbC5nZXRTeXN0ZW1JbmZvKCkuc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodCAtIHNlbGYuX2Jhbm5lckJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrmnaHliJvlu7rlpLHotKUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUN1c3RvbUFEQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkdhbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbG9jYXRpb25UbXA6IEJhbm5lckxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5nZXRCYW5uZXJJZChsb2NhdGlvblRtcCkpIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uVG1wID0gQmFubmVyTG9jYXRpb24uSG9tZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFyZ3NUbXA6IGFueSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJnc1RtcCAmJiBhcmdzVG1wLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9IGFyZ3NUbXAud2lkdGggPCAwID8gMCA6IGFyZ3NUbXAud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9IGFyZ3NUbXAud2lkdGggPiAxID8gMSA6IGFyZ3NUbXAud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzVG1wICYmIGFyZ3NUbXAuYm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSBhcmdzVG1wLmJvdHRvbSA8IDAgPyAwIDogYXJnc1RtcC5ib3R0b207XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSBhcmdzVG1wLmJvdHRvbSA+IGNjLndpblNpemUuaGVpZ2h0ID8gY2Mud2luU2l6ZS5oZWlnaHQgOiBhcmdzVG1wLmJvdHRvbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmdldEJhbm5lcklkKGxvY2F0aW9uVG1wKSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX29sZEJhbm5lckxvY2F0aW9uICE9IGxvY2F0aW9uVG1wICYmIHRoaXMuX2N1ckJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbGRCYW5uZXJMb2NhdGlvbiA9IGxvY2F0aW9uVG1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsZXQgY3VyQmFubmVyQWQgPSB3eC5jcmVhdGVCYW5uZXJBZChwYXJhbXMpO1xyXG4gICAgICAgICAgICBpZiAoY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrmnaHliqDovb3lpLHotKUhIFwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oXCJDbG9zZUN1c3RvbUFEUGFuZWxcIiwgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQmFubmVyQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZCA9IHNlbGYuX2N1ckJhbm5lckFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jdXJCYW5uZXJBZCA9IGN1ckJhbm5lckFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkJhbm5lcuW5v+WRiuaYvuekuuaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IDE4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsID0gdXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3Nob3dCYW5uZXJUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOaYvuekukJhbm5lcuW5v+WRiu+8gWxvY2F0aW9uOiR7bG9jYXRpb25UbXB9OyBhcmdzOiR7SlNPTi5zdHJpbmdpZnkoYXJnc1RtcCl9OyDpl7TpmpTml7bpl7Q6JHt1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5yZWZyZXNoX2FkX3RpbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hvd0Jhbm5lclRpbWVyKGxvY2F0aW9uVG1wLCBhcmdzVG1wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZChzZWxmKSwgaW50ZXJ2YWwgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJCYW5uZXLlub/lkYrlh7rplJlcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci50YXJnZXRPZmYoc2VsZik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyQmFubmVyQWQub25SZXNpemUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLnN0eWxlLndpZHRoID0gdXRpbHMud2VjaGF0VG9vbC5nZXRTeXN0ZW1JbmZvKCkuc2NyZWVuV2lkdGggKiBzZWxmLl9iYW5uZXJTaXplUGVyY2VudDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5zdHlsZS5sZWZ0ID0gKHV0aWxzLndlY2hhdFRvb2wuZ2V0U3lzdGVtSW5mbygpLnNjcmVlbldpZHRoIC0gcmVzLndpZHRoKSAqIDAuNTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX2Jhbm5lckJvdHRvbSA9PSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLnN0eWxlLnRvcCA9IHV0aWxzLndlY2hhdFRvb2wuZ2V0U3lzdGVtSW5mbygpLnNjcmVlbkhlaWdodCAtIHJlcy5oZWlnaHQgLSBzZWxmLl9iYW5uZXJCb3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm/5ZGK5p2h5Yib5bu65aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaW5pdEluc2VydEFkKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy53ZWNoYXRUb29sLmlzT3Zlck1pblZlcnNpb24oXCIyLjYuMFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeaPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJbmj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmluc2VydElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaPkuWxj+W5v+WRiklE6YWN572u6ZSZ6K+vIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGKSUQ6XCIsIHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuaW5zZXJ0SWQudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQgPSB3eC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuaW5zZXJ0SWQudHJpbSgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5vbkxvYWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5ouJ5Y+W5oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrmi4nlj5blpLHotKUhXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOYXRpdmVJbnRlcnNpdGl0aWFsQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaPkuWxj+W5v+WRiuiiq+WFs+mXrSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/nu4Tku7bliJ3lp4vljJblpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93QmFubmVyVGltZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBhcmdzOiBhbnkpIHtcclxuICAgICAgICBsZXQgbG9jYXRpb25UbXA6IEJhbm5lckxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgbGV0IGFyZ3NUbXA6IGFueSA9IGFyZ3M7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhg5pi+56S6QmFubmVy5bm/5ZGKeHh477yBbG9jYXRpb246JHtsb2NhdGlvblRtcH07IGFyZ3M6JHtKU09OLnN0cmluZ2lmeShhcmdzVG1wKX07IOmXtOmalOaXtumXtDoke3V0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZX075LyY5YWI57qn77yaJHt0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWR9YCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlQmFubmVyQWQobG9jYXRpb24sIGFyZ3MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvblRtcCA9PSBCYW5uZXJMb2NhdGlvbi5Ob25lKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyq5a6a5LmJ55qEQmFubmVyTG9jYXRpb24sXCIsIGxvY2F0aW9uVG1wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmdldEJhbm5lcklkKGxvY2F0aW9uVG1wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUJhbm5lcihsb2NhdGlvblRtcCwgYXJnc1RtcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOacquaJvuWIsOS9jee9ruS4uiAke2xvY2F0aW9uVG1wfSDnmoTlub/lkYpJRCFgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVCYW5uZXIoQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnc1RtcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcklkOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIFNob3dCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy53ZWNoYXRUb29sLmlzT3Zlck1pblZlcnNpb24oXCIyLjAuNFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgUJhbm5lcuW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uVG1wOiBCYW5uZXJMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZ3NUbXA6IGFueSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0Jhbm5lclRpbWVyKGxvY2F0aW9uVG1wLCBhcmdzVG1wKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IDE4O1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVydmFsID0gdXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOaYvuekukJhbm5lcuW5v+WRiu+8gWxvY2F0aW9uOiR7bG9jYXRpb25UbXB9OyBhcmdzOiR7SlNPTi5zdHJpbmdpZnkoYXJnc1RtcCl9OyDpl7TpmpTml7bpl7Q6JHt1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5yZWZyZXNoX2FkX3RpbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0Jhbm5lclRpbWVyKGxvY2F0aW9uVG1wLCBhcmdzVG1wKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgaW50ZXJ2YWwgKiAxMDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpmpDol4/lub/lkYrmnaFcIik7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5IaWRlRGVmYXVsdEJhbm5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLkhpZGVOYXRpdmVCYW5uZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgSGlkZURlZmF1bHRCYW5uZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3VyQmFubmVyQWQgJiYgdGhpcy5fY3VyQmFubmVyQWQuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSGlkZU5hdGl2ZUJhbm5lcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUJhbm5lckFkICYmIHRoaXMubmF0aXZlQmFubmVyQWQuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgU2hvd0ludGVyc3RpdGlhbChsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLndlY2hhdFRvb2wuaXNPdmVyTWluVmVyc2lvbihcIjIuNi4wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pys5LiN5pSv5oyB5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGVsYXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAodXRpbHMud2VjaGF0VG9vbFxyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWdcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGF5VGltZSA9IHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOaPkuWxj+W5v+WRiuW7tuaXtuWxleekuu+8gSBkZWxheVRpbWU6JHtkZWxheVRpbWV956eSYCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiYm94XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S655uS5a2Q5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5TaG93Qm94SW5zZXJ0QWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVCb3hJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnm5LlrZDmj5LlsY/lub/lkYrlsZXnpLrlpLHotKXvvIzlsZXnpLrpu5jorqTmj5LlsY8hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZyAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkICYmIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZUludGVyc2l0aXRpYWxBZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBkZWxheVRpbWUgKiAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9jcmVhdGVCb3hJbnNlcnRBZCgpIHtcclxuICAgICAgICB1dGlscy5yZXdhcmRDYWxsRnVuYyA9IG51bGw7XHJcbiAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5iZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbCAmJiB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpKSB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5iZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbCk7XHJcbiAgICAgICAgICAgIHBhbmVsLnpJbmRleCA9IDk5OTk5OTtcclxuICAgICAgICAgICAgbGV0IG1vcmVQYW5lbDogQmVmb3JHYW1lT3ZlclJlY0dhbWVzUGFuZWwgPSBwYW5lbC5nZXRDb21wb25lbnQoXCJCZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbFwiKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChwYW5lbCk7XHJcbiAgICAgICAgICAgIG1vcmVQYW5lbC5fbG9jYXRpb24gPSBTdWJMb2NhdGlvbi5pc0JveEluc2VydEFkO1xyXG4gICAgICAgICAgICBtb3JlUGFuZWwuaW5pdCh1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpKTtcclxuICAgICAgICAgICAgbW9yZVBhbmVsLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LqS5o6o5o+S5bGP5bGV56S65aSx6LSl77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm6IO95aSf5pi+56S65LqS5o6o5o+S5bGPXHJcbiAgICAgKi9cclxuICAgIGNhblNob3dCb3hJbnNlcnRBZCgpIHtcclxuICAgICAgICBsZXQganVtcExpc3Q6IGFueSA9IHV0aWxzLmdldFJlY29tbW9uZEdhbWVMaXN0KCk7XHJcbiAgICAgICAgaWYgKGp1bXBMaXN0ICYmIGp1bXBMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpcnN0U2hvd0luc2VydEFkOiBib29sZWFuID0gdHJ1ZTsgLy/pppbmrKHlsZXnpLrlub/lkYpcclxuXHJcblxyXG4gICAgX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc2VydEFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc2VydEFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrlsZXnpLrmiJDlip8hXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFNob3dJbnNlcnRBZCAmJiB1dGlscy5nZXRDb25maWdCeUtleShcImluc2VydF9hZF9maXJzdF9zaG93X2FjdGl2ZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNGaXJzdFNob3dJbnNlcnRBZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLndlY2hhdFRvb2wucmVwb3J0QXR0cmlidXRlZEV2ZW50KEF0dHJpYnV0ZWRUeXBlLkdhbWVBZGRpY3Rpb24sIEF0dHJpYnV0ZWRLZXkuR2FtZUFkZGljdGlvbiwgQXR0cmlidXRlZFZhbHVlLkluc2VydEFkRmlyc3RTaG93QWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrlsZXnpLrlpLHotKUhXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZUludGVyc2l0aXRpYWxBZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuU2VydmVyQ29uZmlnICYmIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S66buY6K6k5o+S5bGP77yM5pi+56S65aSH6YCJ55uS5a2Q5o+S5bGP77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmNhblNob3dCb3hJbnNlcnRBZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuX2NyZWF0ZUJveEluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5pyq5Yid5aeL5YyWXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOYXRpdmVJbnRlcnNpdGl0aWFsQWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuum7mOiupOaPkuWxj++8jOaYvuekuuWkh+mAieebkuWtkOaPkuWxj++8gVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmNhblNob3dCb3hJbnNlcnRBZCgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5fY3JlYXRlQm94SW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja1Jld2FyZEluc2VydElzU2hvdygpICYmIHV0aWxzLndlY2hhdFRvb2xcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5yZXdhcmRfZmlyc3RfYWQgJiYgdXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWcucmV3YXJkX2ZpcnN0X2FkICE9IFwidmlkZW9cIikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIjw8POacjeWKoeWZqOm7mOiupOS8mOWFiOWxleekuua/gOWKseaPkuWxjz4+PlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jld2FyZEluc2VydCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLndlY2hhdFRvb2wuaXNPdmVyTWluVmVyc2lvbihcIjIuMC40XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pys5LiN5pSv5oyB6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jld2FyZEluc2VydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5zaG93KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopHmnKrliqDovb3vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXdhcmRJbnNlcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXdhcmRJbnNlcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HmmK/lkKbmmL7npLrmv4DlirHmj5LlsY9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja1Jld2FyZEluc2VydElzU2hvdygpIHtcclxuICAgICAgICBsZXQganVtcExpc3QgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMud2VjaGF0VG9vbFxyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWdcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLmlzX3Jld2FyZF9pbnRlcnNpdGl0aWEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5pc19yZXdhcmRfaW50ZXJzaXRpdGlhID09IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgJiYganVtcExpc3QgJiYganVtcExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHmj5LlsY/mmL7npLrnjq/looPpqozor4HpgJrov4fvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJpc19yZXdhcmRfaW50ZXJzaXRpdGlhIOWPguaVsOS4umZhbHNl77yM5r+A5Yqx5o+S5bGP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCLphY3nva7kuK3msqHmnIlpc19yZXdhcmRfaW50ZXJzaXRpdGlh5Y+C5pWw77yM5r+A5Yqx5o+S5bGP57uE5Lu257uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DkuI3mlK/mjIHlsI/nqIvluo/ot7PovazvvIFcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLrmv4DlirHmj5LlsY/nu4Tku7ZcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1Jld2FyZEluc2VydCgpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwic2hvdyByZXdhcmRcIik7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUmV3YXJkSW5zZXJ0SXNTaG93KCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2sgJiYgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIudmlkZW9DYWxsQmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoKCghY2MuaXNWYWxpZCh0aGlzLl9yZXdhcmRJbnNlcnROb2RlKSkgfHwgIXRoaXMuX3Jld2FyZEluc2VydE5vZGUpICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZXdhcmRJbnNlcnQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uua/gOWKseaPkuWxj+W5v+WRilwiKTtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZXdhcmRJbnNlcnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRJbnNlcnROb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZSwgOTk5OSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Jld2FyZEluc2VydE5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IHJld2FyZEluc2VydDogUmV3YXJkSW5zZXJ0ID0gdGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZS5nZXRDb21wb25lbnQoXCJSZXdhcmRJbnNlcnRcIik7XHJcbiAgICAgICAgICAgIGlmIChyZXdhcmRJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgIHJld2FyZEluc2VydC5pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrmv4DlirHmj5LlsY/nu4Tku7bvvIFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiUmV3YXJkSW5zZXJ057uE5Lu25LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHmj5LlsY/msqHmnInliJvlu7rvvIFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZVJld2FyZEluc2VydCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgcmV3YXJkSW5zZXJ0OiBSZXdhcmRJbnNlcnQgPSB0aGlzLl9yZXdhcmRJbnNlcnROb2RlLmdldENvbXBvbmVudChcIlJld2FyZEluc2VydFwiKTtcclxuICAgICAgICAgICAgaWYgKHJld2FyZEluc2VydCkge1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkSW5zZXJ0LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpmpDol4/mv4DlirHmj5LlsY/nu4Tku7bvvIFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiUmV3YXJkSW5zZXJ057uE5Lu25LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHmj5LlsY/msqHmnInliJvlu7rvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93Q2xvc2VCdG5CYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnczogYW55KSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMud2VjaGF0VG9vbCAmJiAhdXRpbHMud2VjaGF0VG9vbC5pc092ZXJNaW5WZXJzaW9uKFwiMi4wLjRcIikpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3niYjmnKzkuI3mlK/mjIFCYW5uZXLlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZyAmJiAoIXV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLmlzTW92ZUJ0biB8fCB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5pc01vdmVCdG4gIT0gXCJ0cnVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5rKh5pyJ5byA5ZCv56e75Yqo5oyJ6ZKu77yM5LiN5pi+56S65bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodXRpbHMud2VjaGF0VG9vbCAmJiB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvblRtcDogQmFubmVyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgYXJnc1RtcDogYW55ID0gYXJncztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmdldEJhbm5lcklkKGxvY2F0aW9uVG1wKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb2xkQmFubmVyTG9jYXRpb24gIT0gbG9jYXRpb25UbXAgJiYgdGhpcy5fY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyQmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbGRCYW5uZXJMb2NhdGlvbiA9IGxvY2F0aW9uVG1wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VyQmFubmVyQWQgPSB3eC5jcmVhdGVCYW5uZXJBZChwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrmnaHliqDovb3lpLHotKUhIFwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZCA9IHNlbGYuX2N1ckJhbm5lckFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY3VyQmFubmVyQWQgPSBjdXJCYW5uZXJBZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlQnRuID0gYXJncy5jbG9zZUJ0bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3NlQnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/osIPmlbTlhbPpl63mjInpkq7kvY3nva5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2luSGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkWSA9IHNlbGYuZ2V0QmFubmVyQWRIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCd1dGlscyAtIGFkWTonLCBhZFkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZFkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQnRuLnkgPSAtKHdpbkhlaWdodCAvIDIgLSBhZFkpICsgY2xvc2VCdG4uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiYnRuQ2xvc2UueVwiLCBjbG9zZUJ0bi55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPpl63mjInpkq4tLS1CYW5uZXLlub/lkYrmmL7npLrmiJDlip8hXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJCYW5uZXLlub/lkYrlh7rplJlcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5vblJlc2l6ZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCYW5uZXJBZC5zdHlsZS53aWR0aCA9IHV0aWxzLndlY2hhdFRvb2wuZ2V0U3lzdGVtSW5mbygpLnNjcmVlbldpZHRoICogMC42O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyQmFubmVyQWQuc3R5bGUubGVmdCA9ICh1dGlscy53ZWNoYXRUb29sLmdldFN5c3RlbUluZm8oKS5zY3JlZW5XaWR0aCAtIHJlcy53aWR0aCkgKiAwLjU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHNlbGYuX2Jhbm5lckJvdHRvbSA9PSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGN1ckJhbm5lckFkLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyQmFubmVyQWQuc3R5bGUudG9wID0gdXRpbHMud2VjaGF0VG9vbC5nZXRTeXN0ZW1JbmZvKCkuc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW5v+WRiuadoeWIm+W7uuWksei0pSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgKiDmmK/lkKbog73mmL7npLo25Liq5YWD57Sg55qE5Lqk5Y+J5o6o5bm/57uE5Lu2XHJcbiAgKi9cclxuICAgIHB1YmxpYyBjYW5TaG93Q3Jvc3NXaWRnZXQ2KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIw25YWD57Sg5Lqk5Y+J5o6o5bm/57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLo25YWD57Sg5Lqk5Y+J5o6o5bm/57uE5Lu2XHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNob3dDcm9zc1dpZGdldDYoKTogY2MuTm9kZSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhblNob3dDcm9zc1dpZGdldDYoKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5jcm9zc1dpZGdldDYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcuY3Jvc3NXaWRnZXQ2KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKrmib7liLDpooTliLbkvZMgQ3Jvc3NXaWRnZXQ2LCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuue7k+eul+W5v+WRilxyXG4gICAgKiBAcGFyYW0gZGF0YSDlj4LmlbDvvJogY2xvc2VCdG46XHJcbiAgICAqIHN0YXRlbWVudF90eXBlIFxyXG4gICAgKiAxOuWPquaYvuekuuWwj+a4uOaIj+aPkuWxj+W5v+WRilxyXG4gICAgKiAyOuWPquaYvuekujbkuKrkupLmjqjlub/lkYpcclxuICAgICogMzrmmL7npLrmj5LlsY/lub/lkYorNuS4quS6kuaOqFxyXG4gICAgKi9cclxuICAgIHNob3dTdGF0ZW1lbnRBZHMoZGF0YT86IGFueSk6IGFueSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0geyBcInR5cGVcIjogMCwgXCJub2RlXCI6IG51bGwgfTtcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgaWYgKHV0aWxzLmNhblNob3dDcm9zc1dpZGdldDYoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5pi+56S6NuS4quS6kuaOqOe7hOS7tlwiKTtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuc2hvd0Nyb3NzV2lkZ2V0NigpO1xyXG4gICAgICAgICAgICByZXN1bHQudHlwZSA9IDE7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ub2RlID0gbm9kZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAvLyBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuc3RhdGVtZW50X3R5cGUpIHtcclxuICAgICAgICAvLyAgICAgLy8gbGV0IHR5cGUgPSB0aGlzLlNlcnZlckNvbmZpZy5zdGF0ZW1lbnRfdHlwZTtcclxuICAgICAgICAvLyAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICBsZXQgcmVzVHlwZTogbnVtYmVyID0gMDtcclxuICAgICAgICAvLyAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmNhblNob3dDcm9zc1dpZGdldDYoKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgbm9kZSA9IHRoaXMuc2hvd0Nyb3NzV2lkZ2V0NigpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgLy8gc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBjYXNlIDE6XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlj6rmmL7npLrlsI/muLjmiI/mj5LlsY/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlj6rmmL7npLo25Liq5LqS5o6o5bm/5ZGKXCIpO1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIG5vZGUgPSB0aGlzLnNob3dDcm9zc1dpZGdldDYoKTtcclxuICAgICAgICAvLyAgICAgLy8gICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAvLyAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgLy8gICAgIGNhc2UgMzpcclxuICAgICAgICAvLyAgICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuuaPkuWxj+W5v+WRiis25Liq5LqS5o6oXCIpO1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIG5vZGUgPSB0aGlzLnNob3dDcm9zc1dpZGdldDYoKTtcclxuICAgICAgICAvLyAgICAgLy8gICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAvLyAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgLy8gICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumdnuazleeahOe7k+eul+W5v+WRiuexu+Wei++8jO+8mlwiLCB0eXBlKVxyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgIHJlc3VsdC50eXBlID0gcmVzVHlwZTtcclxuICAgICAgICAvLyAgICAgcmVzdWx0Lm5vZGUgPSBub2RlO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIGNjLndhcm4oXCLphY3nva7mnKrliJ3lp4vljJbvvIFcIik7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZiYW5uZXLlub/lkYrpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJhbm5lckFkSGVpZ2h0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuX2N1ckJhbm5lckFkLnN0eWxlLnJlYWxIZWlnaHQgKiAyO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbnVsbCB8fCBpID09PSB1bmRlZmluZWQgfHwgaXNOYU4oaSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgX2N1c3RvbUFkT2JqczogYW55W10gPSBbXTtcclxuICAgIHB1YmxpYyBzaG93TmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKCF1dGlscy53ZWNoYXRUb29sLmlzT3Zlck1pblZlcnNpb24oXCIyLjExLjFcIikpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeWOn+eUn+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7hOS7tuacquWIneWni+WMlu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5iYW5uZXJCb3hJZCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGKSUTkuI3lrZjlnKhcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b3AgPSAwO1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuICAgICAgICBpZiAocGFyYW1zLnRvcCkge1xyXG4gICAgICAgICAgICB0b3AgPSBwYXJhbXMudG9wIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9wID0gdGhpcy5zeXNJbmZvLnNjcmVlbkhlaWdodCAtIDExMiAtIHBhcmFtcy5ib3R0b20gLyBjYy53aW5TaXplLmhlaWdodCAqIHRoaXMuc3lzSW5mby5zY3JlZW5IZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxlZnQpIHtcclxuICAgICAgICAgICAgbGVmdCA9IHBhcmFtcy5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCkge1xyXG4gICAgICAgICAgICBsZWZ0ID0gdGhpcy5zeXNJbmZvLnNjcmVlbldpZHRoIC0gNzAgLSBwYXJhbXMucmlnaHQgLyBjYy53aW5TaXplLndpZHRoICogdGhpcy5zeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGN1c3RvbUFkID0gd3guY3JlYXRlQ3VzdG9tQWQoe1xyXG4gICAgICAgICAgICAvLyBhZFVuaXRJZDogdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5iYW5uZXJCb3hJZCxcclxuICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuYmFubmVyQm94SWQsXHJcbiAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiAzMCxcclxuICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHRvcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGN1c3RvbUFkLm9uRXJyb3IoKGVycm8pID0+IHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiuW8guW4uO+8gT4+Pj4+ICNjb2RlPVwiICsgZXJyby5lcnJDb2RlICsgXCIgI21zZz1cIiArIGVycm8uZXJyTXNnKTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5vbkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5omn6KGM5b6u5L+h5Y6f55Sf5bm/5ZGK5byC5bi45Zue6LCD77yBXCIpXHJcbiAgICAgICAgICAgICAgICBwYXJhbXMub25FcnJvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY3VzdG9tQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW+ruS/oeWOn+eUn+W5v+WRiuWKoOi9veaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgY3VzdG9tQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5vblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5omn6KGM5b6u5L+h5Y6f55Sf5bm/5ZGK5pi+56S65oiQ5Yqf5Zue6LCD77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm9uU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW+ruS/oeWOn+eUn+W5v+WRiuaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW+ruS/oeWOn+eUn+W5v+WRiuaYvuekuuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5fY3VzdG9tQWRPYmpzLnB1c2goY3VzdG9tQWQpO1xyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVDdXN0b21BZE9ianM6IGFueVtdID0gW107XHJcbiAgICBwdWJsaWMgc2hvd0N1c3RvbUFkKHBhcmFtczogYW55ID0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAoIXV0aWxzLndlY2hhdFRvb2wuaXNPdmVyTWluVmVyc2lvbihcIjIuMTEuMVwiKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pys5LiN5pSv5oyB5Y6f55Sf5qih54mI5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uE5Lu25pyq5Yid5aeL5YyW77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuY3VzdG9tQWRJbmZvcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrphY3nva7kuI3lrZjlnKhcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXN0b21BZEluZm86IEN1c3RvbUFkSW5mbyA9IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuZ2V0Q3VzdG9tQWRJbmZvSW5mbyhwYXJhbXMubG9jYXRpb24pO1xyXG4gICAgICAgIGlmICghY3VzdG9tQWRJbmZvKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3kvY3nva7mnKrphY3nva7mqKHniYjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhcIuaYvuekuuWOn+eUn+aooeeJiOW5v+WRiu+8muS9jee9ru+8mlwiICsgcGFyYW1zLmxvY2F0aW9uICsgXCLvvIzphY3nva46XCIgKyBjdXN0b21BZEluZm8udG9TdHJvbmcpO1xyXG4gICAgICAgIGxldCB0b3AgPSAwO1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgLy8gICBhYm91dO+8muW3puWPs+WxheS4rVxyXG4gICAgICAgIC8vICAgdXBkb3duOuS4iuS4i1xyXG4gICAgICAgIC8vICAgYWxsOuS4iuS4i+WSjOW3puWPs+WxheS4rVxyXG4gICAgICAgIC8vICBmYWxzZTroh6rlrprkuYnlr7npvZDmlrnlvI9cclxuICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmlzX2NlbnRlciA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbUFkSW5mby50b3AgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gY3VzdG9tQWRJbmZvLnRvcCAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5zeXNJbmZvLnNjcmVlbkhlaWdodFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gdGhpcy5zeXNJbmZvLnNjcmVlbkhlaWdodCAtIGN1c3RvbUFkSW5mby5oZWlnaHQgLSBjdXN0b21BZEluZm8uYm90dG9tIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmxlZnQgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IGN1c3RvbUFkSW5mby5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSB0aGlzLnN5c0luZm8uc2NyZWVuV2lkdGggLSBjdXN0b21BZEluZm8ud2lkdGggLSBjdXN0b21BZEluZm8ucmlnaHQgLyBjYy53aW5TaXplLndpZHRoICogdGhpcy5zeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChjdXN0b21BZEluZm8uaXNfY2VudGVyID09IFwidXBkb3duXCIpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aooeeJiOS4iuS4i+WxheS4reWvuem9kO+8gVwiKVxyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmxlZnQgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IGN1c3RvbUFkSW5mby5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSB0aGlzLnN5c0luZm8uc2NyZWVuV2lkdGggLSBjdXN0b21BZEluZm8ud2lkdGggLSBjdXN0b21BZEluZm8ucmlnaHQgLyBjYy53aW5TaXplLndpZHRoICogdGhpcy5zeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvcCA9ICh0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0IC0gY3VzdG9tQWRJbmZvLmhlaWdodCkgLyAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tQWRJbmZvLmlzX2NlbnRlciA9PSBcImFib3V0XCIpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aooeeJiOW3puWPs+WxheS4reWvuem9kO+8gVwiKVxyXG4gICAgICAgICAgICBsZWZ0ID0gKHRoaXMuc3lzSW5mby5zY3JlZW5XaWR0aCAtIGN1c3RvbUFkSW5mby53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLnRvcCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSBjdXN0b21BZEluZm8udG9wIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSB0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0IC0gY3VzdG9tQWRJbmZvLmhlaWdodCAtIGN1c3RvbUFkSW5mby5ib3R0b20gLyBjYy53aW5TaXplLmhlaWdodCAqIHRoaXMuc3lzSW5mby5zY3JlZW5IZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mqKHniYjkuIrkuIvlt6blj7PlsYXkuK3lr7npvZDvvIFcIilcclxuICAgICAgICAgICAgbGVmdCA9ICh0aGlzLnN5c0luZm8uc2NyZWVuV2lkdGggLSBjdXN0b21BZEluZm8ud2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgdG9wID0gKHRoaXMuc3lzSW5mby5zY3JlZW5IZWlnaHQgLSBjdXN0b21BZEluZm8uaGVpZ2h0KSAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGN1c3RvbUFkID0gd3guY3JlYXRlQ3VzdG9tQWQoe1xyXG4gICAgICAgICAgICBhZFVuaXRJZDogY3VzdG9tQWRJbmZvLmlkLFxyXG4gICAgICAgICAgICBhZEludGVydmFsczogY3VzdG9tQWRJbmZvLnJlZnJlc2hfdGltZSxcclxuICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHRvcCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBjdXN0b21BZEluZm8ud2lkdGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1c3RvbUFkLmxvY2F0aW9uID0gcGFyYW1zLmxvY2F0aW9uO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJjdXN0b21BZCBzdHlsZSBsZWZ0PVwiICsgbGVmdCArIFwiLHRvcD1cIiArIHRvcCArIFwiOyAgc2NyZWVuV2lkdGg9XCIgKyB0aGlzLnN5c0luZm8uc2NyZWVuV2lkdGggKyBcIiwgc2NyZWVuSGVpZ2h0PVwiICsgdGhpcy5zeXNJbmZvLnNjcmVlbkhlaWdodClcclxuICAgICAgICBjdXN0b21BZC5vbkVycm9yKChlcnJvKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrlvILluLjvvIE+Pj4+PiAjY29kZT1cIiArIGVycm8uZXJyQ29kZSArIFwiICNtc2c9XCIgKyBlcnJvLmVyck1zZyk7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMub25FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaJp+ihjOW+ruS/oeWOn+eUn+W5v+WRiuW8guW4uOWbnuiwg++8gVwiKVxyXG4gICAgICAgICAgICAgICAgcGFyYW1zLm9uRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGN1c3RvbUFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvq7kv6Hljp/nlJ/lub/lkYrliqDovb3miJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIGN1c3RvbUFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMub25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaJp+ihjOW+ruS/oeWOn+eUn+W5v+WRiuaYvuekuuaIkOWKn+Wbnuiwg++8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5vblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvq7kv6Hljp/nlJ/lub/lkYrmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvq7kv6Hljp/nlJ/lub/lkYrmmL7npLrlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX2N1c3RvbUFkT2Jqcy5wdXNoKGN1c3RvbUFkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WOn+eUn+aooeeJiOW5v+WRilxyXG4gICAgICovXHJcbiAgICBoaWRlQ3VzdG9tQWQocGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jdXN0b21BZE9ianMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbUFkT2Jqc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBcImxvY2F0aW9uXCIgaW4gcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbUFkT2Jqc1tpXS5sb2NhdGlvbiA9PSBwYXJhbXMubG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+S9jee9ru+8mlwiICsgcGFyYW1zLmxvY2F0aW9uICsgXCLnmoTljp/nlJ/mqKHniYjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFkT2Jqc1tpXS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tQWRPYmpzLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tQWRPYmpzW2ldLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFkT2Jqcy5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXBhcmFtcyB8fCAhKFwibG9jYXRpb25cIiBpbiBwYXJhbXMpKSB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5omA5pyJ5L2N572u55qE5Y6f55Sf5qih54mI5bm/5ZGKXCIpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/ljp/nlJ/or5Xnjqnlub/lkYpcclxuICAgICAqL1xyXG4gICAgaGlkZU5hdGl2ZVRyeUdhbWVXaWRnZXQoKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY3VzdG9tQWRPYmpzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXN0b21BZE9ianNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFkT2Jqc1tpXS5kZXN0cm95KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jdXN0b21BZE9ianMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tQWRPYmpzLnNwbGljZShpLCAxKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG5hdGl2ZUJhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIHNob3dOYXRpdmVCYW5uZXJBZChsb2NhdGlvbjogQmFubmVyTG9jYXRpb24sIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5bGV56S65Y6f55SfYmFubmVy5bm/5ZGKIVwiKTtcclxuXHJcbiAgICAgICAgaWYgKCF1dGlscy53ZWNoYXRUb29sLmlzT3Zlck1pblZlcnNpb24oXCIyLjExLjFcIikpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeWOn+eUn+aooeeJiOW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7hOS7tuacquWIneWni+WMlu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5uYXRpdmVCYW5uZXJJZCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGKSUTphY3nva7kuI3lrZjlnKhcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYW5uZXJXaWR0aCA9IDMyNTtcclxuICAgICAgICBsZXQgYmFubmVySGVpZ2h0ID0gMTAwO1xyXG5cclxuICAgICAgICBsZXQgbGVmdCA9ICh0aGlzLnN5c0luZm8uc2NyZWVuV2lkdGggLSBiYW5uZXJXaWR0aCkgLyAyO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0IC0gYmFubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJBZC5pc1Nob3coKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuato+WcqOaYvuekuu+8jOS4jemHjeaWsOWIm+W7uu+8gVwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiuaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVEZWZhdWx0QmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiuaYvuekuuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUJhbm5lckFkICYmIHRoaXMubmF0aXZlQmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlQmFubmVyQWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQmFubmVyKGxvY2F0aW9uLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGxldCBjdXN0b21BZCA9IHd4LmNyZWF0ZUN1c3RvbUFkKHtcclxuICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcubmF0aXZlQmFubmVySWQsXHJcbiAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5yZWZyZXNoX2FkX3RpbWUgfHwgMzAsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYmFubmVyV2lkdGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJuYXRpdmUgbmFubmVyIGFkIHN0eWxlIGxlZnQ9XCIgKyBsZWZ0ICsgXCIsdG9wPVwiICsgdG9wICsgXCI7ICBzY3JlZW5XaWR0aD1cIiArIHRoaXMuc3lzSW5mby5zY3JlZW5XaWR0aCArIFwiLCBzY3JlZW5IZWlnaHQ9XCIgKyB0aGlzLnN5c0luZm8uc2NyZWVuSGVpZ2h0KVxyXG4gICAgICAgIGN1c3RvbUFkLm9uRXJyb3IoKGVycm8pID0+IHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiuW8guW4uO+8gT4+Pj4+ICNjb2RlPVwiICsgZXJyby5lcnJDb2RlICsgXCIgI21zZz1cIiArIGVycm8uZXJyTXNnKTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJBZCAmJiB0aGlzLm5hdGl2ZUJhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJBZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUJhbm5lcihsb2NhdGlvbiwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjdXN0b21BZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK5Yqg6L295oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICBjdXN0b21BZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUJhbm5lckFkICYmIHRoaXMubmF0aXZlQmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJBZCA9IGN1c3RvbUFkO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiuaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSGlkZURlZmF1bHRCYW5uZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrmmL7npLrlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUJhbm5lckFkICYmIHRoaXMubmF0aXZlQmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJBZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkICYmIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQmFubmVyKGxvY2F0aW9uLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBuYXRpdmVJbnRlcnNpdGl0aWFsQWQ6IGFueSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc2hvd05hdGl2ZUludGVyc2l0aXRpYWxBZCgpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5bGV56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuXHJcbiAgICAgICAgaWYgKCF1dGlscy53ZWNoYXRUb29sLmlzT3Zlck1pblZlcnNpb24oXCIyLjExLjFcIikpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeWOn+eUn+aooeeJiOW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7hOS7tuacquWIneWni+WMlu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5uYXRpdmVJbnNlcnRJZHMpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiklE6YWN572u5LiN5a2Y5ZyoXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGluc2VydFdpZHRoID0gMzQ1O1xyXG4gICAgICAgIGxldCBpbnNlcnRIZWlnaHQgPSA0MjA7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUud2lkdGggPiBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICBpbnNlcnRIZWlnaHQgPSAzMDBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlZnQgPSAodGhpcy5zeXNJbmZvLnNjcmVlbldpZHRoIC0gaW5zZXJ0V2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wID0gKHRoaXMuc3lzSW5mby5zY3JlZW5IZWlnaHQgLSBpbnNlcnRIZWlnaHQpIC8gMjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlSW50ZXJzaXRpdGlhbEFkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUludGVyc2l0aXRpYWxBZC5pc1Nob3coKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+ato+WcqOaYvuekuu+8jOS4jemHjeaWsOWIm+W7uu+8gVwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnRlcnNpdGl0aWFsQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiuaYvuekuuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUludGVyc2l0aXRpYWxBZCAmJiB0aGlzLm5hdGl2ZUludGVyc2l0aXRpYWxBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnRlcnNpdGl0aWFsQWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkICYmIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBsZXQgY3VzdG9tQWQgPSB3eC5jcmVhdGVDdXN0b21BZCh7XHJcbiAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLm5hdGl2ZUluc2VydElkcyxcclxuICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDYwLFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGluc2VydFdpZHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwibmF0aXZlIGluc2VydCBhZCBzdHlsZSBsZWZ0PVwiICsgbGVmdCArIFwiLHRvcD1cIiArIHRvcCArIFwiOyAgc2NyZWVuV2lkdGg9XCIgKyB0aGlzLnN5c0luZm8uc2NyZWVuV2lkdGggKyBcIiwgc2NyZWVuSGVpZ2h0PVwiICsgdGhpcy5zeXNJbmZvLnNjcmVlbkhlaWdodClcclxuICAgICAgICBjdXN0b21BZC5vbkVycm9yKChlcnJvKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrlvILluLjvvIE+Pj4+PiAjY29kZT1cIiArIGVycm8uZXJyQ29kZSArIFwiICNtc2c9XCIgKyBlcnJvLmVyck1zZyk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSW50ZXJzaXRpdGlhbEFkICYmIHRoaXMubmF0aXZlSW50ZXJzaXRpdGlhbEFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnRlcnNpdGl0aWFsQWQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY3VzdG9tQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiuWKoOi9veaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgY3VzdG9tQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnRlcnNpdGl0aWFsQWQgJiYgdGhpcy5uYXRpdmVJbnRlcnNpdGl0aWFsQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnRlcnNpdGl0aWFsQWQgPSBjdXN0b21BZDtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrmmL7npLrlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUludGVyc2l0aXRpYWxBZCAmJiB0aGlzLm5hdGl2ZUludGVyc2l0aXRpYWxBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUludGVyc2l0aXRpYWxBZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19