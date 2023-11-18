
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentBaidu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4db21W0NW9ALaQL6EjOywaw', 'AdAgentBaidu');
// common-plugin/Scripts/AdAgentBaidu.ts

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
var AdAgentBaidu = /** @class */ (function (_super) {
    __extends(AdAgentBaidu, _super);
    function AdAgentBaidu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sysData = null;
        _this._baiduVersion = "";
        _this._recorder = null;
        _this._bannerAd = null;
        _this._videoAd = null;
        _this._videoCallback = null;
        _this._isVideoShow = false;
        _this._isVideoLoaded = false;
        //@ts-ignore
        _this.swan = window.swan;
        _this._bannerSizePercent = 0.1;
        _this._bannerBottom = 0;
        return _this;
    }
    AdAgentBaidu.prototype.Init = function () {
        var _this = this;
        if (PlatUtils_1.default.IsBaidu) {
            this._sysData = this.swan.getSystemInfoSync();
            Utils_1.utils.registerServerInitEvent(function () {
                _this._initVideoAd();
            }, this);
        }
    };
    AdAgentBaidu.prototype.ShowBanner = function (location, args) {
        var _this = this;
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (PlatUtils_1.default.IsBaidu) {
            if (Utils_1.utils.isShowRecommondGamesBanner() && Utils_1.utils.isSupportnavigateToMiniGame()) {
                Utils_1.utils.showRecommendGamesBanner();
                Utils_1.utils.showLog("\u670D\u52A1\u5668\u914D\u7F6E\u5C55\u793A\u81EA\u5B9A\u4E49banner");
                return;
            }
            Utils_1.utils.showLog("显示banner广告...");
            var argsTmp = args;
            if (argsTmp && argsTmp.width) {
                if (cc.winSize.height / cc.winSize.width < 1) {
                    this._bannerSizePercent = argsTmp.width;
                }
                else {
                    this._bannerSizePercent = ((argsTmp.width <= 0.8) ? 0.8 : argsTmp.width);
                }
                this._bannerSizePercent = ((argsTmp.width > 1) ? 1 : this._bannerSizePercent);
            }
            if (argsTmp && argsTmp.bottom) {
                this._bannerBottom = argsTmp.bottom / this._sysData.pixelRatio;
                this._bannerBottom = ((this._bannerBottom < 0) ? 0 : this._bannerBottom);
                this._bannerBottom = ((this._bannerBottom > this._sysData.screenHeight) ? this._sysData.screenHeight : this._bannerBottom);
            }
            // banner 广告
            if (Utils_1.utils.config.baiduconfig
                && Utils_1.utils.config.baiduconfig.bannerId
                && Utils_1.utils.config.baiduconfig.appSID) {
                var left = (this._sysData.screenWidth - this._sysData.screenWidth * this._bannerSizePercent) / 2;
                var width_1 = this._sysData.screenWidth * this._bannerSizePercent;
                var bannerOpts = {
                    adUnitId: Utils_1.utils.config.baiduconfig.bannerId,
                    appSid: Utils_1.utils.config.baiduconfig.appSID,
                    style: {
                        top: 0,
                        left: left,
                        width: width_1
                    }
                };
                var bannerAd_1 = null;
                var oldBannerAd_1 = this._bannerAd;
                var onLoadFunc_1 = function () {
                    if (bannerAd_1) {
                        bannerAd_1.show().then(function () {
                            _this._bannerAd = bannerAd_1;
                            if (oldBannerAd_1) {
                                oldBannerAd_1.destroy();
                                oldBannerAd_1.offLoad(onLoadFunc_1);
                                oldBannerAd_1.offError(onErrorFunc_1);
                            }
                            Utils_1.utils.showLog("Banner显示成功！");
                        }).catch(function () {
                            Utils_1.utils.showLog("Banner显示出错!");
                        });
                    }
                };
                var onErrorFunc_1 = function (err) {
                    if (err) {
                        Utils_1.utils.showLog("Banner 广告出错 : ", err.errCode, err.errMsg);
                    }
                };
                var onResizeFunc = function (res) {
                    bannerAd_1.style.width = width_1;
                    bannerAd_1.style.top = _this._sysData.screenHeight - res.height - _this._bannerBottom;
                };
                bannerAd_1 = this.swan.createBannerAd(bannerOpts);
                if (bannerAd_1) {
                    bannerAd_1.onLoad(onLoadFunc_1);
                    bannerAd_1.onError(onErrorFunc_1);
                    bannerAd_1.onResize(onResizeFunc);
                    bannerAd_1.style.width = width_1 + 1;
                    if (PlatUtils_1.default.IsIOS) {
                        bannerAd_1.style.top = this._sysData.screenHeight;
                    }
                }
            }
            else {
                cc.warn("百度广告配置文件出错!");
            }
        }
    };
    /**
    * 显示结算广告
    * @param data 参数： closeBtn:
    * statement_type
    * 1:只显示小游戏插屏广告
    * 2:只显示6个互推广告
    * 3:显示插屏广告+6个互推
    */
    AdAgentBaidu.prototype.showStatementAds = function () {
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
    AdAgentBaidu.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsBaidu) {
            if (this._bannerAd) {
                this._bannerAd.hide();
            }
        }
    };
    AdAgentBaidu.prototype.ShowInterstitial = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        console.warn("百度没有插屏");
    };
    AdAgentBaidu.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.IsBaidu) {
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
            }
            else {
                if (this._isVideoLoaded) {
                    this._videoAd.show().then(function () {
                        Utils_1.utils.showLog("视频显示成功!");
                        _this._isVideoLoaded = false;
                    }).catch(function (err) {
                    });
                }
                else {
                    this._videoAd.load().catch(function (err) {
                    });
                }
            }
        }
    };
    AdAgentBaidu.prototype._initVideoAd = function () {
        var _this = this;
        if (!this._videoAd) {
            if (!(Utils_1.utils.config.baiduconfig
                && Utils_1.utils.config.baiduconfig.appSID
                && Utils_1.utils.config.baiduconfig.videoId)) {
                Utils_1.utils.showLog("视频ID配置不正确！");
                if (this._videoCallback) {
                    this._videoCallback(false, "暂无视频广告!");
                    this._videoCallback = null;
                }
                return;
            }
            var videoOpts = {
                adUnitId: Utils_1.utils.config.baiduconfig.videoId,
                appSid: Utils_1.utils.config.baiduconfig.appSID
            };
            Utils_1.utils.showLog("视频广告参数:", JSON.stringify(videoOpts));
            this._videoAd = this.swan.createRewardedVideoAd(videoOpts);
            if (this._videoAd) {
                this._videoAd.onLoad(function () {
                    Utils_1.utils.showLog("视频加载成功");
                    _this._isVideoLoaded = true;
                    if (_this._isVideoShow) {
                        _this._videoAd.show().then(function () {
                            _this._isVideoLoaded = false;
                        }).catch(function () {
                            Utils_1.utils.showLog("视频播放失败！");
                        });
                    }
                });
                this._videoAd.onClose(function (res) {
                    _this._isVideoShow = false;
                    if (res && res.isEnded) {
                        Utils_1.utils.showLog("正常播放结束，可以下发游戏奖励");
                        if (_this._videoCallback) {
                            _this._videoCallback(true, "");
                            _this._videoCallback = null;
                        }
                    }
                    else {
                        Utils_1.utils.showLog("播放中途退出，不下发游戏奖励");
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "观看完视频才能获得奖励!");
                            _this._videoCallback = null;
                        }
                    }
                });
                this._videoAd.onError(function (err) {
                    Utils_1.utils.showLog("激励视频异常!", err.errCode);
                    _this._isVideoLoaded = false;
                    if (_this._videoCallback) {
                        _this._videoCallback(false, "暂无视频广告!");
                        _this._videoCallback = null;
                    }
                });
            }
        }
    };
    AdAgentBaidu = __decorate([
        ccclass
    ], AdAgentBaidu);
    return AdAgentBaidu;
}(AdAgent_1.default));
exports.default = AdAgentBaidu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEJhaWR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyw2Q0FBK0M7QUFDL0MseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBTztJQUFqRDtRQUFBLHFFQTBPQztRQXhPRyxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG9CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLFlBQVk7UUFDWixVQUFJLEdBQVEsTUFBTSxDQUFDLElBQUksQ0FBQztRQVd4Qix3QkFBa0IsR0FBVyxHQUFHLENBQUM7UUFDakMsbUJBQWEsR0FBVyxDQUFDLENBQUM7O0lBbU45QixDQUFDO0lBOU5VLDJCQUFJLEdBQVg7UUFBQSxpQkFRQztRQVBHLElBQUksbUJBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFOUMsYUFBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUMxQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ1g7SUFDTCxDQUFDO0lBSU0saUNBQVUsR0FBakIsVUFBa0IsUUFBOEMsRUFBRSxJQUFnQjtRQUFsRixpQkFzRkM7UUF0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QUNMLENBQUM7SUF6T2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0EwT2hDO0lBQUQsbUJBQUM7Q0ExT0QsQUEwT0MsQ0ExT3lDLGlCQUFPLEdBME9oRDtrQkExT29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRCYWlkdSBleHRlbmRzIEFkQWdlbnQge1xyXG5cclxuICAgIF9zeXNEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgX2JhaWR1VmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIF9yZWNvcmRlcjogYW55ID0gbnVsbDtcclxuICAgIF9iYW5uZXJBZDogYW55ID0gbnVsbDtcclxuICAgIF92aWRlb0FkOiBhbnkgPSBudWxsO1xyXG4gICAgX3ZpZGVvQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIF9pc1ZpZGVvU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2lzVmlkZW9Mb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgc3dhbjogYW55ID0gd2luZG93LnN3YW47XHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3lzRGF0YSA9IHRoaXMuc3dhbi5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFZpZGVvQWQoKTtcclxuICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Jhbm5lclNpemVQZXJjZW50OiBudW1iZXIgPSAwLjE7XHJcbiAgICBfYmFubmVyQm90dG9tOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIFNob3dCYW5uZXIobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSwgYXJnczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTaG93UmVjb21tb25kR2FtZXNCYW5uZXIoKSAmJiB1dGlscy5pc1N1cHBvcnRuYXZpZ2F0ZVRvTWluaUdhbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd1JlY29tbWVuZEdhbWVzQmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmnI3liqHlmajphY3nva7lsZXnpLroh6rlrprkuYliYW5uZXJgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S6YmFubmVy5bm/5ZGKLi4uXCIpO1xyXG4gICAgICAgICAgICBsZXQgYXJnc1RtcCA9IGFyZ3M7XHJcbiAgICAgICAgICAgIGlmIChhcmdzVG1wICYmIGFyZ3NUbXAud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCAvIGNjLndpblNpemUud2lkdGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyU2l6ZVBlcmNlbnQgPSBhcmdzVG1wLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9ICgoYXJnc1RtcC53aWR0aCA8PSAwLjgpID8gMC44IDogYXJnc1RtcC53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9ICgoYXJnc1RtcC53aWR0aCA+IDEpID8gMSA6IHRoaXMuX2Jhbm5lclNpemVQZXJjZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3NUbXAgJiYgYXJnc1RtcC5ib3R0b20pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckJvdHRvbSA9IGFyZ3NUbXAuYm90dG9tIC8gdGhpcy5fc3lzRGF0YS5waXhlbFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQm90dG9tID0gKCh0aGlzLl9iYW5uZXJCb3R0b20gPCAwKSA/IDAgOiB0aGlzLl9iYW5uZXJCb3R0b20pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQm90dG9tID0gKCh0aGlzLl9iYW5uZXJCb3R0b20gPiB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCkgPyB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodCA6IHRoaXMuX2Jhbm5lckJvdHRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGJhbm5lciDlub/lkYpcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5iYWlkdWNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLmJhaWR1Y29uZmlnLmJhbm5lcklkXHJcbiAgICAgICAgICAgICAgICAmJiB1dGlscy5jb25maWcuYmFpZHVjb25maWcuYXBwU0lEKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQ6IG51bWJlciA9ICh0aGlzLl9zeXNEYXRhLnNjcmVlbldpZHRoIC0gdGhpcy5fc3lzRGF0YS5zY3JlZW5XaWR0aCAqIHRoaXMuX2Jhbm5lclNpemVQZXJjZW50KSAvIDI7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuV2lkdGggKiB0aGlzLl9iYW5uZXJTaXplUGVyY2VudDtcclxuICAgICAgICAgICAgICAgIGxldCBiYW5uZXJPcHRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcuYmFpZHVjb25maWcuYmFubmVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwU2lkOiB1dGlscy5jb25maWcuYmFpZHVjb25maWcuYXBwU0lELFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCBiYW5uZXJBZDogYW55ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCBvbGRCYW5uZXJBZDogYW55ID0gdGhpcy5fYmFubmVyQWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uTG9hZEZ1bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gYmFubmVyQWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEJhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkQmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEJhbm5lckFkLm9mZkxvYWQob25Mb2FkRnVuYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkQmFubmVyQWQub2ZmRXJyb3Iob25FcnJvckZ1bmMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJCYW5uZXLmmL7npLrmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJCYW5uZXLmmL7npLrlh7rplJkhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG9uRXJyb3JGdW5jID0gKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIkJhbm5lciDlub/lkYrlh7rplJkgOiBcIiwgZXJyLmVyckNvZGUsIGVyci5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9uUmVzaXplRnVuYyA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5zdHlsZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhbm5lckFkLnN0eWxlLnRvcCA9IHRoaXMuX3N5c0RhdGEuc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodCAtIHRoaXMuX2Jhbm5lckJvdHRvbTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYmFubmVyQWQgPSB0aGlzLnN3YW4uY3JlYXRlQmFubmVyQWQoYmFubmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5vbkxvYWQob25Mb2FkRnVuYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQub25FcnJvcihvbkVycm9yRnVuYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQub25SZXNpemUob25SZXNpemVGdW5jKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQuc3R5bGUud2lkdGggPSB3aWR0aCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZC5zdHlsZS50b3AgPSB0aGlzLl9zeXNEYXRhLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwi55m+5bqm5bm/5ZGK6YWN572u5paH5Lu25Ye66ZSZIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5pi+56S657uT566X5bm/5ZGKXHJcbiAgICAqIEBwYXJhbSBkYXRhIOWPguaVsO+8miBjbG9zZUJ0bjpcclxuICAgICogc3RhdGVtZW50X3R5cGUgXHJcbiAgICAqIDE65Y+q5pi+56S65bCP5ri45oiP5o+S5bGP5bm/5ZGKXHJcbiAgICAqIDI65Y+q5pi+56S6NuS4quS6kuaOqOW5v+WRilxyXG4gICAgKiAzOuaYvuekuuaPkuWxj+W5v+WRiis25Liq5LqS5o6oXHJcbiAgICAqL1xyXG4gICAgc2hvd1N0YXRlbWVudEFkcygpOiBhbnkge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHsgXCJ0eXBlXCI6IDAsIFwibm9kZVwiOiBudWxsIH07XHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXNUeXBlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5bm/5ZGKID4+IOaYvuekuuaPkuWxj+W5v+WRiis25Liq5LqS5o6oXCIpO1xyXG4gICAgICAgIHRoaXMuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIG5vZGUgPSB1dGlscy5zaG93Q3Jvc3NXaWRnZXQ2KCk7XHJcbiAgICAgICAgcmVzVHlwZSA9IDE7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSByZXNUeXBlO1xyXG4gICAgICAgIHJlc3VsdC5ub2RlID0gbm9kZTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Jhbm5lckFkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dJbnRlcnN0aXRpYWwobG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIueZvuW6puayoeacieaPkuWxj1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZGVvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICAvLyDop4bpopHlub/lkYpcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9pc1ZpZGVvU2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRWaWRlb0FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNWaWRlb0xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5pi+56S65oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFZpZGVvQWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgIGlmICghKHV0aWxzLmNvbmZpZy5iYWlkdWNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLmJhaWR1Y29uZmlnLmFwcFNJRFxyXG4gICAgICAgICAgICAgICAgJiYgdXRpbHMuY29uZmlnLmJhaWR1Y29uZmlnLnZpZGVvSWQpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKRSUTphY3nva7kuI3mraPnoa7vvIFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2soZmFsc2UsIFwi5pqC5peg6KeG6aKR5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZpZGVvT3B0cyA9IHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiB1dGlscy5jb25maWcuYmFpZHVjb25maWcudmlkZW9JZCxcclxuICAgICAgICAgICAgICAgIGFwcFNpZDogdXRpbHMuY29uZmlnLmJhaWR1Y29uZmlnLmFwcFNJRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5bm/5ZGK5Y+C5pWwOlwiLCBKU09OLnN0cmluZ2lmeSh2aWRlb09wdHMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQgPSB0aGlzLnN3YW4uY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHZpZGVvT3B0cyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuinhumikeWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1ZpZGVvTG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmlkZW9TaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6KeG6aKR5pKt5pS+5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKHRydWUsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayhmYWxzZSwgXCLop4LnnIvlrozop4bpopHmiY3og73ojrflvpflpZblirEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua/gOWKseinhumikeW8guW4uCFcIiwgZXJyLmVyckNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuaaguaXoOinhumikeW5v+WRiiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==