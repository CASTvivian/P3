"use strict";
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