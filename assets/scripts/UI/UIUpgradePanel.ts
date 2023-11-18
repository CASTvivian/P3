import UIPage from "../Framework/UIPage";
import { PanelName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import { utils } from "../../common-plugin/Scripts/Utils";
import TweenEffect from "../Framework/TweenEffect";
import { SkillType, upgradeMgr } from "../Game/UpgradeMgr";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import { gameMgr } from "../Game/gameMgr";

const { ccclass, property } = cc._decorator;

/**
 * 皮肤试用面板
 */
@ccclass
export default class UIUpgradePanel extends UIPage {

    private _mask: cc.Node = null;
    private _panel: cc.Node = null;
    private _skill0: cc.Node = null;
    private _skill1: cc.Node = null;
    private _skill2: cc.Node = null;
    private _skill3: cc.Node = null;
    private _skill4: cc.Node = null;
    private _btnRefresh: cc.Node = null;

    private _betterArr: number[] = [];
    private _otherArr: number[] = [];// 可以获取的技能数组
    private _uiSkillIdArr: number[] = [];// 随机4个技能
    private _curIndex: number = -1;// 当前选中下标

    private _canClick: boolean = true;// 能否点击

    private _lockArr: boolean[] = [false, false, false, false, false];

    constructor() {
        super(PanelName.UIUpgradePanel);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this._mask = this._page.getChildByName("Mask");
        this._panel = this._page.getChildByName("Panel");
        let btnNames: string[] = ["skill0", "skill1", "skill2", "skill3", "skill4", "btnRefresh"];
        for (let i = 0; i < btnNames.length; i++) {
            let btn: cc.Node = cc.find(btnNames[i], this._panel);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
                if (btn.name == "skill0") {
                    this._skill0 = btn;
                } else if (btn.name == "skill1") {
                    this._skill1 = btn;
                } else if (btn.name == "skill2") {
                    this._skill2 = btn;
                } else if (btn.name == "skill3") {
                    this._skill3 = btn;
                } else if (btn.name == "skill4") {
                    this._skill4 = btn;
                } else if (btn.name == "btnRefresh") {
                    this._btnRefresh = btn;
                    btn.active = cocosz.isADON;
                }
            }
        }
        // 服务器锁的数量
        let serverValue = cocosz.getConfigByKey("skillLockNum");
        if (Number.isInteger(serverValue)) {
            for (let i = 0; i < 5; i++) {
                if (i + serverValue >= 5) {
                    this._lockArr[i] = true;
                } else {
                    this._lockArr[i] = false;
                }
            }
        }
    }

    protected onOpen() {
        utils.SendEvent("页面-技能");
        // 优先技能数组
        let better = [
            SkillType.双发, SkillType.子弹碎片, SkillType.枪林弹雨, SkillType.谢幕,
            SkillType.瞬斩, SkillType.冰霜精通, SkillType.火焰精通, SkillType.萃取,
            SkillType.再生, SkillType.护甲靴子, SkillType.疾走, SkillType.神圣守护,
            SkillType.通灵匕首, SkillType.飞轮, SkillType.闪电, SkillType.燃烧瓶
        ];
        // 可以获取的技能数组
        for (let i = 0; i <= 34; i++) {
            if ([SkillType.雷电精通, SkillType.龙卵, SkillType.通灵镰刀].includes(i)) {
                // 剔除的技能
            } else if (upgradeMgr && upgradeMgr.isValid && upgradeMgr.upgradeSkillArr[i] >= upgradeMgr.upgradeSkillMaxLevelArr[i]) {
                // 达到最大级
            } else if (better.includes(i)) {
                // 优先数组
                this._betterArr.push(i);
            } else {
                // 其它数组
                this._otherArr.push(i);
            }
        }
        this._initPanel();

        if (PlatUtils.IsWechat) {
            utils.adManager.hideCustomAd({ location: 3 });
            utils.adManager.hideCustomAd({ location: 4 });
        }
    }

    protected onClose(): void {
        cocosz.pauseCount--;
        if (PlatUtils.IsWechat) {
            utils.adManager.showCustomAd({ location: 3 });
            utils.adManager.showCustomAd({ location: 4 });
        }
    }

    private _initPanel() {
        TweenEffect.panel_mask_opacity(this._mask)
        TweenEffect.panel_open_moveY(this._panel);
        this._curIndex = -1;
        // 刷新技能
        this._skill_refresh();
    }

    /**
     * 所有按钮点击事件
     * @param event 
     * @param data 
     */
    private async _onBtnClickedHandler(event: cc.Event, data: any) {
        //播放按钮点击音效
        await cocosz.audioMgr.playBtnEffect().catch();
        if (!this._canClick) return;
        switch (event.target.name) {
            case "btnRefresh": {
                this._canClick = false;
                // 分享
                if (event.target.getChildByName("share") && event.target.getChildByName("share").active) {
                    utils.SendEvent("分享-刷新技能")
                    cocosz.share(() => {
                        utils.SendEvent("分享-刷新技能-成功")
                        this._skill_refresh();
                        this._canClick = true;
                    }, () => {
                        utils.SendEvent("分享-刷新技能-失败")
                        this._canClick = true;
                    })
                }
                // 视频
                else if (event.target.getChildByName("video") && event.target.getChildByName("video").active) {
                    utils.SendEvent("视频-技能刷新(地下城僵尸)-播放")
                    cocosz.watchAD(() => {
                        utils.SendEvent("视频-技能刷新(地下城僵尸)-成功")
                        this._skill_refresh();
                        this._canClick = true;
                    }, () => {
                        utils.SendEvent("视频-技能刷新(地下城僵尸)-失败")
                        this._canClick = true;
                    });
                }
                break;
            }
            case "skill0":
            case "skill1":
            case "skill2":
            case "skill3":
            case "skill4": {
                this._canClick = false;

                let callback = () => {
                    if ("skill0" == event.target.name)
                        this._curIndex = 0;
                    else if ("skill1" == event.target.name)
                        this._curIndex = 1;
                    else if ("skill2" == event.target.name)
                        this._curIndex = 2;
                    else if ("skill3" == event.target.name)
                        this._curIndex = 3;
                    else if ("skill4" == event.target.name)
                        this._curIndex = 4;
                    // 刷新
                    this.updateFrame();
                    // 选中技能
                    this._selectSkill();
                }
                let lockNode = event.target.getChildByName("lock");
                if (lockNode && lockNode.active) {
                    // 分享
                    if (lockNode.getChildByName("share") && lockNode.getChildByName("share").active) {
                        utils.SendEvent("分享-技能解锁")
                        cocosz.share(() => {
                            utils.SendEvent("分享-技能解锁-成功")
                            callback && callback();
                        }, () => {
                            utils.SendEvent("分享-技能解锁-失败")
                            this._canClick = true;
                        })
                    }
                    // 视频
                    else if (lockNode.getChildByName("video") && lockNode.getChildByName("video").active) {
                        utils.SendEvent("视频-技能解锁-播放")
                        cocosz.watchAD(() => {
                            utils.SendEvent("视频-技能解锁-成功")
                            callback && callback();
                        }, () => {
                            utils.SendEvent("视频-技能解锁-失败")
                            this._canClick = true;
                        });
                    } else {
                        callback && callback();
                    }
                } else {
                    callback && callback();
                }
                break;
            }
        }
    }

    private _selectSkill() {
        this._canClick = false;
        // 获取技能
        if (this._uiSkillIdArr[this._curIndex]) {
            upgradeMgr && upgradeMgr.isValid && upgradeMgr.getSkill(this._uiSkillIdArr[this._curIndex]);
        }
        // 卡片效果
        let arr: cc.Node[] = [this._skill0, this._skill1, this._skill2, this._skill3, this._skill4];
        arr.forEach((v, i) => {
            if (i == this._curIndex) {
                this.card_click(v);
            } else {
                this.card_recycle(v);
            }
        })
        // 关闭弹窗
        cocosz.scheduleOnce(() => {
            cocosz.uiMgr.closePanel(PanelName.UIUpgradePanel);
            if (gameMgr && gameMgr.playerTs && gameMgr.playerTs.isValid) {
                gameMgr.playerTs.avoidInjury(2);
            }
        }, 1.5);
    }

    private _getSkillIDName(id: number) {
        return id + (upgradeMgr.upgradeSkillMaxLevelArr[id] > 1 ? "_" + (upgradeMgr.upgradeSkillArr[id] + 1) : "")
    }

    private _skill_load(card: cc.Node, id) {
        // 名字
        let node_name = card.getChildByName("name");
        if (node_name) {
            let spr_name = node_name.getComponent(cc.Sprite);
            if (spr_name) {
                cocosz.resMgr.loadAndCacheRes("i18n/tex_zombie/" + cocosz.curLanguage + "/zombieSkill_name_" + this._getSkillIDName(id), cc.SpriteFrame, null, (err, res) => {
                    if (spr_name && spr_name.isValid) {
                        spr_name.spriteFrame = res;
                    }
                });
            }
        }
        // 图标
        let node_icon = card.getChildByName("icon");
        if (node_icon) {
            let spr_icon = node_icon.getComponent(cc.Sprite);
            if (spr_icon) {
                cocosz.resMgr.loadAndCacheRes("tex_zombie/zombieSkill_icon_" + this._getSkillIDName(id), cc.SpriteFrame, null, (err, res) => {
                    if (spr_icon && spr_icon.isValid) {
                        spr_icon.spriteFrame = res;
                    }
                });
            }
        }
        // 介绍
        let node_introduce = card.getChildByName("introduce");
        if (node_introduce) {
            let spr_introduce = node_introduce.getComponent(cc.Sprite);
            if (spr_introduce) {
                cocosz.resMgr.loadAndCacheRes("i18n/tex_zombie/" + cocosz.curLanguage + "/zombieSkill_introduce_" + this._getSkillIDName(id), cc.SpriteFrame, null, (err, res) => {
                    if (spr_introduce && spr_introduce.isValid) {
                        spr_introduce.spriteFrame = res;
                    }
                });
            }
        }
    }

    /** 技能刷新 */
    private _skill_refresh() {
        this._uiSkillIdArr.length = 0;
        // 从技能数组中获取5个技能
        if (this._betterArr.length) {
            for (let i = Math.min(5 - this._uiSkillIdArr.length, this._betterArr.length); i > 0; i--) {
                let index = Math.floor(Math.random() * this._betterArr.length);
                if (this._betterArr[index] >= 0) {
                    this._uiSkillIdArr.push(this._betterArr[index]);
                    this._betterArr.splice(index, 1);
                }
            }
        }
        if (this._otherArr.length) {
            for (let i = Math.min(5 - this._uiSkillIdArr.length, this._otherArr.length); i > 0; i--) {
                let index = Math.floor(Math.random() * this._otherArr.length);
                if (this._otherArr[index] >= 0) {
                    this._uiSkillIdArr.push(this._otherArr[index]);
                    this._otherArr.splice(index, 1);
                }
            }
        }
        // 排序
        for (let i = 0; i < this._uiSkillIdArr.length; i++) {
            // 3级技能(非视频位置)
            if (upgradeMgr.upgradeSkillArr[this._uiSkillIdArr[i]] == 2 && !this._lockArr[i]) {
                // 与视频位置交换
                for (let j = this._uiSkillIdArr.length - 1; j > i; j--) {
                    if (this._lockArr[j] && upgradeMgr.upgradeSkillArr[this._uiSkillIdArr[j]] != 2) {
                        // 交换
                        [this._uiSkillIdArr[i], this._uiSkillIdArr[j]] = [this._uiSkillIdArr[j], this._uiSkillIdArr[i]]
                    }
                }
            }
        }

        // 技能0 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[0] >= 0) {
            this._skill0.active = true;
            let id = this._uiSkillIdArr[0];
            this._skill_load(this._skill0, id);

        } else {
            this._skill0.active = false;
        }
        // 技能1 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[1] >= 0) {
            this._skill1.active = true;
            let id = this._uiSkillIdArr[1];
            this._skill_load(this._skill1, id);
        } else {
            this._skill1.active = false;
        }
        // 技能2 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[2] >= 0) {
            this._skill2.active = true;
            let id = this._uiSkillIdArr[2];
            this._skill_load(this._skill2, id);
        } else {
            this._skill2.active = false;
        }
        // 技能3 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[3] >= 0) {
            this._skill3.active = true;
            let id = this._uiSkillIdArr[3];
            this._skill_load(this._skill3, id);
        } else {
            this._skill3.active = false;
        }
        // 技能4 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[4] >= 0) {
            this._skill4.active = true;
            let id = this._uiSkillIdArr[4];
            this._skill_load(this._skill4, id);
        } else {
            this._skill4.active = false;
        }

        // 视频按钮隐藏
        if (this._otherArr.length == 0 && this._btnRefresh && this._btnRefresh.active) {
            this._btnRefresh.active = false;
        }
        this.updateFrame();
    }

    // 更新外发光
    updateFrame() {
        // 选中框
        this._skill0.children[0].active = (this._curIndex == 0);
        this._skill1.children[0].active = (this._curIndex == 1);
        this._skill2.children[0].active = (this._curIndex == 2);
        this._skill3.children[0].active = (this._curIndex == 3);
        this._skill4.children[0].active = (this._curIndex == 4);
        // 解锁框
        this._skill0.children[5].active = this._lockArr[0] && this._curIndex != 0;
        this._skill1.children[5].active = this._lockArr[1] && this._curIndex != 1;
        this._skill2.children[5].active = this._lockArr[2] && this._curIndex != 2;
        this._skill3.children[5].active = this._lockArr[3] && this._curIndex != 3;
        this._skill4.children[5].active = this._lockArr[4] && this._curIndex != 4;
    }

    /** 卡牌选中特效 */
    card_click(card: cc.Node) {
        card.zIndex = cc.macro.MAX_ZINDEX;
        cc.tween(card)
            .to(0.5, { x: 0, y: 200 }, { easing: "sineIn" })
            .to(1, { scale: 2, opacity: 0 }, { easing: "fade" })
            .start();
    }

    /** 卡牌回收 */
    card_recycle(card: cc.Node) {
        let btnUnLock = card.getChildByName("btnUnLock")
        if (btnUnLock) btnUnLock.active = false;
        cc.tween(card)
            .to(0.5, { opacity: 0 }, { easing: "sineIn" })
            .start();
    }

}
