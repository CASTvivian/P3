"use strict";
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