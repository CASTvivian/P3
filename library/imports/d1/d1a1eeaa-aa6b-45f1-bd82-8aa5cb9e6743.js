"use strict";
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