
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/ShareRecordPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcU2hhcmVSZWNvcmRQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMsNkNBQXVFO0FBQ3ZFLHlDQUFvQztBQUdwQyxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQTBPQztRQXhPRyxRQUFFLEdBQVksSUFBSSxDQUFDO1FBQ25CLFdBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUl6QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsZ0JBQVUsR0FBZSxFQUFFLENBQUM7UUFDNUIsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUc1QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBQ2Qsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFckM7O1dBRUc7UUFDSCxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNILGlCQUFXLEdBQVcsQ0FBQyxDQUFDOztRQXlNeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUF2TUcsaUNBQU0sR0FBTjtRQUNJLGFBQUssQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQUssQ0FBQyxXQUFX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T0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBR0Q7O09BRUc7SUFDTyxtQ0FBUSxHQUFsQjtJQUVBLENBQUM7SUF2T2dCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBME9wQztJQUFELHVCQUFDO0NBMU9ELEFBME9DLENBMU82QyxFQUFFLENBQUMsU0FBUyxHQTBPekQ7a0JBMU9vQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFlaX1Jld2FyZCwgQmFubmVyTG9jYXRpb24sIFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IEdhbWVJdGVtIGZyb20gXCIuL0dhbWVJdGVtXCI7XHJcbmltcG9ydCBRQ3Jvc3NXaWRnZXRJdGVtIGZyb20gXCIuL1FDcm9zc1dpZGdldEl0ZW1cIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOWIhuS6q+W9leWxj+mdouadv1xyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmVSZWNvcmRQYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgYmc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgYnRuT2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgYnRuQ2FuY2VsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGdsb2ROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGdsb2RMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgc2hhcmVQYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBSZWNQYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAgICBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2dhbWVMaXN0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9vcmlnaW5TY2FsZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICBfZ2FtZUl0ZW1zOiBHYW1lSXRlbVtdID0gW107XHJcbiAgICBfanVtcExpc3Q6IGFueSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuICAgIF9zdGFyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgZ2FtZUl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseWbnuiwg1xyXG4gICAgICovXHJcbiAgICByZXdhcmRDYWxsRnVuYzogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aWW5Yqx5YC8XHJcbiAgICAgKi9cclxuICAgIHJld2FyZFZhbHVlOiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi57uT566X5YmN5bm/5ZGKLeWIhuS6q+W8ueeqly3lsZXnpLrmiJDlip/vvIFcIik7XHJcblxyXG4gICAgICAgIHRoaXMucmV3YXJkVmFsdWUgPSB1dGlscy5yZXdhcmRWYWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyA9IHV0aWxzLnJld2FyZENhbGxGdW5jO1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcblxyXG4gICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLnN0X3JlY29tbWVudF9pc19oaWRlX2Jhbm5lciAmJiB1dGlscy5TZXJ2ZXJDb25maWcuc3RfcmVjb21tZW50X2lzX2hpZGVfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5pi+56S65LqS5o6o5ZCO6ZqQ6JePYmFubmVyID4+PlwiKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoQmFubmVyTG9jYXRpb24uT3Zlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWVUlcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXRVaSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodXRpbHMub3RoZXJDb25maWcgJiYgdXRpbHMub3RoZXJDb25maWcuZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdyb3VwID0gdXRpbHMub3RoZXJDb25maWcuZ3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCZ1wiKTtcclxuICAgICAgICB0aGlzLnNoYXJlUGFuZWwgPSB0aGlzLmJnLmdldENoaWxkQnlOYW1lKFwiU2hhcmVQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLlJlY1BhbmVsID0gdGhpcy5iZy5nZXRDaGlsZEJ5TmFtZShcIlJlY1BhbmVsXCIpO1xyXG5cclxuICAgICAgICBpZiAoIVBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZVBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUmVjUGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gdGhpcy5zaGFyZVBhbmVsLmdldENoaWxkQnlOYW1lKFwiYnRuQ2FuY2VsXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk9rID0gdGhpcy5zaGFyZVBhbmVsLmdldENoaWxkQnlOYW1lKFwiYnRuT2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvZE5vZGUgPSB0aGlzLnNoYXJlUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmROb2RlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdsb2RMYWJlbCA9IHRoaXMuZ2xvZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTGJsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5zaG93U2tpcEJ0bih0aGlzLmJ0bkNhbmNlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvZExhYmVsLnN0cmluZyA9IFwiL1wiICsgdGhpcy5yZXdhcmRWYWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkVmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVQYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5SZWNQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuUmVjUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJidG5DYW5jZWxcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lTGlzdCA9IHRoaXMuUmVjUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJQYWdlVmlld1wiKS5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSXRlbU5vZGUgPSB0aGlzLl9nYW1lTGlzdC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFJlY1BhbmVsKCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dTa2lwQnRuKHRoaXMuYnRuQ2FuY2VsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFJlY1BhbmVsKCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVMaXN0LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5fanVtcExpc3QgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2p1bXBMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB0aGlzLl9qdW1wTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sb2dvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdhbWVJdGVtTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcWNyb3NzV2lkZ2V0SXRlbTogUUNyb3NzV2lkZ2V0SXRlbSA9IHRlbXBOb2RlLmdldENvbXBvbmVudChcIlFDcm9zc1dpZGdldEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBxY3Jvc3NXaWRnZXRJdGVtLl9sb2NhdGlvbiA9IFN1YkxvY2F0aW9uLmlzTW9yZUdhbWU7XHJcbiAgICAgICAgICAgICAgICBxY3Jvc3NXaWRnZXRJdGVtLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lTGlzdC5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpXHJcbiAgICAgICAgaWYgKHV0aWxzLnNoYXJlUmVjb3JkUGFuZWxDbG9zZUZ1bmMpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hhcmVSZWNvcmRQYW5lbENsb3NlRnVuYygpO1xyXG4gICAgICAgICAgICB1dGlscy5zaGFyZVJlY29yZFBhbmVsQ2xvc2VGdW5jID0gbnVsbDs7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jICYmIHV0aWxzLnJld2FyZENsb3NlRnVuYygpO1xyXG4gICAgICAgICAgICB1dGlscy5yZXdhcmRDbG9zZUZ1bmMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmJnLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgMCkuZWFzaW5nKGNjLmVhc2VCYWNrSW4oKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuYmcuc2NhbGUgPSAwO1xyXG4gICAgICAgIGxldCByYXRpbzogbnVtYmVyID0gMTtcclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxOTIwICogMC42O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDEwODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmcucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCByYXRpbykuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2ROb2RlICYmIHRoaXMuZ2xvZE5vZGUuYWN0aXZlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvZE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjMsIENvbXBhdGlibGVUb29sLnBvc2l0aW9uKDAsICs1MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjMsIENvbXBhdGlibGVUb29sLnBvc2l0aW9uKDAsIC01MCkpXHJcbiAgICAgICAgICAgICAgICApLnJlcGVhdEZvcmV2ZXIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAqIOWIneWni+WMluS6i+S7tuWbnuiwg1xyXG4gICAgLy8gKiBAcGFyYW0gY2xvc2VDYWxsRnVuYyBcclxuICAgIC8vICogQHBhcmFtIHJld2FyZENhbGxGdW5jIFxyXG4gICAgLy8gKi9cclxuICAgIC8vIGluaXQoY2xvc2VDYWxsRnVuYzogRnVuY3Rpb24sIHJld2FyZENhbGxGdW5jOiBGdW5jdGlvbiwgcmV3YXJkOiBudW1iZXIpIHtcclxuICAgIC8vICAgICB0aGlzLmNsb3NlQ2FsbEZ1bmMgPSBjbG9zZUNhbGxGdW5jO1xyXG4gICAgLy8gICAgIHRoaXMucmV3YXJkQ2FsbEZ1bmMgPSByZXdhcmRDYWxsRnVuYztcclxuICAgIC8vICAgICB0aGlzLnJld2FyZFZhbHVlID0gcmV3YXJkO1xyXG4gICAgLy8gfVxyXG5cclxuXHJcblxyXG4gICAgb25DYW5jZWxDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4gJiYgdXRpbHMuU2VydmVyQ29uZmlnICYmIHV0aWxzLlNlcnZlckNvbmZpZy5jYW5jZWxfYnRuX2lzX3NoYXJlICYmIHV0aWxzLlNlcnZlckNvbmZpZy5jYW5jZWxfYnRuX2lzX3NoYXJlID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7lj5bmtojmjInpkq7kuZ/kvJrop6blj5HliIbkuqvvvIFcIik7XHJcbiAgICAgICAgICAgIHV0aWxzLnNoYXJlKHRoaXMucmV3YXJkRnVuYy5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Pa0J0bkNsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdXRpbHMuc2hhcmUodGhpcy5yZXdhcmRGdW5jLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKlxyXG4gICAgLy8gICog5Yid5aeL5YyW55uR5ZCs5LqL5Lu2XHJcbiAgICAvLyAgKi9cclxuICAgIC8vIHByb3RlY3RlZCBpbml0TGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGlzLmJ0bkNhbmNlbFwiLCB0aGlzLmJ0bkNhbmNlbCk7XHJcbiAgICAvLyAgICAgdGhpcy5idG5DYW5jZWwub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZXZlbnQ6IGNjLkV2ZW50KSA9PiB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuYnRuQ2FuY2VsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMSwgMC44NSksIGNjLnNjYWxlVG8oMC4xLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gaWYgKHV0aWxzLlRvb2xfRG91eWluKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluICYmIHV0aWxzLlNlcnZlckNvbmZpZyAmJiB1dGlscy5TZXJ2ZXJDb25maWcuY2FuY2VsX2J0bl9pc19zaGFyZSAmJiB1dGlscy5TZXJ2ZXJDb25maWcuY2FuY2VsX2J0bl9pc19zaGFyZSA9PSBcInRydWVcIikge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7lj5bmtojmjInpkq7kuZ/kvJrop6blj5HliIbkuqvvvIFcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdXRpbHMuc2hhcmUodGhpcy5yZXdhcmRGdW5jLmJpbmQodGhpcykpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAvLyAgICAgICAgIH0pKSk7XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuYnRuT2sgJiYgdGhpcy5idG5Pay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIChldmVudDogY2MuRXZlbnQpID0+IHtcclxuICAgIC8vICAgICAgICAgdGhpcy5idG5Pay5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjEsIDAuODUpLCBjYy5zY2FsZVRvKDAuMSwgMSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHV0aWxzLnNoYXJlKHRoaXMucmV3YXJkRnVuYy5iaW5kKHRoaXMpKTtcclxuICAgIC8vICAgICAgICAgfSkpKTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIhuS6q+Wbnuiwg1xyXG4gICAgICogQHBhcmFtIHJldCBcclxuICAgICAqIEBwYXJhbSBtc2cgXHJcbiAgICAgKi9cclxuICAgIHJld2FyZEZ1bmMocmV0LCBtc2cpIHtcclxuICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7k+eul+WJjeW5v+WRii3liIbkuqvlvLnnqpct5YiG5Lqr5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBZWl9SZXdhcmQgPSBuZXcgWVpfUmV3YXJkKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5yZXdhcmRWYWx1ZSA9IHRoaXMucmV3YXJkVmFsdWU7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLliIbkuqvmiJDlip/vvIHlpZblirHvvJorXCIgKyB0aGlzLnJld2FyZFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkQ2FsbEZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkQ2FsbEZ1bmMocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLnu5PnrpfliY3lub/lkYot5YiG5Lqr5by556qXLeWIhuS6q+Wksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhtc2cgPyBtc2cgOiBcIuWIhuS6q+Wksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdERhdGEoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19