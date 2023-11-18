import TryGameNode from "./TryGameNode";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TryGamesWidget extends cc.Component {

    _tryGameNode: TryGameNode = null;
    _isInit: boolean = false;

    onLoad() {

        this._tryGameNode = this.getComponentInChildren("TryGameNode");
        this._tryGameNode.node.active = false;
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
        if (this._isInit) return;


        let dataValid: boolean = true;
        let data: any = utils.getInnerRecommendData();
        if (data) {

            if (data.jump_list) {
                if (data.jump_list.length <= 0) {
                    cc.warn("字段jump_list的长度不合法！");
                    dataValid = false;
                }
            } else {
                cc.warn("字段jump_list不存在！");
                dataValid = false;
            }
        } else {
            cc.warn("交叉推广数据为null");
            dataValid = false;
        }

        if (dataValid) {
            this._isInit = true;
            utils.showLog("交叉推广数据:", JSON.stringify(data));
            this._tryGameNode.init({ "jump_refresh_time": data.jump_refresh_time, "jump_list": data.jump_list });
            this._tryGameNode.node.active = true;
        } else {
            this.node.destroy();
        }
    }


}
