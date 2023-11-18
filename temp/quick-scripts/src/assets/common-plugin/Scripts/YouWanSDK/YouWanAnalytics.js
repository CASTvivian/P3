"use strict";
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