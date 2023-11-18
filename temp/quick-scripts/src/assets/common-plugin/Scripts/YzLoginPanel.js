"use strict";
cc._RF.push(module, '8cae4S0CzlIDZZOb48XMdWd', 'YzLoginPanel');
// common-plugin/Scripts/YzLoginPanel.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YzLoginPanel = /** @class */ (function (_super) {
    __extends(YzLoginPanel, _super);
    function YzLoginPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ratio = 1;
        _this.okBtn = null;
        _this.successFunc = null;
        _this.failFunc = null;
        return _this;
        // update (dt) {}
    }
    YzLoginPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        var panel = cc.find("Panel", this.node);
        this.okBtn = cc.find("OKBtn", panel);
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;
        }
        else {
            this.ratio = cc.winSize.width / 1080;
        }
        cc.find("Panel", this.node).scale = this.ratio;
    };
    YzLoginPanel.prototype.onDestroy = function () {
        cc.game.targetOff(this);
    };
    YzLoginPanel.prototype.onOKClickListener = function () {
        var _this = this;
        this.okBtn.getComponent(cc.Button).interactable = false;
        var successFunc = function () {
            Utils_1.utils.showLog("登录成功！");
            _this.successFunc && _this.successFunc();
            _this.node.destroy();
        };
        var failFunc = function (result) {
            _this.failFunc && _this.failFunc();
            _this.okBtn.getComponent(cc.Button).interactable = true;
            // utils.showMsg("登录失败，请重试");
        };
        cc.game.targetOff(this);
        cc.game.on(YZ_Constant_1.default.ST_LOGIN_SUCCESS, successFunc, this);
        cc.game.on(YZ_Constant_1.default.ST_LOGIN_FAIL, failFunc, this);
        Utils_1.utils.login(null, null);
    };
    YzLoginPanel.prototype.onCloseClickListener = function () {
        Utils_1.utils.GameExit();
    };
    YzLoginPanel = __decorate([
        ccclass
    ], YzLoginPanel);
    return YzLoginPanel;
}(cc.Component));
exports.default = YzLoginPanel;

cc._RF.pop();