
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GameBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ece2t091pFCZ+KR1Ury6C3', 'GameBox');
// common-plugin/Scripts/GameBox.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏盒子
 */
var GameBox = /** @class */ (function (_super) {
    __extends(GameBox, _super);
    function GameBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.slidePageView = null;
        _this.listContent = null;
        _this.topSlideNode = null;
        _this.recommentNode = null;
        _this.recommentBanner = null;
        _this._boxInfo = null;
        _this._dataDirty = false;
        _this._slideList = null;
        _this._appIdList = [];
        /**
         * 初始化监听事件
         */
        _this.newPage = null;
        return _this;
    }
    GameBox.prototype.onLoad = function () {
        this.initListener();
    };
    GameBox.prototype.onEnable = function () {
        var _this = this;
        this.postData();
        Utils_1.utils.registerServerInitEvent(function () {
            _this._setNodeVisible();
        }, this);
    };
    GameBox.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    GameBox.prototype._setNodeVisible = function () {
        this.initData();
        if (this._boxInfo) {
            this.initUi();
        }
        else {
            this.node.destroy();
        }
    };
    /**
     * 初始化UI
     */
    GameBox.prototype.initUi = function () {
        this.slidePageView.removeAllPages();
        this.listContent.removeAllChildren();
        Utils_1.utils.showLog("gamebox initUi");
        if (!this._boxInfo)
            return;
        var slideData = this._boxInfo.banners;
        var listData = this._boxInfo.infos;
        for (var i = 0; i < slideData.length; i++) {
            var slideNode = cc.instantiate(this.topSlideNode);
            var slideItem = slideNode.getComponent("GameBoxSlideItem");
            slideNode.active = true;
            slideItem.initData(slideData[i]);
            this.slidePageView.addPage(slideNode);
        }
        for (var i = 0; i < listData.length; i++) {
            var listNode = cc.instantiate(this.recommentNode);
            var listItem = listNode.getComponent("GameBoxListItem");
            var data = listData[i];
            listItem.init(data);
            this.listContent.addChild(listNode);
            if (data.banner) {
                var banner = cc.instantiate(this.recommentBanner);
                var slideItem = banner.getComponent("GameBoxSlideItem");
                banner.active = true;
                slideItem.initData(data.banner);
                this.listContent.addChild(banner);
            }
        }
        this.startAutoChange();
    };
    /**
     * 开启轮播
     */
    GameBox.prototype.startAutoChange = function () {
        var _this = this;
        this.schedule(function () {
            var count = _this.slidePageView.getPages().length;
            var index = _this.slidePageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            _this.slidePageView.scrollToPage(index, 2);
        }, 3); //3秒一换
    };
    GameBox.prototype.initListener = function () {
        // var _pool = new cc.NodePool();
        // this.slidePageView.node.on('scroll-began', () => {
        //     if (this.slidePageView.getCurrentPageIndex() == this.slidePageView.content.childrenCount - 1) {
        //         if (!this.newPage) {
        //             this.newPage = cc.instantiate(this.slidePageView.getPages()[0]);
        //         }
        //         this.slidePageView.addPage(this.newPage);
        //     }
        // });
        // this.slidePageView.node.on('scroll-ended', () => {
        //     if (this.slidePageView.getPages().length == 4) {
        //         _pool.put(this.slidePageView.content.children[1]);
        //         this.newPage = _pool.get();
        //         this.slidePageView.getPages().splice(1, 1);
        //     }
        // })
    };
    /**
     * 初始化数据
     * @param {boxInfo} 游戏盒子的json数据
     */
    GameBox.prototype.initData = function () {
        Utils_1.utils.showLog("gamebox initData");
        this._boxInfo = Utils_1.utils._wechatTool.gameBoxServerConfig;
        if (this._boxInfo) {
            Utils_1.utils.showLog("Gamebox 游戏盒子数据:", JSON.stringify(this._boxInfo));
        }
        else {
            Utils_1.utils.showLog("Gamebox 游戏盒子数据获取失败!", this._boxInfo);
        }
    };
    GameBox.prototype.postData = function () {
        var url = "https://apps.youlesp.com/gbs?m=rclickV2&app_id=100000000001&game_id=" + Utils_1.utils.config.wechatconfig.appID;
        Utils_1.utils.showLog("上报数据, url=", url);
        Utils_1.utils.commomHttpRequest(url, function (ret, data) {
            if (ret) {
                Utils_1.utils.showLog("数据上报成功！");
            }
            else {
                Utils_1.utils.showLog("数据上报失败！");
            }
        });
    };
    GameBox.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.node.active = true;
        }
    };
    __decorate([
        property({ type: cc.PageView, tooltip: "顶部滚动视图" })
    ], GameBox.prototype, "slidePageView", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "推荐列表" })
    ], GameBox.prototype, "listContent", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "顶部的幻灯片节点" })
    ], GameBox.prototype, "topSlideNode", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "推荐列表节点" })
    ], GameBox.prototype, "recommentNode", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "推荐列表Banner节点" })
    ], GameBox.prototype, "recommentBanner", void 0);
    GameBox = __decorate([
        ccclass
    ], GameBox);
    return GameBox;
}(cc.Component));
exports.default = GameBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZUJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQ0FBZ0M7QUFHMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7O0dBRUc7QUFFSDtJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQWlLQztRQS9KRyxlQUFlO1FBRWYsbUJBQWEsR0FBZ0IsSUFBSSxDQUFDO1FBR2xDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBR2hDLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZ0JBQVUsR0FBdUIsSUFBSSxDQUFDO1FBQ3RDLGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBNkUxQjs7V0FFRztRQUNILGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBMkQ1QixDQUFDO0lBeklHLHdCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDBCQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixhQUFLLENBQUMsdUJBQXVCLENBQUM7WUFDMUIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCwyQkFBUyxHQUFUO1FBQ0ksYUFBSyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxpQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElB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QUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QjtpQkFBTTtnQkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBS0Qsd0JBQU0sR0FBTixVQUFPLEVBQUU7UUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQTVKRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztrREFDakI7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0RBQ2pCO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO2lEQUNwQjtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztrREFDakI7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7b0RBQ3JCO0lBaEJmLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FpSzNCO0lBQUQsY0FBQztDQWpLRCxBQWlLQyxDQWpLb0MsRUFBRSxDQUFDLFNBQVMsR0FpS2hEO2tCQWpLb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lQm94U2xpZGVJdGVtIGZyb20gXCIuL0dhbWVCb3hTbGlkZUl0ZW1cIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgR2FtZUJveExpc3RJdGVtIGZyb20gXCIuL0dhbWVCb3hMaXN0SXRlbVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG4vKipcclxuICog5ri45oiP55uS5a2QXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm94IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlBhZ2VWaWV3LCB0b29sdGlwOiBcIumhtumDqOa7muWKqOinhuWbvlwiIH0pXHJcbiAgICBzbGlkZVBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCLmjqjojZDliJfooahcIiB9KVxyXG4gICAgbGlzdENvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi6aG26YOo55qE5bm754Gv54mH6IqC54K5XCIgfSlcclxuICAgIHRvcFNsaWRlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCLmjqjojZDliJfooajoioLngrlcIiB9KVxyXG4gICAgcmVjb21tZW50Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCLmjqjojZDliJfooahCYW5uZXLoioLngrlcIiB9KVxyXG4gICAgcmVjb21tZW50QmFubmVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgX2JveEluZm86IGFueSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfc2xpZGVMaXN0OiBHYW1lQm94U2xpZGVJdGVtW10gPSBudWxsO1xyXG4gICAgX2FwcElkTGlzdDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnBvc3REYXRhKCk7XHJcbiAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXROb2RlVmlzaWJsZSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB1dGlscy51bnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXROb2RlVmlzaWJsZSgpIHtcclxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ib3hJbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFVpKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2xpZGVQYWdlVmlldy5yZW1vdmVBbGxQYWdlcygpO1xyXG4gICAgICAgIHRoaXMubGlzdENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiZ2FtZWJveCBpbml0VWlcIilcclxuICAgICAgICBpZiAoIXRoaXMuX2JveEluZm8pIHJldHVybjtcclxuICAgICAgICBsZXQgc2xpZGVEYXRhOiBhbnkgPSB0aGlzLl9ib3hJbmZvLmJhbm5lcnM7XHJcbiAgICAgICAgbGV0IGxpc3REYXRhOiBhbnkgPSB0aGlzLl9ib3hJbmZvLmluZm9zXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsaWRlTm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG9wU2xpZGVOb2RlKTtcclxuICAgICAgICAgICAgbGV0IHNsaWRlSXRlbTogR2FtZUJveFNsaWRlSXRlbSA9IHNsaWRlTm9kZS5nZXRDb21wb25lbnQoXCJHYW1lQm94U2xpZGVJdGVtXCIpO1xyXG4gICAgICAgICAgICBzbGlkZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2xpZGVJdGVtLmluaXREYXRhKHNsaWRlRGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVQYWdlVmlldy5hZGRQYWdlKHNsaWRlTm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3REYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0Tm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVjb21tZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbTogR2FtZUJveExpc3RJdGVtID0gbGlzdE5vZGUuZ2V0Q29tcG9uZW50KFwiR2FtZUJveExpc3RJdGVtXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGxpc3REYXRhW2ldO1xyXG4gICAgICAgICAgICBsaXN0SXRlbS5pbml0KGRhdGEpXHJcbiAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQuYWRkQ2hpbGQobGlzdE5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5iYW5uZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBiYW5uZXI6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlY29tbWVudEJhbm5lcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xpZGVJdGVtOiBHYW1lQm94U2xpZGVJdGVtID0gYmFubmVyLmdldENvbXBvbmVudChcIkdhbWVCb3hTbGlkZUl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXIuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZUl0ZW0uaW5pdERhdGEoZGF0YS5iYW5uZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudC5hZGRDaGlsZChiYW5uZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0QXV0b0NoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5ZCv6L2u5pKtXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0QXV0b0NoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5zbGlkZVBhZ2VWaWV3LmdldFBhZ2VzKCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNsaWRlUGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgICAgICBpbmRleCA9ICgoaW5kZXggPCBjb3VudCkgJiYgKGluZGV4ICsgMSAhPT0gY291bnQpKSA/IChpbmRleCArIDEpIDogMDtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZVBhZ2VWaWV3LnNjcm9sbFRvUGFnZShpbmRleCwgMik7XHJcbiAgICAgICAgfSwgMyk7IC8vM+enkuS4gOaNolxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluebkeWQrOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBuZXdQYWdlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBpbml0TGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gdmFyIF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZVBhZ2VWaWV3Lm5vZGUub24oJ3Njcm9sbC1iZWdhbicsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMuc2xpZGVQYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCkgPT0gdGhpcy5zbGlkZVBhZ2VWaWV3LmNvbnRlbnQuY2hpbGRyZW5Db3VudCAtIDEpIHtcclxuICAgICAgICAvLyAgICAgICAgIGlmICghdGhpcy5uZXdQYWdlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5uZXdQYWdlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zbGlkZVBhZ2VWaWV3LmdldFBhZ2VzKClbMF0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zbGlkZVBhZ2VWaWV3LmFkZFBhZ2UodGhpcy5uZXdQYWdlKTtcclxuXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZVBhZ2VWaWV3Lm5vZGUub24oJ3Njcm9sbC1lbmRlZCcsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMuc2xpZGVQYWdlVmlldy5nZXRQYWdlcygpLmxlbmd0aCA9PSA0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICBfcG9vbC5wdXQodGhpcy5zbGlkZVBhZ2VWaWV3LmNvbnRlbnQuY2hpbGRyZW5bMV0pO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5uZXdQYWdlID0gX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNsaWRlUGFnZVZpZXcuZ2V0UGFnZXMoKS5zcGxpY2UoMSwgMSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaVsOaNrlxyXG4gICAgICogQHBhcmFtIHtib3hJbmZvfSDmuLjmiI/nm5LlrZDnmoRqc29u5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0RGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwiZ2FtZWJveCBpbml0RGF0YVwiKVxyXG5cclxuICAgICAgICB0aGlzLl9ib3hJbmZvID0gdXRpbHMuX3dlY2hhdFRvb2wuZ2FtZUJveFNlcnZlckNvbmZpZztcclxuICAgICAgICBpZiAodGhpcy5fYm94SW5mbykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiR2FtZWJveCDmuLjmiI/nm5LlrZDmlbDmja46XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX2JveEluZm8pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwiR2FtZWJveCDmuLjmiI/nm5LlrZDmlbDmja7ojrflj5blpLHotKUhXCIsIHRoaXMuX2JveEluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwb3N0RGF0YSgpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBgaHR0cHM6Ly9hcHBzLnlvdWxlc3AuY29tL2dicz9tPXJjbGlja1YyJmFwcF9pZD0xMDAwMDAwMDAwMDEmZ2FtZV9pZD0ke3V0aWxzLmNvbmZpZy53ZWNoYXRjb25maWcuYXBwSUR9YDtcclxuICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiK5oql5pWw5o2uLCB1cmw9XCIsIHVybCk7XHJcbiAgICAgICAgdXRpbHMuY29tbW9tSHR0cFJlcXVlc3QodXJsLCAocmV0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pWw5o2u5LiK5oql5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==