"use strict";
cc._RF.push(module, '54f94n1JbRKZpvYKlOs4T8g', 'RewardShortCutPanel');
// common-plugin/Scripts/RewardShortCutPanel.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 分享录屏面板
 */
var RewardShortCutPanel = /** @class */ (function (_super) {
    __extends(RewardShortCutPanel, _super);
    function RewardShortCutPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.btnOk = null;
        _this.btnCancel = null;
        _this.glodNode = null;
        _this.glodLabel = null;
        /**
         * 奖励回调
         */
        _this.rewardCallFunc = null;
        /**
         * 奖励值
         */
        _this.rewardValue = 0;
        _this._showBanner = false;
        return _this;
        // update (dt) {}
    }
    RewardShortCutPanel.prototype.onLoad = function () {
        Utils_1.utils.SendEvent("结算前广告-创建快捷桌面-展示成功！");
        var shortcutCreated = false;
        if (PlatUtils_1.default.IsOPPO) {
            shortcutCreated = Utils_1.utils.oppoTool._shortcutCreated;
        }
        else if (PlatUtils_1.default.IsVIVO) {
            shortcutCreated = Utils_1.utils.Tool_Vivo._shortcutCreated;
        }
        if (shortcutCreated) {
            Utils_1.utils.showLog("已经存在桌面快捷方式，当前窗口直接销毁！");
            Utils_1.utils.SendEvent("结算前广告-创建快捷桌面-已经存在桌面快捷方式！");
            this.node.destroy();
            return;
        }
        // cc.log(`utils.ServerConfig.auto_desktop>${utils.ServerConfig.auto_desktop === 0},${utils.ServerConfig.auto_desktop == 0}<`);
        if (Utils_1.utils.ServerConfig.auto_desktop != undefined && Utils_1.utils.ServerConfig.auto_desktop === 0) {
            Utils_1.utils.showLog("服务器配置直接创建桌面，不显示弹窗，当前窗口直接销毁！");
            Utils_1.utils.SendEvent("结算前广告-创建快捷桌面-服务器配置直接创建桌面，不显示弹窗！");
            Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.createShortcut && Utils_1.utils.cur_tool.createShortcut(function (res) {
                Utils_1.utils.SendEvent("结算前广告-直接创建快捷桌面-创建成功！");
            });
            this.node.destroy();
            return;
        }
        this.rewardValue = Utils_1.utils.rewardValue;
        this.rewardCallFunc = Utils_1.utils.rewardCallFunc;
        this.initUi();
        this.initListener();
        if (cc.winSize.height < cc.winSize.width) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        }
        else {
            this._showBanner = true;
            Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
        }
    };
    /**
     * 初始化UI
     */
    RewardShortCutPanel.prototype.initUi = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this.bg = this.node.getChildByName("Panel").children[0];
        this.btnCancel = this.bg.getChildByName("btnClose");
        this.btnOk = this.bg.getChildByName("btnOk");
        this.glodNode = this.bg.getChildByName("rewardLabel");
        this.glodLabel = this.glodNode.getComponent(cc.Label);
        this.glodLabel.string = "奖励+" + this.rewardValue;
        if (this.rewardValue == 0) {
            this.glodNode.active = false;
        }
        Utils_1.utils.showSkipBtn(this.btnCancel);
    };
    RewardShortCutPanel.prototype.onDestroy = function () {
        this._showBanner && Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        if (Utils_1.utils.rewardShortCutPanelCloseFunc) {
            Utils_1.utils.rewardShortCutPanelCloseFunc();
            Utils_1.utils.rewardShortCutPanelCloseFunc = null;
            ;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
        Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.checkHasShortCut && Utils_1.utils.cur_tool.checkHasShortCut();
    };
    RewardShortCutPanel.prototype.onClose = function () {
        var _this = this;
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
            _this.node.destroy();
        })));
    };
    RewardShortCutPanel.prototype.onEnable = function () {
        var _this = this;
        this.bg.scale = 0;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()), cc.callFunc(function () {
            _this.btnOk.runAction(cc.sequence(cc.scaleTo(0.5, 1.15), cc.scaleTo(0.5, 1)).repeatForever());
        })));
    };
    RewardShortCutPanel.prototype.onCreateShortCut = function () {
        var _this = this;
        if (PlatUtils_1.default.IsOPPO) {
            Utils_1.utils.oppoTool.createShortcut(function (res) {
                Utils_1.utils.SendEvent("结算前广告-创建快捷桌面-创建成功！");
                _this.rewardFunc(res);
            });
        }
        else if (PlatUtils_1.default.IsVIVO) {
            Utils_1.utils.Tool_Vivo.createShortcut(function (res) {
                Utils_1.utils.SendEvent("结算前广告-创建快捷桌面-创建成功！");
                _this.rewardFunc(res);
            });
        }
    };
    /**
     * 初始化监听事件
     */
    RewardShortCutPanel.prototype.initListener = function () {
    };
    /**
     * 分享回调
     * @param ret
     * @param msg
     */
    RewardShortCutPanel.prototype.rewardFunc = function (ret) {
        if (ret) {
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = this.rewardValue;
            Utils_1.utils.showMsg("添加成功！奖励：+" + this.rewardValue);
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        }
        else {
            Utils_1.utils.showMsg("添加失败！");
            this.onClose();
        }
    };
    /**
     * 初始化数据
     */
    RewardShortCutPanel.prototype.initData = function () {
    };
    RewardShortCutPanel = __decorate([
        ccclass
    ], RewardShortCutPanel);
    return RewardShortCutPanel;
}(cc.Component));
exports.default = RewardShortCutPanel;

cc._RF.pop();