import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlatUtils {

    /**
     * 原生安卓平台
     */
    public static get IsNativeAndroid() {
        // jsb and android
        return (cc.sys.os == cc.sys.OS_ANDROID && CC_JSB);
    }

    public static get IsNativeIOS() {
        return (cc.sys.os == cc.sys.OS_IOS && CC_JSB);
    }

    /**
     * uc平台
     */
    public static get ISUC() {
        //@ts-ignore
        return window.uc;
    }
    /**s
     * cocos平台
     */
    public static get ISCocos() {
        //@ts-ignore
        return (window.loadRuntime && !this.IsOPPO && !this.IsVIVO && !window.kwaigame && !this.IsWiFi && !this.IsHuaWei);
    }
    /**
     * 安卓系统
     */
    public static get IsAndroid() {
        return cc.sys.os == cc.sys.OS_ANDROID;
    }

    /**
     * IOS系统
     */
    public static get IsIOS() {
        return cc.sys.os == cc.sys.OS_IOS;
    }

    /**
     * 微信平台
     */
    public static get IsWechat() {
        return cc.sys.platform == cc.sys.WECHAT_GAME && !this.IsDouyin && !this.IsQQ && !this.IsKwai;
    }

    /**
     * OPPO快游戏
     */
    public static get IsOPPO() {
        return cc.sys.platform == cc.sys.OPPO_GAME;
    }

    /**
     * 百度小游戏
     */
    public static get IsBaidu() {
        // return cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform == cc.sys.BAIDU_GAME;
        cc.sys.FB_PLAYABLE_ADS
        return cc.sys.platform == cc.sys.BAIDU_GAME;
    }

    /**
     * VIVO小游戏
     */
    public static get IsVIVO() {
        return cc.sys.platform == cc.sys.VIVO_GAME;
    }

    /**
     * 抖音小游戏
     */
    public static get IsDouyin() {
        //@ts-ignorett
        return window.tt;
    }

    /**
     * QQ小游戏
     * @returns 是否QQ平台
     */
    public static get IsQQ(): boolean {
        //@ts-ignore
        return window.qq;
    }
    /**
     * 趣头条
     * @returns 是否趣头条平台
     */
    public static get IsQTT(): boolean {
        //@ts-ignore
        return window.qttGame;
    }

    /**
     * 小米
     * @returns 是否小米平台
     */
    public static get IsXiaoMi(): boolean {
        //@ts-ignore
        if (!PlatUtils.IsOPPO && !PlatUtils.IsVIVO && !PlatUtils.IsHuaWei && window.qg) {
            return true;
        } else {
            return false;
        }
    }

    /**
   * h5-4399
   * @returns 是否4399-h5平台
   */
    public static get Is4399(): boolean {
        //@ts-ignore
        return window.h5api;
    }

    /**
     * 是否bili平台
     * @returns 是否bili平台
     */
    public static get IsBili(): boolean {
        //@ts-ignore
        return window.bl;
    }

    /**
     * 是否快手平台
     * @returns 是否快手平台
     */
    public static get IsKwai(): boolean {
        //@ts-ignore
        return typeof KSGameGlobal != 'undefined';
    }


    /**
    * 是否连尚平台
    * @returns 是否连尚平台
    */
    public static get IsWiFi(): boolean {
        //@ts-ignore
        return window.wuji;
    }

    /**
    * 是否Hago平台
    * @returns 是否Hago平台
    */
    public static get IsHago(): boolean {
        //@ts-ignore
        return window.hg;
    }

    /**
     * 是否华为平台
     * @returns 是否华为平台
     */
    public static get IsHuaWei(): boolean {
        //@ts-ignore
        return window.hbs;
    }


    /**
    * 是否测试平台
    * @returns 是否测试平台
    */
    public static get IsTest(): boolean {
        //@ts-ignore
        return false;
    }

    /**
    * 是否facebook小游戏
    */
    public static get IsFaceBook(): boolean {
        //@ts-ignore
        return window.FB !== undefined || window.minigame_sdk !== undefined
    }

    /**
      * 获取安卓当前的渠道号
      */
    public static get androidChannel() {
        if (utils.config && utils.config.nativeAndroidConfig) {
            return utils.config.nativeAndroidConfig.channel;
        }
        return "";
    }

    /**
    * 是否安卓传音平台
    */
    public static get IsAndroidChuanYin(): boolean {
        if (this.androidChannel == "chuanyin") {
            return true;
        }
        return false;
    }

    /**
     * 是否安卓OPPO平台
     */
    public static get IsAndroidOppo(): boolean {
        if (this.androidChannel == "oppo") {
            return true;
        }
        return false;
    }

    /**
    * 是否安卓VIVO平台
    */
    public static get IsAndroidVivo(): boolean {
        if (this.androidChannel == "vivo") {
            return true;
        }
        return false;
    }

    /**
     * 是否安卓抖音平台
     */
    public static get IsAndroidDouYin(): boolean {
        if (this.androidChannel == "douyin") {
            return true;
        }
        return false;
    }

    /**
     * 是否安卓华为平台
     */
    public static get IsAndroidHuaWei(): boolean {
        if (this.androidChannel.indexOf("huawei") > -1) {
            return true;
        }
        return false;
    }

    /**
     * 是否谷歌Web游戏
     */
    public static get IsGoogleWeb(): boolean {
        //@ts-ignore
        if (window.googleApi) {
            return true;
        }
        return false;
    }


    // sh export_kwai.sh -z /Volumes/D/cocos_project/common-project/1.1.2/CommonProject-2.0.9/build/cocos-runtime -v 1.0.0 -l false -f default
}
