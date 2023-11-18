
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UISignPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJU2lnblBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLGtEQUFzRTtBQUN0RSw4Q0FBNkM7QUFDN0Msd0NBQW1DO0FBRW5DLDJEQUEwRDtBQUMxRCx3REFBbUQ7QUFDbkQsYUFBYTtBQUNiLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUcvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QyxJQUFNLFdBQVcsR0FBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXJFO0lBU0ksaUJBQVksS0FBYSxFQUFFLElBQWE7UUFSaEMsV0FBTSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsV0FBTSxHQUFhLElBQUksQ0FBQztRQUc1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENB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QztJQUM1RSxDQUFDO0lBOUlnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBZ0ovQjtJQUFELGtCQUFDO0NBaEpELEFBZ0pDLENBaEp3QyxnQkFBTSxHQWdKOUM7a0JBaEpvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJUGFnZSBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJUGFnZVwiO1xyXG5pbXBvcnQgQ29uc3RhbnQsIHsgUGFnZU5hbWUsIFBhbmVsTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IE1zZyBmcm9tIFwiLi4vRnJhbWV3b3JrL01zZ1wiO1xyXG5pbXBvcnQgRmx5Q29pbiBmcm9tIFwiLi4vRnJhbWV3b3JrL0ZseUNvaW5cIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCBUd2VlbkVmZmVjdCBmcm9tIFwiLi4vRnJhbWV3b3JrL1R3ZWVuRWZmZWN0XCI7XHJcbi8vIEB0cy1pZ25vcmVcclxuY29uc3QgaTE4biA9IHJlcXVpcmUoJ0xhbmd1YWdlRGF0YScpO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuY29uc3QgUkVXQVJEX1NJR046IG51bWJlcltdID0gWzUwMCwgMTAwMCwgMTUwMCwgNTAsIDIwMDAsIDI1MDAsIDEwMF07XHJcblxyXG5jbGFzcyBEYXlJdGVtIHtcclxuICAgIHByaXZhdGUgX2luZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX25vcm1hbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2dvdDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluZGV4OiBudW1iZXIsIG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG5cclxuICAgICAgICB0aGlzLl9ub3JtYWwgPSB0aGlzLl9ub2RlLmdldENoaWxkQnlOYW1lKFwic3QxXCIpO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9ub2RlLmdldENoaWxkQnlOYW1lKFwic3QyXCIpO1xyXG4gICAgICAgIHRoaXMuX2dvdCA9IHRoaXMuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdDNcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkTGFiZWxcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSB0aGlzLl9ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwubm9kZS5zY2FsZSA9IDAuNztcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwubm9kZS5zZXRQb3NpdGlvbih0aGlzLl9ub2RlLngsIHRoaXMuX25vZGUueSAtIDYwKTtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwubm9kZS5zZXRQYXJlbnQodGhpcy5fbm9kZS5wYXJlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zdHJpbmcgPSBcIitcIiArIFJFV0FSRF9TSUdOW3RoaXMuX2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN0YXR1cyhzdGF0dXM6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3JtYWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZ290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9nb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbm9ybWFsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2dvdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCkge1xyXG4gICAgICAgIC8vIOS4iuS4gOasoemihuWPlueahOaYr+esrOWHoOWkqSzku44w5byA5aeLXHJcbiAgICAgICAgbGV0IGxhc3REYXlJbmRleDogbnVtYmVyID0gY29jb3N6LmRhdGFNZ3IuTGFzdERhaWx5Qm9udXNJbmRleDtcclxuICAgICAgICAvLyDotoXov4fkuIDlpKksIOmHjee9ruS4gOS4i+WkqeaVsFxyXG4gICAgICAgIGlmIChsYXN0RGF5SW5kZXggPT0gNikge1xyXG4gICAgICAgICAgICBsYXN0RGF5SW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5LiK5qyh6aKG5Y+W55qE5pe26Ze0XHJcbiAgICAgICAgY29uc3QgbGFzdERheVRpbWU6IHN0cmluZyA9IGNvY29zei5kYXRhTWdyLkxhc3REYWlseUJvbnVzVGltZTtcclxuICAgICAgICBsZXQgY2FuR2V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkgIT0gbGFzdERheVRpbWUgJiYgdGhpcy5faW5kZXggPT0gbGFzdERheUluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICBjYW5HZXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYy5sb2coYGxhc3REYXlJbmRleDogJHtsYXN0RGF5SW5kZXh9IC0tLSBsYXN0RGF5VGltZTogJHtsYXN0RGF5VGltZX1gKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5fZ290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuX25vcm1hbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLl9jdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmRleCA8PSBsYXN0RGF5SW5kZXgpIHtcclxuICAgICAgICAgICAgLy8g5bey57uP6aKG5Y+W6L+H5LqGXHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2dvdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXR1cygyKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjYW5HZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKDEpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9jdXJyZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cygwKVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fbm9ybWFsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2lnblBhbmVsIGV4dGVuZHMgVUlQYWdlIHtcclxuXHJcbiAgICBwcml2YXRlIF9tYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0bkdldDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9idG5Eb3VibGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYnRuQ2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZGF5OiBEYXlJdGVtW10gPSBbXTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoUGFuZWxOYW1lLlVJU2lnblBhbmVsKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fcGFuZWwgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpO1xyXG4gICAgICAgIGxldCBidG5OYW1lczogc3RyaW5nW10gPSBbXCJCdG5DbG9zZVwiLCBcIkJ0bkRvdWJsZVwiLCBcIkJ0bkdldFwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ0bk5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidG46IGNjLk5vZGUgPSBjYy5maW5kKGJ0bk5hbWVzW2ldLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgICAgIGlmICghYnRuKSBjb250aW51ZVxyXG4gICAgICAgICAgICBidG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkJ0bkNsaWNrZWRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChidG4ubmFtZSA9PSBcIkJ0bkdldFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5HZXQgPSBidG47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnRuLm5hbWUgPT0gXCJCdG5Eb3VibGVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuRG91YmxlID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuRG91YmxlLmFjdGl2ZSA9IGNvY29zei5pc0FET047XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG5DbG9zZSA9IGJ0bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRheUl0ZW06IERheUl0ZW0gPSBuZXcgRGF5SXRlbShpLCB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkRheV9cIiArIChpICsgMSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF5LnB1c2goZGF5SXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIC8vIOS4iuaKpSDpppbpobXnrb7liLBcclxuICAgICAgICB1dGlscy51bWFFdmVudChcImdhbWVnYW1lc2lnblwiKTtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLpobXpnaIt562+5YiwXCIpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRQYW5lbCgpIHtcclxuICAgICAgICBUd2VlbkVmZmVjdC5wYW5lbF9vcGVuX3NjYWxlKHRoaXMuX3BhbmVsKTtcclxuICAgICAgICAvLyDnvKnmlL5cclxuICAgICAgICB0aGlzLl91cGRhdGVEYXlJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlRGF5SXRlbSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXlbaV0udXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgX29uQnRuQ2xpY2tlZEhhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUJ0bkVmZmVjdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0Lm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkJ0bkdldFwiOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NhbkdldEJvbnVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cuanJ5cWRcIikpOy8v5LuK5pel5bey6aKG5Y+W5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0UmV3YXJkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5Eb3VibGVcIjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jYW5HZXRCb251cygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmpyeXFkXCIpKTsvL+S7iuaXpeW3sumihuWPluWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3lj4zlgI3nrb7liLAt5pKt5pS+XCIpXHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oud2F0Y2hBRCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeWPjOWAjeetvuWIsC3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRSZXdhcmQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeWPjOWAjeetvuWIsC3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkJ0bkNsb3NlXCI6IHtcclxuICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVNpZ25QYW5lbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRSZXdhcmQoZG91YmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGRvdWJsZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyDkuIrmiqUg5pmu6YCa562+5YiwXHJcbiAgICAgICAgICAgIHV0aWxzLnVtYUV2ZW50KFwiZ2FtZXNpZ25vcmRpbmFyeVwiKTtcclxuICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi562+5YiwLeaZrumAmlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuIrmiqUg5Y+M5YCN562+5YiwXHJcbiAgICAgICAgICAgIHV0aWxzLnVtYUV2ZW50KFwiZ2FtZWRvdWJsZXNpZ25cIik7XHJcbiAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuetvuWIsC3lj4zlgI1cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDnrb7liLDntKLlvJVcclxuICAgICAgICBsZXQgbGFzdERheUluZGV4OiBudW1iZXIgPSBjb2Nvc3ouZGF0YU1nci5MYXN0RGFpbHlCb251c0luZGV4O1xyXG4gICAgICAgIGlmIChsYXN0RGF5SW5kZXggPT0gNikge1xyXG4gICAgICAgICAgICBsYXN0RGF5SW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1ckRheUluZGV4ID0gbGFzdERheUluZGV4ICsgMTtcclxuICAgICAgICAvLyDlpZblirHmlbDph49cclxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IFJFV0FSRF9TSUdOW2N1ckRheUluZGV4XTtcclxuICAgICAgICBpZiAoZG91YmxlKSB7IGNvdW50ICo9IDI7IH1cclxuICAgICAgICBpZiAoY3VyRGF5SW5kZXggPT0gMyB8fCBjdXJEYXlJbmRleCA9PSA2KSB7XHJcbiAgICAgICAgICAgIC8vIOmSu+efs1xyXG4gICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cuZ3hoZHpzXCIpICsgY291bnQpO1xyXG4gICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5EaWFtb25kQ291bnQgKz0gY291bnQ7XHJcbiAgICAgICAgICAgIC8vIOmjnumHkeW4geS6i+S7tlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9GbHlfQ29pbiwgaWNvbk5hbWU6ICdkaWFtb25kJywgZnJhbWVOb2RlTmFtZTogJ0NvaW5MYWJlbDInIH0pXHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g6YeR5biBXHJcbiAgICAgICAgICAgIE1zZy5TaG93KGkxOG4udChcIm1zZy5neGhkamJcIikgKyBjb3VudCk7XHJcbiAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkNvaW5Db3VudCArPSBjb3VudDtcclxuICAgICAgICAgICAgLy8g6aOe6YeR5biB5LqL5Lu2XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX0ZseV9Db2luLCBpY29uTmFtZTogJ2NvaW4nLCBmcmFtZU5vZGVOYW1lOiAnQ29pbkxhYmVsJyB9KVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmnKzlnLDkv6Hmga9cclxuICAgICAgICBjb2Nvc3ouZGF0YU1nci5MYXN0RGFpbHlCb251c0luZGV4ID0gY3VyRGF5SW5kZXg7XHJcbiAgICAgICAgY29jb3N6LmRhdGFNZ3IuTGFzdERhaWx5Qm9udXNUaW1lID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICAvLyDliLfmlrBVSVxyXG4gICAgICAgIC8vIHRoaXMuX3VwZGF0ZURheUl0ZW0oKTtcclxuICAgICAgICAvLyDlhbPpl63lvLnnqpdcclxuICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlTaWduUGFuZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhbkdldEJvbnVzKCkge1xyXG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSAhPSBjb2Nvc3ouZGF0YU1nci5MYXN0RGFpbHlCb251c1RpbWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=