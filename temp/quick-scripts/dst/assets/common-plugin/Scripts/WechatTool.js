
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/WechatTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcV2VjaGF0VG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFDaEMsNkNBQStIO0FBQy9ILHFEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLFlBQVksR0FBVywrQkFBK0IsQ0FBQztBQUU3RDs7R0FFRztBQUNILElBQU0sWUFBWSxHQUFXLCtCQUErQixDQUFDO0FBRTdELE9BQU87QUFDUCxJQUFJLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUN4QyxPQUFPO0FBQ1AsSUFBSSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFDeEMsSUFBTSxxQkFBcUIsR0FBVyxJQUFJLENBQUMsQ0FBQyxLQUFLO0FBSWpEO0lBQUE7UUFFSTs7V0FFRztRQUNILGtCQUFhLEdBQVEsSUFBSSxDQUFDO1FBSzFCOztXQUVHO1FBQ0gseUJBQW9CLEdBQVEsSUFBSSxDQUFDO1FBS2pDLE9BQU87UUFDUCxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBUW5CLFVBQVU7UUFDVixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQVczQixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBTXJCLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFFNUIsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUUxQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLFVBQVU7UUFDVixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUV6QixlQUFVLEdBQVcsRUFBRSxDQUFBLENBQUMsU0FBUztRQUVqQyxZQUFPLEdBQVcsRUFBRSxDQUFBLENB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YUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLHFDQUFnQixHQUF2QixVQUF3QixPQUFlLEVBQUUsS0FBa0I7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFBRSxPQUFPO1FBRS9CLFlBQVk7UUFDWixFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsV0FBSSxPQUFPLFdBQUc7WUFDekIsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUE7SUFDTixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLGtDQUFhLEdBQXBCLFVBQXFCLE9BQWUsRUFBRSxNQUFPO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQUUsT0FBTztRQUMvQixZQUFZO1FBQ1osRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUEzekJnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBK3pCOUI7SUFBRCxpQkFBQztDQS96QkQsQUErekJDLElBQUE7a0JBL3pCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IEF0dHJpYnV0ZWRLZXksIEF0dHJpYnV0ZWRUeXBlLCBBdHRyaWJ1dGVkVmFsdWUsIEJhbm5lckxvY2F0aW9uVG9FbnVtLCBMZXZlbFN0YXR1cyB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgU1RfU2VydmVyVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBwcy55b3VsZXNwLmNvbS9nc3M/XCI7XHJcblxyXG4vKipcclxuICog5ri45oiP55uS5a2Q55qE6K+35rGC6ZO+5o6lXHJcbiAqL1xyXG5jb25zdCBHQl9TZXJ2ZXJVcmw6IHN0cmluZyA9IFwiaHR0cHM6Ly9hcHBzLnlvdWxlc3AuY29tL2dicz9cIjtcclxuXHJcbi8vIOm7mOiupOmFjee9rlxyXG5sZXQgU1RfRGVmYXVsdFNlcnZlckNvbmZpZzogc3RyaW5nID0gXCJcIjtcclxuLy8g6buY6K6k6YWN572uXHJcbmxldCBHQl9EZWZhdWx0U2VydmVyQ29uZmlnOiBzdHJpbmcgPSBcIlwiO1xyXG5jb25zdCBTVF9Mb2FkQ29uZmlnSW50ZXJ2YWw6IG51bWJlciA9IDUwMDA7IC8vIOavq+enklxyXG5cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlY2hhdFRvb2wge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6YWN572u5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIF9zZXJ2ZXJDb25maWc6IGFueSA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP55uS5a2Q6YWN572u5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIF9nYW1lQm94U2VydmVyQ29uZmlnOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBnYW1lQm94U2VydmVyQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lQm94U2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+5aSHVUlEXHJcbiAgICBfdWlkOiBzdHJpbmcgPSBcIjBcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVpZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdWlkICE9IFwiMFwiKSByZXR1cm4gdGhpcy5fdWlkO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICBfc2VydmljZV91aWQ6IHN0cmluZyA9IFwiMFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo6L+U5ZueVUlEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VydmljZUlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlX3VpZCAhPSBcIjBcIikgcmV0dXJuIHRoaXMuX3NlcnZpY2VfdWlkO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9zeXNJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBTeXNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeXNJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfc2hhcmVDYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgX2lzU2hhcmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBfbGFzdFVwZGF0ZVRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgX2FwcElkTGlzdDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBfanVtcElkczogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvL+WQr+WKqOadpea6kOeahOWcuuaZr++8mlxyXG4gICAgX2x1YW5jaFR5cGU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY2x1ZV90b2tlbjogc3RyaW5nID0gXCJcIiAvL+Wtl+iKgnRva2VuXHJcblxyXG4gICAgd3hfY29kZTogc3RyaW5nID0gXCJcIiAvL+eZu+W9leWQjui/lOWbnueahGNvZGVcclxuXHJcbiAgICAvL+adpea6kEFQUElEXHJcbiAgICBfc291cmNlX2FwcF9pZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvL+WQr+WKqOWPguaVsFxyXG4gICAgX2x1YW5jaERhdGE6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIOmFjee9ruaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcclxuXHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N5c0luZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b6u5L+h5bCP5ri45oiP5bmz5Y+w5L+h5oGvOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuU3lzSW5mbykpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbHVhbmNoRGF0YSA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX0xVQU5DSF9EQVRBKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2x1YW5jaFR5cGUgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9MVUFOQ0hfVFlQRSk7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0gd3guZ2V0TGF1bmNoT3B0aW9uc1N5bmMoKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyAmJiB1dGlscy5zaG93TG9nKFwiPj7ojrflj5bliLDlsI/nqIvluo/lkK/liqjlj4LmlbDvvJpcIiArIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbHVhbmNoRGF0YSAmJiB0aGlzLl9sdWFuY2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluWIsOacrOWcsOe8k+WtmOaVsOaNruWQr+WKqOexu+Wei++8mlwiICsgdGhpcy5fbHVhbmNoVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluWIsOacrOWcsOe8k+WtmOaVsOaNruWQr+WKqOWPguaVsO+8mlwiICsgdGhpcy5fbHVhbmNoRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNjZW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5ZCv5Yqo5Zy65pmv5YC877yaXCIgKyBvcHRpb25zLnNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2x1YW5jaFR5cGUgPSBvcHRpb25zLnNjZW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfTFVBTkNIX1RZUEUsIHRoaXMuX2x1YW5jaFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5xdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1ZXJ5RGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucXVlcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbHVhbmNoRGF0YSA9IHF1ZXJ5RGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX0xVQU5DSF9EQVRBLCB0aGlzLl9sdWFuY2hEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDlsI/nqIvluo/lkK/liqjlj4LmlbDvvJpcIiArIHF1ZXJ5RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJlZmVycmVySW5mbyAmJiBKU09OLnN0cmluZ2lmeShvcHRpb25zLnJlZmVycmVySW5mbykgIT0gXCJ7fVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5bCP56iL5bqP5p2l5rqQ5L+h5oGv77yaXCIgKyBKU09OLnN0cmluZ2lmeShvcHRpb25zLnJlZmVycmVySW5mbykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVmZXJyZXJJbmZvLmFwcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluWIsOWwj+eoi+W6j+WQr+WKqOadpea6kOeahGFwcElk77yaXCIgKyBvcHRpb25zLnJlZmVycmVySW5mby5hcHBJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291cmNlX2FwcF9pZCA9IG9wdGlvbnMucmVmZXJyZXJJbmZvLmFwcElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6I635Y+W5Yiw5bCP56iL5bqP5ZCv5Yqo5Y+C5pWw5byC5bi4XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmogJiYgY29uZmlnT2JqLndlY2hhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFNUX0RlZmF1bHRTZXJ2ZXJDb25maWcgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmoud2VjaGF0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmogJiYgY29uZmlnT2JqLmdhbWVib3gpIHtcclxuICAgICAgICAgICAgICAgICAgICBHQl9EZWZhdWx0U2VydmVyQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqLmdhbWVib3gpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDmi4nlj5bmnI3liqHlmajphY3nva5cclxuICAgICAgICAgICAgLy8gdGhpcy5sb2FkSnVtcElkcygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLmnKzlnLDot7PovaxJROWKoOi9veaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuX2xvYWRDb25maWcoKTtcclxuICAgICAgICAgICAgLy8gfSkuY2F0Y2goKGVycm8pID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUuZXJyb3IoXCLmnKzlnLDot7PovaxJROWKoOi9veWksei0pe+8mlwiLCBlcnJvKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZENvbmZpZygpO1xyXG4gICAgICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAgICAgLy/liqDovb3phY3nva7nmoTot7PovaxJRFxyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRBcHBJZExpc3QoKTtcclxuICAgICAgICAgICAgLy8g5byA5ZCv5Y+z5LiK6KeS6L2s5Y+RXHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB3eC5zaG93U2hhcmVNZW51KCk7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZSh0aGlzLl9nZXRTaGFyZUluZm8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB3eC5vblNob3coKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiT25TaG93XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2hhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1NoYXJlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NoYXJlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hhcmVDYWxsYmFjayh0cnVlLCBcIuWIhuS6q+aIkOWKnyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrRm9yVXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZW1pdENvbW1vbkV2ZW50KFlaX0NvbnN0YW50LkVDX09uU2hvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgd3gub25IaWRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIm9uSGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRDb21tb25FdmVudChZWl9Db25zdGFudC5FQ19PbkhpZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrRm9yVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja0ZvclVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGlmICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC0gdGhpcy5fbGFzdFVwZGF0ZVRpbWUgPCBTVF9Mb2FkQ29uZmlnSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuajgOafpeabtOaWsOWkqumikee5gSFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdmVyTWluVmVyc2lvbihcIjEuOS45MFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5qOA5p+l5pu05pawLi4uLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIub25DaGVja0ZvclVwZGF0ZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5oYXNVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5pyJ5paw54mI5pys6ZyA6KaB5pu05pawIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLmsqHmnInmlrDniYjmnKzvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+abtOaWsOaPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmlrDniYjmnKzlt7Lnu4/lh4blpIflpb3vvIzmmK/lkKbph43lkK/lupTnlKjvvJ8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5paw55qE54mI5pys5bey57uP5LiL6L295aW977yM6LCD55SoIGFwcGx5VXBkYXRlIOW6lOeUqOaWsOeJiOacrOW5tumHjeWQr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZUZhaWxlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5paw54mI5pys5LiL6L295aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5paw54mI5pys5LiL6L295aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2J1aWxkU2VydmVyVXJsKCkge1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcgJiYgdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5hcHBJRCkge1xyXG4gICAgICAgICAgICBsZXQgYXBwaWQ6IHN0cmluZyA9IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuYXBwSUQ7XHJcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBzdHJpbmcgPSBcIndlY2hhdFwiO1xyXG4gICAgICAgICAgICBsZXQganVtcElkOiBzdHJpbmcgPSB0aGlzLl9qdW1wSWRzID8gdGhpcy5fanVtcElkcyA6IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuanVtcElkO1xyXG4gICAgICAgICAgICB1cmwgPSBTVF9TZXJ2ZXJVcmwgKyBga3l4PXRydWUmYXBwX2lkPSR7YXBwaWR9JmNoYW5uZWw9JHtjaGFubmVsfSZqdW1wX2lkPSR7anVtcElkfWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKFwi5b6u5L+hIEFQUElE6YWN572u5Ye66ZSZ77yBXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcbiAgICBfYnVpbGRHYW1lQm94U2VydmVyVXJsKCkge1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IEdCX1NlcnZlclVybCArIGBtPWdob21lJmluZGV4PTAmdHlwZT0xYDtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkQ29uZmlnKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwi5Yqg6L295pyN5Yqh5Zmo6YWN572uLi4uLi4uLlwiKTtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJtPWdcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kXHJcbiAgICAgICAgICAgIC8vIGxldCBqdW1wSWQ6IHN0cmluZyA9IHRoaXMuX2p1bXBJZHMgPyB0aGlzLl9qdW1wSWRzIDogdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5qdW1wSWQ7XHJcbiAgICAgICAgICAgIC8vIHVybCArPSBgJmp1bXBfaWQ9JHtqdW1wSWR9YFxyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLlvq7kv6HmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXRpbHMuRGVidWdMb2FjYWxDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5b6u5L+h5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5b6u5L+h5pyN5Yqh5Zmo6YWN572u5pWw5o2u6I635Y+W5aSx6LSlLCDkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gSlNPTi5wYXJzZShTVF9EZWZhdWx0U2VydmVyQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMgJiYgdGhpcy5fc2VydmVyQ29uZmlnLnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcub3RoZXJjb25maWcuc2hhcmVUaXRsZSA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcuc2hhcmVzICYmIHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IHRoaXMuX3NlcnZlckNvbmZpZy5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZlckNvbmZpZy5pc19sb2NhbF9wb3NfaWQgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRimlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuS9v+eUqOacjeWKoeWZqOS4i+WPkeeahOW5v+WRiklEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmluc2VydElkID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX3Bvc19pZCB8fCB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmluc2VydElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLnZpZGVvSWQgPSB0aGlzLlNlcnZlckNvbmZpZy52aWRlb19wb3NfaWQgfHwgdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy52aWRlb0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmJveElkID0gdGhpcy5fc2VydmVyQ29uZmlnLmJveF9wb3NfaWQgfHwgdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5ib3hJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5iYW5uZXJCb3hJZCA9IHRoaXMuX3NlcnZlckNvbmZpZy5iYW5uZXJfYm94X3Bvc19pZCB8fCB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLmJhbm5lckJveElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLm5hdGl2ZUJhbm5lcklkID0gdGhpcy5fc2VydmVyQ29uZmlnLm5hdGl2ZV9iYW5uZXJfcG9zX2lkIHx8IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcubmF0aXZlQmFubmVySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcubmF0aXZlSW5zZXJ0SWRzID0gdGhpcy5fc2VydmVyQ29uZmlnLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZCB8fCB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLm5hdGl2ZUluc2VydElkcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZXJMb2NhdGlvbjogc3RyaW5nW10gPSBbXCJob21lXCIsIFwiZ2FtZVwiLCBcImxldmVsXCIsIFwic2tpblwiLCBcInBhdXNlXCIsIFwib3ZlclwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYW5uZXJMb2NhdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9wb3NfaWRbYmFubmVyTG9jYXRpb25baV1dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5zZXRCYW5uZXJJZChCYW5uZXJMb2NhdGlvblRvRW51bShiYW5uZXJMb2NhdGlvbltpXSksIHRoaXMuU2VydmVyQ29uZmlnLmJhbm5lcl9wb3NfaWRbYmFubmVyTG9jYXRpb25baV1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9jdXN0b21hZF9jb25maWdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9jdXN0b21hZF9jb25maWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluWIsOWOn+eUn+aooeeJiOW5v+WRiumFjee9rjpcIiArIHRoaXMuU2VydmVyQ29uZmlnLm5hdGl2ZV9jdXN0b21hZF9jb25maWdzW2ldLmxvY2F0aW9uLCBcIj4+Pj5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2N1c3RvbWFkX2NvbmZpZ3NbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5jb25maWcud2VjaGF0Y29uZmlnLnNldEN1c3RvbUFkSW5mbyh0aGlzLlNlcnZlckNvbmZpZy5uYXRpdmVfY3VzdG9tYWRfY29uZmlnc1tpXS5sb2NhdGlvbiwgdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2N1c3RvbWFkX2NvbmZpZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5L2/55So5pys5Zyw6YWN572u55qE5bm/5ZGKSURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLmVtaXRTZXJ2ZXJJbml0RXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJDb25maWcgJiYgdGhpcy5fc2VydmVyQ29uZmlnLm9wZW5Cb3gpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VydmVyQ29uZmlnLm9wZW5Cb3ggIT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5pyN5Yqh5Zmo5ri45oiP55uS5a2Q6YWN572u5Li65YWz6Zet54q25oCB77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuX2J1aWxkR2FtZUJveFNlcnZlclVybCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLlvq7kv6HmuLjmiI/nm5LlrZDmnI3liqHlmajphY3nva7mlbDmja7ojrflj5bmiJDlip86IGRhdGEgPSBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1dGlscy5EZWJ1Z0xvYWNhbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2FtZUJveFNlcnZlckNvbmZpZyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlvIDlkK/kuobmnKzlnLDmlbDmja7mtYvor5XvvIzkvb/nlKjmnKzlnLDphY3nva4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5b6u5L+h5ri45oiP55uS5a2Q5b6u5L+h5pyN5Yqh5Zmo6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qESlNPTuaVsOaNriwg5L2/55So5pys5Zyw6YWN572uIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLlvq7kv6HmuLjmiI/nm5LlrZDmnI3liqHlmajphY3nva7mlbDmja7ojrflj5blpLHotKUsIOS9v+eUqOacrOWcsOmFjee9riFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZ2FtZUJveFNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2FtZUJveFNlcnZlckNvbmZpZyA9IEpTT04ucGFyc2UoR0JfRGVmYXVsdFNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaWQg6Lez6L2sSURcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDot7Povazlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbShpZDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbiA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgICAgIGFwcElkOiBpZC5pbmRleE9mKFwiOlwiKSA+IC0xID8gaWQuc3BsaXQoXCI6XCIpWzBdIDogaWQsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoID8gcGF0aCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwi6Lez6L2s5aSx6LSl77yBXCIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coYOi3s+i9rOWksei0pSEgaWQ9JHtpZH07IHJlcz0ke0pTT04uc3RyaW5naWZ5KHJlcyl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFN5c3RlbUluZm8oKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmV2aWV3SW1hZ2UodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogW3VybF0gLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoYXJlKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgdGhpcy5faXNTaGFyZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2UodGhpcy5fZ2V0U2hhcmVJbmZvKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdERhdGEob3RoZXJHYW1lQXBwSWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yanVtcFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBTVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmp1bXBfYXBwX2lkPSR7b3RoZXJHYW1lQXBwSWR9YDtcclxuICAgICAgICAgICAgY2MubG9nKFwi5LiK5oql5pWw5o2uLCB1cmw9XCIsIHVybCk7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOS4iuaKpeS6kuaOqOe7hOS7tuaVsOaNrlxyXG4gICAgKiBAcGFyYW0gb3RoZXJHYW1lQXBwSWQg6Lez6L2s55qESURcclxuICAgICogQHBhcmFtIGxvY2F0aW9uIOW9k+WJjeS9jee9rlxyXG4gICAgKiBAcGFyYW0gc3RhdHVzIDA654K55Ye777yMMTrot7PovazmiJDlip9cclxuICAgICovXHJcbiAgICBwdWJsaWMgcG9zdERhdGFCeUxvY2F0aW9uKG90aGVyR2FtZUFwcElkOiBzdHJpbmcsIGxvY2F0aW9uOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yanVtcFwiO1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBTVF9TZXJ2ZXJVcmwgKyBtZXRob2QgKyBgJmp1bXBfYXBwX2lkPSR7b3RoZXJHYW1lQXBwSWR9JmxvY2F0aW9uPSR7bG9jYXRpb259JnN0YXR1cz0ke3N0YXR1c31gXHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOS4iuaKpeS6kuaOqOe7hOS7tuaYvuekuuS9jee9rlxyXG4gICAgKiBAcGFyYW0gb3RoZXJHYW1lQXBwSWQg6Lez6L2s55qESURcclxuICAgICogQHBhcmFtIGxvY2F0aW9uIOW9k+WJjeS9jee9rlxyXG4gICAgKiBAcGFyYW0gc3RhdHVzIDA654K55Ye777yMMTrot7PovazmiJDlip9cclxuICAgICovXHJcbiAgICBwdWJsaWMgcG9zdFJlY29tbWVudFNob3dEYXRhKGxvY2F0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBcIm09cmp1bXBzaG93XCI7XHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IFNUX1NlcnZlclVybCArIG1ldGhvZCArIGAmbG9jYXRpb249JHtsb2NhdGlvbn1gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuaVsOaNruS4iuaKpeWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNoYXJlSW5mbygpIHtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlVGl0bGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogdXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzT3Zlck1pblZlcnNpb24obWluVmVyc2lvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGN1clZlcnNpb246IHN0cmluZyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkuU0RLVmVyc2lvbjtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVZlcnNpb24oY3VyVmVyc2lvbiwgbWluVmVyc2lvbikgPj0gMFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfY29tcGFyZVZlcnNpb24odjEsIHYyKSB7XHJcbiAgICAgICAgdjEgPSB2MS5zcGxpdCgnLicpXHJcbiAgICAgICAgdjIgPSB2Mi5zcGxpdCgnLicpXHJcbiAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpXHJcblxyXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjEucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgICAgICAgdjIucHVzaCgnMCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSlcclxuICAgICAgICAgICAgY29uc3QgbnVtMiA9IHBhcnNlSW50KHYyW2ldKVxyXG5cclxuICAgICAgICAgICAgaWYgKG51bTEgPiBudW0yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bTEgPCBudW0yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS6pOWPieaOqOW5v+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tb25kR2FtZUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCAmJiB1dGlscy53ZWNoYXRUb29sICYmIHV0aWxzLndlY2hhdFRvb2wuU2VydmVyQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1dGlscy53ZWNoYXRUb29sLlNlcnZlckNvbmZpZy5qdW1wX2xpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDliqDovb3muLjmiI/phY3nva7nmoTot7PovaxJRFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBsb2FkQXBwSWRMaXN0KCkge1xyXG4gICAgLy8gICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXNSZXMoXCIuL3NyYy9nYW1lLmpzb25cIiwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmIChlcnIpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNjLmVycm9yKCfliqDovb1nYW1lLmpzb27mlofku7blh7rplJknLCBlcnIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGlmIChyZXMgJiYgcmVzLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbUFwcElkTGlzdCAmJiByZXMubmF2aWdhdGVUb01pbmlQcm9ncmFtQXBwSWRMaXN0Lmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IHRhc2tRdHkgPSByZXMuc3VicGFja2FnZXMubGVuZ3RoO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrUXR5OyBpKyspIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLl9hcHBJZExpc3QucHVzaChyZXMubmF2aWdhdGVUb01pbmlQcm9ncmFtQXBwSWRMaXN0W2ldLm5hbWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgY2MubG9nKFwi6YWN572u55qE6Lez6L2sSUTvvJpcIiwgdGhpcy5fYXBwSWRMaXN0KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmqjOivgUlEIOaYr+WQpumFjee9rlxyXG4gICAgICogQHBhcmFtIGFwcElkIOW6lOeUqElEXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQXBwSWQoYXBwSWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5qdW1wSWQuaW5kZXhPZihhcHBJZCkgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9nKFwiYXBwSWQgOlwiLCBhcHBJZCwgXCLkuI3lho3phY3nva7liJfooajkuK0hXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2xvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9sb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuXHJcblxyXG4gICAgX2xvZ2luKCkge1xyXG5cclxuICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2xvZ2luVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDAgJiYgaW50ZXJ2YWwgPCB0aGlzLl9sb2dpbkludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOeZu+W9leivt+axgumXtOmalOWwj+S6ju+8miR7dGhpcy5fbG9naW5JbnRlcnZhbH3np5JgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2dpblRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5fdWlkID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfVUlEKTtcclxuICAgICAgICB0aGlzLl91aWQgPSB0aGlzLl91aWQgPyB0aGlzLl91aWQgOiBcIjBcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9TRVJWSUNFX1VJRCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZV91aWQgPSB0aGlzLl9zZXJ2aWNlX3VpZCA/IHRoaXMuX3NlcnZpY2VfdWlkIDogXCIwXCI7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuiOt+WPluacrOWcsOS/neWtmOeahHVpZD1cIiArIHRoaXMuX3VpZCArIFwi77yM5pyN5Yqh5ZmoVUlEPVwiICsgdGhpcy5fc2VydmljZV91aWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdWlkID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnd4X2NvZGUgPSByZXMuY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXBvcnRMb2dpbihyZXMuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZygn55m75b2V5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVwb3J0TG9naW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgX3JlcG9ydExvZ2luVGltZTogbnVtYmVyID0gMDtcclxuICAgIF9yZXBvcnRMb2dpbkludGVydmFsOiBudW1iZXIgPSAzMDtcclxuICAgIGlzUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgaXNSZXBvcnRBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55m75b2V5o6l5Y+j6I635Y+WVUlEXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlcG9ydExvZ2luKGNvZGU6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlcG9ydCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSZXBvcnQgPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1clRpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbDogbnVtYmVyID0gKGN1clRpbWUgLSB0aGlzLl9yZXBvcnRMb2dpblRpbWUpIC8gMTAwMDtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwICYmIGludGVydmFsIDwgdGhpcy5fcmVwb3J0TG9naW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKGDkuIrmiqXnmbvlvZXojrflj5ZVSUTlsI/kuo7vvJoke3RoaXMuX3JlcG9ydExvZ2luSW50ZXJ2YWx956eSYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVwb3J0TG9naW5UaW1lID0gY3VyVGltZTtcclxuICAgICAgICBsZXQgbWV0aG9kID0gXCJtPWxvZ2luXCI7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZkZXZpY2VfZGF0YT0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeSh0aGlzLl9zeXNJbmZvKSl9JmNvZGU9JHtjb2RlfWA7XHJcblxyXG4gICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgKHJldCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCIjZGF0YT1cIiArIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9zZXJ2aWNlX3VpZCA9IFwiXCIgKyByZXN1bHQudWlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmlzUmVwb3J0QWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzUmVwb3J0QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0QXR0cmlidXRlZEV2ZW50KEF0dHJpYnV0ZWRUeXBlLkFjdGl2ZSwgQXR0cmlidXRlZEtleS5BY3RpdmUsIEF0dHJpYnV0ZWRWYWx1ZS5BY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1NFUlZJQ0VfVUlELCBzZWxmLl9zZXJ2aWNlX3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGV2aWNlX3VpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl91aWQgPSBcIlwiICsgcmVzdWx0LmRldmljZV91aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1VJRCwgc2VsZi5fdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOivt+axgueZu+W9leaIkOWKnyEgX3NlcnZpY2VfdWlkPVwiICsgc2VsZi5fc2VydmljZV91aWQgKyBcIiAjZGV2aWNlX2lkPVwiICsgc2VsZi5fdWlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHBhc3NDb3VudDogbnVtYmVyID0gMDsgLy/pgJrlhbPmlbDmja5cclxuICAgIHBsYXlDb3VudDogbnVtYmVyID0gMDsgLy/lvIDlp4vlhbPljaHmlbDmja5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hSURcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWUg5YWz5Y2h5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdExldmVsKGxldmVsOiBzdHJpbmcsIHN0YXR1czogTGV2ZWxTdGF0dXMsIGxldmVsTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVdpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhc3NDb3VudCA9PT0gdXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJwYXNzX2xldmVsX2NvdW50X2FjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0QXR0cmlidXRlZEV2ZW50KEF0dHJpYnV0ZWRUeXBlLkdhbWVBZGRpY3Rpb24sIEF0dHJpYnV0ZWRLZXkuR2FtZUFkZGljdGlvbiwgQXR0cmlidXRlZFZhbHVlLlBhc3NMZXZlbENvdW50QWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IExldmVsU3RhdHVzLkdhbWVTdGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Q291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlDb3VudCA9PSB1dGlscy5nZXRDb25maWdCeUtleShcInBsYXlfbGV2ZWxfY291bnRfYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRBdHRyaWJ1dGVkRXZlbnQoQXR0cmlidXRlZFR5cGUuR2FtZUFkZGljdGlvbiwgQXR0cmlidXRlZEtleS5HYW1lQWRkaWN0aW9uLCBBdHRyaWJ1dGVkVmFsdWUuUGxheUxldmVsQ291bnRBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1ybGV2ZWxcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZsZXZlbF9pZD0ke2xldmVsfSZsZXZlbF9uYW1lPSR7ZW5jb2RlVVJJKGxldmVsTmFtZSl9JnN0YXR1cz0ke3N0YXR1c31gO1xyXG4gICAgICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChyZXQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5YWz5Y2h5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICog5LiK5oql6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoUlEXHJcbiAgICogQHBhcmFtIGxldmVsTmFtZSDlhbPljaHlkI3np7BcclxuICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgVxyXG4gICAqL1xyXG4gICAgcHVibGljIHNlbmRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IFwibT1yZXZlbnRcIjtcclxuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gU1RfU2VydmVyVXJsICsgbWV0aG9kICsgYCZldmVudD0ke2VuY29kZVVSSShldmVudE5hbWUpfWA7XHJcbiAgICAgICAgICAgIHV0aWxzLmNvbW1vbUh0dHBSZXF1ZXN0KHVybCwgZnVuY3Rpb24gKHJldCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7bmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXoh6rlrprkuYnkuovku7blpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOW8ueWHuuaPkOekuuahhlxyXG4gICAgICAqIEBwYXJhbSBtc2cg5raI5oGvXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1RvYXN0KG1zZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBtc2csXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtyZXN9YCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hvd1RvYXN06LCD55So5aSx6LSlYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXlvZLlm6Dkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGUg5LqL5Lu257G75Z6LIDAg5r+A5rS777yMIDI1OuWFs+mUruihjOS4ulxyXG4gICAgICogQHBhcmFtIGV2ZW50VmFsdWUg5LqL5Lu25o+P6L+wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBvcnRBdHRyaWJ1dGVkRXZlbnQoZXZlbnRUeXBlOiBBdHRyaWJ1dGVkVHlwZSwgZXZlbnRLZXk6IEF0dHJpYnV0ZWRLZXksIGV2ZW50VmFsdWU6IEF0dHJpYnV0ZWRWYWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sdWFuY2hUeXBlICE9IFwiMTA2OVwiICYmIHRoaXMuX2x1YW5jaFR5cGUgIT0gXCIxMDM2XCIgJiYgdGhpcy5fbHVhbmNoVHlwZSAhPSBcIjEwNjVcIikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwibHVhbmNoVHlwZT1cIiArIHRoaXMuX2x1YW5jaFR5cGUgKyBcIizkuI3ov5vooYzlvZLlm6DkuIrmiqVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeW9kuWboOS6i+S7tu+8miAgI2V2ZW50VHlwZT1cIiArIGV2ZW50VHlwZSArIFwiI2V2ZW50S2V5PVwiICsgZXZlbnRLZXkgKyBcIiNldmVudFZhbHVlPVwiICsgZXZlbnRWYWx1ZSk7XHJcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PSBBdHRyaWJ1dGVkVHlwZS5BY3RpdmUgJiYgWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfSVNfUkVQT1JUX1VTRVJfQUNUSVZFKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55So5oi35bey57uP5LiK5oql6L+H5r+A5rS777yM5LiN5YaN6L+b6KGM5r+A5rS75LiK5oql77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudFR5cGUgPT0gQXR0cmlidXRlZFR5cGUuR2FtZUFkZGljdGlvbiAmJiBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9JU19SRVBPUlRfR0FNRV9BRERJQ1RJT04pKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnlKjmiLflt7Lnu4/kuIrmiqXov4flhbPplK7ooYzkuLrvvIzkuI3lho3ov5vooYzmv4DmtLvkuIrmiqXvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci50aW1lb3V0ID0gMTUwMDA7ICAgIC8vIOWNleS9jeavq+enklxyXG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICBkYXRhLmFwcF9pZCA9IHV0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuYXBwSUQ7XHJcbiAgICAgICAgZGF0YS5jaGFubmVsID0gXCJ3ZWNoYXRfa3l4XCI7XHJcbiAgICAgICAgZGF0YS51aWQgPSB0aGlzLl9zZXJ2aWNlX3VpZDtcclxuICAgICAgICBkYXRhLmV2ZW50X3R5cGUgPSBldmVudFR5cGU7XHJcbiAgICAgICAgZGF0YS5ldmVudF9rZXkgPSBldmVudEtleTtcclxuICAgICAgICBkYXRhLmV2ZW50X3ZhbHVlID0gZXZlbnRWYWx1ZTtcclxuICAgICAgICBkYXRhLmFwcF92ZXJzaW9uID0gdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy52ZXJzaW9uO1xyXG4gICAgICAgIGRhdGEuY29kZSA9IHRoaXMud3hfY29kZTtcclxuICAgICAgICAvLyBkYXRhLmNsdWVfdG9rZW4gPSB0aGlzLmNsdWVfdG9rZW47XHJcbiAgICAgICAgZGF0YS5sdWFuY2hEYXRlID0gZW5jb2RlVVJJKHRoaXMuX2x1YW5jaERhdGEpO1xyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2S5Zug6K+35rGC5Y+C5pWwOlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZLlm6AgPiBqc29uX2RhdGE9XCIgKyB1dGlscy5hZXNFbmNyeXB0KHJlcXVlc3REYXRhKSk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3RVcmw6IHN0cmluZyA9IGBodHRwczovL3RyYWNrLnlvdWxldGQuY29tL3dlY2hhdGNvdW50ZXJwYXJ0L2RvY2tpbmdyZXR1cm4/anNvbj0ke3V0aWxzLmFlc0VuY3J5cHQocmVxdWVzdERhdGEpfSZ0aW1lX3N0YW1wPSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKX1gO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZLlm6DmnI3liqHlmajlnLDlnYA6XCIgKyByZXF1ZXN0VXJsKTtcclxuXHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHJlcXVlc3RVcmwpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuivt+axgueKtuaAgeaUueWPmCwgcmVhZWR5U3RhdGU9XCIsIHhoci5yZWFkeVN0YXRlLCBcIjsgc3RhdHVzPVwiLCB4aHIuc3RhdHVzKTtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT0gQXR0cmlidXRlZFR5cGUuQWN0aXZlKSBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9JU19SRVBPUlRfVVNFUl9BQ1RJVkUsIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09IEF0dHJpYnV0ZWRUeXBlLkdhbWVBZGRpY3Rpb24pIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX0lTX1JFUE9SVF9HQU1FX0FERElDVElPTiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZLlm6DkuIrmiqXmiJDlip/vvJpcIiwgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZLlm6DkuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9kuWboOivt+axgui2heaXtiFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2S5Zug6K+35rGC5aSx6LSlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgKiDlj4vnm5/muLjmiI/lvIDlp4vkuIrmiqVcclxuICAgICAgICogQHBhcmFtIGxldmVsSUQgXHJcbiAgICAgICAqL1xyXG4gICAgcHVibGljIHVtYU9uU3RhcnQobGV2ZWxJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHd4LnVtYS5zdGFnZS5vblN0YXJ0KHtcclxuICAgICAgICAgICAgc3RhZ2VJZDogbGV2ZWxJRCwvL+ivpeWtl+auteWQjeensOS4jeWPr+S/ruaUue+8jOW/heS8oFxyXG4gICAgICAgICAgICBzdGFnZU5hbWU6IGDnrKwke2xldmVsSUR95YWzYC8vIOWFs+WNoWlkXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMg5piv5ZCm5byA5ZCv5Y+L55ufIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrVW1lbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKCF3eC51bWEpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquWvueaOpeWPi+ebn1NES1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+L55uf57uT566X5LiK5oqlXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxJRCDlhbPljaFpZFxyXG4gICAgICogQHBhcmFtIHN0YWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gZXZlbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bWFSZXBvcnRlZExldmVsKGxldmVsSUQ6IHN0cmluZywgZXZlbnQ6IExldmVsU3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICB3eC51bWEuc3RhZ2Uub25FbmQoe1xyXG4gICAgICAgICAgICBzdGFnZUlkOiBsZXZlbElELC8v6K+l5a2X5q615ZCN56ew5LiN5Y+v5L+u5pS577yM5b+F5LygXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogYOesrCR7bGV2ZWxJRH3lhbNgLFxyXG4gICAgICAgICAgICBldmVudDogZXZlbnRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPi+ebn+iHquWumuS5ieS6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50SWQg5LqL5Lu2SUTvvIzms6jmhI/vvJrkuovku7ZJROW/hemhu+imgeWcqOWQjuWPsOmFjee9rlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyDkuovku7blhoXlrrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVtYVRyYWNrRXZlbnQoZXZlbnRJZDogc3RyaW5nLCBwYXJhbXM/KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVW1lbmcoKSkgcmV0dXJuO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHd4LnVtYS50cmFja0V2ZW50KGV2ZW50SWQsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19