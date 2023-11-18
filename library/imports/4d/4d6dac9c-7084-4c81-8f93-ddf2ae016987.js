"use strict";
cc._RF.push(module, '4d6dayccIRMgY+T3fKuAWmH', 'YZ_NativeItem');
// common-plugin/Scripts/YZ_NativeItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_NativeItem = /** @class */ (function (_super) {
    __extends(YZ_NativeItem, _super);
    function YZ_NativeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeAdTiltle = null;
        _this._nativeAdIcon = null;
        _this._nativeAdDesc = null;
        _this._nativeAdImg = null;
        _this._closeBtn = null;
        _this._downBtn = null;
        _this._noImageView = null;
        _this._nativeAd = null;
        _this.isShow = false;
        _this.showType = 1;
        _this.params = null;
        _this.content = null;
        return _this;
    }
    YZ_NativeItem.prototype.onLoad = function () {
        var _this = this;
        this.content = this.node.children[0];
        this._noImageView = this.content.getChildByName("NoImageView");
        this._nativeAdTiltle = this._noImageView.getChildByName("title").getComponent(cc.Label);
        this._nativeAdIcon = this._noImageView.getChildByName("icon").getComponent(cc.Sprite);
        this._nativeAdDesc = this._noImageView.getChildByName("desc").getComponent(cc.Label);
        this._nativeAdImg = this.content.getChildByName("image").getComponent(cc.Sprite);
        // this._downBtn = this.content.getChildByName("Btn_Download");
        this._closeBtn = this.content.getChildByName("closeBtn");
        if (this.params) {
            if (this.params.parent) {
                this.node.width = this.node.parent.width;
                this.node.height = this.node.parent.height;
            }
        }
        else {
            if (Utils_1.utils.ServerConfig.st_native_ad_height) {
                this.node.height = Utils_1.utils.ServerConfig.st_native_ad_height;
            }
        }
        this.content.active = false;
        cc.game.on(YZ_Constant_1.default.YZ_NativeAdClick, function () {
            _this.reportAdClick();
        }, this);
        // this._closeBtn.active = utils.ServerConfig.st_banner_close_but_show ? (utils.ServerConfig.st_banner_close_but_show == "true") : false;
        // this._downBtn.active = utils.ServerConfig.show_statement_nativeAd_closeBtn ? (utils.ServerConfig.show_statement_nativeAd_closeBtn == "true") : false;
    };
    YZ_NativeItem.prototype.onDisable = function () {
        cc.game.targetOff(this);
        this.node.destroy();
    };
    YZ_NativeItem.prototype.update = function () {
        if (this._nativeAd && !this.isShow) {
            this.isShow = true;
            this.showNativeAd();
        }
    };
    YZ_NativeItem.prototype.init = function (nativeObj) {
        Utils_1.utils.showLog("初始化单个原生广告>>>");
        this._nativeAd = nativeObj;
    };
    YZ_NativeItem.prototype.showNativeAd = function () {
        var _this = this;
        if (Utils_1.utils.ServerConfig.st_native_ad_is_hide_banner && Utils_1.utils.ServerConfig.st_native_ad_is_hide_banner == "true") {
            Utils_1.utils.showLog("服务器配置显示结算原生广告后隐藏banner >>>");
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        }
        if (Utils_1.utils.ServerConfig.st_native_ad_show_rec_banner && Utils_1.utils.ServerConfig.st_native_ad_show_rec_banner == "true") {
            Utils_1.utils.showRecBanner();
        }
        var nativeData = this._nativeAd.data;
        var title = nativeData.title;
        var desc = nativeData.desc;
        if (title.length > 6) {
            title = title.slice(0, 6);
            title += "...";
        }
        if (desc.length > 18) {
            desc = desc.slice(0, 17);
            desc += "...";
        }
        this._nativeAdTiltle.string = title;
        this._nativeAdDesc.string = desc;
        if (nativeData.imgUrlList && nativeData.imgUrlList.length > 0) {
            // 有图片，优先显示图片
            // this._titleLabel.node.active = true;
            // this._icon.node.active = false;
            // this._img.node.active = true;
            // this._desLabel.node.active = true;
            this._noImageView.active = false;
            this._nativeAdImg.node.active = true;
            CompatibleTool_1.default.LoadRes(nativeData.imgUrlList[0], function (err, res) {
                if (!err && cc.isValid(_this) && _this._nativeAdImg) {
                    _this._nativeAdImg.spriteFrame = new cc.SpriteFrame(res);
                    _this._nativeAdImg.node.active = true;
                    _this.content.active = true;
                }
            });
        }
        else if (PlatUtils_1.default.IsOPPO && nativeData.iconUrlList && nativeData.iconUrlList.length > 0) {
            // 有icon
            this._nativeAdImg.node.active = false;
            this._noImageView.active = true;
            CompatibleTool_1.default.LoadRes(nativeData.iconUrlList[0], function (err, res) {
                if (!err && cc.isValid(_this) && _this._nativeAdIcon) {
                    _this._nativeAdIcon.spriteFrame = new cc.SpriteFrame(res);
                    _this.content.active = true;
                }
            });
        }
        else if (PlatUtils_1.default.IsVIVO && nativeData.icon) {
            // 有icon
            this._nativeAdImg.node.active = false;
            this._noImageView.active = true;
            CompatibleTool_1.default.LoadRes(nativeData.icon, function (err, res) {
                if (!err && cc.isValid(_this) && _this._nativeAdIcon) {
                    _this._nativeAdIcon.spriteFrame = new cc.SpriteFrame(res);
                    _this.content.active = true;
                }
            });
        }
        this.node.active = true;
        this.reportAdShow();
        if (this.params) {
            this.params.callBack && this.params.callBack();
        }
    };
    // onEnable() {
    //     // if (PlatUtils.IsOPPO || PlatUtils.IsVIVO) {
    //     //     if (!this._closeBtn.active) {
    //     //         this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
    //     //             this._reportAdClick();
    //     //         }, this);
    //     //     }
    //     // }
    // }
    // onDisable() {
    //     if (PlatUtils.IsOPPO || PlatUtils.IsVIVO) {
    //         this.node.targetOff(this);
    //     }
    // }
    YZ_NativeItem.prototype.onBtnClickHandler = function (event, data) {
        switch (event.target.name) {
            case "closeBtn": {
                this.node.active = false;
                break;
            }
            case "Btn_Download": {
                this.reportAdClick();
                break;
            }
        }
    };
    YZ_NativeItem.prototype.reportAdShow = function () {
        Utils_1.utils.showLog("reportAdShow");
        if (this._nativeAd) {
            this._nativeAd.reportAdShow();
        }
    };
    YZ_NativeItem.prototype.reportAdClick = function () {
        if (this._nativeAd) {
            this._nativeAd.reportAdClick();
        }
        else {
            Utils_1.utils.showLog("广告加载失败！");
        }
    };
    YZ_NativeItem = __decorate([
        ccclass
    ], YZ_NativeItem);
    return YZ_NativeItem;
}(cc.Component));
exports.default = YZ_NativeItem;

cc._RF.pop();