
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Kwai.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9Ld2FpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyw2Q0FBeUQ7QUFDekQscURBQWdEO0FBRTFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQU0sWUFBWSxHQUFXLDhCQUE4QixDQUFDO0FBQzVELElBQU0sY0FBYyxHQUFXLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU87QUFDUCxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUV4QztJQUFBO1FBQ0ksY0FBUyxHQUFRLElBQUksQ0FBQztRQUN0QixlQUFVLEdBQVcsSUFBSSxDQUFDO1FBRTFCLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLHFCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDdEMsZ0JBQVcsR0FBWSxJQUFJLENBQUMsQ0FBRSxRQUFRO1FBQ3RDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFNMUIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQWNuQixPQUFPO1FBQ1AsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQVFuQixVQUFVO1FBQ1YsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFZM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQWlCNUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFlBQVk7UUFDWixhQUFRLEdBQVEsUUFBUSxDQUFDO1FBOFN6QixtQkFBYyxHQUFZLEtBQUssQ0FB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O0lBRUQ7Ozs7O0tBS0M7SUFDTSxnQ0FBUyxHQUFoQixVQUFpQixTQUFpQjtRQUM5QixJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUN4QixJQUFJLEdBQUcsR0FBVyxjQUFjLEdBQUcsTUFBTSxJQUFHLFlBQVUsU0FBUyxDQUFDLFNBQVMsQ0FBRyxDQUFBLENBQUM7WUFDN0UsYUFBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJO2dCQUM1QyxJQUFJLEdBQUcsRUFBRTtvQkFDTCxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMvQjtZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFJRCxzQ0FBZSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxNQUFjO1FBQ3pDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQWpnQmdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FtZ0JoQztJQUFELG1CQUFDO0NBbmdCRCxBQW1nQkMsSUFBQTtrQkFuZ0JvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgTGV2ZWxTdGF0dXMgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9yZXBvcnQueW91bGVzcC5jb20vZ3NzP1wiO1xyXG4vLyDpu5jorqTphY3nva5cclxubGV0IFNUX0RlZmF1bHRTZXJ2ZXJDb25maWc6IHN0cmluZyA9IFwiXCI7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlaX1Rvb2xfS3dhaSB7XHJcbiAgICBfcmVjb3JkZXI6IGFueSA9IG51bGw7XHJcbiAgICBfdmlkZW9QYXRoOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIF9zaGFyZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIHJlY29yZGVyU3RhclRpbWU6IG51bWJlciA9IDA7IC8v5byA5aeL5b2V5bGP5pe26Ze0XHJcbiAgICBpc0F1dG9TaGFyZTogYm9vbGVhbiA9IHRydWU7ICAvL+aYr+WQpuiHquWKqOWIhuS6q1xyXG4gICAgaXNDbGlja0VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlckNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBfc3lzSW5mbzogYW55ID0ge307XHJcbiAgICBwdWJsaWMgZ2V0IFN5c0luZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0luZm87XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54mI5pys5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5jb25maWcua3dhaUNvbmZpZy52ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIC8vIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfbG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBhc3luYyBfbG9naW4oKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IDMwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOeZu+W9leivt+axgumXtOmalOWwj+S6ju+8miR7dGhpcy5fbG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiYmFpZHXmmoLml7bkuI3ojrflj5Z1aWTvvIx1aWTlhajpg6jkuLowXCIpO1xyXG4gICAgICAgIHRoaXMuX3VpZCA9IFwiMFwiO1xyXG4gICAgICAgIC8vIHRoaXMucmVwb3J0TG9naW4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGt3YWlnYW1lOiBhbnkgPSBrd2FpZ2FtZTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHtzZWxmLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhPVwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdC51aWQ9XCIgKyByZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluaVsOaNruWksei0pTFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNLd2FpKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai5rd2FpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacrOWcsOmFjee9ruaVsOaNrjpcIiArIEpTT04uc3RyaW5naWZ5KGNvbmZpZ09iai5rd2FpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgU1RfRGVmYXVsdFNlcnZlckNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ09iai5rd2FpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSB0aGlzLl9zZXJ2aWNlX3VpZCA/IHRoaXMuX3NlcnZpY2VfdWlkIDogXCIwXCI7XHJcblxyXG4gICAgICAgICAgICAvLyAvLyDojrflj5bns7vnu5/kv6Hmga9cclxuICAgICAgICAgICAgLy8gdGhpcy5fc3lzSW5mbyA9IHRoaXMuc3dhbi5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5fc3lzSW5mbykge1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcIueZvuW6puWwj+a4uOaIj+W5s+WPsOS/oeaBrzogXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX3N5c0luZm8pKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCLns7vnu5/kv6Hmga/ojrflj5blpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFJlY29yZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZWFkeUdvKCkge1xyXG4gICAgICAgIHRoaXMua3dhaWdhbWUucmVhZHlHbygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwibT1nXCI7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlv6vmiYvmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW/q+aJi+acjeWKoeWZqOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahEpTT07mlbDmja4sIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlv6vmiYvmnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMgJiYgdGhpcy5fc2VydmVyQ29uZmlnLnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzICYmIHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcua3dhaUNvbmZpZy52aWRlb0lkID0gdGhpcy5fc2VydmVyQ29uZmlnLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLmt3YWlDb25maWcuaW5zZXJ0SWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZCB8fCB1dGlscy5jb25maWcua3dhaUNvbmZpZy5pbnNlcnRJZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZW1pdFNlcnZlckluaXRFdmVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpbml0UmVjb3JkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0NhblNob3dSZWNvcmVkKCkpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeW5s+WPsOS4jeaUr+aMgeW9leWxj+e7hOS7tu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWNvcmRlciA9IHRoaXMua3dhaWdhbWUuY3JlYXRlTWVkaWFSZWNvcmRlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5pbml0KHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9leWxj+WIneWni+WMluWksei0pTogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9leWxj+WIneWni+WMluaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5vbkVycm9yKHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyOiAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChcIllaX0NvbW1vbk1lc3NhZ2VcIiwgeyB0eXBlOiBcIllaX1JlY29yZEVuZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZXlsY/nu4jmraI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3JlY29yZGVyLm9uU3RhcnQoKHJlcykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgc2VsZi5fdmlkZW9QYXRoID0gXCJcIjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaXNDbGlja0VuZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5pc19hdXRvX3NoYXJlX3ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICB1dGlscy5pc1JlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuW9leWxj+W8gOWniz4+PlwiKTtcclxuICAgICAgICAvLyAgICAgICAgIHV0aWxzLnNob3dMb2coJ+W9leWxj+W8gOWniycpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yZWNvcmRlclN0YXJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy5nYW1lLmVtaXQoXCJZWl9Db21tb25NZXNzYWdlXCIsIHsgdHlwZTogXCJZWl9SZWNvcmRTdGFydFwiIH0pO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3JlY29yZGVyLm9uU3RvcCgocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2V5bGP57uT5p2fIDpcIiArIHJlcy52aWRlb1BhdGgpO1xyXG4gICAgICAgIC8vICAgICAgICAgdXRpbHMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIGNjLmdhbWUuZW1pdChcIllaX0NvbW1vbk1lc3NhZ2VcIiwgeyB0eXBlOiBcIllaX1JlY29yZEVuZFwiIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5yZWNvcmRlclN0YXJUaW1lKSAvIDEwMDA7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKGludGVydmFsID4gMykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuX3ZpZGVvUGF0aCA9IHJlcy52aWRlb1BhdGg7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9leWxj+aXtumXtOWkp+S6jjPnp5JcIiwgaW50ZXJ2YWwpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0b1NoYXJlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xpY2tFbmQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVWaWRlbygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hhcmVDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2F1dG9fc2hhcmVfdmlkZW8gPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmNoZWNrUmVzdWx0U2hvdygxKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua7oei2s+iHquWKqOWIhuS6q+adoeS7tu+8jOW8ueWHuuWIhuS6q+eql+WPo++8gVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5yZXdhcmRDbG9zZUZ1bmMgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnJld2FyZFZhbHVlID0gMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93U2hhcmVSZWNvcmRQYW5lbCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGludGVydmFsID4gMTAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMucmV3YXJkQ2xvc2VGdW5jID09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5yZXdhcmRWYWx1ZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd1NoYXJlUmVjb3JkUGFuZWwoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvU2hhcmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNDbGlja0VuZCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnR0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLlvZXlsY/ml7bpl7TlsI/kuo4z56eSIVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYWlsXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cmVzfWApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHNob3dUb2FzdOiwg+eUqOWksei0pWApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuX3ZpZGVvUGF0aCA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZXlsY/ml7bpl7TlsI/kuo4z56eS77yM5b2V5b2V5bGP5Zyw5Z2A572u56m677yBXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr77yM5pyJ5b2V5bGP5bCx5YiG5Lqr5b2V5bGP77yM5rKh5pyJ5b2V5bGP5bCx5YiG5Lqr5Zu+54mHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZShjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFyZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY29yZGVyU3RhclRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlVmlkZW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVJbWFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5piv5ZCm5pSv5oyB5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQ2FuU2hvd1JlY29yZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua3dhaWdhbWUuaXNTdXBwb3J0KHRoaXMua3dhaWdhbWUuU3VwcG9ydC5mZWF0dXJlcy5SZWNvcmRlcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHNoYXJlVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FuU2hvd1JlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hhcmVDYWxsYmFjayAmJiB0aGlzLl9zaGFyZUNhbGxiYWNrKGZhbHNlLCBcIuW9leWxj+aXtumXtOS4jei2syFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5wdWJsaXNoVmlkZW8oe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YiG5Lqr5b2V5bGP5aSx6LSlOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NoYXJlQ2FsbGJhY2sgJiYgdGhpcy5fc2hhcmVDYWxsYmFjayhmYWxzZSwgXCLliIbkuqvlvZXlsY/lpLHotKUhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuU2hvd1JlY29yZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliIbkuqvlvZXlsY/miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hhcmVDYWxsYmFjayAmJiB0aGlzLl9zaGFyZUNhbGxiYWNrKHRydWUsIFwi5YiG5Lqr5b2V5bGP5oiQ5YqfIVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0NhblNob3dSZWNvcmVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lubPlj7DkuI3mlK/mjIHlvZXlsY/nu4Tku7bvvIFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2V5bGP5Yid5aeL5YyW5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zaGFyZUNhbGxiYWNrICYmIHRoaXMuX3NoYXJlQ2FsbGJhY2soZmFsc2UsIFwi5YiG5Lqr5b2V5bGP5aSx6LSlIVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWNvcmRTdGFydCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIuc3RhcnQoe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5byA5aeL5b2V5bGP5aSx6LSlOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuU2hvd1JlY29yZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyU3RhclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJZWl9Db21tb25NZXNzYWdlXCIsIHsgdHlwZTogXCJZWl9SZWNvcmRTdGFydFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vlvZXlsY/miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2NhblNob3dSZWNvcmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWNvcmRFbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLnN0b3Aoe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmlzUmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwiWVpfQ29tbW9uTWVzc2FnZVwiLCB7IHR5cGU6IFwiWVpfUmVjb3JkRW5kXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuU2hvd1JlY29yZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YGc5q2i5b2V5bGP5aSx6LSlOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlgZzmraLlvZXlsY/miJDlip9cIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMucmVjb3JkZXJTdGFyVGltZSkgLyAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW50ZXJ2YWwgPiAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhblNob3dSZWNvcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2V5bGP5pe26Ze05aSn5LqOM+enklwiLCBpbnRlcnZhbCwgXCIgaXNDbGlja0VuZD1cIiwgdGhpcy5pc0NsaWNrRW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRvU2hhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xpY2tFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlVmlkZW8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGFyZUNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuY2hlY2tSZXN1bHRTaG93KDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua7oei2s+iHquWKqOWIhuS6q+adoeS7tu+8jOW8ueWHuuWIhuS6q+eql+WPo++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMucmV3YXJkQ2xvc2VGdW5jID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucmV3YXJkVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93U2hhcmVSZWNvcmRQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMucmV3YXJkQ2xvc2VGdW5jID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucmV3YXJkVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93U2hhcmVSZWNvcmRQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvU2hhcmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xpY2tFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnR0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRpdGxlOiBcIuW9leWxj+aXtumXtOWwj+S6jjPnp5IhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGljb246IFwiZmFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3Jlc31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaG93VG9hc3TosIPnlKjlpLHotKVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLl92aWRlb1BhdGggPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9leWxj+aXtumXtOWwj+S6jjPnp5LvvIzlvZXlvZXlsY/lnLDlnYDnva7nqbrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNoYXJlSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5rd2FpZ2FtZS5zaGFyZVRvTXNnKHRoaXMuX2dldFNoYXJlSW5mbygpKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0U2hhcmVJbmZvKCkge1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcclxuICAgICAgICBwYXJhbXMudGl0bGUgPSB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZTtcclxuICAgICAgICBwYXJhbXMuZGVzYyA9IHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZURlc2MgPyB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVEZXNjIDogdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlVGl0bGU7XHJcbiAgICAgICAgcGFyYW1zLmljb25VcmwgPSB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVJY29uID8gdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlSWNvbiA6IHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybDtcclxuICAgICAgICBwYXJhbXMuaW1hZ2VVcmwgPSB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVJbWdVcmw7XHJcbiAgICAgICAgcGFyYW1zLmV4dGVuc2lvbiA9IHtcclxuICAgICAgICAgICAgaXNTaGFyZTogXCJzaGFyZVwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwYXJhbXMucmVzcG9uc2UgPSAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliIbkuqvlrozmiJA6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlQ2FsbGJhY2sgJiYgdGhpcy5fc2hhcmVDYWxsYmFjayh0cnVlLCBcIuWIhuS6q+aIkOWKnyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDkuIrmiqXlhbPljaHmlbDmja5cclxuICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHBvc3RMZXZlbChsZXZlbDogc3RyaW5nLCBzdGF0dXM6IExldmVsU3RhdHVzLCBsZXZlbE5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzS3dhaSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJsZXZlbFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmbGV2ZWxfaWQ9JHtsZXZlbH0mbGV2ZWxfbmFtZT0ke2VuY29kZVVSSShsZXZlbE5hbWUpfSZzdGF0dXM9JHtzdGF0dXN9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICog5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmV2ZW50XCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZldmVudD0ke2VuY29kZVVSSShldmVudE5hbWUpfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7blpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX2NvbXBhcmVWZXJzaW9uKGZpcnN0OiBzdHJpbmcsIHNlY29uZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGZpcnN0LnNwbGl0KFwiLlwiKS5qb2luKFwiXCIpKSA+PSBwYXJzZUludChzZWNvbmQuc3BsaXQoXCIuXCIpLmpvaW4oXCJcIikpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=