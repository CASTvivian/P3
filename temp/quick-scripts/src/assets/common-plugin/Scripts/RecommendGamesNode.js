"use strict";
cc._RF.push(module, 'b12f97J/i9PlqiR38XzTuyP', 'RecommendGamesNode');
// common-plugin/Scripts/RecommendGamesNode.ts

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
var RecommendGamesNode = /** @class */ (function (_super) {
    __extends(RecommendGamesNode, _super);
    function RecommendGamesNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.prefab1 = null;
        _this.moreGamesPanel = null;
        _this._pageView = null;
        _this._content = null;
        _this._gamePageNode = null;
        _this._dataDirty = false;
        _this._isContentFilled = false;
        _this._scrollInterval = 3;
        _this._timeTmp = 0;
        _this._gameList = null;
        _this.moreGame = null;
        return _this;
    }
    RecommendGamesNode.prototype.onLoad = function () {
        var pageViewNode = this.node.getChildByName("PageView");
        this.moreGame = cc.find("bg/BtnMore", this.node);
        this._pageView = pageViewNode.getComponent(cc.PageView);
        this._content = this._pageView.content;
        this._gamePageNode = this._content.getChildByName("GamePage");
        this._content.removeAllChildren();
    };
    RecommendGamesNode.prototype.init = function (data) {
        this._gameList = data;
        if (this._gameList && this._gameList.length > 0) {
            this._dataDirty = true;
        }
        else {
            this.node.active = false;
        }
    };
    RecommendGamesNode.prototype.onEnable = function () {
        var self = this;
        this.moreGame.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (PlatUtils_1.default.IsDouyin) {
                Utils_1.utils.Tool_Douyin.showMoreGamesModal();
            }
            else if (!PlatUtils_1.default.IsOPPO || (Utils_1.utils.ServerConfig.recommend_bar_show_pannel && Utils_1.utils.ServerConfig.recommend_bar_show_pannel == "true")) {
                var panel = void 0;
                if (Utils_1.utils.ServerConfig.more_game_skin == 2) {
                    panel = cc.instantiate(self.prefab1);
                    panel.zIndex = 999;
                    self.moreGamesPanel = panel.getComponent("MoreGamesPanel1");
                }
                else {
                    panel = cc.instantiate(self.prefab);
                    panel.zIndex = 999;
                    self.moreGamesPanel = panel.getComponent("MoreGamesPanel");
                }
                cc.director.getScene().addChild(panel);
                self.moreGamesPanel._location = YZ_Constant_1.SubLocation.isScrollbar;
                self.moreGamesPanel.init(self._gameList);
                self.moreGamesPanel.show();
            }
            else {
                Utils_1.utils.showLog("服务器未配置显示更多游戏面板！");
            }
        });
    };
    RecommendGamesNode.prototype.onDisable = function () {
        this.moreGame.targetOff(this);
    };
    RecommendGamesNode.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    };
    RecommendGamesNode.prototype._updateContent = function () {
        if (this._gameList) {
            Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isScrollbar);
            var length = Math.floor(this._gameList.length / 4);
            var index = 0;
            for (var i = 0; i < length; i++) {
                var gamePageList = [];
                for (var j = 0; j < 4; j++) {
                    gamePageList.push(this._gameList[index]);
                    index++;
                }
                var gamePageNode = cc.instantiate(this._gamePageNode);
                var gamePage = gamePageNode.getComponent("GamePage");
                gamePage.init(gamePageList);
                this._pageView.addPage(gamePageNode);
            }
            this._gamePageNode.destroy();
            this._isContentFilled = true;
            this.autoRefrshPageView();
        }
    };
    RecommendGamesNode.prototype.autoRefrshPageView = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        var interval = 3.5;
        this.schedule(function () {
            var count = _this._pageView.getPages().length;
            var index = _this._pageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            if (index == 0) {
                _this._pageView.scrollToPage(index, 0);
            }
            else {
                _this._pageView.scrollToPage(index, 2.5);
            }
        }, interval); //10秒一换
    };
    __decorate([
        property(cc.Prefab)
    ], RecommendGamesNode.prototype, "prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], RecommendGamesNode.prototype, "prefab1", void 0);
    RecommendGamesNode = __decorate([
        ccclass
    ], RecommendGamesNode);
    return RecommendGamesNode;
}(cc.Component));
exports.default = RecommendGamesNode;

cc._RF.pop();