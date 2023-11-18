"use strict";
cc._RF.push(module, 'f4901QXz85C5Y7PEKsAdvsM', 'UpgradeMgr');
// scripts/Game/UpgradeMgr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeMgr = exports.SkillType = void 0;
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var bullet_1 = require("./bullet");
var gameMgr_1 = require("./gameMgr");
var jingyan_1 = require("./jingyan");
var ZombieBase_1 = require("./ZombieBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillType;
(function (SkillType) {
    SkillType[SkillType["\u6574\u88C5\u5F85\u53D1"] = 0] = "\u6574\u88C5\u5F85\u53D1";
    SkillType[SkillType["\u7784\u51C6"] = 1] = "\u7784\u51C6";
    SkillType[SkillType["\u5F3A\u5316"] = 2] = "\u5F3A\u5316";
    SkillType[SkillType["\u77AC\u65A9"] = 3] = "\u77AC\u65A9";
    SkillType[SkillType["\u5F3A\u529B\u5C04\u51FB"] = 4] = "\u5F3A\u529B\u5C04\u51FB";
    SkillType[SkillType["\u7A83\u9B42\u5F39\u5939"] = 5] = "\u7A83\u9B42\u5F39\u5939";
    SkillType[SkillType["\u79D1\u6280\u5B50\u5F39"] = 6] = "\u79D1\u6280\u5B50\u5F39";
    SkillType[SkillType["\u7AD9\u59FF\u5C04\u51FB"] = 7] = "\u7AD9\u59FF\u5C04\u51FB";
    SkillType[SkillType["\u5B50\u5F39\u788E\u7247"] = 8] = "\u5B50\u5F39\u788E\u7247";
    SkillType[SkillType["\u53CC\u53D1"] = 9] = "\u53CC\u53D1";
    SkillType[SkillType["\u8C22\u5E55"] = 10] = "\u8C22\u5E55";
    SkillType[SkillType["\u67AA\u6797\u5F39\u96E8"] = 11] = "\u67AA\u6797\u5F39\u96E8";
    SkillType[SkillType["\u75BE\u8D70"] = 12] = "\u75BE\u8D70";
    SkillType[SkillType["\u8DD1\u52A8\u5C04\u51FB"] = 13] = "\u8DD1\u52A8\u5C04\u51FB";
    SkillType[SkillType["\u610F\u6C14\u98CE\u53D1"] = 14] = "\u610F\u6C14\u98CE\u53D1";
    SkillType[SkillType["\u62A4\u7532\u9774\u5B50"] = 15] = "\u62A4\u7532\u9774\u5B50";
    SkillType[SkillType["\u78C1\u573A"] = 16] = "\u78C1\u573A";
    SkillType[SkillType["\u7075\u80FD\u8865\u7ED9"] = 17] = "\u7075\u80FD\u8865\u7ED9";
    SkillType[SkillType["\u5BB9\u5149\u7115\u53D1"] = 18] = "\u5BB9\u5149\u7115\u53D1";
    SkillType[SkillType["\u9E70\u773C"] = 19] = "\u9E70\u773C";
    SkillType[SkillType["\u751F\u547D\u529B"] = 20] = "\u751F\u547D\u529B";
    SkillType[SkillType["\u518D\u751F"] = 21] = "\u518D\u751F";
    SkillType[SkillType["\u8FDB\u5316"] = 22] = "\u8FDB\u5316";
    SkillType[SkillType["\u8403\u53D6"] = 23] = "\u8403\u53D6";
    SkillType[SkillType["\u706B\u7130\u7CBE\u901A"] = 24] = "\u706B\u7130\u7CBE\u901A";
    SkillType[SkillType["\u96F7\u7535\u7CBE\u901A"] = 25] = "\u96F7\u7535\u7CBE\u901A";
    SkillType[SkillType["\u51B0\u971C\u7CBE\u901A"] = 26] = "\u51B0\u971C\u7CBE\u901A";
    SkillType[SkillType["\u53CC\u91CD\u9644\u9B54"] = 27] = "\u53CC\u91CD\u9644\u9B54";
    SkillType[SkillType["\u9F99\u5375"] = 28] = "\u9F99\u5375";
    SkillType[SkillType["\u901A\u7075\u5315\u9996"] = 29] = "\u901A\u7075\u5315\u9996";
    SkillType[SkillType["\u901A\u7075\u9570\u5200"] = 30] = "\u901A\u7075\u9570\u5200";
    SkillType[SkillType["\u795E\u5723\u5B88\u62A4"] = 31] = "\u795E\u5723\u5B88\u62A4";
    SkillType[SkillType["\u98DE\u8F6E"] = 32] = "\u98DE\u8F6E";
    SkillType[SkillType["\u95EA\u7535"] = 33] = "\u95EA\u7535";
    SkillType[SkillType["\u71C3\u70E7\u74F6"] = 34] = "\u71C3\u70E7\u74F6";
})(SkillType = exports.SkillType || (exports.SkillType = {}));
exports.upgradeMgr = null;
var UpgradeMgr = /** @class */ (function (_super) {
    __extends(UpgradeMgr, _super);
    function UpgradeMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.zombieKillNum = 0;
        _this.bossKillId = [];
        // 经验层
        _this.jingyanLayer = null;
        // 经验预制体
        _this.jingyanPre = null;
        // 经验触碰距离
        _this.jingyanRange = 200;
        // 升级经验
        _this._jingyanArr = [5, 10, 20, 25, 30, 40, 50, 60, 60, 70, 80, 90, 100, 110, 120, 130, 150, 170, 200, 220, 250, 280, 300, 350, 400, 500, 1000]; // 经验数组
        // private _jingyanArr: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];// 经验数组
        // 已拥有技能
        _this.upgradeSkillArr = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        _this.upgradeSkillMaxLevelArr = [
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 3, 3, 3,
        ];
        // 技能属性
        _this.skill_14 = 1; //增强倍率（伤害和移动速度）
        _this.skill_18 = 0; //加速时间
        _this.skill_magic = 0; //附魔技能的数量
        _this._maxLevel = 25; // 最大等级
        _this._curLevel = 0; // 当前等级
        _this._curMaxJingyan = _this._jingyanArr[_this.curLevel];
        _this._curJingyan = 0; // 当前经验
        _this.canUpgrade = true;
        _this.skillImgArr = [];
        _this._canAccelerate = true;
        _this._bishou = null;
        _this.hudun = null;
        _this._zaishengCdTime = 0;
        _this._feilun = null;
        _this._posArr = [
            [[500, 0]],
            [[500, 0], [-500, 0]],
            [[500, 0], [-300, 400], [-300, -400]],
            [[500, 0], [-500, 0], [0, 500], [0, -500]]
        ];
        _this._shandianCount = 0;
        _this._shandianNum = [1, 1, 3, 5];
        _this._shandiCdTime = 0;
        _this._fireCount = 0;
        _this._fireNum = [1, 1, 2, 3];
        _this._fireCdTime = 0;
        return _this;
    }
    Object.defineProperty(UpgradeMgr.prototype, "curLevel", {
        get: function () { return this._curLevel; },
        set: function (v) {
            if (v < 0)
                v = 0;
            else if (v > this._maxLevel)
                v = this._maxLevel;
            // 升级
            if (v >= this._curLevel) {
                this._curLevel = v;
                gameMgr_1.gameMgr.model6_levelLabel.string = "" + this._curLevel;
                // 升级效果
                this.upgradeEffect();
                // 弹窗
                CocosZ_1.cocosz.pauseCount++;
                CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UIUpgradePanel);
                this._curJingyan -= this._curMaxJingyan;
                this._curMaxJingyan = this._jingyanArr[this.curLevel];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpgradeMgr.prototype, "curJingyan", {
        get: function () { return this._curJingyan; },
        set: function (v) {
            if (v < 0)
                v = 0;
            this._curJingyan = v;
        },
        enumerable: false,
        configurable: true
    });
    /** 初始化监听 */
    UpgradeMgr.prototype.onLoad = function () {
        exports.upgradeMgr = this;
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        // 经验预制体
        this.jingyanPre = CocosZ_1.cocosz.resMgr.getRes("jingyan", cc.Prefab);
        // 添加经验层
        this.jingyanLayer = new cc.Node();
        this.jingyanLayer.name = "jingyanLayer";
        this.jingyanLayer.zIndex = Constant_1.ZindexLayer.zinedx_jingyan;
        this.jingyanLayer.setPosition(cc.Vec2.ZERO);
        this.jingyanLayer.setParent(this.node);
    };
    UpgradeMgr.prototype.start = function () { };
    UpgradeMgr.prototype.onDestroy = function () {
        exports.upgradeMgr = null;
        cc.game.targetOff(this);
    };
    UpgradeMgr.prototype.update = function (dt) {
        if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.model6_jingyanBar) {
            var from = gameMgr_1.gameMgr.model6_jingyanBar.progress;
            var to = this.curJingyan / this._curMaxJingyan;
            if (to == 0) {
                to = 0.001;
            }
            gameMgr_1.gameMgr.model6_jingyanBar.progress = cc.misc.lerp(from, to, 0.2);
        }
        // 经验值满足,且可以升级
        if (this.canUpgrade && !CocosZ_1.cocosz.isPause && this.curLevel < this._maxLevel && this._curJingyan >= this._curMaxJingyan) {
            this.curLevel += 1;
        }
    };
    /** 是否拥有技能 */
    UpgradeMgr.prototype.isHaveSkill = function (id) {
        return this.upgradeSkillArr[id] > 0 ? true : false;
    };
    /** 设置技能UI */
    UpgradeMgr.prototype.setSkillImg = function (id) {
        var str = "zombieSkill_icon_" + id + (this.upgradeSkillMaxLevelArr[id] > 1 ? ("_" + this.upgradeSkillArr[id]) : "");
        var icon = CocosZ_1.cocosz.resMgr.getRes(str, cc.SpriteFrame);
        if (icon && gameMgr_1.gameMgr.model6_skillScrollView_content && gameMgr_1.gameMgr.model6_skillScrollView_content.isValid) {
            if (!this.skillImgArr[id] && gameMgr_1.gameMgr.model6_skillScrollView_item) {
                this.skillImgArr[id] = cc.instantiate(gameMgr_1.gameMgr.model6_skillScrollView_item);
                this.skillImgArr[id].active = true;
                this.skillImgArr[id].setParent(gameMgr_1.gameMgr.model6_skillScrollView_content);
                // 滑动到最右边
                if (gameMgr_1.gameMgr.model6_skillScrollView_content.width > gameMgr_1.gameMgr.model6_skillScrollView.node.width) {
                    gameMgr_1.gameMgr.model6_skillScrollView.scrollToRight();
                }
            }
            if (this.skillImgArr[id]) {
                var sprite = this.skillImgArr[id].getComponent(cc.Sprite);
                if (sprite)
                    sprite.spriteFrame = icon;
            }
        }
    };
    /** 设置技能cd */
    UpgradeMgr.prototype.setSkillCD = function (id, time) {
        if (this.skillImgArr[id]) {
            var skillCD_1 = this.skillImgArr[id].getChildByName("skillCD");
            if (skillCD_1) {
                skillCD_1.active = true;
                skillCD_1.opacity = 255;
                cc.tween(skillCD_1.children[0].getComponent(cc.Sprite))
                    .set({ fillRange: 1 })
                    .to(time, { fillRange: 0 })
                    .call(function () { skillCD_1.opacity = 0; })
                    .start();
                var num_1 = time;
                var timeLabel_1 = skillCD_1.children[1].getComponent(cc.Label);
                cc.tween(skillCD_1)
                    .call(function () { timeLabel_1.string = num_1.toString(); num_1--; })
                    .delay(1)
                    .union()
                    .repeat(time)
                    .start();
            }
        }
    };
    /** 获得技能 */
    UpgradeMgr.prototype.getSkill = function (id) {
        var _this = this;
        this.upgradeSkillArr[id]++;
        this.setSkillImg(id);
        switch (id) {
            case SkillType.整装待发: {
                if (gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.curWeapon) {
                    gameMgr_1.gameMgr.playerTs.curWeapon.bulletNum += 4;
                }
                break;
            }
            case SkillType.瞄准: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.atkRate *= 1.25;
                }
                break;
            }
            case SkillType.强化: {
                if (gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.curWeapon) {
                    gameMgr_1.gameMgr.playerTs.curWeapon.bulletNum += 2;
                    gameMgr_1.gameMgr.playerTs.atkRate *= 1.1;
                }
                break;
            }
            case SkillType.瞬斩: {
                break;
            }
            case SkillType.强力射击: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.atkRate *= 1.2;
                }
                break;
            }
            case SkillType.窃魂弹夹: {
                break;
            }
            case SkillType.科技子弹: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.atkSpeedRate -= 0.1;
                }
                break;
            }
            case SkillType.站姿射击: {
                var can_1 = true;
                this.schedule(function () {
                    if (can_1 && gameMgr_1.gameMgr.playerTs.moveDir.mag() == 0) {
                        can_1 = false;
                        gameMgr_1.gameMgr.playerTs.atkRate *= 1.3;
                    }
                    else if (!can_1 && gameMgr_1.gameMgr.playerTs.moveDir.mag() > 0) {
                        can_1 = true;
                        gameMgr_1.gameMgr.playerTs.atkRate /= 1.3;
                    }
                }, 0.1);
                break;
            }
            case SkillType.子弹碎片: {
                break;
            }
            case SkillType.双发: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.atkBulletNum += 1;
                }
                break;
            }
            case SkillType.谢幕: {
                break;
            }
            case SkillType.枪林弹雨: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.atkBulletNum *= 2;
                }
                break;
            }
            case SkillType.疾走: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.speedRate *= 1.1;
                }
                break;
            }
            case SkillType.跑动射击: {
                var can_2 = true;
                this.schedule(function () {
                    if (can_2 && gameMgr_1.gameMgr.playerTs.isAtk) {
                        can_2 = false;
                        gameMgr_1.gameMgr.playerTs.speedRate *= 1.2;
                    }
                    else if (!can_2 && !gameMgr_1.gameMgr.playerTs.isAtk) {
                        can_2 = true;
                        gameMgr_1.gameMgr.playerTs.speedRate /= 1.2;
                    }
                }, 0.1);
                break;
            }
            case SkillType.意气风发: {
                // 每10秒增加10%的伤害和移动速度
                this.schedule(function () {
                    if (gameMgr_1.gameMgr.playerTs) {
                        var k = _this.skill_14 + 0.1;
                        if (k > 1.4)
                            k = 1.4;
                        else if (k < 1)
                            k = 1;
                        gameMgr_1.gameMgr.playerTs.atkRate *= (k / _this.skill_14);
                        gameMgr_1.gameMgr.playerTs.speedRate *= (k / _this.skill_14);
                        _this.skill_14 = k;
                    }
                }, 10);
                break;
            }
            case SkillType.护甲靴子: {
                break;
            }
            case SkillType.磁场: {
                this.jingyanRange += 200;
                break;
            }
            case SkillType.灵能补给: {
                this.jingyanRange += 50;
                break;
            }
            case SkillType.容光焕发: {
                this.jingyanRange += 50;
                break;
            }
            case SkillType.鹰眼: {
                this.jingyanRange += 50;
                cc.tween(gameMgr_1.gameMgr.mainCamera).to(1, { zoomRatio: 0.6 }).start();
                break;
            }
            case SkillType.生命力: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.totleHp += 1;
                    gameMgr_1.gameMgr.playerTs.HP = gameMgr_1.gameMgr.playerTs.totleHp;
                    this.scheduleOnce(function () { gameMgr_1.gameMgr.playerTs.recoverEffect(); }, 1);
                }
                break;
            }
            case SkillType.再生: {
                this.schedule(function () { _this._updateZaisheng(); }, 1);
                break;
            }
            case SkillType.进化: {
                if (gameMgr_1.gameMgr.playerTs) {
                    gameMgr_1.gameMgr.playerTs.atkRate *= 1.1;
                    gameMgr_1.gameMgr.playerTs.totleHp += 1;
                    gameMgr_1.gameMgr.playerTs.HP += 1;
                    this.scheduleOnce(function () { gameMgr_1.gameMgr.playerTs.recoverEffect(); }, 1);
                }
                break;
            }
            case SkillType.萃取: {
                break;
            }
            case SkillType.火焰精通: {
                break;
            }
            case SkillType.冰霜精通: {
                break;
            }
            case SkillType.双重附魔: {
                break;
            }
            case SkillType.通灵匕首: {
                var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_bishou", cc.Prefab);
                if (pre && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs) {
                    this._bishou = cc.instantiate(pre);
                    this._bishou.setParent(this.node);
                    this._bishou.zIndex = cc.macro.MAX_ZINDEX;
                    this._bishou.active = false;
                    this.updateBishou();
                }
                break;
            }
            case SkillType.神圣守护: {
                var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_hudun", cc.Prefab);
                if (pre && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs) {
                    this.hudun = cc.instantiate(pre);
                    this.hudun.setParent(gameMgr_1.gameMgr.playerTs.node);
                    this.hudun.setPosition(0, 0);
                    this.hudun.zIndex = cc.macro.MAX_ZINDEX - 1;
                    break;
                }
            }
            case SkillType.飞轮: {
                var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_feilun", cc.Prefab);
                if (pre) {
                    if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs) {
                        this._feilun && this._feilun.isValid && this._feilun.destroy();
                        this._feilun = cc.instantiate(pre);
                        this._feilun.setParent(gameMgr_1.gameMgr.playerTs.node);
                        this._feilun.setPosition(cc.Vec2.ZERO);
                        this._feilun.active = true;
                        this._feilun.zIndex = cc.macro.MAX_ZINDEX;
                        this.updateFeilun(this.upgradeSkillArr[SkillType.飞轮]);
                    }
                }
                break;
            }
            case SkillType.闪电: {
                if (this.upgradeSkillArr[SkillType.闪电] == 1) {
                    this.schedule(this.updateShandian, 1);
                }
                break;
            }
            case SkillType.燃烧瓶: {
                if (this.upgradeSkillArr[SkillType.燃烧瓶] == 1) {
                    this.schedule(this.updateFire, 1);
                }
                break;
            }
        }
    };
    /** 消息 */
    UpgradeMgr.prototype._onGameMessageHandler = function (event) {
        var _this = this;
        switch (event.type) {
            case Constant_1.default.E_Jingyan_Finish: {
                if (this.isHaveSkill(SkillType.灵能补给)) {
                    if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && Math.random() < 0.01) {
                        gameMgr_1.gameMgr.playerTs.curWeapon.curBullet += 1;
                    }
                }
                else if (this.isHaveSkill(SkillType.容光焕发)) {
                    if (this.skill_18 < 3) {
                        if (this.skill_18 == 0) {
                            this.accelerate();
                        }
                        this.skill_18++;
                    }
                }
                break;
            }
            case Constant_1.default.E_Zombie_Hart: {
                if (event.node && event.node.isValid) {
                    if (this.isHaveSkill(SkillType.瞬斩) && this.canAddMagic(event.node, SkillType.瞬斩)) {
                        this.skill_effect_3(event.node);
                    }
                    else {
                        var skillArr = [];
                        if (this.isHaveSkill(SkillType.火焰精通) && this.canAddMagic(event.node, SkillType.火焰精通)) {
                            skillArr.push(SkillType.火焰精通);
                        }
                        /* if (this.isHaveSkill(SkillType.雷电精通) && this.canAddMagic(event.node, SkillType.雷电精通)) {
                            skillArr.push(SkillType.雷电精通);
                        } */
                        if (this.isHaveSkill(SkillType.冰霜精通) && this.canAddMagic(event.node, SkillType.冰霜精通)) {
                            skillArr.push(SkillType.冰霜精通);
                        }
                        // 随机技能
                        if (skillArr.length) {
                            var skillIndex = Math.floor(Math.random() * skillArr.length);
                            var skillId = skillArr[skillIndex];
                            switch (skillId) {
                                case SkillType.火焰精通: {
                                    this.skill_effect_24(event.node);
                                    break;
                                }
                                /* case SkillType.雷电精通: {
                                    this.skill_effect_25(event.node);
                                    break;
                                } */
                                case SkillType.冰霜精通: {
                                    this.skill_effect_26(event.node);
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            }
            case Constant_1.default.E_Zombie_Death: {
                if (event.node) {
                    if (this.isHaveSkill(SkillType.子弹碎片) && event.from) {
                        var angle = 30 * Math.random();
                        this.createBullet(event.node, 30 + angle, 40);
                        this.createBullet(event.node, 150 + angle, 40);
                        this.createBullet(event.node, 270 + angle, 40);
                    }
                    else if (this.isHaveSkill(SkillType.萃取)) {
                        if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.HP < gameMgr_1.gameMgr.playerTs.totleHp && Math.random() < 0.05) {
                            gameMgr_1.gameMgr.playerTs.HP += 1;
                            gameMgr_1.gameMgr.playerTs.recoverEffect();
                        }
                    }
                    // 统计击杀
                    var ts = event.node.getComponent(ZombieBase_1.default);
                    if (ts) {
                        this.zombieKillNum++;
                        if (ts.isBoss) {
                            this.bossKillId.push(ts.zombieId);
                            if (gameMgr_1.gameMgr.bossArr.length == 0) {
                                gameMgr_1.gameMgr.win();
                            }
                        }
                    }
                }
                break;
            }
            case Constant_1.default.E_Bullet_Last: {
                if (this.isHaveSkill(SkillType.谢幕)) {
                    if (gameMgr_1.gameMgr.playerTs) {
                        this.createBullet(event.node, 36 * 1, 40);
                        this.createBullet(event.node, 36 * 3, 40);
                        this.createBullet(event.node, 36 * 5, 40);
                        this.createBullet(event.node, 36 * 7, 40);
                        this.createBullet(event.node, 36 * 9, 40);
                        this.scheduleOnce(function () {
                            _this.createBullet(event.node, 36 * 2, 40);
                            _this.createBullet(event.node, 36 * 4, 40);
                            _this.createBullet(event.node, 36 * 6, 40);
                            _this.createBullet(event.node, 36 * 8, 40);
                            _this.createBullet(event.node, 36 * 10, 40);
                        }, 0);
                    }
                }
                break;
            }
            case Constant_1.default.E_Bullet_Reload: {
                if (this.isHaveSkill(SkillType.窃魂弹夹)) {
                    if (gameMgr_1.gameMgr.playerTs) {
                        gameMgr_1.gameMgr.playerTs.atkRate *= 1.3;
                        this.scheduleOnce(function () {
                            gameMgr_1.gameMgr.playerTs.atkRate /= 1.3;
                        }, 1);
                    }
                }
                break;
            }
            case Constant_1.default.E_Player_Hart: {
                if (this.isHaveSkill(SkillType.意气风发)) {
                    this.skill_14 = 1;
                }
                break;
            }
            case Constant_1.default.E_Player_Death: {
                if (this.hudun) {
                    this.hudun.opacity = 0;
                }
                break;
            }
        }
    };
    /** 经验 */
    UpgradeMgr.prototype.createJingyan = function (pos) {
        if (this.jingyanPre && this.jingyanLayer) {
            var jingyan = gameMgr_1.gameMgr.nodeGet("jingyan", this.jingyanPre);
            var ts = jingyan.getComponent(jingyan_1.default);
            if (ts) {
                ts.init();
            }
            jingyan.setPosition(pos);
            jingyan.setParent(this.jingyanLayer);
        }
    };
    /** 升级效果 */
    UpgradeMgr.prototype.upgradeEffect = function () {
        if (gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.isValid) {
            var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_sjgx", cc.Prefab);
            if (pre) {
                var node = cc.instantiate(pre);
                node.setPosition(cc.Vec2.ZERO);
                node.setParent(gameMgr_1.gameMgr.playerTs.node);
                // node.zIndex = -1;
                // 升级音效
                gameMgr_1.gameMgr.playEffect("LevelUp");
            }
        }
    };
    /** 子弹 */
    UpgradeMgr.prototype.createBullet = function (node, angle, atkNum) {
        if (this.bulletPrefab) {
            var dir = cc.v2(1, 0).rotateSelf(cc.misc.degreesToRadians(angle));
            var bullet_2 = cc.instantiate(this.bulletPrefab);
            bullet_2.parent = this.node;
            bullet_2.setPosition(node.getPosition());
            bullet_2.angle = angle;
            var pos1 = bullet_2.getPosition();
            var pos2 = pos1.add(dir.mul(1000));
            cc.tween(bullet_2)
                .to(pos2.sub(pos1).mag() / 2500, { position: cc.v3(pos2) })
                .call(function () {
                var ts = bullet_2.getComponent(bullet_1.default);
                if (ts.boomEffect) {
                    var boom = cc.instantiate(ts.boomEffect);
                    boom.parent = ts.node.parent;
                    boom.setPosition(ts.node.getPosition());
                    boom.zIndex = Constant_1.ZindexLayer.zindex_bomb;
                    var curBullet = boom.getComponent(bullet_1.default);
                    curBullet.atk = ts.atk;
                    curBullet.atker = ts.atker;
                    curBullet.id = ts.id;
                    gameMgr_1.gameMgr.playEffect("explo", boom);
                    if (ts.hitEffect) {
                        var pos = bullet_2.getPosition();
                        var node_1 = cc.instantiate(ts.hitEffect);
                        node_1.parent = bullet_2.parent;
                        node_1.setPosition(pos);
                        node_1.zIndex = Constant_1.ZindexLayer.zindex_effect_hit;
                    }
                }
                bullet_2.destroy();
            })
                .start();
            var ts = bullet_2.getComponent(bullet_1.default);
            ts.id = 1;
            ts.atker = null;
            ts.atk = atkNum;
            ts.dir = dir;
        }
    };
    /** 获得经验加速1秒（可累计） */
    UpgradeMgr.prototype.accelerate = function () {
        var _this = this;
        if (this.skill_18 == 0) {
            if (this._canAccelerate) {
                this._canAccelerate = false;
                // 开始加速
                if (gameMgr_1.gameMgr.playerTs)
                    gameMgr_1.gameMgr.playerTs.speedRate *= 1.5;
            }
            else {
                this._canAccelerate = true;
                // 结束加速
                if (gameMgr_1.gameMgr.playerTs)
                    gameMgr_1.gameMgr.playerTs.speedRate /= 1.5;
                return;
            }
        }
        this.scheduleOnce(function () {
            _this.skill_18--;
            _this.accelerate();
        }, 1);
    };
    /** 魔法伤害倍率 */
    UpgradeMgr.prototype.magic_hart_rate = function () {
        if (this.isHaveSkill(SkillType.双重附魔) && this.skill_magic > 1) {
            return 1.5;
        }
        else {
            return 1;
        }
    };
    /** 能否添加魔法（审判，火焰，雷电，冰冻） */
    UpgradeMgr.prototype.canAddMagic = function (enemy, id) {
        if (enemy && enemy.isValid) {
            var zombieTs = enemy.getComponent(ZombieBase_1.default);
            if (zombieTs) {
                // 血量小于0
                if (zombieTs.HP <= 0) {
                    return false;
                }
                // 已存在瞬斩
                for (var i = 0; i < enemy.childrenCount; i++) {
                    if (enemy.children[i].name == "zombieSkill_" + SkillType.瞬斩) {
                        return false;
                    }
                }
                if (id >= 0) {
                    if (id == SkillType.瞬斩) {
                        // 是否达到试用条件
                        if (zombieTs.isBoss || (zombieTs.totleHp > 0 && zombieTs.HP / zombieTs.totleHp > 0.4)) {
                            return false;
                        }
                    }
                    else {
                        // 已存在火焰和冰霜
                        for (var i = 0; i < enemy.childrenCount; i++) {
                            if (enemy.children[i].name.includes("zombieSkill"))
                                return false;
                        }
                        if (zombieTs.isBoss) {
                            if (id == SkillType.火焰精通) {
                                return Math.random() < 0.2 ? true : false;
                            }
                            else if (id == SkillType.冰霜精通) {
                                return Math.random() < 0.2 ? true : false;
                            }
                        }
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        return true;
    };
    /** 瞬斩 */
    UpgradeMgr.prototype.skill_effect_3 = function (enemy) {
        if (enemy && enemy.isValid) {
            var zombieTs_1 = enemy.getComponent(ZombieBase_1.default);
            if (zombieTs_1) {
                // 技能效果
                var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_3", cc.Prefab);
                if (pre) {
                    var node_2 = cc.instantiate(pre);
                    node_2.setPosition(0, 0);
                    node_2.setParent(enemy);
                    // 销毁
                    zombieTs_1.moveDir = cc.Vec2.ZERO;
                    zombieTs_1.canMoveDir = false;
                    zombieTs_1.updateMove();
                    cc.tween(zombieTs_1)
                        .delay(0.5)
                        .call(function () {
                        if (zombieTs_1 && zombieTs_1.isValid) {
                            zombieTs_1.hart(zombieTs_1.HP, null, null, false, false, cc.Color.RED);
                        }
                    })
                        .delay(0.5)
                        .call(function () {
                        if (node_2 && node_2.isValid) {
                            node_2.destroy();
                        }
                    })
                        .start();
                }
            }
        }
    };
    /** 火焰精通 */
    UpgradeMgr.prototype.skill_effect_24 = function (enemy) {
        var _this = this;
        if (enemy && enemy.isValid) {
            var zombieTs_2 = enemy.getComponent(ZombieBase_1.default);
            if (zombieTs_2) {
                var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_24", cc.Prefab);
                if (pre) {
                    // 添加火焰动画
                    var node_3 = cc.instantiate(pre);
                    node_3.setPosition(0, 0 /* -enemy.height / 2 * enemy.scaleY */);
                    node_3.setParent(enemy);
                    node_3.zIndex = cc.macro.MAX_ZINDEX;
                    zombieTs_2.fire_start();
                    // 伤害
                    cc.tween(node_3)
                        .delay(0.2)
                        .call(function () {
                        if (zombieTs_2.isValid && zombieTs_2.HP > 0) {
                            zombieTs_2.hart(5 * _this.magic_hart_rate(), null, null, false, false, cc.Color.RED);
                        }
                        else {
                            node_3.destroy();
                        }
                    })
                        .union()
                        .repeat(20)
                        .call(function () {
                        zombieTs_2.fire_end();
                        node_3.destroy();
                    })
                        .start();
                    gameMgr_1.gameMgr.playEffect("ranshao", enemy, 1);
                }
            }
        }
    };
    /** 冰霜精通 */
    UpgradeMgr.prototype.skill_effect_26 = function (enemy) {
        if (enemy && enemy.isValid) {
            var zombieTs_3 = enemy.getComponent(ZombieBase_1.default);
            if (zombieTs_3 /* && !zombieTs.isBoss() */) {
                var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_26", cc.Prefab);
                if (pre) {
                    var node_frozen_1 = cc.instantiate(pre);
                    node_frozen_1.setPosition(0, 0);
                    node_frozen_1.setParent(enemy);
                    node_frozen_1.zIndex = cc.macro.MAX_ZINDEX;
                    if (zombieTs_3.zombieId >= 8) {
                        node_frozen_1.scale = 4;
                    }
                    else {
                        node_frozen_1.scale = 2;
                    }
                    // 冰冻
                    if (zombieTs_3.isValid) {
                        zombieTs_3.frozenStart();
                        var t = zombieTs_3.isBoss ? 0.5 : 2;
                        this.scheduleOnce(function () {
                            if (zombieTs_3 && zombieTs_3.isValid) {
                                zombieTs_3.frozenEnd();
                            }
                            // 销毁
                            if (node_frozen_1 && node_frozen_1.isValid) {
                                node_frozen_1.destroy();
                            }
                        }, t);
                    }
                    // 音效
                    gameMgr_1.gameMgr.playEffect("bingdong", enemy, 1);
                }
            }
        }
    };
    /** 通灵匕首 */
    UpgradeMgr.prototype.updateBishou = function () {
        var _this = this;
        if (this._bishou && this._bishou.isValid && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs) {
            if (gameMgr_1.gameMgr.playerTs.atkTarget && gameMgr_1.gameMgr.playerTs.atkTarget.isValid) {
                // 匕首属性
                var bulletTs = this._bishou.getComponent(bullet_1.default);
                bulletTs.isHartMusic = false;
                bulletTs.hitAudio = "hurt";
                bulletTs.atk = 50 * gameMgr_1.gameMgr.playerTs.atkRate;
                bulletTs.atkedArr = [];
                // 当前
                var from = gameMgr_1.gameMgr.playerTs.node.getPosition();
                // 目标
                var div = gameMgr_1.gameMgr.playerTs.atkTarget.getPosition().subSelf(from);
                var dis = div.mag();
                if (dis < 400) {
                    div.normalizeSelf().mulSelf(400);
                }
                var p2 = from.add(cc.v2(1, 0).mulSelf(400).rotateSelf(this._bishou.angle / 180 * Math.PI));
                var to = from.add(div);
                var t = div.mag() / 800;
                if (false == this._bishou.active) {
                    this._bishou.active = true;
                    this._bishou.setPosition(from);
                }
                cc.tween(this._bishou)
                    .bezierTo(t, from, p2, to)
                    .call(function () { _this.updateBishou(); })
                    .start();
            }
            else {
                this._bishou.active = false;
                this.scheduleOnce(function () { _this.updateBishou(); }, 1);
            }
        }
    };
    /** 神圣护盾 */
    UpgradeMgr.prototype.updateHudun = function () {
        var _this = this;
        if (this.hudun && this.hudun.active) {
            this.hudun.active = false;
            // 破裂音效
            gameMgr_1.gameMgr.playEffect("ShieldDestroy");
            // cd
            this.setSkillCD(SkillType.神圣守护, 60);
            this.scheduleOnce(function () {
                if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.isValid) {
                    _this.hudun.active = true;
                    if (gameMgr_1.gameMgr.playerTs.HP) {
                        _this.hudun.opacity = 255;
                    }
                    else {
                        _this.hudun.opacity = 0;
                    }
                }
            }, 60);
        }
    };
    /** 再生 */
    UpgradeMgr.prototype._updateZaisheng = function () {
        if (this._zaishengCdTime > 0) {
            this._zaishengCdTime--;
            return;
        }
        if (CocosZ_1.cocosz.isPause)
            return;
        if (gameMgr_1.gameMgr.playerTs && !gameMgr_1.gameMgr.playerTs.isDeath && gameMgr_1.gameMgr.playerTs.HP < gameMgr_1.gameMgr.playerTs.totleHp) {
            gameMgr_1.gameMgr.playerTs.HP += 1;
            gameMgr_1.gameMgr.playerTs.recoverEffect();
            this._zaishengCdTime = 90;
            this.setSkillCD(SkillType.再生, this._zaishengCdTime);
        }
    };
    /** 飞轮 */
    UpgradeMgr.prototype.updateFeilun = function (level) {
        // 根据等级设置飞轮数量
        if (this._feilun && this._feilun.isValid && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs) {
            cc.tween(this._feilun).by(10, { angle: -360 * 5 }).repeatForever().start();
            // 飞轮
            var level2NumArr = [1, 2, 3, 4];
            var num = level2NumArr[level];
            var _loop_1 = function (i) {
                var icon = this_1._feilun.children[i];
                if (icon) {
                    if (i < num) {
                        icon.active = true;
                        if (level == 3) {
                            var sprFrame = this_1._feilun.getChildByName("back").getComponent(cc.Sprite).spriteFrame;
                            icon.getComponent(cc.Sprite).spriteFrame = sprFrame;
                        }
                        icon.setPosition(this_1._posArr[level][i][0], this_1._posArr[level][i][1]);
                        cc.tween(icon)
                            .call(function () {
                            gameMgr_1.gameMgr.playEffect("chilunStart");
                            icon.getComponent(cc.Collider).enabled = true;
                        })
                            .to(1, { scale: 2.5 })
                            .delay(8)
                            .to(1, { scale: 0 })
                            .call(function () { icon.getComponent(cc.Collider).enabled = false; })
                            .delay(2)
                            .union()
                            .repeatForever()
                            .start();
                        var bulletTs = icon.getComponent(bullet_1.default);
                        if (bulletTs) {
                            bulletTs.isHartMusic = false;
                            bulletTs.hitAudio = "chilun";
                            bulletTs.atk = 80 + 20 * level * gameMgr_1.gameMgr.playerTs.atkRate;
                        }
                    }
                    else {
                        icon.active = false;
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < 4; i++) {
                _loop_1(i);
            }
        }
    };
    /** 闪电 */
    UpgradeMgr.prototype.updateShandian = function () {
        if (this._shandiCdTime > 0) {
            this._shandiCdTime--;
            return;
        }
        if (CocosZ_1.cocosz.isPause)
            return;
        var level = this.upgradeSkillArr[SkillType.闪电];
        if (this._shandianCount == 0) {
            this._shandianCount = this._shandianNum[level];
        }
        // 能够添加闪电的敌人
        var enemyArr = [];
        var _loop_2 = function (i) {
            var can = true;
            var node = gameMgr_1.gameMgr.playerTs.atkList[i];
            node.children.forEach(function (n) {
                if (n.name == "zombieSkill_shandian") {
                    can = false;
                }
            });
            if (can) {
                enemyArr.push(node);
            }
        };
        for (var i = gameMgr_1.gameMgr.playerTs.atkList.length - 1; i >= 0; i--) {
            _loop_2(i);
        }
        if (enemyArr.length) {
            var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_shandian", cc.Prefab);
            if (pre) {
                var enemy = enemyArr.shift();
                if (enemy && enemy.isValid) {
                    this._shandianCount--;
                    // 添加雷电动画
                    var node_4 = cc.instantiate(pre);
                    node_4.setPosition(0, -enemy.height / 2 * enemy.scaleY);
                    node_4.setParent(enemy);
                    node_4.zIndex = cc.macro.MAX_ZINDEX;
                    // 动画皮肤
                    if (level == 3) {
                        var spAni = node_4.getComponent(sp.Skeleton);
                        if (spAni) {
                            spAni.setSkin("y");
                        }
                    }
                    // 销毁
                    this.schedule(function () { if (node_4 && node_4.isValid) {
                        node_4.destroy();
                    } }, 1);
                    // 伤害
                    var zombieTs = enemy.getComponent(ZombieBase_1.default);
                    if (zombieTs) {
                        if (zombieTs.isValid && zombieTs.HP > 0) {
                            zombieTs.hart(200 * this.magic_hart_rate(), null, null, false, false, cc.Color.RED);
                        }
                    }
                    // 音效
                    gameMgr_1.gameMgr.playEffect("LuoLei", enemy);
                }
            }
            else {
                CocosZ_1.cocosz.resMgr.getRes("prefab_zombie_skill/zombieSkill_shandian", cc.Prefab);
            }
        }
        if (this._shandianCount == 0) {
            this._shandiCdTime = 3 + level;
            this.setSkillCD(SkillType.闪电, this._shandiCdTime);
        }
    };
    /** 燃烧瓶 */
    UpgradeMgr.prototype.updateFire = function () {
        if (this._fireCdTime > 0) {
            this._fireCdTime--;
            return;
        }
        if (CocosZ_1.cocosz.isPause)
            return;
        var level = this.upgradeSkillArr[SkillType.燃烧瓶];
        this._fireCount = this._fireNum[level];
        if (!CocosZ_1.cocosz.isPause && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.atkTarget && gameMgr_1.gameMgr.playerTs.atkTarget.isValid) {
            var pre = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_fire", cc.Prefab);
            if (pre) {
                var div = gameMgr_1.gameMgr.playerTs.atkTarget.getPosition().subSelf(gameMgr_1.gameMgr.playerTs.node.getPosition());
                div.normalizeSelf().mulSelf(400);
                var _loop_3 = function (i) {
                    var radian = ((this_2._fireCount - 1) / 2 - i) * (Math.PI / 2);
                    var from = gameMgr_1.gameMgr.playerTs.node.getPosition();
                    var to = from.add(cc.v2(div).rotateSelf(radian));
                    var p2 = cc.v2((from.x + to.x) / 2, from.y + 900);
                    var fire = cc.instantiate(pre);
                    fire.children[1].active = (level == 3 ? false : true);
                    fire.children[2].active = (level == 3 ? true : false);
                    fire.setPosition(from);
                    fire.setParent(gameMgr_1.gameMgr.map);
                    fire.zIndex = cc.macro.MAX_ZINDEX;
                    cc.tween(fire)
                        .parallel(cc.tween().bezierTo(1, from, p2, to), cc.tween().to(1, { angle: 720 * (div.x > 0 ? 1 : -1) }))
                        .call(function () {
                        fire.zIndex = Constant_1.ZindexLayer.zinedx_floorSkill;
                        fire.children[1].active = fire.children[2].active = false;
                        fire.children[0].active = true;
                        // 子弹碰撞体
                        fire.getComponent(cc.Collider).enabled = true;
                        // 子弹属性
                        var buttleTs = fire.getComponent(bullet_1.default);
                        buttleTs.isHartMusic = false;
                        buttleTs.atk = 11;
                        buttleTs.hartInterval = 0.2;
                        // 燃烧动画
                        var spAni = fire.children[0].getComponent(sp.Skeleton);
                        spAni.setSkin(level == 3 ? "l" : "h");
                        spAni.setAnimation(0, "k", false);
                        spAni.setAnimation(0, "ranshao", true);
                        // 燃烧瓶破碎音效
                        gameMgr_1.gameMgr.playEffect("Ranshaopingposui", fire);
                        gameMgr_1.gameMgr.playEffect("ranshao", fire);
                    })
                        .delay(3)
                        .to(0.3, { opacity: 50 })
                        .call(function () { fire.destroy(); })
                        .start();
                };
                var this_2 = this;
                for (var i = 0; i < this._fireCount; i++) {
                    _loop_3(i);
                }
            }
            this._fireCdTime = 4;
            this.setSkillCD(SkillType.燃烧瓶, 4);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], UpgradeMgr.prototype, "bulletPrefab", void 0);
    UpgradeMgr = __decorate([
        ccclass
    ], UpgradeMgr);
    return UpgradeMgr;
}(cc.Component));
exports.default = UpgradeMgr;

cc._RF.pop();