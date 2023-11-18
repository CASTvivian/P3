
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/ZombieBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4f9b3rBNdNPy6WqLrNu03ZA', 'ZombieBase');
// scripts/Game/ZombieBase.ts

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
var gameDate_1 = require("../Game/gameDate");
var gameMgr_1 = require("../Game/gameMgr");
var person_1 = require("../Game/person");
var UpgradeMgr_1 = require("../Game/UpgradeMgr");
var bullet_1 = require("./bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AtkType;
(function (AtkType) {
    AtkType[AtkType["front"] = 0] = "front";
    AtkType[AtkType["area"] = 1] = "area";
    AtkType[AtkType["charge"] = 2] = "charge";
    AtkType[AtkType["range"] = 3] = "range";
})(AtkType || (AtkType = {}));
var ZombieBase = /** @class */ (function (_super) {
    __extends(ZombieBase, _super);
    function ZombieBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zombieId = 0;
        _this.bullet_prefab = null;
        _this.sp_hongzhaquan = null;
        _this.audio_attack1 = null;
        _this.audio_attack2 = null;
        _this.audio_hart = null;
        _this.audio_die = null;
        _this.isBoss = false;
        _this._aniLayer = null;
        _this._spAni = null;
        _this._divToPlayer = cc.Vec2.ZERO;
        _this._time = -1;
        _this._canColor = true;
        _this._canAtk = true;
        return _this;
    }
    ZombieBase.prototype.onLoad = function () {
        var _this = this;
        this.id = 94;
        // 初始化配置表属性
        if (gameDate_1.default.ZombieMess[this.zombieId]) {
            this.totleHp = gameDate_1.default.ZombieMess[this.zombieId].hp;
            this.atkNum = gameDate_1.default.ZombieMess[this.zombieId].atk;
            this.atkRange = gameDate_1.default.ZombieMess[this.zombieId].atkRange;
            this.MoveSpeed = gameDate_1.default.ZombieMess[this.zombieId].speed;
            if (PlatUtils_1.default.IsOPPO) {
                this.MoveSpeed /= 2;
            }
        }
        // 大小缩放
        if (this.isBoss) {
            this.node.scale = 1;
        }
        else {
            this.node.scale = 0.8;
        }
        // 刚体
        this.rig = this.node.getComponent(cc.RigidBody);
        if (this.rig) {
            this.rig.linearDamping = 0.2;
        }
        // spine动画
        this._aniLayer = this.node.getChildByName("aniLayer");
        if (this._aniLayer) {
            this._spAni = this._aniLayer.getChildByName("ani").getComponent(sp.Skeleton);
        }
        // 监听动画
        if (this._spAni) {
            this._spAni.setStartListener(function () { _this.startListenerCall(); });
            this._spAni.setCompleteListener(function () { _this.endListenerCall(); });
        }
    };
    ZombieBase.prototype.onDestroy = function () {
        // 取消监听
        cc.game.targetOff(this);
    };
    ZombieBase.prototype.start = function () { };
    ZombieBase.prototype.initNode = function () {
        var _this = this;
        gameMgr_1.gameMgr && gameMgr_1.gameMgr.setMapTs.checkNode(this.node, true);
        // 消息监听
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        gameMgr_1.gameMgr.zombieCurNum++;
        this.node.stopAllActions();
        this.node.zIndex = Constant_1.ZindexLayer.zindex_zombie + this.zombieId;
        this.node.opacity = 255;
        this.atkDir = cc.Vec2.ZERO;
        this.curHp = this.totleHp;
        this.isDeath = false;
        this.isAtk = false;
        this._canAtk = true;
        this.canMoveDir = true;
        this.canMove = true;
        // 播放出场动画
        if (this._spAni && this._spAni.isValid) {
            this._spAni.node.scaleX = Math.abs(this._spAni.node.scaleX);
            this._spAni.node.opacity = 255;
            this._spAni.node.color = cc.Color.WHITE;
            if (this.isBoss) {
                this._spAni.setAnimation(0, "spawn", false);
                this.scheduleOnce(function () {
                    // 碰撞体
                    var boxCollider = _this.node.getComponent(cc.BoxCollider);
                    if (boxCollider)
                        boxCollider.enabled = true;
                }, 2);
            }
            else {
                this._spAni.setAnimation(0, "idle", true);
                // 碰撞体
                var boxCollider = this.node.getComponent(cc.BoxCollider);
                if (boxCollider)
                    boxCollider.enabled = true;
            }
        }
        // 轰炸圈
        if (this.sp_hongzhaquan) {
            this.sp_hongzhaquan.node.setParent(this.node.parent);
            this.sp_hongzhaquan.node.zIndex = Constant_1.ZindexLayer.zinedx_floorTip;
            this.sp_hongzhaquan.setCompleteListener(function () {
                if (_this.sp_hongzhaquan && _this.sp_hongzhaquan.isValid) {
                    _this.sp_hongzhaquan.node.active = false;
                }
            });
        }
        // boss
        if (this.isBoss) {
            cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Commonzombie_Destory });
            gameMgr_1.gameMgr && gameMgr_1.gameMgr.showBossHp(1);
            if (this.node.getChildByName("boos"))
                this.node.getChildByName("boos").active = true;
        }
    };
    ZombieBase.prototype.putNodePool = function () {
        // 取消监听
        cc.game.targetOff(this);
        // boss
        if (this.isBoss) {
            // boss光影
            if (this.node.getChildByName("boos"))
                this.node.getChildByName("boos").active = false;
            // boss边界
            if (gameMgr_1.gameMgr) {
                gameMgr_1.gameMgr && gameMgr_1.gameMgr.showBossHp(0);
                if (gameMgr_1.gameMgr.boss_border && cc.isValid(gameMgr_1.gameMgr.boss_border)) {
                    gameMgr_1.gameMgr.boss_border.destroy();
                    gameMgr_1.gameMgr.boss_border = null;
                }
            }
            this.isBoss = false;
        }
        // 轰炸圈
        if (this.sp_hongzhaquan && this.sp_hongzhaquan.isValid) {
            this.sp_hongzhaquan.node.setParent(this.node);
            this.sp_hongzhaquan.node.active = false;
        }
        gameMgr_1.gameMgr.zombieCurNum--;
        gameMgr_1.gameMgr && gameMgr_1.gameMgr.isValid && gameMgr_1.gameMgr.nodePut(this.node.name, this.node);
    };
    ZombieBase.prototype.startListenerCall = function () {
        var _this = this;
        if (this._spAni.animation.includes("spawn")) {
            this._spAni.timeScale = 0.4;
            this.scheduleOnce(function () { _this._spAni.timeScale = 1; }, 1);
            this.canMoveDir = false;
            // 出场方向
            var fromPos = this.node.getPosition();
            var toPos = gameMgr_1.gameMgr.playerTs.node.getPosition();
            var div = toPos.subSelf(fromPos);
            this._spAni.node.scaleX = (div.x > 0 ? 1 : -1) * Math.abs(this._spAni.node.scaleX);
        }
        else if (this._spAni.animation.includes("attack")) {
            this.isAtk = true;
            this.canMoveDir = false;
            if ([8, 9, 18].includes(this.zombieId) && this._spAni.animation == "attack2") {
                this.speedRate *= 2.5;
                this.udpateRBody(this.moveDir);
                this.scheduleOnce(function () {
                    _this.speedRate /= 2.5;
                    _this.moveDir = cc.Vec2.ZERO;
                    _this.udpateRBody(_this.moveDir);
                }, 0.2);
            }
            else if ([10, 11, 12, 13].includes(this.zombieId) && this._spAni.animation == "attack2") {
                this.speedRate *= 3;
                this.udpateRBody(this.moveDir);
                this.scheduleOnce(function () {
                    _this.speedRate /= 3;
                    _this.moveDir = cc.Vec2.ZERO;
                    _this.udpateRBody(_this.moveDir);
                }, 0.2);
            }
            else if ([14, 19].includes(this.zombieId) && this._spAni.animation.includes("attack")) {
                this.speedRate *= 3;
                this.udpateRBody(this.moveDir);
                this.scheduleOnce(function () {
                    _this.speedRate /= 3;
                    _this.moveDir = cc.Vec2.ZERO;
                    _this.udpateRBody(_this.moveDir);
                }, 0.2);
            }
            else if (this.zombieId == 15 && this._spAni.animation == "attack") {
                this.speedRate *= 3;
                this.udpateRBody(this.moveDir);
                this.scheduleOnce(function () {
                    _this.speedRate /= 3;
                    _this.moveDir = cc.Vec2.ZERO;
                    _this.udpateRBody(_this.moveDir);
                }, 0.4);
            }
            else if (this.zombieId == 16 && this._spAni.animation == "attack") {
                this.speedRate *= 2;
                this.udpateRBody(this.moveDir);
                this.scheduleOnce(function () {
                    _this.speedRate /= 2;
                    _this.moveDir = cc.Vec2.ZERO;
                    _this.udpateRBody(_this.moveDir);
                }, 0.3);
            }
            else if (this.zombieId == 17 && this._spAni.animation.includes("attack")) {
                this.speedRate *= 2;
                this.udpateRBody(this.moveDir);
                this.scheduleOnce(function () {
                    _this.speedRate /= 2;
                    _this.moveDir = cc.Vec2.ZERO;
                    _this.udpateRBody(_this.moveDir);
                }, 0.3);
            }
            else {
                this.moveDir = cc.Vec2.ZERO;
                this.udpateRBody(this.moveDir);
            }
        }
        else if (this._spAni.animation.includes("jump_up")) {
            this.canMoveDir = false;
        }
    };
    ZombieBase.prototype.endListenerCall = function () {
        if (this._spAni.animation.includes("spawn")) {
            this._spAni.setAnimation(0, "idle", true);
            this.canMoveDir = true;
            this.updateMove();
            this.updatePerson();
            this.udpateRBody(this.moveDir);
        }
        else if (this._spAni.animation.includes("attack")) {
            this._spAni.setAnimation(0, "idle", true);
            this.isAtk = false;
            this.canMoveDir = true;
            this.updateMove();
            this.updatePerson();
            this.udpateRBody(this.moveDir);
            this.atkDir = cc.Vec2.ZERO;
        }
        else if (this._spAni.animation.includes("jump_down")) {
            this._spAni.setAnimation(0, "idle", true);
            this.canMoveDir = true;
            this.moveDir = cc.Vec2.ZERO;
            this.udpateRBody(this.moveDir);
        }
    };
    /** 消息 */
    ZombieBase.prototype._onGameMessageHandler = function (event) {
        var _this = this;
        switch (event.type) {
            // 清除所有僵尸
            case Constant_1.default.E_Allzombie_Destory: {
                this.hart(9999999, null, null, true, true, cc.Color.WHITE, true);
                break;
            }
            // boss出现清除普通僵尸
            case Constant_1.default.E_Commonzombie_Destory: {
                if (!this.isBoss) {
                    cc.tween(this.node).to(0.3, { opacity: 1 }, { easing: "fade" }).call(function () { _this.putNodePool(); }).start();
                }
                break;
            }
        }
    };
    ZombieBase.prototype.lateUpdate = function (dt) {
        if (this.isDeath || CocosZ_1.cocosz.isPause || !gameMgr_1.gameMgr.isGameStart || gameMgr_1.gameMgr.isWin || gameMgr_1.gameMgr.isFail) {
            this.udpateRBody(cc.Vec2.ZERO);
            return;
        }
        this._time++;
        if (this._time % 15 == 0) {
            if (this._time % 30 == 0) {
                this.updateDiv();
                this.updateMove();
            }
            this.updateAtk();
            this.updateAni();
            this.updatePerson();
            this.udpateRBody(this.moveDir);
        }
    };
    ZombieBase.prototype.updateDiv = function () {
        var fromPos = this.node.getPosition();
        var toPos = gameMgr_1.gameMgr.playerTs.node.getPosition();
        this._divToPlayer = toPos.subSelf(fromPos);
        // 超出屏幕距离删除
        if (!this.isBoss && this._divToPlayer.mag() > cc.winSize.height / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio) {
            this.putNodePool();
        }
    };
    /** 更新移动 */
    ZombieBase.prototype.updateMove = function () {
        if (this.rig.type == cc.RigidBodyType.Dynamic) {
            if (this.canMove && this.canMoveDir) {
                // 有目标
                if (gameMgr_1.gameMgr.playerTs) {
                    // 玩家存活
                    if (!gameMgr_1.gameMgr.playerTs.isDeath) {
                        // 跳跃
                        if (this.zombieId == 3 && Math.random() < 0.2) {
                            if (!this._spAni.animation.includes("jump")) {
                                this._spAni.setAnimation(0, "jump_up", false);
                                this._spAni.addAnimation(0, "jump_down", false);
                                this.moveDir = this._divToPlayer.normalize();
                            }
                        }
                        // 朝着玩家移动
                        else if (this._divToPlayer.mag() >= this.atkRange * 0.8) {
                            this.moveDir = cc.v2(this._divToPlayer.normalize()).rotateSelf(Math.PI / 2 * (0.5 - Math.random()));
                        }
                        // 距离玩家很近，停止移动 
                        else {
                            this.moveDir = cc.Vec2.ZERO;
                        }
                    }
                    // 玩家死亡
                    else {
                        // 距离很近则远离玩家
                        if (this._divToPlayer.mag() < (this.isBoss ? 800 : 1500)) {
                            this.moveDir = this._divToPlayer.normalize().negSelf();
                        }
                        // 随机移动 
                        else {
                            this.moveDir = cc.v2(this._divToPlayer.normalize()).rotateSelf(2 * Math.PI * Math.random());
                        }
                    }
                }
            }
        }
    };
    /** 更新攻击 */
    ZombieBase.prototype.updateAtk = function () {
        // 能否攻击攻击
        if (!this.canAtk()) {
            // ...
        }
        // 新的攻击
        else if (gameMgr_1.gameMgr.playerTs && !gameMgr_1.gameMgr.playerTs.isDeath) {
            // 普通距离攻击
            if (this._divToPlayer.mag() < this.atkRange) {
                this.atkDir = this._divToPlayer.normalize();
                this.atk();
            }
            // 远距离攻击
            else {
                switch (this.zombieId) {
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 18: {
                        if (this._divToPlayer.mag() < 600 && Math.random() < 0.1 * (this.isBoss ? 2 : 1)) {
                            this.atkDir = this._divToPlayer.normalize();
                            this.moveDir = this._divToPlayer.normalize();
                            this.atk("attack2");
                        }
                        break;
                    }
                    case 14:
                    case 16:
                    case 19: {
                        if (this._divToPlayer.mag() < 800 && Math.random() < 0.1 * (this.isBoss ? 2 : 1)) {
                            this.atkDir = this._divToPlayer.normalize();
                            this.moveDir = this._divToPlayer.normalize();
                            this.atk("attack");
                        }
                        break;
                    }
                    case 15: {
                        if (this._divToPlayer.mag() < 800 && Math.random() < 0.1 * (this.isBoss ? 2 : 1)) {
                            this.atkDir = this._divToPlayer.normalize();
                            this.moveDir = this._divToPlayer.normalize();
                            this.atk("attack");
                        }
                        break;
                    }
                    case 16: {
                        if (this._divToPlayer.mag() < 600 && Math.random() < 0.1 * (this.isBoss ? 2 : 1)) {
                            this.atkDir = this._divToPlayer.normalize();
                            this.moveDir = this._divToPlayer.normalize();
                            this.atk("attack");
                        }
                        break;
                    }
                    case 17: {
                        if (this._divToPlayer.mag() < 600 && Math.random() < 0.15 * (this.isBoss ? 2 : 1)) {
                            this.atkDir = this._divToPlayer.normalize();
                            this.moveDir = this._divToPlayer.normalize();
                            this.atk();
                        }
                        break;
                    }
                    case 20: {
                        if (this._divToPlayer.mag() < 600) {
                            if (Math.random() < 0.15 * (this.isBoss ? 2 : 1)) {
                                this.atkDir = this._divToPlayer.normalize();
                                this.moveDir = this._divToPlayer.normalize();
                                this.atk("attack");
                            }
                        }
                        else if (this.sp_hongzhaquan.isValid && !this.sp_hongzhaquan.node.active && this._divToPlayer.mag() > 800) {
                            this.atk("bullet_chui");
                        }
                        break;
                    }
                }
            }
        }
        else {
            this.atkDir = cc.Vec2.ZERO;
        }
    };
    /** 更新动画 */
    ZombieBase.prototype.updateAni = function () {
        if (this.isDeath == false) {
            // 暂停
            if (this._spAni.timeScale == 0) {
                // ...a
            }
            // 出场
            else if (this._spAni.animation.includes("spawn")) { }
            // 攻击
            else if (this._spAni.animation.includes("attack")) { }
            // 跳跃
            else if (this._spAni.animation.includes("jump")) { }
            // 其它
            else {
                // 移动
                if (this.moveDir && this.moveDir.mag()) {
                    if (this.zombieId == 17) {
                        !this._spAni.animation.includes("wing") && this._spAni.setAnimation(0, "wing", true);
                    }
                    else {
                        !this._spAni.animation.includes("run") && this._spAni.setAnimation(0, "run", true);
                    }
                }
                // 待机
                else {
                    !this._spAni.animation.includes("idle") && this._spAni.setAnimation(0, "idle", true);
                }
            }
        }
        // 死亡
        else if (this._spAni && this._spAni.skeletonData && this._spAni.skeletonData.skeletonJson.animations["die"]) {
            !this._spAni.animation.includes("die") && this._spAni.setAnimation(0, "die", false);
        }
    };
    ZombieBase.prototype.updatePerson = function () {
        var dir = null;
        if (this.atkDir && this.atkDir.mag()) {
            dir = this.atkDir;
        }
        else if (this.moveDir && this.moveDir.mag()) {
            dir = this.moveDir;
        }
        // 动画方向
        if (dir) {
            this._spAni.node.scaleX = Math.abs(this._spAni.node.scaleX) * (dir.x > 0 ? 1 : -1);
        }
    };
    /** 刚体移动 */
    ZombieBase.prototype.udpateRBody = function (dir, isMust) {
        if (isMust === void 0) { isMust = false; }
        if (this.rig.type == cc.RigidBodyType.Dynamic) {
            if (this.canMove || isMust) {
                if (dir && !dir.equals(cc.Vec2.ZERO)) {
                    this.rig.linearVelocity = dir.mul(Math.floor(this.MoveSpeed * this.speedRate * (1 - 0.2 * Math.random())));
                }
                else {
                    this.rig.linearVelocity = cc.Vec2.ZERO;
                }
            }
        }
    };
    /** 攻击 */
    ZombieBase.prototype.atk = function (aniName) {
        var _this = this;
        if (aniName === void 0) { aniName = ""; }
        var atkType = AtkType.front;
        var atkRange = this.atkRange;
        var atkTime = 0;
        var bulletTime = 2;
        var clip = this.audio_attack1;
        switch (this.zombieId) {
            case 0:
            case 1: {
                if (Math.random() < 0.5) {
                    aniName = "attack";
                }
                else {
                    aniName = "attack2";
                    clip = this.audio_attack2;
                }
                atkTime = 0.3;
                break;
            }
            case 2:
            case 3: {
                aniName = "attack1";
                atkTime = 0.3;
                break;
            }
            case 4: {
                aniName = "attack";
                atkTime = 0.3;
                break;
            }
            case 5: {
                aniName = "attack";
                atkTime = 4;
                atkType = AtkType.range;
                bulletTime = 2;
                this._canAtk = false;
                break;
            }
            case 6: {
                aniName = "attack";
                atkTime = 4;
                atkType = AtkType.range;
                bulletTime = 2;
                this._canAtk = false;
                break;
            }
            case 7: {
                break;
            }
            case 8:
            case 18: {
                if (aniName == "attack2") {
                    aniName = "attack2";
                    atkRange = 300;
                    atkTime = 0.3;
                    atkType = AtkType.area;
                    clip = this.audio_attack2;
                }
                else {
                    aniName = "attack";
                    atkRange = 350;
                    atkTime = 0.3;
                }
                break;
            }
            case 9: {
                if (aniName == "attack2") {
                    aniName = "attack2";
                    atkRange = 450;
                    atkTime = 0.3;
                    clip = this.audio_attack2;
                }
                else {
                    aniName = "attack";
                    atkRange = 350;
                    atkTime = 0.3;
                }
                break;
            }
            case 10: {
                if (aniName == "attack2") {
                    aniName = "attack2";
                    atkRange = 200;
                    atkTime = 0.3;
                    clip = this.audio_attack2;
                }
                else {
                    aniName = "attack";
                    atkRange = 200;
                    atkTime = 0.3;
                }
                break;
            }
            case 11:
            case 12:
            case 13: {
                if (aniName == "attack2") {
                    aniName = "attack2";
                    atkRange = 250;
                    atkTime = 0.3;
                    clip = this.audio_attack2;
                }
                else {
                    aniName = "attack";
                    atkRange = 250;
                    atkTime = 0.3;
                }
                break;
            }
            case 14:
            case 19: {
                if (Math.random() < 0.6) { //冲盾
                    aniName = "attack";
                    atkRange = 350;
                    atkTime = 0.3;
                    atkType = AtkType.charge;
                    clip = this.audio_attack1;
                }
                else {
                    aniName = "attack2"; //挥棍
                    atkRange = 350;
                    atkTime = 0.3;
                    clip = this.audio_attack2;
                }
                break;
            }
            case 15: {
                if (aniName == "attack") { //冲锋
                    aniName = "attack";
                    atkRange = 250;
                    atkTime = 0.3;
                    atkType = AtkType.charge;
                }
                else {
                    aniName = "attack2"; //喷火
                    atkRange = 400;
                    atkTime = 0.3;
                }
                break;
            }
            case 16: {
                if (aniName == "attack" || Math.random() < 0.4) {
                    aniName = "attack";
                    atkRange = 450;
                    atkTime = 0.3;
                    atkType = AtkType.area;
                }
                else {
                    aniName = "attack2";
                    atkRange = 300;
                    atkTime = 0.3;
                }
                break;
            }
            case 17: {
                if (Math.random() < 0.5) {
                    aniName = "attack";
                    atkRange = 200;
                    atkTime = 0.3;
                }
                else {
                    aniName = "attack2";
                    atkRange = 200;
                    atkTime = 0.3;
                    atkType = AtkType.charge;
                }
                break;
            }
            case 20: {
                if (aniName == "bullet_chui") {
                    atkType = AtkType.range;
                    aniName = "attack2";
                    bulletTime = 1.5;
                }
                else if (aniName == "attack") {
                    aniName = "attack";
                    atkRange = 500;
                    atkTime = 0.3;
                }
                else {
                    aniName = "attack2";
                    atkRange = 300;
                    atkTime = 0.3;
                }
                break;
            }
        }
        // 执行动画
        if (aniName)
            this._spAni.setAnimation(0, aniName, false);
        if (clip && clip.isValid)
            gameMgr_1.gameMgr.playClip(clip, this.node, 0.5);
        // 攻击伤害
        var call = function () {
            if (gameMgr_1.gameMgr.playerTs && !gameMgr_1.gameMgr.playerTs.isDeath) {
                var fromPos = _this.node.getPosition();
                var toPos = gameMgr_1.gameMgr.playerTs.node.getPosition();
                var div = toPos.subSelf(fromPos);
                // 判断是否在攻击范围和攻击方向
                if (div.mag() < atkRange) {
                    if (atkType == AtkType.front) {
                        if (div.mag() < 200 || (div.x * _this._spAni.node.scale > 0 && Math.abs(div.y / div.x) < 1.4)) {
                            gameMgr_1.gameMgr.playerTs.hart(1, _this.node, div.normalizeSelf(), true);
                        }
                    }
                    else if (atkType === AtkType.charge) {
                        gameMgr_1.gameMgr.playerTs.hart(1, _this.node, div.normalizeSelf(), true);
                        _this.unschedule(call);
                    }
                    else {
                        gameMgr_1.gameMgr.playerTs.hart(1, _this.node, div.normalizeSelf(), true);
                    }
                }
            }
            ;
        };
        if (atkType == AtkType.front || atkType == AtkType.area) {
            this.scheduleOnce(call, atkTime);
        }
        else if (atkType == AtkType.charge) {
            this.schedule(call, 0, 15);
        }
        else if (atkType == AtkType.range) {
            var pos_from = this.node.getPosition();
            var pos_to_1 = gameMgr_1.gameMgr.playerTs.node.getPosition();
            var p2 = cc.v2((pos_from.x + pos_to_1.x) / 2, pos_from.y + 1500);
            // 生成子弹
            if (this.bullet_prefab) {
                var bullet_2 = cc.instantiate(this.bullet_prefab);
                // 子弹脚本
                var ts_1 = bullet_2.getComponent(bullet_1.default);
                ts_1.id = this.id;
                ts_1.atker = this.node;
                ts_1.atk = this.atkNum;
                ts_1.isAngle = true;
                // 子弹属性
                bullet_2.setPosition(pos_from);
                bullet_2.zIndex = Constant_1.ZindexLayer.zindex_bullet_sky;
                bullet_2.parent = this.node.parent;
                // 子弹移动
                cc.tween(bullet_2)
                    .call(function () {
                    // 轰炸预警
                    if (_this.sp_hongzhaquan && _this.sp_hongzhaquan.isValid) {
                        _this.sp_hongzhaquan.node.active = true;
                        _this.sp_hongzhaquan.node.setPosition(pos_to_1);
                        _this.sp_hongzhaquan.setAnimation(0, "animation", false);
                    }
                })
                    .bezierTo(bulletTime, pos_from, p2, pos_to_1)
                    .call(function () {
                    // 生成爆炸子弹
                    if (ts_1.boomEffect) {
                        var boom = cc.instantiate(ts_1.boomEffect);
                        boom.parent = ts_1.node.parent;
                        boom.setPosition(ts_1.node.getPosition());
                        var curBullet = boom.getComponent(bullet_1.default);
                        curBullet.atk = ts_1.atk;
                        curBullet.atker = ts_1.atker;
                        curBullet.id = ts_1.id;
                        gameMgr_1.gameMgr.playEffect("explo", boom);
                        if (ts_1.hitEffect) {
                            var pos = bullet_2.getPosition();
                            var node = cc.instantiate(ts_1.hitEffect);
                            node.parent = bullet_2.parent;
                            node.setPosition(pos);
                            node.zIndex = Constant_1.ZindexLayer.zindex_effect_hit;
                        }
                    }
                    bullet_2.destroy();
                })
                    .start();
                this.scheduleOnce(function () { _this._canAtk = true; }, atkTime);
            }
        }
    };
    /** 受伤 */
    ZombieBase.prototype.hart = function (atkNum, from, dir, isAudio, isEmit, labelColor, isMust) {
        var _this = this;
        if (isAudio === void 0) { isAudio = true; }
        if (isEmit === void 0) { isEmit = true; }
        if (isMust === void 0) { isMust = false; }
        if (this.isDeath)
            return;
        if (isMust == false && CocosZ_1.cocosz.isPause)
            return;
        // 防止dir过大
        if (dir && dir.mag() > 3)
            dir.normalizeSelf().mulSelf(3);
        // 减伤
        atkNum = (1 - this.damageReduction) * atkNum;
        // 数字
        gameMgr_1.gameMgr.showRoleTip(this.node, Math.min(this.HP, atkNum).toFixed(0), labelColor);
        // 设置血量
        this.HP -= atkNum;
        if (this.isBoss) {
            gameMgr_1.gameMgr && gameMgr_1.gameMgr.showBossHp(this.HP / this.totleHp);
        }
        // 受伤效果
        if (!this.isAttackedEffect && this._spAni && this._spAni.node && this._spAni.node.isValid) {
            this.isAttackedEffect = true;
            // 受伤音效
            if (isAudio) {
                // 受伤音效
                if (this.audio_hart) {
                    gameMgr_1.gameMgr.playClip(this.audio_hart, this.node, 0.5);
                }
            }
            // 缩放
            cc.tween(this._aniLayer)
                .to(0.1, { scale: 0.7 }, { easing: "sineIn" })
                .to(0.1, { scale: 1 }, { easing: "sineOut" })
                .call(function () { _this.isAttackedEffect = false; })
                .start();
            // 变色
            if (this._canColor) {
                cc.tween(this._spAni.node)
                    .to(0.1, { color: new cc.Color(0, 0, 0, 255) })
                    .to(0.1, { color: cc.Color.WHITE })
                    .start();
            }
            // 后退
            if (this.rig.type == cc.RigidBodyType.Dynamic && dir && this.canMove && this.canMoveDir) {
                // 控制
                this.canMove = false;
                this.scheduleOnce(function () { _this.canMove = true; }, 0.1);
                // 后退
                var div = dir.mulSelf(400 * dir.mag()).addSelf(this.rig.linearVelocity);
                var maxDiv = this.isBoss ? 100 : 300;
                if (div.mag() > maxDiv) {
                    div.normalizeSelf().mulSelf(maxDiv);
                }
                this.rig.linearVelocity = div;
            }
        }
        if (this.HP <= 0) {
            this.death();
            // 死亡事件
            cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Zombie_Death, node: this.node, from: from });
        }
        else {
            // 受伤事件
            if (from && isEmit) {
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Zombie_Hart, node: this.node });
            }
        }
    };
    /** 死亡 */
    ZombieBase.prototype.death = function () {
        var _this = this;
        this.isAtk = false;
        this.isDeath = true;
        this._spAni.timeScale = 1;
        // 碰撞体
        this.node.getComponents(cc.Collider).forEach(function (v) { return v.enabled = false; });
        // 隐藏销毁
        cc.tween(this._spAni.node).to(1, { opacity: 0 }).start();
        // 死亡音效
        if (this.audio_die)
            gameMgr_1.gameMgr.playClip(this.audio_die, null, 0.2);
        // 死亡效果
        this.updateAni();
        if (this.zombieId < 8) {
            var pre = CocosZ_1.cocosz.resMgr.getRes("effect_death", cc.Prefab);
            if (pre) {
                var effect_death = cc.instantiate(pre);
                effect_death.zIndex = Constant_1.ZindexLayer.zinedx_floorSkill;
                effect_death.setPosition(this.node.position);
                effect_death.setParent(this.node.parent);
            }
        }
        // 死亡掉落道具
        this.creatItem();
        this.scheduleOnce(function () { _this.putNodePool(); }, 2);
    };
    ZombieBase.prototype.creatItem = function () {
        if (gameMgr_1.gameMgr.isWin || gameMgr_1.gameMgr.isFail)
            return;
        if (UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.isValid) {
            var count = (this.zombieId < 8 ? 1 : 10);
            for (var i = 0; i < count; i++) {
                var pos = this.node.getPosition();
                if (i > 0) {
                    pos.addSelf(cc.v2(20 * i, 0).rotateSelf(2 * Math.PI * Math.random()));
                }
                UpgradeMgr_1.upgradeMgr.createJingyan(pos);
            }
        }
    };
    ZombieBase.prototype.frozenStart = function () {
        this._canColor = false;
        // 停止受伤变色
        this._spAni.node.stopAllActions();
        // 启动变色
        this._spAni.node.color = cc.Color.BLUE;
        if (this._spAni) {
            this._spAni.timeScale = 0;
        }
        // 移动暂停
        this.isAtk = false;
        this.canMoveDir = false;
        this.moveDir = cc.Vec2.ZERO;
        this.udpateRBody(this.moveDir, true);
    };
    ZombieBase.prototype.frozenEnd = function () {
        if (!this.isDeath) {
            this._canColor = true;
            // 恢复颜色
            this._spAni.node.color = cc.Color.WHITE;
            if (this._spAni) {
                this._spAni.timeScale = 1;
                this._spAni.setAnimation(0, "idle", true);
            }
            // 移动恢复
            this.canMoveDir = true;
            this.isAtk = false;
            this.atkDir = cc.Vec2.ZERO;
            this.updateMove();
            this.updatePerson();
            this.udpateRBody(this.moveDir);
        }
    };
    ZombieBase.prototype.fire_start = function () {
        this._canColor = false;
        // 停止受伤变色
        this._spAni.node.stopAllActions();
        // 启动变色
        this._spAni.node.color = cc.Color.RED;
    };
    ZombieBase.prototype.fire_end = function () {
        this._canColor = true;
        // 恢复颜色
        this._spAni.node.color = cc.Color.WHITE;
    };
    ZombieBase.prototype.canAtk = function () {
        if (!this._canAtk || this.isAtk || this._spAni.timeScale == 0 || this._spAni.animation.includes("spawn") || this._spAni.animation.includes("jump")) {
            return false;
        }
        return true;
    };
    __decorate([
        property({ tooltip: "僵尸id" })
    ], ZombieBase.prototype, "zombieId", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "子弹预制体", visible: function () { return [5, 6, 20].includes(this.zombieId); } })
    ], ZombieBase.prototype, "bullet_prefab", void 0);
    __decorate([
        property({ type: sp.Skeleton, tooltip: "警告圈", visible: function () { return [5, 6, 20].includes(this.zombieId); } })
    ], ZombieBase.prototype, "sp_hongzhaquan", void 0);
    __decorate([
        property({ type: cc.AudioClip, tooltip: "攻击音效1" })
    ], ZombieBase.prototype, "audio_attack1", void 0);
    __decorate([
        property({ type: cc.AudioClip, tooltip: "攻击音效2" })
    ], ZombieBase.prototype, "audio_attack2", void 0);
    __decorate([
        property({ type: cc.AudioClip, tooltip: "受伤音效" })
    ], ZombieBase.prototype, "audio_hart", void 0);
    __decorate([
        property({ type: cc.AudioClip, tooltip: "死亡音效" })
    ], ZombieBase.prototype, "audio_die", void 0);
    ZombieBase = __decorate([
        ccclass
    ], ZombieBase);
    return ZombieBase;
}(person_1.default));
exports.default = ZombieBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcWm9tYmllQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBOEQ7QUFDOUQsOENBQTZDO0FBQzdDLGtEQUE4RDtBQUM5RCw2Q0FBd0M7QUFDeEMsMkNBQTBDO0FBQzFDLHlDQUFvQztBQUNwQyxpREFBZ0Q7QUFDaEQsbUNBQThCO0FBRXhCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssT0FLSjtBQUxELFdBQUssT0FBTztJQUNSLHVDQUFTLENBQUE7SUFDVCxxQ0FBSSxDQUFBO0lBQ0oseUNBQU0sQ0FBQTtJQUNOLHVDQUFLLENBQUE7QUFDVCxDQUFDLEVBTEksT0FBTyxLQUFQLE9BQU8sUUFLWDtBQUdEO0lBQXdDLDhCQUFNO0lBQTlDO1FBQUEscUVBczRCQztRQXA0QkcsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUVoQyxvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFHbkMsbUJBQWEsR0FBaUIsSUFBSSxDQUFDO1FBRW5DLG1CQUFhLEdBQWlCLElBQUksQ0FBQztRQUVuQyxnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsZUFBUyxHQUFpQixJQUFJLENBQUM7UUFFL0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUVkLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsWUFBTSxHQUFnQixJQUFJLENBQUM7UUF3TzdCLGtCQUFZLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsV0FBSyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBZ2xCckIsZUFBUyxHQUFZLElBQUksQ0FBQztRQWdEMUIsYUFBTyxHQUFZLElBQUksQ0FBQzs7SUFRcEMsQ0FBQztJQS8yQmEsMkJBQU0sR0FBaEI7UUFB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SUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDOUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUE7NEJBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ3ZCO3dCQUNELE1BQU07cUJBQ1Q7b0JBQ0QsS0FBSyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUM5RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7NEJBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQTs0QkFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDdEI7d0JBQ0QsTUFBTTtxQkFDVDtvQkFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUNMLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFN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REFDbkI7SUFoQmQsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQXM0QjlCO0lBQUQsaUJBQUM7Q0F0NEJELEFBczRCQyxDQXQ0QnVDLGdCQUFNLEdBczRCN0M7a0JBdDRCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IENvbnN0YW50LCB7IFppbmRleExheWVyIH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5pbXBvcnQgR2FtZURhdGUgZnJvbSBcIi4uL0dhbWUvZ2FtZURhdGVcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuLi9HYW1lL2dhbWVNZ3JcIjtcclxuaW1wb3J0IFBlcnNvbiBmcm9tIFwiLi4vR2FtZS9wZXJzb25cIjtcclxuaW1wb3J0IHsgdXBncmFkZU1nciB9IGZyb20gXCIuLi9HYW1lL1VwZ3JhZGVNZ3JcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9idWxsZXRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIEF0a1R5cGUge1xyXG4gICAgZnJvbnQgPSAwLC8vIOWJjeaWuVxyXG4gICAgYXJlYSwvLyDljLrln59cclxuICAgIGNoYXJnZSwvLyDlhrLplItcclxuICAgIHJhbmdlLC8vIOi/nOeoi1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab21iaWVCYXNlIGV4dGVuZHMgUGVyc29uIHtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5YO15bC4aWRcIiB9KVxyXG4gICAgem9tYmllSWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuWtkOW8uemihOWItuS9k1wiLCB2aXNpYmxlKCkgeyByZXR1cm4gWzUsIDYsIDIwXS5pbmNsdWRlcyh0aGlzLnpvbWJpZUlkKSB9IH0pXHJcbiAgICBidWxsZXRfcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIHRvb2x0aXA6IFwi6K2m5ZGK5ZyIXCIsIHZpc2libGUoKSB7IHJldHVybiBbNSwgNiwgMjBdLmluY2x1ZGVzKHRoaXMuem9tYmllSWQpIH0gfSlcclxuICAgIHNwX2hvbmd6aGFxdWFuOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQXVkaW9DbGlwLCB0b29sdGlwOiBcIuaUu+WHu+mfs+aViDFcIiB9KVxyXG4gICAgYXVkaW9fYXR0YWNrMTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkF1ZGlvQ2xpcCwgdG9vbHRpcDogXCLmlLvlh7vpn7PmlYgyXCIgfSlcclxuICAgIGF1ZGlvX2F0dGFjazI6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5BdWRpb0NsaXAsIHRvb2x0aXA6IFwi5Y+X5Lyk6Z+z5pWIXCIgfSlcclxuICAgIGF1ZGlvX2hhcnQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5BdWRpb0NsaXAsIHRvb2x0aXA6IFwi5q275Lqh6Z+z5pWIXCIgfSlcclxuICAgIGF1ZGlvX2RpZTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBpc0Jvc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2FuaUxheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBfc3BBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaWQgPSA5NDtcclxuICAgICAgICAvLyDliJ3lp4vljJbphY3nva7ooajlsZ7mgKdcclxuICAgICAgICBpZiAoR2FtZURhdGUuWm9tYmllTWVzc1t0aGlzLnpvbWJpZUlkXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGxlSHAgPSBHYW1lRGF0ZS5ab21iaWVNZXNzW3RoaXMuem9tYmllSWRdLmhwO1xyXG4gICAgICAgICAgICB0aGlzLmF0a051bSA9IEdhbWVEYXRlLlpvbWJpZU1lc3NbdGhpcy56b21iaWVJZF0uYXRrO1xyXG4gICAgICAgICAgICB0aGlzLmF0a1JhbmdlID0gR2FtZURhdGUuWm9tYmllTWVzc1t0aGlzLnpvbWJpZUlkXS5hdGtSYW5nZTtcclxuICAgICAgICAgICAgdGhpcy5Nb3ZlU3BlZWQgPSBHYW1lRGF0ZS5ab21iaWVNZXNzW3RoaXMuem9tYmllSWRdLnNwZWVkO1xyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykgeyB0aGlzLk1vdmVTcGVlZCAvPSAyOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWkp+Wwj+e8qeaUvlxyXG4gICAgICAgIGlmICh0aGlzLmlzQm9zcykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDAuODtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yia5L2TXHJcbiAgICAgICAgdGhpcy5yaWcgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgaWYgKHRoaXMucmlnKSB7IHRoaXMucmlnLmxpbmVhckRhbXBpbmcgPSAwLjI7IH1cclxuICAgICAgICAvLyBzcGluZeWKqOeUu1xyXG4gICAgICAgIHRoaXMuX2FuaUxheWVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYW5pTGF5ZXJcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaUxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwQW5pID0gdGhpcy5fYW5pTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJhbmlcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g55uR5ZCs5Yqo55S7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwQW5pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwQW5pLnNldFN0YXJ0TGlzdGVuZXIoKCkgPT4geyB0aGlzLnN0YXJ0TGlzdGVuZXJDYWxsKCkgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwQW5pLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4geyB0aGlzLmVuZExpc3RlbmVyQ2FsbCgpIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIOWPlua2iOebkeWQrFxyXG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIGluaXROb2RlKCkge1xyXG4gICAgICAgIGdhbWVNZ3IgJiYgZ2FtZU1nci5zZXRNYXBUcy5jaGVja05vZGUodGhpcy5ub2RlLCB0cnVlKTtcclxuICAgICAgICAvLyDmtojmga/nm5HlkKxcclxuICAgICAgICBjYy5nYW1lLm9uKENvbnN0YW50LkVfR0FNRV9MT0dJQywgdGhpcy5fb25HYW1lTWVzc2FnZUhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIGdhbWVNZ3Iuem9tYmllQ3VyTnVtKys7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF96b21iaWUgKyB0aGlzLnpvbWJpZUlkO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuYXRrRGlyID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIHRoaXMuY3VySHAgPSB0aGlzLnRvdGxlSHA7XHJcbiAgICAgICAgdGhpcy5pc0RlYXRoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0F0ayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NhbkF0ayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW5Nb3ZlRGlyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbk1vdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyDmkq3mlL7lh7rlnLrliqjnlLtcclxuICAgICAgICBpZiAodGhpcy5fc3BBbmkgJiYgdGhpcy5fc3BBbmkuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS5ub2RlLnNjYWxlWCA9IE1hdGguYWJzKHRoaXMuX3NwQW5pLm5vZGUuc2NhbGVYKTtcclxuICAgICAgICAgICAgdGhpcy5fc3BBbmkubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQm9zcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BBbmkuc2V0QW5pbWF0aW9uKDAsIFwic3Bhd25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOeisOaSnuS9k1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib3hDb2xsaWRlciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib3hDb2xsaWRlcikgYm94Q29sbGlkZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAyKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BBbmkuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vIOeisOaSnuS9k1xyXG4gICAgICAgICAgICAgICAgbGV0IGJveENvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm94Q29sbGlkZXIpIGJveENvbGxpZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOi9sOeCuOWciFxyXG4gICAgICAgIGlmICh0aGlzLnNwX2hvbmd6aGFxdWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BfaG9uZ3poYXF1YW4ubm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlLnBhcmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BfaG9uZ3poYXF1YW4ubm9kZS56SW5kZXggPSBaaW5kZXhMYXllci56aW5lZHhfZmxvb3JUaXA7XHJcbiAgICAgICAgICAgIHRoaXMuc3BfaG9uZ3poYXF1YW4uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcF9ob25nemhhcXVhbiAmJiB0aGlzLnNwX2hvbmd6aGFxdWFuLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwX2hvbmd6aGFxdWFuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJvc3NcclxuICAgICAgICBpZiAodGhpcy5pc0Jvc3MpIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX0NvbW1vbnpvbWJpZV9EZXN0b3J5IH0pO1xyXG4gICAgICAgICAgICBnYW1lTWdyICYmIGdhbWVNZ3Iuc2hvd0Jvc3NIcCgxKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvb3NcIikpIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvb3NcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHV0Tm9kZVBvb2woKSB7XHJcbiAgICAgICAgLy8g5Y+W5raI55uR5ZCsXHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgLy8gYm9zc1xyXG4gICAgICAgIGlmICh0aGlzLmlzQm9zcykge1xyXG4gICAgICAgICAgICAvLyBib3Nz5YWJ5b2xXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib29zXCIpKSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib29zXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBib3Nz6L6555WMXHJcbiAgICAgICAgICAgIGlmIChnYW1lTWdyKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyICYmIGdhbWVNZ3Iuc2hvd0Jvc3NIcCgwKTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLmJvc3NfYm9yZGVyICYmIGNjLmlzVmFsaWQoZ2FtZU1nci5ib3NzX2JvcmRlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLmJvc3NfYm9yZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLmJvc3NfYm9yZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzQm9zcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDovbDngrjlnIhcclxuICAgICAgICBpZiAodGhpcy5zcF9ob25nemhhcXVhbiAmJiB0aGlzLnNwX2hvbmd6aGFxdWFuLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zcF9ob25nemhhcXVhbi5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNwX2hvbmd6aGFxdWFuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhbWVNZ3Iuem9tYmllQ3VyTnVtLS07XHJcbiAgICAgICAgZ2FtZU1nciAmJiBnYW1lTWdyLmlzVmFsaWQgJiYgZ2FtZU1nci5ub2RlUHV0KHRoaXMubm9kZS5uYW1lLCB0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGlzdGVuZXJDYWxsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zcEFuaS5hbmltYXRpb24uaW5jbHVkZXMoXCJzcGF3blwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS50aW1lU2NhbGUgPSAwLjQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5fc3BBbmkudGltZVNjYWxlID0gMTsgfSwgMSlcclxuICAgICAgICAgICAgdGhpcy5jYW5Nb3ZlRGlyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIOWHuuWcuuaWueWQkVxyXG4gICAgICAgICAgICBsZXQgZnJvbVBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgdG9Qb3MgPSBnYW1lTWdyLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbGV0IGRpdiA9IHRvUG9zLnN1YlNlbGYoZnJvbVBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwQW5pLm5vZGUuc2NhbGVYID0gKGRpdi54ID4gMCA/IDEgOiAtMSkgKiBNYXRoLmFicyh0aGlzLl9zcEFuaS5ub2RlLnNjYWxlWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcImF0dGFja1wiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQXRrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYW5Nb3ZlRGlyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChbOCwgOSwgMThdLmluY2x1ZGVzKHRoaXMuem9tYmllSWQpICYmIHRoaXMuX3NwQW5pLmFuaW1hdGlvbiA9PSBcImF0dGFjazJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFJhdGUgKj0gMi41O1xyXG4gICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRSYXRlIC89IDIuNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC4yKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFsxMCwgMTEsIDEyLCAxM10uaW5jbHVkZXModGhpcy56b21iaWVJZCkgJiYgdGhpcy5fc3BBbmkuYW5pbWF0aW9uID09IFwiYXR0YWNrMlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkUmF0ZSAqPSAzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRSYXRlIC89IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlRGlyID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuMilcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChbMTQsIDE5XS5pbmNsdWRlcyh0aGlzLnpvbWJpZUlkKSAmJiB0aGlzLl9zcEFuaS5hbmltYXRpb24uaW5jbHVkZXMoXCJhdHRhY2tcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRSYXRlICo9IDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVkcGF0ZVJCb2R5KHRoaXMubW92ZURpcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFJhdGUgLz0gMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC4yKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuem9tYmllSWQgPT0gMTUgJiYgdGhpcy5fc3BBbmkuYW5pbWF0aW9uID09IFwiYXR0YWNrXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRSYXRlICo9IDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVkcGF0ZVJCb2R5KHRoaXMubW92ZURpcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFJhdGUgLz0gMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC40KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuem9tYmllSWQgPT0gMTYgJiYgdGhpcy5fc3BBbmkuYW5pbWF0aW9uID09IFwiYXR0YWNrXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRSYXRlICo9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVkcGF0ZVJCb2R5KHRoaXMubW92ZURpcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZFJhdGUgLz0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC4zKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuem9tYmllSWQgPT0gMTcgJiYgdGhpcy5fc3BBbmkuYW5pbWF0aW9uLmluY2x1ZGVzKFwiYXR0YWNrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkUmF0ZSAqPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRSYXRlIC89IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlRGlyID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuMylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZURpciA9IGNjLlZlYzIuWkVSTztcclxuICAgICAgICAgICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zcEFuaS5hbmltYXRpb24uaW5jbHVkZXMoXCJqdW1wX3VwXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZURpciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmRMaXN0ZW5lckNhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcInNwYXduXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwQW5pLnNldEFuaW1hdGlvbigwLCBcImlkbGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZURpciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBlcnNvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnVkcGF0ZVJCb2R5KHRoaXMubW92ZURpcik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zcEFuaS5hbmltYXRpb24uaW5jbHVkZXMoXCJhdHRhY2tcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BBbmkuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5pc0F0ayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVEaXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQZXJzb24oKTtcclxuICAgICAgICAgICAgdGhpcy51ZHBhdGVSQm9keSh0aGlzLm1vdmVEaXIpO1xyXG4gICAgICAgICAgICB0aGlzLmF0a0RpciA9IGNjLlZlYzIuWkVSTztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcImp1bXBfZG93blwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVEaXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOa2iOaBryAqL1xyXG4gICAgcHJpdmF0ZSBfb25HYW1lTWVzc2FnZUhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICAvLyDmuIXpmaTmiYDmnInlg7XlsLhcclxuICAgICAgICAgICAgY2FzZSBDb25zdGFudC5FX0FsbHpvbWJpZV9EZXN0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhcnQoOTk5OTk5OSwgbnVsbCwgbnVsbCwgdHJ1ZSwgdHJ1ZSwgY2MuQ29sb3IuV0hJVEUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYm9zc+WHuueOsOa4hemZpOaZrumAmuWDteWwuFxyXG4gICAgICAgICAgICBjYXNlIENvbnN0YW50LkVfQ29tbW9uem9tYmllX0Rlc3Rvcnk6IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0Jvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMywgeyBvcGFjaXR5OiAxIH0sIHsgZWFzaW5nOiBcImZhZGVcIiB9KS5jYWxsKCgpID0+IHsgdGhpcy5wdXROb2RlUG9vbCgpOyB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGl2VG9QbGF5ZXI6IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICBwcm90ZWN0ZWQgX3RpbWU6IG51bWJlciA9IC0xO1xyXG4gICAgbGF0ZVVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZWF0aCB8fCBjb2Nvc3ouaXNQYXVzZSB8fCAhZ2FtZU1nci5pc0dhbWVTdGFydCB8fCBnYW1lTWdyLmlzV2luIHx8IGdhbWVNZ3IuaXNGYWlsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudWRwYXRlUkJvZHkoY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90aW1lKys7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWUgJSAxNSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aW1lICUgMzAgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEaXYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXRrKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQW5pKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGVyc29uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGl2KCkge1xyXG4gICAgICAgIGxldCBmcm9tUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHRvUG9zID0gZ2FtZU1nci5wbGF5ZXJUcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fZGl2VG9QbGF5ZXIgPSB0b1Bvcy5zdWJTZWxmKGZyb21Qb3MpO1xyXG4gICAgICAgIC8vIOi2heWHuuWxj+W5lei3neemu+WIoOmZpFxyXG4gICAgICAgIGlmICghdGhpcy5pc0Jvc3MgJiYgdGhpcy5fZGl2VG9QbGF5ZXIubWFnKCkgPiBjYy53aW5TaXplLmhlaWdodCAvIDIgLyBnYW1lTWdyLm1haW5DYW1lcmEuem9vbVJhdGlvKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHV0Tm9kZVBvb2woKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOabtOaWsOenu+WKqCAqL1xyXG4gICAgdXBkYXRlTW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5yaWcudHlwZSA9PSBjYy5SaWdpZEJvZHlUeXBlLkR5bmFtaWMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuTW92ZSAmJiB0aGlzLmNhbk1vdmVEaXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIOacieebruagh1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnjqnlrrblrZjmtLtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWVNZ3IucGxheWVyVHMuaXNEZWF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDot7Pot4NcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuem9tYmllSWQgPT0gMyAmJiBNYXRoLnJhbmRvbSgpIDwgMC4yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcImp1bXBcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJqdW1wX3VwXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcEFuaS5hZGRBbmltYXRpb24oMCwgXCJqdW1wX2Rvd25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZURpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOacneedgOeOqeWutuenu+WKqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA+PSB0aGlzLmF0a1JhbmdlICogMC44KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy52Mih0aGlzLl9kaXZUb1BsYXllci5ub3JtYWxpemUoKSkucm90YXRlU2VsZihNYXRoLlBJIC8gMiAqICgwLjUgLSBNYXRoLnJhbmRvbSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Led56a7546p5a625b6I6L+R77yM5YGc5q2i56e75YqoIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZURpciA9IGNjLlZlYzIuWkVSTztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDnjqnlrrbmrbvkuqFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Led56a75b6I6L+R5YiZ6L+c56a7546p5a62XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA8ICh0aGlzLmlzQm9zcyA/IDgwMCA6IDE1MDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSB0aGlzLl9kaXZUb1BsYXllci5ub3JtYWxpemUoKS5uZWdTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6ZqP5py656e75YqoIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZURpciA9IGNjLnYyKHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpKS5yb3RhdGVTZWxmKDIgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOabtOaWsOaUu+WHuyAqL1xyXG4gICAgdXBkYXRlQXRrKCkge1xyXG4gICAgICAgIC8vIOiDveWQpuaUu+WHu+aUu+WHu1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5BdGsoKSkge1xyXG4gICAgICAgICAgICAvLyAuLi5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5paw55qE5pS75Ye7XHJcbiAgICAgICAgZWxzZSBpZiAoZ2FtZU1nci5wbGF5ZXJUcyAmJiAhZ2FtZU1nci5wbGF5ZXJUcy5pc0RlYXRoKSB7XHJcbiAgICAgICAgICAgIC8vIOaZrumAmui3neemu+aUu+WHu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGl2VG9QbGF5ZXIubWFnKCkgPCB0aGlzLmF0a1JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0a0RpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdGsoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDov5zot53nprvmlLvlh7tcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuem9tYmllSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGl2VG9QbGF5ZXIubWFnKCkgPCA2MDAgJiYgTWF0aC5yYW5kb20oKSA8IDAuMSAqICh0aGlzLmlzQm9zcyA/IDIgOiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGtEaXIgPSB0aGlzLl9kaXZUb1BsYXllci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZURpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0ayhcImF0dGFjazJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA8IDgwMCAmJiBNYXRoLnJhbmRvbSgpIDwgMC4xICogKHRoaXMuaXNCb3NzID8gMiA6IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a0RpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlRGlyID0gdGhpcy5fZGl2VG9QbGF5ZXIubm9ybWFsaXplKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXRrKFwiYXR0YWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA8IDgwMCAmJiBNYXRoLnJhbmRvbSgpIDwgMC4xICogKHRoaXMuaXNCb3NzID8gMiA6IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a0RpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlRGlyID0gdGhpcy5fZGl2VG9QbGF5ZXIubm9ybWFsaXplKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXRrKFwiYXR0YWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA8IDYwMCAmJiBNYXRoLnJhbmRvbSgpIDwgMC4xICogKHRoaXMuaXNCb3NzID8gMiA6IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a0RpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlRGlyID0gdGhpcy5fZGl2VG9QbGF5ZXIubm9ybWFsaXplKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXRrKFwiYXR0YWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA8IDYwMCAmJiBNYXRoLnJhbmRvbSgpIDwgMC4xNSAqICh0aGlzLmlzQm9zcyA/IDIgOiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGtEaXIgPSB0aGlzLl9kaXZUb1BsYXllci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZURpciA9IHRoaXMuX2RpdlRvUGxheWVyLm5vcm1hbGl6ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0aygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA8IDYwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjE1ICogKHRoaXMuaXNCb3NzID8gMiA6IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGtEaXIgPSB0aGlzLl9kaXZUb1BsYXllci5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSB0aGlzLl9kaXZUb1BsYXllci5ub3JtYWxpemUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXRrKFwiYXR0YWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BfaG9uZ3poYXF1YW4uaXNWYWxpZCAmJiAhdGhpcy5zcF9ob25nemhhcXVhbi5ub2RlLmFjdGl2ZSAmJiB0aGlzLl9kaXZUb1BsYXllci5tYWcoKSA+IDgwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGsoXCJidWxsZXRfY2h1aVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXRrRGlyID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5pu05paw5Yqo55S7ICovXHJcbiAgICB1cGRhdGVBbmkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZWF0aCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyDmmoLlgZxcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NwQW5pLnRpbWVTY2FsZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAuLi5hXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Ye65Zy6XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcInNwYXduXCIpKSB7IH1cclxuICAgICAgICAgICAgLy8g5pS75Ye7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcImF0dGFja1wiKSkgeyB9XHJcbiAgICAgICAgICAgIC8vIOi3s+i3g1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zcEFuaS5hbmltYXRpb24uaW5jbHVkZXMoXCJqdW1wXCIpKSB7IH1cclxuICAgICAgICAgICAgLy8g5YW25a6DXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g56e75YqoXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlRGlyICYmIHRoaXMubW92ZURpci5tYWcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvbWJpZUlkID09IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLl9zcEFuaS5hbmltYXRpb24uaW5jbHVkZXMoXCJ3aW5nXCIpICYmIHRoaXMuX3NwQW5pLnNldEFuaW1hdGlvbigwLCBcIndpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcInJ1blwiKSAmJiB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJydW5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5b6F5py6XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5fc3BBbmkuYW5pbWF0aW9uLmluY2x1ZGVzKFwiaWRsZVwiKSAmJiB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOatu+S6oVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NwQW5pICYmIHRoaXMuX3NwQW5pLnNrZWxldG9uRGF0YSAmJiB0aGlzLl9zcEFuaS5za2VsZXRvbkRhdGEuc2tlbGV0b25Kc29uLmFuaW1hdGlvbnNbXCJkaWVcIl0pIHtcclxuICAgICAgICAgICAgIXRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcImRpZVwiKSAmJiB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJkaWVcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGVyc29uKCkge1xyXG4gICAgICAgIGxldCBkaXIgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmF0a0RpciAmJiB0aGlzLmF0a0Rpci5tYWcoKSkge1xyXG4gICAgICAgICAgICBkaXIgPSB0aGlzLmF0a0RpcjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW92ZURpciAmJiB0aGlzLm1vdmVEaXIubWFnKCkpIHtcclxuICAgICAgICAgICAgZGlyID0gdGhpcy5tb3ZlRGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliqjnlLvmlrnlkJFcclxuICAgICAgICBpZiAoZGlyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwQW5pLm5vZGUuc2NhbGVYID0gTWF0aC5hYnModGhpcy5fc3BBbmkubm9kZS5zY2FsZVgpICogKGRpci54ID4gMCA/IDEgOiAtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDliJrkvZPnp7vliqggKi9cclxuICAgIHVkcGF0ZVJCb2R5KGRpcjogY2MuVmVjMiwgaXNNdXN0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5yaWcudHlwZSA9PSBjYy5SaWdpZEJvZHlUeXBlLkR5bmFtaWMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuTW92ZSB8fCBpc011c3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkaXIgJiYgIWRpci5lcXVhbHMoY2MuVmVjMi5aRVJPKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnLmxpbmVhclZlbG9jaXR5ID0gZGlyLm11bChNYXRoLmZsb29yKHRoaXMuTW92ZVNwZWVkICogdGhpcy5zcGVlZFJhdGUgKiAoMSAtIDAuMiAqIE1hdGgucmFuZG9tKCkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnLmxpbmVhclZlbG9jaXR5ID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmlLvlh7sgKi9cclxuICAgIGF0ayhhbmlOYW1lOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IGF0a1R5cGU6IEF0a1R5cGUgPSBBdGtUeXBlLmZyb250O1xyXG4gICAgICAgIGxldCBhdGtSYW5nZTogbnVtYmVyID0gdGhpcy5hdGtSYW5nZTtcclxuICAgICAgICBsZXQgYXRrVGltZTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgYnVsbGV0VGltZTogbnVtYmVyID0gMjtcclxuICAgICAgICBsZXQgY2xpcDogY2MuQXVkaW9DbGlwID0gdGhpcy5hdWRpb19hdHRhY2sxO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuem9tYmllSWQpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICBjYXNlIDE6IHtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFjazJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjbGlwID0gdGhpcy5hdWRpb19hdHRhY2syO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXRrVGltZSA9IDAuMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgY2FzZSAzOiB7XHJcbiAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2sxXCI7XHJcbiAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OiB7XHJcbiAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2tcIjtcclxuICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDU6IHtcclxuICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFja1wiO1xyXG4gICAgICAgICAgICAgICAgYXRrVGltZSA9IDQ7XHJcbiAgICAgICAgICAgICAgICBhdGtUeXBlID0gQXRrVHlwZS5yYW5nZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldFRpbWUgPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuQXRrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDY6IHtcclxuICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFja1wiO1xyXG4gICAgICAgICAgICAgICAgYXRrVGltZSA9IDQ7XHJcbiAgICAgICAgICAgICAgICBhdGtUeXBlID0gQXRrVHlwZS5yYW5nZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldFRpbWUgPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuQXRrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDc6IHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgY2FzZSAxODoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaU5hbWUgPT0gXCJhdHRhY2syXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2syXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrUmFuZ2UgPSAzMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVGltZSA9IDAuMztcclxuICAgICAgICAgICAgICAgICAgICBhdGtUeXBlID0gQXRrVHlwZS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaXAgPSB0aGlzLmF1ZGlvX2F0dGFjazI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBhdGtSYW5nZSA9IDM1MDtcclxuICAgICAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA5OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5pTmFtZSA9PSBcImF0dGFjazJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFjazJcIjtcclxuICAgICAgICAgICAgICAgICAgICBhdGtSYW5nZSA9IDQ1MDtcclxuICAgICAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaXAgPSB0aGlzLmF1ZGlvX2F0dGFjazI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBhdGtSYW5nZSA9IDM1MDtcclxuICAgICAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaU5hbWUgPT0gXCJhdHRhY2syXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2syXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrUmFuZ2UgPSAyMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVGltZSA9IDAuMztcclxuICAgICAgICAgICAgICAgICAgICBjbGlwID0gdGhpcy5hdWRpb19hdHRhY2syO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrUmFuZ2UgPSAyMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVGltZSA9IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgIGNhc2UgMTM6IHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmlOYW1lID09IFwiYXR0YWNrMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gMjUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpcCA9IHRoaXMuYXVkaW9fYXR0YWNrMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gMjUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDE0OlxyXG4gICAgICAgICAgICBjYXNlIDE5OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNikgey8v5Yay55u+XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrUmFuZ2UgPSAzNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVGltZSA9IDAuMztcclxuICAgICAgICAgICAgICAgICAgICBhdGtUeXBlID0gQXRrVHlwZS5jaGFyZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpcCA9IHRoaXMuYXVkaW9fYXR0YWNrMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFjazJcIjsvL+aMpeajjVxyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gMzUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpcCA9IHRoaXMuYXVkaW9fYXR0YWNrMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTU6IHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmlOYW1lID09IFwiYXR0YWNrXCIpIHsvL+WGsumUi1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gMjUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVHlwZSA9IEF0a1R5cGUuY2hhcmdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrMlwiOy8v5Za354GrXHJcbiAgICAgICAgICAgICAgICAgICAgYXRrUmFuZ2UgPSA0MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVGltZSA9IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTY6IHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmlOYW1lID09IFwiYXR0YWNrXCIgfHwgTWF0aC5yYW5kb20oKSA8IDAuNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gNDUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVHlwZSA9IEF0a1R5cGUuYXJlYTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaU5hbWUgPSBcImF0dGFjazJcIjtcclxuICAgICAgICAgICAgICAgICAgICBhdGtSYW5nZSA9IDMwMDtcclxuICAgICAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxNzoge1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBhdGtSYW5nZSA9IDIwMDtcclxuICAgICAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVHlwZSA9IEF0a1R5cGUuY2hhcmdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyMDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaU5hbWUgPT0gXCJidWxsZXRfY2h1aVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRrVHlwZSA9IEF0a1R5cGUucmFuZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldFRpbWUgPSAxLjU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhbmlOYW1lID09IFwiYXR0YWNrXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlOYW1lID0gXCJhdHRhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBhdGtSYW5nZSA9IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICBhdGtUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pTmFtZSA9IFwiYXR0YWNrMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1JhbmdlID0gMzAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0a1RpbWUgPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmiafooYzliqjnlLtcclxuICAgICAgICBpZiAoYW5pTmFtZSkgdGhpcy5fc3BBbmkuc2V0QW5pbWF0aW9uKDAsIGFuaU5hbWUsIGZhbHNlKTtcclxuICAgICAgICBpZiAoY2xpcCAmJiBjbGlwLmlzVmFsaWQpIGdhbWVNZ3IucGxheUNsaXAoY2xpcCwgdGhpcy5ub2RlLCAwLjUpO1xyXG4gICAgICAgIC8vIOaUu+WHu+S8pOWus1xyXG4gICAgICAgIGxldCBjYWxsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZU1nci5wbGF5ZXJUcyAmJiAhZ2FtZU1nci5wbGF5ZXJUcy5pc0RlYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbVBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvUG9zID0gZ2FtZU1nci5wbGF5ZXJUcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGl2ID0gdG9Qb3Muc3ViU2VsZihmcm9tUG9zKTtcclxuICAgICAgICAgICAgICAgIC8vIOWIpOaWreaYr+WQpuWcqOaUu+WHu+iMg+WbtOWSjOaUu+WHu+aWueWQkVxyXG4gICAgICAgICAgICAgICAgaWYgKGRpdi5tYWcoKSA8IGF0a1JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0a1R5cGUgPT0gQXRrVHlwZS5mcm9udCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGl2Lm1hZygpIDwgMjAwIHx8IChkaXYueCAqIHRoaXMuX3NwQW5pLm5vZGUuc2NhbGUgPiAwICYmIE1hdGguYWJzKGRpdi55IC8gZGl2LngpIDwgMS40KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5oYXJ0KDEsIHRoaXMubm9kZSwgZGl2Lm5vcm1hbGl6ZVNlbGYoKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF0a1R5cGUgPT09IEF0a1R5cGUuY2hhcmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuaGFydCgxLCB0aGlzLm5vZGUsIGRpdi5ub3JtYWxpemVTZWxmKCksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5oYXJ0KDEsIHRoaXMubm9kZSwgZGl2Lm5vcm1hbGl6ZVNlbGYoKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXRrVHlwZSA9PSBBdGtUeXBlLmZyb250IHx8IGF0a1R5cGUgPT0gQXRrVHlwZS5hcmVhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGwsIGF0a1RpbWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXRrVHlwZSA9PSBBdGtUeXBlLmNoYXJnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGwsIDAsIDE1KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGF0a1R5cGUgPT0gQXRrVHlwZS5yYW5nZSkge1xyXG4gICAgICAgICAgICBsZXQgcG9zX2Zyb20gPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbGV0IHBvc190byA9IGdhbWVNZ3IucGxheWVyVHMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgcDIgPSBjYy52MigocG9zX2Zyb20ueCArIHBvc190by54KSAvIDIsIHBvc19mcm9tLnkgKyAxNTAwKTtcclxuICAgICAgICAgICAgLy8g55Sf5oiQ5a2Q5by5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1bGxldF9wcmVmYWIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldF9wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgLy8g5a2Q5by56ISa5pysXHJcbiAgICAgICAgICAgICAgICBsZXQgdHMgPSBidWxsZXQuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICB0cy5pZCA9IHRoaXMuaWQ7XHJcbiAgICAgICAgICAgICAgICB0cy5hdGtlciA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgICAgIHRzLmF0ayA9IHRoaXMuYXRrTnVtO1xyXG4gICAgICAgICAgICAgICAgdHMuaXNBbmdsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyDlrZDlvLnlsZ7mgKdcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5zZXRQb3NpdGlvbihwb3NfZnJvbSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X2J1bGxldF9za3k7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIC8vIOWtkOW8ueenu+WKqFxyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oYnVsbGV0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L2w54K46aKE6K2mXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwX2hvbmd6aGFxdWFuICYmIHRoaXMuc3BfaG9uZ3poYXF1YW4uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcF9ob25nemhhcXVhbi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwX2hvbmd6aGFxdWFuLm5vZGUuc2V0UG9zaXRpb24ocG9zX3RvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BfaG9uZ3poYXF1YW4uc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmJlemllclRvKGJ1bGxldFRpbWUsIHBvc19mcm9tLCBwMiwgcG9zX3RvKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55Sf5oiQ54iG54K45a2Q5by5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cy5ib29tRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbSA9IGNjLmluc3RhbnRpYXRlKHRzLmJvb21FZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29tLnBhcmVudCA9IHRzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbS5zZXRQb3NpdGlvbih0cy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1ckJ1bGxldCA9IGJvb20uZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWxsZXQuYXRrID0gdHMuYXRrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVsbGV0LmF0a2VyID0gdHMuYXRrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWxsZXQuaWQgPSB0cy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcImV4cGxvXCIsIGJvb20pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRzLmhpdEVmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBidWxsZXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRzLmhpdEVmZmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBidWxsZXQucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF9lZmZlY3RfaGl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5fY2FuQXRrID0gdHJ1ZTsgfSwgYXRrVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWPl+S8pCAqL1xyXG4gICAgaGFydChhdGtOdW06IG51bWJlciwgZnJvbTogY2MuTm9kZSwgZGlyPzogY2MuVmVjMiwgaXNBdWRpbzogYm9vbGVhbiA9IHRydWUsIGlzRW1pdDogYm9vbGVhbiA9IHRydWUsIGxhYmVsQ29sb3I/OiBjYy5Db2xvciwgaXNNdXN0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0RlYXRoKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGlzTXVzdCA9PSBmYWxzZSAmJiBjb2Nvc3ouaXNQYXVzZSkgcmV0dXJuO1xyXG4gICAgICAgIC8vIOmYsuatomRpcui/h+Wkp1xyXG4gICAgICAgIGlmIChkaXIgJiYgZGlyLm1hZygpID4gMykgZGlyLm5vcm1hbGl6ZVNlbGYoKS5tdWxTZWxmKDMpO1xyXG4gICAgICAgIC8vIOWHj+S8pFxyXG4gICAgICAgIGF0a051bSA9ICgxIC0gdGhpcy5kYW1hZ2VSZWR1Y3Rpb24pICogYXRrTnVtO1xyXG4gICAgICAgIC8vIOaVsOWtl1xyXG4gICAgICAgIGdhbWVNZ3Iuc2hvd1JvbGVUaXAodGhpcy5ub2RlLCBNYXRoLm1pbih0aGlzLkhQLCBhdGtOdW0pLnRvRml4ZWQoMCksIGxhYmVsQ29sb3IpO1xyXG4gICAgICAgIC8vIOiuvue9ruihgOmHj1xyXG4gICAgICAgIHRoaXMuSFAgLT0gYXRrTnVtO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQm9zcykge1xyXG4gICAgICAgICAgICBnYW1lTWdyICYmIGdhbWVNZ3Iuc2hvd0Jvc3NIcCh0aGlzLkhQIC8gdGhpcy50b3RsZUhwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Y+X5Lyk5pWI5p6cXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNrZWRFZmZlY3QgJiYgdGhpcy5fc3BBbmkgJiYgdGhpcy5fc3BBbmkubm9kZSAmJiB0aGlzLl9zcEFuaS5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0F0dGFja2VkRWZmZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8g5Y+X5Lyk6Z+z5pWIXHJcbiAgICAgICAgICAgIGlmIChpc0F1ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlj5fkvKTpn7PmlYhcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvX2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlDbGlwKHRoaXMuYXVkaW9faGFydCwgdGhpcy5ub2RlLCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOe8qeaUvlxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9hbmlMYXllcilcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgc2NhbGU6IDAuNyB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5pc0F0dGFja2VkRWZmZWN0ID0gZmFsc2U7IH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgLy8g5Y+Y6ImyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYW5Db2xvcikge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5fc3BBbmkubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAudG8oMC4xLCB7IGNvbG9yOiBuZXcgY2MuQ29sb3IoMCwgMCwgMCwgMjU1KSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjEsIHsgY29sb3I6IGNjLkNvbG9yLldISVRFIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5ZCO6YCAXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZy50eXBlID09IGNjLlJpZ2lkQm9keVR5cGUuRHluYW1pYyAmJiBkaXIgJiYgdGhpcy5jYW5Nb3ZlICYmIHRoaXMuY2FuTW92ZURpcikge1xyXG4gICAgICAgICAgICAgICAgLy8g5o6n5Yi2XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbk1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5jYW5Nb3ZlID0gdHJ1ZTsgfSwgMC4xKTtcclxuICAgICAgICAgICAgICAgIC8vIOWQjumAgFxyXG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRpci5tdWxTZWxmKDQwMCAqIGRpci5tYWcoKSkuYWRkU2VsZih0aGlzLnJpZy5saW5lYXJWZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4RGl2OiBudW1iZXIgPSB0aGlzLmlzQm9zcyA/IDEwMCA6IDMwMDtcclxuICAgICAgICAgICAgICAgIGlmIChkaXYubWFnKCkgPiBtYXhEaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXYubm9ybWFsaXplU2VsZigpLm11bFNlbGYobWF4RGl2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmlnLmxpbmVhclZlbG9jaXR5ID0gZGl2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLkhQIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kZWF0aCgpO1xyXG4gICAgICAgICAgICAvLyDmrbvkuqHkuovku7ZcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX1pvbWJpZV9EZWF0aCwgbm9kZTogdGhpcy5ub2RlLCBmcm9tOiBmcm9tIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5Y+X5Lyk5LqL5Lu2XHJcbiAgICAgICAgICAgIGlmIChmcm9tICYmIGlzRW1pdCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX1pvbWJpZV9IYXJ0LCBub2RlOiB0aGlzLm5vZGUgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIOatu+S6oSAqL1xyXG4gICAgZGVhdGgoKSB7XHJcbiAgICAgICAgdGhpcy5pc0F0ayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNEZWF0aCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc3BBbmkudGltZVNjYWxlID0gMTtcclxuICAgICAgICAvLyDnorDmkp7kvZNcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50cyhjYy5Db2xsaWRlcikuZm9yRWFjaCh2ID0+IHYuZW5hYmxlZCA9IGZhbHNlKTtcclxuICAgICAgICAvLyDpmpDol4/plIDmr4FcclxuICAgICAgICBjYy50d2Vlbih0aGlzLl9zcEFuaS5ub2RlKS50bygxLCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgICAgICAvLyDmrbvkuqHpn7PmlYhcclxuICAgICAgICBpZiAodGhpcy5hdWRpb19kaWUpIGdhbWVNZ3IucGxheUNsaXAodGhpcy5hdWRpb19kaWUsIG51bGwsIDAuMik7XHJcbiAgICAgICAgLy8g5q275Lqh5pWI5p6cXHJcbiAgICAgICAgdGhpcy51cGRhdGVBbmkoKTtcclxuICAgICAgICBpZiAodGhpcy56b21iaWVJZCA8IDgpIHtcclxuICAgICAgICAgICAgbGV0IHByZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwiZWZmZWN0X2RlYXRoXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIGlmIChwcmUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RfZGVhdGg6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0X2RlYXRoLnpJbmRleCA9IFppbmRleExheWVyLnppbmVkeF9mbG9vclNraWxsO1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0X2RlYXRoLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RfZGVhdGguc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOatu+S6oeaOieiQvemBk+WFt1xyXG4gICAgICAgIHRoaXMuY3JlYXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLnB1dE5vZGVQb29sKCk7IH0sIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0SXRlbSgpIHtcclxuICAgICAgICBpZiAoZ2FtZU1nci5pc1dpbiB8fCBnYW1lTWdyLmlzRmFpbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh1cGdyYWRlTWdyICYmIHVwZ3JhZGVNZ3IuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAodGhpcy56b21iaWVJZCA8IDggPyAxIDogMTApO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcy5hZGRTZWxmKGNjLnYyKDIwICogaSwgMCkucm90YXRlU2VsZigyICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVNZ3IuY3JlYXRlSmluZ3lhbihwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhbkNvbG9yOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGZyb3plblN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuX2NhbkNvbG9yID0gZmFsc2U7XHJcbiAgICAgICAgLy8g5YGc5q2i5Y+X5Lyk5Y+Y6ImyXHJcbiAgICAgICAgdGhpcy5fc3BBbmkubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIC8vIOWQr+WKqOWPmOiJslxyXG4gICAgICAgIHRoaXMuX3NwQW5pLm5vZGUuY29sb3IgPSBjYy5Db2xvci5CTFVFO1xyXG4gICAgICAgIGlmICh0aGlzLl9zcEFuaSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS50aW1lU2NhbGUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnp7vliqjmmoLlgZxcclxuICAgICAgICB0aGlzLmlzQXRrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5Nb3ZlRGlyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb3ZlRGlyID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIHRoaXMudWRwYXRlUkJvZHkodGhpcy5tb3ZlRGlyLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGZyb3plbkVuZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZWF0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5Db2xvciA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIOaBouWkjeminOiJslxyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zcEFuaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BBbmkudGltZVNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwQW5pLnNldEFuaW1hdGlvbigwLCBcImlkbGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g56e75Yqo5oGi5aSNXHJcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZURpciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBdGsgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdGtEaXIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBlcnNvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnVkcGF0ZVJCb2R5KHRoaXMubW92ZURpcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmlyZV9zdGFydCgpIHtcclxuICAgICAgICB0aGlzLl9jYW5Db2xvciA9IGZhbHNlO1xyXG4gICAgICAgIC8vIOWBnOatouWPl+S8pOWPmOiJslxyXG4gICAgICAgIHRoaXMuX3NwQW5pLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAvLyDlkK/liqjlj5joibJcclxuICAgICAgICB0aGlzLl9zcEFuaS5ub2RlLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmVfZW5kKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbkNvbG9yID0gdHJ1ZTtcclxuICAgICAgICAvLyDmgaLlpI3popzoibJcclxuICAgICAgICB0aGlzLl9zcEFuaS5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FuQXRrOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGNhbkF0aygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NhbkF0ayB8fCB0aGlzLmlzQXRrIHx8IHRoaXMuX3NwQW5pLnRpbWVTY2FsZSA9PSAwIHx8IHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcInNwYXduXCIpIHx8IHRoaXMuX3NwQW5pLmFuaW1hdGlvbi5pbmNsdWRlcyhcImp1bXBcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19