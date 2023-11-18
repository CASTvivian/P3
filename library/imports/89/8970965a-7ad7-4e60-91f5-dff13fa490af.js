"use strict";
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