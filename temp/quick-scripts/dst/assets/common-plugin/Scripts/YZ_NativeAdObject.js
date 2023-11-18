
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_NativeAdObject.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTmF0aXZlQWRPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7UUFFSSxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBRXZCLGtCQUFhLEdBQVEsSUFBSSxDQUFDO1FBRTFCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBa0RuQyxDQUFDO0lBaERHLHNCQUFJLG1DQUFJO2FBQVI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDN0IsQ0FBQzthQUVELFVBQVMsS0FBVTtZQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7OztPQUpBO0lBUUQ7O09BRUc7SUFDSCx3Q0FBWSxHQUFaO1FBRUksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixhQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztvQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSTtpQkFDaEMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBYSxHQUFiLFVBQWMsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxRQUFnQjtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsYUFBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7b0JBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7aUJBQ2hDLENBQUMsQ0FBQztnQkFDSCxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7b0JBQ1gsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTt3QkFDbEIsYUFBSyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO3FCQUMxQzt5QkFBTSxJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO3dCQUN6QixhQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7cUJBQzNDO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUF6RGdCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBMERyQztJQUFELHdCQUFDO0NBMURELEFBMERDLElBQUE7a0JBMURvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfTmF0aXZlQWRPYmplY3Qge1xyXG5cclxuICAgIF9uYXRpdmVPYmo6IGFueSA9IG51bGw7XHJcblxyXG4gICAgX25hdGl2ZUFkRGF0YTogYW55ID0gbnVsbDtcclxuXHJcbiAgICBpc19yZXBvcnRDbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGlzX3JlcG9ydFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBnZXQgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQWREYXRhXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGEoX2RhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUFkRGF0YSA9IF9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXljp/nlJ/lub/lkYrlsZXnpLpcclxuICAgICAqL1xyXG4gICAgcmVwb3J0QWRTaG93KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlQWREYXRhICYmICF0aGlzLmlzX3JlcG9ydFNob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19yZXBvcnRTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeWOn+eUn+W5v+WRiuWxleekuiEgYWRJZDpcIiwgdGhpcy5fbmF0aXZlQWREYXRhLmFkSWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVPYmoucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgICAgICAgICBhZElkOiB0aGlzLl9uYXRpdmVBZERhdGEuYWRJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXljp/nlJ/lub/lkYrngrnlh7sgXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAxOmJhbm5lciwyOue7k+eul+W5v+WRilxyXG4gICAgICovXHJcbiAgICByZXBvcnRBZENsaWNrKHR5cGU6IG51bWJlciA9IDIpIHtcclxuICAgICAgICB0aGlzLmlzX3JlcG9ydENsaWNrID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlQWREYXRhKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXljp/nlJ/lub/lkYrngrnlh7shIGFkSWQ6XCIsIHRoaXMuX25hdGl2ZUFkRGF0YS5hZElkKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlT2JqLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkSWQ6IHRoaXMuX25hdGl2ZUFkRGF0YS5hZElkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbC5jb3VudE5hdGl2ZUluc2VyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9WaXZvLmNvdW50TmF0aXZlSW5zZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=