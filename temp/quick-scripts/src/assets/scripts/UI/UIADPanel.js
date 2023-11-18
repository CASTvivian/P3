"use strict";
cc._RF.push(module, '003c2RLzLtIya/ty0NNYWCD', 'UIADPanel');
// scripts/UI/UIADPanel.ts

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
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var CocosZ_1 = require("../Framework/CocosZ");
var Msg_1 = require("../Framework/Msg");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnAD = null;
        _this.btnSkip = null;
        _this.isDiamond = false;
        return _this;
    }
    NewClass.prototype.start = function () {
        if (CocosZ_1.cocosz.isADON) {
            this.node.scale = 0;
            cc.tween(this.node).to(0.3, { scale: 1 }, { easing: "backOut" }).start();
            Utils_1.utils.SendEvent("页面-" + (this.isDiamond ? "钻石" : "金币"));
        }
        else {
            this.node.destroy();
        }
    };
    NewClass.prototype.setDiamond = function () {
        this.isDiamond = true;
        this.node.getChildByName("bg").active = false;
        this.node.getChildByName("bg1").active = true;
    };
    NewClass.prototype.watchAD = function () {
        var _this = this;
        Utils_1.utils.SendEvent("\u89C6\u9891-" + (this.isDiamond ? "钻石购买" : "金币购买") + "-\u64AD\u653E");
        CocosZ_1.cocosz.watchAD(function () {
            Utils_1.utils.SendEvent("\u89C6\u9891-" + (_this.isDiamond ? "钻石购买" : "金币购买") + "-\u6210\u529F");
            if (_this.isDiamond) {
                var num = CocosZ_1.cocosz.isDeBug ? 10000 : 200;
                CocosZ_1.cocosz.dataMgr.DiamondCount += num;
                Msg_1.default.Show(i18n.t("msg.gxhdzs") + num); //恭喜获得钻石
            }
            else {
                var num = CocosZ_1.cocosz.isDeBug ? 10000 : 500;
                CocosZ_1.cocosz.dataMgr.CoinCount += num;
                Msg_1.default.Show(i18n.t("msg.gxhdjb") + num); //恭喜获得金币
            }
            _this.node.destroy();
        }, function () {
            Utils_1.utils.SendEvent("\u89C6\u9891-" + (_this.isDiamond ? "钻石购买" : "金币购买") + "-\u5931\u8D25");
        });
    };
    NewClass.prototype.exit = function () {
        CocosZ_1.cocosz.audioMgr.playBtnEffect();
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnAD", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnSkip", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();