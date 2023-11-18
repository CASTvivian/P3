"use strict";
cc._RF.push(module, '1b984pSECdBZZxcU1QfL4H3', 'showEffect');
// scripts/Game/showEffect.ts

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
var gameMgr_1 = require("./gameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texMess = new cc.Vec4(0, 0, 0, 0);
        _this.intervalTime = 0.05;
        _this.effectType = 0;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var _this = this;
        gameMgr_1.gameMgr && gameMgr_1.gameMgr.setMapTs.checkNode(this.node, true);
        if (this.node.name.includes("bullet_boom")) {
            if (gameMgr_1.gameMgr.mainCamereRootNode.getBoundingBoxToWorld().intersects(this.node.getBoundingBoxToWorld())) {
                gameMgr_1.gameMgr.shakeEffect(3, 1, true);
            }
        }
        if (this.effectType == 0) {
            if (this.getComponent(cc.Sprite) && this.getComponent(cc.Sprite).getMaterial(0).name == "fire") {
                var mtl_1 = this.getComponent(cc.Sprite).getMaterial(0);
                mtl_1.setProperty("totalTex", this.texMess);
                var num_1 = 1;
                this.schedule(function () {
                    if (!gameMgr_1.gameMgr.mainCamera.containsNode(_this.node)) {
                        _this.node.opacity = 0;
                    }
                    else {
                        _this.node.opacity = 255;
                    }
                    mtl_1.setProperty("curTex", num_1);
                    num_1++;
                    // if (num > this.texMess.x) {
                    //     num = 1;
                    // }
                    if (num_1 > _this.texMess.x) {
                        cc.tween(_this.node).to(0.2, { opacity: 0 }).call(function () { _this.node.destroy(); }).start();
                    }
                }, this.intervalTime, this.texMess.x);
            }
            else {
                this.node.destroy();
            }
        }
        else if (this.effectType == 1) {
            this.scheduleOnce(function () {
                _this.node.destroy();
            }, 2);
        }
        else if (this.effectType == 3) {
            cc.tween(this.node).set({ scale: 3 }).to(0.5, { scale: 1 }).to(0.5, { opacity: 0 }).call(function () {
                _this.node.destroy();
            }).start();
        }
        else if (this.effectType == 4) {
            cc.tween(this.node).to(1.5, { angle: 720, scale: 0.5 }).to(0.3, { opacity: 0 }).call(function () { _this.node.destroy(); }).start();
        }
        else if (this.effectType == 5) {
            var ani = this.node.children[0].getComponent(sp.Skeleton);
            ani.setCompleteListener(function () { cc.isValid(_this.node.isValid) && _this.node.destroy(); });
            this.scheduleOnce(function () { cc.isValid(_this.node.isValid) && _this.node.destroy(); }, 2);
        }
        else if (this.effectType == 6) {
            cc.tween(this.node).delay(0.5).to(0.2, { opacity: 0 }).call(function () { _this.node.destroy(); }).start();
        }
        else if (this.effectType == 7) {
            var icon = this.node.children[0];
            cc.tween(icon)
                .bezierTo(0.6, cc.Vec2.ZERO, cc.v2(-50, 50), cc.v2(-50 - 50 * Math.random(), -150))
                .to(1, { opacity: 0 }, { easing: 'fade' })
                .call(function () { _this.node.destroy(); })
                .start();
        }
        else if (this.effectType == 8) {
            cc.tween(this.node)
                .to(0.5, { opacity: 0 })
                .call(function () { _this.node.destroy(); })
                .start();
        }
    };
    __decorate([
        property()
    ], NewClass.prototype, "texMess", void 0);
    __decorate([
        property()
    ], NewClass.prototype, "intervalTime", void 0);
    __decorate([
        property()
    ], NewClass.prototype, "effectType", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();