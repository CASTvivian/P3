"use strict";
cc._RF.push(module, 'ca02eHXE+9E+Yrp8V9uxTLx', 'UIGamePage');
// scripts/UI/UIGamePage.ts

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
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏页面
 */
var UIGamePage = /** @class */ (function (_super) {
    __extends(UIGamePage, _super);
    function UIGamePage() {
        var _this = _super.call(this, Constant_1.PageName.UIGamePage) || this;
        _this._handAni = null;
        _this._btnCt = null;
        _this._btnQpbz = null;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIGamePage.prototype.onLoad = function () {
        var _this = this;
        this._handAni = cc.find("handAni", this._page);
        var btnList1 = ["rangedWeapon", "rangedWeaponAd", "BtnPause", "BtnBullet", "BtnShuxing", "BtnHideBanner", "BtnCt", "BtnQpbz"];
        btnList1.forEach(function (btnName) {
            var btn = _this._page.getChildByName(btnName);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, _this._onBtnClickHandler, _this);
                if (btn.name == "rangedWeaponAd") {
                    if (CocosZ_1.cocosz.isADON && CocosZ_1.cocosz.getConfigByKey("isVideoAd_advanced_weapon") != "false") {
                        btn.active = true;
                    }
                    else {
                        btn.active = false;
                    }
                }
                else if (btn.name == "BtnHideBanner") {
                    if (CocosZ_1.cocosz.isShowAd && CocosZ_1.cocosz.isADON && CocosZ_1.cocosz.getConfigByKey("isVideoAd_hideBanner") == "true") {
                        btn.active = true;
                    }
                    else {
                        btn.active = false;
                    }
                }
                else if (btn.name == "BtnCt") {
                    _this._btnCt = btn;
                    if (CocosZ_1.cocosz.isShowAd && CocosZ_1.cocosz.isADON && !CocosZ_1.cocosz.dataMgr.guide_skill && CocosZ_1.cocosz.getConfigByKey("isVideoAd_Citie") != "false") {
                        _this._btnCt.active = true;
                        // 隐藏图标
                        if (_this._btnCt.childrenCount) {
                            _this._btnCt.children.forEach(function (child) { child.active = false; });
                        }
                    }
                    else {
                        _this._btnCt.active = false;
                        var widget = _this._btnCt.getComponent(cc.Widget);
                        if (widget) {
                            widget.enabled = false;
                        }
                    }
                }
                else if (btn.name == "BtnQpbz") {
                    _this._btnQpbz = btn;
                    if (CocosZ_1.cocosz.isShowAd && CocosZ_1.cocosz.isADON && !CocosZ_1.cocosz.dataMgr.guide_skill && CocosZ_1.cocosz.getConfigByKey("isVideoAd_Qpbz") != "false") {
                        _this._btnQpbz.active = true;
                        // 隐藏图标
                        if (_this._btnQpbz.childrenCount) {
                            _this._btnQpbz.children.forEach(function (child) { child.active = false; });
                        }
                    }
                    else {
                        _this._btnQpbz.active = false;
                        var widget = _this._btnQpbz.getComponent(cc.Widget);
                        if (widget) {
                            widget.enabled = false;
                        }
                    }
                }
            }
        });
    };
    UIGamePage.prototype.onOpen = function () {
        var _this = this;
        Utils_1.utils.SendEvent("页面-游戏");
        //监听游戏事件
        // cc.game.on(Constant.E_GAME_LOGIC, this._onGameMessageHandler, this);
        gameMgr_1.gameMgr.uiGamePage = this._page;
        gameMgr_1.gameMgr.moveArea = cc.find("moveArea", this._page);
        gameMgr_1.gameMgr.yaogan = cc.find("move", this._page);
        var widge = gameMgr_1.gameMgr.yaogan.getComponent(cc.Widget);
        if (widge) {
            gameMgr_1.gameMgr.yaogan.getComponent(cc.Widget).updateAlignment();
            widge.enabled = false;
        }
        // gameMgr.btnSkill = cc.find("BtnSkill", this._page);
        // gameMgr.btnSkillAd = cc.find("BtnSkillAd", this._page);
        gameMgr_1.gameMgr.rangedWeaponMess = this._page.getChildByName("rangedWeapon");
        gameMgr_1.gameMgr.ammo = gameMgr_1.gameMgr.rangedWeaponMess.getChildByName("ammo").getComponent(cc.Label);
        gameMgr_1.gameMgr.rangedWeaponAdMess = this._page.getChildByName("rangedWeaponAd");
        gameMgr_1.gameMgr.ammoAd = gameMgr_1.gameMgr.rangedWeaponAdMess.getChildByName("ammo").getComponent(cc.Label);
        gameMgr_1.gameMgr.qlzc = this._page.getChildByName("qlzc");
        gameMgr_1.gameMgr.BtnBullet = this._page.getChildByName("BtnBullet");
        // 地下城
        if (CocosZ_1.cocosz.gameMode == 6) {
            // boss血条
            gameMgr_1.gameMgr.model6_bossBar = this._page.getChildByName("bossBar").getComponent(cc.ProgressBar);
            // 经验条
            gameMgr_1.gameMgr.model6_jingyanBar = this._page.getChildByName("jingyanBar").getComponent(cc.ProgressBar);
            // 技能条
            gameMgr_1.gameMgr.model6_skillScrollView = this._page.getChildByName("skillScrollView").getComponent(cc.ScrollView);
            gameMgr_1.gameMgr.model6_skillScrollView_content = cc.find("skillScrollView/view/content", this._page);
            gameMgr_1.gameMgr.model6_skillScrollView_item = this._page.getChildByName("item");
            // 头像
            var BtnShuxing = this._page.getChildByName("BtnShuxing");
            gameMgr_1.gameMgr.model6_touxiang = BtnShuxing.getChildByName("touxiang");
            var pre = CocosZ_1.cocosz.resMgr.getRes("head" + (CocosZ_1.cocosz.gameMgr.gameCtr.curUseSkinId + 1), cc.Prefab);
            if (pre) {
                var touxiang = cc.instantiate(pre);
                touxiang.setParent(gameMgr_1.gameMgr.model6_touxiang);
                touxiang.scale = 1;
                if (touxiang.children[0]) {
                    touxiang.children[0].active = false;
                }
            }
            // 属性按钮
            gameMgr_1.gameMgr.model6_btnShuxing = this._page.getChildByName("BtnShuxing");
            if (gameMgr_1.gameMgr.model6_btnShuxing)
                gameMgr_1.gameMgr.model6_btnShuxing.active = true;
            gameMgr_1.gameMgr.model6_shuxing = BtnShuxing.getChildByName("shuxing");
            gameMgr_1.gameMgr.model6_shuxing.active = false;
            // 等级
            gameMgr_1.gameMgr.model6_levelLabel = this._page.getChildByName("levelLabel").getComponent(cc.Label);
            // 计时
            gameMgr_1.gameMgr.model6_timeLabel = this._page.getChildByName("timeLabel").getComponent(cc.Label);
            // boss提示
            gameMgr_1.gameMgr.model6_ts = this._page.getChildByName("ts");
            if (CocosZ_1.cocosz.dataMgr.guide_skill && (CocosZ_1.cocosz.getConfigByKey("isVideoAd_Qpbz") != "false" || CocosZ_1.cocosz.getConfigByKey("isVideoAd_Citie") != "false")) {
                var count_1 = 0;
                var tw_1 = cc.tween(this._page)
                    .delay(1)
                    .call(function () {
                    if (gameMgr_1.gameMgr.isGameStart && !CocosZ_1.cocosz.isPause) {
                        count_1++;
                        cc.log("count:", count_1);
                        if (count_1 == 5) {
                            if (CocosZ_1.cocosz.getConfigByKey("isVideoAd_Qpbz") != "false") {
                                _this.showSkill(_this._btnQpbz);
                            }
                        }
                        else if (count_1 == 8) {
                            if (CocosZ_1.cocosz.getConfigByKey("isVideoAd_Citie") != "false") {
                                _this.showSkill(_this._btnCt);
                            }
                        }
                        else if (count_1 > 8) {
                            CocosZ_1.cocosz.dataMgr.guide_skill = false;
                            tw_1 && tw_1.stop();
                        }
                    }
                })
                    .union()
                    .repeatForever()
                    .start();
            }
        }
        gameMgr_1.gameMgr.startGame();
        this.showAd();
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
    };
    UIGamePage.prototype.onClose = function () {
        cc.game.targetOff(this);
        Utils_1.utils.adManager.hideBlockAd();
        Utils_1.utils.adManager.hideNativeTryGameWidget();
        Utils_1.utils.hideVivoGamePortalWidget();
        Utils_1.utils.adManager.HideSingleNativeAd();
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.adManager.hideCustomAd({ location: 3 });
            Utils_1.utils.adManager.hideCustomAd({ location: 4 });
            Utils_1.utils.adManager.hideCustomAd({ location: 8 });
        }
        else if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.adManager.hideCustomAd({ location: YZ_Constant_1.BannerLocation.Game });
        }
    };
    UIGamePage.prototype.showAd = function () {
        // 录屏
        Utils_1.utils.showRecordWidget({ group: "default", scale: 1, top: 50, left: 100, parent: this._page });
        if (CocosZ_1.cocosz.isShowAd) {
            // banner
            if (!CocosZ_1.cocosz.isShowGameBanner || PlatUtils_1.default.IsWechat || PlatUtils_1.default.IsDouyin || PlatUtils_1.default.IsAndroidDouYin) {
                Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
            }
            else {
                Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game, { width: 0.1, bottom: 0 });
            }
            Utils_1.utils.adManager.showNativeTryGameWidget({ left: 10, top: 500, scale: 1, parent: this._page });
            // 原生广告
            if (PlatUtils_1.default.IsWechat) {
                Utils_1.utils.adManager.showCustomAd({ location: 3 });
                Utils_1.utils.adManager.showCustomAd({ location: 4 });
                Utils_1.utils.adManager.showCustomAd({ location: 8 });
            }
            else if (PlatUtils_1.default.IsVIVO) {
                Utils_1.utils.adManager.showCustomAd({ location: YZ_Constant_1.BannerLocation.Game });
            }
        }
    };
    UIGamePage.prototype.showSkill = function (n) {
        var _this = this;
        var widget = n.getComponent(cc.Widget);
        if (widget)
            widget.enabled = false;
        if (n && n.isValid) {
            CocosZ_1.cocosz.pauseCount++;
            n.setPosition(0, cc.winSize.height / 2);
            n.scale = 2;
            n.active = true;
            var call_1 = function () {
                n.stopAllActions();
                cc.tween(n)
                    .call(function () {
                    if (_this._handAni && _this._handAni.isValid) {
                        _this._handAni.active = false;
                    }
                })
                    .to(0.5, { scale: 1, x: -cc.winSize.width / 2 + widget.left + n.width / 2, y: -cc.winSize.height / 2 + widget.bottom + n.height / 2 })
                    .call(function () {
                    if (widget)
                        widget.enabled = true;
                    CocosZ_1.cocosz.pauseCount--;
                })
                    .start();
            };
            n.once(cc.Node.EventType.TOUCH_END, call_1, this);
            n.stopAllActions();
            cc.tween(n)
                .to(1, { y: 0 }, { easing: "backOut" })
                .call(function () {
                if (_this._handAni && _this._handAni.isValid) {
                    _this._handAni.setPosition(0, 0);
                    _this._handAni.active = true;
                    var spAni = _this._handAni.getComponent(sp.Skeleton);
                    if (spAni)
                        spAni.setAnimation(0, "animation", true);
                }
            })
                .delay(4)
                .call(function () {
                n.off(cc.Node.EventType.TOUCH_END, call_1, _this);
                call_1();
            })
                .start();
        }
    };
    // 全屏轰炸动画
    UIGamePage.prototype.effect_qpbz = function () {
        var pre = CocosZ_1.cocosz.resMgr.getRes("effect_qpbz", cc.Prefab);
        if (pre) {
            var node_1 = cc.instantiate(pre);
            node_1.setPosition(gameMgr_1.gameMgr.playerTs.node.position);
            cc.director.getScene().getChildByName("Canvas").addChild(node_1);
            cc.tween(node_1)
                .delay(0.3)
                .call(function () {
                gameMgr_1.gameMgr.playEffect("QuanPingBaoZha");
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Allzombie_Destory });
            })
                .union()
                .repeat(4)
                .call(function () { node_1.destroy(); })
                .start();
        }
    };
    UIGamePage.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
        }
    };
    UIGamePage.prototype._onBtnClickHandler = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var adIcon_1;
            var _this = this;
            return __generator(this, function (_a) {
                CocosZ_1.cocosz.audioMgr.playBtnEffect();
                switch (event.target.name) {
                    case "rangedWeaponAd": {
                        if (gameMgr_1.gameMgr.rangedWeaponAdMess) {
                            adIcon_1 = gameMgr_1.gameMgr.rangedWeaponAdMess.getChildByName("adIcon");
                            if (adIcon_1 && adIcon_1.active) {
                                Utils_1.utils.SendEvent("视频-高级武器-播放");
                                CocosZ_1.cocosz.watchAD(function () {
                                    Utils_1.utils.SendEvent("视频-高级武器-成功");
                                    adIcon_1.active = false;
                                    gameMgr_1.gameMgr.useRangedWeaponAd();
                                    gameMgr_1.gameMgr.rangedWeaponAdMess.stopAllActions();
                                }, function () {
                                    Utils_1.utils.SendEvent("视频-高级武器-失败");
                                });
                            }
                            else {
                                gameMgr_1.gameMgr.useRangedWeaponAd();
                            }
                        }
                        break;
                    }
                    case "rangedWeapon": {
                        gameMgr_1.gameMgr.useRangedWeapon();
                        break;
                    }
                    case "BtnPause": {
                        CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UIPausePanel);
                        break;
                    }
                    case "BtnBullet": {
                        if (gameMgr_1.gameMgr.BtnBullet && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.curWeapon && gameMgr_1.gameMgr.playerTs.curWeapon.isRangeWeapon)
                            gameMgr_1.gameMgr.playerTs.curWeapon.reloadBullet();
                        break;
                    }
                    case "BtnShuxing": {
                        gameMgr_1.gameMgr.model6_shuxing.active = !gameMgr_1.gameMgr.model6_shuxing.active;
                        gameMgr_1.gameMgr.update_model6_shuxing();
                        break;
                    }
                    case "BtnHideBanner": {
                        Utils_1.utils.SendEvent("视频-游戏中去广告-播放");
                        CocosZ_1.cocosz.watchAD(function () {
                            Utils_1.utils.SendEvent("视频-游戏中去广告-成功");
                            event.target.active = false;
                            gameMgr_1.gameMgr.canSHowGameBanner = false;
                            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
                        }, function () {
                            Utils_1.utils.SendEvent("视频-游戏中去广告-失败");
                        });
                        break;
                    }
                    case "BtnCt": {
                        if (this._btnCt && this._btnCt.getChildByName("share") && this._btnCt.getChildByName("share").active) {
                            Utils_1.utils.SendEvent("分享-磁铁");
                            CocosZ_1.cocosz.share(function () {
                                Utils_1.utils.SendEvent("分享-磁铁-成功");
                                // 磁铁事件
                                cc.game.emit(Constant_1.default.E_Skill_Citie);
                            }, function () {
                                Utils_1.utils.SendEvent("分享-磁铁-失败");
                            });
                        }
                        else if (this._btnCt && this._btnCt.getChildByName("video") && this._btnCt.getChildByName("video").active) {
                            Utils_1.utils.SendEvent("视频-磁铁-播放");
                            CocosZ_1.cocosz.watchAD(function () {
                                Utils_1.utils.SendEvent("视频-磁铁-成功");
                                // 磁铁事件
                                cc.game.emit(Constant_1.default.E_Skill_Citie);
                            }, function () {
                                Utils_1.utils.SendEvent("视频-磁铁-失败");
                            });
                        }
                        else {
                            // 磁铁事件
                            cc.game.emit(Constant_1.default.E_Skill_Citie);
                        }
                        break;
                    }
                    case "BtnQpbz": {
                        if (this._btnQpbz && this._btnQpbz.getChildByName("share") && this._btnQpbz.getChildByName("share").active) {
                            Utils_1.utils.SendEvent("分享-全屏轰炸");
                            CocosZ_1.cocosz.share(function () {
                                Utils_1.utils.SendEvent("分享-全屏轰炸-成功");
                                // 全屏轰炸动画
                                _this.effect_qpbz();
                            }, function () {
                                Utils_1.utils.SendEvent("分享-全屏轰炸-失败");
                            });
                        }
                        else if (this._btnQpbz && this._btnQpbz.getChildByName("video") && this._btnQpbz.getChildByName("video").active) {
                            Utils_1.utils.SendEvent("视频-全屏轰炸-播放");
                            CocosZ_1.cocosz.watchAD(function () {
                                Utils_1.utils.SendEvent("视频-全屏轰炸-成功");
                                // 全屏轰炸动画
                                _this.effect_qpbz();
                            }, function () {
                                Utils_1.utils.SendEvent("视频-全屏轰炸-失败");
                            });
                        }
                        else {
                            // 全屏轰炸动画
                            this.effect_qpbz();
                        }
                        break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    UIGamePage = __decorate([
        ccclass
    ], UIGamePage);
    return UIGamePage;
}(UIPage_1.default));
exports.default = UIGamePage;

cc._RF.pop();