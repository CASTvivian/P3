
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcYnVsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDhDQUE2QztBQUM3QyxrREFBb0Q7QUFDcEQscUNBQW9DO0FBQ3BDLG1DQUE4QjtBQUd4QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQXlPQztRQXRPRyxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFFZixTQUFHLEdBQVcsRUFBRSxDQUFDO1FBRWpCLFdBQUssR0FBWSxJQUFJLENBQUE7UUFHckIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFHekIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQVcsRUFBRSxDQUFDO1FBR3RCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLHdCQUF3QjtRQUd4QixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUd6QixzQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFHbEMsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUd6QixZQUFNLEdBQVksS0FBSyxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsS0FBSztRQUNMLFNBQUcsR0FBWSxJQUFJLENBQUM7UUE0QlosY0FBUSxHQUFZLElBQUksQ0FBQztRQWdCakMsUUFBUTtRQUNSLGNBQVEsR0FBYyxFQUFFLENBQUM7O0lBcUk3QixDQUFDO2VBek9vQixNQUFNO0lBeUR2QixzQkFBSyxHQUFMO1FBQ0ksaUJBQU8sSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQVcsQ0FBQyxXQUFXLENBQUM7YUFDOUM7aUJBQ0ksSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFXLENBQUMsa0JBQWtCLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNoRTtTQUNKO1FBQ0QsVUFBVTtRQUNWLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFlBQVksRUFBRTtZQUNqRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDaEQsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNwRCxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDcEQ7U0FDSjtJQUNMLENBQUM7SUFFUywwQkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFHUywyQkFBVSxHQUFwQixVQUFxQixFQUFVO1FBQzNCLFNBQVM7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztvQkFDckUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzQzthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQztTQUNKO0lBQ0wsQ0FBQztJQUlELGlDQUFnQixHQUFoQixVQUFpQixLQUFVLEVBQUUsSUFBUztRQUF0QyxpQkFtSUM7UUFsSUcsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNoQixJQUFJLElBQUUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQTtZQUNuQyxJQUFJLElBQUUsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDbEIsT0FBTzthQUNWO1lBQ0QsZUFBZTtZQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BDLE9BQU87aUJBQ1Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0o7WUFDRCxPQUFPO1lBQ1AsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsZUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtvQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUN6QixTQUFTO29CQUNULElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7cUJBQ3hFO2lCQUNKO3FCQUNJO29CQUNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2xDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QixJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ1IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLEdBQUcsRUFBRTs0QkFDTCxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3RCO3FCQUNKO29CQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixpQkFBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEQ7YUFFSjtZQUNELE9BQU87WUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBVyxDQUFDLFdBQVcsQ0FBQztnQkFDdEMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQU0sQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNwQixNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLE9BQU87YUFDVjtZQUNELE9BQU87WUFDUCxJQUFJLGlCQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFFLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQztnQkFDMUIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxzQkFBVyxDQUFDLFlBQVksQ0FBQztnQkFBQSxDQUFDO2dCQUN6QyxJQUFJLEdBQUcsR0FBWSxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDVixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO29CQUNwRSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztpQkFDdkI7Z0JBQ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxQjtZQUNELEtBQUs7WUFDTCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNwRixZQUFZO2dCQUNaLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMxQixHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUM3RDtnQkFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPO1lBQ1AsSUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLElBQUksSUFBRSxJQUFJLElBQUUsQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNyRCxJQUFFLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDN0Q7Z0JBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTthQUN4QjtTQUNKO1FBQ0QsTUFBTTthQUNELElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTztZQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQU0sQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNwQixpQkFBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPO1lBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDUixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2pELElBQUksR0FBRyxFQUFFO3dCQUFFLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFBRTtpQkFDbkM7Z0JBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFcEUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO29CQUMzQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBVyxDQUFDLGlCQUFpQixDQUFDO2lCQUMvQztxQkFDSTtvQkFDRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQVcsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDakQ7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2QjtTQUNKO0lBQ0wsQ0FBQzs7SUFyT0Q7UUFEQyxRQUFRLEVBQUU7NENBQ1U7SUFTckI7UUFEQyxRQUFRLEVBQUU7MkNBQ2E7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7NENBQ0w7SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7Z0RBQ0Y7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7MkNBQ1A7SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzRDQUN6QjtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQzsrQ0FDUjtJQUc1QjtRQURDLFFBQVEsRUFBRTtpREFDZTtJQUkxQjtRQURDLFFBQVEsRUFBRTtnREFDYztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztvREFDQTtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzsyQ0FDUDtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzswQ0FDUjtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzs0Q0FDUjtJQXBEUixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBeU8xQjtJQUFELGFBQUM7Q0F6T0QsQUF5T0MsQ0F6T21DLEVBQUUsQ0FBQyxTQUFTLEdBeU8vQztrQkF6T29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTk9EQVRBIH0gZnJvbSBcImRuc1wiO1xyXG5pbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgeyBaaW5kZXhMYXllciB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuL2dhbWVNZ3JcIjtcclxuaW1wb3J0IFBlcnNvbiBmcm9tIFwiLi9wZXJzb25cIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgYnVsbGV0SWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgaWQ6IG51bWJlciA9IDE7XHJcblxyXG4gICAgYXRrOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBhdGtlcjogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgY2FuTW92ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLog73lkKbpmLvmlq1cIiB9KVxyXG4gICAgY2FuQnJlYWs6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi6IO95ZCm56m/6YCP5pWM5Lq6XCIgfSlcclxuICAgIGNhblBlbmV0cmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi6IO95ZCm56m/6YCP5aKZ5aOBXCIgfSlcclxuICAgIGNhbldhbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYm9vbUVmZmVjdDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGl0RWZmZWN0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlN0cmluZywgdG9vbHRpcDogXCLlrZDlvLnpn7PmlYhcIiB9KVxyXG4gICAgaGl0QXVkaW86IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmlYzkurrlj5fkvKTmmK/lkKblj5Hlh7rpn7PmlYhcIiB9KVxyXG4gICAgaXNIYXJ0TXVzaWM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBoaXRFZmZlY3RUeXBlOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGhhcnRJbnRlcnZhbDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuWHu+S4reaViOaenOiuvue9ruinkuW6plwiIH0pXHJcbiAgICBpc0hpdEVmZmVjdEFuZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmr4/luKforr7nva7op5LluqZcIiB9KVxyXG4gICAgaXNBbmdsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm54iG54K45a2Q5by5XCIgfSlcclxuICAgIGlzQm9vbTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm6K6w5b2V5Y+X5Lyk6ICFXCIgfSlcclxuICAgIGlzUmVjb3JkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvLyDmlrnlkJFcclxuICAgIGRpcjogY2MuVmVjMiA9IG51bGw7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgZ2FtZU1nciAmJiBnYW1lTWdyLnNldE1hcFRzLmNoZWNrTm9kZSh0aGlzLm5vZGUsIHRydWUpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuekluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNCb29tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X2JvbWI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoXCJsaWV3ZW5cIiA9PT0gdGhpcy5ub2RlLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBaaW5kZXhMYXllci56aW5lZHhfZmxvb3JMaWV3ZW47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X2J1bGxldCArIHRoaXMuYnVsbGV0SWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2FtZU1nclxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUubmFtZSA9PSBcImJ1bGxldF9zZFwiIHx8IHRoaXMubm9kZS5uYW1lID09IFwiYnVsbGV0X2hkbFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBib3ggPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKVxyXG4gICAgICAgICAgICBpZiAoYm94KSB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihib3guc2l6ZSkudG8oMC4zLCB7IGhlaWdodDogNTUwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihib3gub2Zmc2V0KS50bygwLjMsIHsgeDogNzAwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYXN0UG9zID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sYXN0UG9zOiBjYy5WZWMyID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyDmr4/luKforr7nva7op5LluqZcclxuICAgICAgICBpZiAodGhpcy5pc0FuZ2xlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0UG9zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGl2ID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuc3ViU2VsZih0aGlzLl9sYXN0UG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChmYWxzZSA9PSBkaXYuZXF1YWxzKGNjLlZlYzIuWkVSTykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAtY2MudjIoZGl2KS5zaWduQW5nbGUoY2MudjIoMSwgMCkpIC8gTWF0aC5QSSAqIDE4MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0UG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0UG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5bey5pS75Ye75a+56LGhXHJcbiAgICBhdGtlZEFycjogY2MuTm9kZVtdID0gW107XHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyOiBhbnksIHNlbGY6IGFueSkge1xyXG4gICAgICAgIGlmIChvdGhlci50YWcgPT0gMSkge1xyXG4gICAgICAgICAgICBsZXQgdHMgPSBvdGhlci5nZXRDb21wb25lbnQoUGVyc29uKVxyXG4gICAgICAgICAgICBpZiAodHMuaWQgPT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOiDveWAjemYu+aWreW5tuS4lOS4jeiDveepv+mAj+eOqeWutlxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5CcmVhayAmJiAhdGhpcy5jYW5QZW5ldHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdGtlZEFyci5pbmNsdWRlcyhvdGhlci5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1JlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXRrZWRBcnIucHVzaChvdGhlci5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDlh7vkuK3mlYjmnpxcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGl0RWZmZWN0ICYmICFjb2Nvc3ouaXNQYXVzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhpdEVmZmVjdCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF9lZmZlY3RfaGl0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGl0RWZmZWN0VHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBvdGhlci5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWHu+S4reeJueaViOaWueWQkVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSGl0RWZmZWN0QW5nbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hbmdsZSA9IC1jYy52Mih0aGlzLmRpcikuc2lnbkFuZ2xlKGNjLnYyKDEsIDApKSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdCA9IHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHQgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3ggPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJveCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHQgKz0gYm94Lm9mZnNldC54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHBvcy5hZGQoY2MudjIoZHQsIDApLnJvdGF0ZSh0aGlzLm5vZGUuYW5nbGUgLyAxODAgKiBNYXRoLlBJKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpdEF1ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5wbGF5RWZmZWN0KHRoaXMuaGl0QXVkaW8sIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOeIhueCuOaViOaenFxyXG4gICAgICAgICAgICBpZiAodGhpcy5ib29tRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9vbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYm9vbUVmZmVjdClcclxuICAgICAgICAgICAgICAgIGJvb20ucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIGJvb20uc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgYm9vbS56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfYm9tYjtcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcImV4cGxvXCIsIGJvb20pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IGJvb20uZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuYXRrID0gdGhpcy5hdGs7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuYXRrZXIgPSB0aGlzLmF0a2VyO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmlkID0gdGhpcy5pZDtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5kaXIgPSB0aGlzLmRpcjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDooYDmtrLmlYjmnpxcclxuICAgICAgICAgICAgaWYgKGdhbWVNZ3IuYmxvb2QgJiYgc2VsZi53b3JsZCAmJiBzZWxmLndvcmxkLnBvaW50cyAmJiBzZWxmLndvcmxkLnBvaW50c1swXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJsb29kOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJsb29kID0gY2MuaW5zdGFudGlhdGUoZ2FtZU1nci5ibG9vZCk7XHJcbiAgICAgICAgICAgICAgICBibG9vZC5wYXJlbnQgPSBnYW1lTWdyLm1hcDtcclxuICAgICAgICAgICAgICAgIGJsb29kLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF9ibG9vZDs7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gYmxvb2QucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGNjLnYyKHNlbGYud29ybGQucG9pbnRzWzBdLngsIHNlbGYud29ybGQucG9pbnRzWzBdLnkpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZSA9IC1jYy52Mih0aGlzLmRpcikuc2lnbkFuZ2xlKGNjLnYyKDAsIDEpKSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QuYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJsb29kLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Ye76YCAXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQm9vbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IG90aGVyLm5vZGUuZ2V0UG9zaXRpb24oKS5zdWJTZWxmKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKS5ub3JtYWxpemVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDmlrnlkJHkuLow77yM6ZqP5py65pa55ZCRXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyLmVxdWFscyhjYy5WZWMyLlpFUk8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyID0gY2MudjIoMSwgMCkucm90YXRlU2VsZigyICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXIubXVsU2VsZigzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5jYW5Nb3ZlICYmIHRoaXMuZGlyICYmIHRoaXMuZGlyLm1hZygpIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXIubm9ybWFsaXplU2VsZigpLm11bFNlbGYoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5pWM5Lq65Y+X5LykXHJcbiAgICAgICAgICAgIHRzLmhhcnQodGhpcy5hdGssIHRoaXMuYXRrZXIsIHRoaXMuZGlyLCB0aGlzLmlzSGFydE11c2ljKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFydEludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHMgJiYgdHMuaXNWYWxpZCAmJiB0aGlzLmF0a2VkQXJyLmluY2x1ZGVzKHRzLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRzLmhhcnQodGhpcy5hdGssIHRoaXMuYXRrZXIsIHRoaXMuZGlyLCB0aGlzLmlzSGFydE11c2ljKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLmhhcnRJbnRlcnZhbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDpmpznoo3nialcclxuICAgICAgICBlbHNlIGlmIChvdGhlci50YWcgPT0gNSkge1xyXG4gICAgICAgICAgICAvLyDniIbngrjmlYjmnpxcclxuICAgICAgICAgICAgaWYgKHRoaXMuYm9vbUVmZmVjdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvb20gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJvb21FZmZlY3QpXHJcbiAgICAgICAgICAgICAgICBib29tLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBib29tLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQgPSBib29tLmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmF0ayA9IHRoaXMuYXRrO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmF0a2VyID0gdGhpcy5hdGtlcjtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5pZCA9IHRoaXMuaWQ7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXlFZmZlY3QoXCJleHBsb1wiLCBib29tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDplIDmr4HlrZDlvLlcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuQnJlYWsgJiYgIXRoaXMuY2FuV2FsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0ID0gdGhpcy5ub2RlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGR0IDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib3ggPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm94KSB7IGR0ICs9IGJveC5vZmZzZXQueDsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcG9zID0gcG9zLmFkZChjYy52MihkdCwgMCkucm90YXRlKHRoaXMubm9kZS5hbmdsZSAvIDE4MCAqIE1hdGguUEkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oaXRFZmZlY3QgJiYgdGhpcy5oaXRFZmZlY3RUeXBlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGl0RWZmZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X2VmZmVjdF9oaXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGdhbWVNZ3Iuc3BhcmspO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfZWZmZWN0X3NwYXJrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==