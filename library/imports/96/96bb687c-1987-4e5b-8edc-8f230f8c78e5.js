"use strict";
cc._RF.push(module, '96bb6h8GYdOW47cjyMPjHjl', 'CoinBord');
// scripts/UI/CoinBord.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var Msg_1 = require("../Framework/Msg");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinBord = /** @class */ (function (_super) {
    __extends(CoinBord, _super);
    function CoinBord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._label = null;
        _this._icon = null;
        _this._adBtn = null;
        _this.isDiamond = false;
        return _this;
    }
    CoinBord.prototype.onLoad = function () {
        var _this = this;
        this._label = this.node.getChildByName("Label").getComponent(cc.Label);
        this._icon = this.node.getChildByName("Icon");
        this._adBtn = this.node.getChildByName("BtnAD");
        if (this._adBtn) {
            this._adBtn.on(cc.Node.EventType.TOUCH_END, (function () {
                var node = cc.instantiate(CocosZ_1.cocosz.resMgr.getRes("UIADPanel", cc.Prefab));
                cc.find("Canvas").addChild(node);
                if (_this.isDiamond) {
                    node.getComponent("UIADPanel").setDiamond();
                }
            }));
            this._adBtn.active = CocosZ_1.cocosz.isADON;
        }
    };
    CoinBord.prototype.onEnable = function () {
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        this._updateLabel();
    };
    CoinBord.prototype.onDisable = function () {
        cc.game.targetOff(this);
    };
    CoinBord.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
            case Constant_1.default.E_COIN_CHANGE: {
                this._updateLabel();
                break;
            }
            case Constant_1.default.E_Diamond_CHANGE: {
                this._updateLabel();
                break;
            }
        }
    };
    CoinBord.prototype._updateLabel = function () {
        if (this.isDiamond) {
            this._label.string = CocosZ_1.cocosz.dataMgr.DiamondCount + "";
        }
        else {
            this._label.string = CocosZ_1.cocosz.dataMgr.CoinCount + "";
        }
    };
    /**
     * 获取Icon的世界坐标位置(金币动画飞入使用)
     */
    CoinBord.prototype.getLocation = function () {
        var pos = this._icon.convertToWorldSpaceAR(cc.Vec3.ZERO);
        // let temp = cc.v2(pos.x, cc.winSize.height - 76)
        return pos;
    };
    CoinBord.prototype._addGold = function () {
        CocosZ_1.cocosz.dataMgr.CoinCount += 200;
        Msg_1.default.Show(i18n.t("msg.gxhdjb") + "200"); //恭喜获得金币
    };
    __decorate([
        property
    ], CoinBord.prototype, "isDiamond", void 0);
    CoinBord = __decorate([
        ccclass
    ], CoinBord);
    return CoinBord;
}(cc.Component));
exports.default = CoinBord;

cc._RF.pop();