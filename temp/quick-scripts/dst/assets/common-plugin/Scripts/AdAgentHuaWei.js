
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentHuaWei.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '290c4sJ+4FFVqbdVokQ98+D', 'AdAgentHuaWei');
// common-plugin/Scripts/AdAgentHuaWei.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentHuaWei = /** @class */ (function (_super) {
    __extends(AdAgentHuaWei, _super);
    function AdAgentHuaWei() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //@ts-ignore
        _this.huawei = window.qg;
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
        _this.bannerType = 1;
        /**
         * banner样式：1代表原生banner，2代表默认banner
         */
        _this.banner_style_mod = [1, 2];
        _this.intersititialType = 1;
        /**
         * 插屏样式：1代表原生插屏，2代表默认插屏，3代表原生icon
         */
        _this.intersititial_style_mod = [1, 2, 3];
        /**
         * banner展示次数
         */
        _this.bannerTimes = 0;
        /**
         * 插屏展示次数
         */
        _this.intersititialTimes = 0;
        _this._nativeIsClose = false;
        _this._showBannerTimerId = 0;
        _this._delayShowBannerId = 0;
        // nbclr:是否开启强制刷新
        //当前显示Banner的位置
        _this._curLocation = YZ_Constant_1.BannerLocation.None;
        //启动定时器的时间
        _this._startBannerTimerTask = 0;
        _this.tryGameAdArr = [];
        _this._nativeTryGameNode = null;
        _this._isDataInit = false;
        _this._nativeSplashNode = null;
        _this.insertTimeID = 0;
        _this._nativeInsertAdShowCount = 0;
        /**
         * 验证是否第一次创建插屏
         */
        _this.miniInserAdIsCreate = false;
        /**
         * 创建小程序插屏广告
         * @param isUnique 是否唯一展示 不轮询显示原生
         */
        // _createMiniGameInsertAd(isUnique: boolean = false) {
        //     if (PlatUtils.IsHuaWei) {
        //         if (isUnique) {
        //             if (!this.checkInsertAdShow()) return;
        //         }
        //         this._isInsertShow = true;
        //         if (utils.config.huaweiConfig
        //             && utils.config.huaweiConfig.insertId) {
        //             //@ts-ignore
        //             let _insertAd = qg.createInterstitialAd({
        //                 adUnitId: utils.config.huaweiConfig.insertId
        //             });
        //             utils.showLog("小游戏插屏ID：", utils.config.huaweiConfig.insertId);
        //             if (_insertAd) {
        //                 utils.showLog("注册小游戏插屏广告回调！");
        //                 _insertAd.onError(((err) => {
        //                     utils.showLog("华为 小游戏插屏广告出错:" + JSON.stringify(err));
        //                     if (this._isInsertShow && !isUnique) {
        //                         if (this.ServerConfig.intersititial_style_level) {
        //                             if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
        //                                 utils.showLog("开始展示原生插屏！");
        //                                 utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
        //                             }
        //                             else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
        //                                 utils.showLog("开始展示原生icon！");
        //                                 this.showNativeTryGameWidget();
        //                             }
        //                         }
        //                         else if (this.ServerConfig.intersititial_first_ad == "default") {
        //                             this._isInsertShow = false;
        //                             utils.showLog("开始显示原生插屏广告!");
        //                             this._curPosIdIndexNativeInser = 0;
        //                             utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
        //                         }
        //                         else {
        //                             utils.showLog("开始展示原生icon！");
        //                             this.showNativeTryGameWidget();
        //                         }
        //                     }
        //                     _insertAd.offError();
        //                 }).bind(this));
        //                 _insertAd.onLoad((() => {
        //                     utils.showLog("Huawei 小程序插屏广告加载成功!");
        //                     if (this._isInsertShow) {
        //                         this._isInsertShow = false;
        //                         _insertAd.show();
        //                         //onShow
        //                         this._isInsertShow = false;
        //                         // utils.Tool_Huawei.countInserShowCount();
        //                         this._insertLastShowTime = new Date().getTime();
        //                         let closeType = this.ServerConfig.intersititial_open_close_banner;
        //                         if (closeType && closeType > 0) {
        //                             utils.showLog("Huawei 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
        //                             this.HideBanner();
        //                         }
        //                     }
        //                     _insertAd.offLoad();
        //                 }).bind(this));
        //                 // _insertAd.onClose((() => {
        //                 //     utils.showLog("关闭插屏广告，展示banner")
        //                 //     this.ShowBanner();
        //                 // }).bind(this));
        //                 _insertAd.load();
        //             }
        //             if (!_insertAd) {
        //                 utils.showLog("Huawei小游戏插屏广告创建失败！");
        //                 if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
        //                     utils.showLog("开始显示原生插屏广告!");
        //                     this._curPosIdIndexNativeInser = 0;
        //                     utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
        //                 }
        //             }
        //         } else {
        //             utils.showLog("Huawei 小游戏插屏广告配置信息错误!");
        //             if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
        //                 utils.showLog("开始显示原生插屏广告!");
        //                 this._curPosIdIndexNativeInser = 0;
        //                 utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
        //             }
        //         }
        //     }
        // }
        _this._isInsertLoad = false;
        _this._canInsertShow = false;
        _this._curNativeBannerInfo = {};
        _this._rewardInsertNode = null;
        return _this;
    }
    Object.defineProperty(AdAgentHuaWei.prototype, "ServerConfig", {
        get: function () {
            if (Utils_1.utils.Tool_Huawei && Utils_1.utils.Tool_Huawei.ServerConfig)
                return Utils_1.utils.Tool_Huawei.ServerConfig;
            return {};
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取当前banner配置
     */
    AdAgentHuaWei.prototype.getNativeBannerInfo = function () {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return Utils_1.utils.config.huaweiConfig.getNativeBannerInfo(this._curLocation);
    };
    AdAgentHuaWei.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsHuaWei) {
            cc.director.on("IsDataInit", (function () {
                _this._isDataInit = true;
                cc.director.off("IsDataInit");
            }), this);
            Utils_1.utils.registerServerInitEvent(function () {
                Utils_1.utils.showLog("HuaWei 广告代理组件初始化!");
                _this._initVideoAd();
                // this._initInsertAd();
                // this._initLocalDate();
            }, this);
        }
    };
    AdAgentHuaWei.prototype._initLocalDate = function () {
        if (!this.ServerConfig.banner_style_mod) {
            this.ServerConfig.banner_style_mod = [1, 2];
        }
        if (!this.ServerConfig.intersititial_style_mod) {
            this.ServerConfig.intersititial_style_mod = [1, 2, 3];
        }
        if (!this.ServerConfig.icon_jump_native) {
            this.ServerConfig.icon_jump_native = 1;
        }
        if (!this.ServerConfig.banner_style_level) {
            this.ServerConfig.banner_style_level = 2;
        }
        if (!this.ServerConfig.intersititial_style_level) {
            this.ServerConfig.intersititial_style_level = 2;
        }
        this.ServerConfig.intersititia_delay_show_time = 0;
        console.log("插屏延时展示，延时时间：" + this.ServerConfig.intersititia_delay_show_time);
        console.log("banner && inter", this.ServerConfig.banner_style_mod, this.ServerConfig.intersititial_style_mod);
    };
    ;
    AdAgentHuaWei.prototype.ShowBanner = function (location, args, isTimeRefresh) {
        var _this = this;
        if (location === void 0) { location = null; }
        if (args === void 0) { args = null; }
        if (isTimeRefresh === void 0) { isTimeRefresh = false; }
        // return
        if (PlatUtils_1.default.IsHuaWei) {
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
            var interval_1 = this.ServerConfig.refresh_ad_time;
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
                        this._showNativeBanner(this._curNativeBannerInfo.nativeBannerAd, this._curNativeBannerInfo.data);
                        Utils_1.utils.showLog("开启定时刷新 >>>>>>>>>" + (interval_1 - refresh_ad_time));
                        clearTimeout(this._showBannerTimerId);
                        clearTimeout(this._delayShowBannerId);
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
                if (this.ServerConfig.banner_style_level) {
                    if (this.ServerConfig.banner_style_mod) {
                        if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 1) {
                            Utils_1.utils.showLog("banner_style_mod 为 1，展示原生banner");
                            this._createNativeBannerAd(this._showNativeBanner);
                        }
                        else if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 2) {
                            Utils_1.utils.showLog("banner_style_mod 为 2，展示默认banner");
                            this._createMiniGameBannerAd(location);
                        }
                        else {
                            Utils_1.utils.showLog("banner_style_mod 配置出错！");
                        }
                    }
                    else {
                        Utils_1.utils.showLog("服务器没有配置 banner_style_mod 字段！！");
                        this.ServerConfig.banner_style_level = 0;
                        this.ShowBanner(location);
                    }
                    this.bannerTimes++;
                    if (this.bannerTimes % this.ServerConfig.banner_style_level == 0) {
                        this.bannerType++;
                        this.bannerType = this.bannerType > 2 ? 1 : this.bannerType;
                    }
                }
                else if (this.ServerConfig.banner_first_ad) {
                    if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                        Utils_1.utils.showLog("优先展示原生Banner广告!");
                        if (this.ServerConfig.intersititial_first_ad == "native") {
                            var timeOut = 0;
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
                        Utils_1.utils.showLog("优先展示小游戏Banner广告!");
                        this._createMiniGameBannerAd(location);
                    }
                }
                else {
                    this._createNativeBannerAd(this._showNativeBanner);
                }
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentHuaWei.prototype.HideBanner = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsHuaWei) {
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            if (this._bannerAd) {
                Utils_1.utils.showLog("隐藏小游戏Banner");
                this._bannerAd.hide();
            }
            if (this._nativeBannerNode) {
                Utils_1.utils.showLog("隐藏原生Banner");
                this._nativeBannerNode.active = false;
            }
        }
    };
    AdAgentHuaWei.prototype.showNativeTryGameWidget = function () {
        var _this = this;
        if (PlatUtils_1.default.IsHuaWei) {
            Utils_1.utils.showLog("显示原生icon nativeNeedChange=", Utils_1.utils.nativeNeedChange, "  utils.tryGameDate", Utils_1.utils.tryGameDate, "utils.config.huaweiConfig.nativeTryGameIds", Utils_1.utils.config.huaweiConfig.nativeTryGameIds);
            if (Utils_1.utils.nativeNeedChange || !Utils_1.utils.tryGameDate) {
                if (Utils_1.utils.config.huaweiConfig.nativeTryGameIds) {
                    var len = Utils_1.utils.config.huaweiConfig.nativeTryGameIds.length;
                    Utils_1.utils.showLog("len:" + len);
                    var _loop_1 = function (i) {
                        if (!this_1.tryGameAdArr[i]) {
                            var posId = Utils_1.utils.config.huaweiConfig.nativeTryGameIds[i];
                            Utils_1.utils.showLog("创建原生icon。 posId:" + posId);
                            //@ts-ignore
                            var tryGameAd_1 = qg.createNativeAd({
                                adUnitId: posId,
                                success: function (code) {
                                    console.log("loadNativeAd loadNativeAd : success");
                                },
                                fail: function (data, code) {
                                    console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                                },
                                complete: function () {
                                    console.log("loadNativeAd loadNativeAd : complete");
                                }
                            });
                            if (tryGameAd_1) {
                                tryGameAd_1.onLoad(function (res) {
                                    Utils_1.utils.nativeNeedChange = false;
                                    console.log("原生icon加载成功");
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
                                            else {
                                                _this.createNativeTryGameWidget();
                                            }
                                        }
                                        Utils_1.utils.showLog("原生icon广告资源拉取成功，是否可以添加广告" + canAdd_1);
                                        Utils_1.utils.showLog(JSON.stringify(res));
                                    }
                                });
                                tryGameAd_1.onError(function (err) {
                                    Utils_1.utils.showLog("原生icon广告资源拉取失败！" + JSON.stringify(err));
                                    Utils_1.utils.nativeNeedChange = true;
                                    if (_this.ServerConfig.intersititial_style_level) {
                                        if (_this.ServerConfig.intersititial_style_mod[_this.intersititialType - 1] == 3) {
                                            Utils_1.utils.showLog("开始展示原生插屏！");
                                            Utils_1.utils.delayCall(_this.nativeInserAdDelayCall.bind(_this), _this.ServerConfig.intersititia_delay_show_time || 0);
                                        }
                                    }
                                    tryGameAd_1.destroy();
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
            this.createNativeTryGameWidget();
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
    AdAgentHuaWei.prototype.createNativeTryGameWidget = function (params) {
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
            widget.updateAlignment();
        }
        else {
            node.parent = cc.director.getScene();
            if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
                node.group = Utils_1.utils.otherConfig.group;
            }
            widget.enabled = false;
            node.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        }
        node.active = true;
        if (this._nativeTryGameNode) {
            this._nativeTryGameNode.getComponent(NativeTryGamesWidget_1.default).init();
        }
    };
    /**
     * 隐藏浮动试玩挂件
     */
    AdAgentHuaWei.prototype.hideNativeTryGameWidget = function () {
        if (this._nativeTryGameNode && cc.isValid(this._nativeTryGameNode)) {
            this._nativeTryGameNode.destroy();
        }
    };
    AdAgentHuaWei.prototype._canShowNativeSplashView = function (callBack) {
        var _this = this;
        if (!this._isDataInit) {
            Utils_1.utils.showLog("广告数据未初始化完成，设置回调>>>>>");
            cc.director.off("IsDataInit");
            var call_1 = callBack;
            cc.director.on("IsDataInit", (function () {
                Utils_1.utils.showLog("回调成功,展示开屏广告>>>>>");
                _this._isDataInit = true;
                _this.showNativeSplashView(call_1);
                cc.director.off("IsDataInit");
            }), this);
            return false;
        }
        return true;
    };
    AdAgentHuaWei.prototype.showNativeSplashView = function (callBack) {
        var _this = this;
        if (callBack === void 0) { callBack = null; }
        if (!this._canShowNativeSplashView(callBack))
            return;
        if (PlatUtils_1.default.IsHuaWei) {
            // utils.config.huaweiConfig.nativeSplashId = "testu7m3hc4gvm";
            Utils_1.utils.showLog("显示开屏广告,广告ID ", Utils_1.utils.config.huaweiConfig.nativeSplashId);
            if (Utils_1.utils.config.huaweiConfig.nativeSplashId) {
                var posId = Utils_1.utils.config.huaweiConfig.nativeSplashId;
                Utils_1.utils.showLog("创建原生开屏广告。 posId:" + posId);
                //@ts-ignore
                var splashView_1 = qg.createNativeAd({
                    adUnitId: posId,
                    success: function (code) {
                        console.log("loadNativeAd loadNativeAd : success");
                    },
                    fail: function (data, code) {
                        console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                    },
                    complete: function () {
                        console.log("loadNativeAd loadNativeAd : complete");
                    }
                });
                if (splashView_1) {
                    splashView_1.onLoad(function (res) {
                        if (res && res.adList && res.adList.length > 0) {
                            res = JSON.parse(JSON.stringify(res));
                            var adId = res.adList[0].adId;
                            Utils_1.utils.showLog("adId:" + adId);
                            Utils_1.utils.showLog("原生开屏广告资源拉取成功:" + JSON.stringify(res));
                            var data = res.adList[0];
                            _this._creatNativeSplashView(splashView_1, data);
                            if (callBack) {
                                cc.director.on("SplashViewOff", (function () {
                                    callBack();
                                    cc.director.off("SplashViewOff");
                                }), _this);
                            }
                        }
                    });
                    splashView_1.onError(function (err) {
                        if (callBack) {
                            callBack();
                        }
                        Utils_1.utils.showLog("原生开屏广告资源拉取失败！" + JSON.stringify(err));
                        splashView_1.destroy();
                    });
                    splashView_1.load();
                }
                else {
                    if (callBack) {
                        callBack();
                    }
                    Utils_1.utils.showLog("原生开屏广告创建失败!");
                }
            }
            else {
                if (callBack) {
                    callBack();
                }
                Utils_1.utils.showLog("原生开屏广告ID配置有误！！");
            }
        }
    };
    /**
     * 显示原生开屏组件
     */
    AdAgentHuaWei.prototype._creatNativeSplashView = function (splashView, data) {
        if (PlatUtils_1.default.IsHuaWei) {
            if (data) {
                if (!cc.isValid(this._nativeSplashNode) && Utils_1.utils.config.otherconfig.nativeSplashView) {
                    Utils_1.utils.showLog("创建原生插屏广告位");
                    this._nativeSplashNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeSplashView);
                    this._nativeSplashNode.position = CompatibleTool_1.default.position(cc.winSize.width / 2, cc.winSize.height / 2);
                    cc.director.getScene().addChild(this._nativeSplashNode, 999999);
                }
                if (this._nativeSplashNode) {
                    var nativeSplash = this._nativeSplashNode.getComponent("YZ_NativeSplashView");
                    if (nativeSplash) {
                        nativeSplash.init(splashView, data);
                        // utils.HuaweiTool.countInserShowCount();
                        // utils.showLog("原生插屏显示成功，当前显示次数=" + utils.HuaweiTool.insertAdShowCounts);
                    }
                    else {
                        cc.director.emit("SplashViewOff");
                        Utils_1.utils.showLog("NativeSplashView组件不存在!");
                    }
                }
                else {
                    cc.director.emit("SplashViewOff");
                    Utils_1.utils.showLog("原生开屏广告没有创建成功！");
                }
            }
        }
    };
    AdAgentHuaWei.prototype.ShowInterstitial = function (location) {
        var _this = this;
        if (location === void 0) { location = null; }
        // utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
        if (PlatUtils_1.default.IsHuaWei) {
            if (this.ServerConfig) {
                if (!this.checkInsertAdShow())
                    return;
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
                    if (this.ServerConfig.intersititial_style_level) {
                        if (this.ServerConfig.intersititial_style_mod) {
                            if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
                                Utils_1.utils.showLog("intersititial_style_mod 为 1，展示原生插屏");
                                Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                            else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
                                Utils_1.utils.showLog("intersititial_style_mod 为 2，展示默认插屏");
                                this._createMiniGameInsertAd();
                            }
                            else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 3) {
                                Utils_1.utils.showLog("intersititial_style_mod 为 2，展示原生icon");
                                this.showNativeTryGameWidget();
                            }
                            else {
                                Utils_1.utils.showLog("banner_style_mod 配置出错！");
                            }
                        }
                        else {
                            Utils_1.utils.showLog("服务器没有配置 banner_style_mod 字段！！");
                            this.ServerConfig.intersititial_style_level = 0;
                            this.ShowInterstitial(location);
                        }
                        setTimeout(function () {
                            _this.intersititialTimes++;
                            if (_this.intersititialTimes % _this.ServerConfig.intersititial_style_level == 0) {
                                _this.intersititialType++;
                                _this.intersititialType = _this.intersititialType > 3 ? 1 : _this.intersititialType;
                            }
                        }, 3000);
                    }
                    else if (this.ServerConfig.intersititial_first_ad == "native") {
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
    AdAgentHuaWei.prototype.nativeInserAdDelayCall = function () {
        // utils.showLog("原生插屏广告: 当前点击次数=" + utils.HuaweiTool.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititia_show_interval + "; 展示累计=" + this._nativeInsertAdShowCount);
        // if (utils.HuaweiTool.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
        //     // 每日点击次数到达上限，限制展示次数
        //     if (this._nativeInsertAdShowCount >= (this.ServerConfig.intersititia_show_interval || 0)) {
        // 可以展示
        this._createNativeInsertAd(this._showNativeInsert);
        //     } else {
        //         // 不能展示
        //         this._nativeInsertAdShowCount++;
        //     }
        // } else {
        //     this._createNativeInsertAd(this._showNativeInsert);
        // }
    };
    AdAgentHuaWei.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsHuaWei) {
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
                if (!this._videoAd) {
                    this._initVideoAd();
                }
                if (this._videoAd && this._videoLoaded) {
                    this._videoAd.show();
                    return;
                }
            }
            Utils_1.utils.showLog("暂无视频广告!");
            this._videoAd.load();
            if (this._videoCallback) {
                this._videoCallback(false, "暂无视频广告!");
                this._videoCallback = null;
            }
        }
    };
    AdAgentHuaWei.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (Utils_1.utils.config.huaweiConfig.videoId) {
                Utils_1.utils.showLog("视频广告初始化：ID=" + Utils_1.utils.config.huaweiConfig.videoId);
                this._videoAd = this.huawei.createRewardedVideoAd({
                    adUnitId: Utils_1.utils.config.huaweiConfig.videoId,
                    success: function (code) {
                        console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd: success");
                    },
                    fail: function (data, code) {
                        console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd fail: " + data + "," + code);
                    },
                    complete: function () {
                        console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd complete");
                    }
                });
                var self_1 = this;
                if (this._videoAd) {
                    Utils_1.utils.showLog("初始化注册视频回调!");
                    this._videoAd.onLoad(function () {
                        Utils_1.utils.showLog("激励视频加载成功");
                        self_1._videoLoaded = true;
                    });
                    this._videoAd.onError(function (err) {
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
                            Utils_1.utils.showLog("延迟3秒重新加载视频广告");
                        }, 3000);
                        if (res.isEnded) {
                            _this.lastLastShowVideoTime = new Date().getTime();
                            Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                            if (self_1._videoCallback) {
                                self_1._videoCallback(true, "");
                                self_1._videoCallback = null;
                            }
                        }
                        else {
                            Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                            if (self_1._videoCallback) {
                                self_1._videoCallback(false, "观看完视频才能获得奖励!");
                                self_1._videoCallback = null;
                            }
                        }
                    });
                    this._videoAd.load();
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
    AdAgentHuaWei.prototype.checkInsertAdShow = function () {
        var maxShowCount = this.ServerConfig.intersititial_max_show_count;
        var intervalTime = this.ServerConfig.intersititial_interval_time;
        var curTime = new Date().getTime();
        var interval = (curTime - this._insertLastShowTime) / 1000;
        Utils_1.utils.showLog("Huawei服务器插屏最大显示次数为：" + maxShowCount + ",间隔显示时间为：" + intervalTime + "秒！");
        // utils.showLog("Huawei插屏当前广告显示次数：" + utils.Tool_Huawei.insertAdShowCounts + "次，间隔时间：" + interval + "秒！");
        // if (maxShowCount > 0 && utils.HuaweiTool.insertAdShowCounts >= maxShowCount) {
        //     utils.showLog("Huawei插屏广告显示的次数达到" + maxShowCount + "次。插屏不显示");
        //     return false;
        // }
        if (intervalTime > 0 && interval < intervalTime) {
            Utils_1.utils.showLog("Huawei插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }
        return true;
    };
    AdAgentHuaWei.prototype._initInsertAd = function () {
        var _this = this;
        if (!this._insertAd) {
            if (Utils_1.utils.config.huaweiConfig
                && Utils_1.utils.config.huaweiConfig.insertId) {
                //@ts-ignore
                this._insertAd = qg.createInterstitialAd({
                    adUnitId: Utils_1.utils.config.huaweiConfig.insertId
                });
                Utils_1.utils.showLog("小游戏插屏ID：", Utils_1.utils.config.huaweiConfig.insertId);
                if (this._insertAd) {
                    Utils_1.utils.showLog("注册小游戏插屏广告回调！");
                    this._insertAd.onError((function (err) {
                        Utils_1.utils.showLog("华为 小游戏插屏广告出错:" + JSON.stringify(err));
                        if (_this._canInsertShow) {
                            if (_this.ServerConfig.intersititial_style_level) {
                                if (_this.ServerConfig.intersititial_style_mod[_this.intersititialType - 1] == 2) {
                                    Utils_1.utils.showLog("开始展示原生插屏！");
                                    Utils_1.utils.delayCall(_this.nativeInserAdDelayCall.bind(_this), _this.ServerConfig.intersititia_delay_show_time || 0);
                                }
                                else if (_this.ServerConfig.intersititial_style_mod[_this.intersititialType - 1] == 1) {
                                    Utils_1.utils.showLog("开始展示原生icon！");
                                    _this.showNativeTryGameWidget();
                                }
                            }
                            else if (_this.ServerConfig.intersititial_first_ad == "default") {
                                _this._isInsertShow = false;
                                Utils_1.utils.showLog("开始显示原生插屏广告!");
                                _this._curPosIdIndexNativeInser = 0;
                                Utils_1.utils.delayCall(_this.nativeInserAdDelayCall.bind(_this), _this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                            else {
                                Utils_1.utils.showLog("开始展示原生icon！");
                                _this.showNativeTryGameWidget();
                            }
                            _this._canInsertShow = false;
                        }
                        _this._insertAd.destroy();
                        _this._insertAd = null;
                    }).bind(this));
                    this._insertAd.onLoad((function () {
                        Utils_1.utils.showLog("Huawei 小程序插屏广告加载成功! #_canInsertShow=" + _this._canInsertShow);
                        _this._isInsertLoad = true;
                        // utils.Tool_Huawei.countInserShowCount();
                        if (_this._canInsertShow) {
                            _this._insertLastShowTime = new Date().getTime();
                            var closeType = _this.ServerConfig.intersititial_open_close_banner;
                            if (closeType && closeType > 0) {
                                Utils_1.utils.showLog("Huawei 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                                _this.HideBanner();
                            }
                            _this._insertAd.show();
                        }
                    }).bind(this));
                    this._insertAd.onClose((function () {
                        Utils_1.utils.showLog("huawei 小程序插屏广告关闭");
                        _this._isInsertLoad = false;
                        _this._canInsertShow = false;
                        _this.ShowBanner();
                        // setTimeout(() => {
                        //     this._insertAd.load();
                        // }, 3000);
                    }).bind(this));
                }
                if (!this._insertAd) {
                    Utils_1.utils.showLog("Huawei小游戏插屏广告创建失败！");
                    if (this._canInsertShow) {
                        if (this.ServerConfig.intersititial_style_level) {
                            if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
                                Utils_1.utils.showLog("开始展示原生插屏！");
                                Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                            else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
                                Utils_1.utils.showLog("开始展示原生icon！");
                                this.showNativeTryGameWidget();
                            }
                        }
                        else if (this.ServerConfig.intersititial_first_ad == "default") {
                            this._isInsertShow = false;
                            Utils_1.utils.showLog("开始显示原生插屏广告!");
                            this._curPosIdIndexNativeInser = 0;
                            Utils_1.utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                        }
                        else {
                            Utils_1.utils.showLog("开始展示原生icon！");
                            this.showNativeTryGameWidget();
                        }
                        this._canInsertShow = false;
                    }
                }
            }
            else {
                Utils_1.utils.showLog("Huawei 小游戏插屏广告配置信息错误!");
            }
        }
    };
    AdAgentHuaWei.prototype._createMiniGameInsertAd = function () {
        if (PlatUtils_1.default.IsHuaWei) {
            Utils_1.utils.showLog("[展示小游戏插屏广告]");
            if (this.ServerConfig) {
                this._canInsertShow = true;
                if (!this._insertAd) {
                    this._initInsertAd();
                }
                if (this._insertAd) {
                    this._insertAd.load();
                    return;
                }
            }
        }
    };
    AdAgentHuaWei.prototype._createMiniGameBannerAd = function (location) {
        var _this = this;
        if (location === void 0) { location = null; }
        this._isBannerShow = true;
        if (!Utils_1.utils.config.huaweiConfig.bannerId) {
            Utils_1.utils.showLog("BannerID 未正确配置！");
            return;
        }
        if (!this._bannerAd) {
            //@ts-ignore
            var top = Utils_1.utils.Tool_Huawei.SysInfo.safeArea.height - 57;
            Utils_1.utils.showLog("banner  =====#top=" + Utils_1.utils.Tool_Huawei.SysInfo.safeArea.height + " #top=" + top);
            this._bannerAd = this.huawei.createBannerAd({
                adUnitId: Utils_1.utils.config.huaweiConfig.bannerId,
                style: {
                    top: top,
                    left: 0,
                    height: 57,
                    width: 360
                }
            });
            Utils_1.utils.showLog("注册小游戏banner回调!" + this._bannerAd + " id=" + Utils_1.utils.config.huaweiConfig.bannerId);
            if (this._bannerAd) {
                this._bannerAd.onError(function (err) {
                    Utils_1.utils.showLog("huawei小游戏Banner，显示异常：" + JSON.stringify(err));
                    if (_this.ServerConfig.banner_style_level) {
                        if (_this.ServerConfig.banner_style_mod[_this.bannerType - 1] == 2) {
                            Utils_1.utils.showLog("开始展示默认banner");
                            _this._createNativeBannerAd(_this._showNativeBanner);
                        }
                    }
                });
                this._bannerAd.onLoad(function () {
                    Utils_1.utils.showLog("huawei小游戏Banner，加载成功");
                    if (_this._nativeBannerNode) {
                        _this._nativeBannerNode.active = false;
                    }
                });
                // this._bannerAd.onShow((() => {
                //     utils.showLog("huawei 小游戏Banner显示成功！");
                // }).bind(this));
                // this._bannerAd.onHide(function () {
                //     utils.showLog("huawei 小游戏Banner 广告隐藏");
                // })
            }
        }
        if (this._bannerAd) {
            this._bannerAd.show();
        }
        else {
            Utils_1.utils.showLog("huawei 小游戏Banner广告创建失败!");
            if (this.ServerConfig.banner_style_level) {
                if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 2) {
                    Utils_1.utils.showLog("开始展示默认banner");
                    this._createNativeBannerAd(this._showNativeBanner);
                }
            }
        }
    };
    AdAgentHuaWei.prototype._createNativeBannerAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsHuaWei) {
            var callback_1 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner + " #id=" + Utils_1.utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
            var nativeBannerAd_1 = this._nativeBannerAd[this._curPosIdIndexNativeBanner];
            if (!nativeBannerAd_1) {
                if (Utils_1.utils.config.huaweiConfig.nativeBannerIds
                    && Utils_1.utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                    Utils_1.utils.showLog("创建原生广告Banner。 posId:" + Utils_1.utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                    //@ts-ignore
                    // nativeBannerAd = qg.createNativeAd({
                    //     posId: utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                    // });
                    nativeBannerAd_1 = this.huawei.createNativeAd({
                        adUnitId: Utils_1.utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner],
                        success: function (code) {
                            console.log("loadNativeAd loadNativeAd : success");
                        },
                        fail: function (data, code) {
                            console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                        },
                        complete: function () {
                            console.log("loadNativeAd loadNativeAd : complete");
                        }
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
                                    Utils_1.utils.showLog("当前原生Banner数据：" + data);
                                    if (_this.canShowNativeBanner) {
                                        _this._curPosIdIndexNativeBanner = 0;
                                        _this._showNativeBanner(nativeBannerAd_1, data);
                                        _this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd_1;
                                        _this._curNativeBannerInfo.data = data;
                                    }
                                    else {
                                        cc.warn("已经隐藏banner不可重复展示");
                                    }
                                    return;
                                }
                            }
                            Utils_1.utils.showLog("原生Banner广告资源出错！");
                            _this._curPosIdIndexNativeBanner++;
                            if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.huaweiConfig.nativeBannerIds.length) {
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
                        nativeBannerAd_1.onError(function (err) {
                            if (_this._nativeIsClose) {
                                Utils_1.utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            Utils_1.utils.showLog("原生Banner广告资源拉取失败！" + JSON.stringify(err));
                            _this._curPosIdIndexNativeBanner++;
                            if (_this._curPosIdIndexNativeBanner < Utils_1.utils.config.huaweiConfig.nativeBannerIds.length) {
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
                                if (_this.ServerConfig.banner_style_level) {
                                    if (_this.ServerConfig.banner_style_mod[_this.bannerType - 1] == 1) {
                                        Utils_1.utils.showLog("开始展示默认banner");
                                        _this._createMiniGameBannerAd();
                                    }
                                }
                                else if (_this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
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
                if (Utils_1.utils.config.huaweiConfig.nativeBannerIds && this._curPosIdIndexNativeBanner < Utils_1.utils.config.huaweiConfig.nativeBannerIds.length) {
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
                    if (this.ServerConfig.banner_style_level) {
                        if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 1) {
                            Utils_1.utils.showLog("开始展示默认banner");
                            this._createMiniGameBannerAd();
                        }
                    }
                    else if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
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
    AdAgentHuaWei.prototype._createNativeInsertAd = function (completeCallback) {
        var _this = this;
        if (PlatUtils_1.default.IsHuaWei) {
            var callback_2 = completeCallback;
            Utils_1.utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);
            var nativeInsertAd_1 = this._nativeInsertAd[this._curPosIdIndexNativeInser];
            if (!nativeInsertAd_1) {
                if (Utils_1.utils.config.huaweiConfig.nativeInsertIds
                    && Utils_1.utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                    Utils_1.utils.showLog("创建原生插屏广告。 posId:" + Utils_1.utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                    //@ts-ignore
                    nativeInsertAd_1 = qg.createNativeAd({
                        adUnitId: Utils_1.utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]
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
                            if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.huaweiConfig.nativeInsertIds.length) {
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
                            if (_this._curPosIdIndexNativeInser < Utils_1.utils.config.huaweiConfig.nativeInsertIds.length) {
                                _this._createNativeInsertAd(callback_2);
                            }
                            else {
                                _this._curPosIdIndexNativeInser = 0;
                                // 原生广告遍历完毕
                                Utils_1.utils.showLog("原生插屏广告遍历完毕，无法展示！");
                                if (_this.ServerConfig.intersititial_style_level) {
                                    if (_this.ServerConfig.intersititial_style_mod[_this.intersititialType - 1] != 2) {
                                        Utils_1.utils.showLog("开始展示默认插屏！");
                                        _this._createMiniGameInsertAd();
                                    }
                                    else {
                                        _this.showNativeTryGameWidget();
                                    }
                                }
                                else if (_this.ServerConfig.intersititial_first_ad == "native") {
                                    Utils_1.utils.showLog("开始展示小游戏插屏广告!");
                                    _this._createMiniGameInsertAd();
                                }
                                else {
                                    _this.showNativeTryGameWidget();
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
                if (Utils_1.utils.config.huaweiConfig.nativeInsertIds && this._curPosIdIndexNativeInser < Utils_1.utils.config.huaweiConfig.nativeInsertIds.length) {
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
    /**
     * 获取原生广告数据
     * @param args
     */
    AdAgentHuaWei.prototype.getNativeAdData = function () {
        if (!this._nativeAdObject) {
            this._nativeAdObject = new YZ_NativeAdObject_1.default();
        }
        this._nativeAdObject._nativeObj = this._nativeAd;
        this._nativeAdObject.data = this._nativeData;
        // utils.showLog("获取原生数据 >>>", this._nativeData)
        // setTimeout(() => {
        //     utils.showLog("延迟两秒重新请求原生广告数据");
        //     this._createNativeAd(args);
        // }, 2000);
        if (this._nativeData && this._nativeAd) {
            this._nativeData = null;
            return this._nativeAdObject;
        }
        return null;
    };
    // /**
    //  * 创建单个原生广告
    //  * @param completeCallback 
    //  */
    // createNativeAd(nativeItem?: YZ_NativeItem) {
    //     utils.showLog("_createNativeAd >>>>>");
    //     if (PlatUtils.IsHuaWei) {
    //         if (nativeItem) {
    //             this._curNativeItem = nativeItem;
    //         }
    //         utils.showLog("_curPosIdIndexSingleNative:" + this._curPosIdIndexSingleNative + "  #this._nativeSingleAd.length" + this._nativeSingleAd.length);
    //         let nativeSingleAd = this._nativeSingleAd[this._curPosIdIndexSingleNative];
    //         if (!nativeSingleAd) {
    //             if (utils.config.huaweiConfig.nativeSingleAdIds
    //                 && utils.config.huaweiConfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]) {
    //                 utils.showLog("创建原生广告。 posId:" + utils.config.huaweiConfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]);
    //                 //@ts-ignore
    //                 nativeSingleAd = qg.createNativeAd({
    //                     posId: utils.config.huaweiConfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]
    //                 });
    //                 if (nativeSingleAd) {
    //                     this._nativeSingleAd.push(nativeSingleAd);
    //                     nativeSingleAd.onLoad((res) => {
    //                         if (res && res.adList && res.adList.length > 0) {
    //                             utils.showLog("原生广告资源拉取成功！");
    //                             utils.showLog(JSON.stringify(res));
    //                             res = JSON.parse(JSON.stringify(res));
    //                             let data = res.adList[0];
    //                             if (this._checkNativeDataValid(data)) {
    //                                 this._curPosIdIndexSingleNative = 0;
    //                                 this._nativeData = data;
    //                                 this._nativeAd = nativeSingleAd;
    //                                 // utils.showLog("callback >>>", callback);
    //                                 // callback(this.getNativeAdData());
    //                                 this._showNativeAd();
    //                                 return;
    //                             } else {
    //                                 utils.showLog("原生广告资源不合法！");
    //                             }
    //                         }
    //                         utils.showLog("原生广告资源出错！");
    //                         this._curPosIdIndexSingleNative++;
    //                         if (this._curPosIdIndexSingleNative < utils.config.huaweiConfig.nativeSingleAdIds.length) {
    //                             this.createNativeAd();
    //                         } else {
    //                             this._curPosIdIndexSingleNative = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("单个原生广告ID遍历完毕，无法展示！");
    //                         }
    //                     });
    //                     nativeSingleAd.onError((err) => {
    //                         utils.showLog("原生单个广告资源拉取失败！" + err.code + err.msg);
    //                         this._curPosIdIndexSingleNative++;
    //                         if (this._curPosIdIndexSingleNative < utils.config.huaweiConfig.nativeSingleAdIds.length) {
    //                             this.createNativeAd();
    //                         } else {
    //                             this._curPosIdIndexSingleNative = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("单个原生广告ID遍历完毕，无法展示！");
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //         if (nativeSingleAd) {
    //             utils.showLog("nativeSingleAd reload");
    //             nativeSingleAd.load();
    //         } else {
    //             this._curPosIdIndexSingleNative++;
    //             if (utils.config.huaweiConfig.nativeSingleAdIds && this._curPosIdIndexSingleNative < utils.config.huaweiConfig.nativeSingleAdIds.length) {
    //                 this.createNativeAd();
    //             } else {
    //                 this._curPosIdIndexSingleNative = 0;
    //                 // 原生广告遍历完毕
    //                 utils.showLog("单个原生广告ID 遍历完毕，无法展示！");
    //             }
    //         }
    //     }
    // }
    /**
     * 显示原生banner组件
     */
    AdAgentHuaWei.prototype._showNativeBanner = function (nativeBannerAd, data) {
        if (PlatUtils_1.default.IsHuaWei) {
            if (data) {
                Utils_1.utils.showLog("显示原生banner");
                if (this._bannerAd) {
                    this._bannerAd.hide();
                }
                if (!cc.isValid(this._nativeBannerNode) || (!this._nativeBannerNode && Utils_1.utils.config.otherconfig.nativeBanner)) {
                    this._nativeBannerNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeBanner);
                    this._nativeBannerNode.position = CompatibleTool_1.default.position(cc.winSize.width / 2, this._nativeBannerNode.height * this._nativeBannerNode.scaleY / 2);
                    cc.director.getScene().addChild(this._nativeBannerNode, 1000);
                }
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
    AdAgentHuaWei.prototype._showNativeInsert = function (nativeInsertAd, data) {
        if (PlatUtils_1.default.IsHuaWei) {
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
                        // utils.HuaweiTool.countInserShowCount();
                        // utils.showLog("原生插屏显示成功，当前显示次数=" + utils.HuaweiTool.insertAdShowCounts);
                        var closeType = this.ServerConfig.intersititial_open_close_banner;
                        if (closeType && closeType > 0) {
                            Utils_1.utils.showLog("Huawei 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
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
    AdAgentHuaWei.prototype.ShowCloseBtnBanner = function (location, args) {
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
    AdAgentHuaWei.prototype._checkNativeInsertDataValid = function (data) {
        if (!data) {
            return false;
        }
        return data.title && ((data.iconUrlList && data.iconUrlList.length > 0) || (data.imgUrlList && data.imgUrlList.length > 0));
    };
    AdAgentHuaWei.prototype._checkNativeDataValid = function (data) {
        Utils_1.utils.showLog("checkNativeDataValid");
        if (!data) {
            return false;
        }
        if (data.imgUrlList && data.imgUrlList.length > 0) {
            return true;
        }
        if (data.title && data.desc && data.clickBtnTxt && ((data.iconUrlList && data.iconUrlList.length > 0))) {
            return true;
        }
        return false;
    };
    /**
     * 验证是否显示激励插屏
     */
    AdAgentHuaWei.prototype.checkRewardInsertIsShow = function () {
        // let jumpList = utils.getRecommondGameList();
        // if (utils.isSupportnavigateToMiniGame()) {
        //     if (utils.HuaweiTool
        //         && utils.HuaweiTool.ServerConfig
        //         && utils.HuaweiTool.ServerConfig.is_reward_intersititia) {
        //         if (utils.HuaweiTool.ServerConfig.is_reward_intersititia == "true"
        //             && jumpList && jumpList.length > 0) {
        //             utils.showLog("激励插屏显示环境验证通过！");
        //             return true;
        //         } else {
        //             utils.showLog("is_reward_intersititia 参数为false，激励插屏组件不显示！");
        //             return false;
        //         }
        //     } else {
        //         utils.showLog("配置中没有is_reward_intersititia参数，激励插屏组件组件不显示！");
        //         return false;
        //     }
        // }
        // utils.showLog("当前平台不支持小程序跳转！");
        // return false;
    };
    /**
    * 显示激励插屏组件
    */
    AdAgentHuaWei.prototype.showRewardInsert = function () {
        Utils_1.utils.showLog("show reward");
        // let self = this;
        // if (!this.checkRewardInsertIsShow()) {
        //     self._videoCallback && self._videoCallback(false, "暂无视频广告！");
        //     utils.adManager.videoCallBack = null;
        //     return;
        // }
        // if (((!cc.isValid(this._rewardInsertNode)) || !this._rewardInsertNode) && utils.config.otherconfig.rewardInsert) {
        //     utils.showLog("创建激励插屏广告");
        //     this._rewardInsertNode = cc.instantiate(utils.config.otherconfig.rewardInsert);
        //     this._rewardInsertNode.position = CompatibleTool.position(cc.winSize.width / 2, cc.winSize.height / 2);
        //     cc.director.getScene().addChild(this._rewardInsertNode, 9999);
        // }
        // if (this._rewardInsertNode) {
        //     let rewardInsert: RewardInsert = this._rewardInsertNode.getComponent("RewardInsert");
        //     if (rewardInsert) {
        //         rewardInsert.isShow = false;
        //         utils.showLog("显示激励插屏组件！");
        //     } else {
        //         utils.showLog("RewardInsert组件不存在!");
        //     }
        // } else {
        //     utils.showLog("激励插屏没有创建！");
        // }
    };
    AdAgentHuaWei.prototype.hideRewardInsert = function () {
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
    //     if (PlatUtils.IsHuaWei) {
    //         utils.showLog("curPosIdIndexNativeInsert:", this._curPosIdIndexNativeInser);
    //         let nativeInsertAd = this._nativeInsertAd[this._curPosIdIndexNativeInser];
    //         if (!nativeInsertAd) {
    //             if (utils.config.huaweiConfig.nativeInsertIds
    //                 && utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
    //                 utils.showLog("创建原生结算页面广告。 posId:", utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
    //                 nativeInsertAd = qg.createNativeAd({
    //                     posId: utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]
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
    //                         if (this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
    //                         if (this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
    //             if (utils.config.huaweiConfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
    AdAgentHuaWei.prototype.checkIsShowStatementAd = function () {
        if (Utils_1.utils.isSupportnavigateToMiniGame() && this.ServerConfig) {
            return true;
        }
        Utils_1.utils.showLog("当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
        return false;
    };
    /**
      * 创建结算页面推广组件
      */
    AdAgentHuaWei.prototype.ShowStatementRecomment = function (showNativeAd) {
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
    AdAgentHuaWei.prototype._showNativeAd = function () {
        if (this._curNativeItem) {
            this._curNativeItem.init(this.getNativeAdData());
        }
        // let nativeItem: YZ_NativeItem = node.getComponent("YZ_NativeItem");
        // utils.showLog("ShowSingleNativeAd <<<<<<<<<", nativeItem, "===", res)
        // if (nativeItem) 
    };
    /**
     * 创建结算页面推广组件
     */
    AdAgentHuaWei.prototype.ShowSingleNativeAd = function () {
        if (Utils_1.utils.config.otherconfig.singleNativeAd) {
            // if (this.getNativeAdData()) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.singleNativeAd);
            var nativeItem = node.getComponent("YZ_NativeItem");
            nativeItem.showType = 2;
            this._curNativeItem = nativeItem;
            this.createNativeAd();
            // this.createNativeAd((res) => {
            //     utils.showLog("ShowSingleNativeAd <<<<<<<<<", nativeItem, "===", res)
            //     if (nativeItem) nativeItem.init(res, 2);
            // })
            // if (this._nativeAdObject._nativeAdData) {
            //     statementRecomment.nativeData = this._nativeAdObject._nativeAdData;
            // } else {
            //     utils.showLog("结算推广组件 >>  原生广告数据不存在！");
            //     return null;
            // }
            Utils_1.utils.showLog("单个原生广告创建成功！");
            // this._createNativeAd();
            return node;
            // } else {
            //     utils.showLog("单个原生广告创建失败，原生广告数据不存在");
            //     return null;
            // }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
            return null;
        }
    };
    /**
     * 显示结算广告
     * @param data 参数： closeBtn:
     */
    AdAgentHuaWei.prototype.showStatementAds = function (data) {
        // let result: any = { "type": 0, "node": null };
        // if (this.ServerConfig && this.ServerConfig.statement_type) {
        //     let type = this.ServerConfig.statement_type;
        //     let spareType = this.ServerConfig.st_spare_type;
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
        // } else {
        //     utils.showLog("配置未初始化、或者没有配置结算广告！");
        //     return result;
        // }
    };
    AdAgentHuaWei.prototype.showFullScreenVideo = function () {
    };
    AdAgentHuaWei.prototype.GameExit = function () { };
    AdAgentHuaWei.prototype.Share = function () { };
    AdAgentHuaWei = __decorate([
        ccclass
    ], AdAgentHuaWei);
    return AdAgentHuaWei;
}(AdAgent_1.default));
exports.default = AdAgentHuaWei;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEh1YVdlaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNkNBQStDO0FBQy9DLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFHaEMseURBQW9EO0FBRXBELCtEQUEwRDtBQUcxRCxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQU87SUFBbEQ7UUFBQSxxRUF1OERDO1FBcjhERyxZQUFZO1FBQ1osWUFBTSxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFFeEIsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIscUJBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIsZUFBUyxHQUFRLElBQUksQ0FBQztRQUV0QixjQUFjO1FBQ2QsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixZQUFZO1FBQ1osZ0NBQTBCLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLCtCQUF5QixHQUFXLENBQUMsQ0FBQztRQUN0QyxnQ0FBMEIsR0FBVyxDQUFDLENBQUM7UUFFdkMsaUJBQVcsR0FBUSxJQUFJLENBQUM7UUFDeEIsdUJBQWlCLEdBQVEsSUFBSSxDQUFDO1FBQzlCLHVCQUFpQixHQUFZLElBQUksQ0FBQztRQUNsQyx1QkFBaUIsR0FBWSxJQUFJLENBQUM7UUFFbEMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsa0JBQVksR0FB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Um9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUmV3YXJkSW5zZXJ0IGZyb20gXCIuL1Jld2FyZEluc2VydFwiO1xyXG5pbXBvcnQgWVpfU3RhdGVtZW50UmVjb21tZW50QWQgZnJvbSBcIi4vWVpfU3RhdGVtZW50UmVjb21tZW50QWRcIjtcclxuaW1wb3J0IFlaX05hdGl2ZUFkT2JqZWN0IGZyb20gXCIuL1laX05hdGl2ZUFkT2JqZWN0XCI7XHJcbmltcG9ydCBZWl9OYXRpdmVJdGVtIGZyb20gXCIuL1laX05hdGl2ZUl0ZW1cIjtcclxuaW1wb3J0IE5hdGl2ZVRyeUdhbWVzV2lkZ2V0IGZyb20gXCIuL05hdGl2ZVRyeUdhbWVzV2lkZ2V0XCI7XHJcbmltcG9ydCBZWl9OYXRpdmVCYW5uZXIgZnJvbSBcIi4vWVpfTmF0aXZlQmFubmVyXCI7XHJcbmltcG9ydCB7IEJhbm5lcklkSW5mbywgTmF0aXZlQmFubmVySW5mbyB9IGZyb20gXCIuL0NvbW1vbkNvbmZpZ1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50SHVhV2VpIGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBodWF3ZWk6IGFueSA9IHdpbmRvdy5xZztcclxuXHJcbiAgICBfYmFubmVyQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfaW5zZXJ0QWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9BZDogYW55ID0gbnVsbDtcclxuICAgIF9uYXRpdmVCYW5uZXJBZDogYW55W10gPSBbXTtcclxuICAgIF9uYXRpdmVJbnNlcnRBZDogYW55W10gPSBbXTtcclxuICAgIF9uYXRpdmVTaW5nbGVBZDogYW55W10gPSBbXTtcclxuICAgIF9uYXRpdmVBZDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyDlub/lkYrnu4Tku7bmmK/lkKbliJ3lp4vljJbmiJDlip9cclxuICAgIF9pc0FkSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9pc0Jhbm5lclNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc0luc2VydFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvLyDlvZPliY3kvY3nva5pZOeahOe0ouW8lVxyXG4gICAgX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXI6IG51bWJlciA9IDA7XHJcbiAgICBfY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyOiBudW1iZXIgPSAwO1xyXG4gICAgX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX25hdGl2ZURhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfbmF0aXZlSW5zZXJ0RGF0YTogYW55ID0gbnVsbDtcclxuICAgIF9uYXRpdmVCYW5uZXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9uYXRpdmVJbnNlcnROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX3ZpZGVvTG9hZGVkOiBib29sZWFuID0gbnVsbDtcclxuXHJcbiAgICBfbWluaUJhbm5lckhlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfc2hvd0Jhbm5lckNhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgX25hdGl2ZUFkT2JqZWN0OiBZWl9OYXRpdmVBZE9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgLy/mj5LlsY/mmL7npLrmrKHmlbBcclxuICAgIF9pbnNlcnRTaG93Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX2luc2VydExhc3RTaG93VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfY3VyTmF0aXZlSXRlbTogWVpfTmF0aXZlSXRlbSA9IG51bGw7XHJcblxyXG4gICAgX2lzTmF0aXZlQmFubmVyU2hvdzogYm9vbGVhbiA9IGZhbHNlOyAvL+WOn+eUn+W5v+WRiuWxleekuu+8jOiwg+eUqOeahOmakOiXj1xyXG5cclxuICAgIGxhc3RMYXN0U2hvd1ZpZGVvVGltZTogbnVtYmVyID0gMDsgLy/mnIDlkI7kuIDmrKHmmL7npLrop4bpopHml7bpl7RcclxuXHJcblxyXG5cclxuICAgIF9iYW5uZXJIaWRlQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY2FuU2hvd05hdGl2ZUJhbm5lciA9IHRydWU7IC8v5Y6f55SfYmFubmVy5piv5ZCm5bGV56S6XHJcblxyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLlRvb2xfSHVhd2VpICYmIHV0aWxzLlRvb2xfSHVhd2VpLlNlcnZlckNvbmZpZykgcmV0dXJuIHV0aWxzLlRvb2xfSHVhd2VpLlNlcnZlckNvbmZpZztcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgX25hdGl2ZUJhbm5lckluZm86IE5hdGl2ZUJhbm5lckluZm8gPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY1iYW5uZXLphY3nva5cclxuICAgICAqL1xyXG4gICAgZ2V0TmF0aXZlQmFubmVySW5mbygpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVySW5mbyAmJiB0aGlzLl9uYXRpdmVCYW5uZXJJbmZvLmxvY2F0aW9uID09IHRoaXMuX2N1ckxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVCYW5uZXJJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5nZXROYXRpdmVCYW5uZXJJbmZvKHRoaXMuX2N1ckxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLm9uKFwiSXNEYXRhSW5pdFwiLCAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNEYXRhSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5vZmYoXCJJc0RhdGFJbml0XCIpO1xyXG4gICAgICAgICAgICB9KSwgdGhpcylcclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkh1YVdlaSDlub/lkYrku6PnkIbnu4Tku7bliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2luaXRJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5faW5pdExvY2FsRGF0ZSgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYmFubmVyVHlwZTogbnVtYmVyID0gMTtcclxuICAgIC8qKlxyXG4gICAgICogYmFubmVy5qC35byP77yaMeS7o+ihqOWOn+eUn2Jhbm5lcu+8jDLku6Pooajpu5jorqRiYW5uZXJcclxuICAgICAqL1xyXG4gICAgYmFubmVyX3N0eWxlX21vZDogQXJyYXk8bnVtYmVyPiA9IFsxLCAyXTtcclxuXHJcblxyXG4gICAgaW50ZXJzaXRpdGlhbFR5cGU6IG51bWJlciA9IDE7XHJcbiAgICAvKipcclxuICAgICAqIOaPkuWxj+agt+W8j++8mjHku6Pooajljp/nlJ/mj5LlsY/vvIwy5Luj6KGo6buY6K6k5o+S5bGP77yMM+S7o+ihqOWOn+eUn2ljb25cclxuICAgICAqL1xyXG4gICAgaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2Q6IEFycmF5PG51bWJlcj4gPSBbMSwgMiwgM107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBiYW5uZXLlsZXnpLrmrKHmlbBcclxuICAgICAqL1xyXG4gICAgYmFubmVyVGltZXM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOaPkuWxj+WxleekuuasoeaVsFxyXG4gICAgICovXHJcbiAgICBpbnRlcnNpdGl0aWFsVGltZXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX2luaXRMb2NhbERhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbW9kKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9zdHlsZV9tb2QgPSBbMSwgMl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2QpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2QgPSBbMSwgMiwgM107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wX25hdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5pY29uX2p1bXBfbmF0aXZlID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbGV2ZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX3N0eWxlX2xldmVsID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX2xldmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfc3R5bGVfbGV2ZWwgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lID0gMDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W7tuaXtuWxleekuu+8jOW7tuaXtuaXtumXtO+8mlwiICsgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIgJiYgaW50ZXJcIiwgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX3N0eWxlX21vZCwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2QpXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBfbmF0aXZlSXNDbG9zZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9zaG93QmFubmVyVGltZXJJZDogbnVtYmVyID0gMDtcclxuICAgIF9kZWxheVNob3dCYW5uZXJJZDogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgLy8gbmJjbHI65piv5ZCm5byA5ZCv5by65Yi25Yi35pawXHJcblxyXG4gICAgLy/lvZPliY3mmL7npLpCYW5uZXLnmoTkvY3nva5cclxuICAgIF9jdXJMb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ob25lO1xyXG4gICAgLy/lkK/liqjlrprml7blmajnmoTml7bpl7RcclxuICAgIF9zdGFydEJhbm5lclRpbWVyVGFzazogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwsIGFyZ3M6IGFueSA9IG51bGwsIGlzVGltZVJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIC8vIHJldHVyblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquivt+axguWIsOmFjee9ruaWh+S7tu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG9sZExvY2F0aW9uID0gdGhpcy5fY3VyTG9jYXRpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jdXJMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8v5aaC5p6c6Lez55So5L2N572u5YiH5o2i5LmL5ZCO77yM6aqM6K+B5piv5LiN5piv6YCa6L+H5a6a5pe25Zmo5by65Yi25Yi35paw5pWw5o2u77yM5LiN5piv5YiZ5YWI6ZqQ6JePYmFubmVyXHJcbiAgICAgICAgICAgIGlmIChvbGRMb2NhdGlvbiAhPSBsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGxldCByZWZyZXNoX2FkX3RpbWU6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fc3RhcnRCYW5uZXJUaW1lclRhc2spIC8gMTAwMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzICYmIGFyZ3MuaXNSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICBpc1RpbWVSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnRlcnZhbCAmJiBpbnRlcnZhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoX2FkX3RpbWUgPiBpbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGltZVJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDliKTmlq3lvZPliY3kvY3nva7mmK/kuI3mmK/mmL7npLpiYW5uZXJcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmF0aXZlQmFubmVySW5mbygpLmlzX3Nob3dfYmFubmVyID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5L2N572u6YWN572u5Li65LiN5bGV56S6YmFubmVyIVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSGlkZUJhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVGltZVJlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcubmJjbHIgJiYgdGhpcy5TZXJ2ZXJDb25maWcubmJjbHIgPT0gXCJ0cnVlXCIgJiYgdGhpcy5fY3VyTmF0aXZlQmFubmVySW5mby5uYXRpdmVCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5a6a5pe25Zmo5Yi35paw5pWw5o2uIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd05hdGl2ZUJhbm5lcih0aGlzLl9jdXJOYXRpdmVCYW5uZXJJbmZvLm5hdGl2ZUJhbm5lckFkLCB0aGlzLl9jdXJOYXRpdmVCYW5uZXJJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5ZCv5a6a5pe25Yi35pawID4+Pj4+Pj4+PlwiICsgKGludGVydmFsIC0gcmVmcmVzaF9hZF90aW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kZWxheVNob3dCYW5uZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5a6a5pe2JHtpbnRlcnZhbH3np5LosIPnlKhzaG93YmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIodGhpcy5fY3VyTG9jYXRpb24sIHt9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGludGVydmFsIC0gcmVmcmVzaF9hZF90aW1lKSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FuU2hvd05hdGl2ZUJhbm5lciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUlzQ2xvc2UgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlTaG93QmFubmVySWQpO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5riF55CG5a6a5pe25ZmoXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiYmFubmVyIOS8mOWFiOWxleekuiA+Pj4+XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJ2YWwgJiYgaW50ZXJ2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWQr+WumuaXtuWIt+aWsCA+Pj4+Pj4+Pj5cIiArIGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlrprml7Yke2ludGVydmFsfeenkuiwg+eUqHNob3diYW5uZXJgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93QmFubmVyKHRoaXMuX2N1ckxvY2F0aW9uLCB7fSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaW50ZXJ2YWwgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX3N0eWxlX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9zdHlsZV9tb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9zdHlsZV9tb2RbdGhpcy5iYW5uZXJUeXBlIC0gMV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImJhbm5lcl9zdHlsZV9tb2Qg5Li6IDHvvIzlsZXnpLrljp/nlJ9iYW5uZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbW9kW3RoaXMuYmFubmVyVHlwZSAtIDFdID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJiYW5uZXJfc3R5bGVfbW9kIOS4uiAy77yM5bGV56S66buY6K6kYmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZChsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiYmFubmVyX3N0eWxlX21vZCDphY3nva7lh7rplJnvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOayoeaciemFjee9riBiYW5uZXJfc3R5bGVfbW9kIOWtl+aute+8ge+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbGV2ZWwgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0Jhbm5lcihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyVGltZXMrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iYW5uZXJUaW1lcyAlIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9zdHlsZV9sZXZlbCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyVHlwZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSB0aGlzLmJhbm5lclR5cGUgPiAyID8gMSA6IHRoaXMuYmFubmVyVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfZmlyc3RfYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkLmluZGV4T2YoXCJuYXRpdmVcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65Y6f55SfQmFubmVy5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJuYXRpdmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVPdXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9iYW5uZXJfZGVsYXlfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVPdXQgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2RlbGF5X3RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlm6DkuLrmj5LlsY/kuZ/mmK/kvJjlhYjlsZXnpLrljp/nlJ/vvIzmiYDku6ViYW5uZXLlu7bov5/mmL7npLoke3RpbWVPdXR956eSYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbGF5U2hvd0Jhbm5lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQodGhpcy5fc2hvd05hdGl2ZUJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aW1lT3V0ICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65bCP5ri45oiPQmFubmVy5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZChsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZCh0aGlzLl9zaG93TmF0aXZlQmFubmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcblxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlTaG93QmFubmVySWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Jhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5bCP5ri45oiPQmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+WOn+eUn0Jhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRyeUdhbWVBZEFycjogYW55W10gPSBbXTtcclxuICAgIHB1YmxpYyBzaG93TmF0aXZlVHJ5R2FtZVdpZGdldCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrljp/nlJ9pY29uIG5hdGl2ZU5lZWRDaGFuZ2U9XCIsIHV0aWxzLm5hdGl2ZU5lZWRDaGFuZ2UsIFwiICB1dGlscy50cnlHYW1lRGF0ZVwiLCB1dGlscy50cnlHYW1lRGF0ZSwgXCJ1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZVRyeUdhbWVJZHNcIiwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVUcnlHYW1lSWRzKVxyXG4gICAgICAgICAgICBpZiAodXRpbHMubmF0aXZlTmVlZENoYW5nZSB8fCAhdXRpbHMudHJ5R2FtZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVUcnlHYW1lSWRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwibGVuOlwiICsgbGVuKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50cnlHYW1lQWRBcnJbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NJZCA9IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlVHJ5R2FtZUlkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ9pY29u44CCIHBvc0lkOlwiICsgcG9zSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJ5R2FtZUFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiBwb3NJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWROYXRpdmVBZCBsb2FkTmF0aXZlQWQgOiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkTmF0aXZlQWQgbG9hZE5hdGl2ZUFkIGZhaWw6IFwiICsgZGF0YSArIFwiLFwiICsgY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWROYXRpdmVBZCBsb2FkTmF0aXZlQWQgOiBjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ5R2FtZUFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5R2FtZUFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLm5hdGl2ZU5lZWRDaGFuZ2UgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWOn+eUn2ljb27liqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWRJZCA9IHJlcy5hZExpc3RbMF0uYWRJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImFkSWQ6XCIgKyBhZElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMudHJ5R2FtZURhdGUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZElkID09IGVsZW1lbnQuZGF0ZVswXS5hZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbkFkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuQWRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMudHJ5R2FtZURhdGUucHVzaCh7IFwidHJ5R2FtZUFkXCI6IHRyeUdhbWVBZCwgXCJkYXRlXCI6IHJlcy5hZExpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLl9uYXRpdmVUcnlHYW1lTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5fbmF0aXZlVHJ5R2FtZU5vZGUuZ2V0Q29tcG9uZW50KE5hdGl2ZVRyeUdhbWVzV2lkZ2V0KS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfaWNvbuW5v+WRiui1hOa6kOaLieWPluaIkOWKn++8jOaYr+WQpuWPr+S7pea3u+WKoOW5v+WRilwiICsgY2FuQWRkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlHYW1lQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ9pY29u5bm/5ZGK6LWE5rqQ5ouJ5Y+W5aSx6LSl77yBXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMubmF0aXZlTmVlZENoYW5nZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfc3R5bGVfbW9kW3RoaXMuaW50ZXJzaXRpdGlhbFR5cGUgLSAxXSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWOn+eUn+aPkuWxj++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5R2FtZUFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlHYW1lQWQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5R2FtZUFkQXJyW2ldID0gdHJ5R2FtZUFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlHYW1lQWRBcnJbaV0ubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmF0aXZlVHJ5R2FtZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmta7nqpflub/lkYrmjILku7ZcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKiBgYGBcclxuICAgICAqIHtcclxuICAgICAqIGdyb3VwOnN0cmluZ1xyXG4gICAgICogbGVmdDpudW1iZXJcclxuICAgICAqIGJvdHRvbTpudW1iZXJcclxuICAgICAqIHNjYWxlOm51bWJlclxyXG4gICAgICogcGFyZW50OmNjLk5vZGVcclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICogQHJldHVybnMg55Sf5oiQ55qE57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVOYXRpdmVUcnlHYW1lV2lkZ2V0KHBhcmFtczogYW55ID0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVUcnlHYW1lV2lkZ2V0KTtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVRyeUdhbWVOb2RlLnpJbmRleCA9IDk5OTk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGU7XHJcbiAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSBwYXJhbXMuZ3JvdXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5zY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gcGFyYW1zLnNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gcGFyYW1zLnRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuYm90dG9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gcGFyYW1zLmxlZnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnJpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQucmlnaHQgPSBwYXJhbXMucmlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJhbXMucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdyb3VwID0gdXRpbHMub3RoZXJDb25maWcuZ3JvdXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2lkZ2V0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52MihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuZ2V0Q29tcG9uZW50KE5hdGl2ZVRyeUdhbWVzV2lkZ2V0KS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5rWu5Yqo6K+V546p5oyC5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9uYXRpdmVUcnlHYW1lTm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVHJ5R2FtZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaXNEYXRhSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2NhblNob3dOYXRpdmVTcGxhc2hWaWV3KGNhbGxCYWNrKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0RhdGFJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrmlbDmja7mnKrliJ3lp4vljJblrozmiJDvvIzorr7nva7lm57osIM+Pj4+PlwiKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKFwiSXNEYXRhSW5pdFwiKTtcclxuICAgICAgICAgICAgbGV0IGNhbGwgPSBjYWxsQmFjaztcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oXCJJc0RhdGFJbml0XCIsICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Zue6LCD5oiQ5YqfLOWxleekuuW8gOWxj+W5v+WRij4+Pj4+XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNEYXRhSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOYXRpdmVTcGxhc2hWaWV3KGNhbGwpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKFwiSXNEYXRhSW5pdFwiKTtcclxuICAgICAgICAgICAgfSksIHRoaXMpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dOYXRpdmVTcGxhc2hWaWV3KGNhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NhblNob3dOYXRpdmVTcGxhc2hWaWV3KGNhbGxCYWNrKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgLy8gdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVTcGxhc2hJZCA9IFwidGVzdHU3bTNoYzRndm1cIjtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW8gOWxj+W5v+WRiizlub/lkYpJRCBcIiwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVTcGxhc2hJZClcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZVNwbGFzaElkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zSWQgPSB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZVNwbGFzaElkO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+W8gOWxj+W5v+WRiuOAgiBwb3NJZDpcIiArIHBvc0lkKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgbGV0IHNwbGFzaFZpZXcgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHBvc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZE5hdGl2ZUFkIGxvYWROYXRpdmVBZCA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiAoZGF0YSwgY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWROYXRpdmVBZCBsb2FkTmF0aXZlQWQgZmFpbDogXCIgKyBkYXRhICsgXCIsXCIgKyBjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZE5hdGl2ZUFkIGxvYWROYXRpdmVBZCA6IGNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzcGxhc2hWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BsYXNoVmlldy5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5hZExpc3QgJiYgcmVzLmFkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFkSWQgPSByZXMuYWRMaXN0WzBdLmFkSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJhZElkOlwiICsgYWRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5byA5bGP5bm/5ZGK6LWE5rqQ5ouJ5Y+W5oiQ5YqfOlwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5hZExpc3RbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdE5hdGl2ZVNwbGFzaFZpZXcoc3BsYXNoVmlldywgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oXCJTcGxhc2hWaWV3T2ZmXCIsICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLm9mZihcIlNwbGFzaFZpZXdPZmZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BsYXNoVmlldy5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lvIDlsY/lub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxhc2hWaWV3LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzcGxhc2hWaWV3LmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5byA5bGP5bm/5ZGK5Yib5bu65aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5byA5bGP5bm/5ZGKSUTphY3nva7mnInor6/vvIHvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX25hdGl2ZVNwbGFzaE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrljp/nlJ/lvIDlsY/nu4Tku7ZcclxuICAgICAqL1xyXG4gICAgX2NyZWF0TmF0aXZlU3BsYXNoVmlldyhzcGxhc2hWaWV3OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl9uYXRpdmVTcGxhc2hOb2RlKSAmJiB1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlU3BsYXNoVmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/mj5LlsY/lub/lkYrkvY1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlU3BsYXNoTm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVTcGxhc2hWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVTcGxhc2hOb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9uYXRpdmVTcGxhc2hOb2RlLCA5OTk5OTkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVTcGxhc2hOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hdGl2ZVNwbGFzaCA9IHRoaXMuX25hdGl2ZVNwbGFzaE5vZGUuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlU3BsYXNoVmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlU3BsYXNoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVTcGxhc2guaW5pdChzcGxhc2hWaWV3LCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV0aWxzLkh1YXdlaVRvb2wuY291bnRJbnNlclNob3dDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5pi+56S65oiQ5Yqf77yM5b2T5YmN5pi+56S65qyh5pWwPVwiICsgdXRpbHMuSHVhd2VpVG9vbC5pbnNlcnRBZFNob3dDb3VudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJTcGxhc2hWaWV3T2ZmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiTmF0aXZlU3BsYXNoVmlld+e7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KFwiU3BsYXNoVmlld09mZlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5byA5bGP5bm/5ZGK5rKh5pyJ5Yib5bu65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluc2VydFRpbWVJRDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICAvLyB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbnNlcnRBZFNob3coKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbiAmJiBsb2NhdGlvbiA9PSBCYW5uZXJMb2NhdGlvbi5QYXVzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaaguWBnOeVjOmdouS4jeW7tuaXtuWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWOn+eUn+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJpbnRlcnNpdGl0aWFsX3N0eWxlX21vZCDkuLogMe+8jOWxleekuuWOn+eUn+aPkuWxj1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJpbnRlcnNpdGl0aWFsX3N0eWxlX21vZCDkuLogMu+8jOWxleekuum7mOiupOaPkuWxj1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJpbnRlcnNpdGl0aWFsX3N0eWxlX21vZCDkuLogMu+8jOWxleekuuWOn+eUn2ljb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImJhbm5lcl9zdHlsZV9tb2Qg6YWN572u5Ye66ZSZ77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5rKh5pyJ6YWN572uIGJhbm5lcl9zdHlsZV9tb2Qg5a2X5q6177yB77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX2xldmVsID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJzaXRpdGlhbFRpbWVzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnRlcnNpdGl0aWFsVGltZXMgJSB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX2xldmVsID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyc2l0aXRpYWxUeXBlKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnNpdGl0aWFsVHlwZSA9IHRoaXMuaW50ZXJzaXRpdGlhbFR5cGUgPiAzID8gMSA6IHRoaXMuaW50ZXJzaXRpdGlhbFR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS8mOWFiOWxleekuuWOn+eUn+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwuYmluZCh0aGlzKSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5bGV56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVJbnNlcnRBZFNob3dDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBuYXRpdmVJbnNlckFkRGVsYXlDYWxsKCkge1xyXG4gICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYo6IOW9k+WJjeeCueWHu+asoeaVsD1cIiArIHV0aWxzLkh1YXdlaVRvb2wuTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzICsgXCI7IOeCueWHu+asoeaVsOmZkOWItj1cIiArIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbGlja19jb3VudCArIFwiOyDlsZXnpLrmrKHmlbDpl7TpmpQ9XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfc2hvd19pbnRlcnZhbCArIFwiOyDlsZXnpLrntK/orqE9XCIgKyB0aGlzLl9uYXRpdmVJbnNlcnRBZFNob3dDb3VudCk7XHJcbiAgICAgICAgLy8gaWYgKHV0aWxzLkh1YXdlaVRvb2wuTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzID49ICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xpY2tfY291bnQgfHwgMCkpIHtcclxuICAgICAgICAvLyAgICAgLy8g5q+P5pel54K55Ye75qyh5pWw5Yiw6L6+5LiK6ZmQ77yM6ZmQ5Yi25bGV56S65qyh5pWwXHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLl9uYXRpdmVJbnNlcnRBZFNob3dDb3VudCA+PSAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Nob3dfaW50ZXJ2YWwgfHwgMCkpIHtcclxuICAgICAgICAvLyDlj6/ku6XlsZXnpLpcclxuICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZCh0aGlzLl9zaG93TmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIOS4jeiDveWxleekulxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQrKztcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5sYXN0TGFzdFNob3dWaWRlb1RpbWUpIC8gMTAwMDtcclxuICAgICAgICAgICAgaWYgKGludGVydmFsIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeW5v+WRiuivt+axgumXtOmalOWwj+S6jjTnp5Is55u05o6l6L+U5ZueZmFsc2VcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9BZCAmJiB0aGlzLl92aWRlb0xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRWaWRlb0FkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy52aWRlb0lkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeW5v+WRiuWIneWni+WMlu+8mklEPVwiICsgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy52aWRlb0lkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQgPSB0aGlzLmh1YXdlaS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLnZpZGVvSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZCBkZW1vIDogbG9hZEFuZFNob3dWaWRlb0FkIGNyZWF0ZVJld2FyZGVkVmlkZW9BZDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IChkYXRhLCBjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWQgZGVtbyA6IGxvYWRBbmRTaG93VmlkZW9BZCBjcmVhdGVSZXdhcmRlZFZpZGVvQWQgZmFpbDogXCIgKyBkYXRhICsgXCIsXCIgKyBjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWQgZGVtbyA6IGxvYWRBbmRTaG93VmlkZW9BZCBjcmVhdGVSZXdhcmRlZFZpZGVvQWQgY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIneWni+WMluazqOWGjOinhumikeWbnuiwgyFcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5Ye66ZSZOiBcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uQ2xvc2UoKHJlcykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0FkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlu7bov58z56eS6YeN5paw5Yqg6L296KeG6aKR5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0TGFzdFNob3dWaWRlb1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a/gOWKseinhumikeW5v+WRiuWujOaIkO+8jOWPkeaUvuWlluWKsScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR5bm/5ZGK5Y+W5raI5YWz6Zet77yM5LiN5Y+R5pS+5aWW5YqxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeC55yL5a6M6KeG6aKR5omN6IO96I635b6X5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopHlub/lkYpJZOmFjee9rumUmeivryFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5o+S5bGP5piv5ZCm6IO95bGV56S6XHJcbiAgICAgKiAx44CB5qyh5pWw6ZmQ5Yi2IOm7mOiupOavj+aXpTjmrKFcclxuICAgICAqIDLjgIHml7bpl7TpmZDliLYg6buY6K6kNjDnp5JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0luc2VydEFkU2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbWF4U2hvd0NvdW50ID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9tYXhfc2hvd19jb3VudDtcclxuICAgICAgICBsZXQgaW50ZXJ2YWxUaW1lID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9pbnRlcnZhbF90aW1lO1xyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5faW5zZXJ0TGFzdFNob3dUaW1lKSAvIDEwMDA7XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWnmnI3liqHlmajmj5LlsY/mnIDlpKfmmL7npLrmrKHmlbDkuLrvvJpcIiArIG1heFNob3dDb3VudCArIFwiLOmXtOmalOaYvuekuuaXtumXtOS4uu+8mlwiICsgaW50ZXJ2YWxUaW1lICsgXCLnp5LvvIFcIik7XHJcbiAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhcIkh1YXdlaeaPkuWxj+W9k+WJjeW5v+WRiuaYvuekuuasoeaVsO+8mlwiICsgdXRpbHMuVG9vbF9IdWF3ZWkuaW5zZXJ0QWRTaG93Q291bnRzICsgXCLmrKHvvIzpl7TpmpTml7bpl7TvvJpcIiArIGludGVydmFsICsgXCLnp5LvvIFcIik7XHJcbiAgICAgICAgLy8gaWYgKG1heFNob3dDb3VudCA+IDAgJiYgdXRpbHMuSHVhd2VpVG9vbC5pbnNlcnRBZFNob3dDb3VudHMgPj0gbWF4U2hvd0NvdW50KSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWnmj5LlsY/lub/lkYrmmL7npLrnmoTmrKHmlbDovr7liLBcIiArIG1heFNob3dDb3VudCArIFwi5qyh44CC5o+S5bGP5LiN5pi+56S6XCIpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoaW50ZXJ2YWxUaW1lID4gMCAmJiBpbnRlcnZhbCA8IGludGVydmFsVGltZSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiSHVhd2Vp5o+S5bGP5bm/5ZGK5pi+56S655qE6Ze06ZqU5bCR5LqOXCIgKyBpbnRlcnZhbFRpbWUgKyBcIuenkuOAguaPkuWxj+S4jeaYvuekulwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HmmK/lkKbnrKzkuIDmrKHliJvlu7rmj5LlsY9cclxuICAgICAqL1xyXG4gICAgbWluaUluc2VyQWRJc0NyZWF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rlsI/nqIvluo/mj5LlsY/lub/lkYpcclxuICAgICAqIEBwYXJhbSBpc1VuaXF1ZSDmmK/lkKbllK/kuIDlsZXnpLog5LiN6L2u6K+i5pi+56S65Y6f55SfXHJcbiAgICAgKi9cclxuICAgIC8vIF9jcmVhdGVNaW5pR2FtZUluc2VydEFkKGlzVW5pcXVlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIC8vICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoaXNVbmlxdWUpIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja0luc2VydEFkU2hvdygpKSByZXR1cm47XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgdGhpcy5faXNJbnNlcnRTaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmICh1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnXHJcbiAgICAvLyAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmluc2VydElkKSB7XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgLy8gICAgICAgICAgICAgbGV0IF9pbnNlcnRBZCA9IHFnLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5pbnNlcnRJZFxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bCP5ri45oiP5o+S5bGPSUTvvJpcIiwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5pbnNlcnRJZCk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoX2luc2VydEFkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuazqOWGjOWwj+a4uOaIj+aPkuWxj+W5v+WRiuWbnuiwg++8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub25FcnJvcigoKGVycikgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2O5Li6IOWwj+a4uOaIj+aPkuWxj+W5v+WRiuWHuumUmTpcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNJbnNlcnRTaG93ICYmICFpc1VuaXF1ZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfc3R5bGVfbGV2ZWwpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2RbdGhpcy5pbnRlcnNpdGl0aWFsVHlwZSAtIDFdID09IDIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWOn+eUn+aPkuWxj++8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gPT0gMSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65Y6f55SfaWNvbu+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJkZWZhdWx0XCIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luc2VydFNob3cgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwuYmluZCh0aGlzKSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSB8fCAwKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrljp/nlJ9pY29u77yBXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmRXJyb3IoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgX2luc2VydEFkLm9uTG9hZCgoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiSHVhd2VpIOWwj+eoi+W6j+aPkuWxj+W5v+WRiuWKoOi9veaIkOWKnyFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0luc2VydFNob3cpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5zZXJ0U2hvdyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgX2luc2VydEFkLnNob3coKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAvL29uU2hvd1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnNlcnRTaG93ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1dGlscy5Ub29sX0h1YXdlaS5jb3VudEluc2VyU2hvd0NvdW50KCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRMYXN0U2hvd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZVR5cGUgPSB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX29wZW5fY2xvc2VfYmFubmVyO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlVHlwZSAmJiBjbG9zZVR5cGUgPiAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkh1YXdlaSDphY3nva7lvZPliY3mj5LlsY/mmL7npLrmiJDlip/lkI5cIiArIChjbG9zZVR5cGUgPT0gMSA/IFwi6ZSA5q+BXCIgOiBcIumakOiXj1wiKSArIFwiYmFubmVyIVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQub2ZmTG9hZCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBfaW5zZXJ0QWQub25DbG9zZSgoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5YWz6Zet5o+S5bGP5bm/5ZGK77yM5bGV56S6YmFubmVyXCIpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuU2hvd0Jhbm5lcigpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIH0pLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBfaW5zZXJ0QWQubG9hZCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoIV9pbnNlcnRBZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWnlsI/muLjmiI/mj5LlsY/lub/lkYrliJvlu7rlpLHotKXvvIFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJkZWZhdWx0XCIgJiYgIWlzVW5pcXVlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vmmL7npLrljp/nlJ/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkh1YXdlaSDlsI/muLjmiI/mj5LlsY/lub/lkYrphY3nva7kv6Hmga/plJnor68hXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJkZWZhdWx0XCIgJiYgIWlzVW5pcXVlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+aYvuekuuWOn+eUn+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgX2lzSW5zZXJ0TG9hZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2Nhbkluc2VydFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pbml0SW5zZXJ0QWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnNlcnRBZCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5pbnNlcnRJZCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydEFkID0gcWcuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmluc2VydElkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlsI/muLjmiI/mj5LlsY9JRO+8mlwiLCB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmluc2VydElkKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLms6jlhozlsI/muLjmiI/mj5LlsY/lub/lkYrlm57osIPvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQub25FcnJvcigoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2O5Li6IOWwj+a4uOaIj+aPkuWxj+W5v+WRiuWHuumUmTpcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuSW5zZXJ0U2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfc3R5bGVfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2RbdGhpcy5pbnRlcnNpdGl0aWFsVHlwZSAtIDFdID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWOn+eUn+aPkuWxj++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65Y6f55SfaWNvbu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgPT0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luc2VydFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLm5hdGl2ZUluc2VyQWREZWxheUNhbGwuYmluZCh0aGlzKSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrljp/nlJ9pY29u77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhbkluc2VydFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydEFkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQub25Mb2FkKCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWkg5bCP56iL5bqP5o+S5bGP5bm/5ZGK5Yqg6L295oiQ5YqfISAjX2Nhbkluc2VydFNob3c9XCIgKyB0aGlzLl9jYW5JbnNlcnRTaG93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnNlcnRMb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXRpbHMuVG9vbF9IdWF3ZWkuY291bnRJbnNlclNob3dDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuSW5zZXJ0U2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0TGFzdFNob3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VUeXBlID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9vcGVuX2Nsb3NlX2Jhbm5lcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZVR5cGUgJiYgY2xvc2VUeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWkg6YWN572u5b2T5YmN5o+S5bGP5pi+56S65oiQ5Yqf5ZCOXCIgKyAoY2xvc2VUeXBlID09IDEgPyBcIumUgOavgVwiIDogXCLpmpDol49cIikgKyBcImJhbm5lciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQub25DbG9zZSgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiaHVhd2VpIOWwj+eoi+W6j+aPkuWxj+W5v+WRiuWFs+mXrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luc2VydExvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuSW5zZXJ0U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9pbnNlcnRBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbnNlcnRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWnlsI/muLjmiI/mj5LlsY/lub/lkYrliJvlu7rlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Nhbkluc2VydFNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfc3R5bGVfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrljp/nlJ/mj5LlsY/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMubmF0aXZlSW5zZXJBZERlbGF5Q2FsbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9zdHlsZV9tb2RbdGhpcy5pbnRlcnNpdGl0aWFsVHlwZSAtIDFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65Y6f55SfaWNvbu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOYXRpdmVUcnlHYW1lV2lkZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnNlcnRTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5pi+56S65Y6f55Sf5o+S5bGP5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5uYXRpdmVJbnNlckFkRGVsYXlDYWxsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65Y6f55SfaWNvbu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW5JbnNlcnRTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkh1YXdlaSDlsI/muLjmiI/mj5LlsY/lub/lkYrphY3nva7kv6Hmga/plJnor68hXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlvlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYpdXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5JbnNlcnRTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0SW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgdGhpcy5faXNCYW5uZXJTaG93ID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcuYmFubmVySWQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkJhbm5lcklEIOacquato+ehrumFjee9ru+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHRvcCA9IHV0aWxzLlRvb2xfSHVhd2VpLlN5c0luZm8uc2FmZUFyZWEuaGVpZ2h0IC0gNTc7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJiYW5uZXIgID09PT09I3RvcD1cIiArIHV0aWxzLlRvb2xfSHVhd2VpLlN5c0luZm8uc2FmZUFyZWEuaGVpZ2h0ICsgXCIgI3RvcD1cIiArIHRvcCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gdGhpcy5odWF3ZWkuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcuYmFubmVySWQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzYwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rOo5YaM5bCP5ri45oiPYmFubmVy5Zue6LCDIVwiICsgdGhpcy5fYmFubmVyQWQgKyBcIiBpZD1cIiArIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcuYmFubmVySWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiaHVhd2Vp5bCP5ri45oiPQmFubmVy77yM5pi+56S65byC5bi477yaXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9zdHlsZV9tb2RbdGhpcy5iYW5uZXJUeXBlIC0gMV0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+Wxleekuum7mOiupGJhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJodWF3ZWnlsI/muLjmiI9CYW5uZXLvvIzliqDovb3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9iYW5uZXJBZC5vblNob3coKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwiaHVhd2VpIOWwj+a4uOaIj0Jhbm5lcuaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIH0pLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Jhbm5lckFkLm9uSGlkZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcImh1YXdlaSDlsI/muLjmiI9CYW5uZXIg5bm/5ZGK6ZqQ6JePXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2Jhbm5lckFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiaHVhd2VpIOWwj+a4uOaIj0Jhbm5lcuW5v+WRiuWIm+W7uuWksei0pSFcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbW9kW3RoaXMuYmFubmVyVHlwZSAtIDFdID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S66buY6K6kYmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUJhbm5lckFkKHRoaXMuX3Nob3dOYXRpdmVCYW5uZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfY3VyTmF0aXZlQmFubmVySW5mbzogYW55ID0ge307XHJcbiAgICBfY3JlYXRlTmF0aXZlQmFubmVyQWQoY29tcGxldGVDYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjb21wbGV0ZUNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImN1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXI6XCIgKyB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyICsgXCIgI2lkPVwiICsgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVCYW5uZXJJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcl0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5hdGl2ZUJhbm5lckFkID0gdGhpcy5fbmF0aXZlQmFubmVyQWRbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcl07XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVCYW5uZXJJZHNcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rljp/nlJ/lub/lkYpCYW5uZXLjgIIgcG9zSWQ6XCIgKyB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmF0aXZlQmFubmVyQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHBvc0lkOiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUJhbm5lcklkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyXVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVCYW5uZXJBZCA9IHRoaXMuaHVhd2VpLmNyZWF0ZU5hdGl2ZUFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlQmFubmVySWRzW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkTmF0aXZlQWQgbG9hZE5hdGl2ZUFkIDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZE5hdGl2ZUFkIGxvYWROYXRpdmVBZCBmYWlsOiBcIiArIGRhdGEgKyBcIixcIiArIGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkTmF0aXZlQWQgbG9hZE5hdGl2ZUFkIDogY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hdGl2ZUJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lckFkLnB1c2gobmF0aXZlQmFubmVyQWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlQmFubmVyQWQub25Mb2FkKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+S6hkJBTk5FUu+8jOS4jeWBmuS7u+S9leWkhOeQhu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5hZExpc3QgJiYgcmVzLmFkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRCYW5uZXJUaW1lclRhc2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK6LWE5rqQ5ouJ5Y+W5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5hZExpc3RbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5b2T5YmN5pi+56S65Li657uT566XYmFubmVyLOWImeS4jeWBmuaVsOaNrumqjOivgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja05hdGl2ZURhdGFWYWxpZChkYXRhKSB8fCB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5zaG93X3N0X2Jhbm5lciA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5Y6f55SfQmFubmVy5pWw5o2u77yaXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuU2hvd05hdGl2ZUJhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlQmFubmVyKG5hdGl2ZUJhbm5lckFkLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8ubmF0aXZlQmFubmVyQWQgPSBuYXRpdmVCYW5uZXJBZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ck5hdGl2ZUJhbm5lckluZm8uZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwi5bey57uP6ZqQ6JePYmFubmVy5LiN5Y+v6YeN5aSN5bGV56S6XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0Jhbm5lcuW5v+WRiui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyIDwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVCYW5uZXJJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK5p2h6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj7mnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwibmF0aXZlXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+W5v+WRiuadoe+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmL7npLroh6rlrprkuYliYW5uZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93UmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+OAgeWOn+eUn+W5v+WRiuadoemDveaXoOazleWxleekuu+8jOWxleekuuiHquWumuS5iWJhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVCYW5uZXJBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+S6hkJBTk5FUu+8jOS4jeWBmuS7u+S9leWkhOeQhu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55SfQmFubmVy5bm/5ZGK6LWE5rqQ5ouJ5Y+W5aSx6LSl77yBXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyIDwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVCYW5uZXJJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTmF0aXZlQmFubmVyQWQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlQmFubmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGK5p2h6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJJbmZvID0gdGhpcy5nZXROYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckluZm8uc3RfYmFubmVyX3Nob3dfYmFja191cCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj7mnI3liqHlmajphY3nva7kuI3mmL7npLrlpIfnlKjlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9zdHlsZV9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX3N0eWxlX21vZFt0aGlzLmJhbm5lclR5cGUgLSAxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S66buY6K6kYmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVCYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZC5pbmRleE9mKFwibmF0aXZlXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+W5v+WRiuadoe+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmL7npLroh6rlrprkuYliYW5uZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93UmVjb21tZW5kR2FtZXNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+OAgeWOn+eUn+W5v+WRiuadoemDveaXoOazleWxleekuu+8jOWxleekuuiHquWumuS5iWJhbm5lcmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIm5hdGl2ZUJhbm5lckFkIHJlTG9hZD4+XCIpO1xyXG4gICAgICAgICAgICAgICAgbmF0aXZlQmFubmVyQWQubG9hZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUJhbm5lcisrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlQmFubmVySWRzICYmIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPCB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUJhbm5lcklkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVCYW5uZXJBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVCYW5uZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lub/lkYrmnaHpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lckluZm8gPSB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVySW5mby5zdF9iYW5uZXJfc2hvd19iYWNrX3VwID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCI+Pj4+PuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuWkh+eUqOW5v+WRiu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX3N0eWxlX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfc3R5bGVfbW9kW3RoaXMuYmFubmVyVHlwZSAtIDFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrpu5jorqRiYW5uZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUJhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkLmluZGV4T2YoXCJuYXRpdmVcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5bGV56S65bCP5ri45oiP5bm/5ZGK5p2h77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lQmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuiHquWumuS5iWJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5bCP5ri45oiP44CB5Y6f55Sf5bm/5ZGK5p2h6YO95peg5rOV5bGV56S677yM5bGV56S66Ieq5a6a5LmJYmFubmVyYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZU5hdGl2ZUluc2VydEFkKGNvbXBsZXRlQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gY29tcGxldGVDYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJjdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJ0OlwiICsgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuYXRpdmVJbnNlcnRBZCA9IHRoaXMuX25hdGl2ZUluc2VydEFkW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcl07XHJcbiAgICAgICAgICAgIGlmICghbmF0aXZlSW5zZXJ0QWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUluc2VydElkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+aPkuWxj+W5v+WRiuOAgiBwb3NJZDpcIiArIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWQucHVzaChuYXRpdmVJbnNlcnRBZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVJbnNlcnREYXRhVmFsaWQoZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDkuI3lkIjms5XvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrotYTmupDlh7rplJnvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiumBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiui1hOa6kOaLieWPluWksei0pe+8gVwiICsgZXJyLmNvZGUgKyBlcnIubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5hdGl2ZUluc2VydEFkKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5o+S5bGP5bm/5ZGK6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX3N0eWxlX21vZFt0aGlzLmludGVyc2l0aXRpYWxUeXBlIC0gMV0gIT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+Wxleekuum7mOiupOaPkuWxj++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkID09IFwibmF0aXZlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WxleekuuWwj+a4uOaIj+aPkuWxj+W5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1pbmlHYW1lSW5zZXJ0QWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hdGl2ZUluc2VydEFkKSB7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIrKztcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUluc2VydElkcyAmJiB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVOYXRpdmVJbnNlcnRBZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Y6f55Sf5bm/5ZGK6YGN5Y6G5a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aPkuWxj+W5v+WRiumBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcIm5hdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlsZXnpLrlsI/muLjmiI/mj5LlsY/lub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNaW5pR2FtZUluc2VydEFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6f55Sf5bm/5ZGK5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gYXJncyBcclxuICAgICAqL1xyXG4gICAgZ2V0TmF0aXZlQWREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbmF0aXZlQWRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRPYmplY3QgPSBuZXcgWVpfTmF0aXZlQWRPYmplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWRPYmplY3QuX25hdGl2ZU9iaiA9IHRoaXMuX25hdGl2ZUFkO1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUFkT2JqZWN0LmRhdGEgPSB0aGlzLl9uYXRpdmVEYXRhO1xyXG4gICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLojrflj5bljp/nlJ/mlbDmja4gPj4+XCIsIHRoaXMuX25hdGl2ZURhdGEpXHJcblxyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5bu26L+f5Lik56eS6YeN5paw6K+35rGC5Y6f55Sf5bm/5ZGK5pWw5o2uXCIpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9jcmVhdGVOYXRpdmVBZChhcmdzKTtcclxuICAgICAgICAvLyB9LCAyMDAwKTtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlRGF0YSAmJiB0aGlzLl9uYXRpdmVBZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZUFkT2JqZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDliJvlu7rljZXkuKrljp/nlJ/lub/lkYpcclxuICAgIC8vICAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBjcmVhdGVOYXRpdmVBZChuYXRpdmVJdGVtPzogWVpfTmF0aXZlSXRlbSkge1xyXG4gICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJfY3JlYXRlTmF0aXZlQWQgPj4+Pj5cIik7XHJcbiAgICAvLyAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgLy8gICAgICAgICBpZiAobmF0aXZlSXRlbSkge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fY3VyTmF0aXZlSXRlbSA9IG5hdGl2ZUl0ZW07XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlOlwiICsgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSArIFwiICAjdGhpcy5fbmF0aXZlU2luZ2xlQWQubGVuZ3RoXCIgKyB0aGlzLl9uYXRpdmVTaW5nbGVBZC5sZW5ndGgpO1xyXG5cclxuICAgIC8vICAgICAgICAgbGV0IG5hdGl2ZVNpbmdsZUFkID0gdGhpcy5fbmF0aXZlU2luZ2xlQWRbdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZV07XHJcbiAgICAvLyAgICAgICAgIGlmICghbmF0aXZlU2luZ2xlQWQpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVTaW5nbGVBZElkc1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICYmIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlU2luZ2xlQWRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZV0pIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5bm/5ZGK44CCIHBvc0lkOlwiICsgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVTaW5nbGVBZElkc1t0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlXSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbmF0aXZlU2luZ2xlQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHBvc0lkOiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzW3RoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmVdXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChuYXRpdmVTaW5nbGVBZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVTaW5nbGVBZC5wdXNoKG5hdGl2ZVNpbmdsZUFkKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVNpbmdsZUFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5hZExpc3QgJiYgcmVzLmFkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiui1hOa6kOaLieWPluaIkOWKn++8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuYWRMaXN0WzBdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja05hdGl2ZURhdGFWYWxpZChkYXRhKSkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZURhdGEgPSBkYXRhO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZCA9IG5hdGl2ZVNpbmdsZUFkO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwiY2FsbGJhY2sgPj4+XCIsIGNhbGxiYWNrKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sodGhpcy5nZXROYXRpdmVBZERhdGEoKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOYXRpdmVBZCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiui1hOa6kOS4jeWQiOazle+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUrKztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlIDwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVTaW5nbGVBZElkcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZUFkKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhTaW5nbGVOYXRpdmUgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljZXkuKrljp/nlJ/lub/lkYpJROmBjeWOhuWujOavle+8jOaXoOazleWxleekuu+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBuYXRpdmVTaW5nbGVBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/ljZXkuKrlub/lkYrotYTmupDmi4nlj5blpLHotKXvvIFcIiArIGVyci5jb2RlICsgZXJyLm1zZyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlKys7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA8IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlU2luZ2xlQWRJZHMubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOYXRpdmVBZCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2V5Liq5Y6f55Sf5bm/5ZGKSUTpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgaWYgKG5hdGl2ZVNpbmdsZUFkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwibmF0aXZlU2luZ2xlQWQgcmVsb2FkXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgbmF0aXZlU2luZ2xlQWQubG9hZCgpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSsrO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlU2luZ2xlQWRJZHMgJiYgdGhpcy5fY3VyUG9zSWRJbmRleFNpbmdsZU5hdGl2ZSA8IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlU2luZ2xlQWRJZHMubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOYXRpdmVBZCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4U2luZ2xlTmF0aXZlID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2V5Liq5Y6f55Sf5bm/5ZGKSUQg6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65Y6f55SfYmFubmVy57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIF9zaG93TmF0aXZlQmFubmVyKG5hdGl2ZUJhbm5lckFkOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrljp/nlJ9iYW5uZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkgfHwgKCF0aGlzLl9uYXRpdmVCYW5uZXJOb2RlICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVCYW5uZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQmFubmVyTm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVCYW5uZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUucG9zaXRpb24gPSBDb21wYXRpYmxlVG9vbC5wb3NpdGlvbihjYy53aW5TaXplLndpZHRoIC8gMiwgdGhpcy5fbmF0aXZlQmFubmVyTm9kZS5oZWlnaHQgKiB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLnNjYWxlWSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQmFubmVyOiBZWl9OYXRpdmVCYW5uZXIgPSB0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmdldENvbXBvbmVudChcIllaX05hdGl2ZUJhbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlQmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUJhbm5lci5pbml0KG5hdGl2ZUJhbm5lckFkLCBkYXRhLCB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk5hdGl2ZUJhbm5lcue7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXJDYWxsQmFjayAmJiB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bm/5ZGKYmFubmVy5L2N5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65Y6f55Sf5o+S5bGP57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIF9zaG93TmF0aXZlSW5zZXJ0KG5hdGl2ZUluc2VydEFkOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoIWNjLmlzVmFsaWQodGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSkpIHx8ICF0aGlzLl9uYXRpdmVJbnNlcnROb2RlICYmIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65Y6f55Sf5o+S5bGP5bm/5ZGK5L2NXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUluc2VydE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlSW5zZXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVJbnNlcnROb2RlLnBvc2l0aW9uID0gQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9uYXRpdmVJbnNlcnROb2RlLCA5OTk5OTkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJbnNlcnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUluc2VydCA9IHRoaXMuX25hdGl2ZUluc2VydE5vZGUuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSW5zZXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYXRpdmVJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRTaG93Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnQuaW5pdChuYXRpdmVJbnNlcnRBZCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydExhc3RTaG93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXRpbHMuSHVhd2VpVG9vbC5jb3VudEluc2VyU2hvd0NvdW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/mmL7npLrmiJDlip/vvIzlvZPliY3mmL7npLrmrKHmlbA9XCIgKyB1dGlscy5IdWF3ZWlUb29sLmluc2VydEFkU2hvd0NvdW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZVR5cGUgPSB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX29wZW5fY2xvc2VfYmFubmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VUeXBlICYmIGNsb3NlVHlwZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIdWF3ZWkg6YWN572u5b2T5YmN5o+S5bGP5pi+56S65oiQ5Yqf5ZCOXCIgKyAoY2xvc2VUeXBlID09IDEgPyBcIumUgOavgVwiIDogXCLpmpDol49cIikgKyBcImJhbm5lciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJOYXRpdmVJbnNlcnTnu4Tku7bkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+W5v+WRiuaPkuWxj+S9jeayoeacieWIm+W7uu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFNob3dDbG9zZUJ0bkJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lLCBhcmdzOiBhbnkpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiU2hvd0Nsb3NlQnRuQmFubmVyID4+Pj4+Pj4+Pi5cIik7XHJcblxyXG4gICAgICAgIGxldCBpc01vdmVCdG4gPSAwO1xyXG4gICAgICAgIGxldCBmYWRlSW5UaW1lID0gMDtcclxuICAgICAgICBsZXQgYnRuOiBjYy5Ob2RlID0gYXJncy5jbG9zZUJ0bjtcclxuICAgICAgICBsZXQgd2luSGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGJ0bi5vcGFjaXR5ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pc19tb3ZlX2J0bikge1xyXG4gICAgICAgICAgICAgICAgaXNNb3ZlQnRuID0gdGhpcy5TZXJ2ZXJDb25maWcuaXNfbW92ZV9idG47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5jbG9zZV9idG5fZmFkZV9pbl90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICBmYWRlSW5UaW1lID0gdGhpcy5TZXJ2ZXJDb25maWcuY2xvc2VfYnRuX2ZhZGVfaW5fdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGlzTW92ZUJ0biA9PSAwID8gXCLmmL7npLpiYW5uZXIs5LiU5oyJ6ZKu5Zyo5LiK6Z2iXCIgOiBg5pi+56S6QmFubmVyLOaMiemSruWxheW6lemDqOS4lCR7aXNNb3ZlQnRufeavq+enkuWQjuenu+WKqGApO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW7tui/n+iwg+eUqOWFs+mXreaMiemSrueahEJhbm5lciA+Pj4+XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIobG9jYXRpb24sIGFyZ3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhZFkgPSAyNDA7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCd1dGlscyAtIGFkWTonICsgYWRZKTtcclxuICAgICAgICAgICAgICAgIGlmIChhZFkgPiAwICYmIGJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi55ID0gLSh3aW5IZWlnaHQgLyAyIC0gYWRZKSArIGJ0bi5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImJ0bkNsb3NlLnlcIiArIGJ0bi55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgaXNNb3ZlQnRuKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4zKSk7XHJcbiAgICAgICAgICAgIH0sIGZhZGVJblRpbWUgKiAxMDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIF9jaGVja05hdGl2ZUluc2VydERhdGFWYWxpZChkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YS50aXRsZSAmJiAoKGRhdGEuaWNvblVybExpc3QgJiYgZGF0YS5pY29uVXJsTGlzdC5sZW5ndGggPiAwKSB8fCAoZGF0YS5pbWdVcmxMaXN0ICYmIGRhdGEuaW1nVXJsTGlzdC5sZW5ndGggPiAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrTmF0aXZlRGF0YVZhbGlkKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJjaGVja05hdGl2ZURhdGFWYWxpZFwiKTtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5pbWdVcmxMaXN0ICYmIGRhdGEuaW1nVXJsTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEudGl0bGUgJiYgZGF0YS5kZXNjICYmIGRhdGEuY2xpY2tCdG5UeHQgJiYgKChkYXRhLmljb25VcmxMaXN0ICYmIGRhdGEuaWNvblVybExpc3QubGVuZ3RoID4gMCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5piv5ZCm5pi+56S65r+A5Yqx5o+S5bGPXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tSZXdhcmRJbnNlcnRJc1Nob3coKSB7XHJcbiAgICAgICAgLy8gbGV0IGp1bXBMaXN0ID0gdXRpbHMuZ2V0UmVjb21tb25kR2FtZUxpc3QoKTtcclxuICAgICAgICAvLyBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkpIHtcclxuICAgICAgICAvLyAgICAgaWYgKHV0aWxzLkh1YXdlaVRvb2xcclxuICAgICAgICAvLyAgICAgICAgICYmIHV0aWxzLkh1YXdlaVRvb2wuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgLy8gICAgICAgICAmJiB1dGlscy5IdWF3ZWlUb29sLlNlcnZlckNvbmZpZy5pc19yZXdhcmRfaW50ZXJzaXRpdGlhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAodXRpbHMuSHVhd2VpVG9vbC5TZXJ2ZXJDb25maWcuaXNfcmV3YXJkX2ludGVyc2l0aXRpYSA9PSBcInRydWVcIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICYmIGp1bXBMaXN0ICYmIGp1bXBMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx5o+S5bGP5pi+56S6546v5aKD6aqM6K+B6YCa6L+H77yBXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiaXNfcmV3YXJkX2ludGVyc2l0aXRpYSDlj4LmlbDkuLpmYWxzZe+8jOa/gOWKseaPkuWxj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwi6YWN572u5Lit5rKh5pyJaXNfcmV3YXJkX2ludGVyc2l0aXRpYeWPguaVsO+8jOa/gOWKseaPkuWxj+e7hOS7tue7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5bCP56iL5bqP6Lez6L2s77yBXCIpO1xyXG4gICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX3Jld2FyZEluc2VydE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuua/gOWKseaPkuWxj+e7hOS7tlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93UmV3YXJkSW5zZXJ0KCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJzaG93IHJld2FyZFwiKTtcclxuICAgICAgICAvLyBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gaWYgKCF0aGlzLmNoZWNrUmV3YXJkSW5zZXJ0SXNTaG93KCkpIHtcclxuICAgICAgICAvLyAgICAgc2VsZi5fdmlkZW9DYWxsYmFjayAmJiBzZWxmLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiu+8gVwiKTtcclxuICAgICAgICAvLyAgICAgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYgKCgoIWNjLmlzVmFsaWQodGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZSkpIHx8ICF0aGlzLl9yZXdhcmRJbnNlcnROb2RlKSAmJiB1dGlscy5jb25maWcub3RoZXJjb25maWcucmV3YXJkSW5zZXJ0KSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLliJvlu7rmv4DlirHmj5LlsY/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3Jld2FyZEluc2VydE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcucmV3YXJkSW5zZXJ0KTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZS5wb3NpdGlvbiA9IENvbXBhdGlibGVUb29sLnBvc2l0aW9uKGNjLndpblNpemUud2lkdGggLyAyLCBjYy53aW5TaXplLmhlaWdodCAvIDIpO1xyXG4gICAgICAgIC8vICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKHRoaXMuX3Jld2FyZEluc2VydE5vZGUsIDk5OTkpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLl9yZXdhcmRJbnNlcnROb2RlKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCByZXdhcmRJbnNlcnQ6IFJld2FyZEluc2VydCA9IHRoaXMuX3Jld2FyZEluc2VydE5vZGUuZ2V0Q29tcG9uZW50KFwiUmV3YXJkSW5zZXJ0XCIpO1xyXG4gICAgICAgIC8vICAgICBpZiAocmV3YXJkSW5zZXJ0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXdhcmRJbnNlcnQuaXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65r+A5Yqx5o+S5bGP57uE5Lu277yBXCIpO1xyXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlJld2FyZEluc2VydOe7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx5o+S5bGP5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVSZXdhcmRJbnNlcnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Jld2FyZEluc2VydE5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IHJld2FyZEluc2VydDogUmV3YXJkSW5zZXJ0ID0gdGhpcy5fcmV3YXJkSW5zZXJ0Tm9kZS5nZXRDb21wb25lbnQoXCJSZXdhcmRJbnNlcnRcIik7XHJcbiAgICAgICAgICAgIGlmIChyZXdhcmRJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgIHJld2FyZEluc2VydC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5r+A5Yqx5o+S5bGP57uE5Lu277yBXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlJld2FyZEluc2VydOe7hOS7tuS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx5o+S5bGP5rKh5pyJ5Yib5bu677yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgU2hvd1N0YXRlbWVudFJlY29tbWVudCgpOiBjYy5Ob2RlIHtcclxuICAgIC8vICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcblxyXG4gICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwiY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VydDpcIiwgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGxldCBuYXRpdmVJbnNlcnRBZCA9IHRoaXMuX25hdGl2ZUluc2VydEFkW3RoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcl07XHJcbiAgICAvLyAgICAgICAgIGlmICghbmF0aXZlSW5zZXJ0QWQpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNcclxuICAgIC8vICAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUluc2VydElkc1t0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXJdKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIm+W7uuWOn+eUn+e7k+eul+mhtemdouW5v+WRiuOAgiBwb3NJZDpcIiwgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBwb3NJZDogdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5uYXRpdmVJbnNlcnRJZHNbdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyXVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWQucHVzaChuYXRpdmVJbnNlcnRBZCk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbnNlcnRBZC5vbkxvYWQoKHJlcykgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0ICYmIHJlcy5hZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/ljp/nlJ/nu5PnrpfpobXpnaLotYTmupDmi4nlj5bmiJDlip/vvIFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmFkTGlzdFswXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tOYXRpdmVEYXRhVmFsaWQoZGF0YSkpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3Nob3dOYXRpdmVJbnNlcnQobmF0aXZlSW5zZXJ0QWQsIGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5jcmU7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+e7k+eul+mhtemdoui1hOa6kOS4jeWQiOazle+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+e7k+eul+mhtemdoui1hOa6kOWHuumUme+8gVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcisrO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/nu5PnrpfpobXpnaLpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+e7k+eul+mhtemdoui1hOa6kOaLieWPluWksei0pe+8gVwiLCBlcnIuY29kZSwgZXJyLm1zZyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIrKztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPCB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUluc2VydElkcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyUG9zSWRJbmRleE5hdGl2ZUluc2VyID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljp/nlJ/lub/lkYrpgY3ljoblrozmr5VcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf57uT566X6aG16Z2i6YGN5Y6G5a6M5q+V77yM5peg5rOV5bGV56S677yBXCIpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAobmF0aXZlSW5zZXJ0QWQpIHtcclxuICAgIC8vICAgICAgICAgICAgIG5hdGl2ZUluc2VydEFkLmxvYWQoKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlcisrO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzICYmIHRoaXMuX2N1clBvc0lkSW5kZXhOYXRpdmVJbnNlciA8IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLl9jdXJQb3NJZEluZGV4TmF0aXZlSW5zZXIgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRiumBjeWOhuWujOavlVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mj5LlsY/lub/lkYrpgY3ljoblrozmr5XvvIzml6Dms5XlsZXnpLrvvIFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc1Nob3dTdGF0ZW1lbnRBZCgpIHtcclxuICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkgJiYgdGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yMNuWFg+e0oOS6pOWPieaOqOW5v+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDliJvlu7rnu5PnrpfpobXpnaLmjqjlub/nu4Tku7ZcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93U3RhdGVtZW50UmVjb21tZW50KHNob3dOYXRpdmVBZDogYm9vbGVhbiA9IHRydWUpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0lzU2hvd1N0YXRlbWVudEFkKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2hvd05hdGl2ZUFkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5jcm9zc1dpZGdldDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5jcm9zc1dpZGdldDYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlj6rmmL7npLrnu5PnrpfkupLmjqjlub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyq5om+5Yiw6aKE5Yi25L2TIGNyb3NzV2lkZ2V0Niwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zdGF0ZW1lbnRSZWNvbW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zdGF0ZW1lbnRSZWNvbW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdGVtZW50UmVjb21tZW50OiBZWl9TdGF0ZW1lbnRSZWNvbW1lbnRBZCA9IG5vZGUuZ2V0Q29tcG9uZW50KFwiWVpfU3RhdGVtZW50UmVjb21tZW50QWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50UmVjb21tZW50LnNob3dOYXRpdmVBZCA9IHNob3dOYXRpdmVBZDtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S657uT566X5LqS5o6o5ZKM5Y6f55Sf5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyBTdGF0ZW1lbnRSZWNvbW1lbnQsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIF9zaG93TmF0aXZlQWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ck5hdGl2ZUl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyTmF0aXZlSXRlbS5pbml0KHRoaXMuZ2V0TmF0aXZlQWREYXRhKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsZXQgbmF0aXZlSXRlbTogWVpfTmF0aXZlSXRlbSA9IG5vZGUuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSXRlbVwiKTtcclxuICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwiU2hvd1NpbmdsZU5hdGl2ZUFkIDw8PDw8PDw8PFwiLCBuYXRpdmVJdGVtLCBcIj09PVwiLCByZXMpXHJcbiAgICAgICAgLy8gaWYgKG5hdGl2ZUl0ZW0pIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uue7k+eul+mhtemdouaOqOW5v+e7hOS7tlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd1NpbmdsZU5hdGl2ZUFkKCk6IGNjLk5vZGUge1xyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNpbmdsZU5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmdldE5hdGl2ZUFkRGF0YSgpKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNpbmdsZU5hdGl2ZUFkKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuYXRpdmVJdGVtOiBZWl9OYXRpdmVJdGVtID0gbm9kZS5nZXRDb21wb25lbnQoXCJZWl9OYXRpdmVJdGVtXCIpO1xyXG4gICAgICAgICAgICBuYXRpdmVJdGVtLnNob3dUeXBlID0gMjtcclxuICAgICAgICAgICAgdGhpcy5fY3VyTmF0aXZlSXRlbSA9IG5hdGl2ZUl0ZW07XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5jcmVhdGVOYXRpdmVBZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwiU2hvd1NpbmdsZU5hdGl2ZUFkIDw8PDw8PDw8PFwiLCBuYXRpdmVJdGVtLCBcIj09PVwiLCByZXMpXHJcbiAgICAgICAgICAgIC8vICAgICBpZiAobmF0aXZlSXRlbSkgbmF0aXZlSXRlbS5pbml0KHJlcywgMik7XHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl9uYXRpdmVBZE9iamVjdC5fbmF0aXZlQWREYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzdGF0ZW1lbnRSZWNvbW1lbnQubmF0aXZlRGF0YSA9IHRoaXMuX25hdGl2ZUFkT2JqZWN0Ll9uYXRpdmVBZERhdGE7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5o6o5bm/57uE5Lu2ID4+ICDljp/nlJ/lub/lkYrmlbDmja7kuI3lrZjlnKjvvIFcIik7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWNleS4quWOn+eUn+W5v+WRiuWIm+W7uuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fY3JlYXRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5Y2V5Liq5Y6f55Sf5bm/5ZGK5Yib5bu65aSx6LSl77yM5Y6f55Sf5bm/5ZGK5pWw5o2u5LiN5a2Y5ZyoXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyBzaW5nbGVOYXRpdmVBZCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnu5Pnrpflub/lkYpcclxuICAgICAqIEBwYXJhbSBkYXRhIOWPguaVsO+8miBjbG9zZUJ0bjpcclxuICAgICAqL1xyXG4gICAgc2hvd1N0YXRlbWVudEFkcyhkYXRhPzogYW55KTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gbGV0IHJlc3VsdDogYW55ID0geyBcInR5cGVcIjogMCwgXCJub2RlXCI6IG51bGwgfTtcclxuICAgICAgICAvLyBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuc3RhdGVtZW50X3R5cGUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IHR5cGUgPSB0aGlzLlNlcnZlckNvbmZpZy5zdGF0ZW1lbnRfdHlwZTtcclxuICAgICAgICAvLyAgICAgbGV0IHNwYXJlVHlwZSA9IHRoaXMuU2VydmVyQ29uZmlnLnN0X3NwYXJlX3R5cGU7XHJcbiAgICAgICAgLy8gICAgIGxldCBpc1N5Y24gPSB0aGlzLlNlcnZlckNvbmZpZy5zdF9zeW5jO1xyXG4gICAgICAgIC8vICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgIGxldCByZXNUeXBlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWPquaYvuekuuWwj+a4uOaIj+aPkuWxj+W5v+WRilwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbnNlcnRBZFNob3coKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoc3BhcmVUeXBlICYmIHNwYXJlVHlwZSA+IDApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3BhcmVUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWwj+a4uOaIj+aPkuWxj+i+vuWIsOmZkOWItueahOasoeaVsCA+PiDmmL7npLrlpIfnlKjnu4Tku7YgNuS4quS6kuaOqFwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudChmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1R5cGUgPSAxO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5bCP5ri45oiP5o+S5bGP6L6+5Yiw6ZmQ5Yi255qE5qyh5pWwID4+IOaYvuekuuWkh+eUqOe7hOS7tiDljZXkuKrljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTaW5nbGVOYXRpdmVBZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNUeXBlID0gMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWwj+a4uOaIj+aPkuWxj+i+vuWIsOmZkOWItueahOasoeaVsCA+PiDmmL7npLrlpIfnlKjnu4Tku7YgM+S4quS6kuaOqCvljZXkuKrljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTWluaUdhbWVJbnNlcnRBZCh0cnVlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDmmL7npLrmj5LlsY/lub/lkYrkuJTliKTmlq3kvJjlhYjnuqdcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrSW5zZXJ0QWRTaG93KCkpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHNwYXJlVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzcGFyZVR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5bCP5ri45oiP5o+S5bGP6L6+5Yiw6ZmQ5Yi255qE5qyh5pWwID4+IOaYvuekuuWkh+eUqOe7hOS7tiA25Liq5LqS5o6oXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U3RhdGVtZW50UmVjb21tZW50KGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlsI/muLjmiI/mj5LlsY/ovr7liLDpmZDliLbnmoTmrKHmlbAgPj4g5pi+56S65aSH55So57uE5Lu2IOWNleS4quWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1NpbmdsZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1R5cGUgPSAyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5bCP5ri45oiP5o+S5bGP6L6+5Yiw6ZmQ5Yi255qE5qyh5pWwID4+IOaYvuekuuWkh+eUqOe7hOS7tiAz5Liq5LqS5o6oK+WNleS4quWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlNob3dJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDmmL7npLrmj5LlsY/lub/lkYorNuS4quS6kuaOqFwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLlNob3dJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U3RhdGVtZW50UmVjb21tZW50KGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoaXNTeWNuICYmIGlzU3ljbiA9PSBcInRydWVcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuuaPkuWxj+W5v+WRiivljZXkuKrljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U2luZ2xlTmF0aXZlQWQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5TaG93U2luZ2xlTmF0aXZlQWQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlj6rmmL7npLrljZXkuKrljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJlc1R5cGUgPSAyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpc1N5Y24gJiYgaXNTeWNuID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5pi+56S65o+S5bGP5bm/5ZGKKyAz5Liq5LqS5o6oK+WNleS4quWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOWPquaYvuekuiAz5Liq5LqS5o6oK+WNleS4quWOn+eUn+W5v+WRilwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuU2hvd1N0YXRlbWVudFJlY29tbWVudCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoaXNTeWNuICYmIGlzU3ljbiA9PSBcInRydWVcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuua7muWKqOS6kuaOqCvljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQodHJ1ZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+W5v+WRiiA+PiDlj6rmmL7npLrmu5rliqjkupLmjqhcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLlNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpnZ7ms5XnmoTnu5Pnrpflub/lkYrnsbvlnovvvIzvvJpcIiArIHR5cGUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgcmVzdWx0LnR5cGUgPSByZXNUeXBlO1xyXG4gICAgICAgIC8vICAgICByZXN1bHQubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIumFjee9ruacquWIneWni+WMluOAgeaIluiAheayoeaciemFjee9rue7k+eul+W5v+WRiu+8gVwiKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Z1bGxTY3JlZW5WaWRlbygpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgR2FtZUV4aXQoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgU2hhcmUoKSB7IH1cclxufVxyXG4iXX0=