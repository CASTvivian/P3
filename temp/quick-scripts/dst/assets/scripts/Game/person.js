
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/person.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxccGVyc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUE4RDtBQUM5RCw4Q0FBNkM7QUFDN0Msa0RBQStEO0FBQy9ELHVDQUFrQztBQUNsQyxxQ0FBb0M7QUFDcEMsbUNBQThDO0FBQzlDLGFBQWE7QUFDYixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFL0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUE2dUJDO1FBNXVCRyxPQUFPO1FBQ1AsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixTQUFTO1FBQ1QsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsY0FBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGFBQU8sR0FBVyxHQUFHLENBQUM7UUFDdEIsV0FBSyxHQUFXLEdBQUcsQ0FBQztRQUVwQixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFDekIscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFFNUIsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsYUFBTyxHQUFXLENB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Q0c7SUFFckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1Q0FDRTtJQUVwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0NBQ0c7SUFFckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt5Q0FDSTtJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lDQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NkNBQ1E7SUFFakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzswQ0FDSztJQWhFYixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBNnVCMUI7SUFBRCxhQUFDO0NBN3VCRCxBQTZ1QkMsQ0E3dUJtQyxFQUFFLENBQUMsU0FBUyxHQTZ1Qi9DO2tCQTd1Qm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCB7IFBhbmVsTmFtZSwgWmluZGV4TGF5ZXIgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCBHYW1lRGF0ZSBmcm9tIFwiLi9nYW1lRGF0ZVwiO1xyXG5pbXBvcnQgeyBnYW1lTWdyIH0gZnJvbSBcIi4vZ2FtZU1nclwiO1xyXG5pbXBvcnQgV2VhcG9uLCB7IFdlYXBvblR5cGUgfSBmcm9tIFwiLi93ZWFwb25cIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc29uIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8vIOWFieeOr+eJueaViFxyXG4gICAgZ2hBbmlOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8vIOeDn+WwmOWKqOeUu+iKgueCuVxyXG4gICAgeWNBbmlOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwZXJzb25BdGs6IG51bWJlciA9IDA7XHJcbiAgICBwbGF5ZXJOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcGVyc29uTGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICBhdGtOdW06IG51bWJlciA9IDQwO1xyXG4gICAgYXRrUmFuZ2U6IG51bWJlciA9IDgwMDtcclxuICAgIGF0a1NwZWVkOiBudW1iZXIgPSA0O1xyXG4gICAgcmVsb2FkU3BlZWQ6IG51bWJlciA9IDI7XHJcbiAgICB0b3RsZUhwOiBudW1iZXIgPSAzMDA7XHJcbiAgICBjdXJIcDogbnVtYmVyID0gMzAwO1xyXG5cclxuICAgIGF0a1JhdGU6IG51bWJlciA9IDE7XHJcbiAgICBzcGVlZFJhdGU6IG51bWJlciA9IDE7XHJcbiAgICBhdGtTcGVlZFJhdGU6IG51bWJlciA9IDE7XHJcbiAgICByZWxvYWRSYXRlOiBudW1iZXIgPSAxO1xyXG4gICAgYnVsbGV0UmF0ZTogbnVtYmVyID0gMTtcclxuICAgIG1lbGVlQXRrUmF0ZTogbnVtYmVyID0gMTtcclxuICAgIGRhbWFnZVJlZHVjdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICByZWNvdmVySXRlbU51bTogbnVtYmVyID0gMDtcclxuICAgIGtpbGxOdW06IG51bWJlciA9IDA7XHJcbiAgICBjdXJLaWxsTnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIE1vdmVTcGVlZDogbnVtYmVyID0gNjAwO1xyXG4gICAgbW92ZURpcjogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG4gICAgYXRrRGlyOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcblxyXG4gICAgZm9vdE51bTogbnVtYmVyID0gMDtcclxuICAgIGxhc3RQb3M6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICAvLyDlvIDlhbNcclxuICAgIHB1YmxpYyBjYW5Nb3ZlOiBib29sZWFuID0gdHJ1ZTsvL+iDveWQpuenu+WKqFxyXG4gICAgcHVibGljIGNhbk1vdmVEaXI6IGJvb2xlYW4gPSB0cnVlOy8v6IO95ZCm5pS55Y+Y56e75Yqo5pa55ZCRXHJcblxyXG4gICAgLy8g5qOA5rWL6IyD5Zu0XHJcbiAgICBkZXRlY3RSYW5nZTogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTWF0ZXJpYWwpXHJcbiAgICBtYXRfY29tbW9uOiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTWF0ZXJpYWwpXHJcbiAgICBtYXRfYXR0YWNrZWQ6IGNjLk1hdGVyaWFsID0gbnVsbDtcclxuXHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJvZHk6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsZWc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsZWdfYmFjazogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlYWQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgaHBCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaHBTcHI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgc2hpZWxkQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBhdGtCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBoZWFkX2F0azogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBoZWFkX2hhcnQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgaGVhZF9kZWF0aDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcGxheWVyTWVzczogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBhbmk6IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gICAgaWQ6IG51bWJlciA9IDA7Ly8x546p5a62XHJcbiAgICBpc1BsYXllcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYXRrVGFyZ2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICB3ZWFwb246IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgd2VhcG9uX2RhbzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgaHBOdW1Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBnZXQgSFAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VySHA7XHJcbiAgICB9XHJcbiAgICBzZXQgSFAobnVtKSB7XHJcbiAgICAgICAgbnVtID0gTWF0aC5mbG9vcihudW0pO1xyXG4gICAgICAgIGlmIChudW0gPCAwKSBudW0gPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKG51bSA+IHRoaXMudG90bGVIcCkgbnVtID0gdGhpcy50b3RsZUhwO1xyXG4gICAgICAgIHRoaXMuY3VySHAgPSBudW07XHJcblxyXG4gICAgICAgIC8vIOihgOadoVxyXG4gICAgICAgIGlmICh0aGlzLmhwQmFyICYmIHRoaXMuaHBCYXIuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhwQmFyLnByb2dyZXNzID0gdGhpcy5jdXJIcCAvIHRoaXMudG90bGVIcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Li75Yqo5L2/55So6YGT5YW3XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLnVwZGF0ZV9tb2RlbDZfeHVlZGkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9zaGllbGQ6IG51bWJlciA9IDA7XHJcbiAgICBtYXhTaGllbGQ6IG51bWJlciA9IDEwMDtcclxuICAgIGdldCBTaGlsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoaWVsZDtcclxuICAgIH1cclxuICAgIHNldCBTaGlsZWQobnVtKSB7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMuc2hpZWxkQmFyKTtcclxuICAgICAgICB0aGlzLl9zaGllbGQgPSBudW07XHJcbiAgICAgICAgaWYgKHRoaXMuX3NoaWVsZCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hpZWxkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRCYXIubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LmdldENoaWxkQnlOYW1lKFwiYm9keVwiKS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkQmFyLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5zaGllbGRCYXIpLnRvKDAuMywgeyBwcm9ncmVzczogdGhpcy5fc2hpZWxkIC8gdGhpcy5tYXhTaGllbGQgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICByaWc6IGNjLlJpZ2lkQm9keSA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDkurrniankv6Hmga9cclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJNZXNzICYmIHRoaXMucGxheWVyTWVzcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXllck1lc3NZID0gdGhpcy5wbGF5ZXJNZXNzLnk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTWVzcy5zZXRQYXJlbnQodGhpcy5ub2RlLnBhcmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTWVzcy56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfaHA7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ocEJhciAmJiB0aGlzLmhwQmFyLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWVyTWVzc1kgPSB0aGlzLmhwQmFyLm5vZGUueTtcclxuICAgICAgICAgICAgdGhpcy5ocEJhci5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgdGhpcy5ocEJhci5ub2RlLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF9ocDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGN1clRpbWU6IG51bWJlciA9IDA7XHJcbiAgICB1cGRhdGUoZHQpIHsgfVxyXG4gICAgbGF0ZVVwZGF0ZShkdCkgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9wbGF5ZXJNZXNzWTogbnVtYmVyID0gMjAwO1xyXG4gICAgLyoqIOS6uueJqeS/oeaBryAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU1lc3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyTWVzcyAmJiB0aGlzLnBsYXllck1lc3MuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5pc1ZhbGlkICYmIHRoaXMubm9kZS5hY3RpdmUgJiYgdGhpcy5ub2RlLm9wYWNpdHkgJiYgdGhpcy5IUCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNZXNzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1lc3Muc2V0UG9zaXRpb24odGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgdGhpcy5fcGxheWVyTWVzc1kpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNZXNzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhwQmFyICYmIHRoaXMuaHBCYXIuaXNWYWxpZCAmJiB0aGlzLmhwQmFyLm5vZGUgJiYgdGhpcy5ocEJhci5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXNWYWxpZCAmJiB0aGlzLm5vZGUuYWN0aXZlICYmIHRoaXMubm9kZS5vcGFjaXR5ICYmIHRoaXMuSFApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHBCYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocEJhci5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIHRoaXMuX3BsYXllck1lc3NZKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHBCYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5YWJ546vICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlR2hBbmkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2hBbmlOb2RlICYmIHRoaXMuZ2hBbmlOb2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXNWYWxpZCAmJiB0aGlzLm5vZGUuYWN0aXZlICYmIHRoaXMubm9kZS5vcGFjaXR5ICYmIHRoaXMuSFApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2hBbmlOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdoQW5pTm9kZS5hbmdsZSA9IHRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2hBbmlOb2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSAtIDkwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2hBbmlOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDng5/lsJggKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVZY0FuaSgpIHtcclxuICAgICAgICBpZiAodGhpcy55Y0FuaU5vZGUgJiYgdGhpcy55Y0FuaU5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5pc1ZhbGlkICYmIHRoaXMubm9kZS5hY3RpdmUgJiYgdGhpcy5ub2RlLm9wYWNpdHkgJiYgdGhpcy5IUCAmJiAhdGhpcy5tb3ZlRGlyLmVxdWFscyhjYy5WZWMyLlpFUk8pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnljQW5pTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55Y0FuaU5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLngsIHRoaXMubm9kZS55IC0gNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55Y0FuaU5vZGUuc2NhbGVYID0gdGhpcy5tb3ZlRGlyLnggPiAwID8gMSA6IC0xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55Y0FuaU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY3VyU2tpbjogbnVtYmVyID0gMDtcclxuICAgIHNldFByb3BlcnR5KCkge1xyXG4gICAgICAgIHRoaXMuYW5pID0gdGhpcy5ib2R5LmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ2lyY2xlQ29sbGlkZXIpLnJhZGl1cyA9IHRoaXMuZGV0ZWN0UmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXIpIHRoaXMuYXRrUmFuZ2UgPSAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLnBlcnNvbkxldmVsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNik7XHJcbiAgICAgICAgbGV0IG51bTEgPSBXZWFwb24ubWVsZWVXYWFwb25bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogV2VhcG9uLm1lbGVlV2FhcG9uLmxlbmd0aCldO1xyXG4gICAgICAgIGxldCBudW0yID0gV2VhcG9uLnJhbmdlV2VhcG9uW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEzLyogV2VhcG9uLnJhbmdlZFdlYXBvbi5sZW5ndGggKi8pXTtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXllcikge1xyXG4gICAgICAgICAgICBudW0xID0gY29jb3N6LmRhdGFNZ3IuQ3VyTWVsZWUgKyAxO1xyXG4gICAgICAgICAgICBudW0yID0gY29jb3N6LmRhdGFNZ3IuQ3VyUmFuZ2UgKyAxO1xyXG4gICAgICAgICAgICBpZiAoY29jb3N6LmdhbWVNZ3IuZ2FtZUN0ci5jdXJVc2VTa2luSWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1clNraW4gPSBjb2Nvc3ouZGF0YU1nci5DdXJTa2luSWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1clNraW4gPSBjb2Nvc3ouZ2FtZU1nci5nYW1lQ3RyLmN1clVzZVNraW5JZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhlYWQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bdGhpcy5jdXJTa2luXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaGVhZDEgPSB0aGlzLmhlYWQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bdGhpcy5jdXJTa2luXTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkLmNoaWxkcmVuWzFdLmNoaWxkcmVuW3RoaXMuY3VyU2tpbl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhlYWQyID0gdGhpcy5oZWFkLmNoaWxkcmVuWzFdLmNoaWxkcmVuW3RoaXMuY3VyU2tpbl07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmhlYWQuY2hpbGRyZW5bMF0uY2hpbGRyZW5Db3VudCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFkLmNoaWxkcmVuWzBdLmNoaWxkcmVuW2ldLnV1aWQgIT0gaGVhZDEudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZC5jaGlsZHJlblswXS5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaGVhZC5jaGlsZHJlblsxXS5jaGlsZHJlbkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWQuY2hpbGRyZW5bMV0uY2hpbGRyZW5baV0udXVpZCAhPSBoZWFkMi51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkLmNoaWxkcmVuWzFdLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDooajmg4Uo54i26IqC54K56K6+572u5Li65q2j6IS4KVxyXG4gICAgICAgICAgICB0aGlzLmhlYWRfYXRrID0gdGhpcy5oZWFkLmNoaWxkcmVuWzJdLmNoaWxkcmVuW3RoaXMuY3VyU2tpbl07XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZF9hdGsuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2F0ay5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2hhcnQgPSB0aGlzLmhlYWQuY2hpbGRyZW5bM10uY2hpbGRyZW5bdGhpcy5jdXJTa2luXTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2hhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2hhcnQub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZF9kZWF0aCA9IHRoaXMuaGVhZC5jaGlsZHJlbls0XS5jaGlsZHJlblt0aGlzLmN1clNraW5dO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRfZGVhdGguYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2RlYXRoLm9wYWNpdHkgPSAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oZWFkX2F0ay5zZXRQYXJlbnQodGhpcy5oZWFkLmNoaWxkcmVuWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2hhcnQuc2V0UGFyZW50KHRoaXMuaGVhZC5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZF9kZWF0aC5zZXRQYXJlbnQodGhpcy5oZWFkLmNoaWxkcmVuWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2F0ay56SW5kZXggPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRfaGFydC56SW5kZXggPSAyO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRfZGVhdGguekluZGV4ID0gMztcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5aSa5L2Z6KGo5oOFXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5jaGlsZHJlblsyXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5jaGlsZHJlblszXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5jaGlsZHJlbls0XS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBlcnNvbkxldmVsID0gY29jb3N6LmRhdGFNZ3IuZ2V0U2tpbkluZm8odGhpcy5jdXJTa2luKS5MZXZlbDtcclxuICAgICAgICAgICAgdGhpcy5wZXJzb25BdGsgPSBHYW1lRGF0ZS5Ta2luTWVzc1tgJHt0aGlzLmN1clNraW4gKyAxfWBdLmF0a1t0aGlzLnBlcnNvbkxldmVsXTtcclxuICAgICAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGxlSHAgPSBHYW1lRGF0ZS5Ta2luTWVzc1tgJHt0aGlzLmN1clNraW4gKyAxfWBdLnh1ZWRpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RsZUhwID0gR2FtZURhdGUuU2tpbk1lc3NbYCR7dGhpcy5jdXJTa2luICsgMX1gXS5ocFt0aGlzLnBlcnNvbkxldmVsXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDnjqnlrrbooYDph4/lop7liqBcclxuICAgICAgICAgICAgaWYgKFsxLCAyLCA0XS5pbmNsdWRlcyhjb2Nvc3ouZ2FtZU1vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGxlSHAgKj0gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICgzID09IGNvY29zei5nYW1lTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvY29zei5jdXJMZXZlbCA+PSAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90bGVIcCAqPSA5O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2Nvc3ouY3VyTGV2ZWwgPj0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGxlSHAgKj0gODtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29jb3N6LmN1ckxldmVsID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGxlSHAgKj0gNjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RsZUhwICo9IDQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoNSA9PSBjb2Nvc3ouZ2FtZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90bGVIcCAqPSA2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKDcgPT0gY29jb3N6LmdhbWVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGxlSHAgKj0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkhQID0gdGhpcy50b3RsZUhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgfVxyXG4gICAgICAgIC8vIOWIneWni+atpuWZqFxyXG4gICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1BsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROZXdXZWFwb24oMTQgLSAxKTsvLyDnjqnlrrblm7rlrprmnKjmo5JcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV3V2VhcG9uKG51bTEgLSAxKTsvLyDmlYzkurrpmo/mnLrov5HmiJjmrablmahcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUN1cldlYXBvbih0aGlzLm1lbGVlV2VhcG9uLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSA9PT0gNykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROZXdXZWFwb24obnVtMiAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROZXdXZWFwb24obnVtMSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROZXdXZWFwb24obnVtMiAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ3VyV2VhcG9uKHRoaXMucmFuZ2VkV2VhcG9uLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vIOW5v+WRiui/nOeoi+atpuWZqFxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1BsYXllciAvKiAmJiBjb2Nvc3ouaXNTaG93QWQgKi8pIHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGdhbWVNZ3IucmFuZ2VkV2VhcG9uQWRNZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoV2VhcG9uQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kZWxheSgxMClcclxuICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKClcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDooYDmnaFcclxuICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgdGhpcy5ocEJhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmF0a0Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDop5LoibLpgJ/luqZcclxuICAgICAgICB0aGlzLk1vdmVTcGVlZCA9IDIwMCArIEdhbWVEYXRlLlNraW5NZXNzW2Ake3RoaXMuY3VyU2tpbiArIDF9YF0uc3BlZWRbdGhpcy5wZXJzb25MZXZlbF07XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHsgdGhpcy5Nb3ZlU3BlZWQgLz0gMjsgfVxyXG4gICAgICAgIC8vIOWFieeOr1xyXG4gICAgICAgIGlmICh0aGlzLnBlcnNvbkxldmVsID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdoQW5pTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW1wiXCIsIFwieVwiLCBcInBcIiwgXCJyXCJdO1xyXG4gICAgICAgICAgICBsZXQgZ2hBbmkgPSB0aGlzLmdoQW5pTm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICBpZiAoZ2hBbmkpIHtcclxuICAgICAgICAgICAgICAgIGdoQW5pLnNldFNraW4oYXJyW01hdGguY2VpbCh0aGlzLnBlcnNvbkxldmVsIC8gMildKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2hBbmlOb2RlLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgICAgICAgIGxldCBnaEFuaSA9IHRoaXMuZ2hBbmlOb2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIGdoQW5pLnNldFNraW4oXCJyXCIpO1xyXG4gICAgICAgICAgICBnaEFuaS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMucGxheWVyTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllck5hbWUgPSBpMThuLnQoXCJnYW1lLnBsYXllclwiKSArIHRoaXMuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5wbGF5ZXJNZXNzLmdldENoaWxkQnlOYW1lKFwibmFtZUxhYmVsXCIpO1xyXG4gICAgICAgIGlmIChuYW1lKSBuYW1lLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3RQb3MgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDop4bpopHmrablmaggKi9cclxuICAgIHdlYXBvbkFkQXJyID0gWzksIDEwLCAxNCwgMTcsIDE4XTtcclxuICAgIHdlYXBvbkFkSW5kZXg6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMud2VhcG9uQWRBcnIubGVuZ3RoKTtcclxuICAgIHJlZnJlc2hXZWFwb25BZCgpIHtcclxuICAgICAgICBpZiAoY29jb3N6LmlzUGF1c2UgfHwgIXRoaXMuaXNQbGF5ZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKCsrdGhpcy53ZWFwb25BZEluZGV4ID49IHRoaXMud2VhcG9uQWRBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uQWRJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3ZWFwb25OdW0gPSB0aGlzLndlYXBvbkFkQXJyW3RoaXMud2VhcG9uQWRJbmRleF07XHJcbiAgICAgICAgbGV0IHN0ciA9IFdlYXBvbi5XZWFwb25OYW1lW3dlYXBvbk51bV07XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwid2VhcG9uX1wiICsgc3RyLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBuZXdfd2VhcG9uID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBsZXQgbmV3X3dlYXBvblRzOiBXZWFwb24gPSBuZXdfd2VhcG9uLmdldENvbXBvbmVudChXZWFwb24pO1xyXG4gICAgICAgIC8vIOWIneWni+WMllxyXG4gICAgICAgIG5ld193ZWFwb25Ucy5wZXJzb24gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYm9keS5hZGRDaGlsZChuZXdfd2VhcG9uKTtcclxuICAgICAgICBuZXdfd2VhcG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5ld193ZWFwb25Ucy53ZWFwb25UeXBlID0gV2VhcG9uVHlwZS53ZWFwb25fcmFuZ2VBZDtcclxuICAgICAgICB0aGlzLnJhbmdlZFdlYXBvbkFkICYmIHRoaXMucmFuZ2VkV2VhcG9uQWQuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uQWQgPSBuZXdfd2VhcG9uO1xyXG4gICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uQWROdW0gPSBuZXdfd2VhcG9uVHMud2VhcG9uTnVtO1xyXG5cclxuICAgICAgICBsZXQgc3RyMiA9IFwid19cIiArIFdlYXBvbi5XZWFwb25OYW1lW3RoaXMucmFuZ2VkV2VhcG9uQWROdW0gLSAxXTtcclxuICAgICAgICBsZXQgc3ByMiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKHN0cjIsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICBnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcy5jaGlsZHJlblszXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcjI7XHJcbiAgICAgICAgZ2FtZU1nci5yYW5nZWRXZWFwb25BZE1lc3MuY2hpbGRyZW5bNF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcIndfXCIgKyAod2VhcG9uTnVtICsgMSksIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICBnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcy5jaGlsZHJlbls1XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5ld193ZWFwb25Ucy5hdGtOdW0udG9TdHJpbmcoKTtcclxuICAgICAgICBuZXdfd2VhcG9uVHMuc2V0QnVsbGV0VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBtZWxlZVdlYXBvbk51bTogbnVtYmVyID0gMztcclxuICAgIHJhbmdlZFdlYXBvbk51bTogbnVtYmVyID0gMTtcclxuICAgIHJhbmdlZFdlYXBvbkFkTnVtOiBudW1iZXIgPSAxO1xyXG4gICAgbWVsZWVXZWFwb246IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcmFuZ2VkV2VhcG9uOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHJhbmdlZFdlYXBvbkFkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGN1cldlYXBvbjogV2VhcG9uID0gbnVsbDtcclxuICAgIHN0YXJ0UG9zTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBzZXROZXdXZWFwb24od2VhcG9uTnVtOiBudW1iZXIgPSB0aGlzLm5ld1dlYXBvbikge1xyXG4gICAgICAgIGlmICh3ZWFwb25OdW0gPCAwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHN0ciA9IFdlYXBvbi5XZWFwb25OYW1lW3dlYXBvbk51bV07XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwid2VhcG9uX1wiICsgc3RyLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBuZXdfd2VhcG9uID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBsZXQgbmV3X3dlYXBvblRzOiBXZWFwb24gPSBuZXdfd2VhcG9uLmdldENvbXBvbmVudChXZWFwb24pO1xyXG4gICAgICAgIG5ld193ZWFwb25Ucy5wZXJzb24gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYm9keS5hZGRDaGlsZChuZXdfd2VhcG9uKTtcclxuICAgICAgICBuZXdfd2VhcG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChuZXdfd2VhcG9uVHMuaXNSYW5nZVdlYXBvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24gJiYgdGhpcy5jdXJXZWFwb24ud2VhcG9uVHlwZSA9PSBXZWFwb25UeXBlLndlYXBvbl9yYW5nZUFkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDorr7nva7lub/lkYrov5znqItcclxuICAgICAgICAgICAgICAgIG5ld193ZWFwb25Ucy53ZWFwb25UeXBlID0gV2VhcG9uVHlwZS53ZWFwb25fcmFuZ2VBZDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uQWQgJiYgdGhpcy5yYW5nZWRXZWFwb25BZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlZFdlYXBvbkFkID0gbmV3X3dlYXBvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uQWROdW0gPSBuZXdfd2VhcG9uVHMud2VhcG9uTnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyMiA9IFwid19cIiArIFdlYXBvbi5XZWFwb25OYW1lW3RoaXMucmFuZ2VkV2VhcG9uQWROdW0gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByMiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKHN0cjIsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcy5jaGlsZHJlblszXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5yYW5nZWRXZWFwb25BZE1lc3MuY2hpbGRyZW5bNF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcIndfXCIgKyAod2VhcG9uTnVtICsgMSksIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcy5jaGlsZHJlbls1XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5ld193ZWFwb25Ucy5hdGtOdW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfd2VhcG9uVHMuc2V0QnVsbGV0VUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOiuvue9rui/nOeoi1xyXG4gICAgICAgICAgICAgICAgbmV3X3dlYXBvblRzLndlYXBvblR5cGUgPSBXZWFwb25UeXBlLndlYXBvbl9yYW5nZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uICYmIHRoaXMucmFuZ2VkV2VhcG9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uID0gbmV3X3dlYXBvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VkV2VhcG9uTnVtID0gbmV3X3dlYXBvblRzLndlYXBvbk51bTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cjIgPSBcIndfXCIgKyBXZWFwb24uV2VhcG9uTmFtZVt0aGlzLnJhbmdlZFdlYXBvbk51bSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHIyID0gY29jb3N6LnJlc01nci5nZXRSZXMoc3RyMiwgY2MuU3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucmFuZ2VkV2VhcG9uTWVzcy5jaGlsZHJlblszXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5yYW5nZWRXZWFwb25NZXNzLmNoaWxkcmVuWzRdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ3X1wiICsgKHdlYXBvbk51bSArIDEpLCBjYy5TcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5yYW5nZWRXZWFwb25NZXNzLmNoaWxkcmVuWzVdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbmV3X3dlYXBvblRzLmF0a051bS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld193ZWFwb25Ucy5zZXRCdWxsZXRVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDorr7nva7ov5HmiJhcclxuICAgICAgICAgICAgbmV3X3dlYXBvblRzLndlYXBvblR5cGUgPSBXZWFwb25UeXBlLndlYXBvbl9tZWxlZTtcclxuICAgICAgICAgICAgdGhpcy5tZWxlZVdlYXBvbiAmJiB0aGlzLm1lbGVlV2VhcG9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5tZWxlZVdlYXBvbiA9IG5ld193ZWFwb247XHJcbiAgICAgICAgICAgIHRoaXMubWVsZWVXZWFwb25OdW0gPSBuZXdfd2VhcG9uVHMud2VhcG9uTnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmm7/mjaLlvZPliY3mrablmahcclxuICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24gJiYgdGhpcy5jdXJXZWFwb24uaXNSYW5nZVdlYXBvbiA9PT0gbmV3X3dlYXBvblRzLmlzUmFuZ2VXZWFwb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDdXJXZWFwb24obmV3X3dlYXBvbiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDplIDmr4HmrablmajpgZPlhbdcclxuICAgICAgICB0aGlzLm5ld1dlYXBvbiA9IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld1dlYXBvbkl0ZW0gJiYgdGhpcy5uZXdXZWFwb25JdGVtLmlzVmFsaWQpIHRoaXMubmV3V2VhcG9uSXRlbS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5uZXdXZWFwb25JdGVtID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0VGltZTogbnVtYmVyID0gMDtcclxuICAgIGNoYW5nZUN1cldlYXBvbihuZXdXZWFwb25Ob2RlOiBjYy5Ob2RlLCBpc0NoZWNrOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICghbmV3V2VhcG9uTm9kZSB8fCAhbmV3V2VhcG9uTm9kZS5pc1ZhbGlkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyV2VhcG9uICYmIHRoaXMuY3VyV2VhcG9uLmlzVmFsaWQgJiYgbmV3V2VhcG9uTm9kZSA9PSB0aGlzLmN1cldlYXBvbi5ub2RlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGN1clRpbWUgPSBOdW1iZXIobmV3IERhdGUoKSk7XHJcbiAgICAgICAgaWYgKGlzQ2hlY2sgJiYgKGN1clRpbWUgLSB0aGlzLmxhc3RUaW1lIDwgMTAwMCkpIHJldHVybjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gY3VyVGltZTtcclxuICAgICAgICAvLyDliIfmjaLmrablmajmmL7npLpcclxuICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24gJiYgY2MuaXNWYWxpZCh0aGlzLmN1cldlYXBvbikpIHRoaXMuY3VyV2VhcG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbmV3V2VhcG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIOWIh+aNouW9k+WJjeatpuWZqFxyXG4gICAgICAgIGxldCBuZXdXZWFwaW5UcyA9IG5ld1dlYXBvbk5vZGUuZ2V0Q29tcG9uZW50KFdlYXBvbik7XHJcbiAgICAgICAgaWYgKG5ld1dlYXBpblRzKSB7XHJcbiAgICAgICAgICAgIC8vIFVJ5pWI5p6cXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3V2VhcGluTWVzczogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3V2VhcGluVHMud2VhcG9uVHlwZSA9PSBXZWFwb25UeXBlLndlYXBvbl9tZWxlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IuQnRuQnVsbGV0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdXZWFwaW5Ucy53ZWFwb25UeXBlID09IFdlYXBvblR5cGUud2VhcG9uX3JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V2VhcGluTWVzcyA9IGdhbWVNZ3IucmFuZ2VkV2VhcG9uTWVzcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3V2VhcGluVHMud2VhcG9uVHlwZSA9PSBXZWFwb25UeXBlLndlYXBvbl9yYW5nZUFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V2VhcGluTWVzcyA9IGdhbWVNZ3IucmFuZ2VkV2VhcG9uQWRNZXNzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3V2VhcGluTWVzcy5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbiAmJiB0aGlzLmN1cldlYXBvbi5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlFZmZlY3QoXCJjaGFuZ2VXZWFwb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFdlYXBpbk1lc3M6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbi53ZWFwb25UeXBlID09IFdlYXBvblR5cGUud2VhcG9uX21lbGVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cldlYXBvbi53ZWFwb25UeXBlID09IFdlYXBvblR5cGUud2VhcG9uX3JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFdlYXBpbk1lc3MgPSBnYW1lTWdyLnJhbmdlZFdlYXBvbk1lc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cldlYXBvbi53ZWFwb25UeXBlID09IFdlYXBvblR5cGUud2VhcG9uX3JhbmdlQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkV2VhcGluTWVzcyA9IGdhbWVNZ3IucmFuZ2VkV2VhcG9uQWRNZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkV2VhcGluTWVzcyAhPT0gbmV3V2VhcGluTWVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRXZWFwaW5NZXNzLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRXZWFwaW5NZXNzLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG9sZFdlYXBpbk1lc3MuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KHsgZmlsbFJhbmdlOiAtMSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDEsIHsgZmlsbFJhbmdlOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFdlYXBpbk1lc3MuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRXZWFwaW5NZXNzLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5byA54Gr54K5XHJcbiAgICAgICAgICAgIGlmIChuZXdXZWFwaW5Ucy5pc1JhbmdlV2VhcG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9zTm9kZSA9IG5ld1dlYXBvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFBvc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbiA9IG5ld1dlYXBpblRzO1xyXG4gICAgICAgICAgICB0aGlzLmF0a051bSA9IHRoaXMuY3VyV2VhcG9uLmF0a051bSAqICh0aGlzLmN1cldlYXBvbi5pc1JhbmdlV2VhcG9uID8gMSA6IHRoaXMubWVsZWVBdGtSYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5hdGtTcGVlZCA9IHRoaXMuY3VyV2VhcG9uLmF0a1NwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFNwZWVkID0gdGhpcy5jdXJXZWFwb24ucmVsb2FkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGF0a1N0YXJ0KCkgeyB9XHJcblxyXG4gICAgYXRrRW5lbXkoKSB7IH1cclxuXHJcbiAgICBhdGtDb21wbGV0ZSgpIHsgfVxyXG5cclxuICAgIHNldFdlYXBvbkFuZ2xlKGRpcjogY2MuVmVjMikge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cldlYXBvbiAmJiB0aGlzLmN1cldlYXBvbi5pc1ZhbGlkICYmIHRoaXMuY3VyV2VhcG9uLmlzUmFuZ2VXZWFwb24pIHtcclxuICAgICAgICAgICAgaWYgKGRpci5lcXVhbHMoY2MuVmVjMi5aRVJPKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24ubm9kZS5hbmdsZSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24ubm9kZS5hbmdsZSA9IGNjLnYyKGRpcikuc2lnbkFuZ2xlKGNjLnYyKC0xLCAwKSkgLyBNYXRoLlBJICogMTgwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5ub2RlLmFuZ2xlID0gLWNjLnYyKGRpcikuc2lnbkFuZ2xlKGNjLnYyKDEsIDApKSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyLnkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyV2VhcG9uLm5vZGUpIHRoaXMucmFuZ2VkV2VhcG9uLnpJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24ubm9kZSkgdGhpcy5yYW5nZWRXZWFwb24uekluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYW5pTmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDliqjnlLvlkI3lrZcgXHJcbiAgICAgKiBAcGFyYW0gZW5mb3JjZSDlvLrliLbmkq3mlL5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlQW5pKG5hbWU/OiBzdHJpbmcsIGVuZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChlbmZvcmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlBbmkobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdhbWVNZ3IuaXNHYW1lU3RhcnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWF0aCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IFwiZGllXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlRGlyLmVxdWFscyhjYy5WZWMyLlpFUk8pKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gXCJkYWlqaV9ib2R5XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gXCJydW5fYm9keVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlBbmkobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3BsYXlBbmkobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgJiYgbmFtZSAhPSB0aGlzLl9hbmlOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJTcGVlZCgpIHtcclxuICAgICAgICBsZXQgc3BlZWQ6IG51bWJlciA9IHRoaXMuTW92ZVNwZWVkICogdGhpcy5zcGVlZFJhdGUgKiAodGhpcy5jdXJXZWFwb24gJiYgdGhpcy5jdXJXZWFwb24uaXNSYW5nZVdlYXBvbiA/IDEgOiAxLjIpO1xyXG4gICAgICAgIGlmIChzcGVlZCA+IDEwMDApIHNwZWVkID0gMTAwMDtcclxuICAgICAgICByZXR1cm4gc3BlZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBdGs6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHVkcGF0ZVJCb2R5KGRpcjogY2MuVmVjMikge1xyXG4gICAgICAgIGlmICh0aGlzLnJpZy50eXBlID09IGNjLlJpZ2lkQm9keVR5cGUuRHluYW1pYykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5Nb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpci5lcXVhbHMoY2MuVmVjMi5aRVJPKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnLmxpbmVhclZlbG9jaXR5ID0gZGlyLm11bCh0aGlzLmdldEN1clNwZWVkKCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZy5saW5lYXJWZWxvY2l0eSA9IGNjLlZlYzIuWkVSTztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQZXJzb24oKSB7XHJcbiAgICAgICAgbGV0IGRpciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuYXRrRGlyICYmICF0aGlzLmF0a0Rpci5lcXVhbHMoY2MuVmVjMi5aRVJPKSkge1xyXG4gICAgICAgICAgICBkaXIgPSB0aGlzLmF0a0RpcjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW92ZURpciAmJiAhdGhpcy5tb3ZlRGlyLmVxdWFscyhjYy5WZWMyLlpFUk8pKSB7XHJcbiAgICAgICAgICAgIGRpciA9IHRoaXMubW92ZURpcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGlyLnggPCAwKSB0aGlzLmJvZHkuc2NhbGVYID0gLU1hdGguYWJzKHRoaXMuYm9keS5zY2FsZVgpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5ib2R5LnNjYWxlWCA9IE1hdGguYWJzKHRoaXMuYm9keS5zY2FsZVgpO1xyXG5cclxuICAgICAgICBpZiAoZGlyLnkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVnX2JhY2sub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgdGhpcy5sZWcub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5jaGlsZHJlblsxXS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQuY2hpbGRyZW5bMF0ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxlZ19iYWNrLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmxlZy5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQuY2hpbGRyZW5bMF0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkLmNoaWxkcmVuWzFdLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDov5znqIvmrablmahcclxuICAgICAgICB0aGlzLnNldFdlYXBvbkFuZ2xlKGRpcik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQXRrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmF0a0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgZHQgPSAxMDAwO1xyXG4gICAgICAgICAgICBsZXQgbiA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXRrTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzID0gdGhpcy5hdGtMaXN0W2ldLmdldENvbXBvbmVudChQZXJzb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0MiA9IHRoaXMuYXRrTGlzdFtpXS5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZHQyIDwgZHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkdCA9IGR0MjtcclxuICAgICAgICAgICAgICAgICAgICBuID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0a0RpciA9IGNjLnYyKHRoaXMuYXRrTGlzdFtuXS5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkubm9ybWFsaXplKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdGtUYXJnZXQgPSB0aGlzLmF0a0xpc3Rbbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0a0RpciA9IHRoaXMubW92ZURpci5tYWcoKSA9PSAwID8gdGhpcy5hdGtEaXIgOiBjYy52Mih0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF0a0RpciA9IHRoaXMubW92ZURpci5tYWcoKSA9PSAwID8gdGhpcy5hdGtEaXIgOiBjYy52Mih0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdGtMaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIGN1ckl0ZW06IG51bWJlciA9IDA7XHJcbiAgICBjdXJJdGVtRWZmZWN0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIGl0ZW1UYXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGdyYXNzSUQ6IG51bWJlciA9IDA7XHJcbiAgICBob3VzZUlEOiBudW1iZXIgPSAwO1xyXG4gICAgaXNJbkhvdXNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyAwOuajgOa1i+eisOaSnu+8mzE65qOA5rWL5a2Q5by577ybMjrmo4DmtYvlnKjlsYLnuqfkuIvvvIwzOuajgOa1i+WcqOWxgue6p+S4ilxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7IH1cclxuICAgIG5ld1dlYXBvbjogbnVtYmVyID0gLTE7XHJcbiAgICBuZXdXZWFwb25JdGVtOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBvaXNvbkNvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIG9uQ29sbGlzaW9uRXhpdChvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7IH1cclxuXHJcbiAgICBpc0RlYXRoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc0F0dGFja2VkRWZmZWN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBtYXhOdW06IG51bWJlciA9IDA7XHJcbiAgICAvKiog5Y+X5LykICovXHJcbiAgICBoYXJ0KGF0a051bTogbnVtYmVyLCBmcm9tOiBjYy5Ob2RlLCBkaXI6IGNjLlZlYzIgPSBudWxsLCBpc0F1ZGlvOiBib29sZWFuID0gdHJ1ZSwgaXNFbWl0OiBib29sZWFuID0gdHJ1ZSwgbGFiZWxDb2xvcj86IGNjLkNvbG9yKSB7IH1cclxuXHJcbiAgICBpc0F2b2lkSW5qdXJ5OiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOWFjeS8pCAqL1xyXG4gICAgYXZvaWRJbmp1cnkodGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pc0F2b2lkSW5qdXJ5Kys7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQXZvaWRJbmp1cnktLTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBraWxsZXI6IGFueSA9IG51bGw7XHJcbiAgICBkZWF0aCgpIHtcclxuICAgICAgICB0aGlzLmlzRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIC8vIOmakOiXj+WFieeOr1xyXG4gICAgICAgIGlmICh0aGlzLmdoQW5pTm9kZSAmJiB0aGlzLmdoQW5pTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2hBbmlOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJNZXNzICYmIHRoaXMucGxheWVyTWVzcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTWVzcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZWFkX2RlYXRoLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgLy8g5q275Lqh6Z+z5pWIXHJcbiAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KFwiZGVhdGhcIiwgdGhpcy5ub2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgLy8gdGhpcy5hbmkuc3RvcCgpO1xyXG4gICAgICAgIC8vIHRoaXMuYW5pLnBsYXkoXCJkaWVcIik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBbmkoXCJkaWVcIik7XHJcbiAgICAgICAgaWYgKHRoaXMubWVsZWVXZWFwb24pIHtcclxuICAgICAgICAgICAgbGV0IGFuaSA9IHRoaXMubWVsZWVXZWFwb24uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGFuaSAmJiBhbmkuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxlZy5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubGVnX2JhY2sub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5oZWFkLmNoaWxkcmVuWzBdLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5oZWFkLmNoaWxkcmVuWzFdLm9wYWNpdHkgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24gJiYgdGhpcy5jdXJXZWFwb24uaXNWYWxpZCkgdGhpcy5jdXJXZWFwb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5yaWcpIHRoaXMucmlnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNpcmNsZUNvbGxpZGVyKS5lbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGdhbWVNZ3IuZGVhdGhOdW0rKztcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXllcikge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZSA9IDAuMztcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2V0VGltZVNjYWxlKHJhdGUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNldFRpbWVTY2FsZSgxKTtcclxuICAgICAgICAgICAgfSwgcmF0ZSAqIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZ2FtZU1nci5pc1dpbiAmJiAhZ2FtZU1nci5pc0ZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldml2ZVBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVUlSZXZpdmVQYW5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXZpdmUoKSB7XHJcbiAgICAgICAgaWYgKGdhbWVNZ3IgJiYgIWdhbWVNZ3IuaXNXaW4gJiYgIWdhbWVNZ3IuaXNGYWlsKSB7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IuZGVhdGhOdW0tLTtcclxuICAgICAgICAgICAgLy8g5oGi5aSN5YWJ546vXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdoQW5pTm9kZSAmJiB0aGlzLmdoQW5pTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdoQW5pTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllck1lc3MgJiYgdGhpcy5wbGF5ZXJNZXNzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTWVzcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlZFdlYXBvbikgdGhpcy5yYW5nZWRXZWFwb24uZ2V0Q29tcG9uZW50KFdlYXBvbikucmVzZXQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VkV2VhcG9uQWQpIHRoaXMucmFuZ2VkV2VhcG9uQWQuZ2V0Q29tcG9uZW50KFdlYXBvbikucmVzZXQoKTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMucmFuZ2VkV2VhcG9uKSB0aGlzLnJhbmdlZFdlYXBvbi56SW5kZXggPSAxO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5yYW5nZWRXZWFwb24pIHRoaXMucmFuZ2VkV2VhcG9uLmFuZ2xlID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVsZWVXZWFwb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmkgPSB0aGlzLm1lbGVlV2VhcG9uLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgYW5pICYmIGFuaS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyV2VhcG9uICYmIHRoaXMuY3VyV2VhcG9uLmlzVmFsaWQpIHRoaXMuY3VyV2VhcG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkX2RlYXRoLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5yZXZpdmVQb3M7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gdGhpcy50b3RsZUhwO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5hbmdsZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubGVnLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIHRoaXMubGVnX2JhY2sub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhlYWQuY2hpbGRyZW5bMF0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkLmNoaWxkcmVuWzFdLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLnNjYWxlWCA8IDApIHRoaXMubm9kZS5zY2FsZVggKj0gLTE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5yaWcpIHRoaXMucmlnLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ2lyY2xlQ29sbGlkZXIpLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc0RlYXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpbmRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcmV2aXZlUG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcblxyXG4gICAgY3JlYXRJdGVtKCkgeyB9XHJcbn1cclxuIl19