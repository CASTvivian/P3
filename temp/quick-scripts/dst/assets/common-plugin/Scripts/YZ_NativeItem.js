
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_NativeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTmF0aXZlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBRWhDLDZDQUE0RDtBQUM1RCxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUErTEM7UUE3TFcscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFDakMsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFDaEMsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFDL0Isa0JBQVksR0FBYyxJQUFJLENBQUM7UUFDL0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXJDLGVBQVMsR0FBc0IsSUFBSSxDQUFDO1FBQ3BDLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixZQUFNLEdBQVMsSUFBSSxDQUFDO1FBRXBCLGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBOEs1QixDQUFDO0lBM0tHLDhCQUFNLEdBQU47UUFBQSxpQkEyQkM7UUExQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztR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QUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELHFDQUFhLEdBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNsQzthQUFNO1lBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUE5TGdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0ErTGpDO0lBQUQsb0JBQUM7Q0EvTEQsQUErTEMsQ0EvTDBDLEVBQUUsQ0FBQyxTQUFTLEdBK0x0RDtrQkEvTG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBZWl9OYXRpdmVBZE9iamVjdCBmcm9tIFwiLi9ZWl9OYXRpdmVBZE9iamVjdFwiO1xyXG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9OYXRpdmVJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9uYXRpdmVBZFRpbHRsZTogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlQWRJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlQWREZXNjOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9uYXRpdmVBZEltZzogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2Nsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2Rvd25CdG46IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX25vSW1hZ2VWaWV3OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBfbmF0aXZlQWQ6IFlaX05hdGl2ZUFkT2JqZWN0ID0gbnVsbDtcclxuICAgIGlzU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2hvd1R5cGU6IG51bWJlciA9IDE7XHJcblxyXG4gICAgcGFyYW1zPzogYW55ID0gbnVsbDtcclxuXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5jaGlsZHJlblswXTtcclxuICAgICAgICB0aGlzLl9ub0ltYWdlVmlldyA9IHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShcIk5vSW1hZ2VWaWV3XCIpO1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUFkVGlsdGxlID0gdGhpcy5fbm9JbWFnZVZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUFkSWNvbiA9IHRoaXMuX25vSW1hZ2VWaWV3LmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLl9uYXRpdmVBZERlc2MgPSB0aGlzLl9ub0ltYWdlVmlldy5nZXRDaGlsZEJ5TmFtZShcImRlc2NcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9uYXRpdmVBZEltZyA9IHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImltYWdlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vIHRoaXMuX2Rvd25CdG4gPSB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5fRG93bmxvYWRcIik7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VCdG4gPSB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJjbG9zZUJ0blwiKTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSB0aGlzLm5vZGUucGFyZW50LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IHRoaXMubm9kZS5wYXJlbnQuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZy5zdF9uYXRpdmVfYWRfaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdXRpbHMuU2VydmVyQ29uZmlnLnN0X25hdGl2ZV9hZF9oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuWVpfTmF0aXZlQWRDbGljaywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlcG9ydEFkQ2xpY2soKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLl9jbG9zZUJ0bi5hY3RpdmUgPSB1dGlscy5TZXJ2ZXJDb25maWcuc3RfYmFubmVyX2Nsb3NlX2J1dF9zaG93ID8gKHV0aWxzLlNlcnZlckNvbmZpZy5zdF9iYW5uZXJfY2xvc2VfYnV0X3Nob3cgPT0gXCJ0cnVlXCIpIDogZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5fZG93bkJ0bi5hY3RpdmUgPSB1dGlscy5TZXJ2ZXJDb25maWcuc2hvd19zdGF0ZW1lbnRfbmF0aXZlQWRfY2xvc2VCdG4gPyAodXRpbHMuU2VydmVyQ29uZmlnLnNob3dfc3RhdGVtZW50X25hdGl2ZUFkX2Nsb3NlQnRuID09IFwidHJ1ZVwiKSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlQWQgJiYgIXRoaXMuaXNTaG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93TmF0aXZlQWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluaXQobmF0aXZlT2JqOiBZWl9OYXRpdmVBZE9iamVjdCkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLliJ3lp4vljJbljZXkuKrljp/nlJ/lub/lkYo+Pj5cIik7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWQgPSBuYXRpdmVPYmo7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd05hdGl2ZUFkKCkge1xyXG5cclxuICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLnN0X25hdGl2ZV9hZF9pc19oaWRlX2Jhbm5lciAmJiB1dGlscy5TZXJ2ZXJDb25maWcuc3RfbmF0aXZlX2FkX2lzX2hpZGVfYmFubmVyID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajphY3nva7mmL7npLrnu5Pnrpfljp/nlJ/lub/lkYrlkI7pmpDol49iYW5uZXIgPj4+XCIpO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcuc3RfbmF0aXZlX2FkX3Nob3dfcmVjX2Jhbm5lciAmJiB1dGlscy5TZXJ2ZXJDb25maWcuc3RfbmF0aXZlX2FkX3Nob3dfcmVjX2Jhbm5lciA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93UmVjQmFubmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmF0aXZlRGF0YSA9IHRoaXMuX25hdGl2ZUFkLmRhdGE7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBuYXRpdmVEYXRhLnRpdGxlO1xyXG4gICAgICAgIGxldCBkZXNjID0gbmF0aXZlRGF0YS5kZXNjO1xyXG4gICAgICAgIGlmICh0aXRsZS5sZW5ndGggPiA2KSB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGUuc2xpY2UoMCwgNik7XHJcbiAgICAgICAgICAgIHRpdGxlICs9IFwiLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXNjLmxlbmd0aCA+IDE4KSB7XHJcbiAgICAgICAgICAgIGRlc2MgPSBkZXNjLnNsaWNlKDAsIDE3KTtcclxuICAgICAgICAgICAgZGVzYyArPSBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWRUaWx0bGUuc3RyaW5nID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWREZXNjLnN0cmluZyA9IGRlc2M7XHJcblxyXG4gICAgICAgIGlmIChuYXRpdmVEYXRhLmltZ1VybExpc3QgJiYgbmF0aXZlRGF0YS5pbWdVcmxMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8g5pyJ5Zu+54mH77yM5LyY5YWI5pi+56S65Zu+54mHXHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3RpdGxlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9pY29uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2ltZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2Rlc0xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbm9JbWFnZVZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkSW1nLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXMobmF0aXZlRGF0YS5pbWdVcmxMaXN0WzBdLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgdGhpcy5fbmF0aXZlQWRJbWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZEltZy5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkSW1nLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTyAmJiBuYXRpdmVEYXRhLmljb25VcmxMaXN0ICYmIG5hdGl2ZURhdGEuaWNvblVybExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyDmnIlpY29uXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVBZEltZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9ub0ltYWdlVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKG5hdGl2ZURhdGEuaWNvblVybExpc3RbMF0sIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLl9uYXRpdmVBZEljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZEljb24uc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXNWSVZPICYmIG5hdGl2ZURhdGEuaWNvbikge1xyXG4gICAgICAgICAgICAvLyDmnIlpY29uXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVBZEltZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9ub0ltYWdlVmlldy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXMobmF0aXZlRGF0YS5pY29uLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgdGhpcy5fbmF0aXZlQWRJY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRJY29uLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlcG9ydEFkU2hvdygpO1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jYWxsQmFjayAmJiB0aGlzLnBhcmFtcy5jYWxsQmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gb25FbmFibGUoKSB7XHJcbiAgICAvLyAgICAgLy8gaWYgKFBsYXRVdGlscy5Jc09QUE8gfHwgUGxhdFV0aWxzLklzVklWTykge1xyXG4gICAgLy8gICAgIC8vICAgICBpZiAoIXRoaXMuX2Nsb3NlQnRuLmFjdGl2ZSkge1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQ6IGNjLkV2ZW50KSA9PiB7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgdGhpcy5fcmVwb3J0QWRDbGljaygpO1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAvLyAgICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvLyB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gb25EaXNhYmxlKCkge1xyXG4gICAgLy8gICAgIGlmIChQbGF0VXRpbHMuSXNPUFBPIHx8IFBsYXRVdGlscy5Jc1ZJVk8pIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnRhcmdldE9mZih0aGlzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgb25CdG5DbGlja0hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUJ0blwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuX0Rvd25sb2FkXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0QWRDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZXBvcnRBZFNob3coKSB7XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCJyZXBvcnRBZFNob3dcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkLnJlcG9ydEFkU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBvcnRBZENsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVBZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVBZC5yZXBvcnRBZENsaWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW5v+WRiuWKoOi9veWksei0pe+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19