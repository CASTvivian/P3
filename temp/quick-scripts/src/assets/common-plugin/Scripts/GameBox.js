"use strict";
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