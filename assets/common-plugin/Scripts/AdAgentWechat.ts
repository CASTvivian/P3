import AdAgent from "./AdAgent";
import { AttributedKey, AttributedType, AttributedValue, BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import RewardInsert from "./RewardInsert";
import CompatibleTool from "./CompatibleTool";
import BeforGameOverRecGamesPanel from "./BeforGameOverRecGamesPanel";
import { CustomAdInfo } from "./CommonConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentWechat extends AdAgent {

    _curBannerAd: any = null;
    _videoAd: any = null;
    _videoCallback: Function = null;
    _insertAd: any = null;
    _rewardInsertNode: cc.Node = null;
    public get ServerConfig() {
        return utils.wechatTool.ServerConfig;
    }

    _sysInfo: any = null;
    public get sysInfo() {
        if (this._sysInfo) return this._sysInfo;
        this._sysInfo = utils.wechatTool.getSystemInfo();
        return this._sysInfo;
    }


    public Init() {
        if (PlatUtils.IsWechat) {
            utils.registerServerInitEvent(() => {
                this._initVideoAd();
                this._initInsertAd();
                if (utils.getConfigByKey("game_time_report")) {
                    utils.scheduleOnce(() => {
                        utils.wechatTool.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.GameTimeAction);
                    }, utils.getConfigByKey("game_time_report"));
                }
            }, this);
        }
    }

    _initVideoAd() {
        if (PlatUtils.IsWechat) {
            if (!utils.wechatTool.isOverMinVersion("2.0.4")) {
                utils.showLog("当前版本不支持视频广告!");
                return;
            }
            if (!this._videoAd) {
                utils.showLog("初始化视频!");
                if (!utils.config.wechatconfig.videoId) {
                    utils.showLog("视频ID配置错误!");
                    return;
                }

                utils.showLog("视频广告ID:", utils.config.wechatconfig.videoId.trim());
                //@ts-ignore
                this._videoAd = wx.createRewardedVideoAd({
                    adUnitId: utils.config.wechatconfig.videoId
                });

                let self = this;
                if (this._videoAd) {
                    utils.showLog("初始化注册视频回调!");
                    this._videoAd.onLoad(function () {
                        utils.showLog("激励视频加载成功");
                        // this._isVideoLoaded = true;
                    }.bind(this));

                    this._videoAd.onError(function (err) {
                        utils.showLog("激励视频加载失败!", err.code, err.msg);
                        // this._isVideoLoaded = false;
                    }.bind(this));

                    this._videoAd.onClose(function (res) {
                        // this._isVideoLoaded = false;
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            utils.showLog('激励视频广告完成，发放奖励');
                            if (self._videoCallback) {
                                self._videoCallback(true, "");
                                self._videoCallback = null;
                            }
                        } else {
                            // 播放中途退出，不下发游戏奖励
                            utils.showLog('激励视频广告取消关闭，不发放奖励');
                            if (self._videoCallback) {
                                self._videoCallback(false, "观看完视频才能获得奖励!");
                                self._videoCallback = null;
                            }
                        }
                    }.bind(this));
                } else {
                    utils.showLog("激励视频初始化失败!");
                }
            }
        }
    }

    _bannerSizePercent: number = 0.1;
    _bannerBottom: number = 0;
    _oldBannerLocation: BannerLocation = BannerLocation.None;
    _createBanner(location: BannerLocation, args: any = null) {
        if (PlatUtils.IsWechat) {
            let locationTmp: BannerLocation = location;
            let argsTmp: any = args;

            if (argsTmp && argsTmp.width) {
                this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
                this._bannerSizePercent = argsTmp.width > 1 ? 1 : argsTmp.width;
            }

            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom < 0 ? 0 : argsTmp.bottom;
                this._bannerBottom = argsTmp.bottom > cc.winSize.height ? cc.winSize.height : argsTmp.bottom;
            }
            let params = {
                adUnitId: utils.config.wechatconfig.getBannerId(locationTmp),
                style: {
                    left: 0,
                    width: 300,
                    top: 0
                }
            };

            if (this._oldBannerLocation != locationTmp && this._curBannerAd) {
                this._curBannerAd.destroy();
                this._oldBannerLocation = locationTmp;
            }
            //@ts-ignore
            let curBannerAd = wx.createBannerAd(params);
            if (curBannerAd) {
                curBannerAd.onError((err) => {
                    utils.showLog("广告条加载失败! ", JSON.stringify(err));
                    if (curBannerAd) {
                        curBannerAd.destroy();
                    }
                    if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "default") {
                        this.showNativeBannerAd(location, args);
                    }
                });

                let self = this;
                curBannerAd.onLoad(() => {
                    curBannerAd.show().then(() => {
                        let old = self._curBannerAd;
                        if (old) {
                            old.destroy();
                        }
                        self._curBannerAd = curBannerAd;
                        utils.showLog("默认Banner广告显示成功!");
                        this.HideNativeBanner();

                    }).catch((err) => {
                        utils.showLog("Banner广告出错", JSON.stringify(err));
                        if (curBannerAd) {
                            curBannerAd.destroy();
                        }
                        if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "default") {
                            this.showNativeBannerAd(location, args);
                        }
                    });
                });

                curBannerAd.onResize((res) => {
                    curBannerAd.style.width = utils.wechatTool.getSystemInfo().screenWidth * self._bannerSizePercent;
                    curBannerAd.style.left = (utils.wechatTool.getSystemInfo().screenWidth - res.width) * 0.5;

                    if (self._bannerBottom == cc.winSize.height) {
                        curBannerAd.style.top = 0;
                    } else {
                        curBannerAd.style.top = utils.wechatTool.getSystemInfo().screenHeight - res.height - self._bannerBottom;
                    }
                });
            } else {
                utils.showLog("广告条创建失败!");
            }
        }
    }

    createCustomADBanner(location: BannerLocation = BannerLocation.Game, args: any = null) {
        if (PlatUtils.IsWechat) {

            let locationTmp: BannerLocation = location;
            if (!utils.config.wechatconfig.getBannerId(locationTmp)) {
                locationTmp = BannerLocation.Home;
            }

            let argsTmp: any = args;

            if (argsTmp && argsTmp.width) {
                this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
                this._bannerSizePercent = argsTmp.width > 1 ? 1 : argsTmp.width;
            }

            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom < 0 ? 0 : argsTmp.bottom;
                this._bannerBottom = argsTmp.bottom > cc.winSize.height ? cc.winSize.height : argsTmp.bottom;
            }

            let params = {
                adUnitId: utils.config.wechatconfig.getBannerId(locationTmp),
                style: {
                    left: 0,
                    width: 300,
                    top: 0
                }
            };

            if (this._oldBannerLocation != locationTmp && this._curBannerAd) {
                this._curBannerAd.destroy();
                this._oldBannerLocation = locationTmp;
            }
            //@ts-ignore
            let curBannerAd = wx.createBannerAd(params);
            if (curBannerAd) {
                curBannerAd.onError((err) => {
                    utils.showLog("广告条加载失败! ", JSON.stringify(err));
                    if (curBannerAd) {
                        curBannerAd.destroy();
                    }
                });

                let self = this;
                curBannerAd.onLoad(() => {
                    cc.director.on("CloseCustomADPanel", (() => {
                        curBannerAd.show().then(() => {
                            let old = self._curBannerAd;
                            if (old) {
                                old.destroy();
                            }
                            self._curBannerAd = curBannerAd;
                            utils.showLog("Banner广告显示成功!");
                            let interval: number = 18;
                            if (utils.wechatTool.ServerConfig.refresh_ad_time) {
                                interval = utils.wechatTool.ServerConfig.refresh_ad_time;
                            }
                            clearInterval(self._showBannerTimerId);
                            //@ts-ignore
                            self._showBannerTimerId = setInterval(function () {
                                utils.showLog(`显示Banner广告！location:${locationTmp}; args:${JSON.stringify(argsTmp)}; 间隔时间:${utils.wechatTool.ServerConfig.refresh_ad_time}`);
                                self._showBannerTimer(locationTmp, argsTmp);
                            }.bind(self), interval * 1000);

                        }).catch((err) => {
                            utils.showLog("Banner广告出错", JSON.stringify(err));
                            if (curBannerAd) {
                                curBannerAd.destroy();
                            }
                        });
                        cc.director.targetOff(self);
                    }), self);
                });

                curBannerAd.onResize((res) => {
                    curBannerAd.style.width = utils.wechatTool.getSystemInfo().screenWidth * self._bannerSizePercent;
                    curBannerAd.style.left = (utils.wechatTool.getSystemInfo().screenWidth - res.width) * 0.5;

                    if (self._bannerBottom == cc.winSize.height) {
                        curBannerAd.style.top = 0;
                    } else {
                        curBannerAd.style.top = utils.wechatTool.getSystemInfo().screenHeight - res.height - self._bannerBottom;
                    }
                });
            } else {
                utils.showLog("广告条创建失败!");
            }
        }
    }

    _initInsertAd() {
        if (PlatUtils.IsWechat) {
            if (!utils.wechatTool.isOverMinVersion("2.6.0")) {
                utils.showLog("当前版本不支持插屏广告!");
                return;
            }

            if (!this._insertAd) {
                utils.showLog("初始化插屏广告!");
                if (!utils.config.wechatconfig.insertId) {
                    utils.showLog("插屏广告ID配置错误!");
                    return;
                }
                utils.showLog("插屏广告ID:", utils.config.wechatconfig.insertId.trim());
                //@ts-ignore
                this._insertAd = wx.createInterstitialAd({
                    adUnitId: utils.config.wechatconfig.insertId.trim()
                });

                if (this._insertAd) {
                    this._insertAd.onLoad(function () {
                        utils.showLog("插屏广告拉取成功!");
                    });

                    this._insertAd.onError((err) => {
                        utils.showLog("插屏广告拉取失败!", JSON.stringify(err));
                        if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "default") {
                            this.showNativeIntersititialAd();
                        }
                    });

                    this._insertAd.onClose(function () {
                        utils.showLog("插屏广告被关闭!");
                    });
                } else {
                    utils.showLog("插屏组件初始化失败!");
                }
            }
        }
    }

    _showBannerTimer(location: BannerLocation, args: any) {
        let locationTmp: BannerLocation = location;
        let argsTmp: any = args;
        utils.showLog(`显示Banner广告xxx！location:${locationTmp}; args:${JSON.stringify(argsTmp)}; 间隔时间:${utils.wechatTool.ServerConfig.refresh_ad_time};优先级：${this.ServerConfig.banner_first_ad}`);

        if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "native") {
            this.showNativeBannerAd(location, args);
        } else {
            if (locationTmp == BannerLocation.None) {
                utils.showLog("未定义的BannerLocation,", locationTmp);
            } else {
                if (utils.config.wechatconfig.getBannerId(locationTmp)) {
                    this._createBanner(locationTmp, argsTmp);
                } else {
                    utils.showLog(`未找到位置为 ${locationTmp} 的广告ID!`);
                    this._createBanner(BannerLocation.Home, argsTmp);
                }
            }
        }
    }

    _showBannerTimerId: number = 0;
    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        if (PlatUtils.IsWechat) {
            if (!utils.wechatTool.isOverMinVersion("2.0.4")) {
                utils.showLog("当前版本不支持Banner广告!");
                return;
            }

            if (utils.wechatTool.ServerConfig) {
                let locationTmp: BannerLocation = location;
                let argsTmp: any = args;

                this._showBannerTimer(locationTmp, argsTmp);

                let interval: number = 18;
                if (utils.wechatTool.ServerConfig.refresh_ad_time) {
                    interval = utils.wechatTool.ServerConfig.refresh_ad_time;
                }
                clearInterval(this._showBannerTimerId);
                //@ts-ignore
                this._showBannerTimerId = setInterval(function () {
                    utils.showLog(`显示Banner广告！location:${locationTmp}; args:${JSON.stringify(argsTmp)}; 间隔时间:${utils.wechatTool.ServerConfig.refresh_ad_time}`);
                    this._showBannerTimer(locationTmp, argsTmp);
                }.bind(this), interval * 1000);
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        if (PlatUtils.IsWechat) {
            utils.showLog("隐藏广告条");
            clearInterval(this._showBannerTimerId);

            this.HideDefaultBanner();
            this.HideNativeBanner();
        }
    }


    private HideDefaultBanner(): void {
        this._curBannerAd && this._curBannerAd.hide();
    }

    private HideNativeBanner(): void {
        this.nativeBannerAd && this.nativeBannerAd.hide();
    }


    public ShowInterstitial(location: BannerLocation = BannerLocation.Home) {
        if (PlatUtils.IsWechat) {
            if (!utils.wechatTool.isOverMinVersion("2.6.0")) {
                utils.showLog("当前版本不支持插屏广告!");
                return;
            }
            let delayTime: number = 0;
            if (utils.wechatTool
                && utils.wechatTool.ServerConfig
                && utils.wechatTool.ServerConfig.intersititia_delay_show_time) {
                delayTime = utils.wechatTool.ServerConfig.intersititia_delay_show_time;
            }

            utils.showLog(`插屏广告延时展示！ delayTime:${delayTime}秒`);

            setTimeout(() => {

                if (this.ServerConfig && this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "box") {
                    utils.showLog("优先展示盒子插屏广告!");
                    if (this.canShowBoxInsertAd()) {
                        this._createBoxInsertAd();
                    } else {
                        utils.showLog("盒子插屏广告展示失败，展示默认插屏!");
                        this._createMiniGameInsertAd();
                    }
                } else if (this.ServerConfig && this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "native") {
                    this.showNativeIntersititialAd();
                } else {
                    utils.showLog("优先展示小游戏插屏广告!");
                    this._createMiniGameInsertAd();
                }

            }, delayTime * 1000);
        }
    }


    _createBoxInsertAd() {
        utils.rewardCallFunc = null;
        utils.rewardCloseFunc = null;
        if (utils.config && utils.config.otherconfig.beforGameOverRecGamesPanel && utils.getRecommondGameList()) {
            let panel = cc.instantiate(utils.config.otherconfig.beforGameOverRecGamesPanel);
            panel.zIndex = 999999;
            let morePanel: BeforGameOverRecGamesPanel = panel.getComponent("BeforGameOverRecGamesPanel");
            cc.director.getScene().addChild(panel);
            morePanel._location = SubLocation.isBoxInsertAd;
            morePanel.init(utils.getRecommondGameList());
            morePanel.show();
        } else {
            utils.showLog("互推插屏展示失败！");
        }
    }
    /**
     * 是否能够显示互推插屏
     */
    canShowBoxInsertAd() {
        let jumpList: any = utils.getRecommondGameList();
        if (jumpList && jumpList.length > 0) {
            return true;
        }
        return false;
    }

    isFirstShowInsertAd: boolean = true; //首次展示广告


    _createMiniGameInsertAd() {
        if (this._insertAd) {
            this._insertAd.show().then(() => {
                utils.showLog("插屏广告展示成功!");
                if (this.isFirstShowInsertAd && utils.getConfigByKey("insert_ad_first_show_active") == "true") {
                    this.isFirstShowInsertAd = false;
                    utils.wechatTool.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.InsertAdFirstShowAction);
                }

            }).catch((err) => {
                utils.showLog("插屏广告展示失败!", JSON.stringify(err));
                if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "default") {
                    this.showNativeIntersititialAd();
                }
                // if (this.ServerConfig && this.ServerConfig.intersititial_first_ad == "default") {
                //     utils.showLog("优先展示默认插屏，显示备选盒子插屏！");
                //     if (this.canShowBoxInsertAd()) {
                //         this._createBoxInsertAd();
                //     }
                // }
            });
        } else {
            utils.showLog("插屏广告未初始化");
            if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "default") {
                this.showNativeIntersititialAd();
            }
            // if (this.ServerConfig && this.ServerConfig.intersititial_first_ad == "default") {
            //     utils.showLog("优先展示默认插屏，显示备选盒子插屏！");
            //     if (this.canShowBoxInsertAd()) {
            //         this._createBoxInsertAd();
            //     }
            // }
        }
    }


    public ShowVideo(callback: Function) {
        if (PlatUtils.IsWechat) {
            this._videoCallback = callback;


            if (this.checkRewardInsertIsShow() && utils.wechatTool
                && utils.wechatTool.ServerConfig
                && utils.wechatTool.ServerConfig.reward_first_ad && utils.wechatTool.ServerConfig.reward_first_ad != "video") {
                utils.showLog("<<<服务器默认优先展示激励插屏>>>");
                this.showRewardInsert();
                return;
            }

            if (!utils.wechatTool.isOverMinVersion("2.0.4")) {
                utils.showLog("当前版本不支持视频广告!");
                if (this._videoCallback) {
                    // this._videoCallback(false, "暂无视频广告!");
                    this.showRewardInsert();
                }
                return;
            }

            if (this._videoAd) {
                this._videoAd.show().then(function () {
                    utils.showLog("视频显示成功！");
                }.bind(this)).catch(function (err) {
                    utils.showLog("视频未加载！");
                    this._videoAd.load();
                    if (this._videoCallback) {
                        // this._videoCallback(false, "暂无视频广告!");
                        this.showRewardInsert();
                    }
                }.bind(this));
            } else {
                utils.showLog("视频未初始化!");
                if (this._videoCallback) {
                    // this._videoCallback(false, "暂无视频广告!");
                    this.showRewardInsert();
                }
            }
        }
    }


    /**
     * 验证是否显示激励插屏
     */
    private checkRewardInsertIsShow() {
        let jumpList = utils.getRecommondGameList();
        if (utils.isSupportnavigateToMiniGame()) {
            if (utils.wechatTool
                && utils.wechatTool.ServerConfig
                && utils.wechatTool.ServerConfig.is_reward_intersititia) {
                if (utils.wechatTool.ServerConfig.is_reward_intersititia == "true"
                    && jumpList && jumpList.length > 0) {
                    utils.showLog("激励插屏显示环境验证通过！");
                    return true;
                } else {
                    cc.warn("is_reward_intersititia 参数为false，激励插屏组件不显示！");
                    return false;
                }
            } else {
                cc.warn("配置中没有is_reward_intersititia参数，激励插屏组件组件不显示！");
                return false;
            }
        }
        utils.showLog("当前平台不支持小程序跳转！");
        return false;
    }

    /**
    * 显示激励插屏组件
    */
    public showRewardInsert() {
        utils.showLog("show reward");
        if (!this.checkRewardInsertIsShow()) {
            utils.adManager.videoCallBack && utils.adManager.videoCallBack(false, "暂无视频广告！");
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

    public ShowCloseBtnBanner(location: BannerLocation = BannerLocation.Home, args: any) {
        if (PlatUtils.IsWechat) {
            if (utils.wechatTool && !utils.wechatTool.isOverMinVersion("2.0.4")) {
                utils.showLog("当前版本不支持Banner广告!");
                return;
            }
            if (utils.wechatTool.ServerConfig && (!utils.wechatTool.ServerConfig.isMoveBtn || utils.wechatTool.ServerConfig.isMoveBtn != "true")) {
                utils.showLog("服务器没有开启移动按钮，不显示广告！");
                return;
            }

            if (utils.wechatTool && utils.wechatTool.ServerConfig) {
                if (PlatUtils.IsWechat) {
                    let locationTmp: BannerLocation = location;
                    // let argsTmp: any = args;


                    let params = {
                        adUnitId: utils.config.wechatconfig.getBannerId(locationTmp),
                        style: {
                            left: 0,
                            width: 300,
                            top: 0
                        }
                    };

                    if (this._oldBannerLocation != locationTmp && this._curBannerAd) {
                        this._curBannerAd.destroy();
                        this._oldBannerLocation = locationTmp;
                    }
                    //@ts-ignore
                    let curBannerAd = wx.createBannerAd(params);
                    if (curBannerAd) {
                        curBannerAd.onError((err) => {
                            utils.showLog("广告条加载失败! ", JSON.stringify(err));
                            if (curBannerAd) {
                                curBannerAd.destroy();
                            }
                        });

                        let self = this;
                        curBannerAd.onLoad(() => {
                            curBannerAd.show().then(() => {
                                let old = self._curBannerAd;
                                if (old) {
                                    old.destroy();
                                }
                                self._curBannerAd = curBannerAd;

                                let closeBtn = args.closeBtn;
                                if (!closeBtn) {
                                    return;
                                }

                                // closeBtn.active = true;
                                //调整关闭按钮位置
                                let winHeight = cc.winSize.height;
                                var adY = self.getBannerAdHeight();
                                utils.showLog('utils - adY:', adY);
                                if (adY > 0) {
                                    closeBtn.y = -(winHeight / 2 - adY) + closeBtn.height;
                                    utils.showLog("btnClose.y", closeBtn.y);
                                }

                                utils.showLog("关闭按钮---Banner广告显示成功!");



                            }).catch((err) => {
                                utils.showLog("Banner广告出错", JSON.stringify(err));
                                if (curBannerAd) {
                                    curBannerAd.destroy();
                                }
                            });
                        });

                        curBannerAd.onResize((res) => {
                            curBannerAd.style.width = utils.wechatTool.getSystemInfo().screenWidth * 0.6;
                            curBannerAd.style.left = (utils.wechatTool.getSystemInfo().screenWidth - res.width) * 0.5;

                            // if (self._bannerBottom == cc.winSize.height) {
                            //     curBannerAd.style.top = 0;
                            // } else {
                            curBannerAd.style.top = utils.wechatTool.getSystemInfo().screenHeight - res.height;
                            // }
                        });
                    } else {
                        utils.showLog("广告条创建失败!");
                    }
                }
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    /**
  * 是否能显示6个元素的交叉推广组件
  */
    public canShowCrossWidget6() {
        if (PlatUtils.IsWechat) {
            if (utils.isSupportnavigateToMiniGame()) {
                return true;
            } else {
                cc.warn("当前平台不支持游戏内跳转，6元素交叉推广组件不显示！");
                return false;
            }
        }
    }

    /**
    * 显示6元素交叉推广组件
    */
    public showCrossWidget6(): cc.Node {

        if (this.canShowCrossWidget6()) {

            if (utils.config.otherconfig.crossWidget6) {
                return cc.instantiate(utils.config.otherconfig.crossWidget6);
            } else {
                utils.showLog("未找到预制体 CrossWidget6, 请查看CommonUtils组件上是否赋值！");
            }
        }

        return null;
    }

    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type 
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    showStatementAds(data?: any): any {
        let result: any = { "type": 0, "node": null };
        let node: cc.Node = null;
        this.ShowInterstitial();
        if (utils.canShowCrossWidget6()) {
            utils.showLog("服务器配置显示6个互推组件");
            node = this.showCrossWidget6();
            result.type = 1;
            result.node = node;
            return result;
        }
        return result;
        // if (this.ServerConfig && this.ServerConfig.statement_type) {
        //     // let type = this.ServerConfig.statement_type;
        //     let node: cc.Node = null;
        //     let resType: number = 0;
        //     this.ShowInterstitial();
        //     if (this.canShowCrossWidget6()) {
        //         node = this.showCrossWidget6();
        //         resType = 1;
        //     }
        //     // switch (type) {
        //     //     case 1:
        //     //         utils.showLog("结算广告 >> 只显示小游戏插屏广告");
        //     //         this.ShowInterstitial();
        //     //         break;
        //     //     case 2:
        //     //         utils.showLog("结算广告 >> 只显示6个互推广告");
        //     //         node = this.showCrossWidget6();
        //     //         resType = 1;
        //     //         break;
        //     //     case 3:
        //     //         utils.showLog("结算广告 >> 显示插屏广告+6个互推");
        //     //         this.ShowInterstitial();
        //     //         node = this.showCrossWidget6();
        //     //         resType = 1;
        //     //         break;
        //     //     default:
        //     //         utils.showLog("非法的结算广告类型，：", type)
        //     //         break;
        //     // }
        //     result.type = resType;
        //     result.node = node;
        //     return result;
        // } else {
        //     cc.warn("配置未初始化！");
        //     return result;
        // }

    }


    /**
     * 获取banner广告高度
     */
    public getBannerAdHeight() {
        if (this._curBannerAd) {
            let i = this._curBannerAd.style.realHeight * 2;
            if (i === null || i === undefined || isNaN(i)) {
                return 0;
            } else {
                return i;
            }

        }
        return 0;
    }






    _customAdObjs: any[] = [];
    public showNativeTryGameWidget(params: any = null) {

        if (!utils.wechatTool.isOverMinVersion("2.11.1")) {
            utils.showLog("当前版本不支持原生广告!");
            return;
        }

        if (!this.ServerConfig) {
            utils.showLog("组件未初始化！");
            return;
        }


        if (!utils.config.wechatconfig.bannerBoxId) {
            utils.showLog("原生广告ID不存在");
            return;
        }

        let top = 0;
        let left = 0;
        if (params.top) {
            top = params.top / cc.winSize.height * this.sysInfo.screenHeight
        } else {
            top = this.sysInfo.screenHeight - 112 - params.bottom / cc.winSize.height * this.sysInfo.screenHeight;
        }

        if (params.left) {
            left = params.left / cc.winSize.width * this.sysInfo.screenWidth;
        } else if (params.right) {
            left = this.sysInfo.screenWidth - 70 - params.right / cc.winSize.width * this.sysInfo.screenWidth;
        }

        //@ts-ignore
        let customAd = wx.createCustomAd({
            // adUnitId: utils.config.wechatconfig.bannerBoxId,
            adUnitId: utils.config.wechatconfig.bannerBoxId,
            adIntervals: 30,
            style: {
                left: left,
                top: top
            }
        });

        customAd.onError((erro) => {
            utils.showLog("原生广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            if (params.onError) {
                utils.showLog("执行微信原生广告异常回调！")
                params.onError();
            }
        })

        customAd.onLoad(() => {
            utils.showLog("微信原生广告加载成功！");
            customAd.show().then(() => {
                if (params.onSuccess) {
                    utils.showLog("执行微信原生广告显示成功回调！")
                    params.onSuccess();
                }
                utils.showLog("微信原生广告显示成功！");
            }).catch((err) => {
                utils.showLog("微信原生广告显示失败！");
            });
        })

        this._customAdObjs.push(customAd);
    }

    _nativeCustomAdObjs: any[] = [];
    public showCustomAd(params: any = null) {

        if (!utils.wechatTool.isOverMinVersion("2.11.1")) {
            utils.showLog("当前版本不支持原生模版广告!");
            return;
        }

        if (!this.ServerConfig) {
            utils.showLog("组件未初始化！");
            return;
        }


        if (utils.config.wechatconfig.customAdInfos.length < 1) {
            utils.showLog("原生广告配置不存在");
            return;
        }

        let customAdInfo: CustomAdInfo = utils.config.wechatconfig.getCustomAdInfoInfo(params.location);
        if (!customAdInfo) {
            utils.showLog("当前位置未配置模版广告！");
            return;
        }
        // utils.showLog("显示原生模版广告：位置：" + params.location + "，配置:" + customAdInfo.toStrong);
        let top = 0;
        let left = 0;

        //   about：左右居中
        //   updown:上下
        //   all:上下和左右居中
        //  false:自定义对齐方式
        if (customAdInfo.is_center == "false") {
            if (customAdInfo.top > -1) {
                top = customAdInfo.top / cc.winSize.height * this.sysInfo.screenHeight
            } else {
                top = this.sysInfo.screenHeight - customAdInfo.height - customAdInfo.bottom / cc.winSize.height * this.sysInfo.screenHeight;
            }

            if (customAdInfo.left > -1) {
                left = customAdInfo.left / cc.winSize.width * this.sysInfo.screenWidth;
            } else {
                left = this.sysInfo.screenWidth - customAdInfo.width - customAdInfo.right / cc.winSize.width * this.sysInfo.screenWidth;
            }
        } else if (customAdInfo.is_center == "updown") {
            utils.showLog("原生模版上下居中对齐！")
            if (customAdInfo.left > -1) {
                left = customAdInfo.left / cc.winSize.width * this.sysInfo.screenWidth;
            } else {
                left = this.sysInfo.screenWidth - customAdInfo.width - customAdInfo.right / cc.winSize.width * this.sysInfo.screenWidth;
            }
            top = (this.sysInfo.screenHeight - customAdInfo.height) / 2;
        } else if (customAdInfo.is_center == "about") {
            utils.showLog("原生模版左右居中对齐！")
            left = (this.sysInfo.screenWidth - customAdInfo.width) / 2;
            if (customAdInfo.top > -1) {
                top = customAdInfo.top / cc.winSize.height * this.sysInfo.screenHeight
            } else {
                top = this.sysInfo.screenHeight - customAdInfo.height - customAdInfo.bottom / cc.winSize.height * this.sysInfo.screenHeight;
            }
        }
        else {
            utils.showLog("原生模版上下左右居中对齐！")
            left = (this.sysInfo.screenWidth - customAdInfo.width) / 2;
            top = (this.sysInfo.screenHeight - customAdInfo.height) / 2;
        }


        //@ts-ignore
        let customAd = wx.createCustomAd({
            adUnitId: customAdInfo.id,
            adIntervals: customAdInfo.refresh_time,
            style: {
                left: left,
                top: top,
                width: customAdInfo.width
            }
        });
        customAd.location = params.location;
        utils.showLog("customAd style left=" + left + ",top=" + top + ";  screenWidth=" + this.sysInfo.screenWidth + ", screenHeight=" + this.sysInfo.screenHeight)
        customAd.onError((erro) => {
            utils.showLog("原生广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            if (params.onError) {
                utils.showLog("执行微信原生广告异常回调！")
                params.onError();
            }
        })

        customAd.onLoad(() => {
            utils.showLog("微信原生广告加载成功！");
            customAd.show().then(() => {
                if (params.onSuccess) {
                    utils.showLog("执行微信原生广告显示成功回调！")
                    params.onSuccess();
                }
                utils.showLog("微信原生广告显示成功！");
            }).catch((err) => {
                utils.showLog("微信原生广告显示失败！");
            });
        })

        this._customAdObjs.push(customAd);
    }

    /**
     * 隐藏原生模版广告
     */
    hideCustomAd(params?: any) {
        for (let i = 0; i < this._customAdObjs.length; i++) {
            if (this._customAdObjs[i]) {
                if (params && "location" in params) {
                    if (this._customAdObjs[i].location == params.location) {
                        utils.showLog("隐藏位置：" + params.location + "的原生模版广告");
                        this._customAdObjs[i].destroy()
                        this._customAdObjs.splice(i, 1)
                    }
                } else {
                    this._customAdObjs[i].destroy()
                    this._customAdObjs.splice(i, 1)
                }
            }
        }
        if (!params || !("location" in params)) utils.showLog("隐藏所有位置的原生模版广告");

    }


    /**
     * 隐藏原生试玩广告
     */
    hideNativeTryGameWidget() {

        for (let i = 0; i < this._customAdObjs.length; i++) {
            if (this._customAdObjs[i]) {
                this._customAdObjs[i].destroy()
            }
        }

        for (let i = 0; i < this._customAdObjs.length; i++) {
            this._customAdObjs.splice(i, 1)
        }
    }



    nativeBannerAd: any = null;
    public showNativeBannerAd(location: BannerLocation, args: any = null) {
        utils.showLog("展示原生banner广告!");

        if (!utils.wechatTool.isOverMinVersion("2.11.1")) {
            utils.showLog("当前版本不支持原生模版广告!");
            return;
        }

        if (!this.ServerConfig) {
            utils.showLog("组件未初始化！");
            return;
        }


        if (!utils.config.wechatconfig.nativeBannerId) {
            utils.showLog("原生Banner广告ID配置不存在");
            return;
        }

        let bannerWidth = 325;
        let bannerHeight = 100;

        let left = (this.sysInfo.screenWidth - bannerWidth) / 2;
        let top = this.sysInfo.screenHeight - bannerHeight;

        if (this.nativeBannerAd) {
            if (this.nativeBannerAd.isShow()) {
                utils.showLog("原生Banner正在显示，不重新创建！")
            } else {
                this.nativeBannerAd.show().then(() => {
                    utils.showLog("原生Banner广告显示成功！");
                    this.HideDefaultBanner();
                }).catch((err) => {
                    utils.showLog("原生Banner广告显示失败！");
                    this.nativeBannerAd && this.nativeBannerAd.destroy();
                    this.nativeBannerAd = null;
                    if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "native") {
                        this._createBanner(location, args);
                    }
                });
            }
            return;
        }
        //@ts-ignore
        let customAd = wx.createCustomAd({
            adUnitId: utils.config.wechatconfig.nativeBannerId,
            adIntervals: utils.wechatTool.ServerConfig.refresh_ad_time || 30,
            style: {
                left: left,
                top: top,
                width: bannerWidth
            }
        });
        utils.showLog("native nanner ad style left=" + left + ",top=" + top + ";  screenWidth=" + this.sysInfo.screenWidth + ", screenHeight=" + this.sysInfo.screenHeight)
        customAd.onError((erro) => {
            utils.showLog("原生Banner广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            this.nativeBannerAd && this.nativeBannerAd.destroy();
            this.nativeBannerAd = null;
            if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "native") {
                this._createBanner(location, args);
            }
        })

        customAd.onLoad(() => {
            utils.showLog("原生Banner广告加载成功！");
            customAd.show().then(() => {
                this.nativeBannerAd && this.nativeBannerAd.destroy();
                this.nativeBannerAd = customAd;
                utils.showLog("原生Banner广告显示成功！");
                this.HideDefaultBanner();

            }).catch((err) => {
                utils.showLog("原生Banner广告显示失败！");
                this.nativeBannerAd && this.nativeBannerAd.destroy();
                this.nativeBannerAd = null;
                if (this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "native") {
                    this._createBanner(location, args);
                }
            });
        })
    }

    nativeIntersititialAd: any = null;
    public showNativeIntersititialAd() {
        utils.showLog("展示原生插屏广告!");

        if (!utils.wechatTool.isOverMinVersion("2.11.1")) {
            utils.showLog("当前版本不支持原生模版广告!");
            return;
        }

        if (!this.ServerConfig) {
            utils.showLog("组件未初始化！");
            return;
        }


        if (!utils.config.wechatconfig.nativeInsertIds) {
            utils.showLog("原生插屏广告ID配置不存在");
            return;
        }


        let insertWidth = 345;
        let insertHeight = 420;
        if (cc.winSize.width > cc.winSize.height) {
            insertHeight = 300
        }
        let left = (this.sysInfo.screenWidth - insertWidth) / 2;
        let top = (this.sysInfo.screenHeight - insertHeight) / 2;

        if (this.nativeIntersititialAd) {
            if (this.nativeIntersititialAd.isShow()) {
                utils.showLog("原生插屏正在显示，不重新创建！")
            } else {
                this.nativeIntersititialAd.show().then(() => {
                    utils.showLog("原生插屏广告显示成功！");
                }).catch((err) => {
                    utils.showLog("原生插屏广告显示失败！");
                    this.nativeIntersititialAd && this.nativeIntersititialAd.destroy();
                    this.nativeIntersititialAd = null;
                    if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "native") {
                        this._createMiniGameInsertAd();
                    }
                });
            }
            return;
        }
        //@ts-ignore
        let customAd = wx.createCustomAd({
            adUnitId: utils.config.wechatconfig.nativeInsertIds,
            adIntervals: 60,
            style: {
                left: left,
                top: top,
                width: insertWidth
            }
        });
        utils.showLog("native insert ad style left=" + left + ",top=" + top + ";  screenWidth=" + this.sysInfo.screenWidth + ", screenHeight=" + this.sysInfo.screenHeight)
        customAd.onError((erro) => {
            utils.showLog("原生插屏广告异常！>>>>> #code=" + erro.errCode + " #msg=" + erro.errMsg);
            this.nativeIntersititialAd && this.nativeIntersititialAd.destroy();
            this.nativeIntersititialAd = null;
            if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "native") {
                this._createMiniGameInsertAd();
            }
        })
        customAd.onLoad(() => {
            utils.showLog("原生插屏广告加载成功！");
            customAd.show().then(() => {
                this.nativeIntersititialAd && this.nativeIntersititialAd.destroy();
                this.nativeIntersititialAd = customAd;
                utils.showLog("原生插屏广告显示成功！");
            }).catch((err) => {
                utils.showLog("原生插屏广告显示失败！");
                this.nativeIntersititialAd && this.nativeIntersititialAd.destroy();
                this.nativeIntersititialAd = null;
                if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "native") {
                    this._createMiniGameInsertAd();
                }
            });
        })
    }
}
