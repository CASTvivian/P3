"use strict";
cc._RF.push(module, '8d1273vqzBO/YV6wO8v72RF', 'GameBoxListGameItem');
// common-plugin/Scripts/GameBoxListGameItem.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameBoxListGameItem = /** @class */ (function (_super) {
    __extends(GameBoxListGameItem, _super);
    function GameBoxListGameItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*
        {
        "id": 274,
        "icon": "http://ff.td68x.com/xcx/ylyxhz/44r4.png",
        "app_path": "pages/index/index?ald_media_id=5778&ald_link_key=21c462bc56b283b3",
        "name": "快乐游戏盒子",
        "qr_code": "http://ff.td68x.com/xcx/ylyxhz/44xp.png",
        "home_type": 4,
        "home_name": "休闲精选",
        "app_id": ""
    
        */
        _this.data = null;
        _this.icon = null;
        _this.labelName = null;
        _this.labelShadow = null;
        _this._dataDirty = false;
        _this.lastPostTime = 0; //最后一次上报时间
        return _this;
    }
    GameBoxListGameItem.prototype.onLoad = function () {
        var mask = this.node.getChildByName("Mask");
        this.icon = mask.getChildByName("Icon").getComponent(cc.Sprite);
        this.labelName = this.node.getChildByName("Label").getComponent(cc.Label);
        this.labelShadow = this.node.getChildByName("LabelShadow").getComponent(cc.Label);
    };
    GameBoxListGameItem.prototype.init = function (data) {
        this.data = data;
        this._dataDirty = true;
    };
    GameBoxListGameItem.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    };
    GameBoxListGameItem.prototype.onEnable = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            _this._postData(_this.data.app_id);
            if (_this.data.app_id && Utils_1.utils.wechatTool.checkAppId(_this.data.app_id)) {
                Utils_1.utils.showLog("直接跳转!", _this.data.app_id);
                //@ts-ignore
                wx.navigateToMiniProgram({
                    appId: _this.data.app_id,
                    path: _this.data.app_path ? _this.data.app_path : "",
                    success: function (res) {
                    },
                    fail: function (res) {
                        // utils.showLog("跳转失败！", id);
                        Utils_1.utils.showLog("\u8DF3\u8F6C\u5931\u8D25! ; res=" + JSON.stringify(res));
                    }
                });
            }
            else if (_this.data.qr_code) {
                if (PlatUtils_1.default.IsWechat) {
                    Utils_1.utils.showLog("二维码跳转!", _this.data.qr_code);
                    Utils_1.utils.wechatTool.previewImage(_this.data.qr_code);
                }
                else {
                    Utils_1.utils.showLog("不支持二维码跳转!");
                }
            }
        }, this);
    };
    GameBoxListGameItem.prototype.onDisable = function () {
        this.node.targetOff(this);
    };
    GameBoxListGameItem.prototype.updateItem = function () {
        var _this = this;
        if (this.data) {
            if (this.data.name) {
                var gameName = this.data.name;
                if (this.data.name.length > 4) {
                    gameName = gameName.slice(0, 4);
                    gameName += "...";
                }
                this.labelName.string = gameName;
                this.labelShadow.string = gameName;
            }
            if (this.data.icon) {
                CompatibleTool_1.default.LoadRes(this.data.icon, function (err, texture) {
                    if (!err && cc.isValid(_this) && _this.icon && _this.icon.spriteFrame) {
                        _this.icon.spriteFrame = new cc.SpriteFrame(texture);
                    }
                });
            }
        }
    };
    GameBoxListGameItem.prototype._postData = function (appid) {
        // let curTime: number = new Date().getTime();
        // let interval: number = (curTime - this.lastPostTime) / 1000;
        // if (interval >= 3) {
        var url = "https://apps.youlesp.com/gbs?m=rclickV2&app_id=" + appid + "&game_id=" + Utils_1.utils.config.wechatconfig.appID;
        Utils_1.utils.showLog("上报数据, url=", url);
        Utils_1.utils.commomHttpRequest(url, function (ret, data) {
            if (ret) {
                // this.lastPostTime = curTime;
                Utils_1.utils.showLog("数据上报成功！");
            }
            else {
                Utils_1.utils.showLog("数据上报失败！");
            }
        });
        // } else {
        //     cc.warn("上报的间隔时间小于3秒");
        // }
    };
    GameBoxListGameItem = __decorate([
        ccclass
    ], GameBoxListGameItem);
    return GameBoxListGameItem;
}(cc.Component));
exports.default = GameBoxListGameItem;

cc._RF.pop();