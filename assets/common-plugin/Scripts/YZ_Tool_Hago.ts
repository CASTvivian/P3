import { QQConfig } from "./CommonConfig";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";
// const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";
let ST_DefaultServerConfig: string = "";


@ccclass
export default class YZ_Tool_Hago {

    //@ts-ignore
    hg: any = hg;

    _sysInfo: any = null;
    public get SysInfo() {
        return this._sysInfo;
    }

    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.hagoConfig.version;
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
        utils.showLog("init hago");
        if (PlatUtils.IsHago) {
            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.hago) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.hago);
                }
            }
            if (CC_DEBUG) {
                //@ts-ignore
                hg.initWebDebug({
                    gameId: "yanshiceshi", //写自己公司对应的游戏id, yanshiceshi 只是作为一个例子
                    user: 1, //3个用户可选，user1对应填1，，user2对应填2，user3对应填3
                    env: "Test", //可选， 默认为测试环境，ProDuct 代表正式环境 
                    countryCode: "ID", //可选，默认是ID
                    language: "id", //可选，默认是id
                    success: (res) => {
                        console.log("hago start webdebug success")
                    },
                    fail: (res) => {
                        console.log("hago start webdebug fail", res)
                    }
                })
            }


            this._sysInfo = this.hg.getSystemInfoSync()

            if (this._sysInfo) {
                utils.showLog("Hago 小游戏平台信息: " + JSON.stringify(this.SysInfo));
                if (this._sysInfo.language == "en-us") {
                    //@ts-ignore
                    i18n.init("en");
                } else if (this._sysInfo.language == "pt-br") {
                    //@ts-ignore
                    i18n.init("pt");
                } else {
                    //@ts-ignore
                    i18n.init(this._sysInfo.language);
                }
            }

            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";
            this._loadConfig();
        }
    }



    _loadConfig() {
        if (PlatUtils.IsHago) {
            let method: string = "m=g";
            let url: string = ST_ServerUrl + method
            utils.commomHttpRequest(url, (ret, data) => {
                if (ret) {
                    utils.showLog("Hago服务器配置数据获取成功: data = " + data);
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
                            utils.showLog("Hago服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("Hago服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.hagoConfig.videoId = this._serverConfig.video_pos_id;
                    } else {
                        utils.showLog("使用本地配置的广告ID");
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
        if (PlatUtils.IsHago) {
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
        if (PlatUtils.IsHago) {
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
        if (PlatUtils.IsHago) {
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
}
