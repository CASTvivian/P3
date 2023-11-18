import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentKwai extends AdAgent {

    _sysData: any = null;
    _bannerAd: any = null;
    _videoAd: any = null;
    _videoCallback: Function = null;
    _isVideoShow: boolean = false;
    _isVideoLoaded: boolean = false;
    //@ts-ignore
    kwaigame: any = window.kwaigame;
    canShowVideo: boolean = false;
    public Init() {
        if (PlatUtils.IsKwai) {
            // this.kwaigame.getSystemInfo({
            //     response: (result) => {
            //         this._sysData = result;
            //         utils.showLog("快手>>>获取系统信息:" + JSON.stringify(result));
            //     }
            // });
            // utils.showLog(this.kwaigame.isSupport({ feature: this.kwaigame.Support.features.RewardVideo }) + "<<<<<");
            // this.canShowVideo = this.kwaigame.isSupport({ feature: this.kwaigame.Support.features.RewardVideo });
            // utils.showLog(`当前平台：${this.canShowVideo == true ? "支持" : "不支持"}视频广告！`);
            // if (this.canShowVideo) {
            utils.registerServerInitEvent(() => {
                this._initVideoAd();
            }, this)
            // }
        }
    }


    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        utils.showLog("快手平台没有banner广告！");
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

    public HideBanner(location: BannerLocation = BannerLocation.Home) {

    }


    _interstitialAd: any = null;
    public ShowInterstitial(location: BannerLocation = BannerLocation.Home) {
        utils.showLog("显示快手插屏");
        if (utils.config.kwaiConfig.insertId) {
            if (!this._interstitialAd) {
                this._interstitialAd = this.kwaigame.createInterstitialAd({ adUnitId: utils.config.kwaiConfig.insertId })

                this._interstitialAd.onError(err => {
                    utils.showLog("插屏广告显示异常：" + JSON.stringify(err));
                })

                this._interstitialAd.onClose(res => {
                    utils.showLog("用户点击了【关闭广告】按钮");
                })
            }
            this._interstitialAd && this._interstitialAd.show()
                .then(() => utils.showLog('插屏 广告显示成功！')).catch((err) => {
                    utils.showLog("插屏 广告显示失败 >>" + JSON.stringify(err));
                })

        } else {
            utils.showLog("未配置插屏广告ID");
        }

    }

    public ShowVideo(callback: Function) {
        if (PlatUtils.IsKwai) {
            // 视频广告
            if (this._videoCallback) {
                return;
            } else {
                this._videoCallback = callback;
            }
            this._isVideoShow = true;

            if (!this._videoAd) {
                this._initVideoAd();
                if (this._videoCallback) {
                    this._videoCallback(false, "激励视频加载失败!");
                    this._videoCallback = null;
                }
            } else {

                this._videoAd.show({
                    success: () => {
                        utils.showLog("激励视频播放成功");
                    },
                    fail: (error) => {
                        utils.showLog("激励视频播放失败: " + JSON.stringify(error));
                        if (this._videoCallback) {
                            this._videoCallback(false, "激励视频加载失败!");
                            this._videoCallback = null;
                        }
                    }
                })

            }

        }
    }

    _initVideoAd() {
        if (!this._videoAd) {
            let param: any = {};
            param.adUnitId = utils.config.kwaiConfig.videoId;
            this._videoAd = this.kwaigame.createRewardedVideoAd(param);
            if (this._videoAd) {
                utils.showLog("激励广告组件获取成功!");
                this._videoAd.onClose((result) => {
                    utils.showLog("激励视频关闭回调: " + JSON.stringify(result));
                    if (this._videoCallback) {
                        this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                        this._videoCallback = null;
                    }
                });
                this._videoAd.onReward((result) => {
                    utils.showLog("激励视频奖励回调: " + JSON.stringify(result));
                    if (this._videoCallback) {
                        this._videoCallback(true, "");
                        this._videoCallback = null;
                    }

                });
            } else {
                utils.showLog("激励广告组件获取失败");
            }

        }
    }
}
