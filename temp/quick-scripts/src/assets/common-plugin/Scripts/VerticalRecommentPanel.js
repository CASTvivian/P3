"use strict";
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