"use strict";
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