
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Wifi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '63487/lBO1JVpZpP8G/P+T8', 'YZ_Tool_Wifi');
// common-plugin/Scripts/YZ_Tool_Wifi.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
// 默认配置
var ST_DefaultServerConfig = "";
var YZ_Tool_WiFi = /** @class */ (function () {
    function YZ_Tool_WiFi() {
        /**
       * 服务器配置信息
       */
        this._serverConfig = null;
        this._sysInfo = {};
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        this._loginTime = 0;
        this._loginInterval = 30;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
    }
    Object.defineProperty(YZ_Tool_WiFi.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_WiFi.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_WiFi.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_WiFi.prototype.gameVersion = function () {
        return Utils_1.utils.config.wifiConfig.version;
    };
    Object.defineProperty(YZ_Tool_WiFi.prototype, "serviceId", {
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
    YZ_Tool_WiFi.prototype._login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curTime, interval, self;
            return __generator(this, function (_a) {
                curTime = new Date().getTime();
                interval = (curTime - this._loginTime) / 1000;
                if (interval > 0 && interval < 30) {
                    Utils_1.utils.showLog("\u767B\u5F55\u8BF7\u6C42\u95F4\u9694\u5C0F\u4E8E\uFF1A" + this._loginInterval + "\u79D2");
                    return [2 /*return*/];
                }
                this._loginTime = curTime;
                self = this;
                Utils_1.utils.showLog("qq暂时不获取uid，uid全部为0");
                this._uid = "0";
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_WiFi.prototype.reportLogin = function () {
        var _this = this;
        if (this.isReport)
            return;
        this.isReport = true;
        var self = this;
        var curTime = new Date().getTime();
        var interval = (curTime - self._reportLoginTime) / 1000;
        // utils.showLog(interval, " <<<<<<,interval", " _reportLoginTime >>>", self._reportLoginTime);
        // console.log(curTime, curTime - self._reportLoginTime, interval)
        if (interval > 0 && interval < 30) {
            Utils_1.utils.showLog("\u4E0A\u62A5\u767B\u5F55\u83B7\u53D6UID\u5C0F\u4E8E\uFF1A" + self._reportLoginInterval + "\u79D2");
            return;
        }
        self._reportLoginTime = curTime;
        var method = "m=login";
        var url = ST_ServerUrl + method + "&device_data=0";
        Utils_1.utils.commomHttpRequest(url, function (ret, data) {
            if (ret) {
                if (data) {
                    var result = JSON.parse(data);
                    Utils_1.utils.showLog("data=" + data);
                    Utils_1.utils.showLog("result=" + result);
                    Utils_1.utils.showLog("result.uid=" + result.uid);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        console.log("self._service_uid:" + self._service_uid);
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
    YZ_Tool_WiFi.prototype.init = function (data) {
        if (PlatUtils_1.default.IsWiFi) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.wifi) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.wifi);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            try {
                //@ts-ignore
                this._sysInfo = wuji.getSystemInfoSync();
                Utils_1.utils.showLog("连尚 小游戏平台信息: ", JSON.stringify(this.SysInfo));
            }
            catch (e) {
                Utils_1.utils.showLog("连尚 小游戏平台数据获取失败!");
            }
            this._loadConfig();
        }
    };
    YZ_Tool_WiFi.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsWiFi) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("连尚服务器配置数据获取成功: data = ", data);
                    if (data) {
                        var result = JSON.parse(data);
                        if (result) {
                            if (!Utils_1.utils.DebugLoacalConfig) {
                                _this._serverConfig = result;
                            }
                            else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        }
                        else {
                            Utils_1.utils.showLog("连尚服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("连尚服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    // if (this._serverConfig.is_local_pos_id
                    //     && this._serverConfig.is_local_pos_id == "false") {
                    //     // 使用服务器下发的广告id
                    //     utils.showLog("使用服务器下发的广告id");
                    //     utils.config.qqconfig.bannerId = this._serverConfig.banner_pos_id;
                    //     utils.config.qqconfig.insertId = this._serverConfig.intersititia_pos_id;
                    //     utils.config.qqconfig.videoId = this._serverConfig.video_pos_id;
                    //     utils.config.qqconfig.boxId = this._serverConfig.box_pos_id;
                    //     utils.config.qqconfig.bannerBoxId = this._serverConfig.banner_box_pos_id;
                    // } else {
                    //     utils.showLog("使用本地配置的广告ID");
                    // }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    YZ_Tool_WiFi.prototype.getSystemInfo = function () {
        if (PlatUtils_1.default.IsWiFi) {
            return this._sysInfo;
        }
    };
    /**
     * 上报数据
     */
    YZ_Tool_WiFi.prototype.postData = function (otherGameAppId) {
        if (PlatUtils_1.default.IsWiFi) {
            var appid = Utils_1.utils.config.wifiConfig.appID;
            var uid = "0";
            var channel = "qq";
            var url = "http://apps.youlesp.com/gs?m=jump&app_id=" + appid + "&uid=" + uid + "&channel=" + channel + "&jump_app_id=" + otherGameAppId;
            Utils_1.utils.showLog("上报数据, url=", url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            });
        }
    };
    YZ_Tool_WiFi.prototype.isOverMinVersion = function (minVersion) {
        var curVersion = this._sysInfo.SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    };
    YZ_Tool_WiFi.prototype._compareVersion = function (v1, v2) {
        if (!v1 || !v2)
            return -1;
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_WiFi.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsWiFi) {
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
    YZ_Tool_WiFi.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsWiFi) {
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
    YZ_Tool_WiFi.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsWiFi) {
            //@ts-ignore
            wuji.showToast({
                title: msg,
                icon: "none",
                duration: 2000
            });
        }
    };
    YZ_Tool_WiFi = __decorate([
        ccclass
    ], YZ_Tool_WiFi);
    return YZ_Tool_WiFi;
}());
exports.default = YZ_Tool_WiFi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9XaWZpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyw2Q0FBeUQ7QUFDekQscURBQWdEO0FBRTFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQU0sWUFBWSxHQUFXLDhCQUE4QixDQUFDO0FBQzVELElBQU0sY0FBYyxHQUFXLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU87QUFDUCxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUd4QztJQUFBO1FBRUk7O1NBRUM7UUFDRCxrQkFBYSxHQUFRLElBQUksQ0FBQztRQUsxQixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBS25CLE9BQU87UUFDUCxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBZW5CLFVBQVU7UUFDVixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQVkzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBaUI1QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0IseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUE0TzlCLENBQUM7SUF0U0csc0JBQVcsc0NBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxpQ0FBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDZCQUFHO2FBQWQ7WUFDSSxrREFBa0Q7WUFDbEQsaUJBQWlCO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FB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QUFRLEVBQUUsSUFBSTthQUNqQixDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUExU2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E0U2hDO0lBQUQsbUJBQUM7Q0E1U0QsQUE0U0MsSUFBQTtrQkE1U29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9cIjtcclxuY29uc3QgUE9TVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovL3JlcG9ydC55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbi8vIOm7mOiupOmFjee9rlxyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlaX1Rvb2xfV2lGaSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICog5pyN5Yqh5Zmo6YWN572u5L+h5oGvXHJcbiAgICovXHJcbiAgICBfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlckNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBfc3lzSW5mbzogYW55ID0ge307XHJcbiAgICBwdWJsaWMgZ2V0IFN5c0luZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0luZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7lpIdVSURcclxuICAgIF91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdWlkKCkge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3VpZDtcclxuICAgICAgICAvLyB0aGlzLl9sb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeJiOacrOWPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2FtZVZlcnNpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdXRpbHMuY29uZmlnLndpZmlDb25maWcudmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+acjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgX3NlcnZpY2VfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOacjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNlcnZpY2VJZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl9zZXJ2aWNlX3VpZDtcclxuICAgICAgICB0aGlzLnJlcG9ydExvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfbG9naW5UaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgX2xvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG4gICAgYXN5bmMgX2xvZ2luKCkge1xyXG5cclxuICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2xvZ2luVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDAgJiYgaW50ZXJ2YWwgPCAzMCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDnmbvlvZXor7fmsYLpl7TpmpTlsI/kuo7vvJoke3RoaXMuX2xvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInFx5pqC5pe25LiN6I635Y+WdWlk77yMdWlk5YWo6YOo5Li6MFwiKTtcclxuICAgICAgICB0aGlzLl91aWQgPSBcIjBcIjtcclxuICAgICAgICAvLyB0aGlzLnJlcG9ydExvZ2luKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfcmVwb3J0TG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBpc1JlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICAvLyB1dGlscy5zaG93TG9nKGludGVydmFsLCBcIiA8PDw8PDwsaW50ZXJ2YWxcIiwgXCIgX3JlcG9ydExvZ2luVGltZSA+Pj5cIiwgc2VsZi5fcmVwb3J0TG9naW5UaW1lKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJUaW1lLCBjdXJUaW1lIC0gc2VsZi5fcmVwb3J0TG9naW5UaW1lLCBpbnRlcnZhbClcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHtzZWxmLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhPVwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdC51aWQ9XCIgKyByZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGYuX3NlcnZpY2VfdWlkOlwiICsgc2VsZi5fc2VydmljZV91aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajor7fmsYLnmbvlvZXmiJDlip8hIF9zZXJ2aWNlX3VpZD1cIiArIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQsIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5pWw5o2u5aSx6LSlMVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dpRmkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmoud2lmaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmoud2lmaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IFwiMFwiO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3lzSW5mbyA9IHd1amkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov57lsJog5bCP5ri45oiP5bmz5Y+w5L+h5oGvOiBcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5TeXNJbmZvKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov57lsJog5bCP5ri45oiP5bmz5Y+w5pWw5o2u6I635Y+W5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXaUZpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwibT1nXCI7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov57lsJrmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIui/nuWwmuacjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov57lsJrmnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5jb25maWcucXFjb25maWcuYmFubmVySWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuY29uZmlnLnFxY29uZmlnLmluc2VydElkID0gdGhpcy5fc2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLmNvbmZpZy5xcWNvbmZpZy52aWRlb0lkID0gdGhpcy5fc2VydmVyQ29uZmlnLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuY29uZmlnLnFxY29uZmlnLmJveElkID0gdGhpcy5fc2VydmVyQ29uZmlnLmJveF9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5iYW5uZXJCb3hJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfYm94X3Bvc19pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacrOWcsOmFjee9rueahOW5v+WRiklEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3lzdGVtSW5mbygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3lzSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3REYXRhKG90aGVyR2FtZUFwcElkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICBsZXQgYXBwaWQ6IHN0cmluZyA9IHV0aWxzLmNvbmZpZy53aWZpQ29uZmlnLmFwcElEO1xyXG4gICAgICAgICAgICBsZXQgdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9IFwicXFcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gYGh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzP209anVtcCZhcHBfaWQ9JHthcHBpZH0mdWlkPSR7dWlkfSZjaGFubmVsPSR7Y2hhbm5lbH0manVtcF9hcHBfaWQ9JHtvdGhlckdhbWVBcHBJZH1gO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5pWw5o2uLCB1cmw9XCIsIHVybCk7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGlzT3Zlck1pblZlcnNpb24obWluVmVyc2lvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGN1clZlcnNpb246IHN0cmluZyA9IHRoaXMuX3N5c0luZm8uU0RLVmVyc2lvbjtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVZlcnNpb24oY3VyVmVyc2lvbiwgbWluVmVyc2lvbikgPj0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2NvbXBhcmVWZXJzaW9uKHYxLCB2Mikge1xyXG4gICAgICAgIGlmICghdjEgfHwgIXYyKSByZXR1cm4gLTE7XHJcblxyXG4gICAgICAgIHYxID0gdjEuc3BsaXQoJy4nKVxyXG4gICAgICAgIHYyID0gdjIuc3BsaXQoJy4nKVxyXG4gICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KHYxLmxlbmd0aCwgdjIubGVuZ3RoKVxyXG5cclxuICAgICAgICB3aGlsZSAodjEubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIHYxLnB1c2goJzAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodjIubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIHYyLnB1c2goJzAnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcclxuXHJcbiAgICAgICAgICAgIGlmIChudW0xID4gbnVtMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChudW0xIDwgbnVtMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAwXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXlhbPljaHmlbDmja5cclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0TGV2ZWwobGV2ZWw6IHN0cmluZywgc3RhdHVzOiBMZXZlbFN0YXR1cywgbGV2ZWxOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dpRmkpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxldmVsX2lkPSR7bGV2ZWx9JmxldmVsX25hbWU9JHtlbmNvZGVVUkkobGV2ZWxOYW1lKX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dpRmkpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOW8ueWHuuaPkOekuuahhlxyXG4gICAgICAqIEBwYXJhbSBtc2cg5raI5oGvXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1RvYXN0KG1zZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dpRmkpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHd1amkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBtc2csXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=