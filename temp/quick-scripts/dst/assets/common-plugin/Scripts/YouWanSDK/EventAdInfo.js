
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YouWanSDK/EventAdInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWW91V2FuU0RLXFxFdmVudEFkSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1Qzs7R0FFRztBQUNILElBQVksUUFZWDtBQVpELFdBQVksUUFBUTtJQUNoQiwyQ0FBVSxDQUFBO0lBQ1YseURBQWlCLENBQUE7SUFDakIsdURBQWdCLENBQUE7SUFDaEIsMkNBQVUsQ0FBQTtJQUNWLHlEQUFpQixDQUFBO0lBQ2pCLHVFQUF3QixDQUFBO0lBQ3hCLHFEQUFlLENBQUE7SUFDZixxRUFBdUIsQ0FBQTtJQUN2QiwyQ0FBVSxDQUFBO0lBQ1YsNEVBQTJCLENBQUE7SUFDM0Isc0ZBQWdDLENBQUE7QUFDcEMsQ0FBQyxFQVpXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBWW5CO0FBQUEsQ0FBQztBQUdGLElBQVksVUFZWDtBQVpELFdBQVksVUFBVTtJQUNsQixpREFBVyxDQUFBO0lBQ1gsaUVBQW1CLENBQUE7SUFDbkIsMkRBQWdCLENBQUE7SUFDaEIsMkRBQWdCLENBQUE7SUFDaEIscURBQWEsQ0FBQTtJQUNiLDZDQUFTLENBQUE7SUFDVCwrREFBa0IsQ0FBQTtJQUNsQix5REFBZSxDQUFBO0lBQ2YsOERBQWtCLENBQUE7SUFDbEIsOEVBQTBCLENBQUE7SUFDMUIsd0VBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQVpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBWXJCO0FBQ0Q7SUFPSSwwQkFBWSxJQUFZLEVBQUUsSUFBYSxFQUFFLEdBQVksRUFBRSxHQUFZO1FBQy9ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVNLHFDQUFVLEdBQWpCO1FBQ0ksSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDekI7UUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBNUJZLDRDQUFnQjtBQStCN0I7SUFNSSxxQkFBWSxNQUFnQixFQUFFLFFBQW9CLEVBQUUsZ0JBQW1DO1FBQ25GLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUVNLGdDQUFVLEdBQWpCO1FBQ0ksSUFBSTtZQUNBLElBQUksSUFBSSxHQUFRLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtnQkFDL0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO29CQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7aUJBQzNDO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUE5QmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FrQy9CO0lBQUQsa0JBQUM7Q0FsQ0QsQUFrQ0MsSUFBQTtrQkFsQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cblxuXG4vKipcbiAqIOW5v+WRiuexu+Wei1xuICovXG5leHBvcnQgZW51bSBZd0FkVHlwZSB7XG4gICAgQkFOTkVSID0gMSxcbiAgICBJTlRFUlNJVElUSUFMID0gMixcbiAgICBSRVdBUkRfVklERU8gPSAzLFxuICAgIFNQTEFTSCA9IDQsXG4gICAgTkFUSVZFX0JBTk5FUiA9IDUsXG4gICAgTkFUSVZFX0lOVEVSU0lUSVRJQUwgPSA2LFxuICAgIE5BVElWRV9JQ09OID0gNyxcbiAgICBJTlRFUlNJVElUSUFMX1ZJREVPID0gOCxcbiAgICBOQVRJVkUgPSA5LFxuICAgIE5BVElWRV9URU1QTEFURV9CQU5ORVIgPSAxMCxcbiAgICBOQVRJVkVfVEVNUExBVEVfSU5URVJTSVRJQUwgPSAxMSxcbn07XG5cblxuZXhwb3J0IGVudW0gWXdBZFN0YXR1cyB7XG4gICAgUkVRVUVTVCA9IDAsXG4gICAgUkVRVUVTVF9TVUNDRVNTID0gMSxcbiAgICBSRVFVRVNUX0ZBSUwgPSAyLFxuICAgIFNIT1dfU1VDQ0VTUyA9IDMsXG4gICAgU0hPV19GQUlMID0gNCxcbiAgICBDTElDSyA9IDUsXG4gICAgUkVXQVJEX1NVQ0NFU1MgPSA2LFxuICAgIFJFV0FSRF9GQUlMID0gNyxcbiAgICBBRF9JRF9SRVFVRVNUID0gMTAsXG4gICAgQURfSURfUkVRVUVTVF9TVUNDRVNTID0gMTEsXG4gICAgQURfSURfUkVRVUVTVF9GQUlMID0gMTJcbn1cbmV4cG9ydCBjbGFzcyBBZEV2ZW50UGFyYW1ldGVyIHtcblxuICAgIHB1YmxpYyBjb2RlOiBudW1iZXI7IC8v54q25oCB56CBXG4gICAgcHVibGljIG1zZzogc3RyaW5nOyAvL+eKtuaAgeS/oeaBr1xuICAgIHB1YmxpYyB0YWc6IHN0cmluZzsgLy/moIfnrb5cbiAgICBwdWJsaWMgYWRJZDogc3RyaW5nOyAvL+W5v+WRimlkXG5cbiAgICBjb25zdHJ1Y3RvcihhZElkOiBzdHJpbmcsIGNvZGU/OiBudW1iZXIsIG1zZz86IHN0cmluZywgdGFnPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRJZCA9IGFkSWQ7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgICAgIHRoaXMubXNnID0gbXNnO1xuICAgICAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Kc29uRGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xuICAgICAgICBkYXRhLmFkSWQgPSB0aGlzLmFkSWQ7XG4gICAgICAgIGlmICh0aGlzLmNvZGUpIHtcbiAgICAgICAgICAgIGRhdGEuY29kZSA9IHRoaXMuY29kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tc2cpIHtcbiAgICAgICAgICAgIGRhdGEubXNnID0gdGhpcy5tc2c7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGFnKSB7XG4gICAgICAgICAgICBkYXRhLnRhZyA9IHRoaXMudGFnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50QWRJbmZvIHtcbiAgICBwcml2YXRlIGFkVHlwZTogWXdBZFR5cGU7XG4gICAgcHJpdmF0ZSBhZFN0YXR1czogWXdBZFN0YXR1cztcbiAgICBwcml2YXRlIGFkRXZlbnRQYXJhbWV0ZXI6IEFkRXZlbnRQYXJhbWV0ZXI7XG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihhZFR5cGU6IFl3QWRUeXBlLCBhZFN0YXR1czogWXdBZFN0YXR1cywgYWRFdmVudFBhcmFtZXRlcj86IEFkRXZlbnRQYXJhbWV0ZXIpIHtcbiAgICAgICAgdGhpcy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuYWRUeXBlID0gYWRUeXBlO1xuICAgICAgICB0aGlzLmFkU3RhdHVzID0gYWRTdGF0dXM7XG4gICAgICAgIHRoaXMuYWRFdmVudFBhcmFtZXRlciA9IGFkRXZlbnRQYXJhbWV0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSnNvbkRhdGEoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XG4gICAgICAgICAgICBkYXRhLmFkX3R5cGUgPSB0aGlzLmFkVHlwZTtcbiAgICAgICAgICAgIGRhdGEuYWRfc3RhdHVzID0gdGhpcy5hZFN0YXR1cztcbiAgICAgICAgICAgIGlmICh0aGlzLmFkRXZlbnRQYXJhbWV0ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkRXZlbnRQYXJhbWV0ZXIuYWRJZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmFkX2lkID0gdGhpcy5hZEV2ZW50UGFyYW1ldGVyLmFkSWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGEuYWRfaW5mbyA9IHRoaXMuYWRFdmVudFBhcmFtZXRlci50b0pzb25EYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLnRpbWUgPSB0aGlzLnRpbWU7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFdmVudEFkSW5mbyB0b0pzb25EYXRhIGVycm8gbXNnID1cIiArIGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgPWR0IHt9XG59XG4iXX0=