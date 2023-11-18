"use strict";
cc._RF.push(module, 'e31b1c0YlND25VRQ4r4cdDL', 'RecommendGamesWidget');
// common-plugin/Scripts/RecommendGamesWidget.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecommendGamesWidget = /** @class */ (function (_super) {
    __extends(RecommendGamesWidget, _super);
    function RecommendGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._recommendNode = null;
        _this._isInit = false;
        return _this;
    }
    RecommendGamesWidget.prototype.onLoad = function () {
        this._recommendNode = this.getComponentInChildren("RecommendGamesNode");
        this._recommendNode.node.active = false;
    };
    RecommendGamesWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    RecommendGamesWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    RecommendGamesWidget.prototype._initWidget = function () {
        if (this._isInit)
            return;
        var valid = true;
        if (Utils_1.utils.isShowRecommondGamesList()) {
            if (PlatUtils_1.default.IsDouyin) {
                if (!Utils_1.utils.Tool_Douyin.isShowMoreGamesModal()) {
                    this.node.destroy();
                }
            }
            var data = Utils_1.utils.getRecommondGameList();
            if (data) {
                if (data.length > 0) {
                    this._isInit = true;
                    this._recommendNode.init(data);
                    this._recommendNode.node.active = true;
                }
                else {
                    cc.warn("交叉推广数据长度为0");
                    valid = false;
                }
            }
            else {
                cc.warn("交叉推广数据为null!");
                valid = false;
            }
        }
        if (!valid) {
            this.node.destroy();
        }
    };
    RecommendGamesWidget = __decorate([
        ccclass
    ], RecommendGamesWidget);
    return RecommendGamesWidget;
}(cc.Component));
exports.default = RecommendGamesWidget;

cc._RF.pop();