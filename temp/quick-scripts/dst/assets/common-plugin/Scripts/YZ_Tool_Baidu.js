
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Baidu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd56dd0lh79AeZGOtNmRUU2Q', 'YZ_Tool_Baidu');
// common-plugin/Scripts/YZ_Tool_Baidu.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_ServerUrl = "https://apps.youlesp.com/gss?";
var POST_ServerUrl = "https://report.youletd.com/gss?";
// 默认配置
var ST_DefaultServerConfig = "";
var YZ_Tool_Baidu = /** @class */ (function () {
    function YZ_Tool_Baidu() {
        this._recorder = null;
        this._recommendationButton = null;
        this._videoPath = null;
        this._serverConfig = null;
        this._shareCallback = null;
        //@ts-ignore
        this.swan = window.swan;
        this._sysInfo = {};
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        this._loginTime = 0;
        this._loginInterval = 30;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
    }
    Object.defineProperty(YZ_Tool_Baidu.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Baidu.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_Baidu.prototype.gameVersion = function () {
        return Utils_1.utils.config.baiduconfig.version;
    };
    Object.defineProperty(YZ_Tool_Baidu.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Baidu.prototype, "serviceId", {
        /**
         * 服务器返回UID
         */
        get: function () {
            if (this._service_uid != "0")
                return this._service_uid;
            this.reportLogin();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    YZ_Tool_Baidu.prototype._login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curTime, interval, self;
            return __generator(this, function (_a) {
                curTime = new Date().getTime();
                interval = (curTime - this._loginTime) / 1000;
                if (interval > 0 && interval < 30) {
                    Utils_1.utils.showLog("\u767B\u5F55\u8BF7\u6C42\u95F4\u9694\u5C0F\u4E8E\uFF1A" + this._loginInterval + "\u79D2");
                    return [2 /*return*/];
                }
                this._loginTime = curTime;
                self = this;
                Utils_1.utils.showLog("baidu暂时不获取uid，uid全部为0");
                this._uid = "0";
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Baidu.prototype.reportLogin = function () {
        var _this = this;
        if (this.isReport)
            return;
        this.isReport = true;
        var self = this;
        var curTime = new Date().getTime();
        var interval = (curTime - self._reportLoginTime) / 1000;
        console.log(curTime, curTime - self._reportLoginTime, interval);
        if (interval > 0 && interval < 30) {
            Utils_1.utils.showLog("\u4E0A\u62A5\u767B\u5F55\u83B7\u53D6UID\u5C0F\u4E8E\uFF1A" + self._reportLoginInterval + "\u79D2");
            return;
        }
        self._reportLoginTime = curTime;
        var method = "m=login";
        var url = ST_ServerUrl + method + "&device_data=0";
        Utils_1.utils.commomHttpRequest(url, function (ret, data) {
            if (ret) {
                if (data) {
                    var result = JSON.parse(data);
                    Utils_1.utils.showLog("data=" + data);
                    Utils_1.utils.showLog("result=" + result);
                    Utils_1.utils.showLog("result.uid=" + result.uid);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        console.log("self._service_uid:" + self._service_uid);
                        Utils_1.utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_SERVICE_UID, self._service_uid);
                    }
                }
            }
            else {
                Utils_1.utils.showLog("获取数据失败1");
            }
            _this.isReport = false;
        });
    };
    /**
     *
     * @param data 配置数据
     */
    YZ_Tool_Baidu.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.IsBaidu) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.baidu) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.baidu);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            // 获取系统信息
            this._sysInfo = this.swan.getSystemInfoSync();
            if (this._sysInfo) {
                Utils_1.utils.showLog("百度小游戏平台信息: ", JSON.stringify(this._sysInfo));
            }
            else {
                Utils_1.utils.showLog("系统信息获取失败!");
            }
            this._loadConfig();
            if (this.canRecord()) {
                this._recorder = this.swan.getVideoRecorderManager();
                if (this._recorder) {
                    this._recorder.onStart(function (res) {
                        Utils_1.utils.showLog("开始录屏回调: ", res);
                        Utils_1.utils.isRecording = true;
                        cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
                    });
                    this._recorder.onStop(function (res) {
                        Utils_1.utils.showLog("结束录屏回调: ", res.videoPath);
                        Utils_1.utils.isRecording = false;
                        _this._videoPath = res.videoPath;
                        cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    });
                    this._recorder.onError(function (err) {
                        Utils_1.utils.isRecording = false;
                        if (err) {
                            Utils_1.utils.showLog("录屏出错 : ", err.errCode, err.errMsg);
                            cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                        }
                    });
                }
            }
            // 显示左上角的分享菜单
            this.swan.showShareMenu();
            this.swan.onShareAppMessage(function () {
                return _this._getShareInfo();
            });
        }
    };
    YZ_Tool_Baidu.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsBaidu) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("百度服务器配置数据获取成功: data = ", data);
                    if (data) {
                        var result = JSON.parse(data);
                        if (result) {
                            if (!Utils_1.utils.DebugLoacalConfig) {
                                _this._serverConfig = result;
                            }
                            else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        }
                        else {
                            Utils_1.utils.showLog("百度服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("百度服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.baiduconfig.bannerId = _this._serverConfig.banner_pos_id;
                        Utils_1.utils.config.baiduconfig.videoId = _this._serverConfig.video_pos_id;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    /**
     * 显示推荐游戏按钮
     */
    YZ_Tool_Baidu.prototype.showRecommendationButton = function (params) {
        var _this = this;
        var styleParams = params;
        if (PlatUtils_1.default.IsBaidu && this.canShowRecommendButton()) {
            if (false) {
                Utils_1.utils.showLog("按钮存在，直接显示");
                this._recommendationButton.show();
                this._setRecommendBtnStyle(this._recommendationButton, styleParams);
            }
            else {
                Utils_1.utils.showLog("创建并显示");
                this._recommendationButton = this.swan.createRecommendationButton({
                    type: 'list',
                    style: {
                        left: -300,
                        top: -300
                    }
                });
                if (this._recommendationButton) {
                    // 监听按钮资源加载完成
                    this._recommendationButton.onLoad(function () {
                        // 显示按钮
                        _this._recommendationButton.show();
                        _this._setRecommendBtnStyle(_this._recommendationButton, styleParams);
                    });
                    this._recommendationButton.onError(function (err) {
                        if (err) {
                            Utils_1.utils.showLog("交叉推广按钮出错 : ", err.errCode, err.errMsg);
                        }
                    });
                    // 触发资源加载
                    this._recommendationButton.load();
                }
            }
            return this._recommendationButton;
        }
        else {
            return null;
        }
    };
    YZ_Tool_Baidu.prototype._setRecommendBtnStyle = function (btn, params) {
        if (btn) {
            var left = 0;
            var top = 0;
            if (params) {
                Utils_1.utils.showLog("params:", params);
                if (params.left) {
                    left = params.left / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
                }
                else if (params.right) {
                    left = this._sysInfo.screenWidth - params.right / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth - btn.style.width;
                }
                if (params.top) {
                    top = params.top / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight;
                }
                else if (params.bottom) {
                    top = this._sysInfo.screenHeight - params.bottom / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight - btn.style.height;
                }
            }
            Utils_1.utils.showLog("top:" + top + "; left:" + left);
            btn.style.top = top;
            btn.style.left = left;
        }
    };
    /**
     * 隐藏推荐游戏按钮
     */
    YZ_Tool_Baidu.prototype.hideRecommendationButton = function () {
        if (PlatUtils_1.default.IsBaidu && this.canShowRecommendButton()) {
            if (this._recommendationButton) {
                this._recommendationButton.hide();
            }
        }
    };
    /**
    * 开始录屏
    */
    YZ_Tool_Baidu.prototype.recordStart = function () {
        if (PlatUtils_1.default.IsBaidu && this.canRecord()) {
            Utils_1.utils.showLog("开始录屏");
            if (this._recorder) {
                this._recorder.start({
                    duration: 120
                });
            }
        }
    };
    /**
     * 结束录屏
     */
    YZ_Tool_Baidu.prototype.recordEnd = function () {
        if (PlatUtils_1.default.IsBaidu && this.canRecord()) {
            Utils_1.utils.showLog("结束录屏");
            if (this._recorder) {
                this._recorder.stop();
            }
        }
    };
    /**
     * 分享录屏
     */
    YZ_Tool_Baidu.prototype.shareVideo = function () {
        if (PlatUtils_1.default.IsBaidu) {
            if (this._videoPath) {
                var self_1 = this;
                this.swan.shareVideo({
                    videoPath: this._videoPath,
                    success: function () {
                        Utils_1.utils.showLog('分享成功');
                        self_1._videoPath = "";
                        if (self_1._shareCallback) {
                            self_1._shareCallback(true);
                        }
                    },
                    fail: function (res) {
                        self_1._videoPath = "";
                        Utils_1.utils.showLog('分享失败');
                        if (self_1._shareCallback) {
                            self_1._shareCallback(false, "分享失败!");
                        }
                    }
                });
            }
        }
    };
    /**
     * 分享图片
     */
    YZ_Tool_Baidu.prototype.shareImage = function () {
        if (PlatUtils_1.default.IsBaidu) {
            this.swan.shareAppMessage(this._getShareInfo());
        }
    };
    /**
     * 分享，有录屏就分享录屏，没有录屏就分享图片
     */
    YZ_Tool_Baidu.prototype.share = function (callback) {
        if (PlatUtils_1.default.IsBaidu) {
            this._shareCallback = callback;
            if (this._videoPath) {
                this.shareVideo();
            }
            else {
                this.shareImage();
            }
        }
    };
    YZ_Tool_Baidu.prototype._getShareInfo = function () {
        if (PlatUtils_1.default.IsBaidu) {
            var shareInfo = Utils_1.utils.getShareInfo();
            var self_2 = this;
            if (shareInfo) {
                return {
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl,
                    success: function (res) {
                        if (self_2._shareCallback) {
                            self_2._shareCallback(true);
                        }
                        Utils_1.utils.showLog("分享成功!");
                    },
                    fail: function (err) {
                        if (self_2._shareCallback) {
                            self_2._shareCallback(false, "分享失败!");
                        }
                        Utils_1.utils.showLog("分享失败!");
                    }
                };
            }
        }
        return {};
    };
    /**
     * 是否可以录屏
     */
    YZ_Tool_Baidu.prototype.canRecord = function () {
        if (PlatUtils_1.default.IsBaidu) {
            if (this._sysInfo) {
                return this._compareVersion(this._sysInfo.SDKVersion, "1.4.1") && PlatUtils_1.default.IsAndroid;
            }
            return false;
        }
        return false;
    };
    /**
     * 是否可以显示交叉推广按钮
     */
    YZ_Tool_Baidu.prototype.canShowRecommendButton = function () {
        if (PlatUtils_1.default.IsBaidu) {
            if (this._sysInfo) {
                return this._compareVersion(this._sysInfo.SDKVersion, "1.5.2") && PlatUtils_1.default.IsAndroid;
            }
            return false;
        }
        return false;
    };
    /**
    * 是否可以显示添加到我的小程序引导
    */
    YZ_Tool_Baidu.prototype.canShowFavoriteGuide = function () {
        if (PlatUtils_1.default.IsBaidu) {
            if (this._sysInfo) {
                return this._compareVersion(this._sysInfo.SDKVersion, "1.7.2");
            }
            return false;
        }
        return false;
    };
    YZ_Tool_Baidu.prototype._compareVersion = function (first, second) {
        return parseInt(first.split(".").join("")) >= parseInt(second.split(".").join(""));
    };
    /**
     * 跳转到指定的小游戏
     * @param pkgName 包名
     * @param callback Function(ret) 跳转回调. ret: true | false
     */
    YZ_Tool_Baidu.prototype.navigateToMiniGame = function (pkgName, callback) {
        if (PlatUtils_1.default.IsBaidu) {
            var completeCallback_1 = callback;
            if (!pkgName) {
                Utils_1.utils.showLog("跳转ID为null");
                if (completeCallback_1) {
                    completeCallback_1(false);
                }
                return;
            }
            this.swan.navigateToMiniProgram({
                appKey: pkgName,
                path: "",
                extraData: {},
                success: function (res) {
                    Utils_1.utils.showLog("跳转成功！");
                    if (completeCallback_1) {
                        completeCallback_1(true);
                    }
                },
                fail: function (error) {
                    Utils_1.utils.showLog("跳转失败!");
                    if (completeCallback_1) {
                        completeCallback_1(false);
                    }
                }
            });
        }
    };
    /**
     * 上报数据
     */
    YZ_Tool_Baidu.prototype.postData = function (otherGameAppId) {
        if (PlatUtils_1.default.IsBaidu) {
            var appid = Utils_1.utils.config.baiduconfig.appID;
            var uid = "0";
            var channel = "baidu";
            var method = "m=jump";
            var url = POST_ServerUrl + " + " + method + " + &app_id=" + appid + "&uid=" + uid + "&channel=" + channel + "&jump_app_id=" + otherGameAppId;
            Utils_1.utils.showLog("上报数据, url=", url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("数据上报失败！");
                }
            });
        }
    };
    /**
     * 获取交叉推广数据
     */
    YZ_Tool_Baidu.prototype.getRecommondGameList = function () {
        if (PlatUtils_1.default.IsBaidu
            && Utils_1.utils.Tool_Baidu
            && Utils_1.utils.Tool_Baidu.ServerConfig) {
            return Utils_1.utils.Tool_Baidu.ServerConfig.jump_list;
        }
        return null;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Baidu.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsBaidu) {
            var method = "m=rlevel";
            var url = POST_ServerUrl + method + ("&level_id=" + level + "&level_name=" + encodeURI(levelName) + "&status=" + status);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("关卡数据上报成功！");
                }
                else {
                    Utils_1.utils.showLog("关卡数据上报失败！");
                }
            }.bind(this));
        }
    };
    /**
  * 上报自定义事件
  * @param level 当前关卡ID
  * @param levelName 关卡名称
  * @param status 状态
  */
    YZ_Tool_Baidu.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsBaidu) {
            var method = "m=revent";
            var url = POST_ServerUrl + method + ("&event=" + encodeURI(eventName));
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("上报自定义事件成功！");
                }
                else {
                    Utils_1.utils.showLog("上报自定义事件失败！");
                }
            }.bind(this));
        }
    };
    /**
     * 弹出提示框
     * @param msg 消息
     */
    YZ_Tool_Baidu.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsBaidu) {
            //@ts-ignore
            swan.showToast({
                title: msg,
                icon: "none",
                duration: 2000,
                success: function (res) {
                    console.log("" + res);
                },
                fail: function (res) {
                    console.log("showToast\u8C03\u7528\u5931\u8D25");
                }
            });
        }
    };
    YZ_Tool_Baidu = __decorate([
        ccclass
    ], YZ_Tool_Baidu);
    return YZ_Tool_Baidu;
}());
exports.default = YZ_Tool_Baidu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9CYWlkdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFDaEMsNkNBQXlEO0FBQ3pELHFEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLFlBQVksR0FBVywrQkFBK0IsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBVyxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPO0FBQ1AsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFFeEM7SUFBQTtRQUNJLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsMEJBQXFCLEdBQVEsSUFBSSxDQUFDO1FBQ2xDLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFFMUIsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFDMUIsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFFaEMsWUFBWTtRQUNaLFNBQUksR0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBS3hCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFZbkIsT0FBTztRQUNQLFNBQUksR0FBVyxHQUFHLENBQUM7UUFRbkIsVUFBVTtRQUNWLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBWTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFpQjVCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFZLEtBQUssQ0FBQztJQXFmOUIsQ0FBQztJQS9pQkcsc0JBQVcsdUNBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFH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QUFJLEdBQUcsR0FBVyxjQUFjLEdBQUcsTUFBTSxJQUFHLFlBQVUsU0FBUyxDQUFDLFNBQVMsQ0FBRyxDQUFBLENBQUM7WUFDN0UsYUFBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJO2dCQUM1QyxJQUFJLEdBQUcsRUFBRTtvQkFDTCxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMvQjtZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFHRDs7O09BR0c7SUFDSSxpQ0FBUyxHQUFoQixVQUFpQixHQUFXO1FBQ3hCLElBQUksbUJBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkIsWUFBWTtZQUNaLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxZQUFDLEdBQUc7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFHLEdBQUssQ0FBQyxDQUFDO2dCQUMxQixDQUFDO2dCQUNELElBQUksWUFBQyxHQUFHO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQWUsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBeGpCZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXlqQmpDO0lBQUQsb0JBQUM7Q0F6akJELEFBeWpCQyxJQUFBO2tCQXpqQm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vcmVwb3J0LnlvdWxldGQuY29tL2dzcz9cIjtcclxuLy8g6buY6K6k6YWN572uXHJcbmxldCBTVF9EZWZhdWx0U2VydmVyQ29uZmlnOiBzdHJpbmcgPSBcIlwiO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX0JhaWR1IHtcclxuICAgIF9yZWNvcmRlcjogYW55ID0gbnVsbDtcclxuICAgIF9yZWNvbW1lbmRhdGlvbkJ1dHRvbjogYW55ID0gbnVsbDtcclxuICAgIF92aWRlb1BhdGg6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgX3NlcnZlckNvbmZpZzogYW55ID0gbnVsbDtcclxuICAgIF9zaGFyZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBzd2FuOiBhbnkgPSB3aW5kb3cuc3dhbjtcclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgX3N5c0luZm86IGFueSA9IHt9O1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54mI5pys5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5jb25maWcuYmFpZHVjb25maWcudmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIC8vIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfbG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBhc3luYyBfbG9naW4oKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IDMwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOeZu+W9leivt+axgumXtOmalOWwj+S6ju+8miR7dGhpcy5fbG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiYmFpZHXmmoLml7bkuI3ojrflj5Z1aWTvvIx1aWTlhajpg6jkuLowXCIpO1xyXG4gICAgICAgIHRoaXMuX3VpZCA9IFwiMFwiO1xyXG4gICAgICAgIC8vIHRoaXMucmVwb3J0TG9naW4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXJUaW1lLCBjdXJUaW1lIC0gc2VsZi5fcmVwb3J0TG9naW5UaW1lLCBpbnRlcnZhbClcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHtzZWxmLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhPVwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdC51aWQ9XCIgKyByZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGYuX3NlcnZpY2VfdWlkOlwiICsgc2VsZi5fc2VydmljZV91aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajor7fmsYLnmbvlvZXmiJDlip8hIF9zZXJ2aWNlX3VpZD1cIiArIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQsIHNlbGYuX3NlcnZpY2VfdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5pWw5o2u5aSx6LSlMVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmouYmFpZHUpIHtcclxuICAgICAgICAgICAgICAgICAgICBTVF9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLmJhaWR1KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSB0aGlzLl9zZXJ2aWNlX3VpZCA/IHRoaXMuX3NlcnZpY2VfdWlkIDogXCIwXCI7XHJcblxyXG4gICAgICAgICAgICAvLyDojrflj5bns7vnu5/kv6Hmga9cclxuICAgICAgICAgICAgdGhpcy5fc3lzSW5mbyA9IHRoaXMuc3dhbi5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueZvuW6puWwj+a4uOaIj+W5s+WPsOS/oeaBrzogXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX3N5c0luZm8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLns7vnu5/kv6Hmga/ojrflj5blpLHotKUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5SZWNvcmQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIgPSB0aGlzLnN3YW4uZ2V0VmlkZW9SZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWNvcmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLm9uU3RhcnQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5b2V5bGP5Zue6LCDOiBcIiwgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuaXNSZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJZWl9Db21tb25NZXNzYWdlXCIsIHsgdHlwZTogXCJZWl9SZWNvcmRTdGFydFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5vblN0b3AoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT5p2f5b2V5bGP5Zue6LCDOiBcIiwgcmVzLnZpZGVvUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmlzUmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvUGF0aCA9IHJlcy52aWRlb1BhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChcIllaX0NvbW1vbk1lc3NhZ2VcIiwgeyB0eXBlOiBcIllaX1JlY29yZEVuZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9leWxj+WHuumUmSA6IFwiLCBlcnIuZXJyQ29kZSwgZXJyLmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJZWl9Db21tb25NZXNzYWdlXCIsIHsgdHlwZTogXCJZWl9SZWNvcmRFbmRcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOaYvuekuuW3puS4iuinkueahOWIhuS6q+iPnOWNlVxyXG4gICAgICAgICAgICB0aGlzLnN3YW4uc2hvd1NoYXJlTWVudSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN3YW4ub25TaGFyZUFwcE1lc3NhZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNoYXJlSW5mbygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWRDb25maWcoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwibT1nXCI7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnmb7luqbmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueZvuW6puacjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnmb7luqbmnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5iYWlkdWNvbmZpZy5iYW5uZXJJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcuYmFpZHVjb25maWcudmlkZW9JZCA9IHRoaXMuX3NlcnZlckNvbmZpZy52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacrOWcsOmFjee9rueahOW5v+WRiklEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaOqOiNkOa4uOaIj+aMiemSrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1JlY29tbWVuZGF0aW9uQnV0dG9uKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgbGV0IHN0eWxlUGFyYW1zOiBhbnkgPSBwYXJhbXM7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1ICYmIHRoaXMuY2FuU2hvd1JlY29tbWVuZEJ1dHRvbigpKSB7XHJcbiAgICAgICAgICAgIGlmIChmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaMiemSruWtmOWcqO+8jOebtOaOpeaYvuekulwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZGF0aW9uQnV0dG9uLnNob3coKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldFJlY29tbWVuZEJ0blN0eWxlKHRoaXMuX3JlY29tbWVuZGF0aW9uQnV0dG9uLCBzdHlsZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yib5bu65bm25pi+56S6XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kYXRpb25CdXR0b24gPSB0aGlzLnN3YW4uY3JlYXRlUmVjb21tZW5kYXRpb25CdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaXN0JyxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAtMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC0zMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVjb21tZW5kYXRpb25CdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnm5HlkKzmjInpkq7otYTmupDliqDovb3lrozmiJBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvbW1lbmRhdGlvbkJ1dHRvbi5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmmL7npLrmjInpkq5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kYXRpb25CdXR0b24uc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRSZWNvbW1lbmRCdG5TdHlsZSh0aGlzLl9yZWNvbW1lbmRhdGlvbkJ1dHRvbiwgc3R5bGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvbW1lbmRhdGlvbkJ1dHRvbi5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS6pOWPieaOqOW5v+aMiemSruWHuumUmSA6IFwiLCBlcnIuZXJyQ29kZSwgZXJyLmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Kem5Y+R6LWE5rqQ5Yqg6L29XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kYXRpb25CdXR0b24ubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb21tZW5kYXRpb25CdXR0b247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zZXRSZWNvbW1lbmRCdG5TdHlsZShidG46IGFueSwgcGFyYW1zOiBhbnkpIHtcclxuICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgdG9wOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInBhcmFtczpcIiwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBwYXJhbXMubGVmdCAvIGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKS53aWR0aCAqIHRoaXMuX3N5c0luZm8uc2NyZWVuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSB0aGlzLl9zeXNJbmZvLnNjcmVlbldpZHRoIC0gcGFyYW1zLnJpZ2h0IC8gY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoICogdGhpcy5fc3lzSW5mby5zY3JlZW5XaWR0aCAtIGJ0bi5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHBhcmFtcy50b3AgLyBjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCkuaGVpZ2h0ICogdGhpcy5fc3lzSW5mby5zY3JlZW5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5ib3R0b20pIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSB0aGlzLl9zeXNJbmZvLnNjcmVlbkhlaWdodCAtIHBhcmFtcy5ib3R0b20gLyBjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCkuaGVpZ2h0ICogdGhpcy5fc3lzSW5mby5zY3JlZW5IZWlnaHQgLSBidG4uc3R5bGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGB0b3A6JHt0b3B9OyBsZWZ0OiR7bGVmdH1gKTtcclxuICAgICAgICAgICAgYnRuLnN0eWxlLnRvcCA9IHRvcDtcclxuICAgICAgICAgICAgYnRuLnN0eWxlLmxlZnQgPSBsZWZ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+aOqOiNkOa4uOaIj+aMiemSrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZVJlY29tbWVuZGF0aW9uQnV0dG9uKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSAmJiB0aGlzLmNhblNob3dSZWNvbW1lbmRCdXR0b24oKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjb21tZW5kYXRpb25CdXR0b24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZGF0aW9uQnV0dG9uLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5byA5aeL5b2V5bGPXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHJlY29yZFN0YXJ0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSAmJiB0aGlzLmNhblJlY29yZCgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlvZXlsY9cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWNvcmRlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIuc3RhcnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWNvcmRFbmQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1ICYmIHRoaXMuY2FuUmVjb3JkKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+adn+W9leWxj1wiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqvlvZXlsY9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNoYXJlVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb1BhdGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhbi5zaGFyZVZpZGVvKHtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHRoaXMuX3ZpZGVvUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfliIbkuqvmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9QYXRoID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3NoYXJlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3NoYXJlQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZpZGVvUGF0aCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+WIhuS6q+Wksei0pScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hhcmVDYWxsYmFjayhmYWxzZSwgXCLliIbkuqvlpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqvlm77niYdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNoYXJlSW1hZ2UoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhbi5zaGFyZUFwcE1lc3NhZ2UodGhpcy5fZ2V0U2hhcmVJbmZvKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIhuS6q++8jOacieW9leWxj+WwseWIhuS6q+W9leWxj++8jOayoeacieW9leWxj+WwseWIhuS6q+WbvueJh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hhcmUoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZVZpZGVvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlSW1hZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0U2hhcmVJbmZvKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICBsZXQgc2hhcmVJbmZvID0gdXRpbHMuZ2V0U2hhcmVJbmZvKCk7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHNoYXJlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2hhcmVJbmZvLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBzaGFyZUluZm8uaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hhcmVDYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YiG5Lqr5oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3NoYXJlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3NoYXJlQ2FsbGJhY2soZmFsc2UsIFwi5YiG5Lqr5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YiG5Lqr5aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Y+v5Lul5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5SZWNvcmQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zeXNJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVZlcnNpb24odGhpcy5fc3lzSW5mby5TREtWZXJzaW9uLCBcIjEuNC4xXCIpICYmIFBsYXRVdGlscy5Jc0FuZHJvaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblj6/ku6XmmL7npLrkuqTlj4nmjqjlub/mjInpkq5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhblNob3dSZWNvbW1lbmRCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zeXNJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVZlcnNpb24odGhpcy5fc3lzSW5mby5TREtWZXJzaW9uLCBcIjEuNS4yXCIpICYmIFBsYXRVdGlscy5Jc0FuZHJvaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaYr+WQpuWPr+S7peaYvuekuua3u+WKoOWIsOaIkeeahOWwj+eoi+W6j+W8leWvvFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBjYW5TaG93RmF2b3JpdGVHdWlkZSgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N5c0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlVmVyc2lvbih0aGlzLl9zeXNJbmZvLlNES1ZlcnNpb24sIFwiMS43LjJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfY29tcGFyZVZlcnNpb24oZmlyc3Q6IHN0cmluZywgc2Vjb25kOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZmlyc3Quc3BsaXQoXCIuXCIpLmpvaW4oXCJcIikpID49IHBhcnNlSW50KHNlY29uZC5zcGxpdChcIi5cIikuam9pbihcIlwiKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5Yiw5oyH5a6a55qE5bCP5ri45oiPXHJcbiAgICAgKiBAcGFyYW0gcGtnTmFtZSDljIXlkI1cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbihyZXQpIOi3s+i9rOWbnuiwgy4gcmV0OiB0cnVlIHwgZmFsc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hdmlnYXRlVG9NaW5pR2FtZShwa2dOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICBsZXQgY29tcGxldGVDYWxsYmFjazogRnVuY3Rpb24gPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgaWYgKCFwa2dOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6Lez6L2sSUTkuLpudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zd2FuLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgICAgICBhcHBLZXk6IHBrZ05hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZXh0cmFEYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6Lez6L2s5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLot7PovazlpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0RGF0YShvdGhlckdhbWVBcHBJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGxldCBhcHBpZDogc3RyaW5nID0gdXRpbHMuY29uZmlnLmJhaWR1Y29uZmlnLmFwcElEO1xyXG4gICAgICAgICAgICBsZXQgdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9IFwiYmFpZHVcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1qdW1wXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IGAke1BPU1RfU2VydmVyVXJsfSArICR7bWV0aG9kfSArICZhcHBfaWQ9JHthcHBpZH0mdWlkPSR7dWlkfSZjaGFubmVsPSR7Y2hhbm5lbH0manVtcF9hcHBfaWQ9JHtvdGhlckdhbWVBcHBJZH1gO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5pWw5o2uLCB1cmw9XCIsIHVybCk7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS6pOWPieaOqOW5v+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tb25kR2FtZUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1XHJcbiAgICAgICAgICAgICYmIHV0aWxzLlRvb2xfQmFpZHVcclxuICAgICAgICAgICAgJiYgdXRpbHMuVG9vbF9CYWlkdS5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWxzLlRvb2xfQmFpZHUuU2VydmVyQ29uZmlnLmp1bXBfbGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXlhbPljaHmlbDmja5cclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0TGV2ZWwobGV2ZWw6IHN0cmluZywgc3RhdHVzOiBMZXZlbFN0YXR1cywgbGV2ZWxOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmxldmVsXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG4gICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJldmVudFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZXZlbnQ9JHtlbmNvZGVVUkkoZXZlbnROYW1lKX1gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu25oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu25aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvLnlh7rmj5DnpLrmoYZcclxuICAgICAqIEBwYXJhbSBtc2cg5raI5oGvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93VG9hc3QobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHN3YW4uc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBtc2csXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtyZXN9YCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hvd1RvYXN06LCD55So5aSx6LSlYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=