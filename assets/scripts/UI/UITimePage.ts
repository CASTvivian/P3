import UIPage from "../Framework/UIPage";
import { PanelName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import { utils } from "../../common-plugin/Scripts/Utils";
import TweenEffect from "../Framework/TweenEffect";
import GameDate from "../Game/gameDate";

const { ccclass, property } = cc._decorator;

class ItemTime {
    private _id: number = 0;
    private _node: cc.Node = null;
    private _info: { time: number, coinNum: number, diamondNum: number };

    private _txt_zxsc: cc.Node = null;
    private _txt_ylq: cc.Node = null;
    private _btn: cc.Node = null;
    private _label_coin: cc.Label = null;
    private _label_diamond: cc.Label = null;
    private _label_time: cc.Label = null;

    constructor(i, n: cc.Node) {
        this._id = i;
        this._node = n;
        this._info = GameDate.TimeReward[i];

        this._txt_zxsc = this._node.getChildByName("txt_zxsc");
        this._txt_ylq = this._node.getChildByName("txt_ylq");
        this._btn = this._node.getChildByName("btn");
        this._btn.on(cc.Node.EventType.TOUCH_END, this.click, this);
        this._label_coin = this._node.getChildByName("label_coin").getComponent(cc.Label);
        this._label_coin.string = this._info.coinNum + "";
        this._label_diamond = this._node.getChildByName("label_diamond").getComponent(cc.Label);
        this._label_diamond.string = this._info.diamondNum + "";
        this._label_time = this._node.getChildByName("label_time").getComponent(cc.Label);
        this._label_time.string = cocosz.StoHMS(this._info.time);
    }

    click() {
        // 领取奖励
        let arrRecieve = cocosz.dataMgr.receiveToday;
        if (arrRecieve[this._id] == 0) { 
            cocosz.audioMgr.playBtnEffect();
            arrRecieve[this._id] = 1;
            cocosz.dataMgr.receiveToday = arrRecieve;
            this.update();

            cocosz.dataMgr.CoinCount += this._info.coinNum;
            cocosz.dataMgr.DiamondCount += this._info.diamondNum;
        }
    }

    update() {
        // 时间达到
        if (cocosz.dataMgr.OnlineToday >= this._info.time) {
            let arrRecieve = cocosz.dataMgr.receiveToday;
            // 已领取
            if (arrRecieve[this._id]) {
                this._btn.active = this._txt_zxsc.active = this._label_time.node.active = false;
                this._txt_ylq.active = true;
            }
            // 待领取
            else {
                this._txt_ylq.active = this._txt_zxsc.active = this._label_time.node.active = false;
                this._btn.active = true;
            }
        }
        // 时间未达到
        else {
            this._txt_ylq.active = this._btn.active = false;
            this._txt_zxsc.active = this._label_time.node.active = true;
        }
    }

}

/**
 * 皮肤试用面板
 */
@ccclass
export default class UITimePanel extends UIPage {

    private mask: cc.Node = null;
    private panel: cc.Node = null;

    private label_online: cc.Label = null;
    private itemList: ItemTime[] = [];

    constructor() {
        super(PanelName.UITimePanel);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this.mask = this._page.getChildByName("mask");
        this.panel = this._page.getChildByName("panel");
        // 按钮
        let btnNames: string[] = ["BtnBack"];
        for (let i = 0; i < btnNames.length; i++) {
            let btn: cc.Node = cc.find(btnNames[i], this.panel);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            }
        }
        // 在线时间
        this.label_online = this.panel.getChildByName("label_online").getComponent(cc.Label);
    }

    protected onOpen() {
        utils.SendEvent("页面-在线奖励");
        this._initPanel();
    }

    protected onClose(): void { }

    private _initPanel() {
        TweenEffect.panel_mask_opacity(this.mask)
        TweenEffect.panel_open_moveY(this.panel);

        // 列表
        for (let i = 0; i < 5; i++) {
            let n = this.panel.getChildByName("item" + i);
            if (n) {
                let item = new ItemTime(i, n);
                this.itemList.push(item);
            }
        }

        cc.tween(this._page)
            .call(() => { this.updateTime(); })
            .delay(1)
            .union()
            .repeatForever()
            .start();
    }

    updateTime() {
        // 显示在线时间
        this.label_online.string = cocosz.StoHMS(cocosz.dataMgr.OnlineToday);
        // 更新列表
        this.itemList.forEach(v => {
            v.update();
        })

    }

    /**
     * 所有按钮点击事件
     * @param event 
     * @param data 
     */
    private async _onBtnClickedHandler(event: cc.Event, data: any) {
        cocosz.audioMgr.playBtnEffect();

        switch (event.target.name) {
            case "BtnBack": {
                TweenEffect.panel_close_moveY(this.panel, () => {
                    cocosz.uiMgr.closePanel(PanelName.UITimePanel);
                });
                break;
            }
        }
    }


}
