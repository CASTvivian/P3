"use strict";
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