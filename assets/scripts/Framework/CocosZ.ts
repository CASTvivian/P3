import GameMgr from "./GameMgr";
import DataMgr from "./DataMgr";
import UIMgr from "./UIMgr";
import ResMgr from "./ResMgr";
import Constant, { PageName } from "./Constant";
import SceneMgr from "./SceneMgr";
import AudioMgr from "./AudioMgr";
import { utils } from "../../common-plugin/Scripts/Utils";
import Msg from "./Msg";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
// @ts-ignore
const i18n = require('LanguageData');
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
        if (this.paused) return;

        dt *= this.timeScale * sp['timeScale'];

        if (this.isAnimationCached()) {
            // Cache mode and has animation queue.
            if (this._isAniComplete) {
                if (this._animationQueue.length === 0 && !this._headAniInfo) {
                    let frameCache = this._frameCache;
                    if (frameCache && frameCache.isInvalid()) {
                        frameCache.updateToFrame();
                        let frames = frameCache.frames;
                        this._curFrame = frames[frames.length - 1];
                    }
                    return;
                }
                if (!this._headAniInfo) {
                    this._headAniInfo = this._animationQueue.shift();
                }
                this._accTime += dt;
                if (this._accTime > this._headAniInfo.delay) {
                    let aniInfo = this._headAniInfo;
                    this._headAniInfo = null;
                    this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
                }
                return;
            }
            this._updateCache(dt);
        } else {
            this._updateRealtime(dt);
        }
    }
}

const { ccclass, property } = cc._decorator;

enum Languages { zh, en }

export let cocosz: CocosZ = null;

@ccclass
export default class CocosZ extends cc.Component {

    private _gameMgr: GameMgr = null;
    private _dataMgr: DataMgr = null;
    private _uiMgr: UIMgr = null;
    private _resMgr: ResMgr = null;
    private _audioMgr: AudioMgr = null;
    private _sceneMgr: SceneMgr = null;

    public get gameMgr() {
        return this._gameMgr;
    }

    public get dataMgr() {
        return this._dataMgr;
    }

    public get uiMgr() {
        return this._uiMgr;
    }

    public get resMgr() {
        return this._resMgr;
    }

    public get audioMgr() {
        return this._audioMgr;
    }

    public get sceneMgr() {
        return this._sceneMgr;
    }

    @property()
    btnDebug: boolean = false;

    private _languagesArr = ["zh", "en"];
    @property({ visible: false })
    curLanguage: string = "zh";
    @property({ visible: false })
    private _curLang: Languages = Languages.zh;
    @property({ type: cc.Enum(Languages), displayName: "当前语言", tooltip: "zh(中文) en(英文)" })
    get curLang(): Languages { return this._curLang; }
    set curLang(v: Languages) {
        this._curLang = v;
        this.curLanguage = this._languagesArr[v];
        cc.log("当前语言: ", this.curLanguage)
    }

    @property({ type: cc.AudioClip })
    audioList: Array<cc.AudioClip> = [];


    private _useCJTimes: number = 0;
    get useCJTimes() {
        return this._useCJTimes;
    }
    set useCJTimes(num: number) {
        this._useCJTimes = num;
        localStorage.setItem(Constant.ST_GameData + "useCJTimes_dmm", this._useCJTimes.toString());
    }

    private _totalCJTimes: number = 0;
    get totalCJTimes() {
        return this._totalCJTimes;
    }
    set totalCJTimes(num: number) {
        this._totalCJTimes = num;
        localStorage.setItem(Constant.ST_GameData + "totalCJTimes_dmm", this._totalCJTimes.toString());
    }

    curLevel: number = 0;
    /** 事件上报的关卡id */
    getLevelId(id?: number): number {
        return cocosz.dataMgr.TotoalCount_6;
    }

    /** 暂停计数 */
    private _pauseCount: number = 0;
    public get pauseCount() {
        return this._pauseCount;
    }
    public set pauseCount(v: number) {
        if (v < 0) { v = 0; }
        this._pauseCount = v;
        cc.log("pauseCount:", this._pauseCount);
    }
    public get isPause(): boolean {
        return (this.pauseCount > 0);
    }
    private set isPause(v: boolean) { }

    /** 最大分享数量 */
    serverConfig_shareMaxNum: number = 0;
    /** 能否显示分享 */
    public get canShare(): boolean {
        let r = false;
        if ((CC_DEBUG && this.isDeBug) || PlatUtils.IsWechat) {
            if (cocosz.dataMgr.shareNum < cocosz.serverConfig_shareMaxNum) {
                r = true;
            }
        }
        return r;
    }

