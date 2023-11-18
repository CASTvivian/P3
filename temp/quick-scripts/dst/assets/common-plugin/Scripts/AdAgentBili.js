
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentBili.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ecaa7MzB4FNUoaCpwLpxt+Y', 'AdAgentBili');
// common-plugin/Scripts/AdAgentBili.ts

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
 * bili广告组件
 */
var AdAgentBili = /** @class */ (function (_super) {
    __extends(AdAgentBili, _super);
    function AdAgentBili() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        _this._bannerAd = null;
        //@ts-ignore
        _this.bl = window.bl;
        _this._curBannerAd = null;
        _this._bannerSizePercent = 0.1;
        _this._bannerBottom = 0;
        return _this;
    }
    AdAgentBili.prototype.Init = function () {
    };
    AdAgentBili.prototype.ShowBanner = function (location, args) {
        if (args === void 0) { args = null; }
        var argsTmp = args;
        if (argsTmp && argsTmp.width) {
            this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
            this._bannerSizePercent = argsTmp.width > 1 ? 1 : argsTmp.width;
        }
        if (argsTmp && argsTmp.bottom) {
            this._bannerBottom = argsTmp.bottom < 0 ? 0 : argsTmp.bottom;
            this._bannerBottom = argsTmp.bottom > cc.winSize.height ? cc.winSize.height : argsTmp.bottom;
        }
        // let bannerId: string = utils.config.biliConfig.bannerId;
        // utils.showLog("显示Banner广告: bannerId=" + bannerId);
        console.log("显示Banner广告");
        var params = {
            left: 0,
            width: 300,
            top: 0
        };
        //@ts-ignore
        var curBannerAd = bl.createBannerAd(params);
        if (curBannerAd) {
            curBannerAd.onError(function (err) {
                Utils_1.utils.showLog("广告条加载失败! ", JSON.stringify(err));
                if (curBannerAd) {
                    curBannerAd.destroy();
                }
            });
            var self_1 = this;
            curBannerAd.onLoad(function () {
                curBannerAd.show().then(function () {
                    if (self_1._curBannerAd) {
                        self_1._curBannerAd.destroy();
                    }
                    self_1._curBannerAd = curBannerAd;
                    Utils_1.utils.showLog("Banner广告显示成功!");
                }).catch(function (err) {
                    Utils_1.utils.showLog("Banner广告出错", JSON.stringify(err));
                    if (curBannerAd) {
                        curBannerAd.destroy();
                    }
                });
            });
            curBannerAd.onResize(function (res) {
                curBannerAd.style.width = Utils_1.utils.Tool_Bili.SysInfo.screenWidth * self_1._bannerSizePercent;
                curBannerAd.style.left = (Utils_1.utils.Tool_Bili.SysInfo.screenWidth - res.width) * 0.5;
                if (self_1._bannerBottom == cc.winSize.height) {
                    curBannerAd.style.top = 0;
                }
                else {
                    curBannerAd.style.top = Utils_1.utils.Tool_Bili.SysInfo.screenHeight - res.height - self_1._bannerBottom;
                }
            });
        }
        else {
            Utils_1.utils.showLog("广告条创建失败!");
        }
    };
    AdAgentBili.prototype.ShowInterstitial = function () {
        Utils_1.utils.showLog("哔哩平台暂时无插屏广告");
    };
    AdAgentBili.prototype.HideBanner = function (location) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (PlatUtils_1.default.IsBili) {
            if (this._bannerAd) {
                this._bannerAd.hide();
            }
        }
    };
    AdAgentBili.prototype.ShowVideo = function (callback) {
        if (PlatUtils_1.default.IsBili) {
            this._videoCallback = callback;
            var self_2 = this;
            this.showRewardedVideoAd({
                onSuccess: function (res) {
                    // 广告成功展示
                    Utils_1.utils.showLog("bili视频展示成功！");
                },
                onFail: function (e) {
                    // 广告失败了
                    Utils_1.utils.showLog("bili视频广告展示失败！");
                    Utils_1.utils.Tool_Bili.share(function (res, msg) {
                        if (res) {
                            self_2._videoCallback && self_2._videoCallback(true, "");
                            self_2._videoCallback = null;
                        }
                        else {
                            self_2._videoCallback && self_2._videoCallback(false, "分享成功才可以获取奖励哦!");
                            self_2._videoCallback = null;
                        }
                    });
                },
                onClose: function (e) {
                    // 用户关闭了广告
                    if (e.isEnded) {
                        // 用户看完了
                        Utils_1.utils.showLog("bili视频广告观看完毕，发送奖励");
                        self_2._videoCallback && self_2._videoCallback(true, "");
                    }
                    else {
                        // 用户没看完
                        self_2._videoCallback && self_2._videoCallback(false, "观看完视频才能获得奖励!");
                        self_2._videoCallback = null;
                    }
                }
            });
        }
    };
    AdAgentBili.prototype.showRewardedVideoAd = function (_a) {
        var onSuccess = _a.onSuccess, onFail = _a.onFail, onClose = _a.onClose;
        // 创建激励视频对象实例:
        var ad = this.bl.createRewardedVideoAd();
        function adLoadHandler(e) {
            // !!!!!!
            // 重要！此处必须先 off 本次事件回调。
            // !!!!!!
            ad.offLoad(adLoadHandler);
            // 加载成功
            ad.show()
                .catch(function (e) {
                // 激励视频展示失败
                if (typeof onFail === 'function') {
                    onFail(e);
                }
                return Promise.reject(e);
            })
                .then(function (res) {
                // 成功展示激励视频
                if (typeof onSuccess === 'function') {
                    onSuccess(res);
                }
            });
        }
        function adErrorHandler(e) {
            // 激励广告出错
            if (typeof onFail === 'function') {
                onFail(e);
            }
            ad.offLoad(adLoadHandler);
            ad.offClose(adCloseHandler);
            ad.offError(adErrorHandler);
            ad.destroy();
        }
        function adCloseHandler(e) {
            // 用户点击“关闭广告”
            if (typeof onClose === 'function') {
                onClose(e);
            }
            ad.offLoad(adLoadHandler);
            ad.offClose(adCloseHandler);
            ad.offError(adErrorHandler);
            ad.destroy();
        }
        // 监听加载成功事件
        ad.offLoad(adLoadHandler);
        ad.onLoad(adLoadHandler);
        // 监听错误事件
        ad.offError(adErrorHandler);
        ad.onError(adErrorHandler);
        // 监听用户关闭事件
        ad.offClose(adCloseHandler);
        ad.onClose(adCloseHandler);
        // 加载
        ad.load();
        return ad;
    };
    AdAgentBili = __decorate([
        ccclass
    ], AdAgentBili);
    return AdAgentBili;
}(AdAgent_1.default));
exports.default = AdAgentBili;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEJpbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDZDQUErQztBQUMvQyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBRUg7SUFBeUMsK0JBQU87SUFBaEQ7UUFBQSxxRUF5TUM7UUF0TUEsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFFaEMsY0FBUSxHQUFRLElBQUksQ0FBQztRQUNyQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQVk7UUFDWixRQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUtmLGtCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLHdCQUFrQixHQUFXLEdBQUcsQ0FBQztRQUNqQyxtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUF5TDNCLENBQUM7SUE5TE8sMEJBQUksR0FBWDtJQUVBLENBQUM7SUFJTSxnQ0FBVSxHQUFqQixVQUFrQixRQUF3QixFQUFFLElBQWdCO1FBQWhCLHFCQUFBLEVBQUEsV0FBZ0I7UUFFM0QsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDO1FBRXhCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDaEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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QUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzQixLQUFLO1FBQ0wsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVYsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBdE1tQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeU0vQjtJQUFELGtCQUFDO0NBek1ELEFBeU1DLENBek13QyxpQkFBTyxHQXlNL0M7a0JBek1vQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogYmlsaeW5v+WRiue7hOS7tlxyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRBZ2VudEJpbGkgZXh0ZW5kcyBBZEFnZW50IHtcclxuXHJcblxyXG5cdF92aWRlb0NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblx0X2lzVmlkZW9Mb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0X3ZpZGVvQWQ6IGFueSA9IG51bGw7XHJcblx0X2Jhbm5lckFkOiBhbnkgPSBudWxsO1xyXG5cdC8vQHRzLWlnbm9yZVxyXG5cdGJsID0gd2luZG93LmJsO1xyXG5cclxuXHRwdWJsaWMgSW5pdCgpIHtcclxuXHJcblx0fVxyXG5cdF9jdXJCYW5uZXJBZDogYW55ID0gbnVsbDtcclxuXHRfYmFubmVyU2l6ZVBlcmNlbnQ6IG51bWJlciA9IDAuMTtcclxuXHRfYmFubmVyQm90dG9tOiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiwgYXJnczogYW55ID0gbnVsbCkge1xyXG5cclxuXHRcdGxldCBhcmdzVG1wOiBhbnkgPSBhcmdzO1xyXG5cclxuXHRcdGlmIChhcmdzVG1wICYmIGFyZ3NUbXAud2lkdGgpIHtcclxuXHRcdFx0dGhpcy5fYmFubmVyU2l6ZVBlcmNlbnQgPSBhcmdzVG1wLndpZHRoIDwgMCA/IDAgOiBhcmdzVG1wLndpZHRoO1xyXG5cdFx0XHR0aGlzLl9iYW5uZXJTaXplUGVyY2VudCA9IGFyZ3NUbXAud2lkdGggPiAxID8gMSA6IGFyZ3NUbXAud2lkdGg7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZ3NUbXAgJiYgYXJnc1RtcC5ib3R0b20pIHtcclxuXHRcdFx0dGhpcy5fYmFubmVyQm90dG9tID0gYXJnc1RtcC5ib3R0b20gPCAwID8gMCA6IGFyZ3NUbXAuYm90dG9tO1xyXG5cdFx0XHR0aGlzLl9iYW5uZXJCb3R0b20gPSBhcmdzVG1wLmJvdHRvbSA+IGNjLndpblNpemUuaGVpZ2h0ID8gY2Mud2luU2l6ZS5oZWlnaHQgOiBhcmdzVG1wLmJvdHRvbTtcclxuXHRcdH1cclxuXHRcdC8vIGxldCBiYW5uZXJJZDogc3RyaW5nID0gdXRpbHMuY29uZmlnLmJpbGlDb25maWcuYmFubmVySWQ7XHJcblx0XHQvLyB1dGlscy5zaG93TG9nKFwi5pi+56S6QmFubmVy5bm/5ZGKOiBiYW5uZXJJZD1cIiArIGJhbm5lcklkKTtcclxuXHRcdGNvbnNvbGUubG9nKFwi5pi+56S6QmFubmVy5bm/5ZGKXCIpO1xyXG5cdFx0bGV0IHBhcmFtcyA9IHtcclxuXHRcdFx0bGVmdDogMCxcclxuXHRcdFx0d2lkdGg6IDMwMCxcclxuXHRcdFx0dG9wOiAwXHJcblx0XHR9O1xyXG5cdFx0Ly9AdHMtaWdub3JlXHJcblx0XHRsZXQgY3VyQmFubmVyQWQgPSBibC5jcmVhdGVCYW5uZXJBZChwYXJhbXMpO1xyXG5cdFx0aWYgKGN1ckJhbm5lckFkKSB7XHJcblx0XHRcdGN1ckJhbm5lckFkLm9uRXJyb3IoKGVycikgPT4ge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coXCLlub/lkYrmnaHliqDovb3lpLHotKUhIFwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuXHRcdFx0XHRpZiAoY3VyQmFubmVyQWQpIHtcclxuXHRcdFx0XHRcdGN1ckJhbm5lckFkLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRjdXJCYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG5cdFx0XHRcdGN1ckJhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRcdGlmIChzZWxmLl9jdXJCYW5uZXJBZCkge1xyXG5cdFx0XHRcdFx0XHRzZWxmLl9jdXJCYW5uZXJBZC5kZXN0cm95KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzZWxmLl9jdXJCYW5uZXJBZCA9IGN1ckJhbm5lckFkO1xyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcIkJhbm5lcuW5v+WRiuaYvuekuuaIkOWKnyFcIik7XHJcblxyXG5cdFx0XHRcdH0pLmNhdGNoKChlcnIpID0+IHtcclxuXHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCJCYW5uZXLlub/lkYrlh7rplJlcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcblx0XHRcdFx0XHRpZiAoY3VyQmFubmVyQWQpIHtcclxuXHRcdFx0XHRcdFx0Y3VyQmFubmVyQWQuZGVzdHJveSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGN1ckJhbm5lckFkLm9uUmVzaXplKChyZXMpID0+IHtcclxuXHRcdFx0XHRjdXJCYW5uZXJBZC5zdHlsZS53aWR0aCA9IHV0aWxzLlRvb2xfQmlsaS5TeXNJbmZvLnNjcmVlbldpZHRoICogc2VsZi5fYmFubmVyU2l6ZVBlcmNlbnQ7XHJcblx0XHRcdFx0Y3VyQmFubmVyQWQuc3R5bGUubGVmdCA9ICh1dGlscy5Ub29sX0JpbGkuU3lzSW5mby5zY3JlZW5XaWR0aCAtIHJlcy53aWR0aCkgKiAwLjU7XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLl9iYW5uZXJCb3R0b20gPT0gY2Mud2luU2l6ZS5oZWlnaHQpIHtcclxuXHRcdFx0XHRcdGN1ckJhbm5lckFkLnN0eWxlLnRvcCA9IDA7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGN1ckJhbm5lckFkLnN0eWxlLnRvcCA9IHV0aWxzLlRvb2xfQmlsaS5TeXNJbmZvLnNjcmVlbkhlaWdodCAtIHJlcy5oZWlnaHQgLSBzZWxmLl9iYW5uZXJCb3R0b207XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHV0aWxzLnNob3dMb2coXCLlub/lkYrmnaHliJvlu7rlpLHotKUhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIFNob3dJbnRlcnN0aXRpYWwoKSB7XHJcblx0XHR1dGlscy5zaG93TG9nKFwi5ZOU5ZOp5bmz5Y+w5pqC5pe25peg5o+S5bGP5bm/5ZGKXCIpO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUpIHtcclxuXHRcdGlmIChQbGF0VXRpbHMuSXNCaWxpKSB7XHJcblx0XHRcdGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG5cdFx0XHRcdHRoaXMuX2Jhbm5lckFkLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBTaG93VmlkZW8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRpZiAoUGxhdFV0aWxzLklzQmlsaSkge1xyXG5cdFx0XHR0aGlzLl92aWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdFx0dGhpcy5zaG93UmV3YXJkZWRWaWRlb0FkKHtcclxuXHRcdFx0XHRvblN1Y2Nlc3MocmVzKSB7XHJcblx0XHRcdFx0XHQvLyDlub/lkYrmiJDlip/lsZXnpLpcclxuXHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCJiaWxp6KeG6aKR5bGV56S65oiQ5Yqf77yBXCIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0b25GYWlsKGUpIHtcclxuXHRcdFx0XHRcdC8vIOW5v+WRiuWksei0peS6hlxyXG5cdFx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcImJpbGnop4bpopHlub/lkYrlsZXnpLrlpLHotKXvvIFcIik7XHJcblx0XHRcdFx0XHR1dGlscy5Ub29sX0JpbGkuc2hhcmUoKHJlcywgbXNnKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChyZXMpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrICYmIHNlbGYuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayAmJiBzZWxmLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuWIhuS6q+aIkOWKn+aJjeWPr+S7peiOt+WPluWlluWKseWTpiFcIik7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayA9IG51bGw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0b25DbG9zZShlKSB7XHJcblx0XHRcdFx0XHQvLyDnlKjmiLflhbPpl63kuoblub/lkYpcclxuXHRcdFx0XHRcdGlmIChlLmlzRW5kZWQpIHtcclxuXHRcdFx0XHRcdFx0Ly8g55So5oi355yL5a6M5LqGXHJcblx0XHRcdFx0XHRcdHV0aWxzLnNob3dMb2coXCJiaWxp6KeG6aKR5bm/5ZGK6KeC55yL5a6M5q+V77yM5Y+R6YCB5aWW5YqxXCIpO1xyXG5cdFx0XHRcdFx0XHRzZWxmLl92aWRlb0NhbGxiYWNrICYmIHNlbGYuX3ZpZGVvQ2FsbGJhY2sodHJ1ZSwgXCJcIik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyDnlKjmiLfmsqHnnIvlroxcclxuXHRcdFx0XHRcdFx0c2VsZi5fdmlkZW9DYWxsYmFjayAmJiBzZWxmLl92aWRlb0NhbGxiYWNrKGZhbHNlLCBcIuingueci+WujOinhumikeaJjeiDveiOt+W+l+WlluWKsSFcIik7XHJcblx0XHRcdFx0XHRcdHNlbGYuX3ZpZGVvQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0cHJpdmF0ZSBzaG93UmV3YXJkZWRWaWRlb0FkKHsgb25TdWNjZXNzLCBvbkZhaWwsIG9uQ2xvc2UgfSkge1xyXG5cdFx0Ly8g5Yib5bu65r+A5Yqx6KeG6aKR5a+56LGh5a6e5L6LOlxyXG5cdFx0Y29uc3QgYWQgPSB0aGlzLmJsLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCgpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGFkTG9hZEhhbmRsZXIoZSkge1xyXG5cdFx0XHQvLyAhISEhISFcclxuXHRcdFx0Ly8g6YeN6KaB77yB5q2k5aSE5b+F6aG75YWIIG9mZiDmnKzmrKHkuovku7blm57osIPjgIJcclxuXHRcdFx0Ly8gISEhISEhXHJcblx0XHRcdGFkLm9mZkxvYWQoYWRMb2FkSGFuZGxlcik7XHJcblxyXG5cdFx0XHQvLyDliqDovb3miJDlip9cclxuXHRcdFx0YWQuc2hvdygpXHJcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XHJcblx0XHRcdFx0XHQvLyDmv4DlirHop4bpopHlsZXnpLrlpLHotKVcclxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygb25GYWlsID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdG9uRmFpbChlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHRcdC8vIOaIkOWKn+Wxleekuua/gOWKseinhumikVxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBvblN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0b25TdWNjZXNzKHJlcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBhZEVycm9ySGFuZGxlcihlKSB7XHJcblx0XHRcdC8vIOa/gOWKseW5v+WRiuWHuumUmVxyXG5cdFx0XHRpZiAodHlwZW9mIG9uRmFpbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdG9uRmFpbChlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRhZC5vZmZMb2FkKGFkTG9hZEhhbmRsZXIpO1xyXG5cdFx0XHRhZC5vZmZDbG9zZShhZENsb3NlSGFuZGxlcik7XHJcblx0XHRcdGFkLm9mZkVycm9yKGFkRXJyb3JIYW5kbGVyKTtcclxuXHRcdFx0YWQuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGFkQ2xvc2VIYW5kbGVyKGUpIHtcclxuXHRcdFx0Ly8g55So5oi354K55Ye74oCc5YWz6Zet5bm/5ZGK4oCdXHJcblx0XHRcdGlmICh0eXBlb2Ygb25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdG9uQ2xvc2UoZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0YWQub2ZmTG9hZChhZExvYWRIYW5kbGVyKTtcclxuXHRcdFx0YWQub2ZmQ2xvc2UoYWRDbG9zZUhhbmRsZXIpO1xyXG5cdFx0XHRhZC5vZmZFcnJvcihhZEVycm9ySGFuZGxlcik7XHJcblx0XHRcdGFkLmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDnm5HlkKzliqDovb3miJDlip/kuovku7ZcclxuXHRcdGFkLm9mZkxvYWQoYWRMb2FkSGFuZGxlcik7XHJcblx0XHRhZC5vbkxvYWQoYWRMb2FkSGFuZGxlcik7XHJcblxyXG5cdFx0Ly8g55uR5ZCs6ZSZ6K+v5LqL5Lu2XHJcblx0XHRhZC5vZmZFcnJvcihhZEVycm9ySGFuZGxlcik7XHJcblx0XHRhZC5vbkVycm9yKGFkRXJyb3JIYW5kbGVyKTtcclxuXHJcblx0XHQvLyDnm5HlkKznlKjmiLflhbPpl63kuovku7ZcclxuXHRcdGFkLm9mZkNsb3NlKGFkQ2xvc2VIYW5kbGVyKTtcclxuXHRcdGFkLm9uQ2xvc2UoYWRDbG9zZUhhbmRsZXIpO1xyXG5cclxuXHRcdC8vIOWKoOi9vVxyXG5cdFx0YWQubG9hZCgpO1xyXG5cclxuXHRcdHJldHVybiBhZDtcclxuXHR9XHJcblxyXG5cclxufVxyXG4iXX0=