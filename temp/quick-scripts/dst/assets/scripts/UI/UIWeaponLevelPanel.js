
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIWeaponLevelPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJV2VhcG9uTGV2ZWxQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBMEQ7QUFDMUQsOENBQTZDO0FBQzdDLGtEQUFrRDtBQUNsRCx3Q0FBbUM7QUFDbkMsOENBQXlDO0FBQ3pDLDZDQUF3QztBQUN4Qyx5Q0FBb0M7QUFDcEMsYUFBYTtBQUNiLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU3QixJQUFBLE9BQU8sR0FBSyxFQUFFLENBQUMsVUFBVSxRQUFsQixDQUFtQjtBQUdsQztJQUFnRCxzQ0FBTTtJQVNsRDtRQUFBLFlBQ0ksa0JBQU0sb0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUV0QztRQVZPLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IsWUFBTSxHQUFjLElBQUksQ0FBQztRQUV6QixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFJcEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7SUFDcEMsQ0FBQztJQUVTLG1DQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0UsSUFBSSxRQUFRLEdBQWEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxN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VDt5QkFDSjs7Ozs7S0FDSjtJQWxJZ0Isa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0FtSXRDO0lBQUQseUJBQUM7Q0FuSUQsQUFtSUMsQ0FuSStDLGdCQUFNLEdBbUlyRDtrQkFuSW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgeyBQYW5lbE5hbWUgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCBNc2cgZnJvbSBcIi4uL0ZyYW1ld29yay9Nc2dcIjtcclxuaW1wb3J0IFVJUGFnZSBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJUGFnZVwiO1xyXG5pbXBvcnQgR2FtZURhdGUgZnJvbSBcIi4uL0dhbWUvZ2FtZURhdGVcIjtcclxuaW1wb3J0IFdlYXBvbiBmcm9tIFwiLi4vR2FtZS93ZWFwb25cIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVdlYXBvbkxldmVsUGFuZWwgZXh0ZW5kcyBVSVBhZ2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICB3ZWFwb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgd2VhcG9uSWQ6IG51bWJlciA9IDA7XHJcbiAgICBpc1JhbmdlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQYW5lbE5hbWUuVUlXZWFwb25MZXZlbFBhbmVsKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fcGFuZWwgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIndlYXBvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuXHJcbiAgICAgICAgbGV0IGJ0bk5hbWVzOiBzdHJpbmdbXSA9IFtcIkJ0blBhc3NcIiwgXCJCdG5WaWRlb1wiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ0bk5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidG46IGNjLk5vZGUgPSBjYy5maW5kKGJ0bk5hbWVzW2ldLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnRuQ2xpY2tlZEhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLpobXpnaIt5q2m5Zmo5Y2H57qnXCIpO1xyXG4gICAgICAgIC8vIOaaguWBnOa4uOaIj+mAu+i+kVxyXG4gICAgICAgIGNvY29zei5wYXVzZUNvdW50Kys7XHJcbiAgICAgICAgbGV0IHdlYXBvbk5hbWUgPSBcIlwiO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IDA7XHJcbiAgICAgICAgbGV0IHJhbmdlTGV2ZWwgPSBjb2Nvc3ouZGF0YU1nci5nZXRHdW5JbmZvKGNvY29zei5kYXRhTWdyLkN1clJhbmdlKS5MZXZlbDtcclxuICAgICAgICBsZXQgbWVsZWVMZXZlbCA9IGNvY29zei5kYXRhTWdyLmdldEd1bkluZm8oY29jb3N6LmRhdGFNZ3IuQ3VyTWVsZWUpLkxldmVsO1xyXG4gICAgICAgIGlmIChyYW5nZUxldmVsIDwgMykge1xyXG4gICAgICAgICAgICAvLyDmmL7npLrov5znqItcclxuICAgICAgICAgICAgdGhpcy5pc1JhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JZCA9IGNvY29zei5kYXRhTWdyLkN1clJhbmdlO1xyXG4gICAgICAgICAgICB3ZWFwb25OYW1lID0gV2VhcG9uLldlYXBvbk5hbWVbdGhpcy53ZWFwb25JZF07XHJcbiAgICAgICAgICAgIGxldmVsID0gcmFuZ2VMZXZlbDtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24uc3ByaXRlRnJhbWUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcIndfXCIgKyB3ZWFwb25OYW1lLCBjYy5TcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtZWxlZUxldmVsIDwgMykge1xyXG4gICAgICAgICAgICAvLyDmmL7npLrov5HnqItcclxuICAgICAgICAgICAgdGhpcy5pc1JhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWQgPSBjb2Nvc3ouZGF0YU1nci5DdXJNZWxlZTtcclxuICAgICAgICAgICAgd2VhcG9uTmFtZSA9IFdlYXBvbi5XZWFwb25OYW1lW3RoaXMud2VhcG9uSWRdXHJcbiAgICAgICAgICAgIGxldmVsID0gbWVsZWVMZXZlbDtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24uc3ByaXRlRnJhbWUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcIndfXCIgKyB3ZWFwb25OYW1lLCBjYy5TcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g55u05o6l5YWz6ZetXHJcbiAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVdlYXBvbkxldmVsUGFuZWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaYvuekuuaVsOaNrlxyXG4gICAgICAgIGxldCBpbmZvID0gR2FtZURhdGUuV2VhcG9uW3dlYXBvbk5hbWVdXHJcbiAgICAgICAgbGV0IHR4dDEgPSBjYy5maW5kKFwia3VhbmcvdHh0MVwiLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgaWYgKHR4dDEpIHtcclxuICAgICAgICAgICAgbGV0IHJpY2hUZXh0ID0gdHh0MS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmljaFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJOdW0gPSBpbmZvLmF0a1tsZXZlbF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE51bSA9IGluZm8uYXRrWzNdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZk51bSA9IG5leHROdW0gLSBjdXJOdW07XHJcbiAgICAgICAgICAgICAgICByaWNoVGV4dC5zdHJpbmcgPSBgPG91dGxpbmUgY29sb3I9YmxhY2sgd2lkdGg9Mj48Y29sb3I9d2hpdGU+JHtpMThuLnQoXCJ0cnkuZ2psXCIpICsgXCI6IFwiICsgY3VyTnVtfTwvYz48Y29sb3I9Z3JlZW59PiR7ZGlmTnVtID4gMCA/IChcIiArXCIgKyBkaWZOdW0pIDogXCJcIn08L2M+PC9vdXRsaW5lPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHR4dDIgPSBjYy5maW5kKFwia3VhbmcvdHh0MlwiLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgaWYgKHR4dDIpIHtcclxuICAgICAgICAgICAgbGV0IHJpY2hUZXh0ID0gdHh0Mi5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmljaFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJOdW0gPSAxIC8gaW5mby5hdGtTcGVlZFtsZXZlbF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE51bSA9IDEgLyBpbmZvLmF0a1NwZWVkWzNdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZk51bSA9IG5leHROdW0gLSBjdXJOdW07XHJcbiAgICAgICAgICAgICAgICByaWNoVGV4dC5zdHJpbmcgPSBgPG91dGxpbmUgY29sb3I9YmxhY2sgd2lkdGg9Mj48Y29sb3I9d2hpdGU+JHtpMThuLnQoXCJ0cnkuZ2pwbFwiKSArIFwiOiBcIiArIGN1ck51bX08L2M+PGNvbG9yPWdyZWVufT4ke2RpZk51bSA+IDAgPyAoXCIgK1wiICsgZGlmTnVtKSA6IFwiXCJ9PC9jPjwvb3V0bGluZT5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0eHQzID0gY2MuZmluZChcImt1YW5nL3R4dDNcIiwgdGhpcy5fcGFuZWwpO1xyXG4gICAgICAgIGlmICh0eHQzKSB7XHJcbiAgICAgICAgICAgIGxldCByaWNoVGV4dCA9IHR4dDMuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAgICAgaWYgKHJpY2hUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyTnVtID0gaW5mby5hdGtSYW5nZTtcclxuICAgICAgICAgICAgICAgIHJpY2hUZXh0LnN0cmluZyA9IGA8b3V0bGluZSBjb2xvcj1ibGFjayB3aWR0aD0yPjxjb2xvcj13aGl0ZT4ke2kxOG4udChcInRyeS5namZ3XCIpICsgXCI6IFwiICsgY3VyTnVtfTwvYz48L291dGxpbmU+YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHh0NCA9IGNjLmZpbmQoXCJrdWFuZy90eHQ0XCIsIHRoaXMuX3BhbmVsKTtcclxuICAgICAgICBpZiAodHh0NCkge1xyXG4gICAgICAgICAgICBsZXQgcmljaFRleHQgPSB0eHQ0LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyaWNoVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1ck51bSA9IGluZm8uYnVsbGV0VG90YWxbbGV2ZWxdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHROdW0gPSBpbmZvLmJ1bGxldFRvdGFsWzNdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZk51bSA9IG5leHROdW0gLSBjdXJOdW07XHJcbiAgICAgICAgICAgICAgICByaWNoVGV4dC5zdHJpbmcgPSBgPG91dGxpbmUgY29sb3I9YmxhY2sgd2lkdGg9Mj48Y29sb3I9d2hpdGU+JHtpMThuLnQoXCJ0cnkuZHlsXCIpICsgXCI6IFwiICsgKHRoaXMuaXNSYW5nZSA/IGN1ck51bSA6IFwi4pm+XCIpfTwvYz48Y29sb3I9Z3JlZW59PiR7ZGlmTnVtID4gMCA/IChcIiArXCIgKyBkaWZOdW0pIDogXCJcIn08L2M+PC9vdXRsaW5lPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgY29jb3N6LmdhbWVNZ3IuZ2FtZVN0YXJ0KGNvY29zei5jdXJMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYDmnInmjInpkq7ngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudCBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIF9vbkJ0bkNsaWNrZWRIYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgLy/mkq3mlL7mjInpkq7ngrnlh7vpn7PmlYhcclxuICAgICAgICBhd2FpdCBjb2Nvc3ouYXVkaW9NZ3IucGxheUJ0bkVmZmVjdCgpLmNhdGNoKCk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQnRuUGFzc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlXZWFwb25MZXZlbFBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5WaWRlb1wiOiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5by556qX5q2m5Zmo5Y2H57qnLeaSreaUvlwiKVxyXG4gICAgICAgICAgICAgICAgY29jb3N6LndhdGNoQUQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOinhumikeaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3lvLnnqpfmrablmajljYfnuqct5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZm8gPSBjb2Nvc3ouZGF0YU1nci5nZXRHdW5JbmZvKHRoaXMud2VhcG9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8uTGV2ZWwgPSAzOy8vIOWNh+WIsOacgOmrmOe6p+WIq1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLnNldEd1bkluZm8odGhpcy53ZWFwb25JZCwgaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLnNqY2dcIikpOy8v5Y2H57qn5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLmNsb3NlUGFuZWwoUGFuZWxOYW1lLlVJV2VhcG9uTGV2ZWxQYW5lbCk7XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KeG6aKR5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeW8ueeql+atpuWZqOWNh+e6py3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlXZWFwb25MZXZlbFBhbmVsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=