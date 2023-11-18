
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Tool_QTT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22febPJ0XROobrXFFsoOvDe', 'YZ_Tool_QTT');
// common-plugin/Scripts/YZ_Tool_QTT.ts

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
exports.QTT_REPORT_TYPE = void 0;
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ST_DefaultServerConfig = "";
var ST_ServerUrl = "http://apps.youlesp.com/gss?";
var POST_ServerUrl = "http://report.youlesp.com/gss?";
//@ts-ignore
var md5 = require('./md5.js');
var QTT_ServerUrl = "https://newidea4-gamecenter-backend.1sapp.com/x/open/user/ticket?";
var QTT_Report = "https://newidea4-gamecenter-backend.1sapp.com/x/open/report/round";
/**
 * 趣头条工具类
 */
var YZ_Tool_QTT = /** @class */ (function () {
    function YZ_Tool_QTT() {
        /**
            * 平台标示
            */
        this.platForm = "";
        //@ts-ignore
        this.qttGame = window.qttGame;
        this._serverConfig = null;
        /**
         * 用户临时标示
         */
        this.ticket = "";
        this._ip = "192.168.0.1";
        this._sign = "";
        /**
         * 服务器地址
         */
        this.serverPath = "http://apps.youlesp.com/gss?";
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        this._loginTime = 0;
        this._loginInterval = 30;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
        this.iframe = null;
        this.form = null;
        this._isReady = false;
        this._isLogin = false;
        this._isLoad = false;
        this._isStart = false;
    }
    Object.defineProperty(YZ_Tool_QTT.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_QTT.prototype, "uid", {
        get: function () {
            if (this._service_uid != "0")
                return this._uid;
            this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Tool_QTT.prototype, "serviceId", {
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
    YZ_Tool_QTT.prototype._login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curTime, interval, self, url, xhr;
            return __generator(this, function (_a) {
                curTime = new Date().getTime();
                interval = (curTime - this._loginTime) / 1000;
                if (interval > 0 && interval < 30) {
                    Utils_1.utils.showLog("\u767B\u5F55\u8BF7\u6C42\u95F4\u9694\u5C0F\u4E8E\uFF1A" + this._loginInterval + "\u79D2");
                    return [2 /*return*/];
                }
                this._loginTime = curTime;
                self = this;
                Utils_1.utils.showLog("qtt暂时不获取uid，uid全部为0");
                this._uid = "0";
                url = this.getUrl();
                console.log("qtt获取用户的地址为：" + url);
                xhr = new XMLHttpRequest();
                xhr.timeout = 6000; // 单位毫秒
                xhr.open('get', url);
                xhr.send();
                xhr.onreadystatechange = function () {
                    Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log("请求成功");
                        console.log(xhr.responseText);
                        var msg = xhr.responseText;
                        var result = JSON.parse(msg);
                        console.log(result);
                        Utils_1.utils.showLog("获取数据成功1");
                        self._uid = result.data.open_id;
                        self.postServerData(QTT_REPORT_TYPE.ready);
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_UID, self._uid);
                        console.log(self._uid);
                    }
                    if (xhr.status != 200) {
                    }
                };
                xhr.ontimeout = function () {
                    Utils_1.utils.showLog("请求超时!");
                };
                xhr.onerror = function (err) {
                    Utils_1.utils.showLog("请求出错! err=", JSON.stringify(err));
                };
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报登录接口获取UID
     */
    YZ_Tool_QTT.prototype.reportLogin = function () {
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
                    if (result.ip) {
                        _this._ip = result.ip;
                    }
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
     * 初始化
     * @param data 配置数据
     */
    YZ_Tool_QTT.prototype.init = function (data) {
        var _this = this;
        Utils_1.utils.showLog("qtt 初始化>>", data);
        if (data) {
            var configObj = JSON.parse(data);
            if (configObj && configObj.qutoutiao) {
                ST_DefaultServerConfig = JSON.stringify(configObj.qutoutiao);
            }
        }
        cc.game.on(QTT_REPORT_TYPE.ready, function () {
            _this.postServerData(QTT_REPORT_TYPE.login);
        }, this);
        cc.game.on(QTT_REPORT_TYPE.login, function () {
            _this.postServerData(QTT_REPORT_TYPE.load);
        }, this);
        this._uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_UID);
        this._uid = this._uid ? this._uid : "0";
        this.postServerData(QTT_REPORT_TYPE.ready);
        this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
        this._service_uid = this._service_uid ? this._service_uid : "0";
        this.platForm = this.GetRequest("platform");
        this.ticket = this.GetRequest("ticket");
        if (this.ticket && this.platForm) {
            // this.getUserInfo();
            // new QTTHELP().g
            // let qttHelp = new QTTHELP();
            // QTTHelp();
            // QTTHelp().then((res) => {
            //     utils.showLog(">>>>>>>>>>>");
            // }).catch(() => {
            // })
        }
        this.loadServerData();
    };
    /**
     * 每局结束上报数据
     */
    YZ_Tool_QTT.prototype.postGameOverData = function (level) {
        if (PlatUtils_1.default.IsQTT) {
            this.qttGame.completeTask();
            this.qttGame.userInfo({ role: '趣头条', region: '区域1', level: level, ce: '1000000', round: '1', revenue: '100000', extend_info: { age: '18' } });
        }
        // Sys
        var time = Math.floor(new Date().getTime() / 1000);
        var values = {
            app_id: Utils_1.utils.config.qttconfig.appID,
            open_id: this.uid,
            ip: this._ip,
            round: level,
            game_time: time,
        };
        this.getSign(values);
        var formData = new FormData();
        formData.append("app_id", values.app_id);
        formData.append("open_id", values.open_id);
        formData.append("ip", values.ip);
        formData.append("round", values.round);
        formData.append("game_time", values.game_time);
        formData.append("sign", this._sign);
        this.post(values);
    };
    YZ_Tool_QTT.prototype.post = function (values) {
        if (!this.form) {
            this.form = document.createElement("form");
        }
        else {
            this.form.innerHTML = "";
        }
        if (!this.iframe) {
            this.iframe = document.createElement("iframe");
        }
        this.form.action = QTT_Report;
        this.form.enctype = "application/x-www-form-urlencoded";
        this.form.method = "post";
        this.iframe.name = "form";
        this.iframe.id = "form";
        this.form.target = "form";
        for (var item in values) {
            var opt = document.createElement("textarea");
            opt.name = item;
            opt.value = values[item];
            this.form.appendChild(opt);
        }
        document.body.appendChild(this.iframe);
        this.iframe.appendChild(this.form);
        this.form.submit();
    };
    /**
     * 获取用户信息
     */
    YZ_Tool_QTT.prototype.getUserInfo = function () {
        this.qttGame.getUserInfo(Utils_1.utils.config.qttconfig.appKey, Utils_1.utils.config.qttconfig.appID, this.ticket, this.platForm).then(function (res) {
            // 成功
            Utils_1.utils.showLog("获取用户信息成功 #userInfo=", JSON.stringify(res));
        }).catch(function (err) {
            // 失败
        });
    };
    /**
     * 通过参数名称获取链接里的值
     * @param key 参数名称
     */
    YZ_Tool_QTT.prototype.GetRequest = function (key) {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        var value = theRequest[key];
        return value;
    };
    /**
    * 请求服务器数据
    */
    YZ_Tool_QTT.prototype.loadServerData = function () {
        var _this = this;
        if (!this.uid) {
            cc.error("用户ID为空>>>");
            this._uid = "0";
        }
        var method = "m=g";
        Utils_1.utils.commomHttpRequest(ST_ServerUrl + method, function (ret, data) {
            Utils_1.utils.showLog("loadServerUserdate #ret=", ret, " #data=", data);
            if (ret) {
                if (data) {
                    Utils_1.utils.showLog("qtt服务器配置数据获取成功: data = ", data);
                    var result = JSON.parse(data);
                    if (result) {
                        if (!Utils_1.utils.DebugLoacalConfig) {
                            _this._serverConfig = result;
                            if (_this._serverConfig.is_show_log_view && _this._serverConfig.is_show_log_view == "true") {
                                Utils_1.utils.showLogView = true;
                                Utils_1.utils.showLog();
                            }
                        }
                        else {
                            cc.warn("开启了本地数据测试，使用本地配置!");
                        }
                    }
                    else {
                        Utils_1.utils.showLog("qtt服务器配置数据不是合法的JSON数据, 使用本地配置!");
                    }
                }
                else {
                    Utils_1.utils.showLog("qtt服务器配置数据获取失败, 使用本地配置!");
                }
            }
            else {
            }
            if (!_this._serverConfig) {
                _this._serverConfig = JSON.parse(ST_DefaultServerConfig);
            }
            else {
                if (_this._serverConfig.is_local_pos_id
                    && _this._serverConfig.is_local_pos_id == "false") {
                    // 使用服务器下发的广告id
                    Utils_1.utils.showLog("使用服务器下发的广告id");
                    Utils_1.utils.showLog("趣头条没有广告id");
                }
                else {
                    Utils_1.utils.showLog("使用本地配置的广告ID");
                }
            }
            Utils_1.utils.emitServerInitEvent();
        });
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_QTT.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsQTT) {
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
            if (status == YZ_Constant_1.LevelStatus.GameStart) {
                this.postServerData(QTT_REPORT_TYPE.start);
            }
            //上报到qtt的官方服务器
            if (status == YZ_Constant_1.LevelStatus.GameWin) {
                this.postGameOverData(Number(level));
            }
        }
    };
    YZ_Tool_QTT.prototype.getSign = function (values) {
        var s = this.sign(values);
        values.sign = s;
        this.checkSign(values);
        this._sign = s;
    };
    YZ_Tool_QTT.prototype.getUrl = function () {
        var params = this.getParams();
        var values = {
            app_id: Utils_1.utils.config.qttconfig.appID,
            platform: params.platform,
            ticket: params.ticket,
            time: Math.floor(new Date().getTime() / 1000)
        };
        var s = this.sign(values);
        values.sign = s;
        this._sign = s;
        return QTT_ServerUrl + "app_id=" + values.app_id + "&platform=" + params.platform + "&ticket=" + params.ticket + "&time=" + values.time + "&sign=" + values.sign;
    };
    YZ_Tool_QTT.prototype.getParams = function () {
        var url = window.location.href;
        var paramArr = url.split("&");
        var platform;
        var ticket;
        paramArr.forEach(function (str) {
            if (str.indexOf("platform") != -1) {
                platform = str.split("=")[1];
            }
            if (str.indexOf("ticket") != -1) {
                ticket = str.split("=")[1];
            }
        });
        return { platform: platform, ticket: ticket };
    };
    YZ_Tool_QTT.prototype.sign = function (values) {
        delete values.sign;
        values.app_key = Utils_1.utils.config.qttconfig.appKey;
        var keysArr = [];
        for (var key in values) {
            keysArr.push(key);
        }
        keysArr.sort();
        var keys = '';
        keysArr.forEach(function (e) {
            keys += e;
            keys += values[e];
        });
        console.log("原串：" + keys);
        delete values.app_key;
        var sign = md5(keys);
        return sign;
    };
    YZ_Tool_QTT.prototype.checkSign = function (values) {
        var sign1 = values.sign;
        if (!sign1) {
            console.log('sign error');
            return false;
        }
        var sign2 = this.sign(values);
        if (sign1 !== sign2) {
            console.log("sign error");
            return false;
        }
        console.log('ok');
        return true;
    };
    /**
    *  趣头条服务器上报
    *
    *  参数为object对象, 根据type 属性传入对应字段
    *   @param type {String} ready 游戏资源加载完毕  login 用户成功登陆 load 成功进入游戏界面/主页 start 开始游戏
    *   @param app_id { String} [必填]
    *   @param open_id {String}  参考具体上报说明
    *   @param game_name {String} 参考具体上报说明
    *   @param extend_info  [选填] json对象 {}
    *
    **/
    YZ_Tool_QTT.prototype.postServerData = function (type, info) {
        console.log("趣头条数据上报：" + type, this._uid);
        if (!this.uid && this._uid != "0") {
            cc.error("用户ID不存在 ,不上报数据>>>");
            return;
        }
        switch (type) {
            case QTT_REPORT_TYPE.ready:
                if (this._isReady) {
                    console.log("已经上传过资源加载完毕事件");
                    return;
                }
                break;
            case QTT_REPORT_TYPE.login:
                if (this._isLogin) {
                    console.log("以及上传过资源加载完毕事件");
                    return;
                }
                break;
            case QTT_REPORT_TYPE.load:
                if (this._isLoad) {
                    console.log("以及上传过资源加载完毕事件");
                    return;
                }
                break;
            case QTT_REPORT_TYPE.start:
                if (this._isStart) {
                    console.log("以及上传过资源加载完毕事件");
                    return;
                }
                break;
            default:
                break;
        }
        var app_id = Utils_1.utils.config.qttconfig.appID;
        var game_name = Utils_1.utils.config.qttconfig.gamename;
        var extend_info = info ? info : {};
        if (this.qttGame && this.qttGame.reportData) {
            switch (type) {
                case QTT_REPORT_TYPE.ready:
                    this._isReady = true;
                    break;
                case QTT_REPORT_TYPE.login:
                    this._isLogin = true;
                    break;
                case QTT_REPORT_TYPE.load:
                    this._isLoad = true;
                    break;
                case QTT_REPORT_TYPE.start:
                    this._isStart = true;
                    break;
            }
            this.qttGame.reportData({ "type": type, "open_id": this.uid, "app_id": app_id, "game_name": game_name, "extend_info": extend_info });
            console.log("趣头条成功发送事件：" + type);
            cc.game.emit(type);
        }
        else {
            var self_1 = this;
            console.log("趣头条发送：" + type + "失败");
            setTimeout(function () {
                self_1.postServerData(type, info);
            }, 100);
        }
    };
    /**
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    YZ_Tool_QTT.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsQTT) {
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
    YZ_Tool_QTT = __decorate([
        ccclass
    ], YZ_Tool_QTT);
    return YZ_Tool_QTT;
}());
exports.default = YZ_Tool_QTT;
var QTT_REPORT_TYPE;
(function (QTT_REPORT_TYPE) {
    QTT_REPORT_TYPE["ready"] = "ready";
    QTT_REPORT_TYPE["login"] = "login";
    QTT_REPORT_TYPE["load"] = "load";
    QTT_REPORT_TYPE["start"] = "start";
    QTT_REPORT_TYPE["newRole"] = "newRole";
    QTT_REPORT_TYPE["newUser"] = "newUser";
    QTT_REPORT_TYPE["upgrade"] = "upgrade";
    QTT_REPORT_TYPE["userInfo"] = "userInfo";
    QTT_REPORT_TYPE["abnormal"] = "abnormal";
})(QTT_REPORT_TYPE = exports.QTT_REPORT_TYPE || (exports.QTT_REPORT_TYPE = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVG9vbF9RVFQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUNoQyw2Q0FBeUQ7QUFDekQscURBQWdEO0FBRTFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDLElBQUksc0JBQXNCLEdBQVcsRUFBRSxDQUFDO0FBQ3hDLElBQU0sWUFBWSxHQUFXLDhCQUE4QixDQUFDO0FBQzVELElBQU0sY0FBYyxHQUFXLGdDQUFnQyxDQUFDO0FBQ2hFLFlBQVk7QUFDWixJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEMsSUFBTSxhQUFhLEdBQVcsbUVBQW1FLENBQUE7QUFDakcsSUFBTSxVQUFVLEdBQVcsbUVBQW1FLENBQUE7QUFDOUY7O0dBRUc7QUFFSDtJQUFBO1FBQ0k7O2NBRU07UUFDTixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLFlBQVk7UUFDWixZQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN6QixrQkFBYSxHQUFRLElBQUksQ0FBQztRQUkxQjs7V0FFRztRQUNILFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFcEIsUUFBRyxHQUFXLGFBQWEsQ0FBQztRQUM1QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25COztXQUVHO1FBQ0ssZUFBVSxHQUFXLDhCQUE4QixDQUFDO1FBRzVELE9BQU87UUFDUCxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBUW5CLFVBQVU7UUFDVixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQVkzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBZ0Q1QixxQkFBZ0IsR0FB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QUFHLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSTtnQkFDNUMsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsYUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDL0I7cUJBQU07b0JBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDL0I7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBM2dCZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTRnQi9CO0lBQUQsa0JBQUM7Q0E1Z0JELEFBNGdCQyxJQUFBO2tCQTVnQm9CLFdBQVc7QUE4Z0JoQyxJQUFZLGVBVVg7QUFWRCxXQUFZLGVBQWU7SUFDdkIsa0NBQWUsQ0FBQTtJQUNmLGtDQUFlLENBQUE7SUFDZixnQ0FBYSxDQUFBO0lBQ2Isa0NBQWUsQ0FBQTtJQUNmLHNDQUFtQixDQUFBO0lBQ25CLHNDQUFtQixDQUFBO0lBQ25CLHNDQUFtQixDQUFBO0lBQ25CLHdDQUFxQixDQUFBO0lBQ3JCLHdDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFWVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQVUxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxubGV0IFNUX0RlZmF1bHRTZXJ2ZXJDb25maWc6IHN0cmluZyA9IFwiXCI7XHJcbmNvbnN0IFNUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcbmNvbnN0IFBPU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9yZXBvcnQueW91bGVzcC5jb20vZ3NzP1wiO1xyXG4vL0B0cy1pZ25vcmVcclxuY29uc3QgbWQ1ID0gcmVxdWlyZSgnLi9tZDUuanMnKTtcclxuY29uc3QgUVRUX1NlcnZlclVybDogc3RyaW5nID0gXCJodHRwczovL25ld2lkZWE0LWdhbWVjZW50ZXItYmFja2VuZC4xc2FwcC5jb20veC9vcGVuL3VzZXIvdGlja2V0P1wiXHJcbmNvbnN0IFFUVF9SZXBvcnQ6IHN0cmluZyA9IFwiaHR0cHM6Ly9uZXdpZGVhNC1nYW1lY2VudGVyLWJhY2tlbmQuMXNhcHAuY29tL3gvb3Blbi9yZXBvcnQvcm91bmRcIlxyXG4vKipcclxuICog6Laj5aS05p2h5bel5YW357G7XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Ub29sX1FUVCB7XHJcbiAgICAvKipcclxuICAgICAgICAqIOW5s+WPsOagh+ekuiBcclxuICAgICAgICAqL1xyXG4gICAgcGxhdEZvcm06IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBxdHRHYW1lID0gd2luZG93LnF0dEdhbWU7XHJcbiAgICBfc2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlckNvbmZpZztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55So5oi35Li05pe25qCH56S6XHJcbiAgICAgKi9cclxuICAgIHRpY2tldDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBfaXA6IHN0cmluZyA9IFwiMTkyLjE2OC4wLjFcIjtcclxuICAgIF9zaWduOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmnI3liqHlmajlnLDlnYBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXJ2ZXJQYXRoOiBzdHJpbmcgPSBcImh0dHA6Ly9hcHBzLnlvdWxlc3AuY29tL2dzcz9cIjtcclxuXHJcblxyXG4gICAgLy/orr7lpIdVSURcclxuICAgIF91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdWlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3VpZDtcclxuICAgICAgICB0aGlzLl9sb2dpbigpO1xyXG4gICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL+acjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgX3NlcnZpY2VfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOacjeWKoeWZqOi/lOWbnlVJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNlcnZpY2VJZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZV91aWQgIT0gXCIwXCIpIHJldHVybiB0aGlzLl9zZXJ2aWNlX3VpZDtcclxuICAgICAgICB0aGlzLnJlcG9ydExvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfbG9naW5UaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgX2xvZ2luSW50ZXJ2YWw6IG51bWJlciA9IDMwO1xyXG4gICAgYXN5bmMgX2xvZ2luKCkge1xyXG5cclxuICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2xvZ2luVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDAgJiYgaW50ZXJ2YWwgPCAzMCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDnmbvlvZXor7fmsYLpl7TpmpTlsI/kuo7vvJoke3RoaXMuX2xvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcInF0dOaaguaXtuS4jeiOt+WPlnVpZO+8jHVpZOWFqOmDqOS4ujBcIik7XHJcbiAgICAgICAgdGhpcy5fdWlkID0gXCIwXCI7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0VXJsKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJxdHTojrflj5bnlKjmiLfnmoTlnLDlnYDkuLrvvJpcIiArIHVybClcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA2MDAwOyAgICAvLyDljZXkvY3mr6vnp5JcclxuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLnirbmgIHmlLnlj5gsIHJlYWVkeVN0YXRlPVwiLCB4aHIucmVhZHlTdGF0ZSwgXCI7IHN0YXR1cz1cIiwgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+axguaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IHhoci5yZXNwb25zZVRleHRcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5pWw5o2u5oiQ5YqfMVwiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3VpZCA9IHJlc3VsdC5kYXRhLm9wZW5faWQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnBvc3RTZXJ2ZXJEYXRhKFFUVF9SRVBPUlRfVFlQRS5yZWFkeSk7XHJcbiAgICAgICAgICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9VSUQsIHNlbGYuX3VpZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLl91aWQpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9IDIwMCkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6K+35rGC6LaF5pe2IVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLor7fmsYLlh7rplJkhIGVycj1cIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMucmVwb3J0TG9naW4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnmbvlvZXmjqXlj6Pojrflj5ZVSURcclxuICAgICAqL1xyXG4gICAgcmVwb3J0TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXBvcnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSBzZWxmLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgMzApIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5LiK5oql55m75b2V6I635Y+WVUlE5bCP5LqO77yaJHtzZWxmLl9yZXBvcnRMb2dpbkludGVydmFsfeenkmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuX3JlcG9ydExvZ2luVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1sb2dpblwiO1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmZGV2aWNlX2RhdGE9MGA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhPVwiICsgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInJlc3VsdC51aWQ9XCIgKyByZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lwID0gcmVzdWx0LmlwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6K+35rGC55m75b2V5oiQ5YqfISBfc2VydmljZV91aWQ9XCIgKyBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluaVsOaNruWksei0pTFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJxdHQg5Yid5aeL5YyWPj5cIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iaiAmJiBjb25maWdPYmoucXV0b3V0aWFvKSB7XHJcbiAgICAgICAgICAgICAgICBTVF9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLnF1dG91dGlhbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLmdhbWUub24oUVRUX1JFUE9SVF9UWVBFLnJlYWR5LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zdFNlcnZlckRhdGEoUVRUX1JFUE9SVF9UWVBFLmxvZ2luKTtcclxuICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKFFUVF9SRVBPUlRfVFlQRS5sb2dpbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBvc3RTZXJ2ZXJEYXRhKFFUVF9SRVBPUlRfVFlQRS5sb2FkKTtcclxuICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgIHRoaXMuX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1VJRCk7XHJcbiAgICAgICAgdGhpcy5fdWlkID0gdGhpcy5fdWlkID8gdGhpcy5fdWlkIDogXCIwXCI7XHJcblxyXG4gICAgICAgIHRoaXMucG9zdFNlcnZlckRhdGEoUVRUX1JFUE9SVF9UWVBFLnJlYWR5KTtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlEKTtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlX3VpZCA9IHRoaXMuX3NlcnZpY2VfdWlkID8gdGhpcy5fc2VydmljZV91aWQgOiBcIjBcIjtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF0Rm9ybSA9IHRoaXMuR2V0UmVxdWVzdChcInBsYXRmb3JtXCIpO1xyXG4gICAgICAgIHRoaXMudGlja2V0ID0gdGhpcy5HZXRSZXF1ZXN0KFwidGlja2V0XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnRpY2tldCAmJiB0aGlzLnBsYXRGb3JtKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0VXNlckluZm8oKTtcclxuICAgICAgICAgICAgLy8gbmV3IFFUVEhFTFAoKS5nXHJcbiAgICAgICAgICAgIC8vIGxldCBxdHRIZWxwID0gbmV3IFFUVEhFTFAoKTtcclxuICAgICAgICAgICAgLy8gUVRUSGVscCgpO1xyXG4gICAgICAgICAgICAvLyBRVFRIZWxwKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwiPj4+Pj4+Pj4+Pj5cIik7XHJcbiAgICAgICAgICAgIC8vIH0pLmNhdGNoKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZFNlcnZlckRhdGEoKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5bGA57uT5p2f5LiK5oql5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0R2FtZU92ZXJEYXRhKGxldmVsOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXR0R2FtZS5jb21wbGV0ZVRhc2soKTtcclxuICAgICAgICAgICAgdGhpcy5xdHRHYW1lLnVzZXJJbmZvKHsgcm9sZTogJ+i2o+WktOadoScsIHJlZ2lvbjogJ+WMuuWfnzEnLCBsZXZlbDogbGV2ZWwsIGNlOiAnMTAwMDAwMCcsIHJvdW5kOiAnMScsIHJldmVudWU6ICcxMDAwMDAnLCBleHRlbmRfaW5mbzogeyBhZ2U6ICcxOCcgfSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTeXNcclxuXHJcbiAgICAgICAgbGV0IHRpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIGFwcF9pZDogdXRpbHMuY29uZmlnLnF0dGNvbmZpZy5hcHBJRCxcclxuICAgICAgICAgICAgb3Blbl9pZDogdGhpcy51aWQsXHJcbiAgICAgICAgICAgIGlwOiB0aGlzLl9pcCxcclxuICAgICAgICAgICAgcm91bmQ6IGxldmVsLFxyXG4gICAgICAgICAgICBnYW1lX3RpbWU6IHRpbWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldFNpZ24odmFsdWVzKTtcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJhcHBfaWRcIiwgdmFsdWVzLmFwcF9pZCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwib3Blbl9pZFwiLCB2YWx1ZXMub3Blbl9pZCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiaXBcIiwgdmFsdWVzLmlwKTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJyb3VuZFwiLCB2YWx1ZXMucm91bmQpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImdhbWVfdGltZVwiLCB2YWx1ZXMuZ2FtZV90aW1lKTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJzaWduXCIsIHRoaXMuX3NpZ24pO1xyXG4gICAgICAgIHRoaXMucG9zdCh2YWx1ZXMpXHJcbiAgICB9XHJcblxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCA9IG51bGw7XHJcbiAgICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQgPSBudWxsO1xyXG4gICAgcG9zdCh2YWx1ZXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaWZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm0uYWN0aW9uID0gUVRUX1JlcG9ydDtcclxuICAgICAgICB0aGlzLmZvcm0uZW5jdHlwZSA9IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI7XHJcbiAgICAgICAgdGhpcy5mb3JtLm1ldGhvZCA9IFwicG9zdFwiO1xyXG4gICAgICAgIHRoaXMuaWZyYW1lLm5hbWUgPSBcImZvcm1cIlxyXG4gICAgICAgIHRoaXMuaWZyYW1lLmlkID0gXCJmb3JtXCJcclxuICAgICAgICB0aGlzLmZvcm0udGFyZ2V0ID0gXCJmb3JtXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbSBpbiB2YWx1ZXMpIHtcclxuICAgICAgICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgICAgICAgICAgb3B0Lm5hbWUgPSBpdGVtO1xyXG4gICAgICAgICAgICBvcHQudmFsdWUgPSB2YWx1ZXNbaXRlbV07XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5hcHBlbmRDaGlsZChvcHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuaWZyYW1lKTtcclxuICAgICAgICB0aGlzLmlmcmFtZS5hcHBlbmRDaGlsZCh0aGlzLmZvcm0pO1xyXG4gICAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFVzZXJJbmZvKCkge1xyXG5cclxuICAgICAgICB0aGlzLnF0dEdhbWUuZ2V0VXNlckluZm8odXRpbHMuY29uZmlnLnF0dGNvbmZpZy5hcHBLZXksIHV0aWxzLmNvbmZpZy5xdHRjb25maWcuYXBwSUQsIHRoaXMudGlja2V0LCB0aGlzLnBsYXRGb3JtKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vIOaIkOWKn1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W55So5oi35L+h5oGv5oiQ5YqfICN1c2VySW5mbz1cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgLy8g5aSx6LSlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flj4LmlbDlkI3np7Dojrflj5bpk77mjqXph4znmoTlgLxcclxuICAgICAqIEBwYXJhbSBrZXkg5Y+C5pWw5ZCN56ewXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2V0UmVxdWVzdChrZXkpIHtcclxuICAgICAgICB2YXIgdXJsID0gbG9jYXRpb24uc2VhcmNoO1xyXG4gICAgICAgIHZhciB0aGVSZXF1ZXN0ID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZihcIj9cIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgdmFyIHN0cjogc3RyaW5nID0gdXJsLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgbGV0IHN0cnMgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoZVJlcXVlc3Rbc3Ryc1tpXS5zcGxpdChcIj1cIilbMF1dID0gdW5lc2NhcGUoc3Ryc1tpXS5zcGxpdChcIj1cIilbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoZVJlcXVlc3Rba2V5XTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOivt+axguacjeWKoeWZqOaVsOaNrlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBsb2FkU2VydmVyRGF0YSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudWlkKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwi55So5oi3SUTkuLrnqbo+Pj5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3VpZCA9IFwiMFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIm09Z1wiO1xyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KFNUX1NlcnZlclVybCArIG1ldGhvZCwgKHJldDogYm9vbGVhbiwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJsb2FkU2VydmVyVXNlcmRhdGUgI3JldD1cIiwgcmV0LCBcIiAjZGF0YT1cIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInF0dOacjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluaIkOWKnzogZGF0YSA9IFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyAmJiB0aGlzLl9zZXJ2ZXJDb25maWcuaXNfc2hvd19sb2dfdmlldyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2dWaWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwi5byA5ZCv5LqG5pys5Zyw5pWw5o2u5rWL6K+V77yM5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJxdHTmnI3liqHlmajphY3nva7mlbDmja7kuI3mmK/lkIjms5XnmoRKU09O5pWw5o2uLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInF0dOacjeWKoeWZqOmFjee9ruaVsOaNruiOt+WPluWksei0pSwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlckNvbmZpZyA9IEpTT04ucGFyc2UoU1RfRGVmYXVsdFNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLmlzX2xvY2FsX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWQgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5L2/55So5pyN5Yqh5Zmo5LiL5Y+R55qE5bm/5ZGKaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIui2o+WktOadoeayoeacieW5v+WRimlkXCIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkvb/nlKjmnKzlnLDphY3nva7nmoTlub/lkYpJRFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5lbWl0U2VydmVySW5pdEV2ZW50KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWFs+WNoeaVsOaNrlxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RMZXZlbChsZXZlbDogc3RyaW5nLCBzdGF0dXM6IExldmVsU3RhdHVzLCBsZXZlbE5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmxldmVsXCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFBPU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBMZXZlbFN0YXR1cy5HYW1lU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlcnZlckRhdGEoUVRUX1JFUE9SVF9UWVBFLnN0YXJ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/kuIrmiqXliLBxdHTnmoTlrpjmlrnmnI3liqHlmahcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBMZXZlbFN0YXR1cy5HYW1lV2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RHYW1lT3ZlckRhdGEoTnVtYmVyKGxldmVsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2lnbih2YWx1ZXMpIHtcclxuICAgICAgICBsZXQgcyA9IHRoaXMuc2lnbih2YWx1ZXMpO1xyXG4gICAgICAgIHZhbHVlcy5zaWduID0gc1xyXG4gICAgICAgIHRoaXMuY2hlY2tTaWduKHZhbHVlcyk7XHJcbiAgICAgICAgdGhpcy5fc2lnbiA9IHM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIGFwcF9pZDogdXRpbHMuY29uZmlnLnF0dGNvbmZpZy5hcHBJRCxcclxuICAgICAgICAgICAgcGxhdGZvcm06IHBhcmFtcy5wbGF0Zm9ybSxcclxuICAgICAgICAgICAgdGlja2V0OiBwYXJhbXMudGlja2V0LFxyXG4gICAgICAgICAgICB0aW1lOiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHMgPSB0aGlzLnNpZ24odmFsdWVzKTtcclxuICAgICAgICB2YWx1ZXMuc2lnbiA9IHNcclxuICAgICAgICB0aGlzLl9zaWduID0gcztcclxuICAgICAgICByZXR1cm4gUVRUX1NlcnZlclVybCArIFwiYXBwX2lkPVwiICsgdmFsdWVzLmFwcF9pZCArIFwiJnBsYXRmb3JtPVwiICsgcGFyYW1zLnBsYXRmb3JtICsgXCImdGlja2V0PVwiICsgcGFyYW1zLnRpY2tldCArIFwiJnRpbWU9XCIgKyB2YWx1ZXMudGltZSArIFwiJnNpZ249XCIgKyB2YWx1ZXMuc2lnbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXJhbXMoKTogYW55IHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICBsZXQgcGFyYW1BcnIgPSB1cmwuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgIGxldCBwbGF0Zm9ybTtcclxuICAgICAgICBsZXQgdGlja2V0O1xyXG4gICAgICAgIHBhcmFtQXJyLmZvckVhY2goc3RyID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdHIuaW5kZXhPZihcInBsYXRmb3JtXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9IHN0ci5zcGxpdChcIj1cIilbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0ci5pbmRleE9mKFwidGlja2V0XCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aWNrZXQgPSBzdHIuc3BsaXQoXCI9XCIpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHsgcGxhdGZvcm06IHBsYXRmb3JtLCB0aWNrZXQ6IHRpY2tldCB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNpZ24odmFsdWVzKSB7XHJcbiAgICAgICAgZGVsZXRlIHZhbHVlcy5zaWduO1xyXG4gICAgICAgIHZhbHVlcy5hcHBfa2V5ID0gdXRpbHMuY29uZmlnLnF0dGNvbmZpZy5hcHBLZXk7XHJcbiAgICAgICAgbGV0IGtleXNBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdmFsdWVzKSB7XHJcbiAgICAgICAgICAgIGtleXNBcnIucHVzaChrZXkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGtleXNBcnIuc29ydCgpO1xyXG4gICAgICAgIGxldCBrZXlzID0gJydcclxuICAgICAgICBrZXlzQXJyLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICAgICAga2V5cyArPSBlO1xyXG4gICAgICAgICAgICBrZXlzICs9IHZhbHVlc1tlXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWOn+S4su+8mlwiICsga2V5cylcclxuICAgICAgICBkZWxldGUgdmFsdWVzLmFwcF9rZXk7XHJcbiAgICAgICAgbGV0IHNpZ24gPSBtZDUoa2V5cyk7XHJcblxyXG4gICAgICAgIHJldHVybiBzaWduO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1NpZ24odmFsdWVzKSB7XHJcbiAgICAgICAgbGV0IHNpZ24xID0gdmFsdWVzLnNpZ247XHJcbiAgICAgICAgaWYgKCFzaWduMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2lnbiBlcnJvcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzaWduMiA9IHRoaXMuc2lnbih2YWx1ZXMpO1xyXG4gICAgICAgIGlmIChzaWduMSAhPT0gc2lnbjIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzaWduIGVycm9yXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29rJylcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2lzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc0xvZ2luOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNMb2FkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNTdGFydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIFxyXG4gICAgKiAg6Laj5aS05p2h5pyN5Yqh5Zmo5LiK5oqlXHJcbiAgICAqIFxyXG4gICAgKiAg5Y+C5pWw5Li6b2JqZWN05a+56LGhLCDmoLnmja50eXBlIOWxnuaAp+S8oOWFpeWvueW6lOWtl+autVxyXG4gICAgKiAgIEBwYXJhbSB0eXBlIHtTdHJpbmd9IHJlYWR5IOa4uOaIj+i1hOa6kOWKoOi9veWujOavlSAgbG9naW4g55So5oi35oiQ5Yqf55m76ZmGIGxvYWQg5oiQ5Yqf6L+b5YWl5ri45oiP55WM6Z2iL+S4u+mhtSBzdGFydCDlvIDlp4vmuLjmiI9cclxuICAgICogICBAcGFyYW0gYXBwX2lkIHsgU3RyaW5nfSBb5b+F5aGrXSBcclxuICAgICogICBAcGFyYW0gb3Blbl9pZCB7U3RyaW5nfSAg5Y+C6ICD5YW35L2T5LiK5oql6K+05piOXHJcbiAgICAqICAgQHBhcmFtIGdhbWVfbmFtZSB7U3RyaW5nfSDlj4LogIPlhbfkvZPkuIrmiqXor7TmmI5cclxuICAgICogICBAcGFyYW0gZXh0ZW5kX2luZm8gIFvpgInloatdIGpzb27lr7nosaEge31cclxuICAgICogICBcclxuICAgICoqL1xyXG4gICAgcHVibGljIHBvc3RTZXJ2ZXJEYXRhKHR5cGU6IFFUVF9SRVBPUlRfVFlQRSwgaW5mbz86IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6Laj5aS05p2h5pWw5o2u5LiK5oql77yaXCIgKyB0eXBlLCB0aGlzLl91aWQpXHJcbiAgICAgICAgaWYgKCF0aGlzLnVpZCAmJiB0aGlzLl91aWQgIT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCLnlKjmiLdJROS4jeWtmOWcqCAs5LiN5LiK5oql5pWw5o2uPj4+XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFFUVF9SRVBPUlRfVFlQRS5yZWFkeTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1JlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlt7Lnu4/kuIrkvKDov4fotYTmupDliqDovb3lrozmr5Xkuovku7ZcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBRVFRfUkVQT1JUX1RZUEUubG9naW46XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Lul5Y+K5LiK5Lyg6L+H6LWE5rqQ5Yqg6L295a6M5q+V5LqL5Lu2XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUVRUX1JFUE9SVF9UWVBFLmxvYWQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNMb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLku6Xlj4rkuIrkvKDov4fotYTmupDliqDovb3lrozmr5Xkuovku7ZcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBRVFRfUkVQT1JUX1RZUEUuc3RhcnQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNTdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Lul5Y+K5LiK5Lyg6L+H6LWE5rqQ5Yqg6L295a6M5q+V5LqL5Lu2XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFwcF9pZCA9IHV0aWxzLmNvbmZpZy5xdHRjb25maWcuYXBwSUQ7XHJcbiAgICAgICAgbGV0IGdhbWVfbmFtZSA9IHV0aWxzLmNvbmZpZy5xdHRjb25maWcuZ2FtZW5hbWU7XHJcbiAgICAgICAgbGV0IGV4dGVuZF9pbmZvID0gaW5mbyA/IGluZm8gOiB7fTtcclxuICAgICAgICBpZiAodGhpcy5xdHRHYW1lICYmIHRoaXMucXR0R2FtZS5yZXBvcnREYXRhKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBRVFRfUkVQT1JUX1RZUEUucmVhZHk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFFUVF9SRVBPUlRfVFlQRS5sb2dpbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0xvZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUVRUX1JFUE9SVF9UWVBFLmxvYWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUVRUX1JFUE9SVF9UWVBFLnN0YXJ0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucXR0R2FtZS5yZXBvcnREYXRhKHsgXCJ0eXBlXCI6IHR5cGUsIFwib3Blbl9pZFwiOiB0aGlzLnVpZCwgXCJhcHBfaWRcIjogYXBwX2lkLCBcImdhbWVfbmFtZVwiOiBnYW1lX25hbWUsIFwiZXh0ZW5kX2luZm9cIjogZXh0ZW5kX2luZm8gfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLotqPlpLTmnaHmiJDlip/lj5HpgIHkuovku7bvvJpcIiArIHR5cGUpO1xyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQodHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui2o+WktOadoeWPkemAge+8mlwiICsgdHlwZSArIFwi5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYucG9zdFNlcnZlckRhdGEodHlwZSwgaW5mbyk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeiHquWumuS5ieS6i+S7tlxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lIOWFs+WNoeWQjeensFxyXG4gICAgICogQHBhcmFtIHN0YXR1cyDnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNRVFQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gUE9TVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmV2ZW50PSR7ZW5jb2RlVVJJKGV2ZW50TmFtZSl9YDtcclxuICAgICAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCBmdW5jdGlvbiAocmV0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeiHquWumuS5ieS6i+S7tuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFFUVF9SRVBPUlRfVFlQRSB7XHJcbiAgICByZWFkeSA9IFwicmVhZHlcIiwgICAgICAgICAgLy/muLjmiI/otYTmupDliqDovb3lrozmr5VcclxuICAgIGxvZ2luID0gXCJsb2dpblwiLCAgICAgICAgICAvL+eUqOaIt+aIkOWKn+eZu+mZhlxyXG4gICAgbG9hZCA9IFwibG9hZFwiLCAgICAgICAgICAgIC8v5oiQ5Yqf6L+b5YWl5ri45oiP55WM6Z2iL+S4u+mhtVxyXG4gICAgc3RhcnQgPSBcInN0YXJ0XCIsICAgICAgICAgIC8v5byA5aeL5ri45oiPXHJcbiAgICBuZXdSb2xlID0gXCJuZXdSb2xlXCIsICAgICAgLy/mlrDlop7liJvop5JcclxuICAgIG5ld1VzZXIgPSBcIm5ld1VzZXJcIiwgICAgICAvL+aWsOWinueUqOaIt1xyXG4gICAgdXBncmFkZSA9IFwidXBncmFkZVwiLCAgICAgIC8v55So5oi3562J57qn5o+Q5Y2HXHJcbiAgICB1c2VySW5mbyA9IFwidXNlckluZm9cIiwgICAgLy/nlKjmiLfmuLjmiI/kv6Hmga9cclxuICAgIGFibm9ybWFsID0gXCJhYm5vcm1hbFwiLCAgICAvL+a4uOaIj+W8guW4uFxyXG59XHJcbiJdfQ==