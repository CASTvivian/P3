"use strict";
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