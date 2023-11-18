"use strict";
cc._RF.push(module, '946b7F+eyBGEbvsWerWCHnf', 'RewardRedBagPanel');
// common-plugin/Scripts/RewardRedBagPanel.ts

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
var RewardRedBagPanel = /** @class */ (function (_super) {
    __extends(RewardRedBagPanel, _super);
    function RewardRedBagPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        return _this;
    }
    // _location: SubLocation = SubLocation.isMoreGame;
    RewardRedBagPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this.init();
    };
    RewardRedBagPanel.prototype.openRedBag = function () {
        Utils_1.utils.SendEvent("恭喜获得红包弹窗-点击领取红包！");
        Utils_1.utils.showOpenRedBagPanel({ showType: 2 });
        this.hide();
    };
    RewardRedBagPanel.prototype.init = function () {
        Utils_1.utils.SendEvent("恭喜获得红包弹窗-展示成功！");
    };
    RewardRedBagPanel.prototype.hide = function () {
        this.node.active = false;
    };
    RewardRedBagPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    RewardRedBagPanel = __decorate([
        ccclass
    ], RewardRedBagPanel);
    return RewardRedBagPanel;
}(cc.Component));
exports.default = RewardRedBagPanel;

cc._RF.pop();