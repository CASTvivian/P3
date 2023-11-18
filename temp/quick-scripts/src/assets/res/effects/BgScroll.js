"use strict";
cc._RF.push(module, 'acdbc3aRD5AGp4ypzXGP/2Q', 'BgScroll');
// res/effects/BgScroll.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShaderParamComponent = /** @class */ (function (_super) {
    __extends(ShaderParamComponent, _super);
    function ShaderParamComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this._material = null;
        _this._start = 0;
        _this.speed = 1;
        return _this;
    }
    ShaderParamComponent.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
        if (this.sprite) {
            this._material = this.sprite.getMaterial(0);
        }
        this.initParams();
    };
    ShaderParamComponent.prototype.initParams = function () {
        if (this.sprite && this._material && this.speed) {
            this._material.setProperty("speed", this.speed);
        }
    };
    ShaderParamComponent.prototype.update = function (dt) {
        // if (this.sprite) {
        //     this._material = this.sprite.getMaterial(0);
        // }
        if (this.node.active && this._material) {
            if (this._material.getProperty("time", 0) != undefined) {
                this._material.setProperty('time', this._start);
                this._start += dt;
            }
        }
    };
    __decorate([
        property({ displayName: "速度" })
    ], ShaderParamComponent.prototype, "speed", void 0);
    ShaderParamComponent = __decorate([
        ccclass
    ], ShaderParamComponent);
    return ShaderParamComponent;
}(cc.Component));
exports.default = ShaderParamComponent;

cc._RF.pop();