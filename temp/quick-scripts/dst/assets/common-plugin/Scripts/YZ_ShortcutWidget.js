
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_ShortcutWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8491fv6UfpAeK3G0lwwfFJo', 'YZ_ShortcutWidget');
// common-plugin/Scripts/YZ_ShortcutWidget.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_ShortcutWidget = /** @class */ (function (_super) {
    __extends(YZ_ShortcutWidget, _super);
    function YZ_ShortcutWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._handImg = null;
        _this._callback = null;
        return _this;
    }
    Object.defineProperty(YZ_ShortcutWidget.prototype, "Callback", {
        set: function (value) {
            this._callback = value;
        },
        enumerable: false,
        configurable: true
    });
    YZ_ShortcutWidget.prototype.onLoad = function () {
        this._panel = this.node.getChildByName("Panel");
        this._panel.active = false;
        this._handImg = cc.find("Panel/handImg", this.node);
        this._handImg.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, CompatibleTool_1.default.position(0, -50)), cc.moveBy(0.5, CompatibleTool_1.default.position(0, 50)))));
    };
    YZ_ShortcutWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            if (!Utils_1.utils.isShowCreateShortcutWidget()) {
                _this.node.destroy();
            }
            else {
                _this._panel.active = true;
            }
        }, this);
    };
    YZ_ShortcutWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    YZ_ShortcutWidget.prototype.onBtnClickHandler = function (event, data) {
        var _this = this;
        switch (event.target.name) {
            case "Btn_Shortcut": {
                if (Utils_1.utils.canCreateShortcut()) {
                    Utils_1.utils.createShortcut(function (ret) {
                        if (ret) {
                            Utils_1.utils.showLog("快捷方式创建成功！");
                            if (_this._callback) {
                                _this._callback(true);
                            }
                        }
                        else {
                            Utils_1.utils.showLog("快捷方式创建失败！");
                            if (_this._callback) {
                                _this._callback(false);
                            }
                        }
                    });
                }
                break;
            }
        }
    };
    YZ_ShortcutWidget = __decorate([
        ccclass
    ], YZ_ShortcutWidget);
    return YZ_ShortcutWidget;
}(cc.Component));
exports.default = YZ_ShortcutWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfU2hvcnRjdXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQXNEQztRQXBERyxZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZUFBUyxHQUFhLElBQUksQ0FBQzs7SUFrRC9CLENBQUM7SUFqREcsc0JBQVcsdUNBQVE7YUFBbkIsVUFBb0IsS0FBZTtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELGtDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsd0JBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSx3QkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1SixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQVNDO1FBUEcsYUFBSyxDQUFDLHVCQUF1QixDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFLLENBQUMsMEJBQTBCLEVBQUUsRUFBRTtnQkFDckMsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDN0I7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNJLGFBQUssQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNkNBQWlCLEdBQWpCLFVBQWtCLEtBQVUsRUFBRSxJQUFTO1FBQXZDLGlCQXFCQztRQXBCRyxRQUFRLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLEtBQUssY0FBYyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksYUFBSyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7b0JBQzNCLGFBQUssQ0FBQyxjQUFjLENBQUMsVUFBQyxHQUFHO3dCQUNyQixJQUFJLEdBQUcsRUFBRTs0QkFDTCxhQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMzQixJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7Z0NBQ2hCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ3hCO3lCQUNKOzZCQUFNOzRCQUNILGFBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQzNCLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTtnQ0FDaEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDekI7eUJBQ0o7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsTUFBTTthQUNUO1NBQ0o7SUFDTCxDQUFDO0lBcERnQixpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQXNEckM7SUFBRCx3QkFBQztDQXRERCxBQXNEQyxDQXREOEMsRUFBRSxDQUFDLFNBQVMsR0FzRDFEO2tCQXREb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9TaG9ydGN1dFdpZGdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgX3BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9oYW5kSW1nOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHVibGljIHNldCBDYWxsYmFjayh2YWx1ZTogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuX3BhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2hhbmRJbWcgPSBjYy5maW5kKFwiUGFuZWwvaGFuZEltZ1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX2hhbmRJbWcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuNSwgQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oMCwgLTUwKSksIGNjLm1vdmVCeSgwLjUsIENvbXBhdGlibGVUb29sLnBvc2l0aW9uKDAsIDUwKSkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgICAgIHV0aWxzLnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1Nob3dDcmVhdGVTaG9ydGN1dFdpZGdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB1dGlscy51bnJlZ2lzdGVyU2VydmVySW5pdEV2ZW50KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuQ2xpY2tIYW5kbGVyKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0Lm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkJ0bl9TaG9ydGN1dFwiOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuY2FuQ3JlYXRlU2hvcnRjdXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmNyZWF0ZVNob3J0Y3V0KChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW/q+aNt+aWueW8j+WIm+W7uuaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW/q+aNt+aWueW8j+WIm+W7uuWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==