
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgent4399.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50d79CJWalF0YaAKvtP+yLq', 'AdAgent4399');
// common-plugin/Scripts/AdAgent4399.ts

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
var AdAgent_1 = require("./AdAgent");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * uc广告组件
 */
var AdAgent4399 = /** @class */ (function (_super) {
    __extends(AdAgent4399, _super);
    function AdAgent4399() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        //@ts-ignore
        _this._4399 = window.h5api;
        _this._canPlayAd = true;
        _this._remain = 0;
        return _this;
    }
    AdAgent4399.prototype.Init = function () {
        this.checkPlayAd();
    };
    /**
     * 获得是否可以播放广告及剩余次数
     */
    AdAgent4399.prototype.checkPlayAd = function () {
        this._canPlayAd = true;
        return;
        // this._4399.canPlayAd((data: any) => {
        // 	if (data.canPlayAd) {
        // 		this._canPlayAd = data.canPlayAd;
        // 	} else {
        // 		this._canPlayAd = false;
        // 	}
        // 	if (data.remain) {
        // 		this._remain = data.remain;
        // 	}
        // 	utils.showLog("是否可播放广告", data.canPlayAd, "剩余次数", data.remain)
        // })
    };
    AdAgent4399.prototype.ShowBanner = function () {
        Utils_1.utils.showLog("4399平台暂无banner广告");
    };
    AdAgent4399.prototype.ShowInterstitial = function () {
        Utils_1.utils.showLog("4399平台暂时无插屏广告");
    };
    /**
    * 播放全屏广告
    * @param callback   播放广告时的广告状态回调函数
    */
    AdAgent4399.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.Is4399) {
            this._videoCallback = callback;
            if (this._canPlayAd) {
                this._4399.playAd(function (obj) {
                    Utils_1.utils.showLog('代码:' + obj.code + ',消息:' + obj.message);
                    if (obj.code === 10000) {
                        Utils_1.utils.showLog('视频开始播放');
                    }
                    else if (obj.code === 10001) {
                        Utils_1.utils.showLog('视频播放结束');
                        if (_this._videoCallback) {
                            _this._videoCallback(true, "");
                            _this._videoCallback = null;
                        }
                        _this.checkPlayAd();
                    }
                    else {
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "激励视频异常!");
                            _this._videoCallback = null;
                        }
                        _this.checkPlayAd();
                        Utils_1.utils.showLog('视频广告异常');
                    }
                });
            }
            else {
                Utils_1.utils.showLog('4399获取到不能播放广告! #this._canPlayAd=', this._canPlayAd, "剩余次数", this._remain);
                if (this._videoCallback) {
                    this._videoCallback(false, "今日次数用完，明天再来!");
                    this._videoCallback = null;
                }
                this.checkPlayAd();
            }
        }
    };
    AdAgent4399 = __decorate([
        ccclass
    ], AdAgent4399);
    return AdAgent4399;
}(AdAgent_1.default));
exports.default = AdAgent4399;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudDQzOTkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBRWhDLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUF5QywrQkFBTztJQUFoRDtRQUFBLHFFQTBGQztRQXZGQSxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUVoQyxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBRXJCLFlBQVk7UUFDWixXQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixhQUFPLEdBQVcsQ0FBQyxDQUFDOztJQStFckIsQ0FBQztJQTdFTywwQkFBSSxHQUFYO1FBQ0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFXLEdBQWxCO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBTztRQUNQLHdDQUF3QztRQUN4Qyx5QkFBeUI7UUFDekIsc0NBQXNDO1FBQ3RDLFlBQVk7UUFDWiw2QkFBNkI7UUFDN0IsS0FBSztRQUNMLHNCQUFzQjtRQUN0QixnQ0FBZ0M7UUFDaEMsS0FBSztRQUNMLGlFQUFpRTtRQUNqRSxLQUFLO0lBQ04sQ0FBQztJQUlNLGdDQUFVLEdBQWpCO1FBQ0MsYUFBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFJTSxzQ0FBZ0IsR0FBdkI7UUFDQyxhQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7O01BR0U7SUFDSywrQkFBUyxHQUFoQixVQUFpQixRQUFrQjtRQUFuQyxpQkFtQ0M7UUFsQ0EsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUMvQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBUTtvQkFDMUIsYUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUN0RCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO3dCQUN2QixhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO3FCQUN2Qjt5QkFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO3dCQUM5QixhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO3dCQUN2QixJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUU7NEJBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUM5QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt5QkFDM0I7d0JBQ0QsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUNuQjt5QkFBTTt3QkFDTixJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUU7NEJBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUN0QyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt5QkFDM0I7d0JBQ0QsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNuQixhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO3FCQUN2QjtnQkFFRixDQUFDLENBQUMsQ0FBQTthQUNGO2lCQUFNO2dCQUNOLGFBQUssQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6RixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDM0I7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ25CO1NBRUQ7SUFDRixDQUFDO0lBdkZtQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBMEYvQjtJQUFELGtCQUFDO0NBMUZELEFBMEZDLENBMUZ3QyxpQkFBTyxHQTBGL0M7a0JBMUZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogdWPlub/lkYrnu4Tku7ZcclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnQ0Mzk5IGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG5cclxuXHRfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG5cdF9pc1ZpZGVvTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdF92aWRlb0FkOiBhbnkgPSBudWxsO1xyXG5cclxuXHQvL0B0cy1pZ25vcmVcclxuXHRfNDM5OSA9IHdpbmRvdy5oNWFwaTtcclxuXHRfY2FuUGxheUFkOiBib29sZWFuID0gdHJ1ZTtcclxuXHRfcmVtYWluOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwdWJsaWMgSW5pdCgpIHtcclxuXHRcdHRoaXMuY2hlY2tQbGF5QWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOiOt+W+l+aYr+WQpuWPr+S7peaSreaUvuW5v+WRiuWPiuWJqeS9measoeaVsFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjaGVja1BsYXlBZCgpIHtcclxuXHRcdHRoaXMuX2NhblBsYXlBZCA9IHRydWU7XHJcblx0XHRyZXR1cm47XHJcblx0XHQvLyB0aGlzLl80Mzk5LmNhblBsYXlBZCgoZGF0YTogYW55KSA9PiB7XHJcblx0XHQvLyBcdGlmIChkYXRhLmNhblBsYXlBZCkge1xyXG5cdFx0Ly8gXHRcdHRoaXMuX2NhblBsYXlBZCA9IGRhdGEuY2FuUGxheUFkO1xyXG5cdFx0Ly8gXHR9IGVsc2Uge1xyXG5cdFx0Ly8gXHRcdHRoaXMuX2NhblBsYXlBZCA9IGZhbHNlO1xyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyBcdGlmIChkYXRhLnJlbWFpbikge1xyXG5cdFx0Ly8gXHRcdHRoaXMuX3JlbWFpbiA9IGRhdGEucmVtYWluO1xyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyBcdHV0aWxzLnNob3dMb2coXCLmmK/lkKblj6/mkq3mlL7lub/lkYpcIiwgZGF0YS5jYW5QbGF5QWQsIFwi5Ymp5L2Z5qyh5pWwXCIsIGRhdGEucmVtYWluKVxyXG5cdFx0Ly8gfSlcclxuXHR9XHJcblxyXG5cclxuXHJcblx0cHVibGljIFNob3dCYW5uZXIoKSB7XHJcblx0XHR1dGlscy5zaG93TG9nKFwiNDM5OeW5s+WPsOaaguaXoGJhbm5lcuW5v+WRilwiKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0cHVibGljIFNob3dJbnRlcnN0aXRpYWwoKSB7XHJcblx0XHR1dGlscy5zaG93TG9nKFwiNDM5OeW5s+WPsOaaguaXtuaXoOaPkuWxj+W5v+WRilwiKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCog5pKt5pS+5YWo5bGP5bm/5ZGKXHJcblx0KiBAcGFyYW0gY2FsbGJhY2sgICDmkq3mlL7lub/lkYrml7bnmoTlub/lkYrnirbmgIHlm57osIPlh73mlbBcclxuXHQqL1xyXG5cdHB1YmxpYyBTaG93VmlkZW8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklzNDM5OSkge1xyXG5cdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRcdGlmICh0aGlzLl9jYW5QbGF5QWQpIHtcclxuXHRcdFx0XHR0aGlzLl80Mzk5LnBsYXlBZCgob2JqOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHV0aWxzLnNob3dMb2coJ+S7o+eggTonICsgb2JqLmNvZGUgKyAnLOa2iOaBrzonICsgb2JqLm1lc3NhZ2UpXHJcblx0XHRcdFx0XHRpZiAob2JqLmNvZGUgPT09IDEwMDAwKSB7XHJcblx0XHRcdFx0XHRcdHV0aWxzLnNob3dMb2coJ+inhumikeW8gOWni+aSreaUvicpXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9iai5jb2RlID09PSAxMDAwMSkge1xyXG5cdFx0XHRcdFx0XHR1dGlscy5zaG93TG9nKCfop4bpopHmkq3mlL7nu5PmnZ8nKVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5jaGVja1BsYXlBZCgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIua/gOWKseinhumikeW8guW4uCFcIik7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5jaGVja1BsYXlBZCgpO1xyXG5cdFx0XHRcdFx0XHR1dGlscy5zaG93TG9nKCfop4bpopHlub/lkYrlvILluLgnKVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coJzQzOTnojrflj5bliLDkuI3og73mkq3mlL7lub/lkYohICN0aGlzLl9jYW5QbGF5QWQ9JywgdGhpcy5fY2FuUGxheUFkLCBcIuWJqeS9measoeaVsFwiLCB0aGlzLl9yZW1haW4pO1xyXG5cdFx0XHRcdGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuS7iuaXpeasoeaVsOeUqOWujO+8jOaYjuWkqeWGjeadpSFcIik7XHJcblx0XHRcdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5jaGVja1BsYXlBZCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG59XHJcbiJdfQ==