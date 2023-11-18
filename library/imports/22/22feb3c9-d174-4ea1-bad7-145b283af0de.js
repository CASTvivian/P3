"use strict";
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