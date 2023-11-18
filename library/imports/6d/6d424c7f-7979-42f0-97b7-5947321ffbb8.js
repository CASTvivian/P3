"use strict";
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