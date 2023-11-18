
import { utils } from "../../common-plugin/Scripts/Utils";
import { cocosz } from "../Framework/CocosZ";
import Msg from "../Framework/Msg";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnAD: cc.Node = null;
    @property(cc.Node)
    btnSkip: cc.Node = null;

    start() {
        if (cocosz.isADON) {
            this.node.scale = 0;
            cc.tween(this.node).to(0.3, { scale: 1 }, { easing: "backOut" }).start();
            utils.SendEvent("页面-" + (this.isDiamond ? "钻石" : "金币"));
        } else {
            this.node.destroy();
        }
    }

    isDiamond: boolean = false;
    setDiamond() {
        this.isDiamond = true;
        this.node.getChildByName("bg").active = false;
        this.node.getChildByName("bg1").active = true;
    }

    watchAD() {
        utils.SendEvent(`视频-${this.isDiamond ? "钻石购买" : "金币购买"}-播放`)
        cocosz.watchAD(() => {
            utils.SendEvent(`视频-${this.isDiamond ? "钻石购买" : "金币购买"}-成功`)
            if (this.isDiamond) {
                let num = cocosz.isDeBug ? 10000 : 200;
                cocosz.dataMgr.DiamondCount += num;
                Msg.Show(i18n.t("msg.gxhdzs") + num);//恭喜获得钻石
            }
            else {
                let num = cocosz.isDeBug ? 10000 : 500;
                cocosz.dataMgr.CoinCount += num;
                Msg.Show(i18n.t("msg.gxhdjb") + num);//恭喜获得金币
            }
            this.node.destroy();
        }, () => {
            utils.SendEvent(`视频-${this.isDiamond ? "钻石购买" : "金币购买"}-失败`)
        })
    }

    exit() {
        cocosz.audioMgr.playBtnEffect();
        this.node.destroy();
    }
}
