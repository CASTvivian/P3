
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Bili.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9CaWxpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7R0FFRztBQUVIO0lBQUE7UUFFQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBTW5COztPQUVFO1FBQ0Ysa0JBQWEsR0FBUSxJQUFJLENBQUM7SUEwRDNCLENBQUM7SUFsRUEsc0JBQVcsaUNBQU87YUFBbEI7WUFDQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyxzQ0FBWTthQUF2QjtZQUNDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUdEOzs7T0FHRztJQUNJLDJCQUFJLEdBQVgsVUFBWSxJQUFZO1FBQ3ZCLElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUU7WUFFckIsY0FBYztZQUNkLDBDQUEwQztZQUMxQyxvQ0FBb0M7WUFDcEMsMkRBQTJEO1lBQzNELEtBQUs7WUFDTCxJQUFJO1lBQ0osYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsYUFBSyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFFRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNEJBQUssR0FBWixVQUFhLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsZUFBeUI7UUFDckMsWUFBWTtRQUNaLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDbEIsS0FBSyxFQUFFLGFBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVU7WUFDMUMsUUFBUSxFQUFFLGFBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVc7WUFDOUMsT0FBTyxFQUFFO2dCQUNSLGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVCLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBRTtnQkFDTCxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM1QixRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0QyxDQUFDO1NBQ0QsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUlEOztPQUVHO0lBQ0kscUNBQWMsR0FBckI7UUFDQyxJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3JCLFlBQVk7WUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0YsQ0FBQztJQW5FbUIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXFFaEM7SUFBRCxtQkFBQztDQXJFRCxBQXFFQyxJQUFBO2tCQXJFb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICog5ZOU5ZOp5bel5YW357G7XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX0JpbGkge1xyXG5cclxuXHRfc3lzSW5mbzogYW55ID0ge307XHJcblx0cHVibGljIGdldCBTeXNJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N5c0luZm87XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcbiAqIOacjeWKoeWZqOmFjee9ruS/oeaBr1xyXG4gKi9cclxuXHRfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xyXG5cdHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlcnZlckNvbmZpZztcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcclxuXHRcdGlmIChQbGF0VXRpbHMuSXNCaWxpKSB7XHJcblxyXG5cdFx0XHQvLyBpZiAoZGF0YSkge1xyXG5cdFx0XHQvLyBcdGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdC8vIFx0aWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmoudWMpIHtcclxuXHRcdFx0Ly8gXHRcdFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmoudWMpO1xyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHR1dGlscy5zaG93TG9nKFwi5ZOU5ZOpIOW5s+WPsOWIneWni+WMluWujOaIkCA+PlwiKTtcclxuXHRcdFx0dGhpcy5pbml0U3lzdGVtSW5mbygpO1xyXG5cdFx0XHR1dGlscy5lbWl0U2VydmVySW5pdEV2ZW50KCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog5YiG5LqrXHJcblx0ICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBzaGFyZShjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XHJcblx0XHQvL0B0cy1pZ25vcmVcclxuXHRcdGJsLnNoYXJlQXBwTWVzc2FnZSh7XHJcblx0XHRcdHRpdGxlOiB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSxcclxuXHRcdFx0aW1hZ2VVcmw6IHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCxcclxuXHRcdFx0c3VjY2VzczogKCkgPT4ge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coXCJiaWxpIOWIhuS6q+aIkOWKn++8gVwiKTtcclxuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayh0cnVlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiAoKSA9PiB7XHJcblx0XHRcdFx0dXRpbHMuc2hvd0xvZyhcImJpbGkg5YiG5Lqr5aSx6LSl77yBXCIpO1xyXG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGZhbHNlLCBcIuWIhuS6q+Wksei0pe+8gVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICog5Yid5aeL5YyW6I635Y+W57O757uf5L+h5oGv5Y+C5pWwXHJcblx0ICovXHJcblx0cHVibGljIGluaXRTeXN0ZW1JbmZvKCkge1xyXG5cdFx0aWYgKFBsYXRVdGlscy5Jc0JpbGkpIHtcclxuXHRcdFx0Ly9AdHMtaWdub3JlXHJcblx0XHRcdHRoaXMuX3N5c0luZm8gPSBibC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuIl19