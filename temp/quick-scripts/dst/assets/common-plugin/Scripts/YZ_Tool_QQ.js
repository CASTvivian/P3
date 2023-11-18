
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_QQ.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9RUS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFDaEMsNkNBQXlEO0FBQ3pELHFEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLFlBQVksR0FBVywrQkFBK0IsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBVyxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPO0FBQ1AsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFHeEM7SUFBQTtRQUVJOztTQUVDO1FBQ0Qsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFLMUIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQU1uQixXQUFXO1FBQ1gscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBS2xDLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsT0FBTztRQUNQLFNBQUksR0FBVyxHQUFHLENBQUM7UUFlbkIsVUFBVTtRQUNWLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBWTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFpQjVCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFZLEtBQUssQ0FBQztJQXNoQjlCLENBQUM7SUExbEJHLHNCQUFXLG9DQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsK0JBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFD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QUNsQyxJQUFJO2dCQUNBLFlBQVk7Z0JBQ1osRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFBO2FBQ3ZCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQjtTQUNKO0lBQ0wsQ0FBQztJQTlsQmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FnbUI5QjtJQUFELGlCQUFDO0NBaG1CRCxBQWdtQkMsSUFBQTtrQkFobUJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgTGV2ZWxTdGF0dXMgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwczovL2FwcHMueW91bGVzcC5jb20vZ3NzP1wiO1xyXG5jb25zdCBQT1NUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwczovL3JlcG9ydC55b3VsZXRkLmNvbS9nc3M/XCI7XHJcbi8vIOm7mOiupOmFjee9rlxyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlaX1Rvb2xfUVEge1xyXG5cclxuICAgIC8qKlxyXG4gICAqIOacjeWKoeWZqOmFjee9ruS/oeaBr1xyXG4gICAqL1xyXG4gICAgX3NlcnZlckNvbmZpZzogYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgX3N5c0luZm86IGFueSA9IHt9O1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDmoYzpnaLlm77moIfmmK/lkKbliJvlu7pcclxuICAgIF9zaG9ydGN1dENyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBnZXQgU2hvcnRjdXRDcmVhdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9ydGN1dENyZWF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX3NoYXJlQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIF9pc1NoYXJlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy/orr7lpIdVSURcclxuICAgIF91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54mI5pys5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnYW1lVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB1dGlscy5jb25maWcucXFjb25maWcudmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVpZCgpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl91aWQ7XHJcbiAgICAgICAgLy8gdGhpcy5fbG9naW4oKTtcclxuICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mnI3liqHlmajov5Tlm55VSURcclxuICAgIF9zZXJ2aWNlX3VpZDogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnI3liqHlmajov5Tlm55VSURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXJ2aWNlSWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2VfdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fc2VydmljZV91aWQ7XHJcbiAgICAgICAgdGhpcy5yZXBvcnRMb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2xvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9sb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGFzeW5jIF9sb2dpbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9sb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg55m75b2V6K+35rGC6Ze06ZqU5bCP5LqO77yaJHt0aGlzLl9sb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJxceaaguaXtuS4jeiOt+WPlnVpZO+8jHVpZOWFqOmDqOS4ujBcIik7XHJcbiAgICAgICAgdGhpcy5fdWlkID0gXCIwXCI7XHJcbiAgICAgICAgLy8gdGhpcy5yZXBvcnRMb2dpbigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBfcmVwb3J0TG9naW5UaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgX3JlcG9ydExvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG4gICAgaXNSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55m75b2V5o6l5Y+j6I635Y+WVUlEXHJcbiAgICAgKi9cclxuICAgIHJlcG9ydExvZ2luKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVwb3J0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1JlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gc2VsZi5fcmVwb3J0TG9naW5UaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhpbnRlcnZhbCwgXCIgPDw8PDw8LGludGVydmFsXCIsIFwiIF9yZXBvcnRMb2dpblRpbWUgPj4+XCIsIHNlbGYuX3JlcG9ydExvZ2luVGltZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VyVGltZSwgY3VyVGltZSAtIHNlbGYuX3JlcG9ydExvZ2luVGltZSwgaW50ZXJ2YWwpXHJcbiAgICAgICAgaWYgKGludGVydmFsID4gMCAmJiBpbnRlcnZhbCA8IDMwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOS4iuaKpeeZu+W9leiOt+WPllVJROWwj+S6ju+8miR7c2VsZi5fcmVwb3J0TG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLl9yZXBvcnRMb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBcIm09bG9naW5cIjtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBTVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmRldmljZV9kYXRhPTBgO1xyXG5cclxuICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZGF0YT1cIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXN1bHQ9XCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXN1bHQudWlkPVwiICsgcmVzdWx0LnVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2VydmljZV91aWQgPSBcIlwiICsgcmVzdWx0LnVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWxmLl9zZXJ2aWNlX3VpZDpcIiArIHNlbGYuX3NlcnZpY2VfdWlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluaVsOaNruWksei0pTFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNRUSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai5xcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmoucXEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VfdWlkID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfU0VSVklDRV9VSUQpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IHRoaXMuX3NlcnZpY2VfdWlkID8gdGhpcy5fc2VydmljZV91aWQgOiBcIjBcIjtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N5c0luZm8gPSBxcS5nZXRTeXN0ZW1JbmZvU3luYygpXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiUVEg5bCP5ri45oiP5bmz5Y+w5L+h5oGvOiBcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5TeXNJbmZvKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJRUSDlsI/muLjmiI/lubPlj7DmlbDmja7ojrflj5blpLHotKUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ29uZmlnKCk7XHJcblxyXG4gICAgICAgICAgICAvLyDlvIDlkK/lj7PkuIrop5Lovazlj5FcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFxLnNob3dTaGFyZU1lbnUoKTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFxLm9uU2hhcmVBcHBNZXNzYWdlKHRoaXMuX2dldFNoYXJlSW5mby5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxcS5vblNob3coKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk9uU2hvdzogXCIsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNTaGFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU2hhcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGFyZUNhbGxiYWNrKHRydWUsIFwi5YiG5Lqr5oiQ5YqfIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuQ3JlYXRlU2hvcnRjdXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnN0YXJ0X2F1dG9fY3JlYXRlX3Nob3J0X2N1dF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7hOS7tuWIneWni+WMluaIkOWKn++8jOW8ueWHuuiHquWKqOWIm+W7uuahjOmdou+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg57uE5Lu25Yid5aeL5YyW5oiQ5Yqf77yMJHt1dGlscy5TZXJ2ZXJDb25maWcuc3RhcnRfYXV0b19jcmVhdGVfc2hvcnRfY3V0X3RpbWV956eS5ZCO5by55Ye66Ieq5Yqo5Yib5bu65qGM6Z2i77yBYClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNob3J0Y3V0KChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLoh6rliqjliJvlu7rmoYzpnaLmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiHquWKqOWIm+W7uuahjOmdouWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdXRpbHMuU2VydmVyQ29uZmlnLnN0YXJ0X2F1dG9fY3JlYXRlX3Nob3J0X2N1dF90aW1lICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLmF1dG9fYWRkX2Zhdm9yaXRlcyAmJiB1dGlscy5TZXJ2ZXJDb25maWcuYXV0b19hZGRfZmF2b3JpdGVzID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn6Ieq5Yqo5re75Yqg5Yiw5pCc6JePJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGYXZvcml0ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn57uE5Lu25Yid5aeL5YyW5a6M5oiQLOmqjOivgeaYr+WQpueZu+mZhu+8gScsIHV0aWxzLlNlcnZlckNvbmZpZy5hZGRfcmVjZW50X2NvbG9yX3NpZ24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZyAmJiB1dGlscy5TZXJ2ZXJDb25maWcuYWRkX3JlY2VudF9jb2xvcl9zaWduKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZy5hZGRfcmVjZW50X2NvbG9yX3NpZ24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbG9yU2lnbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcS5jaGVja1Nlc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJzZXNzaW9uX2tleSDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSZWNlbnRDb2xvclNpZ24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXNzaW9uX2tleSDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2Vzc2lvbl9rZXkg5bey57uP5aSx5pWI77yM6ZyA6KaB6YeN5paw5omn6KGM55m75b2V5rWB56iLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXEubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfnmbvlvZXmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJlY2VudENvbG9yU2lnbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCfnmbvlvZXlpLHotKXvvIEnICsgcmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOa3u+WKoOWIsOW9qeetvlxyXG4gICAgKi9cclxuICAgIGFkZFJlY2VudENvbG9yU2lnbigpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi6LCD55So5re75Yqg5b2p562+Pj4+Pj4+PlwiKTtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxcS5hZGRSZWNlbnRDb2xvclNpZ24oe1xyXG4gICAgICAgICAgICBxdWVyeTogJ2E9MSZiPTInLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygnYWRkUmVjZW50Q29sb3JTaWduIHN1Y2Nlc3M6ICcsIHJlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdhZGRSZWNlbnRDb2xvclNpZ24gZmFpbDogJywgZXJyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdhZGRSZWNlbnRDb2xvclNpZ24gY29tcGxldGU6ICcsIHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNRUSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIm09Z1wiO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdChTVF9TZXJ2ZXJVcmwgKyBtZXRob2QsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiUVHmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlFR5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIlFR5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfdGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZVRpdGxlID0gdGhpcy5fc2VydmVyQ29uZmlnLnNoYXJlcy5zeV90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLnNoYXJlcy5zeV9pbWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfbG9jYWxfcG9zX2lkID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKjmnI3liqHlmajkuIvlj5HnmoTlub/lkYppZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5xcWNvbmZpZy5iYW5uZXJJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcucXFjb25maWcuaW5zZXJ0SWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLnFxY29uZmlnLnZpZGVvSWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcudmlkZW9fcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcucXFjb25maWcuYm94SWQgPSB0aGlzLl9zZXJ2ZXJDb25maWcuYm94X3Bvc19pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLnFxY29uZmlnLmJhbm5lckJveElkID0gdGhpcy5fc2VydmVyQ29uZmlnLmJhbm5lcl9ib3hfcG9zX2lkO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS9v+eUqOacrOWcsOmFjee9rueahOW5v+WRiklEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3lzdGVtSW5mbygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0luZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIHNoYXJlKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhcmVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1NoYXJlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFxLnNoYXJlQXBwTWVzc2FnZSh0aGlzLl9nZXRTaGFyZUluZm8oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0RGF0YShvdGhlckdhbWVBcHBJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIGxldCBhcHBpZDogc3RyaW5nID0gdXRpbHMuY29uZmlnLnFxY29uZmlnLmFwcElEO1xyXG4gICAgICAgICAgICBsZXQgdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9IFwicXFcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gYGh0dHBzOi8vYXBwcy55b3VsZXNwLmNvbS9ncz9tPWp1bXAmYXBwX2lkPSR7YXBwaWR9JnVpZD0ke3VpZH0mY2hhbm5lbD0ke2NoYW5uZWx9Jmp1bXBfYXBwX2lkPSR7b3RoZXJHYW1lQXBwSWR9YDtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeaVsOaNriwgdXJsPVwiLCB1cmwpO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNoYXJlSW5mbygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVJbWdVcmxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNPdmVyTWluVmVyc2lvbihtaW5WZXJzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY3VyVmVyc2lvbjogc3RyaW5nID0gdGhpcy5fc3lzSW5mby5TREtWZXJzaW9uO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlVmVyc2lvbihjdXJWZXJzaW9uLCBtaW5WZXJzaW9uKSA+PSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfY29tcGFyZVZlcnNpb24odjEsIHYyKSB7XHJcbiAgICAgICAgaWYgKCF2MSB8fCAhdjIpIHJldHVybiAtMTtcclxuXHJcbiAgICAgICAgdjEgPSB2MS5zcGxpdCgnLicpXHJcbiAgICAgICAgdjIgPSB2Mi5zcGxpdCgnLicpXHJcbiAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpXHJcblxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSlcclxuICAgICAgICAgICAgY29uc3QgbnVtMiA9IHBhcnNlSW50KHYyW2ldKVxyXG5cclxuICAgICAgICAgICAgaWYgKG51bTEgPiBudW0yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bTEgPCBudW0yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWFs+WNoeaVsOaNrlxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RMZXZlbChsZXZlbDogc3RyaW5nLCBzdGF0dXM6IExldmVsU3RhdHVzLCBsZXZlbE5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVdpbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLnJhbmtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5o6S6KGM5biu5o+Q5Lqk5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc3RLZXkgPSB0aGlzLlNlcnZlckNvbmZpZy5yYW5rZXkgPyB0aGlzLlNlcnZlckNvbmZpZy5yYW5rZXkgOiBcInJhbmtsZXZlbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3N0VmFsdWUgPSBsZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBxcS5zZXRVc2VyQ2xvdWRTdG9yYWdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBLVkRhdGFMaXN0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IHBvc3RLZXksIHZhbHVlOiBwb3N0VmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCflhbPljaHorrDlvZXmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5YWz5Y2h6K6w5b2V5aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCflhbPljaHorrDlvZXosIPnlKjlrozmiJAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLlNlcnZlckNvbmZpZy5zdWJzY3JpYmVfaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQobGV2ZWwpICUgaW50ZXJ2YWwgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6ZW/5pyf6K6i6ZiFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxcS5zdWJzY3JpYmVBcHBNc2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiLS0tLea3u+WKoOiuoumYhea2iOaBry0tLS3miJDlip9cIiwgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCItLS0t5re75Yqg6K6i6ZiF5raI5oGvLS0tLeWksei0pVwiLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIi0tLS3mt7vliqDorqLpmIXmtojmga8tLS0t5byC5bi4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gXCJtPXJsZXZlbFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBQT1NUX1NlcnZlclVybCArIG1ldGhvZCArIGAmbGV2ZWxfaWQ9JHtsZXZlbH0mbGV2ZWxfbmFtZT0ke2VuY29kZVVSSShsZXZlbE5hbWUpfSZzdGF0dXM9JHtzdGF0dXN9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWFs+WNoeaVsOaNruS4iuaKpeWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXoh6rlrprkuYnkuovku7ZcclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFJRFxyXG4gICAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgICAqIEBwYXJhbSBzdGF0dXMg54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOW8ueWHuuaPkOekuuahhlxyXG4gICAgICAqIEBwYXJhbSBtc2cg5raI5oGvXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1RvYXN0KG1zZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxcS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG1zZyxcclxuICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKblj6/ku6XliJvlu7rmoYzpnaLlm77moIcsIOW9k+WJjeW5s+WPsOaYr+WQpuaUr+aMgeWIm+W7uuW/q+aNt+aWueW8j1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBjYW5DcmVhdGVTaG9ydGN1dCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbkNyZWF0ZVNob3J0Y3V0IFwiLCB0aGlzLmlzT3Zlck1pblZlcnNpb24oXCIxLjcuMVwiKSk7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRICYmIFBsYXRVdGlscy5Jc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNPdmVyTWluVmVyc2lvbihcIjEuNy4xXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rmoYzpnaLlm77moIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVNob3J0Y3V0KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBjYWxsYmFja0Z1bmMgPSBjYWxsYmFjaztcclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRICYmIHRoaXMuY2FuQ3JlYXRlU2hvcnRjdXQoKSkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcXEuc2F2ZUFwcFRvRGVza3RvcCh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn5qGM6Z2i5Zu+5qCH5Yib5bu65oiQ5Yqf77yBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ3Fx5Yib5bu65qGM6Z2i5aSx6LSlZXJyJyArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrRnVuYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0Z1bmMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN5bmz5Y+w54mI5pys5LiN5pSv5oyB5Yib5bu65qGM6Z2iXCIpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0Z1bmMoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuXHJcbiAgICAgKiDmt7vliqDmlLbol49cclxuXHJcbiAgICAgKiAqKi9cclxuXHJcbiAgICBhZGRGYXZvcml0ZXMoKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZygnYWRkRmF2b3JpdGVzID4+Pj4nKTtcclxuICAgICAgICBsZXQgZmF2ID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJxcV9mYXZvcml0ZXNcIik7XHJcbiAgICAgICAgaWYgKFwiMVwiID09IGZhdikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKCdoYWQgYWRkVG9GYXZvcml0ZXMnKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aXRsZSA9IFwi5aW95ri45oiP5ZOmXCI7XHJcblxyXG4gICAgICAgIGxldCBpbWcgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSkge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVJbWdVcmwpIHtcclxuICAgICAgICAgICAgICAgIGltZyA9IHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxcS5hZGRUb0Zhdm9yaXRlcyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IGltZyxcclxuICAgICAgICAgICAgcXVlcnk6ICdhPTEmYj0yJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygnYWRkVG9GYXZvcml0ZXMgc3VjY2VzcycsIHJlcylcclxuICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFwicXFfZmF2b3JpdGVzXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygnYWRkVG9GYXZvcml0ZXMgZmFpbCcsIGVycilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coJ2FkZFRvRmF2b3JpdGVzIGluZm8nLCByZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5pmu6YCa5b2p562+XHJcbiAgICAgKi9cclxuICAgIGFkZENvbG9yU2lnbigpIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBxcS5hZGRDb2xvclNpZ24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdhZGRDb2xvclNpZ24gc3VjY2VzcycsIHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygnYWRkQ29sb3JTaWduIGZhaWwnLCBlcnIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCdhZGRDb2xvclNpZ24gaW5mbycsIHJlcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAgOWHuua4uOaIj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2FtZUV4aXQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0b29sIHFxIEdhbWVFeGl0XCIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBxcS5leGl0TWluaVByb2dyYW0oKVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19