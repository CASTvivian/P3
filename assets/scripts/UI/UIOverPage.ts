import UIPage from "../Framework/UIPage";
import { PageName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import { utils } from "../../common-plugin/Scripts/Utils";
import { BannerLocation } from "../../common-plugin/Scripts/YZ_Constant";
import { gameMgr } from "../Game/gameMgr";
import { upgradeMgr } from "../Game/UpgradeMgr";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIOverPage extends UIPage {
    private _panel: cc.Node = null;
    private _mask: cc.Node = null;

    private _btnContinue: cc.Node = null;
    private _btnHome: cc.Node = null;

    constructor() {
        super(PageName.UIOverPage);
        this.isValid() && this.onLoad();
    }
    protected onLoad() {
        this._mask = cc.find("Mask", this._page);
        this._panel = cc.find("Panel", this._page)

        this._btnContinue = cc.find("BtnContinue", this._panel);
        this._btnContinue.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
        this._btnHome = cc.find("BtnHome", this._panel);
        this._btnHome.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
    }

    protected onOpen() {
        utils.SendEvent("页面-结算-" + (gameMgr.isWin ? "胜利" : "失败"));
        this.showAd();
        this._initPanel();
        cocosz.dataMgr.TotoalCount_6++;
    }

    protected onClose() {
        cc.game.targetOff(this);
        utils.hideVivoGamePortalWidget();
        utils.hideOppoGameDrawerAdWidget();
        utils.adManager.hideBlockAd();
        utils.adManager.hideNativeTryGameWidget();
        utils.adManager.HideSingleNativeAd();
        if (PlatUtils.IsWechat) {
            utils.adManager.HideBanner(BannerLocation.Over);
            utils.adManager.hideCustomAd({ location: 5 });
            utils.adManager.hideCustomAd({ location: 6 });
            utils.adManager.hideCustomAd({ location: 7 });
        } else if (PlatUtils.IsVIVO) {
            utils.adManager.hideCustomAd({ location: BannerLocation.Over });
        }
    }

    protected showAd() {
        utils.adManager.ShowBanner(BannerLocation.Over, { width: 0.1, bottom: 1 });
        // 显示积木广告
        utils.adManager.showBlockAd({ top: 500 });
        // 悬浮icon
        utils.adManager.showNativeTryGameWidget({ right: 95, top: 500, scale: 1, parent: this._page });
        // 原生广告
        if (PlatUtils.IsWechat) {
            utils.adManager.showCustomAd({ location: 5 });
            utils.adManager.showCustomAd({ location: 6 });
            utils.adManager.showCustomAd({ location: 7 });
        } else if (PlatUtils.IsVIVO) {
            utils.adManager.showCustomAd({ location: BannerLocation.Over });
        }
        // 互推
        utils.showTryGamesWidget({ group: 'default', scale: 1, top: 180, right: 25, parent: this._page, location: BannerLocation.Over });
        utils.showMoreGamesWidget({ group: 'default', scale: 1, top: 300, left: 25, parent: this._page, location: BannerLocation.Over });
        utils.showRecommendGamesList({ group: 'default', scale: 1, parent: this._page, bottom: 1000 });
        utils.showVivoGamePortalWidget({ top: 500, location: BannerLocation.Over });
        utils.showOppoGameDrawerAdWidget({ bottom: 500, location: BannerLocation.Over });
        utils.showOppoRecBanner({ bottom: 500, left: 0, location: BannerLocation.Over });

        let result = null;
        if (gameMgr && gameMgr.isWin) {
            utils.GameWin(cocosz.getLevelId().toString());
        } else if (gameMgr && gameMgr.isFail) {
            utils.GameFail(cocosz.getLevelId().toString());
        }
        // //当返回值不为空，并且返回值的node不为空，会返回6个互推节点
        if (result && result.node) {
            //获取到节点后，将返回值的node节点添加到指定节点上。
            result.node.position = cc.v2(0, 0)
            this._page.addChild(result.node, 0);
        }
    }

    getSkillIDName(id: number) {
        return id + (upgradeMgr.upgradeSkillMaxLevelArr[id] > 1 ? "_" + (upgradeMgr.upgradeSkillArr[id] + 1) : "")
    }
    _initPanel() {
        // 弹窗效果
        this._mask.opacity = 0;
        cc.tween(this._mask).to(0.2, { opacity: 120 }).start();
        this._panel.scale = 0;
        cc.tween(this._panel).to(0.3, { scale: 1 }, { easing: "backOut" }).start();

        if (upgradeMgr && upgradeMgr.isValid) {
            // boss
            let kuang_boss = this._panel.getChildByName("kuang_boss");
            if (upgradeMgr.bossKillId.length) {
                let kuang_boss_layout = kuang_boss.getChildByName("layout");
                if (kuang_boss_layout) {
                    kuang_boss_layout.active = true;
                    kuang_boss_layout.children.forEach((v, i) => {
                        if (upgradeMgr.bossKillId.includes(parseInt(v.name))) {
                            v.active = true;
                        } else {
                            v.active = false;
                        }
                    })
                }
            } else {
                let kuang_boss_no = kuang_boss.getChildByName("no");
                if (kuang_boss_no) {
                    kuang_boss_no.active = true;
                }
            }
            // 技能
            let kuang_skill = this._panel.getChildByName("kuang_skill");
            if (upgradeMgr.upgradeSkillArr.includes(1) || upgradeMgr.upgradeSkillArr.includes(2) || upgradeMgr.upgradeSkillArr.includes(3)) {
                let skill_scrollView = kuang_skill.getChildByName("skillScrollView");
                if (skill_scrollView) {
                    skill_scrollView.active = true;
                    let skill_content = cc.find("view/content", skill_scrollView);
                    if (skill_content) {
                        upgradeMgr.upgradeSkillArr.forEach((level, id) => {
                            if (upgradeMgr.upgradeSkillMaxLevelArr[id] == 3) {
                                // for (let i = 1; i <= level; i++) {
                                    let icon = cocosz.resMgr.getRes("zombieSkill_icon_" + id + "_" + level, cc.SpriteFrame);
                                    if (icon) {
                                        let node = new cc.Node();
                                        let sprit = node.addComponent(cc.Sprite);
                                        sprit.spriteFrame = icon;
                                        sprit.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                                        node.setContentSize(70, 70);
                                        skill_content.addChild(node);
                                    }
                                // }
                            } else if (level > 0) {
                                let icon = cocosz.resMgr.getRes("zombieSkill_icon_" + id, cc.SpriteFrame);
                                if (icon) {
                                    let node = new cc.Node();
                                    let sprit = node.addComponent(cc.Sprite);
                                    sprit.spriteFrame = icon;
                                    sprit.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                                    node.setContentSize(70, 70);
                                    skill_content.addChild(node);
                                }
                            }
                        })
                    }
                }
            } else {
                let kuang_skill_no = kuang_skill.getChildByName("no");
                if (kuang_skill_no) {
                    kuang_skill_no.active = true;
                }
            }
            // 结算信息
            let info = cc.find("info", this._panel);
            if (info) {
                // 标题
                cc.log("iswin:", gameMgr.isWin, " isFail:",gameMgr.isFail)
                info.getChildByName('tittle').children[0].active = gameMgr.isWin;
                info.getChildByName('tittle').children[1].active = gameMgr.isFail;
                // 历史最佳
                // 游戏时间
                info.getChildByName('time2').getComponent(cc.Label).string = cocosz.StoHMS(cocosz.dataMgr.best_time);
                // 击杀数
                info.getChildByName('kill2').getComponent(cc.Label).string = cocosz.dataMgr.best_kill.toString();
                // 等级
                info.getChildByName('level2').getComponent(cc.Label).string = cocosz.dataMgr.best_level.toString();
                // 金币
                info.getChildByName('coin2').getComponent(cc.Label).string = cocosz.dataMgr.best_coin.toString();
                // 本局详情
                let newRecard1 = info.getChildByName('newRecard1');
                let newRecard2 = info.getChildByName('newRecard2');
                let newRecard3 = info.getChildByName('newRecard3');
                let newRecard4 = info.getChildByName('newRecard4');
                // 游戏时间
                info.getChildByName('time1').getComponent(cc.Label).string = cocosz.StoHMS(gameMgr.GameTime);
                if (gameMgr.GameTime > cocosz.dataMgr.best_time) {
                    info.getChildByName('time1').color = cc.Color.RED;
                    cocosz.dataMgr.best_time = gameMgr.GameTime;
                    newRecard1.active = true;
                }
                // 击杀数
                info.getChildByName('kill1').getComponent(cc.Label).string = upgradeMgr.zombieKillNum.toString();
                if (upgradeMgr.zombieKillNum > cocosz.dataMgr.best_kill) {
                    info.getChildByName('kill1').color = cc.Color.RED;
                    cocosz.dataMgr.best_kill = upgradeMgr.zombieKillNum;
                    newRecard2.active = true;
                }
                // 等级
                info.getChildByName('level1').getComponent(cc.Label).string = upgradeMgr.curLevel.toString();
                if (upgradeMgr.curLevel > cocosz.dataMgr.best_level) {
                    info.getChildByName('level1').color = cc.Color.RED;
                    cocosz.dataMgr.best_level = upgradeMgr.curLevel;
                    newRecard3.active = true;
                }
                // 金币
                let count = upgradeMgr.zombieKillNum + upgradeMgr.curLevel * 10 + Math.min(500, Math.ceil(gameMgr.GameTime / 10));
                cocosz.dataMgr.CoinCount += count;
                info.getChildByName('coin1').getComponent(cc.Label).string = count.toString();
                if (count > cocosz.dataMgr.best_coin) {
                    info.getChildByName('coin1').color = cc.Color.RED;
                    cocosz.dataMgr.best_coin = count;
                    newRecard4.active = true;
                }
            }
        }
    }

    private _isToHome: boolean = false;
    private async _onBtnClickHandler(event: any) {
        await cocosz.audioMgr.playBtnEffect().catch();
        if (this._isToHome) return;
        switch (event.target.name) {
            case "BtnContinue": {
                // 上报 继续游戏
                utils.umaEvent("gamecontinue");
                if (cocosz.gameMode == 6) {
                    cocosz.gameMgr.gameStart(cocosz.dataMgr.TotoalCount_6);
                }
                break;
            }
            case "BtnHome": {
                // 上报 返回首页
                utils.umaEvent("gamereturn");
                cocosz.sceneMgr.loadScene("Home", () => {
                    cocosz.uiMgr.openPage(PageName.UIHomePage);
                })
                break;
            }
        }
    }
}
