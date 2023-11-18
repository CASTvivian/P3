"use strict";
cc._RF.push(module, 'a2b2aQ0OHtIGIW0RibIyjtk', 'UITurntablePage');
// scripts/UI/UITurntablePage.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UITurntablePanel = /** @class */ (function (_super) {
    __extends(UITurntablePanel, _super);
    function UITurntablePanel() {
        var _this = _super.call(this, Constant_1.PanelName.UITurntablePanel) || this;
        _this._panel = null;
        _this._rewardList = null;
        _this._totalLabel = null;
        _this._btnCJ = null;
        _this._btnAD = null;
        _this.startNum = 0;
        _this.startIntervalTime = 10;
        _this.addTime = 1;
        _this.isCJ = false;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UITurntablePanel.prototype.onLoad = function () {
        this._panel = this._page.getChildByName("panel");
        this._rewardList = this._panel.getChildByName("rewardList");
        this._totalLabel = this._panel.getChildByName("totalLabel").getComponent(cc.Label);
        var btnNames = ["BtnBack", "BtnCJ", "BtnAD"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = this._panel.getChildByName(btnNames[i]);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickHandler, this);
                if (btnNames[i] == "BtnCJ") {
                    this._btnCJ = btn;
                }
                else if (btnNames[i] == "BtnAD") {
                    this._btnAD = btn;
                }
            }
        }
    };
    UITurntablePanel.prototype.onOpen = function () {
        // 上报 首页抽奖
        Utils_1.utils.umaEvent("gamechoujiang");
        Utils_1.utils.SendEvent("页面-抽奖");
        this._panel.scale = 0;
        cc.tween(this._panel).to(0.3, { scale: 0.8 }, { easing: "backOut" }).start();
        // TweenEffect.panel_open_scale(this._panel);
        cc.tween(this._page.getChildByName("guang"))
            .by(0.5, { angle: 60, opacity: -150 })
            .by(0.5, { angle: 60, opacity: 150 })
            .union()
            .repeatForever()
            .start();
        this._totalLabel.string = (CocosZ_1.cocosz.totalCJTimes > 30 ? 30 : CocosZ_1.cocosz.totalCJTimes) + "/30";
        if (CocosZ_1.cocosz.totalCJTimes > 30 || CocosZ_1.cocosz.dataMgr.getGunInfo(10).State > 0) {
            this._panel.getChildByName("w_nnp").color = cc.Color.GRAY;
        }
        this.updateReward();
        this.updateBtn();
    };
    UITurntablePanel.prototype.updateReward = function () {
        for (var i = 0; i < 12; i++) {
            var str = "reward" + (i + 1);
            var reward = this._rewardList.getChildByName(str);
            if (gameDate_1.default.TurntableReward[i].type == gameDate_1.RewardType.Gold) {
                var gold = reward.getChildByName("gold");
                if (gold) {
                    gold.active = true;
                    // gold.setPosition(reward.x + gold.x, reward.y + gold.y);
                    // gold.setParent(this._rewardList);
                }
                var label = reward.getChildByName("label");
                if (label) {
                    label.active = true;
                    label.zIndex = 2;
                    label.setPosition(reward.x + label.x, reward.y + label.y);
                    label.setParent(this._rewardList);
                    label.getComponent(cc.Label).string = "+" + gameDate_1.default.TurntableReward[i].num;
                }
            }
            else if (gameDate_1.default.TurntableReward[i].type == gameDate_1.RewardType.Diamond) {
                var diamond = reward.getChildByName("diamond");
                if (diamond) {
                    diamond.active = true;
                    // diamond.setPosition(reward.x + diamond.x, reward.y + diamond.y);
                    // diamond.setParent(this._rewardList);
                }
                var label = reward.getChildByName("label");
                if (label) {
                    label.active = true;
                    label.zIndex = 2;
                    label.setPosition(reward.x + label.x, reward.y + label.y);
                    label.setParent(this._rewardList);
                    label.getComponent(cc.Label).string = "+" + gameDate_1.default.TurntableReward[i].num;
                }
            }
            else if (gameDate_1.default.TurntableReward[i].type == gameDate_1.RewardType.Skin) {
                var ani = cc.instantiate(CocosZ_1.cocosz.resMgr.getRes("skin" + gameDate_1.default.TurntableReward[i].num, cc.Prefab));
                if (ani) {
                    ani.scale = 0.5;
                    ani.zIndex = 1;
                    ani.setParent(this._rewardList);
                    ani.setPosition(reward.x, reward.y - 65);
                }
                var nameSpr = reward.getChildByName("nameSpr");
                if (nameSpr) {
                    nameSpr.active = true;
                    nameSpr.zIndex = 2;
                    nameSpr.setPosition(reward.x + nameSpr.x, reward.y + nameSpr.y);
                    nameSpr.setParent(this._rewardList);
                    nameSpr.getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("p_" + gameDate_1.default.TurntableReward[i].num, cc.SpriteFrame);
                }
                if (CocosZ_1.cocosz.dataMgr.getSkinInfo(gameDate_1.default.TurntableReward[i].num - 1).State != 0) {
                    var mask = this._rewardList.getChildByName("mask" + (i + 1));
                    if (mask) {
                        mask.active = true;
                        mask.zIndex = 3;
                    }
                }
            }
            else if (gameDate_1.default.TurntableReward[i].type == gameDate_1.RewardType.Weapon) {
                var node = new cc.Node;
                var str_1 = "w_" + weapon_1.default.WeaponName[gameDate_1.default.TurntableReward[i].num];
                node.addComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes(str_1, cc.SpriteFrame);
                node.setParent(this._rewardList);
                node.setPosition(reward.x, reward.y);
                var nameSpr = reward.getChildByName("nameSpr");
                if (nameSpr) {
                    nameSpr.active = true;
                    nameSpr.zIndex = 2;
                    nameSpr.setPosition(reward.x + nameSpr.x, reward.y + nameSpr.y);
                    nameSpr.setParent(this._rewardList);
                    nameSpr.getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("w_" + (gameDate_1.default.TurntableReward[i].num + 1), cc.SpriteFrame);
                }
                if (CocosZ_1.cocosz.dataMgr.getGunInfo(gameDate_1.default.TurntableReward[i].num).State != 0) {
                    var mask = this._rewardList.getChildByName("mask" + (i + 1));
                    if (mask) {
                        mask.active = true;
                        mask.zIndex = 3;
                    }
                }
            }
        }
    };
    UITurntablePanel.prototype.CJ = function () {
        var _this = this;
        // 上报 首页抽奖
        Utils_1.utils.umaEvent("gamechoujiang" + CocosZ_1.cocosz.useCJTimes);
        this.isCJ = true;
        var num = 20;
        num += Math.floor(Math.random() * 12);
        var count = 0;
        var lastNum = this.startNum;
        var cur = 0;
        CocosZ_1.cocosz.audioMgr.playEffect("turntable");
        var timeCount = setInterval(function () {
            count++;
            if (_this.getTimeCount(count, cur) == 0) {
                _this._rewardList.children[lastNum].children[0].opacity = 0;
                lastNum++;
                if (lastNum >= 12) {
                    lastNum = 0;
                }
                if (gameDate_1.default.TurntableReward[lastNum].type == gameDate_1.RewardType.Skin) {
                    if (CocosZ_1.cocosz.dataMgr.getSkinInfo(gameDate_1.default.TurntableReward[lastNum].num - 1).State != 0) {
                        lastNum++;
                        if (lastNum >= 12) {
                            lastNum = 0;
                        }
                    }
                }
                else if (gameDate_1.default.TurntableReward[lastNum].type == gameDate_1.RewardType.Weapon) {
                    if (CocosZ_1.cocosz.dataMgr.getGunInfo(gameDate_1.default.TurntableReward[lastNum].num).State != 0) {
                        lastNum++;
                        if (lastNum >= 12) {
                            lastNum = 0;
                        }
                    }
                }
                cur++;
                _this._rewardList.children[lastNum].children[0].opacity = 255;
                if (cur >= num) {
                    _this.startNum = lastNum;
                    clearInterval(timeCount);
                    if (gameDate_1.default.TurntableReward[lastNum].type == gameDate_1.RewardType.Gold) {
                        Msg_1.default.Show(i18n.t("msg.gxhdjb") + gameDate_1.default.TurntableReward[lastNum].num);
                        CocosZ_1.cocosz.dataMgr.CoinCount += gameDate_1.default.TurntableReward[lastNum].num;
                    }
                    else if (gameDate_1.default.TurntableReward[lastNum].type == gameDate_1.RewardType.Diamond) {
                        Msg_1.default.Show(i18n.t("msg.gxhdzs") + gameDate_1.default.TurntableReward[lastNum].num);
                        CocosZ_1.cocosz.dataMgr.DiamondCount += gameDate_1.default.TurntableReward[lastNum].num;
                    }
                    else if (gameDate_1.default.TurntableReward[lastNum].type == gameDate_1.RewardType.Skin) {
                        Msg_1.default.Show(i18n.t("msg.gxhdxjs"));
                        CocosZ_1.cocosz.dataMgr.CurSkinId = gameDate_1.default.TurntableReward[lastNum].num - 1;
                        cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_CJ_SKIN });
                        _this._rewardList.children[lastNum].children[0].opacity = 0;
                        _this._rewardList.getChildByName("mask6").active = true;
                        _this._rewardList.getChildByName("mask6").zIndex = 3;
                    }
                    else {
                        Msg_1.default.Show(i18n.t("msg.gxhdxwq"));
                        CocosZ_1.cocosz.dataMgr.curWeapon = gameDate_1.default.TurntableReward[lastNum].num;
                        cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_CJ_Weapon });
                        _this._rewardList.children[lastNum].children[0].opacity = 0;
                        _this._rewardList.getChildByName("mask12").active = true;
                        _this._rewardList.getChildByName("mask12").zIndex = 3;
                    }
                    _this.isCJ = false;
                    CocosZ_1.cocosz.useCJTimes++;
                    CocosZ_1.cocosz.totalCJTimes++;
                    _this._totalLabel.string = (CocosZ_1.cocosz.totalCJTimes > 30 ? 30 : CocosZ_1.cocosz.totalCJTimes) + "/30";
                    if (CocosZ_1.cocosz.totalCJTimes == 30 && CocosZ_1.cocosz.dataMgr.getGunInfo(10).State == 0) {
                        Msg_1.default.Show(i18n.t("msg.gxhdnnp")); //恭喜获得武器鸟鸟炮
                        CocosZ_1.cocosz.dataMgr.curWeapon = 10;
                        _this._panel.getChildByName("w_nnp").color = cc.Color.GRAY;
                        cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_CJ_Weapon });
                    }
                    _this.updateBtn();
                }
            }
        }, 10);
    };
    UITurntablePanel.prototype.getTimeCount = function (num1, num2) {
        var num = 0;
        for (var i = 0; i < num2; i++) {
            num += i * this.addTime;
        }
        return (num1 - num) % (this.startIntervalTime + num2 * this.addTime);
    };
    UITurntablePanel.prototype.updateBtn = function () {
        if (CocosZ_1.cocosz.isADON && CocosZ_1.cocosz.useCJTimes >= Constant_1.default.commonCJTimes /*  + cocosz.getCJTimes */) {
            this._btnCJ.active = false;
            this._btnAD.active = true;
        }
        else {
            this._btnCJ.active = true;
            this._btnAD.active = false;
        }
    };
    UITurntablePanel.prototype._onBtnClickHandler = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        _a.sent();
                        if (this.isCJ)
                            return [2 /*return*/];
                        switch (event.target.name) {
                            case "BtnBack": {
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UITurntablePanel);
                                break;
                            }
                            case "BtnCJ": {
                                this.CJ();
                                break;
                            }
                            case "BtnAD": {
                                Utils_1.utils.SendEvent("视频-抽奖-播放");
                                CocosZ_1.cocosz.watchAD(function () {
                                    Utils_1.utils.SendEvent("视频-抽奖-成功");
                                    _this.CJ();
                                }, function () {
                                    Utils_1.utils.SendEvent("视频-抽奖-失败");
                                });
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UITurntablePanel = __decorate([
        ccclass
    ], UITurntablePanel);
    return UITurntablePanel;
}(UIPage_1.default));
exports.default = UITurntablePanel;

cc._RF.pop();