"use strict";
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