
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be2012PJ+xL2Y4UzVB0obJ4', 'player');
// scripts/Game/player.ts

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
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var bullet_1 = require("./bullet");
var gameDate_1 = require("./gameDate");
var gameMgr_1 = require("./gameMgr");
var person_1 = require("./person");
var UpgradeMgr_1 = require("./UpgradeMgr");
var weapon_1 = require("./weapon");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastTime = 0;
        _this.lastAtkTime = 0;
        _this.atkBulletNum = 1;
        return _this;
    }
    Player.prototype.onLoad = function () {
        this.isPlayer = true;
        this.id = 1;
        gameMgr_1.gameMgr.playerTs = this;
        if (this.hpSpr) {
            this.hpSpr.color = cc.Color.GREEN;
        }
        if (this.atkBar) {
            this.atkBar.node.children[1].color = cc.Color.YELLOW;
        }
        this.rig = this.node.getComponent(cc.RigidBody);
        if (this.rig) {
            this.rig.linearDamping = 0.2;
        }
        this.playerMess = this.node.getChildByName("playerMess");
        this.hpNumNode = this.playerMess.getChildByName("hpNum");
        // 光环
        this.ghAniNode = this.node.getChildByName("gh");
        // 烟尘
        this.ycAniNode = this.node.getChildByName("yc");
        // 相机跟随
        gameMgr_1.gameMgr.followNode = this.node;
        // 防止玩家和僵尸碰撞
        if (CocosZ_1.cocosz.gameMode == 6) {
            if (this.rig && this.rig.isValid) {
                this.rig.enabledContactListener = true;
            }
        }
    };
    Player.prototype.start = function () {
        _super.prototype.start.call(this);
        this.setProperty();
        this.node.zIndex = Constant_1.ZindexLayer.zindex_player;
        if (this.ghAniNode && this.ghAniNode.isValid) {
            this.ghAniNode.setParent(this.node.parent);
            this.ghAniNode.zIndex = Constant_1.ZindexLayer.zinedx_gh;
            this.updateGhAni();
        }
        if (this.ycAniNode && this.ycAniNode.isValid) {
            this.ycAniNode.setParent(this.node.parent);
            this.ycAniNode.zIndex = Constant_1.ZindexLayer.zinedx_footYc;
            this.updateYcAni();
        }
        // 血条
        if (this.hpSpr) {
            this.hpSpr.color = cc.Color.GREEN;
        }
    };
    Player.prototype.lateUpdate = function (dt) {
        this.curTime++;
        if (CocosZ_1.cocosz.isPause || this.isDeath || gameMgr_1.gameMgr.isWin || gameMgr_1.gameMgr.isFail) {
            this.rig.linearVelocity = cc.v2(0, 0);
            return;
        }
        ;
        if (this.curTime % 15 == 0) {
            this.updateAni();
            this.creatFootPrint();
        }
        this.updateAtk();
        this.updatePerson();
        this.udpateRBody(this.moveDir);
        this.updateMess();
        this.updateGhAni();
        this.updateYcAni();
        if (this.atkTarget && this.atkTarget.isValid) {
            this.atkEnemy();
        }
    };
    Player.prototype.recoverEffect = function () {
        var node = cc.instantiate(gameMgr_1.gameMgr.itemEffect[0]);
        node.parent = this.node;
    };
    Player.prototype.checkTarget = function () {
        if (Number(new Date()) - this.lastTime < 500)
            return;
        this.lastTime = Number(new Date());
        var num = this.atkList.indexOf(this.atkTarget);
        if (num >= 0) {
            if (num == this.atkList.length - 1) {
                num = 0;
            }
            else {
                num += 1;
            }
            this.atkTarget = this.atkList[num];
        }
        else {
            this.atkTarget = this.atkList[0];
        }
    };
    Player.prototype.atkEnemy = function () {
        var _this = this;
        if (!this.curWeapon || !this.curWeapon.isValid || this.isAtk)
            return;
        if (this.curWeapon && this.curWeapon.isRangeWeapon) {
            // 是否有子弹
            if (this.curWeapon._isReload || this.curWeapon.curBullet <= 0) {
                return;
            }
            else {
                if (CocosZ_1.cocosz.gameMode == 6 && this.curWeapon.curBullet == 1) {
                    cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Bullet_Last, node: this.node });
                }
                this.curWeapon.curBullet--;
            }
            // 抖动效果
            var t_1 = (this.atkSpeed > 0.1 ? 0.1 : this.atkSpeed) / 3;
            cc.tween(this.rangedWeapon.children[0])
                .by(t_1, { x: -20, angle: 20 })
                .by(t_1, { x: 20, angle: -20 })
                .start();
            // 攻击效果
            var pos = this.startPosNode.getPosition();
            if (this.curWeapon.atkEffect) {
                var effect = cc.instantiate(this.curWeapon.atkEffect);
                if (this.curWeapon.weaponNum == 9 || this.curWeapon.weaponNum == 15) {
                    this.node.parent.addChild(effect, Constant_1.ZindexLayer.zindex_effect_fire, "effect");
                    effect.setPosition(this.startPosNode.parent.convertToWorldSpaceAR(pos).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2)));
                    if (this.body.scaleX > 0) {
                        effect.angle = this.rangedWeapon.angle;
                    }
                    else {
                        effect.angle = 180 - this.rangedWeapon.angle;
                    }
                }
                else {
                    this.curWeapon.node.addChild(effect, 1, "effect");
                    effect.setPosition(pos);
                }
                // 升级开火特效
                // if (this.curWeapon.can_effect_hit && this.curWeapon && this.curWeapon.weaponLevel > 0) {
                //     let effect_fire = cc.instantiate(gameMgr.effect_fire);
                //     effect_fire.parent = effect.parent;
                //     effect_fire.setPosition(effect.position);
                //     effect_fire.angle = effect.angle;
                //     // 颜色
                //     let arr = ["", "y", "p", "r"];
                //     let spAni = effect_fire.children[0].getComponent(sp.Skeleton);
                //     spAni && spAni.setSkin(arr[this.curWeapon.weaponLevel]);
                // }
            }
        }
        else {
            gameMgr_1.gameMgr.shakeEffect(2, 1, false); //屏幕晃动
            var ani_1 = this.meleeWeapon.getComponent(cc.Animation);
            ani_1 && ani_1.isValid && ani_1.play("atk_dao");
            this.scheduleOnce(function () {
                ani_1 && ani_1.isValid && ani_1.play("daiji_dao");
            }, 0.18);
        }
        // 生成子弹
        var dir;
        if (this.atkDir && !this.atkDir.equals(cc.Vec2.ZERO)) {
            dir = this.atkDir;
        }
        else if (this.moveDir && !this.moveDir.equals(cc.Vec2.ZERO)) {
            dir = this.moveDir;
        }
        else {
            dir = this.body.scaleX > 0 ? cc.Vec2.RIGHT : cc.Vec2.RIGHT.negSelf();
        }
        if (this.atkBulletNum > 1) {
            for (var i = 0; i < this.atkBulletNum; i++) {
                var angle = ((this.atkBulletNum - 1) / 2 - i) * 15;
                var new_dir = dir.rotate(cc.misc.degreesToRadians(angle));
                this.createBullet(new_dir);
            }
        }
        else {
            this.createBullet(dir);
        }
        // 攻击表情
        var t = this.atkSpeed > 0.1 ? 0.1 : this.atkSpeed;
        cc.tween(this.head_atk)
            .set({ opacity: 255 })
            .delay(t)
            .set({ opacity: 0 })
            .start();
        this.isAtk = true;
        if (this.curWeapon.isRangeWeapon && this.curWeapon.curBullet <= 0) {
            cc.tween(this.node)
                .delay(this.curWeapon.reload)
                .call(function () {
                _this.isAtk = false;
            })
                .start();
        }
        else {
            cc.tween(this.node)
                .delay(this.atkSpeed)
                .call(function () {
                _this.isAtk = false;
            })
                .start();
        }
        // 攻击音效
        var name = weapon_1.default.WeaponName[this.curWeapon.weaponNum - 1];
        if (gameDate_1.default.Weapon[name] && gameDate_1.default.Weapon[name].music) {
            gameMgr_1.gameMgr.playEffect("shot_" + gameDate_1.default.Weapon[name].music, this.node);
        }
        else {
            gameMgr_1.gameMgr.playEffect("shot_" + weapon_1.default.WeaponName[this.curWeapon.weaponNum - 1], this.node);
        }
    };
    Player.prototype.createBullet = function (dir) {
        var bullet = cc.instantiate(this.curWeapon.bullet);
        if (this.curWeapon.isRangeWeapon) {
            bullet.parent = this.node.parent;
            var fromPos = bullet.parent.convertToNodeSpaceAR(this.startPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
            bullet.setPosition(fromPos);
            bullet.angle = -cc.v2(dir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
            if (this.curWeapon.weaponNum == 2) {
                bullet.angle += (5 - Math.random() * 10);
            }
            if (this.curWeapon.flySpeed > 0) {
                var pos1 = bullet.getPosition();
                var pos2 = pos1.add(dir.mul(this.curWeapon.atkRangeNum));
                cc.tween(bullet)
                    .to(pos2.sub(pos1).mag() / this.curWeapon.flySpeed, { position: cc.v3(pos2) })
                    .call(function () {
                    var ts = bullet.getComponent(bullet_1.default);
                    if (ts.boomEffect) {
                        var boom = cc.instantiate(ts.boomEffect);
                        boom.parent = ts.node.parent;
                        boom.setPosition(ts.node.getPosition());
                        var curBullet = boom.getComponent(bullet_1.default);
                        curBullet.atk = ts.atk;
                        curBullet.atker = ts.atker;
                        curBullet.id = ts.id;
                        gameMgr_1.gameMgr.playEffect("explo", boom);
                        if (ts.hitEffect) {
                            var pos = bullet.getPosition();
                            var node = cc.instantiate(ts.hitEffect);
                            node.parent = bullet.parent;
                            node.setPosition(pos);
                            node.zIndex = Constant_1.ZindexLayer.zindex_effect_hit;
                        }
                    }
                    bullet.destroy();
                })
                    .start();
                // 弹壳
                if (this.curWeapon.shellCall) {
                    var shellCase = cc.instantiate(this.curWeapon.shellCall);
                    shellCase.setParent(gameMgr_1.gameMgr.map);
                    shellCase.setPosition(this.node.position);
                    shellCase.scaleX = this.body.scale;
                }
            }
            else {
                cc.tween(bullet).delay(0.4).call(function () {
                    bullet.destroy();
                }).start();
            }
            var ts = bullet.getComponent(bullet_1.default);
            ts.id = this.id;
            ts.atker = this.node;
            ts.atk = (this.atkNum + this.personAtk) * this.atkRate;
            ts.dir = dir;
        }
        else {
            this.node.addChild(bullet, -1);
            bullet.color = this.curWeapon.bulletCollor;
            if (this.atkDir.x < 0) {
                bullet.scaleX *= -1 / this.node.scaleX;
            }
            else {
                bullet.scaleX /= this.node.scaleX;
            }
            bullet.scaleY /= this.node.scaleY;
            cc.tween(bullet).delay(0.2).call(function () { bullet.destroy(); }).start();
            var ts = bullet.getComponent(bullet_1.default);
            ts.id = this.id;
            ts.atker = this.node;
            ts.atk = (this.atkNum + this.personAtk) * this.atkRate;
            ts.dir = dir;
        }
    };
    Player.prototype.hart = function (atkNum, from, dir, isAudio) {
        var _this = this;
        if (dir === void 0) { dir = null; }
        if (isAudio === void 0) { isAudio = true; }
        if (CocosZ_1.cocosz.isPause || this.isDeath || this.isAvoidInjury)
            return;
        if (CocosZ_1.cocosz.gameMode == 6 && UpgradeMgr_1.upgradeMgr) {
            // 移动过程中15%的概率免伤
            if (UpgradeMgr_1.upgradeMgr.isHaveSkill(UpgradeMgr_1.SkillType.护甲靴子) && this.moveDir.mag() > 0 && Math.random() < 0.4) {
                // gameMgr.showRoleTip(this.node, "闪避", cc.Color.YELLOW);
                return;
            }
            else if (UpgradeMgr_1.upgradeMgr.isHaveSkill(UpgradeMgr_1.SkillType.神圣守护) && UpgradeMgr_1.upgradeMgr.hudun && UpgradeMgr_1.upgradeMgr.hudun.active) {
                UpgradeMgr_1.upgradeMgr.updateHudun();
                // gameMgr.showRoleTip(this.node, "免伤", cc.Color.YELLOW);
                return;
            }
        }
        // 防止dir过大
        if (dir && dir.mag() > 3)
            dir.normalizeSelf().mulSelf(3);
        // 减伤
        atkNum = (1 - this.damageReduction) * atkNum;
        // 护盾
        if (this.Shiled > 0) {
            this.Shiled -= atkNum;
            if (this.Shiled < 0) {
                atkNum = -this.Shiled;
                this.Shiled = 0;
            }
            else {
                return;
            }
        }
        // 数字
        if (CocosZ_1.cocosz.gameMode != 6) {
            gameMgr_1.gameMgr.showRoleTip(this.node, Math.min(this.HP, atkNum).toFixed(0));
        }
        this.HP -= atkNum;
        // 受伤音效
        if (isAudio) {
            if (from) {
                var ts = from.getComponent(person_1.default);
                if (ts && ts.curWeapon && ts.curWeapon.isRangeWeapon) {
                    gameMgr_1.gameMgr.playEffect("hurt_range", this.node);
                }
                else {
                    gameMgr_1.gameMgr.playEffect("hurt_melee", this.node);
                }
            }
            else {
                gameMgr_1.gameMgr.playEffect("hurt", this.node);
            }
        }
        // 屏幕闪红
        if (CocosZ_1.cocosz.gameMode == 6) {
            cc.tween(gameMgr_1.gameMgr.red)
                .to(0.5, { opacity: 255 }, { easing: "sineOut" })
                .to(0.5, { opacity: 0 }, { easing: "sineIn" })
                .start();
        }
        // 震动
        CocosZ_1.cocosz.vibrate("long");
        if (this.HP <= 0) {
            if (CocosZ_1.cocosz.gameMode == 6)
                CocosZ_1.cocosz.audioMgr.playEffect("GameOver");
            this.death();
            if (from) {
                var ts = from.getComponent(person_1.default);
                ts.killNum++;
                ts.curKillNum++;
                // 更新最佳成绩
                if (ts.curKillNum > ts.maxNum) {
                    ts.maxNum = ts.curKillNum;
                }
                this.killer = ts;
                this.curKillNum = 0;
            }
            // 倒飞
            if (dir) {
                var p1 = this.node.getPosition();
                var pTo = p1.add(dir.normalizeSelf().mulSelf(200));
                var p2 = cc.v2((p1.x + pTo.x) / 2, p1.y + 200);
                cc.tween(this.node)
                    .bezierTo(0.3, p1, p2, pTo)
                    .start();
            }
            // 死亡事件
            if (CocosZ_1.cocosz.gameMode == 6) {
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Player_Death });
            }
        }
        else {
            // 受伤事件
            if (CocosZ_1.cocosz.gameMode == 6) {
                this.avoidInjury(2);
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Player_Hart });
            }
            // 效果
            if (!this.isAttackedEffect) {
                this.isAttackedEffect = true;
                // 后退
                if (this.rig.type == cc.RigidBodyType.Dynamic && dir) {
                    // 控制
                    this.canMove = false;
                    this.scheduleOnce(function () { _this.canMove = true; }, 0.1);
                    // 后退
                    var div = dir.mulSelf(400 * dir.mag()).addSelf(this.rig.linearVelocity);
                    if (div.mag() > 500) {
                        div.normalizeSelf().mulSelf(500);
                    }
                    this.rig.linearVelocity = div;
                }
                // 晃头
                cc.tween(this.head)
                    .call(function () { _this.head_hart.opacity = 255; })
                    .to(0.05, { angle: 15 })
                    .to(0.05, { angle: -15 })
                    .to(0.05, { angle: 15 })
                    .to(0.05, { angle: 0 })
                    .call(function () { _this.head_hart.opacity = 0; })
                    .start();
                // 人物变色
                var spArr_1 = this.body.getComponentsInChildren(cc.Sprite);
                cc.tween(this.body)
                    .call(function () { spArr_1.forEach(function (v, i) { v.isValid && v.setMaterial(0, _this.mat_attacked); }); })
                    .delay(0.1)
                    .call(function () { spArr_1.forEach(function (v, i) { v.isValid && v.setMaterial(0, _this.mat_common); }); })
                    .delay(0.1)
                    .union()
                    .repeat(CocosZ_1.cocosz.gameMode == 6 ? 5 : 2)
                    .call(function () { _this.isAttackedEffect = false; })
                    .start();
            }
        }
    };
    Player.prototype.creatFootPrint = function () {
        if (this.node.opacity == 0)
            return;
        var pos = this.node.getPosition();
        if (pos.sub(this.lastPos).mag() < 5)
            return;
        this.lastPos = cc.v2(pos);
        this.footNum++;
        // 脚步音效
        if (this.isPlayer && this.footNum % 3 == 0) {
            gameMgr_1.gameMgr.playEffect("footsteps", this.node);
        }
        // 脚印(雪地)
        if (gameMgr_1.gameMgr.map.name == "map2") {
            var node_1 = new cc.Node();
            node_1.addComponent(cc.Sprite).spriteFrame = gameMgr_1.gameMgr.jiaoyin;
            cc.tween(node_1).delay(0.5).to(0.5, { opacity: 0 }).call(function () { node_1.destroy(); }).start();
            node_1.parent = this.node.parent;
            node_1.zIndex = Constant_1.ZindexLayer.zinedx_footPrint;
            if (this.moveDir.mag() > 0)
                node_1.angle = 360 - cc.v2(this.moveDir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
            pos.y -= 100 * this.node.scale;
            var pos2 = cc.v2(20, 0).rotate(node_1.angle / 180 * Math.PI).rotate(this.footNum % 2 == 0 ? Math.PI / 2 : -Math.PI / 2);
            pos.addSelf(pos2);
            node_1.setPosition(pos);
        }
    };
    // 0:检测碰撞；1:检测子弹；2:检测在层级下，3:检测在层级上
    Player.prototype.onCollisionEnter = function (other, self) {
        if (self.tag == 0) {
            // 敌人
            if (other.tag == 1) {
                var ts = other.node.getComponent(person_1.default);
                if (ts && ts.id != this.id) {
                    this.atkList.push(other.node);
                    if (!cc.isValid(this.atkTarget) && other.node.isValid) {
                        this.atkTarget = other.node;
                    }
                }
            }
        }
    };
    Player.prototype.onCollisionExit = function (other, self) {
        if (self.tag == 0) {
            var num = this.atkList.indexOf(other.node);
            if (other.tag == 1 && num >= 0) {
                this.atkList.splice(num, 1);
                if (this.atkList.length == 0) {
                    this.atkTarget = null;
                }
                else {
                    if (!cc.isValid(this.atkTarget) || other.node.uuid == this.atkTarget.uuid) {
                        this.atkTarget = this.atkList[0];
                    }
                }
            }
        }
    };
    // 每次将要处理碰撞体接触逻辑时被调用
    Player.prototype.onPreSolve = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == "zombie") {
            contact.disabled = true;
        }
    };
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(person_1.default));
exports.default = Player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxccGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUE2QztBQUM3QyxrREFBeUU7QUFDekUsbUNBQThCO0FBQzlCLHVDQUFrQztBQUNsQyxxQ0FBb0M7QUFDcEMsbUNBQThCO0FBQzlCLDJDQUFxRDtBQUNyRCxtQ0FBOEI7QUFDOUIsYUFBYTtBQUNiLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBTTtJQUExQztRQUFBLHFFQTZkQztRQS9ZRyxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBbUJyQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixrQkFBWSxHQUFXLENBQUMsQ0FBQzs7SUEyWDdCLENBQUM7SUEzZEcsdUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osaUJBQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxD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QixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBQYW5lbE5hbWUsIFppbmRleExheWVyIH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL2J1bGxldFwiO1xyXG5pbXBvcnQgR2FtZURhdGUgZnJvbSBcIi4vZ2FtZURhdGVcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuL2dhbWVNZ3JcIjtcclxuaW1wb3J0IFBlcnNvbiBmcm9tIFwiLi9wZXJzb25cIjtcclxuaW1wb3J0IHsgU2tpbGxUeXBlLCB1cGdyYWRlTWdyIH0gZnJvbSBcIi4vVXBncmFkZU1nclwiO1xyXG5pbXBvcnQgV2VhcG9uIGZyb20gXCIuL3dlYXBvblwiO1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IGkxOG4gPSByZXF1aXJlKCdMYW5ndWFnZURhdGEnKTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQZXJzb24ge1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlkID0gMTtcclxuICAgICAgICBnYW1lTWdyLnBsYXllclRzID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5ocFNwcikge1xyXG4gICAgICAgICAgICB0aGlzLmhwU3ByLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmF0a0Jhcikge1xyXG4gICAgICAgICAgICB0aGlzLmF0a0Jhci5ub2RlLmNoaWxkcmVuWzFdLmNvbG9yID0gY2MuQ29sb3IuWUVMTE9XO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJpZyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICBpZiAodGhpcy5yaWcpIHsgdGhpcy5yaWcubGluZWFyRGFtcGluZyA9IDAuMjsgfVxyXG4gICAgICAgIHRoaXMucGxheWVyTWVzcyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBsYXllck1lc3NcIik7XHJcbiAgICAgICAgdGhpcy5ocE51bU5vZGUgPSB0aGlzLnBsYXllck1lc3MuZ2V0Q2hpbGRCeU5hbWUoXCJocE51bVwiKTtcclxuICAgICAgICAvLyDlhYnnjq9cclxuICAgICAgICB0aGlzLmdoQW5pTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdoXCIpO1xyXG4gICAgICAgIC8vIOeDn+WwmFxyXG4gICAgICAgIHRoaXMueWNBbmlOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwieWNcIik7XHJcbiAgICAgICAgLy8g55u45py66Lef6ZqPXHJcbiAgICAgICAgZ2FtZU1nci5mb2xsb3dOb2RlID0gdGhpcy5ub2RlO1xyXG5cclxuICAgICAgICAvLyDpmLLmraLnjqnlrrblkozlg7XlsLjnorDmkp5cclxuICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmlnICYmIHRoaXMucmlnLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnLmVuYWJsZWRDb250YWN0TGlzdGVuZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfcGxheWVyO1xyXG4gICAgICAgIGlmICh0aGlzLmdoQW5pTm9kZSAmJiB0aGlzLmdoQW5pTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2hBbmlOb2RlLnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgdGhpcy5naEFuaU5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZWR4X2doO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdoQW5pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnljQW5pTm9kZSAmJiB0aGlzLnljQW5pTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMueWNBbmlOb2RlLnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgdGhpcy55Y0FuaU5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZWR4X2Zvb3RZYztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVZY0FuaSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDooYDmnaFcclxuICAgICAgICBpZiAodGhpcy5ocFNwcikge1xyXG4gICAgICAgICAgICB0aGlzLmhwU3ByLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBsYXRlVXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5jdXJUaW1lKys7XHJcbiAgICAgICAgaWYgKGNvY29zei5pc1BhdXNlIHx8IHRoaXMuaXNEZWF0aCB8fCBnYW1lTWdyLmlzV2luIHx8IGdhbWVNZ3IuaXNGYWlsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLmN1clRpbWUgJSAxNSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQW5pKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRGb290UHJpbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVBdGsoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBlcnNvbigpO1xyXG4gICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3MoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdoQW5pKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVZY0FuaSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmF0a1RhcmdldCAmJiB0aGlzLmF0a1RhcmdldC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXRrRW5lbXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVjb3ZlckVmZmVjdCgpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGdhbWVNZ3IuaXRlbUVmZmVjdFswXSk7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBjaGVja1RhcmdldCgpIHtcclxuICAgICAgICBpZiAoTnVtYmVyKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA8IDUwMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBOdW1iZXIobmV3IERhdGUoKSk7XHJcbiAgICAgICAgbGV0IG51bSA9IHRoaXMuYXRrTGlzdC5pbmRleE9mKHRoaXMuYXRrVGFyZ2V0KTtcclxuICAgICAgICBpZiAobnVtID49IDApIHtcclxuICAgICAgICAgICAgaWYgKG51bSA9PSB0aGlzLmF0a0xpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXRrVGFyZ2V0ID0gdGhpcy5hdGtMaXN0W251bV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF0a1RhcmdldCA9IHRoaXMuYXRrTGlzdFswXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdEF0a1RpbWU6IG51bWJlciA9IDA7XHJcbiAgICBhdGtCdWxsZXROdW06IG51bWJlciA9IDE7XHJcbiAgICBhdGtFbmVteSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uIHx8ICF0aGlzLmN1cldlYXBvbi5pc1ZhbGlkIHx8IHRoaXMuaXNBdGspIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyV2VhcG9uICYmIHRoaXMuY3VyV2VhcG9uLmlzUmFuZ2VXZWFwb24pIHtcclxuICAgICAgICAgICAgLy8g5piv5ZCm5pyJ5a2Q5by5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbi5faXNSZWxvYWQgfHwgdGhpcy5jdXJXZWFwb24uY3VyQnVsbGV0IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNiAmJiB0aGlzLmN1cldlYXBvbi5jdXJCdWxsZXQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9CdWxsZXRfTGFzdCwgbm9kZTogdGhpcy5ub2RlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uY3VyQnVsbGV0LS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5oqW5Yqo5pWI5p6cXHJcbiAgICAgICAgICAgIGxldCB0ID0gKHRoaXMuYXRrU3BlZWQgPiAwLjEgPyAwLjEgOiB0aGlzLmF0a1NwZWVkKSAvIDM7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucmFuZ2VkV2VhcG9uLmNoaWxkcmVuWzBdKVxyXG4gICAgICAgICAgICAgICAgLmJ5KHQsIHsgeDogLTIwLCBhbmdsZTogMjAgfSlcclxuICAgICAgICAgICAgICAgIC5ieSh0LCB7IHg6IDIwLCBhbmdsZTogLTIwIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgLy8g5pS75Ye75pWI5p6cXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnN0YXJ0UG9zTm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24uYXRrRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5jdXJXZWFwb24uYXRrRWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbi53ZWFwb25OdW0gPT0gOSB8fCB0aGlzLmN1cldlYXBvbi53ZWFwb25OdW0gPT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKGVmZmVjdCwgWmluZGV4TGF5ZXIuemluZGV4X2VmZmVjdF9maXJlLCBcImVmZmVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24odGhpcy5zdGFydFBvc05vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwb3MpLnN1YihjYy52MihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvZHkuc2NhbGVYID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3QuYW5nbGUgPSB0aGlzLnJhbmdlZFdlYXBvbi5hbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdC5hbmdsZSA9IDE4MCAtIHRoaXMucmFuZ2VkV2VhcG9uLmFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLm5vZGUuYWRkQ2hpbGQoZWZmZWN0LCAxLCBcImVmZmVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWNh+e6p+W8gOeBq+eJueaViFxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuY3VyV2VhcG9uLmNhbl9lZmZlY3RfaGl0ICYmIHRoaXMuY3VyV2VhcG9uICYmIHRoaXMuY3VyV2VhcG9uLndlYXBvbkxldmVsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBlZmZlY3RfZmlyZSA9IGNjLmluc3RhbnRpYXRlKGdhbWVNZ3IuZWZmZWN0X2ZpcmUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGVmZmVjdF9maXJlLnBhcmVudCA9IGVmZmVjdC5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWZmZWN0X2ZpcmUuc2V0UG9zaXRpb24oZWZmZWN0LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBlZmZlY3RfZmlyZS5hbmdsZSA9IGVmZmVjdC5hbmdsZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyDpopzoibJcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgYXJyID0gW1wiXCIsIFwieVwiLCBcInBcIiwgXCJyXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBzcEFuaSA9IGVmZmVjdF9maXJlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3BBbmkgJiYgc3BBbmkuc2V0U2tpbihhcnJbdGhpcy5jdXJXZWFwb24ud2VhcG9uTGV2ZWxdKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZ2FtZU1nci5zaGFrZUVmZmVjdCgyLCAxLCBmYWxzZSk7Ly/lsY/luZXmmYPliqhcclxuICAgICAgICAgICAgbGV0IGFuaSA9IHRoaXMubWVsZWVXZWFwb24uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGFuaSAmJiBhbmkuaXNWYWxpZCAmJiBhbmkucGxheShcImF0a19kYW9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFuaSAmJiBhbmkuaXNWYWxpZCAmJiBhbmkucGxheShcImRhaWppX2Rhb1wiKTtcclxuICAgICAgICAgICAgfSwgMC4xOClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g55Sf5oiQ5a2Q5by5XHJcbiAgICAgICAgbGV0IGRpcjtcclxuICAgICAgICBpZiAodGhpcy5hdGtEaXIgJiYgIXRoaXMuYXRrRGlyLmVxdWFscyhjYy5WZWMyLlpFUk8pKSB7XHJcbiAgICAgICAgICAgIGRpciA9IHRoaXMuYXRrRGlyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlRGlyICYmICF0aGlzLm1vdmVEaXIuZXF1YWxzKGNjLlZlYzIuWkVSTykpIHtcclxuICAgICAgICAgICAgZGlyID0gdGhpcy5tb3ZlRGlyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpciA9IHRoaXMuYm9keS5zY2FsZVggPiAwID8gY2MuVmVjMi5SSUdIVCA6IGNjLlZlYzIuUklHSFQubmVnU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hdGtCdWxsZXROdW0gPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdGtCdWxsZXROdW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFuZ2xlID0gKCh0aGlzLmF0a0J1bGxldE51bSAtIDEpIC8gMiAtIGkpICogMTU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3X2RpcjogY2MuVmVjMiA9IGRpci5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKGFuZ2xlKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1bGxldChuZXdfZGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVsbGV0KGRpcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaUu+WHu+ihqOaDhVxyXG4gICAgICAgIGxldCB0ID0gdGhpcy5hdGtTcGVlZCA+IDAuMSA/IDAuMSA6IHRoaXMuYXRrU3BlZWQ7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5oZWFkX2F0aylcclxuICAgICAgICAgICAgLnNldCh7IG9wYWNpdHk6IDI1NSB9KVxyXG4gICAgICAgICAgICAuZGVsYXkodClcclxuICAgICAgICAgICAgLnNldCh7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmlzQXRrID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24uaXNSYW5nZVdlYXBvbiAmJiB0aGlzLmN1cldlYXBvbi5jdXJCdWxsZXQgPD0gMCkge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkodGhpcy5jdXJXZWFwb24ucmVsb2FkKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBdGsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkodGhpcy5hdGtTcGVlZClcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXRrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaUu+WHu+mfs+aViFxyXG4gICAgICAgIGxldCBuYW1lID0gV2VhcG9uLldlYXBvbk5hbWVbdGhpcy5jdXJXZWFwb24ud2VhcG9uTnVtIC0gMV07XHJcbiAgICAgICAgaWYgKEdhbWVEYXRlLldlYXBvbltuYW1lXSAmJiBHYW1lRGF0ZS5XZWFwb25bbmFtZV0ubXVzaWMpIHtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KFwic2hvdF9cIiArIEdhbWVEYXRlLldlYXBvbltuYW1lXS5tdXNpYywgdGhpcy5ub2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoYHNob3RfJHtXZWFwb24uV2VhcG9uTmFtZVt0aGlzLmN1cldlYXBvbi53ZWFwb25OdW0gLSAxXX1gLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCdWxsZXQoZGlyOiBjYy5WZWMyKSB7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY3VyV2VhcG9uLmJ1bGxldCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyV2VhcG9uLmlzUmFuZ2VXZWFwb24pIHtcclxuICAgICAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGxldCBmcm9tUG9zID0gYnVsbGV0LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLnN0YXJ0UG9zTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPKSk7XHJcbiAgICAgICAgICAgIGJ1bGxldC5zZXRQb3NpdGlvbihmcm9tUG9zKTtcclxuICAgICAgICAgICAgYnVsbGV0LmFuZ2xlID0gLWNjLnYyKGRpcikuc2lnbkFuZ2xlKGNjLnYyKDEsIDApKSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbi53ZWFwb25OdW0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmFuZ2xlICs9ICg1IC0gTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24uZmx5U3BlZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zMSA9IGJ1bGxldC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvczIgPSBwb3MxLmFkZChkaXIubXVsKHRoaXMuY3VyV2VhcG9uLmF0a1JhbmdlTnVtKSk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihidWxsZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKHBvczIuc3ViKHBvczEpLm1hZygpIC8gdGhpcy5jdXJXZWFwb24uZmx5U3BlZWQsIHsgcG9zaXRpb246IGNjLnYzKHBvczIpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHMgPSBidWxsZXQuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cy5ib29tRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbSA9IGNjLmluc3RhbnRpYXRlKHRzLmJvb21FZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29tLnBhcmVudCA9IHRzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbS5zZXRQb3NpdGlvbih0cy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1ckJ1bGxldCA9IGJvb20uZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWxsZXQuYXRrID0gdHMuYXRrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVsbGV0LmF0a2VyID0gdHMuYXRrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWxsZXQuaWQgPSB0cy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcImV4cGxvXCIsIGJvb20pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRzLmhpdEVmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBidWxsZXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRzLmhpdEVmZmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBidWxsZXQucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF9lZmZlY3RfaGl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgLy8g5by55aOzXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24uc2hlbGxDYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoZWxsQ2FzZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY3VyV2VhcG9uLnNoZWxsQ2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hlbGxDYXNlLnNldFBhcmVudChnYW1lTWdyLm1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hlbGxDYXNlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hlbGxDYXNlLnNjYWxlWCA9IHRoaXMuYm9keS5zY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGJ1bGxldCkuZGVsYXkoMC40KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHMgPSBidWxsZXQuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgIHRzLmlkID0gdGhpcy5pZDtcclxuICAgICAgICAgICAgdHMuYXRrZXIgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIHRzLmF0ayA9ICh0aGlzLmF0a051bSArIHRoaXMucGVyc29uQXRrKSAqIHRoaXMuYXRrUmF0ZTtcclxuICAgICAgICAgICAgdHMuZGlyID0gZGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJ1bGxldCwgLTEpO1xyXG4gICAgICAgICAgICBidWxsZXQuY29sb3IgPSB0aGlzLmN1cldlYXBvbi5idWxsZXRDb2xsb3I7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF0a0Rpci54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnNjYWxlWCAqPSAtMSAvIHRoaXMubm9kZS5zY2FsZVg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuc2NhbGVYIC89IHRoaXMubm9kZS5zY2FsZVg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVsbGV0LnNjYWxlWSAvPSB0aGlzLm5vZGUuc2NhbGVZO1xyXG4gICAgICAgICAgICBjYy50d2VlbihidWxsZXQpLmRlbGF5KDAuMikuY2FsbCgoKSA9PiB7IGJ1bGxldC5kZXN0cm95KCkgfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cyA9IGJ1bGxldC5nZXRDb21wb25lbnQoQnVsbGV0KTtcclxuICAgICAgICAgICAgdHMuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgICAgICB0cy5hdGtlciA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgdHMuYXRrID0gKHRoaXMuYXRrTnVtICsgdGhpcy5wZXJzb25BdGspICogdGhpcy5hdGtSYXRlO1xyXG4gICAgICAgICAgICB0cy5kaXIgPSBkaXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhcnQoYXRrTnVtOiBudW1iZXIsIGZyb206IGNjLk5vZGUsIGRpcjogY2MuVmVjMiA9IG51bGwsIGlzQXVkaW86IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKGNvY29zei5pc1BhdXNlIHx8IHRoaXMuaXNEZWF0aCB8fCB0aGlzLmlzQXZvaWRJbmp1cnkpIHJldHVybjtcclxuICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYgJiYgdXBncmFkZU1ncikge1xyXG4gICAgICAgICAgICAvLyDnp7vliqjov4fnqIvkuK0xNSXnmoTmpoLnjoflhY3kvKRcclxuICAgICAgICAgICAgaWYgKHVwZ3JhZGVNZ3IuaXNIYXZlU2tpbGwoU2tpbGxUeXBlLuaKpOeUsumdtOWtkCkgJiYgdGhpcy5tb3ZlRGlyLm1hZygpID4gMCAmJiBNYXRoLnJhbmRvbSgpIDwgMC40KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBnYW1lTWdyLnNob3dSb2xlVGlwKHRoaXMubm9kZSwgXCLpl6rpgb9cIiwgY2MuQ29sb3IuWUVMTE9XKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1cGdyYWRlTWdyLmlzSGF2ZVNraWxsKFNraWxsVHlwZS7npZ7lnKPlrojmiqQpICYmIHVwZ3JhZGVNZ3IuaHVkdW4gJiYgdXBncmFkZU1nci5odWR1bi5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVNZ3IudXBkYXRlSHVkdW4oKTtcclxuICAgICAgICAgICAgICAgIC8vIGdhbWVNZ3Iuc2hvd1JvbGVUaXAodGhpcy5ub2RlLCBcIuWFjeS8pFwiLCBjYy5Db2xvci5ZRUxMT1cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmYsuatomRpcui/h+Wkp1xyXG4gICAgICAgIGlmIChkaXIgJiYgZGlyLm1hZygpID4gMykgZGlyLm5vcm1hbGl6ZVNlbGYoKS5tdWxTZWxmKDMpO1xyXG4gICAgICAgIC8vIOWHj+S8pFxyXG4gICAgICAgIGF0a051bSA9ICgxIC0gdGhpcy5kYW1hZ2VSZWR1Y3Rpb24pICogYXRrTnVtO1xyXG4gICAgICAgIC8vIOaKpOebvlxyXG4gICAgICAgIGlmICh0aGlzLlNoaWxlZCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5TaGlsZWQgLT0gYXRrTnVtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TaGlsZWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBhdGtOdW0gPSAtdGhpcy5TaGlsZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNoaWxlZCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pWw5a2XXHJcbiAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSAhPSA2KSB7XHJcbiAgICAgICAgICAgIGdhbWVNZ3Iuc2hvd1JvbGVUaXAodGhpcy5ub2RlLCBNYXRoLm1pbih0aGlzLkhQLCBhdGtOdW0pLnRvRml4ZWQoMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkhQIC09IGF0a051bTtcclxuICAgICAgICAvLyDlj5fkvKTpn7PmlYhcclxuICAgICAgICBpZiAoaXNBdWRpbykge1xyXG4gICAgICAgICAgICBpZiAoZnJvbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzID0gZnJvbS5nZXRDb21wb25lbnQoUGVyc29uKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cyAmJiB0cy5jdXJXZWFwb24gJiYgdHMuY3VyV2VhcG9uLmlzUmFuZ2VXZWFwb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJodXJ0X3JhbmdlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcImh1cnRfbWVsZWVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcImh1cnRcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlsY/luZXpl6rnuqJcclxuICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4oZ2FtZU1nci5yZWQpXHJcbiAgICAgICAgICAgICAgICAudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjUsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmch+WKqFxyXG4gICAgICAgIGNvY29zei52aWJyYXRlKFwibG9uZ1wiKTtcclxuICAgICAgICBpZiAodGhpcy5IUCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNikgY29jb3N6LmF1ZGlvTWdyLnBsYXlFZmZlY3QoXCJHYW1lT3ZlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5kZWF0aCgpO1xyXG4gICAgICAgICAgICBpZiAoZnJvbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzID0gZnJvbS5nZXRDb21wb25lbnQoUGVyc29uKTtcclxuICAgICAgICAgICAgICAgIHRzLmtpbGxOdW0rKztcclxuICAgICAgICAgICAgICAgIHRzLmN1cktpbGxOdW0rKztcclxuICAgICAgICAgICAgICAgIC8vIOabtOaWsOacgOS9s+aIkOe7qVxyXG4gICAgICAgICAgICAgICAgaWYgKHRzLmN1cktpbGxOdW0gPiB0cy5tYXhOdW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0cy5tYXhOdW0gPSB0cy5jdXJLaWxsTnVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5raWxsZXIgPSB0cztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyS2lsbE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5YCS6aOeXHJcbiAgICAgICAgICAgIGlmIChkaXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwMSA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBUbyA9IHAxLmFkZChkaXIubm9ybWFsaXplU2VsZigpLm11bFNlbGYoMjAwKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcDIgPSBjYy52MigocDEueCArIHBUby54KSAvIDIsIHAxLnkgKyAyMDApO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5iZXppZXJUbygwLjMsIHAxLCBwMiwgcFRvKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOatu+S6oeS6i+S7tlxyXG4gICAgICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9QbGF5ZXJfRGVhdGggfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOWPl+S8pOS6i+S7tlxyXG4gICAgICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZvaWRJbmp1cnkoMik7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB7IHR5cGU6IENvbnN0YW50LkVfUGxheWVyX0hhcnQgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDmlYjmnpxcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNrZWRFZmZlY3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBdHRhY2tlZEVmZmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyDlkI7pgIBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJpZy50eXBlID09IGNjLlJpZ2lkQm9keVR5cGUuRHluYW1pYyAmJiBkaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmjqfliLZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbk1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuY2FuTW92ZSA9IHRydWU7IH0sIDAuMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5ZCO6YCAXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRpci5tdWxTZWxmKDQwMCAqIGRpci5tYWcoKSkuYWRkU2VsZih0aGlzLnJpZy5saW5lYXJWZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpdi5tYWcoKSA+IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYubm9ybWFsaXplU2VsZigpLm11bFNlbGYoNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWcubGluZWFyVmVsb2NpdHkgPSBkaXY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDmmYPlpLRcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuaGVhZClcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMuaGVhZF9oYXJ0Lm9wYWNpdHkgPSAyNTU7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMDUsIHsgYW5nbGU6IDE1IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMDUsIHsgYW5nbGU6IC0xNSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjA1LCB7IGFuZ2xlOiAxNSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjA1LCB7IGFuZ2xlOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyB0aGlzLmhlYWRfaGFydC5vcGFjaXR5ID0gMDsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8vIOS6uueJqeWPmOiJslxyXG4gICAgICAgICAgICAgICAgbGV0IHNwQXJyID0gdGhpcy5ib2R5LmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJvZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyBzcEFyci5mb3JFYWNoKCh2LCBpKSA9PiB7IHYuaXNWYWxpZCAmJiB2LnNldE1hdGVyaWFsKDAsIHRoaXMubWF0X2F0dGFja2VkKSB9KSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kZWxheSgwLjEpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyBzcEFyci5mb3JFYWNoKCh2LCBpKSA9PiB7IHYuaXNWYWxpZCAmJiB2LnNldE1hdGVyaWFsKDAsIHRoaXMubWF0X2NvbW1vbikgfSkgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC4xKVxyXG4gICAgICAgICAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGVhdChjb2Nvc3ouZ2FtZU1vZGUgPT0gNiA/IDUgOiAyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5pc0F0dGFja2VkRWZmZWN0ID0gZmFsc2U7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRGb290UHJpbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5vcGFjaXR5ID09IDApIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgaWYgKHBvcy5zdWIodGhpcy5sYXN0UG9zKS5tYWcoKSA8IDUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0UG9zID0gY2MudjIocG9zKTtcclxuICAgICAgICB0aGlzLmZvb3ROdW0rKztcclxuICAgICAgICAvLyDohJrmraXpn7PmlYhcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXllciAmJiB0aGlzLmZvb3ROdW0gJSAzID09IDApIHtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KFwiZm9vdHN0ZXBzXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiEmuWNsCjpm6rlnLApXHJcbiAgICAgICAgaWYgKGdhbWVNZ3IubWFwLm5hbWUgPT0gXCJtYXAyXCIpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gZ2FtZU1nci5qaWFveWluO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5kZWxheSgwLjUpLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4geyBub2RlLmRlc3Ryb3koKSB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZWR4X2Zvb3RQcmludDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZURpci5tYWcoKSA+IDApIG5vZGUuYW5nbGUgPSAzNjAgLSBjYy52Mih0aGlzLm1vdmVEaXIpLnNpZ25BbmdsZShjYy52MigxLCAwKSkgLyBNYXRoLlBJICogMTgwO1xyXG4gICAgICAgICAgICBwb3MueSAtPSAxMDAgKiB0aGlzLm5vZGUuc2NhbGU7XHJcbiAgICAgICAgICAgIGxldCBwb3MyID0gY2MudjIoMjAsIDApLnJvdGF0ZShub2RlLmFuZ2xlIC8gMTgwICogTWF0aC5QSSkucm90YXRlKHRoaXMuZm9vdE51bSAlIDIgPT0gMCA/IE1hdGguUEkgLyAyIDogLU1hdGguUEkgLyAyKVxyXG4gICAgICAgICAgICBwb3MuYWRkU2VsZihwb3MyKTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAwOuajgOa1i+eisOaSnu+8mzE65qOA5rWL5a2Q5by577ybMjrmo4DmtYvlnKjlsYLnuqfkuIvvvIwzOuajgOa1i+WcqOWxgue6p+S4ilxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgaWYgKHNlbGYudGFnID09IDApIHtcclxuICAgICAgICAgICAgLy8g5pWM5Lq6XHJcbiAgICAgICAgICAgIGlmIChvdGhlci50YWcgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzID0gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoUGVyc29uKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cyAmJiB0cy5pZCAhPSB0aGlzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGtMaXN0LnB1c2gob3RoZXIubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMuYXRrVGFyZ2V0KSAmJiBvdGhlci5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGtUYXJnZXQgPSBvdGhlci5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbkV4aXQob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xyXG4gICAgICAgIGlmIChzZWxmLnRhZyA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSB0aGlzLmF0a0xpc3QuaW5kZXhPZihvdGhlci5ub2RlKVxyXG4gICAgICAgICAgICBpZiAob3RoZXIudGFnID09IDEgJiYgbnVtID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXRrTGlzdC5zcGxpY2UobnVtLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0a0xpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5hdGtUYXJnZXQpIHx8IG90aGVyLm5vZGUudXVpZCA9PSB0aGlzLmF0a1RhcmdldC51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXRrVGFyZ2V0ID0gdGhpcy5hdGtMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmr4/mrKHlsIbopoHlpITnkIbnorDmkp7kvZPmjqXop6bpgLvovpHml7booqvosIPnlKhcclxuICAgIG9uUHJlU29sdmUoY29udGFjdDogY2MuUGh5c2ljc0NvbnRhY3QsIHNlbGZDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyLCBvdGhlckNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIpIHtcclxuICAgICAgICBpZiAob3RoZXJDb2xsaWRlci5ub2RlLmdyb3VwID09IFwiem9tYmllXCIpIHtcclxuICAgICAgICAgICAgY29udGFjdC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==