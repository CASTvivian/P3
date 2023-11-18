"use strict";
cc._RF.push(module, '9c57aW3ydVKJ6Xst8KQr8d9', 'person');
// scripts/Game/person.ts

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
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var gameDate_1 = require("./gameDate");
var gameMgr_1 = require("./gameMgr");
var weapon_1 = require("./weapon");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 光环特效
        _this.ghAniNode = null;
        // 烟尘动画节点
        _this.ycAniNode = null;
        _this.personAtk = 0;
        _this.playerName = "";
        _this.personLevel = 0;
        _this.atkNum = 40;
        _this.atkRange = 800;
        _this.atkSpeed = 4;
        _this.reloadSpeed = 2;
        _this.totleHp = 300;
        _this.curHp = 300;
        _this.atkRate = 1;
        _this.speedRate = 1;
        _this.atkSpeedRate = 1;
        _this.reloadRate = 1;
        _this.bulletRate = 1;
        _this.meleeAtkRate = 1;
        _this.damageReduction = 0;
        _this.recoverItemNum = 0;
        _this.killNum = 0;
        _this.curKillNum = 0;
        _this.MoveSpeed = 600;
        _this.moveDir = cc.v2(0, 0);
        _this.atkDir = cc.v2(0, 0);
        _this.footNum = 0;
        _this.lastPos = cc.v2(0, 0);
        // 开关
        _this.canMove = true; //能否移动
        _this.canMoveDir = true; //能否改变移动方向
        // 检测范围
        _this.detectRange = 1000;
        _this.mat_common = null;
        _this.mat_attacked = null;
        // onLoad () {}
        _this.body = null;
        _this.leg = null;
        _this.leg_back = null;
        _this.head = null;
        _this.hpBar = null;
        _this.hpSpr = null;
        _this.shieldBar = null;
        _this.atkBar = null;
        _this.head_atk = null;
        _this.head_hart = null;
        _this.head_death = null;
        _this.playerMess = null;
        _this.ani = null;
        _this.id = 0; //1玩家
        _this.isPlayer = false;
        _this.atkTarget = null;
        _this.weapon = null;
        _this.weapon_dao = null;
        _this.hpNumNode = null;
        _this._shield = 0;
        _this.maxShield = 100;
        _this.rig = null;
        _this.curTime = 0;
        _this._playerMessY = 200;
        _this.isReady = false;
        _this.curSkin = 0;
        /** 视频武器 */
        _this.weaponAdArr = [9, 10, 14, 17, 18];
        _this.weaponAdIndex = Math.floor(Math.random() * _this.weaponAdArr.length);
        _this.meleeWeaponNum = 3;
        _this.rangedWeaponNum = 1;
        _this.rangedWeaponAdNum = 1;
        _this.meleeWeapon = null;
        _this.rangedWeapon = null;
        _this.rangedWeaponAd = null;
        _this.curWeapon = null;
        _this.startPosNode = null;
        _this.lastTime = 0;
        _this._aniName = "";
        _this.isAtk = false;
        _this.atkList = [];
        _this.curItem = 0;
        _this.curItemEffect = null;
        _this.itemTarget = null;
        _this.grassID = 0;
        _this.houseID = 0;
        _this.isInHouse = false;
        _this.newWeapon = -1;
        _this.newWeaponItem = null;
        _this.poisonCount = 0;
        _this.isDeath = false;
        _this.isAttackedEffect = false;
        _this.maxNum = 0;
        _this.isAvoidInjury = 0;
        _this.killer = null;
        // findTime: number = 0;
        _this.revivePos = cc.v2(0, 0);
        return _this;
    }
    Person_1 = Person;
    Object.defineProperty(Person.prototype, "HP", {
        get: function () {
            return this.curHp;
        },
        set: function (num) {
            num = Math.floor(num);
            if (num < 0)
                num = 0;
            else if (num > this.totleHp)
                num = this.totleHp;
            this.curHp = num;
            // 血条
            if (this.hpBar && this.hpBar.isValid) {
                this.hpBar.progress = this.curHp / this.totleHp;
            }
            // 主动使用道具
            if (this.isPlayer) {
                if (CocosZ_1.cocosz.gameMode == 6) {
                    gameMgr_1.gameMgr.update_model6_xuedi();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "Shiled", {
        get: function () {
            return this._shield;
        },
        set: function (num) {
            cc.Tween.stopAllByTarget(this.shieldBar);
            this._shield = num;
            if (this._shield < 0) {
                this._shield = 0;
                this.shieldBar.node.opacity = 0;
                this.body.getChildByName("body").children[0].active = false;
            }
            else {
                this.shieldBar.node.opacity = 255;
            }
            cc.tween(this.shieldBar).to(0.3, { progress: this._shield / this.maxShield }).start();
        },
        enumerable: false,
        configurable: true
    });
    Person.prototype.onLoad = function () { };
    Person.prototype.start = function () {
        // 人物信息
        if (this.playerMess && this.playerMess.isValid) {
            this._playerMessY = this.playerMess.y;
            this.playerMess.setParent(this.node.parent);
            this.playerMess.zIndex = Constant_1.ZindexLayer.zindex_hp;
            this.updateMess();
        }
        else if (this.hpBar && this.hpBar.isValid) {
            this._playerMessY = this.hpBar.node.y;
            this.hpBar.node.setParent(this.node.parent);
            this.hpBar.node.zIndex = Constant_1.ZindexLayer.zindex_hp;
            this.updateMess();
        }
    };
    Person.prototype.update = function (dt) { };
    Person.prototype.lateUpdate = function (dt) { };
    /** 人物信息 */
    Person.prototype.updateMess = function () {
        if (this.playerMess && this.playerMess.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP) {
                this.playerMess.active = true;
                this.playerMess.setPosition(this.node.x, this.node.y + this._playerMessY);
            }
            else {
                this.playerMess.active = false;
            }
        }
        else if (this.hpBar && this.hpBar.isValid && this.hpBar.node && this.hpBar.node.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP) {
                this.hpBar.node.active = true;
                this.hpBar.node.setPosition(this.node.x, this.node.y + this._playerMessY);
            }
            else {
                this.hpBar.node.active = false;
            }
        }
    };
    /** 光环 */
    Person.prototype.updateGhAni = function () {
        if (this.ghAniNode && this.ghAniNode.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP) {
                this.ghAniNode.active = true;
                this.ghAniNode.angle = this.node.angle;
                this.ghAniNode.setPosition(this.node.x, this.node.y - 90);
            }
            else {
                this.ghAniNode.active = false;
            }
        }
    };
    /** 烟尘 */
    Person.prototype.updateYcAni = function () {
        if (this.ycAniNode && this.ycAniNode.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP && !this.moveDir.equals(cc.Vec2.ZERO)) {
                this.ycAniNode.active = true;
                this.ycAniNode.setPosition(this.node.x, this.node.y - 50);
                this.ycAniNode.scaleX = this.moveDir.x > 0 ? 1 : -1;
            }
            else {
                this.ycAniNode.active = false;
            }
        }
    };
    Person.prototype.setProperty = function () {
        var _this = this;
        this.ani = this.body.getComponent(cc.Animation);
        this.node.getComponent(cc.CircleCollider).radius = this.detectRange;
        if (this.isPlayer)
            this.atkRange = 1000;
        this.personLevel = Math.floor(Math.random() * 6);
        var num1 = weapon_1.default.meleeWaapon[Math.floor(Math.random() * weapon_1.default.meleeWaapon.length)];
        var num2 = weapon_1.default.rangeWeapon[Math.floor(Math.random() * 13 /* Weapon.rangedWeapon.length */)];
        if (this.isPlayer) {
            num1 = CocosZ_1.cocosz.dataMgr.CurMelee + 1;
            num2 = CocosZ_1.cocosz.dataMgr.CurRange + 1;
            if (CocosZ_1.cocosz.gameMgr.gameCtr.curUseSkinId < 0) {
                this.curSkin = CocosZ_1.cocosz.dataMgr.CurSkinId;
            }
            else {
                this.curSkin = CocosZ_1.cocosz.gameMgr.gameCtr.curUseSkinId;
            }
            this.head.children[0].children[this.curSkin].active = true;
            var head1 = this.head.children[0].children[this.curSkin];
            this.head.children[1].children[this.curSkin].active = true;
            var head2 = this.head.children[1].children[this.curSkin];
            for (var i = this.head.children[0].childrenCount - 1; i >= 0; i--) {
                if (this.head.children[0].children[i].uuid != head1.uuid) {
                    this.head.children[0].children[i].destroy();
                }
            }
            for (var i = this.head.children[1].childrenCount - 1; i >= 0; i--) {
                if (this.head.children[1].children[i].uuid != head2.uuid) {
                    this.head.children[1].children[i].destroy();
                }
            }
            // 表情(父节点设置为正脸)
            this.head_atk = this.head.children[2].children[this.curSkin];
            this.head_atk.active = true;
            this.head_atk.opacity = 0;
            this.head_hart = this.head.children[3].children[this.curSkin];
            this.head_hart.active = true;
            this.head_hart.opacity = 0;
            this.head_death = this.head.children[4].children[this.curSkin];
            this.head_death.active = true;
            this.head_death.opacity = 0;
            this.head_atk.setParent(this.head.children[0]);
            this.head_hart.setParent(this.head.children[0]);
            this.head_death.setParent(this.head.children[0]);
            this.head_atk.zIndex = 1;
            this.head_hart.zIndex = 2;
            this.head_death.zIndex = 3;
            // 删除多余表情
            this.head.children[2].destroy();
            this.head.children[3].destroy();
            this.head.children[4].destroy();
            this.personLevel = CocosZ_1.cocosz.dataMgr.getSkinInfo(this.curSkin).Level;
            this.personAtk = gameDate_1.default.SkinMess["" + (this.curSkin + 1)].atk[this.personLevel];
            if (CocosZ_1.cocosz.gameMode == 6) {
                this.totleHp = gameDate_1.default.SkinMess["" + (this.curSkin + 1)].xuedi;
            }
            else {
                this.totleHp = gameDate_1.default.SkinMess["" + (this.curSkin + 1)].hp[this.personLevel];
            }
            // 玩家血量增加
            if ([1, 2, 4].includes(CocosZ_1.cocosz.gameMode)) {
                this.totleHp *= 4;
            }
            else if (3 == CocosZ_1.cocosz.gameMode) {
                if (CocosZ_1.cocosz.curLevel >= 15) {
                    this.totleHp *= 9;
                }
                else if (CocosZ_1.cocosz.curLevel >= 10) {
                    this.totleHp *= 8;
                }
                else if (CocosZ_1.cocosz.curLevel >= 5) {
                    this.totleHp *= 6;
                }
                else {
                    this.totleHp *= 4;
                }
            }
            else if (5 == CocosZ_1.cocosz.gameMode) {
                this.totleHp *= 6;
            }
            else if (7 == CocosZ_1.cocosz.gameMode) {
                this.totleHp *= 3;
            }
            this.HP = this.totleHp;
        }
        else { }
        // 初始武器
        if (CocosZ_1.cocosz.gameMode == 4) {
            if (this.isPlayer) {
                this.setNewWeapon(14 - 1); // 玩家固定木棒
            }
            else {
                this.setNewWeapon(num1 - 1); // 敌人随机近战武器
            }
            this.changeCurWeapon(this.meleeWeapon, false);
        }
        else {
            if (CocosZ_1.cocosz.gameMode === 7) {
                this.setNewWeapon(num2 - 1);
            }
            else {
                this.setNewWeapon(num1 - 1);
                this.setNewWeapon(num2 - 1);
            }
            this.changeCurWeapon(this.rangedWeapon, false);
            // 广告远程武器
            if (this.isPlayer /* && cocosz.isShowAd */) {
                cc.tween(gameMgr_1.gameMgr.rangedWeaponAdMess)
                    .call(function () {
                    _this.refreshWeaponAd();
                })
                    .delay(10)
                    .union()
                    .repeatForever()
                    .start();
            }
        }
        // 血条
        if (CocosZ_1.cocosz.gameMode == 6) {
            this.hpBar.node.active = false;
            this.atkBar.node.active = false;
        }
        // 角色速度
        this.MoveSpeed = 200 + gameDate_1.default.SkinMess["" + (this.curSkin + 1)].speed[this.personLevel];
        if (PlatUtils_1.default.IsOPPO) {
            this.MoveSpeed /= 2;
        }
        // 光环
        if (this.personLevel > 0) {
            this.ghAniNode.color = cc.Color.WHITE;
            var arr = ["", "y", "p", "r"];
            var ghAni = this.ghAniNode.getComponent(sp.Skeleton);
            if (ghAni) {
                ghAni.setSkin(arr[Math.ceil(this.personLevel / 2)]);
            }
        }
        else {
            this.ghAniNode.color = cc.Color.BLACK;
            var ghAni = this.ghAniNode.getComponent(sp.Skeleton);
            ghAni.setSkin("r");
            ghAni.setAnimation(0, "animation", true);
        }
        if (!this.playerName) {
            this.playerName = i18n.t("game.player") + this.id;
        }
        var name = this.playerMess.getChildByName("nameLabel");
        if (name)
            name.active = false;
        this.lastPos = this.node.getPosition();
        this.isReady = true;
    };
    Person.prototype.refreshWeaponAd = function () {
        if (CocosZ_1.cocosz.isPause || !this.isPlayer) {
            return;
        }
        if (++this.weaponAdIndex >= this.weaponAdArr.length) {
            this.weaponAdIndex = 0;
        }
        var weaponNum = this.weaponAdArr[this.weaponAdIndex];
        var str = weapon_1.default.WeaponName[weaponNum];
        var prefab = CocosZ_1.cocosz.resMgr.getRes("weapon_" + str, cc.Prefab);
        var new_weapon = cc.instantiate(prefab);
        var new_weaponTs = new_weapon.getComponent(weapon_1.default);
        // 初始化
        new_weaponTs.person = this;
        this.body.addChild(new_weapon);
        new_weapon.active = false;
        new_weaponTs.weaponType = weapon_1.WeaponType.weapon_rangeAd;
        this.rangedWeaponAd && this.rangedWeaponAd.destroy();
        this.rangedWeaponAd = new_weapon;
        this.rangedWeaponAdNum = new_weaponTs.weaponNum;
        var str2 = "w_" + weapon_1.default.WeaponName[this.rangedWeaponAdNum - 1];
        var spr2 = CocosZ_1.cocosz.resMgr.getRes(str2, cc.SpriteFrame);
        gameMgr_1.gameMgr.rangedWeaponAdMess.children[3].getComponent(cc.Sprite).spriteFrame = spr2;
        gameMgr_1.gameMgr.rangedWeaponAdMess.children[4].getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + (weaponNum + 1), cc.SpriteFrame);
        gameMgr_1.gameMgr.rangedWeaponAdMess.children[5].getComponent(cc.Label).string = new_weaponTs.atkNum.toString();
        new_weaponTs.setBulletUI();
    };
    Person.prototype.setNewWeapon = function (weaponNum) {
        if (weaponNum === void 0) { weaponNum = this.newWeapon; }
        if (weaponNum < 0)
            return;
        var str = weapon_1.default.WeaponName[weaponNum];
        var prefab = CocosZ_1.cocosz.resMgr.getRes("weapon_" + str, cc.Prefab);
        var new_weapon = cc.instantiate(prefab);
        var new_weaponTs = new_weapon.getComponent(weapon_1.default);
        new_weaponTs.person = this;
        this.body.addChild(new_weapon);
        new_weapon.active = false;
        if (new_weaponTs.isRangeWeapon) {
            if (this.curWeapon && this.curWeapon.weaponType == weapon_1.WeaponType.weapon_rangeAd) {
                // 设置广告远程
                new_weaponTs.weaponType = weapon_1.WeaponType.weapon_rangeAd;
                this.rangedWeaponAd && this.rangedWeaponAd.destroy();
                this.rangedWeaponAd = new_weapon;
                this.rangedWeaponAdNum = new_weaponTs.weaponNum;
                if (this.isPlayer) {
                    var str2 = "w_" + weapon_1.default.WeaponName[this.rangedWeaponAdNum - 1];
                    var spr2 = CocosZ_1.cocosz.resMgr.getRes(str2, cc.SpriteFrame);
                    gameMgr_1.gameMgr.rangedWeaponAdMess.children[3].getComponent(cc.Sprite).spriteFrame = spr2;
                    gameMgr_1.gameMgr.rangedWeaponAdMess.children[4].getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + (weaponNum + 1), cc.SpriteFrame);
                    gameMgr_1.gameMgr.rangedWeaponAdMess.children[5].getComponent(cc.Label).string = new_weaponTs.atkNum.toString();
                    new_weaponTs.setBulletUI();
                }
            }
            else {
                // 设置远程
                new_weaponTs.weaponType = weapon_1.WeaponType.weapon_range;
                this.rangedWeapon && this.rangedWeapon.destroy();
                this.rangedWeapon = new_weapon;
                this.rangedWeaponNum = new_weaponTs.weaponNum;
                if (this.isPlayer) {
                    var str2 = "w_" + weapon_1.default.WeaponName[this.rangedWeaponNum - 1];
                    var spr2 = CocosZ_1.cocosz.resMgr.getRes(str2, cc.SpriteFrame);
                    gameMgr_1.gameMgr.rangedWeaponMess.children[3].getComponent(cc.Sprite).spriteFrame = spr2;
                    gameMgr_1.gameMgr.rangedWeaponMess.children[4].getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + (weaponNum + 1), cc.SpriteFrame);
                    gameMgr_1.gameMgr.rangedWeaponMess.children[5].getComponent(cc.Label).string = new_weaponTs.atkNum.toString();
                    new_weaponTs.setBulletUI();
                }
            }
        }
        else {
            // 设置近战
            new_weaponTs.weaponType = weapon_1.WeaponType.weapon_melee;
            this.meleeWeapon && this.meleeWeapon.destroy();
            this.meleeWeapon = new_weapon;
            this.meleeWeaponNum = new_weaponTs.weaponNum;
        }
        // 替换当前武器
        if (this.curWeapon && this.curWeapon.isRangeWeapon === new_weaponTs.isRangeWeapon) {
            this.changeCurWeapon(new_weapon, false);
        }
        // 销毁武器道具
        this.newWeapon = -1;
        if (this.newWeaponItem && this.newWeaponItem.isValid)
            this.newWeaponItem.destroy();
        this.newWeaponItem = null;
    };
    Person.prototype.changeCurWeapon = function (newWeaponNode, isCheck) {
        if (isCheck === void 0) { isCheck = true; }
        if (!newWeaponNode || !newWeaponNode.isValid)
            return;
        if (this.curWeapon && this.curWeapon.isValid && newWeaponNode == this.curWeapon.node)
            return;
        var curTime = Number(new Date());
        if (isCheck && (curTime - this.lastTime < 1000))
            return;
        this.lastTime = curTime;
        // 切换武器显示
        if (this.curWeapon && cc.isValid(this.curWeapon))
            this.curWeapon.node.active = false;
        newWeaponNode.active = true;
        // 切换当前武器
        var newWeapinTs = newWeaponNode.getComponent(weapon_1.default);
        if (newWeapinTs) {
            // UI效果
            if (this.isPlayer) {
                var newWeapinMess = null;
                if (newWeapinTs.weaponType == weapon_1.WeaponType.weapon_melee) {
                    gameMgr_1.gameMgr.BtnBullet.active = false;
                }
                else if (newWeapinTs.weaponType == weapon_1.WeaponType.weapon_range) {
                    newWeapinMess = gameMgr_1.gameMgr.rangedWeaponMess;
                }
                else if (newWeapinTs.weaponType == weapon_1.WeaponType.weapon_rangeAd) {
                    newWeapinMess = gameMgr_1.gameMgr.rangedWeaponAdMess;
                }
                newWeapinMess.children[0].active = true;
                if (this.curWeapon && this.curWeapon.isValid) {
                    CocosZ_1.cocosz.audioMgr.playEffect("changeWeapon");
                    var oldWeapinMess_1 = null;
                    if (this.curWeapon.weaponType == weapon_1.WeaponType.weapon_melee) {
                    }
                    else if (this.curWeapon.weaponType == weapon_1.WeaponType.weapon_range) {
                        oldWeapinMess_1 = gameMgr_1.gameMgr.rangedWeaponMess;
                    }
                    else if (this.curWeapon.weaponType == weapon_1.WeaponType.weapon_rangeAd) {
                        oldWeapinMess_1 = gameMgr_1.gameMgr.rangedWeaponAdMess;
                    }
                    if (oldWeapinMess_1 !== newWeapinMess) {
                        oldWeapinMess_1.children[0].active = false;
                        oldWeapinMess_1.children[1].active = true;
                        cc.tween(oldWeapinMess_1.children[1].getComponent(cc.Sprite))
                            .set({ fillRange: -1 })
                            .to(1, { fillRange: 0 })
                            .call(function () {
                            if (oldWeapinMess_1.isValid) {
                                oldWeapinMess_1.children[1].active = false;
                            }
                        })
                            .start();
                    }
                }
            }
            // 开火点
            if (newWeapinTs.isRangeWeapon) {
                this.startPosNode = newWeaponNode.getChildByName("startPos");
            }
            this.curWeapon = newWeapinTs;
            this.atkNum = this.curWeapon.atkNum * (this.curWeapon.isRangeWeapon ? 1 : this.meleeAtkRate);
            this.atkSpeed = this.curWeapon.atkSpeed;
            this.reloadSpeed = this.curWeapon.reload;
        }
    };
    Person.prototype.atkStart = function () { };
    Person.prototype.atkEnemy = function () { };
    Person.prototype.atkComplete = function () { };
    Person.prototype.setWeaponAngle = function (dir) {
        if (this.curWeapon && this.curWeapon.isValid && this.curWeapon.isRangeWeapon) {
            if (dir.equals(cc.Vec2.ZERO)) {
                this.curWeapon.node.angle = 0;
            }
            else {
                if (dir.x < 0) {
                    this.curWeapon.node.angle = cc.v2(dir).signAngle(cc.v2(-1, 0)) / Math.PI * 180;
                }
                else {
                    this.curWeapon.node.angle = -cc.v2(dir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
                }
                if (dir.y > 0) {
                    if (this.curWeapon.node)
                        this.rangedWeapon.zIndex = -1;
                }
                else {
                    if (this.curWeapon.node)
                        this.rangedWeapon.zIndex = 1;
                }
            }
        }
    };
    /**
     * 设置动画
     * @param name 动画名字
     * @param enforce 强制播放
     */
    Person.prototype.updateAni = function (name, enforce) {
        if (enforce === void 0) { enforce = false; }
        if (enforce) {
            this._playAni(name);
        }
        else if (gameMgr_1.gameMgr.isGameStart) {
            if (this.isDeath) {
                name = "die";
            }
            else if (this.moveDir.equals(cc.Vec2.ZERO)) {
                name = "daiji_body";
            }
            else {
                name = "run_body";
            }
            this._playAni(name);
        }
    };
    Person.prototype._playAni = function (name) {
        if (name && name != this._aniName) {
            this.ani.play(name);
            this._aniName = name;
        }
    };
    Person.prototype.getCurSpeed = function () {
        var speed = this.MoveSpeed * this.speedRate * (this.curWeapon && this.curWeapon.isRangeWeapon ? 1 : 1.2);
        if (speed > 1000)
            speed = 1000;
        return speed;
    };
    Person.prototype.udpateRBody = function (dir) {
        if (this.rig.type == cc.RigidBodyType.Dynamic) {
            if (this.canMove) {
                if (!dir.equals(cc.Vec2.ZERO)) {
                    this.rig.linearVelocity = dir.mul(this.getCurSpeed());
                }
                else {
                    this.rig.linearVelocity = cc.Vec2.ZERO;
                }
            }
        }
    };
    Person.prototype.updatePerson = function () {
        var dir = null;
        if (this.atkDir && !this.atkDir.equals(cc.Vec2.ZERO)) {
            dir = this.atkDir;
        }
        else if (this.moveDir && !this.moveDir.equals(cc.Vec2.ZERO)) {
            dir = this.moveDir;
        }
        else {
            return;
        }
        if (dir.x < 0)
            this.body.scaleX = -Math.abs(this.body.scaleX);
        else
            this.body.scaleX = Math.abs(this.body.scaleX);
        if (dir.y > 0) {
            this.leg_back.opacity = 255;
            this.leg.opacity = 0;
            this.head.children[1].opacity = 255;
            this.head.children[0].opacity = 0;
        }
        else {
            this.leg_back.opacity = 0;
            this.leg.opacity = 255;
            this.head.children[0].opacity = 255;
            this.head.children[1].opacity = 0;
        }
        // 远程武器
        this.setWeaponAngle(dir);
    };
    Person.prototype.updateAtk = function () {
        if (this.atkList.length > 0) {
            var dt = 1000;
            var n = -1;
            for (var i = 0; i < this.atkList.length; i++) {
                var ts = this.atkList[i].getComponent(Person_1);
                var dt2 = this.atkList[i].getPosition().sub(this.node.getPosition()).mag();
                if (dt2 < dt) {
                    dt = dt2;
                    n = i;
                }
            }
            if (n >= 0) {
                this.atkDir = cc.v2(this.atkList[n].getPosition().sub(this.node.getPosition()).normalize());
                this.atkTarget = this.atkList[n];
            }
            else {
                this.atkDir = this.moveDir.mag() == 0 ? this.atkDir : cc.v2(this.moveDir);
            }
        }
        else {
            this.atkDir = this.moveDir.mag() == 0 ? this.atkDir : cc.v2(this.moveDir);
        }
    };
    // 0:检测碰撞；1:检测子弹；2:检测在层级下，3:检测在层级上
    Person.prototype.onCollisionEnter = function (other, self) { };
    Person.prototype.onCollisionExit = function (other, self) { };
    /** 受伤 */
    Person.prototype.hart = function (atkNum, from, dir, isAudio, isEmit, labelColor) {
        if (dir === void 0) { dir = null; }
        if (isAudio === void 0) { isAudio = true; }
        if (isEmit === void 0) { isEmit = true; }
    };
    /** 免伤 */
    Person.prototype.avoidInjury = function (time) {
        var _this = this;
        this.isAvoidInjury++;
        this.scheduleOnce(function () {
            _this.isAvoidInjury--;
        }, time);
    };
    Person.prototype.death = function () {
        this.isDeath = true;
        // 隐藏光环
        if (this.ghAniNode && this.ghAniNode.isValid) {
            this.ghAniNode.active = false;
        }
        if (this.playerMess && this.playerMess.isValid) {
            this.playerMess.active = false;
        }
        this.head_death.opacity = 255;
        // 死亡音效
        gameMgr_1.gameMgr.playEffect("death", this.node);
        this.unscheduleAllCallbacks();
        // this.ani.stop();
        // this.ani.play("die");
        this.updateAni("die");
        if (this.meleeWeapon) {
            var ani = this.meleeWeapon.getComponent(cc.Animation);
            ani && ani.stop();
        }
        this.leg.opacity = 255;
        this.leg_back.opacity = 0;
        this.head.children[0].opacity = 255;
        this.head.children[1].opacity = 0;
        if (this.curWeapon && this.curWeapon.isValid)
            this.curWeapon.node.active = false;
        if (this.rig)
            this.rig.active = false;
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.node.getComponent(cc.CircleCollider).enabled = false;
        gameMgr_1.gameMgr.deathNum++;
        if (this.isPlayer) {
            var rate = 0.3;
            cc.director.getScheduler().setTimeScale(rate);
            setTimeout(function () {
                cc.director.getScheduler().setTimeScale(1);
            }, rate * 3000);
        }
        if (CocosZ_1.cocosz.gameMode == 6) {
            if (this.isPlayer) {
                if (!gameMgr_1.gameMgr.isWin && !gameMgr_1.gameMgr.isFail) {
                    this.revivePos = this.node.getPosition();
                    this.scheduleOnce(function () {
                        CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UIRevivePanel);
                    }, 2);
                }
            }
        }
    };
    Person.prototype.revive = function () {
        if (gameMgr_1.gameMgr && !gameMgr_1.gameMgr.isWin && !gameMgr_1.gameMgr.isFail) {
            gameMgr_1.gameMgr.deathNum--;
            // 恢复光环
            if (this.ghAniNode && this.ghAniNode.isValid) {
                this.ghAniNode.active = true;
            }
            if (this.playerMess && this.playerMess.isValid) {
                this.playerMess.active = true;
            }
            if (this.rangedWeapon)
                this.rangedWeapon.getComponent(weapon_1.default).reset();
            if (this.rangedWeaponAd)
                this.rangedWeaponAd.getComponent(weapon_1.default).reset();
            // if (this.rangedWeapon) this.rangedWeapon.zIndex = 1;
            // if (this.rangedWeapon) this.rangedWeapon.angle = 0;
            if (this.meleeWeapon) {
                var ani = this.meleeWeapon.getComponent(cc.Animation);
                ani && ani.play();
            }
            if (this.curWeapon && this.curWeapon.isValid)
                this.curWeapon.node.active = true;
            this.head_death.opacity = 0;
            var pos = this.revivePos;
            this.node.setPosition(pos);
            this.HP = this.totleHp;
            this.body.setPosition(cc.v2(0, 0));
            this.body.angle = 0;
            this.leg.opacity = 255;
            this.leg_back.opacity = 0;
            this.head.children[0].opacity = 255;
            this.head.children[1].opacity = 0;
            if (this.node.scaleX < 0)
                this.node.scaleX *= -1;
            if (this.rig)
                this.rig.active = true;
            // this.node.getComponent(cc.RigidBody).enabled = true;
            this.node.getComponent(cc.BoxCollider).enabled = true;
            this.node.getComponent(cc.CircleCollider).enabled = true;
            this.isDeath = false;
            this.canMove = true;
        }
    };
    Person.prototype.creatItem = function () { };
    var Person_1;
    __decorate([
        property(cc.Material)
    ], Person.prototype, "mat_common", void 0);
    __decorate([
        property(cc.Material)
    ], Person.prototype, "mat_attacked", void 0);
    __decorate([
        property(cc.Node)
    ], Person.prototype, "body", void 0);
    __decorate([
        property(cc.Node)
    ], Person.prototype, "leg", void 0);
    __decorate([
        property(cc.Node)
    ], Person.prototype, "leg_back", void 0);
    __decorate([
        property(cc.Node)
    ], Person.prototype, "head", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Person.prototype, "hpBar", void 0);
    __decorate([
        property(cc.Node)
    ], Person.prototype, "hpSpr", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Person.prototype, "shieldBar", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Person.prototype, "atkBar", void 0);
    Person = Person_1 = __decorate([
        ccclass
    ], Person);
    return Person;
}(cc.Component));
exports.default = Person;

cc._RF.pop();