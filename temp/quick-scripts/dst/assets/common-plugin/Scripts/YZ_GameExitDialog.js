
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_GameExitDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfR2FtZUV4aXREaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBRWhDLDZDQUE0QztBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQWlJQztRQS9IVyxlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBdUIsRUFBRSxDQUFDO1FBR3hDLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBQzlCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDaEIsZ0JBQVUsR0FBUSxJQUFJLENBQUM7UUFDOUIsbUJBQWEsR0FBWSxLQUFLLENBQUM7O0lBb0huQyxDQUFDO0lBaEhHLGtDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElB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LENBQUMsUUFBUSxDQUFDO1lBQ1YsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ2pELEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDWixLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUN6QixDQUFDO0lBaElnQixpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQWlJckM7SUFBRCx3QkFBQztDQWpJRCxBQWlJQyxDQWpJOEMsRUFBRSxDQUFDLFNBQVMsR0FpSTFEO2tCQWpJb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUUNyb3NzV2lkZ2V0SXRlbSBmcm9tIFwiLi9RQ3Jvc3NXaWRnZXRJdGVtXCI7XHJcbmltcG9ydCB7IFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9HYW1lRXhpdERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfanVtcExpc3Q6IGFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pdGVtczogUUNyb3NzV2lkZ2V0SXRlbVtdID0gW107XHJcblxyXG5cclxuICAgIF9wYWdlVmlldzogY2MuUGFnZVZpZXcgPSBudWxsO1xyXG4gICAgX3BhZ2VJdGVtOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9wYWdlUmVjSXRlbTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfYnRuQ2FuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2J0bk9rOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgbmF0aXZlRGF0YTogYW55ID0gbnVsbDtcclxuICAgIF9uYXRpdmVJc1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VWaWV3ID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJQYWdlVmlld1wiKS5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VJdGVtID0gdGhpcy5fcGFnZVZpZXcuY29udGVudC5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VSZWNJdGVtID0gdGhpcy5fcGFnZUl0ZW0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgdGhpcy5fcGFnZVZpZXcuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9idG5DYW5lbCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiYnRuQ2FuY2VsXCIpO1xyXG4gICAgICAgIHRoaXMuX2J0bk9rID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Pa1wiKTtcclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcGFuZWwuc2NhbGUgPSByYXRpbztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fanVtcExpc3QgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9qdW1wTGlzdCAmJiB0aGlzLl9qdW1wTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRXaWRnZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhpZGVMYXN0Tm9kZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gNTsgaSA+IDI7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtc1tpXS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkJ0bkNhbmVsSGFuZGxlcihldmVudDogY2MuRXZlbnQsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLngrnlh7vlj5bmtojmjInpkq7vvIFcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ0bk9rSGFuZGxlcihldmVudDogY2MuRXZlbnQsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLngrnlh7vnoa7lrprmjInpkq7vvIFcIik7XHJcbiAgICAgICAgdXRpbHMuVG9vbF9OYXRpdmUuR2FtZUV4aXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0V2lkZ2V0KCkge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB1dGlscy5wb3N0UmVjb21tZW50U2hvd0RhdGEoU3ViTG9jYXRpb24uaXNHYW1lRXhpdERpYWxvZyk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdG90YWxQYWdlOiBudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuX2p1bXBMaXN0Lmxlbmd0aCAvIDYpO1xyXG4gICAgICAgIC8vIHV0aWxzLnNob3dMb2coYHFjcm9zc3dpZGdldCA+Pj4gdG90YWxQYWdlID0gJHt0b3RhbFBhZ2V9YCk7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhgcWNyb3Nzd2lkZ2V0ID4+PiB0b3RhbFBhZ2UgPSAke3RvdGFsUGFnZX1gKTtcclxuICAgICAgICBsZXQgaW5keDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsUGFnZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fcGFnZUl0ZW0pO1xyXG4gICAgICAgICAgICBwYWdlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VWaWV3LmFkZFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2p1bXBMaXN0W2luZHhdKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX3BhZ2VSZWNJdGVtKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBxY3Jvc3NXaWRnZXRJdGVtOiBRQ3Jvc3NXaWRnZXRJdGVtID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFwiUUNyb3NzV2lkZ2V0SXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHFjcm9zc1dpZGdldEl0ZW0uX2xvY2F0aW9uID0gU3ViTG9jYXRpb24uaXNTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2p1bXBMaXN0W2luZHhdO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFwiUUNyb3NzV2lkZ2V0SXRlbVwiKS5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaW5keCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmF1dG9SZWZyc2hQYWdlVmlldygpO1xyXG4gICAgICAgIC8vIGxldCBpZHg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9qdW1wTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgZGF0YTogYW55ID0gdGhpcy5fanVtcExpc3RbaV07XHJcbiAgICAgICAgLy8gICAgIGlmIChkYXRhICYmIGRhdGEubG9nbykge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGl0ZW1JZHg6IG51bWJlciA9IGlkeDtcclxuICAgICAgICAvLyAgICAgICAgIGlmIChpdGVtSWR4ID49IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGlkeCsrO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5faXRlbXNbaXRlbUlkeF0uaW5pdChkYXRhKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBhdXRvUmVmcnNoUGFnZVZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgLy8gdXRpbHMuc2hvd0xvZyhcIj4+Pj4+Pj4gYXV0b1JlZnJzaFBhZ2VWaWV3XCIpO1xyXG5cclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSAzO1xyXG4gICAgICAgIGlmICh1dGlscy5TZXJ2ZXJDb25maWcgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnN0YXRlbWVudF9hdXRvX3JlZnJlc2gpIHtcclxuICAgICAgICAgICAgaW50ZXJ2YWwgPSB1dGlscy5TZXJ2ZXJDb25maWcuc3RhdGVtZW50X2F1dG9fcmVmcmVzaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOmAgOWHuuW8ueeql+e7hOS7tiR7aW50ZXJ2YWx956eS6Ieq5Yqo5Yi35pawYCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuX3BhZ2VWaWV3LmdldFBhZ2VzKCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gKChpbmRleCA8IGNvdW50KSAmJiAoaW5kZXggKyAxICE9PSBjb3VudCkpID8gKGluZGV4ICsgMSkgOiAwO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZVZpZXcuc2Nyb2xsVG9QYWdlKGluZGV4LCAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VWaWV3LnNjcm9sbFRvUGFnZShpbmRleCwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBpbnRlcnZhbCk7IC8vMTDnp5LkuIDmjaJcclxuICAgIH1cclxufVxyXG4iXX0=