"use strict";
cc._RF.push(module, '1e163lFRMhCM4Xj0GBex74Z', 'GameBoxSlideItem');
// common-plugin/Scripts/GameBoxSlideItem.ts

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
/**
 * 游戏盒子顶部的幻灯片
 */
var GameBoxSlideItem = /** @class */ (function (_super) {
    __extends(GameBoxSlideItem, _super);
    function GameBoxSlideItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        _this.itemSprite = null;
        _this._dataDirty = false;
        _this.lastPostTime = 0; //最后一次上报时间
        return _this;
        // update (dt) {}
    }
    GameBoxSlideItem.prototype.onLoad = function () {
        this.itemSprite = this.node.getComponent(cc.Sprite);
    };
    // start() {
    //     this.initUi();
    //     this.initListener();
    // }
    /**
     * 初始化UI
     */
    GameBoxSlideItem.prototype.initUi = function () {
    };
    /**
     * 初始化监听事件
     */
    GameBoxSlideItem.prototype.initListener = function () {
    };
    /**
     * 初始化数据
     */
    GameBoxSlideItem.prototype.initData = function (data) {
        Utils_1.utils.showLog("#slideData=", data);
        this.data = data;
        this._dataDirty = true;
    };
    GameBoxSlideItem.prototype.update = function (dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    };
    GameBoxSlideItem.prototype.onEnable = function () {
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
                        Utils_1.utils.showLog("\u8DF3\u8F6C\u5931\u8D25!  res=" + JSON.stringify(res));
                    }
                });
            }
            else if (_this.data.qr_code) {
                if (PlatUtils_1.default.IsWechat) {
                    Utils_1.utils.showLog("二维码跳转!", _this.data.qr_code);
                    Utils_1.utils.wechatTool.previewImage(_this.data.qr_code);
                    // 上报数据
                    // if (this.data && this.data.app_id) {
                    //     this._postData(this.data.app_id);
                    // }
                }
                else {
                    Utils_1.utils.showLog("不支持二维码跳转!");
                }
            }
        }, this);
    };
    GameBoxSlideItem.prototype.onDisable = function () {
        this.node.targetOff(this);
    };
    GameBoxSlideItem.prototype.updateItem = function () {
        var _this = this;
        if (this.data && this.data.banner) {
            CompatibleTool_1.default.LoadRes(this.data.banner, function (err, texture) {
                Utils_1.utils.showLog(err, "err");
                if (!err && cc.isValid(_this) && _this.itemSprite) {
                    Utils_1.utils.showLog(_this.node.active, "node <<<");
                    _this.itemSprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        }
    };
    GameBoxSlideItem.prototype._postData = function (appid) {
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
    GameBoxSlideItem = __decorate([
        ccclass
    ], GameBoxSlideItem);
    return GameBoxSlideItem;
}(cc.Component));
exports.default = GameBoxSlideItem;

cc._RF.pop();