"use strict";
cc._RF.push(module, '45557zGvJFMOq7sodhqFlFw', 'UIPausePanel');
// scripts/UI/UIPausePanel.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var YZ_Constant_1 = require("../../common-plugin/Scripts/YZ_Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var TweenEffect_1 = require("../Framework/TweenEffect");
var UIPage_1 = require("../Framework/UIPage");
var gameMgr_1 = require("../Game/gameMgr");
var UpgradeMgr_1 = require("../Game/UpgradeMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIPausePanel = /** @class */ (function (_super) {
    __extends(UIPausePanel, _super);
    function UIPausePanel() {
        var _this = _super.call(this, Constant_1.PanelName.UIPausePanel) || this;
        _this._mask = null;
        _this._panel = null;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIPausePanel.prototype.onLoad = function () {
        this._mask = this._page.getChildByName("mask");
        this._panel = this._page.getChildByName("Panel");
        var btnNames = ["BtnRestart", "BtnResume", "BtnHome"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = cc.find(btnNames[i], this._panel);
            btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
        }
    };
    UIPausePanel.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-暂停");
        this.showAd();
        TweenEffect_1.default.panel_mask_opacity(this._mask);
        TweenEffect_1.default.panel_open_moveY(this._panel);
        CocosZ_1.cocosz.pauseCount++;
    };
    UIPausePanel.prototype.onClose = function () {
        if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.adManager.hideCustomAd({ location: YZ_Constant_1.BannerLocation.Pause });
        }
        CocosZ_1.cocosz.pauseCount--;
    };
    UIPausePanel.prototype.showAd = function () {
        if (CocosZ_1.cocosz.isShowAd) {
            if (PlatUtils_1.default.IsVIVO) {
                Utils_1.utils.adManager.showCustomAd({ location: YZ_Constant_1.BannerLocation.Pause });
            }
        }
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UIPausePanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //播放按钮点击音效
                    return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        //播放按钮点击音效
                        _a.sent();
                        switch (event.target.name) {
                            case "BtnRestart": {
                                gameMgr_1.gameMgr.isFail = true;
                                gameMgr_1.gameMgr.unscheduleAllCallbacks();
                                UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.unscheduleAllCallbacks();
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIPausePanel);
                                if (CocosZ_1.cocosz.gameMode == 6) {
                                    CocosZ_1.cocosz.gameMgr.gameStart(CocosZ_1.cocosz.dataMgr.TotoalCount_6);
                                }
                                break;
                            }
                            case "BtnResume": {
                                cc.tween(this._panel)
                                    .to(0.5, { y: this._panel.y + 1000 }, { easing: "sineOut" })
                                    .call(function () {
                                    CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIPausePanel);
                                })
                                    .start();
                                break;
                            }
                            case "BtnHome": {
                                gameMgr_1.gameMgr.isFail = true;
                                gameMgr_1.gameMgr.unscheduleAllCallbacks();
                                UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.unscheduleAllCallbacks();
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIPausePanel);
                                CocosZ_1.cocosz.sceneMgr.loadScene("Home", (function () {
                                    CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIHomePage);
                                }));
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UIPausePanel = __decorate([
        ccclass
    ], UIPausePanel);
    return UIPausePanel;
}(UIPage_1.default));
exports.default = UIPausePanel;

cc._RF.pop();