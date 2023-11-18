
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentGoogleWeb.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEdvb2dsZVdlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFHaEM7SUFBOEMsb0NBQU87SUFBckQ7UUFBQSxxRUE2Q0M7UUEzQ0EsY0FBUSxHQUFRLElBQUksQ0FBQztRQXNCckIsa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBcUIvQixDQUFDO0lBekNPLCtCQUFJLEdBQVg7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsWUFBWTtRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtJQUNqQyxDQUFDO0lBRU0scUNBQVUsR0FBakIsVUFBa0IsUUFBK0I7UUFBL0IseUJBQUEsRUFBQSxlQUErQjtRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBQ00sMkNBQWdCLEdBQXZCO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFTSxxQ0FBVSxHQUFqQixVQUFrQixRQUErQjtRQUEvQix5QkFBQSxFQUFBLGVBQStCO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUdNLG9DQUFTLEdBQWhCLFVBQWlCLFFBQWtCO1FBQW5DLGlCQWtCQztRQWpCQSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUMvQyxPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixZQUFZO1FBQ1osSUFBSSxjQUFjLEdBQUc7WUFDcEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFDRCxZQUFZO1FBQ1osSUFBSSxXQUFXLEdBQUcsVUFBQyxHQUFHO1lBQ3JCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRix1QkFBQztBQUFELENBN0NBLEFBNkNDLENBN0M2QyxpQkFBTyxHQTZDcEQ7O0FBR0QsZ0NBQWdDO0FBQ2hDLGlDQUFpQztBQUNqQyxnREFBZ0Q7QUFDaEQsSUFBSTtBQUNKLHVDQUF1QztBQUN2QyxzREFBc0Q7QUFDdEQsSUFBSTtBQUNKLGlDQUFpQztBQUNqQyxnREFBZ0Q7QUFDaEQsSUFBSTtBQUNKLHFEQUFxRDtBQUNyRCwrQ0FBK0M7QUFDL0MsbUJBQW1CO0FBQ25CLElBQUk7QUFDSixnQ0FBZ0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRHb29nbGVXZWIgZXh0ZW5kcyBBZEFnZW50IHtcblxuXHRnb29nbGVBZDogYW55ID0gbnVsbDtcblxuXHRwdWJsaWMgSW5pdCgpOiB2b2lkIHtcblx0XHRjb25zb2xlLmxvZyhcIltpbml0IGdvb2dsZVdlYkFkXVwiKTtcblx0XHQvL0B0cy1pZ25vcmVcblx0XHR0aGlzLmdvb2dsZUFkID0gd2luZG93Lmdvb2dsZUFwaVxuXHR9XG5cblx0cHVibGljIFNob3dCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gbnVsbCkge1xuXHRcdGNvbnNvbGUubG9nKFwiW1lvdXpoaUFkIFNob3dCYW5uZXJdIDpcIiArIGxvY2F0aW9uKTtcblx0XHR0aGlzLmdvb2dsZUFkICYmIHRoaXMuZ29vZ2xlQWQuc2hvd0Jhbm5lcigpO1xuXHR9XG5cdHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiW1lvdXpoaUFkIFNob3dJbnRlcnN0aXRpYWxdXCIpO1xuXHRcdHRoaXMuZ29vZ2xlQWQgJiYgdGhpcy5nb29nbGVBZC5TaG93SW50ZXJzdGl0aWFsKCk7XG5cdH1cblxuXHRwdWJsaWMgSGlkZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBudWxsKSB7XG5cdFx0Y29uc29sZS5sb2coXCJbWW91emhpQWQgSGlkZUJhbm5lcl1cIik7XG5cdFx0dGhpcy5nb29nbGVBZCAmJiB0aGlzLmdvb2dsZUFkLmhpZGVCYW5uZXIoKTtcblx0fVxuXG5cdF92aWRlb0lzUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuXHRcdGNvbnNvbGUubG9nKFwiW1lvdXpoaUFkIFNob3dWaWRlb11cIik7XG5cdFx0aWYgKHRoaXMuX3ZpZGVvSXNQbGF5KSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJbWW91emhpQWQgVmlkZW8gQWQgaXMgTG9hZGluZ11cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX3ZpZGVvSXNQbGF5ID0gdHJ1ZTtcblx0XHQvL0B0cy1pZ25vcmVcblx0XHRsZXQgdmlkZW9BZFN1Y2Nlc3MgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLl92aWRlb0lzUGxheSA9IGZhbHNlO1xuXHRcdFx0Y2FsbGJhY2sodHJ1ZSwgXCLop4bpopHmkq3mlL7miJDlip8hXCIpO1xuXHRcdH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRsZXQgdmlkZW9BZEZhaWwgPSAobXNnKSA9PiB7XG5cdFx0XHR0aGlzLl92aWRlb0lzUGxheSA9IGZhbHNlO1xuXHRcdFx0Y2FsbGJhY2soZmFsc2UsIG1zZyA/IG1zZyA6IFwi6KeG6aKR5pKt5pS+5aSx6LSlIVwiKTtcblx0XHR9XG5cdFx0dGhpcy5nb29nbGVBZCAmJiB0aGlzLmdvb2dsZUFkLnNob3dWaWRlbyh2aWRlb0FkU3VjY2VzcywgdmlkZW9BZEZhaWwpO1xuXHR9XG5cbn1cblxuXG4vLyB2YXIgZ29vZ2xlQXBpID0gbmV3IE9iamVjdCgpO1xuLy8gZ29vZ2xlQXBpLnNob3dCYW5uZXIgPSAoKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKFwiPT09PT1nb29nbGUgc2hvd0Jhbm5lcj09PT09XCIpO1xuLy8gfVxuLy8gZ29vZ2xlQXBpLlNob3dJbnRlcnN0aXRpYWwgPSAoKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKFwiPT09PT1nb29nbGUgU2hvd0ludGVyc3RpdGlhbD09PT09XCIpO1xuLy8gfVxuLy8gZ29vZ2xlQXBpLmhpZGVCYW5uZXIgPSAoKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKFwiPT09PT1nb29nbGUgaGlkZUJhbm5lcj09PT09XCIpO1xuLy8gfVxuLy8gZ29vZ2xlQXBpLnNob3dWaWRlbyA9IChzdWNjZXNzRnVuYywgZmFpbEZ1bmMpID0+IHtcbi8vICAgY29uc29sZS5sb2coXCI9PT09PWdvb2dsZSBTaG93VmlkZW89PT09PVwiKTtcbi8vICAgc3VjY2Vzc0Z1bmMoKTtcbi8vIH1cbi8vIHdpbmRvdy5nb29nbGVBcGkgPSBnb29nbGVBcGk7Il19