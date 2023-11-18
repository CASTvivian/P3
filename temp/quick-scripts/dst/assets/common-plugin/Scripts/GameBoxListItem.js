
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GameBoxListItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZUJveExpc3RJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUsxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1Qzs7R0FFRztBQUVIO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBa0RDO1FBaERHLFVBQUksR0FBUSxJQUFJLENBQUM7UUFFakIsZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBQy9CLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsZ0JBQVUsR0FBMEIsRUFBRSxDQUFDOztJQTJDM0MsQ0FBQztJQXpDRyxnQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksSUFBUztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLEVBQVU7UUFDYixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUlELG9DQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxhQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUM3RDtZQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUN6QztpQkFDSjthQUNKO1NBQ0o7SUFFTCxDQUFDO0lBakRnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBa0RuQztJQUFELHNCQUFDO0NBbERELEFBa0RDLENBbEQ0QyxFQUFFLENBQUMsU0FBUyxHQWtEeEQ7a0JBbERvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgR2FtZUl0ZW0gZnJvbSBcIi4vR2FtZUl0ZW1cIjtcclxuaW1wb3J0IEdhbWVCb3hMaXN0R2FtZUl0ZW0gZnJvbSBcIi4vR2FtZUJveExpc3RHYW1lSXRlbVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG4vKipcclxuICog5o6o6I2Q5YiX6KGo6IqC54K5XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm94TGlzdEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGRhdGE6IGFueSA9IG51bGw7XHJcblxyXG4gICAgdGl0bGVMYWJlbDogY2MuUmljaFRleHQgPSBudWxsO1xyXG4gICAgX2RhdGFEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgX2dhbWVMaXN0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9nYW1lSXRlbXM6IEdhbWVCb3hMaXN0R2FtZUl0ZW1bXSA9IFtdO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnRpdGxlTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUxpc3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsaXN0TGF5XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ2FtZUxpc3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dhbWVJdGVtcy5wdXNoKHRoaXMuX2dhbWVMaXN0LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcIkdhbWVCb3hMaXN0R2FtZUl0ZW1cIikpO1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lTGlzdC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdXBkYXRlSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCJib3hMaXN0OiBcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZUxhYmVsLnN0cmluZyA9IFwiPGI+XCIgKyB0aGlzLmRhdGEudGl0bGUgKyBcIjwvYj5cIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pbmZvcyAmJiB0aGlzLmRhdGEuaW5mb3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuaW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2FtZUl0ZW1zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVJdGVtc1tpXS5pbml0KHRoaXMuZGF0YS5pbmZvc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVJdGVtc1tpXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=