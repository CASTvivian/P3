import UIPage from "../Framework/UIPage";
import Constant, { PageName, PanelName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import Msg from "../Framework/Msg";
import FlyCoin from "../Framework/FlyCoin";
import { utils } from "../../common-plugin/Scripts/Utils";
import TweenEffect from "../Framework/TweenEffect";
// @ts-ignore
const i18n = require('LanguageData');


const { ccclass, property } = cc._decorator;


const REWARD_SIGN: number[] = [500, 1000, 1500, 50, 2000, 2500, 100];

class DayItem {
    private _index: number = -1;
    private _node: cc.Node = null;

    private _normal: cc.Node = null;
    private _current: cc.Node = null;
    private _got: cc.Node = null;
    private _label: cc.Label = null;

    constructor(index: number, node: cc.Node) {
        this._index = index;
        this._node = node;

        this._normal = this._node.getChildByName("st1");
        this._current = this._node.getChildByName("st2");
        this._got = this._node.getChildByName("st3");

        if (this._node.getChildByName("rewardLabel")) {
            this._label = this._node.getChildByName("rewardLabel").getComponent(cc.Label);
            this._label.node.scale = 0.7;
            this._label.node.setPosition(this._node.x, this._node.y - 60);
            this._label.node.setParent(this._node.parent);
            this._label.string = "+" + REWARD_SIGN[this._index];
        }
    }

    public setStatus(status: number) {
        if (status == 0) {
            this._normal.active = true;
            this._current.active = false;
            this._got.active = false;
            this._label.node.active = true;
        }
        else if (status == 1) {
            this._normal.active = false;
            this._current.active = true;
            this._got.active = false;
            this._label.node.active = true;
        }
        else if (status == 2) {
            this._normal.active = true;
            this._current.active = false;
            this._got.active = true;
            this._label.node.active = false;
        }
    }

    public update() {
        // 上一次领取的是第几天,从0开始
        let lastDayIndex: number = cocosz.dataMgr.LastDailyBonusIndex;
        // 超过一天, 重置一下天数
        if (lastDayIndex == 6) {
            lastDayIndex = -1;
        }
        // 上次领取的时间
        const lastDayTime: string = cocosz.dataMgr.LastDailyBonusTime;
        let canGet: boolean = false;
        if (new Date().toDateString() != lastDayTime && this._index == lastDayIndex + 1) {
            canGet = true;
        }
        // cc.log(`lastDayIndex: ${lastDayIndex} --- lastDayTime: ${lastDayTime}`);

        // this._got.active = false;
        // this._normal.active = false;
        // this._current.active = false;
        if (this._index <= lastDayIndex) {
            // 已经领取过了
            // this._got.active = true;
            this.setStatus(2)
        } else {
            if (canGet) {
                this.setStatus(1)
                // this._current.active = true;
            } else {
                this.setStatus(0)
                // this._normal.active = true;
            }
        }
    }
}

@ccclass
export default class UISignPanel extends UIPage {

    private _mask: cc.Node = null;
    private _panel: cc.Node = null;
    private _btnGet: cc.Node = null;
    private _btnDouble: cc.Node = null;
    private _btnClose: cc.Node = null;
    private _day: DayItem[] = [];


    constructor() {
        super(PanelName.UISignPanel);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this._panel = this._page.getChildByName("Panel");
        this._mask = this._page.getChildByName("mask");
        let btnNames: string[] = ["BtnClose", "BtnDouble", "BtnGet"];
        for (let i = 0; i < btnNames.length; i++) {
            let btn: cc.Node = cc.find(btnNames[i], this._panel);
            if (!btn) continue
            btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);

            if (btn.name == "BtnGet") {
                this._btnGet = btn;
            } else if (btn.name == "BtnDouble") {
                this._btnDouble = btn;
                this._btnDouble.active = cocosz.isADON;
            }
            else {
                this._btnClose = btn;
            }
        }

        for (let i = 0; i < 6; i++) {
            let dayItem: DayItem = new DayItem(i, this._panel.getChildByName("Day_" + (i + 1)));
            this._day.push(dayItem);
        }

    }

    protected onOpen() {
        // 上报 首页签到
        utils.umaEvent("gamegamesign");
        utils.SendEvent("页面-签到");
        this._initPanel();
    }

    private _initPanel() {
        TweenEffect.panel_open_scale(this._panel);
        // 缩放
        this._updateDayItem();
    }

    private _updateDayItem() {
        for (let i = 0; i < 6; i++) {
            this._day[i].update();
        }
    }

    private async _onBtnClickedHandler(event: cc.Event, data: any) {
        cocosz.audioMgr.playBtnEffect();
        
        switch (event.target.name) {
            case "BtnGet": {
                if (!this._canGetBonus()) {
                    Msg.Show(i18n.t("msg.jryqd"));//今日已领取奖励
                    return;
                }
                this._getReward(false);
                break;
            }
            case "BtnDouble": {
                if (!this._canGetBonus()) {
                    Msg.Show(i18n.t("msg.jryqd"));//今日已领取奖励
                    return;
                }
                utils.SendEvent("视频-双倍签到-播放")
                cocosz.watchAD(() => {
                    utils.SendEvent("视频-双倍签到-成功")
                    this._getReward(true);
                }, () => {
                    utils.SendEvent("视频-双倍签到-失败")
                });
                break;
            }
            case "BtnClose": {
                cocosz.uiMgr.closePanel(PanelName.UISignPanel);
                break;
            }
        }
    }

    private _getReward(double: boolean) {
        if (double == false) {
            // 上报 普通签到
            utils.umaEvent("gamesignordinary");
            utils.SendEvent("签到-普通");
        } else {
            // 上报 双倍签到
            utils.umaEvent("gamedoublesign");
            utils.SendEvent("签到-双倍");
        }

        // 签到索引
        let lastDayIndex: number = cocosz.dataMgr.LastDailyBonusIndex;
        if (lastDayIndex == 6) {
            lastDayIndex = -1;
        }
        let curDayIndex = lastDayIndex + 1;
        // 奖励数量
        let count: number = REWARD_SIGN[curDayIndex];
        if (double) { count *= 2; }
        if (curDayIndex == 3 || curDayIndex == 6) {
            // 钻石
            Msg.Show(i18n.t("msg.gxhdzs") + count);
            cocosz.dataMgr.DiamondCount += count;
            // 飞金币事件
            setTimeout(() => {
                cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Fly_Coin, iconName: 'diamond', frameNodeName: 'CoinLabel2' })
            }, 500);
        } else {
            // 金币
            Msg.Show(i18n.t("msg.gxhdjb") + count);
            cocosz.dataMgr.CoinCount += count;
            // 飞金币事件
            setTimeout(() => {
                cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Fly_Coin, iconName: 'coin', frameNodeName: 'CoinLabel' })
            }, 500);
        }
        // 本地信息
        cocosz.dataMgr.LastDailyBonusIndex = curDayIndex;
        cocosz.dataMgr.LastDailyBonusTime = new Date().toDateString();
        // 刷新UI
        // this._updateDayItem();
        // 关闭弹窗
        cocosz.uiMgr.closePanel(PanelName.UISignPanel);
    }

    private _canGetBonus() {
        return (new Date().toDateString() != cocosz.dataMgr.LastDailyBonusTime);
    }

}