    /** 是否启用调试 */
    isDeBug: boolean = false;
    /** 是否显示视频按钮 */
    isADON: boolean = true;
    /** 游戏模式 */
    gameMode: number = 6;
    onLoad() {
        cocosz = this;
        this._gameMgr = GameMgr.inst;
        this._dataMgr = DataMgr.inst;
        this._resMgr = ResMgr.inst;
        this._uiMgr = UIMgr.inst;
        this._audioMgr = AudioMgr.inst;
        this._sceneMgr = SceneMgr.inst;
        // 常驻节点
        cc.game.addPersistRootNode(this.node);

        ////////////////////////////// 初始化语言 //////////////////////////////
        if (cc.sys.languageCode) {
            if (cc.sys.languageCode.toLowerCase().indexOf("zh") > -1) {
                this.curLanguage = 'zh';
            } else {
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
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2();
        // manager.debugDrawFlags = 1;
        // cc.game.setFrameRate(30);

        //保持微信屏幕长亮不熄屏
        if (PlatUtils.IsWechat) {
            //@ts-ignore
            wx.setKeepScreenOn({ keepScreenOn: true })
        } else if (PlatUtils.IsOPPO) {
            //@ts-ignore
            qg.setKeepScreenOn({
                keepScreenOn: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            })
        } else if (PlatUtils.IsVIVO) {
            //@ts-ignore
            qg.setKeepScreenOn({
                keepScreenOn: true,
                success: function () { console.log('handling success') },
                fail: function (data, code) { console.log(`handling fail, code = ${code}`) }
            })
        }

        ////////////////////////////// 加载bundle //////////////////////////////
        cc.assetManager.loadBundle("bundleLoad", null, (err, bundle) => {
            if (!err) {
                this._initLoadingPage();
            } else {
                cc.log("加载分包bundleLoad出错")
            }
        })
    }

    private _dtBack = 1 / 60;
    protected update(dt: number): void {
        let manager = cc.director.getPhysicsManager();
        manager.enabledAccumulator = true;
        // @ts-ignore
        manager.FIXED_TIME_STEP = cc.misc.lerp(this._dtBack, dt, 0.01);
        this._dtBack = dt;
    }

    private isOk: boolean = false;
    private _initLoadingPage() {
        let url: string = "ui/UILoadingPage";
        this.resMgr.loadAndCacheRes(url, cc.Prefab, null, () => {
            this._uiMgr.openPage(PageName.UILoadingPage);
            /** 登录认证 */
            utils.login(() => {
                ////////////////////////////// 缓存初始化 //////////////////////////////
                this._initCache();
                ////////////////////////////// 加载bundleRes ///////////////////////////
                this._loadBundleRes();
                ////////////////////////////// 华为隐私->插屏 ///////////////////////////
                if (PlatUtils.IsHuaWei) {
                    utils.showYzRealNameAuthPanel();
                    utils.showPrivacyPanel();
                    this.scheduleOnce(() => {
                        utils.registerServerInitEvent(() => {
                            utils.adManager.showNativeSplashView(
                                () => { this.isOk = true; }
                            );
                        }, this);
                    }, 3);
                } else {
                    this.isOk = true;
                }
            });
        });
    }

    private _loadBundleRes() {
        cc.assetManager.loadBundle("bundleRes", (err, bundle) => {
            if (!err) {
                // 初始化bundle配置
                this._initBundleConfig();
                // 加载资源
                this._loadRes();
            } else {
                cc.log("加载分包bundleRes出错")
            }
        })
    }

    private _loadRes() {
        let totalCount: number = 0;
        let compCount: number = 0;
        // UI
        let mess1: any = [];
        cocosz.getDirWithPath("UI/", cc.Prefab, mess1);
        cocosz.resMgr.loadAndCacheResArray(mess1, cc.Prefab, null, () => { compCount++; })
        // 图片_name
        let mess2: any = [];
        cocosz.getDirWithPath("i18n/tex_name/" + cocosz.curLanguage, cc.SpriteAtlas, mess2);
        cocosz.resMgr.loadAndCacheResArray(mess2, cc.SpriteAtlas, null, () => { compCount++; })
        // 图片_icon
        let mess3: any = [];
        cocosz.getDirWithPath("tex_common", cc.SpriteAtlas, mess3);
        cocosz.resMgr.loadAndCacheResArray(mess3, cc.SpriteAtlas, null, () => { compCount++; })
        // 头像
        let mess4: any = [];
        cocosz.getDirWithPath("prefab_heads", cc.Prefab, mess4);
        cocosz.resMgr.loadAndCacheResArray(mess4, cc.Prefab, null, () => { compCount++; })
        // 武器
        let mess5: any = [];
        cocosz.getDirWithPath("prefab_weapon", cc.Prefab, mess5);
        cocosz.resMgr.loadAndCacheResArray(mess5, cc.Prefab, null, () => { compCount++; })
        // 皮肤
        let mess6: any = [];
        cocosz.getDirWithPath("prefab_skin", cc.Prefab, mess6);
        cocosz.resMgr.loadAndCacheResArray(mess6, cc.Prefab, null, () => { compCount++; })
        // 音效
        let mess7: any = [];
        cocosz.getDirWithPath("audio_common", cc.AudioClip, mess7);
        cocosz.resMgr.loadAndCacheResArray(mess7, cc.AudioClip, null, () => { compCount++; })

        // 总资源数量
        totalCount = mess1.length + mess2.length + mess3.length + mess4.length + mess5.length + mess6.length + mess7.length;
        // 挂载音效
        this.resMgr.cacheCocoszAudio();

        let percent = 0;
        this.schedule(() => {
            percent = compCount / totalCount;
            cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_UPDATE_PROGRESS, data: percent });

            if (compCount >= totalCount && this.isOk) {
                this.unscheduleAllCallbacks();
                // 计时插屏
                utils.registerServerInitEvent(() => {
                    let t = cocosz.getConfigByKey("interval_time_show_cp");
                    if (Number.isInteger(t) && t > 0) {
                        this.schedule(() => { utils.adManager.ShowInterstitial(); }, t);
                    }
                }, this);
                // 开始在线计时
                setInterval(() => { cocosz.dataMgr.OnlineToday++; }, 1000);
                // 跳转首页
                this._sceneMgr.loadScene("Home", () => {
                    this._uiMgr.openPage(PageName.UIHomePage);
                });
            }
        }, 0);
    }

    bundleConfig: any = {
        "ui/UILoadingPage": "bundleLoad"
    }
    private _initBundleConfig() {
        let arr = ["resources", "bundleRes", "bundleLoad"];
        for (const bundleKey of arr) {
            let bundle = cc.assetManager.bundles.get(bundleKey);
            if (bundle) {
                let info = bundle["_config"]["paths"]["_map"]
                if (info) {
                    for (const key in info) {
                        this.bundleConfig[key] = bundleKey;
                    }
                }
            }
        }
        // cc.log("bundleConfig:", JSON.stringify(this.bundleConfig))
    }
    getBundleWithPath(path: string): cc.AssetManager.Bundle {
        if (this.bundleConfig[path]) {
            return cc.assetManager.bundles.get(this.bundleConfig[path]);
        } else {
            for (const key in this.bundleConfig) {
                if (key[0] === path[0]) {
                    if (key.includes(path, 0)) {
                        return cc.assetManager.bundles.get(this.bundleConfig[key]);
                    }
                }
            }
        }
        cc.log("查找budle失败：", path)
        return null;
    }
    getDirWithPath(path: string, type: typeof cc.Asset, out?: Array<Record<string, any>>) {
        let bundle = this.getBundleWithPath(path);
        if (bundle) {
            return bundle.getDirWithPath(path, type, out);
        } else {
            return null;
        }
    }

    serverConfig: any = {
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
    }
    getConfigByKey(key: string) {
        if (CC_DEBUG && cocosz.isDeBug) {
            return this.serverConfig ? this.serverConfig[key] : null;
        } else {
            return utils.getConfigByKey(key);
        }
    }
    private _initConfigKey() {
        let callback = () => {
            // 0 测试模式
            if (cocosz.getConfigByKey("game_debug") == "true") {
                cocosz.isDeBug = true;
            }
            // 1 分享最大数量
            let shareMaxNum = cocosz.getConfigByKey("shareMaxNum");
            if (Number.isInteger(shareMaxNum) && shareMaxNum >= 0) {
                cocosz.serverConfig_shareMaxNum = shareMaxNum;
            }
            // 2 分享所需的时间
            let shareTime = cocosz.getConfigByKey("shareTime");
            if (Number.isInteger(shareTime) && shareTime >= 0) {
                cocosz.serverConfig_shareTime = shareTime;
            }
        }

        if (CC_DEBUG && this.isDeBug) {
            callback && callback();
        }
        else {
            // 注册服务器回调
            utils.registerServerInitEvent(callback, this);
        }
    }

    private _initCache() {
        // 缓存
        cocosz.dataMgr && cocosz.dataMgr.init();
        if (cocosz.dataMgr.LastLoadDate != (new Date()).toDateString()) {
            cocosz.dataMgr.LastLoadDate = (new Date()).toDateString();
            cocosz.dataMgr.shareNum = 0;
        }

        if (localStorage.getItem(Constant.ST_GameData + "totalCJTimes_dmm")) {
            this._totalCJTimes = Number(localStorage.getItem(Constant.ST_GameData + "totalCJTimes_dmm"));
        }
        if (localStorage.getItem(Constant.ST_GameData + "useCJTimes_dmm")) {
            this._useCJTimes = Number(localStorage.getItem(Constant.ST_GameData + "useCJTimes_dmm"));
        }
        if (new Date().toDateString() != cocosz.dataMgr.LastLoadDate) {
            this.useCJTimes = 0;
            cocosz.dataMgr.OnlineToday = 0;
            cocosz.dataMgr.receiveToday = [0, 0, 0, 0, 0];
            cocosz.dataMgr.LastLoadDate = new Date().toDateString();
        }
    }

