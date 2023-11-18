
import UIPage from "../Framework/UIPage";
import Constant, { PageName, PanelName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import { utils } from "../../common-plugin/Scripts/Utils";
import { BannerLocation } from "../../common-plugin/Scripts/YZ_Constant";
import { gameMgr } from "../Game/gameMgr";
import { guideLayer } from "./GuideLayer";
import { start } from "repl";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;


/**
 * 游戏页面
 */
@ccclass
export default class UIGamePage extends UIPage {

    private _handAni: cc.Node = null;
    private _btnCt: cc.Node = null;
    private _btnQpbz: cc.Node = null;

    constructor() {
        super(PageName.UIGamePage);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this._handAni = cc.find("handAni", this._page);

        let btnList1 = ["rangedWeapon", "rangedWeaponAd", "BtnPause", "BtnBullet", "BtnShuxing", "BtnHideBanner", "BtnCt", "BtnQpbz"];
        btnList1.forEach(btnName => {
            let btn = this._page.getChildByName(btnName);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
                if (btn.name == "rangedWeaponAd") {
                    if (cocosz.isADON && cocosz.getConfigByKey("isVideoAd_advanced_weapon") != "false") {
                        btn.active = true;
                    } else {
                        btn.active = false;
                    }
                } else if (btn.name == "BtnHideBanner") {
                    if (cocosz.isShowAd && cocosz.isADON && cocosz.getConfigByKey("isVideoAd_hideBanner") == "true") {
                        btn.active = true;
                    } else {
                        btn.active = false;
                    }
                } else if (btn.name == "BtnCt") {
                    this._btnCt = btn;
                    if (cocosz.isShowAd && cocosz.isADON && !cocosz.dataMgr.guide_skill && cocosz.getConfigByKey("isVideoAd_Citie") != "false") {
                        this._btnCt.active = true;
                        // 隐藏图标
                        if (this._btnCt.childrenCount) {
                            this._btnCt.children.forEach((child) => { child.active = false });
                        }
                    } else {
                        this._btnCt.active = false;
                        let widget = this._btnCt.getComponent(cc.Widget);
                        if (widget) { widget.enabled = false; }
                    }
                } else if (btn.name == "BtnQpbz") {
                    this._btnQpbz = btn;
                    if (cocosz.isShowAd && cocosz.isADON && !cocosz.dataMgr.guide_skill && cocosz.getConfigByKey("isVideoAd_Qpbz") != "false") {
                        this._btnQpbz.active = true;
                        // 隐藏图标
                        if (this._btnQpbz.childrenCount) {
                            this._btnQpbz.children.forEach((child) => { child.active = false });
                        }
                    } else {
                        this._btnQpbz.active = false;
                        let widget = this._btnQpbz.getComponent(cc.Widget);
                        if (widget) { widget.enabled = false; }
                    }
                }
            }
        })
    }

    protected onOpen() {
        utils.SendEvent("页面-游戏");
        //监听游戏事件
        // cc.game.on(Constant.E_GAME_LOGIC, this._onGameMessageHandler, this);
        gameMgr.uiGamePage = this._page;
        gameMgr.moveArea = cc.find("moveArea", this._page);
        gameMgr.yaogan = cc.find("move", this._page);
        let widge = gameMgr.yaogan.getComponent(cc.Widget);
        if (widge) {
            gameMgr.yaogan.getComponent(cc.Widget).updateAlignment();
            widge.enabled = false;
        }
        // gameMgr.btnSkill = cc.find("BtnSkill", this._page);
        // gameMgr.btnSkillAd = cc.find("BtnSkillAd", this._page);
        gameMgr.rangedWeaponMess = this._page.getChildByName("rangedWeapon");
        gameMgr.ammo = gameMgr.rangedWeaponMess.getChildByName("ammo").getComponent(cc.Label);
        gameMgr.rangedWeaponAdMess = this._page.getChildByName("rangedWeaponAd");
        gameMgr.ammoAd = gameMgr.rangedWeaponAdMess.getChildByName("ammo").getComponent(cc.Label);
        gameMgr.qlzc = this._page.getChildByName("qlzc");
        gameMgr.BtnBullet = this._page.getChildByName("BtnBullet");
        // 地下城
        if (cocosz.gameMode == 6) {
            // boss血条
            gameMgr.model6_bossBar = this._page.getChildByName("bossBar").getComponent(cc.ProgressBar);
            // 经验条
            gameMgr.model6_jingyanBar = this._page.getChildByName("jingyanBar").getComponent(cc.ProgressBar);
            // 技能条
            gameMgr.model6_skillScrollView = this._page.getChildByName("skillScrollView").getComponent(cc.ScrollView);
            gameMgr.model6_skillScrollView_content = cc.find("skillScrollView/view/content", this._page);
            gameMgr.model6_skillScrollView_item = this._page.getChildByName("item");
            // 头像
            let BtnShuxing = this._page.getChildByName("BtnShuxing");
            gameMgr.model6_touxiang = BtnShuxing.getChildByName("touxiang");
            let pre = cocosz.resMgr.getRes("head" + (cocosz.gameMgr.gameCtr.curUseSkinId + 1), cc.Prefab);
            if (pre) {
                let touxiang = cc.instantiate(pre);
                touxiang.setParent(gameMgr.model6_touxiang);
                touxiang.scale = 1;
                if (touxiang.children[0]) { touxiang.children[0].active = false; }
            }
            // 属性按钮
            gameMgr.model6_btnShuxing = this._page.getChildByName("BtnShuxing");
            if (gameMgr.model6_btnShuxing) gameMgr.model6_btnShuxing.active = true;
            gameMgr.model6_shuxing = BtnShuxing.getChildByName("shuxing");
            gameMgr.model6_shuxing.active = false;
            // 等级
            gameMgr.model6_levelLabel = this._page.getChildByName("levelLabel").getComponent(cc.Label);
            // 计时
            gameMgr.model6_timeLabel = this._page.getChildByName("timeLabel").getComponent(cc.Label);
            // boss提示
            gameMgr.model6_ts = this._page.getChildByName("ts");

            if (cocosz.dataMgr.guide_skill && (cocosz.getConfigByKey("isVideoAd_Qpbz") != "false" || cocosz.getConfigByKey("isVideoAd_Citie") != "false")) {
                let count: number = 0;
                let tw: cc.Tween = cc.tween(this._page)
                    .delay(1)
                    .call(() => {
                        if (gameMgr.isGameStart && !cocosz.isPause) {
                            count++;
                            cc.log("count:", count)
                            if (count == 5) {
                                if (cocosz.getConfigByKey("isVideoAd_Qpbz") != "false") {
                                    this.showSkill(this._btnQpbz);
                                }
                            } else if (count == 8) {
                                if (cocosz.getConfigByKey("isVideoAd_Citie") != "false") {
                                    this.showSkill(this._btnCt);
                                }
                            } else if (count > 8) {
                                cocosz.dataMgr.guide_skill = false;
                                tw && tw.stop();
                            }
                        }
                    })
                    .union()
                    .repeatForever()
                    .start();
            }
        }
        gameMgr.startGame();

        this.showAd();
        cc.game.on(Constant.E_GAME_LOGIC, this._onGameMessageHandler, this);
    }

    protected onClose() {
        cc.game.targetOff(this);
        utils.adManager.hideBlockAd();
        utils.adManager.hideNativeTryGameWidget();
        utils.hideVivoGamePortalWidget();
        utils.adManager.HideSingleNativeAd();
        if (PlatUtils.IsWechat) {
            utils.adManager.hideCustomAd({ location: 3 });
            utils.adManager.hideCustomAd({ location: 4 });
            utils.adManager.hideCustomAd({ location: 8 });
        } else if (PlatUtils.IsVIVO) {
            utils.adManager.hideCustomAd({ location: BannerLocation.Game });
        }
    }


    protected showAd() {
        // 录屏
        utils.showRecordWidget({ group: "default", scale: 1, top: 50, left: 100, parent: this._page });
        if (cocosz.isShowAd) {
            // banner
            if (!cocosz.isShowGameBanner || PlatUtils.IsWechat || PlatUtils.IsDouyin || PlatUtils.IsAndroidDouYin) {
                utils.adManager.HideBanner(BannerLocation.Game);
            } else {
                utils.adManager.ShowBanner(BannerLocation.Game, { width: 0.1, bottom: 0 });
            }
            utils.adManager.showNativeTryGameWidget({ left: 10, top: 500, scale: 1, parent: this._page });
            // 原生广告
            if (PlatUtils.IsWechat) {
                utils.adManager.showCustomAd({ location: 3 });
                utils.adManager.showCustomAd({ location: 4 });
                utils.adManager.showCustomAd({ location: 8 });
            } else if (PlatUtils.IsVIVO) {
                utils.adManager.showCustomAd({ location: BannerLocation.Game });
            }
        }
    }

    showSkill(n: cc.Node) {
        let widget = n.getComponent(cc.Widget);
        if (widget) widget.enabled = false;
        if (n && n.isValid) {
            cocosz.pauseCount++;
            n.setPosition(0, cc.winSize.height / 2);
            n.scale = 2;
            n.active = true;

            let call = () => {
                n.stopAllActions();
                cc.tween(n)
                    .call(() => {
                        if (this._handAni && this._handAni.isValid) {
                            this._handAni.active = false;
                        }
                    })
                    .to(0.5, { scale: 1, x: - cc.winSize.width / 2 + widget.left + n.width / 2, y: - cc.winSize.height / 2 + widget.bottom + n.height / 2 })
                    .call(() => {
                        if (widget) widget.enabled = true;
                        cocosz.pauseCount--;
                    })
                    .start();
            }
            n.once(cc.Node.EventType.TOUCH_END, call, this);
            n.stopAllActions();
            cc.tween(n)
                .to(1, { y: 0 }, { easing: "backOut" })
                .call(() => {
                    if (this._handAni && this._handAni.isValid) {
                        this._handAni.setPosition(0, 0);
                        this._handAni.active = true;
                        let spAni = this._handAni.getComponent(sp.Skeleton);
                        if (spAni) spAni.setAnimation(0, "animation", true);
                    }
                })
                .delay(4)
                .call(() => {
                    n.off(cc.Node.EventType.TOUCH_END, call, this)
                    call();
                })
                .start();
        }
    }

    // 全屏轰炸动画
    effect_qpbz() {
        let pre = cocosz.resMgr.getRes("effect_qpbz", cc.Prefab);
        if (pre) {
            let node: cc.Node = cc.instantiate(pre);
            node.setPosition(gameMgr.playerTs.node.position);
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            cc.tween(node)
                .delay(0.3)
                .call(() => {
                    gameMgr.playEffect("QuanPingBaoZha");
                    cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Allzombie_Destory });
                })
                .union()
                .repeat(4)
                .call(() => { node.destroy(); })
                .start();
        }
    }

    private _onGameMessageHandler(event: any) {
        switch (event.type) { }
    }

    private async _onBtnClickHandler(event: cc.Event.EventTouch) {
        cocosz.audioMgr.playBtnEffect();

        switch (event.target.name) {
            case "rangedWeaponAd": {
                if (gameMgr.rangedWeaponAdMess) {
                    let adIcon = gameMgr.rangedWeaponAdMess.getChildByName("adIcon");
                    if (adIcon && adIcon.active) {
                        utils.SendEvent("视频-高级武器-播放")
                        cocosz.watchAD(() => {
                            utils.SendEvent("视频-高级武器-成功")
                            adIcon.active = false;
                            gameMgr.useRangedWeaponAd();
                            gameMgr.rangedWeaponAdMess.stopAllActions();
                        }, () => {
                            utils.SendEvent("视频-高级武器-失败")
                        });
                    } else {
                        gameMgr.useRangedWeaponAd();
                    }
                }
                break;
            }
            case "rangedWeapon": {
                gameMgr.useRangedWeapon();
                break;
            }
            case "BtnPause": {
                cocosz.uiMgr.openPanel(PanelName.UIPausePanel);
                break;
            }
            case "BtnBullet": {
                if (gameMgr.BtnBullet && gameMgr.playerTs && gameMgr.playerTs.curWeapon && gameMgr.playerTs.curWeapon.isRangeWeapon)
                    gameMgr.playerTs.curWeapon.reloadBullet();
                break;
            }
            case "BtnShuxing": {
                gameMgr.model6_shuxing.active = !gameMgr.model6_shuxing.active;
                gameMgr.update_model6_shuxing();
                break;
            }
            case "BtnHideBanner": {
                utils.SendEvent("视频-游戏中去广告-播放")
                cocosz.watchAD(() => {
                    utils.SendEvent("视频-游戏中去广告-成功")
                    event.target.active = false;
                    gameMgr.canSHowGameBanner = false;
                    utils.adManager.HideBanner(BannerLocation.Game);
                }, () => {
                    utils.SendEvent("视频-游戏中去广告-失败")
                });
                break;
            }
            case "BtnCt": {
                if (this._btnCt && this._btnCt.getChildByName("share") && this._btnCt.getChildByName("share").active) {
                    utils.SendEvent("分享-磁铁")
                    cocosz.share(() => {
                        utils.SendEvent("分享-磁铁-成功")
                        // 磁铁事件
                        cc.game.emit(Constant.E_Skill_Citie);
                    }, () => {
                        utils.SendEvent("分享-磁铁-失败")
                    });
                } else if (this._btnCt && this._btnCt.getChildByName("video") && this._btnCt.getChildByName("video").active) {
                    utils.SendEvent("视频-磁铁-播放")
                    cocosz.watchAD(() => {
                        utils.SendEvent("视频-磁铁-成功")
                        // 磁铁事件
                        cc.game.emit(Constant.E_Skill_Citie);
                    }, () => {
                        utils.SendEvent("视频-磁铁-失败")
                    });
                } else {
                    // 磁铁事件
                    cc.game.emit(Constant.E_Skill_Citie);
                }
                break;
            }
            case "BtnQpbz": {
                if (this._btnQpbz && this._btnQpbz.getChildByName("share") && this._btnQpbz.getChildByName("share").active) {
                    utils.SendEvent("分享-全屏轰炸")
                    cocosz.share(() => {
                        utils.SendEvent("分享-全屏轰炸-成功")
                        // 全屏轰炸动画
                        this.effect_qpbz();
                    }, () => {
                        utils.SendEvent("分享-全屏轰炸-失败")
                    });
                } else if (this._btnQpbz && this._btnQpbz.getChildByName("video") && this._btnQpbz.getChildByName("video").active) {
                    utils.SendEvent("视频-全屏轰炸-播放")
                    cocosz.watchAD(() => {
                        utils.SendEvent("视频-全屏轰炸-成功")
                        // 全屏轰炸动画
                        this.effect_qpbz();
                    }, () => {
                        utils.SendEvent("视频-全屏轰炸-失败")
                    });
                } else {
                    // 全屏轰炸动画
                    this.effect_qpbz();
                }
                break;
            }
        }
    }
}

