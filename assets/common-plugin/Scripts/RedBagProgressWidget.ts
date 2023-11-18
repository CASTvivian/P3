import RedBagProgressNode from "./RedBagProgressNode";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RedBagProgressWidget extends cc.Component {

    _redBagProgressNode: RedBagProgressNode = null;
    _isInit: boolean = false;
    _data: any = null;

    onLoad() {
        this._redBagProgressNode = this.getComponentInChildren("RedBagProgressNode");
        this._redBagProgressNode.node.active = false;
    }

    onEnable() {
        utils.registerServerInitEvent(() => {
            this._initWidget();
        }, this);
    }

    init(data?: any) {
        this._data = data;
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }


    _initWidget() {
        this._redBagProgressNode._location = this._data ? this._data.location : "default";
        this._redBagProgressNode.node.active = true;
    }


}
