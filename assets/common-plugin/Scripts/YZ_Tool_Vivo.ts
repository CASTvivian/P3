import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { BannerLocation, LevelStatus } from "./YZ_Constant";
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
export default class YZ_Tool_Vivo {
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
        utils.showLog("vivo暂时不获取uid，uid全部为0");
        this._uid = "0";
        this.reportLogin();

    }

    _reportLoginTime: number = 0;
    _reportLoginInterval: number = 30;
    isReport: boolean = false;
    //用户来源
    _source: string = "";
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
                    }
                }
            } else {
                utils.showLog("获取数据失败1");
            }
            this.isReport = false;
        })
    }
    /**
     * 
     * @param data 配置数据
     */
    public init(data: string) {
        if (PlatUtils.IsVIVO) {

            this.umaInit()
            //@ts-ignore 检车是否由桌面图标启动
            qg.isStartupByShortcut({
                success: (status) => {
                    if (status) {
                        utils.showLog('通过桌面图标启动应用')
                        this._source = "shortCut"
                    } else {
                        utils.showLog('不是通过桌面图标启动应用')
                    }
                }
            })
            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.vivo) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.vivo);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";


            this._sysInfo = this.qg.getSystemInfoSync();
            if (this._sysInfo) {
                utils.showLog("VIVO 小游戏平台信息: " + JSON.stringify(this.SysInfo));
            }

            this._loadConfig();

            this._nativeInsertAdClickTimes = YZ_LocalStorage.getItem(ST_NativeInsertAdClickTimes);
            let day: string = YZ_LocalStorage.getItem(ST_LastDateTime);
            let curDate = new Date();
            if (day != curDate.toDateString()) {
                this._nativeInsertAdClickTimes = 0;
                YZ_LocalStorage.setItem(ST_NativeInsertAdClickTimes, 0);
            }
            // 检测桌面图标是否创建
            if (this.isOverMiniVersion("1041")) {
                utils.registerServerInitEvent(() => {
                    this.checkHasShortCut((res) => {
                        if (!res && utils.ServerConfig && utils.ServerConfig.start_auto_create_short_cut_time) {
                            utils.SendEvent("组件初始化成功，弹出自动创建桌面！");
                            utils.showLog(`组件初始化成功，${utils.ServerConfig.start_auto_create_short_cut_time}秒后弹出自动创建桌面！`)
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
                }, this);
            }


        }
    }

    _buildServerUrl() {
        if (PlatUtils.IsVIVO) {
            let url: string = "";
            if (utils.config.vivoconfig && utils.config.vivoconfig.appID) {
                url = ST_ServerUrl + "kyx=true&app_id=" + utils.config.vivoconfig.appID.trim() + "&" + "channel=vivo";
            } else {
                utils.showLog("VIVO APPID配置出错！");
            }
            return url;
        }

        return null;
    }



    _loadConfig() {
        if (PlatUtils.IsVIVO) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {

                if (ret) {
                    utils.showLog("VIVO服务器配置数据获取成功: data = " + data);
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
                            utils.showLog("VIVO服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("VIVO服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.vivoconfig.bannerId = this._serverConfig.banner_pos_id;
                        utils.config.vivoconfig.insertId = this._serverConfig.intersititia_pos_id;
                        utils.config.vivoconfig.videoId = this._serverConfig.video_pos_id;
                        utils.config.vivoconfig.nativeInsertIds = this.ServerConfig.native_intersititial_pos_id;
                        utils.config.vivoconfig.nativeBannerIds = this.ServerConfig.native_banner_pos_id;
                        utils.config.vivoconfig.nativeTryGameIds = this.ServerConfig.native_trygame_pos_id;

                        utils.config.vivoconfig.recGameBannerId = this.ServerConfig.rec_game_banner_id;
                        utils.config.vivoconfig.recPortalId = this.ServerConfig.rec_portal_id;
                        utils.config.vivoconfig.nativeSingleAdIds = this.ServerConfig.native_single_pos_id || utils.config.vivoconfig.nativeSingleAdIds;

                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                    if (this.ServerConfig.native_banner_configs) {
                        for (let i = 0; i < this.ServerConfig.native_banner_configs.length; i++) {
                            utils.showLog("获取到原生广告配置:" + this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_banner_configs[i]));
                            utils.config.vivoconfig.setNativeBannerInfo(this.ServerConfig.native_banner_configs[i].location, this.ServerConfig.native_banner_configs[i]);
                        }
                    }
                    if (this.ServerConfig.native_customad_configs) {
                        for (let i = 0; i < this.ServerConfig.native_customad_configs.length; i++) {
                            utils.showLog("获取到原生模版广告配置:" + this.ServerConfig.native_customad_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_customad_configs[i]));
                            utils.config.vivoconfig.setCustomAdInfo(this.ServerConfig.native_customad_configs[i].location, this.ServerConfig.native_customad_configs[i]);
                        }
                    }

                }
                utils.emitServerInitEvent();
            });
        }
    }

    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    public isOverMiniVersion(miniVersion: string) {
        if (PlatUtils.IsVIVO) {
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

        if (PlatUtils.IsVIVO && this.canCreateShortcut()) {
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
        if (PlatUtils.IsVIVO) {
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


    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsVIVO) {
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
        if (PlatUtils.IsVIVO) {
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
        if (PlatUtils.IsVIVO) {
            //@ts-ignore
            //@ts-ignore
            qg.showToast({
                message: msg,
                duration: 2000
            });
        }
    }


    /**
   * 是否支持互推
   */
    canShowRecommend() {
        if (this.qg.createBoxBannerAd && this.qg.createBoxPortalAd) {
            return true;
        }
        return false;
    }

    _rec_game_banner: any = null;
    /**
     * 展示VIVO互推banner
     */
    showRecBanner(location?: BannerLocation) {

        if (!this.canShowRecommend()) {
            utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }

        if (utils.config.vivoconfig.recGameBannerId) {
            if (!this._rec_game_banner) {
                this._rec_game_banner = this.qg.createBoxBannerAd({
                    adUnitId: utils.config.vivoconfig.recGameBannerId
                })

                this._rec_game_banner.onLoad(() => {
                    utils.showLog('互推banner加载成功!')
                });

                this._rec_game_banner.show().then(() => {
                    utils.showLog('互推banner展示成功！')
                }).catch((error) => {
                    utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
                })

                this._rec_game_banner.onError((err) => {
                    utils.showLog('互推banner加载异常!', err.errCode + ',' + err.errMsg)
                    this._rec_game_banner.destroy();
                    this._rec_game_banner = null;
                })
            } else {
                this._rec_game_banner.show().then(() => {
                    utils.showLog('互推banner展示成功！')
                    if (location) {
                        utils.SendEvent("互推Banner展示成功，位置：" + location);
                    }
                }).catch(function (error) {
                    utils.showLog('互推banner展示失败:' + error.errCode + ',' + error.errMsg)
                })
            }

        } else {
            utils.showLog("VIVO 互推banner ID未配置！");
        }
    }

    /**
     * 隐藏互推banner
     */
    hideRecBanner() {
        if (this._rec_game_banner) {
            this._rec_game_banner.hide().then(() => {
                utils.showLog('VIVO 互推banner 隐藏成功！')
            }).catch((error) => {
                utils.showLog('VIVO 互推banner 隐藏失败:' + error.errCode + ',' + error.errMsg)
                this._rec_game_banner.destroy();
                this._rec_game_banner = null;
            })
        }
    }


    _rec_game_portal: any = null;
    /**
     * 展示VIVO九宫格
     */
    showGamePortal(top: number = 200) {
        if (!this.canShowRecommend()) {
            utils.showLog("当前版本不支持显示官方互推！");
            return false;
        }

        if (utils.config.vivoconfig.recPortalId) {

            if (this._rec_game_portal) {
                this.hideGamePortal();
            }

            this._rec_game_portal = this.qg.createBoxPortalAd({
                posId: utils.config.vivoconfig.recPortalId,
                image: '',
                marginTop: top / cc.winSize.height * this.SysInfo.screenHeight
            })

            this._rec_game_portal.onError(function (err) {
                utils.showLog("盒子九宫格广告加载失败", JSON.stringify(err));
            })
            this._rec_game_portal.onClose(() => {
                utils.showLog('close _rec_game_portal')
                if (this._rec_game_portal.isDestroyed) {
                    return
                }
                // 当九宫格关闭之后，再次展示Icon
                this._rec_game_portal.show()
            })
            // 广告数据加载成功后展示
            this._rec_game_portal.show().then(function () {
                utils.showLog('show success _rec_game_portal')
            })

        } else {
            utils.showLog("VIVO 互推九宫格 ID未配置！");
        }
    }


    /**
     * 隐藏九宫格
     */
    hideGamePortal() {
        this._rec_game_portal && this._rec_game_portal.hide().then(function () {
            utils.showLog('hideGamePortal success')
        }).catch(function (error) {
            utils.showLog('hideGamePortal fail with:' + error.errCode + ',' + error.errMsg)
        })
    }


    /**友盟sdk初始化 */
    umaInit() {
        if (!this.checkUmeng()) {
            utils.showLog("友盟ID未配置，不执行友盟初始化>>>>");
            return;
        }

        uma.init({
            appKey: utils.config.vivoconfig.umengId,
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
        if (!utils.config.vivoconfig.umengId) {
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
