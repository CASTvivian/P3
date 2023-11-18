
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/VerticalRecommentPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9374miWaFPkomPvJdFnlTk', 'VerticalRecommentPanel');
// common-plugin/Scripts/VerticalRecommentPanel.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VerticalRecommentPanel = /** @class */ (function (_super) {
    __extends(VerticalRecommentPanel, _super);
    function VerticalRecommentPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._recommendNode = null;
        _this._isInit = false;
        _this._gameList = [];
        _this._data = null;
        _this._curIndex = 0;
        return _this;
    }
    VerticalRecommentPanel_1 = VerticalRecommentPanel;
    VerticalRecommentPanel.prototype.onLoad = function () {
        this._recommendNode = cc.find("Panel/RecommendGamesNode", this.node);
        this._recommendNode.active = false;
        for (var i = 0; i < this._recommendNode.childrenCount; i++) {
            var gameItem = this._recommendNode.children[i].getComponent("GameItem");
            this._gameList.push(gameItem);
        }
    };
    VerticalRecommentPanel.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    VerticalRecommentPanel.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    VerticalRecommentPanel.prototype._initWidget = function () {
        if (this._isInit)
            return;
        var valid = true;
        if (Utils_1.utils.isVerticalRecommentPanel()) {
            if (PlatUtils_1.default.IsDouyin) {
                if (!Utils_1.utils.Tool_Douyin.isShowMoreGamesModal()) {
                    this.node.destroy();
                }
            }
            this._data = Utils_1.utils.getRecommondGameList();
            if (this.node.parent.getComponentsInChildren(VerticalRecommentPanel_1).length > 1) {
                var temp = [];
                for (var i = this._data.length - 1; i >= 0; i--) {
                    temp.push(this._data[i]);
                }
                this._data = temp;
            }
            if (this._data) {
                if (this._data.length > 0) {
                    this._isInit = true;
                    this._initData();
                    this._recommendNode.active = true;
                    this.schedule(this._initData, 3);
                }
                else {
                    console.warn("交叉推广数据长度为0");
                    valid = false;
                }
            }
            else {
                console.warn("交叉推广数据为null!");
                valid = false;
            }
        }
        if (!valid) {
            this.node.destroy();
        }
    };
    VerticalRecommentPanel.prototype._initData = function () {
        var _this = this;
        this._gameList.forEach(function (gameItem) {
            if (_this._curIndex > _this._data.length - 1) {
                _this._curIndex = 0;
            }
            gameItem.init(_this._data[_this._curIndex], YZ_Constant_1.SubLocation.isVerticalPanel);
            var duration = 0.03;
            if (CompatibleTool_1.default.engineVersion >= 220) {
                // let action = cc.repeat(cc.sequence(cc.rotateTo(duration, 85), cc.rotateTo(duration, 90), cc.rotateTo(duration, 95), cc.rotateTo(duration, 90)), 5);
                // gameItem.node.runAction(action);
                //@ts-ignore
                cc.tween(gameItem.node)
                    //@ts-ignore
                    .repeat(5, cc.tween()
                    .to(duration, { angle: 85 })
                    .to(duration, { angle: 90 })
                    .to(duration, { angle: 95 })
                    .to(duration, { angle: 90 }))
                    .start();
            }
            else {
                var action = cc.repeat(cc.sequence(cc.rotateTo(duration, -85), cc.rotateTo(duration, -90), cc.rotateTo(duration, -95), cc.rotateTo(duration, -90)), 5);
                gameItem.node.runAction(action);
            }
            _this._curIndex++;
        });
    };
    var VerticalRecommentPanel_1;
    VerticalRecommentPanel = VerticalRecommentPanel_1 = __decorate([
        ccclass
    ], VerticalRecommentPanel);
    return VerticalRecommentPanel;
}(cc.Component));
exports.default = VerticalRecommentPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcVmVydGljYWxSZWNvbW1lbnRQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFFaEMsNkNBQTRDO0FBQzVDLHlDQUFvQztBQUVwQyxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0QsMENBQVk7SUFBaEU7UUFBQSxxRUFnR0M7UUE5Rkcsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUNoQyxXQUFLLEdBQVEsSUFBSSxDQUFDO1FBK0RsQixlQUFTLEdBQVcsQ0FBQyxDQUFDOztJQTRCMUIsQ0FBQzsrQkFoR29CLHNCQUFzQjtJQU92Qyx1Q0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hELElBQUksUUFBUSxHQUFhLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQUEsaUJBSUM7UUFIRyxhQUFLLENBQUMsdUJB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RUFBRSxDQUFDLEtBQUssRUFBRTtxQkFDaEIsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztxQkFDM0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztxQkFDM0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztxQkFDM0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUMvQjtxQkFDQSxLQUFLLEVBQUUsQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2SixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQztZQUNELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBL0ZnQixzQkFBc0I7UUFEMUMsT0FBTztPQUNhLHNCQUFzQixDQWdHMUM7SUFBRCw2QkFBQztDQWhHRCxBQWdHQyxDQWhHbUQsRUFBRSxDQUFDLFNBQVMsR0FnRy9EO2tCQWhHb0Isc0JBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUmVjb21tZW5kR2FtZXNOb2RlIGZyb20gXCIuL1JlY29tbWVuZEdhbWVzTm9kZVwiO1xyXG5pbXBvcnQgeyBTdWJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCBHYW1lSXRlbSBmcm9tIFwiLi9HYW1lSXRlbVwiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJ0aWNhbFJlY29tbWVudFBhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBfcmVjb21tZW5kTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfaXNJbml0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfZ2FtZUxpc3Q6IEFycmF5PEdhbWVJdGVtPiA9IFtdO1xyXG4gICAgX2RhdGE6IGFueSA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX3JlY29tbWVuZE5vZGUgPSBjYy5maW5kKFwiUGFuZWwvUmVjb21tZW5kR2FtZXNOb2RlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5fcmVjb21tZW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9yZWNvbW1lbmROb2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZ2FtZUl0ZW06IEdhbWVJdGVtID0gdGhpcy5fcmVjb21tZW5kTm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoXCJHYW1lSXRlbVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2FtZUxpc3QucHVzaChnYW1lSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdFdpZGdldCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB1dGlscy51bnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0V2lkZ2V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0luaXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBpZiAodXRpbHMuaXNWZXJ0aWNhbFJlY29tbWVudFBhbmVsKCkpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF1dGlscy5Ub29sX0RvdXlpbi5pc1Nob3dNb3JlR2FtZXNNb2RhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gdXRpbHMuZ2V0UmVjb21tb25kR2FtZUxpc3QoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oVmVydGljYWxSZWNvbW1lbnRQYW5lbCkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBbXVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX2RhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wLnB1c2godGhpcy5fZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0luaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb21tZW5kTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5faW5pdERhdGEsIDMpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuS6pOWPieaOqOW5v+aVsOaNrumVv+W6puS4ujBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuS6pOWPieaOqOW5v+aVsOaNruS4um51bGwhXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgX2N1ckluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgX2luaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVMaXN0LmZvckVhY2goZ2FtZUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VySW5kZXggPiB0aGlzLl9kYXRhLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnYW1lSXRlbS5pbml0KHRoaXMuX2RhdGFbdGhpcy5fY3VySW5kZXhdLCBTdWJMb2NhdGlvbi5pc1ZlcnRpY2FsUGFuZWwpO1xyXG4gICAgICAgICAgICBsZXQgZHVyYXRpb24gPSAwLjAzO1xyXG4gICAgICAgICAgICBpZiAoQ29tcGF0aWJsZVRvb2wuZW5naW5lVmVyc2lvbiA+PSAyMjApIHtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBhY3Rpb24gPSBjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2Mucm90YXRlVG8oZHVyYXRpb24sIDg1KSwgY2Mucm90YXRlVG8oZHVyYXRpb24sIDkwKSwgY2Mucm90YXRlVG8oZHVyYXRpb24sIDk1KSwgY2Mucm90YXRlVG8oZHVyYXRpb24sIDkwKSksIDUpO1xyXG4gICAgICAgICAgICAgICAgLy8gZ2FtZUl0ZW0ubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oZ2FtZUl0ZW0ubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAucmVwZWF0KDUsIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGR1cmF0aW9uLCB7IGFuZ2xlOiA4NSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oZHVyYXRpb24sIHsgYW5nbGU6IDkwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50byhkdXJhdGlvbiwgeyBhbmdsZTogOTUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGR1cmF0aW9uLCB7IGFuZ2xlOiA5MCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2Mucm90YXRlVG8oZHVyYXRpb24sIC04NSksIGNjLnJvdGF0ZVRvKGR1cmF0aW9uLCAtOTApLCBjYy5yb3RhdGVUbyhkdXJhdGlvbiwgLTk1KSwgY2Mucm90YXRlVG8oZHVyYXRpb24sIC05MCkpLCA1KTtcclxuICAgICAgICAgICAgICAgIGdhbWVJdGVtLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY3VySW5kZXgrKztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=