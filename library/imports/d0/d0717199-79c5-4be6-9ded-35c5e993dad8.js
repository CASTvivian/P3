"use strict";
cc._RF.push(module, 'd0717GZecVL5p3tNcXpk9rY', 'YzUserPrivacyPanel');
// common-plugin/Scripts/YzUserPrivacyPanel.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var PlatUtils_1 = require("./PlatUtils");
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YzUserPrivacyPanel = /** @class */ (function (_super) {
    __extends(YzUserPrivacyPanel, _super);
    function YzUserPrivacyPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._userPrivacyInfo = null;
        _this._checkExit = null;
        _this._mainPanel = null;
        _this._userPrivacyDesc = null;
        _this.showDesc = false; //直接显示详情页面
        _this.ratio = 1;
        _this.imgCount = 7; //图片数量 横屏：5 竖屏：7
        _this.scale = 1.5;
        _this.imgPath = "http://xcx.youletd.com/xcx/h5/privacyImg/";
        _this.companyInfoNode = null;
        _this.is_btn_jump_desc = false;
        return _this;
        // update (dt) {}
    }
    YzUserPrivacyPanel.prototype.onLoad = function () {
        if (PlatUtils_1.default.IsWechat || PlatUtils_1.default.IsQQ || PlatUtils_1.default.IsDouyin || PlatUtils_1.default.IsBaidu) {
            this.imgPath = "https://xcx.youletd.com/xcx/h5/privacyImg/";
        }
        this._userPrivacyInfo = cc.find("PrivacyDesc", this.node);
        this._checkExit = cc.find("CheckPanel", this.node);
        this._mainPanel = cc.find("Panel", this.node);
        // this._userPrivacyDesc = this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("item").getComponent(cc.Label);
        // if (utils.ServerConfig.user_privacy_info) {
        //     this._userPrivacyDesc.string = utils.ServerConfig.user_privacy_info;
        // }
        if (this.showDesc) {
            this._mainPanel.active = false;
            this._checkExit.active = false;
            // this._userPrivacyInfo.active = true;
            this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").active = false;
            this.showDescPanel();
        }
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;
            this.imgCount = 5;
            this.imgPath += "h_";
            this.scale = 1.4;
        }
        else {
            this.ratio = cc.winSize.width / 1080;
            this.imgPath += "p_";
        }
        this._mainPanel.scale = this.ratio;
        this._checkExit.scale = this.ratio;
        this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").scale = this.ratio;
        this._userPrivacyInfo.getChildByName("view").getChildByName("closeImg").scale = this.ratio;
        this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").scale = this.ratio;
        this.companyInfoNode = this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("ContactInfo");
        var subject = "深圳市优智信息技术有限公司";
        var contact = "联系邮箱：youzhixx@163.com";
        if (Utils_1.utils.ServerConfig.company) {
            subject = Utils_1.utils.ServerConfig.company.subject;
            contact = Utils_1.utils.ServerConfig.company.contact;
        }
        this.companyInfoNode.getChildByName("subject").getComponent(cc.Label).string = subject;
        this.companyInfoNode.getChildByName("contact").getComponent(cc.Label).string = contact;
    };
    // onDestroy() {
    //     utils.emitPrivacyCloseEvent();
    // }
    YzUserPrivacyPanel.prototype.onOKClickListener = function () {
        YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.YZ_GAME_YSXY, "isOK");
        this.node.destroy();
        Utils_1.utils.emitPrivacyCloseEvent();
    };
    YzUserPrivacyPanel.prototype.onCloseClickListener = function () {
        if (PlatUtils_1.default.IsHuaWei) {
            Utils_1.utils.GameExit();
            return;
        }
        if (this._checkExit.active && (PlatUtils_1.default.IsQQ || PlatUtils_1.default.IsOPPO || PlatUtils_1.default.IsXiaoMi)) {
            Utils_1.utils.GameExit();
            return;
        }
        this._checkExit.active = !this._checkExit.active;
        this._mainPanel.active = !this._mainPanel.active;
    };
    YzUserPrivacyPanel.prototype.onClosePrivacyDesc = function () {
        if (this.showDesc) {
            this.node.destroy();
        }
        else {
            this._userPrivacyInfo.active = false;
            var childs = this._userPrivacyInfo.getComponent(cc.ScrollView).content.children;
            for (var i = 0; i < childs.length; i++) {
                childs[i].active = false;
            }
        }
    };
    YzUserPrivacyPanel.prototype.onJumpDescBtnClickListner = function () {
        this.is_btn_jump_desc = true;
        this.showDescPanel();
    };
    YzUserPrivacyPanel.prototype.showDescPanel = function () {
        var _this = this;
        this._userPrivacyInfo.active = true;
        this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").active = true;
        this.scheduleOnce(function () {
            var p = new cc.Node();
            p.addComponent(cc.Sprite);
            var _loop_1 = function (i) {
                var p_1 = new cc.Node();
                p_1.addComponent(cc.Sprite);
                _this._userPrivacyInfo.getComponent(cc.ScrollView).content.addChild(p_1);
                // cc.loader.loadRes("img_font/h_" + i, (err, res) => {
                //     if (!err && cc.isValid(this)) {
                //         p.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
                //         console.log(p.width, "===", p.height);
                //         p.height *= this.scale * this.ratio;
                //         p.width *= this.scale * this.ratio;
                //         if (i >= 1) {
                //             this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").active = false;
                //         }
                //     } else {
                //         utils.showLog("yinsi");
                //     }
                // })
                CompatibleTool_1.default.LoadRes(_this.imgPath + i + ".png", function (err, res) {
                    if (!err && cc.isValid(_this)) {
                        p_1.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
                        p_1.height *= _this.scale * _this.ratio;
                        p_1.width *= _this.scale * _this.ratio;
                        if (i >= 1) {
                            _this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").active = false;
                        }
                        if (i >= _this.imgCount) {
                            _this.companyInfoNode.zIndex = _this.imgCount;
                            _this.companyInfoNode.active = true;
                            if (_this.is_btn_jump_desc) {
                                _this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").zIndex = _this.imgCount + 1;
                                _this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").active = true;
                            }
                        }
                    }
                    else {
                        Utils_1.utils.showMsg("隐私协议加载失败，请关闭窗口重新打开");
                    }
                });
            };
            for (var i = 1; i <= _this.imgCount; i++) {
                _loop_1(i);
            }
            // let childs = this._userPrivacyInfo.getComponent(cc.ScrollView).content.children;
            // for (let i = 0; i < childs.length; i++) {
            //     childs[i].opacity = 0;
            //     childs[i].active = true;
            //     childs[i].runAction(cc.fadeIn(0.3));
            // }
        }, 0.5);
    };
    YzUserPrivacyPanel = __decorate([
        ccclass
    ], YzUserPrivacyPanel);
    return YzUserPrivacyPanel;
}(cc.Component));
exports.default = YzUserPrivacyPanel;

cc._RF.pop();