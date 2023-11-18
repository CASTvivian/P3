
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentXiaomi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fdbd3JnjlNEf4sZulsTyGNv', 'AdAgentXiaomi');
// common-plugin/Scripts/AdAgentXiaomi.ts

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
var AdAgentXiaoMi = /** @class */ (function (_super) {
    __extends(AdAgentXiaoMi, _super);
    function AdAgentXiaoMi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bannerAd = null;
        _this._insertAd = null;
        _this._videoAd = null;
        _this._nativeBannerAd = [];
        _this._nativeInsertAd = [];
        _this._nativeSingleAd = [];
        _this.nativeBannerAd = null;
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
        _this._isBannerShow = false;
        _this._isInsertAdShow = false;
        _this._isInsertAdLoaded = false;
        _this._isVideoLoaded = false;
        _this._isVideoShow = false;
        _this.lastLastShowVideoTime = 0; //最后一次显示视频时间
        _this.showNum = 0; // Banner广告展示次数
        _this.showInsertNum = 0; // 插屏广告展示次数
        _this._showBannerCallBack = null;
        _this._isNativeBannerShow = false; //原生广告展示，调用的隐藏
        _this._nativeIsClose = false;
        _this._showBannerTimerId = 0;
        _this._delayShowBannerId = 0;
        _this.canShowNativeBanner = true; //原生banner是否展示
        // nbclr:是否开启强制刷新
        //当前显示Banner的位置
        _this._curLocation = YZ_Constant_1.BannerLocation.None;
        _this._isTimeRefresh = false;
        //启动定时器的时间
        _this._startBannerTimerTask = 0;
        _this._showBannerCount = 0;
        _this._nativeBannerInfo = null;
        _this._curNativeBannerInfo = {};
        _this._nativeInsertAdShowCount = 0;
        _this._insertLastShowTime = 0;
        return _this;
    }
    Object.defineProperty(AdAgentXiaoMi.prototype, "ServerConfig", {
        get: function () {
            if (PlatUtils_1.default.IsXiaoMi) {
                return Utils_1.utils.Tool_XiaoMi.ServerConfig;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentXiaoMi.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsXiaoMi) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initVideoAd();
            }, this);
        }
    };
    AdAgentXiaoMi.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (!Utils_1.utils.config.xiaomiConfig.videoId) {
                Utils_1.utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            var posId = Utils_1.utils.config.xiaomiConfig.videoId.trim();
            Utils_1.utils.showLog("video广告ID:" + posId);
            //@ts-ignore
            this._videoAd = qg.createRewardedVideoAd({
                adUnitId: posId
            });
            if (this._videoAd) {
                this._videoAd.onLoad((function () {
                    Utils_1.utils.showLog("激励视频加载成功!");
                    _this._isVideoLoaded = true;
                }));
                this._videoAd.onError((function (err) {
                    Utils_1.utils.showLog("激励视频异常!" + ("error: errorMsg: " + err.errMsg + ", erroCode: " + err.errCode));
                    _this._isVideoLoaded = false;
                }));
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
                // this._videoAd.load();
            }
        }
    };
    AdAgentXiaoMi.prototype.ShowBanner = function (location, args, isTimeRefresh) {
        var _this = this;
        if (location === void 0) { location = null; }
        if (args === void 0) { args = null; }
        if (isTimeRefresh === void 0) { isTimeRefresh = false; }
        if (PlatUtils_1.default.IsXiaoMi) {
            if (!this.ServerConfig) {
                Utils_1.utils.showLog("未请求到配置文件！");
                return;
            }
            if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                this.showNum++;
                if (this.showNum % 2 == 0) {
                    Utils_1.utils.showLog("测试模式>> 顺序展示原生Banner广告！");
                    this._createNativeBannerAd(this._showNativeBanner);
                }
                else {
                    Utils_1.utils.showLog("测试模式>> 顺序展示默认Banner广告！");
                    this._createMiniGameBannerAd(location);
                }
                return;
            }
            if (!this.checkBannerAdShow()) {
                this.HideBanner();
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
            // console.log("isTimeRefresh=" + isTimeRefresh);
            if (args && args.isRefresh) {
                isTimeRefresh = true;
            }
            else if (interval_1 && interval_1 > 0) {
                if (refresh_ad_time > interval_1) {
                    isTimeRefresh = true;
                }
            }
            // 判断当前位置是不是显示banner
            if (this.getNativeBannerInfo().is_show_banner == -1) {
                Utils_1.utils.showLog("当前位置配置为不展示banner!");
                this.HideBanner(location);
                return;
            }
            else {
                if (!isTimeRefresh) {
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
                Utils_1.utils.showLog("banner 优先展示 >>>>" + this.ServerConfig.banner_first_ad);
                if (interval_1 && interval_1 > 0) {
                    Utils_1.utils.showLog("开启定时刷新 >>>>>>>>>" + interval_1);
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(function () {
                        Utils_1.utils.showLog("\u5B9A\u65F6" + interval_1 + "\u79D2\u8C03\u7528showbanner");
                        _this.ShowBanner(_this._curLocation, {}, true);
                    }, interval_1 * 1000);
                }
                var closeCount = this.ServerConfig.banner_close_count ? this.ServerConfig.banner_close_count : 0;
                if (closeCount > 0 && Utils_1.utils.Tool_XiaoMi.bannerAdCloseCounts >= closeCount) {
                    Utils_1.utils.showLog("banner \u5173\u95ED\u6B21\u6570\u8FBE\u5230" + closeCount + "\u6B21,banner\u4ECA\u65E5\u4E0D\u518D\u663E\u793A\uFF01");
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
    AdAgentXiaoMi.prototype.HideBanner = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsXiaoMi) {
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            this._isBannerShow = false;
            this._nativeIsClose = true;
            if (this._bannerAd) {
                Utils_1.utils.showLog("隐藏小游戏Banner");
                this._bannerAd.hide();
            }
            this.canShowNativeBanner = false;
            if (this._nativeBannerNode) {
                Utils_1.utils.showLog("隐藏原生Banner");
                this._nativeBannerNode.active = false;
            }
        }
    };
    /**
     * 获取当前banner配置
     */
    AdAgentXiaoMi.prototype.getNativeBannerInfo = function () {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return Utils_1.utils.config.xiaomiConfig.getNativeBannerInfo(this._curLocation);
    };
    AdAgentXiaoMi.prototype._createMiniGameBannerAd = function (location) {
        var _this = this;
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsXiaoMi) {
            this._isBannerShow = true;
            if (Utils_1.utils.config.xiaomiConfig
                && Utils_1.utils.config.xiaomiConfig.bannerId) {
                if (this._bannerAd) {
                    this._bannerAd.destroy();
                }
                var left = (Utils_1.utils.Tool_XiaoMi.SysInfo.screenWidth - 385) * 0.5;
                if (cc.winSize.height < cc.winSize.width) {
                    left = Utils_1.utils.Tool_XiaoMi.SysInfo.screenWidth * 0.5;
                }
                var bannerStyle = {
                    left: left,
                    top: Utils_1.utils.Tool_XiaoMi.SysInfo.screenHeight - 58,
                    width: 385
                };
                if (this.getNativeBannerInfo()._alignType === "top") {
                    bannerStyle.top = 0;
                }
                //@ts-ignore
                this._bannerAd = qg.createBannerAd({
                    adUnitId: Utils_1.utils.config.xiaomiConfig.bannerId,
                    style: bannerStyle
                });
                Utils_1.utils.showLog("createBannerAd:" + this._bannerAd);
                Utils_1.utils.showLog("注册小游戏banner回调!");
                this._bannerAd.onError(function (err) {
                    Utils_1.utils.showLog("xiaomi 小游戏Banner广告出错: " + err.code + err.msg);
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
                    }
                });
                this._bannerAd.onResize(function (res) {
                    Utils_1.utils.showLog("xiaomi 小游戏Banner显示成功！");
                    if (_this._nativeBannerNode) {
                        _this._nativeBannerNode.active = false;
                    }
                    _this._showBannerCallBack && _this._showBannerCallBack();
                    _this._showBannerCallBack = null;
                    // utils.showLog("xiaomi 小游戏Banner onResize！" + JSON.stringify(res));
                    // utils.showLog("xiaomi 小游戏Banner curStyle" + JSON.stringify(this._bannerAd.style));
                    // this._bannerAd.style.width = utils.Tool_XiaoMi.SysInfo.screenWidth;
                    _this._bannerAd.style.left = (Utils_1.utils.Tool_XiaoMi.SysInfo.screenWidth - res.width) * 0.5;
                    if (_this.getNativeBannerInfo()._alignType == "top") {
                        _this._bannerAd.style.top = 0;
                    }
                    else {
                        _this._bannerAd.style.top = Utils_1.utils.Tool_XiaoMi.SysInfo.screenHeight - res.height;
                    }
                    // utils.showLog("xiaomi 小游戏Banner curStyle" + JSON.stringify(this._bannerAd.style));
                });
                this._bannerAd.onClose(function () {
                    Utils_1.utils._bannerCloseTime = new Date().getTime();
                    if (!_this._isNativeBannerShow) {
                        Utils_1.utils.Tool_XiaoMi.countBannerCloseCount();
                        Utils_1.utils.showLog("xiaomi 小游戏Banner 广告隐藏,当前隐藏次数>" + Utils_1.utils.Tool_XiaoMi.bannerAdCloseCounts);
                    }
                    else {
                        _this._isNativeBannerShow = false;
                        Utils_1.utils.showLog("xiaomi 小游戏Banner 广告隐藏,来自原生的显示，不增加隐藏次数，当前隐藏次数>" + Utils_1.utils.Tool_XiaoMi.bannerAdCloseCounts);
                    }
                });
                if (this._bannerAd) {
                    this._bannerAd.show();
                    Utils_1.utils.showLog("xiaomi 小游戏Banner show");
                }
                else {
                    Utils_1.utils.showLog("xiaomi 小游戏Banner广告创建失败!");
                    if (this.ServerConfig.indexOf("default") > -1) {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                }
            }
            else {
                Utils_1.utils.showLog("xiaomi 小游戏Banner广告配置信息错误!");
                var bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    Utils_1.utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                    this._curPosIdIndexNativeBanner = 0;
                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                }
            }
        }
    };
    AdAgentXiaoMi.prototype._createNativeBannerAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsXiaoMi) {
            var callback_1 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner);
            var nativeBannerAd_1 = this._nativeBannerAd[this._curPosIdIndexNativeBanner];
            if (!nativeBannerAd_1) {
                if (Utils_1.utils.config.xiaomiConfig.nativeBannerIds
                    && Utils_1.utils.config.xiaomiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                    Utils_1.utils.showLog("创建原生广告Banner。 posId:" + Utils_1.utils.config.xiaomiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                    //@ts-ignore
                    nativeBannerAd_1 = qg.createNativeAd({
                        adUnitId: Utils_1.utils.config.xiaomiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                    });
                    if (nativeBannerAd_1) {
                        this._nativeBannerAd.push(nativeBannerAd_1);
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
                                //如果当前显示为结算banner,则不做数据验证
                                if (_this._checkNativeDataValid(data) || _this.getNativeBannerInfo().show_st_banner == "true") {
                                    if (_this.canShowNativeBanner) {
                                        _this._curPosIdIndexNativeBanner = 0;
                                        _this._showNativeBanner(nativeBannerAd_1, data);
                                        _this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd_1;
                                        _this._curNativeBannerInfo.data = data;
                                        // 删除当前广告
                                        if (_this._bannerAd) {
                                            _this._isNativeBannerShow = true;
                                            Utils_1.utils.showLog("隐藏小游戏Banner");
                                            _this._bannerAd.hide();
                                        }
                                    }
                                    else {
                                        Utils_1.utils.showLog("已经隐藏banner不可重复展示");
                                    }
                                    return;
                                }
                            }
                            Utils_1.utils.showLog("原生Banner广告资源出错！");
                            _this._curPosIdIndexNativeBanner++;
                            if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.xiaomiConfig.nativeBannerIds.length) {
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
                            }
                        });
                        nativeBannerAd_1.onError(function (err) {
                            if (_this._nativeIsClose) {
                                Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            Utils_1.utils.showLog("原生Banner广告资源拉取失败！" + err.code + err.msg);
                            _this._curPosIdIndexNativeBanner++;
                            if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.xiaomiConfig.nativeBannerIds.length) {
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
            if (nativeBannerAd_1) {
                Utils_1.utils.showLog("nativeBannerAd reLoad>>");
                nativeBannerAd_1.load();
            }
            else {
                this._curPosIdIndexNativeBanner++;
                if (Utils_1.utils.config.xiaomiConfig.nativeBannerIds && this._curPosIdIndexNativeBanner < Utils_1.utils.config.xiaomiConfig.nativeBannerIds.length) {
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
    /**
     * 显示视频广告
     * @param callback 视频回调
     */
    AdAgentXiaoMi.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsXiaoMi) {
            this._videoCallback = callback;
            if (!this._videoAd) {
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                this._initVideoAd();
            }
            else {
                // if (this._isVideoLoaded) {
                this._videoAd.show();
                // } else {
                //     if (this._videoCallback) {
                //         this._videoCallback(false, "暂无视频广告!");
                //         this._videoCallback = null;
                //     }
                //     this._videoAd.load();
                //     return;
                // }
            }
        }
    };
    /**
     * 显示插屏
     * @param location
     */
    AdAgentXiaoMi.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsXiaoMi) {
            if (!this.checkInsertAdShow()) {
                return;
            }
            var delayTime = 0;
            if (this.ServerConfig
                && this.ServerConfig.intersititia_delay_show_time) {
                delayTime = this.ServerConfig.intersititia_delay_show_time;
            }
            Utils_1.utils.showLog("\u63D2\u5C4F\u5E7F\u544A\u5EF6\u65F6\u5C55\u793A\uFF01 delayTime:" + delayTime + "\u79D2");
            if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                this.showInsertNum++;
                // utils.showLog(this.showInsertNum % 2 == 0, "<<this.showInsertNum % 2 == 0");
                //@ts-ignore
                if (this.showInsertNum % 2 == 0) {
                    Utils_1.utils.showLog("测试模式>> 顺序展示原生插屏广告！");
                    this.nativeInserAdDelayCall();
                }
                else {
                    //@ts-ignore
                    this._createMiniGameInsertAd();
                }
                return;
            }
            if (this.ServerConfig) {
                if (location && location == YZ_Constant_1.BannerLocation.Pause) {
                    //@ts-ignore
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
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        Utils_1.utils.showLog("优先展示原生插屏广告!");
                        Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), delayTime);
                    }
                    else {
                        Utils_1.utils.showLog("优先展示小游戏插屏广告!");
                        Utils_1.utils.delayCall(this._createMiniGameInsertAd.bind(this), delayTime);
                    }
                }
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentXiaoMi.prototype._createMiniGameInsertAd = function () {
        var _this = this;
        this._isInsertShow = true;
        //@ts-ignore
        this._insertAd = qg.createInterstitialAd({
            adUnitId: Utils_1.utils.config.xiaomiConfig.insertId.trim()
        });
        if (this._insertAd) {
            this._insertAd.onLoad(function () {
                Utils_1.utils.showLog("插屏广告加载成功");
                if (_this._isInsertShow) {
                    _this._insertAd.show().then(function () {
                        Utils_1.utils.showLog("插屏广告展示成功!");
                        _this._insertLastShowTime = new Date().getTime();
                    }).catch(function (err) {
                        Utils_1.utils.showLog("\u63D2\u5C4F\u5E7F\u544A\u5C55\u793A\u5931\u8D25!, err=" + JSON.stringify(err));
                    });
                }
            });
            this._insertAd.onError(function (err) {
                Utils_1.utils.showLog("\u63D2\u5C4F\u5E7F\u544A\u76D1\u542C\u5F02\u5E38!, err=" + JSON.stringify(err));
                if (_this._isInsertShow) {
                    if (_this.ServerConfig.intersititial_first_ad == "default") {
                        _this._isInsertShow = false;
                        Utils_1.utils.showLog("开始显示原生插屏广告!");
                        _this._curPosIdIndexNativeInser = 0;
                        Utils_1.utils.delayCall(_this.nativeInserAdDelayCall.bind(_this), _this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            });
        }
        else {
            Utils_1.utils.showLog("插屏广告未初始化!");
        }
    };
    AdAgentXiaoMi.prototype.nativeInserAdDelayCall = function () {
        Utils_1.utils.showLog("原生插屏广告: 当前点击次数=" + Utils_1.utils.Tool_XiaoMi.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititial_interval_time + "; 展示累计=" + this._nativeInsertAdShowCount);
        if (Utils_1.utils.Tool_XiaoMi.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
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
    AdAgentXiaoMi.prototype._createNativeInsertAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsXiaoMi) {
            var callback_2 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);
            if (Utils_1.utils.config.xiaomiConfig.nativeInsertIds
                && Utils_1.utils.config.xiaomiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                Utils_1.utils.showLog("创建原生插屏广告。 posId:" + Utils_1.utils.config.xiaomiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                //@ts-ignore
                var nativeInsertAd_1 = qg.createNativeAd({
                    adUnitId: Utils_1.utils.config.xiaomiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]
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
                        if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.xiaomiConfig.nativeInsertIds.length) {
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
                        if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.xiaomiConfig.nativeInsertIds.length) {
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
                    if (Utils_1.utils.config.xiaomiConfig.nativeInsertIds && this._curPosIdIndexNativeInser < Utils_1.utils.config.xiaomiConfig.nativeInsertIds.length) {
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
       * 显示原生插屏组件
       */
    AdAgentXiaoMi.prototype._showNativeInsert = function (nativeInsertAd, data) {
        if (PlatUtils_1.default.IsXiaoMi) {
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
                        this._insertLastShowTime = new Date().getTime();
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
    /**
 * 显示原生banner组件
 */
    AdAgentXiaoMi.prototype._showNativeBanner = function (nativeBannerAd, data) {
        if (PlatUtils_1.default.IsXiaoMi) {
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
     * 验证插屏是否能展示
     * 2、时间限制 默认30秒
     */
    AdAgentXiaoMi.prototype.checkInsertAdShow = function () {
        var intervalTime = this.ServerConfig.intersititial_interval_time ? this.ServerConfig.intersititial_interval_time : 30;
        var curTime = new Date().getTime();
        var interval = (curTime - this._insertLastShowTime) / 1000;
        Utils_1.utils.showLog("xiaomi服务器插屏间隔显示时间为：" + intervalTime + "秒！");
        Utils_1.utils.showLog("xiaomi插屏当前广告间隔时间：" + interval + "秒！");
        if (intervalTime > 0 && interval < intervalTime) {
            Utils_1.utils.showLog("xiaomi插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }
        return true;
    };
    /**
     * 验证Banner是否能展示
     * 2、时间限制 默认30秒
     */
    AdAgentXiaoMi.prototype.checkBannerAdShow = function () {
        var intervalTime = this.ServerConfig.hide_banner_interval_show_time ? this.ServerConfig.hide_banner_interval_show_time : 0;
        var curTime = new Date().getTime();
        var interval = (curTime - Utils_1.utils._bannerCloseTime) / 1000;
        Utils_1.utils.showLog("xiaomi服务器Banner关闭后间隔显示时间为：" + intervalTime + "秒！");
        Utils_1.utils.showLog("xiaomi-Banner关闭后当前广告间隔时间：" + interval + "秒！");
        if (intervalTime > 0 && interval < intervalTime) {
            Utils_1.utils.showLog("xiaomi-Banner关闭后显示的间隔少于" + intervalTime + "秒。Banner不显示");
            return false;
        }
        return true;
    };
    AdAgentXiaoMi.prototype._checkNativeInsertDataValid = function (data) {
        if (!data) {
            return false;
        }
        return data.title && ((data.iconUrlList && data.iconUrlList.length > 0) || (data.imgUrlList && data.imgUrlList.length > 0));
    };
    AdAgentXiaoMi.prototype._checkNativeDataValid = function (data) {
        if (!data) {
            return false;
        }
        return data.imgUrlList && data.imgUrlList.length;
    };
    AdAgentXiaoMi = __decorate([
        ccclass
    ], AdAgentXiaoMi);
    return AdAgentXiaoMi;
}(AdAgent_1.default));
exports.default = AdAgentXiaoMi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFhpYW9taS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNkNBQStDO0FBQy9DLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFFaEMsbURBQThDO0FBR3hDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBZzVCQztRQTk0QkcsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFFckIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFFNUIsb0JBQWMsR0FBUSxJQUFJLENBQUM7UUFFM0IsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsWUFBWTtRQUNaLGdDQUEwQixHQUFXLENBQUMsQ0FBQztRQUN2QywrQkFBeUIsR0FBVyxDQUFDLENBQUM7UUFDdEMsZ0NBQTBCLEdBQVcsQ0FBQyxDQUFDO1FBRXZDLGlCQUFXLEdBQVEsSUFBSSxDQUFDO1FBQ3hCLHVCQUFpQixHQUFRLElBQUksQ0FBQztRQUM5Qix1QkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDbEMsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBRWxDLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLHVCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBWSxH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QUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDckQsQ0FBQztJQS80QmdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FnNUJqQztJQUFELG9CQUFDO0NBaDVCRCxBQWc1QkMsQ0FoNUIwQyxpQkFBTyxHQWc1QmpEO2tCQWg1Qm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVCYW5uZXJJbmZvIH0gZnJvbSBcIi4vQ29tbW9uQ29uZmlnXCI7XHJcbmltcG9ydCBDb21wYXRpYmxlVG9vbCBmcm9tIFwiLi9Db21wYXRpYmxlVG9vbFwiO1xyXG5pbXBvcnQgWVpfTmF0aXZlQmFubmVyIGZyb20gXCIuL1laX05hdGl2ZUJhbm5lclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRYaWFvTWkgZXh0ZW5kcyBBZEFnZW50IHtcclxuXHJcbiAgICBfYmFubmVyQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfaW5zZXJ0QWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9BZDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBfbmF0aXZlQmFubmVyQWQ6IGFueVtdID0gW107XHJcbiAgICBfbmF0aXZlSW5zZXJ0QWQ6IGFueVtdID0gW107XHJcbiAgICBfbmF0aXZlU2luZ2xlQWQ6IGFueVtdID0gW107XHJcblxyXG4gICAgbmF0aXZlQmFubmVyQWQ6IGFueSA9IG51bGw7XHJcblxyXG4gICAgX2lzSW5zZXJ0U2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8g5b2T5YmN5L2N572uaWTnmoTntKLlvJVcclxuICAgIF9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyOiBudW1iZXIgPSAwO1xyXG4gICAgX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcjogbnVtYmVyID0gMDtcclxuICAgIF9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIF9uYXRpdmVEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgX25hdGl2ZUluc2VydERhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfbmF0aXZlQmFubmVyTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfbmF0aXZlSW5zZXJ0Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgX3ZpZGVvQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIF92aWRlb0xvYWRlZDogYm9vbGVhbiA9IG51bGw7XHJcblxyXG4gICAgX2lzQmFubmVyU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9pc0luc2VydEFkU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzSW5zZXJ0QWRMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzVmlkZW9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgbGFzdExhc3RTaG93VmlkZW9UaW1lOiBudW1iZXIgPSAwOyAvL+acgOWQjuS4gOasoeaYvuekuuinhumikeaXtumXtFxyXG5cclxuICAgIHNob3dOdW06IG51bWJlciA9IDA7IC8vIEJhbm5lcuW5v+WRiuWxleekuuasoeaVsFxyXG4gICAgc2hvd0luc2VydE51bTogbnVtYmVyID0gMDsgLy8g5o+S5bGP5bm/5ZGK5bGV56S65qyh5pWwXHJcblxyXG4gICAgX3Nob3dCYW5uZXJDYWxsQmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX2lzTmF0aXZlQmFubmVyU2hvdzogYm9vbGVhbiA9IGZhbHNlOyAvL+WOn+eUn+W5v+WRiuWxleekuu+8jOiwg+eUqOeahOmakOiXj1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1dGlscy5Ub29sX1hpYW9NaS5TZXJ2ZXJDb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFZpZGVvQWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcudmlkZW9JZCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikUlE6YWN572u5LiN5q2j56Gu77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwb3NJZDogc3RyaW5nID0gdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy52aWRlb0lkLnRyaW0oKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInZpZGVv5bm/5ZGKSUQ6XCIgKyBwb3NJZCk7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkID0gcWcuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiBwb3NJZFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZCgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip8hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcigoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5byC5bi4IVwiICsgYGVycm9yOiBlcnJvck1zZzogJHtlcnIuZXJyTXNnfSwgZXJyb0NvZGU6ICR7ZXJyLmVyckNvZGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9TaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayh0cnVlLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeC55yL5a6M6KeG6aKR5omN6IO96I635b6X5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9uYXRpdmVJc0Nsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcklkOiBudW1iZXIgPSAwO1xyXG4gICAgX2RlbGF5U2hvd0Jhbm5lcklkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNhblNob3dOYXRpdmVCYW5uZXIgPSB0cnVlOyAvL+WOn+eUn2Jhbm5lcuaYr+WQpuWxleekulxyXG4gICAgLy8gbmJjbHI65piv5ZCm5byA5ZCv5by65Yi25Yi35pawXHJcblxyXG4gICAgLy/lvZPliY3mmL7npLpCYW5uZXLnmoTkvY3nva5cclxuICAgIF9jdXJMb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ob25lO1xyXG4gICAgX2lzVGltZVJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5ZCv5Yqo5a6a5pe25Zmo55qE5pe26Ze0XHJcbiAgICBfc3RhcnRCYW5uZXJUaW1lclRhc2s6IG51bWJlciA9IDA7XHJcbiAgICBfc2hvd0Jhbm5lckNvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgU2hvd0Jhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBudWxsLCBhcmdzOiBhbnkgPSBudWxsLCBpc1RpbWVSZWZyZXNoOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKror7fmsYLliLDphY3nva7mlofku7bvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZyAmJiB0aGlzLlNlcnZlckNvbmZpZy5pc1Rlc3QgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaXNUZXN0ID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW0rKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dOdW0gJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rWL6K+V5qih5byPPj4g6aG65bqP5bGV56S65Y6f55SfQmFubmVy5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rWL6K+V5qih5byPPj4g6aG65bqP5bGV56S66buY6K6kQmFubmVy5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tCYW5uZXJBZFNob3coKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDb3VudCsrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBvbGRMb2NhdGlvbiA9IHRoaXMuX2N1ckxvY2F0aW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY3VyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2lzVGltZVJlZnJlc2ggPSBpc1RpbWVSZWZyZXNoO1xyXG4gICAgICAgICAgICAvL+WmguaenOi3s+eUqOS9jee9ruWIh+aNouS5i+WQju+8jOmqjOivgeaYr+S4jeaYr+mAmui/h+WumuaXtuWZqOW8uuWItuWIt+aWsOaVsOaNru+8jOS4jeaYr+WImeWFiOmakOiXj2Jhbm5lclxyXG4gICAgICAgICAgICBpZiAob2xkTG9jYXRpb24gIT0gbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbGV0IHJlZnJlc2hfYWRfdGltZTogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9zdGFydEJhbm5lclRpbWVyVGFzaykgLyAxMDAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IGludGVydmFsID0gdGhpcy5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImlzVGltZVJlZnJlc2g9XCIgKyBpc1RpbWVSZWZyZXNoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ3MgJiYgYXJncy5pc1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgIGlzVGltZVJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGludGVydmFsICYmIGludGVydmFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlZnJlc2hfYWRfdGltZSA+IGludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lUmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Yik5pat5b2T5YmN5L2N572u5piv5LiN5piv5pi+56S6YmFubmVyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5pc19zaG93X2Jhbm5lciA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9rumFjee9ruS4uuS4jeWxleekumJhbm5lciFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLm5iY2xyICYmIHRoaXMuU2VydmVyQ29uZmlnLm5iY2xyID09IFwidHJ1ZVwiICYmIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8ubmF0aXZlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruWumuaXtuWZqOWIt+aWsOaVsOaNriBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDljp/nlJ9iYW5uZXLlu7bov5/mmL7npLoke3RoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmRlbGF5X3Nob3dfdGltZX3np5JgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kZWxheVNob3dCYW5uZXJJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsYXlTaG93QmFubmVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIodGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5uYXRpdmVCYW5uZXJBZCwgdGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCkuZGVsYXlfc2hvd190aW1lICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlkK/lrprml7bliLfmlrAgPj4+Pj4+Pj4+XCIgKyAoaW50ZXJ2YWwgLSByZWZyZXNoX2FkX3RpbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlrprml7Yke2ludGVydmFsfeenkuiwg+eUqHNob3diYW5uZXJgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lcih0aGlzLl9jdXJMb2NhdGlvbiwge30sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoaW50ZXJ2YWwgLSByZWZyZXNoX2FkX3RpbWUpICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jYW5TaG93TmF0aXZlQmFubmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlSXNDbG9zZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kZWxheVNob3dCYW5uZXJJZCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuIXnkIblrprml7blmahcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZykge1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJiYW5uZXIg5LyY5YWI5bGV56S6ID4+Pj5cIiArIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGludGVydmFsICYmIGludGVydmFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlkK/lrprml7bliLfmlrAgPj4+Pj4+Pj4+XCIgKyBpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0Jhbm5lclRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5a6a5pe2JHtpbnRlcnZhbH3np5LosIPnlKhzaG93YmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lcih0aGlzLl9jdXJMb2NhdGlvbiwge30sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGludGVydmFsICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsb3NlQ291bnQgPSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfY2xvc2VfY291bnQgPyB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfY2xvc2VfY291bnQgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlQ291bnQgPiAwICYmIHV0aWxzLlRvb2xfWGlhb01pLmJhbm5lckFkQ2xvc2VDb3VudHMgPj0gY2xvc2VDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYGJhbm5lciDlhbPpl63mrKHmlbDovr7liLAke2Nsb3NlQ291bnR95qyhLGJhbm5lcuS7iuaXpeS4jeWGjeaYvuekuu+8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQuaW5kZXhPZihcIm5hdGl2ZVwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrljp/nlJ9CYW5uZXLlub/lkYohXCIgKyBpc1RpbWVSZWZyZXNoICsgXCIgPDw8PFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1RpbWVSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDljp/nlJ9iYW5uZXLlu7bov5/mmL7npLoke3RoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmRlbGF5X3Nob3dfdGltZX3np5JgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsYXlTaG93QmFubmVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmRlbGF5X3Nob3dfdGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWwj+a4uOaIj0Jhbm5lcuW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumFjee9ruaVsOaNruS4reayoeaciSBiYW5uZXJfZmlyc3RfYWQg5a2X5q6177yMIGJhbm5lcuW5v+WRiuS4jeaYvuekuiFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG5cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RlbGF5U2hvd0Jhbm5lcklkKTtcclxuICAgICAgICAgICAgdGhpcy5faXNCYW5uZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUlzQ2xvc2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Jhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5bCP5ri45oiPQmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FuU2hvd05hdGl2ZUJhbm5lciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+WOn+eUn0Jhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX25hdGl2ZUJhbm5lckluZm86IE5hdGl2ZUJhbm5lckluZm8gPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY1iYW5uZXLphY3nva5cclxuICAgICAqL1xyXG4gICAgZ2V0TmF0aXZlQmFubmVySW5mbygpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVySW5mbyAmJiB0aGlzLl9uYXRpdmVCYW5uZXJJbmZvLmxvY2F0aW9uID09IHRoaXMuX2N1ckxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVCYW5uZXJJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5nZXROYXRpdmVCYW5uZXJJbmZvKHRoaXMuX2N1ckxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfY3JlYXRlTWluaUdhbWVCYW5uZXJBZChsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0Jhbm5lclNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWdcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcuYmFubmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9ICh1dGlscy5Ub29sX1hpYW9NaS5TeXNJbmZvLnNjcmVlbldpZHRoIC0gMzg1KSAqIDAuNTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gdXRpbHMuVG9vbF9YaWFvTWkuU3lzSW5mby5zY3JlZW5XaWR0aCAqIDAuNVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhbm5lclN0eWxlOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHV0aWxzLlRvb2xfWGlhb01pLlN5c0luZm8uc2NyZWVuSGVpZ2h0IC0gNTgsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM4NVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLl9hbGlnblR5cGUgPT09IFwidG9wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYW5uZXJTdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZCA9IHFnLmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5iYW5uZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogYmFubmVyU3R5bGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImNyZWF0ZUJhbm5lckFkOlwiICsgdGhpcy5fYmFubmVyQWQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rOo5YaM5bCP5ri45oiPYmFubmVy5Zue6LCDIVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ4aWFvbWkg5bCP5ri45oiPQmFubmVy5bm/5ZGK5Ye66ZSZOiBcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzQmFubmVyU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0Jhbm5lclNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwiZGVmYXVsdFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vblJlc2l6ZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taSDlsI/muLjmiI9CYW5uZXLmmL7npLrmiJDlip/vvIFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVCYW5uZXJOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDYWxsQmFjayAmJiB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwieGlhb21pIOWwj+a4uOaIj0Jhbm5lciBvblJlc2l6Ze+8gVwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhcInhpYW9taSDlsI/muLjmiI9CYW5uZXIgY3VyU3R5bGVcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuX2Jhbm5lckFkLnN0eWxlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Jhbm5lckFkLnN0eWxlLndpZHRoID0gdXRpbHMuVG9vbF9YaWFvTWkuU3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS5sZWZ0ID0gKHV0aWxzLlRvb2xfWGlhb01pLlN5c0luZm8uc2NyZWVuV2lkdGggLSByZXMud2lkdGgpICogMC41O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5fYWxpZ25UeXBlID09IFwidG9wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc3R5bGUudG9wID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS50b3AgPSB1dGlscy5Ub29sX1hpYW9NaS5TeXNJbmZvLnNjcmVlbkhlaWdodCAtIHJlcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCJ4aWFvbWkg5bCP5ri45oiPQmFubmVyIGN1clN0eWxlXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLl9iYW5uZXJBZC5zdHlsZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uQ2xvc2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLl9iYW5uZXJDbG9zZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzTmF0aXZlQmFubmVyU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5Ub29sX1hpYW9NaS5jb3VudEJhbm5lckNsb3NlQ291bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taSDlsI/muLjmiI9CYW5uZXIg5bm/5ZGK6ZqQ6JePLOW9k+WJjemakOiXj+asoeaVsD5cIiArIHV0aWxzLlRvb2xfWGlhb01pLmJhbm5lckFkQ2xvc2VDb3VudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzTmF0aXZlQmFubmVyU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwieGlhb21pIOWwj+a4uOaIj0Jhbm5lciDlub/lkYrpmpDol48s5p2l6Ieq5Y6f55Sf55qE5pi+56S677yM5LiN5aKe5Yqg6ZqQ6JeP5qyh5pWw77yM5b2T5YmN6ZqQ6JeP5qyh5pWwPlwiICsgdXRpbHMuVG9vbF9YaWFvTWkuYmFubmVyQWRDbG9zZUNvdW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taSDlsI/muLjmiI9CYW5uZXIgc2hvd1wiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taSDlsI/muLjmiI9CYW5uZXLlub/lkYrliJvlu7rlpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbmRleE9mKFwiZGVmYXVsdFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ4aWFvbWkg5bCP5ri45oiPQmFubmVy5bm/5ZGK6YWN572u5L+h5oGv6ZSZ6K+vIVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRilwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkLmluZGV4T2YoXCJkZWZhdWx0XCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jdXJOYXRpdmVCYW5uZXJJbmZvOiBhbnkgPSB7fTtcclxuICAgIF9jcmVhdGVOYXRpdmVCYW5uZXJBZChjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGNvbXBsZXRlQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcjpcIiArIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5hdGl2ZUJhbm5lckFkID0gdGhpcy5fbmF0aXZlQmFubmVyQWRbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcl07XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5uYXRpdmVCYW5uZXJJZHNcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/lub/lkYpCYW5uZXLjgIIgcG9zSWQ6XCIgKyB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlQmFubmVyQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQmFubmVyQWQucHVzaChuYXRpdmVCYW5uZXJBZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVCYW5uZXJBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUlzQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5LqGQkFOTkVS77yM5LiN5YGa5Lu75L2V5aSE55CG77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEJhbm5lclRpbWVyVGFzayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOW9k+WJjeaYvuekuuS4uue7k+eul2Jhbm5lcizliJnkuI3lgZrmlbDmja7pqozor4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVEYXRhVmFsaWQoZGF0YSkgfHwgdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCkuc2hvd19zdF9iYW5uZXIgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuU2hvd05hdGl2ZUJhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlQmFubmVyKG5hdGl2ZUJhbm5lckFkLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8ubmF0aXZlQmFubmVyQWQgPSBuYXRpdmVCYW5uZXJBZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8uZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliKDpmaTlvZPliY3lub/lkYpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzTmF0aXZlQmFubmVyU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+Wwj+a4uOaIj0Jhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bey57uP6ZqQ6JePYmFubmVy5LiN5Y+v6YeN5aSN5bGV56S6XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK6LWE5rqQ5Ye66ZSZ77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPCB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUJhbm5lcklkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmnaHpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkLmluZGV4T2YoXCJuYXRpdmVcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5bm/5ZGK5p2h77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUlzQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5LqGQkFOTkVS77yM5LiN5YGa5Lu75L2V5aSE55CG77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9CYW5uZXLlub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA8IHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcubmF0aXZlQmFubmVySWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiuadoemBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbyA9IHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYW5uZXJJbmZvLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIj4+Pj4+5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65aSH55So5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQuaW5kZXhPZihcIm5hdGl2ZVwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrlsI/muLjmiI/lub/lkYrmnaHvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pi+56S66Ieq5a6a5LmJYmFubmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5pc1Nob3dSZWNvbW1vbmRHYW1lc0Jhbm5lcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd1JlY29tbWVuZEdhbWVzQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlsI/muLjmiI/jgIHljp/nlJ/lub/lkYrmnaHpg73ml6Dms5XlsZXnpLrvvIzlsZXnpLroh6rlrprkuYliYW5uZXJgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJuYXRpdmVCYW5uZXJBZCByZUxvYWQ+PlwiKTtcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lckFkLmxvYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIrKztcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUJhbm5lcklkcyAmJiB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyIDwgdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5uYXRpdmVCYW5uZXJJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK5p2h6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj7mnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwibmF0aXZlXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+W5v+WRiuadoe+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mmL7npLroh6rlrprkuYliYW5uZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93UmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+OAgeWOn+eUn+W5v+WRiuadoemDveaXoOazleWxleekuu+8jOWxleekuuiHquWumuS5iWJhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrop4bpopHlub/lkYpcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDop4bpopHlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0VmlkZW9BZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuX2lzVmlkZW9Mb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl92aWRlb0FkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmj5LlsY9cclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNob3dJbnRlcnN0aXRpYWwobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrSW5zZXJ0QWRTaG93KCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBkZWxheVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgZGVsYXlUaW1lID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5o+S5bGP5bm/5ZGK5bu25pe25bGV56S677yBIGRlbGF5VGltZToke2RlbGF5VGltZX3np5JgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZyAmJiB0aGlzLlNlcnZlckNvbmZpZy5pc1Rlc3QgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaXNUZXN0ID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJbnNlcnROdW0rKztcclxuICAgICAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2codGhpcy5zaG93SW5zZXJ0TnVtICUgMiA9PSAwLCBcIjw8dGhpcy5zaG93SW5zZXJ0TnVtICUgMiA9PSAwXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93SW5zZXJ0TnVtICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua1i+ivleaooeW8jz4+IOmhuuW6j+WxleekuuWOn+eUn+aPkuWxj+W5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbiAmJiBsb2NhdGlvbiA9PSBCYW5uZXJMb2NhdGlvbi5QYXVzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaaguWBnOeVjOmdouS4jeW7tuaXtuWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWOn+eUn+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrljp/nlJ/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIGRlbGF5VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkLmJpbmQodGhpcyksIGRlbGF5VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzSW5zZXJ0U2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuX2luc2VydEFkID0gcWcuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5pbnNlcnRJZC50cmltKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2luc2VydEFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc2VydEFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5Yqg6L295oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW5zZXJ0U2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydEFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaPkuWxj+W5v+WRiuWxleekuuaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydExhc3RTaG93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5o+S5bGP5bm/5ZGK5bGV56S65aSx6LSlISwgZXJyPSR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmj5LlsY/lub/lkYrnm5HlkKzlvILluLghLCBlcnI9JHtKU09OLnN0cmluZ2lmeShlcnIpfWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW5zZXJ0U2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5zZXJ0U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX25hdGl2ZUluc2VydEFkU2hvd0NvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIG5hdGl2ZUluc2VyQWREZWxheUNhbGwoKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRijog5b2T5YmN54K55Ye75qyh5pWwPVwiICsgdXRpbHMuVG9vbF9YaWFvTWkuTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzICsgXCI7IOeCueWHu+asoeaVsOmZkOWItj1cIiArIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbGlja19jb3VudCArIFwiOyDlsZXnpLrmrKHmlbDpl7TpmpQ9XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ludGVydmFsX3RpbWUgKyBcIjsg5bGV56S657Sv6K6hPVwiICsgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQpO1xyXG4gICAgICAgIGlmICh1dGlscy5Ub29sX1hpYW9NaS5OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMgPj0gKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbGlja19jb3VudCB8fCAwKSkge1xyXG4gICAgICAgICAgICAvLyDmr4/ml6Xngrnlh7vmrKHmlbDliLDovr7kuIrpmZDvvIzpmZDliLblsZXnpLrmrKHmlbBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUluc2VydEFkU2hvd0NvdW50ID49ICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfc2hvd19pbnRlcnZhbCB8fCAwKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+v5Lul5bGV56S6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZCh0aGlzLl9zaG93TmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOS4jeiDveWxleekulxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY3JlYXRlTmF0aXZlSW5zZXJ0QWQoY29tcGxldGVDYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjb21wbGV0ZUNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImN1clBvc0lkSW5kZXhOYXRpdmVJbnNlcnQ6XCIgKyB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcubmF0aXZlSW5zZXJ0SWRzXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUluc2VydElkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJdKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5o+S5bGP5bm/5ZGK44CCIHBvc0lkOlwiICsgdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXSk7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGxldCBuYXRpdmVJbnNlcnRBZCA9IHFnLmNyZWF0ZU5hdGl2ZUFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5hdGl2ZUluc2VydEFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fbmF0aXZlSW5zZXJ0QWQucHVzaChuYXRpdmVJbnNlcnRBZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja05hdGl2ZUluc2VydERhdGFWYWxpZChkYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiui1hOa6kOS4jeWQiOazle+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK5Yib5bu65aSx6LSl77yBXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkTG9hZCA9IG5hdGl2ZUluc2VydEFkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBhZExvYWQgJiYgYWRMb2FkLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc1wiLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6LWE5rqQ5ouJ5Y+W5aSx6LSl77yBXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcubmF0aXZlSW5zZXJ0SWRzICYmIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcubmF0aXZlSW5zZXJ0SWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgKiDmmL7npLrljp/nlJ/mj5LlsY/nu4Tku7ZcclxuICAgICAgICovXHJcbiAgICBfc2hvd05hdGl2ZUluc2VydChuYXRpdmVJbnNlcnRBZDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65Y6f55Sf5o+S5bGPXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCghY2MuaXNWYWxpZCh0aGlzLl9uYXRpdmVJbnNlcnROb2RlKSkgfHwgIXRoaXMuX25hdGl2ZUluc2VydE5vZGUgJiYgdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLm5hdGl2ZUluc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/mj5LlsY/lub/lkYrkvY1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVJbnNlcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUluc2VydE5vZGUucG9zaXRpb24gPSBDb21wYXRpYmxlVG9vbC5wb3NpdGlvbihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKHRoaXMuX25hdGl2ZUluc2VydE5vZGUsIDk5OTkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJbnNlcnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUluc2VydCA9IHRoaXMuX25hdGl2ZUluc2VydE5vZGUuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSW5zZXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYXRpdmVJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRMYXN0U2hvd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW5zZXJ0LmluaXQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJOYXRpdmVJbnNlcnTnu4Tku7bkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiuaPkuWxj+S9jeayoeacieWIm+W7uu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuU2VydmVyQ29uZmlnLnNob3dfaW5zZXJ0X2hpZGVfYmFubmVyIHx8IHRoaXMuU2VydmVyQ29uZmlnLnNob3dfaW5zZXJ0X2hpZGVfYmFubmVyICE9IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmj5LlsY/lsZXnpLrlkI7pmpDol49CYW5uZXLvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICog5pi+56S65Y6f55SfYmFubmVy57uE5Lu2XHJcbiAqL1xyXG4gICAgX3Nob3dOYXRpdmVCYW5uZXIobmF0aXZlQmFubmVyQWQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpICYmIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIWNjLmlzVmFsaWQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkgfHwgKCF0aGlzLl9uYXRpdmVCYW5uZXJOb2RlICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVCYW5uZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLm5hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuaGVpZ2h0ICogdGhpcy5fbmF0aXZlQmFubmVyTm9kZS5zY2FsZVkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQmFubmVyOiBZWl9OYXRpdmVCYW5uZXIgPSB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmdldENvbXBvbmVudChcIllaX05hdGl2ZUJhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lci5pbml0KG5hdGl2ZUJhbm5lckFkLCBkYXRhLCB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZUJhbm5lcue7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDYWxsQmFjayAmJiB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGKYmFubmVy5L2N5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIF9pbnNlcnRMYXN0U2hvd1RpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4Hmj5LlsY/mmK/lkKbog73lsZXnpLpcclxuICAgICAqIDLjgIHml7bpl7TpmZDliLYg6buY6K6kMzDnp5JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0luc2VydEFkU2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaW50ZXJ2YWxUaW1lID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9pbnRlcnZhbF90aW1lID8gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9pbnRlcnZhbF90aW1lIDogMzA7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9pbnNlcnRMYXN0U2hvd1RpbWUpIC8gMTAwMDtcclxuXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taeacjeWKoeWZqOaPkuWxj+mXtOmalOaYvuekuuaXtumXtOS4uu+8mlwiICsgaW50ZXJ2YWxUaW1lICsgXCLnp5LvvIFcIik7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taeaPkuWxj+W9k+WJjeW5v+WRiumXtOmalOaXtumXtO+8mlwiICsgaW50ZXJ2YWwgKyBcIuenku+8gVwiKTtcclxuXHJcbiAgICAgICAgaWYgKGludGVydmFsVGltZSA+IDAgJiYgaW50ZXJ2YWwgPCBpbnRlcnZhbFRpbWUpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInhpYW9taeaPkuWxj+W5v+WRiuaYvuekuueahOmXtOmalOWwkeS6jlwiICsgaW50ZXJ2YWxUaW1lICsgXCLnp5LjgILmj5LlsY/kuI3mmL7npLpcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+BQmFubmVy5piv5ZCm6IO95bGV56S6XHJcbiAgICAgKiAy44CB5pe26Ze06ZmQ5Yi2IOm7mOiupDMw56eSXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tCYW5uZXJBZFNob3coKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGludGVydmFsVGltZSA9IHRoaXMuU2VydmVyQ29uZmlnLmhpZGVfYmFubmVyX2ludGVydmFsX3Nob3dfdGltZSA/IHRoaXMuU2VydmVyQ29uZmlnLmhpZGVfYmFubmVyX2ludGVydmFsX3Nob3dfdGltZSA6IDA7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB1dGlscy5fYmFubmVyQ2xvc2VUaW1lKSAvIDEwMDA7XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJ4aWFvbWnmnI3liqHlmahCYW5uZXLlhbPpl63lkI7pl7TpmpTmmL7npLrml7bpl7TkuLrvvJpcIiArIGludGVydmFsVGltZSArIFwi56eS77yBXCIpO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJ4aWFvbWktQmFubmVy5YWz6Zet5ZCO5b2T5YmN5bm/5ZGK6Ze06ZqU5pe26Ze077yaXCIgKyBpbnRlcnZhbCArIFwi56eS77yBXCIpO1xyXG5cclxuICAgICAgICBpZiAoaW50ZXJ2YWxUaW1lID4gMCAmJiBpbnRlcnZhbCA8IGludGVydmFsVGltZSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwieGlhb21pLUJhbm5lcuWFs+mXreWQjuaYvuekuueahOmXtOmalOWwkeS6jlwiICsgaW50ZXJ2YWxUaW1lICsgXCLnp5LjgIJCYW5uZXLkuI3mmL7npLpcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja05hdGl2ZUluc2VydERhdGFWYWxpZChkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YS50aXRsZSAmJiAoKGRhdGEuaWNvblVybExpc3QgJiYgZGF0YS5pY29uVXJsTGlzdC5sZW5ndGggPiAwKSB8fCAoZGF0YS5pbWdVcmxMaXN0ICYmIGRhdGEuaW1nVXJsTGlzdC5sZW5ndGggPiAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrTmF0aXZlRGF0YVZhbGlkKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhLmltZ1VybExpc3QgJiYgZGF0YS5pbWdVcmxMaXN0Lmxlbmd0aDtcclxuICAgIH1cclxufVxyXG4iXX0=