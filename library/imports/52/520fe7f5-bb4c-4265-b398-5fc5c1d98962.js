"use strict";
cc._RF.push(module, '520fef1u0xCZbOYX8XB2Yli', 'AdAgentQTT');
// common-plugin/Scripts/AdAgentQTT.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 趣头条广告组件
 */
var AdAgentQTT = /** @class */ (function (_super) {
    __extends(AdAgentQTT, _super);
    function AdAgentQTT() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._isInsertAdShow = false;
        _this._isInsertAdLoaded = false;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._isVideoShow = false;
        //@ts-ignore
        _this.qttGame = window.qttGame;
        /**
         * 当视频广告资源不足
         * 备选互动广告
         * -- 平台强制添加 ---
         */
        _this.options = null;
        _this._insertLastShowTime = 0;
        return _this;
    }
    Object.defineProperty(AdAgentQTT.prototype, "ServerConfig", {
        get: function () {
            if (Utils_1.utils._tool_QTT && Utils_1.utils._tool_QTT.ServerConfig) {
                return Utils_1.utils._tool_QTT.ServerConfig;
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    AdAgentQTT.prototype.Init = function () {
        if (PlatUtils_1.default.IsQTT) {
            if (!Utils_1.utils.config.qttconfig.showAd) {
                cc.warn("广告开关关闭状态，所有广告不显示！要显示广告，请打开 CommonUtils 组件上VIVIO 配置下的广告开关！");
            }
            // this.options = {};
            // this.options.gametype = 1;//互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
            // this.options.rewardtype = 1;//互动广告框，只有 1
            // this.options.data = {};
            // this.options.data.title = "获得奖励";//互动抽中奖后的道具提示文字
            // this.options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png";//互动抽中奖后的道具图标(可选)
            // this.options.callback = (res) => {
            //     //回调函数
            //     utils.showLog("播放互动广告>> #res=", res)
            //     if (res == 1) {
            //         //播放完成，发放奖励
            //         if (this._videoCallback) {
            //             this._videoCallback(true, "");
            //             this._videoCallback = null;
            //         }
            //     } else {
            //         //res = 0    填充不足
            //         if (this._videoCallback) {
            //             this._videoCallback(false, "广告加载失败,请稍后再试!");
            //             this._videoCallback = null;
            //         }
            //     }
            // };
        }
    };
    /**
     * 创建互动广告
     */
    AdAgentQTT.prototype.createOption = function () {
        var _this = this;
        var options = {};
        options.gametype = (Math.floor(Math.random() * 3 + 1)); //互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
        options.rewardtype = 1; //互动广告框，只有 1
        options.data = {};
        options.data.title = "获得奖励"; //互动抽中奖后的道具提示文字
        options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png"; //互动抽中奖后的道具图标(可选)
        options.callback = function (res) {
            //回调函数
            Utils_1.utils.showLog("播放互动广告>> #res=", res);
            if (res == 1) {
                //播放完成，发放奖励
                if (_this._videoCallback) {
                    _this._videoCallback(true, "");
                    _this._videoCallback = null;
                }
            }
            else {
                //res = 0    填充不足
                if (_this._videoCallback) {
                    _this._videoCallback(false, "广告加载失败,请稍后再试!");
                    _this._videoCallback = null;
                }
            }
        };
        return options;
    };
    /**
     * 显示banner
     */
    AdAgentQTT.prototype.ShowBanner = function () {
        if (PlatUtils_1.default.IsQTT) {
            if (!Utils_1.utils.config.qttconfig.showAd) {
                return;
            }
            var options = {};
            options.index = location; //
            if (cc.winSize.height < cc.winSize.width) {
                //横屏游戏
                options.x = 1;
                options.y = 1;
                options.w = cc.winSize.width;
                options.stage_width = cc.winSize.width;
                options.stage_height = cc.winSize.height;
            }
            this.qttGame.showBanner(options);
        }
    };
    /**
     * 隐藏banner
     */
    AdAgentQTT.prototype.HideBanner = function () {
        if (PlatUtils_1.default.IsQTT) {
            if (!Utils_1.utils.config.qttconfig.showAd) {
                return;
            }
            this.qttGame.hideBanner();
        }
    };
    /**
     * 暂时没有插屏广告
     * @param location
     */
    AdAgentQTT.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        // if (PlatUtils.IsQTT) {
        //     if (!utils.config.qttconfig.showAd) {
        //         return;
        //     }
        // }
        return;
    };
    /**
     * 显示互动直弹广告
     */
    AdAgentQTT.prototype.showInteractiveAd = function () {
        if (PlatUtils_1.default.IsQTT) {
            if (!this.checkInsertAdShow()) {
                return;
            }
            var options = {};
            options.rewardtype = 1; //互动广告框，只有 1
            Utils_1.utils.showLog("互动直弹时间间隔开始");
            this._insertLastShowTime = new Date().getTime();
            this.qttGame.showHDReward(options);
        }
    };
    /**
     * 验证插屏是否能展示
     * 2、时间限制 默认30秒
     */
    AdAgentQTT.prototype.checkInsertAdShow = function () {
        var intervalTime = this.ServerConfig.intersititial_interval_time ? this.ServerConfig.intersititial_interval_time : 30;
        var curTime = new Date().getTime();
        var interval = (curTime - this._insertLastShowTime) / 1000;
        Utils_1.utils.showLog("qtt服务器插屏间隔显示时间为：" + intervalTime + "秒！");
        Utils_1.utils.showLog("qtt插屏当前广告间隔时间：" + interval + "秒！");
        if (intervalTime > 0 && interval < intervalTime) {
            Utils_1.utils.showLog("qtt插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
            return false;
        }
        return true;
    };
    /**
     * 显示视频广告
     * @param callback 回调函数
     */
    AdAgentQTT.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsQTT) {
            this._videoCallback = callback;
            if (!Utils_1.utils.config.qttconfig.showAd) {
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            this._isVideoShow = true;
            var opt = this.createOption();
            this.qttGame.showVideo(function (res) {
                Utils_1.utils.showLog("播放视频广告>> #res=", res);
                if (res == 1) {
                    if (_this._videoCallback) {
                        _this._videoCallback(true, "");
                        _this._videoCallback = null;
                    }
                }
                else {
                    if (_this._videoCallback) {
                        if (res == 0) {
                            _this._videoCallback(false, "广告加载失败,请稍后再试!");
                        }
                        else if (res == 2) {
                            _this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                        }
                        _this._videoCallback = null;
                    }
                }
            }, opt);
        }
    };
    AdAgentQTT = __decorate([
        ccclass
    ], AdAgentQTT);
    return AdAgentQTT;
}(AdAgent_1.default));
exports.default = AdAgentQTT;

cc._RF.pop();