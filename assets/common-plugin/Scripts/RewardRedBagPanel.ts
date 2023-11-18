
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;


@ccclass
export default class RewardRedBagPanel extends cc.Component {

    private _panel: cc.Node = null;



    // _location: SubLocation = SubLocation.isMoreGame;

    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");

        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this._panel.scale = ratio;
        this.init();
    }

    openRedBag() {
        utils.SendEvent("恭喜获得红包弹窗-点击领取红包！");
        utils.showOpenRedBagPanel({ showType: 2 });
        this.hide();
    }


    public init() {
        utils.SendEvent("恭喜获得红包弹窗-展示成功！");
    }


    public hide() {
        this.node.active = false;
    }

    public onCloseBtnHandler(event: any, data: any) {
        this.hide();
    }
}
