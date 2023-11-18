
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/WithdrawalWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb1bdqkx91OqbOB6rlUrN5w', 'WithdrawalWidget');
// common-plugin/Scripts/WithdrawalWidget.ts

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
var WithdrawalWidget = /** @class */ (function (_super) {
    __extends(WithdrawalWidget, _super);
    function WithdrawalWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.withdrawalPanel = null;
        _this._withdrawalNode = null;
        _this._isInit = false;
        return _this;
    }
    WithdrawalWidget.prototype.onLoad = function () {
        this._withdrawalNode = this.getComponentInChildren("WithdrawalNode");
        this._withdrawalNode.node.active = false;
    };
    WithdrawalWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    WithdrawalWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    WithdrawalWidget.prototype._initWidget = function () {
        this._withdrawalNode.node.active = true;
        // this._withdrawalNode.init({});
    };
    __decorate([
        property(cc.Prefab)
    ], WithdrawalWidget.prototype, "withdrawalPanel", void 0);
    WithdrawalWidget = __decorate([
        ccclass
    ], WithdrawalWidget);
    return WithdrawalWidget;
}(cc.Component));
exports.default = WithdrawalWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcV2l0aGRyYXdhbFdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFHMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUE2QkM7UUExQkcscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFFbEMscUJBQWUsR0FBbUIsSUFBSSxDQUFDO1FBQ3ZDLGFBQU8sR0FBWSxLQUFLLENBQUM7O0lBdUI3QixDQUFDO0lBckJHLGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLGFBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUMxQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxhQUFLLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLGlDQUFpQztJQUNyQyxDQUFDO0lBdkJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkRBQ2M7SUFIakIsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0E2QnBDO0lBQUQsdUJBQUM7Q0E3QkQsQUE2QkMsQ0E3QjZDLEVBQUUsQ0FBQyxTQUFTLEdBNkJ6RDtrQkE3Qm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFdpdGhkcmF3YWxOb2RlIGZyb20gXCIuL1dpdGhkcmF3YWxOb2RlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2l0aGRyYXdhbFdpZGdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHdpdGhkcmF3YWxQYW5lbDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBfd2l0aGRyYXdhbE5vZGU6IFdpdGhkcmF3YWxOb2RlID0gbnVsbDtcclxuICAgIF9pc0luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fd2l0aGRyYXdhbE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEluQ2hpbGRyZW4oXCJXaXRoZHJhd2FsTm9kZVwiKTtcclxuICAgICAgICB0aGlzLl93aXRoZHJhd2FsTm9kZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFdpZGdldCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB1dGlscy51bnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3dpdGhkcmF3YWxOb2RlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLl93aXRoZHJhd2FsTm9kZS5pbml0KHt9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==