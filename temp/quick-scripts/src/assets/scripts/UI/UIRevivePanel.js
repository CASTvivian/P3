"use strict";
cc._RF.push(module, 'f624aGi/QlIuZDbTFGHQJuX', 'UIRevivePanel');
// scripts/UI/UIRevivePanel.ts

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
var UIPage_1 = require("../Framework/UIPage");
var Msg_1 = require("../Framework/Msg");
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var gameMgr_1 = require("../Game/gameMgr");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIRevivePanel = /** @class */ (function (_super) {
    __extends(UIRevivePanel, _super);
    function UIRevivePanel() {
        var _this = _super.call(this, Constant_1.PanelName.UIRevivePanel) || this;
        _this._mask = null;
        _this._panel = null;
        _this._timeLabel = null;
        _this._proIcon = null;
        _this._btnVideo = null;
        _this._btnPass = null;
        _this._tw1 = null;
        _this._tw2 = null;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIRevivePanel.prototype.onLoad = function () {
        this._mask = this._page.getChildByName("Mask");
        this._panel = this._page.getChildByName("Panel");
        this._timeLabel = this._panel.getChildByName("time").getComponent(cc.Label);
        this._proIcon = this._panel.getChildByName("shangquan").getComponent(cc.Sprite);
        this._btnVideo = this._panel.getChildByName("BtnVideo");
        this._btnVideo.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
        this._btnPass = this._panel.getChildByName("BtnPass");
        this._btnPass.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
    };
    UIRevivePanel.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-复活");
        this.showAd();
        this._initPanel();
        CocosZ_1.cocosz.pauseCount++;
    };
    UIRevivePanel.prototype.onClose = function () {
        CocosZ_1.cocosz.pauseCount--;
    };
    UIRevivePanel.prototype.showAd = function () { };
    UIRevivePanel.prototype._initPanel = function () {
        var _this = this;
        var opacityBack = this._mask.opacity;
        this._mask.opacity = 0;
        cc.tween(this._mask).to(0.2, { opacity: opacityBack }).start();
        this._panel.scale = 0;
        cc.tween(this._panel)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
        var count = 9;
        this._tw1 = cc.tween(this._timeLabel)
            .delay(1)
            .call(function () {
            _this._timeLabel.string = (--count).toString();
        })
            .union()
            .repeat(9)
            .call(function () {
            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
            gameMgr_1.gameMgr.fail();
        })
            .start();
        this._tw2 = cc.tween(this._proIcon)
            .to(9, { fillRange: 0 })
            .start();
    };
    UIRevivePanel.prototype.stopTween = function () {
        if (CocosZ_1.cocosz.gameMode == 6) {
            this._tw1 && this._tw1.stop();
            this._tw2 && this._tw2.stop();
        }
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UIRevivePanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                CocosZ_1.cocosz.audioMgr.playBtnEffect();
                this.stopTween();
                switch (event.target.name) {
                    case "BtnVideo": {
                        Utils_1.utils.umaEvent("gamefuhuo");
                        // 分享
                        if (this._btnVideo.getChildByName("share") && this._btnVideo.getChildByName("share").active) {
                            Utils_1.utils.SendEvent("分享-复活");
                            CocosZ_1.cocosz.share(function () {
                                Utils_1.utils.SendEvent("分享-复活-成功");
                                _this._reLive();
                            }, function () {
                                Utils_1.utils.SendEvent("分享-复活-失败");
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                                gameMgr_1.gameMgr.fail();
                            });
                        }
                        // 视频
                        else if (this._btnVideo.getChildByName("video") && this._btnVideo.getChildByName("video").active) {
                            Utils_1.utils.SendEvent("视频-复活-播放");
                            CocosZ_1.cocosz.watchAD(function () {
                                Utils_1.utils.SendEvent("视频-复活-成功");
                                _this._reLive();
                            }, function () {
                                Utils_1.utils.SendEvent("视频-复活-失败");
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                                gameMgr_1.gameMgr.fail();
                            });
                        }
                        // 失败
                        else {
                            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                            gameMgr_1.gameMgr.fail();
                        }
                        break;
                    }
                    case "BtnPass": {
                        Utils_1.utils.umaEvent("gamesurr");
                        CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                        gameMgr_1.gameMgr.fail();
                        break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 复活事件
     */
    UIRevivePanel.prototype._reLive = function () {
        Msg_1.default.Show(i18n.t("msg.fhcg")); //复活成功
        CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
        gameMgr_1.gameMgr.revive();
    };
    UIRevivePanel = __decorate([
        ccclass
    ], UIRevivePanel);
    return UIRevivePanel;
}(UIPage_1.default));
exports.default = UIRevivePanel;

cc._RF.pop();