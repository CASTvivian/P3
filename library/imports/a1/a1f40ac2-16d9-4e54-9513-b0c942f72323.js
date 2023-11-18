"use strict";
cc._RF.push(module, 'a1f40rCFtlOVJUTsMlC9yMj', 'YZ_StatementRecommentAd');
// common-plugin/Scripts/YZ_StatementRecommentAd.ts

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
var AldUtils_1 = require("./AldUtils");
var YZ_Constant_1 = require("./YZ_Constant");
var List_1 = require("./List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_StatementRecommentAd = /** @class */ (function (_super) {
    __extends(YZ_StatementRecommentAd, _super);
    function YZ_StatementRecommentAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._jumpList = null;
        _this._items = [];
        _this.listView = null;
        _this._pageItem = null;
        _this._pageRecItem = null;
        _this._recListNode = null;
        _this.nativeData = null;
        _this._nativeAd = null;
        _this.showNativeAd = true; //是否显示原生广告
        _this.yzItem = null;
        _this._nativeIsShow = false;
        _this.autoScorll = false;
        return _this;
    }
    YZ_StatementRecommentAd.prototype.onLoad = function () {
        this._recListNode = this.node.getChildByName("RecList");
        this.listView = this._recListNode.getChildByName("ScrollView").getComponent(List_1.default);
        this._nativeAd = this.node.getChildByName("nativeAd");
        AldUtils_1.default.SendEvent("显示结算推荐组件");
    };
    YZ_StatementRecommentAd.prototype.start = function () {
        if (this.showNativeAd) {
            this._recListNode.active = false;
            this.yzItem = this._nativeAd.getComponent("YZ_NativeItem");
            this.yzItem.showType = 1;
            Utils_1.utils.adManager.createNativeAd(null, this.yzItem);
            Utils_1.utils.showLog("交叉推广调用原生广告《《《《《《《");
        }
        else {
            this._recListNode.active = true;
            this._jumpList = Utils_1.utils.getRecommondGameList();
            if (this._jumpList && this._jumpList.length > 0) {
                this._initWidget();
                this.listView.numItems = this._jumpList.length;
            }
            else {
                cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
                this.node.destroy();
            }
        }
    };
    YZ_StatementRecommentAd.prototype.hideLastNode = function () {
        for (var i = 5; i > 2; i--) {
            this._items[i].node.active = false;
        }
    };
    YZ_StatementRecommentAd.prototype.update = function (dt) {
        if (this.yzItem && this.yzItem.content && this.yzItem.content.active && !this._nativeIsShow) {
            this._nativeIsShow = false;
            this._recListNode.active = false;
        }
        if (this.autoScorll && !this.listView.scrollView.isScrolling()) {
            this.listView.content.y += dt * 150;
            this.listView._onScrolling();
        }
    };
    YZ_StatementRecommentAd.prototype.onListRender = function (item, idx) {
        var qcrossWidgetItem = item.getComponent("QCrossWidgetItem");
        qcrossWidgetItem._location = YZ_Constant_1.SubLocation.isStatement;
        qcrossWidgetItem.getComponent("QCrossWidgetItem").init(this._jumpList[idx]);
    };
    YZ_StatementRecommentAd.prototype._initWidget = function () {
        var _this = this;
        if (Utils_1.utils.ServerConfig.st_recomment_is_hide_banner && Utils_1.utils.ServerConfig.st_recomment_is_hide_banner == "true") {
            Utils_1.utils.showLog("服务器配置显示结算互推后隐藏banner >>>");
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Over);
        }
        this.scheduleOnce(function () {
            _this.autoScorll = true;
        }, 1);
        Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isStatement);
    };
    YZ_StatementRecommentAd = __decorate([
        ccclass
    ], YZ_StatementRecommentAd);
    return YZ_StatementRecommentAd;
}(cc.Component));
exports.default = YZ_StatementRecommentAd;

cc._RF.pop();