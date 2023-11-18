
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_4399.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF80Mzk5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qyw4RUFBOEU7QUFFOUU7O0dBRUc7QUFFSDtJQUFBO1FBQ0MsWUFBWTtRQUNaLFVBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFLbkI7O09BRUU7UUFDRixrQkFBYSxHQUFRLElBQUksQ0FBQztJQXVDM0IsQ0FBQztJQTlDQSxzQkFBVyxpQ0FBTzthQUFsQjtZQUNDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLHNDQUFZO2FBQXZCO1lBQ0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBR0Q7OztPQUdHO0lBQ0ksMkJBQUksR0FBWCxVQUFZLElBQVk7UUFDdkIsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUVyQixjQUFjO1lBQ2QsMENBQTBDO1lBQzFDLG9DQUFvQztZQUNwQywyREFBMkQ7WUFDM0QsS0FBSztZQUNMLElBQUk7WUFDSixhQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDcEMsYUFBSyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FFNUI7SUFFRixDQUFDO0lBRU0sNEJBQUssR0FBWixVQUFhLFFBQWtCO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0NBQWEsR0FBcEI7UUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUEvQ21CLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FrRGhDO0lBQUQsbUJBQUM7Q0FsREQsQUFrREMsSUFBQTtrQkFsRG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLy88c2NyaXB0IHNyYz1cImh0dHA6Ly9oLmFwaS40Mzk5LmNvbS9oNW1pbmktMi4wL2g1YXBpLWludGVyZmFjZS5waHBcIj48L3NjcmlwdD5cclxuXHJcbi8qKlxyXG4gKiB1Y+W3peWFt+exu1xyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF80Mzk5IHtcclxuXHQvL0B0cy1pZ25vcmVcclxuXHRfNDM5OSA9IHdpbmRvdy5oNWFwaTtcclxuXHRfc3lzSW5mbzogYW55ID0ge307XHJcblx0cHVibGljIGdldCBTeXNJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N5c0luZm87XHJcblx0fVxyXG5cclxuXHQvKipcclxuICog5pyN5Yqh5Zmo6YWN572u5L+h5oGvXHJcbiAqL1xyXG5cdF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcblx0cHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBkYXRhIOmFjee9ruaVsOaNrlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG5cdFx0aWYgKFBsYXRVdGlscy5JczQzOTkpIHtcclxuXHJcblx0XHRcdC8vIGlmIChkYXRhKSB7XHJcblx0XHRcdC8vIFx0bGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0Ly8gXHRpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai51Yykge1xyXG5cdFx0XHQvLyBcdFx0U1RfRGVmYXVsdFNlcnZlckNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ09iai51Yyk7XHJcblx0XHRcdC8vIFx0fVxyXG5cdFx0XHQvLyB9XHJcblx0XHRcdHV0aWxzLnNob3dMb2coXCI0Mzk5IGg1IOW5s+WPsOWIneWni+WMluWujOaIkCA+PlwiKTtcclxuXHRcdFx0dXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2hhcmUoY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHR0aGlzLl80Mzk5LnNoYXJlKCk7XHJcblx0XHRjYWxsQmFjayAmJiBjYWxsQmFjayh0cnVlLCBcIlwiKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOaYvuekuuaOqOiNkOW8ueeql1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBzaG93UmVjb21tZW5kKCkge1xyXG5cdFx0dGhpcy5fNDM5OS5zaG93UmVjb21tZW5kKClcclxuXHR9XHJcblxyXG5cclxufVxyXG4iXX0=