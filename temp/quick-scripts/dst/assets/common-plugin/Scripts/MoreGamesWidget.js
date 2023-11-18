
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/MoreGamesWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTW9yZUdhbWVzV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUFnQztBQUNoQyx5Q0FBb0M7QUFDcEMsdUNBQWtDO0FBQ2xDLG1EQUE4QztBQUM5Qyw2Q0FBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFxSUM7UUFsSUcsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixhQUFPLEdBQWMsSUFBSSxDQUFDO1FBRzFCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLG9CQUFjLEdBQW1CLElBQUksQ0FBQzs7SUEySDFDLENBQUM7SUF4SEcsZ0NBQU0sR0FBTjtRQUFBLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRixJQUFJLE9BQU8sQ0FBQTtRQUNYLElBQUksYUFBSyxDQUFDLFlBQVksRUFBRTtZQUNwQixPQUFPLEdBQUcsYUFBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7U0FDL0M7YUFBTTtZQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEI7UUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDNUIsd0JBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87Z0JBQ3pDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUN2QyxJQUFJLElBQUksR0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLGFBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUMxQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDSSxhQUFLLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFDSSxJQUFJLEtBQUssR0FBWSxJQUFJLENBQUM7UUFDMUIsSUFBSSxhQUFLLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUMvQixJQUFJLG1CQUFTLENBQUMsSUFBSSxFQUFFO2dCQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDbkM7aUJBQU0sSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ25DO2lCQUFNLElBQUksbUJBQVMsQ0FBQyxlQUFlLElBQUksYUFBSyxDQUFDLFdBQVcsSUFBSSxhQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUU7Z0JBQzdHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNuQztpQkFBTSxJQUFJLGFBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxJQUFJLGFBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxJQUFJLE1BQU0sRUFBRTtnQkFDdkYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILElBQUksUUFBUSxHQUFRLGFBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLFFBQVEsRUFBRTtvQkFDVixJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFFBQVEsRUFBRTt3QkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7d0JBQ3RDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ2pCO2lCQUNKO3FCQUFNO29CQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztvQkFDekMsS0FBSyxHQUFHLEtBQUssQ0FBQztpQkFDakI7YUFDSjtTQUVKO2FBQU07WUFDSCxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsNkNBQW1CLEdBQW5CLFVBQW9CLEtBQWUsRUFBRSxJQUFTO1FBQzFDLElBQUksbUJBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDaEIsYUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsT0FBTztTQUNWO2FBQU0sSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUN6QixhQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLE9BQU87U0FDVjthQUFNLElBQUksbUJBQVMsQ0FBQyxlQUFlLElBQUksYUFBSyxDQUFDLFdBQVcsSUFBSSxhQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixJQUFJLENBQUMsRUFBRTtZQUNsRyxpQkFBaUI7WUFDakIsYUFBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNsQyxhQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLHlCQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlEO2FBQU0sSUFBSSxtQkFBUyxDQUFDLFFBQVEsRUFBRTtZQUMzQixhQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDMUM7UUFDRCxnQ0FBZ0M7UUFDaEMsMkNBQTJDO1FBQzNDLEtBQUs7YUFDQTtZQUVELElBQUksYUFBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLElBQUksYUFBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLElBQUksTUFBTSxFQUFFO2dCQUNoRixhQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM5QixhQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3BDLE9BQU87YUFDVjtZQUNELElBQUksUUFBUSxHQUFRLGFBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ2pELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxhQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxLQUFLLFNBQUEsQ0FBQztnQkFDVixJQUFJLGFBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUU7b0JBQ3BELEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUMvRDtxQkFBTTtvQkFDSCxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDOUQ7Z0JBRUQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLHlCQUFXLENBQUMsVUFBVSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0Isa0JBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7YUFFbEM7aUJBQU07Z0JBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNoQztTQUNKO0lBRUwsQ0FBQztJQWhJRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ007SUFOVCxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBcUluQztJQUFELHNCQUFDO0NBcklELEFBcUlDLENBckk0QyxFQUFFLENBQUMsU0FBUyxHQXFJeEQ7a0JBcklvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vcmVHYW1lc1BhbmVsIGZyb20gXCIuL01vcmVHYW1lc1BhbmVsXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IEFsZFV0aWxzIGZyb20gXCIuL0FsZFV0aWxzXCI7XHJcbmltcG9ydCBDb21wYXRpYmxlVG9vbCBmcm9tIFwiLi9Db21wYXRpYmxlVG9vbFwiO1xyXG5pbXBvcnQgeyBTdWJMb2NhdGlvbiB9IGZyb20gXCIuL1laX0NvbnN0YW50XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9yZUdhbWVzV2lkZ2V0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWIxOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBidG5Nb3JlR2FtZXM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgbW9yZUdhbWVzUGFuZWw6IE1vcmVHYW1lc1BhbmVsID0gbnVsbDtcclxuXHJcbiAgICBiZ1RleHR1cmU6IGNjLlNwcml0ZUZyYW1lO1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuYnRuTW9yZUdhbWVzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQnRuX01vcmVHYW1lc1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5Nb3JlR2FtZXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBiYWNrID0gdGhpcy5idG5Nb3JlR2FtZXMuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGxldCBiYWNrVXJsXHJcbiAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZykge1xyXG4gICAgICAgICAgICBiYWNrVXJsID0gdXRpbHMuU2VydmVyQ29uZmlnLm1vcmVfZ2FtZV9pY29uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCLmsqHmnInmnI3liqHlmajphY3nva5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiYWNrVXJsICYmICF0aGlzLmJnVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKGJhY2tVcmwsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGNjLmlzVmFsaWQodGhpcykgJiYgYmFjay5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemU6IGNjLlNpemUgPSBiYWNrLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJnVGV4dHVyZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrLnNwcml0ZUZyYW1lID0gc2VsZi5iZ1RleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFjay5ub2RlLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRCdG5WaXNpYmxlKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHV0aWxzLnVucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldEJ0blZpc2libGUoKSB7XHJcbiAgICAgICAgbGV0IHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBpZiAodXRpbHMuaXNTaG93TW9yZUdhbWVzV2lkZ2V0KCkpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk1vcmVHYW1lcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5JczQzOTkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTW9yZUdhbWVzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCAmJiB1dGlscy5Ub29sX05hdGl2ZSAmJiB1dGlscy5jb25maWcubmF0aXZlQW5kcm9pZENvbmZpZy5jaGFubmVsID09IFwib3Bwb1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk1vcmVHYW1lcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLlNlcnZlckNvbmZpZy5zaG93X29wcG9fcmVjICYmIHV0aWxzLlNlcnZlckNvbmZpZy5zaG93X29wcG9fcmVjID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk1vcmVHYW1lcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdhbWVMaXN0OiBhbnkgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVMaXN0Lmxlbmd0aCA+IDAgfHwgQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5Nb3JlR2FtZXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiXGJcYuS6pOWPieaOqOW5v+aVsOaNruWIl+ihqOmVv+W6puS4ujAsIOabtOWkmua4uOaIj+aMiemSruS4jeaYvuekuiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiXGJcYuS6pOWPieaOqOW5v+aVsOaNruWIl+ihqOaVsOaNruS4um51bGwsIOabtOWkmua4uOaIj+aMiemSruS4jeaYvuekuiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkJ0bkNsaWNrZWRIYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1FRKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QXBwQm94KHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmIChQbGF0VXRpbHMuSXM0Mzk5KSB7XHJcbiAgICAgICAgICAgIHV0aWxzLlRvb2xfNDM5OS5zaG93UmVjb21tZW5kKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKFBsYXRVdGlscy5Jc05hdGl2ZUFuZHJvaWQgJiYgdXRpbHMuVG9vbF9OYXRpdmUgJiYgdXRpbHMuVG9vbF9OYXRpdmUubW9yZUdhbWVTaG93VHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5piv5Y6f55Sf5bmz5Y+w77yM5Yik5pat5pi+56S655qE57G75Z6LXHJcbiAgICAgICAgICAgIHV0aWxzLlRvb2xfTmF0aXZlLnNob3dNb3JlR2FtZXMoKTtcclxuICAgICAgICAgICAgdXRpbHMucG9zdERhdGFCeUxvY2F0aW9uKFwiMTIzXCIsIFN1YkxvY2F0aW9uLmlzTW9yZUdhbWUsIDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzRG91eWluKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLlRvb2xfRG91eWluLnNob3dNb3JlR2FtZXNNb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAgZWxzZSBpZiAoUGxhdFV0aWxzLklzT1BQTykge1xyXG4gICAgICAgIC8vICAgICB1dGlscy5vcHBvVG9vbC5zaG93T3Bwb0dhbWVQb3J0YWwoKTtcclxuICAgICAgICAvLyB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZy5zaG93X29wcG9fcmVjICYmIHV0aWxzLlNlcnZlckNvbmZpZy5zaG93X29wcG9fcmVjID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5pyN5Yqh5Zmo6YWN572u5pi+56S65a6Y5pa55LqS5o6o77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMub3Bwb1Rvb2wuc2hvd09wcG9HYW1lUG9ydGFsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGp1bXBMaXN0OiBhbnkgPSB1dGlscy5nZXRSZWNvbW1vbmRHYW1lTGlzdCgpO1xyXG4gICAgICAgICAgICBpZiAoanVtcExpc3QgJiYganVtcExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIk1vcmVHYW1lUGFuZWwg5Lqk5Y+J5o6o5bm/5pWw5o2uOlwiLCBKU09OLnN0cmluZ2lmeShqdW1wTGlzdCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLlNlcnZlckNvbmZpZy5tb3JlX2dhbWVfc2tpbiA9PSAyIHx8IENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYjEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLnpJbmRleCA9IDk5OTk5OTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmVHYW1lc1BhbmVsID0gcGFuZWwuZ2V0Q29tcG9uZW50KFwiTW9yZUdhbWVzUGFuZWwxXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC56SW5kZXggPSA5OTk5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JlR2FtZXNQYW5lbCA9IHBhbmVsLmdldENvbXBvbmVudChcIk1vcmVHYW1lc1BhbmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQocGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlR2FtZXNQYW5lbC5fbG9jYXRpb24gPSBTdWJMb2NhdGlvbi5pc01vcmVHYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlR2FtZXNQYW5lbC5pbml0KGp1bXBMaXN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9yZUdhbWVzUGFuZWwuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgQWxkVXRpbHMuU2VuZEV2ZW50KFwi54K55Ye75pu05aSa5ri45oiP5oyJ6ZKuXCIpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLojrflj5bkuqTlj4nmjqjlub/mlbDmja7lpLHotKUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19