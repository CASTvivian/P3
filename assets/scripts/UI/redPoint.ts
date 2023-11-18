import { cocosz } from "../Framework/CocosZ";
import Constant from "../Framework/Constant";
import GameDate from "../Game/gameDate";


const { ccclass, property } = cc._decorator;

enum RedPointType {
    none = 0,
    sign,
    turntable,
    online
}

@ccclass
export default class RedPoint extends cc.Component {

    @property({ type: cc.Enum(RedPointType), tooltip: "红点类型" })
    type: number = RedPointType.none;

    @property({ tooltip: "点击父节点刷新红点" })
    refreshOnClick: boolean = true;

    @property({ tooltip: "是否刷新" })
    isRefresh: boolean = false

    @property({ tooltip: "是否缓动角度" })
    isTweenAngle: boolean = false;

    @property({ tooltip: "是否缓动缩放" })
    isTweenScale: boolean = false;

    @property({ tooltip: "是否监听" })
    isListen: boolean = false;

    start() {
        this.node.opacity = 0;
        // 刷新
        this.setRedPoint();
        if (this.isRefresh) {
            cc.tween(this.node)
                .delay(1)
                .call(() => { this.setRedPoint(); })
                .union()
                .repeatForever()
                .start();
        }
        // 缓动角度
        if (this.isTweenAngle) {
            cc.tween(this.node).by(0.25, { angle: 15 }).by(0.25 * 2, { angle: -30 }).by(0.25, { angle: 15 }).delay(1).union().repeatForever().start();
        }
        // 缓动缩放
        if (this.isTweenScale) {
            cc.tween(this.node).by(0.25, { scale: 0.1 }).by(0.25 * 2, { scale: -0.2 }).by(0.25, { scale: 0.1 }).delay(1).union().repeatForever().start();
        }
        // 监听事件
        if (this.isListen) {
            cc.game.on(Constant.E_GAME_LOGIC, this._onGameMessageHandler, this);
        }
    }

    /** 销毁监听 */
    protected onDestroy(): void {
        cc.game.targetOff(this);
    }

    /** 监听事件 */
    private _onGameMessageHandler(event: any) {
        switch (event.type) {

        }
    }

    /** 监听消息 */
    onClick() {
        // 本地存储
        switch (this.type) { }
        // 点击父节点刷新红点
        if (this.refreshOnClick) {
            this.setRedPoint();
        }
    }

    /** 显示 */
    show() {
        this.node.opacity = 255;
        // 点击监听
        if (this.node.parent) {
            this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
        }
    }

    /** 隐藏 */
    hide() {
        this.node.opacity = 0;
        // 取消监听
        if (this.node.parent) {
            this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
        }
    }

    /** 设置红点  */
    setRedPoint() {
        switch (this.type) {
            case RedPointType.sign: {
                let bool = (new Date().toDateString() != cocosz.dataMgr.LastDailyBonusTime);
                bool ? this.show() : this.hide();
                break;
            }
            case RedPointType.turntable: {
                let bool = (cocosz.useCJTimes < Constant.commonCJTimes);
                bool ? this.show() : this.hide();
                break;
            }
            case RedPointType.online: {
                let arr = cocosz.dataMgr.receiveToday;
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i]) {
                        if (cocosz.dataMgr.OnlineToday > GameDate.TimeReward[i].time) {
                            this.show();
                            return;
                        }
                    }
                }
                this.hide();
                break;
            }
        }
    }
}
