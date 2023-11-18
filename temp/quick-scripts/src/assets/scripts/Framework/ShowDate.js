"use strict";
cc._RF.push(module, 'fb2bf+T41RP1pOMLr4eZBx6', 'ShowDate');
// scripts/Framework/ShowDate.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode;
var ShowDate = /** @class */ (function (_super) {
    __extends(ShowDate, _super);
    function ShowDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowDate.prototype.start = function () {
        if (CC_EDITOR) {
            var label = this.node.getComponent(cc.Label);
            if (label) {
                var d = new Date();
                label.string = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            }
        }
        this.node.zIndex = cc.macro.MAX_ZINDEX;
    };
    ShowDate = __decorate([
        ccclass,
        executeInEditMode
    ], ShowDate);
    return ShowDate;
}(cc.Component));
exports.default = ShowDate;

cc._RF.pop();