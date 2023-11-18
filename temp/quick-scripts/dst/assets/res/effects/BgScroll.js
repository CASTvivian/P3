
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/res/effects/BgScroll.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzXFxlZmZlY3RzXFxCZ1Njcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QztJQUFrRCx3Q0FBWTtJQUE5RDtRQUFBLHFFQXNDQztRQXBDVyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRXpCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRTlCLFlBQU0sR0FBRyxDQUFDLENBQUM7UUFHWCxXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQTZCOUIsQ0FBQztJQTNCRyxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTyx5Q0FBVSxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNsRDtJQUNMLENBQUM7SUFFUyxxQ0FBTSxHQUFoQixVQUFpQixFQUFFO1FBRWYscUJBQXFCO1FBQ3JCLG1EQUFtRDtRQUNuRCxJQUFJO1FBQ0osSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDckI7U0FDSjtJQUNMLENBQUM7SUEzQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7dURBQ047SUFUVCxvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQXNDeEM7SUFBRCwyQkFBQztDQXRDRCxBQXNDQyxDQXRDaUQsRUFBRSxDQUFDLFNBQVMsR0FzQzdEO2tCQXRDb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZGVyUGFyYW1Db21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX21hdGVyaWFsOiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnQgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIumAn+W6plwiIH0pXHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsID0gdGhpcy5zcHJpdGUuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNwcml0ZSAmJiB0aGlzLl9tYXRlcmlhbCAmJiB0aGlzLnNwZWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLnNldFByb3BlcnR5KFwic3BlZWRcIiwgdGhpcy5zcGVlZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdCkge1xyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5zcHJpdGUpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5fbWF0ZXJpYWwgPSB0aGlzLnNwcml0ZS5nZXRNYXRlcmlhbCgwKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUgJiYgdGhpcy5fbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hdGVyaWFsLmdldFByb3BlcnR5KFwidGltZVwiLCAwKSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLnNldFByb3BlcnR5KCd0aW1lJywgdGhpcy5fc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQgKz0gZHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19