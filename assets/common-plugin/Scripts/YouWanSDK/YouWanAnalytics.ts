import PlatUtils from "../PlatUtils";
import { utils } from "../Utils";
import YZ_Constant from "../YZ_Constant";
import YZ_LocalStorage from "../YZ_LocalStorage";
import EventAdInfo, { AdEventParameter, YwAdStatus, YwAdType } from "./EventAdInfo";


const { ccclass, property } = cc._decorator;

@ccclass
export default class YouWanAnalytics {
    private static LOGIN_URL: string = "http://as.youlesp.com/as/login";
    private static EVENT_AD_URL: string = "http://e.youlesp.com/ae/ad";


    // private static LOGIN_URL: string = "http://192.168.31.108:8080/as/login";
    // private static EVENT_AD_URL: string = "http://192.168.31.108:8080/ae/ad";


    private static get _yw_uid(): number {
        return parseInt(YZ_LocalStorage.getItem(YZ_Constant.ST_YOUWAN_UID, "-1"));
    }

    public static login(callBackFunc?: Function) {
        if (!utils.config.otherconfig.yw_app_id) {
            this.showLog("yw_app_id 未配置，不进行上报！");
            return;
        }
        let data: any = {};
        this.getDeviceInfo(data);
        this.getStaticParame(data)
        this.connect(this.LOGIN_URL, data, (res, data) => {
            if (res) {
                this.showLog("登录成功! >>result:" + JSON.stringify(data) + " #uid=" + data.uid);
                YZ_LocalStorage.setItem(YZ_Constant.ST_YOUWAN_UID, data.uid);
            } else {
                this.showLog("登录失败!");
            }
            callBackFunc && callBackFunc(res, data);
        });
    }

    public static EventAd(adType: YwAdType, adStatus: YwAdStatus) {
        if (!utils.config.otherconfig.yw_app_id) {
            this.showLog("yw_app_id 未配置，不进行上报！");
            return;
        }
        if (!PlatUtils.IsOPPO) return;

        let adInfo = new EventAdInfo(adType, adStatus);
        let data: any = {};
        this.getStaticParame(data);
        data.ad_data = [];
        data.ad_data[0] = adInfo.toJsonData();

        this.connect(this.EVENT_AD_URL, data, (res) => {
            if (res) {
                this.showLog(`上报广告事件成功:${JSON.stringify(adInfo.toJsonData())}`);
            } else {
                this.showLog(`上报广告事件失败:${JSON.stringify(adInfo.toJsonData())}`);
            }
        });
    }

    public static EventAdWithObj(adType: YwAdType, adStatus: YwAdStatus, adEventParameter: AdEventParameter) {
        if (!utils.config.otherconfig.yw_app_id) {
            this.showLog("yw_app_id 未配置，不进行上报！");
            return;
        }
        if (!PlatUtils.IsOPPO) return;

        let adInfo = new EventAdInfo(adType, adStatus, adEventParameter);
        let data: any = {};
        this.getStaticParame(data);
        data.ad_data = [];
        data.ad_data[0] = adInfo.toJsonData();
        this.connect(this.EVENT_AD_URL, data, (res) => {
            if (res) {
                this.showLog(`上报广告事件成功:${JSON.stringify(adInfo.toJsonData())}`);
            } else {
                this.showLog(`上报广告事件失败:${JSON.stringify(adInfo.toJsonData())}`);
            }
        });
    }

    private static getStaticParame(data: any) {
        data.app_id = utils.config.otherconfig.yw_app_id;
        data.sdk_version = utils.utilsVersion;
        data.app_type = 1;
        if (this._yw_uid != -1) {
            data.uid = this._yw_uid;
        }
        data.country = "CN"
        data.uuid = YZ_LocalStorage.getItem(YZ_Constant.ST_UUID, "") || utils.generateUUID();
        if (PlatUtils.IsOPPO) {
            data.channel = "oppo";
            data.app_version = utils.config.oppoconfig.version;
        }
    }


    private static getDeviceInfo(data: any) {
        let systemInfo: any = {};
        if (PlatUtils.IsOPPO) {
            systemInfo = utils.oppoTool.SysInfo;
            data.pkg = utils.config.oppoconfig.packageName;
            data.device_id = utils.oppoTool._device_id;
            data.kernel_version = systemInfo.platformVersionCode;
            data.device_model = systemInfo.model;
            data.device_manufactory = systemInfo.brand;
            data.screen_height = systemInfo.screenHeight;
            data.screen_width = systemInfo.screenWidth;
            data.language = systemInfo.language;
            data.os = "Android";
            if (systemInfo.system.indexOf(" ") > -1) {
                data.os_version_release = systemInfo.system.substr(systemInfo.system.indexOf(" ") + 1);
            } else {
                data.os_version_release = systemInfo.system;
            }
        }
    }



    private static connect(url: string, parame: any, callBackFunc?: Function) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 6000;    // 单位毫秒
        xhr.open('POST', url + "?time_stamp=" + (new Date()).getTime());
        xhr.send(`data=${JSON.stringify(parame)}`);
        this.showLog("connect：#url=" + url);
        this.showLog(`connect： #parame==${JSON.stringify(parame)}`);

        xhr.onreadystatechange = () => {
            this.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status + " ; responseText=", xhr.responseText);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText) {
                        try {
                            let result = JSON.parse(xhr.responseText);
                            if (result.code == 0) {
                                callBackFunc && callBackFunc(true, result.data || "");
                            } else {
                                callBackFunc && callBackFunc(false);
                            }
                        } catch (error) {
                            this.showLog("connect erro：#msg=" + error);
                        }

                    }
                } else {
                    this.showLog(`connect erro： #parame==${JSON.stringify(parame)}`);
                    callBackFunc && callBackFunc(false);
                }
            }
        }
        xhr.ontimeout = () => {
            this.showLog("connect timeout!");
            callBackFunc && callBackFunc(false);
        }
        xhr.onerror = () => {
            this.showLog("connect onerror!");
            callBackFunc && callBackFunc(false);

        }
    }

    private static showLog(msg, ...any: any[]): void {
        utils.showLog(`[YouWan] --- ${msg}`, any);
    }



}
