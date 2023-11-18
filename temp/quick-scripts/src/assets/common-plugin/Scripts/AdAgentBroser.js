"use strict";
cc._RF.push(module, 'a4909rppFFL/JkiPVVbCFkk', 'AdAgentBroser');
// common-plugin/Scripts/AdAgentBroser.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var AdAgent_1 = require("./AdAgent");
var YZ_NativeBanner_1 = require("./YZ_NativeBanner");
var YZ_NativeInsert_1 = require("./YZ_NativeInsert");
var YZ_Constant_1 = require("./YZ_Constant");
var CommonConfig_1 = require("./CommonConfig");
var Utils_1 = require("./Utils");
var YZ_NativeAdObject_1 = require("./YZ_NativeAdObject");
var AdAgentBroser = /** @class */ (function (_super) {
    __extends(AdAgentBroser, _super);
    function AdAgentBroser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeBannerInfo = null;
        //当前显示Banner的位置
        _this._curLocation = YZ_Constant_1.BannerLocation.None;
        _this.signleNativeAd = null;
        _this._curNativeItem = null;
        return _this;
    }
    /**
     * 获取当前banner配置
     */
    AdAgentBroser.prototype.getNativeBannerInfo = function () {
        return new CommonConfig_1.NativeBannerInfo();
    };
    AdAgentBroser.prototype.ShowBanner = function (location) {
        if (location === void 0) { location = null; }
        if (this._curLocation != location) {
            this.HideBanner(location);
        }
        this._curLocation = location;
        if (this.getNativeBannerInfo().is_show_banner == -1) {
            Utils_1.utils.showLog("当前位置配置为不展示banner!");
            this.HideBanner(location);
            return;
        }
        if (!this._nativeBannerNode) {
            this._nativeBannerNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeBanner);
            cc.director.getScene().addChild(this._nativeBannerNode, 1000);
        }
        this._nativeBannerNode.active = true;
        var nativeBanner = this._nativeBannerNode.getComponent(YZ_NativeBanner_1.default);
        if (nativeBanner) {
            var addate = { title: "今日头条", desc: "看新闻用今日头条", imgUrlList: [Utils_1.utils.cur_tool.img_url], icon: Utils_1.utils.cur_tool.img_url };
            nativeBanner.init(null, addate, this.getNativeBannerInfo());
        }
        // utils.showRecommendGamesBanner();
    };
    AdAgentBroser.prototype.ShowInterstitial = function () {
        if (!this._nativeInsertNode) {
            this._nativeInsertNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeInsert);
            cc.director.getScene().addChild(this._nativeInsertNode, 9999);
        }
        this._nativeInsertNode.active = true;
        var nativeBanner = this._nativeInsertNode.getComponent(YZ_NativeInsert_1.default);
        if (nativeBanner) {
            var addate = { title: "今日头条", desc: "看新闻用今日头条", imgUrlList: [Utils_1.utils.cur_tool.img_url], icon: Utils_1.utils.cur_tool.img_url };
            nativeBanner.init(null, addate);
        }
        // utils.showRecommendGamesBanner();
    };
    AdAgentBroser.prototype.showStatementAds = function (data) {
        Utils_1.utils.adManager.ShowInterstitial();
        // utils.showCrossWidget6();
    };
    AdAgentBroser.prototype.HideBanner = function (location) {
        if (location === void 0) { location = null; }
        if (this._nativeBannerNode) {
            this._nativeBannerNode.active = false;
        }
        Utils_1.utils.hideRecommendGamesBanner();
    };
    AdAgentBroser.prototype.ShowVideo = function (callback) {
        callback(true, "视频播放成功!");
    };
    AdAgentBroser.prototype.showBeforGameOverAd = function (level, levelStatus, rewardValue, closeCallFunc, rewardFunc) {
        cc.log("显示结算前广告：  #Level= ", level, " #LevelStatys=", levelStatus, " #rewardValue = ", rewardValue);
        Utils_1.utils.currentLevel = level;
        Utils_1.utils.isSuccess = levelStatus == YZ_Constant_1.LevelStatus.GameWin;
        Utils_1.utils.rewardCallFunc = rewardFunc;
        Utils_1.utils.rewardCloseFunc = closeCallFunc;
        Utils_1.utils.rewardValue = rewardValue;
        var adType = Utils_1.utils.adManager.checkShowBeforGameOverAd(level, levelStatus == YZ_Constant_1.LevelStatus.GameWin);
        switch (adType) {
            case YZ_Constant_1.BeForGameOverAdId.SharePanel:
                Utils_1.utils.recordEnd();
                Utils_1.utils.showShareRecordPanel();
                break;
            case YZ_Constant_1.BeForGameOverAdId.GoldBox:
                Utils_1.utils.adManager.showRewardBoxPanel();
                break;
            case YZ_Constant_1.BeForGameOverAdId.Turntable:
                Utils_1.utils.adManager.showrewardTurnTablePanel();
                break;
            default:
                closeCallFunc && closeCallFunc();
                break;
        }
    };
    /**
     * 创建结算页面推广组件
     */
    AdAgentBroser.prototype.ShowSingleNativeAd = function (params) {
        if (Utils_1.utils.config.otherconfig.singleNativeAd) {
            if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
                this.signleNativeAd.destroy();
            }
            this.signleNativeAd = cc.instantiate(Utils_1.utils.config.otherconfig.singleNativeAd);
            var nativeItem = this.signleNativeAd.getComponent("YZ_NativeItem");
            nativeItem.showType = 2;
            nativeItem.params = params;
            this._curNativeItem = nativeItem;
            if (params && params.parent) {
                params.parent.addChild(this.signleNativeAd, cc.macro.MAX_ZINDEX);
            }
            var nativeObj = new YZ_NativeAdObject_1.default();
            var data = {
                imgUrlList: [Utils_1.utils.cur_tool.img_url],
                icon: Utils_1.utils.cur_tool.img_url,
                title: "爱奇艺视频",
                desc: "下载爱奇艺，即送VIP！"
            };
            nativeObj.data = data;
            nativeItem._nativeAd = nativeObj;
            this._curNativeItem.init(nativeObj);
            Utils_1.utils.showLog("单个原生广告创建成功！");
            return this.signleNativeAd;
        }
        else {
            Utils_1.utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
            return null;
        }
    };
    return AdAgentBroser;
}(AdAgent_1.default));
exports.default = AdAgentBroser;

cc._RF.pop();