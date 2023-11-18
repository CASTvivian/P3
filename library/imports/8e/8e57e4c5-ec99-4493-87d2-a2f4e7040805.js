"use strict";
cc._RF.push(module, '8e57eTF7JlEk4fSovTnBAgF', 'PlatUtils');
// common-plugin/Scripts/PlatUtils.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlatUtils = /** @class */ (function () {
    function PlatUtils() {
    }
    PlatUtils_1 = PlatUtils;
    Object.defineProperty(PlatUtils, "IsNativeAndroid", {
        /**
         * 原生安卓平台
         */
        get: function () {
            // jsb and android
            return (cc.sys.os == cc.sys.OS_ANDROID && CC_JSB);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsNativeIOS", {
        get: function () {
            return (cc.sys.os == cc.sys.OS_IOS && CC_JSB);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "ISUC", {
        /**
         * uc平台
         */
        get: function () {
            //@ts-ignore
            return window.uc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "ISCocos", {
        /**s
         * cocos平台
         */
        get: function () {
            //@ts-ignore
            return (window.loadRuntime && !this.IsOPPO && !this.IsVIVO && !window.kwaigame && !this.IsWiFi && !this.IsHuaWei);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsAndroid", {
        /**
         * 安卓系统
         */
        get: function () {
            return cc.sys.os == cc.sys.OS_ANDROID;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsIOS", {
        /**
         * IOS系统
         */
        get: function () {
            return cc.sys.os == cc.sys.OS_IOS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsWechat", {
        /**
         * 微信平台
         */
        get: function () {
            return cc.sys.platform == cc.sys.WECHAT_GAME && !this.IsDouyin && !this.IsQQ && !this.IsKwai;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsOPPO", {
        /**
         * OPPO快游戏
         */
        get: function () {
            return cc.sys.platform == cc.sys.OPPO_GAME;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsBaidu", {
        /**
         * 百度小游戏
         */
        get: function () {
            // return cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform == cc.sys.BAIDU_GAME;
            cc.sys.FB_PLAYABLE_ADS;
            return cc.sys.platform == cc.sys.BAIDU_GAME;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsVIVO", {
        /**
         * VIVO小游戏
         */
        get: function () {
            return cc.sys.platform == cc.sys.VIVO_GAME;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsDouyin", {
        /**
         * 抖音小游戏
         */
        get: function () {
            //@ts-ignorett
            return window.tt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsQQ", {
        /**
         * QQ小游戏
         * @returns 是否QQ平台
         */
        get: function () {
            //@ts-ignore
            return window.qq;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsQTT", {
        /**
         * 趣头条
         * @returns 是否趣头条平台
         */
        get: function () {
            //@ts-ignore
            return window.qttGame;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsXiaoMi", {
        /**
         * 小米
         * @returns 是否小米平台
         */
        get: function () {
            //@ts-ignore
            if (!PlatUtils_1.IsOPPO && !PlatUtils_1.IsVIVO && !PlatUtils_1.IsHuaWei && window.qg) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "Is4399", {
        /**
       * h5-4399
       * @returns 是否4399-h5平台
       */
        get: function () {
            //@ts-ignore
            return window.h5api;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsBili", {
        /**
         * 是否bili平台
         * @returns 是否bili平台
         */
        get: function () {
            //@ts-ignore
            return window.bl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsKwai", {
        /**
         * 是否快手平台
         * @returns 是否快手平台
         */
        get: function () {
            //@ts-ignore
            return typeof KSGameGlobal != 'undefined';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsWiFi", {
        /**
        * 是否连尚平台
        * @returns 是否连尚平台
        */
        get: function () {
            //@ts-ignore
            return window.wuji;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsHago", {
        /**
        * 是否Hago平台
        * @returns 是否Hago平台
        */
        get: function () {
            //@ts-ignore
            return window.hg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsHuaWei", {
        /**
         * 是否华为平台
         * @returns 是否华为平台
         */
        get: function () {
            //@ts-ignore
            return window.hbs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsTest", {
        /**
        * 是否测试平台
        * @returns 是否测试平台
        */
        get: function () {
            //@ts-ignore
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsFaceBook", {
        /**
        * 是否facebook小游戏
        */
        get: function () {
            //@ts-ignore
            return window.FB !== undefined || window.minigame_sdk !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "androidChannel", {
        /**
          * 获取安卓当前的渠道号
          */
        get: function () {
            if (Utils_1.utils.config && Utils_1.utils.config.nativeAndroidConfig) {
                return Utils_1.utils.config.nativeAndroidConfig.channel;
            }
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsAndroidChuanYin", {
        /**
        * 是否安卓传音平台
        */
        get: function () {
            if (this.androidChannel == "chuanyin") {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsAndroidOppo", {
        /**
         * 是否安卓OPPO平台
         */
        get: function () {
            if (this.androidChannel == "oppo") {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsAndroidVivo", {
        /**
        * 是否安卓VIVO平台
        */
        get: function () {
            if (this.androidChannel == "vivo") {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsAndroidDouYin", {
        /**
         * 是否安卓抖音平台
         */
        get: function () {
            if (this.androidChannel == "douyin") {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsAndroidHuaWei", {
        /**
         * 是否安卓华为平台
         */
        get: function () {
            if (this.androidChannel.indexOf("huawei") > -1) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatUtils, "IsGoogleWeb", {
        /**
         * 是否谷歌Web游戏
         */
        get: function () {
            //@ts-ignore
            if (window.googleApi) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    var PlatUtils_1;
    PlatUtils = PlatUtils_1 = __decorate([
        ccclass
    ], PlatUtils);
    return PlatUtils;
}());
exports.default = PlatUtils;

cc._RF.pop();