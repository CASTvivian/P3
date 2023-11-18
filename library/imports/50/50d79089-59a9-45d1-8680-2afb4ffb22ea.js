"use strict";
cc._RF.push(module, '50d79CJWalF0YaAKvtP+yLq', 'AdAgent4399');
// common-plugin/Scripts/AdAgent4399.ts

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
var AdAgent4399 = /** @class */ (function (_super) {
    __extends(AdAgent4399, _super);
    function AdAgent4399() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._videoCallback = null;
        _this._isVideoLoaded = false;
        _this._videoAd = null;
        //@ts-ignore
        _this._4399 = window.h5api;
        _this._canPlayAd = true;
        _this._remain = 0;
        return _this;
    }
    AdAgent4399.prototype.Init = function () {
        this.checkPlayAd();
    };
    /**
     * 获得是否可以播放广告及剩余次数
     */
    AdAgent4399.prototype.checkPlayAd = function () {
        this._canPlayAd = true;
        return;
        // this._4399.canPlayAd((data: any) => {
        // 	if (data.canPlayAd) {
        // 		this._canPlayAd = data.canPlayAd;
        // 	} else {
        // 		this._canPlayAd = false;
        // 	}
        // 	if (data.remain) {
        // 		this._remain = data.remain;
        // 	}
        // 	utils.showLog("是否可播放广告", data.canPlayAd, "剩余次数", data.remain)
        // })
    };
    AdAgent4399.prototype.ShowBanner = function () {
        Utils_1.utils.showLog("4399平台暂无banner广告");
    };
    AdAgent4399.prototype.ShowInterstitial = function () {
        Utils_1.utils.showLog("4399平台暂时无插屏广告");
    };
    /**
    * 播放全屏广告
    * @param callback   播放广告时的广告状态回调函数
    */
    AdAgent4399.prototype.ShowVideo = function (callback) {
        var _this = this;
        if (PlatUtils_1.default.Is4399) {
            this._videoCallback = callback;
            if (this._canPlayAd) {
                this._4399.playAd(function (obj) {
                    Utils_1.utils.showLog('代码:' + obj.code + ',消息:' + obj.message);
                    if (obj.code === 10000) {
                        Utils_1.utils.showLog('视频开始播放');
                    }
                    else if (obj.code === 10001) {
                        Utils_1.utils.showLog('视频播放结束');
                        if (_this._videoCallback) {
                            _this._videoCallback(true, "");
                            _this._videoCallback = null;
                        }
                        _this.checkPlayAd();
                    }
                    else {
                        if (_this._videoCallback) {
                            _this._videoCallback(false, "激励视频异常!");
                            _this._videoCallback = null;
                        }
                        _this.checkPlayAd();
                        Utils_1.utils.showLog('视频广告异常');
                    }
                });
            }
            else {
                Utils_1.utils.showLog('4399获取到不能播放广告! #this._canPlayAd=', this._canPlayAd, "剩余次数", this._remain);
                if (this._videoCallback) {
                    this._videoCallback(false, "今日次数用完，明天再来!");
                    this._videoCallback = null;
                }
                this.checkPlayAd();
            }
        }
    };
    AdAgent4399 = __decorate([
        ccclass
    ], AdAgent4399);
    return AdAgent4399;
}(AdAgent_1.default));
exports.default = AdAgent4399;

cc._RF.pop();