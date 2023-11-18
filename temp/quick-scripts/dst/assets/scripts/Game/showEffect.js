
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/showEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcc2hvd0VmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFxRkM7UUFsRkcsYUFBTyxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUczQyxrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFXLENBQUMsQ0FBQzs7UUEyRXZCLGlCQUFpQjtJQUNyQixDQUFDO0lBM0VHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsd0JBQUssR0FBTDtRQUFBLGlCQW9FQztRQW5FRyxpQkFBTyxJQUFJLGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3hDLElBQUksaUJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsRUFBRTtnQkFDbEcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMs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LEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2xGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQ3pDLElBQUksQ0FBQyxjQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO2FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtZQUMzQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2QsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDdkIsSUFBSSxDQUFDLGNBQVEsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBL0VEO1FBREMsUUFBUSxFQUFFOzZDQUNnQztJQUczQztRQURDLFFBQVEsRUFBRTtrREFDaUI7SUFHNUI7UUFEQyxRQUFRLEVBQUU7Z0RBQ1k7SUFUTixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBcUY1QjtJQUFELGVBQUM7Q0FyRkQsQUFxRkMsQ0FyRnFDLEVBQUUsQ0FBQyxTQUFTLEdBcUZqRDtrQkFyRm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lTWdyIH0gZnJvbSBcIi4vZ2FtZU1nclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgdGV4TWVzczogY2MuVmVjNCA9IG5ldyBjYy5WZWM0KDAsIDAsIDAsIDApO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBpbnRlcnZhbFRpbWU6IG51bWJlciA9IDAuMDU7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGVmZmVjdFR5cGU6IG51bWJlciA9IDA7XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBnYW1lTWdyICYmIGdhbWVNZ3Iuc2V0TWFwVHMuY2hlY2tOb2RlKHRoaXMubm9kZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluY2x1ZGVzKFwiYnVsbGV0X2Jvb21cIikpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVNZ3IubWFpbkNhbWVyZVJvb3ROb2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmludGVyc2VjdHModGhpcy5ub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1nci5zaGFrZUVmZmVjdCgzLCAxLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5lZmZlY3RUeXBlID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkgJiYgdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5nZXRNYXRlcmlhbCgwKS5uYW1lID09IFwiZmlyZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXRsID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5nZXRNYXRlcmlhbCgwKTtcclxuICAgICAgICAgICAgICAgIG10bC5zZXRQcm9wZXJ0eShcInRvdGFsVGV4XCIsIHRoaXMudGV4TWVzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWVNZ3IubWFpbkNhbWVyYS5jb250YWluc05vZGUodGhpcy5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbXRsLnNldFByb3BlcnR5KFwiY3VyVGV4XCIsIG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG51bSA+IHRoaXMudGV4TWVzcy54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW0gPiB0aGlzLnRleE1lc3MueCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMiwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4geyB0aGlzLm5vZGUuZGVzdHJveSgpIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5pbnRlcnZhbFRpbWUsIHRoaXMudGV4TWVzcy54KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5lZmZlY3RUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSwgMilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5lZmZlY3RUeXBlID09IDMpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5zZXQoeyBzY2FsZTogMyB9KS50bygwLjUsIHsgc2NhbGU6IDEgfSkudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmVmZmVjdFR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDEuNSwgeyBhbmdsZTogNzIwLCBzY2FsZTogMC41IH0pLnRvKDAuMywgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4geyB0aGlzLm5vZGUuZGVzdHJveSgpIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZWZmZWN0VHlwZSA9PSA1KSB7XHJcbiAgICAgICAgICAgIGxldCBhbmkgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgYW5pLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4geyBjYy5pc1ZhbGlkKHRoaXMubm9kZS5pc1ZhbGlkKSAmJiB0aGlzLm5vZGUuZGVzdHJveSgpOyB9KVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IGNjLmlzVmFsaWQodGhpcy5ub2RlLmlzVmFsaWQpICYmIHRoaXMubm9kZS5kZXN0cm95KCk7IH0sIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmVmZmVjdFR5cGUgPT0gNikge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmRlbGF5KDAuNSkudG8oMC4yLCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7IHRoaXMubm9kZS5kZXN0cm95KCkgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5lZmZlY3RUeXBlID09IDcpIHtcclxuICAgICAgICAgICAgbGV0IGljb24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGljb24pXHJcbiAgICAgICAgICAgICAgICAuYmV6aWVyVG8oMC42LCBjYy5WZWMyLlpFUk8sIGNjLnYyKC01MCwgNTApLCBjYy52MigtNTAgLSA1MCAqIE1hdGgucmFuZG9tKCksIC0xNTApKVxyXG4gICAgICAgICAgICAgICAgLnRvKDEsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogJ2ZhZGUnIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMubm9kZS5kZXN0cm95KCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5lZmZlY3RUeXBlID09IDgpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMubm9kZS5kZXN0cm95KCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=