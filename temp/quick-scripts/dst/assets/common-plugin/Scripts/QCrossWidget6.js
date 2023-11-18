
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/QCrossWidget6.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUUNyb3NzV2lkZ2V0Ni50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFFaEMsdUNBQWtDO0FBQ2xDLDZDQUE0QztBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTJGQztRQXhGRyxlQUFTLEdBQWdCLElBQUksQ0FBQztRQUM5QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQ3JCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsWUFBTSxHQUF1QixFQUFFLENBQUM7O0lBb0Y1QyxDQUFDO0lBbEZHLDhCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNDLGdDQUFnQztRQUNoQyw0REFBNEQ7UUFDNUQsc0ZBQXNGO1FBQ3RGLCtDQUErQztRQUUvQywrREFBK0Q7UUFDL0QsSUFBSTtRQUVKLGtCQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQ0ks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SyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDWixLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUExRmdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EyRmpDO0lBQUQsb0JBQUM7Q0EzRkQsQUEyRkMsQ0EzRjBDLEVBQUUsQ0FBQyxTQUFTLEdBMkZ0RDtrQkEzRm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBRQ3Jvc3NXaWRnZXRJdGVtIGZyb20gXCIuL1FDcm9zc1dpZGdldEl0ZW1cIjtcclxuaW1wb3J0IEFsZFV0aWxzIGZyb20gXCIuL0FsZFV0aWxzXCI7XHJcbmltcG9ydCB7IFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRQ3Jvc3NXaWRnZXQ2IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgX3BhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XHJcbiAgICBfcGFnZUl0ZW06IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX3BhZ2VSZWNJdGVtOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2p1bXBMaXN0OiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaXRlbXM6IFFDcm9zc1dpZGdldEl0ZW1bXSA9IFtdO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFnZVZpZXcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQYWdlVmlld1wiKS5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VJdGVtID0gdGhpcy5fcGFnZVZpZXcuY29udGVudC5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VSZWNJdGVtID0gdGhpcy5fcGFnZUl0ZW0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgdGhpcy5fcGFnZVZpZXcuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtOiBjYy5Ob2RlID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoYEl0ZW0ke2l9YCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBxY3Jvc3NXaWRnZXRJdGVtOiBRQ3Jvc3NXaWRnZXRJdGVtID0gaXRlbS5nZXRDb21wb25lbnQoXCJRQ3Jvc3NXaWRnZXRJdGVtXCIpO1xyXG4gICAgICAgIC8vICAgICBxY3Jvc3NXaWRnZXRJdGVtLl9sb2NhdGlvbiA9IFwiaXNRQ3Jvc3NcIjtcclxuXHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2l0ZW1zLnB1c2goaXRlbS5nZXRDb21wb25lbnQoXCJRQ3Jvc3NXaWRnZXRJdGVtXCIpKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIEFsZFV0aWxzLlNlbmRFdmVudChcIuaYvuekujblhYPntKDkuqTlj4nmjqjlub/nu4Tku7ZcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fanVtcExpc3QgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9qdW1wTGlzdCAmJiB0aGlzLl9qdW1wTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRXaWRnZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwi5Lqk5Y+J5o6o5bm/5pWw5o2u5Li6bnVsbCwgNuWFg+e0oOS6pOWPieaOqOW5v+e7hOS7tuS4jeaYvuekuiFcIik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRXaWRnZXQoKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsUGFnZTogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuX2p1bXBMaXN0Lmxlbmd0aCAvIDYpO1xyXG4gICAgICAgIC8vIHV0aWxzLnNob3dMb2coYHFjcm9zc3dpZGdldCA+Pj4gdG90YWxQYWdlID0gJHt0b3RhbFBhZ2V9YCk7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhgcWNyb3Nzd2lkZ2V0ID4+PiB0b3RhbFBhZ2UgPSAke3RvdGFsUGFnZX1gKTtcclxuICAgICAgICBsZXQgaW5keDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsUGFnZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fcGFnZUl0ZW0pO1xyXG4gICAgICAgICAgICBwYWdlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VWaWV3LmFkZFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2p1bXBMaXN0W2luZHhdKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX3BhZ2VSZWNJdGVtKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBxY3Jvc3NXaWRnZXRJdGVtOiBRQ3Jvc3NXaWRnZXRJdGVtID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFwiUUNyb3NzV2lkZ2V0SXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHFjcm9zc1dpZGdldEl0ZW0uX2xvY2F0aW9uID0gU3ViTG9jYXRpb24uaXNRQ3Jvc3M7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2p1bXBMaXN0W2luZHhdO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFwiUUNyb3NzV2lkZ2V0SXRlbVwiKS5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaW5keCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmF1dG9SZWZyc2hQYWdlVmlldygpO1xyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fanVtcExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuX2p1bXBMaXN0W2ldO1xyXG4gICAgICAgIC8vICAgICBpZiAoZGF0YSAmJiBkYXRhLmxvZ28pIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtSWR4OiBudW1iZXIgPSBpZHg7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoaXRlbUlkeCA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBpZHgrKztcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2l0ZW1zW2l0ZW1JZHhdLmluaXQoZGF0YSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b1JlZnJzaFBhZ2VWaWV3KCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG5cclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSAzO1xyXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnN0YXRlbWVudF9hdXRvX3JlZnJlc2gpIHtcclxuICAgICAgICAgICAgaW50ZXJ2YWwgPSB1dGlscy5TZXJ2ZXJDb25maWcuc3RhdGVtZW50X2F1dG9fcmVmcmVzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhg57uT566X5Lqk5Y+J5o6o5bm/57uE5Lu2JHtpbnRlcnZhbH3np5Loh6rliqjliLfmlrBgKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5fcGFnZVZpZXcuZ2V0UGFnZXMoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3BhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICAgICAgaW5kZXggPSAoKGluZGV4IDwgY291bnQpICYmIChpbmRleCArIDEgIT09IGNvdW50KSkgPyAoaW5kZXggKyAxKSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlVmlldy5zY3JvbGxUb1BhZ2UoaW5kZXgsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZVZpZXcuc2Nyb2xsVG9QYWdlKGluZGV4LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGludGVydmFsKTtcclxuICAgIH1cclxufVxyXG4iXX0=