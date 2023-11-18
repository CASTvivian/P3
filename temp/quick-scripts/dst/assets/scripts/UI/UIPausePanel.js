
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIPausePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJUGF1c2VQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBOEQ7QUFDOUQsMkRBQTBEO0FBQzFELHVFQUF5RTtBQUN6RSw4Q0FBNkM7QUFDN0Msa0RBQTREO0FBQzVELHdEQUFtRDtBQUNuRCw4Q0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLGlEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBTTtJQUU1QztRQUFBLFlBQ0ksa0JBQU0sb0JBQVMsQ0FBQyxZQUFZLENBQUMsU0FFaEM7UUFFTyxXQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFKM0IsS0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7SUFDcEMsQ0FBQztJQUlELDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxRQUFRLEdBQWEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksR0FBRyxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUks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QVksQ0FBQyxDQUFDO2dDQUNoRCxlQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDL0IsZUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDSCxNQUFNOzZCQUNUO3lCQUNKOzs7OztLQUNKO0lBaEZnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBa0ZoQztJQUFELG1CQUFDO0NBbEZELEFBa0ZDLENBbEZ5QyxnQkFBTSxHQWtGL0M7a0JBbEZvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvVXRpbHNcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCB7IFBhZ2VOYW1lLCBQYW5lbE5hbWUgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCBUd2VlbkVmZmVjdCBmcm9tIFwiLi4vRnJhbWV3b3JrL1R3ZWVuRWZmZWN0XCI7XHJcbmltcG9ydCBVSVBhZ2UgZnJvbSBcIi4uL0ZyYW1ld29yay9VSVBhZ2VcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuLi9HYW1lL2dhbWVNZ3JcIjtcclxuaW1wb3J0IHsgdXBncmFkZU1nciB9IGZyb20gXCIuLi9HYW1lL1VwZ3JhZGVNZ3JcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhdXNlUGFuZWwgZXh0ZW5kcyBVSVBhZ2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFBhbmVsTmFtZS5VSVBhdXNlUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCgpICYmIHRoaXMub25Mb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFzazogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIGxldCBidG5OYW1lczogc3RyaW5nW10gPSBbXCJCdG5SZXN0YXJ0XCIsIFwiQnRuUmVzdW1lXCIsIFwiQnRuSG9tZVwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ0bk5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidG46IGNjLk5vZGUgPSBjYy5maW5kKGJ0bk5hbWVzW2ldLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnRuQ2xpY2tlZEhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIumhtemdoi3mmoLlgZxcIik7XHJcbiAgICAgICAgdGhpcy5zaG93QWQoKTtcclxuICAgICAgICBUd2VlbkVmZmVjdC5wYW5lbF9tYXNrX29wYWNpdHkodGhpcy5fbWFzayk7XHJcbiAgICAgICAgVHdlZW5FZmZlY3QucGFuZWxfb3Blbl9tb3ZlWSh0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgY29jb3N6LnBhdXNlQ291bnQrKztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlQ3VzdG9tQWQoeyBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uUGF1c2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvY29zei5wYXVzZUNvdW50LS07XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FkKCkge1xyXG4gICAgICAgIGlmIChjb2Nvc3ouaXNTaG93QWQpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93Q3VzdG9tQWQoeyBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uUGF1c2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYDmnInmjInpkq7ngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudCBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIF9vbkJ0bkNsaWNrZWRIYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgLy/mkq3mlL7mjInpkq7ngrnlh7vpn7PmlYhcclxuICAgICAgICBhd2FpdCBjb2Nvc3ouYXVkaW9NZ3IucGxheUJ0bkVmZmVjdCgpLmNhdGNoKCk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQnRuUmVzdGFydFwiOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLmlzRmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVNZ3IgJiYgdXBncmFkZU1nci51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlQYXVzZVBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5nYW1lTWdyLmdhbWVTdGFydChjb2Nvc3ouZGF0YU1nci5Ub3RvYWxDb3VudF82KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5SZXN1bWVcIjoge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5fcGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuNSwgeyB5OiB0aGlzLl9wYW5lbC55ICsgMTAwMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVBhdXNlUGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuSG9tZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLmlzRmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVNZ3IgJiYgdXBncmFkZU1nci51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlQYXVzZVBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGNvY29zei5zY2VuZU1nci5sb2FkU2NlbmUoXCJIb21lXCIsICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYWdlKFBhZ2VOYW1lLlVJSG9tZVBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19