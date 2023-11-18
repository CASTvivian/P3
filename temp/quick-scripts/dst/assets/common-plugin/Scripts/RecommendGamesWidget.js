
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RecommendGamesWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e31b1c0YlND25VRQ4r4cdDL', 'RecommendGamesWidget');
// common-plugin/Scripts/RecommendGamesWidget.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecommendGamesWidget = /** @class */ (function (_super) {
    __extends(RecommendGamesWidget, _super);
    function RecommendGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._recommendNode = null;
        _this._isInit = false;
        return _this;
    }
    RecommendGamesWidget.prototype.onLoad = function () {
        this._recommendNode = this.getComponentInChildren("RecommendGamesNode");
        this._recommendNode.node.active = false;
    };
    RecommendGamesWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    RecommendGamesWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    RecommendGamesWidget.prototype._initWidget = function () {
        if (this._isInit)
            return;
        var valid = true;
        if (Utils_1.utils.isShowRecommondGamesList()) {
            if (PlatUtils_1.default.IsDouyin) {
                if (!Utils_1.utils.Tool_Douyin.isShowMoreGamesModal()) {
                    this.node.destroy();
                }
            }
            var data = Utils_1.utils.getRecommondGameList();
            if (data) {
                if (data.length > 0) {
                    this._isInit = true;
                    this._recommendNode.init(data);
                    this._recommendNode.node.active = true;
                }
                else {
                    cc.warn("交叉推广数据长度为0");
                    valid = false;
                }
            }
            else {
                cc.warn("交叉推广数据为null!");
                valid = false;
            }
        }
        if (!valid) {
            this.node.destroy();
        }
    };
    RecommendGamesWidget = __decorate([
        ccclass
    ], RecommendGamesWidget);
    return RecommendGamesWidget;
}(cc.Component));
exports.default = RecommendGamesWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmVjb21tZW5kR2FtZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBR2hDLHlDQUFvQztBQUU5QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrRCx3Q0FBWTtJQUE5RDtRQUFBLHFFQW9EQztRQWxERyxvQkFBYyxHQUF1QixJQUFJLENBQUM7UUFDMUMsYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUFpRDdCLENBQUM7SUEvQ0cscUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsYUFBSyxDQUFDLHVCQUF1QixDQUFDO1lBQzFCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsd0NBQVMsR0FBVDtRQUNJLGFBQUssQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXpCLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQztRQUUxQixJQUFJLGFBQUssQ0FBQyx3QkFBd0IsRUFBRSxFQUFFO1lBQ2xDLElBQUksbUJBQVMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxhQUFLLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLEVBQUU7b0JBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3ZCO2FBQ0o7WUFDRCxJQUFJLElBQUksR0FBUSxhQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM3QyxJQUFJLElBQUksRUFBRTtnQkFDTixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBRTFDO3FCQUFNO29CQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3RCLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ2pCO2FBQ0o7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNqQjtTQUNKO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBbkRnQixvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQW9EeEM7SUFBRCwyQkFBQztDQXBERCxBQW9EQyxDQXBEaUQsRUFBRSxDQUFDLFNBQVMsR0FvRDdEO2tCQXBEb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUmVjb21tZW5kR2FtZXNOb2RlIGZyb20gXCIuL1JlY29tbWVuZEdhbWVzTm9kZVwiO1xyXG5pbXBvcnQgeyBTdWJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb21tZW5kR2FtZXNXaWRnZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIF9yZWNvbW1lbmROb2RlOiBSZWNvbW1lbmRHYW1lc05vZGUgPSBudWxsO1xyXG4gICAgX2lzSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9yZWNvbW1lbmROb2RlID0gdGhpcy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFwiUmVjb21tZW5kR2FtZXNOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMuX3JlY29tbWVuZE5vZGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB1dGlscy5yZWdpc3RlclNlcnZlckluaXRFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRXaWRnZXQoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdXRpbHMudW5yZWdpc3RlclNlcnZlckluaXRFdmVudCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFdpZGdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbml0KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh1dGlscy5pc1Nob3dSZWNvbW1vbmRHYW1lc0xpc3QoKSkge1xyXG4gICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWxzLlRvb2xfRG91eWluLmlzU2hvd01vcmVHYW1lc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kTm9kZS5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY29tbWVuZE5vZGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIuS6pOWPieaOqOW5v+aVsOaNrumVv+W6puS4ujBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCLkuqTlj4nmjqjlub/mlbDmja7kuLpudWxsIVwiKTtcclxuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19