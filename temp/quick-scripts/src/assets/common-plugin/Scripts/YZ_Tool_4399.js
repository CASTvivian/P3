"use strict";
cc._RF.push(module, 'e9a1c/LeeFGVaaFV6tot5cB', 'YZ_Tool_4399');
// common-plugin/Scripts/YZ_Tool_4399.ts

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
//<script src="http://h.api.4399.com/h5mini-2.0/h5api-interface.php"></script>
/**
 * uc工具类
 */
var YZ_Tool_4399 = /** @class */ (function () {
    function YZ_Tool_4399() {
        //@ts-ignore
        this._4399 = window.h5api;
        this._sysInfo = {};
        /**
     * 服务器配置信息
     */
        this._serverConfig = null;
    }
    Object.defineProperty(YZ_Tool_4399.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_4399.prototype, "ServerConfig", {
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
    YZ_Tool_4399.prototype.init = function (data) {
        if (PlatUtils_1.default.Is4399) {
            // if (data) {
            // 	let configObj: any = JSON.parse(data);
            // 	if (configObj && configObj.uc) {
            // 		ST_DefaultServerConfig = JSON.stringify(configObj.uc);
            // 	}
            // }
            Utils_1.utils.showLog("4399 h5 平台初始化完成 >>");
            Utils_1.utils.emitServerInitEvent();
        }
    };
    YZ_Tool_4399.prototype.share = function (callBack) {
        this._4399.share();
        callBack && callBack(true, "");
    };
    /**
     * 显示推荐弹窗
     */
    YZ_Tool_4399.prototype.showRecommend = function () {
        this._4399.showRecommend();
    };
    YZ_Tool_4399 = __decorate([
        ccclass
    ], YZ_Tool_4399);
    return YZ_Tool_4399;
}());
exports.default = YZ_Tool_4399;

cc._RF.pop();