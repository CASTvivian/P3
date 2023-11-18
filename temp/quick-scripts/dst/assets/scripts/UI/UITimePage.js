
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UITimePage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ae23P5tJRKurJ80XOjhemY', 'UITimePage');
// scripts/UI/UITimePage.ts

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
var gameDate_1 = require("../Game/gameDate");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemTime = /** @class */ (function () {
    function ItemTime(i, n) {
        this._id = 0;
        this._node = null;
        this._txt_zxsc = null;
        this._txt_ylq = null;
        this._btn = null;
        this._label_coin = null;
        this._label_diamond = null;
        this._label_time = null;
        this._id = i;
        this._node = n;
        this._info = gameDate_1.default.TimeReward[i];
        this._txt_zxsc = this._node.getChildByName("txt_zxsc");
        this._txt_ylq = this._node.getChildByName("txt_ylq");
        this._btn = this._node.getChildByName("btn");
        this._btn.on(cc.Node.EventType.TOUCH_END, this.click, this);
        this._label_coin = this._node.getChildByName("label_coin").getComponent(cc.Label);
        this._label_coin.string = this._info.coinNum + "";
        this._label_diamond = this._node.getChildByName("label_diamond").getComponent(cc.Label);
        this._label_diamond.string = this._info.diamondNum + "";
        this._label_time = this._node.getChildByName("label_time").getComponent(cc.Label);
        this._label_time.string = CocosZ_1.cocosz.StoHMS(this._info.time);
    }
    ItemTime.prototype.click = function () {
        // 领取奖励
        var arrRecieve = CocosZ_1.cocosz.dataMgr.receiveToday;
        if (arrRecieve[this._id] == 0) {
            CocosZ_1.cocosz.audioMgr.playBtnEffect();
            arrRecieve[this._id] = 1;
            CocosZ_1.cocosz.dataMgr.receiveToday = arrRecieve;
            this.update();
            CocosZ_1.cocosz.dataMgr.CoinCount += this._info.coinNum;
            CocosZ_1.cocosz.dataMgr.DiamondCount += this._info.diamondNum;
        }
    };
    ItemTime.prototype.update = function () {
        // 时间达到
        if (CocosZ_1.cocosz.dataMgr.OnlineToday >= this._info.time) {
            var arrRecieve = CocosZ_1.cocosz.dataMgr.receiveToday;
            // 已领取
            if (arrRecieve[this._id]) {
                this._btn.active = this._txt_zxsc.active = this._label_time.node.active = false;
                this._txt_ylq.active = true;
            }
            // 待领取
            else {
                this._txt_ylq.active = this._txt_zxsc.active = this._label_time.node.active = false;
                this._btn.active = true;
            }
        }
        // 时间未达到
        else {
            this._txt_ylq.active = this._btn.active = false;
            this._txt_zxsc.active = this._label_time.node.active = true;
        }
    };
    return ItemTime;
}());
/**
 * 皮肤试用面板
 */
