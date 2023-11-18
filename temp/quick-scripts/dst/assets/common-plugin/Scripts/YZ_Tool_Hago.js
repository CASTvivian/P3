
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Hago.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ad1bMIfxJE77RoQPrXJJW4', 'YZ_Tool_Hago');
// common-plugin/Scripts/YZ_Tool_Hago.ts

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
// const i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
var ST_DefaultServerConfig = "";
var YZ_Tool_Hago = /** @class */ (function () {
    function YZ_Tool_Hago() {
        //@ts-ignore
        this.hg = hg;
        this._sysInfo = null;
        this._serverConfig = null;
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
    Object.defineProperty(YZ_Tool_Hago.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Hago.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_Hago.prototype.gameVersion = function () {
        return Utils_1.utils.config.hagoConfig.version;
    };
    Object.defineProperty(YZ_Tool_Hago.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Hago.prototype, "serviceId", {
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
    YZ_Tool_Hago.prototype._login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curTime, interval, self;
            return __generator(this, function (_a) {
                curTime = new Date().getTime();
                interval = (curTime - this._loginTime) / 1000;
                if (interval > 0 && interval < this._loginInterval) {
                    Utils_1.utils.showLog("\u767B\u5F55\u8BF7\u6C42\u95F4\u9694\u5C0F\u4E8E\uFF1A" + this._loginInterval + "\u79D2");
                    return [2 /*return*/];
                }
                this._loginTime = curTime;
                self = this;
                Utils_1.utils.showLog("vivo暂时不获取uid，uid全部为0");
                this._uid = "0";
                this.reportLogin();
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Hago.prototype.reportLogin = function () {
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
        var url = ST_ServerUrl + method + ("&device_data=" + encodeURI(JSON.stringify(this._sysInfo)));
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
    YZ_Tool_Hago.prototype.init = function (data) {
        Utils_1.utils.showLog("init hago");
        if (PlatUtils_1.default.IsHago) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.hago) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.hago);
                }
            }
            if (CC_DEBUG) {
                //@ts-ignore
                hg.initWebDebug({
                    gameId: "yanshiceshi",
                    user: 1,
                    env: "Test",
                    countryCode: "ID",
                    language: "id",
                    success: function (res) {
                        console.log("hago start webdebug success");
                    },
                    fail: function (res) {
                        console.log("hago start webdebug fail", res);
                    }
                });
            }
            this._sysInfo = this.hg.getSystemInfoSync();
            if (this._sysInfo) {
                Utils_1.utils.showLog("Hago 小游戏平台信息: " + JSON.stringify(this.SysInfo));
                if (this._sysInfo.language == "en-us") {
                    //@ts-ignore
                    i18n.init("en");
                }
                else if (this._sysInfo.language == "pt-br") {
                    //@ts-ignore
                    i18n.init("pt");
                }
                else {
                    //@ts-ignore
                    i18n.init(this._sysInfo.language);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._loadConfig();
        }
    };
    YZ_Tool_Hago.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsHago) {
            var method = "m=g";
            var url = ST_ServerUrl + method;
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("Hago服务器配置数据获取成功: data = " + data);
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
                            Utils_1.utils.showLog("Hago服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("Hago服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.hagoConfig.videoId = _this._serverConfig.video_pos_id;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    YZ_Tool_Hago.prototype.isOverMiniVersion = function (miniVersion) {
        if (PlatUtils_1.default.IsHago) {
            if (this._sysInfo && this._sysInfo.platformVersionCode) {
                return this._sysInfo.platformVersionCode >= miniVersion;
            }
        }
        return false;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Hago.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsHago) {
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
    YZ_Tool_Hago.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsHago) {
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
    YZ_Tool_Hago = __decorate([
        ccclass
    ], YZ_Tool_Hago);
    return YZ_Tool_Hago;
}());
exports.default = YZ_Tool_Hago;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9IYWdvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyw2Q0FBeUQ7QUFDekQscURBQWdEO0FBQ2hELHdDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLFlBQVksR0FBVyw4QkFBOEIsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBVyxnQ0FBZ0MsQ0FBQztBQUNoRSxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUl4QztJQUFBO1FBRUksWUFBWTtRQUNaLE9BQUUsR0FBUSxFQUFFLENBQUM7UUFFYixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBS3JCLGtCQUFhLEdBQVEsSUFBSSxDQUFDO1FBWTFCLE9BQU87UUFDUCxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBUW5CLFVBQVU7UUFDVixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQVkzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBaUI1QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0IseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUE0TDlCLENBQUM7SUF0UEcsc0JBQVcsaUNBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxzQ0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0ksa0NBQVcsR0FBbEI7UUFDSSxPQUFPLGFBQUssQ0FBQyxN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QyxNQUFNLEVBQUU7WUFDbEIsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQ3hCLElBQUksR0FBRyxHQUFXLGNBQWMsR0FBRyxNQUFNLElBQUcsWUFBVSxTQUFTLENBQUMsU0FBUyxDQUFHLENBQUEsQ0FBQztZQUM3RSxhQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUk7Z0JBQzVDLElBQUksR0FBRyxFQUFFO29CQUNMLGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQy9CO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQTNQZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQTRQaEM7SUFBRCxtQkFBQztDQTVQRCxBQTRQQyxJQUFBO2tCQTVQb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFFRQ29uZmlnIH0gZnJvbSBcIi4vQ29tbW9uQ29uZmlnXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcclxuLy8gY29uc3QgaTE4biA9IHJlcXVpcmUoJ0xhbmd1YWdlRGF0YScpO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9yZXBvcnQueW91bGVzcC5jb20vZ3NzP1wiO1xyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX0hhZ28ge1xyXG5cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgaGc6IGFueSA9IGhnO1xyXG5cclxuICAgIF9zeXNJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54mI5pys5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5jb25maWcuaGFnb0NvbmZpZy52ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+5aSHVUlEXHJcbiAgICBfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVpZCgpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl91aWQ7XHJcbiAgICAgICAgLy8gdGhpcy5fbG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mnI3liqHlmajov5Tlm55VSURcclxuICAgIF9zZXJ2aWNlX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnI3liqHlmajov5Tlm55VSURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXJ2aWNlSWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fc2VydmljZV91aWQ7XHJcbiAgICAgICAgdGhpcy5yZXBvcnRMb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2xvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9sb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGFzeW5jIF9sb2dpbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9sb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fbG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDnmbvlvZXor7fmsYLpl7TpmpTlsI/kuo7vvJoke3RoaXMuX2xvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInZpdm/mmoLml7bkuI3ojrflj5Z1aWTvvIx1aWTlhajpg6jkuLowXCIpO1xyXG4gICAgICAgIHRoaXMuX3VpZCA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fcmVwb3J0TG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDkuIrmiqXnmbvlvZXojrflj5ZVSUTlsI/kuo7vvJoke3RoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJtPWxvZ2luXCI7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZkZXZpY2VfZGF0YT0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNJbmZvKSl9YDtcclxuXHJcbiAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImRhdGE9XCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwicmVzdWx0PVwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwicmVzdWx0LnVpZD1cIiArIHJlc3VsdC51aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3NlcnZpY2VfdWlkID0gXCJcIiArIHJlc3VsdC51aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajor7fmsYLnmbvlvZXmiJDlip8hIF9zZXJ2aWNlX3VpZD1cIiArIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQsIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5pWw5o2u5aSx6LSlMVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcImluaXQgaGFnb1wiKTtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSGFnbykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmogJiYgY29uZmlnT2JqLmhhZ28pIHtcclxuICAgICAgICAgICAgICAgICAgICBTVF9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLmhhZ28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBoZy5pbml0V2ViRGVidWcoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVJZDogXCJ5YW5zaGljZXNoaVwiLCAvL+WGmeiHquW3seWFrOWPuOWvueW6lOeahOa4uOaIj2lkLCB5YW5zaGljZXNoaSDlj6rmmK/kvZzkuLrkuIDkuKrkvovlrZBcclxuICAgICAgICAgICAgICAgICAgICB1c2VyOiAxLCAvLzPkuKrnlKjmiLflj6/pgInvvIx1c2VyMeWvueW6lOWhqzHvvIzvvIx1c2VyMuWvueW6lOWhqzLvvIx1c2VyM+WvueW6lOWhqzNcclxuICAgICAgICAgICAgICAgICAgICBlbnY6IFwiVGVzdFwiLCAvL+WPr+mAie+8jCDpu5jorqTkuLrmtYvor5Xnjq/looPvvIxQcm9EdWN0IOS7o+ihqOato+W8j+eOr+WigyBcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogXCJJRFwiLCAvL+WPr+mAie+8jOm7mOiupOaYr0lEXHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IFwiaWRcIiwgLy/lj6/pgInvvIzpu5jorqTmmK9pZFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoYWdvIHN0YXJ0IHdlYmRlYnVnIHN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoYWdvIHN0YXJ0IHdlYmRlYnVnIGZhaWxcIiwgcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zeXNJbmZvID0gdGhpcy5oZy5nZXRTeXN0ZW1JbmZvU3luYygpXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkhhZ28g5bCP5ri45oiP5bmz5Y+w5L+h5oGvOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuU3lzSW5mbykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N5c0luZm8ubGFuZ3VhZ2UgPT0gXCJlbi11c1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5pbml0KFwiZW5cIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3N5c0luZm8ubGFuZ3VhZ2UgPT0gXCJwdC1iclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5pbml0KFwicHRcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGkxOG4uaW5pdCh0aGlzLl9zeXNJbmZvLmxhbmd1YWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IFwiMFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX2xvYWRDb25maWcoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kXHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIYWdv5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5oiQ5YqfOiBkYXRhID0gXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX3Nob3dfbG9nX3ZpZXcgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX3Nob3dfbG9nX3ZpZXcgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZ1ZpZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWQr+S6huacrOWcsOaVsOaNrua1i+ivle+8jOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiSGFnb+acjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJIYWdv5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcuaGFnb0NvbmZpZy52aWRlb0lkID0gdGhpcy5fc2VydmVyQ29uZmlnLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr5TovoPlvZPliY3lubPlj7DniYjmnKzmmK/lkKbpq5jkuo7mjIflrprnmoTniYjmnKzlj7dcclxuICAgICAqIEBwYXJhbSBtaW5pVmVyc2lvbiDmnIDkvY7lubPlj7DniYjmnKzlj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzT3Zlck1pbmlWZXJzaW9uKG1pbmlWZXJzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSGFnbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbyAmJiB0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbkNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbkNvZGUgPj0gbWluaVZlcnNpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIYWdvKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmxldmVsXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuKiDkuIrmiqXoh6rlrprkuYnkuovku7ZcclxuKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4qIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiovXHJcbiAgICBwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19