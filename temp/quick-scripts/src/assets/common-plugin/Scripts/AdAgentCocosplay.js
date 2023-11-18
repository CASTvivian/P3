"use strict";
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