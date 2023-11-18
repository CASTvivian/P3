"use strict";
cc._RF.push(module, '78cbbcjXnpBU6Z8VJIEcJdY', 'YZ_LocalStorage');
// common-plugin/Scripts/YZ_LocalStorage.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_LocalStorage = /** @class */ (function () {
    function YZ_LocalStorage() {
    }
    /**
     * 获取本地缓存数据
     * @param key
     * @param defaultValue 默认值
     * @returns
     */
    YZ_LocalStorage.getItem = function (key, defaultValue) {
        var value = cc.sys.localStorage.getItem(key);
        if (value) {
            return value;
        }
        if (defaultValue)
            return defaultValue;
        return null;
    };
    /**
     * 保存本地缓存
     * @param key
     * @param value
     */
    YZ_LocalStorage.setItem = function (key, value) {
        cc.sys.localStorage.setItem(key, value);
    };
    YZ_LocalStorage.clearItems = function () {
        cc.sys.localStorage.clear();
    };
    YZ_LocalStorage = __decorate([
        ccclass
    ], YZ_LocalStorage);
    return YZ_LocalStorage;
}());
exports.default = YZ_LocalStorage;

cc._RF.pop();