"use strict";
cc._RF.push(module, '43cccVEk7VCIph7mge+mLVv', 'GameBoxListItem');
// common-plugin/Scripts/GameBoxListItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 推荐列表节点
 */
var GameBoxListItem = /** @class */ (function (_super) {
    __extends(GameBoxListItem, _super);
    function GameBoxListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        _this.titleLabel = null;
        _this._dataDirty = false;
        _this._gameList = null;
        _this._gameItems = [];
        return _this;
    }
    GameBoxListItem.prototype.onLoad = function () {
        this.titleLabel = this.node.getChildByName("titleLabel").getComponent(cc.RichText);
        this._gameList = this.node.getChildByName("listLay");
        for (var i = 0; i < this._gameList.childrenCount; i++) {
            this._gameItems.push(this._gameList.children[i].getComponent("GameBoxListGameItem"));
            this._gameList.children[i].active = false;
        }
    };
    GameBoxListItem.prototype.init = function (data) {
        this.data = data;
        this._dataDirty = true;
    };
    GameBoxListItem.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    };
    GameBoxListItem.prototype.updateItem = function () {
        if (this.data) {
            Utils_1.utils.showLog("boxList: ", this.data);
            if (this.data.title) {
                this.titleLabel.string = "<b>" + this.data.title + "</b>";
            }
            if (this.data.infos && this.data.infos.length > 0) {
                for (var i = 0; i < this.data.infos.length; i++) {
                    if (this._gameItems[i]) {
                        this._gameItems[i].init(this.data.infos[i]);
                        this._gameItems[i].node.active = true;
                    }
                }
            }
        }
    };
    GameBoxListItem = __decorate([
        ccclass
    ], GameBoxListItem);
    return GameBoxListItem;
}(cc.Component));
exports.default = GameBoxListItem;

cc._RF.pop();