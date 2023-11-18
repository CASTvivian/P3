
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YzUserPrivacyPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWXpVc2VyUHJpdmFjeVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsaUNBQWdDO0FBQ2hDLDZDQUE0RDtBQUM1RCxxREFBZ0Q7QUFHMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUF3TEM7UUF0TEcsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLHNCQUFnQixHQUFhLElBQUksQ0FBQztRQUVsQyxjQUFRLEdBQVksS0FBSyxDQUFDLENBQUMsVUFBVTtRQUVyQyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7UUFDdEMsV0FBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixhQUFPLEdBQVcsMkNBQTJDLENBQUE7UUFFN0QscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFrR2hDLHNCQUFnQixHQUFZLEtBQUssQ0FBQzs7UUFtRWxDLGlCQUFpQjtJQUNyQixDQUFDO0lBcktHLG1DQUFNLEdBQU47UUFFSSxJQUFJLG1CQUFTLENBQUMsUUFBUSxJQUFJLG1CQUFTLENBQUMsSUFBSSxJQUFJLG1CQUFTLENBQUMsUUFBUSxJQUFJLG1CQUFTLENBQUMsT0FBTyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxPQUFPLEdBQUcsNENBQTRDLENBQUE7U0FDOUQ7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pELElB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QUMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FDbEgsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzZCQUN4Rzt5QkFFSjtxQkFFSjt5QkFBTTt3QkFDSCxhQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7cUJBQ3ZDO2dCQUNMLENBQUMsQ0FBQyxDQUFBOztZQXZDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7d0JBQTlCLENBQUM7YUF3Q1Q7WUFDRCxtRkFBbUY7WUFDbkYsNENBQTRDO1lBQzVDLDZCQUE2QjtZQUM3QiwrQkFBK0I7WUFDL0IsMkNBQTJDO1lBQzNDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBbkxnQixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXdMdEM7SUFBRCx5QkFBQztDQXhMRCxBQXdMQyxDQXhMK0MsRUFBRSxDQUFDLFNBQVMsR0F3TDNEO2tCQXhMb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgWVpfQ29uc3RhbnQsIHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xuaW1wb3J0IFlaX0xvY2FsU3RvcmFnZSBmcm9tIFwiLi9ZWl9Mb2NhbFN0b3JhZ2VcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWXpVc2VyUHJpdmFjeVBhbmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIF91c2VyUHJpdmFjeUluZm86IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgX2NoZWNrRXhpdDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBfbWFpblBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIF91c2VyUHJpdmFjeURlc2M6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHNob3dEZXNjOiBib29sZWFuID0gZmFsc2U7IC8v55u05o6l5pi+56S66K+m5oOF6aG16Z2iXG5cbiAgICByYXRpbzogbnVtYmVyID0gMTtcblxuICAgIGltZ0NvdW50OiBudW1iZXIgPSA3OyAvL+WbvueJh+aVsOmHjyDmqKrlsY/vvJo1IOerluWxj++8mjdcbiAgICBzY2FsZTogbnVtYmVyID0gMS41O1xuICAgIGltZ1BhdGg6IHN0cmluZyA9IFwiaHR0cDovL3hjeC55b3VsZXRkLmNvbS94Y3gvaDUvcHJpdmFjeUltZy9cIlxuXG4gICAgY29tcGFueUluZm9Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCB8fCBQbGF0VXRpbHMuSXNRUSB8fCBQbGF0VXRpbHMuSXNEb3V5aW4gfHwgUGxhdFV0aWxzLklzQmFpZHUpIHtcbiAgICAgICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly94Y3gueW91bGV0ZC5jb20veGN4L2g1L3ByaXZhY3lJbWcvXCJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91c2VyUHJpdmFjeUluZm8gPSBjYy5maW5kKFwiUHJpdmFjeURlc2NcIiwgdGhpcy5ub2RlKVxuICAgICAgICB0aGlzLl9jaGVja0V4aXQgPSBjYy5maW5kKFwiQ2hlY2tQYW5lbFwiLCB0aGlzLm5vZGUpXG5cbiAgICAgICAgdGhpcy5fbWFpblBhbmVsID0gY2MuZmluZChcIlBhbmVsXCIsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgLy8gdGhpcy5fdXNlclByaXZhY3lEZXNjID0gdGhpcy5fdXNlclByaXZhY3lJbmZvLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50LmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuXG4gICAgICAgIC8vIGlmICh1dGlscy5TZXJ2ZXJDb25maWcudXNlcl9wcml2YWN5X2luZm8pIHtcbiAgICAgICAgLy8gICAgIHRoaXMuX3VzZXJQcml2YWN5RGVzYy5zdHJpbmcgPSB1dGlscy5TZXJ2ZXJDb25maWcudXNlcl9wcml2YWN5X2luZm87XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93RGVzYykge1xuICAgICAgICAgICAgdGhpcy5fbWFpblBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tFeGl0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy5fdXNlclByaXZhY3lJbmZvLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl91c2VyUHJpdmFjeUluZm8uZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJjaG9pc2VOb2RlXCIpLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnNob3dEZXNjUGFuZWwoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgLy8g5qiq5bGP5ri45oiPXG4gICAgICAgICAgICB0aGlzLnJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDE5MjAgKiAwLjc1O1xuICAgICAgICAgICAgdGhpcy5pbWdDb3VudCA9IDU7XG4gICAgICAgICAgICB0aGlzLmltZ1BhdGggKz0gXCJoX1wiXG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gMS40O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xuICAgICAgICAgICAgdGhpcy5pbWdQYXRoICs9IFwicF9cIlxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFpblBhbmVsLnNjYWxlID0gdGhpcy5yYXRpbztcbiAgICAgICAgdGhpcy5fY2hlY2tFeGl0LnNjYWxlID0gdGhpcy5yYXRpbztcbiAgICAgICAgdGhpcy5fdXNlclByaXZhY3lJbmZvLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50LmdldENoaWxkQnlOYW1lKFwiY2hvaXNlTm9kZVwiKS5zY2FsZSA9IHRoaXMucmF0aW87XG4gICAgICAgIHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjbG9zZUltZ1wiKS5zY2FsZSA9IHRoaXMucmF0aW87XG4gICAgICAgIHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYW9kaW5nTGFiZWxcIikuc2NhbGUgPSB0aGlzLnJhdGlvO1xuICAgICAgICB0aGlzLmNvbXBhbnlJbmZvTm9kZSA9IHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudC5nZXRDaGlsZEJ5TmFtZShcIkNvbnRhY3RJbmZvXCIpO1xuXG5cbiAgICAgICAgbGV0IHN1YmplY3QgPSBcIua3seWcs+W4guS8mOaZuuS/oeaBr+aKgOacr+aciemZkOWFrOWPuFwiO1xuICAgICAgICBsZXQgY29udGFjdCA9IFwi6IGU57O76YKu566x77yaeW91emhpeHhAMTYzLmNvbVwiO1xuICAgICAgICBpZiAodXRpbHMuU2VydmVyQ29uZmlnLmNvbXBhbnkpIHtcbiAgICAgICAgICAgIHN1YmplY3QgPSB1dGlscy5TZXJ2ZXJDb25maWcuY29tcGFueS5zdWJqZWN0O1xuICAgICAgICAgICAgY29udGFjdCA9IHV0aWxzLlNlcnZlckNvbmZpZy5jb21wYW55LmNvbnRhY3Q7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuY29tcGFueUluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwic3ViamVjdFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMuY29tcGFueUluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiY29udGFjdFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbnRhY3Q7XG5cblxuXG4gICAgfVxuXG5cbiAgICAvLyBvbkRlc3Ryb3koKSB7XG4gICAgLy8gICAgIHV0aWxzLmVtaXRQcml2YWN5Q2xvc2VFdmVudCgpO1xuICAgIC8vIH1cblxuICAgIG9uT0tDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5ZWl9HQU1FX1lTWFksIFwiaXNPS1wiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgdXRpbHMuZW1pdFByaXZhY3lDbG9zZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgb25DbG9zZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcbiAgICAgICAgICAgIHV0aWxzLkdhbWVFeGl0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoZWNrRXhpdC5hY3RpdmUgJiYgKFBsYXRVdGlscy5Jc1FRIHx8IFBsYXRVdGlscy5Jc09QUE8gfHwgUGxhdFV0aWxzLklzWGlhb01pKSkge1xuICAgICAgICAgICAgdXRpbHMuR2FtZUV4aXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGVja0V4aXQuYWN0aXZlID0gIXRoaXMuX2NoZWNrRXhpdC5hY3RpdmU7XG4gICAgICAgIHRoaXMuX21haW5QYW5lbC5hY3RpdmUgPSAhdGhpcy5fbWFpblBhbmVsLmFjdGl2ZTtcbiAgICB9XG5cbiAgICBvbkNsb3NlUHJpdmFjeURlc2MoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd0Rlc2MpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyUHJpdmFjeUluZm8uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgY2hpbGRzID0gdGhpcy5fdXNlclByaXZhY3lJbmZvLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50LmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjaGlsZHNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc19idG5fanVtcF9kZXNjOiBib29sZWFuID0gZmFsc2U7XG4gICAgb25KdW1wRGVzY0J0bkNsaWNrTGlzdG5lcigpIHtcbiAgICAgICAgdGhpcy5pc19idG5fanVtcF9kZXNjID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93RGVzY1BhbmVsKCk7XG4gICAgfVxuXG5cblxuICAgIHNob3dEZXNjUGFuZWwoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJQcml2YWN5SW5mby5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl91c2VyUHJpdmFjeUluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiTGFvZGluZ0xhYmVsXCIpLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHAgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgcC5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMuaW1nQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgICAgICBwLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudC5hZGRDaGlsZChwKTtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2FkZXIubG9hZFJlcyhcImltZ19mb250L2hfXCIgKyBpLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocC53aWR0aCwgXCI9PT1cIiwgcC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcC5oZWlnaHQgKj0gdGhpcy5zY2FsZSAqIHRoaXMucmF0aW87XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBwLndpZHRoICo9IHRoaXMuc2NhbGUgKiB0aGlzLnJhdGlvO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGkgPj0gMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYW9kaW5nTGFiZWxcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1dGlscy5zaG93TG9nKFwieWluc2lcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXModGhpcy5pbWdQYXRoICsgaSArIFwiLnBuZ1wiLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcC5oZWlnaHQgKj0gdGhpcy5zY2FsZSAqIHRoaXMucmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICBwLndpZHRoICo9IHRoaXMuc2NhbGUgKiB0aGlzLnJhdGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYW9kaW5nTGFiZWxcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzLmltZ0NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wYW55SW5mb05vZGUuekluZGV4ID0gdGhpcy5pbWdDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlJbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfYnRuX2p1bXBfZGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyUHJpdmFjeUluZm8uZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJjaG9pc2VOb2RlXCIpLnpJbmRleCA9IHRoaXMuaW1nQ291bnQgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyUHJpdmFjeUluZm8uZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJjaG9pc2VOb2RlXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLpmpDnp4HljY/orq7liqDovb3lpLHotKXvvIzor7flhbPpl63nqpflj6Pph43mlrDmiZPlvIBcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbGV0IGNoaWxkcyA9IHRoaXMuX3VzZXJQcml2YWN5SW5mby5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudC5jaGlsZHJlbjtcbiAgICAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyAgICAgY2hpbGRzW2ldLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgLy8gICAgIGNoaWxkc1tpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAgIGNoaWxkc1tpXS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMykpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LCAwLjUpO1xuICAgIH1cblxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuXG5cblxuXG5cblxuXG5cblxuIl19