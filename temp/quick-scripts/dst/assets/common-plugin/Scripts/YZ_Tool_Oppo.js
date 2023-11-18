
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Oppo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '45157YJvkRH65MMXKEo3sat', 'YZ_Tool_Oppo');
// common-plugin/Scripts/YZ_Tool_Oppo.ts

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
var YouWanAnalytics_1 = require("./YouWanSDK/YouWanAnalytics");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
//@ts-ignore
var uma = require('./UMengSDK/quickGame/uma.min.js');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// http://apps.youlesp.com/gss?m=gconfig&uid=xxx&app_id=xxx&channel=xxx&device_uid=xxx
//获取服务器配置
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
var ST_DefaultServerConfig = "";
var ST_NativeInsertAdClickTimes = "NativeInsertAdClickTimes";
var ST_LastDateTime = "LastDateTime";
var ST_InsertAdShowCounts = "NativeInsertAdShowCount"; //插屏显示次数
var ST_BannerAdCloseCounts = "ST_BannerAdCloseCounts"; //banner广告关闭次数
var ST_YZBannerShowCounts = "YZBannerShowCounts"; //banner广告关闭次数
var YZ_Tool_Oppo = /** @class */ (function () {
    function YZ_Tool_Oppo() {
        //@ts-ignore
        this.qg = qg;
        /*
        COREVersion	    string	版本号
        brand	        string	手机品牌
        language	    string	当前环境设置的语言
        model	        string	手机型号
        notchHeight	    number	凹槽高度(刘海屏高度)
        pixelRatio	    number	设备像素比
        platform	    string	客户端平台
        platformVersion	number	平台版本号
        screenHeight	number	屏幕高度
        screenWidth	    number	屏幕宽度
        system	        string	操作系统版本
        windowHeight	number	可使用窗口高度
        windowWidth	    number	可使用窗口宽度
        */
        this._sysInfo = null;
        //用户来源
        this._source = "";
        /**
        * OPPO服务器配置数据
        * {
        *
    -- "banner_close_full_count_showyz":"true" //banner达到显示次数之后是否显示自定义banner .默认：不填写
    --"native_banner_delay_time": 1,  //banner和插屏都是原生优先的话，延迟展示banner. 单位：秒 。默认：不填写
    -- "statement_auto_refresh": 1,   // 结算广告刷新频率。 单位：秒。 默认不填写为3秒。
    -- "is_bottom_banner_list":"true" //是否显示自定义的banner 默认：不填写
    -- "refresh_ad_time":15 //banner广告刷新的间隔时间。单位：秒 默认：不填写
    -- "close_btn_fade_in_time":0  //跳过按钮延迟显示的时间。单位：秒  默认：不填写
    -- "st_spare_type": 4,   // 结算广告备选类型， 当statement_type为1或者2的时候判断是否显示达到限制。达到限制的时候显示当前备选的组件；值 =（3、4、5）。 默认：不填写
    -- "native_banner_delay_time": 1   //如果banner和插屏都优先展示原生就延迟调用。 单位：秒。默认1秒
    -- “intersititial_open_close_banner”:0 ,//插屏显示后是操作Banner, 0 ：为不开启，1:为销毁，2:隐藏   默认：1
    --  "banner_close_count":0 ,  //banner关闭次数达到限制后不显示   0:不限制次数，>0：限制的次数达到后不再显示banner  默认：5
    --  "st_sync":"true"    //判断结算广告类型为4、5的时候，是否同时显示，默认true
    --  "statement_type": 1、2、3、4、5
                           一、游戏结算广告展示
                           1.显示默认插屏广告
                           2.显示插屏广告  (默认优先或原生优先，也就是目前展示的规则)
                           3.显示插屏广告+6个互推 (默认优先或原生优先，也就是目前展示的规则)
                           4.显示插屏广告、原生广告（没有互推的单个原生广告） 1：(默认优先或原生优先，也就是目前展示的规则) 2、默认插屏和原生广告同时展示
                           5.显示插屏广告、原生广告（有3个互推+原生的广告） 1、(原生优先或者插屏优先，和同时展示) 2、默认插屏和原生广告同时展示
    --  "intersititial_max_show_count": 8,   //插屏最大显示次数 默认：8
    --  "intersititial_interval_time": 60,   //插屏显示间隔数 默认：60
    --	"intersititial_open_close_banner": "true", //插屏显示的时候是否隐藏banner
    --	"reward_first_ad": "video", // 激励视频显示优先级别： video：激励视频，insert:激励互推
    --	"is_reward_intersititia": "true",
    --  "native_single_pos_id":[],  //单个原生广告ID--用于结算组件
    -- "is_move_btn":0  //是否开启移动按钮效果 默认不开启 0：显示banner,且按钮在上面。 1: 显示Banner,按钮居底部且移动 3: 大于0的话按照时间移动按钮
    
    
    -- 暂未覆盖其他游戏
    --	"auto_sign": "false", //是否自动弹出签到 默认：false
    --	"try_skin_level_count": 5, // 皮肤试用的关卡数量 默认：5关
    
    
    --	"intersititia_delay_show_time": 0.5,   // 插屏广告延时展示时间/秒 默认值0.5
    --	"intersititia_close_delay_time": 1,    // 关闭按钮延时显示时间/秒，默认 1
    --	"intersititia_close_but_alpha": 120,   // 关闭按钮alpha, 默认 120
    --  "intersititia_close_but_size": 100,    // 关闭按钮大小
    --  "intersititia_close_but_range": 100,   // 关闭按钮点击范围
    --  "intersititial_first_ad": "native",    // 插屏广告优先展示类型 [default 小游戏广告， native 原生广告]
    --  "intersititia_click_count": 1,         // 插屏广告点击每天次数控制/次数
    --	"intersititia_show_interval": 1,       // 插屏广告展示间隔/次数。intersititia_click_count 次数达到后启用
    --  "intersititial_click_close": "false"   // 点击关闭按钮后是否关闭广告， 默认值 false
    
    --	"banner_show_height": 120,         // 广告条的高度，最低160
    --	"banner_close_but_show": "true",   // 是否显示关闭按钮 [true 显示， false 不显示]， 默认值 true
    --	"banner_close_but_alpha": 120,     // 关闭按钮alpha,默认 120
    --  "banner_close_but_size": 33,       // 关闭按钮大小, 默认 33
    --  "banner_close_but_range": 33,      // 关闭按钮点击范围, 默认 33
    --	"banner_first_ad": "native",       // 广告优先展示类型[default 小游戏广告， native 原生广告, yzbanner 自定义banner]
    --  "banner_click_refresh": "true",    // 广告点击后是否刷新，默认值 true
    
       "is_local_pos_id": "false",                                 // 是否使用本地广告id
       "intersititia_pos_id": "96292",                             // 小游戏插屏id
       "banner_pos_id": "96293",                                   // 小游戏banner id
       "video_pos_id": "96294",                                    // 小游戏视频id
       "native_intersititial_pos_id": ["96297", "96298"],          // 原生插屏id
       "native_banner_pos_id": ["96295", "96296"],                 // 原生banner id
       "is_jump": "true",                                          // 是否显示游戏内交叉推广组件，交叉推广挂件刷新频率
       "jump_list": [{                                             // 交叉推广挂件内容信息
           "name": "子弹先生狙击战场",
           "icon": "https://xcx.youletd.com/xcx/icon/zdxsjjzc.png",
           "pkg": "com.yzxx.zdxsjjzc.kyx.nearme.gamecenter"
       }, {
           "name": "翻滚的香肠",
           "icon": "https://xcx.youletd.com/xcx/icon/fgdxc.png",
           "pkg": "com.yzxx.fgdxc.kyx.nearme.gamecenter"
       }]
       }
        */
        this._serverConfig = null;
        this._nativeInsertAdClickTimes = 0;
        this._insertAdShowCounts = 0;
        this._bannerAdCloseCounts = 0;
        this._yzBannerShowCounts = 0;
        // 桌面图标是否创建
        this._shortcutCreated = false;
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = 0;
        //设备ID
        this._device_id = "";
        //本地uuid
        this._uuid = "";
        //优玩UID
        this._yw_uid = -1;
        this._reloadTimes = 6;
        this._curloadTimes = 0;
        this._loginTime = 0;
        this._loginInterval = 30;
        //是否获取deviceId
        this.isGetDeviceId = true;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
        this._rec_is_banner = false;
        this._rec_game_banner = null;
        this._rec_game_portal = null;
        this._gameDrawerAd = null;
        this.isReportDevice = false;
    }
    Object.defineProperty(YZ_Tool_Oppo.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_Oppo.prototype.gameVersion = function () {
        return Utils_1.utils.config.oppoconfig.version;
    };
    Object.defineProperty(YZ_Tool_Oppo.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "NativeInsertAdClickTimes", {
        get: function () {
            return this._nativeInsertAdClickTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "insertAdShowCounts", {
        /**
         * 插屏广告展示次数
         */
        get: function () {
            return this._insertAdShowCounts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "bannerAdCloseCounts", {
        /**
         * banner关闭次数
         */
        get: function () {
            return this._bannerAdCloseCounts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "yzBannerShowCounts", {
        /**
         * 自定义banner展示次数
         */
        get: function () {
            return this._yzBannerShowCounts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "ShortcutCreated", {
        get: function () {
            return this._shortcutCreated;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "uid", {
        get: function () {
            if (this._uid != "0")
                return this._uid;
            this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Oppo.prototype, "serviceId", {
        /**
         * 服务器返回UID
         */
        get: function () {
            if (this._service_uid != 0)
                return this._service_uid;
            this.reportLogin();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param data 配置数据
     */
    YZ_Tool_Oppo.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            this.umaInit();
            //@ts-ignore
            this._sysInfo = qg.getSystemInfoSync();
            if (this.SysInfo) {
                Utils_1.utils.showLog("OPPO 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.oppo) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.oppo);
                }
            }
            this._yw_uid = parseInt(YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_YOUWAN_UID, "-1"));
            this._device_id = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_DEVICE_ID);
            if (!this._device_id) {
                cc.game.on(YZ_Constant_1.default.YZ_PrivacyClose, function () {
                    _this.initDeviceId();
                }, this);
            }
            //获取小程序启动来源
            if (this.isOverMiniVersion("1050")) {
                //@ts-ignore
                var options = qg.getLaunchOptionsSync();
                options && console.log("options>>>", JSON.stringify(options));
                if (options && options.referrerInfo && options.referrerInfo.package) {
                    Utils_1.utils.showLog("获取到小程序启动来源：" + options.referrerInfo.package);
                    this._source = options.referrerInfo.package;
                }
            }
            else {
                Utils_1.utils.showLog("\u5C0F\u7A0B\u5E8F\u7248\u672C\u4F4E\u4E8E1050\uFF0C\u83B7\u53D6\u4E0D\u5230\u5C0F\u7A0B\u5E8F\u542F\u52A8\u6765\u6E90\uFF01");
            }
            this._login();
            var appId = Utils_1.utils.config.oppoconfig.appID + "_";
            this._nativeInsertAdClickTimes = YZ_LocalStorage_1.default.getItem(appId + ST_NativeInsertAdClickTimes);
            this._insertAdShowCounts = YZ_LocalStorage_1.default.getItem(appId + ST_InsertAdShowCounts);
            this._bannerAdCloseCounts = YZ_LocalStorage_1.default.getItem(appId + ST_BannerAdCloseCounts);
            this._yzBannerShowCounts = YZ_LocalStorage_1.default.getItem(appId + ST_YZBannerShowCounts);
            var day = YZ_LocalStorage_1.default.getItem(appId + ST_LastDateTime);
            var curDate = new Date();
            if (day != curDate.toDateString()) {
                this._nativeInsertAdClickTimes = 0;
                this._insertAdShowCounts = 0;
                this._bannerAdCloseCounts = 0;
                this._yzBannerShowCounts = 0;
                YZ_LocalStorage_1.default.setItem(appId + ST_YZBannerShowCounts, 0);
                YZ_LocalStorage_1.default.setItem(appId + ST_NativeInsertAdClickTimes, 0);
                YZ_LocalStorage_1.default.setItem(appId + ST_InsertAdShowCounts, 0);
                YZ_LocalStorage_1.default.setItem(appId + ST_LastDateTime, curDate.toDateString());
                YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_GET_DEVICE_ID, "0");
            }
            //@ts-ignore
            Utils_1.utils.registerServerInitEvent(function () {
                //检测桌面图标是否创建
                if (_this.isOverMiniVersion("1044")) {
                    _this.checkHasShortCut(function (res) {
                        if (!res && Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.start_auto_create_short_cut_time) {
                            Utils_1.utils.showLog("\u7EC4\u4EF6\u521D\u59CB\u5316\u6210\u529F\uFF0C" + Utils_1.utils.ServerConfig.start_auto_create_short_cut_time + "\u79D2\u540E\u5F39\u51FA\u81EA\u52A8\u521B\u5EFA\u684C\u9762\uFF01");
                            Utils_1.utils.SendEvent("组件初始化成功，弹出自动创建桌面！");
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
                }
            }, this);
        }
        this._loadConfig();
    };
    /**
     * 保存服务器配置到本地
     * @param data
     */
    YZ_Tool_Oppo.prototype._saveConfig = function (data) {
    };
    YZ_Tool_Oppo.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            var method = "m=g" + ("&device_data=" + encodeURI(JSON.stringify(this._sysInfo)));
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                _this._curloadTimes++;
                var recall = false;
                Utils_1.utils.showLog("\u7B2C" + _this._curloadTimes + "\u6B21\u62C9\u53D6\u670D\u52A1\u5668\u914D\u7F6E!");
                if (ret) {
                    Utils_1.utils.showLog("OPPO服务器配置数据获取成功: data = " + data);
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
                            Utils_1.utils.showLog("OPPO服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("OPPO服务器配置数据获取失败, 使用本地配置!");
                    if (_this._curloadTimes < _this._reloadTimes) {
                        Utils_1.utils.showLog("重新拉取配置!");
                        recall = true;
                    }
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else if (_this._curloadTimes == 1) {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.oppoconfig.bannerId = _this.ServerConfig.banner_pos_id;
                        Utils_1.utils.config.oppoconfig.insertId = _this.ServerConfig.intersititia_pos_id;
                        Utils_1.utils.config.oppoconfig.videoId = _this.ServerConfig.video_pos_id;
                        Utils_1.utils.config.oppoconfig.nativeInsertIds = _this.ServerConfig.native_intersititial_pos_id;
                        Utils_1.utils.config.oppoconfig.nativeBannerIds = _this.ServerConfig.native_banner_pos_id;
                        Utils_1.utils.config.oppoconfig.nativeTryGameIds = _this.ServerConfig.native_trygame_pos_id;
                        Utils_1.utils.config.oppoconfig.recGameBannerId = _this.ServerConfig.rec_game_banner_id;
                        Utils_1.utils.config.oppoconfig.recPortalId = _this.ServerConfig.rec_portal_id;
                        Utils_1.utils.config.oppoconfig.recGameDrawerId = _this.ServerConfig.rec_game_drawer_id || Utils_1.utils.config.oppoconfig.recGameDrawerId;
                        Utils_1.utils.config.oppoconfig.nativeSingleAdIds = _this.ServerConfig.native_single_pos_id || Utils_1.utils.config.oppoconfig.nativeSingleAdIds;
                        Utils_1.utils.config.oppoconfig.intersitialAdConfigs = _this.ServerConfig.intersitial_configs || Utils_1.utils.config.oppoconfig.intersitialAdConfigs;
                        Utils_1.utils.config.oppoconfig.bannerAdConfigs = _this.ServerConfig.banner_configs || Utils_1.utils.config.oppoconfig.bannerAdConfigs;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                    if (_this.ServerConfig.get_device_id && _this.ServerConfig.get_device_id == "false") {
                        _this.isGetDeviceId = false;
                    }
                    if (_this.ServerConfig.native_banner_configs) {
                        for (var i = 0; i < _this.ServerConfig.native_banner_configs.length; i++) {
                            Utils_1.utils.showLog("获取到原生广告配置:" + _this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(_this.ServerConfig.native_banner_configs[i]));
                            Utils_1.utils.config.oppoconfig.setNativeBannerInfo(_this.ServerConfig.native_banner_configs[i].location, _this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                }
                if (_this._curloadTimes == 1) {
                    // 只有第一次拉取才会发送事件
                    Utils_1.utils.emitServerInitEvent();
                }
                if (recall) {
                    _this._loadConfig();
                }
            });
        }
    };
    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    YZ_Tool_Oppo.prototype.isOverMiniVersion = function (miniVersion) {
        if (PlatUtils_1.default.IsOPPO) {
            if (this._sysInfo) {
                Utils_1.utils.showLog("curPlatVersion = " + this._sysInfo.platformVersion + "miniVersion = " + miniVersion + "" + (this._sysInfo.platformVersion >= miniVersion));
                return this._sysInfo.platformVersion >= miniVersion;
            }
        }
        return false;
    };
    /**
     * 验证桌面快捷方式是否创建过
     * @param callBack
     */
    YZ_Tool_Oppo.prototype.checkHasShortCut = function (callBack) {
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
    YZ_Tool_Oppo.prototype.hideDefaultLoadingPage = function () {
        if (PlatUtils_1.default.IsOPPO) {
            //@ts-ignore
            qg.loadingComplete({
                complete: function (res) { }
            });
        }
    };
    YZ_Tool_Oppo.prototype.countNativeInserClick = function () {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.oppoconfig.appID + "_" + ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    };
    /**
     * 增加插屏显示的次数
     */
    YZ_Tool_Oppo.prototype.countInserShowCount = function () {
        this._insertAdShowCounts++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.oppoconfig.appID + "_" + ST_InsertAdShowCounts, this._insertAdShowCounts);
    };
    /**
     * 增加banner的关闭次数
     */
    YZ_Tool_Oppo.prototype.countBannerCloseCount = function () {
        this._bannerAdCloseCounts++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.oppoconfig.appID + "_" + ST_BannerAdCloseCounts, this._bannerAdCloseCounts);
    };
    /**
    * 增加自定义banner的显示次数
    */
    YZ_Tool_Oppo.prototype.countYzBannerShowCount = function () {
        this._yzBannerShowCounts++;
        YZ_LocalStorage_1.default.setItem(Utils_1.utils.config.oppoconfig.appID + "_" + ST_YZBannerShowCounts, this._yzBannerShowCounts);
    };
    /**
     * 跳转到指定的小游戏
     * @param pkgName 包名
     * @param callback Function(ret) 跳转回调. ret: true | false
     */
    YZ_Tool_Oppo.prototype.navigateToMiniGame = function (pkgName, callback) {
        if (PlatUtils_1.default.IsOPPO) {
            var completeCallback_1 = callback;
            //@ts-ignore
            qg.navigateToMiniGame({
                pkgName: pkgName,
                success: function () {
                    Utils_1.utils.showLog("跳转成功！");
                    if (completeCallback_1) {
                        completeCallback_1(true);
                    }
                },
                fail: function (res) {
                    Utils_1.utils.showLog("跳转失败！");
                    if (completeCallback_1) {
                        completeCallback_1(false);
                    }
                }
            });
        }
    };
    /**
     * 是否可以创建桌面图标
     */
    YZ_Tool_Oppo.prototype.canCreateShortcut = function () {
        if (PlatUtils_1.default.IsOPPO) {
            return this.isOverMiniVersion("1040");
        }
        return false;
    };
    /**
     * 创建桌面快捷方式
     */
    YZ_Tool_Oppo.prototype.createShortcut = function (callback) {
        if (PlatUtils_1.default.IsOPPO) {
            var callbackFunc_1 = callback;
            var self_1 = this;
            //@ts-ignore
            qg.installShortcut({
                success: function () {
                    Utils_1.utils.showLog('桌面图标创建成功！');
                    self_1._shortcutCreated = true;
                    if (callbackFunc_1) {
                        callbackFunc_1(true);
                    }
                },
                fail: function (err) {
                    Utils_1.utils.showLog("createShortcut >>>fail");
                    if (callbackFunc_1) {
                        callbackFunc_1(false);
                    }
                },
                complete: function () {
                    Utils_1.utils.showLog("createShortcut >>>complete");
                }
            });
        }
    };
    /**
     * 上报数据
     */
    YZ_Tool_Oppo.prototype.postData = function (otherGameAppId) {
        if (PlatUtils_1.default.IsOPPO) {
            var method = "m=rjump";
            var url = POST_ServerUrl + method + ("&jump_app_id=" + otherGameAppId);
            // utils.showLog("上报数据, url=" + url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    };
    /**
     * 上报数据
     *
     */
    YZ_Tool_Oppo.prototype.postGameSourece = function (source) {
        if (PlatUtils_1.default.IsOPPO) {
            var appid = Utils_1.utils.config.oppoconfig.appID;
            var uid = this._uid;
            var channel = Utils_1.utils.config.oppoconfig.channel ? Utils_1.utils.config.oppoconfig.channel.toLowerCase() : "oppo";
            var url = POST_ServerUrl + ("kyx=true&app_id=" + appid + "&channel=" + channel + "&uid=" + this._uid + "&source=" + source);
            // let url: string = `http://apps.youlesp.com/gs?m=jump&app_id=${appid}&uid=${uid}&channel=${channel}&jump_app_id=${otherGameAppId}`;
            Utils_1.utils.showLog("上报游戏来源数据, url=" + url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    };
    YZ_Tool_Oppo.prototype._login = function () {
        var _this = this;
        var curTime = new Date().getTime();
        var interval = (curTime - this._loginTime) / 1000;
        if (interval > 0 && interval < this._loginInterval) {
            Utils_1.utils.showLog("\u767B\u5F55\u8BF7\u6C42\u95F4\u9694\u5C0F\u4E8E\uFF1A" + this._loginInterval + "\u79D2");
            return;
        }
        this._loginTime = curTime;
        var self = this;
        this._uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_UID);
        this._uid = this._uid ? this._uid : "0";
        this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
        this._service_uid = this._service_uid ? this._service_uid : 0;
        Utils_1.utils.showLog("获取本地保存的uid=" + this._uid + "，服务器UID=" + this._service_uid);
        if (this._uid == "0") {
            if (this.isOverMiniVersion("1040")) {
                //@ts-ignore
                qg.login({
                    success: function (res) {
                        if (res.data.uid) {
                            self._uid = "" + res.data.uid;
                            Utils_1.utils.showLog("登录成功! uid=" + self._uid);
                            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_UID, self._uid);
                        }
                    },
                    fail: function (res) {
                        Utils_1.utils.showLog("登录失败!");
                    },
                    complete: function () {
                        _this.reportLogin();
                    }
                });
            }
            else {
                Utils_1.utils.showLog("快游戏平台版本低于1040，无法登录取UID，直接获取服务器ID");
                this.reportLogin();
            }
        }
        else {
            var ysxy = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.YZ_GAME_YSXY);
            if (ysxy) {
                this.initDeviceId();
            }
        }
    };
    YZ_Tool_Oppo.prototype.initDeviceId = function () {
        var _this = this;
        Utils_1.utils.showLog("oppo initDeviceId!  #isGetDeviceId=" + this.isGetDeviceId);
        var todayIsGet = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_GET_DEVICE_ID, "0");
        //@ts-ignore
        if (this.isGetDeviceId && qg.getDeviceId && todayIsGet == 0) {
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_GET_DEVICE_ID, "1");
            //@ts-ignore
            qg.getDeviceId({
                success: function (data) {
                    Utils_1.utils.showLog("getDeviceId success: deviceId=" + data.deviceId);
                    _this._device_id = data.deviceId;
                    YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_DEVICE_ID, data.deviceId);
                    _this.reportDevice();
                },
                fail: function (data, code) {
                    Utils_1.utils.showLog("getDeviceId fail, code = " + code);
                },
            });
        }
        else {
            this.reportDevice();
        }
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Oppo.prototype.reportLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, curTime, interval, method, url;
            var _this = this;
            return __generator(this, function (_a) {
                Utils_1.utils.showLog("reportLogin >>>>>>>>>>>");
                if (this.isReport)
                    return [2 /*return*/];
                this.isReport = true;
                self = this;
                curTime = new Date().getTime();
                interval = (curTime - this._reportLoginTime) / 1000;
                if (interval > 0 && interval < this._reportLoginInterval) {
                    Utils_1.utils.showLog("\u4E0A\u62A5\u767B\u5F55\u83B7\u53D6UID\u5C0F\u4E8E\uFF1A" + this._reportLoginInterval + "\u79D2");
                    return [2 /*return*/];
                }
                this._reportLoginTime = curTime;
                method = "m=login";
                url = ST_ServerUrl + method + ("&device_data=" + encodeURI(JSON.stringify(this._sysInfo)));
                Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                    if (ret) {
                        if (data) {
                            var result = JSON.parse(data);
                            if (result.uid) {
                                self._service_uid = result.uid;
                                Utils_1.utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                                YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_SERVICE_UID, self._service_uid);
                            }
                        }
                    }
                    _this.isReport = false;
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 获取交叉推广数据
     */
    YZ_Tool_Oppo.prototype.getRecommondGameList = function () {
        if (PlatUtils_1.default.IsOPPO && Utils_1.utils.oppoTool && Utils_1.utils.oppoTool.ServerConfig) {
            return Utils_1.utils.oppoTool.ServerConfig.jump_list;
        }
        return null;
    };
    YZ_Tool_Oppo.prototype.showMsg = function (msg) {
        if (PlatUtils_1.default.IsOPPO) {
            //@ts-ignore
            qg.showToast({
                title: "" + msg,
                icon: 'none',
                duration: 2000
            });
        }
    };
    /**
       * 弹出提示框
       * @param msg 消息
       */
    YZ_Tool_Oppo.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsOPPO) {
            //@ts-ignore
            qg.showToast({
                title: msg,
                icon: "none",
                duration: 2000
            });
        }
    };
    /**
     * 上报互推组件数据
     * @param otherGameAppId 跳转的ID
     * @param location 当前位置
     * @param status 0:点击，1:跳转成功
     */
    YZ_Tool_Oppo.prototype.postDataByLocation = function (otherGameAppId, location, status) {
        if (status === void 0) { status = 0; }
        if (PlatUtils_1.default.IsOPPO) {
            var method = "m=rjump";
            var url = POST_ServerUrl + method + ("&jump_app_id=" + otherGameAppId + "&location=" + location + "&status=" + status);
            // utils.showLog("上报数据, url=" + url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    var result = JSON.parse(data);
                    Utils_1.utils.showLog("\u6570\u636E\u4E0A\u62A5\u6210\u529F");
                    if (result && result.jump_list && result.jump_list.length > 0) {
                        Utils_1.utils.oppoTool.ServerConfig.jump_list = result.jump_list;
                    }
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    };
    /**
    * 上报互推组件显示位置
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    YZ_Tool_Oppo.prototype.postRecommentShowData = function (location) {
        if (PlatUtils_1.default.IsOPPO) {
            var method = "m=rjumpshow";
            var url = POST_ServerUrl + method + ("&location=" + location);
            // utils.showLog("上报数据, url=" + url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Oppo.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsOPPO) {
            var method = "m=rlevelv3";
            var url = POST_ServerUrl + method + ("&level_id=" + level + "&level_name=" + encodeURI(levelName) + "&status=" + status);
            if (status == YZ_Constant_1.LevelStatus.GameStart) {
                url += "&device_data=" + encodeURI(JSON.stringify(this._sysInfo));
            }
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("关卡数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("关卡数据上报失败！");
                }
                if (!ret || status != YZ_Constant_1.LevelStatus.GameStart)
                    return;
                if (ret && status == YZ_Constant_1.LevelStatus.GameStart) {
                    Utils_1.utils.showLog("OPPO服务器配置数据获取成功: data = " + data);
                    if (data) {
                        var result = JSON.parse(data);
                        if (result) {
                            if (!Utils_1.utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                                if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                    Utils_1.utils.showLogView = true;
                                }
                            }
                            else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        }
                        else {
                            Utils_1.utils.showLog("OPPO服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("OPPO服务器配置数据获取失败, 使用本地配置!");
                }
                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else if (this._curloadTimes == 1) {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id 22");
                        Utils_1.utils.config.oppoconfig.bannerId = this.ServerConfig.banner_pos_id;
                        Utils_1.utils.config.oppoconfig.insertId = this.ServerConfig.intersititia_pos_id;
                        Utils_1.utils.config.oppoconfig.videoId = this.ServerConfig.video_pos_id;
                        Utils_1.utils.config.oppoconfig.nativeInsertIds = this.ServerConfig.native_intersititial_pos_id;
                        Utils_1.utils.config.oppoconfig.nativeBannerIds = this.ServerConfig.native_banner_pos_id;
                        Utils_1.utils.config.oppoconfig.nativeTryGameIds = this.ServerConfig.native_trygame_pos_id;
                        Utils_1.utils.config.oppoconfig.recGameBannerId = this.ServerConfig.rec_game_banner_id;
                        Utils_1.utils.config.oppoconfig.recPortalId = this.ServerConfig.rec_portal_id;
                        Utils_1.utils.config.oppoconfig.intersitialAdConfigs = this.ServerConfig.intersitial_configs || Utils_1.utils.config.oppoconfig.intersitialAdConfigs;
                        Utils_1.utils.config.oppoconfig.bannerAdConfigs = this.ServerConfig.banner_configs || Utils_1.utils.config.oppoconfig.bannerAdConfigs;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                    if (this.ServerConfig.native_banner_configs) {
                        Utils_1.utils.config.oppoconfig.nativeBannerInfos.length = 0;
                        for (var i = 0; i < this.ServerConfig.native_banner_configs.length; i++) {
                            Utils_1.utils.showLog("获取到原生广告配置:" + this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_banner_configs[i]));
                            Utils_1.utils.config.oppoconfig.setNativeBannerInfo(this.ServerConfig.native_banner_configs[i].location, this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                }
            }.bind(this));
        }
    };
    /**
     * 是否支持互推
     */
    YZ_Tool_Oppo.prototype.canShowRecommend = function () {
        if (this.isOverMiniVersion("1076")) {
            return true;
        }
        return false;
    };
    /**
     * 是否支持新的互推
     */
    YZ_Tool_Oppo.prototype.canShowNewRecommend = function () {
        if (this.isOverMiniVersion("1090")) {
            return true;
        }
        return false;
    };
    /**
     * 展示OPPO互推banner
     */
    YZ_Tool_Oppo.prototype.showOppoRecBanner = function (location) {
        var _this = this;
        if (!this.canShowRecommend()) {
            Utils_1.utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }
        if (Utils_1.utils.config.oppoconfig.recGameBannerId) {
            this._rec_is_banner = true;
            if (this._rec_game_banner) {
                this.hideOppoRecBanner();
            }
            this._rec_game_banner = this.qg.createGameBannerAd({
                adUnitId: Utils_1.utils.config.oppoconfig.recGameBannerId
            });
            this._rec_game_banner.onLoad(function () {
                Utils_1.utils.showLog('互推banner加载成功!');
            });
            // this._rec_game_banner.show().then(() => {
            //     utils.showLog('互推banner展示成功！')
            // }).catch((error) => {
            //     utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
            // })
            this._rec_game_banner.onError(function (err) {
                Utils_1.utils.showLog('互推banner加载异常!', err.errCode + ',' + err.errMsg);
                _this._rec_game_banner.destroy();
                _this._rec_game_banner = null;
            });
            this._rec_game_banner.show().then(function () {
                _this.showRecHideNativeAd();
                Utils_1.utils.showLog('互推banner展示成功！');
                if (location) {
                    Utils_1.utils.SendEvent("互推Banner展示成功，位置：" + location);
                }
            }).catch(function (error) {
                Utils_1.utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg);
            });
        }
        else {
            Utils_1.utils.showLog("OPPO 互推banner ID未配置！");
        }
    };
    YZ_Tool_Oppo.prototype.showRecHideNativeAd = function () {
        if (this.ServerConfig
            && this.ServerConfig.show_rec_hide_native_ad
            && this.ServerConfig.show_rec_hide_native_ad == "false") {
            Utils_1.utils.showLog("互推展示成功之后不执行隐藏原生广告");
            return;
        }
        Utils_1.utils.adManager.HideBanner(0);
        Utils_1.utils.adManager.HideSingleNativeAd();
        Utils_1.utils.adManager.hideNativeTryGameWidget();
        Utils_1.utils.showLog("互推展示成功之后隐藏原生广告");
    };
    /**
    * 展示OPPO互推banner
    */
    YZ_Tool_Oppo.prototype.showOppoNewRecBanner = function (params) {
        var _this = this;
        if (params === void 0) { params = null; }
        if (!this.canShowNewRecommend()) {
            Utils_1.utils.showLog("当前版本不支持显示官方新互推Banner！");
            return false;
        }
        if (Utils_1.utils.config.oppoconfig.recGameBannerId) {
            this._rec_is_banner = false;
            if (this._rec_game_banner) {
                this.hideOppoRecBanner();
            }
            var style = {};
            if (params) {
                if (params.orientation === "vertical") {
                    if (params.left != undefined) {
                        style.left = params.left / cc.winSize.width * this.SysInfo.screenWidth;
                    }
                    else if (params.right != undefined) {
                        style.left = (this.SysInfo.screenWidth - 155) - (params.right / cc.winSize.width * this.SysInfo.screenWidth);
                    }
                    if (params.bottom != undefined) {
                        style.top = (this.SysInfo.screenHeight - 720) - (params.bottom / cc.winSize.height * this.SysInfo.screenHeight);
                    }
                    else {
                        style.top = params.top / cc.winSize.height * this.SysInfo.screenHeight;
                    }
                }
                else {
                    if (params.left != undefined) {
                        style.left = params.left / cc.winSize.width * this.SysInfo.screenWidth;
                    }
                    else if (params.right != undefined) {
                        style.left = (this.SysInfo.screenWidth - 720) - (params.right / cc.winSize.width * this.SysInfo.screenWidth);
                    }
                    if (params.bottom != undefined) {
                        style.top = (this.SysInfo.screenHeight - 200) - (params.bottom / cc.winSize.height * this.SysInfo.screenHeight);
                    }
                    else {
                        style.top = params.top / cc.winSize.height * this.SysInfo.screenHeight;
                    }
                }
            }
            style.orientation = params.orientation ? params.orientation : "horizontal";
            Utils_1.utils.showLog("rec banner style>>>>>", JSON.stringify(style));
            this._rec_game_banner = this.qg.createGameBannerAd({
                adUnitId: Utils_1.utils.config.oppoconfig.recGameBannerId,
                style: style
            });
            this._rec_game_banner.onLoad(function () {
                Utils_1.utils.showLog('互推banner加载成功!');
            });
            // this._rec_game_banner.show().then(() => {
            //     utils.showLog('互推banner展示成功！')
            // }).catch((error) => {
            //     utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
            // })
            this._rec_game_banner.onError(function (err) {
                Utils_1.utils.showLog('互推banner加载异常!', err.errCode + ',' + err.errMsg);
                _this._rec_game_banner.destroy();
                _this._rec_game_banner = null;
            });
            this._rec_game_banner.show().then(function () {
                _this.showRecHideNativeAd();
                Utils_1.utils.showLog('互推banner展示成功！');
                if (location) {
                    Utils_1.utils.SendEvent("互推Banner展示成功，位置：" + location);
                }
            }).catch(function (error) {
                Utils_1.utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg);
            });
        }
        else {
            Utils_1.utils.showLog("OPPO 互推banner ID未配置！");
        }
    };
    /**
     * 隐藏互推banner
     */
    YZ_Tool_Oppo.prototype.hideOppoRecBanner = function (callBack) {
        var _this = this;
        if (this._rec_game_banner) {
            this._rec_game_banner.destroy().then(function () {
                callBack && callBack();
                Utils_1.utils.showLog('OPPO 互推banner 隐藏成功！');
            }).catch(function (error) {
                Utils_1.utils.showLog('OPPO 互推banner 隐藏失败:' + error.errCode + ',' + error.errMsg);
                _this._rec_game_banner.hide();
            });
            this._rec_game_banner = null;
        }
    };
    /**
     * 展示OPPO九宫格
     */
    YZ_Tool_Oppo.prototype.showOppoGamePortal = function () {
        var _this = this;
        if (!this.canShowRecommend()) {
            Utils_1.utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }
        if (!Utils_1.utils.adManager.checkShowAdTime()) {
            Utils_1.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (Utils_1.utils.config.oppoconfig.recPortalId) {
            if (!this._rec_game_portal) {
                this._rec_game_portal = this.qg.createGamePortalAd({
                    adUnitId: Utils_1.utils.config.oppoconfig.recPortalId
                });
                this._rec_game_portal.load().then(function () {
                    _this.showRecHideNativeAd();
                    Utils_1.utils.showLog('九宫格互推加载成功！');
                }).catch(function (error) {
                    _this._rec_game_portal.destroy();
                    _this._rec_game_portal = null;
                    Utils_1.utils.showLog('九宫格互推加载失败:' + error.errCode + ',' + error.errMsg);
                });
                this._rec_game_portal.onLoad(function () {
                    Utils_1.utils.showLog('互推盒子九宫格广告加载成功');
                    _this._rec_game_portal.show().then(function () {
                        Utils_1.utils.showLog('互推盒子九宫格广告-显示成功！');
                    }).catch(function (error) {
                        _this._rec_game_portal.destroy();
                        _this._rec_game_portal = null;
                        Utils_1.utils.showLog('互推盒子九宫格广告-显示失败:' + error.errCode + ',' + error.errMsg);
                    });
                });
                this._rec_game_portal.onClose(function () {
                    Utils_1.utils.showLog('互推盒子九宫格广告关闭');
                });
            }
            else {
                this._rec_game_portal.load().then(function () {
                    _this.showRecHideNativeAd();
                    Utils_1.utils.showLog('九宫格互推加载成功！');
                }).catch(function (error) {
                    _this._rec_game_portal.destroy();
                    _this._rec_game_portal = null;
                    Utils_1.utils.showLog('九宫格互推加载失败:' + error.errCode + ',' + error.errMsg);
                });
            }
        }
        else {
            Utils_1.utils.showLog("OPPO 互推九宫格 ID未配置！");
        }
    };
    /**
      * 上报自定义事件
      * @param level 当前关卡ID
      * @param levelName 关卡名称
      * @param status 状态
      */
    YZ_Tool_Oppo.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsOPPO) {
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
     * 显示互推盒子广告
     * @param top 顶部距离
     * @returns
     */
    YZ_Tool_Oppo.prototype.showGameDrawerAd = function (params) {
        var _this = this;
        if (!Utils_1.utils.config.oppoconfig.recGameDrawerId) {
            Utils_1.utils.showLog('服务器没有配置互推抽屉样式的ID，请反馈给运营！');
            return;
        }
        if (this.canShowNewRecommend()) {
            if (this._gameDrawerAd) {
                this.hideGameDrawerAd();
            }
            var style = {};
            if (params.bottom != undefined) {
                style.top = (this.SysInfo.screenHeight - 490) - (params.bottom / cc.winSize.height * this.SysInfo.screenHeight);
            }
            else {
                style.top = params.top / cc.winSize.height * this.SysInfo.screenHeight;
            }
            Utils_1.utils.showLog(" rec game drawer style >>>" + JSON.stringify(style));
            this._gameDrawerAd = this.qg.createGameDrawerAd({
                adUnitId: Utils_1.utils.config.oppoconfig.recGameDrawerId,
                style: style
            });
            this._gameDrawerAd.onShow(function () {
                Utils_1.utils.showLog('showGameDrawerAd success');
                this.showRecHideNativeAd();
            });
            this._gameDrawerAd.show().then(function () {
                Utils_1.utils.showLog('showGameDrawerAd success');
                _this.showRecHideNativeAd();
            }).catch(function (error) {
                Utils_1.utils.showLog('showGameDrawerAd fail with:' + error.errCode + ',' + error.errMsg);
            });
        }
        else {
            Utils_1.utils.showLog('快应用平台版本号低于1090，暂不支持互推盒子相关 API');
        }
    };
    /**
     * 隐藏抽屉盒子
     */
    YZ_Tool_Oppo.prototype.hideGameDrawerAd = function (callBack) {
        if (this._gameDrawerAd) {
            this._gameDrawerAd.destroy().then(function () {
                callBack && callBack();
                Utils_1.utils.showLog('hideGameDrawerAd success');
            }).catch(function (error) {
                Utils_1.utils.showLog('hideGameDrawerAd fail with:' + error.errCode + ',' + error.errMsg);
                this._gameDrawerAd.hide();
            });
            this._gameDrawerAd = null;
        }
    };
    /**友盟sdk初始化 */
    YZ_Tool_Oppo.prototype.umaInit = function () {
        if (!this.checkUmeng()) {
            Utils_1.utils.showLog("友盟ID未配置，不执行友盟初始化>>>>");
            return;
        }
        uma.init({
            appKey: Utils_1.utils.config.oppoconfig.umengId,
            useOpenid: false,
            debug: CC_DEBUG
        });
    };
    /**
       * 友盟游戏开始上报
       * @param levelID
       */
    YZ_Tool_Oppo.prototype.umaOnStart = function (levelID) {
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
    YZ_Tool_Oppo.prototype.checkUmeng = function () {
        if (!Utils_1.utils.config.oppoconfig.umengId) {
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
    YZ_Tool_Oppo.prototype.umaReportedLevel = function (levelID, event) {
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
    YZ_Tool_Oppo.prototype.umaTrackEvent = function (eventId, params) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        qg.uma.trackEvent(eventId, params);
    };
    /**
  * 退出游戏
  */
    YZ_Tool_Oppo.prototype.GameExit = function () {
        if (PlatUtils_1.default.IsOPPO) {
            Utils_1.utils.showLog("tool oppo GameExit");
            try {
                //@ts-ignore
                qg.exitApplication({
                    success: function () {
                        console.log("退出成功！");
                    },
                    fail: function () {
                        console.log("退出失败！");
                    },
                    complete: function () {
                        console.log("退出执行完成！");
                    }
                });
            }
            catch (error) {
                cc.log("GameExit erro:", JSON.stringify(error));
            }
        }
    };
    YZ_Tool_Oppo.prototype.reportDevice = function () {
        var _this = this;
        if (this.isReportDevice) {
            return;
        }
        this.isReportDevice = true;
        YouWanAnalytics_1.default.login(function (res) {
            _this.isReportDevice = false;
        });
        // let xhr = new XMLHttpRequest();
        // xhr.timeout = 6000;    // 单位毫秒
        // xhr.open('POST', requestUrl);
        // xhr.send(`data=${JSON.stringify(data)}`);
        // xhr.onreadystatechange = () => {
        //     utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
        //     if (xhr.readyState == 4) {
        //         if (xhr.status == 200) {
        //             if (xhr.responseText) {
        //                 try {
        //                     let result = JSON.parse(xhr.responseText);
        //                     if (result.code == 0) {
        //                         utils.showLog("上报设备ID成功! >>result:" + xhr.responseText + " #uid=" + result.data.uid);
        //                         localStorage.setItem(YZ_Constant.ST_YOUWAN_UID, result.data.uid);
        //                     }
        //                 } catch (error) {
        //                     utils.showLog("上报设备ID失败，#erro=" + error);
        //                 }
        //             }
        //         } else {
        //             this.isReportDevice = false;
        //             utils.showLog("上报设备ID失败!");
        //         }
        //     }
        // }
        // xhr.ontimeout = () => {
        //     this.isReportDevice = false;
        //     utils.showLog("请求超时!");
        // }
        // xhr.onerror = () => {
        //     this.isReportDevice = false;
        //     utils.showLog("请求异常!");
        // }
    };
    YZ_Tool_Oppo = __decorate([
        ccclass
    ], YZ_Tool_Oppo);
    return YZ_Tool_Oppo;
}());
exports.default = YZ_Tool_Oppo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9PcHBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQywrREFBMEQ7QUFDMUQsNkNBQXlFO0FBQ3pFLHFEQUFnRDtBQUVoRCxZQUFZO0FBQ1osSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDL0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsc0ZBQXNGO0FBQ3RGLFNBQVM7QUFDVCxJQUFNLFlBQVksR0FBVyw4QkFBOEIsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBVyxnQ0FBZ0MsQ0FBQztBQUVoRSxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUV4QyxJQUFNLDJCQUEyQixHQUFXLDBCQUEwQixDQUFDO0FBQ3ZFLElBQU0sZUFBZSxHQUFXLGNBQWMsQ0FBQztBQUMvQyxJQUFNLHFCQUFxQixHQUFXLHlCQUF5QixDQUFDLENBQUMsUUFBUTtBQUN6RSxJQUFNLHNCQUFzQixHQUFXLHdCQUF3QixDQUFDLENBQUMsY0FBYztBQUMvRSxJQUFNLHFCQUFxQixHQUFXLG9CQUFvQixDQUFDLENBQUMsY0FBYztBQUkxRTtJQUFBO1FBQ0ksWUFBWTtRQUNaLE9BQUUsR0FBUSxFQUFFLENBQUM7UUFDYjs7Ozs7Ozs7Ozs7Ozs7VUFjRTtRQUNGLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFhckIsTUFBTTtRQUNOLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBdUVFO1FBQ0Ysa0JBQWEsR0FBUSxJ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Z0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7SUFDTCxDQUFDO0lBSU0sbUNBQVksR0FBbkI7UUFBQSxpQkE2Q0M7UUE1Q0csSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHlCQUFlLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztZQUN0QixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILGtDQUFrQztRQUNsQyxpQ0FBaUM7UUFDakMsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsc0ZBQXNGO1FBQ3RGLGlDQUFpQztRQUNqQyxtQ0FBbUM7UUFFbkMsc0NBQXNDO1FBQ3RDLHdCQUF3QjtRQUN4QixpRUFBaUU7UUFDakUsOENBQThDO1FBQzlDLGdIQUFnSDtRQUNoSCw0RkFBNEY7UUFDNUYsd0JBQXdCO1FBQ3hCLG9DQUFvQztRQUNwQyxnRUFBZ0U7UUFDaEUsb0JBQW9CO1FBRXBCLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsMkNBQTJDO1FBQzNDLDBDQUEwQztRQUMxQyxZQUFZO1FBQ1osUUFBUTtRQUNSLElBQUk7UUFDSiwwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ25DLDhCQUE4QjtRQUM5QixJQUFJO1FBQ0osd0JBQXdCO1FBQ3hCLG1DQUFtQztRQUNuQyw4QkFBOEI7UUFFOUIsSUFBSTtJQUNSLENBQUM7SUF4eENnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBMnhDaEM7SUFBRCxtQkFBQztDQTN4Q0QsQUEyeENDLElBQUE7a0JBM3hDb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlvdVdhbkFuYWx5dGljcyBmcm9tIFwiLi9Zb3VXYW5TREsvWW91V2FuQW5hbHl0aWNzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBCYW5uZXJMb2NhdGlvbiwgTGV2ZWxTdGF0dXMgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xyXG5cclxuLy9AdHMtaWdub3JlXHJcbnZhciB1bWEgPSByZXF1aXJlKCcuL1VNZW5nU0RLL3F1aWNrR2FtZS91bWEubWluLmpzJyk7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8vIGh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9tPWdjb25maWcmdWlkPXh4eCZhcHBfaWQ9eHh4JmNoYW5uZWw9eHh4JmRldmljZV91aWQ9eHh4XHJcbi8v6I635Y+W5pyN5Yqh5Zmo6YWN572uXHJcbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9yZXBvcnQueW91bGVzcC5jb20vZ3NzP1wiO1xyXG5cclxubGV0IFNUX0RlZmF1bHRTZXJ2ZXJDb25maWc6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5jb25zdCBTVF9OYXRpdmVJbnNlcnRBZENsaWNrVGltZXM6IHN0cmluZyA9IFwiTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzXCI7XHJcbmNvbnN0IFNUX0xhc3REYXRlVGltZTogc3RyaW5nID0gXCJMYXN0RGF0ZVRpbWVcIjtcclxuY29uc3QgU1RfSW5zZXJ0QWRTaG93Q291bnRzOiBzdHJpbmcgPSBcIk5hdGl2ZUluc2VydEFkU2hvd0NvdW50XCI7IC8v5o+S5bGP5pi+56S65qyh5pWwXHJcbmNvbnN0IFNUX0Jhbm5lckFkQ2xvc2VDb3VudHM6IHN0cmluZyA9IFwiU1RfQmFubmVyQWRDbG9zZUNvdW50c1wiOyAvL2Jhbm5lcuW5v+WRiuWFs+mXreasoeaVsFxyXG5jb25zdCBTVF9ZWkJhbm5lclNob3dDb3VudHM6IHN0cmluZyA9IFwiWVpCYW5uZXJTaG93Q291bnRzXCI7IC8vYmFubmVy5bm/5ZGK5YWz6Zet5qyh5pWwXHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF9PcHBvIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcWc6IGFueSA9IHFnO1xyXG4gICAgLypcclxuICAgIENPUkVWZXJzaW9uXHQgICAgc3RyaW5nXHTniYjmnKzlj7dcclxuICAgIGJyYW5kXHQgICAgICAgIHN0cmluZ1x05omL5py65ZOB54mMXHJcbiAgICBsYW5ndWFnZVx0ICAgIHN0cmluZ1x05b2T5YmN546v5aKD6K6+572u55qE6K+t6KiAXHJcbiAgICBtb2RlbFx0ICAgICAgICBzdHJpbmdcdOaJi+acuuWei+WPt1xyXG4gICAgbm90Y2hIZWlnaHRcdCAgICBudW1iZXJcdOWHueanvemrmOW6pijliJjmtbflsY/pq5jluqYpXHJcbiAgICBwaXhlbFJhdGlvXHQgICAgbnVtYmVyXHTorr7lpIflg4/ntKDmr5RcclxuICAgIHBsYXRmb3JtXHQgICAgc3RyaW5nXHTlrqLmiLfnq6/lubPlj7BcclxuICAgIHBsYXRmb3JtVmVyc2lvblx0bnVtYmVyXHTlubPlj7DniYjmnKzlj7dcclxuICAgIHNjcmVlbkhlaWdodFx0bnVtYmVyXHTlsY/luZXpq5jluqZcclxuICAgIHNjcmVlbldpZHRoXHQgICAgbnVtYmVyXHTlsY/luZXlrr3luqZcclxuICAgIHN5c3RlbVx0ICAgICAgICBzdHJpbmdcdOaTjeS9nOezu+e7n+eJiOacrFxyXG4gICAgd2luZG93SGVpZ2h0XHRudW1iZXJcdOWPr+S9v+eUqOeql+WPo+mrmOW6plxyXG4gICAgd2luZG93V2lkdGhcdCAgICBudW1iZXJcdOWPr+S9v+eUqOeql+WPo+WuveW6plxyXG4gICAgKi9cclxuICAgIF9zeXNJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54mI5pys5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy52ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+eUqOaIt+adpea6kFxyXG4gICAgX3NvdXJjZTogc3RyaW5nID0gXCJcIjtcclxuICAgIC8qKlxyXG4gICAgKiBPUFBP5pyN5Yqh5Zmo6YWN572u5pWw5o2uXHJcbiAgICAqIHtcclxuICAgICogXHJcbi0tIFwiYmFubmVyX2Nsb3NlX2Z1bGxfY291bnRfc2hvd3l6XCI6XCJ0cnVlXCIgLy9iYW5uZXLovr7liLDmmL7npLrmrKHmlbDkuYvlkI7mmK/lkKbmmL7npLroh6rlrprkuYliYW5uZXIgLum7mOiupO+8muS4jeWhq+WGmVxyXG4tLVwibmF0aXZlX2Jhbm5lcl9kZWxheV90aW1lXCI6IDEsICAvL2Jhbm5lcuWSjOaPkuWxj+mDveaYr+WOn+eUn+S8mOWFiOeahOivne+8jOW7tui/n+WxleekumJhbm5lci4g5Y2V5L2N77ya56eSIOOAgum7mOiupO+8muS4jeWhq+WGmVxyXG4tLSBcInN0YXRlbWVudF9hdXRvX3JlZnJlc2hcIjogMSwgICAvLyDnu5Pnrpflub/lkYrliLfmlrDpopHnjofjgIIg5Y2V5L2N77ya56eS44CCIOm7mOiupOS4jeWhq+WGmeS4ujPnp5LjgIJcclxuLS0gXCJpc19ib3R0b21fYmFubmVyX2xpc3RcIjpcInRydWVcIiAvL+aYr+WQpuaYvuekuuiHquWumuS5ieeahGJhbm5lciDpu5jorqTvvJrkuI3loavlhplcclxuLS0gXCJyZWZyZXNoX2FkX3RpbWVcIjoxNSAvL2Jhbm5lcuW5v+WRiuWIt+aWsOeahOmXtOmalOaXtumXtOOAguWNleS9je+8muenkiDpu5jorqTvvJrkuI3loavlhplcclxuLS0gXCJjbG9zZV9idG5fZmFkZV9pbl90aW1lXCI6MCAgLy/ot7Pov4fmjInpkq7lu7bov5/mmL7npLrnmoTml7bpl7TjgILljZXkvY3vvJrnp5IgIOm7mOiupO+8muS4jeWhq+WGmVxyXG4tLSBcInN0X3NwYXJlX3R5cGVcIjogNCwgICAvLyDnu5Pnrpflub/lkYrlpIfpgInnsbvlnovvvIwg5b2Tc3RhdGVtZW50X3R5cGXkuLox5oiW6ICFMueahOaXtuWAmeWIpOaWreaYr+WQpuaYvuekuui+vuWIsOmZkOWItuOAgui+vuWIsOmZkOWItueahOaXtuWAmeaYvuekuuW9k+WJjeWkh+mAieeahOe7hOS7tu+8m+WAvCA977yIM+OAgTTjgIE177yJ44CCIOm7mOiupO+8muS4jeWhq+WGmVxyXG4tLSBcIm5hdGl2ZV9iYW5uZXJfZGVsYXlfdGltZVwiOiAxICAgLy/lpoLmnpxiYW5uZXLlkozmj5LlsY/pg73kvJjlhYjlsZXnpLrljp/nlJ/lsLHlu7bov5/osIPnlKjjgIIg5Y2V5L2N77ya56eS44CC6buY6K6kMeenklxyXG4tLSDigJxpbnRlcnNpdGl0aWFsX29wZW5fY2xvc2VfYmFubmVy4oCdOjAgLC8v5o+S5bGP5pi+56S65ZCO5piv5pON5L2cQmFubmVyLCAwIO+8muS4uuS4jeW8gOWQr++8jDE65Li66ZSA5q+B77yMMjrpmpDol48gICDpu5jorqTvvJoxXHJcbi0tICBcImJhbm5lcl9jbG9zZV9jb3VudFwiOjAgLCAgLy9iYW5uZXLlhbPpl63mrKHmlbDovr7liLDpmZDliLblkI7kuI3mmL7npLogICAwOuS4jemZkOWItuasoeaVsO+8jD4w77ya6ZmQ5Yi255qE5qyh5pWw6L6+5Yiw5ZCO5LiN5YaN5pi+56S6YmFubmVyICDpu5jorqTvvJo1XHJcbi0tICBcInN0X3N5bmNcIjpcInRydWVcIiAgICAvL+WIpOaWree7k+eul+W5v+WRiuexu+Wei+S4ujTjgIE155qE5pe25YCZ77yM5piv5ZCm5ZCM5pe25pi+56S677yM6buY6K6kdHJ1ZVxyXG4tLSAgXCJzdGF0ZW1lbnRfdHlwZVwiOiAx44CBMuOAgTPjgIE044CBNVxyXG4gICAgICAgICAgICAgICAgICAgICAgIOS4gOOAgea4uOaIj+e7k+eul+W5v+WRiuWxleekulxyXG4gICAgICAgICAgICAgICAgICAgICAgIDEu5pi+56S66buY6K6k5o+S5bGP5bm/5ZGKXHJcbiAgICAgICAgICAgICAgICAgICAgICAgMi7mmL7npLrmj5LlsY/lub/lkYogICjpu5jorqTkvJjlhYjmiJbljp/nlJ/kvJjlhYjvvIzkuZ/lsLHmmK/nm67liY3lsZXnpLrnmoTop4TliJkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgMy7mmL7npLrmj5LlsY/lub/lkYorNuS4quS6kuaOqCAo6buY6K6k5LyY5YWI5oiW5Y6f55Sf5LyY5YWI77yM5Lmf5bCx5piv55uu5YmN5bGV56S655qE6KeE5YiZKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIDQu5pi+56S65o+S5bGP5bm/5ZGK44CB5Y6f55Sf5bm/5ZGK77yI5rKh5pyJ5LqS5o6o55qE5Y2V5Liq5Y6f55Sf5bm/5ZGK77yJIDHvvJoo6buY6K6k5LyY5YWI5oiW5Y6f55Sf5LyY5YWI77yM5Lmf5bCx5piv55uu5YmN5bGV56S655qE6KeE5YiZKSAy44CB6buY6K6k5o+S5bGP5ZKM5Y6f55Sf5bm/5ZGK5ZCM5pe25bGV56S6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgNS7mmL7npLrmj5LlsY/lub/lkYrjgIHljp/nlJ/lub/lkYrvvIjmnIkz5Liq5LqS5o6oK+WOn+eUn+eahOW5v+WRiu+8iSAx44CBKOWOn+eUn+S8mOWFiOaIluiAheaPkuWxj+S8mOWFiO+8jOWSjOWQjOaXtuWxleekuikgMuOAgem7mOiupOaPkuWxj+WSjOWOn+eUn+W5v+WRiuWQjOaXtuWxleekulxyXG4tLSAgXCJpbnRlcnNpdGl0aWFsX21heF9zaG93X2NvdW50XCI6IDgsICAgLy/mj5LlsY/mnIDlpKfmmL7npLrmrKHmlbAg6buY6K6k77yaOFxyXG4tLSAgXCJpbnRlcnNpdGl0aWFsX2ludGVydmFsX3RpbWVcIjogNjAsICAgLy/mj5LlsY/mmL7npLrpl7TpmpTmlbAg6buY6K6k77yaNjBcclxuLS1cdFwiaW50ZXJzaXRpdGlhbF9vcGVuX2Nsb3NlX2Jhbm5lclwiOiBcInRydWVcIiwgLy/mj5LlsY/mmL7npLrnmoTml7blgJnmmK/lkKbpmpDol49iYW5uZXJcclxuLS1cdFwicmV3YXJkX2ZpcnN0X2FkXCI6IFwidmlkZW9cIiwgLy8g5r+A5Yqx6KeG6aKR5pi+56S65LyY5YWI57qn5Yir77yaIHZpZGVv77ya5r+A5Yqx6KeG6aKR77yMaW5zZXJ0Oua/gOWKseS6kuaOqFxyXG4tLVx0XCJpc19yZXdhcmRfaW50ZXJzaXRpdGlhXCI6IFwidHJ1ZVwiLFxyXG4tLSAgXCJuYXRpdmVfc2luZ2xlX3Bvc19pZFwiOltdLCAgLy/ljZXkuKrljp/nlJ/lub/lkYpJRC0t55So5LqO57uT566X57uE5Lu2XHJcbi0tIFwiaXNfbW92ZV9idG5cIjowICAvL+aYr+WQpuW8gOWQr+enu+WKqOaMiemSruaViOaenCDpu5jorqTkuI3lvIDlkK8gMO+8muaYvuekumJhbm5lcizkuJTmjInpkq7lnKjkuIrpnaLjgIIgMTog5pi+56S6QmFubmVyLOaMiemSruWxheW6lemDqOS4lOenu+WKqCAzOiDlpKfkuo4w55qE6K+d5oyJ54Wn5pe26Ze056e75Yqo5oyJ6ZKuXHJcblxyXG5cclxuLS0g5pqC5pyq6KaG55uW5YW25LuW5ri45oiPXHJcbi0tXHRcImF1dG9fc2lnblwiOiBcImZhbHNlXCIsIC8v5piv5ZCm6Ieq5Yqo5by55Ye6562+5YiwIOm7mOiupO+8mmZhbHNlXHJcbi0tXHRcInRyeV9za2luX2xldmVsX2NvdW50XCI6IDUsIC8vIOearuiCpOivleeUqOeahOWFs+WNoeaVsOmHjyDpu5jorqTvvJo15YWzXHJcblxyXG5cclxuLS1cdFwiaW50ZXJzaXRpdGlhX2RlbGF5X3Nob3dfdGltZVwiOiAwLjUsICAgLy8g5o+S5bGP5bm/5ZGK5bu25pe25bGV56S65pe26Ze0L+enkiDpu5jorqTlgLwwLjVcclxuLS1cdFwiaW50ZXJzaXRpdGlhX2Nsb3NlX2RlbGF5X3RpbWVcIjogMSwgICAgLy8g5YWz6Zet5oyJ6ZKu5bu25pe25pi+56S65pe26Ze0L+enku+8jOm7mOiupCAxXHJcbi0tXHRcImludGVyc2l0aXRpYV9jbG9zZV9idXRfYWxwaGFcIjogMTIwLCAgIC8vIOWFs+mXreaMiemSrmFscGhhLCDpu5jorqQgMTIwXHJcbi0tICBcImludGVyc2l0aXRpYV9jbG9zZV9idXRfc2l6ZVwiOiAxMDAsICAgIC8vIOWFs+mXreaMiemSruWkp+Wwj1xyXG4tLSAgXCJpbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3JhbmdlXCI6IDEwMCwgICAvLyDlhbPpl63mjInpkq7ngrnlh7vojIPlm7RcclxuLS0gIFwiaW50ZXJzaXRpdGlhbF9maXJzdF9hZFwiOiBcIm5hdGl2ZVwiLCAgICAvLyDmj5LlsY/lub/lkYrkvJjlhYjlsZXnpLrnsbvlnosgW2RlZmF1bHQg5bCP5ri45oiP5bm/5ZGK77yMIG5hdGl2ZSDljp/nlJ/lub/lkYpdXHJcbi0tICBcImludGVyc2l0aXRpYV9jbGlja19jb3VudFwiOiAxLCAgICAgICAgIC8vIOaPkuWxj+W5v+WRiueCueWHu+avj+WkqeasoeaVsOaOp+WIti/mrKHmlbBcclxuLS1cdFwiaW50ZXJzaXRpdGlhX3Nob3dfaW50ZXJ2YWxcIjogMSwgICAgICAgLy8g5o+S5bGP5bm/5ZGK5bGV56S66Ze06ZqUL+asoeaVsOOAgmludGVyc2l0aXRpYV9jbGlja19jb3VudCDmrKHmlbDovr7liLDlkI7lkK/nlKhcclxuLS0gIFwiaW50ZXJzaXRpdGlhbF9jbGlja19jbG9zZVwiOiBcImZhbHNlXCIgICAvLyDngrnlh7vlhbPpl63mjInpkq7lkI7mmK/lkKblhbPpl63lub/lkYrvvIwg6buY6K6k5YC8IGZhbHNlXHJcblxyXG4tLVx0XCJiYW5uZXJfc2hvd19oZWlnaHRcIjogMTIwLCAgICAgICAgIC8vIOW5v+WRiuadoeeahOmrmOW6pu+8jOacgOS9jjE2MCAgICAgICAgIFxyXG4tLVx0XCJiYW5uZXJfY2xvc2VfYnV0X3Nob3dcIjogXCJ0cnVlXCIsICAgLy8g5piv5ZCm5pi+56S65YWz6Zet5oyJ6ZKuIFt0cnVlIOaYvuekuu+8jCBmYWxzZSDkuI3mmL7npLpd77yMIOm7mOiupOWAvCB0cnVlXHJcbi0tXHRcImJhbm5lcl9jbG9zZV9idXRfYWxwaGFcIjogMTIwLCAgICAgLy8g5YWz6Zet5oyJ6ZKuYWxwaGEs6buY6K6kIDEyMFxyXG4tLSAgXCJiYW5uZXJfY2xvc2VfYnV0X3NpemVcIjogMzMsICAgICAgIC8vIOWFs+mXreaMiemSruWkp+Wwjywg6buY6K6kIDMzXHJcbi0tICBcImJhbm5lcl9jbG9zZV9idXRfcmFuZ2VcIjogMzMsICAgICAgLy8g5YWz6Zet5oyJ6ZKu54K55Ye76IyD5Zu0LCDpu5jorqQgMzNcclxuLS1cdFwiYmFubmVyX2ZpcnN0X2FkXCI6IFwibmF0aXZlXCIsICAgICAgIC8vIOW5v+WRiuS8mOWFiOWxleekuuexu+Wei1tkZWZhdWx0IOWwj+a4uOaIj+W5v+WRiu+8jCBuYXRpdmUg5Y6f55Sf5bm/5ZGKLCB5emJhbm5lciDoh6rlrprkuYliYW5uZXJdIFxyXG4tLSAgXCJiYW5uZXJfY2xpY2tfcmVmcmVzaFwiOiBcInRydWVcIiwgICAgLy8g5bm/5ZGK54K55Ye75ZCO5piv5ZCm5Yi35paw77yM6buY6K6k5YC8IHRydWVcclxuXHJcbiAgIFwiaXNfbG9jYWxfcG9zX2lkXCI6IFwiZmFsc2VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmmK/lkKbkvb/nlKjmnKzlnLDlub/lkYppZFxyXG4gICBcImludGVyc2l0aXRpYV9wb3NfaWRcIjogXCI5NjI5MlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bCP5ri45oiP5o+S5bGPaWRcclxuICAgXCJiYW5uZXJfcG9zX2lkXCI6IFwiOTYyOTNcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwj+a4uOaIj2Jhbm5lciBpZFxyXG4gICBcInZpZGVvX3Bvc19pZFwiOiBcIjk2Mjk0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bCP5ri45oiP6KeG6aKRaWRcclxuICAgXCJuYXRpdmVfaW50ZXJzaXRpdGlhbF9wb3NfaWRcIjogW1wiOTYyOTdcIiwgXCI5NjI5OFwiXSwgICAgICAgICAgLy8g5Y6f55Sf5o+S5bGPaWRcclxuICAgXCJuYXRpdmVfYmFubmVyX3Bvc19pZFwiOiBbXCI5NjI5NVwiLCBcIjk2Mjk2XCJdLCAgICAgICAgICAgICAgICAgLy8g5Y6f55SfYmFubmVyIGlkIFxyXG4gICBcImlzX2p1bXBcIjogXCJ0cnVlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5piv5ZCm5pi+56S65ri45oiP5YaF5Lqk5Y+J5o6o5bm/57uE5Lu277yM5Lqk5Y+J5o6o5bm/5oyC5Lu25Yi35paw6aKR546HXHJcbiAgIFwianVtcF9saXN0XCI6IFt7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Lqk5Y+J5o6o5bm/5oyC5Lu25YaF5a655L+h5oGvXHJcbiAgICAgICBcIm5hbWVcIjogXCLlrZDlvLnlhYjnlJ/ni5nlh7vmiJjlnLpcIixcclxuICAgICAgIFwiaWNvblwiOiBcImh0dHBzOi8veGN4LnlvdWxldGQuY29tL3hjeC9pY29uL3pkeHNqanpjLnBuZ1wiLFxyXG4gICAgICAgXCJwa2dcIjogXCJjb20ueXp4eC56ZHhzamp6Yy5reXgubmVhcm1lLmdhbWVjZW50ZXJcIlxyXG4gICB9LCB7XHJcbiAgICAgICBcIm5hbWVcIjogXCLnv7vmu5rnmoTpppnogqBcIixcclxuICAgICAgIFwiaWNvblwiOiBcImh0dHBzOi8veGN4LnlvdWxldGQuY29tL3hjeC9pY29uL2ZnZHhjLnBuZ1wiLFxyXG4gICAgICAgXCJwa2dcIjogXCJjb20ueXp4eC5mZ2R4Yy5reXgubmVhcm1lLmdhbWVjZW50ZXJcIlxyXG4gICB9XVxyXG4gICB9XHJcbiAgICAqL1xyXG4gICAgX3NlcnZlckNvbmZpZzogYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgX25hdGl2ZUluc2VydEFkQ2xpY2tUaW1lczogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBnZXQgTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVJbnNlcnRBZENsaWNrVGltZXM7XHJcbiAgICB9XHJcblxyXG4gICAgX2luc2VydEFkU2hvd0NvdW50czogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5o+S5bGP5bm/5ZGK5bGV56S65qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaW5zZXJ0QWRTaG93Q291bnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnNlcnRBZFNob3dDb3VudHM7XHJcbiAgICB9XHJcblxyXG4gICAgX2Jhbm5lckFkQ2xvc2VDb3VudHM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIGJhbm5lcuWFs+mXreasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGJhbm5lckFkQ2xvc2VDb3VudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhbm5lckFkQ2xvc2VDb3VudHM7XHJcbiAgICB9XHJcblxyXG4gICAgX3l6QmFubmVyU2hvd0NvdW50czogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog6Ieq5a6a5LmJYmFubmVy5bGV56S65qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgeXpCYW5uZXJTaG93Q291bnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl95ekJhbm5lclNob3dDb3VudHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOahjOmdouWbvuagh+aYr+WQpuWIm+W7ulxyXG4gICAgX3Nob3J0Y3V0Q3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdldCBTaG9ydGN1dENyZWF0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3J0Y3V0Q3JlYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3VpZDtcclxuICAgICAgICB0aGlzLl9sb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL+acjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgX3NlcnZpY2VfdWlkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSAwKSByZXR1cm4gdGhpcy5fc2VydmljZV91aWQ7XHJcbiAgICAgICAgdGhpcy5yZXBvcnRMb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh0lEXHJcbiAgICBfZGV2aWNlX2lkID0gXCJcIjtcclxuXHJcbiAgICAvL+acrOWcsHV1aWRcclxuICAgIF91dWlkOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8v5LyY546pVUlEXHJcbiAgICBfeXdfdWlkOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVtYUluaXQoKVxyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fc3lzSW5mbyA9IHFnLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlN5c0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOWwj+a4uOaIj+W5s+WPsOS/oeaBrzogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLlN5c0luZm8pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai5vcHBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU1RfRGVmYXVsdFNlcnZlckNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ09iai5vcHBvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl95d191aWQgPSBwYXJzZUludChZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9ZT1VXQU5fVUlELCBcIi0xXCIpKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kZXZpY2VfaWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9ERVZJQ0VfSUQpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RldmljZV9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5vbihZWl9Db25zdGFudC5ZWl9Qcml2YWN5Q2xvc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREZXZpY2VJZCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v6I635Y+W5bCP56iL5bqP5ZCv5Yqo5p2l5rqQXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA1MFwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHFnLmdldExhdW5jaE9wdGlvbnNTeW5jKCk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zICYmIGNvbnNvbGUubG9nKFwib3B0aW9ucz4+PlwiLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlZmVycmVySW5mbyAmJiBvcHRpb25zLnJlZmVycmVySW5mby5wYWNrYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluWIsOWwj+eoi+W6j+WQr+WKqOadpea6kO+8mlwiICsgb3B0aW9ucy5yZWZlcnJlckluZm8ucGFja2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291cmNlID0gb3B0aW9ucy5yZWZlcnJlckluZm8ucGFja2FnZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+eoi+W6j+eJiOacrOS9juS6jjEwNTDvvIzojrflj5bkuI3liLDlsI/nqIvluo/lkK/liqjmnaXmupDvvIFgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9naW4oKTtcclxuICAgICAgICAgICAgbGV0IGFwcElkID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYXBwSUQgKyBcIl9cIjtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oYXBwSWQgKyBTVF9OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRBZFNob3dDb3VudHMgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBJZCArIFNUX0luc2VydEFkU2hvd0NvdW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkQ2xvc2VDb3VudHMgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBJZCArIFNUX0Jhbm5lckFkQ2xvc2VDb3VudHMpO1xyXG4gICAgICAgICAgICB0aGlzLl95ekJhbm5lclNob3dDb3VudHMgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBJZCArIFNUX1laQmFubmVyU2hvd0NvdW50cyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF5OiBzdHJpbmcgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBJZCArIFNUX0xhc3REYXRlVGltZSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF5ICE9IGN1ckRhdGUudG9EYXRlU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRBZFNob3dDb3VudHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWRDbG9zZUNvdW50cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl95ekJhbm5lclNob3dDb3VudHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwSWQgKyBTVF9ZWkJhbm5lclNob3dDb3VudHMsIDApO1xyXG4gICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwSWQgKyBTVF9OYXRpdmVJbnNlcnRBZENsaWNrVGltZXMsIDApO1xyXG4gICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwSWQgKyBTVF9JbnNlcnRBZFNob3dDb3VudHMsIDApO1xyXG4gICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwSWQgKyBTVF9MYXN0RGF0ZVRpbWUsIGN1ckRhdGUudG9EYXRlU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfR0VUX0RFVklDRV9JRCwgXCIwXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8v5qOA5rWL5qGM6Z2i5Zu+5qCH5piv5ZCm5Yib5bu6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc092ZXJNaW5pVmVyc2lvbihcIjEwNDRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSGFzU2hvcnRDdXQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcyAmJiB1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnN0YXJ0X2F1dG9fY3JlYXRlX3Nob3J0X2N1dF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDnu4Tku7bliJ3lp4vljJbmiJDlip/vvIwke3V0aWxzLlNlcnZlckNvbmZpZy5zdGFydF9hdXRvX2NyZWF0ZV9zaG9ydF9jdXRfdGltZX3np5LlkI7lvLnlh7roh6rliqjliJvlu7rmoYzpnaLvvIFgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi57uE5Lu25Yid5aeL5YyW5oiQ5Yqf77yM5by55Ye66Ieq5Yqo5Yib5bu65qGM6Z2i77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTaG9ydGN1dCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLoh6rliqjliJvlu7rmoYzpnaLmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6Ieq5Yqo5Yib5bu65qGM6Z2i5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB1dGlscy5TZXJ2ZXJDb25maWcuc3RhcnRfYXV0b19jcmVhdGVfc2hvcnRfY3V0X3RpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9yZWxvYWRUaW1lczogbnVtYmVyID0gNjtcclxuICAgIF9jdXJsb2FkVGltZXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv53lrZjmnI3liqHlmajphY3nva7liLDmnKzlnLBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBfc2F2ZUNvbmZpZyhkYXRhOiBhbnkpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwibT1nXCIgKyBgJmRldmljZV9kYXRhPSR7ZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KHRoaXMuX3N5c0luZm8pKX1gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdChTVF9TZXJ2ZXJVcmwgKyBtZXRob2QsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cmxvYWRUaW1lcysrO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2FsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg56ysJHt0aGlzLl9jdXJsb2FkVGltZXN95qyh5ouJ5Y+W5pyN5Yqh5Zmo6YWN572uIWApXHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE/mnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXV0aWxzLkRlYnVnTG9hY2FsQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nVmlldyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwi5byA5ZCv5LqG5pys5Zyw5pWw5o2u5rWL6K+V77yM5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBP5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE/mnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cmxvYWRUaW1lcyA8IHRoaXMuX3JlbG9hZFRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLph43mlrDmi4nlj5bphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNhbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IEpTT04ucGFyc2UoU1RfRGVmYXVsdFNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cmxvYWRUaW1lcyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5iYW5uZXJJZCA9IHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmluc2VydElkID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcudmlkZW9JZCA9IHRoaXMuU2VydmVyQ29uZmlnLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlSW5zZXJ0SWRzID0gdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5uYXRpdmVCYW5uZXJJZHMgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlVHJ5R2FtZUlkcyA9IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV90cnlnYW1lX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcucmVjR2FtZUJhbm5lcklkID0gdGhpcy5TZXJ2ZXJDb25maWcucmVjX2dhbWVfYmFubmVyX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5yZWNQb3J0YWxJZCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlY19wb3J0YWxfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnJlY0dhbWVEcmF3ZXJJZCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlY19nYW1lX2RyYXdlcl9pZCB8fCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5yZWNHYW1lRHJhd2VySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzID0gdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX3NpbmdsZV9wb3NfaWQgfHwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlU2luZ2xlQWRJZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmludGVyc2l0aWFsQWRDb25maWdzID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpYWxfY29uZmlncyB8fCB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlncztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzID0gdGhpcy5TZXJ2ZXJDb25maWcuYmFubmVyX2NvbmZpZ3MgfHwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVyQWRDb25maWdzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvb/nlKjmnKzlnLDphY3nva7nmoTlub/lkYpJRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmdldF9kZXZpY2VfaWQgJiYgdGhpcy5TZXJ2ZXJDb25maWcuZ2V0X2RldmljZV9pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0dldERldmljZUlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDljp/nlJ/lub/lkYrphY3nva46XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0ubG9jYXRpb24sIFwiPj4+PlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnNldE5hdGl2ZUJhbm5lckluZm8odGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzW2ldLmxvY2F0aW9uLCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJsb2FkVGltZXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWPquacieesrOS4gOasoeaLieWPluaJjeS8muWPkemAgeS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr5TovoPlvZPliY3lubPlj7DniYjmnKzmmK/lkKbpq5jkuo7mjIflrprnmoTniYjmnKzlj7dcclxuICAgICAqIEBwYXJhbSBtaW5pVmVyc2lvbiDmnIDkvY7lubPlj7DniYjmnKzlj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzT3Zlck1pbmlWZXJzaW9uKG1pbmlWZXJzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImN1clBsYXRWZXJzaW9uID0gXCIgKyB0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbiArIFwibWluaVZlcnNpb24gPSBcIiArIG1pbmlWZXJzaW9uICsgXCJcIiArICh0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbiA+PSBtaW5pVmVyc2lvbikpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvLnBsYXRmb3JtVmVyc2lvbiA+PSBtaW5pVmVyc2lvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HmoYzpnaLlv6vmjbfmlrnlvI/mmK/lkKbliJvlu7rov4dcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrSGFzU2hvcnRDdXQoY2FsbEJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucWcuaGFzU2hvcnRjdXRJbnN0YWxsZWQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qOA5rWL5qGM6Z2i5b+r5o235pa55byP5piv5ZCm5bey57uP5Yib5bu66L+HOiByZXN1bHQ9XCIsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRDcmVhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2sgJiYgY2FsbEJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydGN1dENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrICYmIGNhbGxCYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qOA5rWL5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuajgOa1i+WujOaIkO+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlRGVmYXVsdExvYWRpbmdQYWdlKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxZy5sb2FkaW5nQ29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjb3VudE5hdGl2ZUluc2VyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzKys7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0odXRpbHMuY29uZmlnLm9wcG9jb25maWcuYXBwSUQgKyBcIl9cIiArIFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcywgdGhpcy5fbmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWinuWKoOaPkuWxj+aYvuekuueahOasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY291bnRJbnNlclNob3dDb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9pbnNlcnRBZFNob3dDb3VudHMrKztcclxuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbSh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5hcHBJRCArIFwiX1wiICsgU1RfSW5zZXJ0QWRTaG93Q291bnRzLCB0aGlzLl9pbnNlcnRBZFNob3dDb3VudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aKe5YqgYmFubmVy55qE5YWz6Zet5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb3VudEJhbm5lckNsb3NlQ291bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyQWRDbG9zZUNvdW50cysrO1xyXG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmFwcElEICsgXCJfXCIgKyBTVF9CYW5uZXJBZENsb3NlQ291bnRzLCB0aGlzLl9iYW5uZXJBZENsb3NlQ291bnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5aKe5Yqg6Ieq5a6a5LmJYmFubmVy55qE5pi+56S65qyh5pWwXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNvdW50WXpCYW5uZXJTaG93Q291bnQoKSB7XHJcbiAgICAgICAgdGhpcy5feXpCYW5uZXJTaG93Q291bnRzKys7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0odXRpbHMuY29uZmlnLm9wcG9jb25maWcuYXBwSUQgKyBcIl9cIiArIFNUX1laQmFubmVyU2hvd0NvdW50cywgdGhpcy5feXpCYW5uZXJTaG93Q291bnRzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazliLDmjIflrprnmoTlsI/muLjmiI9cclxuICAgICAqIEBwYXJhbSBwa2dOYW1lIOWMheWQjVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uKHJldCkg6Lez6L2s5Zue6LCDLiByZXQ6IHRydWUgfCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmF2aWdhdGVUb01pbmlHYW1lKHBrZ05hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgbGV0IGNvbXBsZXRlQ2FsbGJhY2s6IEZ1bmN0aW9uID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxZy5uYXZpZ2F0ZVRvTWluaUdhbWUoe1xyXG4gICAgICAgICAgICAgICAgcGtnTmFtZTogcGtnTmFtZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6Lez6L2s5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6Lez6L2s5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWPr+S7peWIm+W7uuahjOmdouWbvuagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FuQ3JlYXRlU2hvcnRjdXQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNPdmVyTWluaVZlcnNpb24oXCIxMDQwXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65qGM6Z2i5b+r5o235pa55byPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVTaG9ydGN1dChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tGdW5jID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFnLmluc3RhbGxTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5qGM6Z2i5Zu+5qCH5Yib5bu65oiQ5Yqf77yBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hvcnRjdXRDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJjcmVhdGVTaG9ydGN1dCA+Pj5mYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja0Z1bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiY3JlYXRlU2hvcnRjdXQgPj4+Y29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdERhdGEob3RoZXJHYW1lQXBwSWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmp1bXBcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmp1bXBfYXBwX2lkPSR7b3RoZXJHYW1lQXBwSWR9YDtcclxuICAgICAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeaVsOaNriwgdXJsPVwiICsgdXJsKTtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaVsOaNruS4iuaKpeWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXmlbDmja5cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEdhbWVTb3VyZWNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgbGV0IGFwcGlkOiBzdHJpbmcgPSB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5hcHBJRDtcclxuICAgICAgICAgICAgbGV0IHVpZDogc3RyaW5nID0gdGhpcy5fdWlkO1xyXG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogc3RyaW5nID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcuY2hhbm5lbCA/IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmNoYW5uZWwudG9Mb3dlckNhc2UoKSA6IFwib3Bwb1wiO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gUE9TVF9TZXJ2ZXJVcmwgKyBga3l4PXRydWUmYXBwX2lkPSR7YXBwaWR9JmNoYW5uZWw9JHtjaGFubmVsfSZ1aWQ9JHt0aGlzLl91aWR9JnNvdXJjZT0ke3NvdXJjZX1gO1xyXG5cclxuICAgICAgICAgICAgLy8gbGV0IHVybDogc3RyaW5nID0gYGh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzP209anVtcCZhcHBfaWQ9JHthcHBpZH0mdWlkPSR7dWlkfSZjaGFubmVsPSR7Y2hhbm5lbH0manVtcF9hcHBfaWQ9JHtvdGhlckdhbWVBcHBJZH1gO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5ri45oiP5p2l5rqQ5pWw5o2uLCB1cmw9XCIgKyB1cmwpO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2xvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9sb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIF9sb2dpbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9sb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fbG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDnmbvlvZXor7fmsYLpl7TpmpTlsI/kuo7vvJoke3RoaXMuX2xvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1VJRCk7XHJcbiAgICAgICAgdGhpcy5fdWlkID0gdGhpcy5fdWlkID8gdGhpcy5fdWlkIDogXCIwXCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IDA7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluacrOWcsOS/neWtmOeahHVpZD1cIiArIHRoaXMuX3VpZCArIFwi77yM5pyN5Yqh5ZmoVUlEPVwiICsgdGhpcy5fc2VydmljZV91aWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdWlkID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3Zlck1pbmlWZXJzaW9uKFwiMTA0MFwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEudWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl91aWQgPSBcIlwiICsgcmVzLmRhdGEudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueZu+W9leaIkOWKnyEgdWlkPVwiICsgc2VsZi5fdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1VJRCwgc2VsZi5fdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55m75b2V5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b+r5ri45oiP5bmz5Y+w54mI5pys5L2O5LqOMTA0MO+8jOaXoOazleeZu+W9leWPllVJRO+8jOebtOaOpeiOt+WPluacjeWKoeWZqElEXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRMb2dpbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB5c3h5ID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuWVpfR0FNRV9ZU1hZKTtcclxuICAgICAgICAgICAgaWYgKHlzeHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERldmljZUlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+aYr+WQpuiOt+WPlmRldmljZUlkXHJcbiAgICBwcml2YXRlIGlzR2V0RGV2aWNlSWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBpbml0RGV2aWNlSWQoKTogdm9pZCB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIm9wcG8gaW5pdERldmljZUlkISAgI2lzR2V0RGV2aWNlSWQ9XCIgKyB0aGlzLmlzR2V0RGV2aWNlSWQpO1xyXG5cclxuICAgICAgICBsZXQgdG9kYXlJc0dldCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX0dFVF9ERVZJQ0VfSUQsIFwiMFwiKTtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBpZiAodGhpcy5pc0dldERldmljZUlkICYmIHFnLmdldERldmljZUlkICYmIHRvZGF5SXNHZXQgPT0gMCkge1xyXG4gICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9HRVRfREVWSUNFX0lELCBcIjFcIik7XHJcblxyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcWcuZ2V0RGV2aWNlSWQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGBnZXREZXZpY2VJZCBzdWNjZXNzOiBkZXZpY2VJZD0ke2RhdGEuZGV2aWNlSWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGV2aWNlX2lkID0gZGF0YS5kZXZpY2VJZDtcclxuICAgICAgICAgICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9ERVZJQ0VfSUQsIGRhdGEuZGV2aWNlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0RGV2aWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGBnZXREZXZpY2VJZCBmYWlsLCBjb2RlID0gJHtjb2RlfWApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXBvcnREZXZpY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlcG9ydExvZ2luID4+Pj4+Pj4+Pj4+XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVwb3J0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1JlcG9ydCA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fcmVwb3J0TG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDkuIrmiqXnmbvlvZXojrflj5ZVSUTlsI/kuo7vvJoke3RoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJtPWxvZ2luXCI7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZkZXZpY2VfZGF0YT0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNJbmZvKSl9YDtcclxuXHJcbiAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2VydmljZV91aWQgPSByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS6pOWPieaOqOW5v+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tb25kR2FtZUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8gJiYgdXRpbHMub3Bwb1Rvb2wgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1dGlscy5vcHBvVG9vbC5TZXJ2ZXJDb25maWcuanVtcF9saXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNc2cobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcWcuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBgJHttc2d9YCxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICAqIOW8ueWHuuaPkOekuuahhlxyXG4gICAgICAgKiBAcGFyYW0gbXNnIOa2iOaBr1xyXG4gICAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93VG9hc3QobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcWcuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBtc2csXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5LqS5o6o57uE5Lu25pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gb3RoZXJHYW1lQXBwSWQg6Lez6L2s55qESURcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDlvZPliY3kvY3nva5cclxuICAgICAqIEBwYXJhbSBzdGF0dXMgMDrngrnlh7vvvIwxOui3s+i9rOaIkOWKn1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdERhdGFCeUxvY2F0aW9uKG90aGVyR2FtZUFwcElkOiBzdHJpbmcsIGxvY2F0aW9uOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJqdW1wXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZqdW1wX2FwcF9pZD0ke290aGVyR2FtZUFwcElkfSZsb2NhdGlvbj0ke2xvY2F0aW9ufSZzdGF0dXM9JHtzdGF0dXN9YFxyXG4gICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwi5LiK5oql5pWw5o2uLCB1cmw9XCIgKyB1cmwpO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5pWw5o2u5LiK5oql5oiQ5YqfYCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmp1bXBfbGlzdCAmJiByZXN1bHQuanVtcF9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLmp1bXBfbGlzdCA9IHJlc3VsdC5qdW1wX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5LiK5oql5LqS5o6o57uE5Lu25pi+56S65L2N572uXHJcbiAgICAqIEBwYXJhbSBvdGhlckdhbWVBcHBJZCDot7PovaznmoRJRFxyXG4gICAgKiBAcGFyYW0gbG9jYXRpb24g5b2T5YmN5L2N572uXHJcbiAgICAqIEBwYXJhbSBzdGF0dXMgMDrngrnlh7vvvIwxOui3s+i9rOaIkOWKn1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBwb3N0UmVjb21tZW50U2hvd0RhdGEobG9jYXRpb246IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmp1bXBzaG93XCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsb2NhdGlvbj0ke2xvY2F0aW9ufWA7XHJcbiAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLkuIrmiqXmlbDmja4sIHVybD1cIiArIHVybCk7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmxldmVsdjNcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmxldmVsX2lkPSR7bGV2ZWx9JmxldmVsX25hbWU9JHtlbmNvZGVVUkkobGV2ZWxOYW1lKX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gYCZkZXZpY2VfZGF0YT0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNJbmZvKSl9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXQgfHwgc3RhdHVzICE9IExldmVsU3RhdHVzLkdhbWVTdGFydCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCAmJiBzdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE/mnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXV0aWxzLkRlYnVnTG9hY2FsQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nVmlldyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwi5byA5ZCv5LqG5pys5Zyw5pWw5o2u5rWL6K+V77yM5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBP5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE/mnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJsb2FkVGltZXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWQgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZCAyMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuYmFubmVySWQgPSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnNlcnRJZCA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnZpZGVvSWQgPSB0aGlzLlNlcnZlckNvbmZpZy52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZUluc2VydElkcyA9IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlQmFubmVySWRzID0gdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMgPSB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfdHJ5Z2FtZV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnJlY0dhbWVCYW5uZXJJZCA9IHRoaXMuU2VydmVyQ29uZmlnLnJlY19nYW1lX2Jhbm5lcl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcucmVjUG9ydGFsSWQgPSB0aGlzLlNlcnZlckNvbmZpZy5yZWNfcG9ydGFsX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5pbnRlcnNpdGlhbEFkQ29uZmlncyA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aWFsX2NvbmZpZ3MgfHwgdXRpbHMuY29uZmlnLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlncyA9IHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9jb25maWdzIHx8IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlncztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLm9wcG9jb25maWcubmF0aXZlQmFubmVySW5mb3MubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDljp/nlJ/lub/lkYrphY3nva46XCIgKyB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0ubG9jYXRpb24sIFwiPj4+PlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnNldE5hdGl2ZUJhbm5lckluZm8odGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9jb25maWdzW2ldLmxvY2F0aW9uLCB0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfYmFubmVyX2NvbmZpZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pSv5oyB5LqS5o6oXHJcbiAgICAgKi9cclxuICAgIGNhblNob3dSZWNvbW1lbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVyTWluaVZlcnNpb24oXCIxMDc2XCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pSv5oyB5paw55qE5LqS5o6oXHJcbiAgICAgKi9cclxuICAgIGNhblNob3dOZXdSZWNvbW1lbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVyTWluaVZlcnNpb24oXCIxMDkwXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlY19pc19iYW5uZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9yZWNfZ2FtZV9iYW5uZXI6IGFueSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWxleekuk9QUE/kupLmjqhiYW5uZXJcclxuICAgICAqL1xyXG4gICAgc2hvd09wcG9SZWNCYW5uZXIobG9jYXRpb24/OiBCYW5uZXJMb2NhdGlvbikge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvd1JlY29tbWVuZCgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3niYjmnKzkuI3mlK/mjIHmmL7npLrlrpjmlrnkupLmjqjvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5yZWNHYW1lQmFubmVySWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjX2lzX2Jhbm5lciA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWNfZ2FtZV9iYW5uZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU9wcG9SZWNCYW5uZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lciA9IHRoaXMucWcuY3JlYXRlR2FtZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5yZWNHYW1lQmFubmVySWRcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5Yqg6L295oiQ5YqfIScpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5fcmVjX2dhbWVfYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqGJhbm5lcuWxleekuuaIkOWKn++8gScpXHJcbiAgICAgICAgICAgIC8vIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5bGV56S65aSx6LSlOicgKyBlcnJvci5lcnJDb2RlICsgJywnICsgZXJyb3IuZXJyTXNnKVxyXG4gICAgICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfYmFubmVyLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5Yqg6L295byC5bi4IScsIGVyci5lcnJDb2RlICsgJywnICsgZXJyLmVyck1zZylcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlY0hpZGVOYXRpdmVBZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqGJhbm5lcuWxleekuuaIkOWKn++8gScpXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLkupLmjqhCYW5uZXLlsZXnpLrmiJDlip/vvIzkvY3nva7vvJpcIiArIGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkupLmjqhiYW5uZXLlsZXnpLrlpLHotKU6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOS6kuaOqGJhbm5lciBJROacqumFjee9ru+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JlY0hpZGVOYXRpdmVBZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWdcclxuICAgICAgICAgICAgJiYgdGhpcy5TZXJ2ZXJDb25maWcuc2hvd19yZWNfaGlkZV9uYXRpdmVfYWRcclxuICAgICAgICAgICAgJiYgdGhpcy5TZXJ2ZXJDb25maWcuc2hvd19yZWNfaGlkZV9uYXRpdmVfYWQgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkupLmjqjlsZXnpLrmiJDlip/kuYvlkI7kuI3miafooYzpmpDol4/ljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoMCk7XHJcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVTaW5nbGVOYXRpdmVBZCgpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLkupLmjqjlsZXnpLrmiJDlip/kuYvlkI7pmpDol4/ljp/nlJ/lub/lkYpcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICog5bGV56S6T1BQT+S6kuaOqGJhbm5lclxyXG4gICAgKi9cclxuICAgIHNob3dPcHBvTmV3UmVjQmFubmVyKHBhcmFtczogYW55ID0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvd05ld1JlY29tbWVuZCgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3niYjmnKzkuI3mlK/mjIHmmL7npLrlrpjmlrnmlrDkupLmjqhCYW5uZXLvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5jb25maWcub3Bwb2NvbmZpZy5yZWNHYW1lQmFubmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19pc19iYW5uZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY19nYW1lX2Jhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3Bwb1JlY0Jhbm5lcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHlsZTogYW55ID0ge307XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9IHBhcmFtcy5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuU3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9ICh0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGggLSAxNTUpIC0gKHBhcmFtcy5yaWdodCAvIGNjLndpblNpemUud2lkdGggKiB0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5ib3R0b20gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnRvcCA9ICh0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0IC0gNzIwKSAtIChwYXJhbXMuYm90dG9tIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudG9wID0gcGFyYW1zLnRvcCAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5TeXNJbmZvLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9IHBhcmFtcy5sZWZ0IC8gY2Mud2luU2l6ZS53aWR0aCAqIHRoaXMuU3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9ICh0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGggLSA3MjApIC0gKHBhcmFtcy5yaWdodCAvIGNjLndpblNpemUud2lkdGggKiB0aGlzLlN5c0luZm8uc2NyZWVuV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5ib3R0b20gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnRvcCA9ICh0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0IC0gMjAwKSAtIChwYXJhbXMuYm90dG9tIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS50b3AgPSBwYXJhbXMudG9wIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHlsZS5vcmllbnRhdGlvbiA9IHBhcmFtcy5vcmllbnRhdGlvbiA/IHBhcmFtcy5vcmllbnRhdGlvbiA6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwicmVjIGJhbm5lciBzdHlsZT4+Pj4+XCIsIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lciA9IHRoaXMucWcuY3JlYXRlR2FtZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcub3Bwb2NvbmZpZy5yZWNHYW1lQmFubmVySWQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5Yqg6L295oiQ5YqfIScpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5fcmVjX2dhbWVfYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqGJhbm5lcuWxleekuuaIkOWKn++8gScpXHJcbiAgICAgICAgICAgIC8vIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5bGV56S65aSx6LSlOicgKyBlcnJvci5lcnJDb2RlICsgJywnICsgZXJyb3IuZXJyTXNnKVxyXG4gICAgICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfYmFubmVyLm9uRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6oYmFubmVy5Yqg6L295byC5bi4IScsIGVyci5lcnJDb2RlICsgJywnICsgZXJyLmVyck1zZylcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlY0hpZGVOYXRpdmVBZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqGJhbm5lcuWxleekuuaIkOWKn++8gScpXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLkupLmjqhCYW5uZXLlsZXnpLrmiJDlip/vvIzkvY3nva7vvJpcIiArIGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkupLmjqhiYW5uZXLlsZXnpLrlpLHotKU6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJPUFBPIOS6kuaOqGJhbm5lciBJROacqumFjee9ru+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5LqS5o6oYmFubmVyXHJcbiAgICAgKi9cclxuICAgIGhpZGVPcHBvUmVjQmFubmVyKGNhbGxCYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVjX2dhbWVfYmFubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX2Jhbm5lci5kZXN0cm95KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygnT1BQTyDkupLmjqhiYW5uZXIg6ZqQ6JeP5oiQ5Yqf77yBJylcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdPUFBPIOS6kuaOqGJhbm5lciDpmpDol4/lpLHotKU6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9iYW5uZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVjX2dhbWVfcG9ydGFsOiBhbnkgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnpLpPUFBP5Lmd5a6r5qC8XHJcbiAgICAgKi9cclxuICAgIHNob3dPcHBvR2FtZVBvcnRhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvd1JlY29tbWVuZCgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3niYjmnKzkuI3mlK/mjIHmmL7npLrlrpjmlrnkupLmjqjvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF1dGlscy5hZE1hbmFnZXIuY2hlY2tTaG93QWRUaW1lKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuadoeaXtumXtOacqui+vumZkOWItu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnJlY1BvcnRhbElkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVjX2dhbWVfcG9ydGFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9wb3J0YWwgPSB0aGlzLnFnLmNyZWF0ZUdhbWVQb3J0YWxBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnJlY1BvcnRhbElkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfcG9ydGFsLmxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWNIaWRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkuZ3lrqvmoLzkupLmjqjliqDovb3miJDlip/vvIEnKVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfcG9ydGFsLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX3BvcnRhbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5Lmd5a6r5qC85LqS5o6o5Yqg6L295aSx6LSlOicgKyBlcnJvci5lcnJDb2RlICsgJywnICsgZXJyb3IuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9wb3J0YWwub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkupLmjqjnm5LlrZDkuZ3lrqvmoLzlub/lkYrliqDovb3miJDlip8nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX3BvcnRhbC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqOebkuWtkOS5neWuq+agvOW5v+WRii3mmL7npLrmiJDlip/vvIEnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9wb3J0YWwuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY19nYW1lX3BvcnRhbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S6kuaOqOebkuWtkOS5neWuq+agvOW5v+WRii3mmL7npLrlpLHotKU6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9wb3J0YWwub25DbG9zZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5LqS5o6o55uS5a2Q5Lmd5a6r5qC85bm/5ZGK5YWz6ZetJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9wb3J0YWwubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlY0hpZGVOYXRpdmVBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+S5neWuq+agvOS6kuaOqOWKoOi9veaIkOWKn++8gScpXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNfZ2FtZV9wb3J0YWwuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjX2dhbWVfcG9ydGFsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfkuZ3lrqvmoLzkupLmjqjliqDovb3lpLHotKU6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9QUE8g5LqS5o6o5Lmd5a6r5qC8IElE5pyq6YWN572u77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDkuIrmiqXoh6rlrprkuYnkuovku7ZcclxuICAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfZ2FtZURyYXdlckFkOiBhbnkgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrkupLmjqjnm5LlrZDlub/lkYpcclxuICAgICAqIEBwYXJhbSB0b3Ag6aG26YOo6Led56a7XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dHYW1lRHJhd2VyQWQocGFyYW1zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLm9wcG9jb25maWcucmVjR2FtZURyYXdlcklkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+acjeWKoeWZqOayoeaciemFjee9ruS6kuaOqOaKveWxieagt+W8j+eahElE77yM6K+35Y+N6aaI57uZ6L+Q6JCl77yBJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FuU2hvd05ld1JlY29tbWVuZCgpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2FtZURyYXdlckFkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVHYW1lRHJhd2VyQWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5ib3R0b20gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZS50b3AgPSAodGhpcy5TeXNJbmZvLnNjcmVlbkhlaWdodCAtIDQ5MCkgLSAocGFyYW1zLmJvdHRvbSAvIGNjLndpblNpemUuaGVpZ2h0ICogdGhpcy5TeXNJbmZvLnNjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZS50b3AgPSBwYXJhbXMudG9wIC8gY2Mud2luU2l6ZS5oZWlnaHQgKiB0aGlzLlN5c0luZm8uc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCIgcmVjIGdhbWUgZHJhd2VyIHN0eWxlID4+PlwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKVxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lRHJhd2VyQWQgPSB0aGlzLnFnLmNyZWF0ZUdhbWVEcmF3ZXJBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdXRpbHMuY29uZmlnLm9wcG9jb25maWcucmVjR2FtZURyYXdlcklkLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lRHJhd2VyQWQub25TaG93KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ3Nob3dHYW1lRHJhd2VyQWQgc3VjY2VzcycpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWNIaWRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZ2FtZURyYXdlckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ3Nob3dHYW1lRHJhd2VyQWQgc3VjY2VzcycpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWNIaWRlTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdzaG93R2FtZURyYXdlckFkIGZhaWwgd2l0aDonICsgZXJyb3IuZXJyQ29kZSArICcsJyArIGVycm9yLmVyck1zZylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKCflv6vlupTnlKjlubPlj7DniYjmnKzlj7fkvY7kuo4xMDkw77yM5pqC5LiN5pSv5oyB5LqS5o6o55uS5a2Q55u45YWzIEFQSScpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+aKveWxieebkuWtkFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZUdhbWVEcmF3ZXJBZChjYWxsQmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWVEcmF3ZXJBZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lRHJhd2VyQWQuZGVzdHJveSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2sgJiYgY2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ2hpZGVHYW1lRHJhd2VyQWQgc3VjY2VzcycpXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygnaGlkZUdhbWVEcmF3ZXJBZCBmYWlsIHdpdGg6JyArIGVycm9yLmVyckNvZGUgKyAnLCcgKyBlcnJvci5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lRHJhd2VyQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lRHJhd2VyQWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5Y+L55ufc2Rr5Yid5aeL5YyWICovXHJcbiAgICB1bWFJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1VtZW5nKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWPi+ebn0lE5pyq6YWN572u77yM5LiN5omn6KGM5Y+L55uf5Yid5aeL5YyWPj4+PlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdW1hLmluaXQoe1xyXG4gICAgICAgICAgICBhcHBLZXk6IHV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnVtZW5nSWQsXHJcbiAgICAgICAgICAgIHVzZU9wZW5pZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRlYnVnOiBDQ19ERUJVR1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAqIOWPi+ebn+a4uOaIj+W8gOWni+S4iuaKpVxyXG4gICAgICAgKiBAcGFyYW0gbGV2ZWxJRCBcclxuICAgICAgICovXHJcbiAgICBwdWJsaWMgdW1hT25TdGFydChsZXZlbElEOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVbWVuZygpKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcWcudW1hLnN0YWdlLm9uU3RhcnQoe1xyXG4gICAgICAgICAgICBzdGFnZUlkOiBsZXZlbElELC8v6K+l5a2X5q615ZCN56ew5LiN5Y+v5L+u5pS577yM5b+F5LygXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogYOesrCR7bGV2ZWxJRH3lhbNgLy8g5YWz5Y2haWRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKblvIDlkK/lj4vnm58gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tVbWVuZygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXV0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnVtZW5nSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+L55uf57uT566X5LiK5oqlXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxJRCDlhbPljaFpZFxyXG4gICAgICogQHBhcmFtIHN0YWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gZXZlbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bWFSZXBvcnRlZExldmVsKGxldmVsSUQ6IHN0cmluZywgZXZlbnQ6IExldmVsU3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxZy51bWEuc3RhZ2Uub25FbmQoe1xyXG4gICAgICAgICAgICBzdGFnZUlkOiBsZXZlbElELC8v6K+l5a2X5q615ZCN56ew5LiN5Y+v5L+u5pS577yM5b+F5LygXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogYOesrCR7bGV2ZWxJRH3lhbNgLFxyXG4gICAgICAgICAgICBldmVudDogZXZlbnRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPi+ebn+iHquWumuS5ieS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50SWQg5LqL5Lu2SUTvvIzms6jmhI/vvJrkuovku7ZJROW/hemhu+imgeWcqOWQjuWPsOmFjee9rlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyDkuovku7blhoXlrrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVtYVRyYWNrRXZlbnQoZXZlbnRJZDogc3RyaW5nLCBwYXJhbXM/KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxZy51bWEudHJhY2tFdmVudChldmVudElkLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICog6YCA5Ye65ri45oiPXHJcbiAgKi9cclxuICAgIHB1YmxpYyBHYW1lRXhpdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidG9vbCBvcHBvIEdhbWVFeGl0XCIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy5leGl0QXBwbGljYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLpgIDlh7rmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCA5Ye65aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLpgIDlh7rmiafooYzlrozmiJDvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJHYW1lRXhpdCBlcnJvOlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzUmVwb3J0RGV2aWNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHJlcG9ydERldmljZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlcG9ydERldmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzUmVwb3J0RGV2aWNlID0gdHJ1ZTtcclxuICAgICAgICBZb3VXYW5BbmFseXRpY3MubG9naW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0RGV2aWNlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIC8vIHhoci50aW1lb3V0ID0gNjAwMDsgICAgLy8g5Y2V5L2N5q+r56eSXHJcbiAgICAgICAgLy8geGhyLm9wZW4oJ1BPU1QnLCByZXF1ZXN0VXJsKTtcclxuICAgICAgICAvLyB4aHIuc2VuZChgZGF0YT0ke0pTT04uc3RyaW5naWZ5KGRhdGEpfWApO1xyXG4gICAgICAgIC8vIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLnirbmgIHmlLnlj5gsIHJlYWVkeVN0YXRlPVwiLCB4aHIucmVhZHlTdGF0ZSwgXCI7IHN0YXR1cz1cIiwgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgLy8gICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb2RlID09IDApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6K6+5aSHSUTmiJDlip8hID4+cmVzdWx0OlwiICsgeGhyLnJlc3BvbnNlVGV4dCArIFwiICN1aWQ9XCIgKyByZXN1bHQuZGF0YS51aWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1lPVVdBTl9VSUQsIHJlc3VsdC5kYXRhLnVpZCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6K6+5aSHSUTlpLHotKXvvIwjZXJybz1cIiArIGVycm9yKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaXNSZXBvcnREZXZpY2UgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6K6+5aSHSUTlpLHotKUhXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHhoci5vbnRpbWVvdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaXNSZXBvcnREZXZpY2UgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axgui2heaXtiFcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmlzUmVwb3J0RGV2aWNlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLlvILluLghXCIpO1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=