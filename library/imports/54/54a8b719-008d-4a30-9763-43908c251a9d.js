"use strict";
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