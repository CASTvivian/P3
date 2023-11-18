"use strict";
cc._RF.push(module, '3f5ab/DxFJAZ6TgbVUiQqrS', 'QCrossWidgetItem');
// common-plugin/Scripts/QCrossWidgetItem.ts

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
var QCrossWidgetItem = /** @class */ (function (_super) {
    __extends(QCrossWidgetItem, _super);
    function QCrossWidgetItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*
        {
            "name": "翻滚的香肠大冒险",
            "appid": "wx2c4ed4218224b042",
            "icon": "https://xcx.youletd.com/img/icon/fgdxc.png",
           "logo": "https://xcx.youletd.com/img/logo/4.png",
            "is_jump": "true",
            "path": "",
            "qr_code": "https://xcx.youletd.com/img/qrcode/q_fgdxc.jpg"
        }
        */
        _this.data = null;
        _this._sprite = null;
        _this._dataDirty = false;
        _this._isReward = false;
        _this._location = null;
        return _this;
    }
    QCrossWidgetItem.prototype.onLoad = function () {
        this._sprite = this.node.getComponent(cc.Sprite);
    };
    QCrossWidgetItem.prototype.init = function (data) {
        this.data = data;
        this._dataDirty = true;
    };
    QCrossWidgetItem.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    };
    QCrossWidgetItem.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onItemClickHandler, this);
    };
    QCrossWidgetItem.prototype.onDisable = function () {
        this.node.targetOff(this);
    };
    QCrossWidgetItem.prototype._onItemClickHandler = function () {
        var _this = this;
        console.log("_onItemClickHandler");
        if (PlatUtils_1.default.IsDouyin) {
            Utils_1.utils.Tool_Douyin.showMoreGamesModal();
            return;
        }
        if (this.data && this.data.appid) {
            this._postClickData(this.data.appid);
        }
        //如果是激励模式就直接跳转
        if (this._location == YZ_Constant_1.SubLocation.isReward) {
            Utils_1.utils.navigateToMiniGame(this.data, function (ret) {
                if (ret) {
                    // 上报数据
                    if (_this.data && _this.data.appid) {
                        _this._postData(_this.data.appid);
                    }
                    Utils_1.utils.showLog("激励插屏跳转成功！下发奖励！");
                    Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(ret);
                    Utils_1.utils.adManager.videoCallBack = null;
                }
                else {
                    Utils_1.utils.showLog("激励插屏跳转失败！");
                    Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(false, "获取试玩奖励失败！");
                }
                Utils_1.utils.adManager.videoCallBack = null;
                Utils_1.utils.adManager.hideRewardInsert();
            });
            return;
        }
        if (this.data.is_jump && this.data.is_jump == "true" && this.data.appid) {
            Utils_1.utils.showLog("直接跳转!", this.data.appid);
            Utils_1.utils.navigateToMiniGame(this.data, function (ret) {
                if (ret) {
                    // 上报数据
                    if (_this.data && _this.data.appid) {
                        _this._postData(_this.data.appid);
                    }
                }
            });
        }
        else if (this.data.is_jump && this.data.is_jump == "false" && this.data.qr_code) {
            if (PlatUtils_1.default.IsWechat) {
                Utils_1.utils.showLog("二维码跳转!", this.data.qr_code);
                Utils_1.utils.wechatTool.previewImage(this.data.qr_code);
                // // 上报数据
                // if (this.data && this.data.appid) {
                //     this._postData(this.data.appid);
                // }
            }
            else {
                Utils_1.utils.showLog("不支持二维码跳转!");
            }
        }
        else {
            Utils_1.utils.showLog("没有is_jump直接跳转!", this.data.appid);
            if (this.data.appid) {
                Utils_1.utils.navigateToMiniGame(this.data, function (ret) {
                    if (ret) {
                        // 上报数据
                        if (_this.data.appid) {
                            _this._postData(_this.data.appid);
                        }
                    }
                });
            }
        }
    };
    QCrossWidgetItem.prototype.updateItem = function () {
        var _this = this;
        if (this.data && this.data.logo) {
            var temp = cc.loader.getRes(this.data.logo);
            if (temp) {
                if (cc.isValid(this) && this._sprite) {
                    var size = this.node.getContentSize();
                    this._sprite.spriteFrame = new cc.SpriteFrame(temp);
                    this.node.setContentSize(size);
                }
            }
            else {
                CompatibleTool_1.default.LoadRes(this.data.logo, function (err, texture) {
                    if (!err && cc.isValid(_this) && _this._sprite) {
                        var size = _this.node.getContentSize();
                        _this._sprite.spriteFrame = new cc.SpriteFrame(texture);
                        _this.node.setContentSize(size);
                    }
                });
            }
        }
    };
    /**
     * 上报跳转成功
     * @param appid
     */
    QCrossWidgetItem.prototype._postData = function (appid) {
        Utils_1.utils.postDataByLocation(appid, this._location, 1);
    };
    /**
     * 上报点击
     * @param appid
     */
    QCrossWidgetItem.prototype._postClickData = function (appid) {
        Utils_1.utils.postDataByLocation(appid, this._location, 0);
    };
    QCrossWidgetItem = __decorate([
        ccclass
    ], QCrossWidgetItem);
    return QCrossWidgetItem;
}(cc.Component));
exports.default = QCrossWidgetItem;

cc._RF.pop();