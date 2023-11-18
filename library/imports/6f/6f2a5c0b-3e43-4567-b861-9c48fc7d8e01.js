"use strict";
cc._RF.push(module, '6f2a5wLPkNFZ7hhnEj8fY4B', 'WechatTool');
// common-plugin/Scripts/WechatTool.ts

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
/**
 * 游戏盒子的请求链接
 */
var GB_ServerUrl = "https://apps.youlesp.com/gbs?";
// 默认配置
var ST_DefaultServerConfig = "";
// 默认配置
var GB_DefaultServerConfig = "";
var ST_LoadConfigInterval = 5000; // 毫秒
var WechatTool = /** @class */ (function () {
    function WechatTool() {
        /**
         * 服务器配置信息
         */
        this._serverConfig = null;
        /**
         * 游戏盒子配置信息
         */
        this._gameBoxServerConfig = null;
        //设备UID
        this._uid = "0";
        //服务器返回UID
        this._service_uid = "0";
        this._sysInfo = null;
        this._shareCallback = null;
        this._isShare = false;
        this._lastUpdateTime = 0;
        this._appIdList = [];
        this._jumpIds = "";
        //启动来源的场景：
        this._luanchType = "";
        this.clue_token = ""; //字节token
        this.wx_code = ""; //登录后返回的code
        //来源APPID
        this._source_app_id = "";
        //启动参数
        this._luanchData = "";
        this._loginTime = 0;
        this._loginInterval = 30;
        this._reportLoginTime = 0;
        this._reportLoginInterval = 30;
        this.isReport = false;
        this.isReportActive = false;
        this.passCount = 0; //通关数据
        this.playCount = 0; //开始关卡数据
    }
    Object.defineProperty(WechatTool.prototype, "ServerConfig", {
        get: function () {
            return this._serverConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WechatTool.prototype, "gameBoxServerConfig", {
        get: function () {
            return this._gameBoxServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WechatTool.prototype, "uid", {
        get: function () {
            if (this._uid != "0")
                return this._uid;
            this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WechatTool.prototype, "serviceId", {
        /**
         * 服务器返回UID
         */
        get: function () {
            if (this._service_uid != "0")
                return this._service_uid;
            this._login();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WechatTool.prototype, "SysInfo", {
        get: function () {
            return this._sysInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param data 配置数据
     */
    WechatTool.prototype.init = function (data) {
        var _this = this;
        if (PlatUtils_1.default.IsWechat) {
            //@ts-ignore
            try {
                //@ts-ignore
                this._sysInfo = wx.getSystemInfoSync();
                Utils_1.utils.showLog("微信小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }
            catch (e) {
                // Do something when catch error
            }
            try {
                this._luanchData = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_LUANCH_DATA);
                this._luanchType = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_LUANCH_TYPE);
                //@ts-ignore
                var options = wx.getLaunchOptionsSync();
                options && Utils_1.utils.showLog(">>获取到小程序启动参数：" + JSON.stringify(options));
                if (this._luanchData && this._luanchType) {
                    Utils_1.utils.showLog("获取到本地缓存数据启动类型：" + this._luanchType);
                    Utils_1.utils.showLog("获取到本地缓存数据启动参数：" + this._luanchData);
                }
                else {
                    if (options) {
                        if (options.scene) {
                            Utils_1.utils.showLog("获取到启动场景值：" + options.scene);
                            this._luanchType = options.scene;
                            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_LUANCH_TYPE, this._luanchType);
                        }
                        if (options.query) {
                            var queryData = JSON.stringify(options.query);
                            this._luanchData = queryData;
                            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_LUANCH_DATA, this._luanchData);
                            Utils_1.utils.showLog("获取到小程序启动参数：" + queryData);
                        }
                        if (options.referrerInfo && JSON.stringify(options.referrerInfo) != "{}") {
                            Utils_1.utils.showLog("获取到小程序来源信息：" + JSON.stringify(options.referrerInfo));
                            if (options.referrerInfo.appId) {
                                Utils_1.utils.showLog("获取到小程序启动来源的appId：" + options.referrerInfo.appId);
                                this._source_app_id = options.referrerInfo.appId;
                            }
                        }
                    }
                }
            }
            catch (erro) {
                Utils_1.utils.showLog("获取到小程序启动参数异常");
            }
            if (data) {
                var configObj = JSON.parse(data);
                if (configObj && configObj.wechat) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.wechat);
                }
                if (configObj && configObj.gamebox) {
                    GB_DefaultServerConfig = JSON.stringify(configObj.gamebox);
                }
            }
            // 拉取服务器配置
            // this.loadJumpIds().then(() => {
            //     console.log("本地跳转ID加载成功！");
            //     this._loadConfig();
            // }).catch((erro) => {
            //     console.error("本地跳转ID加载失败：", erro);
            this._loadConfig();
            // })
            //加载配置的跳转ID
            // this.loadAppIdList();
            // 开启右上角转发
            //@ts-ignore
            wx.showShareMenu();
            //@ts-ignore
            wx.onShareAppMessage(this._getShareInfo.bind(this));
            //@ts-ignore
            wx.onShow(function (res) {
                cc.log("OnShow");
                if (_this._isShare) {
                    _this._isShare = false;
                    if (_this._shareCallback) {
                        _this._shareCallback(true, "分享成功!");
                    }
                }
                _this._checkForUpdate();
                Utils_1.utils.emitCommonEvent(YZ_Constant_1.default.EC_OnShow);
            });
            //@ts-ignore
            wx.onHide(function () {
                cc.log("onHide");
                Utils_1.utils.emitCommonEvent(YZ_Constant_1.default.EC_OnHide);
            });
            this._checkForUpdate();
        }
    };
    WechatTool.prototype._checkForUpdate = function () {
        if (PlatUtils_1.default.IsWechat) {
            if ((new Date()).getTime() - this._lastUpdateTime < ST_LoadConfigInterval) {
                cc.log("检查更新太频繁!");
                return;
            }
            this._lastUpdateTime = (new Date()).getTime();
            if (this.isOverMinVersion("1.9.90")) {
                cc.log("检查更新......");
                //@ts-ignore
                var updateManager_1 = wx.getUpdateManager();
                updateManager_1.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    if (res.hasUpdate) {
                        cc.log("有新版本需要更新!");
                    }
                    else {
                        cc.log("没有新版本！");
                    }
                });
                updateManager_1.onUpdateReady(function () {
                    //@ts-ignore
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager_1.applyUpdate();
                            }
                        }
                    });
                });
                updateManager_1.onUpdateFailed(function () {
                    // 新版本下载失败
                    cc.log("新版本下载失败！");
                });
            }
        }
    };
    WechatTool.prototype._buildServerUrl = function () {
        var url = "";
        if (Utils_1.utils.config.wechatconfig && Utils_1.utils.config.wechatconfig.appID) {
            var appid = Utils_1.utils.config.wechatconfig.appID;
            var channel = "wechat";
            var jumpId = this._jumpIds ? this._jumpIds : Utils_1.utils.config.wechatconfig.jumpId;
            url = ST_ServerUrl + ("kyx=true&app_id=" + appid + "&channel=" + channel + "&jump_id=" + jumpId);
        }
        else {
            cc.log("微信 APPID配置出错！");
        }
        return url;
    };
    WechatTool.prototype._buildGameBoxServerUrl = function () {
        var url = GB_ServerUrl + "m=ghome&index=0&type=1";
        return url;
    };
    WechatTool.prototype._loadConfig = function () {
        var _this = this;
        if (PlatUtils_1.default.IsWechat) {
            cc.log("加载服务器配置.......");
            var method = "m=g";
            var url_1 = ST_ServerUrl + method;
            // let jumpId: string = this._jumpIds ? this._jumpIds : utils.config.wechatconfig.jumpId;
            // url += `&jump_id=${jumpId}`
            Utils_1.utils.commomHttpRequest(url_1, function (ret, data) {
                if (ret) {
                    cc.log("微信服务器配置数据获取成功: data = ", data);
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
                            cc.log("微信服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                }
                else {
                    cc.log("微信服务器配置数据获取失败, 使用本地配置!");
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
                    if (_this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        cc.log("使用服务器下发的广告ID");
                        Utils_1.utils.config.wechatconfig.insertId = _this.ServerConfig.intersititia_pos_id || Utils_1.utils.config.wechatconfig.insertId;
                        Utils_1.utils.config.wechatconfig.videoId = _this.ServerConfig.video_pos_id || Utils_1.utils.config.wechatconfig.videoId;
                        Utils_1.utils.config.wechatconfig.boxId = _this._serverConfig.box_pos_id || Utils_1.utils.config.wechatconfig.boxId;
                        Utils_1.utils.config.wechatconfig.bannerBoxId = _this._serverConfig.banner_box_pos_id || Utils_1.utils.config.wechatconfig.bannerBoxId;
                        Utils_1.utils.config.wechatconfig.nativeBannerId = _this._serverConfig.native_banner_pos_id || Utils_1.utils.config.wechatconfig.nativeBannerId;
                        Utils_1.utils.config.wechatconfig.nativeInsertIds = _this._serverConfig.native_intersititial_pos_id || Utils_1.utils.config.wechatconfig.nativeInsertIds;
                        var bannerLocation = ["home", "game", "level", "skin", "pause", "over"];
                        for (var i = 0; i < bannerLocation.length; i++) {
                            if (_this.ServerConfig.banner_pos_id[bannerLocation[i]]) {
                                Utils_1.utils.config.wechatconfig.setBannerId(YZ_Constant_1.BannerLocationToEnum(bannerLocation[i]), _this.ServerConfig.banner_pos_id[bannerLocation[i]]);
                            }
                        }
                        if (_this.ServerConfig.native_customad_configs) {
                            for (var i = 0; i < _this.ServerConfig.native_customad_configs.length; i++) {
                                Utils_1.utils.showLog("获取到原生模版广告配置:" + _this.ServerConfig.native_customad_configs[i].location, ">>>>", JSON.stringify(_this.ServerConfig.native_customad_configs[i]));
                                Utils_1.utils.config.wechatconfig.setCustomAdInfo(_this.ServerConfig.native_customad_configs[i].location, _this.ServerConfig.native_customad_configs[i]);
                            }
                        }
                    }
                    else {
                        cc.log("使用本地配置的广告ID");
                    }
                }
                Utils_1.utils.emitServerInitEvent();
                if (_this._serverConfig && _this._serverConfig.openBox) {
                    if (_this._serverConfig.openBox != "true") {
                        cc.log("服务器游戏盒子配置为关闭状态！");
                        return;
                    }
                    url_1 = _this._buildGameBoxServerUrl();
                    Utils_1.utils.commomHttpRequest(url_1, function (ret, data) {
                        if (ret) {
                            cc.log("微信游戏盒子服务器配置数据获取成功: data = ", data);
                            if (data) {
                                var result = JSON.parse(data);
                                if (result) {
                                    if (!Utils_1.utils.DebugLoacalConfig) {
                                        _this._gameBoxServerConfig = result;
                                    }
                                    else {
                                        cc.warn("开启了本地数据测试，使用本地配置!");
                                    }
                                }
                                else {
                                    cc.log("微信游戏盒子微信服务器配置数据不是合法的JSON数据, 使用本地配置!");
                                }
                            }
                        }
                        else {
                            cc.log("微信游戏盒子服务器配置数据获取失败, 使用本地配置!");
                        }
                        if (!_this._gameBoxServerConfig) {
                            _this._gameBoxServerConfig = JSON.parse(GB_DefaultServerConfig);
                        }
                    });
                }
            });
        }
    };
    /**
     *
     * @param id 跳转ID
     * @param callback 跳转回调
     */
    WechatTool.prototype.navigateToMiniProgram = function (id, callback, path) {
        if (PlatUtils_1.default.IsWechat) {
            var completeCallback_1 = callback;
            //@ts-ignore
            wx.navigateToMiniProgram({
                appId: id.indexOf(":") > -1 ? id.split(":")[0] : id,
                path: path ? path : "",
                success: function (res) {
                    if (completeCallback_1) {
                        completeCallback_1(true);
                    }
                },
                fail: function (res) {
                    // cc.log("跳转失败！", id);
                    cc.log("\u8DF3\u8F6C\u5931\u8D25! id=" + id + "; res=" + JSON.stringify(res));
                    if (completeCallback_1) {
                        completeCallback_1(false);
                    }
                }
            });
        }
    };
    WechatTool.prototype.getSystemInfo = function () {
        if (PlatUtils_1.default.IsWechat) {
            //@ts-ignore
            return wx.getSystemInfoSync();
        }
    };
    WechatTool.prototype.previewImage = function (url) {
        if (PlatUtils_1.default.IsWechat) {
            //@ts-ignore
            wx.previewImage({
                urls: [url] // 需要预览的图片http链接列表
            });
        }
    };
    WechatTool.prototype.share = function (callback) {
        if (callback === void 0) { callback = null; }
        if (PlatUtils_1.default.IsWechat) {
            this._shareCallback = callback;
            this._isShare = true;
            //@ts-ignore
            wx.shareAppMessage(this._getShareInfo());
        }
    };
    /**
     * 上报数据
     */
    WechatTool.prototype.postData = function (otherGameAppId) {
        if (PlatUtils_1.default.IsWechat) {
            var method = "m=rjump";
            var url = ST_ServerUrl + method + ("&jump_app_id=" + otherGameAppId);
            cc.log("上报数据, url=", url);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    cc.log("数据上报成功！");
                }
                else {
                    cc.log("数据上报失败！");
                }
            });
        }
    };
    /**
    * 上报互推组件数据
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    WechatTool.prototype.postDataByLocation = function (otherGameAppId, location, status) {
        if (status === void 0) { status = 0; }
        if (PlatUtils_1.default.IsWechat) {
            var method = "m=rjump";
            var url = ST_ServerUrl + method + ("&jump_app_id=" + otherGameAppId + "&location=" + location + "&status=" + status);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    cc.log("数据上报成功！");
                }
                else {
                    cc.log("数据上报失败！");
                }
            });
        }
    };
    /**
    * 上报互推组件显示位置
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    WechatTool.prototype.postRecommentShowData = function (location) {
        if (PlatUtils_1.default.IsWechat) {
            var method = "m=rjumpshow";
            var url = ST_ServerUrl + method + ("&location=" + location);
            Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    cc.log("数据上报成功！");
                }
                else {
                    cc.log("数据上报失败！");
                }
            }.bind(this));
        }
    };
    WechatTool.prototype._getShareInfo = function () {
        if (PlatUtils_1.default.IsWechat) {
            return {
                title: Utils_1.utils.config.otherconfig.shareTitle,
                imageUrl: Utils_1.utils.config.otherconfig.shareImgUrl
            };
        }
        return {};
    };
    WechatTool.prototype.isOverMinVersion = function (minVersion) {
        //@ts-ignore
        var curVersion = wx.getSystemInfoSync().SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    };
    WechatTool.prototype._compareVersion = function (v1, v2) {
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
     * 获取交叉推广数据
     */
    WechatTool.prototype.getRecommondGameList = function () {
        if (PlatUtils_1.default.IsWechat && Utils_1.utils.wechatTool && Utils_1.utils.wechatTool.ServerConfig) {
            return Utils_1.utils.wechatTool.ServerConfig.jump_list;
        }
        return null;
    };
    // /**
    //  * 加载游戏配置的跳转ID
    //  */
    // loadAppIdList() {
    //     CompatibleTool.LoadResRes("./src/game.json", (err, res) => {
    //         if (err) {
    //             cc.error('加载game.json文件出错', err);
    //             return;
    //         }
    //         if (res && res.navigateToMiniProgramAppIdList && res.navigateToMiniProgramAppIdList.length) {
    //             let taskQty = res.subpackages.length;
    //             for (let i = 0; i < taskQty; i++) {
    //                 this._appIdList.push(res.navigateToMiniProgramAppIdList[i].name);
    //             }
    //             cc.log("配置的跳转ID：", this._appIdList);
    //         }
    //     });
    // }
    /**
     * 验证ID 是否配置
     * @param appId 应用ID
     */
    WechatTool.prototype.checkAppId = function (appId) {
        if (Utils_1.utils.config.wechatconfig.jumpId.indexOf(appId) > -1) {
            return true;
        }
        cc.log("appId :", appId, "不再配置列表中!");
        return false;
    };
    WechatTool.prototype._login = function () {
        var curTime = new Date().getTime();
        var interval = (curTime - this._loginTime) / 1000;
        if (interval > 0 && interval < this._loginInterval) {
            Utils_1.utils.showLog("\u767B\u5F55\u8BF7\u6C42\u95F4\u9694\u5C0F\u4E8E\uFF1A" + this._loginInterval + "\u79D2");
            return;
        }
        this._loginTime = curTime;
        var self = this;
        this._uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_UID);
        this._uid = this._uid ? this._uid : "0";
        this._service_uid = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_SERVICE_UID);
        this._service_uid = this._service_uid ? this._service_uid : "0";
        Utils_1.utils.showLog("获取本地保存的uid=" + this._uid + "，服务器UID=" + this._service_uid);
        if (this._uid == "0") {
            //@ts-ignore
            wx.login({
                success: function (res) {
                    if (res.code) {
                        self.wx_code = res.code;
                        self.reportLogin(res.code);
                    }
                    else {
                        Utils_1.utils.showLog('登录失败！' + res.errMsg);
                    }
                },
                fail: function () {
                },
                complete: function () {
                    self.reportLogin();
                }
            });
        }
    };
    /**
     * 上报登录接口获取UID
     */
    WechatTool.prototype.reportLogin = function (code) {
        if (code === void 0) { code = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var self, curTime, interval, method, url;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isReport)
                    return [2 /*return*/];
                this.isReport = true;
                self = this;
                curTime = new Date().getTime();
                interval = (curTime - this._reportLoginTime) / 1000;
                if (interval > 0 && interval < this._reportLoginInterval) {
                    Utils_1.utils.showLog("\u4E0A\u62A5\u767B\u5F55\u83B7\u53D6UID\u5C0F\u4E8E\uFF1A" + this._reportLoginInterval + "\u79D2");
                    return [2 /*return*/];
                }
                this._reportLoginTime = curTime;
                method = "m=login";
                url = ST_ServerUrl + method + ("&device_data=" + encodeURI(JSON.stringify(this._sysInfo)) + "&code=" + code);
                Utils_1.utils.commomHttpRequest(url, function (ret, data) {
                    if (ret) {
                        if (data) {
                            Utils_1.utils.showLog("#data=" + data);
                            var result = JSON.parse(data);
                            if (result.uid) {
                                self._service_uid = "" + result.uid;
                                if (!self.isReportActive) {
                                    self.isReportActive = true;
                                    _this.reportAttributedEvent(YZ_Constant_1.AttributedType.Active, YZ_Constant_1.AttributedKey.Active, YZ_Constant_1.AttributedValue.Active);
                                }
                                YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_SERVICE_UID, self._service_uid);
                            }
                            if (result.device_uid) {
                                self._uid = "" + result.device_uid;
                                YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_UID, self._uid);
                            }
                            Utils_1.utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid + " #device_id=" + self._uid);
                        }
                    }
                    _this.isReport = false;
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    WechatTool.prototype.postLevel = function (level, status, levelName) {
        if (PlatUtils_1.default.IsWechat) {
            if (status == YZ_Constant_1.LevelStatus.GameWin) {
                this.passCount++;
                if (this.passCount === Utils_1.utils.getConfigByKey("pass_level_count_active")) {
                    this.reportAttributedEvent(YZ_Constant_1.AttributedType.GameAddiction, YZ_Constant_1.AttributedKey.GameAddiction, YZ_Constant_1.AttributedValue.PassLevelCountAction);
                }
            }
            else if (status === YZ_Constant_1.LevelStatus.GameStart) {
                this.playCount++;
                if (this.playCount == Utils_1.utils.getConfigByKey("play_level_count_active")) {
                    this.reportAttributedEvent(YZ_Constant_1.AttributedType.GameAddiction, YZ_Constant_1.AttributedKey.GameAddiction, YZ_Constant_1.AttributedValue.PlayLevelCountAction);
                }
            }
            var method = "m=rlevel";
            var url = ST_ServerUrl + method + ("&level_id=" + level + "&level_name=" + encodeURI(levelName) + "&status=" + status);
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
    WechatTool.prototype.sendEvent = function (eventName) {
        if (PlatUtils_1.default.IsWechat) {
            var method = "m=revent";
            var url = ST_ServerUrl + method + ("&event=" + encodeURI(eventName));
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
    WechatTool.prototype.showToast = function (msg) {
        if (PlatUtils_1.default.IsWechat) {
            //@ts-ignore
            wx.showToast({
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
    /**
     * 上报归因事件
     * @param eventType 事件类型 0 激活， 25:关键行为
     * @param eventValue 事件描述
     */
    WechatTool.prototype.reportAttributedEvent = function (eventType, eventKey, eventValue) {
        if (this._luanchType != "1069" && this._luanchType != "1036" && this._luanchType != "1065") {
            Utils_1.utils.showLog("luanchType=" + this._luanchType + ",不进行归因上报");
            return;
        }
        Utils_1.utils.showLog("上报归因事件：  #eventType=" + eventType + "#eventKey=" + eventKey + "#eventValue=" + eventValue);
        if (eventType == YZ_Constant_1.AttributedType.Active && YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_IS_REPORT_USER_ACTIVE)) {
            Utils_1.utils.showLog("用户已经上报过激活，不再进行激活上报！");
            return;
        }
        else if (eventType == YZ_Constant_1.AttributedType.GameAddiction && YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_IS_REPORT_GAME_ADDICTION)) {
            Utils_1.utils.showLog("用户已经上报过关键行为，不再进行激活上报！");
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.timeout = 15000; // 单位毫秒
        var data = {};
        data.app_id = Utils_1.utils.config.wechatconfig.appID;
        data.channel = "wechat_kyx";
        data.uid = this._service_uid;
        data.event_type = eventType;
        data.event_key = eventKey;
        data.event_value = eventValue;
        data.app_version = Utils_1.utils.config.wechatconfig.version;
        data.code = this.wx_code;
        // data.clue_token = this.clue_token;
        data.luanchDate = encodeURI(this._luanchData);
        Utils_1.utils.showLog("归因请求参数:" + JSON.stringify(data));
        var requestData = JSON.stringify(data);
        Utils_1.utils.showLog("归因 > json_data=" + Utils_1.utils.aesEncrypt(requestData));
        var requestUrl = "https://track.youletd.com/wechatcounterpart/dockingreturn?json=" + Utils_1.utils.aesEncrypt(requestData) + "&time_stamp=" + (new Date()).getTime();
        Utils_1.utils.showLog("归因服务器地址:" + requestUrl);
        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = function () {
            Utils_1.utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (eventType == YZ_Constant_1.AttributedType.Active)
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_IS_REPORT_USER_ACTIVE, "true");
                    if (eventType == YZ_Constant_1.AttributedType.GameAddiction)
                        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_IS_REPORT_GAME_ADDICTION, "true");
                    Utils_1.utils.showLog("归因上报成功：", xhr.responseText);
                }
                else {
                    Utils_1.utils.showLog("归因上报失败！");
                }
            }
        };
        xhr.ontimeout = function () {
            Utils_1.utils.showLog("归因请求超时!");
        };
        xhr.onerror = function (err) {
            Utils_1.utils.showLog("归因请求失败!");
        };
    };
    /**
       * 友盟游戏开始上报
       * @param levelID
       */
    WechatTool.prototype.umaOnStart = function (levelID) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        wx.uma.stage.onStart({
            stageId: levelID,
            stageName: "\u7B2C" + levelID + "\u5173" // 关卡id
        });
    };
    /**
     *
     * @returns 是否开启友盟
     */
    WechatTool.prototype.checkUmeng = function () {
        //@ts-ignore
        if (!wx.uma) {
            Utils_1.utils.showLog("未对接友盟SDK");
            return false;
        }
        return true;
    };
    /**
     * 友盟结算上报
     * @param levelID 关卡id
     * @param stageId
     * @param event
     */
    WechatTool.prototype.umaReportedLevel = function (levelID, event) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        wx.uma.stage.onEnd({
            stageId: levelID,
            stageName: "\u7B2C" + levelID + "\u5173",
            event: event
        });
    };
    /**
     * 友盟自定义事件
     * @param eventId 事件ID，注意：事件ID必须要在后台配置
     * @param params 事件内容
     */
    WechatTool.prototype.umaTrackEvent = function (eventId, params) {
        if (!this.checkUmeng())
            return;
        //@ts-ignore
        wx.uma.trackEvent(eventId, params);
    };
    WechatTool = __decorate([
        ccclass
    ], WechatTool);
    return WechatTool;
}());
exports.default = WechatTool;

cc._RF.pop();