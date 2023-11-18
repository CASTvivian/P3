"use strict";
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