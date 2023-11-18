"use strict";
cc._RF.push(module, 'ecaa7MzB4FNUoaCpwLpxt+Y', 'AdAgentBili');
// common-plugin/Scripts/AdAgentBili.ts

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
/**
 * bili广告组件
 */
var AdAgentBili = /** @class */ (function (_super) {
    __extends(AdAgentBili, _super);
    function AdAgentBili() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        _this._bannerAd = null;
        //@ts-ignore
        _this.bl = window.bl;
        _this._curBannerAd = null;
        _this._bannerSizePercent = 0.1;
        _this._bannerBottom = 0;
        return _this;
    }
    AdAgentBili.prototype.Init = function () {
    };
    AdAgentBili.prototype.ShowBanner = function (location, args) {
        if (args === void 0) { args = null; }
        var argsTmp = args;
        if (argsTmp && argsTmp.width) {
            this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
            this._bannerSizePercent = argsTmp.width > 1 ? 1 : argsTmp.width;
        }
        if (argsTmp && argsTmp.bottom) {
            this._bannerBottom = argsTmp.bottom < 0 ? 0 : argsTmp.bottom;
            this._bannerBottom = argsTmp.bottom > cc.winSize.height ? cc.winSize.height : argsTmp.bottom;
        }
        // let bannerId: string = utils.config.biliConfig.bannerId;
        // utils.showLog("显示Banner广告: bannerId=" + bannerId);
        console.log("显示Banner广告");
        var params = {
            left: 0,
            width: 300,
            top: 0
        };
        //@ts-ignore
        var curBannerAd = bl.createBannerAd(params);
        if (curBannerAd) {
            curBannerAd.onError(function (err) {
                Utils_1.utils.showLog("广告条加载失败! ", JSON.stringify(err));
                if (curBannerAd) {
                    curBannerAd.destroy();
                }
            });
            var self_1 = this;
            curBannerAd.onLoad(function () {
                curBannerAd.show().then(function () {
                    if (self_1._curBannerAd) {
                        self_1._curBannerAd.destroy();
                    }
                    self_1._curBannerAd = curBannerAd;
                    Utils_1.utils.showLog("Banner广告显示成功!");
                }).catch(function (err) {
                    Utils_1.utils.showLog("Banner广告出错", JSON.stringify(err));
                    if (curBannerAd) {
                        curBannerAd.destroy();
                    }
                });
            });
            curBannerAd.onResize(function (res) {
                curBannerAd.style.width = Utils_1.utils.Tool_Bili.SysInfo.screenWidth * self_1._bannerSizePercent;
                curBannerAd.style.left = (Utils_1.utils.Tool_Bili.SysInfo.screenWidth - res.width) * 0.5;
                if (self_1._bannerBottom == cc.winSize.height) {
                    curBannerAd.style.top = 0;
                }
                else {
                    curBannerAd.style.top = Utils_1.utils.Tool_Bili.SysInfo.screenHeight - res.height - self_1._bannerBottom;
                }
            });
        }
        else {
            Utils_1.utils.showLog("广告条创建失败!");
        }
    };
    AdAgentBili.prototype.ShowInterstitial = function () {
        Utils_1.utils.showLog("哔哩平台暂时无插屏广告");
    };
    AdAgentBili.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsBili) {
            if (this._bannerAd) {
                this._bannerAd.hide();
            }
        }
    };
    AdAgentBili.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsBili) {
            this._videoCallback = callback;
            var self_2 = this;
            this.showRewardedVideoAd({
                onSuccess: function (res) {
                    // 广告成功展示
                    Utils_1.utils.showLog("bili视频展示成功！");
                },
                onFail: function (e) {
                    // 广告失败了
                    Utils_1.utils.showLog("bili视频广告展示失败！");
                    Utils_1.utils.Tool_Bili.share(function (res, msg) {
                        if (res) {
                            self_2._videoCallback && self_2._videoCallback(true, "");
                            self_2._videoCallback = null;
                        }
                        else {
                            self_2._videoCallback && self_2._videoCallback(false, "分享成功才可以获取奖励哦!");
                            self_2._videoCallback = null;
                        }
                    });
                },
                onClose: function (e) {
                    // 用户关闭了广告
                    if (e.isEnded) {
                        // 用户看完了
                        Utils_1.utils.showLog("bili视频广告观看完毕，发送奖励");
                        self_2._videoCallback && self_2._videoCallback(true, "");
                    }
                    else {
                        // 用户没看完
                        self_2._videoCallback && self_2._videoCallback(false, "观看完视频才能获得奖励!");
                        self_2._videoCallback = null;
                    }
                }
            });
        }
    };
    AdAgentBili.prototype.showRewardedVideoAd = function (_a) {
        var onSuccess = _a.onSuccess, onFail = _a.onFail, onClose = _a.onClose;
        // 创建激励视频对象实例:
        var ad = this.bl.createRewardedVideoAd();
        function adLoadHandler(e) {
            // !!!!!!
            // 重要！此处必须先 off 本次事件回调。
            // !!!!!!
            ad.offLoad(adLoadHandler);
            // 加载成功
            ad.show()
                .catch(function (e) {
                // 激励视频展示失败
                if (typeof onFail === 'function') {
                    onFail(e);
                }
                return Promise.reject(e);
            })
                .then(function (res) {
                // 成功展示激励视频
                if (typeof onSuccess === 'function') {
                    onSuccess(res);
                }
            });
        }
        function adErrorHandler(e) {
            // 激励广告出错
            if (typeof onFail === 'function') {
                onFail(e);
            }
            ad.offLoad(adLoadHandler);
            ad.offClose(adCloseHandler);
            ad.offError(adErrorHandler);
            ad.destroy();
        }
        function adCloseHandler(e) {
            // 用户点击“关闭广告”
            if (typeof onClose === 'function') {
                onClose(e);
            }
            ad.offLoad(adLoadHandler);
            ad.offClose(adCloseHandler);
            ad.offError(adErrorHandler);
            ad.destroy();
        }
        // 监听加载成功事件
        ad.offLoad(adLoadHandler);
        ad.onLoad(adLoadHandler);
        // 监听错误事件
        ad.offError(adErrorHandler);
        ad.onError(adErrorHandler);
        // 监听用户关闭事件
        ad.offClose(adCloseHandler);
        ad.onClose(adCloseHandler);
        // 加载
        ad.load();
        return ad;
    };
    AdAgentBili = __decorate([
        ccclass
    ], AdAgentBili);
    return AdAgentBili;
}(AdAgent_1.default));
exports.default = AdAgentBili;

cc._RF.pop();