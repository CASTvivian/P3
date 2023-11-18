
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentHago.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '737dcSdaTZIJYemPKqAzajR', 'AdAgentHago');
// common-plugin/Scripts/AdAgentHago.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
// const i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgentHago = /** @class */ (function (_super) {
    __extends(AdAgentHago, _super);
    function AdAgentHago() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._isVideoShow = false;
        _this._isVideoLoaded = false;
        //@ts-ignore
        _this.hg = window.hg;
        _this.canShowVideo = false;
        return _this;
    }
    AdAgentHago.prototype.Init = function () {
        if (PlatUtils_1.default.IsHago) {
            this.initVideoAd();
            Utils_1.utils.showLog("hago 平台广告初始化成功！");
        }
    };
    AdAgentHago.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        Utils_1.utils.showLog("Hago平台没有banner广告！");
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentHago.prototype.showStatementAds = function () {
        var result = { "type": 0, "node": null };
        var node = null;
        var resType = 0;
        Utils_1.utils.showLog("结算广告 >> 显示插屏广告+6个互推");
        this.ShowInterstitial();
        node = Utils_1.utils.showCrossWidget6();
        resType = 1;
        result.type = resType;
        result.node = node;
        return result;
    };
    AdAgentHago.prototype.initVideoAd = function () {
        var _this = this;
        this._videoAd = this.hg.createRewardedVideoAd({
            adUnitId: parseInt(Utils_1.utils.config.hagoConfig.videoId) //测试使用9999，上线前必须申请独立的，否则无法分成!   注意：要下载最新的app测试版本9999才能生效。
        });
        this._videoAd.onClose = function (res) {
            if (res.isEnded) {
                _this._videoCallback(true);
                _this._videoCallback = null;
            }
            else {
                if (_this._videoCallback) {
                    _this._videoCallback(false, i18n.t('ad.video_not_played_complete'));
                    _this._videoCallback = null;
                }
            }
        };
        //中途关闭广告或者拉去广告失败。
        this._videoAd.onError = function () {
            if (_this._videoCallback) {
                _this._videoCallback(false, i18n.t('ad.video_load_fail'));
                _this._videoCallback = null;
            }
        };
    };
    AdAgentHago.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
    };
    AdAgentHago.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        console.warn("Hago没有插屏");
    };
    AdAgentHago.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsHago) {
            // 视频广告
            if (this._videoCallback) {
                return;
            }
            this._videoCallback = callback;
            if (!this._videoAd) {
                this.initVideoAd();
            }
            this._videoAd.show().then(function () {
                Utils_1.utils.showLog("video show success");
            });
        }
    };
    AdAgentHago = __decorate([
        ccclass
    ], AdAgentHago);
    return AdAgentHago;
}(AdAgent_1.default));
exports.default = AdAgentHago;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEhhZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUErQztBQUMvQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLHdDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTztJQUFoRDtRQUFBLHFFQWlHQztRQS9GRyxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxZQUFZO1FBQ1osUUFBRSxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDcEIsa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBdUZsQyxDQUFDO0lBdEZVLDBCQUFJLEdBQVg7UUFDSSxJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixhQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBR00sZ0NBQVUsR0FBakIsVUFBa0IsUUFBOEMsRUFBRSxJQUFnQjtRQUFoRSx5QkFBQSxFQUFBLFdBQTJCLDRCQUFjLENBQUMsSUFBSTtRQUFFLHFCQUFBLEVBQUEsV0FBZ0I7UUFDOUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7OztNQU9FO0lBQ0Ysc0NBQWdCLEdBQWhCO1FBQ0ksSUFBSSxNQUFNLEdBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBWSxJQUFJLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGFBQUssQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNaLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQUEsaUJBMkJDO1FBekJHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsUUFBUSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLHlEQUF5RDtTQUNoSCxDQUFDLENBQUM7UUFHSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFDLEdBQUc7WUFDeEIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNiLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNILElBQUksS0FBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7b0JBQ25FLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2lCQUM5QjthQUNKO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHO1lBQ3BCLElBQUksS0FBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQzlCO1FBQ0wsQ0FBQyxDQUFBO0lBRUwsQ0FBQztJQUVNLGdDQUFVLEdBQWpCLFVBQWtCLFFBQThDO1FBQTlDLHlCQUFBLEVBQUEsV0FBMkIsNEJBQWMsQ0FBQyxJQUFJO0lBRWhFLENBQUM7SUFFTSxzQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBOEM7UUFBOUMseUJBQUEsRUFBQSxXQUEyQiw0QkFBYyxDQUFDLElBQUk7UUFDbEUsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFBaUIsUUFBa0I7UUFDL0IsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPO1lBQ1AsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLGFBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQWhHZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWlHL0I7SUFBRCxrQkFBQztDQWpHRCxBQWlHQyxDQWpHd0MsaUJBQU8sR0FpRy9DO2tCQWpHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZEFnZW50IGZyb20gXCIuL0FkQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbi8vIGNvbnN0IGkxOG4gPSByZXF1aXJlKCdMYW5ndWFnZURhdGEnKTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50SGFnbyBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuICAgIF9zeXNEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgX2Jhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX2lzVmlkZW9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBoZzogYW55ID0gd2luZG93LmhnO1xyXG4gICAgY2FuU2hvd1ZpZGVvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSGFnbykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJoYWdvIOW5s+WPsOW5v+WRiuWIneWni+WMluaIkOWKn++8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiSGFnb+W5s+WPsOayoeaciWJhbm5lcuW5v+WRiu+8gVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5pi+56S657uT566X5bm/5ZGKXHJcbiAgICAqIEBwYXJhbSBkYXRhIOWPguaVsO+8miBjbG9zZUJ0bjpcclxuICAgICogc3RhdGVtZW50X3R5cGUgXHJcbiAgICAqIDE65Y+q5pi+56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKXHJcbiAgICAqIDI65Y+q5pi+56S6NuS4quS6kuaOqOW5v+WRilxyXG4gICAgKiAzOuaYvuekuuaPkuWxj+W5v+WRiis25Liq5LqS5o6oXHJcbiAgICAqL1xyXG4gICAgc2hvd1N0YXRlbWVudEFkcygpOiBhbnkge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHsgXCJ0eXBlXCI6IDAsIFwibm9kZVwiOiBudWxsIH07XHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXNUeXBlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuuaPkuWxj+W5v+WRiis25Liq5LqS5o6oXCIpO1xyXG4gICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIG5vZGUgPSB1dGlscy5zaG93Q3Jvc3NXaWRnZXQ2KCk7XHJcbiAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSByZXNUeXBlO1xyXG4gICAgICAgIHJlc3VsdC5ub2RlID0gbm9kZTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRWaWRlb0FkKCkge1xyXG5cclxuICAgICAgICB0aGlzLl92aWRlb0FkID0gdGhpcy5oZy5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICBhZFVuaXRJZDogcGFyc2VJbnQodXRpbHMuY29uZmlnLmhhZ29Db25maWcudmlkZW9JZCkgLy/mtYvor5Xkvb/nlKg5OTk577yM5LiK57q/5YmN5b+F6aG755Sz6K+354us56uL55qE77yM5ZCm5YiZ5peg5rOV5YiG5oiQISAgIOazqOaEj++8muimgeS4i+i9veacgOaWsOeahGFwcOa1i+ivleeJiOacrDk5OTnmiY3og73nlJ/mlYjjgIJcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZSA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIGkxOG4udCgnYWQudmlkZW9fbm90X3BsYXllZF9jb21wbGV0ZScpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuK3pgJTlhbPpl63lub/lkYrmiJbogIXmi4nljrvlub/lkYrlpLHotKXjgIJcclxuICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBpMThuLnQoJ2FkLnZpZGVvX2xvYWRfZmFpbCcpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJIYWdv5rKh5pyJ5o+S5bGPXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93VmlkZW8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgLy8g6KeG6aKR5bm/5ZGKXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ2aWRlbyBzaG93IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==