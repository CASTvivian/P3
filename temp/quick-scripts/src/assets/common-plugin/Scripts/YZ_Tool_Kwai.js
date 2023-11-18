"use strict";
cc._RF.push(module, '8a530Okg5dP5L+U8tqkTRVh', 'YZ_Tool_Kwai');
// common-plugin/Scripts/YZ_Tool_Kwai.ts

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
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
// 默认配置
var ST_DefaultServerConfig = "";
var YZ_Tool_Kwai = /** @class */ (function () {
    function YZ_Tool_Kwai() {
        this._recorder = null;
        this._videoPath = null;
        this._shareCallback = null;
        this.recorderStarTime = 0; //开始录屏时间
        this.isAutoShare = true; //是否自动分享
        this.isClickEnd = false;
        this._serverConfig = null;
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
        //@ts-ignore
        this.kwaigame = kwaigame;
        this._canShowRecord = false;
    }
    Object.defineProperty(YZ_Tool_Kwai.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Kwai.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_Kwai.prototype.gameVersion = function () {
        return Utils_1.utils.config.kwaiConfig.version;
    };
    Object.defineProperty(YZ_Tool_Kwai.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Kwai.prototype, "serviceId", {
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
    YZ_Tool_Kwai.prototype._login = function () {
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
    YZ_Tool_Kwai.prototype.reportLogin = function () {
        var _this = this;
        if (this.isReport)
            return;
        this.isReport = true;
        var self = this;
        var curTime = new Date().getTime();
        var interval = (curTime - self._reportLoginTime) / 1000;
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
    YZ_Tool_Kwai.prototype.init = function (data) {
        if (PlatUtils_1.default.IsKwai) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.kwai) {
                    Utils_1.utils.showLog("本地配置数据:" + JSON.stringify(configObj.kwai));
                    ST_DefaultServerConfig = JSON.stringify(configObj.kwai);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            // // 获取系统信息
            // this._sysInfo = this.swan.getSystemInfoSync();
            // if (this._sysInfo) {
            //     utils.showLog("百度小游戏平台信息: ", JSON.stringify(this._sysInfo));
            // } else {
            //     utils.showLog("系统信息获取失败!");
            // }
            this._loadConfig();
            this.initRecord();
            // utils.emitServerInitEvent();
        }
    };
    YZ_Tool_Kwai.prototype.readyGo = function () {
        this.kwaigame.readyGo();
    };
    YZ_Tool_Kwai.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsKwai) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("快手服务器配置数据获取成功: data = ", data);
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
                            Utils_1.utils.showLog("快手服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("快手服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.shares && _this._serverConfig.shares.sy_title) {
                        Utils_1.utils.config.otherconfig.shareTitle = _this._serverConfig.shares.sy_title;
                    }
                    if (_this._serverConfig.shares && _this._serverConfig.shares.sy_img) {
                        Utils_1.utils.config.otherconfig.shareImgUrl = _this._serverConfig.shares.sy_img;
                    }
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.kwaiConfig.videoId = _this._serverConfig.video_pos_id;
                        Utils_1.utils.config.kwaiConfig.insertId = _this._serverConfig.intersititia_pos_id || Utils_1.utils.config.kwaiConfig.insertId;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    YZ_Tool_Kwai.prototype.initRecord = function () {
        var _this = this;
        if (!this.checkCanShowRecored()) {
            Utils_1.utils.showLog("当前平台不支持录屏组件！");
            return;
        }
        this._recorder = this.kwaigame.createMediaRecorder();
        if (this._recorder) {
            this._recorder.init({
                callback: function (error) {
                    if (error) {
                        Utils_1.utils.showLog("录屏初始化失败: " + JSON.stringify(error));
                        _this._recorder = null;
                        return;
                    }
                    Utils_1.utils.showLog("录屏初始化成功");
                }
            });
            this._recorder.onError({
                listener: function (error) {
                    Utils_1.utils.isRecording = false;
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    Utils_1.utils.showLog("录屏终止: " + JSON.stringify(error));
                }
            });
        }
        // if (this._recorder) {
        //     this._recorder.onStart((res) => {
        //         self._videoPath = "";
        //         this.isClickEnd = false;
        //         this.is_auto_share_video = false;
        //         utils.isRecording = true;
        //         console.log("录屏开始>>>");
        //         utils.showLog('录屏开始');
        //         this.recorderStarTime = new Date().getTime();
        //         cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
        //     });
        //     this._recorder.onStop((res) => {
        //         utils.showLog("录屏结束 :" + res.videoPath);
        //         utils.isRecording = false;
        //         cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
        //         let curTime: number = new Date().getTime();
        //         let interval: number = (curTime - this.recorderStarTime) / 1000;
        //         if (interval > 3) {
        //             self._videoPath = res.videoPath;
        //             utils.showLog("录屏时间大于3秒", interval);
        //             if (this.isAutoShare) {
        //                 if (this.isClickEnd) {
        //                     this.shareVideo();
        //                     this._shareCallback = null;
        //                     this.is_auto_share_video = true;
        //                 } else if (utils.checkResultShow(1)) {
        //                     utils.showLog("满足自动分享条件，弹出分享窗口！");
        //                     if (utils.rewardCloseFunc == null) {
        //                         utils.rewardValue = 0;
        //                         utils.showShareRecordPanel();
        //                     }
        //                 } else if (interval > 100) {
        //                     if (utils.rewardCloseFunc == null) {
        //                         utils.rewardValue = 0;
        //                         utils.showShareRecordPanel();
        //                     }
        //                 }
        //             } else {
        //                 this.isAutoShare = true;
        //             }
        //         } else {
        //             //@ts-ignore
        //             if (this.isClickEnd) {
        //                 this.tt.showToast({
        //                     title: "录屏时间小于3秒!",
        //                     icon: "fail",
        //                     duration: 2000,
        //                     success(res) {
        //                         console.log(`${res}`);
        //                     },
        //                     fail(res) {
        //                         console.log(`showToast调用失败`);
        //                     }
        //                 });
        //             }
        //             self._videoPath = "";
        //             utils.showLog("录屏时间小于3秒，录录屏地址置空！");
        //         }
        //     });
        // }
    };
    /**
     * 分享，有录屏就分享录屏，没有录屏就分享图片
     */
    YZ_Tool_Kwai.prototype.share = function (callback) {
        if (PlatUtils_1.default.IsKwai) {
            this._shareCallback = callback;
            if (this.recorderStarTime > 0) {
                this.shareVideo();
            }
            else {
                this.shareImage();
            }
        }
    };
    /**
     * 验证是否支持录屏
     */
    YZ_Tool_Kwai.prototype.checkCanShowRecored = function () {
        return this.kwaigame.isSupport(this.kwaigame.Support.features.Recorder);
    };
    /**
     * 分享录屏
     */
    YZ_Tool_Kwai.prototype.shareVideo = function () {
        var _this = this;
        if (this._recorder) {
            if (!this._canShowRecord) {
                this._shareCallback && this._shareCallback(false, "录屏时间不足!");
                return;
            }
            this._recorder.publishVideo({
                callback: function (error) {
                    if (error) {
                        Utils_1.utils.showLog("分享录屏失败: " + JSON.stringify(error));
                        _this._shareCallback && _this._shareCallback(false, "分享录屏失败!");
                        return;
                    }
                    _this._canShowRecord = false;
                    Utils_1.utils.showLog("分享录屏成功");
                    _this._shareCallback && _this._shareCallback(true, "分享录屏成功!");
                }
            });
        }
        else {
            if (this.checkCanShowRecored()) {
                Utils_1.utils.showLog("当前平台不支持录屏组件！");
            }
            else {
                Utils_1.utils.showLog("录屏初始化失败！");
            }
            this._shareCallback && this._shareCallback(false, "分享录屏失败!");
        }
    };
    /**
     * 开始录屏
     */
    YZ_Tool_Kwai.prototype.recordStart = function () {
        var _this = this;
        if (this._recorder) {
            this._recorder.start({
                callback: function (error) {
                    if (error) {
                        Utils_1.utils.isRecording = false;
                        Utils_1.utils.showLog("开始录屏失败: " + JSON.stringify(error));
                        return;
                    }
                    _this._canShowRecord = false;
                    Utils_1.utils.isRecording = true;
                    _this.recorderStarTime = new Date().getTime();
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
                    Utils_1.utils.showLog("开始录屏成功");
                }
            });
        }
    };
    /**
     * 结束录屏
     */
    YZ_Tool_Kwai.prototype.recordEnd = function () {
        var _this = this;
        if (this._recorder) {
            this._recorder.stop({
                callback: function (error) {
                    Utils_1.utils.isRecording = false;
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    _this._canShowRecord = false;
                    if (error) {
                        Utils_1.utils.showLog("停止录屏失败: " + JSON.stringify(error));
                        return;
                    }
                    Utils_1.utils.showLog("停止录屏成功");
                    var curTime = new Date().getTime();
                    var interval = (curTime - _this.recorderStarTime) / 1000;
                    if (interval > 3) {
                        _this._canShowRecord = true;
                        Utils_1.utils.showLog("录屏时间大于3秒", interval, " isClickEnd=", _this.isClickEnd);
                        if (_this.isAutoShare) {
                            if (_this.isClickEnd) {
                                _this.shareVideo();
                                _this._shareCallback = null;
                            }
                            else if (Utils_1.utils.checkResultShow(1)) {
                                Utils_1.utils.showLog("满足自动分享条件，弹出分享窗口！");
                                if (Utils_1.utils.rewardCloseFunc == null) {
                                    Utils_1.utils.rewardValue = 0;
                                    Utils_1.utils.showShareRecordPanel();
                                }
                            }
                            else if (interval > 100) {
                                if (Utils_1.utils.rewardCloseFunc == null) {
                                    Utils_1.utils.rewardValue = 0;
                                    Utils_1.utils.showShareRecordPanel();
                                }
                            }
                        }
                        else {
                            _this.isAutoShare = true;
                        }
                    }
                    else {
                        //@ts-ignore
                        if (_this.isClickEnd) {
                            //     this.tt.showToast({
                            //         title: "录屏时间小于3秒!",
                            //         icon: "fail",
                            //         duration: 2000,
                            //         success(res) {
                            //             console.log(`${res}`);
                            //         },
                            //         fail(res) {
                            //             console.log(`showToast调用失败`);
                            //         }
                            //     });
                        }
                        // self._videoPath = "";
                        Utils_1.utils.showLog("录屏时间小于3秒，录录屏地址置空！");
                    }
                }
            });
        }
    };
    YZ_Tool_Kwai.prototype.shareImage = function () {
        this.kwaigame.shareToMsg(this._getShareInfo());
    };
    YZ_Tool_Kwai.prototype._getShareInfo = function () {
        var _this = this;
        var params = {};
        params.title = Utils_1.utils.config.otherconfig.shareTitle;
        params.desc = Utils_1.utils.config.otherconfig.shareDesc ? Utils_1.utils.config.otherconfig.shareDesc : Utils_1.utils.config.otherconfig.shareTitle;
        params.iconUrl = Utils_1.utils.config.otherconfig.shareIcon ? Utils_1.utils.config.otherconfig.shareIcon : Utils_1.utils.config.otherconfig.shareImgUrl;
        params.imageUrl = Utils_1.utils.config.otherconfig.shareImgUrl;
        params.extension = {
            isShare: "share"
        };
        params.response = function (result) {
            Utils_1.utils.showLog("分享完成: " + JSON.stringify(result));
            _this._shareCallback && _this._shareCallback(true, "分享成功!");
        };
        return params;
    };
    /**
    * 上报关卡数据
    * @param level 当前关卡ID
    * @param levelName 关卡名称
    * @param status 状态
    */
    YZ_Tool_Kwai.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsKwai) {
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
    YZ_Tool_Kwai.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsKwai) {
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
    YZ_Tool_Kwai.prototype._compareVersion = function (first, second) {
        return parseInt(first.split(".").join("")) >= parseInt(second.split(".").join(""));
    };
    YZ_Tool_Kwai = __decorate([
        ccclass
    ], YZ_Tool_Kwai);
    return YZ_Tool_Kwai;
}());
exports.default = YZ_Tool_Kwai;

cc._RF.pop();