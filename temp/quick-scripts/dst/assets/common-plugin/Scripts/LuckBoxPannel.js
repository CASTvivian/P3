
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/LuckBoxPannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3251aCuG7ZC+oEceDfuKFcK', 'LuckBoxPannel');
// common-plugin/Scripts/LuckBoxPannel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 五倍奖励宝箱
 */
var LuckBoxPanel = /** @class */ (function (_super) {
    __extends(LuckBoxPanel, _super);
    function LuckBoxPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showVideoBtn = null;
        _this.clickBtn = null;
        _this.btnLabel = null;
        _this.panel = null;
        _this.videoIcon = null;
        _this.progressBar = null;
        _this.boxNode = null;
        /**
         * 奖励回调
         */
        _this.rewardCallFunc = null;
        /**
         * 奖励值
         */
        _this.rewardValue = 0;
        //幸运宝箱显示的广告类型
        _this._luck_box_ad_type = "1";
        //跳过按钮延迟显示时间
        _this._delay_show_btn_time = 0;
        //幸运宝箱开始回退的时间
        _this._luck_box_progressbar_back_time = 1000;
        /**
         * 展示广告的进度条百分比
         */
        _this._showAdProgress = 0.8;
        _this._openSlowDown = false;
        _this._timetaskId = 0;
        _this._cancelSlowDown = false;
        _this._slowDownSpeed = 0.2;
        _this._progresss = 0;
        _this._totalProgress = 5;
        _this._isShowAd = false;
        _this._videoIsPlay = false;
        return _this;
    }
    LuckBoxPanel.prototype.onLoad = function () {
        var _this = this;
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this.rewardCallFunc = Utils_1.utils.rewardCallFunc;
        this.rewardValue = Utils_1.utils.rewardValue;
        this.panel.scale = 0;
        Utils_1.utils.SendEvent("幸运宝箱-显示成功！");
        this.clickBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.clickBtnTouchCancel.bind(this));
        this.clickBtn.on(cc.Node.EventType.TOUCH_END, this.clickBtnTouchCancel.bind(this));
        this.progressBar.progress = 0;
        this.btnLabel.node.opacity = 0;
        this.btnLabel.node.active = false;
        Utils_1.utils.luckBoxShowCount++;
        var adTypes = Utils_1.utils.ServerConfig.luck_box_ad_type ? Utils_1.utils.ServerConfig.luck_box_ad_type.split(",") : this._luck_box_ad_type;
        var closeBtnShowDelays = Utils_1.utils.ServerConfig.luck_box_close_btn_show_delay ? Utils_1.utils.ServerConfig.luck_box_close_btn_show_delay.split(",") : this._delay_show_btn_time;
        var progressbarBackTimes = Utils_1.utils.ServerConfig.luck_box_progressbar_back_time ? Utils_1.utils.ServerConfig.luck_box_progressbar_back_time.split(",") : this._luck_box_progressbar_back_time;
        if (Utils_1.utils.luckBoxShowCount > adTypes.length - 1) {
            Utils_1.utils.luckBoxShowCount = 0;
        }
        Utils_1.utils.showLog("\u5E78\u8FD0\u5B9D\u7BB1\u663E\u793A\u6B21\u6570\uFF1A" + Utils_1.utils.luckBoxShowCount);
        this._luck_box_ad_type = adTypes[Utils_1.utils.luckBoxShowCount];
        this._delay_show_btn_time = closeBtnShowDelays[Utils_1.utils.luckBoxShowCount];
        this._luck_box_progressbar_back_time = progressbarBackTimes[Utils_1.utils.luckBoxShowCount];
        if (Utils_1.utils.ServerConfig.luck_box_show_ad_progress_percent) {
            var showAdProPercents = Utils_1.utils.ServerConfig.luck_box_show_ad_progress_percent.split(",");
            this._showAdProgress = showAdProPercents[Utils_1.utils.luckBoxShowCount];
        }
        else {
            switch (this._luck_box_ad_type) {
                case "1":
                case "5":
                    this._showAdProgress = 0.45;
                    break;
                case "2":
                    this._showAdProgress = 0.3;
                    break;
                case "3":
                    //插屏点击进度超过0.3就调用广告
                    this._showAdProgress = 0.85;
                    break;
                case "4":
                    this._showAdProgress = 0.85;
                    break;
                default:
                    this._showAdProgress = 0.45;
                    break;
            }
        }
        Utils_1.utils.showLog("\u5E78\u8FD0\u5B9D\u7BB1\u663E\u793A\u7C7B\u578B\uFF1A" + this._luck_box_ad_type + " #showBtnTime=" + this._delay_show_btn_time + " #progressbarBackTime=" + this._luck_box_progressbar_back_time);
        if (this._luck_box_ad_type != "4") {
            this.scheduleOnce(function () {
                if (_this.btnLabel.node && cc.isValid(_this.btnLabel.node)) {
                    _this.btnLabel.node.active = true;
                    _this.btnLabel.node.runAction(cc.fadeIn(0.3));
                }
            }, this._delay_show_btn_time);
        }
        if (Utils_1.utils.ServerConfig.luck_box_video_icon_is_show && Utils_1.utils.ServerConfig.luck_box_video_icon_is_show == "true") {
            this.videoIcon.active = true;
        }
        else {
            this.videoIcon.active = false;
        }
        if (this._luck_box_ad_type == "1") {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
            if (PlatUtils_1.default.IsIOS && PlatUtils_1.default.IsQQ) {
                this.scheduleOnce(function () {
                    if (_this.clickBtn && cc.isValid(_this.clickBtn)) {
                        _this.clickBtn.setPosition(_this.clickBtn.x, _this.progressBar.node.position.y - 200);
                    }
                }, 10);
            }
        }
        else {
            this.clickBtn.getComponent(cc.Widget).isAlignBottom = false;
            this.clickBtn.getComponent(cc.Widget).updateAlignment();
            this.clickBtn.setPosition(this.clickBtn.x, this.progressBar.node.position.y - 200);
        }
        // this.boxNode.runAction(cc.sequence(cc.scaleTo(1, 1.3).easing(cc.easeElasticIn(1.0)), cc.scaleTo(1, 1).easing(cc.easeElasticOut(3.0)), cc.delayTime(1)).repeatForever())
    };
    LuckBoxPanel.prototype.clickBtnTouchCancel = function () {
        var _this = this;
        clearTimeout(this._timetaskId);
        this._timetaskId = setTimeout(function () {
            _this._openSlowDown = true;
        }, this._luck_box_progressbar_back_time * 1000);
    };
    LuckBoxPanel.prototype.update = function (dt) {
        if (this.progressBar.progress > 0 && this.progressBar.progress < 1 && this._openSlowDown && !this._cancelSlowDown) {
            this.progressBar.progress -= dt * this._slowDownSpeed;
            if (this.progressBar.progress <= 0) {
                this.progressBar.progress = 0;
            }
        }
    };
    LuckBoxPanel.prototype.onEnable = function () {
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.6;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this.panel.scale = ratio;
    };
    LuckBoxPanel.prototype.onDestroy = function () {
        Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        Utils_1.utils.hideRecommendGamesBanner();
        if (Utils_1.utils.rewardLuckBoxPanelCloseFunc) {
            Utils_1.utils.rewardLuckBoxPanelCloseFunc();
            Utils_1.utils.rewardBoxPanelCloseFunc = null;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    LuckBoxPanel.prototype.onClose = function () {
        var _this = this;
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
            _this.node.destroy();
        })));
    };
    /**
     * 狂点
     */
    LuckBoxPanel.prototype.onBtnClick = function () {
        var _this = this;
        this._openSlowDown = false;
        if (this.progressBar.progress < 1) {
            this.progressBar.progress += 0.10;
            if (this.progressBar.progress >= 1) {
                this.progressBar.progress = 1;
                this.openLuckBox();
            }
        }
        if (this.videoIcon.active && !this._videoIsPlay) {
            this._videoIsPlay = true;
            Utils_1.utils.adManager.ShowVideo(function (res, msg) {
                if (PlatUtils_1.default.IsDouyin) {
                    if (res) {
                        Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                        var result = new YZ_Constant_1.YZ_Reward();
                        result.rewardValue = _this.rewardValue;
                        if (_this.rewardCallFunc) {
                            _this.rewardCallFunc(result);
                        }
                        _this.onClose();
                    }
                    else {
                        _this._videoIsPlay = false;
                        Utils_1.utils.showMsg(msg ? msg : "视频加载失败！");
                    }
                }
                else {
                    Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                    var result = new YZ_Constant_1.YZ_Reward();
                    result.rewardValue = _this.rewardValue;
                    if (_this.rewardCallFunc) {
                        _this.rewardCallFunc(result);
                    }
                    _this.onClose();
                }
            });
        }
        if (this.progressBar.progress >= this._showAdProgress && !this._isShowAd) {
            this._isShowAd = true;
            //1、banner（默认） 2、插屏 3、盒子广告 4、视频广告 
            switch (this._luck_box_ad_type) {
                case "1":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-banner广告！");
                    Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
                    setTimeout(function () {
                        if (_this.clickBtn && cc.isValid(_this.clickBtn)) {
                            _this.clickBtn.setPosition(_this.clickBtn.x, _this.progressBar.node.position.y - 200);
                        }
                    }, 900);
                    break;
                case "2":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-插屏广告！");
                    Utils_1.utils.adManager.ShowInterstitial();
                    break;
                case "3":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-盒子广告！");
                    Utils_1.utils.adManager.ShowAppBox();
                    break;
                case "4":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-视频广告！");
                    // this.progressBar.progress = 1;
                    this.videoIcon.active = true;
                    // cc.find("Background/clickTxt", this.clickBtn).active = false;
                    // cc.find("Background/btn_ok", this.clickBtn).active = true;
                    this._cancelSlowDown = true;
                    this.scheduleOnce(function () {
                        if (_this.btnLabel.node && cc.isValid(_this.btnLabel.node)) {
                            _this.btnLabel.node.active = true;
                            _this.btnLabel.node.runAction(cc.fadeIn(0.3));
                        }
                    }, this._delay_show_btn_time);
                    break;
                case "5":
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示-互推banner广告！");
                    Utils_1.utils.showRecommendGamesBanner();
                    break;
                default:
                    Utils_1.utils.showLog("服务器配置幸运宝箱展示banner广告！");
                    Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
                    setTimeout(function () {
                        if (_this.clickBtn && cc.isValid(_this.clickBtn)) {
                            _this.clickBtn.setPosition(_this.clickBtn.x, _this.progressBar.node.position.y - 200);
                        }
                    }, 500);
                    break;
            }
        }
    };
    /**
     * 打开宝箱
     */
    LuckBoxPanel.prototype.openLuckBox = function () {
        if (Utils_1.utils.ServerConfig.luck_box_play_video == "true") {
            this.onPlayVideo();
            this.onClose();
        }
        else {
            Utils_1.utils.showMsg("获得奖励! +" + this.rewardValue);
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = this.rewardValue;
            if (this.rewardCallFunc) {
                this.rewardCallFunc(result);
            }
            this.onClose();
        }
    };
    LuckBoxPanel.prototype.onHideBtn = function () {
        this.onClose();
    };
    LuckBoxPanel.prototype.onPlayVideo = function () {
        var _this = this;
        Utils_1.utils.adManager.ShowVideo(function (ret, msg) {
            if (ret) {
                Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                _this.rewardValue = _this.rewardValue;
                AldUtils_1.default.SendEvent("幸运宝箱-获取奖励成功！");
            }
            else {
                Utils_1.utils.showMsg("获得奖励! +" + _this.rewardValue);
                AldUtils_1.default.SendEvent("幸运宝箱-视频播放失败！");
            }
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = _this.rewardValue;
            if (_this.rewardCallFunc) {
                _this.rewardCallFunc(result);
            }
            _this.onClose();
        });
    };
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "showVideoBtn", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "clickBtn", void 0);
    __decorate([
        property(cc.Label)
    ], LuckBoxPanel.prototype, "btnLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "videoIcon", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], LuckBoxPanel.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Node)
    ], LuckBoxPanel.prototype, "boxNode", void 0);
    LuckBoxPanel = __decorate([
        ccclass
    ], LuckBoxPanel);
    return LuckBoxPanel;
}(cc.Component));
exports.default = LuckBoxPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTHVja0JveFBhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMsNkNBQXdFO0FBQ3hFLHVDQUFrQztBQUNsQyx5Q0FBb0M7QUFHOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7O0dBRUc7QUFFSDtJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQW9XQztRQWhXRyxrQkFBWSxHQUFZLElBQUksQ0FBQTtRQUc1QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBR3hCLGNBQVEsR0FBYSxJQUFJLENBQUE7UUFHekIsV0FBSyxHQUFZLElBQUksQ0FBQTtRQUdyQixlQUFTLEdBQVksSUFBSSxDQUFBO1FBR3pCLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCOztXQUVHO1FBQ0gsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFFaEM7O1dBRUc7UUFDSCxpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUV4QixhQUFhO1FBQ2IsdUJBQWlCLEdBQVcsR0FBRyxDQUFDO1FBQ2hDLFlBQVk7UUFDWiwwQkFBb0IsR0FBVyxDQUFDLENBQUM7UUFFakMsYUFBYTtRQUNiLHFDQUErQixHQUFXLElBQUksQ0FBQztRQUUvQzs7V0FFRztRQUNILHFCQUFlLEdBQVcsR0FBRyxDQUFDO1FBbUg5QixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixxQkFBZSxHQUFZLEtBQUssQ0FBQztRQVNqQyxvQkFBYyxHQUFXLEdBQUcsQ0FBQztRQXlDN0IsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsZUFBUyxHQUFZLEtBQUss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QyxrQkFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN0QztZQUNELElBQUksTUFBTSxHQUFjLElBQUksdUJBQVMsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQUN0QyxJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JCLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0I7WUFDRCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBN1ZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3FEQUNVO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ007SUF0QlAsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQW9XaEM7SUFBRCxtQkFBQztDQXBXRCxBQW9XQyxDQXBXeUMsRUFBRSxDQUFDLFNBQVMsR0FvV3JEO2tCQXBXb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uLCBWaWV3TG9jYXRpb24sIFlaX1Jld2FyZCB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XG5pbXBvcnQgQWxkVXRpbHMgZnJvbSBcIi4vQWxkVXRpbHNcIjtcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuXG4vKipcbiAqIOS6lOWAjeWlluWKseWuneeusVxuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVja0JveFBhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2hvd1ZpZGVvQnRuOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2xpY2tCdG46IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYnRuTGFiZWw6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFuZWw6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB2aWRlb0ljb246IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgcHJvZ3Jlc3NCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJveE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvKipcbiAgICAgKiDlpZblirHlm57osINcbiAgICAgKi9cbiAgICByZXdhcmRDYWxsRnVuYzogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog5aWW5Yqx5YC8XG4gICAgICovXG4gICAgcmV3YXJkVmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICAvL+W5uOi/kOWuneeuseaYvuekuueahOW5v+WRiuexu+Wei1xuICAgIF9sdWNrX2JveF9hZF90eXBlOiBzdHJpbmcgPSBcIjFcIjtcbiAgICAvL+i3s+i/h+aMiemSruW7tui/n+aYvuekuuaXtumXtFxuICAgIF9kZWxheV9zaG93X2J0bl90aW1lOiBudW1iZXIgPSAwO1xuXG4gICAgLy/lubjov5Dlrp3nrrHlvIDlp4vlm57pgIDnmoTml7bpl7RcbiAgICBfbHVja19ib3hfcHJvZ3Jlc3NiYXJfYmFja190aW1lOiBudW1iZXIgPSAxMDAwO1xuXG4gICAgLyoqXG4gICAgICog5bGV56S65bm/5ZGK55qE6L+b5bqm5p2h55m+5YiG5q+UXG4gICAgICovXG4gICAgX3Nob3dBZFByb2dyZXNzOiBudW1iZXIgPSAwLjg7XG5cblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAodXRpbHMub3RoZXJDb25maWcgJiYgdXRpbHMub3RoZXJDb25maWcuZ3JvdXApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jID0gdXRpbHMucmV3YXJkQ2FsbEZ1bmM7XG5cbiAgICAgICAgdGhpcy5yZXdhcmRWYWx1ZSA9IHV0aWxzLnJld2FyZFZhbHVlO1xuXG4gICAgICAgIHRoaXMucGFuZWwuc2NhbGUgPSAwO1xuXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuW5uOi/kOWuneeusS3mmL7npLrmiJDlip/vvIFcIik7XG5cbiAgICAgICAgdGhpcy5jbGlja0J0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuY2xpY2tCdG5Ub3VjaENhbmNlbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbGlja0J0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuY2xpY2tCdG5Ub3VjaENhbmNlbC5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzID0gMDtcblxuXG5cbiAgICAgICAgdGhpcy5idG5MYWJlbC5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLmJ0bkxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG5cblxuICAgICAgICB1dGlscy5sdWNrQm94U2hvd0NvdW50Kys7XG4gICAgICAgIGxldCBhZFR5cGVzID0gdXRpbHMuU2VydmVyQ29uZmlnLmx1Y2tfYm94X2FkX3R5cGUgPyB1dGlscy5TZXJ2ZXJDb25maWcubHVja19ib3hfYWRfdHlwZS5zcGxpdChcIixcIikgOiB0aGlzLl9sdWNrX2JveF9hZF90eXBlO1xuICAgICAgICBsZXQgY2xvc2VCdG5TaG93RGVsYXlzID0gdXRpbHMuU2VydmVyQ29uZmlnLmx1Y2tfYm94X2Nsb3NlX2J0bl9zaG93X2RlbGF5ID8gdXRpbHMuU2VydmVyQ29uZmlnLmx1Y2tfYm94X2Nsb3NlX2J0bl9zaG93X2RlbGF5LnNwbGl0KFwiLFwiKSA6IHRoaXMuX2RlbGF5X3Nob3dfYnRuX3RpbWU7XG4gICAgICAgIGxldCBwcm9ncmVzc2JhckJhY2tUaW1lcyA9IHV0aWxzLlNlcnZlckNvbmZpZy5sdWNrX2JveF9wcm9ncmVzc2Jhcl9iYWNrX3RpbWUgPyB1dGlscy5TZXJ2ZXJDb25maWcubHVja19ib3hfcHJvZ3Jlc3NiYXJfYmFja190aW1lLnNwbGl0KFwiLFwiKSA6IHRoaXMuX2x1Y2tfYm94X3Byb2dyZXNzYmFyX2JhY2tfdGltZTtcbiAgICAgICAgaWYgKHV0aWxzLmx1Y2tCb3hTaG93Q291bnQgPiBhZFR5cGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHV0aWxzLmx1Y2tCb3hTaG93Q291bnQgPSAwO1xuICAgICAgICB9XG5cblxuICAgICAgICB1dGlscy5zaG93TG9nKGDlubjov5Dlrp3nrrHmmL7npLrmrKHmlbDvvJoke3V0aWxzLmx1Y2tCb3hTaG93Q291bnR9YCk7XG4gICAgICAgIHRoaXMuX2x1Y2tfYm94X2FkX3R5cGUgPSBhZFR5cGVzW3V0aWxzLmx1Y2tCb3hTaG93Q291bnRdO1xuICAgICAgICB0aGlzLl9kZWxheV9zaG93X2J0bl90aW1lID0gY2xvc2VCdG5TaG93RGVsYXlzW3V0aWxzLmx1Y2tCb3hTaG93Q291bnRdO1xuICAgICAgICB0aGlzLl9sdWNrX2JveF9wcm9ncmVzc2Jhcl9iYWNrX3RpbWUgPSBwcm9ncmVzc2JhckJhY2tUaW1lc1t1dGlscy5sdWNrQm94U2hvd0NvdW50XTtcblxuXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcubHVja19ib3hfc2hvd19hZF9wcm9ncmVzc19wZXJjZW50KSB7XG4gICAgICAgICAgICBsZXQgc2hvd0FkUHJvUGVyY2VudHMgPSB1dGlscy5TZXJ2ZXJDb25maWcubHVja19ib3hfc2hvd19hZF9wcm9ncmVzc19wZXJjZW50LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dBZFByb2dyZXNzID0gc2hvd0FkUHJvUGVyY2VudHNbdXRpbHMubHVja0JveFNob3dDb3VudF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2x1Y2tfYm94X2FkX3R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCI1XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dBZFByb2dyZXNzID0gMC40NTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0FkUHJvZ3Jlc3MgPSAwLjM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgICAgICAgICAgLy/mj5LlsY/ngrnlh7vov5vluqbotoXov4cwLjPlsLHosIPnlKjlub/lkYpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0FkUHJvZ3Jlc3MgPSAwLjg1O1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgXCI0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dBZFByb2dyZXNzID0gMC44NTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd0FkUHJvZ3Jlc3MgPSAwLjQ1O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1dGlscy5zaG93TG9nKGDlubjov5Dlrp3nrrHmmL7npLrnsbvlnovvvJoke3RoaXMuX2x1Y2tfYm94X2FkX3R5cGV9ICNzaG93QnRuVGltZT0ke3RoaXMuX2RlbGF5X3Nob3dfYnRuX3RpbWV9ICNwcm9ncmVzc2JhckJhY2tUaW1lPSR7dGhpcy5fbHVja19ib3hfcHJvZ3Jlc3NiYXJfYmFja190aW1lfWApO1xuXG5cblxuXG5cbiAgICAgICAgaWYgKHRoaXMuX2x1Y2tfYm94X2FkX3R5cGUgIT0gXCI0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idG5MYWJlbC5ub2RlICYmIGNjLmlzVmFsaWQodGhpcy5idG5MYWJlbC5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5MYWJlbC5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4zKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy5fZGVsYXlfc2hvd19idG5fdGltZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcubHVja19ib3hfdmlkZW9faWNvbl9pc19zaG93ICYmIHV0aWxzLlNlcnZlckNvbmZpZy5sdWNrX2JveF92aWRlb19pY29uX2lzX3Nob3cgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9JY29uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvSWNvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgaWYgKHRoaXMuX2x1Y2tfYm94X2FkX3R5cGUgPT0gXCIxXCIpIHtcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xuXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSU9TICYmIFBsYXRVdGlscy5Jc1FRKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGlja0J0biAmJiBjYy5pc1ZhbGlkKHRoaXMuY2xpY2tCdG4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuLnNldFBvc2l0aW9uKHRoaXMuY2xpY2tCdG4ueCwgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLnBvc2l0aW9uLnkgLSAyMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuLmdldENvbXBvbmVudChjYy5XaWRnZXQpLmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG4uZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuLnNldFBvc2l0aW9uKHRoaXMuY2xpY2tCdG4ueCwgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLnBvc2l0aW9uLnkgLSAyMDApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyB0aGlzLmJveE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMSwgMS4zKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNJbigxLjApKSwgY2Muc2NhbGVUbygxLCAxKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMy4wKSksIGNjLmRlbGF5VGltZSgxKSkucmVwZWF0Rm9yZXZlcigpKVxuICAgIH1cblxuXG4gICAgX29wZW5TbG93RG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIF90aW1ldGFza0lkOiBudW1iZXIgPSAwO1xuICAgIF9jYW5jZWxTbG93RG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNsaWNrQnRuVG91Y2hDYW5jZWwoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1ldGFza0lkKTtcbiAgICAgICAgdGhpcy5fdGltZXRhc2tJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb3BlblNsb3dEb3duID0gdHJ1ZTtcbiAgICAgICAgfSwgdGhpcy5fbHVja19ib3hfcHJvZ3Jlc3NiYXJfYmFja190aW1lICogMTAwMCk7XG4gICAgfVxuXG5cbiAgICBfc2xvd0Rvd25TcGVlZDogbnVtYmVyID0gMC4yO1xuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA+IDAgJiYgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA8IDEgJiYgdGhpcy5fb3BlblNsb3dEb3duICYmICF0aGlzLl9jYW5jZWxTbG93RG93bikge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyAtPSBkdCAqIHRoaXMuX3Nsb3dEb3duU3BlZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgbGV0IHJhdGlvOiBudW1iZXIgPSAxO1xuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDE5MjAgKiAwLjY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFuZWwuc2NhbGUgPSByYXRpbztcbiAgICB9XG5cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSlcbiAgICAgICAgdXRpbHMuaGlkZVJlY29tbWVuZEdhbWVzQmFubmVyKCk7XG4gICAgICAgIGlmICh1dGlscy5yZXdhcmRMdWNrQm94UGFuZWxDbG9zZUZ1bmMpIHtcbiAgICAgICAgICAgIHV0aWxzLnJld2FyZEx1Y2tCb3hQYW5lbENsb3NlRnVuYygpO1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQm94UGFuZWxDbG9zZUZ1bmMgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jICYmIHV0aWxzLnJld2FyZENsb3NlRnVuYygpO1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMucGFuZWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAwKS5lYXNpbmcoY2MuZWFzZUJhY2tJbigpKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgfSkpKTtcbiAgICB9XG5cblxuICAgIF9wcm9ncmVzc3M6IG51bWJlciA9IDA7XG4gICAgX3RvdGFsUHJvZ3Jlc3M6IG51bWJlciA9IDU7XG4gICAgX2lzU2hvd0FkOiBib29sZWFuID0gZmFsc2U7XG4gICAgX3ZpZGVvSXNQbGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog54uC54K5XG4gICAgICovXG4gICAgb25CdG5DbGljaygpIHtcbiAgICAgICAgdGhpcy5fb3BlblNsb3dEb3duID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyArPSAwLjEwO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPj0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbkx1Y2tCb3goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52aWRlb0ljb24uYWN0aXZlICYmICF0aGlzLl92aWRlb0lzUGxheSkge1xuICAgICAgICAgICAgdGhpcy5fdmlkZW9Jc1BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dWaWRlbygocmVzLCBtc2cpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLojrflvpflpZblirEhICtcIiArIHRoaXMucmV3YXJkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogWVpfUmV3YXJkID0gbmV3IFlaX1Jld2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJld2FyZFZhbHVlID0gdGhpcy5yZXdhcmRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJld2FyZENhbGxGdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0lzUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhtc2cgPyBtc2cgOiBcIuinhumikeWKoOi9veWksei0pe+8gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLojrflvpflpZblirEhICtcIiArIHRoaXMucmV3YXJkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBZWl9SZXdhcmQgPSBuZXcgWVpfUmV3YXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZXdhcmRWYWx1ZSA9IHRoaXMucmV3YXJkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJld2FyZENhbGxGdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cblxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA+PSB0aGlzLl9zaG93QWRQcm9ncmVzcyAmJiAhdGhpcy5faXNTaG93QWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2hvd0FkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8x44CBYmFubmVy77yI6buY6K6k77yJIDLjgIHmj5LlsY8gM+OAgeebkuWtkOW5v+WRiiA044CB6KeG6aKR5bm/5ZGKIFxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9sdWNrX2JveF9hZF90eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruW5uOi/kOWuneeuseWxleekui1iYW5uZXLlub/lkYrvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKEJhbm5lckxvY2F0aW9uLkdhbWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrQnRuICYmIGNjLmlzVmFsaWQodGhpcy5jbGlja0J0bikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuLnNldFBvc2l0aW9uKHRoaXMuY2xpY2tCdG4ueCwgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLnBvc2l0aW9uLnkgLSAyMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCA5MDApXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCIyXCI6XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7lubjov5Dlrp3nrrHlsZXnpLot5o+S5bGP5bm/5ZGK77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd0ludGVyc3RpdGlhbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiM1wiOlxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5bm46L+Q5a6d566x5bGV56S6LeebkuWtkOW5v+WRiu+8gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dBcHBCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIFwiNFwiOlxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5bm46L+Q5a6d566x5bGV56S6LeinhumikeW5v+WRiu+8gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9JY29uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmZpbmQoXCJCYWNrZ3JvdW5kL2NsaWNrVHh0XCIsIHRoaXMuY2xpY2tCdG4pLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvLyBjYy5maW5kKFwiQmFja2dyb3VuZC9idG5fb2tcIiwgdGhpcy5jbGlja0J0bikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsU2xvd0Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idG5MYWJlbC5ub2RlICYmIGNjLmlzVmFsaWQodGhpcy5idG5MYWJlbC5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuTGFiZWwubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9kZWxheV9zaG93X2J0bl90aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIjVcIjpcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOmFjee9ruW5uOi/kOWuneeuseWxleekui3kupLmjqhiYW5uZXLlub/lkYrvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5bm46L+Q5a6d566x5bGV56S6YmFubmVy5bm/5ZGK77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd0Jhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGlja0J0biAmJiBjYy5pc1ZhbGlkKHRoaXMuY2xpY2tCdG4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bi5zZXRQb3NpdGlvbih0aGlzLmNsaWNrQnRuLngsIHRoaXMucHJvZ3Jlc3NCYXIubm9kZS5wb3NpdGlvbi55IC0gMjAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJk+W8gOWuneeusVxuICAgICAqL1xuICAgIG9wZW5MdWNrQm94KCkge1xuICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLmx1Y2tfYm94X3BsYXlfdmlkZW8gPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5VmlkZW8oKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcIuiOt+W+l+WlluWKsSEgK1wiICsgdGhpcy5yZXdhcmRWYWx1ZSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBZWl9SZXdhcmQgPSBuZXcgWVpfUmV3YXJkKCk7XG4gICAgICAgICAgICByZXN1bHQucmV3YXJkVmFsdWUgPSB0aGlzLnJld2FyZFZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkQ2FsbEZ1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSGlkZUJ0bigpIHtcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgfVxuXG5cbiAgICBvblBsYXlWaWRlbygpIHtcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dWaWRlbygocmV0LCBtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwi6I635b6X5aWW5YqxISArXCIgKyB0aGlzLnJld2FyZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZFZhbHVlID0gdGhpcy5yZXdhcmRWYWx1ZTtcbiAgICAgICAgICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoXCLlubjov5Dlrp3nrrEt6I635Y+W5aWW5Yqx5oiQ5Yqf77yBXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwi6I635b6X5aWW5YqxISArXCIgKyB0aGlzLnJld2FyZFZhbHVlKTtcbiAgICAgICAgICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoXCLlubjov5Dlrp3nrrEt6KeG6aKR5pKt5pS+5aSx6LSl77yBXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdDogWVpfUmV3YXJkID0gbmV3IFlaX1Jld2FyZCgpO1xuICAgICAgICAgICAgcmVzdWx0LnJld2FyZFZhbHVlID0gdGhpcy5yZXdhcmRWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJld2FyZENhbGxGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbn1cbiJdfQ==