
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_NativeInsert.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTmF0aXZlSW5zZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxpQ0FBZ0M7QUFDaEMsbURBQThDO0FBQzlDLDZDQUF3QztBQUN4Qyx1REFBaUY7QUFDakYsK0RBQTBEO0FBRXBELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBa1hDO1FBaFhHLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ3hCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFDdkIscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFFaEMsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixXQUFLLEdBQVEsSUFBSSxDQUFDO1FBQ2xCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBTzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLHVCQUFpQixHQUFHLEVBQUUsQ0FBQzs7SUEyVjNCLENBQUM7SUFqV0csc0JBQVcseUNBQVk7YUFBdkI7WUFDSSxPQUFPLGFBQUssQ0FBQyxZQUFZLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFLRCxnQ0FBTSxHQUFOO1FBRUksSUFBSSxhQUFLLENBQUMsV0FBVyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENB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ImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcbmltcG9ydCBZWl9Db25zdGFudCBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgeyBZd0FkVHlwZSwgWXdBZFN0YXR1cywgQWRFdmVudFBhcmFtZXRlciB9IGZyb20gXCIuL1lvdVdhblNESy9FdmVudEFkSW5mb1wiO1xyXG5pbXBvcnQgWW91V2FuQW5hbHl0aWNzIGZyb20gXCIuL1lvdVdhblNESy9Zb3VXYW5BbmFseXRpY3NcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9OYXRpdmVJbnNlcnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfc291cmNlTGFibGU6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIF90aXRsZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBfZGVzTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIF9pY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgX21hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2J0bkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBfY2xvc2VCdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2ltZzogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIF9oaWRlSW5zdGFsbEJ0bjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgX25hdGl2ZUFkOiBhbnkgPSBudWxsO1xyXG4gICAgX2RhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGdldCBTZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWxzLlNlcnZlckNvbmZpZztcclxuICAgIH1cclxuICAgIGJnVGV4dHVyZTogY2MuU3ByaXRlRnJhbWU7XHJcbiAgICBidG5UZXh0dXJlOiBjYy5TcHJpdGVGcmFtZTtcclxuICAgIF9idG5Eb3duTG9hZDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfZGVmYXVsdENsb3NlU2l6ZSA9IDYwO1xyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgICBpZiAodXRpbHMub3RoZXJDb25maWcgJiYgdXRpbHMub3RoZXJDb25maWcuZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdyb3VwID0gdXRpbHMub3RoZXJDb25maWcuZ3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX2ljb24gPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5faW1nID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJJbWdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5fdGl0bGVMYWJlbCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiVGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX2Rlc0xhYmVsID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJEZXNMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX21hc2sgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZUxhYmxlID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJJbWdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzb3VyY2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9idG5Eb3duTG9hZCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0Rvd25sb2FkXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0bkxhYmVsID0gdGhpcy5fYnRuRG93bkxvYWQuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2hpZGVJbnN0YWxsQnRuID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5fSGlkZUluc3RhbGxcIik7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VCdG4gPSB0aGlzLl9oaWRlSW5zdGFsbEJ0bi5nZXRDaGlsZEJ5TmFtZShcIkJ0bl9DbG9zZVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBiZyA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgbGV0IGJnVXJsID0gdXRpbHMuU2VydmVyQ29uZmlnLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX2JnX2ltZztcclxuICAgICAgICBpZiAoYmdVcmwgJiYgIXRoaXMuYmdUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXMoYmdVcmwsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQoc2VsZikgJiYgc2VsZi5fcGFuZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogY2MuU2l6ZSA9IHNlbGYuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJnVGV4dHVyZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBiZy5zcHJpdGVGcmFtZSA9IHNlbGYuYmdUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuc2V0Q29udGVudFNpemUoc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmFjayA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0luc3RhbGxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGxldCBiYWNrVXJsID0gdXRpbHMuU2VydmVyQ29uZmlnLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX2J0bl9pbWc7XHJcbiAgICAgICAgaWYgKGJhY2tVcmwgJiYgIXRoaXMuYnRuVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKGJhY2tVcmwsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQoc2VsZikgJiYgc2VsZi5fcGFuZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogY2MuU2l6ZSA9IHNlbGYuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0luc3RhbGxcIikuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0blRleHR1cmUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFjay5zcHJpdGVGcmFtZSA9IHNlbGYuYnRuVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkJ0bl9JbnN0YWxsXCIpLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgLy8g5qiq5bGP5ri45oiPXHJcbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDE5MjAgKiAwLjc7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICAvLyAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNyAqICgxMjgwIC8gdXRpbHMuY3VyX3Rvb2wuU3lzSW5mby5zY3JlZW5XaWR0aCk7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlmICghUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLl9wYW5lbC53aWR0aCA9IGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9wYW5lbC5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodCAqIDAuOTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZGVzTGFiZWwuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkuYm90dG9tID0gMjAwO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9kZXNMYWJlbC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5fSW5zdGFsbFwiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5ib3R0b20gPSA1MDtcclxuICAgICAgICAgICAgLy8gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5fSW5zdGFsbFwiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLl9pbWcubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSAodGhpcy5fdGl0bGVMYWJlbC5ub2RlLnkgLSB0aGlzLl9kZXNMYWJlbC5ub2RlLnkpIC8gMztcclxuICAgICAgICAgICAgLy8gdGhpcy5faW1nLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkuYm90dG9tID0gKHRoaXMuX3RpdGxlTGFiZWwubm9kZS55IC0gdGhpcy5fZGVzTGFiZWwubm9kZS55KSAvIDJcclxuICAgICAgICAgICAgLy8gdGhpcy5faW1nLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLl90aXRsZUxhYmVsLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudG9wID0gNzA7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3RpdGxlTGFiZWwubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2Nsb3NlQnRuLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRvcCA9IDY1O1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9jbG9zZUJ0bi5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLnNjYWxlID0gcmF0aW87XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLmdldENvbXBvbmVudChjYy5XaWRnZXQpLmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9wYW5lbC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5ib3R0b20gPSAzNzg7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgICAgICB0aGlzLl9wYW5lbC5zY2FsZSA9IHJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZUJ0blJhbmdlID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2Nsb3NlX2J1dF9yYW5nZSA/IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfcmFuZ2UgOiB0aGlzLl9jbG9zZUJ0bi5nZXRDb250ZW50U2l6ZSgpLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VCdG5TaXplID0gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2Nsb3NlX2J1dF9zaXplID8gdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2Nsb3NlX2J1dF9zaXplIDogdGhpcy5fY2xvc2VCdG4uZ2V0Q29udGVudFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uc2V0Q29udGVudFNpemUoY2Muc2l6ZShjbG9zZUJ0blJhbmdlLCBjbG9zZUJ0blJhbmdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLnNldENvbnRlbnRTaXplKGNjLnNpemUoY2xvc2VCdG5TaXplLCBjbG9zZUJ0blNpemUpKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idG5Eb3duTG9hZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAvLyBxZy5vblNob3codGhpcy5fcmVwb3J0QWRTaG93LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJYbV9NYXNrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuX3BhbmVsLnNjYWxlID0gcmF0aW87XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rOo5YaM5Y6f55Sf5o+S5bGP55uR5ZCs5LqL5Lu2ID4+Pj4+LlwiKTtcclxuXHJcbiAgICAgICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJIdWFXZWlPblNob3cgPj4+Pj4+XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRTaG93KCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTyB8fCBQbGF0VXRpbHMuSXNWSVZPIHx8IFBsYXRVdGlscy5Jc0h1YVdlaSB8fCBQbGF0VXRpbHMuSXNYaWFvTWkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQ6IGNjLkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZENsaWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuWVpfTmF0aXZlQWRDbGljaywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRDbGljaygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLlNob3dCYW5uZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChuYXRpdmVBZDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9uYXRpdmVBZCA9IG5hdGl2ZUFkO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YSAmJiB0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2RhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX3VwZGF0ZUNvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfcmFuZ2UgPSAxMDtcclxuICAgICAgICAvLyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3NpemUgPSA5MDtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xyXG4gICAgICAgICAgICAvLyDkuIrmiqXljp/nlJ/mj5LlsY/lub/lkYpcclxuICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRTaG93KCk7XHJcbiAgICAgICAgICAgIHV0aWxzLm5hdGl2ZUluc2VydFNob3dDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuU2VydmVyQ29uZmlnLmZpcnN0X2ludGVyc3RpdGlhbF9kZWxheWVkX2xldmVsX2Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMubmF0aXZlSW5zZXJ0U2hvd0NvdW50ID4gMyAmJiB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnN0aXRpYWxfZGVsYXllZF9sZXZlbF9jbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLm5hdGl2ZUluc2VydFJlc2l6ZUNsb3NlQnRuU2hvd0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLm5hdGl2ZUluc2VydFJlc2l6ZUNsb3NlQnRuU2hvd0NvdW50ICUgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzdGl0aWFsX2RlbGF5ZWRfbGV2ZWxfY2xvc2UgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDljp/nlJ/mj5LlsY/lhbPpl63mjInpkq7orr7nva7mnI3liqHlmajphY3nva7lpKflsI8ke3RoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfc2l6ZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlQnRuU2l6ZSA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfc2l6ZSA/IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfc2l6ZSA6IHRoaXMuX2RlZmF1bHRDbG9zZVNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVJbnN0YWxsQnRuLnNldENvbnRlbnRTaXplKGNjLnNpemUoY2xvc2VCdG5TaXplLCBjbG9zZUJ0blNpemUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWOn+eUn+aPkuWxj+WFs+mXreaMiemSrizkuI3mu6HotrPmnI3liqHlmajmnaHku7bvvIzorr7nva7kuLrpu5jorqTlpKflsI/vvIFgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlSW5zdGFsbEJ0bi5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMuX2RlZmF1bHRDbG9zZVNpemUsIHRoaXMuX2RlZmF1bHRDbG9zZVNpemUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBjbG9zZUJ0blNpemUgPSB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3NpemUgPyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3NpemUgOiB0aGlzLl9kZWZhdWx0Q2xvc2VTaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZUluc3RhbGxCdG4uc2V0Q29udGVudFNpemUoY2Muc2l6ZShjbG9zZUJ0blNpemUsIGNsb3NlQnRuU2l6ZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jbG9zZUJ0bi5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikub3BhY2l0eSA9IENDX0RFQlVHID8gMjU1IDogMDtcclxuICAgICAgICAgICAgdGhpcy5faGlkZUluc3RhbGxCdG4ub3BhY2l0eSA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfYWxwaGEgPyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X2FscGhhIDogMjU1O1xyXG4gICAgICAgICAgICBsZXQgY2xvc2VCdG5SYW5nZSA9IHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9idXRfcmFuZ2UgPyB0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFfY2xvc2VfYnV0X3JhbmdlIDogdGhpcy5fZGVmYXVsdENsb3NlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uc2V0Q29udGVudFNpemUoY2Muc2l6ZShjbG9zZUJ0blJhbmdlLCBjbG9zZUJ0blJhbmdlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aXRsZUxhYmVsLnN0cmluZyA9IHRoaXMuX2RhdGEudGl0bGUgPyB0aGlzLl9kYXRhLnRpdGxlIDogXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5fZGVzTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5kZXNjID8gdGhpcy5fZGF0YS5kZXNjIDogXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5fYnRuTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5jbGlja0J0blR4dCA/IHRoaXMuX2RhdGEuY2xpY2tCdG5UeHQgOiBcIuafpeeci+ivpuaDhVwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEuaW1nVXJsTGlzdCAmJiB0aGlzLl9kYXRhLmltZ1VybExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5pyJ5Zu+54mH77yM5LyY5YWI5pi+56S65Zu+54mHXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ljb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ltZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgQ29tcGF0aWJsZVRvb2wuTG9hZFJlcyh0aGlzLl9kYXRhLmltZ1VybExpc3RbMF0sIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLliqDovb3lm77niYfkv6Hmga8gLi4uLlwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX2ltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbWcuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTyAmJiB0aGlzLl9kYXRhLmljb25VcmxMaXN0ICYmIHRoaXMuX2RhdGEuaWNvblVybExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5pyJaWNvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGVMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ltZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXModGhpcy5fZGF0YS5pY29uVXJsTGlzdFswXSwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLl9pY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ljb24uc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoUGxhdFV0aWxzLklzVklWTyB8fCBQbGF0VXRpbHMuSXNIdWFXZWkpICYmIHRoaXMuX2RhdGEuaWNvbikge1xyXG4gICAgICAgICAgICAgICAgLy8g5pyJaWNvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGVMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ltZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXModGhpcy5fZGF0YS5pY29uLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX2ljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9oaWRlSW5zdGFsbEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fY2xvc2VCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYV9jbG9zZV9kZWxheV90aW1lID09IDApe1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5fY2xvc2VCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuX2hpZGVJbnN0YWxsQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZUluc3RhbGxCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2Nsb3NlX2RlbGF5X3RpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291cmNlTGFibGUuc3RyaW5nID0gdGhpcy5fZGF0YS5zb3VyY2UgPyB0aGlzLl9kYXRhLnNvdXJjZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuQ2xpY2tIYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJldmVudC50YXJnZXQubmFtZTpcIiwgZXZlbnQudGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0Lm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkJ0bl9DbG9zZVwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuX0hpZGVJbnN0YWxsXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJJbWdcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkJ0bl9JbnN0YWxsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZENsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkJ0bl9Eb3dubG9hZFwiOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLm5hdGl2ZV9pbnRlcnNpdGl0aWFsX2NsaWNrX3JhbmdlICYmIHV0aWxzLlNlcnZlckNvbmZpZy5uYXRpdmVfaW50ZXJzaXRpdGlhbF9jbGlja19yYW5nZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqG5hdGl2ZV9pbnRlcnNpdGl0aWFsX2NsaWNrX3Jhbmdl6YWN572u5Li6Mu+8jOWPquiDveeCueWHu+WuieijheaMiemSrueul+WuieijhVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZENsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVwb3J0QWRTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVBZCAmJiB0aGlzLl9wYW5lbC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfSU5URVJTSVRJVElBTCwgWXdBZFN0YXR1cy5TSE9XX1NVQ0NFU1MsIG5ldyBBZEV2ZW50UGFyYW1ldGVyKHRoaXMuX2RhdGEuYWRJZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXljp/nlJ/mj5LlsY/lub/lkYrlsZXnpLohIGFkSWQ6XCIgKyB0aGlzLl9kYXRhLmFkSWQgKyBcIiAjYWN0aXZlPVwiICsgdGhpcy5ub2RlLmFjdGl2ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWQucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgICAgICAgICBhZElkOiB0aGlzLl9kYXRhLmFkSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9yZXBvcnRBZENsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXljp/nlJ/mj5LlsY/lub/lkYrngrnlh7shIGFkSWQ6XCIgKyB0aGlzLl9kYXRhLmFkSWQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVBZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIFlvdVdhbkFuYWx5dGljcy5FdmVudEFkV2l0aE9iaihZd0FkVHlwZS5OQVRJVkVfSU5URVJTSVRJVElBTCwgWXdBZFN0YXR1cy5DTElDSywgbmV3IEFkRXZlbnRQYXJhbWV0ZXIodGhpcy5fZGF0YS5hZElkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRJZDogdGhpcy5fZGF0YS5hZElkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDmnI3liqHlmajmjqfliLbngrnlh7vlkI7mmK/lkKblhbPpl63mj5LlsY/lub/lkYpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlcnZlckNvbmZpZy5pbnRlcnNpdGl0aWFsX2NsaWNrX2Nsb3NlID8gKHRoaXMuU2VydmVyQ29uZmlnLmludGVyc2l0aXRpYWxfY2xpY2tfY2xvc2UgPT0gXCJ0cnVlXCIpIDogdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g54K55Ye75ZCO6LCD5pW05YWz6Zet5oyJ6ZKu5aSn5bCP5ZKM6Kem5Y+R5oyJ6ZKu55u45ZCM55qE5aSn5bCPXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZUluc3RhbGxCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlQnRuLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2Nsb3NlX2J1dF9yYW5nZSwgdGhpcy5TZXJ2ZXJDb25maWcuaW50ZXJzaXRpdGlhX2Nsb3NlX2J1dF9yYW5nZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbC5jb3VudE5hdGl2ZUluc2VyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlRvb2xfVml2by5jb3VudE5hdGl2ZUluc2VyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duTG9hZEFkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRvd25Mb2FkQWQoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENvZGUgPSB0aGlzLl9uYXRpdmVBZC5zdGFydERvd25sb2FkKHtcclxuICAgICAgICAgICAgYWRJZDogdGhpcy5fZGF0YS5hZElkXHJcbiAgICAgICAgfSlcclxuICAgICAgICB1dGlscy5zaG93TG9nKCfljp/nlJ/lub/lkYrkuLvliqjkuIvovb0gcmVzdW1lRG93bmxvYWRyZXN1bHRDb2RlID0gJyArIHJlc3VsdENvZGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==