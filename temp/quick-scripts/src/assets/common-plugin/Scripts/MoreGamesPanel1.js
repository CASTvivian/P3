"use strict";
cc._RF.push(module, '92ac1akrqlDIJvoROkqJAWr', 'MoreGamesPanel1');
// common-plugin/Scripts/MoreGamesPanel1.ts

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
var GameItem_1 = require("./GameItem");
var YZ_Constant_1 = require("./YZ_Constant");
var Utils_1 = require("./Utils");
var List_1 = require("./List");
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
        _this._title = null;
        _this._titleBg = null;
        _this._star = null;
        _this.gameItemNode = null;
        _this.listView = null;
        _this.autoScorll = false;
        return _this;
    }
    MoreGamesPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");
        this.listView = this._panel.getChildByName("GameList").getComponent(List_1.default);
        // this._gameList = this._panel.getChildByName("GameList").getComponent(cc.ScrollView).content;
        // this.gameItemNode = this._gameList.children[0];
        // this._gameList.removeAllChildren();
        this._closeBtnRight = this._panel.getChildByName("Btn_Close");
        this._closeBtnRight.active = true;
        this._closeBtnLine = this._panel.getChildByName("Btn_CloseSide");
        this._closeBtnLine.active = false;
        this._titleBg = cc.find("Title/TitleBg", this._panel);
        this._title = cc.find("Title/Txt", this._panel);
        this._star = cc.find("Title/Star", this._panel);
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
    MoreGamesPanel.prototype.update = function (dt) {
        if (this.autoScorll && !this.listView.scrollView.isScrolling()) {
            this.listView.content.y += dt * 100;
            this.listView._onScrolling();
        }
    };
    MoreGamesPanel.prototype.onListRender = function (item, idx) {
        var qcrossWidgetItem = item.getComponent(GameItem_1.default);
        qcrossWidgetItem.init(this._jumpList[idx], YZ_Constant_1.SubLocation.isMoreGame);
    };
    MoreGamesPanel.prototype._initWidget = function () {
        var _this = this;
        if (this._jumpList.length > 5) {
            if (Utils_1.utils.ServerConfig.more_game_pannel_auto_scroll && Utils_1.utils.ServerConfig.more_game_pannel_auto_scroll == "false") {
                Utils_1.utils.showLog("服务器不开启自动滚动！");
            }
            else {
                this.scheduleOnce(function () {
                    _this.autoScorll = true;
                }, 1);
            }
        }
        Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isMoreGame);
    };
    MoreGamesPanel.prototype.init = function (jumpList) {
        this._jumpList = jumpList;
        this._dataDirty = true;
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
            this.listView.numItems = this._jumpList.length;
        }
        else {
            cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
            this.node.destroy();
        }
    };
    MoreGamesPanel.prototype.show = function () {
        this.node.active = true;
        // this._panel.x = -this._panel.getContentSize().width;
        this._panel.y = 0;
        this._panel.runAction(cc.moveBy(0.3, cc.v2(this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()));
    };
    MoreGamesPanel.prototype.hide = function () {
        var self = this;
        this._panel.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(function () {
            self.node.active = false;
        })));
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