    /** 是否显示广告 */
    public get isShowAd() {
        return true;
    }

    /** 是否显示游戏banner */
    public get isShowGameBanner() {
        if (cocosz.getConfigByKey("gameBanner") == "false") {
            return false;
        } else {
            return true;
        }
    }

    /** 秒转换时分秒 */
    StoHMS(s: number) {
        let m = 0;// 分
        let h = 0;// 小时
        if (s >= 60) {
            m = Math.floor(s / 60);
            s = Math.floor(s % 60);
            if (m > 60) {
                h = Math.floor(m / 60);
                m = Math.floor(m % 60);
            }
        }
        let r = "";
        r += (h == 0 ? "" : h + ":");
        r += (m >= 10 ? "" + m : "0" + m);
        r += (s >= 10 ? ":" + s : ":0" + s);
        return r;
    }

    /**
     * 看视频
     * @param callFun_S 播放成功时回调
     * @param callFun_F 播放失败时回调
     */
    watchAD(callFun_S: Function = null, callFun_F: Function = null) {
        if (this.isDeBug) {
            if (callFun_S) {
                callFun_S();
            } else if (callFun_F) {
                callFun_F();
            }
            return;
        }
        if (cocosz.audioMgr.videoOn) return;
        cocosz.audioMgr.videoOn = true;
        cocosz.pauseCount++;
        cocosz.audioMgr.stopAll();
        utils.adManager.ShowVideo((ret, msg) => {
            cocosz.audioMgr.videoOn = false;
            cocosz.pauseCount--;
            cocosz.audioMgr.playBgm();
            if (ret) {
                callFun_S && callFun_S();
            }
            else {
                callFun_F && callFun_F();
                msg = msg ? msg : i18n.t("msg.video_load_fail");//视频加载失败
                Msg.Show(msg);
            }
        })
    }

    // 分享所需的时间(单位/秒)
    serverConfig_shareTime: number = 2;
    /**
     * 
     * @param 分享成功回调
     * @param 分享失败回调
     */
    public share(callFun_S: Function = null, callFun_F: Function = null) {
        if (this.isDeBug) {
            callFun_S && callFun_S();
            cocosz.dataMgr.shareNum++;
        } else {
            let startTime = (new Date()).getTime();
            utils.share(() => {
                if ((new Date()).getTime() - startTime > (this.serverConfig_shareTime * 1000)) {
                    callFun_S && callFun_S();
                    cocosz.dataMgr.shareNum++;
                } else {
                    callFun_F && callFun_F();
                    Msg.Show("请分享至不同好友才可获得奖励哦");
                }
            });
        }
    }

    /**
     * 屏幕震动功能
     * @param type 震动类型 传递枚举：VibrateType
     */
    public vibrate(type: string = "short") {
        if (cocosz.dataMgr.ShakeOn == false) return;
        if (PlatUtils.IsWechat) {
            if (type == "short") {
                //@ts-ignore
                //使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
                wx.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                wx.vibrateLong({ success(res) { }, fail(res) { } });  //400 ms
            }
        }
        else if (PlatUtils.IsOPPO) {
            if (type == "short") {
                //@ts-ignore
                qg.vibrateShort({ success(res) { }, fail(res) { } });//（20 ms）
            } else {
                //@ts-ignore
                qg.vibrateLong({ success(res) { }, fail(res) { } });  //400 ms
            }
        } else if (PlatUtils.IsVIVO) {
            if (type == "short") {
                //@ts-ignore
                qg.vibrateShort();//（15 ms）
            } else {
                //@ts-ignore
                qg.vibrateLong(); //400 ms
            }
        } else if (PlatUtils.IsQQ) {
            if (type == "short") {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                qq.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                qq.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsDouyin) {
            if (type == "short") {
                //@ts-ignore
                tt.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                tt.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsBaidu) {
            if (type == "short") {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                swan.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                swan.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsNativeAndroid) {
            if (type == "short") {
                //@ts-ignore
                jsb.reflection.callStaticMethod(utils.Tool_Native.jniClassName, "vibrateShort", "()V");
            } else {
                //@ts-ignore
                jsb.reflection.callStaticMethod(utils.Tool_Native.jniClassName, "vibrateLong", "()V");
            }
        }
    }
}

