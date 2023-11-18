import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdAgentQQ extends AdAgent {

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
    qq: any = window.qq;
    public Init() {
        if (PlatUtils.IsQQ) {
            utils.registerServerInitEvent(() => {
                this._sysData = utils.Tool_QQ.getSystemInfo();
                this._initVideoAd();
            }, this);
        }
    }


    public get ServerConfig() {
        return utils.Tool_QQ.ServerConfig;
    }

    // /**
    //  * 初始化游戏盒子
    //  */
    // _initAppBox() {
    //     let checkVersion: boolean = utils.Tool_QQ.isOverMinVersion("1.7.1");
    //     if (checkVersion) {
    //         this._appBox = qq.createAppBox({
    //             adUnitId: utils.config.qqconfig.appBoxId
    //         });
    //         this._appBox.load().then(() => {
    //             utils.showLog("游戏盒子加载成功！")
    //         }).catch(() => {
    //             utils.showLog("游戏盒子加载失败！");
    //         });
    //     } else {
    //         cc.warn("当前基础库版本低于1.7.1，不显示盒子广告");
    //     }
    // }

    _initVideoAd() {
        if (!this._videoAd) {
            utils.showLog("初始化视频!");
            if (!utils.config.qqconfig.videoId) {
                utils.showLog("视频ID配置错误!");

                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }

            // if (!utils.Tool_QQ.isOverMinVersion("0.1.26")) {
            //     utils.showLog("当前版本不支持视频广告!");
            //     if (this._videoCallback) {
            //         this._videoCallback(false, "暂无视频广告!");
            //         this._videoCallback = null;
            //     }
            //     return;
            // }

            utils.showLog("视频广告ID:", utils.config.qqconfig.videoId.trim());
            this._videoAd = this.qq.createRewardedVideoAd({
                adUnitId: utils.config.qqconfig.videoId
            });

            if (this._videoAd) {
                utils.showLog("初始化注册视频回调!");
                this._videoAd.onLoad(() => {
                    utils.showLog("激励视频加载成功");
                    this._isVideoLoaded = true;

                    if (this._isVideoShow) {
                        this._videoAd.show().then(() => {
                        }).catch(() => {
                            utils.showLog("视频播放失败！");
                            if (this._videoCallback) {
                                this._videoCallback("暂无视频广告!");
                                this._videoCallback = null;
                            }
                        });
                    }
                });

                this._videoAd.onError((err) => {
                    utils.showLog("激励视频加载失败!", err.code, err.msg);
                    this._isVideoLoaded = false;
                    if (this._videoCallback) {
                        this._videoCallback(false, "暂无视频广告!");
                        this._videoCallback = null;
                    }
                });

                this._videoAd.onClose((res) => {
                    this._isVideoShow = false;
                    if (res && res.isEnded || res === undefined) {
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
            } else {
                utils.showLog("激励视频初始化失败!");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
            }
        }
    }

    _bannerShow: boolean = false;
    _bannerSizePercent: number = 0.5;
    _bannerBottom: number = 0;
    _oldBannerLocation: BannerLocation = BannerLocation.None;

    _curBannerHeight: number = 240;

    _moveBtn: cc.Node = null;
    _cur_level: any = null;
    _createBanner(location: BannerLocation, args: any = null) {
        if (PlatUtils.IsQQ) {


            if (!utils.config.qqconfig.bannerId) {
                utils.showLog("banner广告ID不存在");
                return;
            }
            var argsTmp: any = args;
            this._bannerShow = false;

            if (argsTmp && argsTmp.width) {
                this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
                this._bannerSizePercent = argsTmp.width > 1 ? 1 : this._bannerSizePercent;
            }

            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                this._bannerBottom = this._bannerBottom < 0 ? 0 : this._bannerBottom;
                this._bannerBottom = this._bannerBottom > this._sysData.screenHeight ? this._sysData.screenHeight : this._bannerBottom;
            }

            // IOS平台不支持onResize更改尺寸，所以这里宽度固定最小值
            // let width = this._sysData.screenWidth * this._bannerSizePercent;
            let width = 300;
            let height = 72;
            let left = (this._sysData.screenWidth - width) / 2;
            let top = this._sysData.screenHeight - height - this._bannerBottom;
            let params = {
                adUnitId: utils.config.qqconfig.bannerId,
                style: {
                    left: left,
                    width: width,
                    top: top,
                    height: height,
                }
            };

            let bannerAd: any = null;
            let oldBannerAd: any = this._curBannerAd;

            bannerAd = this.qq.createBannerAd(params);

            utils.showLog("bannerAd ", bannerAd);
            if (bannerAd) {
                bannerAd.onError((err) => {
                    utils.showLog("广告条加载失败! ", JSON.stringify(err));
                    this._bannerShow = false;
                    // if (location == BannerLocation.Game && this.ServerConfig.banner_first_ad && this.ServerConfig.banner_first_ad == "1") {
                    //     utils.showLog("服务器配置banner广告优先级为默认banner，游戏页面备用显示积木广告！");
                    //     this.showBlockAd({ bottom: 0 });
                    // }
                });

                bannerAd.onLoad(() => {
                    if (this._bannerShow) {
                        return;
                    }

                    this._bannerShow = true;
                    try {
                        bannerAd.show().then(() => {
                            utils.showLog("Banner广告显示成功!");
                            if (this.ServerConfig.banner_move_btn_interval && this._cur_level && this._cur_level % this.ServerConfig.banner_move_btn_interval == 0) {
                                this.moveBtnToBannerTop();
                            }
                            if (oldBannerAd) {
                                oldBannerAd.destroy();
                            }
                            this._curBannerAd = bannerAd;
                        }).catch((err) => {
                            utils.showLog("Banner广告出错", JSON.stringify(err));
                            this._bannerShow = false;
                        });
                    } catch (error) {
                        if (this.ServerConfig.banner_move_btn_interval && this._cur_level && this._cur_level % this.ServerConfig.banner_move_btn_interval == 0) {
                            this.moveBtnToBannerTop();
                        }
                        utils.showLog("Banner ad Show erro", error);
                    }

                });

                bannerAd.onResize((res: any) => {
                    if (res) {
                        this._curBannerHeight = res.height * this._sysData.pixelRatio;
                    }
                });
            }
        }
    }

    _showBannerTimer(location: BannerLocation, args: any) {
        let locationTmp: BannerLocation = location;
        let argsTmp: any = args;
        utils.showLog(`显示Banner广告xxx！location:${locationTmp}; 间隔时间:${utils.Tool_QQ.ServerConfig.refresh_ad_time}:优先级：${this.ServerConfig.banner_first_ad}`);

        // if (this.ServerConfig.banner_first_ad) {
        //     switch (this.ServerConfig.banner_first_ad) {
        //         case "default":
        //             this._createBanner(locationTmp, argsTmp);
        //             break;
        //         case "box":
        //             if (!utils.Tool_QQ.isOverMinVersion("1.15.0")) {
        //                 utils.showLog("当前版本不支持积木广告，显示默认banner");
        //                 this._createBanner(locationTmp, argsTmp);
        //                 return;
        //             }
        //             this.showBlockAd();
        //             break;
        //         // case "3":
        //         //     this._createBanner(locationTmp, argsTmp);
        //         //     this.showBlockAd();
        //         //     break;
        //     }

        // } else {

        let banner_delay_time = this.ServerConfig.banner_delay_time ? this.ServerConfig.banner_delay_time : 0;
        utils.showLog(`延迟${banner_delay_time}秒显示banner`);
        if (!this.ServerConfig.banner_move_btn_interval || !this._cur_level || this._cur_level % this.ServerConfig.banner_move_btn_interval != 0) {
            utils.showLog("当前关卡不做延迟移动！");
            this.moveBtnToBannerTop();
        }
        this._showBannerTimerId = setTimeout(() => {
            this._createBanner(locationTmp, argsTmp)
        }, banner_delay_time * 1000);
        // }
    }





    _showBannerTimerId: number = 0;
    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        if (PlatUtils.IsQQ) {
            if (utils.Tool_QQ.ServerConfig) {
                let locationTmp: BannerLocation = location;
                let argsTmp: any = args;
                this._moveBtn = args ? args.moveBtn : null;
                this._cur_level = args ? args.cur_level : null;
                this._showBannerTimer(locationTmp, argsTmp);
            } else {
                utils.showLog("服务器配置数据未初始化!");
            }
        }
    }

    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        if (PlatUtils.IsQQ) {
            utils.showLog("隐藏广告条");
            this._bannerShow = false;
            clearInterval(this._showBannerTimerId);
            if (this._curBannerAd) {
                this._curBannerAd.hide();
            }
        }
    }


    public ShowVideo(callback: Function) {
        if (PlatUtils.IsQQ) {
            this._videoCallback = callback;
            this._isVideoShow = true;

            if (!this._videoAd) {
                this._initVideoAd();
            } else {
                this._videoAd.show().then(() => {
                    utils.showLog("视频显示成功！");
                }).catch((err) => {
                    utils.showLog("视频未加载！");
                    this._videoAd.load();
                });
            }
        }
    }


    /**
     * 显示插屏
     * 2001	触发频率限制	小程序启动一定时间内不允许展示插屏广告
     * 2002	触发频率限制	距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告
     * 2003	触发频率限制	当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告
     * 2004	广告渲染失败	该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败
     * 2005	广告调用异常	插屏广告实例不允许跨页面调用
     * 销毁插屏广告后才能重新创建
     * @param location 
     */
    public ShowInterstitial(location: BannerLocation = null) {
        if (PlatUtils.IsQQ) {

            if (!utils.Tool_QQ.isOverMinVersion("1.12.0")) {
                utils.showLog("当前版本" + utils.Tool_QQ._sysInfo.SDKVersion + "不支持插屏广告和盒子广告!");
                return;
            }

            if (this.ServerConfig) {
                if (this.ServerConfig.intersititial_first_ad) {
                    utils.showLog(`服务器插屏优先级>>>${this.ServerConfig.intersititial_first_ad}`);
                    switch (this.ServerConfig.intersititial_first_ad) {
                        case "default":
                            utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            break;
                        case "box":
                            if (!utils.Tool_QQ.isOverMinVersion("1.7.1")) {
                                utils.showLog("当前版本" + utils.Tool_QQ._sysInfo.SDKVersion + "不支持盒子广告,显示插屏");
                                utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                                return;
                            }
                            utils.delayCall(this.ShowAppBox.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            break;
                        case "onlydefault":
                            utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                            break;
                    }
                } else {
                    utils.showLog("服务器未配置优先级，显示默认插屏");
                    utils.delayCall(this._createInsterstitial.bind(this), this.ServerConfig.intersititia_delay_show_time || 0);
                }
            }
        }
    }


    _isShow: boolean = false;
    public _createInsterstitial() {
        utils.showLog("_createInsterstitial >>> 222");
        // if (this._insertAd) {
        //     this._insertAd.destroy();
        // }
        // let insertId;

        if (!this._insertAd) {
            this._insertAd = this.qq.createInterstitialAd({ adUnitId: utils.config.qqconfig.insertId })

            this._insertAd.onError((err) => {
                switch (err.errCode) {
                    case 2001:
                        utils.showLog("小程序启动一定时间内不允许展示插屏广告");
                        break;
                    case 2002:
                        utils.showLog("距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告");
                        break;
                    case 2003:
                        utils.showLog("当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告");
                        break;
                    case 2004:
                        utils.showLog("该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败");
                        break;
                    case 2005:
                        utils.showLog("插屏广告实例不允许跨页面调用");
                        break;
                    default:
                        utils.showLog("插屏加载失败! ", JSON.stringify(err));
                        break;
                }

                if (this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "default") {
                    utils.showLog("优先显示的是插屏广告，备用显示盒子广告！");
                    let show_level = this.ServerConfig.insert_show_appBox_level ? this.ServerConfig.insert_show_appBox_level : 0;
                    if (utils.currentLevel > show_level) {
                        this.ShowAppBox();
                    } else {
                        utils.showLog("备用显示盒子广告未达到关卡限制要求");
                    }
                }
            });
            // this._insertAd.onLoad(() => {
            //     utils.showLog("插屏加载成功! ");
            // })


            this._insertAd.onClose(() => {
                utils.showLog("插屏广告关闭成功！");
            });

        }


        if (this._insertAd) {

            this._insertAd.load().then(() => {
                utils.showLog("插屏加载成功! ");
                this._insertAd.show().then(() => {
                    utils.showLog("插屏广告显示成功!");
                }).catch((err) => {
                    utils.showLog("插屏广告出错", JSON.stringify(err));
                });
            }).catch(() => {
                utils.showLog("插屏加载失败! ");
            });


            if (!this._isShow) {
                this._insertAd.show().then(() => {
                    utils.showLog("插屏广告显示成功!");
                }).catch((err) => {
                    utils.showLog("插屏广告出错", JSON.stringify(err));
                });
                this._isShow = true;
            }

        }
    }
    /**
     * 显示游戏盒子
     */
    public ShowAppBox(isMoreGame?: boolean) {
        if (PlatUtils.IsQQ) {
            if (!utils.Tool_QQ.isOverMinVersion("1.7.1")) {
                utils.showLog("当前版本" + utils.Tool_QQ._sysInfo.SDKVersion + "不支持游戏盒子!");
                return;
            }
            utils.showLog(">>>>>ShowAppBox");

            if (this._appBox) {
                this._appBox.destroy().then(() => {

                    utils.showLog("游戏盒子id为:", utils.config.qqconfig.boxId);
                    this._appBox = this.qq.createAppBox({
                        adUnitId: utils.config.qqconfig.boxId
                    });
                    this._appBox.load().then(() => {
                        utils.showLog("游戏盒子加载成功！")
                        this._appBox.show().then(() => {
                            utils.showLog("游戏盒子显示成功！");
                        }).catch((err) => {
                            utils.showLog("游戏盒子未加载！#err=", JSON.stringify(err));
                        });
                    }).catch((err) => {
                        utils.showLog("游戏盒子加载失败！ #err=", JSON.stringify(err));

                        if (!isMoreGame && this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "box") {
                            utils.showLog("优先显示的是盒子广告，备用显示插屏");
                            this._createInsterstitial();
                        }
                    });
                }).catch((err) => {
                    utils.showLog("游戏盒子销毁失败！ #err=", JSON.stringify(err));
                });;
            } else {

                utils.showLog("游戏盒子id为:", utils.config.qqconfig.boxId);
                this._appBox = this.qq.createAppBox({
                    adUnitId: utils.config.qqconfig.boxId
                });
                this._appBox.load().then(() => {
                    utils.showLog("游戏盒子加载成功！")
                    this._appBox.show().then(() => {
                        utils.showLog("游戏盒子显示成功！");
                    }).catch((err) => {
                        utils.showLog("游戏盒子未加载！#err=", JSON.stringify(err));
                    });
                }).catch((err) => {
                    utils.showLog("游戏盒子加载失败！ #err=", JSON.stringify(err));
                    if (!isMoreGame && this.ServerConfig.intersititial_first_ad && this.ServerConfig.intersititial_first_ad == "box") {
                        utils.showLog("优先显示的是盒子广告，备用显示插屏");
                        this._createInsterstitial();
                    }
                });
            }

        }
    }

    /**
     * 隐藏游戏盒子
     */
    public HideAppbox() {
        if (PlatUtils.IsQQ) {
            if (this._appBox) {
                this._appBox.destroy().then(() => {
                    utils.showLog("游戏盒子销毁成功！");
                }).catch(() => {
                    cc.warn("游戏盒子销毁失败!");
                });
            }
        }
    }

    _blockAd: any = null;
    /**
      * 显示积木广告
      */
    public showBlockAd(parme?: any) {
        if (!this.ServerConfig) {
            utils.showLog("组件未初始化！");
            return;
        }

        if (!utils.config.qqconfig.bannerBoxId) {
            utils.showLog("积木广告ID不存在");
            return;
        }

        if (this.ServerConfig.is_banner_box == "false") {
            utils.showLog("服务器配置积木广告不展示！");
            return;
        }

        if (this._blockAd) {
            this._blockAd.offLoad();
            this._blockAd.offResize();
            this._blockAd.offError();
            this._blockAd.destroy();
        }

        if (PlatUtils.IsIOS && this._sysData.screenHeight < 736) {

            let top = 16;
            let left = 16;
            let width = 65;
            if (parme.top) {
                // top = parme.top
                top = parme.top / cc.winSize.height * this._sysData.screenHeight
            } else {
                // top = this._sysData.screenHeight - 65.5 - parme.bottom
                top = this._sysData.screenHeight - 65.5 - parme.bottom / cc.winSize.height * this._sysData.screenHeight;
            }

            this._blockAd = this.qq.createBlockAd({
                adUnitId: utils.config.qqconfig.bannerBoxId,
                style: {
                    left: left,
                    top: top
                },
                size: parme.showNum ? parme.showNum : 5,
                orientation: "landscape"
            })

            this._blockAd.onResize((res) => {
                this._blockAd.offResize();
                utils.showLog("this._sysData", JSON.stringify(this._sysData));
                utils.showLog("onresize >>", JSON.stringify(res));

                this._blockAd.show().then(() => {
                    utils.showLog("显示成功！");
                }).catch((res) => {
                    utils.showLog("显示异常", JSON.stringify(res));
                });
                if (parme.showNum == 1) {
                    width = 0
                } else {
                    width = res.width;
                }
                if (parme.left) {
                    // left = width + parme.left;
                    left = parme.left / cc.winSize.width * this._sysData.screenWidth;
                } else if (parme.right) {
                    left = this._sysData.screenWidth - res.width - parme.right / cc.winSize.width * this._sysData.screenWidth;
                } else {
                    left = (this._sysData.screenWidth - width) / 2;
                }
                this._blockAd.style.left = left;
                utils.showLog("onresize end>>", this._blockAd.style.top, "<<", this._blockAd.style.left, "<<");
            })
        } else {
            this._blockAd = this.qq.createBlockAd({
                adUnitId: utils.config.qqconfig.bannerBoxId,
                style: {
                    left: 16,
                    top: 16
                },
                size: parme.showNum ? parme.showNum : 5,
                orientation: "landscape"
            })
            // if (parme.top) {
            //     console.log("实际位置:", parme.top / cc.winSize.height * this._sysData.screenHeight, cc.winSize.height, parme.top)
            // }
            // else if (parme.bottom) {
            //     console.log("实际位置:", this._sysData.screenHeight - 60 - parme.bottom / cc.winSize.height * this._sysData.screenHeight,cc.winSize.height,parme.bottom)
            // }

            this._blockAd.onResize((res) => {
                this._blockAd.offResize();
                utils.showLog("this._sysData", JSON.stringify(this._sysData));
                utils.showLog("onresize >>", JSON.stringify(res));
                if (parme) {
                    utils.showLog("parme:" + JSON.stringify(parme))
                    if (parme.top) {
                        utils.showLog("积木广告TOP位置：", parme.top);
                        this._blockAd.style.top = parme.top / cc.winSize.height * this._sysData.screenHeight;
                    } else if (parme.bottom) {
                        // let bottom = this._sysData.screenHeight - res.height;
                        // this._blockAd.style.top = bottom - parme.bottom;
                        this._blockAd.style.top = this._sysData.screenHeight - res.height - parme.bottom / cc.winSize.height * this._sysData.screenHeight;
                    }
                    if (parme.left) {
                        // this._blockAd.style.left = parme.left;
                        this._blockAd.style.left = parme.left / cc.winSize.width * this._sysData.screenWidth;
                    } else if (parme.right) {
                        // this._blockAd.style.left = this._sysData.screenWidth - res.width - parme.right;
                        this._blockAd.style.left = this._sysData.screenWidth - res.width - parme.right / cc.winSize.width * this._sysData.screenWidth;
                    } else {
                        this._blockAd.style.left = (this._sysData.screenWidth - res.width) / 2;
                    }
                } else {
                    this._blockAd.style.top = this._sysData.screenHeight - res.height;
                    this._blockAd.style.left = (this._sysData.screenWidth - res.width) / 2;
                }

                this._blockAd.show().then(() => {
                    utils.showLog("显示成功！");
                }).catch((res) => {
                    utils.showLog("显示异常", JSON.stringify(res));
                });

                utils.showLog("onresize end>>", this._blockAd.style.top, "<<", this._blockAd.style.left, "<<");
            })
        }

        this._blockAd.onLoad(() => {
            utils.showLog("积木广告加载成功！");
        });

        this._blockAd.onError((res) => {
            utils.showLog("积木广告加载失败！", res.errMsg, ">>", res.errCode);
        });

    }

    /**
     * 隐藏积木广告
     */
    public hideBlockAd() {
        utils.showLog("隐藏积木广告");
        if (this._blockAd) this._blockAd.hide()
    }

    public moveBtnToBannerTop() {
        utils.showLog("moveBtnToBannerTop >>>>>>>>>.");

        if (this.ServerConfig && this._moveBtn && cc.isValid(this._moveBtn)) {
            let moveBtnTime = 0;
            let btn: cc.Node = this._moveBtn;
            if (this.ServerConfig.banner_move_btn_interval && this._cur_level && this._cur_level % this.ServerConfig.banner_move_btn_interval == 0) {
                if (this.ServerConfig.banner_move_btn_time) {
                    moveBtnTime = this.ServerConfig.banner_move_btn_time;
                }
            }

            utils.showLog(moveBtnTime == 0 ? "按钮直接显示在banner上面" : `按钮居底部且${moveBtnTime}秒后移动`);
            setTimeout(() => {
                if (btn && cc.isValid(btn)) {
                    if (this._sysData.screenHeight < 600) {
                        btn.getComponent(cc.Widget).bottom = 250;
                    } else {
                        btn.getComponent(cc.Widget).bottom = 220;
                    }
                    btn.getComponent(cc.Widget).updateAlignment();
                }
            }, moveBtnTime * 1000);
        }
    }

}
