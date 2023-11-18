
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UITurntablePage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJVHVybnRhYmxlUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBMEQ7QUFDMUQsOENBQTZDO0FBQzdDLGtEQUFzRTtBQUN0RSx3Q0FBbUM7QUFFbkMsOENBQXlDO0FBQ3pDLDZDQUF3RDtBQUN4RCx5Q0FBb0M7QUFDcEMsYUFBYTtBQUNiLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE4QyxvQ0FBTTtJQUVoRDtRQUFBLFlBQ0ksa0JBQU0sb0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUVwQztRQUVPLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsWUFBTSxHQUFZLElBQUksQ0FBQztRQUN2QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBa0kvQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBbUZyQix1QkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsYUFBTyxHQUFXLENBQUMsQ0FBQztRQW9CcEIsVUFBSSxHQUFZLEtBQUssQ0FBQztRQWpQbEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7SUFDcEMsQ0FBQztJQVFTLGlDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlB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VUFBVSxDQUFDLENBQUE7b0NBQzNCLEtBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FDZCxDQUFDLEVBQUU7b0NBQ0MsYUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQ0FDL0IsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsTUFBTTs2QkFDVDt5QkFDSjs7Ozs7S0FDSjtJQTdRZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0ErUXBDO0lBQUQsdUJBQUM7Q0EvUUQsQUErUUMsQ0EvUTZDLGdCQUFNLEdBK1FuRDtrQkEvUW9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgQ29uc3RhbnQsIHsgUGFnZU5hbWUsIFBhbmVsTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IE1zZyBmcm9tIFwiLi4vRnJhbWV3b3JrL01zZ1wiO1xyXG5pbXBvcnQgVHdlZW5FZmZlY3QgZnJvbSBcIi4uL0ZyYW1ld29yay9Ud2VlbkVmZmVjdFwiO1xyXG5pbXBvcnQgVUlQYWdlIGZyb20gXCIuLi9GcmFtZXdvcmsvVUlQYWdlXCI7XHJcbmltcG9ydCBHYW1lRGF0ZSwgeyBSZXdhcmRUeXBlIH0gZnJvbSBcIi4uL0dhbWUvZ2FtZURhdGVcIjtcclxuaW1wb3J0IFdlYXBvbiBmcm9tIFwiLi4vR2FtZS93ZWFwb25cIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUdXJudGFibGVQYW5lbCBleHRlbmRzIFVJUGFnZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoUGFuZWxOYW1lLlVJVHVybnRhYmxlUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCgpICYmIHRoaXMub25Mb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfcmV3YXJkTGlzdDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90b3RhbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9idG5DSjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9idG5BRDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJwYW5lbFwiKTtcclxuICAgICAgICB0aGlzLl9yZXdhcmRMaXN0ID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRMaXN0XCIpO1xyXG4gICAgICAgIHRoaXMuX3RvdGFsTGFiZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcInRvdGFsTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGJ0bk5hbWVzOiBzdHJpbmdbXSA9IFtcIkJ0bkJhY2tcIiwgXCJCdG5DSlwiLCBcIkJ0bkFEXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRuTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYnRuOiBjYy5Ob2RlID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoYnRuTmFtZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkJ0bkNsaWNrSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuTmFtZXNbaV0gPT0gXCJCdG5DSlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuQ0ogPSBidG47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ0bk5hbWVzW2ldID09IFwiQnRuQURcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J0bkFEID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOS4iuaKpSDpppbpobXmir3lpZZcclxuICAgICAgICB1dGlscy51bWFFdmVudChcImdhbWVjaG91amlhbmdcIik7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6aG16Z2iLeaKveWlllwiKTtcclxuICAgICAgICB0aGlzLl9wYW5lbC5zY2FsZSA9IDA7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5fcGFuZWwpLnRvKDAuMywgeyBzY2FsZTogMC44IH0sIHsgZWFzaW5nOiBcImJhY2tPdXRcIiB9KS5zdGFydCgpO1xyXG4gICAgICAgIC8vIFR3ZWVuRWZmZWN0LnBhbmVsX29wZW5fc2NhbGUodGhpcy5fcGFuZWwpO1xyXG5cclxuICAgICAgICBjYy50d2Vlbih0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdcIikpXHJcbiAgICAgICAgICAgIC5ieSgwLjUsIHsgYW5nbGU6IDYwLCBvcGFjaXR5OiAtMTUwIH0pXHJcbiAgICAgICAgICAgIC5ieSgwLjUsIHsgYW5nbGU6IDYwLCBvcGFjaXR5OiAxNTAgfSlcclxuICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdG90YWxMYWJlbC5zdHJpbmcgPSBgJHtjb2Nvc3oudG90YWxDSlRpbWVzID4gMzAgPyAzMCA6IGNvY29zei50b3RhbENKVGltZXN9LzMwYDtcclxuICAgICAgICBpZiAoY29jb3N6LnRvdGFsQ0pUaW1lcyA+IDMwIHx8IGNvY29zei5kYXRhTWdyLmdldEd1bkluZm8oMTApLlN0YXRlID4gMCkgeyB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIndfbm5wXCIpLmNvbG9yID0gY2MuQ29sb3IuR1JBWTsgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlUmV3YXJkKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdXBkYXRlUmV3YXJkKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gYHJld2FyZCR7aSArIDF9YDtcclxuICAgICAgICAgICAgbGV0IHJld2FyZCA9IHRoaXMuX3Jld2FyZExpc3QuZ2V0Q2hpbGRCeU5hbWUoc3RyKTtcclxuICAgICAgICAgICAgaWYgKEdhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtpXS50eXBlID09IFJld2FyZFR5cGUuR29sZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdvbGQgPSByZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnb2xkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ29sZC5zZXRQb3NpdGlvbihyZXdhcmQueCArIGdvbGQueCwgcmV3YXJkLnkgKyBnb2xkLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdvbGQuc2V0UGFyZW50KHRoaXMuX3Jld2FyZExpc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gcmV3YXJkLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnpJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuc2V0UG9zaXRpb24ocmV3YXJkLnggKyBsYWJlbC54LCByZXdhcmQueSArIGxhYmVsLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnNldFBhcmVudCh0aGlzLl9yZXdhcmRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGArJHtHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbaV0ubnVtfWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2ldLnR5cGUgPT0gUmV3YXJkVHlwZS5EaWFtb25kKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlhbW9uZCA9IHJld2FyZC5nZXRDaGlsZEJ5TmFtZShcImRpYW1vbmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlhbW9uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYW1vbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkaWFtb25kLnNldFBvc2l0aW9uKHJld2FyZC54ICsgZGlhbW9uZC54LCByZXdhcmQueSArIGRpYW1vbmQueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlhbW9uZC5zZXRQYXJlbnQodGhpcy5fcmV3YXJkTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSByZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuekluZGV4ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbC5zZXRQb3NpdGlvbihyZXdhcmQueCArIGxhYmVsLngsIHJld2FyZC55ICsgbGFiZWwueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuc2V0UGFyZW50KHRoaXMuX3Jld2FyZExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCske0dhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtpXS5udW19YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbaV0udHlwZSA9PSBSZXdhcmRUeXBlLlNraW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmkgPSBjYy5pbnN0YW50aWF0ZShjb2Nvc3oucmVzTWdyLmdldFJlcyhgc2tpbiR7R2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2ldLm51bX1gLCBjYy5QcmVmYWIpIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pLnNjYWxlID0gMC41O1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaS56SW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaS5zZXRQYXJlbnQodGhpcy5fcmV3YXJkTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pLnNldFBvc2l0aW9uKHJld2FyZC54LCByZXdhcmQueSAtIDY1KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBuYW1lU3ByID0gcmV3YXJkLmdldENoaWxkQnlOYW1lKFwibmFtZVNwclwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lU3ByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZVNwci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVTcHIuekluZGV4ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lU3ByLnNldFBvc2l0aW9uKHJld2FyZC54ICsgbmFtZVNwci54LCByZXdhcmQueSArIG5hbWVTcHIueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZVNwci5zZXRQYXJlbnQodGhpcy5fcmV3YXJkTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZVNwci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKGBwXyR7R2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2ldLm51bX1gLCBjYy5TcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuZ2V0U2tpbkluZm8oR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2ldLm51bSAtIDEpLlN0YXRlICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFzayA9IHRoaXMuX3Jld2FyZExpc3QuZ2V0Q2hpbGRCeU5hbWUoYG1hc2ske2kgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzay56SW5kZXggPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbaV0udHlwZSA9PSBSZXdhcmRUeXBlLldlYXBvbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZTtcclxuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBcIndfXCIgKyBXZWFwb24uV2VhcG9uTmFtZVtHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbaV0ubnVtXTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhzdHIsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMuX3Jld2FyZExpc3QpXHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHJld2FyZC54LCByZXdhcmQueSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZVNwciA9IHJld2FyZC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVTcHJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZVNwcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVTcHIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lU3ByLnpJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZVNwci5zZXRQb3NpdGlvbihyZXdhcmQueCArIG5hbWVTcHIueCwgcmV3YXJkLnkgKyBuYW1lU3ByLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVTcHIuc2V0UGFyZW50KHRoaXMuX3Jld2FyZExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVTcHIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhgd18ke0dhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtpXS5udW0gKyAxfWAsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5nZXRHdW5JbmZvKEdhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtpXS5udW0pLlN0YXRlICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFzayA9IHRoaXMuX3Jld2FyZExpc3QuZ2V0Q2hpbGRCeU5hbWUoYG1hc2ske2kgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzay56SW5kZXggPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydE51bTogbnVtYmVyID0gMDtcclxuICAgIENKKCkge1xyXG4gICAgICAgIC8vIOS4iuaKpSDpppbpobXmir3lpZZcclxuICAgICAgICB1dGlscy51bWFFdmVudChgZ2FtZWNob3VqaWFuZyR7Y29jb3N6LnVzZUNKVGltZXN9YCk7XHJcbiAgICAgICAgdGhpcy5pc0NKID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbnVtID0gMjA7XHJcbiAgICAgICAgbnVtICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEyKTtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGxldCBsYXN0TnVtID0gdGhpcy5zdGFydE51bTtcclxuICAgICAgICBsZXQgY3VyID0gMDtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChcInR1cm50YWJsZVwiKTtcclxuICAgICAgICBsZXQgdGltZUNvdW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUaW1lQ291bnQoY291bnQsIGN1cikgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGlzdC5jaGlsZHJlbltsYXN0TnVtXS5jaGlsZHJlblswXS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGxhc3ROdW0rKztcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0TnVtID49IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2xhc3ROdW1dLnR5cGUgPT0gUmV3YXJkVHlwZS5Ta2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvY29zei5kYXRhTWdyLmdldFNraW5JbmZvKEdhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtsYXN0TnVtXS5udW0gLSAxKS5TdGF0ZSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3ROdW0gPj0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2xhc3ROdW1dLnR5cGUgPT0gUmV3YXJkVHlwZS5XZWFwb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuZ2V0R3VuSW5mbyhHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbbGFzdE51bV0ubnVtKS5TdGF0ZSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3ROdW0gPj0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VyKys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXdhcmRMaXN0LmNoaWxkcmVuW2xhc3ROdW1dLmNoaWxkcmVuWzBdLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyID49IG51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnROdW0gPSBsYXN0TnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZUNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2xhc3ROdW1dLnR5cGUgPT0gUmV3YXJkVHlwZS5Hb2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1zZy5TaG93KGkxOG4udChcIm1zZy5neGhkamJcIikgKyBHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbbGFzdE51bV0ubnVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgKz0gR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2xhc3ROdW1dLm51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2xhc3ROdW1dLnR5cGUgPT0gUmV3YXJkVHlwZS5EaWFtb25kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1zZy5TaG93KGkxOG4udChcIm1zZy5neGhkenNcIikgKyBHYW1lRGF0ZS5UdXJudGFibGVSZXdhcmRbbGFzdE51bV0ubnVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5EaWFtb25kQ291bnQgKz0gR2FtZURhdGUuVHVybnRhYmxlUmV3YXJkW2xhc3ROdW1dLm51bTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEdhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtsYXN0TnVtXS50eXBlID09IFJld2FyZFR5cGUuU2tpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cuZ3hoZHhqc1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkN1clNraW5JZCA9IEdhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtsYXN0TnVtXS5udW0gLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB7IHR5cGU6IENvbnN0YW50LkVfQ0pfU0tJTiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGlzdC5jaGlsZHJlbltsYXN0TnVtXS5jaGlsZHJlblswXS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGlzdC5nZXRDaGlsZEJ5TmFtZShgbWFzazZgKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXdhcmRMaXN0LmdldENoaWxkQnlOYW1lKGBtYXNrNmApLnpJbmRleCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cuZ3hoZHh3cVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLmN1cldlYXBvbiA9IEdhbWVEYXRlLlR1cm50YWJsZVJld2FyZFtsYXN0TnVtXS5udW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9DSl9XZWFwb24gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jld2FyZExpc3QuY2hpbGRyZW5bbGFzdE51bV0uY2hpbGRyZW5bMF0ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jld2FyZExpc3QuZ2V0Q2hpbGRCeU5hbWUoYG1hc2sxMmApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jld2FyZExpc3QuZ2V0Q2hpbGRCeU5hbWUoYG1hc2sxMmApLnpJbmRleCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDSiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudXNlQ0pUaW1lcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei50b3RhbENKVGltZXMrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3RhbExhYmVsLnN0cmluZyA9IGAke2NvY29zei50b3RhbENKVGltZXMgPiAzMCA/IDMwIDogY29jb3N6LnRvdGFsQ0pUaW1lc30vMzBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2Nvc3oudG90YWxDSlRpbWVzID09IDMwICYmIGNvY29zei5kYXRhTWdyLmdldEd1bkluZm8oMTApLlN0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmd4aGRubnBcIikpOy8v5oGt5Zac6I635b6X5q2m5Zmo6bif6bif54KuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLmN1cldlYXBvbiA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIndfbm5wXCIpLmNvbG9yID0gY2MuQ29sb3IuR1JBWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX0NKX1dlYXBvbiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCdG4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydEludGVydmFsVGltZTogbnVtYmVyID0gMTA7XHJcbiAgICBhZGRUaW1lOiBudW1iZXIgPSAxO1xyXG4gICAgZ2V0VGltZUNvdW50KG51bTE6IG51bWJlciwgbnVtMjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW0yOyBpKyspIHtcclxuICAgICAgICAgICAgbnVtICs9IGkgKiB0aGlzLmFkZFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKG51bTEgLSBudW0pICUgKHRoaXMuc3RhcnRJbnRlcnZhbFRpbWUgKyBudW0yICogdGhpcy5hZGRUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCdG4oKSB7XHJcbiAgICAgICAgaWYgKGNvY29zei5pc0FET04gJiYgY29jb3N6LnVzZUNKVGltZXMgPj0gQ29uc3RhbnQuY29tbW9uQ0pUaW1lcy8qICArIGNvY29zei5nZXRDSlRpbWVzICovKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bkNKLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9idG5BRC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bkNKLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bkFELmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0NKOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgX29uQnRuQ2xpY2tIYW5kbGVyKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgYXdhaXQgY29jb3N6LmF1ZGlvTWdyLnBsYXlCdG5FZmZlY3QoKS5jYXRjaCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ0opIHJldHVybjtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5CYWNrXCI6IHtcclxuICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVR1cm50YWJsZVBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5DSlwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNKKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuQURcIjoge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeaKveWlli3mkq3mlL5cIilcclxuICAgICAgICAgICAgICAgIGNvY29zei53YXRjaEFEKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5oq95aWWLeaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ0ooKTtcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5oq95aWWLeWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=