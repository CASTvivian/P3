"use strict";
cc._RF.push(module, '932f9ROnk9AN7mC5qMygyf7', 'NativeTryGamesWidget');
// common-plugin/Scripts/NativeTryGamesWidget.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NativeTryGamesWidget = /** @class */ (function (_super) {
    __extends(NativeTryGamesWidget, _super);
    function NativeTryGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tryGameNode = null;
        _this._btnClose = null;
        return _this;
    }
    NativeTryGamesWidget.prototype.onLoad = function () {
        this._tryGameNode = this.getComponentInChildren("NativeTryGameNode");
        this._tryGameNode.node.active = false;
        this._btnClose = this._tryGameNode.node.getChildByName("BtnClose");
    };
    NativeTryGamesWidget.prototype.init = function () {
        if (!this._tryGameNode) {
            this._tryGameNode = this.getComponentInChildren("NativeTryGameNode");
            this._btnClose = this._tryGameNode.node.getChildByName("BtnClose");
        }
        if (Utils_1.utils.isShowNativeTryGamesWidget()) {
            var dataValid = true;
            if (Utils_1.utils.tryGameDate) {
                if (Utils_1.utils.tryGameDate.length <= 0) {
                    cc.warn("res的长度不合法！");
                    dataValid = false;
                }
            }
            else {
                cc.warn("res不存在！");
                dataValid = false;
            }
            Utils_1.utils.showLog("原生抖动dataValid：" + dataValid);
            if (dataValid) {
                Utils_1.utils.showLog("交叉推广数据:", JSON.stringify(Utils_1.utils.tryGameDate));
                this._tryGameNode.init({ "jump_refresh_time": Utils_1.utils.ServerConfig.icon_jump_native, "jump_list": Utils_1.utils.tryGameDate });
                this._tryGameNode.node.active = true;
                if (PlatUtils_1.default.IsHuaWei) {
                    Utils_1.utils.showLog("华为平台，显示关闭按钮>>>>>");
                    this._btnClose.active = true;
                }
            }
            else {
                this._tryGameNode.node.active = false;
            }
        }
        else {
            this._tryGameNode.node.active = false;
        }
    };
    NativeTryGamesWidget.prototype.close = function () {
        this._tryGameNode.node.opacity = 0;
    };
    NativeTryGamesWidget = __decorate([
        ccclass
    ], NativeTryGamesWidget);
    return NativeTryGamesWidget;
}(cc.Component));
exports.default = NativeTryGamesWidget;

cc._RF.pop();