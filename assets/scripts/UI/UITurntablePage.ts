import { utils } from "../../common-plugin/Scripts/Utils";
import { cocosz } from "../Framework/CocosZ";
import Constant, { PageName, PanelName } from "../Framework/Constant";
import Msg from "../Framework/Msg";
import TweenEffect from "../Framework/TweenEffect";
import UIPage from "../Framework/UIPage";
import GameDate, { RewardType } from "../Game/gameDate";
import Weapon from "../Game/weapon";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class UITurntablePanel extends UIPage {

    constructor() {
        super(PanelName.UITurntablePanel);
        this.isValid() && this.onLoad();
    }

    private _panel: cc.Node = null;
    private _rewardList: cc.Node = null;
    private _totalLabel: cc.Label = null;
    private _btnCJ: cc.Node = null;
    private _btnAD: cc.Node = null;

    protected onLoad(): void {
        this._panel = this._page.getChildByName("panel");
        this._rewardList = this._panel.getChildByName("rewardList");
        this._totalLabel = this._panel.getChildByName("totalLabel").getComponent(cc.Label);


        const btnNames: string[] = ["BtnBack", "BtnCJ", "BtnAD"];
        for (let i = 0; i < btnNames.length; i++) {
            const btn: cc.Node = this._panel.getChildByName(btnNames[i]);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
                if (btnNames[i] == "BtnCJ") {
                    this._btnCJ = btn;
                } else if (btnNames[i] == "BtnAD") {
                    this._btnAD = btn;
                }
            }
        }

    }

    protected onOpen(): void {
        // 上报 首页抽奖
        utils.umaEvent("gamechoujiang");
        utils.SendEvent("页面-抽奖");
        this._panel.scale = 0;
        cc.tween(this._panel).to(0.3, { scale: 0.8 }, { easing: "backOut" }).start();
        // TweenEffect.panel_open_scale(this._panel);

        cc.tween(this._page.getChildByName("guang"))
            .by(0.5, { angle: 60, opacity: -150 })
            .by(0.5, { angle: 60, opacity: 150 })
            .union()
            .repeatForever()
            .start();

        this._totalLabel.string = `${cocosz.totalCJTimes > 30 ? 30 : cocosz.totalCJTimes}/30`;
        if (cocosz.totalCJTimes > 30 || cocosz.dataMgr.getGunInfo(10).State > 0) { this._panel.getChildByName("w_nnp").color = cc.Color.GRAY; }
        this.updateReward();
        this.updateBtn();
    }


    updateReward() {
        for (let i = 0; i < 12; i++) {
            let str = `reward${i + 1}`;
            let reward = this._rewardList.getChildByName(str);
            if (GameDate.TurntableReward[i].type == RewardType.Gold) {
                let gold = reward.getChildByName("gold");
                if (gold) {
                    gold.active = true;
                    // gold.setPosition(reward.x + gold.x, reward.y + gold.y);
                    // gold.setParent(this._rewardList);
                }
                let label = reward.getChildByName("label");
                if (label) {
                    label.active = true;
                    label.zIndex = 2;
                    label.setPosition(reward.x + label.x, reward.y + label.y);
                    label.setParent(this._rewardList);
                    label.getComponent(cc.Label).string = `+${GameDate.TurntableReward[i].num}`;
                }
            }
            else if (GameDate.TurntableReward[i].type == RewardType.Diamond) {
                let diamond = reward.getChildByName("diamond");
                if (diamond) {
                    diamond.active = true;
                    // diamond.setPosition(reward.x + diamond.x, reward.y + diamond.y);
                    // diamond.setParent(this._rewardList);
                }
                let label = reward.getChildByName("label");
                if (label) {
                    label.active = true;
                    label.zIndex = 2;
                    label.setPosition(reward.x + label.x, reward.y + label.y);
                    label.setParent(this._rewardList);
                    label.getComponent(cc.Label).string = `+${GameDate.TurntableReward[i].num}`;
                }
            }
            else if (GameDate.TurntableReward[i].type == RewardType.Skin) {
                let ani = cc.instantiate(cocosz.resMgr.getRes(`skin${GameDate.TurntableReward[i].num}`, cc.Prefab) as cc.Prefab);
                if (ani) {
                    ani.scale = 0.5;
                    ani.zIndex = 1;
                    ani.setParent(this._rewardList);
                    ani.setPosition(reward.x, reward.y - 65);
                }
                let nameSpr = reward.getChildByName("nameSpr");
                if (nameSpr) {
                    nameSpr.active = true;
                    nameSpr.zIndex = 2;
                    nameSpr.setPosition(reward.x + nameSpr.x, reward.y + nameSpr.y);
                    nameSpr.setParent(this._rewardList);
                    nameSpr.getComponent(cc.Sprite).spriteFrame = cocosz.resMgr.getRes(`p_${GameDate.TurntableReward[i].num}`, cc.SpriteFrame);
                }
                if (cocosz.dataMgr.getSkinInfo(GameDate.TurntableReward[i].num - 1).State != 0) {
                    let mask = this._rewardList.getChildByName(`mask${i + 1}`);
                    if (mask) {
                        mask.active = true;
                        mask.zIndex = 3;
                    }
                }
            }
            else if (GameDate.TurntableReward[i].type == RewardType.Weapon) {
                let node = new cc.Node;
                let str = "w_" + Weapon.WeaponName[GameDate.TurntableReward[i].num];
                node.addComponent(cc.Sprite).spriteFrame = cocosz.resMgr.getRes(str, cc.SpriteFrame);
                node.setParent(this._rewardList)
                node.setPosition(reward.x, reward.y);
                let nameSpr = reward.getChildByName("nameSpr");
                if (nameSpr) {
                    nameSpr.active = true;
                    nameSpr.zIndex = 2;
                    nameSpr.setPosition(reward.x + nameSpr.x, reward.y + nameSpr.y);
                    nameSpr.setParent(this._rewardList);
                    nameSpr.getComponent(cc.Sprite).spriteFrame = cocosz.resMgr.getRes(`w_${GameDate.TurntableReward[i].num + 1}`, cc.SpriteFrame);
                }
                if (cocosz.dataMgr.getGunInfo(GameDate.TurntableReward[i].num).State != 0) {
                    let mask = this._rewardList.getChildByName(`mask${i + 1}`);
                    if (mask) {
                        mask.active = true;
                        mask.zIndex = 3;
                    }
                }
            }
        }
    }

    startNum: number = 0;
    CJ() {
        // 上报 首页抽奖
        utils.umaEvent(`gamechoujiang${cocosz.useCJTimes}`);
        this.isCJ = true;
        let num = 20;
        num += Math.floor(Math.random() * 12);
        let count = 0;
        let lastNum = this.startNum;
        let cur = 0;
        cocosz.audioMgr.playEffect("turntable");
        let timeCount = setInterval(() => {
            count++;
            if (this.getTimeCount(count, cur) == 0) {
                this._rewardList.children[lastNum].children[0].opacity = 0;
                lastNum++;
                if (lastNum >= 12) {
                    lastNum = 0;
                }
                if (GameDate.TurntableReward[lastNum].type == RewardType.Skin) {
                    if (cocosz.dataMgr.getSkinInfo(GameDate.TurntableReward[lastNum].num - 1).State != 0) {
                        lastNum++;
                        if (lastNum >= 12) {
                            lastNum = 0;
                        }
                    }
                }
                else if (GameDate.TurntableReward[lastNum].type == RewardType.Weapon) {
                    if (cocosz.dataMgr.getGunInfo(GameDate.TurntableReward[lastNum].num).State != 0) {
                        lastNum++;
                        if (lastNum >= 12) {
                            lastNum = 0;
                        }
                    }
                }
                cur++;
                this._rewardList.children[lastNum].children[0].opacity = 255;
                if (cur >= num) {
                    this.startNum = lastNum;
                    clearInterval(timeCount);
                    if (GameDate.TurntableReward[lastNum].type == RewardType.Gold) {
                        Msg.Show(i18n.t("msg.gxhdjb") + GameDate.TurntableReward[lastNum].num)
                        cocosz.dataMgr.CoinCount += GameDate.TurntableReward[lastNum].num;
                    }
                    else if (GameDate.TurntableReward[lastNum].type == RewardType.Diamond) {
                        Msg.Show(i18n.t("msg.gxhdzs") + GameDate.TurntableReward[lastNum].num)
                        cocosz.dataMgr.DiamondCount += GameDate.TurntableReward[lastNum].num;

                    }
                    else if (GameDate.TurntableReward[lastNum].type == RewardType.Skin) {
                        Msg.Show(i18n.t("msg.gxhdxjs"));
                        cocosz.dataMgr.CurSkinId = GameDate.TurntableReward[lastNum].num - 1;
                        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_CJ_SKIN });
                        this._rewardList.children[lastNum].children[0].opacity = 0;
                        this._rewardList.getChildByName(`mask6`).active = true;
                        this._rewardList.getChildByName(`mask6`).zIndex = 3;
                    }
                    else {
                        Msg.Show(i18n.t("msg.gxhdxwq"));
                        cocosz.dataMgr.curWeapon = GameDate.TurntableReward[lastNum].num;
                        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_CJ_Weapon });
                        this._rewardList.children[lastNum].children[0].opacity = 0;
                        this._rewardList.getChildByName(`mask12`).active = true;
                        this._rewardList.getChildByName(`mask12`).zIndex = 3;
                    }
                    this.isCJ = false;

                    cocosz.useCJTimes++;
                    cocosz.totalCJTimes++;
                    this._totalLabel.string = `${cocosz.totalCJTimes > 30 ? 30 : cocosz.totalCJTimes}/30`;
                    if (cocosz.totalCJTimes == 30 && cocosz.dataMgr.getGunInfo(10).State == 0) {
                        Msg.Show(i18n.t("msg.gxhdnnp"));//恭喜获得武器鸟鸟炮
                        cocosz.dataMgr.curWeapon = 10;
                        this._panel.getChildByName("w_nnp").color = cc.Color.GRAY;
                        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_CJ_Weapon });
                    }
                    this.updateBtn();
                }
            }
        }, 10)
    }


    startIntervalTime: number = 10;
    addTime: number = 1;
    getTimeCount(num1: number, num2: number) {
        let num = 0;
        for (let i = 0; i < num2; i++) {
            num += i * this.addTime;
        }

        return (num1 - num) % (this.startIntervalTime + num2 * this.addTime);
    }

    updateBtn() {
        if (cocosz.isADON && cocosz.useCJTimes >= Constant.commonCJTimes/*  + cocosz.getCJTimes */) {
            this._btnCJ.active = false;
            this._btnAD.active = true;
        } else {
            this._btnCJ.active = true;
            this._btnAD.active = false;
        }
    }

    isCJ: boolean = false;
    protected async _onBtnClickHandler(event: cc.Event.EventTouch) {
        await cocosz.audioMgr.playBtnEffect().catch();
        if (this.isCJ) return;
        switch (event.target.name) {
            case "BtnBack": {
                cocosz.uiMgr.closePanel(PanelName.UITurntablePanel);
                break;
            }
            case "BtnCJ": {
                this.CJ();
                break;
            }
            case "BtnAD": {
                utils.SendEvent("视频-抽奖-播放")
                cocosz.watchAD(() => {
                    utils.SendEvent("视频-抽奖-成功")
                    this.CJ();
                }, () => {
                    utils.SendEvent("视频-抽奖-失败")
                })
                break;
            }
        }
    }
    // update (dt) {}
}
