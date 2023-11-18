"use strict";
cc._RF.push(module, '4488ausP1RLk6Ca9NdEBVaO', 'EventAdInfo');
// common-plugin/Scripts/YouWanSDK/EventAdInfo.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdEventParameter = exports.YwAdStatus = exports.YwAdType = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 广告类型
 */
var YwAdType;
(function (YwAdType) {
    YwAdType[YwAdType["BANNER"] = 1] = "BANNER";
    YwAdType[YwAdType["INTERSITITIAL"] = 2] = "INTERSITITIAL";
    YwAdType[YwAdType["REWARD_VIDEO"] = 3] = "REWARD_VIDEO";
    YwAdType[YwAdType["SPLASH"] = 4] = "SPLASH";
    YwAdType[YwAdType["NATIVE_BANNER"] = 5] = "NATIVE_BANNER";
    YwAdType[YwAdType["NATIVE_INTERSITITIAL"] = 6] = "NATIVE_INTERSITITIAL";
    YwAdType[YwAdType["NATIVE_ICON"] = 7] = "NATIVE_ICON";
    YwAdType[YwAdType["INTERSITITIAL_VIDEO"] = 8] = "INTERSITITIAL_VIDEO";
    YwAdType[YwAdType["NATIVE"] = 9] = "NATIVE";
    YwAdType[YwAdType["NATIVE_TEMPLATE_BANNER"] = 10] = "NATIVE_TEMPLATE_BANNER";
    YwAdType[YwAdType["NATIVE_TEMPLATE_INTERSITIAL"] = 11] = "NATIVE_TEMPLATE_INTERSITIAL";
})(YwAdType = exports.YwAdType || (exports.YwAdType = {}));
;
var YwAdStatus;
(function (YwAdStatus) {
    YwAdStatus[YwAdStatus["REQUEST"] = 0] = "REQUEST";
    YwAdStatus[YwAdStatus["REQUEST_SUCCESS"] = 1] = "REQUEST_SUCCESS";
    YwAdStatus[YwAdStatus["REQUEST_FAIL"] = 2] = "REQUEST_FAIL";
    YwAdStatus[YwAdStatus["SHOW_SUCCESS"] = 3] = "SHOW_SUCCESS";
    YwAdStatus[YwAdStatus["SHOW_FAIL"] = 4] = "SHOW_FAIL";
    YwAdStatus[YwAdStatus["CLICK"] = 5] = "CLICK";
    YwAdStatus[YwAdStatus["REWARD_SUCCESS"] = 6] = "REWARD_SUCCESS";
    YwAdStatus[YwAdStatus["REWARD_FAIL"] = 7] = "REWARD_FAIL";
    YwAdStatus[YwAdStatus["AD_ID_REQUEST"] = 10] = "AD_ID_REQUEST";
    YwAdStatus[YwAdStatus["AD_ID_REQUEST_SUCCESS"] = 11] = "AD_ID_REQUEST_SUCCESS";
    YwAdStatus[YwAdStatus["AD_ID_REQUEST_FAIL"] = 12] = "AD_ID_REQUEST_FAIL";
})(YwAdStatus = exports.YwAdStatus || (exports.YwAdStatus = {}));
var AdEventParameter = /** @class */ (function () {
    function AdEventParameter(adId, code, msg, tag) {
        this.adId = adId;
        this.code = code;
        this.msg = msg;
        this.tag = tag;
    }
    AdEventParameter.prototype.toJsonData = function () {
        var data = {};
        data.adId = this.adId;
        if (this.code) {
            data.code = this.code;
        }
        if (this.msg) {
            data.msg = this.msg;
        }
        if (this.tag) {
            data.tag = this.tag;
        }
        return data;
    };
    return AdEventParameter;
}());
exports.AdEventParameter = AdEventParameter;
var EventAdInfo = /** @class */ (function () {
    function EventAdInfo(adType, adStatus, adEventParameter) {
        this.time = new Date().getTime();
        this.adType = adType;
        this.adStatus = adStatus;
        this.adEventParameter = adEventParameter;
    }
    EventAdInfo.prototype.toJsonData = function () {
        try {
            var data = {};
            data.ad_type = this.adType;
            data.ad_status = this.adStatus;
            if (this.adEventParameter != null) {
                if (this.adEventParameter.adId) {
                    data.ad_id = this.adEventParameter.adId;
                }
                data.ad_info = this.adEventParameter.toJsonData();
            }
            data.time = this.time;
            return data;
        }
        catch (ex) {
            console.error("EventAdInfo toJsonData erro msg =" + ex);
        }
        return {};
    };
    EventAdInfo = __decorate([
        ccclass
    ], EventAdInfo);
    return EventAdInfo;
}());
exports.default = EventAdInfo;

cc._RF.pop();