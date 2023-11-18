
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fea03SQueFJo7iMSvZ2Vxkg', 'AdManager');
// common-plugin/Scripts/AdManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var AdAgentNative_1 = require("./AdAgentNative");
var AdAgentWechat_1 = require("./AdAgentWechat");
var AdAgentOPPO_1 = require("./AdAgentOPPO");
var AdAgentVIVO_1 = require("./AdAgentVIVO");
var AdAgentBaidu_1 = require("./AdAgentBaidu");
var AdAgentDouyin_1 = require("./AdAgentDouyin");
var YZ_Constant_1 = require("./YZ_Constant");
var AdAgentQQ_1 = require("./AdAgentQQ");
var AdAgentQTT_1 = require("./AdAgentQTT");
var Utils_1 = require("./Utils");
var AdAgentXiaomi_1 = require("./AdAgentXiaomi");
var AdAgent4399_1 = require("./AdAgent4399");
var AdAgentIOS_1 = require("./AdAgentIOS");
var AdAgentCocosplay_1 = require("./AdAgentCocosplay");
var AdAgentUC_1 = require("./AdAgentUC");
var AdAgentBili_1 = require("./AdAgentBili");
var AdAgentKwai_1 = require("./AdAgentKwai");
var AdAgentBroser_1 = require("./AdAgentBroser");
var BeforGameOverRecGamesPanel_1 = require("./BeforGameOverRecGamesPanel");
var AdAgentWiFi_1 = require("./AdAgentWiFi");
var AdAgentHago_1 = require("./AdAgentHago");
var AdAgentHuaWei_1 = require("./AdAgentHuaWei");
var AdAgentFaceBook_1 = require("./AdAgentFaceBook");
var YzCustomAdPanel_1 = require("./YzCustomAdPanel");
var AdAgentGoogleWeb_1 = require("./AdAgentGoogleWeb");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdManager = /** @class */ (function () {
    function AdManager() {
        this._curAdAgent = null;
        this.videoCallBack = null;
        this._lastShowGameOverAdType = YZ_Constant_1.BeForGameOverAdId.None;
        //结算前广告类型数组
        this.beforRewardTypes = [YZ_Constant_1.BeForGameOverAdId.SharePanel, YZ_Constant_1.BeForGameOverAdId.GoldBox, YZ_Constant_1.BeForGameOverAdId.Turntable, YZ_Constant_1.BeForGameOverAdId.CreateShortCut, YZ_Constant_1.BeForGameOverAdId.RecGame, YZ_Constant_1.BeForGameOverAdId.LuckBox];
        this.rewardBoxPanel = null;
        this.rewardRecGamePanel = null;
        this.rewardTurnTablePanel = null;
        this.rewardShortCutPanel = null;
        this._rewardLuckBoxPanel = null;
        this._insertLastShowTime = 0;
        this._customAdPanel = null;
    }
    AdManager.prototype.Init = function () {
        if (PlatUtils_1.default.IsNativeAndroid) {
            this._curAdAgent = new AdAgentNative_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsWechat) {
            this._curAdAgent = new AdAgentWechat_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsOPPO) {
            this._curAdAgent = new AdAgentOPPO_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsVIVO) {
            this._curAdAgent = new AdAgentVIVO_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsBaidu) {
            this._curAdAgent = new AdAgentBaidu_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsDouyin) {
            this._curAdAgent = new AdAgentDouyin_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsQQ) {
            this._curAdAgent = new AdAgentQQ_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsQTT) {
            this._curAdAgent = new AdAgentQTT_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsXiaoMi) {
            this._curAdAgent = new AdAgentXiaomi_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.ISUC) {
            this._curAdAgent = new AdAgentUC_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.ISCocos) {
            this._curAdAgent = new AdAgentCocosplay_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.Is4399) {
            this._curAdAgent = new AdAgent4399_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            this._curAdAgent = new AdAgentIOS_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsBili) {
            this._curAdAgent = new AdAgentBili_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsKwai) {
            this._curAdAgent = new AdAgentKwai_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsWiFi) {
            this._curAdAgent = new AdAgentWiFi_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsHago) {
            this._curAdAgent = new AdAgentHago_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsHuaWei) {
            this._curAdAgent = new AdAgentHuaWei_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsFaceBook) {
            this._curAdAgent = new AdAgentFaceBook_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsTest) {
            this._curAdAgent = new AdAgentBroser_1.default();
            this._curAdAgent.Init();
        }
        else if (PlatUtils_1.default.IsGoogleWeb) {
            this._curAdAgent = new AdAgentGoogleWeb_1.default();
            this._curAdAgent.Init();
        }
    };
    AdManager.prototype.OnUpdate = function (dt) { };
    /**
     * 显示浮窗广告挂件
     * @param params
     * ```
     * {
     * group:string
     * left:number
     * bottom:number
     * scale:number
     * parent:cc.Node
     * }
     * ```
     * @returns 生成的组件
     */
    AdManager.prototype.showNativeTryGameWidget = function (params) {
        if (params === void 0) { params = null; }
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示插屏时间未达限制！");
            return;
        }
        if (this._curAdAgent) {
            if (!Utils_1.utils.isShowNativeTryGamesWidget() || PlatUtils_1.default.IsHuaWei) {
                Utils_1.utils.showLog("不能显示原生抖动试玩");
                return;
            }
            this._curAdAgent.showNativeTryGameWidget(params);
        }
    };
    /**
     * 隐藏浮动试玩挂件
     */
    AdManager.prototype.hideNativeTryGameWidget = function () {
        if (this._curAdAgent) {
            this._curAdAgent.hideNativeTryGameWidget();
        }
    };
    /**
     * 展示开屏广告，当前只有华为平台生效
     */
    AdManager.prototype.showNativeSplashView = function (callBack) {
        if (callBack === void 0) { callBack = null; }
        if (PlatUtils_1.default.IsHuaWei) {
            if (this._curAdAgent) {
                this._curAdAgent.showNativeSplashView(callBack);
            }
            else {
                if (callBack) {
                    callBack();
                }
            }
        }
        else {
            if (callBack) {
                callBack();
            }
        }
    };
    /**
     * 显示广告条
     * @param location 位置
     * @param args 参数,控制广告条的宽度和位置,此参数只对微信平台有效,默认居中贴底显示.
     * {
     *  width: 广告条宽度,屏幕的百分比,取值范围0-1;
     *  bottom: 广告条距离屏幕底部的高度,单位是像素;
     * }
     */
    AdManager.prototype.ShowBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (args === void 0) { args = null; }
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (this._curAdAgent) {
            this._curAdAgent.ShowBanner(location, args);
        }
    };
    AdManager.prototype.HideBanner = function (location) {
        if (this._curAdAgent) {
            this._curAdAgent.HideBanner(location);
        }
    };
    AdManager.prototype.ShowInterstitial = function (localtion) {
        if (localtion === void 0) { localtion = YZ_Constant_1.BannerLocation.Home; }
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示插屏时间未达限制！");
            return;
        }
        if (!this.checkInsertAdTime()) {
            Utils_1.utils.showLog("显示插屏时间未达到间隔时间！");
            return;
        }
        if (this._curAdAgent) {
            this._curAdAgent.ShowInterstitial(localtion);
        }
    };
    /**
     * 播放视频广告
     * @param callback Function(ret:boolean,msg:string)
     * ret 看完视频返回true， 否则返回false
     * msg 播放失败的消息提示
     */
    AdManager.prototype.ShowVideo = function (callback) {
        if (this._curAdAgent) {
            this.videoCallBack = callback;
            this._curAdAgent.ShowVideo(callback);
        }
        else {
            if (callback)
                callback(false, "视频加载失败！");
        }
    };
    /**
     * 显示互动直弹广告
     * --目前仅支持趣头条平台
     */
    AdManager.prototype.showInteractiveAd = function () {
        if (this._curAdAgent) {
            this._curAdAgent.showInteractiveAd();
        }
    };
    /**
     * 显示QQ游戏盒子广告
     */
    AdManager.prototype.ShowAppBox = function (isMoreGame) {
        if (this._curAdAgent) {
            this._curAdAgent.ShowAppBox(isMoreGame);
        }
    };
    /**
    * 隐藏QQ游戏盒子广告
    * --目前仅支持QQ平台--
    */
    AdManager.prototype.HideAppBox = function () {
        if (this._curAdAgent) {
            this._curAdAgent.HideAppBox();
        }
    };
    /**
    * 显示激励插屏
    */
    AdManager.prototype.showRewardInsert = function () {
        if (this._curAdAgent) {
            Utils_1.utils.showLog("显示 RI");
            this._curAdAgent.showRewardInsert();
        }
    };
    /**
     * 隐藏激励插屏
     */
    AdManager.prototype.hideRewardInsert = function () {
        if (this._curAdAgent) {
            this._curAdAgent.hideRewardInsert();
        }
    };
    /**
     * 显示关闭按钮的Banner
     * @param location
     * @param closeBtn
     */
    AdManager.prototype.ShowCloseBtnBanner = function (location, args) {
        if (location === void 0) { location = YZ_Constant_1.BannerLocation.Home; }
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (this._curAdAgent) {
            this._curAdAgent.ShowCloseBtnBanner(location, args);
        }
    };
    /**
     * 显示结算窗口的推荐广告
     */
    AdManager.prototype.ShowStatementRecomment = function () {
        if (this._curAdAgent) {
            if (PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsVIVO) {
                return this._curAdAgent.ShowStatementRecomment();
            }
            else if (PlatUtils_1.default.IsWechat) {
                return Utils_1.utils.showCrossWidget6();
            }
        }
        return null;
    };
    /**
     * 获取原生广告数据
     */
    AdManager.prototype.getNativeAdData = function (args) {
        if (this._curAdAgent) {
            Utils_1.utils.showLog("adManager 获取原生广告");
            return this._curAdAgent.getNativeAdData(args);
        }
        return null;
    };
    /**
     * 显示结算页面广告
     * @param data 参数
     * oppo、微信平台结算广告特殊处理
     * 趣头条平台结算广告为互动直弹
     * vivo、抖音、qq、xiaomi、baidu平台结算界面广告为插屏
     */
    AdManager.prototype.showStatementAds = function (data) {
        var res = { "type": -1, "node": null };
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示结算页面广告时间未达限制！");
            return res;
        }
        if (this._curAdAgent) {
            if (PlatUtils_1.default.IsWechat || PlatUtils_1.default.IsBaidu) {
                return this._curAdAgent.showStatementAds(data);
            }
        }
        if (PlatUtils_1.default.IsQTT) {
            Utils_1.utils.adManager.showInteractiveAd();
        }
        else {
            Utils_1.utils.adManager.ShowInterstitial();
        }
        Utils_1.utils.showLog("非oppo和微信平台正常显示结算广告");
        return res;
    };
    AdManager.prototype.createNativeAd = function (params, yzItem) {
        if (params === void 0) { params = null; }
        if (this._curAdAgent) {
            this._curAdAgent.createNativeAd(params, yzItem);
        }
    };
    AdManager.prototype.hideKyxBanner = function () {
        if (this._curAdAgent) {
            this._curAdAgent.hideKyxBanner();
        }
    };
    AdManager.prototype.showBeforGameOverAd = function (level, levelStatus, rewardValue, closeCallFunc, rewardFunc) {
        if (PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsVIVO || PlatUtils_1.default.IsDouyin || PlatUtils_1.default.IsBaidu || PlatUtils_1.default.IsWechat || PlatUtils_1.default.IsQQ || PlatUtils_1.default.IsKwai || PlatUtils_1.default.IsNativeAndroid || PlatUtils_1.default.IsNativeIOS || Utils_1.utils._tool_Broswer || PlatUtils_1.default.IsWiFi || PlatUtils_1.default.IsHuaWei) {
            if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.befor_ad_min_level && Utils_1.utils.ServerConfig.befor_ad_min_level >= level) {
                Utils_1.utils.showLog(level + " >>\u670D\u52A1\u5668\u914D\u7F6E\u7ED3\u7B97\u524D\u5E7F\u544A\u5728" + Utils_1.utils.ServerConfig.befor_ad_min_level + "\u5173\u540E\u624D\u80FD\u663E\u793A\uFF01");
                closeCallFunc && closeCallFunc();
                return;
            }
            Utils_1.utils.showLog("显示结算前广告：  #Level= ", level, " #LevelStatys=", levelStatus, " #rewardValue = ", rewardValue);
            Utils_1.utils.currentLevel = level;
            Utils_1.utils.isSuccess = levelStatus == YZ_Constant_1.LevelStatus.GameWin;
            Utils_1.utils.rewardCallFunc = rewardFunc;
            Utils_1.utils.rewardCloseFunc = closeCallFunc;
            Utils_1.utils.rewardValue = rewardValue;
            // if (PlatUtils.IsNativeAndroid || CC_DEBUG) {
            //     if (utils.isSuccess) {
            //         utils.yzRedBagInfo.progress++;
            //     }
            //     if (utils.canShowRedBag() && utils.yzRedBagInfo.progress >= utils.yzRedBagInfo.totalProgress) {
            //         utils.showLog("当前红包进度已满，显示获得红包窗口！");
            //         utils.showOpenRedBagPanel({ showType: 2 });
            //         return;
            //     }
            // }
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
                case YZ_Constant_1.BeForGameOverAdId.CreateShortCut:
                    Utils_1.utils.adManager.showRewardShortCutPanel();
                    break;
                case YZ_Constant_1.BeForGameOverAdId.RecGame:
                    Utils_1.utils.adManager.showRecGamePanel();
                    break;
                case YZ_Constant_1.BeForGameOverAdId.LuckBox:
                    var show_level = Utils_1.utils.ServerConfig.reward_luck_box_show_level ? Utils_1.utils.ServerConfig.reward_luck_box_show_level : 0;
                    if (level > show_level) {
                        Utils_1.utils.adManager.showRewardLuckBoxPanel();
                    }
                    else {
                        Utils_1.utils.showLog("幸运宝箱间隔关卡未达到！");
                        closeCallFunc && closeCallFunc();
                        Utils_1.utils.rewardCloseFunc = null;
                    }
                    break;
                default:
                    closeCallFunc && closeCallFunc();
                    Utils_1.utils.rewardCloseFunc = null;
                    break;
            }
        }
        else {
            closeCallFunc && closeCallFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    //结算前广告显示方法
    AdManager.prototype.getRewardCloseAndShowCallFunc = function (index) {
        var result = null;
        switch (index) {
            case 1:
                result = Utils_1.utils.adManager.showShareRecordPanel;
                break;
            case 2:
                result = Utils_1.utils.adManager.showRewardBoxPanel;
                break;
            case 3:
                result = Utils_1.utils.adManager.showrewardTurnTablePanel;
                break;
            case 4:
                result = Utils_1.utils.adManager.showRewardShortCutPanel;
                break;
            case 5:
                result = Utils_1.utils.adManager.showRecGamePanel;
                break;
            case 6:
                result = Utils_1.utils.adManager.showRewardLuckBoxPanel;
                break;
        }
        return result;
    };
    /**
    * befor_game_over_share_interval 分享弹窗间隔 例如：1、2、3、4、5
    * befor_game_over_reward_box_interval 宝箱弹窗间隔 例如：1、2、3、4、5
    * befor_game_over_turntable_interval 转盘抽奖间隔 例如：1、2、3、4、5
    * befor_game_over_shortcut_interval  添加桌面间隔 例如：1、2、3、4、5
    *
    * befor_game_over_share_type 分享弹窗类型 例如： all、success、fail
    * befor_game_over_reward_box_type 宝箱弹窗类型 例如： all、success、fail
    * befor_game_over_turntable_type 抽奖弹窗类型 例如： all、success、fail
    * befor_game_over_shortcut_type 添加桌面间类型 例如： all、success、fail
    *
    * befor_game_over_sync_list 同时展示顺序 例如: 123、321、12、21、32
    * befor_game_over_sync_interval 同时展示间隔关卡数 例如：1、2、3、4、5
    * befor_game_over_sync_type 同时展示类型 例如： all、success、fail
    *
    * level 当前关卡   isSuccess是否胜利
    * @returns result : 1:分享弹窗，2:宝箱弹窗，3：转盘弹窗 4:快捷桌面添加 5:更多游戏列表 6、幸运宝箱
    */
    AdManager.prototype.checkShowBeforGameOverAd = function (level, isSuccess) {
        if (!this._curAdAgent || !Utils_1.utils.ServerConfig) {
            Utils_1.utils.showLog("组件初始化失败！");
            return YZ_Constant_1.BeForGameOverAdId.None;
        }
        var befor_game_over_reward_share_interval = Utils_1.utils.ServerConfig.befor_game_over_share_interval;
        var befor_game_over_reward_box_interval = Utils_1.utils.ServerConfig.befor_game_over_reward_box_interval;
        var befor_game_over_turntable_interval = Utils_1.utils.ServerConfig.befor_game_over_turntable_interval;
        var befor_game_over_shortcut_interval = Utils_1.utils.ServerConfig.auto_desktop_interval;
        var befor_game_over_rec_game_interval = Utils_1.utils.ServerConfig.befor_game_over_rec_game_interval;
        var befor_game_over_luck_box_interval = Utils_1.utils.ServerConfig.befor_game_over_luck_box_interval;
        var befor_game_over_reward_share_type = Utils_1.utils.ServerConfig.befor_game_over_share_type;
        var befor_game_over_reward_box_type = Utils_1.utils.ServerConfig.befor_game_over_reward_box_type;
        var befor_game_over_turntable_type = Utils_1.utils.ServerConfig.befor_game_over_turntable_type;
        var befor_game_over_rec_game_type = Utils_1.utils.ServerConfig.befor_game_over_rec_game_type;
        var befor_game_over_luck_box_type = Utils_1.utils.ServerConfig.befor_game_over_luck_box_type;
        var befor_game_over_shortcut_type = Utils_1.utils.ServerConfig.auto_desktop_type;
        var befor_game_over_is_sync = Utils_1.utils.ServerConfig.befor_game_over_sync_list;
        var befor_game_over_sync_interval = Utils_1.utils.ServerConfig.befor_game_over_sync_interval;
        var befor_game_over_sync_type = Utils_1.utils.ServerConfig.befor_game_over_sync_type;
        if (PlatUtils_1.default.IsTest) {
            // befor_game_over_turntable_type = "all";
            // befor_game_over_turntable_interval = 2;
            // befor_game_over_is_sync = "32";
            // befor_game_over_sync_interval = "1";
            // befor_game_over_sync_type = "all";
            // befor_game_over_rec_game_type = "all";
            // befor_game_over_rec_game_interval = 4;
            // befor_game_over_luck_box_type = "all";
            // befor_game_over_luck_box_interval = 1;
            befor_game_over_reward_box_type = "all";
            befor_game_over_reward_box_interval = 1;
        }
        var result = YZ_Constant_1.BeForGameOverAdId.None;
        var isShow = false;
        if (befor_game_over_is_sync) {
            Utils_1.utils.showLog("进入同步显示弹窗判断：", befor_game_over_is_sync, "<<interval=", befor_game_over_sync_interval, "<<<type", befor_game_over_sync_type);
            switch (befor_game_over_sync_type) {
                case "all":
                    isShow = true;
                    break;
                case "success":
                    isShow = isSuccess;
                    break;
                case "fail":
                    isShow = !isSuccess;
                    break;
            }
            if (isShow && befor_game_over_sync_interval && level % befor_game_over_sync_interval == 0) {
                var syncTypes = befor_game_over_is_sync.split("");
                for (var i = 0; i < syncTypes.length; i++) {
                    if (i == 0) {
                        result = this.beforRewardTypes[parseInt(syncTypes[i]) - 1];
                    }
                    var closeFunc = null;
                    if (i == syncTypes.length - 1) {
                        closeFunc = Utils_1.utils.rewardCloseFunc;
                    }
                    else {
                        closeFunc = this.getRewardCloseAndShowCallFunc(parseInt(syncTypes[i + 1]));
                    }
                    switch (syncTypes[i]) {
                        case "1":
                            Utils_1.utils.shareRecordPanelCloseFunc = closeFunc;
                            break;
                        case "2":
                            Utils_1.utils.rewardBoxPanelCloseFunc = closeFunc;
                            break;
                        case "3":
                            Utils_1.utils.turnTablePanelCloseFunc = closeFunc;
                            break;
                        case "4":
                            Utils_1.utils.rewardShortCutPanelCloseFunc = closeFunc;
                            break;
                        case "5":
                            Utils_1.utils.rewardRecGamePanelCloseFunc = closeFunc;
                            break;
                        case "6":
                            Utils_1.utils.rewardLuckBoxPanelCloseFunc = closeFunc;
                            break;
                    }
                }
            }
        }
        else {
            var showCount = 0;
            if (befor_game_over_reward_share_type) {
                showCount++;
            }
            if (befor_game_over_reward_box_type) {
                showCount++;
            }
            if (befor_game_over_turntable_type) {
                showCount++;
            }
            if (befor_game_over_shortcut_type) {
                showCount++;
            }
            if (befor_game_over_luck_box_type) {
                showCount++;
            }
            Utils_1.utils.showLog("显示的类型" + showCount + "种，进行顺序切换判断,上一次显示的类型为：" + this._lastShowGameOverAdType);
            isShow = true;
            if (befor_game_over_reward_share_interval && level % befor_game_over_reward_share_interval == 0) {
                Utils_1.utils.showLog("进入显示分享奖励弹窗判断", befor_game_over_reward_share_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != YZ_Constant_1.BeForGameOverAdId.SharePanel;
                }
                if (isShow) {
                    switch (befor_game_over_reward_share_type) {
                        case "all":
                            Utils_1.utils.showLog("\u95F4\u9694" + befor_game_over_reward_share_interval + "\u5173\uFF0C\u663E\u793A\u5206\u4EAB\u5956\u52B1\u5F39\u7A97\uFF01");
                            result = YZ_Constant_1.BeForGameOverAdId.SharePanel;
                            break;
                        case "success":
                            if (isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.SharePanel;
                                Utils_1.utils.showLog("\u6E38\u620F\u80DC\u5229 >> \u95F4\u9694" + befor_game_over_reward_share_interval + "\u5173\uFF0C\u663E\u793A\u5206\u4EAB\u5956\u52B1\u5F39\u7A97\uFF01");
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.SharePanel;
                                Utils_1.utils.showLog("\u6E38\u620F\u5931\u8D25 >> \u95F4\u9694" + befor_game_over_reward_share_interval + "\u5173\uFF0C\u663E\u793A\u5206\u4EAB\u5956\u52B1\u5F39\u7A97\uFF01");
                            }
                            break;
                    }
                }
            }
            if (result != YZ_Constant_1.BeForGameOverAdId.None) {
                Utils_1.utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }
            if (befor_game_over_reward_box_interval && level % befor_game_over_reward_box_interval == 0) {
                Utils_1.utils.showLog("进入显示宝箱判断", befor_game_over_reward_box_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != YZ_Constant_1.BeForGameOverAdId.GoldBox;
                }
                if (isShow) {
                    switch (befor_game_over_reward_box_type) {
                        case "all":
                            result = YZ_Constant_1.BeForGameOverAdId.GoldBox;
                            Utils_1.utils.showLog("\u95F4\u9694" + befor_game_over_reward_box_interval + "\u5173\uFF0C\u663E\u793A\u5B9D\u7BB1\u5F39\u7A97\uFF01");
                            break;
                        case "success":
                            if (isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.GoldBox;
                                Utils_1.utils.showLog("\u6E38\u620F\u80DC\u5229 >> \u95F4\u9694" + befor_game_over_reward_box_interval + "\u5173\uFF0C\u663E\u793A\u5B9D\u7BB1\u5F39\u7A97\uFF01");
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.GoldBox;
                                Utils_1.utils.showLog("\u6E38\u620F\u5931\u8D25 >> \u95F4\u9694" + befor_game_over_reward_box_interval + "\u5173\uFF0C\u663E\u793A\u5B9D\u7BB1\u5F39\u7A97\uFF01");
                            }
                            break;
                    }
                }
            }
            if (result != YZ_Constant_1.BeForGameOverAdId.None) {
                Utils_1.utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }
            if (befor_game_over_turntable_interval && level % befor_game_over_turntable_interval == 0) {
                Utils_1.utils.showLog("进入显示抽奖弹窗判断", befor_game_over_turntable_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != YZ_Constant_1.BeForGameOverAdId.Turntable;
                }
                if (isShow) {
                    switch (befor_game_over_turntable_type) {
                        case "all":
                            result = YZ_Constant_1.BeForGameOverAdId.Turntable;
                            Utils_1.utils.showLog("\u95F4\u9694" + befor_game_over_turntable_interval + "\u5173\uFF0C\u663E\u793A\u62BD\u5956\u5F39\u7A97\uFF01");
                            break;
                        case "success":
                            if (isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.Turntable;
                                Utils_1.utils.showLog("\u6E38\u620F\u80DC\u5229 >> \u95F4\u9694" + befor_game_over_turntable_interval + "\u5173\uFF0C\u663E\u793A\u62BD\u5956\u5F39\u7A97\uFF01");
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.Turntable;
                                Utils_1.utils.showLog("\u6E38\u620F\u5931\u8D25 >> \u95F4\u9694" + befor_game_over_turntable_interval + "\u5173\uFF0C\u663E\u793A\u62BD\u5956\u5F39\u7A97\uFF01");
                            }
                            break;
                    }
                }
            }
            if (result != YZ_Constant_1.BeForGameOverAdId.None) {
                Utils_1.utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }
            if (befor_game_over_shortcut_interval && level % befor_game_over_shortcut_interval == 0) {
                Utils_1.utils.showLog("进入显示添加桌面弹窗判断", befor_game_over_shortcut_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != YZ_Constant_1.BeForGameOverAdId.CreateShortCut;
                }
                if (isShow) {
                    switch (befor_game_over_shortcut_type) {
                        case "all":
                            result = YZ_Constant_1.BeForGameOverAdId.CreateShortCut;
                            Utils_1.utils.showLog("\u95F4\u9694" + befor_game_over_shortcut_interval + "\u5173\uFF0C\u663E\u793A\u6DFB\u52A0\u684C\u9762\u5F39\u7A97\uFF01");
                            break;
                        case "success":
                            if (isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.CreateShortCut;
                                Utils_1.utils.showLog("\u6E38\u620F\u80DC\u5229 >> \u95F4\u9694" + befor_game_over_shortcut_interval + "\u5173\uFF0C\u663E\u793A\u6DFB\u52A0\u684C\u9762\u5F39\u7A97\uFF01");
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.CreateShortCut;
                                Utils_1.utils.showLog("\u6E38\u620F\u5931\u8D25 >> \u95F4\u9694" + befor_game_over_shortcut_interval + "\u5173\uFF0C\u663E\u793A\u6DFB\u52A0\u684C\u9762\u5F39\u7A97\uFF01");
                            }
                            break;
                    }
                }
            }
            else {
                Utils_1.utils.showLog("结算前广告验证完成，不显示结算前广告！");
            }
            if (result != YZ_Constant_1.BeForGameOverAdId.None) {
                Utils_1.utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }
            if (befor_game_over_rec_game_interval && level % befor_game_over_rec_game_interval == 0) {
                Utils_1.utils.showLog("进入显示游戏推荐弹窗判断", befor_game_over_rec_game_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != YZ_Constant_1.BeForGameOverAdId.RecGame;
                }
                if (isShow) {
                    switch (befor_game_over_rec_game_type) {
                        case "all":
                            result = YZ_Constant_1.BeForGameOverAdId.RecGame;
                            Utils_1.utils.showLog("\u95F4\u9694" + befor_game_over_rec_game_interval + "\u5173\uFF0C\u663E\u793A\u6E38\u620F\u63A8\u8350\u5F39\u7A97\uFF01");
                            break;
                        case "success":
                            if (isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.RecGame;
                                Utils_1.utils.showLog("\u6E38\u620F\u80DC\u5229 >> \u95F4\u9694" + befor_game_over_rec_game_interval + "\u5173\uFF0C\u663E\u793A\u6E38\u620F\u63A8\u8350\u5F39\u7A97\uFF01");
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.RecGame;
                                Utils_1.utils.showLog("\u6E38\u620F\u5931\u8D25 >> \u95F4\u9694" + befor_game_over_rec_game_interval + "\u5173\uFF0C\u663E\u793A\u6E38\u620F\u63A8\u8350\u5F39\u7A97\uFF01");
                            }
                            break;
                    }
                }
            }
            else {
                Utils_1.utils.showLog("结算前广告验证完成，不显示更多游戏广告！");
            }
            if (result != YZ_Constant_1.BeForGameOverAdId.None) {
                Utils_1.utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }
            if (befor_game_over_luck_box_interval && level % befor_game_over_luck_box_interval == 0) {
                Utils_1.utils.showLog("进入显示幸运宝箱弹窗判断", befor_game_over_luck_box_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != YZ_Constant_1.BeForGameOverAdId.LuckBox;
                }
                if (isShow) {
                    switch (befor_game_over_luck_box_type) {
                        case "all":
                            result = YZ_Constant_1.BeForGameOverAdId.LuckBox;
                            Utils_1.utils.showLog("\u95F4\u9694" + befor_game_over_luck_box_interval + "\u5173\uFF0C\u663E\u793A\u6E38\u620F\u63A8\u8350\u5F39\u7A97\uFF01");
                            break;
                        case "success":
                            if (isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.LuckBox;
                                Utils_1.utils.showLog("\u6E38\u620F\u80DC\u5229 >> \u95F4\u9694" + befor_game_over_luck_box_interval + "\u5173\uFF0C\u663E\u793A\u6E38\u620F\u63A8\u8350\u5F39\u7A97\uFF01");
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = YZ_Constant_1.BeForGameOverAdId.LuckBox;
                                Utils_1.utils.showLog("\u6E38\u620F\u5931\u8D25 >> \u95F4\u9694" + befor_game_over_luck_box_interval + "\u5173\uFF0C\u663E\u793A\u6E38\u620F\u63A8\u8350\u5F39\u7A97\uFF01");
                            }
                            break;
                    }
                }
            }
            else {
                Utils_1.utils.showLog("结算前广告验证完成，不显示幸运宝箱弹窗！");
            }
        }
        Utils_1.utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
        this._lastShowGameOverAdType = result;
        return result;
    };
    /**
    * 显示录屏分享窗口
    * @param params
    */
    AdManager.prototype.showShareRecordPanel = function (params) {
        if (params === void 0) { params = null; }
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (Utils_1.utils.config.otherconfig.shareRecordPanel) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.shareRecordPanel);
            if (node) {
                if (Utils_1.utils.shareRecordPanel && cc.isValid(Utils_1.utils.shareRecordPanel)) {
                    Utils_1.utils.shareRecordPanel.destroy();
                }
                Utils_1.utils.shareRecordPanel = node;
                Utils_1.utils.shareRecordPanel.zIndex = 9999;
                var widget = node.getComponent(cc.Widget);
                if (params) {
                    if (params.group) {
                        node.group = params.group;
                    }
                    if (params.scale != null) {
                        node.scale = params.scale;
                    }
                    if (params.top != null) {
                        widget.isAlignTop = true;
                        widget.isAlignBottom = false;
                        widget.top = params.top;
                    }
                    else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    }
                    else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    }
                    else {
                        cc.director.getScene().addChild(Utils_1.utils.shareRecordPanel, 1000);
                    }
                }
                else {
                    cc.director.getScene().addChild(Utils_1.utils.shareRecordPanel, 1000);
                }
                widget.updateAlignment();
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 ShareRecordPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
    * 显示宝箱窗口
    * @param params
    */
    AdManager.prototype.showRewardBoxPanel = function () {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (Utils_1.utils.config.otherconfig.rewardBoxPanel) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.rewardBoxPanel);
            if (node) {
                if (this.rewardBoxPanel && cc.isValid(this.rewardBoxPanel)) {
                    this.rewardBoxPanel.destroy();
                }
                this.rewardBoxPanel = node;
                this.rewardBoxPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 rewardBoxPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
    * 显示更多游戏推荐窗口
    * @param params
    */
    AdManager.prototype.showRecGamePanel = function () {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (Utils_1.utils.config.otherconfig.beforGameOverRecGamesPanel && Utils_1.utils.getRecommondGameList()) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.beforGameOverRecGamesPanel);
            if (node) {
                if (this.rewardRecGamePanel && cc.isValid(this.rewardRecGamePanel)) {
                    this.rewardRecGamePanel.destroy();
                }
                this.rewardRecGamePanel = node;
                this.rewardRecGamePanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                var recMoreGame = this.rewardRecGamePanel.getComponent(BeforGameOverRecGamesPanel_1.default);
                recMoreGame._location = YZ_Constant_1.SubLocation.isBeforGameOverAd;
                recMoreGame.init(Utils_1.utils.getRecommondGameList());
                recMoreGame.show();
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 moreGamesPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
    * 显示转盘抽奖窗口
    * @param params
    */
    AdManager.prototype.showrewardTurnTablePanel = function () {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (Utils_1.utils.config.otherconfig.rewardTurnTablePanel) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.rewardTurnTablePanel);
            if (node) {
                if (this.rewardTurnTablePanel && cc.isValid(this.rewardTurnTablePanel)) {
                    this.rewardTurnTablePanel.destroy();
                }
                this.rewardTurnTablePanel = node;
                this.rewardTurnTablePanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 rewardTurnTablePanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
    * 显示转盘抽奖窗口
    * @param params
    */
    AdManager.prototype.showRewardShortCutPanel = function () {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (Utils_1.utils.config.otherconfig.rewardShortCutPanel) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.rewardShortCutPanel);
            if (node) {
                if (this.rewardShortCutPanel && cc.isValid(this.rewardShortCutPanel)) {
                    this.rewardShortCutPanel.destroy();
                }
                this.rewardShortCutPanel = node;
                this.rewardShortCutPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 rewardShortCutPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
    * 展示幸运宝箱弹窗
    * @param params
    */
    AdManager.prototype.showRewardLuckBoxPanel = function () {
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (Utils_1.utils.config.otherconfig.rewardLuckBoxPanel) {
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.rewardLuckBoxPanel);
            if (node) {
                if (this._rewardLuckBoxPanel && cc.isValid(this._rewardLuckBoxPanel)) {
                    this._rewardLuckBoxPanel.destroy();
                }
                this._rewardLuckBoxPanel = node;
                this._rewardLuckBoxPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 RewardLuckBoxPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    /**
     * 验证广告显示时间是否达到
     * @returns true:大于服务器时间  false:小于服务器时间
     */
    AdManager.prototype.checkShowAdTime = function () {
        // if (CC_DEBUG) return true;
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }
        var curTime = new Date().getTime();
        var interval = (curTime - Utils_1.utils._gameEntryTime) / 1000;
        var showAdTime = 0;
        if (PlatUtils_1.default.IsOPPO) {
            showAdTime = 90;
        }
        if (Utils_1.utils.getConfigByKey("show_ad_time") !== "") {
            showAdTime = Utils_1.utils.getConfigByKey("show_ad_time");
        }
        Utils_1.utils.showLog("验证当前广告显示时间：#showAdTime=", showAdTime, " #interval=", interval);
        if (interval >= showAdTime) {
            return true;
        }
        return false;
    };
    /**
     * 验证是否能够显示插屏
     * @returns true 可以显示，false 未达到要求不显示
     */
    AdManager.prototype.checkInsertAdTime = function () {
        // utils.ServerConfig.insert_ad_interval_time = 5;
        if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.insert_ad_interval_time) {
            var curTime = new Date().getTime();
            var interval = (curTime - this._insertLastShowTime) / 1000;
            if (interval < Utils_1.utils.ServerConfig.insert_ad_interval_time) {
                Utils_1.utils.showLog("验证当前插屏广告显示时间：#showAdTime=", Utils_1.utils.ServerConfig.insert_ad_interval_time, " #interval=", interval);
                return false;
            }
            this._insertLastShowTime = curTime;
        }
        return true;
    };
    /**
     * 显示积木广告
     * @param parme {top,bottom}
     */
    AdManager.prototype.showBlockAd = function (parme) {
        if (this._curAdAgent && PlatUtils_1.default.IsQQ) {
            this._curAdAgent.showBlockAd(parme);
        }
    };
    AdManager.prototype.hideBlockAd = function (parme) {
        if (this._curAdAgent && PlatUtils_1.default.IsQQ) {
            this._curAdAgent.hideBlockAd();
        }
    };
    /**
     * 显示全屏视频广告
     * @param callback
     */
    AdManager.prototype.showFullScreenVideo = function (callback) {
        if (this._curAdAgent) {
            // this.videoCallBack = callback;
            this._curAdAgent.showFullScreenVideo(callback);
        }
        else {
            if (callback)
                callback(false, "视频加载失败！");
        }
    };
    /**
     * 显示单个原生广告
     * @param params
     */
    AdManager.prototype.ShowSingleNativeAd = function (params) {
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示广告条时间未达限制！");
            return;
        }
        if (this._curAdAgent) {
            this._curAdAgent.ShowSingleNativeAd && this._curAdAgent.ShowSingleNativeAd(params);
        }
    };
    /**
     * 隐藏单个原生广告
     * @param params
     */
    AdManager.prototype.HideSingleNativeAd = function (params) {
        if (this._curAdAgent) {
            this._curAdAgent.HideSingleNativeAd && this._curAdAgent.HideSingleNativeAd(params);
        }
    };
    /**
     * 显示模版广告
     * @param parmas
     */
    AdManager.prototype.showCustomAd = function (params) {
        if (!this.checkShowAdTime()) {
            Utils_1.utils.showLog("显示原生模版广告时间未达限制！");
            return;
        }
        if (this._curAdAgent) {
            this._curAdAgent.showCustomAd && this._curAdAgent.showCustomAd(params);
        }
    };
    /**
    * 隐藏模版广告
    * @param parmas
    */
    AdManager.prototype.hideCustomAd = function (params) {
        if (this._curAdAgent) {
            this._curAdAgent.hideCustomAd && this._curAdAgent.hideCustomAd(params);
        }
    };
    /**
     * 显示模版弹窗广告
     * level: 当前关卡数
     * closeCallFunc:Function 关闭后的回调
     */
    AdManager.prototype.showCustomAdPanel = function (level, closeCallFunc) {
        Utils_1.utils.showLog("显示模版弹窗广告");
        if (!Utils_1.utils._isConfigInit) {
            Utils_1.utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        var customAdInfo = null;
        if (PlatUtils_1.default.IsWechat) {
            customAdInfo = Utils_1.utils.config.wechatconfig.getCustomAdInfoInfo(100);
            if (!customAdInfo) {
                closeCallFunc && closeCallFunc();
                Utils_1.utils.showLog("服务器未配置模版弹窗广告");
                return;
            }
        }
        else {
            closeCallFunc && closeCallFunc();
            Utils_1.utils.showLog("服务器未配置模版弹窗广告");
            return;
        }
        var custom_panel_show_ad_level = Utils_1.utils.getConfigByKey("custom_panel_show_ad_level");
        if (custom_panel_show_ad_level && level % custom_panel_show_ad_level != 0) {
            closeCallFunc && closeCallFunc();
            Utils_1.utils.showLog("服务器配置间隔" + custom_panel_show_ad_level + "关显示模版弹窗广告!");
            return;
        }
        if (Utils_1.utils.config.otherconfig.yzCustomAdPanel) {
            if (this._curAdAgent) {
                this._curAdAgent.createCustomADBanner();
            }
            var node = cc.instantiate(Utils_1.utils.config.otherconfig.yzCustomAdPanel);
            node.getComponent(YzCustomAdPanel_1.default).closeCallFunc = closeCallFunc;
            if (node) {
                if (this._customAdPanel && cc.isValid(this._customAdPanel)) {
                    this._customAdPanel.destroy();
                }
                this._customAdPanel = node;
                this._customAdPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        }
        else {
            Utils_1.utils.showLog("未找到预制体 CustomAdPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    };
    AdManager = __decorate([
        ccclass
    ], AdManager);
    return AdManager;
}());
exports.default = AdManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLGlEQUE0QztBQUM1QyxpREFBNEM7QUFDNUMsNkNBQXdDO0FBQ3hDLDZDQUF3QztBQUN4QywrQ0FBMEM7QUFDMUMsaURBQTRDO0FBQzVDLDZDQUE0RjtBQUM1Rix5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLGlDQUFnQztBQUVoQyxpREFBNEM7QUFDNUMsNkNBQXdDO0FBQ3hDLDJDQUFzQztBQUN0Qyx1REFBa0Q7QUFDbEQseUNBQW9DO0FBQ3BDLDZDQUF3QztBQUV4Qyw2Q0FBd0M7QUFDeEMsaURBQTRDO0FBRTVDLDJFQUFzRTtBQUN0RSw2Q0FBd0M7QUFDeEMsNkNBQXdDO0FBQ3hDLGlEQUE0QztBQUM1QyxxREFBZ0Q7QUFFaEQscURBQWdEO0FBQ2hELHVEQUFrRDtBQUU1QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFBO1FBRVksZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFN0Isa0JBQWEsR0FBYSxJQUFJLENBQUM7UUErWXRDLDRCQUF1QixHQUFzQiwrQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDcEUsV0FBVztRQUNYLHFCQUFnQixHQUF3QixDQUFDLCtCQUFpQixDQUFDLFVBQVUsRUFBRSwrQkFBaUIsQ0FBQyxPQUFPLEVBQUUsK0JBQWlCLENBQUMsU0FBUyxFQUFFLCtCQUFpQixDQUFDLGNBQWMsRUFBRSwrQkFBaUIsQ0FBQyxPQUFPLEVBQUUsK0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUEwYnZOLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBNkIvQix1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFtQ25DLHlCQUFvQixHQUFZLElBQUksQ0FBQztRQTRCckMsd0JBQW1C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InNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkQWdlbnQgZnJvbSBcIi4vQWRBZ2VudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgQWRBZ2VudE5hdGl2ZSBmcm9tIFwiLi9BZEFnZW50TmF0aXZlXCI7XHJcbmltcG9ydCBBZEFnZW50V2VjaGF0IGZyb20gXCIuL0FkQWdlbnRXZWNoYXRcIjtcclxuaW1wb3J0IEFkQWdlbnRPUFBPIGZyb20gXCIuL0FkQWdlbnRPUFBPXCI7XHJcbmltcG9ydCBBZEFnZW50VklWTyBmcm9tIFwiLi9BZEFnZW50VklWT1wiO1xyXG5pbXBvcnQgQWRBZ2VudEJhaWR1IGZyb20gXCIuL0FkQWdlbnRCYWlkdVwiO1xyXG5pbXBvcnQgQWRBZ2VudERvdXlpbiBmcm9tIFwiLi9BZEFnZW50RG91eWluXCI7XHJcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uLCBMZXZlbFN0YXR1cywgQmVGb3JHYW1lT3ZlckFkSWQsIFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IEFkQWdlbnRRUSBmcm9tIFwiLi9BZEFnZW50UVFcIjtcclxuaW1wb3J0IEFkQWdlbnRRVFQgZnJvbSBcIi4vQWRBZ2VudFFUVFwiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9OYXRpdmVJdGVtIGZyb20gXCIuL1laX05hdGl2ZUl0ZW1cIjtcclxuaW1wb3J0IEFkQWdlbnRYaWFvTWkgZnJvbSBcIi4vQWRBZ2VudFhpYW9taVwiO1xyXG5pbXBvcnQgQWRBZ2VudDQzOTkgZnJvbSBcIi4vQWRBZ2VudDQzOTlcIjtcclxuaW1wb3J0IEFkQWdlbnRJT1MgZnJvbSBcIi4vQWRBZ2VudElPU1wiO1xyXG5pbXBvcnQgQWRBZ2VudENvY29zcGxheSBmcm9tIFwiLi9BZEFnZW50Q29jb3NwbGF5XCI7XHJcbmltcG9ydCBBZEFnZW50VUMgZnJvbSBcIi4vQWRBZ2VudFVDXCI7XHJcbmltcG9ydCBBZEFnZW50QmlsaSBmcm9tIFwiLi9BZEFnZW50QmlsaVwiO1xyXG5pbXBvcnQgTmF0aXZlVHJ5R2FtZXNXaWRnZXQgZnJvbSBcIi4vTmF0aXZlVHJ5R2FtZXNXaWRnZXRcIjtcclxuaW1wb3J0IEFkQWdlbnRLd2FpIGZyb20gXCIuL0FkQWdlbnRLd2FpXCI7XHJcbmltcG9ydCBBZEFnZW50QnJvc2VyIGZyb20gXCIuL0FkQWdlbnRCcm9zZXJcIjtcclxuaW1wb3J0IE1vcmVHYW1lc1BhbmVsIGZyb20gXCIuL01vcmVHYW1lc1BhbmVsXCI7XHJcbmltcG9ydCBCZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbCBmcm9tIFwiLi9CZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbFwiO1xyXG5pbXBvcnQgQWRBZ2VudFdpRmkgZnJvbSBcIi4vQWRBZ2VudFdpRmlcIjtcclxuaW1wb3J0IEFkQWdlbnRIYWdvIGZyb20gXCIuL0FkQWdlbnRIYWdvXCI7XHJcbmltcG9ydCBBZEFnZW50SHVhV2VpIGZyb20gXCIuL0FkQWdlbnRIdWFXZWlcIjtcclxuaW1wb3J0IEFkQWdlbnRGYWNlQm9vayBmcm9tIFwiLi9BZEFnZW50RmFjZUJvb2tcIjtcclxuaW1wb3J0IHsgQ3VzdG9tQWRJbmZvIH0gZnJvbSBcIi4vQ29tbW9uQ29uZmlnXCI7XHJcbmltcG9ydCBZekN1c3RvbUFkUGFuZWwgZnJvbSBcIi4vWXpDdXN0b21BZFBhbmVsXCI7XHJcbmltcG9ydCBBZEFnZW50R29vZ2xlV2ViIGZyb20gXCIuL0FkQWdlbnRHb29nbGVXZWJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2N1ckFkQWdlbnQ6IEFkQWdlbnQgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyB2aWRlb0NhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50ID0gbmV3IEFkQWdlbnROYXRpdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5Jbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50V2VjaGF0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50ID0gbmV3IEFkQWdlbnRPUFBPKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50ID0gbmV3IEFkQWdlbnRWSVZPKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzQmFpZHUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50QmFpZHUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5Jbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50RG91eWluKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50UVEoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5Jbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNRVFQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50UVRUKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQgPSBuZXcgQWRBZ2VudFhpYW9NaSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5JU1VDKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQgPSBuZXcgQWRBZ2VudFVDKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklTQ29jb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50Q29jb3NwbGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzNDM5OSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50ID0gbmV3IEFkQWdlbnQ0Mzk5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlSU9TKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQgPSBuZXcgQWRBZ2VudElPUygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JpbGkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50QmlsaSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0t3YWkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50S3dhaSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1dpRmkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50V2lGaSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50SGFnbygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50ID0gbmV3IEFkQWdlbnRIdWFXZWkoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5Jbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNGYWNlQm9vaykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50ID0gbmV3IEFkQWdlbnRGYWNlQm9vaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1Rlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudCA9IG5ldyBBZEFnZW50QnJvc2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzR29vZ2xlV2ViKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQgPSBuZXcgQWRBZ2VudEdvb2dsZVdlYigpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9uVXBkYXRlKGR0OiBudW1iZXIpIHsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmta7nqpflub/lkYrmjILku7ZcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKiBgYGBcclxuICAgICAqIHtcclxuICAgICAqIGdyb3VwOnN0cmluZ1xyXG4gICAgICogbGVmdDpudW1iZXJcclxuICAgICAqIGJvdHRvbTpudW1iZXJcclxuICAgICAqIHNjYWxlOm51bWJlclxyXG4gICAgICogcGFyZW50OmNjLk5vZGVcclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICogQHJldHVybnMg55Sf5oiQ55qE57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93TmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrU2hvd0FkVGltZSgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrmj5LlsY/ml7bpl7TmnKrovr7pmZDliLbvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICBpZiAoIXV0aWxzLmlzU2hvd05hdGl2ZVRyeUdhbWVzV2lkZ2V0KCkgfHwgUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiN6IO95pi+56S65Y6f55Sf5oqW5Yqo6K+V546pXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5zaG93TmF0aXZlVHJ5R2FtZVdpZGdldChwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+a1ruWKqOivleeOqeaMguS7tlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZU5hdGl2ZVRyeUdhbWVXaWRnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5oaWRlTmF0aXZlVHJ5R2FtZVdpZGdldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWxleekuuW8gOWxj+W5v+WRiu+8jOW9k+WJjeWPquacieWNjuS4uuW5s+WPsOeUn+aViFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd05hdGl2ZVNwbGFzaFZpZXcoY2FsbEJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuc2hvd05hdGl2ZVNwbGFzaFZpZXcoY2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuW5v+WRiuadoVxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOS9jee9rlxyXG4gICAgICogQHBhcmFtIGFyZ3Mg5Y+C5pWwLOaOp+WItuW5v+WRiuadoeeahOWuveW6puWSjOS9jee9rizmraTlj4LmlbDlj6rlr7nlvq7kv6HlubPlj7DmnInmlYgs6buY6K6k5bGF5Lit6LS05bqV5pi+56S6LlxyXG4gICAgICoge1xyXG4gICAgICogIHdpZHRoOiDlub/lkYrmnaHlrr3luqYs5bGP5bmV55qE55m+5YiG5q+ULOWPluWAvOiMg+WbtDAtMTtcclxuICAgICAqICBib3R0b206IOW5v+WRiuadoei3neemu+Wxj+W5leW6lemDqOeahOmrmOW6pizljZXkvY3mmK/lg4/ntKA7XHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTaG93QmFubmVyKGxvY2F0aW9uOiBhbnkgPSBCYW5uZXJMb2NhdGlvbi5Ib21lLCBhcmdzOiBhbnkgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Nob3dBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65bm/5ZGK5p2h5pe26Ze05pyq6L6+6ZmQ5Yi277yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LlNob3dCYW5uZXIobG9jYXRpb24sIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSGlkZUJhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkhpZGVCYW5uZXIobG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0ludGVyc3RpdGlhbChsb2NhbHRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uSG9tZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Nob3dBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65o+S5bGP5pe26Ze05pyq6L6+6ZmQ5Yi277yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbnNlcnRBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65o+S5bGP5pe26Ze05pyq6L6+5Yiw6Ze06ZqU5pe26Ze077yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LlNob3dJbnRlcnN0aXRpYWwobG9jYWx0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7op4bpopHlub/lkYpcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbihyZXQ6Ym9vbGVhbixtc2c6c3RyaW5nKVxyXG4gICAgICogcmV0IOeci+WujOinhumikei/lOWbnnRydWXvvIwg5ZCm5YiZ6L+U5ZueZmFsc2VcclxuICAgICAqIG1zZyDmkq3mlL7lpLHotKXnmoTmtojmga/mj5DnpLpcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb0NhbGxCYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuU2hvd1ZpZGVvKGNhbGxiYWNrKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGZhbHNlLCBcIuinhumikeWKoOi9veWksei0pe+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuS6kuWKqOebtOW8ueW5v+WRilxyXG4gICAgICogLS3nm67liY3ku4XmlK/mjIHotqPlpLTmnaHlubPlj7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dJbnRlcmFjdGl2ZUFkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJBZEFnZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuc2hvd0ludGVyYWN0aXZlQWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLpRUea4uOaIj+ebkuWtkOW5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd0FwcEJveChpc01vcmVHYW1lPzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJBZEFnZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuU2hvd0FwcEJveChpc01vcmVHYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDpmpDol49RUea4uOaIj+ebkuWtkOW5v+WRilxyXG4gICAgKiAtLeebruWJjeS7heaUr+aMgVFR5bmz5Y+wLS1cclxuICAgICovXHJcbiAgICBwdWJsaWMgSGlkZUFwcEJveCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkhpZGVBcHBCb3goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuua/gOWKseaPkuWxj1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93UmV3YXJkSW5zZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJBZEFnZW50KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLogUklcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuc2hvd1Jld2FyZEluc2VydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+a/gOWKseaPkuWxj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZVJld2FyZEluc2VydCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LmhpZGVSZXdhcmRJbnNlcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWFs+mXreaMiemSrueahEJhbm5lclxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIFxyXG4gICAgICogQHBhcmFtIGNsb3NlQnRuIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd0Nsb3NlQnRuQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLkhvbWUsIGFyZ3M6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Nob3dBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65bm/5ZGK5p2h5pe26Ze05pyq6L6+6ZmQ5Yi277yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LlNob3dDbG9zZUJ0bkJhbm5lcihsb2NhdGlvbiwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuue7k+eul+eql+WPo+eahOaOqOiNkOW5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2hvd1N0YXRlbWVudFJlY29tbWVudCgpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTyB8fCBQbGF0VXRpbHMuSXNWSVZPKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VyQWRBZ2VudC5TaG93U3RhdGVtZW50UmVjb21tZW50KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHMuc2hvd0Nyb3NzV2lkZ2V0NigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6f55Sf5bm/5ZGK5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROYXRpdmVBZERhdGEoYXJncz86IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImFkTWFuYWdlciDojrflj5bljp/nlJ/lub/lkYpcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJBZEFnZW50LmdldE5hdGl2ZUFkRGF0YShhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnu5PnrpfpobXpnaLlub/lkYpcclxuICAgICAqIEBwYXJhbSBkYXRhIOWPguaVsFxyXG4gICAgICogb3Bwb+OAgeW+ruS/oeW5s+WPsOe7k+eul+W5v+WRiueJueauiuWkhOeQhlxyXG4gICAgICog6Laj5aS05p2h5bmz5Y+w57uT566X5bm/5ZGK5Li65LqS5Yqo55u05by5XHJcbiAgICAgKiB2aXZv44CB5oqW6Z+z44CBcXHjgIF4aWFvbWnjgIFiYWlkdeW5s+WPsOe7k+eul+eVjOmdouW5v+WRiuS4uuaPkuWxj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1N0YXRlbWVudEFkcyhkYXRhPzogYW55KTogYW55IHtcclxuICAgICAgICBsZXQgcmVzOiBhbnkgPSB7IFwidHlwZVwiOiAtMSwgXCJub2RlXCI6IG51bGwgfVxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Nob3dBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S657uT566X6aG16Z2i5bm/5ZGK5pe26Ze05pyq6L6+6ZmQ5Yi277yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCB8fCBQbGF0VXRpbHMuSXNCYWlkdSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1ckFkQWdlbnQuc2hvd1N0YXRlbWVudEFkcyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93SW50ZXJhY3RpdmVBZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi6Z2eb3Bwb+WSjOW+ruS/oeW5s+WPsOato+W4uOaYvuekuue7k+eul+W5v+WRilwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlTmF0aXZlQWQocGFyYW1zOiBhbnkgPSBudWxsLCB5ekl0ZW0/OiBZWl9OYXRpdmVJdGVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5jcmVhdGVOYXRpdmVBZChwYXJhbXMsIHl6SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlS3l4QmFubmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJBZEFnZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuaGlkZUt5eEJhbm5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93QmVmb3JHYW1lT3ZlckFkKGxldmVsOiBudW1iZXIsIGxldmVsU3RhdHVzOiBMZXZlbFN0YXR1cywgcmV3YXJkVmFsdWU6IG51bWJlciwgY2xvc2VDYWxsRnVuYzogRnVuY3Rpb24sIHJld2FyZEZ1bmM6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPIHx8IFBsYXRVdGlscy5Jc1ZJVk8gfHwgUGxhdFV0aWxzLklzRG91eWluIHx8IFBsYXRVdGlscy5Jc0JhaWR1IHx8IFBsYXRVdGlscy5Jc1dlY2hhdCB8fCBQbGF0VXRpbHMuSXNRUSB8fCBQbGF0VXRpbHMuSXNLd2FpIHx8IFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQgfHwgUGxhdFV0aWxzLklzTmF0aXZlSU9TIHx8IHV0aWxzLl90b29sX0Jyb3N3ZXIgfHwgUGxhdFV0aWxzLklzV2lGaSB8fCBQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZyAmJiB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfYWRfbWluX2xldmVsICYmIHV0aWxzLlNlcnZlckNvbmZpZy5iZWZvcl9hZF9taW5fbGV2ZWwgPj0gbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYCR7bGV2ZWx9ID4+5pyN5Yqh5Zmo6YWN572u57uT566X5YmN5bm/5ZGK5ZyoJHt1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfYWRfbWluX2xldmVsfeWFs+WQjuaJjeiDveaYvuekuu+8gWApO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VDYWxsRnVuYyAmJiBjbG9zZUNhbGxGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrnu5PnrpfliY3lub/lkYrvvJogICNMZXZlbD0gXCIsIGxldmVsLCBcIiAjTGV2ZWxTdGF0eXM9XCIsIGxldmVsU3RhdHVzLCBcIiAjcmV3YXJkVmFsdWUgPSBcIiwgcmV3YXJkVmFsdWUpO1xyXG4gICAgICAgICAgICB1dGlscy5jdXJyZW50TGV2ZWwgPSBsZXZlbDtcclxuICAgICAgICAgICAgdXRpbHMuaXNTdWNjZXNzID0gbGV2ZWxTdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVdpbjtcclxuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2FsbEZ1bmMgPSByZXdhcmRGdW5jO1xyXG4gICAgICAgICAgICB1dGlscy5yZXdhcmRDbG9zZUZ1bmMgPSBjbG9zZUNhbGxGdW5jO1xyXG4gICAgICAgICAgICB1dGlscy5yZXdhcmRWYWx1ZSA9IHJld2FyZFZhbHVlO1xyXG4gICAgICAgICAgICAvLyBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCB8fCBDQ19ERUJVRykge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHV0aWxzLmlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHV0aWxzLnl6UmVkQmFnSW5mby5wcm9ncmVzcysrO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHV0aWxzLmNhblNob3dSZWRCYWcoKSAmJiB1dGlscy55elJlZEJhZ0luZm8ucHJvZ3Jlc3MgPj0gdXRpbHMueXpSZWRCYWdJbmZvLnRvdGFsUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwi5b2T5YmN57qi5YyF6L+b5bqm5bey5ruh77yM5pi+56S66I635b6X57qi5YyF56qX5Y+j77yBXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHV0aWxzLnNob3dPcGVuUmVkQmFnUGFuZWwoeyBzaG93VHlwZTogMiB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgbGV0IGFkVHlwZSA9IHV0aWxzLmFkTWFuYWdlci5jaGVja1Nob3dCZWZvckdhbWVPdmVyQWQobGV2ZWwsIGxldmVsU3RhdHVzID09IExldmVsU3RhdHVzLkdhbWVXaW4pO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFkVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCZUZvckdhbWVPdmVyQWRJZC5TaGFyZVBhbmVsOlxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnJlY29yZEVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dTaGFyZVJlY29yZFBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJlRm9yR2FtZU92ZXJBZElkLkdvbGRCb3g6XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dSZXdhcmRCb3hQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCZUZvckdhbWVPdmVyQWRJZC5UdXJudGFibGU6XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dyZXdhcmRUdXJuVGFibGVQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCZUZvckdhbWVPdmVyQWRJZC5DcmVhdGVTaG9ydEN1dDpcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd1Jld2FyZFNob3J0Q3V0UGFuZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmVGb3JHYW1lT3ZlckFkSWQuUmVjR2FtZTpcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd1JlY0dhbWVQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIEJlRm9yR2FtZU92ZXJBZElkLkx1Y2tCb3g6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNob3dfbGV2ZWwgPSB1dGlscy5TZXJ2ZXJDb25maWcucmV3YXJkX2x1Y2tfYm94X3Nob3dfbGV2ZWwgPyB1dGlscy5TZXJ2ZXJDb25maWcucmV3YXJkX2x1Y2tfYm94X3Nob3dfbGV2ZWwgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+IHNob3dfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnNob3dSZXdhcmRMdWNrQm94UGFuZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5bm46L+Q5a6d566x6Ze06ZqU5YWz5Y2h5pyq6L6+5Yiw77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUNhbGxGdW5jICYmIGNsb3NlQ2FsbEZ1bmMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2FsbEZ1bmMgJiYgY2xvc2VDYWxsRnVuYygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnJld2FyZENsb3NlRnVuYyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbG9zZUNhbGxGdW5jICYmIGNsb3NlQ2FsbEZ1bmMoKTtcclxuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2xhc3RTaG93R2FtZU92ZXJBZFR5cGU6IEJlRm9yR2FtZU92ZXJBZElkID0gQmVGb3JHYW1lT3ZlckFkSWQuTm9uZTtcclxuICAgIC8v57uT566X5YmN5bm/5ZGK57G75Z6L5pWw57uEXHJcbiAgICBiZWZvclJld2FyZFR5cGVzOiBCZUZvckdhbWVPdmVyQWRJZFtdID0gW0JlRm9yR2FtZU92ZXJBZElkLlNoYXJlUGFuZWwsIEJlRm9yR2FtZU92ZXJBZElkLkdvbGRCb3gsIEJlRm9yR2FtZU92ZXJBZElkLlR1cm50YWJsZSwgQmVGb3JHYW1lT3ZlckFkSWQuQ3JlYXRlU2hvcnRDdXQsIEJlRm9yR2FtZU92ZXJBZElkLlJlY0dhbWUsIEJlRm9yR2FtZU92ZXJBZElkLkx1Y2tCb3hdO1xyXG5cclxuICAgIC8v57uT566X5YmN5bm/5ZGK5pi+56S65pa55rOVXHJcbiAgICBwcml2YXRlIGdldFJld2FyZENsb3NlQW5kU2hvd0NhbGxGdW5jKGluZGV4KTogRnVuY3Rpb24ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHV0aWxzLmFkTWFuYWdlci5zaG93U2hhcmVSZWNvcmRQYW5lbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB1dGlscy5hZE1hbmFnZXIuc2hvd1Jld2FyZEJveFBhbmVsXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdXRpbHMuYWRNYW5hZ2VyLnNob3dyZXdhcmRUdXJuVGFibGVQYW5lbFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHV0aWxzLmFkTWFuYWdlci5zaG93UmV3YXJkU2hvcnRDdXRQYW5lbFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHV0aWxzLmFkTWFuYWdlci5zaG93UmVjR2FtZVBhbmVsXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdXRpbHMuYWRNYW5hZ2VyLnNob3dSZXdhcmRMdWNrQm94UGFuZWxcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIGJlZm9yX2dhbWVfb3Zlcl9zaGFyZV9pbnRlcnZhbCDliIbkuqvlvLnnqpfpl7TpmpQg5L6L5aaC77yaMeOAgTLjgIEz44CBNOOAgTVcclxuICAgICogYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9ib3hfaW50ZXJ2YWwg5a6d566x5by556qX6Ze06ZqUIOS+i+Wmgu+8mjHjgIEy44CBM+OAgTTjgIE1XHJcbiAgICAqIGJlZm9yX2dhbWVfb3Zlcl90dXJudGFibGVfaW50ZXJ2YWwg6L2s55uY5oq95aWW6Ze06ZqUIOS+i+Wmgu+8mjHjgIEy44CBM+OAgTTjgIE1XHJcbiAgICAqIGJlZm9yX2dhbWVfb3Zlcl9zaG9ydGN1dF9pbnRlcnZhbCAg5re75Yqg5qGM6Z2i6Ze06ZqUIOS+i+Wmgu+8mjHjgIEy44CBM+OAgTTjgIE1XHJcbiAgICAqIFxyXG4gICAgKiBiZWZvcl9nYW1lX292ZXJfc2hhcmVfdHlwZSDliIbkuqvlvLnnqpfnsbvlnosg5L6L5aaC77yaIGFsbOOAgXN1Y2Nlc3PjgIFmYWlsXHJcbiAgICAqIGJlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfYm94X3R5cGUg5a6d566x5by556qX57G75Z6LIOS+i+Wmgu+8miBhbGzjgIFzdWNjZXNz44CBZmFpbFxyXG4gICAgKiBiZWZvcl9nYW1lX292ZXJfdHVybnRhYmxlX3R5cGUg5oq95aWW5by556qX57G75Z6LIOS+i+Wmgu+8miBhbGzjgIFzdWNjZXNz44CBZmFpbFxyXG4gICAgKiBiZWZvcl9nYW1lX292ZXJfc2hvcnRjdXRfdHlwZSDmt7vliqDmoYzpnaLpl7Tnsbvlnosg5L6L5aaC77yaIGFsbOOAgXN1Y2Nlc3PjgIFmYWlsXHJcbiAgICAqIFxyXG4gICAgKiBiZWZvcl9nYW1lX292ZXJfc3luY19saXN0IOWQjOaXtuWxleekuumhuuW6jyDkvovlpoI6IDEyM+OAgTMyMeOAgTEy44CBMjHjgIEzMlxyXG4gICAgKiBiZWZvcl9nYW1lX292ZXJfc3luY19pbnRlcnZhbCDlkIzml7blsZXnpLrpl7TpmpTlhbPljaHmlbAg5L6L5aaC77yaMeOAgTLjgIEz44CBNOOAgTVcclxuICAgICogYmVmb3JfZ2FtZV9vdmVyX3N5bmNfdHlwZSDlkIzml7blsZXnpLrnsbvlnosg5L6L5aaC77yaIGFsbOOAgXN1Y2Nlc3PjgIFmYWlsXHJcbiAgICAqIFxyXG4gICAgKiBsZXZlbCDlvZPliY3lhbPljaEgICBpc1N1Y2Nlc3PmmK/lkKbog5zliKkgXHJcbiAgICAqIEByZXR1cm5zIHJlc3VsdCA6IDE65YiG5Lqr5by556qX77yMMjrlrp3nrrHlvLnnqpfvvIwz77ya6L2s55uY5by556qXIDQ65b+r5o235qGM6Z2i5re75YqgIDU65pu05aSa5ri45oiP5YiX6KGoIDbjgIHlubjov5Dlrp3nrrFcclxuICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tTaG93QmVmb3JHYW1lT3ZlckFkKGxldmVsOiBudW1iZXIsIGlzU3VjY2VzczogYm9vbGVhbik6IEJlRm9yR2FtZU92ZXJBZElkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2N1ckFkQWdlbnQgfHwgIXV0aWxzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uE5Lu25Yid5aeL5YyW5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gQmVGb3JHYW1lT3ZlckFkSWQuTm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfc2hhcmVfaW50ZXJ2YWwgPSB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfZ2FtZV9vdmVyX3NoYXJlX2ludGVydmFsO1xyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfcmV3YXJkX2JveF9pbnRlcnZhbCA9IHV0aWxzLlNlcnZlckNvbmZpZy5iZWZvcl9nYW1lX292ZXJfcmV3YXJkX2JveF9pbnRlcnZhbDtcclxuICAgICAgICBsZXQgYmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV9pbnRlcnZhbCA9IHV0aWxzLlNlcnZlckNvbmZpZy5iZWZvcl9nYW1lX292ZXJfdHVybnRhYmxlX2ludGVydmFsO1xyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfc2hvcnRjdXRfaW50ZXJ2YWwgPSB1dGlscy5TZXJ2ZXJDb25maWcuYXV0b19kZXNrdG9wX2ludGVydmFsO1xyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfaW50ZXJ2YWwgPSB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfZ2FtZV9vdmVyX3JlY19nYW1lX2ludGVydmFsO1xyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfbHVja19ib3hfaW50ZXJ2YWwgPSB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X2ludGVydmFsO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfcmV3YXJkX3NoYXJlX3R5cGUgPSB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfZ2FtZV9vdmVyX3NoYXJlX3R5cGU7XHJcbiAgICAgICAgbGV0IGJlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfYm94X3R5cGUgPSB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9ib3hfdHlwZTtcclxuICAgICAgICBsZXQgYmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV90eXBlID0gdXRpbHMuU2VydmVyQ29uZmlnLmJlZm9yX2dhbWVfb3Zlcl90dXJudGFibGVfdHlwZTtcclxuICAgICAgICBsZXQgYmVmb3JfZ2FtZV9vdmVyX3JlY19nYW1lX3R5cGUgPSB1dGlscy5TZXJ2ZXJDb25maWcuYmVmb3JfZ2FtZV9vdmVyX3JlY19nYW1lX3R5cGU7XHJcbiAgICAgICAgbGV0IGJlZm9yX2dhbWVfb3Zlcl9sdWNrX2JveF90eXBlID0gdXRpbHMuU2VydmVyQ29uZmlnLmJlZm9yX2dhbWVfb3Zlcl9sdWNrX2JveF90eXBlO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGJlZm9yX2dhbWVfb3Zlcl9zaG9ydGN1dF90eXBlID0gdXRpbHMuU2VydmVyQ29uZmlnLmF1dG9fZGVza3RvcF90eXBlO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfaXNfc3luYyA9IHV0aWxzLlNlcnZlckNvbmZpZy5iZWZvcl9nYW1lX292ZXJfc3luY19saXN0O1xyXG4gICAgICAgIGxldCBiZWZvcl9nYW1lX292ZXJfc3luY19pbnRlcnZhbCA9IHV0aWxzLlNlcnZlckNvbmZpZy5iZWZvcl9nYW1lX292ZXJfc3luY19pbnRlcnZhbDtcclxuICAgICAgICBsZXQgYmVmb3JfZ2FtZV9vdmVyX3N5bmNfdHlwZSA9IHV0aWxzLlNlcnZlckNvbmZpZy5iZWZvcl9nYW1lX292ZXJfc3luY190eXBlO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzVGVzdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gYmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV90eXBlID0gXCJhbGxcIjtcclxuICAgICAgICAgICAgLy8gYmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV9pbnRlcnZhbCA9IDI7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gYmVmb3JfZ2FtZV9vdmVyX2lzX3N5bmMgPSBcIjMyXCI7XHJcbiAgICAgICAgICAgIC8vIGJlZm9yX2dhbWVfb3Zlcl9zeW5jX2ludGVydmFsID0gXCIxXCI7XHJcbiAgICAgICAgICAgIC8vIGJlZm9yX2dhbWVfb3Zlcl9zeW5jX3R5cGUgPSBcImFsbFwiO1xyXG4gICAgICAgICAgICAvLyBiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfdHlwZSA9IFwiYWxsXCI7XHJcbiAgICAgICAgICAgIC8vIGJlZm9yX2dhbWVfb3Zlcl9yZWNfZ2FtZV9pbnRlcnZhbCA9IDQ7XHJcblxyXG4gICAgICAgICAgICAvLyBiZWZvcl9nYW1lX292ZXJfbHVja19ib3hfdHlwZSA9IFwiYWxsXCI7XHJcbiAgICAgICAgICAgIC8vIGJlZm9yX2dhbWVfb3Zlcl9sdWNrX2JveF9pbnRlcnZhbCA9IDE7XHJcblxyXG4gICAgICAgICAgICBiZWZvcl9nYW1lX292ZXJfcmV3YXJkX2JveF90eXBlID0gXCJhbGxcIjtcclxuICAgICAgICAgICAgYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9ib3hfaW50ZXJ2YWwgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuTm9uZTtcclxuICAgICAgICBsZXQgaXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGJlZm9yX2dhbWVfb3Zlcl9pc19zeW5jKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov5vlhaXlkIzmraXmmL7npLrlvLnnqpfliKTmlq3vvJpcIiwgYmVmb3JfZ2FtZV9vdmVyX2lzX3N5bmMsIFwiPDxpbnRlcnZhbD1cIiwgYmVmb3JfZ2FtZV9vdmVyX3N5bmNfaW50ZXJ2YWwsIFwiPDw8dHlwZVwiLCBiZWZvcl9nYW1lX292ZXJfc3luY190eXBlKTtcclxuICAgICAgICAgICAgc3dpdGNoIChiZWZvcl9nYW1lX292ZXJfc3luY190eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93ID0gaXNTdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdyA9ICFpc1N1Y2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzU2hvdyAmJiBiZWZvcl9nYW1lX292ZXJfc3luY19pbnRlcnZhbCAmJiBsZXZlbCAlIGJlZm9yX2dhbWVfb3Zlcl9zeW5jX2ludGVydmFsID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBzeW5jVHlwZXM6IEFycmF5PHN0cmluZz4gPSBiZWZvcl9nYW1lX292ZXJfaXNfc3luYy5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3luY1R5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmJlZm9yUmV3YXJkVHlwZXNbcGFyc2VJbnQoc3luY1R5cGVzW2ldKSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlRnVuYyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gc3luY1R5cGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VGdW5jID0gdXRpbHMucmV3YXJkQ2xvc2VGdW5jO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRnVuYyA9IHRoaXMuZ2V0UmV3YXJkQ2xvc2VBbmRTaG93Q2FsbEZ1bmMocGFyc2VJbnQoc3luY1R5cGVzW2kgKyAxXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHN5bmNUeXBlc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hhcmVSZWNvcmRQYW5lbENsb3NlRnVuYyA9IGNsb3NlRnVuYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucmV3YXJkQm94UGFuZWxDbG9zZUZ1bmMgPSBjbG9zZUZ1bmM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnR1cm5UYWJsZVBhbmVsQ2xvc2VGdW5jID0gY2xvc2VGdW5jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5yZXdhcmRTaG9ydEN1dFBhbmVsQ2xvc2VGdW5jID0gY2xvc2VGdW5jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5yZXdhcmRSZWNHYW1lUGFuZWxDbG9zZUZ1bmMgPSBjbG9zZUZ1bmM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnJld2FyZEx1Y2tCb3hQYW5lbENsb3NlRnVuYyA9IGNsb3NlRnVuYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHNob3dDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9zaGFyZV90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93Q291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9ib3hfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd0NvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJlZm9yX2dhbWVfb3Zlcl90dXJudGFibGVfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd0NvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJlZm9yX2dhbWVfb3Zlcl9zaG9ydGN1dF90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93Q291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X3R5cGUpIHtcclxuICAgICAgICAgICAgICAgIHNob3dDb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrnmoTnsbvlnotcIiArIHNob3dDb3VudCArIFwi56eN77yM6L+b6KGM6aG65bqP5YiH5o2i5Yik5patLOS4iuS4gOasoeaYvuekuueahOexu+Wei+S4uu+8mlwiICsgdGhpcy5fbGFzdFNob3dHYW1lT3ZlckFkVHlwZSlcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGJlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfc2hhcmVfaW50ZXJ2YWwgJiYgbGV2ZWwgJSBiZWZvcl9nYW1lX292ZXJfcmV3YXJkX3NoYXJlX2ludGVydmFsID09IDApIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov5vlhaXmmL7npLrliIbkuqvlpZblirHlvLnnqpfliKTmlq1cIiwgYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9zaGFyZV90eXBlLCBcIjw8XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1Nob3cgPSB0aGlzLl9sYXN0U2hvd0dhbWVPdmVyQWRUeXBlICE9IEJlRm9yR2FtZU92ZXJBZElkLlNoYXJlUGFuZWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChiZWZvcl9nYW1lX292ZXJfcmV3YXJkX3NoYXJlX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFsbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg6Ze06ZqUJHtiZWZvcl9nYW1lX292ZXJfcmV3YXJkX3NoYXJlX2ludGVydmFsfeWFs++8jOaYvuekuuWIhuS6q+WlluWKseW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuU2hhcmVQYW5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLlNoYXJlUGFuZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5ri45oiP6IOc5YipID4+IOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9zaGFyZV9pbnRlcnZhbH3lhbPvvIzmmL7npLrliIbkuqvlpZblirHlvLnnqpfvvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBCZUZvckdhbWVPdmVyQWRJZC5TaGFyZVBhbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOa4uOaIj+Wksei0pSA+PiDpl7TpmpQke2JlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfc2hhcmVfaW50ZXJ2YWx95YWz77yM5pi+56S65YiG5Lqr5aWW5Yqx5by556qX77yBYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gQmVGb3JHYW1lT3ZlckFkSWQuTm9uZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+WJjeW5v+WRiumqjOivgeWujOaIkO+8jOaYvuekuue7k+eul+WJjeW5v+WRiuexu+Wei++8mlwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNob3dHYW1lT3ZlckFkVHlwZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX3Jld2FyZF9ib3hfaW50ZXJ2YWwgJiYgbGV2ZWwgJSBiZWZvcl9nYW1lX292ZXJfcmV3YXJkX2JveF9pbnRlcnZhbCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi6L+b5YWl5pi+56S65a6d566x5Yik5patXCIsIGJlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfYm94X3R5cGUsIFwiPDxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0NvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdyA9IHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgIT0gQmVGb3JHYW1lT3ZlckFkSWQuR29sZEJveDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1Nob3cpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChiZWZvcl9nYW1lX292ZXJfcmV3YXJkX2JveF90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLkdvbGRCb3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDpl7TpmpQke2JlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfYm94X2ludGVydmFsfeWFs++8jOaYvuekuuWuneeuseW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuR29sZEJveDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmuLjmiI/og5zliKkgPj4g6Ze06ZqUJHtiZWZvcl9nYW1lX292ZXJfcmV3YXJkX2JveF9pbnRlcnZhbH3lhbPvvIzmmL7npLrlrp3nrrHlvLnnqpfvvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBCZUZvckdhbWVPdmVyQWRJZC5Hb2xkQm94O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOa4uOaIj+Wksei0pSA+PiDpl7TpmpQke2JlZm9yX2dhbWVfb3Zlcl9yZXdhcmRfYm94X2ludGVydmFsfeWFs++8jOaYvuekuuWuneeuseW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IEJlRm9yR2FtZU92ZXJBZElkLk5vbmUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5PnrpfliY3lub/lkYrpqozor4HlrozmiJDvvIzmmL7npLrnu5PnrpfliY3lub/lkYrnsbvlnovvvJpcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV9pbnRlcnZhbCAmJiBsZXZlbCAlIGJlZm9yX2dhbWVfb3Zlcl90dXJudGFibGVfaW50ZXJ2YWwgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIui/m+WFpeaYvuekuuaKveWlluW8ueeql+WIpOaWrVwiLCBiZWZvcl9nYW1lX292ZXJfdHVybnRhYmxlX3R5cGUsIFwiPDxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0NvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdyA9IHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgIT0gQmVGb3JHYW1lT3ZlckFkSWQuVHVybnRhYmxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLlR1cm50YWJsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX3R1cm50YWJsZV9pbnRlcnZhbH3lhbPvvIzmmL7npLrmir3lpZblvLnnqpfvvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLlR1cm50YWJsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmuLjmiI/og5zliKkgPj4g6Ze06ZqUJHtiZWZvcl9nYW1lX292ZXJfdHVybnRhYmxlX2ludGVydmFsfeWFs++8jOaYvuekuuaKveWlluW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLlR1cm50YWJsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmuLjmiI/lpLHotKUgPj4g6Ze06ZqUJHtiZWZvcl9nYW1lX292ZXJfdHVybnRhYmxlX2ludGVydmFsfeWFs++8jOaYvuekuuaKveWlluW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IEJlRm9yR2FtZU92ZXJBZElkLk5vbmUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5PnrpfliY3lub/lkYrpqozor4HlrozmiJDvvIzmmL7npLrnu5PnrpfliY3lub/lkYrnsbvlnovvvJpcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX3Nob3J0Y3V0X2ludGVydmFsICYmIGxldmVsICUgYmVmb3JfZ2FtZV9vdmVyX3Nob3J0Y3V0X2ludGVydmFsID09IDApIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov5vlhaXmmL7npLrmt7vliqDmoYzpnaLlvLnnqpfliKTmlq1cIiwgYmVmb3JfZ2FtZV9vdmVyX3Nob3J0Y3V0X3R5cGUsIFwiPDxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0NvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdyA9IHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgIT0gQmVGb3JHYW1lT3ZlckFkSWQuQ3JlYXRlU2hvcnRDdXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChiZWZvcl9nYW1lX292ZXJfc2hvcnRjdXRfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBCZUZvckdhbWVPdmVyQWRJZC5DcmVhdGVTaG9ydEN1dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX3Nob3J0Y3V0X2ludGVydmFsfeWFs++8jOaYvuekuua3u+WKoOahjOmdouW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuQ3JlYXRlU2hvcnRDdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5ri45oiP6IOc5YipID4+IOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX3Nob3J0Y3V0X2ludGVydmFsfeWFs++8jOaYvuekuua3u+WKoOahjOmdouW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLkNyZWF0ZVNob3J0Q3V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOa4uOaIj+Wksei0pSA+PiDpl7TpmpQke2JlZm9yX2dhbWVfb3Zlcl9zaG9ydGN1dF9pbnRlcnZhbH3lhbPvvIzmmL7npLrmt7vliqDmoYzpnaLlvLnnqpfvvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5PnrpfliY3lub/lkYrpqozor4HlrozmiJDvvIzkuI3mmL7npLrnu5PnrpfliY3lub/lkYrvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gQmVGb3JHYW1lT3ZlckFkSWQuTm9uZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+WJjeW5v+WRiumqjOivgeWujOaIkO+8jOaYvuekuue7k+eul+WJjeW5v+WRiuexu+Wei++8mlwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNob3dHYW1lT3ZlckFkVHlwZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfaW50ZXJ2YWwgJiYgbGV2ZWwgJSBiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfaW50ZXJ2YWwgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIui/m+WFpeaYvuekuua4uOaIj+aOqOiNkOW8ueeql+WIpOaWrVwiLCBiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfdHlwZSwgXCI8PFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG93Q291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93ID0gdGhpcy5fbGFzdFNob3dHYW1lT3ZlckFkVHlwZSAhPSBCZUZvckdhbWVPdmVyQWRJZC5SZWNHYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYmVmb3JfZ2FtZV9vdmVyX3JlY19nYW1lX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFsbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuUmVjR2FtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX3JlY19nYW1lX2ludGVydmFsfeWFs++8jOaYvuekuua4uOaIj+aOqOiNkOW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuUmVjR2FtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmuLjmiI/og5zliKkgPj4g6Ze06ZqUJHtiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfaW50ZXJ2YWx95YWz77yM5pi+56S65ri45oiP5o6o6I2Q5by556qX77yBYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQmVGb3JHYW1lT3ZlckFkSWQuUmVjR2FtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDmuLjmiI/lpLHotKUgPj4g6Ze06ZqUJHtiZWZvcl9nYW1lX292ZXJfcmVjX2dhbWVfaW50ZXJ2YWx95YWz77yM5pi+56S65ri45oiP5o6o6I2Q5by556qX77yBYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi57uT566X5YmN5bm/5ZGK6aqM6K+B5a6M5oiQ77yM5LiN5pi+56S65pu05aSa5ri45oiP5bm/5ZGK77yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IEJlRm9yR2FtZU92ZXJBZElkLk5vbmUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5PnrpfliY3lub/lkYrpqozor4HlrozmiJDvvIzmmL7npLrnu5PnrpfliY3lub/lkYrnsbvlnovvvJpcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X2ludGVydmFsICYmIGxldmVsICUgYmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X2ludGVydmFsID09IDApIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLov5vlhaXmmL7npLrlubjov5Dlrp3nrrHlvLnnqpfliKTmlq1cIiwgYmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X3R5cGUsIFwiPDxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0NvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdyA9IHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgIT0gQmVGb3JHYW1lT3ZlckFkSWQuTHVja0JveDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1Nob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yX2dhbWVfb3Zlcl9sdWNrX2JveF90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLkx1Y2tCb3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDpl7TpmpQke2JlZm9yX2dhbWVfb3Zlcl9sdWNrX2JveF9pbnRlcnZhbH3lhbPvvIzmmL7npLrmuLjmiI/mjqjojZDlvLnnqpfvvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLkx1Y2tCb3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5ri45oiP6IOc5YipID4+IOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X2ludGVydmFsfeWFs++8jOaYvuekuua4uOaIj+aOqOiNkOW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEJlRm9yR2FtZU92ZXJBZElkLkx1Y2tCb3g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5ri45oiP5aSx6LSlID4+IOmXtOmalCR7YmVmb3JfZ2FtZV9vdmVyX2x1Y2tfYm94X2ludGVydmFsfeWFs++8jOaYvuekuua4uOaIj+aOqOiNkOW8ueeql++8gWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+WJjeW5v+WRiumqjOivgeWujOaIkO+8jOS4jeaYvuekuuW5uOi/kOWuneeuseW8ueeql++8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIue7k+eul+WJjeW5v+WRiumqjOivgeWujOaIkO+8jOaYvuekuue7k+eul+WJjeW5v+WRiuexu+Wei++8mlwiLCByZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuX2xhc3RTaG93R2FtZU92ZXJBZFR5cGUgPSByZXN1bHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuuW9leWxj+WIhuS6q+eql+WPo1xyXG4gICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93U2hhcmVSZWNvcmRQYW5lbChwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaGFyZVJlY29yZFBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnNoYXJlUmVjb3JkUGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLnNoYXJlUmVjb3JkUGFuZWwgJiYgY2MuaXNWYWxpZCh1dGlscy5zaGFyZVJlY29yZFBhbmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNoYXJlUmVjb3JkUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hhcmVSZWNvcmRQYW5lbCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaGFyZVJlY29yZFBhbmVsLnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSBwYXJhbXMuZ3JvdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gcGFyYW1zLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy50b3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC50b3AgPSBwYXJhbXMudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmJvdHRvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IHBhcmFtcy5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVmdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmxlZnQgPSBwYXJhbXMubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yaWdodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnJpZ2h0ID0gcGFyYW1zLnJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyYW1zLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKHV0aWxzLnNoYXJlUmVjb3JkUGFuZWwsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh1dGlscy5zaGFyZVJlY29yZFBhbmVsLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyBTaGFyZVJlY29yZFBhbmVsLCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJld2FyZEJveFBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLrlrp3nrrHnqpflj6NcclxuICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1Jld2FyZEJveFBhbmVsKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdXRpbHMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZEJveFBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZEJveFBhbmVsKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJld2FyZEJveFBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5yZXdhcmRCb3hQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZEJveFBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkQm94UGFuZWwgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRCb3hQYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyByZXdhcmRCb3hQYW5lbCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXdhcmRSZWNHYW1lUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuuabtOWkmua4uOaIj+aOqOiNkOeql+WPo1xyXG4gICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93UmVjR2FtZVBhbmVsKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdXRpbHMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLmJlZm9yR2FtZU92ZXJSZWNHYW1lc1BhbmVsICYmIHV0aWxzLmdldFJlY29tbW9uZEdhbWVMaXN0KCkpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcuYmVmb3JHYW1lT3ZlclJlY0dhbWVzUGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkUmVjR2FtZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5yZXdhcmRSZWNHYW1lUGFuZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRSZWNHYW1lUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRSZWNHYW1lUGFuZWwgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRSZWNHYW1lUGFuZWwuekluZGV4ID0gOTk5OTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQobm9kZSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjTW9yZUdhbWU6IEJlZm9yR2FtZU92ZXJSZWNHYW1lc1BhbmVsID0gdGhpcy5yZXdhcmRSZWNHYW1lUGFuZWwuZ2V0Q29tcG9uZW50KEJlZm9yR2FtZU92ZXJSZWNHYW1lc1BhbmVsKTtcclxuICAgICAgICAgICAgICAgIHJlY01vcmVHYW1lLl9sb2NhdGlvbiA9IFN1YkxvY2F0aW9uLmlzQmVmb3JHYW1lT3ZlckFkO1xyXG4gICAgICAgICAgICAgICAgcmVjTW9yZUdhbWUuaW5pdCh1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpKTtcclxuICAgICAgICAgICAgICAgIHJlY01vcmVHYW1lLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKrmib7liLDpooTliLbkvZMgbW9yZUdhbWVzUGFuZWwsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHJld2FyZFR1cm5UYWJsZVBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgKiDmmL7npLrovaznm5jmir3lpZbnqpflj6NcclxuICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2hvd3Jld2FyZFR1cm5UYWJsZVBhbmVsKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdXRpbHMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZFR1cm5UYWJsZVBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZFR1cm5UYWJsZVBhbmVsKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJld2FyZFR1cm5UYWJsZVBhbmVsICYmIGNjLmlzVmFsaWQodGhpcy5yZXdhcmRUdXJuVGFibGVQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZFR1cm5UYWJsZVBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVHVyblRhYmxlUGFuZWwgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRUdXJuVGFibGVQYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyByZXdhcmRUdXJuVGFibGVQYW5lbCwg6K+35p+l55yLQ29tbW9uVXRpbHPnu4Tku7bkuIrmmK/lkKbotYvlgLzvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJld2FyZFNob3J0Q3V0UGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuui9rOebmOaKveWllueql+WPo1xyXG4gICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93UmV3YXJkU2hvcnRDdXRQYW5lbCgpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZXdhcmRTaG9ydEN1dFBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZFNob3J0Q3V0UGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkU2hvcnRDdXRQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMucmV3YXJkU2hvcnRDdXRQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZFNob3J0Q3V0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRTaG9ydEN1dFBhbmVsID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkU2hvcnRDdXRQYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyByZXdhcmRTaG9ydEN1dFBhbmVsLCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9yZXdhcmRMdWNrQm94UGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAqIOWxleekuuW5uOi/kOWuneeuseW8ueeql1xyXG4gICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzaG93UmV3YXJkTHVja0JveFBhbmVsKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdXRpbHMuX2lzQ29uZmlnSW5pdCkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi57uE5Lu26YWN572u5pyq5Yid5aeL5YyWIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXRpbHMuY29uZmlnLm90aGVyY29uZmlnLnJld2FyZEx1Y2tCb3hQYW5lbCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5yZXdhcmRMdWNrQm94UGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jld2FyZEx1Y2tCb3hQYW5lbCAmJiBjYy5pc1ZhbGlkKHRoaXMuX3Jld2FyZEx1Y2tCb3hQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXdhcmRMdWNrQm94UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkTHVja0JveFBhbmVsID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jld2FyZEx1Y2tCb3hQYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacquaJvuWIsOmihOWItuS9kyBSZXdhcmRMdWNrQm94UGFuZWwsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4Hlub/lkYrmmL7npLrml7bpl7TmmK/lkKbovr7liLBcclxuICAgICAqIEByZXR1cm5zIHRydWU65aSn5LqO5pyN5Yqh5Zmo5pe26Ze0ICBmYWxzZTrlsI/kuo7mnI3liqHlmajml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrU2hvd0FkVGltZSgpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBpZiAoQ0NfREVCVUcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdXRpbHMuX2dhbWVFbnRyeVRpbWUpIC8gMTAwMDtcclxuICAgICAgICBsZXQgc2hvd0FkVGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgc2hvd0FkVGltZSA9IDkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJzaG93X2FkX3RpbWVcIikgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgc2hvd0FkVGltZSA9IHV0aWxzLmdldENvbmZpZ0J5S2V5KFwic2hvd19hZF90aW1lXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumqjOivgeW9k+WJjeW5v+WRiuaYvuekuuaXtumXtO+8miNzaG93QWRUaW1lPVwiLCBzaG93QWRUaW1lLCBcIiAjaW50ZXJ2YWw9XCIsIGludGVydmFsKTtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgPj0gc2hvd0FkVGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfaW5zZXJ0TGFzdFNob3dUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HmmK/lkKbog73lpJ/mmL7npLrmj5LlsY9cclxuICAgICAqIEByZXR1cm5zIHRydWUg5Y+v5Lul5pi+56S677yMZmFsc2Ug5pyq6L6+5Yiw6KaB5rGC5LiN5pi+56S6XHJcbiAgICAgKi9cclxuICAgIGNoZWNrSW5zZXJ0QWRUaW1lKCkge1xyXG5cclxuICAgICAgICAvLyB1dGlscy5TZXJ2ZXJDb25maWcuaW5zZXJ0X2FkX2ludGVydmFsX3RpbWUgPSA1O1xyXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLmluc2VydF9hZF9pbnRlcnZhbF90aW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMuX2luc2VydExhc3RTaG93VGltZSkgLyAxMDAwO1xyXG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwgPCB1dGlscy5TZXJ2ZXJDb25maWcuaW5zZXJ0X2FkX2ludGVydmFsX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpqozor4HlvZPliY3mj5LlsY/lub/lkYrmmL7npLrml7bpl7TvvJojc2hvd0FkVGltZT1cIiwgdXRpbHMuU2VydmVyQ29uZmlnLmluc2VydF9hZF9pbnRlcnZhbF90aW1lLCBcIiAjaW50ZXJ2YWw9XCIsIGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRMYXN0U2hvd1RpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnp6/mnKjlub/lkYpcclxuICAgICAqIEBwYXJhbSBwYXJtZSB7dG9wLGJvdHRvbX1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dCbG9ja0FkKHBhcm1lPzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQgJiYgUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5zaG93QmxvY2tBZChwYXJtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQmxvY2tBZChwYXJtZT86IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJBZEFnZW50ICYmIFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuaGlkZUJsb2NrQWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65YWo5bGP6KeG6aKR5bm/5ZGKXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93RnVsbFNjcmVlblZpZGVvKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnZpZGVvQ2FsbEJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgdGhpcy5fY3VyQWRBZ2VudC5zaG93RnVsbFNjcmVlblZpZGVvKGNhbGxiYWNrKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGZhbHNlLCBcIuinhumikeWKoOi9veWksei0pe+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWNleS4quWOn+eUn+W5v+WRilxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNob3dTaW5nbGVOYXRpdmVBZChwYXJhbXM/OiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrU2hvd0FkVGltZSgpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmmL7npLrlub/lkYrmnaHml7bpl7TmnKrovr7pmZDliLbvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LlNob3dTaW5nbGVOYXRpdmVBZCAmJiB0aGlzLl9jdXJBZEFnZW50LlNob3dTaW5nbGVOYXRpdmVBZChwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WNleS4quWOn+eUn+W5v+WRilxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIEhpZGVTaW5nbGVOYXRpdmVBZChwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LkhpZGVTaW5nbGVOYXRpdmVBZCAmJiB0aGlzLl9jdXJBZEFnZW50LkhpZGVTaW5nbGVOYXRpdmVBZChwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmqKHniYjlub/lkYpcclxuICAgICAqIEBwYXJhbSBwYXJtYXMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93Q3VzdG9tQWQocGFyYW1zPzogYW55KSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Nob3dBZFRpbWUoKSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pi+56S65Y6f55Sf5qih54mI5bm/5ZGK5pe26Ze05pyq6L6+6ZmQ5Yi277yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LnNob3dDdXN0b21BZCAmJiB0aGlzLl9jdXJBZEFnZW50LnNob3dDdXN0b21BZChwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6ZqQ6JeP5qih54mI5bm/5ZGKXHJcbiAgICAqIEBwYXJhbSBwYXJtYXMgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGhpZGVDdXN0b21BZChwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VyQWRBZ2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJBZEFnZW50LmhpZGVDdXN0b21BZCAmJiB0aGlzLl9jdXJBZEFnZW50LmhpZGVDdXN0b21BZChwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIF9jdXN0b21BZFBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65qih54mI5by556qX5bm/5ZGKXHJcbiAgICAgKiBsZXZlbDog5b2T5YmN5YWz5Y2h5pWwXHJcbiAgICAgKiBjbG9zZUNhbGxGdW5jOkZ1bmN0aW9uIOWFs+mXreWQjueahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0N1c3RvbUFkUGFuZWwobGV2ZWw6IG51bWJlciwgY2xvc2VDYWxsRnVuYz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaYvuekuuaooeeJiOW8ueeql+W5v+WRilwiKTtcclxuICAgICAgICBpZiAoIXV0aWxzLl9pc0NvbmZpZ0luaXQpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm46XCIgKyBcIue7hOS7tumFjee9ruacquWIneWni+WMliFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3VzdG9tQWRJbmZvOiBDdXN0b21BZEluZm8gPSBudWxsO1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgY3VzdG9tQWRJbmZvID0gdXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5nZXRDdXN0b21BZEluZm9JbmZvKDEwMCk7XHJcbiAgICAgICAgICAgIGlmICghY3VzdG9tQWRJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUNhbGxGdW5jICYmIGNsb3NlQ2FsbEZ1bmMoKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajmnKrphY3nva7mqKHniYjlvLnnqpflub/lkYpcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbG9zZUNhbGxGdW5jICYmIGNsb3NlQ2FsbEZ1bmMoKTtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOacqumFjee9ruaooeeJiOW8ueeql+W5v+WRilwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1c3RvbV9wYW5lbF9zaG93X2FkX2xldmVsID0gdXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJjdXN0b21fcGFuZWxfc2hvd19hZF9sZXZlbFwiKTtcclxuICAgICAgICBpZiAoY3VzdG9tX3BhbmVsX3Nob3dfYWRfbGV2ZWwgJiYgbGV2ZWwgJSBjdXN0b21fcGFuZWxfc2hvd19hZF9sZXZlbCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQ2FsbEZ1bmMgJiYgY2xvc2VDYWxsRnVuYygpO1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u6Ze06ZqUXCIgKyBjdXN0b21fcGFuZWxfc2hvd19hZF9sZXZlbCArIFwi5YWz5pi+56S65qih54mI5by556qX5bm/5ZGKIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy55ekN1c3RvbUFkUGFuZWwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1ckFkQWdlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckFkQWdlbnQuY3JlYXRlQ3VzdG9tQURCYW5uZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy55ekN1c3RvbUFkUGFuZWwpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChZekN1c3RvbUFkUGFuZWwpLmNsb3NlQ2FsbEZ1bmMgPSBjbG9zZUNhbGxGdW5jO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbUFkUGFuZWwgJiYgY2MuaXNWYWxpZCh0aGlzLl9jdXN0b21BZFBhbmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFkUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tQWRQYW5lbCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXN0b21BZFBhbmVsLnpJbmRleCA9IDk5OTk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKG5vZGUsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyq5om+5Yiw6aKE5Yi25L2TIEN1c3RvbUFkUGFuZWwsIOivt+afpeeci0NvbW1vblV0aWxz57uE5Lu25LiK5piv5ZCm6LWL5YC877yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19