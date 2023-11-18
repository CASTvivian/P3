"use strict";
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