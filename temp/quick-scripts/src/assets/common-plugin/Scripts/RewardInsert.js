"use strict";
cc._RF.push(module, '7087bM2rPJIqI5a6FekvQ2X', 'RewardInsert');
// common-plugin/Scripts/RewardInsert.ts

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
var AldUtils_1 = require("./AldUtils");
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 激励插屏
 */
var RewardInsert = /** @class */ (function (_super) {
    __extends(RewardInsert, _super);
    function RewardInsert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._jumpList = null;
        _this._items = [];
        _this.isShow = false;
        _this._panel = null;
        _this._mask = null;
        return _this;
    }
    RewardInsert.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        this._mask = this.node.getChildByName("Mask");
        this._panel = this.node.getChildByName("Panel");
        for (var i = 0; i < 6; i++) {
            var item = this._panel.getChildByName("Item" + i);
            var qcrossWidgetItem = item.getComponent("QCrossWidgetItem");
            qcrossWidgetItem._location = YZ_Constant_1.SubLocation.isReward;
            this._items.push(qcrossWidgetItem);
        }
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
    };
    RewardInsert.prototype.start = function () {
        this._jumpList = Utils_1.utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        }
        else {
            cc.warn("交叉推广数据为null,激励插屏组件不显示!");
            Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(false, "激励组件加载失败！");
            Utils_1.utils.adManager.videoCallBack = null;
            this.node.destroy();
        }
    };
    RewardInsert.prototype._initWidget = function () {
        var idx = 0;
        for (var i = 0; i < this._jumpList.length; i++) {
            var data = this._jumpList[i];
            if (data && data.logo) {
                var itemIdx = idx;
                if (itemIdx >= this._items.length) {
                    return;
                }
                idx++;
                this._items[itemIdx].init(data);
            }
        }
    };
    RewardInsert.prototype.hide = function () {
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        this._panel.active = false;
        this._mask.active = false;
        // })));
    };
    RewardInsert.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
        Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(false, "未点击试玩奖励！");
        Utils_1.utils.adManager.videoCallBack = null;
    };
    RewardInsert.prototype.update = function (dt) {
        if (!this.isShow) {
            Utils_1.utils.showLog("show insertReward>>>>>");
            AldUtils_1.default.SendEvent("显示激励插屏");
            this.isShow = true;
            this._panel.active = true;
            this._mask.active = true;
        }
    };
    RewardInsert = __decorate([
        ccclass
    ], RewardInsert);
    return RewardInsert;
}(cc.Component));
exports.default = RewardInsert;

cc._RF.pop();