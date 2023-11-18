
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c007b2/0jZPJ7WzuygFZTgG', 'AdAgent');
// common-plugin/Scripts/AdAgent.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdAgent = /** @class */ (function () {
    function AdAgent() {
    }
    AdAgent.prototype.Init = function () { };
    AdAgent.prototype.ShowBanner = function (location, args) { };
    AdAgent.prototype.HideBanner = function (location) { };
    AdAgent.prototype.ShowInterstitial = function (location) { };
    AdAgent.prototype.ShowVideo = function (callback) { };
    AdAgent.prototype.showInteractiveAd = function () { };
    AdAgent.prototype.ShowAppBox = function (isMoreGame) { };
    AdAgent.prototype.HideAppBox = function () { };
    AdAgent.prototype.showRewardInsert = function () { };
    AdAgent.prototype.hideRewardInsert = function () { };
    AdAgent.prototype.ShowCloseBtnBanner = function (location, args) { };
    AdAgent.prototype.ShowStatementRecomment = function () { };
    AdAgent.prototype.getNativeAdData = function (args) { };
    AdAgent.prototype.showStatementAds = function (data) { };
    AdAgent.prototype.createNativeAd = function (params, yzItem) {
        if (params === void 0) { params = null; }
    };
    AdAgent.prototype.hideKyxBanner = function () { };
    AdAgent.prototype.showNativeTryGameWidget = function (params) {
        if (params === void 0) { params = null; }
    };
    AdAgent.prototype.hideNativeTryGameWidget = function () { };
    AdAgent.prototype.showBlockAd = function (parme) { };
    AdAgent.prototype.hideBlockAd = function () { };
    AdAgent.prototype.showFullScreenVideo = function (callback) { };
    AdAgent.prototype.showNativeSplashView = function (callBack) { };
    AdAgent.prototype.ShowSingleNativeAd = function (params) { };
    AdAgent.prototype.HideSingleNativeAd = function (params) { };
    AdAgent.prototype.showCustomAd = function (params) { };
    AdAgent.prototype.hideCustomAd = function (params) { };
    AdAgent.prototype.createCustomADBanner = function () { };
    AdAgent = __decorate([
        ccclass("AdAgent")
    ], AdAgent);
    return AdAgent;
}());
exports.default = AdAgent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7SUE2QkEsQ0FBQztJQTNCVSxzQkFBSSxHQUFYLGNBQWdCLENBQUM7SUFDViw0QkFBVSxHQUFqQixVQUFrQixRQUFhLEVBQUUsSUFBUyxJQUFJLENBQUM7SUFDeEMsNEJBQVUsR0FBakIsVUFBa0IsUUFBd0IsSUFBSSxDQUFDO0lBQ3hDLGtDQUFnQixHQUF2QixVQUF3QixRQUF3QixJQUFJLENBQUM7SUFDOUMsMkJBQVMsR0FBaEIsVUFBaUIsUUFBa0IsSUFBSSxDQUFDO0lBQ2pDLG1DQUFpQixHQUF4QixjQUFtQyxDQUFDO0lBQzdCLDRCQUFVLEdBQWpCLFVBQWtCLFVBQW9CLElBQVUsQ0FBQztJQUMxQyw0QkFBVSxHQUFqQixjQUE0QixDQUFDO0lBQ3RCLGtDQUFnQixHQUF2QixjQUFrQyxDQUFDO0lBQzVCLGtDQUFnQixHQUF2QixjQUFrQyxDQUFDO0lBQzVCLG9DQUFrQixHQUF6QixVQUEwQixRQUF3QixFQUFFLElBQVMsSUFBSSxDQUFDO0lBQzNELHdDQUFzQixHQUE3QixjQUF1QyxDQUFDO0lBQ2pDLGlDQUFlLEdBQXRCLFVBQXVCLElBQVUsSUFBUyxDQUFDO0lBQ3BDLGtDQUFnQixHQUF2QixVQUF3QixJQUFVLElBQVMsQ0FBQztJQUNyQyxnQ0FBYyxHQUFyQixVQUFzQixNQUFrQixFQUFFLE1BQXNCO1FBQTFDLHVCQUFBLEVBQUEsYUFBa0I7SUFBNEIsQ0FBQztJQUM5RCwrQkFBYSxHQUFwQixjQUF5QixDQUFDO0lBQ25CLHlDQUF1QixHQUE5QixVQUErQixNQUFrQjtRQUFsQix1QkFBQSxFQUFBLGFBQWtCO0lBQUksQ0FBQztJQUMvQyx5Q0FBdUIsR0FBOUIsY0FBbUMsQ0FBQztJQUM3Qiw2QkFBVyxHQUFsQixVQUFtQixLQUFXLElBQUksQ0FBQztJQUM1Qiw2QkFBVyxHQUFsQixjQUF1QixDQUFDO0lBQ2pCLHFDQUFtQixHQUExQixVQUEyQixRQUFtQixJQUFJLENBQUM7SUFDNUMsc0NBQW9CLEdBQTNCLFVBQTRCLFFBQW1CLElBQUksQ0FBQztJQUM3QyxvQ0FBa0IsR0FBekIsVUFBMEIsTUFBWSxJQUFJLENBQUM7SUFDcEMsb0NBQWtCLEdBQXpCLFVBQTBCLE1BQVksSUFBSSxDQUFDO0lBQ3BDLDhCQUFZLEdBQW5CLFVBQW9CLE1BQVksSUFBSSxDQUFDO0lBQzlCLDhCQUFZLEdBQW5CLFVBQW9CLE1BQVksSUFBSSxDQUFDO0lBQzlCLHNDQUFvQixHQUEzQixjQUFnQyxDQUFDO0lBNUJoQixPQUFPO1FBRDNCLE9BQU8sQ0FBQyxTQUFTLENBQUM7T0FDRSxPQUFPLENBNkIzQjtJQUFELGNBQUM7Q0E3QkQsQUE2QkMsSUFBQTtrQkE3Qm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiwgTGV2ZWxTdGF0dXMgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgWVpfTmF0aXZlSXRlbSBmcm9tIFwiLi9ZWl9OYXRpdmVJdGVtXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoXCJBZEFnZW50XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnQge1xyXG5cclxuICAgIHB1YmxpYyBJbml0KCkgeyB9XHJcbiAgICBwdWJsaWMgU2hvd0Jhbm5lcihsb2NhdGlvbjogYW55LCBhcmdzOiBhbnkpIHsgfVxyXG4gICAgcHVibGljIEhpZGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uKSB7IH1cclxuICAgIHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbikgeyB9XHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikgeyB9XHJcbiAgICBwdWJsaWMgc2hvd0ludGVyYWN0aXZlQWQoKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBTaG93QXBwQm94KGlzTW9yZUdhbWU/OiBib29sZWFuKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBIaWRlQXBwQm94KCk6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgc2hvd1Jld2FyZEluc2VydCgpOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIGhpZGVSZXdhcmRJbnNlcnQoKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBTaG93Q2xvc2VCdG5CYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBhcmdzOiBhbnkpIHsgfVxyXG4gICAgcHVibGljIFNob3dTdGF0ZW1lbnRSZWNvbW1lbnQoKTogYW55IHsgfVxyXG4gICAgcHVibGljIGdldE5hdGl2ZUFkRGF0YShhcmdzPzogYW55KTogYW55IHsgfVxyXG4gICAgcHVibGljIHNob3dTdGF0ZW1lbnRBZHMoZGF0YT86IGFueSk6IGFueSB7IH1cclxuICAgIHB1YmxpYyBjcmVhdGVOYXRpdmVBZChwYXJhbXM6IGFueSA9IG51bGwsIHl6SXRlbT86IFlaX05hdGl2ZUl0ZW0pIHsgfVxyXG4gICAgcHVibGljIGhpZGVLeXhCYW5uZXIoKSB7IH1cclxuICAgIHB1YmxpYyBzaG93TmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpIHsgfVxyXG4gICAgcHVibGljIGhpZGVOYXRpdmVUcnlHYW1lV2lkZ2V0KCkgeyB9XHJcbiAgICBwdWJsaWMgc2hvd0Jsb2NrQWQocGFybWU/OiBhbnkpIHsgfVxyXG4gICAgcHVibGljIGhpZGVCbG9ja0FkKCkgeyB9XHJcbiAgICBwdWJsaWMgc2hvd0Z1bGxTY3JlZW5WaWRlbyhjYWxsYmFjaz86IEZ1bmN0aW9uKSB7IH1cclxuICAgIHB1YmxpYyBzaG93TmF0aXZlU3BsYXNoVmlldyhjYWxsQmFjaz86IEZ1bmN0aW9uKSB7IH1cclxuICAgIHB1YmxpYyBTaG93U2luZ2xlTmF0aXZlQWQocGFyYW1zPzogYW55KSB7IH1cclxuICAgIHB1YmxpYyBIaWRlU2luZ2xlTmF0aXZlQWQocGFyYW1zPzogYW55KSB7IH1cclxuICAgIHB1YmxpYyBzaG93Q3VzdG9tQWQocGFyYW1zPzogYW55KSB7IH1cclxuICAgIHB1YmxpYyBoaWRlQ3VzdG9tQWQocGFyYW1zPzogYW55KSB7IH1cclxuICAgIHB1YmxpYyBjcmVhdGVDdXN0b21BREJhbm5lcigpIHsgfVxyXG59XHJcbiJdfQ==