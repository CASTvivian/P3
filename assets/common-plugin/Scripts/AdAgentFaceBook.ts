import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import FBAdManager from "./FaceBookSdk/FBAdManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentFaceBook extends AdAgent {

    _sysData: any = null;
    _curBannerAd: any = null;
    _videoAd: any = null;
    _insertAd: any = null;
    _oldAd: any = null;
    _appBox: any = null; //游戏盒子广告

    _videoCallback: Function = null;
    _isVideoLoaded: boolean = false;
    _isVideoShow: boolean = false;
    //@ts-ignore
    qq: any = window.qq;
    public Init() {
        if (PlatUtils.IsFaceBook) {
            utils.registerServerInitEvent(() => {
                this._initAd();
            }, this);
        }
    }


    public get ServerConfig() {
        return utils.Tool_Facebook.ServerConfig;
    }


    _initAd() {
        utils.showLog("facebook init ad>>>>>>>>")
        FBAdManager.addInterstitial(utils.config.faceBookConfig.insertId, 3);
        FBAdManager.addRewardedVideo(utils.config.faceBookConfig.videoId, 3);
        FBAdManager.addBanner(utils.config.faceBookConfig.bannerId);
        setTimeout(() => {
            FBAdManager.loadAll();
        }, 3000);
    }

    _bannerShow: boolean = false;
    _bannerSizePercent: number = 0.5;
    _bannerBottom: number = 0;
    _oldBannerLocation: BannerLocation = BannerLocation.None;

    _curBannerHeight: number = 240;

    _moveBtn: cc.Node = null;
    _cur_level: any = null;
    _createBanner(location: BannerLocation, args: any = null) {
        if (PlatUtils.IsFaceBook) {
            FBAdManager.showBannerAsync().then(() => {
                utils.showLog("显示Banner广告: 成功");
            }).catch(e => {
                utils.showLog("显示Banner广告: 失败，原因: " + e.message);
            });
        }
    }

    _showBannerTimer(location: BannerLocation, args: any) {
        let locationTmp: BannerLocation = location;
        let argsTmp: any = args;
        utils.showLog(`显示Banner广告xxx！location:${locationTmp}; 间隔时间:${utils.Tool_Facebook.ServerConfig.refresh_ad_time}:优先级：${this.ServerConfig.banner_first_ad}`);

        this._createBanner(locationTmp, argsTmp)

    }





    _showBannerTimerId: number = 0;
    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        if (PlatUtils.IsFaceBook) {

            if (utils.ServerConfig) {
                let locationTmp: BannerLocation = location;
                let argsTmp: any = args;
                this._moveBtn = args ? args.moveBtn : null;
                this._cur_level = args ? args.cur_level : null;
                this._showBannerTimer(locationTmp, argsTmp);
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        if (PlatUtils.IsFaceBook) {
            utils.showLog("隐藏广告条");


            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            FBAdManager.hideBannerAsync().then(() => {
                utils.showLog("隐藏Banner广告: 成功");
            }).catch(e => {
                utils.showLog("隐藏Banner广告: 失败，原因: " + e.message);
            });
        }
    }


    public ShowVideo(callback: Function) {
        if (PlatUtils.IsFaceBook) {
            this._videoCallback = callback;
            if (FBAdManager.isRewardedVideoReady()) {
                FBAdManager.showRewardedVideo().then(() => {
                    utils.showLog("播放激励视频广告: 成功");
                    if (this._videoCallback) {
                        this._videoCallback(true, "");
                        this._videoCallback = null;
                    }
                }).catch(e => {
                    utils.showLog("视频播放失败：" + e.message);
                    if (this._videoCallback) {
                        this._videoCallback(false, "Ad playback failed!");
                        this._videoCallback = null;
                    }
                });
            } else {
                utils.showLog("激励视频广告未加载！");
                if (this._videoCallback) {
                    this._videoCallback(false, "Video ad not loaded successfully！");
                    this._videoCallback = null;
                }
            }

        }
    }


    /**
     * 显示插屏
     * 2001	触发频率限制	小程序启动一定时间内不允许展示插屏广告
     * 2002	触发频率限制	距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告
     * 2003	触发频率限制	当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告
     * 2004	广告渲染失败	该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败
     * 2005	广告调用异常	插屏广告实例不允许跨页面调用
     * 销毁插屏广告后才能重新创建
     * @param location 
     */
    public ShowInterstitial(location: BannerLocation = null) {
        if (PlatUtils.IsFaceBook) {
            if (this.ServerConfig) {
                utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
            }else{
                this._createInsterstitial.bind(this)
            }
        }
    }


    _isShow: boolean = false;
    public _createInsterstitial() {
        if (FBAdManager.isInterstitialAdReady()) {
            FBAdManager.showInterstitialAd().then(() => {
                utils.showLog("播放插屏广告: 成功");
            }).catch(e => {
                utils.showLog("播放插屏广告: 失败，原因: " + e.message);
            });
        } else {
            utils.showLog("插屏广告没有加载成功！")
        }
    }

}
