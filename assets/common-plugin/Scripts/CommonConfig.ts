import YZ_Constant, { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

@ccclass("BannerIdInfo")
export class BannerIdInfo {
    @property({ type: cc.Enum(BannerLocation), displayName: "广告条位置" })
    location: BannerLocation = BannerLocation.None;

    @property({ displayName: "广告条ID" })
    bannerId: string = "";
};


@ccclass("NativeBannerInfo")
export class NativeBannerInfo {
    /**
     * 广告条的位置
     *   1:Home-首页
     *   2:Level-选关
     *   3:Skin-皮肤
     *   4:Game-游戏
     *   5:Pause-暂停
     *   6:Over-结算
     */
    location: BannerLocation = BannerLocation.None;

    /**
     * 是否显示结算大banner
     */
    show_st_banner: string = "false";

    /**
     * 默认原生banner关闭按钮大小，默认为60
     */
    banner_close_but_size: number = 40;
    /**
     * 默认banner关闭按钮透明度 默认为120
     */
    banner_close_but_alpha: number = 120;
    /**
     * 默认banner关闭按钮高度 默认为220
     */
    banner_show_height: number = 160;
    /**
     * 默认banner关闭按钮点击区域默认为80
     */
    banner_close_but_range: number = 40;

    /**
     * 默认原生banner关闭按钮，是否显示。默认为显示："true"
     */
    banner_close_but_show = "true";
    /**
     * 结算前banner整体缩放，默认为1
     */
    st_banner_scale: number = 1;

    /**
     * 结算前banner下载按钮的图片地址
     */
    st_banner_down_btn_image: string = "";
    /**
     * 结算前banner下载按钮显示类型，默认不配置，则不显示，配置后则显示，值为2:显示循环播放放大缩小效果，
     */
    st_banner_down_but_show: number = 0;
    /**
     * 结算前banner，下载按钮距离广告顶部间距，默认贴紧广告顶部值是-111
     */
    st_banner_down_but_margin_top: number = 0;
    /**
     *  结算前banner，关闭按钮点击区域大小
     */
    st_banner_close_but_range: number = 55;
    /**
     * 结算前banner，关闭按钮图片大小
     */
    st_banner_close_but_size: number = 55;

    /**
     * 结算前banner关闭按钮，是否显示。默认为显示："true"
     */
    st_banner_close_but_show: string = "true";

    /**
     * 结算前banner距离底部的距离
     */
    st_banner_bottom: number = 0;

    /**
     * 结算前banner关闭按钮透明度
     * 0-255
     */
    st_banner_close_but_alpha: number = 255;

    /**
     * banner点击后是不是需要刷新数据
     */
    banner_click_refresh: string = "true";

    /**
     * 自动刷新时间，单位：秒，默认为：-1 不刷新
     */
    auto_refresh: number = -1;

    /**
     * 样式
     * -1 :默认、0:单图片缩放、1:单图片和自定义宽高、2:默认样式自定义宽高
     */
    st_banner_style: number = -1;

    /**
    * 结算banner样式-宽，默认：821  单位：像素
    */
    st_banner_width: number = -1;

    /**
    * 结算banner样式-高:默认：589 单位：像素
    */
    st_banner_height: number = -1;

    /**
    * 结算banner是否显示备用广告
    * 默认：1 显示，-1 为不显示
    */
    st_banner_show_back_up: number = 1;

    /**
     * 是否显示banner
     * 默认：1 显示， -1为不显示；
     */
    is_show_banner: number = 1;

    //显示互推banner
    is_show_rec: number = -1;

    //延迟显示时间
    delay_show_time: number = 0;

    //关闭按钮间隔多少次触发广告跳转
    banner_close_showAd_interval: number = 0;


    //普通原生Banner背景透明遮罩透明度 大于0则显示当前值的透明遮罩层
    bg_mask_opacity: number = 0;


    //结算原生banner背景透明遮罩透明度 大于0则显示当前值的透明遮罩层
    st_banner_bg_mask_opacity: number = 0;

    // 对齐方式：bottom top
    _alignType: string = "bottom";

    /**
     * 初始化
     * @param location 位置
     * @param info 配置
     */
    init(location: BannerLocation, info: any) {


        this.location = location;
        this.banner_close_but_alpha = info.banner_close_but_alpha ? info.banner_close_but_alpha : this.banner_close_but_alpha;
        this.banner_close_but_range = info.banner_close_but_range ? info.banner_close_but_range : this.banner_close_but_range;
        this.banner_close_but_size = info.banner_close_but_size ? info.banner_close_but_size : this.banner_close_but_size;
        this.banner_show_height = info.banner_show_height ? info.banner_show_height : this.banner_show_height;
        this.banner_close_but_show = info.banner_close_but_show ? info.banner_close_but_show : this.banner_close_but_show;
        this.bg_mask_opacity = info.bg_mask_opacity ? info.bg_mask_opacity : this.bg_mask_opacity;



        this.st_banner_close_but_range = info.st_banner_close_but_range ? info.st_banner_close_but_range : this.st_banner_close_but_range;
        this.st_banner_close_but_size = info.st_banner_close_but_size ? info.st_banner_close_but_size : this.st_banner_close_but_size;
        this.st_banner_down_btn_image = info.st_banner_down_btn_image ? info.st_banner_down_btn_image : this.st_banner_down_btn_image;
        this.st_banner_down_but_margin_top = info.st_banner_down_but_margin_top ? info.st_banner_down_but_margin_top : this.st_banner_down_but_margin_top;
        this.st_banner_down_but_show = info.st_banner_down_but_show ? info.st_banner_down_but_show : this.st_banner_down_but_show;
        this.st_banner_scale = info.st_banner_scale ? info.st_banner_scale : this.st_banner_scale;
        this.show_st_banner = info.show_st_banner ? info.show_st_banner : this.show_st_banner;
        this.st_banner_close_but_show = info.st_banner_close_but_show ? info.st_banner_close_but_show : this.st_banner_close_but_show;
        this.st_banner_bottom = info.st_banner_bottom ? info.st_banner_bottom : this.st_banner_bottom;
        this.st_banner_close_but_alpha = info.st_banner_close_but_alpha ? info.st_banner_close_but_alpha : this.st_banner_close_but_alpha;
        this.banner_click_refresh = info.banner_click_refresh ? info.banner_click_refresh : this.banner_click_refresh;
        this.auto_refresh = info.auto_refresh ? info.auto_refresh : this.auto_refresh;
        this.st_banner_style = info.st_banner_style ? info.st_banner_style : this.st_banner_style;
        this.st_banner_width = info.st_banner_width ? info.st_banner_width : this.st_banner_width;
        this.st_banner_height = info.st_banner_height ? info.st_banner_height : this.st_banner_height;
        this.st_banner_show_back_up = info.st_banner_show_back_up ? info.st_banner_show_back_up : this.st_banner_show_back_up;
        this.is_show_banner = info.is_show_banner ? info.is_show_banner : this.is_show_banner;
        this.is_show_rec = info.is_show_rec ? info.is_show_rec : this.is_show_rec;
        this.delay_show_time = info.delay_show_time ? info.delay_show_time : this.delay_show_time;
        this.st_banner_bg_mask_opacity = info.st_banner_bg_mask_opacity ? info.st_banner_bg_mask_opacity : this.st_banner_bg_mask_opacity;
        this._alignType = info.align_type ? info.align_type : this._alignType;
        this.banner_close_showAd_interval = info.banner_close_showAd_interval ? info.banner_close_showAd_interval : this.banner_close_showAd_interval;
    }

    toStrong() {
        return `location=${this.location}&is_show_banner=${this.is_show_banner}&banner_close_but_show=${this.banner_close_but_show}&banner_close_but_alpha=${this.banner_close_but_alpha}&banner_close_but_range=${this.banner_close_but_range}&banner_close_but_size=${this.banner_close_but_size}&banner_show_height=${this.banner_show_height}&st_banner_close_but_range=${this.st_banner_close_but_range}&st_banner_close_but_size=${this.st_banner_close_but_size}&st_banner_down_btn_image=${this.st_banner_down_btn_image}&st_banner_down_but_margin_top=${this.st_banner_down_but_margin_top}&st_banner_down_but_show=${this.st_banner_down_but_show}&st_banner_scale=${this.st_banner_scale}&show_st_banner=${this.show_st_banner}&st_banner_close_but_show=${this.st_banner_close_but_show}&st_banner_bottom=${this.st_banner_bottom}&st_banner_close_but_alpha=${this.st_banner_close_but_alpha}&banner_click_refresh=${this.banner_click_refresh}&auto_refresh=${this.auto_refresh}&st_banner_style=${this.st_banner_style}&st_banner_width=${this.st_banner_width}&st_banner_height=${this.st_banner_height}&st_banner_show_back_up=${this.st_banner_show_back_up}&is_show_rec=${this.is_show_rec}`;
    }
}


@ccclass("CustomAdInfo")
export class CustomAdInfo {
    /**
     * 广告条的位置
     *   1:Home-首页
     *   2:Level-选关
     *   3:Skin-皮肤
     *   4:Game-游戏
     *   5:Pause-暂停
     *   6:Over-结算
     *   其中选项没有的话，可以自定义
     */
    location: BannerLocation = BannerLocation.None;

    /**
     * 是否显示结算大banner
     */
    is_show_ad: string = "true";

    /**
     * 距离顶部的距离
     */
    top: number = -1;

    /**
     * 距离左边的距离
     */
    left: number = -1;

    /**
     * 距离右边的距离
     */
    right: number = -1;

    /**
     * 距离底部的距离
     */
    bottom: number = -1;

    /**
     * 广告ID
     */
    id: string = "";

    /**
     * 刷新时间
     */
    refresh_time: number = -1;

    /**
     * 广告宽度
     */
    width: number = 0;

    /** 
     * 广告高度
    */
    height: number = 0;

    /** 
     * 显示成功后是否隐藏banner
    */
    hide_banner: string = "false";

    /**
     * 是否居中显示
     * about：左右居中
     * updown:上下
     * all:上下和左右居中
     */
    is_center: string = "false";

    /**
     * 改变位置的时候是否刷新广告
     */
    change_location_refresh_ad = "true";


    //当前obj对象
    customAdObj: any = null;



    /**
     * 初始化
     * @param location 位置
     * @param info 配置
     */
    init(location: BannerLocation, info: any) {
        this.location = location;
        this.top = "top" in info ? info.top : -1;
        this.right = "right" in info ? info.right : -1;
        this.left = "left" in info ? info.left : -1;
        this.bottom = "bottom" in info ? info.bottom : -1;
        this.id = "id" in info ? info.id : "";
        this.refresh_time = "refresh_time" in info ? info.refresh_time : -1;
        this.is_show_ad = "is_show_ad" in info ? info.is_show_ad : "true";
        this.width = "width" in info ? info.width : 0;
        this.height = "height" in info ? info.height : 0;
        this.hide_banner = "hide_banner" in info ? info.hide_banner : "false";
        this.change_location_refresh_ad = "change_location_refresh_ad" in info ? info.change_location_refresh_ad : "false";

        this.is_center = "is_center" in info ? info.is_center : "all";
    }

    toStrong() {
        return `customAdInfo>>>>#location=${this.location}#top=${this.top}#left=${this.left}#right=${this.right}#bottom=${this.bottom}#refreshTime=${this.refresh_time}#id=${this.id}#width=${this.width}#height=${this.height}#is_center=${this.is_center}`;
    }
}



@ccclass("WechatConfig")
export class WechatConfig {

    appID: string = "";
    bannerIds: BannerIdInfo[] = [];
    videoId: string = "";
    insertId: string = "";
    jumpId: string = "";
    appBoxId: string = "";
    boxId: string = "";
    bannerBoxId: string = "";
    customAdInfos: CustomAdInfo[] = [];
    isAttributed: boolean = false;
    version: string = "";
    nativeBannerId: string = "";
    nativeInsertIds: string = "";

    /**
     * 根据位置获取bannerId
     * @param location BannerLocation
     */
    public getBannerId(location: BannerLocation) {
        for (let i = 0; i < this.bannerIds.length; i++) {
            if (this.bannerIds[i].location == location) {
                return this.bannerIds[i].bannerId;
            }
        }
        if (this.bannerIds.length > 0) {
            return this.bannerIds[0].bannerId;
        }
        return "";
    }

    /**
  * 设定原生模版配置
  * @param location 位置
  * @param bannerInfo 配置
  */
    public setCustomAdInfo(location, custInfo: any) {
        let nativeCustomAd = new CustomAdInfo();
        nativeCustomAd.init(location, custInfo);
        this.customAdInfos.push(nativeCustomAd);
    }

    /**
     * 根据位置获取原生模版配置
     * @param location BannerLocation
     */
    public getCustomAdInfoInfo(location: BannerLocation) {
        utils.showLog("根据位置获取原生模版配置>>location=", location);
        for (let i = 0; i < this.customAdInfos.length; i++) {
            if (this.customAdInfos[i].location == location) {
                utils.showLog("根据位置获取原生模版配置>>info=", this.customAdInfos[i].toStrong());
                return this.customAdInfos[i];
            }
        }
        return null;
    }

    /**
     * 设定bannerId
     * @param location BannerLocation
     * @param bannerId 
     */
    public setBannerId(location: BannerLocation, bannerId: string) {
        for (let i = 0; i < this.bannerIds.length; i++) {
            if (this.bannerIds[i].location == location) {
                this.bannerIds[i].bannerId = bannerId;
                return;
            }
        }
    }
}


@ccclass("QQConfig")
export class QQConfig {

    QQ: boolean = true;
    appID: string = "";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = "";
    boxId: string = "";
    version: string = "";
    bannerBoxId: string = "";
}

@ccclass("OppoConfig")
export class OppoConfig {
    public appID: string = "";
    public channel: string = "oppo";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = "";
    nativeBannerIds: string[] = [];
    nativeTryGameIds: string[] = [];
    nativeInsertIds: string[] = [];
    nativeSingleAdIds: string[] = [];
    packageName: string = "";
    nativeBannerInfos: NativeBannerInfo[] = [];
    recGameBannerId: string = "";
    recPortalId: string = "";
    version: string = "";
    recGameDrawerId: string = "";
    umengId: String = ""; //友盟ID
    intersitialAdConfigs: any[] = []; //插屏ID配置
    bannerAdConfigs: any[] = []; //Banner配置

    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    public getNativeBannerInfo(location: BannerLocation) {
        utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (let i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    }

    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    public setNativeBannerInfo(location, bannerInfo: any) {
        let nativeBannerInfo: NativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    }
}


@ccclass("VivoConfig")
export class VivoConfig {
    showAd: boolean = true;

    appID: string = "";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = ""
    nativeTryGameIds: string[] = [];
    nativeBannerIds: string[] = [];
    nativeInsertIds: string[] = [];
    nativeBannerInfos: NativeBannerInfo[] = [];
    customAdInfos: CustomAdInfo[] = [];

    nativeSingleAdIds: string[] = [];
    recGameBannerId: string = "";
    recPortalId: string = "";
    version: string = "";
    umengId: String = ""; //友盟ID

    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    public getNativeBannerInfo(location: BannerLocation) {
        utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (let i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    }


    /**
     * 根据位置获取原生模版配置
     * @param location BannerLocation
     */
    public getCustomAdInfoInfo(location: BannerLocation) {
        utils.showLog("根据位置获取原生模版配置>>location=", location);
        for (let i = 0; i < this.customAdInfos.length; i++) {
            if (this.customAdInfos[i].location == location) {
                utils.showLog("根据位置获取原生模版配置>>info=", this.customAdInfos[i].toStrong());
                return this.customAdInfos[i];
            }
        }
        return new CustomAdInfo();
    }

    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    public setNativeBannerInfo(location, bannerInfo: any) {
        let nativeBannerInfo: NativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    }


    /**
  * 设定原生模版配置
  * @param location 位置
  * @param bannerInfo 配置
  */
    public setCustomAdInfo(location, custInfo: any) {
        let nativeCustomAd = new CustomAdInfo();
        nativeCustomAd.init(location, custInfo);
        this.customAdInfos.push(nativeCustomAd);
    }
}

@ccclass("YzRedBagInfo")
export class YzRedBagInfo {
    private _progress: number = 0; //当前进度
    private _totalProgress: number = 5; //总进度
    private _balance: number = 0.00; //余额
    private _totalMoeny: number = 0;
    private _lastOpenFreeRedBagTime: string = "";
    private _progressInfos: any = null;
    private _lastOpenLevel: string = "-1";
    private _freeRedBagCount: number = 0;  //现金红包次数

    public withdrawaMoneys = [5, 20, 45, 50]


    constructor() {
        if (PlatUtils.IsTest) {
            this._progressInfos = [
                {
                    level: 0,
                    min_money: 0.1,
                    max_money: 5,
                    type: 1
                },
                {
                    level: 4,
                    min_money: 0.1,
                    max_money: 3,
                    type: 3
                },
                {
                    level: 5,
                    min_money: 0.001,
                    max_money: 0.005,
                    type: 2
                }
            ]
        }


        this._progress = YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_PROGRESS) ? YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_PROGRESS) : 0;
        this._totalProgress = YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_TOTAL_PROGRESS) ? YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_TOTAL_PROGRESS) : 5;
        this._balance = YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_BALANCE) ? parseFloat(YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_BALANCE)) : 0.00;
        this._totalMoeny = YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_TOTAL_MONEY) ? parseFloat(YZ_LocalStorage.getItem(YZ_Constant.ST_RED_BAG_TOTAL_MONEY)) : 0.00;
        this._lastOpenFreeRedBagTime = YZ_LocalStorage.getItem(YZ_Constant.ST_FREE_RED_BAG_TIME) ? YZ_LocalStorage.getItem(YZ_Constant.ST_FREE_RED_BAG_TIME) : "";
        this._lastOpenLevel = YZ_LocalStorage.getItem(YZ_Constant.ST_LAST_OPEN_LEVEL) ? YZ_LocalStorage.getItem(YZ_Constant.ST_LAST_OPEN_LEVEL) : "-1";
    }



    public get freeRedBagCount() {
        return this._freeRedBagCount;
    }

    public set freeRedBagCount(value: number) {
        this._freeRedBagCount = value;
    }

    public get lastOpenLevel() {
        return this._lastOpenLevel;
    }

    public set lastOpenLevel(value: string) {
        this._lastOpenLevel = value;
        YZ_LocalStorage.setItem(YZ_Constant.ST_LAST_OPEN_LEVEL, value);
    }

    public get progress() {
        return this._progress;
    }

    public set progress(value: number) {
        this._progress = value;
        if (this._progress > this._totalProgress) {
            this._progress = this._totalProgress;
        } else {
            utils._rewardRedBagPanelShowCount = -1;
        }

        YZ_LocalStorage.setItem(YZ_Constant.ST_RED_BAG_PROGRESS, this._progress + '');
        cc.game.emit("YZ_RED_BAG_PROGRESS_CHANGE");
    }

    public get totalProgress() {
        return this._totalProgress;
    }

    public set totalProgress(value: number) {
        this._totalProgress = value;
        YZ_LocalStorage.setItem(YZ_Constant.ST_RED_BAG_TOTAL_PROGRESS, value + '');
    }



    public get totalMoney() {
        return this._totalMoeny;
    }

    public set totalMoney(value: number) {
        this._totalMoeny = value;
        YZ_LocalStorage.setItem(YZ_Constant.ST_RED_BAG_TOTAL_MONEY, value + '');
    }

    public set progressInfos(values: []) {
        this._progressInfos = values;
    }

    public get progressInfos() {
        return this._progressInfos;
    }

    public get curProgressInfo() {


        if (this._progressInfos && this._progressInfos.length > 0) {
            if (parseInt(this.lastOpenLevel) > 0 && parseInt(this.lastOpenLevel) >= utils.currentLevel) {
                return this._progressInfos[this._progressInfos.length - 1];
            }

            let temp = this.lastOpenLevel ? this._progressInfos[0] : this._progressInfos[1];
            for (let i = 0; i < this._progressInfos.length; i++) {
                //@ts-ignore
                if (utils.currentLevel <= this._progressInfos[i].level) {
                    temp = this._progressInfos[i];
                    break;
                }
            }
            console.log("curInfo " + JSON.stringify(temp));
            return temp;
        }
        return null;
    }





    public get balance() {
        return this._balance;
    }

    public set balance(value: number) {
        this._balance = value;
        YZ_LocalStorage.setItem(YZ_Constant.ST_RED_BAG_BALANCE, value + '');
        cc.game.emit("YZ_RED_BAG_BALANCE_CHANGE");
    }

    public get lastOpenFreeRedBagTime() {
        return this._lastOpenFreeRedBagTime;
    }

    public set lastOpenFreeRedBagTime(value: string) {
        this._lastOpenFreeRedBagTime = value;
        YZ_LocalStorage.setItem(YZ_Constant.ST_FREE_RED_BAG_TIME, value + '');
    }

    /**
     * 今天是否有免费的红包
     */
    public get isFreeRedBag(): boolean {
        cc.log("是否有免费红包：" + new Date().toDateString() != this._lastOpenFreeRedBagTime);
        return new Date().toDateString() != this._lastOpenFreeRedBagTime;
    }

}



