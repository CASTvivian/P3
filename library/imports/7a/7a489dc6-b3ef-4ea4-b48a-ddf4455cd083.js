"use strict";
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