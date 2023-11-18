"use strict";
cc._RF.push(module, '08619NRFCNJ1ZrMhE5AcumI', 'RedBagProgressWidget');
// common-plugin/Scripts/RedBagProgressWidget.ts

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
var RedBagProgressWidget = /** @class */ (function (_super) {
    __extends(RedBagProgressWidget, _super);
    function RedBagProgressWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._redBagProgressNode = null;
        _this._isInit = false;
        _this._data = null;
        return _this;
    }
    RedBagProgressWidget.prototype.onLoad = function () {
        this._redBagProgressNode = this.getComponentInChildren("RedBagProgressNode");
        this._redBagProgressNode.node.active = false;
    };
    RedBagProgressWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    RedBagProgressWidget.prototype.init = function (data) {
        this._data = data;
    };
    RedBagProgressWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    RedBagProgressWidget.prototype._initWidget = function () {
        this._redBagProgressNode._location = this._data ? this._data.location : "default";
        this._redBagProgressNode.node.active = true;
    };
    RedBagProgressWidget = __decorate([
        ccclass
    ], RedBagProgressWidget);
    return RedBagProgressWidget;
}(cc.Component));
exports.default = RedBagProgressWidget;

cc._RF.pop();