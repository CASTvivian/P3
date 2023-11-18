
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_HuaWei.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7a4893Gs+9OpLSK3fRFXNCD', 'YZ_Tool_HuaWei');
// common-plugin/Scripts/YZ_Tool_HuaWei.ts

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
var YZ_Tool_HuaWei = /** @class */ (function () {
    function YZ_Tool_HuaWei() {
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
        //启动来源类型：shortcut、url、app、quickapp、deeplink、other
        this._luanchType = "";
        //启动参数
        this._luanchData = "";
        //是否上报激活
        this.isReportActive = false;
        //回传类型 === activate:用户首次打开 app login:用户完成登陆行为 subscribe:闯一关（用户完成某项服务/频道订阅行为）
        this.yz_conversion_type = "";
        this.passCount = 0; //通关数据
        this.playCount = 0; //开始关卡数据
        this._is_login = false;
        this._isShowLogin = false;
        this._loging = false;
        this.isRequestLogin = false;
    }
    Object.defineProperty(YZ_Tool_HuaWei.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_HuaWei.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_HuaWei.prototype, "NativeInsertAdClickTimes", {
        get: function () {
            return this._nativeInsertAdClickTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_HuaWei.prototype, "ShortcutCreated", {
        get: function () {
            return this._shortcutCreated;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_HuaWei.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_HuaWei.prototype, "serviceId", {
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
    YZ_Tool_HuaWei.prototype._login = function () {
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
                this._uid = "0";
                this.reportLogin();
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_HuaWei.prototype.reportLogin = function () {
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
                        if (_this.yz_conversion_type == "activate") {
                            self.reportUserActive();
                        }
                        if (_this.yz_conversion_type == "login" && _this._is_login) {
                            Utils_1.utils.showLog("用户完成登陆行为!");
                            _this.reportUserActive();
                        }
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
     * 上报用户激活，用于回传
     */
    YZ_Tool_HuaWei.prototype.reportUserActive = function () {
        Utils_1.utils.showLog("上报用户激活！！");
        if (!this.isReportActive) {
            this.isReportActive = true;
            this.reportAttributedEvent(YZ_Constant_1.AttributedType.Active, YZ_Constant_1.AttributedKey.Active, YZ_Constant_1.AttributedValue.Active);
        }
    };
    /**
     *
     * @param data 配置数据
     */
    YZ_Tool_HuaWei.prototype.init = function (data) {
        if (PlatUtils_1.default.IsHuaWei) {
            this.umaInit();
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.huawei) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.huawei);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._sysInfo = this.qg.getSystemInfoSync();
            if (this._sysInfo) {
                Utils_1.utils.showLog("huawei 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }
            var options = this.qg.getLaunchOptionsSync();
            this._luanchData = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_LUANCH_DATA);
            this._luanchType = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_LUANCH_TYPE);
            if (this._luanchData && this._luanchType) {
                Utils_1.utils.showLog("获取到本地缓存数据启动类型：" + this._luanchType);
                Utils_1.utils.showLog("获取到本地缓存数据启动参数：" + this._luanchData);
            }
            else if (options) {
                try {
                    if (options.referrerInfo && JSON.stringify(options.referrerInfo) != "{}") {
                        var referrerInfo = options.referrerInfo;
                        Utils_1.utils.showLog("获取到小程序启动来源信息：" + JSON.stringify(referrerInfo));
                        this._luanchType = referrerInfo.type;
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_LUANCH_TYPE, this._luanchType);
                    }
                    if (options.query && JSON.stringify(options.query) != "{}") {
                        var query = JSON.parse(options.query);
                        var queryData = JSON.stringify(query);
                        this._luanchData = queryData;
                        this.yz_conversion_type = query.yz_conversion_type;
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_LUANCH_DATA, this._luanchData);
                        Utils_1.utils.showLog("获取到小程序启动参数：" + queryData + " 回传类型：" + this.yz_conversion_type);
                    }
                }
                catch (erro) {
                    Utils_1.utils.showLog("获取到小程序启动参数异常");
                }
            }
            this._loadConfig();
            this._nativeInsertAdClickTimes = YZ_LocalStorage_1.default.getItem(ST_NativeInsertAdClickTimes);
            var day = YZ_LocalStorage_1.default.getItem(ST_LastDateTime);
            var curDate = new Date();
            if (day != curDate.toDateString()) {
                this._nativeInsertAdClickTimes = 0;
                YZ_LocalStorage_1.default.setItem(ST_NativeInsertAdClickTimes, 0);
            }
            // utils.registerServerInitEvent(() => {
            //     if (this.yz_conversion_type == "game_time_report") {
            //         utils.scheduleOnce(() => {
            //             this.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.GameTimeAction);
            //         }, utils.getConfigByKey("game_time_report"));
            //     }
            // }, this);
        }
    };
    // _buildServerUrl() {
    //     if (PlatUtils.IsHuaWei) {
    //         let url: string = "";
    //         if (utils.config.huaweiConfig && utils.config.huaweiConfig.appID) {
    //             url = ST_ServerUrl + "kyx=true&app_id=" + utils.config.huaweiConfig.appID.trim() + "&" + "channel=vivo";
    //         } else {
    //             utils.showLog("VIVO APPID配置出错！");
    //         }
    //         return url;
    //     }
    //     return null;
    // }
    YZ_Tool_HuaWei.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsHuaWei) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("Huawei服务器配置数据获取成功: data = " + data);
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
                            Utils_1.utils.showLog("Huawei服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("Huawei服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.huaweiConfig.bannerId = _this._serverConfig.banner_pos_id;
                        Utils_1.utils.config.huaweiConfig.insertId = _this._serverConfig.intersititia_pos_id;
                        Utils_1.utils.config.huaweiConfig.videoId = _this._serverConfig.video_pos_id;
                        Utils_1.utils.config.huaweiConfig.nativeInsertIds = _this.ServerConfig.native_intersititial_pos_id;
                        Utils_1.utils.config.huaweiConfig.nativeBannerIds = _this.ServerConfig.native_banner_pos_id;
                        Utils_1.utils.config.huaweiConfig.nativeTryGameIds = _this.ServerConfig.native_trygame_pos_id;
                        Utils_1.utils.config.huaweiConfig.nativeSplashId = _this.ServerConfig.native_splash_id;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                    if (_this.ServerConfig.native_banner_configs) {
                        for (var i = 0; i < _this.ServerConfig.native_banner_configs.length; i++) {
                            Utils_1.utils.showLog("获取到原生广告配置:" + _this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(_this.ServerConfig.native_banner_configs[i]));
                            Utils_1.utils.config.huaweiConfig.setNativeBannerInfo(_this.ServerConfig.native_banner_configs[i].location, _this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                    if (_this.ServerConfig.yz_conversion_type) {
                        _this.yz_conversion_type = _this.ServerConfig.yz_conversion_type;
                        Utils_1.utils.showLog("回传类型：" + _this.yz_conversion_type);
                    }
                    if (_this.ServerConfig.is_login && _this.ServerConfig.is_login == "false") {
                        _this._is_login = true;
                    }
                    _this._isShowLogin = true;
                    _this.isRequestLogin && _this.login();
                }
                cc.director.emit("IsDataInit");
                // utils.registerPrivacyCloseEvent(() => {
                Utils_1.utils.emitServerInitEvent();
                // }, this);
            });
        }
    };
    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    YZ_Tool_HuaWei.prototype.isOverMiniVersion = function (miniVersion) {
        if (PlatUtils_1.default.IsHuaWei) {
            if (this._sysInfo && this._sysInfo.platformVersionCode) {
                return this._sysInfo.platformVersionCode >= miniVersion;
            }
        }
        return false;
    };
    /**
     * 创建桌面图标
     */
    YZ_Tool_HuaWei.prototype.createShortcut = function (callback) {
        var callbackFunc = callback;
        if (PlatUtils_1.default.IsHuaWei && this.canCreateShortcut()) {
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
    YZ_Tool_HuaWei.prototype.canCreateShortcut = function () {
        if (PlatUtils_1.default.IsHuaWei) {
            return this.isOverMiniVersion("1041");
        }
        return false;
    };
    YZ_Tool_HuaWei.prototype.countNativeInserClick = function () {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage_1.default.setItem(ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    };
    /**
     * 分享事件
     * @param callback 分享回调
     */
    YZ_Tool_HuaWei.prototype.share = function (callback) {
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
    YZ_Tool_HuaWei.prototype.checkHasShortCut = function (callBack) {
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
    YZ_Tool_HuaWei.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsHuaWei) {
            if (this.yz_conversion_type == "subscribe") {
                Utils_1.utils.showLog("用户完成某项服务/频道订阅行为");
                this.reportUserActive();
            }
            if (status == YZ_Constant_1.LevelStatus.GameWin) {
                this.passCount++;
                if (this.passCount === Utils_1.utils.getConfigByKey("pass_level_count_active")) {
                    this.reportAttributedEvent(YZ_Constant_1.AttributedType.GameAddiction, YZ_Constant_1.AttributedKey.GameAddiction, YZ_Constant_1.AttributedValue.PassLevelCountAction);
                }
            }
            else if (status === YZ_Constant_1.LevelStatus.GameStart) {
                this.playCount++;
                if (this.playCount == Utils_1.utils.getConfigByKey("play_level_count_active")) {
                    this.reportAttributedEvent(YZ_Constant_1.AttributedType.GameAddiction, YZ_Constant_1.AttributedKey.GameAddiction, YZ_Constant_1.AttributedValue.PlayLevelCountAction);
                }
            }
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
    YZ_Tool_HuaWei.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsHuaWei) {
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
    YZ_Tool_HuaWei.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsHuaWei) {
            //@ts-ignore
            qg.showToast({
                message: msg,
                duration: 2000
            });
        }
    };
    /**
    * 上报归因事件
    * @param eventType 事件类型 0 激活， 25:关键行为
    * @param eventValue 事件描述
    */
    YZ_Tool_HuaWei.prototype.reportAttributedEvent = function (eventType, eventKey, eventValue) {
        if (this._luanchType != "deeplink") {
            Utils_1.utils.showLog("luanchType=" + this._luanchType + ",不进行归因上报");
            return;
        }
        Utils_1.utils.showLog("上报归因事件：  #eventType=" + eventType + "#eventKey=" + eventKey + "#eventValue=" + eventValue);
        if (eventType == YZ_Constant_1.AttributedType.Active && YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_IS_REPORT_USER_ACTIVE)) {
            Utils_1.utils.showLog("用户已经上报过激活，不再进行激活上报！");
            return;
        }
        else if (eventType == YZ_Constant_1.AttributedType.GameAddiction && YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_IS_REPORT_GAME_ADDICTION)) {
            Utils_1.utils.showLog("用户已经上报过关键行为，不再进行激活上报！");
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.timeout = 15000; // 单位毫秒
        var data = {};
        data.app_id = Utils_1.utils.config.huaweiConfig.appID;
        data.channel = "huawei_kyx";
        data.uid = this._service_uid;
        data.event_type = eventType;
        data.event_key = eventKey;
        data.event_value = eventValue;
        data.app_version = Utils_1.utils.config.huaweiConfig.version;
        data.luanchDate = encodeURI(this._luanchData);
        Utils_1.utils.showLog("归因请求参数:" + JSON.stringify(data));
        var requestData = JSON.stringify(data);
        Utils_1.utils.showLog("归因 > json_data=" + Utils_1.utils.aesEncrypt(requestData));
        var requestUrl = "https://track.youletd.com/wechatcounterpart/dockingreturn?json=" + Utils_1.utils.aesEncrypt(requestData) + "&time_stamp=" + (new Date()).getTime();
        Utils_1.utils.showLog("归因服务器地址:" + requestUrl);
        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = function () {
            Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (eventType == YZ_Constant_1.AttributedType.Active)
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_IS_REPORT_USER_ACTIVE, "true");
                    if (eventType == YZ_Constant_1.AttributedType.GameAddiction)
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_IS_REPORT_GAME_ADDICTION, "true");
                    Utils_1.utils.showLog("归因上报成功：", xhr.responseText);
                }
                else {
                    Utils_1.utils.showLog("归因上报失败！");
                }
            }
        };
        xhr.ontimeout = function () {
            Utils_1.utils.showLog("归因请求超时!");
        };
        xhr.onerror = function (err) {
            Utils_1.utils.showLog("归因请求失败!");
        };
    };
    /**
     * 退出游戏
     */
    YZ_Tool_HuaWei.prototype.GameExit = function () {
        if (PlatUtils_1.default.IsHuaWei) {
            Utils_1.utils.showLog("GameExit");
            try {
                //@ts-ignore
                qg.exitApplication({
                    success: function () {
                        console.log("exitApplication success");
                    },
                    fail: function () {
                        console.log("exitApplication fail");
                    },
                    complete: function () {
                        console.log("exitApplication complete");
                    }
                });
            }
            catch (error) {
                cc.log(error);
            }
        }
    };
    /**
     * 登录
     */
    YZ_Tool_HuaWei.prototype.login = function () {
        var _this = this;
        Utils_1.utils.showLog("huawei login");
        this.isRequestLogin = true;
        if (!this._isShowLogin || this._loging)
            return;
        this._loging = true;
        if (this._is_login) {
            this._loging = false;
            this.showToast("登录成功！");
            cc.game.emit(YZ_Constant_1.default.ST_LOGIN_SUCCESS);
            Utils_1.utils.showLog("已经登录过不再重新登录！");
            if (this.yz_conversion_type == "login") {
                this.reportUserActive();
            }
            return;
        }
        this.qg.gameLogin({
            forceLogin: 1,
            appid: Utils_1.utils.config.huaweiConfig.appID,
            success: function (data) {
                _this._loging = false;
                _this.showToast("登录成功！");
                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_SUCCESS);
                Utils_1.utils.showLog("Game login success:" + data);
                _this._is_login = true;
                if (_this.yz_conversion_type == "login") {
                    Utils_1.utils.showLog("用户完成登陆行为!");
                    _this.reportUserActive();
                }
            },
            fail: function (data, code) {
                _this._loging = false;
                _this.showToast("登录失败！");
                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_FAIL);
                Utils_1.utils.showLog("Game login fail:" + data + ", code:" + code);
            }
        });
        this.isRequestLogin = false;
    };
    /**友盟sdk初始化 */
    YZ_Tool_HuaWei.prototype.umaInit = function () {
        if (!this.checkUmeng()) {
            Utils_1.utils.showLog("友盟ID未配置，不执行友盟初始化>>>>");
            return;
        }
        Utils_1.utils.showLog("umeng init #id=" + Utils_1.utils.config.huaweiConfig.umengId);
        uma.init({
            appKey: Utils_1.utils.config.huaweiConfig.umengId,
            useOpenid: false,
            debug: true
        });
    };
    /**
       * 友盟游戏开始上报
       * @param levelID
       */
    YZ_Tool_HuaWei.prototype.umaOnStart = function (levelID) {
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
    YZ_Tool_HuaWei.prototype.checkUmeng = function () {
        if (!Utils_1.utils.config.huaweiConfig.umengId) {
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
    YZ_Tool_HuaWei.prototype.umaReportedLevel = function (levelID, event) {
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
    YZ_Tool_HuaWei.prototype.umaTrackEvent = function (eventId, params) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        qg.uma.trackEvent(eventId, params);
    };
    YZ_Tool_HuaWei = __decorate([
        ccclass
    ], YZ_Tool_HuaWei);
    return YZ_Tool_HuaWei;
}());
exports.default = YZ_Tool_HuaWei;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9IdWFXZWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUF5RztBQUN6RyxxREFBZ0Q7QUFDaEQsWUFBWTtBQUNaLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBRS9DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUksc0JBQXNCLEdBQVcsRUFBRSxDQUFDO0FBQ3hDLElBQU0sWUFBWSxHQUFXLDhCQUE4QixDQUFDO0FBQzVELElBQU0sY0FBYyxHQUFXLGdDQUFnQyxDQUFDO0FBQ2hFLElBQU0sMkJBQTJCLEdBQVcsMEJBQTBCLENBQUM7QUFDdkUsSUFBTSxlQUFlLEdBQVcsY0FBYyxDQUFDO0FBRy9DO0lBQUE7UUFDSSxZQUFZO1FBQ1osT0FBRSxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7VUFnQkU7UUFDRixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBS3JCLGtCQUFhLEdBQVEsSUFBSSxDQUFDO1FBSzFCLDhCQUF5QixHQUFXLENBQUMsQ0FBQztRQUt0QyxXQUFXO1FBQ1gscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBS2xDLE9BQU87UUFDUCxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBUW5CLFVBQVU7UUFDVixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQVkzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBZ0I1QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0IseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGFBQVEsR0FB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O09BSUc7SUFDSSxzQ0FBYSxHQUFwQixVQUFxQixPQUFlLEVBQUUsTUFBTztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUFFLE9BQU87UUFFL0IsWUFBWTtRQUNaLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBenJCZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTByQmxDO0lBQUQscUJBQUM7Q0ExckJELEFBMHJCQyxJQUFBO2tCQTFyQm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBBdHRyaWJ1dGVkS2V5LCBBdHRyaWJ1dGVkVHlwZSwgQXR0cmlidXRlZFZhbHVlLCBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcbi8vQHRzLWlnbm9yZVxyXG52YXIgdW1hID0gcmVxdWlyZSgnLi9VTWVuZ1NESy9xdWlja0dhbWUvdW1hLm1pbi5qcycpO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmxldCBTVF9EZWZhdWx0U2VydmVyQ29uZmlnOiBzdHJpbmcgPSBcIlwiO1xyXG5jb25zdCBTVF9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cDovL2FwcHMueW91bGVzcC5jb20vZ3NzP1wiO1xyXG5jb25zdCBQT1NUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vcmVwb3J0LnlvdWxlc3AuY29tL2dzcz9cIjtcclxuY29uc3QgU1RfTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzOiBzdHJpbmcgPSBcIk5hdGl2ZUluc2VydEFkQ2xpY2tUaW1lc1wiO1xyXG5jb25zdCBTVF9MYXN0RGF0ZVRpbWU6IHN0cmluZyA9IFwiTGFzdERhdGVUaW1lXCI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX0h1YVdlaSB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIHFnOiBhbnkgPSB3aW5kb3cucWc7XHJcbiAgICAvKlxyXG4gICAgYnJhbmRcdFN0cmluZ1x06K6+5aSH5ZOB54mMXHJcbiAgICBtYW51ZmFjdHVyZXJcdFN0cmluZ1x06K6+5aSH55Sf5Lqn5ZWGXHJcbiAgICBtb2RlbFx0U3RyaW5nXHTorr7lpIflnovlj7dcclxuICAgIHByb2R1Y3RcdFN0cmluZ1x06K6+5aSH5Luj5Y+3XHJcbiAgICBvc1R5cGVcdFN0cmluZ1x05pON5L2c57O757uf5ZCN56ewXHJcbiAgICBvc1ZlcnNpb25OYW1lXHRTdHJpbmdcdOaTjeS9nOezu+e7n+eJiOacrOWQjeensFxyXG4gICAgb3NWZXJzaW9uQ29kZVx0TnVtYmVyXHTmk43kvZzns7vnu5/niYjmnKzlj7dcclxuICAgIHBsYXRmb3JtVmVyc2lvbk5hbWVcdFN0cmluZ1x06L+Q6KGM5bmz5Y+w54mI5pys5ZCN56ewXHJcbiAgICBwbGF0Zm9ybVZlcnNpb25Db2RlXHROdW1iZXJcdOi/kOihjOW5s+WPsOeJiOacrOWPt1xyXG4gICAgbGFuZ3VhZ2VcdFN0cmluZ1x057O757uf6K+t6KiAXHJcbiAgICByZWdpb25cdFN0cmluZ1x057O757uf5Zyw5Yy6XHJcbiAgICBzY3JlZW5XaWR0aFx0TnVtYmVyXHTlsY/luZXlrr1cclxuICAgIHNjcmVlbkhlaWdodFx0TnVtYmVyXHTlsY/luZXpq5hcclxuICAgIGJhdHRlcnlcdE51bWJlclx05b2T5YmN55S16YeP77yMMC4wIC0gMS4wIOS5i+mXtFxyXG4gICAgd2lmaVNpZ25hbFx0TnVtYmVyXHR3aWZp5L+h5Y+35by65bqm77yM6IyD5Zu0MCAtIDRcclxuICAgICovXHJcbiAgICBfc3lzSW5mbzogYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgU3lzSW5mbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3lzSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlckNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBfbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVJbnNlcnRBZENsaWNrVGltZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcztcclxuICAgIH1cclxuXHJcbiAgICAvLyDmoYzpnaLlm77moIfmmK/lkKbliJvlu7pcclxuICAgIF9zaG9ydGN1dENyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBnZXQgU2hvcnRjdXRDcmVhdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9ydGN1dENyZWF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7lpIdVSURcclxuICAgIF91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdWlkKCkge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3VpZDtcclxuICAgICAgICAvLyB0aGlzLl9sb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL+acjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgX3NlcnZpY2VfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOacjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNlcnZpY2VJZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl9zZXJ2aWNlX3VpZDtcclxuICAgICAgICB0aGlzLnJlcG9ydExvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfbG9naW5UaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgX2xvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG4gICAgYXN5bmMgX2xvZ2luKCkge1xyXG5cclxuICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2xvZ2luVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDAgJiYgaW50ZXJ2YWwgPCB0aGlzLl9sb2dpbkludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOeZu+W9leivt+axgumXtOmalOWwj+S6ju+8miR7dGhpcy5fbG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl91aWQgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnJlcG9ydExvZ2luKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9yZXBvcnRMb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfcmVwb3J0TG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBpc1JlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy/nlKjmiLfmnaXmupBcclxuICAgIF9zb3VyY2U6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy/lkK/liqjmnaXmupDnsbvlnovvvJpzaG9ydGN1dOOAgXVybOOAgWFwcOOAgXF1aWNrYXBw44CBZGVlcGxpbmvjgIFvdGhlclxyXG4gICAgX2x1YW5jaFR5cGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvL+WQr+WKqOWPguaVsFxyXG4gICAgX2x1YW5jaERhdGE6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy/mmK/lkKbkuIrmiqXmv4DmtLtcclxuICAgIGlzUmVwb3J0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy/lm57kvKDnsbvlnosgPT09IGFjdGl2YXRlOueUqOaIt+mmluasoeaJk+W8gCBhcHAgbG9naW4655So5oi35a6M5oiQ55m76ZmG6KGM5Li6IHN1YnNjcmliZTrpl6/kuIDlhbPvvIjnlKjmiLflrozmiJDmn5DpobnmnI3liqEv6aKR6YGT6K6i6ZiF6KGM5Li677yJXHJcbiAgICB5el9jb252ZXJzaW9uX3R5cGU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fcmVwb3J0TG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDkuIrmiqXnmbvlvZXojrflj5ZVSUTlsI/kuo7vvJoke3RoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJtPWxvZ2luXCI7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZkZXZpY2VfZGF0YT0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNJbmZvKSl9YDtcclxuXHJcbiAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImRhdGE9XCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwicmVzdWx0PVwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwicmVzdWx0LnVpZD1cIiArIHJlc3VsdC51aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3NlcnZpY2VfdWlkID0gXCJcIiArIHJlc3VsdC51aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajor7fmsYLnmbvlvZXmiJDlip8hIF9zZXJ2aWNlX3VpZD1cIiArIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQsIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueXpfY29udmVyc2lvbl90eXBlID09IFwiYWN0aXZhdGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXBvcnRVc2VyQWN0aXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueXpfY29udmVyc2lvbl90eXBlID09IFwibG9naW5cIiAmJiB0aGlzLl9pc19sb2dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueUqOaIt+WujOaIkOeZu+mZhuihjOS4uiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydFVzZXJBY3RpdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5pWw5o2u5aSx6LSlMVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55So5oi35r+A5rS777yM55So5LqO5Zue5LygXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBvcnRVc2VyQWN0aXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXnlKjmiLfmv4DmtLvvvIHvvIFcIik7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVwb3J0QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSZXBvcnRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlcG9ydEF0dHJpYnV0ZWRFdmVudChBdHRyaWJ1dGVkVHlwZS5BY3RpdmUsIEF0dHJpYnV0ZWRLZXkuQWN0aXZlLCBBdHRyaWJ1dGVkVmFsdWUuQWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgdGhpcy51bWFJbml0KClcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai5odWF3ZWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBTVF9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLmh1YXdlaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IFwiMFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3N5c0luZm8gPSB0aGlzLnFnLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zeXNJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiaHVhd2VpIOWwj+a4uOaIj+W5s+WPsOS/oeaBrzogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLlN5c0luZm8pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLnFnLmdldExhdW5jaE9wdGlvbnNTeW5jKClcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2x1YW5jaERhdGEgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9MVUFOQ0hfREFUQSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2x1YW5jaFR5cGUgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9MVUFOQ0hfVFlQRSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbHVhbmNoRGF0YSAmJiB0aGlzLl9sdWFuY2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5pys5Zyw57yT5a2Y5pWw5o2u5ZCv5Yqo57G75Z6L77yaXCIgKyB0aGlzLl9sdWFuY2hUeXBlKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDmnKzlnLDnvJPlrZjmlbDmja7lkK/liqjlj4LmlbDvvJpcIiArIHRoaXMuX2x1YW5jaERhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVmZXJyZXJJbmZvICYmIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucmVmZXJyZXJJbmZvKSAhPSBcInt9XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlZmVycmVySW5mbyA9IG9wdGlvbnMucmVmZXJyZXJJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5bCP56iL5bqP5ZCv5Yqo5p2l5rqQ5L+h5oGv77yaXCIgKyBKU09OLnN0cmluZ2lmeShyZWZlcnJlckluZm8pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbHVhbmNoVHlwZSA9IHJlZmVycmVySW5mby50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9MVUFOQ0hfVFlQRSwgdGhpcy5fbHVhbmNoVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5xdWVyeSAmJiBKU09OLnN0cmluZ2lmeShvcHRpb25zLnF1ZXJ5KSAhPSBcInt9XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gSlNPTi5wYXJzZShvcHRpb25zLnF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1ZXJ5RGF0YSA9IEpTT04uc3RyaW5naWZ5KHF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbHVhbmNoRGF0YSA9IHF1ZXJ5RGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueXpfY29udmVyc2lvbl90eXBlID0gcXVlcnkueXpfY29udmVyc2lvbl90eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9MVUFOQ0hfREFUQSwgdGhpcy5fbHVhbmNoRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDlsI/nqIvluo/lkK/liqjlj4LmlbDvvJpcIiArIHF1ZXJ5RGF0YSArIFwiIOWbnuS8oOexu+Wei++8mlwiICsgdGhpcy55el9jb252ZXJzaW9uX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5bCP56iL5bqP5ZCv5Yqo5Y+C5pWw5byC5bi4XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXMgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVF9OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMpO1xyXG4gICAgICAgICAgICBsZXQgZGF5OiBzdHJpbmcgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVF9MYXN0RGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChkYXkgIT0gY3VyRGF0ZS50b0RhdGVTdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzID0gMDtcclxuICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy55el9jb252ZXJzaW9uX3R5cGUgPT0gXCJnYW1lX3RpbWVfcmVwb3J0XCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB1dGlscy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnJlcG9ydEF0dHJpYnV0ZWRFdmVudChBdHRyaWJ1dGVkVHlwZS5HYW1lQWRkaWN0aW9uLCBBdHRyaWJ1dGVkS2V5LkdhbWVBZGRpY3Rpb24sIEF0dHJpYnV0ZWRWYWx1ZS5HYW1lVGltZUFjdGlvbik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSwgdXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJnYW1lX3RpbWVfcmVwb3J0XCIpKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfSwgdGhpcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIF9idWlsZFNlcnZlclVybCgpIHtcclxuICAgIC8vICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvLyAgICAgICAgIGlmICh1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnICYmIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcuYXBwSUQpIHtcclxuICAgIC8vICAgICAgICAgICAgIHVybCA9IFNUX1NlcnZlclVybCArIFwia3l4PXRydWUmYXBwX2lkPVwiICsgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5hcHBJRC50cmltKCkgKyBcIiZcIiArIFwiY2hhbm5lbD12aXZvXCI7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiVklWTyBBUFBJROmFjee9ruWHuumUme+8gVwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuXHJcbiAgICBfbG9hZENvbmZpZygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwibT1nXCI7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCwgKHJldCwgZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiSHVhd2Vp5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5oiQ5YqfOiBkYXRhID0gXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX3Nob3dfbG9nX3ZpZXcgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX3Nob3dfbG9nX3ZpZXcgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZ1ZpZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWQr+S6huacrOWcsOaVsOaNrua1i+ivle+8jOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiSHVhd2Vp5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkh1YXdlaeacjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluWksei0pSwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IEpTT04ucGFyc2UoU1RfRGVmYXVsdFNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWQgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy5iYW5uZXJJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmluc2VydElkID0gdGhpcy5fc2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcudmlkZW9JZCA9IHRoaXMuX3NlcnZlckNvbmZpZy52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzID0gdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZUJhbm5lcklkcyA9IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfdHJ5Z2FtZV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcubmF0aXZlU3BsYXNoSWQgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfc3BsYXNoX2lkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDljp/nlJ/lub/lkYrphY3nva46XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0ubG9jYXRpb24sIFwiPj4+PlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcuc2V0TmF0aXZlQmFubmVySW5mbyh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0ubG9jYXRpb24sIHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9iYW5uZXJfY29uZmlnc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLnl6X2NvbnZlcnNpb25fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnl6X2NvbnZlcnNpb25fdHlwZSA9IHRoaXMuU2VydmVyQ29uZmlnLnl6X2NvbnZlcnNpb25fdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWbnuS8oOexu+Wei++8mlwiICsgdGhpcy55el9jb252ZXJzaW9uX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaXNfbG9naW4gJiYgdGhpcy5TZXJ2ZXJDb25maWcuaXNfbG9naW4gPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzX2xvZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU2hvd0xvZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVxdWVzdExvZ2luICYmIHRoaXMubG9naW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJJc0RhdGFJbml0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHV0aWxzLnJlZ2lzdGVyUHJpdmFjeUNsb3NlRXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavlOi+g+W9k+WJjeW5s+WPsOeJiOacrOaYr+WQpumrmOS6juaMh+WumueahOeJiOacrOWPt1xyXG4gICAgICogQHBhcmFtIG1pbmlWZXJzaW9uIOacgOS9juW5s+WPsOeJiOacrOWPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNPdmVyTWluaVZlcnNpb24obWluaVZlcnNpb246IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N5c0luZm8gJiYgdGhpcy5fc3lzSW5mby5wbGF0Zm9ybVZlcnNpb25Db2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3lzSW5mby5wbGF0Zm9ybVZlcnNpb25Db2RlID49IG1pbmlWZXJzaW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuahjOmdouWbvuagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlU2hvcnRjdXQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGNhbGxiYWNrRnVuYyA9IGNhbGxiYWNrO1xyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpICYmIHRoaXMuY2FuQ3JlYXRlU2hvcnRjdXQoKSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNlbGYucWcuaW5zdGFsbFNob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfmoYzpnaLlm77moIfliJvlu7rmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9zaG9ydGN1dENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja0Z1bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hvcnRjdXRDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ3Zpdm/liJvlu7rlpLHotKVlcnInICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuS4jeiDveWIm+W7ulwiKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrRnVuYykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWPr+S7peWIm+W7uuahjOmdouWbvuaghywg5b2T5YmN5bmz5Y+w5piv5ZCm5pSv5oyB5Yib5bu65b+r5o235pa55byPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5DcmVhdGVTaG9ydGN1dCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA0MVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb3VudE5hdGl2ZUluc2VyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzKys7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RfTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzLCB0aGlzLl9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5YiG5Lqr5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZShjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA1MlwiKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhmYWxzZSwgXCLlvZPliY3lubPlj7DkuI3mlK/mjIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5xZy5zaGFyZSgpO1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOmqjOivgeahjOmdouW/q+aNt+aWueW8j+aYr+WQpuWIm+W7uui/h1xyXG4gICAgKiBAcGFyYW0gY2FsbEJhY2sgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrSGFzU2hvcnRDdXQoY2FsbEJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucWcuaGFzU2hvcnRjdXRJbnN0YWxsZWQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qOA5rWL5qGM6Z2i5b+r5o235pa55byP5piv5ZCm5bey57uP5Yib5bu66L+HOiByZXN1bHQ9XCIsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRDcmVhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2sgJiYgY2FsbEJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydGN1dENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrICYmIGNhbGxCYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qOA5rWL5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuajgOa1i+WujOaIkO+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBhc3NDb3VudDogbnVtYmVyID0gMDsgLy/pgJrlhbPmlbDmja5cclxuICAgIHBsYXlDb3VudDogbnVtYmVyID0gMDsgLy/lvIDlp4vlhbPljaHmlbDmja5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMueXpfY29udmVyc2lvbl90eXBlID09IFwic3Vic2NyaWJlXCIpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnlKjmiLflrozmiJDmn5DpobnmnI3liqEv6aKR6YGT6K6i6ZiF6KGM5Li6XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRVc2VyQWN0aXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVdpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhc3NDb3VudCA9PT0gdXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJwYXNzX2xldmVsX2NvdW50X2FjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0QXR0cmlidXRlZEV2ZW50KEF0dHJpYnV0ZWRUeXBlLkdhbWVBZGRpY3Rpb24sIEF0dHJpYnV0ZWRLZXkuR2FtZUFkZGljdGlvbiwgQXR0cmlidXRlZFZhbHVlLlBhc3NMZXZlbENvdW50QWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IExldmVsU3RhdHVzLkdhbWVTdGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Q291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlDb3VudCA9PSB1dGlscy5nZXRDb25maWdCeUtleShcInBsYXlfbGV2ZWxfY291bnRfYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRBdHRyaWJ1dGVkRXZlbnQoQXR0cmlidXRlZFR5cGUuR2FtZUFkZGljdGlvbiwgQXR0cmlidXRlZEtleS5HYW1lQWRkaWN0aW9uLCBBdHRyaWJ1dGVkVmFsdWUuUGxheUxldmVsQ291bnRBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxldmVsX2lkPSR7bGV2ZWx9JmxldmVsX25hbWU9JHtlbmNvZGVVUkkobGV2ZWxOYW1lKX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlhbPljaHmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG4gICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgKi9cclxuICAgIHB1YmxpYyBzZW5kRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmV2ZW50XCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZldmVudD0ke2VuY29kZVVSSShldmVudE5hbWUpfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7blpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog5by55Ye65o+Q56S65qGGXHJcbiAgICAqIEBwYXJhbSBtc2cg5raI5oGvXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNob3dUb2FzdChtc2c6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFnLnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtc2csXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDkuIrmiqXlvZLlm6Dkuovku7ZcclxuICAgICogQHBhcmFtIGV2ZW50VHlwZSDkuovku7bnsbvlnosgMCDmv4DmtLvvvIwgMjU65YWz6ZSu6KGM5Li6XHJcbiAgICAqIEBwYXJhbSBldmVudFZhbHVlIOS6i+S7tuaPj+i/sFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyByZXBvcnRBdHRyaWJ1dGVkRXZlbnQoZXZlbnRUeXBlOiBBdHRyaWJ1dGVkVHlwZSwgZXZlbnRLZXk6IEF0dHJpYnV0ZWRLZXksIGV2ZW50VmFsdWU6IEF0dHJpYnV0ZWRWYWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sdWFuY2hUeXBlICE9IFwiZGVlcGxpbmtcIikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwibHVhbmNoVHlwZT1cIiArIHRoaXMuX2x1YW5jaFR5cGUgKyBcIizkuI3ov5vooYzlvZLlm6DkuIrmiqVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXlvZLlm6Dkuovku7bvvJogICNldmVudFR5cGU9XCIgKyBldmVudFR5cGUgKyBcIiNldmVudEtleT1cIiArIGV2ZW50S2V5ICsgXCIjZXZlbnRWYWx1ZT1cIiArIGV2ZW50VmFsdWUpO1xyXG4gICAgICAgIGlmIChldmVudFR5cGUgPT0gQXR0cmlidXRlZFR5cGUuQWN0aXZlICYmIFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX0lTX1JFUE9SVF9VU0VSX0FDVElWRSkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueUqOaIt+W3sue7j+S4iuaKpei/h+a/gOa0u++8jOS4jeWGjei/m+ihjOa/gOa0u+S4iuaKpe+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09IEF0dHJpYnV0ZWRUeXBlLkdhbWVBZGRpY3Rpb24gJiYgWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfSVNfUkVQT1JUX0dBTUVfQURESUNUSU9OKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55So5oi35bey57uP5LiK5oql6L+H5YWz6ZSu6KGM5Li677yM5LiN5YaN6L+b6KGM5r+A5rS75LiK5oql77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDE1MDAwOyAgICAvLyDljZXkvY3mr6vnp5JcclxuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XHJcbiAgICAgICAgZGF0YS5hcHBfaWQgPSB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmFwcElEO1xyXG4gICAgICAgIGRhdGEuY2hhbm5lbCA9IFwiaHVhd2VpX2t5eFwiO1xyXG4gICAgICAgIGRhdGEudWlkID0gdGhpcy5fc2VydmljZV91aWQ7XHJcbiAgICAgICAgZGF0YS5ldmVudF90eXBlID0gZXZlbnRUeXBlO1xyXG4gICAgICAgIGRhdGEuZXZlbnRfa2V5ID0gZXZlbnRLZXk7XHJcbiAgICAgICAgZGF0YS5ldmVudF92YWx1ZSA9IGV2ZW50VmFsdWU7XHJcbiAgICAgICAgZGF0YS5hcHBfdmVyc2lvbiA9IHV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcudmVyc2lvbjtcclxuICAgICAgICBkYXRhLmx1YW5jaERhdGUgPSBlbmNvZGVVUkkodGhpcy5fbHVhbmNoRGF0YSk7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9kuWboOivt+axguWPguaVsDpcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBsZXQgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2S5ZugID4ganNvbl9kYXRhPVwiICsgdXRpbHMuYWVzRW5jcnlwdChyZXF1ZXN0RGF0YSkpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsOiBzdHJpbmcgPSBgaHR0cHM6Ly90cmFjay55b3VsZXRkLmNvbS93ZWNoYXRjb3VudGVycGFydC9kb2NraW5ncmV0dXJuP2pzb249JHt1dGlscy5hZXNFbmNyeXB0KHJlcXVlc3REYXRhKX0mdGltZV9zdGFtcD0keyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCl9YDtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2S5Zug5pyN5Yqh5Zmo5Zyw5Z2AOlwiICsgcmVxdWVzdFVybCk7XHJcblxyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCByZXF1ZXN0VXJsKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLnirbmgIHmlLnlj5gsIHJlYWVkeVN0YXRlPVwiLCB4aHIucmVhZHlTdGF0ZSwgXCI7IHN0YXR1cz1cIiwgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09IEF0dHJpYnV0ZWRUeXBlLkFjdGl2ZSkgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfSVNfUkVQT1JUX1VTRVJfQUNUSVZFLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PSBBdHRyaWJ1dGVkVHlwZS5HYW1lQWRkaWN0aW9uKSBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9JU19SRVBPUlRfR0FNRV9BRERJQ1RJT04sIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2S5Zug5LiK5oql5oiQ5Yqf77yaXCIsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2S5Zug5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZLlm6Dor7fmsYLotoXml7YhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9kuWboOivt+axguWksei0pSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCA5Ye65ri45oiPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHYW1lRXhpdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJHYW1lRXhpdFwiKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgcWcuZXhpdEFwcGxpY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpdEFwcGxpY2F0aW9uIHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpdEFwcGxpY2F0aW9uIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4aXRBcHBsaWNhdGlvbiBjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9pc19sb2dpbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzU2hvd0xvZ2luOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfbG9naW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc1JlcXVlc3RMb2dpbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnmbvlvZVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luKCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJodWF3ZWkgbG9naW5cIik7XHJcbiAgICAgICAgdGhpcy5pc1JlcXVlc3RMb2dpbiA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc1Nob3dMb2dpbiB8fCB0aGlzLl9sb2dpbmcpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9sb2dpbmcgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9pc19sb2dpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VG9hc3QoXCLnmbvlvZXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChZWl9Db25zdGFudC5TVF9MT0dJTl9TVUNDRVNTKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW3sue7j+eZu+W9lei/h+S4jeWGjemHjeaWsOeZu+W9le+8gVwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMueXpfY29udmVyc2lvbl90eXBlID09IFwibG9naW5cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRVc2VyQWN0aXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnFnLmdhbWVMb2dpbih7XHJcbiAgICAgICAgICAgIGZvcmNlTG9naW46IDEsXHJcbiAgICAgICAgICAgIGFwcGlkOiB1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmFwcElELFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9naW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUb2FzdChcIueZu+W9leaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChZWl9Db25zdGFudC5TVF9MT0dJTl9TVUNDRVNTKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJHYW1lIGxvZ2luIHN1Y2Nlc3M6XCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzX2xvZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnl6X2NvbnZlcnNpb25fdHlwZSA9PSBcImxvZ2luXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55So5oi35a6M5oiQ55m76ZmG6KGM5Li6IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydFVzZXJBY3RpdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VG9hc3QoXCLnmbvlvZXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoWVpfQ29uc3RhbnQuU1RfTE9HSU5fRkFJTCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiR2FtZSBsb2dpbiBmYWlsOlwiICsgZGF0YSArIFwiLCBjb2RlOlwiICsgY29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlzUmVxdWVzdExvZ2luID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWPi+ebn3Nka+WIneWni+WMliAqL1xyXG4gICAgdW1hSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlj4vnm59JROacqumFjee9ru+8jOS4jeaJp+ihjOWPi+ebn+WIneWni+WMlj4+Pj5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInVtZW5nIGluaXQgI2lkPVwiICsgdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy51bWVuZ0lkKTtcclxuICAgICAgICB1bWEuaW5pdCh7XHJcbiAgICAgICAgICAgIGFwcEtleTogdXRpbHMuY29uZmlnLmh1YXdlaUNvbmZpZy51bWVuZ0lkLFxyXG4gICAgICAgICAgICB1c2VPcGVuaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBkZWJ1ZzogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAqIOWPi+ebn+a4uOaIj+W8gOWni+S4iuaKpVxyXG4gICAgICAgKiBAcGFyYW0gbGV2ZWxJRCBcclxuICAgICAgICovXHJcbiAgICBwdWJsaWMgdW1hT25TdGFydChsZXZlbElEOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcWcudW1hLnN0YWdlLm9uU3RhcnQoe1xyXG4gICAgICAgICAgICBzdGFnZUlkOiBsZXZlbElELC8v6K+l5a2X5q615ZCN56ew5LiN5Y+v5L+u5pS577yM5b+F5LygXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogYOesrCR7bGV2ZWxJRH3lhbNgLy8g5YWz5Y2haWRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKblvIDlkK/lj4vnm58gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tVbWVuZygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcudW1lbmdJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj4vnm5/nu5PnrpfkuIrmiqVcclxuICAgICAqIEBwYXJhbSBsZXZlbElEIOWFs+WNoWlkXHJcbiAgICAgKiBAcGFyYW0gc3RhZ2VJZCBcclxuICAgICAqIEBwYXJhbSBldmVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVtYVJlcG9ydGVkTGV2ZWwobGV2ZWxJRDogc3RyaW5nLCBldmVudDogTGV2ZWxTdGF0dXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHFnLnVtYS5zdGFnZS5vbkVuZCh7XHJcbiAgICAgICAgICAgIHN0YWdlSWQ6IGxldmVsSUQsLy/or6XlrZfmrrXlkI3np7DkuI3lj6/kv67mlLnvvIzlv4XkvKBcclxuICAgICAgICAgICAgc3RhZ2VOYW1lOiBg56ysJHtsZXZlbElEfeWFs2AsXHJcbiAgICAgICAgICAgIGV2ZW50OiBldmVudFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+L55uf6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gZXZlbnRJZCDkuovku7ZJRO+8jOazqOaEj++8muS6i+S7tklE5b+F6aG76KaB5Zyo5ZCO5Y+w6YWN572uXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIOS6i+S7tuWGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdW1hVHJhY2tFdmVudChldmVudElkOiBzdHJpbmcsIHBhcmFtcz8pIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHFnLnVtYS50cmFja0V2ZW50KGV2ZW50SWQsIHBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuIl19