"use strict";
cc._RF.push(module, '455abMBsJVHMI9HxToE4F67', 'MoreGamesWidget');
// common-plugin/Scripts/MoreGamesWidget.ts

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
var AldUtils_1 = require("./AldUtils");
var CompatibleTool_1 = require("./CompatibleTool");
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreGamesWidget = /** @class */ (function (_super) {
    __extends(MoreGamesWidget, _super);
    function MoreGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.prefab1 = null;
        _this.btnMoreGames = null;
        _this.moreGamesPanel = null;
        return _this;
    }
    MoreGamesWidget.prototype.onLoad = function () {
        var _this = this;
        this.btnMoreGames = this.node.getChildByName("Btn_MoreGames");
        this.btnMoreGames.active = false;
        var self = this;
        var back = this.btnMoreGames.getChildByName("Background").getComponent(cc.Sprite);
        var backUrl;
        if (Utils_1.utils.ServerConfig) {
            backUrl = Utils_1.utils.ServerConfig.more_game_icon;
        }
        else {
            cc.warn("没有服务器配置");
        }
        if (backUrl && !this.bgTexture) {
            CompatibleTool_1.default.LoadRes(backUrl, function (err, texture) {
                if (!err && cc.isValid(_this) && back.node) {
                    var size = back.node.getContentSize();
                    self.bgTexture = new cc.SpriteFrame(texture);
                    back.spriteFrame = self.bgTexture;
                    back.node.setContentSize(size);
                }
            });
        }
    };
    MoreGamesWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._setBtnVisible();
        }, this);
    };
    MoreGamesWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    MoreGamesWidget.prototype._setBtnVisible = function () {
        var valid = true;
        if (Utils_1.utils.isShowMoreGamesWidget()) {
            if (PlatUtils_1.default.IsQQ) {
                this.btnMoreGames.active = true;
            }
            else if (PlatUtils_1.default.Is4399) {
                this.btnMoreGames.active = true;
            }
            else if (PlatUtils_1.default.IsNativeAndroid && Utils_1.utils.Tool_Native && Utils_1.utils.config.nativeAndroidConfig.channel == "oppo") {
                this.btnMoreGames.active = true;
            }
            else if (Utils_1.utils.ServerConfig.show_oppo_rec && Utils_1.utils.ServerConfig.show_oppo_rec == "true") {
                this.btnMoreGames.active = true;
            }
            else {
                var gameList = Utils_1.utils.getRecommondGameList();
                if (gameList) {
                    if (gameList.length > 0 || CC_DEBUG) {
                        this.btnMoreGames.active = true;
                    }
                    else {
                        cc.warn("交叉推广数据列表长度为0, 更多游戏按钮不显示!");
                        valid = false;
                    }
                }
                else {
                    cc.warn("交叉推广数据列表数据为null, 更多游戏按钮不显示!");
                    valid = false;
                }
            }
        }
        else {
            valid = false;
        }
        if (!valid) {
            this.node.destroy();
        }
    };
    MoreGamesWidget.prototype.onBtnClickedHandler = function (event, data) {
        if (PlatUtils_1.default.IsQQ) {
            Utils_1.utils.adManager.ShowAppBox(true);
            return;
        }
        else if (PlatUtils_1.default.Is4399) {
            Utils_1.utils.Tool_4399.showRecommend();
            return;
        }
        else if (PlatUtils_1.default.IsNativeAndroid && Utils_1.utils.Tool_Native && Utils_1.utils.Tool_Native.moreGameShowType == 1) {
            //如果是原生平台，判断显示的类型
            Utils_1.utils.Tool_Native.showMoreGames();
            Utils_1.utils.postDataByLocation("123", YZ_Constant_1.SubLocation.isMoreGame, 0);
        }
        else if (PlatUtils_1.default.IsDouyin) {
            Utils_1.utils.Tool_Douyin.showMoreGamesModal();
        }
        //  else if (PlatUtils.IsOPPO) {
        //     utils.oppoTool.showOppoGamePortal();
        // } 
        else {
            if (Utils_1.utils.ServerConfig.show_oppo_rec && Utils_1.utils.ServerConfig.show_oppo_rec == "true") {
                Utils_1.utils.showLog("服务器配置显示官方互推！");
                Utils_1.utils.oppoTool.showOppoGamePortal();
                return;
            }
            var jumpList = Utils_1.utils.getRecommondGameList();
            if (jumpList && jumpList.length > 0) {
                Utils_1.utils.showLog("MoreGamePanel 交叉推广数据:", JSON.stringify(jumpList));
                var panel = void 0;
                if (Utils_1.utils.ServerConfig.more_game_skin == 2 || CC_DEBUG) {
                    panel = cc.instantiate(this.prefab1);
                    panel.zIndex = 999999;
                    this.moreGamesPanel = panel.getComponent("MoreGamesPanel1");
                }
                else {
                    panel = cc.instantiate(this.prefab);
                    panel.zIndex = 999999;
                    this.moreGamesPanel = panel.getComponent("MoreGamesPanel");
                }
                cc.director.getScene().addChild(panel);
                this.moreGamesPanel._location = YZ_Constant_1.SubLocation.isMoreGame;
                this.moreGamesPanel.init(jumpList);
                this.moreGamesPanel.show();
                AldUtils_1.default.SendEvent("点击更多游戏按钮");
            }
            else {
                Utils_1.utils.showLog("获取交叉推广数据失败!");
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], MoreGamesWidget.prototype, "prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MoreGamesWidget.prototype, "prefab1", void 0);
    MoreGamesWidget = __decorate([
        ccclass
    ], MoreGamesWidget);
    return MoreGamesWidget;
}(cc.Component));
exports.default = MoreGamesWidget;

cc._RF.pop();