"use strict";
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