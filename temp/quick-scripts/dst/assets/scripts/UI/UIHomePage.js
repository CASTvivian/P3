
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIHomePage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b644snyrFBGKi85JS90G3O', 'UIHomePage');
// scripts/UI/UIHomePage.ts

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
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var YZ_Constant_1 = require("../../common-plugin/Scripts/YZ_Constant");
var ani_1 = require("../Game/ani");
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var FlyCoin_1 = require("../Framework/FlyCoin");
var gameDate_1 = require("../Game/gameDate");
var weapon_1 = require("../Game/weapon");
var Msg_1 = require("../Framework/Msg");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIHomePage = /** @class */ (function (_super) {
    __extends(UIHomePage, _super);
    function UIHomePage() {
        var _this = _super.call(this, Constant_1.PageName.UIHomePage) || this;
        _this._icon_set = null;
        _this._frame_set = null;
        _this._btnAudio = null;
        _this._btnShake = null;
        _this._btnSkin = null;
        _this._btnSkinAd = null;
        _this._btnWeapon = null;
        _this._btnWeaponAd = null;
        _this._playerAni = null;
        _this._aniUpgrade = null;
        _this._aniCaidai = null;
        _this._weaponScroll = null;
        _this._weaponList = [];
        _this._ani_arrow = null;
        _this._skinInfo_name = null;
        _this._skinInfo_xuedi = null;
        _this._skinInfo_value1 = null;
        _this._skinInfo_value2 = null;
        _this._skinInfo_change1 = null;
        _this._skinInfo_change2 = null;
        _this._skinInfo_level_pro = null;
        _this._weaponInfo_name = null;
        _this._weaponInfo_value0 = null;
        _this._weaponInfo_value1 = null;
        _this._weaponInfo_value2 = null;
        _this._weaponInfo_value3 = null;
        _this._weaponInfo_change0 = null;
        _this._weaponInfo_change1 = null;
        _this._weaponInfo_change2 = null;
        _this._weaponInfo_change3 = null;
        _this._weaponInfo_level_pro = null;
        _this._showSkinId = CocosZ_1.cocosz.dataMgr.CurSkinId;
        _this._showWeaponId = CocosZ_1.cocosz.dataMgr.CurRange;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIHomePage.prototype.onLoad = function () {
        var _this = this;
        console.log("UIHOMEPAGE ONLOAD");
        // 按钮
        var btnNames = ["BtnSet", "BtnSet/frame_set/BtnAudio", "BtnSet/frame_set/BtnShake", "ditai/BtnLeft", "ditai/BtnRight", "BtnSkin", "BtnWeapon", "BtnSkinAd", "BtnWeaponAd", "BtnCJ", "BtnSign", "BtnTime", "BtnGameStart"];
        btnNames.forEach(function (name) {
            var btn = cc.find(name, _this._page);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, _this._onBtnClickHandler, _this);
                if (btn.name == "BtnSet") {
                    _this._icon_set = cc.find("Background/icon_set", btn);
                    _this._frame_set = cc.find("frame_set", btn);
                }
                else if (btn.name == "BtnAudio") {
                    _this._btnAudio = btn;
                    _this._updateAudioBtn(false);
                }
                else if (btn.name == "BtnShake") {
                    _this._btnShake = btn;
                    _this._updatShakeBtn();
                }
                else if (btn.name == "BtnSkin") {
                    _this._btnSkin = btn;
                }
                else if (btn.name == "BtnWeapon") {
                    _this._btnWeapon = btn;
                }
                else if (btn.name == "BtnSkinAd") {
                    _this._btnSkinAd = btn;
                    btn.active = CocosZ_1.cocosz.isADON;
                }
                else if (btn.name == "BtnWeaponAd") {
                    _this._btnWeaponAd = btn;
                    btn.active = CocosZ_1.cocosz.isADON;
                }
            }
        });
        // 角色动画
        this._playerAni = cc.find("ditai/skin_all/ani", this._page).getComponent(ani_1.default);
        // 彩带动画
        this._aniCaidai = cc.find("ditai/aniCaidai", this._page).getComponent(sp.Skeleton);
        this._aniCaidai.setCompleteListener(function () { _this._aniCaidai.node.active = false; });
        // 升级动画
        this._aniUpgrade = cc.find("ditai/aniUpgrade", this._page).getComponent(sp.Skeleton);
        this._aniUpgrade.setCompleteListener(function () { _this._aniUpgrade.node.active = false; });
        // 武器
        this._weaponScroll = cc.find("weaponScroll", this._page);
        var content = cc.find("view/content", this._weaponScroll);
        for (var i = 0; i < content.children.length; i++) {
            this._weaponList.push(content.children[i]);
            this._weaponList[i].on(cc.Node.EventType.TOUCH_END, function (e) {
                CocosZ_1.cocosz.audioMgr.playBtnEffect();
                var id = gameDate_1.default.Weapon[e.target.name].id;
                _this._showWeaponId = id;
                _this._updateWeapon();
                _this._updateWeaponFrame();
                var weaponInfo = CocosZ_1.cocosz.dataMgr.getGunInfo(id);
                if (weaponInfo && weaponInfo.State == 1) {
                    CocosZ_1.cocosz.dataMgr.curWeapon = id;
                }
            }, this);
        }
        var iconLayer = cc.find("view/iconLayer", this._weaponScroll);
        if (iconLayer)
            iconLayer.setParent(content);
        this._ani_arrow = cc.find("view/ani_arrow", this._weaponScroll);
        if (this._ani_arrow)
            this._ani_arrow.setParent(content);
        // 属性
        this._skinInfo_name = cc.find("ditai/skinName", this._page).getComponent(cc.Sprite);
        this._skinInfo_xuedi = cc.find("jueseshuxing/xuedi", this._page);
        this._skinInfo_value1 = cc.find("jueseshuxing/value1", this._page).getComponent(cc.Label);
        this._skinInfo_value2 = cc.find("jueseshuxing/value2", this._page).getComponent(cc.Label);
        this._skinInfo_change1 = cc.find("jueseshuxing/change1", this._page).getComponent(cc.Label);
        this._skinInfo_change2 = cc.find("jueseshuxing/change2", this._page).getComponent(cc.Label);
        this._skinInfo_level_pro = cc.find("jueseshuxing/levelProgressBar", this._page).getComponent(cc.ProgressBar);
        this._weaponInfo_name = cc.find("wuqishuxing/weaponName", this._page).getComponent(cc.Sprite);
        this._weaponInfo_value0 = cc.find("wuqishuxing/value0", this._page).getComponent(cc.Label);
        this._weaponInfo_value1 = cc.find("wuqishuxing/value1", this._page).getComponent(cc.Label);
        this._weaponInfo_value2 = cc.find("wuqishuxing/value2", this._page).getComponent(cc.Label);
        this._weaponInfo_value3 = cc.find("wuqishuxing/value3", this._page).getComponent(cc.Label);
        this._weaponInfo_change0 = cc.find("wuqishuxing/change0", this._page).getComponent(cc.Label);
        this._weaponInfo_change1 = cc.find("wuqishuxing/change1", this._page).getComponent(cc.Label);
        this._weaponInfo_change2 = cc.find("wuqishuxing/change2", this._page).getComponent(cc.Label);
        this._weaponInfo_change3 = cc.find("wuqishuxing/change3", this._page).getComponent(cc.Label);
        this._weaponInfo_level_pro = cc.find("wuqishuxing/levelProgressBar", this._page).getComponent(cc.ProgressBar);
    };
    UIHomePage.prototype._canGetBonus = function () {
        return (new Date().toDateString() != CocosZ_1.cocosz.dataMgr.LastDailyBonusTime);
    };
    UIHomePage.prototype._aniEffect = function (type) {
        switch (type) {
            case 1: {
                if (this._aniUpgrade) {
                    this._aniUpgrade.node.active = true;
                    this._aniUpgrade.setAnimation(0, "animation", false);
                    CocosZ_1.cocosz.audioMgr.playEffect("ui_upgrade");
                }
                break;
            }
            case 2: {
                if (this._aniCaidai) {
                    this._aniCaidai.node.active = true;
                    this._aniCaidai.setAnimation(0, "animation", false);
                    CocosZ_1.cocosz.audioMgr.playEffect("ui_caidai");
                }
                break;
            }
        }
    };
    UIHomePage.prototype.onOpen = function () {
        var _this = this;
        cc.log("home open !");
        // 上报游戏首页
        Utils_1.utils.umaEvent("gamehome");
        Utils_1.utils.SendEvent("页面-首页");
        this._updatePlayer();
        this._updateWeapon();
        this._updateWeaponFrame();
        // 广告
        Utils_1.utils.showYzRealNameAuthPanel();
        Utils_1.utils.showPrivacyPanel({ group: "default", parent: this._page });
        Utils_1.utils.registerServerInitEvent(function () {
            // 验证服务器配置为自动弹签到，并且当前可以签到
            if (Utils_1.utils.checkAutoSign() && _this._canGetBonus()) {
                CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UISignPanel);
            }
            _this.showAd();
        }, this);
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
    };
    UIHomePage.prototype.onClose = function () {
        cc.game.targetOff(this);
        Utils_1.utils.hideVivoGamePortalWidget();
        Utils_1.utils.hideOppoGameDrawerAdWidget();
        Utils_1.utils.adManager.hideBlockAd();
        Utils_1.utils.adManager.hideNativeTryGameWidget();
        Utils_1.utils.adManager.HideSingleNativeAd();
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.adManager.hideCustomAd({ location: 1 });
            Utils_1.utils.adManager.hideCustomAd({ location: 2 });
        }
        else if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.adManager.hideCustomAd({ location: YZ_Constant_1.BannerLocation.Home });
        }
    };
    UIHomePage.prototype.showAd = function () {
        if (CocosZ_1.cocosz.isShowAd) {
            if (PlatUtils_1.default.IsWechat) {
                Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Home);
            }
            else {
                Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Home, { width: 0.1, bottom: 1 });
            }
            // 原生广告
            if (PlatUtils_1.default.IsWechat) {
                Utils_1.utils.adManager.showCustomAd({ location: 1 });
                Utils_1.utils.adManager.showCustomAd({ location: 2 });
            }
            else if (PlatUtils_1.default.IsVIVO) {
                Utils_1.utils.adManager.showCustomAd({ location: YZ_Constant_1.BannerLocation.Home });
            }
            Utils_1.utils.adManager.showNativeTryGameWidget({ right: 50, top: 800, scale: 1, parent: this._page });
            Utils_1.utils.adManager.ShowSingleNativeAd({});
            Utils_1.utils.adManager.showBlockAd({ right: 50, top: 500, showNum: 1 });
            Utils_1.utils.showMoreGamesWidget({ group: 'default', scale: 1, bottom: 300, left: 50, parent: this._page, location: YZ_Constant_1.BannerLocation.Home });
            Utils_1.utils.showTryGamesWidget({ group: 'default', scale: 1, bottom: 350, right: 50, parent: this._page, location: YZ_Constant_1.BannerLocation.Home });
            Utils_1.utils.showVivoGamePortalWidget({ top: 500, location: YZ_Constant_1.BannerLocation.Home });
            Utils_1.utils.showOppoGameDrawerAdWidget({ top: 500, location: YZ_Constant_1.BannerLocation.Home });
            Utils_1.utils.showCreateShortcutWidget(null, { group: 'default', scale: 1, left: 0, top: 500, parent: this._page });
            Utils_1.utils.showPrivacyWidget({ group: "default", top: 0, left: 0, parent: this._page.getChildByName("PrivacyWidget"), color: cc.Color.BLACK });
        }
    };
    UIHomePage.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
            case Constant_1.default.E_Fly_Coin: {
                this._flyCoins(event.iconName, event.frameNodeName);
                break;
            }
            case Constant_1.default.E_CJ_SKIN: {
                this._showSkinId = CocosZ_1.cocosz.dataMgr.CurSkinId;
                this._updatePlayer();
                break;
            }
            case Constant_1.default.E_CJ_Weapon: {
                this._showWeaponId = CocosZ_1.cocosz.dataMgr.curWeapon;
                this._updateWeapon();
                this._updateWeaponFrame();
                break;
            }
        }
    };
    UIHomePage.prototype._onBtnClickHandler = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var skinInfo, skinInfo, showSkinInfo, showSKinKey, showWeaponInfo, showWeaponKey, t;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        _a.sent();
                        switch (event.target.name) {
                            case "BtnGameStart": {
                                CocosZ_1.cocosz.gameMode = 6;
                                CocosZ_1.cocosz.gameMgr.gameStart(CocosZ_1.cocosz.getLevelId());
                                break;
                            }
                            case "BtnLeft": {
                                this._showSkinId--;
                                if (this._showSkinId < 0)
                                    this._showSkinId = 11;
                                this._updatePlayer();
                                skinInfo = CocosZ_1.cocosz.dataMgr.getSkinInfo(this._showSkinId);
                                if (skinInfo && skinInfo.State == 1) {
                                    CocosZ_1.cocosz.dataMgr.CurSkinId = this._showSkinId;
                                }
                                break;
                            }
                            case "BtnRight": {
                                this._showSkinId++;
                                if (this._showSkinId > 11)
                                    this._showSkinId = 0;
                                this._updatePlayer();
                                skinInfo = CocosZ_1.cocosz.dataMgr.getSkinInfo(this._showSkinId);
                                if (skinInfo && skinInfo.State == 1) {
                                    CocosZ_1.cocosz.dataMgr.CurSkinId = this._showSkinId;
                                }
                                break;
                            }
                            case "BtnSkin": {
                                showSkinInfo = CocosZ_1.cocosz.dataMgr.getSkinInfo(this._showSkinId);
                                showSKinKey = "" + (this._showSkinId + 1);
                                if (showSkinInfo.State == 0) {
                                    // 金币
                                    if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.Gold) {
                                        if (CocosZ_1.cocosz.dataMgr.CoinCount >= gameDate_1.default.SkinMess[showSKinKey].price) {
                                            CocosZ_1.cocosz.dataMgr.CoinCount -= gameDate_1.default.SkinMess[showSKinKey].price;
                                            Msg_1.default.Show(i18n.t("msg.gxhdxjs")); //恭喜获得新角色
                                            CocosZ_1.cocosz.dataMgr.CurSkinId = this._showSkinId;
                                            this._updatePlayer();
                                            this._aniEffect(2);
                                        }
                                        else {
                                            this.showCoinPanel(false);
                                        }
                                    }
                                    // 钻石
                                    else if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.Diamond) {
                                        if (CocosZ_1.cocosz.dataMgr.DiamondCount >= gameDate_1.default.SkinMess[showSKinKey].price) {
                                            CocosZ_1.cocosz.dataMgr.DiamondCount -= gameDate_1.default.SkinMess[showSKinKey].price;
                                            Msg_1.default.Show(i18n.t("msg.gxhdxjs")); //恭喜获得新角色
                                            CocosZ_1.cocosz.dataMgr.CurSkinId = this._showSkinId;
                                            this._updatePlayer();
                                            this._aniEffect(2);
                                        }
                                        else {
                                            this.showCoinPanel(true);
                                        }
                                    }
                                    // 转盘奖励
                                    else if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.ZhuanPanReward) {
                                        CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UITurntablePanel);
                                    }
                                }
                                // 升级
                                else if (showSkinInfo.Level < 6) {
                                    if (CocosZ_1.cocosz.dataMgr.CoinCount >= Constant_1.default.skinLevelPriceArr[showSkinInfo.Level]) {
                                        CocosZ_1.cocosz.dataMgr.CoinCount -= Constant_1.default.skinLevelPriceArr[showSkinInfo.Level];
                                        showSkinInfo.Level++;
                                        CocosZ_1.cocosz.dataMgr.setSkinInfo(showSkinInfo.Id, showSkinInfo);
                                        this._updatePlayer();
                                        this._aniEffect(1);
                                    }
                                    else {
                                        this.showCoinPanel(false);
                                    }
                                }
                                break;
                            }
                            case "BtnWeapon": {
                                showWeaponInfo = CocosZ_1.cocosz.dataMgr.getGunInfo(this._showWeaponId);
                                showWeaponKey = weapon_1.default.WeaponName[this._showWeaponId];
                                if (showWeaponInfo.State == 0) {
                                    // 金币
                                    if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.Gold) {
                                        if (CocosZ_1.cocosz.dataMgr.CoinCount >= gameDate_1.default.Weapon[showWeaponKey].price) {
                                            CocosZ_1.cocosz.dataMgr.CoinCount -= gameDate_1.default.Weapon[showWeaponKey].price;
                                            Msg_1.default.Show(i18n.t("msg.gxhdxwq"));
                                            CocosZ_1.cocosz.dataMgr.curWeapon = this._showWeaponId;
                                            this._updateWeapon();
                                            this._updateWeaponFrame();
                                            this._aniEffect(2);
                                        }
                                        else {
                                            this.showCoinPanel(false);
                                        }
                                    }
                                    // 钻石
                                    else if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.Diamond) {
                                        if (CocosZ_1.cocosz.dataMgr.DiamondCount >= gameDate_1.default.Weapon[showWeaponKey].price) {
                                            CocosZ_1.cocosz.dataMgr.DiamondCount -= gameDate_1.default.Weapon[showWeaponKey].price;
                                            Msg_1.default.Show(i18n.t("msg.gxhdxwq"));
                                            CocosZ_1.cocosz.dataMgr.curWeapon = this._showWeaponId;
                                            this._updateWeapon();
                                            this._updateWeaponFrame();
                                            this._aniEffect(2);
                                        }
                                        else {
                                            this.showCoinPanel(true);
                                        }
                                    }
                                    // 转盘奖励
                                    else if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.ZhuanPanReward) {
                                        CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UITurntablePanel);
                                    }
                                }
                                // 升级
                                else if (showWeaponInfo.Level < 3) {
                                    if (CocosZ_1.cocosz.dataMgr.CoinCount >= Constant_1.default.weaponLevelPriceArr[showWeaponInfo.Level]) {
                                        CocosZ_1.cocosz.dataMgr.CoinCount -= Constant_1.default.weaponLevelPriceArr[showWeaponInfo.Level];
                                        showWeaponInfo.Level++;
                                        CocosZ_1.cocosz.dataMgr.setGunInfo(showWeaponInfo.Id, showWeaponInfo);
                                        this._updateWeapon();
                                        this._updateWeaponFrame();
                                        this._aniEffect(1);
                                    }
                                    else {
                                        this.showCoinPanel(false);
                                    }
                                }
                                break;
                            }
                            case "BtnSkinAd": {
                                Utils_1.utils.SendEvent("视频-皮肤解锁-播放");
                                CocosZ_1.cocosz.watchAD(function () {
                                    // 视频成功 
                                    Utils_1.utils.SendEvent("视频-皮肤解锁-成功");
                                    var showSkinInfo = CocosZ_1.cocosz.dataMgr.getSkinInfo(_this._showSkinId);
                                    var showSkinKey = "" + (_this._showSkinId + 1);
                                    if (!!showSkinInfo && !!gameDate_1.default.SkinMess[showSkinKey] && !!gameDate_1.default.SkinMess[showSkinKey].videoCount) {
                                        showSkinInfo.VideoCount++;
                                        CocosZ_1.cocosz.dataMgr.setSkinInfo(_this._showSkinId, showSkinInfo);
                                        if (showSkinInfo.VideoCount >= gameDate_1.default.SkinMess[showSkinKey].videoCount) {
                                            Msg_1.default.Show(i18n.t("msg.gxhdxjs")); //恭喜获得新角色
                                            CocosZ_1.cocosz.dataMgr.CurSkinId = _this._showSkinId;
                                            _this._aniEffect(2);
                                        }
                                        else {
                                            Msg_1.default.Show(i18n.t("msg.jswc") + showSkinInfo.VideoCount + "/" + gameDate_1.default.SkinMess[showSkinKey].videoCount);
                                        }
                                        // 更新玩家信息
                                        _this._updatePlayer();
                                    }
                                }, function () {
                                    // 视频失败
                                    Utils_1.utils.SendEvent("视频-皮肤解锁-失败");
                                });
                                break;
                            }
                            case "BtnWeaponAd": {
                                Utils_1.utils.SendEvent("视频-武器解锁-播放");
                                CocosZ_1.cocosz.watchAD(function () {
                                    // 视频成功 
                                    Utils_1.utils.SendEvent("视频-武器解锁-成功");
                                    var showWeaponInfo = CocosZ_1.cocosz.dataMgr.getGunInfo(_this._showWeaponId);
                                    var showWeaponKey = weapon_1.default.WeaponName[_this._showWeaponId];
                                    if (!!showWeaponInfo && !!gameDate_1.default.Weapon[showWeaponKey] && !!gameDate_1.default.Weapon[showWeaponKey].videoCount) {
                                        showWeaponInfo.VideoCount++;
                                        CocosZ_1.cocosz.dataMgr.setGunInfo(_this._showWeaponId, showWeaponInfo);
                                        if (showWeaponInfo.VideoCount >= gameDate_1.default.Weapon[showWeaponKey].videoCount) {
                                            Msg_1.default.Show(i18n.t("msg.gxhdxwq"));
                                            CocosZ_1.cocosz.dataMgr.curWeapon = _this._showWeaponId;
                                            _this._aniEffect(2);
                                        }
                                        else {
                                            Msg_1.default.Show(i18n.t("msg.jswc") + showWeaponInfo.VideoCount + "/" + gameDate_1.default.Weapon[showWeaponKey].videoCount);
                                        }
                                        // 更新武器信息
                                        _this._updateWeapon();
                                        _this._updateWeaponFrame();
                                    }
                                }, function () {
                                    // 视频失败
                                    Utils_1.utils.SendEvent("视频-武器解锁-失败");
                                });
                                break;
                            }
                            case "BtnCJ": {
                                CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UITurntablePanel);
                                break;
                            }
                            case "BtnSign": {
                                CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UISignPanel);
                                break;
                            }
                            case "BtnTime": {
                                CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UITimePanel);
                                break;
                            }
                            case "BtnSet": {
                                this._icon_set.stopAllActions();
                                this._frame_set.stopAllActions();
                                t = (this._frame_set.scaleY ? this._frame_set.scaleY : 1) / 2;
                                cc.tween(this._icon_set)
                                    .to(t, { angle: (this._frame_set.scaleY ? 90 : -90) }, { easing: "sineInOut" })
                                    .start();
                                cc.tween(this._frame_set)
                                    .to(t, { scaleY: this._frame_set.scaleY ? 0 : 1 }, { easing: "sineInOut" })
                                    .start();
                                break;
                            }
                            case "BtnAudio": {
                                CocosZ_1.cocosz.dataMgr.AudioOn = !CocosZ_1.cocosz.dataMgr.AudioOn;
                                this._updateAudioBtn();
                                break;
                            }
                            case "BtnShake": {
                                CocosZ_1.cocosz.dataMgr.ShakeOn = !CocosZ_1.cocosz.dataMgr.ShakeOn;
                                this._updatShakeBtn();
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UIHomePage.prototype._updatePlayer = function () {
        var _this = this;
        cc.log("showSkinID: ", this._showSkinId);
        this._playerAni.setSkinById(this._showSkinId);
        // 属性
        // 角色名字
        this._skinInfo_name.spriteFrame = CocosZ_1.cocosz.resMgr.getRes("p_" + (this._showSkinId + 1), cc.SpriteFrame);
        // 角色属性
        var curSkinInfo = CocosZ_1.cocosz.dataMgr.getSkinInfo(CocosZ_1.cocosz.dataMgr.CurSkinId);
        var showSkinInfo = CocosZ_1.cocosz.dataMgr.getSkinInfo(this._showSkinId);
        var curLevel = curSkinInfo.Level;
        var showLevel = showSkinInfo.Level;
        var curSkinKey = "" + (CocosZ_1.cocosz.dataMgr.CurSkinId + 1);
        var showSKinKey = "" + (this._showSkinId + 1);
        // 血滴
        this._skinInfo_xuedi.children.forEach(function (v, i) {
            if (i < gameDate_1.default.SkinMess[showSKinKey].xuedi) {
                _this._skinInfo_xuedi.children[i].opacity = 255;
            }
            else {
                _this._skinInfo_xuedi.children[i].opacity = 0;
            }
        });
        // 攻击力
        this._skinInfo_value1.string = "" + gameDate_1.default.SkinMess[showSKinKey].atk[showLevel];
        // 移动
        this._skinInfo_value2.string = "" + gameDate_1.default.SkinMess[showSKinKey].speed[showLevel];
        // 攻击变化
        var num1 = gameDate_1.default.SkinMess[showSKinKey].atk[showLevel] - gameDate_1.default.SkinMess[curSkinKey].atk[curLevel];
        if (num1 < 0) {
            this._skinInfo_change1.string = "" + num1;
            this._skinInfo_change1.node.children[0].active = false;
            this._skinInfo_change1.node.children[1].active = true;
            this._skinInfo_change1.node.color = cc.Color.RED;
            this._skinInfo_change1.node.opacity = 255;
        }
        else if (num1 == 0) {
            this._skinInfo_change1.node.opacity = 0;
        }
        else {
            this._skinInfo_change1.string = "+" + num1;
            this._skinInfo_change1.node.children[0].active = true;
            this._skinInfo_change1.node.children[1].active = false;
            this._skinInfo_change1.node.color = cc.Color.GREEN;
            this._skinInfo_change1.node.opacity = 255;
        }
        // 移动变化 
        var num2 = gameDate_1.default.SkinMess[showSKinKey].speed[showLevel] - gameDate_1.default.SkinMess[curSkinKey].speed[curLevel];
        if (num2 < 0) {
            this._skinInfo_change2.string = "" + num2;
            this._skinInfo_change2.node.children[0].active = false;
            this._skinInfo_change2.node.children[1].active = true;
            this._skinInfo_change2.node.color = cc.Color.RED;
            this._skinInfo_change2.node.opacity = 255;
        }
        else if (num2 == 0) {
            this._skinInfo_change2.node.opacity = 0;
        }
        else {
            this._skinInfo_change2.string = "+" + num2;
            this._skinInfo_change2.node.children[0].active = true;
            this._skinInfo_change2.node.children[1].active = false;
            this._skinInfo_change2.node.color = cc.Color.GREEN;
            this._skinInfo_change2.node.opacity = 255;
        }
        // 等级
        this._skinInfo_level_pro.progress = showLevel / 6;
        // 按钮变化
        if (showSkinInfo) {
            this._btnSkin.children.forEach(function (v) { return v.active = false; });
            var btn_huang = this._btnSkin.getChildByName("btn_huang");
            var btn_huang_small = this._btnSkin.getChildByName("btn_huang_small");
            var btn_hong = this._btnSkin.getChildByName("btn_hong");
            var txt_buy = this._btnSkin.getChildByName("txt_buy");
            var txt_sjwc = this._btnSkin.getChildByName("txt_sjwc");
            var txt_upgrade = this._btnSkin.getChildByName("txt_upgrade");
            var txt_zpjl = this._btnSkin.getChildByName("txt_zpjl");
            var icon_jinbi = this._btnSkin.getChildByName("icon_jinbi");
            var icon_zuanshi = this._btnSkin.getChildByName("icon_zuanshi");
            var price = this._btnSkin.getChildByName("price");
            // 购买
            if (showSkinInfo.State == 0) {
                if (gameDate_1.default.SkinMess[showSKinKey] && gameDate_1.default.SkinMess[showSKinKey].videoCount) {
                    this._btnSkin.x = -350;
                    this._btnSkin.width = 169;
                    if (btn_huang_small)
                        btn_huang_small.active = true;
                    // 金币
                    if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.Gold) {
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.SkinMess[showSKinKey].price;
                        }
                    }
                    // 钻石
                    else if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.Diamond) {
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.SkinMess[showSKinKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.ZhuanPanReward) {
                        if (txt_zpjl)
                            txt_zpjl.active = true;
                    }
                    // 视频解锁
                    this._btnSkinAd.active = true;
                    var videoCount = this._btnSkinAd.getChildByName("videoCount");
                    if (videoCount)
                        videoCount.getComponent(cc.Label).string = showSkinInfo.VideoCount + "/" + gameDate_1.default.SkinMess[showSKinKey].videoCount;
                }
                else {
                    this._btnSkinAd.active = false;
                    this._btnSkin.x = -250;
                    this._btnSkin.width = 252;
                    if (btn_huang)
                        btn_huang.active = true;
                    // 金币
                    if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.Gold) {
                        if (txt_buy)
                            txt_buy.active = true;
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.SkinMess[showSKinKey].price;
                        }
                    }
                    // 钻石
                    else if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.Diamond) {
                        if (txt_buy)
                            txt_buy.active = true;
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.SkinMess[showSKinKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (gameDate_1.default.SkinMess[showSKinKey].priceType == gameDate_1.PriceType.ZhuanPanReward) {
                        if (txt_zpjl)
                            txt_zpjl.active = true;
                    }
                }
            }
            // 升级
            else if (showSkinInfo.Level < 6) {
                this._btnSkinAd.active = false;
                this._btnSkin.x = -250;
                this._btnSkin.width = 252;
                if (btn_hong)
                    btn_hong.active = true;
                if (txt_upgrade)
                    txt_upgrade.active = true;
                if (icon_jinbi) {
                    icon_jinbi.active = true;
                    icon_jinbi.x = 0;
                }
                if (price) {
                    price.active = true;
                    price.x = 30;
                    price.getComponent(cc.Label).string = '' + Constant_1.default.skinLevelPriceArr[showSkinInfo.Level];
                }
            }
            // 最大等级
            else {
                this._btnSkinAd.active = false;
                this._btnSkin.x = -250;
                this._btnSkin.width = 252;
                if (txt_sjwc)
                    txt_sjwc.active = true;
            }
        }
    };
    UIHomePage.prototype._updateWeapon = function () {
        cc.log("showWeaponID: ", this._showWeaponId);
        this._playerAni.setWeaponById(this._showWeaponId);
        // 武器名字
        this._weaponInfo_name.spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + (this._showWeaponId + 1), cc.SpriteFrame);
        // 武器属性
        var curWeaponInfo = CocosZ_1.cocosz.dataMgr.getGunInfo(CocosZ_1.cocosz.dataMgr.CurRange);
        var showWeaponInfo = CocosZ_1.cocosz.dataMgr.getGunInfo(this._showWeaponId);
        var curLevel = curWeaponInfo.Level;
        var showLevel = showWeaponInfo.Level;
        var curWeaponKey = weapon_1.default.WeaponName[CocosZ_1.cocosz.dataMgr.CurRange];
        var showWeaponKey = weapon_1.default.WeaponName[this._showWeaponId];
        // 攻击力
        this._weaponInfo_value0.string = "" + gameDate_1.default.Weapon[showWeaponKey].atk[showLevel];
        // 攻击频率
        this._weaponInfo_value1.string = (1 / gameDate_1.default.Weapon[showWeaponKey].atkSpeed[showLevel]).toFixed(1);
        // 攻击范围
        this._weaponInfo_value2.string = "" + gameDate_1.default.Weapon[showWeaponKey].atkRange;
        // 弹药量
        this._weaponInfo_value3.string = "" + gameDate_1.default.Weapon[showWeaponKey].bulletTotal[showLevel];
        // 变化
        var num0 = gameDate_1.default.Weapon[showWeaponKey].atk[showLevel] - gameDate_1.default.Weapon[curWeaponKey].atk[curLevel];
        var num1 = 1 / gameDate_1.default.Weapon[showWeaponKey].atkSpeed[showLevel] - 1 / gameDate_1.default.Weapon[curWeaponKey].atkSpeed[curLevel];
        var num2 = gameDate_1.default.Weapon[showWeaponKey].atkRange - gameDate_1.default.Weapon[curWeaponKey].atkRange;
        var num3 = gameDate_1.default.Weapon[showWeaponKey].bulletTotal[showLevel] - gameDate_1.default.Weapon[curWeaponKey].bulletTotal[curLevel];
        // 攻击力变化
        if (num0 < 0) {
            this._weaponInfo_change0.string = "" + num0;
            this._weaponInfo_change0.node.children[0].active = false;
            this._weaponInfo_change0.node.children[1].active = true;
            this._weaponInfo_change0.node.color = cc.Color.RED;
            this._weaponInfo_change0.node.opacity = 255;
        }
        else if (num0 == 0) {
            this._weaponInfo_change0.node.opacity = 0;
        }
        else {
            this._weaponInfo_change0.string = "+" + num0;
            this._weaponInfo_change0.node.children[0].active = true;
            this._weaponInfo_change0.node.children[1].active = false;
            this._weaponInfo_change0.node.color = cc.Color.GREEN;
            this._weaponInfo_change0.node.opacity = 255;
        }
        // 攻击频率变化
        if (num1 < 0) {
            this._weaponInfo_change1.string = "" + num1;
            this._weaponInfo_change1.node.children[0].active = false;
            this._weaponInfo_change1.node.children[1].active = true;
            this._weaponInfo_change1.node.color = cc.Color.RED;
            this._weaponInfo_change1.node.opacity = 255;
        }
        else if (num1 == 0) {
            this._weaponInfo_change1.node.opacity = 0;
        }
        else {
            this._weaponInfo_change1.string = "+" + num1;
            this._weaponInfo_change1.node.children[0].active = true;
            this._weaponInfo_change1.node.children[1].active = false;
            this._weaponInfo_change1.node.color = cc.Color.GREEN;
            this._weaponInfo_change1.node.opacity = 255;
        }
        // 攻击范围变化
        if (num2 < 0) {
            this._weaponInfo_change2.string = "" + num2;
            this._weaponInfo_change2.node.children[0].active = false;
            this._weaponInfo_change2.node.children[1].active = true;
            this._weaponInfo_change2.node.color = cc.Color.RED;
            this._weaponInfo_change2.node.opacity = 255;
        }
        else if (num2 == 0) {
            this._weaponInfo_change2.node.opacity = 0;
        }
        else {
            this._weaponInfo_change2.string = "+" + num2;
            this._weaponInfo_change2.node.children[0].active = true;
            this._weaponInfo_change2.node.children[1].active = false;
            this._weaponInfo_change2.node.color = cc.Color.GREEN;
            this._weaponInfo_change2.node.opacity = 255;
        }
        // 弹药量变化
        if (num3 < 0) {
            this._weaponInfo_change3.string = "" + num3;
            this._weaponInfo_change3.node.children[0].active = false;
            this._weaponInfo_change3.node.children[1].active = true;
            this._weaponInfo_change3.node.color = cc.Color.RED;
            this._weaponInfo_change3.node.opacity = 255;
        }
        else if (num3 == 0) {
            this._weaponInfo_change3.node.opacity = 0;
        }
        else {
            this._weaponInfo_change3.string = "+" + num3;
            this._weaponInfo_change3.node.children[0].active = true;
            this._weaponInfo_change3.node.children[1].active = false;
            this._weaponInfo_change3.node.color = cc.Color.GREEN;
            this._weaponInfo_change3.node.opacity = 255;
        }
        // 等级
        this._weaponInfo_level_pro.progress = showLevel / 3;
        // 按钮变化
        if (showWeaponInfo) {
            this._btnWeapon.children.forEach(function (v) { return v.active = false; });
            var btn_huang = this._btnWeapon.getChildByName("btn_huang");
            var btn_huang_small = this._btnWeapon.getChildByName("btn_huang_small");
            var btn_hong = this._btnWeapon.getChildByName("btn_hong");
            var txt_buy = this._btnWeapon.getChildByName("txt_buy");
            var txt_sjwc = this._btnWeapon.getChildByName("txt_sjwc");
            var txt_upgrade = this._btnWeapon.getChildByName("txt_upgrade");
            var txt_zpjl = this._btnWeapon.getChildByName("txt_zpjl");
            var icon_jinbi = this._btnWeapon.getChildByName("icon_jinbi");
            var icon_zuanshi = this._btnWeapon.getChildByName("icon_zuanshi");
            var price = this._btnWeapon.getChildByName("price");
            if (showWeaponInfo.State == 0) {
                // 视频解锁
                if (gameDate_1.default.Weapon[showWeaponKey] && gameDate_1.default.Weapon[showWeaponKey].videoCount) {
                    this._btnWeapon.x = 150;
                    this._btnWeapon.width = 169;
                    if (btn_huang_small)
                        btn_huang_small.active = true;
                    // 金币
                    if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.Gold) {
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.Weapon[showWeaponKey].price;
                        }
                    }
                    // 钻石
                    else if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.Diamond) {
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = -50;
                        }
                        if (price) {
                            price.active = true;
                            price.x = -10;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.Weapon[showWeaponKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.ZhuanPanReward) {
                        if (txt_zpjl)
                            txt_zpjl.active = true;
                    }
                    // 视频解锁
                    this._btnWeaponAd.active = true;
                    var videoCount = this._btnWeaponAd.getChildByName("videoCount");
                    if (videoCount)
                        videoCount.getComponent(cc.Label).string = showWeaponInfo.VideoCount + "/" + gameDate_1.default.Weapon[showWeaponKey].videoCount;
                }
                // 购买
                else {
                    this._btnWeaponAd.active = false;
                    this._btnWeapon.x = 250;
                    this._btnWeapon.width = 252;
                    if (btn_huang)
                        btn_huang.active = true;
                    // 金币
                    if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.Gold) {
                        if (txt_buy)
                            txt_buy.active = true;
                        if (icon_jinbi) {
                            icon_jinbi.active = true;
                            icon_jinbi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.Weapon[showWeaponKey].price;
                        }
                    }
                    // 钻石
                    else if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.Diamond) {
                        if (txt_buy)
                            txt_buy.active = true;
                        if (icon_zuanshi) {
                            icon_zuanshi.active = true;
                            icon_zuanshi.x = 0;
                        }
                        if (price) {
                            price.active = true;
                            price.x = 30;
                            price.getComponent(cc.Label).string = '' + gameDate_1.default.Weapon[showWeaponKey].price;
                        }
                    }
                    // 转盘奖励
                    else if (gameDate_1.default.Weapon[showWeaponKey].priceType == gameDate_1.PriceType.ZhuanPanReward) {
                        if (txt_zpjl)
                            txt_zpjl.active = true;
                    }
                }
            }
            // 升级
            else if (showWeaponInfo.Level < 3) {
                this._btnWeaponAd.active = false;
                this._btnWeapon.x = 250;
                this._btnWeapon.width = 252;
                if (btn_hong)
                    btn_hong.active = true;
                if (txt_upgrade)
                    txt_upgrade.active = true;
                if (icon_jinbi) {
                    icon_jinbi.active = true;
                    icon_jinbi.x = 0;
                }
                if (price) {
                    price.active = true;
                    price.x = 30;
                    price.getComponent(cc.Label).string = '' + Constant_1.default.weaponLevelPriceArr[showWeaponInfo.Level];
                }
            }
            // 最大等级
            else {
                this._btnWeaponAd.active = false;
                this._btnWeapon.x = 250;
                this._btnWeapon.width = 252;
                if (txt_sjwc)
                    txt_sjwc.active = true;
            }
        }
        this._updateWeaponFrame();
    };
    UIHomePage.prototype._updateWeaponFrame = function () {
        var gunInfos = CocosZ_1.cocosz.dataMgr.getItem(Constant_1.default.ST_GunInfo, "");
        if (gunInfos) {
            var gunInfoArr = JSON.parse(gunInfos);
            if (gunInfoArr) {
                for (var i = 0; i < this._weaponList.length; i++) {
                    var node = this._weaponList[i];
                    if (gameDate_1.default.Weapon[node.name] && gameDate_1.default.Weapon[node.name].id >= 0) {
                        var id = gameDate_1.default.Weapon[node.name].id;
                        if (gunInfoArr[id]) {
                            var state = gunInfoArr[id].State;
                            if (state >= 1) {
                                node.getChildByName("kuang_hui").active = false;
                            }
                            else {
                                node.getChildByName("kuang_hui").active = true;
                            }
                            // 选中
                            if (node.name == weapon_1.default.WeaponName[this._showWeaponId]) {
                                node.getChildByName("kuang_huang").active = true;
                                if (this._ani_arrow) {
                                    if (gunInfoArr[id].State > 0 && gunInfoArr[id].Level < 3) {
                                        this._ani_arrow.x = node.x + 30;
                                        this._ani_arrow.active = true;
                                    }
                                    else {
                                        this._ani_arrow.active = false;
                                    }
                                }
                            }
                            else {
                                node.getChildByName("kuang_huang").active = false;
                            }
                        }
                        else {
                            node.getChildByName("kuang_hui").active = false;
                            node.getChildByName("kuang_huang").active = false;
                        }
                    }
                    else {
                        node.getChildByName("kuang_hui").active = false;
                        node.getChildByName("kuang_huang").active = false;
                    }
                }
            }
        }
    };
    /** 金币/钻石弹窗 */
    UIHomePage.prototype.showCoinPanel = function (isDiamond) {
        var node = cc.instantiate(CocosZ_1.cocosz.resMgr.getRes("UIADPanel", cc.Prefab));
        cc.find("Canvas").addChild(node);
        if (isDiamond) {
            node.getComponent("UIADPanel").setDiamond();
        }
    };
    /** 飞金币/钻石 */
    UIHomePage.prototype._flyCoins = function (iconName, frameNodeName) {
        var posNode = cc.find(frameNodeName, this._page);
        if (!posNode)
            return;
        var pos = posNode.parent.convertToWorldSpaceAR(posNode.position);
        FlyCoin_1.default.Show(iconName, pos);
    };
    /** 更新音频开关 */
    UIHomePage.prototype._updateAudioBtn = function (isPlay) {
        if (isPlay === void 0) { isPlay = true; }
        var offImg = cc.find("Background/off", this._btnAudio);
        offImg.active = CocosZ_1.cocosz.dataMgr.AudioOn == false;
        if (isPlay) {
            //判断开关，重新播放背景音乐
            if (CocosZ_1.cocosz.dataMgr.AudioOn) {
                CocosZ_1.cocosz.audioMgr.playBgm();
            }
            else {
                CocosZ_1.cocosz.audioMgr.stopAll();
            }
        }
    };
    /** 更新震动开关 */
    UIHomePage.prototype._updatShakeBtn = function () {
        var offImg = cc.find("Background/off", this._btnShake);
        offImg.active = CocosZ_1.cocosz.dataMgr.ShakeOn == false;
    };
    UIHomePage = __decorate([
        ccclass
    ], UIHomePage);
    return UIHomePage;
}(UIPage_1.default));
exports.default = UIHomePage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJSG9tZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLGtEQUEwRjtBQUMxRiw4Q0FBNkM7QUFDN0MsMkRBQTBEO0FBQzFELHVFQUF5RTtBQUN6RSxtQ0FBOEI7QUFDOUIsbUVBQThEO0FBQzlELGdEQUEyQztBQUMzQyw2Q0FBdUQ7QUFDdkQseUNBQW9DO0FBQ3BDLHdDQUFtQztBQUNuQyxhQUFhO0FBQ2IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRS9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFNO0lBRTFDO1FBQUEsWUFDSSxrQkFBTSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxTQUU3QjtRQUVPLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLGdCQUFVLEdBQWdCLElBQUksQ0FBQztRQUMvQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixpQkFBVyxHQUFjLEVBQUUsQ0FBQztRQUM1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixvQkFBYyxHQUFjLElBQUksQ0FBQztRQUNqQyxx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QUErQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUss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QUNMLG9DQUFlLEdBQXZCLFVBQXdCLE1BQXNCO1FBQXRCLHVCQUFBLEVBQUEsYUFBc0I7UUFDMUMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7UUFDaEQsSUFBSSxNQUFNLEVBQUU7WUFDUixlQUFlO1lBQ2YsSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDeEIsZUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM3QjtpQkFBTTtnQkFDSCxlQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsYUFBYTtJQUNMLG1DQUFjLEdBQXRCO1FBQ0ksSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQXg1QmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0EwNUI5QjtJQUFELGlCQUFDO0NBMTVCRCxBQTA1QkMsQ0ExNUJ1QyxnQkFBTSxHQTA1QjdDO2tCQTE1Qm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlQYWdlIGZyb20gXCIuLi9GcmFtZXdvcmsvVUlQYWdlXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBHdW5JbmZvLCBQYWdlTmFtZSwgUGFuZWxOYW1lLCBTa2lsbEluZm8gfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IEFuaSBmcm9tIFwiLi4vR2FtZS9hbmlcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgRmx5Q29pbiBmcm9tIFwiLi4vRnJhbWV3b3JrL0ZseUNvaW5cIjtcclxuaW1wb3J0IEdhbWVEYXRlLCB7IFByaWNlVHlwZSB9IGZyb20gXCIuLi9HYW1lL2dhbWVEYXRlXCI7XHJcbmltcG9ydCBXZWFwb24gZnJvbSBcIi4uL0dhbWUvd2VhcG9uXCI7XHJcbmltcG9ydCBNc2cgZnJvbSBcIi4uL0ZyYW1ld29yay9Nc2dcIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlIb21lUGFnZSBleHRlbmRzIFVJUGFnZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoUGFnZU5hbWUuVUlIb21lUGFnZSk7XHJcbiAgICAgICAgdGhpcy5pc1ZhbGlkKCkgJiYgdGhpcy5vbkxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pY29uX3NldDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9mcmFtZV9zZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnRuQXVkaW86IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnRuU2hha2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnRuU2tpbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9idG5Ta2luQWQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnRuV2VhcG9uOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0bldlYXBvbkFkOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9wbGF5ZXJBbmk6IEFuaSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9hbmlVcGdyYWRlOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9hbmlDYWlkYWk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3dlYXBvblNjcm9sbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF93ZWFwb25MaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2FuaV9hcnJvdzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2tpbkluZm9fbmFtZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NraW5JbmZvX3h1ZWRpOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NraW5JbmZvX3ZhbHVlMTogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc2tpbkluZm9fdmFsdWUyOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2luSW5mb19jaGFuZ2UxOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2luSW5mb19jaGFuZ2UyOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2luSW5mb19sZXZlbF9wcm86IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF93ZWFwb25JbmZvX25hbWU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF93ZWFwb25JbmZvX3ZhbHVlMDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfd2VhcG9uSW5mb192YWx1ZTE6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3dlYXBvbkluZm9fdmFsdWUyOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF93ZWFwb25JbmZvX3ZhbHVlMzogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfd2VhcG9uSW5mb19jaGFuZ2UwOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF93ZWFwb25JbmZvX2NoYW5nZTE6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3dlYXBvbkluZm9fY2hhbmdlMjogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfd2VhcG9uSW5mb19jaGFuZ2UzOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF93ZWFwb25JbmZvX2xldmVsX3BybzogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVSUhPTUVQQUdFIE9OTE9BRFwiKVxyXG4gICAgICAgIC8vIOaMiemSrlxyXG4gICAgICAgIGxldCBidG5OYW1lczogc3RyaW5nW10gPSBbXCJCdG5TZXRcIiwgXCJCdG5TZXQvZnJhbWVfc2V0L0J0bkF1ZGlvXCIsIFwiQnRuU2V0L2ZyYW1lX3NldC9CdG5TaGFrZVwiLCBcImRpdGFpL0J0bkxlZnRcIiwgXCJkaXRhaS9CdG5SaWdodFwiLCBcIkJ0blNraW5cIiwgXCJCdG5XZWFwb25cIiwgXCJCdG5Ta2luQWRcIiwgXCJCdG5XZWFwb25BZFwiLCBcIkJ0bkNKXCIsIFwiQnRuU2lnblwiLCBcIkJ0blRpbWVcIiwgXCJCdG5HYW1lU3RhcnRcIl07XHJcbiAgICAgICAgYnRuTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAgICAgbGV0IGJ0bjogY2MuTm9kZSA9IGNjLmZpbmQobmFtZSwgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnRuQ2xpY2tIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChidG4ubmFtZSA9PSBcIkJ0blNldFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbl9zZXQgPSBjYy5maW5kKFwiQmFja2dyb3VuZC9pY29uX3NldFwiLCBidG4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lX3NldCA9IGNjLmZpbmQoXCJmcmFtZV9zZXRcIiwgYnRuKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJCdG5BdWRpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuQXVkaW8gPSBidG47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQXVkaW9CdG4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChidG4ubmFtZSA9PSBcIkJ0blNoYWtlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5TaGFrZSA9IGJ0bjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdFNoYWtlQnRuKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ0bi5uYW1lID09IFwiQnRuU2tpblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuU2tpbiA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJCdG5XZWFwb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bldlYXBvbiA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJCdG5Ta2luQWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0blNraW5BZCA9IGJ0bjtcclxuICAgICAgICAgICAgICAgICAgICBidG4uYWN0aXZlID0gY29jb3N6LmlzQURPTjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJCdG5XZWFwb25BZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uQWQgPSBidG47XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmFjdGl2ZSA9IGNvY29zei5pc0FET047XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDop5LoibLliqjnlLtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJBbmkgPSBjYy5maW5kKFwiZGl0YWkvc2tpbl9hbGwvYW5pXCIsIHRoaXMuX3BhZ2UpLmdldENvbXBvbmVudChBbmkpO1xyXG4gICAgICAgIC8vIOW9qeW4puWKqOeUu1xyXG4gICAgICAgIHRoaXMuX2FuaUNhaWRhaSA9IGNjLmZpbmQoXCJkaXRhaS9hbmlDYWlkYWlcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9hbmlDYWlkYWkuc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7IHRoaXMuX2FuaUNhaWRhaS5ub2RlLmFjdGl2ZSA9IGZhbHNlOyB9KVxyXG4gICAgICAgIC8vIOWNh+e6p+WKqOeUu1xyXG4gICAgICAgIHRoaXMuX2FuaVVwZ3JhZGUgPSBjYy5maW5kKFwiZGl0YWkvYW5pVXBncmFkZVwiLCB0aGlzLl9wYWdlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuX2FuaVVwZ3JhZGUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7IHRoaXMuX2FuaVVwZ3JhZGUubm9kZS5hY3RpdmUgPSBmYWxzZTsgfSlcclxuICAgICAgICAvLyDmrablmahcclxuICAgICAgICB0aGlzLl93ZWFwb25TY3JvbGwgPSBjYy5maW5kKFwid2VhcG9uU2Nyb2xsXCIsIHRoaXMuX3BhZ2UpO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gY2MuZmluZChcInZpZXcvY29udGVudFwiLCB0aGlzLl93ZWFwb25TY3JvbGwpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25MaXN0LnB1c2goY29udGVudC5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkxpc3RbaV0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlCdG5FZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IEdhbWVEYXRlLldlYXBvbltlLnRhcmdldC5uYW1lXS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dXZWFwb25JZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVXZWFwb25GcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdlYXBvbkluZm8gPSBjb2Nvc3ouZGF0YU1nci5nZXRHdW5JbmZvKGlkKTtcclxuICAgICAgICAgICAgICAgIGlmICh3ZWFwb25JbmZvICYmIHdlYXBvbkluZm8uU3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLmN1cldlYXBvbiA9IGlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGljb25MYXllciA9IGNjLmZpbmQoXCJ2aWV3L2ljb25MYXllclwiLCB0aGlzLl93ZWFwb25TY3JvbGwpO1xyXG4gICAgICAgIGlmIChpY29uTGF5ZXIpIGljb25MYXllci5zZXRQYXJlbnQoY29udGVudCk7XHJcbiAgICAgICAgdGhpcy5fYW5pX2Fycm93ID0gY2MuZmluZChcInZpZXcvYW5pX2Fycm93XCIsIHRoaXMuX3dlYXBvblNjcm9sbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaV9hcnJvdykgdGhpcy5fYW5pX2Fycm93LnNldFBhcmVudChjb250ZW50KTtcclxuICAgICAgICAvLyDlsZ7mgKdcclxuICAgICAgICB0aGlzLl9za2luSW5mb19uYW1lID0gY2MuZmluZChcImRpdGFpL3NraW5OYW1lXCIsIHRoaXMuX3BhZ2UpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuX3NraW5JbmZvX3h1ZWRpID0gY2MuZmluZChcImp1ZXNlc2h1eGluZy94dWVkaVwiLCB0aGlzLl9wYWdlKTtcclxuICAgICAgICB0aGlzLl9za2luSW5mb192YWx1ZTEgPSBjYy5maW5kKFwianVlc2VzaHV4aW5nL3ZhbHVlMVwiLCB0aGlzLl9wYWdlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3NraW5JbmZvX3ZhbHVlMiA9IGNjLmZpbmQoXCJqdWVzZXNodXhpbmcvdmFsdWUyXCIsIHRoaXMuX3BhZ2UpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMSA9IGNjLmZpbmQoXCJqdWVzZXNodXhpbmcvY2hhbmdlMVwiLCB0aGlzLl9wYWdlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTIgPSBjYy5maW5kKFwianVlc2VzaHV4aW5nL2NoYW5nZTJcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9za2luSW5mb19sZXZlbF9wcm8gPSBjYy5maW5kKFwianVlc2VzaHV4aW5nL2xldmVsUHJvZ3Jlc3NCYXJcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX25hbWUgPSBjYy5maW5kKFwid3VxaXNodXhpbmcvd2VhcG9uTmFtZVwiLCB0aGlzLl9wYWdlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX3ZhbHVlMCA9IGNjLmZpbmQoXCJ3dXFpc2h1eGluZy92YWx1ZTBcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX3ZhbHVlMSA9IGNjLmZpbmQoXCJ3dXFpc2h1eGluZy92YWx1ZTFcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX3ZhbHVlMiA9IGNjLmZpbmQoXCJ3dXFpc2h1eGluZy92YWx1ZTJcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX3ZhbHVlMyA9IGNjLmZpbmQoXCJ3dXFpc2h1eGluZy92YWx1ZTNcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTAgPSBjYy5maW5kKFwid3VxaXNodXhpbmcvY2hhbmdlMFwiLCB0aGlzLl9wYWdlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMSA9IGNjLmZpbmQoXCJ3dXFpc2h1eGluZy9jaGFuZ2UxXCIsIHRoaXMuX3BhZ2UpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UyID0gY2MuZmluZChcInd1cWlzaHV4aW5nL2NoYW5nZTJcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTMgPSBjYy5maW5kKFwid3VxaXNodXhpbmcvY2hhbmdlM1wiLCB0aGlzLl9wYWdlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3dlYXBvbkluZm9fbGV2ZWxfcHJvID0gY2MuZmluZChcInd1cWlzaHV4aW5nL2xldmVsUHJvZ3Jlc3NCYXJcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jYW5HZXRCb251cygpIHtcclxuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkgIT0gY29jb3N6LmRhdGFNZ3IuTGFzdERhaWx5Qm9udXNUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hbmlFZmZlY3QodHlwZTogMSB8IDIpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYW5pVXBncmFkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaVVwZ3JhZGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaVVwZ3JhZGUuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChcInVpX3VwZ3JhZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDI6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmlDYWlkYWkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmlDYWlkYWkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaUNhaWRhaS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5RWZmZWN0KFwidWlfY2FpZGFpXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICBjYy5sb2coXCJob21lIG9wZW4gIVwiKTtcclxuICAgICAgICAvLyDkuIrmiqXmuLjmiI/pppbpobVcclxuICAgICAgICB1dGlscy51bWFFdmVudChcImdhbWVob21lXCIpO1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIumhtemdoi3pppbpobVcIik7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uRnJhbWUoKTtcclxuICAgICAgICAvLyDlub/lkYpcclxuICAgICAgICB1dGlscy5zaG93WXpSZWFsTmFtZUF1dGhQYW5lbCgpO1xyXG4gICAgICAgIHV0aWxzLnNob3dQcml2YWN5UGFuZWwoeyBncm91cDogXCJkZWZhdWx0XCIsIHBhcmVudDogdGhpcy5fcGFnZSB9KVxyXG4gICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgLy8g6aqM6K+B5pyN5Yqh5Zmo6YWN572u5Li66Ieq5Yqo5by5562+5Yiw77yM5bm25LiU5b2T5YmN5Y+v5Lul562+5YiwXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5jaGVja0F1dG9TaWduKCkgJiYgdGhpcy5fY2FuR2V0Qm9udXMoKSkge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVUlTaWduUGFuZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkKCk7XHJcbiAgICAgICAgfSwgdGhpcylcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihDb25zdGFudC5FX0dBTUVfTE9HSUMsIHRoaXMuX29uR2FtZU1lc3NhZ2VIYW5kbGVyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICB1dGlscy5oaWRlVml2b0dhbWVQb3J0YWxXaWRnZXQoKTtcclxuICAgICAgICB1dGlscy5oaWRlT3Bwb0dhbWVEcmF3ZXJBZFdpZGdldCgpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlQmxvY2tBZCgpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlU2luZ2xlTmF0aXZlQWQoKTtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlQ3VzdG9tQWQoeyBsb2NhdGlvbjogMSB9KTtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVDdXN0b21BZCh7IGxvY2F0aW9uOiAyIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuaGlkZUN1c3RvbUFkKHsgbG9jYXRpb246IEJhbm5lckxvY2F0aW9uLkhvbWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93QWQoKSB7XHJcbiAgICAgICAgaWYgKGNvY29zei5pc1Nob3dBZCkge1xyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5Ib21lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKEJhbm5lckxvY2F0aW9uLkhvbWUsIHsgd2lkdGg6IDAuMSwgYm90dG9tOiAxIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWOn+eUn+W5v+WRilxyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd0N1c3RvbUFkKHsgbG9jYXRpb246IDEgfSk7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd0N1c3RvbUFkKHsgbG9jYXRpb246IDIgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbi5Ib21lIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93TmF0aXZlVHJ5R2FtZVdpZGdldCh7IHJpZ2h0OiA1MCwgdG9wOiA4MDAsIHNjYWxlOiAxLCBwYXJlbnQ6IHRoaXMuX3BhZ2UgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93U2luZ2xlTmF0aXZlQWQoe30pO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd0Jsb2NrQWQoeyByaWdodDogNTAsIHRvcDogNTAwLCBzaG93TnVtOiAxIH0pO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuc2hvd01vcmVHYW1lc1dpZGdldCh7IGdyb3VwOiAnZGVmYXVsdCcsIHNjYWxlOiAxLCBib3R0b206IDMwMCwgbGVmdDogNTAsIHBhcmVudDogdGhpcy5fcGFnZSwgbG9jYXRpb246IEJhbm5lckxvY2F0aW9uLkhvbWUgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dUcnlHYW1lc1dpZGdldCh7IGdyb3VwOiAnZGVmYXVsdCcsIHNjYWxlOiAxLCBib3R0b206IDM1MCwgcmlnaHQ6IDUwLCBwYXJlbnQ6IHRoaXMuX3BhZ2UsIGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbi5Ib21lIH0pO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93Vml2b0dhbWVQb3J0YWxXaWRnZXQoeyB0b3A6IDUwMCwgbG9jYXRpb246IEJhbm5lckxvY2F0aW9uLkhvbWUgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dPcHBvR2FtZURyYXdlckFkV2lkZ2V0KHsgdG9wOiA1MDAsIGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbi5Ib21lIH0pO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93Q3JlYXRlU2hvcnRjdXRXaWRnZXQobnVsbCwgeyBncm91cDogJ2RlZmF1bHQnLCBzY2FsZTogMSwgbGVmdDogMCwgdG9wOiA1MDAsIHBhcmVudDogdGhpcy5fcGFnZSB9KVxyXG4gICAgICAgICAgICB1dGlscy5zaG93UHJpdmFjeVdpZGdldCh7IGdyb3VwOiBcImRlZmF1bHRcIiwgdG9wOiAwLCBsZWZ0OiAwLCBwYXJlbnQ6IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJQcml2YWN5V2lkZ2V0XCIpLCBjb2xvcjogY2MuQ29sb3IuQkxBQ0sgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25HYW1lTWVzc2FnZUhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0YW50LkVfRmx5X0NvaW46IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZseUNvaW5zKGV2ZW50Lmljb25OYW1lLCBldmVudC5mcmFtZU5vZGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RhbnQuRV9DSl9TS0lOOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93U2tpbklkID0gY29jb3N6LmRhdGFNZ3IuQ3VyU2tpbklkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENvbnN0YW50LkVfQ0pfV2VhcG9uOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93V2VhcG9uSWQgPSBjb2Nvc3ouZGF0YU1nci5jdXJXZWFwb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVXZWFwb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVdlYXBvbkZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIF9vbkJ0bkNsaWNrSGFuZGxlcihldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGF3YWl0IGNvY29zei5hdWRpb01nci5wbGF5QnRuRWZmZWN0KCkuY2F0Y2goKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQnRuR2FtZVN0YXJ0XCI6IHtcclxuICAgICAgICAgICAgICAgIGNvY29zei5nYW1lTW9kZSA9IDY7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouZ2FtZU1nci5nYW1lU3RhcnQoY29jb3N6LmdldExldmVsSWQoKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuTGVmdFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93U2tpbklkLS07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2hvd1NraW5JZCA8IDApIHRoaXMuX3Nob3dTa2luSWQgPSAxMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraW5JbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0U2tpbkluZm8odGhpcy5fc2hvd1NraW5JZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbkluZm8gJiYgc2tpbkluZm8uU3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkN1clNraW5JZCA9IHRoaXMuX3Nob3dTa2luSWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuUmlnaHRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1NraW5JZCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3dTa2luSWQgPiAxMSkgdGhpcy5fc2hvd1NraW5JZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGxldCBza2luSW5mbyA9IGNvY29zei5kYXRhTWdyLmdldFNraW5JbmZvKHRoaXMuX3Nob3dTa2luSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraW5JbmZvICYmIHNraW5JbmZvLlN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5DdXJTa2luSWQgPSB0aGlzLl9zaG93U2tpbklkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkJ0blNraW5cIjoge1xyXG4gICAgICAgICAgICAgICAgLy8g6LSt5LmwXHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd1NraW5JbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0U2tpbkluZm8odGhpcy5fc2hvd1NraW5JZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd1NLaW5LZXkgPSBgJHt0aGlzLl9zaG93U2tpbklkICsgMX1gO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dTa2luSW5mby5TdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6YeR5biBXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLkdvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvY29zei5kYXRhTWdyLkNvaW5Db3VudCA+PSBHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0ucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkNvaW5Db3VudCAtPSBHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cuZ3hoZHhqc1wiKSk7Ly/mga3llpzojrflvpfmlrDop5LoibJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkN1clNraW5JZCA9IHRoaXMuX3Nob3dTa2luSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaUVmZmVjdCgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvaW5QYW5lbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZK755+zXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLnByaWNlVHlwZSA9PSBQcmljZVR5cGUuRGlhbW9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuRGlhbW9uZENvdW50ID49IEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuRGlhbW9uZENvdW50IC09IEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1zZy5TaG93KGkxOG4udChcIm1zZy5neGhkeGpzXCIpKTsvL+aBreWWnOiOt+W+l+aWsOinkuiJslxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ3VyU2tpbklkID0gdGhpcy5fc2hvd1NraW5JZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pRWZmZWN0KDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q29pblBhbmVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi9rOebmOWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLlpodWFuUGFuUmV3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5vcGVuUGFuZWwoUGFuZWxOYW1lLlVJVHVybnRhYmxlUGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWNh+e6p1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2hvd1NraW5JbmZvLkxldmVsIDwgNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgPj0gQ29uc3RhbnQuc2tpbkxldmVsUHJpY2VBcnJbc2hvd1NraW5JbmZvLkxldmVsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgLT0gQ29uc3RhbnQuc2tpbkxldmVsUHJpY2VBcnJbc2hvd1NraW5JbmZvLkxldmVsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NraW5JbmZvLkxldmVsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLnNldFNraW5JbmZvKHNob3dTa2luSW5mby5JZCwgc2hvd1NraW5JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaUVmZmVjdCgxKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDb2luUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5XZWFwb25cIjoge1xyXG4gICAgICAgICAgICAgICAgLy8g6LSt5LmwXHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd1dlYXBvbkluZm8gPSBjb2Nvc3ouZGF0YU1nci5nZXRHdW5JbmZvKHRoaXMuX3Nob3dXZWFwb25JZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd1dlYXBvbktleSA9IFdlYXBvbi5XZWFwb25OYW1lW3RoaXMuX3Nob3dXZWFwb25JZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd1dlYXBvbkluZm8uU3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0ucHJpY2VUeXBlID09IFByaWNlVHlwZS5Hb2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgPj0gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgLT0gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmd4aGR4d3FcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuY3VyV2VhcG9uID0gdGhpcy5fc2hvd1dlYXBvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVXZWFwb25GcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pRWZmZWN0KDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q29pblBhbmVsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDpkrvnn7NcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0ucHJpY2VUeXBlID09IFByaWNlVHlwZS5EaWFtb25kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5EaWFtb25kQ291bnQgPj0gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5EaWFtb25kQ291bnQgLT0gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmd4aGR4d3FcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuY3VyV2VhcG9uID0gdGhpcy5fc2hvd1dlYXBvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVXZWFwb25GcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pRWZmZWN0KDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q29pblBhbmVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi9rOebmOWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLlpodWFuUGFuUmV3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5vcGVuUGFuZWwoUGFuZWxOYW1lLlVJVHVybnRhYmxlUGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWNh+e6p1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2hvd1dlYXBvbkluZm8uTGV2ZWwgPCAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvY29zei5kYXRhTWdyLkNvaW5Db3VudCA+PSBDb25zdGFudC53ZWFwb25MZXZlbFByaWNlQXJyW3Nob3dXZWFwb25JbmZvLkxldmVsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgLT0gQ29uc3RhbnQud2VhcG9uTGV2ZWxQcmljZUFycltzaG93V2VhcG9uSW5mby5MZXZlbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dXZWFwb25JbmZvLkxldmVsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLnNldEd1bkluZm8oc2hvd1dlYXBvbkluZm8uSWQsIHNob3dXZWFwb25JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVdlYXBvbkZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaUVmZmVjdCgxKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDb2luUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5Ta2luQWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeearuiCpOino+mUgS3mkq3mlL5cIilcclxuICAgICAgICAgICAgICAgIGNvY29zei53YXRjaEFEKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDop4bpopHmiJDlip8gXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeearuiCpOino+mUgS3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvd1NraW5JbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0U2tpbkluZm8odGhpcy5fc2hvd1NraW5JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNob3dTa2luS2V5OiBzdHJpbmcgPSBgJHt0aGlzLl9zaG93U2tpbklkICsgMX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXNob3dTa2luSW5mbyAmJiAhIUdhbWVEYXRlLlNraW5NZXNzW3Nob3dTa2luS2V5XSAmJiAhIUdhbWVEYXRlLlNraW5NZXNzW3Nob3dTa2luS2V5XS52aWRlb0NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTa2luSW5mby5WaWRlb0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLnNldFNraW5JbmZvKHRoaXMuX3Nob3dTa2luSWQsIHNob3dTa2luSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG93U2tpbkluZm8uVmlkZW9Db3VudCA+PSBHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U2tpbktleV0udmlkZW9Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmd4aGR4anNcIikpOy8v5oGt5Zac6I635b6X5paw6KeS6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5DdXJTa2luSWQgPSB0aGlzLl9zaG93U2tpbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pRWZmZWN0KDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmpzd2NcIikgKyBzaG93U2tpbkluZm8uVmlkZW9Db3VudCArIFwiL1wiICsgR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NraW5LZXldLnZpZGVvQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsOeOqeWutuS/oeaBr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KeG6aKR5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeearuiCpOino+mUgS3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkJ0bldlYXBvbkFkXCI6IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3mrablmajop6PplIEt5pKt5pS+XCIpXHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oud2F0Y2hBRCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KeG6aKR5oiQ5YqfIFxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3mrablmajop6PplIEt5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNob3dXZWFwb25JbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0R3VuSW5mbyh0aGlzLl9zaG93V2VhcG9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaG93V2VhcG9uS2V5OiBzdHJpbmcgPSBXZWFwb24uV2VhcG9uTmFtZVt0aGlzLl9zaG93V2VhcG9uSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXNob3dXZWFwb25JbmZvICYmICEhR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldICYmICEhR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnZpZGVvQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1dlYXBvbkluZm8uVmlkZW9Db3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5zZXRHdW5JbmZvKHRoaXMuX3Nob3dXZWFwb25JZCwgc2hvd1dlYXBvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvd1dlYXBvbkluZm8uVmlkZW9Db3VudCA+PSBHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0udmlkZW9Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmd4aGR4d3FcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuY3VyV2VhcG9uID0gdGhpcy5fc2hvd1dlYXBvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pRWZmZWN0KDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmpzd2NcIikgKyBzaG93V2VhcG9uSW5mby5WaWRlb0NvdW50ICsgXCIvXCIgKyBHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0udmlkZW9Db3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pu05paw5q2m5Zmo5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVdlYXBvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVXZWFwb25GcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDop4bpopHlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5q2m5Zmo6Kej6ZSBLeWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuQ0pcIjoge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVUlUdXJudGFibGVQYW5lbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuU2lnblwiOiB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhbmVsKFBhbmVsTmFtZS5VSVNpZ25QYW5lbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuVGltZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhbmVsKFBhbmVsTmFtZS5VSVRpbWVQYW5lbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuU2V0XCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ljb25fc2V0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZV9zZXQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0ID0gKHRoaXMuX2ZyYW1lX3NldC5zY2FsZVkgPyB0aGlzLl9mcmFtZV9zZXQuc2NhbGVZIDogMSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5faWNvbl9zZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKHQsIHsgYW5nbGU6ICh0aGlzLl9mcmFtZV9zZXQuc2NhbGVZID8gOTAgOiAtOTApIH0sIHsgZWFzaW5nOiBcInNpbmVJbk91dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9mcmFtZV9zZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKHQsIHsgc2NhbGVZOiB0aGlzLl9mcmFtZV9zZXQuc2NhbGVZID8gMCA6IDEgfSwgeyBlYXNpbmc6IFwic2luZUluT3V0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5BdWRpb1wiOiB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5BdWRpb09uID0gIWNvY29zei5kYXRhTWdyLkF1ZGlvT247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVBdWRpb0J0bigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkJ0blNoYWtlXCI6IHtcclxuICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLlNoYWtlT24gPSAhY29jb3N6LmRhdGFNZ3IuU2hha2VPbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0U2hha2VCdG4oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3dTa2luSWQ6IG51bWJlciA9IGNvY29zei5kYXRhTWdyLkN1clNraW5JZDtcclxuICAgIHByaXZhdGUgX3VwZGF0ZVBsYXllcigpIHtcclxuICAgICAgICBjYy5sb2coXCJzaG93U2tpbklEOiBcIiwgdGhpcy5fc2hvd1NraW5JZCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyQW5pLnNldFNraW5CeUlkKHRoaXMuX3Nob3dTa2luSWQpXHJcbiAgICAgICAgLy8g5bGe5oCnXHJcbiAgICAgICAgLy8g6KeS6Imy5ZCN5a2XXHJcbiAgICAgICAgdGhpcy5fc2tpbkluZm9fbmFtZS5zcHJpdGVGcmFtZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwicF9cIiArICh0aGlzLl9zaG93U2tpbklkICsgMSksIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAvLyDop5LoibLlsZ7mgKdcclxuICAgICAgICBsZXQgY3VyU2tpbkluZm8gPSBjb2Nvc3ouZGF0YU1nci5nZXRTa2luSW5mbyhjb2Nvc3ouZGF0YU1nci5DdXJTa2luSWQpO1xyXG4gICAgICAgIGxldCBzaG93U2tpbkluZm8gPSBjb2Nvc3ouZGF0YU1nci5nZXRTa2luSW5mbyh0aGlzLl9zaG93U2tpbklkKTtcclxuICAgICAgICBsZXQgY3VyTGV2ZWwgPSBjdXJTa2luSW5mby5MZXZlbDtcclxuICAgICAgICBsZXQgc2hvd0xldmVsID0gc2hvd1NraW5JbmZvLkxldmVsO1xyXG4gICAgICAgIGxldCBjdXJTa2luS2V5ID0gYCR7Y29jb3N6LmRhdGFNZ3IuQ3VyU2tpbklkICsgMX1gO1xyXG4gICAgICAgIGxldCBzaG93U0tpbktleSA9IGAke3RoaXMuX3Nob3dTa2luSWQgKyAxfWA7XHJcbiAgICAgICAgLy8g6KGA5ru0XHJcbiAgICAgICAgdGhpcy5fc2tpbkluZm9feHVlZGkuY2hpbGRyZW4uZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8IEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS54dWVkaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9feHVlZGkuY2hpbGRyZW5baV0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX3h1ZWRpLmNoaWxkcmVuW2ldLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDmlLvlh7vliptcclxuICAgICAgICB0aGlzLl9za2luSW5mb192YWx1ZTEuc3RyaW5nID0gYCR7R2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLmF0a1tzaG93TGV2ZWxdfWA7XHJcbiAgICAgICAgLy8g56e75YqoXHJcbiAgICAgICAgdGhpcy5fc2tpbkluZm9fdmFsdWUyLnN0cmluZyA9IGAke0dhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5zcGVlZFtzaG93TGV2ZWxdfWA7XHJcbiAgICAgICAgLy8g5pS75Ye75Y+Y5YyWXHJcbiAgICAgICAgbGV0IG51bTEgPSBHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0uYXRrW3Nob3dMZXZlbF0gLSBHYW1lRGF0ZS5Ta2luTWVzc1tjdXJTa2luS2V5XS5hdGtbY3VyTGV2ZWxdO1xyXG4gICAgICAgIGlmIChudW0xIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UxLnN0cmluZyA9IFwiXCIgKyBudW0xO1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UxLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTEubm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UxLm5vZGUuY29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTEubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW0xID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMS5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMS5zdHJpbmcgPSBcIitcIiArIG51bTE7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTEubm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UxLm5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTEubm9kZS5jb2xvciA9IGNjLkNvbG9yLkdSRUVOO1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UxLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g56e75Yqo5Y+Y5YyWIFxyXG4gICAgICAgIGxldCBudW0yID0gR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLnNwZWVkW3Nob3dMZXZlbF0gLSBHYW1lRGF0ZS5Ta2luTWVzc1tjdXJTa2luS2V5XS5zcGVlZFtjdXJMZXZlbF07XHJcbiAgICAgICAgaWYgKG51bTIgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTIuc3RyaW5nID0gXCJcIiArIG51bTI7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTIubm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMi5ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTIubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMi5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bTIgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UyLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9za2luSW5mb19jaGFuZ2UyLnN0cmluZyA9IFwiK1wiICsgbnVtMjtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMi5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTIubm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbkluZm9fY2hhbmdlMi5ub2RlLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmZvX2NoYW5nZTIubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnrYnnuqdcclxuICAgICAgICB0aGlzLl9za2luSW5mb19sZXZlbF9wcm8ucHJvZ3Jlc3MgPSBzaG93TGV2ZWwgLyA2O1xyXG4gICAgICAgIC8vIOaMiemSruWPmOWMllxyXG4gICAgICAgIGlmIChzaG93U2tpbkluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuU2tpbi5jaGlsZHJlbi5mb3JFYWNoKHYgPT4gdi5hY3RpdmUgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBidG5faHVhbmcgPSB0aGlzLl9idG5Ta2luLmdldENoaWxkQnlOYW1lKFwiYnRuX2h1YW5nXCIpO1xyXG4gICAgICAgICAgICBsZXQgYnRuX2h1YW5nX3NtYWxsID0gdGhpcy5fYnRuU2tpbi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9odWFuZ19zbWFsbFwiKTtcclxuICAgICAgICAgICAgbGV0IGJ0bl9ob25nID0gdGhpcy5fYnRuU2tpbi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9ob25nXCIpO1xyXG4gICAgICAgICAgICBsZXQgdHh0X2J1eSA9IHRoaXMuX2J0blNraW4uZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfYnV5XCIpO1xyXG4gICAgICAgICAgICBsZXQgdHh0X3Nqd2MgPSB0aGlzLl9idG5Ta2luLmdldENoaWxkQnlOYW1lKFwidHh0X3Nqd2NcIik7XHJcbiAgICAgICAgICAgIGxldCB0eHRfdXBncmFkZSA9IHRoaXMuX2J0blNraW4uZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfdXBncmFkZVwiKTtcclxuICAgICAgICAgICAgbGV0IHR4dF96cGpsID0gdGhpcy5fYnRuU2tpbi5nZXRDaGlsZEJ5TmFtZShcInR4dF96cGpsXCIpO1xyXG4gICAgICAgICAgICBsZXQgaWNvbl9qaW5iaSA9IHRoaXMuX2J0blNraW4uZ2V0Q2hpbGRCeU5hbWUoXCJpY29uX2ppbmJpXCIpO1xyXG4gICAgICAgICAgICBsZXQgaWNvbl96dWFuc2hpID0gdGhpcy5fYnRuU2tpbi5nZXRDaGlsZEJ5TmFtZShcImljb25fenVhbnNoaVwiKTtcclxuICAgICAgICAgICAgbGV0IHByaWNlID0gdGhpcy5fYnRuU2tpbi5nZXRDaGlsZEJ5TmFtZShcInByaWNlXCIpO1xyXG4gICAgICAgICAgICAvLyDotK3kubBcclxuICAgICAgICAgICAgaWYgKHNob3dTa2luSW5mby5TdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldICYmIEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS52aWRlb0NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuU2tpbi54ID0gLTM1MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5Ta2luLndpZHRoID0gMTY5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidG5faHVhbmdfc21hbGwpIGJ0bl9odWFuZ19zbWFsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0ucHJpY2VUeXBlID09IFByaWNlVHlwZS5Hb2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uX2ppbmJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLnggPSAtNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UueCA9IC0xMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJycgKyBHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZK755+zXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLnByaWNlVHlwZSA9PSBQcmljZVR5cGUuRGlhbW9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl96dWFuc2hpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX3p1YW5zaGkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fenVhbnNoaS54ID0gLTUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLnggPSAtMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi9rOebmOWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLlpodWFuUGFuUmV3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eHRfenBqbCkgdHh0X3pwamwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KeG6aKR6Kej6ZSBXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuU2tpbkFkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvQ291bnQgPSB0aGlzLl9idG5Ta2luQWQuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWRlb0NvdW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWRlb0NvdW50KSB2aWRlb0NvdW50LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc2hvd1NraW5JbmZvLlZpZGVvQ291bnQgKyBcIi9cIiArIEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS52aWRlb0NvdW50O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5Ta2luQWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuU2tpbi54ID0gLTI1MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5Ta2luLndpZHRoID0gMjUyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidG5faHVhbmcpIGJ0bl9odWFuZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0ucHJpY2VUeXBlID09IFByaWNlVHlwZS5Hb2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eHRfYnV5KSB0eHRfYnV5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uX2ppbmJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLnggPSAzMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJycgKyBHYW1lRGF0ZS5Ta2luTWVzc1tzaG93U0tpbktleV0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZK755+zXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLnByaWNlVHlwZSA9PSBQcmljZVR5cGUuRGlhbW9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHh0X2J1eSkgdHh0X2J1eS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl96dWFuc2hpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX3p1YW5zaGkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fenVhbnNoaS54ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS54ID0gMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgR2FtZURhdGUuU2tpbk1lc3Nbc2hvd1NLaW5LZXldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi9rOebmOWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLlNraW5NZXNzW3Nob3dTS2luS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLlpodWFuUGFuUmV3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eHRfenBqbCkgdHh0X3pwamwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Y2H57qnXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNob3dTa2luSW5mby5MZXZlbCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0blNraW5BZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0blNraW4ueCA9IC0yNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5Ta2luLndpZHRoID0gMjUyO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bl9ob25nKSBidG5faG9uZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR4dF91cGdyYWRlKSB0eHRfdXBncmFkZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGljb25famluYmkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbl9qaW5iaS54ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2UueCA9IDMwO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJycgKyBDb25zdGFudC5za2luTGV2ZWxQcmljZUFycltzaG93U2tpbkluZm8uTGV2ZWxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOacgOWkp+etiee6p1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0blNraW5BZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0blNraW4ueCA9IC0yNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5Ta2luLndpZHRoID0gMjUyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR4dF9zandjKSB0eHRfc2p3Yy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3dXZWFwb25JZDogbnVtYmVyID0gY29jb3N6LmRhdGFNZ3IuQ3VyUmFuZ2U7XHJcbiAgICBwcml2YXRlIF91cGRhdGVXZWFwb24oKSB7XHJcbiAgICAgICAgY2MubG9nKFwic2hvd1dlYXBvbklEOiBcIiwgdGhpcy5fc2hvd1dlYXBvbklkKTtcclxuICAgICAgICB0aGlzLl9wbGF5ZXJBbmkuc2V0V2VhcG9uQnlJZCh0aGlzLl9zaG93V2VhcG9uSWQpO1xyXG4gICAgICAgIC8vIOatpuWZqOWQjeWtl1xyXG4gICAgICAgIHRoaXMuX3dlYXBvbkluZm9fbmFtZS5zcHJpdGVGcmFtZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwid19cIiArICh0aGlzLl9zaG93V2VhcG9uSWQgKyAxKSwgY2MuU3ByaXRlRnJhbWUpO1xyXG4gICAgICAgIC8vIOatpuWZqOWxnuaAp1xyXG4gICAgICAgIGxldCBjdXJXZWFwb25JbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0R3VuSW5mbyhjb2Nvc3ouZGF0YU1nci5DdXJSYW5nZSk7XHJcbiAgICAgICAgbGV0IHNob3dXZWFwb25JbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0R3VuSW5mbyh0aGlzLl9zaG93V2VhcG9uSWQpO1xyXG4gICAgICAgIGxldCBjdXJMZXZlbCA9IGN1cldlYXBvbkluZm8uTGV2ZWw7XHJcbiAgICAgICAgbGV0IHNob3dMZXZlbCA9IHNob3dXZWFwb25JbmZvLkxldmVsO1xyXG4gICAgICAgIGxldCBjdXJXZWFwb25LZXkgPSBXZWFwb24uV2VhcG9uTmFtZVtjb2Nvc3ouZGF0YU1nci5DdXJSYW5nZV07XHJcbiAgICAgICAgbGV0IHNob3dXZWFwb25LZXkgPSBXZWFwb24uV2VhcG9uTmFtZVt0aGlzLl9zaG93V2VhcG9uSWRdO1xyXG4gICAgICAgIC8vIOaUu+WHu+WKm1xyXG4gICAgICAgIHRoaXMuX3dlYXBvbkluZm9fdmFsdWUwLnN0cmluZyA9IGAke0dhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XS5hdGtbc2hvd0xldmVsXX1gO1xyXG4gICAgICAgIC8vIOaUu+WHu+mikeeOh1xyXG4gICAgICAgIHRoaXMuX3dlYXBvbkluZm9fdmFsdWUxLnN0cmluZyA9ICgxIC8gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLmF0a1NwZWVkW3Nob3dMZXZlbF0pLnRvRml4ZWQoMSk7XHJcbiAgICAgICAgLy8g5pS75Ye76IyD5Zu0XHJcbiAgICAgICAgdGhpcy5fd2VhcG9uSW5mb192YWx1ZTIuc3RyaW5nID0gYCR7R2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLmF0a1JhbmdlfWA7XHJcbiAgICAgICAgLy8g5by56I2v6YePXHJcbiAgICAgICAgdGhpcy5fd2VhcG9uSW5mb192YWx1ZTMuc3RyaW5nID0gYCR7R2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLmJ1bGxldFRvdGFsW3Nob3dMZXZlbF19YDtcclxuICAgICAgICAvLyDlj5jljJZcclxuICAgICAgICBsZXQgbnVtMCA9IEdhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XS5hdGtbc2hvd0xldmVsXSAtIEdhbWVEYXRlLldlYXBvbltjdXJXZWFwb25LZXldLmF0a1tjdXJMZXZlbF07XHJcbiAgICAgICAgbGV0IG51bTEgPSAxIC8gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLmF0a1NwZWVkW3Nob3dMZXZlbF0gLSAxIC8gR2FtZURhdGUuV2VhcG9uW2N1cldlYXBvbktleV0uYXRrU3BlZWRbY3VyTGV2ZWxdO1xyXG4gICAgICAgIGxldCBudW0yID0gR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLmF0a1JhbmdlIC0gR2FtZURhdGUuV2VhcG9uW2N1cldlYXBvbktleV0uYXRrUmFuZ2U7XHJcbiAgICAgICAgbGV0IG51bTMgPSBHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0uYnVsbGV0VG90YWxbc2hvd0xldmVsXSAtIEdhbWVEYXRlLldlYXBvbltjdXJXZWFwb25LZXldLmJ1bGxldFRvdGFsW2N1ckxldmVsXTtcclxuICAgICAgICAvLyDmlLvlh7vlipvlj5jljJZcclxuICAgICAgICBpZiAobnVtMCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLnN0cmluZyA9IFwiXCIgKyBudW0wO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTAubm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLm5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLm5vZGUuY29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMC5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0wID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLnN0cmluZyA9IFwiK1wiICsgbnVtMDtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UwLm5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMC5ub2RlLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMC5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaUu+WHu+mikeeOh+WPmOWMllxyXG4gICAgICAgIGlmIChudW0xIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEuc3RyaW5nID0gXCJcIiArIG51bTE7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMS5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEubm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UxLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bTEgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEuc3RyaW5nID0gXCIrXCIgKyBudW0xO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEubm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTEubm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UxLm5vZGUuY29sb3IgPSBjYy5Db2xvci5HUkVFTjtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UxLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pS75Ye76IyD5Zu05Y+Y5YyWXHJcbiAgICAgICAgaWYgKG51bTIgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5zdHJpbmcgPSBcIlwiICsgbnVtMjtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UyLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5ub2RlLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTIubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtMiA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5zdHJpbmcgPSBcIitcIiArIG51bTI7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMi5ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTIubm9kZS5jb2xvciA9IGNjLkNvbG9yLkdSRUVOO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTIubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlvLnoja/ph4/lj5jljJZcclxuICAgICAgICBpZiAobnVtMyA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLnN0cmluZyA9IFwiXCIgKyBudW0zO1xyXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25JbmZvX2NoYW5nZTMubm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLm5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLm5vZGUuY29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0zID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLnN0cmluZyA9IFwiK1wiICsgbnVtMztcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uSW5mb19jaGFuZ2UzLm5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMy5ub2RlLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkluZm9fY2hhbmdlMy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOetiee6p1xyXG4gICAgICAgIHRoaXMuX3dlYXBvbkluZm9fbGV2ZWxfcHJvLnByb2dyZXNzID0gc2hvd0xldmVsIC8gMztcclxuICAgICAgICAvLyDmjInpkq7lj5jljJZcclxuICAgICAgICBpZiAoc2hvd1dlYXBvbkluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uLmNoaWxkcmVuLmZvckVhY2godiA9PiB2LmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGJ0bl9odWFuZyA9IHRoaXMuX2J0bldlYXBvbi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9odWFuZ1wiKTtcclxuICAgICAgICAgICAgbGV0IGJ0bl9odWFuZ19zbWFsbCA9IHRoaXMuX2J0bldlYXBvbi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9odWFuZ19zbWFsbFwiKTtcclxuICAgICAgICAgICAgbGV0IGJ0bl9ob25nID0gdGhpcy5fYnRuV2VhcG9uLmdldENoaWxkQnlOYW1lKFwiYnRuX2hvbmdcIik7XHJcbiAgICAgICAgICAgIGxldCB0eHRfYnV5ID0gdGhpcy5fYnRuV2VhcG9uLmdldENoaWxkQnlOYW1lKFwidHh0X2J1eVwiKTtcclxuICAgICAgICAgICAgbGV0IHR4dF9zandjID0gdGhpcy5fYnRuV2VhcG9uLmdldENoaWxkQnlOYW1lKFwidHh0X3Nqd2NcIik7XHJcbiAgICAgICAgICAgIGxldCB0eHRfdXBncmFkZSA9IHRoaXMuX2J0bldlYXBvbi5nZXRDaGlsZEJ5TmFtZShcInR4dF91cGdyYWRlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdHh0X3pwamwgPSB0aGlzLl9idG5XZWFwb24uZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfenBqbFwiKTtcclxuICAgICAgICAgICAgbGV0IGljb25famluYmkgPSB0aGlzLl9idG5XZWFwb24uZ2V0Q2hpbGRCeU5hbWUoXCJpY29uX2ppbmJpXCIpO1xyXG4gICAgICAgICAgICBsZXQgaWNvbl96dWFuc2hpID0gdGhpcy5fYnRuV2VhcG9uLmdldENoaWxkQnlOYW1lKFwiaWNvbl96dWFuc2hpXCIpO1xyXG4gICAgICAgICAgICBsZXQgcHJpY2UgPSB0aGlzLl9idG5XZWFwb24uZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKTtcclxuICAgICAgICAgICAgaWYgKHNob3dXZWFwb25JbmZvLlN0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIOinhumikeino+mUgVxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XSAmJiBHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0udmlkZW9Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bldlYXBvbi54ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bldlYXBvbi53aWR0aCA9IDE2OTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnRuX2h1YW5nX3NtYWxsKSBidG5faHVhbmdfc21hbGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDph5HluIFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlVHlwZSA9PSBQcmljZVR5cGUuR29sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl9qaW5iaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl9qaW5iaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl9qaW5iaS54ID0gLTUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLnggPSAtMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmSu+efs1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLkRpYW1vbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGljb25fenVhbnNoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl96dWFuc2hpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX3p1YW5zaGkueCA9IC01MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS54ID0gLTEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJyArIEdhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XS5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDovaznm5jlpZblirFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0ucHJpY2VUeXBlID09IFByaWNlVHlwZS5aaHVhblBhblJld2FyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHh0X3pwamwpIHR4dF96cGpsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOinhumikeino+mUgVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bldlYXBvbkFkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvQ291bnQgPSB0aGlzLl9idG5XZWFwb25BZC5nZXRDaGlsZEJ5TmFtZShcInZpZGVvQ291bnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvQ291bnQpIHZpZGVvQ291bnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzaG93V2VhcG9uSW5mby5WaWRlb0NvdW50ICsgXCIvXCIgKyBHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0udmlkZW9Db3VudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOi0reS5sFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uQWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uLnggPSAyNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uLndpZHRoID0gMjUyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidG5faHVhbmcpIGJ0bl9odWFuZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0ucHJpY2VUeXBlID09IFByaWNlVHlwZS5Hb2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eHRfYnV5KSB0eHRfYnV5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uX2ppbmJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ppbmJpLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLnggPSAzMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJycgKyBHYW1lRGF0ZS5XZWFwb25bc2hvd1dlYXBvbktleV0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZK755+zXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlVHlwZSA9PSBQcmljZVR5cGUuRGlhbW9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHh0X2J1eSkgdHh0X2J1eS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl96dWFuc2hpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uX3p1YW5zaGkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fenVhbnNoaS54ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS54ID0gMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgR2FtZURhdGUuV2VhcG9uW3Nob3dXZWFwb25LZXldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi9rOebmOWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLldlYXBvbltzaG93V2VhcG9uS2V5XS5wcmljZVR5cGUgPT0gUHJpY2VUeXBlLlpodWFuUGFuUmV3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eHRfenBqbCkgdHh0X3pwamwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Y2H57qnXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNob3dXZWFwb25JbmZvLkxldmVsIDwgMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uQWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5XZWFwb24ueCA9IDI1MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0bldlYXBvbi53aWR0aCA9IDI1MjtcclxuICAgICAgICAgICAgICAgIGlmIChidG5faG9uZykgYnRuX2hvbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eHRfdXBncmFkZSkgdHh0X3VwZ3JhZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChpY29uX2ppbmJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbl9qaW5iaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25famluYmkueCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlLnggPSAzMDtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgQ29uc3RhbnQud2VhcG9uTGV2ZWxQcmljZUFycltzaG93V2VhcG9uSW5mby5MZXZlbF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5pyA5aSn562J57qnXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuV2VhcG9uQWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5XZWFwb24ueCA9IDI1MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0bldlYXBvbi53aWR0aCA9IDI1MjtcclxuICAgICAgICAgICAgICAgIGlmICh0eHRfc2p3YykgdHh0X3Nqd2MuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlV2VhcG9uRnJhbWUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVdlYXBvbkZyYW1lKCkge1xyXG4gICAgICAgIGxldCBndW5JbmZvczogc3RyaW5nID0gY29jb3N6LmRhdGFNZ3IuZ2V0SXRlbShDb25zdGFudC5TVF9HdW5JbmZvLCBcIlwiKTtcclxuICAgICAgICBpZiAoZ3VuSW5mb3MpIHtcclxuICAgICAgICAgICAgbGV0IGd1bkluZm9BcnI6IEd1bkluZm9bXSA9IEpTT04ucGFyc2UoZ3VuSW5mb3MpO1xyXG4gICAgICAgICAgICBpZiAoZ3VuSW5mb0Fycikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93ZWFwb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl93ZWFwb25MaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHYW1lRGF0ZS5XZWFwb25bbm9kZS5uYW1lXSAmJiBHYW1lRGF0ZS5XZWFwb25bbm9kZS5uYW1lXS5pZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IEdhbWVEYXRlLldlYXBvbltub2RlLm5hbWVdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3VuSW5mb0FycltpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ZSA9IGd1bkluZm9BcnJbaWRdLlN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwia3VhbmdfaHVpXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwia3VhbmdfaHVpXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgInkuK1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5hbWUgPT0gV2VhcG9uLldlYXBvbk5hbWVbdGhpcy5fc2hvd1dlYXBvbklkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJrdWFuZ19odWFuZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmlfYXJyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGd1bkluZm9BcnJbaWRdLlN0YXRlID4gMCAmJiBndW5JbmZvQXJyW2lkXS5MZXZlbCA8IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaV9hcnJvdy54ID0gbm9kZS54ICsgMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmlfYXJyb3cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaV9hcnJvdy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImt1YW5nX2h1YW5nXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImt1YW5nX2h1aVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJrdWFuZ19odWFuZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJrdWFuZ19odWlcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJrdWFuZ19odWFuZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDph5HluIEv6ZK755+z5by556qXICovXHJcbiAgICBzaG93Q29pblBhbmVsKGlzRGlhbW9uZDogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoY29jb3N6LnJlc01nci5nZXRSZXMoXCJVSUFEUGFuZWxcIiwgY2MuUHJlZmFiKSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBpZiAoaXNEaWFtb25kKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiVUlBRFBhbmVsXCIpLnNldERpYW1vbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmjnumHkeW4gS/pkrvnn7MgKi9cclxuICAgIHByaXZhdGUgX2ZseUNvaW5zKGljb25OYW1lOiBzdHJpbmcsIGZyYW1lTm9kZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwb3NOb2RlID0gY2MuZmluZChmcmFtZU5vZGVOYW1lLCB0aGlzLl9wYWdlKTtcclxuICAgICAgICBpZiAoIXBvc05vZGUpIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gcG9zTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBvc05vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIEZseUNvaW4uU2hvdyhpY29uTmFtZSwgcG9zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pu05paw6Z+z6aKR5byA5YWzICovXHJcbiAgICBwcml2YXRlIF91cGRhdGVBdWRpb0J0bihpc1BsYXk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgbGV0IG9mZkltZzogY2MuTm9kZSA9IGNjLmZpbmQoXCJCYWNrZ3JvdW5kL29mZlwiLCB0aGlzLl9idG5BdWRpbyk7XHJcbiAgICAgICAgb2ZmSW1nLmFjdGl2ZSA9IGNvY29zei5kYXRhTWdyLkF1ZGlvT24gPT0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGlzUGxheSkge1xyXG4gICAgICAgICAgICAvL+WIpOaWreW8gOWFs++8jOmHjeaWsOaSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAgICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuQXVkaW9Pbikge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlCZ20oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvY29zei5hdWRpb01nci5zdG9wQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOabtOaWsOmch+WKqOW8gOWFsyAqL1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRTaGFrZUJ0bigpIHtcclxuICAgICAgICBsZXQgb2ZmSW1nOiBjYy5Ob2RlID0gY2MuZmluZChcIkJhY2tncm91bmQvb2ZmXCIsIHRoaXMuX2J0blNoYWtlKTtcclxuICAgICAgICBvZmZJbWcuYWN0aXZlID0gY29jb3N6LmRhdGFNZ3IuU2hha2VPbiA9PSBmYWxzZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19