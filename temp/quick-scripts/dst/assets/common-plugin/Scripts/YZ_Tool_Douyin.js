
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_Douyin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '89709ZaetdOYJH13/E/pJCv', 'YZ_Tool_Douyin');
// common-plugin/Scripts/YZ_Tool_Douyin.ts

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
var YZ_Tool_Douyin = /** @class */ (function () {
    function YZ_Tool_Douyin() {
        this._recorder = null;
        this._videoPath = null;
        this._shareCallback = null;
        this.recorderStarTime = 0; //开始录屏时间
        this.isAutoShare = true; //是否自动分享
        this.isClickEnd = false;
        this.isNewsArticleLite = false; //是否头条极速版
        //@ts-ignore
        this.tt = window.tt;
        /**
         * 服务器配置信息
         */
        this._serverConfig = null;
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        this._loginTime = 0;
        this._loginInterval = 30;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
        this._jumpIds = "";
        this._sysInfo = null;
        //是否是点完暂停按钮后自动分享得录屏
        this.is_auto_share_video = false;
        /**
         * 自动分享次数
        */
        this.recored_share_count = 0;
        this.appLaunchOptions = [];
    }
    Object.defineProperty(YZ_Tool_Douyin.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_Douyin.prototype.gameVersion = function () {
        return Utils_1.utils.config.douyinconfig.version;
    };
    Object.defineProperty(YZ_Tool_Douyin.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_Douyin.prototype, "serviceId", {
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
    YZ_Tool_Douyin.prototype._login = function () {
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
                Utils_1.utils.showLog("douying暂时不获取uid，uid全部为0");
                this._uid = "0";
                return [2 /*return*/];
            });
        });
    };
    YZ_Tool_Douyin.prototype.login = function () {
        var _this = this;
        Utils_1.utils.showLog("douying login");
        //@ts-ignore
        tt.login({
            withRealNameAuthenticationInfo: true,
            success: function (_res) {
                Utils_1.utils.showLog("登录成功");
                // 调用 getUserInfo 前, 请确保登录成功
                //实名认证需要用户点击触发
                //@ts-ignore
                // 获取用户信息
                tt.getUserInfo({
                    // withCredentials: true,
                    withRealNameAuthenticationInfo: true,
                    success: function (res) {
                        Utils_1.utils.showLog("getUserInfo \u8C03\u7528\u6210\u529F", res.userInfo);
                        if (res.userInfo) {
                            if (res.userInfo.realNameAuthenticationStatus && res.userInfo.realNameAuthenticationStatus == "uncertified") {
                                Utils_1.utils.showLog("getUserInfo \u7528\u6237\u672A\u8FDB\u884C\u5B9E\u540D\u5236\uFF01");
                                _this.realNameAuth();
                            }
                            else if (res.userInfo.realNameAuthenticationStatus && res.userInfo.realNameAuthenticationStatus == "certified") {
                                Utils_1.utils.showLog("getUserInfo \u7528\u6237\u5DF2\u5B9E\u540D\u5236\uFF01");
                                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_SUCCESS);
                            }
                            else {
                                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_FAIL);
                            }
                        }
                    },
                    fail: function (res) {
                        Utils_1.utils.showLog("getUserInfo \u8C03\u7528\u5931\u8D25", res.errMsg);
                    }
                });
            },
            fail: function () {
                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_FAIL);
                _this.showToast("登录失败！");
            }
        });
    };
    YZ_Tool_Douyin.prototype.realNameAuth = function () {
        var _this = this;
        Utils_1.utils.showLog("douying realNameAuth");
        //@ts-ignore
        tt.authenticateRealName({
            success: function (_res) {
                Utils_1.utils.showLog("用户实名认证成功");
                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_SUCCESS);
            },
            fail: function (res) {
                _this.showToast("实名制认证失败，请稍后重试！");
                cc.game.emit(YZ_Constant_1.default.ST_LOGIN_FAIL);
                Utils_1.utils.showLog("用户实名认证失败", res.errMsg);
            },
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_Douyin.prototype.reportLogin = function () {
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
     * @param data 配置数据.
     */
    YZ_Tool_Douyin.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.IsDouyin) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.toutiao) {
                    Utils_1.utils.showLog("本地配置数据:" + JSON.stringify(configObj.toutiao));
                    ST_DefaultServerConfig = JSON.stringify(configObj.toutiao);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._sysInfo = this.tt.getSystemInfoSync();
            Utils_1.utils.showLog("抖音平台信息：" + JSON.stringify(this._sysInfo));
            if (this._sysInfo && this._sysInfo.appName && this._sysInfo.appName == "news_article_lite") {
                this.isNewsArticleLite = true;
            }
            // // 拉取服务器配置
            // this.loadJumpIds().then(() => {
            //     console.log("本地跳转ID加载成功！");
            //     this._loadConfig();
            // }).catch((erro) => {
            //     console.error("本地跳转ID加载失败：", erro);
            this._loadConfig();
            // })
            var self_1 = this;
            this._recorder = this.tt.getGameRecorderManager();
            if (this._recorder) {
                this._recorder.onStart(function (res) {
                    self_1._videoPath = "";
                    _this.isClickEnd = false;
                    _this.is_auto_share_video = false;
                    Utils_1.utils.isRecording = true;
                    console.log("录屏开始>>>");
                    Utils_1.utils.showLog('录屏开始');
                    _this.recorderStarTime = new Date().getTime();
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
                });
                this._recorder.onStop(function (res) {
                    Utils_1.utils.showLog("录屏结束 :" + res.videoPath);
                    Utils_1.utils.isRecording = false;
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    var curTime = new Date().getTime();
                    var interval = (curTime - _this.recorderStarTime) / 1000;
                    if (interval > 3) {
                        self_1._videoPath = res.videoPath;
                        Utils_1.utils.showLog("录屏时间大于3秒", interval);
                        if (_this.isAutoShare) {
                            if (_this.isClickEnd) {
                                _this.shareVideo();
                                _this._shareCallback = null;
                                _this.is_auto_share_video = true;
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
                            _this.tt.showToast({
                                title: "录屏时间小于3秒!",
                                icon: "fail",
                                duration: 2000,
                                success: function (res) {
                                    console.log("" + res);
                                },
                                fail: function (res) {
                                    console.log("showToast\u8C03\u7528\u5931\u8D25");
                                }
                            });
                        }
                        self_1._videoPath = "";
                        Utils_1.utils.showLog("录屏时间小于3秒，录录屏地址置空！");
                    }
                });
            }
            // 开启右上角分享按钮
            //@ts-ignore
            this.tt.showShareMenu({
                withShareTicket: false
            });
            //@ts-ignore
            this.tt.onShareAppMessage(function (res) {
                return self_1._getShareInfo();
            });
            Utils_1.utils.registerServerInitEvent(function () {
                if (_this.ServerConfig.add_favorite) {
                    setTimeout(function () {
                        Utils_1.utils.showLog("延迟调用添加搜藏!!");
                        _this.showFavoriteGuide();
                    }, _this.ServerConfig.add_favorite * 1000);
                }
            }, this);
        }
    };
    /**
      * 添加搜藏
      */
    YZ_Tool_Douyin.prototype.showFavoriteGuide = function () {
        if (this.tt.showFavoriteGuide) {
            this.tt.showFavoriteGuide({
                type: "bar",
                content: "一键添加到我的小程序",
                position: this.ServerConfig.favorite_type ? this.ServerConfig.favorite_type : "bottom",
                success: function (res) {
                    Utils_1.utils.showLog("引导组件展示成功");
                },
                fail: function (res) {
                    Utils_1.utils.showLog("引导组件展示失败:ero=" + JSON.stringify(res));
                },
            });
        }
        else {
            Utils_1.utils.showLog("当前头条版本不支持添加收藏！");
        }
    };
    YZ_Tool_Douyin.prototype.loadJumpIds = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.load("game.json", function (err, res) {
                if (!err) {
                    res.ttNavigateToMiniGameAppIdList.forEach(function (element) {
                        _this._jumpIds += element + ",";
                    });
                    _this._jumpIds.substring(0, _this._jumpIds.lastIndexOf(","));
                    //@ts-ignore
                    resolve();
                }
                reject(err);
            });
        });
    };
    YZ_Tool_Douyin.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsDouyin) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method + ("&jump_id=" + this._jumpIds), function (ret, data) {
                if (ret && data) {
                    Utils_1.utils.showLog("抖音服务器配置数据获取成功: data = " + data);
                    var result = JSON.parse(data);
                    if (!Utils_1.utils.DebugLoacalConfig) {
                        _this._serverConfig = result;
                    }
                    else {
                        Utils_1.utils.showLog("调试模式，使用本地配置!");
                    }
                }
                else {
                    Utils_1.utils.showLog("抖音服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this.ServerConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this.ServerConfig.is_local_pos_id == "false") {
                        Utils_1.utils.showLog("使用服务器下发的广告ID");
                        Utils_1.utils.config.douyinconfig.bannerId = _this.ServerConfig.banner_pos_id;
                        Utils_1.utils.config.douyinconfig.insertId = _this.ServerConfig.intersititia_pos_id;
                        Utils_1.utils.config.douyinconfig.videoId = _this.ServerConfig.video_pos_id;
                    }
                    if (_this._serverConfig.shares && _this._serverConfig.shares.sy_title) {
                        Utils_1.utils.config.otherconfig.shareTitle = _this._serverConfig.shares.sy_title;
                    }
                    if (_this._serverConfig.shares && _this._serverConfig.shares.sy_img) {
                        Utils_1.utils.config.otherconfig.shareImgUrl = _this._serverConfig.shares.sy_img;
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    /**
    * 开始录屏
    */
    YZ_Tool_Douyin.prototype.recordStart = function () {
        if (PlatUtils_1.default.IsDouyin) {
            if (this._recorder) {
                this._recorder.start({
                    duration: this.ServerConfig.record_duration ? this.ServerConfig.record_duration : 120
                });
            }
        }
    };
    /**
     * 结束录屏
     */
    YZ_Tool_Douyin.prototype.recordEnd = function () {
        if (PlatUtils_1.default.IsDouyin) {
            this._recorder.stop();
        }
    };
    /**
     * 分享，有录屏就分享录屏，没有录屏就分享图片
     */
    YZ_Tool_Douyin.prototype.share = function (callback) {
        if (PlatUtils_1.default.IsDouyin) {
            this._shareCallback = callback;
            if (this._videoPath && !Utils_1.utils.isRecording) {
                this.shareVideo();
            }
            else {
                this.shareImage();
            }
        }
    };
    /**
     * 分享录屏
     */
    YZ_Tool_Douyin.prototype.shareVideo = function () {
        if (PlatUtils_1.default.IsDouyin) {
            if (this._videoPath) {
                var self_2 = this;
                //@ts-ignore
                this.tt.shareAppMessage({
                    channel: 'video',
                    extra: {
                        videoPath: self_2._videoPath // 可用录屏得到的视频地址
                    },
                    success: function () {
                        cc.log('视频分享成功!');
                        if (self_2._shareCallback) {
                            self_2._shareCallback(true);
                        }
                    },
                    fail: function (e) {
                        cc.log('视频分享失败!', JSON.stringify(e));
                        self_2._videoPath = "";
                        var msg = "分享失败!";
                        if (e && e.errMsg) {
                            msg = e.errMsg;
                            if (msg.indexOf("fail") != -1) {
                                console.log(self_2._sysInfo);
                                if (self_2._sysInfo.appName == "XiGua") {
                                    msg = "分享失败!";
                                }
                                else {
                                    // 视频太短
                                    msg = "分享失败，录屏时间太短！";
                                }
                            }
                            else {
                                msg = "分享失败!";
                            }
                        }
                        if (self_2._shareCallback) {
                            self_2._shareCallback(false, msg);
                        }
                        if (self_2.is_auto_share_video) {
                            self_2.is_auto_share_video = false;
                            self_2.tt.showToast({
                                title: msg,
                                icon: "fail",
                                duration: 2000,
                                success: function (res) {
                                    console.log("" + res);
                                },
                                fail: function (res) {
                                    console.log("showToast\u8C03\u7528\u5931\u8D25");
                                }
                            });
                        }
                    }
                });
            }
        }
    };
    /**
     * 分享图片
     */
    YZ_Tool_Douyin.prototype.shareImage = function () {
        if (PlatUtils_1.default.IsDouyin) {
            var shareInfo = Utils_1.utils.getShareInfo();
            Utils_1.utils.showLog("\u5206\u4EAB\u56FE\u7247\uFF1Atitle:" + shareInfo.title + "; imageUrl:" + shareInfo.imageUrl);
            if (shareInfo) {
                var self_3 = this;
                //@ts-ignore
                this.tt.shareAppMessage({
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl,
                    success: function () {
                        Utils_1.utils.showLog('图片分享成功!');
                        if (self_3._shareCallback) {
                            self_3._shareCallback(true);
                        }
                    },
                    fail: function (e) {
                        Utils_1.utils.showLog('图片分享失败!' + JSON.stringify(e));
                        if (self_3._shareCallback) {
                            self_3._shareCallback(false);
                        }
                    }
                });
            }
        }
    };
    /**
     * 显示更多游戏按钮
     */
    YZ_Tool_Douyin.prototype.showMoreGamesButton = function (params) {
        if (PlatUtils_1.default.IsDouyin) {
            var left = 0;
            var top = 0;
            var width = 0;
            var height = 0;
            if (cc.view.getDesignResolutionSize().width < 1080) {
                width = 188 / 1080 * this._sysInfo.screenWidth;
                height = 223 / 1080 * this._sysInfo.screenWidth;
            }
            else {
                width = 188 / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
                height = 223 / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
            }
            if (params) {
                if (params.left) {
                    left = params.left / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
                }
                else if (params.right) {
                    left = this._sysInfo.screenWidth - params.right / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth - width;
                }
                if (params.top) {
                    top = params.top / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight;
                }
                else if (params.bottom) {
                    top = this._sysInfo.screenHeight - params.bottom / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight - height;
                }
            }
            Utils_1.utils.showLog("\u66F4\u591A\u6E38\u620F\u6309\u94AE\u53C2\u6570\uFF1Aleft:" + left + "; top:" + top + "; width:" + width + "; height:" + height);
            //@ts-ignore
            return this.tt.createMoreGamesButton({
                type: "image",
                image: "img/more_game.png",
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                    lineHeight: 40,
                    backgroundColor: "#ff0000",
                    textColor: "#ffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 4,
                    borderWidth: 0,
                    borderColor: '#ff0000'
                },
                appLaunchOptions: [],
                onNavigateToMiniGame: function (res) {
                    Utils_1.utils.showLog('跳转其他小游戏' + res);
                    if (res && res.errCode == 0) {
                        // 跳转成功
                    }
                }
            });
        }
    };
    YZ_Tool_Douyin.prototype._getShareInfo = function () {
        if (PlatUtils_1.default.IsDouyin) {
            var shareInfo = Utils_1.utils.getShareInfo();
            if (shareInfo) {
                return {
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl,
                    success: function (res) {
                        Utils_1.utils.showLog("分享成功!");
                    },
                    fail: function (err) {
                        Utils_1.utils.showLog("分享失败!");
                    }
                };
            }
        }
        return {};
    };
    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    YZ_Tool_Douyin.prototype.isOverMiniVersion = function (miniVersion) {
        if (PlatUtils_1.default.IsDouyin) {
            if (this._sysInfo && miniVersion != null) {
                return this._compareVersion(this._sysInfo.SDKVersion, miniVersion);
            }
        }
        return false;
    };
    YZ_Tool_Douyin.prototype._compareVersion = function (first, second) {
        return parseInt(first.split(".").join("")) >= parseInt(second.split(".").join(""));
    };
    /**
     * 判断是否支持显示更多游戏弹窗
     */
    YZ_Tool_Douyin.prototype.isShowMoreGamesModal = function () {
        if (PlatUtils_1.default.IsAndroid && this.tt.showMoreGamesModal) {
            return true;
        }
        Utils_1.utils.showLog("当前版本不支持显示抖音更多游戏弹窗！");
        return false;
    };
    /**
     * 持显示更多游戏弹窗
     */
    YZ_Tool_Douyin.prototype.showMoreGamesModal = function () {
        if (PlatUtils_1.default.IsAndroid) {
            this.tt.showMoreGamesModal({
                appLaunchOptions: [],
                success: function (res) {
                    console.log("success", res.errMsg);
                },
                fail: function (res) {
                    console.log("fail", res.errMsg);
                }
            });
        }
        else {
            Utils_1.utils.showMsg("当前平台暂时不支持跳转");
        }
    };
    /**
   * 获取交叉推广数据
   */
    YZ_Tool_Douyin.prototype.getRecommondGameList = function () {
        if (PlatUtils_1.default.IsDouyin
            && this.ServerConfig) {
            return this.ServerConfig.jump_list;
        }
        return null;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_Douyin.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsDouyin) {
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
    YZ_Tool_Douyin.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsDouyin) {
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
    YZ_Tool_Douyin.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsDouyin) {
            //@ts-ignore
            tt.showToast({
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
    YZ_Tool_Douyin.prototype.GameExit = function () {
        //@ts-ignore
        tt.exitMiniProgram({
            success: function (res) {
                console.log("调用成功", res.data);
            },
            fail: function (res) {
                console.log("调用失败", res.errMsg);
            },
        });
    };
    YZ_Tool_Douyin = __decorate([
        ccclass
    ], YZ_Tool_Douyin);
    return YZ_Tool_Douyin;
}());
exports.default = YZ_Tool_Douyin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9Eb3V5aW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUF5RDtBQUN6RCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxZQUFZLEdBQVcsK0JBQStCLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQVcsaUNBQWlDLENBQUM7QUFDakUsT0FBTztBQUNQLElBQUksc0JBQXNCLEdBQVcsRUFBRSxDQUFDO0FBR3hDO0lBQUE7UUFFSSxjQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFFMUIsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMscUJBQWdCLEdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUN0QyxnQkFBVyxHQUFZLElBQUksQ0FBQyxDQUFFLFFBQVE7UUFDdEMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixzQkFBaUIsR0FBWSxLQUFLLENBQUMsQ0FBQyxTQUFTO1FBQzdDLFlBQVk7UUFDWixPQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNmOztXQUVHO1FBQ0gsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFjMUIsT0FBTztRQUNQLFNBQUksR0FBVyxHQUFHLENBQUM7UUFRbkIsVUFBVTtRQUNWLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBWTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUEyRTVCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFZLEtB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Q0FBQyxDQUFDLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBR0Q7OztRQUdJO0lBQ0csa0NBQVMsR0FBaEIsVUFBaUIsR0FBVztRQUN4QixJQUFJLG1CQUFTLENBQUMsUUFBUSxFQUFFO1lBQ3BCLFlBQVk7WUFDWixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNULEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sWUFBQyxHQUFHO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBRyxHQUFLLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztnQkFDRCxJQUFJLFlBQUMsR0FBRztvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFlLENBQUMsQ0FBQztnQkFDakMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLGlDQUFRLEdBQWY7UUFDSSxZQUFZO1FBQ1osRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNmLE9BQU8sWUFBQyxHQUFHO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsSUFBSSxZQUFDLEdBQUc7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBN3RCZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTh0QmxDO0lBQUQscUJBQUM7Q0E5dEJELEFBOHRCQyxJQUFBO2tCQTl0Qm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCwgeyBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vcmVwb3J0LnlvdWxldGQuY29tL2dzcz9cIjtcclxuLy8g6buY6K6k6YWN572uXHJcbmxldCBTVF9EZWZhdWx0U2VydmVyQ29uZmlnOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfVG9vbF9Eb3V5aW4ge1xyXG5cclxuICAgIF9yZWNvcmRlcjogYW55ID0gbnVsbDtcclxuICAgIF92aWRlb1BhdGg6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgX3NoYXJlQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcmVjb3JkZXJTdGFyVGltZTogbnVtYmVyID0gMDsgLy/lvIDlp4vlvZXlsY/ml7bpl7RcclxuICAgIGlzQXV0b1NoYXJlOiBib29sZWFuID0gdHJ1ZTsgIC8v5piv5ZCm6Ieq5Yqo5YiG5LqrXHJcbiAgICBpc0NsaWNrRW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc05ld3NBcnRpY2xlTGl0ZTogYm9vbGVhbiA9IGZhbHNlOyAvL+aYr+WQpuWktOadoeaegemAn+eJiFxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICB0dCA9IHdpbmRvdy50dDtcclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6YWN572u5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeJiOacrOWPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2FtZVZlcnNpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdXRpbHMuY29uZmlnLmRvdXlpbmNvbmZpZy52ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iuvuWkh1VJRFxyXG4gICAgX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgcHVibGljIGdldCB1aWQoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIC8vIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMucmVwb3J0TG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9sb2dpblRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBfbG9naW5JbnRlcnZhbDogbnVtYmVyID0gMzA7XHJcbiAgICBhc3luYyBfbG9naW4oKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5fbG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IDMwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOeZu+W9leivt+axgumXtOmalOWwj+S6ju+8miR7dGhpcy5fbG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiZG91eWluZ+aaguaXtuS4jeiOt+WPlnVpZO+8jHVpZOWFqOmDqOS4ujBcIik7XHJcbiAgICAgICAgdGhpcy5fdWlkID0gXCIwXCI7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucmVwb3J0TG9naW4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcImRvdXlpbmcgbG9naW5cIik7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgdHQubG9naW4oe1xyXG4gICAgICAgICAgICB3aXRoUmVhbE5hbWVBdXRoZW50aWNhdGlvbkluZm86IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChfcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55m75b2V5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8g6LCD55SoIGdldFVzZXJJbmZvIOWJjSwg6K+356Gu5L+d55m75b2V5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAvL+WunuWQjeiupOivgemcgOimgeeUqOaIt+eCueWHu+inpuWPkVxyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAgICAgICAgICAgIHR0LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2l0aFJlYWxOYW1lQXV0aGVudGljYXRpb25JbmZvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhgZ2V0VXNlckluZm8g6LCD55So5oiQ5YqfYCwgcmVzLnVzZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VySW5mby5yZWFsTmFtZUF1dGhlbnRpY2F0aW9uU3RhdHVzICYmIHJlcy51c2VySW5mby5yZWFsTmFtZUF1dGhlbnRpY2F0aW9uU3RhdHVzID09IFwidW5jZXJ0aWZpZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYGdldFVzZXJJbmZvIOeUqOaIt+acqui/m+ihjOWunuWQjeWItu+8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVhbE5hbWVBdXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy51c2VySW5mby5yZWFsTmFtZUF1dGhlbnRpY2F0aW9uU3RhdHVzICYmIHJlcy51c2VySW5mby5yZWFsTmFtZUF1dGhlbnRpY2F0aW9uU3RhdHVzID09IFwiY2VydGlmaWVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGBnZXRVc2VySW5mbyDnlKjmiLflt7Llrp7lkI3liLbvvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoWVpfQ29uc3RhbnQuU1RfTE9HSU5fU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChZWl9Db25zdGFudC5TVF9MT0dJTl9GQUlMKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhgZ2V0VXNlckluZm8g6LCD55So5aSx6LSlYCwgcmVzLmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFlaX0NvbnN0YW50LlNUX0xPR0lOX0ZBSUwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VG9hc3QoXCLnmbvlvZXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWFsTmFtZUF1dGgoKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcImRvdXlpbmcgcmVhbE5hbWVBdXRoXCIpO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHR0LmF1dGhlbnRpY2F0ZVJlYWxOYW1lKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKF9yZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnlKjmiLflrp7lkI3orqTor4HmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoWVpfQ29uc3RhbnQuU1RfTE9HSU5fU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RvYXN0KFwi5a6e5ZCN5Yi26K6k6K+B5aSx6LSl77yM6K+356iN5ZCO6YeN6K+V77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFlaX0NvbnN0YW50LlNUX0xPR0lOX0ZBSUwpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIueUqOaIt+WunuWQjeiupOivgeWksei0pVwiLCByZXMuZXJyTXNnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2p1bXBJZHM6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHtzZWxmLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhPVwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdC51aWQ9XCIgKyByZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluaVsOaNruWksei0pTFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBfc3lzSW5mbzogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvL+aYr+WQpuaYr+eCueWujOaaguWBnOaMiemSruWQjuiHquWKqOWIhuS6q+W+l+W9leWxj1xyXG4gICAgaXNfYXV0b19zaGFyZV92aWRlbzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rliqjliIbkuqvmrKHmlbBcclxuICAgICovXHJcbiAgICByZWNvcmVkX3NoYXJlX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgYXBwTGF1bmNoT3B0aW9uczogYW55W10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva7mlbDmja4uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmoudG91dGlhbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKzlnLDphY3nva7mlbDmja46XCIgKyBKU09OLnN0cmluZ2lmeShjb25maWdPYmoudG91dGlhbykpO1xyXG4gICAgICAgICAgICAgICAgICAgIFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmoudG91dGlhbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gdGhpcy5fc2VydmljZV91aWQgPyB0aGlzLl9zZXJ2aWNlX3VpZCA6IFwiMFwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc3lzSW5mbyA9IHRoaXMudHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaKlumfs+W5s+WPsOS/oeaBr++8mlwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5fc3lzSW5mbykpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3lzSW5mbyAmJiB0aGlzLl9zeXNJbmZvLmFwcE5hbWUgJiYgdGhpcy5fc3lzSW5mby5hcHBOYW1lID09IFwibmV3c19hcnRpY2xlX2xpdGVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc05ld3NBcnRpY2xlTGl0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyAvLyDmi4nlj5bmnI3liqHlmajphY3nva5cclxuICAgICAgICAgICAgLy8gdGhpcy5sb2FkSnVtcElkcygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLmnKzlnLDot7PovaxJROWKoOi9veaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuX2xvYWRDb25maWcoKTtcclxuICAgICAgICAgICAgLy8gfSkuY2F0Y2goKGVycm8pID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUuZXJyb3IoXCLmnKzlnLDot7PovaxJROWKoOi9veWksei0pe+8mlwiLCBlcnJvKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG4gICAgICAgICAgICAvLyB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyID0gdGhpcy50dC5nZXRHYW1lUmVjb3JkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWNvcmRlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkZXIub25TdGFydCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9QYXRoID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ2xpY2tFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2F1dG9fc2hhcmVfdmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5pc1JlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZXlsY/lvIDlp4s+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5b2V5bGP5byA5aeLJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlclN0YXJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwiWVpfQ29tbW9uTWVzc2FnZVwiLCB7IHR5cGU6IFwiWVpfUmVjb3JkU3RhcnRcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZGVyLm9uU3RvcCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9leWxj+e7k+adnyA6XCIgKyByZXMudmlkZW9QYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5pc1JlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChcIllaX0NvbW1vbk1lc3NhZ2VcIiwgeyB0eXBlOiBcIllaX1JlY29yZEVuZFwiIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLnJlY29yZGVyU3RhclRpbWUpIC8gMTAwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVydmFsID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl92aWRlb1BhdGggPSByZXMudmlkZW9QYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2V5bGP5pe26Ze05aSn5LqOM+enklwiLCBpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0b1NoYXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NsaWNrRW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZVZpZGVvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hhcmVDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdXRvX3NoYXJlX3ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuY2hlY2tSZXN1bHRTaG93KDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua7oei2s+iHquWKqOWIhuS6q+adoeS7tu+8jOW8ueWHuuWIhuS6q+eql+WPo++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMucmV3YXJkQ2xvc2VGdW5jID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucmV3YXJkVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93U2hhcmVSZWNvcmRQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMucmV3YXJkQ2xvc2VGdW5jID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucmV3YXJkVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93U2hhcmVSZWNvcmRQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvU2hhcmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xpY2tFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLlvZXlsY/ml7bpl7TlsI/kuo4z56eSIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3Jlc31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaG93VG9hc3TosIPnlKjlpLHotKVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9QYXRoID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZXlsY/ml7bpl7TlsI/kuo4z56eS77yM5b2V5b2V5bGP5Zyw5Z2A572u56m677yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOW8gOWQr+WPs+S4iuinkuWIhuS6q+aMiemSrlxyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy50dC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy50dC5vblNoYXJlQXBwTWVzc2FnZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5fZ2V0U2hhcmVJbmZvKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5hZGRfZmF2b3JpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW7tui/n+iwg+eUqOa3u+WKoOaQnOiXjyEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGYXZvcml0ZUd1aWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5TZXJ2ZXJDb25maWcuYWRkX2Zhdm9yaXRlICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOa3u+WKoOaQnOiXj1xyXG4gICAgICAqL1xyXG4gICAgc2hvd0Zhdm9yaXRlR3VpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHQuc2hvd0Zhdm9yaXRlR3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50dC5zaG93RmF2b3JpdGVHdWlkZSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJhclwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCLkuIDplK7mt7vliqDliLDmiJHnmoTlsI/nqIvluo9cIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLlNlcnZlckNvbmZpZy5mYXZvcml0ZV90eXBlID8gdGhpcy5TZXJ2ZXJDb25maWcuZmF2b3JpdGVfdHlwZSA6IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8leWvvOe7hOS7tuWxleekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8leWvvOe7hOS7tuWxleekuuWksei0pTplcm89XCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lpLTmnaHniYjmnKzkuI3mlK/mjIHmt7vliqDmlLbol4/vvIFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2FkSnVtcElkcygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChcImdhbWUuanNvblwiLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnR0TmF2aWdhdGVUb01pbmlHYW1lQXBwSWRMaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2p1bXBJZHMgKz0gZWxlbWVudCArIFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2p1bXBJZHMuc3Vic3RyaW5nKDAsIHRoaXMuX2p1bXBJZHMubGFzdEluZGV4T2YoXCIsXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmanVtcF9pZD0ke3RoaXMuX2p1bXBJZHN9YCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCAmJiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaKlumfs+acjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluaIkOWKnzogZGF0YSA9IFwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiwg+ivleaooeW8j++8jOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5oqW6Z+z5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5TZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBKU09OLnBhcnNlKFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5kb3V5aW5jb25maWcuYmFubmVySWQgPSB0aGlzLlNlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcuZG91eWluY29uZmlnLmluc2VydElkID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLmRvdXlpbmNvbmZpZy52aWRlb0lkID0gdGhpcy5TZXJ2ZXJDb25maWcudmlkZW9fcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMgJiYgdGhpcy5fc2VydmVyQ29uZmlnLnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzICYmIHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1dGlscy5lbWl0U2VydmVySW5pdEV2ZW50KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5byA5aeL5b2V5bGPXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHJlY29yZFN0YXJ0KCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5zdGFydCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuU2VydmVyQ29uZmlnLnJlY29yZF9kdXJhdGlvbiA/IHRoaXMuU2VydmVyQ29uZmlnLnJlY29yZF9kdXJhdGlvbiA6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWNvcmRFbmQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRlci5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr77yM5pyJ5b2V5bGP5bCx5YiG5Lqr5b2V5bGP77yM5rKh5pyJ5b2V5bGP5bCx5YiG5Lqr5Zu+54mHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZShjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFyZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb1BhdGggJiYgIXV0aWxzLmlzUmVjb3JkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlVmlkZW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVJbWFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZVZpZGVvKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnR0LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogJ3ZpZGVvJyxcclxuICAgICAgICAgICAgICAgICAgICBleHRyYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHNlbGYuX3ZpZGVvUGF0aCAvLyDlj6/nlKjlvZXlsY/lvpfliLDnmoTop4bpopHlnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygn6KeG6aKR5YiG5Lqr5oiQ5YqfIScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hhcmVDYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygn6KeG6aKR5YiG5Lqr5aSx6LSlIScsIEpTT04uc3RyaW5naWZ5KGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmlkZW9QYXRoID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1zZzogc3RyaW5nID0gXCLliIbkuqvlpLHotKUhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlICYmIGUuZXJyTXNnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBlLmVyck1zZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtc2cuaW5kZXhPZihcImZhaWxcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLl9zeXNJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc3lzSW5mby5hcHBOYW1lID09IFwiWGlHdWFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIuWIhuS6q+Wksei0pSFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDop4bpopHlpKrnn61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnID0gXCLliIbkuqvlpLHotKXvvIzlvZXlsY/ml7bpl7TlpKrnn63vvIFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIuWIhuS6q+Wksei0pSFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hhcmVDYWxsYmFjayhmYWxzZSwgbXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc19hdXRvX3NoYXJlX3ZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzX2F1dG9fc2hhcmVfdmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3Jlc31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaG93VG9hc3TosIPnlKjlpLHotKVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5Zu+54mHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZUltYWdlKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgbGV0IHNoYXJlSW5mbyA9IHV0aWxzLmdldFNoYXJlSW5mbygpO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDliIbkuqvlm77niYfvvJp0aXRsZToke3NoYXJlSW5mby50aXRsZX07IGltYWdlVXJsOiR7c2hhcmVJbmZvLmltYWdlVXJsfWApO1xyXG4gICAgICAgICAgICBpZiAoc2hhcmVJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMudHQuc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2hhcmVJbmZvLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBzaGFyZUluZm8uaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5Zu+54mH5YiG5Lqr5oiQ5YqfIScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hhcmVDYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ+WbvueJh+WIhuS6q+Wksei0pSEnICsgSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2hhcmVDYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65pu05aSa5ri45oiP5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93TW9yZUdhbWVzQnV0dG9uKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBsZXQgbGVmdDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoIDwgMTA4MCkge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSAxODggLyAxMDgwICogdGhpcy5fc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IDIyMyAvIDEwODAgKiB0aGlzLl9zeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSAxODggLyBjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCkud2lkdGggKiB0aGlzLl9zeXNJbmZvLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMjIzIC8gY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoICogdGhpcy5fc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHBhcmFtcy5sZWZ0IC8gY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoICogdGhpcy5fc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHRoaXMuX3N5c0luZm8uc2NyZWVuV2lkdGggLSBwYXJhbXMucmlnaHQgLyBjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCkud2lkdGggKiB0aGlzLl9zeXNJbmZvLnNjcmVlbldpZHRoIC0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBwYXJhbXMudG9wIC8gY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLmhlaWdodCAqIHRoaXMuX3N5c0luZm8uc2NyZWVuSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuYm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gdGhpcy5fc3lzSW5mby5zY3JlZW5IZWlnaHQgLSBwYXJhbXMuYm90dG9tIC8gY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLmhlaWdodCAqIHRoaXMuX3N5c0luZm8uc2NyZWVuSGVpZ2h0IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmm7TlpJrmuLjmiI/mjInpkq7lj4LmlbDvvJpsZWZ0OiR7bGVmdH07IHRvcDoke3RvcH07IHdpZHRoOiR7d2lkdGh9OyBoZWlnaHQ6JHtoZWlnaHR9YCk7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50dC5jcmVhdGVNb3JlR2FtZXNCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IFwiaW1nL21vcmVfZ2FtZS5wbmdcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNmZjAwMDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2ZmMDAwMCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhcHBMYXVuY2hPcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgb25OYXZpZ2F0ZVRvTWluaUdhbWUocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn6Lez6L2s5YW25LuW5bCP5ri45oiPJyArIHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5lcnJDb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2s5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNoYXJlSW5mbygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIGxldCBzaGFyZUluZm8gPSB1dGlscy5nZXRTaGFyZUluZm8oKTtcclxuICAgICAgICAgICAgaWYgKHNoYXJlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2hhcmVJbmZvLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBzaGFyZUluZm8uaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YiG5Lqr5oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWIhuS6q+Wksei0pSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavlOi+g+W9k+WJjeW5s+WPsOeJiOacrOaYr+WQpumrmOS6juaMh+WumueahOeJiOacrOWPt1xyXG4gICAgICogQHBhcmFtIG1pbmlWZXJzaW9uIOacgOS9juW5s+WPsOeJiOacrOWPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNPdmVyTWluaVZlcnNpb24obWluaVZlcnNpb246IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N5c0luZm8gJiYgbWluaVZlcnNpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVWZXJzaW9uKHRoaXMuX3N5c0luZm8uU0RLVmVyc2lvbiwgbWluaVZlcnNpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfY29tcGFyZVZlcnNpb24oZmlyc3Q6IHN0cmluZywgc2Vjb25kOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZmlyc3Quc3BsaXQoXCIuXCIpLmpvaW4oXCJcIikpID49IHBhcnNlSW50KHNlY29uZC5zcGxpdChcIi5cIikuam9pbihcIlwiKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5pSv5oyB5pi+56S65pu05aSa5ri45oiP5by556qXXHJcbiAgICAgKi9cclxuICAgIGlzU2hvd01vcmVHYW1lc01vZGFsKCkge1xyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzQW5kcm9pZCAmJiB0aGlzLnR0LnNob3dNb3JlR2FtZXNNb2RhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeaYvuekuuaKlumfs+abtOWkmua4uOaIj+W8ueeql++8gVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaMgeaYvuekuuabtOWkmua4uOaIj+W8ueeql1xyXG4gICAgICovXHJcbiAgICBzaG93TW9yZUdhbWVzTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy50dC5zaG93TW9yZUdhbWVzTW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgYXBwTGF1bmNoT3B0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiLCByZXMuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbFwiLCByZXMuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcIuW9k+WJjeW5s+WPsOaaguaXtuS4jeaUr+aMgei3s+i9rFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICog6I635Y+W5Lqk5Y+J5o6o5bm/5pWw5o2uXHJcbiAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tb25kR2FtZUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpblxyXG4gICAgICAgICAgICAmJiB0aGlzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TZXJ2ZXJDb25maWcuanVtcF9saXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWFs+WNoeaVsOaNrlxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RMZXZlbChsZXZlbDogc3RyaW5nLCBzdGF0dXM6IExldmVsU3RhdHVzLCBsZXZlbE5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmxldmVsXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG4gICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2VuZEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJldmVudFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZXZlbnQ9JHtlbmNvZGVVUkkoZXZlbnROYW1lKX1gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu25oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql6Ieq5a6a5LmJ5LqL5Lu25aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5by55Ye65o+Q56S65qGGXHJcbiAgICAgICogQHBhcmFtIG1zZyDmtojmga9cclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93VG9hc3QobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0dC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG1zZyxcclxuICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3Jlc31gKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaG93VG9hc3TosIPnlKjlpLHotKVgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHYW1lRXhpdCgpIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICB0dC5leGl0TWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLosIPnlKjmiJDlip9cIiwgcmVzLmRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLosIPnlKjlpLHotKVcIiwgcmVzLmVyck1zZyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19