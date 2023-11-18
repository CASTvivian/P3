"use strict";
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