@ccclass("HuaWeiConfig")
export class HuaWeiConfig {

    appID: string = "";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = "";
    nativeSplashId: string = "";
    nativeTryGameIds: string[] = [];
    nativeBannerIds: string[] = [];
    nativeInsertIds: string[] = [];
    nativeBannerInfos: NativeBannerInfo[] = [];
    version: string = "";
    umengId: string = "";
    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    public getNativeBannerInfo(location: BannerLocation) {
        utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (let i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    }

    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    public setNativeBannerInfo(location, bannerInfo: any) {
        let nativeBannerInfo: NativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    }
}


@ccclass("NativeAndroidConfig")
export class NativeAndroidConfig {
    appID: string = "";
    channel: string = "";
    version: string = "";
}

@ccclass("BaiduConfig")
export class BaiduConfig {
    appID: string = "";
    appSID: string = "";
    bannerId: string = "";
    videoId: string = "";
    version: string = "";
}

@ccclass("WiFiConfig")
export class WiFiConfig {
    appID: string = "";
    bannerId: string = "";
    videoId: string = "";
    version: string = "";
}

@ccclass("KwaiConfig")
export class KwaiConfig {
    appID: string = "";
    videoId: string = "";
    insertId: string = "";
    version: string = "";
}



@ccclass("HagoConfig")
export class HagoConfig {
    appID: string = "";
    videoId: string = "";
    version: string = "";
}

@ccclass("NativeIosConfig")
export class NativeIosConfig {
    appID: string = "";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = "";
    version: string = "";
}

@ccclass("DouyinConfig")
export class DouyinConfig {

