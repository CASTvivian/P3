import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";
let ST_DefaultServerConfig: string = "";
const ST_NativeInsertAdClickTimes: string = "NativeInsertAdClickTimes";
const ST_LastDateTime: string = "LastDateTime";
const ST_InsertAdShowCounts: string = "NativeInsertAdShowCount"; //插屏显示次数
const ST_BannerAdCloseCounts: string = "ST_BannerAdCloseCounts"; //banner广告关闭次数
const ST_YZBannerShowCounts: string = "YZBannerShowCounts"; //banner广告关闭次数


@ccclass
export default class YZ_Tool_Xiaomi {


    _sysInfo: any = null;
    public get SysInfo() {
        return this._sysInfo || {};
    }

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

    public countNativeInserClick() {
        this._nativeInsertAdClickTimes++;
        YZ_LocalStorage.setItem(utils.config.xiaomiConfig.appID + "_" + ST_NativeInsertAdClickTimes, this._nativeInsertAdClickTimes);
    }

    /**
     * 增加插屏显示的次数
     */
    public countInserShowCount() {
        this._insertAdShowCounts++;
        YZ_LocalStorage.setItem(utils.config.xiaomiConfig.appID + "_" + ST_InsertAdShowCounts, this._insertAdShowCounts);
    }

    /**
     * 增加banner的关闭次数
     */
    public countBannerCloseCount() {
        this._bannerAdCloseCounts++;
        YZ_LocalStorage.setItem(utils.config.xiaomiConfig.appID + "_" + ST_BannerAdCloseCounts, this._bannerAdCloseCounts);
    }

    /**
    * 增加自定义banner的显示次数
    */
    public countYzBannerShowCount() {
        this._yzBannerShowCounts++;
        YZ_LocalStorage.setItem(utils.config.xiaomiConfig.appID + "_" + ST_YZBannerShowCounts, this._yzBannerShowCounts);
    }

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
        if (PlatUtils.IsXiaoMi) {

            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.xiaomi) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.xiaomi);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";

            //@ts-ignore
            if (qg.getUpdateManager) {
                //@ts-ignore
                const updateManager = qg.getUpdateManager()
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    utils.showLog('onCheckForUpdate', res.hasUpdate)
                })
                updateManager.onUpdateReady(function () {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                })

                updateManager.onUpdateFailed(function () {
                    // 新版本下载失败
                    utils.showMsg("自动更新失败，请手动重启游戏！");
                })
            }
            this.getSystemInfo();
            this._loadConfig();
        }
    }



    _loadConfig() {
        if (PlatUtils.IsXiaoMi) {
            let method: string = "m=g";
            let url: string = ST_ServerUrl + method
            utils.commomHttpRequest(url, (ret, data) => {
                if (ret) {
                    utils.showLog("小米服务器配置数据获取成功: data = " + data);
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
                            utils.showLog("小米服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("小米服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.xiaomiConfig.insertId = this._serverConfig.intersititia_pos_id;
                        utils.config.xiaomiConfig.videoId = this._serverConfig.video_pos_id;
                        utils.config.xiaomiConfig.nativeInsertIds = this.ServerConfig.native_intersititial_pos_id;
                        utils.config.xiaomiConfig.nativeBannerIds = this.ServerConfig.native_banner_pos_id;
                        utils.config.xiaomiConfig.nativeTryGameIds = this.ServerConfig.native_trygame_pos_id;
                        utils.config.xiaomiConfig.bannerId = this._serverConfig.banner_pos_id;

                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                    if (this.ServerConfig.native_banner_configs) {
                        for (let i = 0; i < this.ServerConfig.native_banner_configs.length; i++) {
                            utils.showLog("获取到原生广告配置:" + this.ServerConfig.native_banner_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_banner_configs[i]));
                            utils.config.xiaomiConfig.setNativeBannerInfo(this.ServerConfig.native_banner_configs[i].location, this.ServerConfig.native_banner_configs[i]);
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
        if (PlatUtils.IsXiaoMi) {
            if (this._sysInfo && this._sysInfo.platformVersionCode) {
                return this._sysInfo.platformVersionCode >= miniVersion;
            }
        }
        return false;
    }

    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsXiaoMi) {
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
        if (PlatUtils.IsXiaoMi) {
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
     * 获取系统信息
     */
    public getSystemInfo() {
        if (PlatUtils.IsXiaoMi) {
            //@ts-ignore
            this._sysInfo = qg.getSystemInfoSync();
            utils.showLog("获取系统信息成功：" + JSON.stringify(this._sysInfo));
        }
    }

    public GameExit() {
        if (PlatUtils.IsXiaoMi) {
            //@ts-ignore
            //可以退出游戏
            qg.exitApplication({
                success: () => {
                    utils.showLog("exit Game success");
                },
                fail: () => {
                    utils.showLog("exit Game fail");
                }
            });
        }
    }
}
