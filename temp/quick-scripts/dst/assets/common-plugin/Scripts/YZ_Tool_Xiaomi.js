
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Xiaomi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d424x/eXlC8Je3WUcyH/u4', 'YZ_Tool_Xiaomi');
// common-plugin/Scripts/YZ_Tool_Xiaomi.ts

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
var ST_DefaultServerConfig = "";
var ST_NativeInsertAdClickTimes = "NativeInsertAdClickTimes";
var ST_LastDateTime = "LastDateTime";
var ST_InsertAdShowCounts = "NativeInsertAdShowCount"; //插屏显示次数
var ST_BannerAdCloseCounts = "ST_BannerAdCloseCounts"; //banner广告关闭次数
var ST_YZBannerShowCounts = "YZBannerShowCounts"; //banner广告关闭次数
var YZ_Tool_Xiaomi = /** @class */ (function () {
    function YZ_Tool_Xiaomi() {
        this._sysInfo = null;
        this._serverConfig = null;
        this._nativeInsertAdClickTimes = 0;
        this._insertAdShowCounts = 0;
        this._bannerAdCloseCounts = 0;
        this._yzBannerShowCounts = 0;
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
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo || {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "NativeInsertAdClickTimes", {
        get: function () {
            return this._nativeInsertAdClickTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "insertAdShowCounts", {
        /**
         * 插屏广告展示次数
         */
        get: function () {
            return this._insertAdShowCounts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "bannerAdCloseCounts", {
        /**
         * banner关闭次数
         */
        get: function () {
            return this._bannerAdCloseCounts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "yzBannerShowCounts", {
        /**
         * 自定义banner展示次数
         */
        get: function () {
            return this._yzBannerShowCounts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Xiaomi.prototype, "serviceId", {
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
    YZ_Tool_Xiaomi.prototype._login = function () {
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
    YZ_Tool_Xiaomi.prototype.countNativeInserClick = function () {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.xiaomiConfig.appID + "_" + ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    };
    /**
     * 增加插屏显示的次数
     */
    YZ_Tool_Xiaomi.prototype.countInserShowCount = function () {
        this._insertAdShowCounts++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.xiaomiConfig.appID + "_" + ST_InsertAdShowCounts, this._insertAdShowCounts);
    };
    /**
     * 增加banner的关闭次数
     */
    YZ_Tool_Xiaomi.prototype.countBannerCloseCount = function () {
        this._bannerAdCloseCounts++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.xiaomiConfig.appID + "_" + ST_BannerAdCloseCounts, this._bannerAdCloseCounts);
    };
    /**
    * 增加自定义banner的显示次数
    */
    YZ_Tool_Xiaomi.prototype.countYzBannerShowCount = function () {
        this._yzBannerShowCounts++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.xiaomiConfig.appID + "_" + ST_YZBannerShowCounts, this._yzBannerShowCounts);
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Xiaomi.prototype.reportLogin = function () {
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
    YZ_Tool_Xiaomi.prototype.init = function (data) {
        if (PlatUtils_1.default.IsXiaoMi) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.xiaomi) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.xiaomi);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            //@ts-ignore
            if (qg.getUpdateManager) {
                //@ts-ignore
                var updateManager_1 = qg.getUpdateManager();
                updateManager_1.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    Utils_1.utils.showLog('onCheckForUpdate', res.hasUpdate);
                });
                updateManager_1.onUpdateReady(function () {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager_1.applyUpdate();
                });
                updateManager_1.onUpdateFailed(function () {
                    // 新版本下载失败
                    Utils_1.utils.showMsg("自动更新失败，请手动重启游戏！");
                });
            }
            this.getSystemInfo();
            this._loadConfig();
        }
    };
    YZ_Tool_Xiaomi.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsXiaoMi) {
            var method = "m=g";
            var url = ST_ServerUrl + method;
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("小米服务器配置数据获取成功: data = " + data);
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
                            Utils_1.utils.showLog("小米服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("小米服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.xiaomiConfig.insertId = _this._serverConfig.intersititia_pos_id;
                        Utils_1.utils.config.xiaomiConfig.videoId = _this._serverConfig.video_pos_id;
                        Utils_1.utils.config.xiaomiConfig.nativeInsertIds = _this.ServerConfig.native_intersititial_pos_id;
                        Utils_1.utils.config.xiaomiConfig.nativeBannerIds = _this.ServerConfig.native_banner_pos_id;
                        Utils_1.utils.config.xiaomiConfig.nativeTryGameIds = _this.ServerConfig.native_trygame_pos_id;
                        Utils_1.utils.config.xiaomiConfig.bannerId = _this._serverConfig.banner_pos_id;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                    if (_this.ServerConfig.native_banner_configs) {
                        for (var i = 0; i < _this.ServerConfig.native_banner_configs.length; i++) {
                            Utils_1.utils.showLog("获取到原生广告配置:" + _this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(_this.ServerConfig.native_banner_configs[i]));
                            Utils_1.utils.config.xiaomiConfig.setNativeBannerInfo(_this.ServerConfig.native_banner_configs[i].location, _this.ServerConfig.native_banner_configs[i]);
                        }
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
    YZ_Tool_Xiaomi.prototype.isOverMiniVersion = function (miniVersion) {
        if (PlatUtils_1.default.IsXiaoMi) {
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
    YZ_Tool_Xiaomi.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsXiaoMi) {
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
    YZ_Tool_Xiaomi.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsXiaoMi) {
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
     * 获取系统信息
     */
    YZ_Tool_Xiaomi.prototype.getSystemInfo = function () {
        if (PlatUtils_1.default.IsXiaoMi) {
            //@ts-ignore
            this._sysInfo = qg.getSystemInfoSync();
            Utils_1.utils.showLog("获取系统信息成功：" + JSON.stringify(this._sysInfo));
        }
    };
    YZ_Tool_Xiaomi.prototype.GameExit = function () {
        if (PlatUtils_1.default.IsXiaoMi) {
            //@ts-ignore
            //可以退出游戏
            qg.exitApplication({
                success: function () {
                    Utils_1.utils.showLog("exit Game success");
                },
                fail: function () {
                    Utils_1.utils.showLog("exit Game fail");
                }
            });
        }
    };
    YZ_Tool_Xiaomi = __decorate([
        ccclass
    ], YZ_Tool_Xiaomi);
    return YZ_Tool_Xiaomi;
}());
exports.default = YZ_Tool_Xiaomi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9YaWFvbWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUF5RDtBQUN6RCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxZQUFZLEdBQVcsOEJBQThCLENBQUM7QUFDNUQsSUFBTSxjQUFjLEdBQVcsZ0NBQWdDLENBQUM7QUFDaEUsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFDeEMsSUFBTSwyQkFBMkIsR0FBVywwQkFBMEIsQ0FBQztBQUN2RSxJQUFNLGVBQWUsR0FBVyxjQUFjLENBQUM7QUFDL0MsSUFBTSxxQkFBcUIsR0FBVyx5QkFBeUIsQ0FBQyxDQUFDLFFBQVE7QUFDekUsSUFBTSxzQkFBc0IsR0FBVyx3QkFBd0IsQ0FBQyxDQUFDLGNBQWM7QUFDL0UsSUFBTSxxQkFBcUIsR0FBVyxvQkFBb0IsQ0FBQyxDQUFDLGNBQWM7QUFJMUU7SUFBQTtRQUdJLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFLckIsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFLMUIsOEJBQXlCLEdBQVcsQ0FBQyxDQUFDO1FBS3RDLHdCQUFtQixHQUFXLENBQUMsQ0FBQztRQVFoQyx5QkFBb0IsR0FBVyxDQUFDLENBQUM7UUFTakMsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBUWhDLE9BQU87UUFDUCxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBUW5CLFVBQVU7UUFDVixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQVkzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBaUI1QixxQkFBZ0IsR0FBVyxD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b250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBTVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovL2FwcHMueW91bGVzcC5jb20vZ3NzP1wiO1xyXG5jb25zdCBQT1NUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vcmVwb3J0LnlvdWxlc3AuY29tL2dzcz9cIjtcclxubGV0IFNUX0RlZmF1bHRTZXJ2ZXJDb25maWc6IHN0cmluZyA9IFwiXCI7XHJcbmNvbnN0IFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lczogc3RyaW5nID0gXCJOYXRpdmVJbnNlcnRBZENsaWNrVGltZXNcIjtcclxuY29uc3QgU1RfTGFzdERhdGVUaW1lOiBzdHJpbmcgPSBcIkxhc3REYXRlVGltZVwiO1xyXG5jb25zdCBTVF9JbnNlcnRBZFNob3dDb3VudHM6IHN0cmluZyA9IFwiTmF0aXZlSW5zZXJ0QWRTaG93Q291bnRcIjsgLy/mj5LlsY/mmL7npLrmrKHmlbBcclxuY29uc3QgU1RfQmFubmVyQWRDbG9zZUNvdW50czogc3RyaW5nID0gXCJTVF9CYW5uZXJBZENsb3NlQ291bnRzXCI7IC8vYmFubmVy5bm/5ZGK5YWz6Zet5qyh5pWwXHJcbmNvbnN0IFNUX1laQmFubmVyU2hvd0NvdW50czogc3RyaW5nID0gXCJZWkJhbm5lclNob3dDb3VudHNcIjsgLy9iYW5uZXLlub/lkYrlhbPpl63mrKHmlbBcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX1hpYW9taSB7XHJcblxyXG5cclxuICAgIF9zeXNJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXM6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbnNlcnRBZFNob3dDb3VudHM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOaPkuWxj+W5v+WRiuWxleekuuasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGluc2VydEFkU2hvd0NvdW50cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zZXJ0QWRTaG93Q291bnRzO1xyXG4gICAgfVxyXG5cclxuICAgIF9iYW5uZXJBZENsb3NlQ291bnRzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBiYW5uZXLlhbPpl63mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBiYW5uZXJBZENsb3NlQ291bnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYW5uZXJBZENsb3NlQ291bnRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfeXpCYW5uZXJTaG93Q291bnRzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rlrprkuYliYW5uZXLlsZXnpLrmrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB5ekJhbm5lclNob3dDb3VudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3l6QmFubmVyU2hvd0NvdW50cztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIC8vIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfbG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBhc3luYyBfbG9naW4oKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IHRoaXMuX2xvZ2luSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg55m75b2V6K+35rGC6Ze06ZqU5bCP5LqO77yaJHt0aGlzLl9sb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aXZv5pqC5pe25LiN6I635Y+WdWlk77yMdWlk5YWo6YOo5Li6MFwiKTtcclxuICAgICAgICB0aGlzLl91aWQgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnJlcG9ydExvZ2luKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfcmVwb3J0TG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBpc1JlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjb3VudE5hdGl2ZUluc2VyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzKys7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0odXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5hcHBJRCArIFwiX1wiICsgU1RfTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzLCB0aGlzLl9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aKe5Yqg5o+S5bGP5pi+56S655qE5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb3VudEluc2VyU2hvd0NvdW50KCkge1xyXG4gICAgICAgIHRoaXMuX2luc2VydEFkU2hvd0NvdW50cysrO1xyXG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcuYXBwSUQgKyBcIl9cIiArIFNUX0luc2VydEFkU2hvd0NvdW50cywgdGhpcy5faW5zZXJ0QWRTaG93Q291bnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWinuWKoGJhbm5lcueahOWFs+mXreasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY291bnRCYW5uZXJDbG9zZUNvdW50KCkge1xyXG4gICAgICAgIHRoaXMuX2Jhbm5lckFkQ2xvc2VDb3VudHMrKztcclxuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbSh1dGlscy5jb25maWcueGlhb21pQ29uZmlnLmFwcElEICsgXCJfXCIgKyBTVF9CYW5uZXJBZENsb3NlQ291bnRzLCB0aGlzLl9iYW5uZXJBZENsb3NlQ291bnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5aKe5Yqg6Ieq5a6a5LmJYmFubmVy55qE5pi+56S65qyh5pWwXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNvdW50WXpCYW5uZXJTaG93Q291bnQoKSB7XHJcbiAgICAgICAgdGhpcy5feXpCYW5uZXJTaG93Q291bnRzKys7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0odXRpbHMuY29uZmlnLnhpYW9taUNvbmZpZy5hcHBJRCArIFwiX1wiICsgU1RfWVpCYW5uZXJTaG93Q291bnRzLCB0aGlzLl95ekJhbm5lclNob3dDb3VudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55m75b2V5o6l5Y+j6I635Y+WVUlEXHJcbiAgICAgKi9cclxuICAgIHJlcG9ydExvZ2luKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVwb3J0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1JlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fcmVwb3J0TG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IHRoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHt0aGlzLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9JHtlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkodGhpcy5fc3lzSW5mbykpfWA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhPVwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdC51aWQ9XCIgKyByZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluaVsOaNruWksei0pTFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmoueGlhb21pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU1RfRGVmYXVsdFNlcnZlckNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ09iai54aWFvbWkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IHRoaXMuX3NlcnZpY2VfdWlkID8gdGhpcy5fc2VydmljZV91aWQgOiBcIjBcIjtcclxuXHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAocWcuZ2V0VXBkYXRlTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gcWcuZ2V0VXBkYXRlTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOivt+axguWujOaWsOeJiOacrOS/oeaBr+eahOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ29uQ2hlY2tGb3JVcGRhdGUnLCByZXMuaGFzVXBkYXRlKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5paw55qE54mI5pys5bey57uP5LiL6L295aW977yM6LCD55SoIGFwcGx5VXBkYXRlIOW6lOeUqOaWsOeJiOacrOW5tumHjeWQr1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlRmFpbGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmlrDniYjmnKzkuIvovb3lpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwi6Ieq5Yqo5pu05paw5aSx6LSl77yM6K+35omL5Yqo6YeN5ZCv5ri45oiP77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kXHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlsI/nsbPmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXV0aWxzLkRlYnVnTG9hY2FsQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nVmlldyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5ZCv5LqG5pys5Zyw5pWw5o2u5rWL6K+V77yM5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlsI/nsbPmnI3liqHlmajphY3nva7mlbDmja7kuI3mmK/lkIjms5XnmoRKU09O5pWw5o2uLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bCP57Gz5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLmluc2VydElkID0gdGhpcy5fc2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcudmlkZW9JZCA9IHRoaXMuX3NlcnZlckNvbmZpZy52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcubmF0aXZlSW5zZXJ0SWRzID0gdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZUJhbm5lcklkcyA9IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfdHJ5Z2FtZV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy54aWFvbWlDb25maWcuYmFubmVySWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuYmFubmVyX3Bvc19pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacrOWcsOmFjee9rueahOW5v+WRiklEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5Y6f55Sf5bm/5ZGK6YWN572uOlwiICsgdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzW2ldLmxvY2F0aW9uLCBcIj4+Pj5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcueGlhb21pQ29uZmlnLnNldE5hdGl2ZUJhbm5lckluZm8odGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzW2ldLmxvY2F0aW9uLCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr5TovoPlvZPliY3lubPlj7DniYjmnKzmmK/lkKbpq5jkuo7mjIflrprnmoTniYjmnKzlj7dcclxuICAgICAqIEBwYXJhbSBtaW5pVmVyc2lvbiDmnIDkvY7lubPlj7DniYjmnKzlj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzT3Zlck1pbmlWZXJzaW9uKG1pbmlWZXJzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zeXNJbmZvICYmIHRoaXMuX3N5c0luZm8ucGxhdGZvcm1WZXJzaW9uQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0luZm8ucGxhdGZvcm1WZXJzaW9uQ29kZSA+PSBtaW5pVmVyc2lvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXlhbPljaHmlbDmja5cclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0TGV2ZWwobGV2ZWw6IHN0cmluZywgc3RhdHVzOiBMZXZlbFN0YXR1cywgbGV2ZWxOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJsZXZlbFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmbGV2ZWxfaWQ9JHtsZXZlbH0mbGV2ZWxfbmFtZT0ke2VuY29kZVVSSShsZXZlbE5hbWUpfSZzdGF0dXM9JHtzdGF0dXN9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiog5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2XHJcbiogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4qL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bns7vnu5/kv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN5c3RlbUluZm8oKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fc3lzSW5mbyA9IHFnLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bns7vnu5/kv6Hmga/miJDlip/vvJpcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuX3N5c0luZm8pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdhbWVFeGl0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIC8v5Y+v5Lul6YCA5Ye65ri45oiPXHJcbiAgICAgICAgICAgIHFnLmV4aXRBcHBsaWNhdGlvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImV4aXQgR2FtZSBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXhpdCBHYW1lIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=