import AdAgent from "./AdAgent";
import { BannerLocation, LevelStatus, BeForGameOverAdId } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentDouyin extends AdAgent {

    _bannerAd: any = null;
    _videoAd: any = null;
    _sysData: any = null;

    _bannerAds: any[] = [];
    _isBannerShow: boolean = false;

    public get ServerConfig() {
        return utils.Tool_Douyin.ServerConfig;
    }

    //@ts-ignore
    tt: any = window.tt;
    public Init() {
        if (PlatUtils.IsDouyin) {
            //@ts-ignore

            this._sysData = utils.Tool_Douyin._sysInfo;
            // utils.registerServerInitEvent(() => {
            //     // this._initVideoAd();

            // }, this)
        }
    }

    _bannerBottom: number = 0;
    public ShowBanner(location: BannerLocation, args: any = null) {
        if (PlatUtils.IsDouyin) {

            if (utils.isShowRecommondGamesBanner() && utils.Tool_Douyin.isShowMoreGamesModal()) {
                utils.showRecommendGamesBanner();
                utils.showLog(`服务器配置展示自定义banner`);
                return;
            }
            if (utils.Tool_Douyin.isNewsArticleLite) {
                utils.showLog("头条极速版不显示Banner广告");
                return;
            }
            if (this._isConfigValid()) {

                let argsTmp = args;
                let bannerSizePercent: number = 1;
                if (argsTmp && argsTmp.width) {
                    bannerSizePercent = ((argsTmp.width < 0) ? 0.1 : argsTmp.width);
                    bannerSizePercent = ((argsTmp.width > 1) ? 1 : bannerSizePercent);
                }

                if (argsTmp && argsTmp.bottom) {
                    this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                    this._bannerBottom = ((this._bannerBottom < 0) ? 0 : this._bannerBottom);
                    this._bannerBottom = ((this._bannerBottom > this._sysData.screenHeight) ? this._sysData.screenHeight : this._bannerBottom);
                }

                let targetBannerAdWidth = 60;
                let left: number = (this._sysData.screenWidth - targetBannerAdWidth) * 0.5;
                let top: number = this._sysData.screenHeight - (targetBannerAdWidth / 16 * 9 - this._bannerBottom);

                // 创建一个居于屏幕底部正中的广告
                let bannerId: string = utils.config.douyinconfig.bannerId;
                utils.showLog("显示Banner广告: bannerId=" + bannerId + " #targetBannerAdWidth=", targetBannerAdWidth);
                //@ts-ignore
                try {
                    let bannerAd = this.tt.createBannerAd({
                        adUnitId: bannerId,
                        style: {
                            width: targetBannerAdWidth,
                            left: left,
                            top: top
                        }
                    });

                    if (bannerAd) {
                        let self = this;
                        bannerAd.onLoad(function () {
                            bannerAd.show().then(() => {
                                utils.showLog('广告显示成功');
                                for (let i = 0; i < self._bannerAds.length; i++) {
                                    if (self._bannerAds[i] != bannerAd && self._bannerAds[i] != null) {
                                        self._bannerAds[i].destroy();
                                    }
                                }
                                self._bannerAds.length = 0;
                                self._bannerAds.push(bannerAd);
                            }).catch(err => {
                                utils.showLog(`广告组件出现问题  ${err.errCode, err.errMsg}`);
                            });
                        });

                        bannerAd.onError((err) => {
                            if (err) {
                                utils.showLog(`Banner 广告出错: errCode:  ${err.errCode} errMsg:${err.errMsg}`);
                            }
                        });

                        bannerAd.onResize((res) => {
                            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
                            bannerAd.style.top = this._sysData.screenHeight - res.height - this._bannerBottom;

                            if (res.width > 0) {
                                bannerAd.style.left = (this._sysData.screenWidth - res.width) * 0.5;
                            } else {
                                bannerAd.style.left = (this._sysData.screenWidth - targetBannerAdWidth) / 2;
                            }

                        });

                        this._bannerAds.push(bannerAd);
                    }

                } catch (error) {

                }


            } else {
                utils.showLog("抖音小游戏配置文件出错!");
            }
        }
    }
    public HideBanner(location: BannerLocation) {
        if (PlatUtils.IsDouyin) {
            for (let i = 0; i < this._bannerAds.length; i++) {
                if (this._bannerAds[i] != null) {
                    this._bannerAds[i].destroy();
                }
            }
            this._bannerAds.length = 0;
        }
    }


    private checkCanShowInterstitial() {
        if (this.tt.createInterstitialAd) {
            return true;
        }
        return false;
    }


    _lastShowInterstitialTime: number = 0
    public ShowInterstitial(location: BannerLocation) {
        if (PlatUtils.IsDouyin) {
            if (this.checkCanShowInterstitial()) {
                let curTime: number = new Date().getTime();
                let interval: number = (curTime - this._lastShowInterstitialTime) / 1000;
                if (interval < 30) {
                    utils.showLog("距离插屏广告或者激励视频广告上次播放时间间隔不足30秒");
                    return;
                }
                this._lastShowInterstitialTime = curTime;
                utils.delayCall(this._createMiniGameInsertAd.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
            } else {
                utils.showLog("当前客户端版本不支持插屏！");
            }
        }
    }

    private interstitialAd = null;
    public _createMiniGameInsertAd() {
        try {
            if (!utils.config.douyinconfig.insertId) {
                utils.showLog("插屏ID配置有误");
                return;
            }
            if (this.interstitialAd) {
                this.interstitialAd.destroy();
                this.interstitialAd = null;
            }

            this.interstitialAd = this.tt.createInterstitialAd({
                adUnitId: utils.config.douyinconfig.insertId
            });
            this.interstitialAd.load().then(() => {
                this.interstitialAd.show();
            }).catch(err => {
                utils.showLog(err);
                utils.showLog("err.errCode:" + err.errCode);

                switch (err.errCode) {
                    case 2001:
                        utils.showLog("小程序启动一定时间内不允许展示插屏广告")
                        break;
                    case 2002:
                        utils.showLog("距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告")
                        break;
                    case 2003:
                        utils.showLog("当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告")
                        break;
                    case 2004:
                        utils.showLog("该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败")
                        break;
                    case 2005:
                        utils.showLog("插屏广告实例不允许跨页面调用")
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        utils.showLog("插屏广告展示失败")
                        break;
                }

            });
        } catch (error) {
            utils.showLog(error);
        }


    }
    _videoCallback: Function = null;
    _isVideoLoaded: boolean = false;
    _isVideoShow: boolean = false;
    public ShowVideo(callback: Function) {

        if (PlatUtils.IsDouyin) {
            this._videoCallback = callback;
            this._isVideoShow = true;

            if (utils.Tool_Douyin.ServerConfig) {
                let posId: string = utils.config.douyinconfig.videoId.trim();
                utils.showLog("video广告ID:" + posId);
                if (!this._videoAd) {
                    //@ts-ignore
                    this._videoAd = tt.createRewardedVideoAd({
                        adUnitId: posId
                    });
                    if (this._videoAd) {
                        utils.showLog("初始化注册视频回调!");
                        // this._videoAd.onLoad(() => {
                        //     utils.showLog("激励视频加载成功", this._isVideoShow);
                        //     // this._isVideoLoaded = true;
                        //     // if (this._isVideoShow) {

                        //     //     this._isVideoShow = false;
                        //     // }
                        // })

                        this._videoAd.onError((err) => {
                            utils.showLog(`激励视频出错: ${err.code, err.msg}`);
                            this._isVideoLoaded = false;
                            if (this._videoCallback) {
                                this._videoCallback(false, "暂无视频广告!");
                                this._videoCallback = null;
                            }
                        });

                        this._videoAd.onClose((res) => {
                            this._isVideoShow = false;
                            this._isVideoLoaded = false;
                            if (res.isEnded) {
                                utils.showLog('激励视频广告完成，发放奖励');
                                if (this._videoCallback) {
                                    this._videoCallback(true, "");
                                    this._videoCallback = null;
                                }
                            } else {
                                utils.showLog('激励视频广告取消关闭，不发放奖励');
                                if (this._videoCallback) {
                                    this._videoCallback(false, "观看完视频才能获得奖励!");
                                    this._videoCallback = null;
                                }
                            }
                        });
                    } else {
                        utils.showLog("videoAd 对象创建失败，播放失败!");
                        if (this._videoCallback) {
                            this._videoCallback(false, "暂无视频广告!");
                            this._videoCallback = null;
                        }
                    }
                }
                // else {

                // if (this._isVideoLoaded) {
                //     this._videoAd.show().then(() => {
                //         utils.showLog("激励视频播放成功!");
                //     }).catch((ero) => {
                //         utils.showLog("激励视频播放失败! >>>>" + ero);
                //         if (this._videoCallback) {
                //             this._videoCallback(false, "视频播放失败,请稍后再试!");
                //             this._videoCallback = null;
                //         }
                //     });
                //     this._isVideoShow = false;
                // } else {
                this._videoAd.load().then(() => {
                    utils.showLog("激励视频加载成功");
                    this._videoAd.show().then(() => {
                        utils.showLog("激励视频播放成功!");
                        this._lastShowInterstitialTime = new Date().getTime();
                    }).catch(() => {
                        utils.showLog("激励视频播放失败!");
                        if (this._videoCallback) {
                            this._videoCallback(false, "视频播放失败,请稍后再试!");
                            this._videoCallback = null;
                        }
                    });
                }).catch(() => {
                    utils.showLog("再次播放视频资源加载失败!");
                    if (this._videoCallback) {
                        this._videoCallback(false, "视频播放失败,请稍后再试!");
                        this._videoCallback = null;
                    }
                });
            }

            // }
        } else {
            utils.showLog("获取配置失败，视频无法播放!");
            if (this._videoCallback) {
                this._videoCallback(false, "暂无视频广告!");
                this._videoCallback = null;
            }
        }
        // }
    }

    _initVideoAd() {
        if (!this._videoAd) {
            if (utils.Tool_Douyin.ServerConfig) {
                let posId: string = utils.config.douyinconfig.videoId.trim();
                utils.showLog("video广告ID:" + posId);
                //@ts-ignore
                this._videoAd = tt.createRewardedVideoAd({
                    adUnitId: posId
                });

                if (this._videoAd) {
                    utils.showLog("初始化注册视频回调!");
                    this._videoAd.onLoad(() => {
                        utils.showLog("激励视频加载成功", this._isVideoShow);
                        this._isVideoLoaded = true;
                        if (this._isVideoShow) {
                            this._videoAd.show().then(() => {
                                utils.showLog("激励视频播放成功!");
                            }).catch(() => {
                                utils.showLog("激励视频播放失败!");
                                if (this._videoCallback) {
                                    this._videoCallback(false, "视频播放失败,请稍后再试!");
                                    this._videoCallback = null;
                                }
                            });
                            this._isVideoShow = false;
                        }
                    })

                    this._videoAd.onError((err) => {
                        utils.showLog(`激励视频出错: ${err.code, err.msg}`, err);
                        this._isVideoLoaded = false;
                        if (this._videoCallback) {
                            this._videoCallback(false, "暂无视频广告!");
                            this._videoCallback = null;
                        }
                    });

                    this._videoAd.onClose((res) => {
                        this._isVideoShow = false;
                        this._isVideoLoaded = false;
                        if (res.isEnded) {
                            utils.showLog('激励视频广告完成，发放奖励');
                            if (this._videoCallback) {
                                this._videoCallback(true, "");
                                this._videoCallback = null;
                            }
                        } else {
                            utils.showLog('激励视频广告取消关闭，不发放奖励');
                            if (this._videoCallback) {
                                this._videoCallback(false, "观看完视频才能获得奖励!");
                                this._videoCallback = null;
                            }
                        }

                        this._videoAd.load().then(() => {
                            utils.showLog("关闭视频后重新加载视频资源成功！");
                            this._isVideoShow = false;
                            this._isVideoLoaded = true;
                        });
                    });
                } else {
                    utils.showLog("暂无视频广告!");
                    if (this._videoCallback) {
                        this._videoCallback(false, "暂无视频广告!");
                        this._videoCallback = null;
                    }
                }
            } else {
                utils.showLog("暂无视频广告!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            }
        }
    }

    _isConfigValid() {
        if (PlatUtils.IsDouyin) {
            return (utils.config.douyinconfig
                && utils.config.douyinconfig.appID
                && utils.config.douyinconfig.bannerId
                && utils.config.douyinconfig.videoId);
        }
        return false;
    }

    public ShowCloseBtnBanner(location: BannerLocation = BannerLocation.Home, args: any) {
        utils.showLog("ShowCloseBtnBanner >>>>>>>>>.");

        let isMoveBtn = 0;
        let fadeInTime = 0;
        let btn: cc.Node = args.closeBtn;
        let winHeight = cc.winSize.height;

        btn.opacity = 0;
        if (this.ServerConfig) {


            if (this.ServerConfig.show_close_btn_delay) {
                fadeInTime = this.ServerConfig.show_close_btn_delay;
            }

            // setTimeout(() => {

            //     utils.showLog("延迟调用关闭按钮的Banner >>>>");
            //     this.ShowBanner(location, args);

            //     var adY = 200;
            //     utils.showLog('utils - adY:' + adY);
            //     if (adY > 0 && btn) {
            //         btn.y = -(winHeight / 2 - adY) + btn.height;
            //         utils.showLog("btnClose.y" + btn.y);
            //     }
            // }, isMoveBtn);

            setTimeout(() => {
                btn.runAction(cc.fadeIn(0.3));
            }, fadeInTime * 1000);
        }

    }


}