    Douyin: boolean = true;
    appID: string = "";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = "";
    version: string = "";
}

@ccclass("QuTouTiaoConfig")
export class QTTConfig {

    QuTouTiao: boolean = true;
    showAd: boolean = true;
    gamename: string = "";
    appID: string = "";
    appKey: string = "";
}

@ccclass("UCConfig")
export class UCConfig {

    appID: string = "";
    appKey: string = "";
    version: string = "";
}

@ccclass("CocosConfig")
export class CocosConfig {

    appID: string = "";
    appKey: string = "";
    appSecret: string = "";
    bannerId: string = "";
    videoId: string = "";
    insertId: string = "";
}
@ccclass("XiaoMiConfig")
export class XiaoMiConfig {
    appID: string = "";
    bannerId: string = "";
    videoId: string = "";
    insertId: string = "";
    nativeSplashId: string = "";
    nativeTryGameIds: string[] = [];
    nativeBannerIds: string[] = [];
    nativeInsertIds: string[] = [];
    nativeBannerInfos: NativeBannerInfo[] = [];
    version: string = "";
    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    public getNativeBannerInfo(location: BannerLocation) {
        utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (let i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    }

    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    public setNativeBannerInfo(location, bannerInfo: any) {
        let nativeBannerInfo: NativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    }
}

@ccclass("BiliConfig")
export class BiliConfig {
    appID: string = "";
    bannerId: string = "";
    videoId: string = "";
}

@ccclass("FaceBookConfig")
export class FaceBookConfig {
    appID: string = "";
    bannerId: string = "";
    insertId: string = "";
    videoId: string = "";
    version: string = "";
}

@ccclass("OtherConfig")
export class OtherConfig {
    shareTitle: string = "";
    shareImgUrl: string = "";
    shareIcon: string = "";
    shareDesc: string = "";

