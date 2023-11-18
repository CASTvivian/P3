
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_EventManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '39336BNY/5OsrydQVP6dfn3', 'YZ_EventManager');
// common-plugin/Scripts/YZ_EventManager.ts

"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_EventManager = /** @class */ (function (_super) {
    __extends(YZ_EventManager, _super);
    function YZ_EventManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YZ_EventManager.registerEvent = function (name, handler, target) {
        cc.game.on(name, handler, target);
    };
    YZ_EventManager.unregisterEvent = function (target) {
        cc.game.targetOff(target);
    };
    YZ_EventManager.emitCommonEvent = function (args) {
        cc.game.emit(YZ_Constant_1.default.YZ_EventCommon, args);
    };
    YZ_EventManager = __decorate([
        ccclass
    ], YZ_EventManager);
    return YZ_EventManager;
}(cc.Component));
exports.default = YZ_EventManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfRXZlbnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUVsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDs7SUFhQSxDQUFDO0lBWGlCLDZCQUFhLEdBQTNCLFVBQTRCLElBQVksRUFBRyxPQUFZLEVBQUUsTUFBWTtRQUNqRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFYSwrQkFBZSxHQUE3QixVQUE4QixNQUFVO1FBQ3BDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFYSwrQkFBZSxHQUE3QixVQUE4QixJQUFZO1FBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFaZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQWFuQztJQUFELHNCQUFDO0NBYkQsQUFhQyxDQWI0QyxFQUFFLENBQUMsU0FBUyxHQWF4RDtrQkFib0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBZWl9Db25zdGFudCBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9FdmVudE1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXJFdmVudChuYW1lOiBzdHJpbmcgLCBoYW5kbGVyOiBhbnksIHRhcmdldCA6IGFueSl7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihuYW1lLCBoYW5kbGVyLCB0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdW5yZWdpc3RlckV2ZW50KHRhcmdldDphbnkpe1xyXG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlbWl0Q29tbW9uRXZlbnQoYXJnczogb2JqZWN0KXtcclxuICAgICAgICBjYy5nYW1lLmVtaXQoWVpfQ29uc3RhbnQuWVpfRXZlbnRDb21tb24sIGFyZ3MpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==