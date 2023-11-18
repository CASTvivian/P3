import { utils } from "./Utils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_ShortcutWidget extends cc.Component {

    _panel: cc.Node = null;
    _handImg: cc.Node = null;
    _callback: Function = null;
    public set Callback(value: Function) {
        this._callback = value;
    }

    onLoad() {
        this._panel = this.node.getChildByName("Panel");
        this._panel.active = false;
        this._handImg = cc.find("Panel/handImg", this.node);
        this._handImg.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, CompatibleTool.position(0, -50)), cc.moveBy(0.5, CompatibleTool.position(0, 50)))));
    }

    onEnable() {

        utils.registerServerInitEvent(() => {
            if (!utils.isShowCreateShortcutWidget()) {
                this.node.destroy();
            } else {
                this._panel.active = true;
            }
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }

    onBtnClickHandler(event: any, data: any) {
        switch (event.target.name) {
            case "Btn_Shortcut": {
                if (utils.canCreateShortcut()) {
                    utils.createShortcut((ret) => {
                        if (ret) {
                            utils.showLog("快捷方式创建成功！");
                            if (this._callback) {
                                this._callback(true);
                            }
                        } else {
                            utils.showLog("快捷方式创建失败！");
                            if (this._callback) {
                                this._callback(false);
                            }
                        }
                    });
                }
                break;
            }
        }
    }

}
