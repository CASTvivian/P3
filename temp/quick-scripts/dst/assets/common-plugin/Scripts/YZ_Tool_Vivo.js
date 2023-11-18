
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Vivo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1dff8tBGB9Mvb2SYUr4tUpV', 'YZ_Tool_Vivo');
// common-plugin/Scripts/YZ_Tool_Vivo.ts

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
//@ts-ignore
var uma = require('./UMengSDK/quickGame/uma.min.js');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_DefaultServerConfig = "";
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
var ST_NativeInsertAdClickTimes = "NativeInsertAdClickTimes";
var ST_LastDateTime = "LastDateTime";
var YZ_Tool_Vivo = /** @class */ (function () {
    function YZ_Tool_Vivo() {
        //@ts-ignore
        this.qg = window.qg;
        /*
        brand	String	设备品牌
        manufacturer	String	设备生产商
        model	String	设备型号
        product	String	设备代号
        osType	String	操作系统名称
        osVersionName	String	操作系统版本名称
        osVersionCode	Number	操作系统版本号
        platformVersionName	String	运行平台版本名称
        platformVersionCode	Number	运行平台版本号
        language	String	系统语言
        region	String	系统地区
        screenWidth	Number	屏幕宽
        screenHeight	Number	屏幕高
        battery	Number	当前电量，0.0 - 1.0 之间
        wifiSignal	Number	wifi信号强度，范围0 - 4
        */
        this._sysInfo = null;
        this._serverConfig = null;
        this._nativeInsertAdClickTimes = 0;
        // 桌面图标是否创建
        this._shortcutCreated = false;
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        this._loginTime = 0;
        this._loginInterval = 30;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
        //用户来源
        this._source = "";
        this._rec_game_banner = null;
        this._rec_game_portal = null;
    }
    Object.defineProperty(YZ_Tool_Vivo.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Vivo.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Vivo.prototype, "NativeInsertAdClickTimes", {
        get: function () {
            return this._nativeInsertAdClickTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Vivo.prototype, "ShortcutCreated", {
        get: function () {
            return this._shortcutCreated;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Vivo.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Vivo.prototype, "serviceId", {
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
    YZ_Tool_Vivo.prototype._login = function () {
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
    YZ_Tool_Vivo.prototype.reportLogin = function () {
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
    YZ_Tool_Vivo.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            this.umaInit();
            //@ts-ignore 检车是否由桌面图标启动
            qg.isStartupByShortcut({
                success: function (status) {
                    if (status) {
                        Utils_1.utils.showLog('通过桌面图标启动应用');
                        _this._source = "shortCut";
                    }
                    else {
                        Utils_1.utils.showLog('不是通过桌面图标启动应用');
                    }
                }
            });
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.vivo) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.vivo);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._sysInfo = this.qg.getSystemInfoSync();
            if (this._sysInfo) {
                Utils_1.utils.showLog("VIVO 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }
            this._loadConfig();
            this._nativeInsertAdClickTimes = YZ_LocalStorage_1.default.getItem(ST_NativeInsertAdClickTimes);
            var day = YZ_LocalStorage_1.default.getItem(ST_LastDateTime);
            var curDate = new Date();
            if (day != curDate.toDateString()) {
                this._nativeInsertAdClickTimes = 0;
                YZ_LocalStorage_1.default.setItem(ST_NativeInsertAdClickTimes, 0);
            }
            // 检测桌面图标是否创建
            if (this.isOverMiniVersion("1041")) {
                Utils_1.utils.registerServerInitEvent(function () {
                    _this.checkHasShortCut(function (res) {
                        if (!res && Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.start_auto_create_short_cut_time) {
                            Utils_1.utils.SendEvent("组件初始化成功，弹出自动创建桌面！");
                            Utils_1.utils.showLog("\u7EC4\u4EF6\u521D\u59CB\u5316\u6210\u529F\uFF0C" + Utils_1.utils.ServerConfig.start_auto_create_short_cut_time + "\u79D2\u540E\u5F39\u51FA\u81EA\u52A8\u521B\u5EFA\u684C\u9762\uFF01");
                            setTimeout(function () {
                                _this.createShortcut(function (res) {
                                    if (res) {
                                        Utils_1.utils.showLog("自动创建桌面成功！");
                                    }
                                    else {
                                        Utils_1.utils.showLog("自动创建桌面失败！");
                                    }
                                });
                            }, Utils_1.utils.ServerConfig.start_auto_create_short_cut_time * 1000);
                        }
                    });
                }, this);
            }
        }
    };
    YZ_Tool_Vivo.prototype._buildServerUrl = function () {
        if (PlatUtils_1.default.IsVIVO) {
            var url = "";
            if (Utils_1.utils.config.vivoconfig && Utils_1.utils.config.vivoconfig.appID) {
                url = ST_ServerUrl + "kyx=true&app_id=" + Utils_1.utils.config.vivoconfig.appID.trim() + "&" + "channel=vivo";
            }
            else {
                Utils_1.utils.showLog("VIVO APPID配置出错！");
            }
            return url;
        }
        return null;
    };
    YZ_Tool_Vivo.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsVIVO) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("VIVO服务器配置数据获取成功: data = " + data);
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
                            Utils_1.utils.showLog("VIVO服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("VIVO服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.vivoconfig.bannerId = _this._serverConfig.banner_pos_id;
                        Utils_1.utils.config.vivoconfig.insertId = _this._serverConfig.intersititia_pos_id;
                        Utils_1.utils.config.vivoconfig.videoId = _this._serverConfig.video_pos_id;
                        Utils_1.utils.config.vivoconfig.nativeInsertIds = _this.ServerConfig.native_intersititial_pos_id;
                        Utils_1.utils.config.vivoconfig.nativeBannerIds = _this.ServerConfig.native_banner_pos_id;
                        Utils_1.utils.config.vivoconfig.nativeTryGameIds = _this.ServerConfig.native_trygame_pos_id;
                        Utils_1.utils.config.vivoconfig.recGameBannerId = _this.ServerConfig.rec_game_banner_id;
                        Utils_1.utils.config.vivoconfig.recPortalId = _this.ServerConfig.rec_portal_id;
                        Utils_1.utils.config.vivoconfig.nativeSingleAdIds = _this.ServerConfig.native_single_pos_id || Utils_1.utils.config.vivoconfig.nativeSingleAdIds;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                    if (_this.ServerConfig.native_banner_configs) {
                        for (var i = 0; i < _this.ServerConfig.native_banner_configs.length; i++) {
                            Utils_1.utils.showLog("获取到原生广告配置:" + _this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(_this.ServerConfig.native_banner_configs[i]));
                            Utils_1.utils.config.vivoconfig.setNativeBannerInfo(_this.ServerConfig.native_banner_configs[i].location, _this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                    if (_this.ServerConfig.native_customad_configs) {
                        for (var i = 0; i < _this.ServerConfig.native_customad_configs.length; i++) {
                            Utils_1.utils.showLog("获取到原生模版广告配置:" + _this.ServerConfig.native_customad_configs[i].location, ">>>>", JSON.stringify(_this.ServerConfig.native_customad_configs[i]));
                            Utils_1.utils.config.vivoconfig.setCustomAdInfo(_this.ServerConfig.native_customad_configs[i].location, _this.ServerConfig.native_customad_configs[i]);
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
    YZ_Tool_Vivo.prototype.isOverMiniVersion = function (miniVersion) {
        if (PlatUtils_1.default.IsVIVO) {
            if (this._sysInfo && this._sysInfo.platformVersionCode) {
                return this._sysInfo.platformVersionCode >= miniVersion;
            }
        }
        return false;
    };
    /**
     * 创建桌面图标
     */
    YZ_Tool_Vivo.prototype.createShortcut = function (callback) {
        var callbackFunc = callback;
        if (PlatUtils_1.default.IsVIVO && this.canCreateShortcut()) {
            var self_1 = this;
            self_1.qg.installShortcut({
                success: function () {
                    Utils_1.utils.showLog('桌面图标创建成功！');
                    self_1._shortcutCreated = true;
                    if (callbackFunc) {
                        callbackFunc(true);
                    }
                },
                fail: function (err) {
                    self_1._shortcutCreated = true;
                    cc.log('vivo创建失败err' + err);
                    if (callbackFunc) {
                        callbackFunc(false);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            cc.log("不能创建");
            if (callbackFunc) {
                callbackFunc(false);
            }
        }
    };
    /**
     * 是否可以创建桌面图标, 当前平台是否支持创建快捷方式
     */
    YZ_Tool_Vivo.prototype.canCreateShortcut = function () {
        if (PlatUtils_1.default.IsVIVO) {
            return this.isOverMiniVersion("1041");
        }
        return false;
    };
    YZ_Tool_Vivo.prototype.countNativeInserClick = function () {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage_1.default.setItem(ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    };
    /**
     * 分享事件
     * @param callback 分享回调
     */
    YZ_Tool_Vivo.prototype.share = function (callback) {
        if (!this.isOverMiniVersion("1052")) {
            callback && callback(false, "当前平台不支持");
            return;
        }
        this.qg.share();
        callback && callback(true);
        return;
    };
    /**
    * 验证桌面快捷方式是否创建过
    * @param callBack
    */
    YZ_Tool_Vivo.prototype.checkHasShortCut = function (callBack) {
        var _this = this;
        this.qg.hasShortcutInstalled({
            success: function (res) {
                Utils_1.utils.showLog("检测桌面快捷方式是否已经创建过: result=", res);
                if (res == false) {
                    _this._shortcutCreated = false;
                    callBack && callBack(false);
                }
                else {
                    _this._shortcutCreated = true;
                    callBack && callBack(true);
                }
            },
            fail: function () {
                Utils_1.utils.showLog("检测失败！");
            },
            complete: function () {
                Utils_1.utils.showLog("检测完成！");
            }
        });
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Vivo.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsVIVO) {
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
    YZ_Tool_Vivo.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsVIVO) {
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
    YZ_Tool_Vivo.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsVIVO) {
            //@ts-ignore
            //@ts-ignore
            qg.showToast({
                message: msg,
                duration: 2000
            });
        }
    };
    /**
   * 是否支持互推
   */
    YZ_Tool_Vivo.prototype.canShowRecommend = function () {
        if (this.qg.createBoxBannerAd && this.qg.createBoxPortalAd) {
            return true;
        }
        return false;
    };
    /**
     * 展示VIVO互推banner
     */
    YZ_Tool_Vivo.prototype.showRecBanner = function (location) {
        var _this = this;
        if (!this.canShowRecommend()) {
            Utils_1.utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }
        if (Utils_1.utils.config.vivoconfig.recGameBannerId) {
            if (!this._rec_game_banner) {
                this._rec_game_banner = this.qg.createBoxBannerAd({
                    adUnitId: Utils_1.utils.config.vivoconfig.recGameBannerId
                });
                this._rec_game_banner.onLoad(function () {
                    Utils_1.utils.showLog('互推banner加载成功!');
                });
                this._rec_game_banner.show().then(function () {
                    Utils_1.utils.showLog('互推banner展示成功！');
                }).catch(function (error) {
                    Utils_1.utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg);
                });
                this._rec_game_banner.onError(function (err) {
                    Utils_1.utils.showLog('互推banner加载异常!', err.errCode + ',' + err.errMsg);
                    _this._rec_game_banner.destroy();
                    _this._rec_game_banner = null;
                });
            }
            else {
                this._rec_game_banner.show().then(function () {
                    Utils_1.utils.showLog('互推banner展示成功！');
                    if (location) {
                        Utils_1.utils.SendEvent("互推Banner展示成功，位置：" + location);
                    }
                }).catch(function (error) {
                    Utils_1.utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg);
                });
            }
        }
        else {
            Utils_1.utils.showLog("VIVO 互推banner ID未配置！");
        }
    };
    /**
     * 隐藏互推banner
     */
    YZ_Tool_Vivo.prototype.hideRecBanner = function () {
        var _this = this;
        if (this._rec_game_banner) {
            this._rec_game_banner.hide().then(function () {
                Utils_1.utils.showLog('VIVO 互推banner 隐藏成功！');
            }).catch(function (error) {
                Utils_1.utils.showLog('VIVO 互推banner 隐藏失败:' + error.errCode + ',' + error.errMsg);
                _this._rec_game_banner.destroy();
                _this._rec_game_banner = null;
            });
        }
    };
    /**
     * 展示VIVO九宫格
     */
    YZ_Tool_Vivo.prototype.showGamePortal = function (top) {
        var _this = this;
        if (top === void 0) { top = 200; }
        if (!this.canShowRecommend()) {
            Utils_1.utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }
        if (Utils_1.utils.config.vivoconfig.recPortalId) {
            if (this._rec_game_portal) {
                this.hideGamePortal();
            }
            this._rec_game_portal = this.qg.createBoxPortalAd({
                posId: Utils_1.utils.config.vivoconfig.recPortalId,
                image: '',
                marginTop: top / cc.winSize.height * this.SysInfo.screenHeight
            });
            this._rec_game_portal.onError(function (err) {
                Utils_1.utils.showLog("盒子九宫格广告加载失败", JSON.stringify(err));
            });
            this._rec_game_portal.onClose(function () {
                Utils_1.utils.showLog('close _rec_game_portal');
                if (_this._rec_game_portal.isDestroyed) {
                    return;
                }
                // 当九宫格关闭之后，再次展示Icon
                _this._rec_game_portal.show();
            });
            // 广告数据加载成功后展示
            this._rec_game_portal.show().then(function () {
                Utils_1.utils.showLog('show success _rec_game_portal');
            });
        }
        else {
            Utils_1.utils.showLog("VIVO 互推九宫格 ID未配置！");
        }
    };
    /**
     * 隐藏九宫格
     */
    YZ_Tool_Vivo.prototype.hideGamePortal = function () {
        this._rec_game_portal && this._rec_game_portal.hide().then(function () {
            Utils_1.utils.showLog('hideGamePortal success');
        }).catch(function (error) {
            Utils_1.utils.showLog('hideGamePortal fail with:' + error.errCode + ',' + error.errMsg);
        });
    };
    /**友盟sdk初始化 */
    YZ_Tool_Vivo.prototype.umaInit = function () {
        if (!this.checkUmeng()) {
            Utils_1.utils.showLog("友盟ID未配置，不执行友盟初始化>>>>");
            return;
        }
        uma.init({
            appKey: Utils_1.utils.config.vivoconfig.umengId,
            useOpenid: false,
            debug: CC_DEBUG
        });
    };
    /**
       * 友盟游戏开始上报
       * @param levelID
       */
    YZ_Tool_Vivo.prototype.umaOnStart = function (levelID) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        qg.uma.stage.onStart({
            stageId: levelID,
            stageName: "\u7B2C" + levelID + "\u5173" // 关卡id
        });
    };
    /**
     *
     * @returns 是否开启友盟
     */
    YZ_Tool_Vivo.prototype.checkUmeng = function () {
        if (!Utils_1.utils.config.vivoconfig.umengId) {
            return false;
        }
        return true;
    };
    /**
     * 友盟结算上报
     * @param levelID 关卡id
     * @param stageId
     * @param event
     */
    YZ_Tool_Vivo.prototype.umaReportedLevel = function (levelID, event) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        qg.uma.stage.onEnd({
            stageId: levelID,
            stageName: "\u7B2C" + levelID + "\u5173",
            event: event
        });
    };
    /**
     * 友盟自定义事件
     * @param eventId 事件ID，注意：事件ID必须要在后台配置
     * @param params 事件内容
     */
    YZ_Tool_Vivo.prototype.umaTrackEvent = function (eventId, params) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        qg.uma.trackEvent(eventId, params);
    };
    YZ_Tool_Vivo = __decorate([
        ccclass
    ], YZ_Tool_Vivo);
    return YZ_Tool_Vivo;
}());
exports.default = YZ_Tool_Vivo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9WaXZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyw2Q0FBeUU7QUFDekUscURBQWdEO0FBQ2hELFlBQVk7QUFDWixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUMvQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUN4QyxJQUFNLFlBQVksR0FBVyw4QkFBOEIsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBVyxnQ0FBZ0MsQ0FBQztBQUNoRSxJQUFNLDJCQUEyQixHQUFXLDBCQUEwQixDQUFDO0FBQ3ZFLElBQU0sZUFBZSxHQUFXLGNBQWMsQ0FBQztBQUcvQztJQUFBO1FBQ0ksWUFBWTtRQUNaLE9BQUUsR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JFO1FBQ0YsYUFBUSxHQUFRLElBQUksQ0FBQztRQUtyQixrQkFBYSxHQUFRLElBQUksQ0FBQztRQUsxQiw4QkFBeUIsR0FBVyxDQUFDLENBQUM7UUFLdEMsV0FBVztRQUNYLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUtsQyxPQUFPO1FBQ1AsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQVFuQixVQUFVO1FBQ1YsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFZM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQWlCNUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQVks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dGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgQmFubmVyTG9jYXRpb24sIExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcclxuLy9AdHMtaWdub3JlXHJcbnZhciB1bWEgPSByZXF1aXJlKCcuL1VNZW5nU0RLL3F1aWNrR2FtZS91bWEubWluLmpzJyk7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9cIjtcclxuY29uc3QgUE9TVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovL3JlcG9ydC55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lczogc3RyaW5nID0gXCJOYXRpdmVJbnNlcnRBZENsaWNrVGltZXNcIjtcclxuY29uc3QgU1RfTGFzdERhdGVUaW1lOiBzdHJpbmcgPSBcIkxhc3REYXRlVGltZVwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF9WaXZvIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcWc6IGFueSA9IHdpbmRvdy5xZztcclxuICAgIC8qXHJcbiAgICBicmFuZFx0U3RyaW5nXHTorr7lpIflk4HniYxcclxuICAgIG1hbnVmYWN0dXJlclx0U3RyaW5nXHTorr7lpIfnlJ/kuqfllYZcclxuICAgIG1vZGVsXHRTdHJpbmdcdOiuvuWkh+Wei+WPt1xyXG4gICAgcHJvZHVjdFx0U3RyaW5nXHTorr7lpIfku6Plj7dcclxuICAgIG9zVHlwZVx0U3RyaW5nXHTmk43kvZzns7vnu5/lkI3np7BcclxuICAgIG9zVmVyc2lvbk5hbWVcdFN0cmluZ1x05pON5L2c57O757uf54mI5pys5ZCN56ewXHJcbiAgICBvc1ZlcnNpb25Db2RlXHROdW1iZXJcdOaTjeS9nOezu+e7n+eJiOacrOWPt1xyXG4gICAgcGxhdGZvcm1WZXJzaW9uTmFtZVx0U3RyaW5nXHTov5DooYzlubPlj7DniYjmnKzlkI3np7BcclxuICAgIHBsYXRmb3JtVmVyc2lvbkNvZGVcdE51bWJlclx06L+Q6KGM5bmz5Y+w54mI5pys5Y+3XHJcbiAgICBsYW5ndWFnZVx0U3RyaW5nXHTns7vnu5/or63oqIBcclxuICAgIHJlZ2lvblx0U3RyaW5nXHTns7vnu5/lnLDljLpcclxuICAgIHNjcmVlbldpZHRoXHROdW1iZXJcdOWxj+W5leWuvVxyXG4gICAgc2NyZWVuSGVpZ2h0XHROdW1iZXJcdOWxj+W5lemrmFxyXG4gICAgYmF0dGVyeVx0TnVtYmVyXHTlvZPliY3nlLXph4/vvIwwLjAgLSAxLjAg5LmL6Ze0XHJcbiAgICB3aWZpU2lnbmFsXHROdW1iZXJcdHdpZmnkv6Hlj7flvLrluqbvvIzojIPlm7QwIC0gNFxyXG4gICAgKi9cclxuICAgIF9zeXNJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIF9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXM6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOahjOmdouWbvuagh+aYr+WQpuWIm+W7ulxyXG4gICAgX3Nob3J0Y3V0Q3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdldCBTaG9ydGN1dENyZWF0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3J0Y3V0Q3JlYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIC8vIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfbG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBhc3luYyBfbG9naW4oKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IHRoaXMuX2xvZ2luSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg55m75b2V6K+35rGC6Ze06ZqU5bCP5LqO77yaJHt0aGlzLl9sb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aXZv5pqC5pe25LiN6I635Y+WdWlk77yMdWlk5YWo6YOo5Li6MFwiKTtcclxuICAgICAgICB0aGlzLl91aWQgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnJlcG9ydExvZ2luKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfcmVwb3J0TG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBpc1JlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy/nlKjmiLfmnaXmupBcclxuICAgIF9zb3VyY2U6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeeZu+W9leaOpeWPo+iOt+WPllVJRFxyXG4gICAgICovXHJcbiAgICByZXBvcnRMb2dpbigpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlcG9ydCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX3JlcG9ydExvZ2luVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDAgJiYgaW50ZXJ2YWwgPCB0aGlzLl9yZXBvcnRMb2dpbkludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOS4iuaKpeeZu+W9leiOt+WPllVJROWwj+S6ju+8miR7dGhpcy5fcmVwb3J0TG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZXBvcnRMb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBcIm09bG9naW5cIjtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBTVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmRldmljZV9kYXRhPSR7ZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KHRoaXMuX3N5c0luZm8pKX1gO1xyXG5cclxuICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZGF0YT1cIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXN1bHQ9XCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXN1bHQudWlkPVwiICsgcmVzdWx0LnVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2VydmljZV91aWQgPSBcIlwiICsgcmVzdWx0LnVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOivt+axgueZu+W9leaIkOWKnyEgX3NlcnZpY2VfdWlkPVwiICsgc2VsZi5fc2VydmljZV91aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCwgc2VsZi5fc2VydmljZV91aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bmlbDmja7lpLHotKUxXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNSZXBvcnQgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIOmFjee9ruaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy51bWFJbml0KClcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlIOajgOi9puaYr+WQpueUseahjOmdouWbvuagh+WQr+WKqFxyXG4gICAgICAgICAgICBxZy5pc1N0YXJ0dXBCeVNob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+mAmui/h+ahjOmdouWbvuagh+WQr+WKqOW6lOeUqCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdXJjZSA9IFwic2hvcnRDdXRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S4jeaYr+mAmui/h+ahjOmdouWbvuagh+WQr+WKqOW6lOeUqCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmogJiYgY29uZmlnT2JqLnZpdm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBTVF9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLnZpdm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IHRoaXMuX3NlcnZpY2VfdWlkID8gdGhpcy5fc2VydmljZV91aWQgOiBcIjBcIjtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zeXNJbmZvID0gdGhpcy5xZy5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlZJVk8g5bCP5ri45oiP5bmz5Y+w5L+h5oGvOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuU3lzSW5mbykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXMgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVF9OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMpO1xyXG4gICAgICAgICAgICBsZXQgZGF5OiBzdHJpbmcgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVF9MYXN0RGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChkYXkgIT0gY3VyRGF0ZS50b0RhdGVTdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzID0gMDtcclxuICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5qOA5rWL5qGM6Z2i5Zu+5qCH5piv5ZCm5Yib5bu6XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA0MVwiKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tIYXNTaG9ydEN1dCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzICYmIHV0aWxzLlNlcnZlckNvbmZpZyAmJiB1dGlscy5TZXJ2ZXJDb25maWcuc3RhcnRfYXV0b19jcmVhdGVfc2hvcnRfY3V0X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7hOS7tuWIneWni+WMluaIkOWKn++8jOW8ueWHuuiHquWKqOWIm+W7uuahjOmdou+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOe7hOS7tuWIneWni+WMluaIkOWKn++8jCR7dXRpbHMuU2VydmVyQ29uZmlnLnN0YXJ0X2F1dG9fY3JlYXRlX3Nob3J0X2N1dF90aW1lfeenkuWQjuW8ueWHuuiHquWKqOWIm+W7uuahjOmdou+8gWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNob3J0Y3V0KChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiHquWKqOWIm+W7uuahjOmdouaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLoh6rliqjliJvlu7rmoYzpnaLlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHV0aWxzLlNlcnZlckNvbmZpZy5zdGFydF9hdXRvX2NyZWF0ZV9zaG9ydF9jdXRfdGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZFNlcnZlclVybCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLnZpdm9jb25maWcgJiYgdXRpbHMuY29uZmlnLnZpdm9jb25maWcuYXBwSUQpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IFNUX1NlcnZlclVybCArIFwia3l4PXRydWUmYXBwX2lkPVwiICsgdXRpbHMuY29uZmlnLnZpdm9jb25maWcuYXBwSUQudHJpbSgpICsgXCImXCIgKyBcImNoYW5uZWw9dml2b1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlZJVk8gQVBQSUTphY3nva7lh7rplJnvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX2xvYWRDb25maWcoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QoU1RfU2VydmVyVXJsICsgbWV0aG9kLCAocmV0LCBkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJWSVZP5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5oiQ5YqfOiBkYXRhID0gXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX3Nob3dfbG9nX3ZpZXcgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX3Nob3dfbG9nX3ZpZXcgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZ1ZpZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWQr+S6huacrOWcsOaVsOaNrua1i+ivle+8jOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiVklWT+acjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJWSVZP5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcudml2b2NvbmZpZy5iYW5uZXJJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcudml2b2NvbmZpZy5pbnNlcnRJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcudml2b2NvbmZpZy52aWRlb0lkID0gdGhpcy5fc2VydmVyQ29uZmlnLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlSW5zZXJ0SWRzID0gdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVCYW5uZXJJZHMgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLnZpdm9jb25maWcubmF0aXZlVHJ5R2FtZUlkcyA9IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV90cnlnYW1lX3Bvc19pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnJlY0dhbWVCYW5uZXJJZCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlY19nYW1lX2Jhbm5lcl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLnZpdm9jb25maWcucmVjUG9ydGFsSWQgPSB0aGlzLlNlcnZlckNvbmZpZy5yZWNfcG9ydGFsX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcudml2b2NvbmZpZy5uYXRpdmVTaW5nbGVBZElkcyA9IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9zaW5nbGVfcG9zX2lkIHx8IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDljp/nlJ/lub/lkYrphY3nva46XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0ubG9jYXRpb24sIFwiPj4+PlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnNldE5hdGl2ZUJhbm5lckluZm8odGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzW2ldLmxvY2F0aW9uLCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfY3VzdG9tYWRfY29uZmlncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9jdXN0b21hZF9jb25maWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5Y6f55Sf5qih54mI5bm/5ZGK6YWN572uOlwiICsgdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2N1c3RvbWFkX2NvbmZpZ3NbaV0ubG9jYXRpb24sIFwiPj4+PlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfY3VzdG9tYWRfY29uZmlnc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLnZpdm9jb25maWcuc2V0Q3VzdG9tQWRJbmZvKHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9jdXN0b21hZF9jb25maWdzW2ldLmxvY2F0aW9uLCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfY3VzdG9tYWRfY29uZmlnc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr5TovoPlvZPliY3lubPlj7DniYjmnKzmmK/lkKbpq5jkuo7mjIflrprnmoTniYjmnKzlj7dcclxuICAgICAqIEBwYXJhbSBtaW5pVmVyc2lvbiDmnIDkvY7lubPlj7DniYjmnKzlj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzT3Zlck1pbmlWZXJzaW9uKG1pbmlWZXJzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbyAmJiB0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbkNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbkNvZGUgPj0gbWluaVZlcnNpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65qGM6Z2i5Zu+5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVTaG9ydGN1dChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgY2FsbGJhY2tGdW5jID0gY2FsbGJhY2s7XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPICYmIHRoaXMuY2FuQ3JlYXRlU2hvcnRjdXQoKSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNlbGYucWcuaW5zdGFsbFNob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmoYzpnaLlm77moIfliJvlu7rmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9zaG9ydGN1dENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja0Z1bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hvcnRjdXRDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ3Zpdm/liJvlu7rlpLHotKVlcnInICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuS4jeiDveWIm+W7ulwiKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrRnVuYykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWPr+S7peWIm+W7uuahjOmdouWbvuaghywg5b2T5YmN5bmz5Y+w5piv5ZCm5pSv5oyB5Yib5bu65b+r5o235pa55byPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5DcmVhdGVTaG9ydGN1dCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc092ZXJNaW5pVmVyc2lvbihcIjEwNDFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY291bnROYXRpdmVJbnNlckNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcysrO1xyXG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcywgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIhuS6q+S6i+S7tlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWIhuS6q+Wbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hhcmUoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc092ZXJNaW5pVmVyc2lvbihcIjEwNTJcIikpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZmFsc2UsIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucWcuc2hhcmUoKTtcclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDpqozor4HmoYzpnaLlv6vmjbfmlrnlvI/mmK/lkKbliJvlu7rov4dcclxuICAgICogQHBhcmFtIGNhbGxCYWNrIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0hhc1Nob3J0Q3V0KGNhbGxCYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuajgOa1i+ahjOmdouW/q+aNt+aWueW8j+aYr+WQpuW3sue7j+WIm+W7uui/hzogcmVzdWx0PVwiLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0Y3V0Q3JlYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrICYmIGNhbGxCYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuajgOa1i+Wksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmo4DmtYvlrozmiJDvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXlhbPljaHmlbDmja5cclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0TGV2ZWwobGV2ZWw6IHN0cmluZywgc3RhdHVzOiBMZXZlbFN0YXR1cywgbGV2ZWxOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxldmVsX2lkPSR7bGV2ZWx9JmxldmVsX25hbWU9JHtlbmNvZGVVUkkobGV2ZWxOYW1lKX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG4gICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgKi9cclxuICAgIHB1YmxpYyBzZW5kRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJldmVudFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZXZlbnQ9JHtlbmNvZGVVUkkoZXZlbnROYW1lKX1gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu25oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu25aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW8ueWHuuaPkOekuuahhlxyXG4gICAgKiBAcGFyYW0gbXNnIOa2iOaBr1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93VG9hc3QobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFnLnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtc2csXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAqIOaYr+WQpuaUr+aMgeS6kuaOqFxyXG4gICAqL1xyXG4gICAgY2FuU2hvd1JlY29tbWVuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5xZy5jcmVhdGVCb3hCYW5uZXJBZCAmJiB0aGlzLnFnLmNyZWF0ZUJveFBvcnRhbEFkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlY19nYW1lX2Jhbm5lcjogYW55ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5bGV56S6VklWT+S6kuaOqGJhbm5lclxyXG4gICAgICovXHJcbiAgICBzaG93UmVjQmFubmVyKGxvY2F0aW9uPzogQmFubmVyTG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3dSZWNvbW1lbmQoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54mI5pys5LiN5pSv5oyB5pi+56S65a6Y5pa55LqS5o6o77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLnZpdm9jb25maWcucmVjR2FtZUJhbm5lcklkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVjX2dhbWVfYmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIgPSB0aGlzLnFnLmNyZWF0ZUJveEJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLnZpdm9jb25maWcucmVjR2FtZUJhbm5lcklkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqGJhbm5lcuWKoOi9veaIkOWKnyEnKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkupLmjqhiYW5uZXLlsZXnpLrmiJDlip/vvIEnKVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5bGV56S65aSx6LSlOicgKyBlcnJvci5lcnJDb2RlICsgJywnICsgZXJyb3IuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5Yqg6L295byC5bi4IScsIGVyci5lcnJDb2RlICsgJywnICsgZXJyLmVyck1zZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkupLmjqhiYW5uZXLlsZXnpLrmiJDlip/vvIEnKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLkupLmjqhCYW5uZXLlsZXnpLrmiJDlip/vvIzkvY3nva7vvJpcIiArIGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkupLmjqhiYW5uZXLlsZXnpLrlpLHotKU6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJWSVZPIOS6kuaOqGJhbm5lciBJROacqumFjee9ru+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/kupLmjqhiYW5uZXJcclxuICAgICAqL1xyXG4gICAgaGlkZVJlY0Jhbm5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVjX2dhbWVfYmFubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5oaWRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdWSVZPIOS6kuaOqGJhbm5lciDpmpDol4/miJDlip/vvIEnKVxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ1ZJVk8g5LqS5o6oYmFubmVyIOmakOiXj+Wksei0pTonICsgZXJyb3IuZXJyQ29kZSArICcsJyArIGVycm9yLmVyck1zZylcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX3JlY19nYW1lX3BvcnRhbDogYW55ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5bGV56S6VklWT+S5neWuq+agvFxyXG4gICAgICovXHJcbiAgICBzaG93R2FtZVBvcnRhbCh0b3A6IG51bWJlciA9IDIwMCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93UmVjb21tZW5kKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeaYvuekuuWumOaWueS6kuaOqO+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnJlY1BvcnRhbElkKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjX2dhbWVfcG9ydGFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVHYW1lUG9ydGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX3BvcnRhbCA9IHRoaXMucWcuY3JlYXRlQm94UG9ydGFsQWQoe1xyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnJlY1BvcnRhbElkLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICcnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiB0b3AgLyBjYy53aW5TaXplLmhlaWdodCAqIHRoaXMuU3lzSW5mby5zY3JlZW5IZWlnaHRcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX3BvcnRhbC5vbkVycm9yKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnm5LlrZDkuZ3lrqvmoLzlub/lkYrliqDovb3lpLHotKVcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX3BvcnRhbC5vbkNsb3NlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ2Nsb3NlIF9yZWNfZ2FtZV9wb3J0YWwnKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlY19nYW1lX3BvcnRhbC5pc0Rlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5b2T5Lmd5a6r5qC85YWz6Zet5LmL5ZCO77yM5YaN5qyh5bGV56S6SWNvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfcG9ydGFsLnNob3coKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyDlub/lkYrmlbDmja7liqDovb3miJDlip/lkI7lsZXnpLpcclxuICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfcG9ydGFsLnNob3coKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ3Nob3cgc3VjY2VzcyBfcmVjX2dhbWVfcG9ydGFsJylcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlZJVk8g5LqS5o6o5Lmd5a6r5qC8IElE5pyq6YWN572u77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/kuZ3lrqvmoLxcclxuICAgICAqL1xyXG4gICAgaGlkZUdhbWVQb3J0YWwoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjX2dhbWVfcG9ydGFsICYmIHRoaXMuX3JlY19nYW1lX3BvcnRhbC5oaWRlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ2hpZGVHYW1lUG9ydGFsIHN1Y2Nlc3MnKVxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKCdoaWRlR2FtZVBvcnRhbCBmYWlsIHdpdGg6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5Y+L55ufc2Rr5Yid5aeL5YyWICovXHJcbiAgICB1bWFJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1VtZW5nKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWPi+ebn0lE5pyq6YWN572u77yM5LiN5omn6KGM5Y+L55uf5Yid5aeL5YyWPj4+PlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdW1hLmluaXQoe1xyXG4gICAgICAgICAgICBhcHBLZXk6IHV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnVtZW5nSWQsXHJcbiAgICAgICAgICAgIHVzZU9wZW5pZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRlYnVnOiBDQ19ERUJVR1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAqIOWPi+ebn+a4uOaIj+W8gOWni+S4iuaKpVxyXG4gICAgICAgKiBAcGFyYW0gbGV2ZWxJRCBcclxuICAgICAgICovXHJcbiAgICBwdWJsaWMgdW1hT25TdGFydChsZXZlbElEOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcWcudW1hLnN0YWdlLm9uU3RhcnQoe1xyXG4gICAgICAgICAgICBzdGFnZUlkOiBsZXZlbElELC8v6K+l5a2X5q615ZCN56ew5LiN5Y+v5L+u5pS577yM5b+F5LygXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogYOesrCR7bGV2ZWxJRH3lhbNgLy8g5YWz5Y2haWRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKblvIDlkK/lj4vnm58gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tVbWVuZygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy52aXZvY29uZmlnLnVtZW5nSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+L55uf57uT566X5LiK5oqlXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxJRCDlhbPljaFpZFxyXG4gICAgICogQHBhcmFtIHN0YWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gZXZlbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bWFSZXBvcnRlZExldmVsKGxldmVsSUQ6IHN0cmluZywgZXZlbnQ6IExldmVsU3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxZy51bWEuc3RhZ2Uub25FbmQoe1xyXG4gICAgICAgICAgICBzdGFnZUlkOiBsZXZlbElELC8v6K+l5a2X5q615ZCN56ew5LiN5Y+v5L+u5pS577yM5b+F5LygXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogYOesrCR7bGV2ZWxJRH3lhbNgLFxyXG4gICAgICAgICAgICBldmVudDogZXZlbnRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPi+ebn+iHquWumuS5ieS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50SWQg5LqL5Lu2SUTvvIzms6jmhI/vvJrkuovku7ZJROW/hemhu+imgeWcqOWQjuWPsOmFjee9rlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyDkuovku7blhoXlrrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVtYVRyYWNrRXZlbnQoZXZlbnRJZDogc3RyaW5nLCBwYXJhbXM/KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxZy51bWEudHJhY2tFdmVudChldmVudElkLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=