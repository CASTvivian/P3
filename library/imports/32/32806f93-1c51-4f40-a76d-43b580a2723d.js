"use strict";
cc._RF.push(module, '32806+THFFPQKdtQ7WAonI9', 'YZ_RecommendGamesBanner');
// common-plugin/Scripts/YZ_RecommendGamesBanner.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_RecommendGamesBanner = /** @class */ (function (_super) {
    __extends(YZ_RecommendGamesBanner, _super);
    function YZ_RecommendGamesBanner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._listView = null;
        _this._isInit = false;
        _this.closeBtn = null;
        return _this;
    }
    YZ_RecommendGamesBanner.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._listView = this.getComponentInChildren("YZ_ListView");
        this._listView.node.active = false;
        this.closeBtn = cc.find("bg/close", this.node);
    };
    YZ_RecommendGamesBanner.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
            _this.closeBtn.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this.node.destroy();
            });
        }, this);
    };
    YZ_RecommendGamesBanner.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
        this.closeBtn.targetOff(this);
    };
    YZ_RecommendGamesBanner.prototype._initWidget = function () {
        if (this._isInit)
            return;
        if (Utils_1.utils.isShowRecommondGamesBanner()) {
            var data = Utils_1.utils.getRecommondGameList();
            if (data) {
                if (data.length > 0) {
                    if (data.length >= 6) {
                        this._isInit = true;
                        this._listView.init(data);
                        this._listView.node.active = true;
                        Utils_1.utils.postRecommentShowData(YZ_Constant_1.SubLocation.isYzBanner);
                        if (PlatUtils_1.default.IsOPPO) {
                            Utils_1.utils.oppoTool.countYzBannerShowCount();
                            Utils_1.utils.adManager.hideKyxBanner();
                        }
                    }
                    else {
                        cc.warn("交叉推广数据长度小于6");
                    }
                }
                else {
                    cc.warn("交叉推广数据长度为0");
                }
            }
            else {
                cc.warn("交叉推广数据为null!");
            }
        }
        else {
            this.node.destroy();
        }
    };
    YZ_RecommendGamesBanner = __decorate([
        ccclass
    ], YZ_RecommendGamesBanner);
    return YZ_RecommendGamesBanner;
}(cc.Component));
exports.default = YZ_RecommendGamesBanner;

cc._RF.pop();