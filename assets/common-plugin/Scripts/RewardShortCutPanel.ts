import { utils } from "./Utils";
import { YZ_Reward, BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";

const { ccclass, property } = cc._decorator;

/**
 * 分享录屏面板
 */
@ccclass
export default class RewardShortCutPanel extends cc.Component {

    bg: cc.Node = null;
    btnOk: cc.Node = null;
    btnCancel: cc.Node = null;
    glodNode: cc.Node = null;
    glodLabel: cc.Label = null;

    /**
     * 奖励回调
     */
    rewardCallFunc: Function = null;

    /**
     * 奖励值
     */
    rewardValue: number = 0;

    _showBanner: boolean = false;


    onLoad() {


        utils.SendEvent("结算前广告-创建快捷桌面-展示成功！");

        let shortcutCreated = false;
        if (PlatUtils.IsOPPO) {
            shortcutCreated = utils.oppoTool._shortcutCreated;
        } else if (PlatUtils.IsVIVO) {
            shortcutCreated = utils.Tool_Vivo._shortcutCreated;
        }

        if (shortcutCreated) {
            utils.showLog("已经存在桌面快捷方式，当前窗口直接销毁！");
            utils.SendEvent("结算前广告-创建快捷桌面-已经存在桌面快捷方式！");
            this.node.destroy();
            return;
        }
        // cc.log(`utils.ServerConfig.auto_desktop>${utils.ServerConfig.auto_desktop === 0},${utils.ServerConfig.auto_desktop == 0}<`);
        if (utils.ServerConfig.auto_desktop != undefined && utils.ServerConfig.auto_desktop === 0) {
            utils.showLog("服务器配置直接创建桌面，不显示弹窗，当前窗口直接销毁！");
            utils.SendEvent("结算前广告-创建快捷桌面-服务器配置直接创建桌面，不显示弹窗！");
            utils.cur_tool && utils.cur_tool.createShortcut && utils.cur_tool.createShortcut((res) => {
                utils.SendEvent("结算前广告-直接创建快捷桌面-创建成功！");
            })
            this.node.destroy();
            return;
        }
        this.rewardValue = utils.rewardValue;
        this.rewardCallFunc = utils.rewardCallFunc;

        this.initUi();
        this.initListener();

        if (cc.winSize.height < cc.winSize.width) {
            utils.adManager.HideBanner(BannerLocation.Game);
        } else {
            this._showBanner = true;
            utils.adManager.ShowBanner(BannerLocation.Game);
        }
    }

    /**
     * 初始化UI
     */
    protected initUi(): void {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        this.bg = this.node.getChildByName("Panel").children[0];

        this.btnCancel = this.bg.getChildByName("btnClose");
        this.btnOk = this.bg.getChildByName("btnOk");
        this.glodNode = this.bg.getChildByName("rewardLabel");
        this.glodLabel = this.glodNode.getComponent(cc.Label);


        this.glodLabel.string = "奖励+" + this.rewardValue;
        if (this.rewardValue == 0) {
            this.glodNode.active = false;
        }
        utils.showSkipBtn(this.btnCancel);
    }



    onDestroy() {
        this._showBanner && utils.adManager.HideBanner(BannerLocation.Game)
        if (utils.rewardShortCutPanelCloseFunc) {
            utils.rewardShortCutPanelCloseFunc();
            utils.rewardShortCutPanelCloseFunc = null;;
        } else {
            utils.rewardCloseFunc && utils.rewardCloseFunc();
            utils.rewardCloseFunc = null;
        }

        utils.cur_tool && utils.cur_tool.checkHasShortCut && utils.cur_tool.checkHasShortCut()

    }

    onClose() {
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
            this.node.destroy();
        })));
    }

    onEnable() {
        this.bg.scale = 0;
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        } else {
            ratio = cc.winSize.width / 1080;
        }
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()), cc.callFunc(() => {
            this.btnOk.runAction(cc.sequence(
                cc.scaleTo(0.5, 1.15),
                cc.scaleTo(0.5, 1)
            ).repeatForever());
        })));
    }


    protected onCreateShortCut() {
        if (PlatUtils.IsOPPO) {

            utils.oppoTool.createShortcut((res) => {
                utils.SendEvent("结算前广告-创建快捷桌面-创建成功！");
                this.rewardFunc(res)
            })
        } else if (PlatUtils.IsVIVO) {
            utils.Tool_Vivo.createShortcut((res) => {
                utils.SendEvent("结算前广告-创建快捷桌面-创建成功！");
                this.rewardFunc(res)
            })
        }
    }




    /**
     * 初始化监听事件
     */
    protected initListener(): void {

    }


    /**
     * 分享回调
     * @param ret 
     * @param msg 
     */
    rewardFunc(ret) {
        if (ret) {
            let result: YZ_Reward = new YZ_Reward();
            result.rewardValue = this.rewardValue;
            utils.showMsg("添加成功！奖励：+" + this.rewardValue);
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        } else {
            utils.showMsg("添加失败！");
            this.onClose();
        }
    }


    /**
     * 初始化数据
     */
    protected initData(): void {

    }

    // update (dt) {}
}