var UITimePanel = /** @class */ (function (_super) {
    __extends(UITimePanel, _super);
    function UITimePanel() {
        var _this = _super.call(this, Constant_1.PanelName.UITimePanel) || this;
        _this.mask = null;
        _this.panel = null;
        _this.label_online = null;
        _this.itemList = [];
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UITimePanel.prototype.onLoad = function () {
        this.mask = this._page.getChildByName("mask");
        this.panel = this._page.getChildByName("panel");
        // 按钮
        var btnNames = ["BtnBack"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = cc.find(btnNames[i], this.panel);
            if (btn) {
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            }
        }
        // 在线时间
        this.label_online = this.panel.getChildByName("label_online").getComponent(cc.Label);
    };
    UITimePanel.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-在线奖励");
        this._initPanel();
    };
    UITimePanel.prototype.onClose = function () { };
    UITimePanel.prototype._initPanel = function () {
        var _this = this;
        TweenEffect_1.default.panel_mask_opacity(this.mask);
        TweenEffect_1.default.panel_open_moveY(this.panel);
        // 列表
        for (var i = 0; i < 5; i++) {
            var n = this.panel.getChildByName("item" + i);
            if (n) {
                var item = new ItemTime(i, n);
                this.itemList.push(item);
            }
        }
        cc.tween(this._page)
            .call(function () { _this.updateTime(); })
            .delay(1)
            .union()
            .repeatForever()
            .start();
    };
    UITimePanel.prototype.updateTime = function () {
        // 显示在线时间
        this.label_online.string = CocosZ_1.cocosz.StoHMS(CocosZ_1.cocosz.dataMgr.OnlineToday);
        // 更新列表
        this.itemList.forEach(function (v) {
            v.update();
        });
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UITimePanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                CocosZ_1.cocosz.audioMgr.playBtnEffect();
                switch (event.target.name) {
                    case "BtnBack": {
                        TweenEffect_1.default.panel_close_moveY(this.panel, function () {
                            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UITimePanel);
                        });
                        break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    UITimePanel = __decorate([
        ccclass
    ], UITimePanel);
    return UITimePanel;
}(UIPage_1.default));
exports.default = UITimePanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJVGltZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLGtEQUFrRDtBQUNsRCw4Q0FBNkM7QUFDN0MsMkRBQTBEO0FBQzFELHdEQUFtRDtBQUNuRCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFZSSxrQkFBWSxDQUFDLEVBQUUsQ0FBVTtRQVhqQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFB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WUFBWSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckUsT0FBTztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNuQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csMENBQW9CLEdBQWxDLFVBQW1DLEtBQWUsRUFBRSxJQUFTOzs7Z0JBQ3pELGVBQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRWhDLFFBQVEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7b0JBQ3ZCLEtBQUssU0FBUyxDQUFDLENBQUM7d0JBQ1oscUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUN0QyxlQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxvQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNO3FCQUNUO2lCQUNKOzs7O0tBQ0o7SUFsRmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FxRi9CO0lBQUQsa0JBQUM7Q0FyRkQsQUFxRkMsQ0FyRndDLGdCQUFNLEdBcUY5QztrQkFyRm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlQYWdlIGZyb20gXCIuLi9GcmFtZXdvcmsvVUlQYWdlXCI7XHJcbmltcG9ydCB7IFBhbmVsTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCBUd2VlbkVmZmVjdCBmcm9tIFwiLi4vRnJhbWV3b3JrL1R3ZWVuRWZmZWN0XCI7XHJcbmltcG9ydCBHYW1lRGF0ZSBmcm9tIFwiLi4vR2FtZS9nYW1lRGF0ZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNsYXNzIEl0ZW1UaW1lIHtcclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pbmZvOiB7IHRpbWU6IG51bWJlciwgY29pbk51bTogbnVtYmVyLCBkaWFtb25kTnVtOiBudW1iZXIgfTtcclxuXHJcbiAgICBwcml2YXRlIF90eHRfenhzYzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90eHRfeWxxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0bjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sYWJlbF9jb2luOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sYWJlbF9kaWFtb25kOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sYWJlbF90aW1lOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaSwgbjogY2MuTm9kZSkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaTtcclxuICAgICAgICB0aGlzLl9ub2RlID0gbjtcclxuICAgICAgICB0aGlzLl9pbmZvID0gR2FtZURhdGUuVGltZVJld2FyZFtpXTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHh0X3p4c2MgPSB0aGlzLl9ub2RlLmdldENoaWxkQnlOYW1lKFwidHh0X3p4c2NcIik7XHJcbiAgICAgICAgdGhpcy5fdHh0X3lscSA9IHRoaXMuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfeWxxXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0biA9IHRoaXMuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIik7XHJcbiAgICAgICAgdGhpcy5fYnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5jbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbGFiZWxfY29pbiA9IHRoaXMuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fbGFiZWxfY29pbi5zdHJpbmcgPSB0aGlzLl9pbmZvLmNvaW5OdW0gKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2xhYmVsX2RpYW1vbmQgPSB0aGlzLl9ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWxfZGlhbW9uZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX2xhYmVsX2RpYW1vbmQuc3RyaW5nID0gdGhpcy5faW5mby5kaWFtb25kTnVtICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9sYWJlbF90aW1lID0gdGhpcy5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsX3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9sYWJlbF90aW1lLnN0cmluZyA9IGNvY29zei5TdG9ITVModGhpcy5faW5mby50aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGljaygpIHtcclxuICAgICAgICAvLyDpooblj5blpZblirFcclxuICAgICAgICBsZXQgYXJyUmVjaWV2ZSA9IGNvY29zei5kYXRhTWdyLnJlY2VpdmVUb2RheTtcclxuICAgICAgICBpZiAoYXJyUmVjaWV2ZVt0aGlzLl9pZF0gPT0gMCkgeyBcclxuICAgICAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlCdG5FZmZlY3QoKTtcclxuICAgICAgICAgICAgYXJyUmVjaWV2ZVt0aGlzLl9pZF0gPSAxO1xyXG4gICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5yZWNlaXZlVG9kYXkgPSBhcnJSZWNpZXZlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IHRoaXMuX2luZm8uY29pbk51bTtcclxuICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuRGlhbW9uZENvdW50ICs9IHRoaXMuX2luZm8uZGlhbW9uZE51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8vIOaXtumXtOi+vuWIsFxyXG4gICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5PbmxpbmVUb2RheSA+PSB0aGlzLl9pbmZvLnRpbWUpIHtcclxuICAgICAgICAgICAgbGV0IGFyclJlY2lldmUgPSBjb2Nvc3ouZGF0YU1nci5yZWNlaXZlVG9kYXk7XHJcbiAgICAgICAgICAgIC8vIOW3sumihuWPllxyXG4gICAgICAgICAgICBpZiAoYXJyUmVjaWV2ZVt0aGlzLl9pZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J0bi5hY3RpdmUgPSB0aGlzLl90eHRfenhzYy5hY3RpdmUgPSB0aGlzLl9sYWJlbF90aW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90eHRfeWxxLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5b6F6aKG5Y+WXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHh0X3lscS5hY3RpdmUgPSB0aGlzLl90eHRfenhzYy5hY3RpdmUgPSB0aGlzLl9sYWJlbF90aW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDml7bpl7TmnKrovr7liLBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdHh0X3lscS5hY3RpdmUgPSB0aGlzLl9idG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3R4dF96eHNjLmFjdGl2ZSA9IHRoaXMuX2xhYmVsX3RpbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnmq7ogqTor5XnlKjpnaLmnb9cclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGltZVBhbmVsIGV4dGVuZHMgVUlQYWdlIHtcclxuXHJcbiAgICBwcml2YXRlIG1hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBsYWJlbF9vbmxpbmU6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgaXRlbUxpc3Q6IEl0ZW1UaW1lW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQYW5lbE5hbWUuVUlUaW1lUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCgpICYmIHRoaXMub25Mb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1hc2sgPSB0aGlzLl9wYWdlLmdldENoaWxkQnlOYW1lKFwibWFza1wiKTtcclxuICAgICAgICB0aGlzLnBhbmVsID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcInBhbmVsXCIpO1xyXG4gICAgICAgIC8vIOaMiemSrlxyXG4gICAgICAgIGxldCBidG5OYW1lczogc3RyaW5nW10gPSBbXCJCdG5CYWNrXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRuTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ0bjogY2MuTm9kZSA9IGNjLmZpbmQoYnRuTmFtZXNbaV0sIHRoaXMucGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkJ0bkNsaWNrZWRIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlnKjnur/ml7bpl7RcclxuICAgICAgICB0aGlzLmxhYmVsX29ubGluZSA9IHRoaXMucGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbF9vbmxpbmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIumhtemdoi3lnKjnur/lpZblirFcIik7XHJcbiAgICAgICAgdGhpcy5faW5pdFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0UGFuZWwoKSB7XHJcbiAgICAgICAgVHdlZW5FZmZlY3QucGFuZWxfbWFza19vcGFjaXR5KHRoaXMubWFzaylcclxuICAgICAgICBUd2VlbkVmZmVjdC5wYW5lbF9vcGVuX21vdmVZKHRoaXMucGFuZWwpO1xyXG5cclxuICAgICAgICAvLyDliJfooahcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbiA9IHRoaXMucGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIgKyBpKTtcclxuICAgICAgICAgICAgaWYgKG4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IEl0ZW1UaW1lKGksIG4pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYy50d2Vlbih0aGlzLl9wYWdlKVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMudXBkYXRlVGltZSgpOyB9KVxyXG4gICAgICAgICAgICAuZGVsYXkoMSlcclxuICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgIC8vIOaYvuekuuWcqOe6v+aXtumXtFxyXG4gICAgICAgIHRoaXMubGFiZWxfb25saW5lLnN0cmluZyA9IGNvY29zei5TdG9ITVMoY29jb3N6LmRhdGFNZ3IuT25saW5lVG9kYXkpO1xyXG4gICAgICAgIC8vIOabtOaWsOWIl+ihqFxyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICAgICAgdi51cGRhdGUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJgOacieaMiemSrueCueWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50IFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgX29uQnRuQ2xpY2tlZEhhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUJ0bkVmZmVjdCgpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5CYWNrXCI6IHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuRWZmZWN0LnBhbmVsX2Nsb3NlX21vdmVZKHRoaXMucGFuZWwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlUaW1lUGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==