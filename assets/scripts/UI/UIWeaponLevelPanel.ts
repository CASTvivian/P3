import { utils } from "../../common-plugin/Scripts/Utils";
import { cocosz } from "../Framework/CocosZ";
import { PanelName } from "../Framework/Constant";
import Msg from "../Framework/Msg";
import UIPage from "../Framework/UIPage";
import GameDate from "../Game/gameDate";
import Weapon from "../Game/weapon";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass } = cc._decorator;

@ccclass
export default class UIWeaponLevelPanel extends UIPage {

    private _panel: cc.Node = null;

    weapon: cc.Sprite = null;

    weaponId: number = 0;
    isRange: boolean = true;

    constructor() {
        super(PanelName.UIWeaponLevelPanel);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this._panel = this._page.getChildByName("Panel");
        this.weapon = this._panel.getChildByName("weapon").getComponent(cc.Sprite);

        let btnNames: string[] = ["BtnPass", "BtnVideo"];
        for (let i = 0; i < btnNames.length; i++) {
            let btn: cc.Node = cc.find(btnNames[i], this._panel);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            }
        }
    }
    protected onOpen() {
        utils.SendEvent("页面-武器升级");
        // 暂停游戏逻辑
        cocosz.pauseCount++;
        let weaponName = "";
        let level = 0;
        let rangeLevel = cocosz.dataMgr.getGunInfo(cocosz.dataMgr.CurRange).Level;
        let meleeLevel = cocosz.dataMgr.getGunInfo(cocosz.dataMgr.CurMelee).Level;
        if (rangeLevel < 3) {
            // 显示远程
            this.isRange = true;
            this.weaponId = cocosz.dataMgr.CurRange;
            weaponName = Weapon.WeaponName[this.weaponId];
            level = rangeLevel;
            this.weapon.spriteFrame = cocosz.resMgr.getRes("w_" + weaponName, cc.SpriteFrame);
        } else if (meleeLevel < 3) {
            // 显示近程
            this.isRange = false;
            this.weaponId = cocosz.dataMgr.CurMelee;
            weaponName = Weapon.WeaponName[this.weaponId]
            level = meleeLevel;
            this.weapon.spriteFrame = cocosz.resMgr.getRes("w_" + weaponName, cc.SpriteFrame);
        } else {
            // 直接关闭
            cocosz.uiMgr.closePanel(PanelName.UIWeaponLevelPanel);
            return;
        }
        // 显示数据
        let info = GameDate.Weapon[weaponName]
        let txt1 = cc.find("kuang/txt1", this._panel);
        if (txt1) {
            let richText = txt1.getComponent(cc.RichText);
            if (richText) {
                let curNum = info.atk[level];
                let nextNum = info.atk[3];
                let difNum = nextNum - curNum;
                richText.string = `<outline color=black width=2><color=white>${i18n.t("try.gjl") + ": " + curNum}</c><color=green}>${difNum > 0 ? (" +" + difNum) : ""}</c></outline>`;
            }
        }
        let txt2 = cc.find("kuang/txt2", this._panel);
        if (txt2) {
            let richText = txt2.getComponent(cc.RichText);
            if (richText) {
                let curNum = 1 / info.atkSpeed[level];
                let nextNum = 1 / info.atkSpeed[3];
                let difNum = nextNum - curNum;
                richText.string = `<outline color=black width=2><color=white>${i18n.t("try.gjpl") + ": " + curNum}</c><color=green}>${difNum > 0 ? (" +" + difNum) : ""}</c></outline>`;
            }
        }
        let txt3 = cc.find("kuang/txt3", this._panel);
        if (txt3) {
            let richText = txt3.getComponent(cc.RichText);
            if (richText) {
                let curNum = info.atkRange;
                richText.string = `<outline color=black width=2><color=white>${i18n.t("try.gjfw") + ": " + curNum}</c></outline>`;
            }
        }
        let txt4 = cc.find("kuang/txt4", this._panel);
        if (txt4) {
            let richText = txt4.getComponent(cc.RichText);
            if (richText) {
                let curNum = info.bulletTotal[level];
                let nextNum = info.bulletTotal[3];
                let difNum = nextNum - curNum;
                richText.string = `<outline color=black width=2><color=white>${i18n.t("try.dyl") + ": " + (this.isRange ? curNum : "♾")}</c><color=green}>${difNum > 0 ? (" +" + difNum) : ""}</c></outline>`;
            }
        }
    }

    protected onClose() {
        cocosz.gameMgr.gameStart(cocosz.curLevel);
    }

    /**
     * 所有按钮点击事件
     * @param event 
     * @param data 
     */
    private async _onBtnClickedHandler(event: cc.Event, data: any) {
        //播放按钮点击音效
        await cocosz.audioMgr.playBtnEffect().catch();
        switch (event.target.name) {
            case "BtnPass": {
                cocosz.uiMgr.closePanel(PanelName.UIWeaponLevelPanel);
                break;
            }
            case "BtnVideo": {
                utils.SendEvent("视频-弹窗武器升级-播放")
                cocosz.watchAD(() => {
                    // 视频成功
                    utils.SendEvent("视频-弹窗武器升级-成功")
                    let info = cocosz.dataMgr.getGunInfo(this.weaponId);
                    info.Level = 3;// 升到最高级别
                    cocosz.dataMgr.setGunInfo(this.weaponId, info);
                    Msg.Show(i18n.t("msg.sjcg"));//升级成功
                    cocosz.uiMgr.closePanel(PanelName.UIWeaponLevelPanel);
                }, () => {
                    // 视频失败
                    utils.SendEvent("视频-弹窗武器升级-失败")
                    cocosz.uiMgr.closePanel(PanelName.UIWeaponLevelPanel);
                })
                break;
            }
        }
    }
}
