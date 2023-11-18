
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/PlatUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUGxhdFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7SUFnUUEsQ0FBQztrQkFoUW9CLFNBQVM7SUFLMUIsc0JBQWtCLDRCQUFlO1FBSGpDOztXQUVHO2FBQ0g7WUFDSSxrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBRUQsc0JBQWtCLHdCQUFXO2FBQTdCO1lBQ0ksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBS0Qsc0JBQWtCLGlCQUFJO1FBSHRCOztXQUVHO2FBQ0g7WUFDSSxZQUFZO1lBQ1osT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBSUQsc0JBQWtCLG9CQUFPO1FBSHpCOztXQUVHO2FBQ0g7WUFDSSxZQUFZO1lBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RILENBQUM7OztPQUFBO0lBSUQsc0JBQWtCLHNCQUFTO1FBSDNCOztXQUVHO2FBQ0g7WUFDSSxPQUFPLEVBQUUsQ0FBQyxH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Q2pCLENBQUM7OztPQUFBO0lBS0Qsc0JBQWtCLDRCQUFlO1FBSGpDOztXQUVHO2FBQ0g7WUFDSSxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksUUFBUSxFQUFFO2dCQUNqQyxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFLRCxzQkFBa0IsNEJBQWU7UUFIakM7O1dBRUc7YUFDSDtZQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQUtELHNCQUFrQix3QkFBVztRQUg3Qjs7V0FFRzthQUNIO1lBQ0ksWUFBWTtZQUNaLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBOztJQTVQZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWdRN0I7SUFBRCxnQkFBQztDQWhRRCxBQWdRQyxJQUFBO2tCQWhRb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF0VXRpbHMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5a6J5Y2T5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzTmF0aXZlQW5kcm9pZCgpIHtcclxuICAgICAgICAvLyBqc2IgYW5kIGFuZHJvaWRcclxuICAgICAgICByZXR1cm4gKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCAmJiBDQ19KU0IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzTmF0aXZlSU9TKCkge1xyXG4gICAgICAgIHJldHVybiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MgJiYgQ0NfSlNCKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVj5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElTVUMoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy51YztcclxuICAgIH1cclxuICAgIC8qKnNcclxuICAgICAqIGNvY29z5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElTQ29jb3MoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuICh3aW5kb3cubG9hZFJ1bnRpbWUgJiYgIXRoaXMuSXNPUFBPICYmICF0aGlzLklzVklWTyAmJiAhd2luZG93Lmt3YWlnYW1lICYmICF0aGlzLklzV2lGaSAmJiAhdGhpcy5Jc0h1YVdlaSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWuieWNk+ezu+e7n1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc0FuZHJvaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElPU+ezu+e7n1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc0lPUygpIHtcclxuICAgICAgICByZXR1cm4gY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvq7kv6HlubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNXZWNoYXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUgJiYgIXRoaXMuSXNEb3V5aW4gJiYgIXRoaXMuSXNRUSAmJiAhdGhpcy5Jc0t3YWk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPUFBP5b+r5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzT1BQTygpIHtcclxuICAgICAgICByZXR1cm4gY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5PUFBPX0dBTUU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnmb7luqblsI/muLjmiI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNCYWlkdSgpIHtcclxuICAgICAgICAvLyByZXR1cm4gY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEICYmIGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQkFJRFVfR0FNRTtcclxuICAgICAgICBjYy5zeXMuRkJfUExBWUFCTEVfQURTXHJcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQkFJRFVfR0FNRTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZJVk/lsI/muLjmiI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNWSVZPKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlZJVk9fR0FNRTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaKlumfs+Wwj+a4uOaIj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc0RvdXlpbigpIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmV0dFxyXG4gICAgICAgIHJldHVybiB3aW5kb3cudHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBRUeWwj+a4uOaIj1xyXG4gICAgICogQHJldHVybnMg5piv5ZCmUVHlubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNRUSgpOiBib29sZWFuIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gd2luZG93LnFxO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDotqPlpLTmnaFcclxuICAgICAqIEByZXR1cm5zIOaYr+WQpui2o+WktOadoeW5s+WPsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc1FUVCgpOiBib29sZWFuIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gd2luZG93LnF0dEdhbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsI/nsbNcclxuICAgICAqIEByZXR1cm5zIOaYr+WQpuWwj+exs+W5s+WPsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc1hpYW9NaSgpOiBib29sZWFuIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBpZiAoIVBsYXRVdGlscy5Jc09QUE8gJiYgIVBsYXRVdGlscy5Jc1ZJVk8gJiYgIVBsYXRVdGlscy5Jc0h1YVdlaSAmJiB3aW5kb3cucWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiBoNS00Mzk5XHJcbiAgICogQHJldHVybnMg5piv5ZCmNDM5OS1oNeW5s+WPsFxyXG4gICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXM0Mzk5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB3aW5kb3cuaDVhcGk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKZiaWxp5bmz5Y+wXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKZiaWxp5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzQmlsaSgpOiBib29sZWFuIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gd2luZG93LmJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5b+r5omL5bmz5Y+wXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKblv6vmiYvlubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNLd2FpKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgS1NHYW1lR2xvYmFsICE9ICd1bmRlZmluZWQnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog5piv5ZCm6L+e5bCa5bmz5Y+wXHJcbiAgICAqIEByZXR1cm5zIOaYr+WQpui/nuWwmuW5s+WPsFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzV2lGaSgpOiBib29sZWFuIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gd2luZG93Lnd1amk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaYr+WQpkhhZ2/lubPlj7BcclxuICAgICogQHJldHVybnMg5piv5ZCmSGFnb+W5s+WPsFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzSGFnbygpOiBib29sZWFuIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gd2luZG93LmhnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Y2O5Li65bmz5Y+wXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbljY7kuLrlubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNIdWFXZWkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5oYnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKbmtYvor5XlubPlj7BcclxuICAgICogQHJldHVybnMg5piv5ZCm5rWL6K+V5bmz5Y+wXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNUZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5piv5ZCmZmFjZWJvb2vlsI/muLjmiI9cclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc0ZhY2VCb29rKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB3aW5kb3cuRkIgIT09IHVuZGVmaW5lZCB8fCB3aW5kb3cubWluaWdhbWVfc2RrICE9PSB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDojrflj5blronljZPlvZPliY3nmoTmuKDpgZPlj7dcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGFuZHJvaWRDaGFubmVsKCkge1xyXG4gICAgICAgIGlmICh1dGlscy5jb25maWcgJiYgdXRpbHMuY29uZmlnLm5hdGl2ZUFuZHJvaWRDb25maWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWxzLmNvbmZpZy5uYXRpdmVBbmRyb2lkQ29uZmlnLmNoYW5uZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKblronljZPkvKDpn7PlubPlj7BcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJc0FuZHJvaWRDaHVhbllpbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hhbm5lbCA9PSBcImNodWFueWluXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWuieWNk09QUE/lubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNBbmRyb2lkT3BwbygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hhbm5lbCA9PSBcIm9wcG9cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKblronljZNWSVZP5bmz5Y+wXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNBbmRyb2lkVml2bygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hhbm5lbCA9PSBcInZpdm9cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5a6J5Y2T5oqW6Z+z5bmz5Y+wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzQW5kcm9pZERvdVlpbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hhbm5lbCA9PSBcImRvdXlpblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblronljZPljY7kuLrlubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNBbmRyb2lkSHVhV2VpKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmFuZHJvaWRDaGFubmVsLmluZGV4T2YoXCJodWF3ZWlcIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm6LC35q2MV2Vi5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElzR29vZ2xlV2ViKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmICh3aW5kb3cuZ29vZ2xlQXBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHNoIGV4cG9ydF9rd2FpLnNoIC16IC9Wb2x1bWVzL0QvY29jb3NfcHJvamVjdC9jb21tb24tcHJvamVjdC8xLjEuMi9Db21tb25Qcm9qZWN0LTIuMC45L2J1aWxkL2NvY29zLXJ1bnRpbWUgLXYgMS4wLjAgLWwgZmFsc2UgLWYgZGVmYXVsdFxyXG59XHJcbiJdfQ==