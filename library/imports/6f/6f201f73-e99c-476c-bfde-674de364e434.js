"use strict";
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