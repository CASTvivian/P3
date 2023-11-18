
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RewardShortCutPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmV3YXJkU2hvcnRDdXRQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMsNkNBQTBEO0FBQzFELHlDQUFvQztBQUU5QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7R0FFRztBQUVIO0lBQWlELHVDQUFZO0lBQTdEO1FBQUEscUVBb0xDO1FBbExHLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFDbkIsV0FBSyxHQUFZLElBQUksQ0FBQztRQUN0QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQjs7V0FFRztRQUNILG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBRWhDOztXQUVHO1FBQ0gsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsaUJBQVcsR0FBWSxLQUFLLENBQUM7O1FBaUs3QixpQkFBaUI7SUFDckIsQ0FBQztJQS9KRyxvQ0FBTSxHQUFOO1FBR0ksYUFBSyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXRDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLGVBQWUsR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1NBQ3JEO2FBQU0sSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUN6QixlQUFlLEdBQUcsYUFBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN0RDtRQUVELElBQUksZUFBZSxFQUFFO1lBQ2pCLGFBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0QyxhQUFLLENBQUMsU0FBUyxD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QztZQUN4QyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDdEMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjthQUFNO1lBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBR0Q7O09BRUc7SUFDTyxzQ0FBUSxHQUFsQjtJQUVBLENBQUM7SUFqTGdCLG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBb0x2QztJQUFELDBCQUFDO0NBcExELEFBb0xDLENBcExnRCxFQUFFLENBQUMsU0FBUyxHQW9MNUQ7a0JBcExvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFlaX1Jld2FyZCwgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDliIbkuqvlvZXlsY/pnaLmnb9cclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZFNob3J0Q3V0UGFuZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJ0bk9rOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJ0bkNhbmNlbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBnbG9kTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBnbG9kTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseWbnuiwg1xyXG4gICAgICovXHJcbiAgICByZXdhcmRDYWxsRnVuYzogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aWW5Yqx5YC8XHJcbiAgICAgKi9cclxuICAgIHJld2FyZFZhbHVlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIF9zaG93QmFubmVyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7k+eul+WJjeW5v+WRii3liJvlu7rlv6vmjbfmoYzpnaIt5bGV56S65oiQ5Yqf77yBXCIpO1xyXG5cclxuICAgICAgICBsZXQgc2hvcnRjdXRDcmVhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgc2hvcnRjdXRDcmVhdGVkID0gdXRpbHMub3Bwb1Rvb2wuX3Nob3J0Y3V0Q3JlYXRlZDtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgc2hvcnRjdXRDcmVhdGVkID0gdXRpbHMuVG9vbF9WaXZvLl9zaG9ydGN1dENyZWF0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hvcnRjdXRDcmVhdGVkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlt7Lnu4/lrZjlnKjmoYzpnaLlv6vmjbfmlrnlvI/vvIzlvZPliY3nqpflj6Pnm7TmjqXplIDmr4HvvIFcIik7XHJcbiAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7k+eul+WJjeW5v+WRii3liJvlu7rlv6vmjbfmoYzpnaIt5bey57uP5a2Y5Zyo5qGM6Z2i5b+r5o235pa55byP77yBXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZyhgdXRpbHMuU2VydmVyQ29uZmlnLmF1dG9fZGVza3RvcD4ke3V0aWxzLlNlcnZlckNvbmZpZy5hdXRvX2Rlc2t0b3AgPT09IDB9LCR7dXRpbHMuU2VydmVyQ29uZmlnLmF1dG9fZGVza3RvcCA9PSAwfTxgKTtcclxuICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLmF1dG9fZGVza3RvcCAhPSB1bmRlZmluZWQgJiYgdXRpbHMuU2VydmVyQ29uZmlnLmF1dG9fZGVza3RvcCA9PT0gMCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u55u05o6l5Yib5bu65qGM6Z2i77yM5LiN5pi+56S65by556qX77yM5b2T5YmN56qX5Y+j55u05o6l6ZSA5q+B77yBXCIpO1xyXG4gICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLnu5PnrpfliY3lub/lkYot5Yib5bu65b+r5o235qGM6Z2iLeacjeWKoeWZqOmFjee9ruebtOaOpeWIm+W7uuahjOmdou+8jOS4jeaYvuekuuW8ueeql++8gVwiKTtcclxuICAgICAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wuY3JlYXRlU2hvcnRjdXQgJiYgdXRpbHMuY3VyX3Rvb2wuY3JlYXRlU2hvcnRjdXQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi57uT566X5YmN5bm/5ZGKLeebtOaOpeWIm+W7uuW/q+aNt+ahjOmdoi3liJvlu7rmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXdhcmRWYWx1ZSA9IHV0aWxzLnJld2FyZFZhbHVlO1xyXG4gICAgICAgIHRoaXMucmV3YXJkQ2FsbEZ1bmMgPSB1dGlscy5yZXdhcmRDYWxsRnVuYztcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dCYW5uZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd0Jhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFVpKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh1dGlscy5vdGhlckNvbmZpZyAmJiB1dGlscy5vdGhlckNvbmZpZy5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpLmNoaWxkcmVuWzBdO1xyXG5cclxuICAgICAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuYmcuZ2V0Q2hpbGRCeU5hbWUoXCJidG5DbG9zZVwiKTtcclxuICAgICAgICB0aGlzLmJ0bk9rID0gdGhpcy5iZy5nZXRDaGlsZEJ5TmFtZShcImJ0bk9rXCIpO1xyXG4gICAgICAgIHRoaXMuZ2xvZE5vZGUgPSB0aGlzLmJnLmdldENoaWxkQnlOYW1lKFwicmV3YXJkTGFiZWxcIik7XHJcbiAgICAgICAgdGhpcy5nbG9kTGFiZWwgPSB0aGlzLmdsb2ROb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdsb2RMYWJlbC5zdHJpbmcgPSBcIuWlluWKsStcIiArIHRoaXMucmV3YXJkVmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMucmV3YXJkVmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdsb2ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1dGlscy5zaG93U2tpcEJ0bih0aGlzLmJ0bkNhbmNlbCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd0Jhbm5lciAmJiB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKVxyXG4gICAgICAgIGlmICh1dGlscy5yZXdhcmRTaG9ydEN1dFBhbmVsQ2xvc2VGdW5jKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJld2FyZFNob3J0Q3V0UGFuZWxDbG9zZUZ1bmMoKTtcclxuICAgICAgICAgICAgdXRpbHMucmV3YXJkU2hvcnRDdXRQYW5lbENsb3NlRnVuYyA9IG51bGw7O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJld2FyZENsb3NlRnVuYyAmJiB1dGlscy5yZXdhcmRDbG9zZUZ1bmMoKTtcclxuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLmN1cl90b29sICYmIHV0aWxzLmN1cl90b29sLmNoZWNrSGFzU2hvcnRDdXQgJiYgdXRpbHMuY3VyX3Rvb2wuY2hlY2tIYXNTaG9ydEN1dCgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5iZy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDApLmVhc2luZyhjYy5lYXNlQmFja0luKCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmJnLnNjYWxlID0gMDtcclxuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJnLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgcmF0aW8pLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk9rLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAxLjE1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAxKVxyXG4gICAgICAgICAgICApLnJlcGVhdEZvcmV2ZXIoKSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ3JlYXRlU2hvcnRDdXQoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLm9wcG9Ub29sLmNyZWF0ZVNob3J0Y3V0KChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7k+eul+WJjeW5v+WRii3liJvlu7rlv6vmjbfmoYzpnaIt5Yib5bu65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRGdW5jKHJlcylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgdXRpbHMuVG9vbF9WaXZvLmNyZWF0ZVNob3J0Y3V0KChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIue7k+eul+WJjeW5v+WRii3liJvlu7rlv6vmjbfmoYzpnaIt5Yib5bu65oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRGdW5jKHJlcylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbnm5HlkKzkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXRMaXN0ZW5lcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gcmV0IFxyXG4gICAgICogQHBhcmFtIG1zZyBcclxuICAgICAqL1xyXG4gICAgcmV3YXJkRnVuYyhyZXQpIHtcclxuICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IFlaX1Jld2FyZCA9IG5ldyBZWl9SZXdhcmQoKTtcclxuICAgICAgICAgICAgcmVzdWx0LnJld2FyZFZhbHVlID0gdGhpcy5yZXdhcmRWYWx1ZTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcIua3u+WKoOaIkOWKn++8geWlluWKse+8mitcIiArIHRoaXMucmV3YXJkVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXdhcmRDYWxsRnVuYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLmt7vliqDlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXREYXRhKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==