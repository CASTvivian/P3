
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_LocalStorage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBQTtJQStCQSxDQUFDO0lBN0JHOzs7OztPQUtHO0lBQ1csdUJBQU8sR0FBckIsVUFBc0IsR0FBVyxFQUFFLFlBQXFCO1FBQ3BELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxZQUFZO1lBQUUsT0FBTyxZQUFZLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdEOzs7O09BSUc7SUFDVyx1QkFBTyxHQUFyQixVQUFzQixHQUFXLEVBQUUsS0FBVTtRQUN6QyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFYSwwQkFBVSxHQUF4QjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUE3QmdCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0ErQm5DO0lBQUQsc0JBQUM7Q0EvQkQsQUErQkMsSUFBQTtrQkEvQm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfTG9jYWxTdG9yYWdlIHtcblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacrOWcsOe8k+WtmOaVsOaNrlxuICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSDpu5jorqTlgLxcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW0oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOS/neWtmOacrOWcsOe8k+WtmFxuICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICogQHBhcmFtIHZhbHVlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjbGVhckl0ZW1zKCl7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbn0iXX0=