
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/UpgradeMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcVXBncmFkZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTZDO0FBQzdDLGtEQUF5RTtBQUN6RSxtQ0FBOEI7QUFDOUIscUNBQW9DO0FBQ3BDLHFDQUFnQztBQUNoQywyQ0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBWSxTQW9DWDtBQXBDRCxXQUFZLFNBQVM7SUFDakIsaUZBQVEsQ0FBQTtJQUNSLHlEQUFFLENBQUE7SUFDRix5REFBRSxDQUFBO0lBQ0YseURBQUUsQ0FBQTtJQUNGLGlGQUFJLENBQUE7SUFDSixpRkFBSSxDQUFBO0lBQ0osaUZBQUksQ0FBQTtJQUNKLGlGQUFJLENBQUE7SUFDSixpRkFBSSxDQUFBO0lBQ0oseURBQUUsQ0FBQTtJQUNGLDBEQUFFLENBQUE7SUFDRixrRkFBSSxDQUFBO0lBQ0osMERBQUUsQ0FBQTtJQUNGLGtGQUFJLENBQUE7SUFDSixrRkFBSSxDQUFBO0lBQ0osa0ZBQUksQ0FBQTtJQUNKLDBEQUFFLENBQUE7SUFDRixrRkFBSSxDQUFBO0lBQ0osa0ZBQUksQ0FBQTtJQUNKLDBEQUFFLENBQUE7SUFDRixzRUFBRyxDQUFBO0lBQ0gsMERBQUUsQ0FBQTtJQUNGLDBEQUFFLENBQUE7SUFDRiwwREFBRSxDQUFBO0lBQ0Ysa0ZBQUksQ0FBQTtJQUNKLGtGQUFJLENBQUE7SUFDSixrRkFBSSxDQUFBO0lBQ0osa0ZBQUksQ0FBQTtJQUNKLDBEQUFFLENBQUE7SUFDRixrRkFBSSxDQUFBO0lBQ0osa0ZBQUksQ0FBQTtJQUNKLGtGQUFJLENBQUE7SUFDSiwwREFBRSxDQUFBO0lBQ0YsMERBQUUsQ0FBQTtJQUNGLHNFQUFHLENBQUE7QUFDUCxDQUFDLEVBcENXLFNBQVMsR0FBVCxpQkFBUyxLQUFU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QUFFO29CQUNoQyxJQUFJLGlCQUFPLENBQUMsUUFBUSxFQUFFO3dCQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzFDLElBQUksQ0FBQyxZQUFZLENBQUM7NEJBQ2QsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzFDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUMxQyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDMUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzFDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUMvQyxDQUFDLEVBQUUs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O0lBRmQsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTYrQjlCO0lBQUQsaUJBQUM7Q0E3K0JELEFBNitCQyxDQTcrQnVDLEVBQUUsQ0FBQyxTQUFTLEdBNitCbkQ7a0JBNytCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBQYW5lbE5hbWUsIFppbmRleExheWVyIH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL2J1bGxldFwiO1xyXG5pbXBvcnQgeyBnYW1lTWdyIH0gZnJvbSBcIi4vZ2FtZU1nclwiO1xyXG5pbXBvcnQgSmluZ3lhbiBmcm9tIFwiLi9qaW5neWFuXCI7XHJcbmltcG9ydCBab21iaWVCYXNlIGZyb20gXCIuL1pvbWJpZUJhc2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBTa2lsbFR5cGUge1xyXG4gICAg5pW06KOF5b6F5Y+RID0gMCxcclxuICAgIOeehOWHhixcclxuICAgIOW8uuWMlixcclxuICAgIOeerOaWqSxcclxuICAgIOW8uuWKm+WwhOWHuyxcclxuICAgIOeqg+mtguW8ueWkuSxcclxuICAgIOenkeaKgOWtkOW8uSxcclxuICAgIOermeWnv+WwhOWHuyxcclxuICAgIOWtkOW8ueeijueJhyxcclxuICAgIOWPjOWPkSxcclxuICAgIOiwouW5lSxcclxuICAgIOaequael+W8uembqCxcclxuICAgIOeWvui1sCxcclxuICAgIOi3keWKqOWwhOWHuyxcclxuICAgIOaEj+awlOmjjuWPkSxcclxuICAgIOaKpOeUsumdtOWtkCxcclxuICAgIOejgeWcuixcclxuICAgIOeBteiDveihpee7mSxcclxuICAgIOWuueWFieeEleWPkSxcclxuICAgIOm5sOecvCxcclxuICAgIOeUn+WRveWKmyxcclxuICAgIOWGjeeUnyxcclxuICAgIOi/m+WMlixcclxuICAgIOiQg+WPlixcclxuICAgIOeBq+eEsOeyvumAmixcclxuICAgIOmbt+eUteeyvumAmixcclxuICAgIOWGsOmcnOeyvumAmixcclxuICAgIOWPjOmHjemZhOmtlCxcclxuICAgIOm+meWNtSxcclxuICAgIOmAmueBteWMlemmlixcclxuICAgIOmAmueBtemVsOWIgCxcclxuICAgIOelnuWco+WuiOaKpCxcclxuICAgIOmjnui9rixcclxuICAgIOmXqueUtSxcclxuICAgIOeHg+eDp+eTtixcclxufVxyXG5cclxuZXhwb3J0IGxldCB1cGdyYWRlTWdyOiBVcGdyYWRlTWdyID0gbnVsbDtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZ3JhZGVNZ3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICB6b21iaWVLaWxsTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgYm9zc0tpbGxJZDogbnVtYmVyW10gPSBbXTtcclxuICAgIC8vIOe7j+mqjOWxglxyXG4gICAgamluZ3lhbkxheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8vIOe7j+mqjOmihOWItuS9k1xyXG4gICAgamluZ3lhblByZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8vIOe7j+mqjOinpueisOi3neemu1xyXG4gICAgamluZ3lhblJhbmdlOiBudW1iZXIgPSAyMDA7XHJcbiAgICAvLyDljYfnuqfnu4/pqoxcclxuICAgIHByaXZhdGUgX2ppbmd5YW5BcnI6IG51bWJlcltdID0gWzUsIDEwLCAyMCwgMjUsIDMwLCA0MCwgNTAsIDYwLCA2MCwgNzAsIDgwLCA5MCwgMTAwLCAxMTAsIDEyMCwgMTMwLCAxNTAsIDE3MCwgMjAwLCAyMjAsIDI1MCwgMjgwLCAzMDAsIDM1MCwgNDAwLCA1MDAsIDEwMDBdOy8vIOe7j+mqjOaVsOe7hFxyXG4gICAgLy8gcHJpdmF0ZSBfamluZ3lhbkFycjogbnVtYmVyW10gPSBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV07Ly8g57uP6aqM5pWw57uEXHJcbiAgICAvLyDlt7Lmi6XmnInmioDog71cclxuICAgIHVwZ3JhZGVTa2lsbEFycjogbnVtYmVyW10gPSBbXHJcbiAgICAgICAgMCwgMCwgMCwgMCwgMCxcclxuICAgICAgICAwLCAwLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMCwgMCxcclxuICAgICAgICAwLCAwLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMCwgMFxyXG4gICAgXTtcclxuICAgIHVwZ3JhZGVTa2lsbE1heExldmVsQXJyOiBudW1iZXJbXSA9IFtcclxuICAgICAgICAxLCAxLCAxLCAxLCAxLFxyXG4gICAgICAgIDEsIDEsIDEsIDEsIDEsXHJcbiAgICAgICAgMSwgMSwgMSwgMSwgMSxcclxuICAgICAgICAxLCAxLCAxLCAxLCAxLFxyXG4gICAgICAgIDEsIDEsIDEsIDEsIDEsXHJcbiAgICAgICAgMSwgMSwgMSwgMSwgMSxcclxuICAgICAgICAxLCAxLCAzLCAzLCAzLFxyXG4gICAgXTtcclxuICAgIC8vIOaKgOiDveWxnuaAp1xyXG4gICAgc2tpbGxfMTQ6IG51bWJlciA9IDE7Ly/lop7lvLrlgI3njofvvIjkvKTlrrPlkoznp7vliqjpgJ/luqbvvIlcclxuICAgIHNraWxsXzE4OiBudW1iZXIgPSAwOy8v5Yqg6YCf5pe26Ze0XHJcbiAgICBza2lsbF9tYWdpYzogbnVtYmVyID0gMDsvL+mZhOmtlOaKgOiDveeahOaVsOmHj1xyXG5cclxuICAgIHByaXZhdGUgX21heExldmVsOiBudW1iZXIgPSAyNTsvLyDmnIDlpKfnrYnnuqdcclxuICAgIHByaXZhdGUgX2N1ckxldmVsOiBudW1iZXIgPSAwOy8vIOW9k+WJjeetiee6p1xyXG4gICAgcHVibGljIGdldCBjdXJMZXZlbCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VyTGV2ZWw7IH1cclxuICAgIHB1YmxpYyBzZXQgY3VyTGV2ZWwodjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHYgPCAwKSB2ID0gMDtcclxuICAgICAgICBlbHNlIGlmICh2ID4gdGhpcy5fbWF4TGV2ZWwpIHYgPSB0aGlzLl9tYXhMZXZlbDtcclxuICAgICAgICAvLyDljYfnuqdcclxuICAgICAgICBpZiAodiA+PSB0aGlzLl9jdXJMZXZlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJMZXZlbCA9IHY7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X2xldmVsTGFiZWwuc3RyaW5nID0gXCJcIiArIHRoaXMuX2N1ckxldmVsO1xyXG4gICAgICAgICAgICAvLyDljYfnuqfmlYjmnpxcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIC8vIOW8ueeql1xyXG4gICAgICAgICAgICBjb2Nvc3oucGF1c2VDb3VudCsrO1xyXG4gICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhbmVsKFBhbmVsTmFtZS5VSVVwZ3JhZGVQYW5lbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckppbmd5YW4gLT0gdGhpcy5fY3VyTWF4SmluZ3lhbjtcclxuICAgICAgICAgICAgdGhpcy5fY3VyTWF4SmluZ3lhbiA9IHRoaXMuX2ppbmd5YW5BcnJbdGhpcy5jdXJMZXZlbF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2N1ck1heEppbmd5YW46IG51bWJlciA9IHRoaXMuX2ppbmd5YW5BcnJbdGhpcy5jdXJMZXZlbF07XHJcbiAgICBwcml2YXRlIF9jdXJKaW5neWFuOiBudW1iZXIgPSAwOy8vIOW9k+WJjee7j+mqjFxyXG4gICAgcHVibGljIGdldCBjdXJKaW5neWFuKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jdXJKaW5neWFuOyB9XHJcbiAgICBwdWJsaWMgc2V0IGN1ckppbmd5YW4odjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHYgPCAwKSB2ID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJKaW5neWFuID0gdjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Yid5aeL5YyW55uR5ZCsICovXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdXBncmFkZU1nciA9IHRoaXM7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihDb25zdGFudC5FX0dBTUVfTE9HSUMsIHRoaXMuX29uR2FtZU1lc3NhZ2VIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICAgICAgLy8g57uP6aqM6aKE5Yi25L2TXHJcbiAgICAgICAgdGhpcy5qaW5neWFuUHJlID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJqaW5neWFuXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgLy8g5re75Yqg57uP6aqM5bGCXHJcbiAgICAgICAgdGhpcy5qaW5neWFuTGF5ZXIgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHRoaXMuamluZ3lhbkxheWVyLm5hbWUgPSBcImppbmd5YW5MYXllclwiO1xyXG4gICAgICAgIHRoaXMuamluZ3lhbkxheWVyLnpJbmRleCA9IFppbmRleExheWVyLnppbmVkeF9qaW5neWFuO1xyXG4gICAgICAgIHRoaXMuamluZ3lhbkxheWVyLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgdGhpcy5qaW5neWFuTGF5ZXIuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB1cGdyYWRlTWdyID0gbnVsbDtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5VcGdyYWRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChnYW1lTWdyICYmIGdhbWVNZ3IubW9kZWw2X2ppbmd5YW5CYXIpIHtcclxuICAgICAgICAgICAgbGV0IGZyb20gPSBnYW1lTWdyLm1vZGVsNl9qaW5neWFuQmFyLnByb2dyZXNzO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSB0aGlzLmN1ckppbmd5YW4gLyB0aGlzLl9jdXJNYXhKaW5neWFuO1xyXG4gICAgICAgICAgICBpZiAodG8gPT0gMCkgeyB0byA9IDAuMDAxIH1cclxuICAgICAgICAgICAgZ2FtZU1nci5tb2RlbDZfamluZ3lhbkJhci5wcm9ncmVzcyA9IGNjLm1pc2MubGVycChmcm9tLCB0bywgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uP6aqM5YC85ruh6LazLOS4lOWPr+S7peWNh+e6p1xyXG4gICAgICAgIGlmICh0aGlzLmNhblVwZ3JhZGUgJiYgIWNvY29zei5pc1BhdXNlICYmIHRoaXMuY3VyTGV2ZWwgPCB0aGlzLl9tYXhMZXZlbCAmJiB0aGlzLl9jdXJKaW5neWFuID49IHRoaXMuX2N1ck1heEppbmd5YW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJMZXZlbCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5piv5ZCm5oul5pyJ5oqA6IO9ICovXHJcbiAgICBpc0hhdmVTa2lsbChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZ3JhZGVTa2lsbEFycltpZF0gPiAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsSW1nQXJyOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIC8qKiDorr7nva7mioDog71VSSAqL1xyXG4gICAgc2V0U2tpbGxJbWcoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHIgPSBcInpvbWJpZVNraWxsX2ljb25fXCIgKyBpZCArICh0aGlzLnVwZ3JhZGVTa2lsbE1heExldmVsQXJyW2lkXSA+IDEgPyAoXCJfXCIgKyB0aGlzLnVwZ3JhZGVTa2lsbEFycltpZF0pIDogXCJcIik7XHJcbiAgICAgICAgbGV0IGljb24gPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhzdHIsIGNjLlNwcml0ZUZyYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKGljb24gJiYgZ2FtZU1nci5tb2RlbDZfc2tpbGxTY3JvbGxWaWV3X2NvbnRlbnQgJiYgZ2FtZU1nci5tb2RlbDZfc2tpbGxTY3JvbGxWaWV3X2NvbnRlbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2tpbGxJbWdBcnJbaWRdICYmIGdhbWVNZ3IubW9kZWw2X3NraWxsU2Nyb2xsVmlld19pdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsSW1nQXJyW2lkXSA9IGNjLmluc3RhbnRpYXRlKGdhbWVNZ3IubW9kZWw2X3NraWxsU2Nyb2xsVmlld19pdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxJbWdBcnJbaWRdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsSW1nQXJyW2lkXS5zZXRQYXJlbnQoZ2FtZU1nci5tb2RlbDZfc2tpbGxTY3JvbGxWaWV3X2NvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8g5ruR5Yqo5Yiw5pyA5Y+z6L65XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5tb2RlbDZfc2tpbGxTY3JvbGxWaWV3X2NvbnRlbnQud2lkdGggPiBnYW1lTWdyLm1vZGVsNl9za2lsbFNjcm9sbFZpZXcubm9kZS53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X3NraWxsU2Nyb2xsVmlldy5zY3JvbGxUb1JpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpbGxJbWdBcnJbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ByaXRlID0gdGhpcy5za2lsbEltZ0FycltpZF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ByaXRlKSBzcHJpdGUuc3ByaXRlRnJhbWUgPSBpY29uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDorr7nva7mioDog71jZCAqL1xyXG4gICAgc2V0U2tpbGxDRChpZDogbnVtYmVyLCB0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5za2lsbEltZ0FycltpZF0pIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsQ0QgPSB0aGlzLnNraWxsSW1nQXJyW2lkXS5nZXRDaGlsZEJ5TmFtZShcInNraWxsQ0RcIik7XHJcbiAgICAgICAgICAgIGlmIChza2lsbENEKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbENELmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBza2lsbENELm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihza2lsbENELmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoeyBmaWxsUmFuZ2U6IDEgfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8odGltZSwgeyBmaWxsUmFuZ2U6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHNraWxsQ0Qub3BhY2l0eSA9IDA7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gdGltZTtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lTGFiZWwgPSBza2lsbENELmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihza2lsbENEKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGltZUxhYmVsLnN0cmluZyA9IG51bS50b1N0cmluZygpOyBudW0tLTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMSlcclxuICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBlYXQodGltZSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635b6X5oqA6IO9ICovXHJcbiAgICBnZXRTa2lsbChpZCkge1xyXG4gICAgICAgIHRoaXMudXBncmFkZVNraWxsQXJyW2lkXSsrO1xyXG4gICAgICAgIHRoaXMuc2V0U2tpbGxJbWcoaWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuaVtOijheW+heWPkToge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IucGxheWVyVHMgJiYgZ2FtZU1nci5wbGF5ZXJUcy5jdXJXZWFwb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmN1cldlYXBvbi5idWxsZXROdW0gKz0gNDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLueehOWHhjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmF0a1JhdGUgKj0gMS4yNTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuW8uuWMljoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IucGxheWVyVHMgJiYgZ2FtZU1nci5wbGF5ZXJUcy5jdXJXZWFwb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmN1cldlYXBvbi5idWxsZXROdW0gKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmF0a1JhdGUgKj0gMS4xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu556s5papOiB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7lvLrlipvlsITlh7s6IHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLnBsYXllclRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5hdGtSYXRlICo9IDEuMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLueqg+mtguW8ueWkuToge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu56eR5oqA5a2Q5by5OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuYXRrU3BlZWRSYXRlIC09IDAuMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuermeWnv+WwhOWHuzoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuICYmIGdhbWVNZ3IucGxheWVyVHMubW92ZURpci5tYWcoKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmF0a1JhdGUgKj0gMS4zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNhbiAmJiBnYW1lTWdyLnBsYXllclRzLm1vdmVEaXIubWFnKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuYXRrUmF0ZSAvPSAxLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMC4xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuWtkOW8ueeijueJhzoge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu5Y+M5Y+ROiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuYXRrQnVsbGV0TnVtICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7osKLluZU6IHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuaequael+W8uembqDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmF0a0J1bGxldE51bSAqPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu55a+6LWwOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuc3BlZWRSYXRlICo9IDEuMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLui3keWKqOWwhOWHuzoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuICYmIGdhbWVNZ3IucGxheWVyVHMuaXNBdGspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuc3BlZWRSYXRlICo9IDEuMjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFjYW4gJiYgIWdhbWVNZ3IucGxheWVyVHMuaXNBdGspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5zcGVlZFJhdGUgLz0gMS4yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDAuMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7mhI/msJTpo47lj5E6IHtcclxuICAgICAgICAgICAgICAgIC8vIOavjzEw56eS5aKe5YqgMTAl55qE5Lyk5a6z5ZKM56e75Yqo6YCf5bqmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgayA9IHRoaXMuc2tpbGxfMTQgKyAwLjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrID4gMS40KSBrID0gMS40O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrIDwgMSkgayA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuYXRrUmF0ZSAqPSAoayAvIHRoaXMuc2tpbGxfMTQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLnNwZWVkUmF0ZSAqPSAoayAvIHRoaXMuc2tpbGxfMTQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsXzE0ID0gaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7miqTnlLLpnbTlrZA6IHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuejgeWcujoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qaW5neWFuUmFuZ2UgKz0gMjAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu54G16IO96KGl57uZOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmppbmd5YW5SYW5nZSArPSA1MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuWuueWFieeEleWPkToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qaW5neWFuUmFuZ2UgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7pubDnnLw6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuamluZ3lhblJhbmdlICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oZ2FtZU1nci5tYWluQ2FtZXJhKS50bygxLCB7IHpvb21SYXRpbzogMC42IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7nlJ/lkb3lips6IHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLnBsYXllclRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy50b3RsZUhwICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5IUCA9IGdhbWVNZ3IucGxheWVyVHMudG90bGVIcDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IGdhbWVNZ3IucGxheWVyVHMucmVjb3ZlckVmZmVjdCgpOyB9LCAxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu5YaN55SfOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHsgdGhpcy5fdXBkYXRlWmFpc2hlbmcoKTsgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7ov5vljJY6IHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLnBsYXllclRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5hdGtSYXRlICo9IDEuMTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLnRvdGxlSHAgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLkhQICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyBnYW1lTWdyLnBsYXllclRzLnJlY292ZXJFZmZlY3QoKTsgfSwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuiQg+WPljoge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu54Gr54Sw57K+6YCaOiB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7lhrDpnJznsr7pgJo6IHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuWPjOmHjemZhOmtlDoge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu6YCa54G15YyV6aaWOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJlOiBjYy5QcmVmYWIgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcInpvbWJpZVNraWxsX2Jpc2hvdVwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZSAmJiBnYW1lTWdyICYmIGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaXNob3UgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jpc2hvdS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaXNob3UuekluZGV4ID0gY2MubWFjcm8uTUFYX1pJTkRFWDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iaXNob3UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCaXNob3UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuelnuWco+WuiOaKpDoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF9odWR1blwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZSAmJiBnYW1lTWdyICYmIGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZHVuID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZHVuLnNldFBhcmVudChnYW1lTWdyLnBsYXllclRzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHVkdW4uc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWR1bi56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS7po57ova46IHtcclxuICAgICAgICAgICAgICAgIGxldCBwcmU6IGNjLlByZWZhYiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwiem9tYmllU2tpbGxfZmVpbHVuXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IgJiYgZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mZWlsdW4gJiYgdGhpcy5fZmVpbHVuLmlzVmFsaWQgJiYgdGhpcy5fZmVpbHVuLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmVpbHVuID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmVpbHVuLnNldFBhcmVudChnYW1lTWdyLnBsYXllclRzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mZWlsdW4uc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmVpbHVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZlaWx1bi56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZlaWx1bih0aGlzLnVwZ3JhZGVTa2lsbEFycltTa2lsbFR5cGUu6aOe6L2uXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUu6Zeq55S1OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51cGdyYWRlU2tpbGxBcnJbU2tpbGxUeXBlLumXqueUtV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVTaGFuZGlhbiwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLueHg+eDp+eTtjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBncmFkZVNraWxsQXJyW1NraWxsVHlwZS7nh4Png6fnk7ZdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMudXBkYXRlRmlyZSwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmtojmga8gKi9cclxuICAgIHByaXZhdGUgX29uR2FtZU1lc3NhZ2VIYW5kbGVyKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX0ppbmd5YW5fRmluaXNoOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu54G16IO96KGl57uZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyICYmIGdhbWVNZ3IucGxheWVyVHMgJiYgTWF0aC5yYW5kb20oKSA8IDAuMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5jdXJXZWFwb24uY3VyQnVsbGV0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu5a655YWJ54SV5Y+RKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNraWxsXzE4IDwgMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5za2lsbF8xOCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY2VsZXJhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsXzE4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX1pvbWJpZV9IYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQubm9kZSAmJiBldmVudC5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu556s5papKSAmJiB0aGlzLmNhbkFkZE1hZ2ljKGV2ZW50Lm5vZGUsIFNraWxsVHlwZS7nnqzmlqkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfZWZmZWN0XzMoZXZlbnQubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsQXJyOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu54Gr54Sw57K+6YCaKSAmJiB0aGlzLmNhbkFkZE1hZ2ljKGV2ZW50Lm5vZGUsIFNraWxsVHlwZS7ngavnhLDnsr7pgJopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbEFyci5wdXNoKFNraWxsVHlwZS7ngavnhLDnsr7pgJopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGlmICh0aGlzLmlzSGF2ZVNraWxsKFNraWxsVHlwZS7pm7fnlLXnsr7pgJopICYmIHRoaXMuY2FuQWRkTWFnaWMoZXZlbnQubm9kZSwgU2tpbGxUeXBlLumbt+eUteeyvumAmikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsQXJyLnB1c2goU2tpbGxUeXBlLumbt+eUteeyvumAmik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNIYXZlU2tpbGwoU2tpbGxUeXBlLuWGsOmcnOeyvumAmikgJiYgdGhpcy5jYW5BZGRNYWdpYyhldmVudC5ub2RlLCBTa2lsbFR5cGUu5Yaw6Zyc57K+6YCaKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxBcnIucHVzaChTa2lsbFR5cGUu5Yaw6Zyc57K+6YCaKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpmo/mnLrmioDog71cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsQXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBza2lsbEFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsSWQgPSBza2lsbEFycltza2lsbEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2tpbGxJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLueBq+eEsOeyvumAmjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2VmZmVjdF8yNChldmVudC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGNhc2UgU2tpbGxUeXBlLumbt+eUteeyvumAmjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2VmZmVjdF8yNShldmVudC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLuWGsOmcnOeyvumAmjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2VmZmVjdF8yNihldmVudC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX1pvbWJpZV9EZWF0aDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu5a2Q5by556KO54mHKSAmJiBldmVudC5mcm9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZSA9IDMwICogTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCdWxsZXQoZXZlbnQubm9kZSwgMzAgKyBhbmdsZSwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1bGxldChldmVudC5ub2RlLCAxNTAgKyBhbmdsZSwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1bGxldChldmVudC5ub2RlLCAyNzAgKyBhbmdsZSwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzSGF2ZVNraWxsKFNraWxsVHlwZS7okIPlj5YpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyICYmIGdhbWVNZ3IucGxheWVyVHMgJiYgZ2FtZU1nci5wbGF5ZXJUcy5IUCA8IGdhbWVNZ3IucGxheWVyVHMudG90bGVIcCAmJiBNYXRoLnJhbmRvbSgpIDwgMC4wNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5IUCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5yZWNvdmVyRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g57uf6K6h5Ye75p2AXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRzOiBab21iaWVCYXNlID0gZXZlbnQubm9kZS5nZXRDb21wb25lbnQoWm9tYmllQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9tYmllS2lsbE51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHMuaXNCb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvc3NLaWxsSWQucHVzaCh0cy56b21iaWVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5ib3NzQXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci53aW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RhbnQuRV9CdWxsZXRfTGFzdDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNIYXZlU2tpbGwoU2tpbGxUeXBlLuiwouW5lSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1bGxldChldmVudC5ub2RlLCAzNiAqIDEsIDQwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCdWxsZXQoZXZlbnQubm9kZSwgMzYgKiAzLCA0MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVsbGV0KGV2ZW50Lm5vZGUsIDM2ICogNSwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1bGxldChldmVudC5ub2RlLCAzNiAqIDcsIDQwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCdWxsZXQoZXZlbnQubm9kZSwgMzYgKiA5LCA0MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVsbGV0KGV2ZW50Lm5vZGUsIDM2ICogMiwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCdWxsZXQoZXZlbnQubm9kZSwgMzYgKiA0LCA0MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1bGxldChldmVudC5ub2RlLCAzNiAqIDYsIDQwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVsbGV0KGV2ZW50Lm5vZGUsIDM2ICogOCwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCdWxsZXQoZXZlbnQubm9kZSwgMzYgKiAxMCwgNDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX0J1bGxldF9SZWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSGF2ZVNraWxsKFNraWxsVHlwZS7nqoPprYLlvLnlpLkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5hdGtSYXRlICo9IDEuMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5hdGtSYXRlIC89IDEuMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX1BsYXllcl9IYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu5oSP5rCU6aOO5Y+RKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfMTQgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX1BsYXllcl9EZWF0aDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaHVkdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZHVuLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOe7j+mqjCAqL1xyXG4gICAgY3JlYXRlSmluZ3lhbihwb3M6IGNjLlZlYzIpIHtcclxuICAgICAgICBpZiAodGhpcy5qaW5neWFuUHJlICYmIHRoaXMuamluZ3lhbkxheWVyKSB7XHJcbiAgICAgICAgICAgIGxldCBqaW5neWFuID0gZ2FtZU1nci5ub2RlR2V0KFwiamluZ3lhblwiLCB0aGlzLmppbmd5YW5QcmUpO1xyXG4gICAgICAgICAgICBsZXQgdHMgPSBqaW5neWFuLmdldENvbXBvbmVudChKaW5neWFuKTtcclxuICAgICAgICAgICAgaWYgKHRzKSB7IHRzLmluaXQoKTsgfVxyXG4gICAgICAgICAgICBqaW5neWFuLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIGppbmd5YW4uc2V0UGFyZW50KHRoaXMuamluZ3lhbkxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWNh+e6p+aViOaenCAqL1xyXG4gICAgdXBncmFkZUVmZmVjdCgpIHtcclxuICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcyAmJiBnYW1lTWdyLnBsYXllclRzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IHByZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF9zamd4XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIGlmIChwcmUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KGdhbWVNZ3IucGxheWVyVHMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBub2RlLnpJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgLy8g5Y2H57qn6Z+z5pWIXHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJMZXZlbFVwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlrZDlvLkgKi9cclxuICAgIGNyZWF0ZUJ1bGxldChub2RlOiBjYy5Ob2RlLCBhbmdsZTogbnVtYmVyLCBhdGtOdW06IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmJ1bGxldFByZWZhYikge1xyXG4gICAgICAgICAgICBsZXQgZGlyID0gY2MudjIoMSwgMCkucm90YXRlU2VsZihjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoYW5nbGUpKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKTtcclxuICAgICAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKG5vZGUuZ2V0UG9zaXRpb24oKSlcclxuICAgICAgICAgICAgYnVsbGV0LmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgcG9zMSA9IGJ1bGxldC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgcG9zMiA9IHBvczEuYWRkKGRpci5tdWwoMTAwMCkpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihidWxsZXQpXHJcbiAgICAgICAgICAgICAgICAudG8ocG9zMi5zdWIocG9zMSkubWFnKCkgLyAyNTAwLCB7IHBvc2l0aW9uOiBjYy52Myhwb3MyKSB9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cyA9IGJ1bGxldC5nZXRDb21wb25lbnQoQnVsbGV0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHMuYm9vbUVmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbSA9IGNjLmluc3RhbnRpYXRlKHRzLmJvb21FZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb20ucGFyZW50ID0gdHMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb20uc2V0UG9zaXRpb24odHMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbS56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfYm9tYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1ckJ1bGxldCA9IGJvb20uZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJ1bGxldC5hdGsgPSB0cy5hdGs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJ1bGxldC5hdGtlciA9IHRzLmF0a2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWxsZXQuaWQgPSB0cy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KFwiZXhwbG9cIiwgYm9vbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cy5oaXRFZmZlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBidWxsZXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodHMuaGl0RWZmZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gYnVsbGV0LnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X2VmZmVjdF9oaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRzID0gYnVsbGV0LmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgICAgICB0cy5pZCA9IDE7XHJcbiAgICAgICAgICAgIHRzLmF0a2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdHMuYXRrID0gYXRrTnVtO1xyXG4gICAgICAgICAgICB0cy5kaXIgPSBkaXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhbkFjY2VsZXJhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqIOiOt+W+l+e7j+mqjOWKoOmAnzHnp5LvvIjlj6/ntK/orqHvvIkgKi9cclxuICAgIGFjY2VsZXJhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfMTggPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FuQWNjZWxlcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuQWNjZWxlcmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8g5byA5aeL5Yqg6YCfXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcykgZ2FtZU1nci5wbGF5ZXJUcy5zcGVlZFJhdGUgKj0gMS41O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuQWNjZWxlcmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyDnu5PmnZ/liqDpgJ9cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLnBsYXllclRzKSBnYW1lTWdyLnBsYXllclRzLnNwZWVkUmF0ZSAvPSAxLjU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsXzE4LS07XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZWxlcmF0ZSgpO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDprZTms5XkvKTlrrPlgI3njocgKi9cclxuICAgIG1hZ2ljX2hhcnRfcmF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVTa2lsbChTa2lsbFR5cGUu5Y+M6YeN6ZmE6a2UKSAmJiB0aGlzLnNraWxsX21hZ2ljID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMS41O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6IO95ZCm5re75Yqg6a2U5rOV77yI5a6h5Yik77yM54Gr54Sw77yM6Zu355S177yM5Yaw5Ya777yJICovXHJcbiAgICBjYW5BZGRNYWdpYyhlbmVteTogY2MuTm9kZSwgaWQ/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoZW5lbXkgJiYgZW5lbXkuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgem9tYmllVHM6IFpvbWJpZUJhc2UgPSBlbmVteS5nZXRDb21wb25lbnQoWm9tYmllQmFzZSk7XHJcbiAgICAgICAgICAgIGlmICh6b21iaWVUcykge1xyXG4gICAgICAgICAgICAgICAgLy8g6KGA6YeP5bCP5LqOMFxyXG4gICAgICAgICAgICAgICAgaWYgKHpvbWJpZVRzLkhQIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlt7LlrZjlnKjnnqzmlqlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXkuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZW15LmNoaWxkcmVuW2ldLm5hbWUgPT0gYHpvbWJpZVNraWxsXyR7U2tpbGxUeXBlLueerOaWqX1gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCA9PSBTa2lsbFR5cGUu556s5papKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYr+WQpui+vuWIsOivleeUqOadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoem9tYmllVHMuaXNCb3NzIHx8ICh6b21iaWVUcy50b3RsZUhwID4gMCAmJiB6b21iaWVUcy5IUCAvIHpvbWJpZVRzLnRvdGxlSHAgPiAwLjQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3suWtmOWcqOeBq+eEsOWSjOWGsOmcnFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZW15LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZW15LmNoaWxkcmVuW2ldLm5hbWUuaW5jbHVkZXMoXCJ6b21iaWVTa2lsbFwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHpvbWJpZVRzLmlzQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkID09IFNraWxsVHlwZS7ngavnhLDnsr7pgJopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuMiA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgPT0gU2tpbGxUeXBlLuWGsOmcnOeyvumAmikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC4yID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnnqzmlqkgKi9cclxuICAgIHNraWxsX2VmZmVjdF8zKGVuZW15OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKGVuZW15ICYmIGVuZW15LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IHpvbWJpZVRzOiBab21iaWVCYXNlID0gZW5lbXkuZ2V0Q29tcG9uZW50KFpvbWJpZUJhc2UpO1xyXG4gICAgICAgICAgICBpZiAoem9tYmllVHMpIHtcclxuICAgICAgICAgICAgICAgIC8vIOaKgOiDveaViOaenFxyXG4gICAgICAgICAgICAgICAgbGV0IHByZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF8zXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoZW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmUgOavgVxyXG4gICAgICAgICAgICAgICAgICAgIHpvbWJpZVRzLm1vdmVEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgICAgICAgICAgem9tYmllVHMuY2FuTW92ZURpciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHpvbWJpZVRzLnVwZGF0ZU1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih6b21iaWVUcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDAuNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHpvbWJpZVRzICYmIHpvbWJpZVRzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b21iaWVUcy5oYXJ0KHpvbWJpZVRzLkhQLCBudWxsLCBudWxsLCBmYWxzZSwgZmFsc2UsIGNjLkNvbG9yLlJFRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSgwLjUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog54Gr54Sw57K+6YCaICovXHJcbiAgICBza2lsbF9lZmZlY3RfMjQoZW5lbXk6IGNjLk5vZGUpIHtcclxuICAgICAgICBpZiAoZW5lbXkgJiYgZW5lbXkuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgem9tYmllVHM6IFpvbWJpZUJhc2UgPSBlbmVteS5nZXRDb21wb25lbnQoWm9tYmllQmFzZSk7XHJcbiAgICAgICAgICAgIGlmICh6b21iaWVUcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF8yNFwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOeBq+eEsOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDAvKiAtZW5lbXkuaGVpZ2h0IC8gMiAqIGVuZW15LnNjYWxlWSAqLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoZW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuekluZGV4ID0gY2MubWFjcm8uTUFYX1pJTkRFWDtcclxuICAgICAgICAgICAgICAgICAgICB6b21iaWVUcy5maXJlX3N0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Lyk5a6zXHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDAuMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHpvbWJpZVRzLmlzVmFsaWQgJiYgem9tYmllVHMuSFAgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgem9tYmllVHMuaGFydCg1ICogdGhpcy5tYWdpY19oYXJ0X3JhdGUoKSwgbnVsbCwgbnVsbCwgZmFsc2UsIGZhbHNlLCBjYy5Db2xvci5SRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGVhdCgyMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgem9tYmllVHMuZmlyZV9lbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJyYW5zaGFvXCIsIGVuZW15LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKiDlhrDpnJznsr7pgJogKi9cclxuICAgIHNraWxsX2VmZmVjdF8yNihlbmVteTogY2MuTm9kZSkge1xyXG4gICAgICAgIGlmIChlbmVteSAmJiBlbmVteS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCB6b21iaWVUczogWm9tYmllQmFzZSA9IGVuZW15LmdldENvbXBvbmVudChab21iaWVCYXNlKTtcclxuICAgICAgICAgICAgaWYgKHpvbWJpZVRzIC8qICYmICF6b21iaWVUcy5pc0Jvc3MoKSAqLykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF8yNlwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlX2Zyb3plbiA9IGNjLmluc3RhbnRpYXRlKHByZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZV9mcm96ZW4uc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZV9mcm96ZW4uc2V0UGFyZW50KGVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlX2Zyb3plbi56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh6b21iaWVUcy56b21iaWVJZCA+PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVfZnJvemVuLnNjYWxlID0gNDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlX2Zyb3plbi5zY2FsZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWGsOWGu1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh6b21iaWVUcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvbWJpZVRzLmZyb3plblN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ID0gem9tYmllVHMuaXNCb3NzID8gMC41IDogMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHpvbWJpZVRzICYmIHpvbWJpZVRzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b21iaWVUcy5mcm96ZW5FbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmUgOavgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVfZnJvemVuICYmIG5vZGVfZnJvemVuLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlX2Zyb3plbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDpn7PmlYhcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJiaW5nZG9uZ1wiLCBlbmVteSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmlzaG91OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKiDpgJrngbXljJXpppYgKi9cclxuICAgIHVwZGF0ZUJpc2hvdSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYmlzaG91ICYmIHRoaXMuX2Jpc2hvdS5pc1ZhbGlkICYmIGdhbWVNZ3IgJiYgZ2FtZU1nci5wbGF5ZXJUcykge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcy5hdGtUYXJnZXQgJiYgZ2FtZU1nci5wbGF5ZXJUcy5hdGtUYXJnZXQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5YyV6aaW5bGe5oCnXHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0VHMgPSB0aGlzLl9iaXNob3UuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRUcy5pc0hhcnRNdXNpYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0VHMuaGl0QXVkaW8gPSBcImh1cnRcIjtcclxuICAgICAgICAgICAgICAgIGJ1bGxldFRzLmF0ayA9IDUwICogZ2FtZU1nci5wbGF5ZXJUcy5hdGtSYXRlO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0VHMuYXRrZWRBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vIOW9k+WJjVxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb206IGNjLlZlYzIgPSBnYW1lTWdyLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vIOebruagh1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpdjogY2MuVmVjMiA9IGdhbWVNZ3IucGxheWVyVHMuYXRrVGFyZ2V0LmdldFBvc2l0aW9uKCkuc3ViU2VsZihmcm9tKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXMgPSBkaXYubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2Lm5vcm1hbGl6ZVNlbGYoKS5tdWxTZWxmKDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcDI6IGNjLlZlYzIgPSBmcm9tLmFkZChjYy52MigxLCAwKS5tdWxTZWxmKDQwMCkucm90YXRlU2VsZih0aGlzLl9iaXNob3UuYW5nbGUgLyAxODAgKiBNYXRoLlBJKSlcclxuICAgICAgICAgICAgICAgIGxldCB0bzogY2MuVmVjMiA9IGZyb20uYWRkKGRpdik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGRpdi5tYWcoKSAvIDgwMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmFsc2UgPT0gdGhpcy5fYmlzaG91LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jpc2hvdS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jpc2hvdS5zZXRQb3NpdGlvbihmcm9tKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuX2Jpc2hvdSlcclxuICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8odCwgZnJvbSwgcDIsIHRvKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy51cGRhdGVCaXNob3UoKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jpc2hvdS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy51cGRhdGVCaXNob3UoKTsgfSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGh1ZHVuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKiDnpZ7lnKPmiqTnm74gKi9cclxuICAgIHVwZGF0ZUh1ZHVuKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmh1ZHVuICYmIHRoaXMuaHVkdW4uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHVkdW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIOegtOijgumfs+aViFxyXG4gICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJTaGllbGREZXN0cm95XCIpO1xyXG4gICAgICAgICAgICAvLyBjZFxyXG4gICAgICAgICAgICB0aGlzLnNldFNraWxsQ0QoU2tpbGxUeXBlLuelnuWco+WuiOaKpCwgNjApO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nciAmJiBnYW1lTWdyLnBsYXllclRzICYmIGdhbWVNZ3IucGxheWVyVHMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHVkdW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcy5IUCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZHVuLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odWR1bi5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDYwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF96YWlzaGVuZ0NkVGltZTogbnVtYmVyID0gMDtcclxuICAgIC8qKiDlho3nlJ8gKi9cclxuICAgIHByaXZhdGUgX3VwZGF0ZVphaXNoZW5nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl96YWlzaGVuZ0NkVGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5femFpc2hlbmdDZFRpbWUtLTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29jb3N6LmlzUGF1c2UpIHJldHVybjtcclxuICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcyAmJiAhZ2FtZU1nci5wbGF5ZXJUcy5pc0RlYXRoICYmIGdhbWVNZ3IucGxheWVyVHMuSFAgPCBnYW1lTWdyLnBsYXllclRzLnRvdGxlSHApIHtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5IUCArPSAxO1xyXG4gICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLnJlY292ZXJFZmZlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5femFpc2hlbmdDZFRpbWUgPSA5MDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTa2lsbENEKFNraWxsVHlwZS7lho3nlJ8sIHRoaXMuX3phaXNoZW5nQ2RUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZmVpbHVuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Bvc0FycjogYW55W10gPSBbXHJcbiAgICAgICAgW1s1MDAsIDBdXSxcclxuICAgICAgICBbWzUwMCwgMF0sIFstNTAwLCAwXV0sXHJcbiAgICAgICAgW1s1MDAsIDBdLCBbLTMwMCwgNDAwXSwgWy0zMDAsIC00MDBdXSxcclxuICAgICAgICBbWzUwMCwgMF0sIFstNTAwLCAwXSwgWzAsIDUwMF0sIFswLCAtNTAwXV1cclxuICAgIF1cclxuICAgIC8qKiDpo57ova4gKi9cclxuICAgIHVwZGF0ZUZlaWx1bihsZXZlbDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8g5qC55o2u562J57qn6K6+572u6aOe6L2u5pWw6YePXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZlaWx1biAmJiB0aGlzLl9mZWlsdW4uaXNWYWxpZCAmJiBnYW1lTWdyICYmIGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5fZmVpbHVuKS5ieSgxMCwgeyBhbmdsZTogLTM2MCAqIDUgfSkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIC8vIOmjnui9rlxyXG4gICAgICAgICAgICBsZXQgbGV2ZWwyTnVtQXJyID0gWzEsIDIsIDMsIDRdO1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gbGV2ZWwyTnVtQXJyW2xldmVsXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uID0gdGhpcy5fZmVpbHVuLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IG51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ByRnJhbWUgPSB0aGlzLl9mZWlsdW4uZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwckZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24uc2V0UG9zaXRpb24odGhpcy5fcG9zQXJyW2xldmVsXVtpXVswXSwgdGhpcy5fcG9zQXJyW2xldmVsXVtpXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGljb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KFwiY2hpbHVuU3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygxLCB7IHNjYWxlOiAyLjUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSg4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDEsIHsgc2NhbGU6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgaWNvbi5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpLmVuYWJsZWQgPSBmYWxzZTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSgyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0VHMgPSBpY29uLmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVsbGV0VHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldFRzLmlzSGFydE11c2ljID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRUcy5oaXRBdWRpbyA9IFwiY2hpbHVuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRUcy5hdGsgPSA4MCArIDIwICogbGV2ZWwgKiBnYW1lTWdyLnBsYXllclRzLmF0a1JhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zaGFuZGlhbkNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfc2hhbmRpYW5OdW06IG51bWJlcltdID0gWzEsIDEsIDMsIDVdO1xyXG4gICAgcHJpdmF0ZSBfc2hhbmRpQ2RUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOmXqueUtSAqL1xyXG4gICAgdXBkYXRlU2hhbmRpYW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NoYW5kaUNkVGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhbmRpQ2RUaW1lLS07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvY29zei5pc1BhdXNlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGxldmVsID0gdGhpcy51cGdyYWRlU2tpbGxBcnJbU2tpbGxUeXBlLumXqueUtV07XHJcbiAgICAgICAgaWYgKHRoaXMuX3NoYW5kaWFuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFuZGlhbkNvdW50ID0gdGhpcy5fc2hhbmRpYW5OdW1bbGV2ZWxdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDog73lpJ/mt7vliqDpl6rnlLXnmoTmlYzkurpcclxuICAgICAgICBsZXQgZW5lbXlBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gZ2FtZU1nci5wbGF5ZXJUcy5hdGtMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW46IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gZ2FtZU1nci5wbGF5ZXJUcy5hdGtMaXN0W2ldO1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobi5uYW1lID09IFwiem9tYmllU2tpbGxfc2hhbmRpYW5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNhbikgeyBlbmVteUFyci5wdXNoKG5vZGUpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmVteUFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHByZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF9zaGFuZGlhblwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSBlbmVteUFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15ICYmIGVuZW15LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGFuZGlhbkNvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5re75Yqg6Zu355S15Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgLWVuZW15LmhlaWdodCAvIDIgKiBlbmVteS5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KGVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Yqo55S755qu6IKkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwQW5pID0gbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BBbmkpIHsgc3BBbmkuc2V0U2tpbihcInlcIik7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7IGlmIChub2RlICYmIG5vZGUuaXNWYWxpZCkgeyBub2RlLmRlc3Ryb3koKTsgfSB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDkvKTlrrNcclxuICAgICAgICAgICAgICAgICAgICBsZXQgem9tYmllVHM6IFpvbWJpZUJhc2UgPSBlbmVteS5nZXRDb21wb25lbnQoWm9tYmllQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHpvbWJpZVRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6b21iaWVUcy5pc1ZhbGlkICYmIHpvbWJpZVRzLkhQID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgem9tYmllVHMuaGFydCgyMDAgKiB0aGlzLm1hZ2ljX2hhcnRfcmF0ZSgpLCBudWxsLCBudWxsLCBmYWxzZSwgZmFsc2UsIGNjLkNvbG9yLlJFRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Z+z5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KFwiTHVvTGVpXCIsIGVuZW15KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwicHJlZmFiX3pvbWJpZV9za2lsbC96b21iaWVTa2lsbF9zaGFuZGlhblwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9zaGFuZGlhbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhbmRpQ2RUaW1lID0gMyArIGxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNraWxsQ0QoU2tpbGxUeXBlLumXqueUtSwgdGhpcy5fc2hhbmRpQ2RUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZmlyZUNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfZmlyZU51bTogbnVtYmVyW10gPSBbMSwgMSwgMiwgM107XHJcbiAgICBwcml2YXRlIF9maXJlQ2RUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOeHg+eDp+eTtiAqL1xyXG4gICAgdXBkYXRlRmlyZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlyZUNkVGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZUNkVGltZS0tO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2Nvc3ouaXNQYXVzZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IHRoaXMudXBncmFkZVNraWxsQXJyW1NraWxsVHlwZS7nh4Png6fnk7ZdO1xyXG4gICAgICAgIHRoaXMuX2ZpcmVDb3VudCA9IHRoaXMuX2ZpcmVOdW1bbGV2ZWxdO1xyXG4gICAgICAgIGlmICghY29jb3N6LmlzUGF1c2UgJiYgZ2FtZU1nciAmJiBnYW1lTWdyLnBsYXllclRzICYmIGdhbWVNZ3IucGxheWVyVHMuYXRrVGFyZ2V0ICYmIGdhbWVNZ3IucGxheWVyVHMuYXRrVGFyZ2V0LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IHByZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwiem9tYmllU2tpbGxfZmlyZVwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGl2OiBjYy5WZWMyID0gZ2FtZU1nci5wbGF5ZXJUcy5hdGtUYXJnZXQuZ2V0UG9zaXRpb24oKS5zdWJTZWxmKGdhbWVNZ3IucGxheWVyVHMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGRpdi5ub3JtYWxpemVTZWxmKCkubXVsU2VsZig0MDApO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9maXJlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYWRpYW4gPSAoKHRoaXMuX2ZpcmVDb3VudCAtIDEpIC8gMiAtIGkpICogKE1hdGguUEkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IGdhbWVNZ3IucGxheWVyVHMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0byA9IGZyb20uYWRkKGNjLnYyKGRpdikucm90YXRlU2VsZihyYWRpYW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcDIgPSBjYy52MigoZnJvbS54ICsgdG8ueCkgLyAyLCBmcm9tLnkgKyA5MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IChsZXZlbCA9PSAzID8gZmFsc2UgOiB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IChsZXZlbCA9PSAzID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlLnNldFBvc2l0aW9uKGZyb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmUuc2V0UGFyZW50KGdhbWVNZ3IubWFwKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmlyZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmFsbGVsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKS5iZXppZXJUbygxLCBmcm9tLCBwMiwgdG8pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKS50bygxLCB7IGFuZ2xlOiA3MjAgKiAoZGl2LnggPiAwID8gMSA6IC0xKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZWR4X2Zsb29yU2tpbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZpcmUuY2hpbGRyZW5bMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlrZDlvLnnorDmkp7kvZNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWtkOW8ueWxnuaAp1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1dHRsZVRzID0gZmlyZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRsZVRzLmlzSGFydE11c2ljID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0bGVUcy5hdGsgPSAxMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRsZVRzLmhhcnRJbnRlcnZhbCA9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOeHg+eDp+WKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwQW5pID0gZmlyZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BBbmkuc2V0U2tpbihsZXZlbCA9PSAzID8gXCJsXCIgOiBcImhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcEFuaS5zZXRBbmltYXRpb24oMCwgXCJrXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwQW5pLnNldEFuaW1hdGlvbigwLCBcInJhbnNoYW9cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnh4Png6fnk7bnoLTnoo7pn7PmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcIlJhbnNoYW9waW5ncG9zdWlcIiwgZmlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJyYW5zaGFvXCIsIGZpcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMywgeyBvcGFjaXR5OiA1MCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IGZpcmUuZGVzdHJveSgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9maXJlQ2RUaW1lID0gNDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTa2lsbENEKFNraWxsVHlwZS7nh4Png6fnk7YsIDQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=