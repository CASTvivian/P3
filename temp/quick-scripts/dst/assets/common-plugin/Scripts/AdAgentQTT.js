
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentQTT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudFFUVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNkNBQStDO0FBQy9DLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUF3Qyw4QkFBTztJQUEvQztRQUFBLHFFQTROQztRQTFORyxlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFFckIscUJBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsdUJBQWlCLEdBQVksS0FBSyxDQUFDO1FBRW5DLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLG9CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLFlBQVk7UUFDWixhQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQVN6Qjs7OztXQUlHO1FBQ0gsYUFBTyxHQUFRLElBQUksQ0FBQztRQXFJcEIseUJBQW1CLEdBQUcsQ0FBQyxDQUFDOztJQTRENUIsQ0FBQztJQTVNRyxzQkFBVyxvQ0FBWTthQUF2QjtZQUNJLElBQUksYUFBSyxDQUFDLFNBQVMsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtnQkFDakQsT0FBTyxhQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQzthQUN2QztZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFTTSx5QkFBSSxHQUFYO1FBQ0ksSUFBSSxtQkFBUyxDQUFDLEtBQUssRUFBRTtZQUNqQixJQUFJLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxFQUFFLENB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RyxJQUFJLENBQUMsRUFBRTtvQkFDVixJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQ3JCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUM5QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztxQkFDOUI7aUJBQ0o7cUJBQU07b0JBQ0gsSUFBSSxLQUFJLENBQUMsY0FBYyxFQUFFO3dCQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7NEJBQ1YsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7eUJBQy9DOzZCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTs0QkFDakIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzt5QkFDaEQ7d0JBQ0QsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7cUJBQzlCO2lCQUNKO1lBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7SUFDTCxDQUFDO0lBek5nQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNE45QjtJQUFELGlCQUFDO0NBNU5ELEFBNE5DLENBNU51QyxpQkFBTyxHQTROOUM7a0JBNU5vQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICog6Laj5aS05p2h5bm/5ZGK57uE5Lu2XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50UVRUIGV4dGVuZHMgQWRBZ2VudCB7XHJcblxyXG4gICAgX2Jhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcblxyXG4gICAgX2lzSW5zZXJ0QWRTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNJbnNlcnRBZExvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF92aWRlb0NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzVmlkZW9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBxdHRHYW1lID0gd2luZG93LnF0dEdhbWU7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIGlmICh1dGlscy5fdG9vbF9RVFQgJiYgdXRpbHMuX3Rvb2xfUVRULlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbHMuX3Rvb2xfUVRULlNlcnZlckNvbmZpZztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPop4bpopHlub/lkYrotYTmupDkuI3otrNcclxuICAgICAqIOWkh+mAieS6kuWKqOW5v+WRilxyXG4gICAgICogLS0g5bmz5Y+w5by65Yi25re75YqgIC0tLVxyXG4gICAgICovXHJcbiAgICBvcHRpb25zOiBhbnkgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuY29uZmlnLnF0dGNvbmZpZy5zaG93QWQpIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlub/lkYrlvIDlhbPlhbPpl63nirbmgIHvvIzmiYDmnInlub/lkYrkuI3mmL7npLrvvIHopoHmmL7npLrlub/lkYrvvIzor7fmiZPlvIAgQ29tbW9uVXRpbHMg57uE5Lu25LiKVklWSU8g6YWN572u5LiL55qE5bm/5ZGK5byA5YWz77yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5vcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIC8vIHRoaXMub3B0aW9ucy5nYW1ldHlwZSA9IDE7Ly/kupLliqjmuLjmiI/nsbvlnovvvIwxKOeguOmHkeibiykgIDIobGFiYSkgIDMo5aSn6L2s55uYKVxyXG4gICAgICAgICAgICAvLyB0aGlzLm9wdGlvbnMucmV3YXJkdHlwZSA9IDE7Ly/kupLliqjlub/lkYrmoYbvvIzlj6rmnIkgMVxyXG4gICAgICAgICAgICAvLyB0aGlzLm9wdGlvbnMuZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAvLyB0aGlzLm9wdGlvbnMuZGF0YS50aXRsZSA9IFwi6I635b6X5aWW5YqxXCI7Ly/kupLliqjmir3kuK3lpZblkI7nmoTpgZPlhbfmj5DnpLrmloflrZdcclxuICAgICAgICAgICAgLy8gdGhpcy5vcHRpb25zLmRhdGEudXJsID0gXCIvL25ld2lkZWE0LWdhbWVjZW50ZXItZnJvbnRlbmQuMXNhcHAuY29tL2dhbWUvcHJvZC9ma3h4bF9pbWcvMS5wbmdcIjsvL+S6kuWKqOaKveS4reWlluWQjueahOmBk+WFt+Wbvuaghyjlj6/pgIkpXHJcbiAgICAgICAgICAgIC8vIHRoaXMub3B0aW9ucy5jYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIC8v5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwi5pKt5pS+5LqS5Yqo5bm/5ZGKPj4gI3Jlcz1cIiwgcmVzKVxyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHJlcyA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/mkq3mlL7lrozmiJDvvIzlj5HmlL7lpZblirFcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8vcmVzID0gMCAgICDloavlhYXkuI3otrNcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuW5v+WRiuWKoOi9veWksei0pSzor7fnqI3lkI7lho3or5UhXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65LqS5Yqo5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlT3B0aW9uKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBhbnkgPSB7fTtcclxuICAgICAgICBvcHRpb25zLmdhbWV0eXBlID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMgKyAxKSk7Ly/kupLliqjmuLjmiI/nsbvlnovvvIwxKOeguOmHkeibiykgIDIobGFiYSkgIDMo5aSn6L2s55uYKVxyXG4gICAgICAgIG9wdGlvbnMucmV3YXJkdHlwZSA9IDE7Ly/kupLliqjlub/lkYrmoYbvvIzlj6rmnIkgMVxyXG4gICAgICAgIG9wdGlvbnMuZGF0YSA9IHt9O1xyXG4gICAgICAgIG9wdGlvbnMuZGF0YS50aXRsZSA9IFwi6I635b6X5aWW5YqxXCI7Ly/kupLliqjmir3kuK3lpZblkI7nmoTpgZPlhbfmj5DnpLrmloflrZdcclxuICAgICAgICBvcHRpb25zLmRhdGEudXJsID0gXCIvL25ld2lkZWE0LWdhbWVjZW50ZXItZnJvbnRlbmQuMXNhcHAuY29tL2dhbWUvcHJvZC9ma3h4bF9pbWcvMS5wbmdcIjsvL+S6kuWKqOaKveS4reWlluWQjueahOmBk+WFt+Wbvuaghyjlj6/pgIkpXHJcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgLy/lm57osIPlh73mlbBcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaSreaUvuS6kuWKqOW5v+WRij4+ICNyZXM9XCIsIHJlcylcclxuICAgICAgICAgICAgaWYgKHJlcyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL+aSreaUvuWujOaIkO+8jOWPkeaUvuWlluWKsVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9yZXMgPSAwICAgIOWhq+WFheS4jei2s1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuW5v+WRiuWKoOi9veWksei0pSzor7fnqI3lkI7lho3or5UhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekumJhbm5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd0Jhbm5lcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuY29uZmlnLnF0dGNvbmZpZy5zaG93QWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb3B0aW9uczogYW55ID0ge307XHJcbiAgICAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBsb2NhdGlvbjsgLy9cclxuXHJcbiAgICAgICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIC8v5qiq5bGP5ri45oiPXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnggPSAxO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy55ID0gMTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMudyA9IGNjLndpblNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnN0YWdlX3dpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RhZ2VfaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5xdHRHYW1lLnNob3dCYW5uZXIob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj2Jhbm5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIGlmICghdXRpbHMuY29uZmlnLnF0dGNvbmZpZy5zaG93QWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnF0dEdhbWUuaGlkZUJhbm5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguaXtuayoeacieaPkuWxj+W5v+WRilxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd0ludGVyc3RpdGlhbChsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ib21lKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKFBsYXRVdGlscy5Jc1FUVCkge1xyXG4gICAgICAgIC8vICAgICBpZiAoIXV0aWxzLmNvbmZpZy5xdHRjb25maWcuc2hvd0FkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65LqS5Yqo55u05by55bm/5ZGKIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0ludGVyYWN0aXZlQWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FUVCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbnNlcnRBZFNob3coKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yZXdhcmR0eXBlID0gMTsgLy/kupLliqjlub/lkYrmoYbvvIzlj6rmnIkgMVxyXG5cclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkupLliqjnm7TlvLnml7bpl7Tpl7TpmpTlvIDlp4tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc2VydExhc3RTaG93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnF0dEdhbWUuc2hvd0hEUmV3YXJkKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaW5zZXJ0TGFzdFNob3dUaW1lID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5o+S5bGP5piv5ZCm6IO95bGV56S6XHJcbiAgICAgKiAy44CB5pe26Ze06ZmQ5Yi2IOm7mOiupDMw56eSXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tJbnNlcnRBZFNob3coKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGludGVydmFsVGltZSA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfaW50ZXJ2YWxfdGltZSA/IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfaW50ZXJ2YWxfdGltZSA6IDMwO1xyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5faW5zZXJ0TGFzdFNob3dUaW1lKSAvIDEwMDA7XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJxdHTmnI3liqHlmajmj5LlsY/pl7TpmpTmmL7npLrml7bpl7TkuLrvvJpcIiArIGludGVydmFsVGltZSArIFwi56eS77yBXCIpO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJxdHTmj5LlsY/lvZPliY3lub/lkYrpl7TpmpTml7bpl7TvvJpcIiArIGludGVydmFsICsgXCLnp5LvvIFcIik7XHJcblxyXG4gICAgICAgIGlmIChpbnRlcnZhbFRpbWUgPiAwICYmIGludGVydmFsIDwgaW50ZXJ2YWxUaW1lKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJxdHTmj5LlsY/lub/lkYrmmL7npLrnmoTpl7TpmpTlsJHkuo5cIiArIGludGVydmFsVGltZSArIFwi56eS44CC5o+S5bGP5LiN5pi+56S6XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuinhumikeW5v+WRilxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNRVFQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF1dGlscy5jb25maWcucXR0Y29uZmlnLnNob3dBZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgb3B0ID0gdGhpcy5jcmVhdGVPcHRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5xdHRHYW1lLnNob3dWaWRlbygocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pKt5pS+6KeG6aKR5bm/5ZGKPj4gI3Jlcz1cIiwgcmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayh0cnVlLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5bm/5ZGK5Yqg6L295aSx6LSlLOivt+eojeWQjuWGjeivlSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeG6aKR5pKt5pS+5a6M5q+V5omN6IO95aSf6I635Y+W5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIG9wdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19