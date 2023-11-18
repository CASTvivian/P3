
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30bc3m3g/hJ/5QMVAo/j0Cz', 'Utils');
// common-plugin/Scripts/Utils.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
var AdManager_1 = require("./AdManager");
var CommonConfig_1 = require("./CommonConfig");
var WechatTool_1 = require("./WechatTool");
var PlatUtils_1 = require("./PlatUtils");
var YZ_Tool_Oppo_1 = require("./YZ_Tool_Oppo");
var YZ_Tool_Baidu_1 = require("./YZ_Tool_Baidu");
var YZ_Tool_Native_1 = require("./YZ_Tool_Native");
var YZ_Tool_Vivo_1 = require("./YZ_Tool_Vivo");
var YZ_Tool_Douyin_1 = require("./YZ_Tool_Douyin");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_Tool_QQ_1 = require("./YZ_Tool_QQ");
var YZ_Tool_QTT_1 = require("./YZ_Tool_QTT");
var YZ_Tool_Xiaomi_1 = require("./YZ_Tool_Xiaomi");
var AldUtils_1 = require("./AldUtils");
var YZ_Tool_UC_1 = require("./YZ_Tool_UC");
var YZ_Tool_Cocosplay_1 = require("./YZ_Tool_Cocosplay");
var YZ_Tool_4399_1 = require("./YZ_Tool_4399");
var YZ_Tool_IOS_1 = require("./YZ_Tool_IOS");
var YZ_Tool_Bili_1 = require("./YZ_Tool_Bili");
var YZ_Tool_Kwai_1 = require("./YZ_Tool_Kwai");
var YZ_Tool_Broswer_1 = require("./YZ_Tool_Broswer");
var YZ_Tool_Wifi_1 = require("./YZ_Tool_Wifi");
var YZ_Tool_Hago_1 = require("./YZ_Tool_Hago");
var RedBagProgressWidget_1 = require("./RedBagProgressWidget");
var CompatibleTool_1 = require("./CompatibleTool");
var YZ_Tool_HuaWei_1 = require("./YZ_Tool_HuaWei");
var OpenRedBagPanel_1 = require("./OpenRedBagPanel");
var YZ_Tool_FaceBook_1 = require("./YZ_Tool_FaceBook");
var YzRealNameAuthPanel_1 = require("./YzRealNameAuthPanel");
var YzUserPrivacyPanel_1 = require("./YzUserPrivacyPanel");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var YZ_Tool_GoogleWeb_1 = require("./YZ_Tool_GoogleWeb");
//@ts-ignore
var CryptoJS = require("./Encrypt/CryptoJS");
var secretKey = "youzhixx12345678";
//@ts-ignore
// var uma = require('./UMengSDK/uma.js');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.utils = null;
var UTILSVERSION = "1.6.6";
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DebugLoacalConfig = false;
        _this.showLogView = false;
        _this.config = null;
        /**
         * 红包信息
         */
        _this.yzRedBagInfo = null;
        _this.adManager = null;
        _this._wechatTool = null;
        /**
         * 当前关卡
         */
        _this.currentLevel = 0;
        /**
         * 是否在录屏中
         */
        _this.isRecording = false;
        /**
         * 激励组件成功回调
         */
        _this.rewardCallFunc = null;
        /**
         * 激励组件关闭回调
         */
        _this.rewardCloseFunc = null;
        /**
         * 激励组件原始奖励
         */
        _this.rewardValue = 0;
        /**
         *
         * 幸运宝箱显示次数
         */
        _this.luckBoxShowCount = -1;
        /**
         * 原生插屏展示的次数
         */
        _this.nativeInsertShowCount = 0;
        /**
         *
         * 原生插屏满足关闭按钮设置大小条件后显示的次数，用来判断间隔多少次使用服务器大小
         */
        _this.nativeInsertResizeCloseBtnShowCount = 0;
        /**
         * 原生Banner展示的次数
         */
        _this.nativeBannerShowCount = 0;
        /**
         *
         * 原生banner满足关闭按钮设置大小条件后显示的次数，用来判断间隔多少次使用服务器大小
         */
        _this.nativeBannerResizeCloseBtnShowCount = 0;
        /**
         * 转盘抽奖关闭回调
         */
        _this.turnTablePanelCloseFunc = null;
        /**
         * 分享录屏组件关闭回调
         */
        _this.shareRecordPanelCloseFunc = null;
        /**
         *  宝箱关闭回调
         */
        _this.rewardBoxPanelCloseFunc = null;
        /**
         * 添加快捷桌面组件关闭回调
         */
        _this.rewardShortCutPanelCloseFunc = null;
        /**
        * 推荐游戏组件关闭回调
        */
        _this.rewardRecGamePanelCloseFunc = null;
        /**
         * 幸运宝箱组件关闭回调
         */
        _this.rewardLuckBoxPanelCloseFunc = null;
        //Banner广告关闭的时间
        _this._bannerCloseTime = 0;
        /**
         * 其他配置：包含分组的信息
         */
        _this._other_config = null;
        _this._oppoTool = null;
        _this._tool_Kwai = null;
        _this._tool_Wifi = null;
        _this._tool_Hago = null;
        _this._tool_Baidu = null;
        _this._tool_Native = null;
        _this._tool_Vivo = null;
        _this._tool_Douyin = null;
        _this._tool_QQ = null;
        _this._tool_XiaoMi = null;
        _this._tool_QTT = null;
        _this._tool_UC = null;
        _this._tool_Cocosplay = null;
        _this._tool_4399 = null;
        _this._tool_Ios = null;
        _this._tool_bili = null;
        _this._tool_Broswer = null;
        _this._tool_Huawei = null;
        _this._tool_Facebook = null;
        _this._tool_GoogleWeb = null;
        // 本地配置是否初始化
        _this._isConfigInit = false;
        // 服务器配置是否初始化
        _this._isServerInit = false;
        /**
         * 游戏进入时间
         */
        _this._gameEntryTime = 0;
        _this._isServerLoadSuccess = false;
        _this._recommendGamesBanner = null;
        _this._recommendGamesList = null;
        _this._tryGamesWidget = null;
        _this._moreGamesSidePanel = null;
        _this._moreGamesSidePanelBaidu = null;
        _this._recordWidget = null;
        _this._shortcutWidget = null;
        _this._gameBox = null;
        _this._nativeTryGameNode = null;
        _this.tryGameDate = [];
        _this.nativeNeedChange = true;
        _this._cur_tool = null;
        _this.serverShowLog = false;
        /**
         * 显示日志到控制台
         */
        _this.showLogToConsole = false;
        _this.overPageShowTime = 0;
        _this.overPageInsertAdIsTouch = false; // 结算页面的插屏广告是否被点击过
        /**
         * 分享成功次数
         */
        _this.recored_share_count = 0;
        _this.shareRecordPanel = null;
        _this._withdrawalWidget = null;
        _this._redBagProgressWidget = null;
        _this._withdrawalPanel = null;
        _this._openRedBagPanel = null;
        _this._rewardRedBagPanel = null;
        _this._rewardRedBagPanelShowCount = 0;
        _this._privacyWidget = null;
        _this._privacyPanel = null;
        _this.minScale = 1;
        _this.maxScale = 1.3;
        _this.runTime = 0.3;
        //原生广告最后上报时间
        _this._lastReportAdTime = 0;
        /**
         * 显示VIVO九宫格挂件
         * @param params
         * ```
         * {
         * top:number       // 距离屏幕顶部的距离
         * }
         * ```
         */
        _this._curVivoGamePortalLocation = "";
        _this._curGameDrawerAdLocation = "";
        _this._isRealNameAuth = false;
        _this._yzRealNameAuthPanel = null;
        _this._yzLoginPanel = null;
        return _this;
    }
    Object.defineProperty(Utils.prototype, "utilsVersion", {
        get: function () {
            return UTILSVERSION;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "wechatTool", {
        get: function () {
            if (!this._wechatTool) {
                exports.utils.showLog("wechat tool is null");
            }
            return this._wechatTool;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "oppoTool", {
        get: function () {
            if (!this._oppoTool) {
                exports.utils.showLog("oppo tool is null");
            }
            return this._oppoTool;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "kwaiTool", {
        get: function () {
            if (!this._tool_Kwai) {
                exports.utils.showLog("Kwai tool is null");
            }
            return this._tool_Kwai;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "wifiTool", {
        get: function () {
            if (!this._tool_Wifi) {
                exports.utils.showLog("Wifi tool is null");
            }
            return this._tool_Wifi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "hagoTool", {
        get: function () {
            if (!this._tool_Hago) {
                exports.utils.showLog("Hago tool is null");
            }
            return this._tool_Hago;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Baidu", {
        get: function () {
            if (!this._tool_Baidu) {
                exports.utils.showLog("tool baidu is null");
            }
            return this._tool_Baidu;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Native", {
        get: function () {
            if (!this._tool_Native) {
                exports.utils.showLog("tool native is null");
            }
            return this._tool_Native;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Vivo", {
        get: function () {
            if (!this._tool_Vivo) {
                exports.utils.showLog("tool vivo is null");
            }
            return this._tool_Vivo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Douyin", {
        get: function () {
            if (!this._tool_Douyin) {
                exports.utils.showLog("tool douyin is null");
            }
            return this._tool_Douyin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_QQ", {
        get: function () {
            if (!this._tool_QQ) {
                exports.utils.showLog("tool qq is null");
            }
            return this._tool_QQ;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_XiaoMi", {
        get: function () {
            if (!this._tool_XiaoMi) {
                exports.utils.showLog("tool xiaomi is null");
            }
            return this._tool_XiaoMi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_QTT", {
        get: function () {
            if (!this._tool_QTT) {
                exports.utils.showLog("tool qtt is null");
            }
            return this._tool_QTT;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_UC", {
        get: function () {
            if (!this._tool_UC) {
                exports.utils.showLog("tool uc is null");
            }
            return this._tool_UC;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Cocosplay", {
        get: function () {
            if (!this._tool_Cocosplay) {
                exports.utils.showLog("tool cocos is null");
            }
            return this._tool_Cocosplay;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_4399", {
        get: function () {
            if (!this._tool_4399) {
                exports.utils.showLog("tool 4399 is null");
            }
            return this._tool_4399;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_IOS", {
        get: function () {
            if (!this._tool_Ios) {
                exports.utils.showLog("tool ios is null");
            }
            return this._tool_Ios;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Bili", {
        get: function () {
            if (!this._tool_Ios) {
                exports.utils.showLog("tool ios is null");
            }
            return this._tool_bili;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Broswer", {
        get: function () {
            if (!this._tool_Broswer) {
                // cc.log("tool qtt is null");
            }
            return this._tool_Broswer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Huawei", {
        get: function () {
            if (!this._tool_Huawei) {
                exports.utils.showLog("huawei tool is null");
            }
            return this._tool_Huawei;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_Facebook", {
        get: function () {
            if (!this._tool_Facebook) {
                exports.utils.showLog("facebook tool is null");
            }
            return this._tool_Facebook;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "Tool_GoogleWeb", {
        get: function () {
            if (!this._tool_GoogleWeb) {
                exports.utils.showLog("googleWeb tool is null");
            }
            return this._tool_GoogleWeb;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化配置数据
     * @param data 配置数据
     */
    Utils.prototype._initConfig = function () {
        var _this = this;
        if (this._isConfigInit) {
            exports.utils.showLog("warn:" + "配置数据已经初始化，请勿重复初始化!");
            return;
        }
        if (this.config.otherconfig.localConfig) {
            var data = JSON.stringify(this.config.otherconfig.localConfig.json);
            exports.utils.showLog("本地数据：" + data);
            if (data) {
                if (PlatUtils_1.default.IsNativeAndroid) {
                    // 安卓需要先获取JNI，再取本地数据
                    this.initTools(data);
                    this._isConfigInit = this._initLoacalConfig(data);
                    if (this._isConfigInit) {
                        exports.utils.Tool_Native.init();
                    }
                }
                else {
                    this._isConfigInit = this._initLoacalConfig(data);
                    // 这个必须在广告组件之前初始化
                    this.initTools(data);
                }
                this._other_config = this.config.otherconfig.localConfig.json.other;
                this.adManager = new AdManager_1.default();
                this.adManager.Init();
                if (this._oppoTool) {
                    this._oppoTool.hideDefaultLoadingPage();
                }
                if (PlatUtils_1.default.IsKwai) {
                    //@ts-ignore
                    kwaigame.readyGo();
                }
                exports.utils.yzRedBagInfo = new CommonConfig_1.YzRedBagInfo();
                exports.utils.registerServerInitEvent(function () {
                    if (exports.utils.ServerConfig) {
                        _this.serverShowLog = _this.getConfigByKey("is_show_log_view") == "true";
                        _this.showLogToConsole = _this.getConfigByKey("show_log_to_console") == "true";
                        if (_this.getConfigByKey("red_bag_total_progress")) {
                            exports.utils.yzRedBagInfo.totalProgress = _this.getConfigByKey("red_bag_total_progress");
                        }
                        if (_this.getConfigByKey("red_bag_progress_infos")) {
                            exports.utils.yzRedBagInfo.progressInfos = _this.getConfigByKey("red_bag_progress_infos");
                        }
                        if (_this.getConfigByKey("red_bag_moneys")) {
                            exports.utils.yzRedBagInfo.withdrawaMoneys = _this.getConfigByKey("red_bag_moneys");
                        }
                    }
                    if (PlatUtils_1.default.IsHago) {
                        //@ts-ignore
                        hg.gameLoadResult && hg.gameLoadResult({ code: 0 });
                    }
                    // if (PlatUtils.IsHuaWei) {
                    //     utils.showMsg("华为小游戏要用华为单独的组件对接！！！！！！！！！")
                    // }
                }, this);
            }
            else {
                exports.utils.showLog("warn:" + "本地配置文件不是合法的json文件！");
            }
        }
        else {
            exports.utils.showLog("warn:" + "本地配置文件未找到，请检查 CommonUtils 组件上是否存在！");
        }
    };
    Utils.prototype._initLoacalConfig = function (data) {
        if (this.config) {
            return this.config.init(data);
        }
        else {
            return false;
        }
    };
    Utils.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        exports.utils = this;
        exports.utils.showLog("广告组件版本:" + this.utilsVersion);
        if (!CC_DEBUG) {
            // 正式包关闭此选项
            this.DebugLoacalConfig = false;
        }
        this._gameEntryTime = new Date().getTime();
        // 初始化本地配置
        this._initConfig();
    };
    Utils.prototype.update = function (dt) {
        if (this._isConfigInit) {
            if (this.adManager) {
                this.adManager.OnUpdate(dt);
            }
        }
    };
    Utils.prototype.initTools = function (data) {
        if (!this._isConfigInit && !PlatUtils_1.default.IsNativeAndroid) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        if (PlatUtils_1.default.IsNativeAndroid) {
            this._tool_Native = new YZ_Tool_Native_1.default();
            // this._tool_Native.init(data);
        }
        else if (PlatUtils_1.default.IsWechat) {
            this._wechatTool = new WechatTool_1.default();
            this._wechatTool.init(data);
        }
        else if (PlatUtils_1.default.IsOPPO) {
            this._oppoTool = new YZ_Tool_Oppo_1.default();
            this._oppoTool.init(data);
        }
        else if (PlatUtils_1.default.IsBaidu) {
            this._tool_Baidu = new YZ_Tool_Baidu_1.default();
            this._tool_Baidu.init(data);
        }
        else if (PlatUtils_1.default.IsVIVO) {
            this._tool_Vivo = new YZ_Tool_Vivo_1.default();
            this._tool_Vivo.init(data);
        }
        else if (PlatUtils_1.default.IsDouyin) {
            this._tool_Douyin = new YZ_Tool_Douyin_1.default();
            this._tool_Douyin.init(data);
        }
        else if (PlatUtils_1.default.IsQQ) {
            this._tool_QQ = new YZ_Tool_QQ_1.default();
            this._tool_QQ.init(data);
        }
        else if (PlatUtils_1.default.IsQTT) {
            this._tool_QTT = new YZ_Tool_QTT_1.default();
            this._tool_QTT.init(data);
        }
        else if (PlatUtils_1.default.IsXiaoMi) {
            this._tool_XiaoMi = new YZ_Tool_Xiaomi_1.default();
            this._tool_XiaoMi.init(data);
        }
        else if (PlatUtils_1.default.ISUC) {
            this._tool_UC = new YZ_Tool_UC_1.default();
            this._tool_UC.init(data);
        }
        else if (PlatUtils_1.default.ISCocos) {
            this._tool_Cocosplay = new YZ_Tool_Cocosplay_1.default();
            this._tool_Cocosplay.init(data);
        }
        else if (PlatUtils_1.default.Is4399) {
            this._tool_4399 = new YZ_Tool_4399_1.default();
            this._tool_4399.init(data);
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            this._tool_Ios = new YZ_Tool_IOS_1.default();
            this._tool_Ios.init(data);
        }
        else if (PlatUtils_1.default.IsBili) {
            this._tool_bili = new YZ_Tool_Bili_1.default();
            this._tool_bili.init(data);
        }
        else if (PlatUtils_1.default.IsKwai) {
            this._tool_Kwai = new YZ_Tool_Kwai_1.default();
            this._tool_Kwai.init(data);
        }
        else if (PlatUtils_1.default.IsWiFi) {
            this._tool_Wifi = new YZ_Tool_Wifi_1.default();
            this._tool_Wifi.init(data);
        }
        else if (PlatUtils_1.default.IsHago) {
            this._tool_Hago = new YZ_Tool_Hago_1.default();
            this._tool_Hago.init(data);
        }
        else if (PlatUtils_1.default.IsHuaWei) {
            this._tool_Huawei = new YZ_Tool_HuaWei_1.default();
            this._tool_Huawei.init(data);
        }
        else if (PlatUtils_1.default.IsFaceBook) {
            this._tool_Facebook = new YZ_Tool_FaceBook_1.default();
            this._tool_Facebook.init(data);
        }
        else if (PlatUtils_1.default.IsGoogleWeb) {
            this._tool_GoogleWeb = new YZ_Tool_GoogleWeb_1.default();
            this._tool_GoogleWeb.init(data);
        }
        else if (PlatUtils_1.default.IsTest) {
            this._tool_Broswer = new YZ_Tool_Broswer_1.default();
            this._tool_Broswer.init(data);
        }
    };
    /**
     * 延时调用函数
     * @param callback 回调函数
     * @param delay 延时时间
     */
    Utils.prototype.delayCall = function (callback, delay) {
        this.scheduleOnce(function () {
            if (callback) {
                callback();
            }
        }, delay);
    };
    /**
      *
      * @param callback Function<ret:boolean, msg:string> 分享回调
      */
    Utils.prototype.share = function (callback) {
        if (callback === void 0) { callback = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.share && this.cur_tool.share(callback);
    };
    /**
     * 注销游戏退出回调
     */
    Utils.prototype.gameExitOff = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        if (PlatUtils_1.default.IsNativeAndroid) {
            cc.systemEvent.targetOff(this);
        }
    };
    /**
     * 开始录屏
     */
    Utils.prototype.recordStart = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.recordStart && this.cur_tool.recordStart();
    };
    /**
     * 结束录屏
     */
    Utils.prototype.recordEnd = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.recordEnd && this.cur_tool.recordEnd();
    };
    /**
     * 获取分享信息
     */
    Utils.prototype.getShareInfo = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return null;
        }
        if (this.config.otherconfig.shareTitle && this.config.otherconfig.shareImgUrl) {
            return {
                title: this.config.otherconfig.shareTitle,
                imageUrl: this.config.otherconfig.shareImgUrl
            };
        }
        else {
            exports.utils.showLog("分享配置出错！");
            return null;
        }
    };
    /**
     * 获取游戏内交叉推广信息, 游戏内跳转组件使用
     * @returns object or null
     */
    Utils.prototype.getInnerRecommendData = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return null;
        }
        if (this.ServerConfig && this.ServerConfig.jump_list && this.ServerConfig.jump_list.length > 0) {
            return {
                "jump_refresh_time": this.ServerConfig.icon_jump,
                "jump_list": this.ServerConfig.jump_list
            };
        }
        return null;
    };
    /**
     * 跳转到其他小游戏
     * @param data
     * {                                                        // 交叉推广挂件内容信息
            "icon": "http://xcx.youletd.com/img/icon/fgdxc.png",
            "name": "翻滚的香肠大冒险",
            "path": "",
            "js_jump": "true",
            "qr_code": "http://xcx.youletd.com/img/qrcode/q_fgdxc.jpg",
            "appid": "wx2c4ed4218224b042"
        }
        @param callback Function(ret) 跳转回调
     */
    Utils.prototype.navigateToMiniGame = function (data, callback) {
        if (callback === void 0) { callback = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        if (PlatUtils_1.default.IsWechat) {
            if (data) {
                if (data.is_jump && data.is_jump == "true" && data.appid) {
                    this.wechatTool.navigateToMiniProgram(data.appid, callback, data.path);
                    return;
                }
                if (data.is_jump && data.is_jump == "false" && data.qr_code) {
                    this.wechatTool.previewImage(data.qr_code);
                    if (callback) {
                        callback(true);
                    }
                    return;
                }
            }
        }
        else if (PlatUtils_1.default.IsOPPO) {
            if (data && data.appid) {
                this.oppoTool.navigateToMiniGame(data.appid, callback);
            }
            else {
                exports.utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        }
        else if (PlatUtils_1.default.IsBaidu) {
            if (data && data.appid) {
                exports.utils.Tool_Baidu.navigateToMiniGame(data.appid, callback);
            }
            else {
                exports.utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            if (data) {
                exports.utils.Tool_Native.navigateToGame(JSON.stringify(data), callback);
            }
            else {
                exports.utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            if (data && data.appid) {
                this.Tool_IOS.navigateToGame(data.appid, callback);
            }
            else {
                exports.utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        }
    };
    /**
     * 当前版本是否支持跳转到其他小游戏
     */
    Utils.prototype.isSupportnavigateToMiniGame = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return false;
        }
        if (PlatUtils_1.default.IsWechat || PlatUtils_1.default.IsNativeAndroid || PlatUtils_1.default.IsNativeIOS || PlatUtils_1.default.IsBaidu) {
            return true;
        }
        else if (PlatUtils_1.default.IsOPPO) {
            return this.oppoTool.isOverMiniVersion("1044");
        }
        else if (PlatUtils_1.default.IsDouyin) {
            return this.Tool_Douyin.isShowMoreGamesModal() && this.Tool_Douyin._sysInfo.appName != "live_stream";
        }
        else if (PlatUtils_1.default.IsQQ) {
            return this._tool_QQ.isOverMinVersion("1.7.1");
        }
        return false;
    };
    /**
     * 显示消息提示
     * @param msg 消息提示
     */
    Utils.prototype.showMsg = function (msg) {
        if (exports.utils.Tool_Broswer) {
            console.log(msg);
            return;
        }
        this.cur_tool && this.cur_tool.showToast && this.cur_tool.showToast(msg);
    };
    /**
     * 是否已经创建过快捷方式
     */
    Utils.prototype.hasShortcutInstalled = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return true;
        }
        if (PlatUtils_1.default.IsVIVO && this.Tool_Vivo) {
            return this.Tool_Vivo.ShortcutCreated;
        }
        else if (PlatUtils_1.default.IsOPPO && this.oppoTool) {
            return this.oppoTool.ShortcutCreated;
        }
        return false;
    };
    /**
     * 是否可以创建桌面快捷方式,平台是否支持
     */
    Utils.prototype.canCreateShortcut = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return false;
        }
        if (this.cur_tool && this.cur_tool.canCreateShortcut) {
            return this.cur_tool.canCreateShortcut();
        }
        return false;
    };
    /**
     * 创建桌面快捷方式
     */
    Utils.prototype.createShortcut = function (callback) {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.createShortcut && this.cur_tool.createShortcut(callback);
    };
    /**
     * 通用http请求，只封装了GET请求
     * @param url 请求的url地址
     * @param callback Function(ret:boolean, data:string)
     * 请求结束回调，成功ret为true, data为返回的数据string。 失败为ret为false, data为空
     */
    Utils.prototype.commomHttpRequest = function (url, callback) {
        var _this = this;
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        var completeCallback = callback;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 6000; // 单位毫秒
        var requestUrl = this._buildServerUrl(url) + ("&time_stamp=" + (new Date()).getTime() + "&reqv=" + YZ_Constant_1.default.SERVER_VERSION);
        exports.utils.showLog("服务器地址:" + requestUrl);
        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = function () {
            exports.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        if (requestUrl.indexOf("m=g") > -1 || requestUrl.indexOf("m=rlevelv3") > -1) {
                            completeCallback(true, _this.aesDecrypt(xhr.responseText));
                        }
                        else {
                            completeCallback(true, xhr.responseText);
                        }
                    }
                }
                else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }
        };
        xhr.ontimeout = function () {
            exports.utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
        xhr.onerror = function (err) {
            exports.utils.showLog("请求出错! err=", JSON.stringify(err));
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
    };
    Utils.prototype.aesEncrypt = function (content) {
        var key = CryptoJS.enc.Utf8.parse(secretKey);
        var srcs = CryptoJS.enc.Utf8.parse(content);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    /**
     * 解密方法
     * @param encryptStr 密文
     * @returns {string} 明文
     */
    Utils.prototype.aesDecrypt = function (encryptStr) {
        var key = CryptoJS.enc.Utf8.parse(secretKey);
        var decrypt = CryptoJS.AES.decrypt(encryptStr, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    };
    /**
     * 增加常用字段
     */
    Utils.prototype._buildServerUrl = function (url) {
        // utils.showLog(" _buildServerUrl >>>>>.");
        if (PlatUtils_1.default.IsOPPO) {
            //@ts-ignore
            url = url + ("&kyx=true&app_id=" + exports.utils.config.oppoconfig.packageName + "&channel=oppo&device_uid=" + exports.utils.oppoTool.uid + "&uid=" + exports.utils.oppoTool.serviceId + "&source=" + this.oppoTool._source + "&game_version=" + exports.utils.config.oppoconfig.version + "&device_id=" + exports.utils.oppoTool._device_id);
        }
        else if (PlatUtils_1.default.IsXiaoMi) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.xiaomiConfig.appID + "&channel=xiaomi&device_uid=" + exports.utils._tool_XiaoMi.uid + "&uid=" + exports.utils._tool_XiaoMi.serviceId);
        }
        else if (PlatUtils_1.default.IsWechat) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.wechatconfig.appID + "&channel=wechat&device_uid=" + exports.utils.wechatTool.uid + "&uid=" + exports.utils.wechatTool.serviceId + "&source=" + this.wechatTool._source_app_id + "&soure_type=" + this.wechatTool._luanchType + "&game_version=" + exports.utils.config.wechatconfig.version);
        }
        else if (PlatUtils_1.default.IsVIVO) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.vivoconfig.appID + "&channel=vivo&device_uid=" + exports.utils._tool_Vivo.uid + "&uid=" + exports.utils._tool_Vivo.serviceId + "&source=" + this._tool_Vivo._source + "&game_version=" + exports.utils.config.vivoconfig.version);
        }
        else if (PlatUtils_1.default.IsQTT) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.qttconfig.appID + "&channel=qutoutiao&device_uid=" + exports.utils._tool_QTT.uid + "&uid=" + exports.utils._tool_QTT.serviceId);
        }
        else if (PlatUtils_1.default.IsDouyin) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.douyinconfig.appID + "&channel=toutiao&device_uid=" + exports.utils.Tool_Douyin.uid + "&uid=" + exports.utils.Tool_Douyin.serviceId + "&game_version=" + exports.utils.config.douyinconfig.version);
        }
        else if (PlatUtils_1.default.IsQQ) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.qqconfig.appID + "&channel=qq&device_uid=" + exports.utils._tool_QQ.uid + "&uid=" + exports.utils._tool_QQ.serviceId + "&game_version=" + exports.utils.config.qqconfig.version);
        }
        else if (PlatUtils_1.default.IsBaidu) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.baiduconfig.appID + "&channel=baidu&device_uid=" + exports.utils._tool_Baidu.uid + "&uid=" + exports.utils._tool_Baidu.serviceId + "&game_version=" + exports.utils.config.baiduconfig.version);
        }
        else if (PlatUtils_1.default.ISUC) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.ucConfig.appID + "&channel=uc&device_uid=" + exports.utils._tool_UC.uid + "&uid=" + exports.utils._tool_UC.serviceId + "&game_version=" + exports.utils.config.ucConfig.version);
        }
        else if (PlatUtils_1.default.ISCocos) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.cocosConfig.appID + "&channel=cocos&device_uid=" + exports.utils._tool_Cocosplay.uid + "&uid=" + exports.utils._tool_Cocosplay.serviceId);
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            url = url + ("&kyx=false&app_id=" + exports.utils.config.nativeAndroidConfig.appID + "&channel=" + exports.utils.config.nativeAndroidConfig.channel + "&device_uid=" + exports.utils.Tool_Native.uid + "&uid=" + exports.utils.Tool_Native.serviceId + "&game_type=2&game_version=" + exports.utils.config.nativeAndroidConfig.version);
        }
        else if (PlatUtils_1.default.IsKwai) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.kwaiConfig.appID + "&channel=kuaishou&device_uid=" + exports.utils._tool_Kwai.uid + "&uid=" + exports.utils._tool_Kwai.serviceId + "&game_version=" + exports.utils.config.kwaiConfig.version);
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            url = url + ("&kyx=false&app_id=" + exports.utils.config.nativeIoSConfig.appID + "&channel=ios&device_uid=" + exports.utils.Tool_IOS.uid + "&uid=" + exports.utils.Tool_IOS.serviceId + "&game_type=2&game_version=" + exports.utils.config.nativeIoSConfig.version);
        }
        else if (PlatUtils_1.default.IsWiFi) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.wifiConfig.appID + "&channel=wifi&device_uid=" + exports.utils._tool_Wifi.uid + "&uid=" + exports.utils._tool_Wifi.serviceId + "&game_version=" + exports.utils.config.wifiConfig.version);
        }
        else if (PlatUtils_1.default.IsHago) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.hagoConfig.appID + "&channel=hago&device_uid=" + exports.utils._tool_Hago.uid + "&uid=" + exports.utils._tool_Hago.serviceId + "&game_version=" + exports.utils.config.hagoConfig.version);
        }
        else if (PlatUtils_1.default.IsHuaWei) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.huaweiConfig.appID + "&channel=huawei&device_uid=" + exports.utils.Tool_Huawei.uid + "&uid=" + exports.utils.Tool_Huawei.serviceId + "&game_version=" + exports.utils.config.huaweiConfig.version);
        }
        else if (PlatUtils_1.default.IsFaceBook) {
            url = url + ("&kyx=true&app_id=" + exports.utils.config.faceBookConfig.appID + "&channel=facebookxyx&device_uid=" + exports.utils.Tool_Facebook.uid + "&uid=" + exports.utils.Tool_Facebook.serviceId + "&game_version=" + exports.utils.config.faceBookConfig.version);
        }
        return url;
    };
    /**
     * 上报小游戏跳转点击数据
     */
    Utils.prototype.postData = function (otherGameAppId) {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.postData && this.cur_tool.postData(otherGameAppId);
    };
    /**
     * 注册服务器初始化完成事件
     * @param callback
     * @param target
     */
    Utils.prototype.registerServerInitEvent = function (callback, target) {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        if (this._isServerInit) {
            if (callback) {
                callback();
            }
        }
        else {
            cc.game.on(YZ_Constant_1.default.EC_ServerInit, callback, target);
        }
    };
    /**
     * 注册服务器初始化完成事件
     * @param callback
     * @param target
     */
    Utils.prototype.registerServerDataLoadSuccessEvent = function (callback, target) {
        if (this._isServerLoadSuccess) {
            if (callback) {
                callback();
            }
        }
        else {
            cc.game.on(YZ_Constant_1.default.EC_ServerDataLoadSuccess, callback, target);
        }
    };
    /**
     * 注册隐私弹窗关闭事件
     * @param callback
     * @param target
     */
    Utils.prototype.registerPrivacyCloseEvent = function (callback, target) {
        var ysxy = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.YZ_GAME_YSXY);
        if (ysxy) {
            if (callback) {
                callback();
            }
        }
        else {
            cc.game.on(YZ_Constant_1.default.YZ_PrivacyClose, callback, target);
        }
    };
    /**
    * 上报互推组件数据
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    Utils.prototype.postDataByLocation = function (otherGameAppId, location, status) {
        if (status === void 0) { status = 0; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        if (PlatUtils_1.default.IsBaidu) {
            if (this.Tool_Baidu) {
                this.Tool_Baidu.postData(otherGameAppId);
            }
        }
        else {
            this.cur_tool && this.cur_tool.postDataByLocation && this.cur_tool.postDataByLocation(otherGameAppId, location, status);
        }
    };
    /**
  * 上报互推组件数据
  * @param otherGameAppId 跳转的ID
  * @param location 当前位置
  * @param status 0:点击，1:跳转成功
  */
    Utils.prototype.postRecommentShowData = function (location) {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.postRecommentShowData && this.cur_tool.postRecommentShowData(location);
    };
    /**
     * 注销服务器初始化完成事件
     * @param target
     */
    Utils.prototype.unregisterServerInitEvent = function (target) {
        cc.game.targetOff(target);
    };
    /**
     * 发送服务器初始化完毕事件
     */
    Utils.prototype.emitServerInitEvent = function () {
        // if (PlatUtils.IsTest) {
        //     this.getConfigByKey("is_privacy_panel = "true";
        // }
        var _this = this;
        if (this.isShowPrivacyPanel()) {
            this._isServerLoadSuccess = true;
            cc.game.emit(YZ_Constant_1.default.EC_ServerDataLoadSuccess);
            exports.utils.registerPrivacyCloseEvent(function () {
                _this._isServerInit = true;
                cc.game.emit(YZ_Constant_1.default.EC_ServerInit);
                cc.game.targetOff(YZ_Constant_1.default.EC_ServerDataLoadSuccess);
                cc.game.targetOff(YZ_Constant_1.default.YZ_PrivacyClose);
            }, this);
            return;
        }
        this._isServerInit = true;
        cc.game.emit(YZ_Constant_1.default.EC_ServerInit);
    };
    /**
   * 注册实名制认证关闭事件
   * @param callback
   * @param target
   */
    Utils.prototype.registerRealNameAuthCloseEvent = function (callback, target) {
        if (this._isServerLoadSuccess) {
            if (callback) {
                callback();
            }
        }
        else {
            cc.game.on(YZ_Constant_1.default.EC_RealNameAuthPanelClose, callback, target);
        }
    };
    Utils.prototype.emitRealNameAuthCloseEvent = function () {
        cc.game.emit(YZ_Constant_1.default.EC_RealNameAuthPanelClose);
    };
    /**
     * 发送隐私确认弹窗关闭事件
     */
    Utils.prototype.emitPrivacyCloseEvent = function () {
        this._isServerInit = true;
        cc.game.emit(YZ_Constant_1.default.YZ_PrivacyClose);
    };
    /**
     * 获取交叉推广数据
     */
    Utils.prototype.getRecommondGameList = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return null;
        }
        // if (this.cur_tool && this.cur_tool.getRecommondGameList) {
        //     return this.cur_tool.getRecommondGameList();
        // }
        if (PlatUtils_1.default.IsWechat) {
            return this.wechatTool.getRecommondGameList();
        }
        else if (PlatUtils_1.default.IsOPPO) {
            return this.oppoTool.getRecommondGameList();
        }
        else if (PlatUtils_1.default.IsBaidu) {
            return this.Tool_Baidu.getRecommondGameList();
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            return this.Tool_Native.getRecommondGameList();
        }
        else if (PlatUtils_1.default.IsDouyin) {
            return this.Tool_Douyin.getRecommondGameList();
        }
        else if (this.Tool_Broswer) {
            return this.Tool_Broswer.getRecommondGameList();
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            return this.Tool_IOS.getRecommondGameList();
        }
        return null;
    };
    /**
     * 是否显示底部更多游戏banner列表
     */
    Utils.prototype.isShowRecommondGamesBanner = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("本地数据未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (exports.utils.isSupportnavigateToMiniGame()) {
            if (this.ServerConfig
                && this.ServerConfig.is_bottom_banner_list) {
                if (this.ServerConfig.is_bottom_banner_list == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("is_bottom_banner_list 参数为false，底部更多游戏横幅组件不显示！");
                }
            }
            else {
                exports.utils.showLog("配置中没有 is_bottom_banner_list 参数，底部更多游戏横幅组件不显示！");
            }
        }
        else {
            exports.utils.showLog("当前平台不支持游戏内跳转，底部更多游戏横幅组件不显示！");
        }
        return false;
    };
    /**
     * 显示底部推荐游戏Banner
     * @param params
     * 参数是一个对象.
     * {
     * group:string  //组件所在的组。
     * scale:number  //组件的缩放值。
     * }
     */
    Utils.prototype.showRecommendGamesBanner = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.isShowRecommondGamesBanner()) {
            exports.utils.showLog("显示自定义banner!");
            if (this.config.otherconfig.recommendGamesBanner) {
                var bannerNode = cc.instantiate(this.config.otherconfig.recommendGamesBanner);
                if (bannerNode) {
                    if (this._recommendGamesBanner && cc.isValid(this._recommendGamesBanner)) {
                        this._recommendGamesBanner.destroy();
                    }
                    this._recommendGamesBanner = bannerNode;
                    this._recommendGamesBanner.zIndex = 9999;
                    if (params) {
                        if (params.group) {
                            bannerNode.group = params.group;
                        }
                        if (params.scale) {
                            bannerNode.scale = params.scale;
                        }
                    }
                    cc.director.getScene().addChild(bannerNode, 1000);
                    return true;
                }
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 RecommendGamesBanner, 请查看CommonUtils组件上是否赋值!");
            }
        }
        return false;
    };
    /**
     * 隐藏底部推荐游戏Banner
     */
    Utils.prototype.hideRecommendGamesBanner = function () {
        var banner = cc.find("RecommendGamesBanner");
        if (banner) {
            banner.active = false;
        }
    };
    /**
     * 是否显示推荐游戏列表
     */
    Utils.prototype.isShowRecommondGamesList = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (exports.utils.isSupportnavigateToMiniGame()) {
            if (this.ServerConfig.is_banner_list
                && this.ServerConfig.is_banner_list == "true"
                && this.ServerConfig.jump_list
                && this.ServerConfig.jump_list.length > 0) {
                return true;
            }
            else {
                exports.utils.showLog("请确认字段：is_banner_list、jump_list 是否达到显示自定义banner的要求!");
                return false;
            }
        }
        else {
            exports.utils.showLog("当前平台不支持游戏内跳转，更多游戏列表组件不显示！");
        }
        return false;
    };
    /**
     * 显示互推滚动条
     * @param params
     * ```
     * {
     * group:string     // 组件所在的组
     * bottom:number    // 组件距离屏幕下边的距离
     * left:number      // 组件距离屏幕左边的距离
     * scale:number     // 组件的缩放比例
     * parent:cc.Node   // 父节点,注意：如果不传此参数，则必须接收返回值，并将其加入到父节点中，否则组件不会显示。
     * }
     * ```
     */
    Utils.prototype.showRecommendGamesList = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (this.config.otherconfig.recommendGamesBar) {
            var barNode = cc.instantiate(this.config.otherconfig.recommendGamesBar);
            if (barNode) {
                if (this._recommendGamesList && cc.isValid(this._recommendGamesList)) {
                    this._recommendGamesList.destroy();
                }
                this._recommendGamesList = barNode;
                this._recommendGamesList.zIndex = 9999;
                var widget = barNode.getComponent(cc.Widget);
                if (params) {
                    if (params.group) {
                        barNode.group = params.group;
                    }
                    if (params.scale != null) {
                        barNode.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        barNode.parent = params.parent;
                    }
                }
                widget.updateAlignment();
                return barNode;
            }
        }
        else {
            exports.utils.showLog("warn:" + "未找到预制体 RecommendGamesBar, 请查看CommonUtils组件上是否赋值 !");
        }
        return null;
    };
    /**
    * 隐藏互推滚动条
    * @param _tryGamesWidget 更多游戏挂件
    */
    Utils.prototype.hideRecommendGamesList = function () {
        if (this._recommendGamesList && cc.isValid(this._recommendGamesList)) {
            this._recommendGamesList.destroy();
        }
    };
    /**
     * 是否显示试玩挂件
     */
    Utils.prototype.isShowTryGamesWidget = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (PlatUtils_1.default.IsWechat) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.wechatTool
                    && exports.utils.wechatTool.ServerConfig
                    && exports.utils.wechatTool.ServerConfig.icon_jump) {
                    if (exports.utils.wechatTool.ServerConfig.icon_jump > 0) {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsOPPO) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.oppoTool
                    && exports.utils.oppoTool.ServerConfig
                    && exports.utils.oppoTool.ServerConfig.icon_jump) {
                    if (parseInt(exports.utils.oppoTool.ServerConfig.icon_jump) > 0) {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "icon_jump参数为false，试玩戏挂件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsBaidu) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.Tool_Baidu
                    && exports.utils.Tool_Baidu.ServerConfig
                    && exports.utils.Tool_Baidu.ServerConfig.icon_jump) {
                    if (exports.utils.Tool_Baidu.ServerConfig.icon_jump > 0) {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "icon_jump参数为false，更多游戏挂件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            if (exports.utils.Tool_Native
                && exports.utils.Tool_Native.ServerConfig
                && exports.utils.Tool_Native.ServerConfig.icon_jump) {
                if (parseInt(exports.utils.Tool_Native.ServerConfig.icon_jump) > 0) {
                    return true;
                }
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有jumpList参数，试玩游戏挂件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsDouyin) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.Tool_Douyin && exports.utils.Tool_Douyin.isShowMoreGamesModal()
                    && exports.utils.Tool_Douyin.ServerConfig
                    && exports.utils.Tool_Douyin.ServerConfig.icon_jump) {
                    if (exports.utils.Tool_Douyin.ServerConfig.icon_jump > 0) {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsQQ) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.Tool_QQ
                    && exports.utils.Tool_QQ.ServerConfig
                    && exports.utils.Tool_QQ.ServerConfig.icon_jump) {
                    if (exports.utils.Tool_QQ.ServerConfig.icon_jump > 0) {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            if (exports.utils.Tool_IOS
                && exports.utils.Tool_IOS.ServerConfig
                && exports.utils.Tool_IOS.ServerConfig.icon_jump) {
                if (exports.utils.Tool_IOS.ServerConfig.icon_jump > 0) {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
            }
        }
        return false;
    };
    /**
     * 显示试玩挂件
     * @param params
     * ```
     * {
     * group:string
     * left:number
     * bottom:number
     * scale:number
     * parent:cc.Node
     * }
     * ```
     * @returns 生成的组件
     */
    Utils.prototype.showTryGamesWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (exports.utils.isShowTryGamesWidget()) {
            if (params.location && (this.getConfigByKey("try_game_widget_locations").indexOf(params.location) < 0)) {
                exports.utils.showLog("当前位置服务器未配置显示试玩挂件！");
                if (this._tryGamesWidget && cc.isValid(this._tryGamesWidget)) {
                    this._tryGamesWidget.destroy();
                }
                return null;
            }
            if (this.config.otherconfig.tryGamesWidget) {
                var node = cc.instantiate(this.config.otherconfig.tryGamesWidget);
                if (node) {
                    if (this._tryGamesWidget && cc.isValid(this._tryGamesWidget)) {
                        this._tryGamesWidget.destroy();
                    }
                    this._tryGamesWidget = node;
                    this._tryGamesWidget.zIndex = 9999;
                    var widget = node.getComponent(cc.Widget);
                    if (params) {
                        if (params.group) {
                            node.group = params.group;
                        }
                        if (params.scale != null) {
                            node.scale = params.scale;
                        }
                        if (params.top != null) {
                            widget.isAlignTop = true;
                            widget.isAlignBottom = false;
                            widget.top = params.top;
                        }
                        else if (params.bottom != null) {
                            widget.isAlignTop = false;
                            widget.isAlignBottom = true;
                            widget.bottom = params.bottom;
                        }
                        if (params.left != null) {
                            widget.isAlignLeft = true;
                            widget.isAlignRight = false;
                            widget.left = params.left;
                        }
                        else if (params.right != null) {
                            widget.isAlignLeft = false;
                            widget.isAlignRight = true;
                            widget.right = params.right;
                        }
                        if (params.parent != null) {
                            node.parent = params.parent;
                        }
                    }
                    widget.updateAlignment();
                    return node;
                }
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 TryGamesWidget, 请查看CommonUtils组件上是否赋值 !");
            }
        }
        else {
            exports.utils.showLog("warn:" + "不支持跳转组件");
        }
        return null;
    };
    /**
     * 隐藏更多游戏挂件
     * @param _tryGamesWidget 更多游戏挂件
     */
    Utils.prototype.hideTryGamesWidget = function () {
        if (this._tryGamesWidget && cc.isValid(this._tryGamesWidget)) {
            this._tryGamesWidget.destroy();
        }
    };
    /**
     * 是否显示更多游戏侧边栏
     */
    Utils.prototype.isShowMoreGamesWidget = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer || CC_DEBUG)
            return true;
        if (PlatUtils_1.default.IsWechat) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsOPPO) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    if (exports.utils.oppoTool.ServerConfig.show_oppo_rec == "true") {
                        if (!exports.utils.oppoTool.canShowRecommend()) {
                            exports.utils.showLog("warn:" + "当前平台不支持官方互推，更多游戏侧边栏组件不显示！");
                            return false;
                        }
                    }
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsDouyin) {
            if (PlatUtils_1.default.IsAndroid
                && exports.utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsBaidu) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsQQ) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.Is4399) {
            return true;
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            if (this.getConfigByKey("is_more_game") == "true") {
                return true;
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            if (this.getConfigByKey("is_more_game") == "true") {
                return true;
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsVIVO) {
            if (this.getConfigByKey("is_more_game") == "true") {
                return true;
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
            }
        }
        return false;
    };
    /**
     * 显示更多游戏侧边栏
     * @param params
     * ```
     * {
     * group:string    // 组件所在的组
     * left:number      // 组件距离屏幕左边的距离
     * right:number     // 组件距离屏幕右边的距离
     * top:number       // 距离屏幕顶部的距离
     * bottom:number    // 距离屏幕底部的距离
     * scale:number     // 缩放比例
     * parent:cc.Node   // 父节点
     * }
     * ```
     */
    Utils.prototype.showMoreGamesWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (params.location && (this.getConfigByKey("more_game_widget_locations").indexOf(params.location) < 0)) {
            exports.utils.showLog("当前位置服务器未配置显示更多游戏挂件！");
            if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                this._moreGamesSidePanel.destroy();
            }
            return null;
        }
        if (PlatUtils_1.default.IsDouyin) {
            if (exports.utils.Tool_Douyin) {
                if (exports.utils.isShowMoreGamesWidget()) {
                    if (exports.utils.Tool_Douyin.isShowMoreGamesModal()) {
                        if (this.config.otherconfig.moreGamesWidget) {
                            var node = cc.instantiate(this.config.otherconfig.moreGamesWidget);
                            if (node) {
                                if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                                    this._moreGamesSidePanel.destroy();
                                }
                                this._moreGamesSidePanel = node;
                                this._moreGamesSidePanel.zIndex = 9999;
                                var widget = node.getComponent(cc.Widget);
                                if (params) {
                                    if (params.group) {
                                        node.group = params.group;
                                    }
                                    if (params.scale != null) {
                                        node.scale = params.scale;
                                    }
                                    if (params.top != null) {
                                        widget.isAlignTop = true;
                                        widget.isAlignBottom = false;
                                        widget.top = params.top;
                                    }
                                    else if (params.bottom != null) {
                                        widget.isAlignTop = false;
                                        widget.isAlignBottom = true;
                                        widget.bottom = params.bottom;
                                    }
                                    if (params.left != null) {
                                        widget.isAlignLeft = true;
                                        widget.isAlignRight = false;
                                        widget.left = params.left;
                                    }
                                    else if (params.right != null) {
                                        widget.isAlignLeft = false;
                                        widget.isAlignRight = true;
                                        widget.right = params.right;
                                    }
                                    if (params.parent != null) {
                                        node.parent = params.parent;
                                    }
                                }
                                widget.updateAlignment();
                                return node;
                            }
                        }
                        else {
                            exports.utils.showLog("warn:" + "未找到预制体 MoreGamesWidget, 请查看CommonUtils组件上是否赋值！");
                        }
                    }
                    else {
                        var btn = exports.utils.Tool_Douyin.showMoreGamesButton(params);
                        if (btn) {
                            if (this._moreGamesSidePanel) {
                                this._moreGamesSidePanel.destroy();
                            }
                            this._moreGamesSidePanel = btn;
                            if (params) {
                                if (params.group) {
                                    btn.group = params.group;
                                }
                                if (params.parent != null) {
                                    btn.parent = params.parent;
                                }
                            }
                            return this._moreGamesSidePanel;
                        }
                        else {
                            return null;
                        }
                    }
                }
                else {
                    exports.utils.showLog("当前平台版本不支持交叉推广, 更多游戏按钮不显示!");
                    return null;
                }
            }
        }
        else {
            if (exports.utils.isShowMoreGamesWidget()) {
                if (this.config.otherconfig.moreGamesWidget) {
                    var node = cc.instantiate(this.config.otherconfig.moreGamesWidget);
                    if (node) {
                        if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                            this._moreGamesSidePanel.destroy();
                        }
                        this._moreGamesSidePanel = node;
                        this._moreGamesSidePanel.zIndex = 9999;
                        var widget = node.getComponent(cc.Widget);
                        if (params) {
                            if (params.group) {
                                node.group = params.group;
                            }
                            if (params.scale != null) {
                                node.scale = params.scale;
                            }
                            if (params.top != null) {
                                widget.isAlignTop = true;
                                widget.isAlignBottom = false;
                                widget.top = params.top;
                            }
                            else if (params.bottom != null) {
                                widget.isAlignTop = false;
                                widget.isAlignBottom = true;
                                widget.bottom = params.bottom;
                            }
                            if (params.left != null) {
                                widget.isAlignLeft = true;
                                widget.isAlignRight = false;
                                widget.left = params.left;
                            }
                            else if (params.right != null) {
                                widget.isAlignLeft = false;
                                widget.isAlignRight = true;
                                widget.right = params.right;
                            }
                            if (params.parent != null) {
                                node.parent = params.parent;
                            }
                        }
                        widget.updateAlignment();
                        return node;
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "未找到预制体 MoreGamesWidget, 请查看CommonUtils组件上是否赋值！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "不可显示更多游戏侧边栏");
            }
        }
        return null;
    };
    /**
     * 隐藏侧边栏按钮
     * @param moreGameBtn 更多游戏侧边栏按钮
     */
    Utils.prototype.hideMoreGamesWidget = function (moreGameBtn) {
        if (PlatUtils_1.default.IsDouyin) {
            if (moreGameBtn && cc.isValid(moreGameBtn)) {
                moreGameBtn.destroy();
            }
            if (this._moreGamesSidePanel) {
                this._moreGamesSidePanel.destroy();
            }
        }
        else {
            if (moreGameBtn && cc.isValid(moreGameBtn)) {
                moreGameBtn.destroy();
            }
            if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                this._moreGamesSidePanel.destroy();
            }
        }
        if (PlatUtils_1.default.IsVIVO) {
            this.Tool_Vivo && this.Tool_Vivo.hideGamePortal();
        }
    };
    Utils.prototype.showBaiduMoreGamesBtn = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        var isShow = false;
        if (PlatUtils_1.default.IsBaidu) {
            if (exports.utils.Tool_Baidu
                && exports.utils.Tool_Baidu.canShowRecommendButton()) {
                isShow = true;
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，百度更多游戏侧边栏组件不显示！");
            }
        }
        if (PlatUtils_1.default.IsBaidu) {
            if (exports.utils.Tool_Baidu) {
                if (isShow) {
                    var btn = exports.utils.Tool_Baidu.showRecommendationButton(params);
                    if (btn) {
                        if (this._moreGamesSidePanelBaidu) {
                            this._moreGamesSidePanelBaidu.destroy();
                        }
                        this._moreGamesSidePanelBaidu = btn;
                        return this._moreGamesSidePanelBaidu;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    exports.utils.showLog("当前平台版本不支持交叉推广, 百度更多游戏按钮不显示!");
                    return null;
                }
            }
        }
    };
    Utils.prototype.hideBaiduMoreGamesBtn = function (moreGameBtn) {
        if (PlatUtils_1.default.IsBaidu && moreGameBtn) {
            if (moreGameBtn != null) {
                moreGameBtn.destroy();
            }
        }
    };
    /**
     * 是否显示录屏组件
     */
    Utils.prototype.isShowRecordWidget = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (PlatUtils_1.default.IsDouyin) {
            if (this.getConfigByKey("show_record") == "true") {
                return true;
            }
            exports.utils.showLog("服务器配置不显示录屏按钮！");
        }
        else if (PlatUtils_1.default.IsKwai) {
            if (exports.utils.kwaiTool && exports.utils.kwaiTool.checkCanShowRecored() && this.getConfigByKey("show_record") == "true") {
                return true;
            }
            exports.utils.showLog("服务器配置不显示录屏按钮！");
        }
        return false;
    };
    Utils.prototype.hideRecordWidget = function () {
        if (this._recordWidget && cc.isValid(this._recordWidget)) {
            this._recordWidget.destroy();
        }
    };
    /**
     * 显示录屏按钮
     * @param params
     */
    Utils.prototype.showRecordWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.isShowRecordWidget())
            return null;
        if (this.config.otherconfig.recordWidget) {
            var node = cc.instantiate(this.config.otherconfig.recordWidget);
            if (node) {
                if (this._recordWidget && cc.isValid(this._recordWidget)) {
                    this._recordWidget.destroy();
                }
                this._recordWidget = node;
                this._recordWidget.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                if (params) {
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                }
                widget.updateAlignment();
                return node;
            }
        }
        else {
            exports.utils.showLog("warn:" + "未找到预制体 RecordWidget, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
     * 是否显示创建快捷方式控件
     */
    Utils.prototype.isShowCreateShortcutWidget = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (this.canCreateShortcut()) {
            if (this.getConfigByKey("is_desktop") == "true") {
                return true;
            }
            else {
                exports.utils.showLog("配置数据中没有 is_desktop 字段， 创建快捷方式按钮不显示!");
            }
        }
        else {
            exports.utils.showLog("当前平台版本不支持创建桌面快捷方式, 创建快捷方式按钮不显示！");
        }
        return false;
    };
    /**
     * 创建快捷方式
     * @param callback 点击创建快捷方式按钮后回调函数 Function<ret:boolean>
     * @param params
     */
    Utils.prototype.showCreateShortcutWidget = function (callback, params) {
        if (callback === void 0) { callback = null; }
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (exports.utils.isShowCreateShortcutWidget()) {
            if (this.config.otherconfig.shortcutWidget) {
                var node = cc.instantiate(this.config.otherconfig.shortcutWidget);
                if (node) {
                    if (this._shortcutWidget && cc.isValid(this._shortcutWidget)) {
                        this._shortcutWidget.destroy();
                    }
                    this._shortcutWidget = node;
                    this._shortcutWidget.zIndex = 9999;
                    var widget = node.getComponent(cc.Widget);
                    var shortcutWidget = node.getComponent("YZ_ShortcutWidget");
                    if (shortcutWidget) {
                        shortcutWidget.Callback = callback;
                    }
                    if (params) {
                        if (params.group) {
                            node.group = params.group;
                        }
                        if (params.scale != null) {
                            node.scale = params.scale;
                        }
                        if (params.top != null) {
                            widget.isAlignTop = true;
                            widget.isAlignBottom = false;
                            widget.top = params.top;
                        }
                        else if (params.bottom != null) {
                            widget.isAlignTop = false;
                            widget.isAlignBottom = true;
                            widget.bottom = params.bottom;
                        }
                        if (params.left != null) {
                            widget.isAlignLeft = true;
                            widget.isAlignRight = false;
                            widget.left = params.left;
                        }
                        else if (params.right != null) {
                            widget.isAlignLeft = false;
                            widget.isAlignRight = true;
                            widget.right = params.right;
                        }
                        if (params.parent != null) {
                            node.parent = params.parent;
                        }
                        else {
                            cc.director.getScene().addChild(node, 1000);
                        }
                    }
                    widget.updateAlignment();
                    return node;
                }
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 ShortcutWidge, 请查看CommonUtils组件上是否赋值！");
            }
        }
        else {
            exports.utils.showLog("warn:" + "不显示创建桌面图标");
        }
        return null;
    };
    /**
     * 隐藏快捷方式
     */
    Utils.prototype.hideCreateShortcutWidget = function (params) {
        if (params === void 0) { params = null; }
        if (this._shortcutWidget && cc.isValid(this._shortcutWidget)) {
            this._shortcutWidget.destroy();
        }
    };
    /**
     * 注册事件,事件在YZ_Constant类中定义
     * @param eventName : string 事件名 事件在 YZ_Constant 类中定义
     * @param callback 回调函数
     * @param target : cc.Node 目标对象
     */
    Utils.prototype.registerEvent = function (eventName, callback, target) {
        if (!eventName) {
            exports.utils.showLog("warn:" + "[Utils.registerEvent] param eventName is null!");
            return;
        }
        if (!callback) {
            exports.utils.showLog("warn:" + "[Utils.registerEvent] param callback is null!");
            return;
        }
        if (!target) {
            exports.utils.showLog("warn:" + "[Utils.registerEvent] param target is null!");
            return;
        }
        cc.game.on(eventName, callback, target);
    };
    /**
     * 取消注册事件
     * @param eventName 事件名
     */
    Utils.prototype.unregisterEvent = function (eventName) {
        cc.game.off(eventName);
    };
    /**
     * 发送事件
     * @param eventName 事件名
     */
    Utils.prototype.emitCommonEvent = function (eventName) {
        cc.game.emit(eventName);
    };
    /**
    * 显示游戏盒子
    * @param params
    */
    Utils.prototype.showGameBox = function (params) {
        if (params === void 0) { params = null; }
        if (PlatUtils_1.default.IsWechat) {
            var isShow = false;
            // console.log("utils.wechatTool.ServerConfig.openBox",utils.wechatTool.ServerConfig.openBox)
            if (exports.utils.wechatTool.ServerConfig && exports.utils.wechatTool.ServerConfig.openBox) {
                if (exports.utils.wechatTool.ServerConfig.openBox != "true") {
                    exports.utils.showLog("服务器游戏盒子配置为关闭状态！");
                    return;
                }
                exports.utils.showLog("服务器配置游戏盒子为打开状态");
                isShow = true;
            }
            else {
                var showTime = new Date().getTime() - new Date("2019-10-23").getTime();
                if (showTime > 0) {
                    isShow = true;
                    exports.utils.showLog("当前时间大于指定时间，可以显示游戏盒子");
                }
            }
            if (!isShow) {
                exports.utils.showLog("warn:" + "当前条件不满足要求，游戏盒子不显示！");
                return;
            }
            var node = cc.instantiate(this.config.otherconfig.gameBox);
            if (node) {
                if (this._gameBox && cc.isValid(this._gameBox)) {
                    this._gameBox.destroy();
                }
                this._gameBox = node;
                this._gameBox.zIndex = 9999;
                if (params.parent != null) {
                    node.parent = params.parent;
                }
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 GameBox, 请查看CommonUtils组件上是否赋值！");
            }
        }
    };
    Utils.prototype.isShowNativeTryGamesWidget = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (this.ServerConfig
            && this.ServerConfig.icon_jump_native
            && parseInt(this.ServerConfig.icon_jump_native) > 0) {
            return true;
        }
        else {
            exports.utils.showLog("warn:" + "配置中没有icon_jump_native参数，原生试玩游戏挂件不显示！");
        }
        return false;
    };
    /**
    * 是否能显示6个元素的交叉推广组件
    */
    Utils.prototype.canShowCrossWidget6 = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (PlatUtils_1.default.IsWechat || PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsBaidu || PlatUtils_1.default.IsNativeAndroid || PlatUtils_1.default.IsNativeIOS) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_cross_game") == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_cross_game参数，6元素交叉推广组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsDouyin) {
            if (exports.utils.isSupportnavigateToMiniGame() && exports.utils.Tool_Douyin.isShowMoreGamesModal()) {
                if (this.getConfigByKey("is_cross_game") == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "is_cross_game参数为false，6元素交叉推广组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
            }
        }
        return false;
    };
    /**
     * 显示6元素交叉推广组件
     */
    Utils.prototype.showCrossWidget6 = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (this.canShowCrossWidget6()) {
            if (this.config.otherconfig.crossWidget6) {
                return cc.instantiate(this.config.otherconfig.crossWidget6);
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 CrossWidget6, 请查看CommonUtils组件上是否赋值！");
            }
        }
        return null;
    };
    /**
     * 显示添加到我的小程序引导
     * @param param 参数值：
     *              type： bar（一直展示）/tip（3秒展示）
     */
    Utils.prototype.showFavoriteGuide = function (param) {
        if (PlatUtils_1.default.IsBaidu) {
            if (exports.utils._tool_Baidu.canShowFavoriteGuide()) {
                //@ts-ignore
                swan.showFavoriteGuide({
                    type: param ? param.type : 'tip',
                    content: '一键添加到我的小程序',
                    success: function (res) {
                        exports.utils.showLog('添加成功：', res);
                    },
                    fail: function (err) {
                        exports.utils.showLog('添加失败：', err);
                    }
                });
                exports.utils.showLog("显示我的小程序引导成功！");
            }
            else {
                exports.utils.showLog("当前平台不支持显示添加我的小程序引导");
            }
        }
    };
    /**
     * 验证是否自动弹出签到
     * true : 自动弹出，false : 不自动弹出
     */
    Utils.prototype.checkAutoSign = function () {
        if (this.getConfigByKey("auto_sign") == "true") {
            return true;
        }
        return false;
    };
    Object.defineProperty(Utils.prototype, "ServerConfig", {
        /**
         * 获取当前平台的配置文件
         */
        get: function () {
            if (this.cur_tool) {
                return this.cur_tool.ServerConfig ? this.cur_tool.ServerConfig : {};
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "cur_tool", {
        /**
         * 获取当前平台的配置文件
         */
        get: function () {
            if (this._cur_tool)
                return this._cur_tool;
            if (PlatUtils_1.default.IsWechat) {
                this._cur_tool = exports.utils.wechatTool;
            }
            else if (PlatUtils_1.default.IsOPPO) {
                this._cur_tool = exports.utils.oppoTool;
            }
            else if (PlatUtils_1.default.IsVIVO) {
                this._cur_tool = exports.utils.Tool_Vivo;
            }
            else if (PlatUtils_1.default.IsQQ) {
                this._cur_tool = exports.utils.Tool_QQ;
            }
            else if (PlatUtils_1.default.IsDouyin) {
                this._cur_tool = exports.utils.Tool_Douyin;
            }
            else if (PlatUtils_1.default.IsBaidu) {
                this._cur_tool = exports.utils.Tool_Baidu;
            }
            else if (PlatUtils_1.default.IsQTT) {
                this._cur_tool = exports.utils.Tool_QTT;
            }
            else if (PlatUtils_1.default.IsXiaoMi) {
                this._cur_tool = exports.utils.Tool_XiaoMi;
            }
            else if (PlatUtils_1.default.ISUC) {
                this._cur_tool = exports.utils.Tool_UC;
            }
            else if (PlatUtils_1.default.ISCocos) {
                this._cur_tool = exports.utils.Tool_Cocosplay;
            }
            else if (PlatUtils_1.default.IsNativeAndroid) {
                this._cur_tool = exports.utils.Tool_Native;
            }
            else if (PlatUtils_1.default.Is4399) {
                this._cur_tool = exports.utils.Tool_4399;
            }
            else if (PlatUtils_1.default.IsKwai) {
                this._cur_tool = exports.utils._tool_Kwai;
            }
            else if (PlatUtils_1.default.IsNativeIOS) {
                this._cur_tool = exports.utils.Tool_IOS;
            }
            else if (PlatUtils_1.default.IsWiFi) {
                this._cur_tool = exports.utils._tool_Wifi;
            }
            else if (PlatUtils_1.default.IsHago) {
                this._cur_tool = exports.utils._tool_Hago;
            }
            else if (PlatUtils_1.default.IsHuaWei) {
                this._cur_tool = exports.utils.Tool_Huawei;
            }
            else if (PlatUtils_1.default.IsFaceBook) {
                this._cur_tool = exports.utils.Tool_Facebook;
            }
            else if (PlatUtils_1.default.IsGoogleWeb) {
                this._cur_tool = exports.utils.Tool_Facebook;
            }
            else {
                this._cur_tool = exports.utils._tool_Broswer;
            }
            return this._cur_tool;
        },
        enumerable: false,
        configurable: true
    });
    Utils.prototype.showLog = function (msg) {
        var _a;
        if (msg === void 0) { msg = ""; }
        var any = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            any[_i - 1] = arguments[_i];
        }
        // if (true) {
        //     console.log(msg, ...any);
        //     return;
        // }
        if (this.showLogView || this.serverShowLog) {
            if (this.config.otherconfig.logoutView) {
                if (cc.director.getScene()) {
                    var logooutView = cc.director.getScene().getChildByName("LogoutView");
                    if (!logooutView) {
                        logooutView = cc.instantiate(this.config.otherconfig.logoutView);
                        cc.director.getScene().addChild(logooutView, 1000);
                    }
                    (_a = logooutView.getComponent("LogOutView")).addLog.apply(_a, __spreadArrays([msg], any));
                }
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 LogOutView, 请查看CommonUtils组件上是否赋值！");
            }
        }
        else {
            if (this.showLogToConsole) {
                console.log.apply(console, __spreadArrays([msg], any));
            }
            else {
                cc.log.apply(cc, __spreadArrays([msg], any));
            }
        }
    };
    /**
     * 屏幕震动功能
     * @param type 震动类型 传递枚举：VibrateType
     */
    Utils.prototype.vibrate = function (type) {
        if (type === void 0) { type = YZ_Constant_1.VibrateType.Short; }
        if (PlatUtils_1.default.IsWechat) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                //使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
                wx.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                wx.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsOPPO) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                qg.vibrateShort({ success: function (res) { }, fail: function (res) { } }); //（20 ms）
            }
            else {
                //@ts-ignore
                qg.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsVIVO) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                qg.vibrateShort(); //（15 ms）
            }
            else {
                //@ts-ignore
                qg.vibrateLong(); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsQQ) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                qq.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                qq.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsDouyin) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                tt.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                tt.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsBaidu) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                swan.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                swan.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsWiFi) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                wuji.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                wuji.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            if (type == YZ_Constant_1.VibrateType.Short) {
                //@ts-ignore
                jsb.reflection.callStaticMethod(exports.utils.Tool_Native.jniClassName, "vibrateShort", "()V");
            }
            else {
                //@ts-ignore
                jsb.reflection.callStaticMethod(exports.utils.Tool_Native.jniClassName, "vibrateLong", "()V");
            }
        }
    };
    /**
     * 游戏开始上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    Utils.prototype.StartGame = function (level, model) {
        AldUtils_1.default.StartGame(level, model);
        exports.utils.cur_tool && exports.utils.cur_tool.umaOnStart && exports.utils.cur_tool.umaOnStart(level);
        if (PlatUtils_1.default.IsDouyin || PlatUtils_1.default.IsKwai) {
            this.AutoStartRecord(level);
        }
    };
    /**
    * 游戏胜利上报,显示结算广告
    * @param level 当前关卡
    * @param star 获得星星： 默认为0
    * @param model 当前模式： 没有则省略
    * @param isShowAd 是否调用广告，默认开启调用
    * @returns json{ type:(1:6元素互推、2:单个原生广告),node:节点}
    *
    */
    Utils.prototype.GameWin = function (level, star, model, isShowAd) {
        if (star === void 0) { star = 0; }
        if (isShowAd === void 0) { isShowAd = true; }
        AldUtils_1.default.GameWin(level, star, model);
        exports.utils.cur_tool && exports.utils.cur_tool.umaReportedLevel && exports.utils.cur_tool.umaReportedLevel(level, YZ_Constant_1.LevelStatus.GameWin);
        if (PlatUtils_1.default.IsKwai) {
            exports.utils.kwaiTool.isClickEnd = false;
        }
        // if (PlatUtils.IsDouyin || PlatUtils.IsKwai) {
        this.recordEnd();
        // }
        return this.AutoShowStatement(level, true, isShowAd);
    };
    /**
    * 游戏失败上报,显示结算广告
    * @param level 当前关卡
    * @param model 当前模式： 没有则省略
    * @param isShowAd 是否调用广告，默认开启调用
    * @returns json{ type:(1:6元素互推、2:单个原生广告),node:节点}
    */
    Utils.prototype.GameFail = function (level, model, isShowAd) {
        if (isShowAd === void 0) { isShowAd = true; }
        AldUtils_1.default.GameFail(level, model);
        exports.utils.cur_tool && exports.utils.cur_tool.umaReportedLevel && exports.utils.cur_tool.umaReportedLevel(level, YZ_Constant_1.LevelStatus.GameFail);
        // if (PlatUtils.IsDouyin || PlatUtils.IsKwai) {
        this.recordEnd();
        // }
        return this.AutoShowStatement(level, false, isShowAd);
    };
    /**
     * 跳过关卡上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    Utils.prototype.GameSkip = function (level, model) {
        AldUtils_1.default.GameSkip(level, model);
    };
    /**
     * 事件上报
     * @param eventName 事件名称
     */
    Utils.prototype.SendEvent = function (eventName) {
        AldUtils_1.default.SendEvent(eventName);
    };
    /**
     * 友盟自定义事件上报
     * @param eventID 事件ID
     * @param params   事件内容 Type: obj
     */
    Utils.prototype.umaEvent = function (eventID, params) {
        exports.utils.showLog("\u4E8B\u4EF6\u4E0A\u62A5:" + eventID + "\uFF1A" + params);
        if (PlatUtils_1.default.IsNativeAndroid) {
            exports.utils.cur_tool && exports.utils.cur_tool.umaTrackEvent && exports.utils.cur_tool.umaTrackEvent("custom", eventID, params);
        }
        else {
            exports.utils.cur_tool && exports.utils.cur_tool.umaTrackEvent && exports.utils.cur_tool.umaTrackEvent(eventID, params);
        }
    };
    Utils.prototype.reportOverPageTouchEvent = function (overPage) {
        var _this = this;
        exports.utils.showLog("reportOverPageTouchEvent >>>>>>>");
        this.overPageInsertAdIsTouch = false;
        this.overPageShowTime = new Date().getTime();
        var node = new cc.Node();
        node.width = overPage.width * 2;
        node.height = overPage.height * 2;
        node.on(cc.Node.EventType.TOUCH_START, function () {
            var time = (new Date().getTime() - _this.overPageShowTime) / 1000;
            var json = {};
            json.data = time;
            exports.utils.SendEventNew("\u7ED3\u7B97\u9875\u9762\u70B9\u51FB\u65F6\u95F4", "overPageTouch", JSON.stringify(json));
            node.destroy();
            node.removeFromParent();
        }, overPage);
        node['_touchListener']['swallowTouches'] = false;
        overPage.addChild(node, cc.macro.MAX_ZINDEX);
    };
    /**
     * 自定义事件上报
     * @param eventName 事件名称
     */
    Utils.prototype.SendEventNew = function (eventName, eventId, eventData, isCallBack) {
        if (eventId === void 0) { eventId = "default"; }
        if (isCallBack === void 0) { isCallBack = true; }
        exports.utils.showLog("\u81EA\u5B9A\u4E49\u4E8B\u4EF6\u4E0A\u62A5:" + eventName + "\uFF0C" + eventId + "," + eventData);
        exports.utils.cur_tool && exports.utils.cur_tool.SendEventNew && exports.utils.cur_tool.SendEventNew(eventName, eventId, eventData, isCallBack);
    };
    /**
     * 游戏中使用道具上报
     * @param level 当前关卡
     * @param tooName 道具名称
     * @param model 当前模式： 没有则省略
     */
    Utils.UseTool = function (level, toolName, model) {
        AldUtils_1.default.UseTool(level, toolName, model);
    };
    /**
     * 判断算界面是否能显示自动分享   自动强弹视频   自动弹插屏
     * type 1自动分享   2自动强弹视频    3自动弹插屏 4自动弹互推插屏
    */
    Utils.prototype.checkResultShow = function (type) {
        var level = exports.utils.currentLevel;
        var isSuccess = exports.utils.isSuccess;
        var config = exports.utils.ServerConfig;
        if (!config) {
            exports.utils.showLog("warn:" + "服务器配置不存在,只显示结算广告");
            return type == 3;
        }
        if (PlatUtils_1.default.IsDouyin) {
            if (config.auto_record_share_count) {
                var recoredCount = config.auto_record_share_count;
                if (recoredCount != 0 && exports.utils.recored_share_count >= recoredCount) {
                    exports.utils.showLog("\u670D\u52A1\u5668\u914D\u7F6E\u5206\u4EAB\u6B21\u6570\uFF1A" + recoredCount + " ,\u5DF2\u5230\u4E0A\u9650");
                }
                else {
                    var record_cap = config.auto_record_interval;
                    var checkShow_1 = false;
                    if (level > 0 && record_cap != 0) {
                        if (record_cap.indexOf(",") == -1) {
                            if (level % Number(record_cap) == 0) {
                                checkShow_1 = true;
                            }
                        }
                        else {
                            exports.utils.showLog("\u6307\u5B9A\u5173\u5361" + config.auto_record_interval + "\u5206\u4EAB\u5F55\u5C4F\uFF0C\u5F53\u524D\u5173\u5361\u4E3A\uFF1A" + level);
                            var record_cap_arr = record_cap.split(",");
                            record_cap_arr.forEach(function (str) {
                                if (level == Number(str)) {
                                    checkShow_1 = true;
                                }
                            });
                        }
                        if (checkShow_1) {
                            if (config.auto_record_share_type == "all") {
                                return type == 1;
                            }
                            if (config.auto_record_share_type == "success") {
                                if (exports.utils.isSuccess == true) {
                                    return type == 1;
                                }
                            }
                            if (config.auto_record_share_type == "fail") {
                                if (exports.utils.isSuccess == false) {
                                    return type == 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        exports.utils.showLog("\u4E0D\u80FD\u81EA\u52A8\u5206\u4EAB\u5F55\u5C4F \u5206\u4EAB\u5F55\u5C4F\u95F4\u9694\u4E3A\uFF1A" + config.auto_record_interval + "  \u5206\u4EAB\u7C7B\u578B\u4E3A\uFF1A" + config.auto_record_share_type);
        if (config.auto_video_interval && config.auto_video_interval != 0) {
            var space = config.auto_video_interval;
            var showType = config.auto_video_show_type;
            if (level % space == 0) {
                if (showType == "all") {
                    return type == 2;
                }
                if (showType == "success") {
                    if (isSuccess == true) {
                        return type == 2;
                    }
                }
                if (showType == "fail") {
                    if (isSuccess == false) {
                        return type == 2;
                    }
                }
            }
        }
        exports.utils.showLog("\u4E0D\u80FD\u81EA\u52A8\u5F39\u89C6\u9891\u5F39\u89C6\u9891\u95F4\u9694\u4E3A\uFF1A" + config.auto_video_interval + " \u5F39\u89C6\u9891\u7C7B\u578B\u4E3A\uFF1A" + config.auto_video_show_type);
        if (config.auto_rec_insert_interval && config.auto_rec_insert_interval != 0) {
            var space = config.auto_rec_insert_interval;
            var showType = config.auto_rec_insert_type;
            if (level % space == 0) {
                if (showType == "all") {
                    return type == 4;
                }
                if (showType == "success") {
                    if (isSuccess == true) {
                        return type == 4;
                    }
                }
                if (showType == "fail") {
                    if (isSuccess == false) {
                        return type == 4;
                    }
                }
            }
        }
        exports.utils.showLog("\u4E0D\u80FD\u81EA\u52A8\u5F39\u4E92\u63A8\u63D2\u5C4F\u95F4\u9694\u4E3A\uFF1A" + config.auto_rec_insert_interval + " \u5F39\u89C6\u9891\u7C7B\u578B\u4E3A\uFF1A" + config.auto_rec_insert_type);
        return type == 3;
    };
    /**
     * 结算广告控制
     * level 当前关卡   isSuccess是否胜利
     * qq  若判断2通过弹游戏盒子  判断3通过弹插屏
     * 抖音  若判断2通过则弹视频   判断3过弹插屏
     * 趣头条 若判断2通过弹视频   判断3通过弹互动直弹
     * 其他平台若判断2通过则服务器配置有问题，联系运营修改
     *服务器控制 结算界面自动弹出视频
     */
    Utils.prototype.AutoShowStatement = function (level, isSuccess, isShowAd) {
        exports.utils.currentLevel = level;
        exports.utils.isSuccess = isSuccess;
        var res = { "type": -1, "node": null };
        if (!isShowAd) {
            exports.utils.showLog("isShowAd为false，只上报不显示广告");
            return res;
        }
        var isShowVideo = false;
        if (this.checkResultShow(2)) {
            if (this.getConfigByKey("result_auto_show_video") == "false")
                return;
            if (PlatUtils_1.default.IsDouyin) {
                exports.utils.showLog("服务器版本：", exports.utils.config.douyinconfig.version, "当前版本：", this.getConfigByKey("version"));
                if (exports.utils.config.douyinconfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    exports.utils.adManager.ShowVideo(function () { });
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsQQ) {
                if (exports.utils.config.qqconfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    exports.utils.adManager.ShowVideo(function () { });
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsWiFi) {
                if (exports.utils.config.wifiConfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    exports.utils.adManager.ShowVideo(function () { });
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsBaidu) {
                if (exports.utils.config.baiduconfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    exports.utils.adManager.ShowVideo(function () { });
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsKwai) {
                if (exports.utils.config.kwaiConfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    exports.utils.adManager.ShowVideo(function () { });
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsHago) {
                if (exports.utils.config.hagoConfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    exports.utils.adManager.ShowVideo(function () { });
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsNativeAndroid) {
                if (exports.utils.config.nativeAndroidConfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    if (exports.utils.ServerConfig && this.getConfigByKey("auto_video_type") == "reward_video") {
                        exports.utils.adManager.ShowVideo(function () { });
                    }
                    else {
                        exports.utils.adManager.showFullScreenVideo();
                    }
                    isShowVideo = true;
                }
                else {
                    exports.utils.showLog("与服务器版本一致，不自动播放视频！");
                }
            }
            else if (PlatUtils_1.default.IsNativeIOS) {
                if (exports.utils.config.nativeIoSConfig.version != this.getConfigByKey("version")) {
                    exports.utils.showLog("版本不一致，自动播放视频！");
                    if (exports.utils.ServerConfig && this.getConfigByKey("auto_video_type") == "reward_video") {
                        exports.utils.adManager.ShowVideo(function () { });
                    }
                    else {
                        exports.utils.adManager.showFullScreenVideo();
                    }
                    isShowVideo = true;
                }
            }
            else if (PlatUtils_1.default.IsVIVO) {
                exports.utils.showLog("服务器配置当前显示强弹视频，但当前平台不支持。需修改服务器配置");
                exports.utils.adManager.showStatementAds();
            }
            else {
                isShowVideo = true;
                exports.utils.adManager.ShowVideo(function () { });
            }
            if (isShowVideo && (PlatUtils_1.default.IsDouyin || PlatUtils_1.default.IsQQ || PlatUtils_1.default.IsNativeAndroid || PlatUtils_1.default.IsNativeIOS)) {
                exports.utils.showLog("当前强弹了视频，不显示插屏！");
            }
            else {
                res = exports.utils.adManager.showStatementAds();
            }
        }
        // if (this.canShowRedBag() && this.yzRedBagInfo.progress >= this.yzRedBagInfo.totalProgress) {
        //     utils.showLog("当前红包进度已满，显示获得红包窗口！");
        //     // this.showOpenRedBagPanel({ showType: 2 });
        // }
        if (this.checkResultShow(3)) {
            res = exports.utils.adManager.showStatementAds();
            // console.log(" this.checkResultShow(3)", res.node);
        }
        if (PlatUtils_1.default.IsDouyin || PlatUtils_1.default.IsNativeIOS || PlatUtils_1.default.IsBaidu || PlatUtils_1.default.IsNativeAndroid) {
            //抖音平台判断是否需要6元素互推
            res.type = 1;
            res.node = exports.utils.showCrossWidget6();
        }
        return res;
    };
    /**
     * 获得一次现金红包
     */
    Utils.prototype.addRedBagCount = function (callFun) {
        this.yzRedBagInfo.freeRedBagCount++;
        if (callFun) {
            this.rewardCloseFunc = callFun;
        }
        this.showOpenRedBagPanel({ showType: 3 });
        exports.utils.showLog("获得一个现金红包");
    };
    /**
     * 开始游戏自动录屏
     * 暂时只有头条平台有
     * 默认为0 表示不开启，例如3 表示每三关会自动录屏，例如3,6,9 表示只有第3,6,9指定的关卡会自动录屏
     */
    Utils.prototype.AutoStartRecord = function (level) {
        if (this.getConfigByKey("auto_record_interval") > 0) {
            exports.utils.recordStart();
        }
        else {
            exports.utils.showLog("warn:" + "服务器配置不存在auto_record_interva");
        }
    };
    /**
     * 显示录屏分享窗口
     * @param params
     */
    Utils.prototype.showShareRecordPanel = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (this.config.otherconfig.shareRecordPanel) {
            var node = cc.instantiate(this.config.otherconfig.shareRecordPanel);
            if (node) {
                if (this.shareRecordPanel && cc.isValid(this.shareRecordPanel)) {
                    this.shareRecordPanel.destroy();
                }
                this.shareRecordPanel = node;
                this.shareRecordPanel.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                if (params) {
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                    else {
                        cc.director.getScene().addChild(this.shareRecordPanel, 1000);
                    }
                }
                else {
                    cc.director.getScene().addChild(this.shareRecordPanel, 1000);
                }
                widget.updateAlignment();
                return node;
            }
        }
        else {
            exports.utils.showLog("未找到预制体 ShareRecordPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    Object.defineProperty(Utils.prototype, "otherConfig", {
        /**
         * 获取其他辅助配置
         */
        get: function () {
            if (!this._other_config) {
                this._other_config = this.config.otherconfig.localConfig.json.other;
            }
            return this._other_config;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取试用皮肤关卡间隔
     * 默认为每5关显示一次
     *
     */
    Utils.prototype.isShowTrySkin = function (curLevel) {
        var count = 5;
        if (exports.utils.ServerConfig && this.getConfigByKey("try_skin_level_count")) {
            count = this.getConfigByKey("try_skin_level_count");
        }
        if (curLevel % count == 0) {
            if (exports.utils.ServerConfig && this.getConfigByKey("try_skin_show_ad_interval") != undefined) {
                if (curLevel % this.getConfigByKey("try_skin_show_ad_interval") == 0) {
                    exports.utils.showLog("\u670D\u52A1\u5668\u914D\u7F6E\u95F4\u9694" + this.getConfigByKey("try_skin_show_ad_interval") + "\u5173\u8BD5\u7528\u76AE\u80A4\u5C55\u793A\u63D2\u5C4F\uFF01");
                    exports.utils.adManager.ShowInterstitial();
                }
            }
            return true;
        }
        return false;
    };
    /**
     * 延迟显示跳过或者关闭按钮
     * @param btn 延迟显示按钮的节点
     * @param isCloseBtn 是否返回或者关闭按钮
     * @param location 按钮所在的页面位置
     */
    Utils.prototype.showSkipBtn = function (btn, isCloseBtn, location) {
        if (isCloseBtn === void 0) { isCloseBtn = false; }
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.None; }
        if (btn) {
            var delayShowBtn = PlatUtils_1.default.IsNativeAndroid ? 3 : 0;
            if (this.getConfigByKey("skip_btn_show_delay")) {
                delayShowBtn = this.getConfigByKey("skip_btn_show_delay");
            }
            if (isCloseBtn) {
                if (this.getConfigByKey("special_skip_btn_show_delay")) {
                    delayShowBtn = this.getConfigByKey("special_skip_btn_show_delay");
                }
            }
            if (PlatUtils_1.default.IsTest) {
                this.ServerConfig.over_page_skip_btn_show_delay = 3;
            }
            if (location == YZ_Constant_1.BannerLocation.Over) {
                if (this.getConfigByKey("over_page_skip_btn_show_delay")) {
                    delayShowBtn = this.getConfigByKey("over_page_skip_btn_show_delay");
                }
            }
            if (delayShowBtn > 0) {
                btn.opacity = 0;
                btn.active = false;
                this.scheduleOnce(function () {
                    if (btn && cc.isValid(btn)) {
                        btn.active = true;
                        btn.runAction(cc.fadeIn(0.3));
                    }
                }, delayShowBtn);
            }
            else {
                if (!btn.active) {
                    btn.active = true;
                }
            }
        }
    };
    /**
     * 抖音按钮延迟显示
     * 默认为0秒
     */
    Utils.prototype.delayShowNode = function (btn) {
        if (btn) {
            btn.opacity = 0;
            btn.active = true;
            var delayShowBtn = 0;
            if (this.getConfigByKey("next_btn_show_delay")) {
                delayShowBtn = this.getConfigByKey("next_btn_show_delay");
            }
            this.scheduleOnce(function () {
                if (btn && cc.isValid(btn)) {
                    btn.runAction(cc.fadeIn(0.3));
                }
            }, delayShowBtn);
        }
    };
    /**
     * 宝箱界面是否自动勾选
     */
    Utils.prototype.isBoxAutoSelectToggle = function () {
        var cap_level = 0;
        var level = exports.utils.currentLevel;
        if (this.getConfigByKey("box_auto_select_level")) {
            cap_level = Number(this.getConfigByKey("box_auto_select_level"));
        }
        else {
            exports.utils.showLog("服务器配置不存在，不自动勾选");
        }
        if (cap_level != 0 && (level % cap_level) == 0) {
            return true;
        }
        return false;
    };
    /**
     * 结算界面是否自动勾选
     */
    Utils.prototype.isResultAutoSelectToggle = function () {
        var cap_level = 0;
        var level = exports.utils.currentLevel;
        if (this.getConfigByKey("result_auto_select_level")) {
            cap_level = Number(this.getConfigByKey("result_auto_select_level"));
        }
        else {
            exports.utils.showLog("服务器配置不存在，不自动勾选");
        }
        if (cap_level != 0 && (level % cap_level) == 0) {
            return true;
        }
        return false;
    };
    /**
     * 试用皮肤界面是否自动勾选
     */
    Utils.prototype.isTrySkinAutoSelectToggle = function () {
        var cap_level = 0;
        var level = exports.utils.currentLevel;
        if (this.getConfigByKey("skin_auto_select_level")) {
            cap_level = Number(this.getConfigByKey("skin_auto_select_level"));
        }
        else {
            exports.utils.showLog("服务器配置不存在，不自动勾选");
        }
        if (cap_level != 0 && (level % cap_level) == 0) {
            return true;
        }
        return false;
    };
    Object.defineProperty(Utils.prototype, "gameVersion", {
        /**
         * 游戏当前版本
         */
        get: function () {
            if (this.cur_tool && this.cur_tool.gameVersion)
                return this.cur_tool.gameVersion();
            return "-1";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 界面控制
     * @param view
     * 界面类型：皮肤试用界面  宝箱界面
     *
     * 返回值类型
     * @param callback isSelect：按钮是否自动勾选上
     * @param callback msg:文字提示
     * @param callback btnType:初始按钮类型   true为看广告的文本  false为不看广告的文本
    */
    Utils.prototype.controView = function (view) {
        var result = { "isSelect": true, "msg": "观看视频获得奖励", "btnType": true, "is_open": false };
        var adTipsType;
        var selectType;
        if (!exports.utils.ServerConfig) {
            exports.utils.showLog("服务器配置不存在");
            return result;
        }
        //验证服务器是否开启勾选策略
        if (this.getConfigByKey("open_check_btn") == "false") {
            exports.utils.showLog("服务器配置不开启勾选！");
            return result;
        }
        result.is_open = true;
        switch (view) {
            case YZ_Constant_1.ViewLocation.sign:
                selectType = this.getConfigByKey("sign_auto_select_level") ? this.getConfigByKey("sign_auto_select_level") : 0;
                if (this.getConfigByKey("ad_tip_sign_random") == "true") {
                    adTipsType = Math.random() >= 0.5 ? true : false;
                }
                else {
                    adTipsType = true;
                }
                if (adTipsType) {
                    result.msg = "查看视频获得双倍奖励";
                }
                else {
                    result.msg = "不需要视频奖励";
                }
                break;
            case YZ_Constant_1.ViewLocation.trySkin:
                selectType = this.getConfigByKey("tryskin_auto_select_level") ? this.getConfigByKey("tryskin_auto_select_level") : 0;
                if (this.getConfigByKey("ad_tip_tryskin_random") == "true") {
                    adTipsType = Math.random() >= 0.5 ? true : false;
                }
                else {
                    adTipsType = true;
                }
                if (adTipsType) {
                    result.msg = "查看视频试用皮肤";
                }
                else {
                    result.msg = "不需要视频试用皮肤";
                }
                break;
            case YZ_Constant_1.ViewLocation.box:
                selectType = this.getConfigByKey("box_auto_select_level") ? this.getConfigByKey("box_auto_select_level") : 0;
                if (this.getConfigByKey("ad_tip_box_random") == "true") {
                    adTipsType = Math.random() >= 0.5 ? true : false;
                }
                else {
                    adTipsType = true;
                }
                if (adTipsType) {
                    result.msg = "查看视频获得五倍奖励";
                }
                else {
                    result.msg = "不需要视频奖励";
                }
                break;
            case YZ_Constant_1.ViewLocation.successBox:
                selectType = this.getConfigByKey("success_box_auto_select_level") ? this.getConfigByKey("success_box_auto_select_level") : 0;
                break;
            case YZ_Constant_1.ViewLocation.failBox:
                selectType = this.getConfigByKey("fail_box_auto_select_level") ? this.getConfigByKey("fail_box_auto_select_level") : 0;
                break;
            case YZ_Constant_1.ViewLocation.winPanel:
                selectType = this.getConfigByKey("win_panel_auto_select_level") ? this.getConfigByKey("win_panel_auto_select_level") : 0;
                break;
            case YZ_Constant_1.ViewLocation.turntable:
                selectType = this.getConfigByKey("turntable_auto_select_level") ? this.getConfigByKey("turntable_auto_select_level") : 0;
                break;
        }
        if (selectType == 0) {
            result.isSelect = false;
        }
        else if (selectType == 1) {
            result.isSelect = true;
        }
        else if (selectType == 2) {
            result.isSelect = Math.random() >= 0.5 ? true : false;
        }
        result.btnType = adTipsType == result.isSelect;
        return result;
    };
    /**
     * 是否能再下一关开始的时候强弹视频
    */
    Utils.prototype.canShowNextVideo = function (level) {
        if (exports.utils.ServerConfig && this.getConfigByKey("next_auto_video_interval")) {
            var cap = Number(this.getConfigByKey("next_auto_video_interval"));
            if (cap && cap != 0) {
                if (level % cap == 0) {
                    if (PlatUtils_1.default.IsDouyin) {
                        if (this.getConfigByKey("version") != exports.utils.config.douyinconfig.version) {
                            return true;
                        }
                    }
                    else if (PlatUtils_1.default.IsBaidu) {
                        if (this.getConfigByKey("version") != exports.utils.config.baiduconfig.version) {
                            return true;
                        }
                    }
                    else if (PlatUtils_1.default.ISUC) {
                        if (this.getConfigByKey("version") != exports.utils.config.ucConfig.version) {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
                else {
                    if (PlatUtils_1.default.Is4399) {
                        cap = 3; //4399不能读取服务器配置写死间隔
                        if (cap != 0 && level % cap == 0) {
                            return this.true;
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * 是否显示红包
     */
    Utils.prototype.canShowRedBag = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (this.ServerConfig && this.yzRedBagInfo && this.ServerConfig.show_red_bag && this.ServerConfig.show_red_bag == "true") {
            return true;
        }
        exports.utils.showLog("服务器配置不显示红包组件！");
        return false;
    };
    /**
     * 隐藏提现框挂件
     */
    Utils.prototype.hideWithdrawalWidget = function () {
        if (this._withdrawalWidget && cc.isValid(this._withdrawalWidget)) {
            this._withdrawalWidget.destroy();
        }
    };
    /**
     * 显示提现框挂件
     * @param params
     */
    Utils.prototype.showWithdrawalWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag())
            return null;
        if (this.config.otherconfig.withdrawalWidget) {
            var node = cc.instantiate(this.config.otherconfig.withdrawalWidget);
            if (node) {
                if (this._withdrawalWidget && cc.isValid(this._withdrawalWidget)) {
                    this._withdrawalWidget.destroy();
                }
                this._withdrawalWidget = node;
                this._withdrawalWidget.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                if (params) {
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                }
                widget.updateAlignment();
                return node;
            }
        }
        else {
            exports.utils.showLog("warn:" + "未找到预制体 WithdrawalWidget, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
     * 隐藏红包进度挂件
     */
    Utils.prototype.hideRedBagProgressWidget = function () {
        if (this._redBagProgressWidget && cc.isValid(this._redBagProgressWidget)) {
            this._redBagProgressWidget.destroy();
        }
    };
    /**
    * 显示红包进度挂件
    * @param params
    */
    Utils.prototype.showRedBagProgressWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag())
            return null;
        if (this.config.otherconfig.redBagProgressWidget) {
            var node = cc.instantiate(this.config.otherconfig.redBagProgressWidget);
            if (node) {
                if (this._redBagProgressWidget && cc.isValid(this._redBagProgressWidget)) {
                    this._redBagProgressWidget.destroy();
                }
                this._redBagProgressWidget = node;
                this._redBagProgressWidget.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                if (params) {
                    if (params.location) {
                        node.getComponent(RedBagProgressWidget_1.default).init(params);
                    }
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                }
                widget.updateAlignment();
                return node;
            }
        }
        else {
            exports.utils.showLog("warn:" + "未找到预制体 RedBagProgressWidget, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
   * 显示提现弹窗
   * @param params
   */
    Utils.prototype.showWithdrawalPanel = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag())
            return null;
        if (this.config.otherconfig.withdrawalPanel) {
            var node = cc.instantiate(this.config.otherconfig.withdrawalPanel);
            if (node) {
                if (this._withdrawalPanel && cc.isValid(this._withdrawalPanel)) {
                    this._withdrawalPanel.destroy();
                }
                this._withdrawalPanel = node;
                cc.director.getScene().addChild(this._withdrawalPanel, 9999);
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 WithdrawalPanel, 请查看CommonUtils组件上是否赋值！");
            }
            return null;
        }
    };
    /**
   * 显示开红包弹窗
   * @param params
   */
    Utils.prototype.showOpenRedBagPanel = function (params) {
        if (params === void 0) { params = null; }
        if (params && params.closeCallFunc) {
            this.rewardCloseFunc = params.closeCallFunc;
        }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            this.rewardCloseFunc && this.rewardCloseFunc();
            return null;
        }
        if (!this.canShowRedBag()) {
            this.rewardCloseFunc && this.rewardCloseFunc();
            return null;
        }
        if (params && params.location && params.location === YZ_Constant_1.BannerLocation.Home) {
            if (this.yzRedBagInfo.progress < this.yzRedBagInfo.totalProgress && !this.yzRedBagInfo.isFreeRedBag) {
                exports.utils.showLog("当前红包进度不满足条件且没有免费红包领取，首页不显示拆红包窗口");
                this.rewardCloseFunc && this.rewardCloseFunc();
                return null;
            }
            else if (!this.yzRedBagInfo.isFreeRedBag) {
                params.showType = 2;
            }
        }
        if (this.config.otherconfig.openRedBagPanel) {
            var node = cc.instantiate(this.config.otherconfig.openRedBagPanel);
            if (node) {
                if (this._openRedBagPanel && cc.isValid(this._openRedBagPanel)) {
                    this._openRedBagPanel.destroy();
                }
                this._openRedBagPanel = node;
                if (params && params.showType) {
                    this._openRedBagPanel.getComponent(OpenRedBagPanel_1.default).initData(params.showType);
                }
                cc.director.getScene().addChild(node, 9999);
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 OpenRedBagPanel, 请查看CommonUtils组件上是否赋值！");
            }
            return null;
        }
    };
    /**
   * 显示获得红包弹窗
   * @param params
   */
    Utils.prototype.showRewardRedBagPanel = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag())
            return null;
        this._rewardRedBagPanelShowCount++;
        // if (this.ServerConfig && this.ServerConfig.show_reward_red_bag_interval) {
        if (this._rewardRedBagPanelShowCount % 3 != 0) {
            exports.utils.showLog("获得红包弹窗未达到服务器配置的间隔限制！");
            return;
        }
        // }
        if (this.config.otherconfig.rewardRedBagPanel) {
            var node = cc.instantiate(this.config.otherconfig.rewardRedBagPanel);
            if (node) {
                if (this._rewardRedBagPanel && cc.isValid(this._rewardRedBagPanel)) {
                    this._rewardRedBagPanel.destroy();
                }
                this._rewardRedBagPanel = node;
                cc.director.getScene().addChild(this._rewardRedBagPanel, 9999);
            }
            else {
                exports.utils.showLog("warn:" + "未找到预制体 OpenRedBagPanel, 请查看CommonUtils组件上是否赋值！");
            }
            return null;
        }
    };
    /**
    * 是否竖屏互推窗口
    */
    Utils.prototype.isVerticalRecommentPanel = function () {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer)
            return true;
        if (PlatUtils_1.default.IsWechat) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.wechatTool
                    && exports.utils.wechatTool.ServerConfig
                    && exports.utils.wechatTool.ServerConfig.is_vertical_game) {
                    if (exports.utils.wechatTool.ServerConfig.is_vertical_game == "true") {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsOPPO) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.oppoTool
                    && exports.utils.oppoTool.ServerConfig
                    && exports.utils.oppoTool.ServerConfig.is_vertical_game) {
                    if (exports.utils.oppoTool.ServerConfig.is_vertical_game == "true") {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsDouyin) {
            if (PlatUtils_1.default.IsAndroid
                && exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.Tool_Douyin
                    && exports.utils.Tool_Douyin.ServerConfig
                    && exports.utils.Tool_Douyin.ServerConfig.is_vertical_game) {
                    if (exports.utils.Tool_Douyin.ServerConfig.is_vertical_game == "true") {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsBaidu) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.Tool_Baidu
                    && exports.utils.Tool_Baidu.ServerConfig
                    && exports.utils.Tool_Baidu.ServerConfig.is_vertical_game) {
                    if (exports.utils.Tool_Baidu.ServerConfig.is_vertical_game == "true") {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsQQ) {
            if (exports.utils.isSupportnavigateToMiniGame()) {
                if (exports.utils.Tool_QQ
                    && exports.utils.Tool_QQ.ServerConfig
                    && exports.utils.Tool_QQ.ServerConfig.is_vertical_game) {
                    if (exports.utils.Tool_QQ.ServerConfig.is_vertical_game == "true") {
                        return true;
                    }
                    else {
                        exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                }
                else {
                    exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.Is4399) {
            return true;
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            if (exports.utils.Tool_Native
                && exports.utils.Tool_Native.ServerConfig
                && exports.utils.Tool_Native.ServerConfig.is_vertical_game) {
                if (exports.utils.Tool_Native.ServerConfig.is_vertical_game == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
            }
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            if (exports.utils.Tool_IOS
                && exports.utils.Tool_IOS.ServerConfig
                && exports.utils.Tool_IOS.ServerConfig.is_vertical_game) {
                if (exports.utils.Tool_IOS.ServerConfig.is_vertical_game == "true") {
                    return true;
                }
                else {
                    exports.utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                }
            }
            else {
                exports.utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
            }
        }
        return false;
    };
    /**
        * 显示红包进度挂件
        * @param params
        */
    Utils.prototype.showVerticalRecommentPanel = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.isVerticalRecommentPanel())
            return null;
        if (this.config.otherconfig.verticalRecommentPanel) {
            var node = cc.instantiate(this.config.otherconfig.verticalRecommentPanel);
            if (node) {
                // if (this._redBagProgressWidget && cc.isValid(this._redBagProgressWidget)) {
                //     this._redBagProgressWidget.destroy();
                // }
                node.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                if (params) {
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                    if (params.position != null) {
                        node.setPosition(CompatibleTool_1.default.position(params.position.x, params.position.y));
                    }
                }
                widget.updateAlignment();
                return node;
            }
        }
        else {
            exports.utils.showLog("warn:" + "未找到预制体 verticalRecommentPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
     * 是否显示用户协议挂件
     */
    Utils.prototype.isShowPrivacyWidget = function () {
        if (this.Tool_Broswer)
            return true;
        if (this.getConfigByKey("is_privacy") == "true") {
            return true;
        }
        else {
            exports.utils.showLog("warn:" + "配置中没有is_privacy参数，更用户协议挂件组件不显示！");
        }
        return false;
    };
    /**
     * 显示用户协议挂件
     * @param params
     */
    Utils.prototype.showPrivacyWidget = function (params) {
        if (params === void 0) { params = null; }
        if (exports.utils.isShowPrivacyWidget()) {
            if (this.config.otherconfig.privacyWidget) {
                if (this._privacyWidget && cc.isValid(this._privacyWidget)) {
                    this._privacyWidget.destroy();
                }
                var node_1 = cc.instantiate(this.config.otherconfig.privacyWidget);
                this._privacyWidget = node_1;
                this._privacyWidget.zIndex = 9999;
                var widget = node_1.getComponent(cc.Widget);
                if (params) {
                    if (params.color) {
                        node_1.children[0].color = params.color;
                    }
                    if (params.group) {
                        node_1.group = params.group;
                    }
                    if (params.scale != null) {
                        node_1.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node_1.parent = params.parent;
                    }
                }
                widget.updateAlignment();
                node_1.on(cc.Node.EventType.TOUCH_END, function () {
                    if (PlatUtils_1.default.IsNativeAndroid) {
                        exports.utils.Tool_Native && exports.utils.Tool_Native.showPrivacyAgreement();
                    }
                    else {
                        exports.utils.showPrivacyPanel({ is_widget_click: "true", group: node_1.group });
                    }
                }, this);
                return node_1;
            }
            else {
                exports.utils.showLog("warn:" + "隐私政策挂件预制体不存在！");
            }
        }
        else {
            exports.utils.showLog("warn:" + "不可显示更多游戏侧边栏");
        }
        return null;
    };
    /**
     * 隐藏隐私政策
     */
    Utils.prototype.hidePrivacyWidget = function () {
        if (this._privacyWidget && cc.isValid(this._privacyWidget)) {
            this._privacyWidget.destroy();
        }
    };
    /**
     * 是否显示用户隐私协议弹窗
     */
    Utils.prototype.isShowPrivacyPanel = function () {
        if (PlatUtils_1.default.IsHuaWei || PlatUtils_1.default.IsXiaoMi) {
            return true;
        }
        if (this.getConfigByKey("is_privacy_panel")) {
            if (this.getConfigByKey("is_privacy_panel") == "true") {
                return true;
            }
            else {
                exports.utils.showLog("warn:" + "is_privacy_panel参数为false，用户隐私政策弹窗组件不显示！");
            }
        }
        return false;
    };
    /**
     * 显示用户协议弹窗
     * @param params
     */
    Utils.prototype.showPrivacyPanel = function (params) {
        var _this = this;
        if (params === void 0) { params = null; }
        exports.utils.showLog("showPrivacyPanel>>>");
        var showPanel = function (showDesc) {
            if (_this.config.otherconfig.privacyPanel) {
                if (_this._privacyPanel && cc.isValid(_this._privacyPanel)) {
                    _this._privacyPanel.destroy();
                }
                var node = cc.instantiate(_this.config.otherconfig.privacyPanel);
                var yzUserPrivacyPanel = node.getComponent(YzUserPrivacyPanel_1.default);
                yzUserPrivacyPanel.showDesc = showDesc;
                _this._privacyPanel = node;
                _this._privacyPanel.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                var subject = "深圳市优智信息技术有限公司";
                if (params && params.subject) {
                    subject = params.subject;
                }
                var content = cc.find("Panel/subject", node).getComponent(cc.Label).string;
                content = content.replace('subject', subject);
                cc.find("Panel/subject", node).getComponent(cc.Label).string = content;
                if (params) {
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                    else {
                        cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
                    }
                }
                else {
                    cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
                }
                widget.updateAlignment();
            }
            else {
                exports.utils.showLog("warn:" + "隐私政策弹窗预制体不存在！");
            }
        };
        if (params && params.is_widget_click) {
            showPanel(true);
        }
        else {
            var ysxy = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.YZ_GAME_YSXY);
            if (ysxy) {
                exports.utils.emitPrivacyCloseEvent();
                exports.utils.showLog("已经同意过隐私协议，不显示隐私协议弹窗！");
                return;
            }
            exports.utils.registerServerDataLoadSuccessEvent(function () {
                showPanel();
            }, this);
        }
    };
    /**
     * 显示放大缩小动态
     * @param videoBtn 视频播放按钮
     * @param normalBtn 普通按钮
     * @param changeBtn 是否变换按钮位置
     * @param showHand 是否显示手势
     * @param location 按钮所属的页面位置
     * @returns
     */
    Utils.prototype.showScaleAction = function (videoBtn, normalBtn, changeBtn, showHand, location) {
        if (normalBtn === void 0) { normalBtn = null; }
        if (changeBtn === void 0) { changeBtn = true; }
        if (showHand === void 0) { showHand = true; }
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.None; }
        if (changeBtn) {
            if (!cc.isValid(normalBtn) || !cc.isValid(videoBtn))
                return;
        }
        else {
            if (!cc.isValid(videoBtn))
                return;
        }
        if (CC_DEBUG) {
            this.ServerConfig.btn_show_scale = "true";
            this.ServerConfig.change_btn_position = "true";
            this.ServerConfig.over_page_change_btn = "false";
            this.ServerConfig.over_page_scale_btn = "false";
        }
        var scaleNode = videoBtn;
        if (this.getConfigByKey("change_btn_position") == "true" && changeBtn == true) {
            var changePosition = true;
            if (location == YZ_Constant_1.BannerLocation.Over) {
                if (this.getConfigByKey("over_page_change_btn") == "false") {
                    changePosition = false;
                    exports.utils.showLog("结算页面按钮配置不切换位置！");
                }
            }
            if (changePosition) {
                var rand = Math.floor(Math.random() * 2 + 1);
                var videoPos = videoBtn.position;
                var normalPos = normalBtn.position;
                if (rand % 2 == 0) {
                    normalBtn.position = videoPos;
                    videoBtn.position = normalPos;
                }
                else {
                    scaleNode = videoBtn;
                    normalBtn.position = normalPos;
                    videoBtn.position = videoPos;
                }
                scaleNode = normalBtn.position.y > videoBtn.position.y ? normalBtn : videoBtn;
            }
        }
        if (this.getConfigByKey("btn_show_scale") == "true") {
            if (location == YZ_Constant_1.BannerLocation.Over &&
                this.getConfigByKey("over_page_scale_btn") == "false") {
                exports.utils.showLog("结算页面按钮配置不缩放按钮！");
                return;
            }
            if (videoBtn) {
                videoBtn.stopAllActions();
                videoBtn.scale = 1;
            }
            if (normalBtn) {
                normalBtn.stopAllActions();
                normalBtn.scale = 1;
            }
            var action = cc.sequence(cc.scaleTo(this.runTime, this.maxScale), cc.scaleTo(this.runTime, this.minScale));
            scaleNode.runAction(action.repeatForever());
            if (showHand) {
                if (videoBtn) {
                    var child = videoBtn.parent.getChildByName("hand");
                    if (child) {
                        child.destroy();
                        child.removeFromParent();
                    }
                }
                if (normalBtn) {
                    var child = normalBtn.parent.getChildByName("hand");
                    if (child) {
                        child.destroy();
                        child.removeFromParent();
                    }
                }
                if (this.config.otherconfig.handPrefab) {
                    var hand = cc.instantiate(this.config.otherconfig.handPrefab);
                    hand.x = scaleNode.x + scaleNode.width / 2;
                    hand.y = scaleNode.y - 135;
                    scaleNode.parent.addChild(hand, cc.macro.MAX_ZINDEX + 1, "hand");
                }
            }
        }
    };
    /**
     * 上报原生广告点击
     */
    Utils.prototype.reportNativeAdClick = function () {
        if ((new Date().getTime() - this._lastReportAdTime) / 1000 > 3) {
            this._lastReportAdTime = new Date().getTime();
            cc.game.emit(YZ_Constant_1.default.YZ_NativeAdClick);
            this.showLog("上报原生广告点击！");
        }
        else {
            this.showLog("上报原生广告点击间隔时间小于3秒！");
        }
    };
    /**
     * 是否显示结算页面广告点击按钮
     */
    Utils.prototype.canShowOverPageAdBtn = function () {
        if (this.ServerConfig && this.ServerConfig.show_over_page_ad_btn && this.ServerConfig.show_over_page_ad_btn == "true") {
            return true;
        }
        return false;
    };
    /**
     * 显示小游戏官方互推banner
     */
    Utils.prototype.showRecBanner = function () {
        if (!exports.utils.adManager.checkShowAdTime()) {
            exports.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        this.cur_tool && this.cur_tool.showRecBanner && this.cur_tool.showRecBanner();
    };
    /**
     * 显示小游戏官方互推九宫格
     */
    Utils.prototype.showGamePortal = function () {
        if (!exports.utils.adManager.checkShowAdTime()) {
            exports.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        this.cur_tool && this.cur_tool.showGamePortal && this.cur_tool.showGamePortal();
    };
    Utils.prototype.showVivoGamePortalWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }
        if (!PlatUtils_1.default.IsVIVO)
            return;
        if (!exports.utils.adManager.checkShowAdTime()) {
            exports.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (this.getConfigByKey("vivo_game_protal") === "true") {
            if (params && params.location && (this.getConfigByKey("vivo_game_protal_locations").indexOf(params.location) < 0)) {
                exports.utils.showLog("当前位置服务器未配置显示VIVO九宫格挂件！");
                this.Tool_Vivo && this.Tool_Vivo.hideGamePortal();
                return;
            }
            this.Tool_Vivo && this.Tool_Vivo.showGamePortal(params.top);
        }
        else {
            exports.utils.showLog("服务器未配置显示VIVO九宫格挂件！");
        }
    };
    /**
     * 隐藏VIVO九宫格挂件
     * @param params
     */
    Utils.prototype.hideVivoGamePortalWidget = function () {
        this.Tool_Vivo && this.Tool_Vivo.hideGamePortal();
    };
    /*
    **
    * 显示OPPO互推抽屉盒子广告：
    * 只能显示在左侧，设置top值
    * @param params
    * ```
    * {
    * top:number       // 距离屏幕顶部的距离
    * }
    * ```
    */
    Utils.prototype.showOppoGameDrawerAdWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }
        if (!PlatUtils_1.default.IsOPPO)
            return;
        if (!exports.utils.adManager.checkShowAdTime()) {
            exports.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (CC_DEBUG) {
            this.ServerConfig.oppo_game_drawer = "true";
            this.ServerConfig.oppo_game_drawer_locations = "1, 2, 3, 4,5,6";
        }
        if (this.getConfigByKey("oppo_game_drawer") === "true") {
            if (params && params.location && (this.getConfigByKey("oppo_game_drawer_locations").indexOf(params.location) < 0)) {
                exports.utils.showLog("当前位置服务器未配置显示OPPO互推抽屉盒子！");
                this.oppoTool && this.oppoTool.hideGameDrawerAd();
                return;
            }
            // if (params && params.location && this._curGameDrawerAdLocation && this._curGameDrawerAdLocation != params.location) {
            //     this.oppoTool && this.oppoTool.hideGameDrawerAd();
            // }
            this.oppoTool && this.oppoTool.showGameDrawerAd(params);
        }
        else {
            exports.utils.showLog("服务器未配置显示OPPO互推抽屉盒子！");
        }
    };
    /**
     * 隐藏OPPO互推抽屉盒子广告
     * @param params
     */
    Utils.prototype.hideOppoGameDrawerAdWidget = function () {
        this.oppoTool && this.oppoTool.hideGameDrawerAd();
    };
    /*
    **
    * 显示OPPO互推横幅广告：
    * @param params
    * ```
    * {
    * top:number       // 距离屏幕顶部的距离
    * }
    * ```
    */
    Utils.prototype.showOppoRecBanner = function (params) {
        if (params === void 0) { params = null; }
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }
        if (!PlatUtils_1.default.IsOPPO)
            return;
        if (!exports.utils.adManager.checkShowAdTime()) {
            exports.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (CC_DEBUG) {
            this.ServerConfig.oppo_rec_banner = "true";
            this.ServerConfig.oppo_rec_banner_locations = "1, 2, 3, 4";
        }
        if (this.getConfigByKey("oppo_rec_banner") === "true") {
            if (params && params.location && (this.getConfigByKey("oppo_rec_banner_locations").indexOf(params.location) < 0)) {
                exports.utils.showLog("当前位置服务器未配置显示OPPO互推Banner！");
                this.oppoTool && this.oppoTool.hideOppoRecBanner();
                return;
            }
            this.oppoTool && this.oppoTool.showOppoNewRecBanner(params);
        }
        else {
            exports.utils.showLog("服务器未配置显示OPPO互推Banner！");
        }
    };
    /**
     * 隐藏OPPO互推横幅广告
     * @param params
     */
    Utils.prototype.hideOppoRecBanner = function () {
        this.oppoTool && this.oppoTool.hideOppoRecBanner();
    };
    /**
     * 实名认证
     */
    Utils.prototype.realNameAuth = function (code, name, callBack) {
        exports.utils.showLog("\u8FDB\u884C\u5B9E\u540D\u5236\u8BA4\u8BC1\uFF1A#code=" + code + " #name=" + name);
        exports.utils.cur_tool && exports.utils.cur_tool.realNameAuth && exports.utils.cur_tool.realNameAuth(code, name, callBack);
    };
    /**
     * 退出游戏
     */
    Utils.prototype.GameExit = function () {
        this.cur_tool && this.cur_tool.GameExit && this.cur_tool.GameExit();
    };
    /**
     * 显示实名制认证弹窗
     * @param params
     */
    Utils.prototype.showYzRealNameAuthPanel = function (params) {
        if (params === void 0) { params = null; }
        exports.utils.showLog("显示实名制认证弹窗!");
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }
        if (this.getRealNameAuthLocalData() && this.getRealNameAuthLocalData() == "1") {
            this._isRealNameAuth = true;
        }
        if (this._isRealNameAuth) {
            exports.utils.showLog("已经进行过实名制认证,不显示弹窗！");
            this.emitRealNameAuthCloseEvent();
            return;
        }
        var showTime = -1;
        if (PlatUtils_1.default.IsNativeAndroid || PlatUtils_1.default.IsNativeIOS) {
            showTime = 0;
        }
        if (this.getConfigByKey("show_real_name_auth")) {
            showTime = parseInt(this.getConfigByKey("show_real_name_auth"));
        }
        if (showTime == -1) {
            exports.utils.showLog("服务器控制不显示实名制弹窗！");
            this.emitRealNameAuthCloseEvent();
            return;
        }
        if (PlatUtils_1.default.IsNativeAndroid) {
            this.scheduleOnce(function () {
                exports.utils.Tool_Native.showRealNameAuthPanel(showTime + "");
            }, showTime);
            return;
        }
        if (this.config.otherconfig.yzRealNameAuthPanel) {
            if (this._yzRealNameAuthPanel && cc.isValid(this._yzRealNameAuthPanel)) {
                this._yzRealNameAuthPanel.destroy();
            }
            var node_2 = cc.instantiate(this.config.otherconfig.yzRealNameAuthPanel);
            if (showTime == -2) {
                //达到防沉迷要求，直接提示下线
                node_2.getComponent(YzRealNameAuthPanel_1.default)._isOffLine = true;
                showTime = 0;
            }
            this._yzRealNameAuthPanel = node_2;
            this._yzRealNameAuthPanel.zIndex = 9999;
            if (params) {
                if (params.group) {
                    node_2.group = params.group;
                }
                if (params.scale != null) {
                    node_2.scale = params.scale;
                }
                this.scheduleOnce(function () {
                    if (params.parent != null) {
                        node_2.parent = params.parent;
                    }
                    else {
                        cc.find("Canvas").addChild(node_2);
                    }
                }, showTime * 1000);
            }
            else {
                this.scheduleOnce(function () {
                    cc.find("Canvas").addChild(node_2);
                }, showTime * 1000);
            }
            return node_2;
        }
        exports.utils.showLog("warn:" + "实名制认证弹窗预制体不存在！");
        return null;
    };
    Utils.prototype.setRealNameAuthLocalData = function (value) {
        YZ_LocalStorage_1.default.setItem('yz_game_real_name', "" + value);
    };
    Utils.prototype.getRealNameAuthLocalData = function () {
        var realName = YZ_LocalStorage_1.default.getItem('yz_game_real_name');
        if (!realName) {
            realName = 0;
        }
        return realName;
    };
    /**
     * 通过字段名称获取服务器对应的配置
     * @param key 字段名称
     * @returns 服务器有配置则返回该配置，无则返回空字符串
     */
    Utils.prototype.getConfigByKey = function (key) {
        if (!this._isConfigInit) {
            exports.utils.showLog("warn:" + "本地数据未初始化!");
            return "";
        }
        if (key && this.ServerConfig && key in this.ServerConfig) {
            return this.ServerConfig[key];
        }
        this.showLog("warn:\u5B57\u6BB5\uFF1A" + key + " \u672A\u914D\u7F6E\uFF01");
        return "";
    };
    /**
     * 登录
     * @param successCallFunc 成功回调
     * @param failCallFunc 失败回调
     */
    Utils.prototype.login = function (successCallFunc, failCallFunc) {
        var _this = this;
        this.showLog("=====login====");
        if (successCallFunc) {
            if (PlatUtils_1.default.IsDouyin) {
                // if (YZ_LocalStorage.getItem("yz_login", "false") == "true") {
                //     successCallFunc && successCallFunc();
                //     return;
                // }
            }
            cc.game.targetOff(YZ_Constant_1.default.ST_LOGIN_SUCCESS);
            cc.game.on(YZ_Constant_1.default.ST_LOGIN_SUCCESS, successCallFunc, this);
        }
        if (failCallFunc) {
            var newFailFunc = function () {
                failCallFunc();
                _this.showLoginPanel();
            };
            cc.game.targetOff(YZ_Constant_1.default.ST_LOGIN_FAIL);
            cc.game.on(YZ_Constant_1.default.ST_LOGIN_FAIL, newFailFunc, this);
        }
        else {
            var newFailFunc = function () {
                _this.showLoginPanel();
            };
            cc.game.targetOff(YZ_Constant_1.default.ST_LOGIN_FAIL);
            cc.game.on(YZ_Constant_1.default.ST_LOGIN_FAIL, newFailFunc, this);
        }
        if (this.cur_tool && this.cur_tool.login) {
            this.cur_tool.login();
        }
        else {
            cc.game.targetOff(YZ_Constant_1.default.ST_LOGIN_SUCCESS);
            cc.game.targetOff(YZ_Constant_1.default.ST_LOGIN_FAIL);
            successCallFunc && successCallFunc();
        }
    };
    /**
     * 显示登录弹窗
     */
    Utils.prototype.showLoginPanel = function () {
        if (this.config.otherconfig.yzLoginPanel) {
            var node = cc.instantiate(this.config.otherconfig.yzLoginPanel);
            if (node) {
                if (this._yzLoginPanel && cc.isValid(this._yzLoginPanel)) {
                    this._yzLoginPanel.destroy();
                }
                this._yzLoginPanel = node;
                cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
                return node;
            }
        }
        else {
            exports.utils.showLog("warn:" + "未找到预制体 YzLoginPanel, 请查看CommonUtils组件上是否赋值！");
        }
    };
    /**
     * 生成UUID
     * @returns uuid
     */
    Utils.prototype.generateUUID = function () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    __decorate([
        property({ displayName: "组件版本", readonly: true })
    ], Utils.prototype, "utilsVersion", null);
    __decorate([
        property({ displayName: "测试本地数据", tooltip: "勾选此选项则使用本地配置，否则会请求服务器配置!" })
    ], Utils.prototype, "DebugLoacalConfig", void 0);
    __decorate([
        property({ displayName: "显示日志框", tooltip: "勾选此选项则会显示日志框，用于调试!" })
    ], Utils.prototype, "showLogView", void 0);
    __decorate([
        property({ type: CommonConfig_1.default, displayName: "配置信息" })
    ], Utils.prototype, "config", void 0);
    Utils = __decorate([
        ccclass
    ], Utils);
    return Utils;
}(cc.Component));
exports.default = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsK0NBQTREO0FBQzVELDJDQUFzQztBQUN0Qyx5Q0FBb0M7QUFDcEMsK0NBQXNDO0FBQ3RDLGlEQUE0QztBQUM1QyxtREFBOEM7QUFDOUMsK0NBQTBDO0FBQzFDLG1EQUE4QztBQUM5Qyw2Q0FBb0c7QUFDcEcsMkNBQXNDO0FBRXRDLDZDQUF3QztBQUN4QyxtREFBOEM7QUFDOUMsdUNBQWtDO0FBQ2xDLDJDQUFzQztBQUN0Qyx5REFBb0Q7QUFDcEQsK0NBQTBDO0FBQzFDLDZDQUF3QztBQUN4QywrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBQzFDLHFEQUFnRDtBQUNoRCwrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBQzFDLCtEQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMsbURBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCx1REFBa0Q7QUFDbEQsNkRBQXdEO0FBQ3hELDJEQUFzRDtBQUN0RCxxREFBZ0Q7QUFFaEQseURBQW9EO0FBQ3BELFlBQVk7QUFDWixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMvQyxJQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQTtBQUNwQyxZQUFZO0FBQ1osMENBQTBDO0FBR3BDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRWpDLFFBQUEsS0FBSyxHQUFVLElBQUksQ0FBQztBQUUvQixJQUFNLFlBQVksR0FBVyxPQUFPLENBQUM7QUFHckM7SUFBbUMseUJBQVk7SUFBL0M7UUFBQSxxRUEwdUlDO1FBbHVJRyx1QkFBaUIsR0FBWSxLQUFLLENBQUM7UUFHbkMsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFJN0IsWUFBTSxH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QUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXR1SUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs2Q0FHakQ7SUFHRDtRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUM7b0RBQ3RDO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzs4Q0FDckM7SUFJN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsc0JBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7eUNBQzFCO0lBZlgsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQTB1SXpCO0lBQUQsWUFBQztDQTF1SUQsQUEwdUlDLENBMXVJa0MsRUFBRSxDQUFDLFNBQVMsR0EwdUk5QztrQkExdUlvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkTWFuYWdlciBmcm9tIFwiLi9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IENvbW1vbkNvbmZpZywgeyBZelJlZEJhZ0luZm8gfSBmcm9tIFwiLi9Db21tb25Db25maWdcIjtcclxuaW1wb3J0IFdlY2hhdFRvb2wgZnJvbSBcIi4vV2VjaGF0VG9vbFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgT3Bwb1Rvb2wgZnJvbSBcIi4vWVpfVG9vbF9PcHBvXCI7XHJcbmltcG9ydCBZWl9Ub29sX0JhaWR1IGZyb20gXCIuL1laX1Rvb2xfQmFpZHVcIjtcclxuaW1wb3J0IFlaX1Rvb2xfTmF0aXZlIGZyb20gXCIuL1laX1Rvb2xfTmF0aXZlXCI7XHJcbmltcG9ydCBZWl9Ub29sX1Zpdm8gZnJvbSBcIi4vWVpfVG9vbF9WaXZvXCI7XHJcbmltcG9ydCBZWl9Ub29sX0RvdXlpbiBmcm9tIFwiLi9ZWl9Ub29sX0RvdXlpblwiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgQmFubmVyTG9jYXRpb24sIExldmVsU3RhdHVzLCBWaWJyYXRlVHlwZSwgVmlld0xvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFlaX1Rvb2xfUVEgZnJvbSBcIi4vWVpfVG9vbF9RUVwiO1xyXG5pbXBvcnQgWVpfU2hvcnRjdXRXaWRnZXQgZnJvbSBcIi4vWVpfU2hvcnRjdXRXaWRnZXRcIjtcclxuaW1wb3J0IFlaX1Rvb2xfUVRUIGZyb20gXCIuL1laX1Rvb2xfUVRUXCI7XHJcbmltcG9ydCBZWl9Ub29sX1hpYW9taSBmcm9tIFwiLi9ZWl9Ub29sX1hpYW9taVwiO1xyXG5pbXBvcnQgQWxkVXRpbHMgZnJvbSBcIi4vQWxkVXRpbHNcIjtcclxuaW1wb3J0IFlaX1Rvb2xfVUMgZnJvbSBcIi4vWVpfVG9vbF9VQ1wiO1xyXG5pbXBvcnQgWVpfVG9vbF9Db2Nvc3BsYXkgZnJvbSBcIi4vWVpfVG9vbF9Db2Nvc3BsYXlcIjtcclxuaW1wb3J0IFlaX1Rvb2xfNDM5OSBmcm9tIFwiLi9ZWl9Ub29sXzQzOTlcIjtcclxuaW1wb3J0IFlaX1Rvb2xfSU9TIGZyb20gXCIuL1laX1Rvb2xfSU9TXCI7XHJcbmltcG9ydCBZWl9Ub29sX0JpbGkgZnJvbSBcIi4vWVpfVG9vbF9CaWxpXCI7XHJcbmltcG9ydCBZWl9Ub29sX0t3YWkgZnJvbSBcIi4vWVpfVG9vbF9Ld2FpXCI7XHJcbmltcG9ydCBZWl9Ub29sX0Jyb3N3ZXIgZnJvbSBcIi4vWVpfVG9vbF9Ccm9zd2VyXCI7XHJcbmltcG9ydCBZWl9Ub29sX1dpRmkgZnJvbSBcIi4vWVpfVG9vbF9XaWZpXCI7XHJcbmltcG9ydCBZWl9Ub29sX0hhZ28gZnJvbSBcIi4vWVpfVG9vbF9IYWdvXCI7XHJcbmltcG9ydCBSZWRCYWdQcm9ncmVzc1dpZGdldCBmcm9tIFwiLi9SZWRCYWdQcm9ncmVzc1dpZGdldFwiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuaW1wb3J0IFlaX1Rvb2xfSHVhV2VpIGZyb20gXCIuL1laX1Rvb2xfSHVhV2VpXCI7XHJcbmltcG9ydCBPcGVuUmVkQmFnUGFuZWwgZnJvbSBcIi4vT3BlblJlZEJhZ1BhbmVsXCI7XHJcbmltcG9ydCBZWl9Ub29sX0ZhY2VCb29rIGZyb20gXCIuL1laX1Rvb2xfRmFjZUJvb2tcIjtcclxuaW1wb3J0IFl6UmVhbE5hbWVBdXRoUGFuZWwgZnJvbSBcIi4vWXpSZWFsTmFtZUF1dGhQYW5lbFwiO1xyXG5pbXBvcnQgWXpVc2VyUHJpdmFjeVBhbmVsIGZyb20gXCIuL1l6VXNlclByaXZhY3lQYW5lbFwiO1xyXG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xyXG5pbXBvcnQgWXpMb2dpblBhbmVsIGZyb20gXCIuL1l6TG9naW5QYW5lbFwiO1xyXG5pbXBvcnQgWVpfVG9vbF9Hb29nbGVXZWIgZnJvbSBcIi4vWVpfVG9vbF9Hb29nbGVXZWJcIjtcclxuLy9AdHMtaWdub3JlXHJcbmNvbnN0IENyeXB0b0pTID0gcmVxdWlyZShcIi4vRW5jcnlwdC9DcnlwdG9KU1wiKTtcclxuY29uc3Qgc2VjcmV0S2V5ID0gXCJ5b3V6aGl4eDEyMzQ1Njc4XCJcclxuLy9AdHMtaWdub3JlXHJcbi8vIHZhciB1bWEgPSByZXF1aXJlKCcuL1VNZW5nU0RLL3VtYS5qcycpO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgbGV0IHV0aWxzOiBVdGlscyA9IG51bGw7XHJcblxyXG5jb25zdCBVVElMU1ZFUlNJT046IHN0cmluZyA9IFwiMS42LjZcIjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLnu4Tku7bniYjmnKxcIiwgcmVhZG9ubHk6IHRydWUgfSlcclxuICAgIHB1YmxpYyBnZXQgdXRpbHNWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBVVElMU1ZFUlNJT047XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5rWL6K+V5pys5Zyw5pWw5o2uXCIsIHRvb2x0aXA6IFwi5Yu+6YCJ5q2k6YCJ6aG55YiZ5L2/55So5pys5Zyw6YWN572u77yM5ZCm5YiZ5Lya6K+35rGC5pyN5Yqh5Zmo6YWN572uIVwiIH0pXHJcbiAgICBEZWJ1Z0xvYWNhbENvbmZpZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuaYvuekuuaXpeW/l+ahhlwiLCB0b29sdGlwOiBcIuWLvumAieatpOmAiemhueWImeS8muaYvuekuuaXpeW/l+ahhu+8jOeUqOS6juiwg+ivlSFcIiB9KVxyXG4gICAgc2hvd0xvZ1ZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQ29tbW9uQ29uZmlnLCBkaXNwbGF5TmFtZTogXCLphY3nva7kv6Hmga9cIiB9KVxyXG4gICAgY29uZmlnOiBDb21tb25Db25maWcgPSBudWxsO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe6ouWMheS/oeaBr1xyXG4gICAgICovXHJcbiAgICB5elJlZEJhZ0luZm86IFl6UmVkQmFnSW5mbyA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGFkTWFuYWdlcjogQWRNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBfd2VjaGF0VG9vbDogV2VjaGF0VG9vbCA9IG51bGw7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5YWz5Y2hXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjdXJyZW50TGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeaYr+WQpuiDnOWIqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNTdWNjZXNzOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Zyo5b2V5bGP5LitXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1JlY29yZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5r+A5Yqx57uE5Lu25oiQ5Yqf5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXdhcmRDYWxsRnVuYzogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5r+A5Yqx57uE5Lu25YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXdhcmRDbG9zZUZ1bmM6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa/gOWKsee7hOS7tuWOn+Wni+WlluWKsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmV3YXJkVmFsdWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIOW5uOi/kOWuneeuseaYvuekuuasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbHVja0JveFNob3dDb3VudDogbnVtYmVyID0gLTE7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5o+S5bGP5bGV56S655qE5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuYXRpdmVJbnNlcnRTaG93Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogICAgIFxyXG4gICAgICog5Y6f55Sf5o+S5bGP5ruh6Laz5YWz6Zet5oyJ6ZKu6K6+572u5aSn5bCP5p2h5Lu25ZCO5pi+56S655qE5qyh5pWw77yM55So5p2l5Yik5pat6Ze06ZqU5aSa5bCR5qyh5L2/55So5pyN5Yqh5Zmo5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuYXRpdmVJbnNlcnRSZXNpemVDbG9zZUJ0blNob3dDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn0Jhbm5lcuWxleekuueahOasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmF0aXZlQmFubmVyU2hvd0NvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgICBcclxuICAgICAqIOWOn+eUn2Jhbm5lcua7oei2s+WFs+mXreaMiemSruiuvue9ruWkp+Wwj+adoeS7tuWQjuaYvuekuueahOasoeaVsO+8jOeUqOadpeWIpOaWremXtOmalOWkmuWwkeasoeS9v+eUqOacjeWKoeWZqOWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmF0aXZlQmFubmVyUmVzaXplQ2xvc2VCdG5TaG93Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY5oq95aWW5YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0dXJuVGFibGVQYW5lbENsb3NlRnVuYzogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIhuS6q+W9leWxj+e7hOS7tuWFs+mXreWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hhcmVSZWNvcmRQYW5lbENsb3NlRnVuYzogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICDlrp3nrrHlhbPpl63lm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJld2FyZEJveFBhbmVsQ2xvc2VGdW5jOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDlv6vmjbfmoYzpnaLnu4Tku7blhbPpl63lm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJld2FyZFNob3J0Q3V0UGFuZWxDbG9zZUZ1bmM6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICog5o6o6I2Q5ri45oiP57uE5Lu25YWz6Zet5Zue6LCDXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHJld2FyZFJlY0dhbWVQYW5lbENsb3NlRnVuYzogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bm46L+Q5a6d566x57uE5Lu25YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXdhcmRMdWNrQm94UGFuZWxDbG9zZUZ1bmM6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgLy9CYW5uZXLlub/lkYrlhbPpl63nmoTml7bpl7RcclxuICAgIHB1YmxpYyBfYmFubmVyQ2xvc2VUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhbbku5bphY3nva7vvJrljIXlkKvliIbnu4TnmoTkv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfb3RoZXJfY29uZmlnOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgd2VjaGF0VG9vbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3dlY2hhdFRvb2wpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndlY2hhdCB0b29sIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fd2VjaGF0VG9vbDtcclxuICAgIH1cclxuXHJcbiAgICBfb3Bwb1Rvb2w6IE9wcG9Ub29sID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgb3Bwb1Rvb2woKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHBvVG9vbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwib3BwbyB0b29sIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHBvVG9vbDtcclxuICAgIH1cclxuXHJcbiAgICBfdG9vbF9Ld2FpOiBZWl9Ub29sX0t3YWkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBrd2FpVG9vbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfS3dhaSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiS3dhaSB0b29sIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX0t3YWk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Rvb2xfV2lmaTogWVpfVG9vbF9XaUZpID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgd2lmaVRvb2woKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90b29sX1dpZmkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIldpZmkgdG9vbCBpcyBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbF9XaWZpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfdG9vbF9IYWdvOiBZWl9Ub29sX0hhZ28gPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBoYWdvVG9vbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfSGFnbykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiSGFnbyB0b29sIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX0hhZ287XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgX3Rvb2xfQmFpZHU6IFlaX1Rvb2xfQmFpZHUgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBUb29sX0JhaWR1KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG9vbF9CYWlkdSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidG9vbCBiYWlkdSBpcyBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbF9CYWlkdTtcclxuICAgIH1cclxuXHJcbiAgICBfdG9vbF9OYXRpdmU6IFlaX1Rvb2xfTmF0aXZlID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgVG9vbF9OYXRpdmUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90b29sX05hdGl2ZSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidG9vbCBuYXRpdmUgaXMgbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xfTmF0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIF90b29sX1Zpdm86IFlaX1Rvb2xfVml2byA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfVml2bygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfVml2bykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidG9vbCB2aXZvIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX1Zpdm87XHJcbiAgICB9XHJcblxyXG4gICAgX3Rvb2xfRG91eWluOiBZWl9Ub29sX0RvdXlpbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfRG91eWluKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG9vbF9Eb3V5aW4pIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInRvb2wgZG91eWluIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX0RvdXlpbjtcclxuICAgIH1cclxuXHJcbiAgICBfdG9vbF9RUTogWVpfVG9vbF9RUSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfUVEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90b29sX1FRKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0b29sIHFxIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX1FRO1xyXG4gICAgfVxyXG5cclxuICAgIF90b29sX1hpYW9NaTogWVpfVG9vbF9YaWFvbWkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBUb29sX1hpYW9NaSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0b29sIHhpYW9taSBpcyBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbF9YaWFvTWk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Rvb2xfUVRUOiBZWl9Ub29sX1FUVCA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfUVRUKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG9vbF9RVFQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInRvb2wgcXR0IGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX1FUVDtcclxuICAgIH1cclxuXHJcbiAgICBfdG9vbF9VQzogWVpfVG9vbF9VQyA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfVUMoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90b29sX1VDKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0b29sIHVjIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX1VDO1xyXG4gICAgfVxyXG5cclxuICAgIF90b29sX0NvY29zcGxheTogWVpfVG9vbF9Db2Nvc3BsYXkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBUb29sX0NvY29zcGxheSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfQ29jb3NwbGF5KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0b29sIGNvY29zIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX0NvY29zcGxheTtcclxuICAgIH1cclxuICAgIF90b29sXzQzOTk6IFlaX1Rvb2xfNDM5OSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfNDM5OSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfNDM5OSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidG9vbCA0Mzk5IGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sXzQzOTk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Rvb2xfSW9zOiBZWl9Ub29sX0lPUyA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFRvb2xfSU9TKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG9vbF9Jb3MpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInRvb2wgaW9zIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX0lvcztcclxuICAgIH1cclxuXHJcbiAgICBfdG9vbF9iaWxpOiBZWl9Ub29sX0JpbGkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBUb29sX0JpbGkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90b29sX0lvcykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwidG9vbCBpb3MgaXMgbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xfYmlsaTtcclxuICAgIH1cclxuXHJcbiAgICBfdG9vbF9Ccm9zd2VyOiBZWl9Ub29sX0Jyb3N3ZXIgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBUb29sX0Jyb3N3ZXIoKTogWVpfVG9vbF9Ccm9zd2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfQnJvc3dlcikge1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJ0b29sIHF0dCBpcyBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbF9Ccm9zd2VyO1xyXG4gICAgfVxyXG5cclxuICAgIF90b29sX0h1YXdlaTogWVpfVG9vbF9IdWFXZWkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBUb29sX0h1YXdlaSgpOiBZWl9Ub29sX0h1YVdlaSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90b29sX0h1YXdlaSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiaHVhd2VpIHRvb2wgaXMgbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xfSHVhd2VpO1xyXG4gICAgfVxyXG5cclxuICAgIF90b29sX0ZhY2Vib29rOiBZWl9Ub29sX0ZhY2VCb29rID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgVG9vbF9GYWNlYm9vaygpOiBZWl9Ub29sX0ZhY2VCb29rIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Rvb2xfRmFjZWJvb2spIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImZhY2Vib29rIHRvb2wgaXMgbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xfRmFjZWJvb2s7XHJcbiAgICB9XHJcbiAgICBfdG9vbF9Hb29nbGVXZWI6IFlaX1Rvb2xfR29vZ2xlV2ViID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgVG9vbF9Hb29nbGVXZWIoKTogWVpfVG9vbF9Hb29nbGVXZWIge1xyXG4gICAgICAgIGlmICghdGhpcy5fdG9vbF9Hb29nbGVXZWIpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImdvb2dsZVdlYiB0b29sIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sX0dvb2dsZVdlYjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vIOacrOWcsOmFjee9ruaYr+WQpuWIneWni+WMllxyXG4gICAgX2lzQ29uZmlnSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8g5pyN5Yqh5Zmo6YWN572u5piv5ZCm5Yid5aeL5YyWXHJcbiAgICBfaXNTZXJ2ZXJJbml0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/ov5vlhaXml7bpl7RcclxuICAgICAqL1xyXG4gICAgX2dhbWVFbnRyeVRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbphY3nva7mlbDmja5cclxuICAgICAqIEBwYXJhbSBkYXRhIOmFjee9ruaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbml0Q29uZmlnKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruaVsOaNruW3sue7j+WIneWni+WMlu+8jOivt+WLv+mHjeWkjeWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5sb2NhbENvbmZpZykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlnLm90aGVyY29uZmlnLmxvY2FsQ29uZmlnLmpzb24pO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw5pWw5o2u77yaXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5a6J5Y2T6ZyA6KaB5YWI6I635Y+WSk5J77yM5YaN5Y+W5pys5Zyw5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VG9vbHMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNDb25maWdJbml0ID0gdGhpcy5faW5pdExvYWNhbENvbmZpZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQ29uZmlnSW5pdCA9IHRoaXMuX2luaXRMb2FjYWxDb25maWcoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6L+Z5Liq5b+F6aG75Zyo5bm/5ZGK57uE5Lu25LmL5YmN5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VG9vbHMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3RoZXJfY29uZmlnID0gdGhpcy5jb25maWcub3RoZXJjb25maWcubG9jYWxDb25maWcuanNvbi5vdGhlcjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZE1hbmFnZXIgPSBuZXcgQWRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkTWFuYWdlci5Jbml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wcG9Ub29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3Bwb1Rvb2wuaGlkZURlZmF1bHRMb2FkaW5nUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0t3YWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBrd2FpZ2FtZS5yZWFkeUdvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1dGlscy55elJlZEJhZ0luZm8gPSBuZXcgWXpSZWRCYWdJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyU2hvd0xvZyA9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19zaG93X2xvZ192aWV3XCIpID09IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2dUb0NvbnNvbGUgPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwic2hvd19sb2dfdG9fY29uc29sZVwiKSA9PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZWRfYmFnX3RvdGFsX3Byb2dyZXNzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy55elJlZEJhZ0luZm8udG90YWxQcm9ncmVzcyA9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZWRfYmFnX3RvdGFsX3Byb2dyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwicmVkX2JhZ19wcm9ncmVzc19pbmZvc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMueXpSZWRCYWdJbmZvLnByb2dyZXNzSW5mb3MgPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwicmVkX2JhZ19wcm9ncmVzc19pbmZvc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZWRfYmFnX21vbmV5c1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMueXpSZWRCYWdJbmZvLndpdGhkcmF3YU1vbmV5cyA9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZWRfYmFnX21vbmV5c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSGFnbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGcuZ2FtZUxvYWRSZXN1bHQgJiYgaGcuZ2FtZUxvYWRSZXN1bHQoeyBjb2RlOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dNc2coXCLljY7kuLrlsI/muLjmiI/opoHnlKjljY7kuLrljZXni6znmoTnu4Tku7blr7nmjqXvvIHvvIHvvIHvvIHvvIHvvIHvvIHvvIHvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw6YWN572u5paH5Lu25LiN5piv5ZCI5rOV55qEanNvbuaWh+S7tu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDphY3nva7mlofku7bmnKrmib7liLDvvIzor7fmo4Dmn6UgQ29tbW9uVXRpbHMg57uE5Lu25LiK5piv5ZCm5a2Y5Zyo77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0TG9hY2FsQ29uZmlnKGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICB1dGlscyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrnu4Tku7bniYjmnKw6XCIgKyB0aGlzLnV0aWxzVmVyc2lvbik7XHJcbiAgICAgICAgaWYgKCFDQ19ERUJVRykge1xyXG4gICAgICAgICAgICAvLyDmraPlvI/ljIXlhbPpl63mraTpgInpoblcclxuICAgICAgICAgICAgdGhpcy5EZWJ1Z0xvYWNhbENvbmZpZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9nYW1lRW50cnlUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5pys5Zyw6YWN572uXHJcbiAgICAgICAgdGhpcy5faW5pdENvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hZE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRNYW5hZ2VyLk9uVXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUb29scyhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCAmJiAhUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9OYXRpdmUgPSBuZXcgWVpfVG9vbF9OYXRpdmUoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fdG9vbF9OYXRpdmUuaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWNoYXRUb29sID0gbmV3IFdlY2hhdFRvb2woKTtcclxuICAgICAgICAgICAgdGhpcy5fd2VjaGF0VG9vbC5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHBvVG9vbCA9IG5ldyBPcHBvVG9vbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9vcHBvVG9vbC5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9CYWlkdSA9IG5ldyBZWl9Ub29sX0JhaWR1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfQmFpZHUuaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9WaXZvID0gbmV3IFlaX1Rvb2xfVml2bygpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX1Zpdm8uaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0RvdXlpbiA9IG5ldyBZWl9Ub29sX0RvdXlpbigpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0RvdXlpbi5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9RUSA9IG5ldyBZWl9Ub29sX1FRKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfUVEuaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1FUVCkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX1FUVCA9IG5ldyBZWl9Ub29sX1FUVCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX1FUVC5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfWGlhb01pID0gbmV3IFlaX1Rvb2xfWGlhb21pKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfWGlhb01pLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSVNVQykge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX1VDID0gbmV3IFlaX1Rvb2xfVUMoKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9VQy5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklTQ29jb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9Db2Nvc3BsYXkgPSBuZXcgWVpfVG9vbF9Db2Nvc3BsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9Db2Nvc3BsYXkuaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5JczQzOTkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF80Mzk5ID0gbmV3IFlaX1Rvb2xfNDM5OSgpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sXzQzOTkuaW5pdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0lvcyA9IG5ldyBZWl9Ub29sX0lPUygpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0lvcy5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmlsaSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX2JpbGkgPSBuZXcgWVpfVG9vbF9CaWxpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfYmlsaS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0t3YWkgPSBuZXcgWVpfVG9vbF9Ld2FpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfS3dhaS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX1dpZmkgPSBuZXcgWVpfVG9vbF9XaUZpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfV2lmaS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzSGFnbykge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0hhZ28gPSBuZXcgWVpfVG9vbF9IYWdvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfSGFnby5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfSHVhd2VpID0gbmV3IFlaX1Rvb2xfSHVhV2VpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfSHVhd2VpLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNGYWNlQm9vaykge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sX0ZhY2Vib29rID0gbmV3IFlaX1Rvb2xfRmFjZUJvb2soKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9GYWNlYm9vay5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzR29vZ2xlV2ViKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfR29vZ2xlV2ViID0gbmV3IFlaX1Rvb2xfR29vZ2xlV2ViKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfR29vZ2xlV2ViLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNUZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xfQnJvc3dlciA9IG5ldyBZWl9Ub29sX0Jyb3N3ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbF9Ccm9zd2VyLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW7tuaXtuiwg+eUqOWHveaVsFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGRlbGF5IOW7tuaXtuaXtumXtFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVsYXlDYWxsKGNhbGxiYWNrOiBGdW5jdGlvbiwgZGVsYXk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFxyXG4gICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbjxyZXQ6Ym9vbGVhbiwgbXNnOnN0cmluZz4g5YiG5Lqr5Zue6LCDXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2hhcmUoY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX3Rvb2wgJiYgdGhpcy5jdXJfdG9vbC5zaGFyZSAmJiB0aGlzLmN1cl90b29sLnNoYXJlKGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOazqOmUgOa4uOaIj+mAgOWHuuWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2FtZUV4aXRPZmYoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacrOWcsOaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vlvZXlsY9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlY29yZFN0YXJ0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX3Rvb2wgJiYgdGhpcy5jdXJfdG9vbC5yZWNvcmRTdGFydCAmJiB0aGlzLmN1cl90b29sLnJlY29yZFN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ/lvZXlsY9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlY29yZEVuZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl90b29sICYmIHRoaXMuY3VyX3Rvb2wucmVjb3JkRW5kICYmIHRoaXMuY3VyX3Rvb2wucmVjb3JkRW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bliIbkuqvkv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNoYXJlSW5mbygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSAmJiB0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlVGl0bGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogdGhpcy5jb25maWcub3RoZXJjb25maWcuc2hhcmVJbWdVcmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliIbkuqvphY3nva7lh7rplJnvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlua4uOaIj+WGheS6pOWPieaOqOW5v+S/oeaBrywg5ri45oiP5YaF6Lez6L2s57uE5Lu25L2/55SoXHJcbiAgICAgKiBAcmV0dXJucyBvYmplY3Qgb3IgbnVsbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SW5uZXJSZWNvbW1lbmREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnICYmIHRoaXMuU2VydmVyQ29uZmlnLmp1bXBfbGlzdCAmJiB0aGlzLlNlcnZlckNvbmZpZy5qdW1wX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgXCJqdW1wX3JlZnJlc2hfdGltZVwiOiB0aGlzLlNlcnZlckNvbmZpZy5pY29uX2p1bXAsXHJcbiAgICAgICAgICAgICAgICBcImp1bXBfbGlzdFwiOiB0aGlzLlNlcnZlckNvbmZpZy5qdW1wX2xpc3RcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazliLDlhbbku5blsI/muLjmiI9cclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Lqk5Y+J5o6o5bm/5oyC5Lu25YaF5a655L+h5oGvXHJcbiAgICAgICAgICAgIFwiaWNvblwiOiBcImh0dHA6Ly94Y3gueW91bGV0ZC5jb20vaW1nL2ljb24vZmdkeGMucG5nXCIsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIue/u+a7mueahOmmmeiCoOWkp+WGkumZqVwiLFxyXG4gICAgICAgICAgICBcInBhdGhcIjogXCJcIixcclxuICAgICAgICAgICAgXCJqc19qdW1wXCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICBcInFyX2NvZGVcIjogXCJodHRwOi8veGN4LnlvdWxldGQuY29tL2ltZy9xcmNvZGUvcV9mZ2R4Yy5qcGdcIixcclxuICAgICAgICAgICAgXCJhcHBpZFwiOiBcInd4MmM0ZWQ0MjE4MjI0YjA0MlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbihyZXQpIOi3s+i9rOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmF2aWdhdGVUb01pbmlHYW1lKGRhdGE6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc19qdW1wICYmIGRhdGEuaXNfanVtcCA9PSBcInRydWVcIiAmJiBkYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWNoYXRUb29sLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhLmFwcGlkLCBjYWxsYmFjaywgZGF0YS5wYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc19qdW1wICYmIGRhdGEuaXNfanVtcCA9PSBcImZhbHNlXCIgJiYgZGF0YS5xcl9jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWNoYXRUb29sLnByZXZpZXdJbWFnZShkYXRhLnFyX2NvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuYXBwaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3Bwb1Rvb2wubmF2aWdhdGVUb01pbmlHYW1lKGRhdGEuYXBwaWQsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhIOaIluiAhSBhcHBpZCDkuLpudWxsIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9CYWlkdS5uYXZpZ2F0ZVRvTWluaUdhbWUoZGF0YS5hcHBpZCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImRhdGEg5oiW6ICFIGFwcGlkIOS4um51bGwhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5Ub29sX05hdGl2ZS5uYXZpZ2F0ZVRvR2FtZShKU09OLnN0cmluZ2lmeShkYXRhKSwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImRhdGEg5oiW6ICFIGFwcGlkIOS4um51bGwhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVJT1MpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub29sX0lPUy5uYXZpZ2F0ZVRvR2FtZShkYXRhLmFwcGlkLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZGF0YSDmiJbogIUgYXBwaWQg5Li6bnVsbCFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3niYjmnKzmmK/lkKbmlK/mjIHot7PovazliLDlhbbku5blsI/muLjmiI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0IHx8IFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQgfHwgUGxhdFV0aWxzLklzTmF0aXZlSU9TIHx8IFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHBvVG9vbC5pc092ZXJNaW5pVmVyc2lvbihcIjEwNDRcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVG9vbF9Eb3V5aW4uaXNTaG93TW9yZUdhbWVzTW9kYWwoKSAmJiB0aGlzLlRvb2xfRG91eWluLl9zeXNJbmZvLmFwcE5hbWUgIT0gXCJsaXZlX3N0cmVhbVwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xfUVEuaXNPdmVyTWluVmVyc2lvbihcIjEuNy4xXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmtojmga/mj5DnpLpcclxuICAgICAqIEBwYXJhbSBtc2cg5raI5oGv5o+Q56S6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93TXNnKG1zZzogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5Ub29sX0Jyb3N3ZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl90b29sICYmIHRoaXMuY3VyX3Rvb2wuc2hvd1RvYXN0ICYmIHRoaXMuY3VyX3Rvb2wuc2hvd1RvYXN0KG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblt7Lnu4/liJvlu7rov4flv6vmjbfmlrnlvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhc1Nob3J0Y3V0SW5zdGFsbGVkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8gJiYgdGhpcy5Ub29sX1Zpdm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVG9vbF9WaXZvLlNob3J0Y3V0Q3JlYXRlZDtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc09QUE8gJiYgdGhpcy5vcHBvVG9vbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHBvVG9vbC5TaG9ydGN1dENyZWF0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblj6/ku6XliJvlu7rmoYzpnaLlv6vmjbfmlrnlvI8s5bmz5Y+w5piv5ZCm5pSv5oyBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5DcmVhdGVTaG9ydGN1dCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX3Rvb2wgJiYgdGhpcy5jdXJfdG9vbC5jYW5DcmVhdGVTaG9ydGN1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJfdG9vbC5jYW5DcmVhdGVTaG9ydGN1dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rmoYzpnaLlv6vmjbfmlrnlvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVNob3J0Y3V0KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX3Rvb2wgJiYgdGhpcy5jdXJfdG9vbC5jcmVhdGVTaG9ydGN1dCAmJiB0aGlzLmN1cl90b29sLmNyZWF0ZVNob3J0Y3V0KGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmueUqGh0dHDor7fmsYLvvIzlj6rlsIHoo4XkuoZHRVTor7fmsYJcclxuICAgICAqIEBwYXJhbSB1cmwg6K+35rGC55qEdXJs5Zyw5Z2AXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24ocmV0OmJvb2xlYW4sIGRhdGE6c3RyaW5nKSBcclxuICAgICAqIOivt+axgue7k+adn+Wbnuiwg++8jOaIkOWKn3JldOS4unRydWUsIGRhdGHkuLrov5Tlm57nmoTmlbDmja5zdHJpbmfjgIIg5aSx6LSl5Li6cmV05Li6ZmFsc2UsIGRhdGHkuLrnqbogXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb21tb21IdHRwUmVxdWVzdCh1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacrOWcsOaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci50aW1lb3V0ID0gNjAwMDsgICAgLy8g5Y2V5L2N5q+r56eSXHJcbiAgICAgICAgbGV0IHJlcXVlc3RVcmw6IHN0cmluZyA9IHRoaXMuX2J1aWxkU2VydmVyVXJsKHVybCkgKyBgJnRpbWVfc3RhbXA9JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpfSZyZXF2PSR7WVpfQ29uc3RhbnQuU0VSVkVSX1ZFUlNJT059YFxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajlnLDlnYA6XCIgKyByZXF1ZXN0VXJsKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgcmVxdWVzdFVybCk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+35rGC54q25oCB5pS55Y+YLCByZWFlZHlTdGF0ZT1cIiwgeGhyLnJlYWR5U3RhdGUsIFwiOyBzdGF0dXM9XCIsIHhoci5zdGF0dXMpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RVcmwuaW5kZXhPZihcIm09Z1wiKSA+IC0xIHx8IHJlcXVlc3RVcmwuaW5kZXhPZihcIm09cmxldmVsdjNcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayh0cnVlLCB0aGlzLmFlc0RlY3J5cHQoeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayh0cnVlLCB4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLotoXml7YhXCIpO1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLlh7rplJkhIGVycj1cIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYWVzRW5jcnlwdChjb250ZW50KSB7XHJcbiAgICAgICAgbGV0IGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHNlY3JldEtleSk7XHJcbiAgICAgICAgbGV0IHNyY3MgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZShjb250ZW50KTtcclxuICAgICAgICBsZXQgZW5jcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoc3Jjcywga2V5LCB7IG1vZGU6IENyeXB0b0pTLm1vZGUuRUNCLCBwYWRkaW5nOiBDcnlwdG9KUy5wYWQuUGtjczcgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kej5a+G5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gZW5jcnlwdFN0ciDlr4bmlodcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IOaYjuaWh1xyXG4gICAgICovXHJcbiAgICBhZXNEZWNyeXB0KGVuY3J5cHRTdHIpIHtcclxuICAgICAgICBsZXQga2V5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2Uoc2VjcmV0S2V5KTtcclxuICAgICAgICBsZXQgZGVjcnlwdCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGVuY3J5cHRTdHIsIGtleSwgeyBtb2RlOiBDcnlwdG9KUy5tb2RlLkVDQiwgcGFkZGluZzogQ3J5cHRvSlMucGFkLlBrY3M3IH0pO1xyXG4gICAgICAgIHJldHVybiBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkoZGVjcnlwdCkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWinuWKoOW4uOeUqOWtl+autVxyXG4gICAgICovXHJcbiAgICBfYnVpbGRTZXJ2ZXJVcmwodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwiIF9idWlsZFNlcnZlclVybCA+Pj4+Pi5cIik7XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnBhY2thZ2VOYW1lfSZjaGFubmVsPW9wcG8mZGV2aWNlX3VpZD0ke3V0aWxzLm9wcG9Ub29sLnVpZH0mdWlkPSR7dXRpbHMub3Bwb1Rvb2wuc2VydmljZUlkfSZzb3VyY2U9JHt0aGlzLm9wcG9Ub29sLl9zb3VyY2V9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy5vcHBvY29uZmlnLnZlcnNpb259JmRldmljZV9pZD0ke3V0aWxzLm9wcG9Ub29sLl9kZXZpY2VfaWR9YDtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy54aWFvbWlDb25maWcuYXBwSUR9JmNoYW5uZWw9eGlhb21pJmRldmljZV91aWQ9JHt1dGlscy5fdG9vbF9YaWFvTWkudWlkfSZ1aWQ9JHt1dGlscy5fdG9vbF9YaWFvTWkuc2VydmljZUlkfWA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsICsgYCZreXg9dHJ1ZSZhcHBfaWQ9JHt1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmFwcElEfSZjaGFubmVsPXdlY2hhdCZkZXZpY2VfdWlkPSR7dXRpbHMud2VjaGF0VG9vbC51aWR9JnVpZD0ke3V0aWxzLndlY2hhdFRvb2wuc2VydmljZUlkfSZzb3VyY2U9JHt0aGlzLndlY2hhdFRvb2wuX3NvdXJjZV9hcHBfaWR9JnNvdXJlX3R5cGU9JHt0aGlzLndlY2hhdFRvb2wuX2x1YW5jaFR5cGV9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcudmVyc2lvbn1gO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy52aXZvY29uZmlnLmFwcElEfSZjaGFubmVsPXZpdm8mZGV2aWNlX3VpZD0ke3V0aWxzLl90b29sX1Zpdm8udWlkfSZ1aWQ9JHt1dGlscy5fdG9vbF9WaXZvLnNlcnZpY2VJZH0mc291cmNlPSR7dGhpcy5fdG9vbF9WaXZvLl9zb3VyY2V9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy52aXZvY29uZmlnLnZlcnNpb259YFxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIGAma3l4PXRydWUmYXBwX2lkPSR7dXRpbHMuY29uZmlnLnF0dGNvbmZpZy5hcHBJRH0mY2hhbm5lbD1xdXRvdXRpYW8mZGV2aWNlX3VpZD0ke3V0aWxzLl90b29sX1FUVC51aWR9JnVpZD0ke3V0aWxzLl90b29sX1FUVC5zZXJ2aWNlSWR9YFxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIGAma3l4PXRydWUmYXBwX2lkPSR7dXRpbHMuY29uZmlnLmRvdXlpbmNvbmZpZy5hcHBJRH0mY2hhbm5lbD10b3V0aWFvJmRldmljZV91aWQ9JHt1dGlscy5Ub29sX0RvdXlpbi51aWR9JnVpZD0ke3V0aWxzLlRvb2xfRG91eWluLnNlcnZpY2VJZH0mZ2FtZV92ZXJzaW9uPSR7dXRpbHMuY29uZmlnLmRvdXlpbmNvbmZpZy52ZXJzaW9ufWBcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIGAma3l4PXRydWUmYXBwX2lkPSR7dXRpbHMuY29uZmlnLnFxY29uZmlnLmFwcElEfSZjaGFubmVsPXFxJmRldmljZV91aWQ9JHt1dGlscy5fdG9vbF9RUS51aWR9JnVpZD0ke3V0aWxzLl90b29sX1FRLnNlcnZpY2VJZH0mZ2FtZV92ZXJzaW9uPSR7dXRpbHMuY29uZmlnLnFxY29uZmlnLnZlcnNpb259YFxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsICsgYCZreXg9dHJ1ZSZhcHBfaWQ9JHt1dGlscy5jb25maWcuYmFpZHVjb25maWcuYXBwSUR9JmNoYW5uZWw9YmFpZHUmZGV2aWNlX3VpZD0ke3V0aWxzLl90b29sX0JhaWR1LnVpZH0mdWlkPSR7dXRpbHMuX3Rvb2xfQmFpZHUuc2VydmljZUlkfSZnYW1lX3ZlcnNpb249JHt1dGlscy5jb25maWcuYmFpZHVjb25maWcudmVyc2lvbn1gXHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSVNVQykge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy51Y0NvbmZpZy5hcHBJRH0mY2hhbm5lbD11YyZkZXZpY2VfdWlkPSR7dXRpbHMuX3Rvb2xfVUMudWlkfSZ1aWQ9JHt1dGlscy5fdG9vbF9VQy5zZXJ2aWNlSWR9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy51Y0NvbmZpZy52ZXJzaW9ufWBcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5JU0NvY29zKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIGAma3l4PXRydWUmYXBwX2lkPSR7dXRpbHMuY29uZmlnLmNvY29zQ29uZmlnLmFwcElEfSZjaGFubmVsPWNvY29zJmRldmljZV91aWQ9JHt1dGlscy5fdG9vbF9Db2Nvc3BsYXkudWlkfSZ1aWQ9JHt1dGlscy5fdG9vbF9Db2Nvc3BsYXkuc2VydmljZUlkfWBcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsICsgYCZreXg9ZmFsc2UmYXBwX2lkPSR7dXRpbHMuY29uZmlnLm5hdGl2ZUFuZHJvaWRDb25maWcuYXBwSUR9JmNoYW5uZWw9JHt1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy5jaGFubmVsfSZkZXZpY2VfdWlkPSR7dXRpbHMuVG9vbF9OYXRpdmUudWlkfSZ1aWQ9JHt1dGlscy5Ub29sX05hdGl2ZS5zZXJ2aWNlSWR9JmdhbWVfdHlwZT0yJmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy5uYXRpdmVBbmRyb2lkQ29uZmlnLnZlcnNpb259YFxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy5rd2FpQ29uZmlnLmFwcElEfSZjaGFubmVsPWt1YWlzaG91JmRldmljZV91aWQ9JHt1dGlscy5fdG9vbF9Ld2FpLnVpZH0mdWlkPSR7dXRpbHMuX3Rvb2xfS3dhaS5zZXJ2aWNlSWR9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy5rd2FpQ29uZmlnLnZlcnNpb259YFxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIGAma3l4PWZhbHNlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy5uYXRpdmVJb1NDb25maWcuYXBwSUR9JmNoYW5uZWw9aW9zJmRldmljZV91aWQ9JHt1dGlscy5Ub29sX0lPUy51aWR9JnVpZD0ke3V0aWxzLlRvb2xfSU9TLnNlcnZpY2VJZH0mZ2FtZV90eXBlPTImZ2FtZV92ZXJzaW9uPSR7dXRpbHMuY29uZmlnLm5hdGl2ZUlvU0NvbmZpZy52ZXJzaW9ufWBcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1dpRmkpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsICsgYCZreXg9dHJ1ZSZhcHBfaWQ9JHt1dGlscy5jb25maWcud2lmaUNvbmZpZy5hcHBJRH0mY2hhbm5lbD13aWZpJmRldmljZV91aWQ9JHt1dGlscy5fdG9vbF9XaWZpLnVpZH0mdWlkPSR7dXRpbHMuX3Rvb2xfV2lmaS5zZXJ2aWNlSWR9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy53aWZpQ29uZmlnLnZlcnNpb259YFxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzSGFnbykge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy5oYWdvQ29uZmlnLmFwcElEfSZjaGFubmVsPWhhZ28mZGV2aWNlX3VpZD0ke3V0aWxzLl90b29sX0hhZ28udWlkfSZ1aWQ9JHt1dGlscy5fdG9vbF9IYWdvLnNlcnZpY2VJZH0mZ2FtZV92ZXJzaW9uPSR7dXRpbHMuY29uZmlnLmhhZ29Db25maWcudmVyc2lvbn1gXHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsICsgYCZreXg9dHJ1ZSZhcHBfaWQ9JHt1dGlscy5jb25maWcuaHVhd2VpQ29uZmlnLmFwcElEfSZjaGFubmVsPWh1YXdlaSZkZXZpY2VfdWlkPSR7dXRpbHMuVG9vbF9IdWF3ZWkudWlkfSZ1aWQ9JHt1dGlscy5Ub29sX0h1YXdlaS5zZXJ2aWNlSWR9JmdhbWVfdmVyc2lvbj0ke3V0aWxzLmNvbmZpZy5odWF3ZWlDb25maWcudmVyc2lvbn1gXHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNGYWNlQm9vaykge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBgJmt5eD10cnVlJmFwcF9pZD0ke3V0aWxzLmNvbmZpZy5mYWNlQm9va0NvbmZpZy5hcHBJRH0mY2hhbm5lbD1mYWNlYm9va3h5eCZkZXZpY2VfdWlkPSR7dXRpbHMuVG9vbF9GYWNlYm9vay51aWR9JnVpZD0ke3V0aWxzLlRvb2xfRmFjZWJvb2suc2VydmljZUlkfSZnYW1lX3ZlcnNpb249JHt1dGlscy5jb25maWcuZmFjZUJvb2tDb25maWcudmVyc2lvbn1gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXlsI/muLjmiI/ot7Povazngrnlh7vmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3REYXRhKG90aGVyR2FtZUFwcElkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl90b29sICYmIHRoaXMuY3VyX3Rvb2wucG9zdERhdGEgJiYgdGhpcy5jdXJfdG9vbC5wb3N0RGF0YShvdGhlckdhbWVBcHBJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozmnI3liqHlmajliJ3lp4vljJblrozmiJDkuovku7ZcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWdpc3RlclNlcnZlckluaXRFdmVudChjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacrOWcsOaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc1NlcnZlckluaXQpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5vbihZWl9Db25zdGFudC5FQ19TZXJ2ZXJJbml0LCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozmnI3liqHlmajliJ3lp4vljJblrozmiJDkuovku7ZcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWdpc3RlclNlcnZlckRhdGFMb2FkU3VjY2Vzc0V2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VydmVyTG9hZFN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5vbihZWl9Db25zdGFudC5FQ19TZXJ2ZXJEYXRhTG9hZFN1Y2Nlc3MsIGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozpmpDnp4HlvLnnqpflhbPpl63kuovku7ZcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWdpc3RlclByaXZhY3lDbG9zZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpIHtcclxuXHJcbiAgICAgICAgbGV0IHlzeHkgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5ZWl9HQU1FX1lTWFkpO1xyXG4gICAgICAgIGlmICh5c3h5KSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuWVpfUHJpdmFjeUNsb3NlLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDkuIrmiqXkupLmjqjnu4Tku7bmlbDmja5cclxuICAgICogQHBhcmFtIG90aGVyR2FtZUFwcElkIOi3s+i9rOeahElEXHJcbiAgICAqIEBwYXJhbSBsb2NhdGlvbiDlvZPliY3kvY3nva5cclxuICAgICogQHBhcmFtIHN0YXR1cyAwOueCueWHu++8jDE66Lez6L2s5oiQ5YqfXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHBvc3REYXRhQnlMb2NhdGlvbihvdGhlckdhbWVBcHBJZDogc3RyaW5nLCBsb2NhdGlvbjogc3RyaW5nLCBzdGF0dXM6IG51bWJlciA9IDApIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVG9vbF9CYWlkdSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub29sX0JhaWR1LnBvc3REYXRhKG90aGVyR2FtZUFwcElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3Rvb2wgJiYgdGhpcy5jdXJfdG9vbC5wb3N0RGF0YUJ5TG9jYXRpb24gJiYgdGhpcy5jdXJfdG9vbC5wb3N0RGF0YUJ5TG9jYXRpb24ob3RoZXJHYW1lQXBwSWQsIGxvY2F0aW9uLCBzdGF0dXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAqIOS4iuaKpeS6kuaOqOe7hOS7tuaVsOaNrlxyXG4gICogQHBhcmFtIG90aGVyR2FtZUFwcElkIOi3s+i9rOeahElEXHJcbiAgKiBAcGFyYW0gbG9jYXRpb24g5b2T5YmN5L2N572uXHJcbiAgKiBAcGFyYW0gc3RhdHVzIDA654K55Ye777yMMTrot7PovazmiJDlip9cclxuICAqL1xyXG4gICAgcHVibGljIHBvc3RSZWNvbW1lbnRTaG93RGF0YShsb2NhdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacrOWcsOaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJfdG9vbCAmJiB0aGlzLmN1cl90b29sLnBvc3RSZWNvbW1lbnRTaG93RGF0YSAmJiB0aGlzLmN1cl90b29sLnBvc3RSZWNvbW1lbnRTaG93RGF0YShsb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jplIDmnI3liqHlmajliJ3lp4vljJblrozmiJDkuovku7ZcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2lzU2VydmVyTG9hZFN1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgeacjeWKoeWZqOWIneWni+WMluWujOavleS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW1pdFNlcnZlckluaXRFdmVudCgpIHtcclxuXHJcbiAgICAgICAgLy8gaWYgKFBsYXRVdGlscy5Jc1Rlc3QpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5nZXRDb25maWdCeUtleShcImlzX3ByaXZhY3lfcGFuZWwgPSBcInRydWVcIjtcclxuICAgICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dQcml2YWN5UGFuZWwoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1NlcnZlckxvYWRTdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFlaX0NvbnN0YW50LkVDX1NlcnZlckRhdGFMb2FkU3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5yZWdpc3RlclByaXZhY3lDbG9zZUV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2VydmVySW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoWVpfQ29uc3RhbnQuRUNfU2VydmVySW5pdCk7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnRhcmdldE9mZihZWl9Db25zdGFudC5FQ19TZXJ2ZXJEYXRhTG9hZFN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYoWVpfQ29uc3RhbnQuWVpfUHJpdmFjeUNsb3NlKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc1NlcnZlckluaXQgPSB0cnVlO1xyXG4gICAgICAgIGNjLmdhbWUuZW1pdChZWl9Db25zdGFudC5FQ19TZXJ2ZXJJbml0KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgKiDms6jlhozlrp7lkI3liLborqTor4HlhbPpl63kuovku7ZcclxuICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICogQHBhcmFtIHRhcmdldCBcclxuICAgKi9cclxuICAgIHB1YmxpYyByZWdpc3RlclJlYWxOYW1lQXV0aENsb3NlRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uLCB0YXJnZXQ6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNTZXJ2ZXJMb2FkU3VjY2Vzcykge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5nYW1lLm9uKFlaX0NvbnN0YW50LkVDX1JlYWxOYW1lQXV0aFBhbmVsQ2xvc2UsIGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW1pdFJlYWxOYW1lQXV0aENsb3NlRXZlbnQoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KFlaX0NvbnN0YW50LkVDX1JlYWxOYW1lQXV0aFBhbmVsQ2xvc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB6ZqQ56eB56Gu6K6k5by556qX5YWz6Zet5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbWl0UHJpdmFjeUNsb3NlRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5faXNTZXJ2ZXJJbml0ID0gdHJ1ZTtcclxuICAgICAgICBjYy5nYW1lLmVtaXQoWVpfQ29uc3RhbnQuWVpfUHJpdmFjeUNsb3NlKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS6pOWPieaOqOW5v+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tb25kR2FtZUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacrOWcsOaVsOaNruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAodGhpcy5jdXJfdG9vbCAmJiB0aGlzLmN1cl90b29sLmdldFJlY29tbW9uZEdhbWVMaXN0KSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLmN1cl90b29sLmdldFJlY29tbW9uZEdhbWVMaXN0KCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2VjaGF0VG9vbC5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHBvVG9vbC5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVG9vbF9CYWlkdS5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Ub29sX05hdGl2ZS5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRvb2xfRG91eWluLmdldFJlY29tbW9uZEdhbWVMaXN0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlRvb2xfQnJvc3dlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Ub29sX0Jyb3N3ZXIuZ2V0UmVjb21tb25kR2FtZUxpc3QoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Ub29sX0lPUy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLrlupXpg6jmm7TlpJrmuLjmiI9iYW5uZXLliJfooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU2hvd1JlY29tbW9uZEdhbWVzQmFubmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuVG9vbF9Ccm9zd2VyKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLlNlcnZlckNvbmZpZy5pc19ib3R0b21fYmFubmVyX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pc19ib3R0b21fYmFubmVyX2xpc3QgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImlzX2JvdHRvbV9iYW5uZXJfbGlzdCDlj4LmlbDkuLpmYWxzZe+8jOW6lemDqOabtOWkmua4uOaIj+aoquW5hee7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLphY3nva7kuK3msqHmnIkgaXNfYm90dG9tX2Jhbm5lcl9saXN0IOWPguaVsO+8jOW6lemDqOabtOWkmua4uOaIj+aoquW5hee7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIzlupXpg6jmm7TlpJrmuLjmiI/mqKrluYXnu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWNvbW1lbmRHYW1lc0Jhbm5lcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuW6lemDqOaOqOiNkOa4uOaIj0Jhbm5lclxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqIOWPguaVsOaYr+S4gOS4quWvueixoS5cclxuICAgICAqIHtcclxuICAgICAqIGdyb3VwOnN0cmluZyAgLy/nu4Tku7bmiYDlnKjnmoTnu4TjgIJcclxuICAgICAqIHNjYWxlOm51bWJlciAgLy/nu4Tku7bnmoTnvKnmlL7lgLzjgIJcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcihwYXJhbXM6IGFueSA9IG51bGwpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLroh6rlrprkuYliYW5uZXIhXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnJlY29tbWVuZEdhbWVzQmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFubmVyTm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnJlY29tbWVuZEdhbWVzQmFubmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYW5uZXJOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlY29tbWVuZEdhbWVzQmFubmVyICYmIGNjLmlzVmFsaWQodGhpcy5fcmVjb21tZW5kR2FtZXNCYW5uZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZEdhbWVzQmFubmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kR2FtZXNCYW5uZXIgPSBiYW5uZXJOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZEdhbWVzQmFubmVyLnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJOb2RlLmdyb3VwID0gcGFyYW1zLmdyb3VwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lck5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChiYW5uZXJOb2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgUmVjb21tZW5kR2FtZXNCYW5uZXIsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC8IVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5bqV6YOo5o6o6I2Q5ri45oiPQmFubmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlUmVjb21tZW5kR2FtZXNCYW5uZXIoKSB7XHJcbiAgICAgICAgbGV0IGJhbm5lcjogY2MuTm9kZSA9IGNjLmZpbmQoXCJSZWNvbW1lbmRHYW1lc0Jhbm5lclwiKTtcclxuICAgICAgICBpZiAoYmFubmVyKSB7XHJcbiAgICAgICAgICAgIGJhbm5lci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLrmjqjojZDmuLjmiI/liJfooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU2hvd1JlY29tbW9uZEdhbWVzTGlzdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuVG9vbF9Ccm9zd2VyKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmlzX2Jhbm5lcl9saXN0XHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLlNlcnZlckNvbmZpZy5pc19iYW5uZXJfbGlzdCA9PSBcInRydWVcIlxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5TZXJ2ZXJDb25maWcuanVtcF9saXN0XHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLlNlcnZlckNvbmZpZy5qdW1wX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+356Gu6K6k5a2X5q6177yaaXNfYmFubmVyX2xpc3TjgIFqdW1wX2xpc3Qg5piv5ZCm6L6+5Yiw5pi+56S66Ieq5a6a5LmJYmFubmVy55qE6KaB5rGCIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIzmm7TlpJrmuLjmiI/liJfooajnu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVjb21tZW5kR2FtZXNMaXN0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65LqS5o6o5rua5Yqo5p2hXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgKiBgYGBcclxuICAgICAqIHtcclxuICAgICAqIGdyb3VwOnN0cmluZyAgICAgLy8g57uE5Lu25omA5Zyo55qE57uEXHJcbiAgICAgKiBib3R0b206bnVtYmVyICAgIC8vIOe7hOS7tui3neemu+Wxj+W5leS4i+i+ueeahOi3neemu1xyXG4gICAgICogbGVmdDpudW1iZXIgICAgICAvLyDnu4Tku7bot53nprvlsY/luZXlt6bovrnnmoTot53nprtcclxuICAgICAqIHNjYWxlOm51bWJlciAgICAgLy8g57uE5Lu255qE57yp5pS+5q+U5L6LXHJcbiAgICAgKiBwYXJlbnQ6Y2MuTm9kZSAgIC8vIOeItuiKgueCuSzms6jmhI/vvJrlpoLmnpzkuI3kvKDmraTlj4LmlbDvvIzliJnlv4XpobvmjqXmlLbov5Tlm57lgLzvvIzlubblsIblhbbliqDlhaXliLDniLboioLngrnkuK3vvIzlkKbliJnnu4Tku7bkuI3kvJrmmL7npLrjgIJcclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1JlY29tbWVuZEdhbWVzTGlzdChwYXJhbXM6IGFueSA9IG51bGwpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcucmVjb21tZW5kR2FtZXNCYXIpIHtcclxuICAgICAgICAgICAgbGV0IGJhck5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZWNvbW1lbmRHYW1lc0Jhcik7XHJcbiAgICAgICAgICAgIGlmIChiYXJOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVjb21tZW5kR2FtZXNMaXN0ICYmIGNjLmlzVmFsaWQodGhpcy5fcmVjb21tZW5kR2FtZXNMaXN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZEdhbWVzTGlzdC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvbW1lbmRHYW1lc0xpc3QgPSBiYXJOb2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kR2FtZXNMaXN0LnpJbmRleCA9IDk5OTk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gYmFyTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJOb2RlLmdyb3VwID0gcGFyYW1zLmdyb3VwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNjYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFyTm9kZS5zY2FsZSA9IHBhcmFtcy5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy50b3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC50b3AgPSBwYXJhbXMudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmJvdHRvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IHBhcmFtcy5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmxlZnQgPSBwYXJhbXMubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnJpZ2h0ID0gcGFyYW1zLnJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhck5vZGUucGFyZW50ID0gcGFyYW1zLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhck5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIFJlY29tbWVuZEdhbWVzQmFyLCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvCAhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOmakOiXj+S6kuaOqOa7muWKqOadoVxyXG4gICAgKiBAcGFyYW0gX3RyeUdhbWVzV2lkZ2V0IOabtOWkmua4uOaIj+aMguS7tlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBoaWRlUmVjb21tZW5kR2FtZXNMaXN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvbW1lbmRHYW1lc0xpc3QgJiYgY2MuaXNWYWxpZCh0aGlzLl9yZWNvbW1lbmRHYW1lc0xpc3QpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZEdhbWVzTGlzdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pi+56S66K+V546p5oyC5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1Nob3dUcnlHYW1lc1dpZGdldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuVG9vbF9Ccm9zd2VyKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLndlY2hhdFRvb2xcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLmljb25fanVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5pY29uX2p1bXAgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCJpY29uX2p1bXDlj4LmlbDkuLpmYWxzZe+8jOivleeOqea4uOaIj+aMguS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpY29uX2p1bXDlj4LmlbDvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM6K+V546p5ri45oiP5oyC5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLmljb25fanVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCh1dGlscy5vcHBvVG9vbC5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcImljb25fanVtcOWPguaVsOS4umZhbHNl77yM6K+V546p5oiP5oyC5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWljb25fanVtcOWPguaVsO+8jOivleeOqea4uOaIj+aMguS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfQmFpZHVcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5Ub29sX0JhaWR1LlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfQmFpZHUuU2VydmVyQ29uZmlnLmljb25fanVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0JhaWR1LlNlcnZlckNvbmZpZy5pY29uX2p1bXAgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCJpY29uX2p1bXDlj4LmlbDkuLpmYWxzZe+8jOabtOWkmua4uOaIj+aMguS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpY29uX2p1bXDlj4LmlbDvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM6K+V546p5ri45oiP5oyC5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX05hdGl2ZVxyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9OYXRpdmUuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5Ub29sX05hdGl2ZS5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodXRpbHMuVG9vbF9OYXRpdmUuU2VydmVyQ29uZmlnLmljb25fanVtcCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJanVtcExpc3Tlj4LmlbDvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0RvdXlpbiAmJiB1dGlscy5Ub29sX0RvdXlpbi5pc1Nob3dNb3JlR2FtZXNNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9Eb3V5aW4uU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9Eb3V5aW4uU2VydmVyQ29uZmlnLmljb25fanVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0RvdXlpbi5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaWNvbl9qdW1w5Y+C5pWw5Li6ZmFsc2XvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaWNvbl9qdW1w5Y+C5pWw77yM6K+V546p5ri45oiP5oyC5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jOivleeOqea4uOaIj+aMguS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9RUVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfUVEuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9RUS5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfUVEuU2VydmVyQ29uZmlnLmljb25fanVtcCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcImljb25fanVtcOWPguaVsOS4umZhbHNl77yM6K+V546p5ri45oiP5oyC5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWljb25fanVtcOWPguaVsO+8jOivleeOqea4uOaIj+aMguS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfSU9TXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5Ub29sX0lPUy5TZXJ2ZXJDb25maWdcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfSU9TLlNlcnZlckNvbmZpZy5pY29uX2p1bXApIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0lPUy5TZXJ2ZXJDb25maWcuaWNvbl9qdW1wID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaWNvbl9qdW1w5Y+C5pWw5Li6ZmFsc2XvvIzor5XnjqnmuLjmiI/mjILku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaWNvbl9qdW1w5Y+C5pWw77yM6K+V546p5ri45oiP5oyC5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF90cnlHYW1lc1dpZGdldDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuivleeOqeaMguS7tlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqIGBgYFxyXG4gICAgICoge1xyXG4gICAgICogZ3JvdXA6c3RyaW5nXHJcbiAgICAgKiBsZWZ0Om51bWJlclxyXG4gICAgICogYm90dG9tOm51bWJlclxyXG4gICAgICogc2NhbGU6bnVtYmVyXHJcbiAgICAgKiBwYXJlbnQ6Y2MuTm9kZVxyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKiBAcmV0dXJucyDnlJ/miJDnmoTnu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dUcnlHYW1lc1dpZGdldChwYXJhbXM6IGFueSA9IG51bGwpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1dGlscy5pc1Nob3dUcnlHYW1lc1dpZGdldCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubG9jYXRpb24gJiYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJ0cnlfZ2FtZV93aWRnZXRfbG9jYXRpb25zXCIpLmluZGV4T2YocGFyYW1zLmxvY2F0aW9uKSA8IDApKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5L2N572u5pyN5Yqh5Zmo5pyq6YWN572u5pi+56S66K+V546p5oyC5Lu277yBXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyeUdhbWVzV2lkZ2V0ICYmIGNjLmlzVmFsaWQodGhpcy5fdHJ5R2FtZXNXaWRnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJ5R2FtZXNXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnRyeUdhbWVzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnRyeUdhbWVzV2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyeUdhbWVzV2lkZ2V0ICYmIGNjLmlzVmFsaWQodGhpcy5fdHJ5R2FtZXNXaWRnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyeUdhbWVzV2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJ5R2FtZXNXaWRnZXQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyeUdhbWVzV2lkZ2V0LnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdyb3VwID0gcGFyYW1zLmdyb3VwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHBhcmFtcy5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHBhcmFtcy50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmJvdHRvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IHBhcmFtcy5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQubGVmdCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnJpZ2h0ID0gcGFyYW1zLnJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyYW1zLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIFRyeUdhbWVzV2lkZ2V0LCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvCAhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuS4jeaUr+aMgei3s+i9rOe7hOS7tlwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+abtOWkmua4uOaIj+aMguS7tlxyXG4gICAgICogQHBhcmFtIF90cnlHYW1lc1dpZGdldCDmm7TlpJrmuLjmiI/mjILku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVUcnlHYW1lc1dpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHJ5R2FtZXNXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl90cnlHYW1lc1dpZGdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJ5R2FtZXNXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pi+56S65pu05aSa5ri45oiP5L6n6L655qCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1Nob3dNb3JlR2FtZXNXaWRnZXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlRvb2xfQnJvc3dlciB8fCBDQ19ERUJVRykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0bmF2aWdhdGVUb01pbmlHYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwiaXNfbW9yZV9nYW1lXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpc19tb3JlX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19tb3JlX2dhbWVcIikgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLnNob3dfb3Bwb19yZWMgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1dGlscy5vcHBvVG9vbC5jYW5TaG93UmVjb21tZW5kKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlvZPliY3lubPlj7DkuI3mlK/mjIHlrpjmlrnkupLmjqjvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpc19tb3JlX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0FuZHJvaWRcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImlzX21vcmVfZ2FtZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaXNfbW9yZV9nYW1l5Y+C5pWw77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImlzX21vcmVfZ2FtZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaXNfbW9yZV9nYW1l5Y+C5pWw77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImlzX21vcmVfZ2FtZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaXNfbW9yZV9nYW1l5Y+C5pWw77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzNDM5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19tb3JlX2dhbWVcIikgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX21vcmVfZ2FtZeWPguaVsO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwiaXNfbW9yZV9nYW1lXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpc19tb3JlX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19tb3JlX2dhbWVcIikgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX21vcmVfZ2FtZeWPguaVsO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX21vcmVHYW1lc1NpZGVQYW5lbDogYW55ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65pu05aSa5ri45oiP5L6n6L655qCPXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICogYGBgXHJcbiAgICAgKiB7XHJcbiAgICAgKiBncm91cDpzdHJpbmcgICAgLy8g57uE5Lu25omA5Zyo55qE57uEIFxyXG4gICAgICogbGVmdDpudW1iZXIgICAgICAvLyDnu4Tku7bot53nprvlsY/luZXlt6bovrnnmoTot53nprtcclxuICAgICAqIHJpZ2h0Om51bWJlciAgICAgLy8g57uE5Lu26Led56a75bGP5bmV5Y+z6L6555qE6Led56a7XHJcbiAgICAgKiB0b3A6bnVtYmVyICAgICAgIC8vIOi3neemu+Wxj+W5lemhtumDqOeahOi3neemu1xyXG4gICAgICogYm90dG9tOm51bWJlciAgICAvLyDot53nprvlsY/luZXlupXpg6jnmoTot53nprtcclxuICAgICAqIHNjYWxlOm51bWJlciAgICAgLy8g57yp5pS+5q+U5L6LXHJcbiAgICAgKiBwYXJlbnQ6Y2MuTm9kZSAgIC8vIOeItuiKgueCuVxyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93TW9yZUdhbWVzV2lkZ2V0KHBhcmFtczogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sb2NhdGlvbiAmJiAodGhpcy5nZXRDb25maWdCeUtleShcIm1vcmVfZ2FtZV93aWRnZXRfbG9jYXRpb25zXCIpLmluZGV4T2YocGFyYW1zLmxvY2F0aW9uKSA8IDApKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3kvY3nva7mnI3liqHlmajmnKrphY3nva7mmL7npLrmm7TlpJrmuLjmiI/mjILku7bvvIFcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfRG91eWluKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93TW9yZUdhbWVzV2lkZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9Eb3V5aW4uaXNTaG93TW9yZUdhbWVzTW9kYWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcubW9yZUdhbWVzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLm1vcmVHYW1lc1dpZGdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsLnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdyb3VwID0gcGFyYW1zLmdyb3VwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHBhcmFtcy5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHBhcmFtcy50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmJvdHRvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IHBhcmFtcy5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQubGVmdCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnJpZ2h0ID0gcGFyYW1zLnJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyYW1zLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIE1vcmVHYW1lc1dpZGdldCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gdXRpbHMuVG9vbF9Eb3V5aW4uc2hvd01vcmVHYW1lc0J1dHRvbihwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbCA9IGJ0bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG4ucGFyZW50ID0gcGFyYW1zLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5bmz5Y+w54mI5pys5LiN5pSv5oyB5Lqk5Y+J5o6o5bm/LCDmm7TlpJrmuLjmiI/mjInpkq7kuI3mmL7npLohXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU2hvd01vcmVHYW1lc1dpZGdldCgpKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5tb3JlR2FtZXNXaWRnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLm1vcmVHYW1lc1dpZGdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsID0gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsLnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWRnZXQ6IGNjLldpZGdldCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHBhcmFtcy50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQubGVmdCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgTW9yZUdhbWVzV2lkZ2V0LCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLkuI3lj6/mmL7npLrmm7TlpJrmuLjmiI/kvqfovrnmoI9cIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5L6n6L655qCP5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbW9yZUdhbWVCdG4g5pu05aSa5ri45oiP5L6n6L655qCP5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlTW9yZUdhbWVzV2lkZ2V0KG1vcmVHYW1lQnRuPzogYW55KSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBpZiAobW9yZUdhbWVCdG4gJiYgY2MuaXNWYWxpZChtb3JlR2FtZUJ0bikpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVHYW1lQnRuLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG1vcmVHYW1lQnRuICYmIGNjLmlzVmFsaWQobW9yZUdhbWVCdG4pKSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlR2FtZUJ0bi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9vbF9WaXZvICYmIHRoaXMuVG9vbF9WaXZvLmhpZGVHYW1lUG9ydGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9tb3JlR2FtZXNTaWRlUGFuZWxCYWlkdTogYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBzaG93QmFpZHVNb3JlR2FtZXNCdG4ocGFyYW1zOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9CYWlkdVxyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9CYWlkdS5jYW5TaG93UmVjb21tZW5kQnV0dG9uKCkpIHtcclxuICAgICAgICAgICAgICAgIGlzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM55m+5bqm5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0JhaWR1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9IHV0aWxzLlRvb2xfQmFpZHUuc2hvd1JlY29tbWVuZGF0aW9uQnV0dG9uKHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW9yZUdhbWVzU2lkZVBhbmVsQmFpZHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbEJhaWR1LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3JlR2FtZXNTaWRlUGFuZWxCYWlkdSA9IGJ0bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vcmVHYW1lc1NpZGVQYW5lbEJhaWR1O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW5s+WPsOeJiOacrOS4jeaUr+aMgeS6pOWPieaOqOW5vywg55m+5bqm5pu05aSa5ri45oiP5oyJ6ZKu5LiN5pi+56S6IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVCYWlkdU1vcmVHYW1lc0J0bihtb3JlR2FtZUJ0bjogYW55KSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1ICYmIG1vcmVHYW1lQnRuKSB7XHJcbiAgICAgICAgICAgIGlmIChtb3JlR2FtZUJ0biAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlR2FtZUJ0bi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLrlvZXlsY/nu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU2hvd1JlY29yZFdpZGdldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuVG9vbF9Ccm9zd2VyKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcInNob3dfcmVjb3JkXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5LiN5pi+56S65b2V5bGP5oyJ6ZKu77yBXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMua3dhaVRvb2wgJiYgdXRpbHMua3dhaVRvb2wuY2hlY2tDYW5TaG93UmVjb3JlZCgpICYmIHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJzaG93X3JlY29yZFwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruS4jeaYvuekuuW9leWxj+aMiemSru+8gVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGhpZGVSZWNvcmRXaWRnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZFdpZGdldCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3JlY29yZFdpZGdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkV2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVjb3JkV2lkZ2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65b2V5bGP5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1JlY29yZFdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dSZWNvcmRXaWRnZXQoKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcucmVjb3JkV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb25maWcub3RoZXJjb25maWcucmVjb3JkV2lkZ2V0KTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWNvcmRXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl9yZWNvcmRXaWRnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkV2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZFdpZGdldCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRXaWRnZXQuekluZGV4ID0gOTk5OTtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXQ6IGNjLldpZGdldCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5zY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHBhcmFtcy50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuYm90dG9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQubGVmdCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnJpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQucmlnaHQgPSBwYXJhbXMucmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJhbXMucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacquaJvuWIsOmihOWItuS9kyBSZWNvcmRXaWRnZXQsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLrliJvlu7rlv6vmjbfmlrnlvI/mjqfku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU2hvd0NyZWF0ZVNob3J0Y3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDmlbDmja7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5Ub29sX0Jyb3N3ZXIpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkNyZWF0ZVNob3J0Y3V0KCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19kZXNrdG9wXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLphY3nva7mlbDmja7kuK3msqHmnIkgaXNfZGVza3RvcCDlrZfmrrXvvIwg5Yib5bu65b+r5o235pa55byP5oyJ6ZKu5LiN5pi+56S6IVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DniYjmnKzkuI3mlK/mjIHliJvlu7rmoYzpnaLlv6vmjbfmlrnlvI8sIOWIm+W7uuW/q+aNt+aWueW8j+aMiemSruS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfc2hvcnRjdXRXaWRnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rlv6vmjbfmlrnlvI9cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDngrnlh7vliJvlu7rlv6vmjbfmlrnlvI/mjInpkq7lkI7lm57osIPlh73mlbAgRnVuY3Rpb248cmV0OmJvb2xlYW4+XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0NyZWF0ZVNob3J0Y3V0V2lkZ2V0KGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwsIHBhcmFtczogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzU2hvd0NyZWF0ZVNob3J0Y3V0V2lkZ2V0KCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnNob3J0Y3V0V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnNob3J0Y3V0V2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3J0Y3V0V2lkZ2V0ICYmIGNjLmlzVmFsaWQodGhpcy5fc2hvcnRjdXRXaWRnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0Y3V0V2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRXaWRnZXQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0Y3V0V2lkZ2V0LnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvcnRjdXRXaWRnZXQ6IFlaX1Nob3J0Y3V0V2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoXCJZWl9TaG9ydGN1dFdpZGdldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvcnRjdXRXaWRnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRjdXRXaWRnZXQuQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNjYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gcGFyYW1zLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuYm90dG9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gcGFyYW1zLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnJpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQucmlnaHQgPSBwYXJhbXMucmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJhbXMucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIFNob3J0Y3V0V2lkZ2UsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuS4jeaYvuekuuWIm+W7uuahjOmdouWbvuagh1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/lv6vmjbfmlrnlvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVDcmVhdGVTaG9ydGN1dFdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvcnRjdXRXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl9zaG9ydGN1dFdpZGdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5rOo5YaM5LqL5Lu2LOS6i+S7tuWcqFlaX0NvbnN0YW5057G75Lit5a6a5LmJXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIDogc3RyaW5nIOS6i+S7tuWQjSDkuovku7blnKggWVpfQ29uc3RhbnQg57G75Lit5a6a5LmJXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IDogY2MuTm9kZSDnm67moIflr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIWV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiW1V0aWxzLnJlZ2lzdGVyRXZlbnRdIHBhcmFtIGV2ZW50TmFtZSBpcyBudWxsIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCJbVXRpbHMucmVnaXN0ZXJFdmVudF0gcGFyYW0gY2FsbGJhY2sgaXMgbnVsbCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIltVdGlscy5yZWdpc3RlckV2ZW50XSBwYXJhbSB0YXJnZXQgaXMgbnVsbCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLmdhbWUub24oZXZlbnROYW1lLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPlua2iOazqOWGjOS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSDkuovku7blkI1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVucmVnaXN0ZXJFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGV2ZW50TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIHkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUg5LqL5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbWl0Q29tbW9uRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjYy5nYW1lLmVtaXQoZXZlbnROYW1lKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIF9nYW1lQm94OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICog5pi+56S65ri45oiP55uS5a2QXHJcbiAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNob3dHYW1lQm94KHBhcmFtczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgbGV0IGlzU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLm9wZW5Cb3hcIix1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5vcGVuQm94KVxyXG4gICAgICAgICAgICBpZiAodXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWcgJiYgdXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWcub3BlbkJveCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLm9wZW5Cb3ggIT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5ri45oiP55uS5a2Q6YWN572u5Li65YWz6Zet54q25oCB77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7muLjmiI/nm5LlrZDkuLrmiZPlvIDnirbmgIFcIik7XHJcbiAgICAgICAgICAgICAgICBpc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNob3dUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG5ldyBEYXRlKFwiMjAxOS0xMC0yM1wiKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd1RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5pe26Ze05aSn5LqO5oyH5a6a5pe26Ze077yM5Y+v5Lul5pi+56S65ri45oiP55uS5a2QXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNTaG93KSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5p2h5Lu25LiN5ruh6Laz6KaB5rGC77yM5ri45oiP55uS5a2Q5LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb25maWcub3RoZXJjb25maWcuZ2FtZUJveCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2FtZUJveCAmJiBjYy5pc1ZhbGlkKHRoaXMuX2dhbWVCb3gpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2FtZUJveC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lQm94ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVCb3guekluZGV4ID0gOTk5OTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIEdhbWVCb3gsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBfbmF0aXZlVHJ5R2FtZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgdHJ5R2FtZURhdGU6IGFueVtdID0gW107XHJcbiAgICBuYXRpdmVOZWVkQ2hhbmdlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlzU2hvd05hdGl2ZVRyeUdhbWVzV2lkZ2V0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLlRvb2xfQnJvc3dlcikgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAmJiB0aGlzLlNlcnZlckNvbmZpZy5pY29uX2p1bXBfbmF0aXZlXHJcbiAgICAgICAgICAgICYmIHBhcnNlSW50KHRoaXMuU2VydmVyQ29uZmlnLmljb25fanVtcF9uYXRpdmUpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaWNvbl9qdW1wX25hdGl2ZeWPguaVsO+8jOWOn+eUn+ivleeOqea4uOaIj+aMguS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKbog73mmL7npLo25Liq5YWD57Sg55qE5Lqk5Y+J5o6o5bm/57uE5Lu2XHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNhblNob3dDcm9zc1dpZGdldDYoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlRvb2xfQnJvc3dlcikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCB8fCBQbGF0VXRpbHMuSXNPUFBPIHx8IFBsYXRVdGlscy5Jc0JhaWR1IHx8IFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQgfHwgUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19jcm9zc19nYW1lXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpc19jcm9zc19nYW1l5Y+C5pWw77yMNuWFg+e0oOS6pOWPieaOqOW5v+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIw25YWD57Sg5Lqk5Y+J5o6o5bm/57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpICYmIHV0aWxzLlRvb2xfRG91eWluLmlzU2hvd01vcmVHYW1lc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwiaXNfY3Jvc3NfZ2FtZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaXNfY3Jvc3NfZ2FtZeWPguaVsOS4umZhbHNl77yMNuWFg+e0oOS6pOWPieaOqOW5v+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIw25YWD57Sg5Lqk5Y+J5o6o5bm/57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekujblhYPntKDkuqTlj4nmjqjlub/nu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dDcm9zc1dpZGdldDYoKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jYW5TaG93Q3Jvc3NXaWRnZXQ2KCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLmNyb3NzV2lkZ2V0Nikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLmNyb3NzV2lkZ2V0Nik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIENyb3NzV2lkZ2V0Niwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65re75Yqg5Yiw5oiR55qE5bCP56iL5bqP5byV5a+8XHJcbiAgICAgKiBAcGFyYW0gcGFyYW0g5Y+C5pWw5YC877yaXHJcbiAgICAgKiAgICAgICAgICAgICAgdHlwZe+8miBiYXLvvIjkuIDnm7TlsZXnpLrvvIkvdGlw77yIM+enkuWxleekuu+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0Zhdm9yaXRlR3VpZGUocGFyYW0/OiBhbnkpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLl90b29sX0JhaWR1LmNhblNob3dGYXZvcml0ZUd1aWRlKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgc3dhbi5zaG93RmF2b3JpdGVHdWlkZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcGFyYW0gPyBwYXJhbS50eXBlIDogJ3RpcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+S4gOmUrua3u+WKoOWIsOaIkeeahOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5re75Yqg5oiQ5Yqf77yaJywgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+a3u+WKoOWksei0pe+8micsIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrmiJHnmoTlsI/nqIvluo/lvJXlr7zmiJDlip/vvIFcIik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgeaYvuekuua3u+WKoOaIkeeahOWwj+eoi+W6j+W8leWvvFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HmmK/lkKboh6rliqjlvLnlh7rnrb7liLBcclxuICAgICAqIHRydWUgOiDoh6rliqjlvLnlh7rvvIxmYWxzZSA6IOS4jeiHquWKqOW8ueWHulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tBdXRvU2lnbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImF1dG9fc2lnblwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeW5s+WPsOeahOmFjee9ruaWh+S7tlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl90b29sKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cl90b29sLlNlcnZlckNvbmZpZyA/IHRoaXMuY3VyX3Rvb2wuU2VydmVyQ29uZmlnIDoge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2N1cl90b29sID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5bmz5Y+w55qE6YWN572u5paH5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY3VyX3Rvb2woKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyX3Rvb2wpIHJldHVybiB0aGlzLl9jdXJfdG9vbDtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMud2VjaGF0VG9vbDtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyX3Rvb2wgPSB1dGlscy5vcHBvVG9vbDtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyX3Rvb2wgPSB1dGlscy5Ub29sX1Zpdm87XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNRUSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfUVE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyX3Rvb2wgPSB1dGlscy5Ub29sX0RvdXlpbjtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMuVG9vbF9CYWlkdTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1FUVCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfUVRUO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMuVG9vbF9YaWFvTWk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSVNVQykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfVUM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSVNDb2Nvcykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfQ29jb3NwbGF5O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfTmF0aXZlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzNDM5OSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfNDM5OTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0t3YWkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyX3Rvb2wgPSB1dGlscy5fdG9vbF9Ld2FpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMuVG9vbF9JT1M7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNXaUZpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMuX3Rvb2xfV2lmaTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyX3Rvb2wgPSB1dGlscy5fdG9vbF9IYWdvO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMuVG9vbF9IdWF3ZWk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNGYWNlQm9vaykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJfdG9vbCA9IHV0aWxzLlRvb2xfRmFjZWJvb2s7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNHb29nbGVXZWIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyX3Rvb2wgPSB1dGlscy5Ub29sX0ZhY2Vib29rO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cl90b29sID0gdXRpbHMuX3Rvb2xfQnJvc3dlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cl90b29sO1xyXG4gICAgfVxyXG5cclxuICAgIHNlcnZlclNob3dMb2c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65pel5b+X5Yiw5o6n5Yi25Y+wXHJcbiAgICAgKi9cclxuICAgIHNob3dMb2dUb0NvbnNvbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S6TE9HXHJcbiAgICAgKi90cnVlXHJcbiAgICBwdWJsaWMgc2hvd0xvZyhtc2c6IGFueSA9IFwiXCIsIC4uLmFueSkge1xyXG4gICAgICAgIC8vIGlmICh0cnVlKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKG1zZywgLi4uYW55KTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAodGhpcy5zaG93TG9nVmlldyB8fCB0aGlzLnNlcnZlclNob3dMb2cpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLmxvZ291dFZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvZ29vdXRWaWV3ID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkxvZ291dFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2dvb3V0Vmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvb3V0VmlldyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLmxvZ291dFZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKGxvZ29vdXRWaWV3LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nb291dFZpZXcuZ2V0Q29tcG9uZW50KFwiTG9nT3V0Vmlld1wiKS5hZGRMb2cobXNnLCAuLi5hbnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgTG9nT3V0Vmlldywg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93TG9nVG9Db25zb2xlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2csIC4uLmFueSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2cobXNnLCAuLi5hbnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWxj+W5lemch+WKqOWKn+iDvVxyXG4gICAgICogQHBhcmFtIHR5cGUg6ZyH5Yqo57G75Z6LIOS8oOmAkuaemuS4vu+8mlZpYnJhdGVUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2aWJyYXRlKHR5cGU6IFZpYnJhdGVUeXBlID0gVmlicmF0ZVR5cGUuU2hvcnQpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFZpYnJhdGVUeXBlLlNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIC8v5L2/5omL5py65Y+R55Sf6L6D55+t5pe26Ze055qE5oyv5Yqo77yIMTUgbXPvvInjgILku4XlnKggaVBob25lIDcgLyA3IFBsdXMg5Lul5LiK5Y+KIEFuZHJvaWQg5py65Z6L55Sf5pWIXHJcbiAgICAgICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoeyBzdWNjZXNzKHJlcykgeyB9LCBmYWlsKHJlcykgeyB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB3eC52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7ICAvLzQwMCBtc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFZpYnJhdGVUeXBlLlNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHFnLnZpYnJhdGVTaG9ydCh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7Ly/vvIgyMCBtc++8iVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7ICAvLzQwMCBtc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFZpYnJhdGVUeXBlLlNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHFnLnZpYnJhdGVTaG9ydCgpOy8v77yIMTUgbXPvvIlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgcWcudmlicmF0ZUxvbmcoKTsgLy80MDAgbXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gVmlicmF0ZVR5cGUuU2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgLy/vvIgxNSBtc++8ie+8jOS7heWcqCBpUGhvbmUgNy83IFBsdXMg5Lul5LiK5Y+KIEFuZHJvaWQg5py65Z6L55Sf5pWI44CCXHJcbiAgICAgICAgICAgICAgICBxcS52aWJyYXRlU2hvcnQoeyBzdWNjZXNzKHJlcykgeyB9LCBmYWlsKHJlcykgeyB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxcS52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7IC8vNDAwIG1zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBWaWJyYXRlVHlwZS5TaG9ydCkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0dC52aWJyYXRlU2hvcnQoeyBzdWNjZXNzKHJlcykgeyB9LCBmYWlsKHJlcykgeyB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0dC52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7IC8vNDAwIG1zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFZpYnJhdGVUeXBlLlNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIC8v77yIMTUgbXPvvInvvIzku4XlnKggaVBob25lIDcvNyBQbHVzIOS7peS4iuWPiiBBbmRyb2lkIOacuuWei+eUn+aViOOAglxyXG4gICAgICAgICAgICAgICAgc3dhbi52aWJyYXRlU2hvcnQoeyBzdWNjZXNzKHJlcykgeyB9LCBmYWlsKHJlcykgeyB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBzd2FuLnZpYnJhdGVMb25nKHsgc3VjY2VzcyhyZXMpIHsgfSwgZmFpbChyZXMpIHsgfSB9KTsgLy80MDAgbXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBWaWJyYXRlVHlwZS5TaG9ydCkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAvL++8iDE1IG1z77yJ77yM5LuF5ZyoIGlQaG9uZSA3LzcgUGx1cyDku6XkuIrlj4ogQW5kcm9pZCDmnLrlnovnlJ/mlYjjgIJcclxuICAgICAgICAgICAgICAgIHd1amkudmlicmF0ZVNob3J0KHsgc3VjY2VzcyhyZXMpIHsgfSwgZmFpbChyZXMpIHsgfSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgd3VqaS52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7IC8vNDAwIG1zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gVmlicmF0ZVR5cGUuU2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh1dGlscy5Ub29sX05hdGl2ZS5qbmlDbGFzc05hbWUsIFwidmlicmF0ZVNob3J0XCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHV0aWxzLlRvb2xfTmF0aXZlLmpuaUNsYXNzTmFtZSwgXCJ2aWJyYXRlTG9uZ1wiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lvIDlp4vkuIrmiqVcclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFcclxuICAgICAqIEBwYXJhbSBtb2RlbCDlvZPliY3mqKHlvI/vvJog5rKh5pyJ5YiZ55yB55WlXHJcbiAgICAgKi9cclxuICAgIFN0YXJ0R2FtZShsZXZlbDogc3RyaW5nLCBtb2RlbD86IHN0cmluZykge1xyXG4gICAgICAgIEFsZFV0aWxzLlN0YXJ0R2FtZShsZXZlbCwgbW9kZWwpO1xyXG4gICAgICAgIHV0aWxzLmN1cl90b29sICYmIHV0aWxzLmN1cl90b29sLnVtYU9uU3RhcnQgJiYgdXRpbHMuY3VyX3Rvb2wudW1hT25TdGFydChsZXZlbCk7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbiB8fCBQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXV0b1N0YXJ0UmVjb3JkKGxldmVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog5ri45oiP6IOc5Yip5LiK5oqlLOaYvuekuue7k+eul+W5v+WRilxyXG4gICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hXHJcbiAgICAqIEBwYXJhbSBzdGFyIOiOt+W+l+aYn+aYn++8miDpu5jorqTkuLowXHJcbiAgICAqIEBwYXJhbSBtb2RlbCDlvZPliY3mqKHlvI/vvJog5rKh5pyJ5YiZ55yB55WlXHJcbiAgICAqIEBwYXJhbSBpc1Nob3dBZCDmmK/lkKbosIPnlKjlub/lkYrvvIzpu5jorqTlvIDlkK/osIPnlKhcclxuICAgICogQHJldHVybnMganNvbnsgdHlwZTooMTo25YWD57Sg5LqS5o6o44CBMjrljZXkuKrljp/nlJ/lub/lkYopLG5vZGU66IqC54K5fSAgICAgICAgICAgICAgICAgIFxyXG4gICAgKiBcclxuICAgICovXHJcbiAgICBHYW1lV2luKGxldmVsOiBzdHJpbmcsIHN0YXI6IG51bWJlciA9IDAsIG1vZGVsPzogc3RyaW5nLCBpc1Nob3dBZDogYm9vbGVhbiA9IHRydWUpOiBhbnkge1xyXG4gICAgICAgIEFsZFV0aWxzLkdhbWVXaW4obGV2ZWwsIHN0YXIsIG1vZGVsKTtcclxuICAgICAgICB1dGlscy5jdXJfdG9vbCAmJiB1dGlscy5jdXJfdG9vbC51bWFSZXBvcnRlZExldmVsICYmIHV0aWxzLmN1cl90b29sLnVtYVJlcG9ydGVkTGV2ZWwobGV2ZWwsIExldmVsU3RhdHVzLkdhbWVXaW4pO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmt3YWlUb29sLmlzQ2xpY2tFbmQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKFBsYXRVdGlscy5Jc0RvdXlpbiB8fCBQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRFbmQoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQXV0b1Nob3dTdGF0ZW1lbnQobGV2ZWwsIHRydWUsIGlzU2hvd0FkKTtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICog5ri45oiP5aSx6LSl5LiK5oqlLOaYvuekuue7k+eul+W5v+WRilxyXG4gICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hXHJcbiAgICAqIEBwYXJhbSBtb2RlbCDlvZPliY3mqKHlvI/vvJog5rKh5pyJ5YiZ55yB55WlXHJcbiAgICAqIEBwYXJhbSBpc1Nob3dBZCDmmK/lkKbosIPnlKjlub/lkYrvvIzpu5jorqTlvIDlkK/osIPnlKhcclxuICAgICogQHJldHVybnMganNvbnsgdHlwZTooMTo25YWD57Sg5LqS5o6o44CBMjrljZXkuKrljp/nlJ/lub/lkYopLG5vZGU66IqC54K5fVxyXG4gICAgKi9cclxuICAgIEdhbWVGYWlsKGxldmVsOiBzdHJpbmcsIG1vZGVsPzogc3RyaW5nLCBpc1Nob3dBZDogYm9vbGVhbiA9IHRydWUpOiBhbnkge1xyXG4gICAgICAgIEFsZFV0aWxzLkdhbWVGYWlsKGxldmVsLCBtb2RlbCk7XHJcbiAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wudW1hUmVwb3J0ZWRMZXZlbCAmJiB1dGlscy5jdXJfdG9vbC51bWFSZXBvcnRlZExldmVsKGxldmVsLCBMZXZlbFN0YXR1cy5HYW1lRmFpbCk7XHJcbiAgICAgICAgLy8gaWYgKFBsYXRVdGlscy5Jc0RvdXlpbiB8fCBQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRFbmQoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQXV0b1Nob3dTdGF0ZW1lbnQobGV2ZWwsIGZhbHNlLCBpc1Nob3dBZCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOi3s+i/h+WFs+WNoeS4iuaKpVxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoVxyXG4gICAgICogQHBhcmFtIG1vZGVsIOW9k+WJjeaooeW8j++8miDmsqHmnInliJnnnIHnlaVcclxuICAgICAqL1xyXG4gICAgR2FtZVNraXAobGV2ZWw6IHN0cmluZywgbW9kZWw/OiBzdHJpbmcpIHtcclxuICAgICAgICBBbGRVdGlscy5HYW1lU2tpcChsZXZlbCwgbW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5Lu25LiK5oqlXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIOS6i+S7tuWQjeensFxyXG4gICAgICovXHJcbiAgICBTZW5kRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoZXZlbnROYW1lKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPi+ebn+iHquWumuS5ieS6i+S7tuS4iuaKpVxyXG4gICAgICogQHBhcmFtIGV2ZW50SUQg5LqL5Lu2SURcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgICDkuovku7blhoXlrrkgVHlwZTogb2JqXHJcbiAgICAgKi9cclxuICAgIHVtYUV2ZW50KGV2ZW50SUQ6IHN0cmluZywgcGFyYW1zPykge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOS6i+S7tuS4iuaKpToke2V2ZW50SUR977yaJHtwYXJhbXN9YCk7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wudW1hVHJhY2tFdmVudCAmJiB1dGlscy5jdXJfdG9vbC51bWFUcmFja0V2ZW50KFwiY3VzdG9tXCIsIGV2ZW50SUQsIHBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wudW1hVHJhY2tFdmVudCAmJiB1dGlscy5jdXJfdG9vbC51bWFUcmFja0V2ZW50KGV2ZW50SUQsIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvdmVyUGFnZVNob3dUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgb3ZlclBhZ2VJbnNlcnRBZElzVG91Y2g6IGJvb2xlYW4gPSBmYWxzZTsgLy8g57uT566X6aG16Z2i55qE5o+S5bGP5bm/5ZGK5piv5ZCm6KKr54K55Ye76L+HXHJcbiAgICByZXBvcnRPdmVyUGFnZVRvdWNoRXZlbnQob3ZlclBhZ2U6IGNjLk5vZGUpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwicmVwb3J0T3ZlclBhZ2VUb3VjaEV2ZW50ID4+Pj4+Pj5cIik7XHJcbiAgICAgICAgdGhpcy5vdmVyUGFnZUluc2VydEFkSXNUb3VjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3ZlclBhZ2VTaG93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBub2RlLndpZHRoID0gb3ZlclBhZ2Uud2lkdGggKiAyO1xyXG4gICAgICAgIG5vZGUuaGVpZ2h0ID0gb3ZlclBhZ2UuaGVpZ2h0ICogMjtcclxuICAgICAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5vdmVyUGFnZVNob3dUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAganNvbi5kYXRhID0gdGltZTtcclxuICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50TmV3KGDnu5PnrpfpobXpnaLngrnlh7vml7bpl7RgLCBcIm92ZXJQYWdlVG91Y2hcIiwgSlNPTi5zdHJpbmdpZnkoanNvbikpO1xyXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfSwgb3ZlclBhZ2UpO1xyXG4gICAgICAgIG5vZGVbJ190b3VjaExpc3RlbmVyJ11bJ3N3YWxsb3dUb3VjaGVzJ10gPSBmYWxzZTtcclxuICAgICAgICBvdmVyUGFnZS5hZGRDaGlsZChub2RlLCBjYy5tYWNyby5NQVhfWklOREVYKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiHquWumuS5ieS6i+S7tuS4iuaKpVxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSDkuovku7blkI3np7BcclxuICAgICAqL1xyXG4gICAgU2VuZEV2ZW50TmV3KGV2ZW50TmFtZTogc3RyaW5nLCBldmVudElkOiBzdHJpbmcgPSBcImRlZmF1bHRcIiwgZXZlbnREYXRhPzogc3RyaW5nLCBpc0NhbGxCYWNrOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOiHquWumuS5ieS6i+S7tuS4iuaKpToke2V2ZW50TmFtZX3vvIwke2V2ZW50SWR9LCR7ZXZlbnREYXRhfWApO1xyXG4gICAgICAgIHV0aWxzLmN1cl90b29sICYmIHV0aWxzLmN1cl90b29sLlNlbmRFdmVudE5ldyAmJiB1dGlscy5jdXJfdG9vbC5TZW5kRXZlbnROZXcoZXZlbnROYW1lLCBldmVudElkLCBldmVudERhdGEsIGlzQ2FsbEJhY2spO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+S4reS9v+eUqOmBk+WFt+S4iuaKpVxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoVxyXG4gICAgICogQHBhcmFtIHRvb05hbWUg6YGT5YW35ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gbW9kZWwg5b2T5YmN5qih5byP77yaIOayoeacieWImeecgeeVpVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVzZVRvb2wobGV2ZWw6IHN0cmluZywgdG9vbE5hbWU6IHN0cmluZywgbW9kZWw/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBBbGRVdGlscy5Vc2VUb29sKGxldmVsLCB0b29sTmFtZSwgbW9kZWwpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqvmiJDlip/mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlY29yZWRfc2hhcmVfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreeul+eVjOmdouaYr+WQpuiDveaYvuekuuiHquWKqOWIhuS6qyAgIOiHquWKqOW8uuW8ueinhumikSAgIOiHquWKqOW8ueaPkuWxj1xyXG4gICAgICogdHlwZSAx6Ieq5Yqo5YiG5LqrICAgMuiHquWKqOW8uuW8ueinhumikSAgICAz6Ieq5Yqo5by55o+S5bGPIDToh6rliqjlvLnkupLmjqjmj5LlsY9cclxuICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tSZXN1bHRTaG93KHR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbGV2ZWwgPSB1dGlscy5jdXJyZW50TGV2ZWw7XHJcbiAgICAgICAgbGV0IGlzU3VjY2VzcyA9IHV0aWxzLmlzU3VjY2VzcztcclxuICAgICAgICBsZXQgY29uZmlnID0gdXRpbHMuU2VydmVyQ29uZmlnO1xyXG4gICAgICAgIGlmICghY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnI3liqHlmajphY3nva7kuI3lrZjlnKgs5Y+q5pi+56S657uT566X5bm/5ZGKXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvX3JlY29yZF9zaGFyZV9jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZWRDb3VudCA9IGNvbmZpZy5hdXRvX3JlY29yZF9zaGFyZV9jb3VudDtcclxuICAgICAgICAgICAgICAgIGlmIChyZWNvcmVkQ291bnQgIT0gMCAmJiB1dGlscy5yZWNvcmVkX3NoYXJlX2NvdW50ID49IHJlY29yZWRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOacjeWKoeWZqOmFjee9ruWIhuS6q+asoeaVsO+8miR7cmVjb3JlZENvdW50fSAs5bey5Yiw5LiK6ZmQYClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZF9jYXAgPSBjb25maWcuYXV0b19yZWNvcmRfaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+IDAgJiYgcmVjb3JkX2NhcCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmRfY2FwLmluZGV4T2YoXCIsXCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgJSBOdW1iZXIocmVjb3JkX2NhcCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmjIflrprlhbPljaEke2NvbmZpZy5hdXRvX3JlY29yZF9pbnRlcnZhbH3liIbkuqvlvZXlsY/vvIzlvZPliY3lhbPljaHkuLrvvJoke2xldmVsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZF9jYXBfYXJyID0gcmVjb3JkX2NhcC5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRfY2FwX2Fyci5mb3JFYWNoKHN0ciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09IE51bWJlcihzdHIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvX3JlY29yZF9zaGFyZV90eXBlID09IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZSA9PSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvX3JlY29yZF9zaGFyZV90eXBlID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlID09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvX3JlY29yZF9zaGFyZV90eXBlID09IFwiZmFpbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VjY2VzcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZSA9PSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB1dGlscy5zaG93TG9nKGDkuI3og73oh6rliqjliIbkuqvlvZXlsY8g5YiG5Lqr5b2V5bGP6Ze06ZqU5Li677yaJHtjb25maWcuYXV0b19yZWNvcmRfaW50ZXJ2YWx9ICDliIbkuqvnsbvlnovkuLrvvJoke2NvbmZpZy5hdXRvX3JlY29yZF9zaGFyZV90eXBlfWApO1xyXG4gICAgICAgIGlmIChjb25maWcuYXV0b192aWRlb19pbnRlcnZhbCAmJiBjb25maWcuYXV0b192aWRlb19pbnRlcnZhbCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGFjZSA9IGNvbmZpZy5hdXRvX3ZpZGVvX2ludGVydmFsO1xyXG4gICAgICAgICAgICBsZXQgc2hvd1R5cGUgPSBjb25maWcuYXV0b192aWRlb19zaG93X3R5cGVcclxuICAgICAgICAgICAgaWYgKGxldmVsICUgc3BhY2UgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dUeXBlID09IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZSA9PSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dUeXBlID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlID09IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dUeXBlID09IFwiZmFpbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3VjY2VzcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZSA9PSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB1dGlscy5zaG93TG9nKGDkuI3og73oh6rliqjlvLnop4bpopHlvLnop4bpopHpl7TpmpTkuLrvvJoke2NvbmZpZy5hdXRvX3ZpZGVvX2ludGVydmFsfSDlvLnop4bpopHnsbvlnovkuLrvvJoke2NvbmZpZy5hdXRvX3ZpZGVvX3Nob3dfdHlwZX1gKVxyXG5cclxuICAgICAgICBpZiAoY29uZmlnLmF1dG9fcmVjX2luc2VydF9pbnRlcnZhbCAmJiBjb25maWcuYXV0b19yZWNfaW5zZXJ0X2ludGVydmFsICE9IDApIHtcclxuICAgICAgICAgICAgbGV0IHNwYWNlID0gY29uZmlnLmF1dG9fcmVjX2luc2VydF9pbnRlcnZhbDtcclxuICAgICAgICAgICAgbGV0IHNob3dUeXBlID0gY29uZmlnLmF1dG9fcmVjX2luc2VydF90eXBlO1xyXG4gICAgICAgICAgICBpZiAobGV2ZWwgJSBzcGFjZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd1R5cGUgPT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlID09IDQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd1R5cGUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT0gNDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd1R5cGUgPT0gXCJmYWlsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlID09IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOS4jeiDveiHquWKqOW8ueS6kuaOqOaPkuWxj+mXtOmalOS4uu+8miR7Y29uZmlnLmF1dG9fcmVjX2luc2VydF9pbnRlcnZhbH0g5by56KeG6aKR57G75Z6L5Li677yaJHtjb25maWcuYXV0b19yZWNfaW5zZXJ0X3R5cGV9YClcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgPT0gMztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X5bm/5ZGK5o6n5Yi2XHJcbiAgICAgKiBsZXZlbCDlvZPliY3lhbPljaEgICBpc1N1Y2Nlc3PmmK/lkKbog5zliKkgXHJcbiAgICAgKiBxcSAg6Iul5Yik5patMumAmui/h+W8uea4uOaIj+ebkuWtkCAg5Yik5patM+mAmui/h+W8ueaPkuWxj1xyXG4gICAgICog5oqW6Z+zICDoi6XliKTmlq0y6YCa6L+H5YiZ5by56KeG6aKRICAg5Yik5patM+i/h+W8ueaPkuWxj1xyXG4gICAgICog6Laj5aS05p2hIOiLpeWIpOaWrTLpgJrov4flvLnop4bpopEgICDliKTmlq0z6YCa6L+H5by55LqS5Yqo55u05by5XHJcbiAgICAgKiDlhbbku5blubPlj7Doi6XliKTmlq0y6YCa6L+H5YiZ5pyN5Yqh5Zmo6YWN572u5pyJ6Zeu6aKY77yM6IGU57O76L+Q6JCl5L+u5pS5XHJcbiAgICAgKuacjeWKoeWZqOaOp+WItiDnu5PnrpfnlYzpnaLoh6rliqjlvLnlh7rop4bpopFcclxuICAgICAqL1xyXG4gICAgcHVibGljIEF1dG9TaG93U3RhdGVtZW50KGxldmVsLCBpc1N1Y2Nlc3MsIGlzU2hvd0FkKTogYW55IHtcclxuICAgICAgICB1dGlscy5jdXJyZW50TGV2ZWwgPSBsZXZlbDtcclxuICAgICAgICB1dGlscy5pc1N1Y2Nlc3MgPSBpc1N1Y2Nlc3M7XHJcbiAgICAgICAgbGV0IHJlczogYW55ID0geyBcInR5cGVcIjogLTEsIFwibm9kZVwiOiBudWxsIH1cclxuICAgICAgICBpZiAoIWlzU2hvd0FkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJpc1Nob3dBZOS4umZhbHNl77yM5Y+q5LiK5oql5LiN5pi+56S65bm/5ZGKXCIpXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXNTaG93VmlkZW86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jaGVja1Jlc3VsdFNob3coMikpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZXN1bHRfYXV0b19zaG93X3ZpZGVvXCIpID09IFwiZmFsc2VcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo54mI5pys77yaXCIsIHV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcudmVyc2lvbiwgXCLlvZPliY3niYjmnKzvvJpcIiwgdGhpcy5nZXRDb25maWdCeUtleShcInZlcnNpb25cIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcudmVyc2lvbiAhPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwidmVyc2lvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLniYjmnKzkuI3kuIDoh7TvvIzoh6rliqjmkq3mlL7op4bpopHvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKCgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLnFxY29uZmlnLnZlcnNpb24gIT0gdGhpcy5nZXRDb25maWdCeUtleShcInZlcnNpb25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi54mI5pys5LiN5LiA6Ie077yM6Ieq5Yqo5pKt5pS+6KeG6aKR77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dWaWRlbygoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvd1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNXaUZpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLndpZmlDb25maWcudmVyc2lvbiAhPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwidmVyc2lvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLniYjmnKzkuI3kuIDoh7TvvIzoh6rliqjmkq3mlL7op4bpopHvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKCgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmJhaWR1Y29uZmlnLnZlcnNpb24gIT0gdGhpcy5nZXRDb25maWdCeUtleShcInZlcnNpb25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi54mI5pys5LiN5LiA6Ie077yM6Ieq5Yqo5pKt5pS+6KeG6aKR77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dWaWRlbygoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvd1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY29uZmlnLmt3YWlDb25maWcudmVyc2lvbiAhPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwidmVyc2lvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLniYjmnKzkuI3kuIDoh7TvvIzoh6rliqjmkq3mlL7op4bpopHvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKCgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcuaGFnb0NvbmZpZy52ZXJzaW9uICE9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJ2ZXJzaW9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueJiOacrOS4jeS4gOiHtO+8jOiHquWKqOaSreaUvuinhumike+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93VmlkZW8oKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpc1Nob3dWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5uYXRpdmVBbmRyb2lkQ29uZmlnLnZlcnNpb24gIT0gdGhpcy5nZXRDb25maWdCeUtleShcInZlcnNpb25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi54mI5pys5LiN5LiA6Ie077yM6Ieq5Yqo5pKt5pS+6KeG6aKR77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZyAmJiB0aGlzLmdldENvbmZpZ0J5S2V5KFwiYXV0b192aWRlb190eXBlXCIpID09IFwicmV3YXJkX3ZpZGVvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dWaWRlbygoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93RnVsbFNjcmVlblZpZGVvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvd1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4juacjeWKoeWZqOeJiOacrOS4gOiHtO+8jOS4jeiHquWKqOaSreaUvuinhumike+8gVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5uYXRpdmVJb1NDb25maWcudmVyc2lvbiAhPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwidmVyc2lvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLniYjmnKzkuI3kuIDoh7TvvIzoh6rliqjmkq3mlL7op4bpopHvvIFcIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnICYmIHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJhdXRvX3ZpZGVvX3R5cGVcIikgPT0gXCJyZXdhcmRfdmlkZW9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKCgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dGdWxsU2NyZWVuVmlkZW8oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7lvZPliY3mmL7npLrlvLrlvLnop4bpopHvvIzkvYblvZPliY3lubPlj7DkuI3mlK/mjIHjgILpnIDkv67mlLnmnI3liqHlmajphY3nva5cIilcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93U3RhdGVtZW50QWRzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc1Nob3dWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKCgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU2hvd1ZpZGVvICYmIChQbGF0VXRpbHMuSXNEb3V5aW4gfHwgUGxhdFV0aWxzLklzUVEgfHwgUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCB8fCBQbGF0VXRpbHMuSXNOYXRpdmVJT1MpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5by65by55LqG6KeG6aKR77yM5LiN5pi+56S65o+S5bGP77yBXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzID0gdXRpbHMuYWRNYW5hZ2VyLnNob3dTdGF0ZW1lbnRBZHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLmNhblNob3dSZWRCYWcoKSAmJiB0aGlzLnl6UmVkQmFnSW5mby5wcm9ncmVzcyA+PSB0aGlzLnl6UmVkQmFnSW5mby50b3RhbFByb2dyZXNzKSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3nuqLljIXov5vluqblt7Lmu6HvvIzmmL7npLrojrflvpfnuqLljIXnqpflj6PvvIFcIik7XHJcbiAgICAgICAgLy8gICAgIC8vIHRoaXMuc2hvd09wZW5SZWRCYWdQYW5lbCh7IHNob3dUeXBlOiAyIH0pO1xyXG4gICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrUmVzdWx0U2hvdygzKSkge1xyXG4gICAgICAgICAgICByZXMgPSB1dGlscy5hZE1hbmFnZXIuc2hvd1N0YXRlbWVudEFkcygpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiB0aGlzLmNoZWNrUmVzdWx0U2hvdygzKVwiLCByZXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbiB8fCBQbGF0VXRpbHMuSXNOYXRpdmVJT1MgfHwgUGxhdFV0aWxzLklzQmFpZHUgfHwgUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICAvL+aKlumfs+W5s+WPsOWIpOaWreaYr+WQpumcgOimgTblhYPntKDkupLmjqhcclxuICAgICAgICAgICAgcmVzLnR5cGUgPSAxO1xyXG4gICAgICAgICAgICByZXMubm9kZSA9IHV0aWxzLnNob3dDcm9zc1dpZGdldDYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X5LiA5qyh546w6YeR57qi5YyFXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRSZWRCYWdDb3VudChjYWxsRnVuPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnl6UmVkQmFnSW5mby5mcmVlUmVkQmFnQ291bnQrKztcclxuICAgICAgICBpZiAoY2FsbEZ1bikge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZENsb3NlRnVuYyA9IGNhbGxGdW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd09wZW5SZWRCYWdQYW5lbCh7IHNob3dUeXBlOiAzIH0pO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflvpfkuIDkuKrnjrDph5HnuqLljIVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vmuLjmiI/oh6rliqjlvZXlsY9cclxuICAgICAqIOaaguaXtuWPquacieWktOadoeW5s+WPsOaciVxyXG4gICAgICog6buY6K6k5Li6MCDooajnpLrkuI3lvIDlkK/vvIzkvovlpoIzIOihqOekuuavj+S4ieWFs+S8muiHquWKqOW9leWxj++8jOS+i+WmgjMsNiw5IOihqOekuuWPquacieesrDMsNiw55oyH5a6a55qE5YWz5Y2h5Lya6Ieq5Yqo5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIEF1dG9TdGFydFJlY29yZChsZXZlbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwiYXV0b19yZWNvcmRfaW50ZXJ2YWxcIikgPiAwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlY29yZFN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacjeWKoeWZqOmFjee9ruS4jeWtmOWcqGF1dG9fcmVjb3JkX2ludGVydmFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNoYXJlUmVjb3JkUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrlvZXlsY/liIbkuqvnqpflj6NcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93U2hhcmVSZWNvcmRQYW5lbChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcuc2hhcmVSZWNvcmRQYW5lbCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlUmVjb3JkUGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVSZWNvcmRQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuc2hhcmVSZWNvcmRQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlUmVjb3JkUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZVJlY29yZFBhbmVsID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVSZWNvcmRQYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdyb3VwID0gcGFyYW1zLmdyb3VwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNjYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHBhcmFtcy5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gcGFyYW1zLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gcGFyYW1zLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLnNoYXJlUmVjb3JkUGFuZWwsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLnNoYXJlUmVjb3JkUGFuZWwsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyq5om+5Yiw6aKE5Yi25L2TIFNoYXJlUmVjb3JkUGFuZWwsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWFtuS7lui+heWKqemFjee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG90aGVyQ29uZmlnKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vdGhlcl9jb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3RoZXJfY29uZmlnID0gdGhpcy5jb25maWcub3RoZXJjb25maWcubG9jYWxDb25maWcuanNvbi5vdGhlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX290aGVyX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluivleeUqOearuiCpOWFs+WNoemXtOmalFxyXG4gICAgICog6buY6K6k5Li65q+PNeWFs+aYvuekuuS4gOasoVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1Nob3dUcnlTa2luKGN1ckxldmVsOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IDU7XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5nZXRDb25maWdCeUtleShcInRyeV9za2luX2xldmVsX2NvdW50XCIpKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gdGhpcy5nZXRDb25maWdCeUtleShcInRyeV9za2luX2xldmVsX2NvdW50XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VyTGV2ZWwgJSBjb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5nZXRDb25maWdCeUtleShcInRyeV9za2luX3Nob3dfYWRfaW50ZXJ2YWxcIikgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyTGV2ZWwgJSB0aGlzLmdldENvbmZpZ0J5S2V5KFwidHJ5X3NraW5fc2hvd19hZF9pbnRlcnZhbFwiKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5pyN5Yqh5Zmo6YWN572u6Ze06ZqUJHt0aGlzLmdldENvbmZpZ0J5S2V5KFwidHJ5X3NraW5fc2hvd19hZF9pbnRlcnZhbFwiKX3lhbPor5XnlKjnmq7ogqTlsZXnpLrmj5LlsY/vvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW7tui/n+aYvuekuui3s+i/h+aIluiAheWFs+mXreaMiemSrlxyXG4gICAgICogQHBhcmFtIGJ0biDlu7bov5/mmL7npLrmjInpkq7nmoToioLngrlcclxuICAgICAqIEBwYXJhbSBpc0Nsb3NlQnRuIOaYr+WQpui/lOWbnuaIluiAheWFs+mXreaMiemSrlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOaMiemSruaJgOWcqOeahOmhtemdouS9jee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1NraXBCdG4oYnRuOiBjYy5Ob2RlLCBpc0Nsb3NlQnRuOiBib29sZWFuID0gZmFsc2UsIGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLk5vbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnRuKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVsYXlTaG93QnRuOiBudW1iZXIgPSBQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkID8gMyA6IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwic2tpcF9idG5fc2hvd19kZWxheVwiKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsYXlTaG93QnRuID0gdGhpcy5nZXRDb25maWdCeUtleShcInNraXBfYnRuX3Nob3dfZGVsYXlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzQ2xvc2VCdG4pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwic3BlY2lhbF9za2lwX2J0bl9zaG93X2RlbGF5XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlTaG93QnRuID0gdGhpcy5nZXRDb25maWdCeUtleShcInNwZWNpYWxfc2tpcF9idG5fc2hvd19kZWxheVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1Rlc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2VydmVyQ29uZmlnLm92ZXJfcGFnZV9za2lwX2J0bl9zaG93X2RlbGF5ID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24gPT0gQmFubmVyTG9jYXRpb24uT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJvdmVyX3BhZ2Vfc2tpcF9idG5fc2hvd19kZWxheVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5U2hvd0J0biA9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJvdmVyX3BhZ2Vfc2tpcF9idG5fc2hvd19kZWxheVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlbGF5U2hvd0J0biA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnRuICYmIGNjLmlzVmFsaWQoYnRuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXlTaG93QnRuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghYnRuLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaKlumfs+aMiemSruW7tui/n+aYvuekulxyXG4gICAgICog6buY6K6k5Li6MOenklxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVsYXlTaG93Tm9kZShidG46IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgIGJ0bi5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgYnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBkZWxheVNob3dCdG46IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwibmV4dF9idG5fc2hvd19kZWxheVwiKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsYXlTaG93QnRuID0gdGhpcy5nZXRDb25maWdCeUtleShcIm5leHRfYnRuX3Nob3dfZGVsYXlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0biAmJiBjYy5pc1ZhbGlkKGJ0bikpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4ucnVuQWN0aW9uKGNjLmZhZGVJbigwLjMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZGVsYXlTaG93QnRuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrp3nrrHnlYzpnaLmmK/lkKboh6rliqjli77pgIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzQm94QXV0b1NlbGVjdFRvZ2dsZSgpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY2FwX2xldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IHV0aWxzLmN1cnJlbnRMZXZlbDtcclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImJveF9hdXRvX3NlbGVjdF9sZXZlbFwiKSkge1xyXG4gICAgICAgICAgICBjYXBfbGV2ZWwgPSBOdW1iZXIodGhpcy5nZXRDb25maWdCeUtleShcImJveF9hdXRvX3NlbGVjdF9sZXZlbFwiKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruS4jeWtmOWcqO+8jOS4jeiHquWKqOWLvumAiVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FwX2xldmVsICE9IDAgJiYgKGxldmVsICUgY2FwX2xldmVsKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X55WM6Z2i5piv5ZCm6Ieq5Yqo5Yu+6YCJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1Jlc3VsdEF1dG9TZWxlY3RUb2dnbGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNhcF9sZXZlbDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgbGV2ZWwgPSB1dGlscy5jdXJyZW50TGV2ZWw7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZXN1bHRfYXV0b19zZWxlY3RfbGV2ZWxcIikpIHtcclxuICAgICAgICAgICAgY2FwX2xldmVsID0gTnVtYmVyKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJyZXN1bHRfYXV0b19zZWxlY3RfbGV2ZWxcIikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7kuI3lrZjlnKjvvIzkuI3oh6rliqjli77pgIlcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcF9sZXZlbCAhPSAwICYmIChsZXZlbCAlIGNhcF9sZXZlbCkgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivleeUqOearuiCpOeVjOmdouaYr+WQpuiHquWKqOWLvumAiVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNUcnlTa2luQXV0b1NlbGVjdFRvZ2dsZSgpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY2FwX2xldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IHV0aWxzLmN1cnJlbnRMZXZlbDtcclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcInNraW5fYXV0b19zZWxlY3RfbGV2ZWxcIikpIHtcclxuICAgICAgICAgICAgY2FwX2xldmVsID0gTnVtYmVyKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJza2luX2F1dG9fc2VsZWN0X2xldmVsXCIpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5LiN5a2Y5Zyo77yM5LiN6Ieq5Yqo5Yu+6YCJXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYXBfbGV2ZWwgIT0gMCAmJiAobGV2ZWwgJSBjYXBfbGV2ZWwpID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP5b2T5YmN54mI5pysXHJcbiAgICAgKi9cclxuICAgIGdldCBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl90b29sICYmIHRoaXMuY3VyX3Rvb2wuZ2FtZVZlcnNpb24pIHJldHVybiB0aGlzLmN1cl90b29sLmdhbWVWZXJzaW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLTFcIlxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLmjqfliLZcclxuICAgICAqIEBwYXJhbSB2aWV3ICBcclxuICAgICAqIOeVjOmdouexu+Wei++8muearuiCpOivleeUqOeVjOmdoiAg5a6d566x55WM6Z2iXHJcbiAgICAgKiBcclxuICAgICAqIOi/lOWbnuWAvOexu+Wei1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIGlzU2VsZWN077ya5oyJ6ZKu5piv5ZCm6Ieq5Yqo5Yu+6YCJ5LiKXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgbXNnOuaWh+Wtl+aPkOekulxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIGJ0blR5cGU65Yid5aeL5oyJ6ZKu57G75Z6LICAgdHJ1ZeS4uueci+W5v+WRiueahOaWh+acrCAgZmFsc2XkuLrkuI3nnIvlub/lkYrnmoTmlofmnKxcclxuICAgICovXHJcbiAgICBwdWJsaWMgY29udHJvVmlldyh2aWV3OiBWaWV3TG9jYXRpb24pOiBhbnkge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHsgXCJpc1NlbGVjdFwiOiB0cnVlLCBcIm1zZ1wiOiBcIuingueci+inhumikeiOt+W+l+WlluWKsVwiLCBcImJ0blR5cGVcIjogdHJ1ZSwgXCJpc19vcGVuXCI6IGZhbHNlIH07XHJcbiAgICAgICAgbGV0IGFkVGlwc1R5cGU6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IHNlbGVjdFR5cGU6IG51bWJlcjtcclxuICAgICAgICBpZiAoIXV0aWxzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5LiN5a2Y5ZyoXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/pqozor4HmnI3liqHlmajmmK/lkKblvIDlkK/li77pgInnrZbnlaVcclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcIm9wZW5fY2hlY2tfYnRuXCIpID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5LiN5byA5ZCv5Yu+6YCJ77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJlc3VsdC5pc19vcGVuID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIHN3aXRjaCAodmlldykge1xyXG4gICAgICAgICAgICBjYXNlIFZpZXdMb2NhdGlvbi5zaWduOlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0VHlwZSA9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJzaWduX2F1dG9fc2VsZWN0X2xldmVsXCIpID8gdGhpcy5nZXRDb25maWdCeUtleShcInNpZ25fYXV0b19zZWxlY3RfbGV2ZWxcIikgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJhZF90aXBfc2lnbl9yYW5kb21cIikgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZFRpcHNUeXBlID0gTWF0aC5yYW5kb20oKSA+PSAwLjUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVGlwc1R5cGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhZFRpcHNUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1zZyA9IFwi5p+l55yL6KeG6aKR6I635b6X5Y+M5YCN5aWW5YqxXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tc2cgPSBcIuS4jemcgOimgeinhumikeWlluWKsVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVmlld0xvY2F0aW9uLnRyeVNraW46XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RUeXBlID0gdGhpcy5nZXRDb25maWdCeUtleShcInRyeXNraW5fYXV0b19zZWxlY3RfbGV2ZWxcIikgPyB0aGlzLmdldENvbmZpZ0J5S2V5KFwidHJ5c2tpbl9hdXRvX3NlbGVjdF9sZXZlbFwiKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImFkX3RpcF90cnlza2luX3JhbmRvbVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVGlwc1R5cGUgPSBNYXRoLnJhbmRvbSgpID49IDAuNSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRUaXBzVHlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFkVGlwc1R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubXNnID0gXCLmn6XnnIvop4bpopHor5XnlKjnmq7ogqRcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1zZyA9IFwi5LiN6ZyA6KaB6KeG6aKR6K+V55So55qu6IKkXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgVmlld0xvY2F0aW9uLmJveDpcclxuICAgICAgICAgICAgICAgIHNlbGVjdFR5cGUgPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwiYm94X2F1dG9fc2VsZWN0X2xldmVsXCIpID8gdGhpcy5nZXRDb25maWdCeUtleShcImJveF9hdXRvX3NlbGVjdF9sZXZlbFwiKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImFkX3RpcF9ib3hfcmFuZG9tXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRUaXBzVHlwZSA9IE1hdGgucmFuZG9tKCkgPj0gMC41ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhZFRpcHNUeXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhZFRpcHNUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1zZyA9IFwi5p+l55yL6KeG6aKR6I635b6X5LqU5YCN5aWW5YqxXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tc2cgPSBcIuS4jemcgOimgeinhumikeWlluWKsVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVmlld0xvY2F0aW9uLnN1Y2Nlc3NCb3g6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RUeXBlID0gdGhpcy5nZXRDb25maWdCeUtleShcInN1Y2Nlc3NfYm94X2F1dG9fc2VsZWN0X2xldmVsXCIpID8gdGhpcy5nZXRDb25maWdCeUtleShcInN1Y2Nlc3NfYm94X2F1dG9fc2VsZWN0X2xldmVsXCIpIDogMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFZpZXdMb2NhdGlvbi5mYWlsQm94OlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0VHlwZSA9IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJmYWlsX2JveF9hdXRvX3NlbGVjdF9sZXZlbFwiKSA/IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJmYWlsX2JveF9hdXRvX3NlbGVjdF9sZXZlbFwiKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBWaWV3TG9jYXRpb24ud2luUGFuZWw6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RUeXBlID0gdGhpcy5nZXRDb25maWdCeUtleShcIndpbl9wYW5lbF9hdXRvX3NlbGVjdF9sZXZlbFwiKSA/IHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJ3aW5fcGFuZWxfYXV0b19zZWxlY3RfbGV2ZWxcIikgOiAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVmlld0xvY2F0aW9uLnR1cm50YWJsZTpcclxuICAgICAgICAgICAgICAgIHNlbGVjdFR5cGUgPSB0aGlzLmdldENvbmZpZ0J5S2V5KFwidHVybnRhYmxlX2F1dG9fc2VsZWN0X2xldmVsXCIpID8gdGhpcy5nZXRDb25maWdCeUtleShcInR1cm50YWJsZV9hdXRvX3NlbGVjdF9sZXZlbFwiKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdFR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICByZXN1bHQuaXNTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdFR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICByZXN1bHQuaXNTZWxlY3QgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0VHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5pc1NlbGVjdCA9IE1hdGgucmFuZG9tKCkgPj0gMC41ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LmJ0blR5cGUgPSBhZFRpcHNUeXBlID09IHJlc3VsdC5pc1NlbGVjdDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm6IO95YaN5LiL5LiA5YWz5byA5aeL55qE5pe25YCZ5by65by56KeG6aKRXHJcbiAgICAqL1xyXG4gICAgY2FuU2hvd05leHRWaWRlbyhsZXZlbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdGhpcy5nZXRDb25maWdCeUtleShcIm5leHRfYXV0b192aWRlb19pbnRlcnZhbFwiKSkge1xyXG4gICAgICAgICAgICBsZXQgY2FwID0gTnVtYmVyKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJuZXh0X2F1dG9fdmlkZW9faW50ZXJ2YWxcIikpO1xyXG4gICAgICAgICAgICBpZiAoY2FwICYmIGNhcCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgJSBjYXAgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJ2ZXJzaW9uXCIpICE9IHV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwidmVyc2lvblwiKSAhPSB1dGlscy5jb25maWcuYmFpZHVjb25maWcudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5JU1VDKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwidmVyc2lvblwiKSAhPSB1dGlscy5jb25maWcudWNDb25maWcudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXM0Mzk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcCA9IDM7Ly80Mzk55LiN6IO96K+75Y+W5pyN5Yqh5Zmo6YWN572u5YaZ5q276Ze06ZqUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXAgIT0gMCAmJiBsZXZlbCAlIGNhcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pi+56S657qi5YyFXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5TaG93UmVkQmFnKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5Ub29sX0Jyb3N3ZXIpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcgJiYgdGhpcy55elJlZEJhZ0luZm8gJiYgdGhpcy5TZXJ2ZXJDb25maWcuc2hvd19yZWRfYmFnICYmIHRoaXMuU2VydmVyQ29uZmlnLnNob3dfcmVkX2JhZyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruS4jeaYvuekuue6ouWMhee7hOS7tu+8gVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX3dpdGhkcmF3YWxXaWRnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5o+Q546w5qGG5oyC5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlV2l0aGRyYXdhbFdpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2l0aGRyYXdhbFdpZGdldCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3dpdGhkcmF3YWxXaWRnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpdGhkcmF3YWxXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaPkOeOsOahhuaMguS7tlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dXaXRoZHJhd2FsV2lkZ2V0KHBhcmFtczogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3dSZWRCYWcoKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcud2l0aGRyYXdhbFdpZGdldCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLndpdGhkcmF3YWxXaWRnZXQpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpdGhkcmF3YWxXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl93aXRoZHJhd2FsV2lkZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpdGhkcmF3YWxXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2l0aGRyYXdhbFdpZGdldCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aXRoZHJhd2FsV2lkZ2V0LnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSBwYXJhbXMuZ3JvdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gcGFyYW1zLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHBhcmFtcy50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuYm90dG9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQubGVmdCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnJpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQucmlnaHQgPSBwYXJhbXMucmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJhbXMucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacquaJvuWIsOmihOWItuS9kyBXaXRoZHJhd2FsV2lkZ2V0LCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfcmVkQmFnUHJvZ3Jlc3NXaWRnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/nuqLljIXov5vluqbmjILku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVSZWRCYWdQcm9ncmVzc1dpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVkQmFnUHJvZ3Jlc3NXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl9yZWRCYWdQcm9ncmVzc1dpZGdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVkQmFnUHJvZ3Jlc3NXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLrnuqLljIXov5vluqbmjILku7ZcclxuICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1JlZEJhZ1Byb2dyZXNzV2lkZ2V0KHBhcmFtczogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3dSZWRCYWcoKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZWRCYWdQcm9ncmVzc1dpZGdldCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnJlZEJhZ1Byb2dyZXNzV2lkZ2V0KTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWRCYWdQcm9ncmVzc1dpZGdldCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3JlZEJhZ1Byb2dyZXNzV2lkZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZEJhZ1Byb2dyZXNzV2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZEJhZ1Byb2dyZXNzV2lkZ2V0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZEJhZ1Byb2dyZXNzV2lkZ2V0LnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFJlZEJhZ1Byb2dyZXNzV2lkZ2V0KS5pbml0KHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5zY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gcGFyYW1zLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gcGFyYW1zLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIFJlZEJhZ1Byb2dyZXNzV2lkZ2V0LCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF93aXRoZHJhd2FsUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICog5pi+56S65o+Q546w5by556qXXHJcbiAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgKi9cclxuICAgIHB1YmxpYyBzaG93V2l0aGRyYXdhbFBhbmVsKHBhcmFtczogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3dSZWRCYWcoKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy53aXRoZHJhd2FsUGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy53aXRoZHJhd2FsUGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpdGhkcmF3YWxQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3dpdGhkcmF3YWxQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aXRoZHJhd2FsUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2l0aGRyYXdhbFBhbmVsID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fd2l0aGRyYXdhbFBhbmVsLCA5OTk5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgV2l0aGRyYXdhbFBhbmVsLCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX29wZW5SZWRCYWdQYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgKiDmmL7npLrlvIDnuqLljIXlvLnnqpdcclxuICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAqL1xyXG4gICAgcHVibGljIHNob3dPcGVuUmVkQmFnUGFuZWwocGFyYW1zOiBhbnkgPSBudWxsKTogY2MuTm9kZSB7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLmNsb3NlQ2FsbEZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRDbG9zZUZ1bmMgPSBwYXJhbXMuY2xvc2VDYWxsRnVuYztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRDbG9zZUZ1bmMgJiYgdGhpcy5yZXdhcmRDbG9zZUZ1bmMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvd1JlZEJhZygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkQ2xvc2VGdW5jICYmIHRoaXMucmV3YXJkQ2xvc2VGdW5jKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubG9jYXRpb24gJiYgcGFyYW1zLmxvY2F0aW9uID09PSBCYW5uZXJMb2NhdGlvbi5Ib21lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnl6UmVkQmFnSW5mby5wcm9ncmVzcyA8IHRoaXMueXpSZWRCYWdJbmZvLnRvdGFsUHJvZ3Jlc3MgJiYgIXRoaXMueXpSZWRCYWdJbmZvLmlzRnJlZVJlZEJhZykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjee6ouWMhei/m+W6puS4jea7oei2s+adoeS7tuS4lOayoeacieWFjei0uee6ouWMhemihuWPlu+8jOmmlumhteS4jeaYvuekuuaLhue6ouWMheeql+WPo1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkQ2xvc2VGdW5jICYmIHRoaXMucmV3YXJkQ2xvc2VGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy55elJlZEJhZ0luZm8uaXNGcmVlUmVkQmFnKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuc2hvd1R5cGUgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcub3BlblJlZEJhZ1BhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb25maWcub3RoZXJjb25maWcub3BlblJlZEJhZ1BhbmVsKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuUmVkQmFnUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9vcGVuUmVkQmFnUGFuZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BlblJlZEJhZ1BhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX29wZW5SZWRCYWdQYW5lbCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5zaG93VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wZW5SZWRCYWdQYW5lbC5nZXRDb21wb25lbnQoT3BlblJlZEJhZ1BhbmVsKS5pbml0RGF0YShwYXJhbXMuc2hvd1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlLCA5OTk5KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pyq5om+5Yiw6aKE5Yi25L2TIE9wZW5SZWRCYWdQYW5lbCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZXdhcmRSZWRCYWdQYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfcmV3YXJkUmVkQmFnUGFuZWxTaG93Q291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgKiDmmL7npLrojrflvpfnuqLljIXlvLnnqpdcclxuICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAqL1xyXG4gICAgcHVibGljIHNob3dSZXdhcmRSZWRCYWdQYW5lbChwYXJhbXM6IGFueSA9IG51bGwpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvd1JlZEJhZygpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB0aGlzLl9yZXdhcmRSZWRCYWdQYW5lbFNob3dDb3VudCsrO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLlNlcnZlckNvbmZpZyAmJiB0aGlzLlNlcnZlckNvbmZpZy5zaG93X3Jld2FyZF9yZWRfYmFnX2ludGVydmFsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Jld2FyZFJlZEJhZ1BhbmVsU2hvd0NvdW50ICUgMyAhPSAwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflvpfnuqLljIXlvLnnqpfmnKrovr7liLDmnI3liqHlmajphY3nva7nmoTpl7TpmpTpmZDliLbvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcucmV3YXJkUmVkQmFnUGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZXdhcmRSZWRCYWdQYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmV3YXJkUmVkQmFnUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9yZXdhcmRSZWRCYWdQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXdhcmRSZWRCYWdQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXdhcmRSZWRCYWdQYW5lbCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKHRoaXMuX3Jld2FyZFJlZEJhZ1BhbmVsLCA5OTk5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgT3BlblJlZEJhZ1BhbmVsLCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog5piv5ZCm56uW5bGP5LqS5o6o56qX5Y+jXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGlzVmVydGljYWxSZWNvbW1lbnRQYW5lbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuVG9vbF9Ccm9zd2VyKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLndlY2hhdFRvb2xcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMud2VjaGF0VG9vbC5TZXJ2ZXJDb25maWcuaXNfdmVydGljYWxfZ2FtZSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaXNfdmVydGljYWxfZ2FtZeWPguaVsOS4umZhbHNl77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX3ZlcnRpY2FsX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLm9wcG9Ub29sXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMub3Bwb1Rvb2wuU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcImlzX3ZlcnRpY2FsX2dhbWXlj4LmlbDkuLpmYWxzZe+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpc192ZXJ0aWNhbF9nYW1l5Y+C5pWw77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNBbmRyb2lkXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfRG91eWluXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9Eb3V5aW4uU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9Eb3V5aW4uU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9Eb3V5aW4uU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcImlzX3ZlcnRpY2FsX2dhbWXlj4LmlbDkuLpmYWxzZe+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLphY3nva7kuK3msqHmnIlpc192ZXJ0aWNhbF9nYW1l5Y+C5pWw77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgea4uOaIj+WGhei3s+i9rO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3VwcG9ydG5hdmlnYXRlVG9NaW5pR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9CYWlkdVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfQmFpZHUuU2VydmVyQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9CYWlkdS5TZXJ2ZXJDb25maWcuaXNfdmVydGljYWxfZ2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0JhaWR1LlNlcnZlckNvbmZpZy5pc192ZXJ0aWNhbF9nYW1lID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCJpc192ZXJ0aWNhbF9nYW1l5Y+C5pWw5Li6ZmFsc2XvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi6YWN572u5Lit5rKh5pyJaXNfdmVydGljYWxfZ2FtZeWPguaVsO+8jOabtOWkmua4uOaIj+S+p+i+ueagj+e7hOS7tuS4jeaYvuekuu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlvZPliY3lubPlj7DkuI3mlK/mjIHmuLjmiI/lhoXot7PovazvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLlRvb2xfUVFcclxuICAgICAgICAgICAgICAgICAgICAmJiB1dGlscy5Ub29sX1FRLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfUVEuU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9RUS5TZXJ2ZXJDb25maWcuaXNfdmVydGljYWxfZ2FtZSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaXNfdmVydGljYWxfZ2FtZeWPguaVsOS4umZhbHNl77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX3ZlcnRpY2FsX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5b2T5YmN5bmz5Y+w5LiN5pSv5oyB5ri45oiP5YaF6Lez6L2s77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXM0Mzk5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9OYXRpdmVcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfTmF0aXZlLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9OYXRpdmUuU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX05hdGl2ZS5TZXJ2ZXJDb25maWcuaXNfdmVydGljYWxfZ2FtZSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaXNfdmVydGljYWxfZ2FtZeWPguaVsOS4umZhbHNl77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX3ZlcnRpY2FsX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuVG9vbF9JT1NcclxuICAgICAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfSU9TLlNlcnZlckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9JT1MuU2VydmVyQ29uZmlnLmlzX3ZlcnRpY2FsX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5Ub29sX0lPUy5TZXJ2ZXJDb25maWcuaXNfdmVydGljYWxfZ2FtZSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwiaXNfdmVydGljYWxfZ2FtZeWPguaVsOS4umZhbHNl77yM5pu05aSa5ri45oiP5L6n6L655qCP57uE5Lu25LiN5pi+56S677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX3ZlcnRpY2FsX2dhbWXlj4LmlbDvvIzmm7TlpJrmuLjmiI/kvqfovrnmoI/nu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIOaYvuekuue6ouWMhei/m+W6puaMguS7tlxyXG4gICAgICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAgICAqL1xyXG4gICAgcHVibGljIHNob3dWZXJ0aWNhbFJlY29tbWVudFBhbmVsKHBhcmFtczogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWxSZWNvbW1lbnRQYW5lbCgpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnZlcnRpY2FsUmVjb21tZW50UGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy52ZXJ0aWNhbFJlY29tbWVudFBhbmVsKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLl9yZWRCYWdQcm9ncmVzc1dpZGdldCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3JlZEJhZ1Byb2dyZXNzV2lkZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX3JlZEJhZ1Byb2dyZXNzV2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIG5vZGUuekluZGV4ID0gOTk5OTtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXQ6IGNjLldpZGdldCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5zY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gcGFyYW1zLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gcGFyYW1zLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnBvc2l0aW9uICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihDb21wYXRpYmxlVG9vbC5wb3NpdGlvbihwYXJhbXMucG9zaXRpb24ueCwgcGFyYW1zLnBvc2l0aW9uLnkpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKrmib7liLDpooTliLbkvZMgdmVydGljYWxSZWNvbW1lbnRQYW5lbCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLrnlKjmiLfljY/orq7mjILku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU2hvd1ByaXZhY3lXaWRnZXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuVG9vbF9Ccm9zd2VyKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImlzX3ByaXZhY3lcIikgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumFjee9ruS4reayoeaciWlzX3ByaXZhY3nlj4LmlbDvvIzmm7TnlKjmiLfljY/orq7mjILku7bnu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIF9wcml2YWN5V2lkZ2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S655So5oi35Y2P6K6u5oyC5Lu2XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1ByaXZhY3lXaWRnZXQocGFyYW1zOiBhbnkgPSBudWxsKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzU2hvd1ByaXZhY3lXaWRnZXQoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcucHJpdmFjeVdpZGdldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ByaXZhY3lXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl9wcml2YWN5V2lkZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByaXZhY3lXaWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5wcml2YWN5V2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByaXZhY3lXaWRnZXQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJpdmFjeVdpZGdldC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldDogY2MuV2lkZ2V0ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlblswXS5jb2xvciA9IHBhcmFtcy5jb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ncm91cCA9IHBhcmFtcy5ncm91cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5zY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQudG9wID0gcGFyYW1zLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlZnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5sZWZ0ID0gcGFyYW1zLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmlnaHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5yaWdodCA9IHBhcmFtcy5yaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9OYXRpdmUgJiYgdXRpbHMuVG9vbF9OYXRpdmUuc2hvd1ByaXZhY3lBZ3JlZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93UHJpdmFjeVBhbmVsKHsgaXNfd2lkZ2V0X2NsaWNrOiBcInRydWVcIiwgZ3JvdXA6IG5vZGUuZ3JvdXAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLpmpDnp4HmlL/nrZbmjILku7bpooTliLbkvZPkuI3lrZjlnKjvvIFcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5LiN5Y+v5pi+56S65pu05aSa5ri45oiP5L6n6L655qCPXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+makOengeaUv+etllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZVByaXZhY3lXaWRnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ByaXZhY3lXaWRnZXQgJiYgY2MuaXNWYWxpZCh0aGlzLl9wcml2YWN5V2lkZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcml2YWN5V2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaYvuekuueUqOaIt+makOengeWNj+iuruW8ueeql1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNTaG93UHJpdmFjeVBhbmVsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkgfHwgUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImlzX3ByaXZhY3lfcGFuZWxcIikpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJpc19wcml2YWN5X3BhbmVsXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCJpc19wcml2YWN5X3BhbmVs5Y+C5pWw5Li6ZmFsc2XvvIznlKjmiLfpmpDnp4HmlL/nrZblvLnnqpfnu4Tku7bkuI3mmL7npLrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJpdmFjeVBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S655So5oi35Y2P6K6u5by556qXXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1ByaXZhY3lQYW5lbChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwic2hvd1ByaXZhY3lQYW5lbD4+PlwiKTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dQYW5lbDogRnVuY3Rpb24gPSAoc2hvd0Rlc2M6IGZhbHNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcucHJpdmFjeVBhbmVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ByaXZhY3lQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3ByaXZhY3lQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcml2YWN5UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb25maWcub3RoZXJjb25maWcucHJpdmFjeVBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGxldCB5elVzZXJQcml2YWN5UGFuZWwgPSBub2RlLmdldENvbXBvbmVudChZelVzZXJQcml2YWN5UGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgeXpVc2VyUHJpdmFjeVBhbmVsLnNob3dEZXNjID0gc2hvd0Rlc2M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcml2YWN5UGFuZWwgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJpdmFjeVBhbmVsLnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YmplY3QgPSBcIua3seWcs+W4guS8mOaZuuS/oeaBr+aKgOacr+aciemZkOWFrOWPuFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMuc3ViamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QgPSBwYXJhbXMuc3ViamVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSBjYy5maW5kKFwiUGFuZWwvc3ViamVjdFwiLCBub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZztcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoJ3N1YmplY3QnLCBzdWJqZWN0KTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJQYW5lbC9zdWJqZWN0XCIsIG5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSBwYXJhbXMuZ3JvdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gcGFyYW1zLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHBhcmFtcy50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuYm90dG9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQubGVmdCA9IHBhcmFtcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnJpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQucmlnaHQgPSBwYXJhbXMucmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJhbXMucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSwgY2MubWFjcm8uTUFYX1pJTkRFWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5vZGUsIGNjLm1hY3JvLk1BWF9aSU5ERVgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIumakOengeaUv+etluW8ueeql+mihOWItuS9k+S4jeWtmOWcqO+8gVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5pc193aWRnZXRfY2xpY2spIHtcclxuICAgICAgICAgICAgc2hvd1BhbmVsKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB5c3h5ID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuWVpfR0FNRV9ZU1hZKTtcclxuICAgICAgICAgICAgaWYgKHlzeHkpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRQcml2YWN5Q2xvc2VFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW3sue7j+WQjOaEj+i/h+makOengeWNj+iuru+8jOS4jeaYvuekuumakOengeWNj+iuruW8ueeql++8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJEYXRhTG9hZFN1Y2Nlc3NFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaG93UGFuZWwoKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBtaW5TY2FsZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICBtYXhTY2FsZTogbnVtYmVyID0gMS4zO1xyXG5cclxuICAgIHJ1blRpbWU6IG51bWJlciA9IDAuMztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaUvuWkp+e8qeWwj+WKqOaAgSBcclxuICAgICAqIEBwYXJhbSB2aWRlb0J0biDop4bpopHmkq3mlL7mjInpkq5cclxuICAgICAqIEBwYXJhbSBub3JtYWxCdG4g5pmu6YCa5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlQnRuIOaYr+WQpuWPmOaNouaMiemSruS9jee9rlxyXG4gICAgICogQHBhcmFtIHNob3dIYW5kIOaYr+WQpuaYvuekuuaJi+WKv1xyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOaMiemSruaJgOWxnueahOmhtemdouS9jee9rlxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHNob3dTY2FsZUFjdGlvbih2aWRlb0J0bjogY2MuTm9kZSwgbm9ybWFsQnRuOiBjYy5Ob2RlID0gbnVsbCwgY2hhbmdlQnRuOiBib29sZWFuID0gdHJ1ZSwgc2hvd0hhbmQ6IGJvb2xlYW4gPSB0cnVlLCBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ob25lKSB7XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VCdG4pIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKG5vcm1hbEJ0bikgfHwgIWNjLmlzVmFsaWQodmlkZW9CdG4pKSByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHZpZGVvQnRuKSkgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5idG5fc2hvd19zY2FsZSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5jaGFuZ2VfYnRuX3Bvc2l0aW9uID0gXCJ0cnVlXCJcclxuICAgICAgICAgICAgdGhpcy5TZXJ2ZXJDb25maWcub3Zlcl9wYWdlX2NoYW5nZV9idG4gPSBcImZhbHNlXCJcclxuICAgICAgICAgICAgdGhpcy5TZXJ2ZXJDb25maWcub3Zlcl9wYWdlX3NjYWxlX2J0biA9IFwiZmFsc2VcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjYWxlTm9kZTogY2MuTm9kZSA9IHZpZGVvQnRuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nZXRDb25maWdCeUtleShcImNoYW5nZV9idG5fcG9zaXRpb25cIikgPT0gXCJ0cnVlXCIgJiYgY2hhbmdlQnRuID09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGNoYW5nZVBvc2l0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uID09IEJhbm5lckxvY2F0aW9uLk92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwib3Zlcl9wYWdlX2NoYW5nZV9idG5cIikgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X6aG16Z2i5oyJ6ZKu6YWN572u5LiN5YiH5o2i5L2N572u77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMiArIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvUG9zID0gdmlkZW9CdG4ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9ybWFsUG9zID0gbm9ybWFsQnRuLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyYW5kICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsQnRuLnBvc2l0aW9uID0gdmlkZW9Qb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9CdG4ucG9zaXRpb24gPSBub3JtYWxQb3M7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlTm9kZSA9IHZpZGVvQnRuO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbEJ0bi5wb3NpdGlvbiA9IG5vcm1hbFBvcztcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb0J0bi5wb3NpdGlvbiA9IHZpZGVvUG9zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNjYWxlTm9kZSA9IG5vcm1hbEJ0bi5wb3NpdGlvbi55ID4gdmlkZW9CdG4ucG9zaXRpb24ueSA/IG5vcm1hbEJ0biA6IHZpZGVvQnRuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJidG5fc2hvd19zY2FsZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24gPT0gQmFubmVyTG9jYXRpb24uT3ZlciAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb25maWdCeUtleShcIm92ZXJfcGFnZV9zY2FsZV9idG5cIikgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X6aG16Z2i5oyJ6ZKu6YWN572u5LiN57yp5pS+5oyJ6ZKu77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2aWRlb0J0bikge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9CdG4uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHZpZGVvQnRuLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5vcm1hbEJ0bikge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsQnRuLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxCdG4uc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8odGhpcy5ydW5UaW1lLCB0aGlzLm1heFNjYWxlKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8odGhpcy5ydW5UaW1lLCB0aGlzLm1pblNjYWxlKSk7XHJcbiAgICAgICAgICAgIHNjYWxlTm9kZS5ydW5BY3Rpb24oYWN0aW9uLnJlcGVhdEZvcmV2ZXIoKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvd0hhbmQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0J0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHZpZGVvQnRuLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcImhhbmRcIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbEJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IG5vcm1hbEJ0bi5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJoYW5kXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5oYW5kUHJlZmFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhbmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmZpZy5vdGhlcmNvbmZpZy5oYW5kUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kLnggPSBzY2FsZU5vZGUueCArIHNjYWxlTm9kZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZC55ID0gc2NhbGVOb2RlLnkgLSAxMzU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlTm9kZS5wYXJlbnQuYWRkQ2hpbGQoaGFuZCwgY2MubWFjcm8uTUFYX1pJTkRFWCArIDEsIFwiaGFuZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y6f55Sf5bm/5ZGK5pyA5ZCO5LiK5oql5pe26Ze0XHJcbiAgICBfbGFzdFJlcG9ydEFkVGltZTogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5Y6f55Sf5bm/5ZGK54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHJlcG9ydE5hdGl2ZUFkQ2xpY2soKSB7XHJcblxyXG4gICAgICAgIGlmICgobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLl9sYXN0UmVwb3J0QWRUaW1lKSAvIDEwMDAgPiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSZXBvcnRBZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFlaX0NvbnN0YW50LllaX05hdGl2ZUFkQ2xpY2spO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMb2coXCLkuIrmiqXljp/nlJ/lub/lkYrngrnlh7vvvIFcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TG9nKFwi5LiK5oql5Y6f55Sf5bm/5ZGK54K55Ye76Ze06ZqU5pe26Ze05bCP5LqOM+enku+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLrnu5PnrpfpobXpnaLlub/lkYrngrnlh7vmjInpkq5cclxuICAgICAqL1xyXG4gICAgY2FuU2hvd092ZXJQYWdlQWRCdG4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnICYmIHRoaXMuU2VydmVyQ29uZmlnLnNob3dfb3Zlcl9wYWdlX2FkX2J0biAmJiB0aGlzLlNlcnZlckNvbmZpZy5zaG93X292ZXJfcGFnZV9hZF9idG4gPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrlsI/muLjmiI/lrpjmlrnkupLmjqhiYW5uZXJcclxuICAgICAqL1xyXG4gICAgc2hvd1JlY0Jhbm5lcigpIHtcclxuICAgICAgICBpZiAoIXV0aWxzLmFkTWFuYWdlci5jaGVja1Nob3dBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65bm/5ZGK5p2h5pe26Ze05pyq6L6+6ZmQ5Yi277yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN1cl90b29sICYmIHRoaXMuY3VyX3Rvb2wuc2hvd1JlY0Jhbm5lciAmJiB0aGlzLmN1cl90b29sLnNob3dSZWNCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWwj+a4uOaIj+WumOaWueS6kuaOqOS5neWuq+agvFxyXG4gICAgICovXHJcbiAgICBzaG93R2FtZVBvcnRhbCgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF1dGlscy5hZE1hbmFnZXIuY2hlY2tTaG93QWRUaW1lKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuadoeaXtumXtOacqui+vumZkOWItu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jdXJfdG9vbCAmJiB0aGlzLmN1cl90b29sLnNob3dHYW1lUG9ydGFsICYmIHRoaXMuY3VyX3Rvb2wuc2hvd0dhbWVQb3J0YWwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLpWSVZP5Lmd5a6r5qC85oyC5Lu2XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICogYGBgXHJcbiAgICAgKiB7XHJcbiAgICAgKiB0b3A6bnVtYmVyICAgICAgIC8vIOi3neemu+Wxj+W5lemhtumDqOeahOi3neemu1xyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIF9jdXJWaXZvR2FtZVBvcnRhbExvY2F0aW9uOiBTdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHNob3dWaXZvR2FtZVBvcnRhbFdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFQbGF0VXRpbHMuSXNWSVZPKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF1dGlscy5hZE1hbmFnZXIuY2hlY2tTaG93QWRUaW1lKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuadoeaXtumXtOacqui+vumZkOWItu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJ2aXZvX2dhbWVfcHJvdGFsXCIpID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5sb2NhdGlvbiAmJiAodGhpcy5nZXRDb25maWdCeUtleShcInZpdm9fZ2FtZV9wcm90YWxfbG9jYXRpb25zXCIpLmluZGV4T2YocGFyYW1zLmxvY2F0aW9uKSA8IDApKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5L2N572u5pyN5Yqh5Zmo5pyq6YWN572u5pi+56S6VklWT+S5neWuq+agvOaMguS7tu+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9vbF9WaXZvICYmIHRoaXMuVG9vbF9WaXZvLmhpZGVHYW1lUG9ydGFsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuVG9vbF9WaXZvICYmIHRoaXMuVG9vbF9WaXZvLnNob3dHYW1lUG9ydGFsKHBhcmFtcy50b3ApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajmnKrphY3nva7mmL7npLpWSVZP5Lmd5a6r5qC85oyC5Lu277yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol49WSVZP5Lmd5a6r5qC85oyC5Lu2XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZVZpdm9HYW1lUG9ydGFsV2lkZ2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuVG9vbF9WaXZvICYmIHRoaXMuVG9vbF9WaXZvLmhpZGVHYW1lUG9ydGFsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfY3VyR2FtZURyYXdlckFkTG9jYXRpb246IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKlxyXG4gICAgKipcclxuICAgICog5pi+56S6T1BQT+S6kuaOqOaKveWxieebkuWtkOW5v+WRiu+8mlxyXG4gICAgKiDlj6rog73mmL7npLrlnKjlt6bkvqfvvIzorr7nva50b3DlgLxcclxuICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICogYGBgXHJcbiAgICAqIHtcclxuICAgICogdG9wOm51bWJlciAgICAgICAvLyDot53nprvlsY/luZXpobbpg6jnmoTot53nprtcclxuICAgICogfVxyXG4gICAgKiBgYGBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2hvd09wcG9HYW1lRHJhd2VyQWRXaWRnZXQocGFyYW1zOiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghUGxhdFV0aWxzLklzT1BQTykgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCF1dGlscy5hZE1hbmFnZXIuY2hlY2tTaG93QWRUaW1lKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuadoeaXtumXtOacqui+vumZkOWItu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5vcHBvX2dhbWVfZHJhd2VyID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuU2VydmVyQ29uZmlnLm9wcG9fZ2FtZV9kcmF3ZXJfbG9jYXRpb25zID0gXCIxLCAyLCAzLCA0LDUsNlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwib3Bwb19nYW1lX2RyYXdlclwiKSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubG9jYXRpb24gJiYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJvcHBvX2dhbWVfZHJhd2VyX2xvY2F0aW9uc1wiKS5pbmRleE9mKHBhcmFtcy5sb2NhdGlvbikgPCAwKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9ruacjeWKoeWZqOacqumFjee9ruaYvuekuk9QUE/kupLmjqjmir3lsYnnm5LlrZDvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wcG9Ub29sICYmIHRoaXMub3Bwb1Rvb2wuaGlkZUdhbWVEcmF3ZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIChwYXJhbXMgJiYgcGFyYW1zLmxvY2F0aW9uICYmIHRoaXMuX2N1ckdhbWVEcmF3ZXJBZExvY2F0aW9uICYmIHRoaXMuX2N1ckdhbWVEcmF3ZXJBZExvY2F0aW9uICE9IHBhcmFtcy5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5vcHBvVG9vbCAmJiB0aGlzLm9wcG9Ub29sLmhpZGVHYW1lRHJhd2VyQWQoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGlzLm9wcG9Ub29sICYmIHRoaXMub3Bwb1Rvb2wuc2hvd0dhbWVEcmF3ZXJBZChwYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajmnKrphY3nva7mmL7npLpPUFBP5LqS5o6o5oq95bGJ55uS5a2Q77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol49PUFBP5LqS5o6o5oq95bGJ55uS5a2Q5bm/5ZGKXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZU9wcG9HYW1lRHJhd2VyQWRXaWRnZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcHBvVG9vbCAmJiB0aGlzLm9wcG9Ub29sLmhpZGVHYW1lRHJhd2VyQWQoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAqKlxyXG4gICAgKiDmmL7npLpPUFBP5LqS5o6o5qiq5bmF5bm/5ZGK77yaXHJcbiAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAqIGBgYFxyXG4gICAgKiB7XHJcbiAgICAqIHRvcDpudW1iZXIgICAgICAgLy8g6Led56a75bGP5bmV6aG26YOo55qE6Led56a7XHJcbiAgICAqIH1cclxuICAgICogYGBgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNob3dPcHBvUmVjQmFubmVyKHBhcmFtczogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNDb25maWdJbml0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLnu4Tku7bphY3nva7mnKrliJ3lp4vljJYhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIVBsYXRVdGlscy5Jc09QUE8pIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF1dGlscy5hZE1hbmFnZXIuY2hlY2tTaG93QWRUaW1lKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuadoeaXtumXtOacqui+vumZkOWItu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VydmVyQ29uZmlnLm9wcG9fcmVjX2Jhbm5lciA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLlNlcnZlckNvbmZpZy5vcHBvX3JlY19iYW5uZXJfbG9jYXRpb25zID0gXCIxLCAyLCAzLCA0XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJvcHBvX3JlY19iYW5uZXJcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLmxvY2F0aW9uICYmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwib3Bwb19yZWNfYmFubmVyX2xvY2F0aW9uc1wiKS5pbmRleE9mKHBhcmFtcy5sb2NhdGlvbikgPCAwKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9ruacjeWKoeWZqOacqumFjee9ruaYvuekuk9QUE/kupLmjqhCYW5uZXLvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wcG9Ub29sICYmIHRoaXMub3Bwb1Rvb2wuaGlkZU9wcG9SZWNCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9wcG9Ub29sICYmIHRoaXMub3Bwb1Rvb2wuc2hvd09wcG9OZXdSZWNCYW5uZXIocGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5pyq6YWN572u5pi+56S6T1BQT+S6kuaOqEJhbm5lcu+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JePT1BQT+S6kuaOqOaoquW5heW5v+WRilxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVPcHBvUmVjQmFubmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3Bwb1Rvb2wgJiYgdGhpcy5vcHBvVG9vbC5oaWRlT3Bwb1JlY0Jhbm5lcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWunuWQjeiupOivgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhbE5hbWVBdXRoKGNvZGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKGDov5vooYzlrp7lkI3liLborqTor4HvvJojY29kZT0ke2NvZGV9ICNuYW1lPSR7bmFtZX1gKTtcclxuICAgICAgICB1dGlscy5jdXJfdG9vbCAmJiB1dGlscy5jdXJfdG9vbC5yZWFsTmFtZUF1dGggJiYgdXRpbHMuY3VyX3Rvb2wucmVhbE5hbWVBdXRoKGNvZGUsIG5hbWUsIGNhbGxCYWNrKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgIDlh7rmuLjmiI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdhbWVFeGl0KCkge1xyXG4gICAgICAgIHRoaXMuY3VyX3Rvb2wgJiYgdGhpcy5jdXJfdG9vbC5HYW1lRXhpdCAmJiB0aGlzLmN1cl90b29sLkdhbWVFeGl0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfaXNSZWFsTmFtZUF1dGg6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF95elJlYWxOYW1lQXV0aFBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65a6e5ZCN5Yi26K6k6K+B5by556qXXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1l6UmVhbE5hbWVBdXRoUGFuZWwocGFyYW1zOiBhbnkgPSBudWxsKTogY2MuTm9kZSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuWunuWQjeWItuiupOivgeW8ueeqlyFcIilcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0UmVhbE5hbWVBdXRoTG9jYWxEYXRhKCkgJiYgdGhpcy5nZXRSZWFsTmFtZUF1dGhMb2NhbERhdGEoKSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1JlYWxOYW1lQXV0aCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNSZWFsTmFtZUF1dGgpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW3sue7j+i/m+ihjOi/h+WunuWQjeWItuiupOivgSzkuI3mmL7npLrlvLnnqpfvvIFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlYWxOYW1lQXV0aENsb3NlRXZlbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNob3dUaW1lOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQgfHwgUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIHNob3dUaW1lID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdldENvbmZpZ0J5S2V5KFwic2hvd19yZWFsX25hbWVfYXV0aFwiKSkge1xyXG4gICAgICAgICAgICBzaG93VGltZSA9IHBhcnNlSW50KHRoaXMuZ2V0Q29uZmlnQnlLZXkoXCJzaG93X3JlYWxfbmFtZV9hdXRoXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaG93VGltZSA9PSAtMSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5o6n5Yi25LiN5pi+56S65a6e5ZCN5Yi25by556qX77yBXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRSZWFsTmFtZUF1dGhDbG9zZUV2ZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnNob3dSZWFsTmFtZUF1dGhQYW5lbChzaG93VGltZSArIFwiXCIpO1xyXG4gICAgICAgICAgICB9LCBzaG93VGltZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3RoZXJjb25maWcueXpSZWFsTmFtZUF1dGhQYW5lbCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3l6UmVhbE5hbWVBdXRoUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl95elJlYWxOYW1lQXV0aFBhbmVsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5feXpSZWFsTmFtZUF1dGhQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb25maWcub3RoZXJjb25maWcueXpSZWFsTmFtZUF1dGhQYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChzaG93VGltZSA9PSAtMikge1xyXG4gICAgICAgICAgICAgICAgLy/ovr7liLDpmLLmsonov7fopoHmsYLvvIznm7TmjqXmj5DnpLrkuIvnur9cclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFl6UmVhbE5hbWVBdXRoUGFuZWwpLl9pc09mZkxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2hvd1RpbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl95elJlYWxOYW1lQXV0aFBhbmVsID0gbm9kZTtcclxuICAgICAgICAgICAgdGhpcy5feXpSZWFsTmFtZUF1dGhQYW5lbC56SW5kZXggPSA5OTk5O1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSBwYXJhbXMuZ3JvdXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNjYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gcGFyYW1zLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJhbXMucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgc2hvd1RpbWUgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sIHNob3dUaW1lICogMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLlrp7lkI3liLborqTor4HlvLnnqpfpooTliLbkvZPkuI3lrZjlnKjvvIFcIilcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0UmVhbE5hbWVBdXRoTG9jYWxEYXRhKHZhbHVlKSB7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3l6X2dhbWVfcmVhbF9uYW1lJywgYCR7dmFsdWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVhbE5hbWVBdXRoTG9jYWxEYXRhKCkge1xyXG4gICAgICAgIGxldCByZWFsTmFtZSA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKCd5el9nYW1lX3JlYWxfbmFtZScpO1xyXG4gICAgICAgIGlmICghcmVhbE5hbWUpIHtcclxuICAgICAgICAgICAgcmVhbE5hbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVhbE5hbWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+Wtl+auteWQjeensOiOt+WPluacjeWKoeWZqOWvueW6lOeahOmFjee9rlxyXG4gICAgICogQHBhcmFtIGtleSDlrZfmrrXlkI3np7BcclxuICAgICAqIEByZXR1cm5zIOacjeWKoeWZqOaciemFjee9ruWImei/lOWbnuivpemFjee9ru+8jOaXoOWImei/lOWbnuepuuWtl+espuS4slxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29uZmlnQnlLZXkoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoa2V5ICYmIHRoaXMuU2VydmVyQ29uZmlnICYmIGtleSBpbiB0aGlzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TZXJ2ZXJDb25maWdba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93TG9nKGB3YXJuOuWtl+aute+8miR7a2V5fSDmnKrphY3nva7vvIFgKTtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnmbvlvZVcclxuICAgICAqIEBwYXJhbSBzdWNjZXNzQ2FsbEZ1bmMg5oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZmFpbENhbGxGdW5jIOWksei0peWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4oc3VjY2Vzc0NhbGxGdW5jPzogRnVuY3Rpb24sIGZhaWxDYWxsRnVuYz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TG9nKFwiPT09PT1sb2dpbj09PT1cIik7XHJcblxyXG4gICAgICAgIGlmIChzdWNjZXNzQ2FsbEZ1bmMpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFwieXpfbG9naW5cIiwgXCJmYWxzZVwiKSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHN1Y2Nlc3NDYWxsRnVuYyAmJiBzdWNjZXNzQ2FsbEZ1bmMoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYoWVpfQ29uc3RhbnQuU1RfTE9HSU5fU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuU1RfTE9HSU5fU1VDQ0VTUywgc3VjY2Vzc0NhbGxGdW5jLCB0aGlzKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmYWlsQ2FsbEZ1bmMpIHtcclxuICAgICAgICAgICAgbGV0IG5ld0ZhaWxGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmFpbENhbGxGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2dpblBhbmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYoWVpfQ29uc3RhbnQuU1RfTE9HSU5fRkFJTCk7XHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuU1RfTE9HSU5fRkFJTCwgbmV3RmFpbEZ1bmMsIHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdGYWlsRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvZ2luUGFuZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYy5nYW1lLnRhcmdldE9mZihZWl9Db25zdGFudC5TVF9MT0dJTl9GQUlMKTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5vbihZWl9Db25zdGFudC5TVF9MT0dJTl9GQUlMLCBuZXdGYWlsRnVuYywgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJfdG9vbCAmJiB0aGlzLmN1cl90b29sLmxvZ2luKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3Rvb2wubG9naW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5nYW1lLnRhcmdldE9mZihZWl9Db25zdGFudC5TVF9MT0dJTl9TVUNDRVNTKTtcclxuICAgICAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYoWVpfQ29uc3RhbnQuU1RfTE9HSU5fRkFJTCk7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NDYWxsRnVuYyAmJiBzdWNjZXNzQ2FsbEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3l6TG9naW5QYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuueZu+W9leW8ueeql1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0xvZ2luUGFuZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnl6TG9naW5QYW5lbCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29uZmlnLm90aGVyY29uZmlnLnl6TG9naW5QYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feXpMb2dpblBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5feXpMb2dpblBhbmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3l6TG9naW5QYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl95ekxvZ2luUGFuZWwgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlLCBjYy5tYWNyby5NQVhfWklOREVYKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIuacquaJvuWIsOmihOWItuS9kyBZekxvZ2luUGFuZWwsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/miJBVVUlEXHJcbiAgICAgKiBAcmV0dXJucyB1dWlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZVVVSUQoKSB7XHJcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBpZiAod2luZG93LnBlcmZvcm1hbmNlICYmIHR5cGVvZiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgZCArPSBwZXJmb3JtYW5jZS5ub3coKTsgLy91c2UgaGlnaC1wcmVjaXNpb24gdGltZXIgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1dWlkID0gJ3h4eHh4eHh4eHh4eDR4eHh5eHh4eHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB1dWlkO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=