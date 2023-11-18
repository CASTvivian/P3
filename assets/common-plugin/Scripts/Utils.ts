import AdManager from "./AdManager";
import CommonConfig, { YzRedBagInfo } from "./CommonConfig";
import WechatTool from "./WechatTool";
import PlatUtils from "./PlatUtils";
import OppoTool from "./YZ_Tool_Oppo";
import YZ_Tool_Baidu from "./YZ_Tool_Baidu";
import YZ_Tool_Native from "./YZ_Tool_Native";
import YZ_Tool_Vivo from "./YZ_Tool_Vivo";
import YZ_Tool_Douyin from "./YZ_Tool_Douyin";
import YZ_Constant, { BannerLocation, LevelStatus, VibrateType, ViewLocation } from "./YZ_Constant";
import YZ_Tool_QQ from "./YZ_Tool_QQ";
import YZ_ShortcutWidget from "./YZ_ShortcutWidget";
import YZ_Tool_QTT from "./YZ_Tool_QTT";
import YZ_Tool_Xiaomi from "./YZ_Tool_Xiaomi";
import AldUtils from "./AldUtils";
import YZ_Tool_UC from "./YZ_Tool_UC";
import YZ_Tool_Cocosplay from "./YZ_Tool_Cocosplay";
import YZ_Tool_4399 from "./YZ_Tool_4399";
import YZ_Tool_IOS from "./YZ_Tool_IOS";
import YZ_Tool_Bili from "./YZ_Tool_Bili";
import YZ_Tool_Kwai from "./YZ_Tool_Kwai";
import YZ_Tool_Broswer from "./YZ_Tool_Broswer";
import YZ_Tool_WiFi from "./YZ_Tool_Wifi";
import YZ_Tool_Hago from "./YZ_Tool_Hago";
import RedBagProgressWidget from "./RedBagProgressWidget";
import CompatibleTool from "./CompatibleTool";
import YZ_Tool_HuaWei from "./YZ_Tool_HuaWei";
import OpenRedBagPanel from "./OpenRedBagPanel";
import YZ_Tool_FaceBook from "./YZ_Tool_FaceBook";
import YzRealNameAuthPanel from "./YzRealNameAuthPanel";
import YzUserPrivacyPanel from "./YzUserPrivacyPanel";
import YZ_LocalStorage from "./YZ_LocalStorage";
import YzLoginPanel from "./YzLoginPanel";
import YZ_Tool_GoogleWeb from "./YZ_Tool_GoogleWeb";
//@ts-ignore
const CryptoJS = require("./Encrypt/CryptoJS");
const secretKey = "youzhixx12345678"
//@ts-ignore
// var uma = require('./UMengSDK/uma.js');


const { ccclass, property } = cc._decorator;

export let utils: Utils = null;

const UTILSVERSION: string = "1.6.6";

@ccclass
export default class Utils extends cc.Component {

    @property({ displayName: "组件版本", readonly: true })
    public get utilsVersion() {
        return UTILSVERSION;
    }

    @property({ displayName: "测试本地数据", tooltip: "勾选此选项则使用本地配置，否则会请求服务器配置!" })
    DebugLoacalConfig: boolean = false;

    @property({ displayName: "显示日志框", tooltip: "勾选此选项则会显示日志框，用于调试!" })
    showLogView: boolean = false;


    @property({ type: CommonConfig, displayName: "配置信息" })
    config: CommonConfig = null;


    /**
     * 红包信息
     */
    yzRedBagInfo: YzRedBagInfo = null;

    public adManager: AdManager = null;

    _wechatTool: WechatTool = null;


    /**
     * 当前关卡
     */
    public currentLevel: number = 0;
    /**
     * 当前是否胜利
     */
    public isSuccess: boolean;

    /**
     * 是否在录屏中
     */
    public isRecording: boolean = false;

    /**
     * 激励组件成功回调
     */
    public rewardCallFunc: Function = null;

    /**
     * 激励组件关闭回调
     */
    public rewardCloseFunc: Function = null;

    /**
     * 激励组件原始奖励
     */
    public rewardValue: number = 0;

    /**
     * 
     * 幸运宝箱显示次数
     */
    public luckBoxShowCount: number = -1;


    /**
     * 原生插屏展示的次数
     */
    public nativeInsertShowCount: number = 0;


    /**
     *     
     * 原生插屏满足关闭按钮设置大小条件后显示的次数，用来判断间隔多少次使用服务器大小
     */
    public nativeInsertResizeCloseBtnShowCount: number = 0;

    /**
     * 原生Banner展示的次数
     */
    public nativeBannerShowCount: number = 0;


    /**
     *     
     * 原生banner满足关闭按钮设置大小条件后显示的次数，用来判断间隔多少次使用服务器大小
     */
    public nativeBannerResizeCloseBtnShowCount: number = 0;


    /**
     * 转盘抽奖关闭回调
     */
    public turnTablePanelCloseFunc: Function = null;


    /**
     * 分享录屏组件关闭回调
     */
    public shareRecordPanelCloseFunc: Function = null;


    /**
     *  宝箱关闭回调
     */
    public rewardBoxPanelCloseFunc: Function = null;

    /**
     * 添加快捷桌面组件关闭回调
     */
    public rewardShortCutPanelCloseFunc: Function = null;

    /**
    * 推荐游戏组件关闭回调
    */
    public rewardRecGamePanelCloseFunc: Function = null;

    /**
     * 幸运宝箱组件关闭回调
     */
    public rewardLuckBoxPanelCloseFunc: Function = null;


    //Banner广告关闭的时间
    public _bannerCloseTime: number = 0;
    /**
     * 其他配置：包含分组的信息
     */
    private _other_config: any = null;

    public get wechatTool() {
        if (!this._wechatTool) {
            utils.showLog("wechat tool is null");
        }

        return this._wechatTool;
    }

    _oppoTool: OppoTool = null;
    public get oppoTool() {
        if (!this._oppoTool) {
            utils.showLog("oppo tool is null");
        }
        return this._oppoTool;
    }

    _tool_Kwai: YZ_Tool_Kwai = null;
    public get kwaiTool() {
        if (!this._tool_Kwai) {
            utils.showLog("Kwai tool is null");
        }
        return this._tool_Kwai;
    }

    _tool_Wifi: YZ_Tool_WiFi = null;
    public get wifiTool() {
        if (!this._tool_Wifi) {
            utils.showLog("Wifi tool is null");
        }
        return this._tool_Wifi;
    }


    _tool_Hago: YZ_Tool_Hago = null;
    public get hagoTool() {
        if (!this._tool_Hago) {
            utils.showLog("Hago tool is null");
        }
        return this._tool_Hago;
    }




    _tool_Baidu: YZ_Tool_Baidu = null;
    public get Tool_Baidu() {
        if (!this._tool_Baidu) {
            utils.showLog("tool baidu is null");
        }
        return this._tool_Baidu;
    }

    _tool_Native: YZ_Tool_Native = null;
    public get Tool_Native() {
        if (!this._tool_Native) {
            utils.showLog("tool native is null");
        }
        return this._tool_Native;
    }

    _tool_Vivo: YZ_Tool_Vivo = null;
    public get Tool_Vivo() {
        if (!this._tool_Vivo) {
            utils.showLog("tool vivo is null");
        }
        return this._tool_Vivo;
    }

    _tool_Douyin: YZ_Tool_Douyin = null;
    public get Tool_Douyin() {
        if (!this._tool_Douyin) {
            utils.showLog("tool douyin is null");
        }
        return this._tool_Douyin;
    }

    _tool_QQ: YZ_Tool_QQ = null;
    public get Tool_QQ() {
        if (!this._tool_QQ) {
            utils.showLog("tool qq is null");
        }
        return this._tool_QQ;
    }

    _tool_XiaoMi: YZ_Tool_Xiaomi = null;
    public get Tool_XiaoMi() {
        if (!this._tool_XiaoMi) {
            utils.showLog("tool xiaomi is null");
        }
        return this._tool_XiaoMi;
    }

    _tool_QTT: YZ_Tool_QTT = null;
    public get Tool_QTT() {
        if (!this._tool_QTT) {
            utils.showLog("tool qtt is null");
        }
        return this._tool_QTT;
    }

    _tool_UC: YZ_Tool_UC = null;
    public get Tool_UC() {
        if (!this._tool_UC) {
            utils.showLog("tool uc is null");
        }
        return this._tool_UC;
    }

    _tool_Cocosplay: YZ_Tool_Cocosplay = null;
    public get Tool_Cocosplay() {
        if (!this._tool_Cocosplay) {
            utils.showLog("tool cocos is null");
        }
        return this._tool_Cocosplay;
    }
    _tool_4399: YZ_Tool_4399 = null;
    public get Tool_4399() {
        if (!this._tool_4399) {
            utils.showLog("tool 4399 is null");
        }
        return this._tool_4399;
    }

    _tool_Ios: YZ_Tool_IOS = null;
    public get Tool_IOS() {
        if (!this._tool_Ios) {
            utils.showLog("tool ios is null");
        }
        return this._tool_Ios;
    }

    _tool_bili: YZ_Tool_Bili = null;
    public get Tool_Bili() {
        if (!this._tool_Ios) {
            utils.showLog("tool ios is null");
        }
        return this._tool_bili;
    }

    _tool_Broswer: YZ_Tool_Broswer = null;
    public get Tool_Broswer(): YZ_Tool_Broswer {
        if (!this._tool_Broswer) {
            // cc.log("tool qtt is null");
        }
        return this._tool_Broswer;
    }

    _tool_Huawei: YZ_Tool_HuaWei = null;
    public get Tool_Huawei(): YZ_Tool_HuaWei {
        if (!this._tool_Huawei) {
            utils.showLog("huawei tool is null");
        }
        return this._tool_Huawei;
    }

    _tool_Facebook: YZ_Tool_FaceBook = null;
    public get Tool_Facebook(): YZ_Tool_FaceBook {
        if (!this._tool_Facebook) {
            utils.showLog("facebook tool is null");
        }
        return this._tool_Facebook;
    }
    _tool_GoogleWeb: YZ_Tool_GoogleWeb = null;
    public get Tool_GoogleWeb(): YZ_Tool_GoogleWeb {
        if (!this._tool_GoogleWeb) {
            utils.showLog("googleWeb tool is null");
        }
        return this._tool_GoogleWeb;
    }



    // 本地配置是否初始化
    _isConfigInit: boolean = false;
    // 服务器配置是否初始化
    _isServerInit: boolean = false;

    /**
     * 游戏进入时间
     */
    _gameEntryTime: number = 0;

    /**
     * 初始化配置数据
     * @param data 配置数据
     */
    private _initConfig() {
        if (this._isConfigInit) {
            utils.showLog("warn:" + "配置数据已经初始化，请勿重复初始化!");
            return;
        }

        if (this.config.otherconfig.localConfig) {
            let data = JSON.stringify(this.config.otherconfig.localConfig.json);
            utils.showLog("本地数据：" + data);
            if (data) {
                if (PlatUtils.IsNativeAndroid) {
                    // 安卓需要先获取JNI，再取本地数据
                    this.initTools(data);
                    this._isConfigInit = this._initLoacalConfig(data);
                    if (this._isConfigInit) {
                        utils.Tool_Native.init();
                    }
                } else {
                    this._isConfigInit = this._initLoacalConfig(data);
                    // 这个必须在广告组件之前初始化
                    this.initTools(data);
                }

                this._other_config = this.config.otherconfig.localConfig.json.other;


                this.adManager = new AdManager();
                this.adManager.Init();

                if (this._oppoTool) {
                    this._oppoTool.hideDefaultLoadingPage();
                }
                if (PlatUtils.IsKwai) {
                    //@ts-ignore
                    kwaigame.readyGo();
                }
                utils.yzRedBagInfo = new YzRedBagInfo();
                utils.registerServerInitEvent(() => {

                    if (utils.ServerConfig) {

                        this.serverShowLog = this.getConfigByKey("is_show_log_view") == "true";
                        this.showLogToConsole = this.getConfigByKey("show_log_to_console") == "true";
                        if (this.getConfigByKey("red_bag_total_progress")) {
                            utils.yzRedBagInfo.totalProgress = this.getConfigByKey("red_bag_total_progress");
                        }
                        if (this.getConfigByKey("red_bag_progress_infos")) {
                            utils.yzRedBagInfo.progressInfos = this.getConfigByKey("red_bag_progress_infos");
                        }

                        if (this.getConfigByKey("red_bag_moneys")) {
                            utils.yzRedBagInfo.withdrawaMoneys = this.getConfigByKey("red_bag_moneys");
                        }
                    }
                    if (PlatUtils.IsHago) {
                        //@ts-ignore
                        hg.gameLoadResult && hg.gameLoadResult({ code: 0 })
                    }

                    // if (PlatUtils.IsHuaWei) {
                    //     utils.showMsg("华为小游戏要用华为单独的组件对接！！！！！！！！！")
                    // }

                }, this)

            } else {
                utils.showLog("warn:" + "本地配置文件不是合法的json文件！");
            }
        } else {
            utils.showLog("warn:" + "本地配置文件未找到，请检查 CommonUtils 组件上是否存在！");
        }
    }

    private _initLoacalConfig(data: string) {
        if (this.config) {
            return this.config.init(data);
        } else {
            return false;
        }
    }

    onLoad() {

        cc.game.addPersistRootNode(this.node);
        utils = this;

        utils.showLog("广告组件版本:" + this.utilsVersion);
        if (!CC_DEBUG) {
            // 正式包关闭此选项
            this.DebugLoacalConfig = false;
        }
        this._gameEntryTime = new Date().getTime();
        // 初始化本地配置
        this._initConfig();
    }

    update(dt: number) {
        if (this._isConfigInit) {
            if (this.adManager) {
                this.adManager.OnUpdate(dt);
            }
        }
    }

