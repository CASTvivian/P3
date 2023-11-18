
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentOPPO.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61483n9NuBPRaedYYim5L7f', 'AdAgentOPPO');
// common-plugin/Scripts/AdAgentOPPO.ts

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
var YZ_NativeAdObject_1 = require("./YZ_NativeAdObject");
var NativeTryGamesWidget_1 = require("./NativeTryGamesWidget");
var CompatibleTool_1 = require("./CompatibleTool");
var YouWanAnalytics_1 = require("./YouWanSDK/YouWanAnalytics");
var EventAdInfo_1 = require("./YouWanSDK/EventAdInfo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentOPPO = /** @class */ (function (_super) {
    __extends(AdAgentOPPO, _super);
    function AdAgentOPPO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bannerAd = null;
        _this._insertAd = null;
        _this._videoAd = null;
        _this._nativeBannerAd = [];
        _this._nativeInsertAd = [];
        _this._nativeSingleAd = [];
        _this._nativeAd = null;
        // 广告组件是否初始化成功
        _this._isAdInit = false;
        _this._isBannerShow = false;
        _this._isInsertShow = false;
        // 当前位置id的索引
        _this._curPosIdIndexNativeBanner = 0;
        _this._curPosIdIndexNativeInser = 0;
        _this._curPosIdIndexSingleNative = 0;
        _this._nativeData = null;
        _this._nativeInsertData = null;
        _this._nativeBannerNode = null;
        _this._nativeInsertNode = null;
        _this._videoCallback = null;
        _this._videoLoaded = null;
        _this._miniBannerHeight = 0;
        _this._showBannerCallBack = null;
        _this._nativeAdObject = null;
        //插屏显示次数
        _this._insertShowCount = 0;
        _this._insertLastShowTime = 0;
        _this._curNativeItem = null;
        _this._isNativeBannerShow = false; //原生广告展示，调用的隐藏
        _this.lastLastShowVideoTime = 0; //最后一次显示视频时间
        _this._bannerHideCount = 0;
        _this.canShowNativeBanner = true; //原生banner是否展示
        _this._nativeBannerInfo = null;
        _this.show_ad_by_config = true;
        _this._nativeIsClose = false;
        _this._showBannerTimerId = 0;
        _this._delayShowBannerId = 0;
        // nbclr:是否开启强制刷新
        //当前显示Banner的位置
        _this._curLocation = YZ_Constant_1.BannerLocation.None;
        _this._isTimeRefresh = false;
        //启动定时器的时间
        _this._startBannerTimerTask = 0;
        _this._showBannerCount = 0;
        _this.tryGameAdArr = [];
        _this._nativeInsertAdShowCount = 0;
        /**
         * 验证是否第一次创建插屏
         */
        _this.miniInserAdIsCreate = false;
        _this._curNativeBannerInfo = {};
        _this._singleAdCreateTime = 0;
        _this._rewardInsertNode = null;
        _this.signleNativeAd = null;
        _this._nativeTryGameNode = null;
        _this.nativeTemplateBannerAd = null;
        return _this;
    }
    Object.defineProperty(AdAgentOPPO.prototype, "ServerConfig", {
        get: function () {
            if (Utils_1.utils.oppoTool && Utils_1.utils.oppoTool.ServerConfig)
                return Utils_1.utils.oppoTool.ServerConfig;
            return {};
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取当前banner配置
     */
    AdAgentOPPO.prototype.getNativeBannerInfo = function () {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return Utils_1.utils.config.oppoconfig.getNativeBannerInfo(this._curLocation);
    };
    AdAgentOPPO.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO && Utils_1.utils.oppoTool && Utils_1.utils.oppoTool.isOverMiniVersion("1031")) {
            Utils_1.utils.registerServerInitEvent(function () {
                Utils_1.utils.showLog("OPPO 广告代理组件初始化!");
                var self = _this;
                //@ts-ignore
                qg.initAdService({
                    appId: Utils_1.utils.config.oppoconfig.appID,
                    isDebug: true,
                    success: function (res) {
                        Utils_1.utils.showLog("OPPO 小游戏广告组件初始化成功!");
                        self._isAdInit = true;
                        self._initVideoAd();
                    },
                    fail: function (res) {
                        Utils_1.utils.showLog("OPPO 小游戏广告组件初始化失败 :" + res.code + res.msg);
                    },
                    complete: function (res) {
                    }
                });
            }, this);
        }
    };
    AdAgentOPPO.prototype.ShowBanner = function (location, args, isTimeRefresh) {
        var _this = this;
        if (location === void 0) { location = null; }
        if (args === void 0) { args = null; }
        if (isTimeRefresh === void 0) { isTimeRefresh = false; }
        if (PlatUtils_1.default.IsOPPO) {
            if (!this.ServerConfig) {
                Utils_1.utils.showLog("未请求到配置文件！");
                return;
            }
            this._showBannerCount++;
            var oldLocation = this._curLocation;
            this._curLocation = location;
            this._isTimeRefresh = isTimeRefresh;
            //如果跳用位置切换之后，验证是不是通过定时器强制刷新数据，不是则先隐藏banner
            if (oldLocation != location) {
                this.HideBanner(location);
            }
            var curTime = new Date().getTime();
            var refresh_ad_time = (curTime - this._startBannerTimerTask) / 1000;
            var interval_1 = this.ServerConfig.refresh_ad_time;
            // utils.showLog("isTimeRefresh=" + isTimeRefresh);
            if (args && args.isRefresh) {
                isTimeRefresh = true;
            }
            else if (interval_1 && interval_1 > 0) {
                if (refresh_ad_time > interval_1) {
                    isTimeRefresh = true;
                }
            }
            YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST);
            // utils.showLog("isTimeRefresh=" + isTimeRefresh);
            // 判断当前位置是不是显示banner
            if (this.getNativeBannerInfo().is_show_banner == -1) {
                Utils_1.utils.showLog("当前位置配置为不展示banner!");
                this.HideBanner(location);
                return;
            }
            else if (this.getNativeBannerInfo().is_show_rec > -1) {
                this.HideBanner(location);
                Utils_1.utils.showLog("当前位置显示互推banner");
                if (Utils_1.utils.oppoTool.canShowRecommend()) {
                    Utils_1.utils.oppoTool.showOppoRecBanner();
                    return;
                }
                Utils_1.utils.showLog("当前平台不支持互推banner");
            }
            else {
                if (!isTimeRefresh && !this.show_ad_by_config) {
                    if (this.ServerConfig.nbclr && this.ServerConfig.nbclr == "true" && this._curNativeBannerInfo.nativeBannerAd) {
                        Utils_1.utils.showLog("服务器配置定时器刷新数据 ");
                        Utils_1.utils.showLog("\u539F\u751Fbanner\u5EF6\u8FDF\u663E\u793A" + this.getNativeBannerInfo().delay_show_time + "\u79D2");
                        clearTimeout(this._showBannerTimerId);
                        clearTimeout(this._delayShowBannerId);
                        //@ts-ignore
                        this._delayShowBannerId = setTimeout(function () {
                            _this._showNativeBanner(_this._curNativeBannerInfo.nativeBannerAd, _this._curNativeBannerInfo.data);
                        }, this.getNativeBannerInfo().delay_show_time * 1000);
                        Utils_1.utils.showLog("开启定时刷新 >>>>>>>>>" + (interval_1 - refresh_ad_time));
                        //@ts-ignore
                        this._showBannerTimerId = setTimeout(function () {
                            Utils_1.utils.showLog("\u5B9A\u65F6" + interval_1 + "\u79D2\u8C03\u7528showbanner");
                            _this.ShowBanner(_this._curLocation, {}, true);
                        }, (interval_1 - refresh_ad_time) * 1000);
                        return;
                    }
                }
            }
            this.canShowNativeBanner = true;
            this._nativeIsClose = false;
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            Utils_1.utils.showLog("清理定时器");
            if (this.ServerConfig) {
                if (interval_1 && interval_1 > 0) {
                    Utils_1.utils.showLog("开启定时刷新 >>>>>>>>>" + interval_1);
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(function () {
                        Utils_1.utils.showLog("\u5B9A\u65F6" + interval_1 + "\u79D2\u8C03\u7528showbanner");
                        _this.ShowBanner(_this._curLocation, {}, true);
                    }, interval_1 * 1000);
                }
                if (this.show_ad_by_config) {
                    this.ShowBannerByConfigs(0);
                    return;
                }
                if (this.ServerConfig.banner_first_ad) {
                    if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                        Utils_1.utils.showLog("优先展示原生Banner广告!" + isTimeRefresh + " <<<<");
                        if (!this._isTimeRefresh) {
                            Utils_1.utils.showLog("\u539F\u751Fbanner\u5EF6\u8FDF\u663E\u793A" + this.getNativeBannerInfo().delay_show_time + "\u79D2");
                            //@ts-ignore
                            this._delayShowBannerId = setTimeout(function () {
                                _this._createNativeBannerAd(_this._showNativeBanner);
                            }, this.getNativeBannerInfo().delay_show_time * 1000);
                        }
                        else {
                            this._createNativeBannerAd(this._showNativeBanner);
                        }
                    }
                    else {
                        Utils_1.utils.showLog("优先展示小游戏Banner广告!");
                        this._createMiniGameBannerAd(location);
                    }
                }
                else {
                    Utils_1.utils.showLog("配置数据中没有 banner_first_ad 字段， banner广告不显示!");
                }
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentOPPO.prototype.hideMiniGameBanner = function () {
        if (this._bannerAd) {
            if (Utils_1.utils.oppoTool.isOverMiniVersion("1050")) {
                Utils_1.utils.showLog("销毁小游戏Banner");
                this._bannerAd.destroy();
                this._bannerAd = null;
            }
            else {
                Utils_1.utils.showLog("当前小游戏平台小于1051，只能隐藏小游戏Banner");
                this._bannerAd.hide();
            }
        }
    };
    AdAgentOPPO.prototype.hideNativeBanner = function () {
        if (this._nativeBannerNode) {
            Utils_1.utils.showLog("隐藏原生Banner");
            this._nativeBannerNode.active = false;
        }
    };
    AdAgentOPPO.prototype.hideBanner = function (type) {
        switch (type) {
            case "default":
                this.hideNativeBanner();
                //隐藏自定义banner
                Utils_1.utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                //隐藏互推banner
                Utils_1.utils.oppoTool && Utils_1.utils.oppoTool._rec_is_banner && Utils_1.utils.oppoTool.hideOppoRecBanner();
                break;
            case "native":
                this.hideMiniGameBanner();
                //隐藏自定义banner
                Utils_1.utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                //隐藏互推banner
                Utils_1.utils.oppoTool && Utils_1.utils.oppoTool._rec_is_banner && Utils_1.utils.oppoTool.hideOppoRecBanner();
                break;
            case "template":
                this.hideMiniGameBanner();
                this.hideNativeBanner();
                //隐藏自定义banner
                Utils_1.utils.hideRecommendGamesBanner();
                //隐藏互推banner
                Utils_1.utils.oppoTool && Utils_1.utils.oppoTool._rec_is_banner && Utils_1.utils.oppoTool.hideOppoRecBanner();
                break;
            case "rec":
                this.hideMiniGameBanner();
                this.hideNativeBanner();
                //隐藏自定义banner
                Utils_1.utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                break;
            default:
                this.hideMiniGameBanner();
                this.hideNativeBanner();
                //隐藏自定义banner
                Utils_1.utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                Utils_1.utils.oppoTool && Utils_1.utils.oppoTool._rec_is_banner && Utils_1.utils.oppoTool.hideOppoRecBanner();
                break;
        }
    };
    AdAgentOPPO.prototype.HideBanner = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsOPPO) {
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            this._isBannerShow = false;
            this._nativeIsClose = true;
            this.canShowNativeBanner = false;
            this.hideBanner("");
        }
    };
    /**
     * 隐藏快游戏的banner
     */
    AdAgentOPPO.prototype.hideKyxBanner = function () {
        this.hideBanner("rec");
    };
    AdAgentOPPO.prototype.showNativeTryGameWidget = function (params) {
        if (params === void 0) { params = null; }
        if (PlatUtils_1.default.IsOPPO) {
            Utils_1.utils.showLog("显示原生抖动试玩 nativeNeedChange=", Utils_1.utils.nativeNeedChange, "  utils.tryGameDate", Utils_1.utils.tryGameDate, "utils.config.oppoconfig.nativeTryGameIds", Utils_1.utils.config.oppoconfig.nativeTryGameIds);
            if (Utils_1.utils.nativeNeedChange || !Utils_1.utils.tryGameDate) {
                if (Utils_1.utils.config.oppoconfig.nativeTryGameIds) {
                    var len = Utils_1.utils.config.oppoconfig.nativeTryGameIds.length;
                    Utils_1.utils.showLog("len:" + len);
                    var _loop_1 = function (i) {
                        if (!this_1.tryGameAdArr[i]) {
                            var posId = Utils_1.utils.config.oppoconfig.nativeTryGameIds[i];
                            Utils_1.utils.showLog("创建原生抖动试玩广告， posId:" + posId);
                            //@ts-ignore
                            var tryGameAd_1 = qg.createNativeAd({
                                posId: posId
                            });
                            if (tryGameAd_1) {
                                tryGameAd_1.onLoad(function (res) {
                                    Utils_1.utils.nativeNeedChange = false;
                                    if (res && res.adList && res.adList.length > 0) {
                                        res = JSON.parse(JSON.stringify(res));
                                        var adId_1 = res.adList[0].adId;
                                        Utils_1.utils.showLog("adId:" + adId_1);
                                        var canAdd_1 = true;
                                        Utils_1.utils.tryGameDate.forEach(function (element) {
                                            if (adId_1 == element.date[0].adId) {
                                                canAdd_1 = false;
                                            }
                                        });
                                        if (canAdd_1) {
                                            Utils_1.utils.tryGameDate.push({ "tryGameAd": tryGameAd_1, "date": res.adList });
                                            if (Utils_1.utils._nativeTryGameNode) {
                                                Utils_1.utils._nativeTryGameNode.getComponent(NativeTryGamesWidget_1.default).init();
                                            }
                                        }
                                        Utils_1.utils.showLog("原生抖动试完广告资源拉取成功，是否可以添加广告" + canAdd_1);
                                        Utils_1.utils.showLog(JSON.stringify(res));
                                    }
                                });
                                tryGameAd_1.onError(function (err) {
                                    Utils_1.utils.showLog("原生抖动广告资源拉取失败！" + err.code + err.msg);
                                    Utils_1.utils.nativeNeedChange = true;
                                });
                                tryGameAd_1.load();
                                this_1.tryGameAdArr[i] = tryGameAd_1;
                            }
                        }
                        else {
                            this_1.tryGameAdArr[i].load();
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < len; i++) {
                        _loop_1(i);
                    }
                }
            }
            this.createNativeTryGameWidget(params);
        }
    };
    /**
     * 通过配置展示插屏
     * @param index 索引
     */
    AdAgentOPPO.prototype.ShowInterstitialByConfigs = function (index) {
        Utils_1.utils.showLog("ShowInterstitialByConfigs  index=" + index + " #configsLength=" + Utils_1.utils.config.oppoconfig.intersitialAdConfigs.length);
        if (index < Utils_1.utils.config.oppoconfig.intersitialAdConfigs.length) {
            var adInfo = Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index];
            Utils_1.utils.showLog("ShowInterstitialByConfigs adInfo:" + JSON.stringify(adInfo));
            switch (adInfo.type) {
                case "default":
                    this._createMiniGameInsertAdByConfig(index);
                    break;
                case "native":
                    this._createNativeInsertAdByConfig(index);
                    break;
                case "template":
                    this._createNativeTemplateIntersitialAd(index);
                    break;
            }
        }
        else {
            YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
            Utils_1.utils.showLog("插屏展示失败，所有广告类型都未请求到广告！");
        }
    };
    /**
     * 通过索引展示Banner
     * @param index 索引
     */
    AdAgentOPPO.prototype.ShowBannerByConfigs = function (index) {
        Utils_1.utils.showLog("ShowBannerByConfigs  index=" + index + " #configsLength=" + Utils_1.utils.config.oppoconfig.bannerAdConfigs.length);
        if (index < Utils_1.utils.config.oppoconfig.bannerAdConfigs.length) {
            var adInfo = Utils_1.utils.config.oppoconfig.bannerAdConfigs[index];
            Utils_1.utils.showLog("ShowBannerByConfigs adInfo:" + JSON.stringify(adInfo));
            switch (adInfo.type) {
                case "default":
                    this._createMiniGameBannerAdByConfigs(index);
                    break;
                case "native":
                    this._createNativeBannerAdByConfigs(index);
                    break;
                case "template":
                    this._createNativeTemplateBannerAd(index);
                    break;
            }
        }
        else {
            YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
            Utils_1.utils.showLog("Banner展示失败，所有广告类型都未请求到广告！");
        }
    };
    AdAgentOPPO.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsOPPO) {
            if (this.ServerConfig) {
                if (!this.checkInsertAdShow())
                    return;
                YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST);
                if (this.show_ad_by_config) {
                    this.ShowInterstitialByConfigs(0);
                    return;
                }
                if (location && location == YZ_Constant_1.BannerLocation.Pause) {
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        Utils_1.utils.showLog("暂停界面不延时展示！");
                        Utils_1.utils.showLog("优先展示原生插屏广告!");
                        this.nativeInserAdDelayCall();
                    }
                    else {
                        Utils_1.utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                }
                else {
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        Utils_1.utils.showLog("优先展示原生插屏广告!");
                        Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                    else {
                        Utils_1.utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                        // utils.delayCall(this._createMiniGameInsertAd.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentOPPO.prototype.nativeInserAdDelayCall = function () {
        Utils_1.utils.showLog("原生插屏广告: 当前点击次数=" + Utils_1.utils.oppoTool.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititia_show_interval + "; 展示累计=" + this._nativeInsertAdShowCount);
        if (Utils_1.utils.oppoTool.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
            // 每日点击次数到达上限，限制展示次数
            if (this._nativeInsertAdShowCount >= (this.ServerConfig.intersititia_show_interval || 0)) {
                // 可以展示
                this._createNativeInsertAd(this._showNativeInsert);
            }
            else {
                // 不能展示
                this._nativeInsertAdShowCount++;
            }
        }
        else {
            this._createNativeInsertAd(this._showNativeInsert);
        }
    };
    AdAgentOPPO.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsOPPO) {
            this._videoCallback = callback;
            var curTime = new Date().getTime();
            var interval = (curTime - this.lastLastShowVideoTime) / 1000;
            if (interval < 4) {
                Utils_1.utils.showLog("视频广告请求间隔小于4秒,直接返回false");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            if (this.ServerConfig) {
                if (this.checkRewardInsertIsShow() && Utils_1.utils.oppoTool
                    && Utils_1.utils.oppoTool.ServerConfig
                    && Utils_1.utils.oppoTool.ServerConfig.reward_first_ad && Utils_1.utils.oppoTool.ServerConfig.reward_first_ad != "video") {
                    Utils_1.utils.showLog("<<<服务器默认优先展示激励插屏>>>");
                    this.showRewardInsert();
                    return;
                }
                if (Utils_1.utils.oppoTool.isOverMiniVersion("1040")) {
                    if (!this._videoAd) {
                        this._initVideoAd();
                    }
                    if (this._videoAd && this._videoLoaded) {
                        this._videoAd.show();
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                        return;
                    }
                }
            }
            Utils_1.utils.showLog("暂无视频广告!");
            if (this._videoCallback) {
                this._videoAd.load();
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                // this.showRewardInsert();
                this._videoCallback(false, "暂无视频广告!");
                this._videoCallback = null;
            }
        }
    };
    AdAgentOPPO.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (Utils_1.utils.config.oppoconfig.videoId) {
                //@ts-ignore
                this._videoAd = qg.createRewardedVideoAd({
                    posId: Utils_1.utils.config.oppoconfig.videoId
                });
                var self_1 = this;
                if (this._videoAd) {
                    Utils_1.utils.showLog("初始化注册视频回调!");
                    this._videoAd.load();
                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                    this._videoAd.onLoad(function () {
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REQUEST_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                        Utils_1.utils.showLog("激励视频加载成功");
                        self_1._videoLoaded = true;
                    });
                    this._videoAd.onError(function (err) {
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                        Utils_1.utils.showLog("激励视频出错: " + err.code + err.msg);
                        self_1._videoLoaded = false;
                        if (self_1._videoCallback) {
                            self_1._videoCallback(false, "暂无视频广告!");
                            self_1._videoCallback = null;
                        }
                    });
                    this._videoAd.onClose(function (res) {
                        setTimeout(function () {
                            self_1._videoAd.load();
                            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                            Utils_1.utils.showLog("延迟3秒重新加载视频广告");
                        }, 3000);
                        if (res.isEnded) {
                            _this.lastLastShowVideoTime = new Date().getTime();
                            Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                            if (self_1._videoCallback) {
                                self_1._videoCallback(true, "");
                                self_1._videoCallback = null;
                            }
                            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REWARD_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                        }
                        else {
                            Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.REWARD_VIDEO, EventAdInfo_1.YwAdStatus.REWARD_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.videoId));
                            if (self_1._videoCallback) {
                                self_1._videoCallback(false, "观看完视频才能获得奖励!");
                                self_1._videoCallback = null;
                            }
                        }
                    });
                }
            }
            else {
                Utils_1.utils.showLog("视频广告Id配置错误!");
            }
        }
    };
    /**
     * 验证插屏是否能展示
     * 1、次数限制 默认每日8次
     * 2、时间限制 默认60秒
     */
    AdAgentOPPO.prototype.checkInsertAdShow = function () {
        var maxShowCount = this.ServerConfig.intersititial_max_show_count;
        var intervalTime = this.ServerConfig.intersititial_interval_time;
        var curTime = new Date().getTime();
        var interval = (curTime - this._insertLastShowTime) / 1000;
        Utils_1.utils.showLog("OPPO服务器插屏最大显示次数为：" + maxShowCount + ",间隔显示时间为：" + intervalTime + "秒！");
        Utils_1.utils.showLog("OPPO插屏当前广告显示次数：" + Utils_1.utils.oppoTool.insertAdShowCounts + "次，间隔时间：" + interval + "秒！");
        if (maxShowCount > 0 && Utils_1.utils.oppoTool.insertAdShowCounts >= maxShowCount) {
            Utils_1.utils.showLog("OPPO插屏广告显示的次数达到" + maxShowCount + "次。插屏不显示");
            return false;
        }
        if (intervalTime > 0 && interval < intervalTime) {
            Utils_1.utils.showLog("OPPO插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }
        return true;
    };
    // /**
    //  * 创建小程序插屏广告
    //  * @param isUnique 是否唯一展示 不轮询显示原生
    //  */
    AdAgentOPPO.prototype._createMiniGameInsertAd = function (isUnique) {
        var _this = this;
        if (isUnique === void 0) { isUnique = false; }
        if (PlatUtils_1.default.IsOPPO) {
            this._isInsertShow = true;
            if (this._isAdInit
                && Utils_1.utils.config.oppoconfig
                && Utils_1.utils.config.oppoconfig.insertId) {
                //@ts-ignore
                var _insertAd_1 = qg.createInsertAd({
                    adUnitId: Utils_1.utils.config.oppoconfig.insertId
                });
                if (_insertAd_1) {
                    Utils_1.utils.showLog("注册小游戏插屏广告回调！");
                    var clearCallBack_1 = function () {
                        _insertAd_1.offShow();
                        _insertAd_1.offError();
                        _insertAd_1.offLoad();
                    };
                    _insertAd_1.onError((function (err) {
                        Utils_1.utils.showLog("OPPO 小游戏插屏广告出错:" + err.code + err.msg);
                        if (_this._isInsertShow && !isUnique) {
                            if (_this.ServerConfig.intersititial_first_ad == "default") {
                                _this._isInsertShow = false;
                                Utils_1.utils.showLog("开始显示原生插屏广告!");
                                _this._curPosIdIndexNativeInser = 0;
                                Utils_1.utils.delayCall(_this.nativeInserAdDelayCall.bind(_this), _this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                        }
                        _insertAd_1.offError();
                        clearCallBack_1();
                    }).bind(this));
                    _insertAd_1.onLoad((function () {
                        Utils_1.utils.showLog("OPPO 小程序插屏广告加载成功!");
                        if (_this._isInsertShow) {
                            _this._isInsertShow = false;
                            _insertAd_1.show();
                            //onShow
                            _this._isInsertShow = false;
                            Utils_1.utils.oppoTool.countInserShowCount();
                            _this._insertLastShowTime = new Date().getTime();
                            var closeType = _this.ServerConfig.intersititial_open_close_banner;
                            if (closeType && closeType > 0) {
                                Utils_1.utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                                _this.HideBanner();
                            }
                        }
                        // _insertAd.offLoad();
                        // clearCallBack();
                    }).bind(this));
                    _insertAd_1.onShow((function () {
                        Utils_1.utils.showLog("OPPO 小游戏插屏广告显示成功！  ");
                        // _insertAd.offShow();
                        clearCallBack_1();
                    }).bind(this));
                    /**
                     * 第一次调用不需要手动load
                     */
                    if (!this.miniInserAdIsCreate) {
                        this.miniInserAdIsCreate = true;
                    }
                    else {
                        _insertAd_1.load();
                    }
                }
                if (!_insertAd_1) {
                    Utils_1.utils.showLog("OPPO小游戏插屏广告创建失败！");
                    if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
                        Utils_1.utils.showLog("开始显示原生插屏广告!");
                        this._curPosIdIndexNativeInser = 0;
                        Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            }
            else {
                Utils_1.utils.showLog("OPPO 小游戏插屏广告配置信息错误!");
                if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
                    Utils_1.utils.showLog("开始显示原生插屏广告!");
                    this._curPosIdIndexNativeInser = 0;
                    Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                }
            }
        }
    };
    // /**
    //  * 创建小程序插屏广告
    //  * @param isUnique 是否唯一展示 不轮询显示原生
    //  */
    AdAgentOPPO.prototype._createMiniGameInsertAdByConfig = function (index) {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            this._isInsertShow = true;
            Utils_1.utils.showLog("_createMiniGameInsertAdByIndex: index=" + index);
            if (this._isAdInit
                && Utils_1.utils.config.oppoconfig
                && index < Utils_1.utils.config.oppoconfig.intersitialAdConfigs.length) {
                //@ts-ignore
                var _insertAd_2 = qg.createInsertAd({
                    adUnitId: Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id
                });
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                if (_insertAd_2) {
                    Utils_1.utils.showLog("注册小游戏插屏广告回调！");
                    var clearCallBack_2 = function () {
                        _insertAd_2.offShow();
                        _insertAd_2.offError();
                        _insertAd_2.offLoad();
                    };
                    _insertAd_2.onError((function (err) {
                        Utils_1.utils.showLog("OPPO 小游戏插屏广告出错:" + err.code + err.msg);
                        if (_this._isInsertShow) {
                            _this.ShowInterstitialByConfigs(index + 1);
                        }
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id, err.code, err.msg));
                        _insertAd_2.offError();
                        clearCallBack_2();
                    }).bind(this));
                    _insertAd_2.onLoad((function () {
                        Utils_1.utils.showLog("OPPO 小程序插屏广告加载成功!");
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                        if (_this._isInsertShow) {
                            _this._isInsertShow = false;
                            _insertAd_2.show();
                            //onShow
                            _this._isInsertShow = false;
                            Utils_1.utils.oppoTool.countInserShowCount();
                            _this._insertLastShowTime = new Date().getTime();
                            var closeType = _this.ServerConfig.intersititial_open_close_banner;
                            if (closeType && closeType > 0) {
                                Utils_1.utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                                _this.HideBanner();
                            }
                        }
                        // _insertAd.offLoad();
                        // clearCallBack();
                    }).bind(this));
                    _insertAd_2.onShow((function () {
                        Utils_1.utils.showLog("OPPO 小游戏插屏广告显示成功！  ");
                        YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_SUCCESS);
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                        // _insertAd.offShow();
                        clearCallBack_2();
                    }).bind(this));
                    /**
                     * 第一次调用不需要手动load
                     */
                    if (!this.miniInserAdIsCreate) {
                        this.miniInserAdIsCreate = true;
                    }
                    else {
                        _insertAd_2.load();
                    }
                }
                if (!_insertAd_2) {
                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                    Utils_1.utils.showLog("OPPO小游戏插屏广告创建失败！");
                    this.ShowInterstitialByConfigs(index + 1);
                }
            }
            else {
                Utils_1.utils.showLog("OPPO 小游戏插屏广告配置信息错误!");
                // if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
                //     utils.showLog("开始显示原生插屏广告!");
                //     this._curPosIdIndexNativeInser = 0;
                //     utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                // }
            }
        }
    };
    AdAgentOPPO.prototype._createMiniGameBannerAd = function (location) {
        var _this = this;
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsOPPO) {
            this._isBannerShow = true;
            if (this._isAdInit
                && Utils_1.utils.config.oppoconfig
                && Utils_1.utils.config.oppoconfig.bannerId) {
                var style = {
                    top: 0
                };
                if (this.getNativeBannerInfo()._alignType === "top") {
                    style.top = 0;
                }
                else {
                    style = null;
                }
                if (!this._bannerAd || true) {
                    //@ts-ignore
                    this._bannerAd = qg.createBannerAd({
                        posId: Utils_1.utils.config.oppoconfig.bannerId,
                        style: style
                    });
                    if (this._bannerAd) {
                        Utils_1.utils.showLog("注册小游戏banner回调!");
                        this._bannerAd.onError((function (err) {
                            Utils_1.utils.showLog("OPPO 小游戏Banner广告出错: " + err.code + err.msg);
                            var bannerInfo = _this.getNativeBannerInfo();
                            if (bannerInfo.st_banner_show_back_up == -1) {
                                Utils_1.utils.showLog("服务器配置不显示备用广告");
                                return;
                            }
                            if (_this._isBannerShow) {
                                _this._isBannerShow = false;
                                if (_this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                                    _this._curPosIdIndexNativeBanner = 0;
                                    _this._createNativeBannerAd(_this._showNativeBanner.bind(_this));
                                }
                                else {
                                    //显示自定义banner
                                    if (Utils_1.utils.isShowRecommondGamesBanner()) {
                                        clearTimeout(_this._showBannerTimerId);
                                        Utils_1.utils.showRecommendGamesBanner();
                                        Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                                        return;
                                    }
                                }
                            }
                        }).bind(this));
                        this._bannerAd.onShow((function () {
                            Utils_1.utils.showLog("OPPO 小游戏Banner显示成功！");
                            if (_this._nativeBannerNode) {
                                _this._nativeBannerNode.active = false;
                            }
                            Utils_1.utils.hideRecommendGamesBanner();
                            // if (this._bannerIsHide) {
                            //     this._bannerAd.hide();
                            //     utils.showLog("当前Banner广告为隐藏状态。调用隐藏！");
                            // }
                            _this._showBannerCallBack && _this._showBannerCallBack();
                            _this._showBannerCallBack = null;
                        }).bind(this));
                        // this._bannerAd.onResize((obj) => {
                        //     utils.showLog("on resize >>>>" + JSON.stringify(obj));
                        //     utils.showLog('banner 宽度：' + obj.width + ', banner 高度：' + obj.height + " ,top" + obj.top)
                        // })
                        this._bannerAd.onHide(function () {
                            if (!this._isNativeBannerShow) {
                                Utils_1.utils.oppoTool.countBannerCloseCount();
                                Utils_1.utils.showLog("OPPO 小游戏Banner 广告隐藏,当前隐藏次数>" + Utils_1.utils.oppoTool.bannerAdCloseCounts);
                            }
                            else {
                                this._isNativeBannerShow = false;
                                Utils_1.utils.showLog("OPPO 小游戏Banner 广告隐藏,来自原生的显示，不增加隐藏次数，当前隐藏次数>" + Utils_1.utils.oppoTool.bannerAdCloseCounts);
                            }
                        });
                        // _miniBannerHeight
                    }
                    else {
                        if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                            this._curPosIdIndexNativeBanner = 0;
                            this._createNativeBannerAd(this._showNativeBanner.bind(this));
                        }
                        else {
                            //显示自定义banner
                            if (Utils_1.utils.isShowRecommondGamesBanner()) {
                                clearTimeout(this._showBannerTimerId);
                                Utils_1.utils.showRecommendGamesBanner();
                                Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                                return;
                            }
                        }
                    }
                }
                if (this._bannerAd) {
                    if (this.getNativeBannerInfo()._alignType !== "top") {
                        this._bannerAd.style.top = Utils_1.utils.oppoTool.SysInfo.screenHeight;
                    }
                    this._bannerAd.show();
                }
                else {
                    Utils_1.utils.showLog("OPPO 小游戏Banner广告创建失败!");
                    if (this.ServerConfig.indexOf("default") > -1) {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                    else {
                        //显示自定义banner
                        if (Utils_1.utils.isShowRecommondGamesBanner()) {
                            clearTimeout(this._showBannerTimerId);
                            Utils_1.utils.showRecommendGamesBanner();
                            Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                            return;
                        }
                    }
                }
            }
            else {
                Utils_1.utils.showLog("OPPO 小游戏Banner广告配置信息错误!");
                var bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    Utils_1.utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                    this._curPosIdIndexNativeBanner = 0;
                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                }
                else {
                    //显示自定义banner
                    if (Utils_1.utils.isShowRecommondGamesBanner()) {
                        clearTimeout(this._showBannerTimerId);
                        Utils_1.utils.showRecommendGamesBanner();
                        Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                        return;
                    }
                }
            }
        }
    };
    AdAgentOPPO.prototype._createMiniGameBannerAdByConfigs = function (index) {
        var _this = this;
        Utils_1.utils.showLog("_createMiniGameBannerAdByConfigs: #index=" + index);
        if (PlatUtils_1.default.IsOPPO) {
            this._isBannerShow = true;
            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
            if (this._isAdInit
                && Utils_1.utils.config.oppoconfig
                && index < Utils_1.utils.config.oppoconfig.bannerAdConfigs.length) {
                var style = {
                    top: 0
                };
                if (this.getNativeBannerInfo()._alignType === "top") {
                    style.top = 0;
                }
                else {
                    style = null;
                }
                //@ts-ignore
                this._bannerAd = qg.createBannerAd({
                    posId: Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id,
                    style: style
                });
                if (this._bannerAd) {
                    Utils_1.utils.showLog("注册小游戏banner回调!");
                    this._bannerAd.onError(function (err) {
                        _this._bannerAd.offError();
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                        Utils_1.utils.showLog("OPPO 小游戏 Configs Banner广告出错: " + err.code + err.msg);
                        var bannerInfo = _this.getNativeBannerInfo();
                        if (bannerInfo.st_banner_show_back_up == -1) {
                            Utils_1.utils.showLog("服务器配置不显示备用广告");
                            YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                            return;
                        }
                        if (_this._isBannerShow) {
                            _this._isBannerShow = false;
                            _this.ShowBannerByConfigs(index + 1);
                        }
                    });
                    // this._bannerAd.onShow((() => {
                    //     this._bannerAd.offShow();
                    //     utils.showLog("OPPO 小游戏Banner显示成功！");
                    //     this.hideBanner("default");
                    //     this._showBannerCallBack && this._showBannerCallBack();
                    //     this._showBannerCallBack = null;
                    // }).bind(this));
                    // this._bannerAd.onResize((obj) => {
                    //     utils.showLog("on resize >>>>" + JSON.stringify(obj));
                    //     utils.showLog('banner 宽度：' + obj.width + ', banner 高度：' + obj.height + " ,top" + obj.top)
                    // })
                    this._bannerAd.onHide(function () {
                        _this._bannerAd.offHide();
                        if (!_this._isNativeBannerShow) {
                            Utils_1.utils.oppoTool.countBannerCloseCount();
                            Utils_1.utils.showLog("OPPO 小游戏Banner 广告隐藏,当前隐藏次数>" + Utils_1.utils.oppoTool.bannerAdCloseCounts);
                        }
                        else {
                            _this._isNativeBannerShow = false;
                            Utils_1.utils.showLog("OPPO 小游戏Banner 广告隐藏,来自原生的显示，不增加隐藏次数，当前隐藏次数>" + Utils_1.utils.oppoTool.bannerAdCloseCounts);
                        }
                    });
                    if (this.getNativeBannerInfo()._alignType !== "top") {
                        this._bannerAd.style.top = Utils_1.utils.oppoTool.SysInfo.screenHeight;
                    }
                    this._bannerAd.show().then(function () {
                        _this._bannerAd.offShow();
                        Utils_1.utils.showLog("OPPO 小游戏Banner显示成功！");
                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                        YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_SUCCESS);
                        _this.hideBanner("default");
                        _this._showBannerCallBack && _this._showBannerCallBack();
                        _this._showBannerCallBack = null;
                    });
                }
                else {
                    this.ShowBannerByConfigs(index + 1);
                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                    YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                }
            }
            else {
                Utils_1.utils.showLog("OPPO 小游戏Banner广告配置信息错误!");
                var bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                    Utils_1.utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                this.ShowBannerByConfigs(index + 1);
            }
        }
    };
    AdAgentOPPO.prototype._createNativeBannerAdByConfigs = function (index) {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
            Utils_1.utils.showLog("_createNativeBannerAdByConfigs: #index=" + index);
            if (this._isAdInit
                && Utils_1.utils.config.oppoconfig
                && index < Utils_1.utils.config.oppoconfig.bannerAdConfigs.length) {
                var nativeBannerAd_1 = Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].nativeBannerAd;
                if (!nativeBannerAd_1) {
                    Utils_1.utils.showLog("创建原生广告Banner。 posId:" + Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id);
                    //@ts-ignore
                    nativeBannerAd_1 = qg.createNativeAd({
                        posId: Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id
                    });
                    if (nativeBannerAd_1) {
                        Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].nativeBannerAd = nativeBannerAd_1;
                        nativeBannerAd_1.onLoad(function (res) {
                            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                            if (_this._nativeIsClose) {
                                Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            if (res && res.adList && res.adList.length > 0) {
                                _this._startBannerTimerTask = new Date().getTime();
                                Utils_1.utils.showLog("原生Banner广告资源拉取成功！");
                                Utils_1.utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                var data = res.adList[0];
                                //如果当前显示为结算banner,则不做数据验证
                                if (_this._checkNativeDataValid(data) || _this.getNativeBannerInfo().show_st_banner == "true") {
                                    if (_this.canShowNativeBanner) {
                                        _this._curPosIdIndexNativeBanner = 0;
                                        _this._showNativeBanner(nativeBannerAd_1, data);
                                        _this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd_1;
                                        _this._curNativeBannerInfo.data = data;
                                        _this.hideBanner("native");
                                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                                        YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_SUCCESS);
                                    }
                                    else {
                                        Utils_1.utils.showLog("已经隐藏banner不可重复展示");
                                    }
                                    return;
                                }
                            }
                            Utils_1.utils.showLog("原生Banner广告资源出错！");
                            var bannerInfo = _this.getNativeBannerInfo();
                            if (bannerInfo.st_banner_show_back_up == -1) {
                                Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                                YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                                return;
                            }
                            _this.ShowBannerByConfigs(index + 1);
                        });
                        nativeBannerAd_1.onError(function (err) {
                            YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                            if (_this._nativeIsClose) {
                                Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            Utils_1.utils.showLog("原生Banner广告资源拉取失败！" + err.code + err.msg);
                            // 原生广告遍历完毕
                            var bannerInfo = _this.getNativeBannerInfo();
                            if (bannerInfo.st_banner_show_back_up == -1) {
                                Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                                YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                                return;
                            }
                            _this.ShowBannerByConfigs(index + 1);
                        });
                    }
                }
                if (nativeBannerAd_1) {
                    Utils_1.utils.showLog("nativeBannerAd reLoad>>");
                    nativeBannerAd_1.load();
                }
                else {
                    var bannerInfo = this.getNativeBannerInfo();
                    if (bannerInfo.st_banner_show_back_up == -1) {
                        Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                        YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                        return;
                    }
                    this.ShowBannerByConfigs(index + 1);
                }
            }
        }
    };
    AdAgentOPPO.prototype._createNativeBannerAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            var callback_1 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner);
            var nativeBannerAd_2 = this._nativeBannerAd[this._curPosIdIndexNativeBanner];
            if (!nativeBannerAd_2) {
                if (Utils_1.utils.config.oppoconfig.nativeBannerIds
                    && Utils_1.utils.config.oppoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                    Utils_1.utils.showLog("创建原生广告Banner。 posId:" + Utils_1.utils.config.oppoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                    //@ts-ignore
                    nativeBannerAd_2 = qg.createNativeAd({
                        posId: Utils_1.utils.config.oppoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                    });
                    if (nativeBannerAd_2) {
                        this._nativeBannerAd.push(nativeBannerAd_2);
                        nativeBannerAd_2.onLoad(function (res) {
                            if (_this._nativeIsClose) {
                                Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            if (res && res.adList && res.adList.length > 0) {
                                _this._startBannerTimerTask = new Date().getTime();
                                Utils_1.utils.showLog("原生Banner广告资源拉取成功！");
                                Utils_1.utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                var data = res.adList[0];
                                //如果当前显示为结算banner,则不做数据验证
                                if (_this._checkNativeDataValid(data) || _this.getNativeBannerInfo().show_st_banner == "true") {
                                    if (_this.canShowNativeBanner) {
                                        _this._curPosIdIndexNativeBanner = 0;
                                        _this._showNativeBanner(nativeBannerAd_2, data);
                                        _this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd_2;
                                        _this._curNativeBannerInfo.data = data;
                                        // 删除当前广告
                                        if (_this._bannerAd) {
                                            _this._isNativeBannerShow = true;
                                            if (Utils_1.utils.oppoTool.isOverMiniVersion("1050")) {
                                                Utils_1.utils.showLog("销毁小游戏Banner");
                                                _this._bannerAd.destroy();
                                                _this._bannerAd = null;
                                            }
                                            else {
                                                Utils_1.utils.showLog("当前小游戏平台小于1051，只能隐藏小游戏Banner");
                                                _this._bannerAd.hide();
                                            }
                                        }
                                        Utils_1.utils.hideRecommendGamesBanner();
                                    }
                                    else {
                                        cc.warn("已经隐藏banner不可重复展示");
                                    }
                                    return;
                                }
                            }
                            Utils_1.utils.showLog("原生Banner广告资源出错！");
                            _this._curPosIdIndexNativeBanner++;
                            if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.oppoconfig.nativeBannerIds.length) {
                                _this._createNativeBannerAd(callback_1);
                            }
                            else {
                                _this._curPosIdIndexNativeBanner = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("原生广告条遍历完毕，无法展示！");
                                var bannerInfo = _this.getNativeBannerInfo();
                                if (bannerInfo.st_banner_show_back_up == -1) {
                                    Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                                    return;
                                }
                                if (_this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                                    Utils_1.utils.showLog("开始展示小游戏广告条！");
                                    _this._createMiniGameBannerAd();
                                }
                                else {
                                    //显示自定义banner
                                    if (Utils_1.utils.isShowRecommondGamesBanner()) {
                                        clearTimeout(_this._showBannerTimerId);
                                        Utils_1.utils.showRecommendGamesBanner();
                                        Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                                        return;
                                    }
                                }
                            }
                        });
                        nativeBannerAd_2.onError(function (err) {
                            if (_this._nativeIsClose) {
                                Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            Utils_1.utils.showLog("原生Banner广告资源拉取失败！" + err.code + err.msg);
                            _this._curPosIdIndexNativeBanner++;
                            if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.oppoconfig.nativeBannerIds.length) {
                                _this._createNativeBannerAd(callback_1);
                            }
                            else {
                                _this._curPosIdIndexNativeBanner = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("原生广告条遍历完毕，无法展示！");
                                var bannerInfo = _this.getNativeBannerInfo();
                                if (bannerInfo.st_banner_show_back_up == -1) {
                                    Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                                    return;
                                }
                                if (_this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                                    Utils_1.utils.showLog("开始展示小游戏广告条！");
                                    _this._createMiniGameBannerAd();
                                }
                                else {
                                    //显示自定义banner
                                    if (Utils_1.utils.isShowRecommondGamesBanner()) {
                                        clearTimeout(_this._showBannerTimerId);
                                        Utils_1.utils.showRecommendGamesBanner();
                                        Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                                        return;
                                    }
                                }
                            }
                        });
                    }
                }
            }
            if (nativeBannerAd_2) {
                Utils_1.utils.showLog("nativeBannerAd reLoad>>");
                nativeBannerAd_2.load();
            }
            else {
                this._curPosIdIndexNativeBanner++;
                if (Utils_1.utils.config.oppoconfig.nativeBannerIds && this._curPosIdIndexNativeBanner < Utils_1.utils.config.oppoconfig.nativeBannerIds.length) {
                    this._createNativeBannerAd(callback_1);
                }
                else {
                    this._curPosIdIndexNativeBanner = 0;
                    // 原生广告遍历完毕
                    Utils_1.utils.showLog("原生广告条遍历完毕，无法展示！");
                    var bannerInfo = this.getNativeBannerInfo();
                    if (bannerInfo.st_banner_show_back_up == -1) {
                        Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                        return;
                    }
                    if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                        Utils_1.utils.showLog("开始展示小游戏广告条！");
                        this._createMiniGameBannerAd();
                    }
                    else {
                        //显示自定义banner
                        if (Utils_1.utils.isShowRecommondGamesBanner()) {
                            clearTimeout(this._showBannerTimerId);
                            Utils_1.utils.showRecommendGamesBanner();
                            Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u3001\u539F\u751F\u5E7F\u544A\u6761\u90FD\u65E0\u6CD5\u5C55\u793A\uFF0C\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                            return;
                        }
                    }
                }
            }
        }
    };
    AdAgentOPPO.prototype._createNativeInsertAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            var callback_2 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);
            var nativeInsertAd_1 = this._nativeInsertAd[this._curPosIdIndexNativeInser];
            if (!nativeInsertAd_1) {
                if (Utils_1.utils.config.oppoconfig.nativeInsertIds
                    && Utils_1.utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                    Utils_1.utils.showLog("创建原生插屏广告。 posId:" + Utils_1.utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                    //@ts-ignore
                    nativeInsertAd_1 = qg.createNativeAd({
                        posId: Utils_1.utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]
                    });
                    if (nativeInsertAd_1) {
                        this._nativeInsertAd.push(nativeInsertAd_1);
                        nativeInsertAd_1.onLoad(function (res) {
                            if (res && res.adList && res.adList.length > 0) {
                                Utils_1.utils.showLog("原生插屏广告资源拉取成功！");
                                Utils_1.utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                var data = res.adList[0];
                                if (_this._checkNativeInsertDataValid(data)) {
                                    _this._curPosIdIndexNativeInser = 0;
                                    _this._showNativeInsert(nativeInsertAd_1, data);
                                    return;
                                }
                                else {
                                    Utils_1.utils.showLog("原生插屏广告资源不合法！");
                                }
                            }
                            Utils_1.utils.showLog("原生插屏广告资源出错！");
                            _this._curPosIdIndexNativeInser++;
                            if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.oppoconfig.nativeInsertIds.length) {
                                _this._createNativeInsertAd(callback_2);
                            }
                            else {
                                _this._curPosIdIndexNativeInser = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("原生插屏广告遍历完毕，无法展示！");
                                if (_this.ServerConfig.intersititial_first_ad == "native") {
                                    Utils_1.utils.showLog("开始展示小游戏插屏广告!");
                                    _this._createMiniGameInsertAd();
                                }
                            }
                        });
                        nativeInsertAd_1.onError(function (err) {
                            Utils_1.utils.showLog("原生插屏广告资源拉取失败！" + err.code + err.msg);
                            _this._curPosIdIndexNativeInser++;
                            if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.oppoconfig.nativeInsertIds.length) {
                                _this._createNativeInsertAd(callback_2);
                            }
                            else {
                                _this._curPosIdIndexNativeInser = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("原生插屏广告遍历完毕，无法展示！");
                                if (_this.ServerConfig.intersititial_first_ad == "native") {
                                    Utils_1.utils.showLog("开始展示小游戏插屏广告!");
                                    _this._createMiniGameInsertAd();
                                }
                            }
                        });
                    }
                }
            }
            if (nativeInsertAd_1) {
                nativeInsertAd_1.load();
            }
            else {
                this._curPosIdIndexNativeInser++;
                if (Utils_1.utils.config.oppoconfig.nativeInsertIds && this._curPosIdIndexNativeInser < Utils_1.utils.config.oppoconfig.nativeInsertIds.length) {
                    this._createNativeInsertAd(callback_2);
                }
                else {
                    this._curPosIdIndexNativeInser = 0;
                    // 原生广告遍历完毕
                    Utils_1.utils.showLog("原生插屏广告遍历完毕，无法展示！");
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        Utils_1.utils.showLog("开始展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                }
            }
        }
    };
    AdAgentOPPO.prototype._createNativeInsertAdByConfig = function (index) {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            Utils_1.utils.showLog("_createNativeInsertAdByConfig: #index=" + index);
            if (this._isAdInit
                && Utils_1.utils.config.oppoconfig
                && index < Utils_1.utils.config.oppoconfig.intersitialAdConfigs.length) {
                var nativeInsertAd_2 = Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].nativeInsertAd;
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                if (!nativeInsertAd_2) {
                    if (Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id) {
                        Utils_1.utils.showLog("创建原生插屏广告。 posId:" + Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id);
                        //@ts-ignore
                        nativeInsertAd_2 = qg.createNativeAd({
                            posId: Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id
                        });
                        if (nativeInsertAd_2) {
                            Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].nativeInsertAd = nativeInsertAd_2;
                            nativeInsertAd_2.onLoad(function (res) {
                                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                                if (res && res.adList && res.adList.length > 0) {
                                    Utils_1.utils.showLog("原生插屏广告资源拉取成功！");
                                    Utils_1.utils.showLog(JSON.stringify(res));
                                    res = JSON.parse(JSON.stringify(res));
                                    var data = res.adList[0];
                                    if (_this._checkNativeInsertDataValid(data)) {
                                        YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_SUCCESS);
                                        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                                        _this._showNativeInsert(nativeInsertAd_2, data);
                                        return;
                                    }
                                    else {
                                        Utils_1.utils.showLog("原生插屏广告资源不合法！");
                                    }
                                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                                }
                                Utils_1.utils.showLog("原生插屏广告资源出错！");
                                _this.ShowInterstitialByConfigs(index + 1);
                            });
                            nativeInsertAd_2.onError(function (err) {
                                Utils_1.utils.showLog("原生插屏广告资源拉取失败！" + err.code + err.msg);
                                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id, err.code, err.msg));
                                _this.ShowInterstitialByConfigs(index + 1);
                            });
                        }
                    }
                }
                if (nativeInsertAd_2) {
                    nativeInsertAd_2.load();
                }
                else {
                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                    Utils_1.utils.showLog("创建原生插屏失败：#index=" + index);
                    this.ShowInterstitialByConfigs(index + 1);
                }
            }
        }
    };
    /**
     * 获取原生广告数据
     * @param args
     */
    AdAgentOPPO.prototype.getNativeAdData = function () {
        if (!this._nativeAdObject) {
            this._nativeAdObject = new YZ_NativeAdObject_1.default();
        }
        this._nativeAdObject._nativeObj = this._nativeAd;
        if (this._nativeAdObject.data) {
            if (this._nativeAdObject.data.adId != this._nativeData.adId) {
                this._nativeAdObject.is_reportClick = false;
                this._nativeAdObject.is_reportShow = false;
            }
        }
        this._nativeAdObject.data = this._nativeData;
        // setTimeout(() => {
        //     utils.showLog("延迟两秒重新请求原生广告数据");
        //     this._createNativeAd(args);
        // }, 2000);
        if (this._nativeData && this._nativeAd) {
            // this._nativeData = null;
            Utils_1.utils.showLog("获取原生数据 >>>", this._nativeData, "...", this._nativeAdObject);
            return this._nativeAdObject;
        }
        return null;
    };
    /**
     * 创建单个原生广告
     * @param completeCallback
     */
    AdAgentOPPO.prototype.createNativeAd = function (params, nativeItem) {
        var _this = this;
        if (params === void 0) { params = null; }
        Utils_1.utils.showLog("_createNativeAd >>>>>");
        if (PlatUtils_1.default.IsOPPO) {
            if (nativeItem) {
                this._curNativeItem = nativeItem;
            }
            var refreshTime = this.ServerConfig.st_native_ad_refresh_time ? this.ServerConfig.st_native_ad_refresh_time : 0;
            if (this._nativeAdObject && this._nativeAdObject.data && !this._nativeAdObject.is_reportClick && (new Date().getTime() - this._singleAdCreateTime) / 1000 < refreshTime) {
                Utils_1.utils.showLog("\u5F53\u524D\u539F\u751F\u5E7F\u544A\u7684\u5C55\u793A\u65F6\u95F4" + (new Date().getTime() - this._singleAdCreateTime) / 1000 + "\u79D2\uFF0C\u672A\u8FBE\u5237\u65B0\u65F6\u95F4" + refreshTime + "\u79D2\u9650\u5236\uFF0C\u76F4\u63A5\u4F7F\u7528\u4E0A\u4E00\u6B21\u6570\u636E\uFF01");
                this._showNativeAd();
                return;
            }
            Utils_1.utils.showLog("_curPosIdIndexSingleNative:" + this._curPosIdIndexSingleNative + "  #this._nativeSingleAd.length" + this._nativeSingleAd.length);
            var nativeSingleAd_1 = this._nativeSingleAd[this._curPosIdIndexSingleNative];
            if (!nativeSingleAd_1) {
                if (Utils_1.utils.config.oppoconfig.nativeSingleAdIds
                    && Utils_1.utils.config.oppoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]) {
                    Utils_1.utils.showLog("创建原生广告。 posId:" + Utils_1.utils.config.oppoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]);
                    //@ts-ignore
                    nativeSingleAd_1 = qg.createNativeAd({
                        posId: Utils_1.utils.config.oppoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]
                    });
                    if (nativeSingleAd_1) {
                        this._nativeSingleAd.push(nativeSingleAd_1);
                        nativeSingleAd_1.onLoad(function (res) {
                            if (res && res.adList && res.adList.length > 0) {
                                Utils_1.utils.showLog("原生广告资源拉取成功！");
                                Utils_1.utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                var data = res.adList[0];
                                if (_this._checkNativeDataValid(data)) {
                                    _this._singleAdCreateTime = new Date().getTime();
                                    _this._curPosIdIndexSingleNative = 0;
                                    _this._nativeData = data;
                                    _this._nativeAd = nativeSingleAd_1;
                                    // utils.showLog("callback >>>", callback);
                                    // callback(this.getNativeAdData());
                                    _this._showNativeAd();
                                    return;
                                }
                                else {
                                    Utils_1.utils.showLog("原生广告资源不合法！");
                                }
                            }
                            Utils_1.utils.showLog("原生广告资源出错！");
                            _this._curPosIdIndexSingleNative++;
                            if (_this._curPosIdIndexSingleNative < Utils_1.utils.config.oppoconfig.nativeSingleAdIds.length) {
                                _this.createNativeAd();
                            }
                            else {
                                _this._curPosIdIndexSingleNative = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("单个原生广告ID遍历完毕，无法展示！");
                            }
                        });
                        nativeSingleAd_1.onError(function (err) {
                            Utils_1.utils.showLog("原生单个广告资源拉取失败！" + err.code + err.msg);
                            _this._curPosIdIndexSingleNative++;
                            if (_this._curPosIdIndexSingleNative < Utils_1.utils.config.oppoconfig.nativeSingleAdIds.length) {
                                _this.createNativeAd();
                            }
                            else {
                                _this._curPosIdIndexSingleNative = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("单个原生广告ID遍历完毕，无法展示！");
                            }
                        });
                    }
                }
            }
            if (nativeSingleAd_1) {
                Utils_1.utils.showLog("nativeSingleAd reload");
                nativeSingleAd_1.load();
            }
            else {
                this._curPosIdIndexSingleNative++;
                if (Utils_1.utils.config.oppoconfig.nativeSingleAdIds && this._curPosIdIndexSingleNative < Utils_1.utils.config.oppoconfig.nativeSingleAdIds.length) {
                    this.createNativeAd();
                }
                else {
                    this._curPosIdIndexSingleNative = 0;
                    // 原生广告遍历完毕
                    Utils_1.utils.showLog("单个原生广告ID 遍历完毕，无法展示！");
                }
            }
        }
    };
    /**
     * 显示原生banner组件
     */
    AdAgentOPPO.prototype._showNativeBanner = function (nativeBannerAd, data) {
        if (PlatUtils_1.default.IsOPPO) {
            if (data) {
                if (cc.isValid(this._nativeBannerNode) && this._nativeBannerNode) {
                    this._nativeBannerNode.destroy();
                }
                // if (!cc.isValid(this._nativeBannerNode) || (!this._nativeBannerNode && utils.config.otherconfig.nativeBanner)) {
                this._nativeBannerNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeBanner);
                this._nativeBannerNode.position = CompatibleTool_1.default.position(cc.winSize.width / 2, this._nativeBannerNode.height * this._nativeBannerNode.scaleY / 2);
                cc.director.getScene().addChild(this._nativeBannerNode, 1000);
                // }
                if (this._nativeBannerNode) {
                    this._nativeBannerNode.active = true;
                    var nativeBanner = this._nativeBannerNode.getComponent("YZ_NativeBanner");
                    if (nativeBanner) {
                        nativeBanner.init(nativeBannerAd, data, this.getNativeBannerInfo());
                    }
                    else {
                        Utils_1.utils.showLog("NativeBanner组件不存在!");
                    }
                    this._showBannerCallBack && this._showBannerCallBack();
                    this._showBannerCallBack = null;
                }
                else {
                    Utils_1.utils.showLog("原生广告banner位没有创建！");
                }
            }
        }
    };
    /**
     * 显示原生插屏组件
     */
    AdAgentOPPO.prototype._showNativeInsert = function (nativeInsertAd, data) {
        if (PlatUtils_1.default.IsOPPO) {
            if (data) {
                if ((!cc.isValid(this._nativeInsertNode)) || !this._nativeInsertNode && Utils_1.utils.config.otherconfig.nativeInsert) {
                    Utils_1.utils.showLog("创建原生插屏广告位");
                    this._nativeInsertNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeInsert);
                    this._nativeInsertNode.position = CompatibleTool_1.default.position(cc.winSize.width / 2, cc.winSize.height / 2);
                    cc.director.getScene().addChild(this._nativeInsertNode, 999999);
                }
                if (this._nativeInsertNode) {
                    var nativeInsert = this._nativeInsertNode.getComponent("YZ_NativeInsert");
                    if (nativeInsert) {
                        this._nativeInsertAdShowCount = 0;
                        nativeInsert.init(nativeInsertAd, data);
                        this._insertLastShowTime = new Date().getTime();
                        Utils_1.utils.oppoTool.countInserShowCount();
                        Utils_1.utils.showLog("原生插屏显示成功，当前显示次数=" + Utils_1.utils.oppoTool.insertAdShowCounts);
                        var closeType = this.ServerConfig.intersititial_open_close_banner;
                        if (closeType && closeType > 0) {
                            Utils_1.utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                            this.HideBanner();
                        }
                    }
                    else {
                        Utils_1.utils.showLog("NativeInsert组件不存在!");
                    }
                }
                else {
                    Utils_1.utils.showLog("原生广告插屏位没有创建！");
                }
            }
        }
    };
    /**
     * 隐藏banner
     * @param args
     */
    AdAgentOPPO.prototype.HideSingleNativeAd = function (args) {
        if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
            this.signleNativeAd.destroy();
        }
    };
    AdAgentOPPO.prototype.ShowCloseBtnBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        Utils_1.utils.showLog("ShowCloseBtnBanner >>>>>>>>>.");
        var isMoveBtn = 0;
        var fadeInTime = 0;
        var btn = args.closeBtn;
        var winHeight = cc.winSize.height;
        btn.opacity = 0;
        if (this.ServerConfig) {
            if (this.ServerConfig.is_move_btn) {
                isMoveBtn = this.ServerConfig.is_move_btn;
            }
            if (this.ServerConfig.close_btn_fade_in_time) {
                fadeInTime = this.ServerConfig.close_btn_fade_in_time;
            }
            Utils_1.utils.showLog(isMoveBtn == 0 ? "显示banner,且按钮在上面" : "\u663E\u793ABanner,\u6309\u94AE\u5C45\u5E95\u90E8\u4E14" + isMoveBtn + "\u6BEB\u79D2\u540E\u79FB\u52A8");
            setTimeout(function () {
                Utils_1.utils.showLog("延迟调用关闭按钮的Banner >>>>");
                _this.ShowBanner(location, args);
                var adY = 240;
                Utils_1.utils.showLog('utils - adY:' + adY);
                if (adY > 0 && btn) {
                    btn.y = -(winHeight / 2 - adY) + btn.height;
                    Utils_1.utils.showLog("btnClose.y" + btn.y);
                }
            }, isMoveBtn);
            setTimeout(function () {
                btn.runAction(cc.fadeIn(0.3));
            }, fadeInTime * 1000);
        }
    };
    AdAgentOPPO.prototype._checkNativeInsertDataValid = function (data) {
        if (!data) {
            return false;
        }
        return data.title && ((data.iconUrlList && data.iconUrlList.length > 0) || (data.imgUrlList && data.imgUrlList.length > 0));
    };
    AdAgentOPPO.prototype._checkNativeDataValid = function (data) {
        if (!data) {
            return false;
        }
        return data.imgUrlList && data.imgUrlList.length;
    };
    /**
     * 验证是否显示激励插屏
     */
    AdAgentOPPO.prototype.checkRewardInsertIsShow = function () {
        var jumpList = Utils_1.utils.getRecommondGameList();
        if (Utils_1.utils.isSupportnavigateToMiniGame()) {
            if (Utils_1.utils.oppoTool
                && Utils_1.utils.oppoTool.ServerConfig
                && Utils_1.utils.oppoTool.ServerConfig.is_reward_intersititia) {
                if (Utils_1.utils.oppoTool.ServerConfig.is_reward_intersititia == "true"
                    && jumpList && jumpList.length > 0) {
                    Utils_1.utils.showLog("激励插屏显示环境验证通过！");
                    return true;
                }
                else {
                    Utils_1.utils.showLog("is_reward_intersititia 参数为false，激励插屏组件不显示！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("配置中没有is_reward_intersititia参数，激励插屏组件组件不显示！");
                return false;
            }
        }
        Utils_1.utils.showLog("当前平台不支持小程序跳转！");
        return false;
    };
    /**
    * 显示激励插屏组件
    */
    AdAgentOPPO.prototype.showRewardInsert = function () {
        Utils_1.utils.showLog("show reward");
        var self = this;
        if (!this.checkRewardInsertIsShow()) {
            self._videoCallback && self._videoCallback(false, "暂无视频广告！");
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
    AdAgentOPPO.prototype.hideRewardInsert = function () {
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
    // public ShowStatementRecomment(): cc.Node {
    //     if (PlatUtils.IsOPPO) {
    //         utils.showLog("curPosIdIndexNativeInsert:", this._curPosIdIndexNativeInser);
    //         let nativeInsertAd = this._nativeInsertAd[this._curPosIdIndexNativeInser];
    //         if (!nativeInsertAd) {
    //             if (utils.config.oppoconfig.nativeInsertIds
    //                 && utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
    //                 utils.showLog("创建原生结算页面广告。 posId:", utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
    //                 nativeInsertAd = qg.createNativeAd({
    //                     posId: utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]
    //                 });
    //                 if (nativeInsertAd) {
    //                     this._nativeInsertAd.push(nativeInsertAd);
    //                     nativeInsertAd.onLoad((res) => {
    //                         if (res && res.adList && res.adList.length > 0) {
    //                             utils.showLog("原生原生结算页面资源拉取成功！");
    //                             utils.showLog(JSON.stringify(res));
    //                             res = JSON.parse(JSON.stringify(res));
    //                             let data = res.adList[0];
    //                             if (this._checkNativeDataValid(data)) {
    //                                 this._curPosIdIndexNativeInser = 0;
    //                                 // this._showNativeInsert(nativeInsertAd, data);
    //                                 // return this.cre;
    //                             } else {
    //                                 utils.showLog("原生结算页面资源不合法！");
    //                             }
    //                         }
    //                         utils.showLog("原生结算页面资源出错！");
    //                         this._curPosIdIndexNativeInser++;
    //                         if (this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
    //                             this.ShowStatementRecomment();
    //                         } else {
    //                             this._curPosIdIndexNativeInser = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("原生结算页面遍历完毕，无法展示！");
    //                         }
    //                     });
    //                     nativeInsertAd.onError((err) => {
    //                         utils.showLog("原生结算页面资源拉取失败！", err.code, err.msg);
    //                         this._curPosIdIndexNativeInser++;
    //                         if (this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
    //                             this.ShowStatementRecomment();
    //                         } else {
    //                             this._curPosIdIndexNativeInser = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("原生结算页面遍历完毕，无法展示！");
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //         if (nativeInsertAd) {
    //             nativeInsertAd.load();
    //         } else {
    //             this._curPosIdIndexNativeInser++;
    //             if (utils.config.oppoconfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
    //                 this.ShowStatementRecomment();
    //             } else {
    //                 this._curPosIdIndexNativeInser = 0;
    //                 // 原生广告遍历完毕
    //                 utils.showLog("原生插屏广告遍历完毕，无法展示！");
    //             }
    //         }
    //     }
    //     return null;
    // }
    AdAgentOPPO.prototype.checkIsShowStatementAd = function () {
        if (Utils_1.utils.isSupportnavigateToMiniGame() && this.ServerConfig) {
            return true;
        }
        Utils_1.utils.showLog("当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
        return false;
    };
    /**
      * 创建结算页面推广组件
      */
    AdAgentOPPO.prototype.ShowStatementRecomment = function (showNativeAd) {
        if (showNativeAd === void 0) { showNativeAd = true; }
        if (this.checkIsShowStatementAd()) {
            if (!showNativeAd) {
                if (Utils_1.utils.config.otherconfig.crossWidget6) {
                    var node = cc.instantiate(Utils_1.utils.config.otherconfig.crossWidget6);
                    Utils_1.utils.showLog("只显示结算互推广告");
                    return node;
                }
                else {
                    Utils_1.utils.showLog("未找到预制体 crossWidget6, 请查看CommonUtils组件上是否赋值！");
                    return null;
                }
            }
            else {
                if (Utils_1.utils.config.otherconfig.statementRecomment) {
                    var node = cc.instantiate(Utils_1.utils.config.otherconfig.statementRecomment);
                    var statementRecomment = node.getComponent("YZ_StatementRecommentAd");
                    statementRecomment.showNativeAd = showNativeAd;
                    Utils_1.utils.showLog("显示结算互推和原生广告");
                    return node;
                }
                else {
                    Utils_1.utils.showLog("未找到预制体 StatementRecomment, 请查看CommonUtils组件上是否赋值！");
                    return null;
                }
            }
        }
        else {
            return null;
        }
    };
    AdAgentOPPO.prototype._showNativeAd = function () {
        if (this._curNativeItem && cc.isValid(this._curNativeItem.node)) {
            this._curNativeItem.init(this.getNativeAdData());
        }
    };
    /**
     * 创建结算页面推广组件
     */
    AdAgentOPPO.prototype.ShowSingleNativeAd = function (params) {
        if (Utils_1.utils.config.otherconfig.singleNativeAd) {
            if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
                this.signleNativeAd.destroy();
            }
            this.signleNativeAd = cc.instantiate(Utils_1.utils.config.otherconfig.singleNativeAd);
            var nativeItem = this.signleNativeAd.getComponent("YZ_NativeItem");
            nativeItem.showType = 2;
            nativeItem.params = params;
            this._curNativeItem = nativeItem;
            if (params && params.parent) {
                params.parent.addChild(this.signleNativeAd, cc.macro.MAX_ZINDEX);
            }
            this.createNativeAd();
            Utils_1.utils.showLog("单个原生广告创建成功！");
            return this.signleNativeAd;
        }
        else {
            Utils_1.utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
            return null;
        }
    };
    /**
     * 显示结算广告
     * @param data
     * @returns json{ type:(1:6元素互推，2:单个原生广告),node:节点}
     */
    AdAgentOPPO.prototype.showStatementAds = function (data) {
        var result = { "type": 0, "node": null };
        if (this.ServerConfig && this.ServerConfig.statement_type) {
            if (this.ServerConfig.statement_type === 4) {
                result.type = 2;
                result.node = this.ShowSingleNativeAd();
                Utils_1.utils.showLog("结算广告 >> 单个原生广告>>" + result.node.name);
            }
            else {
                this.ShowInterstitial();
            }
            return result;
            //     let isSycn = this.ServerConfig.st_sync;
            //     let node: cc.Node = null;
            //     let resType: number = 0;
            //     switch (type) {
            //         case 1:
            //             utils.showLog("结算广告 >> 只显示小游戏插屏广告");
            //             if (!this.checkInsertAdShow()) {
            //                 if (spareType && spareType > 0) {
            //                     switch (spareType) {
            //                         case 3:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 6个互推");
            //                             node = this.ShowStatementRecomment(false);
            //                             resType = 1;
            //                             break;
            //                         case 4:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 单个原生广告");
            //                             node = this.ShowSingleNativeAd();
            //                             resType = 2;
            //                             break;
            //                         case 5:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 3个互推+单个原生广告");
            //                             node = this.ShowStatementRecomment();
            //                             resType = 1;
            //                             break;
            //                     }
            //                 }
            //             } else {
            //                 this._createMiniGameInsertAd(true);
            //             }
            //             break;
            //         case 2:
            //             utils.showLog("结算广告 >> 显示插屏广告且判断优先级");
            //             if (!this.checkInsertAdShow()) {
            //                 if (spareType) {
            //                     switch (spareType) {
            //                         case 3:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 6个互推");
            //                             node = this.ShowStatementRecomment(false);
            //                             resType = 1;
            //                             break;
            //                         case 4:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 单个原生广告");
            //                             node = this.ShowSingleNativeAd();
            //                             resType = 2;
            //                             break;
            //                         case 5:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 3个互推+单个原生广告");
            //                             node = this.ShowStatementRecomment();
            //                             resType = 1;
            //                             break;
            //                     }
            //                 }
            //             } else {
            //                 this.ShowInterstitial();
            //             }
            //             break;
            //         case 3:
            //             utils.showLog("结算广告 >> 显示插屏广告+6个互推");
            //             this.ShowInterstitial();
            //             node = this.ShowStatementRecomment(false);
            //             resType = 1;
            //             break;
            //         case 4:
            //             if (isSycn && isSycn == "true") {
            //                 utils.showLog("结算广告 >> 显示插屏广告+单个原生广告");
            //                 this.ShowInterstitial();
            //                 node = this.ShowSingleNativeAd();
            //             } else {
            //                 node = this.ShowSingleNativeAd();
            //                 utils.showLog("结算广告 >> 只显示单个原生广告");
            //             }
            //             resType = 2;
            //             break;
            //         case 5:
            //             if (isSycn && isSycn == "true") {
            //                 utils.showLog("结算广告 >> 显示插屏广告+ 3个互推+单个原生广告");
            //                 this.ShowInterstitial();
            //                 node = this.ShowStatementRecomment();
            //             } else {
            //                 utils.showLog("结算广告 >> 只显示 3个互推+单个原生广告");
            //                 node = this.ShowStatementRecomment();
            //             }
            //             resType = 1;
            //             break;
            //         case 6:
            //             if (isSycn && isSycn == "true") {
            //                 utils.showLog("结算广告 >> 显示滚动互推+原生广告");
            //                 node = this.ShowStatementRecomment(true);
            //             } else {
            //                 utils.showLog("结算广告 >> 只显示滚动互推");
            //                 node = this.ShowStatementRecomment();
            //             }
            //             resType = 1;
            //             break;
            //         default:
            //             utils.showLog("非法的结算广告类型，：" + type)
            //             break;
            //     }
            //     result.type = resType;
            //     result.node = node;
            //     return result;
        }
        else {
            Utils_1.utils.showLog("没有配置结算广告！");
            return result;
        }
    };
    /**
     * 显示浮窗广告挂件
     * @param params
     * ```
     * {
     * group:string
     * left:number
     * bottom:number
     * scale:number
     * parent:cc.Node
     * }
     * ```
     * @returns 生成的组件
     */
    AdAgentOPPO.prototype.createNativeTryGameWidget = function (params) {
        if (params === void 0) { params = null; }
        if (this._nativeTryGameNode && cc.isValid(this._nativeTryGameNode)) {
            this._nativeTryGameNode.destroy();
        }
        var node = cc.instantiate(Utils_1.utils.config.otherconfig.nativeTryGameWidget);
        if (node) {
            this._nativeTryGameNode = node;
            this._nativeTryGameNode.zIndex = 9999;
        }
        node = this._nativeTryGameNode;
        var widget = node.getComponent(cc.Widget);
        if (params) {
            if (params.group) {
                node.group = params.group;
            }
            if (params.scale != null) {
                node.scale = params.scale;
            }
            if (params.top != null) {
                widget.isAlignTop = true;
                widget.isAlignBottom = false;
                widget.top = params.top;
            }
            else if (params.bottom != null) {
                widget.isAlignTop = false;
                widget.isAlignBottom = true;
                widget.bottom = params.bottom;
            }
            if (params.left != null) {
                widget.isAlignLeft = true;
                widget.isAlignRight = false;
                widget.left = params.left;
            }
            else if (params.right != null) {
                widget.isAlignLeft = false;
                widget.isAlignRight = true;
                widget.right = params.right;
            }
            if (params.parent != null) {
                node.parent = params.parent;
            }
        }
        widget.updateAlignment();
        node.active = true;
        if (this._nativeTryGameNode) {
            this._nativeTryGameNode.getComponent(NativeTryGamesWidget_1.default).init();
        }
    };
    /**
     * 隐藏浮动试玩挂件
     */
    AdAgentOPPO.prototype.hideNativeTryGameWidget = function () {
        if (this._nativeTryGameNode && cc.isValid(this._nativeTryGameNode)) {
            this._nativeTryGameNode.destroy();
        }
    };
    /**
     * 是否支持原生模版广告
     * @returns
     */
    AdAgentOPPO.prototype.canShowNativeTemplateAd = function () {
        //@ts-ignore
        return qg.createCustomAd;
    };
    /**
     * 获取原生模版广告对象
     * @param type 广告类型：1:banner 2:插屏
     * @param id  广告ID
     */
    AdAgentOPPO.prototype.getNativeTemplateAdStyle = function (type) {
        var style = {};
        var systemInfo = Utils_1.utils.oppoTool.SysInfo;
        switch (type) {
            case 1:
                style.width = "";
                style.top = "";
                style.left = "";
                break;
            case 2:
                style.width = "";
                style.top = (systemInfo.screenHeight - 400) / 2;
                style.left = "";
                break;
        }
        return style;
    };
    /**
     * 创建原生模版Banner广告
     * @param index
     * @returns
     */
    AdAgentOPPO.prototype._createNativeTemplateBannerAd = function (index) {
        var _this = this;
        Utils_1.utils.showLog("_createNativeTemplateBannerAd : #index=" + index);
        YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
        if (!this.canShowNativeTemplateAd()) {
            Utils_1.utils.showLog("当前快应用版本不支持原生模版广告！");
            return;
        }
        if (index < Utils_1.utils.config.oppoconfig.bannerAdConfigs.length) {
            //@ts-ignore
            this.nativeTemplateBannerAd = qg.createCustomAd({
                adUnitId: Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id,
                style: this.getNativeTemplateAdStyle(1)
            });
            this.nativeTemplateBannerAd.onLoad(function () {
                _this.nativeTemplateBannerAd.offLoad();
                Utils_1.utils.showLog("NativeTemplateBannerAd 广告加载成功");
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
            });
            this.nativeTemplateBannerAd.onError(function (err) {
                _this.nativeTemplateBannerAd.offError();
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.REQUEST_FAIL, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                Utils_1.utils.showLog("NativeTemplateBannerAd 广告异常：#erro=" + JSON.stringify(err));
                if (_this._nativeIsClose) {
                    Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                    YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                    return;
                }
                var bannerInfo = _this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_FAIL);
                    Utils_1.utils.showLog(">>>>>服务器配置不显示备用广告！");
                    return;
                }
                _this.ShowBannerByConfigs(index + 1);
            });
            this.nativeTemplateBannerAd
                .show()
                .then(function () {
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.bannerAdConfigs[index].id));
                YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.NATIVE_TEMPLATE_BANNER, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_SUCCESS);
                _this.nativeTemplateBannerAd.offShow();
                Utils_1.utils.showLog("NativeTemplateBannerAd show success");
                _this.hideBanner("template");
            })
                .catch(function (error) {
                Utils_1.utils.showLog("NativeTemplateBannerAd show fail with:" + error.errCode + "," + error.errMsg);
            });
        }
    };
    /**
     * 隐藏原生模版Banner
     */
    AdAgentOPPO.prototype.hideNativeTemplateBannerAd = function () {
        Utils_1.utils.showLog("hideNativeTemplateBannerAd ");
        this.nativeTemplateBannerAd && this.nativeTemplateBannerAd.destroy();
        this.nativeTemplateBannerAd = null;
    };
    /**
     * 创建原生模版插屏广告
     * @param index
     * @returns
     */
    AdAgentOPPO.prototype._createNativeTemplateIntersitialAd = function (index) {
        var _this = this;
        Utils_1.utils.showLog("_createNativeTemplateIntersitialAd : #index=" + index);
        if (!this.canShowNativeTemplateAd()) {
            Utils_1.utils.showLog("当前快应用版本不支持原生模版广告！");
            return;
        }
        if (index < Utils_1.utils.config.oppoconfig.intersitialAdConfigs.length) {
            Utils_1.utils.showLog("nativetemplate style=" + this.getNativeTemplateAdStyle(2));
            //@ts-ignore
            var customAd = qg.createCustomAd({
                adUnitId: Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id,
                style: this.getNativeTemplateAdStyle(2)
            });
            customAd.onLoad(function () {
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.REQUEST_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
                Utils_1.utils.showLog("NativeTemplateIntersitialAd 广告加载成功");
            });
            customAd.onError(function (err) {
                Utils_1.utils.showLog("NativeTemplateIntersitialAd 广告异常：" + +JSON.stringify(err));
                _this.ShowInterstitialByConfigs(index + 1);
            });
            customAd
                .show()
                .then(function () {
                Utils_1.utils.showLog("NativeTemplateIntersitialAd show success");
                _this._insertLastShowTime = new Date().getTime();
                var closeType = _this.ServerConfig.intersititial_open_close_banner;
                if (closeType && closeType > 0) {
                    Utils_1.utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                    _this.HideBanner();
                }
                YouWanAnalytics_1.default.EventAd(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.AD_ID_REQUEST_SUCCESS);
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.INTERSITITIAL, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(Utils_1.utils.config.oppoconfig.intersitialAdConfigs[index].id));
            })
                .catch(function (error) {
                Utils_1.utils.showLog("NativeTemplateIntersitialAd show fail with:" + error.errCode + "," + error.errMsg);
            });
        }
    };
    AdAgentOPPO.prototype.GameExit = function () { };
    AdAgentOPPO.prototype.Share = function () { };
    AdAgentOPPO = __decorate([
        ccclass
    ], AdAgentOPPO);
    return AdAgentOPPO;
}(AdAgent_1.default));
exports.default = AdAgentOPPO;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudE9QUE8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUErQztBQUMvQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBR2hDLHlEQUFvRDtBQUVwRCwrREFBMEQ7QUFHMUQsbURBQThDO0FBQzlDLCtEQUEwRDtBQUMxRCx1REFBaUY7QUFFM0UsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQU87SUFBaEQ7UUFBQSxxRUFnMkVDO1FBOTFFRyxlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixxQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUM1QixxQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUM1QixxQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUM1QixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBRXRCLGNBQWM7UUFDZCxlQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLFlBQVk7UUFDWixnQ0FBMEIsR0FBVyxDQUFDLENBQUM7UUFDdkMsK0JBQXlCLEdBQVcsQ0FBQyxDQUFDO1FBQ3RDLGdDQUEwQixHQUFXLENBQUMsQ0FBQztRQUV2QyxpQkFBVyxHQUFRLElBQUksQ0FBQztRQUN4Qix1QkFBaUIsR0FBUSxJQUFJLENBQUM7UUFDOUIsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLHVCQUFpQixHQUFZLElBQUksQ0FBQztRQUVsQyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3Qix1QkFB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QUNELEtBQUssQ0FBQyxVQUFDLEtBQUs7Z0JBQ1QsYUFBSyxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEcsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFTSw4QkFBUSxHQUFmLGNBQW9CLENBQUM7SUFFZCwyQkFBSyxHQUFaLGNBQWlCLENBQUM7SUEvMUVELFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FnMkUvQjtJQUFELGtCQUFDO0NBaDJFRCxBQWcyRUMsQ0FoMkV3QyxpQkFBTyxHQWcyRS9DO2tCQWgyRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUmV3YXJkSW5zZXJ0IGZyb20gXCIuL1Jld2FyZEluc2VydFwiO1xyXG5pbXBvcnQgWVpfU3RhdGVtZW50UmVjb21tZW50QWQgZnJvbSBcIi4vWVpfU3RhdGVtZW50UmVjb21tZW50QWRcIjtcclxuaW1wb3J0IFlaX05hdGl2ZUFkT2JqZWN0IGZyb20gXCIuL1laX05hdGl2ZUFkT2JqZWN0XCI7XHJcbmltcG9ydCBZWl9OYXRpdmVJdGVtIGZyb20gXCIuL1laX05hdGl2ZUl0ZW1cIjtcclxuaW1wb3J0IE5hdGl2ZVRyeUdhbWVzV2lkZ2V0IGZyb20gXCIuL05hdGl2ZVRyeUdhbWVzV2lkZ2V0XCI7XHJcbmltcG9ydCBZWl9OYXRpdmVCYW5uZXIgZnJvbSBcIi4vWVpfTmF0aXZlQmFubmVyXCI7XHJcbmltcG9ydCB7IEJhbm5lcklkSW5mbywgTmF0aXZlQmFubmVySW5mbyB9IGZyb20gXCIuL0NvbW1vbkNvbmZpZ1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuaW1wb3J0IFlvdVdhbkFuYWx5dGljcyBmcm9tIFwiLi9Zb3VXYW5TREsvWW91V2FuQW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7IEFkRXZlbnRQYXJhbWV0ZXIsIFl3QWRTdGF0dXMsIFl3QWRUeXBlIH0gZnJvbSBcIi4vWW91V2FuU0RLL0V2ZW50QWRJbmZvXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRBZ2VudE9QUE8gZXh0ZW5kcyBBZEFnZW50IHtcclxuXHJcbiAgICBfYmFubmVyQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfaW5zZXJ0QWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9BZDogYW55ID0gbnVsbDtcclxuICAgIF9uYXRpdmVCYW5uZXJBZDogYW55W10gPSBbXTtcclxuICAgIF9uYXRpdmVJbnNlcnRBZDogYW55W10gPSBbXTtcclxuICAgIF9uYXRpdmVTaW5nbGVBZDogYW55W10gPSBbXTtcclxuICAgIF9uYXRpdmVBZDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyDlub/lkYrnu4Tku7bmmK/lkKbliJ3lp4vljJbmiJDlip9cclxuICAgIF9pc0FkSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9pc0Jhbm5lclNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc0luc2VydFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvLyDlvZPliY3kvY3nva5pZOeahOe0ouW8lVxyXG4gICAgX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXI6IG51bWJlciA9IDA7XHJcbiAgICBfY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyOiBudW1iZXIgPSAwO1xyXG4gICAgX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX25hdGl2ZURhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfbmF0aXZlSW5zZXJ0RGF0YTogYW55ID0gbnVsbDtcclxuICAgIF9uYXRpdmVCYW5uZXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9uYXRpdmVJbnNlcnROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX3ZpZGVvTG9hZGVkOiBib29sZWFuID0gbnVsbDtcclxuXHJcbiAgICBfbWluaUJhbm5lckhlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfc2hvd0Jhbm5lckNhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgX25hdGl2ZUFkT2JqZWN0OiBZWl9OYXRpdmVBZE9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgLy/mj5LlsY/mmL7npLrmrKHmlbBcclxuICAgIF9pbnNlcnRTaG93Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX2luc2VydExhc3RTaG93VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfY3VyTmF0aXZlSXRlbTogWVpfTmF0aXZlSXRlbSA9IG51bGw7XHJcblxyXG4gICAgX2lzTmF0aXZlQmFubmVyU2hvdzogYm9vbGVhbiA9IGZhbHNlOyAvL+WOn+eUn+W5v+WRiuWxleekuu+8jOiwg+eUqOeahOmakOiXj1xyXG5cclxuICAgIGxhc3RMYXN0U2hvd1ZpZGVvVGltZTogbnVtYmVyID0gMDsgLy/mnIDlkI7kuIDmrKHmmL7npLrop4bpopHml7bpl7RcclxuXHJcblxyXG5cclxuICAgIF9iYW5uZXJIaWRlQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY2FuU2hvd05hdGl2ZUJhbm5lciA9IHRydWU7IC8v5Y6f55SfYmFubmVy5piv5ZCm5bGV56S6XHJcblxyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sICYmIHV0aWxzLm9wcG9Ub29sLlNlcnZlckNvbmZpZykgcmV0dXJuIHV0aWxzLm9wcG9Ub29sLlNlcnZlckNvbmZpZztcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgX25hdGl2ZUJhbm5lckluZm86IE5hdGl2ZUJhbm5lckluZm8gPSBudWxsO1xyXG5cclxuICAgIHNob3dfYWRfYnlfY29uZmlnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmNYmFubmVy6YWN572uXHJcbiAgICAgKi9cclxuICAgIGdldE5hdGl2ZUJhbm5lckluZm8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUJhbm5lckluZm8gJiYgdGhpcy5fbmF0aXZlQmFubmVySW5mby5sb2NhdGlvbiA9PSB0aGlzLl9jdXJMb2NhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQmFubmVySW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmdldE5hdGl2ZUJhbm5lckluZm8odGhpcy5fY3VyTG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPICYmIHV0aWxzLm9wcG9Ub29sICYmIHV0aWxzLm9wcG9Ub29sLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTAzMVwiKSkge1xyXG5cclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bm/5ZGK5Luj55CG57uE5Lu25Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy5pbml0QWRTZXJ2aWNlKHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBJZDogdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYXBwSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNEZWJ1ZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj+W5v+WRiue7hOS7tuWIneWni+WMluaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2lzQWRJbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5faW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiP5bm/5ZGK57uE5Lu25Yid5aeL5YyW5aSx6LSlIDpcIiArIHJlcy5jb2RlICsgcmVzLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIF9uYXRpdmVJc0Nsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcklkOiBudW1iZXIgPSAwO1xyXG4gICAgX2RlbGF5U2hvd0Jhbm5lcklkOiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICAvLyBuYmNscjrmmK/lkKblvIDlkK/lvLrliLbliLfmlrBcclxuXHJcbiAgICAvL+W9k+WJjeaYvuekukJhbm5lcueahOS9jee9rlxyXG4gICAgX2N1ckxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLk5vbmU7XHJcbiAgICBfaXNUaW1lUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy/lkK/liqjlrprml7blmajnmoTml7bpl7RcclxuICAgIF9zdGFydEJhbm5lclRpbWVyVGFzazogbnVtYmVyID0gMDtcclxuICAgIF9zaG93QmFubmVyQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgU2hvd0Jhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBudWxsLCBhcmdzOiBhbnkgPSBudWxsLCBpc1RpbWVSZWZyZXNoOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyq6K+35rGC5Yiw6YWN572u5paH5Lu277yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDb3VudCsrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBvbGRMb2NhdGlvbiA9IHRoaXMuX2N1ckxvY2F0aW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY3VyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2lzVGltZVJlZnJlc2ggPSBpc1RpbWVSZWZyZXNoO1xyXG4gICAgICAgICAgICAvL+WmguaenOi3s+eUqOS9jee9ruWIh+aNouS5i+WQju+8jOmqjOivgeaYr+S4jeaYr+mAmui/h+WumuaXtuWZqOW8uuWItuWIt+aWsOaVsOaNru+8jOS4jeaYr+WImeWFiOmakOiXj2Jhbm5lclxyXG4gICAgICAgICAgICBpZiAob2xkTG9jYXRpb24gIT0gbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbGV0IHJlZnJlc2hfYWRfdGltZTogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9zdGFydEJhbm5lclRpbWVyVGFzaykgLyAxMDAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IGludGVydmFsID0gdGhpcy5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lO1xyXG4gICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwiaXNUaW1lUmVmcmVzaD1cIiArIGlzVGltZVJlZnJlc2gpO1xyXG4gICAgICAgICAgICBpZiAoYXJncyAmJiBhcmdzLmlzUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgaXNUaW1lUmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgJiYgaW50ZXJ2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVmcmVzaF9hZF90aW1lID4gaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpbWVSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWQoWXdBZFR5cGUuQkFOTkVSLCBZd0FkU3RhdHVzLkFEX0lEX1JFUVVFU1QpO1xyXG4gICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwiaXNUaW1lUmVmcmVzaD1cIiArIGlzVGltZVJlZnJlc2gpO1xyXG5cclxuICAgICAgICAgICAgLy8g5Yik5pat5b2T5YmN5L2N572u5piv5LiN5piv5pi+56S6YmFubmVyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5pc19zaG93X2Jhbm5lciA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9rumFjee9ruS4uuS4jeWxleekumJhbm5lciFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmlzX3Nob3dfcmVjID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5L2N572u5pi+56S65LqS5o6oYmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sLmNhblNob3dSZWNvbW1lbmQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLm9wcG9Ub29sLnNob3dPcHBvUmVjQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgeS6kuaOqGJhbm5lclwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNUaW1lUmVmcmVzaCAmJiAhdGhpcy5zaG93X2FkX2J5X2NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5uYmNsciAmJiB0aGlzLlNlcnZlckNvbmZpZy5uYmNsciA9PSBcInRydWVcIiAmJiB0aGlzLl9jdXJOYXRpdmVCYW5uZXJJbmZvLm5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7lrprml7blmajliLfmlrDmlbDmja4gXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5Y6f55SfYmFubmVy5bu26L+f5pi+56S6JHt0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5kZWxheV9zaG93X3RpbWV956eSYCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlTaG93QmFubmVySWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbGF5U2hvd0Jhbm5lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlQmFubmVyKHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8ubmF0aXZlQmFubmVyQWQsIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmRlbGF5X3Nob3dfdGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5ZCv5a6a5pe25Yi35pawID4+Pj4+Pj4+PlwiICsgKGludGVydmFsIC0gcmVmcmVzaF9hZF90aW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5a6a5pe2JHtpbnRlcnZhbH3np5LosIPnlKhzaG93YmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIodGhpcy5fY3VyTG9jYXRpb24sIHt9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGludGVydmFsIC0gcmVmcmVzaF9hZF90aW1lKSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FuU2hvd05hdGl2ZUJhbm5lciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUlzQ2xvc2UgPSBmYWxzZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RlbGF5U2hvd0Jhbm5lcklkKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua4heeQhuWumuaXtuWZqFwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJ2YWwgJiYgaW50ZXJ2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWQr+WumuaXtuWIt+aWsCA+Pj4+Pj4+Pj5cIiArIGludGVydmFsKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWumuaXtiR7aW50ZXJ2YWx956eS6LCD55Soc2hvd2Jhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIodGhpcy5fY3VyTG9jYXRpb24sIHt9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBpbnRlcnZhbCAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dfYWRfYnlfY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyQnlDb25maWdzKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwibmF0aXZlXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWOn+eUn0Jhbm5lcuW5v+WRiiFcIiArIGlzVGltZVJlZnJlc2ggKyBcIiA8PDw8XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzVGltZVJlZnJlc2gpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDljp/nlJ9iYW5uZXLlu7bov5/mmL7npLoke3RoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmRlbGF5X3Nob3dfdGltZX3np5JgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsYXlTaG93QmFubmVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmRlbGF5X3Nob3dfdGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWwj+a4uOaIj0Jhbm5lcuW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumFjee9ruaVsOaNruS4reayoeaciSBiYW5uZXJfZmlyc3RfYWQg5a2X5q6177yMIGJhbm5lcuW5v+WRiuS4jeaYvuekuiFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVNaW5pR2FtZUJhbm5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA1MFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumUgOavgeWwj+a4uOaIj0Jhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lsI/muLjmiI/lubPlj7DlsI/kuo4xMDUx77yM5Y+q6IO96ZqQ6JeP5bCP5ri45oiPQmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGlkZU5hdGl2ZUJhbm5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5Y6f55SfQmFubmVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVCYW5uZXIodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkZWZhdWx0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXRpdmVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIC8v6ZqQ6JeP6Ieq5a6a5LmJYmFubmVyXHJcbiAgICAgICAgICAgICAgICB1dGlscy5oaWRlUmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5hdGl2ZVRlbXBsYXRlQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgIC8v6ZqQ6JeP5LqS5o6oYmFubmVyXHJcbiAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbCAmJiB1dGlscy5vcHBvVG9vbC5fcmVjX2lzX2Jhbm5lciAmJiB1dGlscy5vcHBvVG9vbC5oaWRlT3Bwb1JlY0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJuYXRpdmVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1pbmlHYW1lQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAvL+makOiXj+iHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgdXRpbHMuaGlkZVJlY29tbWVuZEdhbWVzQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXRpdmVUZW1wbGF0ZUJhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAvL+makOiXj+S6kuaOqGJhbm5lclxyXG4gICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wgJiYgdXRpbHMub3Bwb1Rvb2wuX3JlY19pc19iYW5uZXIgJiYgdXRpbHMub3Bwb1Rvb2wuaGlkZU9wcG9SZWNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidGVtcGxhdGVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1pbmlHYW1lQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXRpdmVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIC8v6ZqQ6JeP6Ieq5a6a5LmJYmFubmVyXHJcbiAgICAgICAgICAgICAgICB1dGlscy5oaWRlUmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIC8v6ZqQ6JeP5LqS5o6oYmFubmVyXHJcbiAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbCAmJiB1dGlscy5vcHBvVG9vbC5fcmVjX2lzX2Jhbm5lciAmJiB1dGlscy5vcHBvVG9vbC5oaWRlT3Bwb1JlY0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyZWNcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1pbmlHYW1lQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXRpdmVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIC8v6ZqQ6JeP6Ieq5a6a5LmJYmFubmVyXHJcbiAgICAgICAgICAgICAgICB1dGlscy5oaWRlUmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5hdGl2ZVRlbXBsYXRlQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTWluaUdhbWVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5hdGl2ZUJhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgLy/pmpDol4/oh6rlrprkuYliYW5uZXJcclxuICAgICAgICAgICAgICAgIHV0aWxzLmhpZGVSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTmF0aXZlVGVtcGxhdGVCYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wgJiYgdXRpbHMub3Bwb1Rvb2wuX3JlY19pc19iYW5uZXIgJiYgdXRpbHMub3Bwb1Rvb2wuaGlkZU9wcG9SZWNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG5cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RlbGF5U2hvd0Jhbm5lcklkKTtcclxuICAgICAgICAgICAgdGhpcy5faXNCYW5uZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUlzQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhblNob3dOYXRpdmVCYW5uZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQmFubmVyKFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5b+r5ri45oiP55qEYmFubmVyXHJcbiAgICAgKi9cclxuICAgIGhpZGVLeXhCYW5uZXIoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlQmFubmVyKFwicmVjXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeUdhbWVBZEFycjogYW55W10gPSBbXTtcclxuICAgIHB1YmxpYyBzaG93TmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65Y6f55Sf5oqW5Yqo6K+V546pIG5hdGl2ZU5lZWRDaGFuZ2U9XCIsIHV0aWxzLm5hdGl2ZU5lZWRDaGFuZ2UsIFwiICB1dGlscy50cnlHYW1lRGF0ZVwiLCB1dGlscy50cnlHYW1lRGF0ZSwgXCJ1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVUcnlHYW1lSWRzXCIsIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMpXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5uYXRpdmVOZWVkQ2hhbmdlIHx8ICF1dGlscy50cnlHYW1lRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlVHJ5R2FtZUlkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImxlbjpcIiArIGxlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudHJ5R2FtZUFkQXJyW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zSWQgPSB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVUcnlHYW1lSWRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+aKluWKqOivleeOqeW5v+WRiu+8jCBwb3NJZDpcIiArIHBvc0lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyeUdhbWVBZCA9IHFnLmNyZWF0ZU5hdGl2ZUFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NJZDogcG9zSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnlHYW1lQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlHYW1lQWQub25Mb2FkKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMubmF0aXZlTmVlZENoYW5nZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWRJZCA9IHJlcy5hZExpc3RbMF0uYWRJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImFkSWQ6XCIgKyBhZElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMudHJ5R2FtZURhdGUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZElkID09IGVsZW1lbnQuZGF0ZVswXS5hZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbkFkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuQWRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMudHJ5R2FtZURhdGUucHVzaCh7IFwidHJ5R2FtZUFkXCI6IHRyeUdhbWVBZCwgXCJkYXRlXCI6IHJlcy5hZExpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLl9uYXRpdmVUcnlHYW1lTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5fbmF0aXZlVHJ5R2FtZU5vZGUuZ2V0Q29tcG9uZW50KE5hdGl2ZVRyeUdhbWVzV2lkZ2V0KS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aKluWKqOivleWujOW5v+WRiui1hOa6kOaLieWPluaIkOWKn++8jOaYr+WQpuWPr+S7pea3u+WKoOW5v+WRilwiICsgY2FuQWRkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlHYW1lQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mipbliqjlub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLm5hdGl2ZU5lZWRDaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeUdhbWVBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlHYW1lQWRBcnJbaV0gPSB0cnlHYW1lQWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUdhbWVBZEFycltpXS5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H6YWN572u5bGV56S65o+S5bGPXHJcbiAgICAgKiBAcGFyYW0gaW5kZXgg57Si5byVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsQnlDb25maWdzKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiU2hvd0ludGVyc3RpdGlhbEJ5Q29uZmlncyAgaW5kZXg9XCIgKyBpbmRleCArIFwiICNjb25maWdzTGVuZ3RoPVwiICsgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3MubGVuZ3RoKTtcclxuICAgICAgICBpZiAoaW5kZXggPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IGFkSW5mbzogYW55ID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiU2hvd0ludGVyc3RpdGlhbEJ5Q29uZmlncyBhZEluZm86XCIgKyBKU09OLnN0cmluZ2lmeShhZEluZm8pKTtcclxuICAgICAgICAgICAgc3dpdGNoIChhZEluZm8udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRlZmF1bHRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkQnlDb25maWcoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm5hdGl2ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkQnlDb25maWcoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlbXBsYXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlVGVtcGxhdGVJbnRlcnNpdGlhbEFkKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkKFl3QWRUeXBlLklOVEVSU0lUSVRJQUwsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9GQUlMKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lsZXnpLrlpLHotKXvvIzmiYDmnInlub/lkYrnsbvlnovpg73mnKror7fmsYLliLDlub/lkYrvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H57Si5byV5bGV56S6QmFubmVyXHJcbiAgICAgKiBAcGFyYW0gaW5kZXgg57Si5byVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93QmFubmVyQnlDb25maWdzKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiU2hvd0Jhbm5lckJ5Q29uZmlncyAgaW5kZXg9XCIgKyBpbmRleCArIFwiICNjb25maWdzTGVuZ3RoPVwiICsgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgYWRJbmZvOiBhbnkgPSB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJBZENvbmZpZ3NbaW5kZXhdO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiU2hvd0Jhbm5lckJ5Q29uZmlncyBhZEluZm86XCIgKyBKU09OLnN0cmluZ2lmeShhZEluZm8pKTtcclxuICAgICAgICAgICAgc3dpdGNoIChhZEluZm8udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRlZmF1bHRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkQnlDb25maWdzKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJuYXRpdmVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZEJ5Q29uZmlncyhpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidGVtcGxhdGVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVUZW1wbGF0ZUJhbm5lckFkKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkKFl3QWRUeXBlLkJBTk5FUiwgWXdBZFN0YXR1cy5BRF9JRF9SRVFVRVNUX0ZBSUwpO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkJhbm5lcuWxleekuuWksei0pe+8jOaJgOacieW5v+WRiuexu+Wei+mDveacquivt+axguWIsOW5v+WRiu+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dJbnRlcnN0aXRpYWwobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja0luc2VydEFkU2hvdygpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLkFEX0lEX1JFUVVFU1QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dfYWRfYnlfY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsQnlDb25maWdzKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24gJiYgbG9jYXRpb24gPT0gQmFubmVyTG9jYXRpb24uUGF1c2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmoLlgZznlYzpnaLkuI3lu7bml7blsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrljp/nlJ/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVJbnNlcnRBZFNob3dDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBuYXRpdmVJbnNlckFkRGVsYXlDYWxsKCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYo6IOW9k+WJjeeCueWHu+asoeaVsD1cIiArIHV0aWxzLm9wcG9Ub29sLk5hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcyArIFwiOyDngrnlh7vmrKHmlbDpmZDliLY9XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xpY2tfY291bnQgKyBcIjsg5bGV56S65qyh5pWw6Ze06ZqUPVwiICsgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Nob3dfaW50ZXJ2YWwgKyBcIjsg5bGV56S657Sv6K6hPVwiICsgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQpO1xyXG4gICAgICAgIGlmICh1dGlscy5vcHBvVG9vbC5OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMgPj0gKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbGlja19jb3VudCB8fCAwKSkge1xyXG4gICAgICAgICAgICAvLyDmr4/ml6Xngrnlh7vmrKHmlbDliLDovr7kuIrpmZDvvIzpmZDliLblsZXnpLrmrKHmlbBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUluc2VydEFkU2hvd0NvdW50ID49ICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfc2hvd19pbnRlcnZhbCB8fCAwKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+v5Lul5bGV56S6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZCh0aGlzLl9zaG93TmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOS4jeiDveWxleekulxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMubGFzdExhc3RTaG93VmlkZW9UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCA8IDQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopHlub/lkYror7fmsYLpl7TpmpTlsI/kuo4056eSLOebtOaOpei/lOWbnmZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZykge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja1Jld2FyZEluc2VydElzU2hvdygpICYmIHV0aWxzLm9wcG9Ub29sXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLnJld2FyZF9maXJzdF9hZCAmJiB1dGlscy5vcHBvVG9vbC5TZXJ2ZXJDb25maWcucmV3YXJkX2ZpcnN0X2FkICE9IFwidmlkZW9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI8PDzmnI3liqHlmajpu5jorqTkvJjlhYjlsZXnpLrmv4DlirHmj5LlsY8+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmV3YXJkSW5zZXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA0MFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VmlkZW9BZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQgJiYgdGhpcy5fdmlkZW9Mb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5SRVdBUkRfVklERU8sIFl3QWRTdGF0dXMuU0hPV19TVUNDRVNTLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy52aWRlb0lkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLlJFV0FSRF9WSURFTywgWXdBZFN0YXR1cy5SRVFVRVNULCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy52aWRlb0lkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93UmV3YXJkSW5zZXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFZpZGVvQWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy52aWRlb0lkKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQgPSBxZy5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy52aWRlb0lkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJbms6jlhozop4bpopHlm57osIMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5SRVdBUkRfVklERU8sIFl3QWRTdGF0dXMuUkVRVUVTVCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcudmlkZW9JZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5SRVdBUkRfVklERU8sIFl3QWRTdGF0dXMuUkVRVUVTVF9TVUNDRVNTLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy52aWRlb0lkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuUkVXQVJEX1ZJREVPLCBZd0FkU3RhdHVzLlJFUVVFU1RfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcudmlkZW9JZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeWHuumUmTogXCIgKyBlcnIuY29kZSArIGVyci5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkNsb3NlKChyZXMpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuUkVXQVJEX1ZJREVPLCBZd0FkU3RhdHVzLlJFUVVFU1QsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnZpZGVvSWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlu7bov58z56eS6YeN5paw5Yqg6L296KeG6aKR5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0TGFzdFNob3dWaWRlb1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a/gOWKseinhumikeW5v+WRiuWujOaIkO+8jOWPkeaUvuWlluWKsScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLlJFV0FSRF9WSURFTywgWXdBZFN0YXR1cy5SRVdBUkRfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcudmlkZW9JZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a/gOWKseinhumikeW5v+WRiuWPlua2iOWFs+mXre+8jOS4jeWPkeaUvuWlluWKsScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLlJFV0FSRF9WSURFTywgWXdBZFN0YXR1cy5SRVdBUkRfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcudmlkZW9JZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLop4LnnIvlrozop4bpopHmiY3og73ojrflvpflpZblirEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5bm/5ZGKSWTphY3nva7plJnor68hXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmqjOivgeaPkuWxj+aYr+WQpuiDveWxleekulxyXG4gICAgICogMeOAgeasoeaVsOmZkOWItiDpu5jorqTmr4/ml6U45qyhXHJcbiAgICAgKiAy44CB5pe26Ze06ZmQ5Yi2IOm7mOiupDYw56eSXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tJbnNlcnRBZFNob3coKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1heFNob3dDb3VudCA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfbWF4X3Nob3dfY291bnQ7XHJcbiAgICAgICAgbGV0IGludGVydmFsVGltZSA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfaW50ZXJ2YWxfdGltZTtcclxuICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2luc2VydExhc3RTaG93VGltZSkgLyAxMDAwO1xyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQT+acjeWKoeWZqOaPkuWxj+acgOWkp+aYvuekuuasoeaVsOS4uu+8mlwiICsgbWF4U2hvd0NvdW50ICsgXCIs6Ze06ZqU5pi+56S65pe26Ze05Li677yaXCIgKyBpbnRlcnZhbFRpbWUgKyBcIuenku+8gVwiKTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQT+aPkuWxj+W9k+WJjeW5v+WRiuaYvuekuuasoeaVsO+8mlwiICsgdXRpbHMub3Bwb1Rvb2wuaW5zZXJ0QWRTaG93Q291bnRzICsgXCLmrKHvvIzpl7TpmpTml7bpl7TvvJpcIiArIGludGVydmFsICsgXCLnp5LvvIFcIik7XHJcbiAgICAgICAgaWYgKG1heFNob3dDb3VudCA+IDAgJiYgdXRpbHMub3Bwb1Rvb2wuaW5zZXJ0QWRTaG93Q291bnRzID49IG1heFNob3dDb3VudCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQT+aPkuWxj+W5v+WRiuaYvuekuueahOasoeaVsOi+vuWIsFwiICsgbWF4U2hvd0NvdW50ICsgXCLmrKHjgILmj5LlsY/kuI3mmL7npLpcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnRlcnZhbFRpbWUgPiAwICYmIGludGVydmFsIDwgaW50ZXJ2YWxUaW1lKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBP5o+S5bGP5bm/5ZGK5pi+56S655qE6Ze06ZqU5bCR5LqOXCIgKyBpbnRlcnZhbFRpbWUgKyBcIuenkuOAguaPkuWxj+S4jeaYvuekulwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HmmK/lkKbnrKzkuIDmrKHliJvlu7rmj5LlsY9cclxuICAgICAqL1xyXG4gICAgbWluaUluc2VyQWRJc0NyZWF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDliJvlu7rlsI/nqIvluo/mj5LlsY/lub/lkYpcclxuICAgIC8vICAqIEBwYXJhbSBpc1VuaXF1ZSDmmK/lkKbllK/kuIDlsZXnpLog5LiN6L2u6K+i5pi+56S65Y6f55SfXHJcbiAgICAvLyAgKi9cclxuICAgIF9jcmVhdGVNaW5pR2FtZUluc2VydEFkKGlzVW5pcXVlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0luc2VydFNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQWRJbml0XHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW5zZXJ0SWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGxldCBfaW5zZXJ0QWQgPSBxZy5jcmVhdGVJbnNlcnRBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmluc2VydElkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2luc2VydEFkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLms6jlhozlsI/muLjmiI/mj5LlsY/lub/lkYrlm57osIPvvIFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGVhckNhbGxCYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9mZkxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9uRXJyb3IoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiP5o+S5bGP5bm/5ZGK5Ye66ZSZOlwiICsgZXJyLmNvZGUgKyBlcnIubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW5zZXJ0U2hvdyAmJiAhaXNVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnNlcnRTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+aYvuekuuWOn+eUn+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9uTG9hZCgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/nqIvluo/mj5LlsY/lub/lkYrliqDovb3miJDlip8hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNJbnNlcnRTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luc2VydFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbnNlcnRBZC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vblNob3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5zZXJ0U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wuY291bnRJbnNlclNob3dDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0TGFzdFNob3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VUeXBlID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9vcGVuX2Nsb3NlX2Jhbm5lcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZVR5cGUgJiYgY2xvc2VUeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOmFjee9ruW9k+WJjeaPkuWxj+aYvuekuuaIkOWKn+WQjlwiICsgKGNsb3NlVHlwZSA9PSAxID8gXCLplIDmr4FcIiA6IFwi6ZqQ6JePXCIpICsgXCJiYW5uZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIF9pbnNlcnRBZC5vZmZMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsZWFyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9uU2hvdygoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/muLjmiI/mj5LlsY/lub/lkYrmmL7npLrmiJDlip/vvIEgIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gX2luc2VydEFkLm9mZlNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOesrOS4gOasoeiwg+eUqOS4jemcgOimgeaJi+WKqGxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWluaUluc2VyQWRJc0NyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbmlJbnNlckFkSXNDcmVhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pbnNlcnRBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIV9pbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBP5bCP5ri45oiP5o+S5bGP5bm/5ZGK5Yib5bu65aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiICYmICFpc1VuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj+aPkuWxj+W5v+WRiumFjee9ruS/oeaBr+mUmeivryFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIiAmJiAhaXNVbmlxdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwuYmluZCh0aGlzKSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDliJvlu7rlsI/nqIvluo/mj5LlsY/lub/lkYpcclxuICAgIC8vICAqIEBwYXJhbSBpc1VuaXF1ZSDmmK/lkKbllK/kuIDlsZXnpLog5LiN6L2u6K+i5pi+56S65Y6f55SfXHJcbiAgICAvLyAgKi9cclxuICAgIF9jcmVhdGVNaW5pR2FtZUluc2VydEFkQnlDb25maWcoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzSW5zZXJ0U2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJfY3JlYXRlTWluaUdhbWVJbnNlcnRBZEJ5SW5kZXg6IGluZGV4PVwiICsgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQWRJbml0XHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlncy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGxldCBfaW5zZXJ0QWQgPSBxZy5jcmVhdGVJbnNlcnRBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmludGVyc2l0aWFsQWRDb25maWdzW2luZGV4XS5pZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuSU5URVJTSVRJVElBTCwgWXdBZFN0YXR1cy5SRVFVRVNULCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2luc2VydEFkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLms6jlhozlsI/muLjmiI/mj5LlsY/lub/lkYrlm57osIPvvIFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGVhckNhbGxCYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9mZkxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9uRXJyb3IoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiP5o+S5bGP5bm/5ZGK5Ye66ZSZOlwiICsgZXJyLmNvZGUgKyBlcnIubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW5zZXJ0U2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsQnlDb25maWdzKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLklOVEVSU0lUSVRJQUwsIFl3QWRTdGF0dXMuUkVRVUVTVF9GQUlMLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlnc1tpbmRleF0uaWQsIGVyci5jb2RlLCBlcnIubXNnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub25Mb2FkKCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+eoi+W6j+aPkuWxj+W5v+WRiuWKoOi9veaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1RfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNJbnNlcnRTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luc2VydFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbnNlcnRBZC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vblNob3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5zZXJ0U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wuY291bnRJbnNlclNob3dDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0TGFzdFNob3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VUeXBlID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9vcGVuX2Nsb3NlX2Jhbm5lcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZVR5cGUgJiYgY2xvc2VUeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOmFjee9ruW9k+WJjeaPkuWxj+aYvuekuuaIkOWKn+WQjlwiICsgKGNsb3NlVHlwZSA9PSAxID8gXCLplIDmr4FcIiA6IFwi6ZqQ6JePXCIpICsgXCJiYW5uZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIF9pbnNlcnRBZC5vZmZMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsZWFyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9uU2hvdygoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/muLjmiI/mj5LlsY/lub/lkYrmmL7npLrmiJDlip/vvIEgIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWQoWXdBZFR5cGUuSU5URVJTSVRJVElBTCwgWXdBZFN0YXR1cy5BRF9JRF9SRVFVRVNUX1NVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuSU5URVJTSVRJVElBTCwgWXdBZFN0YXR1cy5TSE9XX1NVQ0NFU1MsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmludGVyc2l0aWFsQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gX2luc2VydEFkLm9mZlNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOesrOS4gOasoeiwg+eUqOS4jemcgOimgeaJi+WKqGxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWluaUluc2VyQWRJc0NyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbmlJbnNlckFkSXNDcmVhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pbnNlcnRBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIV9pbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1RfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBP5bCP5ri45oiP5o+S5bGP5bm/5ZGK5Yib5bu65aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbEJ5Q29uZmlncyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiP5o+S5bGP5bm/5ZGK6YWN572u5L+h5oGv6ZSZ6K+vIVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiICYmICFpc1VuaXF1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vmmL7npLrljp/nlJ/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0Jhbm5lclNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQWRJbml0XHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGU6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5fYWxpZ25UeXBlID09PSBcInRvcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUudG9wID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYmFubmVyQWQgfHwgdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gcWcuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NJZDogdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rOo5YaM5bCP5ri45oiPYmFubmVy5Zue6LCDIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub25FcnJvcigoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiPQmFubmVy5bm/5ZGK5Ye66ZSZOiBcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzQmFubmVyU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQmFubmVyU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQuaW5kZXhPZihcImRlZmF1bHRcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lci5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuiHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5bCP5ri45oiP44CB5Y6f55Sf5bm/5ZGK5p2h6YO95peg5rOV5bGV56S677yM5bGV56S66Ieq5a6a5LmJYmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub25TaG93KCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/muLjmiI9CYW5uZXLmmL7npLrmiJDlip/vvIFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuaGlkZVJlY29tbWVuZEdhbWVzQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5fYmFubmVySXNIaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fYmFubmVyQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY1CYW5uZXLlub/lkYrkuLrpmpDol4/nirbmgIHjgILosIPnlKjpmpDol4/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgJiYgdGhpcy5fc2hvd0Jhbm5lckNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Jhbm5lckFkLm9uUmVzaXplKChvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJvbiByZXNpemUgPj4+PlwiICsgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKCdiYW5uZXIg5a695bqm77yaJyArIG9iai53aWR0aCArICcsIGJhbm5lciDpq5jluqbvvJonICsgb2JqLmhlaWdodCArIFwiICx0b3BcIiArIG9iai50b3ApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkhpZGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc05hdGl2ZUJhbm5lclNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbC5jb3VudEJhbm5lckNsb3NlQ291bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/muLjmiI9CYW5uZXIg5bm/5ZGK6ZqQ6JePLOW9k+WJjemakOiXj+asoeaVsD5cIiArIHV0aWxzLm9wcG9Ub29sLmJhbm5lckFkQ2xvc2VDb3VudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc05hdGl2ZUJhbm5lclNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/muLjmiI9CYW5uZXIg5bm/5ZGK6ZqQ6JePLOadpeiHquWOn+eUn+eahOaYvuekuu+8jOS4jeWinuWKoOmakOiXj+asoeaVsO+8jOW9k+WJjemakOiXj+asoeaVsD5cIiArIHV0aWxzLm9wcG9Ub29sLmJhbm5lckFkQ2xvc2VDb3VudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIF9taW5pQmFubmVySGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwiZGVmYXVsdFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuiHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+OAgeWOn+eUn+W5v+WRiuadoemDveaXoOazleWxleekuu+8jOWxleekuuiHquWumuS5iWJhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCkuX2FsaWduVHlwZSAhPT0gXCJ0b3BcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS50b3AgPSB1dGlscy5vcHBvVG9vbC5TeXNJbmZvLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiPQmFubmVy5bm/5ZGK5Yib5bu65aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW5kZXhPZihcImRlZmF1bHRcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lci5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuiHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5bCP5ri45oiP44CB5Y6f55Sf5bm/5ZGK5p2h6YO95peg5rOV5bGV56S677yM5bGV56S66Ieq5a6a5LmJYmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiT1BQTyDlsI/muLjmiI9CYW5uZXLlub/lkYrphY3nva7kv6Hmga/plJnor68hXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYW5uZXJJbmZvLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65aSH55So5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQuaW5kZXhPZihcImRlZmF1bHRcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pi+56S66Ieq5a6a5LmJYmFubmVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd1JlY29tbWVuZEdhbWVzQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+OAgeWOn+eUn+W5v+WRiuadoemDveaXoOazleWxleekuu+8jOWxleekuuiHquWumuS5iWJhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfY3JlYXRlTWluaUdhbWVCYW5uZXJBZEJ5Q29uZmlncyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkQnlDb25maWdzOiAjaW5kZXg9XCIgKyBpbmRleCk7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNCYW5uZXJTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLkJBTk5FUiwgWXdBZFN0YXR1cy5SRVFVRVNULCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNBZEluaXRcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnXHJcbiAgICAgICAgICAgICAgICAmJiBpbmRleCA8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlncy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGU6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5fYWxpZ25UeXBlID09PSBcInRvcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUudG9wID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQgPSBxZy5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zSWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLms6jlhozlsI/muLjmiI9iYW5uZXLlm57osIMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vZmZFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuQkFOTkVSLCBZd0FkU3RhdHVzLlJFUVVFU1RfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiPIENvbmZpZ3MgQmFubmVy5bm/5ZGK5Ye66ZSZOiBcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYW5uZXJJbmZvLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5CQU5ORVIsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9GQUlMKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNCYW5uZXJTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0Jhbm5lclNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lckJ5Q29uZmlncyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Jhbm5lckFkLm9uU2hvdygoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9iYW5uZXJBZC5vZmZTaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj0Jhbm5lcuaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5oaWRlQmFubmVyKFwiZGVmYXVsdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fc2hvd0Jhbm5lckNhbGxCYWNrICYmIHRoaXMuX3Nob3dCYW5uZXJDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9iYW5uZXJBZC5vblJlc2l6ZSgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJvbiByZXNpemUgPj4+PlwiICsgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coJ2Jhbm5lciDlrr3luqbvvJonICsgb2JqLndpZHRoICsgJywgYmFubmVyIOmrmOW6pu+8micgKyBvYmouaGVpZ2h0ICsgXCIgLHRvcFwiICsgb2JqLnRvcClcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkhpZGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vZmZIaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNOYXRpdmVCYW5uZXJTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbC5jb3VudEJhbm5lckNsb3NlQ291bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj0Jhbm5lciDlub/lkYrpmpDol48s5b2T5YmN6ZqQ6JeP5qyh5pWwPlwiICsgdXRpbHMub3Bwb1Rvb2wuYmFubmVyQWRDbG9zZUNvdW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc05hdGl2ZUJhbm5lclNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj0Jhbm5lciDlub/lkYrpmpDol48s5p2l6Ieq5Y6f55Sf55qE5pi+56S677yM5LiN5aKe5Yqg6ZqQ6JeP5qyh5pWw77yM5b2T5YmN6ZqQ6JeP5qyh5pWwPlwiICsgdXRpbHMub3Bwb1Rvb2wuYmFubmVyQWRDbG9zZUNvdW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLl9hbGlnblR5cGUgIT09IFwidG9wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc3R5bGUudG9wID0gdXRpbHMub3Bwb1Rvb2wuU3lzSW5mby5zY3JlZW5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9mZlNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5bCP5ri45oiPQmFubmVy5pi+56S65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuQkFOTkVSLCBZd0FkU3RhdHVzLlNIT1dfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5CQU5ORVIsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9TVUNDRVNTKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJhbm5lcihcImRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDYWxsQmFjayAmJiB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0Jhbm5lckNhbGxCYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyQnlDb25maWdzKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLkJBTk5FUiwgWXdBZFN0YXR1cy5SRVFVRVNUX0ZBSUwsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5CQU5ORVIsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9GQUlMKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj0Jhbm5lcuW5v+WRiumFjee9ruS/oeaBr+mUmeivryFcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkKFl3QWRUeXBlLkJBTk5FUiwgWXdBZFN0YXR1cy5BRF9JRF9SRVFVRVNUX0ZBSUwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyQnlDb25maWdzKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9jcmVhdGVOYXRpdmVCYW5uZXJBZEJ5Q29uZmlncyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuXHJcbiAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfQkFOTkVSLCBZd0FkU3RhdHVzLlJFUVVFU1QsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJfY3JlYXRlTmF0aXZlQmFubmVyQWRCeUNvbmZpZ3M6ICNpbmRleD1cIiArIGluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQWRJbml0XHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJBZENvbmZpZ3MubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUJhbm5lckFkID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5uYXRpdmVCYW5uZXJBZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+W5v+WRikJhbm5lcuOAgiBwb3NJZDpcIiArIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lckFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NJZDogdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5uYXRpdmVCYW5uZXJBZCA9IG5hdGl2ZUJhbm5lckFkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlQmFubmVyQWQub25Mb2FkKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfQkFOTkVSLCBZd0FkU3RhdHVzLlJFUVVFU1RfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+S6hkJBTk5FUu+8jOS4jeWBmuS7u+S9leWkhOeQhu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5hZExpc3QgJiYgcmVzLmFkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRCYW5uZXJUaW1lclRhc2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK6LWE5rqQ5ouJ5Y+W5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5hZExpc3RbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlvZPliY3mmL7npLrkuLrnu5PnrpdiYW5uZXIs5YiZ5LiN5YGa5pWw5o2u6aqM6K+BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoZWNrTmF0aXZlRGF0YVZhbGlkKGRhdGEpIHx8IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLnNob3dfc3RfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhblNob3dOYXRpdmVCYW5uZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd05hdGl2ZUJhbm5lcihuYXRpdmVCYW5uZXJBZCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJOYXRpdmVCYW5uZXJJbmZvLm5hdGl2ZUJhbm5lckFkID0gbmF0aXZlQmFubmVyQWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJOYXRpdmVCYW5uZXJJbmZvLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQmFubmVyKFwibmF0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9CQU5ORVIsIFl3QWRTdGF0dXMuU0hPV19TVUNDRVNTLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5CQU5ORVIsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9TVUNDRVNTKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bey57uP6ZqQ6JePYmFubmVy5LiN5Y+v6YeN5aSN5bGV56S6XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiui1hOa6kOWHuumUme+8gVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuTkFUSVZFX0JBTk5FUiwgWXdBZFN0YXR1cy5SRVFVRVNUX0ZBSUwsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5CQU5ORVIsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9GQUlMKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyQnlDb25maWdzKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlQmFubmVyQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuTkFUSVZFX0JBTk5FUiwgWXdBZFN0YXR1cy5SRVFVRVNUX0ZBSUwsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlSXNDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpmpDol4/kuoZCQU5ORVLvvIzkuI3lgZrku7vkvZXlpITnkIbvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiui1hOa6kOaLieWPluWksei0pe+8gVwiICsgZXJyLmNvZGUgKyBlcnIubXNnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIj4+Pj4+5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65aSH55So5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkKFl3QWRUeXBlLkJBTk5FUiwgWXdBZFN0YXR1cy5BRF9JRF9SRVFVRVNUX0ZBSUwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lckJ5Q29uZmlncyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIm5hdGl2ZUJhbm5lckFkIHJlTG9hZD4+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lckFkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj7mnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkKFl3QWRUeXBlLkJBTk5FUiwgWXdBZFN0YXR1cy5BRF9JRF9SRVFVRVNUX0ZBSUwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lckJ5Q29uZmlncyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfY3VyTmF0aXZlQmFubmVySW5mbzogYW55ID0ge307XHJcbiAgICBfY3JlYXRlTmF0aXZlQmFubmVyQWQoY29tcGxldGVDYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gY29tcGxldGVDYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJjdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyOlwiICsgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmF0aXZlQmFubmVyQWQgPSB0aGlzLl9uYXRpdmVCYW5uZXJBZFt0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbmF0aXZlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVCYW5uZXJJZHNcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVCYW5uZXJJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcl0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5bm/5ZGKQmFubmVy44CCIHBvc0lkOlwiICsgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlQmFubmVySWRzW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVCYW5uZXJBZCA9IHFnLmNyZWF0ZU5hdGl2ZUFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zSWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQmFubmVyQWQucHVzaChuYXRpdmVCYW5uZXJBZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVCYW5uZXJBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUlzQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5LqGQkFOTkVS77yM5LiN5YGa5Lu75L2V5aSE55CG77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEJhbm5lclRpbWVyVGFzayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOW9k+WJjeaYvuekuuS4uue7k+eul2Jhbm5lcizliJnkuI3lgZrmlbDmja7pqozor4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVEYXRhVmFsaWQoZGF0YSkgfHwgdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCkuc2hvd19zdF9iYW5uZXIgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuU2hvd05hdGl2ZUJhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlQmFubmVyKG5hdGl2ZUJhbm5lckFkLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8ubmF0aXZlQmFubmVyQWQgPSBuYXRpdmVCYW5uZXJBZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8uZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliKDpmaTlvZPliY3lub/lkYpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzTmF0aXZlQmFubmVyU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA1MFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZSA5q+B5bCP5ri45oiPQmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5bCP5ri45oiP5bmz5Y+w5bCP5LqOMTA1Me+8jOWPquiDvemakOiXj+Wwj+a4uOaIj0Jhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmhpZGVSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIuW3sue7j+makOiXj2Jhbm5lcuS4jeWPr+mHjeWkjeWxleekulwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrotYTmupDlh7rplJnvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUJhbm5lcklkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmnaHpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkLmluZGV4T2YoXCJuYXRpdmVcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5bm/5ZGK5p2h77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuiHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5bCP5ri45oiP44CB5Y6f55Sf5bm/5ZGK5p2h6YO95peg5rOV5bGV56S677yM5bGV56S66Ieq5a6a5LmJYmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUlzQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5LqGQkFOTkVS77yM5LiN5YGa5Lu75L2V5aSE55CG77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUJhbm5lcklkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmnaHpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkLmluZGV4T2YoXCJuYXRpdmVcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5bm/5ZGK5p2h77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuiHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5bCP5ri45oiP44CB5Y6f55Sf5bm/5ZGK5p2h6YO95peg5rOV5bGV56S677yM5bGV56S66Ieq5a6a5LmJYmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwibmF0aXZlQmFubmVyQWQgcmVMb2FkPj5cIik7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVCYW5uZXJBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyKys7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlQmFubmVySWRzICYmIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVCYW5uZXJJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK5p2h6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj7mnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwibmF0aXZlXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+W5v+WRiuadoe+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mmL7npLroh6rlrprkuYliYW5uZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93UmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+OAgeWOn+eUn+W5v+WRiuadoemDveaXoOazleWxleekuu+8jOWxleekuuiHquWumuS5iWJhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVOYXRpdmVJbnNlcnRBZChjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjb21wbGV0ZUNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImN1clBvc0lkSW5kZXhOYXRpdmVJbnNlcnQ6XCIgKyB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5hdGl2ZUluc2VydEFkID0gdGhpcy5fbmF0aXZlSW5zZXJ0QWRbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXTtcclxuICAgICAgICAgICAgaWYgKCFuYXRpdmVJbnNlcnRBZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/mj5LlsY/lub/lkYrjgIIgcG9zSWQ6XCIgKyB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW5zZXJ0QWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWQucHVzaChuYXRpdmVJbnNlcnRBZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVJbnNlcnREYXRhVmFsaWQoZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDkuI3lkIjms5XvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDlh7rplJnvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlSW5zZXJ0QWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlSW5zZXJ0QWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLmxvYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcisrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUluc2VydElkcyAmJiB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlSW5zZXJ0QWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2NyZWF0ZU5hdGl2ZUluc2VydEFkQnlDb25maWcoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJfY3JlYXRlTmF0aXZlSW5zZXJ0QWRCeUNvbmZpZzogI2luZGV4PVwiICsgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQWRJbml0XHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlncy5sZW5ndGgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUluc2VydEFkID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLm5hdGl2ZUluc2VydEFkO1xyXG4gICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1QsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmludGVyc2l0aWFsQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbmF0aXZlSW5zZXJ0QWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmludGVyc2l0aWFsQWRDb25maWdzW2luZGV4XS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5o+S5bGP5bm/5ZGK44CCIHBvc0lkOlwiICsgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zSWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmludGVyc2l0aWFsQWRDb25maWdzW2luZGV4XS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXRpdmVJbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLm5hdGl2ZUluc2VydEFkID0gbmF0aXZlSW5zZXJ0QWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW5zZXJ0QWQub25Mb2FkKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuTkFUSVZFX0lOVEVSU0lUSVRJQUwsIFl3QWRTdGF0dXMuUkVRVUVTVF9TVUNDRVNTLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiui1hOa6kOaLieWPluaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuYWRMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVJbnNlcnREYXRhVmFsaWQoZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLkFEX0lEX1JFUVVFU1RfU1VDQ0VTUyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlNIT1dfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlSW5zZXJ0KG5hdGl2ZUluc2VydEFkLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDkuI3lkIjms5XvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1RfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dJbnRlcnN0aXRpYWxCeUNvbmZpZ3MoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1RfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkLCBlcnIuY29kZSwgZXJyLm1zZykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dJbnRlcnN0aXRpYWxCeUNvbmZpZ3MoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuYXRpdmVJbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1RfRkFJTCwgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/mj5LlsY/lpLHotKXvvJojaW5kZXg9XCIgKyBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsQnlDb25maWdzKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bljp/nlJ/lub/lkYrmlbDmja5cclxuICAgICAqIEBwYXJhbSBhcmdzIFxyXG4gICAgICovXHJcbiAgICBnZXROYXRpdmVBZERhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9uYXRpdmVBZE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVBZE9iamVjdCA9IG5ldyBZWl9OYXRpdmVBZE9iamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9uYXRpdmVBZE9iamVjdC5fbmF0aXZlT2JqID0gdGhpcy5fbmF0aXZlQWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkT2JqZWN0LmRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkT2JqZWN0LmRhdGEuYWRJZCAhPSB0aGlzLl9uYXRpdmVEYXRhLmFkSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkT2JqZWN0LmlzX3JlcG9ydENsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZE9iamVjdC5pc19yZXBvcnRTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWRPYmplY3QuZGF0YSA9IHRoaXMuX25hdGl2ZURhdGE7XHJcblxyXG5cclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuW7tui/n+S4pOenkumHjeaWsOivt+axguWOn+eUn+W5v+WRiuaVsOaNrlwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQWQoYXJncyk7XHJcbiAgICAgICAgLy8gfSwgMjAwMCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZURhdGEgJiYgdGhpcy5fbmF0aXZlQWQpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5fbmF0aXZlRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bljp/nlJ/mlbDmja4gPj4+XCIsIHRoaXMuX25hdGl2ZURhdGEsIFwiLi4uXCIsIHRoaXMuX25hdGl2ZUFkT2JqZWN0KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQWRPYmplY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX3NpbmdsZUFkQ3JlYXRlVGltZTogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rljZXkuKrljp/nlJ/lub/lkYpcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVOYXRpdmVBZChwYXJhbXM6IGFueSA9IG51bGwsIG5hdGl2ZUl0ZW0/OiBZWl9OYXRpdmVJdGVtKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIl9jcmVhdGVOYXRpdmVBZCA+Pj4+PlwiKTtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICBpZiAobmF0aXZlSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyTmF0aXZlSXRlbSA9IG5hdGl2ZUl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWZyZXNoVGltZSA9IHRoaXMuU2VydmVyQ29uZmlnLnN0X25hdGl2ZV9hZF9yZWZyZXNoX3RpbWUgPyB0aGlzLlNlcnZlckNvbmZpZy5zdF9uYXRpdmVfYWRfcmVmcmVzaF90aW1lIDogMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkT2JqZWN0ICYmIHRoaXMuX25hdGl2ZUFkT2JqZWN0LmRhdGEgJiYgIXRoaXMuX25hdGl2ZUFkT2JqZWN0LmlzX3JlcG9ydENsaWNrICYmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuX3NpbmdsZUFkQ3JlYXRlVGltZSkgLyAxMDAwIDwgcmVmcmVzaFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOW9k+WJjeWOn+eUn+W5v+WRiueahOWxleekuuaXtumXtCR7KG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5fc2luZ2xlQWRDcmVhdGVUaW1lKSAvIDEwMDB956eS77yM5pyq6L6+5Yi35paw5pe26Ze0JHtyZWZyZXNoVGltZX3np5LpmZDliLbvvIznm7TmjqXkvb/nlKjkuIrkuIDmrKHmlbDmja7vvIFgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVBZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmU6XCIgKyB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlICsgXCIgICN0aGlzLl9uYXRpdmVTaW5nbGVBZC5sZW5ndGhcIiArIHRoaXMuX25hdGl2ZVNpbmdsZUFkLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmF0aXZlU2luZ2xlQWQgPSB0aGlzLl9uYXRpdmVTaW5nbGVBZFt0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlXTtcclxuICAgICAgICAgICAgaWYgKCFuYXRpdmVTaW5nbGVBZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkc1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzW3RoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+W5v+WRiuOAgiBwb3NJZDpcIiArIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzW3RoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmVdKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVTaW5nbGVBZCA9IHFnLmNyZWF0ZU5hdGl2ZUFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zSWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzW3RoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmVdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYXRpdmVTaW5nbGVBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVTaW5nbGVBZC5wdXNoKG5hdGl2ZVNpbmdsZUFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVNpbmdsZUFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5hZExpc3QgJiYgcmVzLmFkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiui1hOa6kOaLieWPluaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuYWRMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja05hdGl2ZURhdGFWYWxpZChkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaW5nbGVBZENyZWF0ZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZURhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZCA9IG5hdGl2ZVNpbmdsZUFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwiY2FsbGJhY2sgPj4+XCIsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sodGhpcy5nZXROYXRpdmVBZERhdGEoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiui1hOa6kOS4jeWQiOazle+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlIDwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlU2luZ2xlQWRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOYXRpdmVBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2V5Liq5Y6f55Sf5bm/5ZGKSUTpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlU2luZ2xlQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5Y2V5Liq5bm/5ZGK6LWE5rqQ5ouJ5Y+W5aSx6LSl77yBXCIgKyBlcnIuY29kZSArIGVyci5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUgPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljZXkuKrljp/nlJ/lub/lkYpJROmBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmF0aXZlU2luZ2xlQWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJuYXRpdmVTaW5nbGVBZCByZWxvYWRcIik7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVTaW5nbGVBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlKys7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlU2luZ2xlQWRJZHMgJiYgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWNleS4quWOn+eUn+W5v+WRiklEIOmBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWOn+eUn2Jhbm5lcue7hOS7tlxyXG4gICAgICovXHJcbiAgICBfc2hvd05hdGl2ZUJhbm5lcihuYXRpdmVCYW5uZXJBZDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpICYmIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIWNjLmlzVmFsaWQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkgfHwgKCF0aGlzLl9uYXRpdmVCYW5uZXJOb2RlICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVCYW5uZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLm5hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuaGVpZ2h0ICogdGhpcy5fbmF0aXZlQmFubmVyTm9kZS5zY2FsZVkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQmFubmVyOiBZWl9OYXRpdmVCYW5uZXIgPSB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmdldENvbXBvbmVudChcIllaX05hdGl2ZUJhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lci5pbml0KG5hdGl2ZUJhbm5lckFkLCBkYXRhLCB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZUJhbm5lcue7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDYWxsQmFjayAmJiB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGKYmFubmVy5L2N5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65Y6f55Sf5o+S5bGP57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIF9zaG93TmF0aXZlSW5zZXJ0KG5hdGl2ZUluc2VydEFkOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoIWNjLmlzVmFsaWQodGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSkpIHx8ICF0aGlzLl9uYXRpdmVJbnNlcnROb2RlICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5o+S5bGP5bm/5ZGK5L2NXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUluc2VydE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVJbnNlcnROb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9uYXRpdmVJbnNlcnROb2RlLCA5OTk5OTkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJbnNlcnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUluc2VydCA9IHRoaXMuX25hdGl2ZUluc2VydE5vZGUuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSW5zZXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYXRpdmVJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnQuaW5pdChuYXRpdmVJbnNlcnRBZCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydExhc3RTaG93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wuY291bnRJbnNlclNob3dDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5pi+56S65oiQ5Yqf77yM5b2T5YmN5pi+56S65qyh5pWwPVwiICsgdXRpbHMub3Bwb1Rvb2wuaW5zZXJ0QWRTaG93Q291bnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlVHlwZSA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfb3Blbl9jbG9zZV9iYW5uZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZVR5cGUgJiYgY2xvc2VUeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g6YWN572u5b2T5YmN5o+S5bGP5pi+56S65oiQ5Yqf5ZCOXCIgKyAoY2xvc2VUeXBlID09IDEgPyBcIumUgOavgVwiIDogXCLpmpDol49cIikgKyBcImJhbm5lciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZUluc2VydOe7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK5o+S5bGP5L2N5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JePYmFubmVyXHJcbiAgICAgKiBAcGFyYW0gYXJncyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIEhpZGVTaW5nbGVOYXRpdmVBZChhcmdzPzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2lnbmxlTmF0aXZlQWQgJiYgY2MuaXNWYWxpZCh0aGlzLnNpZ25sZU5hdGl2ZUFkKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNpZ25sZU5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBTaG93Q2xvc2VCdG5CYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnczogYW55KSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlNob3dDbG9zZUJ0bkJhbm5lciA+Pj4+Pj4+Pj4uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaXNNb3ZlQnRuID0gMDtcclxuICAgICAgICBsZXQgZmFkZUluVGltZSA9IDA7XHJcbiAgICAgICAgbGV0IGJ0bjogY2MuTm9kZSA9IGFyZ3MuY2xvc2VCdG47XHJcbiAgICAgICAgbGV0IHdpbkhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBidG4ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaXNfbW92ZV9idG4pIHtcclxuICAgICAgICAgICAgICAgIGlzTW92ZUJ0biA9IHRoaXMuU2VydmVyQ29uZmlnLmlzX21vdmVfYnRuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuY2xvc2VfYnRuX2ZhZGVfaW5fdGltZSkge1xyXG4gICAgICAgICAgICAgICAgZmFkZUluVGltZSA9IHRoaXMuU2VydmVyQ29uZmlnLmNsb3NlX2J0bl9mYWRlX2luX3RpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhpc01vdmVCdG4gPT0gMCA/IFwi5pi+56S6YmFubmVyLOS4lOaMiemSruWcqOS4iumdolwiIDogYOaYvuekukJhbm5lcizmjInpkq7lsYXlupXpg6jkuJQke2lzTW92ZUJ0bn3mr6vnp5LlkI7np7vliqhgKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlu7bov5/osIPnlKjlhbPpl63mjInpkq7nmoRCYW5uZXIgPj4+PlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lcihsb2NhdGlvbiwgYXJncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFkWSA9IDI0MDtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ3V0aWxzIC0gYWRZOicgKyBhZFkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkWSA+IDAgJiYgYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnkgPSAtKHdpbkhlaWdodCAvIDIgLSBhZFkpICsgYnRuLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiYnRuQ2xvc2UueVwiICsgYnRuLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBpc01vdmVCdG4pO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4ucnVuQWN0aW9uKGNjLmZhZGVJbigwLjMpKTtcclxuICAgICAgICAgICAgfSwgZmFkZUluVGltZSAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgX2NoZWNrTmF0aXZlSW5zZXJ0RGF0YVZhbGlkKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhLnRpdGxlICYmICgoZGF0YS5pY29uVXJsTGlzdCAmJiBkYXRhLmljb25VcmxMaXN0Lmxlbmd0aCA+IDApIHx8IChkYXRhLmltZ1VybExpc3QgJiYgZGF0YS5pbWdVcmxMaXN0Lmxlbmd0aCA+IDApKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2hlY2tOYXRpdmVEYXRhVmFsaWQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuaW1nVXJsTGlzdCAmJiBkYXRhLmltZ1VybExpc3QubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5piv5ZCm5pi+56S65r+A5Yqx5o+S5bGPXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tSZXdhcmRJbnNlcnRJc1Nob3coKSB7XHJcbiAgICAgICAgbGV0IGp1bXBMaXN0ID0gdXRpbHMuZ2V0UmVjb21tb25kR2FtZUxpc3QoKTtcclxuICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5vcHBvVG9vbC5TZXJ2ZXJDb25maWdcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLm9wcG9Ub29sLlNlcnZlckNvbmZpZy5pc19yZXdhcmRfaW50ZXJzaXRpdGlhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLmlzX3Jld2FyZF9pbnRlcnNpdGl0aWEgPT0gXCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAmJiBqdW1wTGlzdCAmJiBqdW1wTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseaPkuWxj+aYvuekuueOr+Wig+mqjOivgemAmui/h++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImlzX3Jld2FyZF9pbnRlcnNpdGl0aWEg5Y+C5pWw5Li6ZmFsc2XvvIzmv4DlirHmj5LlsY/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumFjee9ruS4reayoeaciWlzX3Jld2FyZF9pbnRlcnNpdGl0aWHlj4LmlbDvvIzmv4DlirHmj5LlsY/nu4Tku7bnu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgeWwj+eoi+W6j+i3s+i9rO+8gVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9yZXdhcmRJbnNlcnROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLrmv4DlirHmj5LlsY/nu4Tku7ZcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1Jld2FyZEluc2VydCgpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwic2hvdyByZXdhcmRcIik7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Jld2FyZEluc2VydElzU2hvdygpKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX3ZpZGVvQ2FsbGJhY2sgJiYgc2VsZi5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci52aWRlb0NhbGxCYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICgoKCFjYy5pc1ZhbGlkKHRoaXMuX3Jld2FyZEluc2VydE5vZGUpKSB8fCAhdGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZSkgJiYgdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZEluc2VydCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65r+A5Yqx5o+S5bGP5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRJbnNlcnROb2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZEluc2VydCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jld2FyZEluc2VydE5vZGUucG9zaXRpb24gPSBDb21wYXRpYmxlVG9vbC5wb3NpdGlvbihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9yZXdhcmRJbnNlcnROb2RlLCA5OTk5KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgcmV3YXJkSW5zZXJ0OiBSZXdhcmRJbnNlcnQgPSB0aGlzLl9yZXdhcmRJbnNlcnROb2RlLmdldENvbXBvbmVudChcIlJld2FyZEluc2VydFwiKTtcclxuICAgICAgICAgICAgaWYgKHJld2FyZEluc2VydCkge1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkSW5zZXJ0LmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuua/gOWKseaPkuWxj+e7hOS7tu+8gVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJSZXdhcmRJbnNlcnTnu4Tku7bkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseaPkuWxj+ayoeacieWIm+W7uu+8gVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlUmV3YXJkSW5zZXJ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRJbnNlcnROb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmRJbnNlcnQ6IFJld2FyZEluc2VydCA9IHRoaXMuX3Jld2FyZEluc2VydE5vZGUuZ2V0Q29tcG9uZW50KFwiUmV3YXJkSW5zZXJ0XCIpO1xyXG4gICAgICAgICAgICBpZiAocmV3YXJkSW5zZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJbnNlcnQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+a/gOWKseaPkuWxj+e7hOS7tu+8gVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJSZXdhcmRJbnNlcnTnu4Tku7bkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseaPkuWxj+ayoeacieWIm+W7uu+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIFNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTogY2MuTm9kZSB7XHJcbiAgICAvLyAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuXHJcbiAgICAvLyAgICAgICAgIHV0aWxzLnNob3dMb2coXCJjdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJ0OlwiLCB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIpO1xyXG5cclxuICAgIC8vICAgICAgICAgbGV0IG5hdGl2ZUluc2VydEFkID0gdGhpcy5fbmF0aXZlSW5zZXJ0QWRbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXTtcclxuICAgIC8vICAgICAgICAgaWYgKCFuYXRpdmVJbnNlcnRBZCkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNcclxuICAgIC8vICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/nu5PnrpfpobXpnaLlub/lkYrjgIIgcG9zSWQ6XCIsIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUluc2VydElkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJdKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbmF0aXZlSW5zZXJ0QWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWQucHVzaChuYXRpdmVJbnNlcnRBZCk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/ljp/nlJ/nu5PnrpfpobXpnaLotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVEYXRhVmFsaWQoZGF0YSkpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5jcmU7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+e7k+eul+mhtemdoui1hOa6kOS4jeWQiOazle+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+e7k+eul+mhtemdoui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcisrO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf57uT566X6aG16Z2i6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/nu5PnrpfpobXpnaLotYTmupDmi4nlj5blpLHotKXvvIFcIiwgZXJyLmNvZGUsIGVyci5tc2cpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKys7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyIDwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlSW5zZXJ0SWRzLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/nu5PnrpfpobXpnaLpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIGlmIChuYXRpdmVJbnNlcnRBZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgbmF0aXZlSW5zZXJ0QWQubG9hZCgpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKys7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlSW5zZXJ0SWRzICYmIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSXNTaG93U3RhdGVtZW50QWQoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpICYmIHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jDblhYPntKDkuqTlj4nmjqjlub/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5Yib5bu657uT566X6aG16Z2i5o6o5bm/57uE5Lu2XHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgU2hvd1N0YXRlbWVudFJlY29tbWVudChzaG93TmF0aXZlQWQ6IGJvb2xlYW4gPSB0cnVlKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJc1Nob3dTdGF0ZW1lbnRBZCgpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXNob3dOYXRpdmVBZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3RoZXJjb25maWcuY3Jvc3NXaWRnZXQ2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcuY3Jvc3NXaWRnZXQ2KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y+q5pi+56S657uT566X5LqS5o6o5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyBjcm9zc1dpZGdldDYsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3RoZXJjb25maWcuc3RhdGVtZW50UmVjb21tZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcuc3RhdGVtZW50UmVjb21tZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXRlbWVudFJlY29tbWVudDogWVpfU3RhdGVtZW50UmVjb21tZW50QWQgPSBub2RlLmdldENvbXBvbmVudChcIllaX1N0YXRlbWVudFJlY29tbWVudEFkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudFJlY29tbWVudC5zaG93TmF0aXZlQWQgPSBzaG93TmF0aXZlQWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuue7k+eul+S6kuaOqOWSjOWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKrmib7liLDpooTliLbkvZMgU3RhdGVtZW50UmVjb21tZW50LCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfc2hvd05hdGl2ZUFkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJOYXRpdmVJdGVtICYmIGNjLmlzVmFsaWQodGhpcy5fY3VyTmF0aXZlSXRlbS5ub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJOYXRpdmVJdGVtLmluaXQodGhpcy5nZXROYXRpdmVBZERhdGEoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHNpZ25sZU5hdGl2ZUFkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu657uT566X6aG16Z2i5o6o5bm/57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93U2luZ2xlTmF0aXZlQWQocGFyYW1zPzogYW55KSB7XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5jb25maWcub3RoZXJjb25maWcuc2luZ2xlTmF0aXZlQWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2lnbmxlTmF0aXZlQWQgJiYgY2MuaXNWYWxpZCh0aGlzLnNpZ25sZU5hdGl2ZUFkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaWdubGVOYXRpdmVBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaWdubGVOYXRpdmVBZCA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaW5nbGVOYXRpdmVBZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmF0aXZlSXRlbTogWVpfTmF0aXZlSXRlbSA9IHRoaXMuc2lnbmxlTmF0aXZlQWQuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSXRlbVwiKTtcclxuICAgICAgICAgICAgbmF0aXZlSXRlbS5zaG93VHlwZSA9IDI7XHJcbiAgICAgICAgICAgIG5hdGl2ZUl0ZW0ucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJOYXRpdmVJdGVtID0gbmF0aXZlSXRlbTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLnBhcmVudC5hZGRDaGlsZCh0aGlzLnNpZ25sZU5hdGl2ZUFkLCBjYy5tYWNyby5NQVhfWklOREVYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljZXkuKrljp/nlJ/lub/lkYrliJvlu7rmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25sZU5hdGl2ZUFkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKrmib7liLDpooTliLbkvZMgc2luZ2xlTmF0aXZlQWQsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnu5Pnrpflub/lkYpcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHJldHVybnMganNvbnsgdHlwZTooMTo25YWD57Sg5LqS5o6o77yMMjrljZXkuKrljp/nlJ/lub/lkYopLG5vZGU66IqC54K5fVxyXG4gICAgICovXHJcbiAgICBzaG93U3RhdGVtZW50QWRzKGRhdGE/OiBhbnkpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7IFwidHlwZVwiOiAwLCBcIm5vZGVcIjogbnVsbCB9O1xyXG4gICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZyAmJiB0aGlzLlNlcnZlckNvbmZpZy5zdGF0ZW1lbnRfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuc3RhdGVtZW50X3R5cGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50eXBlID0gMjtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5ub2RlID0gdGhpcy5TaG93U2luZ2xlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5Y2V5Liq5Y6f55Sf5bm/5ZGKPj5cIiArIHJlc3VsdC5ub2RlLm5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgaXNTeWNuID0gdGhpcy5TZXJ2ZXJDb25maWcuc3Rfc3luYztcclxuICAgICAgICAgICAgLy8gICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgIGxldCByZXNUeXBlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWPquaYvuekuuWwj+a4uOaIj+aPkuWxj+W5v+WRilwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrSW5zZXJ0QWRTaG93KCkpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmIChzcGFyZVR5cGUgJiYgc3BhcmVUeXBlID4gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3BhcmVUeXBlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5bCP5ri45oiP5o+S5bGP6L6+5Yiw6ZmQ5Yi255qE5qyh5pWwID4+IOaYvuekuuWkh+eUqOe7hOS7tiA25Liq5LqS5o6oXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudChmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWwj+a4uOaIj+aPkuWxj+i+vuWIsOmZkOWItueahOasoeaVsCA+PiDmmL7npLrlpIfnlKjnu4Tku7Yg5Y2V5Liq5Y6f55Sf5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1NpbmdsZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNUeXBlID0gMjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWwj+a4uOaIj+aPkuWxj+i+vuWIsOmZkOWItueahOasoeaVsCA+PiDmmL7npLrlpIfnlKjnu4Tku7YgM+S4quS6kuaOqCvljZXkuKrljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U3RhdGVtZW50UmVjb21tZW50KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuuaPkuWxj+W5v+WRiuS4lOWIpOaWreS8mOWFiOe6p1wiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrSW5zZXJ0QWRTaG93KCkpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmIChzcGFyZVR5cGUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNwYXJlVHlwZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWwj+a4uOaIj+aPkuWxj+i+vuWIsOmZkOWItueahOasoeaVsCA+PiDmmL7npLrlpIfnlKjnu4Tku7YgNuS4quS6kuaOqFwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlsI/muLjmiI/mj5LlsY/ovr7liLDpmZDliLbnmoTmrKHmlbAgPj4g5pi+56S65aSH55So57uE5Lu2IOWNleS4quWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTaW5nbGVOYXRpdmVBZCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzVHlwZSA9IDI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlsI/muLjmiI/mj5LlsY/ovr7liLDpmZDliLbnmoTmrKHmlbAgPj4g5pi+56S65aSH55So57uE5Lu2IDPkuKrkupLmjqgr5Y2V5Liq5Y6f55Sf5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlNob3dJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5pi+56S65o+S5bGP5bm/5ZGKKzbkuKrkupLmjqhcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U3RhdGVtZW50UmVjb21tZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGlzU3ljbiAmJiBpc1N5Y24gPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5pi+56S65o+S5bGP5bm/5ZGKK+WNleS4quWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1NpbmdsZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U2luZ2xlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5Y+q5pi+56S65Y2V5Liq5Y6f55Sf5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJlc1R5cGUgPSAyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmIChpc1N5Y24gJiYgaXNTeWNuID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuuaPkuWxj+W5v+WRiisgM+S4quS6kuaOqCvljZXkuKrljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlNob3dJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5Y+q5pi+56S6IDPkuKrkupLmjqgr5Y2V5Liq5Y6f55Sf5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJlc1R5cGUgPSAxO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmIChpc1N5Y24gJiYgaXNTeWNuID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuua7muWKqOS6kuaOqCvljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U3RhdGVtZW50UmVjb21tZW50KHRydWUpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlj6rmmL7npLrmu5rliqjkupLmjqhcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U3RhdGVtZW50UmVjb21tZW50KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpnZ7ms5XnmoTnu5Pnrpflub/lkYrnsbvlnovvvIzvvJpcIiArIHR5cGUpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgcmVzdWx0LnR5cGUgPSByZXNUeXBlO1xyXG4gICAgICAgICAgICAvLyAgICAgcmVzdWx0Lm5vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rKh5pyJ6YWN572u57uT566X5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9uYXRpdmVUcnlHYW1lTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuua1rueql+W5v+WRiuaMguS7tlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqIGBgYFxyXG4gICAgICoge1xyXG4gICAgICogZ3JvdXA6c3RyaW5nXHJcbiAgICAgKiBsZWZ0Om51bWJlclxyXG4gICAgICogYm90dG9tOm51bWJlclxyXG4gICAgICogc2NhbGU6bnVtYmVyXHJcbiAgICAgKiBwYXJlbnQ6Y2MuTm9kZVxyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKiBAcmV0dXJucyDnlJ/miJDnmoTnu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVRyeUdhbWVXaWRnZXQocGFyYW1zOiBhbnkgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZVRyeUdhbWVOb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLm5hdGl2ZVRyeUdhbWVXaWRnZXQpO1xyXG4gICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVRyeUdhbWVOb2RlID0gbm9kZTtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuekluZGV4ID0gOTk5OTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUgPSB0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZTtcclxuICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnNjYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy50b3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC50b3AgPSBwYXJhbXMudG9wO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmxlZnQgPSBwYXJhbXMubGVmdDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuZ2V0Q29tcG9uZW50KE5hdGl2ZVRyeUdhbWVzV2lkZ2V0KS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/mta7liqjor5XnjqnmjILku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVOYXRpdmVUcnlHYW1lV2lkZ2V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZVRyeUdhbWVOb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaUr+aMgeWOn+eUn+aooeeJiOW5v+WRilxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FuU2hvd05hdGl2ZVRlbXBsYXRlQWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHFnLmNyZWF0ZUN1c3RvbUFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6f55Sf5qih54mI5bm/5ZGK5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDlub/lkYrnsbvlnovvvJoxOmJhbm5lciAyOuaPkuWxj1xyXG4gICAgICogQHBhcmFtIGlkICDlub/lkYpJRFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE5hdGl2ZVRlbXBsYXRlQWRTdHlsZSh0eXBlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc3R5bGU6IGFueSA9IHt9O1xyXG4gICAgICAgIGxldCBzeXN0ZW1JbmZvID0gdXRpbHMub3Bwb1Rvb2wuU3lzSW5mbztcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc3R5bGUudG9wID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHN0eWxlLmxlZnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHN0eWxlLnRvcCA9IChzeXN0ZW1JbmZvLnNjcmVlbkhlaWdodCAtIDQwMCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdGl2ZVRlbXBsYXRlQmFubmVyQWQ6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rljp/nlJ/mqKHniYhCYW5uZXLlub/lkYpcclxuICAgICAqIEBwYXJhbSBpbmRleCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jcmVhdGVOYXRpdmVUZW1wbGF0ZUJhbm5lckFkKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiX2NyZWF0ZU5hdGl2ZVRlbXBsYXRlQmFubmVyQWQgOiAjaW5kZXg9XCIgKyBpbmRleCk7XHJcblxyXG4gICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfVEVNUExBVEVfQkFOTkVSLCBZd0FkU3RhdHVzLlJFUVVFU1QsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3dOYXRpdmVUZW1wbGF0ZUFkKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW/q+W6lOeUqOeJiOacrOS4jeaUr+aMgeWOn+eUn+aooeeJiOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJBZENvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZVRlbXBsYXRlQmFubmVyQWQgPSBxZy5jcmVhdGVDdXN0b21BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZCxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLmdldE5hdGl2ZVRlbXBsYXRlQWRTdHlsZSgxKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlVGVtcGxhdGVCYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVUZW1wbGF0ZUJhbm5lckFkLm9mZkxvYWQoKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJOYXRpdmVUZW1wbGF0ZUJhbm5lckFkIOW5v+WRiuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfVEVNUExBVEVfQkFOTkVSLCBZd0FkU3RhdHVzLlJFUVVFU1RfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlVGVtcGxhdGVCYW5uZXJBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlVGVtcGxhdGVCYW5uZXJBZC5vZmZFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLk5BVElWRV9URU1QTEFURV9CQU5ORVIsIFl3QWRTdGF0dXMuUkVRVUVTVF9GQUlMLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZVRlbXBsYXRlQmFubmVyQWQg5bm/5ZGK5byC5bi477yaI2Vycm89XCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+S6hkJBTk5FUu+8jOS4jeWBmuS7u+S9leWkhOeQhu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5OQVRJVkVfVEVNUExBVEVfQkFOTkVSLCBZd0FkU3RhdHVzLkFEX0lEX1JFUVVFU1RfRkFJTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYW5uZXJJbmZvLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5OQVRJVkVfVEVNUExBVEVfQkFOTkVSLCBZd0FkU3RhdHVzLkFEX0lEX1JFUVVFU1RfRkFJTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIj4+Pj4+5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65aSH55So5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lckJ5Q29uZmlncyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlVGVtcGxhdGVCYW5uZXJBZFxyXG4gICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfVEVNUExBVEVfQkFOTkVSLCBZd0FkU3RhdHVzLlNIT1dfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzW2luZGV4XS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkKFl3QWRUeXBlLk5BVElWRV9URU1QTEFURV9CQU5ORVIsIFl3QWRTdGF0dXMuQURfSURfUkVRVUVTVF9TVUNDRVNTKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVUZW1wbGF0ZUJhbm5lckFkLm9mZlNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiTmF0aXZlVGVtcGxhdGVCYW5uZXJBZCBzaG93IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQmFubmVyKFwidGVtcGxhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJOYXRpdmVUZW1wbGF0ZUJhbm5lckFkIHNob3cgZmFpbCB3aXRoOlwiICsgZXJyb3IuZXJyQ29kZSArIFwiLFwiICsgZXJyb3IuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WOn+eUn+aooeeJiEJhbm5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhpZGVOYXRpdmVUZW1wbGF0ZUJhbm5lckFkKCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJoaWRlTmF0aXZlVGVtcGxhdGVCYW5uZXJBZCBcIik7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVUZW1wbGF0ZUJhbm5lckFkICYmIHRoaXMubmF0aXZlVGVtcGxhdGVCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVUZW1wbGF0ZUJhbm5lckFkID0gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rljp/nlJ/mqKHniYjmj5LlsY/lub/lkYpcclxuICAgICAqIEBwYXJhbSBpbmRleCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jcmVhdGVOYXRpdmVUZW1wbGF0ZUludGVyc2l0aWFsQWQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJfY3JlYXRlTmF0aXZlVGVtcGxhdGVJbnRlcnNpdGlhbEFkIDogI2luZGV4PVwiICsgaW5kZXgpO1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93TmF0aXZlVGVtcGxhdGVBZCgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lv6vlupTnlKjniYjmnKzkuI3mlK/mjIHljp/nlJ/mqKHniYjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJuYXRpdmV0ZW1wbGF0ZSBzdHlsZT1cIiArIHRoaXMuZ2V0TmF0aXZlVGVtcGxhdGVBZFN0eWxlKDIpKTtcclxuXHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsZXQgY3VzdG9tQWQgPSBxZy5jcmVhdGVDdXN0b21BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuZ2V0TmF0aXZlVGVtcGxhdGVBZFN0eWxlKDIpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY3VzdG9tQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLlJFUVVFU1RfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3NbaW5kZXhdLmlkKSk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiTmF0aXZlVGVtcGxhdGVJbnRlcnNpdGlhbEFkIOW5v+WRiuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjdXN0b21BZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJOYXRpdmVUZW1wbGF0ZUludGVyc2l0aWFsQWQg5bm/5ZGK5byC5bi477yaXCIgKyArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsQnlDb25maWdzKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY3VzdG9tQWRcclxuICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiTmF0aXZlVGVtcGxhdGVJbnRlcnNpdGlhbEFkIHNob3cgc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRMYXN0U2hvd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VUeXBlID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9vcGVuX2Nsb3NlX2Jhbm5lcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VUeXBlICYmIGNsb3NlVHlwZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g6YWN572u5b2T5YmN5o+S5bGP5pi+56S65oiQ5Yqf5ZCOXCIgKyAoY2xvc2VUeXBlID09IDEgPyBcIumUgOavgVwiIDogXCLpmpDol49cIikgKyBcImJhbm5lciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZChZd0FkVHlwZS5JTlRFUlNJVElUSUFMLCBZd0FkU3RhdHVzLkFEX0lEX1JFUVVFU1RfU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgWW91V2FuQW5hbHl0aWNzLkV2ZW50QWRXaXRoT2JqKFl3QWRUeXBlLklOVEVSU0lUSVRJQUwsIFl3QWRTdGF0dXMuU0hPV19TVUNDRVNTLCBuZXcgQWRFdmVudFBhcmFtZXRlcih1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlnc1tpbmRleF0uaWQpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZVRlbXBsYXRlSW50ZXJzaXRpYWxBZCBzaG93IGZhaWwgd2l0aDpcIiArIGVycm9yLmVyckNvZGUgKyBcIixcIiArIGVycm9yLmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdhbWVFeGl0KCkgeyB9XHJcblxyXG4gICAgcHVibGljIFNoYXJlKCkgeyB9XHJcbn1cclxuIl19