"use strict";
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