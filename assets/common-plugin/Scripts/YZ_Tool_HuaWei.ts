import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { AttributedKey, AttributedType, AttributedValue, LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";
//@ts-ignore
var uma = require('./UMengSDK/quickGame/uma.min.js');

const { ccclass, property } = cc._decorator;

let ST_DefaultServerConfig: string = "";
const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";
const ST_NativeInsertAdClickTimes: string = "NativeInsertAdClickTimes";
const ST_LastDateTime: string = "LastDateTime";

@ccclass
export default class YZ_Tool_HuaWei {
    //@ts-ignore
    qg: any = window.qg;
    /*
    brand	String	设备品牌
    manufacturer	String	设备生产商
    model	String	设备型号
    product	String	设备代号
    osType	String	操作系统名称
    osVersionName	String	操作系统版本名称
    osVersionCode	Number	操作系统版本号
    platformVersionName	String	运行平台版本名称
    platformVersionCode	Number	运行平台版本号
    language	String	系统语言
    region	String	系统地区
    screenWidth	Number	屏幕宽
    screenHeight	Number	屏幕高
    battery	Number	当前电量，0.0 - 1.0 之间
    wifiSignal	Number	wifi信号强度，范围0 - 4
    */
    _sysInfo: any = null;
    public get SysInfo() {
        return this._sysInfo;
    }

    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    _nativeInsertAdClickTimes: number = 0;
    public get NativeInsertAdClickTimes() {
        return this._nativeInsertAdClickTimes;
    }

    // 桌面图标是否创建
    _shortcutCreated: boolean = false;
    public get ShortcutCreated() {
        return this._shortcutCreated;
    }

    //设备UID
    _uid: string = "0";

    public get uid() {
        // if (this._service_uid != "0") return this._uid;
        // this._login();
        return "0";
    }

    //服务器返回UID
    _service_uid: string = "0";

    /**
     * 服务器返回UID
     */
    public get serviceId() {
        if (this._service_uid != "0") return this._service_uid;
        this.reportLogin();
        return "0";
    }


    _loginTime: number = 0;
    _loginInterval: number = 30;
    async _login() {

        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._loginTime) / 1000;
        if (interval > 0 && interval < this._loginInterval) {
            utils.showLog(`登录请求间隔小于：${this._loginInterval}秒`);
            return;
        }
        this._loginTime = curTime;
        let self = this;
        this._uid = "0";
        this.reportLogin();

    }

    _reportLoginTime: number = 0;
    _reportLoginInterval: number = 30;
    isReport: boolean = false;
    //用户来源
    _source: string = "";

    //启动来源类型：shortcut、url、app、quickapp、deeplink、other
    _luanchType: string = "";
    //启动参数
    _luanchData: string = "";

    //是否上报激活
    isReportActive: boolean = false;

    //回传类型 === activate:用户首次打开 app login:用户完成登陆行为 subscribe:闯一关（用户完成某项服务/频道订阅行为）
    yz_conversion_type: string = "";

    /**
     * 上报登录接口获取UID
     */
    reportLogin() {
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
                    utils.showLog("data=" + data);
                    utils.showLog("result=" + result);
                    utils.showLog("result.uid=" + result.uid);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage.setItem(YZ_Constant.ST_SERVICE_UID, self._service_uid);
                        if (this.yz_conversion_type == "activate") {
                            self.reportUserActive();
                        }
                        if (this.yz_conversion_type == "login" && this._is_login) {
                            utils.showLog("用户完成登陆行为!");
                            this.reportUserActive();
                        }

                    }
                }
            } else {
                utils.showLog("获取数据失败1");
            }
            this.isReport = false;
        })
    }



    /**
     * 上报用户激活，用于回传
     */
    public reportUserActive(): void {
        utils.showLog("上报用户激活！！");
        if (!this.isReportActive) {
            this.isReportActive = true;
            this.reportAttributedEvent(AttributedType.Active, AttributedKey.Active, AttributedValue.Active);
        }
    }
    /**
     * 
     * @param data 配置数据
     */
    public init(data: string) {
        if (PlatUtils.IsHuaWei) {
            this.umaInit()
            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.huawei) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.huawei);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";


            this._sysInfo = this.qg.getSystemInfoSync();
            if (this._sysInfo) {
                utils.showLog("huawei 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }

            let options = this.qg.getLaunchOptionsSync()

            this._luanchData = YZ_LocalStorage.getItem(YZ_Constant.ST_LUANCH_DATA);
            this._luanchType = YZ_LocalStorage.getItem(YZ_Constant.ST_LUANCH_TYPE);

            if (this._luanchData && this._luanchType) {
                utils.showLog("获取到本地缓存数据启动类型：" + this._luanchType);
                utils.showLog("获取到本地缓存数据启动参数：" + this._luanchData);
            } else if (options) {
                try {
                    if (options.referrerInfo && JSON.stringify(options.referrerInfo) != "{}") {
                        let referrerInfo = options.referrerInfo;
                        utils.showLog("获取到小程序启动来源信息：" + JSON.stringify(referrerInfo));
                        this._luanchType = referrerInfo.type;
                        YZ_LocalStorage.setItem(YZ_Constant.ST_LUANCH_TYPE, this._luanchType);
                    }

                    if (options.query && JSON.stringify(options.query) != "{}") {
                        let query = JSON.parse(options.query);
                        let queryData = JSON.stringify(query);
                        this._luanchData = queryData;

                        this.yz_conversion_type = query.yz_conversion_type;
                        YZ_LocalStorage.setItem(YZ_Constant.ST_LUANCH_DATA, this._luanchData);
                        utils.showLog("获取到小程序启动参数：" + queryData + " 回传类型：" + this.yz_conversion_type);
                    }
                } catch (erro) {
                    utils.showLog("获取到小程序启动参数异常");
                }
            }




            this._loadConfig();

            this._nativeInsertAdClickTimes = YZ_LocalStorage.getItem(ST_NativeInsertAdClickTimes);
            let day: string = YZ_LocalStorage.getItem(ST_LastDateTime);
            let curDate = new Date();
            if (day != curDate.toDateString()) {
                this._nativeInsertAdClickTimes = 0;
                YZ_LocalStorage.setItem(ST_NativeInsertAdClickTimes, 0);
            }


            // utils.registerServerInitEvent(() => {
            //     if (this.yz_conversion_type == "game_time_report") {
            //         utils.scheduleOnce(() => {
            //             this.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.GameTimeAction);
            //         }, utils.getConfigByKey("game_time_report"));
            //     }
            // }, this);



        }
    }

    // _buildServerUrl() {
    //     if (PlatUtils.IsHuaWei) {
    //         let url: string = "";
    //         if (utils.config.huaweiConfig && utils.config.huaweiConfig.appID) {
    //             url = ST_ServerUrl + "kyx=true&app_id=" + utils.config.huaweiConfig.appID.trim() + "&" + "channel=vivo";
    //         } else {
    //             utils.showLog("VIVO APPID配置出错！");
    //         }
    //         return url;
    //     }

    //     return null;
    // }



    _loadConfig() {
        if (PlatUtils.IsHuaWei) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {

                if (ret) {
                    utils.showLog("Huawei服务器配置数据获取成功: data = " + data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                                if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                    utils.showLogView = true;
                                }
                            } else {
                                utils.showLog("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("Huawei服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("Huawei服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.huaweiConfig.bannerId = this._serverConfig.banner_pos_id;
                        utils.config.huaweiConfig.insertId = this._serverConfig.intersititia_pos_id;
                        utils.config.huaweiConfig.videoId = this._serverConfig.video_pos_id;
                        utils.config.huaweiConfig.nativeInsertIds = this.ServerConfig.native_intersititial_pos_id;
                        utils.config.huaweiConfig.nativeBannerIds = this.ServerConfig.native_banner_pos_id;
                        utils.config.huaweiConfig.nativeTryGameIds = this.ServerConfig.native_trygame_pos_id;
                        utils.config.huaweiConfig.nativeSplashId = this.ServerConfig.native_splash_id;

                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                    if (this.ServerConfig.native_banner_configs) {
                        for (let i = 0; i < this.ServerConfig.native_banner_configs.length; i++) {
                            utils.showLog("获取到原生广告配置:" + this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_banner_configs[i]));
                            utils.config.huaweiConfig.setNativeBannerInfo(this.ServerConfig.native_banner_configs[i].location, this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                    if (this.ServerConfig.yz_conversion_type) {
                        this.yz_conversion_type = this.ServerConfig.yz_conversion_type;
                        utils.showLog("回传类型：" + this.yz_conversion_type);
                    }
                    if (this.ServerConfig.is_login && this.ServerConfig.is_login == "false") {
                        this._is_login = true;
                    }

                    this._isShowLogin = true;
                    this.isRequestLogin && this.login();
                }
                cc.director.emit("IsDataInit");

                // utils.registerPrivacyCloseEvent(() => {
                utils.emitServerInitEvent();
                // }, this);
            });
        }
    }

    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    public isOverMiniVersion(miniVersion: string) {
        if (PlatUtils.IsHuaWei) {
            if (this._sysInfo && this._sysInfo.platformVersionCode) {
                return this._sysInfo.platformVersionCode >= miniVersion;
            }
        }
        return false;
    }




    /**
     * 创建桌面图标
     */
    public createShortcut(callback: Function) {
        let callbackFunc = callback;

        if (PlatUtils.IsHuaWei && this.canCreateShortcut()) {
            let self = this;
            self.qg.installShortcut({
                success: function () {
                    utils.showLog('桌面图标创建成功！');
                    self._shortcutCreated = true;
                    if (callbackFunc) {
                        callbackFunc(true);
                    }
                },
                fail: function (err) {
                    self._shortcutCreated = true;
                    cc.log('vivo创建失败err' + err);
                    if (callbackFunc) {
                        callbackFunc(false);
                    }
                },
                complete: function () {
                }
            });
        } else {
            cc.log("不能创建");
            if (callbackFunc) {
                callbackFunc(false);
            }
        }
    }

    /**
     * 是否可以创建桌面图标, 当前平台是否支持创建快捷方式
     */
    public canCreateShortcut() {
        if (PlatUtils.IsHuaWei) {
            return this.isOverMiniVersion("1041");
        }
        return false;
    }

    public countNativeInserClick() {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage.setItem(ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    }

    /**
     * 分享事件
     * @param callback 分享回调
     */
    public share(callback?: Function) {
        if (!this.isOverMiniVersion("1052")) {
            callback && callback(false, "当前平台不支持");
            return;
        }
        this.qg.share();
        callback && callback(true);
        return;
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

    passCount: number = 0; //通关数据
    playCount: number = 0; //开始关卡数据
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsHuaWei) {
            if (this.yz_conversion_type == "subscribe") {
                utils.showLog("用户完成某项服务/频道订阅行为");
                this.reportUserActive();
            }

            if (status == LevelStatus.GameWin) {
                this.passCount++;
                if (this.passCount === utils.getConfigByKey("pass_level_count_active")) {
                    this.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.PassLevelCountAction);
                }
            } else if (status === LevelStatus.GameStart) {
                this.playCount++;
                if (this.playCount == utils.getConfigByKey("play_level_count_active")) {
                    this.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.PlayLevelCountAction);
                }
            }


            let method = "m=rlevel";
            let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("关卡数据上报成功！");
                } else {
                    utils.showLog("关卡数据上报失败！");
                }
            }.bind(this));
        }
    }

    /**
   * 上报自定义事件
   * @param level 当前关卡ID
   * @param levelName 关卡名称
   * @param status 状态
   */
    public sendEvent(eventName: string) {
        if (PlatUtils.IsHuaWei) {
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


    /**
    * 弹出提示框
    * @param msg 消息
    */
    public showToast(msg: string) {
        if (PlatUtils.IsHuaWei) {
            //@ts-ignore
            qg.showToast({
                message: msg,
                duration: 2000
            });
        }
    }


    /**
    * 上报归因事件
    * @param eventType 事件类型 0 激活， 25:关键行为
    * @param eventValue 事件描述
    */
    public reportAttributedEvent(eventType: AttributedType, eventKey: AttributedKey, eventValue: AttributedValue) {
        if (this._luanchType != "deeplink") {
            utils.showLog("luanchType=" + this._luanchType + ",不进行归因上报");
            return;
        }

        utils.showLog("上报归因事件：  #eventType=" + eventType + "#eventKey=" + eventKey + "#eventValue=" + eventValue);
        if (eventType == AttributedType.Active && YZ_LocalStorage.getItem(YZ_Constant.ST_IS_REPORT_USER_ACTIVE)) {
            utils.showLog("用户已经上报过激活，不再进行激活上报！");
            return;
        } else if (eventType == AttributedType.GameAddiction && YZ_LocalStorage.getItem(YZ_Constant.ST_IS_REPORT_GAME_ADDICTION)) {
            utils.showLog("用户已经上报过关键行为，不再进行激活上报！");
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.timeout = 15000;    // 单位毫秒
        let data: any = {};
        data.app_id = utils.config.huaweiConfig.appID;
        data.channel = "huawei_kyx";
        data.uid = this._service_uid;
        data.event_type = eventType;
        data.event_key = eventKey;
        data.event_value = eventValue;
        data.app_version = utils.config.huaweiConfig.version;
        data.luanchDate = encodeURI(this._luanchData);
        utils.showLog("归因请求参数:" + JSON.stringify(data));
        let requestData = JSON.stringify(data);
        utils.showLog("归因 > json_data=" + utils.aesEncrypt(requestData));
        let requestUrl: string = `https://track.youletd.com/wechatcounterpart/dockingreturn?json=${utils.aesEncrypt(requestData)}&time_stamp=${(new Date()).getTime()}`;
        utils.showLog("归因服务器地址:" + requestUrl);

        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = function () {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (eventType == AttributedType.Active) YZ_LocalStorage.setItem(YZ_Constant.ST_IS_REPORT_USER_ACTIVE, "true");
                    if (eventType == AttributedType.GameAddiction) YZ_LocalStorage.setItem(YZ_Constant.ST_IS_REPORT_GAME_ADDICTION, "true");
                    utils.showLog("归因上报成功：", xhr.responseText);
                } else {
                    utils.showLog("归因上报失败！");
                }
            }
        }
        xhr.ontimeout = function () {
            utils.showLog("归因请求超时!");
        }
        xhr.onerror = function (err) {
            utils.showLog("归因请求失败!");
        }
    }

    /**
     * 退出游戏
     */
    public GameExit() {
        if (PlatUtils.IsHuaWei) {
            utils.showLog("GameExit");
            try {
                //@ts-ignore
                qg.exitApplication({
                    success: function () {
                        console.log("exitApplication success");
                    },
                    fail: function () {
                        console.log("exitApplication fail");
                    },
                    complete: function () {
                        console.log("exitApplication complete");
                    }
                });
            } catch (error) {
                cc.log(error);
            }
        }
    }


    _is_login: boolean = false;
    _isShowLogin: boolean = false;
    _loging: boolean = false;
    isRequestLogin: boolean = false;
    /**
     * 登录
     */
    public login() {
        utils.showLog("huawei login");
        this.isRequestLogin = true;
        if (!this._isShowLogin || this._loging) return;
        this._loging = true;
        if (this._is_login) {
            this._loging = false;
            this.showToast("登录成功！");
            cc.game.emit(YZ_Constant.ST_LOGIN_SUCCESS);
            utils.showLog("已经登录过不再重新登录！");
            if (this.yz_conversion_type == "login") {
                this.reportUserActive();
            }
            return;
        }
        this.qg.gameLogin({
            forceLogin: 1,
            appid: utils.config.huaweiConfig.appID,
            success: (data) => {
                this._loging = false;
                this.showToast("登录成功！");
                cc.game.emit(YZ_Constant.ST_LOGIN_SUCCESS);
                utils.showLog("Game login success:" + data);
                this._is_login = true;
                if (this.yz_conversion_type == "login") {
                    utils.showLog("用户完成登陆行为!");
                    this.reportUserActive();
                }
            },
            fail: (data, code) => {
                this._loging = false;
                this.showToast("登录失败！");
                cc.game.emit(YZ_Constant.ST_LOGIN_FAIL);
                utils.showLog("Game login fail:" + data + ", code:" + code);
            }
        });
        this.isRequestLogin = false;
    }


    /**友盟sdk初始化 */
    umaInit() {
        if (!this.checkUmeng()) {
            utils.showLog("友盟ID未配置，不执行友盟初始化>>>>");
            return;
        }
        utils.showLog("umeng init #id=" + utils.config.huaweiConfig.umengId);
        uma.init({
            appKey: utils.config.huaweiConfig.umengId,
            useOpenid: false,
            debug: true
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
        if (!utils.config.huaweiConfig.umengId) {
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
}
