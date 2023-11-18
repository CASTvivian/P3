
const { ccclass, property } = cc._decorator;



/**
 * 广告类型
 */
export enum YwAdType {
    BANNER = 1,
    INTERSITITIAL = 2,
    REWARD_VIDEO = 3,
    SPLASH = 4,
    NATIVE_BANNER = 5,
    NATIVE_INTERSITITIAL = 6,
    NATIVE_ICON = 7,
    INTERSITITIAL_VIDEO = 8,
    NATIVE = 9,
    NATIVE_TEMPLATE_BANNER = 10,
    NATIVE_TEMPLATE_INTERSITIAL = 11,
};


export enum YwAdStatus {
    REQUEST = 0,
    REQUEST_SUCCESS = 1,
    REQUEST_FAIL = 2,
    SHOW_SUCCESS = 3,
    SHOW_FAIL = 4,
    CLICK = 5,
    REWARD_SUCCESS = 6,
    REWARD_FAIL = 7,
    AD_ID_REQUEST = 10,
    AD_ID_REQUEST_SUCCESS = 11,
    AD_ID_REQUEST_FAIL = 12
}
export class AdEventParameter {

    public code: number; //状态码
    public msg: string; //状态信息
    public tag: string; //标签
    public adId: string; //广告id

    constructor(adId: string, code?: number, msg?: string, tag?: string) {
        this.adId = adId;
        this.code = code;
        this.msg = msg;
        this.tag = tag;
    }

    public toJsonData() {
        let data: any = {};
        data.adId = this.adId;
        if (this.code) {
            data.code = this.code;
        }
        if (this.msg) {
            data.msg = this.msg;
        }
        if (this.tag) {
            data.tag = this.tag;
        }
        return data;
    }
}

@ccclass
export default class EventAdInfo {
    private adType: YwAdType;
    private adStatus: YwAdStatus;
    private adEventParameter: AdEventParameter;
    private time: number;

    constructor(adType: YwAdType, adStatus: YwAdStatus, adEventParameter?: AdEventParameter) {
        this.time = new Date().getTime();
        this.adType = adType;
        this.adStatus = adStatus;
        this.adEventParameter = adEventParameter;
    }

    public toJsonData() {
        try {
            let data: any = {};
            data.ad_type = this.adType;
            data.ad_status = this.adStatus;
            if (this.adEventParameter != null) {
                if (this.adEventParameter.adId) {
                    data.ad_id = this.adEventParameter.adId;
                }
                data.ad_info = this.adEventParameter.toJsonData();
            }
            data.time = this.time;
            return data;
        } catch (ex) {
            console.error("EventAdInfo toJsonData erro msg =" + ex);
        }
        return {};
    }


    // update =dt {}
}
