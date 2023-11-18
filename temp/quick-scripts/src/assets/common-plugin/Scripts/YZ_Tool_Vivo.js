"use strict";
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