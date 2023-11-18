"use strict";
cc._RF.push(module, '77194e5qe5JZbqo4fZbTk+i', 'ShareRecordPanel');
// common-plugin/Scripts/ShareRecordPanel.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 分享录屏面板
 */
var ShareRecordPanel = /** @class */ (function (_super) {
    __extends(ShareRecordPanel, _super);
    function ShareRecordPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.btnOk = null;
        _this.btnCancel = null;
        _this.glodNode = null;
        _this.glodLabel = null;
        _this.sharePanel = null;
        _this.RecPanel = null;
        _this._panel = null;
        _this._gameList = null;
        _this._originScale = 1;
        _this._gameItems = [];
        _this._jumpList = null;
        _this._dataDirty = false;
        _this._star = null;
        _this.gameItemNode = null;
        /**
         * 奖励回调
         */
        _this.rewardCallFunc = null;
        /**
         * 奖励值
         */
        _this.rewardValue = 0;
        return _this;
        // update (dt) {}
    }
    ShareRecordPanel.prototype.onLoad = function () {
        Utils_1.utils.SendEvent("结算前广告-分享弹窗-展示成功！");
        this.rewardValue = Utils_1.utils.rewardValue;
        this.rewardCallFunc = Utils_1.utils.rewardCallFunc;
        this.initUi();
        if (cc.winSize.height < cc.winSize.width) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        }
        else {
            Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
        }
        if (PlatUtils_1.default.IsOPPO) {
            if (Utils_1.utils.ServerConfig.st_recomment_is_hide_banner && Utils_1.utils.ServerConfig.st_recomment_is_hide_banner == "true") {
                Utils_1.utils.showLog("服务器配置显示互推后隐藏banner >>>");
                Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
                Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Over);
            }
        }
    };
    /**
     * 初始化UI
     */
    ShareRecordPanel.prototype.initUi = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this.bg = this.node.getChildByName("Bg");
        this.sharePanel = this.bg.getChildByName("SharePanel");
        this.RecPanel = this.bg.getChildByName("RecPanel");
        if (!PlatUtils_1.default.IsOPPO) {
            this.sharePanel.active = true;
            this.RecPanel.active = false;
            this.btnCancel = this.sharePanel.getChildByName("btnCancel");
            this.btnOk = this.sharePanel.getChildByName("btnOk");
            this.glodNode = this.sharePanel.getChildByName("rewardNode");
            this.glodLabel = this.glodNode.getChildByName("goldLbl").getComponent(cc.Label);
            Utils_1.utils.showSkipBtn(this.btnCancel);
            this.glodLabel.string = "/" + this.rewardValue;
            if (this.rewardValue == 0) {
                this.glodNode.active = false;
            }
        }
        else {
            this.sharePanel.active = false;
            this.RecPanel.active = true;
            this.btnCancel = this.RecPanel.getChildByName("btnCancel");
            this._gameList = this.RecPanel.getChildByName("PageView").getComponent(cc.PageView).content.getChildByName("Panel");
            this.gameItemNode = this._gameList.children[0];
            this._initRecPanel();
            Utils_1.utils.showSkipBtn(this.btnCancel);
        }
    };
    ShareRecordPanel.prototype._initRecPanel = function () {
        this._gameList.removeAllChildren();
        this._jumpList = Utils_1.utils.getRecommondGameList();
        for (var i = 0; i < this._jumpList.length; i++) {
            var data = this._jumpList[i];
            if (data && data.logo) {
                var tempNode = cc.instantiate(this.gameItemNode);
                var qcrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = YZ_Constant_1.SubLocation.isMoreGame;
                qcrossWidgetItem.init(data);
                this._gameList.addChild(tempNode);
            }
        }
    };
    ShareRecordPanel.prototype.onDestroy = function () {
        Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        if (Utils_1.utils.shareRecordPanelCloseFunc) {
            Utils_1.utils.shareRecordPanelCloseFunc();
            Utils_1.utils.shareRecordPanelCloseFunc = null;
            ;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    ShareRecordPanel.prototype.onClose = function () {
        var _this = this;
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
            _this.node.destroy();
        })));
    };
    ShareRecordPanel.prototype.onEnable = function () {
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
            if (_this.glodNode && _this.glodNode.active == true) {
                _this.glodNode.runAction(cc.sequence(cc.moveBy(0.3, CompatibleTool_1.default.position(0, +50)), cc.moveBy(0.3, CompatibleTool_1.default.position(0, -50))).repeatForever());
            }
        })));
    };
    // /**
    // * 初始化事件回调
    // * @param closeCallFunc 
    // * @param rewardCallFunc 
    // */
    // init(closeCallFunc: Function, rewardCallFunc: Function, reward: number) {
    //     this.closeCallFunc = closeCallFunc;
    //     this.rewardCallFunc = rewardCallFunc;
    //     this.rewardValue = reward;
    // }
    ShareRecordPanel.prototype.onCancelClickListener = function () {
        if (PlatUtils_1.default.IsDouyin && Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.cancel_btn_is_share && Utils_1.utils.ServerConfig.cancel_btn_is_share == "true") {
            Utils_1.utils.showLog("服务器配置取消按钮也会触发分享！");
            Utils_1.utils.share(this.rewardFunc.bind(this));
        }
        else {
            this.onClose();
        }
    };
    ShareRecordPanel.prototype.onOkBtnClickListener = function () {
        Utils_1.utils.share(this.rewardFunc.bind(this));
    };
    // /**
    //  * 初始化监听事件
    //  */
    // protected initListener(): void {
    //     console.log("this.btnCancel", this.btnCancel);
    //     this.btnCancel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
    //         this.btnCancel.runAction(cc.sequence(cc.scaleTo(0.1, 0.85), cc.scaleTo(0.1, 1), cc.callFunc(() => {
    //             // if (utils.Tool_Douyin) {
    //             if (PlatUtils.IsDouyin && utils.ServerConfig && utils.ServerConfig.cancel_btn_is_share && utils.ServerConfig.cancel_btn_is_share == "true") {
    //                 utils.showLog("服务器配置取消按钮也会触发分享！");
    //                 utils.share(this.rewardFunc.bind(this));
    //             } else {
    //                 this.onClose();
    //             }
    //             // }
    //         })));
    //     });
    //     this.btnOk && this.btnOk.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
    //         this.btnOk.runAction(cc.sequence(cc.scaleTo(0.1, 0.85), cc.scaleTo(0.1, 1), cc.callFunc(() => {
    //             utils.share(this.rewardFunc.bind(this));
    //         })));
    //     })
    // }
    /**
     * 分享回调
     * @param ret
     * @param msg
     */
    ShareRecordPanel.prototype.rewardFunc = function (ret, msg) {
        if (ret) {
            Utils_1.utils.SendEvent("结算前广告-分享弹窗-分享成功！");
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = this.rewardValue;
            Utils_1.utils.showMsg("分享成功！奖励：+" + this.rewardValue);
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        }
        else {
            Utils_1.utils.SendEvent("结算前广告-分享弹窗-分享失败！");
            Utils_1.utils.showMsg(msg ? msg : "分享失败！");
            this.onClose();
        }
    };
    /**
     * 初始化数据
     */
    ShareRecordPanel.prototype.initData = function () {
    };
    ShareRecordPanel = __decorate([
        ccclass
    ], ShareRecordPanel);
    return ShareRecordPanel;
}(cc.Component));
exports.default = ShareRecordPanel;

cc._RF.pop();