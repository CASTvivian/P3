
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIGamePage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJR2FtZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQXlDO0FBQ3pDLGtEQUFzRTtBQUN0RSw4Q0FBNkM7QUFDN0MsbUVBQThEO0FBQzlELDJEQUEwRDtBQUMxRCx1RUFBeUU7QUFDekUsMkNBQTBDO0FBRzFDLGFBQWE7QUFDYixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFL0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7O0dBRUc7QUFFSDtJQUF3Qyw4QkFBTTtJQU0xQztRQUFBLFlBQ0ksa0JBQU0sbUJBQVEsQ0FBQyxVQUFVLENBQUMsU0FFN0I7UUFQTyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUk3QixLQUFJLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztJQUNwQyxDQUFDO0lBRVMsMkJBQU0sR0FBaEI7UUFBQSxpQkFpREM7UUFoREcsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5SCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUNwQixJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMs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TUFBTTtxQkFDVDtpQkFDSjs7OztLQUNKO0lBdFdnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBdVc5QjtJQUFELGlCQUFDO0NBdldELEFBdVdDLENBdld1QyxnQkFBTSxHQXVXN0M7a0JBdldvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBVSVBhZ2UgZnJvbSBcIi4uL0ZyYW1ld29yay9VSVBhZ2VcIjtcclxuaW1wb3J0IENvbnN0YW50LCB7IFBhZ2VOYW1lLCBQYW5lbE5hbWUgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgeyBnYW1lTWdyIH0gZnJvbSBcIi4uL0dhbWUvZ2FtZU1nclwiO1xyXG5pbXBvcnQgeyBndWlkZUxheWVyIH0gZnJvbSBcIi4vR3VpZGVMYXllclwiO1xyXG5pbXBvcnQgeyBzdGFydCB9IGZyb20gXCJyZXBsXCI7XHJcbi8vIEB0cy1pZ25vcmVcclxuY29uc3QgaTE4biA9IHJlcXVpcmUoJ0xhbmd1YWdlRGF0YScpO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG4vKipcclxuICog5ri45oiP6aG16Z2iXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUdhbWVQYWdlIGV4dGVuZHMgVUlQYWdlIHtcclxuXHJcbiAgICBwcml2YXRlIF9oYW5kQW5pOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0bkN0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0blFwYno6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFBhZ2VOYW1lLlVJR2FtZVBhZ2UpO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCgpICYmIHRoaXMub25Mb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9oYW5kQW5pID0gY2MuZmluZChcImhhbmRBbmlcIiwgdGhpcy5fcGFnZSk7XHJcblxyXG4gICAgICAgIGxldCBidG5MaXN0MSA9IFtcInJhbmdlZFdlYXBvblwiLCBcInJhbmdlZFdlYXBvbkFkXCIsIFwiQnRuUGF1c2VcIiwgXCJCdG5CdWxsZXRcIiwgXCJCdG5TaHV4aW5nXCIsIFwiQnRuSGlkZUJhbm5lclwiLCBcIkJ0bkN0XCIsIFwiQnRuUXBielwiXTtcclxuICAgICAgICBidG5MaXN0MS5mb3JFYWNoKGJ0bk5hbWUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShidG5OYW1lKTtcclxuICAgICAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICAgICAgYnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25CdG5DbGlja0hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5uYW1lID09IFwicmFuZ2VkV2VhcG9uQWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouaXNBRE9OICYmIGNvY29zei5nZXRDb25maWdCeUtleShcImlzVmlkZW9BZF9hZHZhbmNlZF93ZWFwb25cIikgIT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ0bi5uYW1lID09IFwiQnRuSGlkZUJhbm5lclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvY29zei5pc1Nob3dBZCAmJiBjb2Nvc3ouaXNBRE9OICYmIGNvY29zei5nZXRDb25maWdCeUtleShcImlzVmlkZW9BZF9oaWRlQmFubmVyXCIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ0bi5uYW1lID09IFwiQnRuQ3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bkN0ID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouaXNTaG93QWQgJiYgY29jb3N6LmlzQURPTiAmJiAhY29jb3N6LmRhdGFNZ3IuZ3VpZGVfc2tpbGwgJiYgY29jb3N6LmdldENvbmZpZ0J5S2V5KFwiaXNWaWRlb0FkX0NpdGllXCIpICE9IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5DdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpmpDol4/lm77moIdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J0bkN0LmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bkN0LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmFjdGl2ZSA9IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuQ3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl9idG5DdC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpZGdldCkgeyB3aWRnZXQuZW5hYmxlZCA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChidG4ubmFtZSA9PSBcIkJ0blFwYnpcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0blFwYnogPSBidG47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvY29zei5pc1Nob3dBZCAmJiBjb2Nvc3ouaXNBRE9OICYmICFjb2Nvc3ouZGF0YU1nci5ndWlkZV9za2lsbCAmJiBjb2Nvc3ouZ2V0Q29uZmlnQnlLZXkoXCJpc1ZpZGVvQWRfUXBielwiKSAhPSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuUXBiei5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpmpDol4/lm77moIdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J0blFwYnouY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuUXBiei5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4geyBjaGlsZC5hY3RpdmUgPSBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0blFwYnouYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl9idG5RcGJ6LmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2lkZ2V0KSB7IHdpZGdldC5lbmFibGVkID0gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6aG16Z2iLea4uOaIj1wiKTtcclxuICAgICAgICAvL+ebkeWQrOa4uOaIj+S6i+S7tlxyXG4gICAgICAgIC8vIGNjLmdhbWUub24oQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB0aGlzLl9vbkdhbWVNZXNzYWdlSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgZ2FtZU1nci51aUdhbWVQYWdlID0gdGhpcy5fcGFnZTtcclxuICAgICAgICBnYW1lTWdyLm1vdmVBcmVhID0gY2MuZmluZChcIm1vdmVBcmVhXCIsIHRoaXMuX3BhZ2UpO1xyXG4gICAgICAgIGdhbWVNZ3IueWFvZ2FuID0gY2MuZmluZChcIm1vdmVcIiwgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgbGV0IHdpZGdlID0gZ2FtZU1nci55YW9nYW4uZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgaWYgKHdpZGdlKSB7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IueWFvZ2FuLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB3aWRnZS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdhbWVNZ3IuYnRuU2tpbGwgPSBjYy5maW5kKFwiQnRuU2tpbGxcIiwgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgLy8gZ2FtZU1nci5idG5Ta2lsbEFkID0gY2MuZmluZChcIkJ0blNraWxsQWRcIiwgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgZ2FtZU1nci5yYW5nZWRXZWFwb25NZXNzID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcInJhbmdlZFdlYXBvblwiKTtcclxuICAgICAgICBnYW1lTWdyLmFtbW8gPSBnYW1lTWdyLnJhbmdlZFdlYXBvbk1lc3MuZ2V0Q2hpbGRCeU5hbWUoXCJhbW1vXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgZ2FtZU1nci5yYW5nZWRXZWFwb25BZE1lc3MgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwicmFuZ2VkV2VhcG9uQWRcIik7XHJcbiAgICAgICAgZ2FtZU1nci5hbW1vQWQgPSBnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcy5nZXRDaGlsZEJ5TmFtZShcImFtbW9cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBnYW1lTWdyLnFsemMgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwicWx6Y1wiKTtcclxuICAgICAgICBnYW1lTWdyLkJ0bkJ1bGxldCA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5CdWxsZXRcIik7XHJcbiAgICAgICAgLy8g5Zyw5LiL5Z+OXHJcbiAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSA9PSA2KSB7XHJcbiAgICAgICAgICAgIC8vIGJvc3PooYDmnaFcclxuICAgICAgICAgICAgZ2FtZU1nci5tb2RlbDZfYm9zc0JhciA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJib3NzQmFyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIC8vIOe7j+mqjOadoVxyXG4gICAgICAgICAgICBnYW1lTWdyLm1vZGVsNl9qaW5neWFuQmFyID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcImppbmd5YW5CYXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICAgICAgLy8g5oqA6IO95p2hXHJcbiAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X3NraWxsU2Nyb2xsVmlldyA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbFNjcm9sbFZpZXdcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgICAgICBnYW1lTWdyLm1vZGVsNl9za2lsbFNjcm9sbFZpZXdfY29udGVudCA9IGNjLmZpbmQoXCJza2lsbFNjcm9sbFZpZXcvdmlldy9jb250ZW50XCIsIHRoaXMuX3BhZ2UpO1xyXG4gICAgICAgICAgICBnYW1lTWdyLm1vZGVsNl9za2lsbFNjcm9sbFZpZXdfaXRlbSA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpO1xyXG4gICAgICAgICAgICAvLyDlpLTlg49cclxuICAgICAgICAgICAgbGV0IEJ0blNodXhpbmcgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwiQnRuU2h1eGluZ1wiKTtcclxuICAgICAgICAgICAgZ2FtZU1nci5tb2RlbDZfdG91eGlhbmcgPSBCdG5TaHV4aW5nLmdldENoaWxkQnlOYW1lKFwidG91eGlhbmdcIik7XHJcbiAgICAgICAgICAgIGxldCBwcmUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcImhlYWRcIiArIChjb2Nvc3ouZ2FtZU1nci5nYW1lQ3RyLmN1clVzZVNraW5JZCArIDEpLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91eGlhbmcgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAgICAgdG91eGlhbmcuc2V0UGFyZW50KGdhbWVNZ3IubW9kZWw2X3RvdXhpYW5nKTtcclxuICAgICAgICAgICAgICAgIHRvdXhpYW5nLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIGlmICh0b3V4aWFuZy5jaGlsZHJlblswXSkgeyB0b3V4aWFuZy5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWxnuaAp+aMiemSrlxyXG4gICAgICAgICAgICBnYW1lTWdyLm1vZGVsNl9idG5TaHV4aW5nID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcIkJ0blNodXhpbmdcIik7XHJcbiAgICAgICAgICAgIGlmIChnYW1lTWdyLm1vZGVsNl9idG5TaHV4aW5nKSBnYW1lTWdyLm1vZGVsNl9idG5TaHV4aW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X3NodXhpbmcgPSBCdG5TaHV4aW5nLmdldENoaWxkQnlOYW1lKFwic2h1eGluZ1wiKTtcclxuICAgICAgICAgICAgZ2FtZU1nci5tb2RlbDZfc2h1eGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8g562J57qnXHJcbiAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X2xldmVsTGFiZWwgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAvLyDorqHml7ZcclxuICAgICAgICAgICAgZ2FtZU1nci5tb2RlbDZfdGltZUxhYmVsID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcInRpbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAvLyBib3Nz5o+Q56S6XHJcbiAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X3RzID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcInRzXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvY29zei5kYXRhTWdyLmd1aWRlX3NraWxsICYmIChjb2Nvc3ouZ2V0Q29uZmlnQnlLZXkoXCJpc1ZpZGVvQWRfUXBielwiKSAhPSBcImZhbHNlXCIgfHwgY29jb3N6LmdldENvbmZpZ0J5S2V5KFwiaXNWaWRlb0FkX0NpdGllXCIpICE9IFwiZmFsc2VcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0dzogY2MuVHdlZW4gPSBjYy50d2Vlbih0aGlzLl9wYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kZWxheSgxKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IuaXNHYW1lU3RhcnQgJiYgIWNvY29zei5pc1BhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiY291bnQ6XCIsIGNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29jb3N6LmdldENvbmZpZ0J5S2V5KFwiaXNWaWRlb0FkX1FwYnpcIikgIT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NraWxsKHRoaXMuX2J0blFwYnopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2V0Q29uZmlnQnlLZXkoXCJpc1ZpZGVvQWRfQ2l0aWVcIikgIT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NraWxsKHRoaXMuX2J0bkN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID4gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLmd1aWRlX3NraWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHcgJiYgdHcuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKClcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnYW1lTWdyLnN0YXJ0R2FtZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNob3dBZCgpO1xyXG4gICAgICAgIGNjLmdhbWUub24oQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB0aGlzLl9vbkdhbWVNZXNzYWdlSGFuZGxlciwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVCbG9ja0FkKCk7XHJcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVOYXRpdmVUcnlHYW1lV2lkZ2V0KCk7XHJcbiAgICAgICAgdXRpbHMuaGlkZVZpdm9HYW1lUG9ydGFsV2lkZ2V0KCk7XHJcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVTaW5nbGVOYXRpdmVBZCgpO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVDdXN0b21BZCh7IGxvY2F0aW9uOiAzIH0pO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuaGlkZUN1c3RvbUFkKHsgbG9jYXRpb246IDQgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlQ3VzdG9tQWQoeyBsb2NhdGlvbjogOCB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVDdXN0b21BZCh7IGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbi5HYW1lIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3dBZCgpIHtcclxuICAgICAgICAvLyDlvZXlsY9cclxuICAgICAgICB1dGlscy5zaG93UmVjb3JkV2lkZ2V0KHsgZ3JvdXA6IFwiZGVmYXVsdFwiLCBzY2FsZTogMSwgdG9wOiA1MCwgbGVmdDogMTAwLCBwYXJlbnQ6IHRoaXMuX3BhZ2UgfSk7XHJcbiAgICAgICAgaWYgKGNvY29zei5pc1Nob3dBZCkge1xyXG4gICAgICAgICAgICAvLyBiYW5uZXJcclxuICAgICAgICAgICAgaWYgKCFjb2Nvc3ouaXNTaG93R2FtZUJhbm5lciB8fCBQbGF0VXRpbHMuSXNXZWNoYXQgfHwgUGxhdFV0aWxzLklzRG91eWluIHx8IFBsYXRVdGlscy5Jc0FuZHJvaWREb3VZaW4pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSwgeyB3aWR0aDogMC4xLCBib3R0b206IDAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dOYXRpdmVUcnlHYW1lV2lkZ2V0KHsgbGVmdDogMTAsIHRvcDogNTAwLCBzY2FsZTogMSwgcGFyZW50OiB0aGlzLl9wYWdlIH0pO1xyXG4gICAgICAgICAgICAvLyDljp/nlJ/lub/lkYpcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiAzIH0pO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiA0IH0pO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiA4IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93Q3VzdG9tQWQoeyBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24uR2FtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93U2tpbGwobjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCB3aWRnZXQgPSBuLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIGlmICh3aWRnZXQpIHdpZGdldC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG4gJiYgbi5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGNvY29zei5wYXVzZUNvdW50Kys7XHJcbiAgICAgICAgICAgIG4uc2V0UG9zaXRpb24oMCwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgbi5zY2FsZSA9IDI7XHJcbiAgICAgICAgICAgIG4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYWxsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obilcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oYW5kQW5pICYmIHRoaXMuX2hhbmRBbmkuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZEFuaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuNSwgeyBzY2FsZTogMSwgeDogLSBjYy53aW5TaXplLndpZHRoIC8gMiArIHdpZGdldC5sZWZ0ICsgbi53aWR0aCAvIDIsIHk6IC0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyICsgd2lkZ2V0LmJvdHRvbSArIG4uaGVpZ2h0IC8gMiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpZGdldCkgd2lkZ2V0LmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3oucGF1c2VDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbi5vbmNlKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgY2FsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgIG4uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4obilcclxuICAgICAgICAgICAgICAgIC50bygxLCB7IHk6IDAgfSwgeyBlYXNpbmc6IFwiYmFja091dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hhbmRBbmkgJiYgdGhpcy5faGFuZEFuaS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRBbmkuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRBbmkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwQW5pID0gdGhpcy5faGFuZEFuaS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BBbmkpIHNwQW5pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDQpXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbi5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBjYWxsLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGwoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YWo5bGP6L2w54K45Yqo55S7XHJcbiAgICBlZmZlY3RfcXBieigpIHtcclxuICAgICAgICBsZXQgcHJlID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJlZmZlY3RfcXBielwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGlmIChwcmUpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGdhbWVNZ3IucGxheWVyVHMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkoMC4zKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcIlF1YW5QaW5nQmFvWmhhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9BbGx6b21iaWVfRGVzdG9yeSB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgLnJlcGVhdCg0KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyBub2RlLmRlc3Ryb3koKTsgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vbkdhbWVNZXNzYWdlSGFuZGxlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIF9vbkJ0bkNsaWNrSGFuZGxlcihldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5QnRuRWZmZWN0KCk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0Lm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInJhbmdlZFdlYXBvbkFkXCI6IHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZEljb24gPSBnYW1lTWdyLnJhbmdlZFdlYXBvbkFkTWVzcy5nZXRDaGlsZEJ5TmFtZShcImFkSWNvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWRJY29uICYmIGFkSWNvbi5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLemrmOe6p+atpuWZqC3mkq3mlL5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LndhdGNoQUQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLemrmOe6p+atpuWZqC3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IudXNlUmFuZ2VkV2VhcG9uQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IucmFuZ2VkV2VhcG9uQWRNZXNzLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3pq5jnuqfmrablmagt5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IudXNlUmFuZ2VkV2VhcG9uQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwicmFuZ2VkV2VhcG9uXCI6IHtcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3IudXNlUmFuZ2VkV2VhcG9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuUGF1c2VcIjoge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVUlQYXVzZVBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5CdWxsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVNZ3IuQnRuQnVsbGV0ICYmIGdhbWVNZ3IucGxheWVyVHMgJiYgZ2FtZU1nci5wbGF5ZXJUcy5jdXJXZWFwb24gJiYgZ2FtZU1nci5wbGF5ZXJUcy5jdXJXZWFwb24uaXNSYW5nZVdlYXBvbilcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmN1cldlYXBvbi5yZWxvYWRCdWxsZXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5TaHV4aW5nXCI6IHtcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3IubW9kZWw2X3NodXhpbmcuYWN0aXZlID0gIWdhbWVNZ3IubW9kZWw2X3NodXhpbmcuYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1nci51cGRhdGVfbW9kZWw2X3NodXhpbmcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5IaWRlQmFubmVyXCI6IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3muLjmiI/kuK3ljrvlub/lkYot5pKt5pS+XCIpXHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oud2F0Y2hBRCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLea4uOaIj+S4reWOu+W5v+WRii3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5jYW5TSG93R2FtZUJhbm5lciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3muLjmiI/kuK3ljrvlub/lkYot5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5DdFwiOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnRuQ3QgJiYgdGhpcy5fYnRuQ3QuZ2V0Q2hpbGRCeU5hbWUoXCJzaGFyZVwiKSAmJiB0aGlzLl9idG5DdC5nZXRDaGlsZEJ5TmFtZShcInNoYXJlXCIpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuWIhuS6qy3no4Hpk4FcIilcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouc2hhcmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLliIbkuqst56OB6ZOBLeaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDno4Hpk4Hkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfU2tpbGxfQ2l0aWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeejgemTgS3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYnRuQ3QgJiYgdGhpcy5fYnRuQ3QuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWRlb1wiKSAmJiB0aGlzLl9idG5DdC5nZXRDaGlsZEJ5TmFtZShcInZpZGVvXCIpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3no4Hpk4Et5pKt5pS+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LndhdGNoQUQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt56OB6ZOBLeaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDno4Hpk4Hkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfU2tpbGxfQ2l0aWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeejgemTgS3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g56OB6ZOB5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfU2tpbGxfQ2l0aWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkJ0blFwYnpcIjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J0blFwYnogJiYgdGhpcy5fYnRuUXBiei5nZXRDaGlsZEJ5TmFtZShcInNoYXJlXCIpICYmIHRoaXMuX2J0blFwYnouZ2V0Q2hpbGRCeU5hbWUoXCJzaGFyZVwiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLliIbkuqst5YWo5bGP6L2w54K4XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnNoYXJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeWFqOWxj+i9sOeCuC3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YWo5bGP6L2w54K45Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3FwYnooKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuWIhuS6qy3lhajlsY/ovbDngrgt5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2J0blFwYnogJiYgdGhpcy5fYnRuUXBiei5nZXRDaGlsZEJ5TmFtZShcInZpZGVvXCIpICYmIHRoaXMuX2J0blFwYnouZ2V0Q2hpbGRCeU5hbWUoXCJ2aWRlb1wiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5YWo5bGP6L2w54K4LeaSreaUvlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei53YXRjaEFEKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeWFqOWxj+i9sOeCuC3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YWo5bGP6L2w54K45Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3FwYnooKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3lhajlsY/ovbDngrgt5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWFqOWxj+i9sOeCuOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3FwYnooKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=