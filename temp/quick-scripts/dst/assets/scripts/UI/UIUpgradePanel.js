
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIUpgradePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJVXBncmFkZVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxrREFBa0Q7QUFDbEQsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCx3REFBbUQ7QUFDbkQsaURBQTJEO0FBQzNELG1FQUE4RDtBQUM5RCwyQ0FBMEM7QUFFcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUE0QyxrQ0FBTTtJQW9COUM7UUFBQSxZQUNJLGtCQUFNLG9CQUFTLENBQUMsY0FBYyxDQUFDLFNBRWxDO1FBckJPLFdBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUN2QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsZ0JBQVUsR0FBYSxFQUFFLENBQUM7UUFDMUIsZUFBUyxHQUFhLEVBQUUsQ0FBQyxDQUFBLFlBQVk7UUFDckMsbUJBQWEsR0FBYSxFQUFFLENBQUMsQ0FBQSxTQUFTO1FBQ3RDLGVBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBLFNBQVM7UUFFaEMsZUFBUyxHQUFZLElBQUksQ0FBQyxDQUFBLE9BQU87UUFFakMsY0FBUSxHQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBSTlELEtBQUksQ0FBQyxPQUFPLEVBQUUs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QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2hELElBQUksU0FBUztZQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1QsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUM3QyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBcFlnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBc1lsQztJQUFELHFCQUFDO0NBdFlELEFBc1lDLENBdFkyQyxnQkFBTSxHQXNZakQ7a0JBdFlvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJUGFnZSBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJUGFnZVwiO1xyXG5pbXBvcnQgeyBQYW5lbE5hbWUgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgVHdlZW5FZmZlY3QgZnJvbSBcIi4uL0ZyYW1ld29yay9Ud2VlbkVmZmVjdFwiO1xyXG5pbXBvcnQgeyBTa2lsbFR5cGUsIHVwZ3JhZGVNZ3IgfSBmcm9tIFwiLi4vR2FtZS9VcGdyYWRlTWdyXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuLi9HYW1lL2dhbWVNZ3JcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICog55qu6IKk6K+V55So6Z2i5p2/XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVVwZ3JhZGVQYW5lbCBleHRlbmRzIFVJUGFnZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFzazogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2lsbDA6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc2tpbGwxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NraWxsMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2lsbDM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc2tpbGw0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0blJlZnJlc2g6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2JldHRlckFycjogbnVtYmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX290aGVyQXJyOiBudW1iZXJbXSA9IFtdOy8vIOWPr+S7peiOt+WPlueahOaKgOiDveaVsOe7hFxyXG4gICAgcHJpdmF0ZSBfdWlTa2lsbElkQXJyOiBudW1iZXJbXSA9IFtdOy8vIOmaj+acujTkuKrmioDog71cclxuICAgIHByaXZhdGUgX2N1ckluZGV4OiBudW1iZXIgPSAtMTsvLyDlvZPliY3pgInkuK3kuIvmoIdcclxuXHJcbiAgICBwcml2YXRlIF9jYW5DbGljazogYm9vbGVhbiA9IHRydWU7Ly8g6IO95ZCm54K55Ye7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9ja0FycjogYm9vbGVhbltdID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoUGFuZWxOYW1lLlVJVXBncmFkZVBhbmVsKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJNYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIGxldCBidG5OYW1lczogc3RyaW5nW10gPSBbXCJza2lsbDBcIiwgXCJza2lsbDFcIiwgXCJza2lsbDJcIiwgXCJza2lsbDNcIiwgXCJza2lsbDRcIiwgXCJidG5SZWZyZXNoXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRuTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ0bjogY2MuTm9kZSA9IGNjLmZpbmQoYnRuTmFtZXNbaV0sIHRoaXMuX3BhbmVsKTtcclxuICAgICAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICAgICAgYnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25CdG5DbGlja2VkSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuLm5hbWUgPT0gXCJza2lsbDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsMCA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJza2lsbDFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsMSA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJza2lsbDJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsMiA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJza2lsbDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsMyA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJza2lsbDRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsNCA9IGJ0bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJidG5SZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5SZWZyZXNoID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSBjb2Nvc3ouaXNBRE9OO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOacjeWKoeWZqOmUgeeahOaVsOmHj1xyXG4gICAgICAgIGxldCBzZXJ2ZXJWYWx1ZSA9IGNvY29zei5nZXRDb25maWdCeUtleShcInNraWxsTG9ja051bVwiKTtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihzZXJ2ZXJWYWx1ZSkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpICsgc2VydmVyVmFsdWUgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tBcnJbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NrQXJyW2ldID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLpobXpnaIt5oqA6IO9XCIpO1xyXG4gICAgICAgIC8vIOS8mOWFiOaKgOiDveaVsOe7hFxyXG4gICAgICAgIGxldCBiZXR0ZXIgPSBbXHJcbiAgICAgICAgICAgIFNraWxsVHlwZS7lj4zlj5EsIFNraWxsVHlwZS7lrZDlvLnnoo7niYcsIFNraWxsVHlwZS7mnqrmnpflvLnpm6gsIFNraWxsVHlwZS7osKLluZUsXHJcbiAgICAgICAgICAgIFNraWxsVHlwZS7nnqzmlqksIFNraWxsVHlwZS7lhrDpnJznsr7pgJosIFNraWxsVHlwZS7ngavnhLDnsr7pgJosIFNraWxsVHlwZS7okIPlj5YsXHJcbiAgICAgICAgICAgIFNraWxsVHlwZS7lho3nlJ8sIFNraWxsVHlwZS7miqTnlLLpnbTlrZAsIFNraWxsVHlwZS7nlr7otbAsIFNraWxsVHlwZS7npZ7lnKPlrojmiqQsXHJcbiAgICAgICAgICAgIFNraWxsVHlwZS7pgJrngbXljJXpppYsIFNraWxsVHlwZS7po57ova4sIFNraWxsVHlwZS7pl6rnlLUsIFNraWxsVHlwZS7nh4Png6fnk7ZcclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vIOWPr+S7peiOt+WPlueahOaKgOiDveaVsOe7hFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM0OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKFtTa2lsbFR5cGUu6Zu355S157K+6YCaLCBTa2lsbFR5cGUu6b6Z5Y21LCBTa2lsbFR5cGUu6YCa54G16ZWw5YiAXS5pbmNsdWRlcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5YmU6Zmk55qE5oqA6IO9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXBncmFkZU1nciAmJiB1cGdyYWRlTWdyLmlzVmFsaWQgJiYgdXBncmFkZU1nci51cGdyYWRlU2tpbGxBcnJbaV0gPj0gdXBncmFkZU1nci51cGdyYWRlU2tpbGxNYXhMZXZlbEFycltpXSkge1xyXG4gICAgICAgICAgICAgICAgLy8g6L6+5Yiw5pyA5aSn57qnXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmV0dGVyLmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDkvJjlhYjmlbDnu4RcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JldHRlckFyci5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5YW25a6D5pWw57uEXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vdGhlckFyci5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2luaXRQYW5lbCgpO1xyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlQ3VzdG9tQWQoeyBsb2NhdGlvbjogMyB9KTtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLmhpZGVDdXN0b21BZCh7IGxvY2F0aW9uOiA0IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBjb2Nvc3oucGF1c2VDb3VudC0tO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dDdXN0b21BZCh7IGxvY2F0aW9uOiAzIH0pO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd0N1c3RvbUFkKHsgbG9jYXRpb246IDQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRQYW5lbCgpIHtcclxuICAgICAgICBUd2VlbkVmZmVjdC5wYW5lbF9tYXNrX29wYWNpdHkodGhpcy5fbWFzaylcclxuICAgICAgICBUd2VlbkVmZmVjdC5wYW5lbF9vcGVuX21vdmVZKHRoaXMuX3BhbmVsKTtcclxuICAgICAgICB0aGlzLl9jdXJJbmRleCA9IC0xO1xyXG4gICAgICAgIC8vIOWIt+aWsOaKgOiDvVxyXG4gICAgICAgIHRoaXMuX3NraWxsX3JlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJgOacieaMiemSrueCueWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50IFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgX29uQnRuQ2xpY2tlZEhhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAvL+aSreaUvuaMiemSrueCueWHu+mfs+aViFxyXG4gICAgICAgIGF3YWl0IGNvY29zei5hdWRpb01nci5wbGF5QnRuRWZmZWN0KCkuY2F0Y2goKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2NhbkNsaWNrKSByZXR1cm47XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuUmVmcmVzaFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5DbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8g5YiG5LqrXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmdldENoaWxkQnlOYW1lKFwic2hhcmVcIikgJiYgZXZlbnQudGFyZ2V0LmdldENoaWxkQnlOYW1lKFwic2hhcmVcIikuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeWIt+aWsOaKgOiDvVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5zaGFyZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuWIhuS6qy3liLfmlrDmioDog70t5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsX3JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeWIt+aWsOaKgOiDvS3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDop4bpopFcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldC5nZXRDaGlsZEJ5TmFtZShcInZpZGVvXCIpICYmIGV2ZW50LnRhcmdldC5nZXRDaGlsZEJ5TmFtZShcInZpZGVvXCIpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3mioDog73liLfmlrAo5Zyw5LiL5Z+O5YO15bC4KS3mkq3mlL5cIilcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oud2F0Y2hBRCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3mioDog73liLfmlrAo5Zyw5LiL5Z+O5YO15bC4KS3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxfcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW5DbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5oqA6IO95Yi35pawKOWcsOS4i+WfjuWDteWwuCkt5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbkNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJza2lsbDBcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNraWxsMVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2tpbGwyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJza2lsbDNcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNraWxsNFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5DbGljayA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJza2lsbDBcIiA9PSBldmVudC50YXJnZXQubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VySW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwic2tpbGwxXCIgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ckluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChcInNraWxsMlwiID09IGV2ZW50LnRhcmdldC5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoXCJza2lsbDNcIiA9PSBldmVudC50YXJnZXQubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VySW5kZXggPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwic2tpbGw0XCIgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ckluZGV4ID0gNDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDliLfmlrBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5Lit5oqA6IO9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBsb2NrTm9kZSA9IGV2ZW50LnRhcmdldC5nZXRDaGlsZEJ5TmFtZShcImxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9ja05vZGUgJiYgbG9ja05vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5YiG5LqrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2tOb2RlLmdldENoaWxkQnlOYW1lKFwic2hhcmVcIikgJiYgbG9ja05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaGFyZVwiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeaKgOiDveino+mUgVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouc2hhcmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeaKgOiDveino+mUgS3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuWIhuS6qy3mioDog73op6PplIEt5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW5DbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOinhumikVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxvY2tOb2RlLmdldENoaWxkQnlOYW1lKFwidmlkZW9cIikgJiYgbG9ja05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWRlb1wiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeaKgOiDveino+mUgS3mkq3mlL5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LndhdGNoQUQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeaKgOiDveino+mUgS3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3mioDog73op6PplIEt5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW5DbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0U2tpbGwoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FuQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAvLyDojrflj5bmioDog71cclxuICAgICAgICBpZiAodGhpcy5fdWlTa2lsbElkQXJyW3RoaXMuX2N1ckluZGV4XSkge1xyXG4gICAgICAgICAgICB1cGdyYWRlTWdyICYmIHVwZ3JhZGVNZ3IuaXNWYWxpZCAmJiB1cGdyYWRlTWdyLmdldFNraWxsKHRoaXMuX3VpU2tpbGxJZEFyclt0aGlzLl9jdXJJbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDljaHniYfmlYjmnpxcclxuICAgICAgICBsZXQgYXJyOiBjYy5Ob2RlW10gPSBbdGhpcy5fc2tpbGwwLCB0aGlzLl9za2lsbDEsIHRoaXMuX3NraWxsMiwgdGhpcy5fc2tpbGwzLCB0aGlzLl9za2lsbDRdO1xyXG4gICAgICAgIGFyci5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMuX2N1ckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRfY2xpY2sodik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRfcmVjeWNsZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5YWz6Zet5by556qXXHJcbiAgICAgICAgY29jb3N6LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVVwZ3JhZGVQYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChnYW1lTWdyICYmIGdhbWVNZ3IucGxheWVyVHMgJiYgZ2FtZU1nci5wbGF5ZXJUcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLnBsYXllclRzLmF2b2lkSW5qdXJ5KDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMS41KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRTa2lsbElETmFtZShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGlkICsgKHVwZ3JhZGVNZ3IudXBncmFkZVNraWxsTWF4TGV2ZWxBcnJbaWRdID4gMSA/IFwiX1wiICsgKHVwZ3JhZGVNZ3IudXBncmFkZVNraWxsQXJyW2lkXSArIDEpIDogXCJcIilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9za2lsbF9sb2FkKGNhcmQ6IGNjLk5vZGUsIGlkKSB7XHJcbiAgICAgICAgLy8g5ZCN5a2XXHJcbiAgICAgICAgbGV0IG5vZGVfbmFtZSA9IGNhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpO1xyXG4gICAgICAgIGlmIChub2RlX25hbWUpIHtcclxuICAgICAgICAgICAgbGV0IHNwcl9uYW1lID0gbm9kZV9uYW1lLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBpZiAoc3ByX25hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvY29zei5yZXNNZ3IubG9hZEFuZENhY2hlUmVzKFwiaTE4bi90ZXhfem9tYmllL1wiICsgY29jb3N6LmN1ckxhbmd1YWdlICsgXCIvem9tYmllU2tpbGxfbmFtZV9cIiArIHRoaXMuX2dldFNraWxsSUROYW1lKGlkKSwgY2MuU3ByaXRlRnJhbWUsIG51bGwsIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcHJfbmFtZSAmJiBzcHJfbmFtZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcl9uYW1lLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWbvuagh1xyXG4gICAgICAgIGxldCBub2RlX2ljb24gPSBjYXJkLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKTtcclxuICAgICAgICBpZiAobm9kZV9pY29uKSB7XHJcbiAgICAgICAgICAgIGxldCBzcHJfaWNvbiA9IG5vZGVfaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgaWYgKHNwcl9pY29uKSB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oucmVzTWdyLmxvYWRBbmRDYWNoZVJlcyhcInRleF96b21iaWUvem9tYmllU2tpbGxfaWNvbl9cIiArIHRoaXMuX2dldFNraWxsSUROYW1lKGlkKSwgY2MuU3ByaXRlRnJhbWUsIG51bGwsIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcHJfaWNvbiAmJiBzcHJfaWNvbi5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcl9pY29uLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOS7i+e7jVxyXG4gICAgICAgIGxldCBub2RlX2ludHJvZHVjZSA9IGNhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJpbnRyb2R1Y2VcIik7XHJcbiAgICAgICAgaWYgKG5vZGVfaW50cm9kdWNlKSB7XHJcbiAgICAgICAgICAgIGxldCBzcHJfaW50cm9kdWNlID0gbm9kZV9pbnRyb2R1Y2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmIChzcHJfaW50cm9kdWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oucmVzTWdyLmxvYWRBbmRDYWNoZVJlcyhcImkxOG4vdGV4X3pvbWJpZS9cIiArIGNvY29zei5jdXJMYW5ndWFnZSArIFwiL3pvbWJpZVNraWxsX2ludHJvZHVjZV9cIiArIHRoaXMuX2dldFNraWxsSUROYW1lKGlkKSwgY2MuU3ByaXRlRnJhbWUsIG51bGwsIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcHJfaW50cm9kdWNlICYmIHNwcl9pbnRyb2R1Y2UuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJfaW50cm9kdWNlLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmioDog73liLfmlrAgKi9cclxuICAgIHByaXZhdGUgX3NraWxsX3JlZnJlc2goKSB7XHJcbiAgICAgICAgdGhpcy5fdWlTa2lsbElkQXJyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgLy8g5LuO5oqA6IO95pWw57uE5Lit6I635Y+WNeS4quaKgOiDvVxyXG4gICAgICAgIGlmICh0aGlzLl9iZXR0ZXJBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBNYXRoLm1pbig1IC0gdGhpcy5fdWlTa2lsbElkQXJyLmxlbmd0aCwgdGhpcy5fYmV0dGVyQXJyLmxlbmd0aCk7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2JldHRlckFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2JldHRlckFycltpbmRleF0gPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpU2tpbGxJZEFyci5wdXNoKHRoaXMuX2JldHRlckFycltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JldHRlckFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vdGhlckFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IE1hdGgubWluKDUgLSB0aGlzLl91aVNraWxsSWRBcnIubGVuZ3RoLCB0aGlzLl9vdGhlckFyci5sZW5ndGgpOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9vdGhlckFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX290aGVyQXJyW2luZGV4XSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlTa2lsbElkQXJyLnB1c2godGhpcy5fb3RoZXJBcnJbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vdGhlckFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaOkuW6j1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdWlTa2lsbElkQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIDPnuqfmioDog70o6Z2e6KeG6aKR5L2N572uKVxyXG4gICAgICAgICAgICBpZiAodXBncmFkZU1nci51cGdyYWRlU2tpbGxBcnJbdGhpcy5fdWlTa2lsbElkQXJyW2ldXSA9PSAyICYmICF0aGlzLl9sb2NrQXJyW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDkuI7op4bpopHkvY3nva7kuqTmjaJcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSB0aGlzLl91aVNraWxsSWRBcnIubGVuZ3RoIC0gMTsgaiA+IGk7IGotLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb2NrQXJyW2pdICYmIHVwZ3JhZGVNZ3IudXBncmFkZVNraWxsQXJyW3RoaXMuX3VpU2tpbGxJZEFycltqXV0gIT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkuqTmjaJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMuX3VpU2tpbGxJZEFycltpXSwgdGhpcy5fdWlTa2lsbElkQXJyW2pdXSA9IFt0aGlzLl91aVNraWxsSWRBcnJbal0sIHRoaXMuX3VpU2tpbGxJZEFycltpXV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOaKgOiDvTAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICBpZiAodGhpcy5fdWlTa2lsbElkQXJyWzBdID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuX3VpU2tpbGxJZEFyclswXTtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGxfbG9hZCh0aGlzLl9za2lsbDAsIGlkKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmioDog70xIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgaWYgKHRoaXMuX3VpU2tpbGxJZEFyclsxXSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsMS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl91aVNraWxsSWRBcnJbMV07XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsX2xvYWQodGhpcy5fc2tpbGwxLCBpZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmioDog70yIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgaWYgKHRoaXMuX3VpU2tpbGxJZEFyclsyXSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsMi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl91aVNraWxsSWRBcnJbMl07XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsX2xvYWQodGhpcy5fc2tpbGwyLCBpZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmioDog70zIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgaWYgKHRoaXMuX3VpU2tpbGxJZEFyclszXSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsMy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl91aVNraWxsSWRBcnJbM107XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsX2xvYWQodGhpcy5fc2tpbGwzLCBpZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGwzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmioDog700IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgaWYgKHRoaXMuX3VpU2tpbGxJZEFycls0XSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsNC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl91aVNraWxsSWRBcnJbNF07XHJcbiAgICAgICAgICAgIHRoaXMuX3NraWxsX2xvYWQodGhpcy5fc2tpbGw0LCBpZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpbGw0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6KeG6aKR5oyJ6ZKu6ZqQ6JePXHJcbiAgICAgICAgaWYgKHRoaXMuX290aGVyQXJyLmxlbmd0aCA9PSAwICYmIHRoaXMuX2J0blJlZnJlc2ggJiYgdGhpcy5fYnRuUmVmcmVzaC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuUmVmcmVzaC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVGcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOabtOaWsOWkluWPkeWFiVxyXG4gICAgdXBkYXRlRnJhbWUoKSB7XHJcbiAgICAgICAgLy8g6YCJ5Lit5qGGXHJcbiAgICAgICAgdGhpcy5fc2tpbGwwLmNoaWxkcmVuWzBdLmFjdGl2ZSA9ICh0aGlzLl9jdXJJbmRleCA9PSAwKTtcclxuICAgICAgICB0aGlzLl9za2lsbDEuY2hpbGRyZW5bMF0uYWN0aXZlID0gKHRoaXMuX2N1ckluZGV4ID09IDEpO1xyXG4gICAgICAgIHRoaXMuX3NraWxsMi5jaGlsZHJlblswXS5hY3RpdmUgPSAodGhpcy5fY3VySW5kZXggPT0gMik7XHJcbiAgICAgICAgdGhpcy5fc2tpbGwzLmNoaWxkcmVuWzBdLmFjdGl2ZSA9ICh0aGlzLl9jdXJJbmRleCA9PSAzKTtcclxuICAgICAgICB0aGlzLl9za2lsbDQuY2hpbGRyZW5bMF0uYWN0aXZlID0gKHRoaXMuX2N1ckluZGV4ID09IDQpO1xyXG4gICAgICAgIC8vIOino+mUgeahhlxyXG4gICAgICAgIHRoaXMuX3NraWxsMC5jaGlsZHJlbls1XS5hY3RpdmUgPSB0aGlzLl9sb2NrQXJyWzBdICYmIHRoaXMuX2N1ckluZGV4ICE9IDA7XHJcbiAgICAgICAgdGhpcy5fc2tpbGwxLmNoaWxkcmVuWzVdLmFjdGl2ZSA9IHRoaXMuX2xvY2tBcnJbMV0gJiYgdGhpcy5fY3VySW5kZXggIT0gMTtcclxuICAgICAgICB0aGlzLl9za2lsbDIuY2hpbGRyZW5bNV0uYWN0aXZlID0gdGhpcy5fbG9ja0FyclsyXSAmJiB0aGlzLl9jdXJJbmRleCAhPSAyO1xyXG4gICAgICAgIHRoaXMuX3NraWxsMy5jaGlsZHJlbls1XS5hY3RpdmUgPSB0aGlzLl9sb2NrQXJyWzNdICYmIHRoaXMuX2N1ckluZGV4ICE9IDM7XHJcbiAgICAgICAgdGhpcy5fc2tpbGw0LmNoaWxkcmVuWzVdLmFjdGl2ZSA9IHRoaXMuX2xvY2tBcnJbNF0gJiYgdGhpcy5fY3VySW5kZXggIT0gNDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Y2h54mM6YCJ5Lit54m55pWIICovXHJcbiAgICBjYXJkX2NsaWNrKGNhcmQ6IGNjLk5vZGUpIHtcclxuICAgICAgICBjYXJkLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XHJcbiAgICAgICAgY2MudHdlZW4oY2FyZClcclxuICAgICAgICAgICAgLnRvKDAuNSwgeyB4OiAwLCB5OiAyMDAgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcclxuICAgICAgICAgICAgLnRvKDEsIHsgc2NhbGU6IDIsIG9wYWNpdHk6IDAgfSwgeyBlYXNpbmc6IFwiZmFkZVwiIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDljaHniYzlm57mlLYgKi9cclxuICAgIGNhcmRfcmVjeWNsZShjYXJkOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbGV0IGJ0blVuTG9jayA9IGNhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5VbkxvY2tcIilcclxuICAgICAgICBpZiAoYnRuVW5Mb2NrKSBidG5VbkxvY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MudHdlZW4oY2FyZClcclxuICAgICAgICAgICAgLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=