
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_GoogleWeb.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1a1e6qqmtF8b2CiqXLnmdD', 'YZ_Tool_GoogleWeb');
// common-plugin/Scripts/YZ_Tool_GoogleWeb.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var ST_ServerUrl = "http://apps.youlesp.com/aconfig?";
var ST_DefaultServerConfig = "";
var ST_NativeInsertAdClickTimes = "NativeInsertAdClickTimes";
var ST_LastDateTime = "LastDateTime";
var POST_ServerUrl = "https://report.youletd.com/gss?";
var YZ_Tool_GoogleWeb = /** @class */ (function () {
    function YZ_Tool_GoogleWeb() {
        this._serverConfig = null;
    }
    Object.defineProperty(YZ_Tool_GoogleWeb.prototype, "ServerConfig", {
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
    YZ_Tool_GoogleWeb.prototype.init = function (data) {
        this._loadConfig();
    };
    YZ_Tool_GoogleWeb.prototype._loadConfig = function () {
        Utils_1.utils.emitServerInitEvent();
    };
    /**
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_GoogleWeb.prototype.sendEvent = function (eventName) {
    };
    /**
     *
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_GoogleWeb.prototype.postLevel = function (level, status, levelName) {
    };
    return YZ_Tool_GoogleWeb;
}());
exports.default = YZ_Tool_GoogleWeb;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9Hb29nbGVXZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQ0FBZ0M7QUFHaEMsSUFBTSxZQUFZLEdBQVcsa0NBQWtDLENBQUM7QUFDaEUsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFDeEMsSUFBTSwyQkFBMkIsR0FBVywwQkFBMEIsQ0FBQztBQUN2RSxJQUFNLGVBQWUsR0FBVyxjQUFjLENBQUM7QUFDL0MsSUFBTSxjQUFjLEdBQVcsaUNBQWlDLENBQUM7QUFFakU7SUFBQTtRQUVDLGtCQUFhLEdBQVEsSUFBSSxDQUFDO0lBb0MzQixDQUFDO0lBbkNBLHNCQUFXLDJDQUFZO2FBQXZCO1lBQ0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQ7OztPQUdHO0lBQ0ksZ0NBQUksR0FBWCxVQUFZLElBQVk7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0MsYUFBSyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kscUNBQVMsR0FBaEIsVUFBaUIsU0FBaUI7SUFFbEMsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0kscUNBQVMsR0FBaEIsVUFBaUIsS0FBYSxFQUFFLE1BQW1CLEVBQUUsU0FBa0I7SUFFdkUsQ0FBQztJQUVGLHdCQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgeyBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XG5cbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vYXBwcy55b3VsZXNwLmNvbS9hY29uZmlnP1wiO1xubGV0IFNUX0RlZmF1bHRTZXJ2ZXJDb25maWc6IHN0cmluZyA9IFwiXCI7XG5jb25zdCBTVF9OYXRpdmVJbnNlcnRBZENsaWNrVGltZXM6IHN0cmluZyA9IFwiTmF0aXZlSW5zZXJ0QWRDbGlja1RpbWVzXCI7XG5jb25zdCBTVF9MYXN0RGF0ZVRpbWU6IHN0cmluZyA9IFwiTGFzdERhdGVUaW1lXCI7XG5jb25zdCBQT1NUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwczovL3JlcG9ydC55b3VsZXRkLmNvbS9nc3M/XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlaX1Rvb2xfR29vZ2xlV2ViIHtcblxuXHRfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xuXHRwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcblx0XHRyZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cblx0ICovXG5cdHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xuXHRcdHRoaXMuX2xvYWRDb25maWcoKTtcblx0fVxuXG5cdF9sb2FkQ29uZmlnKCkge1xuXHRcdHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDkuIrmiqXoh6rlrprkuYnkuovku7Zcblx0ICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXG5cdCAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXG5cdCAqIEBwYXJhbSBzdGF0dXMg54q25oCBXG5cdCAqL1xuXHRwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XG5cblx0fVxuXHQvKipcblx0ICogXHRcblx0ICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXG5cdCAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXG5cdCAqIEBwYXJhbSBzdGF0dXMg54q25oCBXG5cdCAqL1xuXHRwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xuXG5cdH1cbiBcbn1cbiJdfQ==