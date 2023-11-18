
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Cocosplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78b0a0l4K9L7IdiXn8LR/YS', 'YZ_Tool_Cocosplay');
// common-plugin/Scripts/YZ_Tool_Cocosplay.ts

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
// const GameSDK = require('./GameSDK.js');
// const AdSDK = require('./AdSDK.js');
var ST_DefaultServerConfig = "";
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
var QTT_ServerUrl = "https://newidea4-gamecenter-backend.1sapp.com/x/open/user/ticket?";
var QTT_Report = "https://newidea4-gamecenter-backend.1sapp.com/x/open/report/round";
/**
 * cocos工具类
 */
var YZ_Tool_Cocosplay = /** @class */ (function () {
    function YZ_Tool_Cocosplay() {
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
        this.nickName = "";
    }
    Object.defineProperty(YZ_Tool_Cocosplay.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Cocosplay.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Cocosplay.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Cocosplay.prototype, "serviceId", {
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
    YZ_Tool_Cocosplay.prototype._login = function () {
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
                Utils_1.utils.showLog("cocos暂时不获取uid，uid全部为0");
                this._uid = "0";
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Cocosplay.prototype.reportLogin = function () {
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
    YZ_Tool_Cocosplay.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.ISCocos) {
            /**
             * Param Json对象:
            {
            error,  // int 错误代码：0、成功（见文末）
            userId,  // int当前玩家id
            nickName,  // string当前玩家名称
            headUrl,  // string 当前玩家头像地址
            location,  //string当前玩家地址
            sex,  // string 玩家性别："f" - 女；"m" - 男；"x" – 未知
            age // int 当前玩家年龄
            }
            */
            //@ts-ignore
            GameSDK.setOnInitCB(function (param) {
                if (param.error == 0) {
                    Utils_1.utils.showLog("初始化成功");
                    _this._uid = param.userId;
                    _this.nickName = param.nickName;
                }
                ;
            });
            Utils_1.utils.showLog("utils.config.cocosConfig.appID:" + Utils_1.utils.config.cocosConfig.appID);
            //@ts-ignore
            GameSDK.init(Utils_1.utils.config.cocosConfig.appID);
            //@ts-ignore
            AdSDK.init();
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.cocos) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.cocos);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            try {
                //@ts-ignore
                this._sysInfo = GameSDK.getSystemInfoSync();
                Utils_1.utils.showLog("cocos 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }
            catch (e) {
                Utils_1.utils.showLog("cocos 小游戏平台数据获取失败!");
            }
            this._loadConfig();
        }
    };
    YZ_Tool_Cocosplay.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.ISCocos) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("cocos服务器配置数据获取成功: data = " + data);
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
                            Utils_1.utils.showLog("cocos服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("cocos服务器配置数据获取失败, 使用本地配置!");
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
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        // utils.config.cocosConfig.bannerId = this._serverConfig.banner_pos_id;
                        // utils.config.cocosConfig.insertId = this._serverConfig.intersititia_pos_id;
                        // utils.config.cocosConfig.videoId = this._serverConfig.video_pos_id;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    YZ_Tool_Cocosplay.prototype.getSystemInfo = function () {
        if (PlatUtils_1.default.ISCocos) {
            return this._sysInfo;
        }
    };
    YZ_Tool_Cocosplay.prototype.share = function (callback) {
        if (callback === void 0) { callback = null; }
    };
    YZ_Tool_Cocosplay.prototype.isOverMinVersion = function (minVersion) {
        var curVersion = this._sysInfo.SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    };
    YZ_Tool_Cocosplay.prototype._compareVersion = function (v1, v2) {
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
    YZ_Tool_Cocosplay.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.ISCocos) {
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
    YZ_Tool_Cocosplay = __decorate([
        ccclass
    ], YZ_Tool_Cocosplay);
    return YZ_Tool_Cocosplay;
}());
exports.default = YZ_Tool_Cocosplay;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9Db2Nvc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUF5RDtBQUN6RCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsMkNBQTJDO0FBQzNDLHVDQUF1QztBQUN2QyxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUN4QyxJQUFNLFlBQVksR0FBVyw4QkFBOEIsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBVyxnQ0FBZ0MsQ0FBQztBQUNoRSxJQUFNLGFBQWEsR0FBVyxtRUFBbUUsQ0FBQTtBQUNqRyxJQUFNLFVBQVUsR0FBVyxtRUFBbUUsQ0FBQTtBQUM5Rjs7R0FFRztBQUVIO0lBQUE7UUFDQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBS25COztPQUVFO1FBQ0Ysa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFJMUIsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixPQUFPO1FBQ1AsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQVFuQixVQUFVO1FBQ1YsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFZM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQWlCNUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBeUMxQixhQUFRLEdBQVcsRUFBRSxDQUFDO0lBeUt2QixDQUFDO0lBMVFBLHNCQUFXLHNDQUFPO2FBQWxCO1lBQ0MsT0FBTyxJQUFJLENB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QUFDO0NBNVFELEFBNFFDLElBQUE7a0JBNVFvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLy8gY29uc3QgR2FtZVNESyA9IHJlcXVpcmUoJy4vR2FtZVNESy5qcycpO1xyXG4vLyBjb25zdCBBZFNESyA9IHJlcXVpcmUoJy4vQWRTREsuanMnKTtcclxubGV0IFNUX0RlZmF1bHRTZXJ2ZXJDb25maWc6IHN0cmluZyA9IFwiXCI7XHJcbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9yZXBvcnQueW91bGVzcC5jb20vZ3NzP1wiO1xyXG5jb25zdCBRVFRfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vbmV3aWRlYTQtZ2FtZWNlbnRlci1iYWNrZW5kLjFzYXBwLmNvbS94L29wZW4vdXNlci90aWNrZXQ/XCJcclxuY29uc3QgUVRUX1JlcG9ydDogc3RyaW5nID0gXCJodHRwczovL25ld2lkZWE0LWdhbWVjZW50ZXItYmFja2VuZC4xc2FwcC5jb20veC9vcGVuL3JlcG9ydC9yb3VuZFwiXHJcbi8qKlxyXG4gKiBjb2Nvc+W3peWFt+exu1xyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF9Db2Nvc3BsYXkge1xyXG5cdF9zeXNJbmZvOiBhbnkgPSB7fTtcclxuXHRwdWJsaWMgZ2V0IFN5c0luZm8oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3lzSW5mbztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gKiDmnI3liqHlmajphY3nva7kv6Hmga9cclxuICovXHJcblx0X3NlcnZlckNvbmZpZzogYW55ID0gbnVsbDtcclxuXHRwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuXHRcdHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XHJcblx0fVxyXG5cdF9zaGFyZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblx0X2lzU2hhcmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Ly/orr7lpIdVSURcclxuXHRfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcblx0cHVibGljIGdldCB1aWQoKSB7XHJcblx0XHQvLyBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl91aWQ7XHJcblx0XHQvLyB0aGlzLl9sb2dpbigpO1xyXG5cdFx0cmV0dXJuIFwiMFwiO1xyXG5cdH1cclxuXHJcblx0Ly/mnI3liqHlmajov5Tlm55VSURcclxuXHRfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiDmnI3liqHlmajov5Tlm55VSURcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlcnZpY2VJZCgpIHtcclxuXHRcdGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG5cdFx0dGhpcy5yZXBvcnRMb2dpbigpO1xyXG5cdFx0cmV0dXJuIFwiMFwiO1xyXG5cdH1cclxuXHJcblxyXG5cdF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcblx0X2xvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG5cdGFzeW5jIF9sb2dpbigpIHtcclxuXHJcblx0XHRsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcblx0XHRpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuXHRcdFx0dXRpbHMuc2hvd0xvZyhg55m75b2V6K+35rGC6Ze06ZqU5bCP5LqO77yaJHt0aGlzLl9sb2dpbkludGVydmFsfeenkmApO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0dXRpbHMuc2hvd0xvZyhcImNvY29z5pqC5pe25LiN6I635Y+WdWlk77yMdWlk5YWo6YOo5Li6MFwiKTtcclxuXHRcdHRoaXMuX3VpZCA9IFwiMFwiO1xyXG5cdFx0Ly8gdGhpcy5yZXBvcnRMb2dpbigpO1xyXG5cclxuXHR9XHJcblxyXG5cdF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcblx0X3JlcG9ydExvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG5cdGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblx0LyoqXHJcblx0ICog5LiK5oql55m75b2V5o6l5Y+j6I635Y+WVUlEXHJcblx0ICovXHJcblx0cmVwb3J0TG9naW4oKSB7XHJcblx0XHRpZiAodGhpcy5pc1JlcG9ydCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5pc1JlcG9ydCA9IHRydWU7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gc2VsZi5fcmVwb3J0TG9naW5UaW1lKSAvIDEwMDA7XHJcblx0XHQvLyB1dGlscy5zaG93TG9nKGludGVydmFsLCBcIiA8PDw8PDwsaW50ZXJ2YWxcIiwgXCIgX3JlcG9ydExvZ2luVGltZSA+Pj5cIiwgc2VsZi5fcmVwb3J0TG9naW5UaW1lKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKGN1clRpbWUsIGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUsIGludGVydmFsKVxyXG5cdFx0aWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IDMwKSB7XHJcblx0XHRcdHV0aWxzLnNob3dMb2coYOS4iuaKpeeZu+W9leiOt+WPllVJROWwj+S6ju+8miR7c2VsZi5fcmVwb3J0TG9naW5JbnRlcnZhbH3np5JgKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0c2VsZi5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuXHRcdGxldCBtZXRob2QgPSBcIm09bG9naW5cIjtcclxuXHRcdGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG5cdFx0dXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChyZXQpIHtcclxuXHRcdFx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwiZGF0YT1cIiArIGRhdGEpO1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwicmVzdWx0LnVpZD1cIiArIHJlc3VsdC51aWQpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3VsdC51aWQpIHtcclxuXHRcdFx0XHRcdFx0c2VsZi5fc2VydmljZV91aWQgPSBcIlwiICsgcmVzdWx0LnVpZDtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZWxmLl9zZXJ2aWNlX3VpZDpcIiArIHNlbGYuX3NlcnZpY2VfdWlkKVxyXG5cdFx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcblx0XHRcdFx0XHRcdFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coXCLojrflj5bmlbDmja7lpLHotKUxXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaXNSZXBvcnQgPSBmYWxzZTtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRuaWNrTmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcclxuXHRcdGlmIChQbGF0VXRpbHMuSVNDb2Nvcykge1xyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogUGFyYW0gSnNvbuWvueixoTpcclxuXHRcdFx0e1xyXG5cdFx0XHRlcnJvciwgIC8vIGludCDplJnor6/ku6PnoIHvvJow44CB5oiQ5Yqf77yI6KeB5paH5pyr77yJXHJcblx0XHRcdHVzZXJJZCwgIC8vIGludOW9k+WJjeeOqeWutmlkXHJcblx0XHRcdG5pY2tOYW1lLCAgLy8gc3RyaW5n5b2T5YmN546p5a625ZCN56ewXHJcblx0XHRcdGhlYWRVcmwsICAvLyBzdHJpbmcg5b2T5YmN546p5a625aS05YOP5Zyw5Z2AXHJcblx0XHRcdGxvY2F0aW9uLCAgLy9zdHJpbmflvZPliY3njqnlrrblnLDlnYBcclxuXHRcdFx0c2V4LCAgLy8gc3RyaW5nIOeOqeWutuaAp+WIq++8mlwiZlwiIC0g5aWz77ybXCJtXCIgLSDnlLfvvJtcInhcIiDigJMg5pyq55+lXHJcblx0XHRcdGFnZSAvLyBpbnQg5b2T5YmN546p5a625bm06b6EXHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cclxuXHRcdFx0Ly9AdHMtaWdub3JlXHJcblx0XHRcdEdhbWVTREsuc2V0T25Jbml0Q0IoKHBhcmFtKSA9PiB7XHJcblx0XHRcdFx0aWYgKHBhcmFtLmVycm9yID09IDApIHtcclxuXHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJbmiJDlip9cIilcclxuXHRcdFx0XHRcdHRoaXMuX3VpZCA9IHBhcmFtLnVzZXJJZDtcclxuXHRcdFx0XHRcdHRoaXMubmlja05hbWUgPSBwYXJhbS5uaWNrTmFtZVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dXRpbHMuc2hvd0xvZyhcInV0aWxzLmNvbmZpZy5jb2Nvc0NvbmZpZy5hcHBJRDpcIiArIHV0aWxzLmNvbmZpZy5jb2Nvc0NvbmZpZy5hcHBJRClcclxuXHRcdFx0Ly9AdHMtaWdub3JlXHJcblx0XHRcdEdhbWVTREsuaW5pdCh1dGlscy5jb25maWcuY29jb3NDb25maWcuYXBwSUQpO1xyXG5cdFx0XHQvL0B0cy1pZ25vcmVcclxuXHRcdFx0QWRTREsuaW5pdCgpO1xyXG5cdFx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRcdGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0aWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmouY29jb3MpIHtcclxuXHRcdFx0XHRcdFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmouY29jb3MpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLl9zZXJ2aWNlX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlEKTtcclxuXHRcdFx0dGhpcy5fc2VydmljZV91aWQgPSB0aGlzLl9zZXJ2aWNlX3VpZCA/IHRoaXMuX3NlcnZpY2VfdWlkIDogXCIwXCI7XHJcblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdC8vQHRzLWlnbm9yZVxyXG5cdFx0XHRcdHRoaXMuX3N5c0luZm8gPSBHYW1lU0RLLmdldFN5c3RlbUluZm9TeW5jKClcclxuXHRcdFx0XHR1dGlscy5zaG93TG9nKFwiY29jb3Mg5bCP5ri45oiP5bmz5Y+w5L+h5oGvOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuU3lzSW5mbykpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcImNvY29zIOWwj+a4uOaIj+W5s+WPsOaVsOaNruiOt+WPluWksei0pSFcIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX2xvYWRDb25maWcoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0X2xvYWRDb25maWcoKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklTQ29jb3MpIHtcclxuXHRcdFx0bGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuXHRcdFx0dXRpbHMuY29tbW9tSHR0cFJlcXVlc3QoU1RfU2VydmVyVXJsICsgbWV0aG9kLCAocmV0LCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKHJldCkge1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcImNvY29z5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5oiQ5YqfOiBkYXRhID0gXCIgKyBkYXRhKTtcclxuXHRcdFx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fc2VydmVyQ29uZmlnID0gcmVzdWx0O1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjYy53YXJuKFwi5byA5ZCv5LqG5pys5Zyw5pWw5o2u5rWL6K+V77yM5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcImNvY29z5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwiY29jb3PmnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuX3NlcnZlckNvbmZpZykge1xyXG5cdFx0XHRcdFx0dGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfdGl0bGUpIHtcclxuXHRcdFx0XHRcdFx0XHR1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfdGl0bGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nKSB7XHJcblx0XHRcdFx0XHRcdFx0dXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gdGhpcy5fc2VydmVyQ29uZmlnLnNoYXJlcy5zeV9pbWc7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZFxyXG5cdFx0XHRcdFx0XHQmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkID09IFwiZmFsc2VcIikge1xyXG5cdFx0XHRcdFx0XHQvLyDkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZFxyXG5cdFx0XHRcdFx0XHR1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcIik7XHJcblx0XHRcdFx0XHRcdC8vIHV0aWxzLmNvbmZpZy5jb2Nvc0NvbmZpZy5iYW5uZXJJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG5cdFx0XHRcdFx0XHQvLyB1dGlscy5jb25maWcuY29jb3NDb25maWcuaW5zZXJ0SWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuXHRcdFx0XHRcdFx0Ly8gdXRpbHMuY29uZmlnLmNvY29zQ29uZmlnLnZpZGVvSWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcudmlkZW9fcG9zX2lkO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacrOWcsOmFjee9rueahOW5v+WRiklEXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR1dGlscy5lbWl0U2VydmVySW5pdEV2ZW50KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBnZXRTeXN0ZW1JbmZvKCkge1xyXG5cdFx0aWYgKFBsYXRVdGlscy5JU0NvY29zKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNoYXJlKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpc092ZXJNaW5WZXJzaW9uKG1pblZlcnNpb246IHN0cmluZykge1xyXG5cdFx0bGV0IGN1clZlcnNpb246IHN0cmluZyA9IHRoaXMuX3N5c0luZm8uU0RLVmVyc2lvbjtcclxuXHRcdHJldHVybiB0aGlzLl9jb21wYXJlVmVyc2lvbihjdXJWZXJzaW9uLCBtaW5WZXJzaW9uKSA+PSAwO1xyXG5cdH1cclxuXHJcblxyXG5cdF9jb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcclxuXHRcdGlmICghdjEgfHwgIXYyKSByZXR1cm4gLTE7XHJcblxyXG5cdFx0djEgPSB2MS5zcGxpdCgnLicpXHJcblx0XHR2MiA9IHYyLnNwbGl0KCcuJylcclxuXHRcdGNvbnN0IGxlbiA9IE1hdGgubWF4KHYxLmxlbmd0aCwgdjIubGVuZ3RoKVxyXG5cclxuXHRcdHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuXHRcdFx0djEucHVzaCgnMCcpXHJcblx0XHR9XHJcblx0XHR3aGlsZSAodjIubGVuZ3RoIDwgbGVuKSB7XHJcblx0XHRcdHYyLnB1c2goJzAnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0Y29uc3QgbnVtMSA9IHBhcnNlSW50KHYxW2ldKVxyXG5cdFx0XHRjb25zdCBudW0yID0gcGFyc2VJbnQodjJbaV0pXHJcblxyXG5cdFx0XHRpZiAobnVtMSA+IG51bTIpIHtcclxuXHRcdFx0XHRyZXR1cm4gMVxyXG5cdFx0XHR9IGVsc2UgaWYgKG51bTEgPCBudW0yKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0xXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gMFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcblx0ICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcblx0ICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuXHQgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwb3N0TGV2ZWwobGV2ZWw6IHN0cmluZywgc3RhdHVzOiBMZXZlbFN0YXR1cywgbGV2ZWxOYW1lPzogc3RyaW5nKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklTQ29jb3MpIHtcclxuXHRcdFx0bGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcclxuXHRcdFx0bGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxldmVsX2lkPSR7bGV2ZWx9JmxldmVsX25hbWU9JHtlbmNvZGVVUkkobGV2ZWxOYW1lKX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcblx0XHRcdHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG5cdFx0XHRcdGlmIChyZXQpIHtcclxuXHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=