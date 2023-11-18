import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";
// 默认配置
let ST_DefaultServerConfig: string = "";

@ccclass
export default class YZ_Tool_WiFi {

    /**
   * 服务器配置信息
   */
    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    _sysInfo: any = {};
    public get SysInfo() {
        return this._sysInfo;
    }

    //设备UID
    _uid: string = "0";

    public get uid() {
        // if (this._service_uid != "0") return this._uid;
        // this._login();
        return "0";
    }

    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.wifiConfig.version;
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
        if (interval > 0 && interval < 30) {
            utils.showLog(`登录请求间隔小于：${this._loginInterval}秒`);
            return;
        }
        this._loginTime = curTime;
        let self = this;
        utils.showLog("qq暂时不获取uid，uid全部为0");
        this._uid = "0";
        // this.reportLogin();

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
        let interval: number = (curTime - self._reportLoginTime) / 1000;
        // utils.showLog(interval, " <<<<<<,interval", " _reportLoginTime >>>", self._reportLoginTime);
        // console.log(curTime, curTime - self._reportLoginTime, interval)
        if (interval > 0 && interval < 30) {
            utils.showLog(`上报登录获取UID小于：${self._reportLoginInterval}秒`);
            return;
        }
        self._reportLoginTime = curTime;
        let method = "m=login";
        let url: string = ST_ServerUrl + method + `&device_data=0`;

        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                if (data) {
                    let result = JSON.parse(data);
                    utils.showLog("data=" + data);
                    utils.showLog("result=" + result);
                    utils.showLog("result.uid=" + result.uid);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        console.log("self._service_uid:" + self._service_uid)
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
        if (PlatUtils.IsWiFi) {

            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.wifi) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.wifi);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";

            try {
                //@ts-ignore
                this._sysInfo = wuji.getSystemInfoSync();
                utils.showLog("连尚 小游戏平台信息: ", JSON.stringify(this.SysInfo));
            } catch (e) {
                utils.showLog("连尚 小游戏平台数据获取失败!");
            }

            this._loadConfig();


        }
    }

    _loadConfig() {
        if (PlatUtils.IsWiFi) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                if (ret) {
                    utils.showLog("连尚服务器配置数据获取成功: data = ", data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("连尚服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("连尚服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {

                    // if (this._serverConfig.is_local_pos_id
                    //     && this._serverConfig.is_local_pos_id == "false") {
                    //     // 使用服务器下发的广告id
                    //     utils.showLog("使用服务器下发的广告id");
                    //     utils.config.qqconfig.bannerId = this._serverConfig.banner_pos_id;
                    //     utils.config.qqconfig.insertId = this._serverConfig.intersititia_pos_id;
                    //     utils.config.qqconfig.videoId = this._serverConfig.video_pos_id;
                    //     utils.config.qqconfig.boxId = this._serverConfig.box_pos_id;
                    //     utils.config.qqconfig.bannerBoxId = this._serverConfig.banner_box_pos_id;

                    // } else {
                    //     utils.showLog("使用本地配置的广告ID");
                    // }
                }
                utils.emitServerInitEvent();
            });
        }
    }


    public getSystemInfo() {
        if (PlatUtils.IsWiFi) {
            return this._sysInfo;
        }
    }




    /**
     * 上报数据
     */
    public postData(otherGameAppId: string) {
        if (PlatUtils.IsWiFi) {
            let appid: string = utils.config.wifiConfig.appID;
            let uid: string = "0";
            let channel: string = "qq";
            let url: string = `http://apps.youlesp.com/gs?m=jump&app_id=${appid}&uid=${uid}&channel=${channel}&jump_app_id=${otherGameAppId}`;
            utils.showLog("上报数据, url=", url);
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("数据上报成功！");
                } else {
                    utils.showLog("数据上报失败！");
                }
            });
        }
    }


    public isOverMinVersion(minVersion: string) {
        let curVersion: string = this._sysInfo.SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    }


    _compareVersion(v1, v2) {
        if (!v1 || !v2) return -1;

        v1 = v1.split('.')
        v2 = v2.split('.')
        const len = Math.max(v1.length, v2.length)

        while (v1.length < len) {
            v1.push('0')
        }
        while (v2.length < len) {
            v2.push('0')
        }

        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i])
            const num2 = parseInt(v2[i])

            if (num1 > num2) {
                return 1
            } else if (num1 < num2) {
                return -1
            }
        }

        return 0
    }

    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsWiFi) {
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
        if (PlatUtils.IsWiFi) {
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
        if (PlatUtils.IsWiFi) {
            //@ts-ignore
            wuji.showToast({
                title: msg,
                icon: "none",
                duration: 2000
            })
        }
    }

}
