
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RewardBoxPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f2019z6ZxHbL/eZ03jZOQ0', 'RewardBoxPanel');
// common-plugin/Scripts/RewardBoxPanel.ts

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
var AldUtils_1 = require("./AldUtils");
var PlatUtils_1 = require("./PlatUtils");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 五倍奖励宝箱
 */
var RewardBoxPanel = /** @class */ (function (_super) {
    __extends(RewardBoxPanel, _super);
    function RewardBoxPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checked = null;
        _this.doubleBtn = null;
        _this.tripleVideoBtn = null;
        _this.tripleBtn = null;
        _this.goldLabel = null;
        _this.tirpNode = null;
        _this.light = null;
        _this.panel = null;
        _this.closeBtn = null;
        /**
         * 奖励回调
         */
        _this.rewardCallFunc = null;
        /**
         * 奖励值
         */
        _this.rewardValue = 0;
        _this._boxGetRewardCount = 0;
        _this._multiple = 1;
        return _this;
    }
    Object.defineProperty(RewardBoxPanel.prototype, "boxGetRewardCount", {
        get: function () {
            return this._boxGetRewardCount;
        },
        set: function (value) {
            this._boxGetRewardCount = value;
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_GET_BOX_REWARD_COUNT, value + '');
        },
        enumerable: false,
        configurable: true
    });
    RewardBoxPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this.rewardCallFunc = Utils_1.utils.rewardCallFunc;
        this.rewardValue = Utils_1.utils.rewardValue;
        if (cc.winSize.height < cc.winSize.width) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        }
        else {
            Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
        }
        this.panel.scale = 0;
        this._boxGetRewardCount = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_GET_BOX_REWARD_COUNT) || 0;
        // let result = utils.controView(ViewLocation.box);
        // this.checked.active = result.isSelect;
        // this.tripLabel.string = result.msg;
        // if (result.btnType) {
        //     this.btnLabel.string = "领取五倍奖励"
        // } else {
        //     this.btnLabel.string = "领取奖励"
        // }
        AldUtils_1.default.SendEvent("奖励宝箱显示成功！");
        this.goldLabel.string = "/" + this.rewardValue.toString();
    };
    RewardBoxPanel.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.showSkipBtn(this.closeBtn, true);
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        if (PlatUtils_1.default.IsTest) {
            Utils_1.utils.ServerConfig.reward_box_change_count = 5;
        }
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()), cc.callFunc(function () {
            var changeCount = Utils_1.utils.ServerConfig.reward_box_change_count ? parseInt(Utils_1.utils.ServerConfig.reward_box_change_count) : 0;
            if (Utils_1.utils.ServerConfig.reward_box_change_count != undefined && _this.boxGetRewardCount >= changeCount) {
                _this.tripleVideoBtn.active = true;
                _this.tripleBtn.active = false;
                Utils_1.utils.showScaleAction(_this.tripleVideoBtn, _this.doubleBtn, true, true);
            }
            else {
                _this.tripleVideoBtn.active = false;
                Utils_1.utils.showScaleAction(_this.tripleBtn, null, false, true);
            }
            _this.light.runAction(cc.rotateBy(3, +360).repeatForever());
        })));
    };
    RewardBoxPanel.prototype.onDestroy = function () {
        Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        if (Utils_1.utils.rewardBoxPanelCloseFunc) {
            Utils_1.utils.rewardBoxPanelCloseFunc();
            Utils_1.utils.rewardBoxPanelCloseFunc = null;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    RewardBoxPanel.prototype.onClose = function () {
        var _this = this;
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
            _this.node.destroy();
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
    RewardBoxPanel.prototype.onPlayVideo = function () {
        var _this = this;
        Utils_1.utils.adManager.ShowVideo(function (ret, msg) {
            if (ret) {
                Utils_1.utils.showMsg("\u83B7\u5F97" + _this._multiple + "\u500D\u5956\u52B1! +" + _this.rewardValue * _this._multiple);
                _this.rewardValue = _this.rewardValue * _this._multiple;
                _this.boxGetRewardCount++;
                var result = new YZ_Constant_1.YZ_Reward();
                result.rewardValue = _this.rewardValue;
                if (_this.rewardCallFunc) {
                    _this.rewardCallFunc(result);
                }
                _this.onClose();
                AldUtils_1.default.SendEvent("宝箱获取奖励成功！");
            }
            else {
                Utils_1.utils.showMsg(msg ? msg : "视频广告播放失败！");
                AldUtils_1.default.SendEvent("宝箱视频播放失败！");
            }
        });
    };
    /**
     * 领取金币
     */
    RewardBoxPanel.prototype.onGetGold = function (event, data) {
        this._multiple = parseInt(data);
        switch (event.target.name) {
            case "BtnTripleVideo":
                AldUtils_1.default.SendEvent("点击宝箱视频获取按钮！");
                this.onPlayVideo();
                break;
            case "BtnDouble":
            case "BtnTriple":
                AldUtils_1.default.SendEvent("点击宝箱普通获取按钮！");
                Utils_1.utils.showMsg("\u83B7\u5F97" + this._multiple + "\u500D\u5956\u52B1! +" + this.rewardValue * this._multiple);
                this.boxGetRewardCount++;
                if (this.rewardCallFunc) {
                    var result = new YZ_Constant_1.YZ_Reward();
                    result.rewardValue = this.rewardValue * this._multiple;
                    this.rewardCallFunc(result);
                }
                this.onClose();
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "checked", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "doubleBtn", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "tripleVideoBtn", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "tripleBtn", void 0);
    __decorate([
        property(cc.Label)
    ], RewardBoxPanel.prototype, "goldLabel", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "tirpNode", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "light", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], RewardBoxPanel.prototype, "closeBtn", void 0);
    RewardBoxPanel = __decorate([
        ccclass
    ], RewardBoxPanel);
    return RewardBoxPanel;
}(cc.Component));
exports.default = RewardBoxPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmV3YXJkQm94UGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFDbEMseUNBQW9DO0FBQ3BDLHFEQUFnRDtBQUcxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1Qzs7R0FFRztBQUVIO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBZ01DO1FBN0xHLGFBQU8sR0FBWSxJQUFJLENBQUE7UUFHdkIsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUd6QixvQkFBYyxHQUFZLElBQUksQ0FBQTtRQUc5QixlQUFTLEdBQVksSUFBSSxDQUFBO1FBR3pCLGVBQVMsR0FBYSxJQUFJLENBQUE7UUFHMUIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUl4QixXQUFLLEdBQVksSUFBSSxDQUFBO1FBR3JCLFdBQUssR0FBWSxJQUFJLENBQUE7UUFHckIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUd4Qjs7V0FFRztRQUNILG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBRWhDOztXQUVHO1FBQ0gsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFTeEIsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBcUgvQixlQUFTLEdBQVcsQ0FBQyxDQUFDOztJQTJCMUIsQ0FBQztJQXJKRyxzQkFBWSw2Q0FBaUI7YUFPN0I7WUFDSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNuQyxDQUFDO2FBVEQsVUFBOEIsS0FBYTtZQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLHlCQUFlLENBQUMsT0FBTyxDQUFDLHFCQUFXLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENB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QVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDTTtJQTVCUCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBZ01sQztJQUFELHFCQUFDO0NBaE1ELEFBZ01DLENBaE0yQyxFQUFFLENBQUMsU0FBUyxHQWdNdkQ7a0JBaE1vQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IFlaX0NvbnN0YW50LCB7IEJhbm5lckxvY2F0aW9uLCBZWl9SZXdhcmQgfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xuaW1wb3J0IEFsZFV0aWxzIGZyb20gXCIuL0FsZFV0aWxzXCI7XG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5cbi8qKlxuICog5LqU5YCN5aWW5Yqx5a6d566xXG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmRCb3hQYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjaGVja2VkOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZG91YmxlQnRuOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdHJpcGxlVmlkZW9CdG46IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0cmlwbGVCdG46IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZ29sZExhYmVsOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpcnBOb2RlOiBjYy5Ob2RlID0gbnVsbFxuXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsaWdodDogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBhbmVsOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2xvc2VCdG46IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIC8qKlxuICAgICAqIOWlluWKseWbnuiwg1xuICAgICAqL1xuICAgIHJld2FyZENhbGxGdW5jOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDlpZblirHlgLxcbiAgICAgKi9cbiAgICByZXdhcmRWYWx1ZTogbnVtYmVyID0gMDtcblxuXG5cbiAgICBwcml2YXRlIHNldCBib3hHZXRSZXdhcmRDb3VudCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2JveEdldFJld2FyZENvdW50ID0gdmFsdWU7XG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX0dFVF9CT1hfUkVXQVJEX0NPVU5ULCB2YWx1ZSArICcnKTtcbiAgICB9XG5cbiAgICBfYm94R2V0UmV3YXJkQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGdldCBib3hHZXRSZXdhcmRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveEdldFJld2FyZENvdW50O1xuICAgIH1cblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAodXRpbHMub3RoZXJDb25maWcgJiYgdXRpbHMub3RoZXJDb25maWcuZ3JvdXApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyA9IHV0aWxzLnJld2FyZENhbGxGdW5jO1xuXG4gICAgICAgIHRoaXMucmV3YXJkVmFsdWUgPSB1dGlscy5yZXdhcmRWYWx1ZTtcblxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFuZWwuc2NhbGUgPSAwO1xuXG4gICAgICAgIHRoaXMuX2JveEdldFJld2FyZENvdW50ID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfR0VUX0JPWF9SRVdBUkRfQ09VTlQpIHx8IDA7XG4gICAgICAgIC8vIGxldCByZXN1bHQgPSB1dGlscy5jb250cm9WaWV3KFZpZXdMb2NhdGlvbi5ib3gpO1xuICAgICAgICAvLyB0aGlzLmNoZWNrZWQuYWN0aXZlID0gcmVzdWx0LmlzU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLnRyaXBMYWJlbC5zdHJpbmcgPSByZXN1bHQubXNnO1xuICAgICAgICAvLyBpZiAocmVzdWx0LmJ0blR5cGUpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuTGFiZWwuc3RyaW5nID0gXCLpooblj5bkupTlgI3lpZblirFcIlxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5idG5MYWJlbC5zdHJpbmcgPSBcIumihuWPluWlluWKsVwiXG4gICAgICAgIC8vIH1cblxuICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoXCLlpZblirHlrp3nrrHmmL7npLrmiJDlip/vvIFcIik7XG4gICAgICAgIHRoaXMuZ29sZExhYmVsLnN0cmluZyA9IFwiL1wiICsgdGhpcy5yZXdhcmRWYWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB1dGlscy5zaG93U2tpcEJ0bih0aGlzLmNsb3NlQnRuLCB0cnVlKTtcbiAgICAgICAgbGV0IHJhdGlvOiBudW1iZXIgPSAxO1xuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDE5MjAgKiAwLjY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNUZXN0KSB7XG4gICAgICAgICAgICB1dGlscy5TZXJ2ZXJDb25maWcucmV3YXJkX2JveF9jaGFuZ2VfY291bnQgPSA1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFuZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCByYXRpbykuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjaGFuZ2VDb3VudCA9IHV0aWxzLlNlcnZlckNvbmZpZy5yZXdhcmRfYm94X2NoYW5nZV9jb3VudCA/IHBhcnNlSW50KHV0aWxzLlNlcnZlckNvbmZpZy5yZXdhcmRfYm94X2NoYW5nZV9jb3VudCkgOiAwO1xuXG4gICAgICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLnJld2FyZF9ib3hfY2hhbmdlX2NvdW50ICE9IHVuZGVmaW5lZCAmJiB0aGlzLmJveEdldFJld2FyZENvdW50ID49IGNoYW5nZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlwbGVWaWRlb0J0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpcGxlQnRuLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd1NjYWxlQWN0aW9uKHRoaXMudHJpcGxlVmlkZW9CdG4sIHRoaXMuZG91YmxlQnRuLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlwbGVWaWRlb0J0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93U2NhbGVBY3Rpb24odGhpcy50cmlwbGVCdG4sIG51bGwsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlnaHQucnVuQWN0aW9uKGNjLnJvdGF0ZUJ5KDMsICszNjApLnJlcGVhdEZvcmV2ZXIoKSlcbiAgICAgICAgfSkpKTtcbiAgICB9XG5cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSlcbiAgICAgICAgaWYgKHV0aWxzLnJld2FyZEJveFBhbmVsQ2xvc2VGdW5jKSB7XG4gICAgICAgICAgICB1dGlscy5yZXdhcmRCb3hQYW5lbENsb3NlRnVuYygpO1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQm94UGFuZWxDbG9zZUZ1bmMgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jICYmIHV0aWxzLnJld2FyZENsb3NlRnVuYygpO1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5wYW5lbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDApLmVhc2luZyhjYy5lYXNlQmFja0luKCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9KSkpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICog5Yid5aeL5YyW5LqL5Lu25Zue6LCDXG4gICAgLy8gKiBAcGFyYW0gY2xvc2VDYWxsRnVuYyBcbiAgICAvLyAqIEBwYXJhbSByZXdhcmRDYWxsRnVuYyBcbiAgICAvLyAqL1xuICAgIC8vIGluaXQoY2xvc2VDYWxsRnVuYzogRnVuY3Rpb24sIHJld2FyZENhbGxGdW5jOiBGdW5jdGlvbiwgcmV3YXJkOiBudW1iZXIpIHtcbiAgICAvLyAgICAgdGhpcy5jbG9zZUNhbGxGdW5jID0gY2xvc2VDYWxsRnVuYztcbiAgICAvLyAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyA9IHJld2FyZENhbGxGdW5jO1xuICAgIC8vICAgICB0aGlzLnJld2FyZFZhbHVlID0gcmV3YXJkO1xuICAgIC8vIH1cblxuXG4gICAgb25QbGF5VmlkZW8oKSB7XG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93VmlkZW8oKHJldCwgbXNnKSA9PiB7XG4gICAgICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhg6I635b6XJHt0aGlzLl9tdWx0aXBsZX3lgI3lpZblirEhICske3RoaXMucmV3YXJkVmFsdWUgKiB0aGlzLl9tdWx0aXBsZX1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZFZhbHVlID0gdGhpcy5yZXdhcmRWYWx1ZSAqIHRoaXMuX211bHRpcGxlO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94R2V0UmV3YXJkQ291bnQrKztcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBZWl9SZXdhcmQgPSBuZXcgWVpfUmV3YXJkKCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJld2FyZFZhbHVlID0gdGhpcy5yZXdhcmRWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXdhcmRDYWxsRnVuYykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIEFsZFV0aWxzLlNlbmRFdmVudChcIuWuneeuseiOt+WPluWlluWKseaIkOWKn++8gVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhtc2cgPyBtc2cgOiBcIuinhumikeW5v+WRiuaSreaUvuWksei0pe+8gVwiKTtcbiAgICAgICAgICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoXCLlrp3nrrHop4bpopHmkq3mlL7lpLHotKXvvIFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBfbXVsdGlwbGU6IG51bWJlciA9IDE7XG4gICAgLyoqXG4gICAgICog6aKG5Y+W6YeR5biBXG4gICAgICovXG4gICAgb25HZXRHb2xkKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIHRoaXMuX211bHRpcGxlID0gcGFyc2VJbnQoZGF0YSk7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0Lm5hbWUpIHtcblxuICAgICAgICAgICAgY2FzZSBcIkJ0blRyaXBsZVZpZGVvXCI6XG4gICAgICAgICAgICAgICAgQWxkVXRpbHMuU2VuZEV2ZW50KFwi54K55Ye75a6d566x6KeG6aKR6I635Y+W5oyJ6ZKu77yBXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMub25QbGF5VmlkZW8oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJCdG5Eb3VibGVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJCdG5UcmlwbGVcIjpcbiAgICAgICAgICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoXCLngrnlh7vlrp3nrrHmma7pgJrojrflj5bmjInpkq7vvIFcIik7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhg6I635b6XJHt0aGlzLl9tdWx0aXBsZX3lgI3lpZblirEhICske3RoaXMucmV3YXJkVmFsdWUgKiB0aGlzLl9tdWx0aXBsZX1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJveEdldFJld2FyZENvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkQ2FsbEZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogWVpfUmV3YXJkID0gbmV3IFlaX1Jld2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmV3YXJkVmFsdWUgPSB0aGlzLnJld2FyZFZhbHVlICogdGhpcy5fbXVsdGlwbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkQ2FsbEZ1bmMocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==