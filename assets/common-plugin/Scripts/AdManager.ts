import AdAgent from "./AdAgent";
import PlatUtils from "./PlatUtils";
import AdAgentNative from "./AdAgentNative";
import AdAgentWechat from "./AdAgentWechat";
import AdAgentOPPO from "./AdAgentOPPO";
import AdAgentVIVO from "./AdAgentVIVO";
import AdAgentBaidu from "./AdAgentBaidu";
import AdAgentDouyin from "./AdAgentDouyin";
import { BannerLocation, LevelStatus, BeForGameOverAdId, SubLocation } from "./YZ_Constant";
import AdAgentQQ from "./AdAgentQQ";
import AdAgentQTT from "./AdAgentQTT";
import { utils } from "./Utils";
import YZ_NativeItem from "./YZ_NativeItem";
import AdAgentXiaoMi from "./AdAgentXiaomi";
import AdAgent4399 from "./AdAgent4399";
import AdAgentIOS from "./AdAgentIOS";
import AdAgentCocosplay from "./AdAgentCocosplay";
import AdAgentUC from "./AdAgentUC";
import AdAgentBili from "./AdAgentBili";
import NativeTryGamesWidget from "./NativeTryGamesWidget";
import AdAgentKwai from "./AdAgentKwai";
import AdAgentBroser from "./AdAgentBroser";
import MoreGamesPanel from "./MoreGamesPanel";
import BeforGameOverRecGamesPanel from "./BeforGameOverRecGamesPanel";
import AdAgentWiFi from "./AdAgentWiFi";
import AdAgentHago from "./AdAgentHago";
import AdAgentHuaWei from "./AdAgentHuaWei";
import AdAgentFaceBook from "./AdAgentFaceBook";
import { CustomAdInfo } from "./CommonConfig";
import YzCustomAdPanel from "./YzCustomAdPanel";
import AdAgentGoogleWeb from "./AdAgentGoogleWeb";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdManager {

    private _curAdAgent: AdAgent = null;

    public videoCallBack: Function = null;


    public Init() {

        if (PlatUtils.IsNativeAndroid) {
            this._curAdAgent = new AdAgentNative();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsWechat) {
            this._curAdAgent = new AdAgentWechat();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsOPPO) {
            this._curAdAgent = new AdAgentOPPO();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsVIVO) {
            this._curAdAgent = new AdAgentVIVO();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsBaidu) {
            this._curAdAgent = new AdAgentBaidu();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsDouyin) {
            this._curAdAgent = new AdAgentDouyin();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsQQ) {
            this._curAdAgent = new AdAgentQQ();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsQTT) {
            this._curAdAgent = new AdAgentQTT();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsXiaoMi) {
            this._curAdAgent = new AdAgentXiaoMi();
            this._curAdAgent.Init();
        } else if (PlatUtils.ISUC) {
            this._curAdAgent = new AdAgentUC();
            this._curAdAgent.Init();
        } else if (PlatUtils.ISCocos) {
            this._curAdAgent = new AdAgentCocosplay();
            this._curAdAgent.Init();
        } else if (PlatUtils.Is4399) {
            this._curAdAgent = new AdAgent4399();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsNativeIOS) {
            this._curAdAgent = new AdAgentIOS();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsBili) {
            this._curAdAgent = new AdAgentBili();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsKwai) {
            this._curAdAgent = new AdAgentKwai();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsWiFi) {
            this._curAdAgent = new AdAgentWiFi();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsHago) {
            this._curAdAgent = new AdAgentHago();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsHuaWei) {
            this._curAdAgent = new AdAgentHuaWei();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsFaceBook) {
            this._curAdAgent = new AdAgentFaceBook();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsTest) {
            this._curAdAgent = new AdAgentBroser();
            this._curAdAgent.Init();
        } else if (PlatUtils.IsGoogleWeb) {
            this._curAdAgent = new AdAgentGoogleWeb();
            this._curAdAgent.Init();
        }
    }

    public OnUpdate(dt: number) { }
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
    public showNativeTryGameWidget(params: any = null) {

        if (!this.checkShowAdTime()) {
            utils.showLog("显示插屏时间未达限制！");
            return;
        }


        if (this._curAdAgent) {
            if (!utils.isShowNativeTryGamesWidget() || PlatUtils.IsHuaWei) {
                utils.showLog("不能显示原生抖动试玩")
                return;
            }
            this._curAdAgent.showNativeTryGameWidget(params);
        }
    }

    /**
     * 隐藏浮动试玩挂件
     */
    public hideNativeTryGameWidget() {
        if (this._curAdAgent) {
            this._curAdAgent.hideNativeTryGameWidget();
        }
    }

    /**
     * 展示开屏广告，当前只有华为平台生效
     */
    public showNativeSplashView(callBack: Function = null) {
        if (PlatUtils.IsHuaWei) {
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
    }


    /**
     * 显示广告条
     * @param location 位置
     * @param args 参数,控制广告条的宽度和位置,此参数只对微信平台有效,默认居中贴底显示.
     * {
     *  width: 广告条宽度,屏幕的百分比,取值范围0-1;
     *  bottom: 广告条距离屏幕底部的高度,单位是像素;
     * }
     */
    public ShowBanner(location: any = BannerLocation.Home, args: any = null) {

        if (!this.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        if (this._curAdAgent) {
            this._curAdAgent.ShowBanner(location, args);
        }
    }

    public HideBanner(location: BannerLocation) {
        if (this._curAdAgent) {
            this._curAdAgent.HideBanner(location);
        }
    }

    public ShowInterstitial(localtion: BannerLocation = BannerLocation.Home) {
        if (!this.checkShowAdTime()) {
            utils.showLog("显示插屏时间未达限制！");
            return;
        }

        if (!this.checkInsertAdTime()) {
            utils.showLog("显示插屏时间未达到间隔时间！");
            return;
        }

        if (this._curAdAgent) {
            this._curAdAgent.ShowInterstitial(localtion);
        }
    }

    /**
     * 播放视频广告
     * @param callback Function(ret:boolean,msg:string)
     * ret 看完视频返回true， 否则返回false
     * msg 播放失败的消息提示
     */
    public ShowVideo(callback: Function) {

        if (this._curAdAgent) {
            this.videoCallBack = callback;
            this._curAdAgent.ShowVideo(callback);
        } else {
            if (callback) callback(false, "视频加载失败！");
        }
    }



    /**
     * 显示互动直弹广告
     * --目前仅支持趣头条平台
     */
    public showInteractiveAd() {
        if (this._curAdAgent) {
            this._curAdAgent.showInteractiveAd();
        }
    }

    /**
     * 显示QQ游戏盒子广告
     */
    public ShowAppBox(isMoreGame?: boolean) {
        if (this._curAdAgent) {
            this._curAdAgent.ShowAppBox(isMoreGame);
        }
    }


    /**
    * 隐藏QQ游戏盒子广告
    * --目前仅支持QQ平台--
    */
    public HideAppBox() {
        if (this._curAdAgent) {
            this._curAdAgent.HideAppBox();
        }
    }

    /**
    * 显示激励插屏
    */
    public showRewardInsert(): void {
        if (this._curAdAgent) {
            utils.showLog("显示 RI");
            this._curAdAgent.showRewardInsert();
        }
    }

    /**
     * 隐藏激励插屏
     */
    public hideRewardInsert(): void {
        if (this._curAdAgent) {
            this._curAdAgent.hideRewardInsert();
        }
    }



    /**
     * 显示关闭按钮的Banner
     * @param location 
     * @param closeBtn 
     */
    public ShowCloseBtnBanner(location: BannerLocation = BannerLocation.Home, args: any) {
        if (!this.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        if (this._curAdAgent) {
            this._curAdAgent.ShowCloseBtnBanner(location, args);
        }
    }


    /**
     * 显示结算窗口的推荐广告
     */
    public ShowStatementRecomment(): cc.Node {
        if (this._curAdAgent) {
            if (PlatUtils.IsOPPO || PlatUtils.IsVIVO) {
                return this._curAdAgent.ShowStatementRecomment();
            } else if (PlatUtils.IsWechat) {
                return utils.showCrossWidget6();
            }
        }
        return null;
    }




    /**
     * 获取原生广告数据
     */
    public getNativeAdData(args?: any): any {
        if (this._curAdAgent) {
            utils.showLog("adManager 获取原生广告");
            return this._curAdAgent.getNativeAdData(args);
        }
        return null;
    }

    /**
     * 显示结算页面广告
     * @param data 参数
     * oppo、微信平台结算广告特殊处理
     * 趣头条平台结算广告为互动直弹
     * vivo、抖音、qq、xiaomi、baidu平台结算界面广告为插屏
     */
    public showStatementAds(data?: any): any {
        let res: any = { "type": -1, "node": null }
        if (!this.checkShowAdTime()) {
            utils.showLog("显示结算页面广告时间未达限制！");
            return res;
        }

        if (this._curAdAgent) {
            if (PlatUtils.IsWechat || PlatUtils.IsBaidu) {
                return this._curAdAgent.showStatementAds(data);
            }
        }
        if (PlatUtils.IsQTT) {
            utils.adManager.showInteractiveAd();
        } else {
            utils.adManager.ShowInterstitial();
        }

        utils.showLog("非oppo和微信平台正常显示结算广告");

        return res;
    }

    public createNativeAd(params: any = null, yzItem?: YZ_NativeItem) {
        if (this._curAdAgent) {
            this._curAdAgent.createNativeAd(params, yzItem);
        }
    }

    public hideKyxBanner() {
        if (this._curAdAgent) {
            this._curAdAgent.hideKyxBanner();
        }
    }
    public showBeforGameOverAd(level: number, levelStatus: LevelStatus, rewardValue: number, closeCallFunc: Function, rewardFunc: Function): void {

        if (PlatUtils.IsOPPO || PlatUtils.IsVIVO || PlatUtils.IsDouyin || PlatUtils.IsBaidu || PlatUtils.IsWechat || PlatUtils.IsQQ || PlatUtils.IsKwai || PlatUtils.IsNativeAndroid || PlatUtils.IsNativeIOS || utils._tool_Broswer || PlatUtils.IsWiFi || PlatUtils.IsHuaWei) {
            if (utils.ServerConfig && utils.ServerConfig.befor_ad_min_level && utils.ServerConfig.befor_ad_min_level >= level) {
                utils.showLog(`${level} >>服务器配置结算前广告在${utils.ServerConfig.befor_ad_min_level}关后才能显示！`);
                closeCallFunc && closeCallFunc();
                return;
            }

            utils.showLog("显示结算前广告：  #Level= ", level, " #LevelStatys=", levelStatus, " #rewardValue = ", rewardValue);
            utils.currentLevel = level;
            utils.isSuccess = levelStatus == LevelStatus.GameWin;
            utils.rewardCallFunc = rewardFunc;
            utils.rewardCloseFunc = closeCallFunc;
            utils.rewardValue = rewardValue;
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
            let adType = utils.adManager.checkShowBeforGameOverAd(level, levelStatus == LevelStatus.GameWin);
            switch (adType) {
                case BeForGameOverAdId.SharePanel:
                    utils.recordEnd();
                    utils.showShareRecordPanel();
                    break;
                case BeForGameOverAdId.GoldBox:
                    utils.adManager.showRewardBoxPanel();
                    break;
                case BeForGameOverAdId.Turntable:
                    utils.adManager.showrewardTurnTablePanel();
                    break;
                case BeForGameOverAdId.CreateShortCut:
                    utils.adManager.showRewardShortCutPanel();
                    break;
                case BeForGameOverAdId.RecGame:
                    utils.adManager.showRecGamePanel();
                    break
                case BeForGameOverAdId.LuckBox:
                    let show_level = utils.ServerConfig.reward_luck_box_show_level ? utils.ServerConfig.reward_luck_box_show_level : 0;
                    if (level > show_level) {
                        utils.adManager.showRewardLuckBoxPanel();
                    } else {
                        utils.showLog("幸运宝箱间隔关卡未达到！");
                        closeCallFunc && closeCallFunc();
                        utils.rewardCloseFunc = null;
                    }
                    break;
                default:
                    closeCallFunc && closeCallFunc();
                    utils.rewardCloseFunc = null;
                    break;
            }
        } else {
            closeCallFunc && closeCallFunc();
            utils.rewardCloseFunc = null;
        }


    }


    _lastShowGameOverAdType: BeForGameOverAdId = BeForGameOverAdId.None;
    //结算前广告类型数组
    beforRewardTypes: BeForGameOverAdId[] = [BeForGameOverAdId.SharePanel, BeForGameOverAdId.GoldBox, BeForGameOverAdId.Turntable, BeForGameOverAdId.CreateShortCut, BeForGameOverAdId.RecGame, BeForGameOverAdId.LuckBox];

    //结算前广告显示方法
    private getRewardCloseAndShowCallFunc(index): Function {
        let result: Function = null;
        switch (index) {
            case 1:
                result = utils.adManager.showShareRecordPanel;
                break;
            case 2:
                result = utils.adManager.showRewardBoxPanel
                break;
            case 3:
                result = utils.adManager.showrewardTurnTablePanel
                break;
            case 4:
                result = utils.adManager.showRewardShortCutPanel
                break;
            case 5:
                result = utils.adManager.showRecGamePanel
                break;
            case 6:
                result = utils.adManager.showRewardLuckBoxPanel
                break;
        }
        return result;
    }
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
    public checkShowBeforGameOverAd(level: number, isSuccess: boolean): BeForGameOverAdId {
        if (!this._curAdAgent || !utils.ServerConfig) {
            utils.showLog("组件初始化失败！");
            return BeForGameOverAdId.None;
        }
        let befor_game_over_reward_share_interval = utils.ServerConfig.befor_game_over_share_interval;
        let befor_game_over_reward_box_interval = utils.ServerConfig.befor_game_over_reward_box_interval;
        let befor_game_over_turntable_interval = utils.ServerConfig.befor_game_over_turntable_interval;
        let befor_game_over_shortcut_interval = utils.ServerConfig.auto_desktop_interval;
        let befor_game_over_rec_game_interval = utils.ServerConfig.befor_game_over_rec_game_interval;
        let befor_game_over_luck_box_interval = utils.ServerConfig.befor_game_over_luck_box_interval;



        let befor_game_over_reward_share_type = utils.ServerConfig.befor_game_over_share_type;
        let befor_game_over_reward_box_type = utils.ServerConfig.befor_game_over_reward_box_type;
        let befor_game_over_turntable_type = utils.ServerConfig.befor_game_over_turntable_type;
        let befor_game_over_rec_game_type = utils.ServerConfig.befor_game_over_rec_game_type;
        let befor_game_over_luck_box_type = utils.ServerConfig.befor_game_over_luck_box_type;


        let befor_game_over_shortcut_type = utils.ServerConfig.auto_desktop_type;



        let befor_game_over_is_sync = utils.ServerConfig.befor_game_over_sync_list;
        let befor_game_over_sync_interval = utils.ServerConfig.befor_game_over_sync_interval;
        let befor_game_over_sync_type = utils.ServerConfig.befor_game_over_sync_type;




        if (PlatUtils.IsTest) {

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
        let result = BeForGameOverAdId.None;
        let isShow = false;
        if (befor_game_over_is_sync) {
            utils.showLog("进入同步显示弹窗判断：", befor_game_over_is_sync, "<<interval=", befor_game_over_sync_interval, "<<<type", befor_game_over_sync_type);
            switch (befor_game_over_sync_type) {
                case "all":
                    isShow = true;
                    break;
                case "success":
                    isShow = isSuccess
                    break;
                case "fail":
                    isShow = !isSuccess
                    break;
            }

            if (isShow && befor_game_over_sync_interval && level % befor_game_over_sync_interval == 0) {
                let syncTypes: Array<string> = befor_game_over_is_sync.split("");
                for (let i = 0; i < syncTypes.length; i++) {
                    if (i == 0) {
                        result = this.beforRewardTypes[parseInt(syncTypes[i]) - 1];
                    }

                    let closeFunc = null;
                    if (i == syncTypes.length - 1) {
                        closeFunc = utils.rewardCloseFunc;
                    } else {
                        closeFunc = this.getRewardCloseAndShowCallFunc(parseInt(syncTypes[i + 1]));
                    }
                    switch (syncTypes[i]) {
                        case "1":
                            utils.shareRecordPanelCloseFunc = closeFunc;
                            break;
                        case "2":
                            utils.rewardBoxPanelCloseFunc = closeFunc;
                            break;
                        case "3":
                            utils.turnTablePanelCloseFunc = closeFunc;
                            break;
                        case "4":
                            utils.rewardShortCutPanelCloseFunc = closeFunc;
                            break;
                        case "5":
                            utils.rewardRecGamePanelCloseFunc = closeFunc;
                            break;
                        case "6":
                            utils.rewardLuckBoxPanelCloseFunc = closeFunc;
                            break;
                    }
                }
            }
        } else {


            let showCount = 0;

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
            utils.showLog("显示的类型" + showCount + "种，进行顺序切换判断,上一次显示的类型为：" + this._lastShowGameOverAdType)



            isShow = true;
            if (befor_game_over_reward_share_interval && level % befor_game_over_reward_share_interval == 0) {
                utils.showLog("进入显示分享奖励弹窗判断", befor_game_over_reward_share_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != BeForGameOverAdId.SharePanel;
                }
                if (isShow) {
                    switch (befor_game_over_reward_share_type) {
                        case "all":
                            utils.showLog(`间隔${befor_game_over_reward_share_interval}关，显示分享奖励弹窗！`);
                            result = BeForGameOverAdId.SharePanel;
                            break;
                        case "success":
                            if (isSuccess) {
                                result = BeForGameOverAdId.SharePanel;
                                utils.showLog(`游戏胜利 >> 间隔${befor_game_over_reward_share_interval}关，显示分享奖励弹窗！`);
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = BeForGameOverAdId.SharePanel;
                                utils.showLog(`游戏失败 >> 间隔${befor_game_over_reward_share_interval}关，显示分享奖励弹窗！`);
                            }
                            break;
                    }
                }

            }
            if (result != BeForGameOverAdId.None) {
                utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }


            if (befor_game_over_reward_box_interval && level % befor_game_over_reward_box_interval == 0) {
                utils.showLog("进入显示宝箱判断", befor_game_over_reward_box_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != BeForGameOverAdId.GoldBox;
                }
                if (isShow) {

                    switch (befor_game_over_reward_box_type) {
                        case "all":
                            result = BeForGameOverAdId.GoldBox;
                            utils.showLog(`间隔${befor_game_over_reward_box_interval}关，显示宝箱弹窗！`);
                            break;
                        case "success":
                            if (isSuccess) {
                                result = BeForGameOverAdId.GoldBox;
                                utils.showLog(`游戏胜利 >> 间隔${befor_game_over_reward_box_interval}关，显示宝箱弹窗！`);
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = BeForGameOverAdId.GoldBox;
                                utils.showLog(`游戏失败 >> 间隔${befor_game_over_reward_box_interval}关，显示宝箱弹窗！`);
                            }
                            break;
                    }
                }
            }

            if (result != BeForGameOverAdId.None) {
                utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }

            if (befor_game_over_turntable_interval && level % befor_game_over_turntable_interval == 0) {
                utils.showLog("进入显示抽奖弹窗判断", befor_game_over_turntable_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != BeForGameOverAdId.Turntable;
                }
                if (isShow) {
                    switch (befor_game_over_turntable_type) {
                        case "all":
                            result = BeForGameOverAdId.Turntable;
                            utils.showLog(`间隔${befor_game_over_turntable_interval}关，显示抽奖弹窗！`);
                            break;
                        case "success":
                            if (isSuccess) {
                                result = BeForGameOverAdId.Turntable;
                                utils.showLog(`游戏胜利 >> 间隔${befor_game_over_turntable_interval}关，显示抽奖弹窗！`);
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = BeForGameOverAdId.Turntable;
                                utils.showLog(`游戏失败 >> 间隔${befor_game_over_turntable_interval}关，显示抽奖弹窗！`);
                            }
                            break;
                    }
                }
            }

            if (result != BeForGameOverAdId.None) {
                utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }

            if (befor_game_over_shortcut_interval && level % befor_game_over_shortcut_interval == 0) {
                utils.showLog("进入显示添加桌面弹窗判断", befor_game_over_shortcut_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != BeForGameOverAdId.CreateShortCut;
                }
                if (isShow) {
                    switch (befor_game_over_shortcut_type) {
                        case "all":
                            result = BeForGameOverAdId.CreateShortCut;
                            utils.showLog(`间隔${befor_game_over_shortcut_interval}关，显示添加桌面弹窗！`);
                            break;
                        case "success":
                            if (isSuccess) {
                                result = BeForGameOverAdId.CreateShortCut;
                                utils.showLog(`游戏胜利 >> 间隔${befor_game_over_shortcut_interval}关，显示添加桌面弹窗！`);
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = BeForGameOverAdId.CreateShortCut;
                                utils.showLog(`游戏失败 >> 间隔${befor_game_over_shortcut_interval}关，显示添加桌面弹窗！`);
                            }
                            break;
                    }
                }
            } else {
                utils.showLog("结算前广告验证完成，不显示结算前广告！");
            }

            if (result != BeForGameOverAdId.None) {
                utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }

            if (befor_game_over_rec_game_interval && level % befor_game_over_rec_game_interval == 0) {
                utils.showLog("进入显示游戏推荐弹窗判断", befor_game_over_rec_game_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != BeForGameOverAdId.RecGame;
                }
                if (isShow) {
                    switch (befor_game_over_rec_game_type) {
                        case "all":
                            result = BeForGameOverAdId.RecGame;
                            utils.showLog(`间隔${befor_game_over_rec_game_interval}关，显示游戏推荐弹窗！`);
                            break;
                        case "success":
                            if (isSuccess) {
                                result = BeForGameOverAdId.RecGame;
                                utils.showLog(`游戏胜利 >> 间隔${befor_game_over_rec_game_interval}关，显示游戏推荐弹窗！`);
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = BeForGameOverAdId.RecGame;
                                utils.showLog(`游戏失败 >> 间隔${befor_game_over_rec_game_interval}关，显示游戏推荐弹窗！`);
                            }
                            break;
                    }
                }
            } else {
                utils.showLog("结算前广告验证完成，不显示更多游戏广告！");
            }

            if (result != BeForGameOverAdId.None) {
                utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
                this._lastShowGameOverAdType = result;
                return result;
            }

            if (befor_game_over_luck_box_interval && level % befor_game_over_luck_box_interval == 0) {
                utils.showLog("进入显示幸运宝箱弹窗判断", befor_game_over_luck_box_type, "<<");
                if (showCount > 1) {
                    isShow = this._lastShowGameOverAdType != BeForGameOverAdId.LuckBox;
                }
                if (isShow) {
                    switch (befor_game_over_luck_box_type) {
                        case "all":
                            result = BeForGameOverAdId.LuckBox;
                            utils.showLog(`间隔${befor_game_over_luck_box_interval}关，显示游戏推荐弹窗！`);
                            break;
                        case "success":
                            if (isSuccess) {
                                result = BeForGameOverAdId.LuckBox;
                                utils.showLog(`游戏胜利 >> 间隔${befor_game_over_luck_box_interval}关，显示游戏推荐弹窗！`);
                            }
                            break;
                        case "fail":
                            if (!isSuccess) {
                                result = BeForGameOverAdId.LuckBox;
                                utils.showLog(`游戏失败 >> 间隔${befor_game_over_luck_box_interval}关，显示游戏推荐弹窗！`);
                            }
                            break;
                    }
                }
            } else {
                utils.showLog("结算前广告验证完成，不显示幸运宝箱弹窗！");
            }
        }

        utils.showLog("结算前广告验证完成，显示结算前广告类型：", result);
        this._lastShowGameOverAdType = result;
        return result;
    }


    /**
    * 显示录屏分享窗口
    * @param params 
    */
    public showShareRecordPanel(params: any = null) {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (utils.config.otherconfig.shareRecordPanel) {
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.shareRecordPanel);
            if (node) {
                if (utils.shareRecordPanel && cc.isValid(utils.shareRecordPanel)) {
                    utils.shareRecordPanel.destroy();
                }
                utils.shareRecordPanel = node;
                utils.shareRecordPanel.zIndex = 9999;
                let widget: cc.Widget = node.getComponent(cc.Widget);

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
                    } else if (params.bottom != null) {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = true;
                        widget.bottom = params.bottom;
                    }
                    if (params.left != null) {
                        widget.isAlignLeft = true;
                        widget.isAlignRight = false;
                        widget.left = params.left;
                    } else if (params.right != null) {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = true;
                        widget.right = params.right;
                    }
                    if (params.parent != null) {
                        node.parent = params.parent;
                    } else {
                        cc.director.getScene().addChild(utils.shareRecordPanel, 1000);
                    }
                } else {
                    cc.director.getScene().addChild(utils.shareRecordPanel, 1000);
                }
                widget.updateAlignment();
                return node;
            }
        } else {
            utils.showLog("未找到预制体 ShareRecordPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }


    rewardBoxPanel: cc.Node = null;
    /**
    * 显示宝箱窗口
    * @param params 
    */
    public showRewardBoxPanel(): cc.Node {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (utils.config.otherconfig.rewardBoxPanel) {
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.rewardBoxPanel);
            if (node) {
                if (this.rewardBoxPanel && cc.isValid(this.rewardBoxPanel)) {
                    this.rewardBoxPanel.destroy();
                }
                this.rewardBoxPanel = node;
                this.rewardBoxPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        } else {
            utils.showLog("未找到预制体 rewardBoxPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }


    rewardRecGamePanel: cc.Node = null;
    /**
    * 显示更多游戏推荐窗口
    * @param params 
    */
    public showRecGamePanel(): cc.Node {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (utils.config.otherconfig.beforGameOverRecGamesPanel && utils.getRecommondGameList()) {
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.beforGameOverRecGamesPanel);
            if (node) {
                if (this.rewardRecGamePanel && cc.isValid(this.rewardRecGamePanel)) {
                    this.rewardRecGamePanel.destroy();
                }
                this.rewardRecGamePanel = node;
                this.rewardRecGamePanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                let recMoreGame: BeforGameOverRecGamesPanel = this.rewardRecGamePanel.getComponent(BeforGameOverRecGamesPanel);
                recMoreGame._location = SubLocation.isBeforGameOverAd;
                recMoreGame.init(utils.getRecommondGameList());
                recMoreGame.show();

                return node;
            }
        } else {
            utils.showLog("未找到预制体 moreGamesPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }



    rewardTurnTablePanel: cc.Node = null;
    /**
    * 显示转盘抽奖窗口
    * @param params 
    */
    public showrewardTurnTablePanel(): cc.Node {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (utils.config.otherconfig.rewardTurnTablePanel) {
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.rewardTurnTablePanel);
            if (node) {
                if (this.rewardTurnTablePanel && cc.isValid(this.rewardTurnTablePanel)) {
                    this.rewardTurnTablePanel.destroy();
                }
                this.rewardTurnTablePanel = node;
                this.rewardTurnTablePanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        } else {
            utils.showLog("未找到预制体 rewardTurnTablePanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }

    rewardShortCutPanel: cc.Node = null;
    /**
    * 显示转盘抽奖窗口
    * @param params 
    */
    public showRewardShortCutPanel(): cc.Node {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (utils.config.otherconfig.rewardShortCutPanel) {
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.rewardShortCutPanel);
            if (node) {
                if (this.rewardShortCutPanel && cc.isValid(this.rewardShortCutPanel)) {
                    this.rewardShortCutPanel.destroy();
                }
                this.rewardShortCutPanel = node;
                this.rewardShortCutPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        } else {
            utils.showLog("未找到预制体 rewardShortCutPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }


    _rewardLuckBoxPanel: cc.Node = null;
    /**
    * 展示幸运宝箱弹窗
    * @param params 
    */
    public showRewardLuckBoxPanel(): cc.Node {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }

        if (utils.config.otherconfig.rewardLuckBoxPanel) {
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.rewardLuckBoxPanel);
            if (node) {
                if (this._rewardLuckBoxPanel && cc.isValid(this._rewardLuckBoxPanel)) {
                    this._rewardLuckBoxPanel.destroy();
                }
                this._rewardLuckBoxPanel = node;
                this._rewardLuckBoxPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        } else {
            utils.showLog("未找到预制体 RewardLuckBoxPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }


    /**
     * 验证广告显示时间是否达到
     * @returns true:大于服务器时间  false:小于服务器时间
     */
    public checkShowAdTime(): boolean {
        // if (CC_DEBUG) return true;

        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return false;
        }

        let curTime: number = new Date().getTime();
        let interval: number = (curTime - utils._gameEntryTime) / 1000;
        let showAdTime: number = 0;

        if (PlatUtils.IsOPPO) {
            showAdTime = 90;
        }
        if (utils.getConfigByKey("show_ad_time") !== "") {
            showAdTime = utils.getConfigByKey("show_ad_time");
        }

        utils.showLog("验证当前广告显示时间：#showAdTime=", showAdTime, " #interval=", interval);
        if (interval >= showAdTime) {
            return true;
        }
        return false;
    }


    _insertLastShowTime: number = 0;
    /**
     * 验证是否能够显示插屏
     * @returns true 可以显示，false 未达到要求不显示
     */
    checkInsertAdTime() {

        // utils.ServerConfig.insert_ad_interval_time = 5;
        if (utils.ServerConfig && utils.ServerConfig.insert_ad_interval_time) {
            let curTime: number = new Date().getTime();
            let interval: number = (curTime - this._insertLastShowTime) / 1000;
            if (interval < utils.ServerConfig.insert_ad_interval_time) {
                utils.showLog("验证当前插屏广告显示时间：#showAdTime=", utils.ServerConfig.insert_ad_interval_time, " #interval=", interval);
                return false;
            }
            this._insertLastShowTime = curTime;
        }

        return true;
    }




    /**
     * 显示积木广告
     * @param parme {top,bottom}
     */
    public showBlockAd(parme?: any) {
        if (this._curAdAgent && PlatUtils.IsQQ) {
            this._curAdAgent.showBlockAd(parme);
        }
    }

    public hideBlockAd(parme?: any) {
        if (this._curAdAgent && PlatUtils.IsQQ) {
            this._curAdAgent.hideBlockAd();
        }
    }


    /**
     * 显示全屏视频广告
     * @param callback 
     */
    public showFullScreenVideo(callback?: Function) {
        if (this._curAdAgent) {
            // this.videoCallBack = callback;
            this._curAdAgent.showFullScreenVideo(callback);
        } else {
            if (callback) callback(false, "视频加载失败！");
        }
    }



    /**
     * 显示单个原生广告
     * @param params 
     */
    public ShowSingleNativeAd(params?: any) {

        if (!this.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }


        if (this._curAdAgent) {
            this._curAdAgent.ShowSingleNativeAd && this._curAdAgent.ShowSingleNativeAd(params);
        }
    }

    /**
     * 隐藏单个原生广告
     * @param params 
     */
    public HideSingleNativeAd(params?: any) {
        if (this._curAdAgent) {
            this._curAdAgent.HideSingleNativeAd && this._curAdAgent.HideSingleNativeAd(params);
        }
    }


    /**
     * 显示模版广告
     * @param parmas 
     */
    public showCustomAd(params?: any) {

        if (!this.checkShowAdTime()) {
            utils.showLog("显示原生模版广告时间未达限制！");
            return;
        }

        if (this._curAdAgent) {
            this._curAdAgent.showCustomAd && this._curAdAgent.showCustomAd(params);
        }
    }

    /**
    * 隐藏模版广告
    * @param parmas 
    */
    public hideCustomAd(params?: any) {
        if (this._curAdAgent) {
            this._curAdAgent.hideCustomAd && this._curAdAgent.hideCustomAd(params);
        }
    }



    _customAdPanel: cc.Node = null;
    /**
     * 显示模版弹窗广告
     * level: 当前关卡数
     * closeCallFunc:Function 关闭后的回调
     */
    public showCustomAdPanel(level: number, closeCallFunc?: Function) {
        utils.showLog("显示模版弹窗广告");
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        let customAdInfo: CustomAdInfo = null;
        if (PlatUtils.IsWechat) {
            customAdInfo = utils.config.wechatconfig.getCustomAdInfoInfo(100);
            if (!customAdInfo) {
                closeCallFunc && closeCallFunc();
                utils.showLog("服务器未配置模版弹窗广告");
                return;
            }
        } else {
            closeCallFunc && closeCallFunc();
            utils.showLog("服务器未配置模版弹窗广告");
            return;
        }

        let custom_panel_show_ad_level = utils.getConfigByKey("custom_panel_show_ad_level");
        if (custom_panel_show_ad_level && level % custom_panel_show_ad_level != 0) {
            closeCallFunc && closeCallFunc();
            utils.showLog("服务器配置间隔" + custom_panel_show_ad_level + "关显示模版弹窗广告!");
            return;
        }

        if (utils.config.otherconfig.yzCustomAdPanel) {
            if (this._curAdAgent) {
                this._curAdAgent.createCustomADBanner();
            }
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.yzCustomAdPanel);
            node.getComponent(YzCustomAdPanel).closeCallFunc = closeCallFunc;
            if (node) {
                if (this._customAdPanel && cc.isValid(this._customAdPanel)) {
                    this._customAdPanel.destroy();
                }
                this._customAdPanel = node;
                this._customAdPanel.zIndex = 9999;
                cc.director.getScene().addChild(node, 1000);
                return node;
            }
        } else {
            utils.showLog("未找到预制体 CustomAdPanel, 请查看CommonUtils组件上是否赋值！");
        }
        return null;
    }

}
