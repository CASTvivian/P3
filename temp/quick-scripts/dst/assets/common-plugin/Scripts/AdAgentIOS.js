
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentIOS.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudElPUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUF1RTtBQUN2RSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQU0sYUFBYSxHQUFXLFlBQVksQ0FBQztBQUMzQyxJQUFNLGdCQUFnQixHQUFXLGVBQWUsQ0FBQztBQUdqRDtJQUF3Qyw4QkFBTztJQUEvQztRQUFBLHFFQW9IQztRQWxIVyxnQkFBVSxHQUFXLFdBQVcsQ0FBQztRQUVqQyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQTZCeEMsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDOztJQW1GbkMsQ0FBQztJQTdHRyxzQkFBVyxvQ0FBWTthQUF2QjtZQUNJLE9BQU8sYUFBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFHTSx5QkFBSSxHQUFYO1FBQUEsaUJBa0JDO1FBakJHLElBQUksbUJBQVMsQ0FBQyxXQUFXLEVBQUU7WUFFdkIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQUMsS0FBVTtnQkFDakMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLGdCQUFnQixFQUFFO29CQUNoQyxJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUNaLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDN0U7NkJBQU07NEJBQ0gs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Q0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZEFnZW50IGZyb20gXCIuL0FkQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24sIEJhbm5lckxvY2F0aW9uVG9TdHJpbmcgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgU1RfSk5JTWVzc2FnZTogc3RyaW5nID0gXCJKTklNZXNzYWdlXCI7XHJcbmNvbnN0IFNUX1ZpZGVvQ2FsbGJhY2s6IHN0cmluZyA9IFwiVmlkZW9DYWxsYmFja1wiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRBZ2VudElPUyBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuICAgIHByaXZhdGUgX2NsYXNzTmFtZTogc3RyaW5nID0gXCJKTklIZWxwZXJcIjtcclxuXHJcbiAgICBwcml2YXRlIF92aWRlb0NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5Ub29sX0lPUy5TZXJ2ZXJDb25maWc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuXHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oU1RfSk5JTWVzc2FnZSwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09IFNUX1ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LnJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhldmVudC5yZXQsIGV2ZW50Lm1lc3NhZ2UgPyBldmVudC5tZXNzYWdlIDogXCLop4bpopHmkq3mlL7lpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGV2ZW50LnJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcklkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJBZEFnZW50TmF0aXZlIFNob3dCYW5uZXJcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IDE4O1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpbnRlcnZhbCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gdHJ5IHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLl9jbGFzc05hbWUsIFwic2hvd0Jhbm5lcjpcIiwgQmFubmVyTG9jYXRpb25Ub1N0cmluZyhsb2NhdGlvbikpO1xyXG4gICAgICAgICAgICAvLyB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNsZWFySW50ZXJ2YWwodGhpcy5fc2hvd0Jhbm5lclRpbWVySWQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9zaG93QmFubmVyVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coYOWumuaXtuWIt+aWsOaYvuekukJhbm5lcuW5v+WRiu+8gWxvY2F0aW9uOiR7bG9jYXRpb259OyBhcmdzOiR7SlNPTi5zdHJpbmdpZnkoYXJncyl9OyDpl7TpmpTml7bpl7Q6JHtpbnRlcnZhbH1gKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuU2hvd0Jhbm5lcihsb2NhdGlvbiwgYXJncyk7XHJcbiAgICAgICAgICAgIC8vIH0uYmluZCh0aGlzKSwgaW50ZXJ2YWwgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLl9jbGFzc05hbWUsIFwiaGlkZUJhbm5lcjpcIiwgQmFubmVyTG9jYXRpb25Ub1N0cmluZyhsb2NhdGlvbikpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIFNob3dJbnRlcnN0aXRpYWwoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5U2hvd1RpbWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnICYmIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9kZWxheV9zaG93X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheVNob3dUaW1lID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJBZEFnZW50TmF0aXZlIFNob3dJbnRlcnN0aXRpYWwg5bu26L+fXCIsIGRlbGF5U2hvd1RpbWUsIFwi56eS6LCD55So77yBXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLmRlbGF5Q2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLl9jbGFzc05hbWUsIFwic2hvd0ludGVyc3RpdGlhbFwiKTtcclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5U2hvd1RpbWUpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkFkQWdlbnROYXRpdmUgU2hvd1ZpZGVvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuX2NsYXNzTmFtZSwgXCJzaG93VmlkZW9cIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Z1bGxTY3JlZW5WaWRlbyhjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiQWRBZ2VudE5hdGl2ZSBTaG93VmlkZW9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5fY2xhc3NOYW1lLCBcInNob3dGdWxsU2NyZWVuVmlkZW9cIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXRpdmVJb3NDYWxsQmFjayB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgMe+8muaSreaUvuWujOaIkFxyXG4gICAgICogIDLvvJrmkq3mlL7lpLHotKVcclxuICAgICAqICAz77ya5peg5bm/5ZGKXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB2aWRlb0NhbGxCYWNrKHJlc3VsdDogc3RyaW5nLCBtc2c6IHN0cmluZykge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLop4bpopHlub/lkYrlm57osIPlh73mlbAgLS0tLS0tPiNyZXN1bHQ9XCIgKyByZXN1bHQgKyBcIiAjbXNnPVwiICsgbXNnID8gbXNnIDogXCJcIik7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaIkOWKn1xyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoU1RfSk5JTWVzc2FnZSwgeyB0eXBlOiBTVF9WaWRlb0NhbGxiYWNrLCByZXQ6IHRydWUgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7lpLHotKVcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFNUX0pOSU1lc3NhZ2UsIHsgdHlwZTogU1RfVmlkZW9DYWxsYmFjaywgcmV0OiBmYWxzZSwgbWVzc2FnZTogbXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG53aW5kb3dbXCJOYXRpdmVJb3NDYWxsQmFja1wiXSA9IE5hdGl2ZUlvc0NhbGxCYWNrO1xyXG4iXX0=