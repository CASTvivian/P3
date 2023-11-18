import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_RecordWidget extends cc.Component {

    _panel: cc.Node = null;
    _normalBtn: cc.Node = null;
    _actionBtn: cc.Node = null;
    _isRecording: boolean = false;
    _originScale: number = 1;

    onLoad() {
        this._panel = this.node.getChildByName("Panel");
        this._panel.active = false;
        let background: cc.Node = this._panel.getChildByName("Background");
        this._normalBtn = background.getChildByName("normalBtn");
        this._actionBtn = background.getChildByName("actionBtn");
        this._originScale = this._actionBtn.scale;
    }

    _onGameMessage(event: any) {
        switch (event.type) {
            case "YZ_RecordStart": {
                this._updateState();
                break;
            }
            case "YZ_RecordEnd": {
                this._updateState();
                break;
            }
        }
    }

    onEnable() {
        cc.game.on("YZ_CommonMessage", this._onGameMessage, this);

        utils.registerServerInitEvent(() => {

            this._panel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
                event.stopPropagation();
                if (!utils.isRecording) {
                    utils.recordStart();
                } else {
                    utils.isSuccess = undefined;
                    if (utils.cur_tool && utils.cur_tool.isClickEnd != undefined) {
                        utils.cur_tool.isClickEnd = true;
                    }
                    utils.recordEnd();
                }
            }, this);


            this._updateState();

            if (utils.isShowRecordWidget()) {
                this._panel.active = true;
            } else {
                utils.showLog("不支持录屏!");
                this.node.destroy();
            }
        }, this);

        // if (PlatUtils.IsDouyin) {
        //     utils.showLog("record onEnable");
        //     utils.Tool_Douyin.isAutoShare = true;
        // }
        if (utils.cur_tool && utils.cur_tool.isAutoShare != undefined) {
            utils.cur_tool.isAutoShare = true;
        }

    }

    onDisable() {
        cc.game.targetOff(this);

        // utils.isRecording = false;
        // this._updateState();
        // if (PlatUtils.IsDouyin) {
        //     utils.showLog("record onDisable");
        //     // utils.Tool_Douyin.isAutoShare = false;
        // }
        // utils.recordEnd();

    }

    _updateState() {
        if (utils.isRecording) {
            this._normalBtn.active = false;
            this._actionBtn.active = true;
            this._actionBtn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, this._originScale * 0.8), cc.scaleTo(0.3, this._originScale))));
        } else {
            this._normalBtn.active = true;
            this._actionBtn.stopAllActions();
            this._actionBtn.active = false;
        }
    }
}
