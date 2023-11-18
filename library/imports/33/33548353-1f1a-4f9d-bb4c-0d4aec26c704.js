"use strict";
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