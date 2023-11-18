import UIPage from "../Framework/UIPage";
import Constant, { GunInfo, PageName, PanelName, SkillInfo } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import { utils } from "../../common-plugin/Scripts/Utils";
import { BannerLocation } from "../../common-plugin/Scripts/YZ_Constant";
import Ani from "../Game/ani";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import FlyCoin from "../Framework/FlyCoin";
import GameDate, { PriceType } from "../Game/gameDate";
import Weapon from "../Game/weapon";
import Msg from "../Framework/Msg";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIHomePage extends UIPage {

    constructor() {
        super(PageName.UIHomePage);
        this.isValid() && this.onLoad();
    }

    private _icon_set: cc.Node = null;
    private _frame_set: cc.Node = null;
    private _btnAudio: cc.Node = null;
    private _btnShake: cc.Node = null;
    private _btnSkin: cc.Node = null;
    private _btnSkinAd: cc.Node = null;
    private _btnWeapon: cc.Node = null;
    private _btnWeaponAd: cc.Node = null;

    private _playerAni: Ani = null;
    private _aniUpgrade: sp.Skeleton = null;
    private _aniCaidai: sp.Skeleton = null;
    private _weaponScroll: cc.Node = null;
    private _weaponList: cc.Node[] = [];
    private _ani_arrow: cc.Node = null;

    private _skinInfo_name: cc.Sprite = null;
    private _skinInfo_xuedi: cc.Node = null;
    private _skinInfo_value1: cc.Label = null;
    private _skinInfo_value2: cc.Label = null;
    private _skinInfo_change1: cc.Label = null;
    private _skinInfo_change2: cc.Label = null;
    private _skinInfo_level_pro: cc.ProgressBar = null;

    private _weaponInfo_name: cc.Sprite = null;
    private _weaponInfo_value0: cc.Label = null;
    private _weaponInfo_value1: cc.Label = null;
    private _weaponInfo_value2: cc.Label = null;
    private _weaponInfo_value3: cc.Label = null;
    private _weaponInfo_change0: cc.Label = null;
    private _weaponInfo_change1: cc.Label = null;
    private _weaponInfo_change2: cc.Label = null;
    private _weaponInfo_change3: cc.Label = null;
    private _weaponInfo_level_pro: cc.ProgressBar = null;

    protected onLoad() {
        console.log("UIHOMEPAGE ONLOAD")
        // 按钮
        let btnNames: string[] = ["BtnSet", "BtnSet/frame_set/BtnAudio", "BtnSet/frame_set/BtnShake", "ditai/BtnLeft", "ditai/BtnRight", "BtnSkin", "BtnWeapon", "BtnSkinAd", "BtnWeaponAd", "BtnCJ", "BtnSign", "BtnTime", "BtnGameStart"];
        btnNames.forEach(name => {
            let btn: cc.Node = cc.find(name, this._page);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
                if (btn.name == "BtnSet") {
                    this._icon_set = cc.find("Background/icon_set", btn);
                    this._frame_set = cc.find("frame_set", btn);
                } else if (btn.name == "BtnAudio") {
                    this._btnAudio = btn;
                    this._updateAudioBtn(false);
                } else if (btn.name == "BtnShake") {
                    this._btnShake = btn;
                    this._updatShakeBtn();
                } else if (btn.name == "BtnSkin") {
                    this._btnSkin = btn;
                } else if (btn.name == "BtnWeapon") {
                    this._btnWeapon = btn;
                } else if (btn.name == "BtnSkinAd") {
                    this._btnSkinAd = btn;
                    btn.active = cocosz.isADON;
                } else if (btn.name == "BtnWeaponAd") {
                    this._btnWeaponAd = btn;
                    btn.active = cocosz.isADON;
                }
            }
        });
        // 角色动画
        this._playerAni = cc.find("ditai/skin_all/ani", this._page).getComponent(Ani);
        // 彩带动画
        this._aniCaidai = cc.find("ditai/aniCaidai", this._page).getComponent(sp.Skeleton);
        this._aniCaidai.setCompleteListener(() => { this._aniCaidai.node.active = false; })
        // 升级动画
        this._aniUpgrade = cc.find("ditai/aniUpgrade", this._page).getComponent(sp.Skeleton);
        this._aniUpgrade.setCompleteListener(() => { this._aniUpgrade.node.active = false; })
        // 武器
        this._weaponScroll = cc.find("weaponScroll", this._page);
        let content = cc.find("view/content", this._weaponScroll);
        for (let i = 0; i < content.children.length; i++) {
            this._weaponList.push(content.children[i]);
            this._weaponList[i].on(cc.Node.EventType.TOUCH_END, (e) => {
                cocosz.audioMgr.playBtnEffect();
                let id = GameDate.Weapon[e.target.name].id;
                this._showWeaponId = id;
                this._updateWeapon();
                this._updateWeaponFrame();
                let weaponInfo = cocosz.dataMgr.getGunInfo(id);
                if (weaponInfo && weaponInfo.State == 1) {
                    cocosz.dataMgr.curWeapon = id;
                }
            }, this);
        }
        let iconLayer = cc.find("view/iconLayer", this._weaponScroll);
        if (iconLayer) iconLayer.setParent(content);
        this._ani_arrow = cc.find("view/ani_arrow", this._weaponScroll);
        if (this._ani_arrow) this._ani_arrow.setParent(content);
        // 属性
        this._skinInfo_name = cc.find("ditai/skinName", this._page).getComponent(cc.Sprite);
        this._skinInfo_xuedi = cc.find("jueseshuxing/xuedi", this._page);
        this._skinInfo_value1 = cc.find("jueseshuxing/value1", this._page).getComponent(cc.Label);
        this._skinInfo_value2 = cc.find("jueseshuxing/value2", this._page).getComponent(cc.Label);
        this._skinInfo_change1 = cc.find("jueseshuxing/change1", this._page).getComponent(cc.Label);
        this._skinInfo_change2 = cc.find("jueseshuxing/change2", this._page).getComponent(cc.Label);
        this._skinInfo_level_pro = cc.find("jueseshuxing/levelProgressBar", this._page).getComponent(cc.ProgressBar);
        this._weaponInfo_name = cc.find("wuqishuxing/weaponName", this._page).getComponent(cc.Sprite);
        this._weaponInfo_value0 = cc.find("wuqishuxing/value0", this._page).getComponent(cc.Label);
        this._weaponInfo_value1 = cc.find("wuqishuxing/value1", this._page).getComponent(cc.Label);
        this._weaponInfo_value2 = cc.find("wuqishuxing/value2", this._page).getComponent(cc.Label);
        this._weaponInfo_value3 = cc.find("wuqishuxing/value3", this._page).getComponent(cc.Label);
        this._weaponInfo_change0 = cc.find("wuqishuxing/change0", this._page).getComponent(cc.Label);
        this._weaponInfo_change1 = cc.find("wuqishuxing/change1", this._page).getComponent(cc.Label);
        this._weaponInfo_change2 = cc.find("wuqishuxing/change2", this._page).getComponent(cc.Label);
        this._weaponInfo_change3 = cc.find("wuqishuxing/change3", this._page).getComponent(cc.Label);
        this._weaponInfo_level_pro = cc.find("wuqishuxing/levelProgressBar", this._page).getComponent(cc.ProgressBar);
    }

    private _canGetBonus() {
        return (new Date().toDateString() != cocosz.dataMgr.LastDailyBonusTime);
    }

    private _aniEffect(type: 1 | 2) {
        switch (type) {
            case 1: {
                if (this._aniUpgrade) {
                    this._aniUpgrade.node.active = true;
                    this._aniUpgrade.setAnimation(0, "animation", false);
                    cocosz.audioMgr.playEffect("ui_upgrade");
                }
                break;
            }
            case 2: {
                if (this._aniCaidai) {
                    this._aniCaidai.node.active = true;
                    this._aniCaidai.setAnimation(0, "animation", false);
                    cocosz.audioMgr.playEffect("ui_caidai");
                }
                break;
            }
        }
    }

    protected onOpen() {
        cc.log("home open !");
        // 上报游戏首页
        utils.umaEvent("gamehome");
        utils.SendEvent("页面-首页");
        this._updatePlayer();
        this._updateWeapon();
        this._updateWeaponFrame();
        // 广告
        utils.showYzRealNameAuthPanel();
        utils.showPrivacyPanel({ group: "default", parent: this._page })
        utils.registerServerInitEvent(() => {
            // 验证服务器配置为自动弹签到，并且当前可以签到
            if (utils.checkAutoSign() && this._canGetBonus()) {
                cocosz.uiMgr.openPanel(PanelName.UISignPanel);
            }
            this.showAd();
        }, this)

        cc.game.on(Constant.E_GAME_LOGIC, this._onGameMessageHandler, this);
    }

    protected onClose() {
        cc.game.targetOff(this);
        utils.hideVivoGamePortalWidget();
        utils.hideOppoGameDrawerAdWidget();
        utils.adManager.hideBlockAd();
        utils.adManager.hideNativeTryGameWidget();
        utils.adManager.HideSingleNativeAd();
        if (PlatUtils.IsWechat) {
            utils.adManager.hideCustomAd({ location: 1 });
            utils.adManager.hideCustomAd({ location: 2 });
        } else if (PlatUtils.IsVIVO) {
            utils.adManager.hideCustomAd({ location: BannerLocation.Home });
        }
    }

    protected showAd() {
        if (cocosz.isShowAd) {
            if (PlatUtils.IsWechat) {
                utils.adManager.HideBanner(BannerLocation.Home);
            } else {
                utils.adManager.ShowBanner(BannerLocation.Home, { width: 0.1, bottom: 1 });
            }
            // 原生广告
            if (PlatUtils.IsWechat) {
                utils.adManager.showCustomAd({ location: 1 });
                utils.adManager.showCustomAd({ location: 2 });
            } else if (PlatUtils.IsVIVO) {
                utils.adManager.showCustomAd({ location: BannerLocation.Home });
            }
            utils.adManager.showNativeTryGameWidget({ right: 50, top: 800, scale: 1, parent: this._page });
            utils.adManager.ShowSingleNativeAd({});
            utils.adManager.showBlockAd({ right: 50, top: 500, showNum: 1 });

            utils.showMoreGamesWidget({ group: 'default', scale: 1, bottom: 300, left: 50, parent: this._page, location: BannerLocation.Home });
            utils.showTryGamesWidget({ group: 'default', scale: 1, bottom: 350, right: 50, parent: this._page, location: BannerLocation.Home });
            utils.showVivoGamePortalWidget({ top: 500, location: BannerLocation.Home });
            utils.showOppoGameDrawerAdWidget({ top: 500, location: BannerLocation.Home });
            utils.showCreateShortcutWidget(null, { group: 'default', scale: 1, left: 0, top: 500, parent: this._page })
            utils.showPrivacyWidget({ group: "default", top: 0, left: 0, parent: this._page.getChildByName("PrivacyWidget"), color: cc.Color.BLACK })
        }
    }

    private _onGameMessageHandler(event: any) {
        switch (event.type) {
            case Constant.E_Fly_Coin: {
                this._flyCoins(event.iconName, event.frameNodeName);
                break;
            }
            case Constant.E_CJ_SKIN: {
                this._showSkinId = cocosz.dataMgr.CurSkinId;
                this._updatePlayer();
                break;
            }
            case Constant.E_CJ_Weapon: {
                this._showWeaponId = cocosz.dataMgr.curWeapon;
                this._updateWeapon();
                this._updateWeaponFrame();
                break;
            }
        }
    }

    private async _onBtnClickHandler(event: cc.Event.EventTouch) {
        await cocosz.audioMgr.playBtnEffect().catch();

        switch (event.target.name) {
            case "BtnGameStart": {
                cocosz.gameMode = 6;
                cocosz.gameMgr.gameStart(cocosz.getLevelId());
                break;
            }
            case "BtnLeft": {
                this._showSkinId--;
                if (this._showSkinId < 0) this._showSkinId = 11;
                this._updatePlayer();
                let skinInfo = cocosz.dataMgr.getSkinInfo(this._showSkinId);
                if (skinInfo && skinInfo.State == 1) {
                    cocosz.dataMgr.CurSkinId = this._showSkinId;
                }
                break;
            }
            case "BtnRight": {
                this._showSkinId++;
                if (this._showSkinId > 11) this._showSkinId = 0;
                this._updatePlayer();
                let skinInfo = cocosz.dataMgr.getSkinInfo(this._showSkinId);
                if (skinInfo && skinInfo.State == 1) {
                    cocosz.dataMgr.CurSkinId = this._showSkinId;
                }
                break;
            }
            case "BtnSkin": {
                // 购买
                let showSkinInfo = cocosz.dataMgr.getSkinInfo(this._showSkinId);
                let showSKinKey = `${this._showSkinId + 1}`;
                if (showSkinInfo.State == 0) {
                    // 金币
                    if (GameDate.SkinMess[showSKinKey].priceType == PriceType.Gold) {
                        if (cocosz.dataMgr.CoinCount >= GameDate.SkinMess[showSKinKey].price) {
                            cocosz.dataMgr.CoinCount -= GameDate.SkinMess[showSKinKey].price;
                            Msg.Show(i18n.t("msg.gxhdxjs"));//恭喜获得新角色
                            cocosz.dataMgr.CurSkinId = this._showSkinId;
                            this._updatePlayer();
                            this._aniEffect(2);
                        } else {
                            this.showCoinPanel(false);
                        }
                    }
                    // 钻石
                    else if (GameDate.SkinMess[showSKinKey].priceType == PriceType.Diamond) {
                        if (cocosz.dataMgr.DiamondCount >= GameDate.SkinMess[showSKinKey].price) {
                            cocosz.dataMgr.DiamondCount -= GameDate.SkinMess[showSKinKey].price;
                            Msg.Show(i18n.t("msg.gxhdxjs"));//恭喜获得新角色
                            cocosz.dataMgr.CurSkinId = this._showSkinId;
                            this._updatePlayer();
                            this._aniEffect(2);
                        } else {
                            this.showCoinPanel(true);
                        }
                    }
                    // 转盘奖励
                    else if (GameDate.SkinMess[showSKinKey].priceType == PriceType.ZhuanPanReward) {
                        cocosz.uiMgr.openPanel(PanelName.UITurntablePanel);
                    }
                }
                // 升级
                else if (showSkinInfo.Level < 6) {
                    if (cocosz.dataMgr.CoinCount >= Constant.skinLevelPriceArr[showSkinInfo.Level]) {
                        cocosz.dataMgr.CoinCount -= Constant.skinLevelPriceArr[showSkinInfo.Level];
                        showSkinInfo.Level++;
                        cocosz.dataMgr.setSkinInfo(showSkinInfo.Id, showSkinInfo);
                        this._updatePlayer();
                        this._aniEffect(1);
                    } else {
                        this.showCoinPanel(false);
                    }
                }
                break;
            }
            case "BtnWeapon": {
                // 购买
                let showWeaponInfo = cocosz.dataMgr.getGunInfo(this._showWeaponId);
                let showWeaponKey = Weapon.WeaponName[this._showWeaponId];
                if (showWeaponInfo.State == 0) {
                    // 金币
                    if (GameDate.Weapon[showWeaponKey].priceType == PriceType.Gold) {
                        if (cocosz.dataMgr.CoinCount >= GameDate.Weapon[showWeaponKey].price) {
                            cocosz.dataMgr.CoinCount -= GameDate.Weapon[showWeaponKey].price;
                            Msg.Show(i18n.t("msg.gxhdxwq"));
                            cocosz.dataMgr.curWeapon = this._showWeaponId;
                            this._updateWeapon();
                            this._updateWeaponFrame();
                            this._aniEffect(2);
                        } else {
                            this.showCoinPanel(false);
                        }
                    }
                    // 钻石
                    else if (GameDate.Weapon[showWeaponKey].priceType == PriceType.Diamond) {
                        if (cocosz.dataMgr.DiamondCount >= GameDate.Weapon[showWeaponKey].price) {
                            cocosz.dataMgr.DiamondCount -= GameDate.Weapon[showWeaponKey].price;
                            Msg.Show(i18n.t("msg.gxhdxwq"));
                            cocosz.dataMgr.curWeapon = this._showWeaponId;
                            this._updateWeapon();
                            this._updateWeaponFrame();
                            this._aniEffect(2);
                        } else {
                            this.showCoinPanel(true);
                        }
                    }
                    // 转盘奖励
                    else if (GameDate.Weapon[showWeaponKey].priceType == PriceType.ZhuanPanReward) {
                        cocosz.uiMgr.openPanel(PanelName.UITurntablePanel);
                    }
                }
                // 升级
                else if (showWeaponInfo.Level < 3) {
                    if (cocosz.dataMgr.CoinCount >= Constant.weaponLevelPriceArr[showWeaponInfo.Level]) {
                        cocosz.dataMgr.CoinCount -= Constant.weaponLevelPriceArr[showWeaponInfo.Level];
                        showWeaponInfo.Level++;
                        cocosz.dataMgr.setGunInfo(showWeaponInfo.Id, showWeaponInfo);
                        this._updateWeapon();
                        this._updateWeaponFrame();
                        this._aniEffect(1);
                    } else {
                        this.showCoinPanel(false);
                    }
                }
                break;
            }
            case "BtnSkinAd": {
                utils.SendEvent("视频-皮肤解锁-播放")
                cocosz.watchAD(() => {
                    // 视频成功 
                    utils.SendEvent("视频-皮肤解锁-成功")
                    let showSkinInfo = cocosz.dataMgr.getSkinInfo(this._showSkinId);
                    let showSkinKey: string = `${this._showSkinId + 1}`;
                    if (!!showSkinInfo && !!GameDate.SkinMess[showSkinKey] && !!GameDate.SkinMess[showSkinKey].videoCount) {
                        showSkinInfo.VideoCount++;
                        cocosz.dataMgr.setSkinInfo(this._showSkinId, showSkinInfo);
                        if (showSkinInfo.VideoCount >= GameDate.SkinMess[showSkinKey].videoCount) {
                            Msg.Show(i18n.t("msg.gxhdxjs"));//恭喜获得新角色
                            cocosz.dataMgr.CurSkinId = this._showSkinId;
                            this._aniEffect(2);
                        } else {
                            Msg.Show(i18n.t("msg.jswc") + showSkinInfo.VideoCount + "/" + GameDate.SkinMess[showSkinKey].videoCount);
                        }
                        // 更新玩家信息
                        this._updatePlayer();
                    }
                }, () => {
                    // 视频失败
                    utils.SendEvent("视频-皮肤解锁-失败")
                });
                break;
            }
            case "BtnWeaponAd": {
                utils.SendEvent("视频-武器解锁-播放")
                cocosz.watchAD(() => {
                    // 视频成功 
                    utils.SendEvent("视频-武器解锁-成功")
                    let showWeaponInfo = cocosz.dataMgr.getGunInfo(this._showWeaponId);
                    let showWeaponKey: string = Weapon.WeaponName[this._showWeaponId];
                    if (!!showWeaponInfo && !!GameDate.Weapon[showWeaponKey] && !!GameDate.Weapon[showWeaponKey].videoCount) {
                        showWeaponInfo.VideoCount++;
                        cocosz.dataMgr.setGunInfo(this._showWeaponId, showWeaponInfo);
                        if (showWeaponInfo.VideoCount >= GameDate.Weapon[showWeaponKey].videoCount) {
                            Msg.Show(i18n.t("msg.gxhdxwq"));
                            cocosz.dataMgr.curWeapon = this._showWeaponId;
                            this._aniEffect(2);
                        } else {
                            Msg.Show(i18n.t("msg.jswc") + showWeaponInfo.VideoCount + "/" + GameDate.Weapon[showWeaponKey].videoCount);
                        }
                        // 更新武器信息
                        this._updateWeapon();
                        this._updateWeaponFrame();
                    }
                }, () => {
                    // 视频失败
                    utils.SendEvent("视频-武器解锁-失败")
                });
                break;
            }
            case "BtnCJ": {
                cocosz.uiMgr.openPanel(PanelName.UITurntablePanel);
                break;
            }
            case "BtnSign": {
                cocosz.uiMgr.openPanel(PanelName.UISignPanel);
                break;
            }
            case "BtnTime": {
                cocosz.uiMgr.openPanel(PanelName.UITimePanel);
                break;
            }
            case "BtnSet": {
                this._icon_set.stopAllActions();
                this._frame_set.stopAllActions();
                let t = (this._frame_set.scaleY ? this._frame_set.scaleY : 1) / 2;
                cc.tween(this._icon_set)
                    .to(t, { angle: (this._frame_set.scaleY ? 90 : -90) }, { easing: "sineInOut" })
                    .start();
                cc.tween(this._frame_set)
                    .to(t, { scaleY: this._frame_set.scaleY ? 0 : 1 }, { easing: "sineInOut" })
                    .start();
                break;
            }
            case "BtnAudio": {
                cocosz.dataMgr.AudioOn = !cocosz.dataMgr.AudioOn;
                this._updateAudioBtn();
                break;
            }
            case "BtnShake": {
                cocosz.dataMgr.ShakeOn = !cocosz.dataMgr.ShakeOn;
                this._updatShakeBtn();
                break;
            }
        }
    }

    private _showSkinId: number = cocosz.dataMgr.CurSkinId;
    private _updatePlayer() {
        cc.log("showSkinID: ", this._showSkinId);
        this._playerAni.setSkinById(this._showSkinId)
        // 属性
        // 角色名字
        this._skinInfo_name.spriteFrame = cocosz.resMgr.getRes("p_" + (this._showSkinId + 1), cc.SpriteFrame);
        // 角色属性
        let curSkinInfo = cocosz.dataMgr.getSkinInfo(cocosz.dataMgr.CurSkinId);
        let showSkinInfo = cocosz.dataMgr.getSkinInfo(this._showSkinId);
        let curLevel = curSkinInfo.Level;
        let showLevel = showSkinInfo.Level;
        let curSkinKey = `${cocosz.dataMgr.CurSkinId + 1}`;
        let showSKinKey = `${this._showSkinId + 1}`;
        // 血滴
        this._skinInfo_xuedi.children.forEach((v, i) => {
            if (i < GameDate.SkinMess[showSKinKey].xuedi) {
                this._skinInfo_xuedi.children[i].opacity = 255;
            } else {
                this._skinInfo_xuedi.children[i].opacity = 0;
            }
        })
        // 攻击力
        this._skinInfo_value1.string = `${GameDate.SkinMess[showSKinKey].atk[showLevel]}`;
        // 移动
        this._skinInfo_value2.string = `${GameDate.SkinMess[showSKinKey].speed[showLevel]}`;
        // 攻击变化
        let num1 = GameDate.SkinMess[showSKinKey].atk[showLevel] - GameDate.SkinMess[curSkinKey].atk[curLevel];
        if (num1 < 0) {
            this._skinInfo_change1.string = "" + num1;
            this._skinInfo_change1.node.children[0].active = false;
            this._skinInfo_change1.node.children[1].active = true;
            this._skinInfo_change1.node.color = cc.Color.RED;
            this._skinInfo_change1.node.opacity = 255;
        }
        else if (num1 == 0) {
            this._skinInfo_change1.node.opacity = 0;
        }
        else {
            this._skinInfo_change1.string = "+" + num1;
            this._skinInfo_change1.node.children[0].active = true;
            this._skinInfo_change1.node.children[1].active = false;
            this._skinInfo_change1.node.color = cc.Color.GREEN;
            this._skinInfo_change1.node.opacity = 255;
        }
        // 移动变化 
        let num2 = GameDate.SkinMess[showSKinKey].speed[showLevel] - GameDate.SkinMess[curSkinKey].speed[curLevel];
        if (num2 < 0) {
            this._skinInfo_change2.string = "" + num2;
            this._skinInfo_change2.node.children[0].active = false;
            this._skinInfo_change2.node.children[1].active = true;
            this._skinInfo_change2.node.color = cc.Color.RED;
            this._skinInfo_change2.node.opacity = 255;
        }
        else if (num2 == 0) {
            this._skinInfo_change2.node.opacity = 0;
        }
        else {
            this._skinInfo_change2.string = "+" + num2;
            this._skinInfo_change2.node.children[0].active = true;
            this._skinInfo_change2.node.children[1].active = false;
            this._skinInfo_change2.node.color = cc.Color.GREEN;
            this._skinInfo_change2.node.opacity = 255;
        }
        // 等级
        this._skinInfo_level_pro.progress = showLevel / 6;
        // 按钮变化
        if (showSkinInfo) {
            this._btnSkin.children.forEach(v => v.active = false);
            let btn_huang = this._btnSkin.getChildByName("btn_huang");
            let btn_huang_small = this._btnSkin.getChildByName("btn_huang_small");
            let btn_hong = this._btnSkin.getChildByName("btn_hong");
            let txt_buy = this._btnSkin.getChildByName("txt_buy");
            let txt_sjwc = this._btnSkin.getChildByName("txt_sjwc");
            let txt_upgrade = this._btnSkin.getChildByName("txt_upgrade");
            let txt_zpjl = this._btnSkin.getChildByName("txt_zpjl");
            let icon_jinbi = this._btnSkin.getChildByName("icon_jinbi");
            let icon_zuanshi = this._btnSkin.getChildByName("icon_zuanshi");
            let price = this._btnSkin.getChildByName("price");
            // 购买
            if (showSkinInfo.State == 0) {
                if (GameDate.SkinMess[showSKinKey] && GameDate.SkinMess[showSKinKey].videoCount) {
                    this._btnSkin.x = -350;
                    this._btnSkin.width = 169;
                    if (btn_huang_small) btn_huang_small.active = true;
                    // 金币
                    if (GameDate.SkinMess[showSKinKey].priceType == PriceType.Gold) {
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + GameDate.SkinMess[showSKinKey].price;
                        }
                    }
                    // 钻石
                    else if (GameDate.SkinMess[showSKinKey].priceType == PriceType.Diamond) {
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + GameDate.SkinMess[showSKinKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (GameDate.SkinMess[showSKinKey].priceType == PriceType.ZhuanPanReward) {
                        if (txt_zpjl) txt_zpjl.active = true;
                    }
                    // 视频解锁
                    this._btnSkinAd.active = true;
                    let videoCount = this._btnSkinAd.getChildByName("videoCount");
                    if (videoCount) videoCount.getComponent(cc.Label).string = showSkinInfo.VideoCount + "/" + GameDate.SkinMess[showSKinKey].videoCount;
                } else {
                    this._btnSkinAd.active = false;
                    this._btnSkin.x = -250;
                    this._btnSkin.width = 252;
                    if (btn_huang) btn_huang.active = true;
                    // 金币
                    if (GameDate.SkinMess[showSKinKey].priceType == PriceType.Gold) {
                        if (txt_buy) txt_buy.active = true;
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + GameDate.SkinMess[showSKinKey].price;
                        }
                    }
                    // 钻石
                    else if (GameDate.SkinMess[showSKinKey].priceType == PriceType.Diamond) {
                        if (txt_buy) txt_buy.active = true;
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + GameDate.SkinMess[showSKinKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (GameDate.SkinMess[showSKinKey].priceType == PriceType.ZhuanPanReward) {
                        if (txt_zpjl) txt_zpjl.active = true;
                    }
                }
            }
            // 升级
            else if (showSkinInfo.Level < 6) {
                this._btnSkinAd.active = false;
                this._btnSkin.x = -250;
                this._btnSkin.width = 252;
                if (btn_hong) btn_hong.active = true;
                if (txt_upgrade) txt_upgrade.active = true;
                if (icon_jinbi) {
                    icon_jinbi.active = true;
                    icon_jinbi.x = 0;
                }
                if (price) {
                    price.active = true;
                    price.x = 30;
                    price.getComponent(cc.Label).string = '' + Constant.skinLevelPriceArr[showSkinInfo.Level];
                }
            }
            // 最大等级
            else {
                this._btnSkinAd.active = false;
                this._btnSkin.x = -250;
                this._btnSkin.width = 252;
                if (txt_sjwc) txt_sjwc.active = true;
            }
        }
    }

    private _showWeaponId: number = cocosz.dataMgr.CurRange;
    private _updateWeapon() {
        cc.log("showWeaponID: ", this._showWeaponId);
        this._playerAni.setWeaponById(this._showWeaponId);
        // 武器名字
        this._weaponInfo_name.spriteFrame = cocosz.resMgr.getRes("w_" + (this._showWeaponId + 1), cc.SpriteFrame);
        // 武器属性
        let curWeaponInfo = cocosz.dataMgr.getGunInfo(cocosz.dataMgr.CurRange);
        let showWeaponInfo = cocosz.dataMgr.getGunInfo(this._showWeaponId);
        let curLevel = curWeaponInfo.Level;
        let showLevel = showWeaponInfo.Level;
        let curWeaponKey = Weapon.WeaponName[cocosz.dataMgr.CurRange];
        let showWeaponKey = Weapon.WeaponName[this._showWeaponId];
        // 攻击力
        this._weaponInfo_value0.string = `${GameDate.Weapon[showWeaponKey].atk[showLevel]}`;
        // 攻击频率
        this._weaponInfo_value1.string = (1 / GameDate.Weapon[showWeaponKey].atkSpeed[showLevel]).toFixed(1);
        // 攻击范围
        this._weaponInfo_value2.string = `${GameDate.Weapon[showWeaponKey].atkRange}`;
        // 弹药量
        this._weaponInfo_value3.string = `${GameDate.Weapon[showWeaponKey].bulletTotal[showLevel]}`;
        // 变化
        let num0 = GameDate.Weapon[showWeaponKey].atk[showLevel] - GameDate.Weapon[curWeaponKey].atk[curLevel];
        let num1 = 1 / GameDate.Weapon[showWeaponKey].atkSpeed[showLevel] - 1 / GameDate.Weapon[curWeaponKey].atkSpeed[curLevel];
        let num2 = GameDate.Weapon[showWeaponKey].atkRange - GameDate.Weapon[curWeaponKey].atkRange;
        let num3 = GameDate.Weapon[showWeaponKey].bulletTotal[showLevel] - GameDate.Weapon[curWeaponKey].bulletTotal[curLevel];
        // 攻击力变化
        if (num0 < 0) {
            this._weaponInfo_change0.string = "" + num0;
            this._weaponInfo_change0.node.children[0].active = false;
            this._weaponInfo_change0.node.children[1].active = true;
            this._weaponInfo_change0.node.color = cc.Color.RED;
            this._weaponInfo_change0.node.opacity = 255;
        } else if (num0 == 0) {
            this._weaponInfo_change0.node.opacity = 0;
        } else {
            this._weaponInfo_change0.string = "+" + num0;
            this._weaponInfo_change0.node.children[0].active = true;
            this._weaponInfo_change0.node.children[1].active = false;
            this._weaponInfo_change0.node.color = cc.Color.GREEN;
            this._weaponInfo_change0.node.opacity = 255;
        }
        // 攻击频率变化
        if (num1 < 0) {
            this._weaponInfo_change1.string = "" + num1;
            this._weaponInfo_change1.node.children[0].active = false;
            this._weaponInfo_change1.node.children[1].active = true;
            this._weaponInfo_change1.node.color = cc.Color.RED;
            this._weaponInfo_change1.node.opacity = 255;
        } else if (num1 == 0) {
            this._weaponInfo_change1.node.opacity = 0;
        } else {
            this._weaponInfo_change1.string = "+" + num1;
            this._weaponInfo_change1.node.children[0].active = true;
            this._weaponInfo_change1.node.children[1].active = false;
            this._weaponInfo_change1.node.color = cc.Color.GREEN;
            this._weaponInfo_change1.node.opacity = 255;
        }
        // 攻击范围变化
        if (num2 < 0) {
            this._weaponInfo_change2.string = "" + num2;
            this._weaponInfo_change2.node.children[0].active = false;
            this._weaponInfo_change2.node.children[1].active = true;
            this._weaponInfo_change2.node.color = cc.Color.RED;
            this._weaponInfo_change2.node.opacity = 255;
        } else if (num2 == 0) {
            this._weaponInfo_change2.node.opacity = 0;
        } else {
            this._weaponInfo_change2.string = "+" + num2;
            this._weaponInfo_change2.node.children[0].active = true;
            this._weaponInfo_change2.node.children[1].active = false;
            this._weaponInfo_change2.node.color = cc.Color.GREEN;
            this._weaponInfo_change2.node.opacity = 255;
        }
        // 弹药量变化
        if (num3 < 0) {
            this._weaponInfo_change3.string = "" + num3;
            this._weaponInfo_change3.node.children[0].active = false;
            this._weaponInfo_change3.node.children[1].active = true;
            this._weaponInfo_change3.node.color = cc.Color.RED;
            this._weaponInfo_change3.node.opacity = 255;
        } else if (num3 == 0) {
            this._weaponInfo_change3.node.opacity = 0;
        } else {
            this._weaponInfo_change3.string = "+" + num3;
            this._weaponInfo_change3.node.children[0].active = true;
            this._weaponInfo_change3.node.children[1].active = false;
            this._weaponInfo_change3.node.color = cc.Color.GREEN;
            this._weaponInfo_change3.node.opacity = 255;
        }
        // 等级
        this._weaponInfo_level_pro.progress = showLevel / 3;
        // 按钮变化
        if (showWeaponInfo) {
            this._btnWeapon.children.forEach(v => v.active = false);
            let btn_huang = this._btnWeapon.getChildByName("btn_huang");
            let btn_huang_small = this._btnWeapon.getChildByName("btn_huang_small");
            let btn_hong = this._btnWeapon.getChildByName("btn_hong");
            let txt_buy = this._btnWeapon.getChildByName("txt_buy");
            let txt_sjwc = this._btnWeapon.getChildByName("txt_sjwc");
            let txt_upgrade = this._btnWeapon.getChildByName("txt_upgrade");
            let txt_zpjl = this._btnWeapon.getChildByName("txt_zpjl");
            let icon_jinbi = this._btnWeapon.getChildByName("icon_jinbi");
            let icon_zuanshi = this._btnWeapon.getChildByName("icon_zuanshi");
            let price = this._btnWeapon.getChildByName("price");
            if (showWeaponInfo.State == 0) {
                // 视频解锁
                if (GameDate.Weapon[showWeaponKey] && GameDate.Weapon[showWeaponKey].videoCount) {
                    this._btnWeapon.x = 150;
                    this._btnWeapon.width = 169;
                    if (btn_huang_small) btn_huang_small.active = true;
                    // 金币
                    if (GameDate.Weapon[showWeaponKey].priceType == PriceType.Gold) {
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + GameDate.Weapon[showWeaponKey].price;
                        }
                    }
                    // 钻石
                    else if (GameDate.Weapon[showWeaponKey].priceType == PriceType.Diamond) {
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + GameDate.Weapon[showWeaponKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (GameDate.Weapon[showWeaponKey].priceType == PriceType.ZhuanPanReward) {
                        if (txt_zpjl) txt_zpjl.active = true;
                    }
                    // 视频解锁
                    this._btnWeaponAd.active = true;
                    let videoCount = this._btnWeaponAd.getChildByName("videoCount");
                    if (videoCount) videoCount.getComponent(cc.Label).string = showWeaponInfo.VideoCount + "/" + GameDate.Weapon[showWeaponKey].videoCount;
                }
                // 购买
                else {
                    this._btnWeaponAd.active = false;
                    this._btnWeapon.x = 250;
                    this._btnWeapon.width = 252;
                    if (btn_huang) btn_huang.active = true;
                    // 金币
                    if (GameDate.Weapon[showWeaponKey].priceType == PriceType.Gold) {
                        if (txt_buy) txt_buy.active = true;
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + GameDate.Weapon[showWeaponKey].price;
                        }
                    }
                    // 钻石
                    else if (GameDate.Weapon[showWeaponKey].priceType == PriceType.Diamond) {
                        if (txt_buy) txt_buy.active = true;
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + GameDate.Weapon[showWeaponKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (GameDate.Weapon[showWeaponKey].priceType == PriceType.ZhuanPanReward) {
                        if (txt_zpjl) txt_zpjl.active = true;
                    }
                }
            }
            // 升级
            else if (showWeaponInfo.Level < 3) {
                this._btnWeaponAd.active = false;
                this._btnWeapon.x = 250;
                this._btnWeapon.width = 252;
                if (btn_hong) btn_hong.active = true;
                if (txt_upgrade) txt_upgrade.active = true;
                if (icon_jinbi) {
                    icon_jinbi.active = true;
                    icon_jinbi.x = 0;
                }
                if (price) {
                    price.active = true;
                    price.x = 30;
                    price.getComponent(cc.Label).string = '' + Constant.weaponLevelPriceArr[showWeaponInfo.Level];
                }
            }
            // 最大等级
            else {
                this._btnWeaponAd.active = false;
                this._btnWeapon.x = 250;
                this._btnWeapon.width = 252;
                if (txt_sjwc) txt_sjwc.active = true;
            }
        }

        this._updateWeaponFrame();

    }

    _updateWeaponFrame() {
        let gunInfos: string = cocosz.dataMgr.getItem(Constant.ST_GunInfo, "");
        if (gunInfos) {
            let gunInfoArr: GunInfo[] = JSON.parse(gunInfos);
            if (gunInfoArr) {
                for (let i = 0; i < this._weaponList.length; i++) {
                    let node = this._weaponList[i];
                    if (GameDate.Weapon[node.name] && GameDate.Weapon[node.name].id >= 0) {
                        let id = GameDate.Weapon[node.name].id;
                        if (gunInfoArr[id]) {
                            let state = gunInfoArr[id].State;
                            if (state >= 1) {
                                node.getChildByName("kuang_hui").active = false;
                            } else {
                                node.getChildByName("kuang_hui").active = true;
                            }
                            // 选中
                            if (node.name == Weapon.WeaponName[this._showWeaponId]) {
                                node.getChildByName("kuang_huang").active = true;
                                if (this._ani_arrow) {
                                    if (gunInfoArr[id].State > 0 && gunInfoArr[id].Level < 3) {
                                        this._ani_arrow.x = node.x + 30;
                                        this._ani_arrow.active = true;
                                    } else {
                                        this._ani_arrow.active = false;
                                    }
                                }
                            } else {
                                node.getChildByName("kuang_huang").active = false;
                            }
                        } else {
                            node.getChildByName("kuang_hui").active = false;
                            node.getChildByName("kuang_huang").active = false;
                        }
                    } else {
                        node.getChildByName("kuang_hui").active = false;
                        node.getChildByName("kuang_huang").active = false;
                    }

                }
            }
        }
    }

    /** 金币/钻石弹窗 */
    showCoinPanel(isDiamond: boolean) {
        let node = cc.instantiate(cocosz.resMgr.getRes("UIADPanel", cc.Prefab));
        cc.find("Canvas").addChild(node);
        if (isDiamond) {
            node.getComponent("UIADPanel").setDiamond();
        }
    }

    /** 飞金币/钻石 */
    private _flyCoins(iconName: string, frameNodeName: string) {
        let posNode = cc.find(frameNodeName, this._page);
        if (!posNode) return;
        let pos = posNode.parent.convertToWorldSpaceAR(posNode.position);
        FlyCoin.Show(iconName, pos);
    }

    /** 更新音频开关 */
    private _updateAudioBtn(isPlay: boolean = true) {
        let offImg: cc.Node = cc.find("Background/off", this._btnAudio);
        offImg.active = cocosz.dataMgr.AudioOn == false;
        if (isPlay) {
            //判断开关，重新播放背景音乐
            if (cocosz.dataMgr.AudioOn) {
                cocosz.audioMgr.playBgm();
            } else {
                cocosz.audioMgr.stopAll();
            }
        }
    }

    /** 更新震动开关 */
    private _updatShakeBtn() {
        let offImg: cc.Node = cc.find("Background/off", this._btnShake);
        offImg.active = cocosz.dataMgr.ShakeOn == false;
    }

}
