
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YouWanSDK/YouWanAnalytics.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf318034rlIIL7zgdSzzaJ/', 'YouWanAnalytics');
// common-plugin/Scripts/YouWanSDK/YouWanAnalytics.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("../PlatUtils");
var Utils_1 = require("../Utils");
var YZ_Constant_1 = require("../YZ_Constant");
var YZ_LocalStorage_1 = require("../YZ_LocalStorage");
var EventAdInfo_1 = require("./EventAdInfo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YouWanAnalytics = /** @class */ (function () {
    function YouWanAnalytics() {
    }
    Object.defineProperty(YouWanAnalytics, "_yw_uid", {
        // private static LOGIN_URL: string = "http://192.168.31.108:8080/as/login";
        // private static EVENT_AD_URL: string = "http://192.168.31.108:8080/ae/ad";
        get: function () {
            return parseInt(YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_YOUWAN_UID, "-1"));
        },
        enumerable: false,
        configurable: true
    });
    YouWanAnalytics.login = function (callBackFunc) {
        var _this = this;
        if (!Utils_1.utils.config.otherconfig.yw_app_id) {
            this.showLog("yw_app_id 未配置，不进行上报！");
            return;
        }
        var data = {};
        this.getDeviceInfo(data);
        this.getStaticParame(data);
        this.connect(this.LOGIN_URL, data, function (res, data) {
            if (res) {
                _this.showLog("登录成功! >>result:" + JSON.stringify(data) + " #uid=" + data.uid);
                YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_YOUWAN_UID, data.uid);
            }
            else {
                _this.showLog("登录失败!");
            }
            callBackFunc && callBackFunc(res, data);
        });
    };
    YouWanAnalytics.EventAd = function (adType, adStatus) {
        var _this = this;
        if (!Utils_1.utils.config.otherconfig.yw_app_id) {
            this.showLog("yw_app_id 未配置，不进行上报！");
            return;
        }
        if (!PlatUtils_1.default.IsOPPO)
            return;
        var adInfo = new EventAdInfo_1.default(adType, adStatus);
        var data = {};
        this.getStaticParame(data);
        data.ad_data = [];
        data.ad_data[0] = adInfo.toJsonData();
        this.connect(this.EVENT_AD_URL, data, function (res) {
            if (res) {
                _this.showLog("\u4E0A\u62A5\u5E7F\u544A\u4E8B\u4EF6\u6210\u529F:" + JSON.stringify(adInfo.toJsonData()));
            }
            else {
                _this.showLog("\u4E0A\u62A5\u5E7F\u544A\u4E8B\u4EF6\u5931\u8D25:" + JSON.stringify(adInfo.toJsonData()));
            }
        });
    };
    YouWanAnalytics.EventAdWithObj = function (adType, adStatus, adEventParameter) {
        var _this = this;
        if (!Utils_1.utils.config.otherconfig.yw_app_id) {
            this.showLog("yw_app_id 未配置，不进行上报！");
            return;
        }
        if (!PlatUtils_1.default.IsOPPO)
            return;
        var adInfo = new EventAdInfo_1.default(adType, adStatus, adEventParameter);
        var data = {};
        this.getStaticParame(data);
        data.ad_data = [];
        data.ad_data[0] = adInfo.toJsonData();
        this.connect(this.EVENT_AD_URL, data, function (res) {
            if (res) {
                _this.showLog("\u4E0A\u62A5\u5E7F\u544A\u4E8B\u4EF6\u6210\u529F:" + JSON.stringify(adInfo.toJsonData()));
            }
            else {
                _this.showLog("\u4E0A\u62A5\u5E7F\u544A\u4E8B\u4EF6\u5931\u8D25:" + JSON.stringify(adInfo.toJsonData()));
            }
        });
    };
    YouWanAnalytics.getStaticParame = function (data) {
        data.app_id = Utils_1.utils.config.otherconfig.yw_app_id;
        data.sdk_version = Utils_1.utils.utilsVersion;
        data.app_type = 1;
        if (this._yw_uid != -1) {
            data.uid = this._yw_uid;
        }
        data.country = "CN";
        data.uuid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_UUID, "") || Utils_1.utils.generateUUID();
        if (PlatUtils_1.default.IsOPPO) {
            data.channel = "oppo";
            data.app_version = Utils_1.utils.config.oppoconfig.version;
        }
    };
    YouWanAnalytics.getDeviceInfo = function (data) {
        var systemInfo = {};
        if (PlatUtils_1.default.IsOPPO) {
            systemInfo = Utils_1.utils.oppoTool.SysInfo;
            data.pkg = Utils_1.utils.config.oppoconfig.packageName;
            data.device_id = Utils_1.utils.oppoTool._device_id;
            data.kernel_version = systemInfo.platformVersionCode;
            data.device_model = systemInfo.model;
            data.device_manufactory = systemInfo.brand;
            data.screen_height = systemInfo.screenHeight;
            data.screen_width = systemInfo.screenWidth;
            data.language = systemInfo.language;
            data.os = "Android";
            if (systemInfo.system.indexOf(" ") > -1) {
                data.os_version_release = systemInfo.system.substr(systemInfo.system.indexOf(" ") + 1);
            }
            else {
                data.os_version_release = systemInfo.system;
            }
        }
    };
    YouWanAnalytics.connect = function (url, parame, callBackFunc) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 6000; // 单位毫秒
        xhr.open('POST', url + "?time_stamp=" + (new Date()).getTime());
        xhr.send("data=" + JSON.stringify(parame));
        this.showLog("connect：#url=" + url);
        this.showLog("connect\uFF1A #parame==" + JSON.stringify(parame));
        xhr.onreadystatechange = function () {
            _this.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status + " ; responseText=", xhr.responseText);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText) {
                        try {
                            var result = JSON.parse(xhr.responseText);
                            if (result.code == 0) {
                                callBackFunc && callBackFunc(true, result.data || "");
                            }
                            else {
                                callBackFunc && callBackFunc(false);
                            }
                        }
                        catch (error) {
                            _this.showLog("connect erro：#msg=" + error);
                        }
                    }
                }
                else {
                    _this.showLog("connect erro\uFF1A #parame==" + JSON.stringify(parame));
                    callBackFunc && callBackFunc(false);
                }
            }
        };
        xhr.ontimeout = function () {
            _this.showLog("connect timeout!");
            callBackFunc && callBackFunc(false);
        };
        xhr.onerror = function () {
            _this.showLog("connect onerror!");
            callBackFunc && callBackFunc(false);
        };
    };
    YouWanAnalytics.showLog = function (msg) {
        var any = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            any[_i - 1] = arguments[_i];
        }
        Utils_1.utils.showLog("[YouWan] --- " + msg, any);
    };
    YouWanAnalytics.LOGIN_URL = "http://as.youlesp.com/as/login";
    YouWanAnalytics.EVENT_AD_URL = "http://e.youlesp.com/ae/ad";
    YouWanAnalytics = __decorate([
        ccclass
    ], YouWanAnalytics);
    return YouWanAnalytics;
}());
exports.default = YouWanAnalytics;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWW91V2FuU0RLXFxZb3VXYW5BbmFseXRpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBcUM7QUFDckMsa0NBQWlDO0FBQ2pDLDhDQUF5QztBQUN6QyxzREFBaUQ7QUFDakQsNkNBQW9GO0FBRzlFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7SUFrS0EsQ0FBQztJQXpKRyxzQkFBbUIsMEJBQU87UUFKMUIsNEVBQTRFO1FBQzVFLDRFQUE0RTthQUc1RTtZQUNJLE9BQU8sUUFBUSxDQUFDLHlCQUFlLENBQUMsT0FBTyxDQUFDLHFCQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFFYSxxQkFBSyxHQUFuQixVQUFvQixZQUF1QjtRQUEzQyxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDckMsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDekMsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsS0FBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdFLHlCQUFlLENBQUMsT0FBTyxDQUFDLHFCQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsWUFBWSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRWEsdUJBQU8sR0FBckIsVUFBc0IsTUFBZ0IsRUFBRSxRQUFvQjtRQUE1RCxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDckMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG1CQUFTLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQUMsR0FBRztZQUN0QyxJQUFJLEdBQUcsRUFBRTtnQkFDTCxLQUFJLENBQUMsT0FBTyxDQUFDLHNEQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFHLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDLHNEQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFHLENBQUMsQ0FBQzthQUNuRTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDhCQUFjLEdBQTVCLFVBQTZCLE1BQWdCLEVBQUUsUUFBb0IsRUFBRSxnQkFBa0M7UUFBdkcsaUJBbUJDO1FBbEJHLElBQUksQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3JDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxtQkFBUyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRTlCLElBQUksTUFBTSxHQUFHLElBQUkscUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakUsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxVQUFDLEdBQUc7WUFDdEMsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsS0FBSSxDQUFDLE9BQU8sQ0FBQyxzREFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBRyxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxzREFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBRyxDQUFDLENBQUM7YUFDbkU7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYywrQkFBZSxHQUE5QixVQUErQixJQUFTO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBSyxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyx5QkFBZSxDQUFDLE9BQU8sQ0FBQyxxQkFBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckYsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFHYyw2QkFBYSxHQUE1QixVQUE2QixJQUFTO1FBQ2xDLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLFVBQVUsR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNwQyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUNwQixJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUY7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDL0M7U0FDSjtJQUNMLENBQUM7SUFJYyx1QkFBTyxHQUF0QixVQUF1QixHQUFXLEVBQUUsTUFBVyxFQUFFLFlBQXVCO1FBQXhFLGlCQXdDQztRQXZDRyxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUksT0FBTztRQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsY0FBYyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7UUFFNUQsR0FBRyxDQUFDLGtCQUFrQixHQUFHO1lBQ3JCLEtBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckgsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtnQkFDckIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtvQkFDbkIsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFO3dCQUNsQixJQUFJOzRCQUNBLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUMxQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dDQUNsQixZQUFZLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzZCQUN6RDtpQ0FBTTtnQ0FDSCxZQUFZLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUN2Qzt5QkFDSjt3QkFBQyxPQUFPLEtBQUssRUFBRTs0QkFDWixLQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO3lCQUM5QztxQkFFSjtpQkFDSjtxQkFBTTtvQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDLGlDQUEwQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7b0JBQ2pFLFlBQVksSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7UUFDTCxDQUFDLENBQUE7UUFDRCxHQUFHLENBQUMsU0FBUyxHQUFHO1lBQ1osS0FBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pDLFlBQVksSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFBO1FBQ0QsR0FBRyxDQUFDLE9BQU8sR0FBRztZQUNWLEtBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNqQyxZQUFZLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFYyx1QkFBTyxHQUF0QixVQUF1QixHQUFHO1FBQUUsYUFBYTthQUFiLFVBQWEsRUFBYixxQkFBYSxFQUFiLElBQWE7WUFBYiw0QkFBYTs7UUFDckMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBZ0IsR0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUE3SmMseUJBQVMsR0FBVyxnQ0FBZ0MsQ0FBQztJQUNyRCw0QkFBWSxHQUFXLDRCQUE0QixDQUFDO0lBRmxELGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FrS25DO0lBQUQsc0JBQUM7Q0FsS0QsQUFrS0MsSUFBQTtrQkFsS29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuLi9QbGF0VXRpbHNcIjtcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgWVpfQ29uc3RhbnQgZnJvbSBcIi4uL1laX0NvbnN0YW50XCI7XG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcbmltcG9ydCBFdmVudEFkSW5mbywgeyBBZEV2ZW50UGFyYW1ldGVyLCBZd0FkU3RhdHVzLCBZd0FkVHlwZSB9IGZyb20gXCIuL0V2ZW50QWRJbmZvXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlvdVdhbkFuYWx5dGljcyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgTE9HSU5fVVJMOiBzdHJpbmcgPSBcImh0dHA6Ly9hcy55b3VsZXNwLmNvbS9hcy9sb2dpblwiO1xuICAgIHByaXZhdGUgc3RhdGljIEVWRU5UX0FEX1VSTDogc3RyaW5nID0gXCJodHRwOi8vZS55b3VsZXNwLmNvbS9hZS9hZFwiO1xuXG5cbiAgICAvLyBwcml2YXRlIHN0YXRpYyBMT0dJTl9VUkw6IHN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMzEuMTA4OjgwODAvYXMvbG9naW5cIjtcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBFVkVOVF9BRF9VUkw6IHN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMzEuMTA4OjgwODAvYWUvYWRcIjtcblxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0IF95d191aWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1lPVVdBTl9VSUQsIFwiLTFcIikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbG9naW4oY2FsbEJhY2tGdW5jPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCF1dGlscy5jb25maWcub3RoZXJjb25maWcueXdfYXBwX2lkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2coXCJ5d19hcHBfaWQg5pyq6YWN572u77yM5LiN6L+b6KGM5LiK5oql77yBXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcbiAgICAgICAgdGhpcy5nZXREZXZpY2VJbmZvKGRhdGEpO1xuICAgICAgICB0aGlzLmdldFN0YXRpY1BhcmFtZShkYXRhKVxuICAgICAgICB0aGlzLmNvbm5lY3QodGhpcy5MT0dJTl9VUkwsIGRhdGEsIChyZXMsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2coXCLnmbvlvZXmiJDlip8hID4+cmVzdWx0OlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyBcIiAjdWlkPVwiICsgZGF0YS51aWQpO1xuICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1lPVVdBTl9VSUQsIGRhdGEudWlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TG9nKFwi55m75b2V5aSx6LSlIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxCYWNrRnVuYyAmJiBjYWxsQmFja0Z1bmMocmVzLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBFdmVudEFkKGFkVHlwZTogWXdBZFR5cGUsIGFkU3RhdHVzOiBZd0FkU3RhdHVzKSB7XG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnl3X2FwcF9pZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9nKFwieXdfYXBwX2lkIOacqumFjee9ru+8jOS4jei/m+ihjOS4iuaKpe+8gVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVBsYXRVdGlscy5Jc09QUE8pIHJldHVybjtcblxuICAgICAgICBsZXQgYWRJbmZvID0gbmV3IEV2ZW50QWRJbmZvKGFkVHlwZSwgYWRTdGF0dXMpO1xuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XG4gICAgICAgIHRoaXMuZ2V0U3RhdGljUGFyYW1lKGRhdGEpO1xuICAgICAgICBkYXRhLmFkX2RhdGEgPSBbXTtcbiAgICAgICAgZGF0YS5hZF9kYXRhWzBdID0gYWRJbmZvLnRvSnNvbkRhdGEoKTtcblxuICAgICAgICB0aGlzLmNvbm5lY3QodGhpcy5FVkVOVF9BRF9VUkwsIGRhdGEsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2coYOS4iuaKpeW5v+WRiuS6i+S7tuaIkOWKnzoke0pTT04uc3RyaW5naWZ5KGFkSW5mby50b0pzb25EYXRhKCkpfWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2coYOS4iuaKpeW5v+WRiuS6i+S7tuWksei0pToke0pTT04uc3RyaW5naWZ5KGFkSW5mby50b0pzb25EYXRhKCkpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEV2ZW50QWRXaXRoT2JqKGFkVHlwZTogWXdBZFR5cGUsIGFkU3RhdHVzOiBZd0FkU3RhdHVzLCBhZEV2ZW50UGFyYW1ldGVyOiBBZEV2ZW50UGFyYW1ldGVyKSB7XG4gICAgICAgIGlmICghdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnl3X2FwcF9pZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9nKFwieXdfYXBwX2lkIOacqumFjee9ru+8jOS4jei/m+ihjOS4iuaKpe+8gVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVBsYXRVdGlscy5Jc09QUE8pIHJldHVybjtcblxuICAgICAgICBsZXQgYWRJbmZvID0gbmV3IEV2ZW50QWRJbmZvKGFkVHlwZSwgYWRTdGF0dXMsIGFkRXZlbnRQYXJhbWV0ZXIpO1xuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XG4gICAgICAgIHRoaXMuZ2V0U3RhdGljUGFyYW1lKGRhdGEpO1xuICAgICAgICBkYXRhLmFkX2RhdGEgPSBbXTtcbiAgICAgICAgZGF0YS5hZF9kYXRhWzBdID0gYWRJbmZvLnRvSnNvbkRhdGEoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0KHRoaXMuRVZFTlRfQURfVVJMLCBkYXRhLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TG9nKGDkuIrmiqXlub/lkYrkuovku7bmiJDlip86JHtKU09OLnN0cmluZ2lmeShhZEluZm8udG9Kc29uRGF0YSgpKX1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TG9nKGDkuIrmiqXlub/lkYrkuovku7blpLHotKU6JHtKU09OLnN0cmluZ2lmeShhZEluZm8udG9Kc29uRGF0YSgpKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3RhdGljUGFyYW1lKGRhdGE6IGFueSkge1xuICAgICAgICBkYXRhLmFwcF9pZCA9IHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy55d19hcHBfaWQ7XG4gICAgICAgIGRhdGEuc2RrX3ZlcnNpb24gPSB1dGlscy51dGlsc1ZlcnNpb247XG4gICAgICAgIGRhdGEuYXBwX3R5cGUgPSAxO1xuICAgICAgICBpZiAodGhpcy5feXdfdWlkICE9IC0xKSB7XG4gICAgICAgICAgICBkYXRhLnVpZCA9IHRoaXMuX3l3X3VpZDtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLmNvdW50cnkgPSBcIkNOXCJcbiAgICAgICAgZGF0YS51dWlkID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfVVVJRCwgXCJcIikgfHwgdXRpbHMuZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XG4gICAgICAgICAgICBkYXRhLmNoYW5uZWwgPSBcIm9wcG9cIjtcbiAgICAgICAgICAgIGRhdGEuYXBwX3ZlcnNpb24gPSB1dGlscy5jb25maWcub3Bwb2NvbmZpZy52ZXJzaW9uO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXREZXZpY2VJbmZvKGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgc3lzdGVtSW5mbzogYW55ID0ge307XG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XG4gICAgICAgICAgICBzeXN0ZW1JbmZvID0gdXRpbHMub3Bwb1Rvb2wuU3lzSW5mbztcbiAgICAgICAgICAgIGRhdGEucGtnID0gdXRpbHMuY29uZmlnLm9wcG9jb25maWcucGFja2FnZU5hbWU7XG4gICAgICAgICAgICBkYXRhLmRldmljZV9pZCA9IHV0aWxzLm9wcG9Ub29sLl9kZXZpY2VfaWQ7XG4gICAgICAgICAgICBkYXRhLmtlcm5lbF92ZXJzaW9uID0gc3lzdGVtSW5mby5wbGF0Zm9ybVZlcnNpb25Db2RlO1xuICAgICAgICAgICAgZGF0YS5kZXZpY2VfbW9kZWwgPSBzeXN0ZW1JbmZvLm1vZGVsO1xuICAgICAgICAgICAgZGF0YS5kZXZpY2VfbWFudWZhY3RvcnkgPSBzeXN0ZW1JbmZvLmJyYW5kO1xuICAgICAgICAgICAgZGF0YS5zY3JlZW5faGVpZ2h0ID0gc3lzdGVtSW5mby5zY3JlZW5IZWlnaHQ7XG4gICAgICAgICAgICBkYXRhLnNjcmVlbl93aWR0aCA9IHN5c3RlbUluZm8uc2NyZWVuV2lkdGg7XG4gICAgICAgICAgICBkYXRhLmxhbmd1YWdlID0gc3lzdGVtSW5mby5sYW5ndWFnZTtcbiAgICAgICAgICAgIGRhdGEub3MgPSBcIkFuZHJvaWRcIjtcbiAgICAgICAgICAgIGlmIChzeXN0ZW1JbmZvLnN5c3RlbS5pbmRleE9mKFwiIFwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5vc192ZXJzaW9uX3JlbGVhc2UgPSBzeXN0ZW1JbmZvLnN5c3RlbS5zdWJzdHIoc3lzdGVtSW5mby5zeXN0ZW0uaW5kZXhPZihcIiBcIikgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5vc192ZXJzaW9uX3JlbGVhc2UgPSBzeXN0ZW1JbmZvLnN5c3RlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBwcml2YXRlIHN0YXRpYyBjb25uZWN0KHVybDogc3RyaW5nLCBwYXJhbWU6IGFueSwgY2FsbEJhY2tGdW5jPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IDYwMDA7ICAgIC8vIOWNleS9jeavq+enklxuICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCArIFwiP3RpbWVfc3RhbXA9XCIgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpKTtcbiAgICAgICAgeGhyLnNlbmQoYGRhdGE9JHtKU09OLnN0cmluZ2lmeShwYXJhbWUpfWApO1xuICAgICAgICB0aGlzLnNob3dMb2coXCJjb25uZWN077yaI3VybD1cIiArIHVybCk7XG4gICAgICAgIHRoaXMuc2hvd0xvZyhgY29ubmVjdO+8miAjcGFyYW1lPT0ke0pTT04uc3RyaW5naWZ5KHBhcmFtZSl9YCk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvZyhcIuivt+axgueKtuaAgeaUueWPmCwgcmVhZWR5U3RhdGU9XCIsIHhoci5yZWFkeVN0YXRlLCBcIjsgc3RhdHVzPVwiLCB4aHIuc3RhdHVzICsgXCIgOyByZXNwb25zZVRleHQ9XCIsIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2tGdW5jICYmIGNhbGxCYWNrRnVuYyh0cnVlLCByZXN1bHQuZGF0YSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsQmFja0Z1bmMgJiYgY2FsbEJhY2tGdW5jKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvZyhcImNvbm5lY3QgZXJyb++8miNtc2c9XCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvZyhgY29ubmVjdCBlcnJv77yaICNwYXJhbWU9PSR7SlNPTi5zdHJpbmdpZnkocGFyYW1lKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2tGdW5jICYmIGNhbGxCYWNrRnVuYyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2coXCJjb25uZWN0IHRpbWVvdXQhXCIpO1xuICAgICAgICAgICAgY2FsbEJhY2tGdW5jICYmIGNhbGxCYWNrRnVuYyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2coXCJjb25uZWN0IG9uZXJyb3IhXCIpO1xuICAgICAgICAgICAgY2FsbEJhY2tGdW5jICYmIGNhbGxCYWNrRnVuYyhmYWxzZSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHNob3dMb2cobXNnLCAuLi5hbnk6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHV0aWxzLnNob3dMb2coYFtZb3VXYW5dIC0tLSAke21zZ31gLCBhbnkpO1xuICAgIH1cblxuXG5cbn1cbiJdfQ==