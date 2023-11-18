"use strict";
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