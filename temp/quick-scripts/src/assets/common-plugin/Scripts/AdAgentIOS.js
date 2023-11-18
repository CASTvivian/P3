"use strict";
cc._RF.push(module, 'a8ee4bE81ZIGIvCtS1+v2nz', 'AdAgentIOS');
// common-plugin/Scripts/AdAgentIOS.ts

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
exports.NativeIosCallBack = void 0;
var AdAgent_1 = require("./AdAgent");
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_JNIMessage = "JNIMessage";
var ST_VideoCallback = "VideoCallback";
var AdAgentIOS = /** @class */ (function (_super) {
    __extends(AdAgentIOS, _super);
    function AdAgentIOS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._className = "JNIHelper";
        _this._videoCallback = null;
        _this._showBannerTimerId = 0;
        return _this;
    }
    Object.defineProperty(AdAgentIOS.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.Tool_IOS.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentIOS.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeIOS) {
            cc.game.on(ST_JNIMessage, function (event) {
                if (event.type == ST_VideoCallback) {
                    if (_this._videoCallback) {
                        if (!event.ret) {
                            _this._videoCallback(event.ret, event.message ? event.message : "视频播放失败！");
                        }
                        else {
                            _this._videoCallback(event.ret);
                        }
                    }
                }
            });
        }
    };
    AdAgentIOS.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsNativeIOS) {
            Utils_1.utils.showLog("AdAgentNative ShowBanner");
            // let interval: number = 18;
            // if (this.ServerConfig && this.ServerConfig.refresh_ad_time) {
            //     interval = this.ServerConfig.refresh_ad_time;
            // }
            // try {
            jsb.reflection.callStaticMethod(this._className, "showBanner:", YZ_Constant_1.BannerLocationToString(location));
            // } catch (error) {
            //     utils.showLog(error);
            // }
            // clearInterval(this._showBannerTimerId);
            // this._showBannerTimerId = setInterval(function () {
            //     utils.showLog(`定时刷新显示Banner广告！location:${location}; args:${JSON.stringify(args)}; 间隔时间:${interval}`);
            //     this.ShowBanner(location, args);
            // }.bind(this), interval * 1000);
        }
    };
    AdAgentIOS.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        clearInterval(this._showBannerTimerId);
        jsb.reflection.callStaticMethod(this._className, "hideBanner:", YZ_Constant_1.BannerLocationToString(location));
    };
    AdAgentIOS.prototype.ShowInterstitial = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeIOS) {
            try {
                var delayShowTime = 1;
                if (this.ServerConfig && this.ServerConfig.intersititia_delay_show_time) {
                    delayShowTime = this.ServerConfig.intersititia_delay_show_time;
                }
                Utils_1.utils.showLog("AdAgentNative ShowInterstitial 延迟", delayShowTime, "秒调用！");
                Utils_1.utils.delayCall(function () {
                    jsb.reflection.callStaticMethod(_this._className, "showInterstitial");
                }, delayShowTime);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
        }
    };
    AdAgentIOS.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsNativeIOS) {
            Utils_1.utils.showLog("AdAgentNative ShowVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showVideo");
            }
            catch (error) {
                Utils_1.utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    };
    AdAgentIOS.prototype.showFullScreenVideo = function (callback) {
        if (PlatUtils_1.default.IsNativeIOS) {
            Utils_1.utils.showLog("AdAgentNative ShowVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showFullScreenVideo");
            }
            catch (error) {
                Utils_1.utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    };
    AdAgentIOS = __decorate([
        ccclass
    ], AdAgentIOS);
    return AdAgentIOS;
}(AdAgent_1.default));
exports.default = AdAgentIOS;
var NativeIosCallBack = /** @class */ (function () {
    function NativeIosCallBack() {
    }
    /**
     *  1：播放完成
     *  2：播放失败
     *  3：无广告
     *
     */
    NativeIosCallBack.videoCallBack = function (result, msg) {
        Utils_1.utils.showLog("视频广告回调函数 ------>#result=" + result + " #msg=" + msg ? msg : "");
        if (result == "1") {
            //播放成功
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: true });
        }
        else {
            //播放失败
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: false, message: msg });
        }
    };
    return NativeIosCallBack;
}());
exports.NativeIosCallBack = NativeIosCallBack;
window["NativeIosCallBack"] = NativeIosCallBack;

cc._RF.pop();