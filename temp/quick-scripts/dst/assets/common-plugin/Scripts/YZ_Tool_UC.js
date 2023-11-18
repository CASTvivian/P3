
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_UC.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '908fa2v3cZJL7agUZVt0aZX', 'YZ_Tool_UC');
// common-plugin/Scripts/YZ_Tool_UC.ts

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
var ST_DefaultServerConfig = "";
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
var QTT_ServerUrl = "https://newidea4-gamecenter-backend.1sapp.com/x/open/user/ticket?";
var QTT_Report = "https://newidea4-gamecenter-backend.1sapp.com/x/open/report/round";
/**
 * uc工具类
 */
var YZ_Tool_UC = /** @class */ (function () {
    function YZ_Tool_UC() {
        //@ts-ignore
        this.uc = window.uc;
        this._sysInfo = {};
        /**
     * 服务器配置信息
     */
        this._serverConfig = null;
        this._shareCallback = null;
        this._isShare = false;
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
    Object.defineProperty(YZ_Tool_UC.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_UC.prototype.gameVersion = function () {
        return Utils_1.utils.config.ucConfig.version;
    };
    Object.defineProperty(YZ_Tool_UC.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_UC.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_UC.prototype, "serviceId", {
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
    YZ_Tool_UC.prototype._login = function () {
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
                Utils_1.utils.showLog("uc暂时不获取uid，uid全部为0");
                this._uid = "0";
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_UC.prototype.reportLogin = function () {
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
    YZ_Tool_UC.prototype.init = function (data) {
        if (PlatUtils_1.default.ISUC) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.uc) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.uc);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            try {
                this._sysInfo = this.uc.getSystemInfoSync();
                if (typeof this._sysInfo === 'string') {
                    try {
                        this._sysInfo = JSON.parse(this._sysInfo);
                    }
                    catch (e) { }
                }
                Utils_1.utils.showLog("uc 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }
            catch (e) {
                Utils_1.utils.showLog("uc 小游戏平台数据获取失败!");
            }
            this._loadConfig();
        }
    };
    YZ_Tool_UC.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.ISUC) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("uc服务器配置数据获取成功: data = " + data);
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
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        }
                        else {
                            Utils_1.utils.showLog("uc服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("uc服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.shares) {
                        if (_this._serverConfig.shares.sy_title) {
                            Utils_1.utils.config.otherconfig.shareTitle = _this._serverConfig.shares.sy_title;
                        }
                        if (_this._serverConfig.shares.sy_img) {
                            Utils_1.utils.config.otherconfig.shareImgUrl = _this._serverConfig.shares.sy_img;
                        }
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    YZ_Tool_UC.prototype.getSystemInfo = function () {
        if (PlatUtils_1.default.ISUC) {
            return this._sysInfo;
        }
    };
    YZ_Tool_UC.prototype.share = function (callback) {
        if (callback === void 0) { callback = null; }
        if (PlatUtils_1.default.ISUC) {
            this._shareCallback = callback;
            this._isShare = true;
            var getShareInfo = {
                title: Utils_1.utils.config.otherconfig.shareTitle,
                imageUrl: Utils_1.utils.config.otherconfig.shareImgUrl,
                success: this._shareCallback,
                fail: this._shareCallback
            };
            //@ts-ignore
            this.uc.shareAppMessage(getShareInfo);
        }
    };
    YZ_Tool_UC.prototype.isOverMinVersion = function (minVersion) {
        var curVersion = this._sysInfo.SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    };
    YZ_Tool_UC.prototype._compareVersion = function (v1, v2) {
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
    YZ_Tool_UC.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.ISUC) {
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
    YZ_Tool_UC.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.ISUC) {
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
    YZ_Tool_UC = __decorate([
        ccclass
    ], YZ_Tool_UC);
    return YZ_Tool_UC;
}());
exports.default = YZ_Tool_UC;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9VQy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFDaEMsNkNBQXlEO0FBQ3pELHFEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QyxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUN4QyxJQUFNLFlBQVksR0FBVyw4QkFBOEIsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBVyxnQ0FBZ0MsQ0FBQztBQUNoRSxJQUFNLGFBQWEsR0FBVyxtRUFBbUUsQ0FBQTtBQUNqRyxJQUFNLFVBQVUsR0FBVyxtRUFBbUUsQ0FBQTtBQUM5Rjs7R0FFRztBQUVIO0lBQUE7UUFDQyxZQUFZO1FBQ1osT0FBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBWW5COztPQUVFO1FBQ0Ysa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFJMUIsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixPQUFPO1FBQ1AsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQVFuQixVQUFVO1FBQ1YsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFZM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQWlCNUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFDO0lBbU4zQixDQUFDO0lBbFJBLHNCQUFXLCtCQUFPO2FBQWxCO1lBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FB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QUksbUJBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQ3hCLElBQUksR0FBRyxHQUFXLGNBQWMsR0FBRyxNQUFNLElBQUcsWUFBVSxTQUFTLENBQUMsU0FBUyxDQUFHLENBQUEsQ0FBQztZQUM3RSxhQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUk7Z0JBQy9DLElBQUksR0FBRyxFQUFFO29CQUNSLGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzVCO3FCQUFNO29CQUNOLGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzVCO1lBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2Q7SUFDRixDQUFDO0lBclJtQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBc1I5QjtJQUFELGlCQUFDO0NBdFJELEFBc1JDLElBQUE7a0JBdFJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgTGV2ZWxTdGF0dXMgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9cIjtcclxuY29uc3QgUE9TVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovL3JlcG9ydC55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFFUVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cHM6Ly9uZXdpZGVhNC1nYW1lY2VudGVyLWJhY2tlbmQuMXNhcHAuY29tL3gvb3Blbi91c2VyL3RpY2tldD9cIlxyXG5jb25zdCBRVFRfUmVwb3J0OiBzdHJpbmcgPSBcImh0dHBzOi8vbmV3aWRlYTQtZ2FtZWNlbnRlci1iYWNrZW5kLjFzYXBwLmNvbS94L29wZW4vcmVwb3J0L3JvdW5kXCJcclxuLyoqXHJcbiAqIHVj5bel5YW357G7XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX1VDIHtcclxuXHQvL0B0cy1pZ25vcmVcclxuXHR1YyA9IHdpbmRvdy51YztcclxuXHRfc3lzSW5mbzogYW55ID0ge307XHJcblx0cHVibGljIGdldCBTeXNJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N5c0luZm87XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDlvZPliY3niYjmnKzlj7dcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2FtZVZlcnNpb24oKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB1dGlscy5jb25maWcudWNDb25maWcudmVyc2lvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gKiDmnI3liqHlmajphY3nva7kv6Hmga9cclxuICovXHJcblx0X3NlcnZlckNvbmZpZzogYW55ID0gbnVsbDtcclxuXHRwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuXHRcdHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XHJcblx0fVxyXG5cdF9zaGFyZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblx0X2lzU2hhcmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Ly/orr7lpIdVSURcclxuXHRfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcblx0cHVibGljIGdldCB1aWQoKSB7XHJcblx0XHQvLyBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl91aWQ7XHJcblx0XHQvLyB0aGlzLl9sb2dpbigpO1xyXG5cdFx0cmV0dXJuIFwiMFwiO1xyXG5cdH1cclxuXHJcblx0Ly/mnI3liqHlmajov5Tlm55VSURcclxuXHRfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiDmnI3liqHlmajov5Tlm55VSURcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlcnZpY2VJZCgpIHtcclxuXHRcdGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG5cdFx0dGhpcy5yZXBvcnRMb2dpbigpO1xyXG5cdFx0cmV0dXJuIFwiMFwiO1xyXG5cdH1cclxuXHJcblxyXG5cdF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcblx0X2xvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG5cdGFzeW5jIF9sb2dpbigpIHtcclxuXHJcblx0XHRsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcblx0XHRpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuXHRcdFx0dXRpbHMuc2hvd0xvZyhg55m75b2V6K+35rGC6Ze06ZqU5bCP5LqO77yaJHt0aGlzLl9sb2dpbkludGVydmFsfeenkmApO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0dXRpbHMuc2hvd0xvZyhcInVj5pqC5pe25LiN6I635Y+WdWlk77yMdWlk5YWo6YOo5Li6MFwiKTtcclxuXHRcdHRoaXMuX3VpZCA9IFwiMFwiO1xyXG5cdFx0Ly8gdGhpcy5yZXBvcnRMb2dpbigpO1xyXG5cclxuXHR9XHJcblxyXG5cdF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcblx0X3JlcG9ydExvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG5cdGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblx0LyoqXHJcblx0ICog5LiK5oql55m75b2V5o6l5Y+j6I635Y+WVUlEXHJcblx0ICovXHJcblx0cmVwb3J0TG9naW4oKSB7XHJcblx0XHRpZiAodGhpcy5pc1JlcG9ydCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5pc1JlcG9ydCA9IHRydWU7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gc2VsZi5fcmVwb3J0TG9naW5UaW1lKSAvIDEwMDA7XHJcblx0XHQvLyB1dGlscy5zaG93TG9nKGludGVydmFsLCBcIiA8PDw8PDwsaW50ZXJ2YWxcIiwgXCIgX3JlcG9ydExvZ2luVGltZSA+Pj5cIiwgc2VsZi5fcmVwb3J0TG9naW5UaW1lKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKGN1clRpbWUsIGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUsIGludGVydmFsKVxyXG5cdFx0aWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IDMwKSB7XHJcblx0XHRcdHV0aWxzLnNob3dMb2coYOS4iuaKpeeZu+W9leiOt+WPllVJROWwj+S6ju+8miR7c2VsZi5fcmVwb3J0TG9naW5JbnRlcnZhbH3np5JgKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0c2VsZi5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuXHRcdGxldCBtZXRob2QgPSBcIm09bG9naW5cIjtcclxuXHRcdGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG5cdFx0dXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChyZXQpIHtcclxuXHRcdFx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwiZGF0YT1cIiArIGRhdGEpO1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwicmVzdWx0LnVpZD1cIiArIHJlc3VsdC51aWQpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3VsdC51aWQpIHtcclxuXHRcdFx0XHRcdFx0c2VsZi5fc2VydmljZV91aWQgPSBcIlwiICsgcmVzdWx0LnVpZDtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZWxmLl9zZXJ2aWNlX3VpZDpcIiArIHNlbGYuX3NlcnZpY2VfdWlkKVxyXG5cdFx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcblx0XHRcdFx0XHRcdFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coXCLojrflj5bmlbDmja7lpLHotKUxXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaXNSZXBvcnQgPSBmYWxzZTtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcclxuXHRcdGlmIChQbGF0VXRpbHMuSVNVQykge1xyXG5cclxuXHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdGlmIChjb25maWdPYmogJiYgY29uZmlnT2JqLnVjKSB7XHJcblx0XHRcdFx0XHRTVF9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLnVjKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcblx0XHRcdHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IFwiMFwiO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0aGlzLl9zeXNJbmZvID0gdGhpcy51Yy5nZXRTeXN0ZW1JbmZvU3luYygpXHJcblx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9zeXNJbmZvID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fc3lzSW5mbyA9IEpTT04ucGFyc2UodGhpcy5fc3lzSW5mbyk7XHJcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7IH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcInVjIOWwj+a4uOaIj+W5s+WPsOS/oeaBrzogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLlN5c0luZm8pKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coXCJ1YyDlsI/muLjmiI/lubPlj7DmlbDmja7ojrflj5blpLHotKUhXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9sb2FkQ29uZmlnKCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0X2xvYWRDb25maWcoKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklTVUMpIHtcclxuXHRcdFx0bGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuXHRcdFx0dXRpbHMuY29tbW9tSHR0cFJlcXVlc3QoU1RfU2VydmVyVXJsICsgbWV0aG9kLCAocmV0LCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKHJldCkge1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcInVj5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5oiQ5YqfOiBkYXRhID0gXCIgKyBkYXRhKTtcclxuXHRcdFx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fc2VydmVyQ29uZmlnID0gcmVzdWx0O1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19zaG93X2xvZ192aWV3ICYmIHRoaXMuX3NlcnZlckNvbmZpZy5pc19zaG93X2xvZ192aWV3ID09IFwidHJ1ZVwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHV0aWxzLnNob3dMb2dWaWV3ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2Mud2FybihcIuW8gOWQr+S6huacrOWcsOaVsOaNrua1i+ivle+8jOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCJ1Y+acjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcInVj5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3NlcnZlckNvbmZpZyA9IEpTT04ucGFyc2UoU1RfRGVmYXVsdFNlcnZlckNvbmZpZyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzLnN5X3RpdGxlKSB7XHJcblx0XHRcdFx0XHRcdFx0dXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSB0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzLnN5X3RpdGxlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzLnN5X2ltZykge1xyXG5cdFx0XHRcdFx0XHRcdHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIGdldFN5c3RlbUluZm8oKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklTVUMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N5c0luZm87XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2hhcmUoY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG5cdFx0aWYgKFBsYXRVdGlscy5JU1VDKSB7XHJcblx0XHRcdHRoaXMuX3NoYXJlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdFx0dGhpcy5faXNTaGFyZSA9IHRydWU7XHJcblx0XHRcdGxldCBnZXRTaGFyZUluZm8gPSB7XHJcblx0XHRcdFx0dGl0bGU6IHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZVRpdGxlLFxyXG5cdFx0XHRcdGltYWdlVXJsOiB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVJbWdVcmwsXHJcblx0XHRcdFx0c3VjY2VzczogdGhpcy5fc2hhcmVDYWxsYmFjayxcclxuXHRcdFx0XHRmYWlsOiB0aGlzLl9zaGFyZUNhbGxiYWNrXHJcblx0XHRcdH1cclxuXHRcdFx0Ly9AdHMtaWdub3JlXHJcblx0XHRcdHRoaXMudWMuc2hhcmVBcHBNZXNzYWdlKGdldFNoYXJlSW5mbyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgaXNPdmVyTWluVmVyc2lvbihtaW5WZXJzaW9uOiBzdHJpbmcpIHtcclxuXHRcdGxldCBjdXJWZXJzaW9uOiBzdHJpbmcgPSB0aGlzLl9zeXNJbmZvLlNES1ZlcnNpb247XHJcblx0XHRyZXR1cm4gdGhpcy5fY29tcGFyZVZlcnNpb24oY3VyVmVyc2lvbiwgbWluVmVyc2lvbikgPj0gMDtcclxuXHR9XHJcblxyXG5cclxuXHRfY29tcGFyZVZlcnNpb24odjEsIHYyKSB7XHJcblx0XHRpZiAoIXYxIHx8ICF2MikgcmV0dXJuIC0xO1xyXG5cclxuXHRcdHYxID0gdjEuc3BsaXQoJy4nKVxyXG5cdFx0djIgPSB2Mi5zcGxpdCgnLicpXHJcblx0XHRjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcclxuXHJcblx0XHR3aGlsZSAodjEubGVuZ3RoIDwgbGVuKSB7XHJcblx0XHRcdHYxLnB1c2goJzAnKVxyXG5cdFx0fVxyXG5cdFx0d2hpbGUgKHYyLmxlbmd0aCA8IGxlbikge1xyXG5cdFx0XHR2Mi5wdXNoKCcwJylcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSlcclxuXHRcdFx0Y29uc3QgbnVtMiA9IHBhcnNlSW50KHYyW2ldKVxyXG5cclxuXHRcdFx0aWYgKG51bTEgPiBudW0yKSB7XHJcblx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdFx0fSBlbHNlIGlmIChudW0xIDwgbnVtMikge1xyXG5cdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDBcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOS4iuaKpeWFs+WNoeaVsOaNrlxyXG5cdCAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG5cdCAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcblx0ICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuXHQgKi9cclxuXHRwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG5cdFx0aWYgKFBsYXRVdGlscy5JU1VDKSB7XHJcblx0XHRcdGxldCBtZXRob2QgPSBcIm09cmxldmVsXCI7XHJcblx0XHRcdGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG5cdFx0XHR1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuXHRcdFx0XHRpZiAocmV0KSB7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG5cdCAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG5cdCAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcblx0ICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuXHQgKi9cclxuXHRwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklTVUMpIHtcclxuXHRcdFx0bGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuXHRcdFx0bGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuXHRcdFx0dXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcblx0XHRcdFx0aWYgKHJldCkge1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==