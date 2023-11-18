"use strict";
cc._RF.push(module, 'e2d27IwlQ5B5pmeL0p/D+5H', 'GameItem');
// common-plugin/Scripts/GameItem.ts

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
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameItem = /** @class */ (function (_super) {
    __extends(GameItem, _super);
    function GameItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*
        {
            "icon": "http://ff.td68x.com/xcx/ylyxhz/451m.png",
            "name": "点亮它的色彩",
            "path": "",
            "qr_code": "",
            "appid": "wx35562d816d9ed9fb"
        }
        */
        _this.data = null;
        _this.icon = null;
        _this.labelName = null;
        _this.labelShadow = null;
        _this._dataDirty = false;
        _this._redPoint = null;
        _this._location = null;
        _this.mask = null;
        _this._subNameLength = 4;
        return _this;
    }
    GameItem.prototype.onLoad = function () {
        this.mask = this.node.getChildByName("Mask");
        this.icon = this.mask.getChildByName("Icon").getComponent(cc.Sprite);
        this.labelName = this.node.getChildByName("Label").getComponent(cc.Label);
        this.labelShadow = this.node.getChildByName("LabelShadow").getComponent(cc.Label);
        if (this._location && (this._location == YZ_Constant_1.SubLocation.isYzBanner || this._location == YZ_Constant_1.SubLocation.isScrollbar || this._location == YZ_Constant_1.SubLocation.isMoreGame || this._location == YZ_Constant_1.SubLocation.isBoxInsertAd || this._location == YZ_Constant_1.SubLocation.isBeforGameOverAd)) {
            this._redPoint = this.mask.getChildByName("redpoint");
            if (this.data && this.data.red && this.data.red != "0") {
                if (this.data.red == "1") {
                    this._redPoint.getComponent("YZ_ActionScale").isRunAction = false;
                }
            }
            else {
                this._redPoint && this._redPoint.destroy();
            }
        }
    };
    GameItem.prototype.init = function (data, location) {
        this.data = data;
        this._dataDirty = true;
        this._location = location;
        var checkSubString = [YZ_Constant_1.SubLocation.isBoxInsertAd, YZ_Constant_1.SubLocation.isBeforGameOverAd, YZ_Constant_1.SubLocation.isVerticalPanel];
        if (checkSubString.indexOf(this._location) > -1) {
            this._subNameLength = 6;
        }
        else if (this._location == YZ_Constant_1.SubLocation.isMoreGame) {
            this._subNameLength = 8;
        }
    };
    GameItem.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    };
    GameItem.prototype.onEnable = function () {
        var _this = this;
        if (!this.data)
            return;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (PlatUtils_1.default.IsDouyin) {
                Utils_1.utils.Tool_Douyin.showMoreGamesModal();
                return;
            }
            _this._postClickData(_this.data.appid);
            if (_this.data.is_jump && _this.data.is_jump == "true" && _this.data.appid) {
                Utils_1.utils.showLog("直接跳转!", _this.data.appid);
                Utils_1.utils.navigateToMiniGame(_this.data, function (ret) {
                    if (ret) {
                        // 上报数据
                        if (_this.data && _this.data.appid) {
                            _this._postData(_this.data.appid);
                        }
                    }
                });
            }
            else if (_this.data.is_jump && _this.data.is_jump == "false" && _this.data.qr_code) {
                if (PlatUtils_1.default.IsWechat) {
                    Utils_1.utils.showLog("二维码跳转!", _this.data.qr_code);
                    Utils_1.utils.wechatTool.previewImage(_this.data.qr_code);
                    // 上报数据
                    if (_this.data && _this.data.appid) {
                        _this._postData(_this.data.appid);
                    }
                }
                else {
                    Utils_1.utils.showLog("不支持二维码跳转!");
                }
            }
            else {
                Utils_1.utils.showLog("没有is_jump直接跳转!", _this.data.appid);
                if (_this.data.appid) {
                    Utils_1.utils.navigateToMiniGame(_this.data, function (ret) {
                        if (ret) {
                            // 上报数据
                            if (_this.data.appid) {
                                _this._postData(_this.data.appid);
                            }
                        }
                    });
                }
            }
        }, this);
    };
    GameItem.prototype.onDisable = function () {
        this.node.targetOff(this);
    };
    GameItem.prototype.updateItem = function () {
        var _this = this;
        if (this.data) {
            if (this.data.name) {
                var gameName = this.data.name;
                if (this.data.name.length > this._subNameLength) {
                    gameName = gameName.slice(0, this._subNameLength);
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
        else {
            this.mask.active = false;
        }
    };
    /**
      * 上报跳转成功
      * @param appid
      */
    GameItem.prototype._postData = function (appid) {
        Utils_1.utils.postDataByLocation(appid, this._location, 1);
    };
    /**
     * 上报点击
     * @param appid
     */
    GameItem.prototype._postClickData = function (appid) {
        Utils_1.utils.postDataByLocation(appid, this._location, 0);
    };
    GameItem = __decorate([
        ccclass
    ], GameItem);
    return GameItem;
}(cc.Component));
exports.default = GameItem;

cc._RF.pop();