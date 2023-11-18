"use strict";
cc._RF.push(module, 'fe7d8OK+QlJO4RCiDkr2evw', 'BeforGameOverRecGamesPanel');
// common-plugin/Scripts/BeforGameOverRecGamesPanel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BeforGameOverRecGamesPanel = /** @class */ (function (_super) {
    __extends(BeforGameOverRecGamesPanel, _super);
    function BeforGameOverRecGamesPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._gameList = null;
        _this._originScale = 1;
        _this._gameItems = [];
        _this._jumpList = null;
        _this._dataDirty = false;
        _this._is_Horizontal = false;
        _this._closeBtnRight = null;
        _this._closeBtnLine = null;
        _this._star = null;
        _this.gameItemNode = null;
        _this._location = YZ_Constant_1.SubLocation.isMoreGame;
        return _this;
    }
    BeforGameOverRecGamesPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        if (!PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Home);
        }
        this._panel = this.node.getChildByName("Panel");
        this.node.active = false;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920;
            this._is_Horizontal = true;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        if (this._is_Horizontal) {
            this._panel.getChildByName("VGameScrollView").active = false;
            this._panel.getChildByName("VHead").active = false;
            this._gameList = this._panel.getChildByName("HGameScrollView").getComponent(cc.ScrollView).content;
            this.gameItemNode = this._gameList.children[0];
            this._gameList.removeAllChildren();
        }
        else {
            this._panel.getChildByName("HGameScrollView").active = false;
            this._panel.getChildByName("HHead").active = false;
            this._gameList = this._panel.getChildByName("VGameScrollView").getComponent(cc.ScrollView).content;
            this.gameItemNode = this._gameList.children[0];
            this._gameList.removeAllChildren();
        }
        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    };
    BeforGameOverRecGamesPanel.prototype._initWidget = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this._gameList.removeAllChildren();
            var clo = _this._is_Horizontal ? 7 : 4;
            var totalRow = Math.floor(_this._jumpList.length / clo);
            var totalClo = clo * totalRow;
            for (var i = 0; i < totalClo; i++) {
                var data = _this._jumpList[i];
                if (data && data.logo) {
                    var tempNode = cc.instantiate(_this.gameItemNode);
                    var gameItem = tempNode.getComponent("GameItem");
                    gameItem.init(data, _this._location);
                    _this._gameList.addChild(tempNode);
                }
            }
        });
    };
    BeforGameOverRecGamesPanel.prototype.update = function () {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updatePanel();
        }
    };
    BeforGameOverRecGamesPanel.prototype._updatePanel = function () {
        Utils_1.utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    };
    BeforGameOverRecGamesPanel.prototype.init = function (jumpList) {
        this._jumpList = jumpList;
        this._dataDirty = true;
    };
    BeforGameOverRecGamesPanel.prototype.show = function () {
        this.node.active = true;
    };
    BeforGameOverRecGamesPanel.prototype.hide = function () {
        var self = this;
        self.node.active = false;
        if (Utils_1.utils.rewardRecGamePanelCloseFunc) {
            Utils_1.utils.rewardRecGamePanelCloseFunc();
            Utils_1.utils.rewardRecGamePanelCloseFunc = null;
            ;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
    };
    BeforGameOverRecGamesPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    BeforGameOverRecGamesPanel = __decorate([
        ccclass
    ], BeforGameOverRecGamesPanel);
    return BeforGameOverRecGamesPanel;
}(cc.Component));
exports.default = BeforGameOverRecGamesPanel;

cc._RF.pop();