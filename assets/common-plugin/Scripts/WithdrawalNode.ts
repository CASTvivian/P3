import { utils } from "./Utils";
import { SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WithdrawalNode extends cc.Component {
    balanceLbl: cc.Label = null;

    onLoad() {
        this.balanceLbl = this.node.getComponentInChildren(cc.Label)
    }

    public init(data?: any) {
        if (utils.yzRedBagInfo.balance > 0) {
            this.balanceLbl.string = `¥${utils.yzRedBagInfo.balance}`
        } else {
            this.balanceLbl.string = `¥0.00`
        }
    }


    showWithdrawalPanel() {
        utils.SendEvent("红包提现框-点击提现按钮！");
        utils.showWithdrawalPanel();
    }


    onEnable() {
        utils.SendEvent("红包提现框-展示成功！");
        this.init();
        cc.game.on("YZ_RED_BAG_BALANCE_CHANGE", () => {
            this.init();
        }, this);
    }

    onDisable() {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
        cc.game.targetOff(this);
    }




}
