"use strict";
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