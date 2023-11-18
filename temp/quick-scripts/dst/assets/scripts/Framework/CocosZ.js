
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/CocosZ.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '54a8bcZAI1KMJdjQ5CMJRqd', 'CocosZ');
// scripts/Framework/CocosZ.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocosz = void 0;
var GameMgr_1 = require("./GameMgr");
var DataMgr_1 = require("./DataMgr");
var UIMgr_1 = require("./UIMgr");
var ResMgr_1 = require("./ResMgr");
var Constant_1 = require("./Constant");
var SceneMgr_1 = require("./SceneMgr");
var AudioMgr_1 = require("./AudioMgr");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var Msg_1 = require("./Msg");
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
// @ts-ignore
var i18n = require('LanguageData');
/**
 * sp.Skeleton动画
 */
if (CC_EDITOR) {
    // 重写update方法 达到在编辑模式下 自动播放动画的功能
    sp.Skeleton.prototype['lateUpdate'] = function (dt) {
        if (CC_EDITOR) {
            cc['engine']._animatingInEditMode = 1;
            cc['engine'].animatingInEditMode = 1;
        }
        if (this.paused)
            return;
        dt *= this.timeScale * sp['timeScale'];
        if (this.isAnimationCached()) {
            // Cache mode and has animation queue.
            if (this._isAniComplete) {
                if (this._animationQueue.length === 0 && !this._headAniInfo) {
                    var frameCache = this._frameCache;
                    if (frameCache && frameCache.isInvalid()) {
                        frameCache.updateToFrame();
                        var frames = frameCache.frames;
                        this._curFrame = frames[frames.length - 1];
                    }
                    return;
                }
                if (!this._headAniInfo) {
                    this._headAniInfo = this._animationQueue.shift();
                }
                this._accTime += dt;
                if (this._accTime > this._headAniInfo.delay) {
                    var aniInfo = this._headAniInfo;
                    this._headAniInfo = null;
                    this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
                }
                return;
            }
            this._updateCache(dt);
        }
        else {
            this._updateRealtime(dt);
        }
    };
}
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Languages;
(function (Languages) {
    Languages[Languages["zh"] = 0] = "zh";
    Languages[Languages["en"] = 1] = "en";
})(Languages || (Languages = {}));
exports.cocosz = null;
var CocosZ = /** @class */ (function (_super) {
    __extends(CocosZ, _super);
    function CocosZ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameMgr = null;
        _this._dataMgr = null;
        _this._uiMgr = null;
        _this._resMgr = null;
        _this._audioMgr = null;
        _this._sceneMgr = null;
        _this.btnDebug = false;
        _this._languagesArr = ["zh", "en"];
        _this.curLanguage = "zh";
        _this._curLang = Languages.zh;
        _this.audioList = [];
        _this._useCJTimes = 0;
        _this._totalCJTimes = 0;
        _this.curLevel = 0;
        /** 暂停计数 */
        _this._pauseCount = 0;
        /** 最大分享数量 */
        _this.serverConfig_shareMaxNum = 0;
        /** 是否启用调试 */
        _this.isDeBug = false;
        /** 是否显示视频按钮 */
        _this.isADON = true;
        /** 游戏模式 */
        _this.gameMode = 6;
        _this._dtBack = 1 / 60;
        _this.isOk = false;
        _this.bundleConfig = {
            "ui/UILoadingPage": "bundleLoad"
        };
        _this.serverConfig = {
            ////////////////// 分享 ///////////////////
            // 分享最大次数(平台不能分享不要配置)
            "shareMaxNum": 5,
            // 分享成功的时间(秒)
            "shareTime": 2,
            ////////////////// 视频 ///////////////////
            // 视频点_游戏界面_高级武器（默认显示）
            "isVideoAd_advanced_weapon": "true",
            // 视频点_游戏界面_全屏轰炸（默认显示）
            "isVideoAd_Qpbz": "true",
            // 视频点_游戏界面_磁铁（默认显示）
            "isVideoAd_Citie": "true",
            // 视频点_游戏界面_隐藏banner（默认隐藏）
            "isVideoAd_hideBanner": "true",
            // 视频点_技能弹窗_视频解锁数量（默认0）
            "skillLockNum": 2,
            ////////////////// banner ///////////////////
            // 是否显示游戏界面banner(默认显示)
            "isBanner_game": true,
            ////////////////// 插屏 ///////////////////
            // 首页
            "isInterstitial_UIHomePage": "true",
            // 签到
            "isInterstitial_UISignPanel": "true",
            // 转盘
            "isInterstitial_UITurntablePanel": "true",
            // 在线奖励
            "isInterstitial_UITimePanel": "true",
            // 游戏
            "isInterstitial_UIGamePage": "true",
            // 复活
            "isInterstitial_UIRevivePanel": "true",
            // 暂停
            "isInterstitial_UIPausePanel": "true",
            // 技能
            "isInterstitial_UIUpgradePanel": "true",
            // 皮肤试用间隔(组件自带)
            "try_skin_level_count": 1,
            // 皮肤试用插屏间隔(组件自带)
            "try_skin_show_ad_interval": 1,
        };
        // 分享所需的时间(单位/秒)
        _this.serverConfig_shareTime = 2;
        return _this;
    }
    Object.defineProperty(CocosZ.prototype, "gameMgr", {
        get: function () {
            return this._gameMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "dataMgr", {
        get: function () {
            return this._dataMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "uiMgr", {
        get: function () {
            return this._uiMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "resMgr", {
        get: function () {
            return this._resMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "audioMgr", {
        get: function () {
            return this._audioMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "sceneMgr", {
        get: function () {
            return this._sceneMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "curLang", {
        get: function () { return this._curLang; },
        set: function (v) {
            this._curLang = v;
            this.curLanguage = this._languagesArr[v];
            cc.log("当前语言: ", this.curLanguage);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "useCJTimes", {
        get: function () {
            return this._useCJTimes;
        },
        set: function (num) {
            this._useCJTimes = num;
            localStorage.setItem(Constant_1.default.ST_GameData + "useCJTimes_dmm", this._useCJTimes.toString());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "totalCJTimes", {
        get: function () {
            return this._totalCJTimes;
        },
        set: function (num) {
            this._totalCJTimes = num;
            localStorage.setItem(Constant_1.default.ST_GameData + "totalCJTimes_dmm", this._totalCJTimes.toString());
        },
        enumerable: false,
        configurable: true
    });
    /** 事件上报的关卡id */
    CocosZ.prototype.getLevelId = function (id) {
        return exports.cocosz.dataMgr.TotoalCount_6;
    };
    Object.defineProperty(CocosZ.prototype, "pauseCount", {
        get: function () {
            return this._pauseCount;
        },
        set: function (v) {
            if (v < 0) {
                v = 0;
            }
            this._pauseCount = v;
            cc.log("pauseCount:", this._pauseCount);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "isPause", {
        get: function () {
            return (this.pauseCount > 0);
        },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "canShare", {
        /** 能否显示分享 */
        get: function () {
            var r = false;
            if ((CC_DEBUG && this.isDeBug) || PlatUtils_1.default.IsWechat) {
                if (exports.cocosz.dataMgr.shareNum < exports.cocosz.serverConfig_shareMaxNum) {
                    r = true;
                }
            }
            return r;
        },
        enumerable: false,
        configurable: true
    });
    CocosZ.prototype.onLoad = function () {
        var _this = this;
        exports.cocosz = this;
        this._gameMgr = GameMgr_1.default.inst;
        this._dataMgr = DataMgr_1.default.inst;
        this._resMgr = ResMgr_1.default.inst;
        this._uiMgr = UIMgr_1.default.inst;
        this._audioMgr = AudioMgr_1.default.inst;
        this._sceneMgr = SceneMgr_1.default.inst;
        // 常驻节点
        cc.game.addPersistRootNode(this.node);
        ////////////////////////////// 初始化语言 //////////////////////////////
        if (cc.sys.languageCode) {
            if (cc.sys.languageCode.toLowerCase().indexOf("zh") > -1) {
                this.curLanguage = 'zh';
            }
            else {
                this.curLanguage = 'en';
            }
        }
        i18n.init(this.curLanguage);
        ////////////////////////////// 测试模式 //////////////////////////////
        this.isDeBug = this.btnDebug;
        ////////////////////////////// 服务器配置 //////////////////////////////
        this._initConfigKey();
        ////////////////////////////// 游戏配置 //////////////////////////////
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2();
        // manager.debugDrawFlags = 1;
        // cc.game.setFrameRate(30);
        //保持微信屏幕长亮不熄屏
        if (PlatUtils_1.default.IsWechat) {
            //@ts-ignore
            wx.setKeepScreenOn({ keepScreenOn: true });
        }
        else if (PlatUtils_1.default.IsOPPO) {
            //@ts-ignore
            qg.setKeepScreenOn({
                keepScreenOn: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }
        else if (PlatUtils_1.default.IsVIVO) {
            //@ts-ignore
            qg.setKeepScreenOn({
                keepScreenOn: true,
                success: function () { console.log('handling success'); },
                fail: function (data, code) { console.log("handling fail, code = " + code); }
            });
        }
        ////////////////////////////// 加载bundle //////////////////////////////
        cc.assetManager.loadBundle("bundleLoad", null, function (err, bundle) {
            if (!err) {
                _this._initLoadingPage();
            }
            else {
                cc.log("加载分包bundleLoad出错");
            }
        });
    };
    CocosZ.prototype.update = function (dt) {
        var manager = cc.director.getPhysicsManager();
        manager.enabledAccumulator = true;
        // @ts-ignore
        manager.FIXED_TIME_STEP = cc.misc.lerp(this._dtBack, dt, 0.01);
        this._dtBack = dt;
    };
    CocosZ.prototype._initLoadingPage = function () {
        var _this = this;
        var url = "ui/UILoadingPage";
        this.resMgr.loadAndCacheRes(url, cc.Prefab, null, function () {
            _this._uiMgr.openPage(Constant_1.PageName.UILoadingPage);
            /** 登录认证 */
            Utils_1.utils.login(function () {
                ////////////////////////////// 缓存初始化 //////////////////////////////
                _this._initCache();
                ////////////////////////////// 加载bundleRes ///////////////////////////
                _this._loadBundleRes();
                ////////////////////////////// 华为隐私->插屏 ///////////////////////////
                if (PlatUtils_1.default.IsHuaWei) {
                    Utils_1.utils.showYzRealNameAuthPanel();
                    Utils_1.utils.showPrivacyPanel();
                    _this.scheduleOnce(function () {
                        Utils_1.utils.registerServerInitEvent(function () {
                            Utils_1.utils.adManager.showNativeSplashView(function () { _this.isOk = true; });
                        }, _this);
                    }, 3);
                }
                else {
                    _this.isOk = true;
                }
            });
        });
    };
    CocosZ.prototype._loadBundleRes = function () {
        var _this = this;
        cc.assetManager.loadBundle("bundleRes", function (err, bundle) {
            if (!err) {
                // 初始化bundle配置
                _this._initBundleConfig();
                // 加载资源
                _this._loadRes();
            }
            else {
                cc.log("加载分包bundleRes出错");
            }
        });
    };
    CocosZ.prototype._loadRes = function () {
        var _this = this;
        var totalCount = 0;
        var compCount = 0;
        // UI
        var mess1 = [];
        exports.cocosz.getDirWithPath("UI/", cc.Prefab, mess1);
        exports.cocosz.resMgr.loadAndCacheResArray(mess1, cc.Prefab, null, function () { compCount++; });
        // 图片_name
        var mess2 = [];
        exports.cocosz.getDirWithPath("i18n/tex_name/" + exports.cocosz.curLanguage, cc.SpriteAtlas, mess2);
        exports.cocosz.resMgr.loadAndCacheResArray(mess2, cc.SpriteAtlas, null, function () { compCount++; });
        // 图片_icon
        var mess3 = [];
        exports.cocosz.getDirWithPath("tex_common", cc.SpriteAtlas, mess3);
        exports.cocosz.resMgr.loadAndCacheResArray(mess3, cc.SpriteAtlas, null, function () { compCount++; });
        // 头像
        var mess4 = [];
        exports.cocosz.getDirWithPath("prefab_heads", cc.Prefab, mess4);
        exports.cocosz.resMgr.loadAndCacheResArray(mess4, cc.Prefab, null, function () { compCount++; });
        // 武器
        var mess5 = [];
        exports.cocosz.getDirWithPath("prefab_weapon", cc.Prefab, mess5);
        exports.cocosz.resMgr.loadAndCacheResArray(mess5, cc.Prefab, null, function () { compCount++; });
        // 皮肤
        var mess6 = [];
        exports.cocosz.getDirWithPath("prefab_skin", cc.Prefab, mess6);
        exports.cocosz.resMgr.loadAndCacheResArray(mess6, cc.Prefab, null, function () { compCount++; });
        // 音效
        var mess7 = [];
        exports.cocosz.getDirWithPath("audio_common", cc.AudioClip, mess7);
        exports.cocosz.resMgr.loadAndCacheResArray(mess7, cc.AudioClip, null, function () { compCount++; });
        // 总资源数量
        totalCount = mess1.length + mess2.length + mess3.length + mess4.length + mess5.length + mess6.length + mess7.length;
        // 挂载音效
        this.resMgr.cacheCocoszAudio();
        var percent = 0;
        this.schedule(function () {
            percent = compCount / totalCount;
            cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_UPDATE_PROGRESS, data: percent });
            if (compCount >= totalCount && _this.isOk) {
                _this.unscheduleAllCallbacks();
                // 计时插屏
                Utils_1.utils.registerServerInitEvent(function () {
                    var t = exports.cocosz.getConfigByKey("interval_time_show_cp");
                    if (Number.isInteger(t) && t > 0) {
                        _this.schedule(function () { Utils_1.utils.adManager.ShowInterstitial(); }, t);
                    }
                }, _this);
                // 开始在线计时
                setInterval(function () { exports.cocosz.dataMgr.OnlineToday++; }, 1000);
                // 跳转首页
                _this._sceneMgr.loadScene("Home", function () {
                    _this._uiMgr.openPage(Constant_1.PageName.UIHomePage);
                });
            }
        }, 0);
    };
    CocosZ.prototype._initBundleConfig = function () {
        var arr = ["resources", "bundleRes", "bundleLoad"];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var bundleKey = arr_1[_i];
            var bundle = cc.assetManager.bundles.get(bundleKey);
            if (bundle) {
                var info = bundle["_config"]["paths"]["_map"];
                if (info) {
                    for (var key in info) {
                        this.bundleConfig[key] = bundleKey;
                    }
                }
            }
        }
        // cc.log("bundleConfig:", JSON.stringify(this.bundleConfig))
    };
    CocosZ.prototype.getBundleWithPath = function (path) {
        if (this.bundleConfig[path]) {
            return cc.assetManager.bundles.get(this.bundleConfig[path]);
        }
        else {
            for (var key in this.bundleConfig) {
                if (key[0] === path[0]) {
                    if (key.includes(path, 0)) {
                        return cc.assetManager.bundles.get(this.bundleConfig[key]);
                    }
                }
            }
        }
        cc.log("查找budle失败：", path);
        return null;
    };
    CocosZ.prototype.getDirWithPath = function (path, type, out) {
        var bundle = this.getBundleWithPath(path);
        if (bundle) {
            return bundle.getDirWithPath(path, type, out);
        }
        else {
            return null;
        }
    };
    CocosZ.prototype.getConfigByKey = function (key) {
        if (CC_DEBUG && exports.cocosz.isDeBug) {
            return this.serverConfig ? this.serverConfig[key] : null;
        }
        else {
            return Utils_1.utils.getConfigByKey(key);
        }
    };
    CocosZ.prototype._initConfigKey = function () {
        var callback = function () {
            // 0 测试模式
            if (exports.cocosz.getConfigByKey("game_debug") == "true") {
                exports.cocosz.isDeBug = true;
            }
            // 1 分享最大数量
            var shareMaxNum = exports.cocosz.getConfigByKey("shareMaxNum");
            if (Number.isInteger(shareMaxNum) && shareMaxNum >= 0) {
                exports.cocosz.serverConfig_shareMaxNum = shareMaxNum;
            }
            // 2 分享所需的时间
            var shareTime = exports.cocosz.getConfigByKey("shareTime");
            if (Number.isInteger(shareTime) && shareTime >= 0) {
                exports.cocosz.serverConfig_shareTime = shareTime;
            }
        };
        if (CC_DEBUG && this.isDeBug) {
            callback && callback();
        }
        else {
            // 注册服务器回调
            Utils_1.utils.registerServerInitEvent(callback, this);
        }
    };
    CocosZ.prototype._initCache = function () {
        // 缓存
        exports.cocosz.dataMgr && exports.cocosz.dataMgr.init();
        if (exports.cocosz.dataMgr.LastLoadDate != (new Date()).toDateString()) {
            exports.cocosz.dataMgr.LastLoadDate = (new Date()).toDateString();
            exports.cocosz.dataMgr.shareNum = 0;
        }
        if (localStorage.getItem(Constant_1.default.ST_GameData + "totalCJTimes_dmm")) {
            this._totalCJTimes = Number(localStorage.getItem(Constant_1.default.ST_GameData + "totalCJTimes_dmm"));
        }
        if (localStorage.getItem(Constant_1.default.ST_GameData + "useCJTimes_dmm")) {
            this._useCJTimes = Number(localStorage.getItem(Constant_1.default.ST_GameData + "useCJTimes_dmm"));
        }
        if (new Date().toDateString() != exports.cocosz.dataMgr.LastLoadDate) {
            this.useCJTimes = 0;
            exports.cocosz.dataMgr.OnlineToday = 0;
            exports.cocosz.dataMgr.receiveToday = [0, 0, 0, 0, 0];
            exports.cocosz.dataMgr.LastLoadDate = new Date().toDateString();
        }
    };
    Object.defineProperty(CocosZ.prototype, "isShowAd", {
        /** 是否显示广告 */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CocosZ.prototype, "isShowGameBanner", {
        /** 是否显示游戏banner */
        get: function () {
            if (exports.cocosz.getConfigByKey("gameBanner") == "false") {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: false,
        configurable: true
    });
    /** 秒转换时分秒 */
    CocosZ.prototype.StoHMS = function (s) {
        var m = 0; // 分
        var h = 0; // 小时
        if (s >= 60) {
            m = Math.floor(s / 60);
            s = Math.floor(s % 60);
            if (m > 60) {
                h = Math.floor(m / 60);
                m = Math.floor(m % 60);
            }
        }
        var r = "";
        r += (h == 0 ? "" : h + ":");
        r += (m >= 10 ? "" + m : "0" + m);
        r += (s >= 10 ? ":" + s : ":0" + s);
        return r;
    };
    /**
     * 看视频
     * @param callFun_S 播放成功时回调
     * @param callFun_F 播放失败时回调
     */
    CocosZ.prototype.watchAD = function (callFun_S, callFun_F) {
        if (callFun_S === void 0) { callFun_S = null; }
        if (callFun_F === void 0) { callFun_F = null; }
        if (this.isDeBug) {
            if (callFun_S) {
                callFun_S();
            }
            else if (callFun_F) {
                callFun_F();
            }
            return;
        }
        if (exports.cocosz.audioMgr.videoOn)
            return;
        exports.cocosz.audioMgr.videoOn = true;
        exports.cocosz.pauseCount++;
        exports.cocosz.audioMgr.stopAll();
        Utils_1.utils.adManager.ShowVideo(function (ret, msg) {
            exports.cocosz.audioMgr.videoOn = false;
            exports.cocosz.pauseCount--;
            exports.cocosz.audioMgr.playBgm();
            if (ret) {
                callFun_S && callFun_S();
            }
            else {
                callFun_F && callFun_F();
                msg = msg ? msg : i18n.t("msg.video_load_fail"); //视频加载失败
                Msg_1.default.Show(msg);
            }
        });
    };
    /**
     *
     * @param 分享成功回调
     * @param 分享失败回调
     */
    CocosZ.prototype.share = function (callFun_S, callFun_F) {
        var _this = this;
        if (callFun_S === void 0) { callFun_S = null; }
        if (callFun_F === void 0) { callFun_F = null; }
        if (this.isDeBug) {
            callFun_S && callFun_S();
            exports.cocosz.dataMgr.shareNum++;
        }
        else {
            var startTime_1 = (new Date()).getTime();
            Utils_1.utils.share(function () {
                if ((new Date()).getTime() - startTime_1 > (_this.serverConfig_shareTime * 1000)) {
                    callFun_S && callFun_S();
                    exports.cocosz.dataMgr.shareNum++;
                }
                else {
                    callFun_F && callFun_F();
                    Msg_1.default.Show("请分享至不同好友才可获得奖励哦");
                }
            });
        }
    };
    /**
     * 屏幕震动功能
     * @param type 震动类型 传递枚举：VibrateType
     */
    CocosZ.prototype.vibrate = function (type) {
        if (type === void 0) { type = "short"; }
        if (exports.cocosz.dataMgr.ShakeOn == false)
            return;
        if (PlatUtils_1.default.IsWechat) {
            if (type == "short") {
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
            if (type == "short") {
                //@ts-ignore
                qg.vibrateShort({ success: function (res) { }, fail: function (res) { } }); //（20 ms）
            }
            else {
                //@ts-ignore
                qg.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsVIVO) {
            if (type == "short") {
                //@ts-ignore
                qg.vibrateShort(); //（15 ms）
            }
            else {
                //@ts-ignore
                qg.vibrateLong(); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsQQ) {
            if (type == "short") {
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
            if (type == "short") {
                //@ts-ignore
                tt.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                tt.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsBaidu) {
            if (type == "short") {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                swan.vibrateShort({ success: function (res) { }, fail: function (res) { } });
            }
            else {
                //@ts-ignore
                swan.vibrateLong({ success: function (res) { }, fail: function (res) { } }); //400 ms
            }
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            if (type == "short") {
                //@ts-ignore
                jsb.reflection.callStaticMethod(Utils_1.utils.Tool_Native.jniClassName, "vibrateShort", "()V");
            }
            else {
                //@ts-ignore
                jsb.reflection.callStaticMethod(Utils_1.utils.Tool_Native.jniClassName, "vibrateLong", "()V");
            }
        }
    };
    __decorate([
        property()
    ], CocosZ.prototype, "btnDebug", void 0);
    __decorate([
        property({ visible: false })
    ], CocosZ.prototype, "curLanguage", void 0);
    __decorate([
        property({ visible: false })
    ], CocosZ.prototype, "_curLang", void 0);
    __decorate([
        property({ type: cc.Enum(Languages), displayName: "当前语言", tooltip: "zh(中文) en(英文)" })
    ], CocosZ.prototype, "curLang", null);
    __decorate([
        property({ type: cc.AudioClip })
    ], CocosZ.prototype, "audioList", void 0);
    CocosZ = __decorate([
        ccclass
    ], CocosZ);
    return CocosZ;
}(cc.Component));
exports.default = CocosZ;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxDb2Nvc1oudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFDaEMsaUNBQTRCO0FBQzVCLG1DQUE4QjtBQUM5Qix1Q0FBZ0Q7QUFDaEQsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUNsQywyREFBMEQ7QUFDMUQsNkJBQXdCO0FBQ3hCLG1FQUE4RDtBQUM5RCxhQUFhO0FBQ2IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDOztHQUVHO0FBQ0gsSUFBSSxTQUFTLEVBQUU7SUFDWCxnQ0FBZ0M7SUFDaEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxFQUFFO1FBQzlDLElBQUksU0FBUyxFQUFFO1lBQ1gsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFeEIsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDMUIsc0NBQXNDO1lBQ3RDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN6RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUNsQyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUU7d0JBQ3RDLFVB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LElBQUksT0FBTyxFQUFFO2dCQUNqQixZQUFZO2dCQUNaLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzFGO2lCQUFNO2dCQUNILFlBQVk7Z0JBQ1osR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekY7U0FDSjtJQUNMLENBQUM7SUExaUJEO1FBREMsUUFBUSxFQUFFOzRDQUNlO0lBSTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOytDQUNGO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzRDQUNjO0lBRTNDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUM7eUNBQ3BDO0lBUWxEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs2Q0FDRztJQWxEbkIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTZrQjFCO0lBQUQsYUFBQztDQTdrQkQsQUE2a0JDLENBN2tCbUMsRUFBRSxDQUFDLFNBQVMsR0E2a0IvQztrQkE3a0JvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4vR2FtZU1nclwiO1xyXG5pbXBvcnQgRGF0YU1nciBmcm9tIFwiLi9EYXRhTWdyXCI7XHJcbmltcG9ydCBVSU1nciBmcm9tIFwiLi9VSU1nclwiO1xyXG5pbXBvcnQgUmVzTWdyIGZyb20gXCIuL1Jlc01nclwiO1xyXG5pbXBvcnQgQ29uc3RhbnQsIHsgUGFnZU5hbWUgfSBmcm9tIFwiLi9Db25zdGFudFwiO1xyXG5pbXBvcnQgU2NlbmVNZ3IgZnJvbSBcIi4vU2NlbmVNZ3JcIjtcclxuaW1wb3J0IEF1ZGlvTWdyIGZyb20gXCIuL0F1ZGlvTWdyXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgTXNnIGZyb20gXCIuL01zZ1wiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvUGxhdFV0aWxzXCI7XHJcbi8vIEB0cy1pZ25vcmVcclxuY29uc3QgaTE4biA9IHJlcXVpcmUoJ0xhbmd1YWdlRGF0YScpO1xyXG4vKipcclxuICogc3AuU2tlbGV0b27liqjnlLtcclxuICovXHJcbmlmIChDQ19FRElUT1IpIHtcclxuICAgIC8vIOmHjeWGmXVwZGF0ZeaWueazlSDovr7liLDlnKjnvJbovpHmqKHlvI/kuIsg6Ieq5Yqo5pKt5pS+5Yqo55S755qE5Yqf6IO9XHJcbiAgICBzcC5Ta2VsZXRvbi5wcm90b3R5cGVbJ2xhdGVVcGRhdGUnXSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgY2NbJ2VuZ2luZSddLl9hbmltYXRpbmdJbkVkaXRNb2RlID0gMTtcclxuICAgICAgICAgICAgY2NbJ2VuZ2luZSddLmFuaW1hdGluZ0luRWRpdE1vZGUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgZHQgKj0gdGhpcy50aW1lU2NhbGUgKiBzcFsndGltZVNjYWxlJ107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgLy8gQ2FjaGUgbW9kZSBhbmQgaGFzIGFuaW1hdGlvbiBxdWV1ZS5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQW5pQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25RdWV1ZS5sZW5ndGggPT09IDAgJiYgIXRoaXMuX2hlYWRBbmlJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyYW1lQ2FjaGUgPSB0aGlzLl9mcmFtZUNhY2hlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmFtZUNhY2hlICYmIGZyYW1lQ2FjaGUuaXNJbnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZXMgPSBmcmFtZUNhY2hlLmZyYW1lcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSBmcmFtZXNbZnJhbWVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hlYWRBbmlJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVhZEFuaUluZm8gPSB0aGlzLl9hbmltYXRpb25RdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjVGltZSArPSBkdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hY2NUaW1lID4gdGhpcy5faGVhZEFuaUluZm8uZGVsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5pSW5mbyA9IHRoaXMuX2hlYWRBbmlJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRBbmlJbmZvID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigwLCBhbmlJbmZvLmFuaW1hdGlvbk5hbWUsIGFuaUluZm8ubG9vcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FjaGUoZHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlYWx0aW1lKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIExhbmd1YWdlcyB7IHpoLCBlbiB9XHJcblxyXG5leHBvcnQgbGV0IGNvY29zejogQ29jb3NaID0gbnVsbDtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvY29zWiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FtZU1ncjogR2FtZU1nciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9kYXRhTWdyOiBEYXRhTWdyID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3VpTWdyOiBVSU1nciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9yZXNNZ3I6IFJlc01nciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9hdWRpb01ncjogQXVkaW9NZ3IgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc2NlbmVNZ3I6IFNjZW5lTWdyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdhbWVNZ3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVNZ3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhTWdyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhTWdyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdWlNZ3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VpTWdyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVzTWdyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNNZ3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhdWRpb01ncigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXVkaW9NZ3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzY2VuZU1ncigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmVNZ3I7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGJ0bkRlYnVnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGFuZ3VhZ2VzQXJyID0gW1wiemhcIiwgXCJlblwiXTtcclxuICAgIEBwcm9wZXJ0eSh7IHZpc2libGU6IGZhbHNlIH0pXHJcbiAgICBjdXJMYW5ndWFnZTogc3RyaW5nID0gXCJ6aFwiO1xyXG4gICAgQHByb3BlcnR5KHsgdmlzaWJsZTogZmFsc2UgfSlcclxuICAgIHByaXZhdGUgX2N1ckxhbmc6IExhbmd1YWdlcyA9IExhbmd1YWdlcy56aDtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oTGFuZ3VhZ2VzKSwgZGlzcGxheU5hbWU6IFwi5b2T5YmN6K+t6KiAXCIsIHRvb2x0aXA6IFwiemgo5Lit5paHKSBlbijoi7HmlocpXCIgfSlcclxuICAgIGdldCBjdXJMYW5nKCk6IExhbmd1YWdlcyB7IHJldHVybiB0aGlzLl9jdXJMYW5nOyB9XHJcbiAgICBzZXQgY3VyTGFuZyh2OiBMYW5ndWFnZXMpIHtcclxuICAgICAgICB0aGlzLl9jdXJMYW5nID0gdjtcclxuICAgICAgICB0aGlzLmN1ckxhbmd1YWdlID0gdGhpcy5fbGFuZ3VhZ2VzQXJyW3ZdO1xyXG4gICAgICAgIGNjLmxvZyhcIuW9k+WJjeivreiogDogXCIsIHRoaXMuY3VyTGFuZ3VhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQXVkaW9DbGlwIH0pXHJcbiAgICBhdWRpb0xpc3Q6IEFycmF5PGNjLkF1ZGlvQ2xpcD4gPSBbXTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfdXNlQ0pUaW1lczogbnVtYmVyID0gMDtcclxuICAgIGdldCB1c2VDSlRpbWVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VDSlRpbWVzO1xyXG4gICAgfVxyXG4gICAgc2V0IHVzZUNKVGltZXMobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl91c2VDSlRpbWVzID0gbnVtO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50LlNUX0dhbWVEYXRhICsgXCJ1c2VDSlRpbWVzX2RtbVwiLCB0aGlzLl91c2VDSlRpbWVzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RvdGFsQ0pUaW1lczogbnVtYmVyID0gMDtcclxuICAgIGdldCB0b3RhbENKVGltZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsQ0pUaW1lcztcclxuICAgIH1cclxuICAgIHNldCB0b3RhbENKVGltZXMobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90b3RhbENKVGltZXMgPSBudW07XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnQuU1RfR2FtZURhdGEgKyBcInRvdGFsQ0pUaW1lc19kbW1cIiwgdGhpcy5fdG90YWxDSlRpbWVzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGN1ckxldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOS6i+S7tuS4iuaKpeeahOWFs+WNoWlkICovXHJcbiAgICBnZXRMZXZlbElkKGlkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gY29jb3N6LmRhdGFNZ3IuVG90b2FsQ291bnRfNjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pqC5YGc6K6h5pWwICovXHJcbiAgICBwcml2YXRlIF9wYXVzZUNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGdldCBwYXVzZUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXVzZUNvdW50O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBwYXVzZUNvdW50KHY6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2IDwgMCkgeyB2ID0gMDsgfVxyXG4gICAgICAgIHRoaXMuX3BhdXNlQ291bnQgPSB2O1xyXG4gICAgICAgIGNjLmxvZyhcInBhdXNlQ291bnQ6XCIsIHRoaXMuX3BhdXNlQ291bnQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc1BhdXNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5wYXVzZUNvdW50ID4gMCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldCBpc1BhdXNlKHY6IGJvb2xlYW4pIHsgfVxyXG5cclxuICAgIC8qKiDmnIDlpKfliIbkuqvmlbDph48gKi9cclxuICAgIHNlcnZlckNvbmZpZ19zaGFyZU1heE51bTogbnVtYmVyID0gMDtcclxuICAgIC8qKiDog73lkKbmmL7npLrliIbkuqsgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FuU2hhcmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHIgPSBmYWxzZTtcclxuICAgICAgICBpZiAoKENDX0RFQlVHICYmIHRoaXMuaXNEZUJ1ZykgfHwgUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5zaGFyZU51bSA8IGNvY29zei5zZXJ2ZXJDb25maWdfc2hhcmVNYXhOdW0pIHtcclxuICAgICAgICAgICAgICAgIHIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmmK/lkKblkK/nlKjosIPor5UgKi9cclxuICAgIGlzRGVCdWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmmL7npLrop4bpopHmjInpkq4gKi9cclxuICAgIGlzQURPTjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvKiog5ri45oiP5qih5byPICovXHJcbiAgICBnYW1lTW9kZTogbnVtYmVyID0gNjtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb2Nvc3ogPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2dhbWVNZ3IgPSBHYW1lTWdyLmluc3Q7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1nciA9IERhdGFNZ3IuaW5zdDtcclxuICAgICAgICB0aGlzLl9yZXNNZ3IgPSBSZXNNZ3IuaW5zdDtcclxuICAgICAgICB0aGlzLl91aU1nciA9IFVJTWdyLmluc3Q7XHJcbiAgICAgICAgdGhpcy5fYXVkaW9NZ3IgPSBBdWRpb01nci5pbnN0O1xyXG4gICAgICAgIHRoaXMuX3NjZW5lTWdyID0gU2NlbmVNZ3IuaW5zdDtcclxuICAgICAgICAvLyDluLjpqbvoioLngrlcclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g5Yid5aeL5YyW6K+t6KiAIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGlmIChjYy5zeXMubGFuZ3VhZ2VDb2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMubGFuZ3VhZ2VDb2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInpoXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyTGFuZ3VhZ2UgPSAnemgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJMYW5ndWFnZSA9ICdlbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY3VyTGFuZ3VhZ2UpO1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDmtYvor5XmqKHlvI8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgdGhpcy5pc0RlQnVnID0gdGhpcy5idG5EZWJ1ZztcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g5pyN5Yqh5Zmo6YWN572uIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIHRoaXMuX2luaXRDb25maWdLZXkoKTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g5ri45oiP6YWN572uIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcbiAgICAgICAgbGV0IG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgbWFuYWdlci5ncmF2aXR5ID0gY2MudjIoKTtcclxuICAgICAgICAvLyBtYW5hZ2VyLmRlYnVnRHJhd0ZsYWdzID0gMTtcclxuICAgICAgICAvLyBjYy5nYW1lLnNldEZyYW1lUmF0ZSgzMCk7XHJcblxyXG4gICAgICAgIC8v5L+d5oyB5b6u5L+h5bGP5bmV6ZW/5Lqu5LiN54aE5bGPXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgd3guc2V0S2VlcFNjcmVlbk9uKHsga2VlcFNjcmVlbk9uOiB0cnVlIH0pXHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxZy5zZXRLZWVwU2NyZWVuT24oe1xyXG4gICAgICAgICAgICAgICAga2VlcFNjcmVlbk9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykgeyB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykgeyB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHsgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcWcuc2V0S2VlcFNjcmVlbk9uKHtcclxuICAgICAgICAgICAgICAgIGtlZXBTY3JlZW5PbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2hhbmRsaW5nIHN1Y2Nlc3MnKSB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHsgY29uc29sZS5sb2coYGhhbmRsaW5nIGZhaWwsIGNvZGUgPSAke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIOWKoOi9vWJ1bmRsZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShcImJ1bmRsZUxvYWRcIiwgbnVsbCwgKGVyciwgYnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0TG9hZGluZ1BhZ2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veWIhuWMhWJ1bmRsZUxvYWTlh7rplJlcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZHRCYWNrID0gMSAvIDYwO1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZEFjY3VtdWxhdG9yID0gdHJ1ZTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbWFuYWdlci5GSVhFRF9USU1FX1NURVAgPSBjYy5taXNjLmxlcnAodGhpcy5fZHRCYWNrLCBkdCwgMC4wMSk7XHJcbiAgICAgICAgdGhpcy5fZHRCYWNrID0gZHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc09rOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pbml0TG9hZGluZ1BhZ2UoKSB7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gXCJ1aS9VSUxvYWRpbmdQYWdlXCI7XHJcbiAgICAgICAgdGhpcy5yZXNNZ3IubG9hZEFuZENhY2hlUmVzKHVybCwgY2MuUHJlZmFiLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VpTWdyLm9wZW5QYWdlKFBhZ2VOYW1lLlVJTG9hZGluZ1BhZ2UpO1xyXG4gICAgICAgICAgICAvKiog55m75b2V6K6k6K+BICovXHJcbiAgICAgICAgICAgIHV0aWxzLmxvZ2luKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDnvJPlrZjliJ3lp4vljJYgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0Q2FjaGUoKTtcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDliqDovb1idW5kbGVSZXMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkQnVuZGxlUmVzKCk7XHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g5Y2O5Li66ZqQ56eBLT7mj5LlsY8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd1l6UmVhbE5hbWVBdXRoUGFuZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93UHJpdmFjeVBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd05hdGl2ZVNwbGFzaFZpZXcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLmlzT2sgPSB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZEJ1bmRsZVJlcygpIHtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShcImJ1bmRsZVJlc1wiLCAoZXJyLCBidW5kbGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIOWIneWni+WMlmJ1bmRsZemFjee9rlxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdEJ1bmRsZUNvbmZpZygpO1xyXG4gICAgICAgICAgICAgICAgLy8g5Yqg6L296LWE5rqQXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUmVzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLliqDovb3liIbljIVidW5kbGVSZXPlh7rplJlcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFJlcygpIHtcclxuICAgICAgICBsZXQgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgY29tcENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vIFVJXHJcbiAgICAgICAgbGV0IG1lc3MxOiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJVSS9cIiwgY2MuUHJlZmFiLCBtZXNzMSk7XHJcbiAgICAgICAgY29jb3N6LnJlc01nci5sb2FkQW5kQ2FjaGVSZXNBcnJheShtZXNzMSwgY2MuUHJlZmFiLCBudWxsLCAoKSA9PiB7IGNvbXBDb3VudCsrOyB9KVxyXG4gICAgICAgIC8vIOWbvueJh19uYW1lXHJcbiAgICAgICAgbGV0IG1lc3MyOiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJpMThuL3RleF9uYW1lL1wiICsgY29jb3N6LmN1ckxhbmd1YWdlLCBjYy5TcHJpdGVBdGxhcywgbWVzczIpO1xyXG4gICAgICAgIGNvY29zei5yZXNNZ3IubG9hZEFuZENhY2hlUmVzQXJyYXkobWVzczIsIGNjLlNwcml0ZUF0bGFzLCBudWxsLCAoKSA9PiB7IGNvbXBDb3VudCsrOyB9KVxyXG4gICAgICAgIC8vIOWbvueJh19pY29uXHJcbiAgICAgICAgbGV0IG1lc3MzOiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJ0ZXhfY29tbW9uXCIsIGNjLlNwcml0ZUF0bGFzLCBtZXNzMyk7XHJcbiAgICAgICAgY29jb3N6LnJlc01nci5sb2FkQW5kQ2FjaGVSZXNBcnJheShtZXNzMywgY2MuU3ByaXRlQXRsYXMsIG51bGwsICgpID0+IHsgY29tcENvdW50Kys7IH0pXHJcbiAgICAgICAgLy8g5aS05YOPXHJcbiAgICAgICAgbGV0IG1lc3M0OiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJwcmVmYWJfaGVhZHNcIiwgY2MuUHJlZmFiLCBtZXNzNCk7XHJcbiAgICAgICAgY29jb3N6LnJlc01nci5sb2FkQW5kQ2FjaGVSZXNBcnJheShtZXNzNCwgY2MuUHJlZmFiLCBudWxsLCAoKSA9PiB7IGNvbXBDb3VudCsrOyB9KVxyXG4gICAgICAgIC8vIOatpuWZqFxyXG4gICAgICAgIGxldCBtZXNzNTogYW55ID0gW107XHJcbiAgICAgICAgY29jb3N6LmdldERpcldpdGhQYXRoKFwicHJlZmFiX3dlYXBvblwiLCBjYy5QcmVmYWIsIG1lc3M1KTtcclxuICAgICAgICBjb2Nvc3oucmVzTWdyLmxvYWRBbmRDYWNoZVJlc0FycmF5KG1lc3M1LCBjYy5QcmVmYWIsIG51bGwsICgpID0+IHsgY29tcENvdW50Kys7IH0pXHJcbiAgICAgICAgLy8g55qu6IKkXHJcbiAgICAgICAgbGV0IG1lc3M2OiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJwcmVmYWJfc2tpblwiLCBjYy5QcmVmYWIsIG1lc3M2KTtcclxuICAgICAgICBjb2Nvc3oucmVzTWdyLmxvYWRBbmRDYWNoZVJlc0FycmF5KG1lc3M2LCBjYy5QcmVmYWIsIG51bGwsICgpID0+IHsgY29tcENvdW50Kys7IH0pXHJcbiAgICAgICAgLy8g6Z+z5pWIXHJcbiAgICAgICAgbGV0IG1lc3M3OiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJhdWRpb19jb21tb25cIiwgY2MuQXVkaW9DbGlwLCBtZXNzNyk7XHJcbiAgICAgICAgY29jb3N6LnJlc01nci5sb2FkQW5kQ2FjaGVSZXNBcnJheShtZXNzNywgY2MuQXVkaW9DbGlwLCBudWxsLCAoKSA9PiB7IGNvbXBDb3VudCsrOyB9KVxyXG5cclxuICAgICAgICAvLyDmgLvotYTmupDmlbDph49cclxuICAgICAgICB0b3RhbENvdW50ID0gbWVzczEubGVuZ3RoICsgbWVzczIubGVuZ3RoICsgbWVzczMubGVuZ3RoICsgbWVzczQubGVuZ3RoICsgbWVzczUubGVuZ3RoICsgbWVzczYubGVuZ3RoICsgbWVzczcubGVuZ3RoO1xyXG4gICAgICAgIC8vIOaMgui9vemfs+aViFxyXG4gICAgICAgIHRoaXMucmVzTWdyLmNhY2hlQ29jb3N6QXVkaW8oKTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBwZXJjZW50ID0gY29tcENvdW50IC8gdG90YWxDb3VudDtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX1VQREFURV9QUk9HUkVTUywgZGF0YTogcGVyY2VudCB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb21wQ291bnQgPj0gdG90YWxDb3VudCAmJiB0aGlzLmlzT2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgLy8g6K6h5pe25o+S5bGPXHJcbiAgICAgICAgICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSBjb2Nvc3ouZ2V0Q29uZmlnQnlLZXkoXCJpbnRlcnZhbF90aW1lX3Nob3dfY3BcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodCkgJiYgdCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7IHV0aWxzLmFkTWFuYWdlci5TaG93SW50ZXJzdGl0aWFsKCk7IH0sIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8g5byA5aeL5Zyo57q/6K6h5pe2XHJcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7IGNvY29zei5kYXRhTWdyLk9ubGluZVRvZGF5Kys7IH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgLy8g6Lez6L2s6aaW6aG1XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU1nci5sb2FkU2NlbmUoXCJIb21lXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aU1nci5vcGVuUGFnZShQYWdlTmFtZS5VSUhvbWVQYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVuZGxlQ29uZmlnOiBhbnkgPSB7XHJcbiAgICAgICAgXCJ1aS9VSUxvYWRpbmdQYWdlXCI6IFwiYnVuZGxlTG9hZFwiXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9pbml0QnVuZGxlQ29uZmlnKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXCJyZXNvdXJjZXNcIiwgXCJidW5kbGVSZXNcIiwgXCJidW5kbGVMb2FkXCJdO1xyXG4gICAgICAgIGZvciAoY29uc3QgYnVuZGxlS2V5IG9mIGFycikge1xyXG4gICAgICAgICAgICBsZXQgYnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmJ1bmRsZXMuZ2V0KGJ1bmRsZUtleSk7XHJcbiAgICAgICAgICAgIGlmIChidW5kbGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gYnVuZGxlW1wiX2NvbmZpZ1wiXVtcInBhdGhzXCJdW1wiX21hcFwiXVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVuZGxlQ29uZmlnW2tleV0gPSBidW5kbGVLZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZyhcImJ1bmRsZUNvbmZpZzpcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5idW5kbGVDb25maWcpKVxyXG4gICAgfVxyXG4gICAgZ2V0QnVuZGxlV2l0aFBhdGgocGF0aDogc3RyaW5nKTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVuZGxlQ29uZmlnW3BhdGhdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuYnVuZGxlcy5nZXQodGhpcy5idW5kbGVDb25maWdbcGF0aF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYnVuZGxlQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5WzBdID09PSBwYXRoWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5pbmNsdWRlcyhwYXRoLCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmJ1bmRsZXMuZ2V0KHRoaXMuYnVuZGxlQ29uZmlnW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2coXCLmn6Xmib5idWRsZeWksei0pe+8mlwiLCBwYXRoKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0RGlyV2l0aFBhdGgocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG91dD86IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+KSB7XHJcbiAgICAgICAgbGV0IGJ1bmRsZSA9IHRoaXMuZ2V0QnVuZGxlV2l0aFBhdGgocGF0aCk7XHJcbiAgICAgICAgaWYgKGJ1bmRsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYnVuZGxlLmdldERpcldpdGhQYXRoKHBhdGgsIHR5cGUsIG91dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlcnZlckNvbmZpZzogYW55ID0ge1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLyDliIbkuqsgLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vIOWIhuS6q+acgOWkp+asoeaVsCjlubPlj7DkuI3og73liIbkuqvkuI3opoHphY3nva4pXHJcbiAgICAgICAgXCJzaGFyZU1heE51bVwiOiA1LFxyXG4gICAgICAgIC8vIOWIhuS6q+aIkOWKn+eahOaXtumXtCjnp5IpXHJcbiAgICAgICAgXCJzaGFyZVRpbWVcIjogMixcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vIOinhumikSAvLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8g6KeG6aKR54K5X+a4uOaIj+eVjOmdol/pq5jnuqfmrablmajvvIjpu5jorqTmmL7npLrvvIlcclxuICAgICAgICBcImlzVmlkZW9BZF9hZHZhbmNlZF93ZWFwb25cIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgLy8g6KeG6aKR54K5X+a4uOaIj+eVjOmdol/lhajlsY/ovbDngrjvvIjpu5jorqTmmL7npLrvvIlcclxuICAgICAgICBcImlzVmlkZW9BZF9RcGJ6XCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgIC8vIOinhumikeeCuV/muLjmiI/nlYzpnaJf56OB6ZOB77yI6buY6K6k5pi+56S677yJXHJcbiAgICAgICAgXCJpc1ZpZGVvQWRfQ2l0aWVcIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgLy8g6KeG6aKR54K5X+a4uOaIj+eVjOmdol/pmpDol49iYW5uZXLvvIjpu5jorqTpmpDol4/vvIlcclxuICAgICAgICBcImlzVmlkZW9BZF9oaWRlQmFubmVyXCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgIC8vIOinhumikeeCuV/mioDog73lvLnnqpdf6KeG6aKR6Kej6ZSB5pWw6YeP77yI6buY6K6kMO+8iVxyXG4gICAgICAgIFwic2tpbGxMb2NrTnVtXCI6IDIsXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLyBiYW5uZXIgLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vIOaYr+WQpuaYvuekuua4uOaIj+eVjOmdomJhbm5lcijpu5jorqTmmL7npLopXHJcbiAgICAgICAgXCJpc0Jhbm5lcl9nYW1lXCI6IHRydWUsXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLyDmj5LlsY8gLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vIOmmlumhtVxyXG4gICAgICAgIFwiaXNJbnRlcnN0aXRpYWxfVUlIb21lUGFnZVwiOiBcInRydWVcIixcclxuICAgICAgICAvLyDnrb7liLBcclxuICAgICAgICBcImlzSW50ZXJzdGl0aWFsX1VJU2lnblBhbmVsXCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgIC8vIOi9rOebmFxyXG4gICAgICAgIFwiaXNJbnRlcnN0aXRpYWxfVUlUdXJudGFibGVQYW5lbFwiOiBcInRydWVcIixcclxuICAgICAgICAvLyDlnKjnur/lpZblirFcclxuICAgICAgICBcImlzSW50ZXJzdGl0aWFsX1VJVGltZVBhbmVsXCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgIC8vIOa4uOaIj1xyXG4gICAgICAgIFwiaXNJbnRlcnN0aXRpYWxfVUlHYW1lUGFnZVwiOiBcInRydWVcIixcclxuICAgICAgICAvLyDlpI3mtLtcclxuICAgICAgICBcImlzSW50ZXJzdGl0aWFsX1VJUmV2aXZlUGFuZWxcIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgLy8g5pqC5YGcXHJcbiAgICAgICAgXCJpc0ludGVyc3RpdGlhbF9VSVBhdXNlUGFuZWxcIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgLy8g5oqA6IO9XHJcbiAgICAgICAgXCJpc0ludGVyc3RpdGlhbF9VSVVwZ3JhZGVQYW5lbFwiOiBcInRydWVcIixcclxuICAgICAgICAvLyDnmq7ogqTor5XnlKjpl7TpmpQo57uE5Lu26Ieq5bimKVxyXG4gICAgICAgIFwidHJ5X3NraW5fbGV2ZWxfY291bnRcIjogMSxcclxuICAgICAgICAvLyDnmq7ogqTor5XnlKjmj5LlsY/pl7TpmpQo57uE5Lu26Ieq5bimKVxyXG4gICAgICAgIFwidHJ5X3NraW5fc2hvd19hZF9pbnRlcnZhbFwiOiAxLFxyXG4gICAgfVxyXG4gICAgZ2V0Q29uZmlnQnlLZXkoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcgJiYgY29jb3N6LmlzRGVCdWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQ29uZmlnID8gdGhpcy5zZXJ2ZXJDb25maWdba2V5XSA6IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWxzLmdldENvbmZpZ0J5S2V5KGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfaW5pdENvbmZpZ0tleSgpIHtcclxuICAgICAgICBsZXQgY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIDAg5rWL6K+V5qih5byPXHJcbiAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2V0Q29uZmlnQnlLZXkoXCJnYW1lX2RlYnVnXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouaXNEZUJ1ZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gMSDliIbkuqvmnIDlpKfmlbDph49cclxuICAgICAgICAgICAgbGV0IHNoYXJlTWF4TnVtID0gY29jb3N6LmdldENvbmZpZ0J5S2V5KFwic2hhcmVNYXhOdW1cIik7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNoYXJlTWF4TnVtKSAmJiBzaGFyZU1heE51bSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouc2VydmVyQ29uZmlnX3NoYXJlTWF4TnVtID0gc2hhcmVNYXhOdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gMiDliIbkuqvmiYDpnIDnmoTml7bpl7RcclxuICAgICAgICAgICAgbGV0IHNoYXJlVGltZSA9IGNvY29zei5nZXRDb25maWdCeUtleShcInNoYXJlVGltZVwiKTtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIoc2hhcmVUaW1lKSAmJiBzaGFyZVRpbWUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnNlcnZlckNvbmZpZ19zaGFyZVRpbWUgPSBzaGFyZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChDQ19ERUJVRyAmJiB0aGlzLmlzRGVCdWcpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOazqOWGjOacjeWKoeWZqOWbnuiwg1xyXG4gICAgICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudChjYWxsYmFjaywgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRDYWNoZSgpIHtcclxuICAgICAgICAvLyDnvJPlrZhcclxuICAgICAgICBjb2Nvc3ouZGF0YU1nciAmJiBjb2Nvc3ouZGF0YU1nci5pbml0KCk7XHJcbiAgICAgICAgaWYgKGNvY29zei5kYXRhTWdyLkxhc3RMb2FkRGF0ZSAhPSAobmV3IERhdGUoKSkudG9EYXRlU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuTGFzdExvYWREYXRlID0gKG5ldyBEYXRlKCkpLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5zaGFyZU51bSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oQ29uc3RhbnQuU1RfR2FtZURhdGEgKyBcInRvdGFsQ0pUaW1lc19kbW1cIikpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG90YWxDSlRpbWVzID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50LlNUX0dhbWVEYXRhICsgXCJ0b3RhbENKVGltZXNfZG1tXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50LlNUX0dhbWVEYXRhICsgXCJ1c2VDSlRpbWVzX2RtbVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VDSlRpbWVzID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50LlNUX0dhbWVEYXRhICsgXCJ1c2VDSlRpbWVzX2RtbVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpICE9IGNvY29zei5kYXRhTWdyLkxhc3RMb2FkRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZUNKVGltZXMgPSAwO1xyXG4gICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5PbmxpbmVUb2RheSA9IDA7XHJcbiAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLnJlY2VpdmVUb2RheSA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuTGFzdExvYWREYXRlID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYr+WQpuaYvuekuuW5v+WRiiAqL1xyXG4gICAgcHVibGljIGdldCBpc1Nob3dBZCgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5piv5ZCm5pi+56S65ri45oiPYmFubmVyICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzU2hvd0dhbWVCYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKGNvY29zei5nZXRDb25maWdCeUtleShcImdhbWVCYW5uZXJcIikgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOenkui9rOaNouaXtuWIhuenkiAqL1xyXG4gICAgU3RvSE1TKHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtID0gMDsvLyDliIZcclxuICAgICAgICBsZXQgaCA9IDA7Ly8g5bCP5pe2XHJcbiAgICAgICAgaWYgKHMgPj0gNjApIHtcclxuICAgICAgICAgICAgbSA9IE1hdGguZmxvb3IocyAvIDYwKTtcclxuICAgICAgICAgICAgcyA9IE1hdGguZmxvb3IocyAlIDYwKTtcclxuICAgICAgICAgICAgaWYgKG0gPiA2MCkge1xyXG4gICAgICAgICAgICAgICAgaCA9IE1hdGguZmxvb3IobSAvIDYwKTtcclxuICAgICAgICAgICAgICAgIG0gPSBNYXRoLmZsb29yKG0gJSA2MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHIgPSBcIlwiO1xyXG4gICAgICAgIHIgKz0gKGggPT0gMCA/IFwiXCIgOiBoICsgXCI6XCIpO1xyXG4gICAgICAgIHIgKz0gKG0gPj0gMTAgPyBcIlwiICsgbSA6IFwiMFwiICsgbSk7XHJcbiAgICAgICAgciArPSAocyA+PSAxMCA/IFwiOlwiICsgcyA6IFwiOjBcIiArIHMpO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55yL6KeG6aKRXHJcbiAgICAgKiBAcGFyYW0gY2FsbEZ1bl9TIOaSreaUvuaIkOWKn+aXtuWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNhbGxGdW5fRiDmkq3mlL7lpLHotKXml7blm57osINcclxuICAgICAqL1xyXG4gICAgd2F0Y2hBRChjYWxsRnVuX1M6IEZ1bmN0aW9uID0gbnVsbCwgY2FsbEZ1bl9GOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0RlQnVnKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsRnVuX1MpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxGdW5fUygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNhbGxGdW5fRikge1xyXG4gICAgICAgICAgICAgICAgY2FsbEZ1bl9GKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29jb3N6LmF1ZGlvTWdyLnZpZGVvT24pIHJldHVybjtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IudmlkZW9PbiA9IHRydWU7XHJcbiAgICAgICAgY29jb3N6LnBhdXNlQ291bnQrKztcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3Iuc3RvcEFsbCgpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93VmlkZW8oKHJldCwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGNvY29zei5hdWRpb01nci52aWRlb09uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvY29zei5wYXVzZUNvdW50LS07XHJcbiAgICAgICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5QmdtKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxGdW5fUyAmJiBjYWxsRnVuX1MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxGdW5fRiAmJiBjYWxsRnVuX0YoKTtcclxuICAgICAgICAgICAgICAgIG1zZyA9IG1zZyA/IG1zZyA6IGkxOG4udChcIm1zZy52aWRlb19sb2FkX2ZhaWxcIik7Ly/op4bpopHliqDovb3lpLHotKVcclxuICAgICAgICAgICAgICAgIE1zZy5TaG93KG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIhuS6q+aJgOmcgOeahOaXtumXtCjljZXkvY0v56eSKVxyXG4gICAgc2VydmVyQ29uZmlnX3NoYXJlVGltZTogbnVtYmVyID0gMjtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0g5YiG5Lqr5oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0g5YiG5Lqr5aSx6LSl5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZShjYWxsRnVuX1M6IEZ1bmN0aW9uID0gbnVsbCwgY2FsbEZ1bl9GOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0RlQnVnKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5fUyAmJiBjYWxsRnVuX1MoKTtcclxuICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3Iuc2hhcmVOdW0rKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hhcmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUgPiAodGhpcy5zZXJ2ZXJDb25maWdfc2hhcmVUaW1lICogMTAwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsRnVuX1MgJiYgY2FsbEZ1bl9TKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3Iuc2hhcmVOdW0rKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEZ1bl9GICYmIGNhbGxGdW5fRigpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1zZy5TaG93KFwi6K+35YiG5Lqr6Iez5LiN5ZCM5aW95Y+L5omN5Y+v6I635b6X5aWW5Yqx5ZOmXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsY/luZXpnIfliqjlip/og71cclxuICAgICAqIEBwYXJhbSB0eXBlIOmch+WKqOexu+WeiyDkvKDpgJLmnprkuL7vvJpWaWJyYXRlVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmlicmF0ZSh0eXBlOiBzdHJpbmcgPSBcInNob3J0XCIpIHtcclxuICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuU2hha2VPbiA9PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJzaG9ydFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIC8v5L2/5omL5py65Y+R55Sf6L6D55+t5pe26Ze055qE5oyv5Yqo77yIMTUgbXPvvInjgILku4XlnKggaVBob25lIDcgLyA3IFBsdXMg5Lul5LiK5Y+KIEFuZHJvaWQg5py65Z6L55Sf5pWIXHJcbiAgICAgICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoeyBzdWNjZXNzKHJlcykgeyB9LCBmYWlsKHJlcykgeyB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB3eC52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7ICAvLzQwMCBtc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJzaG9ydFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHFnLnZpYnJhdGVTaG9ydCh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7Ly/vvIgyMCBtc++8iVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7ICAvLzQwMCBtc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwic2hvcnRcIikge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxZy52aWJyYXRlU2hvcnQoKTsvL++8iDE1IG1z77yJXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHFnLnZpYnJhdGVMb25nKCk7IC8vNDAwIG1zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwic2hvcnRcIikge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAvL++8iDE1IG1z77yJ77yM5LuF5ZyoIGlQaG9uZSA3LzcgUGx1cyDku6XkuIrlj4ogQW5kcm9pZCDmnLrlnovnlJ/mlYjjgIJcclxuICAgICAgICAgICAgICAgIHFxLnZpYnJhdGVTaG9ydCh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHFxLnZpYnJhdGVMb25nKHsgc3VjY2VzcyhyZXMpIHsgfSwgZmFpbChyZXMpIHsgfSB9KTsgLy80MDAgbXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwic2hvcnRcIikge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0dC52aWJyYXRlU2hvcnQoeyBzdWNjZXNzKHJlcykgeyB9LCBmYWlsKHJlcykgeyB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0dC52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7IC8vNDAwIG1zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwic2hvcnRcIikge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAvL++8iDE1IG1z77yJ77yM5LuF5ZyoIGlQaG9uZSA3LzcgUGx1cyDku6XkuIrlj4ogQW5kcm9pZCDmnLrlnovnlJ/mlYjjgIJcclxuICAgICAgICAgICAgICAgIHN3YW4udmlicmF0ZVNob3J0KHsgc3VjY2VzcyhyZXMpIHsgfSwgZmFpbChyZXMpIHsgfSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgc3dhbi52aWJyYXRlTG9uZyh7IHN1Y2Nlc3MocmVzKSB7IH0sIGZhaWwocmVzKSB7IH0gfSk7IC8vNDAwIG1zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJzaG9ydFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodXRpbHMuVG9vbF9OYXRpdmUuam5pQ2xhc3NOYW1lLCBcInZpYnJhdGVTaG9ydFwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh1dGlscy5Ub29sX05hdGl2ZS5qbmlDbGFzc05hbWUsIFwidmlicmF0ZUxvbmdcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==