    @property({ type: cc.JsonAsset, displayName: "本地配置文件", tooltip: "将Common/Config/下面的配置文件拖放到此处" })
    localConfig: cc.JsonAsset = null;

    @property({ type: cc.Prefab, displayName: "日志输出组件", tooltip: "将Common/Prefabs/LogoutView拖放到此处" })
    logoutView: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "原生广告条组件，将Common/Prefabs/NativeBanner拖到此处", displayName: "原生广告条组件" })
    nativeBanner: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "原生插屏组件，将Common/Prefabs/NativeInsert拖到此处", displayName: "原生插屏组件" })
    nativeInsert: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "原生插屏组件，将Common/Prefabs/nativeSplashView拖到此处", displayName: "原生开屏组件" })
    nativeSplashView: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "底部推荐游戏广告Banner, 将Common/Prefabs/RecommendGamesBanner拖到此处" })
    recommendGamesBanner: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "推荐游戏横条，将Common/Prefabs/RecommendGamesBar拖到此处" })
    recommendGamesBar: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "推荐游戏圆形挂件，将Common/Prefabs/TryGamesWidget拖到此处" })
    tryGamesWidget: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "侧边更多游戏面板挂件，将Common/Prefabs/MoreGamesWidget拖到此处" })
    moreGamesWidget: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "录屏按钮组件，将Common/Prefabs/RecordWidget拖到此处" })
    recordWidget: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "快捷方式按钮，将Common/Prefabs/ShortcutWidget拖到此处 " })
    shortcutWidget: cc.Prefab = null;


    // @property({ type: cc.Prefab, tooltip: "游戏盒子，将Common/Prefabs/GameBox拖到此处 " })
    gameBox: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "6元素交叉推广组件，将Common/Prefabs/CrossWidget6拖到此处" })
    crossWidget6: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "激励插屏推广组件，将Common/Prefabs/RewardInsert拖到此处" })
    rewardInsert: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "结算页面推广组件，将Common/Prefabs/StatementRecomment拖到此处" })
    statementRecomment: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "单个原生广告，将Common/Prefabs/SingleNativeAd拖到此处" })
    singleNativeAd: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "分享录屏弹窗，将Common/Prefabs/ShareRecordPanel拖到此处" })
    shareRecordPanel: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "原生退出游戏弹窗，将Common/Prefabs/GameExitDialog拖到此处" })
    gameExitDialog: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "五倍奖励宝箱弹窗，将Common/Prefabs/RewardBoxPanel拖到此处" })
    rewardBoxPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "奖励转盘抽奖弹窗，将Common/Prefabs/RewardTurntablePanel拖到此处" })
    rewardTurnTablePanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "添加桌面激励弹窗，将Common/Prefabs/RewardShortCutPanel拖到此处" })
    rewardShortCutPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "原生抖动试玩，将Common/Prefabs/NativeTryGameWidget拖到此处", displayName: "原生抖动组件" })
    nativeTryGameWidget: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "结算前互推面板，将Common/Prefabs/BeforGameOverRecGamesPanel拖到此处", displayName: "结算前互推面板" })
    beforGameOverRecGamesPanel: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "红包提现框，将Common/Prefabs/WithdrawalWidget拖到此处", displayName: "红包提现框挂件" })
    withdrawalWidget: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "红包提现弹窗，将Common/Prefabs/WithdrawalPanel拖到此处", displayName: "红包提现弹窗" })
    withdrawalPanel: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "红包进度挂件，将Common/Prefabs/RedBagProgressWidget拖到此处", displayName: "红包进度挂件" })
    redBagProgressWidget: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "拆红包弹窗，将Common/Prefabs/OpenRedBagPanel拖到此处", displayName: "拆红包弹窗" })
    openRedBagPanel: cc.Prefab = null;

    // @property({ type: cc.Prefab, tooltip: "恭喜获得红包弹窗，将Common/Prefabs/RewardRedBagPanel拖到此处", displayName: "恭喜获得红包弹窗" })
    rewardRedBagPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "幸运宝箱弹窗，将Common/Prefabs/RewardLuckBoxPanel拖到此处", displayName: "幸运宝箱弹窗" })
    rewardLuckBoxPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "竖状互推窗口，将Common/Prefabs/VerticalRecommentPanel拖到此处", displayName: "竖状互推窗口" })
    verticalRecommentPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "隐私协议挂件，将Common/Prefabs/PrivacyWidget拖到此处", displayName: "隐私协议挂件" })
    privacyWidget: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "隐私协议弹窗，将Common/Prefabs/PrivacyPanel拖到此处", displayName: "隐私协议弹窗" })
    privacyPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "指引的手势，将Common/Prefabs/HandPrefab拖到此处", displayName: "指引的手势" })
    handPrefab: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "实名制认证弹窗，将Common/Prefabs/YzRealNameAuthPanel拖到此处", displayName: "实名制认证弹窗" })
    yzRealNameAuthPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "模版广告推荐弹窗，将Common/Prefabs/YzCustomAdPanel拖到此处", displayName: "模版广告推荐弹窗" })
    yzCustomAdPanel: cc.Prefab = null;

    @property({ type: cc.Prefab, tooltip: "登录弹窗，将Common/Prefabs/YzLoginPanel拖到此处", displayName: "登录弹窗" })
    yzLoginPanel: cc.Prefab = null;

    //游玩统计SDK:ID
    yw_app_id: string = "";

}

