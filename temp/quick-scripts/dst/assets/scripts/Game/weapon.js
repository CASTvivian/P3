
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/weapon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcd2VhcG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkM7QUFDN0Msa0RBQTZDO0FBQzdDLHdDQUFtQztBQUNuQyx1Q0FBa0M7QUFDbEMscUNBQW9DO0FBRXBDLGFBQWE7QUFDYixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFL0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLDJEQUFZLENBQUE7SUFDWiwyREFBWSxDQUFBO0lBQ1osK0RBQWMsQ0FBQTtBQUNsQixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFHRDtJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQWtRQztRQTNQRyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUdoQyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFHdEIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBR3hDLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixZQUFNLEdBQVcsRUFBRSxDQUFDO1FBR3BCLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFJeEIsY0FBUSxHQUFXLEdBQUcsQ0FBQztRQUd2QixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBR3RCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBR3hCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFHbkIsZUFBUyxHQUFXLE1BQU0sQ0FBQztRQUUzQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixnQkFBVSxHQUFlLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFFakQsUUFBUTtRQUNELFlBQU0sR0FBVyxJQUFJLENBQUM7UUFLN0IsS0FBSztRQUNHLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBc0QvQixjQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQXdEOUIsT0FBTztRQUNQLGVBQVMsR0FBWSxLQUFLLENBQUM7O0lBbUYvQixDQUFDO2VBbFFvQixNQUFNO0lBNER2QixzQkFBVyxpQ0FBYTtRQUR4QixVQUFVO2FBQ1Y7WUFDSSxPQUFPLFFBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLDZCQUFTO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFDRCxVQUFxQixDQUFTO1lBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFBRTtpQkFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtZQUMxQixPQUFPO1lBQ1AsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsS0FBSztnQkFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO29CQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3ZCO2dCQUNELFNBQVM7Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQzs7O09BZEE7SUFnQlMsdUJBQU0sR0FBaEI7UUFDSSxLQUFLO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMxRTthQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNsRixJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDLFFBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFD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R3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ3FCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDUTtJQUc1QjtRQURDLFFBQVE7MENBQ1c7SUFHcEI7UUFEQyxRQUFROytDQUNrQjtJQUczQjtRQURDLFFBQVE7NENBQ2U7SUFJeEI7UUFGQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDN0IsUUFBUTs0Q0FDYztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzs2Q0FDVjtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzsrQ0FDUDtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzswQ0FDWDtJQUduQjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs2Q0FDSDtJQXBEVixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBa1ExQjtJQUFELGFBQUM7Q0FsUUQsQUFrUUMsQ0FsUW1DLEVBQUUsQ0FBQyxTQUFTLEdBa1EvQztrQkFsUW9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgQ29uc3RhbnQgZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5pbXBvcnQgTXNnIGZyb20gXCIuLi9GcmFtZXdvcmsvTXNnXCI7XHJcbmltcG9ydCBHYW1lRGF0ZSBmcm9tIFwiLi9nYW1lRGF0ZVwiO1xyXG5pbXBvcnQgeyBnYW1lTWdyIH0gZnJvbSBcIi4vZ2FtZU1nclwiO1xyXG5pbXBvcnQgUGVyc29uIGZyb20gXCIuL3BlcnNvblwiO1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IGkxOG4gPSByZXF1aXJlKCdMYW5ndWFnZURhdGEnKTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBXZWFwb25UeXBlIHtcclxuICAgIHdlYXBvbl9tZWxlZSxcclxuICAgIHdlYXBvbl9yYW5nZSxcclxuICAgIHdlYXBvbl9yYW5nZUFkXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBXZWFwb25OYW1lID0gW1wiYWtcIiwgXCJjZnFcIiwgXCJkYW9cIiwgXCJnalwiLCBcImpnYlwiLCBcInNkXCIsIFwiaGRsXCIsIFwic3FcIiwgXCJqdVwiLCBcImxkXCIsIFwibm5wXCIsIFwiZ3RzdFwiLCBcInRiXCIsIFwibWJcIiwgXCJtcVwiLCBcInN6Z1wiLCBcInJzcVwiLCBcImNqalwiLCBcImp0bFwiLCBcInNxMlwiLCBcInRqXCIsIFwiZnNcIl1cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbWVsZWVXYWFwb24gPSBbMywgNCwgNSwgMTMsIDE0XTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcmFuZ2VXZWFwb24gPSBbMSwgMiwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuaYr+WQpuaSreaUvuW8gOeBq+WNh+e6p+aViOaenFwiIH0pXHJcbiAgICBjYW5fZWZmZWN0X2hpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGFuZF9lZmZlY3Q6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoYW5kXzI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgd2VhcG9uTnVtOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBidWxsZXQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkNvbG9yKVxyXG4gICAgYnVsbGV0Q29sbG9yOiBjYy5Db2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBzaGVsbENhbGw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGF0a0VmZmVjdDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGF0a051bTogbnVtYmVyID0gMTA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBhdGtSYW5nZU51bTogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGZseVNwZWVkOiBudW1iZXIgPSAyMDAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5byA54Gr5pe26Ze0XCIgfSlcclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgYXRrU3BlZWQ6IG51bWJlciA9IDAuNDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuW8ueWkueW8ueiNr+aVsOmHj1wiIH0pXHJcbiAgICBidWxsZXROdW06IG51bWJlciA9IDU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmgLvlvLnoja/mlbDph49cIiB9KVxyXG4gICAgYnVsbGV0VG90YWw6IG51bWJlciA9IDU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLoo4XlvLnml7bpl7RcIiB9KVxyXG4gICAgcmVsb2FkOiBudW1iZXIgPSAzO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi6KOF5by56Z+z5pWIXCIgfSlcclxuICAgIGF1ZGlvTmFtZTogc3RyaW5nID0gXCJyZWFkXCI7XHJcblxyXG4gICAgd2VhcG9uTGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICB3ZWFwb25UeXBlOiBXZWFwb25UeXBlID0gV2VhcG9uVHlwZS53ZWFwb25fbWVsZWU7XHJcblxyXG4gICAgLy8g5q2m5Zmo5oul5pyJ6ICFXHJcbiAgICBwdWJsaWMgcGVyc29uOiBQZXJzb24gPSBudWxsO1xyXG4gICAgLy8g5piv5ZCm5piv6L+c56iL5q2m5ZmoXHJcbiAgICBwdWJsaWMgZ2V0IGlzUmFuZ2VXZWFwb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFdlYXBvbi5yYW5nZVdlYXBvbi5pbmNsdWRlcyh0aGlzLndlYXBvbk51bSk7XHJcbiAgICB9XHJcbiAgICAvLyDlrZDlvLlcclxuICAgIHByaXZhdGUgX2N1ckJ1bGxldDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBnZXQgY3VyQnVsbGV0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1ckJ1bGxldDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgY3VyQnVsbGV0KHY6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2ID4gdGhpcy5idWxsZXROdW0pIHsgdiA9IHRoaXMuYnVsbGV0TnVtOyB9XHJcbiAgICAgICAgZWxzZSBpZiAodiA8IDApIHsgdiA9IDA7IH1cclxuICAgICAgICAvLyDov5znqIvmrablmahcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlV2VhcG9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckJ1bGxldCA9IHY7XHJcbiAgICAgICAgICAgIC8vIOijheW8uVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyQnVsbGV0IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkQnVsbGV0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g6K6+572u5a2Q5by5VUlcclxuICAgICAgICAgICAgdGhpcy5zZXRCdWxsZXRVSSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOetiee6p1xyXG4gICAgICAgIGlmICghdGhpcy5wZXJzb24gfHwgdGhpcy5wZXJzb24uaXNQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25MZXZlbCA9IGNvY29zei5kYXRhTWdyLmdldEd1bkluZm8odGhpcy53ZWFwb25OdW0gLSAxKS5MZXZlbDtcclxuICAgICAgICB9IGVsc2UgaWYgKFsxLCAyLCAzLCA0LCA1XS5pbmNsdWRlcyhjb2Nvc3ouZ2FtZU1vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uTGV2ZWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdGtOdW0gPSBHYW1lRGF0ZS5XZWFwb25bV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25OdW0gLSAxXV0uYXRrW3RoaXMud2VhcG9uTGV2ZWxdO1xyXG4gICAgICAgIHRoaXMuYXRrU3BlZWQgPSBHYW1lRGF0ZS5XZWFwb25bV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25OdW0gLSAxXV0uYXRrU3BlZWRbdGhpcy53ZWFwb25MZXZlbF07XHJcbiAgICAgICAgdGhpcy5idWxsZXROdW0gPSBHYW1lRGF0ZS5XZWFwb25bV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25OdW0gLSAxXV0uYnVsbGV0TnVtO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0VG90YWwgPSBHYW1lRGF0ZS5XZWFwb25bV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25OdW0gLSAxXV0uYnVsbGV0VG90YWxbdGhpcy53ZWFwb25MZXZlbF07XHJcbiAgICAgICAgdGhpcy5yZWxvYWQgPSBHYW1lRGF0ZS5XZWFwb25bV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25OdW0gLSAxXV0ucmVsb2FkO1xyXG4gICAgICAgIHRoaXMuYXRrUmFuZ2VOdW0gPSBHYW1lRGF0ZS5XZWFwb25bV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25OdW0gLSAxXV0uYXRrUmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGVyc29uKSB0aGlzLmJ1bGxldFRvdGFsID0gTWF0aC5jZWlsKHRoaXMuYnVsbGV0VG90YWwgKiB0aGlzLnBlcnNvbi5idWxsZXRSYXRlKTtcclxuICAgICAgICAvLyDoo4XlvLlcclxuICAgICAgICB0aGlzLl9jdXJCdWxsZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYWRkQnVsbGV0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRTRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHNldEJ1bGxldFVJKCkge1xyXG4gICAgICAgIC8vIFVJ5pu05paw5a2Q5by55pWwXHJcbiAgICAgICAgaWYgKHRoaXMucGVyc29uICYmIHRoaXMucGVyc29uLmlzUGxheWVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlYXBvblR5cGUgPT0gV2VhcG9uVHlwZS53ZWFwb25fcmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLmFtbW8gJiYgZ2FtZU1nci5hbW1vLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5hbW1vLnN0cmluZyA9IHRoaXMuX2N1ckJ1bGxldCArIFwiL1wiICsgKFs2LCA3XS5pbmNsdWRlcyhjb2Nvc3ouZ2FtZU1vZGUpID8gXCLimb5cIiA6IHRoaXMuYnVsbGV0VG90YWwpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2VhcG9uVHlwZSA9PSBXZWFwb25UeXBlLndlYXBvbl9yYW5nZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZU1nci5hbW1vQWQgJiYgZ2FtZU1nci5hbW1vQWQuaXNWYWxpZClcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLmFtbW9BZC5zdHJpbmcgPSB0aGlzLl9jdXJCdWxsZXQgKyBcIi9cIiArIChbNiwgN10uaW5jbHVkZXMoY29jb3N6LmdhbWVNb2RlKSA/IFwi4pm+XCIgOiB0aGlzLmJ1bGxldFRvdGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYXJyTmFtZSA9IFtcIlwiLCBcInlcIiwgXCJwXCIsIFwiclwiXVxyXG4gICAgcHJvdGVjdGVkIHNldFNEKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOmXqueUteminOiJslxyXG4gICAgICAgIGlmICh0aGlzLnBlcnNvbikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUud2FsaygoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5uYW1lID09IFwic2RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLndlYXBvbkxldmVsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BBbmkgPSBjaGlsZC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcEFuaSAmJiBzcEFuaS5zZXRTa2luKHRoaXMuX2Fyck5hbWVbdGhpcy53ZWFwb25MZXZlbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmHjee9ruWtkOW8uVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRUb3RhbCA9IEdhbWVEYXRlLldlYXBvbltXZWFwb24uV2VhcG9uTmFtZVt0aGlzLndlYXBvbk51bSAtIDFdXS5idWxsZXRUb3RhbFt0aGlzLndlYXBvbkxldmVsXTtcclxuICAgICAgICBpZiAodGhpcy5wZXJzb24pIHtcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRUb3RhbCA9IE1hdGguY2VpbCh0aGlzLmJ1bGxldFRvdGFsICogdGhpcy5wZXJzb24uYnVsbGV0UmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2N1ckJ1bGxldCA9IDA7XHJcbiAgICAgICAgdGhpcy5hZGRCdWxsZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDoo4XlvLlcclxuICAgIGFkZEJ1bGxldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlV2VhcG9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBlcnNvbiAmJiB0aGlzLnBlcnNvbi5pc1BsYXllcikge1xyXG4gICAgICAgICAgICAgICAgLy8g5a2Q5by55bCP5LqO5by55aS55pWw6YePLCDkuJTov5jmnInlpIflvLlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckJ1bGxldCA8IHRoaXMuYnVsbGV0TnVtICYmIHRoaXMuYnVsbGV0VG90YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFs2LCA3XS5pbmNsdWRlcyhjb2Nvc3ouZ2FtZU1vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyQnVsbGV0ID0gdGhpcy5idWxsZXROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9CdWxsZXRfUmVsb2FkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSB0aGlzLmJ1bGxldE51bSAtIHRoaXMuY3VyQnVsbGV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idWxsZXRUb3RhbCA+PSBuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlrZDlvLnotrPlpJ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0VG90YWwgLT0gbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyQnVsbGV0ICs9IG47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlrZDlvLnkuI3lpJ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0VG90YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJCdWxsZXQgKz0gdGhpcy5idWxsZXRUb3RhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyQnVsbGV0ID0gdGhpcy5idWxsZXROdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6KOF5by55pWI5p6cXHJcbiAgICBfaXNSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlbG9hZEJ1bGxldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlV2VhcG9uICYmIHRoaXMuX2lzUmVsb2FkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGVyc29uICYmIHRoaXMucGVyc29uLmlzUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idWxsZXRUb3RhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDpn7PmlYhcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChcInJlbG9hZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDliqjkvZxcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeV9iYWNrID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kX2VmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5X2JhY2sgPSB0aGlzLmhhbmRfZWZmZWN0Lnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuaGFuZF9lZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoMC41LCB7IHk6IDUwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoMC41LCB7IHk6IC01MCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBlYXQodGhpcy5yZWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Zeq57qiXHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZ2FtZU1nci5yYW5nZWRXZWFwb25NZXNzLmNoaWxkcmVuWzBdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4yLCB7IGNvbG9yOiBjYy5Db2xvci5SRUQgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBjb2xvcjogY2MuQ29sb3IuV0hJVEUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzICYmIHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVsbGV0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kX2VmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZF9lZmZlY3Quc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRfZWZmZWN0LnkgPSB5X2JhY2s7Ly8g6L+Y5Y6f5omL55qE5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpl6rnu79cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGdhbWVNZ3IucmFuZ2VkV2VhcG9uTWVzcy5jaGlsZHJlblswXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4yLCB7IGNvbG9yOiBjYy5Db2xvci5HUkVFTiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjIsIHsgY29sb3I6IGNjLkNvbG9yLldISVRFIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnJlbG9hZCAqIHRoaXMucGVyc29uLnJlbG9hZFJhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOijheW8ueaMiemSruaViOaenFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLkJ0bkJ1bGxldC5hY3RpdmUgJiYgZ2FtZU1nci5CdG5CdWxsZXQuY2hpbGRyZW5bM10gJiYgZ2FtZU1nci5CdG5CdWxsZXQuY2hpbGRyZW5bM10uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOijheW8uVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblszXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5CdG5CdWxsZXQuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L+b5bqm5aGr5YWFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ID0gZ2FtZU1nci5wbGF5ZXJUcy5jdXJXZWFwb24ucmVsb2FkICogZ2FtZU1nci5wbGF5ZXJUcy5yZWxvYWRSYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvID0gZ2FtZU1nci5CdG5CdWxsZXQuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHBybylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoeyBmaWxsUmFuZ2U6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byh0LCB7IGZpbGxSYW5nZTogLTEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblszXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSBnYW1lTWdyLkJ0bkJ1bGxldC5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihsYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgbGFiZWwuc3RyaW5nID0gKHQgKiAoMSArIHByby5maWxsUmFuZ2UpKS50b0ZpeGVkKDEpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDAuMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwZWF0KHQgLyAwLjEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/msqHmnInlpIflvLks5o+Q6YaSXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cubXl6ZFwiKSk7Ly/msqHmnInlrZDlvLlcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChcImJhZ1wiLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyAmJiB0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCdWxsZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJlbG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19