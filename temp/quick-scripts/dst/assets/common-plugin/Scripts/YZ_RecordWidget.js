
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_RecordWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70e24eWKbRDM7QiZpIr5ChZ', 'YZ_RecordWidget');
// common-plugin/Scripts/YZ_RecordWidget.ts

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
var YZ_RecordWidget = /** @class */ (function (_super) {
    __extends(YZ_RecordWidget, _super);
    function YZ_RecordWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._normalBtn = null;
        _this._actionBtn = null;
        _this._isRecording = false;
        _this._originScale = 1;
        return _this;
    }
    YZ_RecordWidget.prototype.onLoad = function () {
        this._panel = this.node.getChildByName("Panel");
        this._panel.active = false;
        var background = this._panel.getChildByName("Background");
        this._normalBtn = background.getChildByName("normalBtn");
        this._actionBtn = background.getChildByName("actionBtn");
        this._originScale = this._actionBtn.scale;
    };
    YZ_RecordWidget.prototype._onGameMessage = function (event) {
        switch (event.type) {
            case "YZ_RecordStart": {
                this._updateState();
                break;
            }
            case "YZ_RecordEnd": {
                this._updateState();
                break;
            }
        }
    };
    YZ_RecordWidget.prototype.onEnable = function () {
        var _this = this;
        cc.game.on("YZ_CommonMessage", this._onGameMessage, this);
        Utils_1.utils.registerServerInitEvent(function () {
            _this._panel.on(cc.Node.EventType.TOUCH_END, function (event) {
                event.stopPropagation();
                if (!Utils_1.utils.isRecording) {
                    Utils_1.utils.recordStart();
                }
                else {
                    Utils_1.utils.isSuccess = undefined;
                    if (Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.isClickEnd != undefined) {
                        Utils_1.utils.cur_tool.isClickEnd = true;
                    }
                    Utils_1.utils.recordEnd();
                }
            }, _this);
            _this._updateState();
            if (Utils_1.utils.isShowRecordWidget()) {
                _this._panel.active = true;
            }
            else {
                Utils_1.utils.showLog("不支持录屏!");
                _this.node.destroy();
            }
        }, this);
        // if (PlatUtils.IsDouyin) {
        //     utils.showLog("record onEnable");
        //     utils.Tool_Douyin.isAutoShare = true;
        // }
        if (Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.isAutoShare != undefined) {
            Utils_1.utils.cur_tool.isAutoShare = true;
        }
    };
    YZ_RecordWidget.prototype.onDisable = function () {
        cc.game.targetOff(this);
        // utils.isRecording = false;
        // this._updateState();
        // if (PlatUtils.IsDouyin) {
        //     utils.showLog("record onDisable");
        //     // utils.Tool_Douyin.isAutoShare = false;
        // }
        // utils.recordEnd();
    };
    YZ_RecordWidget.prototype._updateState = function () {
        if (Utils_1.utils.isRecording) {
            this._normalBtn.active = false;
            this._actionBtn.active = true;
            this._actionBtn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, this._originScale * 0.8), cc.scaleTo(0.3, this._originScale))));
        }
        else {
            this._normalBtn.active = true;
            this._actionBtn.stopAllActions();
            this._actionBtn.active = false;
        }
    };
    YZ_RecordWidget = __decorate([
        ccclass
    ], YZ_RecordWidget);
    return YZ_RecordWidget;
}(cc.Component));
exports.default = YZ_RecordWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfUmVjb3JkV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQTZGQztRQTNGRyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDOztJQXVGN0IsQ0FBQztJQXJGRyxnQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxVQUFVLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFFRCx3Q0FBYyxHQUFkLFVBQWUsS0FBVTtRQUNyQixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsWUFBWSxFQUFF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QUFPO09BQ2EsZUFBZSxDQTZGbkM7SUFBRCxzQkFBQztDQTdGRCxBQTZGQyxDQTdGNEMsRUFBRSxDQUFDLFNBQVMsR0E2RnhEO2tCQTdGb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9SZWNvcmRXaWRnZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfbm9ybWFsQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9hY3Rpb25CdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2lzUmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfb3JpZ2luU2NhbGU6IG51bWJlciA9IDE7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XHJcbiAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGJhY2tncm91bmQ6IGNjLk5vZGUgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5fbm9ybWFsQnRuID0gYmFja2dyb3VuZC5nZXRDaGlsZEJ5TmFtZShcIm5vcm1hbEJ0blwiKTtcclxuICAgICAgICB0aGlzLl9hY3Rpb25CdG4gPSBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYWN0aW9uQnRuXCIpO1xyXG4gICAgICAgIHRoaXMuX29yaWdpblNjYWxlID0gdGhpcy5fYWN0aW9uQnRuLnNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkdhbWVNZXNzYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIllaX1JlY29yZFN0YXJ0XCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiWVpfUmVjb3JkRW5kXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBjYy5nYW1lLm9uKFwiWVpfQ29tbW9uTWVzc2FnZVwiLCB0aGlzLl9vbkdhbWVNZXNzYWdlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZXZlbnQ6IGNjLkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdXRpbHMuaXNSZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5yZWNvcmRTdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5pc1N1Y2Nlc3MgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmN1cl90b29sICYmIHV0aWxzLmN1cl90b29sLmlzQ2xpY2tFbmQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmN1cl90b29sLmlzQ2xpY2tFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5yZWNvcmRFbmQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1Nob3dSZWNvcmRXaWRnZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuI3mlK/mjIHlvZXlsY8hXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJyZWNvcmQgb25FbmFibGVcIik7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLlRvb2xfRG91eWluLmlzQXV0b1NoYXJlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHV0aWxzLmN1cl90b29sICYmIHV0aWxzLmN1cl90b29sLmlzQXV0b1NoYXJlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB1dGlscy5jdXJfdG9vbC5pc0F1dG9TaGFyZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIHV0aWxzLmlzUmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5fdXBkYXRlU3RhdGUoKTtcclxuICAgICAgICAvLyBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLnNob3dMb2coXCJyZWNvcmQgb25EaXNhYmxlXCIpO1xyXG4gICAgICAgIC8vICAgICAvLyB1dGlscy5Ub29sX0RvdXlpbi5pc0F1dG9TaGFyZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB1dGlscy5yZWNvcmRFbmQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVN0YXRlKCkge1xyXG4gICAgICAgIGlmICh1dGlscy5pc1JlY29yZGluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbkJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25CdG4ucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIHRoaXMuX29yaWdpblNjYWxlICogMC44KSwgY2Muc2NhbGVUbygwLjMsIHRoaXMuX29yaWdpblNjYWxlKSkpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uQnRuLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbkJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19