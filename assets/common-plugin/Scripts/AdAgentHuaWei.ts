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

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentHuaWei extends AdAgent {

    //@ts-ignore
    huawei: any = window.qg;

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
        if (utils.Tool_Huawei && utils.Tool_Huawei.ServerConfig) return utils.Tool_Huawei.ServerConfig;
        return {};
    }

    _nativeBannerInfo: NativeBannerInfo = null;
    /**
     * 获取当前banner配置
     */
    getNativeBannerInfo() {
        if (this._nativeBannerInfo && this._nativeBannerInfo.location == this._curLocation) {
            return this._nativeBannerInfo;
        }
        return utils.config.huaweiConfig.getNativeBannerInfo(this._curLocation);
    }

    public Init() {
        if (PlatUtils.IsHuaWei) {
            cc.director.on("IsDataInit", (() => {
                this._isDataInit = true;
                cc.director.off("IsDataInit");
            }), this)
            utils.registerServerInitEvent(() => {
                utils.showLog("HuaWei 广告代理组件初始化!");
                this._initVideoAd();
                // this._initInsertAd();
                // this._initLocalDate();
            }, this)
        }
    }


    bannerType: number = 1;
    /**
     * banner样式：1代表原生banner，2代表默认banner
     */
    banner_style_mod: Array<number> = [1, 2];


    intersititialType: number = 1;
    /**
     * 插屏样式：1代表原生插屏，2代表默认插屏，3代表原生icon
     */
    intersititial_style_mod: Array<number> = [1, 2, 3];

    /**
     * banner展示次数
     */
    bannerTimes: number = 0;
    /**
     * 插屏展示次数
     */
    intersititialTimes: number = 0;

    _initLocalDate() {
        if (!this.ServerConfig.banner_style_mod) {
            this.ServerConfig.banner_style_mod = [1, 2];
        }
        if (!this.ServerConfig.intersititial_style_mod) {
            this.ServerConfig.intersititial_style_mod = [1, 2, 3];
        }
        if (!this.ServerConfig.icon_jump_native) {
            this.ServerConfig.icon_jump_native = 1;
        }
        if (!this.ServerConfig.banner_style_level) {
            this.ServerConfig.banner_style_level = 2;
        }
        if (!this.ServerConfig.intersititial_style_level) {
            this.ServerConfig.intersititial_style_level = 2;
        }
        this.ServerConfig.intersititia_delay_show_time = 0;
        console.log("插屏延时展示，延时时间：" + this.ServerConfig.intersititia_delay_show_time);
        console.log("banner && inter", this.ServerConfig.banner_style_mod, this.ServerConfig.intersititial_style_mod)
    };


    _nativeIsClose: boolean = false;

    _showBannerTimerId: number = 0;
    _delayShowBannerId: number = 0;


    // nbclr:是否开启强制刷新

    //当前显示Banner的位置
    _curLocation: BannerLocation = BannerLocation.None;
    //启动定时器的时间
    _startBannerTimerTask: number = 0;
    public ShowBanner(location: BannerLocation = null, args: any = null, isTimeRefresh: boolean = false) {
        // return
        if (PlatUtils.IsHuaWei) {
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

                if (this.ServerConfig.banner_style_level) {
                    if (this.ServerConfig.banner_style_mod) {
                        if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 1) {
                            utils.showLog("banner_style_mod 为 1，展示原生banner");
                            this._createNativeBannerAd(this._showNativeBanner);
                        }
                        else if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 2) {
                            utils.showLog("banner_style_mod 为 2，展示默认banner");
                            this._createMiniGameBannerAd(location);
                        }
                        else {
                            utils.showLog("banner_style_mod 配置出错！")
                        }
                    }
                    else {
                        utils.showLog("服务器没有配置 banner_style_mod 字段！！")
                        this.ServerConfig.banner_style_level = 0
                        this.ShowBanner(location);
                    }
                    this.bannerTimes++;
                    if (this.bannerTimes % this.ServerConfig.banner_style_level == 0) {
                        this.bannerType++;
                        this.bannerType = this.bannerType > 2 ? 1 : this.bannerType;
                    }
                }
                else if (this.ServerConfig.banner_first_ad) {
                    if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
                        utils.showLog("优先展示原生Banner广告!");
                        if (this.ServerConfig.intersititial_first_ad == "native") {
                            let timeOut = 0;
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
                        utils.showLog("优先展示小游戏Banner广告!");
                        this._createMiniGameBannerAd(location);
                    }
                } else {
                    this._createNativeBannerAd(this._showNativeBanner);
                }
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    public HideBanner(location: BannerLocation = null) {
        if (PlatUtils.IsHuaWei) {

            clearTimeout(this._showBannerTimerId);
            clearTimeout(this._delayShowBannerId);

            if (this._bannerAd) {
                utils.showLog("隐藏小游戏Banner");
                this._bannerAd.hide();
            }

            if (this._nativeBannerNode) {
                utils.showLog("隐藏原生Banner");
                this._nativeBannerNode.active = false;
            }
        }
    }


    tryGameAdArr: any[] = [];
    public showNativeTryGameWidget() {
        if (PlatUtils.IsHuaWei) {
            utils.showLog("显示原生icon nativeNeedChange=", utils.nativeNeedChange, "  utils.tryGameDate", utils.tryGameDate, "utils.config.huaweiConfig.nativeTryGameIds", utils.config.huaweiConfig.nativeTryGameIds)
            if (utils.nativeNeedChange || !utils.tryGameDate) {
                if (utils.config.huaweiConfig.nativeTryGameIds) {
                    let len = utils.config.huaweiConfig.nativeTryGameIds.length;
                    utils.showLog("len:" + len);
                    for (let i = 0; i < len; i++) {
                        if (!this.tryGameAdArr[i]) {
                            let posId = utils.config.huaweiConfig.nativeTryGameIds[i];
                            utils.showLog("创建原生icon。 posId:" + posId);
                            //@ts-ignore
                            let tryGameAd = qg.createNativeAd({
                                adUnitId: posId,
                                success: (code) => {
                                    console.log("loadNativeAd loadNativeAd : success");
                                },
                                fail: (data, code) => {
                                    console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                                },
                                complete: () => {
                                    console.log("loadNativeAd loadNativeAd : complete");
                                }
                            });

                            if (tryGameAd) {
                                tryGameAd.onLoad((res) => {
                                    utils.nativeNeedChange = false
                                    console.log("原生icon加载成功");
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
                                            else {
                                                this.createNativeTryGameWidget();
                                            }
                                        }
                                        utils.showLog("原生icon广告资源拉取成功，是否可以添加广告" + canAdd);
                                        utils.showLog(JSON.stringify(res));
                                    }
                                });
                                tryGameAd.onError((err) => {
                                    utils.showLog("原生icon广告资源拉取失败！" + JSON.stringify(err));
                                    utils.nativeNeedChange = true;

                                    if (this.ServerConfig.intersititial_style_level) {
                                        if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 3) {
                                            utils.showLog("开始展示原生插屏！");
                                            utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                                        }
                                    }
                                    tryGameAd.destroy();
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
            this.createNativeTryGameWidget();
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
            widget.updateAlignment();
        }
        else {
            node.parent = cc.director.getScene();
            if (utils.otherConfig && utils.otherConfig.group) {
                node.group = utils.otherConfig.group;
            }
            widget.enabled = false;
            node.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        }
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

    _isDataInit: boolean = false;
    _canShowNativeSplashView(callBack) {
        if (!this._isDataInit) {
            utils.showLog("广告数据未初始化完成，设置回调>>>>>");
            cc.director.off("IsDataInit");
            let call = callBack;
            cc.director.on("IsDataInit", (() => {
                utils.showLog("回调成功,展示开屏广告>>>>>");
                this._isDataInit = true;
                this.showNativeSplashView(call);
                cc.director.off("IsDataInit");
            }), this)
            return false;
        }
        return true;
    }

    public showNativeSplashView(callBack: Function = null) {
        if (!this._canShowNativeSplashView(callBack)) return;
        if (PlatUtils.IsHuaWei) {
            // utils.config.huaweiConfig.nativeSplashId = "testu7m3hc4gvm";
            utils.showLog("显示开屏广告,广告ID ", utils.config.huaweiConfig.nativeSplashId)

            if (utils.config.huaweiConfig.nativeSplashId) {
                let posId = utils.config.huaweiConfig.nativeSplashId;
                utils.showLog("创建原生开屏广告。 posId:" + posId);
                //@ts-ignore
                let splashView = qg.createNativeAd({
                    adUnitId: posId,
                    success: (code) => {
                        console.log("loadNativeAd loadNativeAd : success");
                    },
                    fail: (data, code) => {
                        console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                    },
                    complete: () => {
                        console.log("loadNativeAd loadNativeAd : complete");
                    }
                });

                if (splashView) {
                    splashView.onLoad((res) => {
                        if (res && res.adList && res.adList.length > 0) {
                            res = JSON.parse(JSON.stringify(res));
                            let adId = res.adList[0].adId
                            utils.showLog("adId:" + adId);
                            utils.showLog("原生开屏广告资源拉取成功:" + JSON.stringify(res));
                            let data = res.adList[0];
                            this._creatNativeSplashView(splashView, data);

                            if (callBack) {
                                cc.director.on("SplashViewOff", (() => {
                                    callBack();
                                    cc.director.off("SplashViewOff");
                                }), this);
                            }
                        }
                    });
                    splashView.onError((err) => {
                        if (callBack) {
                            callBack();
                        }
                        utils.showLog("原生开屏广告资源拉取失败！" + JSON.stringify(err));
                        splashView.destroy();
                    });
                    splashView.load();
                }
                else {
                    if (callBack) {
                        callBack();
                    }
                    utils.showLog("原生开屏广告创建失败!");
                }
            }
            else {
                if (callBack) {
                    callBack();
                }
                utils.showLog("原生开屏广告ID配置有误！！");
            }
        }
    }

    _nativeSplashNode: cc.Node = null;
    /**
     * 显示原生开屏组件
     */
    _creatNativeSplashView(splashView: any, data: any) {
        if (PlatUtils.IsHuaWei) {
            if (data) {
                if (!cc.isValid(this._nativeSplashNode) && utils.config.otherconfig.nativeSplashView) {
                    utils.showLog("创建原生插屏广告位");
                    this._nativeSplashNode = cc.instantiate(utils.config.otherconfig.nativeSplashView);
                    this._nativeSplashNode.position = CompatibleTool.position(cc.winSize.width / 2, cc.winSize.height / 2);
                    cc.director.getScene().addChild(this._nativeSplashNode, 999999);
                }

                if (this._nativeSplashNode) {
                    let nativeSplash = this._nativeSplashNode.getComponent("YZ_NativeSplashView");
                    if (nativeSplash) {

                        nativeSplash.init(splashView, data);

                        // utils.HuaweiTool.countInserShowCount();
                        // utils.showLog("原生插屏显示成功，当前显示次数=" + utils.HuaweiTool.insertAdShowCounts);
                    } else {
                        cc.director.emit("SplashViewOff");
                        utils.showLog("NativeSplashView组件不存在!");
                    }
                } else {
                    cc.director.emit("SplashViewOff");
                    utils.showLog("原生开屏广告没有创建成功！");
                }
            }
        }
    }

    insertTimeID: number = 0;
    public ShowInterstitial(location: BannerLocation = null) {
        // utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
        if (PlatUtils.IsHuaWei) {
            if (this.ServerConfig) {

                if (!this.checkInsertAdShow()) return;

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
                    if (this.ServerConfig.intersititial_style_level) {
                        if (this.ServerConfig.intersititial_style_mod) {
                            if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
                                utils.showLog("intersititial_style_mod 为 1，展示原生插屏");
                                utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                            else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
                                utils.showLog("intersititial_style_mod 为 2，展示默认插屏");
                                this._createMiniGameInsertAd();
                            }
                            else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 3) {
                                utils.showLog("intersititial_style_mod 为 2，展示原生icon");
                                this.showNativeTryGameWidget();
                            }
                            else {
                                utils.showLog("banner_style_mod 配置出错！")
                            }
                        }
                        else {
                            utils.showLog("服务器没有配置 banner_style_mod 字段！！")
                            this.ServerConfig.intersititial_style_level = 0
                            this.ShowInterstitial(location);
                        }
                        setTimeout(() => {
                            this.intersititialTimes++;
                            if (this.intersititialTimes % this.ServerConfig.intersititial_style_level == 0) {
                                this.intersititialType++;
                                this.intersititialType = this.intersititialType > 3 ? 1 : this.intersititialType;
                            }
                        }, 3000);
                    }
                    else if (this.ServerConfig.intersititial_first_ad == "native") {
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
        // utils.showLog("原生插屏广告: 当前点击次数=" + utils.HuaweiTool.NativeInsertAdClickTimes + "; 点击次数限制=" + this.ServerConfig.intersititia_click_count + "; 展示次数间隔=" + this.ServerConfig.intersititia_show_interval + "; 展示累计=" + this._nativeInsertAdShowCount);
        // if (utils.HuaweiTool.NativeInsertAdClickTimes >= (this.ServerConfig.intersititia_click_count || 0)) {
        //     // 每日点击次数到达上限，限制展示次数
        //     if (this._nativeInsertAdShowCount >= (this.ServerConfig.intersititia_show_interval || 0)) {
        // 可以展示
        this._createNativeInsertAd(this._showNativeInsert);
        //     } else {
        //         // 不能展示
        //         this._nativeInsertAdShowCount++;
        //     }
        // } else {
        //     this._createNativeInsertAd(this._showNativeInsert);
        // }
    }

    public ShowVideo(callback: Function) {
        if (PlatUtils.IsHuaWei) {
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

                if (!this._videoAd) {
                    this._initVideoAd();
                }

                if (this._videoAd && this._videoLoaded) {
                    this._videoAd.show();
                    return;
                }
            }

            utils.showLog("暂无视频广告!");
            this._videoAd.load();
            if (this._videoCallback) {
                this._videoCallback(false, "暂无视频广告!");
                this._videoCallback = null;
            }
        }
    }

    _initVideoAd() {
        if (!this._videoAd) {
            if (utils.config.huaweiConfig.videoId) {

                utils.showLog("视频广告初始化：ID=" + utils.config.huaweiConfig.videoId);
                this._videoAd = this.huawei.createRewardedVideoAd({
                    adUnitId: utils.config.huaweiConfig.videoId,
                    success: (code) => {
                        console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd: success");
                    },
                    fail: (data, code) => {
                        console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd fail: " + data + "," + code);
                    },
                    complete: () => {
                        console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd complete");
                    }
                });


                let self = this;
                if (this._videoAd) {
                    utils.showLog("初始化注册视频回调!");


                    this._videoAd.onLoad(function () {
                        utils.showLog("激励视频加载成功");
                        self._videoLoaded = true;
                    })

                    this._videoAd.onError((err) => {
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
                            utils.showLog("延迟3秒重新加载视频广告");
                        }, 3000);

                        if (res.isEnded) {
                            this.lastLastShowVideoTime = new Date().getTime();
                            utils.showLog('激励视频广告完成，发放奖励');
                            if (self._videoCallback) {
                                self._videoCallback(true, "");
                                self._videoCallback = null;
                            }
                        } else {
                            utils.showLog('激励视频广告取消关闭，不发放奖励');
                            if (self._videoCallback) {
                                self._videoCallback(false, "观看完视频才能获得奖励!");
                                self._videoCallback = null;
                            }
                        }
                    });

                    this._videoAd.load();
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

        utils.showLog("Huawei服务器插屏最大显示次数为：" + maxShowCount + ",间隔显示时间为：" + intervalTime + "秒！");
        // utils.showLog("Huawei插屏当前广告显示次数：" + utils.Tool_Huawei.insertAdShowCounts + "次，间隔时间：" + interval + "秒！");
        // if (maxShowCount > 0 && utils.HuaweiTool.insertAdShowCounts >= maxShowCount) {
        //     utils.showLog("Huawei插屏广告显示的次数达到" + maxShowCount + "次。插屏不显示");
        //     return false;
        // }

        if (intervalTime > 0 && interval < intervalTime) {
            utils.showLog("Huawei插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }

        return true;
    }

    /**
     * 验证是否第一次创建插屏
     */
    miniInserAdIsCreate: boolean = false;
    /**
     * 创建小程序插屏广告
     * @param isUnique 是否唯一展示 不轮询显示原生
     */
    // _createMiniGameInsertAd(isUnique: boolean = false) {
    //     if (PlatUtils.IsHuaWei) {

    //         if (isUnique) {
    //             if (!this.checkInsertAdShow()) return;
    //         }
    //         this._isInsertShow = true;

    //         if (utils.config.huaweiConfig
    //             && utils.config.huaweiConfig.insertId) {


    //             //@ts-ignore
    //             let _insertAd = qg.createInterstitialAd({
    //                 adUnitId: utils.config.huaweiConfig.insertId
    //             });
    //             utils.showLog("小游戏插屏ID：", utils.config.huaweiConfig.insertId);
    //             if (_insertAd) {
    //                 utils.showLog("注册小游戏插屏广告回调！");
    //                 _insertAd.onError(((err) => {
    //                     utils.showLog("华为 小游戏插屏广告出错:" + JSON.stringify(err));
    //                     if (this._isInsertShow && !isUnique) {
    //                         if (this.ServerConfig.intersititial_style_level) {
    //                             if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
    //                                 utils.showLog("开始展示原生插屏！");
    //                                 utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
    //                             }
    //                             else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
    //                                 utils.showLog("开始展示原生icon！");
    //                                 this.showNativeTryGameWidget();
    //                             }
    //                         }
    //                         else if (this.ServerConfig.intersititial_first_ad == "default") {
    //                             this._isInsertShow = false;
    //                             utils.showLog("开始显示原生插屏广告!");
    //                             this._curPosIdIndexNativeInser = 0;
    //                             utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
    //                         }
    //                         else {
    //                             utils.showLog("开始展示原生icon！");
    //                             this.showNativeTryGameWidget();
    //                         }
    //                     }
    //                     _insertAd.offError();
    //                 }).bind(this));

    //                 _insertAd.onLoad((() => {
    //                     utils.showLog("Huawei 小程序插屏广告加载成功!");
    //                     if (this._isInsertShow) {
    //                         this._isInsertShow = false;
    //                         _insertAd.show();

    //                         //onShow
    //                         this._isInsertShow = false;
    //                         // utils.Tool_Huawei.countInserShowCount();
    //                         this._insertLastShowTime = new Date().getTime();
    //                         let closeType = this.ServerConfig.intersititial_open_close_banner;
    //                         if (closeType && closeType > 0) {
    //                             utils.showLog("Huawei 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
    //                             this.HideBanner();
    //                         }
    //                     }
    //                     _insertAd.offLoad();
    //                 }).bind(this));

    //                 // _insertAd.onClose((() => {
    //                 //     utils.showLog("关闭插屏广告，展示banner")
    //                 //     this.ShowBanner();
    //                 // }).bind(this));

    //                 _insertAd.load();
    //             }


    //             if (!_insertAd) {
    //                 utils.showLog("Huawei小游戏插屏广告创建失败！");
    //                 if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
    //                     utils.showLog("开始显示原生插屏广告!");
    //                     this._curPosIdIndexNativeInser = 0;
    //                     utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
    //                 }
    //             }
    //         } else {
    //             utils.showLog("Huawei 小游戏插屏广告配置信息错误!");
    //             if (this.ServerConfig.intersititial_first_ad == "default" && !isUnique) {
    //                 utils.showLog("开始显示原生插屏广告!");
    //                 this._curPosIdIndexNativeInser = 0;
    //                 utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
    //             }
    //         }
    //     }
    // }

    _isInsertLoad: boolean = false;
    _canInsertShow: boolean = false;
    _initInsertAd() {
        if (!this._insertAd) {
            if (utils.config.huaweiConfig
                && utils.config.huaweiConfig.insertId) {


                //@ts-ignore
                this._insertAd = qg.createInterstitialAd({
                    adUnitId: utils.config.huaweiConfig.insertId
                });
                utils.showLog("小游戏插屏ID：", utils.config.huaweiConfig.insertId);
                if (this._insertAd) {
                    utils.showLog("注册小游戏插屏广告回调！");
                    this._insertAd.onError(((err) => {
                        utils.showLog("华为 小游戏插屏广告出错:" + JSON.stringify(err));
                        if (this._canInsertShow) {
                            if (this.ServerConfig.intersititial_style_level) {
                                if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
                                    utils.showLog("开始展示原生插屏！");
                                    utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                                }
                                else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
                                    utils.showLog("开始展示原生icon！");
                                    this.showNativeTryGameWidget();
                                }
                            }
                            else if (this.ServerConfig.intersititial_first_ad == "default") {
                                this._isInsertShow = false;
                                utils.showLog("开始显示原生插屏广告!");
                                this._curPosIdIndexNativeInser = 0;
                                utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                            else {
                                utils.showLog("开始展示原生icon！");
                                this.showNativeTryGameWidget();
                            }
                            this._canInsertShow = false;
                        }
                        this._insertAd.destroy();
                        this._insertAd = null;
                    }).bind(this));

                    this._insertAd.onLoad((() => {
                        utils.showLog("Huawei 小程序插屏广告加载成功! #_canInsertShow=" + this._canInsertShow);
                        this._isInsertLoad = true;
                        // utils.Tool_Huawei.countInserShowCount();
                        if (this._canInsertShow) {
                            this._insertLastShowTime = new Date().getTime();
                            let closeType = this.ServerConfig.intersititial_open_close_banner;
                            if (closeType && closeType > 0) {
                                utils.showLog("Huawei 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
                                this.HideBanner();
                            }
                            this._insertAd.show();
                        }
                    }).bind(this));

                    this._insertAd.onClose((() => {
                        utils.showLog("huawei 小程序插屏广告关闭")
                        this._isInsertLoad = false;
                        this._canInsertShow = false;
                        this.ShowBanner();
                        // setTimeout(() => {
                        //     this._insertAd.load();
                        // }, 3000);
                    }).bind(this));


                }

                if (!this._insertAd) {
                    utils.showLog("Huawei小游戏插屏广告创建失败！");
                    if (this._canInsertShow) {
                        if (this.ServerConfig.intersititial_style_level) {
                            if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 2) {
                                utils.showLog("开始展示原生插屏！");
                                utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            }
                            else if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] == 1) {
                                utils.showLog("开始展示原生icon！");
                                this.showNativeTryGameWidget();
                            }
                        }
                        else if (this.ServerConfig.intersititial_first_ad == "default") {
                            this._isInsertShow = false;
                            utils.showLog("开始显示原生插屏广告!");
                            this._curPosIdIndexNativeInser = 0;
                            utils.delayCall(this.nativeInserAdDelayCall.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                        }
                        else {
                            utils.showLog("开始展示原生icon！");
                            this.showNativeTryGameWidget();
                        }
                        this._canInsertShow = false;
                    }
                }
            } else {
                utils.showLog("Huawei 小游戏插屏广告配置信息错误!");
            }
        }
    }

    _createMiniGameInsertAd() {
        if (PlatUtils.IsHuaWei) {
            utils.showLog("[展示小游戏插屏广告]");

            if (this.ServerConfig) {
                this._canInsertShow = true;
                if (!this._insertAd) {
                    this._initInsertAd();
                }

                if (this._insertAd) {
                    this._insertAd.load();
                    return;
                }
            }
        }
    }

    _createMiniGameBannerAd(location: BannerLocation = null) {

        this._isBannerShow = true;
        if (!utils.config.huaweiConfig.bannerId) {
            utils.showLog("BannerID 未正确配置！");
            return;
        }

        if (!this._bannerAd) {
            //@ts-ignore
            let top = utils.Tool_Huawei.SysInfo.safeArea.height - 57;
            utils.showLog("banner  =====#top=" + utils.Tool_Huawei.SysInfo.safeArea.height + " #top=" + top);
            this._bannerAd = this.huawei.createBannerAd({
                adUnitId: utils.config.huaweiConfig.bannerId,
                style: {
                    top: top,
                    left: 0,
                    height: 57,
                    width: 360
                }
            });
            utils.showLog("注册小游戏banner回调!" + this._bannerAd + " id=" + utils.config.huaweiConfig.bannerId);
            if (this._bannerAd) {

                this._bannerAd.onError((err) => {
                    utils.showLog("huawei小游戏Banner，显示异常：" + JSON.stringify(err))
                    if (this.ServerConfig.banner_style_level) {
                        if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 2) {
                            utils.showLog("开始展示默认banner");
                            this._createNativeBannerAd(this._showNativeBanner);
                        }
                    }
                })

                this._bannerAd.onLoad(() => {
                    utils.showLog("huawei小游戏Banner，加载成功")
                    if (this._nativeBannerNode) {
                        this._nativeBannerNode.active = false;
                    }
                })



                // this._bannerAd.onShow((() => {
                //     utils.showLog("huawei 小游戏Banner显示成功！");
                // }).bind(this));

                // this._bannerAd.onHide(function () {
                //     utils.showLog("huawei 小游戏Banner 广告隐藏");
                // })
            }
        }

        if (this._bannerAd) {
            this._bannerAd.show();
        } else {
            utils.showLog("huawei 小游戏Banner广告创建失败!");
            if (this.ServerConfig.banner_style_level) {
                if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 2) {
                    utils.showLog("开始展示默认banner");
                    this._createNativeBannerAd(this._showNativeBanner);
                }
            }
        }

    }




    _curNativeBannerInfo: any = {};
    _createNativeBannerAd(completeCallback: Function) {
        if (PlatUtils.IsHuaWei) {

            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeBanner:" + this._curPosIdIndexNativeBanner + " #id=" + utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);

            let nativeBannerAd = this._nativeBannerAd[this._curPosIdIndexNativeBanner];

            if (!nativeBannerAd) {
                if (utils.config.huaweiConfig.nativeBannerIds
                    && utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]) {
                    utils.showLog("创建原生广告Banner。 posId:" + utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]);
                    //@ts-ignore
                    // nativeBannerAd = qg.createNativeAd({
                    //     posId: utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner]
                    // });

                    nativeBannerAd = this.huawei.createNativeAd({
                        adUnitId: utils.config.huaweiConfig.nativeBannerIds[this._curPosIdIndexNativeBanner],
                        success: (code) => {
                            console.log("loadNativeAd loadNativeAd : success");
                        },
                        fail: (data, code) => {
                            console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                        },
                        complete: () => {
                            console.log("loadNativeAd loadNativeAd : complete");
                        }
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
                                    utils.showLog("当前原生Banner数据：" + data);
                                    if (this.canShowNativeBanner) {
                                        this._curPosIdIndexNativeBanner = 0;
                                        this._showNativeBanner(nativeBannerAd, data);
                                        this._curNativeBannerInfo.nativeBannerAd = nativeBannerAd;
                                        this._curNativeBannerInfo.data = data;
                                    } else {
                                        cc.warn("已经隐藏banner不可重复展示")
                                    }

                                    return;
                                }
                            }

                            utils.showLog("原生Banner广告资源出错！");
                            this._curPosIdIndexNativeBanner++;
                            if (this._curPosIdIndexNativeBanner < utils.config.huaweiConfig.nativeBannerIds.length) {
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
                            utils.showLog("原生Banner广告资源拉取失败！" + JSON.stringify(err));
                            this._curPosIdIndexNativeBanner++;
                            if (this._curPosIdIndexNativeBanner < utils.config.huaweiConfig.nativeBannerIds.length) {
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
                                if (this.ServerConfig.banner_style_level) {
                                    if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 1) {
                                        utils.showLog("开始展示默认banner");
                                        this._createMiniGameBannerAd();
                                    }
                                }
                                else if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
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
                if (utils.config.huaweiConfig.nativeBannerIds && this._curPosIdIndexNativeBanner < utils.config.huaweiConfig.nativeBannerIds.length) {
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
                    if (this.ServerConfig.banner_style_level) {
                        if (this.ServerConfig.banner_style_mod[this.bannerType - 1] == 1) {
                            utils.showLog("开始展示默认banner");
                            this._createMiniGameBannerAd();
                        }
                    }
                    else if (this.ServerConfig.banner_first_ad.indexOf("native") > -1) {
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
        if (PlatUtils.IsHuaWei) {

            let callback = completeCallback;

            utils.showLog("curPosIdIndexNativeInsert:" + this._curPosIdIndexNativeInser);

            let nativeInsertAd = this._nativeInsertAd[this._curPosIdIndexNativeInser];
            if (!nativeInsertAd) {

                if (utils.config.huaweiConfig.nativeInsertIds
                    && utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
                    utils.showLog("创建原生插屏广告。 posId:" + utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]);
                    //@ts-ignore
                    nativeInsertAd = qg.createNativeAd({
                        adUnitId: utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]
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
                            if (this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
                            if (this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
                                this._createNativeInsertAd(callback);
                            } else {
                                this._curPosIdIndexNativeInser = 0;
                                // 原生广告遍历完毕
                                utils.showLog("原生插屏广告遍历完毕，无法展示！");
                                if (this.ServerConfig.intersititial_style_level) {
                                    if (this.ServerConfig.intersititial_style_mod[this.intersititialType - 1] != 2) {
                                        utils.showLog("开始展示默认插屏！");
                                        this._createMiniGameInsertAd();
                                    }
                                    else {
                                        this.showNativeTryGameWidget();
                                    }
                                }
                                else if (this.ServerConfig.intersititial_first_ad == "native") {
                                    utils.showLog("开始展示小游戏插屏广告!");
                                    this._createMiniGameInsertAd();
                                }
                                else {
                                    this.showNativeTryGameWidget();
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
                if (utils.config.huaweiConfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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

    /**
     * 获取原生广告数据
     * @param args 
     */
    getNativeAdData() {
        if (!this._nativeAdObject) {
            this._nativeAdObject = new YZ_NativeAdObject();
        }
        this._nativeAdObject._nativeObj = this._nativeAd;
        this._nativeAdObject.data = this._nativeData;
        // utils.showLog("获取原生数据 >>>", this._nativeData)

        // setTimeout(() => {
        //     utils.showLog("延迟两秒重新请求原生广告数据");
        //     this._createNativeAd(args);
        // }, 2000);
        if (this._nativeData && this._nativeAd) {
            this._nativeData = null;
            return this._nativeAdObject;
        }
        return null;
    }


    // /**
    //  * 创建单个原生广告
    //  * @param completeCallback 
    //  */
    // createNativeAd(nativeItem?: YZ_NativeItem) {
    //     utils.showLog("_createNativeAd >>>>>");
    //     if (PlatUtils.IsHuaWei) {
    //         if (nativeItem) {
    //             this._curNativeItem = nativeItem;
    //         }
    //         utils.showLog("_curPosIdIndexSingleNative:" + this._curPosIdIndexSingleNative + "  #this._nativeSingleAd.length" + this._nativeSingleAd.length);

    //         let nativeSingleAd = this._nativeSingleAd[this._curPosIdIndexSingleNative];
    //         if (!nativeSingleAd) {

    //             if (utils.config.huaweiConfig.nativeSingleAdIds
    //                 && utils.config.huaweiConfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]) {
    //                 utils.showLog("创建原生广告。 posId:" + utils.config.huaweiConfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]);
    //                 //@ts-ignore
    //                 nativeSingleAd = qg.createNativeAd({
    //                     posId: utils.config.huaweiConfig.nativeSingleAdIds[this._curPosIdIndexSingleNative]
    //                 });

    //                 if (nativeSingleAd) {
    //                     this._nativeSingleAd.push(nativeSingleAd);

    //                     nativeSingleAd.onLoad((res) => {
    //                         if (res && res.adList && res.adList.length > 0) {
    //                             utils.showLog("原生广告资源拉取成功！");
    //                             utils.showLog(JSON.stringify(res));
    //                             res = JSON.parse(JSON.stringify(res));
    //                             let data = res.adList[0];
    //                             if (this._checkNativeDataValid(data)) {

    //                                 this._curPosIdIndexSingleNative = 0;
    //                                 this._nativeData = data;
    //                                 this._nativeAd = nativeSingleAd;
    //                                 // utils.showLog("callback >>>", callback);
    //                                 // callback(this.getNativeAdData());
    //                                 this._showNativeAd();
    //                                 return;
    //                             } else {
    //                                 utils.showLog("原生广告资源不合法！");
    //                             }
    //                         }

    //                         utils.showLog("原生广告资源出错！");
    //                         this._curPosIdIndexSingleNative++;
    //                         if (this._curPosIdIndexSingleNative < utils.config.huaweiConfig.nativeSingleAdIds.length) {
    //                             this.createNativeAd();
    //                         } else {
    //                             this._curPosIdIndexSingleNative = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("单个原生广告ID遍历完毕，无法展示！");
    //                         }
    //                     });

    //                     nativeSingleAd.onError((err) => {
    //                         utils.showLog("原生单个广告资源拉取失败！" + err.code + err.msg);
    //                         this._curPosIdIndexSingleNative++;
    //                         if (this._curPosIdIndexSingleNative < utils.config.huaweiConfig.nativeSingleAdIds.length) {
    //                             this.createNativeAd();
    //                         } else {
    //                             this._curPosIdIndexSingleNative = 0;
    //                             // 原生广告遍历完毕
    //                             utils.showLog("单个原生广告ID遍历完毕，无法展示！");
    //                         }
    //                     });
    //                 }
    //             }
    //         }

    //         if (nativeSingleAd) {
    //             utils.showLog("nativeSingleAd reload");
    //             nativeSingleAd.load();
    //         } else {
    //             this._curPosIdIndexSingleNative++;
    //             if (utils.config.huaweiConfig.nativeSingleAdIds && this._curPosIdIndexSingleNative < utils.config.huaweiConfig.nativeSingleAdIds.length) {
    //                 this.createNativeAd();
    //             } else {
    //                 this._curPosIdIndexSingleNative = 0;
    //                 // 原生广告遍历完毕
    //                 utils.showLog("单个原生广告ID 遍历完毕，无法展示！");
    //             }
    //         }
    //     }
    // }

    /**
     * 显示原生banner组件
     */
    _showNativeBanner(nativeBannerAd: any, data: any) {
        if (PlatUtils.IsHuaWei) {
            if (data) {
                utils.showLog("显示原生banner");
                if (this._bannerAd) {
                    this._bannerAd.hide();
                }
                if (!cc.isValid(this._nativeBannerNode) || (!this._nativeBannerNode && utils.config.otherconfig.nativeBanner)) {
                    this._nativeBannerNode = cc.instantiate(utils.config.otherconfig.nativeBanner);
                    this._nativeBannerNode.position = CompatibleTool.position(cc.winSize.width / 2, this._nativeBannerNode.height * this._nativeBannerNode.scaleY / 2);
                    cc.director.getScene().addChild(this._nativeBannerNode, 1000);
                }
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
        if (PlatUtils.IsHuaWei) {
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

                        // utils.HuaweiTool.countInserShowCount();
                        // utils.showLog("原生插屏显示成功，当前显示次数=" + utils.HuaweiTool.insertAdShowCounts);
                        let closeType = this.ServerConfig.intersititial_open_close_banner;
                        if (closeType && closeType > 0) {
                            utils.showLog("Huawei 配置当前插屏显示成功后" + (closeType == 1 ? "销毁" : "隐藏") + "banner!");
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
        utils.showLog("checkNativeDataValid");
        if (!data) {
            return false;
        }
        if (data.imgUrlList && data.imgUrlList.length > 0) {
            return true;
        }

        if (data.title && data.desc && data.clickBtnTxt && ((data.iconUrlList && data.iconUrlList.length > 0))) {
            return true;
        }

        return false;
    }

    /**
     * 验证是否显示激励插屏
     */
    private checkRewardInsertIsShow() {
        // let jumpList = utils.getRecommondGameList();
        // if (utils.isSupportnavigateToMiniGame()) {
        //     if (utils.HuaweiTool
        //         && utils.HuaweiTool.ServerConfig
        //         && utils.HuaweiTool.ServerConfig.is_reward_intersititia) {
        //         if (utils.HuaweiTool.ServerConfig.is_reward_intersititia == "true"
        //             && jumpList && jumpList.length > 0) {
        //             utils.showLog("激励插屏显示环境验证通过！");
        //             return true;
        //         } else {
        //             utils.showLog("is_reward_intersititia 参数为false，激励插屏组件不显示！");
        //             return false;
        //         }
        //     } else {
        //         utils.showLog("配置中没有is_reward_intersititia参数，激励插屏组件组件不显示！");
        //         return false;
        //     }
        // }
        // utils.showLog("当前平台不支持小程序跳转！");
        // return false;
    }


    _rewardInsertNode: cc.Node = null;
    /**
    * 显示激励插屏组件
    */
    public showRewardInsert() {
        utils.showLog("show reward");
        // let self = this;
        // if (!this.checkRewardInsertIsShow()) {
        //     self._videoCallback && self._videoCallback(false, "暂无视频广告！");
        //     utils.adManager.videoCallBack = null;
        //     return;
        // }


        // if (((!cc.isValid(this._rewardInsertNode)) || !this._rewardInsertNode) && utils.config.otherconfig.rewardInsert) {
        //     utils.showLog("创建激励插屏广告");
        //     this._rewardInsertNode = cc.instantiate(utils.config.otherconfig.rewardInsert);
        //     this._rewardInsertNode.position = CompatibleTool.position(cc.winSize.width / 2, cc.winSize.height / 2);
        //     cc.director.getScene().addChild(this._rewardInsertNode, 9999);
        // }


        // if (this._rewardInsertNode) {
        //     let rewardInsert: RewardInsert = this._rewardInsertNode.getComponent("RewardInsert");
        //     if (rewardInsert) {
        //         rewardInsert.isShow = false;
        //         utils.showLog("显示激励插屏组件！");
        //     } else {
        //         utils.showLog("RewardInsert组件不存在!");
        //     }
        // } else {
        //     utils.showLog("激励插屏没有创建！");
        // }

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
    //     if (PlatUtils.IsHuaWei) {

    //         utils.showLog("curPosIdIndexNativeInsert:", this._curPosIdIndexNativeInser);

    //         let nativeInsertAd = this._nativeInsertAd[this._curPosIdIndexNativeInser];
    //         if (!nativeInsertAd) {

    //             if (utils.config.huaweiConfig.nativeInsertIds
    //                 && utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]) {
    //                 utils.showLog("创建原生结算页面广告。 posId:", utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]);

    //                 nativeInsertAd = qg.createNativeAd({
    //                     posId: utils.config.huaweiConfig.nativeInsertIds[this._curPosIdIndexNativeInser]
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
    //                         if (this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
    //                         if (this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
    //             if (utils.config.huaweiConfig.nativeInsertIds && this._curPosIdIndexNativeInser < utils.config.huaweiConfig.nativeInsertIds.length) {
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
        if (this._curNativeItem) {
            this._curNativeItem.init(this.getNativeAdData());
        }
        // let nativeItem: YZ_NativeItem = node.getComponent("YZ_NativeItem");
        // utils.showLog("ShowSingleNativeAd <<<<<<<<<", nativeItem, "===", res)
        // if (nativeItem) 

    }

    /**
     * 创建结算页面推广组件
     */
    public ShowSingleNativeAd(): cc.Node {

        if (utils.config.otherconfig.singleNativeAd) {
            // if (this.getNativeAdData()) {
            let node = cc.instantiate(utils.config.otherconfig.singleNativeAd);

            let nativeItem: YZ_NativeItem = node.getComponent("YZ_NativeItem");
            nativeItem.showType = 2;
            this._curNativeItem = nativeItem;
            this.createNativeAd();
            // this.createNativeAd((res) => {
            //     utils.showLog("ShowSingleNativeAd <<<<<<<<<", nativeItem, "===", res)
            //     if (nativeItem) nativeItem.init(res, 2);
            // })
            // if (this._nativeAdObject._nativeAdData) {
            //     statementRecomment.nativeData = this._nativeAdObject._nativeAdData;
            // } else {
            //     utils.showLog("结算推广组件 >>  原生广告数据不存在！");
            //     return null;
            // }

            utils.showLog("单个原生广告创建成功！");
            // this._createNativeAd();
            return node;
            // } else {
            //     utils.showLog("单个原生广告创建失败，原生广告数据不存在");
            //     return null;
            // }

        } else {
            utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
            return null;
        }

    }

    /**
     * 显示结算广告
     * @param data 参数： closeBtn:
     */
    showStatementAds(data?: any): any {

        // let result: any = { "type": 0, "node": null };
        // if (this.ServerConfig && this.ServerConfig.statement_type) {
        //     let type = this.ServerConfig.statement_type;
        //     let spareType = this.ServerConfig.st_spare_type;
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
        // } else {
        //     utils.showLog("配置未初始化、或者没有配置结算广告！");
        //     return result;
        // }

    }


    public showFullScreenVideo() {

    }



    public GameExit() { }

    public Share() { }
}
