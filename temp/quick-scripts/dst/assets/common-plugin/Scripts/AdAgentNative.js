
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentNative.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85bc0uVF6ZG2rnWXIVvQWwZ', 'AdAgentNative');
// common-plugin/Scripts/AdAgentNative.ts

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
exports.NativeCallBack = void 0;
var AdAgent_1 = require("./AdAgent");
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_JNIMessage = "JNIMessage";
var ST_VideoCallback = "VideoCallback";
var AdAgentNative = /** @class */ (function (_super) {
    __extends(AdAgentNative, _super);
    function AdAgentNative() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._showBannerTimerId = 0;
        _this._showNativeIconTimerId = 0;
        return _this;
    }
    Object.defineProperty(AdAgentNative.prototype, "_className", {
        get: function () {
            return Utils_1.utils.Tool_Native.jniClassName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdAgentNative.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.Tool_Native.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    AdAgentNative.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeAndroid) {
            cc.game.on(ST_JNIMessage, function (event) {
                if (event.type == ST_VideoCallback) {
                    if (_this._videoCallback) {
                        if (event.ret == true) {
                            _this._videoCallback && _this._videoCallback(true);
                        }
                        else {
                            _this._videoCallback && _this._videoCallback(false, event.msg);
                        }
                        _this._videoCallback = null;
                    }
                }
            });
        }
    };
    AdAgentNative.prototype.ShowBanner = function (location, args, isTimeRefresh) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (isTimeRefresh === void 0) { isTimeRefresh = false; }
        if (PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.showLog("AdAgentNative ShowBanner");
            var interval_1 = 60;
            if (this.ServerConfig && this.ServerConfig.refresh_ad_time) {
                interval_1 = this.ServerConfig.refresh_ad_time;
            }
            var jsonObj = {};
            jsonObj.location = location;
            jsonObj.isTimeRefresh = isTimeRefresh ? "true" : "false";
            try {
                Utils_1.utils.showLog("调用banner Json >>>" + JSON.stringify(jsonObj));
                jsb.reflection.callStaticMethod(this._className, "showBanner", "(Ljava/lang/String;)V", JSON.stringify(jsonObj));
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
            clearInterval(this._showBannerTimerId);
            this._showBannerTimerId = setInterval(function () {
                Utils_1.utils.showLog("\u5B9A\u65F6\u5237\u65B0\u663E\u793ABanner\u5E7F\u544A\uFF01location:" + location + "; args:" + JSON.stringify(args) + "; \u95F4\u9694\u65F6\u95F4:" + interval_1);
                this.ShowBanner(location, args, true);
            }.bind(this), interval_1 * 1000);
        }
    };
    AdAgentNative.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        Utils_1.utils.showLog("AdAgentNative HideBanner");
        clearInterval(this._showBannerTimerId);
        jsb.reflection.callStaticMethod(this._className, "hideBanner", "(Ljava/lang/String;)V", location);
    };
    AdAgentNative.prototype.ShowInterstitial = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeAndroid) {
            try {
                var delayShowTime = 0.5;
                if (this.ServerConfig && this.ServerConfig.intersititia_delay_show_time) {
                    delayShowTime = this.ServerConfig.intersititia_delay_show_time;
                }
                Utils_1.utils.showLog("AdAgentNative ShowInterstitial 延迟", delayShowTime, "秒调用！");
                Utils_1.utils.delayCall(function () {
                    jsb.reflection.callStaticMethod(_this._className, "showInterstitial", "()V");
                }, delayShowTime);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
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
    AdAgentNative.prototype.showNativeTryGameWidget = function (params) {
        if (params === void 0) { params = null; }
        if (PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.showLog("AdAgentNative showNativeTryGameWidget=" + this.ServerConfig.show_native_icon_method);
            try {
                var interval_2 = 15;
                if (this.ServerConfig && this.ServerConfig.icon_jump_native) {
                    var iv = parseInt(this.ServerConfig.icon_jump_native);
                    if (iv > 3) {
                        interval_2 = iv;
                    }
                    else {
                        Utils_1.utils.showLog("悬浮ICON必须大于3秒，当前默认为15秒刷新");
                    }
                }
                if (this.ServerConfig.show_native_icon_method) {
                    var style = {};
                    "left" in params && (style.left = params.left);
                    "right" in params && (style.right = params.right);
                    "top" in params && (style.top = params.top);
                    "bottom" in params && (style.bottom = params.bottom);
                    "location" in params && (style.location = params.location);
                    style.winSizeWidth = cc.winSize.width;
                    style.winSizeHeight = cc.winSize.height;
                    // style.left = params.left != undefined ? params.left : -1;
                    // style.right = params.right != undefined ? params.right : -1;
                    // style.top = params.top != undefined ? params.top : -1;
                    // style.bottom = params.bottom != undefined ? params.bottom : -1;
                    // style.location = params.location != undefined ? params.location : -1;
                    jsb.reflection.callStaticMethod(Utils_1.utils.Tool_Native.jniClassName, this.ServerConfig.show_native_icon_method, "(Ljava/lang/String;)V", JSON.stringify(style));
                }
                else {
                    var x = 10;
                    var y = 250;
                    if (params) {
                        if (params.top != null) {
                            y = params.top;
                        }
                        else if (params.bottom != null) {
                            y = cc.winSize.height - params.bottom;
                        }
                        if (params.left != null) {
                            x = params.left;
                        }
                        else if (params.right != null) {
                            x = cc.winSize.width - params.right;
                        }
                    }
                    jsb.reflection.callStaticMethod(Utils_1.utils.Tool_Native.jniClassName, "showFloatIcon", "(II)V", x, y);
                }
                clearInterval(this._showNativeIconTimerId);
                this._showNativeIconTimerId = setInterval(function () {
                    Utils_1.utils.showLog("\u5B9A\u65F6\u5237\u65B0\u663E\u793A\u539F\u751F\u60AC\u6D6EICON\u5E7F\u544A\uFF01 args:" + params + "; \u95F4\u9694\u65F6\u95F4:" + interval_2);
                    this.showNativeTryGameWidget(params);
                }.bind(this), interval_2 * 1000);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
        }
    };
    AdAgentNative.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.showLog("AdAgentNative ShowVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showVideo", "()V");
            }
            catch (error) {
                Utils_1.utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    };
    AdAgentNative.prototype.showFullScreenVideo = function (callback) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.showLog("AdAgentNative showFullScreenVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showFullScreenVideo", "()V");
            }
            catch (error) {
                Utils_1.utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    };
    /**
    * 隐藏浮动试玩挂件
    */
    AdAgentNative.prototype.hideNativeTryGameWidget = function () {
        if (PlatUtils_1.default.IsNativeAndroid) {
            clearInterval(this._showNativeIconTimerId);
            jsb.reflection.callStaticMethod(this._className, "hideFloatIcon", "()V");
            return;
        }
    };
    AdAgentNative = __decorate([
        ccclass
    ], AdAgentNative);
    return AdAgentNative;
}(AdAgent_1.default));
exports.default = AdAgentNative;
var NativeCallBack = /** @class */ (function () {
    function NativeCallBack() {
    }
    /**
     *  1：播放完成
     *  2：播放失败
     *  3：无广告
     *
     */
    NativeCallBack.videoCallBack = function (result, msg) {
        console.log("视频广告回调函数 ------>result=", result, " msg=", msg);
        if (result == 1) {
            //播放成功
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: true });
        }
        else {
            //播放失败
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: false, msg: msg ? msg : "暂无视频！" });
        }
    };
    NativeCallBack.sendEvent = function (eventMsg) {
        Utils_1.utils.showLog("事件上报：" + eventMsg);
        Utils_1.utils.SendEvent(eventMsg);
    };
    NativeCallBack.sendEventNew = function (eventName, eventId, eventData) {
        Utils_1.utils.showLog("事件上报：" + eventName);
        if (Utils_1.utils.Tool_Native) {
            Utils_1.utils.Tool_Native.sendEventNew(eventName, eventId, eventData);
        }
    };
    /**
     * 上报插屏点击时间
     */
    NativeCallBack.reportInsertClick = function () {
        Utils_1.utils.showLog("上报插屏点击时间：" + Utils_1.utils.overPageInsertAdIsTouch);
        if (Utils_1.utils.overPageInsertAdIsTouch)
            return;
        Utils_1.utils.overPageInsertAdIsTouch = true;
        var time = (new Date().getTime() - Utils_1.utils.overPageShowTime) / 1000;
        var json = {};
        json.data = time;
        Utils_1.utils.SendEventNew("\u7ED3\u7B97\u9875\u9762-\u63D2\u5C4F\u70B9\u51FB\u65F6\u95F4", "overPageInsertAdTouch", JSON.stringify(json));
    };
    /**
     *
     * @param idCard
     * @param realName
     */
    NativeCallBack.realNameAuth = function (idCard, realName) {
        Utils_1.utils.showLog("realNameAuth>>>> #idCard=" + idCard + " #realName=" + realName);
        Utils_1.utils.Tool_Native.realNameAuth(idCard, realName, function (res, result) {
            Utils_1.utils.showLog("realNameAuth>>>>  #res=" + res + " #result=" + result);
            if (res) {
                if (result) {
                    var res_1 = JSON.parse(result);
                    switch (res_1.code) {
                        case 1:
                            Utils_1.utils.showMsg(res_1.msg);
                            Utils_1.utils.Tool_Native.realNameAuthResult(result);
                            break;
                        case 0:
                            if (res_1.nonage == "0") {
                                Utils_1.utils.setRealNameAuthLocalData("2");
                            }
                            else {
                                Utils_1.utils.setRealNameAuthLocalData("1");
                            }
                            Utils_1.utils._isRealNameAuth = true;
                            if (res_1.msg) {
                                Utils_1.utils.showMsg(res_1.msg);
                            }
                            Utils_1.utils.Tool_Native.realNameAuthResult(result);
                            Utils_1.utils.scheduleOnce(function () {
                                Utils_1.utils.emitRealNameAuthCloseEvent();
                            }, 0.5);
                            break;
                        case 2:
                            //未成年限制内，显示下线
                            Utils_1.utils.setRealNameAuthLocalData("2");
                            Utils_1.utils.Tool_Native.realNameAuthResult(result);
                            break;
                    }
                }
                else {
                    var result_1 = {};
                    result_1.code = "-1";
                    result_1.msg = "请求失败，请重新提交验证！";
                    Utils_1.utils.Tool_Native.realNameAuthResult(JSON.stringify(result_1));
                    Utils_1.utils.showMsg("请求失败，请重新提交验证！");
                }
            }
            else {
                Utils_1.utils.showMsg("请求失败，请重新提交验证！");
                var result_2 = {};
                result_2.code = "-1";
                result_2.msg = "请求失败，请重新提交验证！";
                Utils_1.utils.Tool_Native.realNameAuthResult(JSON.stringify(result_2));
            }
        });
    };
    return NativeCallBack;
}());
exports.NativeCallBack = NativeCallBack;
cc["NativeCallBack"] = NativeCallBack;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudE5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUF1RTtBQUN2RSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQU0sYUFBYSxHQUFXLFlBQVksQ0FBQztBQUMzQyxJQUFNLGdCQUFnQixHQUFXLGVBQWUsQ0FBQztBQUdqRDtJQUEyQyxpQ0FBTztJQUFsRDtRQUFBLHFFQThOQztRQXhOVyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQThCeEMsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBNkQvQiw0QkFBc0IsR0FBVyxDQUFDLENBQUM7O0lBNkh2QyxDQUFDO0lBNU5HLHNCQUFZLHFDQUFVO2FBQXRCO1lBQ0ksT0FBTyxhQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHVDQUFZO2FBQXZCO1lBQ0ksT0FBTyxhQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUlNLDRCQUFJLEdBQVg7UUFBQSxpQkFrQkM7UUFqQkcsSUFBSSxtQkFBUyxDQUFDLGVBQWUsRUFBRTtZQUUzQixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBQyxLQUFVO2dCQUNqQyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksZ0JBQWdCLEVBQUU7b0JBQ2hDLElBQUksS0FBSSxDQUFDLGNBQWMsRUFBRTt3QkFDckIsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTs0QkFDbkIsS0FBSSxDQUFDLGNBQWMsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLElB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UUFBTSxHQUFRLEVBQUUsQ0FBQztnQkFDckIsUUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLFFBQU0sQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFBO2dCQUM1QixhQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQTthQUMvRDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0F4R0EsQUF3R0MsSUFBQTtBQXhHWSx3Q0FBYztBQTBHM0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsY0FBYyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiwgQmFubmVyTG9jYXRpb25Ub1N0cmluZyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBTVF9KTklNZXNzYWdlOiBzdHJpbmcgPSBcIkpOSU1lc3NhZ2VcIjtcclxuY29uc3QgU1RfVmlkZW9DYWxsYmFjazogc3RyaW5nID0gXCJWaWRlb0NhbGxiYWNrXCI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50TmF0aXZlIGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgX2NsYXNzTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdXRpbHMuVG9vbF9OYXRpdmUuam5pQ2xhc3NOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZpZGVvQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLlRvb2xfTmF0aXZlLlNlcnZlckNvbmZpZztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcblxyXG4gICAgICAgICAgICBjYy5nYW1lLm9uKFNUX0pOSU1lc3NhZ2UsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PSBTVF9WaWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnJldCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrICYmIHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrICYmIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIGV2ZW50Lm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX3Nob3dCYW5uZXJUaW1lcklkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwsIGlzVGltZVJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJBZEFnZW50TmF0aXZlIFNob3dCYW5uZXJcIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IDYwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcucmVmcmVzaF9hZF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlZnJlc2hfYWRfdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQganNvbk9iajogYW55ID0ge307XHJcbiAgICAgICAgICAgIGpzb25PYmoubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAganNvbk9iai5pc1RpbWVSZWZyZXNoID0gaXNUaW1lUmVmcmVzaCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6LCD55SoYmFubmVyIEpzb24gPj4+XCIgKyBKU09OLnN0cmluZ2lmeShqc29uT2JqKSk7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuX2NsYXNzTmFtZSwgXCJzaG93QmFubmVyXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIEpTT04uc3RyaW5naWZ5KGpzb25PYmopKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3Nob3dCYW5uZXJUaW1lcklkKTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0Jhbm5lclRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDlrprml7bliLfmlrDmmL7npLpCYW5uZXLlub/lkYrvvIFsb2NhdGlvbjoke2xvY2F0aW9ufTsgYXJnczoke0pTT04uc3RyaW5naWZ5KGFyZ3MpfTsg6Ze06ZqU5pe26Ze0OiR7aW50ZXJ2YWx9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dCYW5uZXIobG9jYXRpb24sIGFyZ3MsIHRydWUpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIGludGVydmFsICogMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkFkQWdlbnROYXRpdmUgSGlkZUJhbm5lclwiKTtcclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zaG93QmFubmVyVGltZXJJZCk7XHJcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLl9jbGFzc05hbWUsIFwiaGlkZUJhbm5lclwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBsb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgU2hvd0ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5U2hvd1RpbWUgPSAwLjU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5U2hvd1RpbWUgPSB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfZGVsYXlfc2hvd190aW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkFkQWdlbnROYXRpdmUgU2hvd0ludGVyc3RpdGlhbCDlu7bov59cIiwgZGVsYXlTaG93VGltZSwgXCLnp5LosIPnlKjvvIFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZGVsYXlDYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuX2NsYXNzTmFtZSwgXCJzaG93SW50ZXJzdGl0aWFsXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXlTaG93VGltZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfc2hvd05hdGl2ZUljb25UaW1lcklkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICog5pi+56S65rWu56qX5bm/5ZGK5oyC5Lu2XHJcbiAgICAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICAgICogYGBgXHJcbiAgICAgICAgKiB7XHJcbiAgICAgICAgKiBncm91cDpzdHJpbmdcclxuICAgICAgICAqIGxlZnQ6bnVtYmVyXHJcbiAgICAgICAgKiBib3R0b206bnVtYmVyXHJcbiAgICAgICAgKiBzY2FsZTpudW1iZXJcclxuICAgICAgICAqIHBhcmVudDpjYy5Ob2RlXHJcbiAgICAgICAgKiB9XHJcbiAgICAgICAgKiBgYGBcclxuICAgICAgICAqIEByZXR1cm5zIOeUn+aIkOeahOe7hOS7tlxyXG4gICAgICAgICovXHJcbiAgICBwdWJsaWMgc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQocGFyYW1zOiBhbnkgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJBZEFnZW50TmF0aXZlIHNob3dOYXRpdmVUcnlHYW1lV2lkZ2V0PVwiICsgdGhpcy5TZXJ2ZXJDb25maWcuc2hvd19uYXRpdmVfaWNvbl9tZXRob2QpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gMTU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wX25hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdiA9IHBhcnNlSW50KHRoaXMuU2VydmVyQ29uZmlnLmljb25fanVtcF9uYXRpdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdiA+IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBpdjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5oKs5rWuSUNPTuW/hemhu+Wkp+S6jjPnp5LvvIzlvZPliY3pu5jorqTkuLoxNeenkuWIt+aWsFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5zaG93X25hdGl2ZV9pY29uX21ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZTogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIgaW4gcGFyYW1zICYmIChzdHlsZS5sZWZ0ID0gcGFyYW1zLmxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIGluIHBhcmFtcyAmJiAoc3R5bGUucmlnaHQgPSBwYXJhbXMucmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiBpbiBwYXJhbXMgJiYgKHN0eWxlLnRvcCA9IHBhcmFtcy50b3ApXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiBpbiBwYXJhbXMgJiYgKHN0eWxlLmJvdHRvbSA9IHBhcmFtcy5ib3R0b20pXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiIGluIHBhcmFtcyAmJiAoc3R5bGUubG9jYXRpb24gPSBwYXJhbXMubG9jYXRpb24pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLndpblNpemVXaWR0aCA9IGNjLndpblNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUud2luU2l6ZUhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlLmxlZnQgPSBwYXJhbXMubGVmdCAhPSB1bmRlZmluZWQgPyBwYXJhbXMubGVmdCA6IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlLnJpZ2h0ID0gcGFyYW1zLnJpZ2h0ICE9IHVuZGVmaW5lZCA/IHBhcmFtcy5yaWdodCA6IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlLnRvcCA9IHBhcmFtcy50b3AgIT0gdW5kZWZpbmVkID8gcGFyYW1zLnRvcCA6IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlLmJvdHRvbSA9IHBhcmFtcy5ib3R0b20gIT0gdW5kZWZpbmVkID8gcGFyYW1zLmJvdHRvbSA6IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlLmxvY2F0aW9uID0gcGFyYW1zLmxvY2F0aW9uICE9IHVuZGVmaW5lZCA/IHBhcmFtcy5sb2NhdGlvbiA6IC0xO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHV0aWxzLlRvb2xfTmF0aXZlLmpuaUNsYXNzTmFtZSwgdGhpcy5TZXJ2ZXJDb25maWcuc2hvd19uYXRpdmVfaWNvbl9tZXRob2QsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IDI1MDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwYXJhbXMudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IGNjLndpblNpemUuaGVpZ2h0IC0gcGFyYW1zLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ID0gY2Mud2luU2l6ZS53aWR0aCAtIHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh1dGlscy5Ub29sX05hdGl2ZS5qbmlDbGFzc05hbWUsIFwic2hvd0Zsb2F0SWNvblwiLCBcIihJSSlWXCIsIHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3Nob3dOYXRpdmVJY29uVGltZXJJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TmF0aXZlSWNvblRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5a6a5pe25Yi35paw5pi+56S65Y6f55Sf5oKs5rWuSUNPTuW5v+WRiu+8gSBhcmdzOiR7cGFyYW1zfTsg6Ze06ZqU5pe26Ze0OiR7aW50ZXJ2YWx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBpbnRlcnZhbCAqIDEwMDApO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBTaG93VmlkZW8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkFkQWdlbnROYXRpdmUgU2hvd1ZpZGVvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuX2NsYXNzTmFtZSwgXCJzaG93VmlkZW9cIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Z1bGxTY3JlZW5WaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiQWRBZ2VudE5hdGl2ZSBzaG93RnVsbFNjcmVlblZpZGVvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuX2NsYXNzTmFtZSwgXCJzaG93RnVsbFNjcmVlblZpZGVvXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOmakOiXj+a1ruWKqOivleeOqeaMguS7tlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBoaWRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3Nob3dOYXRpdmVJY29uVGltZXJJZCk7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5fY2xhc3NOYW1lLCBcImhpZGVGbG9hdEljb25cIiwgXCIoKVZcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF0aXZlQ2FsbEJhY2sge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIDHvvJrmkq3mlL7lrozmiJBcclxuICAgICAqICAy77ya5pKt5pS+5aSx6LSlXHJcbiAgICAgKiAgM++8muaXoOW5v+WRilxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdmlkZW9DYWxsQmFjayhyZXN1bHQ6IG51bWJlciwgbXNnPzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYrlm57osIPlh73mlbAgLS0tLS0tPnJlc3VsdD1cIiwgcmVzdWx0LCBcIiBtc2c9XCIsIG1zZyk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oiQ5YqfXHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChTVF9KTklNZXNzYWdlLCB7IHR5cGU6IFNUX1ZpZGVvQ2FsbGJhY2ssIHJldDogdHJ1ZSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aSreaUvuWksei0pVxyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoU1RfSk5JTWVzc2FnZSwgeyB0eXBlOiBTVF9WaWRlb0NhbGxiYWNrLCByZXQ6IGZhbHNlLCBtc2c6IG1zZyA/IG1zZyA6IFwi5pqC5peg6KeG6aKR77yBXCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2VuZEV2ZW50KGV2ZW50TXNnOiBzdHJpbmcpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5LqL5Lu25LiK5oql77yaXCIgKyBldmVudE1zZyk7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KGV2ZW50TXNnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZW5kRXZlbnROZXcoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50SWQ/OiBzdHJpbmcsIGV2ZW50RGF0YT86IHN0cmluZykge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLkuovku7bkuIrmiqXvvJpcIiArIGV2ZW50TmFtZSk7XHJcbiAgICAgICAgaWYgKHV0aWxzLlRvb2xfTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnNlbmRFdmVudE5ldyhldmVudE5hbWUsIGV2ZW50SWQsIGV2ZW50RGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXmj5LlsY/ngrnlh7vml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRJbnNlcnRDbGljaygpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5o+S5bGP54K55Ye75pe26Ze077yaXCIgKyB1dGlscy5vdmVyUGFnZUluc2VydEFkSXNUb3VjaCk7XHJcbiAgICAgICAgaWYgKHV0aWxzLm92ZXJQYWdlSW5zZXJ0QWRJc1RvdWNoKSByZXR1cm47XHJcbiAgICAgICAgdXRpbHMub3ZlclBhZ2VJbnNlcnRBZElzVG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIGxldCB0aW1lID0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdXRpbHMub3ZlclBhZ2VTaG93VGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGxldCBqc29uOiBhbnkgPSB7fTtcclxuICAgICAgICBqc29uLmRhdGEgPSB0aW1lO1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudE5ldyhg57uT566X6aG16Z2iLeaPkuWxj+eCueWHu+aXtumXtGAsIFwib3ZlclBhZ2VJbnNlcnRBZFRvdWNoXCIsIEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpZENhcmQgXHJcbiAgICAgKiBAcGFyYW0gcmVhbE5hbWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhbE5hbWVBdXRoKGlkQ2FyZCwgcmVhbE5hbWUpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwicmVhbE5hbWVBdXRoPj4+PiAjaWRDYXJkPVwiICsgaWRDYXJkICsgXCIgI3JlYWxOYW1lPVwiICsgcmVhbE5hbWUpO1xyXG4gICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnJlYWxOYW1lQXV0aChpZENhcmQsIHJlYWxOYW1lLCAocmVzLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlYWxOYW1lQXV0aD4+Pj4gICNyZXM9XCIgKyByZXMgKyBcIiAjcmVzdWx0PVwiICsgcmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhyZXMubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnJlYWxOYW1lQXV0aFJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMubm9uYWdlID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2V0UmVhbE5hbWVBdXRoTG9jYWxEYXRhKFwiMlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXRSZWFsTmFtZUF1dGhMb2NhbERhdGEoXCIxXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5faXNSZWFsTmFtZUF1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5tc2cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKHJlcy5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9OYXRpdmUucmVhbE5hbWVBdXRoUmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRSZWFsTmFtZUF1dGhDbG9zZUV2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyq5oiQ5bm06ZmQ5Yi25YaF77yM5pi+56S65LiL57q/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXRSZWFsTmFtZUF1dGhMb2NhbERhdGEoXCIyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9OYXRpdmUucmVhbE5hbWVBdXRoUmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29kZSA9IFwiLTFcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubXNnID0gXCLor7fmsYLlpLHotKXvvIzor7fph43mlrDmj5DkuqTpqozor4HvvIFcIlxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnJlYWxOYW1lQXV0aFJlc3VsdChKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLor7fmsYLlpLHotKXvvIzor7fph43mlrDmj5DkuqTpqozor4HvvIFcIilcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwi6K+35rGC5aSx6LSl77yM6K+36YeN5paw5o+Q5Lqk6aqM6K+B77yBXCIpXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5jb2RlID0gXCItMVwiO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1zZyA9IFwi6K+35rGC5aSx6LSl77yM6K+36YeN5paw5o+Q5Lqk6aqM6K+B77yBXCJcclxuICAgICAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnJlYWxOYW1lQXV0aFJlc3VsdChKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jY1tcIk5hdGl2ZUNhbGxCYWNrXCJdID0gTmF0aXZlQ2FsbEJhY2s7XHJcbiJdfQ==