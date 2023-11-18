import { utils } from "./Utils";
import WithdrawalNode from "./WithdrawalNode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WithdrawalWidget extends cc.Component {

    @property(cc.Prefab)
    withdrawalPanel: cc.Prefab = null;

    _withdrawalNode: WithdrawalNode = null;
    _isInit: boolean = false;

    onLoad() {
        this._withdrawalNode = this.getComponentInChildren("WithdrawalNode");
        this._withdrawalNode.node.active = false;
    }

    onEnable() {
        utils.registerServerInitEvent(() => {
            this._initWidget();
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }

    _initWidget() {
        this._withdrawalNode.node.active = true;
        // this._withdrawalNode.init({});
    }


}
