
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentKwai.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '767edHy/iZCu5cXzuKSiUzS', 'AdAgentKwai');
// common-plugin/Scripts/AdAgentKwai.ts

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
var AdAgentKwai = /** @class */ (function (_super) {
    __extends(AdAgentKwai, _super);
    function AdAgentKwai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._isVideoShow = false;
        _this._isVideoLoaded = false;
        //@ts-ignore
        _this.kwaigame = window.kwaigame;
        _this.canShowVideo = false;
        _this._interstitialAd = null;
        return _this;
    }
    AdAgentKwai.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsKwai) {
            // this.kwaigame.getSystemInfo({
            //     response: (result) => {
            //         this._sysData = result;
            //         utils.showLog("快手>>>获取系统信息:" + JSON.stringify(result));
            //     }
            // });
            // utils.showLog(this.kwaigame.isSupport({ feature: this.kwaigame.Support.features.RewardVideo }) + "<<<<<");
            // this.canShowVideo = this.kwaigame.isSupport({ feature: this.kwaigame.Support.features.RewardVideo });
            // utils.showLog(`当前平台：${this.canShowVideo == true ? "支持" : "不支持"}视频广告！`);
            // if (this.canShowVideo) {
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initVideoAd();
            }, this);
            // }
        }
    };
    AdAgentKwai.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        Utils_1.utils.showLog("快手平台没有banner广告！");
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentKwai.prototype.showStatementAds = function () {
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
    AdAgentKwai.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
    };
    AdAgentKwai.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        Utils_1.utils.showLog("显示快手插屏");
        if (Utils_1.utils.config.kwaiConfig.insertId) {
            if (!this._interstitialAd) {
                this._interstitialAd = this.kwaigame.createInterstitialAd({ adUnitId: Utils_1.utils.config.kwaiConfig.insertId });
                this._interstitialAd.onError(function (err) {
                    Utils_1.utils.showLog("插屏广告显示异常：" + JSON.stringify(err));
                });
                this._interstitialAd.onClose(function (res) {
                    Utils_1.utils.showLog("用户点击了【关闭广告】按钮");
                });
            }
            this._interstitialAd && this._interstitialAd.show()
                .then(function () { return Utils_1.utils.showLog('插屏 广告显示成功！'); }).catch(function (err) {
                Utils_1.utils.showLog("插屏 广告显示失败 >>" + JSON.stringify(err));
            });
        }
        else {
            Utils_1.utils.showLog("未配置插屏广告ID");
        }
    };
    AdAgentKwai.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsKwai) {
            // 视频广告
            if (this._videoCallback) {
                return;
            }
            else {
                this._videoCallback = callback;
            }
            this._isVideoShow = true;
            if (!this._videoAd) {
                this._initVideoAd();
                if (this._videoCallback) {
                    this._videoCallback(false, "激励视频加载失败!");
                    this._videoCallback = null;
                }
            }
            else {
                this._videoAd.show({
                    success: function () {
                        Utils_1.utils.showLog("激励视频播放成功");
                    },
                    fail: function (error) {
                        Utils_1.utils.showLog("激励视频播放失败: " + JSON.stringify(error));
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "激励视频加载失败!");
                            _this._videoCallback = null;
                        }
                    }
                });
            }
        }
    };
    AdAgentKwai.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            var param = {};
            param.adUnitId = Utils_1.utils.config.kwaiConfig.videoId;
            this._videoAd = this.kwaigame.createRewardedVideoAd(param);
            if (this._videoAd) {
                Utils_1.utils.showLog("激励广告组件获取成功!");
                this._videoAd.onClose(function (result) {
                    Utils_1.utils.showLog("激励视频关闭回调: " + JSON.stringify(result));
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "视频播放完毕才能够获取奖励!");
                        _this._videoCallback = null;
                    }
                });
                this._videoAd.onReward(function (result) {
                    Utils_1.utils.showLog("激励视频奖励回调: " + JSON.stringify(result));
                    if (_this._videoCallback) {
                        _this._videoCallback(true, "");
                        _this._videoCallback = null;
                    }
                });
            }
            else {
                Utils_1.utils.showLog("激励广告组件获取失败");
            }
        }
    };
    AdAgentKwai = __decorate([
        ccclass
    ], AdAgentKwai);
    return AdAgentKwai;
}(AdAgent_1.default));
exports.default = AdAgentKwai;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEt3YWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUErQztBQUMvQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFPO0lBQWhEO1FBQUEscUVBd0pDO1FBdEpHLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG9CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLFlBQVk7UUFDWixjQUFRLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxrQkFBWSxHQUFZLEtBQUssQ0FBQztRQW9EOUIscUJBQWUsR0FBUSxJQUFJLENBQUM7O0lBMEZoQyxDQUFDO0lBN0lVLDBCQUFJLEdBQVg7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixnQ0FBZ0M7WUFDaEMsOEJBQThCO1lBQzlCLGtDQUFrQztZQUNsQyxrRUFBa0U7WUFDbEUsUUFBUTtZQUNSLE1BQU07WUFDTiw2R0FBNkc7WUFDN0csd0dBQXdHO1lBQ3hHLDBFQUEwRTtZQUMxRSwyQkFBMkI7WUFDM0IsYUFBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUMxQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ1IsSUFBSTtTQUNQO0lBQ0wsQ0FBQztJQUdNLGdDQUFVLEdBQWpCLFVBQWtCLFFBQThDLEVBQUUsSUFB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R0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3JELElBQUksS0FBSSxDQUFDLGNBQWMsRUFBRTt3QkFDckIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDN0MsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7cUJBQzlCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQUMsTUFBTTtvQkFDMUIsYUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQ3JCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUM5QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztxQkFDOUI7Z0JBRUwsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQy9CO1NBRUo7SUFDTCxDQUFDO0lBdkpnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBd0ovQjtJQUFELGtCQUFDO0NBeEpELEFBd0pDLENBeEp3QyxpQkFBTyxHQXdKL0M7a0JBeEpvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZEFnZW50S3dhaSBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuICAgIF9zeXNEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgX2Jhbm5lckFkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9DYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX2lzVmlkZW9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNWaWRlb0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBrd2FpZ2FtZTogYW55ID0gd2luZG93Lmt3YWlnYW1lO1xyXG4gICAgY2FuU2hvd1ZpZGVvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmt3YWlnYW1lLmdldFN5c3RlbUluZm8oe1xyXG4gICAgICAgICAgICAvLyAgICAgcmVzcG9uc2U6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl9zeXNEYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlv6vmiYs+Pj7ojrflj5bns7vnu5/kv6Hmga86XCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2codGhpcy5rd2FpZ2FtZS5pc1N1cHBvcnQoeyBmZWF0dXJlOiB0aGlzLmt3YWlnYW1lLlN1cHBvcnQuZmVhdHVyZXMuUmV3YXJkVmlkZW8gfSkgKyBcIjw8PDw8XCIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNhblNob3dWaWRlbyA9IHRoaXMua3dhaWdhbWUuaXNTdXBwb3J0KHsgZmVhdHVyZTogdGhpcy5rd2FpZ2FtZS5TdXBwb3J0LmZlYXR1cmVzLlJld2FyZFZpZGVvIH0pO1xyXG4gICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKGDlvZPliY3lubPlj7DvvJoke3RoaXMuY2FuU2hvd1ZpZGVvID09IHRydWUgPyBcIuaUr+aMgVwiIDogXCLkuI3mlK/mjIFcIn3op4bpopHlub/lkYrvvIFgKTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuY2FuU2hvd1ZpZGVvKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5b+r5omL5bmz5Y+w5rKh5pyJYmFubmVy5bm/5ZGK77yBXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLrnu5Pnrpflub/lkYpcclxuICAgICogQHBhcmFtIGRhdGEg5Y+C5pWw77yaIGNsb3NlQnRuOlxyXG4gICAgKiBzdGF0ZW1lbnRfdHlwZSBcclxuICAgICogMTrlj6rmmL7npLrlsI/muLjmiI/mj5LlsY/lub/lkYpcclxuICAgICogMjrlj6rmmL7npLo25Liq5LqS5o6o5bm/5ZGKXHJcbiAgICAqIDM65pi+56S65o+S5bGP5bm/5ZGKKzbkuKrkupLmjqhcclxuICAgICovXHJcbiAgICBzaG93U3RhdGVtZW50QWRzKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0geyBcInR5cGVcIjogMCwgXCJub2RlXCI6IG51bGwgfTtcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHJlc1R5cGU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5Pnrpflub/lkYogPj4g5pi+56S65o+S5bGP5bm/5ZGKKzbkuKrkupLmjqhcIik7XHJcbiAgICAgICAgdGhpcy5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgbm9kZSA9IHV0aWxzLnNob3dDcm9zc1dpZGdldDYoKTtcclxuICAgICAgICByZXNUeXBlID0gMTtcclxuICAgICAgICByZXN1bHQudHlwZSA9IHJlc1R5cGU7XHJcbiAgICAgICAgcmVzdWx0Lm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEhpZGVCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2ludGVyc3RpdGlhbEFkOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIFNob3dJbnRlcnN0aXRpYWwobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrlv6vmiYvmj5LlsY9cIik7XHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5rd2FpQ29uZmlnLmluc2VydElkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faW50ZXJzdGl0aWFsQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbEFkID0gdGhpcy5rd2FpZ2FtZS5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7IGFkVW5pdElkOiB1dGlscy5jb25maWcua3dhaUNvbmZpZy5pbnNlcnRJZCB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbEFkLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5o+S5bGP5bm/5ZGK5pi+56S65byC5bi477yaXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQWQub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnlKjmiLfngrnlh7vkuobjgJDlhbPpl63lub/lkYrjgJHmjInpkq5cIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbEFkICYmIHRoaXMuX2ludGVyc3RpdGlhbEFkLnNob3coKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdXRpbHMuc2hvd0xvZygn5o+S5bGPIOW5v+WRiuaYvuekuuaIkOWKn++8gScpKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaPkuWxjyDlub/lkYrmmL7npLrlpLHotKUgPj5cIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacqumFjee9ruaPkuWxj+W5v+WRiklEXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICAvLyDop4bpopHlub/lkYpcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9pc1ZpZGVvU2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5r+A5Yqx6KeG6aKR5Yqg6L295aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeaSreaUvuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5pKt5pS+5aSx6LSlOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIua/gOWKseinhumikeWKoOi9veWksei0pSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFZpZGVvQWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbTogYW55ID0ge307XHJcbiAgICAgICAgICAgIHBhcmFtLmFkVW5pdElkID0gdXRpbHMuY29uZmlnLmt3YWlDb25maWcudmlkZW9JZDtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZCA9IHRoaXMua3dhaWdhbWUuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHBhcmFtKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHlub/lkYrnu4Tku7bojrflj5bmiJDlip8hXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkNsb3NlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5YWz6Zet5Zue6LCDOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi6KeG6aKR5pKt5pS+5a6M5q+V5omN6IO95aSf6I635Y+W5aWW5YqxIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uUmV3YXJkKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx6KeG6aKR5aWW5Yqx5Zue6LCDOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHlub/lkYrnu4Tku7bojrflj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==