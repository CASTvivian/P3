
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RecommendGamesNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b12f97J/i9PlqiR38XzTuyP', 'RecommendGamesNode');
// common-plugin/Scripts/RecommendGamesNode.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecommendGamesNode = /** @class */ (function (_super) {
    __extends(RecommendGamesNode, _super);
    function RecommendGamesNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.prefab1 = null;
        _this.moreGamesPanel = null;
        _this._pageView = null;
        _this._content = null;
        _this._gamePageNode = null;
        _this._dataDirty = false;
        _this._isContentFilled = false;
        _this._scrollInterval = 3;
        _this._timeTmp = 0;
        _this._gameList = null;
        _this.moreGame = null;
        return _this;
    }
    RecommendGamesNode.prototype.onLoad = function () {
        var pageViewNode = this.node.getChildByName("PageView");
        this.moreGame = cc.find("bg/BtnMore", this.node);
        this._pageView = pageViewNode.getComponent(cc.PageView);
        this._content = this._pageView.content;
        this._gamePageNode = this._content.getChildByName("GamePage");
        this._content.removeAllChildren();
    };
    RecommendGamesNode.prototype.init = function (data) {
        this._gameList = data;
        if (this._gameList && this._gameList.length > 0) {
            this._dataDirty = true;
        }
        else {
            this.node.active = false;
        }
    };
    RecommendGamesNode.prototype.onEnable = function () {
        var self = this;
        this.moreGame.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (PlatUtils_1.default.IsDouyin) {
                Utils_1.utils.Tool_Douyin.showMoreGamesModal();
            }
            else if (!PlatUtils_1.default.IsOPPO || (Utils_1.utils.ServerConfig.recommend_bar_show_pannel && Utils_1.utils.ServerConfig.recommend_bar_show_pannel == "true")) {
                var panel = void 0;
                if (Utils_1.utils.ServerConfig.more_game_skin == 2) {
                    panel = cc.instantiate(self.prefab1);
                    panel.zIndex = 999;
                    self.moreGamesPanel = panel.getComponent("MoreGamesPanel1");
                }
                else {
                    panel = cc.instantiate(self.prefab);
                    panel.zIndex = 999;
                    self.moreGamesPanel = panel.getComponent("MoreGamesPanel");
                }
                cc.director.getScene().addChild(panel);
                self.moreGamesPanel._location = YZ_Constant_1.SubLocation.isScrollbar;
                self.moreGamesPanel.init(self._gameList);
                self.moreGamesPanel.show();
            }
            else {
                Utils_1.utils.showLog("服务器未配置显示更多游戏面板！");
            }
        });
    };
    RecommendGamesNode.prototype.onDisable = function () {
        this.moreGame.targetOff(this);
    };
    RecommendGamesNode.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    };
    RecommendGamesNode.prototype._updateContent = function () {
        if (this._gameList) {
            Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isScrollbar);
            var length = Math.floor(this._gameList.length / 4);
            var index = 0;
            for (var i = 0; i < length; i++) {
                var gamePageList = [];
                for (var j = 0; j < 4; j++) {
                    gamePageList.push(this._gameList[index]);
                    index++;
                }
                var gamePageNode = cc.instantiate(this._gamePageNode);
                var gamePage = gamePageNode.getComponent("GamePage");
                gamePage.init(gamePageList);
                this._pageView.addPage(gamePageNode);
            }
            this._gamePageNode.destroy();
            this._isContentFilled = true;
            this.autoRefrshPageView();
        }
    };
    RecommendGamesNode.prototype.autoRefrshPageView = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        var interval = 3.5;
        this.schedule(function () {
            var count = _this._pageView.getPages().length;
            var index = _this._pageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            if (index == 0) {
                _this._pageView.scrollToPage(index, 0);
            }
            else {
                _this._pageView.scrollToPage(index, 2.5);
            }
        }, interval); //10秒一换
    };
    __decorate([
        property(cc.Prefab)
    ], RecommendGamesNode.prototype, "prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], RecommendGamesNode.prototype, "prefab1", void 0);
    RecommendGamesNode = __decorate([
        ccclass
    ], RecommendGamesNode);
    return RecommendGamesNode;
}(cc.Component));
exports.default = RecommendGamesNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmVjb21tZW5kR2FtZXNOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlDQUFnQztBQUNoQyw2Q0FBNEM7QUFDNUMseUNBQW9DO0FBRTlCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdELHNDQUFZO0lBQTVEO1FBQUEscUVBcUhDO1FBbEhHLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFFekIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUUxQixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFFdEMsZUFBUyxHQUFnQixJQUFJLENBQUM7UUFDOUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixzQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFbEMscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGNBQVEsR0FBWSxJQUFJLENBQUM7O0lBaUc3QixDQUFDO0lBL0ZHLG1DQUFNLEdBQU47UUFDSSxJQUFJLFlBQVksR0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFP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R0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDakQsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNaLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPO0lBQ3pCLENBQUM7SUFqSEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDSztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNNO0lBTFQsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0FxSHRDO0lBQUQseUJBQUM7Q0FySEQsQUFxSEMsQ0FySCtDLEVBQUUsQ0FBQyxTQUFTLEdBcUgzRDtrQkFySG9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lUGFnZSBmcm9tIFwiLi9HYW1lUGFnZVwiO1xyXG5pbXBvcnQgTW9yZUdhbWVzUGFuZWwgZnJvbSBcIi4vTW9yZUdhbWVzUGFuZWxcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBTdWJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb21tZW5kR2FtZXNOb2RlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYjE6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgbW9yZUdhbWVzUGFuZWw6IE1vcmVHYW1lc1BhbmVsID0gbnVsbDtcclxuXHJcbiAgICBfcGFnZVZpZXc6IGNjLlBhZ2VWaWV3ID0gbnVsbDtcclxuICAgIF9jb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9nYW1lUGFnZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIF9kYXRhRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9pc0NvbnRlbnRGaWxsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBfc2Nyb2xsSW50ZXJ2YWw6IG51bWJlciA9IDM7XHJcbiAgICBfdGltZVRtcDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfZ2FtZUxpc3Q6IGFueSA9IG51bGw7XHJcbiAgICBtb3JlR2FtZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBwYWdlVmlld05vZGU6IGNjLk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQYWdlVmlld1wiKTtcclxuICAgICAgICB0aGlzLm1vcmVHYW1lID0gY2MuZmluZChcImJnL0J0bk1vcmVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl9wYWdlVmlldyA9IHBhZ2VWaWV3Tm9kZS5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSB0aGlzLl9wYWdlVmlldy5jb250ZW50O1xyXG5cclxuICAgICAgICB0aGlzLl9nYW1lUGFnZU5vZGUgPSB0aGlzLl9jb250ZW50LmdldENoaWxkQnlOYW1lKFwiR2FtZVBhZ2VcIik7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVMaXN0ID0gZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZUxpc3QgJiYgdGhpcy5fZ2FtZUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubW9yZUdhbWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5Ub29sX0RvdXlpbi5zaG93TW9yZUdhbWVzTW9kYWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghUGxhdFV0aWxzLklzT1BQTyB8fCAodXRpbHMuU2VydmVyQ29uZmlnLnJlY29tbWVuZF9iYXJfc2hvd19wYW5uZWwgJiYgdXRpbHMuU2VydmVyQ29uZmlnLnJlY29tbWVuZF9iYXJfc2hvd19wYW5uZWwgPT0gXCJ0cnVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFuZWw7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLm1vcmVfZ2FtZV9za2luID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbCA9IGNjLmluc3RhbnRpYXRlKHNlbGYucHJlZmFiMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwuekluZGV4ID0gOTk5O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubW9yZUdhbWVzUGFuZWwgPSBwYW5lbC5nZXRDb21wb25lbnQoXCJNb3JlR2FtZXNQYW5lbDFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsID0gY2MuaW5zdGFudGlhdGUoc2VsZi5wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLnpJbmRleCA9IDk5OTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1vcmVHYW1lc1BhbmVsID0gcGFuZWwuZ2V0Q29tcG9uZW50KFwiTW9yZUdhbWVzUGFuZWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChwYW5lbCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vcmVHYW1lc1BhbmVsLl9sb2NhdGlvbiA9IFN1YkxvY2F0aW9uLmlzU2Nyb2xsYmFyO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5tb3JlR2FtZXNQYW5lbC5pbml0KHNlbGYuX2dhbWVMaXN0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYubW9yZUdhbWVzUGFuZWwuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuacjeWKoeWZqOacqumFjee9ruaYvuekuuabtOWkmua4uOaIj+mdouadv++8gVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm1vcmVHYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lTGlzdCkge1xyXG4gICAgICAgICAgICB1dGlscy5wb3N0UmVjb21tZW50U2hvd0RhdGEoU3ViTG9jYXRpb24uaXNTY3JvbGxiYXIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLl9nYW1lTGlzdC5sZW5ndGggLyA0KTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdhbWVQYWdlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lUGFnZUxpc3QucHVzaCh0aGlzLl9nYW1lTGlzdFtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZVBhZ2VOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fZ2FtZVBhZ2VOb2RlKTtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lUGFnZTogR2FtZVBhZ2UgPSBnYW1lUGFnZU5vZGUuZ2V0Q29tcG9uZW50KFwiR2FtZVBhZ2VcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lUGFnZS5pbml0KGdhbWVQYWdlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlVmlldy5hZGRQYWdlKGdhbWVQYWdlTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZ2FtZVBhZ2VOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5faXNDb250ZW50RmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvUmVmcnNoUGFnZVZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b1JlZnJzaFBhZ2VWaWV3KCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbCA9IDMuNTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5fcGFnZVZpZXcuZ2V0UGFnZXMoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3BhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICAgICAgaW5kZXggPSAoKGluZGV4IDwgY291bnQpICYmIChpbmRleCArIDEgIT09IGNvdW50KSkgPyAoaW5kZXggKyAxKSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlVmlldy5zY3JvbGxUb1BhZ2UoaW5kZXgsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZVZpZXcuc2Nyb2xsVG9QYWdlKGluZGV4LCAyLjUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaW50ZXJ2YWwpOyAvLzEw56eS5LiA5o2iXHJcbiAgICB9XHJcbn1cclxuIl19