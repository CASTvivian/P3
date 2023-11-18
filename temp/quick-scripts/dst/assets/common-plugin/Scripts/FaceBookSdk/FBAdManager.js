
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/FaceBookSdk/FBAdManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1da79n1bmJN5qrv/yL2wYbA', 'FBAdManager');
// common-plugin/Scripts/FaceBookSdk/FBAdManager.ts

"use strict";
// fb文档 https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3
// 使用的话，直接看广告管理器 FBAdManager
/*
使用步骤
* 1. addXXXXAd() 添加相应的广告，以及预加载的数量（默认为3)
* 1.1. 插屏 addInterstitial
* 1.2. 激励视频 addRewardedVideo
* 1.3. banner addBanner

* 2. loadAll() 预加载所有广告实例

* 3. isXXXReady() 检查是否可以播放
* 3.1. 插屏  isInterstitialAdReady
* 3.2. 激励视频 isRewardedVideoReady
* 3.3. banner isBannerReady

* 4. showXXXAsync() 播放广告，并检查播放状态
* 4.1. 插屏 showInterstitialAd
* 4.2. 激励视频 showRewardedVideo
* 4.3. banner showBannerAsync

* 5. hideXXXAsync() 隐藏广告（banner专属)
* 5.1. 插屏 不需要
* 5.2. 激励视频 不需要
* 5.3. banner hideBannerAsync

* 其他：
* 6. 判断是否支持特定api
* 6.1 判断是否支持banner广告
//
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Utils_1 = require("../Utils");
var FB_MAX_AD_INSTANCE = 3; // FB允许的最多广告实例数量
var FB_INIT_AD_COUNT = 3; // 预加载的广告实例数量
var FB_BANNER_REFRESH_INTERVAL = 30 + 10; // FB: Banner广告有播放间隔限制 30 seconds (由于网络原因，需要多加一点时间)
var FB_INTERSTITIAL_REFRESH_INTERVAL = 30 + 10; // FB: 插屏广告有播放间隔限制
var FB_REWARDED_VIDEO_REFRESH_INTERVAL = 0; // FB: 激励视频没有播放间隔限制
var FB_MAX_BANNER_ERROR = 1; // banner加载连续出现N次错误后，终止加载
var FB_MAX_INTERSTITIAL_ERROR = 3; // 插屏加载连续出现N次错误后，终止加载
var FB_MAX_REWARDED_VIDEO_ERROR = 3; // 激励视频加载连续出现N次错误后，终止加载
var FB_AUTO_LOAD_ON_PLAY = true; // 插屏、激励视频是否在播放完毕后自动加载
var FB_AUTO_RELOAD_DELAY = 1; // 自动重新加载时，延迟加载等待的时间
var FB_AD_DELAY_FOR_FIRST_BANNER = 0; // 首个banner广告延迟N秒显示
var FB_AD_DELAY_FOR_FIRST_INTERSTITIAL = 30; // 首个插屏广告需要延迟30秒播放（避免游戏前30秒就播放广告）
var FB_AD_DELAY_FOR_FIRST_REWARDED_VIDEO = 0; // 首个激励视频广告延迟N秒显示
var FB_AD_TYPE;
(function (FB_AD_TYPE) {
    FB_AD_TYPE[FB_AD_TYPE["INTERSTITIAL"] = 0] = "INTERSTITIAL";
    FB_AD_TYPE[FB_AD_TYPE["REWARDED_VIDEO"] = 1] = "REWARDED_VIDEO";
    FB_AD_TYPE[FB_AD_TYPE["BANNER"] = 2] = "BANNER";
})(FB_AD_TYPE || (FB_AD_TYPE = {}));
var FB_AD_STATE;
(function (FB_AD_STATE) {
    FB_AD_STATE[FB_AD_STATE["NONE"] = 0] = "NONE";
    FB_AD_STATE[FB_AD_STATE["NEW"] = 1] = "NEW";
    FB_AD_STATE[FB_AD_STATE["LOADING"] = 2] = "LOADING";
    FB_AD_STATE[FB_AD_STATE["LOADED"] = 3] = "LOADED";
    FB_AD_STATE[FB_AD_STATE["PLAYING"] = 4] = "PLAYING";
})(FB_AD_STATE || (FB_AD_STATE = {}));
function getStateName(state) {
    var str = "NONE";
    switch (state) {
        case FB_AD_STATE.NEW:
            str = "NEW";
            break;
        case FB_AD_STATE.LOADING:
            str = "LOADING";
            break;
        case FB_AD_STATE.LOADED:
            str = "LOADED";
            break;
        case FB_AD_STATE.PLAYING:
            str = "PLAYING";
            break;
    }
    return str;
}
function waitTimeSecond(timeoutSecond, callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (callback) {
                            callback();
                        }
                        resolve();
                    }, timeoutSecond * 1000);
                })];
        });
    });
}
var ErrorTooManyAdInstance = {
    code: "EXCEED_MAX_AD_INSTANCE",
    message: "广告对象不允许超过 " + FB_MAX_AD_INSTANCE
};
var ErrorNoReadyAdInstance = {
    code: "NO_READY_AD_INSTANCE",
    message: "没有加载完毕的广告，或者广告播放太频繁"
};
var ErrorNotReadyForLoad = {
    code: "NOT_READY_FOR_LOAD",
    message: "当前状态不允许再次加载"
};
var ErrorAdIsLoading = {
    code: "AD_IS_LOADING",
    message: "广告正在加载"
};
var ErrorNotReadyForPlay = {
    code: "NOT_READY_FOR_PLAYING",
    message: "没有可以播放的广告"
};
var ErrorAdIsPlaying = {
    code: "AD_IS_PLAYING",
    message: "广告正在播放"
};
var ErrorNoBannerAdInstance = {
    code: "NO_BANNER_AD",
    message: "没有添加Banner广告"
};
var ErrorApiNotSupport = {
    code: "API_NOT_SUPPORT",
    message: "广告接口不支持"
};
var ErrorTooFastShow = {
    code: "TOO_FAST_SHOW",
    message: "广告播放太频繁"
};
var ErrorNotPlaying = {
    code: "NOT_PLAYING",
    message: "广告没有播放"
};
var ErrorTooManyErrors = {
    code: "TOO_MANY_ERRORS",
    message: "太多错误, 停止操作"
};
var FB_API_BANNER = "loadBannerAdAsync";
var FB_ERROR_CODE_RATE_LIMITED = "RATE_LIMITED";
var FB_ERROR_CLIENT_UNSUPPORTED_OPERATION = "CLIENT_UNSUPPORTED_OPERATION";
var FB_ERROR_ADS_NO_FILL = "ADS_NO_FILL";
function getOption(opt, key, defaultValue) {
    if (opt && typeof (opt[key]) != "undefined") {
        return opt[key];
    }
    return defaultValue;
}
// 广告计时器
var AdTimer = /** @class */ (function () {
    function AdTimer(interval, delay) {
        this._lastShowTime = 0; // 上次显示时间
        this._refreshInterval = 0; // 刷新间隔, <=0 表示无限制
        this._refreshInterval = interval > 0 ? interval : 0;
        this._lastShowTime = 0;
        if (delay > 0) {
            this._lastShowTime = Date.now() + delay * 1000 - this._refreshInterval * 1000;
        }
    }
    AdTimer.prototype.isReadyToRefresh = function () {
        return this.getNextRefreshInterval() <= 0;
    };
    AdTimer.prototype.getNextRefreshInterval = function () {
        var refreshInterval = 0;
        if (this._refreshInterval > 0 && this._lastShowTime > 0) {
            var currentTime = Date.now();
            refreshInterval = this._refreshInterval - (currentTime - this._lastShowTime) / 1000;
        }
        return refreshInterval;
    };
    AdTimer.prototype.updateLastShowTime = function () {
        this._lastShowTime = Date.now();
    };
    return AdTimer;
}());
var FBAdUnitBase = /** @class */ (function () {
    function FBAdUnitBase(id, type, sharedTimer, opt) {
        // protected _lastShowTime:number = 0;    // 上次显示时间
        // protected _refreshInterval:number = 0;    // 刷新间隔, <=0 表示无限制
        this._maxLoadError = 0;
        this._errorCounter = 0;
        this._fatalError = false;
        this._sharedTimer = null;
        this._adId = id;
        this._state = FB_AD_STATE.NONE;
        this._type = type;
        this._sharedTimer = sharedTimer;
        this._fatalError = false;
        Utils_1.utils.showLog(!!sharedTimer, "sharedTimer is invalid", sharedTimer);
        // this._refreshInterval = getOption(opt, "refreshInterval", 0);
        this._maxLoadError = getOption(opt, "maxLoadError", 0);
        // const delayForFirstAd = getOption(opt, "delayForFirstAd", 0);
        // if(delayForFirstAd > 0) {
        //     this._lastShowTime = Date.now() + delayForFirstAd * 1000 - this._refreshInterval * 1000;
        // }else{
        //     this._lastShowTime = 0;
        // }
    }
    FBAdUnitBase.prototype.getStateName = function () {
        return getStateName(this._state);
    };
    FBAdUnitBase.prototype.getAdTypeName = function () {
        if (this._type == FB_AD_TYPE.INTERSTITIAL) {
            return "插屏广告";
        }
        if (this._type == FB_AD_TYPE.REWARDED_VIDEO) {
            return "激励视频广告";
        }
        if (this._type == FB_AD_TYPE.BANNER) {
            return "Banner";
        }
        return "UNKNOWN";
    };
    FBAdUnitBase.prototype.getInfo = function () {
        return "[" + this.getAdTypeName() + ":" + this._adId + ":" + this.getStateName() + "]";
    };
    FBAdUnitBase.prototype.isReadyToRefresh = function () {
        // return this.getNextRefreshInterval() <= 0;
        return this._sharedTimer.isReadyToRefresh();
    };
    FBAdUnitBase.prototype.getNextRefreshInterval = function () {
        return this._sharedTimer.getNextRefreshInterval();
    };
    FBAdUnitBase.prototype.updateLastShowTime = function () {
        this._sharedTimer.updateLastShowTime();
    };
    FBAdUnitBase.prototype.increaseErrorCounter = function () {
        this._errorCounter++;
    };
    FBAdUnitBase.prototype.resetErrorCounter = function () {
        this._errorCounter = 0;
    };
    FBAdUnitBase.prototype.setFatalError = function () {
        this._fatalError = true;
    };
    FBAdUnitBase.prototype.isErrorTooMany = function () {
        return this._fatalError || (this._maxLoadError > 0 && this._errorCounter >= this._maxLoadError);
    };
    return FBAdUnitBase;
}());
// 有状态的广告对象
var FBStatefulAdUnit = /** @class */ (function (_super) {
    __extends(FBStatefulAdUnit, _super);
    function FBStatefulAdUnit(id, type, sharedTimer, opt) {
        var _this = _super.call(this, id, type, sharedTimer, opt) || this;
        _this._adInstance = null;
        _this._autoLoadOnPlay = getOption(opt, "autoLoadOnPlay", false);
        return _this;
    }
    // 预加载广告
    FBStatefulAdUnit.prototype.loadAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1, delayTime;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._adInstance == null)) return [3 /*break*/, 4];
                        if (!(this._state == FB_AD_STATE.NONE)) return [3 /*break*/, 2];
                        // 只能创建一次
                        this._state = FB_AD_STATE.NEW;
                        Utils_1.utils.showLog("获取广告对象: " + this.getInfo());
                        _a = this;
                        return [4 /*yield*/, this.createAdInstanceAsync(this._adId)];
                    case 1:
                        _a._adInstance = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        // 已经在创建对象了 （new-ing)
                        Utils_1.utils.showLog("当前状态未满足加载条件, 正在获取广告对象: " + this.getInfo());
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 4];
                    case 4:
                        // [2] 检查是否满足预加载条件
                        if (this._state != FB_AD_STATE.NEW) {
                            // 只有 NEW 状态才能进行加载
                            Utils_1.utils.showLog("当前状态未满足加载条件: " + this.getInfo());
                            if (this._state == FB_AD_STATE.LOADING) {
                                Utils_1.utils.showLog("广告正在加载中，不要重复加载" + this.getInfo());
                                throw ErrorAdIsLoading;
                            }
                            else {
                                throw ErrorNotReadyForLoad;
                            }
                        }
                        if (this.isErrorTooMany()) {
                            Utils_1.utils.showLog("太多错误，停止加载: " + this.getInfo());
                            throw ErrorTooManyErrors;
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        // [3] 加载广告
                        // 设置为加载中
                        this._state = FB_AD_STATE.LOADING;
                        Utils_1.utils.showLog("开始加载广告: " + this.getInfo());
                        return [4 /*yield*/, this._adInstance.loadAsync()];
                    case 6:
                        _b.sent();
                        // [4] 成功加载
                        this._state = FB_AD_STATE.LOADED;
                        this.resetErrorCounter();
                        Utils_1.utils.showLog("广告加载成功: " + this.getInfo());
                        return [2 /*return*/, true];
                    case 7:
                        e_1 = _b.sent();
                        // [5] 加载失败
                        // 异常能正常进入promise的catch分支
                        // 加载失败，不需要重置 adInstance
                        // this._adInstance = null;
                        // 状态回退到加载前
                        Utils_1.utils.showLog("广告加载失败: " + this.getInfo(), e_1);
                        if (e_1.code == FB_ERROR_ADS_NO_FILL) {
                            // 遇到 NOT FILL错误，就不能再继续加载了
                            Utils_1.utils.showLog("广告无法填充，不再继续请求: " + this.getInfo());
                            this.setFatalError();
                        }
                        else {
                            this.increaseErrorCounter();
                            this._state = FB_AD_STATE.NEW;
                            delayTime = 10 * this._errorCounter + FB_AUTO_RELOAD_DELAY;
                            Utils_1.utils.showLog("延迟" + delayTime + "秒后, 自动重新加载: " + this.getInfo());
                            waitTimeSecond(delayTime, this.loadAsync.bind(this));
                        }
                        throw e_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // 广告是否加载完毕
    FBStatefulAdUnit.prototype.isReady = function () {
        return this._adInstance != null && this._state == FB_AD_STATE.LOADED;
    };
    // 播放广告
    FBStatefulAdUnit.prototype.showAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // [1.1] 判断是否满足播放条件
                        if (!this.isReady()) {
                            Utils_1.utils.showLog("当前状态未满足播放条件: " + this.getInfo());
                            if (this._state == FB_AD_STATE.PLAYING) {
                                throw ErrorAdIsPlaying;
                            }
                            else {
                                throw ErrorNotReadyForPlay;
                            }
                        }
                        // [1.2] 是否满足播放间隔
                        if (!this.isReadyToRefresh()) {
                            Utils_1.utils.showLog("播放太频繁，还需间隔" + this.getNextRefreshInterval() + " 秒: " + this.getInfo());
                            throw ErrorTooFastShow;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // [2] 播放广告
                        // 设置为播放中
                        this._state = FB_AD_STATE.PLAYING;
                        Utils_1.utils.showLog("开始播放广告: " + this.getInfo());
                        return [4 /*yield*/, this._adInstance.showAsync()];
                    case 2:
                        _a.sent();
                        Utils_1.utils.showLog("播放广告完毕: " + this.getInfo());
                        // [3] 播放完毕后重置广告对象
                        this._adInstance = null;
                        this._state = FB_AD_STATE.NONE;
                        this.updateLastShowTime();
                        // [4] 播完自动加载
                        if (this._autoLoadOnPlay) {
                            // TODO: 应该适当延迟
                            Utils_1.utils.showLog("延迟" + FB_AUTO_RELOAD_DELAY + "秒后, 自动重新加载: " + this.getInfo());
                            waitTimeSecond(FB_AUTO_RELOAD_DELAY, this.loadAsync.bind(this));
                        }
                        return [2 /*return*/, true];
                    case 3:
                        e_2 = _a.sent();
                        // [5] 播放完毕后重置广告对象
                        Utils_1.utils.showLog("播放广告失败: " + this.getInfo(), e_2);
                        if (e_2.code == FB_ERROR_CODE_RATE_LIMITED) {
                            // 播放太频繁，可忽略
                            // 状态回退
                            this._state = FB_AD_STATE.LOADED;
                        }
                        else {
                            this._adInstance = null;
                            this._state = FB_AD_STATE.NONE;
                            // [6] 失败自动重新加载
                            if (this._autoLoadOnPlay) {
                                Utils_1.utils.showLog("延迟" + FB_AUTO_RELOAD_DELAY + "秒后, 自动重新加载: " + this.getInfo());
                                waitTimeSecond(FB_AUTO_RELOAD_DELAY, this.loadAsync.bind(this));
                            }
                        }
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FBStatefulAdUnit;
}(FBAdUnitBase));
// 插屏广告
var FBInterstitialUnit = /** @class */ (function (_super) {
    __extends(FBInterstitialUnit, _super);
    function FBInterstitialUnit(id, sharedTimer, opt) {
        return _super.call(this, id, FB_AD_TYPE.INTERSTITIAL, sharedTimer, opt) || this;
    }
    FBInterstitialUnit.prototype.createAdInstanceAsync = function (adId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FBInstant.getInterstitialAdAsync(this._adId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FBInterstitialUnit;
}(FBStatefulAdUnit));
// 激励视频广告
var FBRewardedVideoUnit = /** @class */ (function (_super) {
    __extends(FBRewardedVideoUnit, _super);
    function FBRewardedVideoUnit(id, sharedTimer, opt) {
        return _super.call(this, id, FB_AD_TYPE.REWARDED_VIDEO, sharedTimer, opt) || this;
    }
    FBRewardedVideoUnit.prototype.createAdInstanceAsync = function (adId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FBInstant.getRewardedVideoAsync(this._adId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FBRewardedVideoUnit;
}(FBStatefulAdUnit));
// 横幅广告
var FBBannerUnit = /** @class */ (function (_super) {
    __extends(FBBannerUnit, _super);
    function FBBannerUnit(id, sharedTimer, opt) {
        return _super.call(this, id, FB_AD_TYPE.BANNER, sharedTimer, opt) || this;
    }
    // 显示Banner广告, 注意可以调用多次
    FBBannerUnit.prototype.showAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isReadyToRefresh()) {
                            Utils_1.utils.showLog("播放太频繁，还需间隔" + this.getNextRefreshInterval() + " 秒: " + this.getInfo());
                            throw ErrorTooFastShow;
                        }
                        if (this.isErrorTooMany()) {
                            Utils_1.utils.showLog("太多错误，停止加载: " + this.getInfo());
                            throw ErrorTooManyErrors;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this._state = FB_AD_STATE.PLAYING;
                        Utils_1.utils.showLog("开始显示广告: " + this.getInfo());
                        return [4 /*yield*/, FBInstant.loadBannerAdAsync(this._adId)];
                    case 2:
                        _a.sent();
                        Utils_1.utils.showLog("显示广告成功: " + this.getInfo());
                        // 更新刷新时间
                        this.updateLastShowTime();
                        this.resetErrorCounter();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        Utils_1.utils.showLog("显示广告失败: " + this.getInfo(), e_3);
                        if (e_3.code == FB_ERROR_CODE_RATE_LIMITED) {
                            // 播放太频繁，可忽略
                            // 不用重置，保留
                        }
                        else if (e_3.code == FB_ERROR_ADS_NO_FILL) {
                            // 遇到 NOT FILL错误，就不能再继续加载了
                            Utils_1.utils.showLog("广告无法填充，不再继续请求: " + this.getInfo());
                            this.setFatalError();
                        }
                        else {
                            this.increaseErrorCounter();
                        }
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FBBannerUnit.prototype.hideAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._state != FB_AD_STATE.PLAYING) {
                            Utils_1.utils.showLog("广告没有在播放中: " + this.getInfo());
                            throw ErrorNotPlaying;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        Utils_1.utils.showLog("隐藏广告: " + this.getInfo());
                        // TODO: 重复隐藏广告不会报错
                        return [4 /*yield*/, FBInstant.hideBannerAdAsync()];
                    case 2:
                        // TODO: 重复隐藏广告不会报错
                        _a.sent();
                        this._state = FB_AD_STATE.NONE;
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        Utils_1.utils.showLog("隐藏广告失败: " + this.getInfo(), e_4);
                        // 隐藏失败不做任何操作
                        // this._state = FB_AD_STATE.NONE;
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FBBannerUnit;
}(FBAdUnitBase));
var FBAdManager = /** @class */ (function () {
    function FBAdManager() {
    }
    FBAdManager.getVersion = function () {
        return "1.0.2";
    };
    // 1.1 添加插屏广告
    // 返回已经添加的插屏广告总数
    FBAdManager.addInterstitial = function (id, count) {
        if (count === void 0) { count = FB_INIT_AD_COUNT; }
        if (this._interstitialTimer == null) {
            this._interstitialTimer = new AdTimer(this.defaultInterstitialTimerOption.refreshInterval, this.defaultInterstitialTimerOption.delayForFirstAd);
        }
        for (var i = 0; i < count; i++) {
            if (this._interstitialAds.length >= FB_MAX_AD_INSTANCE) {
                Utils_1.utils.showLog("添加插屏广告失败, 超出限制: " + this._interstitialAds.length, id);
                throw ErrorTooManyAdInstance;
            }
            var adUnit = new FBInterstitialUnit(id, this._interstitialTimer, this.defaultInterstitialOption);
            this._interstitialAds.push(adUnit);
            Utils_1.utils.showLog("添加插屏广告: " + id, "count: " + this._interstitialAds.length);
        }
        return this._interstitialAds.length;
    };
    // 1.2. 添加激励视频广告
    // 返回已经添加的激励视频总数
    FBAdManager.addRewardedVideo = function (id, count) {
        if (count === void 0) { count = FB_INIT_AD_COUNT; }
        if (this._rewardedVideoTimer == null) {
            this._rewardedVideoTimer = new AdTimer(this.defaultRewardedVideoTimerOption.refreshInterval, this.defaultRewardedVideoTimerOption.delayForFirstAd);
        }
        for (var i = 0; i < count; i++) {
            if (this._rewardedVideos.length >= FB_MAX_AD_INSTANCE) {
                Utils_1.utils.showLog("添加激励视频广告失败, 超出限制: " + this._rewardedVideos.length, id);
                throw ErrorTooManyAdInstance;
            }
            var adUnit = new FBRewardedVideoUnit(id, this._rewardedVideoTimer, this.defaultRewardedVideoOption);
            this._rewardedVideos.push(adUnit);
            Utils_1.utils.showLog("添加激励视频广告: " + id, "count: " + this._rewardedVideos.length);
        }
        return this._rewardedVideos.length;
    };
    // 1.3. 添加Banner广告
    FBAdManager.addBanner = function (id) {
        if (this._bannerTimer == null) {
            this._bannerTimer = new AdTimer(this.defaultBannerTimerOption.refreshInterval, this.defaultBannerTimerOption.delayForFirstAd);
        }
        var adUnit = new FBBannerUnit(id, this._bannerTimer, this.defaultBannerOption);
        this._banners.push(adUnit);
        Utils_1.utils.showLog("添加Banner广告: " + id, "count: " + this._banners.length);
        return adUnit;
    };
    // 2. 初始化和预加载
    // Deprecated 此方法用于保持兼容, 建议使用 loadAllAsync
    FBAdManager.loadAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.utils.showLog("初始化广告队列");
                        return [4 /*yield*/, this.loadAllAsync()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 异步顺序预加载所有广告
    FBAdManager.loadAllAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, adUnit, e_5, i, adUnit, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.utils.showLog("FBAdManager Version: " + this.getVersion());
                        Utils_1.utils.showLog("初始化广告队列");
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._rewardedVideos.length)) return [3 /*break*/, 7];
                        adUnit = this._rewardedVideos[i];
                        if (!(i > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, waitTimeSecond(0.1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, adUnit.loadAsync()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_5 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        i = 0;
                        _a.label = 8;
                    case 8:
                        if (!(i < this._interstitialAds.length)) return [3 /*break*/, 14];
                        adUnit = this._interstitialAds[i];
                        if (!(i > 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, waitTimeSecond(0.1)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, adUnit.loadAsync()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_6 = _a.sent();
                        return [3 /*break*/, 13];
                    case 13:
                        i++;
                        return [3 /*break*/, 8];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    FBAdManager._isAdReady = function (type) {
        var adUnits = (type == FB_AD_TYPE.INTERSTITIAL) ? this._interstitialAds : this._rewardedVideos;
        var isReady = false;
        for (var i = 0; i < adUnits.length; i++) {
            var adUnit = adUnits[i];
            if (adUnit.isReady() && adUnit.isReadyToRefresh()) {
                isReady = true;
                break;
            }
        }
        return isReady;
    };
    FBAdManager._showAsync = function (type) {
        var adUnits = (type == FB_AD_TYPE.INTERSTITIAL) ? this._interstitialAds : this._rewardedVideos;
        var readyUnit = null;
        for (var i = 0; i < adUnits.length; i++) {
            var adUnit = adUnits[i];
            if (adUnit.isReady() && adUnit.isReadyToRefresh()) {
                readyUnit = adUnit;
                break;
            }
        }
        if (readyUnit != null) {
            return readyUnit.showAsync();
        }
        throw ErrorNoReadyAdInstance;
    };
    FBAdManager._getAdTimer = function (type) {
        if (type == FB_AD_TYPE.INTERSTITIAL) {
            return this._interstitialTimer;
        }
        if (type == FB_AD_TYPE.REWARDED_VIDEO) {
            return this._rewardedVideoTimer;
        }
        return this._bannerTimer;
    };
    // 3.1. 判断是否可以播放插屏广告
    FBAdManager.isInterstitialAdReady = function () {
        return this._isAdReady(FB_AD_TYPE.INTERSTITIAL);
    };
    // 4.1. 播放插屏广告
    FBAdManager.showInterstitialAd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._showAsync(FB_AD_TYPE.INTERSTITIAL)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 3.2. 判断是否可以播放激励视频广告
    FBAdManager.isRewardedVideoReady = function () {
        return this._isAdReady(FB_AD_TYPE.REWARDED_VIDEO);
    };
    // 4.2. 播放激励视频广告
    FBAdManager.showRewardedVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._showAsync(FB_AD_TYPE.REWARDED_VIDEO)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 6. 检查是否支持对应API
    FBAdManager.checkApiSupport = function (api) {
        if (FBInstant.getSupportedAPIs().indexOf(api) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    // 6.1. 是否支持banner
    FBAdManager.isBannerSupport = function () {
        if (typeof this._bannerSupport == "undefined") {
            this._bannerSupport = this.checkApiSupport(FB_API_BANNER);
        }
        return this._bannerSupport;
    };
    // 3.3. banner广告是否可以刷新或者重新加载
    FBAdManager.isBannerReady = function () {
        if (this._banners.length <= 0) {
            throw ErrorNoBannerAdInstance;
        }
        var adUnit = this._banners[0];
        return adUnit.isReadyToRefresh();
    };
    // 4.3. 播放默认banner广告
    FBAdManager.showBannerAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adUnit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isBannerSupport()) {
                            throw ErrorApiNotSupport;
                        }
                        if (this._banners.length <= 0) {
                            throw ErrorNoBannerAdInstance;
                        }
                        adUnit = this._banners[0];
                        return [4 /*yield*/, adUnit.showAsync()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 5.3. 隐藏默认banner广告
    FBAdManager.hideBannerAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adUnit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isBannerSupport()) {
                            throw ErrorApiNotSupport;
                        }
                        if (this._banners.length <= 0) {
                            throw ErrorNoBannerAdInstance;
                        }
                        adUnit = this._banners[0];
                        return [4 /*yield*/, adUnit.hideAsync()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FBAdManager._interstitialAds = [];
    FBAdManager._rewardedVideos = [];
    FBAdManager._banners = [];
    FBAdManager._interstitialTimer = null;
    FBAdManager._rewardedVideoTimer = null;
    FBAdManager._bannerTimer = null;
    FBAdManager._bannerSupport = undefined;
    // 插屏广告默认参数
    FBAdManager.defaultInterstitialOption = {
        autoLoadOnPlay: FB_AUTO_LOAD_ON_PLAY,
        maxLoadError: FB_MAX_INTERSTITIAL_ERROR,
    };
    // 激励视频默认参数
    FBAdManager.defaultRewardedVideoOption = {
        autoLoadOnPlay: FB_AUTO_LOAD_ON_PLAY,
        maxLoadError: FB_MAX_REWARDED_VIDEO_ERROR,
    };
    // banner默认参数
    FBAdManager.defaultBannerOption = {
        autoLoadOnPlay: FB_AUTO_LOAD_ON_PLAY,
        maxLoadError: FB_MAX_BANNER_ERROR,
    };
    // 插屏广告计时器默认参数
    FBAdManager.defaultInterstitialTimerOption = {
        refreshInterval: FB_INTERSTITIAL_REFRESH_INTERVAL,
        delayForFirstAd: FB_AD_DELAY_FOR_FIRST_INTERSTITIAL
    };
    // 激励视频计时器默认参数
    FBAdManager.defaultRewardedVideoTimerOption = {
        refreshInterval: FB_REWARDED_VIDEO_REFRESH_INTERVAL,
        delayForFirstAd: FB_AD_DELAY_FOR_FIRST_REWARDED_VIDEO
    };
    // banner计时器默认参数
    FBAdManager.defaultBannerTimerOption = {
        refreshInterval: FB_BANNER_REFRESH_INTERVAL,
        delayForFirstAd: FB_AD_DELAY_FOR_FIRST_BANNER
    };
    return FBAdManager;
}());
exports.default = FBAdManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcRmFjZUJvb2tTZGtcXEZCQWRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBaUY7QUFDakYsNEJBQTRCO0FBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRixrQ0FBaUM7QUFFakMsSUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBRyxnQkFBZ0I7QUFDaEQsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBSyxhQUFhO0FBRTdDLElBQU0sMEJBQTBCLEdBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLG1EQUFtRDtBQUM3RixJQUFNLGdDQUFnQyxHQUFHLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7QUFDbEUsSUFBTSxrQ0FBa0MsR0FBRyxDQUFDLENBQUMsQ0FBRyxtQkFBbUI7QUFFbkUsSUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBYyx5QkFBeUI7QUFDckUsSUFBTSx5QkFBeUIsR0FBRyxDQUFDLENBQUMsQ0FBUSxxQkFBcUI7QUFDakUsSUFBTSwyQkFBMkIsR0FBRyxDQUFDLENBQUMsQ0FBTSx1QkFBdUI7QUFFbkUsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsQ0FBVSxzQkFBc0I7QUFDbEUsSUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBYSxvQkFBb0I7QUFFaEUsSUFBTSw0QkFBNEIsR0FBRyxDQUFDLENBQUMsQ0FBUyxtQkFBbUI7QUFDbkUsSUFBTSxrQ0FBa0MsR0FBRyxFQUFFLENBQUMsQ0FBRSxpQ0FBaUM7QUFDakYsSUFBTSxvQ0FBb0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7QUFFakUsSUFBSyxVQUlKO0FBSkQsV0FBSyxVQUFVO0lBQ1gsMkRBQWdCLENB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YyxHQUFHLFNBQVMsQ0FBQztJQUUxQyxXQUFXO0lBQ0cscUNBQXlCLEdBQWM7UUFDakQsY0FBYyxFQUFFLG9CQUFvQjtRQUNwQyxZQUFZLEVBQUUseUJBQXlCO0tBQzFDLENBQUM7SUFFRixXQUFXO0lBQ0csc0NBQTBCLEdBQWM7UUFDbEQsY0FBYyxFQUFFLG9CQUFvQjtRQUNwQyxZQUFZLEVBQUUsMkJBQTJCO0tBQzVDLENBQUM7SUFFRixhQUFhO0lBQ0MsK0JBQW1CLEdBQWM7UUFDM0MsY0FBYyxFQUFFLG9CQUFvQjtRQUNwQyxZQUFZLEVBQUUsbUJBQW1CO0tBQ3BDLENBQUM7SUFFRixjQUFjO0lBQ0EsMENBQThCLEdBQWlCO1FBQ3pELGVBQWUsRUFBRSxnQ0FBZ0M7UUFDakQsZUFBZSxFQUFFLGtDQUFrQztLQUN0RCxDQUFDO0lBRUYsY0FBYztJQUNBLDJDQUErQixHQUFpQjtRQUMxRCxlQUFlLEVBQUUsa0NBQWtDO1FBQ25ELGVBQWUsRUFBRSxvQ0FBb0M7S0FDeEQsQ0FBQztJQUVGLGdCQUFnQjtJQUNGLG9DQUF3QixHQUFpQjtRQUNuRCxlQUFlLEVBQUUsMEJBQTBCO1FBQzNDLGVBQWUsRUFBRSw0QkFBNEI7S0FDaEQsQ0FBQztJQXdOTixrQkFBQztDQXpRRCxBQXlRQyxJQUFBO2tCQXpRb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGZi5paH5qGjIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9nYW1lcy9pbnN0YW50LWdhbWVzL3Nkay9mYmluc3RhbnQ2LjNcbi8vIOS9v+eUqOeahOivne+8jOebtOaOpeeci+W5v+WRiueuoeeQhuWZqCBGQkFkTWFuYWdlclxuLypcbuS9v+eUqOatpemqpFxuKiAxLiBhZGRYWFhYQWQoKSDmt7vliqDnm7jlupTnmoTlub/lkYrvvIzku6Xlj4rpooTliqDovb3nmoTmlbDph4/vvIjpu5jorqTkuLozKVxuKiAxLjEuIOaPkuWxjyBhZGRJbnRlcnN0aXRpYWxcbiogMS4yLiDmv4DlirHop4bpopEgYWRkUmV3YXJkZWRWaWRlb1xuKiAxLjMuIGJhbm5lciBhZGRCYW5uZXJcblxuKiAyLiBsb2FkQWxsKCkg6aKE5Yqg6L295omA5pyJ5bm/5ZGK5a6e5L6LXG5cbiogMy4gaXNYWFhSZWFkeSgpIOajgOafpeaYr+WQpuWPr+S7peaSreaUvlxuKiAzLjEuIOaPkuWxjyAgaXNJbnRlcnN0aXRpYWxBZFJlYWR5XG4qIDMuMi4g5r+A5Yqx6KeG6aKRIGlzUmV3YXJkZWRWaWRlb1JlYWR5XG4qIDMuMy4gYmFubmVyIGlzQmFubmVyUmVhZHlcblxuKiA0LiBzaG93WFhYQXN5bmMoKSDmkq3mlL7lub/lkYrvvIzlubbmo4Dmn6Xmkq3mlL7nirbmgIFcbiogNC4xLiDmj5LlsY8gc2hvd0ludGVyc3RpdGlhbEFkXG4qIDQuMi4g5r+A5Yqx6KeG6aKRIHNob3dSZXdhcmRlZFZpZGVvXG4qIDQuMy4gYmFubmVyIHNob3dCYW5uZXJBc3luY1xuXG4qIDUuIGhpZGVYWFhBc3luYygpIOmakOiXj+W5v+WRiu+8iGJhbm5lcuS4k+WxnilcbiogNS4xLiDmj5LlsY8g5LiN6ZyA6KaBXG4qIDUuMi4g5r+A5Yqx6KeG6aKRIOS4jemcgOimgVxuKiA1LjMuIGJhbm5lciBoaWRlQmFubmVyQXN5bmNcblxuKiDlhbbku5bvvJpcbiogNi4g5Yik5pat5piv5ZCm5pSv5oyB54m55a6aYXBpXG4qIDYuMSDliKTmlq3mmK/lkKbmlK/mjIFiYW5uZXLlub/lkYpcbi8vIFxuKi9cblxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi4vVXRpbHNcIjtcblxuY29uc3QgRkJfTUFYX0FEX0lOU1RBTkNFID0gMzsgICAvLyBGQuWFgeiuuOeahOacgOWkmuW5v+WRiuWunuS+i+aVsOmHj1xuY29uc3QgRkJfSU5JVF9BRF9DT1VOVCA9IDM7ICAgICAvLyDpooTliqDovb3nmoTlub/lkYrlrp7kvovmlbDph49cblxuY29uc3QgRkJfQkFOTkVSX1JFRlJFU0hfSU5URVJWQUwgPSAzMCsxMDsgLy8gRkI6IEJhbm5lcuW5v+WRiuacieaSreaUvumXtOmalOmZkOWItiAzMCBzZWNvbmRzICjnlLHkuo7nvZHnu5zljp/lm6DvvIzpnIDopoHlpJrliqDkuIDngrnml7bpl7QpXG5jb25zdCBGQl9JTlRFUlNUSVRJQUxfUkVGUkVTSF9JTlRFUlZBTCA9IDMwKzEwOyAvLyBGQjog5o+S5bGP5bm/5ZGK5pyJ5pKt5pS+6Ze06ZqU6ZmQ5Yi2XG5jb25zdCBGQl9SRVdBUkRFRF9WSURFT19SRUZSRVNIX0lOVEVSVkFMID0gMDsgICAvLyBGQjog5r+A5Yqx6KeG6aKR5rKh5pyJ5pKt5pS+6Ze06ZqU6ZmQ5Yi2XG5cbmNvbnN0IEZCX01BWF9CQU5ORVJfRVJST1IgPSAxOyAgICAgICAgICAgICAgLy8gYmFubmVy5Yqg6L296L+e57ut5Ye6546wTuasoemUmeivr+WQju+8jOe7iOatouWKoOi9vVxuY29uc3QgRkJfTUFYX0lOVEVSU1RJVElBTF9FUlJPUiA9IDM7ICAgICAgICAvLyDmj5LlsY/liqDovb3ov57nu63lh7rnjrBO5qyh6ZSZ6K+v5ZCO77yM57uI5q2i5Yqg6L29XG5jb25zdCBGQl9NQVhfUkVXQVJERURfVklERU9fRVJST1IgPSAzOyAgICAgIC8vIOa/gOWKseinhumikeWKoOi9vei/nue7reWHuueOsE7mrKHplJnor6/lkI7vvIznu4jmraLliqDovb1cblxuY29uc3QgRkJfQVVUT19MT0FEX09OX1BMQVkgPSB0cnVlOyAgICAgICAgICAvLyDmj5LlsY/jgIHmv4DlirHop4bpopHmmK/lkKblnKjmkq3mlL7lrozmr5XlkI7oh6rliqjliqDovb1cbmNvbnN0IEZCX0FVVE9fUkVMT0FEX0RFTEFZID0gMTsgICAgICAgICAgICAgLy8g6Ieq5Yqo6YeN5paw5Yqg6L295pe277yM5bu26L+f5Yqg6L29562J5b6F55qE5pe26Ze0XG5cbmNvbnN0IEZCX0FEX0RFTEFZX0ZPUl9GSVJTVF9CQU5ORVIgPSAwOyAgICAgICAgIC8vIOmmluS4qmJhbm5lcuW5v+WRiuW7tui/n07np5LmmL7npLpcbmNvbnN0IEZCX0FEX0RFTEFZX0ZPUl9GSVJTVF9JTlRFUlNUSVRJQUwgPSAzMDsgIC8vIOmmluS4quaPkuWxj+W5v+WRiumcgOimgeW7tui/nzMw56eS5pKt5pS+77yI6YG/5YWN5ri45oiP5YmNMzDnp5LlsLHmkq3mlL7lub/lkYrvvIlcbmNvbnN0IEZCX0FEX0RFTEFZX0ZPUl9GSVJTVF9SRVdBUkRFRF9WSURFTyA9IDA7IC8vIOmmluS4qua/gOWKseinhumikeW5v+WRiuW7tui/n07np5LmmL7npLpcblxuZW51bSBGQl9BRF9UWVBFe1xuICAgIElOVEVSU1RJVElBTCA9IDAsXG4gICAgUkVXQVJERURfVklERU8gPSAxLFxuICAgIEJBTk5FUiA9IDJcbn1cblxuZW51bSBGQl9BRF9TVEFURXtcbiAgICBOT05FLFxuICAgIE5FVyxcbiAgICBMT0FESU5HLFxuICAgIExPQURFRCxcbiAgICBQTEFZSU5HXG59XG5cbmZ1bmN0aW9uIGdldFN0YXRlTmFtZShzdGF0ZTpGQl9BRF9TVEFURSl7XG4gICAgbGV0IHN0ciA9IFwiTk9ORVwiO1xuICAgIHN3aXRjaChzdGF0ZSl7XG4gICAgICAgIGNhc2UgRkJfQURfU1RBVEUuTkVXOlxuICAgICAgICAgICAgc3RyID0gXCJORVdcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEZCX0FEX1NUQVRFLkxPQURJTkc6XG4gICAgICAgICAgICBzdHIgPSBcIkxPQURJTkdcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEZCX0FEX1NUQVRFLkxPQURFRDpcbiAgICAgICAgICAgIHN0ciA9IFwiTE9BREVEXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBGQl9BRF9TVEFURS5QTEFZSU5HOlxuICAgICAgICAgICAgc3RyID0gXCJQTEFZSU5HXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3YWl0VGltZVNlY29uZCh0aW1lb3V0U2Vjb25kOm51bWJlciwgY2FsbGJhY2s/KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LCB0aW1lb3V0U2Vjb25kICogMTAwMCk7XG4gICAgfSk7XG59XG5cbmludGVyZmFjZSBGQl9FUlJPUntcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jb25zdCBFcnJvclRvb01hbnlBZEluc3RhbmNlOkZCX0VSUk9SID0ge1xuICAgIGNvZGU6IFwiRVhDRUVEX01BWF9BRF9JTlNUQU5DRVwiLFxuICAgIG1lc3NhZ2U6IFwi5bm/5ZGK5a+56LGh5LiN5YWB6K646LaF6L+HIFwiICsgRkJfTUFYX0FEX0lOU1RBTkNFXG59XG5cbmNvbnN0IEVycm9yTm9SZWFkeUFkSW5zdGFuY2U6RkJfRVJST1IgPSB7XG4gICAgY29kZTogXCJOT19SRUFEWV9BRF9JTlNUQU5DRVwiLFxuICAgIG1lc3NhZ2U6IFwi5rKh5pyJ5Yqg6L295a6M5q+V55qE5bm/5ZGK77yM5oiW6ICF5bm/5ZGK5pKt5pS+5aSq6aKR57mBXCJcbn1cblxuY29uc3QgRXJyb3JOb3RSZWFkeUZvckxvYWQ6RkJfRVJST1IgPSB7XG4gICAgY29kZTogXCJOT1RfUkVBRFlfRk9SX0xPQURcIixcbiAgICBtZXNzYWdlOiBcIuW9k+WJjeeKtuaAgeS4jeWFgeiuuOWGjeasoeWKoOi9vVwiXG59XG5cbmNvbnN0IEVycm9yQWRJc0xvYWRpbmc6RkJfRVJST1IgPSB7XG4gICAgY29kZTogXCJBRF9JU19MT0FESU5HXCIsXG4gICAgbWVzc2FnZTogXCLlub/lkYrmraPlnKjliqDovb1cIlxufVxuXG5jb25zdCBFcnJvck5vdFJlYWR5Rm9yUGxheTpGQl9FUlJPUiA9IHtcbiAgICBjb2RlOiBcIk5PVF9SRUFEWV9GT1JfUExBWUlOR1wiLFxuICAgIG1lc3NhZ2U6IFwi5rKh5pyJ5Y+v5Lul5pKt5pS+55qE5bm/5ZGKXCJcbn1cblxuY29uc3QgRXJyb3JBZElzUGxheWluZzpGQl9FUlJPUiA9IHtcbiAgICBjb2RlOiBcIkFEX0lTX1BMQVlJTkdcIixcbiAgICBtZXNzYWdlOiBcIuW5v+WRiuato+WcqOaSreaUvlwiXG59XG5cbmNvbnN0IEVycm9yTm9CYW5uZXJBZEluc3RhbmNlOkZCX0VSUk9SID0ge1xuICAgIGNvZGU6IFwiTk9fQkFOTkVSX0FEXCIsXG4gICAgbWVzc2FnZTogXCLmsqHmnInmt7vliqBCYW5uZXLlub/lkYpcIlxufVxuXG5jb25zdCBFcnJvckFwaU5vdFN1cHBvcnQ6RkJfRVJST1IgPSB7XG4gICAgY29kZTogXCJBUElfTk9UX1NVUFBPUlRcIixcbiAgICBtZXNzYWdlOiBcIuW5v+WRiuaOpeWPo+S4jeaUr+aMgVwiXG59XG5cbmNvbnN0IEVycm9yVG9vRmFzdFNob3c6RkJfRVJST1IgPSB7XG4gICAgY29kZTogXCJUT09fRkFTVF9TSE9XXCIsXG4gICAgbWVzc2FnZTogXCLlub/lkYrmkq3mlL7lpKrpopHnuYFcIlxufVxuXG5jb25zdCBFcnJvck5vdFBsYXlpbmc6RkJfRVJST1IgPSB7XG4gICAgY29kZTogXCJOT1RfUExBWUlOR1wiLFxuICAgIG1lc3NhZ2U6IFwi5bm/5ZGK5rKh5pyJ5pKt5pS+XCJcbn1cblxuY29uc3QgRXJyb3JUb29NYW55RXJyb3JzOkZCX0VSUk9SID0ge1xuICAgIGNvZGU6IFwiVE9PX01BTllfRVJST1JTXCIsXG4gICAgbWVzc2FnZTogXCLlpKrlpJrplJnor68sIOWBnOatouaTjeS9nFwiXG59XG5cbmNvbnN0IEZCX0FQSV9CQU5ORVIgPSBcImxvYWRCYW5uZXJBZEFzeW5jXCI7XG5cbmNvbnN0IEZCX0VSUk9SX0NPREVfUkFURV9MSU1JVEVEID0gXCJSQVRFX0xJTUlURURcIjtcbmNvbnN0IEZCX0VSUk9SX0NMSUVOVF9VTlNVUFBPUlRFRF9PUEVSQVRJT04gPSBcIkNMSUVOVF9VTlNVUFBPUlRFRF9PUEVSQVRJT05cIjtcbmNvbnN0IEZCX0VSUk9SX0FEU19OT19GSUxMID0gXCJBRFNfTk9fRklMTFwiO1xuXG4vLyBzdGF0ZSA6IE5PTkUgLT4gTkVXIC0+IExPQURJTkcgLT4gTE9BREVEIC0+IFNIT1dJTkcgLT4gKFNIT1dFRCkgTk9ORVxuXG5pbnRlcmZhY2UgRkJBZE9wdGlvbntcbiAgICBhdXRvTG9hZE9uUGxheTogYm9vbGVhbixcbiAgICBtYXhMb2FkRXJyb3I6IG51bWJlciwgICAgICAvLyDmnIDlpJrlpLHor6/lpJrlsJHmrKHlkI7kuI3lho3liqDovb0gICAgXG59XG5cbmludGVyZmFjZSBBZFRpbWVyT3B0aW9ue1xuICAgIHJlZnJlc2hJbnRlcnZhbDogbnVtYmVyLCAgIC8vIOaSreaUvumXtOmalFxuICAgIGRlbGF5Rm9yRmlyc3RBZDogbnVtYmVyLCAgIC8vIOesrOS4gOS4quW5v+WRiuW7tui/n07np5Lmkq3mlL7vvIjpgb/lhY3muLjmiI/liY0zMOenkuWwseaSreaUvuW5v+WRiu+8iVxufVxuXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0OkZCQWRPcHRpb24sIGtleTpzdHJpbmcsIGRlZmF1bHRWYWx1ZTphbnkpe1xuICAgIGlmKG9wdCAmJiB0eXBlb2Yob3B0W2tleV0pIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gb3B0W2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbn1cblxuLy8g5bm/5ZGK6K6h5pe25ZmoXG5jbGFzcyBBZFRpbWVye1xuICAgIHByb3RlY3RlZCBfbGFzdFNob3dUaW1lOm51bWJlciA9IDA7ICAgIC8vIOS4iuasoeaYvuekuuaXtumXtFxuICAgIHByb3RlY3RlZCBfcmVmcmVzaEludGVydmFsOm51bWJlciA9IDA7ICAgIC8vIOWIt+aWsOmXtOmalCwgPD0wIOihqOekuuaXoOmZkOWItlxuXG4gICAgY29uc3RydWN0b3IoaW50ZXJ2YWw6bnVtYmVyLCBkZWxheTpudW1iZXIpe1xuICAgICAgICB0aGlzLl9yZWZyZXNoSW50ZXJ2YWwgPSBpbnRlcnZhbD4wP2ludGVydmFsOjA7XG4gICAgICAgIHRoaXMuX2xhc3RTaG93VGltZSA9IDA7XG4gICAgICAgIGlmKGRlbGF5PjApe1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob3dUaW1lID0gRGF0ZS5ub3coKSArIGRlbGF5ICogMTAwMCAtIHRoaXMuX3JlZnJlc2hJbnRlcnZhbCAqIDEwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNSZWFkeVRvUmVmcmVzaCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROZXh0UmVmcmVzaEludGVydmFsKCkgPD0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TmV4dFJlZnJlc2hJbnRlcnZhbCgpe1xuICAgICAgICBsZXQgcmVmcmVzaEludGVydmFsID0gMDtcblxuICAgICAgICBpZih0aGlzLl9yZWZyZXNoSW50ZXJ2YWw+MCAmJiB0aGlzLl9sYXN0U2hvd1RpbWUgPiAwKXtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICByZWZyZXNoSW50ZXJ2YWwgPSB0aGlzLl9yZWZyZXNoSW50ZXJ2YWwgLSAoY3VycmVudFRpbWUgLSB0aGlzLl9sYXN0U2hvd1RpbWUpLzEwMDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmcmVzaEludGVydmFsO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVMYXN0U2hvd1RpbWUoKXtcbiAgICAgICAgdGhpcy5fbGFzdFNob3dUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG59XG5cbmNsYXNzIEZCQWRVbml0QmFzZXtcbiAgICBwcm90ZWN0ZWQgX3N0YXRlOkZCX0FEX1NUQVRFO1xuICAgIHByb3RlY3RlZCBfYWRJZDpzdHJpbmc7XG4gICAgcHJvdGVjdGVkIF90eXBlOkZCX0FEX1RZUEU7XG5cbiAgICAvLyBwcm90ZWN0ZWQgX2xhc3RTaG93VGltZTpudW1iZXIgPSAwOyAgICAvLyDkuIrmrKHmmL7npLrml7bpl7RcbiAgICAvLyBwcm90ZWN0ZWQgX3JlZnJlc2hJbnRlcnZhbDpudW1iZXIgPSAwOyAgICAvLyDliLfmlrDpl7TpmpQsIDw9MCDooajnpLrml6DpmZDliLZcblxuICAgIHByb3RlY3RlZCBfbWF4TG9hZEVycm9yOm51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIF9lcnJvckNvdW50ZXI6bnVtYmVyID0gMDtcbiAgICBwcm90ZWN0ZWQgX2ZhdGFsRXJyb3I6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIF9zaGFyZWRUaW1lcjpBZFRpbWVyID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGlkOnN0cmluZywgdHlwZTpGQl9BRF9UWVBFLCBzaGFyZWRUaW1lcjpBZFRpbWVyLCBvcHQ/OkZCQWRPcHRpb24pe1xuICAgICAgICB0aGlzLl9hZElkID0gaWQ7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gRkJfQURfU1RBVEUuTk9ORTtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX3NoYXJlZFRpbWVyID0gc2hhcmVkVGltZXI7XG5cbiAgICAgICAgdGhpcy5fZmF0YWxFcnJvciA9IGZhbHNlO1xuICAgICAgICB1dGlscy5zaG93TG9nKCEhc2hhcmVkVGltZXIsIFwic2hhcmVkVGltZXIgaXMgaW52YWxpZFwiLCBzaGFyZWRUaW1lcik7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLl9yZWZyZXNoSW50ZXJ2YWwgPSBnZXRPcHRpb24ob3B0LCBcInJlZnJlc2hJbnRlcnZhbFwiLCAwKTtcbiAgICAgICAgdGhpcy5fbWF4TG9hZEVycm9yID0gZ2V0T3B0aW9uKG9wdCwgXCJtYXhMb2FkRXJyb3JcIiwgMCk7XG5cbiAgICAgICAgLy8gY29uc3QgZGVsYXlGb3JGaXJzdEFkID0gZ2V0T3B0aW9uKG9wdCwgXCJkZWxheUZvckZpcnN0QWRcIiwgMCk7XG4gICAgICAgIC8vIGlmKGRlbGF5Rm9yRmlyc3RBZCA+IDApIHtcbiAgICAgICAgLy8gICAgIHRoaXMuX2xhc3RTaG93VGltZSA9IERhdGUubm93KCkgKyBkZWxheUZvckZpcnN0QWQgKiAxMDAwIC0gdGhpcy5fcmVmcmVzaEludGVydmFsICogMTAwMDtcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgICB0aGlzLl9sYXN0U2hvd1RpbWUgPSAwO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN0YXRlTmFtZSgpe1xuICAgICAgICByZXR1cm4gZ2V0U3RhdGVOYW1lKHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWRUeXBlTmFtZSgpe1xuICAgICAgICBpZih0aGlzLl90eXBlID09IEZCX0FEX1RZUEUuSU5URVJTVElUSUFMKXtcbiAgICAgICAgICAgIHJldHVybiBcIuaPkuWxj+W5v+WRilwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuX3R5cGUgPT0gRkJfQURfVFlQRS5SRVdBUkRFRF9WSURFTyl7XG4gICAgICAgICAgICByZXR1cm4gXCLmv4DlirHop4bpopHlub/lkYpcIjtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLl90eXBlID09IEZCX0FEX1RZUEUuQkFOTkVSKXtcbiAgICAgICAgICAgIHJldHVybiBcIkJhbm5lclwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiVU5LTk9XTlwiO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbmZvKCl7XG4gICAgICAgIHJldHVybiBgWyR7dGhpcy5nZXRBZFR5cGVOYW1lKCl9OiR7dGhpcy5fYWRJZH06JHt0aGlzLmdldFN0YXRlTmFtZSgpfV1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1JlYWR5VG9SZWZyZXNoKCl7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLmdldE5leHRSZWZyZXNoSW50ZXJ2YWwoKSA8PSAwO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkVGltZXIuaXNSZWFkeVRvUmVmcmVzaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROZXh0UmVmcmVzaEludGVydmFsKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRUaW1lci5nZXROZXh0UmVmcmVzaEludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUxhc3RTaG93VGltZSgpe1xuICAgICAgICB0aGlzLl9zaGFyZWRUaW1lci51cGRhdGVMYXN0U2hvd1RpbWUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5jcmVhc2VFcnJvckNvdW50ZXIoKXtcbiAgICAgICAgdGhpcy5fZXJyb3JDb3VudGVyKys7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0RXJyb3JDb3VudGVyKCl7XG4gICAgICAgIHRoaXMuX2Vycm9yQ291bnRlciA9IDA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZhdGFsRXJyb3IoKXtcbiAgICAgICAgdGhpcy5fZmF0YWxFcnJvciA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXJyb3JUb29NYW55KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYXRhbEVycm9yIHx8ICh0aGlzLl9tYXhMb2FkRXJyb3I+MCAmJiB0aGlzLl9lcnJvckNvdW50ZXIgPj0gdGhpcy5fbWF4TG9hZEVycm9yKTtcbiAgICB9XG59XG5cbi8vIOacieeKtuaAgeeahOW5v+WRiuWvueixoVxuYWJzdHJhY3QgY2xhc3MgRkJTdGF0ZWZ1bEFkVW5pdCBleHRlbmRzIEZCQWRVbml0QmFzZXtcbiAgICBwcml2YXRlIF9hZEluc3RhbmNlOkZCSW5zdGFudC5BZEluc3RhbmNlO1xuXG4gICAgcHJpdmF0ZSBfYXV0b0xvYWRPblBsYXk6Ym9vbGVhbjsgLy8g5pKt5pS+5a6M5q+V5ZCO5piv5ZCm56uL5Y2z6Ieq5Yqo5Yqg6L29XG4gICAgXG4gICAgY29uc3RydWN0b3IoaWQ6c3RyaW5nLCB0eXBlOm51bWJlciwgc2hhcmVkVGltZXI6QWRUaW1lciwgb3B0PzpGQkFkT3B0aW9uKXtcbiAgICAgICAgc3VwZXIoaWQsIHR5cGUsIHNoYXJlZFRpbWVyLCBvcHQpO1xuICAgICAgICB0aGlzLl9hZEluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXV0b0xvYWRPblBsYXkgPSBnZXRPcHRpb24ob3B0LCBcImF1dG9Mb2FkT25QbGF5XCIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlQWRJbnN0YW5jZUFzeW5jKGFkSWQ6c3RyaW5nKTpQcm9taXNlPEZCSW5zdGFudC5BZEluc3RhbmNlPjtcblxuICAgIC8vIOmihOWKoOi9veW5v+WRilxuICAgIHB1YmxpYyBhc3luYyBsb2FkQXN5bmMoKXtcbiAgICAgICAgLy8gWzFdIOiOt+WPliBBZEluc3RhbmNlXG4gICAgICAgIGlmKHRoaXMuX2FkSW5zdGFuY2UgPT0gbnVsbCl7XG4gICAgICAgICAgICBpZih0aGlzLl9zdGF0ZSA9PSBGQl9BRF9TVEFURS5OT05FKXtcbiAgICAgICAgICAgICAgICAvLyDlj6rog73liJvlu7rkuIDmrKFcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEZCX0FEX1NUQVRFLk5FVztcblxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5blub/lkYrlr7nosaE6IFwiICsgdGhpcy5nZXRJbmZvKCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYWRJbnN0YW5jZSA9IGF3YWl0IHRoaXMuY3JlYXRlQWRJbnN0YW5jZUFzeW5jKHRoaXMuX2FkSWQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8g5bey57uP5Zyo5Yib5bu65a+56LGh5LqGIO+8iG5ldy1pbmcpXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeeKtuaAgeacqua7oei2s+WKoOi9veadoeS7tiwg5q2j5Zyo6I635Y+W5bm/5ZGK5a+56LGhOiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8g5a+56LGh5bey57uP5Yib5bu65aW9XG4gICAgICAgICAgICAvLyDlj6/ku6Xov5vooYzpooTliqDovb1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFsyXSDmo4Dmn6XmmK/lkKbmu6HotrPpooTliqDovb3mnaHku7ZcbiAgICAgICAgaWYodGhpcy5fc3RhdGUgIT0gRkJfQURfU1RBVEUuTkVXKXtcbiAgICAgICAgICAgIC8vIOWPquaciSBORVcg54q25oCB5omN6IO96L+b6KGM5Yqg6L29XG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN54q25oCB5pyq5ruh6Laz5Yqg6L295p2h5Lu2OiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3N0YXRlID09IEZCX0FEX1NUQVRFLkxPQURJTkcpe1xuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlub/lkYrmraPlnKjliqDovb3kuK3vvIzkuI3opoHph43lpI3liqDovb1cIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvckFkSXNMb2FkaW5nO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3JOb3RSZWFkeUZvckxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmlzRXJyb3JUb29NYW55KCkpe1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWkquWkmumUmeivr++8jOWBnOatouWKoOi9vTogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICB0aHJvdyBFcnJvclRvb01hbnlFcnJvcnM7XG4gICAgICAgIH1cblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICAvLyBbM10g5Yqg6L295bm/5ZGKXG4gICAgICAgICAgICAvLyDorr7nva7kuLrliqDovb3kuK1cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gRkJfQURfU1RBVEUuTE9BRElORztcblxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+WKoOi9veW5v+WRijogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9hZEluc3RhbmNlLmxvYWRBc3luYygpO1xuXG4gICAgICAgICAgICAvLyBbNF0g5oiQ5Yqf5Yqg6L29XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEZCX0FEX1NUQVRFLkxPQURFRDtcbiAgICAgICAgICAgIHRoaXMucmVzZXRFcnJvckNvdW50ZXIoKTtcblxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW5v+WRiuWKoOi9veaIkOWKnzogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gWzVdIOWKoOi9veWksei0pVxuICAgICAgICAgICAgLy8g5byC5bi46IO95q2j5bi46L+b5YWlcHJvbWlzZeeahGNhdGNo5YiG5pSvXG5cbiAgICAgICAgICAgIC8vIOWKoOi9veWksei0pe+8jOS4jemcgOimgemHjee9riBhZEluc3RhbmNlXG4gICAgICAgICAgICAvLyB0aGlzLl9hZEluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgICAgIC8vIOeKtuaAgeWbnumAgOWIsOWKoOi9veWJjVxuXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm/5ZGK5Yqg6L295aSx6LSlOiBcIiArIHRoaXMuZ2V0SW5mbygpLCBlKTtcbiAgICAgICAgICAgIGlmKChlIGFzIEZCX0VSUk9SKS5jb2RlID09IEZCX0VSUk9SX0FEU19OT19GSUxMKXtcbiAgICAgICAgICAgICAgICAvLyDpgYfliLAgTk9UIEZJTEzplJnor6/vvIzlsLHkuI3og73lho3nu6fnu63liqDovb3kuoZcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm/5ZGK5peg5rOV5aGr5YWF77yM5LiN5YaN57un57ut6K+35rGCOiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZhdGFsRXJyb3IoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VFcnJvckNvdW50ZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEZCX0FEX1NUQVRFLk5FVztcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBbNl0g5Yqg6L295aSx6LSl77yM6Ieq5Yqo6YeN5paw5Yqg6L29XG4gICAgICAgICAgICAgICAgLy8g6YCC5b2T5bu26L+fXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5VGltZSA9IDEwICogdGhpcy5fZXJyb3JDb3VudGVyICsgRkJfQVVUT19SRUxPQURfREVMQVk7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW7tui/n1wiICsgZGVsYXlUaW1lICsgXCLnp5LlkI4sIOiHquWKqOmHjeaWsOWKoOi9vTogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICAgICAgd2FpdFRpbWVTZWNvbmQoZGVsYXlUaW1lLCB0aGlzLmxvYWRBc3luYy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g5bm/5ZGK5piv5ZCm5Yqg6L295a6M5q+VXG4gICAgcHVibGljIGlzUmVhZHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkSW5zdGFuY2UgIT0gbnVsbCAmJiB0aGlzLl9zdGF0ZSA9PSBGQl9BRF9TVEFURS5MT0FERUQ7XG4gICAgfVxuXG4gICAgLy8g5pKt5pS+5bm/5ZGKXG4gICAgcHVibGljIGFzeW5jIHNob3dBc3luYygpe1xuICAgICAgICAvLyBbMS4xXSDliKTmlq3mmK/lkKbmu6HotrPmkq3mlL7mnaHku7ZcbiAgICAgICAgaWYoIXRoaXMuaXNSZWFkeSgpKXtcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3nirbmgIHmnKrmu6HotrPmkq3mlL7mnaHku7Y6IFwiICsgdGhpcy5nZXRJbmZvKCkpO1xuICAgICAgICAgICAgaWYodGhpcy5fc3RhdGUgPT0gRkJfQURfU1RBVEUuUExBWUlORyl7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3JBZElzUGxheWluZztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yTm90UmVhZHlGb3JQbGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBbMS4yXSDmmK/lkKbmu6HotrPmkq3mlL7pl7TpmpRcbiAgICAgICAgaWYoIXRoaXMuaXNSZWFkeVRvUmVmcmVzaCgpKXtcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmkq3mlL7lpKrpopHnuYHvvIzov5jpnIDpl7TpmpRcIiArIHRoaXMuZ2V0TmV4dFJlZnJlc2hJbnRlcnZhbCgpICsgXCIg56eSOiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgIHRocm93IEVycm9yVG9vRmFzdFNob3c7XG4gICAgICAgIH1cblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICAvLyBbMl0g5pKt5pS+5bm/5ZGKXG4gICAgICAgICAgICAvLyDorr7nva7kuLrmkq3mlL7kuK1cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gRkJfQURfU1RBVEUuUExBWUlORztcblxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW8gOWni+aSreaUvuW5v+WRijogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9hZEluc3RhbmNlLnNob3dBc3luYygpO1xuXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pKt5pS+5bm/5ZGK5a6M5q+VOiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcblxuICAgICAgICAgICAgLy8gWzNdIOaSreaUvuWujOavleWQjumHjee9ruW5v+WRiuWvueixoVxuICAgICAgICAgICAgdGhpcy5fYWRJbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEZCX0FEX1NUQVRFLk5PTkU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxhc3RTaG93VGltZSgpO1xuXG4gICAgICAgICAgICAvLyBbNF0g5pKt5a6M6Ieq5Yqo5Yqg6L29XG4gICAgICAgICAgICBpZih0aGlzLl9hdXRvTG9hZE9uUGxheSl7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzog5bqU6K+l6YCC5b2T5bu26L+fXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW7tui/n1wiICsgRkJfQVVUT19SRUxPQURfREVMQVkgKyBcIuenkuWQjiwg6Ieq5Yqo6YeN5paw5Yqg6L29OiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgICAgICB3YWl0VGltZVNlY29uZChGQl9BVVRPX1JFTE9BRF9ERUxBWSwgdGhpcy5sb2FkQXN5bmMuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gWzVdIOaSreaUvuWujOavleWQjumHjee9ruW5v+WRiuWvueixoVxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaSreaUvuW5v+WRiuWksei0pTogXCIgKyB0aGlzLmdldEluZm8oKSwgZSk7XG4gICAgICAgICAgICBpZihlLmNvZGUgPT0gRkJfRVJST1JfQ09ERV9SQVRFX0xJTUlURUQpe1xuICAgICAgICAgICAgICAgIC8vIOaSreaUvuWkqumikee5ge+8jOWPr+W/veeVpVxuICAgICAgICAgICAgICAgIC8vIOeKtuaAgeWbnumAgFxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gRkJfQURfU1RBVEUuTE9BREVEO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRJbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBGQl9BRF9TVEFURS5OT05FO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFs2XSDlpLHotKXoh6rliqjph43mlrDliqDovb1cbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hdXRvTG9hZE9uUGxheSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlu7bov59cIiArIEZCX0FVVE9fUkVMT0FEX0RFTEFZICsgXCLnp5LlkI4sIOiHquWKqOmHjeaWsOWKoOi9vTogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICAgICAgICAgIHdhaXRUaW1lU2Vjb25kKEZCX0FVVE9fUkVMT0FEX0RFTEFZLCB0aGlzLmxvYWRBc3luYy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLy8g5o+S5bGP5bm/5ZGKXG5jbGFzcyBGQkludGVyc3RpdGlhbFVuaXQgZXh0ZW5kcyBGQlN0YXRlZnVsQWRVbml0e1xuICAgIGNvbnN0cnVjdG9yKGlkOnN0cmluZywgc2hhcmVkVGltZXI6QWRUaW1lciwgb3B0PzpGQkFkT3B0aW9uKXtcbiAgICAgICAgc3VwZXIoaWQsIEZCX0FEX1RZUEUuSU5URVJTVElUSUFMLCBzaGFyZWRUaW1lciwgb3B0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgY3JlYXRlQWRJbnN0YW5jZUFzeW5jKGFkSWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiBhd2FpdCBGQkluc3RhbnQuZ2V0SW50ZXJzdGl0aWFsQWRBc3luYyh0aGlzLl9hZElkKTtcbiAgICB9XG59XG5cbi8vIOa/gOWKseinhumikeW5v+WRilxuY2xhc3MgRkJSZXdhcmRlZFZpZGVvVW5pdCBleHRlbmRzIEZCU3RhdGVmdWxBZFVuaXR7XG4gICAgY29uc3RydWN0b3IoaWQ6c3RyaW5nLCBzaGFyZWRUaW1lcjpBZFRpbWVyLCBvcHQ/OkZCQWRPcHRpb24pe1xuICAgICAgICBzdXBlcihpZCwgRkJfQURfVFlQRS5SRVdBUkRFRF9WSURFTywgc2hhcmVkVGltZXIsIG9wdCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGNyZWF0ZUFkSW5zdGFuY2VBc3luYyhhZElkOiBzdHJpbmcpe1xuICAgICAgICByZXR1cm4gYXdhaXQgRkJJbnN0YW50LmdldFJld2FyZGVkVmlkZW9Bc3luYyh0aGlzLl9hZElkKTtcbiAgICB9XG59XG5cbi8vIOaoquW5heW5v+WRilxuY2xhc3MgRkJCYW5uZXJVbml0IGV4dGVuZHMgRkJBZFVuaXRCYXNle1xuICAgIGNvbnN0cnVjdG9yKGlkOnN0cmluZywgc2hhcmVkVGltZXI6QWRUaW1lcixvcHQ/OkZCQWRPcHRpb24pe1xuICAgICAgICBzdXBlcihpZCwgRkJfQURfVFlQRS5CQU5ORVIsIHNoYXJlZFRpbWVyLCBvcHQpO1xuICAgIH1cblxuICAgIC8vIOaYvuekukJhbm5lcuW5v+WRiiwg5rOo5oSP5Y+v5Lul6LCD55So5aSa5qyhXG4gICAgcHVibGljIGFzeW5jIHNob3dBc3luYygpe1xuICAgICAgICBpZighdGhpcy5pc1JlYWR5VG9SZWZyZXNoKCkpe1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaSreaUvuWkqumikee5ge+8jOi/mOmcgOmXtOmalFwiICsgdGhpcy5nZXROZXh0UmVmcmVzaEludGVydmFsKCkgKyBcIiDnp5I6IFwiICsgdGhpcy5nZXRJbmZvKCkpO1xuICAgICAgICAgICAgdGhyb3cgRXJyb3JUb29GYXN0U2hvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaXNFcnJvclRvb01hbnkoKSl7XG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5aSq5aSa6ZSZ6K+v77yM5YGc5q2i5Yqg6L29OiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgIHRocm93IEVycm9yVG9vTWFueUVycm9ycztcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gRkJfQURfU1RBVEUuUExBWUlORztcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvIDlp4vmmL7npLrlub/lkYo6IFwiICsgdGhpcy5nZXRJbmZvKCkpO1xuICAgICAgICAgICAgYXdhaXQgRkJJbnN0YW50LmxvYWRCYW5uZXJBZEFzeW5jKHRoaXMuX2FkSWQpO1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuaIkOWKnzogXCIgKyB0aGlzLmdldEluZm8oKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIOabtOaWsOWIt+aWsOaXtumXtFxuICAgICAgICAgICAgdGhpcy51cGRhdGVMYXN0U2hvd1RpbWUoKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRFcnJvckNvdW50ZXIoKTtcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuW5v+WRiuWksei0pTogXCIgKyB0aGlzLmdldEluZm8oKSwgZSk7XG4gICAgICAgICAgICBpZihlLmNvZGUgPT0gRkJfRVJST1JfQ09ERV9SQVRFX0xJTUlURUQpe1xuICAgICAgICAgICAgICAgIC8vIOaSreaUvuWkqumikee5ge+8jOWPr+W/veeVpVxuICAgICAgICAgICAgICAgIC8vIOS4jeeUqOmHjee9ru+8jOS/neeVmVxuICAgICAgICAgICAgfWVsc2UgaWYoZS5jb2RlID09IEZCX0VSUk9SX0FEU19OT19GSUxMKXtcbiAgICAgICAgICAgICAgICAvLyDpgYfliLAgTk9UIEZJTEzplJnor6/vvIzlsLHkuI3og73lho3nu6fnu63liqDovb3kuoZcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm/5ZGK5peg5rOV5aGr5YWF77yM5LiN5YaN57un57ut6K+35rGCOiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZhdGFsRXJyb3IoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VFcnJvckNvdW50ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBoaWRlQXN5bmMoKXtcbiAgICAgICAgaWYodGhpcy5fc3RhdGUgIT0gRkJfQURfU1RBVEUuUExBWUlORyl7XG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm/5ZGK5rKh5pyJ5Zyo5pKt5pS+5LitOiBcIiArIHRoaXMuZ2V0SW5mbygpKTtcbiAgICAgICAgICAgIHRocm93IEVycm9yTm90UGxheWluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpmpDol4/lub/lkYo6IFwiICsgdGhpcy5nZXRJbmZvKCkpO1xuICAgICAgICAgICAgLy8gVE9ETzog6YeN5aSN6ZqQ6JeP5bm/5ZGK5LiN5Lya5oql6ZSZXG4gICAgICAgICAgICBhd2FpdCBGQkluc3RhbnQuaGlkZUJhbm5lckFkQXN5bmMoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gRkJfQURfU1RBVEUuTk9ORTtcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumakOiXj+W5v+WRiuWksei0pTogXCIgKyB0aGlzLmdldEluZm8oKSwgZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIOmakOiXj+Wksei0peS4jeWBmuS7u+S9leaTjeS9nFxuICAgICAgICAgICAgLy8gdGhpcy5fc3RhdGUgPSBGQl9BRF9TVEFURS5OT05FO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRkJBZE1hbmFnZXJ7XG4gICAgcHVibGljIHN0YXRpYyBnZXRWZXJzaW9uKCl7XG4gICAgICAgIHJldHVybiBcIjEuMC4yXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2ludGVyc3RpdGlhbEFkczpBcnJheTxGQlN0YXRlZnVsQWRVbml0PiA9IFtdO1xuICAgIHByaXZhdGUgc3RhdGljIF9yZXdhcmRlZFZpZGVvczpBcnJheTxGQlN0YXRlZnVsQWRVbml0PiA9IFtdO1xuICAgIHByaXZhdGUgc3RhdGljIF9iYW5uZXJzOkFycmF5PEZCQmFubmVyVW5pdD4gPSBbXTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnRlcnN0aXRpYWxUaW1lcjpBZFRpbWVyID0gbnVsbDtcbiAgICBwcml2YXRlIHN0YXRpYyBfcmV3YXJkZWRWaWRlb1RpbWVyOkFkVGltZXIgPSBudWxsO1xuICAgIHByaXZhdGUgc3RhdGljIF9iYW5uZXJUaW1lcjpBZFRpbWVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgc3RhdGljIF9iYW5uZXJTdXBwb3J0ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8g5o+S5bGP5bm/5ZGK6buY6K6k5Y+C5pWwXG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0SW50ZXJzdGl0aWFsT3B0aW9uOkZCQWRPcHRpb24gPSB7XG4gICAgICAgIGF1dG9Mb2FkT25QbGF5OiBGQl9BVVRPX0xPQURfT05fUExBWSxcbiAgICAgICAgbWF4TG9hZEVycm9yOiBGQl9NQVhfSU5URVJTVElUSUFMX0VSUk9SLFxuICAgIH07XG5cbiAgICAvLyDmv4DlirHop4bpopHpu5jorqTlj4LmlbBcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRSZXdhcmRlZFZpZGVvT3B0aW9uOkZCQWRPcHRpb24gPSB7XG4gICAgICAgIGF1dG9Mb2FkT25QbGF5OiBGQl9BVVRPX0xPQURfT05fUExBWSxcbiAgICAgICAgbWF4TG9hZEVycm9yOiBGQl9NQVhfUkVXQVJERURfVklERU9fRVJST1IsXG4gICAgfTtcbiAgICBcbiAgICAvLyBiYW5uZXLpu5jorqTlj4LmlbBcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRCYW5uZXJPcHRpb246RkJBZE9wdGlvbiA9IHtcbiAgICAgICAgYXV0b0xvYWRPblBsYXk6IEZCX0FVVE9fTE9BRF9PTl9QTEFZLCAvLyBiYW5uZXLkuI3pnIDopoHov5nkuKrlj4LmlbBcbiAgICAgICAgbWF4TG9hZEVycm9yOiBGQl9NQVhfQkFOTkVSX0VSUk9SLFxuICAgIH07XG5cbiAgICAvLyDmj5LlsY/lub/lkYrorqHml7blmajpu5jorqTlj4LmlbBcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRJbnRlcnN0aXRpYWxUaW1lck9wdGlvbjpBZFRpbWVyT3B0aW9uID0ge1xuICAgICAgICByZWZyZXNoSW50ZXJ2YWw6IEZCX0lOVEVSU1RJVElBTF9SRUZSRVNIX0lOVEVSVkFMLFxuICAgICAgICBkZWxheUZvckZpcnN0QWQ6IEZCX0FEX0RFTEFZX0ZPUl9GSVJTVF9JTlRFUlNUSVRJQUxcbiAgICB9O1xuXG4gICAgLy8g5r+A5Yqx6KeG6aKR6K6h5pe25Zmo6buY6K6k5Y+C5pWwXG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UmV3YXJkZWRWaWRlb1RpbWVyT3B0aW9uOkFkVGltZXJPcHRpb24gPSB7XG4gICAgICAgIHJlZnJlc2hJbnRlcnZhbDogRkJfUkVXQVJERURfVklERU9fUkVGUkVTSF9JTlRFUlZBTCxcbiAgICAgICAgZGVsYXlGb3JGaXJzdEFkOiBGQl9BRF9ERUxBWV9GT1JfRklSU1RfUkVXQVJERURfVklERU9cbiAgICB9O1xuICAgIFxuICAgIC8vIGJhbm5lcuiuoeaXtuWZqOm7mOiupOWPguaVsFxuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdEJhbm5lclRpbWVyT3B0aW9uOkFkVGltZXJPcHRpb24gPSB7XG4gICAgICAgIHJlZnJlc2hJbnRlcnZhbDogRkJfQkFOTkVSX1JFRlJFU0hfSU5URVJWQUwsXG4gICAgICAgIGRlbGF5Rm9yRmlyc3RBZDogRkJfQURfREVMQVlfRk9SX0ZJUlNUX0JBTk5FUlxuICAgIH07XG5cbiAgICAvLyAxLjEg5re75Yqg5o+S5bGP5bm/5ZGKXG4gICAgLy8g6L+U5Zue5bey57uP5re75Yqg55qE5o+S5bGP5bm/5ZGK5oC75pWwXG4gICAgcHVibGljIHN0YXRpYyBhZGRJbnRlcnN0aXRpYWwoaWQ6c3RyaW5nLCBjb3VudDpudW1iZXI9RkJfSU5JVF9BRF9DT1VOVCl7XG4gICAgICAgIGlmKHRoaXMuX2ludGVyc3RpdGlhbFRpbWVyID09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsVGltZXIgPSBuZXcgQWRUaW1lcih0aGlzLmRlZmF1bHRJbnRlcnN0aXRpYWxUaW1lck9wdGlvbi5yZWZyZXNoSW50ZXJ2YWwsIHRoaXMuZGVmYXVsdEludGVyc3RpdGlhbFRpbWVyT3B0aW9uLmRlbGF5Rm9yRmlyc3RBZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGk9MDtpPGNvdW50O2krKyl7XG4gICAgICAgICAgICBpZih0aGlzLl9pbnRlcnN0aXRpYWxBZHMubGVuZ3RoID49IEZCX01BWF9BRF9JTlNUQU5DRSl7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua3u+WKoOaPkuWxj+W5v+WRiuWksei0pSwg6LaF5Ye66ZmQ5Yi2OiBcIiArIHRoaXMuX2ludGVyc3RpdGlhbEFkcy5sZW5ndGgsIGlkKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvclRvb01hbnlBZEluc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgbGV0IGFkVW5pdCA9IG5ldyBGQkludGVyc3RpdGlhbFVuaXQoaWQsIHRoaXMuX2ludGVyc3RpdGlhbFRpbWVyLCB0aGlzLmRlZmF1bHRJbnRlcnN0aXRpYWxPcHRpb24pO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQWRzLnB1c2goYWRVbml0KTtcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmt7vliqDmj5LlsY/lub/lkYo6IFwiICsgaWQsIFwiY291bnQ6IFwiICsgdGhpcy5faW50ZXJzdGl0aWFsQWRzLmxlbmd0aCk7ICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVyc3RpdGlhbEFkcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gMS4yLiDmt7vliqDmv4DlirHop4bpopHlub/lkYpcbiAgICAvLyDov5Tlm57lt7Lnu4/mt7vliqDnmoTmv4DlirHop4bpopHmgLvmlbBcbiAgICBwdWJsaWMgc3RhdGljIGFkZFJld2FyZGVkVmlkZW8oaWQ6c3RyaW5nLCBjb3VudDpudW1iZXI9RkJfSU5JVF9BRF9DT1VOVCl7XG4gICAgICAgIGlmKHRoaXMuX3Jld2FyZGVkVmlkZW9UaW1lciA9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuX3Jld2FyZGVkVmlkZW9UaW1lciA9IG5ldyBBZFRpbWVyKHRoaXMuZGVmYXVsdFJld2FyZGVkVmlkZW9UaW1lck9wdGlvbi5yZWZyZXNoSW50ZXJ2YWwsIHRoaXMuZGVmYXVsdFJld2FyZGVkVmlkZW9UaW1lck9wdGlvbi5kZWxheUZvckZpcnN0QWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpPTA7aTxjb3VudDtpKyspe1xuICAgICAgICAgICAgaWYodGhpcy5fcmV3YXJkZWRWaWRlb3MubGVuZ3RoID49IEZCX01BWF9BRF9JTlNUQU5DRSl7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua3u+WKoOa/gOWKseinhumikeW5v+WRiuWksei0pSwg6LaF5Ye66ZmQ5Yi2OiBcIiArIHRoaXMuX3Jld2FyZGVkVmlkZW9zLmxlbmd0aCwgaWQpO1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yVG9vTWFueUFkSW5zdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhZFVuaXQgPSBuZXcgRkJSZXdhcmRlZFZpZGVvVW5pdChpZCwgdGhpcy5fcmV3YXJkZWRWaWRlb1RpbWVyLCB0aGlzLmRlZmF1bHRSZXdhcmRlZFZpZGVvT3B0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jld2FyZGVkVmlkZW9zLnB1c2goYWRVbml0KTtcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmt7vliqDmv4DlirHop4bpopHlub/lkYo6IFwiICsgaWQsIFwiY291bnQ6IFwiICsgdGhpcy5fcmV3YXJkZWRWaWRlb3MubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXdhcmRlZFZpZGVvcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gMS4zLiDmt7vliqBCYW5uZXLlub/lkYpcbiAgICBwdWJsaWMgc3RhdGljIGFkZEJhbm5lcihpZDpzdHJpbmcpe1xuICAgICAgICBpZih0aGlzLl9iYW5uZXJUaW1lciA9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lclRpbWVyID0gbmV3IEFkVGltZXIodGhpcy5kZWZhdWx0QmFubmVyVGltZXJPcHRpb24ucmVmcmVzaEludGVydmFsLCB0aGlzLmRlZmF1bHRCYW5uZXJUaW1lck9wdGlvbi5kZWxheUZvckZpcnN0QWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFkVW5pdCA9IG5ldyBGQkJhbm5lclVuaXQoaWQsIHRoaXMuX2Jhbm5lclRpbWVyLCB0aGlzLmRlZmF1bHRCYW5uZXJPcHRpb24pO1xuICAgICAgICB0aGlzLl9iYW5uZXJzLnB1c2goYWRVbml0KTtcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIua3u+WKoEJhbm5lcuW5v+WRijogXCIgKyBpZCwgXCJjb3VudDogXCIgKyB0aGlzLl9iYW5uZXJzLmxlbmd0aCk7XG5cbiAgICAgICAgcmV0dXJuIGFkVW5pdDtcbiAgICB9XG5cbiAgICAvLyAyLiDliJ3lp4vljJblkozpooTliqDovb1cbiAgICAvLyBEZXByZWNhdGVkIOatpOaWueazleeUqOS6juS/neaMgeWFvOWuuSwg5bu66K6u5L2/55SoIGxvYWRBbGxBc3luY1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZEFsbCgpe1xuICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yid5aeL5YyW5bm/5ZGK6Zif5YiXXCIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2FkQWxsQXN5bmMoKTtcbiAgICB9XG5cbiAgICAvLyDlvILmraXpobrluo/pooTliqDovb3miYDmnInlub/lkYpcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWRBbGxBc3luYygpe1xuICAgICAgICB1dGlscy5zaG93TG9nKFwiRkJBZE1hbmFnZXIgVmVyc2lvbjogXCIgKyB0aGlzLmdldFZlcnNpb24oKSk7XG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJblub/lkYrpmJ/liJdcIik7XG4gICAgICAgIC8vIOS4pOasoeWKoOi9vemXtOmXtOmalE7np5JcbiAgICAgICAgLy8g5YWI5Yqg6L295r+A5Yqx6KeG6aKRXG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5fcmV3YXJkZWRWaWRlb3MubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBjb25zdCBhZFVuaXQgPSB0aGlzLl9yZXdhcmRlZFZpZGVvc1tpXTtcblxuICAgICAgICAgICAgaWYoaT4wKXtcbiAgICAgICAgICAgICAgICBhd2FpdCB3YWl0VGltZVNlY29uZCgwLjEpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgXG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgYXdhaXQgYWRVbml0LmxvYWRBc3luYygpO1xuICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOS5i+WQjuWKoOi9veaPkuWxj1xuICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuX2ludGVyc3RpdGlhbEFkcy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGNvbnN0IGFkVW5pdCA9IHRoaXMuX2ludGVyc3RpdGlhbEFkc1tpXTtcbiAgICAgICAgICAgIGlmKGk+MCl7XG4gICAgICAgICAgICAgICAgYXdhaXQgd2FpdFRpbWVTZWNvbmQoMC4xKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGF3YWl0IGFkVW5pdC5sb2FkQXN5bmMoKTtcbiAgICAgICAgICAgIH1jYXRjaChlKXtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2lzQWRSZWFkeSh0eXBlOiBGQl9BRF9UWVBFKXtcbiAgICAgICAgbGV0IGFkVW5pdHMgPSAodHlwZSA9PSBGQl9BRF9UWVBFLklOVEVSU1RJVElBTCk/dGhpcy5faW50ZXJzdGl0aWFsQWRzOnRoaXMuX3Jld2FyZGVkVmlkZW9zO1xuICAgICAgICBsZXQgaXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICBmb3IobGV0IGk9MDtpPGFkVW5pdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBjb25zdCBhZFVuaXQgPSBhZFVuaXRzW2ldO1xuICAgICAgICAgICAgaWYoYWRVbml0LmlzUmVhZHkoKSAmJiBhZFVuaXQuaXNSZWFkeVRvUmVmcmVzaCgpKXtcbiAgICAgICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc1JlYWR5O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIF9zaG93QXN5bmModHlwZTogRkJfQURfVFlQRSl7XG4gICAgICAgIGxldCBhZFVuaXRzID0gKHR5cGUgPT0gRkJfQURfVFlQRS5JTlRFUlNUSVRJQUwpP3RoaXMuX2ludGVyc3RpdGlhbEFkczp0aGlzLl9yZXdhcmRlZFZpZGVvcztcbiAgICAgICAgbGV0IHJlYWR5VW5pdDpGQlN0YXRlZnVsQWRVbml0ID0gbnVsbDtcblxuICAgICAgICBmb3IobGV0IGk9MDtpPGFkVW5pdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBjb25zdCBhZFVuaXQgPSBhZFVuaXRzW2ldO1xuICAgICAgICAgICAgaWYoYWRVbml0LmlzUmVhZHkoKSAmJiBhZFVuaXQuaXNSZWFkeVRvUmVmcmVzaCgpKXtcbiAgICAgICAgICAgICAgICByZWFkeVVuaXQgPSBhZFVuaXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZWFkeVVuaXQgIT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm4gcmVhZHlVbml0LnNob3dBc3luYygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgRXJyb3JOb1JlYWR5QWRJbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfZ2V0QWRUaW1lcih0eXBlOiBGQl9BRF9UWVBFKXtcbiAgICAgICAgaWYodHlwZSA9PSBGQl9BRF9UWVBFLklOVEVSU1RJVElBTCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJzdGl0aWFsVGltZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZSA9PSBGQl9BRF9UWVBFLlJFV0FSREVEX1ZJREVPKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXdhcmRlZFZpZGVvVGltZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhbm5lclRpbWVyO1xuICAgIH1cblxuICAgIC8vIDMuMS4g5Yik5pat5piv5ZCm5Y+v5Lul5pKt5pS+5o+S5bGP5bm/5ZGKXG4gICAgcHVibGljIHN0YXRpYyBpc0ludGVyc3RpdGlhbEFkUmVhZHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWRSZWFkeShGQl9BRF9UWVBFLklOVEVSU1RJVElBTCk7XG4gICAgfVxuXG4gICAgLy8gNC4xLiDmkq3mlL7mj5LlsY/lub/lkYpcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHNob3dJbnRlcnN0aXRpYWxBZCgpe1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fc2hvd0FzeW5jKEZCX0FEX1RZUEUuSU5URVJTVElUSUFMKTtcbiAgICB9XG5cbiAgICAvLyAzLjIuIOWIpOaWreaYr+WQpuWPr+S7peaSreaUvua/gOWKseinhumikeW5v+WRilxuICAgIHB1YmxpYyBzdGF0aWMgaXNSZXdhcmRlZFZpZGVvUmVhZHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWRSZWFkeShGQl9BRF9UWVBFLlJFV0FSREVEX1ZJREVPKTtcbiAgICB9XG5cbiAgICAvLyA0LjIuIOaSreaUvua/gOWKseinhumikeW5v+WRilxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgc2hvd1Jld2FyZGVkVmlkZW8oKXtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3Nob3dBc3luYyhGQl9BRF9UWVBFLlJFV0FSREVEX1ZJREVPKTtcbiAgICB9XG5cbiAgICAvLyA2LiDmo4Dmn6XmmK/lkKbmlK/mjIHlr7nlupRBUElcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrQXBpU3VwcG9ydChhcGk6c3RyaW5nKXtcbiAgICAgICAgaWYoRkJJbnN0YW50LmdldFN1cHBvcnRlZEFQSXMoKS5pbmRleE9mKGFwaSkgPj0gMCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gNi4xLiDmmK/lkKbmlK/mjIFiYW5uZXJcbiAgICBwdWJsaWMgc3RhdGljIGlzQmFubmVyU3VwcG9ydCgpe1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5fYmFubmVyU3VwcG9ydCA9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lclN1cHBvcnQgPSB0aGlzLmNoZWNrQXBpU3VwcG9ydChGQl9BUElfQkFOTkVSKTsgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9iYW5uZXJTdXBwb3J0O1xuICAgIH1cblxuICAgIC8vIDMuMy4gYmFubmVy5bm/5ZGK5piv5ZCm5Y+v5Lul5Yi35paw5oiW6ICF6YeN5paw5Yqg6L29XG4gICAgcHVibGljIHN0YXRpYyBpc0Jhbm5lclJlYWR5KCl7XG4gICAgICAgIGlmKHRoaXMuX2Jhbm5lcnMubGVuZ3RoIDw9IDApe1xuICAgICAgICAgICAgdGhyb3cgRXJyb3JOb0Jhbm5lckFkSW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWRVbml0ID0gdGhpcy5fYmFubmVyc1swXTtcbiAgICAgICAgcmV0dXJuIGFkVW5pdC5pc1JlYWR5VG9SZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gNC4zLiDmkq3mlL7pu5jorqRiYW5uZXLlub/lkYpcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHNob3dCYW5uZXJBc3luYygpe1xuICAgICAgICBpZighdGhpcy5pc0Jhbm5lclN1cHBvcnQoKSl7XG4gICAgICAgICAgICB0aHJvdyBFcnJvckFwaU5vdFN1cHBvcnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9iYW5uZXJzLmxlbmd0aCA8PSAwKXtcbiAgICAgICAgICAgIHRocm93IEVycm9yTm9CYW5uZXJBZEluc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFkVW5pdCA9IHRoaXMuX2Jhbm5lcnNbMF07XG4gICAgICAgIHJldHVybiBhd2FpdCBhZFVuaXQuc2hvd0FzeW5jKCk7XG4gICAgfVxuXG4gICAgLy8gNS4zLiDpmpDol4/pu5jorqRiYW5uZXLlub/lkYpcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGhpZGVCYW5uZXJBc3luYygpe1xuICAgICAgICBpZighdGhpcy5pc0Jhbm5lclN1cHBvcnQoKSl7XG4gICAgICAgICAgICB0aHJvdyBFcnJvckFwaU5vdFN1cHBvcnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9iYW5uZXJzLmxlbmd0aCA8PSAwKXtcbiAgICAgICAgICAgIHRocm93IEVycm9yTm9CYW5uZXJBZEluc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFkVW5pdCA9IHRoaXMuX2Jhbm5lcnNbMF07XG4gICAgICAgIHJldHVybiBhd2FpdCBhZFVuaXQuaGlkZUFzeW5jKCk7XG4gICAgfVxufSJdfQ==