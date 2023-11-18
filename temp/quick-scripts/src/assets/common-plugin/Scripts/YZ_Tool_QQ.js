"use strict";
cc._RF.push(module, 'a73e9wwNNVCyra8sZ9EPiRC', 'YZ_Tool_QQ');
// common-plugin/Scripts/YZ_Tool_QQ.ts

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
var YZ_Tool_QQ = /** @class */ (function () {
    function YZ_Tool_QQ() {
        /**
       * 服务器配置信息
       */
        this._serverConfig = null;
        this._sysInfo = {};
        // 桌面图标是否创建
        this._shortcutCreated = false;
        this._shareCallback = null;
        this._isShare = false;
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
    Object.defineProperty(YZ_Tool_QQ.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_QQ.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_QQ.prototype, "ShortcutCreated", {
        get: function () {
            return this._shortcutCreated;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 当前版本号
     */
    YZ_Tool_QQ.prototype.gameVersion = function () {
        return Utils_1.utils.config.qqconfig.version;
    };
    Object.defineProperty(YZ_Tool_QQ.prototype, "uid", {
        get: function () {
            // if (this._service_uid != "0") return this._uid;
            // this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_QQ.prototype, "serviceId", {
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
    YZ_Tool_QQ.prototype._login = function () {
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
                Utils_1.utils.showLog("qq暂时不获取uid，uid全部为0");
                this._uid = "0";
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_QQ.prototype.reportLogin = function () {
        var _this = this;
        if (this.isReport)
            return;
        this.isReport = true;
        var self = this;
        var curTime = new Date().getTime();
        var interval = (curTime - self._reportLoginTime) / 1000;
        // utils.showLog(interval, " <<<<<<,interval", " _reportLoginTime >>>", self._reportLoginTime);
        // console.log(curTime, curTime - self._reportLoginTime, interval)
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
    YZ_Tool_QQ.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.IsQQ) {
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.qq) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.qq);
                }
            }
            this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            try {
                //@ts-ignore
                this._sysInfo = qq.getSystemInfoSync();
                Utils_1.utils.showLog("QQ 小游戏平台信息: ", JSON.stringify(this.SysInfo));
            }
            catch (e) {
                Utils_1.utils.showLog("QQ 小游戏平台数据获取失败!");
            }
            this._loadConfig();
            // 开启右上角转发
            //@ts-ignore
            qq.showShareMenu();
            //@ts-ignore
            qq.onShareAppMessage(this._getShareInfo.bind(this));
            //@ts-ignore
            qq.onShow(function (res) {
                Utils_1.utils.showLog("OnShow: ", res);
                if (_this._isShare) {
                    _this._isShare = false;
                    if (_this._shareCallback) {
                        _this._shareCallback(true, "分享成功!");
                    }
                }
            });
            Utils_1.utils.registerServerInitEvent(function () {
                if (_this.canCreateShortcut()) {
                    if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.start_auto_create_short_cut_time) {
                        Utils_1.utils.SendEvent("组件初始化成功，弹出自动创建桌面！");
                        Utils_1.utils.showLog("\u7EC4\u4EF6\u521D\u59CB\u5316\u6210\u529F\uFF0C" + Utils_1.utils.ServerConfig.start_auto_create_short_cut_time + "\u79D2\u540E\u5F39\u51FA\u81EA\u52A8\u521B\u5EFA\u684C\u9762\uFF01");
                        setTimeout(function () {
                            _this.createShortcut(function (res) {
                                if (res) {
                                    Utils_1.utils.showLog("自动创建桌面成功！");
                                }
                                else {
                                    Utils_1.utils.showLog("自动创建桌面失败！");
                                }
                            });
                        }, Utils_1.utils.ServerConfig.start_auto_create_short_cut_time * 1000);
                    }
                }
                if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.auto_add_favorites && Utils_1.utils.ServerConfig.auto_add_favorites == "true") {
                    Utils_1.utils.showLog('自动添加到搜藏');
                    _this.addFavorites();
                }
                Utils_1.utils.showLog('组件初始化完成,验证是否登陆！', Utils_1.utils.ServerConfig.add_recent_color_sign);
                if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.add_recent_color_sign) {
                    if (Utils_1.utils.ServerConfig.add_recent_color_sign == 1) {
                        _this.addColorSign();
                    }
                    else {
                        //@ts-ignore
                        qq.checkSession({
                            success: function () {
                                Utils_1.utils.showLog("session_key 未过期，并且在本生命周期一直有效");
                                _this.addRecentColorSign();
                                // session_key 未过期，并且在本生命周期一直有效
                            },
                            fail: function () {
                                // session_key 已经失效，需要重新执行登录流程
                                //@ts-ignore
                                qq.login({
                                    success: function (res) {
                                        if (res.code) {
                                            Utils_1.utils.showLog('登录成功！');
                                            _this.addRecentColorSign();
                                        }
                                        else {
                                            Utils_1.utils.showLog('登录失败！' + res.errMsg);
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            }, this);
        }
    };
    /**
    * 添加到彩签
    */
    YZ_Tool_QQ.prototype.addRecentColorSign = function () {
        Utils_1.utils.showLog("调用添加彩签>>>>>>>");
        //@ts-ignore
        qq.addRecentColorSign({
            query: 'a=1&b=2',
            success: function (res) {
                Utils_1.utils.showLog('addRecentColorSign success: ', res);
            },
            fail: function (err) {
                Utils_1.utils.showLog('addRecentColorSign fail: ', err);
            },
            complete: function (res) {
                Utils_1.utils.showLog('addRecentColorSign complete: ', res);
            }
        });
    };
    YZ_Tool_QQ.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsQQ) {
            var method = "m=g";
            Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
                if (ret) {
                    Utils_1.utils.showLog("QQ服务器配置数据获取成功: data = ", data);
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
                            Utils_1.utils.showLog("QQ服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    Utils_1.utils.showLog("QQ服务器配置数据获取失败, 使用本地配置!");
                }
                if (!_this._serverConfig) {
                    _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                }
                else {
                    if (_this._serverConfig.shares) {
                        if (_this._serverConfig.shares.sy_title) {
                            Utils_1.utils.config.otherconfig.shareTitle = _this._serverConfig.shares.sy_title;
                        }
                        if (_this._serverConfig.shares.sy_img) {
                            Utils_1.utils.config.otherconfig.shareImgUrl = _this._serverConfig.shares.sy_img;
                        }
                    }
                    if (_this._serverConfig.is_local_pos_id
                        && _this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        Utils_1.utils.showLog("使用服务器下发的广告id");
                        Utils_1.utils.config.qqconfig.bannerId = _this._serverConfig.banner_pos_id;
                        Utils_1.utils.config.qqconfig.insertId = _this._serverConfig.intersititia_pos_id;
                        Utils_1.utils.config.qqconfig.videoId = _this._serverConfig.video_pos_id;
                        Utils_1.utils.config.qqconfig.boxId = _this._serverConfig.box_pos_id;
                        Utils_1.utils.config.qqconfig.bannerBoxId = _this._serverConfig.banner_box_pos_id;
                    }
                    else {
                        Utils_1.utils.showLog("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.emitServerInitEvent();
            });
        }
    };
    YZ_Tool_QQ.prototype.getSystemInfo = function () {
        if (PlatUtils_1.default.IsQQ) {
            return this._sysInfo;
        }
    };
    YZ_Tool_QQ.prototype.share = function (callback) {
        if (callback === void 0) { callback = null; }
        if (PlatUtils_1.default.IsQQ) {
            this._shareCallback = callback;
            this._isShare = true;
            //@ts-ignore
            qq.shareAppMessage(this._getShareInfo());
        }
    };
    /**
     * 上报数据
     */
    YZ_Tool_QQ.prototype.postData = function (otherGameAppId) {
        if (PlatUtils_1.default.IsQQ) {
            var appid = Utils_1.utils.config.qqconfig.appID;
            var uid = "0";
            var channel = "qq";
            var url = "https://apps.youlesp.com/gs?m=jump&app_id=" + appid + "&uid=" + uid + "&channel=" + channel + "&jump_app_id=" + otherGameAppId;
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
    YZ_Tool_QQ.prototype._getShareInfo = function () {
        if (PlatUtils_1.default.IsQQ) {
            return {
                title: Utils_1.utils.config.otherconfig.shareTitle,
                imageUrl: Utils_1.utils.config.otherconfig.shareImgUrl
            };
        }
        return {};
    };
    YZ_Tool_QQ.prototype.isOverMinVersion = function (minVersion) {
        var curVersion = this._sysInfo.SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    };
    YZ_Tool_QQ.prototype._compareVersion = function (v1, v2) {
        if (!v1 || !v2)
            return -1;
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_QQ.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsQQ) {
            if (status == YZ_Constant_1.LevelStatus.GameWin) {
                if (this.ServerConfig.rankey) {
                    //排行帮提交数据
                    var postKey = this.ServerConfig.rankey ? this.ServerConfig.rankey : "ranklevel";
                    var postValue = level;
                    //@ts-ignore
                    qq.setUserCloudStorage({
                        KVDataList: [
                            { key: postKey, value: postValue }
                        ],
                        success: function (res) {
                            Utils_1.utils.showLog('关卡记录成功');
                        },
                        fail: function (res) {
                            Utils_1.utils.showLog('关卡记录失败');
                        },
                        complete: function (res) {
                            Utils_1.utils.showLog('关卡记录调用完成');
                        },
                    });
                }
                var interval = this.ServerConfig.subscribe_interval;
                if (interval) {
                    try {
                        if (parseInt(level) % interval == 0) {
                            // 长期订阅
                            //@ts-ignore 
                            qq.subscribeAppMsg({
                                subscribe: true,
                                success: function (res) {
                                    Utils_1.utils.showLog("----添加订阅消息----成功", res);
                                },
                                fail: function (res) {
                                    Utils_1.utils.showLog("----添加订阅消息----失败", res);
                                }
                            });
                        }
                    }
                    catch (error) {
                        Utils_1.utils.showLog("----添加订阅消息----异常");
                    }
                }
            }
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
    YZ_Tool_QQ.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsQQ) {
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
    YZ_Tool_QQ.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsQQ) {
            //@ts-ignore
            qq.showToast({
                title: msg,
                icon: "none",
                duration: 2000
            });
        }
    };
    /**
    * 是否可以创建桌面图标, 当前平台是否支持创建快捷方式
    */
    YZ_Tool_QQ.prototype.canCreateShortcut = function () {
        console.log("canCreateShortcut ", this.isOverMinVersion("1.7.1"));
        if (PlatUtils_1.default.IsQQ && PlatUtils_1.default.IsAndroid) {
            return this.isOverMinVersion("1.7.1");
        }
        return false;
    };
    /**
     * 创建桌面图标
     */
    YZ_Tool_QQ.prototype.createShortcut = function (callback) {
        var _this = this;
        var callbackFunc = callback;
        if (PlatUtils_1.default.IsQQ && this.canCreateShortcut()) {
            //@ts-ignore
            qq.saveAppToDesktop({
                success: function () {
                    Utils_1.utils.showLog('桌面图标创建成功！');
                    _this._shortcutCreated = true;
                    if (callbackFunc) {
                        callbackFunc(true);
                    }
                },
                fail: function (err) {
                    Utils_1.utils.showLog('qq创建桌面失败err' + err);
                    if (callbackFunc) {
                        callbackFunc(false);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            Utils_1.utils.showLog("当前平台版本不支持创建桌面");
            if (callbackFunc) {
                callbackFunc(false);
            }
        }
    };
    /**

     * 添加收藏

     * **/
    YZ_Tool_QQ.prototype.addFavorites = function () {
        Utils_1.utils.showLog('addFavorites >>>>');
        var fav = YZ_LocalStorage_1.default.getItem("qq_favorites");
        if ("1" == fav) {
            Utils_1.utils.showLog('had addToFavorites');
            return;
        }
        var title = "好游戏哦";
        var img = "";
        if (Utils_1.utils.config.otherconfig) {
            if (Utils_1.utils.config.otherconfig.shareTitle) {
                title = Utils_1.utils.config.otherconfig.shareTitle;
            }
            if (Utils_1.utils.config.otherconfig.shareImgUrl) {
                img = Utils_1.utils.config.otherconfig.shareImgUrl;
            }
        }
        //@ts-ignore
        qq.addToFavorites({
            title: title,
            imageUrl: img,
            query: 'a=1&b=2',
            success: function (res) {
                Utils_1.utils.showLog('addToFavorites success', res);
                YZ_LocalStorage_1.default.setItem("qq_favorites", "1");
            },
            fail: function (err) {
                Utils_1.utils.showLog('addToFavorites fail', err);
            },
            complete: function (res) {
                Utils_1.utils.showLog('addToFavorites info', res);
            }
        });
    };
    /**
     * 添加普通彩签
     */
    YZ_Tool_QQ.prototype.addColorSign = function () {
        //@ts-ignore
        qq.addColorSign({
            success: function (res) {
                Utils_1.utils.showLog('addColorSign success', res);
            },
            fail: function (err) {
                Utils_1.utils.showLog('addColorSign fail', err);
            },
            complete: function (res) {
                Utils_1.utils.showLog('addColorSign info', res);
            }
        });
    };
    /**
     * 退出游戏
     */
    YZ_Tool_QQ.prototype.GameExit = function () {
        if (PlatUtils_1.default.IsQQ) {
            Utils_1.utils.showLog("tool qq GameExit");
            try {
                //@ts-ignore
                qq.exitMiniProgram();
            }
            catch (error) {
                cc.log(error);
            }
        }
    };
    YZ_Tool_QQ = __decorate([
        ccclass
    ], YZ_Tool_QQ);
    return YZ_Tool_QQ;
}());
exports.default = YZ_Tool_QQ;

cc._RF.pop();