@ccclass("CommonConfig")
export default class CommonConfig {

    wechatconfig: WechatConfig = new WechatConfig();
    oppoconfig: OppoConfig = new OppoConfig();
    vivoconfig: VivoConfig = new VivoConfig();
    nativeAndroidConfig: NativeAndroidConfig = new NativeAndroidConfig();

    baiduconfig: BaiduConfig = new BaiduConfig();
    douyinconfig: DouyinConfig = new DouyinConfig();
    wifiConfig: WiFiConfig = new WiFiConfig();

    qqconfig: QQConfig = new QQConfig();
    qttconfig: QTTConfig = new QTTConfig();
    xiaomiConfig: XiaoMiConfig = new XiaoMiConfig();
    ucConfig: UCConfig = new UCConfig();
    cocosConfig: CocosConfig = new CocosConfig();
    biliConfig: BiliConfig = new BiliConfig();
    kwaiConfig: KwaiConfig = new KwaiConfig();
    nativeIoSConfig: NativeIosConfig = new NativeIosConfig();
    hagoConfig: HagoConfig = new HagoConfig();
    huaweiConfig: HuaWeiConfig = new HuaWeiConfig();

    faceBookConfig: FaceBookConfig = new FaceBookConfig();

    @property({ type: OtherConfig, tooltip: "其他配置", displayName: "其他配置" })
    otherconfig: OtherConfig = new OtherConfig();



    public init(data: string) {

        this._init_other(data);
        if (PlatUtils.IsWechat) {
            return this._init_wechat(data);
        } else if (PlatUtils.IsOPPO) {
            return this._init_oppo(data);
        } else if (PlatUtils.IsVIVO) {
            return this._init_vivo(data);
        } else if (PlatUtils.IsDouyin) {
            return this._init_douyin(data);
        } else if (PlatUtils.IsQQ) {
            return this._init_qq(data);
        } else if (PlatUtils.IsBaidu) {
            return this._init_baidu(data);
        } else if (PlatUtils.IsQTT) {
            return this._init_qtt(data);
        } else if (PlatUtils.IsXiaoMi) {
            return this._init_xiaomi(data);
        } else if (PlatUtils.ISUC) {
            return this._init_uc(data);
        } else if (PlatUtils.ISCocos) {
            return this._init_cocos(data);
        } else if (PlatUtils.IsNativeAndroid) {
            return this._init_native_android();;
        } else if (PlatUtils.IsNativeIOS) {
            return this._init_native_ios(data);;
        } else if (PlatUtils.IsBili) {
            return this._init_bili(data);;
        } else if (PlatUtils.IsKwai) {
            return this._init_kwai(data);;
        } else if (PlatUtils.IsWiFi) {
            return this._init_wifi(data);;
        } else if (PlatUtils.IsHago) {
            return this._init_hago(data);;
        } else if (PlatUtils.IsHuaWei) {
            return this._init_huawei(data);;
        } else if (PlatUtils.IsFaceBook) {
            return this._init_facebook(data);;
        } else {
            return true;
        }
    }


