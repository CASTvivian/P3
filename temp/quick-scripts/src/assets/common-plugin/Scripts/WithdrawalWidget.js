"use strict";
cc._RF.push(module, 'eb1bdqkx91OqbOB6rlUrN5w', 'WithdrawalWidget');
// common-plugin/Scripts/WithdrawalWidget.ts

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
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WithdrawalWidget = /** @class */ (function (_super) {
    __extends(WithdrawalWidget, _super);
    function WithdrawalWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.withdrawalPanel = null;
        _this._withdrawalNode = null;
        _this._isInit = false;
        return _this;
    }
    WithdrawalWidget.prototype.onLoad = function () {
        this._withdrawalNode = this.getComponentInChildren("WithdrawalNode");
        this._withdrawalNode.node.active = false;
    };
    WithdrawalWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    WithdrawalWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    WithdrawalWidget.prototype._initWidget = function () {
        this._withdrawalNode.node.active = true;
        // this._withdrawalNode.init({});
    };
    __decorate([
        property(cc.Prefab)
    ], WithdrawalWidget.prototype, "withdrawalPanel", void 0);
    WithdrawalWidget = __decorate([
        ccclass
    ], WithdrawalWidget);
    return WithdrawalWidget;
}(cc.Component));
exports.default = WithdrawalWidget;

cc._RF.pop();