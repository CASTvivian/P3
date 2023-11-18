"use strict";
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