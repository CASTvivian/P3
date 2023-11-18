"use strict";
cc._RF.push(module, '602c3qoDuBPu43NXRhxJ3PJ', 'UISignPage');
// scripts/UI/UISignPage.ts

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
var Msg_1 = require("../Framework/Msg");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var TweenEffect_1 = require("../Framework/TweenEffect");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var REWARD_SIGN = [500, 1000, 1500, 50, 2000, 2500, 100];
var DayItem = /** @class */ (function () {
    function DayItem(index, node) {
        this._index = -1;
        this._node = null;
        this._normal = null;
        this._current = null;
        this._got = null;
        this._label = null;
        this._index = index;
        this._node = node;
        this._normal = this._node.getChildByName("st1");
        this._current = this._node.getChildByName("st2");
        this._got = this._node.getChildByName("st3");
        if (this._node.getChildByName("rewardLabel")) {
            this._label = this._node.getChildByName("rewardLabel").getComponent(cc.Label);
            this._label.node.scale = 0.7;
            this._label.node.setPosition(this._node.x, this._node.y - 60);
            this._label.node.setParent(this._node.parent);
            this._label.string = "+" + REWARD_SIGN[this._index];
        }
    }
    DayItem.prototype.setStatus = function (status) {
        if (status == 0) {
            this._normal.active = true;
            this._current.active = false;
            this._got.active = false;
            this._label.node.active = true;
        }
        else if (status == 1) {
            this._normal.active = false;
            this._current.active = true;
            this._got.active = false;
            this._label.node.active = true;
        }
        else if (status == 2) {
            this._normal.active = true;
            this._current.active = false;
            this._got.active = true;
            this._label.node.active = false;
        }
    };
    DayItem.prototype.update = function () {
        // 上一次领取的是第几天,从0开始
        var lastDayIndex = CocosZ_1.cocosz.dataMgr.LastDailyBonusIndex;
        // 超过一天, 重置一下天数
        if (lastDayIndex == 6) {
            lastDayIndex = -1;
        }
        // 上次领取的时间
        var lastDayTime = CocosZ_1.cocosz.dataMgr.LastDailyBonusTime;
        var canGet = false;
        if (new Date().toDateString() != lastDayTime && this._index == lastDayIndex + 1) {
            canGet = true;
        }
        // cc.log(`lastDayIndex: ${lastDayIndex} --- lastDayTime: ${lastDayTime}`);
        // this._got.active = false;
        // this._normal.active = false;
        // this._current.active = false;
        if (this._index <= lastDayIndex) {
            // 已经领取过了
            // this._got.active = true;
            this.setStatus(2);
        }
        else {
            if (canGet) {
                this.setStatus(1);
                // this._current.active = true;
            }
            else {
                this.setStatus(0);
                // this._normal.active = true;
            }
        }
    };
    return DayItem;
}());
var UISignPanel = /** @class */ (function (_super) {
    __extends(UISignPanel, _super);
    function UISignPanel() {
        var _this = _super.call(this, Constant_1.PanelName.UISignPanel) || this;
        _this._mask = null;
        _this._panel = null;
        _this._btnGet = null;
        _this._btnDouble = null;
        _this._btnClose = null;
        _this._day = [];
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UISignPanel.prototype.onLoad = function () {
        this._panel = this._page.getChildByName("Panel");
        this._mask = this._page.getChildByName("mask");
        var btnNames = ["BtnClose", "BtnDouble", "BtnGet"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = cc.find(btnNames[i], this._panel);
            if (!btn)
                continue;
            btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            if (btn.name == "BtnGet") {
                this._btnGet = btn;
            }
            else if (btn.name == "BtnDouble") {
                this._btnDouble = btn;
                this._btnDouble.active = CocosZ_1.cocosz.isADON;
            }
            else {
                this._btnClose = btn;
            }
        }
        for (var i = 0; i < 6; i++) {
            var dayItem = new DayItem(i, this._panel.getChildByName("Day_" + (i + 1)));
            this._day.push(dayItem);
        }
    };
    UISignPanel.prototype.onOpen = function () {
        // 上报 首页签到
        Utils_1.utils.umaEvent("gamegamesign");
        Utils_1.utils.SendEvent("页面-签到");
        this._initPanel();
    };
    UISignPanel.prototype._initPanel = function () {
        TweenEffect_1.default.panel_open_scale(this._panel);
        // 缩放
        this._updateDayItem();
    };
    UISignPanel.prototype._updateDayItem = function () {
        for (var i = 0; i < 6; i++) {
            this._day[i].update();
        }
    };
    UISignPanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                CocosZ_1.cocosz.audioMgr.playBtnEffect();
                switch (event.target.name) {
                    case "BtnGet": {
                        if (!this._canGetBonus()) {
                            Msg_1.default.Show(i18n.t("msg.jryqd")); //今日已领取奖励
                            return [2 /*return*/];
                        }
                        this._getReward(false);
                        break;
                    }
                    case "BtnDouble": {
                        if (!this._canGetBonus()) {
                            Msg_1.default.Show(i18n.t("msg.jryqd")); //今日已领取奖励
                            return [2 /*return*/];
                        }
                        Utils_1.utils.SendEvent("视频-双倍签到-播放");
                        CocosZ_1.cocosz.watchAD(function () {
                            Utils_1.utils.SendEvent("视频-双倍签到-成功");
                            _this._getReward(true);
                        }, function () {
                            Utils_1.utils.SendEvent("视频-双倍签到-失败");
                        });
                        break;
                    }
                    case "BtnClose": {
                        CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UISignPanel);
                        break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    UISignPanel.prototype._getReward = function (double) {
        if (double == false) {
            // 上报 普通签到
            Utils_1.utils.umaEvent("gamesignordinary");
            Utils_1.utils.SendEvent("签到-普通");
        }
        else {
            // 上报 双倍签到
            Utils_1.utils.umaEvent("gamedoublesign");
            Utils_1.utils.SendEvent("签到-双倍");
        }
        // 签到索引
        var lastDayIndex = CocosZ_1.cocosz.dataMgr.LastDailyBonusIndex;
        if (lastDayIndex == 6) {
            lastDayIndex = -1;
        }
        var curDayIndex = lastDayIndex + 1;
        // 奖励数量
        var count = REWARD_SIGN[curDayIndex];
        if (double) {
            count *= 2;
        }
        if (curDayIndex == 3 || curDayIndex == 6) {
            // 钻石
            Msg_1.default.Show(i18n.t("msg.gxhdzs") + count);
            CocosZ_1.cocosz.dataMgr.DiamondCount += count;
            // 飞金币事件
            setTimeout(function () {
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Fly_Coin, iconName: 'diamond', frameNodeName: 'CoinLabel2' });
            }, 500);
        }
        else {
            // 金币
            Msg_1.default.Show(i18n.t("msg.gxhdjb") + count);
            CocosZ_1.cocosz.dataMgr.CoinCount += count;
            // 飞金币事件
            setTimeout(function () {
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Fly_Coin, iconName: 'coin', frameNodeName: 'CoinLabel' });
            }, 500);
        }
        // 本地信息
        CocosZ_1.cocosz.dataMgr.LastDailyBonusIndex = curDayIndex;
        CocosZ_1.cocosz.dataMgr.LastDailyBonusTime = new Date().toDateString();
        // 刷新UI
        // this._updateDayItem();
        // 关闭弹窗
        CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UISignPanel);
    };
    UISignPanel.prototype._canGetBonus = function () {
        return (new Date().toDateString() != CocosZ_1.cocosz.dataMgr.LastDailyBonusTime);
    };
    UISignPanel = __decorate([
        ccclass
    ], UISignPanel);
    return UISignPanel;
}(UIPage_1.default));
exports.default = UISignPanel;

cc._RF.pop();