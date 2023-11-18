
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AdAgentBroser.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4909rppFFL/JkiPVVbCFkk', 'AdAgentBroser');
// common-plugin/Scripts/AdAgentBroser.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var AdAgent_1 = require("./AdAgent");
var YZ_NativeBanner_1 = require("./YZ_NativeBanner");
var YZ_NativeInsert_1 = require("./YZ_NativeInsert");
var YZ_Constant_1 = require("./YZ_Constant");
var CommonConfig_1 = require("./CommonConfig");
var Utils_1 = require("./Utils");
var YZ_NativeAdObject_1 = require("./YZ_NativeAdObject");
var AdAgentBroser = /** @class */ (function (_super) {
    __extends(AdAgentBroser, _super);
    function AdAgentBroser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeBannerInfo = null;
        //当前显示Banner的位置
        _this._curLocation = YZ_Constant_1.BannerLocation.None;
        _this.signleNativeAd = null;
        _this._curNativeItem = null;
        return _this;
    }
    /**
     * 获取当前banner配置
     */
    AdAgentBroser.prototype.getNativeBannerInfo = function () {
        return new CommonConfig_1.NativeBannerInfo();
    };
    AdAgentBroser.prototype.ShowBanner = function (location) {
        if (location === void 0) { location = null; }
        if (this._curLocation != location) {
            this.HideBanner(location);
        }
        this._curLocation = location;
        if (this.getNativeBannerInfo().is_show_banner == -1) {
            Utils_1.utils.showLog("当前位置配置为不展示banner!");
            this.HideBanner(location);
            return;
        }
        if (!this._nativeBannerNode) {
            this._nativeBannerNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeBanner);
            cc.director.getScene().addChild(this._nativeBannerNode, 1000);
        }
        this._nativeBannerNode.active = true;
        var nativeBanner = this._nativeBannerNode.getComponent(YZ_NativeBanner_1.default);
        if (nativeBanner) {
            var addate = { title: "今日头条", desc: "看新闻用今日头条", imgUrlList: [Utils_1.utils.cur_tool.img_url], icon: Utils_1.utils.cur_tool.img_url };
            nativeBanner.init(null, addate, this.getNativeBannerInfo());
        }
        // utils.showRecommendGamesBanner();
    };
    AdAgentBroser.prototype.ShowInterstitial = function () {
        if (!this._nativeInsertNode) {
            this._nativeInsertNode = cc.instantiate(Utils_1.utils.config.otherconfig.nativeInsert);
            cc.director.getScene().addChild(this._nativeInsertNode, 9999);
        }
        this._nativeInsertNode.active = true;
        var nativeBanner = this._nativeInsertNode.getComponent(YZ_NativeInsert_1.default);
        if (nativeBanner) {
            var addate = { title: "今日头条", desc: "看新闻用今日头条", imgUrlList: [Utils_1.utils.cur_tool.img_url], icon: Utils_1.utils.cur_tool.img_url };
            nativeBanner.init(null, addate);
        }
        // utils.showRecommendGamesBanner();
    };
    AdAgentBroser.prototype.showStatementAds = function (data) {
        Utils_1.utils.adManager.ShowInterstitial();
        // utils.showCrossWidget6();
    };
    AdAgentBroser.prototype.HideBanner = function (location) {
        if (location === void 0) { location = null; }
        if (this._nativeBannerNode) {
            this._nativeBannerNode.active = false;
        }
        Utils_1.utils.hideRecommendGamesBanner();
    };
    AdAgentBroser.prototype.ShowVideo = function (callback) {
        callback(true, "视频播放成功!");
    };
    AdAgentBroser.prototype.showBeforGameOverAd = function (level, levelStatus, rewardValue, closeCallFunc, rewardFunc) {
        cc.log("显示结算前广告：  #Level= ", level, " #LevelStatys=", levelStatus, " #rewardValue = ", rewardValue);
        Utils_1.utils.currentLevel = level;
        Utils_1.utils.isSuccess = levelStatus == YZ_Constant_1.LevelStatus.GameWin;
        Utils_1.utils.rewardCallFunc = rewardFunc;
        Utils_1.utils.rewardCloseFunc = closeCallFunc;
        Utils_1.utils.rewardValue = rewardValue;
        var adType = Utils_1.utils.adManager.checkShowBeforGameOverAd(level, levelStatus == YZ_Constant_1.LevelStatus.GameWin);
        switch (adType) {
            case YZ_Constant_1.BeForGameOverAdId.SharePanel:
                Utils_1.utils.recordEnd();
                Utils_1.utils.showShareRecordPanel();
                break;
            case YZ_Constant_1.BeForGameOverAdId.GoldBox:
                Utils_1.utils.adManager.showRewardBoxPanel();
                break;
            case YZ_Constant_1.BeForGameOverAdId.Turntable:
                Utils_1.utils.adManager.showrewardTurnTablePanel();
                break;
            default:
                closeCallFunc && closeCallFunc();
                break;
        }
    };
    /**
     * 创建结算页面推广组件
     */
    AdAgentBroser.prototype.ShowSingleNativeAd = function (params) {
        if (Utils_1.utils.config.otherconfig.singleNativeAd) {
            if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
                this.signleNativeAd.destroy();
            }
            this.signleNativeAd = cc.instantiate(Utils_1.utils.config.otherconfig.singleNativeAd);
            var nativeItem = this.signleNativeAd.getComponent("YZ_NativeItem");
            nativeItem.showType = 2;
            nativeItem.params = params;
            this._curNativeItem = nativeItem;
            if (params && params.parent) {
                params.parent.addChild(this.signleNativeAd, cc.macro.MAX_ZINDEX);
            }
            var nativeObj = new YZ_NativeAdObject_1.default();
            var data = {
                imgUrlList: [Utils_1.utils.cur_tool.img_url],
                icon: Utils_1.utils.cur_tool.img_url,
                title: "爱奇艺视频",
                desc: "下载爱奇艺，即送VIP！"
            };
            nativeObj.data = data;
            nativeItem._nativeAd = nativeObj;
            this._curNativeItem.init(nativeObj);
            Utils_1.utils.showLog("单个原生广告创建成功！");
            return this.signleNativeAd;
        }
        else {
            Utils_1.utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
            return null;
        }
    };
    return AdAgentBroser;
}(AdAgent_1.default));
exports.default = AdAgentBroser;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWRBZ2VudEJyb3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMscURBQWdEO0FBQ2hELHFEQUFnRDtBQUNoRCw2Q0FBK0U7QUFDL0UsK0NBQWtEO0FBQ2xELGlDQUFnQztBQUVoQyx5REFBb0Q7QUFFcEQ7SUFBMkMsaUNBQU87SUFBbEQ7UUFBQSxxRUFvSUM7UUFoSUEsdUJBQWlCLEdBQXFCLElBQUksQ0FBQztRQUMzQyxlQUFlO1FBQ2Ysa0JBQVksR0FBbUIsNEJBQWMsQ0FBQyxJQUFJLENBQUM7UUFzRm5ELG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRS9CLG9CQUFjLEdBQWtCLElBQUksQ0FBQzs7SUFzQ3RDLENBQUM7SUE3SEE7O09BRUc7SUFDSCwyQ0FBbUIsR0FBbkI7UUFDQyxPQUFPLElBQUksK0JBQWdCLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sa0NBQVUsR0FBakIsVUFBa0IsUUFBK0I7UUFBL0IseUJBQUEsRUFBQSxlQUErQjtRQUNoRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksUUFBUSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNwRCxhQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQixPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLGFB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QUMsZUFBZSxDQUFDLENBQUM7WUFDbEYsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDeEIsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7WUFFakMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSwyQkFBaUIsRUFBRSxDQUFDO1lBQy9CLElBQUksSUFBSSxHQUFHO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxhQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxFQUFFLGFBQUssQ0FBQyxRQUFRLENBQUMsT0FBTztnQkFDNUIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLGNBQWM7YUFDdkIsQ0FBQTtZQUNELFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXBDLGFBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQzNCO2FBQU07WUFDTixhQUFLLENBQUMsT0FBTyxDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFDL0QsT0FBTyxJQUFJLENBQUM7U0FDWjtJQUNGLENBQUM7SUFDRixvQkFBQztBQUFELENBcElBLEFBb0lDLENBcEkwQyxpQkFBTyxHQW9JakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRBZ2VudCBmcm9tIFwiLi9BZEFnZW50XCI7XG5pbXBvcnQgWVpfTmF0aXZlQmFubmVyIGZyb20gXCIuL1laX05hdGl2ZUJhbm5lclwiO1xuaW1wb3J0IFlaX05hdGl2ZUluc2VydCBmcm9tIFwiLi9ZWl9OYXRpdmVJbnNlcnRcIjtcbmltcG9ydCB7IEJlRm9yR2FtZU92ZXJBZElkLCBMZXZlbFN0YXR1cywgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xuaW1wb3J0IHsgTmF0aXZlQmFubmVySW5mbyB9IGZyb20gXCIuL0NvbW1vbkNvbmZpZ1wiO1xuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IFlaX05hdGl2ZUl0ZW0gZnJvbSBcIi4vWVpfTmF0aXZlSXRlbVwiO1xuaW1wb3J0IFlaX05hdGl2ZUFkT2JqZWN0IGZyb20gXCIuL1laX05hdGl2ZUFkT2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkQWdlbnRCcm9zZXIgZXh0ZW5kcyBBZEFnZW50IHtcblx0X25hdGl2ZUJhbm5lck5vZGU6IGNjLk5vZGU7XG5cdF9uYXRpdmVJbnNlcnROb2RlOiBjYy5Ob2RlO1xuXG5cdF9uYXRpdmVCYW5uZXJJbmZvOiBOYXRpdmVCYW5uZXJJbmZvID0gbnVsbDtcblx0Ly/lvZPliY3mmL7npLpCYW5uZXLnmoTkvY3nva5cblx0X2N1ckxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IEJhbm5lckxvY2F0aW9uLk5vbmU7XG5cdC8qKlxuXHQgKiDojrflj5blvZPliY1iYW5uZXLphY3nva5cblx0ICovXG5cdGdldE5hdGl2ZUJhbm5lckluZm8oKSB7XG5cdFx0cmV0dXJuIG5ldyBOYXRpdmVCYW5uZXJJbmZvKCk7XG5cdH1cblxuXHRwdWJsaWMgU2hvd0Jhbm5lcihsb2NhdGlvbjogQmFubmVyTG9jYXRpb24gPSBudWxsKSB7XG5cdFx0aWYgKHRoaXMuX2N1ckxvY2F0aW9uICE9IGxvY2F0aW9uKSB7XG5cdFx0XHR0aGlzLkhpZGVCYW5uZXIobG9jYXRpb24pO1xuXHRcdH1cblx0XHR0aGlzLl9jdXJMb2NhdGlvbiA9IGxvY2F0aW9uO1xuXHRcdGlmICh0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKS5pc19zaG93X2Jhbm5lciA9PSAtMSkge1xuXHRcdFx0dXRpbHMuc2hvd0xvZyhcIuW9k+WJjeS9jee9rumFjee9ruS4uuS4jeWxleekumJhbm5lciFcIik7XG5cdFx0XHR0aGlzLkhpZGVCYW5uZXIobG9jYXRpb24pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuX25hdGl2ZUJhbm5lck5vZGUpIHtcblx0XHRcdHRoaXMuX25hdGl2ZUJhbm5lck5vZGUgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcubmF0aXZlQmFubmVyKTtcblx0XHRcdGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fbmF0aXZlQmFubmVyTm9kZSwgMTAwMCk7XG5cdFx0fVxuXG5cblx0XHR0aGlzLl9uYXRpdmVCYW5uZXJOb2RlLmFjdGl2ZSA9IHRydWU7XG5cdFx0bGV0IG5hdGl2ZUJhbm5lciA9IHRoaXMuX25hdGl2ZUJhbm5lck5vZGUuZ2V0Q29tcG9uZW50KFlaX05hdGl2ZUJhbm5lcik7XG5cdFx0aWYgKG5hdGl2ZUJhbm5lcikge1xuXHRcdFx0bGV0IGFkZGF0ZSA9IHsgdGl0bGU6IFwi5LuK5pel5aS05p2hXCIsIGRlc2M6IFwi55yL5paw6Ze755So5LuK5pel5aS05p2hXCIsIGltZ1VybExpc3Q6IFt1dGlscy5jdXJfdG9vbC5pbWdfdXJsXSwgaWNvbjogdXRpbHMuY3VyX3Rvb2wuaW1nX3VybCB9O1xuXHRcdFx0bmF0aXZlQmFubmVyLmluaXQobnVsbCwgYWRkYXRlLCB0aGlzLmdldE5hdGl2ZUJhbm5lckluZm8oKSk7XG5cdFx0fVxuXHRcdC8vIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xuXHR9XG5cdHB1YmxpYyBTaG93SW50ZXJzdGl0aWFsKCkge1xuXHRcdGlmICghdGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSkge1xuXHRcdFx0dGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5uYXRpdmVJbnNlcnQpO1xuXHRcdFx0Y2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZCh0aGlzLl9uYXRpdmVJbnNlcnROb2RlLCA5OTk5KTtcblx0XHR9XG5cdFx0dGhpcy5fbmF0aXZlSW5zZXJ0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXHRcdGxldCBuYXRpdmVCYW5uZXIgPSB0aGlzLl9uYXRpdmVJbnNlcnROb2RlLmdldENvbXBvbmVudChZWl9OYXRpdmVJbnNlcnQpO1xuXHRcdGlmIChuYXRpdmVCYW5uZXIpIHtcblx0XHRcdGxldCBhZGRhdGUgPSB7IHRpdGxlOiBcIuS7iuaXpeWktOadoVwiLCBkZXNjOiBcIueci+aWsOmXu+eUqOS7iuaXpeWktOadoVwiLCBpbWdVcmxMaXN0OiBbdXRpbHMuY3VyX3Rvb2wuaW1nX3VybF0sIGljb246IHV0aWxzLmN1cl90b29sLmltZ191cmwgfTtcblx0XHRcdG5hdGl2ZUJhbm5lci5pbml0KG51bGwsIGFkZGF0ZSk7XG5cdFx0fVxuXHRcdC8vIHV0aWxzLnNob3dSZWNvbW1lbmRHYW1lc0Jhbm5lcigpO1xuXHR9XG5cdHNob3dTdGF0ZW1lbnRBZHMoZGF0YSkge1xuXHRcdHV0aWxzLmFkTWFuYWdlci5TaG93SW50ZXJzdGl0aWFsKCk7XG5cdFx0Ly8gdXRpbHMuc2hvd0Nyb3NzV2lkZ2V0NigpO1xuXHR9XG5cdHB1YmxpYyBIaWRlQmFubmVyKGxvY2F0aW9uOiBCYW5uZXJMb2NhdGlvbiA9IG51bGwpIHtcblx0XHRpZiAodGhpcy5fbmF0aXZlQmFubmVyTm9kZSkge1xuXHRcdFx0dGhpcy5fbmF0aXZlQmFubmVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcblx0XHR9XG5cdFx0dXRpbHMuaGlkZVJlY29tbWVuZEdhbWVzQmFubmVyKCk7XG5cdH1cblx0cHVibGljIFNob3dWaWRlbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcblx0XHRjYWxsYmFjayh0cnVlLCBcIuinhumikeaSreaUvuaIkOWKnyFcIik7XG5cdH1cblxuXHRzaG93QmVmb3JHYW1lT3ZlckFkKGxldmVsOiBudW1iZXIsIGxldmVsU3RhdHVzOiBMZXZlbFN0YXR1cywgcmV3YXJkVmFsdWU6IG51bWJlciwgY2xvc2VDYWxsRnVuYzogRnVuY3Rpb24sIHJld2FyZEZ1bmM6IEZ1bmN0aW9uKTogdm9pZCB7XG5cdFx0Y2MubG9nKFwi5pi+56S657uT566X5YmN5bm/5ZGK77yaICAjTGV2ZWw9IFwiLCBsZXZlbCwgXCIgI0xldmVsU3RhdHlzPVwiLCBsZXZlbFN0YXR1cywgXCIgI3Jld2FyZFZhbHVlID0gXCIsIHJld2FyZFZhbHVlKTtcblx0XHR1dGlscy5jdXJyZW50TGV2ZWwgPSBsZXZlbDtcblx0XHR1dGlscy5pc1N1Y2Nlc3MgPSBsZXZlbFN0YXR1cyA9PSBMZXZlbFN0YXR1cy5HYW1lV2luO1xuXHRcdHV0aWxzLnJld2FyZENhbGxGdW5jID0gcmV3YXJkRnVuYztcblx0XHR1dGlscy5yZXdhcmRDbG9zZUZ1bmMgPSBjbG9zZUNhbGxGdW5jO1xuXHRcdHV0aWxzLnJld2FyZFZhbHVlID0gcmV3YXJkVmFsdWU7XG5cblx0XHRsZXQgYWRUeXBlID0gdXRpbHMuYWRNYW5hZ2VyLmNoZWNrU2hvd0JlZm9yR2FtZU92ZXJBZChsZXZlbCwgbGV2ZWxTdGF0dXMgPT0gTGV2ZWxTdGF0dXMuR2FtZVdpbik7XG5cdFx0c3dpdGNoIChhZFR5cGUpIHtcblx0XHRcdGNhc2UgQmVGb3JHYW1lT3ZlckFkSWQuU2hhcmVQYW5lbDpcblx0XHRcdFx0dXRpbHMucmVjb3JkRW5kKCk7XG5cdFx0XHRcdHV0aWxzLnNob3dTaGFyZVJlY29yZFBhbmVsKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBCZUZvckdhbWVPdmVyQWRJZC5Hb2xkQm94OlxuXHRcdFx0XHR1dGlscy5hZE1hbmFnZXIuc2hvd1Jld2FyZEJveFBhbmVsKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBCZUZvckdhbWVPdmVyQWRJZC5UdXJudGFibGU6XG5cdFx0XHRcdHV0aWxzLmFkTWFuYWdlci5zaG93cmV3YXJkVHVyblRhYmxlUGFuZWwoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjbG9zZUNhbGxGdW5jICYmIGNsb3NlQ2FsbEZ1bmMoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdH1cblxuXHRzaWdubGVOYXRpdmVBZDogY2MuTm9kZSA9IG51bGw7XG5cblx0X2N1ck5hdGl2ZUl0ZW06IFlaX05hdGl2ZUl0ZW0gPSBudWxsO1xuXHQvKipcblx0ICog5Yib5bu657uT566X6aG16Z2i5o6o5bm/57uE5Lu2XG5cdCAqL1xuXHRwdWJsaWMgU2hvd1NpbmdsZU5hdGl2ZUFkKHBhcmFtcz86IGFueSkge1xuXG5cdFx0aWYgKHV0aWxzLmNvbmZpZy5vdGhlcmNvbmZpZy5zaW5nbGVOYXRpdmVBZCkge1xuXHRcdFx0aWYgKHRoaXMuc2lnbmxlTmF0aXZlQWQgJiYgY2MuaXNWYWxpZCh0aGlzLnNpZ25sZU5hdGl2ZUFkKSkge1xuXHRcdFx0XHR0aGlzLnNpZ25sZU5hdGl2ZUFkLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2lnbmxlTmF0aXZlQWQgPSBjYy5pbnN0YW50aWF0ZSh1dGlscy5jb25maWcub3RoZXJjb25maWcuc2luZ2xlTmF0aXZlQWQpO1xuXG5cdFx0XHRsZXQgbmF0aXZlSXRlbTogWVpfTmF0aXZlSXRlbSA9IHRoaXMuc2lnbmxlTmF0aXZlQWQuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSXRlbVwiKTtcblx0XHRcdG5hdGl2ZUl0ZW0uc2hvd1R5cGUgPSAyO1xuXHRcdFx0bmF0aXZlSXRlbS5wYXJhbXMgPSBwYXJhbXM7XG5cdFx0XHR0aGlzLl9jdXJOYXRpdmVJdGVtID0gbmF0aXZlSXRlbTtcblxuXHRcdFx0aWYgKHBhcmFtcyAmJiBwYXJhbXMucGFyZW50KSB7XG5cdFx0XHRcdHBhcmFtcy5wYXJlbnQuYWRkQ2hpbGQodGhpcy5zaWdubGVOYXRpdmVBZCwgY2MubWFjcm8uTUFYX1pJTkRFWCk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbmF0aXZlT2JqID0gbmV3IFlaX05hdGl2ZUFkT2JqZWN0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcblx0XHRcdFx0aW1nVXJsTGlzdDogW3V0aWxzLmN1cl90b29sLmltZ191cmxdLFxuICAgICAgICAgICAgICAgIGljb246IHV0aWxzLmN1cl90b29sLmltZ191cmwsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi54ix5aWH6Im66KeG6aKRXCIsXG4gICAgICAgICAgICAgICAgZGVzYzogXCLkuIvovb3niLHlpYfoibrvvIzljbPpgIFWSVDvvIFcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmF0aXZlT2JqLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgbmF0aXZlSXRlbS5fbmF0aXZlQWQgPSBuYXRpdmVPYmo7XG5cdFx0XHR0aGlzLl9jdXJOYXRpdmVJdGVtLmluaXQobmF0aXZlT2JqKTtcblxuXHRcdFx0dXRpbHMuc2hvd0xvZyhcIuWNleS4quWOn+eUn+W5v+WRiuWIm+W7uuaIkOWKn++8gVwiKTtcblx0XHRcdHJldHVybiB0aGlzLnNpZ25sZU5hdGl2ZUFkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR1dGlscy5zaG93TG9nKFwi5pyq5om+5Yiw6aKE5Yi25L2TIHNpbmdsZU5hdGl2ZUFkLCDor7fmn6XnnItDb21tb25VdGlsc+e7hOS7tuS4iuaYr+WQpui1i+WAvO+8gVwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIl19