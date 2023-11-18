"use strict";
cc._RF.push(module, '88f79Gj1WdPsIy+Pm6Ss9ar', 'YZ_NativeAdObject');
// common-plugin/Scripts/YZ_NativeAdObject.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_NativeAdObject = /** @class */ (function () {
    function YZ_NativeAdObject() {
        this._nativeObj = null;
        this._nativeAdData = null;
        this.is_reportClick = false;
        this.is_reportShow = false;
    }
    Object.defineProperty(YZ_NativeAdObject.prototype, "data", {
        get: function () {
            return this._nativeAdData;
        },
        set: function (_data) {
            this._nativeAdData = _data;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 上报原生广告展示
     */
    YZ_NativeAdObject.prototype.reportAdShow = function () {
        if (this._nativeAdData && !this.is_reportShow) {
            this.is_reportShow = true;
            Utils_1.utils.showLog("上报原生广告展示! adId:", this._nativeAdData.adId);
            if (this._nativeObj) {
                this._nativeObj.reportAdShow({
                    adId: this._nativeAdData.adId
                });
            }
        }
    };
    /**
     * 上报原生广告点击
     * @param type 1:banner,2:结算广告
     */
    YZ_NativeAdObject.prototype.reportAdClick = function (type) {
        if (type === void 0) { type = 2; }
        this.is_reportClick = true;
        if (this._nativeAdData) {
            Utils_1.utils.showLog("上报原生广告点击! adId:", this._nativeAdData.adId);
            if (this._nativeObj) {
                this._nativeObj.reportAdClick({
                    adId: this._nativeAdData.adId
                });
                if (type == 2) {
                    if (PlatUtils_1.default.IsOPPO) {
                        Utils_1.utils.oppoTool.countNativeInserClick();
                    }
                    else if (PlatUtils_1.default.IsVIVO) {
                        Utils_1.utils.Tool_Vivo.countNativeInserClick();
                    }
                }
            }
        }
    };
    YZ_NativeAdObject = __decorate([
        ccclass
    ], YZ_NativeAdObject);
    return YZ_NativeAdObject;
}());
exports.default = YZ_NativeAdObject;

cc._RF.pop();