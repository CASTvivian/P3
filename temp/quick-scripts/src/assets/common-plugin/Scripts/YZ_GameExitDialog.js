"use strict";
cc._RF.push(module, '7baa9fWodJKboupAtfBvLnG', 'YZ_GameExitDialog');
// common-plugin/Scripts/YZ_GameExitDialog.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_GameExitDialog = /** @class */ (function (_super) {
    __extends(YZ_GameExitDialog, _super);
    function YZ_GameExitDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._jumpList = null;
        _this._items = [];
        _this._pageView = null;
        _this._pageItem = null;
        _this._pageRecItem = null;
        _this._btnCanel = null;
        _this._btnOk = null;
        _this._panel = null;
        _this.nativeData = null;
        _this._nativeIsShow = false;
        return _this;
    }
    YZ_GameExitDialog.prototype.onLoad = function () {
        this._panel = this.node.getChildByName("Panel");
        this._pageView = this._panel.getChildByName("PageView").getComponent(cc.PageView);
        this._pageItem = this._pageView.content.getChildByName("Panel");
        this._pageRecItem = this._pageItem.children[0];
        this._pageView.content.removeAllChildren();
        this._btnCanel = this._panel.getChildByName("btnCancel");
        this._btnOk = this._panel.getChildByName("btnOk");
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
    };
    YZ_GameExitDialog.prototype.start = function () {
        this._jumpList = Utils_1.utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        }
    };
    YZ_GameExitDialog.prototype.hideLastNode = function () {
        for (var i = 5; i > 2; i--) {
            this._items[i].node.active = false;
        }
    };
    YZ_GameExitDialog.prototype.onBtnCanelHandler = function (event, data) {
        Utils_1.utils.showLog("点击取消按钮！");
        this.node.destroy();
    };
    YZ_GameExitDialog.prototype.onBtnOkHandler = function (event, data) {
        Utils_1.utils.showLog("点击确定按钮！");
        Utils_1.utils.Tool_Native.GameExit();
    };
    YZ_GameExitDialog.prototype._initWidget = function () {
        Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isGameExitDialog);
        var totalPage = Math.floor(this._jumpList.length / 6);
        // utils.showLog(`qcrosswidget >>> totalPage = ${totalPage}`);
        Utils_1.utils.showLog("qcrosswidget >>> totalPage = " + totalPage);
        var indx = 0;
        for (var i = 0; i < totalPage; i++) {
            var page = cc.instantiate(this._pageItem);
            page.removeAllChildren();
            this._pageView.addPage(page);
            for (var j = 0; j < 6; j++) {
                if (!this._jumpList[indx])
                    break;
                var tempNode = cc.instantiate(this._pageRecItem);
                page.addChild(tempNode);
                var qcrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = YZ_Constant_1.SubLocation.isStatement;
                var data = this._jumpList[indx];
                tempNode.getComponent("QCrossWidgetItem").init(data);
                indx++;
            }
        }
        this.autoRefrshPageView();
        // let idx: number = 0;
        // for (let i = 0; i < this._jumpList.length; i++) {
        //     let data: any = this._jumpList[i];
        //     if (data && data.logo) {
        //         let itemIdx: number = idx;
        //         if (itemIdx >= this._items.length) {
        //             return;
        //         }
        //         idx++;
        //         this._items[itemIdx].init(data);
        //     }
        // }
    };
    YZ_GameExitDialog.prototype.autoRefrshPageView = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        // utils.showLog(">>>>>>> autoRefrshPageView");
        var interval = 3;
        if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.statement_auto_refresh) {
            interval = Utils_1.utils.ServerConfig.statement_auto_refresh;
        }
        Utils_1.utils.showLog("\u9000\u51FA\u5F39\u7A97\u7EC4\u4EF6" + interval + "\u79D2\u81EA\u52A8\u5237\u65B0");
        this.schedule(function () {
            var count = _this._pageView.getPages().length;
            var index = _this._pageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            if (index == 0) {
                _this._pageView.scrollToPage(index, 0);
            }
            else {
                _this._pageView.scrollToPage(index, 2);
            }
        }, interval); //10秒一换
    };
    YZ_GameExitDialog = __decorate([
        ccclass
    ], YZ_GameExitDialog);
    return YZ_GameExitDialog;
}(cc.Component));
exports.default = YZ_GameExitDialog;

cc._RF.pop();