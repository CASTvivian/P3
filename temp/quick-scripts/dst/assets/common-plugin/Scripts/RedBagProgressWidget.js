
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RedBagProgressWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08619NRFCNJ1ZrMhE5AcumI', 'RedBagProgressWidget');
// common-plugin/Scripts/RedBagProgressWidget.ts

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
var RedBagProgressWidget = /** @class */ (function (_super) {
    __extends(RedBagProgressWidget, _super);
    function RedBagProgressWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._redBagProgressNode = null;
        _this._isInit = false;
        _this._data = null;
        return _this;
    }
    RedBagProgressWidget.prototype.onLoad = function () {
        this._redBagProgressNode = this.getComponentInChildren("RedBagProgressNode");
        this._redBagProgressNode.node.active = false;
    };
    RedBagProgressWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    RedBagProgressWidget.prototype.init = function (data) {
        this._data = data;
    };
    RedBagProgressWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    RedBagProgressWidget.prototype._initWidget = function () {
        this._redBagProgressNode._location = this._data ? this._data.location : "default";
        this._redBagProgressNode.node.active = true;
    };
    RedBagProgressWidget = __decorate([
        ccclass
    ], RedBagProgressWidget);
    return RedBagProgressWidget;
}(cc.Component));
exports.default = RedBagProgressWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmVkQmFnUHJvZ3Jlc3NXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtELHdDQUFZO0lBQTlEO1FBQUEscUVBZ0NDO1FBOUJHLHlCQUFtQixHQUF1QixJQUFJLENBQUM7UUFDL0MsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixXQUFLLEdBQVEsSUFBSSxDQUFDOztJQTRCdEIsQ0FBQztJQTFCRyxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNqRCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsYUFBSyxDQUFDLHVCQUF1QixDQUFDO1lBQzFCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLElBQVU7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsd0NBQVMsR0FBVDtRQUNJLGFBQUssQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBR0QsMENBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNsRixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDaEQsQ0FBQztJQTdCZ0Isb0JBQW9CO1FBRHhDLE9BQU87T0FDYSxvQkFBb0IsQ0FnQ3hDO0lBQUQsMkJBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ2lELEVBQUUsQ0FBQyxTQUFTLEdBZ0M3RDtrQkFoQ29CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWRCYWdQcm9ncmVzc05vZGUgZnJvbSBcIi4vUmVkQmFnUHJvZ3Jlc3NOb2RlXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRCYWdQcm9ncmVzc1dpZGdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgX3JlZEJhZ1Byb2dyZXNzTm9kZTogUmVkQmFnUHJvZ3Jlc3NOb2RlID0gbnVsbDtcclxuICAgIF9pc0luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9kYXRhOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9yZWRCYWdQcm9ncmVzc05vZGUgPSB0aGlzLmdldENvbXBvbmVudEluQ2hpbGRyZW4oXCJSZWRCYWdQcm9ncmVzc05vZGVcIik7XHJcbiAgICAgICAgdGhpcy5fcmVkQmFnUHJvZ3Jlc3NOb2RlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0V2lkZ2V0KCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHV0aWxzLnVucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9pbml0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3JlZEJhZ1Byb2dyZXNzTm9kZS5fbG9jYXRpb24gPSB0aGlzLl9kYXRhID8gdGhpcy5fZGF0YS5sb2NhdGlvbiA6IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgIHRoaXMuX3JlZEJhZ1Byb2dyZXNzTm9kZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=