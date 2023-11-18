
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Native.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60a05J5l1dBI6a10/Es1IiB', 'YZ_Tool_Native');
// common-plugin/Scripts/YZ_Tool_Native.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_DefaultServerConfig = "";
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
//  const ST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?";
//  const POST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?"
var YZ_Tool_Native = /** @class */ (function () {
    function YZ_Tool_Native() {
        this.className = "";
        this._serverConfig = null;
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        /**
         *  0：默认互推面板 1： 跳转到原生平台
         */
        this.moreGameShowType = 0;
        /**
         * 显示退出游戏弹窗的类型
         * 0：不弹窗 1:弹窗
         */
        this.showGameExitDialogType = 0;
        this.appList = "";
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
        this._gameExitDialogNode = null;
        this.deviceInfo = "";
        this._reloadTimes = 6;
        this._curloadTimes = 0;
    }
    Object.defineProperty(YZ_Tool_Native.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 当前版本号
    */
    YZ_Tool_Native.prototype.gameVersion = function () {
        return Utils_1.utils.config.nativeAndroidConfig.version;
    };
    Object.defineProperty(YZ_Tool_Native.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Native.prototype, "serviceId", {
        /**
         * 服务器返回UID
         */
        get: function () {
            if (this._service_uid != "0")
                return this._service_uid;
            this.reportLogin();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Native.prototype.reportLogin = function () {
        var _this = this;
        if (this.isReport)
            return;
        this.isReport = true;
        var self = this;
        var curTime = new Date().getTime();
        var interval = (curTime - this._reportLoginTime) / 1000;
        if (interval > 0 && interval < this._reportLoginInterval) {
            Utils_1.utils.showLog("\u4E0A\u62A5\u767B\u5F55\u83B7\u53D6UID\u5C0F\u4E8E\uFF1A" + this._reportLoginInterval + "\u79D2");
            return;
        }
        this._reportLoginTime = curTime;
        var method = "m=loginv2";
        var url = ST_ServerUrl + method + ("&device_data=" + encodeURI(this.deviceInfo));
        Utils_1.utils.commomHttpRequest(url, function (ret, data) {
            if (ret) {
                if (data) {
                    var result = JSON.parse(data);
                    Utils_1.utils.showLog(result);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        Utils_1.utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_SERVICE_UID, self._service_uid);
                    }
                    if (result.config) {
                        _this._serverConfig = Utils_1.utils.aesDecrypt(result.config);
                        _this.setLocalConfig(JSON.stringify(_this._serverConfig));
                    }
                }
            }
            else {
                Utils_1.utils.showLog("获取数据失败1");
            }
            _this.isReport = false;
        });
    };
    /**
     *
     * @param data 配置数据
     */
    YZ_Tool_Native.prototype.init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeAndroid) {
            ST_DefaultServerConfig = this.getNativeData();
            if (ST_DefaultServerConfig) {
                var data = JSON.parse(ST_DefaultServerConfig);
                this.deviceInfo = data.device_info;
                this.moreGameShowType = data.more_game_type;
                this.showGameExitDialogType = data.show_game_exit_dialog;
                this.appList = data.app_list;
            }
            else {
                Utils_1.utils.showLog("没有获取到本地数据，组件初始化失败！");
                return;
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._loadConfig();
            if (PlatUtils_1.default.IsNativeAndroid) {
                //初始化时监听返回按钮退出事件
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
                    if (event.keyCode == cc.macro.KEY.escape || event.keyCode == cc.macro.KEY.back) {
                        if (PlatUtils_1.default.IsNativeAndroid) {
                            if (_this.showGameExitDialogType == 1) {
                                _this.showGameExitDialog();
                            }
                            else {
                                _this.GameExit();
                            }
                        }
                    }
                }, this);
            }
        }
    };
    /**
     * 显示退出弹窗
     */
    YZ_Tool_Native.prototype.showGameExitDialog = function () {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (this._gameExitDialogNode && cc.isValid(this._gameExitDialogNode)) {
            Utils_1.utils.showLog("退出窗口还在。");
            return;
        }
        if (Utils_1.utils.config.otherconfig.gameExitDialog) {
            // if(utils.getRecommondGameList())
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.gameExitDialog);
            if (node) {
                if (this._gameExitDialogNode && cc.isValid(this._gameExitDialogNode)) {
                    this._gameExitDialogNode.destroy();
                }
                this._gameExitDialogNode = node;
                this._gameExitDialogNode.group = "default";
                cc.director.getScene().addChild(this._gameExitDialogNode, 9999);
            }
        }
        else {
            Utils_1.utils.showLog("warn:" + "未找到预制体 GameExitDialog, 请查看CommonUtils组件上是否赋值 !");
        }
    };
    YZ_Tool_Native.prototype.GameExit = function () {
        if (PlatUtils_1.default.IsNativeAndroid) {
            cc.log("AdAgentNative GameExit");
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "gameExit", "()V");
            }
            catch (error) {
                cc.log(error);
            }
        }
    };
    /**
     * 获取更多游戏显示的类型
     * 0：默认互推面板 1： 跳转到原生平台
     */
    YZ_Tool_Native.prototype.getMoreGameShowType = function () {
        try {
            this.moreGameShowType = jsb.reflection.callStaticMethod(this.jniClassName, "getMoreGameShowType", "()I");
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
     * 获取手机设备信息
     *
     */
    YZ_Tool_Native.prototype.getDeviceInfo = function () {
        try {
            this.deviceInfo = jsb.reflection.callStaticMethod(this.jniClassName, "getDeviceInfo", "()Ljava/lang/String;");
            Utils_1.utils.showLog("获取原生平台手机设备信息：" + this.deviceInfo);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
     * 跳转原生平台的更多游戏
     */
    YZ_Tool_Native.prototype.showMoreGames = function () {
        if (PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.showLog("AdAgentNative showMoreGame");
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "showNativeMoreGame", "()V");
            }
            catch (error) {
                cc.log(error);
            }
        }
    };
    YZ_Tool_Native.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=g" + ("&device_data=" + encodeURI(this.deviceInfo) + "&real_name_auth=" + Utils_1.utils.getRealNameAuthLocalData());
            this.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                _this._curloadTimes++;
                var recall = false;
                if (ret) {
                    Utils_1.utils.showLog("原生安卓服务器配置数据获取成功: data = " + data);
                    if (data) {
                        var result = JSON.parse(data);
                        if (result) {
                            if (!Utils_1.utils.DebugLoacalConfig) {
                                _this._serverConfig = result;
                                if (_this._serverConfig.is_show_log_view && _this._serverConfig.is_show_log_view == "true") {
                                    Utils_1.utils.showLogView = true;
                                }
                                if (result.more_game_type) {
                                    _this.moreGameShowType = result.more_game_type;
                                }
                                if (result.show_game_exit_dialog) {
                                    _this.showGameExitDialogType = result.show_game_exit_dialog;
                                }
                            }
                            else {
                                Utils_1.utils.showLog("开启了本地数据测试，使用本地配置!");
                            }
                        }
                        else {
                            Utils_1.utils.showLog("原生安卓服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("原生安卓服务器配置数据获取失败！");
                    if (_this._curloadTimes < _this._reloadTimes) {
                        Utils_1.utils.showLog("请求异常，重新拉取配置!");
                        recall = true;
                    }
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                if (recall) {
                    _this._loadConfig();
                }
                else if (!recall || _this._curloadTimes >= _this._reloadTimes) {
                    _this.setLocalConfig(JSON.stringify(_this._serverConfig));
                    Utils_1.utils.emitServerInitEvent();
                }
            });
        }
    };
    /**
     * 通用http请求，只封装了GET请求
     * @param url 请求的url地址
     * @param callback Function(ret:boolean, data:string)
     * 请求结束回调，成功ret为true, data为返回的数据string。 失败为ret为false, data为空
     */
    YZ_Tool_Native.prototype.commomHttpRequest = function (url, callback) {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        var completeCallback = callback;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 6000; // 单位毫秒
        var requestUrl = url + ("&kyx=false&app_id=" + Utils_1.utils.config.nativeAndroidConfig.appID + "&channel=" + Utils_1.utils.config.nativeAndroidConfig.channel + "&device_uid=" + Utils_1.utils.Tool_Native.uid + "&uid=" + Utils_1.utils.Tool_Native.serviceId + "&game_type=2&time_stamp=" + (new Date()).getTime() + "&game_version=" + Utils_1.utils.config.nativeAndroidConfig.version + "&reqv=" + YZ_Constant_1.default.SERVER_VERSION);
        Utils_1.utils.showLog("服务器地址:" + requestUrl);
        xhr.open('POST', requestUrl);
        xhr.send("app_list=" + this.appList);
        xhr.onreadystatechange = function () {
            Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        completeCallback(true, Utils_1.utils.aesDecrypt(xhr.responseText));
                    }
                }
                else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }
            if (xhr.status != 200) {
            }
        };
        xhr.ontimeout = function () {
            Utils_1.utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
        xhr.onerror = function (err) {
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
    };
    /**
     * 设置原生客户端数据数据
     * @param data
     */
    YZ_Tool_Native.prototype.setLocalConfig = function (data) {
        try {
            Utils_1.utils.showLog("设置原生客户端数据数据" + data);
            jsb.reflection.callStaticMethod(this.jniClassName, "setLocalConfig", "(Ljava/lang/String;)V", data);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
    * 获取原生客户端数据数据
    * @param data
    */
    YZ_Tool_Native.prototype.getNativeData = function () {
        var data = "";
        try {
            data = jsb.reflection.callStaticMethod(this.jniClassName, "getLocalConfig", "()Ljava/lang/String;");
            Utils_1.utils.showLog("获取原生客户端数据数据 : " + data);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
        return data;
    };
    /**
    *
    * @param id 跳转ID
    * @param callback 跳转回调
    */
    YZ_Tool_Native.prototype.navigateToGame = function (jsonData, callback, path) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "navigateToGame", "(Ljava/lang/String;)V", jsonData);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
        }
    };
    Object.defineProperty(YZ_Tool_Native.prototype, "jniClassName", {
        /**
         * 获取JNI类名
         */
        get: function () {
            if (this.className)
                return this.className;
            try {
                this.className = jsb.reflection.callStaticMethod("aa.b.c.a", "a", "()Ljava/lang/String;");
            }
            catch (error) {
            }
            return this.className;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 获取交叉推广数据
    */
    YZ_Tool_Native.prototype.getRecommondGameList = function () {
        if (PlatUtils_1.default.IsNativeAndroid
            && Utils_1.utils.Tool_Native
            && Utils_1.utils.Tool_Native.ServerConfig) {
            return Utils_1.utils.Tool_Native.ServerConfig.jump_list;
        }
        return null;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Native.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=rlevel";
            var url = POST_ServerUrl + method + ("&level_id=" + level + "&level_name=" + encodeURI(levelName) + "&status=" + status);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("关卡数据上报成功！");
                    // if (status == LevelStatus.GameStart) {
                    //     utils.showLog("配置数据获取成功: data = " + data);
                    //     if (data) {
                    //         let result = JSON.parse(data);
                    //         if (result) {
                    //             let keys = Object.keys(result);
                    //             for (let key in keys) {
                    //                 this._serverConfig[key] = result[key];
                    //                 utils.showLog("覆盖：#key=" + key, " #value=", result[key]);
                    //             }
                    //         }
                    //     }
                    // } else {
                    //     utils.showLog("OPPO服务器配置数据获取失败, 使用本地配置!");
                    // }
                }
                else {
                    Utils_1.utils.showLog("关卡数据上报失败！");
                }
            }.bind(this));
        }
    };
    /**
   * 上报互推组件显示位置
   * @param otherGameAppId 跳转的ID
   * @param location 当前位置
   * @param status 0:点击，1:跳转成功
   */
    YZ_Tool_Native.prototype.postRecommentShowData = function (location) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=rjumpshow";
            var url = ST_ServerUrl + method + ("&location=" + location);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("上报互推组件显示位置成功！");
                }
                else {
                    Utils_1.utils.showLog("上报互推组件显示位置失败！");
                }
            }.bind(this));
        }
    };
    /**
     * 上报互推组件数据
     * @param otherGameAppId 跳转的ID
     * @param location 当前位置
     * @param status 0:点击，1:跳转成功
     */
    YZ_Tool_Native.prototype.postDataByLocation = function (otherGameAppId, location, status) {
        if (status === void 0) { status = 0; }
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=rjump";
            var url = POST_ServerUrl + method + ("&jump_app_id=" + otherGameAppId + "&location=" + location + "&status=" + status);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("\u6570\u636E\u4E0A\u62A5\u6210\u529F");
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    };
    /**
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Native.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=revent";
            var url = POST_ServerUrl + method + ("&event=" + encodeURI(eventName));
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("上报自定义事件成功！");
                }
                else {
                    Utils_1.utils.showLog("上报自定义事件失败！");
                }
            }.bind(this));
        }
    };
    /**
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Native.prototype.sendEventNew = function (eventName, eventId, eventData, isCallBack) {
        var _this = this;
        if (eventId === void 0) { eventId = "default"; }
        if (isCallBack === void 0) { isCallBack = true; }
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=reventv2";
            var url = POST_ServerUrl + method + ("&event=" + encodeURI(eventName) + "&event_id=" + eventId);
            if (eventData) {
                url += "&event_data=" + encodeURI(eventData);
            }
            Utils_1.utils.showLog("自定义事件上报URL：" + url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("上报自定义事件成功！");
                    isCallBack && _this.callBackToEvent(data);
                }
                else {
                    Utils_1.utils.showLog("上报自定义事件失败！");
                    isCallBack && _this.callBackToEvent("false");
                }
            });
        }
    };
    /**
   * 上报自定义事件
   * @param level 当前关卡ID
   * @param levelName 关卡名称
   * @param status 状态
   */
    YZ_Tool_Native.prototype.sendEventV3 = function (eventName, eventId, eventData) {
        var _this = this;
        if (eventId === void 0) { eventId = "default"; }
        if (PlatUtils_1.default.IsNativeAndroid) {
            var method = "m=reventv2";
            var url = POST_ServerUrl + method + ("&event=" + encodeURI(eventName) + "&event_id=" + eventId);
            if (eventData) {
                url += "&event_data=" + encodeURI(eventData);
            }
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("上报自定义事件成功！");
                    _this.callBackToEvent(data);
                }
                else {
                    Utils_1.utils.showLog("上报自定义事件失败！");
                    _this.callBackToEvent("false");
                }
            });
        }
    };
    /**
     * 返回事件上报的结果给安卓端
     * @param result
     */
    YZ_Tool_Native.prototype.callBackToEvent = function (result) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            //@ts-ignore
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "callBackToEvent", "(Ljava/lang/String;)V", result);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
        }
    };
    /**
      * 弹出提示框
      * @param msg 消息
      */
    YZ_Tool_Native.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsNativeAndroid) {
            //@ts-ignore
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "showToast", "(Ljava/lang/String;)V", msg);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
        }
    };
    /**
     * 显示隐私协议页面
     */
    YZ_Tool_Native.prototype.showPrivacyAgreement = function () {
        try {
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "showPrivacyAgreement", "()V");
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    YZ_Tool_Native.prototype.showRealNameAuthPanel = function (parmes) {
        try {
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "showRealNameAuthPanel", "(Ljava/lang/String;)V", parmes);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    YZ_Tool_Native.prototype.realNameAuthResult = function (parmes) {
        try {
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "realNameAuthResult", "(Ljava/lang/String;)V", parmes);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
     * 实名认证
     */
    YZ_Tool_Native.prototype.realNameAuth = function (code, name, callBack) {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        var method = "m=realNameAuth";
        var completeCallback = callBack;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 15000; // 单位毫秒
        var requestUrl = "https://apps.youlesp.com/gss?" + method + ("&time_stamp=" + (new Date()).getTime());
        var data = {};
        data.kyx = false;
        data.app_id = Utils_1.utils.config.nativeAndroidConfig.appID;
        data.channel = Utils_1.utils.config.nativeAndroidConfig.channel;
        data.device_uid = Utils_1.utils.Tool_Native.uid;
        data.uid = Utils_1.utils.Tool_Native.serviceId;
        data.game_type = 2;
        data.device_data = this.deviceInfo;
        data.game_version = Utils_1.utils.config.nativeAndroidConfig.version;
        data.reqv = YZ_Constant_1.default.SERVER_VERSION;
        data.app_list = this.appList;
        data.id_card = code;
        data.real_name = name;
        Utils_1.utils.showLog("服务器地址:" + requestUrl);
        Utils_1.utils.showLog("请求参数:" + JSON.stringify(data));
        var requestData = JSON.stringify(data);
        xhr.open('POST', requestUrl);
        xhr.send("json_data=" + Utils_1.utils.aesEncrypt(requestData));
        Utils_1.utils.showLog("json_data=:" + Utils_1.utils.aesEncrypt(requestData));
        xhr.onreadystatechange = function () {
            Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        completeCallback(true, Utils_1.utils.aesDecrypt(xhr.responseText));
                    }
                }
                else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }
            if (xhr.status != 200) {
            }
        };
        xhr.ontimeout = function () {
            Utils_1.utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
        xhr.onerror = function (err) {
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
    };
    /**
      * 友盟游戏开始上报
      * @param levelID
      */
    YZ_Tool_Native.prototype.umaOnStart = function (levelID) {
        if (!this.checkUmeng())
            return;
        this.umaTrackEvent("level", "um_plus_game_level", {
            game_level: levelID,
            game_states: "0"
        });
    };
    /**
     *
     * @returns 是否开启友盟
     */
    YZ_Tool_Native.prototype.checkUmeng = function () {
        // if (!utils.config.oppoconfig.umengId) {
        //     return false;
        // }
        return true;
    };
    /**
     * 友盟结算上报
     * @param levelID 关卡id
     * @param stageId
     * @param event
     */
    YZ_Tool_Native.prototype.umaReportedLevel = function (levelID, event) {
        if (!this.checkUmeng())
            return;
        var status = 1;
        if (event == YZ_Constant_1.LevelStatus.GameFail) {
            status = -1;
        }
        this.umaTrackEvent("level", "um_plus_game_level", {
            game_level: levelID,
            game_states: "" + status
        });
    };
    /**
     * 友盟自定义事件
     * @param eventId 事件ID，注意：事件ID必须要在后台配置
     * @param params 事件内容
     */
    YZ_Tool_Native.prototype.umaTrackEvent = function (eventType, eventId, params) {
        if (eventType === void 0) { eventType = "custom"; }
        if (!this.checkUmeng())
            return;
        try {
            if (params) {
                params = JSON.stringify(params);
            }
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "umaTrackEvent", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", eventType, eventId, params);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    YZ_Tool_Native = __decorate([
        ccclass
    ], YZ_Tool_Native);
    return YZ_Tool_Native;
}());
exports.default = YZ_Tool_Native;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9OYXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUF5RDtBQUN6RCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFDeEMsSUFBTSxZQUFZLEdBQVcsOEJBQThCLENBQUM7QUFDNUQsSUFBTSxjQUFjLEdBQVcsZ0NBQWdDLENBQUE7QUFHL0QsZ0ZBQWdGO0FBQ2hGLGlGQUFpRjtBQUlqRjtJQUFBO1FBRVcsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUU5QixrQkFBYSxHQUFRLElBQUksQ0FBQztRQVkxQixPQUFPO1FBQ1AsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQVFuQixVQUFVO1FBQ1YsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFXM0I7O1dBRUc7UUFDSCxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0I7OztXQUdHO1FBQ0gsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBQ25DLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFFckIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBc0YxQix3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUF5RHBDLGVBQVUsR0FBVyxFQUFFLENBQUM7UUF5RnhCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO0lBdWQ5QixDQUFDO0lBOXVCRyxzQkFBVyx3Q0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVEOztNQUVFO0lB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YUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUE1dUJnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBbXZCbEM7SUFBRCxxQkFBQztDQW52QkQsQUFtdkJDLElBQUE7a0JBbnZCb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9cIjtcclxuY29uc3QgUE9TVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovL3JlcG9ydC55b3VsZXNwLmNvbS9nc3M/XCJcclxuXHJcblxyXG4vLyAgY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly8xOTIuMTY4LjMxLjM5OjgwODAvR2FtZUJveFNlcnZlci9nc3M/XCI7XHJcbi8vICBjb25zdCBQT1NUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vMTkyLjE2OC4zMS4zOTo4MDgwL0dhbWVCb3hTZXJ2ZXIvZ3NzP1wiXHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF9OYXRpdmUge1xyXG5cclxuICAgIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgX3NlcnZlckNvbmZpZzogYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW9k+WJjeeJiOacrOWPt1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy52ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+5aSHVUlEXHJcbiAgICBfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVpZCgpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl91aWQ7XHJcbiAgICAgICAgLy8gdGhpcy5fbG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mnI3liqHlmajov5Tlm55VSURcclxuICAgIF9zZXJ2aWNlX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnI3liqHlmajov5Tlm55VSURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXJ2aWNlSWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fc2VydmljZV91aWQ7XHJcbiAgICAgICAgdGhpcy5yZXBvcnRMb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAw77ya6buY6K6k5LqS5o6o6Z2i5p2/IDHvvJog6Lez6L2s5Yiw5Y6f55Sf5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIG1vcmVHYW1lU2hvd1R5cGU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrpgIDlh7rmuLjmiI/lvLnnqpfnmoTnsbvlnotcclxuICAgICAqIDDvvJrkuI3lvLnnqpcgMTrlvLnnqpdcclxuICAgICAqL1xyXG4gICAgc2hvd0dhbWVFeGl0RGlhbG9nVHlwZTogbnVtYmVyID0gMDtcclxuICAgIGFwcExpc3Q6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fcmVwb3J0TG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDkuIrmiqXnmbvlvZXojrflj5ZVSUTlsI/kuo7vvJoke3RoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJtPWxvZ2ludjJcIjtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBTVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmRldmljZV9kYXRhPSR7ZW5jb2RlVVJJKHRoaXMuZGV2aWNlSW5mbyl9YDtcclxuXHJcbiAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3NlcnZpY2VfdWlkID0gXCJcIiArIHJlc3VsdC51aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajor7fmsYLnmbvlvZXmiJDlip8hIF9zZXJ2aWNlX3VpZD1cIiArIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQsIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gdXRpbHMuYWVzRGVjcnlwdChyZXN1bHQuY29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbENvbmZpZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXJ2ZXJDb25maWcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5pWw5o2u5aSx6LSlMVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuXHJcbiAgICAgICAgICAgIFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSB0aGlzLmdldE5hdGl2ZURhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChTVF9EZWZhdWx0U2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YTogYW55ID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlSW5mbyA9IGRhdGEuZGV2aWNlX2luZm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vcmVHYW1lU2hvd1R5cGUgPSBkYXRhLm1vcmVfZ2FtZV90eXBlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R2FtZUV4aXREaWFsb2dUeXBlID0gZGF0YS5zaG93X2dhbWVfZXhpdF9kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcExpc3QgPSBkYXRhLmFwcF9saXN0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuayoeacieiOt+WPluWIsOacrOWcsOaVsOaNru+8jOe7hOS7tuWIneWni+WMluWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IFwiMFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRDb25maWcoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5pe255uR5ZCs6L+U5Zue5oyJ6ZKu6YCA5Ye65LqL5Lu2XHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gY2MubWFjcm8uS0VZLmVzY2FwZSB8fCBldmVudC5rZXlDb2RlID09IGNjLm1hY3JvLktFWS5iYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93R2FtZUV4aXREaWFsb2dUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHYW1lRXhpdERpYWxvZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVFeGl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2dhbWVFeGl0RGlhbG9nTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuumAgOWHuuW8ueeql1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dHYW1lRXhpdERpYWxvZygpIHtcclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6YCA5Ye656qX5Y+j6L+Y5Zyo44CCXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLmdhbWVFeGl0RGlhbG9nKSB7XHJcbiAgICAgICAgICAgIC8vIGlmKHV0aWxzLmdldFJlY29tbW9uZEdhbWVMaXN0KCkpXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLmdhbWVFeGl0RGlhbG9nKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lRXhpdERpYWxvZ05vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9nYW1lRXhpdERpYWxvZ05vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVFeGl0RGlhbG9nTm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lRXhpdERpYWxvZ05vZGUuZ3JvdXAgPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlLCA5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgR2FtZUV4aXREaWFsb2csIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC8ICFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2FtZUV4aXQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiQWRBZ2VudE5hdGl2ZSBHYW1lRXhpdFwiKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5qbmlDbGFzc05hbWUsIFwiZ2FtZUV4aXRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluabtOWkmua4uOaIj+aYvuekuueahOexu+Wei1xyXG4gICAgICogMO+8mum7mOiupOS6kuaOqOmdouadvyAx77yaIOi3s+i9rOWIsOWOn+eUn+W5s+WPsFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vcmVHYW1lU2hvd1R5cGUoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5tb3JlR2FtZVNob3dUeXBlID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmpuaUNsYXNzTmFtZSwgXCJnZXRNb3JlR2FtZVNob3dUeXBlXCIsIFwiKClJXCIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGRldmljZUluZm86IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaJi+acuuiuvuWkh+S/oeaBr1xyXG4gICAgICogIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERldmljZUluZm8oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5kZXZpY2VJbmZvID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmpuaUNsYXNzTmFtZSwgXCJnZXREZXZpY2VJbmZvXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bljp/nlJ/lubPlj7DmiYvmnLrorr7lpIfkv6Hmga/vvJpcIiArIHRoaXMuZGV2aWNlSW5mbyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5Y6f55Sf5bmz5Y+w55qE5pu05aSa5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93TW9yZUdhbWVzKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJBZEFnZW50TmF0aXZlIHNob3dNb3JlR2FtZVwiKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5qbmlDbGFzc05hbWUsIFwic2hvd05hdGl2ZU1vcmVHYW1lXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbG9hZENvbmZpZygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIm09Z1wiICsgYCZkZXZpY2VfZGF0YT0ke2VuY29kZVVSSSh0aGlzLmRldmljZUluZm8pfSZyZWFsX25hbWVfYXV0aD0ke3V0aWxzLmdldFJlYWxOYW1lQXV0aExvY2FsRGF0YSgpfWA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VybG9hZFRpbWVzKys7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjYWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+WuieWNk+acjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluaIkOWKnzogZGF0YSA9IFwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19zaG93X2xvZ192aWV3ICYmIHRoaXMuX3NlcnZlckNvbmZpZy5pc19zaG93X2xvZ192aWV3ID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2dWaWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5tb3JlX2dhbWVfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmVHYW1lU2hvd1R5cGUgPSByZXN1bHQubW9yZV9nYW1lX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNob3dfZ2FtZV9leGl0X2RpYWxvZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHYW1lRXhpdERpYWxvZ1R5cGUgPSByZXN1bHQuc2hvd19nYW1lX2V4aXRfZGlhbG9nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWQr+S6huacrOWcsOaVsOaNrua1i+ivle+8jOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5a6J5Y2T5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+WuieWNk+acjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VybG9hZFRpbWVzIDwgdGhpcy5fcmVsb2FkVGltZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axguW8guW4uO+8jOmHjeaWsOaLieWPlumFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacrOWcsOmFjee9rueahOW5v+WRiklEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghcmVjYWxsIHx8IHRoaXMuX2N1cmxvYWRUaW1lcyA+PSB0aGlzLl9yZWxvYWRUaW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxDb25maWcoSlNPTi5zdHJpbmdpZnkodGhpcy5fc2VydmVyQ29uZmlnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9yZWxvYWRUaW1lczogbnVtYmVyID0gNjtcclxuICAgIF9jdXJsb2FkVGltZXM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOmAmueUqGh0dHDor7fmsYLvvIzlj6rlsIHoo4XkuoZHRVTor7fmsYJcclxuICAgICAqIEBwYXJhbSB1cmwg6K+35rGC55qEdXJs5Zyw5Z2AXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24ocmV0OmJvb2xlYW4sIGRhdGE6c3RyaW5nKSBcclxuICAgICAqIOivt+axgue7k+adn+Wbnuiwg++8jOaIkOWKn3JldOS4unRydWUsIGRhdGHkuLrov5Tlm57nmoTmlbDmja5zdHJpbmfjgIIg5aSx6LSl5Li6cmV05Li6ZmFsc2UsIGRhdGHkuLrnqbogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29tbW9tSHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghdXRpbHMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA2MDAwOyAgICAvLyDljZXkvY3mr6vnp5JcclxuICAgICAgICBsZXQgcmVxdWVzdFVybDogc3RyaW5nID0gdXJsICsgYCZreXg9ZmFsc2UmYXBwX2lkPSR7dXRpbHMuY29uZmlnLm5hdGl2ZUFuZHJvaWRDb25maWcuYXBwSUR9JmNoYW5uZWw9JHt1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy5jaGFubmVsfSZkZXZpY2VfdWlkPSR7dXRpbHMuVG9vbF9OYXRpdmUudWlkfSZ1aWQ9JHt1dGlscy5Ub29sX05hdGl2ZS5zZXJ2aWNlSWR9JmdhbWVfdHlwZT0yJnRpbWVfc3RhbXA9JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpfSZnYW1lX3ZlcnNpb249JHt1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy52ZXJzaW9ufSZyZXF2PSR7WVpfQ29uc3RhbnQuU0VSVkVSX1ZFUlNJT059YFxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajlnLDlnYA6XCIgKyByZXF1ZXN0VXJsKTtcclxuICAgICAgICB4aHIub3BlbignUE9TVCcsIHJlcXVlc3RVcmwpO1xyXG4gICAgICAgIHhoci5zZW5kKGBhcHBfbGlzdD0ke3RoaXMuYXBwTGlzdH1gKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+35rGC54q25oCB5pS55Y+YLCByZWFlZHlTdGF0ZT1cIiwgeGhyLnJlYWR5U3RhdGUsIFwiOyBzdGF0dXM9XCIsIHhoci5zdGF0dXMpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayh0cnVlLCB1dGlscy5hZXNEZWNyeXB0KHhoci5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT0gMjAwKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLotoXml7YhXCIpO1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWOn+eUn+WuouaIt+err+aVsOaNruaVsOaNrlxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TG9jYWxDb25maWcoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiuvue9ruWOn+eUn+WuouaIt+err+aVsOaNruaVsOaNrlwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5qbmlDbGFzc05hbWUsIFwic2V0TG9jYWxDb25maWdcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPluWOn+eUn+WuouaIt+err+aVsOaNruaVsOaNrlxyXG4gICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TmF0aXZlRGF0YSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkYXRhID0gXCJcIjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYXRhID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmpuaUNsYXNzTmFtZSwgXCJnZXRMb2NhbENvbmZpZ1wiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Y6f55Sf5a6i5oi356uv5pWw5o2u5pWw5o2uIDogXCIgKyBkYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFxyXG4gICAgKiBAcGFyYW0gaWQg6Lez6L2sSURcclxuICAgICogQHBhcmFtIGNhbGxiYWNrIOi3s+i9rOWbnuiwg1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBuYXZpZ2F0ZVRvR2FtZShqc29uRGF0YTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmpuaUNsYXNzTmFtZSwgXCJuYXZpZ2F0ZVRvR2FtZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkpOSeexu+WQjVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGpuaUNsYXNzTmFtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUpIHJldHVybiB0aGlzLmNsYXNzTmFtZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJhYS5iLmMuYVwiLCBcImFcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NOYW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5Lqk5Y+J5o6o5bm/5pWw5o2uXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldFJlY29tbW9uZEdhbWVMaXN0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkXHJcbiAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfTmF0aXZlXHJcbiAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfTmF0aXZlLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbHMuVG9vbF9OYXRpdmUuU2VydmVyQ29uZmlnLmp1bXBfbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmxldmVsXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChzdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBrZXlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZ1trZXldID0gcmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLopobnm5bvvJoja2V5PVwiICsga2V5LCBcIiAjdmFsdWU9XCIsIHJlc3VsdFtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwiT1BQT+acjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluWksei0pSwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiDkuIrmiqXkupLmjqjnu4Tku7bmmL7npLrkvY3nva5cclxuICAgKiBAcGFyYW0gb3RoZXJHYW1lQXBwSWQg6Lez6L2s55qESURcclxuICAgKiBAcGFyYW0gbG9jYXRpb24g5b2T5YmN5L2N572uXHJcbiAgICogQHBhcmFtIHN0YXR1cyAwOueCueWHu++8jDE66Lez6L2s5oiQ5YqfXHJcbiAgICovXHJcbiAgICBwdWJsaWMgcG9zdFJlY29tbWVudFNob3dEYXRhKGxvY2F0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJqdW1wc2hvd1wiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBTVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxvY2F0aW9uPSR7bG9jYXRpb259YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeS6kuaOqOe7hOS7tuaYvuekuuS9jee9ruaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeS6kuaOqOe7hOS7tuaYvuekuuS9jee9ruWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXkupLmjqjnu4Tku7bmlbDmja5cclxuICAgICAqIEBwYXJhbSBvdGhlckdhbWVBcHBJZCDot7PovaznmoRJRFxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOW9k+WJjeS9jee9rlxyXG4gICAgICogQHBhcmFtIHN0YXR1cyAwOueCueWHu++8jDE66Lez6L2s5oiQ5YqfXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0RGF0YUJ5TG9jYXRpb24ob3RoZXJHYW1lQXBwSWQ6IHN0cmluZywgbG9jYXRpb246IHN0cmluZywgc3RhdHVzOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yanVtcFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmanVtcF9hcHBfaWQ9JHtvdGhlckdhbWVBcHBJZH0mbG9jYXRpb249JHtsb2NhdGlvbn0mc3RhdHVzPSR7c3RhdHVzfWBcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOaVsOaNruS4iuaKpeaIkOWKn2ApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmV2ZW50XCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZldmVudD0ke2VuY29kZVVSSShldmVudE5hbWUpfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7blpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZEV2ZW50TmV3KGV2ZW50TmFtZTogc3RyaW5nLCBldmVudElkOiBzdHJpbmcgPSBcImRlZmF1bHRcIiwgZXZlbnREYXRhPzogc3RyaW5nLCBpc0NhbGxCYWNrOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmV2ZW50djJcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9JmV2ZW50X2lkPSR7ZXZlbnRJZH1gO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gYCZldmVudF9kYXRhPSR7ZW5jb2RlVVJJKGV2ZW50RGF0YSl9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLoh6rlrprkuYnkuovku7bkuIrmiqVVUkzvvJpcIiArIHVybCk7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYWxsQmFjayAmJiB0aGlzLmNhbGxCYWNrVG9FdmVudChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbGxCYWNrICYmIHRoaXMuY2FsbEJhY2tUb0V2ZW50KFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICog5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudFYzKGV2ZW50TmFtZTogc3RyaW5nLCBldmVudElkOiBzdHJpbmcgPSBcImRlZmF1bHRcIiwgZXZlbnREYXRhPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnR2MlwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZXZlbnQ9JHtlbmNvZGVVUkkoZXZlbnROYW1lKX0mZXZlbnRfaWQ9JHtldmVudElkfWA7XHJcbiAgICAgICAgICAgIGlmIChldmVudERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSBgJmV2ZW50X2RhdGE9JHtlbmNvZGVVUkkoZXZlbnREYXRhKX1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrVG9FdmVudChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrVG9FdmVudChcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LqL5Lu25LiK5oql55qE57uT5p6c57uZ5a6J5Y2T56uvXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FsbEJhY2tUb0V2ZW50KHJlc3VsdDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuam5pQ2xhc3NOYW1lLCBcImNhbGxCYWNrVG9FdmVudFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlvLnlh7rmj5DnpLrmoYZcclxuICAgICAgKiBAcGFyYW0gbXNnIOa2iOaBr1xyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHNob3dUb2FzdChtc2c6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmpuaUNsYXNzTmFtZSwgXCJzaG93VG9hc3RcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgbXNnKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrpmpDnp4HljY/orq7pobXpnaJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dQcml2YWN5QWdyZWVtZW50KCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuam5pQ2xhc3NOYW1lLCBcInNob3dQcml2YWN5QWdyZWVtZW50XCIsIFwiKClWXCIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1JlYWxOYW1lQXV0aFBhbmVsKHBhcm1lczogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5qbmlDbGFzc05hbWUsIFwic2hvd1JlYWxOYW1lQXV0aFBhbmVsXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHBhcm1lcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFsTmFtZUF1dGhSZXN1bHQocGFybWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmpuaUNsYXNzTmFtZSwgXCJyZWFsTmFtZUF1dGhSZXN1bHRcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgcGFybWVzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrp7lkI3orqTor4FcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWxOYW1lQXV0aChjb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF1dGlscy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwibT1yZWFsTmFtZUF1dGhcIlxyXG4gICAgICAgIGxldCBjb21wbGV0ZUNhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci50aW1lb3V0ID0gMTUwMDA7ICAgIC8vIOWNleS9jeavq+enklxyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCIgKyBtZXRob2QgKyBgJnRpbWVfc3RhbXA9JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpfWA7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgIGRhdGEua3l4ID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5hcHBfaWQgPSB1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy5hcHBJRDtcclxuICAgICAgICBkYXRhLmNoYW5uZWwgPSB1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy5jaGFubmVsO1xyXG4gICAgICAgIGRhdGEuZGV2aWNlX3VpZCA9IHV0aWxzLlRvb2xfTmF0aXZlLnVpZDtcclxuICAgICAgICBkYXRhLnVpZCA9IHV0aWxzLlRvb2xfTmF0aXZlLnNlcnZpY2VJZDtcclxuICAgICAgICBkYXRhLmdhbWVfdHlwZSA9IDI7XHJcbiAgICAgICAgZGF0YS5kZXZpY2VfZGF0YSA9IHRoaXMuZGV2aWNlSW5mbztcclxuICAgICAgICBkYXRhLmdhbWVfdmVyc2lvbiA9IHV0aWxzLmNvbmZpZy5uYXRpdmVBbmRyb2lkQ29uZmlnLnZlcnNpb247XHJcbiAgICAgICAgZGF0YS5yZXF2ID0gWVpfQ29uc3RhbnQuU0VSVkVSX1ZFUlNJT047XHJcbiAgICAgICAgZGF0YS5hcHBfbGlzdCA9IHRoaXMuYXBwTGlzdDtcclxuICAgICAgICBkYXRhLmlkX2NhcmQgPSBjb2RlO1xyXG4gICAgICAgIGRhdGEucmVhbF9uYW1lID0gbmFtZTtcclxuXHJcblxyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5Zyw5Z2AOlwiICsgcmVxdWVzdFVybCk7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axguWPguaVsDpcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuXHJcbiAgICAgICAgbGV0IHJlcXVlc3REYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCByZXF1ZXN0VXJsKTtcclxuICAgICAgICB4aHIuc2VuZChcImpzb25fZGF0YT1cIiArIHV0aWxzLmFlc0VuY3J5cHQocmVxdWVzdERhdGEpKTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwianNvbl9kYXRhPTpcIiArIHV0aWxzLmFlc0VuY3J5cHQocmVxdWVzdERhdGEpKTtcclxuXHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axgueKtuaAgeaUueWPmCwgcmVhZWR5U3RhdGU9XCIsIHhoci5yZWFkeVN0YXRlLCBcIjsgc3RhdHVzPVwiLCB4aHIuc3RhdHVzKTtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2sodHJ1ZSwgdXRpbHMuYWVzRGVjcnlwdCh4aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9IDIwMCkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+35rGC6LaF5pe2IVwiKTtcclxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOWPi+ebn+a4uOaIj+W8gOWni+S4iuaKpVxyXG4gICAgICAqIEBwYXJhbSBsZXZlbElEIFxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHVtYU9uU3RhcnQobGV2ZWxJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnVtYVRyYWNrRXZlbnQoXCJsZXZlbFwiLCBcInVtX3BsdXNfZ2FtZV9sZXZlbFwiLCB7XHJcbiAgICAgICAgICAgIGdhbWVfbGV2ZWw6IGxldmVsSUQsLy/or6XlrZfmrrXlkI3np7DkuI3lj6/kv67mlLnvvIzlv4XkvKBcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZXM6IGAwYFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIOaYr+WQpuW8gOWQr+WPi+ebnyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja1VtZW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGlmICghdXRpbHMuY29uZmlnLm9wcG9jb25maWcudW1lbmdJZCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj4vnm5/nu5PnrpfkuIrmiqVcclxuICAgICAqIEBwYXJhbSBsZXZlbElEIOWFs+WNoWlkXHJcbiAgICAgKiBAcGFyYW0gc3RhZ2VJZCBcclxuICAgICAqIEBwYXJhbSBldmVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVtYVJlcG9ydGVkTGV2ZWwobGV2ZWxJRDogc3RyaW5nLCBldmVudDogTGV2ZWxTdGF0dXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IDE7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09IExldmVsU3RhdHVzLkdhbWVGYWlsKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVtYVRyYWNrRXZlbnQoXCJsZXZlbFwiLCBcInVtX3BsdXNfZ2FtZV9sZXZlbFwiLCB7XHJcbiAgICAgICAgICAgIGdhbWVfbGV2ZWw6IGxldmVsSUQsLy/or6XlrZfmrrXlkI3np7DkuI3lj6/kv67mlLnvvIzlv4XkvKBcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZXM6IGAke3N0YXR1c31gXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj4vnm5/oh6rlrprkuYnkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudElkIOS6i+S7tklE77yM5rOo5oSP77ya5LqL5Lu2SUTlv4XpobvopoHlnKjlkI7lj7DphY3nva5cclxuICAgICAqIEBwYXJhbSBwYXJhbXMg5LqL5Lu25YaF5a65XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bWFUcmFja0V2ZW50KGV2ZW50VHlwZTogc3RyaW5nID0gXCJjdXN0b21cIiwgZXZlbnRJZDogc3RyaW5nLCBwYXJhbXM/KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5qbmlDbGFzc05hbWUsIFwidW1hVHJhY2tFdmVudFwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCBldmVudFR5cGUsIGV2ZW50SWQsIHBhcmFtcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==