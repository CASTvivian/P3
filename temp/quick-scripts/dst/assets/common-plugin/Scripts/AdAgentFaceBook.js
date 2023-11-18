
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentFaceBook.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a545elsu55MprEh4ZOD19/a', 'AdAgentFaceBook');
// common-plugin/Scripts/AdAgentFaceBook.ts

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
var FBAdManager_1 = require("./FaceBookSdk/FBAdManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentFaceBook = /** @class */ (function (_super) {
    __extends(AdAgentFaceBook, _super);
    function AdAgentFaceBook() {
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
        return _this;
    }
    AdAgentFaceBook.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsFaceBook) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initAd();
            }, this);
        }
    };
    Object.defineProperty(AdAgentFaceBook.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.Tool_Facebook.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentFaceBook.prototype._initAd = function () {
        Utils_1.utils.showLog("facebook init ad>>>>>>>>");
        FBAdManager_1.default.addInterstitial(Utils_1.utils.config.faceBookConfig.insertId, 3);
        FBAdManager_1.default.addRewardedVideo(Utils_1.utils.config.faceBookConfig.videoId, 3);
        FBAdManager_1.default.addBanner(Utils_1.utils.config.faceBookConfig.bannerId);
        setTimeout(function () {
            FBAdManager_1.default.loadAll();
        }, 3000);
    };
    AdAgentFaceBook.prototype._createBanner = function (location, args) {
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsFaceBook) {
            FBAdManager_1.default.showBannerAsync().then(function () {
                Utils_1.utils.showLog("显示Banner广告: 成功");
            }).catch(function (e) {
                Utils_1.utils.showLog("显示Banner广告: 失败，原因: " + e.message);
            });
        }
    };
    AdAgentFaceBook.prototype._showBannerTimer = function (location, args) {
        var locationTmp = location;
        var argsTmp = args;
        Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544Axxx\uFF01location:" + locationTmp + "; \u95F4\u9694\u65F6\u95F4:" + Utils_1.utils.Tool_Facebook.ServerConfig.refresh_ad_time + ":\u4F18\u5148\u7EA7\uFF1A" + this.ServerConfig.banner_first_ad);
        this._createBanner(locationTmp, argsTmp);
    };
    AdAgentFaceBook.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsFaceBook) {
            if (Utils_1.utils.ServerConfig) {
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
    AdAgentFaceBook.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsFaceBook) {
            Utils_1.utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            FBAdManager_1.default.hideBannerAsync().then(function () {
                Utils_1.utils.showLog("隐藏Banner广告: 成功");
            }).catch(function (e) {
                Utils_1.utils.showLog("隐藏Banner广告: 失败，原因: " + e.message);
            });
        }
    };
    AdAgentFaceBook.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsFaceBook) {
            this._videoCallback = callback;
            if (FBAdManager_1.default.isRewardedVideoReady()) {
                FBAdManager_1.default.showRewardedVideo().then(function () {
                    Utils_1.utils.showLog("播放激励视频广告: 成功");
                    if (_this._videoCallback) {
                        _this._videoCallback(true, "");
                        _this._videoCallback = null;
                    }
                }).catch(function (e) {
                    Utils_1.utils.showLog("视频播放失败：" + e.message);
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "Ad playback failed!");
                        _this._videoCallback = null;
                    }
                });
            }
            else {
                Utils_1.utils.showLog("激励视频广告未加载！");
                if (this._videoCallback) {
                    this._videoCallback(false, "Video ad not loaded successfully！");
                    this._videoCallback = null;
                }
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
    AdAgentFaceBook.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = null; }
        if (PlatUtils_1.default.IsFaceBook) {
            if (this.ServerConfig) {
                Utils_1.utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
            }
            else {
                this._createInsterstitial.bind(this);
            }
        }
    };
    AdAgentFaceBook.prototype._createInsterstitial = function () {
        if (FBAdManager_1.default.isInterstitialAdReady()) {
            FBAdManager_1.default.showInterstitialAd().then(function () {
                Utils_1.utils.showLog("播放插屏广告: 成功");
            }).catch(function (e) {
                Utils_1.utils.showLog("播放插屏广告: 失败，原因: " + e.message);
            });
        }
        else {
            Utils_1.utils.showLog("插屏广告没有加载成功！");
        }
    };
    AdAgentFaceBook = __decorate([
        ccclass
    ], AdAgentFaceBook);
    return AdAgentFaceBook;
}(AdAgent_1.default));
exports.default = AdAgentFaceBook;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEZhY2VCb29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyw2Q0FBK0M7QUFDL0MseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyx5REFBb0Q7QUFFOUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQU87SUFBcEQ7UUFBQSxxRUFxS0M7UUFuS0csY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixrQkFBWSxHQUFRLElBQUksQ0FBQztRQUN6QixjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsWUFBTSxHQUFRLElBQUksQ0FBQztRQUNuQixhQUFPLEdBQVEsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUU3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixZQUFZO1FBQ1osUUFBRSxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUF5QnBCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLHdCQUFrQixHQUFXLEdBQUcsQ0FBQztRQUNqQyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQix3QkFBa0IsR0FBbUIsNEJBQWMsQ0FBQyxJQUFJLENBQUM7UUFFekQsc0JBQWdCLEdBQVcsR0FBRyxDQUFDO1FBRS9CLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBUSxJQUFJLENBQUM7UUF3QnZCLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQWtGL0IsYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUFhN0IsQ0FBQztJQXZKVSw4QkFBSSxHQUFYO1FBQUEsaUJBTUM7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LENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQy9CO0lBQ0wsQ0FBQztJQW5LZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQXFLbkM7SUFBRCxzQkFBQztDQXJLRCxBQXFLQyxDQXJLNEMsaUJBQU8sR0FxS25EO2tCQXJLb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZEFnZW50IGZyb20gXCIuL0FkQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBGQkFkTWFuYWdlciBmcm9tIFwiLi9GYWNlQm9va1Nkay9GQkFkTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRGYWNlQm9vayBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuICAgIF9zeXNEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgX2N1ckJhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfaW5zZXJ0QWQ6IGFueSA9IG51bGw7XHJcbiAgICBfb2xkQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfYXBwQm94OiBhbnkgPSBudWxsOyAvL+a4uOaIj+ebkuWtkOW5v+WRilxyXG5cclxuICAgIF92aWRlb0NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzVmlkZW9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIHFxOiBhbnkgPSB3aW5kb3cucXE7XHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRmFjZUJvb2spIHtcclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdEFkKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLlRvb2xfRmFjZWJvb2suU2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfaW5pdEFkKCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJmYWNlYm9vayBpbml0IGFkPj4+Pj4+Pj5cIilcclxuICAgICAgICBGQkFkTWFuYWdlci5hZGRJbnRlcnN0aXRpYWwodXRpbHMuY29uZmlnLmZhY2VCb29rQ29uZmlnLmluc2VydElkLCAzKTtcclxuICAgICAgICBGQkFkTWFuYWdlci5hZGRSZXdhcmRlZFZpZGVvKHV0aWxzLmNvbmZpZy5mYWNlQm9va0NvbmZpZy52aWRlb0lkLCAzKTtcclxuICAgICAgICBGQkFkTWFuYWdlci5hZGRCYW5uZXIodXRpbHMuY29uZmlnLmZhY2VCb29rQ29uZmlnLmJhbm5lcklkKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgRkJBZE1hbmFnZXIubG9hZEFsbCgpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIF9iYW5uZXJTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfYmFubmVyU2l6ZVBlcmNlbnQ6IG51bWJlciA9IDAuNTtcclxuICAgIF9iYW5uZXJCb3R0b206IG51bWJlciA9IDA7XHJcbiAgICBfb2xkQmFubmVyTG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uTm9uZTtcclxuXHJcbiAgICBfY3VyQmFubmVySGVpZ2h0OiBudW1iZXIgPSAyNDA7XHJcblxyXG4gICAgX21vdmVCdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2N1cl9sZXZlbDogYW55ID0gbnVsbDtcclxuICAgIF9jcmVhdGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBhcmdzOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0ZhY2VCb29rKSB7XHJcbiAgICAgICAgICAgIEZCQWRNYW5hZ2VyLnNob3dCYW5uZXJBc3luYygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekukJhbm5lcuW5v+WRijog5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLpCYW5uZXLlub/lkYo6IOWksei0pe+8jOWOn+WboDogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24sIGFyZ3M6IGFueSkge1xyXG4gICAgICAgIGxldCBsb2NhdGlvblRtcDogQmFubmVyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBsZXQgYXJnc1RtcDogYW55ID0gYXJncztcclxuICAgICAgICB1dGlscy5zaG93TG9nKGDmmL7npLpCYW5uZXLlub/lkYp4eHjvvIFsb2NhdGlvbjoke2xvY2F0aW9uVG1wfTsg6Ze06ZqU5pe26Ze0OiR7dXRpbHMuVG9vbF9GYWNlYm9vay5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lfTrkvJjlhYjnuqfvvJoke3RoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9maXJzdF9hZH1gKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQmFubmVyKGxvY2F0aW9uVG1wLCBhcmdzVG1wKVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcklkOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIFNob3dCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNGYWNlQm9vaykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uVG1wOiBCYW5uZXJMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZ3NUbXA6IGFueSA9IGFyZ3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlQnRuID0gYXJncyA/IGFyZ3MubW92ZUJ0biA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJfbGV2ZWwgPSBhcmdzID8gYXJncy5jdXJfbGV2ZWwgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0Jhbm5lclRpbWVyKGxvY2F0aW9uVG1wLCBhcmdzVG1wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRmFjZUJvb2spIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+W5v+WRiuadoVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICBGQkFkTWFuYWdlci5oaWRlQmFubmVyQXN5bmMoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpmpDol49CYW5uZXLlub/lkYo6IOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JePQmFubmVy5bm/5ZGKOiDlpLHotKXvvIzljp/lm6A6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNGYWNlQm9vaykge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmIChGQkFkTWFuYWdlci5pc1Jld2FyZGVkVmlkZW9SZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICBGQkFkTWFuYWdlci5zaG93UmV3YXJkZWRWaWRlbygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmkq3mlL7mv4DlirHop4bpopHlub/lkYo6IOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5pKt5pS+5aSx6LSl77yaXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwiQWQgcGxheWJhY2sgZmFpbGVkIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5bm/5ZGK5pyq5Yqg6L2977yBXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIlZpZGVvIGFkIG5vdCBsb2FkZWQgc3VjY2Vzc2Z1bGx577yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmj5LlsY9cclxuICAgICAqIDIwMDFcdOinpuWPkemikeeOh+mZkOWItlx05bCP56iL5bqP5ZCv5Yqo5LiA5a6a5pe26Ze05YaF5LiN5YWB6K645bGV56S65o+S5bGP5bm/5ZGKXHJcbiAgICAgKiAyMDAyXHTop6blj5HpopHnjofpmZDliLZcdOi3neemu+Wwj+eoi+W6j+aPkuWxj+W5v+WRiuaIluiAhea/gOWKseinhumikeW5v+WRiuS4iuasoeaSreaUvuaXtumXtOmXtOmalOS4jei2s++8jOS4jeWFgeiuuOWxleekuuaPkuWxj+W5v+WRilxyXG4gICAgICogMjAwM1x06Kem5Y+R6aKR546H6ZmQ5Yi2XHTlvZPliY3mraPlnKjmkq3mlL7mv4DlirHop4bpopHlub/lkYrmiJbogIXmj5LlsY/lub/lkYrvvIzkuI3lhYHorrjlho3mrKHlsZXnpLrmj5LlsY/lub/lkYpcclxuICAgICAqIDIwMDRcdOW5v+WRiua4suafk+Wksei0pVx06K+l6aG56ZSZ6K+v5LiN5piv5byA5Y+R6ICF55qE5byC5bi45oOF5Ya177yM5oiW5Zug5bCP56iL5bqP6aG16Z2i5YiH5o2i5a+86Ie05bm/5ZGK5riy5p+T5aSx6LSlXHJcbiAgICAgKiAyMDA1XHTlub/lkYrosIPnlKjlvILluLhcdOaPkuWxj+W5v+WRiuWunuS+i+S4jeWFgeiuuOi3qOmhtemdouiwg+eUqFxyXG4gICAgICog6ZSA5q+B5o+S5bGP5bm/5ZGK5ZCO5omN6IO96YeN5paw5Yib5bu6XHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRmFjZUJvb2spIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5kZWxheUNhbGwodGhpcy5fY3JlYXRlSW5zdGVyc3RpdGlhbC5iaW5kKHRoaXMpLCB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lIHx8IDApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUluc3RlcnN0aXRpYWwuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfaXNTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgX2NyZWF0ZUluc3RlcnN0aXRpYWwoKSB7XHJcbiAgICAgICAgaWYgKEZCQWRNYW5hZ2VyLmlzSW50ZXJzdGl0aWFsQWRSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgIEZCQWRNYW5hZ2VyLnNob3dJbnRlcnN0aXRpYWxBZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaSreaUvuaPkuWxj+W5v+WRijog5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmkq3mlL7mj5LlsY/lub/lkYo6IOWksei0pe+8jOWOn+WboDogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5rKh5pyJ5Yqg6L295oiQ5Yqf77yBXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=