"use strict";
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