
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentCocosplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d81d8tTk9JCplPi0EAy2/+', 'AdAgentCocosplay');
// common-plugin/Scripts/AdAgentCocosplay.ts

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
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * uc广告组件
 */
var AdAgentCocosplay = /** @class */ (function (_super) {
    __extends(AdAgentCocosplay, _super);
    function AdAgentCocosplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.banner = null;
        _this.interstitialAd = {};
        _this.videoAd = {};
        _this.bannerLoaded = false;
        _this.interstitialAdLoaded = false;
        _this.videoAdLoaded = false;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        _this._bannerAd = null;
        //@ts-ignore
        _this.uc = window.uc;
        //插屏显示次数
        _this._insertShowCount = 0;
        _this._insertLastShowTime = 0;
        return _this;
    }
    AdAgentCocosplay.prototype.Init = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this.initBanner();
            _this.createInsertAd();
            _this.createVideoAd();
        }, this);
    };
    AdAgentCocosplay.prototype.initBanner = function () {
        var self = this;
        self.bannerLoaded = false;
        //@ts-ignore
        self.banner = AdSDK.createBannerAd("1", Utils_1.utils.config.cocosConfig.bannerId, 2);
        //注册onLoad函数,游戏调用创建banner时，AdSDK通知平台创建广告，当创建成功，会执行该回调函数通知游戏
        self.banner.onLoad(function () {
            self.bannerLoaded = true;
            console.log("banner 创建banner成功，可以调用展示");
        });
        //注册onError函数,游戏调用创建banner时，AdSDK通知平台创建广告，当创建失败，会执行该回调函数通知游戏
        self.banner.onError(function (param) {
            self.destroyBannerAd();
            console.log("banner 创建banner失败，错误码 = ", param.errorCode);
        });
        console.log('banner 游戏创建banner广告');
    };
    AdAgentCocosplay.prototype.ShowBanner = function () {
        var self = this;
        // self.createBannerAd()
        // self.bannerLoaded = false;
        if (self.bannerLoaded) { //Object.keys(banner).length &&
            self.banner.show().then(function () {
                console.log('banner 广告显示成功');
            }, function (err) {
                console.log('banner 广告显示失败');
            });
            console.log('banner 展示banner广告');
        }
        else {
            console.log('banner 未加载成功');
        }
    };
    AdAgentCocosplay.prototype.HideBanner = function () {
        this.banner.hide();
        console.log('banner 隐藏banner广告');
    };
    AdAgentCocosplay.prototype.destroyBannerAd = function () {
        this.bannerLoaded = false;
        this.banner.destroy();
        this.banner = null;
        console.log('banner 销毁banner广告');
    };
    Object.defineProperty(AdAgentCocosplay.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils._tool_Cocosplay.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 验证插屏是否能展示
     * 1、次数限制 默认每日8次
     * 2、时间限制 默认60秒
     */
    AdAgentCocosplay.prototype.checkInsertAdShow = function () {
        var maxShowCount = this.ServerConfig.intersititial_max_show_count;
        maxShowCount = 0;
        var intervalTime = this.ServerConfig.intersititial_interval_time;
        var curTime = new Date().getTime();
        var interval = (curTime - this._insertLastShowTime) / 1000;
        Utils_1.utils.showLog("cocos服务器插屏最大显示次数为：" + maxShowCount + ",间隔显示时间为：" + intervalTime + "秒！");
        Utils_1.utils.showLog("cocos插屏当前广告显示次数：" + this._insertShowCount + "次，间隔时间：" + interval + "秒！");
        if (maxShowCount > 0 && this._insertShowCount >= maxShowCount) {
            Utils_1.utils.showLog("cocos插屏广告显示的次数达到" + maxShowCount + "次。插屏不显示");
            return false;
        }
        if (intervalTime > 0 && interval < intervalTime) {
            Utils_1.utils.showLog("cocos插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }
        return true;
    };
    // 创建插屏广告 展示一次调用一次创建
    // 参数
    //   adId: string 广告序号ID 游戏自定义
    //   interstitialAdId: string 插屏广告ID 需后台申请
    //   style: int 广告类型 1 全屏 2 半屏
    AdAgentCocosplay.prototype.ShowInterstitial = function () {
        var self = this;
        if (!self.checkInsertAdShow())
            return;
        if (self.interstitialAdLoaded) {
            self.interstitialAd.show().then(function () {
                self._insertLastShowTime = new Date().getTime();
                self.destroyInterstitialAd();
                self.createInsertAd();
            }, function (err) {
                console.log("interstitialAd 广告显示失败");
            });
            console.log("interstitialAd 游戏展示插屏广告");
        }
    };
    AdAgentCocosplay.prototype.createInsertAd = function () {
        var self = this;
        Utils_1.utils.showLog("插屏id为：" + Utils_1.utils.config.cocosConfig.insertId);
        //@ts-ignore
        this.interstitialAd = AdSDK.createInterstitialAd("1", Utils_1.utils.config.cocosConfig.insertId, 2);
        this.interstitialAd.onLoad(function () {
            self.interstitialAdLoaded = true;
            console.log("interstitialAd 创建插屏成功，可以调用展示");
        });
        self.interstitialAd.onError(function (param) {
            console.log("interstitialAd 创建插屏失败，错误码 = ", param.errorCode);
            self.destroyInterstitialAd();
        });
    };
    AdAgentCocosplay.prototype.hideInterstitialAd = function () {
        this.interstitialAd.hide();
        console.log("interstitialAd 游戏隐藏插屏广告");
    };
    AdAgentCocosplay.prototype.destroyInterstitialAd = function () {
        this.interstitialAdLoaded = false;
        this.interstitialAd.destroy();
        console.log("interstitialAd 游戏销毁插屏广告");
    };
    // 创建激励视频广告 展示一次创建一次
    // 参数
    //   adId: string 广告序号ID 游戏自定义
    //   videoAdId: string 视频广告ID 需后台申请
    //   screenOrientation: int 广告类型 1 横屏 2 竖屏
    AdAgentCocosplay.prototype.ShowVideo = function (callback) {
        var self = this;
        self._videoCallback = callback;
        if (self.videoAdLoaded) {
            self.videoAd.show().then(function () {
                if (self._videoCallback) {
                    self._videoCallback(true, "视频播放成功");
                    self._videoCallback = null;
                }
            }, function (err) {
                if (self._videoCallback) {
                    self._videoCallback(false, "暂无视频广告");
                    self._videoCallback = null;
                }
            });
        }
        else {
            if (self._videoCallback) {
                self._videoCallback(false, "暂无视频广告");
                self._videoCallback = null;
            }
            self.createVideoAd();
        }
    };
    AdAgentCocosplay.prototype.createVideoAd = function () {
        var self = this;
        console.log("视频id为：" + Utils_1.utils.config.cocosConfig.videoId);
        //@ts-ignore
        self.videoAd = AdSDK.createRewardedVideoAd("1", Utils_1.utils.config.cocosConfig.videoId, 2);
        self.videoAd.onLoad(function () {
            self.videoAdLoaded = true;
            console.log("rewardedvideoAd 创建视频广告成功，可以调用展示");
        });
        self.videoAd.onError(function (param) {
            console.log("rewardedvideoAd 创建视频广告失败，错误码 = ", param.errorCode);
            self.destroyRewardedVideoAd(); //加载广告失败，销毁
            if (self._videoCallback) {
                self._videoCallback(false, "暂无视频广告");
                self._videoCallback = null;
            }
        });
        self.videoAd.onClose(function () {
            if (self._videoCallback) {
                self._videoCallback(false, "观看完视频才能获得奖励!");
                self._videoCallback = null;
            }
            self.destroyRewardedVideoAd(); //视频广告关闭，销毁
            self.createVideoAd();
        });
    };
    AdAgentCocosplay.prototype.destroyRewardedVideoAd = function () {
        this.videoAdLoaded = false;
        this.videoAd.destroy();
        console.log("rewardedvideoAd 游戏销毁视频广告");
    };
    AdAgentCocosplay = __decorate([
        ccclass
    ], AdAgentCocosplay);
    return AdAgentCocosplay;
}(AdAgent_1.default));
exports.default = AdAgentCocosplay;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudENvY29zcGxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFHaEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBRUg7SUFBOEMsb0NBQU87SUFBckQ7UUFBQSxxRUErTkM7UUE3TkEsWUFBTSxHQUFRLElBQUksQ0FBQztRQUNuQixvQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixhQUFPLEdBQVEsRUFBRSxDQUFDO1FBRWxCLGtCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLDBCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixtQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUVoQyxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsWUFBWTtRQUNaLFFBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBZ0VmLFFBQVE7UUFDUixzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0IseUJBQW1CLEdBQVcsQ0FBQyxDQUFDOztJQTZJakMsQ0FBQztJQTlNTywrQkFBSSxHQUFYO1FBQUEsaUJBT0M7UUFMQSxhQUFLLENBQUMsdUJBQXVCLENBQUM7WUFDN0IsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1QsQ0FBQztJQUVELHFDQUFVLEdBQVY7UUFDQyxJQUFJLElBQUksR0FBRyxJQUFJ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ZXNDb250ZW50IjpbImltcG9ydCBBZEFnZW50IGZyb20gXCIuL0FkQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIHVj5bm/5ZGK57uE5Lu2XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50Q29jb3NwbGF5IGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG5cdGJhbm5lcjogYW55ID0gbnVsbDtcclxuXHRpbnRlcnN0aXRpYWxBZDogYW55ID0ge307XHJcblx0dmlkZW9BZDogYW55ID0ge307XHJcblxyXG5cdGJhbm5lckxvYWRlZCA9IGZhbHNlO1xyXG5cdGludGVyc3RpdGlhbEFkTG9hZGVkID0gZmFsc2U7XHJcblx0dmlkZW9BZExvYWRlZCA9IGZhbHNlO1xyXG5cdF92aWRlb0NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblx0X2lzVmlkZW9Mb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0X3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcblx0X2Jhbm5lckFkOiBhbnkgPSBudWxsO1xyXG5cdC8vQHRzLWlnbm9yZVxyXG5cdHVjID0gd2luZG93LnVjO1xyXG5cclxuXHRwdWJsaWMgSW5pdCgpIHtcclxuXHJcblx0XHR1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcblx0XHRcdHRoaXMuaW5pdEJhbm5lcigpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUluc2VydEFkKCk7XHJcblx0XHRcdHRoaXMuY3JlYXRlVmlkZW9BZCgpO1xyXG5cdFx0fSwgdGhpcylcclxuXHR9XHJcblxyXG5cdGluaXRCYW5uZXIoKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRzZWxmLmJhbm5lckxvYWRlZCA9IGZhbHNlO1xyXG5cdFx0Ly9AdHMtaWdub3JlXHJcblx0XHRzZWxmLmJhbm5lciA9IEFkU0RLLmNyZWF0ZUJhbm5lckFkKFwiMVwiLCB1dGlscy5jb25maWcuY29jb3NDb25maWcuYmFubmVySWQsIDIpO1xyXG5cdFx0Ly/ms6jlhoxvbkxvYWTlh73mlbAs5ri45oiP6LCD55So5Yib5bu6YmFubmVy5pe277yMQWRTREvpgJrnn6XlubPlj7DliJvlu7rlub/lkYrvvIzlvZPliJvlu7rmiJDlip/vvIzkvJrmiafooYzor6Xlm57osIPlh73mlbDpgJrnn6XmuLjmiI9cclxuXHRcdHNlbGYuYmFubmVyLm9uTG9hZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNlbGYuYmFubmVyTG9hZGVkID0gdHJ1ZTtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJiYW5uZXIg5Yib5bu6YmFubmVy5oiQ5Yqf77yM5Y+v5Lul6LCD55So5bGV56S6XCIpO1xyXG5cdFx0fSk7XHJcblx0XHQvL+azqOWGjG9uRXJyb3Llh73mlbAs5ri45oiP6LCD55So5Yib5bu6YmFubmVy5pe277yMQWRTREvpgJrnn6XlubPlj7DliJvlu7rlub/lkYrvvIzlvZPliJvlu7rlpLHotKXvvIzkvJrmiafooYzor6Xlm57osIPlh73mlbDpgJrnn6XmuLjmiI9cclxuXHRcdHNlbGYuYmFubmVyLm9uRXJyb3IoZnVuY3Rpb24gKHBhcmFtKSB7XHJcblx0XHRcdHNlbGYuZGVzdHJveUJhbm5lckFkKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiYmFubmVyIOWIm+W7umJhbm5lcuWksei0pe+8jOmUmeivr+eggSA9IFwiLCBwYXJhbS5lcnJvckNvZGUpO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zb2xlLmxvZygnYmFubmVyIOa4uOaIj+WIm+W7umJhbm5lcuW5v+WRiicpO1xyXG5cdH1cclxuXHJcblx0U2hvd0Jhbm5lcigpIHtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdC8vIHNlbGYuY3JlYXRlQmFubmVyQWQoKVxyXG5cdFx0Ly8gc2VsZi5iYW5uZXJMb2FkZWQgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0aWYgKHNlbGYuYmFubmVyTG9hZGVkKSB7Ly9PYmplY3Qua2V5cyhiYW5uZXIpLmxlbmd0aCAmJlxyXG5cdFx0XHRzZWxmLmJhbm5lci5zaG93KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Jhbm5lciDlub/lkYrmmL7npLrmiJDlip8nKVxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Jhbm5lciDlub/lkYrmmL7npLrlpLHotKUnKVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2Jhbm5lciDlsZXnpLpiYW5uZXLlub/lkYonKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdiYW5uZXIg5pyq5Yqg6L295oiQ5YqfJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRIaWRlQmFubmVyKCkge1xyXG5cdFx0dGhpcy5iYW5uZXIuaGlkZSgpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2Jhbm5lciDpmpDol49iYW5uZXLlub/lkYonKTtcclxuXHR9XHJcblxyXG5cclxuXHRkZXN0cm95QmFubmVyQWQoKSB7XHJcblx0XHR0aGlzLmJhbm5lckxvYWRlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5iYW5uZXIuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy5iYW5uZXIgPSBudWxsO1xyXG5cdFx0Y29uc29sZS5sb2coJ2Jhbm5lciDplIDmr4FiYW5uZXLlub/lkYonKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG5cdFx0cmV0dXJuIHV0aWxzLl90b29sX0NvY29zcGxheS5TZXJ2ZXJDb25maWc7XHJcblx0fVxyXG5cclxuXHQvL+aPkuWxj+aYvuekuuasoeaVsFxyXG5cdF9pbnNlcnRTaG93Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG5cdF9pbnNlcnRMYXN0U2hvd1RpbWU6IG51bWJlciA9IDA7XHJcblx0LyoqXHJcblx0ICog6aqM6K+B5o+S5bGP5piv5ZCm6IO95bGV56S6XHJcblx0ICogMeOAgeasoeaVsOmZkOWItiDpu5jorqTmr4/ml6U45qyhXHJcblx0ICogMuOAgeaXtumXtOmZkOWItiDpu5jorqQ2MOenklxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tJbnNlcnRBZFNob3coKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgbWF4U2hvd0NvdW50ID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9tYXhfc2hvd19jb3VudDtcclxuXHRcdG1heFNob3dDb3VudCA9IDA7XHJcblx0XHRsZXQgaW50ZXJ2YWxUaW1lID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhbF9pbnRlcnZhbF90aW1lO1xyXG5cdFx0bGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdFx0bGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2luc2VydExhc3RTaG93VGltZSkgLyAxMDAwO1xyXG5cclxuXHRcdHV0aWxzLnNob3dMb2coXCJjb2Nvc+acjeWKoeWZqOaPkuWxj+acgOWkp+aYvuekuuasoeaVsOS4uu+8mlwiICsgbWF4U2hvd0NvdW50ICsgXCIs6Ze06ZqU5pi+56S65pe26Ze05Li677yaXCIgKyBpbnRlcnZhbFRpbWUgKyBcIuenku+8gVwiKTtcclxuXHRcdHV0aWxzLnNob3dMb2coXCJjb2Nvc+aPkuWxj+W9k+WJjeW5v+WRiuaYvuekuuasoeaVsO+8mlwiICsgdGhpcy5faW5zZXJ0U2hvd0NvdW50ICsgXCLmrKHvvIzpl7TpmpTml7bpl7TvvJpcIiArIGludGVydmFsICsgXCLnp5LvvIFcIik7XHJcblx0XHRpZiAobWF4U2hvd0NvdW50ID4gMCAmJiB0aGlzLl9pbnNlcnRTaG93Q291bnQgPj0gbWF4U2hvd0NvdW50KSB7XHJcblx0XHRcdHV0aWxzLnNob3dMb2coXCJjb2Nvc+aPkuWxj+W5v+WRiuaYvuekuueahOasoeaVsOi+vuWIsFwiICsgbWF4U2hvd0NvdW50ICsgXCLmrKHjgILmj5LlsY/kuI3mmL7npLpcIik7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW50ZXJ2YWxUaW1lID4gMCAmJiBpbnRlcnZhbCA8IGludGVydmFsVGltZSkge1xyXG5cdFx0XHR1dGlscy5zaG93TG9nKFwiY29jb3Pmj5LlsY/lub/lkYrmmL7npLrnmoTpl7TpmpTlsJHkuo5cIiArIGludGVydmFsVGltZSArIFwi56eS44CC5o+S5bGP5LiN5pi+56S6XCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvLyDliJvlu7rmj5LlsY/lub/lkYog5bGV56S65LiA5qyh6LCD55So5LiA5qyh5Yib5bu6XHJcblx0Ly8g5Y+C5pWwXHJcblx0Ly8gICBhZElkOiBzdHJpbmcg5bm/5ZGK5bqP5Y+3SUQg5ri45oiP6Ieq5a6a5LmJXHJcblx0Ly8gICBpbnRlcnN0aXRpYWxBZElkOiBzdHJpbmcg5o+S5bGP5bm/5ZGKSUQg6ZyA5ZCO5Y+w55Sz6K+3XHJcblx0Ly8gICBzdHlsZTogaW50IOW5v+WRiuexu+WeiyAxIOWFqOWxjyAyIOWNiuWxj1xyXG5cdHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKCkge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzXHJcblx0XHRpZiAoIXNlbGYuY2hlY2tJbnNlcnRBZFNob3coKSkgcmV0dXJuO1xyXG5cdFx0aWYgKHNlbGYuaW50ZXJzdGl0aWFsQWRMb2FkZWQpIHtcclxuXHRcdFx0c2VsZi5pbnRlcnN0aXRpYWxBZC5zaG93KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0c2VsZi5faW5zZXJ0TGFzdFNob3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRcdFx0c2VsZi5kZXN0cm95SW50ZXJzdGl0aWFsQWQoKTtcclxuXHRcdFx0XHRzZWxmLmNyZWF0ZUluc2VydEFkKCk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImludGVyc3RpdGlhbEFkIOW5v+WRiuaYvuekuuWksei0pVwiKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRjb25zb2xlLmxvZyhcImludGVyc3RpdGlhbEFkIOa4uOaIj+WxleekuuaPkuWxj+W5v+WRilwiKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIGNyZWF0ZUluc2VydEFkKCkge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzXHJcblx0XHR1dGlscy5zaG93TG9nKFwi5o+S5bGPaWTkuLrvvJpcIiArIHV0aWxzLmNvbmZpZy5jb2Nvc0NvbmZpZy5pbnNlcnRJZClcclxuXHRcdC8vQHRzLWlnbm9yZVxyXG5cdFx0dGhpcy5pbnRlcnN0aXRpYWxBZCA9IEFkU0RLLmNyZWF0ZUludGVyc3RpdGlhbEFkKFwiMVwiLCB1dGlscy5jb25maWcuY29jb3NDb25maWcuaW5zZXJ0SWQsIDIpO1xyXG5cclxuXHRcdHRoaXMuaW50ZXJzdGl0aWFsQWQub25Mb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2VsZi5pbnRlcnN0aXRpYWxBZExvYWRlZCA9IHRydWU7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiaW50ZXJzdGl0aWFsQWQg5Yib5bu65o+S5bGP5oiQ5Yqf77yM5Y+v5Lul6LCD55So5bGV56S6XCIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2VsZi5pbnRlcnN0aXRpYWxBZC5vbkVycm9yKGZ1bmN0aW9uIChwYXJhbSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImludGVyc3RpdGlhbEFkIOWIm+W7uuaPkuWxj+Wksei0pe+8jOmUmeivr+eggSA9IFwiLCBwYXJhbS5lcnJvckNvZGUpO1xyXG5cdFx0XHRzZWxmLmRlc3Ryb3lJbnRlcnN0aXRpYWxBZCgpO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0aGlkZUludGVyc3RpdGlhbEFkKCkge1xyXG5cdFx0dGhpcy5pbnRlcnN0aXRpYWxBZC5oaWRlKCk7XHJcblx0XHRjb25zb2xlLmxvZyhcImludGVyc3RpdGlhbEFkIOa4uOaIj+makOiXj+aPkuWxj+W5v+WRilwiKTtcclxuXHR9XHJcblxyXG5cclxuXHRkZXN0cm95SW50ZXJzdGl0aWFsQWQoKSB7XHJcblx0XHR0aGlzLmludGVyc3RpdGlhbEFkTG9hZGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmludGVyc3RpdGlhbEFkLmRlc3Ryb3koKTtcclxuXHRcdGNvbnNvbGUubG9nKFwiaW50ZXJzdGl0aWFsQWQg5ri45oiP6ZSA5q+B5o+S5bGP5bm/5ZGKXCIpO1xyXG5cdH1cclxuXHJcblx0Ly8g5Yib5bu65r+A5Yqx6KeG6aKR5bm/5ZGKIOWxleekuuS4gOasoeWIm+W7uuS4gOasoVxyXG5cdC8vIOWPguaVsFxyXG5cdC8vICAgYWRJZDogc3RyaW5nIOW5v+WRiuW6j+WPt0lEIOa4uOaIj+iHquWumuS5iVxyXG5cdC8vICAgdmlkZW9BZElkOiBzdHJpbmcg6KeG6aKR5bm/5ZGKSUQg6ZyA5ZCO5Y+w55Sz6K+3XHJcblx0Ly8gICBzY3JlZW5PcmllbnRhdGlvbjogaW50IOW5v+WRiuexu+WeiyAxIOaoquWxjyAyIOerluWxj1xyXG5cdHB1YmxpYyBTaG93VmlkZW8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRzZWxmLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRpZiAoc2VsZi52aWRlb0FkTG9hZGVkKSB7XHJcblx0XHRcdHNlbGYudmlkZW9BZC5zaG93KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKHNlbGYuX3ZpZGVvQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHNlbGYuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCLop4bpopHmkq3mlL7miJDlip9cIik7XHJcblx0XHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRpZiAoc2VsZi5fdmlkZW9DYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYpcIik7XHJcblx0XHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuX3ZpZGVvQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRilwiKTtcclxuXHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZWxmLmNyZWF0ZVZpZGVvQWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVZpZGVvQWQoKSB7XHJcblxyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0Y29uc29sZS5sb2coXCLop4bpopFpZOS4uu+8mlwiICsgdXRpbHMuY29uZmlnLmNvY29zQ29uZmlnLnZpZGVvSWQpXHJcblx0XHQvL0B0cy1pZ25vcmVcclxuXHRcdHNlbGYudmlkZW9BZCA9IEFkU0RLLmNyZWF0ZVJld2FyZGVkVmlkZW9BZChcIjFcIiwgdXRpbHMuY29uZmlnLmNvY29zQ29uZmlnLnZpZGVvSWQsIDIpO1xyXG5cclxuXHRcdHNlbGYudmlkZW9BZC5vbkxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzZWxmLnZpZGVvQWRMb2FkZWQgPSB0cnVlO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInJld2FyZGVkdmlkZW9BZCDliJvlu7rop4bpopHlub/lkYrmiJDlip/vvIzlj6/ku6XosIPnlKjlsZXnpLpcIilcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNlbGYudmlkZW9BZC5vbkVycm9yKGZ1bmN0aW9uIChwYXJhbSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInJld2FyZGVkdmlkZW9BZCDliJvlu7rop4bpopHlub/lkYrlpLHotKXvvIzplJnor6/noIEgPSBcIiwgcGFyYW0uZXJyb3JDb2RlKTtcclxuXHRcdFx0c2VsZi5kZXN0cm95UmV3YXJkZWRWaWRlb0FkKCk7Ly/liqDovb3lub/lkYrlpLHotKXvvIzplIDmr4FcclxuXHJcblx0XHRcdGlmIChzZWxmLl92aWRlb0NhbGxiYWNrKSB7XHJcblx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLmmoLml6Dop4bpopHlub/lkYpcIik7XHJcblx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0c2VsZi52aWRlb0FkLm9uQ2xvc2UoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoc2VsZi5fdmlkZW9DYWxsYmFjaykge1xyXG5cdFx0XHRcdHNlbGYuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeC55yL5a6M6KeG6aKR5omN6IO96I635b6X5aWW5YqxIVwiKTtcclxuXHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZWxmLmRlc3Ryb3lSZXdhcmRlZFZpZGVvQWQoKTsvL+inhumikeW5v+WRiuWFs+mXre+8jOmUgOavgVxyXG5cdFx0XHRzZWxmLmNyZWF0ZVZpZGVvQWQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveVJld2FyZGVkVmlkZW9BZCgpIHtcclxuXHRcdHRoaXMudmlkZW9BZExvYWRlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy52aWRlb0FkLmRlc3Ryb3koKTtcclxuXHRcdGNvbnNvbGUubG9nKFwicmV3YXJkZWR2aWRlb0FkIOa4uOaIj+mUgOavgeinhumikeW5v+WRilwiKTtcclxuXHR9XHJcbn1cclxuIl19