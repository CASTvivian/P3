"use strict";
cc._RF.push(module, '672f4K2Ni5IvZKg5f59uM3H', 'UILoadingPage');
// scripts/UI/UILoadingPage.ts

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
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UILoadingPage = /** @class */ (function (_super) {
    __extends(UILoadingPage, _super);
    function UILoadingPage() {
        var _this = _super.call(this, Constant_1.PageName.UILoadingPage) || this;
        _this._loadingBar = null;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UILoadingPage.prototype.onLoad = function () {
        // 健康忠告
        var health = cc.find("health", this._page);
        if (health) {
            if (CocosZ_1.cocosz.curLanguage == "zh" && (PlatUtils_1.default.IsHuaWei || PlatUtils_1.default.IsOPPO || CocosZ_1.cocosz.isDeBug)) {
                health.active = true;
            }
            else {
                health.active = false;
            }
        }
        this._loadingBar = cc.find("LoadingBar", this._page).getComponent(cc.ProgressBar);
    };
    UILoadingPage.prototype.onOpen = function () {
        var _this = this;
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMassageHandler, this);
        // 进度默认0.01
        this._loadingBar.progress = 0.01;
        // 最低进度
        var r = 0.01;
        cc.tween(this._page)
            .delay(0.2)
            .call(function () {
            r += 0.01;
            if (r < 1) {
                _this._updateProgress(r);
            }
        })
            .union()
            .repeatForever()
            .start();
    };
    UILoadingPage.prototype.onClose = function () {
        cc.game.targetOff(this);
    };
    UILoadingPage.prototype._onGameMassageHandler = function (event) {
        this._loadingBar.node.active = true;
        switch (event.type) {
            case Constant_1.default.E_UPDATE_PROGRESS: {
                this._updateProgress(event.data);
                break;
            }
        }
    };
    UILoadingPage.prototype._updateProgress = function (pro) {
        if (pro > this._loadingBar.progress)
            this._loadingBar.progress = pro;
    };
    UILoadingPage = __decorate([
        ccclass
    ], UILoadingPage);
    return UILoadingPage;
}(UIPage_1.default));
exports.default = UILoadingPage;

cc._RF.pop();