import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import { NativeBannerInfo } from "./CommonConfig";
import CompatibleTool from "./CompatibleTool";
import YZ_NativeBanner from "./YZ_NativeBanner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentXiaoMi extends AdAgent {

    _bannerAd: any = null;
    _insertAd: any = null;
    _videoAd: any = null;

    _nativeBannerAd: any[] = [];
    _nativeInsertAd: any[] = [];
    _nativeSingleAd: any[] = [];

    nativeBannerAd: any = null;

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

    _isBannerShow: boolean = false;

    _isInsertAdShow: boolean = false;
    _isInsertAdLoaded: boolean = false;

    _isVideoLoaded: boolean = false;
    _isVideoShow: boolean = false;

    lastLastShowVideoTime: number = 0; //最后一次显示视频时间

    showNum: number = 0; // Banner广告展示次数
    showInsertNum: number = 0; // 插屏广告展示次数

    _showBannerCallBack: Function = null;
    _isNativeBannerShow: boolean = false; //原生广告展示，调用的隐藏


    public get ServerConfig() {
        if (PlatUtils.IsXiaoMi) {
            return utils.Tool_XiaoMi.ServerConfig;
        }
        return null;

    }

    public Init() {
        if (PlatUtils.IsXiaoMi) {
            utils.registerServerInitEvent(() => {
                this._initVideoAd();
            }, this);
        }
    }

    _initVideoAd() {
        if (!this._videoAd) {

            if (!utils.config.xiaomiConfig.videoId) {
                utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }

            let posId: string = utils.config.xiaomiConfig.videoId.trim();
            utils.showLog("video广告ID:" + posId);
            //@ts-ignore
            this._videoAd = qg.createRewardedVideoAd({
                adUnitId: posId
            });

            if (this._videoAd) {
                this._videoAd.onLoad((() => {
                    utils.showLog("激励视频加载成功!");
                    this._isVideoLoaded = true;
                }));

                this._videoAd.onError((err => {
                    utils.showLog("激励视频异常!" + `error: errorMsg: ${err.errMsg}, erroCode: ${err.errCode}`);
                    this._isVideoLoaded = false;
                }));

                this._videoAd.onClose(res => {
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

                // this._videoAd.load();
            }
        }
    }


    _nativeIsClose: boolean = false;

    _showBannerTimerId: number = 0;
    _delayShowBannerId: number = 0;

    canShowNativeBanner = true; //原生banner是否展示
    // nbclr:是否开启强制刷新

    //当前显示Banner的位置
    _curLocation: BannerLocation = BannerLocation.None;
    _isTimeRefresh: boolean = false;
    //启动定时器的时间
    _startBannerTimerTask: number = 0;
    _showBannerCount: number = 0;


    public ShowBanner(location: BannerLocation = null, args: any = null, isTimeRefresh: boolean = false) {
        if (PlatUtils.IsXiaoMi) {
            if (!this.ServerConfig) {
                utils.showLog("未请求到配置文件！");
                return;
            }

            if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                this.showNum++;
                if (this.showNum % 2 == 0) {
                    utils.showLog("测试模式>> 顺序展示原生Banner广告！");
                    this._createNativeBannerAd(this._showNativeBanner);
                } else {
                    utils.showLog("测试模式>> 顺序展示默认Banner广告！");
                    this._createMiniGameBannerAd(location);
                }
                return;
            }

            if (!this.checkBannerAdShow()) {
                this.HideBanner();
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
            // console.log("isTimeRefresh=" + isTimeRefresh);
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
            } else {
                if (!isTimeRefresh) {
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

                utils.showLog("banner 优先展示 >>>>" + this.ServerConfig.banner_first_ad);

                if (interval && interval > 0) {
                    utils.showLog("开启定时刷新 >>>>>>>>>" + interval);
                    //@ts-ignore
                    this._showBannerTimerId = setTimeout(() => {
                        utils.showLog(`定时${interval}秒调用showbanner`);
                        this.ShowBanner(this._curLocation, {}, true);
                    }, interval * 1000);
                }

                let closeCount = this.ServerConfig.banner_close_count ? this.ServerConfig.banner_close_count : 0;
                if (closeCount > 0 && utils.Tool_XiaoMi.bannerAdCloseCounts >= closeCount) {
                    utils.showLog(`banner 关闭次数达到${closeCount}次,banner今日不再显示！`);
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

    public HideBanner(location: BannerLocation = null) {
        if (PlatUtils.IsXiaoMi) {

            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);
            this._isBannerShow = false;
            this._nativeIsClose = true;

            if (this._bannerAd) {
                utils.showLog("隐藏小游戏Banner");
                this._bannerAd.hide();
            }
            this.canShowNativeBanner = false;
            if (this._nativeBannerNode) {
                utils.showLog("隐藏原生Banner");
                this._nativeBannerNode.active = false;
            }
        }
    }

    _nativeBannerInfo: NativeBannerInfo = null;
    /**
     * 获取当前banner配置
     */
    getNativeBannerInfo() {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return utils.config.xiaomiConfig.getNativeBannerInfo(this._curLocation);
    }




    _createMiniGameBannerAd(location: BannerLocation = null) {
        if (PlatUtils.IsXiaoMi) {
            this._isBannerShow = true;

            if (utils.config.xiaomiConfig
                && utils.config.xiaomiConfig.bannerId) {

                if (this._bannerAd) {
                    this._bannerAd.destroy();
                }
                let left = (utils.Tool_XiaoMi.SysInfo.screenWidth - 385) * 0.5;
                if (cc.winSize.height < cc.winSize.width) {
                    left = utils.Tool_XiaoMi.SysInfo.screenWidth * 0.5
                }
                let bannerStyle: any = {
                    left: left,
                    top: utils.Tool_XiaoMi.SysInfo.screenHeight - 58,
                    width: 385
                }
                if (this.getNativeBannerInfo()._alignType === "top") {
                    bannerStyle.top = 0;
                }
                //@ts-ignore
                this._bannerAd = qg.createBannerAd({
                    adUnitId: utils.config.xiaomiConfig.bannerId,
                    style: bannerStyle
                });
                utils.showLog("createBannerAd:" + this._bannerAd);


                utils.showLog("注册小游戏banner回调!");
                this._bannerAd.onError((err) => {
                    utils.showLog("xiaomi 小游戏Banner广告出错: " + err.code + err.msg);
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
                        }
                    }
                });

                this._bannerAd.onResize((res) => {
                    utils.showLog("xiaomi 小游戏Banner显示成功！");

                    if (this._nativeBannerNode) {
                        this._nativeBannerNode.active = false;
                    }
                    this._showBannerCallBack && this._showBannerCallBack();
                    this._showBannerCallBack = null;

                    // utils.showLog("xiaomi 小游戏Banner onResize！" + JSON.stringify(res));
                    // utils.showLog("xiaomi 小游戏Banner curStyle" + JSON.stringify(this._bannerAd.style));

                    // this._bannerAd.style.width = utils.Tool_XiaoMi.SysInfo.screenWidth;
                    this._bannerAd.style.left = (utils.Tool_XiaoMi.SysInfo.screenWidth - res.width) * 0.5;
                    if (this.getNativeBannerInfo()._alignType == "top") {
                        this._bannerAd.style.top = 0;
                    } else {
                        this._bannerAd.style.top = utils.Tool_XiaoMi.SysInfo.screenHeight - res.height;
                    }
                    // utils.showLog("xiaomi 小游戏Banner curStyle" + JSON.stringify(this._bannerAd.style));

                });

                this._bannerAd.onClose(() => {
                    utils._bannerCloseTime = new Date().getTime();
                    if (!this._isNativeBannerShow) {
                        utils.Tool_XiaoMi.countBannerCloseCount();
                        utils.showLog("xiaomi 小游戏Banner 广告隐藏,当前隐藏次数>" + utils.Tool_XiaoMi.bannerAdCloseCounts);
                    } else {
                        this._isNativeBannerShow = false;
                        utils.showLog("xiaomi 小游戏Banner 广告隐藏,来自原生的显示，不增加隐藏次数，当前隐藏次数>" + utils.Tool_XiaoMi.bannerAdCloseCounts);
                    }

                })





                if (this._bannerAd) {

                    this._bannerAd.show();
                    utils.showLog("xiaomi 小游戏Banner show");
                } else {
                    utils.showLog("xiaomi 小游戏Banner广告创建失败!");
                    if (this.ServerConfig.indexOf("default") > -1) {
                        this._curPosIdIndexNativeBanner = 0;
                        this._createNativeBannerAd(this._showNativeBanner.bind(this));
                    }
                }
            } else {
                utils.showLog("xiaomi 小游戏Banner广告配置信息错误!");
                let bannerInfo = this.getNativeBannerInfo();
                if (bannerInfo.st_banner_show_back_up == -1) {
                    utils.showLog("服务器配置不显示备用广告");
                    return;
                }
                if (this.ServerConfig.banner_first_ad.indexOf("default") > -1) {
                    this._curPosIdIndexNativeBanner = 0;
                    this._createNativeBannerAd(this._showNativeBanner.bind(this));
                }
            }
        }
    }

    _curNativeBannerInfo: any = {};
    _createNativeBannerAd(completeCallback: Function) {
        if (PlatUtils.IsXiaoMi) {

            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner);

            let nativeBannerAd = this._nativeBannerAd[this._curPosIdIndexNativeBanner];

            if (!nativeBannerAd) {
                if (utils.config.xiaomiConfig.nativeBannerIds
                    && utils.config.xiaomiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                    utils.showLog("创建原生广告Banner。 posId:" + utils.config.xiaomiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                    //@ts-ignore
                    nativeBannerAd = qg.createNativeAd({
                        adUnitId: utils.config.xiaomiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
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
                                            utils.showLog("隐藏小游戏Banner");
                                            this._bannerAd.hide();
                                        }
                                    } else {
                                        utils.showLog("已经隐藏banner不可重复展示")
                                    }
                                    return;
                                }
                            }

                            utils.showLog("原生Banner广告资源出错！");
                            this._curPosIdIndexNativeBanner++;
                            if (this._curPosIdIndexNativeBanner < utils.config.xiaomiConfig.nativeBannerIds.length) {
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
                            if (this._curPosIdIndexNativeBanner < utils.config.xiaomiConfig.nativeBannerIds.length) {
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
                if (utils.config.xiaomiConfig.nativeBannerIds && this._curPosIdIndexNativeBanner < utils.config.xiaomiConfig.nativeBannerIds.length) {
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



    /**
     * 显示视频广告
     * @param callback 视频回调
     */
    public ShowVideo(callback: Function) {
        if (PlatUtils.IsXiaoMi) {
            this._videoCallback = callback;

            if (!this._videoAd) {
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                this._initVideoAd();
            } else {
                // if (this._isVideoLoaded) {
                this._videoAd.show();
                // } else {
                //     if (this._videoCallback) {
                //         this._videoCallback(false, "暂无视频广告!");
                //         this._videoCallback = null;
                //     }
                //     this._videoAd.load();
                //     return;
                // }
            }
        }
    }

    /**
     * 显示插屏
     * @param location 
     */
    public ShowInterstitial(location: BannerLocation = null) {
        if (PlatUtils.IsXiaoMi) {
            if (!this.checkInsertAdShow()) {
                return;
            }


            let delayTime: number = 0;
            if (this.ServerConfig
                && this.ServerConfig.intersititia_delay_show_time) {
                delayTime = this.ServerConfig.intersititia_delay_show_time;
            }

            utils.showLog(`插屏广告延时展示！ delayTime:${delayTime}秒`);

            if (this.ServerConfig && this.ServerConfig.isTest && this.ServerConfig.isTest == "true") {
                this.showInsertNum++;
                // utils.showLog(this.showInsertNum % 2 == 0, "<<this.showInsertNum % 2 == 0");
                //@ts-ignore
                if (this.showInsertNum % 2 == 0) {
                    utils.showLog("测试模式>> 顺序展示原生插屏广告！");
                    this.nativeInserAdDelayCall();
                } else {
                    //@ts-ignore
                    this._createMiniGameInsertAd();
                }
                return;
            }

            if (this.ServerConfig) {
                if (location && location == BannerLocation.Pause) {
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        utils.showLog("暂停界面不延时展示！");
                        utils.showLog("优先展示原生插屏广告!");
                        this.nativeInserAdDelayCall();
                    } else {
                        utils.showLog("优先展示小游戏插屏广告!");
                        this._createMiniGameInsertAd();
                    }
                } else {
                    //@ts-ignore
                    if (this.ServerConfig.intersititial_first_ad == "native") {
                        utils.showLog("优先展示原生插屏广告!");
                        utils.delayCall(this.nativeInserAdDelayCall.bind(this), delayTime);
                    } else {
                        utils.showLog("优先展示小游戏插屏广告!");
                        utils.delayCall(this._createMiniGameInsertAd.bind(this), delayTime);
                    }
                }
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    _createMiniGameInsertAd() {

        this._isInsertShow = true;

        //@ts-ignore
        this._insertAd = qg.createInterstitialAd({
            adUnitId: utils.config.xiaomiConfig.insertId.trim()
        });

        if (this._insertAd) {
            this._insertAd.onLoad(() => {
                utils.showLog("插屏广告加载成功");
                if (this._isInsertShow) {
                    this._insertAd.show().then(() => {
                        utils.showLog("插屏广告展示成功!");
                        this._insertLastShowTime = new Date().getTime();
                    }).catch(function (err) {
                        utils.showLog(`插屏广告展示失败!, err=${JSON.stringify(err)}`);
                    });
                }
            })
            this._insertAd.onError((err) => {
                utils.showLog(`插屏广告监听异常!, err=${JSON.stringify(err)}`);
                if (this._isInsertShow) {
                    if (this.ServerConfig.intersititial_first_ad == "default") {
                        this._isInsertShow = false;
                        utils.showLog("开始显示原生插屏广告!");
                        this._curPosIdIndexNativeInser = 0;
                        utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                    }
                }
            })
        } else {
            utils.showLog("插屏广告未初始化!");
        }
    }

    _nativeInsertAdShowCount: number = 0;
    public nativeInserAdDelayCall() {
        utils.showLog("原生插屏广告: 当前点击次数=" + utils.Tool_XiaoMi.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititial_interval_time + "; 展示累计=" + this._nativeInsertAdShowCount);
        if (utils.Tool_XiaoMi.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
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

    _createNativeInsertAd(completeCallback: Function) {
        if (PlatUtils.IsXiaoMi) {

            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);

            if (utils.config.xiaomiConfig.nativeInsertIds
                && utils.config.xiaomiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                utils.showLog("创建原生插屏广告。 posId:" + utils.config.xiaomiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                //@ts-ignore
                let nativeInsertAd = qg.createNativeAd({
                    adUnitId: utils.config.xiaomiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]
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
                        if (this._curPosIdIndexNativeInser < utils.config.xiaomiConfig.nativeInsertIds.length) {
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
                        if (this._curPosIdIndexNativeInser < utils.config.xiaomiConfig.nativeInsertIds.length) {
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
                    if (utils.config.xiaomiConfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.xiaomiConfig.nativeInsertIds.length) {
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
       * 显示原生插屏组件
       */
    _showNativeInsert(nativeInsertAd: any, data: any) {
        if (PlatUtils.IsXiaoMi) {
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
                        this._insertLastShowTime = new Date().getTime();
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
    /**
 * 显示原生banner组件
 */
    _showNativeBanner(nativeBannerAd: any, data: any) {
        if (PlatUtils.IsXiaoMi) {
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




    _insertLastShowTime = 0;
    /**
     * 验证插屏是否能展示
     * 2、时间限制 默认30秒
     */
    private checkInsertAdShow(): boolean {
        let intervalTime = this.ServerConfig.intersititial_interval_time ? this.ServerConfig.intersititial_interval_time : 30;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._insertLastShowTime) / 1000;

        utils.showLog("xiaomi服务器插屏间隔显示时间为：" + intervalTime + "秒！");
        utils.showLog("xiaomi插屏当前广告间隔时间：" + interval + "秒！");

        if (intervalTime > 0 && interval < intervalTime) {
            utils.showLog("xiaomi插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }

        return true;
    }

    /**
     * 验证Banner是否能展示
     * 2、时间限制 默认30秒
     */
    private checkBannerAdShow(): boolean {
        let intervalTime = this.ServerConfig.hide_banner_interval_show_time ? this.ServerConfig.hide_banner_interval_show_time : 0;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - utils._bannerCloseTime) / 1000;

        utils.showLog("xiaomi服务器Banner关闭后间隔显示时间为：" + intervalTime + "秒！");
        utils.showLog("xiaomi-Banner关闭后当前广告间隔时间：" + interval + "秒！");

        if (intervalTime > 0 && interval < intervalTime) {
            utils.showLog("xiaomi-Banner关闭后显示的间隔少于" + intervalTime + "秒。Banner不显示");
            return false;
        }

        return true;
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
}
