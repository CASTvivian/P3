"use strict";
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