"use strict";
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