
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/ShowDate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb2bf+T41RP1pOMLr4eZBx6', 'ShowDate');
// scripts/Framework/ShowDate.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode;
var ShowDate = /** @class */ (function (_super) {
    __extends(ShowDate, _super);
    function ShowDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowDate.prototype.start = function () {
        if (CC_EDITOR) {
            var label = this.node.getComponent(cc.Label);
            if (label) {
                var d = new Date();
                label.string = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            }
        }
        this.node.zIndex = cc.macro.MAX_ZINDEX;
    };
    ShowDate = __decorate([
        ccclass,
        executeInEditMode
    ], ShowDate);
    return ShowDate;
}(cc.Component));
exports.default = ShowDate;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxTaG93RGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQWlDLEVBQUUsQ0FBQyxVQUFVLEVBQTVDLE9BQU8sYUFBQSxFQUFFLGlCQUFpQix1QkFBa0IsQ0FBQztBQUlyRDtJQUFzQyw0QkFBWTtJQUFsRDs7SUFhQSxDQUFDO0lBWEcsd0JBQUssR0FBTDtRQUNJLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2pGO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMzQyxDQUFDO0lBWGdCLFFBQVE7UUFGNUIsT0FBTztRQUNQLGlCQUFpQjtPQUNHLFFBQVEsQ0FhNUI7SUFBRCxlQUFDO0NBYkQsQUFhQyxDQWJxQyxFQUFFLENBQUMsU0FBUyxHQWFqRDtrQkFib0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd0RhdGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gZC5nZXRGdWxsWWVhcigpICsgXCIvXCIgKyAoZC5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArIGQuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=