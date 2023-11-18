"use strict";
cc._RF.push(module, '369d4RM2rtPj4bmcA3rMp3j', 'MoreGamesPanel');
// common-plugin/Scripts/MoreGamesPanel.ts

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
var _panelSize = [cc.size(225, 1000), cc.size(506, 1000)];
var _titleSize = [cc.size(111, 54), cc.size(275, 54)];
var _titleBgSize = [cc.size(376, 104), cc.size(545, 104)];
var _starSize = [cc.size(251, 89), cc.size(425, 89)];
var MoreGamesPanel = /** @class */ (function (_super) {
    __extends(MoreGamesPanel, _super);
    function MoreGamesPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._gameList = null;
        _this._originScale = 1;
        _this._gameItems = [];
        _this._jumpList = null;
        _this._dataDirty = false;
        _this._closeBtnRight = null;
        _this._closeBtnLine = null;
        _this._star = null;
        _this._items = [];
        _this.gameItemNode = null;
        _this._location = YZ_Constant_1.SubLocation.isMoreGame;
        return _this;
    }
    MoreGamesPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        if (!PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Home);
        }
        this._panel = this.node.getChildByName("Panel");
        this._gameList = this._panel.getChildByName("GameScrollView").getComponent(cc.ScrollView).content;
        this.gameItemNode = this._gameList.children[0];
        this._gameList.removeAllChildren();
        this.node.active = false;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    };
    MoreGamesPanel.prototype._initWidget = function () {
        this._gameList.removeAllChildren();
        var totalRow = Math.floor(this._jumpList.length / 3);
        var totalClo = 3 * totalRow;
        for (var i = 0; i < totalClo; i++) {
            var data = this._jumpList[i];
            if (data && data.logo) {
                var tempNode = cc.instantiate(this.gameItemNode);
                var qcrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = this._location;
                qcrossWidgetItem.init(data);
                this._gameList.addChild(tempNode);
            }
        }
    };
    MoreGamesPanel.prototype.update = function () {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updatePanel();
        }
    };
    MoreGamesPanel.prototype._updatePanel = function () {
        Utils_1.utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    };
    MoreGamesPanel.prototype.init = function (jumpList) {
        this._jumpList = jumpList;
        this._dataDirty = true;
    };
    MoreGamesPanel.prototype.show = function () {
        this.node.active = true;
    };
    MoreGamesPanel.prototype.hide = function () {
        var self = this;
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        self.node.active = false;
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    };
    MoreGamesPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    MoreGamesPanel = __decorate([
        ccclass
    ], MoreGamesPanel);
    return MoreGamesPanel;
}(cc.Component));
exports.default = MoreGamesPanel;

cc._RF.pop();