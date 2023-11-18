import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
// const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentHago extends AdAgent {

    _sysData: any = null;
    _bannerAd: any = null;
    _videoAd: any = null;
    _videoCallback: Function = null;
    _isVideoShow: boolean = false;
    _isVideoLoaded: boolean = false;
    //@ts-ignore
    hg: any = window.hg;
    canShowVideo: boolean = false;
    public Init() {
        if (PlatUtils.IsHago) {
            this.initVideoAd();
            utils.showLog("hago 平台广告初始化成功！");
        }
    }


    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        utils.showLog("Hago平台没有banner广告！");
    }

    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type 
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    showStatementAds(): any {
        let result: any = { "type": 0, "node": null };
        let node: cc.Node = null;
        let resType: number = 0;

        utils.showLog("结算广告 >> 显示插屏广告+6个互推");
        this.ShowInterstitial();
        node = utils.showCrossWidget6();
        resType = 1;
        result.type = resType;
        result.node = node;
        return result;
    }

    initVideoAd() {

        this._videoAd = this.hg.createRewardedVideoAd({
            adUnitId: parseInt(utils.config.hagoConfig.videoId) //测试使用9999，上线前必须申请独立的，否则无法分成!   注意：要下载最新的app测试版本9999才能生效。
        });


        this._videoAd.onClose = (res) => {
            if (res.isEnded) {
                this._videoCallback(true);
                this._videoCallback = null;
            } else {
                if (this._videoCallback) {
                    this._videoCallback(false, i18n.t('ad.video_not_played_complete'));
                    this._videoCallback = null;
                }
            }
        }

        //中途关闭广告或者拉去广告失败。
        this._videoAd.onError = () => {
            if (this._videoCallback) {
                this._videoCallback(false, i18n.t('ad.video_load_fail'));
                this._videoCallback = null;
            }
        }

    }

    public HideBanner(location: BannerLocation = BannerLocation.Home) {

    }

    public ShowInterstitial(location: BannerLocation = BannerLocation.Home) {
        console.warn("Hago没有插屏");
    }

    public ShowVideo(callback: Function) {
        if (PlatUtils.IsHago) {
            // 视频广告
            if (this._videoCallback) {
                return;
            }
            this._videoCallback = callback;
            if (!this._videoAd) {
                this.initVideoAd();
            }
            this._videoAd.show().then(() => {
                utils.showLog("video show success");
            })
        }
    }
}
