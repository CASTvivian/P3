"use strict";
cc._RF.push(module, '790e4sDjF5IWJNaXfl/M8R4', 'HandAction');
// common-plugin/Scripts/HandAction.ts

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
var HandAction = /** @class */ (function (_super) {
    __extends(HandAction, _super);
    function HandAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.runTime = 0.3;
        return _this;
        // update (dt) {}
    }
    HandAction.prototype.onLoad = function () {
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.node.scale = cc.view.getDesignResolutionSize().width / 1920 * 0.5;
        }
        else {
            this.node.scale = cc.view.getDesignResolutionSize().width / 1080 * 0.5;
        }
    };
    HandAction.prototype.onEnable = function () {
        this.node.runAction(cc.sequence(cc.moveBy(this.runTime, cc.v2(-50, +50)), cc.moveBy(this.runTime, cc.v2(+50, -50))).repeatForever());
    };
    HandAction.prototype.onDisable = function () {
        this.node.stopAllActions();
    };
    __decorate([
        property({ type: cc.Float })
    ], HandAction.prototype, "runTime", void 0);
    HandAction = __decorate([
        ccclass
    ], HandAction);
    return HandAction;
}(cc.Component));
exports.default = HandAction;

cc._RF.pop();