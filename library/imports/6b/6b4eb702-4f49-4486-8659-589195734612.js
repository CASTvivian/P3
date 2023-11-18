"use strict";
cc._RF.push(module, '6b4ebcCT0lEhoZZWJGVc0YS', 'UIUpgradePanel');
// scripts/UI/UIUpgradePanel.ts

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
var TweenEffect_1 = require("../Framework/TweenEffect");
var UpgradeMgr_1 = require("../Game/UpgradeMgr");
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var gameMgr_1 = require("../Game/gameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 皮肤试用面板
 */
var UIUpgradePanel = /** @class */ (function (_super) {
    __extends(UIUpgradePanel, _super);
    function UIUpgradePanel() {
        var _this = _super.call(this, Constant_1.PanelName.UIUpgradePanel) || this;
        _this._mask = null;
        _this._panel = null;
        _this._skill0 = null;
        _this._skill1 = null;
        _this._skill2 = null;
        _this._skill3 = null;
        _this._skill4 = null;
        _this._btnRefresh = null;
        _this._betterArr = [];
        _this._otherArr = []; // 可以获取的技能数组
        _this._uiSkillIdArr = []; // 随机4个技能
        _this._curIndex = -1; // 当前选中下标
        _this._canClick = true; // 能否点击
        _this._lockArr = [false, false, false, false, false];
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIUpgradePanel.prototype.onLoad = function () {
        this._mask = this._page.getChildByName("Mask");
        this._panel = this._page.getChildByName("Panel");
        var btnNames = ["skill0", "skill1", "skill2", "skill3", "skill4", "btnRefresh"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = cc.find(btnNames[i], this._panel);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
                if (btn.name == "skill0") {
                    this._skill0 = btn;
                }
                else if (btn.name == "skill1") {
                    this._skill1 = btn;
                }
                else if (btn.name == "skill2") {
                    this._skill2 = btn;
                }
                else if (btn.name == "skill3") {
                    this._skill3 = btn;
                }
                else if (btn.name == "skill4") {
                    this._skill4 = btn;
                }
                else if (btn.name == "btnRefresh") {
                    this._btnRefresh = btn;
                    btn.active = CocosZ_1.cocosz.isADON;
                }
            }
        }
        // 服务器锁的数量
        var serverValue = CocosZ_1.cocosz.getConfigByKey("skillLockNum");
        if (Number.isInteger(serverValue)) {
            for (var i = 0; i < 5; i++) {
                if (i + serverValue >= 5) {
                    this._lockArr[i] = true;
                }
                else {
                    this._lockArr[i] = false;
                }
            }
        }
    };
    UIUpgradePanel.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-技能");
        // 优先技能数组
        var better = [
            UpgradeMgr_1.SkillType.双发, UpgradeMgr_1.SkillType.子弹碎片, UpgradeMgr_1.SkillType.枪林弹雨, UpgradeMgr_1.SkillType.谢幕,
            UpgradeMgr_1.SkillType.瞬斩, UpgradeMgr_1.SkillType.冰霜精通, UpgradeMgr_1.SkillType.火焰精通, UpgradeMgr_1.SkillType.萃取,
            UpgradeMgr_1.SkillType.再生, UpgradeMgr_1.SkillType.护甲靴子, UpgradeMgr_1.SkillType.疾走, UpgradeMgr_1.SkillType.神圣守护,
            UpgradeMgr_1.SkillType.通灵匕首, UpgradeMgr_1.SkillType.飞轮, UpgradeMgr_1.SkillType.闪电, UpgradeMgr_1.SkillType.燃烧瓶
        ];
        // 可以获取的技能数组
        for (var i = 0; i <= 34; i++) {
            if ([UpgradeMgr_1.SkillType.雷电精通, UpgradeMgr_1.SkillType.龙卵, UpgradeMgr_1.SkillType.通灵镰刀].includes(i)) {
                // 剔除的技能
            }
            else if (UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.isValid && UpgradeMgr_1.upgradeMgr.upgradeSkillArr[i] >= UpgradeMgr_1.upgradeMgr.upgradeSkillMaxLevelArr[i]) {
                // 达到最大级
            }
            else if (better.includes(i)) {
                // 优先数组
                this._betterArr.push(i);
            }
            else {
                // 其它数组
                this._otherArr.push(i);
            }
        }
        this._initPanel();
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.adManager.hideCustomAd({ location: 3 });
            Utils_1.utils.adManager.hideCustomAd({ location: 4 });
        }
    };
    UIUpgradePanel.prototype.onClose = function () {
        CocosZ_1.cocosz.pauseCount--;
        if (PlatUtils_1.default.IsWechat) {
            Utils_1.utils.adManager.showCustomAd({ location: 3 });
            Utils_1.utils.adManager.showCustomAd({ location: 4 });
        }
    };
    UIUpgradePanel.prototype._initPanel = function () {
        TweenEffect_1.default.panel_mask_opacity(this._mask);
        TweenEffect_1.default.panel_open_moveY(this._panel);
        this._curIndex = -1;
        // 刷新技能
        this._skill_refresh();
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UIUpgradePanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var callback_1, lockNode;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //播放按钮点击音效
                    return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        //播放按钮点击音效
                        _a.sent();
                        if (!this._canClick)
                            return [2 /*return*/];
                        switch (event.target.name) {
                            case "btnRefresh": {
                                this._canClick = false;
                                // 分享
                                if (event.target.getChildByName("share") && event.target.getChildByName("share").active) {
                                    Utils_1.utils.SendEvent("分享-刷新技能");
                                    CocosZ_1.cocosz.share(function () {
                                        Utils_1.utils.SendEvent("分享-刷新技能-成功");
                                        _this._skill_refresh();
                                        _this._canClick = true;
                                    }, function () {
                                        Utils_1.utils.SendEvent("分享-刷新技能-失败");
                                        _this._canClick = true;
                                    });
                                }
                                // 视频
                                else if (event.target.getChildByName("video") && event.target.getChildByName("video").active) {
                                    Utils_1.utils.SendEvent("视频-技能刷新(地下城僵尸)-播放");
                                    CocosZ_1.cocosz.watchAD(function () {
                                        Utils_1.utils.SendEvent("视频-技能刷新(地下城僵尸)-成功");
                                        _this._skill_refresh();
                                        _this._canClick = true;
                                    }, function () {
                                        Utils_1.utils.SendEvent("视频-技能刷新(地下城僵尸)-失败");
                                        _this._canClick = true;
                                    });
                                }
                                break;
                            }
                            case "skill0":
                            case "skill1":
                            case "skill2":
                            case "skill3":
                            case "skill4": {
                                this._canClick = false;
                                callback_1 = function () {
                                    if ("skill0" == event.target.name)
                                        _this._curIndex = 0;
                                    else if ("skill1" == event.target.name)
                                        _this._curIndex = 1;
                                    else if ("skill2" == event.target.name)
                                        _this._curIndex = 2;
                                    else if ("skill3" == event.target.name)
                                        _this._curIndex = 3;
                                    else if ("skill4" == event.target.name)
                                        _this._curIndex = 4;
                                    // 刷新
                                    _this.updateFrame();
                                    // 选中技能
                                    _this._selectSkill();
                                };
                                lockNode = event.target.getChildByName("lock");
                                if (lockNode && lockNode.active) {
                                    // 分享
                                    if (lockNode.getChildByName("share") && lockNode.getChildByName("share").active) {
                                        Utils_1.utils.SendEvent("分享-技能解锁");
                                        CocosZ_1.cocosz.share(function () {
                                            Utils_1.utils.SendEvent("分享-技能解锁-成功");
                                            callback_1 && callback_1();
                                        }, function () {
                                            Utils_1.utils.SendEvent("分享-技能解锁-失败");
                                            _this._canClick = true;
                                        });
                                    }
                                    // 视频
                                    else if (lockNode.getChildByName("video") && lockNode.getChildByName("video").active) {
                                        Utils_1.utils.SendEvent("视频-技能解锁-播放");
                                        CocosZ_1.cocosz.watchAD(function () {
                                            Utils_1.utils.SendEvent("视频-技能解锁-成功");
                                            callback_1 && callback_1();
                                        }, function () {
                                            Utils_1.utils.SendEvent("视频-技能解锁-失败");
                                            _this._canClick = true;
                                        });
                                    }
                                    else {
                                        callback_1 && callback_1();
                                    }
                                }
                                else {
                                    callback_1 && callback_1();
                                }
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UIUpgradePanel.prototype._selectSkill = function () {
        var _this = this;
        this._canClick = false;
        // 获取技能
        if (this._uiSkillIdArr[this._curIndex]) {
            UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.isValid && UpgradeMgr_1.upgradeMgr.getSkill(this._uiSkillIdArr[this._curIndex]);
        }
        // 卡片效果
        var arr = [this._skill0, this._skill1, this._skill2, this._skill3, this._skill4];
        arr.forEach(function (v, i) {
            if (i == _this._curIndex) {
                _this.card_click(v);
            }
            else {
                _this.card_recycle(v);
            }
        });
        // 关闭弹窗
        CocosZ_1.cocosz.scheduleOnce(function () {
            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIUpgradePanel);
            if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.isValid) {
                gameMgr_1.gameMgr.playerTs.avoidInjury(2);
            }
        }, 1.5);
    };
    UIUpgradePanel.prototype._getSkillIDName = function (id) {
        return id + (UpgradeMgr_1.upgradeMgr.upgradeSkillMaxLevelArr[id] > 1 ? "_" + (UpgradeMgr_1.upgradeMgr.upgradeSkillArr[id] + 1) : "");
    };
    UIUpgradePanel.prototype._skill_load = function (card, id) {
        // 名字
        var node_name = card.getChildByName("name");
        if (node_name) {
            var spr_name_1 = node_name.getComponent(cc.Sprite);
            if (spr_name_1) {
                CocosZ_1.cocosz.resMgr.loadAndCacheRes("i18n/tex_zombie/" + CocosZ_1.cocosz.curLanguage + "/zombieSkill_name_" + this._getSkillIDName(id), cc.SpriteFrame, null, function (err, res) {
                    if (spr_name_1 && spr_name_1.isValid) {
                        spr_name_1.spriteFrame = res;
                    }
                });
            }
        }
        // 图标
        var node_icon = card.getChildByName("icon");
        if (node_icon) {
            var spr_icon_1 = node_icon.getComponent(cc.Sprite);
            if (spr_icon_1) {
                CocosZ_1.cocosz.resMgr.loadAndCacheRes("tex_zombie/zombieSkill_icon_" + this._getSkillIDName(id), cc.SpriteFrame, null, function (err, res) {
                    if (spr_icon_1 && spr_icon_1.isValid) {
                        spr_icon_1.spriteFrame = res;
                    }
                });
            }
        }
        // 介绍
        var node_introduce = card.getChildByName("introduce");
        if (node_introduce) {
            var spr_introduce_1 = node_introduce.getComponent(cc.Sprite);
            if (spr_introduce_1) {
                CocosZ_1.cocosz.resMgr.loadAndCacheRes("i18n/tex_zombie/" + CocosZ_1.cocosz.curLanguage + "/zombieSkill_introduce_" + this._getSkillIDName(id), cc.SpriteFrame, null, function (err, res) {
                    if (spr_introduce_1 && spr_introduce_1.isValid) {
                        spr_introduce_1.spriteFrame = res;
                    }
                });
            }
        }
    };
    /** 技能刷新 */
    UIUpgradePanel.prototype._skill_refresh = function () {
        var _a;
        this._uiSkillIdArr.length = 0;
        // 从技能数组中获取5个技能
        if (this._betterArr.length) {
            for (var i = Math.min(5 - this._uiSkillIdArr.length, this._betterArr.length); i > 0; i--) {
                var index = Math.floor(Math.random() * this._betterArr.length);
                if (this._betterArr[index] >= 0) {
                    this._uiSkillIdArr.push(this._betterArr[index]);
                    this._betterArr.splice(index, 1);
                }
            }
        }
        if (this._otherArr.length) {
            for (var i = Math.min(5 - this._uiSkillIdArr.length, this._otherArr.length); i > 0; i--) {
                var index = Math.floor(Math.random() * this._otherArr.length);
                if (this._otherArr[index] >= 0) {
                    this._uiSkillIdArr.push(this._otherArr[index]);
                    this._otherArr.splice(index, 1);
                }
            }
        }
        // 排序
        for (var i = 0; i < this._uiSkillIdArr.length; i++) {
            // 3级技能(非视频位置)
            if (UpgradeMgr_1.upgradeMgr.upgradeSkillArr[this._uiSkillIdArr[i]] == 2 && !this._lockArr[i]) {
                // 与视频位置交换
                for (var j = this._uiSkillIdArr.length - 1; j > i; j--) {
                    if (this._lockArr[j] && UpgradeMgr_1.upgradeMgr.upgradeSkillArr[this._uiSkillIdArr[j]] != 2) {
                        // 交换
                        _a = [this._uiSkillIdArr[j], this._uiSkillIdArr[i]], this._uiSkillIdArr[i] = _a[0], this._uiSkillIdArr[j] = _a[1];
                    }
                }
            }
        }
        // 技能0 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[0] >= 0) {
            this._skill0.active = true;
            var id = this._uiSkillIdArr[0];
            this._skill_load(this._skill0, id);
        }
        else {
            this._skill0.active = false;
        }
        // 技能1 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[1] >= 0) {
            this._skill1.active = true;
            var id = this._uiSkillIdArr[1];
            this._skill_load(this._skill1, id);
        }
        else {
            this._skill1.active = false;
        }
        // 技能2 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[2] >= 0) {
            this._skill2.active = true;
            var id = this._uiSkillIdArr[2];
            this._skill_load(this._skill2, id);
        }
        else {
            this._skill2.active = false;
        }
        // 技能3 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[3] >= 0) {
            this._skill3.active = true;
            var id = this._uiSkillIdArr[3];
            this._skill_load(this._skill3, id);
        }
        else {
            this._skill3.active = false;
        }
        // 技能4 ///////////////////////////////////////////////////////////////////////////////////////////////
        if (this._uiSkillIdArr[4] >= 0) {
            this._skill4.active = true;
            var id = this._uiSkillIdArr[4];
            this._skill_load(this._skill4, id);
        }
        else {
            this._skill4.active = false;
        }
        // 视频按钮隐藏
        if (this._otherArr.length == 0 && this._btnRefresh && this._btnRefresh.active) {
            this._btnRefresh.active = false;
        }
        this.updateFrame();
    };
    // 更新外发光
    UIUpgradePanel.prototype.updateFrame = function () {
        // 选中框
        this._skill0.children[0].active = (this._curIndex == 0);
        this._skill1.children[0].active = (this._curIndex == 1);
        this._skill2.children[0].active = (this._curIndex == 2);
        this._skill3.children[0].active = (this._curIndex == 3);
        this._skill4.children[0].active = (this._curIndex == 4);
        // 解锁框
        this._skill0.children[5].active = this._lockArr[0] && this._curIndex != 0;
        this._skill1.children[5].active = this._lockArr[1] && this._curIndex != 1;
        this._skill2.children[5].active = this._lockArr[2] && this._curIndex != 2;
        this._skill3.children[5].active = this._lockArr[3] && this._curIndex != 3;
        this._skill4.children[5].active = this._lockArr[4] && this._curIndex != 4;
    };
    /** 卡牌选中特效 */
    UIUpgradePanel.prototype.card_click = function (card) {
        card.zIndex = cc.macro.MAX_ZINDEX;
        cc.tween(card)
            .to(0.5, { x: 0, y: 200 }, { easing: "sineIn" })
            .to(1, { scale: 2, opacity: 0 }, { easing: "fade" })
            .start();
    };
    /** 卡牌回收 */
    UIUpgradePanel.prototype.card_recycle = function (card) {
        var btnUnLock = card.getChildByName("btnUnLock");
        if (btnUnLock)
            btnUnLock.active = false;
        cc.tween(card)
            .to(0.5, { opacity: 0 }, { easing: "sineIn" })
            .start();
    };
    UIUpgradePanel = __decorate([
        ccclass
    ], UIUpgradePanel);
    return UIUpgradePanel;
}(UIPage_1.default));
exports.default = UIUpgradePanel;

cc._RF.pop();