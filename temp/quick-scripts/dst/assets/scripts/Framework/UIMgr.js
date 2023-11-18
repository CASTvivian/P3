
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/UIMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33548NTHxpPnbtMDUrsJscE', 'UIMgr');
// scripts/Framework/UIMgr.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("./Constant");
var UILoadingPage_1 = require("../UI/UILoadingPage");
var UIHomePage_1 = require("../UI/UIHomePage");
var UIGamePage_1 = require("../UI/UIGamePage");
var UIRevivePanel_1 = require("../UI/UIRevivePanel");
var UIGameLoadingPage_1 = require("../UI/UIGameLoadingPage");
var UIPausePanel_1 = require("../UI/UIPausePanel");
var UITurntablePage_1 = require("../UI/UITurntablePage");
var UITrySkinPanel_1 = require("../UI/UITrySkinPanel");
var UIWeaponLevelPanel_1 = require("../UI/UIWeaponLevelPanel");
var UIUpgradePanel_1 = require("../UI/UIUpgradePanel");
var UIOverPage_1 = require("../UI/UIOverPage");
var UISignPage_1 = require("../UI/UISignPage");
var UITimePage_1 = require("../UI/UITimePage");
/**
 * UI管理类
 * 新增页面或者弹窗需要修改
 */
var UIMgr = /** @class */ (function (_super) {
    __extends(UIMgr, _super);
    function UIMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._pageDict = {};
        _this._panelDict = {};
        return _this;
    }
    Object.defineProperty(UIMgr, "inst", {
        get: function () {
            if (!UIMgr._inst) {
                UIMgr._inst = new UIMgr();
            }
            return UIMgr._inst;
        },
        enumerable: false,
        configurable: true
    });
    UIMgr.prototype.openPage = function (name) {
        // 防止连续多次点击页面
        if (this._panelDict[name] && this._panelDict[name].isOpen())
            return;
        // 关闭所有的弹窗
        this.closeAllPanel();
        // 关闭所有的页面
        this.closeAllPage();
        // 开启界面
        if (this._pageDict[name] && this._pageDict[name].isValid()) {
            this._pageDict[name].open();
        }
        else {
            var page = this._createUI(name);
            if (page) {
                this._pageDict[name] = page;
                page.isValid() && page.open();
            }
        }
    };
    UIMgr.prototype.openPanel = function (name) {
        // 防止连续多次点击页面
        if (this._panelDict[name] && this._panelDict[name].isOpen())
            return;
        // 开启弹窗
        if (this._panelDict[name] && this._panelDict[name].isValid()) {
            this._panelDict[name].open();
        }
        else {
            var panel = this._createUI(name);
            if (panel) {
                this._panelDict[name] = panel;
                panel.isValid() && panel.open();
            }
        }
    };
    UIMgr.prototype.closeAllPage = function () {
        // 关闭所有的页面
        for (var key in this._pageDict) {
            if (key && this._pageDict[key]) {
                this._pageDict[key].close();
            }
        }
    };
    UIMgr.prototype.closeAllPanel = function () {
        for (var key in this._panelDict) {
            if (key && this._panelDict[key]) {
                this._panelDict[key].close();
            }
        }
    };
    UIMgr.prototype.closePanel = function (name) {
        if (this._panelDict[name] && this._panelDict[name].isValid()) {
            this._panelDict[name].close();
        }
    };
    UIMgr.prototype._createUI = function (name) {
        switch (name) {
            case Constant_1.PageName.UILoadingPage: {
                return new UILoadingPage_1.default();
            }
            case Constant_1.PageName.UIHomePage: {
                return new UIHomePage_1.default();
            }
            case Constant_1.PanelName.UISignPanel: {
                return new UISignPage_1.default();
            }
            case Constant_1.PanelName.UITurntablePanel: {
                return new UITurntablePage_1.default();
            }
            case Constant_1.PanelName.UITimePanel: {
                return new UITimePage_1.default();
            }
            case Constant_1.PanelName.UITrySkinPanel: {
                return new UITrySkinPanel_1.default();
            }
            case Constant_1.PanelName.UIWeaponLevelPanel: {
                return new UIWeaponLevelPanel_1.default();
            }
            case Constant_1.PageName.UIGameLoadingPage: {
                return new UIGameLoadingPage_1.default();
            }
            case Constant_1.PageName.UIGamePage: {
                return new UIGamePage_1.default();
            }
            case Constant_1.PanelName.UIPausePanel: {
                return new UIPausePanel_1.default();
            }
            case Constant_1.PanelName.UIUpgradePanel: {
                return new UIUpgradePanel_1.default();
            }
            case Constant_1.PanelName.UIRevivePanel: {
                return new UIRevivePanel_1.default();
            }
            case Constant_1.PageName.UIOverPage: {
                return new UIOverPage_1.default();
            }
            default: {
                cc.error("Can not found class " + name);
                return null;
            }
        }
    };
    return UIMgr;
}(cc.Component));
exports.default = UIMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxVSU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBaUQ7QUFFakQscURBQWdEO0FBQ2hELCtDQUEwQztBQUMxQywrQ0FBMEM7QUFDMUMscURBQWdEO0FBQ2hELDZEQUF3RDtBQUN4RCxtREFBOEM7QUFDOUMseURBQXFEO0FBQ3JELHVEQUFrRDtBQUNsRCwrREFBMEQ7QUFDMUQsdURBQWtEO0FBQ2xELCtDQUEwQztBQUMxQywrQ0FBMkM7QUFDM0MsK0NBQTJDO0FBSTNDOzs7R0FHRztBQUVIO0lBQW1DLHlCQUFZO0lBQS9DO1FBQUEscUVBb0hDO1FBM0dXLGVBQVMsR0FBK0IsRUFBRSxDQUFDO1FBQzNDLGdCQUFVLEdBQStCLEVBQUUsQ0FBQzs7SUEwR3hELENBQUM7SUFsSEcsc0JBQWtCLGFBQUk7YUFBdEI7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDZCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7YUFDN0I7WUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFLTSx3QkFBUSxHQUFmLFVBQWdCLElBQVk7UUFDeEIsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU87UUFDcEUsVUFBVTtRQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixVQUFVO1FBQ1YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLE9BQU87UUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZ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RSxDQUFDO2FBQzVCO1lBQ0QsS0FBSyxvQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLElBQUksd0JBQWMsRUFBRSxDQUFDO2FBQy9CO1lBQ0QsS0FBSyxvQkFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSw0QkFBa0IsRUFBRSxDQUFDO2FBQ25DO1lBQ0QsS0FBSyxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSwyQkFBaUIsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsS0FBSyxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLElBQUksb0JBQVUsRUFBRSxDQUFDO2FBQzNCO1lBQ0QsS0FBSyxvQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QixPQUFPLElBQUksc0JBQVksRUFBRSxDQUFDO2FBQzdCO1lBQ0QsS0FBSyxvQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLElBQUksd0JBQWMsRUFBRSxDQUFDO2FBQy9CO1lBQ0QsS0FBSyxvQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLElBQUksdUJBQWEsRUFBRSxDQUFDO2FBQzlCO1lBQ0QsS0FBSyxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLElBQUksb0JBQVUsRUFBRSxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO0lBQ0wsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQXBIQSxBQW9IQyxDQXBIa0MsRUFBRSxDQUFDLFNBQVMsR0FvSDlDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZU5hbWUsIFBhbmVsTmFtZSB9IGZyb20gXCIuL0NvbnN0YW50XCI7XHJcbmltcG9ydCBVSVBhZ2UgZnJvbSBcIi4vVUlQYWdlXCI7XHJcbmltcG9ydCBVSUxvYWRpbmdQYWdlIGZyb20gXCIuLi9VSS9VSUxvYWRpbmdQYWdlXCI7XHJcbmltcG9ydCBVSUhvbWVQYWdlIGZyb20gXCIuLi9VSS9VSUhvbWVQYWdlXCI7XHJcbmltcG9ydCBVSUdhbWVQYWdlIGZyb20gXCIuLi9VSS9VSUdhbWVQYWdlXCI7XHJcbmltcG9ydCBVSVJldml2ZVBhbmVsIGZyb20gXCIuLi9VSS9VSVJldml2ZVBhbmVsXCI7XHJcbmltcG9ydCBVSUdhbWVMb2FkaW5nUGFnZSBmcm9tIFwiLi4vVUkvVUlHYW1lTG9hZGluZ1BhZ2VcIjtcclxuaW1wb3J0IFVJUGF1c2VQYW5lbCBmcm9tIFwiLi4vVUkvVUlQYXVzZVBhbmVsXCI7XHJcbmltcG9ydCBVSVR1cm50YWJsZVBhbmVsIGZyb20gXCIuLi9VSS9VSVR1cm50YWJsZVBhZ2VcIjtcclxuaW1wb3J0IFVJVHJ5U2tpblBhbmVsIGZyb20gXCIuLi9VSS9VSVRyeVNraW5QYW5lbFwiO1xyXG5pbXBvcnQgVUlXZWFwb25MZXZlbFBhbmVsIGZyb20gXCIuLi9VSS9VSVdlYXBvbkxldmVsUGFuZWxcIjtcclxuaW1wb3J0IFVJVXBncmFkZVBhbmVsIGZyb20gXCIuLi9VSS9VSVVwZ3JhZGVQYW5lbFwiO1xyXG5pbXBvcnQgVUlPdmVyUGFnZSBmcm9tIFwiLi4vVUkvVUlPdmVyUGFnZVwiO1xyXG5pbXBvcnQgVUlTaWduUGFuZWwgZnJvbSBcIi4uL1VJL1VJU2lnblBhZ2VcIjtcclxuaW1wb3J0IFVJVGltZVBhbmVsIGZyb20gXCIuLi9VSS9VSVRpbWVQYWdlXCI7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBVSeeuoeeQhuexu1xyXG4gKiDmlrDlop7pobXpnaLmiJbogIXlvLnnqpfpnIDopoHkv67mlLlcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1nciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdDogVUlNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0KCk6IFVJTWdyIHtcclxuICAgICAgICBpZiAoIVVJTWdyLl9pbnN0KSB7XHJcbiAgICAgICAgICAgIFVJTWdyLl9pbnN0ID0gbmV3IFVJTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBVSU1nci5faW5zdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYWdlRGljdDogeyBbbmFtZTogc3RyaW5nXTogVUlQYWdlIH0gPSB7fTtcclxuICAgIHByaXZhdGUgX3BhbmVsRGljdDogeyBbbmFtZTogc3RyaW5nXTogVUlQYWdlIH0gPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgb3BlblBhZ2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8g6Ziy5q2i6L+e57ut5aSa5qyh54K55Ye76aG16Z2iXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhbmVsRGljdFtuYW1lXSAmJiB0aGlzLl9wYW5lbERpY3RbbmFtZV0uaXNPcGVuKCkpIHJldHVybjtcclxuICAgICAgICAvLyDlhbPpl63miYDmnInnmoTlvLnnqpdcclxuICAgICAgICB0aGlzLmNsb3NlQWxsUGFuZWwoKTtcclxuICAgICAgICAvLyDlhbPpl63miYDmnInnmoTpobXpnaJcclxuICAgICAgICB0aGlzLmNsb3NlQWxsUGFnZSgpO1xyXG4gICAgICAgIC8vIOW8gOWQr+eVjOmdolxyXG4gICAgICAgIGlmICh0aGlzLl9wYWdlRGljdFtuYW1lXSAmJiB0aGlzLl9wYWdlRGljdFtuYW1lXS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFnZURpY3RbbmFtZV0ub3BlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlOiBVSVBhZ2UgPSB0aGlzLl9jcmVhdGVVSShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKHBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VEaWN0W25hbWVdID0gcGFnZTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuaXNWYWxpZCgpICYmIHBhZ2Uub3BlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuUGFuZWwobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8g6Ziy5q2i6L+e57ut5aSa5qyh54K55Ye76aG16Z2iXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhbmVsRGljdFtuYW1lXSAmJiB0aGlzLl9wYW5lbERpY3RbbmFtZV0uaXNPcGVuKCkpIHJldHVybjtcclxuICAgICAgICAvLyDlvIDlkK/lvLnnqpdcclxuICAgICAgICBpZiAodGhpcy5fcGFuZWxEaWN0W25hbWVdICYmIHRoaXMuX3BhbmVsRGljdFtuYW1lXS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWxEaWN0W25hbWVdLm9wZW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWw6IFVJUGFnZSA9IHRoaXMuX2NyZWF0ZVVJKG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAocGFuZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsRGljdFtuYW1lXSA9IHBhbmVsO1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuaXNWYWxpZCgpICYmIHBhbmVsLm9wZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VBbGxQYWdlKCkge1xyXG4gICAgICAgIC8vIOWFs+mXreaJgOacieeahOmhtemdolxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9wYWdlRGljdCkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ICYmIHRoaXMuX3BhZ2VEaWN0W2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VEaWN0W2tleV0uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VBbGxQYW5lbCgpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fcGFuZWxEaWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgJiYgdGhpcy5fcGFuZWxEaWN0W2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsRGljdFtrZXldLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlUGFuZWwobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhbmVsRGljdFtuYW1lXSAmJiB0aGlzLl9wYW5lbERpY3RbbmFtZV0uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsRGljdFtuYW1lXS5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2NyZWF0ZVVJKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBhZ2VOYW1lLlVJTG9hZGluZ1BhZ2U6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlMb2FkaW5nUGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUGFnZU5hbWUuVUlIb21lUGFnZToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSUhvbWVQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBQYW5lbE5hbWUuVUlTaWduUGFuZWw6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlTaWduUGFuZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFBhbmVsTmFtZS5VSVR1cm50YWJsZVBhbmVsOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVJVHVybnRhYmxlUGFuZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFBhbmVsTmFtZS5VSVRpbWVQYW5lbDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSVRpbWVQYW5lbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUGFuZWxOYW1lLlVJVHJ5U2tpblBhbmVsOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVJVHJ5U2tpblBhbmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBQYW5lbE5hbWUuVUlXZWFwb25MZXZlbFBhbmVsOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVJV2VhcG9uTGV2ZWxQYW5lbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUGFnZU5hbWUuVUlHYW1lTG9hZGluZ1BhZ2U6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlHYW1lTG9hZGluZ1BhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFBhZ2VOYW1lLlVJR2FtZVBhZ2U6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlHYW1lUGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUGFuZWxOYW1lLlVJUGF1c2VQYW5lbDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSVBhdXNlUGFuZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFBhbmVsTmFtZS5VSVVwZ3JhZGVQYW5lbDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSVVwZ3JhZGVQYW5lbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUGFuZWxOYW1lLlVJUmV2aXZlUGFuZWw6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlSZXZpdmVQYW5lbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUGFnZU5hbWUuVUlPdmVyUGFnZToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSU92ZXJQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJDYW4gbm90IGZvdW5kIGNsYXNzIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==