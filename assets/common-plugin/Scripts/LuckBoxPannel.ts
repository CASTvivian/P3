import { utils } from "./Utils";
import { BannerLocation, ViewLocation, YZ_Reward } from "./YZ_Constant";
import AldUtils from "./AldUtils";
import PlatUtils from "./PlatUtils";


const { ccclass, property } = cc._decorator;


/**
 * 五倍奖励宝箱
 */
@ccclass
export default class LuckBoxPanel extends cc.Component {


    @property(cc.Node)
    showVideoBtn: cc.Node = null

    @property(cc.Node)
    clickBtn: cc.Node = null

    @property(cc.Label)
    btnLabel: cc.Label = null

    @property(cc.Node)
    panel: cc.Node = null

    @property(cc.Node)
    videoIcon: cc.Node = null

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Node)
    boxNode: cc.Node = null;


    /**
     * 奖励回调
     */
    rewardCallFunc: Function = null;

    /**
     * 奖励值
     */
    rewardValue: number = 0;

    //幸运宝箱显示的广告类型
    _luck_box_ad_type: string = "1";
    //跳过按钮延迟显示时间
    _delay_show_btn_time: number = 0;

    //幸运宝箱开始回退的时间
    _luck_box_progressbar_back_time: number = 1000;

    /**
     * 展示广告的进度条百分比
     */
    _showAdProgress: number = 0.8;



    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }


        this.rewardCallFunc = utils.rewardCallFunc;

        this.rewardValue = utils.rewardValue;

        this.panel.scale = 0;

        utils.SendEvent("幸运宝箱-显示成功！");

        this.clickBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.clickBtnTouchCancel.bind(this));
        this.clickBtn.on(cc.Node.EventType.TOUCH_END, this.clickBtnTouchCancel.bind(this));

        this.progressBar.progress = 0;



        this.btnLabel.node.opacity = 0;
        this.btnLabel.node.active = false;


        utils.luckBoxShowCount++;
        let adTypes = utils.ServerConfig.luck_box_ad_type ? utils.ServerConfig.luck_box_ad_type.split(",") : this._luck_box_ad_type;
        let closeBtnShowDelays = utils.ServerConfig.luck_box_close_btn_show_delay ? utils.ServerConfig.luck_box_close_btn_show_delay.split(",") : this._delay_show_btn_time;
        let progressbarBackTimes = utils.ServerConfig.luck_box_progressbar_back_time ? utils.ServerConfig.luck_box_progressbar_back_time.split(",") : this._luck_box_progressbar_back_time;
        if (utils.luckBoxShowCount > adTypes.length - 1) {
            utils.luckBoxShowCount = 0;
        }


        utils.showLog(`幸运宝箱显示次数：${utils.luckBoxShowCount}`);
        this._luck_box_ad_type = adTypes[utils.luckBoxShowCount];
        this._delay_show_btn_time = closeBtnShowDelays[utils.luckBoxShowCount];
        this._luck_box_progressbar_back_time = progressbarBackTimes[utils.luckBoxShowCount];


        if (utils.ServerConfig.luck_box_show_ad_progress_percent) {
            let showAdProPercents = utils.ServerConfig.luck_box_show_ad_progress_percent.split(",");
            this._showAdProgress = showAdProPercents[utils.luckBoxShowCount];
        } else {
            switch (this._luck_box_ad_type) {
                case "1":
                case "5":
                    this._showAdProgress = 0.45;
                    break;
                case "2":
                    this._showAdProgress = 0.3;
                    break
                case "3":
                    //插屏点击进度超过0.3就调用广告
                    this._showAdProgress = 0.85;
                    break
                case "4":
                    this._showAdProgress = 0.85;
                    break;
                default:
                    this._showAdProgress = 0.45;
                    break;
            }
        }
        utils.showLog(`幸运宝箱显示类型：${this._luck_box_ad_type} #showBtnTime=${this._delay_show_btn_time} #progressbarBackTime=${this._luck_box_progressbar_back_time}`);





        if (this._luck_box_ad_type != "4") {
            this.scheduleOnce(() => {
                if (this.btnLabel.node && cc.isValid(this.btnLabel.node)) {
                    this.btnLabel.node.active = true;
                    this.btnLabel.node.runAction(cc.fadeIn(0.3));
                }
            }, this._delay_show_btn_time);
        }


        if (utils.ServerConfig.luck_box_video_icon_is_show && utils.ServerConfig.luck_box_video_icon_is_show == "true") {
            this.videoIcon.active = true;
        } else {
            this.videoIcon.active = false;
        }





        if (this._luck_box_ad_type == "1") {
            utils.adManager.HideBanner(BannerLocation.Game);

            if (PlatUtils.IsIOS && PlatUtils.IsQQ) {
                this.scheduleOnce(() => {
                    if (this.clickBtn && cc.isValid(this.clickBtn)) {
                        this.clickBtn.setPosition(this.clickBtn.x, this.progressBar.node.position.y - 200);
                    }
                }, 10)
            }
        } else {
            this.clickBtn.getComponent(cc.Widget).isAlignBottom = false;
            this.clickBtn.getComponent(cc.Widget).updateAlignment();
            this.clickBtn.setPosition(this.clickBtn.x, this.progressBar.node.position.y - 200);
        }


        // this.boxNode.runAction(cc.sequence(cc.scaleTo(1, 1.3).easing(cc.easeElasticIn(1.0)), cc.scaleTo(1, 1).easing(cc.easeElasticOut(3.0)), cc.delayTime(1)).repeatForever())
    }


    _openSlowDown: boolean = false;
    _timetaskId: number = 0;
    _cancelSlowDown: boolean = false;
    clickBtnTouchCancel() {
        clearTimeout(this._timetaskId);
        this._timetaskId = setTimeout(() => {
            this._openSlowDown = true;
        }, this._luck_box_progressbar_back_time * 1000);
    }


    _slowDownSpeed: number = 0.2;
    update(dt) {
        if (this.progressBar.progress > 0 && this.progressBar.progress < 1 && this._openSlowDown && !this._cancelSlowDown) {
            this.progressBar.progress -= dt * this._slowDownSpeed;
            if (this.progressBar.progress <= 0) {
                this.progressBar.progress = 0;
            }
        }
    }

    onEnable() {
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        } else {
            ratio = cc.winSize.width / 1080;
        }
        this.panel.scale = ratio;
    }


    onDestroy() {
        utils.adManager.HideBanner(BannerLocation.Game)
        utils.hideRecommendGamesBanner();
        if (utils.rewardLuckBoxPanelCloseFunc) {
            utils.rewardLuckBoxPanelCloseFunc();
            utils.rewardBoxPanelCloseFunc = null;
        } else {
            utils.rewardCloseFunc && utils.rewardCloseFunc();
            utils.rewardCloseFunc = null;
        }
    }

    onClose() {
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
            this.node.destroy();
        })));
    }


    _progresss: number = 0;
    _totalProgress: number = 5;
    _isShowAd: boolean = false;
    _videoIsPlay: boolean = false;
    /**
     * 狂点
     */
    onBtnClick() {
        this._openSlowDown = false;
        if (this.progressBar.progress < 1) {
            this.progressBar.progress += 0.10;
            if (this.progressBar.progress >= 1) {
                this.progressBar.progress = 1;
                this.openLuckBox();
            }
        }
        if (this.videoIcon.active && !this._videoIsPlay) {
            this._videoIsPlay = true;
            utils.adManager.ShowVideo((res, msg) => {
                if (PlatUtils.IsDouyin) {
                    if (res) {
                        utils.showMsg("获得奖励! +" + this.rewardValue);
                        let result: YZ_Reward = new YZ_Reward();
                        result.rewardValue = this.rewardValue;
                        if (this.rewardCallFunc) {
                            this.rewardCallFunc(result);
                        }
                        this.onClose();
                    } else {
                        this._videoIsPlay = false;
                        utils.showMsg(msg ? msg : "视频加载失败！");
                    }
                } else {
                    utils.showMsg("获得奖励! +" + this.rewardValue);
                    let result: YZ_Reward = new YZ_Reward();
                    result.rewardValue = this.rewardValue;
                    if (this.rewardCallFunc) {
                        this.rewardCallFunc(result);
                    }
                    this.onClose();
                }
            });
        }




        if (this.progressBar.progress >= this._showAdProgress && !this._isShowAd) {
            this._isShowAd = true;

            //1、banner（默认） 2、插屏 3、盒子广告 4、视频广告 
            switch (this._luck_box_ad_type) {
                case "1":
                    utils.showLog("服务器配置幸运宝箱展示-banner广告！");
                    utils.adManager.ShowBanner(BannerLocation.Game);
                    setTimeout(() => {
                        if (this.clickBtn && cc.isValid(this.clickBtn)) {
                            this.clickBtn.setPosition(this.clickBtn.x, this.progressBar.node.position.y - 200);
                        }
                    }, 900)
                    break;
                case "2":
                    utils.showLog("服务器配置幸运宝箱展示-插屏广告！");
                    utils.adManager.ShowInterstitial();
                    break;
                case "3":
                    utils.showLog("服务器配置幸运宝箱展示-盒子广告！");
                    utils.adManager.ShowAppBox();
                    break
                case "4":
                    utils.showLog("服务器配置幸运宝箱展示-视频广告！");
                    // this.progressBar.progress = 1;
                    this.videoIcon.active = true;
                    // cc.find("Background/clickTxt", this.clickBtn).active = false;
                    // cc.find("Background/btn_ok", this.clickBtn).active = true;
                    this._cancelSlowDown = true;
                    this.scheduleOnce(() => {
                        if (this.btnLabel.node && cc.isValid(this.btnLabel.node)) {
                            this.btnLabel.node.active = true;
                            this.btnLabel.node.runAction(cc.fadeIn(0.3));
                        }
                    }, this._delay_show_btn_time);
                    break;
                case "5":
                    utils.showLog("服务器配置幸运宝箱展示-互推banner广告！");
                    utils.showRecommendGamesBanner();
                    break;
                default:
                    utils.showLog("服务器配置幸运宝箱展示banner广告！");
                    utils.adManager.ShowBanner(BannerLocation.Game);
                    setTimeout(() => {
                        if (this.clickBtn && cc.isValid(this.clickBtn)) {
                            this.clickBtn.setPosition(this.clickBtn.x, this.progressBar.node.position.y - 200);
                        }
                    }, 500)
                    break;
            }
        }
    }

    /**
     * 打开宝箱
     */
    openLuckBox() {
        if (utils.ServerConfig.luck_box_play_video == "true") {
            this.onPlayVideo();
            this.onClose();
        } else {
            utils.showMsg("获得奖励! +" + this.rewardValue);
            let result: YZ_Reward = new YZ_Reward();
            result.rewardValue = this.rewardValue;
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        }
    }

    onHideBtn() {
        this.onClose();
    }


    onPlayVideo() {
        utils.adManager.ShowVideo((ret, msg) => {
            if (ret) {
                utils.showMsg("获得奖励! +" + this.rewardValue);
                this.rewardValue = this.rewardValue;
                AldUtils.SendEvent("幸运宝箱-获取奖励成功！");
            } else {
                utils.showMsg("获得奖励! +" + this.rewardValue);
                AldUtils.SendEvent("幸运宝箱-视频播放失败！");
            }
            let result: YZ_Reward = new YZ_Reward();
            result.rewardValue = this.rewardValue;
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        })
    }


}
