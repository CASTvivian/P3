"use strict";
cc._RF.push(module, 'e2425kaMhpN4aU6KcM8BiLX', 'YZ_ShakeNode');
// common-plugin/Scripts/YZ_ShakeNode.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_ShakeNode = /** @class */ (function (_super) {
    __extends(YZ_ShakeNode, _super);
    function YZ_ShakeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YZ_ShakeNode.prototype.start = function () {
        this.schedule(this.shake, 3);
    };
    YZ_ShakeNode.prototype.shake = function () {
        var duration = 0.03;
        var action = cc.repeat(cc.sequence(cc.rotateTo(duration, 5), cc.rotateTo(duration, 0), cc.rotateTo(duration, -5), cc.rotateTo(duration, 0)), 5);
        this.node.runAction(action);
    };
    YZ_ShakeNode = __decorate([
        ccclass
    ], YZ_ShakeNode);
    return YZ_ShakeNode;
}(cc.Component));
exports.default = YZ_ShakeNode;

cc._RF.pop();