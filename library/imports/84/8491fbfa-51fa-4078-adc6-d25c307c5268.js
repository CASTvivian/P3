"use strict";
cc._RF.push(module, '8491fv6UfpAeK3G0lwwfFJo', 'YZ_ShortcutWidget');
// common-plugin/Scripts/YZ_ShortcutWidget.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_ShortcutWidget = /** @class */ (function (_super) {
    __extends(YZ_ShortcutWidget, _super);
    function YZ_ShortcutWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._handImg = null;
        _this._callback = null;
        return _this;
    }
    Object.defineProperty(YZ_ShortcutWidget.prototype, "Callback", {
        set: function (value) {
            this._callback = value;
        },
        enumerable: false,
        configurable: true
    });
    YZ_ShortcutWidget.prototype.onLoad = function () {
        this._panel = this.node.getChildByName("Panel");
        this._panel.active = false;
        this._handImg = cc.find("Panel/handImg", this.node);
        this._handImg.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, CompatibleTool_1.default.position(0, -50)), cc.moveBy(0.5, CompatibleTool_1.default.position(0, 50)))));
    };
    YZ_ShortcutWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            if (!Utils_1.utils.isShowCreateShortcutWidget()) {
                _this.node.destroy();
            }
            else {
                _this._panel.active = true;
            }
        }, this);
    };
    YZ_ShortcutWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    YZ_ShortcutWidget.prototype.onBtnClickHandler = function (event, data) {
        var _this = this;
        switch (event.target.name) {
            case "Btn_Shortcut": {
                if (Utils_1.utils.canCreateShortcut()) {
                    Utils_1.utils.createShortcut(function (ret) {
                        if (ret) {
                            Utils_1.utils.showLog("快捷方式创建成功！");
                            if (_this._callback) {
                                _this._callback(true);
                            }
                        }
                        else {
                            Utils_1.utils.showLog("快捷方式创建失败！");
                            if (_this._callback) {
                                _this._callback(false);
                            }
                        }
                    });
                }
                break;
            }
        }
    };
    YZ_ShortcutWidget = __decorate([
        ccclass
    ], YZ_ShortcutWidget);
    return YZ_ShortcutWidget;
}(cc.Component));
exports.default = YZ_ShortcutWidget;

cc._RF.pop();