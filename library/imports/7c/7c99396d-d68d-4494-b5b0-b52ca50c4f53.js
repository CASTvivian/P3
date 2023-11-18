"use strict";
cc._RF.push(module, '7c993lt1o1ElLWwtSylDE9T', 'YZ_NativeSplashView');
// common-plugin/Scripts/YZ_NativeSplashView.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_NativeSplashView = /** @class */ (function (_super) {
    __extends(YZ_NativeSplashView, _super);
    function YZ_NativeSplashView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._sourceLable = null;
        _this._titleLabel = null;
        _this._desLabel = null;
        _this._icon = null;
        // _mask: cc.Node = null;
        _this._btnLabel = null;
        _this._img = null;
        _this._timeLabel = null;
        _this._nativeAd = null;
        _this._data = null;
        _this._dataDirty = false;
        _this._btnDownLoad = null;
        _this.ratio = 1;
        _this.canSkip = true; //直接跳过
        return _this;
    }
    Object.defineProperty(YZ_NativeSplashView.prototype, "ServerConfig", {
        get: function () {
            return Utils_1.utils.ServerConfig;
        },
        enumerable: false,
        configurable: true
    });
    YZ_NativeSplashView.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;
            this._panel = this.node.getChildByName("LandscapePanel");
        }
        else {
            this.ratio = cc.winSize.width / 1080;
            this._panel = this.node.getChildByName("PortraitPanel");
        }
        this._panel.active = true;
        // cc.game.addPersistRootNode(this.node);
        var canSkip = Utils_1.utils.getConfigByKey("native_splash_can_skip");
        if (canSkip == "false") {
            this.canSkip = false;
        }
        // this._panel = this.node.getChildByName("Panel");
        this._panel.scale = this.ratio;
        this._icon = this._panel.getChildByName("Icon").getComponent(cc.Sprite);
        this._img = this._panel.getChildByName("Img").getComponent(cc.Sprite);
        this._titleLabel = this._panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._desLabel = this._panel.getChildByName("DesLabel").getComponent(cc.Label);
        // this._mask = this.node.getChildByName("Mask");
        this._sourceLable = this._img.node.getChildByName("source").getComponent(cc.Label);
        this._btnDownLoad = this._panel.getChildByName("Btn_Download");
        this._btnLabel = this._btnDownLoad.getComponentInChildren(cc.Label);
        this._timeLabel = this._panel.getChildByName("time").children[0].getComponent(cc.Label);
        if (PlatUtils_1.default.IsHuaWei) {
            //@ts-ignore
            qg.onShow(this._reportAdShow.bind(this));
        }
        if (Utils_1.utils.getConfigByKey("native_splash_full_cilck") == "true") {
            this._btnDownLoad.active = true;
        }
        // this._panel.scale = ratio;
    };
    YZ_NativeSplashView.prototype.onDestroy = function () {
        if (PlatUtils_1.default.IsHuaWei) {
            //@ts-ignore
            qg.offShow(this._reportAdShow);
            this._nativeAd.destroy();
            cc.director.emit("SplashViewOff");
        }
    };
    YZ_NativeSplashView.prototype.init = function (nativeAd, data) {
        this._nativeAd = nativeAd;
        this._data = data;
        this._dataDirty = true;
    };
    YZ_NativeSplashView.prototype.update = function (dt) {
        if (this._data && this._dataDirty) {
            this._panel.active = true;
            // this._mask.active = true;
            this._dataDirty = false;
            this._updateContent();
        }
        if (!this._data) {
            this._panel.active = false;
            // this._mask.active = false;
        }
    };
    YZ_NativeSplashView.prototype._updateContent = function () {
        var _this = this;
        if (this._data) {
            // 上报原生插屏广告
            this._reportAdShow();
            if (PlatUtils_1.default.IsHuaWei) {
                this._data.icon = "";
            }
            // utils.nativeInsertShowCount++;
            Utils_1.utils.showLog("data:", JSON.stringify(this._data));
            this._titleLabel.string = this._data.title ? this._data.title : "";
            this._desLabel.string = this._data.desc ? this._data.desc : "";
            this._panel.getChildByName("Btn_Install").getComponentInChildren(cc.Label).string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
            // this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
            // utils.showLog("this._btnLabel.string" + this._btnLabel.string);
            if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                // 有图片，优先显示图片
                this._titleLabel.node.active = true;
                this._icon.node.active = false;
                this._img.node.active = true;
                this._desLabel.node.active = true;
                var t_1 = 5;
                var task_1 = setInterval(function () {
                    t_1--;
                    if (t_1 == 0) {
                        _this._timeLabel.string = "\u8DF3\u8FC7";
                    }
                    else if (t_1 == -1) {
                        clearInterval(task_1);
                        _this.node.destroy();
                    }
                    else {
                        _this._timeLabel.string = "\u70B9\u51FB\u8DF3\u8FC7" + t_1 + "s";
                    }
                }, 1000);
                Utils_1.utils.showLog("有图片，优先显示图片");
                CompatibleTool_1.default.LoadRes(this._data.imgUrlList[0], function (err, res) {
                    Utils_1.utils.showLog("加载图片信息 ...." + err);
                    if (!err && cc.isValid(_this) && _this._img) {
                        _this._img.spriteFrame = new cc.SpriteFrame(res);
                    }
                });
            }
            else if (PlatUtils_1.default.IsHuaWei && this._data.icon) {
                // 有icon
                Utils_1.utils.showLog("没有图片，显示icon");
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
            else {
                Utils_1.utils.showLog("什么都没有!!!");
            }
            if (PlatUtils_1.default.IsHuaWei) {
                this._sourceLable.string = this._data.source ? this._data.source : "";
            }
        }
    };
    YZ_NativeSplashView.prototype.onBtnClickHandler = function (event, data) {
        switch (event.target.name) {
            case "time":
                if (this.canSkip) {
                    this.node.destroy();
                }
                else {
                    if (this._timeLabel.string == "跳过") {
                        this.node.destroy();
                    }
                }
                // this._panel.active = false;
                // this._mask.active = false;
                break;
            case "Btn_Close": {
                this.node.destroy();
                // this._panel.active = false;
                // this._mask.active = false;
                break;
            }
            case "Img":
            case "Icon":
            case "Btn_Install":
                this._reportAdClick();
                break;
            case "Btn_Download": {
                this._reportAdClick();
                break;
            }
        }
    };
    YZ_NativeSplashView.prototype._reportAdShow = function () {
        if (this._data) {
            if (this._nativeAd && this._panel.active) {
                Utils_1.utils.showLog("上报原生插屏广告展示! adId:" + this._data.adId + " #active=" + this.node.active);
                this._nativeAd.reportAdShow({
                    adId: this._data.adId
                });
            }
        }
    };
    YZ_NativeSplashView.prototype._reportAdClick = function () {
        if (this._data) {
            Utils_1.utils.showLog("上报原生开屏广告点击! adId:" + this._data.adId);
            if (this._nativeAd) {
                this._nativeAd.reportAdClick({
                    adId: this._data.adId
                });
                this._panel.active = false;
                // this._mask.active = false;
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
    YZ_NativeSplashView.prototype.downLoadAd = function () {
        return;
        var resultCode = this._nativeAd.startDownload({
            adId: this._data.adId
        });
        Utils_1.utils.showLog('原生广告主动下载 resumeDownloadresultCode = ' + resultCode);
    };
    YZ_NativeSplashView = __decorate([
        ccclass
    ], YZ_NativeSplashView);
    return YZ_NativeSplashView;
}(cc.Component));
exports.default = YZ_NativeSplashView;

cc._RF.pop();