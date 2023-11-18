"use strict";
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