import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

/**
 * 趣头条广告组件
 */
@ccclass
export default class AdAgentQTT extends AdAgent {

    _bannerAd: any = null;
    _videoAd: any = null;

    _isInsertAdShow: boolean = false;
    _isInsertAdLoaded: boolean = false;

    _videoCallback: Function = null;
    _isVideoLoaded: boolean = false;
    _isVideoShow: boolean = false;

    //@ts-ignore
    qttGame = window.qttGame;


    public get ServerConfig() {
        if (utils._tool_QTT && utils._tool_QTT.ServerConfig) {
            return utils._tool_QTT.ServerConfig;
        }
        return {};
    }
    /**
     * 当视频广告资源不足
     * 备选互动广告
     * -- 平台强制添加 ---
     */
    options: any = null;


    public Init() {
        if (PlatUtils.IsQTT) {
            if (!utils.config.qttconfig.showAd) {
                cc.warn("广告开关关闭状态，所有广告不显示！要显示广告，请打开 CommonUtils 组件上VIVIO 配置下的广告开关！");
            }


            // this.options = {};
            // this.options.gametype = 1;//互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
            // this.options.rewardtype = 1;//互动广告框，只有 1
            // this.options.data = {};
            // this.options.data.title = "获得奖励";//互动抽中奖后的道具提示文字
            // this.options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png";//互动抽中奖后的道具图标(可选)
            // this.options.callback = (res) => {
            //     //回调函数
            //     utils.showLog("播放互动广告>> #res=", res)
            //     if (res == 1) {
            //         //播放完成，发放奖励
            //         if (this._videoCallback) {
            //             this._videoCallback(true, "");
            //             this._videoCallback = null;
            //         }
            //     } else {
            //         //res = 0    填充不足
            //         if (this._videoCallback) {
            //             this._videoCallback(false, "广告加载失败,请稍后再试!");
            //             this._videoCallback = null;
            //         }
            //     }
            // };
        }
    }

    /**
     * 创建互动广告
     */
    private createOption() {
        let options: any = {};
        options.gametype = (Math.floor(Math.random() * 3 + 1));//互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
        options.rewardtype = 1;//互动广告框，只有 1
        options.data = {};
        options.data.title = "获得奖励";//互动抽中奖后的道具提示文字
        options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png";//互动抽中奖后的道具图标(可选)
        options.callback = (res) => {
            //回调函数
            utils.showLog("播放互动广告>> #res=", res)
            if (res == 1) {
                //播放完成，发放奖励
                if (this._videoCallback) {
                    this._videoCallback(true, "");
                    this._videoCallback = null;
                }
            } else {
                //res = 0    填充不足
                if (this._videoCallback) {
                    this._videoCallback(false, "广告加载失败,请稍后再试!");
                    this._videoCallback = null;
                }
            }
        };
        return options;
    }

    /**
     * 显示banner
     */
    public ShowBanner(): void {
        if (PlatUtils.IsQTT) {
            if (!utils.config.qttconfig.showAd) {
                return;
            }
            var options: any = {};
            options.index = location; //

            if (cc.winSize.height < cc.winSize.width) {
                //横屏游戏
                options.x = 1;
                options.y = 1;
                options.w = cc.winSize.width;
                options.stage_width = cc.winSize.width;
                options.stage_height = cc.winSize.height;
            }
            this.qttGame.showBanner(options);
        }
    }


    /**
     * 隐藏banner
     */
    public HideBanner(): void {
        if (PlatUtils.IsQTT) {
            if (!utils.config.qttconfig.showAd) {
                return;
            }
            this.qttGame.hideBanner();
        }
    }

    /**
     * 暂时没有插屏广告
     * @param location 
     */
    public ShowInterstitial(location: BannerLocation = BannerLocation.Home): void {
        // if (PlatUtils.IsQTT) {
        //     if (!utils.config.qttconfig.showAd) {
        //         return;
        //     }
        // }
        return;
    }

    /**
     * 显示互动直弹广告 
     */
    public showInteractiveAd(): void {
        if (PlatUtils.IsQTT) {
            if (!this.checkInsertAdShow()) {
                return;
            }
            var options: any = {};
            options.rewardtype = 1; //互动广告框，只有 1


            utils.showLog("互动直弹时间间隔开始");
            this._insertLastShowTime = new Date().getTime();
            this.qttGame.showHDReward(options);
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

        utils.showLog("qtt服务器插屏间隔显示时间为：" + intervalTime + "秒！");
        utils.showLog("qtt插屏当前广告间隔时间：" + interval + "秒！");

        if (intervalTime > 0 && interval < intervalTime) {
            utils.showLog("qtt插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }

        return true;
    }

    /**
     * 显示视频广告
     * @param callback 回调函数
     */
    public ShowVideo(callback: Function) {
        if (PlatUtils.IsQTT) {
            this._videoCallback = callback;

            if (!utils.config.qttconfig.showAd) {
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            this._isVideoShow = true;
            let opt = this.createOption();
            this.qttGame.showVideo((res) => {
                utils.showLog("播放视频广告>> #res=", res)
                if (res == 1) {
                    if (this._videoCallback) {
                        this._videoCallback(true, "");
                        this._videoCallback = null;
                    }
                } else {
                    if (this._videoCallback) {
                        if (res == 0) {
                            this._videoCallback(false, "广告加载失败,请稍后再试!");
                        } else if (res == 2) {
                            this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                        }
                        this._videoCallback = null;
                    }
                }
            }, opt);
        }
    }


}
