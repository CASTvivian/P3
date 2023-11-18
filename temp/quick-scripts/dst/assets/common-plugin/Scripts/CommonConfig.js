
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/CommonConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQ29tbW9uQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0RDtBQUM1RCx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLHFEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFBO1FBRUksYUFBUSxHQUFtQiw0QkFBYyxDQUFDLElBQUksQ0FBQztRQUcvQyxhQUFRLEdBQVcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFKRztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUFjLENBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7a0RBQ25CO0lBRy9DO1FBREMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO2tEQUNiO0lBTGIsWUFBWTtRQUR4QixPQUFPLENBQUMsY0FBYyxDQUFDO09BQ1gsWUFBWSxDQU14QjtJQUFELG1CQUFDO0NBTkQsQUFNQyxJQUFBO0FBTlksb0NBQVk7QUFNeEIsQ0FBQztBQUlGO0lBQUE7UUFDSTs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBbUIsNEJBQWMsQ0FBQyxJQUFJLENBQUM7UUFFL0M7O1dBRUc7UUFDSCxtQkFBYyxHQUFXLE9BQU8sQ0FBQztRQUVqQzs7V0FFRztRQUNILDBCQUFxQixHQUFXLEVBQUUsQ0FBQztRQUNuQzs7V0FFRztRQUNILDJCQUFzQixHQUFXLEdBQUcsQ0FBQztRQUNyQzs7V0FFRztRQUNILHVCQUFrQixHQUFXLEdBQUcsQ0FBQztRQUNqQzs7V0FFRztRQUNILDJCQUFzQixHQUFXLEVBQUUsQ0FBQztRQUVwQzs7V0FFRztRQUNILDBCQUFxQixHQUFHLE1BQU0sQ0FBQztRQUMvQjs7V0FFRztRQUNI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QyxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNILGFBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFDLENBQUM7YUFDN0Q7WUFFRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN4RDtpQkFBTTtnQkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO2FBQU07WUFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXh1Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO3FEQUN6QjtJQXpCNUIsWUFBWTtRQURoQyxPQUFPLENBQUMsY0FBYyxDQUFDO09BQ0gsWUFBWSxDQWt3Q2hDO0lBQUQsbUJBQUM7Q0Fsd0NELEFBa3dDQyxJQUFBO2tCQWx3Q29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgWVpfQ29uc3RhbnQsIHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoXCJCYW5uZXJJZEluZm9cIilcclxuZXhwb3J0IGNsYXNzIEJhbm5lcklkSW5mbyB7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKEJhbm5lckxvY2F0aW9uKSwgZGlzcGxheU5hbWU6IFwi5bm/5ZGK5p2h5L2N572uXCIgfSlcclxuICAgIGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLk5vbmU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5bm/5ZGK5p2hSURcIiB9KVxyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbn07XHJcblxyXG5cclxuQGNjY2xhc3MoXCJOYXRpdmVCYW5uZXJJbmZvXCIpXHJcbmV4cG9ydCBjbGFzcyBOYXRpdmVCYW5uZXJJbmZvIHtcclxuICAgIC8qKlxyXG4gICAgICog5bm/5ZGK5p2h55qE5L2N572uXHJcbiAgICAgKiAgIDE6SG9tZS3pppbpobVcclxuICAgICAqICAgMjpMZXZlbC3pgInlhbNcclxuICAgICAqICAgMzpTa2luLeearuiCpFxyXG4gICAgICogICA0OkdhbWUt5ri45oiPXHJcbiAgICAgKiAgIDU6UGF1c2Ut5pqC5YGcXHJcbiAgICAgKiAgIDY6T3Zlci3nu5PnrpdcclxuICAgICAqL1xyXG4gICAgbG9jYXRpb246IEJhbm5lckxvY2F0aW9uID0gQmFubmVyTG9jYXRpb24uTm9uZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaYvuekuue7k+eul+Wkp2Jhbm5lclxyXG4gICAgICovXHJcbiAgICBzaG93X3N0X2Jhbm5lcjogc3RyaW5nID0gXCJmYWxzZVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6buY6K6k5Y6f55SfYmFubmVy5YWz6Zet5oyJ6ZKu5aSn5bCP77yM6buY6K6k5Li6NjBcclxuICAgICAqL1xyXG4gICAgYmFubmVyX2Nsb3NlX2J1dF9zaXplOiBudW1iZXIgPSA0MDtcclxuICAgIC8qKlxyXG4gICAgICog6buY6K6kYmFubmVy5YWz6Zet5oyJ6ZKu6YCP5piO5bqmIOm7mOiupOS4ujEyMFxyXG4gICAgICovXHJcbiAgICBiYW5uZXJfY2xvc2VfYnV0X2FscGhhOiBudW1iZXIgPSAxMjA7XHJcbiAgICAvKipcclxuICAgICAqIOm7mOiupGJhbm5lcuWFs+mXreaMiemSrumrmOW6piDpu5jorqTkuLoyMjBcclxuICAgICAqL1xyXG4gICAgYmFubmVyX3Nob3dfaGVpZ2h0OiBudW1iZXIgPSAxNjA7XHJcbiAgICAvKipcclxuICAgICAqIOm7mOiupGJhbm5lcuWFs+mXreaMiemSrueCueWHu+WMuuWfn+m7mOiupOS4ujgwXHJcbiAgICAgKi9cclxuICAgIGJhbm5lcl9jbG9zZV9idXRfcmFuZ2U6IG51bWJlciA9IDQwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6buY6K6k5Y6f55SfYmFubmVy5YWz6Zet5oyJ6ZKu77yM5piv5ZCm5pi+56S644CC6buY6K6k5Li65pi+56S677yaXCJ0cnVlXCJcclxuICAgICAqL1xyXG4gICAgYmFubmVyX2Nsb3NlX2J1dF9zaG93ID0gXCJ0cnVlXCI7XHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul+WJjWJhbm5lcuaVtOS9k+e8qeaUvu+8jOm7mOiupOS4ujFcclxuICAgICAqL1xyXG4gICAgc3RfYmFubmVyX3NjYWxlOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X5YmNYmFubmVy5LiL6L295oyJ6ZKu55qE5Zu+54mH5Zyw5Z2AXHJcbiAgICAgKi9cclxuICAgIHN0X2Jhbm5lcl9kb3duX2J0bl9pbWFnZTogc3RyaW5nID0gXCJcIjtcclxuICAgIC8qKlxyXG4gICAgICog57uT566X5YmNYmFubmVy5LiL6L295oyJ6ZKu5pi+56S657G75Z6L77yM6buY6K6k5LiN6YWN572u77yM5YiZ5LiN5pi+56S677yM6YWN572u5ZCO5YiZ5pi+56S677yM5YC85Li6MjrmmL7npLrlvqrnjq/mkq3mlL7mlL7lpKfnvKnlsI/mlYjmnpzvvIxcclxuICAgICAqL1xyXG4gICAgc3RfYmFubmVyX2Rvd25fYnV0X3Nob3c6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul+WJjWJhbm5lcu+8jOS4i+i9veaMiemSrui3neemu+W5v+WRiumhtumDqOmXtOi3ne+8jOm7mOiupOi0tOe0p+W5v+WRiumhtumDqOWAvOaYry0xMTFcclxuICAgICAqL1xyXG4gICAgc3RfYmFubmVyX2Rvd25fYnV0X21hcmdpbl90b3A6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqICDnu5PnrpfliY1iYW5uZXLvvIzlhbPpl63mjInpkq7ngrnlh7vljLrln5/lpKflsI9cclxuICAgICAqL1xyXG4gICAgc3RfYmFubmVyX2Nsb3NlX2J1dF9yYW5nZTogbnVtYmVyID0gNTU7XHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul+WJjWJhbm5lcu+8jOWFs+mXreaMiemSruWbvueJh+Wkp+Wwj1xyXG4gICAgICovXHJcbiAgICBzdF9iYW5uZXJfY2xvc2VfYnV0X3NpemU6IG51bWJlciA9IDU1O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X5YmNYmFubmVy5YWz6Zet5oyJ6ZKu77yM5piv5ZCm5pi+56S644CC6buY6K6k5Li65pi+56S677yaXCJ0cnVlXCJcclxuICAgICAqL1xyXG4gICAgc3RfYmFubmVyX2Nsb3NlX2J1dF9zaG93OiBzdHJpbmcgPSBcInRydWVcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul+WJjWJhbm5lcui3neemu+W6lemDqOeahOi3neemu1xyXG4gICAgICovXHJcbiAgICBzdF9iYW5uZXJfYm90dG9tOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X5YmNYmFubmVy5YWz6Zet5oyJ6ZKu6YCP5piO5bqmXHJcbiAgICAgKiAwLTI1NVxyXG4gICAgICovXHJcbiAgICBzdF9iYW5uZXJfY2xvc2VfYnV0X2FscGhhOiBudW1iZXIgPSAyNTU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBiYW5uZXLngrnlh7vlkI7mmK/kuI3mmK/pnIDopoHliLfmlrDmlbDmja5cclxuICAgICAqL1xyXG4gICAgYmFubmVyX2NsaWNrX3JlZnJlc2g6IHN0cmluZyA9IFwidHJ1ZVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Ieq5Yqo5Yi35paw5pe26Ze077yM5Y2V5L2N77ya56eS77yM6buY6K6k5Li677yaLTEg5LiN5Yi35pawXHJcbiAgICAgKi9cclxuICAgIGF1dG9fcmVmcmVzaDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLflvI9cclxuICAgICAqIC0xIDrpu5jorqTjgIEwOuWNleWbvueJh+e8qeaUvuOAgTE65Y2V5Zu+54mH5ZKM6Ieq5a6a5LmJ5a696auY44CBMjrpu5jorqTmoLflvI/oh6rlrprkuYnlrr3pq5hcclxuICAgICAqL1xyXG4gICAgc3RfYmFubmVyX3N0eWxlOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICog57uT566XYmFubmVy5qC35byPLeWuve+8jOm7mOiupO+8mjgyMSAg5Y2V5L2N77ya5YOP57SgXHJcbiAgICAqL1xyXG4gICAgc3RfYmFubmVyX3dpZHRoOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICog57uT566XYmFubmVy5qC35byPLemrmDrpu5jorqTvvJo1ODkg5Y2V5L2N77ya5YOP57SgXHJcbiAgICAqL1xyXG4gICAgc3RfYmFubmVyX2hlaWdodDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOe7k+eul2Jhbm5lcuaYr+WQpuaYvuekuuWkh+eUqOW5v+WRilxyXG4gICAgKiDpu5jorqTvvJoxIOaYvuekuu+8jC0xIOS4uuS4jeaYvuekulxyXG4gICAgKi9cclxuICAgIHN0X2Jhbm5lcl9zaG93X2JhY2tfdXA6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLpiYW5uZXJcclxuICAgICAqIOm7mOiupO+8mjEg5pi+56S677yMIC0x5Li65LiN5pi+56S677ybXHJcbiAgICAgKi9cclxuICAgIGlzX3Nob3dfYmFubmVyOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8v5pi+56S65LqS5o6oYmFubmVyXHJcbiAgICBpc19zaG93X3JlYzogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLy/lu7bov5/mmL7npLrml7bpl7RcclxuICAgIGRlbGF5X3Nob3dfdGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvL+WFs+mXreaMiemSrumXtOmalOWkmuWwkeasoeinpuWPkeW5v+WRiui3s+i9rFxyXG4gICAgYmFubmVyX2Nsb3NlX3Nob3dBZF9pbnRlcnZhbDogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgLy/mma7pgJrljp/nlJ9CYW5uZXLog4zmma/pgI/mmI7pga7nvanpgI/mmI7luqYg5aSn5LqOMOWImeaYvuekuuW9k+WJjeWAvOeahOmAj+aYjumBrue9qeWxglxyXG4gICAgYmdfbWFza19vcGFjaXR5OiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICAvL+e7k+eul+WOn+eUn2Jhbm5lcuiDjOaZr+mAj+aYjumBrue9qemAj+aYjuW6piDlpKfkuo4w5YiZ5pi+56S65b2T5YmN5YC855qE6YCP5piO6YGu572p5bGCXHJcbiAgICBzdF9iYW5uZXJfYmdfbWFza19vcGFjaXR5OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vIOWvuem9kOaWueW8j++8mmJvdHRvbSB0b3BcclxuICAgIF9hbGlnblR5cGU6IHN0cmluZyA9IFwiYm90dG9tXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDkvY3nva5cclxuICAgICAqIEBwYXJhbSBpbmZvIOmFjee9rlxyXG4gICAgICovXHJcbiAgICBpbml0KGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiwgaW5mbzogYW55KSB7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5iYW5uZXJfY2xvc2VfYnV0X2FscGhhID0gaW5mby5iYW5uZXJfY2xvc2VfYnV0X2FscGhhID8gaW5mby5iYW5uZXJfY2xvc2VfYnV0X2FscGhhIDogdGhpcy5iYW5uZXJfY2xvc2VfYnV0X2FscGhhO1xyXG4gICAgICAgIHRoaXMuYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSA9IGluZm8uYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSA/IGluZm8uYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSA6IHRoaXMuYmFubmVyX2Nsb3NlX2J1dF9yYW5nZTtcclxuICAgICAgICB0aGlzLmJhbm5lcl9jbG9zZV9idXRfc2l6ZSA9IGluZm8uYmFubmVyX2Nsb3NlX2J1dF9zaXplID8gaW5mby5iYW5uZXJfY2xvc2VfYnV0X3NpemUgOiB0aGlzLmJhbm5lcl9jbG9zZV9idXRfc2l6ZTtcclxuICAgICAgICB0aGlzLmJhbm5lcl9zaG93X2hlaWdodCA9IGluZm8uYmFubmVyX3Nob3dfaGVpZ2h0ID8gaW5mby5iYW5uZXJfc2hvd19oZWlnaHQgOiB0aGlzLmJhbm5lcl9zaG93X2hlaWdodDtcclxuICAgICAgICB0aGlzLmJhbm5lcl9jbG9zZV9idXRfc2hvdyA9IGluZm8uYmFubmVyX2Nsb3NlX2J1dF9zaG93ID8gaW5mby5iYW5uZXJfY2xvc2VfYnV0X3Nob3cgOiB0aGlzLmJhbm5lcl9jbG9zZV9idXRfc2hvdztcclxuICAgICAgICB0aGlzLmJnX21hc2tfb3BhY2l0eSA9IGluZm8uYmdfbWFza19vcGFjaXR5ID8gaW5mby5iZ19tYXNrX29wYWNpdHkgOiB0aGlzLmJnX21hc2tfb3BhY2l0eTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2UgPSBpbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2UgPyBpbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2UgOiB0aGlzLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2U7XHJcbiAgICAgICAgdGhpcy5zdF9iYW5uZXJfY2xvc2VfYnV0X3NpemUgPSBpbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfc2l6ZSA/IGluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9zaXplIDogdGhpcy5zdF9iYW5uZXJfY2xvc2VfYnV0X3NpemU7XHJcbiAgICAgICAgdGhpcy5zdF9iYW5uZXJfZG93bl9idG5faW1hZ2UgPSBpbmZvLnN0X2Jhbm5lcl9kb3duX2J0bl9pbWFnZSA/IGluZm8uc3RfYmFubmVyX2Rvd25fYnRuX2ltYWdlIDogdGhpcy5zdF9iYW5uZXJfZG93bl9idG5faW1hZ2U7XHJcbiAgICAgICAgdGhpcy5zdF9iYW5uZXJfZG93bl9idXRfbWFyZ2luX3RvcCA9IGluZm8uc3RfYmFubmVyX2Rvd25fYnV0X21hcmdpbl90b3AgPyBpbmZvLnN0X2Jhbm5lcl9kb3duX2J1dF9tYXJnaW5fdG9wIDogdGhpcy5zdF9iYW5uZXJfZG93bl9idXRfbWFyZ2luX3RvcDtcclxuICAgICAgICB0aGlzLnN0X2Jhbm5lcl9kb3duX2J1dF9zaG93ID0gaW5mby5zdF9iYW5uZXJfZG93bl9idXRfc2hvdyA/IGluZm8uc3RfYmFubmVyX2Rvd25fYnV0X3Nob3cgOiB0aGlzLnN0X2Jhbm5lcl9kb3duX2J1dF9zaG93O1xyXG4gICAgICAgIHRoaXMuc3RfYmFubmVyX3NjYWxlID0gaW5mby5zdF9iYW5uZXJfc2NhbGUgPyBpbmZvLnN0X2Jhbm5lcl9zY2FsZSA6IHRoaXMuc3RfYmFubmVyX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuc2hvd19zdF9iYW5uZXIgPSBpbmZvLnNob3dfc3RfYmFubmVyID8gaW5mby5zaG93X3N0X2Jhbm5lciA6IHRoaXMuc2hvd19zdF9iYW5uZXI7XHJcbiAgICAgICAgdGhpcy5zdF9iYW5uZXJfY2xvc2VfYnV0X3Nob3cgPSBpbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfc2hvdyA/IGluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9zaG93IDogdGhpcy5zdF9iYW5uZXJfY2xvc2VfYnV0X3Nob3c7XHJcbiAgICAgICAgdGhpcy5zdF9iYW5uZXJfYm90dG9tID0gaW5mby5zdF9iYW5uZXJfYm90dG9tID8gaW5mby5zdF9iYW5uZXJfYm90dG9tIDogdGhpcy5zdF9iYW5uZXJfYm90dG9tO1xyXG4gICAgICAgIHRoaXMuc3RfYmFubmVyX2Nsb3NlX2J1dF9hbHBoYSA9IGluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9hbHBoYSA/IGluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9hbHBoYSA6IHRoaXMuc3RfYmFubmVyX2Nsb3NlX2J1dF9hbHBoYTtcclxuICAgICAgICB0aGlzLmJhbm5lcl9jbGlja19yZWZyZXNoID0gaW5mby5iYW5uZXJfY2xpY2tfcmVmcmVzaCA/IGluZm8uYmFubmVyX2NsaWNrX3JlZnJlc2ggOiB0aGlzLmJhbm5lcl9jbGlja19yZWZyZXNoO1xyXG4gICAgICAgIHRoaXMuYXV0b19yZWZyZXNoID0gaW5mby5hdXRvX3JlZnJlc2ggPyBpbmZvLmF1dG9fcmVmcmVzaCA6IHRoaXMuYXV0b19yZWZyZXNoO1xyXG4gICAgICAgIHRoaXMuc3RfYmFubmVyX3N0eWxlID0gaW5mby5zdF9iYW5uZXJfc3R5bGUgPyBpbmZvLnN0X2Jhbm5lcl9zdHlsZSA6IHRoaXMuc3RfYmFubmVyX3N0eWxlO1xyXG4gICAgICAgIHRoaXMuc3RfYmFubmVyX3dpZHRoID0gaW5mby5zdF9iYW5uZXJfd2lkdGggPyBpbmZvLnN0X2Jhbm5lcl93aWR0aCA6IHRoaXMuc3RfYmFubmVyX3dpZHRoO1xyXG4gICAgICAgIHRoaXMuc3RfYmFubmVyX2hlaWdodCA9IGluZm8uc3RfYmFubmVyX2hlaWdodCA/IGluZm8uc3RfYmFubmVyX2hlaWdodCA6IHRoaXMuc3RfYmFubmVyX2hlaWdodDtcclxuICAgICAgICB0aGlzLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgPSBpbmZvLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgPyBpbmZvLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXAgOiB0aGlzLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXA7XHJcbiAgICAgICAgdGhpcy5pc19zaG93X2Jhbm5lciA9IGluZm8uaXNfc2hvd19iYW5uZXIgPyBpbmZvLmlzX3Nob3dfYmFubmVyIDogdGhpcy5pc19zaG93X2Jhbm5lcjtcclxuICAgICAgICB0aGlzLmlzX3Nob3dfcmVjID0gaW5mby5pc19zaG93X3JlYyA/IGluZm8uaXNfc2hvd19yZWMgOiB0aGlzLmlzX3Nob3dfcmVjO1xyXG4gICAgICAgIHRoaXMuZGVsYXlfc2hvd190aW1lID0gaW5mby5kZWxheV9zaG93X3RpbWUgPyBpbmZvLmRlbGF5X3Nob3dfdGltZSA6IHRoaXMuZGVsYXlfc2hvd190aW1lO1xyXG4gICAgICAgIHRoaXMuc3RfYmFubmVyX2JnX21hc2tfb3BhY2l0eSA9IGluZm8uc3RfYmFubmVyX2JnX21hc2tfb3BhY2l0eSA/IGluZm8uc3RfYmFubmVyX2JnX21hc2tfb3BhY2l0eSA6IHRoaXMuc3RfYmFubmVyX2JnX21hc2tfb3BhY2l0eTtcclxuICAgICAgICB0aGlzLl9hbGlnblR5cGUgPSBpbmZvLmFsaWduX3R5cGUgPyBpbmZvLmFsaWduX3R5cGUgOiB0aGlzLl9hbGlnblR5cGU7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJfY2xvc2Vfc2hvd0FkX2ludGVydmFsID0gaW5mby5iYW5uZXJfY2xvc2Vfc2hvd0FkX2ludGVydmFsID8gaW5mby5iYW5uZXJfY2xvc2Vfc2hvd0FkX2ludGVydmFsIDogdGhpcy5iYW5uZXJfY2xvc2Vfc2hvd0FkX2ludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3Ryb25nKCkge1xyXG4gICAgICAgIHJldHVybiBgbG9jYXRpb249JHt0aGlzLmxvY2F0aW9ufSZpc19zaG93X2Jhbm5lcj0ke3RoaXMuaXNfc2hvd19iYW5uZXJ9JmJhbm5lcl9jbG9zZV9idXRfc2hvdz0ke3RoaXMuYmFubmVyX2Nsb3NlX2J1dF9zaG93fSZiYW5uZXJfY2xvc2VfYnV0X2FscGhhPSR7dGhpcy5iYW5uZXJfY2xvc2VfYnV0X2FscGhhfSZiYW5uZXJfY2xvc2VfYnV0X3JhbmdlPSR7dGhpcy5iYW5uZXJfY2xvc2VfYnV0X3JhbmdlfSZiYW5uZXJfY2xvc2VfYnV0X3NpemU9JHt0aGlzLmJhbm5lcl9jbG9zZV9idXRfc2l6ZX0mYmFubmVyX3Nob3dfaGVpZ2h0PSR7dGhpcy5iYW5uZXJfc2hvd19oZWlnaHR9JnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2U9JHt0aGlzLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2V9JnN0X2Jhbm5lcl9jbG9zZV9idXRfc2l6ZT0ke3RoaXMuc3RfYmFubmVyX2Nsb3NlX2J1dF9zaXplfSZzdF9iYW5uZXJfZG93bl9idG5faW1hZ2U9JHt0aGlzLnN0X2Jhbm5lcl9kb3duX2J0bl9pbWFnZX0mc3RfYmFubmVyX2Rvd25fYnV0X21hcmdpbl90b3A9JHt0aGlzLnN0X2Jhbm5lcl9kb3duX2J1dF9tYXJnaW5fdG9wfSZzdF9iYW5uZXJfZG93bl9idXRfc2hvdz0ke3RoaXMuc3RfYmFubmVyX2Rvd25fYnV0X3Nob3d9JnN0X2Jhbm5lcl9zY2FsZT0ke3RoaXMuc3RfYmFubmVyX3NjYWxlfSZzaG93X3N0X2Jhbm5lcj0ke3RoaXMuc2hvd19zdF9iYW5uZXJ9JnN0X2Jhbm5lcl9jbG9zZV9idXRfc2hvdz0ke3RoaXMuc3RfYmFubmVyX2Nsb3NlX2J1dF9zaG93fSZzdF9iYW5uZXJfYm90dG9tPSR7dGhpcy5zdF9iYW5uZXJfYm90dG9tfSZzdF9iYW5uZXJfY2xvc2VfYnV0X2FscGhhPSR7dGhpcy5zdF9iYW5uZXJfY2xvc2VfYnV0X2FscGhhfSZiYW5uZXJfY2xpY2tfcmVmcmVzaD0ke3RoaXMuYmFubmVyX2NsaWNrX3JlZnJlc2h9JmF1dG9fcmVmcmVzaD0ke3RoaXMuYXV0b19yZWZyZXNofSZzdF9iYW5uZXJfc3R5bGU9JHt0aGlzLnN0X2Jhbm5lcl9zdHlsZX0mc3RfYmFubmVyX3dpZHRoPSR7dGhpcy5zdF9iYW5uZXJfd2lkdGh9JnN0X2Jhbm5lcl9oZWlnaHQ9JHt0aGlzLnN0X2Jhbm5lcl9oZWlnaHR9JnN0X2Jhbm5lcl9zaG93X2JhY2tfdXA9JHt0aGlzLnN0X2Jhbm5lcl9zaG93X2JhY2tfdXB9JmlzX3Nob3dfcmVjPSR7dGhpcy5pc19zaG93X3JlY31gO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuQGNjY2xhc3MoXCJDdXN0b21BZEluZm9cIilcclxuZXhwb3J0IGNsYXNzIEN1c3RvbUFkSW5mbyB7XHJcbiAgICAvKipcclxuICAgICAqIOW5v+WRiuadoeeahOS9jee9rlxyXG4gICAgICogICAxOkhvbWUt6aaW6aG1XHJcbiAgICAgKiAgIDI6TGV2ZWwt6YCJ5YWzXHJcbiAgICAgKiAgIDM6U2tpbi3nmq7ogqRcclxuICAgICAqICAgNDpHYW1lLea4uOaIj1xyXG4gICAgICogICA1OlBhdXNlLeaaguWBnFxyXG4gICAgICogICA2Ok92ZXIt57uT566XXHJcbiAgICAgKiAgIOWFtuS4remAiemhueayoeacieeahOivne+8jOWPr+S7peiHquWumuS5iVxyXG4gICAgICovXHJcbiAgICBsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBCYW5uZXJMb2NhdGlvbi5Ob25lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pi+56S657uT566X5aSnYmFubmVyXHJcbiAgICAgKi9cclxuICAgIGlzX3Nob3dfYWQ6IHN0cmluZyA9IFwidHJ1ZVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Led56a76aG26YOo55qE6Led56a7XHJcbiAgICAgKi9cclxuICAgIHRvcDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot53nprvlt6bovrnnmoTot53nprtcclxuICAgICAqL1xyXG4gICAgbGVmdDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot53nprvlj7PovrnnmoTot53nprtcclxuICAgICAqL1xyXG4gICAgcmlnaHQ6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Led56a75bqV6YOo55qE6Led56a7XHJcbiAgICAgKi9cclxuICAgIGJvdHRvbTogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlub/lkYpJRFxyXG4gICAgICovXHJcbiAgICBpZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOaXtumXtFxyXG4gICAgICovXHJcbiAgICByZWZyZXNoX3RpbWU6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bm/5ZGK5a695bqmXHJcbiAgICAgKi9cclxuICAgIHdpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiBcclxuICAgICAqIOW5v+WRiumrmOW6plxyXG4gICAgKi9cclxuICAgIGhlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDmmL7npLrmiJDlip/lkI7mmK/lkKbpmpDol49iYW5uZXJcclxuICAgICovXHJcbiAgICBoaWRlX2Jhbm5lcjogc3RyaW5nID0gXCJmYWxzZVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bGF5Lit5pi+56S6XHJcbiAgICAgKiBhYm91dO+8muW3puWPs+WxheS4rVxyXG4gICAgICogdXBkb3duOuS4iuS4i1xyXG4gICAgICogYWxsOuS4iuS4i+WSjOW3puWPs+WxheS4rVxyXG4gICAgICovXHJcbiAgICBpc19jZW50ZXI6IHN0cmluZyA9IFwiZmFsc2VcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUueWPmOS9jee9rueahOaXtuWAmeaYr+WQpuWIt+aWsOW5v+WRilxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VfbG9jYXRpb25fcmVmcmVzaF9hZCA9IFwidHJ1ZVwiO1xyXG5cclxuXHJcbiAgICAvL+W9k+WJjW9iauWvueixoVxyXG4gICAgY3VzdG9tQWRPYmo6IGFueSA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOS9jee9rlxyXG4gICAgICogQHBhcmFtIGluZm8g6YWN572uXHJcbiAgICAgKi9cclxuICAgIGluaXQobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBpbmZvOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy50b3AgPSBcInRvcFwiIGluIGluZm8gPyBpbmZvLnRvcCA6IC0xO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSBcInJpZ2h0XCIgaW4gaW5mbyA/IGluZm8ucmlnaHQgOiAtMTtcclxuICAgICAgICB0aGlzLmxlZnQgPSBcImxlZnRcIiBpbiBpbmZvID8gaW5mby5sZWZ0IDogLTE7XHJcbiAgICAgICAgdGhpcy5ib3R0b20gPSBcImJvdHRvbVwiIGluIGluZm8gPyBpbmZvLmJvdHRvbSA6IC0xO1xyXG4gICAgICAgIHRoaXMuaWQgPSBcImlkXCIgaW4gaW5mbyA/IGluZm8uaWQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaF90aW1lID0gXCJyZWZyZXNoX3RpbWVcIiBpbiBpbmZvID8gaW5mby5yZWZyZXNoX3RpbWUgOiAtMTtcclxuICAgICAgICB0aGlzLmlzX3Nob3dfYWQgPSBcImlzX3Nob3dfYWRcIiBpbiBpbmZvID8gaW5mby5pc19zaG93X2FkIDogXCJ0cnVlXCI7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IFwid2lkdGhcIiBpbiBpbmZvID8gaW5mby53aWR0aCA6IDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBcImhlaWdodFwiIGluIGluZm8gPyBpbmZvLmhlaWdodCA6IDA7XHJcbiAgICAgICAgdGhpcy5oaWRlX2Jhbm5lciA9IFwiaGlkZV9iYW5uZXJcIiBpbiBpbmZvID8gaW5mby5oaWRlX2Jhbm5lciA6IFwiZmFsc2VcIjtcclxuICAgICAgICB0aGlzLmNoYW5nZV9sb2NhdGlvbl9yZWZyZXNoX2FkID0gXCJjaGFuZ2VfbG9jYXRpb25fcmVmcmVzaF9hZFwiIGluIGluZm8gPyBpbmZvLmNoYW5nZV9sb2NhdGlvbl9yZWZyZXNoX2FkIDogXCJmYWxzZVwiO1xyXG5cclxuICAgICAgICB0aGlzLmlzX2NlbnRlciA9IFwiaXNfY2VudGVyXCIgaW4gaW5mbyA/IGluZm8uaXNfY2VudGVyIDogXCJhbGxcIjtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cm9uZygpIHtcclxuICAgICAgICByZXR1cm4gYGN1c3RvbUFkSW5mbz4+Pj4jbG9jYXRpb249JHt0aGlzLmxvY2F0aW9ufSN0b3A9JHt0aGlzLnRvcH0jbGVmdD0ke3RoaXMubGVmdH0jcmlnaHQ9JHt0aGlzLnJpZ2h0fSNib3R0b209JHt0aGlzLmJvdHRvbX0jcmVmcmVzaFRpbWU9JHt0aGlzLnJlZnJlc2hfdGltZX0jaWQ9JHt0aGlzLmlkfSN3aWR0aD0ke3RoaXMud2lkdGh9I2hlaWdodD0ke3RoaXMuaGVpZ2h0fSNpc19jZW50ZXI9JHt0aGlzLmlzX2NlbnRlcn1gO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbkBjY2NsYXNzKFwiV2VjaGF0Q29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBXZWNoYXRDb25maWcge1xyXG5cclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYmFubmVySWRzOiBCYW5uZXJJZEluZm9bXSA9IFtdO1xyXG4gICAgdmlkZW9JZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGluc2VydElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAganVtcElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYXBwQm94SWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBib3hJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGJhbm5lckJveElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgY3VzdG9tQWRJbmZvczogQ3VzdG9tQWRJbmZvW10gPSBbXTtcclxuICAgIGlzQXR0cmlidXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIG5hdGl2ZUJhbm5lcklkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgbmF0aXZlSW5zZXJ0SWRzOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5L2N572u6I635Y+WYmFubmVySWRcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiBCYW5uZXJMb2NhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFubmVySWQobG9jYXRpb246IEJhbm5lckxvY2F0aW9uKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhbm5lcklkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYW5uZXJJZHNbaV0ubG9jYXRpb24gPT0gbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhbm5lcklkc1tpXS5iYW5uZXJJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5iYW5uZXJJZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5iYW5uZXJJZHNbMF0uYmFubmVySWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICog6K6+5a6a5Y6f55Sf5qih54mI6YWN572uXHJcbiAgKiBAcGFyYW0gbG9jYXRpb24g5L2N572uXHJcbiAgKiBAcGFyYW0gYmFubmVySW5mbyDphY3nva5cclxuICAqL1xyXG4gICAgcHVibGljIHNldEN1c3RvbUFkSW5mbyhsb2NhdGlvbiwgY3VzdEluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBuYXRpdmVDdXN0b21BZCA9IG5ldyBDdXN0b21BZEluZm8oKTtcclxuICAgICAgICBuYXRpdmVDdXN0b21BZC5pbml0KGxvY2F0aW9uLCBjdXN0SW5mbyk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21BZEluZm9zLnB1c2gobmF0aXZlQ3VzdG9tQWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5L2N572u6I635Y+W5Y6f55Sf5qih54mI6YWN572uXHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24gQmFubmVyTG9jYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1c3RvbUFkSW5mb0luZm8obG9jYXRpb246IEJhbm5lckxvY2F0aW9uKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuagueaNruS9jee9ruiOt+WPluWOn+eUn+aooeeJiOmFjee9rj4+bG9jYXRpb249XCIsIGxvY2F0aW9uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VzdG9tQWRJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BZEluZm9zW2ldLmxvY2F0aW9uID09IGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qC55o2u5L2N572u6I635Y+W5Y6f55Sf5qih54mI6YWN572uPj5pbmZvPVwiLCB0aGlzLmN1c3RvbUFkSW5mb3NbaV0udG9TdHJvbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21BZEluZm9zW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+5a6aYmFubmVySWRcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiBCYW5uZXJMb2NhdGlvblxyXG4gICAgICogQHBhcmFtIGJhbm5lcklkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QmFubmVySWQobG9jYXRpb246IEJhbm5lckxvY2F0aW9uLCBiYW5uZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhbm5lcklkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYW5uZXJJZHNbaV0ubG9jYXRpb24gPT0gbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVySWRzW2ldLmJhbm5lcklkID0gYmFubmVySWQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5AY2NjbGFzcyhcIlFRQ29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBRUUNvbmZpZyB7XHJcblxyXG4gICAgUVE6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgYXBwSUQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBiYW5uZXJJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGluc2VydElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmlkZW9JZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGJveElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIGJhbm5lckJveElkOiBzdHJpbmcgPSBcIlwiO1xyXG59XHJcblxyXG5AY2NjbGFzcyhcIk9wcG9Db25maWdcIilcclxuZXhwb3J0IGNsYXNzIE9wcG9Db25maWcge1xyXG4gICAgcHVibGljIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGNoYW5uZWw6IHN0cmluZyA9IFwib3Bwb1wiO1xyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZpZGVvSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBuYXRpdmVCYW5uZXJJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBuYXRpdmVUcnlHYW1lSWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgbmF0aXZlSW5zZXJ0SWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgbmF0aXZlU2luZ2xlQWRJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBwYWNrYWdlTmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIG5hdGl2ZUJhbm5lckluZm9zOiBOYXRpdmVCYW5uZXJJbmZvW10gPSBbXTtcclxuICAgIHJlY0dhbWVCYW5uZXJJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHJlY1BvcnRhbElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIHJlY0dhbWVEcmF3ZXJJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHVtZW5nSWQ6IFN0cmluZyA9IFwiXCI7IC8v5Y+L55ufSURcclxuICAgIGludGVyc2l0aWFsQWRDb25maWdzOiBhbnlbXSA9IFtdOyAvL+aPkuWxj0lE6YWN572uXHJcbiAgICBiYW5uZXJBZENvbmZpZ3M6IGFueVtdID0gW107IC8vQmFubmVy6YWN572uXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kvY3nva7ojrflj5bljp/nlJ9iYW5uZXLphY3nva5cclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiBCYW5uZXJMb2NhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TmF0aXZlQmFubmVySW5mbyhsb2NhdGlvbjogQmFubmVyTG9jYXRpb24pIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5qC55o2u5L2N572u6I635Y+W5Y6f55SfYmFubmVy6YWN572uPj5sb2NhdGlvbj1cIiwgbG9jYXRpb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJJbmZvc1tpXS5sb2NhdGlvbiA9PSBsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuagueaNruS9jee9ruiOt+WPluWOn+eUn2Jhbm5lcumFjee9rj4+aW5mbz1cIiwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvc1tpXS50b1N0cm9uZygpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZUJhbm5lckluZm9zW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+5a6a5Y6f55SfYmFubmVy6YWN572uXHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24g5L2N572uXHJcbiAgICAgKiBAcGFyYW0gYmFubmVySW5mbyDphY3nva5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldE5hdGl2ZUJhbm5lckluZm8obG9jYXRpb24sIGJhbm5lckluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBuYXRpdmVCYW5uZXJJbmZvOiBOYXRpdmVCYW5uZXJJbmZvID0gbmV3IE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgICAgICBuYXRpdmVCYW5uZXJJbmZvLmluaXQobG9jYXRpb24sIGJhbm5lckluZm8pO1xyXG4gICAgICAgIHRoaXMubmF0aXZlQmFubmVySW5mb3MucHVzaChuYXRpdmVCYW5uZXJJbmZvKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbkBjY2NsYXNzKFwiVml2b0NvbmZpZ1wiKVxyXG5leHBvcnQgY2xhc3MgVml2b0NvbmZpZyB7XHJcbiAgICBzaG93QWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZpZGVvSWQ6IHN0cmluZyA9IFwiXCJcclxuICAgIG5hdGl2ZVRyeUdhbWVJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBuYXRpdmVCYW5uZXJJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBuYXRpdmVJbnNlcnRJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBuYXRpdmVCYW5uZXJJbmZvczogTmF0aXZlQmFubmVySW5mb1tdID0gW107XHJcbiAgICBjdXN0b21BZEluZm9zOiBDdXN0b21BZEluZm9bXSA9IFtdO1xyXG5cclxuICAgIG5hdGl2ZVNpbmdsZUFkSWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgcmVjR2FtZUJhbm5lcklkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcmVjUG9ydGFsSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdW1lbmdJZDogU3RyaW5nID0gXCJcIjsgLy/lj4vnm59JRFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5L2N572u6I635Y+W5Y6f55SfYmFubmVy6YWN572uXHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24gQmFubmVyTG9jYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE5hdGl2ZUJhbm5lckluZm8obG9jYXRpb246IEJhbm5lckxvY2F0aW9uKSB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuagueaNruS9jee9ruiOt+WPluWOn+eUn2Jhbm5lcumFjee9rj4+bG9jYXRpb249XCIsIGxvY2F0aW9uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmF0aXZlQmFubmVySW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mb3NbaV0ubG9jYXRpb24gPT0gbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmoLnmja7kvY3nva7ojrflj5bljp/nlJ9iYW5uZXLphY3nva4+PmluZm89XCIsIHRoaXMubmF0aXZlQmFubmVySW5mb3NbaV0udG9TdHJvbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVCYW5uZXJJbmZvc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE5hdGl2ZUJhbm5lckluZm8oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kvY3nva7ojrflj5bljp/nlJ/mqKHniYjphY3nva5cclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiBCYW5uZXJMb2NhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tQWRJbmZvSW5mbyhsb2NhdGlvbjogQmFubmVyTG9jYXRpb24pIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5qC55o2u5L2N572u6I635Y+W5Y6f55Sf5qih54mI6YWN572uPj5sb2NhdGlvbj1cIiwgbG9jYXRpb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jdXN0b21BZEluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFkSW5mb3NbaV0ubG9jYXRpb24gPT0gbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmoLnmja7kvY3nva7ojrflj5bljp/nlJ/mqKHniYjphY3nva4+PmluZm89XCIsIHRoaXMuY3VzdG9tQWRJbmZvc1tpXS50b1N0cm9uZygpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUFkSW5mb3NbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21BZEluZm8oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvuWumuWOn+eUn2Jhbm5lcumFjee9rlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOS9jee9rlxyXG4gICAgICogQHBhcmFtIGJhbm5lckluZm8g6YWN572uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROYXRpdmVCYW5uZXJJbmZvKGxvY2F0aW9uLCBiYW5uZXJJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmF0aXZlQmFubmVySW5mbzogTmF0aXZlQmFubmVySW5mbyA9IG5ldyBOYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICAgICAgbmF0aXZlQmFubmVySW5mby5pbml0KGxvY2F0aW9uLCBiYW5uZXJJbmZvKTtcclxuICAgICAgICB0aGlzLm5hdGl2ZUJhbm5lckluZm9zLnB1c2gobmF0aXZlQmFubmVySW5mbyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICog6K6+5a6a5Y6f55Sf5qih54mI6YWN572uXHJcbiAgKiBAcGFyYW0gbG9jYXRpb24g5L2N572uXHJcbiAgKiBAcGFyYW0gYmFubmVySW5mbyDphY3nva5cclxuICAqL1xyXG4gICAgcHVibGljIHNldEN1c3RvbUFkSW5mbyhsb2NhdGlvbiwgY3VzdEluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBuYXRpdmVDdXN0b21BZCA9IG5ldyBDdXN0b21BZEluZm8oKTtcclxuICAgICAgICBuYXRpdmVDdXN0b21BZC5pbml0KGxvY2F0aW9uLCBjdXN0SW5mbyk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21BZEluZm9zLnB1c2gobmF0aXZlQ3VzdG9tQWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5AY2NjbGFzcyhcIll6UmVkQmFnSW5mb1wiKVxyXG5leHBvcnQgY2xhc3MgWXpSZWRCYWdJbmZvIHtcclxuICAgIHByaXZhdGUgX3Byb2dyZXNzOiBudW1iZXIgPSAwOyAvL+W9k+WJjei/m+W6plxyXG4gICAgcHJpdmF0ZSBfdG90YWxQcm9ncmVzczogbnVtYmVyID0gNTsgLy/mgLvov5vluqZcclxuICAgIHByaXZhdGUgX2JhbGFuY2U6IG51bWJlciA9IDAuMDA7IC8v5L2Z6aKdXHJcbiAgICBwcml2YXRlIF90b3RhbE1vZW55OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbGFzdE9wZW5GcmVlUmVkQmFnVGltZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3Byb2dyZXNzSW5mb3M6IGFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sYXN0T3BlbkxldmVsOiBzdHJpbmcgPSBcIi0xXCI7XHJcbiAgICBwcml2YXRlIF9mcmVlUmVkQmFnQ291bnQ6IG51bWJlciA9IDA7ICAvL+eOsOmHkee6ouWMheasoeaVsFxyXG5cclxuICAgIHB1YmxpYyB3aXRoZHJhd2FNb25leXMgPSBbNSwgMjAsIDQ1LCA1MF1cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1Rlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3NJbmZvcyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbW9uZXk6IDAuMSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhfbW9uZXk6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogNCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbW9uZXk6IDAuMSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhfbW9uZXk6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogNSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbW9uZXk6IDAuMDAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heF9tb25leTogMC4wMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3MgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9SRURfQkFHX1BST0dSRVNTKSA/IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1JFRF9CQUdfUFJPR1JFU1MpIDogMDtcclxuICAgICAgICB0aGlzLl90b3RhbFByb2dyZXNzID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfUkVEX0JBR19UT1RBTF9QUk9HUkVTUykgPyBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9SRURfQkFHX1RPVEFMX1BST0dSRVNTKSA6IDU7XHJcbiAgICAgICAgdGhpcy5fYmFsYW5jZSA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1JFRF9CQUdfQkFMQU5DRSkgPyBwYXJzZUZsb2F0KFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1JFRF9CQUdfQkFMQU5DRSkpIDogMC4wMDtcclxuICAgICAgICB0aGlzLl90b3RhbE1vZW55ID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oWVpfQ29uc3RhbnQuU1RfUkVEX0JBR19UT1RBTF9NT05FWSkgPyBwYXJzZUZsb2F0KFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX1JFRF9CQUdfVE9UQUxfTU9ORVkpKSA6IDAuMDA7XHJcbiAgICAgICAgdGhpcy5fbGFzdE9wZW5GcmVlUmVkQmFnVGltZSA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX0ZSRUVfUkVEX0JBR19USU1FKSA/IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX0ZSRUVfUkVEX0JBR19USU1FKSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fbGFzdE9wZW5MZXZlbCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFlaX0NvbnN0YW50LlNUX0xBU1RfT1BFTl9MRVZFTCkgPyBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShZWl9Db25zdGFudC5TVF9MQVNUX09QRU5fTEVWRUwpIDogXCItMVwiO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBmcmVlUmVkQmFnQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyZWVSZWRCYWdDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZyZWVSZWRCYWdDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZnJlZVJlZEJhZ0NvdW50ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsYXN0T3BlbkxldmVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0T3BlbkxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbGFzdE9wZW5MZXZlbCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbGFzdE9wZW5MZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX0xBU1RfT1BFTl9MRVZFTCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJvZ3Jlc3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3Byb2dyZXNzID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Byb2dyZXNzID4gdGhpcy5fdG90YWxQcm9ncmVzcykge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IHRoaXMuX3RvdGFsUHJvZ3Jlc3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuX3Jld2FyZFJlZEJhZ1BhbmVsU2hvd0NvdW50ID0gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9SRURfQkFHX1BST0dSRVNTLCB0aGlzLl9wcm9ncmVzcyArICcnKTtcclxuICAgICAgICBjYy5nYW1lLmVtaXQoXCJZWl9SRURfQkFHX1BST0dSRVNTX0NIQU5HRVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvdGFsUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0b3RhbFByb2dyZXNzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90b3RhbFByb2dyZXNzID0gdmFsdWU7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfUkVEX0JBR19UT1RBTF9QUk9HUkVTUywgdmFsdWUgKyAnJyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvdGFsTW9uZXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsTW9lbnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0b3RhbE1vbmV5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90b3RhbE1vZW55ID0gdmFsdWU7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfUkVEX0JBR19UT1RBTF9NT05FWSwgdmFsdWUgKyAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcm9ncmVzc0luZm9zKHZhbHVlczogW10pIHtcclxuICAgICAgICB0aGlzLl9wcm9ncmVzc0luZm9zID0gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJvZ3Jlc3NJbmZvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3NJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1clByb2dyZXNzSW5mbygpIHtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wcm9ncmVzc0luZm9zICYmIHRoaXMuX3Byb2dyZXNzSW5mb3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5sYXN0T3BlbkxldmVsKSA+IDAgJiYgcGFyc2VJbnQodGhpcy5sYXN0T3BlbkxldmVsKSA+PSB1dGlscy5jdXJyZW50TGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmVzc0luZm9zW3RoaXMuX3Byb2dyZXNzSW5mb3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0gdGhpcy5sYXN0T3BlbkxldmVsID8gdGhpcy5fcHJvZ3Jlc3NJbmZvc1swXSA6IHRoaXMuX3Byb2dyZXNzSW5mb3NbMV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcHJvZ3Jlc3NJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY3VycmVudExldmVsIDw9IHRoaXMuX3Byb2dyZXNzSW5mb3NbaV0ubGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gdGhpcy5fcHJvZ3Jlc3NJbmZvc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImN1ckluZm8gXCIgKyBKU09OLnN0cmluZ2lmeSh0ZW1wKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBiYWxhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYWxhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYmFsYW5jZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFsYW5jZSA9IHZhbHVlO1xyXG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0NvbnN0YW50LlNUX1JFRF9CQUdfQkFMQU5DRSwgdmFsdWUgKyAnJyk7XHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KFwiWVpfUkVEX0JBR19CQUxBTkNFX0NIQU5HRVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhc3RPcGVuRnJlZVJlZEJhZ1RpbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RPcGVuRnJlZVJlZEJhZ1RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBsYXN0T3BlbkZyZWVSZWRCYWdUaW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9sYXN0T3BlbkZyZWVSZWRCYWdUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgWVpfTG9jYWxTdG9yYWdlLnNldEl0ZW0oWVpfQ29uc3RhbnQuU1RfRlJFRV9SRURfQkFHX1RJTUUsIHZhbHVlICsgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuK5aSp5piv5ZCm5pyJ5YWN6LS555qE57qi5YyFXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNGcmVlUmVkQmFnKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNjLmxvZyhcIuaYr+WQpuacieWFjei0uee6ouWMhe+8mlwiICsgbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSAhPSB0aGlzLl9sYXN0T3BlbkZyZWVSZWRCYWdUaW1lKTtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSAhPSB0aGlzLl9sYXN0T3BlbkZyZWVSZWRCYWdUaW1lO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5AY2NjbGFzcyhcIkh1YVdlaUNvbmZpZ1wiKVxyXG5leHBvcnQgY2xhc3MgSHVhV2VpQ29uZmlnIHtcclxuXHJcbiAgICBhcHBJRDogc3RyaW5nID0gXCJcIjtcclxuICAgIGJhbm5lcklkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgaW5zZXJ0SWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgbmF0aXZlU3BsYXNoSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBuYXRpdmVUcnlHYW1lSWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgbmF0aXZlQmFubmVySWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgbmF0aXZlSW5zZXJ0SWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgbmF0aXZlQmFubmVySW5mb3M6IE5hdGl2ZUJhbm5lckluZm9bXSA9IFtdO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIHVtZW5nSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOagueaNruS9jee9ruiOt+WPluWOn+eUn2Jhbm5lcumFjee9rlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIEJhbm5lckxvY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROYXRpdmVCYW5uZXJJbmZvKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbikge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmoLnmja7kvY3nva7ojrflj5bljp/nlJ9iYW5uZXLphY3nva4+PmxvY2F0aW9uPVwiLCBsb2NhdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5hdGl2ZUJhbm5lckluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm9zW2ldLmxvY2F0aW9uID09IGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qC55o2u5L2N572u6I635Y+W5Y6f55SfYmFubmVy6YWN572uPj5pbmZvPVwiLCB0aGlzLm5hdGl2ZUJhbm5lckluZm9zW2ldLnRvU3Ryb25nKCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlQmFubmVySW5mb3NbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7lrprljp/nlJ9iYW5uZXLphY3nva5cclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDkvY3nva5cclxuICAgICAqIEBwYXJhbSBiYW5uZXJJbmZvIOmFjee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TmF0aXZlQmFubmVySW5mbyhsb2NhdGlvbiwgYmFubmVySW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IG5hdGl2ZUJhbm5lckluZm86IE5hdGl2ZUJhbm5lckluZm8gPSBuZXcgTmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgIG5hdGl2ZUJhbm5lckluZm8uaW5pdChsb2NhdGlvbiwgYmFubmVySW5mbyk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJJbmZvcy5wdXNoKG5hdGl2ZUJhbm5lckluZm8pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuQGNjY2xhc3MoXCJOYXRpdmVBbmRyb2lkQ29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBOYXRpdmVBbmRyb2lkQ29uZmlnIHtcclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgY2hhbm5lbDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZlcnNpb246IHN0cmluZyA9IFwiXCI7XHJcbn1cclxuXHJcbkBjY2NsYXNzKFwiQmFpZHVDb25maWdcIilcclxuZXhwb3J0IGNsYXNzIEJhaWR1Q29uZmlnIHtcclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYXBwU0lEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuQGNjY2xhc3MoXCJXaUZpQ29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBXaUZpQ29uZmlnIHtcclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuQGNjY2xhc3MoXCJLd2FpQ29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBLd2FpQ29uZmlnIHtcclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmlkZW9JZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGluc2VydElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuXHJcblxyXG5AY2NjbGFzcyhcIkhhZ29Db25maWdcIilcclxuZXhwb3J0IGNsYXNzIEhhZ29Db25maWcge1xyXG4gICAgYXBwSUQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuQGNjY2xhc3MoXCJOYXRpdmVJb3NDb25maWdcIilcclxuZXhwb3J0IGNsYXNzIE5hdGl2ZUlvc0NvbmZpZyB7XHJcbiAgICBhcHBJRDogc3RyaW5nID0gXCJcIjtcclxuICAgIGJhbm5lcklkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgaW5zZXJ0SWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuQGNjY2xhc3MoXCJEb3V5aW5Db25maWdcIilcclxuZXhwb3J0IGNsYXNzIERvdXlpbkNvbmZpZyB7XHJcblxyXG4gICAgRG91eWluOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZpZGVvSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xyXG59XHJcblxyXG5AY2NjbGFzcyhcIlF1VG91VGlhb0NvbmZpZ1wiKVxyXG5leHBvcnQgY2xhc3MgUVRUQ29uZmlnIHtcclxuXHJcbiAgICBRdVRvdVRpYW86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd0FkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGdhbWVuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYXBwSUQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBhcHBLZXk6IHN0cmluZyA9IFwiXCI7XHJcbn1cclxuXHJcbkBjY2NsYXNzKFwiVUNDb25maWdcIilcclxuZXhwb3J0IGNsYXNzIFVDQ29uZmlnIHtcclxuXHJcbiAgICBhcHBJRDogc3RyaW5nID0gXCJcIjtcclxuICAgIGFwcEtleTogc3RyaW5nID0gXCJcIjtcclxuICAgIHZlcnNpb246IHN0cmluZyA9IFwiXCI7XHJcbn1cclxuXHJcbkBjY2NsYXNzKFwiQ29jb3NDb25maWdcIilcclxuZXhwb3J0IGNsYXNzIENvY29zQ29uZmlnIHtcclxuXHJcbiAgICBhcHBJRDogc3RyaW5nID0gXCJcIjtcclxuICAgIGFwcEtleTogc3RyaW5nID0gXCJcIjtcclxuICAgIGFwcFNlY3JldDogc3RyaW5nID0gXCJcIjtcclxuICAgIGJhbm5lcklkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdmlkZW9JZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGluc2VydElkOiBzdHJpbmcgPSBcIlwiO1xyXG59XHJcbkBjY2NsYXNzKFwiWGlhb01pQ29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBYaWFvTWlDb25maWcge1xyXG4gICAgYXBwSUQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBiYW5uZXJJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZpZGVvSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIG5hdGl2ZVNwbGFzaElkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgbmF0aXZlVHJ5R2FtZUlkczogc3RyaW5nW10gPSBbXTtcclxuICAgIG5hdGl2ZUJhbm5lcklkczogc3RyaW5nW10gPSBbXTtcclxuICAgIG5hdGl2ZUluc2VydElkczogc3RyaW5nW10gPSBbXTtcclxuICAgIG5hdGl2ZUJhbm5lckluZm9zOiBOYXRpdmVCYW5uZXJJbmZvW10gPSBbXTtcclxuICAgIHZlcnNpb246IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOagueaNruS9jee9ruiOt+WPluWOn+eUn2Jhbm5lcumFjee9rlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIEJhbm5lckxvY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROYXRpdmVCYW5uZXJJbmZvKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbikge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmoLnmja7kvY3nva7ojrflj5bljp/nlJ9iYW5uZXLphY3nva4+PmxvY2F0aW9uPVwiLCBsb2NhdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5hdGl2ZUJhbm5lckluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm9zW2ldLmxvY2F0aW9uID09IGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5qC55o2u5L2N572u6I635Y+W5Y6f55SfYmFubmVy6YWN572uPj5pbmZvPVwiLCB0aGlzLm5hdGl2ZUJhbm5lckluZm9zW2ldLnRvU3Ryb25nKCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlQmFubmVySW5mb3NbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOYXRpdmVCYW5uZXJJbmZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7lrprljp/nlJ9iYW5uZXLphY3nva5cclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDkvY3nva5cclxuICAgICAqIEBwYXJhbSBiYW5uZXJJbmZvIOmFjee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TmF0aXZlQmFubmVySW5mbyhsb2NhdGlvbiwgYmFubmVySW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IG5hdGl2ZUJhbm5lckluZm86IE5hdGl2ZUJhbm5lckluZm8gPSBuZXcgTmF0aXZlQmFubmVySW5mbygpO1xyXG4gICAgICAgIG5hdGl2ZUJhbm5lckluZm8uaW5pdChsb2NhdGlvbiwgYmFubmVySW5mbyk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJJbmZvcy5wdXNoKG5hdGl2ZUJhbm5lckluZm8pO1xyXG4gICAgfVxyXG59XHJcblxyXG5AY2NjbGFzcyhcIkJpbGlDb25maWdcIilcclxuZXhwb3J0IGNsYXNzIEJpbGlDb25maWcge1xyXG4gICAgYXBwSUQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBiYW5uZXJJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZpZGVvSWQ6IHN0cmluZyA9IFwiXCI7XHJcbn1cclxuXHJcbkBjY2NsYXNzKFwiRmFjZUJvb2tDb25maWdcIilcclxuZXhwb3J0IGNsYXNzIEZhY2VCb29rQ29uZmlnIHtcclxuICAgIGFwcElEOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHZpZGVvSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xyXG59XHJcblxyXG5AY2NjbGFzcyhcIk90aGVyQ29uZmlnXCIpXHJcbmV4cG9ydCBjbGFzcyBPdGhlckNvbmZpZyB7XHJcbiAgICBzaGFyZVRpdGxlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgc2hhcmVJbWdVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBzaGFyZUljb246IHN0cmluZyA9IFwiXCI7XHJcbiAgICBzaGFyZURlc2M6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSnNvbkFzc2V0LCBkaXNwbGF5TmFtZTogXCLmnKzlnLDphY3nva7mlofku7ZcIiwgdG9vbHRpcDogXCLlsIZDb21tb24vQ29uZmlnL+S4i+mdoueahOmFjee9ruaWh+S7tuaLluaUvuWIsOatpOWkhFwiIH0pXHJcbiAgICBsb2NhbENvbmZpZzogY2MuSnNvbkFzc2V0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIGRpc3BsYXlOYW1lOiBcIuaXpeW/l+i+k+WHuue7hOS7tlwiLCB0b29sdGlwOiBcIuWwhkNvbW1vbi9QcmVmYWJzL0xvZ291dFZpZXfmi5bmlL7liLDmraTlpIRcIiB9KVxyXG4gICAgbG9nb3V0VmlldzogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5Y6f55Sf5bm/5ZGK5p2h57uE5Lu277yM5bCGQ29tbW9uL1ByZWZhYnMvTmF0aXZlQmFubmVy5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuWOn+eUn+W5v+WRiuadoee7hOS7tlwiIH0pXHJcbiAgICBuYXRpdmVCYW5uZXI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuWOn+eUn+aPkuWxj+e7hOS7tu+8jOWwhkNvbW1vbi9QcmVmYWJzL05hdGl2ZUluc2VydOaLluWIsOatpOWkhFwiLCBkaXNwbGF5TmFtZTogXCLljp/nlJ/mj5LlsY/nu4Tku7ZcIiB9KVxyXG4gICAgbmF0aXZlSW5zZXJ0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLljp/nlJ/mj5LlsY/nu4Tku7bvvIzlsIZDb21tb24vUHJlZmFicy9uYXRpdmVTcGxhc2hWaWV35ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuWOn+eUn+W8gOWxj+e7hOS7tlwiIH0pXHJcbiAgICBuYXRpdmVTcGxhc2hWaWV3OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLlupXpg6jmjqjojZDmuLjmiI/lub/lkYpCYW5uZXIsIOWwhkNvbW1vbi9QcmVmYWJzL1JlY29tbWVuZEdhbWVzQmFubmVy5ouW5Yiw5q2k5aSEXCIgfSlcclxuICAgIHJlY29tbWVuZEdhbWVzQmFubmVyOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLmjqjojZDmuLjmiI/mqKrmnaHvvIzlsIZDb21tb24vUHJlZmFicy9SZWNvbW1lbmRHYW1lc0JhcuaLluWIsOatpOWkhFwiIH0pXHJcbiAgICByZWNvbW1lbmRHYW1lc0JhcjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5o6o6I2Q5ri45oiP5ZyG5b2i5oyC5Lu277yM5bCGQ29tbW9uL1ByZWZhYnMvVHJ5R2FtZXNXaWRnZXTmi5bliLDmraTlpIRcIiB9KVxyXG4gICAgdHJ5R2FtZXNXaWRnZXQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuS+p+i+ueabtOWkmua4uOaIj+mdouadv+aMguS7tu+8jOWwhkNvbW1vbi9QcmVmYWJzL01vcmVHYW1lc1dpZGdldOaLluWIsOatpOWkhFwiIH0pXHJcbiAgICBtb3JlR2FtZXNXaWRnZXQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuW9leWxj+aMiemSrue7hOS7tu+8jOWwhkNvbW1vbi9QcmVmYWJzL1JlY29yZFdpZGdldOaLluWIsOatpOWkhFwiIH0pXHJcbiAgICByZWNvcmRXaWRnZXQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuW/q+aNt+aWueW8j+aMiemSru+8jOWwhkNvbW1vbi9QcmVmYWJzL1Nob3J0Y3V0V2lkZ2V05ouW5Yiw5q2k5aSEIFwiIH0pXHJcbiAgICBzaG9ydGN1dFdpZGdldDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcblxyXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIua4uOaIj+ebkuWtkO+8jOWwhkNvbW1vbi9QcmVmYWJzL0dhbWVCb3jmi5bliLDmraTlpIQgXCIgfSlcclxuICAgIGdhbWVCb3g6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIjblhYPntKDkuqTlj4nmjqjlub/nu4Tku7bvvIzlsIZDb21tb24vUHJlZmFicy9Dcm9zc1dpZGdldDbmi5bliLDmraTlpIRcIiB9KVxyXG4gICAgY3Jvc3NXaWRnZXQ2OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLmv4DlirHmj5LlsY/mjqjlub/nu4Tku7bvvIzlsIZDb21tb24vUHJlZmFicy9SZXdhcmRJbnNlcnTmi5bliLDmraTlpIRcIiB9KVxyXG4gICAgcmV3YXJkSW5zZXJ0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLnu5PnrpfpobXpnaLmjqjlub/nu4Tku7bvvIzlsIZDb21tb24vUHJlZmFicy9TdGF0ZW1lbnRSZWNvbW1lbnTmi5bliLDmraTlpIRcIiB9KVxyXG4gICAgc3RhdGVtZW50UmVjb21tZW50OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLljZXkuKrljp/nlJ/lub/lkYrvvIzlsIZDb21tb24vUHJlZmFicy9TaW5nbGVOYXRpdmVBZOaLluWIsOatpOWkhFwiIH0pXHJcbiAgICBzaW5nbGVOYXRpdmVBZDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5YiG5Lqr5b2V5bGP5by556qX77yM5bCGQ29tbW9uL1ByZWZhYnMvU2hhcmVSZWNvcmRQYW5lbOaLluWIsOatpOWkhFwiIH0pXHJcbiAgICBzaGFyZVJlY29yZFBhbmVsOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLljp/nlJ/pgIDlh7rmuLjmiI/lvLnnqpfvvIzlsIZDb21tb24vUHJlZmFicy9HYW1lRXhpdERpYWxvZ+aLluWIsOatpOWkhFwiIH0pXHJcbiAgICBnYW1lRXhpdERpYWxvZzogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5LqU5YCN5aWW5Yqx5a6d566x5by556qX77yM5bCGQ29tbW9uL1ByZWZhYnMvUmV3YXJkQm94UGFuZWzmi5bliLDmraTlpIRcIiB9KVxyXG4gICAgcmV3YXJkQm94UGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuWlluWKsei9rOebmOaKveWlluW8ueeql++8jOWwhkNvbW1vbi9QcmVmYWJzL1Jld2FyZFR1cm50YWJsZVBhbmVs5ouW5Yiw5q2k5aSEXCIgfSlcclxuICAgIHJld2FyZFR1cm5UYWJsZVBhbmVsOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLmt7vliqDmoYzpnaLmv4DlirHlvLnnqpfvvIzlsIZDb21tb24vUHJlZmFicy9SZXdhcmRTaG9ydEN1dFBhbmVs5ouW5Yiw5q2k5aSEXCIgfSlcclxuICAgIHJld2FyZFNob3J0Q3V0UGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuWOn+eUn+aKluWKqOivleeOqe+8jOWwhkNvbW1vbi9QcmVmYWJzL05hdGl2ZVRyeUdhbWVXaWRnZXTmi5bliLDmraTlpIRcIiwgZGlzcGxheU5hbWU6IFwi5Y6f55Sf5oqW5Yqo57uE5Lu2XCIgfSlcclxuICAgIG5hdGl2ZVRyeUdhbWVXaWRnZXQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIue7k+eul+WJjeS6kuaOqOmdouadv++8jOWwhkNvbW1vbi9QcmVmYWJzL0JlZm9yR2FtZU92ZXJSZWNHYW1lc1BhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIue7k+eul+WJjeS6kuaOqOmdouadv1wiIH0pXHJcbiAgICBiZWZvckdhbWVPdmVyUmVjR2FtZXNQYW5lbDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi57qi5YyF5o+Q546w5qGG77yM5bCGQ29tbW9uL1ByZWZhYnMvV2l0aGRyYXdhbFdpZGdldOaLluWIsOatpOWkhFwiLCBkaXNwbGF5TmFtZTogXCLnuqLljIXmj5DnjrDmoYbmjILku7ZcIiB9KVxyXG4gICAgd2l0aGRyYXdhbFdpZGdldDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi57qi5YyF5o+Q546w5by556qX77yM5bCGQ29tbW9uL1ByZWZhYnMvV2l0aGRyYXdhbFBhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIue6ouWMheaPkOeOsOW8ueeql1wiIH0pXHJcbiAgICB3aXRoZHJhd2FsUGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIue6ouWMhei/m+W6puaMguS7tu+8jOWwhkNvbW1vbi9QcmVmYWJzL1JlZEJhZ1Byb2dyZXNzV2lkZ2V05ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIue6ouWMhei/m+W6puaMguS7tlwiIH0pXHJcbiAgICByZWRCYWdQcm9ncmVzc1dpZGdldDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5ouG57qi5YyF5by556qX77yM5bCGQ29tbW9uL1ByZWZhYnMvT3BlblJlZEJhZ1BhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuaLhue6ouWMheW8ueeql1wiIH0pXHJcbiAgICBvcGVuUmVkQmFnUGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuaBreWWnOiOt+W+l+e6ouWMheW8ueeql++8jOWwhkNvbW1vbi9QcmVmYWJzL1Jld2FyZFJlZEJhZ1BhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuaBreWWnOiOt+W+l+e6ouWMheW8ueeql1wiIH0pXHJcbiAgICByZXdhcmRSZWRCYWdQYW5lbDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi5bm46L+Q5a6d566x5by556qX77yM5bCGQ29tbW9uL1ByZWZhYnMvUmV3YXJkTHVja0JveFBhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuW5uOi/kOWuneeuseW8ueeql1wiIH0pXHJcbiAgICByZXdhcmRMdWNrQm94UGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIuerlueKtuS6kuaOqOeql+WPo++8jOWwhkNvbW1vbi9QcmVmYWJzL1ZlcnRpY2FsUmVjb21tZW50UGFuZWzmi5bliLDmraTlpIRcIiwgZGlzcGxheU5hbWU6IFwi56uW54q25LqS5o6o56qX5Y+jXCIgfSlcclxuICAgIHZlcnRpY2FsUmVjb21tZW50UGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIumakOengeWNj+iuruaMguS7tu+8jOWwhkNvbW1vbi9QcmVmYWJzL1ByaXZhY3lXaWRnZXTmi5bliLDmraTlpIRcIiwgZGlzcGxheU5hbWU6IFwi6ZqQ56eB5Y2P6K6u5oyC5Lu2XCIgfSlcclxuICAgIHByaXZhY3lXaWRnZXQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCB0b29sdGlwOiBcIumakOengeWNj+iuruW8ueeql++8jOWwhkNvbW1vbi9QcmVmYWJzL1ByaXZhY3lQYW5lbOaLluWIsOatpOWkhFwiLCBkaXNwbGF5TmFtZTogXCLpmpDnp4HljY/orq7lvLnnqpdcIiB9KVxyXG4gICAgcHJpdmFjeVBhbmVsOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLmjIflvJXnmoTmiYvlir/vvIzlsIZDb21tb24vUHJlZmFicy9IYW5kUHJlZmFi5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuaMh+W8leeahOaJi+WKv1wiIH0pXHJcbiAgICBoYW5kUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLlrp7lkI3liLborqTor4HlvLnnqpfvvIzlsIZDb21tb24vUHJlZmFicy9ZelJlYWxOYW1lQXV0aFBhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIuWunuWQjeWItuiupOivgeW8ueeql1wiIH0pXHJcbiAgICB5elJlYWxOYW1lQXV0aFBhbmVsOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgdG9vbHRpcDogXCLmqKHniYjlub/lkYrmjqjojZDlvLnnqpfvvIzlsIZDb21tb24vUHJlZmFicy9ZekN1c3RvbUFkUGFuZWzmi5bliLDmraTlpIRcIiwgZGlzcGxheU5hbWU6IFwi5qih54mI5bm/5ZGK5o6o6I2Q5by556qXXCIgfSlcclxuICAgIHl6Q3VzdG9tQWRQYW5lbDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi55m75b2V5by556qX77yM5bCGQ29tbW9uL1ByZWZhYnMvWXpMb2dpblBhbmVs5ouW5Yiw5q2k5aSEXCIsIGRpc3BsYXlOYW1lOiBcIueZu+W9leW8ueeql1wiIH0pXHJcbiAgICB5ekxvZ2luUGFuZWw6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/muLjnjqnnu5/orqFTREs6SURcclxuICAgIHl3X2FwcF9pZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbn1cclxuXHJcbkBjY2NsYXNzKFwiQ29tbW9uQ29uZmlnXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1vbkNvbmZpZyB7XHJcblxyXG4gICAgd2VjaGF0Y29uZmlnOiBXZWNoYXRDb25maWcgPSBuZXcgV2VjaGF0Q29uZmlnKCk7XHJcbiAgICBvcHBvY29uZmlnOiBPcHBvQ29uZmlnID0gbmV3IE9wcG9Db25maWcoKTtcclxuICAgIHZpdm9jb25maWc6IFZpdm9Db25maWcgPSBuZXcgVml2b0NvbmZpZygpO1xyXG4gICAgbmF0aXZlQW5kcm9pZENvbmZpZzogTmF0aXZlQW5kcm9pZENvbmZpZyA9IG5ldyBOYXRpdmVBbmRyb2lkQ29uZmlnKCk7XHJcblxyXG4gICAgYmFpZHVjb25maWc6IEJhaWR1Q29uZmlnID0gbmV3IEJhaWR1Q29uZmlnKCk7XHJcbiAgICBkb3V5aW5jb25maWc6IERvdXlpbkNvbmZpZyA9IG5ldyBEb3V5aW5Db25maWcoKTtcclxuICAgIHdpZmlDb25maWc6IFdpRmlDb25maWcgPSBuZXcgV2lGaUNvbmZpZygpO1xyXG5cclxuICAgIHFxY29uZmlnOiBRUUNvbmZpZyA9IG5ldyBRUUNvbmZpZygpO1xyXG4gICAgcXR0Y29uZmlnOiBRVFRDb25maWcgPSBuZXcgUVRUQ29uZmlnKCk7XHJcbiAgICB4aWFvbWlDb25maWc6IFhpYW9NaUNvbmZpZyA9IG5ldyBYaWFvTWlDb25maWcoKTtcclxuICAgIHVjQ29uZmlnOiBVQ0NvbmZpZyA9IG5ldyBVQ0NvbmZpZygpO1xyXG4gICAgY29jb3NDb25maWc6IENvY29zQ29uZmlnID0gbmV3IENvY29zQ29uZmlnKCk7XHJcbiAgICBiaWxpQ29uZmlnOiBCaWxpQ29uZmlnID0gbmV3IEJpbGlDb25maWcoKTtcclxuICAgIGt3YWlDb25maWc6IEt3YWlDb25maWcgPSBuZXcgS3dhaUNvbmZpZygpO1xyXG4gICAgbmF0aXZlSW9TQ29uZmlnOiBOYXRpdmVJb3NDb25maWcgPSBuZXcgTmF0aXZlSW9zQ29uZmlnKCk7XHJcbiAgICBoYWdvQ29uZmlnOiBIYWdvQ29uZmlnID0gbmV3IEhhZ29Db25maWcoKTtcclxuICAgIGh1YXdlaUNvbmZpZzogSHVhV2VpQ29uZmlnID0gbmV3IEh1YVdlaUNvbmZpZygpO1xyXG5cclxuICAgIGZhY2VCb29rQ29uZmlnOiBGYWNlQm9va0NvbmZpZyA9IG5ldyBGYWNlQm9va0NvbmZpZygpO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IE90aGVyQ29uZmlnLCB0b29sdGlwOiBcIuWFtuS7lumFjee9rlwiLCBkaXNwbGF5TmFtZTogXCLlhbbku5bphY3nva5cIiB9KVxyXG4gICAgb3RoZXJjb25maWc6IE90aGVyQ29uZmlnID0gbmV3IE90aGVyQ29uZmlnKCk7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdF9vdGhlcihkYXRhKTtcclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0X3dlY2hhdChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRfb3BwbyhkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRfdml2byhkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF9kb3V5aW4oZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNRUSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF9xcShkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JhaWR1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0X2JhaWR1KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVRUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0X3F0dChkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF94aWFvbWkoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSVNVQykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF91YyhkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5JU0NvY29zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0X2NvY29zKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF9uYXRpdmVfYW5kcm9pZCgpOztcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUlPUykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF9uYXRpdmVfaW9zKGRhdGEpOztcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0JpbGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRfYmlsaShkYXRhKTs7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNLd2FpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0X2t3YWkoZGF0YSk7O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzV2lGaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdF93aWZpKGRhdGEpOztcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0hhZ28pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRfaGFnbyhkYXRhKTs7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRfaHVhd2VpKGRhdGEpOztcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0ZhY2VCb29rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0X2ZhY2Vib29rKGRhdGEpOztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2luaXRfb3RoZXIoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmoub3RoZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoub3RoZXIueXdfYXBwX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlcmNvbmZpZy55d19hcHBfaWQgPSBjb25maWdPYmoub3RoZXIueXdfYXBwX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYeXdfYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIF9pbml0X3dlY2hhdChkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG5cclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIGlmIChjb25maWdPYmopIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai53ZWNoYXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2VjaGF0LmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2VjaGF0Y29uZmlnLmFwcElEID0gY29uZmlnT2JqLndlY2hhdC5hcHBfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai53ZWNoYXQuaW50ZXJzaXRpdGlhX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2VjaGF0Y29uZmlnLmluc2VydElkID0gY29uZmlnT2JqLndlY2hhdC5pbnRlcnNpdGl0aWFfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYaW50ZXJzaXRpdGlhX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLndlY2hhdC52aWRlb19wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlY2hhdGNvbmZpZy52aWRlb0lkID0gY29uZmlnT2JqLndlY2hhdC52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aWRlb19wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2VjaGF0LmFwcF9ib3hfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWNoYXRjb25maWcuYXBwQm94SWQgPSBjb25maWdPYmoud2VjaGF0LmFwcF9ib3hfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2JveF9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2VjaGF0LnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlY2hhdGNvbmZpZy52ZXJzaW9uID0gY29uZmlnT2JqLndlY2hhdC52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLndlY2hhdC5pc19hdHRyaWJ1dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWNoYXRjb25maWcuaXNBdHRyaWJ1dGVkID0gY29uZmlnT2JqLndlY2hhdC5pc19hdHRyaWJ1dGVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLndlY2hhdC5iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbmZpZ09iai53ZWNoYXQuYmFubmVyX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFubmVySW5mbzogQmFubmVySWRJbmZvID0gbmV3IEJhbm5lcklkSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJJbmZvLmxvY2F0aW9uID0gdGhpcy5fYmFubmVyTG9jYXRpb25TdHJpbmdUb0VudW0oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFubmVySW5mby5iYW5uZXJJZCA9IGNvbmZpZ09iai53ZWNoYXQuYmFubmVyX3Bvc19pZFtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlY2hhdGNvbmZpZy5iYW5uZXJJZHMucHVzaChiYW5uZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhiYW5uZXJfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2VjaGF0LnNoYXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2VjaGF0LnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSBjb25maWdPYmoud2VjaGF0LnNoYXJlcy5zeV90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYc2hhcmVzLnNoYXJlVGl0bGXigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai53ZWNoYXQuc2hhcmVzLnN5X2ltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gY29uZmlnT2JqLndlY2hhdC5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc2hhcmVJbWdVcmzigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXPigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai53ZWNoYXQuYmFubmVyX2JveF9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlY2hhdGNvbmZpZy5iYW5uZXJCb3hJZCA9IGNvbmZpZ09iai53ZWNoYXQuYmFubmVyX2JveF9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7kuK3kuI3ljIXlkKsg4oCYYmFubmVyX2JveF9wb3NfaWTigJkg5a2X5q61XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2VjaGF0Lm5hdGl2ZV9iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWNoYXRjb25maWcubmF0aXZlQmFubmVySWQgPSBjb25maWdPYmoud2VjaGF0Lm5hdGl2ZV9iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5Lit5LiN5YyF5ZCrIG5hdGl2ZV9iYW5uZXJfcG9zX2lkIOWtl+autVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLndlY2hhdC5uYXRpdmVfaW50ZXJzaXRpdGlhbF9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlY2hhdGNvbmZpZy5uYXRpdmVJbnNlcnRJZHMgPSBjb25maWdPYmoud2VjaGF0Lm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruS4reS4jeWMheWQqyBuYXRpdmVfaW50ZXJzaXRpdGlhbF9wb3NfaWQg5a2X5q61XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh3ZWNoYXTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRfb3BwbyhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmoub3Bwbykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5vcHBvLmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Bwb2NvbmZpZy5hcHBJRCA9IGNvbmZpZ09iai5vcHBvLmFwcF9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGFwcF9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5vcHBvLnBhY2thZ2VfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Bwb2NvbmZpZy5wYWNrYWdlTmFtZSA9IGNvbmZpZ09iai5vcHBvLnBhY2thZ2VfbmFtZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHBhY2thZ2VfbmFtZeKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoub3Bwby5iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLm9wcG8uYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoub3Bwby5yZWNfZ2FtZV9kcmF3ZXJfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcG9jb25maWcucmVjR2FtZURyYXdlcklkID0gY29uZmlnT2JqLm9wcG8ucmVjX2dhbWVfZHJhd2VyX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwicmVjX2dhbWVfZHJhd2VyX2lkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGNvbmZpZ09iai5vcHBvLmludGVyc2l0aXRpYV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9wcG9jb25maWcuaW5zZXJ0SWQgPSBjb25maWdPYmoub3Bwby5pbnRlcnNpdGl0aWFfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYaW50ZXJzaXRpdGlhX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLm9wcG8udmlkZW9fcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLnZpZGVvSWQgPSBjb25maWdPYmoub3Bwby52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aWRlb19wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5vcHBvLm5hdGl2ZV9iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLm5hdGl2ZUJhbm5lcklkcyA9IGNvbmZpZ09iai5vcHBvLm5hdGl2ZV9iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhuYXRpdmVfYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5vcHBvLm5hdGl2ZV90cnlnYW1lX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Bwb2NvbmZpZy5uYXRpdmVUcnlHYW1lSWRzID0gY29uZmlnT2JqLm9wcG8ubmF0aXZlX3RyeWdhbWVfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYbmF0aXZlX3RyeWdhbWVfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5vcHBvLmludGVyc2l0aWFsX2NvbmZpZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcG9jb25maWcuaW50ZXJzaXRpYWxBZENvbmZpZ3MgPSBjb25maWdPYmoub3Bwby5pbnRlcnNpdGlhbF9jb25maWdzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYaW50ZXJzaXRpYWxfY29uZmlnc+KAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5vcHBvLmJhbm5lcl9jb25maWdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLmJhbm5lckFkQ29uZmlncyA9IGNvbmZpZ09iai5vcHBvLmJhbm5lcl9jb25maWdzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX2NvbmZpZ3PigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY29uZmlnT2JqLm9wcG8ubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5vcHBvY29uZmlnLm5hdGl2ZUluc2VydElkcyA9IGNvbmZpZ09iai5vcHBvLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLm9wcG8ubmF0aXZlX3NpbmdsZV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcG9jb25maWcubmF0aXZlU2luZ2xlQWRJZHMgPSBjb25maWdPYmoub3Bwby5uYXRpdmVfc2luZ2xlX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG5hdGl2ZV9zaW5nbGVfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoub3Bwby5yZWNfcG9ydGFsX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLnJlY1BvcnRhbElkID0gY29uZmlnT2JqLm9wcG8ucmVjX3BvcnRhbF9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHJlY19wb3J0YWxfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLm9wcG8ucmVjX2dhbWVfYmFubmVyX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLnJlY0dhbWVCYW5uZXJJZCA9IGNvbmZpZ09iai5vcHBvLnJlY19nYW1lX2Jhbm5lcl9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHJlY19nYW1lX2Jhbm5lcl9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoub3Bwby52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5uZXdfdmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHBvY29uZmlnLnZlcnNpb24gPSB3aW5kb3cubmV3X3ZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bliLDms6jlhaXnmoTniYjmnKzlj7fvvJpcIiArIHRoaXMub3Bwb2NvbmZpZy52ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcG9jb25maWcudmVyc2lvbiA9IGNvbmZpZ09iai5vcHBvLnZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLm9wcG8udW1lbmdfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcG9jb25maWcudW1lbmdJZCA9IGNvbmZpZ09iai5vcHBvLnVtZW5nX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdW1lbmdfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG9wcG/igJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRfdml2byhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIGlmIChjb25maWdPYmopIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai52aXZvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnZpdm8uYXBwX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLmFwcElEID0gY29uZmlnT2JqLnZpdm8uYXBwX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoudml2by5pbnRlcnNpdGl0aWFfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLmluc2VydElkID0gY29uZmlnT2JqLnZpdm8uaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGludGVyc2l0aXRpYV9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai52aXZvLnZpZGVvX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudml2b2NvbmZpZy52aWRlb0lkID0gY29uZmlnT2JqLnZpdm8udmlkZW9fcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmlkZW9fcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoudml2by5iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLnZpdm8uYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGJhbm5lcl9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai52aXZvLm5hdGl2ZV9iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLm5hdGl2ZUJhbm5lcklkcyA9IGNvbmZpZ09iai52aXZvLm5hdGl2ZV9iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYbmF0aXZlX2Jhbm5lcl9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai52aXZvLm5hdGl2ZV90cnlnYW1lX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudml2b2NvbmZpZy5uYXRpdmVUcnlHYW1lSWRzID0gY29uZmlnT2JqLnZpdm8ubmF0aXZlX3RyeWdhbWVfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYbmF0aXZlX3RyeWdhbWVfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnZpdm8ubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLm5hdGl2ZUluc2VydElkcyA9IGNvbmZpZ09iai52aXZvLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoudml2by5yZWNfcG9ydGFsX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLnJlY1BvcnRhbElkID0gY29uZmlnT2JqLnZpdm8ucmVjX3BvcnRhbF9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIndhcm5cIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYcmVjX3BvcnRhbF9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoudml2by5yZWNfZ2FtZV9iYW5uZXJfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpdm9jb25maWcucmVjR2FtZUJhbm5lcklkID0gY29uZmlnT2JqLnZpdm8ucmVjX2dhbWVfYmFubmVyX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FyblwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhyZWNfZ2FtZV9iYW5uZXJfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai52aXZvLm5hdGl2ZV9zaW5nbGVfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXZvY29uZmlnLm5hdGl2ZVNpbmdsZUFkSWRzID0gY29uZmlnT2JqLnZpdm8ubmF0aXZlX3NpbmdsZV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG5hdGl2ZV9zaW5nbGVfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoudml2by51bWVuZ19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudml2b2NvbmZpZy51bWVuZ0lkID0gY29uZmlnT2JqLnZpdm8udW1lbmdfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh1bWVuZ19pZOKAmeWtl+autSzkuI3lkK/nlKjlj4vnm5/nu5/orqHvvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai52aXZvLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpdm9jb25maWcudmVyc2lvbiA9IGNvbmZpZ09iai52aXZvLnZlcnNpb247XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ3YXJuOlwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2ZXJzaW9u4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aXZv4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0X2JhaWR1KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghZGF0YSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKzlnLDphY3nva7mlbDmja46XCIsIGRhdGEpO1xyXG4gICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZ09iaikge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmJhaWR1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLmJhaWR1LmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFpZHVjb25maWcuYXBwSUQgPSBjb25maWdPYmouYmFpZHUuYXBwX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmouYmFpZHUuYXBwX3NpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFpZHVjb25maWcuYXBwU0lEID0gY29uZmlnT2JqLmJhaWR1LmFwcF9zaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfc2lk4oCZ5a2X5q6177yBXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLmJhaWR1LnZpZGVvX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFpZHVjb25maWcudmlkZW9JZCA9IGNvbmZpZ09iai5iYWlkdS52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aWRlb19wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5iYWlkdS5iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWlkdWNvbmZpZy5iYW5uZXJJZCA9IGNvbmZpZ09iai5iYWlkdS5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5iYWlkdS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWlkdWNvbmZpZy52ZXJzaW9uID0gY29uZmlnT2JqLmJhaWR1LnZlcnNpb247XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2ZXJzaW9u4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmouYmFpZHUuc2hhcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5iYWlkdS5zaGFyZXMuc3lfdGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlcmNvbmZpZy5zaGFyZVRpdGxlID0gY29uZmlnT2JqLmJhaWR1LnNoYXJlcy5zeV90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYc2hhcmVzLnN5X3RpdGxl4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmouYmFpZHUuc2hhcmVzLnN5X2ltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gY29uZmlnT2JqLmJhaWR1LnNoYXJlcy5zeV9pbWc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlcy5zeV9pbWfigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXPigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGJhaWR14oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdF93aWZpKGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghZGF0YSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKzlnLDphY3nva7mlbDmja46XCIsIGRhdGEpO1xyXG4gICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZ09iaikge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLndpZmkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2lmaS5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZmlDb25maWcuYXBwSUQgPSBjb25maWdPYmoud2lmaS5hcHBfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoud2lmaS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWZpQ29uZmlnLnZlcnNpb24gPSBjb25maWdPYmoud2lmaS52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGJhaWR14oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdF9kb3V5aW4oZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZ09iaikge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLnRvdXRpYW8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoudG91dGlhby5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdXlpbmNvbmZpZy5hcHBJRCA9IGNvbmZpZ09iai50b3V0aWFvLmFwcF9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGFwcF9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnRvdXRpYW8uYmFubmVyX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG91eWluY29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLnRvdXRpYW8uYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGJhbm5lcl9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai50b3V0aWFvLnZpZGVvX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG91eWluY29uZmlnLnZpZGVvSWQgPSBjb25maWdPYmoudG91dGlhby52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aWRlb19wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai50b3V0aWFvLmludGVyc2l0aXRpYV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdXlpbmNvbmZpZy5pbnNlcnRJZCA9IGNvbmZpZ09iai50b3V0aWFvLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhpbnRlcnNpdGl0aWFfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnRvdXRpYW8udmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG91eWluY29uZmlnLnZlcnNpb24gPSBjb25maWdPYmoudG91dGlhby52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnRvdXRpYW8uc2hhcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai50b3V0aWFvLnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSBjb25maWdPYmoudG91dGlhby5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlcy5zeV90aXRsZeKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnRvdXRpYW8uc2hhcmVzLnN5X2ltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gY29uZmlnT2JqLnRvdXRpYW8uc2hhcmVzLnN5X2ltZztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYc2hhcmVzLnN5X2ltZ+KAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlc+KAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwid2FybjpcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRfcXEoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacrOWcsOmFjee9ruaVsOaNrjpcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZ09iaikge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLnFxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnFxLmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXFjb25maWcuYXBwSUQgPSBjb25maWdPYmoucXEuYXBwX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoucXEudmlkZW9fcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xcWNvbmZpZy52aWRlb0lkID0gY29uZmlnT2JqLnFxLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHZpZGVvX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnFxLmJhbm5lcl9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnFxY29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLnFxLmJhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhiYW5uZXJfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoucXEuaW50ZXJzaXRpdGlhX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXFjb25maWcuaW5zZXJ0SWQgPSBjb25maWdPYmoucXEuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGludGVyc2l0aXRpYV9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5xcS5ib3hfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xcWNvbmZpZy5ib3hJZCA9IGNvbmZpZ09iai5xcS5ib3hfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYm94X3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5xcS5iYW5uZXJfYm94X3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXFjb25maWcuYmFubmVyQm94SWQgPSBjb25maWdPYmoucXEuYmFubmVyX2JveF9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhiYW5uZXJfYm94X3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5xcS5zaGFyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnFxLnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSBjb25maWdPYmoucXEuc2hhcmVzLnN5X3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc2hhcmVUaXRsZeKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnFxLnNoYXJlcy5zeV9pbWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IGNvbmZpZ09iai5xcS5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc2hhcmVJbWdVcmzigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXPigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5xcS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xcWNvbmZpZy52ZXJzaW9uID0gY29uZmlnT2JqLnFxLnZlcnNpb247XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2ZXJzaW9u4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TXNnKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYcXHigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TXNnKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6Laj5aS05p2hXHJcbiAgICAgKiDov5nph4zlj6rovpPlh7rphY3nva7kuI3lgZrku7vkvZXlpITnkIZcclxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbml0X3F0dChkYXRhOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmoucXV0b3V0aWFvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnF1dG91dGlhby5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF0dGNvbmZpZy5hcHBJRCA9IGNvbmZpZ09iai5xdXRvdXRpYW8uYXBwX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0aGlzLnF0dGNvbmZpZy5hcHBJRDpcIiwgdGhpcy5xdHRjb25maWcuYXBwSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJjb25maWdPYmoucXV0b3V0aWFvLmFwcF9pZDpcIiwgY29uZmlnT2JqLnF1dG91dGlhby5hcHBfaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoucXV0b3V0aWFvLmFwcF9rZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF0dGNvbmZpZy5hcHBLZXkgPSBjb25maWdPYmoucXV0b3V0aWFvLmFwcF9rZXk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfa2V54oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoucXV0b3V0aWFvLmdhbWVfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXR0Y29uZmlnLmdhbWVuYW1lID0gY29uZmlnT2JqLnF1dG91dGlhby5nYW1lX25hbWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfa2V54oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iYW5uZXJMb2NhdGlvblN0cmluZ1RvRW51bShzdHI6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJob21lXCI6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYW5uZXJMb2NhdGlvbi5Ib21lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJnYW1lXCI6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYW5uZXJMb2NhdGlvbi5HYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJsZXZlbFwiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmFubmVyTG9jYXRpb24uTGV2ZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcInNraW5cIjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhbm5lckxvY2F0aW9uLlNraW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcInBhdXNlXCI6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYW5uZXJMb2NhdGlvbi5QYXVzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwib3ZlclwiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmFubmVyTG9jYXRpb24uT3ZlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhbm5lckxvY2F0aW9uLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5bCP57GzXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5pdF94aWFvbWkoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacrOWcsOmFjee9ruaVsOaNrjpcIiwgZGF0YSk7XHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmoueGlhb21pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnhpYW9taS5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnhpYW9taUNvbmZpZy5hcHBJRCA9IGNvbmZpZ09iai54aWFvbWkuYXBwX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoueGlhb21pLmludGVyc2l0aXRpYV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnhpYW9taUNvbmZpZy5pbnNlcnRJZCA9IGNvbmZpZ09iai54aWFvbWkuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGludGVyc2l0aXRpYV9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai54aWFvbWkudmlkZW9fcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54aWFvbWlDb25maWcudmlkZW9JZCA9IGNvbmZpZ09iai54aWFvbWkudmlkZW9fcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmlkZW9fcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai54aWFvbWkuYmFubmVyX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGlhb21pQ29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLnhpYW9taS5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoueGlhb21pLm5hdGl2ZV9iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54aWFvbWlDb25maWcubmF0aXZlQmFubmVySWRzID0gY29uZmlnT2JqLnhpYW9taS5uYXRpdmVfYmFubmVyX3Bvc19pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG5hdGl2ZV9iYW5uZXJfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnhpYW9taS5uYXRpdmVfdHJ5Z2FtZV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnhpYW9taUNvbmZpZy5uYXRpdmVUcnlHYW1lSWRzID0gY29uZmlnT2JqLnhpYW9taS5uYXRpdmVfdHJ5Z2FtZV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhuYXRpdmVfdHJ5Z2FtZV9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoueGlhb21pLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGlhb21pQ29uZmlnLm5hdGl2ZUluc2VydElkcyA9IGNvbmZpZ09iai54aWFvbWkubmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYbmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYeGlhb21p4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlnVjXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5pdF91YyhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIGlmIChjb25maWdPYmopIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai51Yykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai51Yy5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVjQ29uZmlnLmFwcElEID0gY29uZmlnT2JqLnVjLmFwcF9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGFwcF9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnVjLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVjQ29uZmlnLnZlcnNpb24gPSBjb25maWdPYmoudWMudmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHZlcnNpb27igJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai51Yy5zaGFyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnVjLnNoYXJlcy5zeV90aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSBjb25maWdPYmoudWMuc2hhcmVzLnN5X3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc2hhcmVUaXRsZeKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLnVjLnNoYXJlcy5zeV9pbWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlcmNvbmZpZy5zaGFyZUltZ1VybCA9IGNvbmZpZ09iai51Yy5zaGFyZXMuc3lfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc2hhcmVJbWdVcmzigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXPigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHVj4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlnVjXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5pdF9jb2NvcyhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIGlmIChjb25maWdPYmopIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5jb2Nvcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5jb2Nvcy5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvY29zQ29uZmlnLmFwcElEID0gY29uZmlnT2JqLmNvY29zLmFwcF9pZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGFwcF9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLmNvY29zLnZpZGVvX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29jb3NDb25maWcudmlkZW9JZCA9IGNvbmZpZ09iai5jb2Nvcy52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aWRlb19wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5jb2Nvcy5iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2Nvc0NvbmZpZy5iYW5uZXJJZCA9IGNvbmZpZ09iai5jb2Nvcy5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLmNvY29zLmludGVyc2l0aXRpYV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvY29zQ29uZmlnLmluc2VydElkID0gY29uZmlnT2JqLmNvY29zLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhpbnRlcnNpdGl0aWFfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnT2JqLmNvY29zLnNoYXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmouY29jb3Muc2hhcmVzLnN5X3RpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3RoZXJjb25maWcuc2hhcmVUaXRsZSA9IGNvbmZpZ09iai5jb2Nvcy5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlcy5zaGFyZVRpdGxl4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmouY29jb3Muc2hhcmVzLnN5X2ltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gY29uZmlnT2JqLmNvY29zLnNoYXJlcy5zeV9pbWc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlcy5zaGFyZUltZ1VybOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlc+KAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYY29jb3PigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgKiDliJ3lp4vljJbljp/nlJ/lronljZPlubPlj7BcclxuICAgKiBAcGFyYW0gZGF0YSDphY3nva5cclxuICAgKi9cclxuICAgIHByaXZhdGUgX2luaXRfbmF0aXZlX2FuZHJvaWQoKSB7XHJcbiAgICAgICAgaWYgKCF1dGlscy5Ub29sX05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhID0gdXRpbHMuVG9vbF9OYXRpdmUuZ2V0TmF0aXZlRGF0YSgpXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+WuieWNk+W5s+WPsOacrOWcsOmFjee9ruaVsOaNrjpcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3IgOiDlronljZPmnKzlnLDphY3nva7mlbDmja7phY3nva7plJnor6/vvIFcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZ09iaikge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBbmRyb2lkQ29uZmlnLmFwcElEID0gY29uZmlnT2JqLmFwcF9pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmoudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBbmRyb2lkQ29uZmlnLnZlcnNpb24gPSBjb25maWdPYmoudmVyc2lvbjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2ZXJzaW9u4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlQW5kcm9pZENvbmZpZy5jaGFubmVsID0gY29uZmlnT2JqLmNoYW5uZWw7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y6f55Sf5bmz5Y+w5rig6YGT5Y+3IGNoYW5uZWw9XCIgKyBjb25maWdPYmouY2hhbm5lbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluWOn+eUn0lPU1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbml0X25hdGl2ZV9pb3MoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacrOWcsOmFjee9ruaVsOaNrjpcIiwgZGF0YSk7XHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZ09iaikge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmlvcy5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSW9TQ29uZmlnLmFwcElEID0gY29uZmlnT2JqLmlvcy5hcHBfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYXBwX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmlvcy52aWRlb19wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSW9TQ29uZmlnLnZpZGVvSWQgPSBjb25maWdPYmouaW9zLnZpZGVvX3Bvc19pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJh2aWRlb19wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaW9zLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSW9TQ29uZmlnLnZlcnNpb24gPSBjb25maWdPYmouaW9zLnZlcnNpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5pb3MuYmFubmVyX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJb1NDb25maWcuYmFubmVySWQgPSBjb25maWdPYmouaW9zLmJhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5pb3MuaW50ZXJzaXRpdGlhX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJb1NDb25maWcuaW5zZXJ0SWQgPSBjb25maWdPYmouaW9zLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYaW50ZXJzaXRpdGlhX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiDliJ3lp4vljJZiaWxpXHJcbiAgICogQHBhcmFtIGRhdGEg6YWN572uXHJcbiAgICovXHJcbiAgICBwcml2YXRlIF9pbml0X2JpbGkoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacrOWcsOmFjee9ruaVsOaNrjpcIiwgZGF0YSk7XHJcbiAgICAgICAgbGV0IGNvbmZpZ09iajogYW55ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmJpbGkuc2hhcmVzLnN5X3RpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSBjb25maWdPYmouYmlsaS5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYc2hhcmVzLnN5X3RpdGxl4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouYmlsaS5zaGFyZXMuc3lfaW1nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gY29uZmlnT2JqLmJpbGkuc2hhcmVzLnN5X2ltZztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc3lfaW1n4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIOWIneWni+WMluW/q+aJi1xyXG4gICAqIEBwYXJhbSBkYXRhIOmFjee9rlxyXG4gICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5pdF9rd2FpKGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghZGF0YSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLmnKzlnLDphY3nva7mlbDmja46XCIsIGRhdGEpO1xyXG4gICAgICAgIGxldCBjb25maWdPYmo6IGFueSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWdPYmopIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5rd2FpLmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rd2FpQ29uZmlnLmFwcElEID0gY29uZmlnT2JqLmt3YWkuYXBwX2lkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGFwcF9pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5rd2FpLnZpZGVvX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rd2FpQ29uZmlnLnZpZGVvSWQgPSBjb25maWdPYmoua3dhaS52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmlkZW9fcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmt3YWkuaW50ZXJzaXRpdGlhX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rd2FpQ29uZmlnLmluc2VydElkID0gY29uZmlnT2JqLmt3YWkuaW50ZXJzaXRpdGlhX3Bvc19pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhpbnRlcnNpdGl0aWFfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmt3YWkudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rd2FpQ29uZmlnLnZlcnNpb24gPSBjb25maWdPYmoua3dhaS52ZXJzaW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHZlcnNpb27igJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmoua3dhaS5zaGFyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoua3dhaS5zaGFyZXMuc3lfdGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlVGl0bGUgPSBjb25maWdPYmoua3dhaS5zaGFyZXMuc3lfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc3lfdGl0bGXigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5rd2FpLnNoYXJlcy5zeV9pbWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyY29uZmlnLnNoYXJlSW1nVXJsID0gY29uZmlnT2JqLmt3YWkuc2hhcmVzLnN5X2ltZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlcy5zeV9pbWfigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5rd2FpLnNoYXJlcy5zeV9pY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlcmNvbmZpZy5zaGFyZUljb24gPSBjb25maWdPYmoua3dhaS5zaGFyZXMuc3lfaWNvbjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHNoYXJlcy5zeV9pY29uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWdPYmoua3dhaS5zaGFyZXMuc3lfZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3RoZXJjb25maWcuc2hhcmVEZXNjID0gY29uZmlnT2JqLmt3YWkuc2hhcmVzLnN5X2Rlc2M7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhzaGFyZXMuc3lfZGVzY+KAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYc2hhcmVz4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlmZhY2Vib29rXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDphY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5pdF9mYWNlYm9vayhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouZmFjZUJvb2suYXBwX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2VCb29rQ29uZmlnLmFwcElEID0gY29uZmlnT2JqLmZhY2VCb29rLmFwcF9pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouZmFjZUJvb2sudmlkZW9fcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2VCb29rQ29uZmlnLnZpZGVvSWQgPSBjb25maWdPYmouZmFjZUJvb2sudmlkZW9fcG9zX2lkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHZpZGVvX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5mYWNlQm9vay5pbnRlcnNpdGl0aWFfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2VCb29rQ29uZmlnLmluc2VydElkID0gY29uZmlnT2JqLmZhY2VCb29rLmludGVyc2l0aXRpYV9wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYaW50ZXJzaXRpdGlhX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5mYWNlQm9vay5iYW5uZXJfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2VCb29rQ29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLmZhY2VCb29rLmJhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYYmFubmVyX3Bvc19pZOKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouZmFjZUJvb2sudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNlQm9va0NvbmZpZy52ZXJzaW9uID0gY29uZmlnT2JqLmZhY2VCb29rLnZlcnNpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeaYr+WQiOazleeahGpzb27mlbDmja4hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJzdWNjZXNzXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNrumqjOivgeWujOaIkCFcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWSGFnb1xyXG4gICAgICogQHBhcmFtIGRhdGEg6YWN572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2luaXRfaGFnbyhkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaGFnby5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFnb0NvbmZpZy5hcHBJRCA9IGNvbmZpZ09iai5oYWdvLmFwcF9pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5oYWdvLnZpZGVvX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYWdvQ29uZmlnLnZpZGVvSWQgPSBjb25maWdPYmouaGFnby52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmlkZW9fcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaGFnby52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhZ29Db25maWcudmVyc2lvbiA9IGNvbmZpZ09iai5oYWdvLnZlcnNpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmVyc2lvbuKAmeWtl+aute+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3mmK/lkIjms5XnmoRqc29u5pWw5o2uIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZIdWF3ZWlcclxuICAgICAqIEBwYXJhbSBkYXRhIOmFjee9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbml0X2h1YXdlaShkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5pys5Zyw6YWN572u5pWw5o2uOlwiLCBkYXRhKTtcclxuICAgICAgICBsZXQgY29uZmlnT2JqOiBhbnkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaHVhd2VpLmFwcF9pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odWF3ZWlDb25maWcuYXBwSUQgPSBjb25maWdPYmouaHVhd2VpLmFwcF9pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhhcHBfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5odWF3ZWkudmlkZW9fcG9zX2lkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh1YXdlaUNvbmZpZy52aWRlb0lkID0gY29uZmlnT2JqLmh1YXdlaS52aWRlb19wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdmlkZW9fcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaHVhd2VpLmJhbm5lcl9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHVhd2VpQ29uZmlnLmJhbm5lcklkID0gY29uZmlnT2JqLmh1YXdlaS5iYW5uZXJfcG9zX2lkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmGJhbm5lcl9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iai5odWF3ZWkubmF0aXZlX2Jhbm5lcl9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHVhd2VpQ29uZmlnLm5hdGl2ZUJhbm5lcklkcyA9IGNvbmZpZ09iai5odWF3ZWkubmF0aXZlX2Jhbm5lcl9wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYbmF0aXZlX2Jhbm5lcl9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaHVhd2VpLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX3Bvc19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odWF3ZWlDb25maWcubmF0aXZlSW5zZXJ0SWRzID0gY29uZmlnT2JqLmh1YXdlaS5uYXRpdmVfaW50ZXJzaXRpdGlhbF9wb3NfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYbmF0aXZlX2ludGVyc2l0aXRpYWxfcG9zX2lk4oCZ5a2X5q6177yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmh1YXdlaS5uYXRpdmVfdHJ5Z2FtZV9wb3NfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHVhd2VpQ29uZmlnLm5hdGl2ZVRyeUdhbWVJZHMgPSBjb25maWdPYmouaHVhd2VpLm5hdGl2ZV90cnlnYW1lX3Bvc19pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJlcnJvclwiICsgXCLmnKzlnLDphY3nva7mlbDmja7kuI3ljIXlkKvigJhuYXRpdmVfdHJ5Z2FtZV9wb3NfaWTigJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWdPYmouaHVhd2VpLm5hdGl2ZV9zcGxhc2hfaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHVhd2VpQ29uZmlnLm5hdGl2ZVNwbGFzaElkID0gY29uZmlnT2JqLmh1YXdlaS5uYXRpdmVfc3BsYXNoX2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmG5hdGl2ZV9zcGxhc2hfaWTigJnlrZfmrrXvvIFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmh1YXdlaS51bWVuZ19pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odWF3ZWlDb25maWcudW1lbmdJZCA9IGNvbmZpZ09iai5odWF3ZWkudW1lbmdfaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5YyF5ZCr4oCYdW1lbmdfaWTigJnlrZfmrrUs5LiN5ZCv55So5Y+L55uf57uf6K6h77yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqLmh1YXdlaS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh1YXdlaUNvbmZpZy52ZXJzaW9uID0gY29uZmlnT2JqLmh1YXdlaS52ZXJzaW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcImVycm9yXCIgKyBcIuacrOWcsOmFjee9ruaVsOaNruS4jeWMheWQq+KAmHZlcnNpb27igJnlrZfmrrXvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiZXJyb3JcIiArIFwi5pys5Zyw6YWN572u5pWw5o2u5LiN5piv5ZCI5rOV55qEanNvbuaVsOaNriFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19