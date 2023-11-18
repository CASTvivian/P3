
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIOverPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a9632KbIPtPCovZ1PzJnE6R', 'UIOverPage');
// scripts/UI/UIOverPage.ts

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
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var YZ_Constant_1 = require("../../common-plugin/Scripts/YZ_Constant");
var gameMgr_1 = require("../Game/gameMgr");
var UpgradeMgr_1 = require("../Game/UpgradeMgr");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIOverPage = /** @class */ (function (_super) {
    __extends(UIOverPage, _super);
    function UIOverPage() {
        var _this = _super.call(this, Constant_1.PageName.UIOverPage) || this;
        _this._panel = null;
        _this._mask = null;
        _this._btnContinue = null;
        _this._btnHome = null;
        _this._isToHome = false;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIOverPage.prototype.onLoad = function () {
        this._mask = cc.find("Mask", this._page);
        this._panel = cc.find("Panel", this._page);
        this._btnContinue = cc.find("BtnContinue", this._panel);
        this._btnContinue.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
        this._btnHome = cc.find("BtnHome", this._panel);
        this._btnHome.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
    };
    UIOverPage.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-结算-" + (gameMgr_1.gameMgr.isWin ? "胜利" : "失败"));
        this.showAd();
        this._initPanel();
        CocosZ_1.cocosz.dataMgr.TotoalCount_6++;
    };
    UIOverPage.prototype.onClose = function () {
        cc.game.targetOff(this);
        Utils_1.utils.hideVivoGamePortalWidget();
        Utils_1.utils.hideOppoGameDrawerAdWidget();
        Utils_1.utils.adManager.hideBlockAd();
        Utils_1.utils.adManager.hideNativeTryGameWidget();
        Utils_1.utils.adManager.HideSingleNativeAd();
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Over);
            Utils_1.utils.adManager.hideCustomAd({ location: 5 });
            Utils_1.utils.adManager.hideCustomAd({ location: 6 });
            Utils_1.utils.adManager.hideCustomAd({ location: 7 });
        }
        else if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.adManager.hideCustomAd({ location: YZ_Constant_1.BannerLocation.Over });
        }
    };
    UIOverPage.prototype.showAd = function () {
        Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Over, { width: 0.1, bottom: 1 });
        // 显示积木广告
        Utils_1.utils.adManager.showBlockAd({ top: 500 });
        // 悬浮icon
        Utils_1.utils.adManager.showNativeTryGameWidget({ right: 95, top: 500, scale: 1, parent: this._page });
        // 原生广告
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.adManager.showCustomAd({ location: 5 });
            Utils_1.utils.adManager.showCustomAd({ location: 6 });
            Utils_1.utils.adManager.showCustomAd({ location: 7 });
        }
        else if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.adManager.showCustomAd({ location: YZ_Constant_1.BannerLocation.Over });
        }
        // 互推
        Utils_1.utils.showTryGamesWidget({ group: 'default', scale: 1, top: 180, right: 25, parent: this._page, location: YZ_Constant_1.BannerLocation.Over });
        Utils_1.utils.showMoreGamesWidget({ group: 'default', scale: 1, top: 300, left: 25, parent: this._page, location: YZ_Constant_1.BannerLocation.Over });
        Utils_1.utils.showRecommendGamesList({ group: 'default', scale: 1, parent: this._page, bottom: 1000 });
        Utils_1.utils.showVivoGamePortalWidget({ top: 500, location: YZ_Constant_1.BannerLocation.Over });
        Utils_1.utils.showOppoGameDrawerAdWidget({ bottom: 500, location: YZ_Constant_1.BannerLocation.Over });
        Utils_1.utils.showOppoRecBanner({ bottom: 500, left: 0, location: YZ_Constant_1.BannerLocation.Over });
        var result = null;
        if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.isWin) {
            Utils_1.utils.GameWin(CocosZ_1.cocosz.getLevelId().toString());
        }
        else if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.isFail) {
            Utils_1.utils.GameFail(CocosZ_1.cocosz.getLevelId().toString());
        }
        // //当返回值不为空，并且返回值的node不为空，会返回6个互推节点
        if (result && result.node) {
            //获取到节点后，将返回值的node节点添加到指定节点上。
            result.node.position = cc.v2(0, 0);
            this._page.addChild(result.node, 0);
        }
    };
    UIOverPage.prototype.getSkillIDName = function (id) {
        return id + (UpgradeMgr_1.upgradeMgr.upgradeSkillMaxLevelArr[id] > 1 ? "_" + (UpgradeMgr_1.upgradeMgr.upgradeSkillArr[id] + 1) : "");
    };
    UIOverPage.prototype._initPanel = function () {
        // 弹窗效果
        this._mask.opacity = 0;
        cc.tween(this._mask).to(0.2, { opacity: 120 }).start();
        this._panel.scale = 0;
        cc.tween(this._panel).to(0.3, { scale: 1 }, { easing: "backOut" }).start();
        if (UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.isValid) {
            // boss
            var kuang_boss = this._panel.getChildByName("kuang_boss");
            if (UpgradeMgr_1.upgradeMgr.bossKillId.length) {
                var kuang_boss_layout = kuang_boss.getChildByName("layout");
                if (kuang_boss_layout) {
                    kuang_boss_layout.active = true;
                    kuang_boss_layout.children.forEach(function (v, i) {
                        if (UpgradeMgr_1.upgradeMgr.bossKillId.includes(parseInt(v.name))) {
                            v.active = true;
                        }
                        else {
                            v.active = false;
                        }
                    });
                }
            }
            else {
                var kuang_boss_no = kuang_boss.getChildByName("no");
                if (kuang_boss_no) {
                    kuang_boss_no.active = true;
                }
            }
            // 技能
            var kuang_skill = this._panel.getChildByName("kuang_skill");
            if (UpgradeMgr_1.upgradeMgr.upgradeSkillArr.includes(1) || UpgradeMgr_1.upgradeMgr.upgradeSkillArr.includes(2) || UpgradeMgr_1.upgradeMgr.upgradeSkillArr.includes(3)) {
                var skill_scrollView = kuang_skill.getChildByName("skillScrollView");
                if (skill_scrollView) {
                    skill_scrollView.active = true;
                    var skill_content_1 = cc.find("view/content", skill_scrollView);
                    if (skill_content_1) {
                        UpgradeMgr_1.upgradeMgr.upgradeSkillArr.forEach(function (level, id) {
                            if (UpgradeMgr_1.upgradeMgr.upgradeSkillMaxLevelArr[id] == 3) {
                                // for (let i = 1; i <= level; i++) {
                                var icon = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_icon_" + id + "_" + level, cc.SpriteFrame);
                                if (icon) {
                                    var node = new cc.Node();
                                    var sprit = node.addComponent(cc.Sprite);
                                    sprit.spriteFrame = icon;
                                    sprit.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                                    node.setContentSize(70, 70);
                                    skill_content_1.addChild(node);
                                }
                                // }
                            }
                            else if (level > 0) {
                                var icon = CocosZ_1.cocosz.resMgr.getRes("zombieSkill_icon_" + id, cc.SpriteFrame);
                                if (icon) {
                                    var node = new cc.Node();
                                    var sprit = node.addComponent(cc.Sprite);
                                    sprit.spriteFrame = icon;
                                    sprit.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                                    node.setContentSize(70, 70);
                                    skill_content_1.addChild(node);
                                }
                            }
                        });
                    }
                }
            }
            else {
                var kuang_skill_no = kuang_skill.getChildByName("no");
                if (kuang_skill_no) {
                    kuang_skill_no.active = true;
                }
            }
            // 结算信息
            var info = cc.find("info", this._panel);
            if (info) {
                // 标题
                cc.log("iswin:", gameMgr_1.gameMgr.isWin, " isFail:", gameMgr_1.gameMgr.isFail);
                info.getChildByName('tittle').children[0].active = gameMgr_1.gameMgr.isWin;
                info.getChildByName('tittle').children[1].active = gameMgr_1.gameMgr.isFail;
                // 历史最佳
                // 游戏时间
                info.getChildByName('time2').getComponent(cc.Label).string = CocosZ_1.cocosz.StoHMS(CocosZ_1.cocosz.dataMgr.best_time);
                // 击杀数
                info.getChildByName('kill2').getComponent(cc.Label).string = CocosZ_1.cocosz.dataMgr.best_kill.toString();
                // 等级
                info.getChildByName('level2').getComponent(cc.Label).string = CocosZ_1.cocosz.dataMgr.best_level.toString();
                // 金币
                info.getChildByName('coin2').getComponent(cc.Label).string = CocosZ_1.cocosz.dataMgr.best_coin.toString();
                // 本局详情
                var newRecard1 = info.getChildByName('newRecard1');
                var newRecard2 = info.getChildByName('newRecard2');
                var newRecard3 = info.getChildByName('newRecard3');
                var newRecard4 = info.getChildByName('newRecard4');
                // 游戏时间
                info.getChildByName('time1').getComponent(cc.Label).string = CocosZ_1.cocosz.StoHMS(gameMgr_1.gameMgr.GameTime);
                if (gameMgr_1.gameMgr.GameTime > CocosZ_1.cocosz.dataMgr.best_time) {
                    info.getChildByName('time1').color = cc.Color.RED;
                    CocosZ_1.cocosz.dataMgr.best_time = gameMgr_1.gameMgr.GameTime;
                    newRecard1.active = true;
                }
                // 击杀数
                info.getChildByName('kill1').getComponent(cc.Label).string = UpgradeMgr_1.upgradeMgr.zombieKillNum.toString();
                if (UpgradeMgr_1.upgradeMgr.zombieKillNum > CocosZ_1.cocosz.dataMgr.best_kill) {
                    info.getChildByName('kill1').color = cc.Color.RED;
                    CocosZ_1.cocosz.dataMgr.best_kill = UpgradeMgr_1.upgradeMgr.zombieKillNum;
                    newRecard2.active = true;
                }
                // 等级
                info.getChildByName('level1').getComponent(cc.Label).string = UpgradeMgr_1.upgradeMgr.curLevel.toString();
                if (UpgradeMgr_1.upgradeMgr.curLevel > CocosZ_1.cocosz.dataMgr.best_level) {
                    info.getChildByName('level1').color = cc.Color.RED;
                    CocosZ_1.cocosz.dataMgr.best_level = UpgradeMgr_1.upgradeMgr.curLevel;
                    newRecard3.active = true;
                }
                // 金币
                var count = UpgradeMgr_1.upgradeMgr.zombieKillNum + UpgradeMgr_1.upgradeMgr.curLevel * 10 + Math.min(500, Math.ceil(gameMgr_1.gameMgr.GameTime / 10));
                CocosZ_1.cocosz.dataMgr.CoinCount += count;
                info.getChildByName('coin1').getComponent(cc.Label).string = count.toString();
                if (count > CocosZ_1.cocosz.dataMgr.best_coin) {
                    info.getChildByName('coin1').color = cc.Color.RED;
                    CocosZ_1.cocosz.dataMgr.best_coin = count;
                    newRecard4.active = true;
                }
            }
        }
    };
    UIOverPage.prototype._onBtnClickHandler = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        _a.sent();
                        if (this._isToHome)
                            return [2 /*return*/];
                        switch (event.target.name) {
                            case "BtnContinue": {
                                // 上报 继续游戏
                                Utils_1.utils.umaEvent("gamecontinue");
                                if (CocosZ_1.cocosz.gameMode == 6) {
                                    CocosZ_1.cocosz.gameMgr.gameStart(CocosZ_1.cocosz.dataMgr.TotoalCount_6);
                                }
                                break;
                            }
                            case "BtnHome": {
                                // 上报 返回首页
                                Utils_1.utils.umaEvent("gamereturn");
                                CocosZ_1.cocosz.sceneMgr.loadScene("Home", function () {
                                    CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIHomePage);
                                });
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UIOverPage = __decorate([
        ccclass
    ], UIOverPage);
    return UIOverPage;
}(UIPage_1.default));
exports.default = UIOverPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJT3ZlclBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLGtEQUFpRDtBQUNqRCw4Q0FBNkM7QUFDN0MsbUVBQThEO0FBQzlELDJEQUEwRDtBQUMxRCx1RUFBeUU7QUFDekUsMkNBQTBDO0FBQzFDLGlEQUFnRDtBQUNoRCxhQUFhO0FBQ2IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRS9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFNO0lBTzFDO1FBQUEsWUFDSSxrQkFBTSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxTQUU3QjtRQVRPLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsV0FBSyxHQUFZLElBQUksQ0FBQztRQUV0QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBMk16QixlQUFTLEdBQVksS0FBSyxDQUFDO1FBdk0vQixLQUFJLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztJQUNwQyxDQUFDO0lBQ1MsMkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUUxQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFN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QyxDQUFBO2dDQUNGLE1BQU07NkJBQ1Q7eUJBQ0o7Ozs7O0tBQ0o7SUF0T2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F1TzlCO0lBQUQsaUJBQUM7Q0F2T0QsQUF1T0MsQ0F2T3VDLGdCQUFNLEdBdU83QztrQkF2T29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlQYWdlIGZyb20gXCIuLi9GcmFtZXdvcmsvVUlQYWdlXCI7XHJcbmltcG9ydCB7IFBhZ2VOYW1lIH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5pbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuLi9HYW1lL2dhbWVNZ3JcIjtcclxuaW1wb3J0IHsgdXBncmFkZU1nciB9IGZyb20gXCIuLi9HYW1lL1VwZ3JhZGVNZ3JcIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlPdmVyUGFnZSBleHRlbmRzIFVJUGFnZSB7XHJcbiAgICBwcml2YXRlIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9idG5Db250aW51ZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9idG5Ib21lOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQYWdlTmFtZS5VSU92ZXJQYWdlKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9tYXNrID0gY2MuZmluZChcIk1hc2tcIiwgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgdGhpcy5fcGFuZWwgPSBjYy5maW5kKFwiUGFuZWxcIiwgdGhpcy5fcGFnZSlcclxuXHJcbiAgICAgICAgdGhpcy5fYnRuQ29udGludWUgPSBjYy5maW5kKFwiQnRuQ29udGludWVcIiwgdGhpcy5fcGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX2J0bkNvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25CdG5DbGlja0hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2J0bkhvbWUgPSBjYy5maW5kKFwiQnRuSG9tZVwiLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fYnRuSG9tZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnRuQ2xpY2tIYW5kbGVyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIumhtemdoi3nu5PnrpctXCIgKyAoZ2FtZU1nci5pc1dpbiA/IFwi6IOc5YipXCIgOiBcIuWksei0pVwiKSk7XHJcbiAgICAgICAgdGhpcy5zaG93QWQoKTtcclxuICAgICAgICB0aGlzLl9pbml0UGFuZWwoKTtcclxuICAgICAgICBjb2Nvc3ouZGF0YU1nci5Ub3RvYWxDb3VudF82Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgdXRpbHMuaGlkZVZpdm9HYW1lUG9ydGFsV2lkZ2V0KCk7XHJcbiAgICAgICAgdXRpbHMuaGlkZU9wcG9HYW1lRHJhd2VyQWRXaWRnZXQoKTtcclxuICAgICAgICB1dGlscy5hZE1hbmFnZXIuaGlkZUJsb2NrQWQoKTtcclxuICAgICAgICB1dGlscy5hZE1hbmFnZXIuaGlkZU5hdGl2ZVRyeUdhbWVXaWRnZXQoKTtcclxuICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZVNpbmdsZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5PdmVyKTtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVDdXN0b21BZCh7IGxvY2F0aW9uOiA1IH0pO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuaGlkZUN1c3RvbUFkKHsgbG9jYXRpb246IDYgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlQ3VzdG9tQWQoeyBsb2NhdGlvbjogNyB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVDdXN0b21BZCh7IGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbi5PdmVyIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvd0FkKCkge1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKEJhbm5lckxvY2F0aW9uLk92ZXIsIHsgd2lkdGg6IDAuMSwgYm90dG9tOiAxIH0pO1xyXG4gICAgICAgIC8vIOaYvuekuuenr+acqOW5v+WRilxyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93QmxvY2tBZCh7IHRvcDogNTAwIH0pO1xyXG4gICAgICAgIC8vIOaCrOa1rmljb25cclxuICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd05hdGl2ZVRyeUdhbWVXaWRnZXQoeyByaWdodDogOTUsIHRvcDogNTAwLCBzY2FsZTogMSwgcGFyZW50OiB0aGlzLl9wYWdlIH0pO1xyXG4gICAgICAgIC8vIOWOn+eUn+W5v+WRilxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiA1IH0pO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd0N1c3RvbUFkKHsgbG9jYXRpb246IDYgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93Q3VzdG9tQWQoeyBsb2NhdGlvbjogNyB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbi5PdmVyIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkupLmjqhcclxuICAgICAgICB1dGlscy5zaG93VHJ5R2FtZXNXaWRnZXQoeyBncm91cDogJ2RlZmF1bHQnLCBzY2FsZTogMSwgdG9wOiAxODAsIHJpZ2h0OiAyNSwgcGFyZW50OiB0aGlzLl9wYWdlLCBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uT3ZlciB9KTtcclxuICAgICAgICB1dGlscy5zaG93TW9yZUdhbWVzV2lkZ2V0KHsgZ3JvdXA6ICdkZWZhdWx0Jywgc2NhbGU6IDEsIHRvcDogMzAwLCBsZWZ0OiAyNSwgcGFyZW50OiB0aGlzLl9wYWdlLCBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uT3ZlciB9KTtcclxuICAgICAgICB1dGlscy5zaG93UmVjb21tZW5kR2FtZXNMaXN0KHsgZ3JvdXA6ICdkZWZhdWx0Jywgc2NhbGU6IDEsIHBhcmVudDogdGhpcy5fcGFnZSwgYm90dG9tOiAxMDAwIH0pO1xyXG4gICAgICAgIHV0aWxzLnNob3dWaXZvR2FtZVBvcnRhbFdpZGdldCh7IHRvcDogNTAwLCBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uT3ZlciB9KTtcclxuICAgICAgICB1dGlscy5zaG93T3Bwb0dhbWVEcmF3ZXJBZFdpZGdldCh7IGJvdHRvbTogNTAwLCBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uT3ZlciB9KTtcclxuICAgICAgICB1dGlscy5zaG93T3Bwb1JlY0Jhbm5lcih7IGJvdHRvbTogNTAwLCBsZWZ0OiAwLCBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uT3ZlciB9KTtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGdhbWVNZ3IgJiYgZ2FtZU1nci5pc1dpbikge1xyXG4gICAgICAgICAgICB1dGlscy5HYW1lV2luKGNvY29zei5nZXRMZXZlbElkKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lTWdyICYmIGdhbWVNZ3IuaXNGYWlsKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLkdhbWVGYWlsKGNvY29zei5nZXRMZXZlbElkKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8v5b2T6L+U5Zue5YC85LiN5Li656m677yM5bm25LiU6L+U5Zue5YC855qEbm9kZeS4jeS4uuepuu+8jOS8mui/lOWbnjbkuKrkupLmjqjoioLngrlcclxuICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5ub2RlKSB7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5Yiw6IqC54K55ZCO77yM5bCG6L+U5Zue5YC855qEbm9kZeiKgueCuea3u+WKoOWIsOaMh+WumuiKgueCueS4iuOAglxyXG4gICAgICAgICAgICByZXN1bHQubm9kZS5wb3NpdGlvbiA9IGNjLnYyKDAsIDApXHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2UuYWRkQ2hpbGQocmVzdWx0Lm5vZGUsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbElETmFtZShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGlkICsgKHVwZ3JhZGVNZ3IudXBncmFkZVNraWxsTWF4TGV2ZWxBcnJbaWRdID4gMSA/IFwiX1wiICsgKHVwZ3JhZGVNZ3IudXBncmFkZVNraWxsQXJyW2lkXSArIDEpIDogXCJcIilcclxuICAgIH1cclxuICAgIF9pbml0UGFuZWwoKSB7XHJcbiAgICAgICAgLy8g5by556qX5pWI5p6cXHJcbiAgICAgICAgdGhpcy5fbWFzay5vcGFjaXR5ID0gMDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLl9tYXNrKS50bygwLjIsIHsgb3BhY2l0eTogMTIwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5fcGFuZWwuc2NhbGUgPSAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuX3BhbmVsKS50bygwLjMsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwiYmFja091dFwiIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGlmICh1cGdyYWRlTWdyICYmIHVwZ3JhZGVNZ3IuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAvLyBib3NzXHJcbiAgICAgICAgICAgIGxldCBrdWFuZ19ib3NzID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJrdWFuZ19ib3NzXCIpO1xyXG4gICAgICAgICAgICBpZiAodXBncmFkZU1nci5ib3NzS2lsbElkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGt1YW5nX2Jvc3NfbGF5b3V0ID0ga3VhbmdfYm9zcy5nZXRDaGlsZEJ5TmFtZShcImxheW91dFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChrdWFuZ19ib3NzX2xheW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGt1YW5nX2Jvc3NfbGF5b3V0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAga3VhbmdfYm9zc19sYXlvdXQuY2hpbGRyZW4uZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBncmFkZU1nci5ib3NzS2lsbElkLmluY2x1ZGVzKHBhcnNlSW50KHYubmFtZSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBrdWFuZ19ib3NzX25vID0ga3VhbmdfYm9zcy5nZXRDaGlsZEJ5TmFtZShcIm5vXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGt1YW5nX2Jvc3Nfbm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBrdWFuZ19ib3NzX25vLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5oqA6IO9XHJcbiAgICAgICAgICAgIGxldCBrdWFuZ19za2lsbCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwia3Vhbmdfc2tpbGxcIik7XHJcbiAgICAgICAgICAgIGlmICh1cGdyYWRlTWdyLnVwZ3JhZGVTa2lsbEFyci5pbmNsdWRlcygxKSB8fCB1cGdyYWRlTWdyLnVwZ3JhZGVTa2lsbEFyci5pbmNsdWRlcygyKSB8fCB1cGdyYWRlTWdyLnVwZ3JhZGVTa2lsbEFyci5pbmNsdWRlcygzKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsX3Njcm9sbFZpZXcgPSBrdWFuZ19za2lsbC5nZXRDaGlsZEJ5TmFtZShcInNraWxsU2Nyb2xsVmlld1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChza2lsbF9zY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxfc2Nyb2xsVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBza2lsbF9jb250ZW50ID0gY2MuZmluZChcInZpZXcvY29udGVudFwiLCBza2lsbF9zY3JvbGxWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxfY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGdyYWRlTWdyLnVwZ3JhZGVTa2lsbEFyci5mb3JFYWNoKChsZXZlbCwgaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGdyYWRlTWdyLnVwZ3JhZGVTa2lsbE1heExldmVsQXJyW2lkXSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDE7IGkgPD0gbGV2ZWw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWNvbiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwiem9tYmllU2tpbGxfaWNvbl9cIiArIGlkICsgXCJfXCIgKyBsZXZlbCwgY2MuU3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwcml0ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0LnNwcml0ZUZyYW1lID0gaWNvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0LnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0Q29udGVudFNpemUoNzAsIDcwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsX2NvbnRlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpY29uID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJ6b21iaWVTa2lsbF9pY29uX1wiICsgaWQsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0LnNwcml0ZUZyYW1lID0gaWNvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXQuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKDcwLCA3MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsX2NvbnRlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBrdWFuZ19za2lsbF9ubyA9IGt1YW5nX3NraWxsLmdldENoaWxkQnlOYW1lKFwibm9cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoa3Vhbmdfc2tpbGxfbm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBrdWFuZ19za2lsbF9uby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOe7k+eul+S/oeaBr1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IGNjLmZpbmQoXCJpbmZvXCIsIHRoaXMuX3BhbmVsKTtcclxuICAgICAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgICAgIC8vIOagh+mimFxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiaXN3aW46XCIsIGdhbWVNZ3IuaXNXaW4sIFwiIGlzRmFpbDpcIixnYW1lTWdyLmlzRmFpbClcclxuICAgICAgICAgICAgICAgIGluZm8uZ2V0Q2hpbGRCeU5hbWUoJ3RpdHRsZScpLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGdhbWVNZ3IuaXNXaW47XHJcbiAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCd0aXR0bGUnKS5jaGlsZHJlblsxXS5hY3RpdmUgPSBnYW1lTWdyLmlzRmFpbDtcclxuICAgICAgICAgICAgICAgIC8vIOWOhuWPsuacgOS9s1xyXG4gICAgICAgICAgICAgICAgLy8g5ri45oiP5pe26Ze0XHJcbiAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCd0aW1lMicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29jb3N6LlN0b0hNUyhjb2Nvc3ouZGF0YU1nci5iZXN0X3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8g5Ye75p2A5pWwXHJcbiAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCdraWxsMicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29jb3N6LmRhdGFNZ3IuYmVzdF9raWxsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDnrYnnuqdcclxuICAgICAgICAgICAgICAgIGluZm8uZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsMicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29jb3N6LmRhdGFNZ3IuYmVzdF9sZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeR5biBXHJcbiAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCdjb2luMicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29jb3N6LmRhdGFNZ3IuYmVzdF9jb2luLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDmnKzlsYDor6bmg4VcclxuICAgICAgICAgICAgICAgIGxldCBuZXdSZWNhcmQxID0gaW5mby5nZXRDaGlsZEJ5TmFtZSgnbmV3UmVjYXJkMScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1JlY2FyZDIgPSBpbmZvLmdldENoaWxkQnlOYW1lKCduZXdSZWNhcmQyJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UmVjYXJkMyA9IGluZm8uZ2V0Q2hpbGRCeU5hbWUoJ25ld1JlY2FyZDMnKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdSZWNhcmQ0ID0gaW5mby5nZXRDaGlsZEJ5TmFtZSgnbmV3UmVjYXJkNCcpO1xyXG4gICAgICAgICAgICAgICAgLy8g5ri45oiP5pe26Ze0XHJcbiAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCd0aW1lMScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29jb3N6LlN0b0hNUyhnYW1lTWdyLkdhbWVUaW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLkdhbWVUaW1lID4gY29jb3N6LmRhdGFNZ3IuYmVzdF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mby5nZXRDaGlsZEJ5TmFtZSgndGltZTEnKS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5iZXN0X3RpbWUgPSBnYW1lTWdyLkdhbWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlY2FyZDEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWHu+adgOaVsFxyXG4gICAgICAgICAgICAgICAgaW5mby5nZXRDaGlsZEJ5TmFtZSgna2lsbDEnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHVwZ3JhZGVNZ3Iuem9tYmllS2lsbE51bS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVwZ3JhZGVNZ3Iuem9tYmllS2lsbE51bSA+IGNvY29zei5kYXRhTWdyLmJlc3Rfa2lsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8uZ2V0Q2hpbGRCeU5hbWUoJ2tpbGwxJykuY29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuYmVzdF9raWxsID0gdXBncmFkZU1nci56b21iaWVLaWxsTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlY2FyZDIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOetiee6p1xyXG4gICAgICAgICAgICAgICAgaW5mby5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwxJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB1cGdyYWRlTWdyLmN1ckxldmVsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodXBncmFkZU1nci5jdXJMZXZlbCA+IGNvY29zei5kYXRhTWdyLmJlc3RfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCdsZXZlbDEnKS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5iZXN0X2xldmVsID0gdXBncmFkZU1nci5jdXJMZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSZWNhcmQzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDph5HluIFcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHVwZ3JhZGVNZ3Iuem9tYmllS2lsbE51bSArIHVwZ3JhZGVNZ3IuY3VyTGV2ZWwgKiAxMCArIE1hdGgubWluKDUwMCwgTWF0aC5jZWlsKGdhbWVNZ3IuR2FtZVRpbWUgLyAxMCkpO1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IGNvdW50O1xyXG4gICAgICAgICAgICAgICAgaW5mby5nZXRDaGlsZEJ5TmFtZSgnY29pbjEnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvdW50LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiBjb2Nvc3ouZGF0YU1nci5iZXN0X2NvaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKCdjb2luMScpLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLmJlc3RfY29pbiA9IGNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlY2FyZDQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc1RvSG9tZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBhc3luYyBfb25CdG5DbGlja0hhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGF3YWl0IGNvY29zei5hdWRpb01nci5wbGF5QnRuRWZmZWN0KCkuY2F0Y2goKTtcclxuICAgICAgICBpZiAodGhpcy5faXNUb0hvbWUpIHJldHVybjtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5Db250aW51ZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAvLyDkuIrmiqUg57un57ut5ri45oiPXHJcbiAgICAgICAgICAgICAgICB1dGlscy51bWFFdmVudChcImdhbWVjb250aW51ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5nYW1lTWdyLmdhbWVTdGFydChjb2Nvc3ouZGF0YU1nci5Ub3RvYWxDb3VudF82KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5Ib21lXCI6IHtcclxuICAgICAgICAgICAgICAgIC8vIOS4iuaKpSDov5Tlm57pppbpobVcclxuICAgICAgICAgICAgICAgIHV0aWxzLnVtYUV2ZW50KFwiZ2FtZXJldHVyblwiKTtcclxuICAgICAgICAgICAgICAgIGNvY29zei5zY2VuZU1nci5sb2FkU2NlbmUoXCJIb21lXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhZ2UoUGFnZU5hbWUuVUlIb21lUGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19