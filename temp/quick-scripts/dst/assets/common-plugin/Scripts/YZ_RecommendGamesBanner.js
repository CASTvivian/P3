
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_RecommendGamesBanner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '32806+THFFPQKdtQ7WAonI9', 'YZ_RecommendGamesBanner');
// common-plugin/Scripts/YZ_RecommendGamesBanner.ts

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
var Utils_1 = require("./Utils");
var PlatUtils_1 = require("./PlatUtils");
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_RecommendGamesBanner = /** @class */ (function (_super) {
    __extends(YZ_RecommendGamesBanner, _super);
    function YZ_RecommendGamesBanner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._listView = null;
        _this._isInit = false;
        _this.closeBtn = null;
        return _this;
    }
    YZ_RecommendGamesBanner.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._listView = this.getComponentInChildren("YZ_ListView");
        this._listView.node.active = false;
        this.closeBtn = cc.find("bg/close", this.node);
    };
    YZ_RecommendGamesBanner.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
            _this.closeBtn.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this.node.destroy();
            });
        }, this);
    };
    YZ_RecommendGamesBanner.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
        this.closeBtn.targetOff(this);
    };
    YZ_RecommendGamesBanner.prototype._initWidget = function () {
        if (this._isInit)
            return;
        if (Utils_1.utils.isShowRecommondGamesBanner()) {
            var data = Utils_1.utils.getRecommondGameList();
            if (data) {
                if (data.length > 0) {
                    if (data.length >= 6) {
                        this._isInit = true;
                        this._listView.init(data);
                        this._listView.node.active = true;
                        Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isYzBanner);
                        if (PlatUtils_1.default.IsOPPO) {
                            Utils_1.utils.oppoTool.countYzBannerShowCount();
                            Utils_1.utils.adManager.hideKyxBanner();
                        }
                    }
                    else {
                        cc.warn("交叉推广数据长度小于6");
                    }
                }
                else {
                    cc.warn("交叉推广数据长度为0");
                }
            }
            else {
                cc.warn("交叉推广数据为null!");
            }
        }
        else {
            this.node.destroy();
        }
    };
    YZ_RecommendGamesBanner = __decorate([
        ccclass
    ], YZ_RecommendGamesBanner);
    return YZ_RecommendGamesBanner;
}(cc.Component));
exports.default = YZ_RecommendGamesBanner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfUmVjb21tZW5kR2FtZXNCYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBRWhDLHlDQUFvQztBQUNwQyw2Q0FBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUQsMkNBQVk7SUFBakU7UUFBQSxxRUE4REM7UUE1REcsZUFBUyxHQUFnQixJQUFJLENBQUM7UUFFOUIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixjQUFRLEdBQVksSUFBSSxDQUFDOztJQXdEN0IsQ0FBQztJQXJERyx3Q0FBTSxHQUFOO1FBQ0ksSUFBSSxhQUFLLENBQUMsV0FBVyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsYUFBSyxDQUFDLHVCQUF1QixDQUFDO1lBQzFCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLO2dCQUNsRCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELDJDQUFTLEdBQVQ7UUFDSSxhQUFLLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUV6QixJQUFJLGFBQUssQ0FBQywwQkFBMEIsRUFBRSxFQUFFO1lBQ3BDLElBQUksSUFBSSxHQUFRLGFBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzdDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7d0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDbEMsYUFBSyxDQUFDLHFCQUFxQixDQUFDLHlCQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRXBELElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUU7NEJBQ2xCLGFBQUssQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzs0QkFDeEMsYUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt5QkFDbkM7cUJBQ0o7eUJBQU07d0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDMUI7aUJBQ0o7cUJBQU07b0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDekI7YUFDSjtpQkFBTTtnQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBN0RnQix1QkFBdUI7UUFEM0MsT0FBTztPQUNhLHVCQUF1QixDQThEM0M7SUFBRCw4QkFBQztDQTlERCxBQThEQyxDQTlEb0QsRUFBRSxDQUFDLFNBQVMsR0E4RGhFO2tCQTlEb0IsdUJBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgWVpfTGlzdFZpZXcgZnJvbSBcIi4vWVpfTGlzdFZpZXdcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9SZWNvbW1lbmRHYW1lc0Jhbm5lciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgX2xpc3RWaWV3OiBZWl9MaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgX2lzSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmICh1dGlscy5vdGhlckNvbmZpZyAmJiB1dGlscy5vdGhlckNvbmZpZy5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlzdFZpZXcgPSB0aGlzLmdldENvbXBvbmVudEluQ2hpbGRyZW4oXCJZWl9MaXN0Vmlld1wiKTtcclxuICAgICAgICB0aGlzLl9saXN0Vmlldy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4gPSBjYy5maW5kKFwiYmcvY2xvc2VcIiwgdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRXaWRnZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdXRpbHMudW5yZWdpc3RlclNlcnZlckluaXRFdmVudCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnRuLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFdpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbml0KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5pc1Nob3dSZWNvbW1vbmRHYW1lc0Jhbm5lcigpKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RWaWV3LmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RWaWV3Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMucG9zdFJlY29tbWVudFNob3dEYXRhKFN1YkxvY2F0aW9uLmlzWXpCYW5uZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc09QUE8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLm9wcG9Ub29sLmNvdW50WXpCYW5uZXJTaG93Q291bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlS3l4QmFubmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwi5Lqk5Y+J5o6o5bm/5pWw5o2u6ZW/5bqm5bCP5LqONlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLkuqTlj4nmjqjlub/mlbDmja7plb/luqbkuLowXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIuS6pOWPieaOqOW5v+aVsOaNruS4um51bGwhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19