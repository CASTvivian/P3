"use strict";
cc._RF.push(module, '20525Sx+oND2KEXTsMeJ4bb', 'QCrossWidget6');
// common-plugin/Scripts/QCrossWidget6.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var QCrossWidget6 = /** @class */ (function (_super) {
    __extends(QCrossWidget6, _super);
    function QCrossWidget6() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._pageView = null;
        _this._pageItem = null;
        _this._pageRecItem = null;
        _this._jumpList = null;
        _this._items = [];
        return _this;
    }
    QCrossWidget6.prototype.onLoad = function () {
        this._pageView = this.node.getChildByName("PageView").getComponent(cc.PageView);
        this._pageItem = this._pageView.content.getChildByName("Panel");
        this._pageRecItem = this._pageItem.children[0];
        this._pageView.content.removeAllChildren();
        // for (let i = 0; i < 6; i++) {
        //     let item: cc.Node = panel.getChildByName(`Item${i}`);
        //     let qcrossWidgetItem: QCrossWidgetItem = item.getComponent("QCrossWidgetItem");
        //     qcrossWidgetItem._location = "isQCross";
        //     this._items.push(item.getComponent("QCrossWidgetItem"));
        // }
        AldUtils_1.default.SendEvent("显示6元素交叉推广组件");
    };
    QCrossWidget6.prototype.start = function () {
        this._jumpList = Utils_1.utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        }
        else {
            cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
            this.node.destroy();
        }
    };
    QCrossWidget6.prototype._initWidget = function () {
        var totalPage = Math.ceil(this._jumpList.length / 6);
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
                qcrossWidgetItem._location = YZ_Constant_1.SubLocation.isQCross;
                var data = this._jumpList[indx];
                tempNode.getComponent("QCrossWidgetItem").init(data);
                indx++;
            }
        }
        this.autoRefrshPageView();
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
    QCrossWidget6.prototype.autoRefrshPageView = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        var interval = 3;
        if (Utils_1.utils.ServerConfig && Utils_1.utils.ServerConfig.statement_auto_refresh) {
            interval = Utils_1.utils.ServerConfig.statement_auto_refresh;
        }
        Utils_1.utils.showLog("\u7ED3\u7B97\u4EA4\u53C9\u63A8\u5E7F\u7EC4\u4EF6" + interval + "\u79D2\u81EA\u52A8\u5237\u65B0");
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
        }, interval);
    };
    QCrossWidget6 = __decorate([
        ccclass
    ], QCrossWidget6);
    return QCrossWidget6;
}(cc.Component));
exports.default = QCrossWidget6;

cc._RF.pop();