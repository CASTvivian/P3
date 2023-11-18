"use strict";
cc._RF.push(module, '31682EOkrNLt67Wx9gIkGHK', 'YZ_Tool_Bili');
// common-plugin/Scripts/YZ_Tool_Bili.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 哔哩工具类
 */
var YZ_Tool_Bili = /** @class */ (function () {
    function YZ_Tool_Bili() {
        this._sysInfo = {};
        /**
     * 服务器配置信息
     */
        this._serverConfig = null;
    }
    Object.defineProperty(YZ_Tool_Bili.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Bili.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param data 配置数据
     */
    YZ_Tool_Bili.prototype.init = function (data) {
        if (PlatUtils_1.default.IsBili) {
            // if (data) {
            // 	let configObj: any = JSON.parse(data);
            // 	if (configObj && configObj.uc) {
            // 		ST_DefaultServerConfig = JSON.stringify(configObj.uc);
            // 	}
            // }
            Utils_1.utils.showLog("哔哩 平台初始化完成 >>");
            this.initSystemInfo();
            Utils_1.utils.emitServerInitEvent();
        }
    };
    /**
     * 分享
     * @param callback 回调
     */
    YZ_Tool_Bili.prototype.share = function (callback) {
        if (callback === void 0) { callback = null; }
        //@ts-ignore
        bl.shareAppMessage({
            title: Utils_1.utils.config.otherconfig.shareTitle,
            imageUrl: Utils_1.utils.config.otherconfig.shareImgUrl,
            success: function () {
                Utils_1.utils.showLog("bili 分享成功！");
                callback && callback(true);
            },
            fail: function () {
                Utils_1.utils.showLog("bili 分享失败！");
                callback && callback(false, "分享失败！");
            }
        });
    };
    /**
     * 初始化获取系统信息参数
     */
    YZ_Tool_Bili.prototype.initSystemInfo = function () {
        if (PlatUtils_1.default.IsBili) {
            //@ts-ignore
            this._sysInfo = bl.getSystemInfoSync();
        }
    };
    YZ_Tool_Bili = __decorate([
        ccclass
    ], YZ_Tool_Bili);
    return YZ_Tool_Bili;
}());
exports.default = YZ_Tool_Bili;

cc._RF.pop();