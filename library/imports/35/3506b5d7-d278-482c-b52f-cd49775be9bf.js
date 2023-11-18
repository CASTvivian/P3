"use strict";
cc._RF.push(module, '3506bXX0nhILLUvzUl3W+m/', 'CommonConfig');
// common-plugin/Scripts/CommonConfig.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherConfig = exports.FaceBookConfig = exports.BiliConfig = exports.XiaoMiConfig = exports.CocosConfig = exports.UCConfig = exports.QTTConfig = exports.DouyinConfig = exports.NativeIosConfig = exports.HagoConfig = exports.KwaiConfig = exports.WiFiConfig = exports.BaiduConfig = exports.NativeAndroidConfig = exports.HuaWeiConfig = exports.YzRedBagInfo = exports.VivoConfig = exports.OppoConfig = exports.QQConfig = exports.WechatConfig = exports.CustomAdInfo = exports.NativeBannerInfo = exports.BannerIdInfo = void 0;
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BannerIdInfo = /** @class */ (function () {
    function BannerIdInfo() {
        this.location = YZ_Constant_1.BannerLocation.None;
        this.bannerId = "";
    }
    __decorate([
        property({ type: cc.Enum(YZ_Constant_1.BannerLocation), displayName: "广告条位置" })
    ], BannerIdInfo.prototype, "location", void 0);
    __decorate([
        property({ displayName: "广告条ID" })
    ], BannerIdInfo.prototype, "bannerId", void 0);
    BannerIdInfo = __decorate([
        ccclass("BannerIdInfo")
    ], BannerIdInfo);
    return BannerIdInfo;
}());
exports.BannerIdInfo = BannerIdInfo;
;
var NativeBannerInfo = /** @class */ (function () {
    function NativeBannerInfo() {
        /**
         * 广告条的位置
         *   1:Home-首页
         *   2:Level-选关
         *   3:Skin-皮肤
         *   4:Game-游戏
         *   5:Pause-暂停
         *   6:Over-结算
         */
        this.location = YZ_Constant_1.BannerLocation.None;
        /**
         * 是否显示结算大banner
         */
        this.show_st_banner = "false";
        /**
         * 默认原生banner关闭按钮大小，默认为60
         */
        this.banner_close_but_size = 40;
        /**
         * 默认banner关闭按钮透明度 默认为120
         */
        this.banner_close_but_alpha = 120;
        /**
         * 默认banner关闭按钮高度 默认为220
         */
        this.banner_show_height = 160;
        /**
         * 默认banner关闭按钮点击区域默认为80
         */
        this.banner_close_but_range = 40;
        /**
         * 默认原生banner关闭按钮，是否显示。默认为显示："true"
         */
        this.banner_close_but_show = "true";
        /**
         * 结算前banner整体缩放，默认为1
         */
        this.st_banner_scale = 1;
        /**
         * 结算前banner下载按钮的图片地址
         */
        this.st_banner_down_btn_image = "";
        /**
         * 结算前banner下载按钮显示类型，默认不配置，则不显示，配置后则显示，值为2:显示循环播放放大缩小效果，
         */
        this.st_banner_down_but_show = 0;
        /**
         * 结算前banner，下载按钮距离广告顶部间距，默认贴紧广告顶部值是-111
         */
        this.st_banner_down_but_margin_top = 0;
        /**
         *  结算前banner，关闭按钮点击区域大小
         */
        this.st_banner_close_but_range = 55;
        /**
         * 结算前banner，关闭按钮图片大小
         */
        this.st_banner_close_but_size = 55;
        /**
         * 结算前banner关闭按钮，是否显示。默认为显示："true"
         */
        this.st_banner_close_but_show = "true";
        /**
         * 结算前banner距离底部的距离
         */
        this.st_banner_bottom = 0;
        /**
         * 结算前banner关闭按钮透明度
         * 0-255
         */
        this.st_banner_close_but_alpha = 255;
        /**
         * banner点击后是不是需要刷新数据
         */
        this.banner_click_refresh = "true";
        /**
         * 自动刷新时间，单位：秒，默认为：-1 不刷新
         */
        this.auto_refresh = -1;
        /**
         * 样式
         * -1 :默认、0:单图片缩放、1:单图片和自定义宽高、2:默认样式自定义宽高
         */
        this.st_banner_style = -1;
        /**
        * 结算banner样式-宽，默认：821  单位：像素
        */
        this.st_banner_width = -1;
        /**
        * 结算banner样式-高:默认：589 单位：像素
        */
        this.st_banner_height = -1;
        /**
        * 结算banner是否显示备用广告
        * 默认：1 显示，-1 为不显示
        */
        this.st_banner_show_back_up = 1;
        /**
         * 是否显示banner
         * 默认：1 显示， -1为不显示；
         */
        this.is_show_banner = 1;
        //显示互推banner
        this.is_show_rec = -1;
        //延迟显示时间
        this.delay_show_time = 0;
        //关闭按钮间隔多少次触发广告跳转
        this.banner_close_showAd_interval = 0;
        //普通原生Banner背景透明遮罩透明度 大于0则显示当前值的透明遮罩层
        this.bg_mask_opacity = 0;
        //结算原生banner背景透明遮罩透明度 大于0则显示当前值的透明遮罩层
        this.st_banner_bg_mask_opacity = 0;
        // 对齐方式：bottom top
        this._alignType = "bottom";
    }
    /**
     * 初始化
     * @param location 位置
     * @param info 配置
     */
    NativeBannerInfo.prototype.init = function (location, info) {
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
    };
    NativeBannerInfo.prototype.toStrong = function () {
        return "location=" + this.location + "&is_show_banner=" + this.is_show_banner + "&banner_close_but_show=" + this.banner_close_but_show + "&banner_close_but_alpha=" + this.banner_close_but_alpha + "&banner_close_but_range=" + this.banner_close_but_range + "&banner_close_but_size=" + this.banner_close_but_size + "&banner_show_height=" + this.banner_show_height + "&st_banner_close_but_range=" + this.st_banner_close_but_range + "&st_banner_close_but_size=" + this.st_banner_close_but_size + "&st_banner_down_btn_image=" + this.st_banner_down_btn_image + "&st_banner_down_but_margin_top=" + this.st_banner_down_but_margin_top + "&st_banner_down_but_show=" + this.st_banner_down_but_show + "&st_banner_scale=" + this.st_banner_scale + "&show_st_banner=" + this.show_st_banner + "&st_banner_close_but_show=" + this.st_banner_close_but_show + "&st_banner_bottom=" + this.st_banner_bottom + "&st_banner_close_but_alpha=" + this.st_banner_close_but_alpha + "&banner_click_refresh=" + this.banner_click_refresh + "&auto_refresh=" + this.auto_refresh + "&st_banner_style=" + this.st_banner_style + "&st_banner_width=" + this.st_banner_width + "&st_banner_height=" + this.st_banner_height + "&st_banner_show_back_up=" + this.st_banner_show_back_up + "&is_show_rec=" + this.is_show_rec;
    };
    NativeBannerInfo = __decorate([
        ccclass("NativeBannerInfo")
    ], NativeBannerInfo);
    return NativeBannerInfo;
}());
exports.NativeBannerInfo = NativeBannerInfo;
var CustomAdInfo = /** @class */ (function () {
    function CustomAdInfo() {
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
        this.location = YZ_Constant_1.BannerLocation.None;
        /**
         * 是否显示结算大banner
         */
        this.is_show_ad = "true";
        /**
         * 距离顶部的距离
         */
        this.top = -1;
        /**
         * 距离左边的距离
         */
        this.left = -1;
        /**
         * 距离右边的距离
         */
        this.right = -1;
        /**
         * 距离底部的距离
         */
        this.bottom = -1;
        /**
         * 广告ID
         */
        this.id = "";
        /**
         * 刷新时间
         */
        this.refresh_time = -1;
        /**
         * 广告宽度
         */
        this.width = 0;
        /**
         * 广告高度
        */
        this.height = 0;
        /**
         * 显示成功后是否隐藏banner
        */
        this.hide_banner = "false";
        /**
         * 是否居中显示
         * about：左右居中
         * updown:上下
         * all:上下和左右居中
         */
        this.is_center = "false";
        /**
         * 改变位置的时候是否刷新广告
         */
        this.change_location_refresh_ad = "true";
        //当前obj对象
        this.customAdObj = null;
    }
    /**
     * 初始化
     * @param location 位置
     * @param info 配置
     */
    CustomAdInfo.prototype.init = function (location, info) {
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
    };
    CustomAdInfo.prototype.toStrong = function () {
        return "customAdInfo>>>>#location=" + this.location + "#top=" + this.top + "#left=" + this.left + "#right=" + this.right + "#bottom=" + this.bottom + "#refreshTime=" + this.refresh_time + "#id=" + this.id + "#width=" + this.width + "#height=" + this.height + "#is_center=" + this.is_center;
    };
    CustomAdInfo = __decorate([
        ccclass("CustomAdInfo")
    ], CustomAdInfo);
    return CustomAdInfo;
}());
exports.CustomAdInfo = CustomAdInfo;
var WechatConfig = /** @class */ (function () {
    function WechatConfig() {
        this.appID = "";
        this.bannerIds = [];
        this.videoId = "";
        this.insertId = "";
        this.jumpId = "";
        this.appBoxId = "";
        this.boxId = "";
        this.bannerBoxId = "";
        this.customAdInfos = [];
        this.isAttributed = false;
        this.version = "";
        this.nativeBannerId = "";
        this.nativeInsertIds = "";
    }
    /**
     * 根据位置获取bannerId
     * @param location BannerLocation
     */
    WechatConfig.prototype.getBannerId = function (location) {
        for (var i = 0; i < this.bannerIds.length; i++) {
            if (this.bannerIds[i].location == location) {
                return this.bannerIds[i].bannerId;
            }
        }
        if (this.bannerIds.length > 0) {
            return this.bannerIds[0].bannerId;
        }
        return "";
    };
    /**
  * 设定原生模版配置
  * @param location 位置
  * @param bannerInfo 配置
  */
    WechatConfig.prototype.setCustomAdInfo = function (location, custInfo) {
        var nativeCustomAd = new CustomAdInfo();
        nativeCustomAd.init(location, custInfo);
        this.customAdInfos.push(nativeCustomAd);
    };
    /**
     * 根据位置获取原生模版配置
     * @param location BannerLocation
     */
    WechatConfig.prototype.getCustomAdInfoInfo = function (location) {
        Utils_1.utils.showLog("根据位置获取原生模版配置>>location=", location);
        for (var i = 0; i < this.customAdInfos.length; i++) {
            if (this.customAdInfos[i].location == location) {
                Utils_1.utils.showLog("根据位置获取原生模版配置>>info=", this.customAdInfos[i].toStrong());
                return this.customAdInfos[i];
            }
        }
        return null;
    };
    /**
     * 设定bannerId
     * @param location BannerLocation
     * @param bannerId
     */
    WechatConfig.prototype.setBannerId = function (location, bannerId) {
        for (var i = 0; i < this.bannerIds.length; i++) {
            if (this.bannerIds[i].location == location) {
                this.bannerIds[i].bannerId = bannerId;
                return;
            }
        }
    };
    WechatConfig = __decorate([
        ccclass("WechatConfig")
    ], WechatConfig);
    return WechatConfig;
}());
exports.WechatConfig = WechatConfig;
var QQConfig = /** @class */ (function () {
    function QQConfig() {
        this.QQ = true;
        this.appID = "";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.boxId = "";
        this.version = "";
        this.bannerBoxId = "";
    }
    QQConfig = __decorate([
        ccclass("QQConfig")
    ], QQConfig);
    return QQConfig;
}());
exports.QQConfig = QQConfig;
var OppoConfig = /** @class */ (function () {
    function OppoConfig() {
        this.appID = "";
        this.channel = "oppo";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.nativeBannerIds = [];
        this.nativeTryGameIds = [];
        this.nativeInsertIds = [];
        this.nativeSingleAdIds = [];
        this.packageName = "";
        this.nativeBannerInfos = [];
        this.recGameBannerId = "";
        this.recPortalId = "";
        this.version = "";
        this.recGameDrawerId = "";
        this.umengId = ""; //友盟ID
        this.intersitialAdConfigs = []; //插屏ID配置
        this.bannerAdConfigs = []; //Banner配置
    }
    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    OppoConfig.prototype.getNativeBannerInfo = function (location) {
        Utils_1.utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (var i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                Utils_1.utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    };
    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    OppoConfig.prototype.setNativeBannerInfo = function (location, bannerInfo) {
        var nativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    };
    OppoConfig = __decorate([
        ccclass("OppoConfig")
    ], OppoConfig);
    return OppoConfig;
}());
exports.OppoConfig = OppoConfig;
var VivoConfig = /** @class */ (function () {
    function VivoConfig() {
        this.showAd = true;
        this.appID = "";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.nativeTryGameIds = [];
        this.nativeBannerIds = [];
        this.nativeInsertIds = [];
        this.nativeBannerInfos = [];
        this.customAdInfos = [];
        this.nativeSingleAdIds = [];
        this.recGameBannerId = "";
        this.recPortalId = "";
        this.version = "";
        this.umengId = ""; //友盟ID
    }
    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    VivoConfig.prototype.getNativeBannerInfo = function (location) {
        Utils_1.utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (var i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                Utils_1.utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    };
    /**
     * 根据位置获取原生模版配置
     * @param location BannerLocation
     */
    VivoConfig.prototype.getCustomAdInfoInfo = function (location) {
        Utils_1.utils.showLog("根据位置获取原生模版配置>>location=", location);
        for (var i = 0; i < this.customAdInfos.length; i++) {
            if (this.customAdInfos[i].location == location) {
                Utils_1.utils.showLog("根据位置获取原生模版配置>>info=", this.customAdInfos[i].toStrong());
                return this.customAdInfos[i];
            }
        }
        return new CustomAdInfo();
    };
    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    VivoConfig.prototype.setNativeBannerInfo = function (location, bannerInfo) {
        var nativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    };
    /**
  * 设定原生模版配置
  * @param location 位置
  * @param bannerInfo 配置
  */
    VivoConfig.prototype.setCustomAdInfo = function (location, custInfo) {
        var nativeCustomAd = new CustomAdInfo();
        nativeCustomAd.init(location, custInfo);
        this.customAdInfos.push(nativeCustomAd);
    };
    VivoConfig = __decorate([
        ccclass("VivoConfig")
    ], VivoConfig);
    return VivoConfig;
}());
exports.VivoConfig = VivoConfig;
var YzRedBagInfo = /** @class */ (function () {
    function YzRedBagInfo() {
        this._progress = 0; //当前进度
        this._totalProgress = 5; //总进度
        this._balance = 0.00; //余额
        this._totalMoeny = 0;
        this._lastOpenFreeRedBagTime = "";
        this._progressInfos = null;
        this._lastOpenLevel = "-1";
        this._freeRedBagCount = 0; //现金红包次数
        this.withdrawaMoneys = [5, 20, 45, 50];
        if (PlatUtils_1.default.IsTest) {
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
            ];
        }
        this._progress = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_PROGRESS) ? YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_PROGRESS) : 0;
        this._totalProgress = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_TOTAL_PROGRESS) ? YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_TOTAL_PROGRESS) : 5;
        this._balance = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_BALANCE) ? parseFloat(YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_BALANCE)) : 0.00;
        this._totalMoeny = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_TOTAL_MONEY) ? parseFloat(YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_RED_BAG_TOTAL_MONEY)) : 0.00;
        this._lastOpenFreeRedBagTime = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_FREE_RED_BAG_TIME) ? YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_FREE_RED_BAG_TIME) : "";
        this._lastOpenLevel = YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_LAST_OPEN_LEVEL) ? YZ_LocalStorage_1.default.getItem(YZ_Constant_1.default.ST_LAST_OPEN_LEVEL) : "-1";
    }
    Object.defineProperty(YzRedBagInfo.prototype, "freeRedBagCount", {
        get: function () {
            return this._freeRedBagCount;
        },
        set: function (value) {
            this._freeRedBagCount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "lastOpenLevel", {
        get: function () {
            return this._lastOpenLevel;
        },
        set: function (value) {
            this._lastOpenLevel = value;
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_LAST_OPEN_LEVEL, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            this._progress = value;
            if (this._progress > this._totalProgress) {
                this._progress = this._totalProgress;
            }
            else {
                Utils_1.utils._rewardRedBagPanelShowCount = -1;
            }
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_RED_BAG_PROGRESS, this._progress + '');
            cc.game.emit("YZ_RED_BAG_PROGRESS_CHANGE");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "totalProgress", {
        get: function () {
            return this._totalProgress;
        },
        set: function (value) {
            this._totalProgress = value;
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_RED_BAG_TOTAL_PROGRESS, value + '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "totalMoney", {
        get: function () {
            return this._totalMoeny;
        },
        set: function (value) {
            this._totalMoeny = value;
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_RED_BAG_TOTAL_MONEY, value + '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "progressInfos", {
        get: function () {
            return this._progressInfos;
        },
        set: function (values) {
            this._progressInfos = values;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "curProgressInfo", {
        get: function () {
            if (this._progressInfos && this._progressInfos.length > 0) {
                if (parseInt(this.lastOpenLevel) > 0 && parseInt(this.lastOpenLevel) >= Utils_1.utils.currentLevel) {
                    return this._progressInfos[this._progressInfos.length - 1];
                }
                var temp = this.lastOpenLevel ? this._progressInfos[0] : this._progressInfos[1];
                for (var i = 0; i < this._progressInfos.length; i++) {
                    //@ts-ignore
                    if (Utils_1.utils.currentLevel <= this._progressInfos[i].level) {
                        temp = this._progressInfos[i];
                        break;
                    }
                }
                console.log("curInfo " + JSON.stringify(temp));
                return temp;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        set: function (value) {
            this._balance = value;
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_RED_BAG_BALANCE, value + '');
            cc.game.emit("YZ_RED_BAG_BALANCE_CHANGE");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "lastOpenFreeRedBagTime", {
        get: function () {
            return this._lastOpenFreeRedBagTime;
        },
        set: function (value) {
            this._lastOpenFreeRedBagTime = value;
            YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_FREE_RED_BAG_TIME, value + '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YzRedBagInfo.prototype, "isFreeRedBag", {
        /**
         * 今天是否有免费的红包
         */
        get: function () {
            cc.log("是否有免费红包：" + new Date().toDateString() != this._lastOpenFreeRedBagTime);
            return new Date().toDateString() != this._lastOpenFreeRedBagTime;
        },
        enumerable: false,
        configurable: true
    });
    YzRedBagInfo = __decorate([
        ccclass("YzRedBagInfo")
    ], YzRedBagInfo);
    return YzRedBagInfo;
}());
exports.YzRedBagInfo = YzRedBagInfo;
var HuaWeiConfig = /** @class */ (function () {
    function HuaWeiConfig() {
        this.appID = "";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.nativeSplashId = "";
        this.nativeTryGameIds = [];
        this.nativeBannerIds = [];
        this.nativeInsertIds = [];
        this.nativeBannerInfos = [];
        this.version = "";
        this.umengId = "";
    }
    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    HuaWeiConfig.prototype.getNativeBannerInfo = function (location) {
        Utils_1.utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (var i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                Utils_1.utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    };
    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    HuaWeiConfig.prototype.setNativeBannerInfo = function (location, bannerInfo) {
        var nativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    };
    HuaWeiConfig = __decorate([
        ccclass("HuaWeiConfig")
    ], HuaWeiConfig);
    return HuaWeiConfig;
}());
exports.HuaWeiConfig = HuaWeiConfig;
var NativeAndroidConfig = /** @class */ (function () {
    function NativeAndroidConfig() {
        this.appID = "";
        this.channel = "";
        this.version = "";
    }
    NativeAndroidConfig = __decorate([
        ccclass("NativeAndroidConfig")
    ], NativeAndroidConfig);
    return NativeAndroidConfig;
}());
exports.NativeAndroidConfig = NativeAndroidConfig;
var BaiduConfig = /** @class */ (function () {
    function BaiduConfig() {
        this.appID = "";
        this.appSID = "";
        this.bannerId = "";
        this.videoId = "";
        this.version = "";
    }
    BaiduConfig = __decorate([
        ccclass("BaiduConfig")
    ], BaiduConfig);
    return BaiduConfig;
}());
exports.BaiduConfig = BaiduConfig;
var WiFiConfig = /** @class */ (function () {
    function WiFiConfig() {
        this.appID = "";
        this.bannerId = "";
        this.videoId = "";
        this.version = "";
    }
    WiFiConfig = __decorate([
        ccclass("WiFiConfig")
    ], WiFiConfig);
    return WiFiConfig;
}());
exports.WiFiConfig = WiFiConfig;
var KwaiConfig = /** @class */ (function () {
    function KwaiConfig() {
        this.appID = "";
        this.videoId = "";
        this.insertId = "";
        this.version = "";
    }
    KwaiConfig = __decorate([
        ccclass("KwaiConfig")
    ], KwaiConfig);
    return KwaiConfig;
}());
exports.KwaiConfig = KwaiConfig;
var HagoConfig = /** @class */ (function () {
    function HagoConfig() {
        this.appID = "";
        this.videoId = "";
        this.version = "";
    }
    HagoConfig = __decorate([
        ccclass("HagoConfig")
    ], HagoConfig);
    return HagoConfig;
}());
exports.HagoConfig = HagoConfig;
var NativeIosConfig = /** @class */ (function () {
    function NativeIosConfig() {
        this.appID = "";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.version = "";
    }
    NativeIosConfig = __decorate([
        ccclass("NativeIosConfig")
    ], NativeIosConfig);
    return NativeIosConfig;
}());
exports.NativeIosConfig = NativeIosConfig;
var DouyinConfig = /** @class */ (function () {
    function DouyinConfig() {
        this.Douyin = true;
        this.appID = "";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.version = "";
    }
    DouyinConfig = __decorate([
        ccclass("DouyinConfig")
    ], DouyinConfig);
    return DouyinConfig;
}());
exports.DouyinConfig = DouyinConfig;
var QTTConfig = /** @class */ (function () {
    function QTTConfig() {
        this.QuTouTiao = true;
        this.showAd = true;
        this.gamename = "";
        this.appID = "";
        this.appKey = "";
    }
    QTTConfig = __decorate([
        ccclass("QuTouTiaoConfig")
    ], QTTConfig);
    return QTTConfig;
}());
exports.QTTConfig = QTTConfig;
var UCConfig = /** @class */ (function () {
    function UCConfig() {
        this.appID = "";
        this.appKey = "";
        this.version = "";
    }
    UCConfig = __decorate([
        ccclass("UCConfig")
    ], UCConfig);
    return UCConfig;
}());
exports.UCConfig = UCConfig;
var CocosConfig = /** @class */ (function () {
    function CocosConfig() {
        this.appID = "";
        this.appKey = "";
        this.appSecret = "";
        this.bannerId = "";
        this.videoId = "";
        this.insertId = "";
    }
    CocosConfig = __decorate([
        ccclass("CocosConfig")
    ], CocosConfig);
    return CocosConfig;
}());
exports.CocosConfig = CocosConfig;
var XiaoMiConfig = /** @class */ (function () {
    function XiaoMiConfig() {
        this.appID = "";
        this.bannerId = "";
        this.videoId = "";
        this.insertId = "";
        this.nativeSplashId = "";
        this.nativeTryGameIds = [];
        this.nativeBannerIds = [];
        this.nativeInsertIds = [];
        this.nativeBannerInfos = [];
        this.version = "";
    }
    /**
     * 根据位置获取原生banner配置
     * @param location BannerLocation
     */
    XiaoMiConfig.prototype.getNativeBannerInfo = function (location) {
        Utils_1.utils.showLog("根据位置获取原生banner配置>>location=", location);
        for (var i = 0; i < this.nativeBannerInfos.length; i++) {
            if (this.nativeBannerInfos[i].location == location) {
                Utils_1.utils.showLog("根据位置获取原生banner配置>>info=", this.nativeBannerInfos[i].toStrong());
                return this.nativeBannerInfos[i];
            }
        }
        return new NativeBannerInfo();
    };
    /**
     * 设定原生banner配置
     * @param location 位置
     * @param bannerInfo 配置
     */
    XiaoMiConfig.prototype.setNativeBannerInfo = function (location, bannerInfo) {
        var nativeBannerInfo = new NativeBannerInfo();
        nativeBannerInfo.init(location, bannerInfo);
        this.nativeBannerInfos.push(nativeBannerInfo);
    };
    XiaoMiConfig = __decorate([
        ccclass("XiaoMiConfig")
    ], XiaoMiConfig);
    return XiaoMiConfig;
}());
exports.XiaoMiConfig = XiaoMiConfig;
var BiliConfig = /** @class */ (function () {
    function BiliConfig() {
        this.appID = "";
        this.bannerId = "";
        this.videoId = "";
    }
    BiliConfig = __decorate([
        ccclass("BiliConfig")
    ], BiliConfig);
    return BiliConfig;
}());
exports.BiliConfig = BiliConfig;
var FaceBookConfig = /** @class */ (function () {
    function FaceBookConfig() {
        this.appID = "";
        this.bannerId = "";
        this.insertId = "";
        this.videoId = "";
        this.version = "";
    }
    FaceBookConfig = __decorate([
        ccclass("FaceBookConfig")
    ], FaceBookConfig);
    return FaceBookConfig;
}());
exports.FaceBookConfig = FaceBookConfig;
var OtherConfig = /** @class */ (function () {
    function OtherConfig() {
        this.shareTitle = "";
        this.shareImgUrl = "";
        this.shareIcon = "";
        this.shareDesc = "";
        this.localConfig = null;
        this.logoutView = null;
        this.nativeBanner = null;
        this.nativeInsert = null;
        this.nativeSplashView = null;
        this.recommendGamesBanner = null;
        this.recommendGamesBar = null;
        this.tryGamesWidget = null;
        this.moreGamesWidget = null;
        this.recordWidget = null;
        this.shortcutWidget = null;
        // @property({ type: cc.Prefab, tooltip: "游戏盒子，将Common/Prefabs/GameBox拖到此处 " })
        this.gameBox = null;
        this.crossWidget6 = null;
        // @property({ type: cc.Prefab, tooltip: "激励插屏推广组件，将Common/Prefabs/RewardInsert拖到此处" })
        this.rewardInsert = null;
        this.statementRecomment = null;
        this.singleNativeAd = null;
        this.shareRecordPanel = null;
        // @property({ type: cc.Prefab, tooltip: "原生退出游戏弹窗，将Common/Prefabs/GameExitDialog拖到此处" })
        this.gameExitDialog = null;
        this.rewardBoxPanel = null;
        this.rewardTurnTablePanel = null;
        this.rewardShortCutPanel = null;
        this.nativeTryGameWidget = null;
        this.beforGameOverRecGamesPanel = null;
        // @property({ type: cc.Prefab, tooltip: "红包提现框，将Common/Prefabs/WithdrawalWidget拖到此处", displayName: "红包提现框挂件" })
        this.withdrawalWidget = null;
        // @property({ type: cc.Prefab, tooltip: "红包提现弹窗，将Common/Prefabs/WithdrawalPanel拖到此处", displayName: "红包提现弹窗" })
        this.withdrawalPanel = null;
        // @property({ type: cc.Prefab, tooltip: "红包进度挂件，将Common/Prefabs/RedBagProgressWidget拖到此处", displayName: "红包进度挂件" })
        this.redBagProgressWidget = null;
        // @property({ type: cc.Prefab, tooltip: "拆红包弹窗，将Common/Prefabs/OpenRedBagPanel拖到此处", displayName: "拆红包弹窗" })
        this.openRedBagPanel = null;
        // @property({ type: cc.Prefab, tooltip: "恭喜获得红包弹窗，将Common/Prefabs/RewardRedBagPanel拖到此处", displayName: "恭喜获得红包弹窗" })
        this.rewardRedBagPanel = null;
        this.rewardLuckBoxPanel = null;
        this.verticalRecommentPanel = null;
        this.privacyWidget = null;
        this.privacyPanel = null;
        this.handPrefab = null;
        this.yzRealNameAuthPanel = null;
        this.yzCustomAdPanel = null;
        this.yzLoginPanel = null;
        //游玩统计SDK:ID
        this.yw_app_id = "";
    }
    __decorate([
        property({ type: cc.JsonAsset, displayName: "本地配置文件", tooltip: "将Common/Config/下面的配置文件拖放到此处" })
    ], OtherConfig.prototype, "localConfig", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "日志输出组件", tooltip: "将Common/Prefabs/LogoutView拖放到此处" })
    ], OtherConfig.prototype, "logoutView", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "原生广告条组件，将Common/Prefabs/NativeBanner拖到此处", displayName: "原生广告条组件" })
    ], OtherConfig.prototype, "nativeBanner", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "原生插屏组件，将Common/Prefabs/NativeInsert拖到此处", displayName: "原生插屏组件" })
    ], OtherConfig.prototype, "nativeInsert", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "原生插屏组件，将Common/Prefabs/nativeSplashView拖到此处", displayName: "原生开屏组件" })
    ], OtherConfig.prototype, "nativeSplashView", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "底部推荐游戏广告Banner, 将Common/Prefabs/RecommendGamesBanner拖到此处" })
    ], OtherConfig.prototype, "recommendGamesBanner", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "推荐游戏横条，将Common/Prefabs/RecommendGamesBar拖到此处" })
    ], OtherConfig.prototype, "recommendGamesBar", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "推荐游戏圆形挂件，将Common/Prefabs/TryGamesWidget拖到此处" })
    ], OtherConfig.prototype, "tryGamesWidget", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "侧边更多游戏面板挂件，将Common/Prefabs/MoreGamesWidget拖到此处" })
    ], OtherConfig.prototype, "moreGamesWidget", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "录屏按钮组件，将Common/Prefabs/RecordWidget拖到此处" })
    ], OtherConfig.prototype, "recordWidget", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "快捷方式按钮，将Common/Prefabs/ShortcutWidget拖到此处 " })
    ], OtherConfig.prototype, "shortcutWidget", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "6元素交叉推广组件，将Common/Prefabs/CrossWidget6拖到此处" })
    ], OtherConfig.prototype, "crossWidget6", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "结算页面推广组件，将Common/Prefabs/StatementRecomment拖到此处" })
    ], OtherConfig.prototype, "statementRecomment", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "单个原生广告，将Common/Prefabs/SingleNativeAd拖到此处" })
    ], OtherConfig.prototype, "singleNativeAd", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "分享录屏弹窗，将Common/Prefabs/ShareRecordPanel拖到此处" })
    ], OtherConfig.prototype, "shareRecordPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "五倍奖励宝箱弹窗，将Common/Prefabs/RewardBoxPanel拖到此处" })
    ], OtherConfig.prototype, "rewardBoxPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "奖励转盘抽奖弹窗，将Common/Prefabs/RewardTurntablePanel拖到此处" })
    ], OtherConfig.prototype, "rewardTurnTablePanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "添加桌面激励弹窗，将Common/Prefabs/RewardShortCutPanel拖到此处" })
    ], OtherConfig.prototype, "rewardShortCutPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "原生抖动试玩，将Common/Prefabs/NativeTryGameWidget拖到此处", displayName: "原生抖动组件" })
    ], OtherConfig.prototype, "nativeTryGameWidget", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "结算前互推面板，将Common/Prefabs/BeforGameOverRecGamesPanel拖到此处", displayName: "结算前互推面板" })
    ], OtherConfig.prototype, "beforGameOverRecGamesPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "幸运宝箱弹窗，将Common/Prefabs/RewardLuckBoxPanel拖到此处", displayName: "幸运宝箱弹窗" })
    ], OtherConfig.prototype, "rewardLuckBoxPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "竖状互推窗口，将Common/Prefabs/VerticalRecommentPanel拖到此处", displayName: "竖状互推窗口" })
    ], OtherConfig.prototype, "verticalRecommentPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "隐私协议挂件，将Common/Prefabs/PrivacyWidget拖到此处", displayName: "隐私协议挂件" })
    ], OtherConfig.prototype, "privacyWidget", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "隐私协议弹窗，将Common/Prefabs/PrivacyPanel拖到此处", displayName: "隐私协议弹窗" })
    ], OtherConfig.prototype, "privacyPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "指引的手势，将Common/Prefabs/HandPrefab拖到此处", displayName: "指引的手势" })
    ], OtherConfig.prototype, "handPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "实名制认证弹窗，将Common/Prefabs/YzRealNameAuthPanel拖到此处", displayName: "实名制认证弹窗" })
    ], OtherConfig.prototype, "yzRealNameAuthPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "模版广告推荐弹窗，将Common/Prefabs/YzCustomAdPanel拖到此处", displayName: "模版广告推荐弹窗" })
    ], OtherConfig.prototype, "yzCustomAdPanel", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "登录弹窗，将Common/Prefabs/YzLoginPanel拖到此处", displayName: "登录弹窗" })
    ], OtherConfig.prototype, "yzLoginPanel", void 0);
    OtherConfig = __decorate([
        ccclass("OtherConfig")
    ], OtherConfig);
    return OtherConfig;
}());
exports.OtherConfig = OtherConfig;
var CommonConfig = /** @class */ (function () {
    function CommonConfig() {
        this.wechatconfig = new WechatConfig();
        this.oppoconfig = new OppoConfig();
        this.vivoconfig = new VivoConfig();
        this.nativeAndroidConfig = new NativeAndroidConfig();
        this.baiduconfig = new BaiduConfig();
        this.douyinconfig = new DouyinConfig();
        this.wifiConfig = new WiFiConfig();
        this.qqconfig = new QQConfig();
        this.qttconfig = new QTTConfig();
        this.xiaomiConfig = new XiaoMiConfig();
        this.ucConfig = new UCConfig();
        this.cocosConfig = new CocosConfig();
        this.biliConfig = new BiliConfig();
        this.kwaiConfig = new KwaiConfig();
        this.nativeIoSConfig = new NativeIosConfig();
        this.hagoConfig = new HagoConfig();
        this.huaweiConfig = new HuaWeiConfig();
        this.faceBookConfig = new FaceBookConfig();
        this.otherconfig = new OtherConfig();
    }
    CommonConfig.prototype.init = function (data) {
        this._init_other(data);
        if (PlatUtils_1.default.IsWechat) {
            return this._init_wechat(data);
        }
        else if (PlatUtils_1.default.IsOPPO) {
            return this._init_oppo(data);
        }
        else if (PlatUtils_1.default.IsVIVO) {
            return this._init_vivo(data);
        }
        else if (PlatUtils_1.default.IsDouyin) {
            return this._init_douyin(data);
        }
        else if (PlatUtils_1.default.IsQQ) {
            return this._init_qq(data);
        }
        else if (PlatUtils_1.default.IsBaidu) {
            return this._init_baidu(data);
        }
        else if (PlatUtils_1.default.IsQTT) {
            return this._init_qtt(data);
        }
        else if (PlatUtils_1.default.IsXiaoMi) {
            return this._init_xiaomi(data);
        }
        else if (PlatUtils_1.default.ISUC) {
            return this._init_uc(data);
        }
        else if (PlatUtils_1.default.ISCocos) {
            return this._init_cocos(data);
        }
        else if (PlatUtils_1.default.IsNativeAndroid) {
            return this._init_native_android();
            ;
        }
        else if (PlatUtils_1.default.IsNativeIOS) {
            return this._init_native_ios(data);
            ;
        }
        else if (PlatUtils_1.default.IsBili) {
            return this._init_bili(data);
            ;
        }
        else if (PlatUtils_1.default.IsKwai) {
            return this._init_kwai(data);
            ;
        }
        else if (PlatUtils_1.default.IsWiFi) {
            return this._init_wifi(data);
            ;
        }
        else if (PlatUtils_1.default.IsHago) {
            return this._init_hago(data);
            ;
        }
        else if (PlatUtils_1.default.IsHuaWei) {
            return this._init_huawei(data);
            ;
        }
        else if (PlatUtils_1.default.IsFaceBook) {
            return this._init_facebook(data);
            ;
        }
        else {
            return true;
        }
    };
    CommonConfig.prototype._init_other = function (data) {
        if (!data)
            return false;
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.other) {
                if (configObj.other.yw_app_id) {
                    this.otherconfig.yw_app_id = configObj.other.yw_app_id;
                }
                else {
                    Utils_1.utils.showLog("warn:" + "本地配置数据不包含‘yw_app_id’字段！");
                }
            }
        }
    };
    CommonConfig.prototype._init_wechat = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.wechat) {
                if (configObj.wechat.app_id) {
                    this.wechatconfig.appID = configObj.wechat.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.wechat.intersititia_pos_id) {
                    this.wechatconfig.insertId = configObj.wechat.intersititia_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.wechat.video_pos_id) {
                    this.wechatconfig.videoId = configObj.wechat.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.wechat.app_box_pos_id) {
                    this.wechatconfig.appBoxId = configObj.wechat.app_box_pos_id;
                }
                else {
                    Utils_1.utils.showLog("本地配置数据不包含‘app_box_pos_id’字段！");
                    // return false;
                }
                if (configObj.wechat.version) {
                    this.wechatconfig.version = configObj.wechat.version;
                }
                else {
                    Utils_1.utils.showLog("本地配置数据不包含‘version’字段！");
                }
                if (configObj.wechat.is_attributed) {
                    this.wechatconfig.isAttributed = configObj.wechat.is_attributed;
                }
                if (configObj.wechat.banner_pos_id) {
                    for (var key in configObj.wechat.banner_pos_id) {
                        var bannerInfo = new BannerIdInfo();
                        bannerInfo.location = this._bannerLocationStringToEnum(key);
                        bannerInfo.bannerId = configObj.wechat.banner_pos_id[key];
                        this.wechatconfig.bannerIds.push(bannerInfo);
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.wechat.shares) {
                    if (configObj.wechat.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.wechat.shares.sy_title;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.wechat.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.wechat.shares.sy_img;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
                if (configObj.wechat.banner_box_pos_id) {
                    this.wechatconfig.bannerBoxId = configObj.wechat.banner_box_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置中不包含 ‘banner_box_pos_id’ 字段");
                }
                if (configObj.wechat.native_banner_pos_id) {
                    this.wechatconfig.nativeBannerId = configObj.wechat.native_banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置中不包含 native_banner_pos_id 字段");
                }
                if (configObj.wechat.native_intersititial_pos_id) {
                    this.wechatconfig.nativeInsertIds = configObj.wechat.native_intersititial_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置中不包含 native_intersititial_pos_id 字段");
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘wechat’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    CommonConfig.prototype._init_oppo = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.oppo) {
                if (configObj.oppo.app_id) {
                    this.oppoconfig.appID = configObj.oppo.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.oppo.package_name) {
                    this.oppoconfig.packageName = configObj.oppo.package_name;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘package_name’字段！");
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
                }
                else {
                    Utils_1.utils.showLog("error" + "rec_game_drawer_id");
                }
                // if (configObj.oppo.intersititia_pos_id) {
                //     this.oppoconfig.insertId = configObj.oppo.intersititia_pos_id;
                // } else {
                //     utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                //     // return false;
                // }
                if (configObj.oppo.video_pos_id) {
                    this.oppoconfig.videoId = configObj.oppo.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
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
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
                    // return false;
                }
                if (configObj.oppo.intersitial_configs) {
                    this.oppoconfig.intersitialAdConfigs = configObj.oppo.intersitial_configs;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersitial_configs’字段！");
                    return false;
                }
                if (configObj.oppo.banner_configs) {
                    this.oppoconfig.bannerAdConfigs = configObj.oppo.banner_configs;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_configs’字段！");
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
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_single_pos_id’字段！");
                    return false;
                }
                if (configObj.oppo.rec_portal_id) {
                    this.oppoconfig.recPortalId = configObj.oppo.rec_portal_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘rec_portal_id’字段！");
                }
                if (configObj.oppo.rec_game_banner_id) {
                    this.oppoconfig.recGameBannerId = configObj.oppo.rec_game_banner_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘rec_game_banner_id’字段！");
                }
                if (configObj.oppo.version) {
                    //@ts-ignore
                    if (window.new_version) {
                        //@ts-ignore
                        this.oppoconfig.version = window.new_version;
                        Utils_1.utils.showLog("获取到注入的版本号：" + this.oppoconfig.version);
                    }
                    else {
                        this.oppoconfig.version = configObj.oppo.version;
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.oppo.umeng_id) {
                    this.oppoconfig.umengId = configObj.oppo.umeng_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘umeng_id’字段！");
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘oppo’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    CommonConfig.prototype._init_vivo = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.vivo) {
                if (configObj.vivo.app_id) {
                    this.vivoconfig.appID = configObj.vivo.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.vivo.intersititia_pos_id) {
                    this.vivoconfig.insertId = configObj.vivo.intersititia_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.video_pos_id) {
                    this.vivoconfig.videoId = configObj.vivo.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.banner_pos_id) {
                    this.vivoconfig.bannerId = configObj.vivo.banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.native_banner_pos_id) {
                    this.vivoconfig.nativeBannerIds = configObj.vivo.native_banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.native_trygame_pos_id) {
                    this.vivoconfig.nativeTryGameIds = configObj.vivo.native_trygame_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
                    // return false;
                }
                if (configObj.vivo.native_intersititial_pos_id) {
                    this.vivoconfig.nativeInsertIds = configObj.vivo.native_intersititial_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
                    return false;
                }
                if (configObj.vivo.rec_portal_id) {
                    this.vivoconfig.recPortalId = configObj.vivo.rec_portal_id;
                }
                else {
                    Utils_1.utils.showLog("warn" + "本地配置数据不包含‘rec_portal_id’字段！");
                }
                if (configObj.vivo.rec_game_banner_id) {
                    this.vivoconfig.recGameBannerId = configObj.vivo.rec_game_banner_id;
                }
                else {
                    Utils_1.utils.showLog("warn" + "本地配置数据不包含‘rec_game_banner_id’字段！");
                }
                if (configObj.vivo.native_single_pos_id) {
                    this.vivoconfig.nativeSingleAdIds = configObj.vivo.native_single_pos_id;
                }
                else {
                    Utils_1.utils.showLog("warn" + "本地配置数据不包含‘native_single_pos_id’字段！");
                }
                if (configObj.vivo.umeng_id) {
                    this.vivoconfig.umengId = configObj.vivo.umeng_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘umeng_id’字段,不启用友盟统计！");
                }
                if (configObj.vivo.version) {
                    this.vivoconfig.version = configObj.vivo.version;
                }
                else {
                    Utils_1.utils.showLog("warn:" + "本地配置数据不包含‘version’字段！");
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘vivo’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    CommonConfig.prototype._init_baidu = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.baidu) {
                if (configObj.baidu.app_id) {
                    this.baiduconfig.appID = configObj.baidu.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.baidu.app_sid) {
                    this.baiduconfig.appSID = configObj.baidu.app_sid;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_sid’字段！");
                }
                if (configObj.baidu.video_pos_id) {
                    this.baiduconfig.videoId = configObj.baidu.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.baidu.banner_pos_id) {
                    this.baiduconfig.bannerId = configObj.baidu.banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.baidu.version) {
                    this.baiduconfig.version = configObj.baidu.version;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.baidu.shares) {
                    if (configObj.baidu.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.baidu.shares.sy_title;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                        return false;
                    }
                    if (configObj.baidu.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.baidu.shares.sy_img;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                        return false;
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘baidu’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    CommonConfig.prototype._init_wifi = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.wifi) {
                if (configObj.wifi.app_id) {
                    this.wifiConfig.appID = configObj.wifi.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.wifi.version) {
                    this.wifiConfig.version = configObj.wifi.version;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘baidu’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    CommonConfig.prototype._init_douyin = function (data) {
        if (!data)
            return false;
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.toutiao) {
                if (configObj.toutiao.app_id) {
                    this.douyinconfig.appID = configObj.toutiao.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.toutiao.banner_pos_id) {
                    this.douyinconfig.bannerId = configObj.toutiao.banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.toutiao.video_pos_id) {
                    this.douyinconfig.videoId = configObj.toutiao.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.toutiao.intersititia_pos_id) {
                    this.douyinconfig.insertId = configObj.toutiao.intersititia_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.toutiao.version) {
                    this.douyinconfig.version = configObj.toutiao.version;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.toutiao.shares) {
                    if (configObj.toutiao.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.toutiao.shares.sy_title;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                        return false;
                    }
                    if (configObj.toutiao.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.toutiao.shares.sy_img;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                        return false;
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            }
        }
        else {
            Utils_1.utils.showLog("warn:" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    CommonConfig.prototype._init_qq = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.qq) {
                if (configObj.qq.app_id) {
                    this.qqconfig.appID = configObj.qq.app_id;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.qq.video_pos_id) {
                    this.qqconfig.videoId = configObj.qq.video_pos_id;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.banner_pos_id) {
                    this.qqconfig.bannerId = configObj.qq.banner_pos_id;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.intersititia_pos_id) {
                    this.qqconfig.insertId = configObj.qq.intersititia_pos_id;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.box_pos_id) {
                    this.qqconfig.boxId = configObj.qq.box_pos_id;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘box_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.banner_box_pos_id) {
                    this.qqconfig.bannerBoxId = configObj.qq.banner_box_pos_id;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘banner_box_pos_id’字段！");
                    return false;
                }
                if (configObj.qq.shares) {
                    if (configObj.qq.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.qq.shares.sy_title;
                    }
                    else {
                        Utils_1.utils.showMsg("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.qq.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.qq.shares.sy_img;
                    }
                    else {
                        Utils_1.utils.showMsg("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
                if (configObj.qq.version) {
                    this.qqconfig.version = configObj.qq.version;
                }
                else {
                    Utils_1.utils.showMsg("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showMsg("error" + "本地配置数据不包含‘qq’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showMsg("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
     * 初始化趣头条
     * 这里只输出配置不做任何处理
     * @param data 数据
     */
    CommonConfig.prototype._init_qtt = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.qutoutiao) {
                if (configObj.qutoutiao.app_id) {
                    this.qttconfig.appID = configObj.qutoutiao.app_id;
                    Utils_1.utils.showLog("this.qttconfig.appID:", this.qttconfig.appID);
                    Utils_1.utils.showLog("configObj.qutoutiao.app_id:", configObj.qutoutiao.app_id);
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.qutoutiao.app_key) {
                    this.qttconfig.appKey = configObj.qutoutiao.app_key;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_key’字段！");
                    return false;
                }
                if (configObj.qutoutiao.game_name) {
                    this.qttconfig.gamename = configObj.qutoutiao.game_name;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_key’字段！");
                    return false;
                }
            }
        }
        return true;
    };
    CommonConfig.prototype._bannerLocationStringToEnum = function (str) {
        switch (str) {
            case "home": {
                return YZ_Constant_1.BannerLocation.Home;
            }
            case "game": {
                return YZ_Constant_1.BannerLocation.Game;
            }
            case "level": {
                return YZ_Constant_1.BannerLocation.Level;
            }
            case "skin": {
                return YZ_Constant_1.BannerLocation.Skin;
            }
            case "pause": {
                return YZ_Constant_1.BannerLocation.Pause;
            }
            case "over": {
                return YZ_Constant_1.BannerLocation.Over;
            }
            default:
                return YZ_Constant_1.BannerLocation.None;
        }
    };
    /**
     * 初始化小米
     * @param data 配置
     */
    CommonConfig.prototype._init_xiaomi = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.xiaomi) {
                if (configObj.xiaomi.app_id) {
                    this.xiaomiConfig.appID = configObj.xiaomi.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.intersititia_pos_id) {
                    this.xiaomiConfig.insertId = configObj.xiaomi.intersititia_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.video_pos_id) {
                    this.xiaomiConfig.videoId = configObj.xiaomi.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.banner_pos_id) {
                    this.xiaomiConfig.bannerId = configObj.xiaomi.banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.native_banner_pos_id) {
                    this.xiaomiConfig.nativeBannerIds = configObj.xiaomi.native_banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
                    return false;
                }
                if (configObj.xiaomi.native_trygame_pos_id) {
                    this.xiaomiConfig.nativeTryGameIds = configObj.xiaomi.native_trygame_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
                    // return false;
                }
                if (configObj.xiaomi.native_intersititial_pos_id) {
                    this.xiaomiConfig.nativeInsertIds = configObj.xiaomi.native_intersititial_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘xiaomi’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
     * 初始化uc
     * @param data 配置
     */
    CommonConfig.prototype._init_uc = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.uc) {
                if (configObj.uc.app_id) {
                    this.ucConfig.appID = configObj.uc.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.uc.version) {
                    this.ucConfig.version = configObj.uc.version;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                    return false;
                }
                if (configObj.uc.shares) {
                    if (configObj.uc.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.uc.shares.sy_title;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.uc.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.uc.shares.sy_img;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘uc’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
     * 初始化uc
     * @param data 配置
     */
    CommonConfig.prototype._init_cocos = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.cocos) {
                if (configObj.cocos.app_id) {
                    this.cocosConfig.appID = configObj.cocos.app_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                    return false;
                }
                if (configObj.cocos.video_pos_id) {
                    this.cocosConfig.videoId = configObj.cocos.video_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                    return false;
                }
                if (configObj.cocos.banner_pos_id) {
                    this.cocosConfig.bannerId = configObj.cocos.banner_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                    return false;
                }
                if (configObj.cocos.intersititia_pos_id) {
                    this.cocosConfig.insertId = configObj.cocos.intersititia_pos_id;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                    return false;
                }
                if (configObj.cocos.shares) {
                    if (configObj.cocos.shares.sy_title) {
                        this.otherconfig.shareTitle = configObj.cocos.shares.sy_title;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.shareTitle’字段！");
                        return false;
                    }
                    if (configObj.cocos.shares.sy_img) {
                        this.otherconfig.shareImgUrl = configObj.cocos.shares.sy_img;
                    }
                    else {
                        Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.shareImgUrl’字段！");
                        return false;
                    }
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘cocos’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
   * 初始化原生安卓平台
   * @param data 配置
   */
    CommonConfig.prototype._init_native_android = function () {
        if (!Utils_1.utils.Tool_Native) {
            return false;
        }
        var data = Utils_1.utils.Tool_Native.getNativeData();
        Utils_1.utils.showLog("原生安卓平台本地配置数据:", data);
        if (!data) {
            Utils_1.utils.showLog("error : 安卓本地配置数据配置错误！");
            return false;
        }
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.app_id) {
                this.nativeAndroidConfig.appID = configObj.app_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.version) {
                this.nativeAndroidConfig.version = configObj.version;
            }
            else {
                Utils_1.utils.showMsg("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
            if (configObj.channel) {
                this.nativeAndroidConfig.channel = configObj.channel;
                Utils_1.utils.showLog("原生平台渠道号 channel=" + configObj.channel);
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
     * 初始化原生IOS
     */
    CommonConfig.prototype._init_native_ios = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.ios.app_id) {
                this.nativeIoSConfig.appID = configObj.ios.app_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.ios.video_pos_id) {
                this.nativeIoSConfig.videoId = configObj.ios.video_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.ios.version) {
                this.nativeIoSConfig.version = configObj.ios.version;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
            if (configObj.ios.banner_pos_id) {
                this.nativeIoSConfig.bannerId = configObj.ios.banner_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                return false;
            }
            if (configObj.ios.intersititia_pos_id) {
                this.nativeIoSConfig.insertId = configObj.ios.intersititia_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
   * 初始化bili
   * @param data 配置
   */
    CommonConfig.prototype._init_bili = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.bili.shares.sy_title) {
                this.otherconfig.shareTitle = configObj.bili.shares.sy_title;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                return false;
            }
            if (configObj.bili.shares.sy_img) {
                this.otherconfig.shareImgUrl = configObj.bili.shares.sy_img;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
   * 初始化快手
   * @param data 配置
   */
    CommonConfig.prototype._init_kwai = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.kwai.app_id) {
                this.kwaiConfig.appID = configObj.kwai.app_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.kwai.video_pos_id) {
                this.kwaiConfig.videoId = configObj.kwai.video_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.kwai.intersititia_pos_id) {
                this.kwaiConfig.insertId = configObj.kwai.intersititia_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
            }
            if (configObj.kwai.version) {
                this.kwaiConfig.version = configObj.kwai.version;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
            if (configObj.kwai.shares) {
                if (configObj.kwai.shares.sy_title) {
                    this.otherconfig.shareTitle = configObj.kwai.shares.sy_title;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_title’字段！");
                    return false;
                }
                if (configObj.kwai.shares.sy_img) {
                    this.otherconfig.shareImgUrl = configObj.kwai.shares.sy_img;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_img’字段！");
                    return false;
                }
                if (configObj.kwai.shares.sy_icon) {
                    this.otherconfig.shareIcon = configObj.kwai.shares.sy_icon;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_icon");
                    return false;
                }
                if (configObj.kwai.shares.sy_desc) {
                    this.otherconfig.shareDesc = configObj.kwai.shares.sy_desc;
                }
                else {
                    Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares.sy_desc’字段！");
                    return false;
                }
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘shares’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
     * 初始化facebook
     * @param data 配置
     */
    CommonConfig.prototype._init_facebook = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.faceBook.app_id) {
                this.faceBookConfig.appID = configObj.faceBook.app_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.faceBook.video_pos_id) {
                this.faceBookConfig.videoId = configObj.faceBook.video_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.faceBook.intersititia_pos_id) {
                this.faceBookConfig.insertId = configObj.faceBook.intersititia_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘intersititia_pos_id’字段！");
                return false;
            }
            if (configObj.faceBook.banner_pos_id) {
                this.faceBookConfig.bannerId = configObj.faceBook.banner_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                return false;
            }
            if (configObj.faceBook.version) {
                this.faceBookConfig.version = configObj.faceBook.version;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        Utils_1.utils.showLog("success" + "本地配置数据验证完成!");
        return true;
    };
    /**
     * 初始化Hago
     * @param data 配置
     */
    CommonConfig.prototype._init_hago = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.hago.app_id) {
                this.hagoConfig.appID = configObj.hago.app_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.hago.video_pos_id) {
                this.hagoConfig.videoId = configObj.hago.video_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.hago.version) {
                this.hagoConfig.version = configObj.hago.version;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    /**
     * 初始化Huawei
     * @param data 配置
     */
    CommonConfig.prototype._init_huawei = function (data) {
        if (!data)
            return false;
        Utils_1.utils.showLog("本地配置数据:", data);
        var configObj = JSON.parse(data);
        if (configObj) {
            if (configObj.huawei.app_id) {
                this.huaweiConfig.appID = configObj.huawei.app_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘app_id’字段！");
                return false;
            }
            if (configObj.huawei.video_pos_id) {
                this.huaweiConfig.videoId = configObj.huawei.video_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘video_pos_id’字段！");
                return false;
            }
            if (configObj.huawei.banner_pos_id) {
                this.huaweiConfig.bannerId = configObj.huawei.banner_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘banner_pos_id’字段！");
                return false;
            }
            if (configObj.huawei.native_banner_pos_id) {
                this.huaweiConfig.nativeBannerIds = configObj.huawei.native_banner_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_banner_pos_id’字段！");
            }
            if (configObj.huawei.native_intersititial_pos_id) {
                this.huaweiConfig.nativeInsertIds = configObj.huawei.native_intersititial_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_intersititial_pos_id’字段！");
            }
            if (configObj.huawei.native_trygame_pos_id) {
                this.huaweiConfig.nativeTryGameIds = configObj.huawei.native_trygame_pos_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_trygame_pos_id’字段！");
            }
            if (configObj.huawei.native_splash_id) {
                this.huaweiConfig.nativeSplashId = configObj.huawei.native_splash_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘native_splash_id’字段！");
            }
            if (configObj.huawei.umeng_id) {
                this.huaweiConfig.umengId = configObj.huawei.umeng_id;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘umeng_id’字段,不启用友盟统计！");
            }
            if (configObj.huawei.version) {
                this.huaweiConfig.version = configObj.huawei.version;
            }
            else {
                Utils_1.utils.showLog("error" + "本地配置数据不包含‘version’字段！");
                return false;
            }
        }
        else {
            Utils_1.utils.showLog("error" + "本地配置数据不是合法的json数据!");
            return false;
        }
        return true;
    };
    __decorate([
        property({ type: OtherConfig, tooltip: "其他配置", displayName: "其他配置" })
    ], CommonConfig.prototype, "otherconfig", void 0);
    CommonConfig = __decorate([
        ccclass("CommonConfig")
    ], CommonConfig);
    return CommonConfig;
}());
exports.default = CommonConfig;

cc._RF.pop();