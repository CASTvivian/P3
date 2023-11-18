import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import NativeTryGamesWidget from "./NativeTryGamesWidget";
import YZ_NativeBanner from "./YZ_NativeBanner";
import { NativeBannerInfo } from "./CommonConfig";
import CompatibleTool from "./CompatibleTool";
import YZ_NativeItem from "./YZ_NativeItem";
import YZ_NativeAdObject from "./YZ_NativeAdObject";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentVIVO extends AdAgent {

    _bannerAd: any = null;
    _insertAd: any = null;
    _videoAd: any = null;
    _nativeBannerAd: any[] = [];
    _nativeInsertAd: any[] = [];
    _nativeSingleAd: any[] = [];


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

    _isInsertAdShow: boolean = false;
    _isInsertAdLoaded: boolean = false;

    _isVideoLoaded: boolean = false;
    _isVideoShow: boolean = false;

    lastLastShowVideoTime: number = 0; //最后一次显示视频时间

    showNum: number = 0; // Banner广告展示次数
    showInsertNum: number = 0; // 插屏广告展示次数


    _curNativeItem: YZ_NativeItem = null;

    _nativeAdObject: YZ_NativeAdObject = null;
    _nativeAd: any = null;

    public get SysInfo() {
        return utils.Tool_Vivo.SysInfo;
    }

    public get ServerConfig() {
        if (PlatUtils.IsVIVO) {
            return utils.Tool_Vivo.ServerConfig;
        }
        return null;

    }

    _nativeBannerInfo: NativeBannerInfo = null;
    /**
        * 获取当前banner配置
        */
    getNativeBannerInfo() {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return utils.config.vivoconfig.getNativeBannerInfo(this._curLocation);
    }

    public Init() {
        if (PlatUtils.IsVIVO) {

            if (utils.Tool_Vivo.isOverMiniVersion("1084")) {
                //@ts-ignore
                qg.isSupportNativeAd = true;
            }

            utils.registerServerInitEvent(() => {
                if (utils.config.vivoconfig.showAd) {
                    this._initVideoAd();
                } else {
                    utils.showLog("广告开关关闭状态，所有广告不显示！要显示广告，请打开 CommonUtils 组件上VIVIO 配置下的广告开关！");
                }
            }, this);
        }
    }

    _initVideoAd() {
        if (!this._videoAd) {
            if (!utils.Tool_Vivo.isOverMiniVersion("1041")) {
                utils.showLog("当前版本不支持视频广告!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }

            if (!utils.config.vivoconfig.videoId) {
                utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }

            let posId: string = utils.config.vivoconfig.videoId.trim();
            utils.showLog("video广告ID:" + posId);
            //@ts-ignore
            this._videoAd = qg.createRewardedVideoAd({
                posId: posId
            });

            if (this._videoAd) {
                this._videoAd.onLoad((() => {
                    utils.showLog("激励视频加载成功!");
                    this._isVideoLoaded = true;

                    if (this._isVideoShow) {
                        var adshow = this._videoAd.show();
                        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                        adshow && adshow.then(() => {
                            this._isVideoLoaded = false;
                        }).catch(err => {
                            if (this._videoCallback) {
                                this._videoCallback(false, "暂无视频广告!");
                                this._videoCallback = null;
                            }
                            utils.showLog("视频播放失败！")
                        });
                    }
                }));

                this._videoAd.onError((err => {
                    utils.showLog("激励视频异常!" + err.errCode);
                    this._isVideoLoaded = false;
                    if (this._videoCallback) {
                        this._videoCallback(false, "暂无视频广告!");
                        this._videoCallback = null;
                    }
                }));

                this._videoAd.onClose(res => {
                    // setTimeout(() => {
                    //     utils.showLog(`延时调用加载视频！`);
                    this._videoAd.load();
                    // }, 500);
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
            }
        }
    }
    //当前显示Banner的位置
    _curLocation: BannerLocation = BannerLocation.None;
    ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null, isTimeRefresh: boolean = false) {
        if (!this.ServerConfig) {
            utils.showLog("未请求到配置文件！");
            return;
        }
        let oldLocation = this._curLocation;

        this._curLocation = location;


        //如果跳用位置切换之后，验证是不是通过定时器强制刷新数据，不是则先隐藏banner
        if (oldLocation != location) {
            this.HideBanner(location);
        }




        let curTime: number = new Date().getTime();
        let refresh_ad_time: number = (curTime - this._startBannerTimerTask) / 1000;

        let interval = this.ServerConfig.refresh_ad_time;

        if (args && args.isRefresh) {
            isTimeRefresh = true;
        } else if (interval && interval > 0) {
            if (refresh_ad_time > interval) {
                isTimeRefresh = true;
            }
        }

        // 判断当前位置是不是显示banner
        if (this.getNativeBannerInfo().is_show_banner == -1) {
            utils.showLog("当前位置配置为不展示banner!");
            this.HideBanner(location);
            return;
        } else if (this.getNativeBannerInfo().is_show_rec > -1) {
            utils.showLog("当前位置显示互推banner");
            if (utils.Tool_Vivo.canShowRecommend()) {
                this.HideBanner(location);
                utils.Tool_Vivo.showRecBanner();
                return;
            }
            utils.showLog("当前平台不支持互推banner");
        } else {
            if (!isTimeRefresh) {
                if (this.ServerConfig.nbclr && this.ServerConfig.nbclr == "true" && this._curNativeBannerInfo.nativeBannerAd) {
                    utils.showLog("服务器配置定时器刷新数据 ");
                    this._showNativeBanner(this._curNativeBannerInfo.nativeBannerAd, this._curNativeBannerInfo.data);
                    utils.showLog("开启定时刷新 >>>>>>>>>" + (interval - refresh_ad_time));
                    clearTimeout(this._showBannerTimerId);
                    clearTimeout(this._delayShowBannerId);
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(() => {
                        utils.showLog(`定时${interval}秒调用showbanner`);
                        this.ShowOldBanner(this._curLocation, {});
                    }, (interval - refresh_ad_time) * 1000);
                    return;
                }
            }
        }



        if (utils._tool_Vivo.isOverMiniVersion("1059")) {
            this.showNewBanner(location, args);
        } else {
            this.ShowOldBanner(location, args);
        }
    }

    _lastShowTime: number = 0;//上一次调用showBanner的时间
    _bannerTimeoutShow: number = 0;
    showNewBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        let curTime = new Date().getTime();

        let cap = this.ServerConfig ? this.ServerConfig.cap_show_banner_time : undefined;
        cap = cap ? cap : 15;
        if (((curTime - this._lastShowTime) / 1000) > cap) {
            this._lastShowTime = curTime;
            this.ShowOldBanner(location, args);
        } else {
            this._lastShowTime = curTime;
            clearTimeout(this._bannerTimeoutShow);
            this._bannerTimeoutShow = setTimeout(() => {
                utils.showLog("达到" + cap + "间隔，显示banner");
                this.ShowOldBanner(this._curLocation, args);
            }, cap * 1000);
            utils.showLog("1059以上展示banner必须间隔" + cap + "秒")
        }
    }

    _nativeIsClose: boolean = false;//原生banner是否已经被关闭
    _showBannerTimerId: number = 0;
    _delayShowBannerId: number = 0;


    _startBannerTimerTask: number = 0;
    public ShowOldBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {


        if (PlatUtils.IsVIVO) {
            if (!utils.config.vivoconfig.showAd) {
                return;
            }


            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);

            this._nativeIsClose = false;
            if (this.ServerConfig) {

                let interval = this.ServerConfig.refresh_ad_time;
                let bannerInfo = this.getNativeBannerInfo();

                if (interval && interval > 0) {
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(() => {
                        utils.showLog(`定时${interval}秒调用showbanner`);
                        this.ShowBanner(location, {}, true);
                    }, interval * 1000);
                }

                if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                    this.showNum++;
                    //@ts-ignore
                    if (this.showNum % 2 != 0 && qg.isSupportNativeAd) {
                        utils.showLog("测试模式>> 顺序展示原生Banner广告！");
                        this._createNativeBannerAd(this._showNativeBanner);
                    } else {
                        //@ts-ignore
                        utils.showLog("测试模式>>" + (qg.isSupportNativeAd ? "" : "平台不支持原生广告>>" + "顺序展示小游戏Banner广告！"));
                        this._createMiniGameBannerAd(location);
                    }
                    return;
                }

                if (this.ServerConfig.banner_first_ad) {
                    //@ts-ignore
                    if (this.ServerConfig.banner_first_ad == "native" && qg.isSupportNativeAd) {
                        utils.showLog("优先展示原生Banner广告!");

                        if (this.ServerConfig.intersititial_first_ad == "native") {
                            let timeOut = 1;
                            if (this.ServerConfig.native_banner_delay_time) {
                                timeOut = this.ServerConfig.native_banner_delay_time;
                            }
                            utils.showLog(`因为插屏也是优先展示原生，所以banner延迟显示${timeOut}秒`);
                            //@ts-ignore
                            this._delayShowBannerId = setTimeout(() => {
                                this._createNativeBannerAd(this._showNativeBanner);
                            }, timeOut * 1000);
                        } else {
                            this._createNativeBannerAd(this._showNativeBanner);
                        }
                    } else {
                        //@ts-ignore
                        utils.showLog("优先展示小游戏Banner广告，引擎" + (qg.isSupportNativeAd ? "支持" : "不支持") + "原生广告");
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





    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        if (PlatUtils.IsVIVO) {
            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            clearTimeout(this._bannerTimeoutShow);
            this._nativeIsClose = true;
            if (this._bannerAd) {
                var adhide = this._bannerAd.hide();

                adhide && adhide.then(() => {
                    console.log("banner广告隐藏成功");
                }).catch(err => {
                    console.log("banner广告隐藏失败", JSON.stringify(err));

                    var addestroy = this._bannerAd.destroy();
                    addestroy && addestroy.then(() => {
                        console.log("banner广告销毁成功");
                    }).catch(err => {
                        console.log("banner广告销毁失败", JSON.stringify(err));
                    });
                });
            }

            if (this._nativeBannerNode) {
                utils.showLog("隐藏原生Banner");
                this._nativeBannerNode.active = false;
            }


            //隐藏互推banner
            utils.Tool_Vivo && utils.Tool_Vivo.hideRecBanner();
        }
    }

    _tryIndex = 0;
    tryGameInfo: any;
    public showNativeTryGameWidget(params: any = null) {
        if (PlatUtils.IsVIVO) {
            utils.showLog("创建原生抖动广告。 posId:" + utils.config.vivoconfig.nativeTryGameIds[0], "  utils.tryGameDate", utils.tryGameDate, "needchange", utils.nativeNeedChange);
            if (utils.nativeNeedChange || !utils.tryGameDate) {
                if (utils.config.vivoconfig.nativeTryGameIds) {
                    //@ts-ignore
                    let tryGameAd = qg.createNativeAd({
                        posId: utils.config.vivoconfig.nativeTryGameIds[0]
                    });

                    utils.showLog("tryGameAd：" + tryGameAd)
                    if (tryGameAd) {
                        tryGameAd.onLoad((res) => {
                            utils.showLog("res", res)
                            utils.nativeNeedChange = false;
                            this.tryGameInfo = res.adList;
                            if (res && res.adList && res.adList.length > 0) {
                                utils.showLog("原生抖动试完广告资源拉取成功！");
                                utils.showLog(JSON.stringify(res));
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
                                    utils.tryGameDate.push({ "tryGameAd": tryGameAd, "date": this.tryGameInfo });
                                    if (utils._nativeTryGameNode) {
                                        utils._nativeTryGameNode.getComponent(NativeTryGamesWidget).init();
                                    }
                                }
                            }
                        });
                        tryGameAd.onError((err) => {
                            console.log("原生广告加载异常", JSON.stringify(err));
                        })
                        tryGameAd.load();
                    }
                } else {
                    utils.showLog("原生抖动id不存在")
                }
            }

            this.createNativeTryGameWidget(params);
        }

    }

    public ShowInterstitial(location: BannerLocation = null) {

        if (PlatUtils.IsVIVO) {
            if (!utils.config.vivoconfig.showAd) {
                return;
            }
            if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                this.showInsertNum++;
                // utils.showLog(this.showInsertNum % 2 == 0, "<<this.showInsertNum % 2 == 0");
                //@ts-ignore
                if (this.showInsertNum % 2 == 0 && qg.isSupportNativeAd) {
                    utils.showLog("测试模式>> 顺序展示原生插屏广告！");
                    this.nativeInserAdDelayCall();
                } else {
                    //@ts-ignore
                    utils.showLog("测试模式>>" + (qg.isSupportNativeAd ? "" : "平台不支持原生广告>>") + "顺序展示小游戏插屏广告！");
                    this._createMiniGameInsertAd();
                }
                return;
            }

            if (this.ServerConfig) {
                if (location && location == BannerLocation.Pause) {
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native" && qg.isSupportNativeAd) {
                        utils.showLog("暂停界面不延时展示！");
                        utils.showLog("优先展示原生插屏广告!");
                        this.nativeInserAdDelayCall();
                    } else {
                        utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                } else {
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native" && qg.isSupportNativeAd) {
                        utils.showLog("优先展示原生插屏广告!");
                        utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    } else {
                        utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                }
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    _nativeInsertAdShowCount: number = 0;
    public nativeInserAdDelayCall() {
        utils.showLog("原生插屏广告: 当前点击次数=" + utils.Tool_Vivo.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititial_interval_time + "; 展示累计=" + this._nativeInsertAdShowCount);
        if (utils.Tool_Vivo.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
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
        if (PlatUtils.IsVIVO) {

            this._videoCallback = callback;

            if (!utils.config.vivoconfig.showAd) {
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            this._isVideoShow = true;
            let curTime: number = new Date().getTime();
            let interval: number = (curTime - this.lastLastShowVideoTime) / 1000;
            let interval_time = 0;
            if (utils.ServerConfig && utils.ServerConfig.video_interval_time) {
                interval_time = utils.ServerConfig.video_interval_time;
            }
            if (interval > interval_time) {
                this.lastLastShowVideoTime = new Date().getTime();

                if (!this._videoAd) {
                    this._initVideoAd();
                } else {
                    if (this._isVideoLoaded) {

                        var adshow = this._videoAd.show();
                        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                        adshow && adshow.then(() => {
                            utils.showLog("视频显示成功!");
                            this._isVideoLoaded = false;
                        }).catch(err => {
                            utils.showLog("激励视频广告显示失败" + JSON.stringify(err));
                            if (this._videoCallback) {
                                this._videoCallback(false, "暂无视频广告!");
                                this._videoCallback = null;
                            }
                        });

                    } else {
                        this._isVideoShow = false;
                        if (this._videoCallback) {
                            this._videoCallback(false, "暂无视频广告!");
                            this._videoCallback = null;
                        }
                        this._videoAd.load();
                        return;
                    }
                }

            } else {
                utils.showLog("视频广告请求间隔小于60秒,直接返回false");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            }
        }
    }

    _createMiniGameInsertAd() {
        if (PlatUtils.IsVIVO) {
            this._isInsertShow = true;

            if (utils.config.vivoconfig
                && utils.config.vivoconfig.insertId) {

                // if (!this._insertAd) {
                //@ts-ignore
                this._insertAd = qg.createInterstitialAd({
                    posId: utils.config.vivoconfig.insertId
                });

                if (this._insertAd) {
                    utils.showLog("注册小游戏插屏广告回调！");
                    this._insertAd.onError(((err) => {
                        utils.showLog("vivo 小游戏插屏广告出错:" + err.errCode + err.errMsg);
                        if (this._isInsertShow) {
                            if (this.ServerConfig.intersititial_first_ad == "default") {
                                this._isInsertShow = false;

                                utils.showLog("开始显示原生插屏广告!");
                                this._curPosIdIndexNativeInser = 0;
                                utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                        }
                    }).bind(this));

                    // this._insertAd.onLoad((() => {
                    if (this._isInsertShow) {
                        // this._isInsertShow = false;
                        var adshow = this._insertAd.show();
                        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                        adshow && adshow.then(() => {
                            utils.showLog("vivo 小游戏插屏广告显示成功！");
                            this._isInsertShow = false;
                        }).catch(err => {
                            switch (err.code) {
                                case 30003:
                                    utils.showLog("新用户7天内不能曝光插屏，请将手机时间调整为7天后，退出游戏重新进入")
                                    break;
                                case 30009:
                                    utils.showLog("10秒内调用广告次数超过1次，10秒后再调用")
                                    // setTimeout(() => {
                                    //     show()
                                    // }, 10000);
                                    break;
                                case 30002:
                                    utils.showLog("加载广告失败，重新加载广告")
                                    break;
                                default:
                                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                                    utils.showLog("插屏广告展示失败")
                                    break;
                            }
                        });
                    }
                    // }).bind(this));
                }
                // } else {
                //     this._insertAd.load();
                // }

                if (!this._insertAd) {
                    utils.showLog("vivo 小游戏插屏广告创建失败！");
                    if (this.ServerConfig.intersititial_first_ad == "default") {
                        utils.showLog("开始显示原生插屏广告!");
                        this._curPosIdIndexNativeInser = 0;
                        utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            } else {
                utils.showLog("vivo 小游戏插屏广告配置信息错误!");
                if (this.ServerConfig.intersititial_first_ad == "default") {
                    utils.showLog("开始显示原生插屏广告!");
                    this._curPosIdIndexNativeInser = 0;
                    utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                }
            }
        }
    }

    _createMiniGameBannerAd(location: BannerLocation = null) {
        if (PlatUtils.IsVIVO) {
            this._isBannerShow = true;

            if (utils.config.vivoconfig
                && utils.config.vivoconfig.bannerId) {


                let oldBannerAd = this._bannerAd;
                if (oldBannerAd) {
                    var addestroy = oldBannerAd.destroy();
                    addestroy && addestroy.then(() => {
                        console.log("banner广告销毁成功");
                    }).catch(err => {
                        console.log("banner广告销毁失败", JSON.stringify(err));
                    });
                }
                // if (!this._bannerAd) {
                //@ts-ignore
                this._bannerAd = qg.createBannerAd({
                    posId: utils.config.vivoconfig.bannerId,
                    style: {}
                });

                if (this._bannerAd) {
                    utils.showLog("注册小游戏banner回调!");
                    this._bannerAd.onError(((err) => {
                        utils.showLog("VIVO 广告条加载失败! code : " + err.errCode + "; msg : " + err.errMsg);
                        let bannerInfo = this.getNativeBannerInfo();
                        if (bannerInfo.st_banner_show_back_up == -1) {
                            utils.showLog("服务器配置不显示备用广告");
                            return;
                        }
                        if (this._isBannerShow) {
                            this._isBannerShow = false;
                            if (this.ServerConfig.banner_first_ad == "default") {
                                this._curPosIdIndexNativeBanner = 0;
                                this._createNativeBannerAd(this._showNativeBanner.bind(this));
                            }
                        }
                    }).bind(this));


                } else {
                    if (this.ServerConfig.banner_first_ad == "default") {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                }
                // }

                if (this._bannerAd) {
                    let adshow = this._bannerAd.show();

                    adshow && adshow.then(() => {
                        utils.showLog("vivo小游戏banner广告展示成功");
                        if (this._nativeBannerNode) {
                            this._nativeBannerNode.active = false;
                        }
                    }).catch((err) => {
                        switch (err.code) {
                            case 30003:
                                utils.showLog("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入")
                                break;
                            case 30009:
                                utils.showLog("10秒内调用广告次数超过1次，10秒后再调用")
                                // setTimeout(() => {
                                //     show()
                                // }, 10000);
                                break;
                            case 30002:
                                utils.showLog("加载广告失败，重新加载广告")
                                break;
                            default:
                                // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                                utils.showLog("banner广告展示失败")
                                break;
                        }
                    });


                } else {
                    utils.showLog("vivo 小游戏Banner广告创建失败!");
                    if (this.ServerConfig.banner_first_ad == "default") {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                }
            } else {
                utils.showLog("vivo 小游戏Banner广告配置信息错误!");
                let bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                if (this.ServerConfig.banner_first_ad == "default") {
                    this._curPosIdIndexNativeBanner = 0;
                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                }
            }
        }
    }


    _curNativeBannerInfo: any = {};
    _createNativeBannerAd(completeCallback: Function) {
        if (PlatUtils.IsVIVO) {
            //@ts-ignore
            if (!qg.isSupportNativeAd) {
                utils.showLog("当前引擎不支持原生Banner广告！");
                return;
            }
            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner);

            if (utils.config.vivoconfig.nativeBannerIds
                && utils.config.vivoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                utils.showLog("创建原生广告Banner。 posId:" + utils.config.vivoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                //@ts-ignore
                let nativeBannerAd = qg.createNativeAd({
                    posId: utils.config.vivoconfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                });

                if (nativeBannerAd) {
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
                            if (this._checkNativeDataValid(data) || this.getNativeBannerInfo().show_st_banner == "true") {
                                this._curPosIdIndexNativeBanner = 0;
                                this._showNativeBanner(nativeBannerAd, data);
                                this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd;
                                this._curNativeBannerInfo.data = data;
                                // 删除当前广告
                                if (this._bannerAd) {
                                    var adhide = this._bannerAd.hide();

                                    adhide && adhide.then(() => {
                                        console.log("banner广告隐藏成功");
                                    }).catch(err => {
                                        console.log("banner广告隐藏失败", JSON.stringify(err));

                                        var addestroy = this._bannerAd.destroy();
                                        addestroy && addestroy.then(() => {
                                            console.log("banner广告销毁成功");
                                        }).catch(err => {
                                            console.log("banner广告销毁失败", JSON.stringify(err));
                                        });
                                    });
                                }
                                return;
                            }
                        }

                        utils.showLog("原生Banner广告资源出错！");
                        this._curPosIdIndexNativeBanner++;
                        if (this._curPosIdIndexNativeBanner < utils.config.vivoconfig.nativeBannerIds.length) {
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
                            if (this.ServerConfig.banner_first_ad == "native") {
                                utils.showLog("开始展示小游戏广告条！")
                                this._createMiniGameBannerAd();
                            }
                        }

                    });

                    let adLoad = nativeBannerAd.load();
                    adLoad && adLoad.then((res) => {
                        console.log("res", JSON.stringify(res));
                    }).catch(err => {
                        utils.showLog("原生Banner广告资源拉取失败！" + JSON.stringify(err));
                        if (this._nativeIsClose) {
                            utils.showLog("隐藏了BANNER，不做任何处理！");
                            return;
                        }
                        this._curPosIdIndexNativeBanner++;
                        if (this._curPosIdIndexNativeBanner < utils.config.vivoconfig.nativeBannerIds.length) {
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
                            if (this.ServerConfig.banner_first_ad == "native") {
                                utils.showLog("开始展示小游戏广告条！")
                                this._createMiniGameBannerAd();
                            }
                        }
                    })
                } else {
                    this._curPosIdIndexNativeBanner++;
                    if (utils.config.vivoconfig.nativeBannerIds && this._curPosIdIndexNativeBanner < utils.config.vivoconfig.nativeBannerIds.length) {
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
                        if (this.ServerConfig.banner_first_ad == "native") {
                            utils.showLog("开始展示小游戏广告条！")
                            this._createMiniGameBannerAd();
                        }
                    }
                }
            }
        }
    }

    _createNativeInsertAd(completeCallback: Function) {
        if (PlatUtils.IsVIVO) {
            //@ts-ignore
            if (!qg.isSupportNativeAd) {
                utils.showLog("当前引擎不支持原生插屏广告！");
                return;
            }
            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);



            if (utils.config.vivoconfig.nativeInsertIds
                && utils.config.vivoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                utils.showLog("创建原生插屏广告。 posId:" + utils.config.vivoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                //@ts-ignore
                let nativeInsertAd = qg.createNativeAd({
                    posId: utils.config.vivoconfig.nativeInsertIds[this._curPosIdIndexNativeInser]
                });

                if (nativeInsertAd) {
                    // this._nativeInsertAd.push(nativeInsertAd);

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
                        if (this._curPosIdIndexNativeInser < utils.config.vivoconfig.nativeInsertIds.length) {
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
                        utils.showLog("原生插屏广告创建失败！" + JSON.stringify(err));
                    });

                    let adLoad = nativeInsertAd.load();
                    adLoad && adLoad.then((res) => {
                        console.log("res", JSON.stringify(res));
                    }).catch(err => {
                        utils.showLog("原生插屏广告资源拉取失败！" + JSON.stringify(err));
                        this._curPosIdIndexNativeInser++;
                        if (this._curPosIdIndexNativeInser < utils.config.vivoconfig.nativeInsertIds.length) {
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
                    })
                } else {
                    this._curPosIdIndexNativeInser++;
                    if (utils.config.vivoconfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.vivoconfig.nativeInsertIds.length) {
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
    }

    /**
     * 显示原生banner组件
     */
    _showNativeBanner(nativeBannerAd: any, data: any) {
        if (PlatUtils.IsVIVO) {
            if (data) {
                utils.showLog("显示原生banner");

                if (cc.isValid(this._nativeBannerNode) && this._nativeBannerNode) {
                    this._nativeBannerNode.destroy();
                }


                // if (!cc.isValid(this._nativeBannerNode) || (!this._nativeBannerNode && utils.config.otherconfig.nativeBanner)) {
                utils.showLog("创建原生广告banner位");
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
        if (PlatUtils.IsVIVO) {
            if (data) {
                utils.showLog("显示原生插屏");
                if ((!cc.isValid(this._nativeInsertNode)) || !this._nativeInsertNode && utils.config.otherconfig.nativeInsert) {
                    utils.showLog("创建原生插屏广告位");
                    this._nativeInsertNode = cc.instantiate(utils.config.otherconfig.nativeInsert);
                    this._nativeInsertNode.position = CompatibleTool.position(cc.winSize.width / 2, cc.winSize.height / 2);
                    cc.director.getScene().addChild(this._nativeInsertNode, 9999);
                }

                if (this._nativeInsertNode) {
                    let nativeInsert = this._nativeInsertNode.getComponent("YZ_NativeInsert");
                    if (nativeInsert) {
                        this._nativeInsertAdShowCount = 0;
                        nativeInsert.init(nativeInsertAd, data);
                    } else {
                        utils.showLog("NativeInsert组件不存在!");
                    }
                } else {
                    utils.showLog("原生广告插屏位没有创建！");
                }

                if (!this.ServerConfig.show_insert_hide_banner || this.ServerConfig.show_insert_hide_banner != "false") {
                    utils.showLog("原生广告插屏展示后隐藏Banner！");
                    this.HideBanner();
                }
            }
        }
    }


    public ShowCloseBtnBanner(location: BannerLocation = BannerLocation.Home, args: any) {
        utils.showLog("ShowCloseBtnBanner >>>>>>>>>.");

        let isMoveBtn = 0;
        let btn = args.closeBtn;
        let winHeight = cc.winSize.height;
        if (this.ServerConfig) {
            if (this.ServerConfig.is_move_btn) {
                isMoveBtn = this.ServerConfig.is_move_btn;
            }
            utils.showLog(isMoveBtn == 0 ? "显示banner,且按钮在上面" : `显示Banner,按钮居底部且${isMoveBtn}毫秒后移动`);
            // if (!isMoveBtn || isMoveBtn == 0) {
            //     btn.y = -(winHeight / 2) + btn.height;
            //     this.ShowBanner(location, args);
            // } else {
            setTimeout(() => {
                // if (!this._bannerIsHide) {
                utils.showLog("延迟调用关闭按钮的Banner >>>>");
                this.ShowBanner(location, args);
                // } else {
                //     utils.showLog("当前Banner为隐藏状态，关闭按钮的Banner不显示 >>>>");
                // }
                var adY = 240;
                utils.showLog('utils - adY:' + adY);
                if (adY > 0 && btn) {
                    btn.y = -(winHeight / 2 - adY) + btn.height;
                    utils.showLog("btnClose.y" + btn.y);
                }
            }, isMoveBtn);


            // }
        }
    }


    // {"adList":[{"adId":0,"title":"快手","desc":"手机总是这么卡，如何解决","icon":"http://imgwsdl.vivo.com.cn/appstore/developer/icon/20190918/201909181113001599041.png",
    // "imgUrlList":["http://ads-marketing-vivofs.vivo.com.cn/NtBrJ9dueygDLoz8/material/201908/78707646401346ca9fc8398ff79850d220190809.jpg"],
    // "logoUrl":"","creativeType":0,"interactionType":2},
    // {"adId":1,"title":"快手","desc":"手机总是这么卡，如何解决","icon":"http://imgwsdl.vivo.com.cn/appstore/developer/icon/20190918/201909181113001599041.png",
    // "imgUrlList":["http://ads-marketing-vivofs.vivo.com.cn/NtBrJ9dueygDLoz8/material/201908/78707646401346ca9fc8398ff79850d220190809.jpg"],"logoUrl":"","creativeType":0,"interactionType":2},
    // {"adId":2,"title":"快手","desc":"手机总是这么卡，如何解决","icon":"http://imgwsdl.vivo.com.cn/appstore/developer/icon/20190918/201909181113001599041.png","imgUrlList":["http://ads-marketing-vivofs.vivo.com.cn/NtBrJ9dueygDLoz8/material/201908/78707646401346ca9fc8398ff79850d220190809.jpg
    _checkNativeDataValid(data: any) {
        if (!data) {
            return false;
        }

        return (data.icon || (data.imgUrlList && data.imgUrlList.length > 0));
    }
    _checkNativeInsertDataValid(data: any) {
        if (!data) {
            return false;
        }
        return (data.icon || (data.imgUrlList && data.imgUrlList.length > 0));
    }


    _checkNativeSignDataValid(data: any) {
        if (!data) {
            return false;
        }
        return (data.imgUrlList && data.imgUrlList.length > 0);
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



    _singleAdCreateTime: number = 0;


    /**
     * 创建单个原生广告
     * @param completeCallback 
     */
    createNativeAd(params: any = null, nativeItem?: YZ_NativeItem) {
        utils.showLog("_createNativeAd >>>>>");
        if (PlatUtils.IsVIVO) {
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

                if (utils.config.vivoconfig.nativeSingleAdIds
                    && utils.config.vivoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]) {
                    utils.showLog("创建原生广告。 posId:" + utils.config.vivoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]);
                    //@ts-ignore
                    nativeSingleAd = qg.createNativeAd({
                        posId: utils.config.vivoconfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]
                    });

                    if (nativeSingleAd) {
                        this._nativeSingleAd.push(nativeSingleAd);

                        nativeSingleAd.onLoad((res) => {
                            if (res && res.adList && res.adList.length > 0) {
                                utils.showLog("原生广告资源拉取成功！");
                                utils.showLog(JSON.stringify(res));
                                res = JSON.parse(JSON.stringify(res));
                                let data = res.adList[0];
                                if (this._checkNativeSignDataValid(data)) {
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
                            if (this._curPosIdIndexSingleNative < utils.config.vivoconfig.nativeSingleAdIds.length) {
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
                            if (this._curPosIdIndexSingleNative < utils.config.vivoconfig.nativeSingleAdIds.length) {
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
                if (utils.config.vivoconfig.nativeSingleAdIds && this._curPosIdIndexSingleNative < utils.config.vivoconfig.nativeSingleAdIds.length) {
                    this.createNativeAd();
                } else {
                    this._curPosIdIndexSingleNative = 0;
                    // 原生广告遍历完毕
                    utils.showLog("单个原生广告ID 遍历完毕，无法展示！");
                }
            }
        }
    }

    _showNativeAd() {
        if (this._curNativeItem && cc.isValid(this._curNativeItem.node)) {
            this._curNativeItem.init(this.getNativeAdData());
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




    _customAd: any = null;

    _refreshCustomAdTimerTask = null;

    _isHide: boolean = false;

    _lastLocation: string = "";
    /**
     * 显示模版广告
     * @param parmas 
     */
    public showCustomAd(parme?: any) {


        if (utils.config.vivoconfig.customAdInfos.length <= 0) {
            utils.showLog("服务器配置未配置模版广告！");
            return;
        }


        //@ts-ignore
        if (qg.createCustomAd) {
            clearTimeout(this._refreshCustomAdTimerTask);


            let customAdInfo = utils.config.vivoconfig.getCustomAdInfoInfo(parme.location);
            utils.showLog("当前位置 obj >>>", customAdInfo.customAdObj);

            if (customAdInfo.is_show_ad != "true") {
                utils.showLog("当前位置服务器配置为不显示模版广告！");
                return;
            }
            if (this._lastLocation != parme.location) {
                this.hideCustomAd();
            }
            if (customAdInfo.customAdObj != null) {
                this._customAd = customAdInfo.customAdObj;
                if (!customAdInfo.customAdObj.isShow()) {
                    utils.showLog("当前位置上次展示过原生模版，当前重新显示出来！");
                    customAdInfo.customAdObj.show().then(() => {
                        if (customAdInfo.hide_banner == "true") {
                            this.HideBanner();
                        }
                        utils.showLog("重新展示成功！");
                    }).catch((err) => {
                        customAdInfo.customAdObj.destroy();
                        customAdInfo.customAdObj = null;
                        utils.showLog('重新展示原生模板广告失败', JSON.stringify(err));
                        this.showCustomAd(parme);
                    });
                } else {
                    utils.showLog("当前位置的模版正在显示中，不执行加载！");
                }
                if (customAdInfo.refresh_time > 0) {
                    this._refreshCustomAdTimerTask = setTimeout(() => {
                        utils.showLog(`定时${customAdInfo.refresh_time}秒刷新原生模版`);
                        this.showCustomAd(parme)
                    }, customAdInfo.refresh_time * 1000);
                }
                return;
            }



            this._lastLocation = parme.location;
            this._isHide = false;
            let style: any = {};
            if (customAdInfo.top > 0) {
                style.top = customAdInfo.top / cc.winSize.height * this.SysInfo.screenHeight;
            } else if (customAdInfo.bottom > 0) {
                style.top = this.SysInfo.screenHeight - customAdInfo.height - customAdInfo.bottom / cc.winSize.height * this.SysInfo.screenHeight;
            }
            if (customAdInfo.left > 0) {
                style.left = customAdInfo.left / cc.winSize.width * this.SysInfo.screenWidth;
            } else if (customAdInfo.right > 0) {
                style.left = this.SysInfo.screenWidth - customAdInfo.width - customAdInfo.right / cc.winSize.width * this.SysInfo.screenWidth;
            }
            utils.showLog("custom ad style>>" + JSON.stringify(style));
            //@ts-ignore
            var _customAd = qg.createCustomAd({
                posId: customAdInfo.id,
                style: style
            });


            _customAd.onError(err => {
                try {
                    utils.showLog("原生模板广告加载失败", JSON.stringify(err));
                } catch (erro) {
                    console.log("模版异常：#errMsg=" + erro);
                }
            });

            _customAd.onClose(() => {
                utils.showLog("原生模板广告 onClose");
                _customAd.destroy();
                _customAd = null;
                customAdInfo.customAdObj = null;
            })

            _customAd.onLoad(() => {
                _customAd.offLoad();
                utils.showLog("原生模板广告加载成功！");
                this._customAd = _customAd;
                customAdInfo.customAdObj && customAdInfo.customAdObj.destroy();
                customAdInfo.customAdObj = _customAd;
                if (!this._isHide) {
                    _customAd.show().then(() => {
                        if (customAdInfo.hide_banner == "true") {
                            this.HideBanner();
                        }
                        utils.showLog('原生模板广告展示完成！');
                    }).catch((err) => {
                        utils.showLog('原生模板广告展示失败', JSON.stringify(err));
                    })
                } else {
                    utils.showLog('原生模板广告调用了隐藏，当前广告不显示！');
                }
            });


            if (customAdInfo.refresh_time > 0) {
                this._refreshCustomAdTimerTask = setTimeout(() => {
                    utils.showLog(`定时${customAdInfo.refresh_time}秒刷新原生模版`);
                    this.showCustomAd(parme)
                }, customAdInfo.refresh_time * 1000);
            }
        } else {
            utils.showLog("当前平台不支持原生模版广告！");
        }
    }


    /**
     * 显示模版广告
     * @param parmas 
     */
    public showCustomAdV2(parme?: any) {


        if (utils.config.vivoconfig.customAdInfos.length <= 0) {
            utils.showLog("服务器配置未配置模版广告！");
            return;
        }


        //@ts-ignore
        if (qg.createCustomAd) {
            clearTimeout(this._refreshCustomAdTimerTask);


            let customAdInfo = utils.config.vivoconfig.getCustomAdInfoInfo(parme.location);
            utils.showLog("当前位置的广告对象 >>>", customAdInfo.customAdObj);

            if (customAdInfo.is_show_ad != "true") {
                utils.showLog("当前位置服务器配置为不显示模版广告！");
                return;
            }

            var isRefresh = true;
            if (this._lastLocation != parme.location) {
                this.hideCustomAd();
            } else {
                if (customAdInfo.customAdObj != null) {
                    if (!customAdInfo.customAdObj.isShow()) {
                        utils.showLog("当前位置上次展示过原生模版，当前重新显示出来！");
                        isRefresh = false;
                        customAdInfo.customAdObj.show().then(() => {
                            if (customAdInfo.hide_banner == "true") {
                                this.HideBanner();
                            }
                            utils.showLog("重新展示成功！");
                        }).catch((err) => {
                            isRefresh = true;
                            customAdInfo.customAdObj.destroy();
                            customAdInfo.customAdObj = null;
                            utils.showLog('重新展示原生模板广告失败', JSON.stringify(err));
                            // this.showCustomAd(parme);
                        });
                    } else {
                        utils.showLog("当前位置的模版正在显示中，不执行加载！");
                    }
                    // if (customAdInfo.refresh_time > 0) {
                    //     this._refreshCustomAdTimerTask = setTimeout(() => {
                    //         utils.showLog(`定时${customAdInfo.refresh_time}秒刷新原生模版`);
                    //         this.showCustomAd(parme)
                    //     }, customAdInfo.refresh_time * 1000);
                    // }
                    // return;
                }
            }


            this._lastLocation = parme.location;
            this._isHide = false;
            let style: any = {};
            if (customAdInfo.top > 0) {
                style.top = customAdInfo.top / cc.winSize.height * this.SysInfo.screenHeight;
            } else if (customAdInfo.bottom > 0) {
                style.top = this.SysInfo.screenHeight - customAdInfo.height - customAdInfo.bottom / cc.winSize.height * this.SysInfo.screenHeight;
            }
            if (customAdInfo.left > 0) {
                style.left = customAdInfo.left / cc.winSize.width * this.SysInfo.screenWidth;
            } else if (customAdInfo.right > 0) {
                style.left = this.SysInfo.screenWidth - customAdInfo.width - customAdInfo.right / cc.winSize.width * this.SysInfo.screenWidth;
            }
            utils.showLog("custom ad style>>" + JSON.stringify(style));
            //@ts-ignore
            var _customAd = qg.createCustomAd({
                posId: customAdInfo.id,
                style: style
            });


            _customAd.onError(err => {
                try {
                    utils.showLog("原生模板广告加载失败", JSON.stringify(err));
                } catch (erro) {
                    console.log("模版异常：#errMsg=" + erro);
                }
            });

            _customAd.onClose(() => {
                utils.showLog("原生模板广告 onClose");
                _customAd.destroy();
                _customAd = null;
                customAdInfo.customAdObj = null;
            })

            _customAd.onLoad(() => {

                utils.showLog("原生模板广告加载成功！");
                this._customAd = _customAd;
                customAdInfo.customAdObj && customAdInfo.customAdObj.destroy();
                customAdInfo.customAdObj = _customAd;
                if (!this._isHide && isRefresh) {
                    _customAd.show().then(() => {
                        if (customAdInfo.hide_banner == "true") {
                            this.HideBanner();
                        }
                        utils.showLog('原生模板广告展示完成！');
                    }).catch((err) => {
                        utils.showLog('原生模板广告展示失败', JSON.stringify(err));
                    })
                } else {
                    utils.showLog('原生模板广告调用了隐藏或者当前不刷新广告，当前广告不显示！');
                }
            });


            if (customAdInfo.refresh_time > 0) {
                this._refreshCustomAdTimerTask = setTimeout(() => {
                    utils.showLog(`定时${customAdInfo.refresh_time}秒刷新原生模版`);
                    this.showCustomAd(parme)
                }, customAdInfo.refresh_time * 1000);
            }
        } else {
            utils.showLog("当前平台不支持原生模版广告！");
        }
    }


    /**
     * 隐藏模版广告
     */
    public hideCustomAd() {
        this._isHide = true;
        clearTimeout(this._refreshCustomAdTimerTask);
        if (this._customAd) {
            this._customAd.hide();
        }
    }


}