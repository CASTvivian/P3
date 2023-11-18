"use strict";
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