import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentWiFi extends AdAgent {

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
    wuji: any = window.wuji;
    public Init() {
        if (PlatUtils.IsWiFi) {
            utils.registerServerInitEvent(() => {
                this._sysData = utils.wifiTool.getSystemInfo();
            }, this);
        }
    }


    public get ServerConfig() {
        return utils.wifiTool.ServerConfig;
    }


    _initVideoAd() {
        if (!this._videoAd) {
            utils.showLog("初始化视频!");

            var example = {
                adUnitId: '', // 该字段必传，值可以先为空
            }
            this._videoAd = this.wuji.createRewardedVideoAd(example);

            this._videoAd.onLoad(() => {
                utils.showLog('激励视频加载完成');
                this._videoAd
                    .show()
                    .then(() => utils.showLog('激励视频展示成功'))
                    .catch(err => {
                        utils.showLog('激励视频展示失败', err);
                        // 可以手动加载一次
                        this._videoAd
                            .load()
                            .then(() => {
                                utils.showLog("手动加载成功");
                                // 加载成功后需要再显示广告
                                return this._videoAd.show();
                            });
                    });
            });

            this._videoAd.onError((err) => {
                utils.showLog('激励视频错误', err);
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            });

            this._videoAd.onClose((res) => {
                this._isVideoShow = false;
                if (res.isEnded) {
                    // 正常播放结束，可以下发游戏奖励
                    utils.showLog('激励视频广告完成，发放奖励');
                    if (this._videoCallback) {
                        this._videoCallback(true, "");
                        this._videoCallback = null;
                    }
                } else {
                    // 播放中途退出，不下发游戏奖励
                    utils.showLog('激励视频广告取消关闭，不发放奖励');
                    if (this._videoCallback) {
                        this._videoCallback(false, "观看完视频才能获得奖励!");
                        this._videoCallback = null;
                    }
                }
            });

        }
    }




    _createBanner(location: BannerLocation, args: any = null) {
        if (PlatUtils.IsWiFi) {

            var { windowWidth, windowHeight } = this._sysData;
            var targetBannerAdWidth = windowWidth - 20;
            var example = {
                adUnitId: '',  // 该字段必传，但是值可以先为空
                style: {
                    top: windowHeight, // 置于屏幕底部
                    left: (windowWidth - targetBannerAdWidth) / 2, // 居中
                    width: targetBannerAdWidth,
                    //height: 200, // 宽高比是固定的，height值可不传
                }
            }
            this._curBannerAd = this.wuji.createBannerAd(example);
            this._curBannerAd.onLoad(() => {
                this._curBannerAd.show()
                    .then(() => utils.showLog('banner ad 展示成功'))
                    .catch(err => utils.showLog(err));
            })
        }
    }

    _showBannerTimer(location: BannerLocation, args: any) {
        let locationTmp: BannerLocation = location;
        let argsTmp: any = args;
        this._createBanner(locationTmp, argsTmp)
    }

    ShowInterstitial() {
        utils.showLog("连尚小游戏没有插屏广告！");
    }

    _bannerShow: boolean = true;
    _showBannerTimerId: number = 0;
    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        if (PlatUtils.IsWiFi) {
            if (this.ServerConfig) {
                let locationTmp: BannerLocation = location;
                let argsTmp: any = args;

                let interval: number = 30;
                if (this.ServerConfig.refresh_ad_time) {
                    interval = this.ServerConfig.refresh_ad_time;
                }

                utils.showLog(`显示Banner广告！location:${locationTmp}; args:${JSON.stringify(argsTmp)}; 间隔时间:${this.ServerConfig.refresh_ad_time}`);

                var { windowWidth, windowHeight } = this._sysData;
                var targetBannerAdWidth = windowWidth - 20;
                var example = {
                    adUnitId: '',  // 该字段必传，但是值可以先为空
                    adIntervals: interval,
                    style: {
                        top: windowHeight, // 置于屏幕底部
                        left: (windowWidth - targetBannerAdWidth) / 2, // 居中
                        width: targetBannerAdWidth,
                        //height: 200, // 宽高比是固定的，height值可不传
                    }
                }
                if (this._curBannerAd) {
                    this._curBannerAd.offLoad();
                    this._curBannerAd.destroy();
                }

                this._curBannerAd = this.wuji.createBannerAd(example);
                this._curBannerAd.onLoad(() => {
                    this._curBannerAd.show()
                        .then(() => utils.showLog('banner ad 展示成功'))
                        .catch(err => utils.showLog(err));
                })





            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        if (PlatUtils.IsWiFi) {
            utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            if (this._curBannerAd) {
                this._curBannerAd.hide();
            }
        }
    }


    public ShowVideo(callback: Function) {
        if (PlatUtils.IsWiFi) {
            this._videoCallback = callback;
            this._isVideoShow = true;

            if (!this._videoAd) {
                this._initVideoAd();
            } else {
                this._videoAd.load();
            }
        }
    }
}
