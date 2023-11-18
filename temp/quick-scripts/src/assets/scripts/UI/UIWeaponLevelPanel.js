"use strict";
cc._RF.push(module, '83dfcUFp79CK5jLHVT/rcgh', 'UIWeaponLevelPanel');
// scripts/UI/UIWeaponLevelPanel.ts

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
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var Msg_1 = require("../Framework/Msg");
var UIPage_1 = require("../Framework/UIPage");
var gameDate_1 = require("../Game/gameDate");
var weapon_1 = require("../Game/weapon");
// @ts-ignore
var i18n = require('LanguageData');
var ccclass = cc._decorator.ccclass;
var UIWeaponLevelPanel = /** @class */ (function (_super) {
    __extends(UIWeaponLevelPanel, _super);
    function UIWeaponLevelPanel() {
        var _this = _super.call(this, Constant_1.PanelName.UIWeaponLevelPanel) || this;
        _this._panel = null;
        _this.weapon = null;
        _this.weaponId = 0;
        _this.isRange = true;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIWeaponLevelPanel.prototype.onLoad = function () {
        this._panel = this._page.getChildByName("Panel");
        this.weapon = this._panel.getChildByName("weapon").getComponent(cc.Sprite);
        var btnNames = ["BtnPass", "BtnVideo"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = cc.find(btnNames[i], this._panel);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            }
        }
    };
    UIWeaponLevelPanel.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-武器升级");
        // 暂停游戏逻辑
        CocosZ_1.cocosz.pauseCount++;
        var weaponName = "";
        var level = 0;
        var rangeLevel = CocosZ_1.cocosz.dataMgr.getGunInfo(CocosZ_1.cocosz.dataMgr.CurRange).Level;
        var meleeLevel = CocosZ_1.cocosz.dataMgr.getGunInfo(CocosZ_1.cocosz.dataMgr.CurMelee).Level;
        if (rangeLevel < 3) {
            // 显示远程
            this.isRange = true;
            this.weaponId = CocosZ_1.cocosz.dataMgr.CurRange;
            weaponName = weapon_1.default.WeaponName[this.weaponId];
            level = rangeLevel;
            this.weapon.spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + weaponName, cc.SpriteFrame);
        }
        else if (meleeLevel < 3) {
            // 显示近程
            this.isRange = false;
            this.weaponId = CocosZ_1.cocosz.dataMgr.CurMelee;
            weaponName = weapon_1.default.WeaponName[this.weaponId];
            level = meleeLevel;
            this.weapon.spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + weaponName, cc.SpriteFrame);
        }
        else {
            // 直接关闭
            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIWeaponLevelPanel);
            return;
        }
        // 显示数据
        var info = gameDate_1.default.Weapon[weaponName];
        var txt1 = cc.find("kuang/txt1", this._panel);
        if (txt1) {
            var richText = txt1.getComponent(cc.RichText);
            if (richText) {
                var curNum = info.atk[level];
                var nextNum = info.atk[3];
                var difNum = nextNum - curNum;
                richText.string = "<outline color=black width=2><color=white>" + (i18n.t("try.gjl") + ": " + curNum) + "</c><color=green}>" + (difNum > 0 ? (" +" + difNum) : "") + "</c></outline>";
            }
        }
        var txt2 = cc.find("kuang/txt2", this._panel);
        if (txt2) {
            var richText = txt2.getComponent(cc.RichText);
            if (richText) {
                var curNum = 1 / info.atkSpeed[level];
                var nextNum = 1 / info.atkSpeed[3];
                var difNum = nextNum - curNum;
                richText.string = "<outline color=black width=2><color=white>" + (i18n.t("try.gjpl") + ": " + curNum) + "</c><color=green}>" + (difNum > 0 ? (" +" + difNum) : "") + "</c></outline>";
            }
        }
        var txt3 = cc.find("kuang/txt3", this._panel);
        if (txt3) {
            var richText = txt3.getComponent(cc.RichText);
            if (richText) {
                var curNum = info.atkRange;
                richText.string = "<outline color=black width=2><color=white>" + (i18n.t("try.gjfw") + ": " + curNum) + "</c></outline>";
            }
        }
        var txt4 = cc.find("kuang/txt4", this._panel);
        if (txt4) {
            var richText = txt4.getComponent(cc.RichText);
            if (richText) {
                var curNum = info.bulletTotal[level];
                var nextNum = info.bulletTotal[3];
                var difNum = nextNum - curNum;
                richText.string = "<outline color=black width=2><color=white>" + (i18n.t("try.dyl") + ": " + (this.isRange ? curNum : "♾")) + "</c><color=green}>" + (difNum > 0 ? (" +" + difNum) : "") + "</c></outline>";
            }
        }
    };
    UIWeaponLevelPanel.prototype.onClose = function () {
        CocosZ_1.cocosz.gameMgr.gameStart(CocosZ_1.cocosz.curLevel);
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UIWeaponLevelPanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //播放按钮点击音效
                    return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        //播放按钮点击音效
                        _a.sent();
                        switch (event.target.name) {
                            case "BtnPass": {
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIWeaponLevelPanel);
                                break;
                            }
                            case "BtnVideo": {
                                Utils_1.utils.SendEvent("视频-弹窗武器升级-播放");
                                CocosZ_1.cocosz.watchAD(function () {
                                    // 视频成功
                                    Utils_1.utils.SendEvent("视频-弹窗武器升级-成功");
                                    var info = CocosZ_1.cocosz.dataMgr.getGunInfo(_this.weaponId);
                                    info.Level = 3; // 升到最高级别
                                    CocosZ_1.cocosz.dataMgr.setGunInfo(_this.weaponId, info);
                                    Msg_1.default.Show(i18n.t("msg.sjcg")); //升级成功
                                    CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIWeaponLevelPanel);
                                }, function () {
                                    // 视频失败
                                    Utils_1.utils.SendEvent("视频-弹窗武器升级-失败");
                                    CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIWeaponLevelPanel);
                                });
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UIWeaponLevelPanel = __decorate([
        ccclass
    ], UIWeaponLevelPanel);
    return UIWeaponLevelPanel;
}(UIPage_1.default));
exports.default = UIWeaponLevelPanel;

cc._RF.pop();