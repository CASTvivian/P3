// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { cocosz } from "../Framework/CocosZ";
import Constant from "../Framework/Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShareOrVideo extends cc.Component {
    _btn: boolean = false;
    @property()
    get btn(): boolean {
        return this._btn;
    }
    set btn(v: boolean) {
        this._btn = false;
        if (this.node.getChildByName("share")) {
            this.shareNode = this.node.getChildByName("share");
        }
        if (this.node.getChildByName("video")) {
            this.videoNode = this.node.getChildByName("video");
        }
    }

    @property({ type: cc.Boolean, tooltip: "是否新手指引免费使用" })
    isGuideSKill: boolean = false;

    @property({ type: cc.Node, tooltip: "分享图标" })
    shareNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "视频图标" })
    videoNode: cc.Node = null;

    protected onLoad(): void {
        // 监听点击
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            cc.game.emit(Constant.E_ShareOrVideo);
        })
        // 监听事件
        cc.game.on(Constant.E_ShareOrVideo, this.show, this);
    }

    protected onDestroy(): void {
        // 注销事件
        cc.game.targetOff(this);
    }

    protected start(): void {
        this.show();
    }

    show() {
        if (this.isGuideSKill && cocosz.dataMgr.guide_skill) {
            // 隐藏分享图标
            if (this.shareNode && this.shareNode.isValid) {
                this.shareNode.active = false;
            }
            // 隐藏视频图标
            if (this.videoNode && this.videoNode.isValid) {
                this.videoNode.active = false;
            }
        } else {
            // 显示分享图标
            if (this.shareNode && this.shareNode.isValid) {
                this.shareNode.active = cocosz.canShare;
            }
            // 显示视频图标
            if (this.videoNode && this.videoNode.isValid) {
                this.videoNode.active = !cocosz.canShare;
            }
        }
    }
}
