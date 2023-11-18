"use strict";
cc._RF.push(module, '76f86dlCpdKv7l4KtsVUJq2', 'weapon');
// scripts/Game/weapon.ts

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
exports.WeaponType = void 0;
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var Msg_1 = require("../Framework/Msg");
var gameDate_1 = require("./gameDate");
var gameMgr_1 = require("./gameMgr");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["weapon_melee"] = 0] = "weapon_melee";
    WeaponType[WeaponType["weapon_range"] = 1] = "weapon_range";
    WeaponType[WeaponType["weapon_rangeAd"] = 2] = "weapon_rangeAd";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.can_effect_hit = false;
        _this.hand_effect = null;
        _this.hand_2 = null;
        _this.weaponNum = 1;
        _this.bullet = null;
        _this.bulletCollor = cc.Color.WHITE;
        _this.shellCall = null;
        _this.atkEffect = null;
        _this.atkNum = 10;
        _this.atkRangeNum = 1000;
        _this.flySpeed = 2000;
        _this.atkSpeed = 0.4;
        _this.bulletNum = 5;
        _this.bulletTotal = 5;
        _this.reload = 3;
        _this.audioName = "read";
        _this.weaponLevel = 0;
        _this.weaponType = WeaponType.weapon_melee;
        // 武器拥有者
        _this.person = null;
        // 子弹
        _this._curBullet = 0;
        _this._arrName = ["", "y", "p", "r"];
        // 装弹效果
        _this._isReload = false;
        return _this;
    }
    Weapon_1 = Weapon;
    Object.defineProperty(Weapon.prototype, "isRangeWeapon", {
        // 是否是远程武器
        get: function () {
            return Weapon_1.rangeWeapon.includes(this.weaponNum);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Weapon.prototype, "curBullet", {
        get: function () {
            return this._curBullet;
        },
        set: function (v) {
            if (v > this.bulletNum) {
                v = this.bulletNum;
            }
            else if (v < 0) {
                v = 0;
            }
            // 远程武器
            if (this.isRangeWeapon) {
                this._curBullet = v;
                // 装弹
                if (this._curBullet <= 0) {
                    this.reloadBullet();
                }
                // 设置子弹UI
                this.setBulletUI();
            }
        },
        enumerable: false,
        configurable: true
    });
    Weapon.prototype.onLoad = function () {
        // 等级
        if (!this.person || this.person.isPlayer) {
            this.weaponLevel = CocosZ_1.cocosz.dataMgr.getGunInfo(this.weaponNum - 1).Level;
        }
        else if ([1, 2, 3, 4, 5].includes(CocosZ_1.cocosz.gameMode)) {
            this.weaponLevel = Math.floor(Math.random() * 4);
        }
        this.atkNum = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].atk[this.weaponLevel];
        this.atkSpeed = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].atkSpeed[this.weaponLevel];
        this.bulletNum = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].bulletNum;
        this.bulletTotal = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].bulletTotal[this.weaponLevel];
        this.reload = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].reload;
        this.atkRangeNum = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].atkRange;
        if (this.person)
            this.bulletTotal = Math.ceil(this.bulletTotal * this.person.bulletRate);
        // 装弹
        this._curBullet = 0;
        this.addBullet();
        this.setSD();
    };
    Weapon.prototype.start = function () { };
    Weapon.prototype.setBulletUI = function () {
        // UI更新子弹数
        if (this.person && this.person.isPlayer) {
            if (this.weaponType == WeaponType.weapon_range) {
                if (gameMgr_1.gameMgr.ammo && gameMgr_1.gameMgr.ammo.isValid)
                    gameMgr_1.gameMgr.ammo.string = this._curBullet + "/" + ([6, 7].includes(CocosZ_1.cocosz.gameMode) ? "♾" : this.bulletTotal);
            }
            else if (this.weaponType == WeaponType.weapon_rangeAd) {
                if (gameMgr_1.gameMgr.ammoAd && gameMgr_1.gameMgr.ammoAd.isValid)
                    gameMgr_1.gameMgr.ammoAd.string = this._curBullet + "/" + ([6, 7].includes(CocosZ_1.cocosz.gameMode) ? "♾" : this.bulletTotal);
            }
        }
    };
    Weapon.prototype.setSD = function () {
        var _this = this;
        // 闪电颜色
        if (this.person) {
            this.node.walk(function (child) {
                if (child.name == "sd") {
                    if (_this.weaponLevel > 0) {
                        child.active = true;
                        var spAni = child.getComponent(sp.Skeleton);
                        spAni && spAni.setSkin(_this._arrName[_this.weaponLevel]);
                    }
                    else {
                        child.active = false;
                    }
                }
            }, null);
        }
    };
    // 重置子弹
    Weapon.prototype.reset = function () {
        this.bulletTotal = gameDate_1.default.Weapon[Weapon_1.WeaponName[this.weaponNum - 1]].bulletTotal[this.weaponLevel];
        if (this.person) {
            this.bulletTotal = Math.ceil(this.bulletTotal * this.person.bulletRate);
        }
        this._curBullet = 0;
        this.addBullet();
    };
    // 装弹
    Weapon.prototype.addBullet = function () {
        if (this.isRangeWeapon) {
            if (this.person && this.person.isPlayer) {
                // 子弹小于弹夹数量, 且还有备弹
                if (this.curBullet < this.bulletNum && this.bulletTotal > 0) {
                    if ([6, 7].includes(CocosZ_1.cocosz.gameMode)) {
                        this.curBullet = this.bulletNum;
                        cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Bullet_Reload });
                    }
                    else {
                        var n = this.bulletNum - this.curBullet;
                        if (this.bulletTotal >= n) {
                            // 子弹足够
                            this.bulletTotal -= n;
                            this.curBullet += n;
                        }
                        else {
                            // 子弹不够
                            this.bulletTotal = 0;
                            this.curBullet += this.bulletTotal;
                        }
                    }
                }
            }
            else {
                this.curBullet = this.bulletNum;
            }
        }
    };
    Weapon.prototype.reloadBullet = function () {
        var _this = this;
        if (this.isRangeWeapon && this._isReload == false) {
            this._isReload = true;
            if (this.person && this.person.isPlayer) {
                if (this.bulletTotal > 0) {
                    // 音效
                    CocosZ_1.cocosz.audioMgr.playEffect("reload");
                    // 动作
                    var y_back_1 = 0;
                    if (this.hand_effect) {
                        y_back_1 = this.hand_effect.y;
                        cc.tween(this.hand_effect)
                            .by(0.5, { y: 50 })
                            .by(0.5, { y: -50 })
                            .union()
                            .repeat(this.reload)
                            .start();
                    }
                    // 闪红
                    cc.tween(gameMgr_1.gameMgr.rangedWeaponMess.children[0])
                        .to(0.2, { color: cc.Color.RED })
                        .to(0.2, { color: cc.Color.WHITE })
                        .start();
                    CocosZ_1.cocosz.scheduleOnce(function () {
                        if (_this && _this.isValid) {
                            _this._isReload = false;
                            _this.addBullet();
                            if (_this.hand_effect) {
                                _this.hand_effect.stopAllActions();
                                _this.hand_effect.y = y_back_1; // 还原手的位置
                            }
                            // 闪绿
                            cc.tween(gameMgr_1.gameMgr.rangedWeaponMess.children[0])
                                .to(0.2, { color: cc.Color.GREEN })
                                .to(0.2, { color: cc.Color.WHITE })
                                .start();
                        }
                    }, this.reload * this.person.reloadRate);
                    // 装弹按钮效果
                    if (gameMgr_1.gameMgr.BtnBullet.active && gameMgr_1.gameMgr.BtnBullet.children[3] && gameMgr_1.gameMgr.BtnBullet.children[3].active) {
                        // 装弹
                        gameMgr_1.gameMgr.BtnBullet.children[3].active = false;
                        gameMgr_1.gameMgr.BtnBullet.children[0].active = true;
                        // 进度填充
                        var t_1 = gameMgr_1.gameMgr.playerTs.curWeapon.reload * gameMgr_1.gameMgr.playerTs.reloadRate;
                        gameMgr_1.gameMgr.BtnBullet.children[1].active = true;
                        var pro_1 = gameMgr_1.gameMgr.BtnBullet.children[1].getComponent(cc.Sprite);
                        cc.tween(pro_1)
                            .set({ fillRange: 0 })
                            .to(t_1, { fillRange: -1 })
                            .call(function () {
                            gameMgr_1.gameMgr.BtnBullet.children[0].active = false;
                            gameMgr_1.gameMgr.BtnBullet.children[1].active = false;
                            gameMgr_1.gameMgr.BtnBullet.children[2].active = false;
                            gameMgr_1.gameMgr.BtnBullet.children[3].active = true;
                        })
                            .start();
                        gameMgr_1.gameMgr.BtnBullet.children[2].active = true;
                        var label_1 = gameMgr_1.gameMgr.BtnBullet.children[2].getComponent(cc.Label);
                        cc.tween(label_1)
                            .call(function () { label_1.string = (t_1 * (1 + pro_1.fillRange)).toFixed(1); })
                            .delay(0.1)
                            .union()
                            .repeat(t_1 / 0.1)
                            .start();
                    }
                }
                else {
                    //没有备弹,提醒
                    this._isReload = false;
                    Msg_1.default.Show(i18n.t("msg.myzd")); //没有子弹
                    CocosZ_1.cocosz.audioMgr.playEffect("bag", false, 1);
                }
            }
            else {
                CocosZ_1.cocosz.scheduleOnce(function () {
                    if (_this && _this.isValid) {
                        _this._isReload = false;
                        _this.addBullet();
                    }
                }, this.reload);
            }
        }
    };
    var Weapon_1;
    Weapon.WeaponName = ["ak", "cfq", "dao", "gj", "jgb", "sd", "hdl", "sq", "ju", "ld", "nnp", "gtst", "tb", "mb", "mq", "szg", "rsq", "cjj", "jtl", "sq2", "tj", "fs"];
    Weapon.meleeWaapon = [3, 4, 5, 13, 14];
    Weapon.rangeWeapon = [1, 2, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22];
    __decorate([
        property({ tooltip: "是否播放开火升级效果" })
    ], Weapon.prototype, "can_effect_hit", void 0);
    __decorate([
        property(cc.Node)
    ], Weapon.prototype, "hand_effect", void 0);
    __decorate([
        property(cc.Node)
    ], Weapon.prototype, "hand_2", void 0);
    __decorate([
        property
    ], Weapon.prototype, "weaponNum", void 0);
    __decorate([
        property(cc.Prefab)
    ], Weapon.prototype, "bullet", void 0);
    __decorate([
        property(cc.Color)
    ], Weapon.prototype, "bulletCollor", void 0);
    __decorate([
        property(cc.Prefab)
    ], Weapon.prototype, "shellCall", void 0);
    __decorate([
        property(cc.Prefab)
    ], Weapon.prototype, "atkEffect", void 0);
    __decorate([
        property
    ], Weapon.prototype, "atkNum", void 0);
    __decorate([
        property
    ], Weapon.prototype, "atkRangeNum", void 0);
    __decorate([
        property
    ], Weapon.prototype, "flySpeed", void 0);
    __decorate([
        property({ tooltip: "开火时间" }),
        property
    ], Weapon.prototype, "atkSpeed", void 0);
    __decorate([
        property({ tooltip: "弹夹弹药数量" })
    ], Weapon.prototype, "bulletNum", void 0);
    __decorate([
        property({ tooltip: "总弹药数量" })
    ], Weapon.prototype, "bulletTotal", void 0);
    __decorate([
        property({ tooltip: "装弹时间" })
    ], Weapon.prototype, "reload", void 0);
    __decorate([
        property({ tooltip: "装弹音效" })
    ], Weapon.prototype, "audioName", void 0);
    Weapon = Weapon_1 = __decorate([
        ccclass
    ], Weapon);
    return Weapon;
}(cc.Component));
exports.default = Weapon;

cc._RF.pop();