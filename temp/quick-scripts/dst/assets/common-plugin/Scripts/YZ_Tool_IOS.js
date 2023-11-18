
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_IOS.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b78fctBdVZLkqQe7msmCH01', 'YZ_Tool_IOS');
// common-plugin/Scripts/YZ_Tool_IOS.ts

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
var ST_ServerUrl = "https://apps.youlesp.com/gss?";
var POST_ServerUrl = "https://report.youletd.com/gss?";
//  const ST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?";
//  const POST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?"
var YZ_Tool_IOS = /** @class */ (function () {
    function YZ_Tool_IOS() {
        this.className = "JNIHelper";
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
    }
    Object.defineProperty(YZ_Tool_IOS.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_IOS.prototype.gameVersion = function () {
        return Utils_1.utils.config.nativeIoSConfig.version;
    };
    Object.defineProperty(YZ_Tool_IOS.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_IOS.prototype, "serviceId", {
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
    YZ_Tool_IOS.prototype.reportLogin = function () {
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
        var method = "m=login";
        var url = ST_ServerUrl + method + ("&device_data=" + encodeURI(this.deviceInfo));
        Utils_1.utils.commomHttpRequest(url, function (ret, data) {
            if (ret) {
                if (data) {
                    var result = JSON.parse(data);
                    Utils_1.utils.showLog("data=" + data);
                    Utils_1.utils.showLog("result=" + result);
                    Utils_1.utils.showLog("result.uid=" + result.uid);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        Utils_1.utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_SERVICE_UID, self._service_uid);
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
    YZ_Tool_IOS.prototype.init = function (data) {
        if (PlatUtils_1.default.IsNativeIOS) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.ios) {
                    Utils_1.utils.showLog("本地配置数据:" + JSON.stringify(configObj.ios));
                    ST_DefaultServerConfig = JSON.stringify(configObj.ios);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._loadConfig();
            // if (PlatUtils.IsNativeIOS) {
            //     //初始化时监听返回按钮退出事件
            //     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event: any) => {
            //         if (event.keyCode == cc.macro.KEY.escape || event.keyCode == cc.macro.KEY.back) {
            //             if (PlatUtils.IsNativeIOS) {
            //                 if (this.showGameExitDialogType == 1) {
            //                     this.showGameExitDialog();
            //                 } else {
            //                     this.GameExit();
            //                 }
            //             }
            //         }
            //     }, this);
            // }
        }
    };
    /**
     * 显示退出弹窗
     */
    YZ_Tool_IOS.prototype.showGameExitDialog = function () {
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
    YZ_Tool_IOS.prototype.GameExit = function () {
        if (PlatUtils_1.default.IsNativeIOS) {
            cc.log("AdAgentNative GameExit");
            try {
                jsb.reflection.callStaticMethod(this.className, "gameExit");
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
    YZ_Tool_IOS.prototype.getMoreGameShowType = function () {
        try {
            this.moreGameShowType = jsb.reflection.callStaticMethod(this.className, "getMoreGameShowType", "()I");
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
     * 获取手机设备信息
     *
     */
    YZ_Tool_IOS.prototype.getDeviceInfo = function () {
        try {
            this.deviceInfo = jsb.reflection.callStaticMethod(this.className, "getDeviceInfo", "()Ljava/lang/String;");
            Utils_1.utils.showLog("获取原生平台手机设备信息：" + this.deviceInfo);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
     * 跳转原生平台的更多游戏
     */
    YZ_Tool_IOS.prototype.showMoreGames = function () {
        if (PlatUtils_1.default.IsNativeIOS) {
            Utils_1.utils.showLog("AdAgentNative showMoreGame");
            try {
                jsb.reflection.callStaticMethod(this.className, "showNativeMoreGame", "()V");
            }
            catch (error) {
                cc.log(error);
            }
        }
    };
    YZ_Tool_IOS.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsNativeIOS) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("原生IOS服务器配置数据获取成功: data = " + data);
                    if (data) {
                        var result = JSON.parse(data);
                        if (result) {
                            if (!Utils_1.utils.DebugLoacalConfig) {
                                _this._serverConfig = result;
                                if (_this._serverConfig.is_show_log_view && _this._serverConfig.is_show_log_view == "true") {
                                    Utils_1.utils.showLogView = true;
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
                    Utils_1.utils.showLog("原生安卓服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.nativeIoSConfig.bannerId = _this._serverConfig.banner_pos_id;
                        Utils_1.utils.config.nativeIoSConfig.insertId = _this._serverConfig.intersititia_pos_id;
                        Utils_1.utils.config.nativeIoSConfig.videoId = _this._serverConfig.video_pos_id;
                    }
                    else {
                        _this._serverConfig.video_pos_id = Utils_1.utils.config.nativeIoSConfig.videoId;
                        _this._serverConfig.banner_pos_id = Utils_1.utils.config.nativeIoSConfig.bannerId;
                        _this._serverConfig.intersititia_pos_id = Utils_1.utils.config.nativeIoSConfig.insertId;
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.showLog("执行IOS >>> 初始化");
                jsb.reflection.callStaticMethod(_this.className, "init:", JSON.stringify(_this._serverConfig));
                // this.setLocalConfig(JSON.stringify(this._serverConfig));
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    /**
     * 通用http请求，只封装了GET请求
     * @param url 请求的url地址
     * @param callback Function(ret:boolean, data:string)
     * 请求结束回调，成功ret为true, data为返回的数据string。 失败为ret为false, data为空
     */
    YZ_Tool_IOS.prototype.commomHttpRequest = function (url, callback) {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        var completeCallback = callback;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 6000; // 单位毫秒
        var requestUrl = url + ("&kyx=false&app_id=" + Utils_1.utils.config.nativeAndroidConfig.appID + "&channel=" + Utils_1.utils.config.nativeAndroidConfig.channel + "&device_uid=" + Utils_1.utils.Tool_Native.uid + "&uid=" + Utils_1.utils.Tool_Native.serviceId + "&game_type=2&time_stamp=" + (new Date()).getTime());
        Utils_1.utils.showLog("服务器地址:" + requestUrl);
        xhr.open('POST', requestUrl);
        xhr.send("app_list=" + this.appList);
        xhr.onreadystatechange = function () {
            Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (completeCallback) {
                    completeCallback(true, xhr.responseText);
                }
            }
            if (xhr.status != 200) {
                if (completeCallback) {
                    completeCallback(false, "");
                }
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
    YZ_Tool_IOS.prototype.setLocalConfig = function (data) {
        try {
            Utils_1.utils.showLog("设置原生客户端数据数据" + data);
            jsb.reflection.callStaticMethod(this.className, "setLocalConfig", "(Ljava/lang/String;)V", data);
        }
        catch (error) {
            Utils_1.utils.showLog(error);
        }
    };
    /**
    * 获取原生客户端数据数据
    * @param data
    */
    YZ_Tool_IOS.prototype.getNativeData = function () {
        var data = "";
        try {
            data = jsb.reflection.callStaticMethod(this.className, "getLocalConfig");
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
    YZ_Tool_IOS.prototype.navigateToGame = function (appId, callback, path) {
        if (PlatUtils_1.default.IsNativeIOS) {
            try {
                jsb.reflection.callStaticMethod(this.className, "navigateToGame:", appId);
            }
            catch (error) {
                Utils_1.utils.showLog(error);
            }
        }
    };
    /**
    * 获取交叉推广数据
    */
    YZ_Tool_IOS.prototype.getRecommondGameList = function () {
        if (PlatUtils_1.default.IsNativeIOS
            && Utils_1.utils.Tool_IOS
            && Utils_1.utils.Tool_IOS.ServerConfig) {
            return Utils_1.utils.Tool_IOS.ServerConfig.jump_list;
        }
        return null;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_IOS.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsNativeIOS) {
            var method = "m=rlevel";
            var url = POST_ServerUrl + method + ("&level_id=" + level + "&level_name=" + encodeURI(levelName) + "&status=" + status);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("关卡数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("关卡数据上报失败！");
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
    YZ_Tool_IOS.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsNativeIOS) {
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
      * 弹出提示框
      * @param msg 消息
      */
    YZ_Tool_IOS.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsNativeIOS) {
            console.log("showToast >>>>>");
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.className, "showToast:", msg);
        }
    };
    /**
     * 实名认证
     */
    YZ_Tool_IOS.prototype.realNameAuth = function (code, name, callBack) {
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
        data.app_id = Utils_1.utils.config.nativeIoSConfig.appID;
        data.channel = "ios";
        data.device_uid = this.uid;
        data.uid = this.serviceId;
        data.game_type = 2;
        data.device_data = this.deviceInfo;
        data.game_version = Utils_1.utils.config.nativeIoSConfig.version;
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
    YZ_Tool_IOS = __decorate([
        ccclass
    ], YZ_Tool_IOS);
    return YZ_Tool_IOS;
}());
exports.default = YZ_Tool_IOS;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9JT1MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUF5RDtBQUN6RCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFFeEMsSUFBTSxZQUFZLEdBQVcsK0JBQStCLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQVcsaUNBQWlDLENBQUM7QUFFakUsZ0ZBQWdGO0FBQ2hGLGlGQUFpRjtBQUlqRjtJQUFBO1FBRVcsY0FBUyxHQUFXLFdBQVcsQ0FBQztRQUV2QyxrQkFBYSxHQUFRLElBQUksQ0FBQztRQWExQixPQUFPO1FBQ1AsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQVFuQixVQUFVO1FBQ1YsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFXM0I7O1dBRUc7UUFDSCxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0I7OztXQUdHO1FBQ0gsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBQ25DLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFFckIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBOEUxQix3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUEwRHBDLGVBQVUsR0FBVyxFQUFFLENBQUM7SUFzVDVCLENBQUM7SUE3ZUcsc0JBQVcscUNBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFHRDs7T0FFRztJQUNJLGlDQUFXLEdBQWxCO1FBQ0ksT0FBTyxhQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFP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ZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgTGV2ZWxTdGF0dXMgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmxldCBTVF9EZWZhdWx0U2VydmVyQ29uZmlnOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vcmVwb3J0LnlvdWxldGQuY29tL2dzcz9cIjtcclxuXHJcbi8vICBjb25zdCBTVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMzEuMzk6ODA4MC9HYW1lQm94U2VydmVyL2dzcz9cIjtcclxuLy8gIGNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly8xOTIuMTY4LjMxLjM5OjgwODAvR2FtZUJveFNlcnZlci9nc3M/XCJcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX0lPUyB7XHJcblxyXG4gICAgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nID0gXCJKTklIZWxwZXJcIjtcclxuXHJcbiAgICBfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlckNvbmZpZztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3niYjmnKzlj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdhbWVWZXJzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNvbmZpZy5uYXRpdmVJb1NDb25maWcudmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIC8vIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgMO+8mum7mOiupOS6kuaOqOmdouadvyAx77yaIOi3s+i9rOWIsOWOn+eUn+W5s+WPsFxyXG4gICAgICovXHJcbiAgICBtb3JlR2FtZVNob3dUeXBlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66YCA5Ye65ri45oiP5by556qX55qE57G75Z6LXHJcbiAgICAgKiAw77ya5LiN5by556qXIDE65by556qXXHJcbiAgICAgKi9cclxuICAgIHNob3dHYW1lRXhpdERpYWxvZ1R5cGU6IG51bWJlciA9IDA7XHJcbiAgICBhcHBMaXN0OiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfcmVwb3J0TG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBpc1JlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55m75b2V5o6l5Y+j6I635Y+WVUlEXHJcbiAgICAgKi9cclxuICAgIHJlcG9ydExvZ2luKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVwb3J0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1JlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fcmVwb3J0TG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IHRoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHt0aGlzLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9JHtlbmNvZGVVUkkodGhpcy5kZXZpY2VJbmZvKX1gO1xyXG5cclxuICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZGF0YT1cIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXN1bHQ9XCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXN1bHQudWlkPVwiICsgcmVzdWx0LnVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2VydmljZV91aWQgPSBcIlwiICsgcmVzdWx0LnVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOivt+axgueZu+W9leaIkOWKnyEgX3NlcnZpY2VfdWlkPVwiICsgc2VsZi5fc2VydmljZV91aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCwgc2VsZi5fc2VydmljZV91aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bmlbDmja7lpLHotKUxXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNSZXBvcnQgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIOmFjee9ruaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai5pb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiICsgSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLmlvcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmouaW9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSB0aGlzLl9zZXJ2aWNlX3VpZCA/IHRoaXMuX3NlcnZpY2VfdWlkIDogXCIwXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+WIneWni+WMluaXtuebkeWQrOi/lOWbnuaMiemSrumAgOWHuuS6i+S7tlxyXG4gICAgICAgICAgICAvLyAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IGNjLm1hY3JvLktFWS5lc2NhcGUgfHwgZXZlbnQua2V5Q29kZSA9PSBjYy5tYWNyby5LRVkuYmFjaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93R2FtZUV4aXREaWFsb2dUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHYW1lRXhpdERpYWxvZygpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVFeGl0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2dhbWVFeGl0RGlhbG9nTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuumAgOWHuuW8ueeql1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dHYW1lRXhpdERpYWxvZygpIHtcclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlICYmIGNjLmlzVmFsaWQodGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6YCA5Ye656qX5Y+j6L+Y5Zyo44CCXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLmdhbWVFeGl0RGlhbG9nKSB7XHJcbiAgICAgICAgICAgIC8vIGlmKHV0aWxzLmdldFJlY29tbW9uZEdhbWVMaXN0KCkpXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLmdhbWVFeGl0RGlhbG9nKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lRXhpdERpYWxvZ05vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLl9nYW1lRXhpdERpYWxvZ05vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVFeGl0RGlhbG9nTm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lRXhpdERpYWxvZ05vZGUuZ3JvdXAgPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fZ2FtZUV4aXREaWFsb2dOb2RlLCA5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgR2FtZUV4aXREaWFsb2csIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC8ICFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2FtZUV4aXQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICBjYy5sb2coXCJBZEFnZW50TmF0aXZlIEdhbWVFeGl0XCIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmNsYXNzTmFtZSwgXCJnYW1lRXhpdFwiKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pu05aSa5ri45oiP5pi+56S655qE57G75Z6LXHJcbiAgICAgKiAw77ya6buY6K6k5LqS5o6o6Z2i5p2/IDHvvJog6Lez6L2s5Yiw5Y6f55Sf5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TW9yZUdhbWVTaG93VHlwZSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVHYW1lU2hvd1R5cGUgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuY2xhc3NOYW1lLCBcImdldE1vcmVHYW1lU2hvd1R5cGVcIiwgXCIoKUlcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGRldmljZUluZm86IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaJi+acuuiuvuWkh+S/oeaBr1xyXG4gICAgICogIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERldmljZUluZm8oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5kZXZpY2VJbmZvID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmNsYXNzTmFtZSwgXCJnZXREZXZpY2VJbmZvXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bljp/nlJ/lubPlj7DmiYvmnLrorr7lpIfkv6Hmga/vvJpcIiArIHRoaXMuZGV2aWNlSW5mbyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5Y6f55Sf5bmz5Y+w55qE5pu05aSa5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93TW9yZUdhbWVzKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkFkQWdlbnROYXRpdmUgc2hvd01vcmVHYW1lXCIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmNsYXNzTmFtZSwgXCJzaG93TmF0aXZlTW9yZUdhbWVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QoU1RfU2VydmVyVXJsICsgbWV0aG9kLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn0lPU+acjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluaIkOWKnzogZGF0YSA9IFwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19zaG93X2xvZ192aWV3ICYmIHRoaXMuX3NlcnZlckNvbmZpZy5pc19zaG93X2xvZ192aWV3ID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2dWaWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+WuieWNk+acjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/lronljZPmnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcubmF0aXZlSW9TQ29uZmlnLmJhbm5lcklkID0gdGhpcy5fc2VydmVyQ29uZmlnLmJhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5uYXRpdmVJb1NDb25maWcuaW5zZXJ0SWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm5hdGl2ZUlvU0NvbmZpZy52aWRlb0lkID0gdGhpcy5fc2VydmVyQ29uZmlnLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcudmlkZW9fcG9zX2lkID0gdXRpbHMuY29uZmlnLm5hdGl2ZUlvU0NvbmZpZy52aWRlb0lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkID0gdXRpbHMuY29uZmlnLm5hdGl2ZUlvU0NvbmZpZy5iYW5uZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9wb3NfaWQgPSB1dGlscy5jb25maWcubmF0aXZlSW9TQ29uZmlnLmluc2VydElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5omn6KGMSU9TID4+PiDliJ3lp4vljJZcIik7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuY2xhc3NOYW1lLCBcImluaXQ6XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX3NlcnZlckNvbmZpZykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0TG9jYWxDb25maWcoSlNPTi5zdHJpbmdpZnkodGhpcy5fc2VydmVyQ29uZmlnKSk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5lbWl0U2VydmVySW5pdEV2ZW50KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa55SoaHR0cOivt+axgu+8jOWPquWwgeijheS6hkdFVOivt+axglxyXG4gICAgICogQHBhcmFtIHVybCDor7fmsYLnmoR1cmzlnLDlnYBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbihyZXQ6Ym9vbGVhbiwgZGF0YTpzdHJpbmcpIFxyXG4gICAgICog6K+35rGC57uT5p2f5Zue6LCD77yM5oiQ5YqfcmV05Li6dHJ1ZSwgZGF0YeS4uui/lOWbnueahOaVsOaNrnN0cmluZ+OAgiDlpLHotKXkuLpyZXTkuLpmYWxzZSwgZGF0YeS4uuepuiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb21tb21IdHRwUmVxdWVzdCh1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF1dGlscy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDYwMDA7ICAgIC8vIOWNleS9jeavq+enklxyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsOiBzdHJpbmcgPSB1cmwgKyBgJmt5eD1mYWxzZSZhcHBfaWQ9JHt1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy5hcHBJRH0mY2hhbm5lbD0ke3V0aWxzLmNvbmZpZy5uYXRpdmVBbmRyb2lkQ29uZmlnLmNoYW5uZWx9JmRldmljZV91aWQ9JHt1dGlscy5Ub29sX05hdGl2ZS51aWR9JnVpZD0ke3V0aWxzLlRvb2xfTmF0aXZlLnNlcnZpY2VJZH0mZ2FtZV90eXBlPTImdGltZV9zdGFtcD0keyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCl9YFxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajlnLDlnYA6XCIgKyByZXF1ZXN0VXJsKTtcclxuICAgICAgICB4aHIub3BlbignUE9TVCcsIHJlcXVlc3RVcmwpO1xyXG4gICAgICAgIHhoci5zZW5kKGBhcHBfbGlzdD0ke3RoaXMuYXBwTGlzdH1gKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+35rGC54q25oCB5pS55Y+YLCByZWFlZHlTdGF0ZT1cIiwgeGhyLnJlYWR5U3RhdGUsIFwiOyBzdGF0dXM9XCIsIHhoci5zdGF0dXMpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKHRydWUsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axgui2heaXtiFcIik7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Y6f55Sf5a6i5oi356uv5pWw5o2u5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRMb2NhbENvbmZpZyhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K6+572u5Y6f55Sf5a6i5oi356uv5pWw5o2u5pWw5o2uXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmNsYXNzTmFtZSwgXCJzZXRMb2NhbENvbmZpZ1wiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBkYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5Y6f55Sf5a6i5oi356uv5pWw5o2u5pWw5o2uXHJcbiAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnZXROYXRpdmVEYXRhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBcIlwiO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuY2xhc3NOYW1lLCBcImdldExvY2FsQ29uZmlnXCIpO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Y6f55Sf5a6i5oi356uv5pWw5o2u5pWw5o2uIDogXCIgKyBkYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFxyXG4gICAgKiBAcGFyYW0gaWQg6Lez6L2sSURcclxuICAgICogQHBhcmFtIGNhbGxiYWNrIOi3s+i9rOWbnuiwg1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBuYXZpZ2F0ZVRvR2FtZShhcHBJZDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuY2xhc3NOYW1lLCBcIm5hdmlnYXRlVG9HYW1lOlwiLCBhcHBJZCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPluS6pOWPieaOqOW5v+aVsOaNrlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnZXRSZWNvbW1vbmRHYW1lTGlzdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TXHJcbiAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfSU9TXHJcbiAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfSU9TLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbHMuVG9vbF9JT1MuU2VydmVyQ29uZmlnLmp1bXBfbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxldmVsX2lkPSR7bGV2ZWx9JmxldmVsX25hbWU9JHtlbmNvZGVVUkkobGV2ZWxOYW1lKX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gKiDkuIrmiqXoh6rlrprkuYnkuovku7ZcclxuICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5by55Ye65o+Q56S65qGGXHJcbiAgICAgICogQHBhcmFtIG1zZyDmtojmga9cclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93VG9hc3QobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2hvd1RvYXN0ID4+Pj4+XCIpO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLmNsYXNzTmFtZSwgXCJzaG93VG9hc3Q6XCIsIG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWunuWQjeiupOivgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhbE5hbWVBdXRoKGNvZGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacrOWcsOaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPXJlYWxOYW1lQXV0aFwiXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSAxNTAwMDsgICAgLy8g5Y2V5L2N5q+r56eSXHJcbiAgICAgICAgbGV0IHJlcXVlc3RVcmw6IHN0cmluZyA9IFwiaHR0cHM6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9cIiArIG1ldGhvZCArIGAmdGltZV9zdGFtcD0keyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCl9YDtcclxuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XHJcbiAgICAgICAgZGF0YS5reXggPSBmYWxzZTtcclxuICAgICAgICBkYXRhLmFwcF9pZCA9IHV0aWxzLmNvbmZpZy5uYXRpdmVJb1NDb25maWcuYXBwSUQ7XHJcbiAgICAgICAgZGF0YS5jaGFubmVsID0gXCJpb3NcIjtcclxuICAgICAgICBkYXRhLmRldmljZV91aWQgPSB0aGlzLnVpZDtcclxuICAgICAgICBkYXRhLnVpZCA9IHRoaXMuc2VydmljZUlkO1xyXG4gICAgICAgIGRhdGEuZ2FtZV90eXBlID0gMjtcclxuICAgICAgICBkYXRhLmRldmljZV9kYXRhID0gdGhpcy5kZXZpY2VJbmZvO1xyXG4gICAgICAgIGRhdGEuZ2FtZV92ZXJzaW9uID0gdXRpbHMuY29uZmlnLm5hdGl2ZUlvU0NvbmZpZy52ZXJzaW9uO1xyXG4gICAgICAgIGRhdGEucmVxdiA9IFlaX0NvbnN0YW50LlNFUlZFUl9WRVJTSU9OO1xyXG4gICAgICAgIGRhdGEuYXBwX2xpc3QgPSB0aGlzLmFwcExpc3Q7XHJcbiAgICAgICAgZGF0YS5pZF9jYXJkID0gY29kZTtcclxuICAgICAgICBkYXRhLnJlYWxfbmFtZSA9IG5hbWU7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOWcsOWdgDpcIiArIHJlcXVlc3RVcmwpO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLlj4LmlbA6XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgcmVxdWVzdFVybCk7XHJcbiAgICAgICAgeGhyLnNlbmQoXCJqc29uX2RhdGE9XCIgKyB1dGlscy5hZXNFbmNyeXB0KHJlcXVlc3REYXRhKSk7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcImpzb25fZGF0YT06XCIgKyB1dGlscy5hZXNFbmNyeXB0KHJlcXVlc3REYXRhKSk7XHJcblxyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLnirbmgIHmlLnlj5gsIHJlYWVkeVN0YXRlPVwiLCB4aHIucmVhZHlTdGF0ZSwgXCI7IHN0YXR1cz1cIiwgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKHRydWUsIHV0aWxzLmFlc0RlY3J5cHQoeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPSAyMDApIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axgui2heaXtiFcIik7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=