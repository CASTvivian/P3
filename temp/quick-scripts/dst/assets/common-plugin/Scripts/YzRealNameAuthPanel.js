
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YzRealNameAuthPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '48ce4dCA2JKc6UIPzo4VU0e', 'YzRealNameAuthPanel');
// common-plugin/Scripts/YzRealNameAuthPanel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YzRealNameAuthPanel = /** @class */ (function (_super) {
    __extends(YzRealNameAuthPanel, _super);
    function YzRealNameAuthPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.edit_real_name = null;
        _this.edit_id_card = null;
        _this.realNameAuthPanel = null;
        _this.msgNode = null;
        _this.exitPanel = null;
        _this.toVerifyPanel = null;
        _this.offLinePanel = null;
        _this.edit_default_color = null;
        _this._isOffLine = false;
        _this.realNameAuthLandscapePanel = null;
        _this.regName = /^[\u4e00-\u9fa5]{2,4}$/;
        _this.regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        _this._clickTime = 0;
        return _this;
    }
    YzRealNameAuthPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        var ratio = 0;
        if (cc.winSize.height < cc.winSize.width) {
            this.realNameAuthPanel = cc.find("Panel/RealNameAuthLandscapePanel", this.node);
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.75;
        }
        else {
            this.realNameAuthPanel = cc.find("Panel/RealNameAuthPanel", this.node);
            ratio = cc.winSize.width / 1080;
        }
        this.exitPanel = cc.find("Panel/ExitPanel", this.node);
        this.toVerifyPanel = cc.find("Panel/ToVerifyPanel", this.node);
        this.offLinePanel = cc.find("Panel/OfflinePanel", this.node);
        this.edit_id_card = this.realNameAuthPanel.getChildByName("editIdCard").getComponent(cc.EditBox);
        this.edit_real_name = this.realNameAuthPanel.getChildByName("editRealName").getComponent(cc.EditBox);
        this.msgNode = cc.find("Panel/MsgNode", this.node);
        this.edit_default_color = this.edit_real_name.fontColor;
        if (this.edit_default_color == null) {
            this.edit_default_color = new cc.Color(0, 0, 0, 63);
        }
        cc.find("Panel", this.node).scale = ratio;
        if (this._isOffLine) {
            this.showOfferLine();
        }
        else {
            this.realNameAuthPanel.active = true;
        }
    };
    YzRealNameAuthPanel.prototype.start = function () {
        // if (cc.winSize.height < cc.winSize.width) {
        // utils.adManager.HideBanner(BannerLocation.Home);
        // }
    };
    YzRealNameAuthPanel.prototype.onDestroy = function () {
        Utils_1.utils.emitRealNameAuthCloseEvent();
    };
    YzRealNameAuthPanel.prototype.onExitBtnClickListener = function () {
        Utils_1.utils.showLog("退出游戏！");
        Utils_1.utils.GameExit();
    };
    YzRealNameAuthPanel.prototype.onBackAuthBtnClickListener = function () {
        this.toVerifyPanel.active = false;
        this.exitPanel.active = false;
        this.realNameAuthPanel.active = true;
    };
    YzRealNameAuthPanel.prototype.showExitPanel = function () {
        this.toVerifyPanel.active = false;
        this.realNameAuthPanel.active = false;
        this.offLinePanel.active = false;
        this.exitPanel.active = true;
    };
    YzRealNameAuthPanel.prototype.showOfferLine = function () {
        this.toVerifyPanel.active = false;
        this.exitPanel.active = false;
        this.realNameAuthPanel.active = false;
        this.offLinePanel.active = true;
    };
    YzRealNameAuthPanel.prototype.onPostBtnClickListener = function () {
        var _this = this;
        var nowTime = new Date().getTime();
        if ((nowTime - this._clickTime) / 1000 < 2) {
            this.showMsg('请勿频繁提交！');
            return;
        }
        this._clickTime = nowTime;
        if (!this.regName.test(this.edit_real_name.string)) {
            this.showMsg('真实姓名填写有误!');
            this.edit_real_name.fontColor = cc.Color.RED;
            this.edit_real_name.setFocus();
            return false;
        }
        this.edit_real_name.fontColor = this.edit_default_color;
        if (!this.regIdNo.test(this.edit_id_card.string)) {
            this.edit_id_card.fontColor = cc.Color.RED;
            this.showMsg('身份证号填写有误!');
            this.edit_id_card.setFocus();
            return false;
        }
        this.edit_id_card.fontColor = this.edit_default_color;
        Utils_1.utils.realNameAuth(this.edit_id_card.string, this.edit_real_name.string, function (res, result) {
            Utils_1.utils.showLog("实名认证结束：#result=" + JSON.stringify(result));
            if (res) {
                if (result) {
                    var res_1 = JSON.parse(result);
                    switch (res_1.code) {
                        case 1:
                            _this.showMsg(res_1.msg);
                            break;
                        case 0:
                            if (res_1.nonage == "0") {
                                Utils_1.utils.setRealNameAuthLocalData("2");
                            }
                            else {
                                Utils_1.utils.setRealNameAuthLocalData("1");
                            }
                            Utils_1.utils._isRealNameAuth = true;
                            if (res_1.msg) {
                                _this.showMsg(res_1.msg);
                            }
                            _this.scheduleOnce(function () {
                                _this.node.destroy();
                            }, 0.5);
                            break;
                        case 2:
                            Utils_1.utils.setRealNameAuthLocalData("2");
                            _this.showOfferLine();
                            break;
                    }
                }
                else {
                    _this.showMsg("请求失败，请重新提交验证！");
                }
            }
            else {
                _this.showMsg("请求失败，请重新提交验证！");
            }
        });
    };
    YzRealNameAuthPanel.prototype.showMsg = function (str) {
        var msgNode = cc.instantiate(this.msgNode);
        msgNode.getChildByName("msgLabel").getComponent(cc.Label).string = "" + str;
        this.node.addChild(msgNode, cc.macro.MAX_ZINDEX);
        msgNode.active = true;
        msgNode.runAction(cc.sequence(cc.delayTime(0.8), cc.moveBy(0.3, cc.v2(0, +80)), cc.callFunc(function () {
            msgNode.destroy();
        })));
    };
    YzRealNameAuthPanel = __decorate([
        ccclass
    ], YzRealNameAuthPanel);
    return YzRealNameAuthPanel;
}(cc.Component));
exports.default = YzRealNameAuthPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWXpSZWFsTmFtZUF1dGhQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFHMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBaUQsdUNBQVk7SUFBN0Q7UUFBQSxxRUF5S0M7UUF0S0csb0JBQWMsR0FBZSxJQUFJLENBQUM7UUFDbEMsa0JBQVksR0FBZSxJQUFJLENBQUM7UUFDaEMsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3Qix3QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFFMUIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZ0NBQTBCLEdBQVcsSUFBSSxDQUFDO1FBNEUxQyxhQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDbkMsYUFBTyxHQUFHLDBDQUEwQyxDQUFDO1FBR3JELGdCQUFVLEdBQVcsQ0FBQyxDQUFDOztJQTRFM0IsQ0FBQztJQTFKRyxvQ0FBTSxHQUFOO1FBQ0ksSUFBSSxhQUFLLENBQUMsV0FBVyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDL0UsT0FBTztZQUNQLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzFDO2FBQU07WUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQztRQUdELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUN4RCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RDtRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRTFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVELG1DQUFLLEdBQUw7UUFDSSw4Q0FBOEM7UUFDMUMsbURBQW1EO1FBQ3ZELElBQUk7SUFDUixDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNJLGFBQUssQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxvREFBc0IsR0FBdEI7UUFDSSxhQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBR0Qsd0RBQTBCLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBR0QsMkNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFHRCwyQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQVFELG9EQUFzQixHQUF0QjtRQUFBLGlCQTREQztRQTNERyxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXRELGFBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUNqRixhQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLE1BQU0sRUFBRTtvQkFDUixJQUFJLEtBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QixRQUFRLEtBQUcsQ0FBQyxJQUFJLEVBQUU7d0JBQ2QsS0FBSyxDQUFDOzRCQUNGLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNyQixNQUFNO3dCQUNWLEtBQUssQ0FBQzs0QkFDRixJQUFJLEtBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO2dDQUNuQixhQUFLLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUE7NkJBQ3RDO2lDQUFNO2dDQUNILGFBQUssQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTs2QkFDdEM7NEJBQ0QsYUFBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7NEJBQzdCLElBQUksS0FBRyxDQUFDLEdBQUcsRUFBRTtnQ0FDVCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDekI7NEJBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQztnQ0FDZCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUN4QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ1IsTUFBTTt3QkFDVixLQUFLLENBQUM7NEJBQ0YsYUFBSyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNuQyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLE1BQU07cUJBQ2I7aUJBQ0o7cUJBQU07b0JBQ0gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtpQkFDaEM7YUFDSjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFHTixDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLEdBQVc7UUFDZixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUcsR0FBSyxDQUFDO1FBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3hGLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDUixDQUFDO0lBcktnQixtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQXlLdkM7SUFBRCwwQkFBQztDQXpLRCxBQXlLQyxDQXpLZ0QsRUFBRSxDQUFDLFNBQVMsR0F5SzVEO2tCQXpLb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWXpSZWFsTmFtZUF1dGhQYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIGVkaXRfcmVhbF9uYW1lOiBjYy5FZGl0Qm94ID0gbnVsbDtcbiAgICBlZGl0X2lkX2NhcmQ6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIHJlYWxOYW1lQXV0aFBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBtc2dOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBleGl0UGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuICAgIHRvVmVyaWZ5UGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuICAgIG9mZkxpbmVQYW5lbDogY2MuTm9kZSA9IG51bGw7XG4gICAgZWRpdF9kZWZhdWx0X2NvbG9yID0gbnVsbDtcblxuICAgIF9pc09mZkxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICByZWFsTmFtZUF1dGhMYW5kc2NhcGVQYW5lbDpjYy5Ob2RlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmF0aW8gPSAwO1xuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWxOYW1lQXV0aFBhbmVsID0gY2MuZmluZChcIlBhbmVsL1JlYWxOYW1lQXV0aExhbmRzY2FwZVBhbmVsXCIsIHRoaXMubm9kZSlcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNzU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlYWxOYW1lQXV0aFBhbmVsID0gY2MuZmluZChcIlBhbmVsL1JlYWxOYW1lQXV0aFBhbmVsXCIsIHRoaXMubm9kZSlcbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDEwODA7XG4gICAgICAgIH1cblxuIFxuICAgICAgICB0aGlzLmV4aXRQYW5lbCA9IGNjLmZpbmQoXCJQYW5lbC9FeGl0UGFuZWxcIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy50b1ZlcmlmeVBhbmVsID0gY2MuZmluZChcIlBhbmVsL1RvVmVyaWZ5UGFuZWxcIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5vZmZMaW5lUGFuZWwgPSBjYy5maW5kKFwiUGFuZWwvT2ZmbGluZVBhbmVsXCIsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgdGhpcy5lZGl0X2lkX2NhcmQgPSB0aGlzLnJlYWxOYW1lQXV0aFBhbmVsLmdldENoaWxkQnlOYW1lKFwiZWRpdElkQ2FyZFwiKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG4gICAgICAgIHRoaXMuZWRpdF9yZWFsX25hbWUgPSB0aGlzLnJlYWxOYW1lQXV0aFBhbmVsLmdldENoaWxkQnlOYW1lKFwiZWRpdFJlYWxOYW1lXCIpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KTtcbiAgICAgICAgdGhpcy5tc2dOb2RlID0gY2MuZmluZChcIlBhbmVsL01zZ05vZGVcIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5lZGl0X2RlZmF1bHRfY29sb3IgPSB0aGlzLmVkaXRfcmVhbF9uYW1lLmZvbnRDb2xvcjtcbiAgICAgICAgaWYgKHRoaXMuZWRpdF9kZWZhdWx0X2NvbG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdF9kZWZhdWx0X2NvbG9yID0gbmV3IGNjLkNvbG9yKDAsIDAsIDAsIDYzKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5maW5kKFwiUGFuZWxcIiwgdGhpcy5ub2RlKS5zY2FsZSA9IHJhdGlvO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc09mZkxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd09mZmVyTGluZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWFsTmFtZUF1dGhQYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcbiAgICAgICAgICAgIC8vIHV0aWxzLmFkTWFuYWdlci5IaWRlQmFubmVyKEJhbm5lckxvY2F0aW9uLkhvbWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB1dGlscy5lbWl0UmVhbE5hbWVBdXRoQ2xvc2VFdmVudCgpO1xuICAgIH1cblxuXG4gICAgb25FeGl0QnRuQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumAgOWHuua4uOaIj++8gVwiKTtcbiAgICAgICAgdXRpbHMuR2FtZUV4aXQoKTtcbiAgICB9XG5cblxuICAgIG9uQmFja0F1dGhCdG5DbGlja0xpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnRvVmVyaWZ5UGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhpdFBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlYWxOYW1lQXV0aFBhbmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBzaG93RXhpdFBhbmVsKCkge1xuICAgICAgICB0aGlzLnRvVmVyaWZ5UGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVhbE5hbWVBdXRoUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub2ZmTGluZVBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4aXRQYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgc2hvd09mZmVyTGluZSgpIHtcbiAgICAgICAgdGhpcy50b1ZlcmlmeVBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4aXRQYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWFsTmFtZUF1dGhQYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vZmZMaW5lUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWdOYW1lID0gL15bXFx1NGUwMC1cXHU5ZmE1XXsyLDR9JC87XG4gICAgcmVnSWRObyA9IC8oXlxcZHsxNX0kKXwoXlxcZHsxOH0kKXwoXlxcZHsxN30oXFxkfFh8eCkkKS87XG5cblxuICAgIF9jbGlja1RpbWU6IG51bWJlciA9IDA7XG5cbiAgICBvblBvc3RCdG5DbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBsZXQgbm93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBpZiAoKG5vd1RpbWUgLSB0aGlzLl9jbGlja1RpbWUpIC8gMTAwMCA8IDIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01zZygn6K+35Yu/6aKR57mB5o+Q5Lqk77yBJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jbGlja1RpbWUgPSBub3dUaW1lO1xuICAgICAgICBpZiAoIXRoaXMucmVnTmFtZS50ZXN0KHRoaXMuZWRpdF9yZWFsX25hbWUuc3RyaW5nKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TXNnKCfnnJ/lrp7lp5PlkI3loavlhpnmnInor68hJyk7XG4gICAgICAgICAgICB0aGlzLmVkaXRfcmVhbF9uYW1lLmZvbnRDb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgICAgIHRoaXMuZWRpdF9yZWFsX25hbWUuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRfcmVhbF9uYW1lLmZvbnRDb2xvciA9IHRoaXMuZWRpdF9kZWZhdWx0X2NvbG9yO1xuICAgICAgICBpZiAoIXRoaXMucmVnSWROby50ZXN0KHRoaXMuZWRpdF9pZF9jYXJkLnN0cmluZykpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdF9pZF9jYXJkLmZvbnRDb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgICAgIHRoaXMuc2hvd01zZygn6Lqr5Lu96K+B5Y+35aGr5YaZ5pyJ6K+vIScpO1xuICAgICAgICAgICAgdGhpcy5lZGl0X2lkX2NhcmQuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRfaWRfY2FyZC5mb250Q29sb3IgPSB0aGlzLmVkaXRfZGVmYXVsdF9jb2xvcjtcblxuICAgICAgICB1dGlscy5yZWFsTmFtZUF1dGgodGhpcy5lZGl0X2lkX2NhcmQuc3RyaW5nLCB0aGlzLmVkaXRfcmVhbF9uYW1lLnN0cmluZywgKHJlcywgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5a6e5ZCN6K6k6K+B57uT5p2f77yaI3Jlc3VsdD1cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXMuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd01zZyhyZXMubXNnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMubm9uYWdlID09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNldFJlYWxOYW1lQXV0aExvY2FsRGF0YShcIjJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXRSZWFsTmFtZUF1dGhMb2NhbERhdGEoXCIxXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLl9pc1JlYWxOYW1lQXV0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5tc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TXNnKHJlcy5tc2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMC41KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXRSZWFsTmFtZUF1dGhMb2NhbERhdGEoXCIyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T2ZmZXJMaW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNc2coXCLor7fmsYLlpLHotKXvvIzor7fph43mlrDmj5DkuqTpqozor4HvvIFcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01zZyhcIuivt+axguWksei0pe+8jOivt+mHjeaWsOaPkOS6pOmqjOivge+8gVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9XG5cbiAgICBzaG93TXNnKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBtc2dOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tc2dOb2RlKTtcbiAgICAgICAgbXNnTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1zZ0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7c3RyfWA7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChtc2dOb2RlLCBjYy5tYWNyby5NQVhfWklOREVYKTtcbiAgICAgICAgbXNnTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBtc2dOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC44KSwgY2MubW92ZUJ5KDAuMywgY2MudjIoMCwgKzgwKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIG1zZ05vZGUuZGVzdHJveSgpO1xuICAgICAgICB9KSkpXG4gICAgfVxuXG5cblxufVxuIl19