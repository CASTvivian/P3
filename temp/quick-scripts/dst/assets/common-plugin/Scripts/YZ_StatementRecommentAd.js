
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_StatementRecommentAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfU3RhdGVtZW50UmVjb21tZW50QWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBRWhDLHVDQUFrQztBQUdsQyw2Q0FBNEQ7QUFDNUQsK0JBQTBCO0FBRXBCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFELDJDQUFZO0lBQWpFO1FBQUEscUVBeUZDO1FBdkZXLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsWUFBTSxHQUF1QixFQUFFLENBQUM7UUFFeEMsY0FBUSxHQUFTLElBQUksQ0FBQztRQUV0QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXRCLGdCQUFVLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQyxVQUFVO1FBQ3hDLFlBQU0sR0FBa0IsSUFBSSxDQUFDO1FBQ3BDLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBMEQvQixnQkFBVSxHQUFZLEtBQUssQ0FBQzs7SUFnQmhDLENBQUM7SUF2RUcsd0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztR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YUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsNEJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxhQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyw0QkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQzNCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLGFBQUssQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUF0RmdCLHVCQUF1QjtRQUQzQyxPQUFPO09BQ2EsdUJBQXVCLENBeUYzQztJQUFELDhCQUFDO0NBekZELEFBeUZDLENBekZvRCxFQUFFLENBQUMsU0FBUyxHQXlGaEU7a0JBekZvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBRQ3Jvc3NXaWRnZXRJdGVtIGZyb20gXCIuL1FDcm9zc1dpZGdldEl0ZW1cIjtcclxuaW1wb3J0IEFsZFV0aWxzIGZyb20gXCIuL0FsZFV0aWxzXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCBZWl9OYXRpdmVJdGVtIGZyb20gXCIuL1laX05hdGl2ZUl0ZW1cIjtcclxuaW1wb3J0IHsgU3ViTG9jYXRpb24sIEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vTGlzdFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlaX1N0YXRlbWVudFJlY29tbWVudEFkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9qdW1wTGlzdDogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiBRQ3Jvc3NXaWRnZXRJdGVtW10gPSBbXTtcclxuXHJcbiAgICBsaXN0VmlldzogTGlzdCA9IG51bGw7XHJcblxyXG4gICAgX3BhZ2VJdGVtOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9wYWdlUmVjSXRlbTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfcmVjTGlzdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBuYXRpdmVEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlQWQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHVibGljIHNob3dOYXRpdmVBZDogYm9vbGVhbiA9IHRydWU7IC8v5piv5ZCm5pi+56S65Y6f55Sf5bm/5ZGKXHJcbiAgICBwdWJsaWMgeXpJdGVtOiBZWl9OYXRpdmVJdGVtID0gbnVsbDtcclxuICAgIF9uYXRpdmVJc1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX3JlY0xpc3ROb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUmVjTGlzdFwiKTtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3ID0gdGhpcy5fcmVjTGlzdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJTY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChMaXN0KTtcclxuICAgICAgICB0aGlzLl9uYXRpdmVBZCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5hdGl2ZUFkXCIpO1xyXG4gICAgICAgIEFsZFV0aWxzLlNlbmRFdmVudChcIuaYvuekuue7k+eul1xi5o6o6I2Q57uE5Lu2XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaG93TmF0aXZlQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjTGlzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMueXpJdGVtID0gdGhpcy5fbmF0aXZlQWQuZ2V0Q29tcG9uZW50KFwiWVpfTmF0aXZlSXRlbVwiKTtcclxuICAgICAgICAgICAgdGhpcy55ekl0ZW0uc2hvd1R5cGUgPSAxO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuY3JlYXRlTmF0aXZlQWQobnVsbCx0aGlzLnl6SXRlbSk7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuqTlj4nmjqjlub/osIPnlKjljp/nlJ/lub/lkYrjgIrjgIrjgIrjgIrjgIrjgIrjgIpcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjTGlzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2p1bXBMaXN0ID0gdXRpbHMuZ2V0UmVjb21tb25kR2FtZUxpc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9qdW1wTGlzdCAmJiB0aGlzLl9qdW1wTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0V2lkZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3Lm51bUl0ZW1zID0gdGhpcy5fanVtcExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIuS6pOWPieaOqOW5v+aVsOaNruS4um51bGwsIDblhYPntKDkuqTlj4nmjqjlub/nu4Tku7bkuI3mmL7npLohXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUxhc3ROb2RlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSA1OyBpID4gMjsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zW2ldLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnl6SXRlbSAmJiB0aGlzLnl6SXRlbS5jb250ZW50ICYmIHRoaXMueXpJdGVtLmNvbnRlbnQuYWN0aXZlICYmICF0aGlzLl9uYXRpdmVJc1Nob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlSXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY0xpc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Njb3JsbCAmJiAhdGhpcy5saXN0Vmlldy5zY3JvbGxWaWV3LmlzU2Nyb2xsaW5nKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlldy5jb250ZW50LnkgKz0gZHQgKiAxNTA7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXcuX29uU2Nyb2xsaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTGlzdFJlbmRlcihpdGVtOiBjYy5Ob2RlLCBpZHg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBxY3Jvc3NXaWRnZXRJdGVtOiBRQ3Jvc3NXaWRnZXRJdGVtID0gaXRlbS5nZXRDb21wb25lbnQoXCJRQ3Jvc3NXaWRnZXRJdGVtXCIpO1xyXG4gICAgICAgIHFjcm9zc1dpZGdldEl0ZW0uX2xvY2F0aW9uID0gU3ViTG9jYXRpb24uaXNTdGF0ZW1lbnQ7XHJcbiAgICAgICAgcWNyb3NzV2lkZ2V0SXRlbS5nZXRDb21wb25lbnQoXCJRQ3Jvc3NXaWRnZXRJdGVtXCIpLmluaXQodGhpcy5fanVtcExpc3RbaWR4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b1Njb3JsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaW5pdFdpZGdldCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZy5zdF9yZWNvbW1lbnRfaXNfaGlkZV9iYW5uZXIgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnN0X3JlY29tbWVudF9pc19oaWRlX2Jhbm5lciA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5pi+56S657uT566X5LqS5o6o5ZCO6ZqQ6JePYmFubmVyID4+PlwiKTtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSk7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLk92ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9TY29ybGwgPSB0cnVlO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgICAgIHV0aWxzLnBvc3RSZWNvbW1lbnRTaG93RGF0YShTdWJMb2NhdGlvbi5pc1N0YXRlbWVudCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=