    private initTools(data: string) {
        if (!this._isConfigInit && !PlatUtils.IsNativeAndroid) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }

        if (PlatUtils.IsNativeAndroid) {
            this._tool_Native = new YZ_Tool_Native();
            // this._tool_Native.init(data);
        } else if (PlatUtils.IsWechat) {
            this._wechatTool = new WechatTool();
            this._wechatTool.init(data);
        } else if (PlatUtils.IsOPPO) {
            this._oppoTool = new OppoTool();
            this._oppoTool.init(data);
        } else if (PlatUtils.IsBaidu) {
            this._tool_Baidu = new YZ_Tool_Baidu();
            this._tool_Baidu.init(data);
        } else if (PlatUtils.IsVIVO) {
            this._tool_Vivo = new YZ_Tool_Vivo();
            this._tool_Vivo.init(data);
        } else if (PlatUtils.IsDouyin) {
            this._tool_Douyin = new YZ_Tool_Douyin();
            this._tool_Douyin.init(data);
        } else if (PlatUtils.IsQQ) {
            this._tool_QQ = new YZ_Tool_QQ();
            this._tool_QQ.init(data);
        } else if (PlatUtils.IsQTT) {
            this._tool_QTT = new YZ_Tool_QTT();
            this._tool_QTT.init(data);
        } else if (PlatUtils.IsXiaoMi) {
            this._tool_XiaoMi = new YZ_Tool_Xiaomi();
            this._tool_XiaoMi.init(data);
        } else if (PlatUtils.ISUC) {
            this._tool_UC = new YZ_Tool_UC();
            this._tool_UC.init(data);
        } else if (PlatUtils.ISCocos) {
            this._tool_Cocosplay = new YZ_Tool_Cocosplay();
            this._tool_Cocosplay.init(data);
        } else if (PlatUtils.Is4399) {
            this._tool_4399 = new YZ_Tool_4399();
            this._tool_4399.init(data);
        } else if (PlatUtils.IsNativeIOS) {
            this._tool_Ios = new YZ_Tool_IOS();
            this._tool_Ios.init(data);
        } else if (PlatUtils.IsBili) {
            this._tool_bili = new YZ_Tool_Bili();
            this._tool_bili.init(data);
        } else if (PlatUtils.IsKwai) {
            this._tool_Kwai = new YZ_Tool_Kwai();
            this._tool_Kwai.init(data);
        } else if (PlatUtils.IsWiFi) {
            this._tool_Wifi = new YZ_Tool_WiFi();
            this._tool_Wifi.init(data);
        } else if (PlatUtils.IsHago) {
            this._tool_Hago = new YZ_Tool_Hago();
            this._tool_Hago.init(data);
        } else if (PlatUtils.IsHuaWei) {
            this._tool_Huawei = new YZ_Tool_HuaWei();
            this._tool_Huawei.init(data);
        } else if (PlatUtils.IsFaceBook) {
            this._tool_Facebook = new YZ_Tool_FaceBook();
            this._tool_Facebook.init(data);
        } else if (PlatUtils.IsGoogleWeb) {
            this._tool_GoogleWeb = new YZ_Tool_GoogleWeb();
            this._tool_GoogleWeb.init(data);
        } else if (PlatUtils.IsTest) {
            this._tool_Broswer = new YZ_Tool_Broswer();
            this._tool_Broswer.init(data);
        }
    }


    /**
     * 延时调用函数
     * @param callback 回调函数
     * @param delay 延时时间
     */
    public delayCall(callback: Function, delay: number) {
        this.scheduleOnce(() => {
            if (callback) {
                callback();
            }
        }, delay);
    }

    /**
      * 
      * @param callback Function<ret:boolean, msg:string> 分享回调
      */
    public share(callback: Function = null) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.share && this.cur_tool.share(callback)
    }


    /**
     * 注销游戏退出回调
     */
    public gameExitOff() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }

        if (PlatUtils.IsNativeAndroid) {
            cc.systemEvent.targetOff(this);
        }
    }

    /**
     * 开始录屏
     */
    public recordStart() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.recordStart && this.cur_tool.recordStart();
    }

    /**
     * 结束录屏
     */
    public recordEnd() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.recordEnd && this.cur_tool.recordEnd();
    }

    /**
     * 获取分享信息
     */
    public getShareInfo() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return null;
        }

        if (this.config.otherconfig.shareTitle && this.config.otherconfig.shareImgUrl) {
            return {
                title: this.config.otherconfig.shareTitle,
                imageUrl: this.config.otherconfig.shareImgUrl
            }
        } else {
            utils.showLog("分享配置出错！");
            return null;
        }
    }

    /**
     * 获取游戏内交叉推广信息, 游戏内跳转组件使用
     * @returns object or null
     */
    public getInnerRecommendData() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return null;
        }
        if (this.ServerConfig && this.ServerConfig.jump_list && this.ServerConfig.jump_list.length > 0) {
            return {
                "jump_refresh_time": this.ServerConfig.icon_jump,
                "jump_list": this.ServerConfig.jump_list
            };
        }
        return null;
    }

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
    public navigateToMiniGame(data: any, callback: Function = null) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }

        if (PlatUtils.IsWechat) {
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
        } else if (PlatUtils.IsOPPO) {
            if (data && data.appid) {
                this.oppoTool.navigateToMiniGame(data.appid, callback);
            } else {
                utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        } else if (PlatUtils.IsBaidu) {
            if (data && data.appid) {
                utils.Tool_Baidu.navigateToMiniGame(data.appid, callback);
            } else {
                utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        } else if (PlatUtils.IsNativeAndroid) {
            if (data) {
                utils.Tool_Native.navigateToGame(JSON.stringify(data), callback);
            } else {
                utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        } else if (PlatUtils.IsNativeIOS) {
            if (data && data.appid) {
                this.Tool_IOS.navigateToGame(data.appid, callback);
            } else {
                utils.showLog("data 或者 appid 为null!");
                if (callback) {
                    callback(false);
                }
            }
        }
    }

    /**
     * 当前版本是否支持跳转到其他小游戏
     */
    public isSupportnavigateToMiniGame() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return false;
        }
        if (PlatUtils.IsWechat || PlatUtils.IsNativeAndroid || PlatUtils.IsNativeIOS || PlatUtils.IsBaidu) {
            return true;
        } else if (PlatUtils.IsOPPO) {
            return this.oppoTool.isOverMiniVersion("1044");
        } else if (PlatUtils.IsDouyin) {
            return this.Tool_Douyin.isShowMoreGamesModal() && this.Tool_Douyin._sysInfo.appName != "live_stream";
        } else if (PlatUtils.IsQQ) {
            return this._tool_QQ.isOverMinVersion("1.7.1");
        }
        return false;
    }

    /**
     * 显示消息提示
     * @param msg 消息提示
     */
    public showMsg(msg: string) {

        if (utils.Tool_Broswer) {
            console.log(msg);
            return;
        }
        this.cur_tool && this.cur_tool.showToast && this.cur_tool.showToast(msg);
    }

    /**
     * 是否已经创建过快捷方式
     */
    public hasShortcutInstalled() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return true;
        }
        if (PlatUtils.IsVIVO && this.Tool_Vivo) {
            return this.Tool_Vivo.ShortcutCreated;
        } else if (PlatUtils.IsOPPO && this.oppoTool) {
            return this.oppoTool.ShortcutCreated;
        }

        return false;
    }

    /**
     * 是否可以创建桌面快捷方式,平台是否支持
     */
    public canCreateShortcut() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return false;
        }

        if (this.cur_tool && this.cur_tool.canCreateShortcut) {
            return this.cur_tool.canCreateShortcut();
        }
        return false;
    }

    /**
     * 创建桌面快捷方式
     */
    public createShortcut(callback: Function) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.createShortcut && this.cur_tool.createShortcut(callback);
    }

    /**
     * 通用http请求，只封装了GET请求
     * @param url 请求的url地址
     * @param callback Function(ret:boolean, data:string) 
     * 请求结束回调，成功ret为true, data为返回的数据string。 失败为ret为false, data为空 
     */
    public commomHttpRequest(url: string, callback: Function) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }

        let completeCallback = callback;
        let xhr = new XMLHttpRequest();
        xhr.timeout = 6000;    // 单位毫秒
        let requestUrl: string = this._buildServerUrl(url) + `&time_stamp=${(new Date()).getTime()}&reqv=${YZ_Constant.SERVER_VERSION}`
        utils.showLog("服务器地址:" + requestUrl);
        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = () => {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        if (requestUrl.indexOf("m=g") > -1 || requestUrl.indexOf("m=rlevelv3") > -1) {
                            completeCallback(true, this.aesDecrypt(xhr.responseText));
                        } else {
                            completeCallback(true, xhr.responseText);
                        }
                    }
                } else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }
        }
        xhr.ontimeout = function () {
            utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        }
        xhr.onerror = function (err) {
            utils.showLog("请求出错! err=", JSON.stringify(err));
            if (completeCallback) {
                completeCallback(false, "");
            }
        }
    }


    aesEncrypt(content) {
        let key = CryptoJS.enc.Utf8.parse(secretKey);
        let srcs = CryptoJS.enc.Utf8.parse(content);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    /**
     * 解密方法
     * @param encryptStr 密文
     * @returns {string} 明文
     */
    aesDecrypt(encryptStr) {
        let key = CryptoJS.enc.Utf8.parse(secretKey);
        let decrypt = CryptoJS.AES.decrypt(encryptStr, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }

    /**
     * 增加常用字段
     */
    _buildServerUrl(url: string) {
        // utils.showLog(" _buildServerUrl >>>>>.");

        if (PlatUtils.IsOPPO) {
            //@ts-ignore
            url = url + `&kyx=true&app_id=${utils.config.oppoconfig.packageName}&channel=oppo&device_uid=${utils.oppoTool.uid}&uid=${utils.oppoTool.serviceId}&source=${this.oppoTool._source}&game_version=${utils.config.oppoconfig.version}&device_id=${utils.oppoTool._device_id}`;
        } else if (PlatUtils.IsXiaoMi) {
            url = url + `&kyx=true&app_id=${utils.config.xiaomiConfig.appID}&channel=xiaomi&device_uid=${utils._tool_XiaoMi.uid}&uid=${utils._tool_XiaoMi.serviceId}`;
        } else if (PlatUtils.IsWechat) {
            url = url + `&kyx=true&app_id=${utils.config.wechatconfig.appID}&channel=wechat&device_uid=${utils.wechatTool.uid}&uid=${utils.wechatTool.serviceId}&source=${this.wechatTool._source_app_id}&soure_type=${this.wechatTool._luanchType}&game_version=${utils.config.wechatconfig.version}`;
        } else if (PlatUtils.IsVIVO) {
            url = url + `&kyx=true&app_id=${utils.config.vivoconfig.appID}&channel=vivo&device_uid=${utils._tool_Vivo.uid}&uid=${utils._tool_Vivo.serviceId}&source=${this._tool_Vivo._source}&game_version=${utils.config.vivoconfig.version}`
        } else if (PlatUtils.IsQTT) {
            url = url + `&kyx=true&app_id=${utils.config.qttconfig.appID}&channel=qutoutiao&device_uid=${utils._tool_QTT.uid}&uid=${utils._tool_QTT.serviceId}`
        } else if (PlatUtils.IsDouyin) {
            url = url + `&kyx=true&app_id=${utils.config.douyinconfig.appID}&channel=toutiao&device_uid=${utils.Tool_Douyin.uid}&uid=${utils.Tool_Douyin.serviceId}&game_version=${utils.config.douyinconfig.version}`
        } else if (PlatUtils.IsQQ) {
            url = url + `&kyx=true&app_id=${utils.config.qqconfig.appID}&channel=qq&device_uid=${utils._tool_QQ.uid}&uid=${utils._tool_QQ.serviceId}&game_version=${utils.config.qqconfig.version}`
        } else if (PlatUtils.IsBaidu) {
            url = url + `&kyx=true&app_id=${utils.config.baiduconfig.appID}&channel=baidu&device_uid=${utils._tool_Baidu.uid}&uid=${utils._tool_Baidu.serviceId}&game_version=${utils.config.baiduconfig.version}`
        } else if (PlatUtils.ISUC) {
            url = url + `&kyx=true&app_id=${utils.config.ucConfig.appID}&channel=uc&device_uid=${utils._tool_UC.uid}&uid=${utils._tool_UC.serviceId}&game_version=${utils.config.ucConfig.version}`
        } else if (PlatUtils.ISCocos) {
            url = url + `&kyx=true&app_id=${utils.config.cocosConfig.appID}&channel=cocos&device_uid=${utils._tool_Cocosplay.uid}&uid=${utils._tool_Cocosplay.serviceId}`
        } else if (PlatUtils.IsNativeAndroid) {
            url = url + `&kyx=false&app_id=${utils.config.nativeAndroidConfig.appID}&channel=${utils.config.nativeAndroidConfig.channel}&device_uid=${utils.Tool_Native.uid}&uid=${utils.Tool_Native.serviceId}&game_type=2&game_version=${utils.config.nativeAndroidConfig.version}`
        } else if (PlatUtils.IsKwai) {
            url = url + `&kyx=true&app_id=${utils.config.kwaiConfig.appID}&channel=kuaishou&device_uid=${utils._tool_Kwai.uid}&uid=${utils._tool_Kwai.serviceId}&game_version=${utils.config.kwaiConfig.version}`
        } else if (PlatUtils.IsNativeIOS) {
            url = url + `&kyx=false&app_id=${utils.config.nativeIoSConfig.appID}&channel=ios&device_uid=${utils.Tool_IOS.uid}&uid=${utils.Tool_IOS.serviceId}&game_type=2&game_version=${utils.config.nativeIoSConfig.version}`
        } else if (PlatUtils.IsWiFi) {
            url = url + `&kyx=true&app_id=${utils.config.wifiConfig.appID}&channel=wifi&device_uid=${utils._tool_Wifi.uid}&uid=${utils._tool_Wifi.serviceId}&game_version=${utils.config.wifiConfig.version}`
        } else if (PlatUtils.IsHago) {
            url = url + `&kyx=true&app_id=${utils.config.hagoConfig.appID}&channel=hago&device_uid=${utils._tool_Hago.uid}&uid=${utils._tool_Hago.serviceId}&game_version=${utils.config.hagoConfig.version}`
        } else if (PlatUtils.IsHuaWei) {
            url = url + `&kyx=true&app_id=${utils.config.huaweiConfig.appID}&channel=huawei&device_uid=${utils.Tool_Huawei.uid}&uid=${utils.Tool_Huawei.serviceId}&game_version=${utils.config.huaweiConfig.version}`
        } else if (PlatUtils.IsFaceBook) {
            url = url + `&kyx=true&app_id=${utils.config.faceBookConfig.appID}&channel=facebookxyx&device_uid=${utils.Tool_Facebook.uid}&uid=${utils.Tool_Facebook.serviceId}&game_version=${utils.config.faceBookConfig.version}`
        }
        return url;

    }



    /**
     * 上报小游戏跳转点击数据
     */
    public postData(otherGameAppId: string) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.postData && this.cur_tool.postData(otherGameAppId);
    }

    /**
     * 注册服务器初始化完成事件
     * @param callback 
     * @param target 
     */
    public registerServerInitEvent(callback: Function, target: any) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }

        if (this._isServerInit) {
            if (callback) {
                callback();
            }
        } else {
            cc.game.on(YZ_Constant.EC_ServerInit, callback, target);
        }
    }

    /**
     * 注册服务器初始化完成事件
     * @param callback 
     * @param target 
     */
    public registerServerDataLoadSuccessEvent(callback: Function, target: any) {

        if (this._isServerLoadSuccess) {
            if (callback) {
                callback();
            }
        } else {
            cc.game.on(YZ_Constant.EC_ServerDataLoadSuccess, callback, target);
        }
    }


    /**
     * 注册隐私弹窗关闭事件
     * @param callback 
     * @param target 
     */
    public registerPrivacyCloseEvent(callback: Function, target: any) {

        let ysxy = YZ_LocalStorage.getItem(YZ_Constant.YZ_GAME_YSXY);
        if (ysxy) {
            if (callback) {
                callback();
            }
        } else {
            cc.game.on(YZ_Constant.YZ_PrivacyClose, callback, target);
        }
    }


    /**
    * 上报互推组件数据
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    public postDataByLocation(otherGameAppId: string, location: string, status: number = 0) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        if (PlatUtils.IsBaidu) {
            if (this.Tool_Baidu) {
                this.Tool_Baidu.postData(otherGameAppId);
            }
        } else {
            this.cur_tool && this.cur_tool.postDataByLocation && this.cur_tool.postDataByLocation(otherGameAppId, location, status)
        }

    }

    /**
  * 上报互推组件数据
  * @param otherGameAppId 跳转的ID
  * @param location 当前位置
  * @param status 0:点击，1:跳转成功
  */
    public postRecommentShowData(location: string) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        this.cur_tool && this.cur_tool.postRecommentShowData && this.cur_tool.postRecommentShowData(location);
    }

    /**
     * 注销服务器初始化完成事件
     * @param target 
     */
    public unregisterServerInitEvent(target: any) {
        cc.game.targetOff(target);
    }


    _isServerLoadSuccess: boolean = false;

    /**
     * 发送服务器初始化完毕事件
     */
    public emitServerInitEvent() {

        // if (PlatUtils.IsTest) {
        //     this.getConfigByKey("is_privacy_panel = "true";
        // }


        if (this.isShowPrivacyPanel()) {
            this._isServerLoadSuccess = true;
            cc.game.emit(YZ_Constant.EC_ServerDataLoadSuccess);

            utils.registerPrivacyCloseEvent(() => {
                this._isServerInit = true;
                cc.game.emit(YZ_Constant.EC_ServerInit);
                cc.game.targetOff(YZ_Constant.EC_ServerDataLoadSuccess);
                cc.game.targetOff(YZ_Constant.YZ_PrivacyClose);
            }, this);

            return;
        }

        this._isServerInit = true;
        cc.game.emit(YZ_Constant.EC_ServerInit);

    }



    /**
   * 注册实名制认证关闭事件
   * @param callback 
   * @param target 
   */
    public registerRealNameAuthCloseEvent(callback: Function, target: any) {

        if (this._isServerLoadSuccess) {
            if (callback) {
                callback();
            }
        } else {
            cc.game.on(YZ_Constant.EC_RealNameAuthPanelClose, callback, target);
        }
    }

    public emitRealNameAuthCloseEvent() {
        cc.game.emit(YZ_Constant.EC_RealNameAuthPanelClose);
    }

    /**
     * 发送隐私确认弹窗关闭事件
     */
    public emitPrivacyCloseEvent() {
        this._isServerInit = true;
        cc.game.emit(YZ_Constant.YZ_PrivacyClose);
    }




    /**
     * 获取交叉推广数据
     */
    public getRecommondGameList() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return null;
        }
        // if (this.cur_tool && this.cur_tool.getRecommondGameList) {
        //     return this.cur_tool.getRecommondGameList();
        // }
        if (PlatUtils.IsWechat) {
            return this.wechatTool.getRecommondGameList();
        } else if (PlatUtils.IsOPPO) {
            return this.oppoTool.getRecommondGameList();
        } else if (PlatUtils.IsBaidu) {
            return this.Tool_Baidu.getRecommondGameList();
        } else if (PlatUtils.IsNativeAndroid) {
            return this.Tool_Native.getRecommondGameList();
        } else if (PlatUtils.IsDouyin) {
            return this.Tool_Douyin.getRecommondGameList();
        } else if (this.Tool_Broswer) {
            return this.Tool_Broswer.getRecommondGameList();
        } else if (PlatUtils.IsNativeIOS) {
            return this.Tool_IOS.getRecommondGameList();
        }
        return null;
    }


    /**
     * 是否显示底部更多游戏banner列表
     */
    public isShowRecommondGamesBanner() {
        if (!this._isConfigInit) {
            utils.showLog("本地数据未初始化!");
            return false;
        }


        if (this.Tool_Broswer) return true;
        if (utils.isSupportnavigateToMiniGame()) {
            if (this.ServerConfig
                && this.ServerConfig.is_bottom_banner_list) {
                if (this.ServerConfig.is_bottom_banner_list == "true") {
                    return true;
                } else {
                    utils.showLog("is_bottom_banner_list 参数为false，底部更多游戏横幅组件不显示！");
                }
            } else {
                utils.showLog("配置中没有 is_bottom_banner_list 参数，底部更多游戏横幅组件不显示！");
            }
        } else {
            utils.showLog("当前平台不支持游戏内跳转，底部更多游戏横幅组件不显示！");
        }


        return false;
    }

    _recommendGamesBanner: cc.Node = null;
    /**
     * 显示底部推荐游戏Banner
     * @param params 
     * 参数是一个对象.
     * {
     * group:string  //组件所在的组。
     * scale:number  //组件的缩放值。
     * }
     */
    public showRecommendGamesBanner(params: any = null): boolean {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.isShowRecommondGamesBanner()) {


            utils.showLog("显示自定义banner!");

            if (this.config.otherconfig.recommendGamesBanner) {
                let bannerNode: cc.Node = cc.instantiate(this.config.otherconfig.recommendGamesBanner);
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
            } else {
                utils.showLog("warn:" + "未找到预制体 RecommendGamesBanner, 请查看CommonUtils组件上是否赋值!");
            }
        }

        return false;
    }

    /**
     * 隐藏底部推荐游戏Banner
     */
    public hideRecommendGamesBanner() {
        let banner: cc.Node = cc.find("RecommendGamesBanner");
        if (banner) {
            banner.active = false;
        }
    }

    /**
     * 是否显示推荐游戏列表
     */
    public isShowRecommondGamesList() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;
        if (utils.isSupportnavigateToMiniGame()) {
            if (this.ServerConfig.is_banner_list
                && this.ServerConfig.is_banner_list == "true"
                && this.ServerConfig.jump_list
                && this.ServerConfig.jump_list.length > 0) {
                return true;
            } else {
                utils.showLog("请确认字段：is_banner_list、jump_list 是否达到显示自定义banner的要求!");
                return false;
            }
        } else {
            utils.showLog("当前平台不支持游戏内跳转，更多游戏列表组件不显示！");
        }
        return false;
    }

    _recommendGamesList: cc.Node = null;
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
    public showRecommendGamesList(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (this.config.otherconfig.recommendGamesBar) {
            let barNode: cc.Node = cc.instantiate(this.config.otherconfig.recommendGamesBar);
            if (barNode) {
                if (this._recommendGamesList && cc.isValid(this._recommendGamesList)) {
                    this._recommendGamesList.destroy();
                }
                this._recommendGamesList = barNode;
                this._recommendGamesList.zIndex = 9999;

                let widget: cc.Widget = barNode.getComponent(cc.Widget);

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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
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
        } else {
            utils.showLog("warn:" + "未找到预制体 RecommendGamesBar, 请查看CommonUtils组件上是否赋值 !");
        }

        return null;
    }

    /**
    * 隐藏互推滚动条
    * @param _tryGamesWidget 更多游戏挂件
    */
    public hideRecommendGamesList() {
        if (this._recommendGamesList && cc.isValid(this._recommendGamesList)) {
            this._recommendGamesList.destroy();
        }
    }

    /**
     * 是否显示试玩挂件
     */
    public isShowTryGamesWidget() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;
        if (PlatUtils.IsWechat) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.wechatTool
                    && utils.wechatTool.ServerConfig
                    && utils.wechatTool.ServerConfig.icon_jump) {
                    if (utils.wechatTool.ServerConfig.icon_jump > 0) {
                        return true;
                    } else {
                        utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        } else if (PlatUtils.IsOPPO) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.oppoTool
                    && utils.oppoTool.ServerConfig
                    && utils.oppoTool.ServerConfig.icon_jump) {
                    if (parseInt(utils.oppoTool.ServerConfig.icon_jump) > 0) {
                        return true;
                    } else {
                        utils.showLog("warn:" + "icon_jump参数为false，试玩戏挂件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        } else if (PlatUtils.IsBaidu) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.Tool_Baidu
                    && utils.Tool_Baidu.ServerConfig
                    && utils.Tool_Baidu.ServerConfig.icon_jump) {
                    if (utils.Tool_Baidu.ServerConfig.icon_jump > 0) {
                        return true;
                    } else {
                        utils.showLog("warn:" + "icon_jump参数为false，更多游戏挂件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        } else if (PlatUtils.IsNativeAndroid) {
            if (utils.Tool_Native
                && utils.Tool_Native.ServerConfig
                && utils.Tool_Native.ServerConfig.icon_jump) {
                if (parseInt(utils.Tool_Native.ServerConfig.icon_jump) > 0) {
                    return true;
                }
            } else {
                utils.showLog("warn:" + "配置中没有jumpList参数，试玩游戏挂件不显示！");
            }
        } else if (PlatUtils.IsDouyin) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.Tool_Douyin && utils.Tool_Douyin.isShowMoreGamesModal()
                    && utils.Tool_Douyin.ServerConfig
                    && utils.Tool_Douyin.ServerConfig.icon_jump) {
                    if (utils.Tool_Douyin.ServerConfig.icon_jump > 0) {
                        return true;
                    } else {
                        utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        } else if (PlatUtils.IsQQ) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.Tool_QQ
                    && utils.Tool_QQ.ServerConfig
                    && utils.Tool_QQ.ServerConfig.icon_jump) {
                    if (utils.Tool_QQ.ServerConfig.icon_jump > 0) {
                        return true;
                    } else {
                        utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，试玩游戏挂件不显示！");
            }
        } else if (PlatUtils.IsNativeIOS) {

            if (utils.Tool_IOS
                && utils.Tool_IOS.ServerConfig
                && utils.Tool_IOS.ServerConfig.icon_jump) {
                if (utils.Tool_IOS.ServerConfig.icon_jump > 0) {
                    return true;
                } else {
                    utils.showLog("warn:" + "icon_jump参数为false，试玩游戏挂件不显示！");
                }
            } else {
                utils.showLog("warn:" + "配置中没有icon_jump参数，试玩游戏挂件不显示！");
            }

        }

        return false;
    }

    _tryGamesWidget: cc.Node = null;
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
    public showTryGamesWidget(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (utils.isShowTryGamesWidget()) {
            if (params.location && (this.getConfigByKey("try_game_widget_locations").indexOf(params.location) < 0)) {
                utils.showLog("当前位置服务器未配置显示试玩挂件！");
                if (this._tryGamesWidget && cc.isValid(this._tryGamesWidget)) {
                    this._tryGamesWidget.destroy();
                }
                return null;
            }
            if (this.config.otherconfig.tryGamesWidget) {
                let node: cc.Node = cc.instantiate(this.config.otherconfig.tryGamesWidget);
                if (node) {
                    if (this._tryGamesWidget && cc.isValid(this._tryGamesWidget)) {
                        this._tryGamesWidget.destroy();
                    }
                    this._tryGamesWidget = node;
                    this._tryGamesWidget.zIndex = 9999;
                    let widget: cc.Widget = node.getComponent(cc.Widget);

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
                        } else if (params.bottom != null) {
                            widget.isAlignTop = false;
                            widget.isAlignBottom = true;
                            widget.bottom = params.bottom;
                        }
                        if (params.left != null) {
                            widget.isAlignLeft = true;
                            widget.isAlignRight = false;
                            widget.left = params.left;
                        } else if (params.right != null) {
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
            } else {
                utils.showLog("warn:" + "未找到预制体 TryGamesWidget, 请查看CommonUtils组件上是否赋值 !");
            }
        } else {
            utils.showLog("warn:" + "不支持跳转组件");
        }


        return null;
    }

    /**
     * 隐藏更多游戏挂件
     * @param _tryGamesWidget 更多游戏挂件
     */
    public hideTryGamesWidget() {
        if (this._tryGamesWidget && cc.isValid(this._tryGamesWidget)) {
            this._tryGamesWidget.destroy();
        }
    }
    /**
     * 是否显示更多游戏侧边栏
     */
    public isShowMoreGamesWidget() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer || CC_DEBUG) return true;
        if (PlatUtils.IsWechat) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsOPPO) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    if (utils.oppoTool.ServerConfig.show_oppo_rec == "true") {
                        if (!utils.oppoTool.canShowRecommend()) {
                            utils.showLog("warn:" + "当前平台不支持官方互推，更多游戏侧边栏组件不显示！");
                            return false;
                        }
                    }
                    return true;
                } else {
                    utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsDouyin) {
            if (PlatUtils.IsAndroid
                && utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsBaidu) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsQQ) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_more_game") == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.Is4399) {
            return true;
        } else if (PlatUtils.IsNativeAndroid) {
            if (this.getConfigByKey("is_more_game") == "true") {
                return true;
            } else {
                utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsNativeIOS) {
            if (this.getConfigByKey("is_more_game") == "true") {
                return true;
            } else {
                utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsVIVO) {
            if (this.getConfigByKey("is_more_game") == "true") {
                return true;
            } else {
                utils.showLog("warn:" + "配置中没有is_more_game参数，更多游戏侧边栏组件不显示！");
            }
        }
        return false;
    }

    _moreGamesSidePanel: any = null;
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
    public showMoreGamesWidget(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (params.location && (this.getConfigByKey("more_game_widget_locations").indexOf(params.location) < 0)) {
            utils.showLog("当前位置服务器未配置显示更多游戏挂件！");
            if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                this._moreGamesSidePanel.destroy();
            }


            return null;
        }



        if (PlatUtils.IsDouyin) {
            if (utils.Tool_Douyin) {
                if (utils.isShowMoreGamesWidget()) {
                    if (utils.Tool_Douyin.isShowMoreGamesModal()) {
                        if (this.config.otherconfig.moreGamesWidget) {
                            let node: cc.Node = cc.instantiate(this.config.otherconfig.moreGamesWidget);
                            if (node) {
                                if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                                    this._moreGamesSidePanel.destroy();
                                }
                                this._moreGamesSidePanel = node;
                                this._moreGamesSidePanel.zIndex = 9999;
                                let widget: cc.Widget = node.getComponent(cc.Widget);

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
                                    } else if (params.bottom != null) {
                                        widget.isAlignTop = false;
                                        widget.isAlignBottom = true;
                                        widget.bottom = params.bottom;
                                    }
                                    if (params.left != null) {
                                        widget.isAlignLeft = true;
                                        widget.isAlignRight = false;
                                        widget.left = params.left;
                                    } else if (params.right != null) {
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
                        } else {
                            utils.showLog("warn:" + "未找到预制体 MoreGamesWidget, 请查看CommonUtils组件上是否赋值！");
                        }
                    } else {
                        let btn = utils.Tool_Douyin.showMoreGamesButton(params);
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
                        } else {
                            return null;
                        }
                    }

                } else {
                    utils.showLog("当前平台版本不支持交叉推广, 更多游戏按钮不显示!");
                    return null;
                }
            }
        } else {
            if (utils.isShowMoreGamesWidget()) {


                if (this.config.otherconfig.moreGamesWidget) {
                    let node: cc.Node = cc.instantiate(this.config.otherconfig.moreGamesWidget);
                    if (node) {
                        if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                            this._moreGamesSidePanel.destroy();
                        }
                        this._moreGamesSidePanel = node;
                        this._moreGamesSidePanel.zIndex = 9999;
                        let widget: cc.Widget = node.getComponent(cc.Widget);

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
                            } else if (params.bottom != null) {
                                widget.isAlignTop = false;
                                widget.isAlignBottom = true;
                                widget.bottom = params.bottom;
                            }
                            if (params.left != null) {
                                widget.isAlignLeft = true;
                                widget.isAlignRight = false;
                                widget.left = params.left;
                            } else if (params.right != null) {
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
                } else {
                    utils.showLog("warn:" + "未找到预制体 MoreGamesWidget, 请查看CommonUtils组件上是否赋值！");
                }
            } else {
                utils.showLog("warn:" + "不可显示更多游戏侧边栏")
            }

        }

        return null;
    }

    /**
     * 隐藏侧边栏按钮
     * @param moreGameBtn 更多游戏侧边栏按钮
     */
    public hideMoreGamesWidget(moreGameBtn?: any) {
        if (PlatUtils.IsDouyin) {
            if (moreGameBtn && cc.isValid(moreGameBtn)) {
                moreGameBtn.destroy();
            }
            if (this._moreGamesSidePanel) {
                this._moreGamesSidePanel.destroy();
            }
        } else {
            if (moreGameBtn && cc.isValid(moreGameBtn)) {
                moreGameBtn.destroy();
            }
            if (this._moreGamesSidePanel && cc.isValid(this._moreGamesSidePanel)) {
                this._moreGamesSidePanel.destroy();
            }
        }

        if (PlatUtils.IsVIVO) {
            this.Tool_Vivo && this.Tool_Vivo.hideGamePortal();
        }
    }

    _moreGamesSidePanelBaidu: any = null;
    public showBaiduMoreGamesBtn(params: any = null) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        let isShow: boolean = false;
        if (PlatUtils.IsBaidu) {
            if (utils.Tool_Baidu
                && utils.Tool_Baidu.canShowRecommendButton()) {
                isShow = true;
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，百度更多游戏侧边栏组件不显示！");
            }
        }


        if (PlatUtils.IsBaidu) {
            if (utils.Tool_Baidu) {
                if (isShow) {
                    let btn = utils.Tool_Baidu.showRecommendationButton(params);
                    if (btn) {
                        if (this._moreGamesSidePanelBaidu) {
                            this._moreGamesSidePanelBaidu.destroy();
                        }
                        this._moreGamesSidePanelBaidu = btn;
                        return this._moreGamesSidePanelBaidu;
                    } else {
                        return null;
                    }
                } else {
                    utils.showLog("当前平台版本不支持交叉推广, 百度更多游戏按钮不显示!");
                    return null;
                }
            }
        }

    }

    public hideBaiduMoreGamesBtn(moreGameBtn: any) {
        if (PlatUtils.IsBaidu && moreGameBtn) {
            if (moreGameBtn != null) {
                moreGameBtn.destroy();
            }
        }
    }

    /**
     * 是否显示录屏组件
     */
    public isShowRecordWidget() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;

        if (PlatUtils.IsDouyin) {
            if (this.getConfigByKey("show_record") == "true") {
                return true;
            }
            utils.showLog("服务器配置不显示录屏按钮！");
        } else if (PlatUtils.IsKwai) {
            if (utils.kwaiTool && utils.kwaiTool.checkCanShowRecored() && this.getConfigByKey("show_record") == "true") {
                return true;
            }
            utils.showLog("服务器配置不显示录屏按钮！");
        }

        return false;
    }


    public hideRecordWidget() {
        if (this._recordWidget && cc.isValid(this._recordWidget)) {
            this._recordWidget.destroy();
        }
    }
    _recordWidget: cc.Node = null;
    /**
     * 显示录屏按钮
     * @param params 
     */
    public showRecordWidget(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.isShowRecordWidget()) return null;


        if (this.config.otherconfig.recordWidget) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.recordWidget);
            if (node) {
                if (this._recordWidget && cc.isValid(this._recordWidget)) {
                    this._recordWidget.destroy();
                }
                this._recordWidget = node;
                this._recordWidget.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
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
        } else {
            utils.showLog("warn:" + "未找到预制体 RecordWidget, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }


    /**
     * 是否显示创建快捷方式控件
     */
    public isShowCreateShortcutWidget() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;
        if (this.canCreateShortcut()) {
            if (this.getConfigByKey("is_desktop") == "true") {
                return true;
            } else {
                utils.showLog("配置数据中没有 is_desktop 字段， 创建快捷方式按钮不显示!");
            }
        } else {
            utils.showLog("当前平台版本不支持创建桌面快捷方式, 创建快捷方式按钮不显示！");
        }



        return false;
    }


    _shortcutWidget: cc.Node = null;
    /**
     * 创建快捷方式
     * @param callback 点击创建快捷方式按钮后回调函数 Function<ret:boolean>
     * @param params 
     */
    public showCreateShortcutWidget(callback: Function = null, params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (utils.isShowCreateShortcutWidget()) {
            if (this.config.otherconfig.shortcutWidget) {
                let node: cc.Node = cc.instantiate(this.config.otherconfig.shortcutWidget);
                if (node) {
                    if (this._shortcutWidget && cc.isValid(this._shortcutWidget)) {
                        this._shortcutWidget.destroy();
                    }
                    this._shortcutWidget = node;
                    this._shortcutWidget.zIndex = 9999;
                    let widget: cc.Widget = node.getComponent(cc.Widget);
                    let shortcutWidget: YZ_ShortcutWidget = node.getComponent("YZ_ShortcutWidget");
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
                        } else if (params.bottom != null) {
                            widget.isAlignTop = false;
                            widget.isAlignBottom = true;
                            widget.bottom = params.bottom;
                        }
                        if (params.left != null) {
                            widget.isAlignLeft = true;
                            widget.isAlignRight = false;
                            widget.left = params.left;
                        } else if (params.right != null) {
                            widget.isAlignLeft = false;
                            widget.isAlignRight = true;
                            widget.right = params.right;
                        }
                        if (params.parent != null) {
                            node.parent = params.parent;
                        } else {
                            cc.director.getScene().addChild(node, 1000);
                        }
                    }
                    widget.updateAlignment();
                    return node;
                }
            } else {
                utils.showLog("warn:" + "未找到预制体 ShortcutWidge, 请查看CommonUtils组件上是否赋值！");
            }
        } else {
            utils.showLog("warn:" + "不显示创建桌面图标");
        }

        return null;

    }


    /**
     * 隐藏快捷方式
     */
    public hideCreateShortcutWidget(params: any = null) {
        if (this._shortcutWidget && cc.isValid(this._shortcutWidget)) {
            this._shortcutWidget.destroy();
        }
    }
    /**
     * 注册事件,事件在YZ_Constant类中定义
     * @param eventName : string 事件名 事件在 YZ_Constant 类中定义
     * @param callback 回调函数
     * @param target : cc.Node 目标对象
     */
    public registerEvent(eventName: string, callback: Function, target: any) {
        if (!eventName) {
            utils.showLog("warn:" + "[Utils.registerEvent] param eventName is null!");
            return;
        }
        if (!callback) {
            utils.showLog("warn:" + "[Utils.registerEvent] param callback is null!");
            return;
        }
        if (!target) {
            utils.showLog("warn:" + "[Utils.registerEvent] param target is null!");
            return;
        }

        cc.game.on(eventName, callback, target);
    }

    /**
     * 取消注册事件
     * @param eventName 事件名
     */
    public unregisterEvent(eventName: string) {
        cc.game.off(eventName);
    }

    /**
     * 发送事件
     * @param eventName 事件名
     */
    public emitCommonEvent(eventName: string) {
        cc.game.emit(eventName);
    }



    _gameBox: cc.Node = null;

    /**
    * 显示游戏盒子
    * @param params 
    */
    public showGameBox(params: any = null) {
        if (PlatUtils.IsWechat) {
            let isShow: boolean = false;
            // console.log("utils.wechatTool.ServerConfig.openBox",utils.wechatTool.ServerConfig.openBox)
            if (utils.wechatTool.ServerConfig && utils.wechatTool.ServerConfig.openBox) {
                if (utils.wechatTool.ServerConfig.openBox != "true") {
                    utils.showLog("服务器游戏盒子配置为关闭状态！");
                    return;
                }
                utils.showLog("服务器配置游戏盒子为打开状态");
                isShow = true;
            } else {
                let showTime: number = new Date().getTime() - new Date("2019-10-23").getTime();
                if (showTime > 0) {
                    isShow = true;
                    utils.showLog("当前时间大于指定时间，可以显示游戏盒子");
                }
            }
            if (!isShow) {
                utils.showLog("warn:" + "当前条件不满足要求，游戏盒子不显示！");
                return;
            }
            let node: cc.Node = cc.instantiate(this.config.otherconfig.gameBox);
            if (node) {
                if (this._gameBox && cc.isValid(this._gameBox)) {
                    this._gameBox.destroy();
                }
                this._gameBox = node;
                this._gameBox.zIndex = 9999;
                if (params.parent != null) {
                    node.parent = params.parent;
                }
            } else {
                utils.showLog("warn:" + "未找到预制体 GameBox, 请查看CommonUtils组件上是否赋值！");
            }
        }


    }
    _nativeTryGameNode: cc.Node = null;
    tryGameDate: any[] = [];
    nativeNeedChange: boolean = true;
    isShowNativeTryGamesWidget(): boolean {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        if (this.Tool_Broswer) return true;

        if (this.ServerConfig
            && this.ServerConfig.icon_jump_native
            && parseInt(this.ServerConfig.icon_jump_native) > 0) {
            return true;
        } else {
            utils.showLog("warn:" + "配置中没有icon_jump_native参数，原生试玩游戏挂件不显示！");
        }

        return false;
    }
    /**
    * 是否能显示6个元素的交叉推广组件
    */
    public canShowCrossWidget6() {
        if (!this._isConfigInit) {
            utils.showLog("组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;
        if (PlatUtils.IsWechat || PlatUtils.IsOPPO || PlatUtils.IsBaidu || PlatUtils.IsNativeAndroid || PlatUtils.IsNativeIOS) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (this.getConfigByKey("is_cross_game") == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "配置中没有is_cross_game参数，6元素交叉推广组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
            }
        } else if (PlatUtils.IsDouyin) {
            if (utils.isSupportnavigateToMiniGame() && utils.Tool_Douyin.isShowMoreGamesModal()) {
                if (this.getConfigByKey("is_cross_game") == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "is_cross_game参数为false，6元素交叉推广组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
            }
        }
        return false;
    }

    /**
     * 显示6元素交叉推广组件
     */
    public showCrossWidget6(): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (this.canShowCrossWidget6()) {
            if (this.config.otherconfig.crossWidget6) {
                return cc.instantiate(this.config.otherconfig.crossWidget6);
            } else {
                utils.showLog("warn:" + "未找到预制体 CrossWidget6, 请查看CommonUtils组件上是否赋值！");
            }
        }

        return null;
    }

    /**
     * 显示添加到我的小程序引导
     * @param param 参数值：
     *              type： bar（一直展示）/tip（3秒展示）
     */
    public showFavoriteGuide(param?: any) {
        if (PlatUtils.IsBaidu) {
            if (utils._tool_Baidu.canShowFavoriteGuide()) {
                //@ts-ignore
                swan.showFavoriteGuide({
                    type: param ? param.type : 'tip',
                    content: '一键添加到我的小程序',
                    success: res => {
                        utils.showLog('添加成功：', res);
                    },
                    fail: err => {
                        utils.showLog('添加失败：', err);
                    }
                })
                utils.showLog("显示我的小程序引导成功！");

            } else {
                utils.showLog("当前平台不支持显示添加我的小程序引导");
            }
        }
    }


    /**
     * 验证是否自动弹出签到
     * true : 自动弹出，false : 不自动弹出
     */
    public checkAutoSign(): boolean {
        if (this.getConfigByKey("auto_sign") == "true") {
            return true;
        }
        return false;
    }


    /**
     * 获取当前平台的配置文件
     */
    public get ServerConfig(): any {
        if (this.cur_tool) {
            return this.cur_tool.ServerConfig ? this.cur_tool.ServerConfig : {};
        }
        return {};
    }


    _cur_tool = null;
    /**
     * 获取当前平台的配置文件
     */
    public get cur_tool(): any {
        if (this._cur_tool) return this._cur_tool;
        if (PlatUtils.IsWechat) {
            this._cur_tool = utils.wechatTool;
        } else if (PlatUtils.IsOPPO) {
            this._cur_tool = utils.oppoTool;
        } else if (PlatUtils.IsVIVO) {
            this._cur_tool = utils.Tool_Vivo;
        } else if (PlatUtils.IsQQ) {
            this._cur_tool = utils.Tool_QQ;
        } else if (PlatUtils.IsDouyin) {
            this._cur_tool = utils.Tool_Douyin;
        } else if (PlatUtils.IsBaidu) {
            this._cur_tool = utils.Tool_Baidu;
        } else if (PlatUtils.IsQTT) {
            this._cur_tool = utils.Tool_QTT;
        } else if (PlatUtils.IsXiaoMi) {
            this._cur_tool = utils.Tool_XiaoMi;
        } else if (PlatUtils.ISUC) {
            this._cur_tool = utils.Tool_UC;
        } else if (PlatUtils.ISCocos) {
            this._cur_tool = utils.Tool_Cocosplay;
        } else if (PlatUtils.IsNativeAndroid) {
            this._cur_tool = utils.Tool_Native;
        } else if (PlatUtils.Is4399) {
            this._cur_tool = utils.Tool_4399;
        } else if (PlatUtils.IsKwai) {
            this._cur_tool = utils._tool_Kwai;
        } else if (PlatUtils.IsNativeIOS) {
            this._cur_tool = utils.Tool_IOS;
        } else if (PlatUtils.IsWiFi) {
            this._cur_tool = utils._tool_Wifi;
        } else if (PlatUtils.IsHago) {
            this._cur_tool = utils._tool_Hago;
        } else if (PlatUtils.IsHuaWei) {
            this._cur_tool = utils.Tool_Huawei;
        } else if (PlatUtils.IsFaceBook) {
            this._cur_tool = utils.Tool_Facebook;
        } else if (PlatUtils.IsGoogleWeb) {
            this._cur_tool = utils.Tool_Facebook;
        } else {
            this._cur_tool = utils._tool_Broswer;
        }
        return this._cur_tool;
    }

    serverShowLog: boolean = false;
    /**
     * 显示日志到控制台
     */
    showLogToConsole: boolean = false;
    /**
     * 显示LOG
     */true
    public showLog(msg: any = "", ...any) {
        // if (true) {
        //     console.log(msg, ...any);
        //     return;
        // }
        if (this.showLogView || this.serverShowLog) {
            if (this.config.otherconfig.logoutView) {
                if (cc.director.getScene()) {
                    let logooutView = cc.director.getScene().getChildByName("LogoutView");
                    if (!logooutView) {
                        logooutView = cc.instantiate(this.config.otherconfig.logoutView);
                        cc.director.getScene().addChild(logooutView, 1000);
                    }
                    logooutView.getComponent("LogOutView").addLog(msg, ...any);
                }

            } else {
                utils.showLog("warn:" + "未找到预制体 LogOutView, 请查看CommonUtils组件上是否赋值！");
            }
        } else {
            if (this.showLogToConsole) {
                console.log(msg, ...any);
            } else {
                cc.log(msg, ...any);
            }
        }
    }


    /**
     * 屏幕震动功能
     * @param type 震动类型 传递枚举：VibrateType
     */
    public vibrate(type: VibrateType = VibrateType.Short) {
        if (PlatUtils.IsWechat) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                //使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
                wx.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                wx.vibrateLong({ success(res) { }, fail(res) { } });  //400 ms
            }
        } else if (PlatUtils.IsOPPO) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                qg.vibrateShort({ success(res) { }, fail(res) { } });//（20 ms）
            } else {
                //@ts-ignore
                qg.vibrateLong({ success(res) { }, fail(res) { } });  //400 ms
            }
        } else if (PlatUtils.IsVIVO) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                qg.vibrateShort();//（15 ms）
            } else {
                //@ts-ignore
                qg.vibrateLong(); //400 ms
            }
        } else if (PlatUtils.IsQQ) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                qq.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                qq.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsDouyin) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                tt.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                tt.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsBaidu) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                swan.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                swan.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsWiFi) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                //（15 ms），仅在 iPhone 7/7 Plus 以上及 Android 机型生效。
                wuji.vibrateShort({ success(res) { }, fail(res) { } });
            } else {
                //@ts-ignore
                wuji.vibrateLong({ success(res) { }, fail(res) { } }); //400 ms
            }
        } else if (PlatUtils.IsNativeAndroid) {
            if (type == VibrateType.Short) {
                //@ts-ignore
                jsb.reflection.callStaticMethod(utils.Tool_Native.jniClassName, "vibrateShort", "()V");
            } else {
                //@ts-ignore
                jsb.reflection.callStaticMethod(utils.Tool_Native.jniClassName, "vibrateLong", "()V");
            }
        }
    }


    /**
     * 游戏开始上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    StartGame(level: string, model?: string) {
        AldUtils.StartGame(level, model);
        utils.cur_tool && utils.cur_tool.umaOnStart && utils.cur_tool.umaOnStart(level);
        if (PlatUtils.IsDouyin || PlatUtils.IsKwai) {
            this.AutoStartRecord(level);
        }
    }



    /**
    * 游戏胜利上报,显示结算广告
    * @param level 当前关卡
    * @param star 获得星星： 默认为0
    * @param model 当前模式： 没有则省略
    * @param isShowAd 是否调用广告，默认开启调用
    * @returns json{ type:(1:6元素互推、2:单个原生广告),node:节点}                  
    * 
    */
    GameWin(level: string, star: number = 0, model?: string, isShowAd: boolean = true): any {
        AldUtils.GameWin(level, star, model);
        utils.cur_tool && utils.cur_tool.umaReportedLevel && utils.cur_tool.umaReportedLevel(level, LevelStatus.GameWin);
        if (PlatUtils.IsKwai) {
            utils.kwaiTool.isClickEnd = false;
        }
        // if (PlatUtils.IsDouyin || PlatUtils.IsKwai) {
        this.recordEnd();
        // }
        return this.AutoShowStatement(level, true, isShowAd);

    }
    /**
    * 游戏失败上报,显示结算广告
    * @param level 当前关卡
    * @param model 当前模式： 没有则省略
    * @param isShowAd 是否调用广告，默认开启调用
    * @returns json{ type:(1:6元素互推、2:单个原生广告),node:节点}
    */
    GameFail(level: string, model?: string, isShowAd: boolean = true): any {
        AldUtils.GameFail(level, model);
        utils.cur_tool && utils.cur_tool.umaReportedLevel && utils.cur_tool.umaReportedLevel(level, LevelStatus.GameFail);
        // if (PlatUtils.IsDouyin || PlatUtils.IsKwai) {
        this.recordEnd();
        // }
        return this.AutoShowStatement(level, false, isShowAd);
    }
    /**
     * 跳过关卡上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    GameSkip(level: string, model?: string) {
        AldUtils.GameSkip(level, model);
    }

    /**
     * 事件上报
     * @param eventName 事件名称
     */
    SendEvent(eventName: string) {
        AldUtils.SendEvent(eventName)
    }


    /**
     * 友盟自定义事件上报
     * @param eventID 事件ID
     * @param params   事件内容 Type: obj
     */
    umaEvent(eventID: string, params?) {
        utils.showLog(`事件上报:${eventID}：${params}`);
        if (PlatUtils.IsNativeAndroid) {
            utils.cur_tool && utils.cur_tool.umaTrackEvent && utils.cur_tool.umaTrackEvent("custom", eventID, params);
        } else {
            utils.cur_tool && utils.cur_tool.umaTrackEvent && utils.cur_tool.umaTrackEvent(eventID, params);
        }
    }


    overPageShowTime: number = 0;
    overPageInsertAdIsTouch: boolean = false; // 结算页面的插屏广告是否被点击过
    reportOverPageTouchEvent(overPage: cc.Node) {
        utils.showLog("reportOverPageTouchEvent >>>>>>>");
        this.overPageInsertAdIsTouch = false;
        this.overPageShowTime = new Date().getTime();
        let node = new cc.Node();
        node.width = overPage.width * 2;
        node.height = overPage.height * 2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            let time = (new Date().getTime() - this.overPageShowTime) / 1000;
            let json: any = {};
            json.data = time;
            utils.SendEventNew(`结算页面点击时间`, "overPageTouch", JSON.stringify(json));
            node.destroy();
            node.removeFromParent();
        }, overPage);
        node['_touchListener']['swallowTouches'] = false;
        overPage.addChild(node, cc.macro.MAX_ZINDEX);
    }

    /**
     * 自定义事件上报
     * @param eventName 事件名称
     */
    SendEventNew(eventName: string, eventId: string = "default", eventData?: string, isCallBack: boolean = true) {
        utils.showLog(`自定义事件上报:${eventName}，${eventId},${eventData}`);
        utils.cur_tool && utils.cur_tool.SendEventNew && utils.cur_tool.SendEventNew(eventName, eventId, eventData, isCallBack);
    }


    /**
     * 游戏中使用道具上报
     * @param level 当前关卡
     * @param tooName 道具名称
     * @param model 当前模式： 没有则省略
     */
    public static UseTool(level: string, toolName: string, model?: string): void {
        AldUtils.UseTool(level, toolName, model)
    }

    /**
     * 分享成功次数
     */
    public recored_share_count: number = 0;
    /**
     * 判断算界面是否能显示自动分享   自动强弹视频   自动弹插屏
     * type 1自动分享   2自动强弹视频    3自动弹插屏 4自动弹互推插屏
    */
    public checkResultShow(type): boolean {
        let level = utils.currentLevel;
        let isSuccess = utils.isSuccess;
        let config = utils.ServerConfig;
        if (!config) {
            utils.showLog("warn:" + "服务器配置不存在,只显示结算广告")
            return type == 3;
        }
        if (PlatUtils.IsDouyin) {
            if (config.auto_record_share_count) {
                let recoredCount = config.auto_record_share_count;
                if (recoredCount != 0 && utils.recored_share_count >= recoredCount) {
                    utils.showLog(`服务器配置分享次数：${recoredCount} ,已到上限`)
                } else {
                    let record_cap = config.auto_record_interval;
                    let checkShow: boolean = false;
                    if (level > 0 && record_cap != 0) {
                        if (record_cap.indexOf(",") == -1) {
                            if (level % Number(record_cap) == 0) {
                                checkShow = true;
                            }
                        } else {
                            utils.showLog(`指定关卡${config.auto_record_interval}分享录屏，当前关卡为：${level}`);
                            let record_cap_arr = record_cap.split(",");
                            record_cap_arr.forEach(str => {
                                if (level == Number(str)) {
                                    checkShow = true;
                                }
                            });
                        }
                        if (checkShow) {
                            if (config.auto_record_share_type == "all") {
                                return type == 1;
                            }
                            if (config.auto_record_share_type == "success") {
                                if (utils.isSuccess == true) {
                                    return type == 1;
                                }
                            }
                            if (config.auto_record_share_type == "fail") {
                                if (utils.isSuccess == false) {
                                    return type == 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        utils.showLog(`不能自动分享录屏 分享录屏间隔为：${config.auto_record_interval}  分享类型为：${config.auto_record_share_type}`);
        if (config.auto_video_interval && config.auto_video_interval != 0) {
            let space = config.auto_video_interval;
            let showType = config.auto_video_show_type
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
        utils.showLog(`不能自动弹视频弹视频间隔为：${config.auto_video_interval} 弹视频类型为：${config.auto_video_show_type}`)

        if (config.auto_rec_insert_interval && config.auto_rec_insert_interval != 0) {
            let space = config.auto_rec_insert_interval;
            let showType = config.auto_rec_insert_type;
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
        utils.showLog(`不能自动弹互推插屏间隔为：${config.auto_rec_insert_interval} 弹视频类型为：${config.auto_rec_insert_type}`)

        return type == 3;

    }


    /**
     * 结算广告控制
     * level 当前关卡   isSuccess是否胜利 
     * qq  若判断2通过弹游戏盒子  判断3通过弹插屏
     * 抖音  若判断2通过则弹视频   判断3过弹插屏
     * 趣头条 若判断2通过弹视频   判断3通过弹互动直弹
     * 其他平台若判断2通过则服务器配置有问题，联系运营修改
     *服务器控制 结算界面自动弹出视频
     */
    public AutoShowStatement(level, isSuccess, isShowAd): any {
        utils.currentLevel = level;
        utils.isSuccess = isSuccess;
        let res: any = { "type": -1, "node": null }
        if (!isShowAd) {
            utils.showLog("isShowAd为false，只上报不显示广告")
            return res;
        }

        let isShowVideo: boolean = false;
        if (this.checkResultShow(2)) {
            if (this.getConfigByKey("result_auto_show_video") == "false") return;
            if (PlatUtils.IsDouyin) {
                utils.showLog("服务器版本：", utils.config.douyinconfig.version, "当前版本：", this.getConfigByKey("version"));
                if (utils.config.douyinconfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    utils.adManager.ShowVideo(() => { });
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsQQ) {
                if (utils.config.qqconfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    utils.adManager.ShowVideo(() => { });
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsWiFi) {
                if (utils.config.wifiConfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    utils.adManager.ShowVideo(() => { });
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsBaidu) {
                if (utils.config.baiduconfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    utils.adManager.ShowVideo(() => { });
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsKwai) {
                if (utils.config.kwaiConfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    utils.adManager.ShowVideo(() => { });
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsHago) {
                if (utils.config.hagoConfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    utils.adManager.ShowVideo(() => { });
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsNativeAndroid) {
                if (utils.config.nativeAndroidConfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    if (utils.ServerConfig && this.getConfigByKey("auto_video_type") == "reward_video") {
                        utils.adManager.ShowVideo(() => { });
                    } else {
                        utils.adManager.showFullScreenVideo();
                    }
                    isShowVideo = true;
                } else {
                    utils.showLog("与服务器版本一致，不自动播放视频！")
                }
            } else if (PlatUtils.IsNativeIOS) {
                if (utils.config.nativeIoSConfig.version != this.getConfigByKey("version")) {
                    utils.showLog("版本不一致，自动播放视频！")
                    if (utils.ServerConfig && this.getConfigByKey("auto_video_type") == "reward_video") {
                        utils.adManager.ShowVideo(() => { });
                    } else {
                        utils.adManager.showFullScreenVideo();
                    }
                    isShowVideo = true;
                }
            } else if (PlatUtils.IsVIVO) {
                utils.showLog("服务器配置当前显示强弹视频，但当前平台不支持。需修改服务器配置")
                utils.adManager.showStatementAds();
            } else {
                isShowVideo = true;
                utils.adManager.ShowVideo(() => { });
            }
            if (isShowVideo && (PlatUtils.IsDouyin || PlatUtils.IsQQ || PlatUtils.IsNativeAndroid || PlatUtils.IsNativeIOS)) {
                utils.showLog("当前强弹了视频，不显示插屏！");
            } else {
                res = utils.adManager.showStatementAds();
            }
        }


        // if (this.canShowRedBag() && this.yzRedBagInfo.progress >= this.yzRedBagInfo.totalProgress) {
        //     utils.showLog("当前红包进度已满，显示获得红包窗口！");
        //     // this.showOpenRedBagPanel({ showType: 2 });
        // }


        if (this.checkResultShow(3)) {
            res = utils.adManager.showStatementAds();
            // console.log(" this.checkResultShow(3)", res.node);
        }





        if (PlatUtils.IsDouyin || PlatUtils.IsNativeIOS || PlatUtils.IsBaidu || PlatUtils.IsNativeAndroid) {
            //抖音平台判断是否需要6元素互推
            res.type = 1;
            res.node = utils.showCrossWidget6();
        }

        return res;
    }


    /**
     * 获得一次现金红包
     */
    public addRedBagCount(callFun?: Function) {
        this.yzRedBagInfo.freeRedBagCount++;
        if (callFun) {
            this.rewardCloseFunc = callFun;
        }
        this.showOpenRedBagPanel({ showType: 3 });
        utils.showLog("获得一个现金红包");
    }

    /**
     * 开始游戏自动录屏
     * 暂时只有头条平台有
     * 默认为0 表示不开启，例如3 表示每三关会自动录屏，例如3,6,9 表示只有第3,6,9指定的关卡会自动录屏
     */
    AutoStartRecord(level) {
        if (this.getConfigByKey("auto_record_interval") > 0) {
            utils.recordStart();
        } else {
            utils.showLog("warn:" + "服务器配置不存在auto_record_interva")
        }
    }


    shareRecordPanel: cc.Node = null;
    /**
     * 显示录屏分享窗口
     * @param params 
     */
    public showShareRecordPanel(params: any = null) {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (this.config.otherconfig.shareRecordPanel) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.shareRecordPanel);
            if (node) {
                if (this.shareRecordPanel && cc.isValid(this.shareRecordPanel)) {
                    this.shareRecordPanel.destroy();
                }
                this.shareRecordPanel = node;
                this.shareRecordPanel.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    } else {
                        cc.director.getScene().addChild(this.shareRecordPanel, 1000);
                    }
                } else {
                    cc.director.getScene().addChild(this.shareRecordPanel, 1000);
                }
                widget.updateAlignment();
                return node;
            }
        } else {
            utils.showLog("未找到预制体 ShareRecordPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }

    /**
     * 获取其他辅助配置
     */
    public get otherConfig(): any {
        if (!this._other_config) {
            this._other_config = this.config.otherconfig.localConfig.json.other;
        }
        return this._other_config;
    }

    /**
     * 获取试用皮肤关卡间隔
     * 默认为每5关显示一次
     * 
     */
    public isShowTrySkin(curLevel: number): boolean {
        let count: number = 5;

        if (utils.ServerConfig && this.getConfigByKey("try_skin_level_count")) {
            count = this.getConfigByKey("try_skin_level_count");
        }
        if (curLevel % count == 0) {
            if (utils.ServerConfig && this.getConfigByKey("try_skin_show_ad_interval") != undefined) {
                if (curLevel % this.getConfigByKey("try_skin_show_ad_interval") == 0) {
                    utils.showLog(`服务器配置间隔${this.getConfigByKey("try_skin_show_ad_interval")}关试用皮肤展示插屏！`);
                    utils.adManager.ShowInterstitial();
                }
            }
            return true;
        }

        return false;
    }


    /**
     * 延迟显示跳过或者关闭按钮
     * @param btn 延迟显示按钮的节点
     * @param isCloseBtn 是否返回或者关闭按钮
     * @param location 按钮所在的页面位置
     */
    public showSkipBtn(btn: cc.Node, isCloseBtn: boolean = false, location: BannerLocation = BannerLocation.None): void {
        if (btn) {

            let delayShowBtn: number = PlatUtils.IsNativeAndroid ? 3 : 0;
            if (this.getConfigByKey("skip_btn_show_delay")) {
                delayShowBtn = this.getConfigByKey("skip_btn_show_delay");
            }
            if (isCloseBtn) {
                if (this.getConfigByKey("special_skip_btn_show_delay")) {
                    delayShowBtn = this.getConfigByKey("special_skip_btn_show_delay");
                }
            }

            if (PlatUtils.IsTest) {
                this.ServerConfig.over_page_skip_btn_show_delay = 3;
            }
            if (location == BannerLocation.Over) {
                if (this.getConfigByKey("over_page_skip_btn_show_delay")) {
                    delayShowBtn = this.getConfigByKey("over_page_skip_btn_show_delay");
                }
            }

            if (delayShowBtn > 0) {
                btn.opacity = 0;
                btn.active = false;
                this.scheduleOnce(() => {
                    if (btn && cc.isValid(btn)) {
                        btn.active = true;
                        btn.runAction(cc.fadeIn(0.3));
                    }
                }, delayShowBtn);
            } else {
                if (!btn.active) {
                    btn.active = true;
                }
            }

        }
    }

    /**
     * 抖音按钮延迟显示
     * 默认为0秒
     */
    public delayShowNode(btn: cc.Node): void {
        if (btn) {
            btn.opacity = 0;
            btn.active = true;
            let delayShowBtn: number = 0;
            if (this.getConfigByKey("next_btn_show_delay")) {
                delayShowBtn = this.getConfigByKey("next_btn_show_delay");
            }
            this.scheduleOnce(() => {
                if (btn && cc.isValid(btn)) {
                    btn.runAction(cc.fadeIn(0.3));
                }
            }, delayShowBtn);
        }
    }

    /**
     * 宝箱界面是否自动勾选
     */
    public isBoxAutoSelectToggle(): boolean {
        let cap_level: number = 0;
        let level = utils.currentLevel;
        if (this.getConfigByKey("box_auto_select_level")) {
            cap_level = Number(this.getConfigByKey("box_auto_select_level"));
        } else {
            utils.showLog("服务器配置不存在，不自动勾选")
        }
        if (cap_level != 0 && (level % cap_level) == 0) {
            return true;
        }

        return false;
    }

    /**
     * 结算界面是否自动勾选
     */
    public isResultAutoSelectToggle(): boolean {
        let cap_level: number = 0;
        let level = utils.currentLevel;
        if (this.getConfigByKey("result_auto_select_level")) {
            cap_level = Number(this.getConfigByKey("result_auto_select_level"));
        } else {
            utils.showLog("服务器配置不存在，不自动勾选")
        }
        if (cap_level != 0 && (level % cap_level) == 0) {
            return true;
        }

        return false;
    }

    /**
     * 试用皮肤界面是否自动勾选
     */
    public isTrySkinAutoSelectToggle(): boolean {
        let cap_level: number = 0;
        let level = utils.currentLevel;
        if (this.getConfigByKey("skin_auto_select_level")) {
            cap_level = Number(this.getConfigByKey("skin_auto_select_level"));
        } else {
            utils.showLog("服务器配置不存在，不自动勾选")
        }
        if (cap_level != 0 && (level % cap_level) == 0) {
            return true;
        }

        return false;
    }


    /**
     * 游戏当前版本
     */
    get gameVersion(): string {
        if (this.cur_tool && this.cur_tool.gameVersion) return this.cur_tool.gameVersion();
        return "-1"
    }
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
    public controView(view: ViewLocation): any {
        let result: any = { "isSelect": true, "msg": "观看视频获得奖励", "btnType": true, "is_open": false };
        let adTipsType: boolean;
        let selectType: number;
        if (!utils.ServerConfig) {
            utils.showLog("服务器配置不存在");
            return result;
        }

        //验证服务器是否开启勾选策略
        if (this.getConfigByKey("open_check_btn") == "false") {
            utils.showLog("服务器配置不开启勾选！");
            return result;
        }


        result.is_open = true;


        switch (view) {
            case ViewLocation.sign:
                selectType = this.getConfigByKey("sign_auto_select_level") ? this.getConfigByKey("sign_auto_select_level") : 0;
                if (this.getConfigByKey("ad_tip_sign_random") == "true") {
                    adTipsType = Math.random() >= 0.5 ? true : false;
                } else {
                    adTipsType = true;
                }

                if (adTipsType) {
                    result.msg = "查看视频获得双倍奖励";
                } else {
                    result.msg = "不需要视频奖励";
                }
                break;
            case ViewLocation.trySkin:
                selectType = this.getConfigByKey("tryskin_auto_select_level") ? this.getConfigByKey("tryskin_auto_select_level") : 0;
                if (this.getConfigByKey("ad_tip_tryskin_random") == "true") {
                    adTipsType = Math.random() >= 0.5 ? true : false;
                } else {
                    adTipsType = true;
                }

                if (adTipsType) {
                    result.msg = "查看视频试用皮肤";
                } else {
                    result.msg = "不需要视频试用皮肤";
                }
                break;

            case ViewLocation.box:
                selectType = this.getConfigByKey("box_auto_select_level") ? this.getConfigByKey("box_auto_select_level") : 0;
                if (this.getConfigByKey("ad_tip_box_random") == "true") {
                    adTipsType = Math.random() >= 0.5 ? true : false;
                } else {
                    adTipsType = true;
                }
                if (adTipsType) {
                    result.msg = "查看视频获得五倍奖励";
                } else {
                    result.msg = "不需要视频奖励";
                }
                break;
            case ViewLocation.successBox:
                selectType = this.getConfigByKey("success_box_auto_select_level") ? this.getConfigByKey("success_box_auto_select_level") : 0;
                break;
            case ViewLocation.failBox:
                selectType = this.getConfigByKey("fail_box_auto_select_level") ? this.getConfigByKey("fail_box_auto_select_level") : 0;
                break;
            case ViewLocation.winPanel:
                selectType = this.getConfigByKey("win_panel_auto_select_level") ? this.getConfigByKey("win_panel_auto_select_level") : 0;
                break;
            case ViewLocation.turntable:
                selectType = this.getConfigByKey("turntable_auto_select_level") ? this.getConfigByKey("turntable_auto_select_level") : 0;
                break;
        }
        if (selectType == 0) {
            result.isSelect = false;
        } else if (selectType == 1) {
            result.isSelect = true;
        } else if (selectType == 2) {
            result.isSelect = Math.random() >= 0.5 ? true : false;
        }

        result.btnType = adTipsType == result.isSelect;
        return result;
    }

    /**
     * 是否能再下一关开始的时候强弹视频
    */
    canShowNextVideo(level): boolean {
        if (utils.ServerConfig && this.getConfigByKey("next_auto_video_interval")) {
            let cap = Number(this.getConfigByKey("next_auto_video_interval"));
            if (cap && cap != 0) {
                if (level % cap == 0) {
                    if (PlatUtils.IsDouyin) {
                        if (this.getConfigByKey("version") != utils.config.douyinconfig.version) {
                            return true;
                        }
                    } else if (PlatUtils.IsBaidu) {
                        if (this.getConfigByKey("version") != utils.config.baiduconfig.version) {
                            return true;
                        }
                    } else if (PlatUtils.ISUC) {
                        if (this.getConfigByKey("version") != utils.config.ucConfig.version) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    if (PlatUtils.Is4399) {
                        cap = 3;//4399不能读取服务器配置写死间隔
                        if (cap != 0 && level % cap == 0) {
                            return this.true;
                        }
                    }
                }
            }
        }
        return false;
    }



    /**
     * 是否显示红包
     */
    public canShowRedBag() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;

        if (this.ServerConfig && this.yzRedBagInfo && this.ServerConfig.show_red_bag && this.ServerConfig.show_red_bag == "true") {
            return true;
        }
        utils.showLog("服务器配置不显示红包组件！");
        return false;
    }

    _withdrawalWidget: cc.Node = null;




    /**
     * 隐藏提现框挂件
     */
    public hideWithdrawalWidget() {
        if (this._withdrawalWidget && cc.isValid(this._withdrawalWidget)) {
            this._withdrawalWidget.destroy();
        }
    }

    /**
     * 显示提现框挂件
     * @param params 
     */
    public showWithdrawalWidget(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag()) return null;


        if (this.config.otherconfig.withdrawalWidget) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.withdrawalWidget);
            if (node) {
                if (this._withdrawalWidget && cc.isValid(this._withdrawalWidget)) {
                    this._withdrawalWidget.destroy();
                }
                this._withdrawalWidget = node;
                this._withdrawalWidget.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
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
        } else {
            utils.showLog("warn:" + "未找到预制体 WithdrawalWidget, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }



    _redBagProgressWidget: cc.Node = null;



    /**
     * 隐藏红包进度挂件
     */
    public hideRedBagProgressWidget() {
        if (this._redBagProgressWidget && cc.isValid(this._redBagProgressWidget)) {
            this._redBagProgressWidget.destroy();
        }
    }
    /**
    * 显示红包进度挂件
    * @param params 
    */
    public showRedBagProgressWidget(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag()) return null;

        if (this.config.otherconfig.redBagProgressWidget) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.redBagProgressWidget);
            if (node) {
                if (this._redBagProgressWidget && cc.isValid(this._redBagProgressWidget)) {
                    this._redBagProgressWidget.destroy();
                }
                this._redBagProgressWidget = node;
                this._redBagProgressWidget.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

                if (params) {
                    if (params.location) {
                        node.getComponent(RedBagProgressWidget).init(params);
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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
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
        } else {
            utils.showLog("warn:" + "未找到预制体 RedBagProgressWidget, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }


    _withdrawalPanel: cc.Node = null;
    /**
   * 显示提现弹窗
   * @param params 
   */
    public showWithdrawalPanel(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.canShowRedBag()) return null;

        if (this.config.otherconfig.withdrawalPanel) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.withdrawalPanel);
            if (node) {
                if (this._withdrawalPanel && cc.isValid(this._withdrawalPanel)) {
                    this._withdrawalPanel.destroy();
                }
                this._withdrawalPanel = node;
                cc.director.getScene().addChild(this._withdrawalPanel, 9999);
            } else {
                utils.showLog("warn:" + "未找到预制体 WithdrawalPanel, 请查看CommonUtils组件上是否赋值！");
            }
            return null;
        }
    }

    _openRedBagPanel: cc.Node = null;
    /**
   * 显示开红包弹窗
   * @param params 
   */
    public showOpenRedBagPanel(params: any = null): cc.Node {

        if (params && params.closeCallFunc) {
            this.rewardCloseFunc = params.closeCallFunc;
        }


        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            this.rewardCloseFunc && this.rewardCloseFunc();
            return null;
        }

        if (!this.canShowRedBag()) {
            this.rewardCloseFunc && this.rewardCloseFunc();
            return null;
        }

        if (params && params.location && params.location === BannerLocation.Home) {
            if (this.yzRedBagInfo.progress < this.yzRedBagInfo.totalProgress && !this.yzRedBagInfo.isFreeRedBag) {
                utils.showLog("当前红包进度不满足条件且没有免费红包领取，首页不显示拆红包窗口");
                this.rewardCloseFunc && this.rewardCloseFunc();
                return null;
            } else if (!this.yzRedBagInfo.isFreeRedBag) {
                params.showType = 2;
            }
        }

        if (this.config.otherconfig.openRedBagPanel) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.openRedBagPanel);
            if (node) {
                if (this._openRedBagPanel && cc.isValid(this._openRedBagPanel)) {
                    this._openRedBagPanel.destroy();
                }
                this._openRedBagPanel = node;
                if (params && params.showType) {
                    this._openRedBagPanel.getComponent(OpenRedBagPanel).initData(params.showType);
                }
                cc.director.getScene().addChild(node, 9999);

            } else {
                utils.showLog("warn:" + "未找到预制体 OpenRedBagPanel, 请查看CommonUtils组件上是否赋值！");
            }
            return null;
        }
    }

    _rewardRedBagPanel: cc.Node = null;
    _rewardRedBagPanelShowCount: number = 0;
    /**
   * 显示获得红包弹窗
   * @param params 
   */
    public showRewardRedBagPanel(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (!this.canShowRedBag()) return null;
        this._rewardRedBagPanelShowCount++;
        // if (this.ServerConfig && this.ServerConfig.show_reward_red_bag_interval) {
        if (this._rewardRedBagPanelShowCount % 3 != 0) {
            utils.showLog("获得红包弹窗未达到服务器配置的间隔限制！");
            return;
        }
        // }

        if (this.config.otherconfig.rewardRedBagPanel) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.rewardRedBagPanel);
            if (node) {
                if (this._rewardRedBagPanel && cc.isValid(this._rewardRedBagPanel)) {
                    this._rewardRedBagPanel.destroy();
                }
                this._rewardRedBagPanel = node;
                cc.director.getScene().addChild(this._rewardRedBagPanel, 9999);
            } else {
                utils.showLog("warn:" + "未找到预制体 OpenRedBagPanel, 请查看CommonUtils组件上是否赋值！");
            }
            return null;
        }
    }



    /**
    * 是否竖屏互推窗口
    */
    public isVerticalRecommentPanel() {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        if (this.Tool_Broswer) return true;
        if (PlatUtils.IsWechat) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.wechatTool
                    && utils.wechatTool.ServerConfig
                    && utils.wechatTool.ServerConfig.is_vertical_game) {
                    if (utils.wechatTool.ServerConfig.is_vertical_game == "true") {
                        return true;
                    } else {
                        utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsOPPO) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.oppoTool
                    && utils.oppoTool.ServerConfig
                    && utils.oppoTool.ServerConfig.is_vertical_game) {
                    if (utils.oppoTool.ServerConfig.is_vertical_game == "true") {
                        return true;
                    } else {
                        utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsDouyin) {
            if (PlatUtils.IsAndroid
                && utils.isSupportnavigateToMiniGame()) {
                if (utils.Tool_Douyin
                    && utils.Tool_Douyin.ServerConfig
                    && utils.Tool_Douyin.ServerConfig.is_vertical_game) {
                    if (utils.Tool_Douyin.ServerConfig.is_vertical_game == "true") {
                        return true;
                    } else {
                        utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsBaidu) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.Tool_Baidu
                    && utils.Tool_Baidu.ServerConfig
                    && utils.Tool_Baidu.ServerConfig.is_vertical_game) {
                    if (utils.Tool_Baidu.ServerConfig.is_vertical_game == "true") {
                        return true;
                    } else {
                        utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsQQ) {
            if (utils.isSupportnavigateToMiniGame()) {
                if (utils.Tool_QQ
                    && utils.Tool_QQ.ServerConfig
                    && utils.Tool_QQ.ServerConfig.is_vertical_game) {
                    if (utils.Tool_QQ.ServerConfig.is_vertical_game == "true") {
                        return true;
                    } else {
                        utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                    }
                } else {
                    utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "当前平台不支持游戏内跳转，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.Is4399) {
            return true;
        } else if (PlatUtils.IsNativeAndroid) {
            if (utils.Tool_Native
                && utils.Tool_Native.ServerConfig
                && utils.Tool_Native.ServerConfig.is_vertical_game) {
                if (utils.Tool_Native.ServerConfig.is_vertical_game == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
            }
        } else if (PlatUtils.IsNativeIOS) {
            if (utils.Tool_IOS
                && utils.Tool_IOS.ServerConfig
                && utils.Tool_IOS.ServerConfig.is_vertical_game) {
                if (utils.Tool_IOS.ServerConfig.is_vertical_game == "true") {
                    return true;
                } else {
                    utils.showLog("warn:" + "is_vertical_game参数为false，更多游戏侧边栏组件不显示！");
                }
            } else {
                utils.showLog("warn:" + "配置中没有is_vertical_game参数，更多游戏侧边栏组件不显示！");
            }

        }
        return false;
    }

    /**
        * 显示红包进度挂件
        * @param params 
        */
    public showVerticalRecommentPanel(params: any = null): cc.Node {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (!this.isVerticalRecommentPanel()) return null;

        if (this.config.otherconfig.verticalRecommentPanel) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.verticalRecommentPanel);
            if (node) {
                // if (this._redBagProgressWidget && cc.isValid(this._redBagProgressWidget)) {
                //     this._redBagProgressWidget.destroy();
                // }
                node.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }

                    if (params.position != null) {
                        node.setPosition(CompatibleTool.position(params.position.x, params.position.y))
                    }

                }
                widget.updateAlignment();
                return node;
            }
        } else {
            utils.showLog("warn:" + "未找到预制体 verticalRecommentPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }



    /**
     * 是否显示用户协议挂件
     */
    public isShowPrivacyWidget(): boolean {
        if (this.Tool_Broswer) return true;
        if (this.getConfigByKey("is_privacy") == "true") {
            return true;
        } else {
            utils.showLog("warn:" + "配置中没有is_privacy参数，更用户协议挂件组件不显示！");
        }
        return false;
    }



    _privacyWidget: cc.Node = null;
    /**
     * 显示用户协议挂件
     * @param params 
     */
    public showPrivacyWidget(params: any = null): cc.Node {
        if (utils.isShowPrivacyWidget()) {
            if (this.config.otherconfig.privacyWidget) {
                if (this._privacyWidget && cc.isValid(this._privacyWidget)) {
                    this._privacyWidget.destroy();
                }
                let node: cc.Node = cc.instantiate(this.config.otherconfig.privacyWidget);
                this._privacyWidget = node;
                this._privacyWidget.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

                if (params) {

                    if (params.color) {
                        node.children[0].color = params.color;
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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }

                }
                widget.updateAlignment();
                node.on(cc.Node.EventType.TOUCH_END, () => {
                    if (PlatUtils.IsNativeAndroid) {
                        utils.Tool_Native && utils.Tool_Native.showPrivacyAgreement();
                    } else {
                        utils.showPrivacyPanel({ is_widget_click: "true", group: node.group });
                    }
                }, this);
                return node;
            } else {
                utils.showLog("warn:" + "隐私政策挂件预制体不存在！")
            }

        } else {
            utils.showLog("warn:" + "不可显示更多游戏侧边栏")
        }
        return null;
    }


    /**
     * 隐藏隐私政策
     */
    public hidePrivacyWidget() {
        if (this._privacyWidget && cc.isValid(this._privacyWidget)) {
            this._privacyWidget.destroy();
        }
    }



    /**
     * 是否显示用户隐私协议弹窗
     */
    public isShowPrivacyPanel(): boolean {
        if (PlatUtils.IsHuaWei || PlatUtils.IsXiaoMi) {
            return true;
        }
        if (this.getConfigByKey("is_privacy_panel")) {
            if (this.getConfigByKey("is_privacy_panel") == "true") {
                return true;
            } else {
                utils.showLog("warn:" + "is_privacy_panel参数为false，用户隐私政策弹窗组件不显示！");
            }
        }

        return false;
    }

    _privacyPanel: cc.Node = null;
    /**
     * 显示用户协议弹窗
     * @param params 
     */
    public showPrivacyPanel(params: any = null) {
        utils.showLog("showPrivacyPanel>>>");

        let showPanel: Function = (showDesc: false) => {

            if (this.config.otherconfig.privacyPanel) {

                if (this._privacyPanel && cc.isValid(this._privacyPanel)) {
                    this._privacyPanel.destroy();
                }

                let node: cc.Node = cc.instantiate(this.config.otherconfig.privacyPanel);
                let yzUserPrivacyPanel = node.getComponent(YzUserPrivacyPanel);
                yzUserPrivacyPanel.showDesc = showDesc;
                this._privacyPanel = node;
                this._privacyPanel.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);
                let subject = "深圳市优智信息技术有限公司";
                if (params && params.subject) {
                    subject = params.subject;
                }
                let content: string = cc.find("Panel/subject", node).getComponent(cc.Label).string;
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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    } else {
                        cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
                    }
                } else {
                    cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
                }
                widget.updateAlignment();
            } else {
                utils.showLog("warn:" + "隐私政策弹窗预制体不存在！")
            }
        }

        if (params && params.is_widget_click) {
            showPanel(true);
        } else {
            let ysxy = YZ_LocalStorage.getItem(YZ_Constant.YZ_GAME_YSXY);
            if (ysxy) {
                utils.emitPrivacyCloseEvent();
                utils.showLog("已经同意过隐私协议，不显示隐私协议弹窗！");
                return;
            }

            utils.registerServerDataLoadSuccessEvent(() => {
                showPanel();
            }, this);

        }


    }


    minScale: number = 1;

    maxScale: number = 1.3;

    runTime: number = 0.3;

    /**
     * 显示放大缩小动态 
     * @param videoBtn 视频播放按钮
     * @param normalBtn 普通按钮
     * @param changeBtn 是否变换按钮位置
     * @param showHand 是否显示手势
     * @param location 按钮所属的页面位置
     * @returns 
     */
    showScaleAction(videoBtn: cc.Node, normalBtn: cc.Node = null, changeBtn: boolean = true, showHand: boolean = true, location: BannerLocation = BannerLocation.None) {

        if (changeBtn) {
            if (!cc.isValid(normalBtn) || !cc.isValid(videoBtn)) return;
        } else {
            if (!cc.isValid(videoBtn)) return;
        }


        if (CC_DEBUG) {
            this.ServerConfig.btn_show_scale = "true";
            this.ServerConfig.change_btn_position = "true"
            this.ServerConfig.over_page_change_btn = "false"
            this.ServerConfig.over_page_scale_btn = "false"
        }

        let scaleNode: cc.Node = videoBtn;

        if (this.getConfigByKey("change_btn_position") == "true" && changeBtn == true) {
            let changePosition: boolean = true;
            if (location == BannerLocation.Over) {
                if (this.getConfigByKey("over_page_change_btn") == "false") {
                    changePosition = false;
                    utils.showLog("结算页面按钮配置不切换位置！");
                }
            }

            if (changePosition) {
                let rand = Math.floor(Math.random() * 2 + 1);
                let videoPos = videoBtn.position;
                let normalPos = normalBtn.position;

                if (rand % 2 == 0) {
                    normalBtn.position = videoPos;
                    videoBtn.position = normalPos;
                } else {
                    scaleNode = videoBtn;
                    normalBtn.position = normalPos;
                    videoBtn.position = videoPos;
                }

                scaleNode = normalBtn.position.y > videoBtn.position.y ? normalBtn : videoBtn;
            }

        }

        if (this.getConfigByKey("btn_show_scale") == "true") {
            if (location == BannerLocation.Over &&
                this.getConfigByKey("over_page_scale_btn") == "false") {
                utils.showLog("结算页面按钮配置不缩放按钮！");
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



            let action = cc.sequence(
                cc.scaleTo(this.runTime, this.maxScale),
                cc.scaleTo(this.runTime, this.minScale));
            scaleNode.runAction(action.repeatForever());

            if (showHand) {
                if (videoBtn) {
                    let child = videoBtn.parent.getChildByName("hand")
                    if (child) {
                        child.destroy();
                        child.removeFromParent();
                    }
                }
                if (normalBtn) {
                    let child = normalBtn.parent.getChildByName("hand")
                    if (child) {
                        child.destroy();
                        child.removeFromParent();
                    }
                }



                if (this.config.otherconfig.handPrefab) {
                    let hand = cc.instantiate(this.config.otherconfig.handPrefab);
                    hand.x = scaleNode.x + scaleNode.width / 2;
                    hand.y = scaleNode.y - 135;

                    scaleNode.parent.addChild(hand, cc.macro.MAX_ZINDEX + 1, "hand");
                }
            }
        }


    }

    //原生广告最后上报时间
    _lastReportAdTime: number = 0;
    /**
     * 上报原生广告点击
     */
    reportNativeAdClick() {

        if ((new Date().getTime() - this._lastReportAdTime) / 1000 > 3) {
            this._lastReportAdTime = new Date().getTime();
            cc.game.emit(YZ_Constant.YZ_NativeAdClick);
            this.showLog("上报原生广告点击！");
        } else {
            this.showLog("上报原生广告点击间隔时间小于3秒！");
        }
    }

    /**
     * 是否显示结算页面广告点击按钮
     */
    canShowOverPageAdBtn(): boolean {
        if (this.ServerConfig && this.ServerConfig.show_over_page_ad_btn && this.ServerConfig.show_over_page_ad_btn == "true") {
            return true;
        }
        return false;
    }


    /**
     * 显示小游戏官方互推banner
     */
    showRecBanner() {
        if (!utils.adManager.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        this.cur_tool && this.cur_tool.showRecBanner && this.cur_tool.showRecBanner();
    }

    /**
     * 显示小游戏官方互推九宫格
     */
    showGamePortal() {

        if (!utils.adManager.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        this.cur_tool && this.cur_tool.showGamePortal && this.cur_tool.showGamePortal();
    }


    /**
     * 显示VIVO九宫格挂件
     * @param params 
     * ```
     * {
     * top:number       // 距离屏幕顶部的距离
     * }
     * ```
     */
    _curVivoGamePortalLocation: String = "";
    public showVivoGamePortalWidget(params: any = null): void {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }

        if (!PlatUtils.IsVIVO) return;
        if (!utils.adManager.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        if (this.getConfigByKey("vivo_game_protal") === "true") {
            if (params && params.location && (this.getConfigByKey("vivo_game_protal_locations").indexOf(params.location) < 0)) {
                utils.showLog("当前位置服务器未配置显示VIVO九宫格挂件！");
                this.Tool_Vivo && this.Tool_Vivo.hideGamePortal();
                return;
            }

            this.Tool_Vivo && this.Tool_Vivo.showGamePortal(params.top);
        } else {
            utils.showLog("服务器未配置显示VIVO九宫格挂件！");
        }
    }


    /**
     * 隐藏VIVO九宫格挂件
     * @param params 
     */
    public hideVivoGamePortalWidget(): void {
        this.Tool_Vivo && this.Tool_Vivo.hideGamePortal();
    }



    _curGameDrawerAdLocation: string = "";
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
    public showOppoGameDrawerAdWidget(params: any = null): void {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }

        if (!PlatUtils.IsOPPO) return;


        if (!utils.adManager.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }


        if (CC_DEBUG) {
            this.ServerConfig.oppo_game_drawer = "true";
            this.ServerConfig.oppo_game_drawer_locations = "1, 2, 3, 4,5,6"
        }
        if (this.getConfigByKey("oppo_game_drawer") === "true") {
            if (params && params.location && (this.getConfigByKey("oppo_game_drawer_locations").indexOf(params.location) < 0)) {
                utils.showLog("当前位置服务器未配置显示OPPO互推抽屉盒子！");
                this.oppoTool && this.oppoTool.hideGameDrawerAd();
                return;
            }
            // if (params && params.location && this._curGameDrawerAdLocation && this._curGameDrawerAdLocation != params.location) {
            //     this.oppoTool && this.oppoTool.hideGameDrawerAd();
            // }
            this.oppoTool && this.oppoTool.showGameDrawerAd(params);
        } else {
            utils.showLog("服务器未配置显示OPPO互推抽屉盒子！");
        }
    }


    /**
     * 隐藏OPPO互推抽屉盒子广告
     * @param params 
     */
    public hideOppoGameDrawerAdWidget(): void {
        this.oppoTool && this.oppoTool.hideGameDrawerAd();
    }



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
    public showOppoRecBanner(params: any = null): void {
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }

        if (!PlatUtils.IsOPPO) return;

        if (!utils.adManager.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        if (CC_DEBUG) {
            this.ServerConfig.oppo_rec_banner = "true";
            this.ServerConfig.oppo_rec_banner_locations = "1, 2, 3, 4"
        }
        if (this.getConfigByKey("oppo_rec_banner") === "true") {
            if (params && params.location && (this.getConfigByKey("oppo_rec_banner_locations").indexOf(params.location) < 0)) {
                utils.showLog("当前位置服务器未配置显示OPPO互推Banner！");
                this.oppoTool && this.oppoTool.hideOppoRecBanner();
                return;
            }
            this.oppoTool && this.oppoTool.showOppoNewRecBanner(params);
        } else {
            utils.showLog("服务器未配置显示OPPO互推Banner！");
        }
    }


    /**
     * 隐藏OPPO互推横幅广告
     * @param params 
     */
    public hideOppoRecBanner(): void {
        this.oppoTool && this.oppoTool.hideOppoRecBanner();
    }


    /**
     * 实名认证
     */
    public realNameAuth(code: string, name: string, callBack: Function) {
        utils.showLog(`进行实名制认证：#code=${code} #name=${name}`);
        utils.cur_tool && utils.cur_tool.realNameAuth && utils.cur_tool.realNameAuth(code, name, callBack);
    }


    /**
     * 退出游戏
     */
    public GameExit() {
        this.cur_tool && this.cur_tool.GameExit && this.cur_tool.GameExit();
    }



    _isRealNameAuth: boolean = false;
    _yzRealNameAuthPanel: cc.Node = null;
    /**
     * 显示实名制认证弹窗
     * @param params 
     */
    public showYzRealNameAuthPanel(params: any = null): cc.Node {
        utils.showLog("显示实名制认证弹窗!")
        if (!this._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return;
        }

        if (this.getRealNameAuthLocalData() && this.getRealNameAuthLocalData() == "1") {
            this._isRealNameAuth = true;
        }

        if (this._isRealNameAuth) {
            utils.showLog("已经进行过实名制认证,不显示弹窗！");
            this.emitRealNameAuthCloseEvent();
            return;
        }

        let showTime: number = -1;

        if (PlatUtils.IsNativeAndroid || PlatUtils.IsNativeIOS) {
            showTime = 0;
        }

        if (this.getConfigByKey("show_real_name_auth")) {
            showTime = parseInt(this.getConfigByKey("show_real_name_auth"));
        }

        if (showTime == -1) {
            utils.showLog("服务器控制不显示实名制弹窗！");
            this.emitRealNameAuthCloseEvent();
            return
        }


        if (PlatUtils.IsNativeAndroid) {
            this.scheduleOnce(() => {
                utils.Tool_Native.showRealNameAuthPanel(showTime + "");
            }, showTime);

            return;
        }

        if (this.config.otherconfig.yzRealNameAuthPanel) {

            if (this._yzRealNameAuthPanel && cc.isValid(this._yzRealNameAuthPanel)) {
                this._yzRealNameAuthPanel.destroy();
            }

            let node: cc.Node = cc.instantiate(this.config.otherconfig.yzRealNameAuthPanel);
            if (showTime == -2) {
                //达到防沉迷要求，直接提示下线
                node.getComponent(YzRealNameAuthPanel)._isOffLine = true;
                showTime = 0;
            }

            this._yzRealNameAuthPanel = node;
            this._yzRealNameAuthPanel.zIndex = 9999;

            if (params) {
                if (params.group) {
                    node.group = params.group;
                }
                if (params.scale != null) {
                    node.scale = params.scale;
                }
                this.scheduleOnce(() => {
                    if (params.parent != null) {
                        node.parent = params.parent;
                    } else {
                        cc.find("Canvas").addChild(node);
                    }
                }, showTime * 1000);

            } else {
                this.scheduleOnce(() => {
                    cc.find("Canvas").addChild(node);
                }, showTime * 1000);
            }
            return node;
        }
        utils.showLog("warn:" + "实名制认证弹窗预制体不存在！")
        return null;
    }


    setRealNameAuthLocalData(value) {
        YZ_LocalStorage.setItem('yz_game_real_name', `${value}`);
    }

    getRealNameAuthLocalData() {
        let realName = YZ_LocalStorage.getItem('yz_game_real_name');
        if (!realName) {
            realName = 0;
        }
        return realName;
    }



    /**
     * 通过字段名称获取服务器对应的配置
     * @param key 字段名称
     * @returns 服务器有配置则返回该配置，无则返回空字符串
     */
    public getConfigByKey(key: string): any {

        if (!this._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return "";
        }

        if (key && this.ServerConfig && key in this.ServerConfig) {
            return this.ServerConfig[key];
        }
        this.showLog(`warn:字段：${key} 未配置！`);
        return "";
    }


    /**
     * 登录
     * @param successCallFunc 成功回调
     * @param failCallFunc 失败回调
     */
    public login(successCallFunc?: Function, failCallFunc?: Function) {
        this.showLog("=====login====");

        if (successCallFunc) {
            if (PlatUtils.IsDouyin) {
                // if (YZ_LocalStorage.getItem("yz_login", "false") == "true") {
                //     successCallFunc && successCallFunc();
                //     return;
                // }
            }
            cc.game.targetOff(YZ_Constant.ST_LOGIN_SUCCESS);
            cc.game.on(YZ_Constant.ST_LOGIN_SUCCESS, successCallFunc, this);

        }
        if (failCallFunc) {
            let newFailFunc = () => {
                failCallFunc();
                this.showLoginPanel();
            }
            cc.game.targetOff(YZ_Constant.ST_LOGIN_FAIL);
            cc.game.on(YZ_Constant.ST_LOGIN_FAIL, newFailFunc, this);
        } else {
            let newFailFunc = () => {
                this.showLoginPanel();
            }
            cc.game.targetOff(YZ_Constant.ST_LOGIN_FAIL);
            cc.game.on(YZ_Constant.ST_LOGIN_FAIL, newFailFunc, this);
        }

        if (this.cur_tool && this.cur_tool.login) {
            this.cur_tool.login();
        } else {
            cc.game.targetOff(YZ_Constant.ST_LOGIN_SUCCESS);
            cc.game.targetOff(YZ_Constant.ST_LOGIN_FAIL);
            successCallFunc && successCallFunc();
        }
    }

    _yzLoginPanel: cc.Node = null;
    /**
     * 显示登录弹窗
     */
    public showLoginPanel() {
        if (this.config.otherconfig.yzLoginPanel) {
            let node: cc.Node = cc.instantiate(this.config.otherconfig.yzLoginPanel);
            if (node) {
                if (this._yzLoginPanel && cc.isValid(this._yzLoginPanel)) {
                    this._yzLoginPanel.destroy();
                }
                this._yzLoginPanel = node;
                cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
                return node;
            }
        } else {
            utils.showLog("warn:" + "未找到预制体 YzLoginPanel, 请查看CommonUtils组件上是否赋值！");
        }
    }


    /**
     * 生成UUID
     * @returns uuid
     */
    public generateUUID() {
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
    }
}

