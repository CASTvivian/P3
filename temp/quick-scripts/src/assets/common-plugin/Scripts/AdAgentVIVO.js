"use strict";
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