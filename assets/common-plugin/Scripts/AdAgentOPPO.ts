import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import RewardInsert from "./RewardInsert";
import YZ_StatementRecommentAd from "./YZ_StatementRecommentAd";
import YZ_NativeAdObject from "./YZ_NativeAdObject";
import YZ_NativeItem from "./YZ_NativeItem";
import NativeTryGamesWidget from "./NativeTryGamesWidget";
import YZ_NativeBanner from "./YZ_NativeBanner";
import { BannerIdInfo, NativeBannerInfo } from "./CommonConfig";
import CompatibleTool from "./CompatibleTool";
import YouWanAnalytics from "./YouWanSDK/YouWanAnalytics";
import { AdEventParameter, YwAdStatus, YwAdType } from "./YouWanSDK/EventAdInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentOPPO extends AdAgent {

    _bannerAd: any = null;
    _insertAd: any = null;
    _videoAd: any = null;
    _nativeBannerAd: any[] = [];
    _nativeInsertAd: any[] = [];
    _nativeSingleAd: any[] = [];
    _nativeAd: any = null;

    // 广告组件是否初始化成功
    _isAdInit: boolean = false;

    _isBannerShow: boolean = false;
    _isInsertShow: boolean = false;

    // 当前位置id的索引
    _curPosIdIndexNativeBanner: number = 0;
    _curPosIdIndexNativeInser: number = 0;
    _curPosIdIndexSingleNative: number = 0;

    _nativeData: any = null;
    _nativeInsertData: any = null;
    _nativeBannerNode: cc.Node = null;
    _nativeInsertNode: cc.Node = null;

    _videoCallback: Function = null;
    _videoLoaded: boolean = null;

    _miniBannerHeight: number = 0;

    _showBannerCallBack: Function = null;

    _nativeAdObject: YZ_NativeAdObject = null;

    //插屏显示次数
    _insertShowCount: number = 0;

    _insertLastShowTime: number = 0;

    _curNativeItem: YZ_NativeItem = null;

    _isNativeBannerShow: boolean = false; //原生广告展示，调用的隐藏

    lastLastShowVideoTime: number = 0; //最后一次显示视频时间



    _bannerHideCount: number = 0;

    canShowNativeBanner = true; //原生banner是否展示

    public get ServerConfig() {
        if (utils.oppoTool && utils.oppoTool.ServerConfig) return utils.oppoTool.ServerConfig;
        return {};
    }

    _nativeBannerInfo: NativeBannerInfo = null;

    show_ad_by_config: boolean = true;
    /**
     * 获取当前banner配置
     */
    getNativeBannerInfo() {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return utils.config.oppoconfig.getNativeBannerInfo(this._curLocation);
    }

    public Init() {
        if (PlatUtils.IsOPPO && utils.oppoTool && utils.oppoTool.isOverMiniVersion("1031")) {

            utils.registerServerInitEvent(() => {
                utils.showLog("OPPO 广告代理组件初始化!");
                let self = this;


                //@ts-ignore
                qg.initAdService({
                    appId: utils.config.oppoconfig.appID,
                    isDebug: true,
                    success: function (res) {
                        utils.showLog("OPPO 小游戏广告组件初始化成功!");
                        self._isAdInit = true;
                        self._initVideoAd();
                    },
                    fail: function (res) {
                        utils.showLog("OPPO 小游戏广告组件初始化失败 :" + res.code + res.msg);
                    },
                    complete: function (res) {
                    }
                });
            }, this)

        }
    }





    _nativeIsClose: boolean = false;

    _showBannerTimerId: number = 0;
    _delayShowBannerId: number = 0;


    // nbclr:是否开启强制刷新

    //当前显示Banner的位置
    _curLocation: BannerLocation = BannerLocation.None;
    _isTimeRefresh: boolean = false;
    //启动定时器的时间
    _startBannerTimerTask: number = 0;
    _showBannerCount: number = 0;
    public ShowBanner(location: BannerLocation = null, args: any = null, isTimeRefresh: boolean = false) {
        if (PlatUtils.IsOPPO) {
            if (!this.ServerConfig) {
                utils.showLog("未请求到配置文件！");
                return;
            }
            this._showBannerCount++;


            let oldLocation = this._curLocation;

            this._curLocation = location;

            this._isTimeRefresh = isTimeRefresh;
            //如果跳用位置切换之后，验证是不是通过定时器强制刷新数据，不是则先隐藏banner
            if (oldLocation != location) {
                this.HideBanner(location);
            }




            let curTime: number = new Date().getTime();
            let refresh_ad_time: number = (curTime - this._startBannerTimerTask) / 1000;

            let interval = this.ServerConfig.refresh_ad_time;
            // utils.showLog("isTimeRefresh=" + isTimeRefresh);
            if (args && args.isRefresh) {
                isTimeRefresh = true;
            } else if (interval && interval > 0) {
                if (refresh_ad_time > interval) {
                    isTimeRefresh = true;
                }
            }

            YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST);
            // utils.showLog("isTimeRefresh=" + isTimeRefresh);

            // 判断当前位置是不是显示banner
            if (this.getNativeBannerInfo().is_show_banner == -1) {
                utils.showLog("当前位置配置为不展示banner!");
                this.HideBanner(location);
                return;
            } else if (this.getNativeBannerInfo().is_show_rec > -1) {
                this.HideBanner(location);
                utils.showLog("当前位置显示互推banner");
                if (utils.oppoTool.canShowRecommend()) {
                    utils.oppoTool.showOppoRecBanner();
                    return;
                }
                utils.showLog("当前平台不支持互推banner");
            } else {
                if (!isTimeRefresh && !this.show_ad_by_config) {
                    if (this.ServerConfig.nbclr && this.ServerConfig.nbclr == "true" && this._curNativeBannerInfo.nativeBannerAd) {
                        utils.showLog("服务器配置定时器刷新数据 ");

                        utils.showLog(`原生banner延迟显示${this.getNativeBannerInfo().delay_show_time}秒`);

                        clearTimeout(this._showBannerTimerId);
                        clearTimeout(this._delayShowBannerId);

                        //@ts-ignore
                        this._delayShowBannerId = setTimeout(() => {
                            this._showNativeBanner(this._curNativeBannerInfo.nativeBannerAd, this._curNativeBannerInfo.data);
                        }, this.getNativeBannerInfo().delay_show_time * 1000);
                        utils.showLog("开启定时刷新 >>>>>>>>>" + (interval - refresh_ad_time));
                        //@ts-ignore
                        this._showBannerTimerId = setTimeout(() => {
                            utils.showLog(`定时${interval}秒调用showbanner`);
                            this.ShowBanner(this._curLocation, {}, true);
                        }, (interval - refresh_ad_time) * 1000);
                        return;
                    }
                }
            }



            this.canShowNativeBanner = true;
            this._nativeIsClose = false;



            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            utils.showLog("清理定时器");
            if (this.ServerConfig) {
                if (interval && interval > 0) {
                    utils.showLog("开启定时刷新 >>>>>>>>>" + interval);


                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(() => {
                        utils.showLog(`定时${interval}秒调用showbanner`);
                        this.ShowBanner(this._curLocation, {}, true);
                    }, interval * 1000);
                }

                if (this.show_ad_by_config) {
                    this.ShowBannerByConfigs(0);
                    return;
                }

                if (this.ServerConfig.banner_first_ad) {
                    if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                        utils.showLog("优先展示原生Banner广告!" + isTimeRefresh + " <<<<");
                        if (!this._isTimeRefresh) {

                            utils.showLog(`原生banner延迟显示${this.getNativeBannerInfo().delay_show_time}秒`);
                            //@ts-ignore
                            this._delayShowBannerId = setTimeout(() => {
                                this._createNativeBannerAd(this._showNativeBanner);
                            }, this.getNativeBannerInfo().delay_show_time * 1000);
                        } else {
                            this._createNativeBannerAd(this._showNativeBanner);
                        }

                    } else {
                        utils.showLog("优先展示小游戏Banner广告!");
                        this._createMiniGameBannerAd(location);
                    }
                } else {
                    utils.showLog("配置数据中没有 banner_first_ad 字段， banner广告不显示!");
                }
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    private hideMiniGameBanner() {
        if (this._bannerAd) {
            if (utils.oppoTool.isOverMiniVersion("1050")) {
                utils.showLog("销毁小游戏Banner");
                this._bannerAd.destroy();
                this._bannerAd = null;
            } else {
                utils.showLog("当前小游戏平台小于1051，只能隐藏小游戏Banner");
                this._bannerAd.hide();
            }
        }
    }

    private hideNativeBanner() {
        if (this._nativeBannerNode) {
            utils.showLog("隐藏原生Banner");
            this._nativeBannerNode.active = false;
        }
    }

    private hideBanner(type: string) {
        switch (type) {
            case "default":
                this.hideNativeBanner();
                //隐藏自定义banner
                utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                //隐藏互推banner
                utils.oppoTool && utils.oppoTool._rec_is_banner && utils.oppoTool.hideOppoRecBanner();
                break;
            case "native":
                this.hideMiniGameBanner();
                //隐藏自定义banner
                utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                //隐藏互推banner
                utils.oppoTool && utils.oppoTool._rec_is_banner && utils.oppoTool.hideOppoRecBanner();
                break;
            case "template":
                this.hideMiniGameBanner();
                this.hideNativeBanner();
                //隐藏自定义banner
                utils.hideRecommendGamesBanner();
                //隐藏互推banner
                utils.oppoTool && utils.oppoTool._rec_is_banner && utils.oppoTool.hideOppoRecBanner();
                break;
            case "rec":
                this.hideMiniGameBanner();
                this.hideNativeBanner();
                //隐藏自定义banner
                utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                break;
            default:
                this.hideMiniGameBanner();
                this.hideNativeBanner();
                //隐藏自定义banner
                utils.hideRecommendGamesBanner();
                this.hideNativeTemplateBannerAd();
                utils.oppoTool && utils.oppoTool._rec_is_banner && utils.oppoTool.hideOppoRecBanner();
                break;


        }
    }

    public HideBanner(location: BannerLocation = null) {
        if (PlatUtils.IsOPPO) {

            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            this._isBannerShow = false;
            this._nativeIsClose = true;
            this.canShowNativeBanner = false;
            this.hideBanner("");
        }
    }
    /**
     * 隐藏快游戏的banner
     */
    hideKyxBanner() {
        this.hideBanner("rec");
    }

    tryGameAdArr: any[] = [];
    public showNativeTryGameWidget(params: any = null) {
        if (PlatUtils.IsOPPO) {
            utils.showLog("显示原生抖动试玩 nativeNeedChange=", utils.nativeNeedChange, "  utils.tryGameDate", utils.tryGameDate, "utils.config.oppoconfig.nativeTryGameIds", utils.config.oppoconfig.nativeTryGameIds)
            if (utils.nativeNeedChange || !utils.tryGameDate) {
                if (utils.config.oppoconfig.nativeTryGameIds) {
                    let len = utils.config.oppoconfig.nativeTryGameIds.length;
                    utils.showLog("len:" + len);
                    for (let i = 0; i < len; i++) {
                        if (!this.tryGameAdArr[i]) {
                            let posId = utils.config.oppoconfig.nativeTryGameIds[i];
                            utils.showLog("创建原生抖动试玩广告， posId:" + posId);
                            //@ts-ignore
                            let tryGameAd = qg.createNativeAd({
                                posId: posId
                            });

                            if (tryGameAd) {
                                tryGameAd.onLoad((res) => {
                                    utils.nativeNeedChange = false
                                    if (res && res.adList && res.adList.length > 0) {
                                        res = JSON.parse(JSON.stringify(res));
                                        let adId = res.adList[0].adId
                                        utils.showLog("adId:" + adId);
                                        let canAdd = true;
                                        utils.tryGameDate.forEach((element) => {
                                            if (adId == element.date[0].adId) {
                                                canAdd = false;
                                            }
                                        })
                                        if (canAdd) {
                                            utils.tryGameDate.push({ "tryGameAd": tryGameAd, "date": res.adList });
                                            if (utils._nativeTryGameNode) {
                                                utils._nativeTryGameNode.getComponent(NativeTryGamesWidget).init();
                                            }
                                        }
                                        utils.showLog("原生抖动试完广告资源拉取成功，是否可以添加广告" + canAdd);
                                        utils.showLog(JSON.stringify(res));
                                    }
                                });
                                tryGameAd.onError((err) => {
                                    utils.showLog("原生抖动广告资源拉取失败！" + err.code + err.msg);
                                    utils.nativeNeedChange = true;
                                });
                                tryGameAd.load();
                                this.tryGameAdArr[i] = tryGameAd;
                            }
                        } else {
                            this.tryGameAdArr[i].load();
                        }
                    }
                }

            }
            this.createNativeTryGameWidget(params);
        }
    }



    /**
     * 通过配置展示插屏
     * @param index 索引
     */
    public ShowInterstitialByConfigs(index: number) {
        utils.showLog("ShowInterstitialByConfigs  index=" + index + " #configsLength=" + utils.config.oppoconfig.intersitialAdConfigs.length);
        if (index < utils.config.oppoconfig.intersitialAdConfigs.length) {
            let adInfo: any = utils.config.oppoconfig.intersitialAdConfigs[index];
            utils.showLog("ShowInterstitialByConfigs adInfo:" + JSON.stringify(adInfo));
            switch (adInfo.type) {
                case "default":
                    this._createMiniGameInsertAdByConfig(index);
                    break;
                case "native":
                    this._createNativeInsertAdByConfig(index);
                    break;
                case "template":
                    this._createNativeTemplateIntersitialAd(index);
                    break;
            }
        } else {
            YouWanAnalytics.EventAd(YwAdType.INTERSITITIAL, YwAdStatus.AD_ID_REQUEST_FAIL);

            utils.showLog("插屏展示失败，所有广告类型都未请求到广告！");
        }
    }

    /**
     * 通过索引展示Banner
     * @param index 索引
     */
    public ShowBannerByConfigs(index: number) {
        utils.showLog("ShowBannerByConfigs  index=" + index + " #configsLength=" + utils.config.oppoconfig.bannerAdConfigs.length);
        if (index < utils.config.oppoconfig.bannerAdConfigs.length) {
            let adInfo: any = utils.config.oppoconfig.bannerAdConfigs[index];
            utils.showLog("ShowBannerByConfigs adInfo:" + JSON.stringify(adInfo));
            switch (adInfo.type) {
                case "default":
                    this._createMiniGameBannerAdByConfigs(index);
                    break;
                case "native":
                    this._createNativeBannerAdByConfigs(index);
                    break;
                case "template":
                    this._createNativeTemplateBannerAd(index);
                    break;
            }
        } else {
            YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);

            utils.showLog("Banner展示失败，所有广告类型都未请求到广告！");
        }
    }

    public ShowInterstitial(location: BannerLocation = null) {
        if (PlatUtils.IsOPPO) {
            if (this.ServerConfig) {

                if (!this.checkInsertAdShow()) return;
                YouWanAnalytics.EventAd(YwAdType.INTERSITITIAL, YwAdStatus.AD_ID_REQUEST);

                if (this.show_ad_by_config) {
                    this.ShowInterstitialByConfigs(0);
                    return;
                }

                if (location && location == BannerLocation.Pause) {
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        utils.showLog("暂停界面不延时展示！");
                        utils.showLog("优先展示原生插屏广告!");
                        this.nativeInserAdDelayCall();
                    } else {
                        utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                } else {
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        utils.showLog("优先展示原生插屏广告!");
                        utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    } else {
                        utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                        // utils.delayCall(this._createMiniGameInsertAd.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);

                    }
                }
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    _nativeInsertAdShowCount: number = 0;
    public nativeInserAdDelayCall() {
        utils.showLog("原生插屏广告: 当前点击次数=" + utils.oppoTool.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititia_show_interval + "; 展示累计=" + this._nativeInsertAdShowCount);
        if (utils.oppoTool.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
            // 每日点击次数到达上限，限制展示次数
            if (this._nativeInsertAdShowCount >= (this.ServerConfig.intersititia_show_interval || 0)) {
                // 可以展示
                this._createNativeInsertAd(this._showNativeInsert);
            } else {
                // 不能展示
                this._nativeInsertAdShowCount++;
            }
        } else {
            this._createNativeInsertAd(this._showNativeInsert);
        }
    }

    public ShowVideo(callback: Function) {
        if (PlatUtils.IsOPPO) {
            this._videoCallback = callback;

            let curTime: number = new Date().getTime();
            let interval: number = (curTime - this.lastLastShowVideoTime) / 1000;
            if (interval < 4) {
                utils.showLog("视频广告请求间隔小于4秒,直接返回false");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }

            if (this.ServerConfig) {


                if (this.checkRewardInsertIsShow() && utils.oppoTool
                    && utils.oppoTool.ServerConfig
                    && utils.oppoTool.ServerConfig.reward_first_ad && utils.oppoTool.ServerConfig.reward_first_ad != "video") {
                    utils.showLog("<<<服务器默认优先展示激励插屏>>>");
                    this.showRewardInsert();
                    return;
                }
                if (utils.oppoTool.isOverMiniVersion("1040")) {
                    if (!this._videoAd) {
                        this._initVideoAd();
                    }

                    if (this._videoAd && this._videoLoaded) {
                        this._videoAd.show();
                        YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.videoId));

                        return;
                    }
                }
            }

            utils.showLog("暂无视频广告!");
            if (this._videoCallback) {
                this._videoAd.load();
                YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.videoId));

                // this.showRewardInsert();
                this._videoCallback(false, "暂无视频广告!");
                this._videoCallback = null;
            }
        }
    }

    _initVideoAd() {
        if (!this._videoAd) {
            if (utils.config.oppoconfig.videoId) {
                //@ts-ignore
                this._videoAd = qg.createRewardedVideoAd({
                    posId: utils.config.oppoconfig.videoId
                });

                let self = this;
                if (this._videoAd) {
                    utils.showLog("初始化注册视频回调!");
                    this._videoAd.load();
                    YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.videoId));

                    this._videoAd.onLoad(function () {
                        YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REQUEST_SUCCESS, new AdEventParameter(utils.config.oppoconfig.videoId));
                        utils.showLog("激励视频加载成功");
                        self._videoLoaded = true;
                    })

                    this._videoAd.onError((err) => {
                        YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.videoId));

                        utils.showLog("激励视频出错: " + err.code + err.msg);
                        self._videoLoaded = false;
                        if (self._videoCallback) {
                            self._videoCallback(false, "暂无视频广告!");
                            self._videoCallback = null;
                        }
                    });

                    this._videoAd.onClose((res) => {

                        setTimeout(() => {
                            self._videoAd.load();
                            YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.videoId));
                            utils.showLog("延迟3秒重新加载视频广告");
                        }, 3000);

                        if (res.isEnded) {
                            this.lastLastShowVideoTime = new Date().getTime();
                            utils.showLog('激励视频广告完成，发放奖励');
                            if (self._videoCallback) {
                                self._videoCallback(true, "");
                                self._videoCallback = null;
                            }
                            YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REWARD_SUCCESS, new AdEventParameter(utils.config.oppoconfig.videoId));

                        } else {
                            utils.showLog('激励视频广告取消关闭，不发放奖励');
                            YouWanAnalytics.EventAdWithObj(YwAdType.REWARD_VIDEO, YwAdStatus.REWARD_FAIL, new AdEventParameter(utils.config.oppoconfig.videoId));

                            if (self._videoCallback) {
                                self._videoCallback(false, "观看完视频才能获得奖励!");
                                self._videoCallback = null;
                            }
                        }
                    });
                }
            } else {
                utils.showLog("视频广告Id配置错误!");
            }
        }
    }


    /**
     * 验证插屏是否能展示
     * 1、次数限制 默认每日8次
     * 2、时间限制 默认60秒
     */
    private checkInsertAdShow(): boolean {
        let maxShowCount = this.ServerConfig.intersititial_max_show_count;
        let intervalTime = this.ServerConfig.intersititial_interval_time;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._insertLastShowTime) / 1000;

        utils.showLog("OPPO服务器插屏最大显示次数为：" + maxShowCount + ",间隔显示时间为：" + intervalTime + "秒！");
        utils.showLog("OPPO插屏当前广告显示次数：" + utils.oppoTool.insertAdShowCounts + "次，间隔时间：" + interval + "秒！");
        if (maxShowCount > 0 && utils.oppoTool.insertAdShowCounts >= maxShowCount) {
            utils.showLog("OPPO插屏广告显示的次数达到" + maxShowCount + "次。插屏不显示");
            return false;
        }

        if (intervalTime > 0 && interval < intervalTime) {
            utils.showLog("OPPO插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }

        return true;
    }

    /**
     * 验证是否第一次创建插屏
     */
    miniInserAdIsCreate: boolean = false;
    // /**
    //  * 创建小程序插屏广告
    //  * @param isUnique 是否唯一展示 不轮询显示原生
    //  */
    _createMiniGameInsertAd(isUnique: boolean = false) {
        if (PlatUtils.IsOPPO) {
            this._isInsertShow = true;

            if (this._isAdInit
                && utils.config.oppoconfig
                && utils.config.oppoconfig.insertId) {

                //@ts-ignore
                let _insertAd = qg.createInsertAd({
                    adUnitId: utils.config.oppoconfig.insertId
                });

                if (_insertAd) {

                    utils.showLog("注册小游戏插屏广告回调！");

                    let clearCallBack = () => {
                        _insertAd.offShow();
                        _insertAd.offError();
                        _insertAd.offLoad();
                    }
                    _insertAd.onError(((err) => {
                        utils.showLog("OPPO 小游戏插屏广告出错:" + err.code + err.msg);
                        if (this._isInsertShow && !isUnique) {
                            if (this.ServerConfig.intersititial_first_ad == "default") {
                                this._isInsertShow = false;
                                utils.showLog("开始显示原生插屏广告!");
                                this._curPosIdIndexNativeInser = 0;
                                utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                        }
                        _insertAd.offError();
                        clearCallBack();
                    }).bind(this));

                    _insertAd.onLoad((() => {
                        utils.showLog("OPPO 小程序插屏广告加载成功!");
                        if (this._isInsertShow) {
                            this._isInsertShow = false;
                            _insertAd.show();

                            //onShow
                            this._isInsertShow = false;
                            utils.oppoTool.countInserShowCount();
                            this._insertLastShowTime = new Date().getTime();
                            let closeType = this.ServerConfig.intersititial_open_close_banner;
                            if (closeType && closeType > 0) {
                                utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                                this.HideBanner();
                            }
                        }
                        // _insertAd.offLoad();
                        // clearCallBack();
                    }).bind(this));

                    _insertAd.onShow((() => {
                        utils.showLog("OPPO 小游戏插屏广告显示成功！  ");
                        // _insertAd.offShow();
                        clearCallBack();
                    }).bind(this));
                    /**
                     * 第一次调用不需要手动load
                     */
                    if (!this.miniInserAdIsCreate) {
                        this.miniInserAdIsCreate = true;
                    } else {
                        _insertAd.load();
                    }
                }


                if (!_insertAd) {
                    utils.showLog("OPPO小游戏插屏广告创建失败！");
                    if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
                        utils.showLog("开始显示原生插屏广告!");
                        this._curPosIdIndexNativeInser = 0;
                        utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            } else {
                utils.showLog("OPPO 小游戏插屏广告配置信息错误!");
                if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
                    utils.showLog("开始显示原生插屏广告!");
                    this._curPosIdIndexNativeInser = 0;
                    utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                }
            }
        }
    }


    // /**
    //  * 创建小程序插屏广告
    //  * @param isUnique 是否唯一展示 不轮询显示原生
    //  */
    _createMiniGameInsertAdByConfig(index: number) {
        if (PlatUtils.IsOPPO) {
            this._isInsertShow = true;
            utils.showLog("_createMiniGameInsertAdByIndex: index=" + index);

            if (this._isAdInit
                && utils.config.oppoconfig
                && index < utils.config.oppoconfig.intersitialAdConfigs.length) {

                //@ts-ignore
                let _insertAd = qg.createInsertAd({
                    adUnitId: utils.config.oppoconfig.intersitialAdConfigs[index].id
                });
                YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                if (_insertAd) {

                    utils.showLog("注册小游戏插屏广告回调！");

                    let clearCallBack = () => {
                        _insertAd.offShow();
                        _insertAd.offError();
                        _insertAd.offLoad();
                    }
                    _insertAd.onError(((err) => {
                        utils.showLog("OPPO 小游戏插屏广告出错:" + err.code + err.msg);
                        if (this._isInsertShow) {
                            this.ShowInterstitialByConfigs(index + 1);
                        }
                        YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id, err.code, err.msg));

                        _insertAd.offError();
                        clearCallBack();
                    }).bind(this));

                    _insertAd.onLoad((() => {
                        utils.showLog("OPPO 小程序插屏广告加载成功!");
                        YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.REQUEST_SUCCESS, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                        if (this._isInsertShow) {
                            this._isInsertShow = false;
                            _insertAd.show();

                            //onShow
                            this._isInsertShow = false;
                            utils.oppoTool.countInserShowCount();
                            this._insertLastShowTime = new Date().getTime();
                            let closeType = this.ServerConfig.intersititial_open_close_banner;
                            if (closeType && closeType > 0) {
                                utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                                this.HideBanner();
                            }
                        }
                        // _insertAd.offLoad();
                        // clearCallBack();
                    }).bind(this));

                    _insertAd.onShow((() => {
                        utils.showLog("OPPO 小游戏插屏广告显示成功！  ");
                        YouWanAnalytics.EventAd(YwAdType.INTERSITITIAL, YwAdStatus.AD_ID_REQUEST_SUCCESS);
                        YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                        // _insertAd.offShow();
                        clearCallBack();
                    }).bind(this));
                    /**
                     * 第一次调用不需要手动load
                     */
                    if (!this.miniInserAdIsCreate) {
                        this.miniInserAdIsCreate = true;
                    } else {
                        _insertAd.load();
                    }
                }


                if (!_insertAd) {
                    YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                    utils.showLog("OPPO小游戏插屏广告创建失败！");
                    this.ShowInterstitialByConfigs(index + 1);
                }
            } else {
                utils.showLog("OPPO 小游戏插屏广告配置信息错误!");
                // if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
                //     utils.showLog("开始显示原生插屏广告!");
                //     this._curPosIdIndexNativeInser = 0;
                //     utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                // }
            }
        }
    }

    _createMiniGameBannerAd(location: BannerLocation = null) {
        if (PlatUtils.IsOPPO) {
            this._isBannerShow = true;

            if (this._isAdInit
                && utils.config.oppoconfig
                && utils.config.oppoconfig.bannerId) {

                let style: any = {
                    top: 0
                }
                if (this.getNativeBannerInfo()._alignType === "top") {
                    style.top = 0;
                } else {
                    style = null;
                }

                if (!this._bannerAd || true) {
                    //@ts-ignore
                    this._bannerAd = qg.createBannerAd({
                        posId: utils.config.oppoconfig.bannerId,
                        style
                    });

                    if (this._bannerAd) {
                        utils.showLog("注册小游戏banner回调!");
                        this._bannerAd.onError(((err) => {
                            utils.showLog("OPPO 小游戏Banner广告出错: " + err.code + err.msg);
                            let bannerInfo = this.getNativeBannerInfo();
                            if (bannerInfo.st_banner_show_back_up == -1) {
                                utils.showLog("服务器配置不显示备用广告");
                                return;
                            }
                            if (this._isBannerShow) {
                                this._isBannerShow = false;
                                if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                                    this._curPosIdIndexNativeBanner = 0;
                                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                                } else {
                                    //显示自定义banner
                                    if (utils.isShowRecommondGamesBanner()) {
                                        clearTimeout(this._showBannerTimerId);
                                        utils.showRecommendGamesBanner();
                                        utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                                        return;
                                    }
                                }
                            }
                        }).bind(this));

                        this._bannerAd.onShow((() => {
                            utils.showLog("OPPO 小游戏Banner显示成功！");

                            if (this._nativeBannerNode) {
                                this._nativeBannerNode.active = false;
                            }
                            utils.hideRecommendGamesBanner();
                            // if (this._bannerIsHide) {
                            //     this._bannerAd.hide();
                            //     utils.showLog("当前Banner广告为隐藏状态。调用隐藏！");
                            // }
                            this._showBannerCallBack && this._showBannerCallBack();
                            this._showBannerCallBack = null;
                        }).bind(this));

                        // this._bannerAd.onResize((obj) => {
                        //     utils.showLog("on resize >>>>" + JSON.stringify(obj));
                        //     utils.showLog('banner 宽度：' + obj.width + ', banner 高度：' + obj.height + " ,top" + obj.top)
                        // })

                        this._bannerAd.onHide(function () {
                            if (!this._isNativeBannerShow) {
                                utils.oppoTool.countBannerCloseCount();
                                utils.showLog("OPPO 小游戏Banner 广告隐藏,当前隐藏次数>" + utils.oppoTool.bannerAdCloseCounts);
                            } else {
                                this._isNativeBannerShow = false;
                                utils.showLog("OPPO 小游戏Banner 广告隐藏,来自原生的显示，不增加隐藏次数，当前隐藏次数>" + utils.oppoTool.bannerAdCloseCounts);
                            }

                        })

                        // _miniBannerHeight
                    } else {
                        if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                            this._curPosIdIndexNativeBanner = 0;
                            this._createNativeBannerAd(this._showNativeBanner.bind(this));
                        } else {
                            //显示自定义banner
                            if (utils.isShowRecommondGamesBanner()) {
                                clearTimeout(this._showBannerTimerId);
                                utils.showRecommendGamesBanner();
                                utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                                return;
                            }
                        }
                    }
                }

                if (this._bannerAd) {
                    if (this.getNativeBannerInfo()._alignType !== "top") {
                        this._bannerAd.style.top = utils.oppoTool.SysInfo.screenHeight;
                    }

                    this._bannerAd.show();
                } else {
                    utils.showLog("OPPO 小游戏Banner广告创建失败!");
                    if (this.ServerConfig.indexOf("default") > -1) {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    } else {
                        //显示自定义banner
                        if (utils.isShowRecommondGamesBanner()) {
                            clearTimeout(this._showBannerTimerId);
                            utils.showRecommendGamesBanner();
                            utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                            return;
                        }
                    }
                }
            } else {
                utils.showLog("OPPO 小游戏Banner广告配置信息错误!");
                let bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                    this._curPosIdIndexNativeBanner = 0;
                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                } else {
                    //显示自定义banner
                    if (utils.isShowRecommondGamesBanner()) {
                        clearTimeout(this._showBannerTimerId);
                        utils.showRecommendGamesBanner();
                        utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                        return;
                    }
                }
            }
        }
    }


    _createMiniGameBannerAdByConfigs(index: number) {
        utils.showLog("_createMiniGameBannerAdByConfigs: #index=" + index);
        if (PlatUtils.IsOPPO) {
            this._isBannerShow = true;
            YouWanAnalytics.EventAdWithObj(YwAdType.BANNER, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

            if (this._isAdInit
                && utils.config.oppoconfig
                && index < utils.config.oppoconfig.bannerAdConfigs.length) {

                let style: any = {
                    top: 0
                }
                if (this.getNativeBannerInfo()._alignType === "top") {
                    style.top = 0;
                } else {
                    style = null;
                }

                //@ts-ignore
                this._bannerAd = qg.createBannerAd({
                    posId: utils.config.oppoconfig.bannerAdConfigs[index].id,
                    style
                });

                if (this._bannerAd) {
                    utils.showLog("注册小游戏banner回调!");
                    this._bannerAd.onError((err) => {
                        this._bannerAd.offError();
                        YouWanAnalytics.EventAdWithObj(YwAdType.BANNER, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

                        utils.showLog("OPPO 小游戏 Configs Banner广告出错: " + err.code + err.msg);
                        let bannerInfo = this.getNativeBannerInfo();
                        if (bannerInfo.st_banner_show_back_up == -1) {
                            utils.showLog("服务器配置不显示备用广告");
                            YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);
                            return;
                        }
                        if (this._isBannerShow) {
                            this._isBannerShow = false;
                            this.ShowBannerByConfigs(index + 1);
                        }
                    });

                    // this._bannerAd.onShow((() => {
                    //     this._bannerAd.offShow();
                    //     utils.showLog("OPPO 小游戏Banner显示成功！");
                    //     this.hideBanner("default");
                    //     this._showBannerCallBack && this._showBannerCallBack();
                    //     this._showBannerCallBack = null;
                    // }).bind(this));

                    // this._bannerAd.onResize((obj) => {
                    //     utils.showLog("on resize >>>>" + JSON.stringify(obj));
                    //     utils.showLog('banner 宽度：' + obj.width + ', banner 高度：' + obj.height + " ,top" + obj.top)
                    // })

                    this._bannerAd.onHide(() => {
                        this._bannerAd.offHide();
                        if (!this._isNativeBannerShow) {
                            utils.oppoTool.countBannerCloseCount();
                            utils.showLog("OPPO 小游戏Banner 广告隐藏,当前隐藏次数>" + utils.oppoTool.bannerAdCloseCounts);
                        } else {
                            this._isNativeBannerShow = false;
                            utils.showLog("OPPO 小游戏Banner 广告隐藏,来自原生的显示，不增加隐藏次数，当前隐藏次数>" + utils.oppoTool.bannerAdCloseCounts);
                        }

                    })

                    if (this.getNativeBannerInfo()._alignType !== "top") {
                        this._bannerAd.style.top = utils.oppoTool.SysInfo.screenHeight;
                    }

                    this._bannerAd.show().then(() => {
                        this._bannerAd.offShow();
                        utils.showLog("OPPO 小游戏Banner显示成功！");
                        YouWanAnalytics.EventAdWithObj(YwAdType.BANNER, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));
                        YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_SUCCESS);

                        this.hideBanner("default");
                        this._showBannerCallBack && this._showBannerCallBack();
                        this._showBannerCallBack = null;
                    });
                } else {
                    this.ShowBannerByConfigs(index + 1);
                    YouWanAnalytics.EventAdWithObj(YwAdType.BANNER, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));
                    YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);


                }

            } else {
                utils.showLog("OPPO 小游戏Banner广告配置信息错误!");
                let bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);
                    utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                this.ShowBannerByConfigs(index + 1);
            }
        }
    }


    _createNativeBannerAdByConfigs(index: number) {
        if (PlatUtils.IsOPPO) {

            YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

            utils.showLog("_createNativeBannerAdByConfigs: #index=" + index);
            if (this._isAdInit
                && utils.config.oppoconfig
                && index < utils.config.oppoconfig.bannerAdConfigs.length) {

                let nativeBannerAd = utils.config.oppoconfig.bannerAdConfigs[index].nativeBannerAd;

                if (!nativeBannerAd) {
                    utils.showLog("创建原生广告Banner。 posId:" + utils.config.oppoconfig.bannerAdConfigs[index].id);
                    //@ts-ignore
                    nativeBannerAd = qg.createNativeAd({
                        posId: utils.config.oppoconfig.bannerAdConfigs[index].id
                    });

                    if (nativeBannerAd) {
                        utils.config.oppoconfig.bannerAdConfigs[index].nativeBannerAd = nativeBannerAd;

                        nativeBannerAd.onLoad((res) => {
                            YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.REQUEST_SUCCESS, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

                            if (this._nativeIsClose) {
                                utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            if (res && res.adList && res.adList.length > 0) {
                                this._startBannerTimerTask = new Date().getTime();
                                utils.showLog("原生Banner广告资源拉取成功！");
                                utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                let data = res.adList[0];
                                //如果当前显示为结算banner,则不做数据验证
                                if (this._checkNativeDataValid(data) || this.getNativeBannerInfo().show_st_banner == "true") {
                                    if (this.canShowNativeBanner) {
                                        this._curPosIdIndexNativeBanner = 0;
                                        this._showNativeBanner(nativeBannerAd, data);
                                        this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd;
                                        this._curNativeBannerInfo.data = data;
                                        this.hideBanner("native");
                                        YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));
                                        YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_SUCCESS);

                                    } else {
                                        utils.showLog("已经隐藏banner不可重复展示")
                                    }

                                    return;
                                }
                            }

                            utils.showLog("原生Banner广告资源出错！");

                            let bannerInfo = this.getNativeBannerInfo();
                            if (bannerInfo.st_banner_show_back_up == -1) {
                                utils.showLog(">>>>>服务器配置不显示备用广告！");
                                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));
                                YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);

                                return;
                            }
                            this.ShowBannerByConfigs(index + 1);
                        });

                        nativeBannerAd.onError((err) => {
                            YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

                            if (this._nativeIsClose) {
                                utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            utils.showLog("原生Banner广告资源拉取失败！" + err.code + err.msg);

                            // 原生广告遍历完毕
                            let bannerInfo = this.getNativeBannerInfo();
                            if (bannerInfo.st_banner_show_back_up == -1) {
                                utils.showLog(">>>>>服务器配置不显示备用广告！");
                                YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);
                                return;
                            }
                            this.ShowBannerByConfigs(index + 1);
                        });
                    }
                }

                if (nativeBannerAd) {
                    utils.showLog("nativeBannerAd reLoad>>");
                    nativeBannerAd.load();
                } else {

                    let bannerInfo = this.getNativeBannerInfo();
                    if (bannerInfo.st_banner_show_back_up == -1) {
                        utils.showLog(">>>>>服务器配置不显示备用广告！");
                        YouWanAnalytics.EventAd(YwAdType.BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);
                        return;
                    }
                    this.ShowBannerByConfigs(index + 1);
                }
            }
        }
    }


    _curNativeBannerInfo: any = {};
    _createNativeBannerAd(completeCallback: Function) {
        if (PlatUtils.IsOPPO) {

            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner);

            let nativeBannerAd = this._nativeBannerAd[this._curPosIdIndexNativeBanner];

            if (!nativeBannerAd) {
                if (utils.config.oppoconfig.nativeBannerIds
                    && utils.config.oppoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                    utils.showLog("创建原生广告Banner。 posId:" + utils.config.oppoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                    //@ts-ignore
                    nativeBannerAd = qg.createNativeAd({
                        posId: utils.config.oppoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                    });

                    if (nativeBannerAd) {
                        this._nativeBannerAd.push(nativeBannerAd);

                        nativeBannerAd.onLoad((res) => {
                            if (this._nativeIsClose) {
                                utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            if (res && res.adList && res.adList.length > 0) {
                                this._startBannerTimerTask = new Date().getTime();
                                utils.showLog("原生Banner广告资源拉取成功！");
                                utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                let data = res.adList[0];
                                //如果当前显示为结算banner,则不做数据验证
                                if (this._checkNativeDataValid(data) || this.getNativeBannerInfo().show_st_banner == "true") {
                                    if (this.canShowNativeBanner) {
                                        this._curPosIdIndexNativeBanner = 0;
                                        this._showNativeBanner(nativeBannerAd, data);
                                        this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd;
                                        this._curNativeBannerInfo.data = data;
                                        // 删除当前广告
                                        if (this._bannerAd) {
                                            this._isNativeBannerShow = true;
                                            if (utils.oppoTool.isOverMiniVersion("1050")) {
                                                utils.showLog("销毁小游戏Banner");
                                                this._bannerAd.destroy();
                                                this._bannerAd = null;
                                            } else {
                                                utils.showLog("当前小游戏平台小于1051，只能隐藏小游戏Banner");
                                                this._bannerAd.hide();
                                            }
                                        }
                                        utils.hideRecommendGamesBanner();
                                    } else {
                                        cc.warn("已经隐藏banner不可重复展示")
                                    }

                                    return;
                                }
                            }

                            utils.showLog("原生Banner广告资源出错！");
                            this._curPosIdIndexNativeBanner++;
                            if (this._curPosIdIndexNativeBanner < utils.config.oppoconfig.nativeBannerIds.length) {
                                this._createNativeBannerAd(callback);
                            } else {
                                this._curPosIdIndexNativeBanner = 0;
                                // 原生广告遍历完毕
                                utils.showLog("原生广告条遍历完毕，无法展示！");
                                let bannerInfo = this.getNativeBannerInfo();
                                if (bannerInfo.st_banner_show_back_up == -1) {
                                    utils.showLog(">>>>>服务器配置不显示备用广告！");
                                    return;
                                }
                                if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                                    utils.showLog("开始展示小游戏广告条！")
                                    this._createMiniGameBannerAd();
                                } else {
                                    //显示自定义banner
                                    if (utils.isShowRecommondGamesBanner()) {
                                        clearTimeout(this._showBannerTimerId);
                                        utils.showRecommendGamesBanner();
                                        utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                                        return;
                                    }
                                }
                            }

                        });

                        nativeBannerAd.onError((err) => {
                            if (this._nativeIsClose) {
                                utils.showLog("隐藏了BANNER，不做任何处理！");
                                return;
                            }
                            utils.showLog("原生Banner广告资源拉取失败！" + err.code + err.msg);
                            this._curPosIdIndexNativeBanner++;
                            if (this._curPosIdIndexNativeBanner < utils.config.oppoconfig.nativeBannerIds.length) {
                                this._createNativeBannerAd(callback);
                            } else {
                                this._curPosIdIndexNativeBanner = 0;
                                // 原生广告遍历完毕
                                utils.showLog("原生广告条遍历完毕，无法展示！");
                                let bannerInfo = this.getNativeBannerInfo();
                                if (bannerInfo.st_banner_show_back_up == -1) {
                                    utils.showLog(">>>>>服务器配置不显示备用广告！");
                                    return;
                                }
                                if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                                    utils.showLog("开始展示小游戏广告条！")
                                    this._createMiniGameBannerAd();
                                } else {
                                    //显示自定义banner
                                    if (utils.isShowRecommondGamesBanner()) {
                                        clearTimeout(this._showBannerTimerId);
                                        utils.showRecommendGamesBanner();
                                        utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                                        return;
                                    }
                                }
                            }
                        });
                    }
                }
            }

            if (nativeBannerAd) {
                utils.showLog("nativeBannerAd reLoad>>");
                nativeBannerAd.load();
            } else {
                this._curPosIdIndexNativeBanner++;
                if (utils.config.oppoconfig.nativeBannerIds && this._curPosIdIndexNativeBanner < utils.config.oppoconfig.nativeBannerIds.length) {
                    this._createNativeBannerAd(callback);
                } else {
                    this._curPosIdIndexNativeBanner = 0;
                    // 原生广告遍历完毕
                    utils.showLog("原生广告条遍历完毕，无法展示！");
                    let bannerInfo = this.getNativeBannerInfo();
                    if (bannerInfo.st_banner_show_back_up == -1) {
                        utils.showLog(">>>>>服务器配置不显示备用广告！");
                        return;
                    }
                    if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                        utils.showLog("开始展示小游戏广告条！")
                        this._createMiniGameBannerAd();
                    } else {
                        //显示自定义banner
                        if (utils.isShowRecommondGamesBanner()) {
                            clearTimeout(this._showBannerTimerId);
                            utils.showRecommendGamesBanner();
                            utils.showLog(`小游戏、原生广告条都无法展示，展示自定义banner`);
                            return;
                        }
                    }
                }
            }
        }
    }

    _createNativeInsertAd(completeCallback: Function) {
        if (PlatUtils.IsOPPO) {

            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);

            let nativeInsertAd = this._nativeInsertAd[this._curPosIdIndexNativeInser];
            if (!nativeInsertAd) {

                if (utils.config.oppoconfig.nativeInsertIds
                    && utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                    utils.showLog("创建原生插屏广告。 posId:" + utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                    //@ts-ignore
                    nativeInsertAd = qg.createNativeAd({
                        posId: utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]
                    });

                    if (nativeInsertAd) {
                        this._nativeInsertAd.push(nativeInsertAd);

                        nativeInsertAd.onLoad((res) => {
                            if (res && res.adList && res.adList.length > 0) {
                                utils.showLog("原生插屏广告资源拉取成功！");
                                utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                let data = res.adList[0];
                                if (this._checkNativeInsertDataValid(data)) {

                                    this._curPosIdIndexNativeInser = 0;
                                    this._showNativeInsert(nativeInsertAd, data);

                                    return;
                                } else {
                                    utils.showLog("原生插屏广告资源不合法！");
                                }
                            }

                            utils.showLog("原生插屏广告资源出错！");
                            this._curPosIdIndexNativeInser++;
                            if (this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
                                this._createNativeInsertAd(callback);
                            } else {
                                this._curPosIdIndexNativeInser = 0;
                                // 原生广告遍历完毕
                                utils.showLog("原生插屏广告遍历完毕，无法展示！");
                                if (this.ServerConfig.intersititial_first_ad == "native") {
                                    utils.showLog("开始展示小游戏插屏广告!");
                                    this._createMiniGameInsertAd();
                                }
                            }
                        });

                        nativeInsertAd.onError((err) => {
                            utils.showLog("原生插屏广告资源拉取失败！" + err.code + err.msg);
                            this._curPosIdIndexNativeInser++;
                            if (this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
                                this._createNativeInsertAd(callback);
                            } else {
                                this._curPosIdIndexNativeInser = 0;
                                // 原生广告遍历完毕
                                utils.showLog("原生插屏广告遍历完毕，无法展示！");
                                if (this.ServerConfig.intersititial_first_ad == "native") {
                                    utils.showLog("开始展示小游戏插屏广告!");
                                    this._createMiniGameInsertAd();
                                }
                            }
                        });
                    }
                }
            }

            if (nativeInsertAd) {
                nativeInsertAd.load();
            } else {
                this._curPosIdIndexNativeInser++;
                if (utils.config.oppoconfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
                    this._createNativeInsertAd(callback);
                } else {
                    this._curPosIdIndexNativeInser = 0;
                    // 原生广告遍历完毕
                    utils.showLog("原生插屏广告遍历完毕，无法展示！");
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        utils.showLog("开始展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                }
            }
        }
    }


    _createNativeInsertAdByConfig(index: number) {
        if (PlatUtils.IsOPPO) {
            utils.showLog("_createNativeInsertAdByConfig: #index=" + index);

            if (this._isAdInit
                && utils.config.oppoconfig
                && index < utils.config.oppoconfig.intersitialAdConfigs.length) {


                let nativeInsertAd = utils.config.oppoconfig.intersitialAdConfigs[index].nativeInsertAd;
                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                if (!nativeInsertAd) {

                    if (utils.config.oppoconfig.intersitialAdConfigs[index].id) {
                        utils.showLog("创建原生插屏广告。 posId:" + utils.config.oppoconfig.intersitialAdConfigs[index].id);
                        //@ts-ignore
                        nativeInsertAd = qg.createNativeAd({
                            posId: utils.config.oppoconfig.intersitialAdConfigs[index].id
                        });

                        if (nativeInsertAd) {
                            utils.config.oppoconfig.intersitialAdConfigs[index].nativeInsertAd = nativeInsertAd;

                            nativeInsertAd.onLoad((res) => {
                                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.REQUEST_SUCCESS, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                                if (res && res.adList && res.adList.length > 0) {

                                    utils.showLog("原生插屏广告资源拉取成功！");
                                    utils.showLog(JSON.stringify(res));
                                    res = JSON.parse(JSON.stringify(res));
                                    let data = res.adList[0];
                                    if (this._checkNativeInsertDataValid(data)) {

                                        YouWanAnalytics.EventAd(YwAdType.INTERSITITIAL, YwAdStatus.AD_ID_REQUEST_SUCCESS);

                                        YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));
                                        this._showNativeInsert(nativeInsertAd, data);
                                        return;
                                    } else {
                                        utils.showLog("原生插屏广告资源不合法！");
                                    }
                                    YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                                }

                                utils.showLog("原生插屏广告资源出错！");
                                this.ShowInterstitialByConfigs(index + 1);
                            });

                            nativeInsertAd.onError((err) => {
                                utils.showLog("原生插屏广告资源拉取失败！" + err.code + err.msg);
                                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id, err.code, err.msg));

                                this.ShowInterstitialByConfigs(index + 1);
                            });
                        }
                    }
                }

                if (nativeInsertAd) {
                    nativeInsertAd.load();
                } else {
                    YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));

                    utils.showLog("创建原生插屏失败：#index=" + index);
                    this.ShowInterstitialByConfigs(index + 1);
                }
            }
        }
    }

    /**
     * 获取原生广告数据
     * @param args 
     */
    getNativeAdData() {
        if (!this._nativeAdObject) {
            this._nativeAdObject = new YZ_NativeAdObject();
        }
        this._nativeAdObject._nativeObj = this._nativeAd;
        if (this._nativeAdObject.data) {
            if (this._nativeAdObject.data.adId != this._nativeData.adId) {
                this._nativeAdObject.is_reportClick = false;
                this._nativeAdObject.is_reportShow = false;
            }
        }
        this._nativeAdObject.data = this._nativeData;


        // setTimeout(() => {
        //     utils.showLog("延迟两秒重新请求原生广告数据");
        //     this._createNativeAd(args);
        // }, 2000);
        if (this._nativeData && this._nativeAd) {
            // this._nativeData = null;
            utils.showLog("获取原生数据 >>>", this._nativeData, "...", this._nativeAdObject)
            return this._nativeAdObject;
        }
        return null;
    }



    _singleAdCreateTime: number = 0;


    /**
     * 创建单个原生广告
     * @param completeCallback 
     */
    createNativeAd(params: any = null, nativeItem?: YZ_NativeItem) {
        utils.showLog("_createNativeAd >>>>>");
        if (PlatUtils.IsOPPO) {
            if (nativeItem) {
                this._curNativeItem = nativeItem;
            }

            let refreshTime = this.ServerConfig.st_native_ad_refresh_time ? this.ServerConfig.st_native_ad_refresh_time : 0;
            if (this._nativeAdObject && this._nativeAdObject.data && !this._nativeAdObject.is_reportClick && (new Date().getTime() - this._singleAdCreateTime) / 1000 < refreshTime) {
                utils.showLog(`当前原生广告的展示时间${(new Date().getTime() - this._singleAdCreateTime) / 1000}秒，未达刷新时间${refreshTime}秒限制，直接使用上一次数据！`);
                this._showNativeAd();
                return;
            }

            utils.showLog("_curPosIdIndexSingleNative:" + this._curPosIdIndexSingleNative + "  #this._nativeSingleAd.length" + this._nativeSingleAd.length);

            let nativeSingleAd = this._nativeSingleAd[this._curPosIdIndexSingleNative];
            if (!nativeSingleAd) {

                if (utils.config.oppoconfig.nativeSingleAdIds
                    && utils.config.oppoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]) {
                    utils.showLog("创建原生广告。 posId:" + utils.config.oppoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]);
                    //@ts-ignore
                    nativeSingleAd = qg.createNativeAd({
                        posId: utils.config.oppoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]
                    });

                    if (nativeSingleAd) {
                        this._nativeSingleAd.push(nativeSingleAd);

                        nativeSingleAd.onLoad((res) => {
                            if (res && res.adList && res.adList.length > 0) {
                                utils.showLog("原生广告资源拉取成功！");
                                utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                let data = res.adList[0];
                                if (this._checkNativeDataValid(data)) {
                                    this._singleAdCreateTime = new Date().getTime();
                                    this._curPosIdIndexSingleNative = 0;
                                    this._nativeData = data;
                                    this._nativeAd = nativeSingleAd;
                                    // utils.showLog("callback >>>", callback);
                                    // callback(this.getNativeAdData());
                                    this._showNativeAd();
                                    return;
                                } else {
                                    utils.showLog("原生广告资源不合法！");
                                }
                            }

                            utils.showLog("原生广告资源出错！");
                            this._curPosIdIndexSingleNative++;
                            if (this._curPosIdIndexSingleNative < utils.config.oppoconfig.nativeSingleAdIds.length) {
                                this.createNativeAd();
                            } else {
                                this._curPosIdIndexSingleNative = 0;
                                // 原生广告遍历完毕
                                utils.showLog("单个原生广告ID遍历完毕，无法展示！");
                            }
                        });

                        nativeSingleAd.onError((err) => {
                            utils.showLog("原生单个广告资源拉取失败！" + err.code + err.msg);
                            this._curPosIdIndexSingleNative++;
                            if (this._curPosIdIndexSingleNative < utils.config.oppoconfig.nativeSingleAdIds.length) {
                                this.createNativeAd();
                            } else {
                                this._curPosIdIndexSingleNative = 0;
                                // 原生广告遍历完毕
                                utils.showLog("单个原生广告ID遍历完毕，无法展示！");
                            }
                        });
                    }
                }
            }

            if (nativeSingleAd) {
                utils.showLog("nativeSingleAd reload");
                nativeSingleAd.load();
            } else {
                this._curPosIdIndexSingleNative++;
                if (utils.config.oppoconfig.nativeSingleAdIds && this._curPosIdIndexSingleNative < utils.config.oppoconfig.nativeSingleAdIds.length) {
                    this.createNativeAd();
                } else {
                    this._curPosIdIndexSingleNative = 0;
                    // 原生广告遍历完毕
                    utils.showLog("单个原生广告ID 遍历完毕，无法展示！");
                }
            }
        }
    }

    /**
     * 显示原生banner组件
     */
    _showNativeBanner(nativeBannerAd: any, data: any) {
        if (PlatUtils.IsOPPO) {
            if (data) {

                if (cc.isValid(this._nativeBannerNode) && this._nativeBannerNode) {
                    this._nativeBannerNode.destroy();
                }

                // if (!cc.isValid(this._nativeBannerNode) || (!this._nativeBannerNode && utils.config.otherconfig.nativeBanner)) {
                this._nativeBannerNode = cc.instantiate(utils.config.otherconfig.nativeBanner);
                this._nativeBannerNode.position = CompatibleTool.position(cc.winSize.width / 2, this._nativeBannerNode.height * this._nativeBannerNode.scaleY / 2);
                cc.director.getScene().addChild(this._nativeBannerNode, 1000);
                // }
                if (this._nativeBannerNode) {
                    this._nativeBannerNode.active = true;
                    let nativeBanner: YZ_NativeBanner = this._nativeBannerNode.getComponent("YZ_NativeBanner");
                    if (nativeBanner) {
                        nativeBanner.init(nativeBannerAd, data, this.getNativeBannerInfo());
                    } else {
                        utils.showLog("NativeBanner组件不存在!");
                    }
                    this._showBannerCallBack && this._showBannerCallBack();
                    this._showBannerCallBack = null;
                } else {
                    utils.showLog("原生广告banner位没有创建！");
                }
            }
        }
    }




    /**
     * 显示原生插屏组件
     */
    _showNativeInsert(nativeInsertAd: any, data: any) {
        if (PlatUtils.IsOPPO) {
            if (data) {


                if ((!cc.isValid(this._nativeInsertNode)) || !this._nativeInsertNode && utils.config.otherconfig.nativeInsert) {
                    utils.showLog("创建原生插屏广告位");
                    this._nativeInsertNode = cc.instantiate(utils.config.otherconfig.nativeInsert);
                    this._nativeInsertNode.position = CompatibleTool.position(cc.winSize.width / 2, cc.winSize.height / 2);
                    cc.director.getScene().addChild(this._nativeInsertNode, 999999);
                }

                if (this._nativeInsertNode) {
                    let nativeInsert = this._nativeInsertNode.getComponent("YZ_NativeInsert");
                    if (nativeInsert) {
                        this._nativeInsertAdShowCount = 0;
                        nativeInsert.init(nativeInsertAd, data);
                        this._insertLastShowTime = new Date().getTime();

                        utils.oppoTool.countInserShowCount();
                        utils.showLog("原生插屏显示成功，当前显示次数=" + utils.oppoTool.insertAdShowCounts);
                        let closeType = this.ServerConfig.intersititial_open_close_banner;
                        if (closeType && closeType > 0) {
                            utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                            this.HideBanner();
                        }


                    } else {
                        utils.showLog("NativeInsert组件不存在!");
                    }
                } else {
                    utils.showLog("原生广告插屏位没有创建！");
                }
            }
        }
    }

    /**
     * 隐藏banner
     * @param args 
     */
    public HideSingleNativeAd(args?: any) {
        if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
            this.signleNativeAd.destroy();
        }
    }


    public ShowCloseBtnBanner(location: BannerLocation = BannerLocation.Home, args: any) {
        utils.showLog("ShowCloseBtnBanner >>>>>>>>>.");

        let isMoveBtn = 0;
        let fadeInTime = 0;
        let btn: cc.Node = args.closeBtn;
        let winHeight = cc.winSize.height;

        btn.opacity = 0;
        if (this.ServerConfig) {

            if (this.ServerConfig.is_move_btn) {
                isMoveBtn = this.ServerConfig.is_move_btn;
            }

            if (this.ServerConfig.close_btn_fade_in_time) {
                fadeInTime = this.ServerConfig.close_btn_fade_in_time;
            }
            utils.showLog(isMoveBtn == 0 ? "显示banner,且按钮在上面" : `显示Banner,按钮居底部且${isMoveBtn}毫秒后移动`);

            setTimeout(() => {

                utils.showLog("延迟调用关闭按钮的Banner >>>>");
                this.ShowBanner(location, args);

                var adY = 240;
                utils.showLog('utils - adY:' + adY);
                if (adY > 0 && btn) {
                    btn.y = -(winHeight / 2 - adY) + btn.height;
                    utils.showLog("btnClose.y" + btn.y);
                }
            }, isMoveBtn);

            setTimeout(() => {
                btn.runAction(cc.fadeIn(0.3));
            }, fadeInTime * 1000);
        }

    }




    _checkNativeInsertDataValid(data: any) {
        if (!data) {
            return false;
        }
        return data.title && ((data.iconUrlList && data.iconUrlList.length > 0) || (data.imgUrlList && data.imgUrlList.length > 0));
    }

    _checkNativeDataValid(data: any) {
        if (!data) {
            return false;
        }
        return data.imgUrlList && data.imgUrlList.length;
    }

    /**
     * 验证是否显示激励插屏
     */
    private checkRewardInsertIsShow() {
        let jumpList = utils.getRecommondGameList();
        if (utils.isSupportnavigateToMiniGame()) {
            if (utils.oppoTool
                && utils.oppoTool.ServerConfig
                && utils.oppoTool.ServerConfig.is_reward_intersititia) {
                if (utils.oppoTool.ServerConfig.is_reward_intersititia == "true"
                    && jumpList && jumpList.length > 0) {
                    utils.showLog("激励插屏显示环境验证通过！");
                    return true;
                } else {
                    utils.showLog("is_reward_intersititia 参数为false，激励插屏组件不显示！");
                    return false;
                }
            } else {
                utils.showLog("配置中没有is_reward_intersititia参数，激励插屏组件组件不显示！");
                return false;
            }
        }
        utils.showLog("当前平台不支持小程序跳转！");
        return false;
    }


    _rewardInsertNode: cc.Node = null;
    /**
    * 显示激励插屏组件
    */
    public showRewardInsert() {
        utils.showLog("show reward");
        let self = this;
        if (!this.checkRewardInsertIsShow()) {
            self._videoCallback && self._videoCallback(false, "暂无视频广告！");
            utils.adManager.videoCallBack = null;
            return;
        }


        if (((!cc.isValid(this._rewardInsertNode)) || !this._rewardInsertNode) && utils.config.otherconfig.rewardInsert) {
            utils.showLog("创建激励插屏广告");
            this._rewardInsertNode = cc.instantiate(utils.config.otherconfig.rewardInsert);
            this._rewardInsertNode.position = CompatibleTool.position(cc.winSize.width / 2, cc.winSize.height / 2);
            cc.director.getScene().addChild(this._rewardInsertNode, 9999);
        }


        if (this._rewardInsertNode) {
            let rewardInsert: RewardInsert = this._rewardInsertNode.getComponent("RewardInsert");
            if (rewardInsert) {
                rewardInsert.isShow = false;
                utils.showLog("显示激励插屏组件！");
            } else {
                utils.showLog("RewardInsert组件不存在!");
            }
        } else {
            utils.showLog("激励插屏没有创建！");
        }

    }

    public hideRewardInsert() {
        if (this._rewardInsertNode) {
            let rewardInsert: RewardInsert = this._rewardInsertNode.getComponent("RewardInsert");
            if (rewardInsert) {
                rewardInsert.hide();
                utils.showLog("隐藏激励插屏组件！");
            } else {
                utils.showLog("RewardInsert组件不存在!");
            }
        } else {
            utils.showLog("激励插屏没有创建！");
        }
    }

    // public ShowStatementRecomment(): cc.Node {
    //     if (PlatUtils.IsOPPO) {

    //         utils.showLog("curPosIdIndexNativeInsert:", this._curPosIdIndexNativeInser);

    //         let nativeInsertAd = this._nativeInsertAd[this._curPosIdIndexNativeInser];
    //         if (!nativeInsertAd) {

    //             if (utils.config.oppoconfig.nativeInsertIds
    //                 && utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
    //                 utils.showLog("创建原生结算页面广告。 posId:", utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]);

    //                 nativeInsertAd = qg.createNativeAd({
    //                     posId: utils.config.oppoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]
    //                 });

    //                 if (nativeInsertAd) {
    //                     this._nativeInsertAd.push(nativeInsertAd);

    //                     nativeInsertAd.onLoad((res) => {
    //                         if (res && res.adList && res.adList.length > 0) {
    //                             utils.showLog("原生原生结算页面资源拉取成功！");
    //                             utils.showLog(JSON.stringify(res));
    //                             res = JSON.parse(JSON.stringify(res));
    //                             let data = res.adList[0];
    //                             if (this._checkNativeDataValid(data)) {

    //                                 this._curPosIdIndexNativeInser = 0;
    //                                 // this._showNativeInsert(nativeInsertAd, data);
    //                                 // return this.cre;
    //                             } else {
    //                                 utils.showLog("原生结算页面资源不合法！");
    //                             }
    //                         }

    //                         utils.showLog("原生结算页面资源出错！");
    //                         this._curPosIdIndexNativeInser++;
    //                         if (this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
    //                             this.ShowStatementRecomment();
    //                         } else {
    //                             this._curPosIdIndexNativeInser = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("原生结算页面遍历完毕，无法展示！");

    //                         }
    //                     });

    //                     nativeInsertAd.onError((err) => {
    //                         utils.showLog("原生结算页面资源拉取失败！", err.code, err.msg);
    //                         this._curPosIdIndexNativeInser++;
    //                         if (this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
    //                             this.ShowStatementRecomment();
    //                         } else {
    //                             this._curPosIdIndexNativeInser = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("原生结算页面遍历完毕，无法展示！");

    //                         }
    //                     });
    //                 }
    //             }
    //         }

    //         if (nativeInsertAd) {
    //             nativeInsertAd.load();
    //         } else {
    //             this._curPosIdIndexNativeInser++;
    //             if (utils.config.oppoconfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.oppoconfig.nativeInsertIds.length) {
    //                 this.ShowStatementRecomment();
    //             } else {
    //                 this._curPosIdIndexNativeInser = 0;
    //                 // 原生广告遍历完毕
    //                 utils.showLog("原生插屏广告遍历完毕，无法展示！");
    //             }
    //         }
    //     }
    //     return null;
    // }


    private checkIsShowStatementAd() {
        if (utils.isSupportnavigateToMiniGame() && this.ServerConfig) {
            return true;
        }

        utils.showLog("当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
        return false;

    }


    /**
      * 创建结算页面推广组件
      */
    public ShowStatementRecomment(showNativeAd: boolean = true): cc.Node {
        if (this.checkIsShowStatementAd()) {

            if (!showNativeAd) {

                if (utils.config.otherconfig.crossWidget6) {
                    let node = cc.instantiate(utils.config.otherconfig.crossWidget6);
                    utils.showLog("只显示结算互推广告");
                    return node;

                } else {
                    utils.showLog("未找到预制体 crossWidget6, 请查看CommonUtils组件上是否赋值！");
                    return null;
                }

            } else {
                if (utils.config.otherconfig.statementRecomment) {
                    let node = cc.instantiate(utils.config.otherconfig.statementRecomment);

                    let statementRecomment: YZ_StatementRecommentAd = node.getComponent("YZ_StatementRecommentAd");
                    statementRecomment.showNativeAd = showNativeAd;
                    utils.showLog("显示结算互推和原生广告");
                    return node;

                } else {
                    utils.showLog("未找到预制体 StatementRecomment, 请查看CommonUtils组件上是否赋值！");
                    return null;
                }
            }
        } else {
            return null;
        }
    }




    _showNativeAd() {
        if (this._curNativeItem && cc.isValid(this._curNativeItem.node)) {
            this._curNativeItem.init(this.getNativeAdData());
        }

    }



    signleNativeAd: cc.Node = null;
    /**
     * 创建结算页面推广组件
     */
    public ShowSingleNativeAd(params?: any) {

        if (utils.config.otherconfig.singleNativeAd) {
            if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
                this.signleNativeAd.destroy();
            }
            this.signleNativeAd = cc.instantiate(utils.config.otherconfig.singleNativeAd);

            let nativeItem: YZ_NativeItem = this.signleNativeAd.getComponent("YZ_NativeItem");
            nativeItem.showType = 2;
            nativeItem.params = params;
            this._curNativeItem = nativeItem;

            if (params && params.parent) {
                params.parent.addChild(this.signleNativeAd, cc.macro.MAX_ZINDEX);
            }
            this.createNativeAd();
            utils.showLog("单个原生广告创建成功！");
            return this.signleNativeAd;
        } else {
            utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
            return null;
        }
    }

    /**
     * 显示结算广告
     * @param data 
     * @returns json{ type:(1:6元素互推，2:单个原生广告),node:节点}
     */
    showStatementAds(data?: any): any {

        let result: any = { "type": 0, "node": null };
        if (this.ServerConfig && this.ServerConfig.statement_type) {
            if (this.ServerConfig.statement_type === 4) {
                result.type = 2;
                result.node = this.ShowSingleNativeAd();
                utils.showLog("结算广告 >> 单个原生广告>>" + result.node.name);
            } else {
                this.ShowInterstitial();
            }

            return result;
            //     let isSycn = this.ServerConfig.st_sync;
            //     let node: cc.Node = null;
            //     let resType: number = 0;
            //     switch (type) {
            //         case 1:
            //             utils.showLog("结算广告 >> 只显示小游戏插屏广告");
            //             if (!this.checkInsertAdShow()) {
            //                 if (spareType && spareType > 0) {
            //                     switch (spareType) {
            //                         case 3:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 6个互推");
            //                             node = this.ShowStatementRecomment(false);
            //                             resType = 1;
            //                             break;
            //                         case 4:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 单个原生广告");
            //                             node = this.ShowSingleNativeAd();
            //                             resType = 2;
            //                             break;
            //                         case 5:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 3个互推+单个原生广告");
            //                             node = this.ShowStatementRecomment();
            //                             resType = 1;
            //                             break;
            //                     }
            //                 }
            //             } else {
            //                 this._createMiniGameInsertAd(true);
            //             }
            //             break;
            //         case 2:
            //             utils.showLog("结算广告 >> 显示插屏广告且判断优先级");
            //             if (!this.checkInsertAdShow()) {
            //                 if (spareType) {
            //                     switch (spareType) {
            //                         case 3:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 6个互推");
            //                             node = this.ShowStatementRecomment(false);
            //                             resType = 1;
            //                             break;
            //                         case 4:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 单个原生广告");
            //                             node = this.ShowSingleNativeAd();
            //                             resType = 2;
            //                             break;
            //                         case 5:
            //                             utils.showLog("结算广告 >> 小游戏插屏达到限制的次数 >> 显示备用组件 3个互推+单个原生广告");
            //                             node = this.ShowStatementRecomment();
            //                             resType = 1;
            //                             break;
            //                     }
            //                 }
            //             } else {
            //                 this.ShowInterstitial();
            //             }
            //             break;
            //         case 3:
            //             utils.showLog("结算广告 >> 显示插屏广告+6个互推");
            //             this.ShowInterstitial();
            //             node = this.ShowStatementRecomment(false);
            //             resType = 1;
            //             break;
            //         case 4:
            //             if (isSycn && isSycn == "true") {
            //                 utils.showLog("结算广告 >> 显示插屏广告+单个原生广告");
            //                 this.ShowInterstitial();
            //                 node = this.ShowSingleNativeAd();
            //             } else {
            //                 node = this.ShowSingleNativeAd();
            //                 utils.showLog("结算广告 >> 只显示单个原生广告");
            //             }
            //             resType = 2;
            //             break;
            //         case 5:
            //             if (isSycn && isSycn == "true") {
            //                 utils.showLog("结算广告 >> 显示插屏广告+ 3个互推+单个原生广告");
            //                 this.ShowInterstitial();
            //                 node = this.ShowStatementRecomment();
            //             } else {
            //                 utils.showLog("结算广告 >> 只显示 3个互推+单个原生广告");
            //                 node = this.ShowStatementRecomment();
            //             }
            //             resType = 1;
            //             break;
            //         case 6:
            //             if (isSycn && isSycn == "true") {
            //                 utils.showLog("结算广告 >> 显示滚动互推+原生广告");
            //                 node = this.ShowStatementRecomment(true);
            //             } else {
            //                 utils.showLog("结算广告 >> 只显示滚动互推");
            //                 node = this.ShowStatementRecomment();
            //             }
            //             resType = 1;
            //             break;
            //         default:
            //             utils.showLog("非法的结算广告类型，：" + type)
            //             break;
            //     }
            //     result.type = resType;
            //     result.node = node;
            //     return result;
        } else {
            utils.showLog("没有配置结算广告！");
            return result;
        }

    }


    _nativeTryGameNode: cc.Node = null;
    /**
     * 显示浮窗广告挂件
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
    public createNativeTryGameWidget(params: any = null) {

        if (this._nativeTryGameNode && cc.isValid(this._nativeTryGameNode)) {
            this._nativeTryGameNode.destroy();
        }
        let node = cc.instantiate(utils.config.otherconfig.nativeTryGameWidget);
        if (node) {
            this._nativeTryGameNode = node;
            this._nativeTryGameNode.zIndex = 9999;

        }
        node = this._nativeTryGameNode;
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
        node.active = true;
        if (this._nativeTryGameNode) {
            this._nativeTryGameNode.getComponent(NativeTryGamesWidget).init();
        }
    }



    /**
     * 隐藏浮动试玩挂件
     */
    public hideNativeTryGameWidget() {
        if (this._nativeTryGameNode && cc.isValid(this._nativeTryGameNode)) {
            this._nativeTryGameNode.destroy();
        }
    }


    /**
     * 是否支持原生模版广告
     * @returns 
     */
    private canShowNativeTemplateAd() {
        //@ts-ignore
        return qg.createCustomAd;
    }

    /**
     * 获取原生模版广告对象
     * @param type 广告类型：1:banner 2:插屏
     * @param id  广告ID
     */
    private getNativeTemplateAdStyle(type: number) {
        let style: any = {};
        let systemInfo = utils.oppoTool.SysInfo;
        switch (type) {
            case 1:
                style.width = "";
                style.top = "";
                style.left = "";
                break;
            case 2:
                style.width = "";
                style.top = (systemInfo.screenHeight - 400) / 2;
                style.left = "";
                break;
        }
        return style;
    }

    nativeTemplateBannerAd: any = null;

    /**
     * 创建原生模版Banner广告
     * @param index 
     * @returns 
     */
    private _createNativeTemplateBannerAd(index: number) {
        utils.showLog("_createNativeTemplateBannerAd : #index=" + index);

        YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.REQUEST, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

        if (!this.canShowNativeTemplateAd()) {
            utils.showLog("当前快应用版本不支持原生模版广告！");
            return;
        }
        if (index < utils.config.oppoconfig.bannerAdConfigs.length) {
            //@ts-ignore
            this.nativeTemplateBannerAd = qg.createCustomAd({
                adUnitId: utils.config.oppoconfig.bannerAdConfigs[index].id,
                style: this.getNativeTemplateAdStyle(1)
            });

            this.nativeTemplateBannerAd.onLoad(() => {
                this.nativeTemplateBannerAd.offLoad();
                utils.showLog("NativeTemplateBannerAd 广告加载成功");
                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.REQUEST_SUCCESS, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));
            });

            this.nativeTemplateBannerAd.onError((err) => {
                this.nativeTemplateBannerAd.offError();
                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.REQUEST_FAIL, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));

                utils.showLog("NativeTemplateBannerAd 广告异常：#erro=" + JSON.stringify(err));
                if (this._nativeIsClose) {
                    utils.showLog("隐藏了BANNER，不做任何处理！");
                    YouWanAnalytics.EventAd(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);
                    return;
                }
                let bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    YouWanAnalytics.EventAd(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.AD_ID_REQUEST_FAIL);
                    utils.showLog(">>>>>服务器配置不显示备用广告！");
                    return;
                }
                this.ShowBannerByConfigs(index + 1);
            });

            this.nativeTemplateBannerAd
                .show()
                .then(() => {
                    YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.bannerAdConfigs[index].id));
                    YouWanAnalytics.EventAd(YwAdType.NATIVE_TEMPLATE_BANNER, YwAdStatus.AD_ID_REQUEST_SUCCESS);

                    this.nativeTemplateBannerAd.offShow();
                    utils.showLog("NativeTemplateBannerAd show success");
                    this.hideBanner("template");
                })
                .catch((error) => {
                    utils.showLog("NativeTemplateBannerAd show fail with:" + error.errCode + "," + error.errMsg);
                });
        }
    }

    /**
     * 隐藏原生模版Banner
     */
    private hideNativeTemplateBannerAd() {
        utils.showLog("hideNativeTemplateBannerAd ");
        this.nativeTemplateBannerAd && this.nativeTemplateBannerAd.destroy();
        this.nativeTemplateBannerAd = null;
    }


    /**
     * 创建原生模版插屏广告
     * @param index 
     * @returns 
     */
    private _createNativeTemplateIntersitialAd(index: number) {
        utils.showLog("_createNativeTemplateIntersitialAd : #index=" + index);
        if (!this.canShowNativeTemplateAd()) {
            utils.showLog("当前快应用版本不支持原生模版广告！");
            return;
        }
        if (index < utils.config.oppoconfig.intersitialAdConfigs.length) {
            utils.showLog("nativetemplate style=" + this.getNativeTemplateAdStyle(2));

            //@ts-ignore
            let customAd = qg.createCustomAd({
                adUnitId: utils.config.oppoconfig.intersitialAdConfigs[index].id,
                style: this.getNativeTemplateAdStyle(2)
            });

            customAd.onLoad(() => {
                YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.REQUEST_SUCCESS, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));
                utils.showLog("NativeTemplateIntersitialAd 广告加载成功");
            });

            customAd.onError((err) => {
                utils.showLog("NativeTemplateIntersitialAd 广告异常：" + + JSON.stringify(err));
                this.ShowInterstitialByConfigs(index + 1);
            });

            customAd
                .show()
                .then(() => {
                    utils.showLog("NativeTemplateIntersitialAd show success");
                    this._insertLastShowTime = new Date().getTime();
                    let closeType = this.ServerConfig.intersititial_open_close_banner;
                    if (closeType && closeType > 0) {
                        utils.showLog("OPPO 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                        this.HideBanner();
                    }
                    YouWanAnalytics.EventAd(YwAdType.INTERSITITIAL, YwAdStatus.AD_ID_REQUEST_SUCCESS);
                    YouWanAnalytics.EventAdWithObj(YwAdType.INTERSITITIAL, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(utils.config.oppoconfig.intersitialAdConfigs[index].id));
                })
                .catch((error) => {
                    utils.showLog("NativeTemplateIntersitialAd show fail with:" + error.errCode + "," + error.errMsg);
                });
        }
    }

    public GameExit() { }

    public Share() { }
}
