
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentQQ.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6cb5aEWJx5EW7q8x7AowbbW', 'AdAgentQQ');
// common-plugin/Scripts/AdAgentQQ.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentQQ = /** @class */ (function (_super) {
    __extends(AdAgentQQ, _super);
    function AdAgentQQ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._curBannerAd = null;
        _this._videoAd = null;
        _this._insertAd = null;
        _this._oldAd = null;
        _this._appBox = null; //游戏盒子广告
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._isVideoShow = false;
        //@ts-ignore
        _this.qq = window.qq;
        _this._bannerShow = false;
        _this._bannerSizePercent = 0.5;
        _this._bannerBottom = 0;
        _this._oldBannerLocation = YZ_Constant_1.BannerLocation.None;
        _this._curBannerHeight = 240;
        _this._moveBtn = null;
        _this._cur_level = null;
        _this._showBannerTimerId = 0;
        _this._isShow = false;
        _this._blockAd = null;
        return _this;
    }
    AdAgentQQ.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsQQ) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._sysData = Utils_1.utils.Tool_QQ.getSystemInfo();
                _this._initVideoAd();
            }, this);
        }
    };
    Object.defineProperty(AdAgentQQ.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.Tool_QQ.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    // /**
    //  * 初始化游戏盒子
    //  */
    // _initAppBox() {
    //     let checkVersion: boolean = utils.Tool_QQ.isOverMinVersion("1.7.1");
    //     if (checkVersion) {
    //         this._appBox = qq.createAppBox({
    //             adUnitId: utils.config.qqconfig.appBoxId
    //         });
    //         this._appBox.load().then(() => {
    //             utils.showLog("游戏盒子加载成功！")
    //         }).catch(() => {
    //             utils.showLog("游戏盒子加载失败！");
    //         });
    //     } else {
    //         cc.warn("当前基础库版本低于1.7.1，不显示盒子广告");
    //     }
    // }
    AdAgentQQ.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            Utils_1.utils.showLog("初始化视频!");
            if (!Utils_1.utils.config.qqconfig.videoId) {
                Utils_1.utils.showLog("视频ID配置错误!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            // if (!utils.Tool_QQ.isOverMinVersion("0.1.26")) {
            //     utils.showLog("当前版本不支持视频广告!");
            //     if (this._videoCallback) {
            //         this._videoCallback(false, "暂无视频广告!");
            //         this._videoCallback = null;
            //     }
            //     return;
            // }
            Utils_1.utils.showLog("视频广告ID:", Utils_1.utils.config.qqconfig.videoId.trim());
            this._videoAd = this.qq.createRewardedVideoAd({
                adUnitId: Utils_1.utils.config.qqconfig.videoId
            });
            if (this._videoAd) {
                Utils_1.utils.showLog("初始化注册视频回调!");
                this._videoAd.onLoad(function () {
                    Utils_1.utils.showLog("激励视频加载成功");
                    _this._isVideoLoaded = true;
                    if (_this._isVideoShow) {
                        _this._videoAd.show().then(function () {
                        }).catch(function () {
                            Utils_1.utils.showLog("视频播放失败！");
                            if (_this._videoCallback) {
                                _this._videoCallback("暂无视频广告!");
                                _this._videoCallback = null;
                            }
                        });
                    }
                });
                this._videoAd.onError(function (err) {
                    Utils_1.utils.showLog("激励视频加载失败!", err.code, err.msg);
                    _this._isVideoLoaded = false;
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "暂无视频广告!");
                        _this._videoCallback = null;
                    }
                });
                this._videoAd.onClose(function (res) {
                    _this._isVideoShow = false;
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        Utils_1.utils.showLog('激励视频广告完成，发放奖励');
                        if (_this._videoCallback) {
                            _this._videoCallback(true, "");
                            _this._videoCallback = null;
                        }
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        Utils_1.utils.showLog('激励视频广告取消关闭，不发放奖励');
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "观看完视频才能获得奖励!");
                            _this._videoCallback = null;
                        }
                    }
                });
            }
            else {
                Utils_1.utils.showLog("激励视频初始化失败!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            }
        }
    };
    AdAgentQQ.prototype._createBanner = function (location, args) {
        var _this = this;
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsQQ) {
            if (!Utils_1.utils.config.qqconfig.bannerId) {
                Utils_1.utils.showLog("banner广告ID不存在");
                return;
            }
            var argsTmp = args;
            this._bannerShow = false;
            if (argsTmp && argsTmp.width) {
                this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
                this._bannerSizePercent = argsTmp.width > 1 ? 1 : this._bannerSizePercent;
            }
            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                this._bannerBottom = this._bannerBottom < 0 ? 0 : this._bannerBottom;
                this._bannerBottom = this._bannerBottom > this._sysData.screenHeight ? this._sysData.screenHeight : this._bannerBottom;
            }
            // IOS平台不支持onResize更改尺寸，所以这里宽度固定最小值
            // let width = this._sysData.screenWidth * this._bannerSizePercent;
            var width = 300;
            var height = 72;
            var left = (this._sysData.screenWidth - width) / 2;
            var top = this._sysData.screenHeight - height - this._bannerBottom;
            var params = {
                adUnitId: Utils_1.utils.config.qqconfig.bannerId,
                style: {
                    left: left,
                    width: width,
                    top: top,
                    height: height,
                }
            };
            var bannerAd_1 = null;
            var oldBannerAd_1 = this._curBannerAd;
            bannerAd_1 = this.qq.createBannerAd(params);
            Utils_1.utils.showLog("bannerAd ", bannerAd_1);
            if (bannerAd_1) {
                bannerAd_1.onError(function (err) {
                    Utils_1.utils.showLog("广告条加载失败! ", JSON.stringify(err));
                    _this._bannerShow = false;
                    // if (location == BannerLocation.Game && this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "1") {
                    //     utils.showLog("服务器配置banner广告优先级为默认banner，游戏页面备用显示积木广告！");
                    //     this.showBlockAd({ bottom: 0 });
                    // }
                });
                bannerAd_1.onLoad(function () {
                    if (_this._bannerShow) {
                        return;
                    }
                    _this._bannerShow = true;
                    try {
                        bannerAd_1.show().then(function () {
                            Utils_1.utils.showLog("Banner广告显示成功!");
                            if (_this.ServerConfig.banner_move_btn_interval && _this._cur_level && _this._cur_level % _this.ServerConfig.banner_move_btn_interval == 0) {
                                _this.moveBtnToBannerTop();
                            }
                            if (oldBannerAd_1) {
                                oldBannerAd_1.destroy();
                            }
                            _this._curBannerAd = bannerAd_1;
                        }).catch(function (err) {
                            Utils_1.utils.showLog("Banner广告出错", JSON.stringify(err));
                            _this._bannerShow = false;
                        });
                    }
                    catch (error) {
                        if (_this.ServerConfig.banner_move_btn_interval && _this._cur_level && _this._cur_level % _this.ServerConfig.banner_move_btn_interval == 0) {
                            _this.moveBtnToBannerTop();
                        }
                        Utils_1.utils.showLog("Banner ad Show erro", error);
                    }
                });
                bannerAd_1.onResize(function (res) {
                    if (res) {
                        _this._curBannerHeight = res.height * _this._sysData.pixelRatio;
                    }
                });
            }
        }
    };
    AdAgentQQ.prototype._showBannerTimer = function (location, args) {
        var _this = this;
        var locationTmp = location;
        var argsTmp = args;
        Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544Axxx\uFF01location:" + locationTmp + "; \u95F4\u9694\u65F6\u95F4:" + Utils_1.utils.Tool_QQ.ServerConfig.refresh_ad_time + ":\u4F18\u5148\u7EA7\uFF1A" + this.ServerConfig.banner_first_ad);
        // if (this.ServerConfig.banner_first_ad) {
        //     switch (this.ServerConfig.banner_first_ad) {
        //         case "default":
        //             this._createBanner(locationTmp, argsTmp);
        //             break;
        //         case "box":
        //             if (!utils.Tool_QQ.isOverMinVersion("1.15.0")) {
        //                 utils.showLog("当前版本不支持积木广告，显示默认banner");
        //                 this._createBanner(locationTmp, argsTmp);
        //                 return;
        //             }
        //             this.showBlockAd();
        //             break;
        //         // case "3":
        //         //     this._createBanner(locationTmp, argsTmp);
        //         //     this.showBlockAd();
        //         //     break;
        //     }
        // } else {
        var banner_delay_time = this.ServerConfig.banner_delay_time ? this.ServerConfig.banner_delay_time : 0;
        Utils_1.utils.showLog("\u5EF6\u8FDF" + banner_delay_time + "\u79D2\u663E\u793Abanner");
        if (!this.ServerConfig.banner_move_btn_interval || !this._cur_level || this._cur_level % this.ServerConfig.banner_move_btn_interval != 0) {
            Utils_1.utils.showLog("当前关卡不做延迟移动！");
            this.moveBtnToBannerTop();
        }
        this._showBannerTimerId = setTimeout(function () {
            _this._createBanner(locationTmp, argsTmp);
        }, banner_delay_time * 1000);
        // }
    };
    AdAgentQQ.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsQQ) {
            if (Utils_1.utils.Tool_QQ.ServerConfig) {
                var locationTmp = location;
                var argsTmp = args;
                this._moveBtn = args ? args.moveBtn : null;
                this._cur_level = args ? args.cur_level : null;
                this._showBannerTimer(locationTmp, argsTmp);
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentQQ.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsQQ) {
            Utils_1.utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            if (this._curBannerAd) {
                this._curBannerAd.hide();
            }
        }
    };
    AdAgentQQ.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsQQ) {
            this._videoCallback = callback;
            this._isVideoShow = true;
            if (!this._videoAd) {
                this._initVideoAd();
            }
            else {
                this._videoAd.show().then(function () {
                    Utils_1.utils.showLog("视频显示成功！");
                }).catch(function (err) {
                    Utils_1.utils.showLog("视频未加载！");
                    _this._videoAd.load();
                });
            }
        }
    };
    /**
     * 显示插屏
     * 2001	触发频率限制	小程序启动一定时间内不允许展示插屏广告
     * 2002	触发频率限制	距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告
     * 2003	触发频率限制	当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告
     * 2004	广告渲染失败	该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败
     * 2005	广告调用异常	插屏广告实例不允许跨页面调用
     * 销毁插屏广告后才能重新创建
     * @param location
     */
    AdAgentQQ.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsQQ) {
            if (!Utils_1.utils.Tool_QQ.isOverMinVersion("1.12.0")) {
                Utils_1.utils.showLog("当前版本" + Utils_1.utils.Tool_QQ._sysInfo.SDKVersion + "不支持插屏广告和盒子广告!");
                return;
            }
            if (this.ServerConfig) {
                if (this.ServerConfig.intersititial_first_ad) {
                    Utils_1.utils.showLog("\u670D\u52A1\u5668\u63D2\u5C4F\u4F18\u5148\u7EA7>>>" + this.ServerConfig.intersititial_first_ad);
                    switch (this.ServerConfig.intersititial_first_ad) {
                        case "default":
                            Utils_1.utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            break;
                        case "box":
                            if (!Utils_1.utils.Tool_QQ.isOverMinVersion("1.7.1")) {
                                Utils_1.utils.showLog("当前版本" + Utils_1.utils.Tool_QQ._sysInfo.SDKVersion + "不支持盒子广告,显示插屏");
                                Utils_1.utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                                return;
                            }
                            Utils_1.utils.delayCall(this.ShowAppBox.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            break;
                        case "onlydefault":
                            Utils_1.utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            break;
                    }
                }
                else {
                    Utils_1.utils.showLog("服务器未配置优先级，显示默认插屏");
                    Utils_1.utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                }
            }
        }
    };
    AdAgentQQ.prototype._createInsterstitial = function () {
        var _this = this;
        Utils_1.utils.showLog("_createInsterstitial >>> 222");
        // if (this._insertAd) {
        //     this._insertAd.destroy();
        // }
        // let insertId;
        if (!this._insertAd) {
            this._insertAd = this.qq.createInterstitialAd({ adUnitId: Utils_1.utils.config.qqconfig.insertId });
            this._insertAd.onError(function (err) {
                switch (err.errCode) {
                    case 2001:
                        Utils_1.utils.showLog("小程序启动一定时间内不允许展示插屏广告");
                        break;
                    case 2002:
                        Utils_1.utils.showLog("距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告");
                        break;
                    case 2003:
                        Utils_1.utils.showLog("当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告");
                        break;
                    case 2004:
                        Utils_1.utils.showLog("该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败");
                        break;
                    case 2005:
                        Utils_1.utils.showLog("插屏广告实例不允许跨页面调用");
                        break;
                    default:
                        Utils_1.utils.showLog("插屏加载失败! ", JSON.stringify(err));
                        break;
                }
                if (_this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "default") {
                    Utils_1.utils.showLog("优先显示的是插屏广告，备用显示盒子广告！");
                    var show_level = _this.ServerConfig.insert_show_appBox_level ? _this.ServerConfig.insert_show_appBox_level : 0;
                    if (Utils_1.utils.currentLevel > show_level) {
                        _this.ShowAppBox();
                    }
                    else {
                        Utils_1.utils.showLog("备用显示盒子广告未达到关卡限制要求");
                    }
                }
            });
            // this._insertAd.onLoad(() => {
            //     utils.showLog("插屏加载成功! ");
            // })
            this._insertAd.onClose(function () {
                Utils_1.utils.showLog("插屏广告关闭成功！");
            });
        }
        if (this._insertAd) {
            this._insertAd.load().then(function () {
                Utils_1.utils.showLog("插屏加载成功! ");
                _this._insertAd.show().then(function () {
                    Utils_1.utils.showLog("插屏广告显示成功!");
                }).catch(function (err) {
                    Utils_1.utils.showLog("插屏广告出错", JSON.stringify(err));
                });
            }).catch(function () {
                Utils_1.utils.showLog("插屏加载失败! ");
            });
            if (!this._isShow) {
                this._insertAd.show().then(function () {
                    Utils_1.utils.showLog("插屏广告显示成功!");
                }).catch(function (err) {
                    Utils_1.utils.showLog("插屏广告出错", JSON.stringify(err));
                });
                this._isShow = true;
            }
        }
    };
    /**
     * 显示游戏盒子
     */
    AdAgentQQ.prototype.ShowAppBox = function (isMoreGame) {
        var _this = this;
        if (PlatUtils_1.default.IsQQ) {
            if (!Utils_1.utils.Tool_QQ.isOverMinVersion("1.7.1")) {
                Utils_1.utils.showLog("当前版本" + Utils_1.utils.Tool_QQ._sysInfo.SDKVersion + "不支持游戏盒子!");
                return;
            }
            Utils_1.utils.showLog(">>>>>ShowAppBox");
            if (this._appBox) {
                this._appBox.destroy().then(function () {
                    Utils_1.utils.showLog("游戏盒子id为:", Utils_1.utils.config.qqconfig.boxId);
                    _this._appBox = _this.qq.createAppBox({
                        adUnitId: Utils_1.utils.config.qqconfig.boxId
                    });
                    _this._appBox.load().then(function () {
                        Utils_1.utils.showLog("游戏盒子加载成功！");
                        _this._appBox.show().then(function () {
                            Utils_1.utils.showLog("游戏盒子显示成功！");
                        }).catch(function (err) {
                            Utils_1.utils.showLog("游戏盒子未加载！#err=", JSON.stringify(err));
                        });
                    }).catch(function (err) {
                        Utils_1.utils.showLog("游戏盒子加载失败！ #err=", JSON.stringify(err));
                        if (!isMoreGame && _this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "box") {
                            Utils_1.utils.showLog("优先显示的是盒子广告，备用显示插屏");
                            _this._createInsterstitial();
                        }
                    });
                }).catch(function (err) {
                    Utils_1.utils.showLog("游戏盒子销毁失败！ #err=", JSON.stringify(err));
                });
                ;
            }
            else {
                Utils_1.utils.showLog("游戏盒子id为:", Utils_1.utils.config.qqconfig.boxId);
                this._appBox = this.qq.createAppBox({
                    adUnitId: Utils_1.utils.config.qqconfig.boxId
                });
                this._appBox.load().then(function () {
                    Utils_1.utils.showLog("游戏盒子加载成功！");
                    _this._appBox.show().then(function () {
                        Utils_1.utils.showLog("游戏盒子显示成功！");
                    }).catch(function (err) {
                        Utils_1.utils.showLog("游戏盒子未加载！#err=", JSON.stringify(err));
                    });
                }).catch(function (err) {
                    Utils_1.utils.showLog("游戏盒子加载失败！ #err=", JSON.stringify(err));
                    if (!isMoreGame && _this.ServerConfig.intersititial_first_ad && _this.ServerConfig.intersititial_first_ad == "box") {
                        Utils_1.utils.showLog("优先显示的是盒子广告，备用显示插屏");
                        _this._createInsterstitial();
                    }
                });
            }
        }
    };
    /**
     * 隐藏游戏盒子
     */
    AdAgentQQ.prototype.HideAppbox = function () {
        if (PlatUtils_1.default.IsQQ) {
            if (this._appBox) {
                this._appBox.destroy().then(function () {
                    Utils_1.utils.showLog("游戏盒子销毁成功！");
                }).catch(function () {
                    cc.warn("游戏盒子销毁失败!");
                });
            }
        }
    };
    /**
      * 显示积木广告
      */
    AdAgentQQ.prototype.showBlockAd = function (parme) {
        var _this = this;
        if (!this.ServerConfig) {
            Utils_1.utils.showLog("组件未初始化！");
            return;
        }
        if (!Utils_1.utils.config.qqconfig.bannerBoxId) {
            Utils_1.utils.showLog("积木广告ID不存在");
            return;
        }
        if (this.ServerConfig.is_banner_box == "false") {
            Utils_1.utils.showLog("服务器配置积木广告不展示！");
            return;
        }
        if (this._blockAd) {
            this._blockAd.offLoad();
            this._blockAd.offResize();
            this._blockAd.offError();
            this._blockAd.destroy();
        }
        if (PlatUtils_1.default.IsIOS && this._sysData.screenHeight < 736) {
            var top = 16;
            var left_1 = 16;
            var width_1 = 65;
            if (parme.top) {
                // top = parme.top
                top = parme.top / cc.winSize.height * this._sysData.screenHeight;
            }
            else {
                // top = this._sysData.screenHeight - 65.5 - parme.bottom
                top = this._sysData.screenHeight - 65.5 - parme.bottom / cc.winSize.height * this._sysData.screenHeight;
            }
            this._blockAd = this.qq.createBlockAd({
                adUnitId: Utils_1.utils.config.qqconfig.bannerBoxId,
                style: {
                    left: left_1,
                    top: top
                },
                size: parme.showNum ? parme.showNum : 5,
                orientation: "landscape"
            });
            this._blockAd.onResize(function (res) {
                _this._blockAd.offResize();
                Utils_1.utils.showLog("this._sysData", JSON.stringify(_this._sysData));
                Utils_1.utils.showLog("onresize >>", JSON.stringify(res));
                _this._blockAd.show().then(function () {
                    Utils_1.utils.showLog("显示成功！");
                }).catch(function (res) {
                    Utils_1.utils.showLog("显示异常", JSON.stringify(res));
                });
                if (parme.showNum == 1) {
                    width_1 = 0;
                }
                else {
                    width_1 = res.width;
                }
                if (parme.left) {
                    // left = width + parme.left;
                    left_1 = parme.left / cc.winSize.width * _this._sysData.screenWidth;
                }
                else if (parme.right) {
                    left_1 = _this._sysData.screenWidth - res.width - parme.right / cc.winSize.width * _this._sysData.screenWidth;
                }
                else {
                    left_1 = (_this._sysData.screenWidth - width_1) / 2;
                }
                _this._blockAd.style.left = left_1;
                Utils_1.utils.showLog("onresize end>>", _this._blockAd.style.top, "<<", _this._blockAd.style.left, "<<");
            });
        }
        else {
            this._blockAd = this.qq.createBlockAd({
                adUnitId: Utils_1.utils.config.qqconfig.bannerBoxId,
                style: {
                    left: 16,
                    top: 16
                },
                size: parme.showNum ? parme.showNum : 5,
                orientation: "landscape"
            });
            // if (parme.top) {
            //     console.log("实际位置:", parme.top / cc.winSize.height * this._sysData.screenHeight, cc.winSize.height, parme.top)
            // }
            // else if (parme.bottom) {
            //     console.log("实际位置:", this._sysData.screenHeight - 60 - parme.bottom / cc.winSize.height * this._sysData.screenHeight,cc.winSize.height,parme.bottom)
            // }
            this._blockAd.onResize(function (res) {
                _this._blockAd.offResize();
                Utils_1.utils.showLog("this._sysData", JSON.stringify(_this._sysData));
                Utils_1.utils.showLog("onresize >>", JSON.stringify(res));
                if (parme) {
                    Utils_1.utils.showLog("parme:" + JSON.stringify(parme));
                    if (parme.top) {
                        Utils_1.utils.showLog("积木广告TOP位置：", parme.top);
                        _this._blockAd.style.top = parme.top / cc.winSize.height * _this._sysData.screenHeight;
                    }
                    else if (parme.bottom) {
                        // let bottom = this._sysData.screenHeight - res.height;
                        // this._blockAd.style.top = bottom - parme.bottom;
                        _this._blockAd.style.top = _this._sysData.screenHeight - res.height - parme.bottom / cc.winSize.height * _this._sysData.screenHeight;
                    }
                    if (parme.left) {
                        // this._blockAd.style.left = parme.left;
                        _this._blockAd.style.left = parme.left / cc.winSize.width * _this._sysData.screenWidth;
                    }
                    else if (parme.right) {
                        // this._blockAd.style.left = this._sysData.screenWidth - res.width - parme.right;
                        _this._blockAd.style.left = _this._sysData.screenWidth - res.width - parme.right / cc.winSize.width * _this._sysData.screenWidth;
                    }
                    else {
                        _this._blockAd.style.left = (_this._sysData.screenWidth - res.width) / 2;
                    }
                }
                else {
                    _this._blockAd.style.top = _this._sysData.screenHeight - res.height;
                    _this._blockAd.style.left = (_this._sysData.screenWidth - res.width) / 2;
                }
                _this._blockAd.show().then(function () {
                    Utils_1.utils.showLog("显示成功！");
                }).catch(function (res) {
                    Utils_1.utils.showLog("显示异常", JSON.stringify(res));
                });
                Utils_1.utils.showLog("onresize end>>", _this._blockAd.style.top, "<<", _this._blockAd.style.left, "<<");
            });
        }
        this._blockAd.onLoad(function () {
            Utils_1.utils.showLog("积木广告加载成功！");
        });
        this._blockAd.onError(function (res) {
            Utils_1.utils.showLog("积木广告加载失败！", res.errMsg, ">>", res.errCode);
        });
    };
    /**
     * 隐藏积木广告
     */
    AdAgentQQ.prototype.hideBlockAd = function () {
        Utils_1.utils.showLog("隐藏积木广告");
        if (this._blockAd)
            this._blockAd.hide();
    };
    AdAgentQQ.prototype.moveBtnToBannerTop = function () {
        var _this = this;
        Utils_1.utils.showLog("moveBtnToBannerTop >>>>>>>>>.");
        if (this.ServerConfig && this._moveBtn && cc.isValid(this._moveBtn)) {
            var moveBtnTime = 0;
            var btn_1 = this._moveBtn;
            if (this.ServerConfig.banner_move_btn_interval && this._cur_level && this._cur_level % this.ServerConfig.banner_move_btn_interval == 0) {
                if (this.ServerConfig.banner_move_btn_time) {
                    moveBtnTime = this.ServerConfig.banner_move_btn_time;
                }
            }
            Utils_1.utils.showLog(moveBtnTime == 0 ? "按钮直接显示在banner上面" : "\u6309\u94AE\u5C45\u5E95\u90E8\u4E14" + moveBtnTime + "\u79D2\u540E\u79FB\u52A8");
            setTimeout(function () {
                if (btn_1 && cc.isValid(btn_1)) {
                    if (_this._sysData.screenHeight < 600) {
                        btn_1.getComponent(cc.Widget).bottom = 250;
                    }
                    else {
                        btn_1.getComponent(cc.Widget).bottom = 220;
                    }
                    btn_1.getComponent(cc.Widget).updateAlignment();
                }
            }, moveBtnTime * 1000);
        }
    };
    AdAgentQQ = __decorate([
        ccclass
    ], AdAgentQQ);
    return AdAgentQQ;
}(AdAgent_1.default));
exports.default = AdAgentQQ;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFFRLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyw2Q0FBK0M7QUFDL0MseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBTztJQUE5QztRQUFBLHFFQXVyQkM7UUFyckJHLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsa0JBQVksR0FBUSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsYUFBTyxHQUFRLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFFN0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBWTtRQUNaLFFBQUUsR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDO1FBb0hwQixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3Qix3QkFBa0IsR0FBVyxHQUFHLENBQUM7UUFDakMsbUJBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsd0JBQWtCLEdBQW1CLDRCQUFjLENBQUMsSUFBSSxDQUFDO1FBRXpELHNCQUFnQixHQUFXLEdBQUcsQ0FBQztRQUUvQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVEsSUFBSSxDQUFDO1FBdUl2Qix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUE0Ri9CLGFBQU8sR0FBWSxLQUFLLENBQUM7UUE0SnpCLGNBQVEsR0FBUSxJQUFJLENBQUM7O0lBK0t6QixDQUFDO0lBenFCVSx3QkFBSSxHQUFY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SUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDeEMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUM7aUJBQ3hEO2FBQ0o7WUFFRCxhQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyx5Q0FBUyxXQUFXLDZCQUFNLENBQUMsQ0FBQztZQUNqRixVQUFVLENBQUM7Z0JBQ1AsSUFBSSxLQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFHLENBQUMsRUFBRTtvQkFDeEIsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7d0JBQ2xDLEtBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7cUJBQzVDO3lCQUFNO3dCQUNILEtBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7cUJBQzVDO29CQUNELEtBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUNqRDtZQUNMLENBQUMsRUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBcnJCZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXVyQjdCO0lBQUQsZ0JBQUM7Q0F2ckJELEFBdXJCQyxDQXZyQnNDLGlCQUFPLEdBdXJCN0M7a0JBdnJCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZEFnZW50IGZyb20gXCIuL0FkQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRBZ2VudFFRIGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgX3N5c0RhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfY3VyQmFubmVyQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9BZDogYW55ID0gbnVsbDtcclxuICAgIF9pbnNlcnRBZDogYW55ID0gbnVsbDtcclxuICAgIF9vbGRBZDogYW55ID0gbnVsbDtcclxuICAgIF9hcHBCb3g6IGFueSA9IG51bGw7IC8v5ri45oiP55uS5a2Q5bm/5ZGKXHJcblxyXG4gICAgX3ZpZGVvQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIF9pc1ZpZGVvTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNWaWRlb1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcXE6IGFueSA9IHdpbmRvdy5xcTtcclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNRUSkge1xyXG4gICAgICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zeXNEYXRhID0gdXRpbHMuVG9vbF9RUS5nZXRTeXN0ZW1JbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0VmlkZW9BZCgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5Ub29sX1FRLlNlcnZlckNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOWIneWni+WMlua4uOaIj+ebkuWtkFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBfaW5pdEFwcEJveCgpIHtcclxuICAgIC8vICAgICBsZXQgY2hlY2tWZXJzaW9uOiBib29sZWFuID0gdXRpbHMuVG9vbF9RUS5pc092ZXJNaW5WZXJzaW9uKFwiMS43LjFcIik7XHJcbiAgICAvLyAgICAgaWYgKGNoZWNrVmVyc2lvbikge1xyXG4gICAgLy8gICAgICAgICB0aGlzLl9hcHBCb3ggPSBxcS5jcmVhdGVBcHBCb3goe1xyXG4gICAgLy8gICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5hcHBCb3hJZFxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgdGhpcy5fYXBwQm94LmxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuLjmiI/nm5LlrZDliqDovb3miJDlip/vvIFcIilcclxuICAgIC8vICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua4uOaIj+ebkuWtkOWKoOi9veWksei0pe+8gVwiKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgY2Mud2FybihcIuW9k+WJjeWfuuehgOW6k+eJiOacrOS9juS6jjEuNy4x77yM5LiN5pi+56S655uS5a2Q5bm/5ZGKXCIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBfaW5pdFZpZGVvQWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJbop4bpopEhXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy5xcWNvbmZpZy52aWRlb0lkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKRSUTphY3nva7plJnor68hXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoIXV0aWxzLlRvb2xfUVEuaXNPdmVyTWluVmVyc2lvbihcIjAuMS4yNlwiKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeW5v+WRiklEOlwiLCB1dGlscy5jb25maWcucXFjb25maWcudmlkZW9JZC50cmltKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkID0gdGhpcy5xcS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy52aWRlb0lkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJbms6jlhozop4bpopHlm57osIMhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1ZpZGVvU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeaSreaUvuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeWKoOi9veWksei0pSFcIiwgZXJyLmNvZGUsIGVyci5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmv4DlirHop4bpopHlub/lkYrlrozmiJDvvIzlj5HmlL7lpZblirEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmv4DlirHop4bpopHlub/lkYrlj5bmtojlhbPpl63vvIzkuI3lj5HmlL7lpZblirEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeC55yL5a6M6KeG6aKR5omN6IO96I635b6X5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5Yid5aeL5YyW5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9iYW5uZXJTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfYmFubmVyU2l6ZVBlcmNlbnQ6IG51bWJlciA9IDAuNTtcclxuICAgIF9iYW5uZXJCb3R0b206IG51bWJlciA9IDA7XHJcbiAgICBfb2xkQmFubmVyTG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uTm9uZTtcclxuXHJcbiAgICBfY3VyQmFubmVySGVpZ2h0OiBudW1iZXIgPSAyNDA7XHJcblxyXG4gICAgX21vdmVCdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2N1cl9sZXZlbDogYW55ID0gbnVsbDtcclxuICAgIF9jcmVhdGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBhcmdzOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCF1dGlscy5jb25maWcucXFjb25maWcuYmFubmVySWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJiYW5uZXLlub/lkYpJROS4jeWtmOWcqFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYXJnc1RtcDogYW55ID0gYXJncztcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyU2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3NUbXAgJiYgYXJnc1RtcC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyU2l6ZVBlcmNlbnQgPSBhcmdzVG1wLndpZHRoIDwgMCA/IDAgOiBhcmdzVG1wLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyU2l6ZVBlcmNlbnQgPSBhcmdzVG1wLndpZHRoID4gMSA/IDEgOiB0aGlzLl9iYW5uZXJTaXplUGVyY2VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3NUbXAgJiYgYXJnc1RtcC5ib3R0b20pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckJvdHRvbSA9IGFyZ3NUbXAuYm90dG9tIC8gdGhpcy5fc3lzRGF0YS5waXhlbFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQm90dG9tID0gdGhpcy5fYmFubmVyQm90dG9tIDwgMCA/IDAgOiB0aGlzLl9iYW5uZXJCb3R0b207XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJCb3R0b20gPSB0aGlzLl9iYW5uZXJCb3R0b20gPiB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCA/IHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0IDogdGhpcy5fYmFubmVyQm90dG9tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJT1PlubPlj7DkuI3mlK/mjIFvblJlc2l6ZeabtOaUueWwuuWvuO+8jOaJgOS7pei/memHjOWuveW6puWbuuWumuacgOWwj+WAvFxyXG4gICAgICAgICAgICAvLyBsZXQgd2lkdGggPSB0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoICogdGhpcy5fYmFubmVyU2l6ZVBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IDMwMDtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9IDcyO1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9ICh0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgbGV0IHRvcCA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0IC0gaGVpZ2h0IC0gdGhpcy5fYmFubmVyQm90dG9tO1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5iYW5uZXJJZCxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgYmFubmVyQWQ6IGFueSA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBvbGRCYW5uZXJBZDogYW55ID0gdGhpcy5fY3VyQmFubmVyQWQ7XHJcblxyXG4gICAgICAgICAgICBiYW5uZXJBZCA9IHRoaXMucXEuY3JlYXRlQmFubmVyQWQocGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJiYW5uZXJBZCBcIiwgYmFubmVyQWQpO1xyXG4gICAgICAgICAgICBpZiAoYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrmnaHliqDovb3lpLHotKUhIFwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGxvY2F0aW9uID09IEJhbm5lckxvY2F0aW9uLkdhbWUgJiYgdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkICYmIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZCA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572uYmFubmVy5bm/5ZGK5LyY5YWI57qn5Li66buY6K6kYmFubmVy77yM5ri45oiP6aG16Z2i5aSH55So5pi+56S656ev5pyo5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dCbG9ja0FkKHsgYm90dG9tOiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Jhbm5lclNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkJhbm5lcuW5v+WRiuaYvuekuuaIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX21vdmVfYnRuX2ludGVydmFsICYmIHRoaXMuX2N1cl9sZXZlbCAmJiB0aGlzLl9jdXJfbGV2ZWwgJSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfbW92ZV9idG5faW50ZXJ2YWwgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUJ0blRvQmFubmVyVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJCYW5uZXJBZCA9IGJhbm5lckFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiQmFubmVy5bm/5ZGK5Ye66ZSZXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX21vdmVfYnRuX2ludGVydmFsICYmIHRoaXMuX2N1cl9sZXZlbCAmJiB0aGlzLl9jdXJfbGV2ZWwgJSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfbW92ZV9idG5faW50ZXJ2YWwgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQnRuVG9CYW5uZXJUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiQmFubmVyIGFkIFNob3cgZXJyb1wiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uUmVzaXplKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyQmFubmVySGVpZ2h0ID0gcmVzLmhlaWdodCAqIHRoaXMuX3N5c0RhdGEucGl4ZWxSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0Jhbm5lclRpbWVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiwgYXJnczogYW55KSB7XHJcbiAgICAgICAgbGV0IGxvY2F0aW9uVG1wOiBCYW5uZXJMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgIGxldCBhcmdzVG1wOiBhbnkgPSBhcmdzO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOaYvuekukJhbm5lcuW5v+WRinh4eO+8gWxvY2F0aW9uOiR7bG9jYXRpb25UbXB9OyDpl7TpmpTml7bpl7Q6JHt1dGlscy5Ub29sX1FRLlNlcnZlckNvbmZpZy5yZWZyZXNoX2FkX3RpbWV9OuS8mOWFiOe6p++8miR7dGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkfWApO1xyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkKSB7XHJcbiAgICAgICAgLy8gICAgIHN3aXRjaCAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2ZpcnN0X2FkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBjYXNlIFwiZGVmYXVsdFwiOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUJhbm5lcihsb2NhdGlvblRtcCwgYXJnc1RtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICBjYXNlIFwiYm94XCI6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKCF1dGlscy5Ub29sX1FRLmlzT3Zlck1pblZlcnNpb24oXCIxLjE1LjBcIikpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeenr+acqOW5v+WRiu+8jOaYvuekuum7mOiupGJhbm5lclwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQmFubmVyKGxvY2F0aW9uVG1wLCBhcmdzVG1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dCbG9ja0FkKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjYXNlIFwiM1wiOlxyXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIHRoaXMuX2NyZWF0ZUJhbm5lcihsb2NhdGlvblRtcCwgYXJnc1RtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgdGhpcy5zaG93QmxvY2tBZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGxldCBiYW5uZXJfZGVsYXlfdGltZSA9IHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9kZWxheV90aW1lID8gdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2RlbGF5X3RpbWUgOiAwO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOW7tui/nyR7YmFubmVyX2RlbGF5X3RpbWV956eS5pi+56S6YmFubmVyYCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfbW92ZV9idG5faW50ZXJ2YWwgfHwgIXRoaXMuX2N1cl9sZXZlbCB8fCB0aGlzLl9jdXJfbGV2ZWwgJSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfbW92ZV9idG5faW50ZXJ2YWwgIT0gMCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5YWz5Y2h5LiN5YGa5bu26L+f56e75Yqo77yBXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVCdG5Ub0Jhbm5lclRvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zaG93QmFubmVyVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVCYW5uZXIobG9jYXRpb25UbXAsIGFyZ3NUbXApXHJcbiAgICAgICAgfSwgYmFubmVyX2RlbGF5X3RpbWUgKiAxMDAwKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIF9zaG93QmFubmVyVGltZXJJZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfUVEuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYXRpb25UbXA6IEJhbm5lckxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJnc1RtcDogYW55ID0gYXJncztcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVCdG4gPSBhcmdzID8gYXJncy5tb3ZlQnRuIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cl9sZXZlbCA9IGFyZ3MgPyBhcmdzLmN1cl9sZXZlbCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93QmFubmVyVGltZXIobG9jYXRpb25UbXAsIGFyZ3NUbXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEhpZGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNRUSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5bm/5ZGK5p2hXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckJhbm5lckFkLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1ZpZGVvU2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5pi+56S65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopHmnKrliqDovb3vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmj5LlsY9cclxuICAgICAqIDIwMDFcdOinpuWPkemikeeOh+mZkOWItlx05bCP56iL5bqP5ZCv5Yqo5LiA5a6a5pe26Ze05YaF5LiN5YWB6K645bGV56S65o+S5bGP5bm/5ZGKXHJcbiAgICAgKiAyMDAyXHTop6blj5HpopHnjofpmZDliLZcdOi3neemu+Wwj+eoi+W6j+aPkuWxj+W5v+WRiuaIluiAhea/gOWKseinhumikeW5v+WRiuS4iuasoeaSreaUvuaXtumXtOmXtOmalOS4jei2s++8jOS4jeWFgeiuuOWxleekuuaPkuWxj+W5v+WRilxyXG4gICAgICogMjAwM1x06Kem5Y+R6aKR546H6ZmQ5Yi2XHTlvZPliY3mraPlnKjmkq3mlL7mv4DlirHop4bpopHlub/lkYrmiJbogIXmj5LlsY/lub/lkYrvvIzkuI3lhYHorrjlho3mrKHlsZXnpLrmj5LlsY/lub/lkYpcclxuICAgICAqIDIwMDRcdOW5v+WRiua4suafk+Wksei0pVx06K+l6aG56ZSZ6K+v5LiN5piv5byA5Y+R6ICF55qE5byC5bi45oOF5Ya177yM5oiW5Zug5bCP56iL5bqP6aG16Z2i5YiH5o2i5a+86Ie05bm/5ZGK5riy5p+T5aSx6LSlXHJcbiAgICAgKiAyMDA1XHTlub/lkYrosIPnlKjlvILluLhcdOaPkuWxj+W5v+WRiuWunuS+i+S4jeWFgeiuuOi3qOmhtemdouiwg+eUqFxyXG4gICAgICog6ZSA5q+B5o+S5bGP5bm/5ZGK5ZCO5omN6IO96YeN5paw5Yib5bu6XHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuVG9vbF9RUS5pc092ZXJNaW5WZXJzaW9uKFwiMS4xMi4wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pysXCIgKyB1dGlscy5Ub29sX1FRLl9zeXNJbmZvLlNES1ZlcnNpb24gKyBcIuS4jeaUr+aMgeaPkuWxj+W5v+WRiuWSjOebkuWtkOW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmnI3liqHlmajmj5LlsY/kvJjlhYjnuqc+Pj4ke3RoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2ZpcnN0X2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZWZhdWx0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5fY3JlYXRlSW5zdGVyc3RpdGlhbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJib3hcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuVG9vbF9RUS5pc092ZXJNaW5WZXJzaW9uKFwiMS43LjFcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pysXCIgKyB1dGlscy5Ub29sX1FRLl9zeXNJbmZvLlNES1ZlcnNpb24gKyBcIuS4jeaUr+aMgeebkuWtkOW5v+WRiizmmL7npLrmj5LlsY9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKHRoaXMuX2NyZWF0ZUluc3RlcnN0aXRpYWwuYmluZCh0aGlzKSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5TaG93QXBwQm94LmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm9ubHlkZWZhdWx0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5fY3JlYXRlSW5zdGVyc3RpdGlhbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5pyq6YWN572u5LyY5YWI57qn77yM5pi+56S66buY6K6k5o+S5bGPXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCh0aGlzLl9jcmVhdGVJbnN0ZXJzdGl0aWFsLmJpbmQodGhpcyksIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9pc1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBfY3JlYXRlSW5zdGVyc3RpdGlhbCgpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiX2NyZWF0ZUluc3RlcnN0aXRpYWwgPj4+IDIyMlwiKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5faW5zZXJ0QWQpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5faW5zZXJ0QWQuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgaW5zZXJ0SWQ7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5faW5zZXJ0QWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQgPSB0aGlzLnFxLmNyZWF0ZUludGVyc3RpdGlhbEFkKHsgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5pbnNlcnRJZCB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5faW5zZXJ0QWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVyci5lcnJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bCP56iL5bqP5ZCv5Yqo5LiA5a6a5pe26Ze05YaF5LiN5YWB6K645bGV56S65o+S5bGP5bm/5ZGKXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIwMDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLot53nprvlsI/nqIvluo/mj5LlsY/lub/lkYrmiJbogIXmv4DlirHop4bpopHlub/lkYrkuIrmrKHmkq3mlL7ml7bpl7Tpl7TpmpTkuI3otrPvvIzkuI3lhYHorrjlsZXnpLrmj5LlsY/lub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjAwMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeato+WcqOaSreaUvua/gOWKseinhumikeW5v+WRiuaIluiAheaPkuWxj+W5v+WRiu+8jOS4jeWFgeiuuOWGjeasoeWxleekuuaPkuWxj+W5v+WRilwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+l6aG56ZSZ6K+v5LiN5piv5byA5Y+R6ICF55qE5byC5bi45oOF5Ya177yM5oiW5Zug5bCP56iL5bqP6aG16Z2i5YiH5o2i5a+86Ie05bm/5ZGK5riy5p+T5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIwMDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrlrp7kvovkuI3lhYHorrjot6jpobXpnaLosIPnlKhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/liqDovb3lpLHotKUhIFwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjmmL7npLrnmoTmmK/mj5LlsY/lub/lkYrvvIzlpIfnlKjmmL7npLrnm5LlrZDlub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNob3dfbGV2ZWwgPSB0aGlzLlNlcnZlckNvbmZpZy5pbnNlcnRfc2hvd19hcHBCb3hfbGV2ZWwgPyB0aGlzLlNlcnZlckNvbmZpZy5pbnNlcnRfc2hvd19hcHBCb3hfbGV2ZWwgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5jdXJyZW50TGV2ZWwgPiBzaG93X2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0FwcEJveCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlpIfnlKjmmL7npLrnm5LlrZDlub/lkYrmnKrovr7liLDlhbPljaHpmZDliLbopoHmsYJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gdGhpcy5faW5zZXJ0QWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/liqDovb3miJDlip8hIFwiKTtcclxuICAgICAgICAgICAgLy8gfSlcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRBZC5vbkNsb3NlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/lub/lkYrlhbPpl63miJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5faW5zZXJ0QWQpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2luc2VydEFkLmxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/liqDovb3miJDlip8hIFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydEFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5pi+56S65oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5Ye66ZSZXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmj5LlsY/liqDovb3lpLHotKUhIFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1Nob3cpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydEFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5pi+56S65oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5Ye66ZSZXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65ri45oiP55uS5a2QXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93QXBwQm94KGlzTW9yZUdhbWU/OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuVG9vbF9RUS5pc092ZXJNaW5WZXJzaW9uKFwiMS43LjFcIikpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3niYjmnKxcIiArIHV0aWxzLlRvb2xfUVEuX3N5c0luZm8uU0RLVmVyc2lvbiArIFwi5LiN5pSv5oyB5ri45oiP55uS5a2QIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj5TaG93QXBwQm94XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FwcEJveCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwQm94LmRlc3Ryb3koKS50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua4uOaIj+ebkuWtkGlk5Li6OlwiLCB1dGlscy5jb25maWcucXFjb25maWcuYm94SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcEJveCA9IHRoaXMucXEuY3JlYXRlQXBwQm94KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5ib3hJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcEJveC5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuLjmiI/nm5LlrZDliqDovb3miJDlip/vvIFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwQm94LnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuLjmiI/nm5LlrZDmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuLjmiI/nm5LlrZDmnKrliqDovb3vvIEjZXJyPVwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5ri45oiP55uS5a2Q5Yqg6L295aSx6LSl77yBICNlcnI9XCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01vcmVHYW1lICYmIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImJveFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LyY5YWI5pi+56S655qE5piv55uS5a2Q5bm/5ZGK77yM5aSH55So5pi+56S65o+S5bGPXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlSW5zdGVyc3RpdGlhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua4uOaIj+ebkuWtkOmUgOavgeWksei0pe+8gSAjZXJyPVwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgIH0pOztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5ri45oiP55uS5a2QaWTkuLo6XCIsIHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5ib3hJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBCb3ggPSB0aGlzLnFxLmNyZWF0ZUFwcEJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5ib3hJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBCb3gubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuLjmiI/nm5LlrZDliqDovb3miJDlip/vvIFcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBCb3guc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5ri45oiP55uS5a2Q5pi+56S65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua4uOaIj+ebkuWtkOacquWKoOi9ve+8gSNlcnI9XCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmuLjmiI/nm5LlrZDliqDovb3lpLHotKXvvIEgI2Vycj1cIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01vcmVHYW1lICYmIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfZmlyc3RfYWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9maXJzdF9hZCA9PSBcImJveFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvJjlhYjmmL7npLrnmoTmmK/nm5LlrZDlub/lkYrvvIzlpIfnlKjmmL7npLrmj5LlsY9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUluc3RlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/muLjmiI/nm5LlrZBcclxuICAgICAqL1xyXG4gICAgcHVibGljIEhpZGVBcHBib3goKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcHBCb3gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcEJveC5kZXN0cm95KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua4uOaIj+ebkuWtkOmUgOavgeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwi5ri45oiP55uS5a2Q6ZSA5q+B5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9ibG9ja0FkOiBhbnkgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgICog5pi+56S656ev5pyo5bm/5ZGKXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0Jsb2NrQWQocGFybWU/OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu4Tku7bmnKrliJ3lp4vljJbvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLnFxY29uZmlnLmJhbm5lckJveElkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnp6/mnKjlub/lkYpJROS4jeWtmOWcqFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmlzX2Jhbm5lcl9ib3ggPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7np6/mnKjlub/lkYrkuI3lsZXnpLrvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ibG9ja0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQub2ZmTG9hZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ibG9ja0FkLm9mZlJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ibG9ja0FkLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0lPUyAmJiB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCA8IDczNikge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvcCA9IDE2O1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IDE2O1xyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSA2NTtcclxuICAgICAgICAgICAgaWYgKHBhcm1lLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wID0gcGFybWUudG9wXHJcbiAgICAgICAgICAgICAgICB0b3AgPSBwYXJtZS50b3AgLyBjYy53aW5TaXplLmhlaWdodCAqIHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AgPSB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCAtIDY1LjUgLSBwYXJtZS5ib3R0b21cclxuICAgICAgICAgICAgICAgIHRvcCA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0IC0gNjUuNSAtIHBhcm1lLmJvdHRvbSAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5fc3lzRGF0YS5zY3JlZW5IZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQgPSB0aGlzLnFxLmNyZWF0ZUJsb2NrQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5iYW5uZXJCb3hJZCxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNpemU6IHBhcm1lLnNob3dOdW0gPyBwYXJtZS5zaG93TnVtIDogNSxcclxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcImxhbmRzY2FwZVwiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ibG9ja0FkLm9uUmVzaXplKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQub2ZmUmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidGhpcy5fc3lzRGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwib25yZXNpemUgPj5cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65byC5bi4XCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFybWUuc2hvd051bSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSAwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gcmVzLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcm1lLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZWZ0ID0gd2lkdGggKyBwYXJtZS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBwYXJtZS5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcm1lLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGggLSByZXMud2lkdGggLSBwYXJtZS5yaWdodCAvIGNjLndpblNpemUud2lkdGggKiB0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gKHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGggLSB3aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tBZC5zdHlsZS5sZWZ0ID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJvbnJlc2l6ZSBlbmQ+PlwiLCB0aGlzLl9ibG9ja0FkLnN0eWxlLnRvcCwgXCI8PFwiLCB0aGlzLl9ibG9ja0FkLnN0eWxlLmxlZnQsIFwiPDxcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYmxvY2tBZCA9IHRoaXMucXEuY3JlYXRlQmxvY2tBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLnFxY29uZmlnLmJhbm5lckJveElkLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAxNixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDE2XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogcGFybWUuc2hvd051bSA/IHBhcm1lLnNob3dOdW0gOiA1LFxyXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IFwibGFuZHNjYXBlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gaWYgKHBhcm1lLnRvcCkge1xyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLlrp7pmYXkvY3nva46XCIsIHBhcm1lLnRvcCAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5fc3lzRGF0YS5zY3JlZW5IZWlnaHQsIGNjLndpblNpemUuaGVpZ2h0LCBwYXJtZS50b3ApXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSBpZiAocGFybWUuYm90dG9tKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuWunumZheS9jee9rjpcIiwgdGhpcy5fc3lzRGF0YS5zY3JlZW5IZWlnaHQgLSA2MCAtIHBhcm1lLmJvdHRvbSAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5fc3lzRGF0YS5zY3JlZW5IZWlnaHQsY2Mud2luU2l6ZS5oZWlnaHQscGFybWUuYm90dG9tKVxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ibG9ja0FkLm9uUmVzaXplKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQub2ZmUmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidGhpcy5fc3lzRGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwib25yZXNpemUgPj5cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFybWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwicGFybWU6XCIgKyBKU09OLnN0cmluZ2lmeShwYXJtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcm1lLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi56ev5pyo5bm/5ZGKVE9Q5L2N572u77yaXCIsIHBhcm1lLnRvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQuc3R5bGUudG9wID0gcGFybWUudG9wIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcm1lLmJvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgYm90dG9tID0gdGhpcy5fc3lzRGF0YS5zY3JlZW5IZWlnaHQgLSByZXMuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9ibG9ja0FkLnN0eWxlLnRvcCA9IGJvdHRvbSAtIHBhcm1lLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tBZC5zdHlsZS50b3AgPSB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCAtIHJlcy5oZWlnaHQgLSBwYXJtZS5ib3R0b20gLyBjYy53aW5TaXplLmhlaWdodCAqIHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFybWUubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9ibG9ja0FkLnN0eWxlLmxlZnQgPSBwYXJtZS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0FkLnN0eWxlLmxlZnQgPSBwYXJtZS5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJtZS5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9ibG9ja0FkLnN0eWxlLmxlZnQgPSB0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoIC0gcmVzLndpZHRoIC0gcGFybWUucmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQuc3R5bGUubGVmdCA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGggLSByZXMud2lkdGggLSBwYXJtZS5yaWdodCAvIGNjLndpblNpemUud2lkdGggKiB0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQuc3R5bGUubGVmdCA9ICh0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoIC0gcmVzLndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0FkLnN0eWxlLnRvcCA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0FkLnN0eWxlLmxlZnQgPSAodGhpcy5fc3lzRGF0YS5zY3JlZW5XaWR0aCAtIHJlcy53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW8guW4uFwiLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJvbnJlc2l6ZSBlbmQ+PlwiLCB0aGlzLl9ibG9ja0FkLnN0eWxlLnRvcCwgXCI8PFwiLCB0aGlzLl9ibG9ja0FkLnN0eWxlLmxlZnQsIFwiPDxcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9ibG9ja0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnp6/mnKjlub/lkYrliqDovb3miJDlip/vvIFcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Jsb2NrQWQub25FcnJvcigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnp6/mnKjlub/lkYrliqDovb3lpLHotKXvvIFcIiwgcmVzLmVyck1zZywgXCI+PlwiLCByZXMuZXJyQ29kZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP56ev5pyo5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlQmxvY2tBZCgpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP56ev5pyo5bm/5ZGKXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9ibG9ja0FkKSB0aGlzLl9ibG9ja0FkLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnRuVG9CYW5uZXJUb3AoKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIm1vdmVCdG5Ub0Jhbm5lclRvcCA+Pj4+Pj4+Pj4uXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5fbW92ZUJ0biAmJiBjYy5pc1ZhbGlkKHRoaXMuX21vdmVCdG4pKSB7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlQnRuVGltZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBidG46IGNjLk5vZGUgPSB0aGlzLl9tb3ZlQnRuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX21vdmVfYnRuX2ludGVydmFsICYmIHRoaXMuX2N1cl9sZXZlbCAmJiB0aGlzLl9jdXJfbGV2ZWwgJSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfbW92ZV9idG5faW50ZXJ2YWwgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9tb3ZlX2J0bl90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZUJ0blRpbWUgPSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfbW92ZV9idG5fdGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhtb3ZlQnRuVGltZSA9PSAwID8gXCLmjInpkq7nm7TmjqXmmL7npLrlnKhiYW5uZXLkuIrpnaJcIiA6IGDmjInpkq7lsYXlupXpg6jkuJQke21vdmVCdG5UaW1lfeenkuWQjuenu+WKqGApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChidG4gJiYgY2MuaXNWYWxpZChidG4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0IDwgNjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5ib3R0b20gPSAyNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5XaWRnZXQpLmJvdHRvbSA9IDIyMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBtb3ZlQnRuVGltZSAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19