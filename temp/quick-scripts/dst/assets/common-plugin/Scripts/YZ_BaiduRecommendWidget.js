
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_BaiduRecommendWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '898daN/0uRPRqRybYS4LfhK', 'YZ_BaiduRecommendWidget');
// common-plugin/Scripts/YZ_BaiduRecommendWidget.ts

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
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_BaiduRecommendWidget = /** @class */ (function (_super) {
    __extends(YZ_BaiduRecommendWidget, _super);
    function YZ_BaiduRecommendWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._widget = null;
        return _this;
    }
    YZ_BaiduRecommendWidget.prototype.onLoad = function () {
        this._widget = this.getComponent(cc.Widget);
    };
    YZ_BaiduRecommendWidget.prototype.onEnable = function () {
        this.getComponent(cc.Sprite).enabled = false;
        if (!PlatUtils_1.default.IsBaidu || !(PlatUtils_1.default.IsBaidu && Utils_1.utils.Tool_Baidu && Utils_1.utils.Tool_Baidu.canShowRecommendButton())) {
            Utils_1.utils.showLog("不支持交叉推广组件!");
            this.node.destroy();
        }
        else {
            if (PlatUtils_1.default.IsBaidu && Utils_1.utils.Tool_Baidu && Utils_1.utils.Tool_Baidu.canShowRecommendButton()) {
                if (this._widget) {
                    Utils_1.utils.Tool_Baidu.showRecommendationButton(CompatibleTool_1.default.position(this._widget.left, this._widget.top));
                }
                else {
                    Utils_1.utils.showLog("baidu recommend button widget component is null");
                }
            }
        }
    };
    YZ_BaiduRecommendWidget.prototype.onDisable = function () {
        if (PlatUtils_1.default.IsBaidu && Utils_1.utils.Tool_Baidu && Utils_1.utils.Tool_Baidu.canShowRecommendButton()) {
        }
    };
    YZ_BaiduRecommendWidget = __decorate([
        ccclass
    ], YZ_BaiduRecommendWidget);
    return YZ_BaiduRecommendWidget;
}(cc.Component));
exports.default = YZ_BaiduRecommendWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfQmFpZHVSZWNvbW1lbmRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUQsMkNBQVk7SUFBakU7UUFBQSxxRUE0QkM7UUExQkcsYUFBTyxHQUFjLElBQUksQ0FBQzs7SUEwQjlCLENBQUM7SUF4Qkcsd0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxtQkFBUyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsbUJBQVMsQ0FBQyxPQUFPLElBQUksYUFBSyxDQUFDLFVBQVUsSUFBSSxhQUFLLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLENBQUMsRUFBRTtZQUM3RyxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksbUJBQVMsQ0FBQyxPQUFPLElBQUksYUFBSyxDQUFDLFVBQVUsSUFBSSxhQUFLLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEVBQUU7Z0JBQ3BGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDZCxhQUFLLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLHdCQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDM0c7cUJBQU07b0JBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2lCQUNwRTthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsMkNBQVMsR0FBVDtRQUNJLElBQUksbUJBQVMsQ0FBQyxPQUFPLElBQUksYUFBSyxDQUFDLFVBQVUsSUFBSSxhQUFLLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEVBQUU7U0FDdkY7SUFDTCxDQUFDO0lBM0JnQix1QkFBdUI7UUFEM0MsT0FBTztPQUNhLHVCQUF1QixDQTRCM0M7SUFBRCw4QkFBQztDQTVCRCxBQTRCQyxDQTVCb0QsRUFBRSxDQUFDLFNBQVMsR0E0QmhFO2tCQTVCb0IsdUJBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9CYWlkdVJlY29tbWVuZFdpZGdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgX3dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIVBsYXRVdGlscy5Jc0JhaWR1IHx8ICEoUGxhdFV0aWxzLklzQmFpZHUgJiYgdXRpbHMuVG9vbF9CYWlkdSAmJiB1dGlscy5Ub29sX0JhaWR1LmNhblNob3dSZWNvbW1lbmRCdXR0b24oKSkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4jeaUr+aMgeS6pOWPieaOqOW5v+e7hOS7tiFcIik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1ICYmIHV0aWxzLlRvb2xfQmFpZHUgJiYgdXRpbHMuVG9vbF9CYWlkdS5jYW5TaG93UmVjb21tZW5kQnV0dG9uKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWRnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5Ub29sX0JhaWR1LnNob3dSZWNvbW1lbmRhdGlvbkJ1dHRvbihDb21wYXRpYmxlVG9vbC5wb3NpdGlvbih0aGlzLl93aWRnZXQubGVmdCwgdGhpcy5fd2lkZ2V0LnRvcCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiYmFpZHUgcmVjb21tZW5kIGJ1dHRvbiB3aWRnZXQgY29tcG9uZW50IGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSAmJiB1dGlscy5Ub29sX0JhaWR1ICYmIHV0aWxzLlRvb2xfQmFpZHUuY2FuU2hvd1JlY29tbWVuZEJ1dHRvbigpKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==