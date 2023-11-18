"use strict";
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