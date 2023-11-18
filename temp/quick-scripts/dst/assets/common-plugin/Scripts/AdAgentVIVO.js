
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentVIVO.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '403ectDoOdB058Z+/79HsK6', 'AdAgentVIVO');
// common-plugin/Scripts/AdAgentVIVO.ts

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
var NativeTryGamesWidget_1 = require("./NativeTryGamesWidget");
var CompatibleTool_1 = require("./CompatibleTool");
var YZ_NativeAdObject_1 = require("./YZ_NativeAdObject");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentVIVO = /** @class */ (function (_super) {
    __extends(AdAgentVIVO, _super);
    function AdAgentVIVO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bannerAd = null;
        _this._insertAd = null;
        _this._videoAd = null;
        _this._nativeBannerAd = [];
        _this._nativeInsertAd = [];
        _this._nativeSingleAd = [];
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
        _this._isInsertAdShow = false;
        _this._isInsertAdLoaded = false;
        _this._isVideoLoaded = false;
        _this._isVideoShow = false;
        _this.lastLastShowVideoTime = 0; //最后一次显示视频时间
        _this.showNum = 0; // Banner广告展示次数
        _this.showInsertNum = 0; // 插屏广告展示次数
        _this._curNativeItem = null;
        _this._nativeAdObject = null;
        _this._nativeAd = null;
        _this._nativeBannerInfo = null;
        //当前显示Banner的位置
        _this._curLocation = YZ_Constant_1.BannerLocation.None;
        _this._lastShowTime = 0; //上一次调用showBanner的时间
        _this._bannerTimeoutShow = 0;
        _this._nativeIsClose = false; //原生banner是否已经被关闭
        _this._showBannerTimerId = 0;
        _this._delayShowBannerId = 0;
        _this._startBannerTimerTask = 0;
        _this._tryIndex = 0;
        _this._nativeInsertAdShowCount = 0;
        _this._curNativeBannerInfo = {};
        _this._nativeTryGameNode = null;
        _this.signleNativeAd = null;
        _this._singleAdCreateTime = 0;
        _this._customAd = null;
        _this._refreshCustomAdTimerTask = null;
        _this._isHide = false;
        _this._lastLocation = "";
        return _this;
    }
    Object.defineProperty(AdAgentVIVO.prototype, "SysInfo", {
        get: function () {
            return Utils_1.utils.Tool_Vivo.SysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdAgentVIVO.prototype, "ServerConfig", {
        get: function () {
            if (PlatUtils_1.default.IsVIVO) {
                return Utils_1.utils.Tool_Vivo.ServerConfig;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
        * 获取当前banner配置
        */
    AdAgentVIVO.prototype.getNativeBannerInfo = function () {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return Utils_1.utils.config.vivoconfig.getNativeBannerInfo(this._curLocation);
    };
    AdAgentVIVO.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            if (Utils_1.utils.Tool_Vivo.isOverMiniVersion("1084")) {
                //@ts-ignore
                qg.isSupportNativeAd = true;
            }
            Utils_1.utils.registerServerInitEvent(function () {
                if (Utils_1.utils.config.vivoconfig.showAd) {
                    _this._initVideoAd();
                }
                else {
                    Utils_1.utils.showLog("广告开关关闭状态，所有广告不显示！要显示广告，请打开 CommonUtils 组件上VIVIO 配置下的广告开关！");
                }
            }, this);
        }
    };
    AdAgentVIVO.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (!Utils_1.utils.Tool_Vivo.isOverMiniVersion("1041")) {
                Utils_1.utils.showLog("当前版本不支持视频广告!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            if (!Utils_1.utils.config.vivoconfig.videoId) {
                Utils_1.utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            var posId = Utils_1.utils.config.vivoconfig.videoId.trim();
            Utils_1.utils.showLog("video广告ID:" + posId);
            //@ts-ignore
            this._videoAd = qg.createRewardedVideoAd({
                posId: posId
            });
            if (this._videoAd) {
                this._videoAd.onLoad((function () {
                    Utils_1.utils.showLog("激励视频加载成功!");
                    _this._isVideoLoaded = true;
                    if (_this._isVideoShow) {
                        var adshow = _this._videoAd.show();
                        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                        adshow && adshow.then(function () {
                            _this._isVideoLoaded = false;
                        }).catch(function (err) {
                            if (_this._videoCallback) {
                                _this._videoCallback(false, "暂无视频广告!");
                                _this._videoCallback = null;
                            }
                            Utils_1.utils.showLog("视频播放失败！");
                        });
                    }
                }));
                this._videoAd.onError((function (err) {
                    Utils_1.utils.showLog("激励视频异常!" + err.errCode);
                    _this._isVideoLoaded = false;
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "暂无视频广告!");
                        _this._videoCallback = null;
                    }
                }));
                this._videoAd.onClose(function (res) {
                    // setTimeout(() => {
                    //     utils.showLog(`延时调用加载视频！`);
                    _this._videoAd.load();
                    // }, 500);
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
            }
        }
    };
    AdAgentVIVO.prototype.ShowBanner = function (location, args, isTimeRefresh) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (isTimeRefresh === void 0) { isTimeRefresh = false; }
        if (!this.ServerConfig) {
            Utils_1.utils.showLog("未请求到配置文件！");
            return;
        }
        var oldLocation = this._curLocation;
        this._curLocation = location;
        //如果跳用位置切换之后，验证是不是通过定时器强制刷新数据，不是则先隐藏banner
        if (oldLocation != location) {
            this.HideBanner(location);
        }
        var curTime = new Date().getTime();
        var refresh_ad_time = (curTime - this._startBannerTimerTask) / 1000;
        var interval = this.ServerConfig.refresh_ad_time;
        if (args && args.isRefresh) {
            isTimeRefresh = true;
        }
        else if (interval && interval > 0) {
            if (refresh_ad_time > interval) {
                isTimeRefresh = true;
            }
        }
        // 判断当前位置是不是显示banner
        if (this.getNativeBannerInfo().is_show_banner == -1) {
            Utils_1.utils.showLog("当前位置配置为不展示banner!");
            this.HideBanner(location);
            return;
        }
        else if (this.getNativeBannerInfo().is_show_rec > -1) {
            Utils_1.utils.showLog("当前位置显示互推banner");
            if (Utils_1.utils.Tool_Vivo.canShowRecommend()) {
                this.HideBanner(location);
                Utils_1.utils.Tool_Vivo.showRecBanner();
                return;
            }
            Utils_1.utils.showLog("当前平台不支持互推banner");
        }
        else {
            if (!isTimeRefresh) {
                if (this.ServerConfig.nbclr && this.ServerConfig.nbclr == "true" && this._curNativeBannerInfo.nativeBannerAd) {
                    Utils_1.utils.showLog("服务器配置定时器刷新数据 ");
                    this._showNativeBanner(this._curNativeBannerInfo.nativeBannerAd, this._curNativeBannerInfo.data);
                    Utils_1.utils.showLog("开启定时刷新 >>>>>>>>>" + (interval - refresh_ad_time));
                    clearTimeout(this._showBannerTimerId);
                    clearTimeout(this._delayShowBannerId);
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(function () {
                        Utils_1.utils.showLog("\u5B9A\u65F6" + interval + "\u79D2\u8C03\u7528showbanner");
                        _this.ShowOldBanner(_this._curLocation, {});
                    }, (interval - refresh_ad_time) * 1000);
                    return;
                }
            }
        }
        if (Utils_1.utils._tool_Vivo.isOverMiniVersion("1059")) {
            this.showNewBanner(location, args);
        }
        else {
            this.ShowOldBanner(location, args);
        }
    };
    AdAgentVIVO.prototype.showNewBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        var curTime = new Date().getTime();
        var cap = this.ServerConfig ? this.ServerConfig.cap_show_banner_time : undefined;
        cap = cap ? cap : 15;
        if (((curTime - this._lastShowTime) / 1000) > cap) {
            this._lastShowTime = curTime;
            this.ShowOldBanner(location, args);
        }
        else {
            this._lastShowTime = curTime;
            clearTimeout(this._bannerTimeoutShow);
            this._bannerTimeoutShow = setTimeout(function () {
                Utils_1.utils.showLog("达到" + cap + "间隔，显示banner");
                _this.ShowOldBanner(_this._curLocation, args);
            }, cap * 1000);
            Utils_1.utils.showLog("1059以上展示banner必须间隔" + cap + "秒");
        }
    };
    AdAgentVIVO.prototype.ShowOldBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsVIVO) {
            if (!Utils_1.utils.config.vivoconfig.showAd) {
                return;
            }
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            this._nativeIsClose = false;
            if (this.ServerConfig) {
                var interval_1 = this.ServerConfig.refresh_ad_time;
                var bannerInfo = this.getNativeBannerInfo();
                if (interval_1 && interval_1 > 0) {
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(function () {
                        Utils_1.utils.showLog("\u5B9A\u65F6" + interval_1 + "\u79D2\u8C03\u7528showbanner");
                        _this.ShowBanner(location, {}, true);
                    }, interval_1 * 1000);
                }
                if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                    this.showNum++;
                    //@ts-ignore
                    if (this.showNum % 2 != 0 && qg.isSupportNativeAd) {
                        Utils_1.utils.showLog("测试模式>> 顺序展示原生Banner广告！");
                        this._createNativeBannerAd(this._showNativeBanner);
                    }
                    else {
                        //@ts-ignore
                        Utils_1.utils.showLog("测试模式>>" + (qg.isSupportNativeAd ? "" : "平台不支持原生广告>>" + "顺序展示小游戏Banner广告！"));
                        this._createMiniGameBannerAd(location);
                    }
                    return;
                }
                if (this.ServerConfig.banner_first_ad) {
                    //@ts-ignore
                    if (this.ServerConfig.banner_first_ad == "native" && qg.isSupportNativeAd) {
                        Utils_1.utils.showLog("优先展示原生Banner广告!");
                        if (this.ServerConfig.intersititial_first_ad == "native") {
                            var timeOut = 1;
                            if (this.ServerConfig.native_banner_delay_time) {
                                timeOut = this.ServerConfig.native_banner_delay_time;
                            }
                            Utils_1.utils.showLog("\u56E0\u4E3A\u63D2\u5C4F\u4E5F\u662F\u4F18\u5148\u5C55\u793A\u539F\u751F\uFF0C\u6240\u4EE5banner\u5EF6\u8FDF\u663E\u793A" + timeOut + "\u79D2");
                            //@ts-ignore
                            this._delayShowBannerId = setTimeout(function () {
                                _this._createNativeBannerAd(_this._showNativeBanner);
                            }, timeOut * 1000);
                        }
                        else {
                            this._createNativeBannerAd(this._showNativeBanner);
                        }
                    }
                    else {
                        //@ts-ignore
                        Utils_1.utils.showLog("优先展示小游戏Banner广告，引擎" + (qg.isSupportNativeAd ? "支持" : "不支持") + "原生广告");
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
    AdAgentVIVO.prototype.HideBanner = function (location) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsVIVO) {
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            clearTimeout(this._bannerTimeoutShow);
            this._nativeIsClose = true;
            if (this._bannerAd) {
                var adhide = this._bannerAd.hide();
                adhide && adhide.then(function () {
                    console.log("banner广告隐藏成功");
                }).catch(function (err) {
                    console.log("banner广告隐藏失败", JSON.stringify(err));
                    var addestroy = _this._bannerAd.destroy();
                    addestroy && addestroy.then(function () {
                        console.log("banner广告销毁成功");
                    }).catch(function (err) {
                        console.log("banner广告销毁失败", JSON.stringify(err));
                    });
                });
            }
            if (this._nativeBannerNode) {
                Utils_1.utils.showLog("隐藏原生Banner");
                this._nativeBannerNode.active = false;
            }
            //隐藏互推banner
            Utils_1.utils.Tool_Vivo && Utils_1.utils.Tool_Vivo.hideRecBanner();
        }
    };
    AdAgentVIVO.prototype.showNativeTryGameWidget = function (params) {
        var _this = this;
        if (params === void 0) { params = null; }
        if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.showLog("创建原生抖动广告。 posId:" + Utils_1.utils.config.vivoconfig.nativeTryGameIds[0], "  utils.tryGameDate", Utils_1.utils.tryGameDate, "needchange", Utils_1.utils.nativeNeedChange);
            if (Utils_1.utils.nativeNeedChange || !Utils_1.utils.tryGameDate) {
                if (Utils_1.utils.config.vivoconfig.nativeTryGameIds) {
                    //@ts-ignore
                    var tryGameAd_1 = qg.createNativeAd({
                        posId: Utils_1.utils.config.vivoconfig.nativeTryGameIds[0]
                    });
                    Utils_1.utils.showLog("tryGameAd：" + tryGameAd_1);
                    if (tryGameAd_1) {
                        tryGameAd_1.onLoad(function (res) {
                            Utils_1.utils.showLog("res", res);
                            Utils_1.utils.nativeNeedChange = false;
                            _this.tryGameInfo = res.adList;
                            if (res && res.adList && res.adList.length > 0) {
                                Utils_1.utils.showLog("原生抖动试完广告资源拉取成功！");
                                Utils_1.utils.showLog(JSON.stringify(res));
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
                                    Utils_1.utils.tryGameDate.push({ "tryGameAd": tryGameAd_1, "date": _this.tryGameInfo });
                                    if (Utils_1.utils._nativeTryGameNode) {
                                        Utils_1.utils._nativeTryGameNode.getComponent(NativeTryGamesWidget_1.default).init();
                                    }
                                }
                            }
                        });
                        tryGameAd_1.onError(function (err) {
                            console.log("原生广告加载异常", JSON.stringify(err));
                        });
                        tryGameAd_1.load();
                    }
                }
                else {
                    Utils_1.utils.showLog("原生抖动id不存在");
                }
            }
            this.createNativeTryGameWidget(params);
        }
    };
    AdAgentVIVO.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsVIVO) {
            if (!Utils_1.utils.config.vivoconfig.showAd) {
                return;
            }
            if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                this.showInsertNum++;
                // utils.showLog(this.showInsertNum % 2 == 0, "<<this.showInsertNum % 2 == 0");
                //@ts-ignore
                if (this.showInsertNum % 2 == 0 && qg.isSupportNativeAd) {
                    Utils_1.utils.showLog("测试模式>> 顺序展示原生插屏广告！");
                    this.nativeInserAdDelayCall();
                }
                else {
                    //@ts-ignore
                    Utils_1.utils.showLog("测试模式>>" + (qg.isSupportNativeAd ? "" : "平台不支持原生广告>>") + "顺序展示小游戏插屏广告！");
                    this._createMiniGameInsertAd();
                }
                return;
            }
            if (this.ServerConfig) {
                if (location && location == YZ_Constant_1.BannerLocation.Pause) {
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native" && qg.isSupportNativeAd) {
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
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native" && qg.isSupportNativeAd) {
                        Utils_1.utils.showLog("优先展示原生插屏广告!");
                        Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                    else {
                        Utils_1.utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                }
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentVIVO.prototype.nativeInserAdDelayCall = function () {
        Utils_1.utils.showLog("原生插屏广告: 当前点击次数=" + Utils_1.utils.Tool_Vivo.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititial_interval_time + "; 展示累计=" + this._nativeInsertAdShowCount);
        if (Utils_1.utils.Tool_Vivo.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
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
    AdAgentVIVO.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            this._videoCallback = callback;
            if (!Utils_1.utils.config.vivoconfig.showAd) {
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            this._isVideoShow = true;
            var curTime = new Date().getTime();
            var interval = (curTime - this.lastLastShowVideoTime) / 1000;
            var interval_time = 0;
            if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.video_interval_time) {
                interval_time = Utils_1.utils.ServerConfig.video_interval_time;
            }
            if (interval > interval_time) {
                this.lastLastShowVideoTime = new Date().getTime();
                if (!this._videoAd) {
                    this._initVideoAd();
                }
                else {
                    if (this._isVideoLoaded) {
                        var adshow = this._videoAd.show();
                        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                        adshow && adshow.then(function () {
                            Utils_1.utils.showLog("视频显示成功!");
                            _this._isVideoLoaded = false;
                        }).catch(function (err) {
                            Utils_1.utils.showLog("激励视频广告显示失败" + JSON.stringify(err));
                            if (_this._videoCallback) {
                                _this._videoCallback(false, "暂无视频广告!");
                                _this._videoCallback = null;
                            }
                        });
                    }
                    else {
                        this._isVideoShow = false;
                        if (this._videoCallback) {
                            this._videoCallback(false, "暂无视频广告!");
                            this._videoCallback = null;
                        }
                        this._videoAd.load();
                        return;
                    }
                }
            }
            else {
                Utils_1.utils.showLog("视频广告请求间隔小于60秒,直接返回false");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            }
        }
    };
    AdAgentVIVO.prototype._createMiniGameInsertAd = function () {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            this._isInsertShow = true;
            if (Utils_1.utils.config.vivoconfig
                && Utils_1.utils.config.vivoconfig.insertId) {
                // if (!this._insertAd) {
                //@ts-ignore
                this._insertAd = qg.createInterstitialAd({
                    posId: Utils_1.utils.config.vivoconfig.insertId
                });
                if (this._insertAd) {
                    Utils_1.utils.showLog("注册小游戏插屏广告回调！");
                    this._insertAd.onError((function (err) {
                        Utils_1.utils.showLog("vivo 小游戏插屏广告出错:" + err.errCode + err.errMsg);
                        if (_this._isInsertShow) {
                            if (_this.ServerConfig.intersititial_first_ad == "default") {
                                _this._isInsertShow = false;
                                Utils_1.utils.showLog("开始显示原生插屏广告!");
                                _this._curPosIdIndexNativeInser = 0;
                                Utils_1.utils.delayCall(_this.nativeInserAdDelayCall.bind(_this), _this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                        }
                    }).bind(this));
                    // this._insertAd.onLoad((() => {
                    if (this._isInsertShow) {
                        // this._isInsertShow = false;
                        var adshow = this._insertAd.show();
                        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                        adshow && adshow.then(function () {
                            Utils_1.utils.showLog("vivo 小游戏插屏广告显示成功！");
                            _this._isInsertShow = false;
                        }).catch(function (err) {
                            switch (err.code) {
                                case 30003:
                                    Utils_1.utils.showLog("新用户7天内不能曝光插屏，请将手机时间调整为7天后，退出游戏重新进入");
                                    break;
                                case 30009:
                                    Utils_1.utils.showLog("10秒内调用广告次数超过1次，10秒后再调用");
                                    // setTimeout(() => {
                                    //     show()
                                    // }, 10000);
                                    break;
                                case 30002:
                                    Utils_1.utils.showLog("加载广告失败，重新加载广告");
                                    break;
                                default:
                                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                                    Utils_1.utils.showLog("插屏广告展示失败");
                                    break;
                            }
                        });
                    }
                    // }).bind(this));
                }
                // } else {
                //     this._insertAd.load();
                // }
                if (!this._insertAd) {
                    Utils_1.utils.showLog("vivo 小游戏插屏广告创建失败！");
                    if (this.ServerConfig.intersititial_first_ad == "default") {
                        Utils_1.utils.showLog("开始显示原生插屏广告!");
                        this._curPosIdIndexNativeInser = 0;
                        Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            }
            else {
                Utils_1.utils.showLog("vivo 小游戏插屏广告配置信息错误!");
                if (this.ServerConfig.intersititial_first_ad == "default") {
                    Utils_1.utils.showLog("开始显示原生插屏广告!");
                    this._curPosIdIndexNativeInser = 0;
                    Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                }
            }
        }
    };
    AdAgentVIVO.prototype._createMiniGameBannerAd = function (location) {
        var _this = this;
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsVIVO) {
            this._isBannerShow = true;
            if (Utils_1.utils.config.vivoconfig
                && Utils_1.utils.config.vivoconfig.bannerId) {
                var oldBannerAd = this._bannerAd;
                if (oldBannerAd) {
                    var addestroy = oldBannerAd.destroy();
                    addestroy && addestroy.then(function () {
                        console.log("banner广告销毁成功");
                    }).catch(function (err) {
                        console.log("banner广告销毁失败", JSON.stringify(err));
                    });
                }
                // if (!this._bannerAd) {
                //@ts-ignore
                this._bannerAd = qg.createBannerAd({
                    posId: Utils_1.utils.config.vivoconfig.bannerId,
                    style: {}
                });
                if (this._bannerAd) {
                    Utils_1.utils.showLog("注册小游戏banner回调!");
                    this._bannerAd.onError((function (err) {
                        Utils_1.utils.showLog("VIVO 广告条加载失败! code : " + err.errCode + "; msg : " + err.errMsg);
                        var bannerInfo = _this.getNativeBannerInfo();
                        if (bannerInfo.st_banner_show_back_up == -1) {
                            Utils_1.utils.showLog("服务器配置不显示备用广告");
                            return;
                        }
                        if (_this._isBannerShow) {
                            _this._isBannerShow = false;
                            if (_this.ServerConfig.banner_first_ad == "default") {
                                _this._curPosIdIndexNativeBanner = 0;
                                _this._createNativeBannerAd(_this._showNativeBanner.bind(_this));
                            }
                        }
                    }).bind(this));
                }
                else {
                    if (this.ServerConfig.banner_first_ad == "default") {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                }
                // }
                if (this._bannerAd) {
                    var adshow = this._bannerAd.show();
                    adshow && adshow.then(function () {
                        Utils_1.utils.showLog("vivo小游戏banner广告展示成功");
                        if (_this._nativeBannerNode) {
                            _this._nativeBannerNode.active = false;
                        }
                    }).catch(function (err) {
                        switch (err.code) {
                            case 30003:
                                Utils_1.utils.showLog("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                                break;
                            case 30009:
                                Utils_1.utils.showLog("10秒内调用广告次数超过1次，10秒后再调用");
                                // setTimeout(() => {
                                //     show()
                                // }, 10000);
                                break;
                            case 30002:
                                Utils_1.utils.showLog("加载广告失败，重新加载广告");
                                break;
                            default:
                                // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                                Utils_1.utils.showLog("banner广告展示失败");
                                break;
                        }
                    });
                }
                else {
                    Utils_1.utils.showLog("vivo 小游戏Banner广告创建失败!");
                    if (this.ServerConfig.banner_first_ad == "default") {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                }
            }
            else {
                Utils_1.utils.showLog("vivo 小游戏Banner广告配置信息错误!");
                var bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    Utils_1.utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                if (this.ServerConfig.banner_first_ad == "default") {
                    this._curPosIdIndexNativeBanner = 0;
                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                }
            }
        }
    };
    AdAgentVIVO.prototype._createNativeBannerAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            //@ts-ignore
            if (!qg.isSupportNativeAd) {
                Utils_1.utils.showLog("当前引擎不支持原生Banner广告！");
                return;
            }
            var callback_1 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner);
            if (Utils_1.utils.config.vivoconfig.nativeBannerIds
                && Utils_1.utils.config.vivoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                Utils_1.utils.showLog("创建原生广告Banner。 posId:" + Utils_1.utils.config.vivoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                //@ts-ignore
                var nativeBannerAd_1 = qg.createNativeAd({
                    posId: Utils_1.utils.config.vivoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                });
                if (nativeBannerAd_1) {
                    nativeBannerAd_1.onLoad(function (res) {
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
                            if (_this._checkNativeDataValid(data) || _this.getNativeBannerInfo().show_st_banner == "true") {
                                _this._curPosIdIndexNativeBanner = 0;
                                _this._showNativeBanner(nativeBannerAd_1, data);
                                _this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd_1;
                                _this._curNativeBannerInfo.data = data;
                                // 删除当前广告
                                if (_this._bannerAd) {
                                    var adhide = _this._bannerAd.hide();
                                    adhide && adhide.then(function () {
                                        console.log("banner广告隐藏成功");
                                    }).catch(function (err) {
                                        console.log("banner广告隐藏失败", JSON.stringify(err));
                                        var addestroy = _this._bannerAd.destroy();
                                        addestroy && addestroy.then(function () {
                                            console.log("banner广告销毁成功");
                                        }).catch(function (err) {
                                            console.log("banner广告销毁失败", JSON.stringify(err));
                                        });
                                    });
                                }
                                return;
                            }
                        }
                        Utils_1.utils.showLog("原生Banner广告资源出错！");
                        _this._curPosIdIndexNativeBanner++;
                        if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.vivoconfig.nativeBannerIds.length) {
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
                            if (_this.ServerConfig.banner_first_ad == "native") {
                                Utils_1.utils.showLog("开始展示小游戏广告条！");
                                _this._createMiniGameBannerAd();
                            }
                        }
                    });
                    var adLoad = nativeBannerAd_1.load();
                    adLoad && adLoad.then(function (res) {
                        console.log("res", JSON.stringify(res));
                    }).catch(function (err) {
                        Utils_1.utils.showLog("原生Banner广告资源拉取失败！" + JSON.stringify(err));
                        if (_this._nativeIsClose) {
                            Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                            return;
                        }
                        _this._curPosIdIndexNativeBanner++;
                        if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.vivoconfig.nativeBannerIds.length) {
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
                            if (_this.ServerConfig.banner_first_ad == "native") {
                                Utils_1.utils.showLog("开始展示小游戏广告条！");
                                _this._createMiniGameBannerAd();
                            }
                        }
                    });
                }
                else {
                    this._curPosIdIndexNativeBanner++;
                    if (Utils_1.utils.config.vivoconfig.nativeBannerIds && this._curPosIdIndexNativeBanner < Utils_1.utils.config.vivoconfig.nativeBannerIds.length) {
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
                        if (this.ServerConfig.banner_first_ad == "native") {
                            Utils_1.utils.showLog("开始展示小游戏广告条！");
                            this._createMiniGameBannerAd();
                        }
                    }
                }
            }
        }
    };
    AdAgentVIVO.prototype._createNativeInsertAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            //@ts-ignore
            if (!qg.isSupportNativeAd) {
                Utils_1.utils.showLog("当前引擎不支持原生插屏广告！");
                return;
            }
            var callback_2 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);
            if (Utils_1.utils.config.vivoconfig.nativeInsertIds
                && Utils_1.utils.config.vivoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                Utils_1.utils.showLog("创建原生插屏广告。 posId:" + Utils_1.utils.config.vivoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                //@ts-ignore
                var nativeInsertAd_1 = qg.createNativeAd({
                    posId: Utils_1.utils.config.vivoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]
                });
                if (nativeInsertAd_1) {
                    // this._nativeInsertAd.push(nativeInsertAd);
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
                        if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.vivoconfig.nativeInsertIds.length) {
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
                        Utils_1.utils.showLog("原生插屏广告创建失败！" + JSON.stringify(err));
                    });
                    var adLoad = nativeInsertAd_1.load();
                    adLoad && adLoad.then(function (res) {
                        console.log("res", JSON.stringify(res));
                    }).catch(function (err) {
                        Utils_1.utils.showLog("原生插屏广告资源拉取失败！" + JSON.stringify(err));
                        _this._curPosIdIndexNativeInser++;
                        if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.vivoconfig.nativeInsertIds.length) {
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
                else {
                    this._curPosIdIndexNativeInser++;
                    if (Utils_1.utils.config.vivoconfig.nativeInsertIds && this._curPosIdIndexNativeInser < Utils_1.utils.config.vivoconfig.nativeInsertIds.length) {
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
        }
    };
    /**
     * 显示原生banner组件
     */
    AdAgentVIVO.prototype._showNativeBanner = function (nativeBannerAd, data) {
        if (PlatUtils_1.default.IsVIVO) {
            if (data) {
                Utils_1.utils.showLog("显示原生banner");
                if (cc.isValid(this._nativeBannerNode) && this._nativeBannerNode) {
                    this._nativeBannerNode.destroy();
                }
                // if (!cc.isValid(this._nativeBannerNode) || (!this._nativeBannerNode && utils.config.otherconfig.nativeBanner)) {
                Utils_1.utils.showLog("创建原生广告banner位");
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
    AdAgentVIVO.prototype._showNativeInsert = function (nativeInsertAd, data) {
        if (PlatUtils_1.default.IsVIVO) {
            if (data) {
                Utils_1.utils.showLog("显示原生插屏");
                if ((!cc.isValid(this._nativeInsertNode)) || !this._nativeInsertNode && Utils_1.utils.config.otherconfig.nativeInsert) {
                    Utils_1.utils.showLog("创建原生插屏广告位");
                    this._nativeInsertNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeInsert);
                    this._nativeInsertNode.position = CompatibleTool_1.default.position(cc.winSize.width / 2, cc.winSize.height / 2);
                    cc.director.getScene().addChild(this._nativeInsertNode, 9999);
                }
                if (this._nativeInsertNode) {
                    var nativeInsert = this._nativeInsertNode.getComponent("YZ_NativeInsert");
                    if (nativeInsert) {
                        this._nativeInsertAdShowCount = 0;
                        nativeInsert.init(nativeInsertAd, data);
                    }
                    else {
                        Utils_1.utils.showLog("NativeInsert组件不存在!");
                    }
                }
                else {
                    Utils_1.utils.showLog("原生广告插屏位没有创建！");
                }
                if (!this.ServerConfig.show_insert_hide_banner || this.ServerConfig.show_insert_hide_banner != "false") {
                    Utils_1.utils.showLog("原生广告插屏展示后隐藏Banner！");
                    this.HideBanner();
                }
            }
        }
    };
    AdAgentVIVO.prototype.ShowCloseBtnBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        Utils_1.utils.showLog("ShowCloseBtnBanner >>>>>>>>>.");
        var isMoveBtn = 0;
        var btn = args.closeBtn;
        var winHeight = cc.winSize.height;
        if (this.ServerConfig) {
            if (this.ServerConfig.is_move_btn) {
                isMoveBtn = this.ServerConfig.is_move_btn;
            }
            Utils_1.utils.showLog(isMoveBtn == 0 ? "显示banner,且按钮在上面" : "\u663E\u793ABanner,\u6309\u94AE\u5C45\u5E95\u90E8\u4E14" + isMoveBtn + "\u6BEB\u79D2\u540E\u79FB\u52A8");
            // if (!isMoveBtn || isMoveBtn == 0) {
            //     btn.y = -(winHeight / 2) + btn.height;
            //     this.ShowBanner(location, args);
            // } else {
            setTimeout(function () {
                // if (!this._bannerIsHide) {
                Utils_1.utils.showLog("延迟调用关闭按钮的Banner >>>>");
                _this.ShowBanner(location, args);
                // } else {
                //     utils.showLog("当前Banner为隐藏状态，关闭按钮的Banner不显示 >>>>");
                // }
                var adY = 240;
                Utils_1.utils.showLog('utils - adY:' + adY);
                if (adY > 0 && btn) {
                    btn.y = -(winHeight / 2 - adY) + btn.height;
                    Utils_1.utils.showLog("btnClose.y" + btn.y);
                }
            }, isMoveBtn);
            // }
        }
    };
    // {"adList":[{"adId":0,"title":"快手","desc":"手机总是这么卡，如何解决","icon":"http://imgwsdl.vivo.com.cn/appstore/developer/icon/20190918/201909181113001599041.png",
    // "imgUrlList":["http://ads-marketing-vivofs.vivo.com.cn/NtBrJ9dueygDLoz8/material/201908/78707646401346ca9fc8398ff79850d220190809.jpg"],
    // "logoUrl":"","creativeType":0,"interactionType":2},
    // {"adId":1,"title":"快手","desc":"手机总是这么卡，如何解决","icon":"http://imgwsdl.vivo.com.cn/appstore/developer/icon/20190918/201909181113001599041.png",
    // "imgUrlList":["http://ads-marketing-vivofs.vivo.com.cn/NtBrJ9dueygDLoz8/material/201908/78707646401346ca9fc8398ff79850d220190809.jpg"],"logoUrl":"","creativeType":0,"interactionType":2},
    // {"adId":2,"title":"快手","desc":"手机总是这么卡，如何解决","icon":"http://imgwsdl.vivo.com.cn/appstore/developer/icon/20190918/201909181113001599041.png","imgUrlList":["http://ads-marketing-vivofs.vivo.com.cn/NtBrJ9dueygDLoz8/material/201908/78707646401346ca9fc8398ff79850d220190809.jpg
    AdAgentVIVO.prototype._checkNativeDataValid = function (data) {
        if (!data) {
            return false;
        }
        return (data.icon || (data.imgUrlList && data.imgUrlList.length > 0));
    };
    AdAgentVIVO.prototype._checkNativeInsertDataValid = function (data) {
        if (!data) {
            return false;
        }
        return (data.icon || (data.imgUrlList && data.imgUrlList.length > 0));
    };
    AdAgentVIVO.prototype._checkNativeSignDataValid = function (data) {
        if (!data) {
            return false;
        }
        return (data.imgUrlList && data.imgUrlList.length > 0);
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
    AdAgentVIVO.prototype.createNativeTryGameWidget = function (params) {
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
    AdAgentVIVO.prototype.hideNativeTryGameWidget = function () {
        if (this._nativeTryGameNode && cc.isValid(this._nativeTryGameNode)) {
            this._nativeTryGameNode.destroy();
        }
    };
    /**
     * 创建结算页面推广组件
     */
    AdAgentVIVO.prototype.ShowSingleNativeAd = function (params) {
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
     * 创建单个原生广告
     * @param completeCallback
     */
    AdAgentVIVO.prototype.createNativeAd = function (params, nativeItem) {
        var _this = this;
        if (params === void 0) { params = null; }
        Utils_1.utils.showLog("_createNativeAd >>>>>");
        if (PlatUtils_1.default.IsVIVO) {
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
                if (Utils_1.utils.config.vivoconfig.nativeSingleAdIds
                    && Utils_1.utils.config.vivoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]) {
                    Utils_1.utils.showLog("创建原生广告。 posId:" + Utils_1.utils.config.vivoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]);
                    //@ts-ignore
                    nativeSingleAd_1 = qg.createNativeAd({
                        posId: Utils_1.utils.config.vivoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]
                    });
                    if (nativeSingleAd_1) {
                        this._nativeSingleAd.push(nativeSingleAd_1);
                        nativeSingleAd_1.onLoad(function (res) {
                            if (res && res.adList && res.adList.length > 0) {
                                Utils_1.utils.showLog("原生广告资源拉取成功！");
                                Utils_1.utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                var data = res.adList[0];
                                if (_this._checkNativeSignDataValid(data)) {
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
                            if (_this._curPosIdIndexSingleNative < Utils_1.utils.config.vivoconfig.nativeSingleAdIds.length) {
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
                            if (_this._curPosIdIndexSingleNative < Utils_1.utils.config.vivoconfig.nativeSingleAdIds.length) {
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
                if (Utils_1.utils.config.vivoconfig.nativeSingleAdIds && this._curPosIdIndexSingleNative < Utils_1.utils.config.vivoconfig.nativeSingleAdIds.length) {
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
    AdAgentVIVO.prototype._showNativeAd = function () {
        if (this._curNativeItem && cc.isValid(this._curNativeItem.node)) {
            this._curNativeItem.init(this.getNativeAdData());
        }
    };
    /**
     * 获取原生广告数据
     * @param args
     */
    AdAgentVIVO.prototype.getNativeAdData = function () {
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
     * 显示模版广告
     * @param parmas
     */
    AdAgentVIVO.prototype.showCustomAd = function (parme) {
        var _this = this;
        if (Utils_1.utils.config.vivoconfig.customAdInfos.length <= 0) {
            Utils_1.utils.showLog("服务器配置未配置模版广告！");
            return;
        }
        //@ts-ignore
        if (qg.createCustomAd) {
            clearTimeout(this._refreshCustomAdTimerTask);
            var customAdInfo_1 = Utils_1.utils.config.vivoconfig.getCustomAdInfoInfo(parme.location);
            Utils_1.utils.showLog("当前位置 obj >>>", customAdInfo_1.customAdObj);
            if (customAdInfo_1.is_show_ad != "true") {
                Utils_1.utils.showLog("当前位置服务器配置为不显示模版广告！");
                return;
            }
            if (this._lastLocation != parme.location) {
                this.hideCustomAd();
            }
            if (customAdInfo_1.customAdObj != null) {
                this._customAd = customAdInfo_1.customAdObj;
                if (!customAdInfo_1.customAdObj.isShow()) {
                    Utils_1.utils.showLog("当前位置上次展示过原生模版，当前重新显示出来！");
                    customAdInfo_1.customAdObj.show().then(function () {
                        if (customAdInfo_1.hide_banner == "true") {
                            _this.HideBanner();
                        }
                        Utils_1.utils.showLog("重新展示成功！");
                    }).catch(function (err) {
                        customAdInfo_1.customAdObj.destroy();
                        customAdInfo_1.customAdObj = null;
                        Utils_1.utils.showLog('重新展示原生模板广告失败', JSON.stringify(err));
                        _this.showCustomAd(parme);
                    });
                }
                else {
                    Utils_1.utils.showLog("当前位置的模版正在显示中，不执行加载！");
                }
                if (customAdInfo_1.refresh_time > 0) {
                    this._refreshCustomAdTimerTask = setTimeout(function () {
                        Utils_1.utils.showLog("\u5B9A\u65F6" + customAdInfo_1.refresh_time + "\u79D2\u5237\u65B0\u539F\u751F\u6A21\u7248");
                        _this.showCustomAd(parme);
                    }, customAdInfo_1.refresh_time * 1000);
                }
                return;
            }
            this._lastLocation = parme.location;
            this._isHide = false;
            var style = {};
            if (customAdInfo_1.top > 0) {
                style.top = customAdInfo_1.top / cc.winSize.height * this.SysInfo.screenHeight;
            }
            else if (customAdInfo_1.bottom > 0) {
                style.top = this.SysInfo.screenHeight - customAdInfo_1.height - customAdInfo_1.bottom / cc.winSize.height * this.SysInfo.screenHeight;
            }
            if (customAdInfo_1.left > 0) {
                style.left = customAdInfo_1.left / cc.winSize.width * this.SysInfo.screenWidth;
            }
            else if (customAdInfo_1.right > 0) {
                style.left = this.SysInfo.screenWidth - customAdInfo_1.width - customAdInfo_1.right / cc.winSize.width * this.SysInfo.screenWidth;
            }
            Utils_1.utils.showLog("custom ad style>>" + JSON.stringify(style));
            //@ts-ignore
            var _customAd = qg.createCustomAd({
                posId: customAdInfo_1.id,
                style: style
            });
            _customAd.onError(function (err) {
                try {
                    Utils_1.utils.showLog("原生模板广告加载失败", JSON.stringify(err));
                }
                catch (erro) {
                    console.log("模版异常：#errMsg=" + erro);
                }
            });
            _customAd.onClose(function () {
                Utils_1.utils.showLog("原生模板广告 onClose");
                _customAd.destroy();
                _customAd = null;
                customAdInfo_1.customAdObj = null;
            });
            _customAd.onLoad(function () {
                _customAd.offLoad();
                Utils_1.utils.showLog("原生模板广告加载成功！");
                _this._customAd = _customAd;
                customAdInfo_1.customAdObj && customAdInfo_1.customAdObj.destroy();
                customAdInfo_1.customAdObj = _customAd;
                if (!_this._isHide) {
                    _customAd.show().then(function () {
                        if (customAdInfo_1.hide_banner == "true") {
                            _this.HideBanner();
                        }
                        Utils_1.utils.showLog('原生模板广告展示完成！');
                    }).catch(function (err) {
                        Utils_1.utils.showLog('原生模板广告展示失败', JSON.stringify(err));
                    });
                }
                else {
                    Utils_1.utils.showLog('原生模板广告调用了隐藏，当前广告不显示！');
                }
            });
            if (customAdInfo_1.refresh_time > 0) {
                this._refreshCustomAdTimerTask = setTimeout(function () {
                    Utils_1.utils.showLog("\u5B9A\u65F6" + customAdInfo_1.refresh_time + "\u79D2\u5237\u65B0\u539F\u751F\u6A21\u7248");
                    _this.showCustomAd(parme);
                }, customAdInfo_1.refresh_time * 1000);
            }
        }
        else {
            Utils_1.utils.showLog("当前平台不支持原生模版广告！");
        }
    };
    /**
     * 显示模版广告
     * @param parmas
     */
    AdAgentVIVO.prototype.showCustomAdV2 = function (parme) {
        var _this = this;
        if (Utils_1.utils.config.vivoconfig.customAdInfos.length <= 0) {
            Utils_1.utils.showLog("服务器配置未配置模版广告！");
            return;
        }
        //@ts-ignore
        if (qg.createCustomAd) {
            clearTimeout(this._refreshCustomAdTimerTask);
            var customAdInfo_2 = Utils_1.utils.config.vivoconfig.getCustomAdInfoInfo(parme.location);
            Utils_1.utils.showLog("当前位置的广告对象 >>>", customAdInfo_2.customAdObj);
            if (customAdInfo_2.is_show_ad != "true") {
                Utils_1.utils.showLog("当前位置服务器配置为不显示模版广告！");
                return;
            }
            var isRefresh = true;
            if (this._lastLocation != parme.location) {
                this.hideCustomAd();
            }
            else {
                if (customAdInfo_2.customAdObj != null) {
                    if (!customAdInfo_2.customAdObj.isShow()) {
                        Utils_1.utils.showLog("当前位置上次展示过原生模版，当前重新显示出来！");
                        isRefresh = false;
                        customAdInfo_2.customAdObj.show().then(function () {
                            if (customAdInfo_2.hide_banner == "true") {
                                _this.HideBanner();
                            }
                            Utils_1.utils.showLog("重新展示成功！");
                        }).catch(function (err) {
                            isRefresh = true;
                            customAdInfo_2.customAdObj.destroy();
                            customAdInfo_2.customAdObj = null;
                            Utils_1.utils.showLog('重新展示原生模板广告失败', JSON.stringify(err));
                            // this.showCustomAd(parme);
                        });
                    }
                    else {
                        Utils_1.utils.showLog("当前位置的模版正在显示中，不执行加载！");
                    }
                    // if (customAdInfo.refresh_time > 0) {
                    //     this._refreshCustomAdTimerTask = setTimeout(() => {
                    //         utils.showLog(`定时${customAdInfo.refresh_time}秒刷新原生模版`);
                    //         this.showCustomAd(parme)
                    //     }, customAdInfo.refresh_time * 1000);
                    // }
                    // return;
                }
            }
            this._lastLocation = parme.location;
            this._isHide = false;
            var style = {};
            if (customAdInfo_2.top > 0) {
                style.top = customAdInfo_2.top / cc.winSize.height * this.SysInfo.screenHeight;
            }
            else if (customAdInfo_2.bottom > 0) {
                style.top = this.SysInfo.screenHeight - customAdInfo_2.height - customAdInfo_2.bottom / cc.winSize.height * this.SysInfo.screenHeight;
            }
            if (customAdInfo_2.left > 0) {
                style.left = customAdInfo_2.left / cc.winSize.width * this.SysInfo.screenWidth;
            }
            else if (customAdInfo_2.right > 0) {
                style.left = this.SysInfo.screenWidth - customAdInfo_2.width - customAdInfo_2.right / cc.winSize.width * this.SysInfo.screenWidth;
            }
            Utils_1.utils.showLog("custom ad style>>" + JSON.stringify(style));
            //@ts-ignore
            var _customAd = qg.createCustomAd({
                posId: customAdInfo_2.id,
                style: style
            });
            _customAd.onError(function (err) {
                try {
                    Utils_1.utils.showLog("原生模板广告加载失败", JSON.stringify(err));
                }
                catch (erro) {
                    console.log("模版异常：#errMsg=" + erro);
                }
            });
            _customAd.onClose(function () {
                Utils_1.utils.showLog("原生模板广告 onClose");
                _customAd.destroy();
                _customAd = null;
                customAdInfo_2.customAdObj = null;
            });
            _customAd.onLoad(function () {
                Utils_1.utils.showLog("原生模板广告加载成功！");
                _this._customAd = _customAd;
                customAdInfo_2.customAdObj && customAdInfo_2.customAdObj.destroy();
                customAdInfo_2.customAdObj = _customAd;
                if (!_this._isHide && isRefresh) {
                    _customAd.show().then(function () {
                        if (customAdInfo_2.hide_banner == "true") {
                            _this.HideBanner();
                        }
                        Utils_1.utils.showLog('原生模板广告展示完成！');
                    }).catch(function (err) {
                        Utils_1.utils.showLog('原生模板广告展示失败', JSON.stringify(err));
                    });
                }
                else {
                    Utils_1.utils.showLog('原生模板广告调用了隐藏或者当前不刷新广告，当前广告不显示！');
                }
            });
            if (customAdInfo_2.refresh_time > 0) {
                this._refreshCustomAdTimerTask = setTimeout(function () {
                    Utils_1.utils.showLog("\u5B9A\u65F6" + customAdInfo_2.refresh_time + "\u79D2\u5237\u65B0\u539F\u751F\u6A21\u7248");
                    _this.showCustomAd(parme);
                }, customAdInfo_2.refresh_time * 1000);
            }
        }
        else {
            Utils_1.utils.showLog("当前平台不支持原生模版广告！");
        }
    };
    /**
     * 隐藏模版广告
     */
    AdAgentVIVO.prototype.hideCustomAd = function () {
        this._isHide = true;
        clearTimeout(this._refreshCustomAdTimerTask);
        if (this._customAd) {
            this._customAd.hide();
        }
    };
    AdAgentVIVO = __decorate([
        ccclass
    ], AdAgentVIVO);
    return AdAgentVIVO;
}(AdAgent_1.default));
exports.default = AdAgentVIVO;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFZJVk8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUErQztBQUMvQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLCtEQUEwRDtBQUcxRCxtREFBOEM7QUFFOUMseURBQW9EO0FBRTlDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFPO0lBQWhEO1FBQUEscUVBcWxEQztRQW5sREcsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFHNUIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsWUFBWTtRQUNaLGdDQUEwQixHQUFXLENBQUMsQ0FBQztRQUN2QywrQkFBeUIsR0FBVyxDQUFDLENBQUM7UUFDdEMsZ0NBQTBCLEdBQVcsQ0FBQyxDQUFDO1FBRXZDLGlCQUFXLEdBQVEsSUFBSSxDQUFDO1FBQ3hCLHVCQUFpQixHQUFRLElBQUksQ0FBQztRQUM5Qix1QkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDbEMsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBRWxDLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLHVCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBWSxHQUFZ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LFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxDQUFDLENBQUMsQ0FBQTtpQkFDTDtxQkFBTTtvQkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7aUJBQ2xEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFHSCxJQUFJLGNBQVksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMseUJBQXlCLEdBQUcsVUFBVSxDQUFDO29CQUN4QyxhQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFLLGNBQVksQ0FBQyxZQUFZLCtDQUFTLENBQUMsQ0FBQztvQkFDdkQsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDNUIsQ0FBQyxFQUFFLGNBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDeEM7U0FDSjthQUFNO1lBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUdEOztPQUVHO0lBQ0ksa0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBbGxEZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXFsRC9CO0lBQUQsa0JBQUM7Q0FybERELEFBcWxEQyxDQXJsRHdDLGlCQUFPLEdBcWxEL0M7a0JBcmxEb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZEFnZW50IGZyb20gXCIuL0FkQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBOYXRpdmVUcnlHYW1lc1dpZGdldCBmcm9tIFwiLi9OYXRpdmVUcnlHYW1lc1dpZGdldFwiO1xyXG5pbXBvcnQgWVpfTmF0aXZlQmFubmVyIGZyb20gXCIuL1laX05hdGl2ZUJhbm5lclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVCYW5uZXJJbmZvIH0gZnJvbSBcIi4vQ29tbW9uQ29uZmlnXCI7XHJcbmltcG9ydCBDb21wYXRpYmxlVG9vbCBmcm9tIFwiLi9Db21wYXRpYmxlVG9vbFwiO1xyXG5pbXBvcnQgWVpfTmF0aXZlSXRlbSBmcm9tIFwiLi9ZWl9OYXRpdmVJdGVtXCI7XHJcbmltcG9ydCBZWl9OYXRpdmVBZE9iamVjdCBmcm9tIFwiLi9ZWl9OYXRpdmVBZE9iamVjdFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRWSVZPIGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgX2Jhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgX2luc2VydEFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfbmF0aXZlQmFubmVyQWQ6IGFueVtdID0gW107XHJcbiAgICBfbmF0aXZlSW5zZXJ0QWQ6IGFueVtdID0gW107XHJcbiAgICBfbmF0aXZlU2luZ2xlQWQ6IGFueVtdID0gW107XHJcblxyXG5cclxuICAgIF9pc0Jhbm5lclNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc0luc2VydFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvLyDlvZPliY3kvY3nva5pZOeahOe0ouW8lVxyXG4gICAgX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXI6IG51bWJlciA9IDA7XHJcbiAgICBfY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyOiBudW1iZXIgPSAwO1xyXG4gICAgX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX25hdGl2ZURhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfbmF0aXZlSW5zZXJ0RGF0YTogYW55ID0gbnVsbDtcclxuICAgIF9uYXRpdmVCYW5uZXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9uYXRpdmVJbnNlcnROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX3ZpZGVvTG9hZGVkOiBib29sZWFuID0gbnVsbDtcclxuXHJcbiAgICBfaXNJbnNlcnRBZFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc0luc2VydEFkTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2lzVmlkZW9Mb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc1ZpZGVvU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGxhc3RMYXN0U2hvd1ZpZGVvVGltZTogbnVtYmVyID0gMDsgLy/mnIDlkI7kuIDmrKHmmL7npLrop4bpopHml7bpl7RcclxuXHJcbiAgICBzaG93TnVtOiBudW1iZXIgPSAwOyAvLyBCYW5uZXLlub/lkYrlsZXnpLrmrKHmlbBcclxuICAgIHNob3dJbnNlcnROdW06IG51bWJlciA9IDA7IC8vIOaPkuWxj+W5v+WRiuWxleekuuasoeaVsFxyXG5cclxuXHJcbiAgICBfY3VyTmF0aXZlSXRlbTogWVpfTmF0aXZlSXRlbSA9IG51bGw7XHJcblxyXG4gICAgX25hdGl2ZUFkT2JqZWN0OiBZWl9OYXRpdmVBZE9iamVjdCA9IG51bGw7XHJcbiAgICBfbmF0aXZlQWQ6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5Ub29sX1Zpdm8uU3lzSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbHMuVG9vbF9WaXZvLlNlcnZlckNvbmZpZztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVCYW5uZXJJbmZvOiBOYXRpdmVCYW5uZXJJbmZvID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICAgICog6I635Y+W5b2T5YmNYmFubmVy6YWN572uXHJcbiAgICAgICAgKi9cclxuICAgIGdldE5hdGl2ZUJhbm5lckluZm8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUJhbm5lckluZm8gJiYgdGhpcy5fbmF0aXZlQmFubmVySW5mby5sb2NhdGlvbiA9PSB0aGlzLl9jdXJMb2NhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQmFubmVySW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLmdldE5hdGl2ZUJhbm5lckluZm8odGhpcy5fY3VyTG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9WaXZvLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA4NFwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy5pc1N1cHBvcnROYXRpdmVBZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcudml2b2NvbmZpZy5zaG93QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VmlkZW9BZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm/5ZGK5byA5YWz5YWz6Zet54q25oCB77yM5omA5pyJ5bm/5ZGK5LiN5pi+56S677yB6KaB5pi+56S65bm/5ZGK77yM6K+35omT5byAIENvbW1vblV0aWxzIOe7hOS7tuS4ilZJVklPIOmFjee9ruS4i+eahOW5v+WRiuW8gOWFs++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9pbml0VmlkZW9BZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy5Ub29sX1Zpdm8uaXNPdmVyTWluaVZlcnNpb24oXCIxMDQxXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pys5LiN5pSv5oyB6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnZpZGVvSWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopFJROmFjee9ruS4jeato+ehru+8gVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcG9zSWQ6IHN0cmluZyA9IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnZpZGVvSWQudHJpbSgpO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidmlkZW/lub/lkYpJRDpcIiArIHBvc0lkKTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQgPSBxZy5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IHBvc0lkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25Mb2FkKCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeWKoOi9veaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1ZpZGVvU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRzaG93ID0gdGhpcy5fdmlkZW9BZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiwg+eUqHRoZW7lkoxjYXRjaOS5i+WJjemcgOimgeWvuXNob3fnmoTnu5PmnpzlgZrkuIvliKTnqbrlpITnkIbvvIzpmLLmraLlh7rplJnvvIjlpoLmnpzmsqHmnInliKTnqbrvvIzlnKjlubPlj7DniYjmnKzkuLoxMDUy5Lul5Y+K5Lul5LiL55qE5omL5py65LiK5bCG5Lya5Ye6546w6ZSZ6K+v77yJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkc2hvdyAmJiBhZHNob3cudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopHmkq3mlL7lpLHotKXvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcigoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5byC5bi4IVwiICsgZXJyLmVyckNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhg5bu25pe26LCD55So5Yqg6L296KeG6aKR77yBYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuingueci+WujOinhumikeaJjeiDveiOt+W+l+WlluWKsSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lvZPliY3mmL7npLpCYW5uZXLnmoTkvY3nva5cclxuICAgIF9jdXJMb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ob25lO1xyXG4gICAgU2hvd0Jhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lLCBhcmdzOiBhbnkgPSBudWxsLCBpc1RpbWVSZWZyZXNoOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKror7fmsYLliLDphY3nva7mlofku7bvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9sZExvY2F0aW9uID0gdGhpcy5fY3VyTG9jYXRpb247XHJcblxyXG4gICAgICAgIHRoaXMuX2N1ckxvY2F0aW9uID0gbG9jYXRpb247XHJcblxyXG5cclxuICAgICAgICAvL+WmguaenOi3s+eUqOS9jee9ruWIh+aNouS5i+WQju+8jOmqjOivgeaYr+S4jeaYr+mAmui/h+WumuaXtuWZqOW8uuWItuWIt+aWsOaVsOaNru+8jOS4jeaYr+WImeWFiOmakOiXj2Jhbm5lclxyXG4gICAgICAgIGlmIChvbGRMb2NhdGlvbiAhPSBsb2NhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIobG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCByZWZyZXNoX2FkX3RpbWU6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fc3RhcnRCYW5uZXJUaW1lclRhc2spIC8gMTAwMDtcclxuXHJcbiAgICAgICAgbGV0IGludGVydmFsID0gdGhpcy5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lO1xyXG5cclxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzLmlzUmVmcmVzaCkge1xyXG4gICAgICAgICAgICBpc1RpbWVSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGludGVydmFsICYmIGludGVydmFsID4gMCkge1xyXG4gICAgICAgICAgICBpZiAocmVmcmVzaF9hZF90aW1lID4gaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGlzVGltZVJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliKTmlq3lvZPliY3kvY3nva7mmK/kuI3mmK/mmL7npLpiYW5uZXJcclxuICAgICAgICBpZiAodGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCkuaXNfc2hvd19iYW5uZXIgPT0gLTEpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9rumFjee9ruS4uuS4jeWxleekumJhbm5lciFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmlzX3Nob3dfcmVjID4gLTEpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9ruaYvuekuuS6kuaOqGJhbm5lclwiKTtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfVml2by5jYW5TaG93UmVjb21tZW5kKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5Ub29sX1Zpdm8uc2hvd1JlY0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DkuI3mlK/mjIHkupLmjqhiYW5uZXJcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFpc1RpbWVSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcubmJjbHIgJiYgdGhpcy5TZXJ2ZXJDb25maWcubmJjbHIgPT0gXCJ0cnVlXCIgJiYgdGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5uYXRpdmVCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7lrprml7blmajliLfmlrDmlbDmja4gXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIodGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5uYXRpdmVCYW5uZXJBZCwgdGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5ZCv5a6a5pe25Yi35pawID4+Pj4+Pj4+PlwiICsgKGludGVydmFsIC0gcmVmcmVzaF9hZF90aW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlTaG93QmFubmVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWumuaXtiR7aW50ZXJ2YWx956eS6LCD55Soc2hvd2Jhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dPbGRCYW5uZXIodGhpcy5fY3VyTG9jYXRpb24sIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoaW50ZXJ2YWwgLSByZWZyZXNoX2FkX3RpbWUpICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICh1dGlscy5fdG9vbF9WaXZvLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA1OVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOZXdCYW5uZXIobG9jYXRpb24sIGFyZ3MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd09sZEJhbm5lcihsb2NhdGlvbiwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9sYXN0U2hvd1RpbWU6IG51bWJlciA9IDA7Ly/kuIrkuIDmrKHosIPnlKhzaG93QmFubmVy55qE5pe26Ze0XHJcbiAgICBfYmFubmVyVGltZW91dFNob3c6IG51bWJlciA9IDA7XHJcbiAgICBzaG93TmV3QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgY3VyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FwID0gdGhpcy5TZXJ2ZXJDb25maWcgPyB0aGlzLlNlcnZlckNvbmZpZy5jYXBfc2hvd19iYW5uZXJfdGltZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjYXAgPSBjYXAgPyBjYXAgOiAxNTtcclxuICAgICAgICBpZiAoKChjdXJUaW1lIC0gdGhpcy5fbGFzdFNob3dUaW1lKSAvIDEwMDApID4gY2FwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTaG93VGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd09sZEJhbm5lcihsb2NhdGlvbiwgYXJncyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFNob3dUaW1lID0gY3VyVGltZTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Jhbm5lclRpbWVvdXRTaG93KTtcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyVGltZW91dFNob3cgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLovr7liLBcIiArIGNhcCArIFwi6Ze06ZqU77yM5pi+56S6YmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93T2xkQmFubmVyKHRoaXMuX2N1ckxvY2F0aW9uLCBhcmdzKTtcclxuICAgICAgICAgICAgfSwgY2FwICogMTAwMCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCIxMDU55Lul5LiK5bGV56S6YmFubmVy5b+F6aG76Ze06ZqUXCIgKyBjYXAgKyBcIuenklwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmF0aXZlSXNDbG9zZTogYm9vbGVhbiA9IGZhbHNlOy8v5Y6f55SfYmFubmVy5piv5ZCm5bey57uP6KKr5YWz6ZetXHJcbiAgICBfc2hvd0Jhbm5lclRpbWVySWQ6IG51bWJlciA9IDA7XHJcbiAgICBfZGVsYXlTaG93QmFubmVySWQ6IG51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIF9zdGFydEJhbm5lclRpbWVyVGFzazogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBTaG93T2xkQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuXHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuY29uZmlnLnZpdm9jb25maWcuc2hvd0FkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlTaG93QmFubmVySWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlSXNDbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLlNlcnZlckNvbmZpZy5yZWZyZXNoX2FkX3RpbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnZhbCAmJiBpbnRlcnZhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlrprml7Yke2ludGVydmFsfeenkuiwg+eUqHNob3diYW5uZXJgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyKGxvY2F0aW9uLCB7fSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaW50ZXJ2YWwgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaXNUZXN0ICYmIHRoaXMuU2VydmVyQ29uZmlnLmlzVGVzdCA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dOdW0gJSAyICE9IDAgJiYgcWcuaXNTdXBwb3J0TmF0aXZlQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua1i+ivleaooeW8jz4+IOmhuuW6j+WxleekuuWOn+eUn0Jhbm5lcuW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmtYvor5XmqKHlvI8+PlwiICsgKHFnLmlzU3VwcG9ydE5hdGl2ZUFkID8gXCJcIiA6IFwi5bmz5Y+w5LiN5pSv5oyB5Y6f55Sf5bm/5ZGKPj5cIiArIFwi6aG65bqP5bGV56S65bCP5ri45oiPQmFubmVy5bm/5ZGK77yBXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZChsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiICYmIHFnLmlzU3VwcG9ydE5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrljp/nlJ9CYW5uZXLlub/lkYohXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVPdXQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9iYW5uZXJfZGVsYXlfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVPdXQgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2RlbGF5X3RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlm6DkuLrmj5LlsY/kuZ/mmK/kvJjlhYjlsZXnpLrljp/nlJ/vvIzmiYDku6ViYW5uZXLlu7bov5/mmL7npLoke3RpbWVPdXR956eSYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbGF5U2hvd0Jhbm5lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aW1lT3V0ICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65bCP5ri45oiPQmFubmVy5bm/5ZGK77yM5byV5pOOXCIgKyAocWcuaXNTdXBwb3J0TmF0aXZlQWQgPyBcIuaUr+aMgVwiIDogXCLkuI3mlK/mjIFcIikgKyBcIuWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZChsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6YWN572u5pWw5o2u5Lit5rKh5pyJIGJhbm5lcl9maXJzdF9hZCDlrZfmrrXvvIwgYmFubmVy5bm/5ZGK5LiN5pi+56S6IVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIEhpZGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kZWxheVNob3dCYW5uZXJJZCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9iYW5uZXJUaW1lb3V0U2hvdyk7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUlzQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhZGhpZGUgPSB0aGlzLl9iYW5uZXJBZC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRoaWRlICYmIGFkaGlkZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcuW5v+WRiumakOiXj+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXLlub/lkYrpmpDol4/lpLHotKVcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRlc3Ryb3kgPSB0aGlzLl9iYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkZXN0cm95ICYmIGFkZGVzdHJveS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXLlub/lkYrplIDmr4HmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXLlub/lkYrplIDmr4HlpLHotKVcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpmpDol4/ljp/nlJ9CYW5uZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy/pmpDol4/kupLmjqhiYW5uZXJcclxuICAgICAgICAgICAgdXRpbHMuVG9vbF9WaXZvICYmIHV0aWxzLlRvb2xfVml2by5oaWRlUmVjQmFubmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF90cnlJbmRleCA9IDA7XHJcbiAgICB0cnlHYW1lSW5mbzogYW55O1xyXG4gICAgcHVibGljIHNob3dOYXRpdmVUcnlHYW1lV2lkZ2V0KHBhcmFtczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/mipbliqjlub/lkYrjgIIgcG9zSWQ6XCIgKyB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVUcnlHYW1lSWRzWzBdLCBcIiAgdXRpbHMudHJ5R2FtZURhdGVcIiwgdXRpbHMudHJ5R2FtZURhdGUsIFwibmVlZGNoYW5nZVwiLCB1dGlscy5uYXRpdmVOZWVkQ2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLm5hdGl2ZU5lZWRDaGFuZ2UgfHwgIXV0aWxzLnRyeUdhbWVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlVHJ5R2FtZUlkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cnlHYW1lQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVUcnlHYW1lSWRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0cnlHYW1lQWTvvJpcIiArIHRyeUdhbWVBZClcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJ5R2FtZUFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeUdhbWVBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc1wiLCByZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5uYXRpdmVOZWVkQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUdhbWVJbmZvID0gcmVzLmFkTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5oqW5Yqo6K+V5a6M5bm/5ZGK6LWE5rqQ5ouJ5Y+W5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFkSWQgPSByZXMuYWRMaXN0WzBdLmFkSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiYWRJZDpcIiArIGFkSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnRyeUdhbWVEYXRlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkSWQgPT0gZWxlbWVudC5kYXRlWzBdLmFkSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbkFkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuQWRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnRyeUdhbWVEYXRlLnB1c2goeyBcInRyeUdhbWVBZFwiOiB0cnlHYW1lQWQsIFwiZGF0ZVwiOiB0aGlzLnRyeUdhbWVJbmZvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuX25hdGl2ZVRyeUdhbWVOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5fbmF0aXZlVHJ5R2FtZU5vZGUuZ2V0Q29tcG9uZW50KE5hdGl2ZVRyeUdhbWVzV2lkZ2V0KS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnlHYW1lQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWOn+eUn+W5v+WRiuWKoOi9veW8guW4uFwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5R2FtZUFkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mipbliqhpZOS4jeWtmOWcqFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZVRyeUdhbWVXaWRnZXQocGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy5jb25maWcudml2b2NvbmZpZy5zaG93QWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaXNUZXN0ICYmIHRoaXMuU2VydmVyQ29uZmlnLmlzVGVzdCA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93SW5zZXJ0TnVtKys7XHJcbiAgICAgICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKHRoaXMuc2hvd0luc2VydE51bSAlIDIgPT0gMCwgXCI8PHRoaXMuc2hvd0luc2VydE51bSAlIDIgPT0gMFwiKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0luc2VydE51bSAlIDIgPT0gMCAmJiBxZy5pc1N1cHBvcnROYXRpdmVBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmtYvor5XmqKHlvI8+PiDpobrluo/lsZXnpLrljp/nlJ/mj5LlsY/lub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmtYvor5XmqKHlvI8+PlwiICsgKHFnLmlzU3VwcG9ydE5hdGl2ZUFkID8gXCJcIiA6IFwi5bmz5Y+w5LiN5pSv5oyB5Y6f55Sf5bm/5ZGKPj5cIikgKyBcIumhuuW6j+WxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uICYmIGxvY2F0aW9uID09IEJhbm5lckxvY2F0aW9uLlBhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIiAmJiBxZy5pc1N1cHBvcnROYXRpdmVBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pqC5YGc55WM6Z2i5LiN5bu25pe25bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIgJiYgcWcuaXNTdXBwb3J0TmF0aXZlQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWOn+eUn+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwuYmluZCh0aGlzKSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVJbnNlcnRBZFNob3dDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBuYXRpdmVJbnNlckFkRGVsYXlDYWxsKCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYo6IOW9k+WJjeeCueWHu+asoeaVsD1cIiArIHV0aWxzLlRvb2xfVml2by5OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMgKyBcIjsg54K55Ye75qyh5pWw6ZmQ5Yi2PVwiICsgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2NsaWNrX2NvdW50ICsgXCI7IOWxleekuuasoeaVsOmXtOmalD1cIiArIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfaW50ZXJ2YWxfdGltZSArIFwiOyDlsZXnpLrntK/orqE9XCIgKyB0aGlzLl9uYXRpdmVJbnNlcnRBZFNob3dDb3VudCk7XHJcbiAgICAgICAgaWYgKHV0aWxzLlRvb2xfVml2by5OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMgPj0gKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbGlja19jb3VudCB8fCAwKSkge1xyXG4gICAgICAgICAgICAvLyDmr4/ml6Xngrnlh7vmrKHmlbDliLDovr7kuIrpmZDvvIzpmZDliLblsZXnpLrmrKHmlbBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUluc2VydEFkU2hvd0NvdW50ID49ICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfc2hvd19pbnRlcnZhbCB8fCAwKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+v5Lul5bGV56S6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZCh0aGlzLl9zaG93TmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOS4jeiDveWxleekulxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnNob3dBZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLmxhc3RMYXN0U2hvd1ZpZGVvVGltZSkgLyAxMDAwO1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxfdGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnZpZGVvX2ludGVydmFsX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIGludGVydmFsX3RpbWUgPSB1dGlscy5TZXJ2ZXJDb25maWcudmlkZW9faW50ZXJ2YWxfdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwgPiBpbnRlcnZhbF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RMYXN0U2hvd1ZpZGVvVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1ZpZGVvTG9hZGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRzaG93ID0gdGhpcy5fdmlkZW9BZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiwg+eUqHRoZW7lkoxjYXRjaOS5i+WJjemcgOimgeWvuXNob3fnmoTnu5PmnpzlgZrkuIvliKTnqbrlpITnkIbvvIzpmLLmraLlh7rplJnvvIjlpoLmnpzmsqHmnInliKTnqbrvvIzlnKjlubPlj7DniYjmnKzkuLoxMDUy5Lul5Y+K5Lul5LiL55qE5omL5py65LiK5bCG5Lya5Ye6546w6ZSZ6K+v77yJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkc2hvdyAmJiBhZHNob3cudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5pi+56S65oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHlub/lkYrmmL7npLrlpLHotKVcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeW5v+WRiuivt+axgumXtOmalOWwj+S6jjYw56eSLOebtOaOpei/lOWbnmZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNJbnNlcnRTaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcudml2b2NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLnZpdm9jb25maWcuaW5zZXJ0SWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIXRoaXMuX2luc2VydEFkKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydEFkID0gcWcuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcudml2b2NvbmZpZy5pbnNlcnRJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luc2VydEFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuazqOWGjOWwj+a4uOaIj+aPkuWxj+W5v+WRiuWbnuiwg++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5vbkVycm9yKCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aXZvIOWwj+a4uOaIj+aPkuWxj+W5v+WRiuWHuumUmTpcIiArIGVyci5lcnJDb2RlICsgZXJyLmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0luc2VydFNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnNlcnRTaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vmmL7npLrljp/nlJ/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2luc2VydEFkLm9uTG9hZCgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0luc2VydFNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5faXNJbnNlcnRTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZHNob3cgPSB0aGlzLl9pbnNlcnRBZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiwg+eUqHRoZW7lkoxjYXRjaOS5i+WJjemcgOimgeWvuXNob3fnmoTnu5PmnpzlgZrkuIvliKTnqbrlpITnkIbvvIzpmLLmraLlh7rplJnvvIjlpoLmnpzmsqHmnInliKTnqbrvvIzlnKjlubPlj7DniYjmnKzkuLoxMDUy5Lul5Y+K5Lul5LiL55qE5omL5py65LiK5bCG5Lya5Ye6546w6ZSZ6K+v77yJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkc2hvdyAmJiBhZHNob3cudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidml2byDlsI/muLjmiI/mj5LlsY/lub/lkYrmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luc2VydFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXJyLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5paw55So5oi3N+WkqeWGheS4jeiDveabneWFieaPkuWxj++8jOivt+WwhuaJi+acuuaXtumXtOiwg+aVtOS4ujflpKnlkI7vvIzpgIDlh7rmuLjmiI/ph43mlrDov5vlhaVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDAwOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIjEw56eS5YaF6LCD55So5bm/5ZGK5qyh5pWw6LaF6L+HMeasoe+8jDEw56eS5ZCO5YaN6LCD55SoXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0sIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDAwMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWKoOi9veW5v+WRiuWksei0pe+8jOmHjeaWsOWKoOi9veW5v+WRilwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlj4LogIMgaHR0cHM6Ly9taW5pZ2FtZS52aXZvLmNvbS5jbi9kb2N1bWVudHMvIy9sZXNzb24vb3Blbi1hYmlsaXR5L2FkP2lkPeW5v+WRiumUmeivr+eggeS/oeaBryDlr7nplJnor6/noIHlgZrliIbnsbvlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaPkuWxj+W5v+WRiuWxleekuuWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9pbnNlcnRBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aXZvIOWwj+a4uOaIj+aPkuWxj+W5v+WRiuWIm+W7uuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aXZvIOWwj+a4uOaIj+aPkuWxj+W5v+WRiumFjee9ruS/oeaBr+mUmeivryFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vmmL7npLrljp/nlJ/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0Jhbm5lclNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy52aXZvY29uZmlnXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcudml2b2NvbmZpZy5iYW5uZXJJZCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkQmFubmVyQWQgPSB0aGlzLl9iYW5uZXJBZDtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRlc3Ryb3kgPSBvbGRCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkZXN0cm95ICYmIGFkZGVzdHJveS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXLlub/lkYrplIDmr4HmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXLlub/lkYrplIDmr4HlpLHotKVcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIXRoaXMuX2Jhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gcWcuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcudml2b2NvbmZpZy5iYW5uZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLms6jlhozlsI/muLjmiI9iYW5uZXLlm57osIMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uRXJyb3IoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlZJVk8g5bm/5ZGK5p2h5Yqg6L295aSx6LSlISBjb2RlIDogXCIgKyBlcnIuZXJyQ29kZSArIFwiOyBtc2cgOiBcIiArIGVyci5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65aSH55So5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0Jhbm5lclNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQmFubmVyU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRzaG93ID0gdGhpcy5fYmFubmVyQWQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZHNob3cgJiYgYWRzaG93LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidml2b+Wwj+a4uOaIj2Jhbm5lcuW5v+WRiuWxleekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXJyLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzAwMDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaWsOeUqOaItzflpKnlhoXkuI3og73mm53lhYlCYW5uZXLvvIzor7flsIbmiYvmnLrml7bpl7TosIPmlbTkuLo35aSp5ZCO77yM6YCA5Ye65ri45oiP6YeN5paw6L+b5YWlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCIxMOenkuWGheiwg+eUqOW5v+WRiuasoeaVsOi2hei/hzHmrKHvvIwxMOenkuWQjuWGjeiwg+eUqFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9LCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliqDovb3lub/lkYrlpLHotKXvvIzph43mlrDliqDovb3lub/lkYpcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+C6ICDIGh0dHBzOi8vbWluaWdhbWUudml2by5jb20uY24vZG9jdW1lbnRzLyMvbGVzc29uL29wZW4tYWJpbGl0eS9hZD9pZD3lub/lkYrplJnor6/noIHkv6Hmga8g5a+56ZSZ6K+v56CB5YGa5YiG57G75aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImJhbm5lcuW5v+WRiuWxleekuuWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInZpdm8g5bCP5ri45oiPQmFubmVy5bm/5ZGK5Yib5bu65aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aXZvIOWwj+a4uOaIj0Jhbm5lcuW5v+WRiumFjee9ruS/oeaBr+mUmeivryFcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9jdXJOYXRpdmVCYW5uZXJJbmZvOiBhbnkgPSB7fTtcclxuICAgIF9jcmVhdGVOYXRpdmVCYW5uZXJBZChjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoIXFnLmlzU3VwcG9ydE5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5byV5pOO5LiN5pSv5oyB5Y6f55SfQmFubmVy5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGNvbXBsZXRlQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcjpcIiArIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZUJhbm5lcklkc1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlQmFubmVySWRzW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXJdKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5bm/5ZGKQmFubmVy44CCIHBvc0lkOlwiICsgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlQmFubmVySWRzW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXJdKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUJhbm5lckFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVCYW5uZXJJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcl1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuYXRpdmVCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lckFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5LqGQkFOTkVS77yM5LiN5YGa5Lu75L2V5aSE55CG77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0QmFubmVyVGltZXJUYXNrID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK6LWE5rqQ5ouJ5Y+W5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5hZExpc3RbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVEYXRhVmFsaWQoZGF0YSkgfHwgdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCkuc2hvd19zdF9iYW5uZXIgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlQmFubmVyKG5hdGl2ZUJhbm5lckFkLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJOYXRpdmVCYW5uZXJJbmZvLm5hdGl2ZUJhbm5lckFkID0gbmF0aXZlQmFubmVyQWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliKDpmaTlvZPliY3lub/lkYpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkaGlkZSA9IHRoaXMuX2Jhbm5lckFkLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkaGlkZSAmJiBhZGhpZGUudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcuW5v+WRiumakOiXj+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVy5bm/5ZGK6ZqQ6JeP5aSx6LSlXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGRlc3Ryb3kgPSB0aGlzLl9iYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRlc3Ryb3kgJiYgYWRkZXN0cm95LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVy5bm/5ZGK6ZSA5q+B5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcuW5v+WRiumUgOavgeWksei0pVwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK6LWE5rqQ5Ye66ZSZ77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyIDwgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlQmFubmVySWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmnaHpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5bm/5ZGK5p2h77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRMb2FkID0gbmF0aXZlQmFubmVyQWQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkTG9hZCAmJiBhZExvYWQudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlSXNDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+S6hkJBTk5FUu+8jOS4jeWBmuS7u+S9leWkhOeQhu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyIDwgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlQmFubmVySWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmnaHpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5bm/5ZGK5p2h77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVCYW5uZXJJZHMgJiYgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA8IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZUJhbm5lcklkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiuadoemBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIj4+Pj4+5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65aSH55So5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+W5v+WRiuadoe+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVOYXRpdmVJbnNlcnRBZChjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoIXFnLmlzU3VwcG9ydE5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5byV5pOO5LiN5pSv5oyB5Y6f55Sf5o+S5bGP5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGNvbXBsZXRlQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VydDpcIiArIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVJbnNlcnRJZHNcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZUluc2VydElkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJdKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5o+S5bGP5bm/5ZGK44CCIHBvc0lkOlwiICsgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlSW5zZXJ0SWRzW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcl0pO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBsZXQgbmF0aXZlSW5zZXJ0QWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zSWQ6IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZUluc2VydElkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9uYXRpdmVJbnNlcnRBZC5wdXNoKG5hdGl2ZUluc2VydEFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW5zZXJ0QWQub25Mb2FkKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiui1hOa6kOaLieWPluaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuYWRMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoZWNrTmF0aXZlSW5zZXJ0RGF0YVZhbGlkKGRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd05hdGl2ZUluc2VydChuYXRpdmVJbnNlcnRBZCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6LWE5rqQ5LiN5ZCI5rOV77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6LWE5rqQ5Ye66ZSZ77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK5Yib5bu65aSx6LSl77yBXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkTG9hZCA9IG5hdGl2ZUluc2VydEFkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBhZExvYWQgJiYgYWRMb2FkLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc1wiLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6LWE5rqQ5ouJ5Y+W5aSx6LSl77yBXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVJbnNlcnRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVJbnNlcnRJZHMgJiYgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyIDwgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlSW5zZXJ0SWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65Y6f55SfYmFubmVy57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIF9zaG93TmF0aXZlQmFubmVyKG5hdGl2ZUJhbm5lckFkOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65Y6f55SfYmFubmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpICYmIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHx8ICghdGhpcy5fbmF0aXZlQmFubmVyTm9kZSAmJiB1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlQmFubmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+W5v+WRimJhbm5lcuS9jVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUucG9zaXRpb24gPSBDb21wYXRpYmxlVG9vbC5wb3NpdGlvbihjYy53aW5TaXplLndpZHRoIC8gMiwgdGhpcy5fbmF0aXZlQmFubmVyTm9kZS5oZWlnaHQgKiB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLnNjYWxlWSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQmFubmVyOiBZWl9OYXRpdmVCYW5uZXIgPSB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmdldENvbXBvbmVudChcIllaX05hdGl2ZUJhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lci5pbml0KG5hdGl2ZUJhbm5lckFkLCBkYXRhLCB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZUJhbm5lcue7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGKYmFubmVy5L2N5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWOn+eUn+aPkuWxj+e7hOS7tlxyXG4gICAgICovXHJcbiAgICBfc2hvd05hdGl2ZUluc2VydChuYXRpdmVJbnNlcnRBZDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuWOn+eUn+aPkuWxj1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICgoIWNjLmlzVmFsaWQodGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSkpIHx8ICF0aGlzLl9uYXRpdmVJbnNlcnROb2RlICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5o+S5bGP5bm/5ZGK5L2NXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUluc2VydE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVJbnNlcnROb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9uYXRpdmVJbnNlcnROb2RlLCA5OTk5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXRpdmVJbnNlcnQgPSB0aGlzLl9uYXRpdmVJbnNlcnROb2RlLmdldENvbXBvbmVudChcIllaX05hdGl2ZUluc2VydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUluc2VydEFkU2hvd0NvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW5zZXJ0LmluaXQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJOYXRpdmVJbnNlcnTnu4Tku7bkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiuaPkuWxj+S9jeayoeacieWIm+W7uu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuU2VydmVyQ29uZmlnLnNob3dfaW5zZXJ0X2hpZGVfYmFubmVyIHx8IHRoaXMuU2VydmVyQ29uZmlnLnNob3dfaW5zZXJ0X2hpZGVfYmFubmVyICE9IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmj5LlsY/lsZXnpLrlkI7pmpDol49CYW5uZXLvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBTaG93Q2xvc2VCdG5CYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnczogYW55KSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlNob3dDbG9zZUJ0bkJhbm5lciA+Pj4+Pj4+Pj4uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaXNNb3ZlQnRuID0gMDtcclxuICAgICAgICBsZXQgYnRuID0gYXJncy5jbG9zZUJ0bjtcclxuICAgICAgICBsZXQgd2luSGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pc19tb3ZlX2J0bikge1xyXG4gICAgICAgICAgICAgICAgaXNNb3ZlQnRuID0gdGhpcy5TZXJ2ZXJDb25maWcuaXNfbW92ZV9idG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhpc01vdmVCdG4gPT0gMCA/IFwi5pi+56S6YmFubmVyLOS4lOaMiemSruWcqOS4iumdolwiIDogYOaYvuekukJhbm5lcizmjInpkq7lsYXlupXpg6jkuJQke2lzTW92ZUJ0bn3mr6vnp5LlkI7np7vliqhgKTtcclxuICAgICAgICAgICAgLy8gaWYgKCFpc01vdmVCdG4gfHwgaXNNb3ZlQnRuID09IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIGJ0bi55ID0gLSh3aW5IZWlnaHQgLyAyKSArIGJ0bi5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLlNob3dCYW5uZXIobG9jYXRpb24sIGFyZ3MpO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICghdGhpcy5fYmFubmVySXNIaWRlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bu26L+f6LCD55So5YWz6Zet5oyJ6ZKu55qEQmFubmVyID4+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIobG9jYXRpb24sIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmNQmFubmVy5Li66ZqQ6JeP54q25oCB77yM5YWz6Zet5oyJ6ZKu55qEQmFubmVy5LiN5pi+56S6ID4+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRZID0gMjQwO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygndXRpbHMgLSBhZFk6JyArIGFkWSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRZID4gMCAmJiBidG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4ueSA9IC0od2luSGVpZ2h0IC8gMiAtIGFkWSkgKyBidG4uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJidG5DbG9zZS55XCIgKyBidG4ueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGlzTW92ZUJ0bik7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8ge1wiYWRMaXN0XCI6W3tcImFkSWRcIjowLFwidGl0bGVcIjpcIuW/q+aJi1wiLFwiZGVzY1wiOlwi5omL5py65oC75piv6L+Z5LmI5Y2h77yM5aaC5L2V6Kej5YazXCIsXCJpY29uXCI6XCJodHRwOi8vaW1nd3NkbC52aXZvLmNvbS5jbi9hcHBzdG9yZS9kZXZlbG9wZXIvaWNvbi8yMDE5MDkxOC8yMDE5MDkxODExMTMwMDE1OTkwNDEucG5nXCIsXHJcbiAgICAvLyBcImltZ1VybExpc3RcIjpbXCJodHRwOi8vYWRzLW1hcmtldGluZy12aXZvZnMudml2by5jb20uY24vTnRCcko5ZHVleWdETG96OC9tYXRlcmlhbC8yMDE5MDgvNzg3MDc2NDY0MDEzNDZjYTlmYzgzOThmZjc5ODUwZDIyMDE5MDgwOS5qcGdcIl0sXHJcbiAgICAvLyBcImxvZ29VcmxcIjpcIlwiLFwiY3JlYXRpdmVUeXBlXCI6MCxcImludGVyYWN0aW9uVHlwZVwiOjJ9LFxyXG4gICAgLy8ge1wiYWRJZFwiOjEsXCJ0aXRsZVwiOlwi5b+r5omLXCIsXCJkZXNjXCI6XCLmiYvmnLrmgLvmmK/ov5nkuYjljaHvvIzlpoLkvZXop6PlhrNcIixcImljb25cIjpcImh0dHA6Ly9pbWd3c2RsLnZpdm8uY29tLmNuL2FwcHN0b3JlL2RldmVsb3Blci9pY29uLzIwMTkwOTE4LzIwMTkwOTE4MTExMzAwMTU5OTA0MS5wbmdcIixcclxuICAgIC8vIFwiaW1nVXJsTGlzdFwiOltcImh0dHA6Ly9hZHMtbWFya2V0aW5nLXZpdm9mcy52aXZvLmNvbS5jbi9OdEJySjlkdWV5Z0RMb3o4L21hdGVyaWFsLzIwMTkwOC83ODcwNzY0NjQwMTM0NmNhOWZjODM5OGZmNzk4NTBkMjIwMTkwODA5LmpwZ1wiXSxcImxvZ29VcmxcIjpcIlwiLFwiY3JlYXRpdmVUeXBlXCI6MCxcImludGVyYWN0aW9uVHlwZVwiOjJ9LFxyXG4gICAgLy8ge1wiYWRJZFwiOjIsXCJ0aXRsZVwiOlwi5b+r5omLXCIsXCJkZXNjXCI6XCLmiYvmnLrmgLvmmK/ov5nkuYjljaHvvIzlpoLkvZXop6PlhrNcIixcImljb25cIjpcImh0dHA6Ly9pbWd3c2RsLnZpdm8uY29tLmNuL2FwcHN0b3JlL2RldmVsb3Blci9pY29uLzIwMTkwOTE4LzIwMTkwOTE4MTExMzAwMTU5OTA0MS5wbmdcIixcImltZ1VybExpc3RcIjpbXCJodHRwOi8vYWRzLW1hcmtldGluZy12aXZvZnMudml2by5jb20uY24vTnRCcko5ZHVleWdETG96OC9tYXRlcmlhbC8yMDE5MDgvNzg3MDc2NDY0MDEzNDZjYTlmYzgzOThmZjc5ODUwZDIyMDE5MDgwOS5qcGdcclxuICAgIF9jaGVja05hdGl2ZURhdGFWYWxpZChkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChkYXRhLmljb24gfHwgKGRhdGEuaW1nVXJsTGlzdCAmJiBkYXRhLmltZ1VybExpc3QubGVuZ3RoID4gMCkpO1xyXG4gICAgfVxyXG4gICAgX2NoZWNrTmF0aXZlSW5zZXJ0RGF0YVZhbGlkKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoZGF0YS5pY29uIHx8IChkYXRhLmltZ1VybExpc3QgJiYgZGF0YS5pbWdVcmxMaXN0Lmxlbmd0aCA+IDApKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2NoZWNrTmF0aXZlU2lnbkRhdGFWYWxpZChkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKGRhdGEuaW1nVXJsTGlzdCAmJiBkYXRhLmltZ1VybExpc3QubGVuZ3RoID4gMCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIF9uYXRpdmVUcnlHYW1lTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuua1rueql+W5v+WRiuaMguS7tlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqIGBgYFxyXG4gICAgICoge1xyXG4gICAgICogZ3JvdXA6c3RyaW5nXHJcbiAgICAgKiBsZWZ0Om51bWJlclxyXG4gICAgICogYm90dG9tOm51bWJlclxyXG4gICAgICogc2NhbGU6bnVtYmVyXHJcbiAgICAgKiBwYXJlbnQ6Y2MuTm9kZVxyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKiBAcmV0dXJucyDnlJ/miJDnmoTnu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVRyeUdhbWVXaWRnZXQocGFyYW1zOiBhbnkgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZVRyeUdhbWVOb2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLm5hdGl2ZVRyeUdhbWVXaWRnZXQpO1xyXG4gICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVRyeUdhbWVOb2RlID0gbm9kZTtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuekluZGV4ID0gOTk5OTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUgPSB0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZTtcclxuICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnNjYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy50b3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC50b3AgPSBwYXJhbXMudG9wO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmxlZnQgPSBwYXJhbXMubGVmdDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuZ2V0Q29tcG9uZW50KE5hdGl2ZVRyeUdhbWVzV2lkZ2V0KS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5rWu5Yqo6K+V546p5oyC5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgc2lnbmxlTmF0aXZlQWQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rnu5PnrpfpobXpnaLmjqjlub/nu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNob3dTaW5nbGVOYXRpdmVBZChwYXJhbXM/OiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaW5nbGVOYXRpdmVBZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaWdubGVOYXRpdmVBZCAmJiBjYy5pc1ZhbGlkKHRoaXMuc2lnbmxlTmF0aXZlQWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25sZU5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNpZ25sZU5hdGl2ZUFkID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNpbmdsZU5hdGl2ZUFkKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuYXRpdmVJdGVtOiBZWl9OYXRpdmVJdGVtID0gdGhpcy5zaWdubGVOYXRpdmVBZC5nZXRDb21wb25lbnQoXCJZWl9OYXRpdmVJdGVtXCIpO1xyXG4gICAgICAgICAgICBuYXRpdmVJdGVtLnNob3dUeXBlID0gMjtcclxuICAgICAgICAgICAgbmF0aXZlSXRlbS5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUl0ZW0gPSBuYXRpdmVJdGVtO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMucGFyZW50LmFkZENoaWxkKHRoaXMuc2lnbmxlTmF0aXZlQWQsIGNjLm1hY3JvLk1BWF9aSU5ERVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWNleS4quWOn+eUn+W5v+WRiuWIm+W7uuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmxlTmF0aXZlQWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyBzaW5nbGVOYXRpdmVBZCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIF9zaW5nbGVBZENyZWF0ZVRpbWU6IG51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65Y2V5Liq5Y6f55Sf5bm/5ZGKXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGVDYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTmF0aXZlQWQocGFyYW1zOiBhbnkgPSBudWxsLCBuYXRpdmVJdGVtPzogWVpfTmF0aXZlSXRlbSkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJfY3JlYXRlTmF0aXZlQWQgPj4+Pj5cIik7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgaWYgKG5hdGl2ZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUl0ZW0gPSBuYXRpdmVJdGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVmcmVzaFRpbWUgPSB0aGlzLlNlcnZlckNvbmZpZy5zdF9uYXRpdmVfYWRfcmVmcmVzaF90aW1lID8gdGhpcy5TZXJ2ZXJDb25maWcuc3RfbmF0aXZlX2FkX3JlZnJlc2hfdGltZSA6IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVBZE9iamVjdCAmJiB0aGlzLl9uYXRpdmVBZE9iamVjdC5kYXRhICYmICF0aGlzLl9uYXRpdmVBZE9iamVjdC5pc19yZXBvcnRDbGljayAmJiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLl9zaW5nbGVBZENyZWF0ZVRpbWUpIC8gMTAwMCA8IHJlZnJlc2hUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlvZPliY3ljp/nlJ/lub/lkYrnmoTlsZXnpLrml7bpl7QkeyhuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuX3NpbmdsZUFkQ3JlYXRlVGltZSkgLyAxMDAwfeenku+8jOacqui+vuWIt+aWsOaXtumXtCR7cmVmcmVzaFRpbWV956eS6ZmQ5Yi277yM55u05o6l5L2/55So5LiK5LiA5qyh5pWw5o2u77yBYCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlOlwiICsgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSArIFwiICAjdGhpcy5fbmF0aXZlU2luZ2xlQWQubGVuZ3RoXCIgKyB0aGlzLl9uYXRpdmVTaW5nbGVBZC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5hdGl2ZVNpbmdsZUFkID0gdGhpcy5fbmF0aXZlU2luZ2xlQWRbdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZV07XHJcbiAgICAgICAgICAgIGlmICghbmF0aXZlU2luZ2xlQWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlU2luZ2xlQWRJZHNcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkc1t0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/lub/lkYrjgIIgcG9zSWQ6XCIgKyB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkc1t0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlU2luZ2xlQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkc1t0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlU2luZ2xlQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlU2luZ2xlQWQucHVzaChuYXRpdmVTaW5nbGVBZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVTaW5nbGVBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVTaWduRGF0YVZhbGlkKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpbmdsZUFkQ3JlYXRlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkID0gbmF0aXZlU2luZ2xlQWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCJjYWxsYmFjayA+Pj5cIiwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayh0aGlzLmdldE5hdGl2ZUFkRGF0YSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd05hdGl2ZUFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK6LWE5rqQ5LiN5ZCI5rOV77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK6LWE5rqQ5Ye66ZSZ77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUgPCB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljZXkuKrljp/nlJ/lub/lkYpJROmBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVTaW5nbGVBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/ljZXkuKrlub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA8IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWNleS4quWOn+eUn+W5v+WRiklE6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVTaW5nbGVBZCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIm5hdGl2ZVNpbmdsZUFkIHJlbG9hZFwiKTtcclxuICAgICAgICAgICAgICAgIG5hdGl2ZVNpbmdsZUFkLmxvYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUrKztcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkcyAmJiB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlIDwgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlU2luZ2xlQWRJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOYXRpdmVBZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2V5Liq5Y6f55Sf5bm/5ZGKSUQg6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93TmF0aXZlQWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ck5hdGl2ZUl0ZW0gJiYgY2MuaXNWYWxpZCh0aGlzLl9jdXJOYXRpdmVJdGVtLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUl0ZW0uaW5pdCh0aGlzLmdldE5hdGl2ZUFkRGF0YSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6f55Sf5bm/5ZGK5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gYXJncyBcclxuICAgICAqL1xyXG4gICAgZ2V0TmF0aXZlQWREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbmF0aXZlQWRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRPYmplY3QgPSBuZXcgWVpfTmF0aXZlQWRPYmplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWRPYmplY3QuX25hdGl2ZU9iaiA9IHRoaXMuX25hdGl2ZUFkO1xyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVBZE9iamVjdC5kYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVBZE9iamVjdC5kYXRhLmFkSWQgIT0gdGhpcy5fbmF0aXZlRGF0YS5hZElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZE9iamVjdC5pc19yZXBvcnRDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRPYmplY3QuaXNfcmVwb3J0U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX25hdGl2ZUFkT2JqZWN0LmRhdGEgPSB0aGlzLl9uYXRpdmVEYXRhO1xyXG5cclxuXHJcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLlu7bov5/kuKTnp5Lph43mlrDor7fmsYLljp/nlJ/lub/lkYrmlbDmja5cIik7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUFkKGFyZ3MpO1xyXG4gICAgICAgIC8vIH0sIDIwMDApO1xyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVEYXRhICYmIHRoaXMuX25hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX25hdGl2ZURhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Y6f55Sf5pWw5o2uID4+PlwiLCB0aGlzLl9uYXRpdmVEYXRhLCBcIi4uLlwiLCB0aGlzLl9uYXRpdmVBZE9iamVjdClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZUFkT2JqZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfY3VzdG9tQWQ6IGFueSA9IG51bGw7XHJcblxyXG4gICAgX3JlZnJlc2hDdXN0b21BZFRpbWVyVGFzayA9IG51bGw7XHJcblxyXG4gICAgX2lzSGlkZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9sYXN0TG9jYXRpb246IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaooeeJiOW5v+WRilxyXG4gICAgICogQHBhcmFtIHBhcm1hcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dDdXN0b21BZChwYXJtZT86IGFueSkge1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLmN1c3RvbUFkSW5mb3MubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruacqumFjee9ruaooeeJiOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChxZy5jcmVhdGVDdXN0b21BZCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVmcmVzaEN1c3RvbUFkVGltZXJUYXNrKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgY3VzdG9tQWRJbmZvID0gdXRpbHMuY29uZmlnLnZpdm9jb25maWcuZ2V0Q3VzdG9tQWRJbmZvSW5mbyhwYXJtZS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3kvY3nva4gb2JqID4+PlwiLCBjdXN0b21BZEluZm8uY3VzdG9tQWRPYmopO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1c3RvbUFkSW5mby5pc19zaG93X2FkICE9IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5L2N572u5pyN5Yqh5Zmo6YWN572u5Li65LiN5pi+56S65qih54mI5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0TG9jYXRpb24gIT0gcGFybWUubG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUN1c3RvbUFkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1c3RvbUFkSW5mby5jdXN0b21BZE9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXN0b21BZCA9IGN1c3RvbUFkSW5mby5jdXN0b21BZE9iajtcclxuICAgICAgICAgICAgICAgIGlmICghY3VzdG9tQWRJbmZvLmN1c3RvbUFkT2JqLmlzU2hvdygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9ruS4iuasoeWxleekuui/h+WOn+eUn+aooeeJiO+8jOW9k+WJjemHjeaWsOaYvuekuuWHuuadpe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21BZEluZm8uY3VzdG9tQWRPYmouc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmhpZGVfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6YeN5paw5bGV56S65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQWRJbmZvLmN1c3RvbUFkT2JqLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQWRJbmZvLmN1c3RvbUFkT2JqID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn6YeN5paw5bGV56S65Y6f55Sf5qih5p2/5bm/5ZGK5aSx6LSlJywgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0N1c3RvbUFkKHBhcm1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9rueahOaooeeJiOato+WcqOaYvuekuuS4re+8jOS4jeaJp+ihjOWKoOi9ve+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXN0b21BZEluZm8ucmVmcmVzaF90aW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hDdXN0b21BZFRpbWVyVGFzayA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlrprml7Yke2N1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWV956eS5Yi35paw5Y6f55Sf5qih54mIYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0N1c3RvbUFkKHBhcm1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGN1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sYXN0TG9jYXRpb24gPSBwYXJtZS5sb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5faXNIaWRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBzdHlsZTogYW55ID0ge307XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21BZEluZm8udG9wID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUudG9wID0gY3VzdG9tQWRJbmZvLnRvcCAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5TeXNJbmZvLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXN0b21BZEluZm8uYm90dG9tID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUudG9wID0gdGhpcy5TeXNJbmZvLnNjcmVlbkhlaWdodCAtIGN1c3RvbUFkSW5mby5oZWlnaHQgLSBjdXN0b21BZEluZm8uYm90dG9tIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21BZEluZm8ubGVmdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlLmxlZnQgPSBjdXN0b21BZEluZm8ubGVmdCAvIGNjLndpblNpemUud2lkdGggKiB0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tQWRJbmZvLnJpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9IHRoaXMuU3lzSW5mby5zY3JlZW5XaWR0aCAtIGN1c3RvbUFkSW5mby53aWR0aCAtIGN1c3RvbUFkSW5mby5yaWdodCAvIGNjLndpblNpemUud2lkdGggKiB0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImN1c3RvbSBhZCBzdHlsZT4+XCIgKyBKU09OLnN0cmluZ2lmeShzdHlsZSkpO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdmFyIF9jdXN0b21BZCA9IHFnLmNyZWF0ZUN1c3RvbUFkKHtcclxuICAgICAgICAgICAgICAgIHBvc0lkOiBjdXN0b21BZEluZm8uaWQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgX2N1c3RvbUFkLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aooeadv+W5v+WRiuWKoOi9veWksei0pVwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaooeeJiOW8guW4uO+8miNlcnJNc2c9XCIgKyBlcnJvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfY3VzdG9tQWQub25DbG9zZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5qih5p2/5bm/5ZGKIG9uQ2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICBfY3VzdG9tQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgX2N1c3RvbUFkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGN1c3RvbUFkSW5mby5jdXN0b21BZE9iaiA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBfY3VzdG9tQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIF9jdXN0b21BZC5vZmZMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5qih5p2/5bm/5ZGK5Yqg6L295oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tQWQgPSBfY3VzdG9tQWQ7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21BZEluZm8uY3VzdG9tQWRPYmogJiYgY3VzdG9tQWRJbmZvLmN1c3RvbUFkT2JqLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1c3RvbUFkSW5mby5jdXN0b21BZE9iaiA9IF9jdXN0b21BZDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNIaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2N1c3RvbUFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1c3RvbUFkSW5mby5oaWRlX2Jhbm5lciA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5Y6f55Sf5qih5p2/5bm/5ZGK5bGV56S65a6M5oiQ77yBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfljp/nlJ/mqKHmnb/lub/lkYrlsZXnpLrlpLHotKUnLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfljp/nlJ/mqKHmnb/lub/lkYrosIPnlKjkuobpmpDol4/vvIzlvZPliY3lub/lkYrkuI3mmL7npLrvvIEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGN1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoQ3VzdG9tQWRUaW1lclRhc2sgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlrprml7Yke2N1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWV956eS5Yi35paw5Y6f55Sf5qih54mIYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q3VzdG9tQWQocGFybWUpXHJcbiAgICAgICAgICAgICAgICB9LCBjdXN0b21BZEluZm8ucmVmcmVzaF90aW1lICogMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5Y6f55Sf5qih54mI5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmqKHniYjlub/lkYpcclxuICAgICAqIEBwYXJhbSBwYXJtYXMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93Q3VzdG9tQWRWMihwYXJtZT86IGFueSkge1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLmN1c3RvbUFkSW5mb3MubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruacqumFjee9ruaooeeJiOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChxZy5jcmVhdGVDdXN0b21BZCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVmcmVzaEN1c3RvbUFkVGltZXJUYXNrKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgY3VzdG9tQWRJbmZvID0gdXRpbHMuY29uZmlnLnZpdm9jb25maWcuZ2V0Q3VzdG9tQWRJbmZvSW5mbyhwYXJtZS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3kvY3nva7nmoTlub/lkYrlr7nosaEgPj4+XCIsIGN1c3RvbUFkSW5mby5jdXN0b21BZE9iaik7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmlzX3Nob3dfYWQgIT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3kvY3nva7mnI3liqHlmajphY3nva7kuLrkuI3mmL7npLrmqKHniYjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdExvY2F0aW9uICE9IHBhcm1lLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVDdXN0b21BZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbUFkSW5mby5jdXN0b21BZE9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21BZEluZm8uY3VzdG9tQWRPYmouaXNTaG93KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9ruS4iuasoeWxleekuui/h+WOn+eUn+aooeeJiO+8jOW9k+WJjemHjeaWsOaYvuekuuWHuuadpe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWZyZXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUFkSW5mby5jdXN0b21BZE9iai5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmhpZGVfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6YeN5paw5bGV56S65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQWRJbmZvLmN1c3RvbUFkT2JqLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUFkSW5mby5jdXN0b21BZE9iaiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfph43mlrDlsZXnpLrljp/nlJ/mqKHmnb/lub/lkYrlpLHotKUnLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0N1c3RvbUFkKHBhcm1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9rueahOaooeeJiOato+WcqOaYvuekuuS4re+8jOS4jeaJp+ihjOWKoOi9ve+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX3JlZnJlc2hDdXN0b21BZFRpbWVyVGFzayA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5a6a5pe2JHtjdXN0b21BZEluZm8ucmVmcmVzaF90aW1lfeenkuWIt+aWsOWOn+eUn+aooeeJiGApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93Q3VzdG9tQWQocGFybWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sIGN1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbGFzdExvY2F0aW9uID0gcGFybWUubG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX2lzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgc3R5bGU6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLnRvcCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlLnRvcCA9IGN1c3RvbUFkSW5mby50b3AgLyBjYy53aW5TaXplLmhlaWdodCAqIHRoaXMuU3lzSW5mby5zY3JlZW5IZWlnaHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tQWRJbmZvLmJvdHRvbSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlLnRvcCA9IHRoaXMuU3lzSW5mby5zY3JlZW5IZWlnaHQgLSBjdXN0b21BZEluZm8uaGVpZ2h0IC0gY3VzdG9tQWRJbmZvLmJvdHRvbSAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5TeXNJbmZvLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmxlZnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZS5sZWZ0ID0gY3VzdG9tQWRJbmZvLmxlZnQgLyBjYy53aW5TaXplLndpZHRoICogdGhpcy5TeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUFkSW5mby5yaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlLmxlZnQgPSB0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGggLSBjdXN0b21BZEluZm8ud2lkdGggLSBjdXN0b21BZEluZm8ucmlnaHQgLyBjYy53aW5TaXplLndpZHRoICogdGhpcy5TeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJjdXN0b20gYWQgc3R5bGU+PlwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHZhciBfY3VzdG9tQWQgPSBxZy5jcmVhdGVDdXN0b21BZCh7XHJcbiAgICAgICAgICAgICAgICBwb3NJZDogY3VzdG9tQWRJbmZvLmlkLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIF9jdXN0b21BZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mqKHmnb/lub/lkYrliqDovb3lpLHotKVcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmqKHniYjlvILluLjvvJojZXJyTXNnPVwiICsgZXJybyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgX2N1c3RvbUFkLm9uQ2xvc2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aooeadv+W5v+WRiiBvbkNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgX2N1c3RvbUFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIF9jdXN0b21BZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21BZEluZm8uY3VzdG9tQWRPYmogPSBudWxsO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgX2N1c3RvbUFkLm9uTG9hZCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aooeadv+W5v+WRiuWKoOi9veaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFkID0gX2N1c3RvbUFkO1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tQWRJbmZvLmN1c3RvbUFkT2JqICYmIGN1c3RvbUFkSW5mby5jdXN0b21BZE9iai5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21BZEluZm8uY3VzdG9tQWRPYmogPSBfY3VzdG9tQWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzSGlkZSAmJiBpc1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY3VzdG9tQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLmhpZGVfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfljp/nlJ/mqKHmnb/lub/lkYrlsZXnpLrlrozmiJDvvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+WOn+eUn+aooeadv+W5v+WRiuWxleekuuWksei0pScsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+WOn+eUn+aooeadv+W5v+WRiuiwg+eUqOS6humakOiXj+aIluiAheW9k+WJjeS4jeWIt+aWsOW5v+WRiu+8jOW9k+WJjeW5v+WRiuS4jeaYvuekuu+8gScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VzdG9tQWRJbmZvLnJlZnJlc2hfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hDdXN0b21BZFRpbWVyVGFzayA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWumuaXtiR7Y3VzdG9tQWRJbmZvLnJlZnJlc2hfdGltZX3np5LliLfmlrDljp/nlJ/mqKHniYhgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDdXN0b21BZChwYXJtZSlcclxuICAgICAgICAgICAgICAgIH0sIGN1c3RvbUFkSW5mby5yZWZyZXNoX3RpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DkuI3mlK/mjIHljp/nlJ/mqKHniYjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+aooeeJiOW5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZUN1c3RvbUFkKCkge1xyXG4gICAgICAgIHRoaXMuX2lzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3JlZnJlc2hDdXN0b21BZFRpbWVyVGFzayk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbUFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFkLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==