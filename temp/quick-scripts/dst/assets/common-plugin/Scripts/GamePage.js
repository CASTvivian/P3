
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GamePage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '63a41cIPQJDv6DXfWU7Rp52', 'GamePage');
// common-plugin/Scripts/GamePage.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePage = /** @class */ (function (_super) {
    __extends(GamePage, _super);
    function GamePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameList = null;
        _this._gameItemNodes = [];
        _this._isContentFilled = false;
        _this._dataDirty = false;
        return _this;
    }
    GamePage.prototype.init = function (data) {
        this._gameList = data;
        this._dataDirty = true;
    };
    GamePage.prototype.onLoad = function () {
        this._gameItemNodes = this.node.children;
        for (var i = 0; i < this._gameItemNodes.length; i++) {
            this._gameItemNodes[i].active = false;
        }
    };
    GamePage.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    };
    GamePage.prototype._updateContent = function () {
        if (this._gameList && this._gameList.length > 0 && this._gameList.length <= 5) {
            this._isContentFilled = true;
            var itemData = null;
            for (var i = 0; i < this._gameList.length; i++) {
                itemData = this._gameList[i];
                var newGameItemNode = this._gameItemNodes[i];
                var gameItem = newGameItemNode.getComponent("GameItem");
                gameItem.init(itemData, YZ_Constant_1.SubLocation.isScrollbar);
                newGameItemNode.active = true;
            }
        }
    };
    GamePage = __decorate([
        ccclass
    ], GamePage);
    return GamePage;
}(cc.Component));
exports.default = GamePage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBeUNDO1FBdkNHLGVBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsb0JBQWMsR0FBYyxFQUFFLENBQUM7UUFDL0Isc0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLGdCQUFVLEdBQVksS0FBSyxDQUFDOztJQW1DaEMsQ0FBQztJQWpDVSx1QkFBSSxHQUFYLFVBQVksSUFBUztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCx5QkFBTSxHQUFOLFVBQU8sRUFBVTtRQUNiLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFFN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksZUFBZSxHQUFZLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksUUFBUSxHQUFhLGVBQWUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2xFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHlCQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pELGVBQWUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO1NBQ0o7SUFDTCxDQUFDO0lBeENnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBeUM1QjtJQUFELGVBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q3FDLEVBQUUsQ0FBQyxTQUFTLEdBeUNqRDtrQkF6Q29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZUl0ZW0gZnJvbSBcIi4vR2FtZUl0ZW1cIjtcclxuaW1wb3J0IHsgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQYWdlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBfZ2FtZUxpc3Q6IGFueSA9IG51bGw7XHJcbiAgICBfZ2FtZUl0ZW1Ob2RlczogY2MuTm9kZVtdID0gW107XHJcbiAgICBfaXNDb250ZW50RmlsbGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX2RhdGFEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVMaXN0ID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9nYW1lSXRlbU5vZGVzID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ2FtZUl0ZW1Ob2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lSXRlbU5vZGVzW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWVMaXN0ICYmIHRoaXMuX2dhbWVMaXN0Lmxlbmd0aCA+IDAgJiYgdGhpcy5fZ2FtZUxpc3QubGVuZ3RoIDw9IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNDb250ZW50RmlsbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ2FtZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhID0gdGhpcy5fZ2FtZUxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3R2FtZUl0ZW1Ob2RlOiBjYy5Ob2RlID0gdGhpcy5fZ2FtZUl0ZW1Ob2Rlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lSXRlbTogR2FtZUl0ZW0gPSBuZXdHYW1lSXRlbU5vZGUuZ2V0Q29tcG9uZW50KFwiR2FtZUl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lSXRlbS5pbml0KGl0ZW1EYXRhLCBTdWJMb2NhdGlvbi5pc1Njcm9sbGJhcik7XHJcbiAgICAgICAgICAgICAgICBuZXdHYW1lSXRlbU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=