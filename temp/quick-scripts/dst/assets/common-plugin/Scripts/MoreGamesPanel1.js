
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/MoreGamesPanel1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92ac1akrqlDIJvoROkqJAWr', 'MoreGamesPanel1');
// common-plugin/Scripts/MoreGamesPanel1.ts

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
var GameItem_1 = require("./GameItem");
var YZ_Constant_1 = require("./YZ_Constant");
var Utils_1 = require("./Utils");
var List_1 = require("./List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var _panelSize = [cc.size(225, 1000), cc.size(506, 1000)];
var _titleSize = [cc.size(111, 54), cc.size(275, 54)];
var _titleBgSize = [cc.size(376, 104), cc.size(545, 104)];
var _starSize = [cc.size(251, 89), cc.size(425, 89)];
var MoreGamesPanel = /** @class */ (function (_super) {
    __extends(MoreGamesPanel, _super);
    function MoreGamesPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._gameList = null;
        _this._originScale = 1;
        _this._gameItems = [];
        _this._jumpList = null;
        _this._dataDirty = false;
        _this._closeBtnRight = null;
        _this._closeBtnLine = null;
        _this._title = null;
        _this._titleBg = null;
        _this._star = null;
        _this.gameItemNode = null;
        _this.listView = null;
        _this.autoScorll = false;
        return _this;
    }
    MoreGamesPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");
        this.listView = this._panel.getChildByName("GameList").getComponent(List_1.default);
        // this._gameList = this._panel.getChildByName("GameList").getComponent(cc.ScrollView).content;
        // this.gameItemNode = this._gameList.children[0];
        // this._gameList.removeAllChildren();
        this._closeBtnRight = this._panel.getChildByName("Btn_Close");
        this._closeBtnRight.active = true;
        this._closeBtnLine = this._panel.getChildByName("Btn_CloseSide");
        this._closeBtnLine.active = false;
        this._titleBg = cc.find("Title/TitleBg", this._panel);
        this._title = cc.find("Title/Txt", this._panel);
        this._star = cc.find("Title/Star", this._panel);
        this.node.active = false;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    };
    MoreGamesPanel.prototype.update = function (dt) {
        if (this.autoScorll && !this.listView.scrollView.isScrolling()) {
            this.listView.content.y += dt * 100;
            this.listView._onScrolling();
        }
    };
    MoreGamesPanel.prototype.onListRender = function (item, idx) {
        var qcrossWidgetItem = item.getComponent(GameItem_1.default);
        qcrossWidgetItem.init(this._jumpList[idx], YZ_Constant_1.SubLocation.isMoreGame);
    };
    MoreGamesPanel.prototype._initWidget = function () {
        var _this = this;
        if (this._jumpList.length > 5) {
            if (Utils_1.utils.ServerConfig.more_game_pannel_auto_scroll && Utils_1.utils.ServerConfig.more_game_pannel_auto_scroll == "false") {
                Utils_1.utils.showLog("服务器不开启自动滚动！");
            }
            else {
                this.scheduleOnce(function () {
                    _this.autoScorll = true;
                }, 1);
            }
        }
        Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isMoreGame);
    };
    MoreGamesPanel.prototype.init = function (jumpList) {
        this._jumpList = jumpList;
        this._dataDirty = true;
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
            this.listView.numItems = this._jumpList.length;
        }
        else {
            cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
            this.node.destroy();
        }
    };
    MoreGamesPanel.prototype.show = function () {
        this.node.active = true;
        // this._panel.x = -this._panel.getContentSize().width;
        this._panel.y = 0;
        this._panel.runAction(cc.moveBy(0.3, cc.v2(this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()));
    };
    MoreGamesPanel.prototype.hide = function () {
        var self = this;
        this._panel.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(function () {
            self.node.active = false;
        })));
    };
    MoreGamesPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    MoreGamesPanel = __decorate([
        ccclass
    ], MoreGamesPanel);
    return MoreGamesPanel;
}(cc.Component));
exports.default = MoreGamesPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTW9yZUdhbWVzUGFuZWwxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUNsQyw2Q0FBNEM7QUFDNUMsaUNBQWdDO0FBR2hDLCtCQUEwQjtBQUVwQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLFVBQVUsR0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdkUsSUFBTSxVQUFVLEdBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLElBQU0sWUFBWSxHQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2RSxJQUFNLFNBQVMsR0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFHbEU7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUE4R0M7UUE1R0EsWUFBTSxHQUFZLElBQUksQ0FBQztRQUN2QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGdCQUFVLEdBQWUsRUFBRSxDQUFDO1FBQzVCLGVBQVMsR0FBUSxJ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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVJdGVtIGZyb20gXCIuL0dhbWVJdGVtXCI7XHJcbmltcG9ydCB7IFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUUNyb3NzV2lkZ2V0SXRlbSBmcm9tIFwiLi9RQ3Jvc3NXaWRnZXRJdGVtXCI7XHJcbmltcG9ydCBDb21wYXRpYmxlVG9vbCBmcm9tIFwiLi9Db21wYXRpYmxlVG9vbFwiO1xyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9MaXN0XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgX3BhbmVsU2l6ZTogY2MuU2l6ZVtdID0gW2NjLnNpemUoMjI1LCAxMDAwKSwgY2Muc2l6ZSg1MDYsIDEwMDApXTtcclxuY29uc3QgX3RpdGxlU2l6ZTogY2MuU2l6ZVtdID0gW2NjLnNpemUoMTExLCA1NCksIGNjLnNpemUoMjc1LCA1NCldO1xyXG5jb25zdCBfdGl0bGVCZ1NpemU6IGNjLlNpemVbXSA9IFtjYy5zaXplKDM3NiwgMTA0KSwgY2Muc2l6ZSg1NDUsIDEwNCldO1xyXG5jb25zdCBfc3RhclNpemU6IGNjLlNpemVbXSA9IFtjYy5zaXplKDI1MSwgODkpLCBjYy5zaXplKDQyNSwgODkpXTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vcmVHYW1lc1BhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblx0X3BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHRfZ2FtZUxpc3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cdF9vcmlnaW5TY2FsZTogbnVtYmVyID0gMTtcclxuXHJcblx0X2dhbWVJdGVtczogR2FtZUl0ZW1bXSA9IFtdO1xyXG5cdF9qdW1wTGlzdDogYW55ID0gbnVsbDtcclxuXHRfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdF9jbG9zZUJ0blJpZ2h0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHRfY2xvc2VCdG5MaW5lOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblx0X3RpdGxlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHRfdGl0bGVCZzogY2MuTm9kZSA9IG51bGw7XHJcblx0X3N0YXI6IGNjLk5vZGUgPSBudWxsO1xyXG5cdHByaXZhdGUgZ2FtZUl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblx0bGlzdFZpZXc6IExpc3QgPSBudWxsO1xyXG5cclxuXHRvbkxvYWQoKSB7XHJcblx0XHRpZiAodXRpbHMub3RoZXJDb25maWcgJiYgdXRpbHMub3RoZXJDb25maWcuZ3JvdXApIHtcclxuXHRcdFx0dGhpcy5ub2RlLmdyb3VwID0gdXRpbHMub3RoZXJDb25maWcuZ3JvdXA7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9wYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG5cdFx0dGhpcy5saXN0VmlldyA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiR2FtZUxpc3RcIikuZ2V0Q29tcG9uZW50KExpc3QpXHJcblx0XHQvLyB0aGlzLl9nYW1lTGlzdCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiR2FtZUxpc3RcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gdGhpcy5nYW1lSXRlbU5vZGUgPSB0aGlzLl9nYW1lTGlzdC5jaGlsZHJlblswXTtcclxuXHRcdC8vIHRoaXMuX2dhbWVMaXN0LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcblxyXG5cdFx0dGhpcy5fY2xvc2VCdG5SaWdodCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiQnRuX0Nsb3NlXCIpO1xyXG5cdFx0dGhpcy5fY2xvc2VCdG5SaWdodC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5fY2xvc2VCdG5MaW5lID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5fQ2xvc2VTaWRlXCIpO1xyXG5cdFx0dGhpcy5fY2xvc2VCdG5MaW5lLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX3RpdGxlQmcgPSBjYy5maW5kKFwiVGl0bGUvVGl0bGVCZ1wiLCB0aGlzLl9wYW5lbCk7XHJcblx0XHR0aGlzLl90aXRsZSA9IGNjLmZpbmQoXCJUaXRsZS9UeHRcIiwgdGhpcy5fcGFuZWwpO1xyXG5cdFx0dGhpcy5fc3RhciA9IGNjLmZpbmQoXCJUaXRsZS9TdGFyXCIsIHRoaXMuX3BhbmVsKTtcclxuXHJcblx0XHR0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcblx0XHRpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XHJcblx0XHRcdC8vIOaoquWxj+a4uOaIj1xyXG5cdFx0XHRyYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxOTIwICogMC41O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTA4MDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wYW5lbC5zY2FsZSA9IHJhdGlvO1xyXG5cdFx0dGhpcy5fb3JpZ2luU2NhbGUgPSB0aGlzLl9wYW5lbC5zY2FsZTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShkdCkge1xyXG5cdFx0aWYgKHRoaXMuYXV0b1Njb3JsbCAmJiAhdGhpcy5saXN0Vmlldy5zY3JvbGxWaWV3LmlzU2Nyb2xsaW5nKCkpIHtcclxuXHRcdFx0dGhpcy5saXN0Vmlldy5jb250ZW50LnkgKz0gZHQgKiAxMDA7XHJcblx0XHRcdHRoaXMubGlzdFZpZXcuX29uU2Nyb2xsaW5nKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkxpc3RSZW5kZXIoaXRlbTogY2MuTm9kZSwgaWR4OiBudW1iZXIpIHtcclxuXHRcdGxldCBxY3Jvc3NXaWRnZXRJdGVtOiBHYW1lSXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KEdhbWVJdGVtKTtcclxuXHRcdHFjcm9zc1dpZGdldEl0ZW0uaW5pdCh0aGlzLl9qdW1wTGlzdFtpZHhdLCBTdWJMb2NhdGlvbi5pc01vcmVHYW1lKTtcclxuXHR9XHJcblxyXG5cdGF1dG9TY29ybGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIF9pbml0V2lkZ2V0KCkge1xyXG5cdFx0aWYgKHRoaXMuX2p1bXBMaXN0Lmxlbmd0aCA+IDUpIHtcclxuXHRcdFx0aWYgKHV0aWxzLlNlcnZlckNvbmZpZy5tb3JlX2dhbWVfcGFubmVsX2F1dG9fc2Nyb2xsICYmIHV0aWxzLlNlcnZlckNvbmZpZy5tb3JlX2dhbWVfcGFubmVsX2F1dG9fc2Nyb2xsID09IFwiZmFsc2VcIikge1xyXG5cdFx0XHRcdHV0aWxzLnNob3dMb2coXCLmnI3liqHlmajkuI3lvIDlkK/oh6rliqjmu5rliqjvvIFcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5hdXRvU2NvcmxsID0gdHJ1ZTtcclxuXHRcdFx0XHR9LCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLnBvc3RSZWNvbW1lbnRTaG93RGF0YShTdWJMb2NhdGlvbi5pc01vcmVHYW1lKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbml0KGp1bXBMaXN0OiBhbnkpIHtcclxuXHRcdHRoaXMuX2p1bXBMaXN0ID0ganVtcExpc3Q7XHJcblx0XHR0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9qdW1wTGlzdCAmJiB0aGlzLl9qdW1wTGlzdC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMuX2luaXRXaWRnZXQoKTtcclxuXHRcdFx0dGhpcy5saXN0Vmlldy5udW1JdGVtcyA9IHRoaXMuX2p1bXBMaXN0Lmxlbmd0aDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNjLndhcm4oXCLkuqTlj4nmjqjlub/mlbDmja7kuLpudWxsLCA25YWD57Sg5Lqk5Y+J5o6o5bm/57uE5Lu25LiN5pi+56S6IVwiKTtcclxuXHRcdFx0dGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzaG93KCkge1xyXG5cdFx0dGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblx0XHQvLyB0aGlzLl9wYW5lbC54ID0gLXRoaXMuX3BhbmVsLmdldENvbnRlbnRTaXplKCkud2lkdGg7XHJcblx0XHR0aGlzLl9wYW5lbC55ID0gMDtcclxuXHRcdHRoaXMuX3BhbmVsLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMC4zLCBjYy52Mih0aGlzLl9wYW5lbC5nZXRDb250ZW50U2l6ZSgpLndpZHRoLCAwKSkuZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGhpZGUoKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLl9wYW5lbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMywgY2MudjIoLXRoaXMuX3BhbmVsLmdldENvbnRlbnRTaXplKCkud2lkdGgsIDApKS5lYXNpbmcoY2MuZWFzZVF1YWRyYXRpY0FjdGlvbk91dCgpKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG5cdFx0XHRzZWxmLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHR9KSkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uQ2xvc2VCdG5IYW5kbGVyKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG5cdFx0dGhpcy5oaWRlKCk7XHJcblx0fVxyXG59XHJcbiJdfQ==