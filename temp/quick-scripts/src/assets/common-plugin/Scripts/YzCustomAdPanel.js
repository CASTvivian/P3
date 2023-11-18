"use strict";
cc._RF.push(module, '3913b/5d+JET5bTvhP+7Ou3', 'YzCustomAdPanel');
// common-plugin/Scripts/YzCustomAdPanel.ts

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
var YzCustomAdPanel = /** @class */ (function (_super) {
    __extends(YzCustomAdPanel, _super);
    function YzCustomAdPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exitBtn = null;
        _this.closeCallFunc = null;
        //关闭按钮点击次数
        _this.closeCount = 1;
        _this.closeBtnClickCount = 0;
        return _this;
    }
    YzCustomAdPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        Utils_1.utils.adManager.showCustomAd({ location: 100 });
        var ratio = 0;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.75;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        if (Utils_1.utils.getConfigByKey("custom_panel_close_count")) {
            this.closeCount = Utils_1.utils.getConfigByKey("custom_panel_close_count");
        }
        cc.find("Panel", this.node).scale = ratio;
        this.exitBtn.runAction(cc.fadeIn(3));
    };
    YzCustomAdPanel.prototype.onExitBtnClickListener = function () {
        Utils_1.utils.showLog("退出游戏模版弹窗！");
        this.closeBtnClickCount++;
        if (this.closeCount == this.closeBtnClickCount) {
            cc.director.emit("CloseCustomADPanel");
            this.node.destroy();
            Utils_1.utils.adManager.hideCustomAd({ location: 100 });
            this.closeCallFunc && this.closeCallFunc();
        }
    };
    __decorate([
        property({ type: cc.Node })
    ], YzCustomAdPanel.prototype, "exitBtn", void 0);
    YzCustomAdPanel = __decorate([
        ccclass
    ], YzCustomAdPanel);
    return YzCustomAdPanel;
}(cc.Component));
exports.default = YzCustomAdPanel;

cc._RF.pop();