"use strict";
cc._RF.push(module, '44f5bUS0vVOsr9VFcezUfsI', 'TryGamesWidget');
// common-plugin/Scripts/TryGamesWidget.ts

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
var TryGamesWidget = /** @class */ (function (_super) {
    __extends(TryGamesWidget, _super);
    function TryGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tryGameNode = null;
        _this._isInit = false;
        return _this;
    }
    TryGamesWidget.prototype.onLoad = function () {
        this._tryGameNode = this.getComponentInChildren("TryGameNode");
        this._tryGameNode.node.active = false;
    };
    TryGamesWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    TryGamesWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    TryGamesWidget.prototype._initWidget = function () {
        if (this._isInit)
            return;
        var dataValid = true;
        var data = Utils_1.utils.getInnerRecommendData();
        if (data) {
            if (data.jump_list) {
                if (data.jump_list.length <= 0) {
                    cc.warn("字段jump_list的长度不合法！");
                    dataValid = false;
                }
            }
            else {
                cc.warn("字段jump_list不存在！");
                dataValid = false;
            }
        }
        else {
            cc.warn("交叉推广数据为null");
            dataValid = false;
        }
        if (dataValid) {
            this._isInit = true;
            Utils_1.utils.showLog("交叉推广数据:", JSON.stringify(data));
            this._tryGameNode.init({ "jump_refresh_time": data.jump_refresh_time, "jump_list": data.jump_list });
            this._tryGameNode.node.active = true;
        }
        else {
            this.node.destroy();
        }
    };
    TryGamesWidget = __decorate([
        ccclass
    ], TryGamesWidget);
    return TryGamesWidget;
}(cc.Component));
exports.default = TryGamesWidget;

cc._RF.pop();