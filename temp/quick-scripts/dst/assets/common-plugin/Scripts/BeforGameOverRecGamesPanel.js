
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/BeforGameOverRecGamesPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe7d8OK+QlJO4RCiDkr2evw', 'BeforGameOverRecGamesPanel');
// common-plugin/Scripts/BeforGameOverRecGamesPanel.ts

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
var BeforGameOverRecGamesPanel = /** @class */ (function (_super) {
    __extends(BeforGameOverRecGamesPanel, _super);
    function BeforGameOverRecGamesPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._gameList = null;
        _this._originScale = 1;
        _this._gameItems = [];
        _this._jumpList = null;
        _this._dataDirty = false;
        _this._is_Horizontal = false;
        _this._closeBtnRight = null;
        _this._closeBtnLine = null;
        _this._star = null;
        _this.gameItemNode = null;
        _this._location = YZ_Constant_1.SubLocation.isMoreGame;
        return _this;
    }
    BeforGameOverRecGamesPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        if (!PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Home);
        }
        this._panel = this.node.getChildByName("Panel");
        this.node.active = false;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920;
            this._is_Horizontal = true;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        if (this._is_Horizontal) {
            this._panel.getChildByName("VGameScrollView").active = false;
            this._panel.getChildByName("VHead").active = false;
            this._gameList = this._panel.getChildByName("HGameScrollView").getComponent(cc.ScrollView).content;
            this.gameItemNode = this._gameList.children[0];
            this._gameList.removeAllChildren();
        }
        else {
            this._panel.getChildByName("HGameScrollView").active = false;
            this._panel.getChildByName("HHead").active = false;
            this._gameList = this._panel.getChildByName("VGameScrollView").getComponent(cc.ScrollView).content;
            this.gameItemNode = this._gameList.children[0];
            this._gameList.removeAllChildren();
        }
        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    };
    BeforGameOverRecGamesPanel.prototype._initWidget = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this._gameList.removeAllChildren();
            var clo = _this._is_Horizontal ? 7 : 4;
            var totalRow = Math.floor(_this._jumpList.length / clo);
            var totalClo = clo * totalRow;
            for (var i = 0; i < totalClo; i++) {
                var data = _this._jumpList[i];
                if (data && data.logo) {
                    var tempNode = cc.instantiate(_this.gameItemNode);
                    var gameItem = tempNode.getComponent("GameItem");
                    gameItem.init(data, _this._location);
                    _this._gameList.addChild(tempNode);
                }
            }
        });
    };
    BeforGameOverRecGamesPanel.prototype.update = function () {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updatePanel();
        }
    };
    BeforGameOverRecGamesPanel.prototype._updatePanel = function () {
        Utils_1.utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    };
    BeforGameOverRecGamesPanel.prototype.init = function (jumpList) {
        this._jumpList = jumpList;
        this._dataDirty = true;
    };
    BeforGameOverRecGamesPanel.prototype.show = function () {
        this.node.active = true;
    };
    BeforGameOverRecGamesPanel.prototype.hide = function () {
        var self = this;
        self.node.active = false;
        if (Utils_1.utils.rewardRecGamePanelCloseFunc) {
            Utils_1.utils.rewardRecGamePanelCloseFunc();
            Utils_1.utils.rewardRecGamePanelCloseFunc = null;
            ;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    BeforGameOverRecGamesPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    BeforGameOverRecGamesPanel = __decorate([
        ccclass
    ], BeforGameOverRecGamesPanel);
    return BeforGameOverRecGamesPanel;
}(cc.Component));
exports.default = BeforGameOverRecGamesPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQmVmb3JHYW1lT3ZlclJlY0dhbWVzUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWdDO0FBQ2hDLDZDQUE0RDtBQUM1RCx5Q0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0QsOENBQVk7SUFBcEU7UUFBQSxxRUEwSEM7UUF4SEcsWUFBTSxHQUFZLElBQUksQ0FBQztRQUN2QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGdCQUFVLEdBQWUsRUFBRSxDQUFDO1FBQzVCLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFFaEMsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsV0FBSyxHQUFZLElBQUksQ0FBQztRQUNkLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXJDLGVBQVMsR0FBZ0IseUJBQVcsQ0FBQyxVQUFVLENBQUM7O0lBeUdwRCxDQUFDO0lBdkdHLDJDQUFNLEdBQU47UUFDSSxJQUFJLGFBQUssQ0FBQyxXQUFXLElBQUksYUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsbUJBQVMsQ0FBQyxlQUFlLEVBQUU7WUFDNUIsYUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsNEJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuRDtRQUVELElBQUksQ0FB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LENBQUMsZUFBZSxJQUFJLGFBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNqRCxhQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFTSxzREFBaUIsR0FBeEIsVUFBeUIsS0FBVSxFQUFFLElBQVM7UUFDMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUF6SGdCLDBCQUEwQjtRQUQ5QyxPQUFPO09BQ2EsMEJBQTBCLENBMEg5QztJQUFELGlDQUFDO0NBMUhELEFBMEhDLENBMUh1RCxFQUFFLENBQUMsU0FBUyxHQTBIbkU7a0JBMUhvQiwwQkFBMEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZUl0ZW0gZnJvbSBcIi4vR2FtZUl0ZW1cIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiwgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlZm9yR2FtZU92ZXJSZWNHYW1lc1BhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2dhbWVMaXN0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9vcmlnaW5TY2FsZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICBfZ2FtZUl0ZW1zOiBHYW1lSXRlbVtdID0gW107XHJcbiAgICBfanVtcExpc3Q6IGFueSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNfSG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9jbG9zZUJ0blJpZ2h0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9jbG9zZUJ0bkxpbmU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIF9zdGFyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgZ2FtZUl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBfbG9jYXRpb246IFN1YkxvY2F0aW9uID0gU3ViTG9jYXRpb24uaXNNb3JlR2FtZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkhvbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcGFuZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbFwiKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIGxldCByYXRpbzogbnVtYmVyID0gMTtcclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxOTIwO1xyXG4gICAgICAgICAgICB0aGlzLl9pc19Ib3Jpem9udGFsID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzX0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJWR2FtZVNjcm9sbFZpZXdcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJWSGVhZFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lTGlzdCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiSEdhbWVTY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJdGVtTm9kZSA9IHRoaXMuX2dhbWVMaXN0LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lTGlzdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkhHYW1lU2Nyb2xsVmlld1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJISGVhZFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lTGlzdCA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiVkdhbWVTY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJdGVtTm9kZSA9IHRoaXMuX2dhbWVMaXN0LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lTGlzdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BhbmVsLnNjYWxlID0gcmF0aW87XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luU2NhbGUgPSB0aGlzLl9wYW5lbC5zY2FsZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dhbWVMaXN0LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIGxldCBjbG8gPSB0aGlzLl9pc19Ib3Jpem9udGFsID8gNyA6IDQ7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbFJvdyA9IE1hdGguZmxvb3IodGhpcy5fanVtcExpc3QubGVuZ3RoIC8gY2xvKTtcclxuICAgICAgICAgICAgbGV0IHRvdGFsQ2xvID0gY2xvICogdG90YWxSb3c7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxDbG87IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuX2p1bXBMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sb2dvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5nYW1lSXRlbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnYW1lSXRlbTogR2FtZUl0ZW0gPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoXCJHYW1lSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lSXRlbS5pbml0KGRhdGEsIHRoaXMuX2xvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nYW1lTGlzdC5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUGFuZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVBhbmVsKCkge1xyXG4gICAgICAgIHV0aWxzLnBvc3RSZWNvbW1lbnRTaG93RGF0YSh0aGlzLl9sb2NhdGlvbik7XHJcbiAgICAgICAgdGhpcy5faW5pdFdpZGdldCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChqdW1wTGlzdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fanVtcExpc3QgPSBqdW1wTGlzdDtcclxuICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICBpZiAodXRpbHMucmV3YXJkUmVjR2FtZVBhbmVsQ2xvc2VGdW5jKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJld2FyZFJlY0dhbWVQYW5lbENsb3NlRnVuYygpO1xyXG4gICAgICAgICAgICB1dGlscy5yZXdhcmRSZWNHYW1lUGFuZWxDbG9zZUZ1bmMgPSBudWxsOztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlscy5yZXdhcmRDbG9zZUZ1bmMgJiYgdXRpbHMucmV3YXJkQ2xvc2VGdW5jKCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnJld2FyZENsb3NlRnVuYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsb3NlQnRuSGFuZGxlcihldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG4iXX0=