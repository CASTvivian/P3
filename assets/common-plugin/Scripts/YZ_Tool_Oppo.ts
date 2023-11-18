import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YouWanAnalytics from "./YouWanSDK/YouWanAnalytics";
import YZ_Constant, { BannerLocation, LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

//@ts-ignore
var uma = require('./UMengSDK/quickGame/uma.min.js');
const { ccclass, property } = cc._decorator;
// http://apps.youlesp.com/gss?m=gconfig&uid=xxx&app_id=xxx&channel=xxx&device_uid=xxx
//获取服务器配置
const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";

let ST_DefaultServerConfig: string = "";

const ST_NativeInsertAdClickTimes: string = "NativeInsertAdClickTimes";
const ST_LastDateTime: string = "LastDateTime";
const ST_InsertAdShowCounts: string = "NativeInsertAdShowCount"; //插屏显示次数
const ST_BannerAdCloseCounts: string = "ST_BannerAdCloseCounts"; //banner广告关闭次数
const ST_YZBannerShowCounts: string = "YZBannerShowCounts"; //banner广告关闭次数


@ccclass
export default class YZ_Tool_Oppo {
    //@ts-ignore
    qg: any = qg;
    /*
    COREVersion	    string	版本号
    brand	        string	手机品牌
    language	    string	当前环境设置的语言
    model	        string	手机型号
    notchHeight	    number	凹槽高度(刘海屏高度)
    pixelRatio	    number	设备像素比
    platform	    string	客户端平台
    platformVersion	number	平台版本号
    screenHeight	number	屏幕高度
    screenWidth	    number	屏幕宽度
    system	        string	操作系统版本
    windowHeight	number	可使用窗口高度
    windowWidth	    number	可使用窗口宽度
    */
    _sysInfo: any = null;
    public get SysInfo() {
        return this._sysInfo;
    }

    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.oppoconfig.version;
    }


    //用户来源
    _source: string = "";
    /**
    * OPPO服务器配置数据
    * {
    * 
-- "banner_close_full_count_showyz":"true" //banner达到显示次数之后是否显示自定义banner .默认：不填写
--"native_banner_delay_time": 1,  //banner和插屏都是原生优先的话，延迟展示banner. 单位：秒 。默认：不填写
-- "statement_auto_refresh": 1,   // 结算广告刷新频率。 单位：秒。 默认不填写为3秒。
-- "is_bottom_banner_list":"true" //是否显示自定义的banner 默认：不填写
-- "refresh_ad_time":15 //banner广告刷新的间隔时间。单位：秒 默认：不填写
-- "close_btn_fade_in_time":0  //跳过按钮延迟显示的时间。单位：秒  默认：不填写
-- "st_spare_type": 4,   // 结算广告备选类型， 当statement_type为1或者2的时候判断是否显示达到限制。达到限制的时候显示当前备选的组件；值 =（3、4、5）。 默认：不填写
-- "native_banner_delay_time": 1   //如果banner和插屏都优先展示原生就延迟调用。 单位：秒。默认1秒
-- “intersititial_open_close_banner”:0 ,//插屏显示后是操作Banner, 0 ：为不开启，1:为销毁，2:隐藏   默认：1
--  "banner_close_count":0 ,  //banner关闭次数达到限制后不显示   0:不限制次数，>0：限制的次数达到后不再显示banner  默认：5
--  "st_sync":"true"    //判断结算广告类型为4、5的时候，是否同时显示，默认true
--  "statement_type": 1、2、3、4、5
                       一、游戏结算广告展示
                       1.显示默认插屏广告
                       2.显示插屏广告  (默认优先或原生优先，也就是目前展示的规则)
                       3.显示插屏广告+6个互推 (默认优先或原生优先，也就是目前展示的规则)
                       4.显示插屏广告、原生广告（没有互推的单个原生广告） 1：(默认优先或原生优先，也就是目前展示的规则) 2、默认插屏和原生广告同时展示
                       5.显示插屏广告、原生广告（有3个互推+原生的广告） 1、(原生优先或者插屏优先，和同时展示) 2、默认插屏和原生广告同时展示
--  "intersititial_max_show_count": 8,   //插屏最大显示次数 默认：8
--  "intersititial_interval_time": 60,   //插屏显示间隔数 默认：60
--	"intersititial_open_close_banner": "true", //插屏显示的时候是否隐藏banner
--	"reward_first_ad": "video", // 激励视频显示优先级别： video：激励视频，insert:激励互推
--	"is_reward_intersititia": "true",
--  "native_single_pos_id":[],  //单个原生广告ID--用于结算组件
-- "is_move_btn":0  //是否开启移动按钮效果 默认不开启 0：显示banner,且按钮在上面。 1: 显示Banner,按钮居底部且移动 3: 大于0的话按照时间移动按钮


-- 暂未覆盖其他游戏
--	"auto_sign": "false", //是否自动弹出签到 默认：false
--	"try_skin_level_count": 5, // 皮肤试用的关卡数量 默认：5关


--	"intersititia_delay_show_time": 0.5,   // 插屏广告延时展示时间/秒 默认值0.5
--	"intersititia_close_delay_time": 1,    // 关闭按钮延时显示时间/秒，默认 1
--	"intersititia_close_but_alpha": 120,   // 关闭按钮alpha, 默认 120
--  "intersititia_close_but_size": 100,    // 关闭按钮大小
--  "intersititia_close_but_range": 100,   // 关闭按钮点击范围
--  "intersititial_first_ad": "native",    // 插屏广告优先展示类型 [default 小游戏广告， native 原生广告]
--  "intersititia_click_count": 1,         // 插屏广告点击每天次数控制/次数
--	"intersititia_show_interval": 1,       // 插屏广告展示间隔/次数。intersititia_click_count 次数达到后启用
--  "intersititial_click_close": "false"   // 点击关闭按钮后是否关闭广告， 默认值 false

--	"banner_show_height": 120,         // 广告条的高度，最低160         
--	"banner_close_but_show": "true",   // 是否显示关闭按钮 [true 显示， false 不显示]， 默认值 true
--	"banner_close_but_alpha": 120,     // 关闭按钮alpha,默认 120
--  "banner_close_but_size": 33,       // 关闭按钮大小, 默认 33
--  "banner_close_but_range": 33,      // 关闭按钮点击范围, 默认 33
--	"banner_first_ad": "native",       // 广告优先展示类型[default 小游戏广告， native 原生广告, yzbanner 自定义banner] 
--  "banner_click_refresh": "true",    // 广告点击后是否刷新，默认值 true

   "is_local_pos_id": "false",                                 // 是否使用本地广告id
   "intersititia_pos_id": "96292",                             // 小游戏插屏id
   "banner_pos_id": "96293",                                   // 小游戏banner id
   "video_pos_id": "96294",                                    // 小游戏视频id
   "native_intersititial_pos_id": ["96297", "96298"],          // 原生插屏id
   "native_banner_pos_id": ["96295", "96296"],                 // 原生banner id 
   "is_jump": "true",                                          // 是否显示游戏内交叉推广组件，交叉推广挂件刷新频率
   "jump_list": [{                                             // 交叉推广挂件内容信息
       "name": "子弹先生狙击战场",
       "icon": "https://xcx.youletd.com/xcx/icon/zdxsjjzc.png",
       "pkg": "com.yzxx.zdxsjjzc.kyx.nearme.gamecenter"
   }, {
       "name": "翻滚的香肠",
       "icon": "https://xcx.youletd.com/xcx/icon/fgdxc.png",
       "pkg": "com.yzxx.fgdxc.kyx.nearme.gamecenter"
   }]
   }
    */
    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    _nativeInsertAdClickTimes: number = 0;
    public get NativeInsertAdClickTimes() {
        return this._nativeInsertAdClickTimes;
    }

    _insertAdShowCounts: number = 0;
    /**
     * 插屏广告展示次数
     */
    public get insertAdShowCounts() {
        return this._insertAdShowCounts;
    }

    _bannerAdCloseCounts: number = 0;
    /**
     * banner关闭次数
     */
    public get bannerAdCloseCounts() {
        return this._bannerAdCloseCounts;
    }

    _yzBannerShowCounts: number = 0;
    /**
     * 自定义banner展示次数
     */
    public get yzBannerShowCounts() {
        return this._yzBannerShowCounts;
    }


    // 桌面图标是否创建
    _shortcutCreated: boolean = false;
    public get ShortcutCreated() {
        return this._shortcutCreated;
    }

    //设备UID
    _uid: string = "0";

    public get uid() {
        if (this._uid != "0") return this._uid;
        this._login();
        return "0";
    }

    //服务器返回UID
    _service_uid: number = 0;

    /**
     * 服务器返回UID
     */
    public get serviceId() {
        if (this._service_uid != 0) return this._service_uid;
        this.reportLogin();
        return "0";
    }

    //设备ID
    _device_id = "";

    //本地uuid
    _uuid: string = "";

    //优玩UID
    _yw_uid: number = -1;

    /**
     * 
     * @param data 配置数据
     */
    public init(data: string) {
        if (PlatUtils.IsOPPO) {

            this.umaInit()
            //@ts-ignore
            this._sysInfo = qg.getSystemInfoSync();
            if (this.SysInfo) {
                utils.showLog("OPPO 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }

            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.oppo) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.oppo);
                }
            }
            this._yw_uid = parseInt(YZ_LocalStorage.getItem(YZ_Constant.ST_YOUWAN_UID, "-1"));


            this._device_id = YZ_LocalStorage.getItem(YZ_Constant.ST_DEVICE_ID);
            if (!this._device_id) {
                cc.game.on(YZ_Constant.YZ_PrivacyClose, () => {
                    this.initDeviceId();
                }, this);
            }

            //获取小程序启动来源
            if (this.isOverMiniVersion("1050")) {
                //@ts-ignore
                let options = qg.getLaunchOptionsSync();
                options && console.log("options>>>", JSON.stringify(options));
                if (options && options.referrerInfo && options.referrerInfo.package) {
                    utils.showLog("获取到小程序启动来源：" + options.referrerInfo.package);
                    this._source = options.referrerInfo.package;
                }
            } else {
                utils.showLog(`小程序版本低于1050，获取不到小程序启动来源！`);
            }

            this._login();
            let appId = utils.config.oppoconfig.appID + "_";
            this._nativeInsertAdClickTimes = YZ_LocalStorage.getItem(appId + ST_NativeInsertAdClickTimes);
            this._insertAdShowCounts = YZ_LocalStorage.getItem(appId + ST_InsertAdShowCounts);
            this._bannerAdCloseCounts = YZ_LocalStorage.getItem(appId + ST_BannerAdCloseCounts);
            this._yzBannerShowCounts = YZ_LocalStorage.getItem(appId + ST_YZBannerShowCounts);

            let day: string = YZ_LocalStorage.getItem(appId + ST_LastDateTime);
            let curDate = new Date();


            if (day != curDate.toDateString()) {
                this._nativeInsertAdClickTimes = 0;
                this._insertAdShowCounts = 0;
                this._bannerAdCloseCounts = 0;
                this._yzBannerShowCounts = 0;
                YZ_LocalStorage.setItem(appId + ST_YZBannerShowCounts, 0);
                YZ_LocalStorage.setItem(appId + ST_NativeInsertAdClickTimes, 0);
                YZ_LocalStorage.setItem(appId + ST_InsertAdShowCounts, 0);
                YZ_LocalStorage.setItem(appId + ST_LastDateTime, curDate.toDateString());
                YZ_LocalStorage.setItem(YZ_Constant.ST_GET_DEVICE_ID, "0");
            }


            //@ts-ignore
            utils.registerServerInitEvent(() => {
                //检测桌面图标是否创建
                if (this.isOverMiniVersion("1044")) {
                    this.checkHasShortCut((res) => {
                        if (!res && utils.ServerConfig && utils.ServerConfig.start_auto_create_short_cut_time) {
                            utils.showLog(`组件初始化成功，${utils.ServerConfig.start_auto_create_short_cut_time}秒后弹出自动创建桌面！`)
                            utils.SendEvent("组件初始化成功，弹出自动创建桌面！");
                            setTimeout(() => {
                                this.createShortcut((res) => {
                                    if (res) {
                                        utils.showLog("自动创建桌面成功！");
                                    } else {
                                        utils.showLog("自动创建桌面失败！");
                                    }
                                });
                            }, utils.ServerConfig.start_auto_create_short_cut_time * 1000);
                        }
                    });
                }

            }, this);
        }

        this._loadConfig();

    }

    _reloadTimes: number = 6;
    _curloadTimes: number = 0;

    /**
     * 保存服务器配置到本地
     * @param data 
     */
    _saveConfig(data: any) {

    }


    _loadConfig() {
        if (PlatUtils.IsOPPO) {
            let method: string = "m=g" + `&device_data=${encodeURI(JSON.stringify(this._sysInfo))}`;
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                this._curloadTimes++;
                let recall: boolean = false;
                utils.showLog(`第${this._curloadTimes}次拉取服务器配置!`)
                if (ret) {
                    utils.showLog("OPPO服务器配置数据获取成功: data = " + data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                                if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                    utils.showLogView = true;
                                }
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("OPPO服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("OPPO服务器配置数据获取失败, 使用本地配置!");
                    if (this._curloadTimes < this._reloadTimes) {
                        utils.showLog("重新拉取配置!");
                        recall = true;
                    }
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else if (this._curloadTimes == 1) {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.oppoconfig.bannerId = this.ServerConfig.banner_pos_id;
                        utils.config.oppoconfig.insertId = this.ServerConfig.intersititia_pos_id;
                        utils.config.oppoconfig.videoId = this.ServerConfig.video_pos_id;
                        utils.config.oppoconfig.nativeInsertIds = this.ServerConfig.native_intersititial_pos_id;
                        utils.config.oppoconfig.nativeBannerIds = this.ServerConfig.native_banner_pos_id;
                        utils.config.oppoconfig.nativeTryGameIds = this.ServerConfig.native_trygame_pos_id;
                        utils.config.oppoconfig.recGameBannerId = this.ServerConfig.rec_game_banner_id;
                        utils.config.oppoconfig.recPortalId = this.ServerConfig.rec_portal_id;
                        utils.config.oppoconfig.recGameDrawerId = this.ServerConfig.rec_game_drawer_id || utils.config.oppoconfig.recGameDrawerId;
                        utils.config.oppoconfig.nativeSingleAdIds = this.ServerConfig.native_single_pos_id || utils.config.oppoconfig.nativeSingleAdIds;
                        utils.config.oppoconfig.intersitialAdConfigs = this.ServerConfig.intersitial_configs || utils.config.oppoconfig.intersitialAdConfigs;
                        utils.config.oppoconfig.bannerAdConfigs = this.ServerConfig.banner_configs || utils.config.oppoconfig.bannerAdConfigs;
                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                    if (this.ServerConfig.get_device_id && this.ServerConfig.get_device_id == "false") {
                        this.isGetDeviceId = false;
                    }
                    if (this.ServerConfig.native_banner_configs) {
                        for (let i = 0; i < this.ServerConfig.native_banner_configs.length; i++) {
                            utils.showLog("获取到原生广告配置:" + this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_banner_configs[i]));
                            utils.config.oppoconfig.setNativeBannerInfo(this.ServerConfig.native_banner_configs[i].location, this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                }

                if (this._curloadTimes == 1) {
                    // 只有第一次拉取才会发送事件
                    utils.emitServerInitEvent();
                }

                if (recall) {
                    this._loadConfig();
                }
            });
        }
    }

    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    public isOverMiniVersion(miniVersion: string) {
        if (PlatUtils.IsOPPO) {
            if (this._sysInfo) {
                utils.showLog("curPlatVersion = " + this._sysInfo.platformVersion + "miniVersion = " + miniVersion + "" + (this._sysInfo.platformVersion >= miniVersion));

                return this._sysInfo.platformVersion >= miniVersion;
            }
        }
        return false;
    }

    /**
     * 验证桌面快捷方式是否创建过
     * @param callBack 
     */
    public checkHasShortCut(callBack?: Function) {
        this.qg.hasShortcutInstalled({
            success: (res) => {
                utils.showLog("检测桌面快捷方式是否已经创建过: result=", res);
                if (res == false) {
                    this._shortcutCreated = false;
                    callBack && callBack(false);
                } else {
                    this._shortcutCreated = true;
                    callBack && callBack(true);
                }
            },
            fail: function () {
                utils.showLog("检测失败！");
            },
            complete: function () {
                utils.showLog("检测完成！");
            }
        });
    }

    public hideDefaultLoadingPage() {
        if (PlatUtils.IsOPPO) {
            //@ts-ignore
            qg.loadingComplete({
                complete: function (res) { }
            });
        }
    }


    public countNativeInserClick() {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage.setItem(utils.config.oppoconfig.appID + "_" + ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    }

    /**
     * 增加插屏显示的次数
     */
    public countInserShowCount() {
        this._insertAdShowCounts++;
        YZ_LocalStorage.setItem(utils.config.oppoconfig.appID + "_" + ST_InsertAdShowCounts, this._insertAdShowCounts);
    }

    /**
     * 增加banner的关闭次数
     */
    public countBannerCloseCount() {
        this._bannerAdCloseCounts++;
        YZ_LocalStorage.setItem(utils.config.oppoconfig.appID + "_" + ST_BannerAdCloseCounts, this._bannerAdCloseCounts);
    }

    /**
    * 增加自定义banner的显示次数
    */
    public countYzBannerShowCount() {
        this._yzBannerShowCounts++;
        YZ_LocalStorage.setItem(utils.config.oppoconfig.appID + "_" + ST_YZBannerShowCounts, this._yzBannerShowCounts);
    }


    /**
     * 跳转到指定的小游戏
     * @param pkgName 包名
     * @param callback Function(ret) 跳转回调. ret: true | false
     */
    public navigateToMiniGame(pkgName: string, callback: Function) {
        if (PlatUtils.IsOPPO) {
            let completeCallback: Function = callback;
            //@ts-ignore
            qg.navigateToMiniGame({
                pkgName: pkgName,
                success: function () {
                    utils.showLog("跳转成功！");
                    if (completeCallback) {
                        completeCallback(true);
                    }
                },
                fail: function (res) {
                    utils.showLog("跳转失败！");
                    if (completeCallback) {
                        completeCallback(false);
                    }
                }
            });
        }
    }


    /**
     * 是否可以创建桌面图标
     */
    public canCreateShortcut() {
        if (PlatUtils.IsOPPO) {
            return this.isOverMiniVersion("1040");
        }
        return false;
    }


    /**
     * 创建桌面快捷方式
     */
    public createShortcut(callback: Function) {
        if (PlatUtils.IsOPPO) {
            let callbackFunc = callback;
            let self = this;
            //@ts-ignore
            qg.installShortcut({
                success: function () {
                    utils.showLog('桌面图标创建成功！');
                    self._shortcutCreated = true;
                    if (callbackFunc) {
                        callbackFunc(true);
                    }
                },
                fail: function (err) {
                    utils.showLog("createShortcut >>>fail");
                    if (callbackFunc) {
                        callbackFunc(false);
                    }
                },
                complete: function () {
                    utils.showLog("createShortcut >>>complete");
                }
            });
        }
    }

    /**
     * 上报数据
     */
    public postData(otherGameAppId: string) {
        if (PlatUtils.IsOPPO) {
            let method = "m=rjump";
            let url: string = POST_ServerUrl + method + `&jump_app_id=${otherGameAppId}`;
            // utils.showLog("上报数据, url=" + url);
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("数据上报成功！");
                } else {
                    utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    }

    /**
     * 上报数据
     * 
     */
    public postGameSourece(source: string) {
        if (PlatUtils.IsOPPO) {
            let appid: string = utils.config.oppoconfig.appID;
            let uid: string = this._uid;
            let channel: string = utils.config.oppoconfig.channel ? utils.config.oppoconfig.channel.toLowerCase() : "oppo";
            let url = POST_ServerUrl + `kyx=true&app_id=${appid}&channel=${channel}&uid=${this._uid}&source=${source}`;

            // let url: string = `http://apps.youlesp.com/gs?m=jump&app_id=${appid}&uid=${uid}&channel=${channel}&jump_app_id=${otherGameAppId}`;
            utils.showLog("上报游戏来源数据, url=" + url);
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("数据上报成功！");
                } else {
                    utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    }


    _loginTime: number = 0;
    _loginInterval: number = 30;
    _login() {

        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._loginTime) / 1000;
        if (interval > 0 && interval < this._loginInterval) {
            utils.showLog(`登录请求间隔小于：${this._loginInterval}秒`);
            return;
        }
        this._loginTime = curTime;
        let self = this;

        this._uid = YZ_LocalStorage.getItem(YZ_Constant.ST_UID);
        this._uid = this._uid ? this._uid : "0";

        this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
        this._service_uid = this._service_uid ? this._service_uid : 0;
        utils.showLog("获取本地保存的uid=" + this._uid + "，服务器UID=" + this._service_uid);

        if (this._uid == "0") {
            if (this.isOverMiniVersion("1040")) {
                //@ts-ignore
                qg.login({
                    success: function (res) {
                        if (res.data.uid) {
                            self._uid = "" + res.data.uid;
                            utils.showLog("登录成功! uid=" + self._uid);
                            YZ_LocalStorage.setItem(YZ_Constant.ST_UID, self._uid);
                        }
                    },
                    fail: function (res) {
                        utils.showLog("登录失败!");
                    },
                    complete: () => {
                        this.reportLogin();
                    }
                });

            } else {
                utils.showLog("快游戏平台版本低于1040，无法登录取UID，直接获取服务器ID");
                this.reportLogin();
            }

        } else {
            let ysxy = YZ_LocalStorage.getItem(YZ_Constant.YZ_GAME_YSXY);
            if (ysxy) {
                this.initDeviceId();
            }
        }

    }


    //是否获取deviceId
    private isGetDeviceId: boolean = true;

    public initDeviceId(): void {
        utils.showLog("oppo initDeviceId!  #isGetDeviceId=" + this.isGetDeviceId);

        let todayIsGet = YZ_LocalStorage.getItem(YZ_Constant.ST_GET_DEVICE_ID, "0");
        //@ts-ignore
        if (this.isGetDeviceId && qg.getDeviceId && todayIsGet == 0) {
            YZ_LocalStorage.setItem(YZ_Constant.ST_GET_DEVICE_ID, "1");

            //@ts-ignore
            qg.getDeviceId({
                success: (data) => {
                    utils.showLog(`getDeviceId success: deviceId=${data.deviceId}`);
                    this._device_id = data.deviceId;
                    YZ_LocalStorage.setItem(YZ_Constant.ST_DEVICE_ID, data.deviceId);
                    this.reportDevice();
                },
                fail: function (data, code) {
                    utils.showLog(`getDeviceId fail, code = ${code}`);
                },
            });
        } else {
            this.reportDevice();
        }

    }
    _reportLoginTime: number = 0;
    _reportLoginInterval: number = 30;
    isReport: boolean = false;

    /**
     * 上报登录接口获取UID
     */
    async reportLogin() {
        utils.showLog("reportLogin >>>>>>>>>>>");
        if (this.isReport) return;
        this.isReport = true;


        let self = this;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._reportLoginTime) / 1000;
        if (interval > 0 && interval < this._reportLoginInterval) {
            utils.showLog(`上报登录获取UID小于：${this._reportLoginInterval}秒`);
            return;
        }
        this._reportLoginTime = curTime;
        let method = "m=login";
        let url: string = ST_ServerUrl + method + `&device_data=${encodeURI(JSON.stringify(this._sysInfo))}`;

        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                if (data) {
                    let result = JSON.parse(data);
                    if (result.uid) {
                        self._service_uid = result.uid;
                        utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage.setItem(YZ_Constant.ST_SERVICE_UID, self._service_uid);
                    }

                }
            }
            this.isReport = false;
        })
    }

    /**
     * 获取交叉推广数据
     */
    public getRecommondGameList() {
        if (PlatUtils.IsOPPO && utils.oppoTool && utils.oppoTool.ServerConfig) {
            return utils.oppoTool.ServerConfig.jump_list;
        }

        return null;
    }

    public showMsg(msg: string) {
        if (PlatUtils.IsOPPO) {
            //@ts-ignore
            qg.showToast({
                title: `${msg}`,
                icon: 'none',
                duration: 2000
            })
        }
    }
    /**
       * 弹出提示框
       * @param msg 消息
       */
    public showToast(msg: string) {
        if (PlatUtils.IsOPPO) {
            //@ts-ignore
            qg.showToast({
                title: msg,
                icon: "none",
                duration: 2000
            })
        }
    }

    /**
     * 上报互推组件数据
     * @param otherGameAppId 跳转的ID
     * @param location 当前位置
     * @param status 0:点击，1:跳转成功
     */
    public postDataByLocation(otherGameAppId: string, location: string, status: number = 0) {
        if (PlatUtils.IsOPPO) {

            let method = "m=rjump";
            let url: string = POST_ServerUrl + method + `&jump_app_id=${otherGameAppId}&location=${location}&status=${status}`
            // utils.showLog("上报数据, url=" + url);

            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    let result = JSON.parse(data);
                    utils.showLog(`数据上报成功`);

                    if (result && result.jump_list && result.jump_list.length > 0) {
                        utils.oppoTool.ServerConfig.jump_list = result.jump_list;
                    }
                } else {
                    utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    }

    /**
    * 上报互推组件显示位置
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    public postRecommentShowData(location: string) {
        if (PlatUtils.IsOPPO) {
            let method = "m=rjumpshow";
            let url: string = POST_ServerUrl + method + `&location=${location}`;
            // utils.showLog("上报数据, url=" + url);
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("数据上报成功！");
                } else {
                    utils.showLog("数据上报失败！");
                }
            }.bind(this));
        }
    }

    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsOPPO) {
            let method = "m=rlevelv3";
            let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
            if (status == LevelStatus.GameStart) {
                url += `&device_data=${encodeURI(JSON.stringify(this._sysInfo))}`;
            }
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("关卡数据上报成功！");
                } else {
                    utils.showLog("关卡数据上报失败！");
                }
                if (!ret || status != LevelStatus.GameStart) return;
                if (ret && status == LevelStatus.GameStart) {
                    utils.showLog("OPPO服务器配置数据获取成功: data = " + data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                                if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                    utils.showLogView = true;
                                }
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("OPPO服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("OPPO服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else if (this._curloadTimes == 1) {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id 22");
                        utils.config.oppoconfig.bannerId = this.ServerConfig.banner_pos_id;
                        utils.config.oppoconfig.insertId = this.ServerConfig.intersititia_pos_id;
                        utils.config.oppoconfig.videoId = this.ServerConfig.video_pos_id;
                        utils.config.oppoconfig.nativeInsertIds = this.ServerConfig.native_intersititial_pos_id;
                        utils.config.oppoconfig.nativeBannerIds = this.ServerConfig.native_banner_pos_id;
                        utils.config.oppoconfig.nativeTryGameIds = this.ServerConfig.native_trygame_pos_id;
                        utils.config.oppoconfig.recGameBannerId = this.ServerConfig.rec_game_banner_id;
                        utils.config.oppoconfig.recPortalId = this.ServerConfig.rec_portal_id;
                        utils.config.oppoconfig.intersitialAdConfigs = this.ServerConfig.intersitial_configs || utils.config.oppoconfig.intersitialAdConfigs;
                        utils.config.oppoconfig.bannerAdConfigs = this.ServerConfig.banner_configs || utils.config.oppoconfig.bannerAdConfigs;
                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                    if (this.ServerConfig.native_banner_configs) {
                        utils.config.oppoconfig.nativeBannerInfos.length = 0;
                        for (let i = 0; i < this.ServerConfig.native_banner_configs.length; i++) {
                            utils.showLog("获取到原生广告配置:" + this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_banner_configs[i]));
                            utils.config.oppoconfig.setNativeBannerInfo(this.ServerConfig.native_banner_configs[i].location, this.ServerConfig.native_banner_configs[i]);
                        }
                    }

                }

            }.bind(this));
        }
    }

    /**
     * 是否支持互推
     */
    canShowRecommend() {
        if (this.isOverMiniVersion("1076")) {
            return true;
        }
        return false;
    }


    /**
     * 是否支持新的互推
     */
    canShowNewRecommend() {
        if (this.isOverMiniVersion("1090")) {
            return true;
        }
        return false;
    }

    _rec_is_banner: boolean = false;
    _rec_game_banner: any = null;
    /**
     * 展示OPPO互推banner
     */
    showOppoRecBanner(location?: BannerLocation) {

        if (!this.canShowRecommend()) {
            utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }

        if (utils.config.oppoconfig.recGameBannerId) {
            this._rec_is_banner = true;
            if (this._rec_game_banner) {
                this.hideOppoRecBanner();
            }


            this._rec_game_banner = this.qg.createGameBannerAd({
                adUnitId: utils.config.oppoconfig.recGameBannerId
            })

            this._rec_game_banner.onLoad(() => {
                utils.showLog('互推banner加载成功!')
            });

            // this._rec_game_banner.show().then(() => {
            //     utils.showLog('互推banner展示成功！')
            // }).catch((error) => {
            //     utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
            // })

            this._rec_game_banner.onError((err) => {
                utils.showLog('互推banner加载异常!', err.errCode + ',' + err.errMsg)
                this._rec_game_banner.destroy();
                this._rec_game_banner = null;
            })

            this._rec_game_banner.show().then(() => {
                this.showRecHideNativeAd();

                utils.showLog('互推banner展示成功！')
                if (location) {
                    utils.SendEvent("互推Banner展示成功，位置：" + location);
                }
            }).catch(function (error) {
                utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
            })

        } else {
            utils.showLog("OPPO 互推banner ID未配置！");
        }
    }

    showRecHideNativeAd() {
        if (this.ServerConfig
            && this.ServerConfig.show_rec_hide_native_ad
            && this.ServerConfig.show_rec_hide_native_ad == "false") {
            utils.showLog("互推展示成功之后不执行隐藏原生广告");
            return;
        }
        utils.adManager.HideBanner(0);
        utils.adManager.HideSingleNativeAd();
        utils.adManager.hideNativeTryGameWidget();
        utils.showLog("互推展示成功之后隐藏原生广告");
    }
    /**
    * 展示OPPO互推banner
    */
    showOppoNewRecBanner(params: any = null) {

        if (!this.canShowNewRecommend()) {
            utils.showLog("当前版本不支持显示官方新互推Banner！");
            return false;
        }

        if (utils.config.oppoconfig.recGameBannerId) {

            this._rec_is_banner = false;
            if (this._rec_game_banner) {
                this.hideOppoRecBanner();
            }
            let style: any = {};
            if (params) {
                if (params.orientation === "vertical") {
                    if (params.left != undefined) {
                        style.left = params.left / cc.winSize.width * this.SysInfo.screenWidth;
                    } else if (params.right != undefined) {
                        style.left = (this.SysInfo.screenWidth - 155) - (params.right / cc.winSize.width * this.SysInfo.screenWidth);
                    }

                    if (params.bottom != undefined) {
                        style.top = (this.SysInfo.screenHeight - 720) - (params.bottom / cc.winSize.height * this.SysInfo.screenHeight);

                    } else {
                        style.top = params.top / cc.winSize.height * this.SysInfo.screenHeight;
                    }
                } else {
                    if (params.left != undefined) {
                        style.left = params.left / cc.winSize.width * this.SysInfo.screenWidth;
                    } else if (params.right != undefined) {
                        style.left = (this.SysInfo.screenWidth - 720) - (params.right / cc.winSize.width * this.SysInfo.screenWidth);
                    }

                    if (params.bottom != undefined) {
                        style.top = (this.SysInfo.screenHeight - 200) - (params.bottom / cc.winSize.height * this.SysInfo.screenHeight);
                    } else {
                        style.top = params.top / cc.winSize.height * this.SysInfo.screenHeight;
                    }
                }
            }
            style.orientation = params.orientation ? params.orientation : "horizontal";
            utils.showLog("rec banner style>>>>>", JSON.stringify(style));
            this._rec_game_banner = this.qg.createGameBannerAd({
                adUnitId: utils.config.oppoconfig.recGameBannerId,
                style: style
            })

            this._rec_game_banner.onLoad(() => {
                utils.showLog('互推banner加载成功!')
            });

            // this._rec_game_banner.show().then(() => {
            //     utils.showLog('互推banner展示成功！')
            // }).catch((error) => {
            //     utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
            // })

            this._rec_game_banner.onError((err) => {
                utils.showLog('互推banner加载异常!', err.errCode + ',' + err.errMsg)
                this._rec_game_banner.destroy();
                this._rec_game_banner = null;
            })

            this._rec_game_banner.show().then(() => {
                this.showRecHideNativeAd();

                utils.showLog('互推banner展示成功！')
                if (location) {
                    utils.SendEvent("互推Banner展示成功，位置：" + location);
                }
            }).catch(function (error) {
                utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
            })

        } else {
            utils.showLog("OPPO 互推banner ID未配置！");
        }
    }


    /**
     * 隐藏互推banner
     */
    hideOppoRecBanner(callBack?: Function) {
        if (this._rec_game_banner) {
            this._rec_game_banner.destroy().then(() => {
                callBack && callBack();
                utils.showLog('OPPO 互推banner 隐藏成功！')
            }).catch((error) => {
                utils.showLog('OPPO 互推banner 隐藏失败:' + error.errCode + ',' + error.errMsg)
                this._rec_game_banner.hide();
            })
            this._rec_game_banner = null;
        }
    }

    _rec_game_portal: any = null;
    /**
     * 展示OPPO九宫格
     */
    showOppoGamePortal() {
        if (!this.canShowRecommend()) {
            utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }
        if (!utils.adManager.checkShowAdTime()) {
            utils.showLog("显示广告条时间未达限制！");
            return;
        }

        if (utils.config.oppoconfig.recPortalId) {
            if (!this._rec_game_portal) {
                this._rec_game_portal = this.qg.createGamePortalAd({
                    adUnitId: utils.config.oppoconfig.recPortalId
                })
                this._rec_game_portal.load().then(() => {
                    this.showRecHideNativeAd();
                    utils.showLog('九宫格互推加载成功！')
                }).catch((error) => {
                    this._rec_game_portal.destroy()
                    this._rec_game_portal = null;
                    utils.showLog('九宫格互推加载失败:' + error.errCode + ',' + error.errMsg)
                })

                this._rec_game_portal.onLoad(() => {
                    utils.showLog('互推盒子九宫格广告加载成功')
                    this._rec_game_portal.show().then(() => {
                        utils.showLog('互推盒子九宫格广告-显示成功！')
                    }).catch((error) => {
                        this._rec_game_portal.destroy()
                        this._rec_game_portal = null;
                        utils.showLog('互推盒子九宫格广告-显示失败:' + error.errCode + ',' + error.errMsg)
                    })
                })
                this._rec_game_portal.onClose(function () {
                    utils.showLog('互推盒子九宫格广告关闭')
                })
            } else {
                this._rec_game_portal.load().then(() => {
                    this.showRecHideNativeAd();
                    utils.showLog('九宫格互推加载成功！')
                }).catch((error) => {
                    this._rec_game_portal.destroy()
                    this._rec_game_portal = null;
                    utils.showLog('九宫格互推加载失败:' + error.errCode + ',' + error.errMsg)
                })
            }
        } else {
            utils.showLog("OPPO 互推九宫格 ID未配置！");
        }
    }

    /**
      * 上报自定义事件
      * @param level 当前关卡ID
      * @param levelName 关卡名称
      * @param status 状态
      */
    public sendEvent(eventName: string) {
        if (PlatUtils.IsOPPO) {
            let method = "m=revent";
            let url: string = POST_ServerUrl + method + `&event=${encodeURI(eventName)}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("上报自定义事件成功！");
                } else {
                    utils.showLog("上报自定义事件失败！");
                }
            }.bind(this));
        }
    }



    _gameDrawerAd: any = null;
    /**
     * 显示互推盒子广告
     * @param top 顶部距离
     * @returns 
     */
    public showGameDrawerAd(params): void {

        if (!utils.config.oppoconfig.recGameDrawerId) {
            utils.showLog('服务器没有配置互推抽屉样式的ID，请反馈给运营！')
            return;
        }

        if (this.canShowNewRecommend()) {

            if (this._gameDrawerAd) {
                this.hideGameDrawerAd();
            }

            let style: any = {};
            if (params.bottom != undefined) {
                style.top = (this.SysInfo.screenHeight - 490) - (params.bottom / cc.winSize.height * this.SysInfo.screenHeight);
            } else {
                style.top = params.top / cc.winSize.height * this.SysInfo.screenHeight;
            }
            utils.showLog(" rec game drawer style >>>" + JSON.stringify(style))
            this._gameDrawerAd = this.qg.createGameDrawerAd({
                adUnitId: utils.config.oppoconfig.recGameDrawerId,
                style: style
            })

            this._gameDrawerAd.onShow(function () {
                utils.showLog('showGameDrawerAd success')
                this.showRecHideNativeAd();
            });


            this._gameDrawerAd.show().then(() => {
                utils.showLog('showGameDrawerAd success')
                this.showRecHideNativeAd();
            }).catch(function (error) {
                utils.showLog('showGameDrawerAd fail with:' + error.errCode + ',' + error.errMsg)
            })
        } else {
            utils.showLog('快应用平台版本号低于1090，暂不支持互推盒子相关 API')
        }

    }

    /**
     * 隐藏抽屉盒子
     */
    public hideGameDrawerAd(callBack?: Function): void {
        if (this._gameDrawerAd) {
            this._gameDrawerAd.destroy().then(function () {
                callBack && callBack();
                utils.showLog('hideGameDrawerAd success')
            }).catch(function (error) {
                utils.showLog('hideGameDrawerAd fail with:' + error.errCode + ',' + error.errMsg)
                this._gameDrawerAd.hide();
            })
            this._gameDrawerAd = null;
        }
    }


    /**友盟sdk初始化 */
    umaInit() {
        if (!this.checkUmeng()) {
            utils.showLog("友盟ID未配置，不执行友盟初始化>>>>");
            return;
        }

        uma.init({
            appKey: utils.config.oppoconfig.umengId,
            useOpenid: false,
            debug: CC_DEBUG
        })
    }

    /**
       * 友盟游戏开始上报
       * @param levelID 
       */
    public umaOnStart(levelID: string) {
        if (!this.checkUmeng()) return;
        //@ts-ignore
        qg.uma.stage.onStart({
            stageId: levelID,//该字段名称不可修改，必传
            stageName: `第${levelID}关`// 关卡id
        })
    }

    /**
     * 
     * @returns 是否开启友盟 
     */
    private checkUmeng(): boolean {
        if (!utils.config.oppoconfig.umengId) {
            return false;
        }
        return true;
    }
    /**
     * 友盟结算上报
     * @param levelID 关卡id
     * @param stageId 
     * @param event 
     */
    public umaReportedLevel(levelID: string, event: LevelStatus) {
        if (!this.checkUmeng()) return;

        //@ts-ignore
        qg.uma.stage.onEnd({
            stageId: levelID,//该字段名称不可修改，必传
            stageName: `第${levelID}关`,
            event: event
        })
    }


    /**
     * 友盟自定义事件
     * @param eventId 事件ID，注意：事件ID必须要在后台配置
     * @param params 事件内容
     */
    public umaTrackEvent(eventId: string, params?) {
        if (!this.checkUmeng()) return;

        //@ts-ignore
        qg.uma.trackEvent(eventId, params);
    }

    /**
  * 退出游戏
  */
    public GameExit() {
        if (PlatUtils.IsOPPO) {
            utils.showLog("tool oppo GameExit");
            try {
                //@ts-ignore
                qg.exitApplication({
                    success: () => {
                        console.log("退出成功！");
                    },
                    fail: () => {
                        console.log("退出失败！");
                    },
                    complete: () => {
                        console.log("退出执行完成！");
                    }
                });
            } catch (error) {
                cc.log("GameExit erro:", JSON.stringify(error));
            }
        }
    }

    isReportDevice: boolean = false;

    public reportDevice() {
        if (this.isReportDevice) {
            return;
        }

        this.isReportDevice = true;
        YouWanAnalytics.login((res) => {
            this.isReportDevice = false;
        });
        // let xhr = new XMLHttpRequest();
        // xhr.timeout = 6000;    // 单位毫秒
        // xhr.open('POST', requestUrl);
        // xhr.send(`data=${JSON.stringify(data)}`);
        // xhr.onreadystatechange = () => {
        //     utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
        //     if (xhr.readyState == 4) {
        //         if (xhr.status == 200) {

        //             if (xhr.responseText) {
        //                 try {
        //                     let result = JSON.parse(xhr.responseText);
        //                     if (result.code == 0) {
        //                         utils.showLog("上报设备ID成功! >>result:" + xhr.responseText + " #uid=" + result.data.uid);
        //                         localStorage.setItem(YZ_Constant.ST_YOUWAN_UID, result.data.uid);
        //                     }
        //                 } catch (error) {
        //                     utils.showLog("上报设备ID失败，#erro=" + error);
        //                 }

        //             }
        //         } else {
        //             this.isReportDevice = false;
        //             utils.showLog("上报设备ID失败!");
        //         }
        //     }
        // }
        // xhr.ontimeout = () => {
        //     this.isReportDevice = false;
        //     utils.showLog("请求超时!");
        // }
        // xhr.onerror = () => {
        //     this.isReportDevice = false;
        //     utils.showLog("请求异常!");

        // }
    }


}
