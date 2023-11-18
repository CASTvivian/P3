
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentWiFi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a74c2u0w9xBuLKuXchK/Ass', 'AdAgentWiFi');
// common-plugin/Scripts/AdAgentWiFi.ts

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
var AdAgentWiFi = /** @class */ (function (_super) {
    __extends(AdAgentWiFi, _super);
    function AdAgentWiFi() {
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
        _this.wuji = window.wuji;
        _this._bannerShow = true;
        _this._showBannerTimerId = 0;
        return _this;
    }
    AdAgentWiFi.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsWiFi) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._sysData = Utils_1.utils.wifiTool.getSystemInfo();
            }, this);
        }
    };
    Object.defineProperty(AdAgentWiFi.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.wifiTool.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentWiFi.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            Utils_1.utils.showLog("初始化视频!");
            var example = {
                adUnitId: '',
            };
            this._videoAd = this.wuji.createRewardedVideoAd(example);
            this._videoAd.onLoad(function () {
                Utils_1.utils.showLog('激励视频加载完成');
                _this._videoAd
                    .show()
                    .then(function () { return Utils_1.utils.showLog('激励视频展示成功'); })
                    .catch(function (err) {
                    Utils_1.utils.showLog('激励视频展示失败', err);
                    // 可以手动加载一次
                    _this._videoAd
                        .load()
                        .then(function () {
                        Utils_1.utils.showLog("手动加载成功");
                        // 加载成功后需要再显示广告
                        return _this._videoAd.show();
                    });
                });
            });
            this._videoAd.onError(function (err) {
                Utils_1.utils.showLog('激励视频错误', err);
                if (_this._videoCallback) {
                    _this._videoCallback(false, "暂无视频广告!");
                    _this._videoCallback = null;
                }
            });
            this._videoAd.onClose(function (res) {
                _this._isVideoShow = false;
                if (res.isEnded) {
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
    };
    AdAgentWiFi.prototype._createBanner = function (location, args) {
        var _this = this;
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWiFi) {
            var _a = this._sysData, windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
            var targetBannerAdWidth = windowWidth - 20;
            var example = {
                adUnitId: '',
                style: {
                    top: windowHeight,
                    left: (windowWidth - targetBannerAdWidth) / 2,
                    width: targetBannerAdWidth,
                }
            };
            this._curBannerAd = this.wuji.createBannerAd(example);
            this._curBannerAd.onLoad(function () {
                _this._curBannerAd.show()
                    .then(function () { return Utils_1.utils.showLog('banner ad 展示成功'); })
                    .catch(function (err) { return Utils_1.utils.showLog(err); });
            });
        }
    };
    AdAgentWiFi.prototype._showBannerTimer = function (location, args) {
        var locationTmp = location;
        var argsTmp = args;
        this._createBanner(locationTmp, argsTmp);
    };
    AdAgentWiFi.prototype.ShowInterstitial = function () {
        Utils_1.utils.showLog("连尚小游戏没有插屏广告！");
    };
    AdAgentWiFi.prototype.ShowBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsWiFi) {
            if (this.ServerConfig) {
                var locationTmp = location;
                var argsTmp = args;
                var interval = 30;
                if (this.ServerConfig.refresh_ad_time) {
                    interval = this.ServerConfig.refresh_ad_time;
                }
                Utils_1.utils.showLog("\u663E\u793ABanner\u5E7F\u544A\uFF01location:" + locationTmp + "; args:" + JSON.stringify(argsTmp) + "; \u95F4\u9694\u65F6\u95F4:" + this.ServerConfig.refresh_ad_time);
                var _a = this._sysData, windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
                var targetBannerAdWidth = windowWidth - 20;
                var example = {
                    adUnitId: '',
                    adIntervals: interval,
                    style: {
                        top: windowHeight,
                        left: (windowWidth - targetBannerAdWidth) / 2,
                        width: targetBannerAdWidth,
                    }
                };
                if (this._curBannerAd) {
                    this._curBannerAd.offLoad();
                    this._curBannerAd.destroy();
                }
                this._curBannerAd = this.wuji.createBannerAd(example);
                this._curBannerAd.onLoad(function () {
                    _this._curBannerAd.show()
                        .then(function () { return Utils_1.utils.showLog('banner ad 展示成功'); })
                        .catch(function (err) { return Utils_1.utils.showLog(err); });
                });
            }
            else {
                Utils_1.utils.showLog("服务器配置数据未初始化!");
            }
        }
    };
    AdAgentWiFi.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsWiFi) {
            Utils_1.utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            if (this._curBannerAd) {
                this._curBannerAd.hide();
            }
        }
    };
    AdAgentWiFi.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsWiFi) {
            this._videoCallback = callback;
            this._isVideoShow = true;
            if (!this._videoAd) {
                this._initVideoAd();
            }
            else {
                this._videoAd.load();
            }
        }
    };
    AdAgentWiFi = __decorate([
        ccclass
    ], AdAgentWiFi);
    return AdAgentWiFi;
}(AdAgent_1.default));
exports.default = AdAgentWiFi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFdpRmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUErQztBQUMvQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFPO0lBQWhEO1FBQUEscUVBa01DO1FBaE1HLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsa0JBQVksR0FBUSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsYUFBTyxHQUFRLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFFN0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBWTtRQUNaLFVBQUksR0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBNEd4QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qix3QkFBa0IsR0FBVyxDQUFDLENBQUM7O0lBd0VuQyxDQUFDO0lBcExVLDBCQUFJLEdBQVg7UUFBQSxpQkFNQztRQUxHLElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbEIsYUFBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUMxQixLQUFJLENBQUMsUUFBUSxHQUFHLGFBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDbkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBR0Qsc0JBQVcscUNBQVk7YUFBdkI7WUFDSSxPQUFPLGFBQUssQ0FBQyxRQUFRLENBQUMs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QztrQkFsTW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRXaUZpIGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgX3N5c0RhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfY3VyQmFubmVyQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9BZDogYW55ID0gbnVsbDtcclxuICAgIF9pbnNlcnRBZDogYW55ID0gbnVsbDtcclxuICAgIF9vbGRBZDogYW55ID0gbnVsbDtcclxuICAgIF9hcHBCb3g6IGFueSA9IG51bGw7IC8v5ri45oiP55uS5a2Q5bm/5ZGKXHJcblxyXG4gICAgX3ZpZGVvQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIF9pc1ZpZGVvTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNWaWRlb1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgd3VqaTogYW55ID0gd2luZG93Lnd1amk7XHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zeXNEYXRhID0gdXRpbHMud2lmaVRvb2wuZ2V0U3lzdGVtSW5mbygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB1dGlscy53aWZpVG9vbC5TZXJ2ZXJDb25maWc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9pbml0VmlkZW9BZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIneWni+WMluinhumikSFcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhhbXBsZSA9IHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnJywgLy8g6K+l5a2X5q615b+F5Lyg77yM5YC85Y+v5Lul5YWI5Li656m6XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZCA9IHRoaXMud3VqaS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoZXhhbXBsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmv4DlirHop4bpopHliqDovb3lrozmiJAnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWRcclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR5bGV56S65oiQ5YqfJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a/gOWKseinhumikeWxleekuuWksei0pScsIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWPr+S7peaJi+WKqOWKoOi9veS4gOasoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaJi+WKqOWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliqDovb3miJDlip/lkI7pnIDopoHlho3mmL7npLrlub/lkYpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW9BZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR6ZSZ6K+vJywgZXJyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5r+A5Yqx6KeG6aKR5bm/5ZGK5a6M5oiQ77yM5Y+R5pS+5aWW5YqxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayh0cnVlLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmv4DlirHop4bpopHlub/lkYrlj5bmtojlhbPpl63vvIzkuI3lj5HmlL7lpZblirEnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuingueci+WujOinhumikeaJjeiDveiOt+W+l+WlluWKsSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfY3JlYXRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiwgYXJnczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXaUZpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgeyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0IH0gPSB0aGlzLl9zeXNEYXRhO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0QmFubmVyQWRXaWR0aCA9IHdpbmRvd1dpZHRoIC0gMjA7XHJcbiAgICAgICAgICAgIHZhciBleGFtcGxlID0ge1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6ICcnLCAgLy8g6K+l5a2X5q615b+F5Lyg77yM5L2G5piv5YC85Y+v5Lul5YWI5Li656m6XHJcbiAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93SGVpZ2h0LCAvLyDnva7kuo7lsY/luZXlupXpg6hcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2luZG93V2lkdGggLSB0YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDIsIC8vIOWxheS4rVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0YXJnZXRCYW5uZXJBZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaGVpZ2h0OiAyMDAsIC8vIOWuvemrmOavlOaYr+WbuuWumueahO+8jGhlaWdodOWAvOWPr+S4jeS8oFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckJhbm5lckFkID0gdGhpcy53dWppLmNyZWF0ZUJhbm5lckFkKGV4YW1wbGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJCYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyQmFubmVyQWQuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdXRpbHMuc2hvd0xvZygnYmFubmVyIGFkIOWxleekuuaIkOWKnycpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdXRpbHMuc2hvd0xvZyhlcnIpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24sIGFyZ3M6IGFueSkge1xyXG4gICAgICAgIGxldCBsb2NhdGlvblRtcDogQmFubmVyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBsZXQgYXJnc1RtcDogYW55ID0gYXJncztcclxuICAgICAgICB0aGlzLl9jcmVhdGVCYW5uZXIobG9jYXRpb25UbXAsIGFyZ3NUbXApXHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi6L+e5bCa5bCP5ri45oiP5rKh5pyJ5o+S5bGP5bm/5ZGK77yBXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9iYW5uZXJTaG93OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIF9zaG93QmFubmVyVGltZXJJZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvblRtcDogQmFubmVyTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIGxldCBhcmdzVG1wOiBhbnkgPSBhcmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSB0aGlzLlNlcnZlckNvbmZpZy5yZWZyZXNoX2FkX3RpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5pi+56S6QmFubmVy5bm/5ZGK77yBbG9jYXRpb246JHtsb2NhdGlvblRtcH07IGFyZ3M6JHtKU09OLnN0cmluZ2lmeShhcmdzVG1wKX07IOmXtOmalOaXtumXtDoke3RoaXMuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgeyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0IH0gPSB0aGlzLl9zeXNEYXRhO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEJhbm5lckFkV2lkdGggPSB3aW5kb3dXaWR0aCAtIDIwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4YW1wbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6ICcnLCAgLy8g6K+l5a2X5q615b+F5Lyg77yM5L2G5piv5YC85Y+v5Lul5YWI5Li656m6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRJbnRlcnZhbHM6IGludGVydmFsLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93SGVpZ2h0LCAvLyDnva7kuo7lsY/luZXlupXpg6hcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKHdpbmRvd1dpZHRoIC0gdGFyZ2V0QmFubmVyQWRXaWR0aCkgLyAyLCAvLyDlsYXkuK1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaGVpZ2h0OiAyMDAsIC8vIOWuvemrmOavlOaYr+WbuuWumueahO+8jGhlaWdodOWAvOWPr+S4jeS8oFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJCYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ckJhbm5lckFkLm9mZkxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyQmFubmVyQWQgPSB0aGlzLnd1amkuY3JlYXRlQmFubmVyQWQoZXhhbXBsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJCYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ckJhbm5lckFkLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB1dGlscy5zaG93TG9nKCdiYW5uZXIgYWQg5bGV56S65oiQ5YqfJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdXRpbHMuc2hvd0xvZyhlcnIpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6ZqQ6JeP5bm/5ZGK5p2hXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckJhbm5lckFkLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9TaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==