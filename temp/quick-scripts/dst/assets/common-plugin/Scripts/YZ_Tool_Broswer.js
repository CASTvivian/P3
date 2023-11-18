
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Broswer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50a6elLlt5J/6iLrubWYrAU', 'YZ_Tool_Broswer');
// common-plugin/Scripts/YZ_Tool_Broswer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var ST_ServerUrl = "http://apps.youlesp.com/aconfig?";
var ST_DefaultServerConfig = "";
var ST_NativeInsertAdClickTimes = "NativeInsertAdClickTimes";
var ST_LastDateTime = "LastDateTime";
var POST_ServerUrl = "https://report.youletd.com/gss?";
var YZ_Tool_Broswer = /** @class */ (function () {
    function YZ_Tool_Broswer() {
        this._serverConfig = null;
        this._nativeInsertAdClickTimes = 0;
        this._img_url = "app/editor/static/img/logo-with-text.png";
        // 桌面图标是否创建
        this._shortcutCreated = false;
    }
    Object.defineProperty(YZ_Tool_Broswer.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Broswer.prototype, "NativeInsertAdClickTimes", {
        get: function () {
            return this._nativeInsertAdClickTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Broswer.prototype, "ShortcutCreated", {
        get: function () {
            return this._shortcutCreated;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Broswer.prototype, "img_url", {
        get: function () {
            return window.location.href + this._img_url;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取交叉推广数据
     */
    YZ_Tool_Broswer.prototype.getRecommondGameList = function () {
        return [
            {
                "id": "30213731",
                "name": "测试一",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试二",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试三",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试四",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试五",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试六",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试七",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试八",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试九",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试10",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试11",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试12",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试13",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            },
            {
                "id": "30213731",
                "name": "测试14",
                "appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
                "logo": this.img_url,
                "icon": this.img_url
            }
        ];
    };
    /**
     *
     * @param data 配置数据
     */
    YZ_Tool_Broswer.prototype.init = function (data) {
        if (data) {
            var configObj = JSON.parse(data);
            if (configObj && configObj.oppo) {
                ST_DefaultServerConfig = JSON.stringify(configObj.oppo);
            }
        }
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.img_url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log("测试图片路径正常");
                self._loadConfig();
            }
            if (xhr.readyState == 4 && xhr.status == 404) {
                console.log("测试图片路径不存在切换图片路径");
                self._img_url = "app/editor/static/preview-templates/splash.png";
                self._loadConfig();
            }
        };
        xhr.ontimeout = function () {
            console.log("测试图片加载超时切换图片路径");
            self._img_url = "app/editor/static/preview-templates/splash.png";
            self._loadConfig();
        };
        xhr.onerror = function (err) {
            console.log("测试图片路径异常：" + err + "切换图片路径");
            self._img_url = "app/editor/static/preview-templates/splash.png";
            self._loadConfig();
        };
    };
    YZ_Tool_Broswer.prototype._loadConfig = function () {
        this._serverConfig = JSON.parse(ST_DefaultServerConfig);
        this._serverConfig.icon_jump = 5;
        this._serverConfig.jump_list = this.getRecommondGameList();
        Utils_1.utils.emitServerInitEvent();
    };
    /**
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Broswer.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsTest) {
            // let method = "m=revent";
            Utils_1.utils.showLog("上报自定义事件 " + eventName);
            // let url: string = POST_ServerUrl + method + `&event=${encodeURI(eventName)}`;
            // utils.commomHttpRequest(url, function (ret, data) {
            // 	if (ret) {
            // 		utils.showLog("上报自定义事件成功！");
            // 	} else {
            // 		utils.showLog("上报自定义事件失败！");
            // 	}
            // }.bind(this));
        }
    };
    /**
     *
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Broswer.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsTest) {
            // let method = "m=rlevel";
            Utils_1.utils.showLog("\u5173\u5361" + level + "," + status);
            // let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
            // utils.commomHttpRequest(url, function (ret, data) {
            // 	if (ret) {
            // 		utils.showLog("关卡数据上报成功！");
            // 	} else {
            // 		utils.showLog("关卡数据上报失败！");
            // 	}
            // }.bind(this));
        }
    };
    /**
    * 实名认证
    */
    YZ_Tool_Broswer.prototype.realNameAuth = function (code, name, callBack) {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        var method = "m=realNameAuth";
        var completeCallback = callBack;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 6000; // 单位毫秒
        var data = {};
        data.kyx = false;
        data.app_id = "6103b73b864a9558e6d65af8";
        data.channel = "m233";
        data.device_uid = 0;
        data.uid = "482501611";
        data.game_type = 2;
        data.device_data = "";
        data.game_version = "1.0.0";
        data.reqv = "";
        data.app_list = "";
        data.id_card = code;
        data.real_name = name;
        var requestData = JSON.stringify(data);
        var requestUrl = "https://apps.youlesp.com/gss?" + method + ("&time_stamp=" + (new Date()).getTime() + "&json_data=" + Utils_1.utils.aesEncrypt(requestData));
        Utils_1.utils.showLog("服务器地址:" + requestUrl);
        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = function () {
            Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        completeCallback(true, Utils_1.utils.aesDecrypt(xhr.responseText));
                    }
                }
                else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }
            if (xhr.status != 200) {
            }
        };
        xhr.ontimeout = function () {
            Utils_1.utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
        xhr.onerror = function (err) {
            if (completeCallback) {
                completeCallback(false, "");
            }
        };
    };
    return YZ_Tool_Broswer;
}());
exports.default = YZ_Tool_Broswer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9Ccm9zd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUdoQyxJQUFNLFlBQVksR0FBVyxrQ0FBa0MsQ0FBQztBQUNoRSxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUN4QyxJQUFNLDJCQUEyQixHQUFXLDBCQUEwQixDQUFDO0FBQ3ZFLElBQU0sZUFBZSxHQUFXLGNBQWMsQ0FBQztBQUMvQyxJQUFNLGNBQWMsR0FBVyxpQ0FBaUMsQ0FBQztBQUVqRTtJQUFBO1FBRUMsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFLMUIsOEJBQXlCLEdBQVcsQ0FBQyxDQUFDO1FBSS9CLGFBQVEsR0FBVywwQ0FBMEMsQ0FBQTtRQUNwRSxXQUFXO1FBQ1gscUJBQWdCLEdBQVksS0FBSyxDQUFDO0lBc1FuQyxDQUFDO0lBaFJBLHNCQUFXLHlDQUFZO2FBQXZCO1lBQ0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcscURBQXdCO2FBQW5DO1lBQ0MsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFJRCxzQkFBVyw0Q0FBZTthQUExQjtZQUNDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksb0NBQU87YUFBWDtZQUNDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUNEOztPQUVHO0lBQ0ksOENBQW9CLEdBQTNCO1FBQ0MsT0FBTztZQUNOO2dCQUNDLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsdUNBQXVDO2dCQUNoRCxNQUFNLEVBQUUsSUFB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Q0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixJQUFJLGdCQUFnQixFQUFFO2dCQUNyQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDNUI7UUFDRixDQUFDLENBQUE7UUFDRCxHQUFHLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRztZQUMxQixJQUFJLGdCQUFnQixFQUFFO2dCQUNyQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDNUI7UUFDRixDQUFDLENBQUE7SUFDRixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQW5SQSxBQW1SQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCB7IExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcblxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2Fjb25maWc/XCI7XG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcbmNvbnN0IFNUX05hdGl2ZUluc2VydEFkQ2xpY2tUaW1lczogc3RyaW5nID0gXCJOYXRpdmVJbnNlcnRBZENsaWNrVGltZXNcIjtcbmNvbnN0IFNUX0xhc3REYXRlVGltZTogc3RyaW5nID0gXCJMYXN0RGF0ZVRpbWVcIjtcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vcmVwb3J0LnlvdWxldGQuY29tL2dzcz9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF9Ccm9zd2VyIHtcblxuXHRfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xuXHRwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcblx0XHRyZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xuXHR9XG5cblx0X25hdGl2ZUluc2VydEFkQ2xpY2tUaW1lczogbnVtYmVyID0gMDtcblx0cHVibGljIGdldCBOYXRpdmVJbnNlcnRBZENsaWNrVGltZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25hdGl2ZUluc2VydEFkQ2xpY2tUaW1lcztcblx0fVxuXHRwdWJsaWMgX2ltZ191cmw6IHN0cmluZyA9IFwiYXBwL2VkaXRvci9zdGF0aWMvaW1nL2xvZ28td2l0aC10ZXh0LnBuZ1wiXG5cdC8vIOahjOmdouWbvuagh+aYr+WQpuWIm+W7ulxuXHRfc2hvcnRjdXRDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBnZXQgU2hvcnRjdXRDcmVhdGVkKCkge1xuXHRcdHJldHVybiB0aGlzLl9zaG9ydGN1dENyZWF0ZWQ7XG5cdH1cblx0Z2V0IGltZ191cmwoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWYgKyB0aGlzLl9pbWdfdXJsO1xuXHR9XG5cdC8qKlxuXHQgKiDojrflj5bkuqTlj4nmjqjlub/mlbDmja5cblx0ICovXG5cdHB1YmxpYyBnZXRSZWNvbW1vbmRHYW1lTGlzdCgpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRcImlkXCI6IFwiMzAyMTM3MzFcIixcblx0XHRcdFx0XCJuYW1lXCI6IFwi5rWL6K+V5LiAXCIsXG5cdFx0XHRcdFwiYXBwaWRcIjogXCJjb20ueXp4eC5oY3J0dHQua3l4Lm5lYXJtZS5nYW1lY2VudGVyXCIsXG5cdFx0XHRcdFwibG9nb1wiOiB0aGlzLmltZ191cmwsXG5cdFx0XHRcdFwiaWNvblwiOiB0aGlzLmltZ191cmxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdFwiaWRcIjogXCIzMDIxMzczMVwiLFxuXHRcdFx0XHRcIm5hbWVcIjogXCLmtYvor5XkuoxcIixcblx0XHRcdFx0XCJhcHBpZFwiOiBcImNvbS55enh4LmhjcnR0dC5reXgubmVhcm1lLmdhbWVjZW50ZXJcIixcblx0XHRcdFx0XCJsb2dvXCI6IHRoaXMuaW1nX3VybCxcblx0XHRcdFx0XCJpY29uXCI6IHRoaXMuaW1nX3VybFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJpZFwiOiBcIjMwMjEzNzMxXCIsXG5cdFx0XHRcdFwibmFtZVwiOiBcIua1i+ivleS4iVwiLFxuXHRcdFx0XHRcImFwcGlkXCI6IFwiY29tLnl6eHguaGNydHR0Lmt5eC5uZWFybWUuZ2FtZWNlbnRlclwiLFxuXHRcdFx0XHRcImxvZ29cIjogdGhpcy5pbWdfdXJsLFxuXHRcdFx0XHRcImljb25cIjogdGhpcy5pbWdfdXJsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcImlkXCI6IFwiMzAyMTM3MzFcIixcblx0XHRcdFx0XCJuYW1lXCI6IFwi5rWL6K+V5ZubXCIsXG5cdFx0XHRcdFwiYXBwaWRcIjogXCJjb20ueXp4eC5oY3J0dHQua3l4Lm5lYXJtZS5nYW1lY2VudGVyXCIsXG5cdFx0XHRcdFwibG9nb1wiOiB0aGlzLmltZ191cmwsXG5cdFx0XHRcdFwiaWNvblwiOiB0aGlzLmltZ191cmxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdFwiaWRcIjogXCIzMDIxMzczMVwiLFxuXHRcdFx0XHRcIm5hbWVcIjogXCLmtYvor5XkupRcIixcblx0XHRcdFx0XCJhcHBpZFwiOiBcImNvbS55enh4LmhjcnR0dC5reXgubmVhcm1lLmdhbWVjZW50ZXJcIixcblx0XHRcdFx0XCJsb2dvXCI6IHRoaXMuaW1nX3VybCxcblx0XHRcdFx0XCJpY29uXCI6IHRoaXMuaW1nX3VybFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJpZFwiOiBcIjMwMjEzNzMxXCIsXG5cdFx0XHRcdFwibmFtZVwiOiBcIua1i+ivleWFrVwiLFxuXHRcdFx0XHRcImFwcGlkXCI6IFwiY29tLnl6eHguaGNydHR0Lmt5eC5uZWFybWUuZ2FtZWNlbnRlclwiLFxuXHRcdFx0XHRcImxvZ29cIjogdGhpcy5pbWdfdXJsLFxuXHRcdFx0XHRcImljb25cIjogdGhpcy5pbWdfdXJsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcImlkXCI6IFwiMzAyMTM3MzFcIixcblx0XHRcdFx0XCJuYW1lXCI6IFwi5rWL6K+V5LiDXCIsXG5cdFx0XHRcdFwiYXBwaWRcIjogXCJjb20ueXp4eC5oY3J0dHQua3l4Lm5lYXJtZS5nYW1lY2VudGVyXCIsXG5cdFx0XHRcdFwibG9nb1wiOiB0aGlzLmltZ191cmwsXG5cdFx0XHRcdFwiaWNvblwiOiB0aGlzLmltZ191cmxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdFwiaWRcIjogXCIzMDIxMzczMVwiLFxuXHRcdFx0XHRcIm5hbWVcIjogXCLmtYvor5XlhatcIixcblx0XHRcdFx0XCJhcHBpZFwiOiBcImNvbS55enh4LmhjcnR0dC5reXgubmVhcm1lLmdhbWVjZW50ZXJcIixcblx0XHRcdFx0XCJsb2dvXCI6IHRoaXMuaW1nX3VybCxcblx0XHRcdFx0XCJpY29uXCI6IHRoaXMuaW1nX3VybFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJpZFwiOiBcIjMwMjEzNzMxXCIsXG5cdFx0XHRcdFwibmFtZVwiOiBcIua1i+ivleS5nVwiLFxuXHRcdFx0XHRcImFwcGlkXCI6IFwiY29tLnl6eHguaGNydHR0Lmt5eC5uZWFybWUuZ2FtZWNlbnRlclwiLFxuXHRcdFx0XHRcImxvZ29cIjogdGhpcy5pbWdfdXJsLFxuXHRcdFx0XHRcImljb25cIjogdGhpcy5pbWdfdXJsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcImlkXCI6IFwiMzAyMTM3MzFcIixcblx0XHRcdFx0XCJuYW1lXCI6IFwi5rWL6K+VMTBcIixcblx0XHRcdFx0XCJhcHBpZFwiOiBcImNvbS55enh4LmhjcnR0dC5reXgubmVhcm1lLmdhbWVjZW50ZXJcIixcblx0XHRcdFx0XCJsb2dvXCI6IHRoaXMuaW1nX3VybCxcblx0XHRcdFx0XCJpY29uXCI6IHRoaXMuaW1nX3VybFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJpZFwiOiBcIjMwMjEzNzMxXCIsXG5cdFx0XHRcdFwibmFtZVwiOiBcIua1i+ivlTExXCIsXG5cdFx0XHRcdFwiYXBwaWRcIjogXCJjb20ueXp4eC5oY3J0dHQua3l4Lm5lYXJtZS5nYW1lY2VudGVyXCIsXG5cdFx0XHRcdFwibG9nb1wiOiB0aGlzLmltZ191cmwsXG5cdFx0XHRcdFwiaWNvblwiOiB0aGlzLmltZ191cmxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdFwiaWRcIjogXCIzMDIxMzczMVwiLFxuXHRcdFx0XHRcIm5hbWVcIjogXCLmtYvor5UxMlwiLFxuXHRcdFx0XHRcImFwcGlkXCI6IFwiY29tLnl6eHguaGNydHR0Lmt5eC5uZWFybWUuZ2FtZWNlbnRlclwiLFxuXHRcdFx0XHRcImxvZ29cIjogdGhpcy5pbWdfdXJsLFxuXHRcdFx0XHRcImljb25cIjogdGhpcy5pbWdfdXJsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcImlkXCI6IFwiMzAyMTM3MzFcIixcblx0XHRcdFx0XCJuYW1lXCI6IFwi5rWL6K+VMTNcIixcblx0XHRcdFx0XCJhcHBpZFwiOiBcImNvbS55enh4LmhjcnR0dC5reXgubmVhcm1lLmdhbWVjZW50ZXJcIixcblx0XHRcdFx0XCJsb2dvXCI6IHRoaXMuaW1nX3VybCxcblx0XHRcdFx0XCJpY29uXCI6IHRoaXMuaW1nX3VybFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJpZFwiOiBcIjMwMjEzNzMxXCIsXG5cdFx0XHRcdFwibmFtZVwiOiBcIua1i+ivlTE0XCIsXG5cdFx0XHRcdFwiYXBwaWRcIjogXCJjb20ueXp4eC5oY3J0dHQua3l4Lm5lYXJtZS5nYW1lY2VudGVyXCIsXG5cdFx0XHRcdFwibG9nb1wiOiB0aGlzLmltZ191cmwsXG5cdFx0XHRcdFwiaWNvblwiOiB0aGlzLmltZ191cmxcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXG5cdCAqL1xuXHRwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0bGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHRcdGlmIChjb25maWdPYmogJiYgY29uZmlnT2JqLm9wcG8pIHtcblx0XHRcdFx0U1RfRGVmYXVsdFNlcnZlckNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ09iai5vcHBvKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHR4aHIub3BlbignR0VUJywgdGhpcy5pbWdfdXJsKTtcblx0XHR4aHIuc2VuZCgpO1xuXHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIua1i+ivleWbvueJh+i3r+W+hOato+W4uFwiKVxuXHRcdFx0XHRzZWxmLl9sb2FkQ29uZmlnKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDQwNCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIua1i+ivleWbvueJh+i3r+W+hOS4jeWtmOWcqOWIh+aNouWbvueJh+i3r+W+hFwiKTtcblx0XHRcdFx0c2VsZi5faW1nX3VybCA9IFwiYXBwL2VkaXRvci9zdGF0aWMvcHJldmlldy10ZW1wbGF0ZXMvc3BsYXNoLnBuZ1wiXG5cdFx0XHRcdHNlbGYuX2xvYWRDb25maWcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0eGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwi5rWL6K+V5Zu+54mH5Yqg6L296LaF5pe25YiH5o2i5Zu+54mH6Lev5b6EXCIpO1xuXHRcdFx0c2VsZi5faW1nX3VybCA9IFwiYXBwL2VkaXRvci9zdGF0aWMvcHJldmlldy10ZW1wbGF0ZXMvc3BsYXNoLnBuZ1wiXG5cdFx0XHRzZWxmLl9sb2FkQ29uZmlnKCk7XG5cdFx0fVxuXHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdFx0Y29uc29sZS5sb2coXCLmtYvor5Xlm77niYfot6/lvoTlvILluLjvvJpcIiArIGVyciArIFwi5YiH5o2i5Zu+54mH6Lev5b6EXCIpO1xuXHRcdFx0c2VsZi5faW1nX3VybCA9IFwiYXBwL2VkaXRvci9zdGF0aWMvcHJldmlldy10ZW1wbGF0ZXMvc3BsYXNoLnBuZ1wiXG5cdFx0XHRzZWxmLl9sb2FkQ29uZmlnKCk7XG5cdFx0fVxuXHR9XG5cblx0X2xvYWRDb25maWcoKSB7XG5cdFx0dGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcblx0XHR0aGlzLl9zZXJ2ZXJDb25maWcuaWNvbl9qdW1wID0gNTtcblx0XHR0aGlzLl9zZXJ2ZXJDb25maWcuanVtcF9saXN0ID0gdGhpcy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xuXHRcdHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDkuIrmiqXoh6rlrprkuYnkuovku7Zcblx0ICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXG5cdCAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXG5cdCAqIEBwYXJhbSBzdGF0dXMg54q25oCBXG5cdCAqL1xuXHRwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XG5cdFx0aWYgKFBsYXRVdGlscy5Jc1Rlc3QpIHtcblx0XHRcdC8vIGxldCBtZXRob2QgPSBcIm09cmV2ZW50XCI7XG5cdFx0XHR1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2IFwiICsgZXZlbnROYW1lKTtcblx0XHRcdC8vIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZldmVudD0ke2VuY29kZVVSSShldmVudE5hbWUpfWA7XG5cdFx0XHQvLyB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcblx0XHRcdC8vIFx0aWYgKHJldCkge1xuXHRcdFx0Ly8gXHRcdHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7bmiJDlip/vvIFcIik7XG5cdFx0XHQvLyBcdH0gZWxzZSB7XG5cdFx0XHQvLyBcdFx0dXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqIFx0XG5cdCAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxuXHQgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxuXHQgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxuXHQgKi9cblx0cHVibGljIHBvc3RMZXZlbChsZXZlbDogc3RyaW5nLCBzdGF0dXM6IExldmVsU3RhdHVzLCBsZXZlbE5hbWU/OiBzdHJpbmcpIHtcblx0XHRpZiAoUGxhdFV0aWxzLklzVGVzdCkge1xuXHRcdFx0Ly8gbGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcblxuXHRcdFx0dXRpbHMuc2hvd0xvZyhg5YWz5Y2hJHtsZXZlbH0sJHtzdGF0dXN9YCk7XG5cdFx0XHQvLyBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmbGV2ZWxfaWQ9JHtsZXZlbH0mbGV2ZWxfbmFtZT0ke2VuY29kZVVSSShsZXZlbE5hbWUpfSZzdGF0dXM9JHtzdGF0dXN9YDtcblx0XHRcdC8vIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xuXHRcdFx0Ly8gXHRpZiAocmV0KSB7XG5cdFx0XHQvLyBcdFx0dXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcblx0XHRcdC8vIFx0fSBlbHNlIHtcblx0XHRcdC8vIFx0XHR1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xuXHRcdFx0Ly8gXHR9XG5cdFx0XHQvLyB9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cblxuXHQvKipcblx0KiDlrp7lkI3orqTor4Fcblx0Ki9cblx0cHVibGljIHJlYWxOYW1lQXV0aChjb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XG5cdFx0aWYgKCF1dGlscy5faXNDb25maWdJbml0KSB7XG5cdFx0XHR1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw5pWw5o2u5pyq5Yid5aeL5YyWIVwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPXJlYWxOYW1lQXV0aFwiXG5cdFx0bGV0IGNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsQmFjaztcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0eGhyLnRpbWVvdXQgPSA2MDAwOyAgICAvLyDljZXkvY3mr6vnp5Jcblx0XHRsZXQgZGF0YTogYW55ID0ge307XG5cdFx0ZGF0YS5reXggPSBmYWxzZTtcblx0XHRkYXRhLmFwcF9pZCA9IFwiNjEwM2I3M2I4NjRhOTU1OGU2ZDY1YWY4XCI7XG5cdFx0ZGF0YS5jaGFubmVsID0gXCJtMjMzXCI7XG5cdFx0ZGF0YS5kZXZpY2VfdWlkID0gMDtcblx0XHRkYXRhLnVpZCA9IFwiNDgyNTAxNjExXCI7XG5cdFx0ZGF0YS5nYW1lX3R5cGUgPSAyO1xuXHRcdGRhdGEuZGV2aWNlX2RhdGEgPSBcIlwiO1xuXHRcdGRhdGEuZ2FtZV92ZXJzaW9uID0gXCIxLjAuMFwiO1xuXHRcdGRhdGEucmVxdiA9IFwiXCI7XG5cdFx0ZGF0YS5hcHBfbGlzdCA9IFwiXCI7XG5cdFx0ZGF0YS5pZF9jYXJkID0gY29kZTtcblx0XHRkYXRhLnJlYWxfbmFtZSA9IG5hbWU7XG5cblx0XHRsZXQgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcblx0XHRsZXQgcmVxdWVzdFVybDogc3RyaW5nID0gXCJodHRwczovL2FwcHMueW91bGVzcC5jb20vZ3NzP1wiICsgbWV0aG9kICsgYCZ0aW1lX3N0YW1wPSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKX0manNvbl9kYXRhPSR7dXRpbHMuYWVzRW5jcnlwdChyZXF1ZXN0RGF0YSl9YDtcblx0XHR1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo5Zyw5Z2AOlwiICsgcmVxdWVzdFVybCk7XG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHJlcXVlc3RVcmwpO1xuXHRcdHhoci5zZW5kKCk7XG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHV0aWxzLnNob3dMb2coXCLor7fmsYLnirbmgIHmlLnlj5gsIHJlYWVkeVN0YXRlPVwiLCB4aHIucmVhZHlTdGF0ZSwgXCI7IHN0YXR1cz1cIiwgeGhyLnN0YXR1cyk7XG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRpZiAoY29tcGxldGVDYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0Y29tcGxldGVDYWxsYmFjayh0cnVlLCB1dGlscy5hZXNEZWNyeXB0KHhoci5yZXNwb25zZVRleHQpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UsIFwiXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoeGhyLnN0YXR1cyAhPSAyMDApIHtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHR4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dXRpbHMuc2hvd0xvZyhcIuivt+axgui2heaXtiFcIik7XG5cdFx0XHRpZiAoY29tcGxldGVDYWxsYmFjaykge1xuXHRcdFx0XHRjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRpZiAoY29tcGxldGVDYWxsYmFjaykge1xuXHRcdFx0XHRjb21wbGV0ZUNhbGxiYWNrKGZhbHNlLCBcIlwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdfQ==