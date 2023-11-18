"use strict";
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