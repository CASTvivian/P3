
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/GuideLayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'acaa0jcS+FD1plO6fY1CE9z', 'GuideLayer');
// scripts/UI/GuideLayer.ts

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
exports.guideLayer = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.guideLayer = null;
var GuideLayer = /** @class */ (function (_super) {
    __extends(GuideLayer, _super);
    function GuideLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgLoadNode = null;
        _this.points = null;
        _this.fjLoadNode = null;
        _this.fjAni = null;
        /////////////////////// 过渡动画 ///////////////////////////////
        _this.curIndex = 0;
        return _this;
    }
    GuideLayer.prototype.onLoad = function () {
        exports.guideLayer = this;
        cc.game.addPersistRootNode(this.node);
        this.node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.node.setContentSize(cc.winSize);
    };
    GuideLayer.prototype.start = function () {
        this.showPoint();
        this.schedule(this.showPoint, 0.5);
    };
    /** 点变化效果 */
    GuideLayer.prototype.showPoint = function () {
        for (var i = 0; i < this.points.childrenCount; i++) {
            if (i <= this.curIndex) {
                this.points.children[i].opacity = 255;
            }
            else {
                this.points.children[i].opacity = 0;
            }
        }
        if (++this.curIndex > this.points.childrenCount) {
            this.curIndex = 0;
        }
    };
    /** 显示过渡动画 */
    GuideLayer.prototype.showBgAni = function () {
        this.bgLoadNode.active = true;
        this.curIndex = 0;
    };
    /** 隐藏过度动画 */
    GuideLayer.prototype.hideBgAni = function () {
        this.bgLoadNode.active = false;
    };
    /////////////////////// 加载动画（直升机） ///////////////////////////////
    /** 显示飞机动画 */
    GuideLayer.prototype.showFjAni = function () {
        this.fjLoadNode.active = true;
        this.fjAni.setAnimation(0, "jiazai", false);
        this.fjAni.addAnimation(0, "jiazai2", true);
    };
    /** 隐藏飞机动画 */
    GuideLayer.prototype.hideFjAni = function () {
        this.fjLoadNode.active = false;
    };
    __decorate([
        property(cc.Node)
    ], GuideLayer.prototype, "bgLoadNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuideLayer.prototype, "points", void 0);
    __decorate([
        property(cc.Node)
    ], GuideLayer.prototype, "fjLoadNode", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GuideLayer.prototype, "fjAni", void 0);
    GuideLayer = __decorate([
        ccclass
    ], GuideLayer);
    return GuideLayer;
}(cc.Component));
exports.default = GuideLayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXEd1aWRlTGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRWpDLFFBQUEsVUFBVSxHQUFlLElBQUksQ0FBQztBQUV6QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQWdFQztRQTlERyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBYzFCLDREQUE0RDtRQUM1RCxjQUFRLEdBQUcsQ0FBQyxDQUFDOztJQXdDakIsQ0FBQztJQXJERywyQkFBTSxHQUFOO1FBQ0ksa0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUlELFlBQVk7SUFDWiw4QkFBUyxHQUFUO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7YUFDekM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzthQUN2QztTQUNKO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsYUFBYTtJQUNiLDhCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWE7SUFDYiw4QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFHRCxpRUFBaUU7SUFDakUsYUFBYTtJQUNiLDhCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxhQUFhO0lBQ2IsOEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBNUREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1M7SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7NkNBQ0k7SUFUVCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBZ0U5QjtJQUFELGlCQUFDO0NBaEVELEFBZ0VDLENBaEV1QyxFQUFFLENBQUMsU0FBUyxHQWdFbkQ7a0JBaEVvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBsZXQgZ3VpZGVMYXllcjogR3VpZGVMYXllciA9IG51bGw7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiZ0xvYWROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcG9pbnRzOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZqTG9hZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgZmpBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgZ3VpZGVMYXllciA9IHRoaXM7XHJcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BvaW50KCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3dQb2ludCwgMC41KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDov4fmuKHliqjnlLsgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgY3VySW5kZXggPSAwO1xyXG4gICAgLyoqIOeCueWPmOWMluaViOaenCAqL1xyXG4gICAgc2hvd1BvaW50KCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb2ludHMuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IHRoaXMuY3VySW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLmNoaWxkcmVuW2ldLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKyt0aGlzLmN1ckluZGV4ID4gdGhpcy5wb2ludHMuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYvuekuui/h+a4oeWKqOeUuyAqL1xyXG4gICAgc2hvd0JnQW5pKCkge1xyXG4gICAgICAgIHRoaXMuYmdMb2FkTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpmpDol4/ov4fluqbliqjnlLsgKi9cclxuICAgIGhpZGVCZ0FuaSgpIHtcclxuICAgICAgICB0aGlzLmJnTG9hZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIOWKoOi9veWKqOeUu++8iOebtOWNh+acuu+8iSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKiog5pi+56S66aOe5py65Yqo55S7ICovXHJcbiAgICBzaG93RmpBbmkoKSB7XHJcbiAgICAgICAgdGhpcy5makxvYWROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5makFuaS5zZXRBbmltYXRpb24oMCwgXCJqaWF6YWlcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZmpBbmkuYWRkQW5pbWF0aW9uKDAsIFwiamlhemFpMlwiLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6ZqQ6JeP6aOe5py65Yqo55S7ICovXHJcbiAgICBoaWRlRmpBbmkoKSB7XHJcbiAgICAgICAgdGhpcy5makxvYWROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=