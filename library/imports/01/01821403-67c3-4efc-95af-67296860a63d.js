"use strict";
cc._RF.push(module, '01821QDZ8NO/JWvZyloYKY9', 'AdAgentGoogleWeb');
// common-plugin/Scripts/AdAgentGoogleWeb.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var AdAgent_1 = require("./AdAgent");
var AdAgentGoogleWeb = /** @class */ (function (_super) {
    __extends(AdAgentGoogleWeb, _super);
    function AdAgentGoogleWeb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.googleAd = null;
        _this._videoIsPlay = false;
        return _this;
    }
    AdAgentGoogleWeb.prototype.Init = function () {
        console.log("[init googleWebAd]");
        //@ts-ignore
        this.googleAd = window.googleApi;
    };
    AdAgentGoogleWeb.prototype.ShowBanner = function (location) {
        if (location === void 0) { location = null; }
        console.log("[YouzhiAd ShowBanner] :" + location);
        this.googleAd && this.googleAd.showBanner();
    };
    AdAgentGoogleWeb.prototype.ShowInterstitial = function () {
        console.log("[YouzhiAd ShowInterstitial]");
        this.googleAd && this.googleAd.ShowInterstitial();
    };
    AdAgentGoogleWeb.prototype.HideBanner = function (location) {
        if (location === void 0) { location = null; }
        console.log("[YouzhiAd HideBanner]");
        this.googleAd && this.googleAd.hideBanner();
    };
    AdAgentGoogleWeb.prototype.ShowVideo = function (callback) {
        var _this = this;
        console.log("[YouzhiAd ShowVideo]");
        if (this._videoIsPlay) {
            console.warn("[YouzhiAd Video Ad is Loading]");
            return;
        }
        this._videoIsPlay = true;
        //@ts-ignore
        var videoAdSuccess = function () {
            _this._videoIsPlay = false;
            callback(true, "视频播放成功!");
        };
        //@ts-ignore
        var videoAdFail = function (msg) {
            _this._videoIsPlay = false;
            callback(false, msg ? msg : "视频播放失败!");
        };
        this.googleAd && this.googleAd.showVideo(videoAdSuccess, videoAdFail);
    };
    return AdAgentGoogleWeb;
}(AdAgent_1.default));
exports.default = AdAgentGoogleWeb;
// var googleApi = new Object();
// googleApi.showBanner = () => {
//   console.log("=====google showBanner=====");
// }
// googleApi.ShowInterstitial = () => {
//   console.log("=====google ShowInterstitial=====");
// }
// googleApi.hideBanner = () => {
//   console.log("=====google hideBanner=====");
// }
// googleApi.showVideo = (successFunc, failFunc) => {
//   console.log("=====google ShowVideo=====");
//   successFunc();
// }
// window.googleApi = googleApi;

cc._RF.pop();