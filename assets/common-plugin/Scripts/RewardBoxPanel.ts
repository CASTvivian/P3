import { utils } from "./Utils";
import YZ_Constant, { BannerLocation, YZ_Reward } from "./YZ_Constant";
import AldUtils from "./AldUtils";
import PlatUtils from "./PlatUtils";
import YZ_LocalStorage from "./YZ_LocalStorage";


const { ccclass, property } = cc._decorator;


/**
 * 五倍奖励宝箱
 */
@ccclass
export default class RewardBoxPanel extends cc.Component {

    @property(cc.Node)
    checked: cc.Node = null

    @property(cc.Node)
    doubleBtn: cc.Node = null

    @property(cc.Node)
    tripleVideoBtn: cc.Node = null

    @property(cc.Node)
    tripleBtn: cc.Node = null

    @property(cc.Label)
    goldLabel: cc.Label = null

    @property(cc.Node)
    tirpNode: cc.Node = null


    @property(cc.Node)
    light: cc.Node = null

    @property(cc.Node)
    panel: cc.Node = null

    @property(cc.Node)
    closeBtn: cc.Node = null


    /**
     * 奖励回调
     */
    rewardCallFunc: Function = null;

    /**
     * 奖励值
     */
    rewardValue: number = 0;



    private set boxGetRewardCount(value: number) {
        this._boxGetRewardCount = value;
        YZ_LocalStorage.setItem(YZ_Constant.ST_GET_BOX_REWARD_COUNT, value + '');
    }

    _boxGetRewardCount: number = 0;

    private get boxGetRewardCount() {
        return this._boxGetRewardCount;
    }


    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }

        this.rewardCallFunc = utils.rewardCallFunc;

        this.rewardValue = utils.rewardValue;

        if (cc.winSize.height < cc.winSize.width) {
            utils.adManager.HideBanner(BannerLocation.Game);
        } else {
            utils.adManager.ShowBanner(BannerLocation.Game);
        }
        this.panel.scale = 0;

        this._boxGetRewardCount = YZ_LocalStorage.getItem(YZ_Constant.ST_GET_BOX_REWARD_COUNT) || 0;
        // let result = utils.controView(ViewLocation.box);
        // this.checked.active = result.isSelect;
        // this.tripLabel.string = result.msg;
        // if (result.btnType) {
        //     this.btnLabel.string = "领取五倍奖励"
        // } else {
        //     this.btnLabel.string = "领取奖励"
        // }

        AldUtils.SendEvent("奖励宝箱显示成功！");
        this.goldLabel.string = "/" + this.rewardValue.toString();
    }

    onEnable() {
        utils.showSkipBtn(this.closeBtn, true);
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        } else {
            ratio = cc.winSize.width / 1080;
        }
        if (PlatUtils.IsTest) {
            utils.ServerConfig.reward_box_change_count = 5;
        }
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()), cc.callFunc(() => {

            let changeCount = utils.ServerConfig.reward_box_change_count ? parseInt(utils.ServerConfig.reward_box_change_count) : 0;

            if (utils.ServerConfig.reward_box_change_count != undefined && this.boxGetRewardCount >= changeCount) {
                this.tripleVideoBtn.active = true;
                this.tripleBtn.active = false
                utils.showScaleAction(this.tripleVideoBtn, this.doubleBtn, true, true);
            } else {
                this.tripleVideoBtn.active = false;
                utils.showScaleAction(this.tripleBtn, null, false, true);
            }
            this.light.runAction(cc.rotateBy(3, +360).repeatForever())
        })));
    }


    onDestroy() {
        utils.adManager.HideBanner(BannerLocation.Game)
        if (utils.rewardBoxPanelCloseFunc) {
            utils.rewardBoxPanelCloseFunc();
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

    // /**
    // * 初始化事件回调
    // * @param closeCallFunc 
    // * @param rewardCallFunc 
    // */
    // init(closeCallFunc: Function, rewardCallFunc: Function, reward: number) {
    //     this.closeCallFunc = closeCallFunc;
    //     this.rewardCallFunc = rewardCallFunc;
    //     this.rewardValue = reward;
    // }


    onPlayVideo() {
        utils.adManager.ShowVideo((ret, msg) => {
            if (ret) {
                utils.showMsg(`获得${this._multiple}倍奖励! +${this.rewardValue * this._multiple}`);
                this.rewardValue = this.rewardValue * this._multiple;
                this.boxGetRewardCount++;
                let result: YZ_Reward = new YZ_Reward();
                result.rewardValue = this.rewardValue;
                if (this.rewardCallFunc) {
                    this.rewardCallFunc(result);
                }
                this.onClose();
                AldUtils.SendEvent("宝箱获取奖励成功！");
            } else {
                utils.showMsg(msg ? msg : "视频广告播放失败！");
                AldUtils.SendEvent("宝箱视频播放失败！");
            }
        })
    }


    _multiple: number = 1;
    /**
     * 领取金币
     */
    onGetGold(event, data) {
        this._multiple = parseInt(data);
        switch (event.target.name) {

            case "BtnTripleVideo":
                AldUtils.SendEvent("点击宝箱视频获取按钮！");
                this.onPlayVideo();
                break;
            case "BtnDouble":
            case "BtnTriple":
                AldUtils.SendEvent("点击宝箱普通获取按钮！");
                utils.showMsg(`获得${this._multiple}倍奖励! +${this.rewardValue * this._multiple}`);
                this.boxGetRewardCount++;
                if (this.rewardCallFunc) {
                    let result: YZ_Reward = new YZ_Reward();
                    result.rewardValue = this.rewardValue * this._multiple;
                    this.rewardCallFunc(result);
                }
                this.onClose();
                break;
        }
    }

}
