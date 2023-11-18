import { utils } from "./Utils";
import { BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RedBagProgressNode extends cc.Component {
    progressLbl: cc.Label = null;
    progressBar: cc.ProgressBar = null;
    tripNode: cc.Node = null;
    tripProgressLbl: cc.Label = null;
    _location: any = "default";
    onLoad() {
        this.progressLbl = this.node.getComponentInChildren(cc.Label)
        this.progressBar = this.node.getComponentInChildren(cc.ProgressBar);
        this.tripNode = cc.find("Mask/tripNode", this.node);
        this.tripNode.opacity = 0;
        this.tripProgressLbl = this.tripNode.getComponentInChildren(cc.Label);
    }


    public init(data?: any) {
        if (data) {
            if (data.location) {
                this._location = data.location;
            }
        }
        cc.log("wid s==========" + utils.yzRedBagInfo.totalProgress + " pro =" + utils.yzRedBagInfo.progress);
        this.progressBar.progress = utils.yzRedBagInfo.progress / utils.yzRedBagInfo.totalProgress;
        this.progressLbl.string = `${utils.yzRedBagInfo.progress}/${utils.yzRedBagInfo.totalProgress}`
        this.tripProgressLbl.string = `通过${utils.yzRedBagInfo.totalProgress}关即可领取红包`

        if (utils.yzRedBagInfo.progress >= utils.yzRedBagInfo.totalProgress) {
            cc.find("Mask/Icon/pro_cghb", this.node).active = false;
            cc.find("Mask/Icon/pro_full", this.node).active = true;
            cc.find("Mask/Icon/pro_full", this.node).stopAllActions();
            cc.find("Mask/Icon/pro_full", this.node).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        } else {
            cc.find("Mask/Icon/pro_cghb", this.node).active = true;
            cc.find("Mask/Icon/pro_full", this.node).active = false;
            cc.find("Mask/Icon/pro_full", this.node).stopAllActions();
        }

        setTimeout(() => {
            if (this.tripNode && cc.isValid(this.tripNode)) {
                this.tripNode.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(() => {
                    if (this.tripNode && cc.isValid(this.tripNode)) {
                        this.tripNode.runAction(cc.sequence(cc.delayTime(5), cc.fadeOut(0.3)));
                    }
                })))
            }
        }, 3000);
    }

    onEnable() {
        this.init();
        utils.SendEvent(`红包进度挂件-${this._location}-展示成功`);
        cc.game.on("YZ_RED_BAG_PROGRESS_CHANGE", () => {
            this.init();
        }, this);
    }

    showOpenRedBagPanel() {
        utils.SendEvent(`红包进度挂件-${this._location}-点击上报`);
        if (utils.yzRedBagInfo.progress >= utils.yzRedBagInfo.totalProgress) {
            utils.showOpenRedBagPanel({ showType: 2 });
        } else {
            utils.showMsg("再挑战" + (utils.yzRedBagInfo.totalProgress - utils.yzRedBagInfo.progress) + "关即可领取现金红包");
        }
    }

    onDisable() {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
        cc.game.targetOff(this);
    }


    // _postData(appid: string) {
    //     utils.postData(appid);
    // }


}