    private _init_other(data: string) {
        if (!data) return false;
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.other) {
                if (configObj.other.yw_app_id) {
                    this.otherconfig.yw_app_id = configObj.other.yw_app_id;
                } else {
                    utils.showLog("warn:" + "本地配置数据不包含‘yw_app_id’字段！");
                }
            }
        }
    }


    private _init_wechat(data: string) {
        if (!data) return false;



        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.wechat) {
                if (configObj.wechat.app_id) {
                    this.wechatconfig.appID = configObj.wechat.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.wechat.intersititia_pos_id) {
                    this.wechatconfig.insertId = configObj.wechat.intersititia_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.wechat.video_pos_id) {
                    this.wechatconfig.videoId = configObj.wechat.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }

                if (configObj.wechat.app_box_pos_id) {
                    this.wechatconfig.appBoxId = configObj.wechat.app_box_pos_id;
                } else {
                    utils.showLog("本地配置数据不包含‘app_box_pos_id’字段！");
                    // return false;
                }

                if (configObj.wechat.version) {
                    this.wechatconfig.version = configObj.wechat.version;
                } else {
                    utils.showLog("本地配置数据不包含‘version’字段！");
                }

                if (configObj.wechat.is_attributed) {
                    this.wechatconfig.isAttributed = configObj.wechat.is_attributed;
                }


                if (configObj.wechat.banner_pos_id) {
                    for (let key in configObj.wechat.banner_pos_id) {
                        let bannerInfo: BannerIdInfo = new BannerIdInfo();
                        bannerInfo.location = this._bannerLocationStringToEnum(key);
                        bannerInfo.bannerId = configObj.wechat.banner_pos_id[key];
                        this.wechatconfig.bannerIds.push(bannerInfo);
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.wechat.shares) {
                    if (configObj.wechat.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.wechat.shares.sy_title;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.wechat.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.wechat.shares.sy_img;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
                if (configObj.wechat.banner_box_pos_id) {
                    this.wechatconfig.bannerBoxId = configObj.wechat.banner_box_pos_id;
                } else {
                    utils.showLog("error" + "本地配置中不包含 ‘banner_box_pos_id’ 字段");
                }

                if (configObj.wechat.native_banner_pos_id) {
                    this.wechatconfig.nativeBannerId = configObj.wechat.native_banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置中不包含 native_banner_pos_id 字段");
                }

                if (configObj.wechat.native_intersititial_pos_id) {
                    this.wechatconfig.nativeInsertIds = configObj.wechat.native_intersititial_pos_id;
                } else {
                    utils.showLog("error" + "本地配置中不包含 native_intersititial_pos_id 字段");
                }




            } else {
                utils.showLog("error" + "本地配置数据不包含‘wechat’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    private _init_oppo(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);

        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.oppo) {
                if (configObj.oppo.app_id) {
                    this.oppoconfig.appID = configObj.oppo.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }

                if (configObj.oppo.package_name) {
                    this.oppoconfig.packageName = configObj.oppo.package_name;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘package_name’字段！");
                    return false;
                }


                if (configObj.oppo.banner_pos_id) {
                    this.oppoconfig.bannerId = configObj.oppo.banner_pos_id;
                } 
                // else {
                //     utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                //     return false;
                // }


                if (configObj.oppo.rec_game_drawer_id) {
                    this.oppoconfig.recGameDrawerId = configObj.oppo.rec_game_drawer_id;
                } else {
                    utils.showLog("error" + "rec_game_drawer_id");
                }
                // if (configObj.oppo.intersititia_pos_id) {
                //     this.oppoconfig.insertId = configObj.oppo.intersititia_pos_id;
                // } else {
                //     utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                //     // return false;
                // }
                if (configObj.oppo.video_pos_id) {
                    this.oppoconfig.videoId = configObj.oppo.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.oppo.native_banner_pos_id) {
                    this.oppoconfig.nativeBannerIds = configObj.oppo.native_banner_pos_id;
                }
                //  else {
                //     utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
                //     return false;
                // }

                if (configObj.oppo.native_trygame_pos_id) {
                    this.oppoconfig.nativeTryGameIds = configObj.oppo.native_trygame_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
                    // return false;
                }


                if (configObj.oppo.intersitial_configs) {
                    this.oppoconfig.intersitialAdConfigs = configObj.oppo.intersitial_configs;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘intersitial_configs’字段！");
                    return false;
                }

                if (configObj.oppo.banner_configs) {
                    this.oppoconfig.bannerAdConfigs = configObj.oppo.banner_configs;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_configs’字段！");
                    return false;
                }


                // if (configObj.oppo.native_intersititial_pos_id) {
                //     this.oppoconfig.nativeInsertIds = configObj.oppo.native_intersititial_pos_id;
                // } else {
                //     utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
                //     return false;
                // }
                if (configObj.oppo.native_single_pos_id) {
                    this.oppoconfig.nativeSingleAdIds = configObj.oppo.native_single_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_single_pos_id’字段！");
                    return false;
                }
                if (configObj.oppo.rec_portal_id) {
                    this.oppoconfig.recPortalId = configObj.oppo.rec_portal_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘rec_portal_id’字段！");
                }
                if (configObj.oppo.rec_game_banner_id) {
                    this.oppoconfig.recGameBannerId = configObj.oppo.rec_game_banner_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘rec_game_banner_id’字段！");
                }
                if (configObj.oppo.version) {
                    //@ts-ignore
                    if (window.new_version) {
                        //@ts-ignore
                        this.oppoconfig.version = window.new_version;
                        utils.showLog("获取到注入的版本号：" + this.oppoconfig.version);
                    } else {
                        this.oppoconfig.version = configObj.oppo.version;
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.oppo.umeng_id) {
                    this.oppoconfig.umengId = configObj.oppo.umeng_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘umeng_id’字段！");
                }

            } else {
                utils.showLog("error" + "本地配置数据不包含‘oppo’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    private _init_vivo(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.vivo) {
                if (configObj.vivo.app_id) {
                    this.vivoconfig.appID = configObj.vivo.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.vivo.intersititia_pos_id) {
                    this.vivoconfig.insertId = configObj.vivo.intersititia_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.video_pos_id) {
                    this.vivoconfig.videoId = configObj.vivo.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.banner_pos_id) {
                    this.vivoconfig.bannerId = configObj.vivo.banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.native_banner_pos_id) {
                    this.vivoconfig.nativeBannerIds = configObj.vivo.native_banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.native_trygame_pos_id) {
                    this.vivoconfig.nativeTryGameIds = configObj.vivo.native_trygame_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
                    // return false;
                }

                if (configObj.vivo.native_intersititial_pos_id) {
                    this.vivoconfig.nativeInsertIds = configObj.vivo.native_intersititial_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
                    return false;
                }


                if (configObj.vivo.rec_portal_id) {
                    this.vivoconfig.recPortalId = configObj.vivo.rec_portal_id;
                } else {
                    utils.showLog("warn" + "本地配置数据不包含‘rec_portal_id’字段！");
                }
                if (configObj.vivo.rec_game_banner_id) {
                    this.vivoconfig.recGameBannerId = configObj.vivo.rec_game_banner_id;
                } else {
                    utils.showLog("warn" + "本地配置数据不包含‘rec_game_banner_id’字段！");
                }

                if (configObj.vivo.native_single_pos_id) {
                    this.vivoconfig.nativeSingleAdIds = configObj.vivo.native_single_pos_id;
                } else {
                    utils.showLog("warn" + "本地配置数据不包含‘native_single_pos_id’字段！");
                }

                if (configObj.vivo.umeng_id) {
                    this.vivoconfig.umengId = configObj.vivo.umeng_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘umeng_id’字段,不启用友盟统计！");
                }

                if (configObj.vivo.version) {
                    this.vivoconfig.version = configObj.vivo.version;
                } else {
                    utils.showLog("warn:" + "本地配置数据不包含‘version’字段！");
                }

            } else {
                utils.showLog("error" + "本地配置数据不包含‘vivo’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    private _init_baidu(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.baidu) {
                if (configObj.baidu.app_id) {
                    this.baiduconfig.appID = configObj.baidu.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.baidu.app_sid) {
                    this.baiduconfig.appSID = configObj.baidu.app_sid;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_sid’字段！")
                }
                if (configObj.baidu.video_pos_id) {
                    this.baiduconfig.videoId = configObj.baidu.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.baidu.banner_pos_id) {
                    this.baiduconfig.bannerId = configObj.baidu.banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }

                if (configObj.baidu.version) {
                    this.baiduconfig.version = configObj.baidu.version;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.baidu.shares) {
                    if (configObj.baidu.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.baidu.shares.sy_title;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                        return false;
                    }
                    if (configObj.baidu.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.baidu.shares.sy_img;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                        return false;
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            } else {
                utils.showLog("error" + "本地配置数据不包含‘baidu’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;

    }

    private _init_wifi(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.wifi) {
                if (configObj.wifi.app_id) {
                    this.wifiConfig.appID = configObj.wifi.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }

                if (configObj.wifi.version) {
                    this.wifiConfig.version = configObj.wifi.version;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }

            } else {
                utils.showLog("error" + "本地配置数据不包含‘baidu’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;

    }

    private _init_douyin(data: string) {
        if (!data) return false;

        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.toutiao) {
                if (configObj.toutiao.app_id) {
                    this.douyinconfig.appID = configObj.toutiao.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.toutiao.banner_pos_id) {
                    this.douyinconfig.bannerId = configObj.toutiao.banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.toutiao.video_pos_id) {
                    this.douyinconfig.videoId = configObj.toutiao.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.toutiao.intersititia_pos_id) {
                    this.douyinconfig.insertId = configObj.toutiao.intersititia_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }

                if (configObj.toutiao.version) {
                    this.douyinconfig.version = configObj.toutiao.version;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.toutiao.shares) {
                    if (configObj.toutiao.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.toutiao.shares.sy_title;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                        return false;
                    }
                    if (configObj.toutiao.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.toutiao.shares.sy_img;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                        return false;
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            }
        } else {
            utils.showLog("warn:" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    private _init_qq(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);

        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.qq) {
                if (configObj.qq.app_id) {
                    this.qqconfig.appID = configObj.qq.app_id;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.qq.video_pos_id) {
                    this.qqconfig.videoId = configObj.qq.video_pos_id;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.banner_pos_id) {
                    this.qqconfig.bannerId = configObj.qq.banner_pos_id;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.intersititia_pos_id) {
                    this.qqconfig.insertId = configObj.qq.intersititia_pos_id;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.box_pos_id) {
                    this.qqconfig.boxId = configObj.qq.box_pos_id;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘box_pos_id’字段！");
                    return false;
                }

                if (configObj.qq.banner_box_pos_id) {
                    this.qqconfig.bannerBoxId = configObj.qq.banner_box_pos_id;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘banner_box_pos_id’字段！");
                    return false;
                }

                if (configObj.qq.shares) {
                    if (configObj.qq.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.qq.shares.sy_title;
                    } else {
                        utils.showMsg("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.qq.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.qq.shares.sy_img;
                    } else {
                        utils.showMsg("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
                if (configObj.qq.version) {
                    this.qqconfig.version = configObj.qq.version;
                } else {
                    utils.showMsg("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }

            } else {
                utils.showMsg("error" + "本地配置数据不包含‘qq’字段！");
                return false;
            }
        } else {
            utils.showMsg("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    /**
     * 初始化趣头条
     * 这里只输出配置不做任何处理
     * @param data 数据
     */
    private _init_qtt(data: string): boolean {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);

        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.qutoutiao) {
                if (configObj.qutoutiao.app_id) {
                    this.qttconfig.appID = configObj.qutoutiao.app_id;
                    utils.showLog("this.qttconfig.appID:", this.qttconfig.appID);
                    utils.showLog("configObj.qutoutiao.app_id:", configObj.qutoutiao.app_id);
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.qutoutiao.app_key) {
                    this.qttconfig.appKey = configObj.qutoutiao.app_key;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_key’字段！");
                    return false;
                }
                if (configObj.qutoutiao.game_name) {
                    this.qttconfig.gamename = configObj.qutoutiao.game_name;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_key’字段！");
                    return false;
                }
            }
        }
        return true;
    }

    private _bannerLocationStringToEnum(str: string) {
        switch (str) {
            case "home": {
                return BannerLocation.Home;
            }
            case "game": {
                return BannerLocation.Game;
            }
            case "level": {
                return BannerLocation.Level;
            }
            case "skin": {
                return BannerLocation.Skin;
            }
            case "pause": {
                return BannerLocation.Pause;
            }
            case "over": {
                return BannerLocation.Over;
            }
            default:
                return BannerLocation.None;
        }
    }

    /**
     * 初始化小米
     * @param data 配置
     */
    private _init_xiaomi(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.xiaomi) {
                if (configObj.xiaomi.app_id) {
                    this.xiaomiConfig.appID = configObj.xiaomi.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.intersititia_pos_id) {
                    this.xiaomiConfig.insertId = configObj.xiaomi.intersititia_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.video_pos_id) {
                    this.xiaomiConfig.videoId = configObj.xiaomi.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }


                if (configObj.xiaomi.banner_pos_id) {
                    this.xiaomiConfig.bannerId = configObj.xiaomi.banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }


                if (configObj.xiaomi.native_banner_pos_id) {
                    this.xiaomiConfig.nativeBannerIds = configObj.xiaomi.native_banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
                    return false;
                }

                if (configObj.xiaomi.native_trygame_pos_id) {
                    this.xiaomiConfig.nativeTryGameIds = configObj.xiaomi.native_trygame_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
                    // return false;
                }

                if (configObj.xiaomi.native_intersititial_pos_id) {
                    this.xiaomiConfig.nativeInsertIds = configObj.xiaomi.native_intersititial_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
                    return false;
                }

            } else {
                utils.showLog("error" + "本地配置数据不包含‘xiaomi’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    /**
     * 初始化uc
     * @param data 配置
     */
    private _init_uc(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.uc) {
                if (configObj.uc.app_id) {
                    this.ucConfig.appID = configObj.uc.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.uc.version) {
                    this.ucConfig.version = configObj.uc.version;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.uc.shares) {
                    if (configObj.uc.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.uc.shares.sy_title;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.uc.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.uc.shares.sy_img;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            } else {
                utils.showLog("error" + "本地配置数据不包含‘uc’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    /**
     * 初始化uc
     * @param data 配置
     */
    private _init_cocos(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {
            if (configObj.cocos) {
                if (configObj.cocos.app_id) {
                    this.cocosConfig.appID = configObj.cocos.app_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.cocos.video_pos_id) {
                    this.cocosConfig.videoId = configObj.cocos.video_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.cocos.banner_pos_id) {
                    this.cocosConfig.bannerId = configObj.cocos.banner_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.cocos.intersititia_pos_id) {
                    this.cocosConfig.insertId = configObj.cocos.intersititia_pos_id;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }

                if (configObj.cocos.shares) {
                    if (configObj.cocos.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.cocos.shares.sy_title;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.cocos.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.cocos.shares.sy_img;
                    } else {
                        utils.showLog("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            } else {
                utils.showLog("error" + "本地配置数据不包含‘cocos’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }


    /**
   * 初始化原生安卓平台
   * @param data 配置
   */
    private _init_native_android() {
        if (!utils.Tool_Native) {
            return false;
        }
        let data = utils.Tool_Native.getNativeData()
        utils.showLog("原生安卓平台本地配置数据:", data);

        if (!data) {
            utils.showLog("error : 安卓本地配置数据配置错误！")
            return false;
        }

        let configObj: any = JSON.parse(data);

        if (configObj) {
            if (configObj.app_id) {
                this.nativeAndroidConfig.appID = configObj.app_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }

            if (configObj.version) {
                this.nativeAndroidConfig.version = configObj.version;
            } else {
                utils.showMsg("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }

            if (configObj.channel) {
                this.nativeAndroidConfig.channel = configObj.channel;
                utils.showLog("原生平台渠道号 channel=" + configObj.channel);
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }



        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    }


    /**
     * 初始化原生IOS
     */
    private _init_native_ios(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);

        if (configObj) {
            if (configObj.ios.app_id) {
                this.nativeIoSConfig.appID = configObj.ios.app_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }

            if (configObj.ios.video_pos_id) {
                this.nativeIoSConfig.videoId = configObj.ios.video_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }

            if (configObj.ios.version) {
                this.nativeIoSConfig.version = configObj.ios.version;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }

            if (configObj.ios.banner_pos_id) {
                this.nativeIoSConfig.bannerId = configObj.ios.banner_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                return false;
            }

            if (configObj.ios.intersititia_pos_id) {
                this.nativeIoSConfig.insertId = configObj.ios.intersititia_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                return false;
            }

        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;

    }

    /**
   * 初始化bili
   * @param data 配置
   */
    private _init_bili(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);
        if (configObj) {

            if (configObj.bili.shares.sy_title) {
                this.otherconfig.shareTitle = configObj.bili.shares.sy_title;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                return false;
            }
            if (configObj.bili.shares.sy_img) {
                this.otherconfig.shareImgUrl = configObj.bili.shares.sy_img;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }
    /**
   * 初始化快手
   * @param data 配置
   */
    private _init_kwai(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);

        if (configObj) {
            if (configObj.kwai.app_id) {
                this.kwaiConfig.appID = configObj.kwai.app_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }

            if (configObj.kwai.video_pos_id) {
                this.kwaiConfig.videoId = configObj.kwai.video_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }

            if (configObj.kwai.intersititia_pos_id) {
                this.kwaiConfig.insertId = configObj.kwai.intersititia_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
            }

            if (configObj.kwai.version) {
                this.kwaiConfig.version = configObj.kwai.version;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }

            if (configObj.kwai.shares) {
                if (configObj.kwai.shares.sy_title) {
                    this.otherconfig.shareTitle = configObj.kwai.shares.sy_title;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                    return false;
                }
                if (configObj.kwai.shares.sy_img) {
                    this.otherconfig.shareImgUrl = configObj.kwai.shares.sy_img;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                    return false;
                }
                if (configObj.kwai.shares.sy_icon) {
                    this.otherconfig.shareIcon = configObj.kwai.shares.sy_icon;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares.sy_icon");
                    return false;
                }
                if (configObj.kwai.shares.sy_desc) {
                    this.otherconfig.shareDesc = configObj.kwai.shares.sy_desc;
                } else {
                    utils.showLog("error" + "本地配置数据不包含‘shares.sy_desc’字段！");
                    return false;
                }
            } else {
                utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    /**
     * 初始化facebook
     * @param data 配置
     */
    private _init_facebook(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);

        if (configObj) {
            if (configObj.faceBook.app_id) {
                this.faceBookConfig.appID = configObj.faceBook.app_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }

            if (configObj.faceBook.video_pos_id) {
                this.faceBookConfig.videoId = configObj.faceBook.video_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }

            if (configObj.faceBook.intersititia_pos_id) {
                this.faceBookConfig.insertId = configObj.faceBook.intersititia_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                return false;
            }

            if (configObj.faceBook.banner_pos_id) {
                this.faceBookConfig.bannerId = configObj.faceBook.banner_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                return false;
            }


            if (configObj.faceBook.version) {
                this.faceBookConfig.version = configObj.faceBook.version;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }


        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        utils.showLog("success" + "本地配置数据验证完成!");
        return true;
    }


    /**
     * 初始化Hago
     * @param data 配置
     */
    private _init_hago(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);

        if (configObj) {
            if (configObj.hago.app_id) {
                this.hagoConfig.appID = configObj.hago.app_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.hago.video_pos_id) {
                this.hagoConfig.videoId = configObj.hago.video_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.hago.version) {
                this.hagoConfig.version = configObj.hago.version;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }

    /**
     * 初始化Huawei
     * @param data 配置
     */
    private _init_huawei(data: string) {
        if (!data) return false;
        utils.showLog("本地配置数据:", data);
        let configObj: any = JSON.parse(data);

        if (configObj) {
            if (configObj.huawei.app_id) {
                this.huaweiConfig.appID = configObj.huawei.app_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.huawei.video_pos_id) {
                this.huaweiConfig.videoId = configObj.huawei.video_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.huawei.banner_pos_id) {
                this.huaweiConfig.bannerId = configObj.huawei.banner_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                return false;
            }
            if (configObj.huawei.native_banner_pos_id) {
                this.huaweiConfig.nativeBannerIds = configObj.huawei.native_banner_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
            }

            if (configObj.huawei.native_intersititial_pos_id) {
                this.huaweiConfig.nativeInsertIds = configObj.huawei.native_intersititial_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
            }

            if (configObj.huawei.native_trygame_pos_id) {
                this.huaweiConfig.nativeTryGameIds = configObj.huawei.native_trygame_pos_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
            }

            if (configObj.huawei.native_splash_id) {
                this.huaweiConfig.nativeSplashId = configObj.huawei.native_splash_id;
            }
            else {
                utils.showLog("error" + "本地配置数据不包含‘native_splash_id’字段！")
            }
            if (configObj.huawei.umeng_id) {
                this.huaweiConfig.umengId = configObj.huawei.umeng_id;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘umeng_id’字段,不启用友盟统计！");
            }

            if (configObj.huawei.version) {
                this.huaweiConfig.version = configObj.huawei.version;
            } else {
                utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
        } else {
            utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }

        return true;
    }
}


