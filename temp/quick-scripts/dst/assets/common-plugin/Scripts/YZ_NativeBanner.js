
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_NativeBanner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2a680a5EJDfKlZKlM8P3Vv', 'YZ_NativeBanner');
// common-plugin/Scripts/YZ_NativeBanner.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var CompatibleTool_1 = require("./CompatibleTool");
var EventAdInfo_1 = require("./YouWanSDK/EventAdInfo");
var YouWanAnalytics_1 = require("./YouWanSDK/YouWanAnalytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_NativeBanner = /** @class */ (function (_super) {
    __extends(YZ_NativeBanner, _super);
    function YZ_NativeBanner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._icon = null;
        _this._hW_icon = null;
        _this._sourceLable = null;
        _this._titleLabel = null;
        _this._desLabel = null;
        _this._btnLabel = null;
        _this._widget = null;
        _this._closeBtn = null;
        _this._nativeAd = null;
        _this._data = null;
        _this._dataDirty = false;
        _this._panel_widget = null;
        _this._closeBtn_widget = null;
        _this._mask_widget = null;
        _this._st_Panel = null;
        _this._st_Icon = null;
        _this._st_TitleLabel = null;
        _this._st_DesLabel = null;
        _this._st_BtnLabel = null;
        _this._st_Widget = null;
        _this._st_Img = null;
        _this._st_CloseBtn = null;
        _this._st_BtnDown = null;
        _this._st_adMask = null;
        _this._st_down_btn_default_img = null;
        _this.nativeBannerInfo = null;
        _this._st_TitleLabel_Widget = null;
        _this._st_DesLabel_Widget = null;
        _this._st_Img_Widget = null;
        _this._st_CloseBtn_Widget = null;
        _this._st_BtnDown_Widget = null;
        _this._st_adMask_Widget = null;
        _this._st_Icon_widget = null;
        _this._bg_mask = null;
        _this._alignType = "";
        _this._xmMask = null;
        return _this;
    }
    Object.defineProperty(YZ_NativeBanner.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    YZ_NativeBanner.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        cc.game.addPersistRootNode(this.node);
        this._panel = this.node.getChildByName("Panel");
        this._icon = this._panel.getChildByName("Icon").getComponent(cc.Sprite);
        this._hW_icon = this._panel.getChildByName("HuaweiIcon").getComponent(cc.Sprite);
        this._titleLabel = this._panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._desLabel = this._panel.getChildByName("DesLabel").getComponent(cc.Label);
        this._sourceLable = this._panel.getChildByName("source").getComponent(cc.Label);
        var btnDown = this._panel.getChildByName("Btn_Download");
        this._btnLabel = btnDown.getComponentInChildren(cc.Label);
        this._widget = this.getComponent(cc.Widget);
        this._panel_widget = this._panel.getComponent(cc.Widget);
        this._closeBtn = this._panel.getChildByName("Btn_Close");
        this._closeBtn_widget = this._closeBtn.getComponent(cc.Widget);
        this._mask_widget = this._panel.getChildByName("Mask").getComponent(cc.Widget);
        this._widget.left = 0;
        this._widget.right = 0;
        this._widget.bottom = 0;
        this._st_Panel = this.node.getChildByName("Panel_Statement");
        this._st_Widget = this._st_Panel.getComponent(cc.Widget);
        this._bg_mask = this.node.getChildByName("bgMask");
        this._st_Icon = this._st_Panel.getChildByName("IconMask").getChildByName("Icon").getComponent(cc.Sprite);
        this._st_TitleLabel = this._st_Panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._st_DesLabel = this._st_Panel.getChildByName("DesLabel").getComponent(cc.Label);
        this._st_BtnDown = this._st_Panel.getChildByName("Btn_Download");
        // this._st_BtnLabel = stBtnDown.getComponentInChildren(cc.Label);
        this._st_Img = this._st_Panel.getChildByName("adImage").getComponent(cc.Sprite);
        this._st_CloseBtn = this._st_Panel.getChildByName("Btn_Close");
        this._st_adMask = this._st_Panel.getChildByName("Mask");
        this._st_down_btn_default_img = this._st_BtnDown.getComponent(cc.Sprite).spriteFrame;
        this._st_TitleLabel_Widget = this._st_TitleLabel.getComponent(cc.Widget);
        this._st_DesLabel_Widget = this._st_DesLabel.getComponent(cc.Widget);
        this._st_Img_Widget = this._st_Img.getComponent(cc.Widget);
        this._st_CloseBtn_Widget = this._st_CloseBtn.getComponent(cc.Widget);
        this._st_BtnDown_Widget = this._st_BtnDown.getComponent(cc.Widget);
        this._st_adMask_Widget = this._st_adMask.getComponent(cc.Widget);
        this._st_Icon_widget = this._st_Panel.getChildByName("IconMask").getComponent(cc.Widget);
        if (PlatUtils_1.default.IsXiaoMi || CC_DEBUG) {
            this._panel.getChildByName("Xm_Mark").active = true;
            this._mask_widget.node.active = false;
        }
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this._widget.left = cc.winSize.width * 0.25;
            this._widget.right = cc.winSize.width * 0.25;
            this._titleLabel.node.width = 400;
            ratio = cc.winSize.width / 1920;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this.node.scale = ratio;
    };
    YZ_NativeBanner.prototype.onShow = function () {
        cc.game.emit("HuaWeiOnShow");
    };
    YZ_NativeBanner.prototype.onEnable = function () {
        var _this = this;
        this._st_Panel.targetOff(this);
        this._panel.targetOff(this);
        cc.game.targetOff(this);
        if (PlatUtils_1.default.IsHuaWei) {
            console.log("注册监听事件 >>>>>.");
            cc.game.on(cc.game.EVENT_SHOW, function () {
                console.log("HuaWeiOnShow >>>>>>");
                _this._reportAdShow();
            }, this);
        }
        if (PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsVIVO || PlatUtils_1.default.IsHuaWei || PlatUtils_1.default.IsXiaoMi) {
            this._st_Panel.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this._reportAdClick();
            }, this);
            this._panel.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this._reportAdClick();
            }, this);
            cc.game.on(YZ_Constant_1.default.YZ_NativeAdClick, function () {
                _this._reportAdClick();
            }, this);
        }
    };
    YZ_NativeBanner.prototype.onDisable = function () {
        if (PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsVIVO || PlatUtils_1.default.IsHuaWei || PlatUtils_1.default.IsXiaoMi) {
            this._st_Panel.targetOff(this);
            this._panel.targetOff(this);
        }
        cc.game.targetOff(this);
    };
    YZ_NativeBanner.prototype.init = function (nativeAd, data, nativeBannerInfo) {
        this._nativeAd = nativeAd;
        this._data = data;
        this._dataDirty = true;
        this.nativeBannerInfo = nativeBannerInfo;
        // this.nativeBannerInfo.banner_show_height = 500;
        // this.nativeBannerInfo.st_banner_style = 1;
        // this.nativeBannerInfo.st_banner_down_but_show = 2;
        // this.nativeBannerInfo.show_st_banner = "true";
        // this.nativeBannerInfo.st_banner_width = 800;
        // this.nativeBannerInfo.st_banner_height = 300;
        if (this.nativeBannerInfo.show_st_banner == "true") {
            if (this.nativeBannerInfo.st_banner_style > -1) {
                if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                    this._panel.active = false;
                    this._st_Panel.active = true;
                }
                else {
                    this._panel.active = false;
                    this._st_Panel.active = false;
                }
            }
            else {
                this._panel.active = false;
                this._st_Panel.active = true;
            }
        }
        else {
            this._panel.active = true;
            this._st_Panel.active = false;
        }
        // if(this.nativeBannerInfo._alignType === "top")
        // {
        // this._widget.top = 0;
        // this._widget.isAlignTop = true;
        // this._widget.isAlignBottom = false;
        // this._widget.updateAlignment();
        // }
        // utils.showLog("当前显示位置为:", this.nativeBannerInfo.location, ">>显示参数为：", this.nativeBannerInfo.toStrong());
    };
    YZ_NativeBanner.prototype.update = function (dt) {
        if (this._data && this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
        if (!this._data) {
            this._st_Panel.active = false;
            this._panel.active = false;
        }
    };
    YZ_NativeBanner.prototype._updateContent = function () {
        var _this = this;
        if (this._data) {
            // 上报展示
            this._reportAdShow();
            if (PlatUtils_1.default.IsHuaWei) {
                this._data.icon = "";
            }
            Utils_1.utils.nativeBannerShowCount++;
            if (this.nativeBannerInfo.show_st_banner == "true" && this.nativeBannerInfo.st_banner_style > -1) {
                if (this.nativeBannerInfo.st_banner_style == 1 || this.nativeBannerInfo.st_banner_style == 2) {
                    if (this.nativeBannerInfo.st_banner_width > -1) {
                        this._st_Panel.width = this.nativeBannerInfo.st_banner_width;
                    }
                    else {
                        this._st_Panel.width = 821.4;
                    }
                    if (this.nativeBannerInfo.st_banner_height > -1) {
                        this._st_Panel.height = this.nativeBannerInfo.st_banner_height;
                    }
                    else {
                        this._st_Panel.height = 589;
                    }
                    this._st_Widget.updateAlignment();
                    this._st_adMask_Widget.updateAlignment();
                    this._st_CloseBtn_Widget.updateAlignment();
                    this._st_BtnDown_Widget.updateAlignment();
                    this._st_Icon_widget.updateAlignment();
                }
                else {
                    this._st_Panel.width = 821.4;
                    this._st_Panel.height = 589;
                    this._st_Widget.updateAlignment();
                    this._st_adMask_Widget.updateAlignment();
                    this._st_CloseBtn_Widget.updateAlignment();
                    this._st_BtnDown_Widget.updateAlignment();
                    this._st_Icon_widget.updateAlignment();
                }
                if (this.nativeBannerInfo.st_banner_style == 0 || this.nativeBannerInfo.st_banner_style == 1) {
                    Utils_1.utils.showLog("//单图片样式，拉伸图片，并且隐藏标题和描述");
                    this._st_Img_Widget.top = 0;
                    this._st_Img_Widget.bottom = 0;
                    this._st_Img_Widget.isAlignTop = true;
                    this._st_Img_Widget.isAlignBottom = true;
                    this._st_Img_Widget.updateAlignment();
                    this._st_DesLabel.node.active = false;
                    this._st_TitleLabel.node.active = false;
                    this._st_Icon_widget.updateAlignment();
                }
                else if (this.nativeBannerInfo.st_banner_style == 2) {
                    Utils_1.utils.showLog("默认样式自定义宽高:展示标题和描述");
                    this._st_DesLabel.node.active = true;
                    this._st_TitleLabel.node.active = true;
                    this._st_DesLabel_Widget.updateAlignment();
                    this._st_TitleLabel_Widget.updateAlignment();
                    this._st_Img_Widget.isAlignTop = true;
                    this._st_Img_Widget.isAlignBottom = true;
                    this._st_Img_Widget.top = this._st_TitleLabel.node.height + this._st_TitleLabel_Widget.top;
                    this._st_Img_Widget.bottom = this._st_DesLabel_Widget.node.height + this._st_DesLabel_Widget.bottom;
                    this._st_Img_Widget.updateAlignment();
                    this._st_Icon_widget.updateAlignment();
                }
                else {
                    this._st_Img_Widget.isAlignTop = true;
                    this._st_Img_Widget.isAlignBottom = true;
                    this._st_Img_Widget.updateAlignment();
                    this._st_DesLabel.node.active = true;
                    this._st_TitleLabel.node.active = true;
                    this._st_Icon_widget.updateAlignment();
                }
            }
            else if (this.nativeBannerInfo.show_st_banner == "true") {
                Utils_1.utils.showLog("结算banner使用默认样式！");
                this._st_Panel.width = 821.4;
                this._st_Panel.height = 589;
                this._st_Img_Widget.isAlignTop = false;
                this._st_Img_Widget.isAlignBottom = false;
                this._st_Img_Widget.updateAlignment();
                this._st_DesLabel.node.active = true;
                this._st_TitleLabel.node.active = true;
                this._st_Widget.updateAlignment();
                this._st_adMask_Widget.updateAlignment();
                this._st_CloseBtn_Widget.updateAlignment();
                this._st_BtnDown_Widget.updateAlignment();
                this._st_Icon_widget.updateAlignment();
            }
            this._st_CloseBtn.scale = this.nativeBannerInfo.st_banner_scale < 1 ? this._st_CloseBtn.scale * this.nativeBannerInfo.st_banner_scale : 1;
            this._st_adMask.scale = this.nativeBannerInfo.st_banner_scale < 1 ? this._st_adMask.scale * this.nativeBannerInfo.st_banner_scale : 1;
            this._st_CloseBtn.active = this.nativeBannerInfo.st_banner_close_but_show == "true";
            this._st_CloseBtn.opacity = this.nativeBannerInfo.st_banner_close_but_alpha;
            if (this.ServerConfig.first_native_banner_delayed_count_close) {
                if (Utils_1.utils.nativeBannerShowCount > 3 && this.ServerConfig.first_native_banner_delayed_count_close) {
                    Utils_1.utils.nativeBannerResizeCloseBtnShowCount++;
                    if (Utils_1.utils.nativeBannerResizeCloseBtnShowCount % this.ServerConfig.native_banner_delayed_count_close == 0) {
                        Utils_1.utils.showLog("\u539F\u751Fbanner\u5173\u95ED\u6309\u94AE\u8BBE\u7F6E\u670D\u52A1\u5668\u914D\u7F6E\u5927\u5C0F" + this.ServerConfig.intersititia_close_but_size);
                        if (this.nativeBannerInfo.st_banner_close_but_range) {
                            this._st_CloseBtn.setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_range, this.nativeBannerInfo.st_banner_close_but_range));
                            this._st_CloseBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_size, this.nativeBannerInfo.st_banner_close_but_size));
                        }
                    }
                }
            }
            else {
                if (this.nativeBannerInfo.st_banner_close_but_range) {
                    this._st_CloseBtn.setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_range, this.nativeBannerInfo.st_banner_close_but_range));
                    this._st_CloseBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_size, this.nativeBannerInfo.st_banner_close_but_size));
                }
            }
            if (this.nativeBannerInfo.st_banner_down_but_show) {
                this._st_BtnDown.active = true;
                if (this.nativeBannerInfo.st_banner_down_btn_image) {
                    Utils_1.utils.showLog("this.nativeBannerInfo.st_banner_down_btn_image", this.nativeBannerInfo.st_banner_down_btn_image);
                    CompatibleTool_1.default.LoadRes(this.nativeBannerInfo.st_banner_down_btn_image, function (err, res) {
                        if (!err && cc.isValid(_this) && _this._st_BtnDown) {
                            _this._st_BtnDown.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
                            if (_this.nativeBannerInfo.st_banner_down_but_margin_top) {
                                _this._st_BtnDown_Widget.top = -(_this._st_BtnDown.getContentSize().height + _this.nativeBannerInfo.st_banner_down_but_margin_top);
                                _this._st_BtnDown_Widget.updateAlignment();
                            }
                            else {
                                _this._st_BtnDown_Widget.top = -_this._st_BtnDown.getContentSize().height;
                                _this._st_BtnDown_Widget.updateAlignment();
                            }
                        }
                    });
                }
                else {
                    this._st_BtnDown.getComponent(cc.Sprite).spriteFrame = this._st_down_btn_default_img;
                    if (this.nativeBannerInfo.st_banner_down_but_margin_top) {
                        this._st_BtnDown_Widget.top -= this.nativeBannerInfo.st_banner_down_but_margin_top;
                        this._st_BtnDown_Widget.updateAlignment();
                    }
                }
                if (this.nativeBannerInfo.st_banner_down_but_show == 2) {
                    this._st_BtnDown.runAction(cc.sequence(cc.scaleTo(0.3, 1.2), cc.scaleTo(0.3, 1)).repeatForever());
                }
                else {
                    this._st_BtnDown.stopAllActions();
                }
                this._st_BtnDown.scale = this.node.scale;
            }
            else {
                this._st_BtnDown.active = false;
                this._st_BtnDown.stopAllActions();
            }
            this._closeBtn.active = this.nativeBannerInfo.banner_close_but_show == "true";
            this._closeBtn.opacity = this.nativeBannerInfo.banner_close_but_alpha;
            if (this.ServerConfig.first_native_banner_delayed_count_close) {
                if (Utils_1.utils.nativeBannerShowCount > 3 && this.ServerConfig.first_native_banner_delayed_count_close) {
                    if (Utils_1.utils.nativeBannerResizeCloseBtnShowCount % this.ServerConfig.native_banner_delayed_count_close == 0) {
                        Utils_1.utils.showLog("\u539F\u751Fbanner\u5173\u95ED\u6309\u94AE\u8BBE\u7F6E\u670D\u52A1\u5668\u914D\u7F6E\u5927\u5C0F" + this.ServerConfig.intersititia_close_but_size);
                        this._closeBtn.setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_range, this.nativeBannerInfo.banner_close_but_range));
                        this._closeBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_size, this.nativeBannerInfo.banner_close_but_size));
                    }
                }
            }
            else {
                this._closeBtn.setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_range, this.nativeBannerInfo.banner_close_but_range));
                this._closeBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_size, this.nativeBannerInfo.banner_close_but_size));
            }
            if (this.nativeBannerInfo.show_st_banner == "false") {
                // this.node.setContentSize(cc.size(this.node.getContentSize().width,));
                this._panel_widget.isAlignTop = false;
                this._panel_widget.bottom = 0;
                this._panel.setContentSize(cc.size(this.node.getContentSize().width, this.nativeBannerInfo.banner_show_height < 160 ? 160 : this.nativeBannerInfo.banner_show_height));
                this._panel_widget.updateAlignment();
                this._closeBtn_widget.updateAlignment();
                this._mask_widget.updateAlignment();
            }
            else {
                //缩放
                this._st_Panel.scale = this.nativeBannerInfo.st_banner_scale ? this.nativeBannerInfo.st_banner_scale : 1;
                this._st_Widget.bottom = this.nativeBannerInfo.st_banner_bottom ? this.nativeBannerInfo.st_banner_bottom : 0;
                this._st_Widget.updateAlignment();
            }
            if (this.nativeBannerInfo._alignType === "top") {
                if (this.nativeBannerInfo.show_st_banner == "true") {
                    this.node.height = this._st_Panel.height;
                    this.node.width = this._st_Panel.width;
                    this._st_CloseBtn_Widget.updateAlignment();
                    this._st_adMask_Widget.updateAlignment();
                }
                else {
                    this.node.height = this.nativeBannerInfo.banner_show_height < 160 ? 160 : this.nativeBannerInfo.banner_show_height;
                    this._panel_widget.updateAlignment();
                    this._closeBtn_widget.updateAlignment();
                    this._mask_widget.updateAlignment();
                }
                this._widget.isAlignTop = true;
                // this._widget.top = 0;
                this._widget.isAlignBottom = false;
                this._widget.updateAlignment();
            }
            if (this.nativeBannerInfo.show_st_banner == "true") {
                Utils_1.utils.showLog("服务器配置显示为结算banner >>>>>");
                if (this.nativeBannerInfo.st_banner_bg_mask_opacity > 0) {
                    this._bg_mask.opacity = this.nativeBannerInfo.st_banner_bg_mask_opacity;
                    this._bg_mask.setContentSize(cc.size(this.node.getContentSize().width, this._st_Panel.height));
                    this._st_adMask.active = false;
                }
                else {
                    this._bg_mask.active = false;
                }
                // 居底部距离
                this._st_TitleLabel.string = this._data.title ? this._data.title : "";
                this._st_DesLabel.string = this._data.desc ? this._data.desc : "";
                // this._data.imgUrlList = null;
                // this._st_BtnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
                if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                    // 有图片，优先显示图片
                    this._st_Icon.node.active = false;
                    this._st_Img.node.active = true;
                    CompatibleTool_1.default.LoadRes(this._data.imgUrlList[0], function (err, res) {
                        if (!err && cc.isValid(_this) && _this._st_Img) {
                            _this._st_Img.spriteFrame = new cc.SpriteFrame(res);
                        }
                    });
                }
                else if (PlatUtils_1.default.IsOPPO && this._data.iconUrlList && this._data.iconUrlList.length > 0) {
                    // 有icon
                    this._st_Icon.node.active = true;
                    this._st_Img.node.active = false;
                    if (this.nativeBannerInfo.st_banner_style == 0 || this.nativeBannerInfo.st_banner_style == 1) {
                        Utils_1.utils.showLog("单图片样式-没有大图，显示默认原生样式banner");
                        this._titleLabel.string = this._data.title;
                        this._desLabel.string = this._data.desc;
                        this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
                        var iconUrl = PlatUtils_1.default.IsOPPO ? this._data.iconUrlList[0] : this._data.icon;
                        CompatibleTool_1.default.LoadRes(iconUrl, function (err, res) {
                            if (!err && cc.isValid(_this) && _this._icon) {
                                _this._icon.spriteFrame = new cc.SpriteFrame(res);
                            }
                        });
                        this._st_Panel.active = false;
                        this._panel.active = true;
                    }
                    else {
                        CompatibleTool_1.default.LoadRes(this._data.iconUrlList[0], function (err, res) {
                            if (!err && cc.isValid(_this) && _this._st_Icon) {
                                _this._st_Icon.spriteFrame = new cc.SpriteFrame(res);
                            }
                        });
                    }
                }
                else if ((PlatUtils_1.default.IsVIVO || PlatUtils_1.default.IsHuaWei) && this._data.icon) {
                    // 有icon
                    this._st_Icon.node.active = true;
                    this._st_Img.node.active = false;
                    CompatibleTool_1.default.LoadRes(this._data.icon, function (err, res) {
                        if (!err && cc.isValid(_this) && _this._st_Icon) {
                            _this._st_Icon.spriteFrame = new cc.SpriteFrame(res);
                        }
                    });
                }
            }
            else {
                this._titleLabel.string = this._data.title ? this._data.title : "";
                this._desLabel.string = this._data.desc ? this._data.desc : "";
                this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
                if (PlatUtils_1.default.IsHuaWei) {
                    this._sourceLable.string = this._data.source ? this._data.source : "";
                    this._panel.getChildByName("Hw_Mark").active = true;
                    this._mask_widget.node.active = false;
                }
                var iconUrl = "";
                if (PlatUtils_1.default.IsOPPO) {
                    iconUrl = this._data.iconUrlList[0];
                }
                else {
                    iconUrl = this._data.icon;
                }
                if (iconUrl) {
                    CompatibleTool_1.default.LoadRes(iconUrl, function (err, res) {
                        if (!err && cc.isValid(_this) && _this._icon) {
                            _this._icon.spriteFrame = new cc.SpriteFrame(res);
                        }
                    });
                }
                else {
                    if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                        CompatibleTool_1.default.LoadRes(this._data.imgUrlList[0], function (err, res) {
                            if (!err && cc.isValid(_this) && _this._icon) {
                                if (PlatUtils_1.default.IsHuaWei) {
                                    _this._icon.node.active = false;
                                    _this._hW_icon.node.active = true;
                                    _this._hW_icon.spriteFrame = new cc.SpriteFrame(res);
                                }
                                else {
                                    _this._icon.spriteFrame = new cc.SpriteFrame(res);
                                }
                            }
                        });
                    }
                }
            }
            // this.nativeBannerInfo.banner_close_but_range = 20;
            // this.nativeBannerInfo.banner_close_but_size = 50;
            if (PlatUtils_1.default.IsHuaWei) {
                this._closeBtn.setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_range, this.nativeBannerInfo.banner_close_but_range));
                this._closeBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_size, this.nativeBannerInfo.banner_close_but_size));
            }
            // this.nativeBannerInfo.st_banner_down_but_margin_top = -500;
            if (this.nativeBannerInfo.st_banner_down_but_margin_top != 0) {
                this._st_BtnDown_Widget.top = this.nativeBannerInfo.st_banner_down_but_margin_top;
                this._st_BtnDown_Widget.updateAlignment();
            }
            if (this.nativeBannerInfo.st_banner_down_but_show > 0) {
                this._st_BtnDown.active = true;
                if (this.nativeBannerInfo.st_banner_down_but_show === 2) {
                    this._st_BtnDown.runAction(cc.sequence(cc.scaleTo(0.3, 1.3), cc.scaleTo(0.3, 1)).repeatForever());
                }
                else {
                    this._st_BtnDown.stopAllActions();
                }
            }
            else {
                this._st_BtnDown.active = false;
                this._st_BtnDown.stopAllActions();
            }
        }
    };
    YZ_NativeBanner.prototype.onBtnClickHandler = function (event, data) {
        switch (event.target.name) {
            case "Btn_Close": {
                this.node.active = false;
                if (PlatUtils_1.default.IsOPPO) {
                    Utils_1.utils.oppoTool.countBannerCloseCount();
                }
                Utils_1.utils._bannerCloseTime = new Date().getTime();
                break;
            }
            case "Btn_Download":
            case "bgMask": {
                this._reportAdClick();
                break;
            }
        }
    };
    YZ_NativeBanner.prototype._reportAdShow = function () {
        if (this._data) {
            if (this._nativeAd) {
                if (!this._data.isReportShow || PlatUtils_1.default.IsHuaWei) {
                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(this._data.adId));
                    this._data.isReportShow = true;
                    Utils_1.utils.showLog("上报原生广告条展示！adId:" + this._data.adId);
                    this._nativeAd.reportAdShow({
                        adId: this._data.adId
                    });
                    Utils_1.utils.SendEvent("上报原生Banner广告展示,位置:" + this.nativeBannerInfo.location);
                }
                else {
                    Utils_1.utils.showLog("当前广告已经过上报展示！adId:" + this._data.adId, "，当前不做上报");
                }
            }
        }
    };
    YZ_NativeBanner.prototype._reportAdClick = function () {
        if (this._data) {
            Utils_1.utils.showLog("上报原生广告条点击! adId:" + this._data.adId);
            if (this._nativeAd) {
                if (!this._data.isReportClick || PlatUtils_1.default.IsHuaWei) {
                    YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_BANNER, EventAdInfo_1.YwAdStatus.CLICK, new EventAdInfo_1.AdEventParameter(this._data.adId));
                    this._data.isReportClick = true;
                    this._nativeAd.reportAdClick({
                        adId: this._data.adId,
                        isAutoDownload: true
                    });
                    if (PlatUtils_1.default.IsHuaWei) {
                        this.downLoadAd();
                    }
                }
                this._data = null;
                if (this.nativeBannerInfo.banner_click_refresh == "true" && !PlatUtils_1.default.IsHuaWei) {
                    Utils_1.utils.showLog("点击之后-先隐藏广告-再刷新广告条！");
                    Utils_1.utils.adManager.HideBanner(this.nativeBannerInfo.location);
                    // 刷新banner
                    Utils_1.utils.adManager.ShowBanner(this.nativeBannerInfo.location, { isRefresh: true });
                }
                else {
                    cc.game.targetOff(this);
                    this.node.active = false;
                }
            }
        }
    };
    YZ_NativeBanner.prototype.downLoadAd = function () {
        return;
        var resultCode = this._nativeAd.startDownload({
            adId: this._data.adId
        });
        Utils_1.utils.showLog('原生广告主动下载 resumeDownloadresultCode = ' + resultCode);
    };
    YZ_NativeBanner = __decorate([
        ccclass
    ], YZ_NativeBanner);
    return YZ_NativeBanner;
}(cc.Component));
exports.default = YZ_NativeBanner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTmF0aXZlQmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFDaEMsNkNBQTREO0FBRTVELG1EQUE4QztBQUM5Qyx1REFBaUY7QUFDakYsK0RBQTBEO0FBRXBELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBcW5CQztRQW5uQkcsWUFBTSxHQUFZLElBQUksQ0FBQztRQUN2QixXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ3hCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFFM0Isa0JBQVksR0FBYSxJQUFJLENBQUE7UUFDN0IsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFDMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFdBQUssR0FBUSxJQUFJLENBQUM7UUFDbEIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFDaEMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBQ25DLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRS9CLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUMzQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUM5QixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUM5QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUM3QixhQUFPLEdBQWMsSUFBSSxD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SSxFQUFFLENBQUMsQ0FBQztpQkFDbkY7cUJBQU07b0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDNUI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxPQUFPO1FBQ1AsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDNUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUN4QixDQUFDLENBQUE7UUFDRixhQUFLLENBQUMsT0FBTyxDQUFDLHNDQUFzQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFwbkJnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBcW5CbkM7SUFBRCxzQkFBQztDQXJuQkQsQUFxbkJDLENBcm5CNEMsRUFBRSxDQUFDLFNBQVMsR0FxbkJ4RDtrQkFybkJvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVCYW5uZXJJbmZvIH0gZnJvbSBcIi4vQ29tbW9uQ29uZmlnXCI7XHJcbmltcG9ydCBDb21wYXRpYmxlVG9vbCBmcm9tIFwiLi9Db21wYXRpYmxlVG9vbFwiO1xyXG5pbXBvcnQgeyBZd0FkVHlwZSwgWXdBZFN0YXR1cywgQWRFdmVudFBhcmFtZXRlciB9IGZyb20gXCIuL1lvdVdhblNESy9FdmVudEFkSW5mb1wiO1xyXG5pbXBvcnQgWW91V2FuQW5hbHl0aWNzIGZyb20gXCIuL1lvdVdhblNESy9Zb3VXYW5BbmFseXRpY3NcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9OYXRpdmVCYW5uZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIF9oV19pY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIF9zb3VyY2VMYWJsZTogY2MuTGFiZWwgPSBudWxsXHJcbiAgICBfdGl0bGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgX2Rlc0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBfYnRuTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIF93aWRnZXQ6IGNjLldpZGdldCA9IG51bGw7XHJcbiAgICBfY2xvc2VCdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX25hdGl2ZUFkOiBhbnkgPSBudWxsO1xyXG4gICAgX2RhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfcGFuZWxfd2lkZ2V0OiBjYy5XaWRnZXQgPSBudWxsO1xyXG4gICAgX2Nsb3NlQnRuX3dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuICAgIF9tYXNrX3dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuXHJcbiAgICBfc3RfUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX3N0X0ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBfc3RfVGl0bGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgX3N0X0Rlc0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBfc3RfQnRuTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIF9zdF9XaWRnZXQ6IGNjLldpZGdldCA9IG51bGw7XHJcbiAgICBfc3RfSW1nOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgX3N0X0Nsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9zdF9CdG5Eb3duOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9zdF9hZE1hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX3N0X2Rvd25fYnRuX2RlZmF1bHRfaW1nOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBuYXRpdmVCYW5uZXJJbmZvOiBOYXRpdmVCYW5uZXJJbmZvID0gbnVsbDtcclxuICAgIF9zdF9UaXRsZUxhYmVsX1dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuICAgIF9zdF9EZXNMYWJlbF9XaWRnZXQ6IGNjLldpZGdldCA9IG51bGw7XHJcbiAgICBfc3RfSW1nX1dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuICAgIF9zdF9DbG9zZUJ0bl9XaWRnZXQ6IGNjLldpZGdldCA9IG51bGw7XHJcbiAgICBfc3RfQnRuRG93bl9XaWRnZXQ6IGNjLldpZGdldCA9IG51bGw7XHJcbiAgICBfc3RfYWRNYXNrX1dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuICAgIF9zdF9JY29uX3dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuICAgIF9iZ19tYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9hbGlnblR5cGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBfeG1NYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IFNlcnZlckNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdXRpbHMuU2VydmVyQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX2ljb24gPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5faFdfaWNvbiA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiSHVhd2VpSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLl90aXRsZUxhYmVsID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJUaXRsZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fZGVzTGFiZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkRlc0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlTGFibGUgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcInNvdXJjZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICBsZXQgYnRuRG93biA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0Rvd25sb2FkXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0bkxhYmVsID0gYnRuRG93bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl93aWRnZXQgPSB0aGlzLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHRoaXMuX3BhbmVsX3dpZGdldCA9IHRoaXMuX3BhbmVsLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG5cclxuICAgICAgICB0aGlzLl9jbG9zZUJ0biA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0Nsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlQnRuX3dpZGdldCA9IHRoaXMuX2Nsb3NlQnRuLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHRoaXMuX21hc2tfd2lkZ2V0ID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJNYXNrXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldC5sZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLl93aWRnZXQucmlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldC5ib3R0b20gPSAwO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fc3RfUGFuZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbF9TdGF0ZW1lbnRcIik7XHJcbiAgICAgICAgdGhpcy5fc3RfV2lkZ2V0ID0gdGhpcy5fc3RfUGFuZWwuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2JnX21hc2sgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ01hc2tcIilcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLl9zdF9JY29uID0gdGhpcy5fc3RfUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJJY29uTWFza1wiKS5nZXRDaGlsZEJ5TmFtZShcIkljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5fc3RfVGl0bGVMYWJlbCA9IHRoaXMuX3N0X1BhbmVsLmdldENoaWxkQnlOYW1lKFwiVGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3N0X0Rlc0xhYmVsID0gdGhpcy5fc3RfUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJEZXNMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3N0X0J0bkRvd24gPSB0aGlzLl9zdF9QYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkJ0bl9Eb3dubG9hZFwiKTtcclxuICAgICAgICAvLyB0aGlzLl9zdF9CdG5MYWJlbCA9IHN0QnRuRG93bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9zdF9JbWcgPSB0aGlzLl9zdF9QYW5lbC5nZXRDaGlsZEJ5TmFtZShcImFkSW1hZ2VcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICB0aGlzLl9zdF9DbG9zZUJ0biA9IHRoaXMuX3N0X1BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0Nsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMuX3N0X2FkTWFzayA9IHRoaXMuX3N0X1BhbmVsLmdldENoaWxkQnlOYW1lKFwiTWFza1wiKTtcclxuICAgICAgICB0aGlzLl9zdF9kb3duX2J0bl9kZWZhdWx0X2ltZyA9IHRoaXMuX3N0X0J0bkRvd24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0X1RpdGxlTGFiZWxfV2lkZ2V0ID0gdGhpcy5fc3RfVGl0bGVMYWJlbC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICB0aGlzLl9zdF9EZXNMYWJlbF9XaWRnZXQgPSB0aGlzLl9zdF9EZXNMYWJlbC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0ID0gdGhpcy5fc3RfSW1nLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHRoaXMuX3N0X0Nsb3NlQnRuX1dpZGdldCA9IHRoaXMuX3N0X0Nsb3NlQnRuLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHRoaXMuX3N0X0J0bkRvd25fV2lkZ2V0ID0gdGhpcy5fc3RfQnRuRG93bi5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICB0aGlzLl9zdF9hZE1hc2tfV2lkZ2V0ID0gdGhpcy5fc3RfYWRNYXNrLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHRoaXMuX3N0X0ljb25fd2lkZ2V0ID0gdGhpcy5fc3RfUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJJY29uTWFza1wiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuXHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkgfHwgQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJYbV9NYXJrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2tfd2lkZ2V0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cclxuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LmxlZnQgPSBjYy53aW5TaXplLndpZHRoICogMC4yNTtcclxuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LnJpZ2h0ID0gY2Mud2luU2l6ZS53aWR0aCAqIDAuMjU7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlTGFiZWwubm9kZS53aWR0aCA9IDQwMDtcclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSByYXRpbztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGNjLmdhbWUuZW1pdChcIkh1YVdlaU9uU2hvd1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9zdF9QYW5lbC50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcGFuZWwudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuazqOWGjOebkeWQrOS6i+S7tiA+Pj4+Pi5cIik7XHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkh1YVdlaU9uU2hvdyA+Pj4+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZFNob3coKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8gfHwgUGxhdFV0aWxzLklzVklWTyB8fCBQbGF0VXRpbHMuSXNIdWFXZWkgfHwgUGxhdFV0aWxzLklzWGlhb01pKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50OiBjYy5FdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRDbGljaygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQ6IGNjLkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZENsaWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuWVpfTmF0aXZlQWRDbGljaywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRDbGljaygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPIHx8IFBsYXRVdGlscy5Jc1ZJVk8gfHwgUGxhdFV0aWxzLklzSHVhV2VpIHx8IFBsYXRVdGlscy5Jc1hpYW9NaSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChuYXRpdmVBZDogYW55LCBkYXRhOiBhbnksIG5hdGl2ZUJhbm5lckluZm86IE5hdGl2ZUJhbm5lckluZm8pIHtcclxuICAgICAgICB0aGlzLl9uYXRpdmVBZCA9IG5hdGl2ZUFkO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVCYW5uZXJJbmZvID0gbmF0aXZlQmFubmVySW5mbztcclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfc2hvd19oZWlnaHQgPSA1MDA7XHJcbiAgICAgICAgLy8gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9zdHlsZSA9IDE7XHJcbiAgICAgICAgLy8gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9kb3duX2J1dF9zaG93ID0gMjtcclxuICAgICAgICAvLyB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc2hvd19zdF9iYW5uZXIgPSBcInRydWVcIjtcclxuICAgICAgICAvLyB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3dpZHRoID0gODAwO1xyXG4gICAgICAgIC8vIHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfaGVpZ2h0ID0gMzAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnNob3dfc3RfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3N0eWxlID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLmltZ1VybExpc3QgJiYgdGhpcy5fZGF0YS5pbWdVcmxMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfUGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBpZih0aGlzLm5hdGl2ZUJhbm5lckluZm8uX2FsaWduVHlwZSA9PT0gXCJ0b3BcIilcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gdGhpcy5fd2lkZ2V0LnRvcCA9IDA7XHJcbiAgICAgICAgLy8gdGhpcy5fd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuX3dpZGdldC5pc0FsaWduQm90dG9tID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLlvZPliY3mmL7npLrkvY3nva7kuLo6XCIsIHRoaXMubmF0aXZlQmFubmVySW5mby5sb2NhdGlvbiwgXCI+PuaYvuekuuWPguaVsOS4uu+8mlwiLCB0aGlzLm5hdGl2ZUJhbm5lckluZm8udG9TdHJvbmcoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgdGhpcy5fZGF0YURpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX3VwZGF0ZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcclxuICAgICAgICAgICAgLy8g5LiK5oql5bGV56S6XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZXBvcnRBZFNob3coKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YS5pY29uID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlscy5uYXRpdmVCYW5uZXJTaG93Q291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zaG93X3N0X2Jhbm5lciA9PSBcInRydWVcIiAmJiB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3N0eWxlID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3N0eWxlID09IDEgfHwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9zdHlsZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfd2lkdGggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC53aWR0aCA9IHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfUGFuZWwud2lkdGggPSA4MjEuNDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfaGVpZ2h0ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfUGFuZWwuaGVpZ2h0ID0gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfUGFuZWwuaGVpZ2h0ID0gNTg5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfYWRNYXNrX1dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9DbG9zZUJ0bl9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bl9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSWNvbl93aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X1BhbmVsLndpZHRoID0gODIxLjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfUGFuZWwuaGVpZ2h0ID0gNTg5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X1dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9hZE1hc2tfV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0Nsb3NlQnRuX1dpZGdldC51cGRhdGVBbGlnbm1lbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0J0bkRvd25fV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ljb25fd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3N0eWxlID09IDAgfHwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9zdHlsZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIi8v5Y2V5Zu+54mH5qC35byP77yM5ouJ5Ly45Zu+54mH77yM5bm25LiU6ZqQ6JeP5qCH6aKY5ZKM5o+P6L+wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ltZ19XaWRnZXQudG9wID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSW1nX1dpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ltZ19XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfRGVzTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9UaXRsZUxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSWNvbl93aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfc3R5bGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLpu5jorqTmoLflvI/oh6rlrprkuYnlrr3pq5g65bGV56S65qCH6aKY5ZKM5o+P6L+wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0Rlc0xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9UaXRsZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9EZXNMYWJlbF9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfVGl0bGVMYWJlbF9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSW1nX1dpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ltZ19XaWRnZXQudG9wID0gdGhpcy5fc3RfVGl0bGVMYWJlbC5ub2RlLmhlaWdodCArIHRoaXMuX3N0X1RpdGxlTGFiZWxfV2lkZ2V0LnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0LmJvdHRvbSA9IHRoaXMuX3N0X0Rlc0xhYmVsX1dpZGdldC5ub2RlLmhlaWdodCArIHRoaXMuX3N0X0Rlc0xhYmVsX1dpZGdldC5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSW1nX1dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JY29uX3dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSW1nX1dpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ltZ19XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfRGVzTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X1RpdGxlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ljb25fd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc2hvd19zdF9iYW5uZXIgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnu5PnrpdiYW5uZXLkvb/nlKjpu5jorqTmoLflvI/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC53aWR0aCA9IDgyMS40O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfUGFuZWwuaGVpZ2h0ID0gNTg5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfSW1nX1dpZGdldC5pc0FsaWduVG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWdfV2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ltZ19XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9EZXNMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9UaXRsZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X1dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X2FkTWFza19XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9DbG9zZUJ0bl9XaWRnZXQudXBkYXRlQWxpZ25tZW50KClcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X0J0bkRvd25fV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfSWNvbl93aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3RfQ2xvc2VCdG4uc2NhbGUgPSB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3NjYWxlIDwgMSA/IHRoaXMuX3N0X0Nsb3NlQnRuLnNjYWxlICogdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9zY2FsZSA6IDE7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0X2FkTWFzay5zY2FsZSA9IHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfc2NhbGUgPCAxID8gdGhpcy5fc3RfYWRNYXNrLnNjYWxlICogdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9zY2FsZSA6IDE7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0X0Nsb3NlQnRuLmFjdGl2ZSA9IHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfY2xvc2VfYnV0X3Nob3cgPT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0X0Nsb3NlQnRuLm9wYWNpdHkgPSB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9hbHBoYTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5maXJzdF9uYXRpdmVfYmFubmVyX2RlbGF5ZWRfY291bnRfY2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5uYXRpdmVCYW5uZXJTaG93Q291bnQgPiAzICYmIHRoaXMuU2VydmVyQ29uZmlnLmZpcnN0X25hdGl2ZV9iYW5uZXJfZGVsYXllZF9jb3VudF9jbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLm5hdGl2ZUJhbm5lclJlc2l6ZUNsb3NlQnRuU2hvd0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLm5hdGl2ZUJhbm5lclJlc2l6ZUNsb3NlQnRuU2hvd0NvdW50ICUgdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9kZWxheWVkX2NvdW50X2Nsb3NlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5Y6f55SfYmFubmVy5YWz6Zet5oyJ6ZKu6K6+572u5pyN5Yqh5Zmo6YWN572u5aSn5bCPJHt0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3NpemV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQ2xvc2VCdG4uc2V0Q29udGVudFNpemUoY2Muc2l6ZSh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0Nsb3NlQnRuLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfY2xvc2VfYnV0X3NpemUsIHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfY2xvc2VfYnV0X3NpemUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0Nsb3NlQnRuLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfcmFuZ2UsIHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfY2xvc2VfYnV0X3JhbmdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQ2xvc2VCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfc2l6ZSwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9jbG9zZV9idXRfc2l6ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Rvd25fYnV0X3Nob3cpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9CdG5Eb3duLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9kb3duX2J0bl9pbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJ0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Rvd25fYnRuX2ltYWdlXCIsIHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfZG93bl9idG5faW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXModGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9kb3duX2J0bl9pbWFnZSwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgdGhpcy5fc3RfQnRuRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfZG93bl9idXRfbWFyZ2luX3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0J0bkRvd25fV2lkZ2V0LnRvcCA9IC0gKHRoaXMuX3N0X0J0bkRvd24uZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgKyB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Rvd25fYnV0X21hcmdpbl90b3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0J0bkRvd25fV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9CdG5Eb3duX1dpZGdldC50b3AgPSAtIHRoaXMuX3N0X0J0bkRvd24uZ2V0Q29udGVudFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bl9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuX3N0X2Rvd25fYnRuX2RlZmF1bHRfaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Rvd25fYnV0X21hcmdpbl90b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bl9XaWRnZXQudG9wIC09IHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfZG93bl9idXRfbWFyZ2luX3RvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bl9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfZG93bl9idXRfc2hvdyA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxKSkucmVwZWF0Rm9yZXZlcigpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5zY2FsZSA9IHRoaXMubm9kZS5zY2FsZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X0J0bkRvd24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9CdG5Eb3duLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uYWN0aXZlID0gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9jbG9zZV9idXRfc2hvdyA9PSBcInRydWVcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Nsb3NlQnRuLm9wYWNpdHkgPSB0aGlzLm5hdGl2ZUJhbm5lckluZm8uYmFubmVyX2Nsb3NlX2J1dF9hbHBoYTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmZpcnN0X25hdGl2ZV9iYW5uZXJfZGVsYXllZF9jb3VudF9jbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLm5hdGl2ZUJhbm5lclNob3dDb3VudCA+IDMgJiYgdGhpcy5TZXJ2ZXJDb25maWcuZmlyc3RfbmF0aXZlX2Jhbm5lcl9kZWxheWVkX2NvdW50X2Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLm5hdGl2ZUJhbm5lclJlc2l6ZUNsb3NlQnRuU2hvd0NvdW50ICUgdGhpcy5TZXJ2ZXJDb25maWcubmF0aXZlX2Jhbm5lcl9kZWxheWVkX2NvdW50X2Nsb3NlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg5Y6f55SfYmFubmVy5YWz6Zet5oyJ6ZKu6K6+572u5pyN5Yqh5Zmo6YWN572u5aSn5bCPJHt0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3NpemV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlQnRuLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9jbG9zZV9idXRfcmFuZ2UsIHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3JhbmdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlQnRuLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3NpemUsIHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3NpemUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZUJ0bi5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3JhbmdlLCB0aGlzLm5hdGl2ZUJhbm5lckluZm8uYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9jbG9zZV9idXRfc2l6ZSwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9jbG9zZV9idXRfc2l6ZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnNob3dfc3RfYmFubmVyID09IFwiZmFsc2VcIikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLndpZHRoLCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFuZWxfd2lkZ2V0LmlzQWxpZ25Ub3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsX3dpZGdldC5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFuZWwuc2V0Q29udGVudFNpemUoY2Muc2l6ZSh0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9zaG93X2hlaWdodCA8IDE2MCA/IDE2MCA6IHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfc2hvd19oZWlnaHQpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsX3dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlQnRuX3dpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hc2tfd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/nvKnmlL5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X1BhbmVsLnNjYWxlID0gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9zY2FsZSA/IHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfc2NhbGUgOiAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfV2lkZ2V0LmJvdHRvbSA9IHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfYm90dG9tID8gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9ib3R0b20gOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uX2FsaWduVHlwZSA9PT0gXCJ0b3BcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zaG93X3N0X2Jhbm5lciA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLl9zdF9QYW5lbC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gdGhpcy5fc3RfUGFuZWwud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQ2xvc2VCdG5fV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X2FkTWFza19XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLm5hdGl2ZUJhbm5lckluZm8uYmFubmVyX3Nob3dfaGVpZ2h0IDwgMTYwID8gMTYwIDogdGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9zaG93X2hlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbF93aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG5fd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2tfd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fd2lkZ2V0LnRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXQuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc2hvd19zdF9iYW5uZXIgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mmL7npLrkuLrnu5PnrpdiYW5uZXIgPj4+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9iZ19tYXNrX29wYWNpdHkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmdfbWFzay5vcGFjaXR5ID0gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9iZ19tYXNrX29wYWNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmdfbWFzay5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLndpZHRoLCB0aGlzLl9zdF9QYW5lbC5oZWlnaHQpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9hZE1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JnX21hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlsYXlupXpg6jot53nprtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X1RpdGxlTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS50aXRsZSA/IHRoaXMuX2RhdGEudGl0bGUgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfRGVzTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5kZXNjID8gdGhpcy5fZGF0YS5kZXNjIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2RhdGEuaW1nVXJsTGlzdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9zdF9CdG5MYWJlbC5zdHJpbmcgPSB0aGlzLl9kYXRhLmNsaWNrQnRuVHh0ID8gdGhpcy5fZGF0YS5jbGlja0J0blR4dCA6IFwi5p+l55yL6K+m5oOFXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YS5pbWdVcmxMaXN0ICYmIHRoaXMuX2RhdGEuaW1nVXJsTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pyJ5Zu+54mH77yM5LyY5YWI5pi+56S65Zu+54mHXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSWNvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0X0ltZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29tcGF0aWJsZVRvb2wuTG9hZFJlcyh0aGlzLl9kYXRhLmltZ1VybExpc3RbMF0sIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX3N0X0ltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSW1nLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTyAmJiB0aGlzLl9kYXRhLmljb25VcmxMaXN0ICYmIHRoaXMuX2RhdGEuaWNvblVybExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaciWljb25cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfc3R5bGUgPT0gMCB8fCB0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX3N0eWxlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWNleWbvueJh+agt+W8jy3msqHmnInlpKflm77vvIzmmL7npLrpu5jorqTljp/nlJ/moLflvI9iYW5uZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5kZXNjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5MYWJlbC5zdHJpbmcgPSB0aGlzLl9kYXRhLmNsaWNrQnRuVHh0ID8gdGhpcy5fZGF0YS5jbGlja0J0blR4dCA6IFwi5p+l55yL6K+m5oOFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpY29uVXJsID0gUGxhdFV0aWxzLklzT1BQTyA/IHRoaXMuX2RhdGEuaWNvblVybExpc3RbMF0gOiB0aGlzLl9kYXRhLmljb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXMoaWNvblVybCwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX2ljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pY29uLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKHRoaXMuX2RhdGEuaWNvblVybExpc3RbMF0sIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLl9zdF9JY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoUGxhdFV0aWxzLklzVklWTyB8fCBQbGF0VXRpbHMuSXNIdWFXZWkpICYmIHRoaXMuX2RhdGEuaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaciWljb25cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdF9JbWcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKHRoaXMuX2RhdGEuaWNvbiwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgdGhpcy5fc3RfSWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfSWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLl9kYXRhLnRpdGxlID8gdGhpcy5fZGF0YS50aXRsZSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNMYWJlbC5zdHJpbmcgPSB0aGlzLl9kYXRhLmRlc2MgPyB0aGlzLl9kYXRhLmRlc2MgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnRuTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5jbGlja0J0blR4dCA/IHRoaXMuX2RhdGEuY2xpY2tCdG5UeHQgOiBcIuafpeeci+ivpuaDhVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdXJjZUxhYmxlLnN0cmluZyA9IHRoaXMuX2RhdGEuc291cmNlID8gdGhpcy5fZGF0YS5zb3VyY2UgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiSHdfTWFya1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2tfd2lkZ2V0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGljb25VcmwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uVXJsID0gdGhpcy5fZGF0YS5pY29uVXJsTGlzdFswXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblVybCA9IHRoaXMuX2RhdGEuaWNvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaWNvblVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXMoaWNvblVybCwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgdGhpcy5faWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLmltZ1VybExpc3QgJiYgdGhpcy5fZGF0YS5pbWdVcmxMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGF0aWJsZVRvb2wuTG9hZFJlcyh0aGlzLl9kYXRhLmltZ1VybExpc3RbMF0sIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLl9pY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pY29uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hXX2ljb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oV19pY29uLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3JhbmdlID0gMjA7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3NpemUgPSA1MDtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uc2V0Q29udGVudFNpemUoY2Muc2l6ZSh0aGlzLm5hdGl2ZUJhbm5lckluZm8uYmFubmVyX2Nsb3NlX2J1dF9yYW5nZSwgdGhpcy5uYXRpdmVCYW5uZXJJbmZvLmJhbm5lcl9jbG9zZV9idXRfcmFuZ2UpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlQnRuLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3NpemUsIHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xvc2VfYnV0X3NpemUpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMubmF0aXZlQmFubmVySW5mby5zdF9iYW5uZXJfZG93bl9idXRfbWFyZ2luX3RvcCA9IC01MDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Rvd25fYnV0X21hcmdpbl90b3AgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bl9XaWRnZXQudG9wID0gdGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9kb3duX2J1dF9tYXJnaW5fdG9wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bl9XaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUJhbm5lckluZm8uc3RfYmFubmVyX2Rvd25fYnV0X3Nob3cgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdF9CdG5Eb3duLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYXRpdmVCYW5uZXJJbmZvLnN0X2Jhbm5lcl9kb3duX2J1dF9zaG93ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMyksIGNjLnNjYWxlVG8oMC4zLCAxKSkucmVwZWF0Rm9yZXZlcigpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RfQnRuRG93bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0X0J0bkRvd24uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uQnRuQ2xpY2tIYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQnRuX0Nsb3NlXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wuY291bnRCYW5uZXJDbG9zZUNvdW50KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1dGlscy5fYmFubmVyQ2xvc2VUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuX0Rvd25sb2FkXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJiZ01hc2tcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3JlcG9ydEFkU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2RhdGEuaXNSZXBvcnRTaG93IHx8IFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfQkFOTkVSLCBZd0FkU3RhdHVzLlNIT1dfU1VDQ0VTUywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodGhpcy5fZGF0YS5hZElkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEuaXNSZXBvcnRTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5Y6f55Sf5bm/5ZGK5p2h5bGV56S677yBYWRJZDpcIiArIHRoaXMuX2RhdGEuYWRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWQucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRJZDogdGhpcy5fZGF0YS5hZElkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5LiK5oql5Y6f55SfQmFubmVy5bm/5ZGK5bGV56S6LOS9jee9rjpcIiArIHRoaXMubmF0aXZlQmFubmVySW5mby5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3lub/lkYrlt7Lnu4/ov4fkuIrmiqXlsZXnpLrvvIFhZElkOlwiICsgdGhpcy5fZGF0YS5hZElkLCBcIu+8jOW9k+WJjeS4jeWBmuS4iuaKpVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVwb3J0QWRDbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5Y6f55Sf5bm/5ZGK5p2h54K55Ye7ISBhZElkOlwiICsgdGhpcy5fZGF0YS5hZElkKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2RhdGEuaXNSZXBvcnRDbGljayB8fCBQbGF0VXRpbHMuSXNIdWFXZWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBZb3VXYW5BbmFseXRpY3MuRXZlbnRBZFdpdGhPYmooWXdBZFR5cGUuTkFUSVZFX0JBTk5FUiwgWXdBZFN0YXR1cy5DTElDSywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodGhpcy5fZGF0YS5hZElkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEuaXNSZXBvcnRDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkSWQ6IHRoaXMuX2RhdGEuYWRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBdXRvRG93bmxvYWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkxvYWRBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlQmFubmVySW5mby5iYW5uZXJfY2xpY2tfcmVmcmVzaCA9PSBcInRydWVcIiAmJiAhUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLngrnlh7vkuYvlkI4t5YWI6ZqQ6JeP5bm/5ZGKLeWGjeWIt+aWsOW5v+WRiuadoe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcih0aGlzLm5hdGl2ZUJhbm5lckluZm8ubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIt+aWsGJhbm5lclxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKHRoaXMubmF0aXZlQmFubmVySW5mby5sb2NhdGlvbiwgeyBpc1JlZnJlc2g6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb3duTG9hZEFkKCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCByZXN1bHRDb2RlID0gdGhpcy5fbmF0aXZlQWQuc3RhcnREb3dubG9hZCh7XHJcbiAgICAgICAgICAgIGFkSWQ6IHRoaXMuX2RhdGEuYWRJZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZygn5Y6f55Sf5bm/5ZGK5Li75Yqo5LiL6L29IHJlc3VtZURvd25sb2FkcmVzdWx0Q29kZSA9ICcgKyByZXN1bHRDb2RlKTtcclxuICAgIH1cclxufVxyXG4iXX0=