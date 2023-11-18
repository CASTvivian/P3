"use strict";
cc._RF.push(module, '1d5251l+dNFU5/8GQ0IW26S', 'YZ_NativeInsert');
// common-plugin/Scripts/YZ_NativeInsert.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var YZ_Constant_1 = require("./YZ_Constant");
var EventAdInfo_1 = require("./YouWanSDK/EventAdInfo");
var YouWanAnalytics_1 = require("./YouWanSDK/YouWanAnalytics");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_NativeInsert = /** @class */ (function (_super) {
    __extends(YZ_NativeInsert, _super);
    function YZ_NativeInsert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._sourceLable = null;
        _this._titleLabel = null;
        _this._desLabel = null;
        _this._icon = null;
        _this._mask = null;
        _this._btnLabel = null;
        _this._closeBtn = null;
        _this._img = null;
        _this._hideInstallBtn = null;
        _this._nativeAd = null;
        _this._data = null;
        _this._dataDirty = false;
        _this._btnDownLoad = null;
        _this._defaultCloseSize = 60;
        return _this;
    }
    Object.defineProperty(YZ_NativeInsert.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    YZ_NativeInsert.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        cc.game.addPersistRootNode(this.node);
        this._panel = this.node.getChildByName("Panel");
        this._icon = this._panel.getChildByName("Icon").getComponent(cc.Sprite);
        this._img = this._panel.getChildByName("Img").getComponent(cc.Sprite);
        this._titleLabel = this._panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._desLabel = this._panel.getChildByName("DesLabel").getComponent(cc.Label);
        this._mask = this.node.getChildByName("Mask");
        this._sourceLable = this._panel.getChildByName("Img").getChildByName("source").getComponent(cc.Label);
        this._btnDownLoad = this._panel.getChildByName("Btn_Download");
        this._btnLabel = this._btnDownLoad.getComponentInChildren(cc.Label);
        this._hideInstallBtn = this._panel.getChildByName("Btn_HideInstall");
        this._closeBtn = this._hideInstallBtn.getChildByName("Btn_Close");
        var self = this;
        var bg = this._panel.getChildByName("bg").getComponent(cc.Sprite);
        var bgUrl = Utils_1.utils.ServerConfig.native_intersititial_bg_img;
        if (bgUrl && !this.bgTexture) {
            CompatibleTool_1.default.LoadRes(bgUrl, function (err, texture) {
                if (!err && cc.isValid(self) && self._panel) {
                    var size = self._panel.getChildByName("bg").getContentSize();
                    self.bgTexture = new cc.SpriteFrame(texture);
                    bg.spriteFrame = self.bgTexture;
                    self._panel.getChildByName("bg").setContentSize(size);
                }
            });
        }
        var back = this._panel.getChildByName("Btn_Install").getChildByName("Background").getComponent(cc.Sprite);
        var backUrl = Utils_1.utils.ServerConfig.native_intersititial_btn_img;
        if (backUrl && !this.btnTexture) {
            CompatibleTool_1.default.LoadRes(backUrl, function (err, texture) {
                if (!err && cc.isValid(self) && self._panel) {
                    var size = self._panel.getChildByName("Btn_Install").getContentSize();
                    self.btnTexture = new cc.SpriteFrame(texture);
                    back.spriteFrame = self.btnTexture;
                    self._panel.getChildByName("Btn_Install").setContentSize(size);
                }
            });
        }
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
            // if (PlatUtils.IsVIVO) {
            //     ratio = cc.winSize.width / 1920 * 0.7 * (1280 / utils.cur_tool.SysInfo.screenWidth);
            // } else {
            // if (!PlatUtils.IsHuaWei) {
            // this._panel.width = cc.winSize.width / 2;
            // this._panel.height = cc.winSize.height * 0.9;
            // this._desLabel.getComponent(cc.Widget).bottom = 200;
            // this._desLabel.getComponent(cc.Widget).updateAlignment();
            // this._panel.getChildByName("Btn_Install").getComponent(cc.Widget).bottom = 50;
            // this._panel.getChildByName("Btn_Install").getComponent(cc.Widget).updateAlignment();
            // this._img.node.getComponent(cc.Widget).top = (this._titleLabel.node.y - this._desLabel.node.y) / 3;
            // this._img.node.getComponent(cc.Widget).bottom = (this._titleLabel.node.y - this._desLabel.node.y) / 2
            // this._img.node.getComponent(cc.Widget).updateAlignment();
            // this._titleLabel.node.getComponent(cc.Widget).top = 70;
            // this._titleLabel.node.getComponent(cc.Widget).updateAlignment();
            // this._closeBtn.getComponent(cc.Widget).top = 65;
            // this._closeBtn.getComponent(cc.Widget).updateAlignment();
            // }else{
            this._panel.scale = ratio;
            // }
        }
        else {
            this._panel.getComponent(cc.Widget).isAlignBottom = true;
            this._panel.getComponent(cc.Widget).bottom = 378;
            this._panel.getComponent(cc.Widget).updateAlignment();
            ratio = cc.winSize.width / 1080;
            this._panel.scale = ratio;
        }
        /**
                if (PlatUtils.IsHuaWei) {
        
                    let closeBtnRange = this.ServerConfig.intersititia_close_but_range ? this.ServerConfig.intersititia_close_but_range : this._closeBtn.getContentSize().height;
                    let closeBtnSize = this.ServerConfig.intersititia_close_but_size ? this.ServerConfig.intersititia_close_but_size : this._closeBtn.getContentSize().height;
        
                    this._closeBtn.setContentSize(cc.size(closeBtnRange, closeBtnRange));
                    this._closeBtn.getChildByName("Background").setContentSize(cc.size(closeBtnSize, closeBtnSize));
        
                    this._btnDownLoad.active = false;
                    //@ts-ignore
                    // qg.onShow(this._reportAdShow.bind(this));
                }
            */
        if (PlatUtils_1.default.IsXiaoMi) {
            this._panel.getChildByName("Xm_Mask").active = true;
        }
        // this._panel.scale = ratio;
    };
    YZ_NativeInsert.prototype.onEnable = function () {
        var _this = this;
        if (PlatUtils_1.default.IsHuaWei) {
            Utils_1.utils.showLog("注册原生插屏监听事件 >>>>>.");
            cc.game.targetOff(this);
            cc.game.on(cc.game.EVENT_SHOW, function () {
                console.log("HuaWeiOnShow >>>>>>");
                _this._reportAdShow();
            }, this);
        }
        if (PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsVIVO || PlatUtils_1.default.IsHuaWei || PlatUtils_1.default.IsXiaoMi) {
            this._panel.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this._reportAdClick();
            }, this);
            cc.game.on(YZ_Constant_1.default.YZ_NativeAdClick, function () {
                _this._reportAdClick();
            }, this);
        }
    };
    YZ_NativeInsert.prototype.onDestroy = function () {
        if (PlatUtils_1.default.IsHuaWei) {
            cc.game.targetOff(this);
            Utils_1.utils.adManager.ShowBanner();
        }
    };
    YZ_NativeInsert.prototype.init = function (nativeAd, data) {
        this._nativeAd = nativeAd;
        this._data = data;
        this._dataDirty = true;
    };
    YZ_NativeInsert.prototype.update = function (dt) {
        if (this._data && this._dataDirty) {
            this._panel.active = true;
            this._mask.active = true;
            this._dataDirty = false;
            this._updateContent();
        }
        if (!this._data) {
            this._panel.active = false;
            this._mask.active = false;
        }
    };
    YZ_NativeInsert.prototype._updateContent = function () {
        var _this = this;
        // this.ServerConfig.intersititia_close_but_range = 10;
        // this.ServerConfig.intersititia_close_but_size = 90;
        if (this._data) {
            // 上报原生插屏广告
            this._reportAdShow();
            Utils_1.utils.nativeInsertShowCount++;
            if (this.ServerConfig.first_interstitial_delayed_level_close) {
                if (Utils_1.utils.nativeInsertShowCount > 3 && this.ServerConfig.interstitial_delayed_level_close) {
                    Utils_1.utils.nativeInsertResizeCloseBtnShowCount++;
                    if (Utils_1.utils.nativeInsertResizeCloseBtnShowCount % this.ServerConfig.interstitial_delayed_level_close == 0) {
                        Utils_1.utils.showLog("\u539F\u751F\u63D2\u5C4F\u5173\u95ED\u6309\u94AE\u8BBE\u7F6E\u670D\u52A1\u5668\u914D\u7F6E\u5927\u5C0F" + this.ServerConfig.intersititia_close_but_size);
                        var closeBtnSize = this.ServerConfig.intersititia_close_but_size ? this.ServerConfig.intersititia_close_but_size : this._defaultCloseSize;
                        this._hideInstallBtn.setContentSize(cc.size(closeBtnSize, closeBtnSize));
                    }
                }
                else {
                    Utils_1.utils.showLog("\u539F\u751F\u63D2\u5C4F\u5173\u95ED\u6309\u94AE,\u4E0D\u6EE1\u8DB3\u670D\u52A1\u5668\u6761\u4EF6\uFF0C\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u5927\u5C0F\uFF01");
                    this._hideInstallBtn.setContentSize(cc.size(this._defaultCloseSize, this._defaultCloseSize));
                }
            }
            else {
                var closeBtnSize = this.ServerConfig.intersititia_close_but_size ? this.ServerConfig.intersititia_close_but_size : this._defaultCloseSize;
                this._hideInstallBtn.setContentSize(cc.size(closeBtnSize, closeBtnSize));
            }
            this._closeBtn.getChildByName("Background").opacity = CC_DEBUG ? 255 : 0;
            this._hideInstallBtn.opacity = this.ServerConfig.intersititia_close_but_alpha ? this.ServerConfig.intersititia_close_but_alpha : 255;
            var closeBtnRange = this.ServerConfig.intersititia_close_but_range ? this.ServerConfig.intersititia_close_but_range : this._defaultCloseSize;
            this._closeBtn.setContentSize(cc.size(closeBtnRange, closeBtnRange));
            this._titleLabel.string = this._data.title ? this._data.title : "";
            this._desLabel.string = this._data.desc ? this._data.desc : "";
            this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
            if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                // 有图片，优先显示图片
                this._titleLabel.node.active = true;
                this._icon.node.active = false;
                this._img.node.active = true;
                this._desLabel.node.active = true;
                CompatibleTool_1.default.LoadRes(this._data.imgUrlList[0], function (err, res) {
                    Utils_1.utils.showLog("加载图片信息 ...." + err);
                    if (!err && cc.isValid(_this) && _this._img) {
                        _this._img.spriteFrame = new cc.SpriteFrame(res);
                    }
                });
            }
            else if (PlatUtils_1.default.IsOPPO && this._data.iconUrlList && this._data.iconUrlList.length > 0) {
                // 有icon
                this._titleLabel.node.active = true;
                this._icon.node.active = true;
                this._img.node.active = false;
                this._desLabel.node.active = true;
                CompatibleTool_1.default.LoadRes(this._data.iconUrlList[0], function (err, res) {
                    if (!err && cc.isValid(_this) && _this._icon) {
                        _this._icon.spriteFrame = new cc.SpriteFrame(res);
                    }
                });
            }
            else if ((PlatUtils_1.default.IsVIVO || PlatUtils_1.default.IsHuaWei) && this._data.icon) {
                // 有icon
                this._titleLabel.node.active = true;
                this._icon.node.active = true;
                this._img.node.active = false;
                this._desLabel.node.active = true;
                CompatibleTool_1.default.LoadRes(this._data.icon, function (err, res) {
                    if (!err && cc.isValid(_this) && _this._icon) {
                        _this._icon.spriteFrame = new cc.SpriteFrame(res);
                    }
                });
            }
            this._hideInstallBtn.active = false;
            this._closeBtn.active = false;
            // if(this.ServerConfig.intersititia_close_delay_time == 0){
            //     this._closeBtn.active = true;
            //     this._hideInstallBtn.active = true;
            // }else{
            this.scheduleOnce(function () {
                _this._closeBtn.active = true;
                _this._hideInstallBtn.active = true;
            }, this.ServerConfig.intersititia_close_delay_time || 0);
            // }
            if (PlatUtils_1.default.IsHuaWei) {
                this._sourceLable.string = this._data.source ? this._data.source : "";
            }
        }
    };
    YZ_NativeInsert.prototype.onBtnClickHandler = function (event, data) {
        console.log("event.target.name:", event.target.name);
        switch (event.target.name) {
            case "Btn_Close": {
                this._panel.active = false;
                this._mask.active = false;
                break;
            }
            case "Btn_HideInstall":
            case "Img":
            case "Btn_Install":
                this._reportAdClick();
                break;
            case "Btn_Download": {
                if (Utils_1.utils.ServerConfig.native_intersititial_click_range && Utils_1.utils.ServerConfig.native_intersititial_click_range == 2) {
                    Utils_1.utils.showLog("服务器native_intersititial_click_range配置为2，只能点击安装按钮算安装");
                    return;
                }
                this._reportAdClick();
                break;
            }
        }
    };
    YZ_NativeInsert.prototype._reportAdShow = function () {
        if (this._data) {
            if (this._nativeAd && this._panel.active) {
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.SHOW_SUCCESS, new EventAdInfo_1.AdEventParameter(this._data.adId));
                Utils_1.utils.showLog("上报原生插屏广告展示! adId:" + this._data.adId + " #active=" + this.node.active);
                this._nativeAd.reportAdShow({
                    adId: this._data.adId
                });
            }
        }
    };
    YZ_NativeInsert.prototype._reportAdClick = function () {
        if (this._data) {
            Utils_1.utils.showLog("上报原生插屏广告点击! adId:" + this._data.adId);
            if (this._nativeAd) {
                YouWanAnalytics_1.default.EventAdWithObj(EventAdInfo_1.YwAdType.NATIVE_INTERSITITIAL, EventAdInfo_1.YwAdStatus.CLICK, new EventAdInfo_1.AdEventParameter(this._data.adId));
                this._nativeAd.reportAdClick({
                    adId: this._data.adId
                });
                // 服务器控制点击后是否关闭插屏广告
                if (this.ServerConfig.intersititial_click_close ? (this.ServerConfig.intersititial_click_close == "true") : true) {
                    this._panel.active = false;
                    this._mask.active = false;
                }
                // 点击后调整关闭按钮大小和触发按钮相同的大小
                this._closeBtn.active = true;
                this._hideInstallBtn.active = true;
                this._closeBtn.setContentSize(cc.size(this.ServerConfig.intersititia_close_but_range, this.ServerConfig.intersititia_close_but_range));
                if (PlatUtils_1.default.IsOPPO) {
                    Utils_1.utils.oppoTool.countNativeInserClick();
                }
                else if (PlatUtils_1.default.IsVIVO) {
                    Utils_1.utils.Tool_Vivo.countNativeInserClick();
                }
                if (PlatUtils_1.default.IsHuaWei) {
                    this.node.destroy();
                    this.downLoadAd();
                }
            }
        }
    };
    YZ_NativeInsert.prototype.downLoadAd = function () {
        return;
        var resultCode = this._nativeAd.startDownload({
            adId: this._data.adId
        });
        Utils_1.utils.showLog('原生广告主动下载 resumeDownloadresultCode = ' + resultCode);
    };
    YZ_NativeInsert = __decorate([
        ccclass
    ], YZ_NativeInsert);
    return YZ_NativeInsert;
}(cc.Component));
exports.default = YZ_NativeInsert;

cc._RF.pop();