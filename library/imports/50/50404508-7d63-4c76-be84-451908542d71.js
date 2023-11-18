"use strict";
cc._RF.push(module, '50404UIfWNMdr6ERRkIVC1x', 'bullet');
// scripts/Game/bullet.ts

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
var gameMgr_1 = require("./gameMgr");
var person_1 = require("./person");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletId = 0;
        _this.id = 1;
        _this.atk = 10;
        _this.atker = null;
        _this.canMove = true;
        _this.canBreak = true;
        _this.canPenetrate = false;
        _this.canWall = false;
        _this.boomEffect = null;
        _this.hitEffect = null;
        _this.hitAudio = "";
        _this.isHartMusic = true;
        _this.hitEffectType = 0;
        // LIFE-CYCLE CALLBACKS:
        _this.hartInterval = 0;
        _this.isHitEffectAngle = false;
        _this.isAngle = false;
        _this.isBoom = false;
        _this.isRecord = true;
        // 方向
        _this.dir = null;
        _this._lastPos = null;
        // 已攻击对象
        _this.atkedArr = [];
        return _this;
    }
    Bullet_1 = Bullet;
    Bullet.prototype.start = function () {
        gameMgr_1.gameMgr && gameMgr_1.gameMgr.setMapTs.checkNode(this.node, true);
        if (this.node.zIndex == 0) {
            if (this.isBoom) {
                this.node.zIndex = Constant_1.ZindexLayer.zindex_bomb;
            }
            else if ("liewen" === this.node.name) {
                this.node.zIndex = Constant_1.ZindexLayer.zinedx_floorLiewen;
            }
            else {
                this.node.zIndex = Constant_1.ZindexLayer.zindex_bullet + this.bulletId;
            }
        }
        // gameMgr
        if (this.node.name == "bullet_sd" || this.node.name == "bullet_hdl") {
            var box = this.node.getComponent(cc.BoxCollider);
            if (box) {
                cc.tween(box.size).to(0.3, { height: 550 }).start();
                cc.tween(box.offset).to(0.3, { x: 700 }).start();
            }
        }
    };
    Bullet.prototype.onDisable = function () {
        this._lastPos = null;
    };
    Bullet.prototype.lateUpdate = function (dt) {
        // 每帧设置角度
        if (this.isAngle) {
            if (this._lastPos) {
                var div = this.node.getPosition().subSelf(this._lastPos);
                if (false == div.equals(cc.Vec2.ZERO)) {
                    this.node.angle = -cc.v2(div).signAngle(cc.v2(1, 0)) / Math.PI * 180;
                    this._lastPos = this.node.getPosition();
                }
            }
            else {
                this._lastPos = this.node.getPosition();
            }
        }
    };
    Bullet.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        if (other.tag == 1) {
            var ts_1 = other.getComponent(person_1.default);
            if (ts_1.id == this.id) {
                return;
            }
            // 能倍阻断并且不能穿透玩家
            if (this.canBreak && !this.canPenetrate) {
                this.node.destroy();
            }
            else {
                if (this.atkedArr.includes(other.node)) {
                    return;
                }
                else if (this.isRecord) {
                    this.atkedArr.push(other.node);
                }
            }
            // 击中效果
            if (this.hitEffect && !CocosZ_1.cocosz.isPause) {
                var node = cc.instantiate(this.hitEffect);
                node.zIndex = Constant_1.ZindexLayer.zindex_effect_hit;
                if (this.hitEffectType == 1) {
                    node.parent = other.node;
                    // 击中特效方向
                    if (this.isHitEffectAngle) {
                        node.angle = -cc.v2(this.dir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
                    }
                }
                else {
                    var pos = this.node.getPosition();
                    var dt = this.node.width;
                    if (dt < 5) {
                        var box = this.node.getComponent(cc.BoxCollider);
                        if (box) {
                            dt += box.offset.x;
                        }
                    }
                    pos = pos.add(cc.v2(dt, 0).rotate(this.node.angle / 180 * Math.PI));
                    node.parent = this.node.parent;
                    node.setPosition(pos);
                }
                if (this.hitAudio) {
                    gameMgr_1.gameMgr.playEffect(this.hitAudio, this.node);
                }
            }
            // 爆炸效果
            if (this.boomEffect) {
                var boom = cc.instantiate(this.boomEffect);
                boom.parent = this.node.parent;
                boom.setPosition(this.node.getPosition());
                boom.zIndex = Constant_1.ZindexLayer.zindex_bomb;
                gameMgr_1.gameMgr.playEffect("explo", boom);
                var bullet = boom.getComponent(Bullet_1);
                bullet.atk = this.atk;
                bullet.atker = this.atker;
                bullet.id = this.id;
                bullet.dir = this.dir;
                return;
            }
            // 血液效果
            if (gameMgr_1.gameMgr.blood && self.world && self.world.points && self.world.points[0]) {
                var blood = null;
                blood = cc.instantiate(gameMgr_1.gameMgr.blood);
                blood.parent = gameMgr_1.gameMgr.map;
                blood.zIndex = Constant_1.ZindexLayer.zindex_blood;
                ;
                var pos = blood.parent.convertToNodeSpaceAR(cc.v2(self.world.points[0].x, self.world.points[0].y));
                if (this.dir) {
                    var angle = -cc.v2(this.dir).signAngle(cc.v2(0, 1)) / Math.PI * 180;
                    blood.angle = angle;
                }
                blood.setPosition(pos);
            }
            // 击退
            if (this.isBoom) {
                var dir = other.node.getPosition().subSelf(this.node.getPosition()).normalizeSelf();
                // 方向为0，随机方向
                if (dir.equals(cc.Vec2.ZERO)) {
                    dir = cc.v2(1, 0).rotateSelf(2 * Math.PI * Math.random());
                }
                this.dir = dir.mulSelf(3);
            }
            else if (!this.canMove && this.dir && this.dir.mag() < 2) {
                this.dir.normalizeSelf().mulSelf(2);
            }
            // 敌人受伤
            ts_1.hart(this.atk, this.atker, this.dir, this.isHartMusic);
            if (this.hartInterval) {
                this.schedule(function () {
                    if (ts_1 && ts_1.isValid && _this.atkedArr.includes(ts_1.node)) {
                        ts_1.hart(_this.atk, _this.atker, _this.dir, _this.isHartMusic);
                    }
                }, this.hartInterval);
            }
        }
        // 障碍物
        else if (other.tag == 5) {
            // 爆炸效果
            if (this.boomEffect) {
                var boom = cc.instantiate(this.boomEffect);
                boom.parent = this.node.parent;
                boom.setPosition(this.node.getPosition());
                var bullet = boom.getComponent(Bullet_1);
                bullet.atk = this.atk;
                bullet.atker = this.atker;
                bullet.id = this.id;
                gameMgr_1.gameMgr.playEffect("explo", boom);
            }
            // 销毁子弹
            if (this.canBreak && !this.canWall) {
                var pos = this.node.getPosition();
                var dt = this.node.width;
                if (dt < 5) {
                    var box = this.node.getComponent(cc.BoxCollider);
                    if (box) {
                        dt += box.offset.x;
                    }
                }
                pos = pos.add(cc.v2(dt, 0).rotate(this.node.angle / 180 * Math.PI));
                if (this.hitEffect && this.hitEffectType != 1) {
                    var node = cc.instantiate(this.hitEffect);
                    node.parent = this.node.parent;
                    node.setPosition(pos);
                    node.zIndex = Constant_1.ZindexLayer.zindex_effect_hit;
                }
                else {
                    var node = cc.instantiate(gameMgr_1.gameMgr.spark);
                    node.parent = this.node.parent;
                    node.setPosition(pos);
                    node.zIndex = Constant_1.ZindexLayer.zindex_effect_spark;
                }
                this.node.destroy();
            }
        }
    };
    var Bullet_1;
    __decorate([
        property()
    ], Bullet.prototype, "bulletId", void 0);
    __decorate([
        property()
    ], Bullet.prototype, "canMove", void 0);
    __decorate([
        property({ tooltip: "能否阻断" })
    ], Bullet.prototype, "canBreak", void 0);
    __decorate([
        property({ tooltip: "能否穿透敌人" })
    ], Bullet.prototype, "canPenetrate", void 0);
    __decorate([
        property({ tooltip: "能否穿透墙壁" })
    ], Bullet.prototype, "canWall", void 0);
    __decorate([
        property(cc.Prefab)
    ], Bullet.prototype, "boomEffect", void 0);
    __decorate([
        property(cc.Prefab)
    ], Bullet.prototype, "hitEffect", void 0);
    __decorate([
        property({ type: cc.String, tooltip: "子弹音效" })
    ], Bullet.prototype, "hitAudio", void 0);
    __decorate([
        property({ tooltip: "敌人受伤是否发出音效" })
    ], Bullet.prototype, "isHartMusic", void 0);
    __decorate([
        property()
    ], Bullet.prototype, "hitEffectType", void 0);
    __decorate([
        property()
    ], Bullet.prototype, "hartInterval", void 0);
    __decorate([
        property({ tooltip: "击中效果设置角度" })
    ], Bullet.prototype, "isHitEffectAngle", void 0);
    __decorate([
        property({ tooltip: "每帧设置角度" })
    ], Bullet.prototype, "isAngle", void 0);
    __decorate([
        property({ tooltip: "是否爆炸子弹" })
    ], Bullet.prototype, "isBoom", void 0);
    __decorate([
        property({ tooltip: "是否记录受伤者" })
    ], Bullet.prototype, "isRecord", void 0);
    Bullet = Bullet_1 = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

cc._RF.pop();