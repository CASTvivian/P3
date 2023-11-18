
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentUC.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '55980AsZiBGCooaYvCVOMVB', 'AdAgentUC');
// common-plugin/Scripts/AdAgentUC.ts

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
var AdAgentUC = /** @class */ (function (_super) {
    __extends(AdAgentUC, _super);
    function AdAgentUC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        _this._bannerAd = null;
        //@ts-ignore
        _this.uc = window.uc;
        _this._sysInfo = {};
        return _this;
    }
    AdAgentUC.prototype.Init = function () {
        Utils_1.utils.showLog("UC 广告初始化");
        this.initVideo();
        if (!this._sysInfo) {
            this._sysInfo = this.uc.getSystemInfoSync();
            if (typeof this._sysInfo === 'string') {
                try {
                    this._sysInfo = JSON.parse(this._sysInfo);
                }
                catch (e) { }
            }
        }
    };
    AdAgentUC.prototype.ShowBanner = function () {
        if (this._bannerAd) {
            this._bannerAd.destroy();
            this._bannerAd = null;
        }
        // 0:左上 1：顶部居中 2：右上
        // 3：左边垂直居中 4：居中 5：右边垂直居中
        // 6：左下 7：底部居中 8：右下 （默认为0）
        Utils_1.utils.showLog("uc banner width>>", this._sysInfo.screenWidth, " #height>>", this._sysInfo.screenWidth * 194 / 345);
        this._bannerAd = this.uc.createBannerAd({
            style: {
                gravity: 7,
                bottom: 0,
                width: cc.winSize.height < cc.winSize.width ? 250 : this._sysInfo.screenWidth,
                height: this._sysInfo.screenWidth / 4,
            }
        });
        if (this._bannerAd) {
            this._bannerAd.show();
            this._bannerAd.onError(function (err) {
                Utils_1.utils.showLog("UC平台banner出错" + err);
            });
        }
    };
    AdAgentUC.prototype.ShowInterstitial = function () {
        // if(this.)
        Utils_1.utils.showLog("展示插屏广告");
        var interstitialAd = this.uc.createInterstitialAd();
        interstitialAd.load()
            .then()
            .catch(function (err) { return Utils_1.utils.showLog("\u63D2\u5C4F\u52A0\u8F7D\u5F02\u5E38\uFF1A" + err); });
        interstitialAd.onLoad(function () {
            interstitialAd.offLoad(); // 取消 load 事件的监听，不传 callback 的话会取消所有的监听
            interstitialAd
                .show()
                .then()
                .catch(function (err) { return Utils_1.utils.showLog("\u63D2\u5C4F\u5C55\u793A\u5F02\u5E38\uFF1A" + err); });
            Utils_1.utils.showLog('UC插屏广告加载成功');
        });
        interstitialAd.onError(function (err) {
            Utils_1.utils.showLog(err);
        });
    };
    AdAgentUC.prototype.initVideo = function () {
        var _this = this;
        this._videoAd = this.uc.createRewardVideoAd();
        this._videoAd.onLoad(function () {
            Utils_1.utils.showLog('激励视频 广告加载成功');
        });
        this._videoAd.onError(function (err) {
            Utils_1.utils.showLog("出错了：" + err);
            if (_this._videoCallback) {
                _this._videoCallback(false, "暂无视频广告");
                _this._videoCallback = null;
            }
        });
        this._videoAd.onClose(function (res) {
            Utils_1.utils.showLog("用户关闭视频" + res);
            if (res && res.isEnded) {
                if (_this._videoCallback) {
                    _this._videoCallback(true, "");
                    _this._videoCallback = null;
                }
            }
            else {
                if (_this._videoCallback) {
                    _this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                    _this._videoCallback = null;
                }
            }
        });
    };
    AdAgentUC.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.ISUC) {
            this._videoCallback = callback;
            if (!this._videoAd) {
                this.initVideo();
            }
            else {
                this._videoAd.show();
            }
        }
    };
    AdAgentUC = __decorate([
        ccclass
    ], AdAgentUC);
    return AdAgentUC;
}(AdAgent_1.default));
exports.default = AdAgentUC;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFVDLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUVoQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBRUg7SUFBdUMsNkJBQU87SUFBOUM7UUFBQSxxRUFvSEM7UUFqSEEsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFFaEMsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQVk7UUFDWixRQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQWdCZixjQUFRLEdBQVEsRUFBRSxDQUFDOztJQTJGcEIsQ0FBQztJQXpHTyx3QkFBSSxHQUFYO1FBQ0MsYUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUE7WUFDM0MsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUN0QyxJQUFJO29CQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7YUFDZjtTQUNEO0lBQ0YsQ0FBQztJQUtNLDhCQUFVLEdBQWpCO1FBRUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElB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SUFBSSxDQUFDO2FBQzNCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDeEIsYUFBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFFdkIsSUFBSSxLQUFJLENBQUMsY0FBYyxFQUFFO29CQUN4QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7aUJBQzNCO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxLQUFJLENBQUMsY0FBYyxFQUFFO29CQUN4QixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDM0I7YUFDRDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNNLDZCQUFTLEdBQWhCLFVBQWlCLFFBQWtCO1FBQ2xDLElBQUksbUJBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3JCO1NBRUQ7SUFDRixDQUFDO0lBbkhtQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBb0g3QjtJQUFELGdCQUFDO0NBcEhELEFBb0hDLENBcEhzQyxpQkFBTyxHQW9IN0M7a0JBcEhvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogdWPlub/lkYrnu4Tku7ZcclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRVQyBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuXHJcblx0X3ZpZGVvQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHRfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRfdmlkZW9BZDogYW55ID0gbnVsbDtcclxuXHRfYmFubmVyQWQ6IGFueSA9IG51bGw7XHJcblx0Ly9AdHMtaWdub3JlXHJcblx0dWMgPSB3aW5kb3cudWM7XHJcblxyXG5cdHB1YmxpYyBJbml0KCkge1xyXG5cdFx0dXRpbHMuc2hvd0xvZyhcIlVDIOW5v+WRiuWIneWni+WMllwiKTtcclxuXHRcdHRoaXMuaW5pdFZpZGVvKCk7XHJcblx0XHRpZiAoIXRoaXMuX3N5c0luZm8pIHtcclxuXHRcdFx0dGhpcy5fc3lzSW5mbyA9IHRoaXMudWMuZ2V0U3lzdGVtSW5mb1N5bmMoKVxyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMuX3N5c0luZm8gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHRoaXMuX3N5c0luZm8gPSBKU09OLnBhcnNlKHRoaXMuX3N5c0luZm8pO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgfVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0X3N5c0luZm86IGFueSA9IHt9O1xyXG5cclxuXHRwdWJsaWMgU2hvd0Jhbm5lcigpIHtcclxuXHJcblx0XHRpZiAodGhpcy5fYmFubmVyQWQpIHtcclxuXHRcdFx0dGhpcy5fYmFubmVyQWQuZGVzdHJveSgpO1xyXG5cdFx0XHR0aGlzLl9iYW5uZXJBZCA9IG51bGw7XHJcblx0XHR9XHJcblx0XHQvLyAwOuW3puS4iiAx77ya6aG26YOo5bGF5LitIDLvvJrlj7PkuIpcclxuXHRcdC8vIDPvvJrlt6bovrnlnoLnm7TlsYXkuK0gNO+8muWxheS4rSA177ya5Y+z6L655Z6C55u05bGF5LitXHJcblx0XHQvLyA277ya5bem5LiLIDfvvJrlupXpg6jlsYXkuK0gOO+8muWPs+S4iyDvvIjpu5jorqTkuLow77yJXHJcblx0XHR1dGlscy5zaG93TG9nKFwidWMgYmFubmVyIHdpZHRoPj5cIiwgdGhpcy5fc3lzSW5mby5zY3JlZW5XaWR0aCwgXCIgI2hlaWdodD4+XCIsIHRoaXMuX3N5c0luZm8uc2NyZWVuV2lkdGggKiAxOTQgLyAzNDUpXHJcblx0XHR0aGlzLl9iYW5uZXJBZCA9IHRoaXMudWMuY3JlYXRlQmFubmVyQWQoe1xyXG5cdFx0XHRzdHlsZToge1xyXG5cdFx0XHRcdGdyYXZpdHk6IDcsXHJcblx0XHRcdFx0Ym90dG9tOiAwLCBcdFx0Ly8g5bqV6YOoIG1hcmdpblxyXG5cdFx0XHRcdHdpZHRoOiBjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGggPyAyNTAgOiB0aGlzLl9zeXNJbmZvLnNjcmVlbldpZHRoLCAvLyDlu7rorq7mnIDlsI/lrr3luqYgMjUwZHDvvIzmnIDlpKflrr3luqbkuLrlsY/luZXlsLrlr7hcclxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMuX3N5c0luZm8uc2NyZWVuV2lkdGggLyA0LFxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0aWYgKHRoaXMuX2Jhbm5lckFkKSB7XHJcblx0XHRcdHRoaXMuX2Jhbm5lckFkLnNob3coKVxyXG5cdFx0XHR0aGlzLl9iYW5uZXJBZC5vbkVycm9yKGVyciA9PiB7XHJcblx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcIlVD5bmz5Y+wYmFubmVy5Ye66ZSZXCIgKyBlcnIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKCkge1xyXG5cclxuXHRcdC8vIGlmKHRoaXMuKVxyXG5cdFx0dXRpbHMuc2hvd0xvZyhcIuWxleekuuaPkuWxj+W5v+WRilwiKTtcclxuXHRcdGNvbnN0IGludGVyc3RpdGlhbEFkID0gdGhpcy51Yy5jcmVhdGVJbnRlcnN0aXRpYWxBZCgpO1xyXG5cdFx0aW50ZXJzdGl0aWFsQWQubG9hZCgpXHJcblx0XHRcdC50aGVuKClcclxuXHRcdFx0LmNhdGNoKGVyciA9PiB1dGlscy5zaG93TG9nKGDmj5LlsY/liqDovb3lvILluLjvvJoke2Vycn1gKSk7XHJcblx0XHRpbnRlcnN0aXRpYWxBZC5vbkxvYWQoKCkgPT4ge1xyXG5cdFx0XHRpbnRlcnN0aXRpYWxBZC5vZmZMb2FkKCk7IC8vIOWPlua2iCBsb2FkIOS6i+S7tueahOebkeWQrO+8jOS4jeS8oCBjYWxsYmFjayDnmoTor53kvJrlj5bmtojmiYDmnInnmoTnm5HlkKxcclxuXHRcdFx0aW50ZXJzdGl0aWFsQWRcclxuXHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0LnRoZW4oKVxyXG5cdFx0XHRcdC5jYXRjaChlcnIgPT4gdXRpbHMuc2hvd0xvZyhg5o+S5bGP5bGV56S65byC5bi477yaJHtlcnJ9YCkpO1xyXG5cdFx0XHR1dGlscy5zaG93TG9nKCdVQ+aPkuWxj+W5v+WRiuWKoOi9veaIkOWKnycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aW50ZXJzdGl0aWFsQWQub25FcnJvcihlcnIgPT4ge1xyXG5cdFx0XHR1dGlscy5zaG93TG9nKGVycilcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aW5pdFZpZGVvKCkge1xyXG5cdFx0dGhpcy5fdmlkZW9BZCA9IHRoaXMudWMuY3JlYXRlUmV3YXJkVmlkZW9BZCgpO1xyXG5cdFx0dGhpcy5fdmlkZW9BZC5vbkxvYWQoKCkgPT4ge1xyXG5cdFx0XHR1dGlscy5zaG93TG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295oiQ5YqfJyk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuX3ZpZGVvQWQub25FcnJvcihlcnIgPT4ge1xyXG5cdFx0XHR1dGlscy5zaG93TG9nKFwi5Ye66ZSZ5LqG77yaXCIgKyBlcnIpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuXHRcdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRilwiKTtcclxuXHRcdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5fdmlkZW9BZC5vbkNsb3NlKHJlcyA9PiB7XHJcblx0XHRcdHV0aWxzLnNob3dMb2coXCLnlKjmiLflhbPpl63op4bpopFcIiArIHJlcyk7XHJcblx0XHRcdGlmIChyZXMgJiYgcmVzLmlzRW5kZWQpIHtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcblx0XHRcdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeG6aKR5pKt5pS+5a6M5q+V5omN6IO95aSf6I635Y+W5aWW5YqxIVwiKTtcclxuXHRcdFx0XHRcdHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHB1YmxpYyBTaG93VmlkZW8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklTVUMpIHtcclxuXHRcdFx0dGhpcy5fdmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0XHRpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuXHRcdFx0XHR0aGlzLmluaXRWaWRlbygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3ZpZGVvQWQuc2hvdygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=