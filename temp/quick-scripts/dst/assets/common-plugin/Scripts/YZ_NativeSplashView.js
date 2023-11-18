
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_NativeSplashView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTmF0aXZlU3BsYXNoVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLGlDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQStQQztRQTdQRyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFDM0IsV0FBSyxHQUFjLElBQUksQ0FBQztRQUN4Qix5QkFBeUI7UUFDekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRTVCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsV0FBSyxHQUFRLElBQUksQ0FBQztRQUNsQixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQU81QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQyxNQUFNOztJQXVPbkMsQ0FBQztJQS9PRyxzQkFBVyw2Q0FBWTthQUF2QjtZQUNJLE9BQU8sYUFBSyxDQUFDLFlBQVksQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQU9ELG9DQUFNLEdBQU47UUFFSSxJQUFJLGFBQUssQ0FBQyxXQUFXLElBQUksYUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENB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QyxJQUFJO2lCQUN4QixDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUMzQiw2QkFBNkI7Z0JBRzdCLElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ2xCLGFBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztpQkFDMUM7cUJBQU0sSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtvQkFDekIsYUFBSyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2lCQUMzQztnQkFFRCxJQUFJLG1CQUFTLENBQUMsUUFBUSxFQUFFO29CQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUVwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3JCO2FBRUo7U0FFSjtJQUNMLENBQUM7SUFHRCx3Q0FBVSxHQUFWO1FBQ0ksT0FBTztRQUNQLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzVDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7U0FDeEIsQ0FBQyxDQUFBO1FBQ0YsYUFBSyxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBOVBnQixtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQStQdkM7SUFBRCwwQkFBQztDQS9QRCxBQStQQyxDQS9QZ0QsRUFBRSxDQUFDLFNBQVMsR0ErUDVEO2tCQS9Qb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWVpfTmF0aXZlU3BsYXNoVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuICAgIF9zb3VyY2VMYWJsZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIF90aXRsZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgX2Rlc0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgX2ljb246IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgLy8gX21hc2s6IGNjLk5vZGUgPSBudWxsO1xuICAgIF9idG5MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIF9pbWc6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgX3RpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgX25hdGl2ZUFkOiBhbnkgPSBudWxsO1xuICAgIF9kYXRhOiBhbnkgPSBudWxsO1xuICAgIF9kYXRhRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgU2VydmVyQ29uZmlnKCkge1xuICAgICAgICByZXR1cm4gdXRpbHMuU2VydmVyQ29uZmlnO1xuICAgIH1cbiAgICBiZ1RleHR1cmU6IGNjLlNwcml0ZUZyYW1lO1xuICAgIGJ0blRleHR1cmU6IGNjLlNwcml0ZUZyYW1lO1xuICAgIF9idG5Eb3duTG9hZDogY2MuTm9kZSA9IG51bGw7XG4gICAgcmF0aW86IG51bWJlciA9IDE7XG5cbiAgICBjYW5Ta2lwOiBib29sZWFuID0gdHJ1ZTsgLy/nm7TmjqXot7Pov4dcbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xuICAgICAgICAgICAgdGhpcy5yYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxOTIwICogMC43NTtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTGFuZHNjYXBlUGFuZWxcIik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTA4MDtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUG9ydHJhaXRQYW5lbFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICBsZXQgY2FuU2tpcCA9IHV0aWxzLmdldENvbmZpZ0J5S2V5KFwibmF0aXZlX3NwbGFzaF9jYW5fc2tpcFwiKTtcbiAgICAgICAgaWYgKGNhblNraXAgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmNhblNraXAgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XG4gICAgICAgIHRoaXMuX3BhbmVsLnNjYWxlID0gdGhpcy5yYXRpbztcbiAgICAgICAgdGhpcy5faWNvbiA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5faW1nID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJJbWdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHRoaXMuX3RpdGxlTGFiZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIlRpdGxlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGhpcy5fZGVzTGFiZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkRlc0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIC8vIHRoaXMuX21hc2sgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXNrXCIpO1xuXG4gICAgICAgIHRoaXMuX3NvdXJjZUxhYmxlID0gdGhpcy5faW1nLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzb3VyY2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcblxuICAgICAgICB0aGlzLl9idG5Eb3duTG9hZCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0Rvd25sb2FkXCIpO1xuICAgICAgICB0aGlzLl9idG5MYWJlbCA9IHRoaXMuX2J0bkRvd25Mb2FkLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpO1xuICAgICAgICB0aGlzLl90aW1lTGFiZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcblxuICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XG5cbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgcWcub25TaG93KHRoaXMuX3JlcG9ydEFkU2hvdy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJuYXRpdmVfc3BsYXNoX2Z1bGxfY2lsY2tcIikgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2J0bkRvd25Mb2FkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5fcGFuZWwuc2NhbGUgPSByYXRpbztcblxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBxZy5vZmZTaG93KHRoaXMuX3JlcG9ydEFkU2hvdylcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJTcGxhc2hWaWV3T2ZmXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdChuYXRpdmVBZDogYW55LCBkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlQWQgPSBuYXRpdmVBZDtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgdGhpcy5fZGF0YURpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgLy8gdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHRoaXMuX21hc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgX3VwZGF0ZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAvLyDkuIrmiqXljp/nlJ/mj5LlsY/lub/lkYpcbiAgICAgICAgICAgIHRoaXMuX3JlcG9ydEFkU2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YS5pY29uID0gXCJcIjtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyB1dGlscy5uYXRpdmVJbnNlcnRTaG93Q291bnQrKztcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJkYXRhOlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9kYXRhKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3RpdGxlTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS50aXRsZSA/IHRoaXMuX2RhdGEudGl0bGUgOiBcIlwiO1xuICAgICAgICAgICAgdGhpcy5fZGVzTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5kZXNjID8gdGhpcy5fZGF0YS5kZXNjIDogXCJcIjtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0luc3RhbGxcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fZGF0YS5jbGlja0J0blR4dCA/IHRoaXMuX2RhdGEuY2xpY2tCdG5UeHQgOiBcIuafpeeci+ivpuaDhVwiO1xuICAgICAgICAgICAgLy8gdGhpcy5fYnRuTGFiZWwuc3RyaW5nID0gdGhpcy5fZGF0YS5jbGlja0J0blR4dCA/IHRoaXMuX2RhdGEuY2xpY2tCdG5UeHQgOiBcIuafpeeci+ivpuaDhVwiO1xuICAgICAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhcInRoaXMuX2J0bkxhYmVsLnN0cmluZ1wiICsgdGhpcy5fYnRuTGFiZWwuc3RyaW5nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLmltZ1VybExpc3QgJiYgdGhpcy5fZGF0YS5pbWdVcmxMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyDmnInlm77niYfvvIzkvJjlhYjmmL7npLrlm77niYdcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1nLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgdDogbnVtYmVyID0gNTtcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdC0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lTGFiZWwuc3RyaW5nID0gYOi3s+i/h2A7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lTGFiZWwuc3RyaW5nID0gYOeCueWHu+i3s+i/hyR7dH1zYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG5cbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyJ5Zu+54mH77yM5LyY5YWI5pi+56S65Zu+54mHXCIpO1xuXG4gICAgICAgICAgICAgICAgQ29tcGF0aWJsZVRvb2wuTG9hZFJlcyh0aGlzLl9kYXRhLmltZ1VybExpc3RbMF0sIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Yqg6L295Zu+54mH5L+h5oGvIC4uLi5cIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgdGhpcy5faW1nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbWcuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSAmJiB0aGlzLl9kYXRhLmljb24pIHtcbiAgICAgICAgICAgICAgICAvLyDmnIlpY29uXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuayoeacieWbvueJh++8jOaYvuekumljb25cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGVMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5faWNvbi5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1nLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgQ29tcGF0aWJsZVRvb2wuTG9hZFJlcyh0aGlzLl9kYXRhLmljb24sIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ljb24uc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS7gOS5iOmDveayoeaciSEhIVwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzSHVhV2VpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc291cmNlTGFibGUuc3RyaW5nID0gdGhpcy5fZGF0YS5zb3VyY2UgPyB0aGlzLl9kYXRhLnNvdXJjZSA6IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJ0bkNsaWNrSGFuZGxlcihldmVudDogY2MuRXZlbnQsIGRhdGE6IGFueSkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwidGltZVwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhblNraXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGltZUxhYmVsLnN0cmluZyA9PSBcIui3s+i/h1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fbWFzay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJCdG5fQ2xvc2VcIjoge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fbWFzay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJJbWdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJJY29uXCI6XG4gICAgICAgICAgICBjYXNlIFwiQnRuX0luc3RhbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZENsaWNrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQnRuX0Rvd25sb2FkXCI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRBZENsaWNrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVwb3J0QWRTaG93KCkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkICYmIHRoaXMuX3BhbmVsLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXljp/nlJ/mj5LlsY/lub/lkYrlsZXnpLohIGFkSWQ6XCIgKyB0aGlzLl9kYXRhLmFkSWQgKyBcIiAjYWN0aXZlPVwiICsgdGhpcy5ub2RlLmFjdGl2ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZC5yZXBvcnRBZFNob3coe1xuICAgICAgICAgICAgICAgICAgICBhZElkOiB0aGlzLl9kYXRhLmFkSWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZXBvcnRBZENsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4iuaKpeWOn+eUn+W8gOWxj+W5v+WRiueCueWHuyEgYWRJZDpcIiArIHRoaXMuX2RhdGEuYWRJZCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlQWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRJZDogdGhpcy5fZGF0YS5hZElkXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5vcHBvVG9vbC5jb3VudE5hdGl2ZUluc2VyQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc1ZJVk8pIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9WaXZvLmNvdW50TmF0aXZlSW5zZXJDbGljaygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd25Mb2FkQWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBkb3duTG9hZEFkKCkge1xuICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlc3VsdENvZGUgPSB0aGlzLl9uYXRpdmVBZC5zdGFydERvd25sb2FkKHtcbiAgICAgICAgICAgIGFkSWQ6IHRoaXMuX2RhdGEuYWRJZFxuICAgICAgICB9KVxuICAgICAgICB1dGlscy5zaG93TG9nKCfljp/nlJ/lub/lkYrkuLvliqjkuIvovb0gcmVzdW1lRG93bmxvYWRyZXN1bHRDb2RlID0gJyArIHJlc3VsdENvZGUpO1xuICAgIH1cbn1cbiJdfQ==