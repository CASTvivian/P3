import TryGameNode from "./TryGameNode";
import { utils } from "./Utils";
import NativeTryGameNode from "./NativeTryGameNode";
import PlatUtils from "./PlatUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NativeTryGamesWidget extends cc.Component {

    _tryGameNode: NativeTryGameNode = null;
    _btnClose: cc.Node = null;

    onLoad() {
        this._tryGameNode = this.getComponentInChildren("NativeTryGameNode");
        this._tryGameNode.node.active = false;
        this._btnClose = this._tryGameNode.node.getChildByName("BtnClose");
    }

    init() {

        if (!this._tryGameNode) {
            this._tryGameNode = this.getComponentInChildren("NativeTryGameNode");
            this._btnClose = this._tryGameNode.node.getChildByName("BtnClose");
        }


        if (utils.isShowNativeTryGamesWidget()) {
            let dataValid: boolean = true;
            if (utils.tryGameDate) {
                if (utils.tryGameDate.length <= 0) {
                    cc.warn("res的长度不合法！");
                    dataValid = false;
                }
            } else {
                cc.warn("res不存在！");
                dataValid = false;
            }

            utils.showLog("原生抖动dataValid：" + dataValid);
            if (dataValid) {
                utils.showLog("交叉推广数据:", JSON.stringify(utils.tryGameDate));
                this._tryGameNode.init({ "jump_refresh_time": utils.ServerConfig.icon_jump_native, "jump_list": utils.tryGameDate });
                this._tryGameNode.node.active = true;
                if (PlatUtils.IsHuaWei) {
                    utils.showLog("华为平台，显示关闭按钮>>>>>")
                    this._btnClose.active = true;
                }
            } else {
                this._tryGameNode.node.active = false;
            }
        } else {
            this._tryGameNode.node.active = false;
        }
    }

    close() {
        this._tryGameNode.node.opacity = 0;
    }
}
