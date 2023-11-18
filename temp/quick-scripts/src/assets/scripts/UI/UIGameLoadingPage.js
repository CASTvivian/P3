"use strict";
cc._RF.push(module, 'c5a1dCIX/VATJjbaL5OivFz', 'UIGameLoadingPage');
// scripts/UI/UIGameLoadingPage.ts

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
var UIPage_1 = require("../Framework/UIPage");
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var GuideLayer_1 = require("./GuideLayer");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGameLoadingPage = /** @class */ (function (_super) {
    __extends(UIGameLoadingPage, _super);
    function UIGameLoadingPage() {
        var _this = _super.call(this, Constant_1.PageName.UIGameLoadingPage) || this;
        _this._startTime = 0;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIGameLoadingPage.prototype.onOpen = function () {
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        this._startTime = new Date().getTime();
        CocosZ_1.cocosz.scheduleOnce(function () {
            CocosZ_1.cocosz.audioMgr.playEffect("fj", true, 1);
        }, 0.1);
    };
    UIGameLoadingPage.prototype.onClose = function () {
        cc.game.targetOff(this);
        GuideLayer_1.guideLayer.hideFjAni();
        GuideLayer_1.guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
        CocosZ_1.cocosz.audioMgr.stopEffect("fj");
    };
    UIGameLoadingPage.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
            case Constant_1.default.E_UPDATE_PROGRESS: {
                this._updateProgress(event.data);
                break;
            }
        }
    };
    UIGameLoadingPage.prototype._updateProgress = function (pro) {
        if (pro >= 1) {
            var difTime = new Date().getTime() - this._startTime;
            if (difTime >= 6000) {
                CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIGamePage);
            }
            else {
                setTimeout(function () {
                    CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIGamePage);
                }, 6000 - difTime);
            }
        }
    };
    UIGameLoadingPage = __decorate([
        ccclass
    ], UIGameLoadingPage);
    return UIGameLoadingPage;
}(UIPage_1.default));
exports.default = UIGameLoadingPage;

cc._RF.pop();