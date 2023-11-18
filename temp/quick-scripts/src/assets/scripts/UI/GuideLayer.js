"use strict";
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