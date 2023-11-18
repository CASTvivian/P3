"use strict";
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