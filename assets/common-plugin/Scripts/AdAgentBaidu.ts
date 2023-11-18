import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentBaidu extends AdAgent {

    _sysData: any = null;
    _baiduVersion: string = "";
    _recorder: any = null;
    _bannerAd: any = null;
    _videoAd: any = null;
    _videoCallback: Function = null;
    _isVideoShow: boolean = false;
    _isVideoLoaded: boolean = false;
    //@ts-ignore
    swan: any = window.swan;
    public Init() {
        if (PlatUtils.IsBaidu) {
            this._sysData = this.swan.getSystemInfoSync();

            utils.registerServerInitEvent(() => {
                this._initVideoAd();
            }, this)
        }
    }

    _bannerSizePercent: number = 0.1;
    _bannerBottom: number = 0;
    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        if (PlatUtils.IsBaidu) {
            if (utils.isShowRecommondGamesBanner() && utils.isSupportnavigateToMiniGame()) {
                utils.showRecommendGamesBanner();
                utils.showLog(`服务器配置展示自定义banner`);
                return;
            }
            utils.showLog("显示banner广告...");
            let argsTmp = args;
            if (argsTmp && argsTmp.width) {
                if (cc.winSize.height / cc.winSize.width < 1) {
                    this._bannerSizePercent = argsTmp.width;
                } else {
                    this._bannerSizePercent = ((argsTmp.width <= 0.8) ? 0.8 : argsTmp.width);
                }
                this._bannerSizePercent = ((argsTmp.width > 1) ? 1 : this._bannerSizePercent);
            }

            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                this._bannerBottom = ((this._bannerBottom < 0) ? 0 : this._bannerBottom);
                this._bannerBottom = ((this._bannerBottom > this._sysData.screenHeight) ? this._sysData.screenHeight : this._bannerBottom);
            }

            // banner 广告
            if (utils.config.baiduconfig
                && utils.config.baiduconfig.bannerId
                && utils.config.baiduconfig.appSID) {

                let left: number = (this._sysData.screenWidth - this._sysData.screenWidth * this._bannerSizePercent) / 2;
                let width: number = this._sysData.screenWidth * this._bannerSizePercent;
                let bannerOpts = {
                    adUnitId: utils.config.baiduconfig.bannerId,
                    appSid: utils.config.baiduconfig.appSID,
                    style: {
                        top: 0,
                        left: left,
                        width: width
                    }
                };
                let bannerAd: any = null;
                let oldBannerAd: any = this._bannerAd;

                let onLoadFunc = () => {
                    if (bannerAd) {
                        bannerAd.show().then(() => {
                            this._bannerAd = bannerAd;

                            if (oldBannerAd) {
                                oldBannerAd.destroy();
                                oldBannerAd.offLoad(onLoadFunc);
                                oldBannerAd.offError(onErrorFunc);
                            }

                            utils.showLog("Banner显示成功！");
                        }).catch(() => {
                            utils.showLog("Banner显示出错!");
                        });
                    }
                };
                let onErrorFunc = (err) => {
                    if (err) {
                        utils.showLog("Banner 广告出错 : ", err.errCode, err.errMsg);
                    }
                };

                let onResizeFunc = (res) => {
                    bannerAd.style.width = width;
                    bannerAd.style.top = this._sysData.screenHeight - res.height - this._bannerBottom;
                };

                bannerAd = this.swan.createBannerAd(bannerOpts);
                if (bannerAd) {
                    bannerAd.onLoad(onLoadFunc);
                    bannerAd.onError(onErrorFunc);
                    bannerAd.onResize(onResizeFunc);

                    bannerAd.style.width = width + 1;
                    if (PlatUtils.IsIOS) {
                        bannerAd.style.top = this._sysData.screenHeight;
                    }
                }
            } else {
                cc.warn("百度广告配置文件出错!");
            }
        }
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
        if (PlatUtils.IsBaidu) {
            if (this._bannerAd) {
                this._bannerAd.hide();
            }
        }
    }

    public ShowInterstitial(location: BannerLocation = BannerLocation.Home) {
        console.warn("百度没有插屏");
    }

    public ShowVideo(callback: Function) {
        if (PlatUtils.IsBaidu) {
            // 视频广告
            if (this._videoCallback) {
                return;
            } else {
                this._videoCallback = callback;
            }
            this._isVideoShow = true;

            if (!this._videoAd) {
                this._initVideoAd();
            } else {
                if (this._isVideoLoaded) {
                    this._videoAd.show().then(() => {
                        utils.showLog("视频显示成功!");
                        this._isVideoLoaded = false;
                    }).catch((err) => {
                    });
                } else {
                    this._videoAd.load().catch((err) => {
                    });
                }
            }

        }
    }

    _initVideoAd() {
        if (!this._videoAd) {
            if (!(utils.config.baiduconfig
                && utils.config.baiduconfig.appSID
                && utils.config.baiduconfig.videoId)) {
                utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }

            let videoOpts = {
                adUnitId: utils.config.baiduconfig.videoId,
                appSid: utils.config.baiduconfig.appSID
            };
            utils.showLog("视频广告参数:", JSON.stringify(videoOpts));

            this._videoAd = this.swan.createRewardedVideoAd(videoOpts);
            if (this._videoAd) {
                this._videoAd.onLoad(() => {
                    utils.showLog("视频加载成功");
                    this._isVideoLoaded = true;

                    if (this._isVideoShow) {
                        this._videoAd.show().then(() => {
                            this._isVideoLoaded = false;
                        }).catch(() => {
                            utils.showLog("视频播放失败！");
                        });
                    }
                });
                this._videoAd.onClose((res) => {
                    this._isVideoShow = false;
                    if (res && res.isEnded) {
                        utils.showLog("正常播放结束，可以下发游戏奖励");
                        if (this._videoCallback) {
                            this._videoCallback(true, "");
                            this._videoCallback = null;
                        }
                    } else {
                        utils.showLog("播放中途退出，不下发游戏奖励");
                        if (this._videoCallback) {
                            this._videoCallback(false, "观看完视频才能获得奖励!");
                            this._videoCallback = null;
                        }
                    }
                });
                this._videoAd.onError((err) => {
                    utils.showLog("激励视频异常!", err.errCode);
                    this._isVideoLoaded = false;
                    if (this._videoCallback) {
                        this._videoCallback(false, "暂无视频广告!");
                        this._videoCallback = null;
                    }
                });
            }
        }
    }
}
