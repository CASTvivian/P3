"use strict";
cc._RF.push(module, 'c237blrR8tFb7rQ6ElVARTM', 'NativeTryGameNode');
// common-plugin/Scripts/NativeTryGameNode.ts

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
var NativeTryGamesWidget_1 = require("./NativeTryGamesWidget");
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NativeTryGameNode = /** @class */ (function (_super) {
    __extends(NativeTryGameNode, _super);
    function NativeTryGameNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._icon = null;
        _this._nameLabel = null;
        _this._gameJumpInterval = -1;
        _this._jumpInfo = null;
        _this._index = -1;
        _this._jumping = false; // 控制是否在跳转
        _this._isFirst = false;
        _this._mask = null;
        return _this;
    }
    NativeTryGameNode.prototype.onLoad = function () {
        this._icon = cc.find("Mask/Icon", this.node).getComponent(cc.Sprite);
        this._mask = cc.find("Mask", this.node);
    };
    /**
     *
     * @param data 交叉推广数据
     * data:[{"date":{
                    "jump_list": [
                        {                                                        // 交叉推广挂件内容信息
                            "icon": "http://xcx.youletd.com/img/icon/fgdxc.png",
                            "name": "翻滚的香肠大冒险",
                            "path": "",
                            "js_jump": "true",
                            "qr_code": "http://xcx.youletd.com/img/qrcode/q_fgdxc.jpg",
                            "appid": "wx2c4ed4218224b042"
                            }
                        ]
                    }
                "tryGameAd":tryGameAd
            }
            ]
     *
     */
    NativeTryGameNode.prototype.init = function (data) {
        this._data = data;
        Utils_1.utils.showLog("原生抖动Node");
        if (this._data) {
            this._jumpInfo = this._data.jump_list;
            this._gameJumpInterval = this._data.jump_refresh_time;
            this._isFirst = true;
            this.node.active = true;
            if (PlatUtils_1.default.IsHuaWei) {
                this.node.getChildByName("source").getComponent(cc.Label).string = this._jumpInfo[this._index].date[0].source ? this._jumpInfo[this._index].date[0].source : "";
            }
        }
        else {
            this.node.active = false;
        }
    };
    /**
     * 跳转成功过后显示下一个
     */
    NativeTryGameNode.prototype.showNextItem = function () {
        this.unscheduleAllCallbacks();
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
    };
    NativeTryGameNode.prototype.onEnable = function () {
        var _this = this;
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (_this.node.opacity == 0)
                return;
            var tryGameAd = _this._jumpInfo[_this._index].tryGameAd;
            var adid = _this._jumpInfo[_this._index].date[0].adId;
            if (tryGameAd) {
                tryGameAd.reportAdClick({
                    adId: adid
                });
                Utils_1.utils.showLog("抖动试玩上报" + "tryGameAd:" + JSON.stringify(tryGameAd) + "adid:" + adid);
            }
            Utils_1.utils.nativeNeedChange = true;
            Utils_1.utils.tryGameDate.splice(_this._index, 1);
            if (Utils_1.utils._nativeTryGameNode) {
                Utils_1.utils._nativeTryGameNode.getComponent(NativeTryGamesWidget_1.default).init();
            }
        }, this);
    };
    NativeTryGameNode.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
    };
    NativeTryGameNode.prototype.jump = function () {
        var _this = this;
        if (this._jumping)
            return;
        this._jumping = true;
        this._index = this._index + 1;
        if (this._index >= this._jumpInfo.length) {
            this._index = 0;
        }
        var contentSize = this._icon.node.getContentSize();
        if (this._jumpInfo[this._index]) {
            var remoteUrl = PlatUtils_1.default.IsOPPO ? this._jumpInfo[this._index].date[0].iconUrlList[0] : this._jumpInfo[this._index].date[0].icon;
            if (!remoteUrl || PlatUtils_1.default.IsHuaWei) {
                remoteUrl = this._jumpInfo[this._index].date[0].imgUrlList[0];
            }
            CompatibleTool_1.default.LoadRes(remoteUrl, function (err, texture) {
                if (!err && cc.isValid(_this) && _this._icon) {
                    _this._icon.spriteFrame = new cc.SpriteFrame(texture);
                    _this._icon.node.setContentSize(contentSize);
                    if (_this._isFirst) {
                        Utils_1.utils.showLog("当前试玩第一次加载！！！！！");
                        _this._mask.active = true;
                        _this._isFirst = false;
                    }
                }
                _this._jumping = false;
            });
            var tryGameAd = this._jumpInfo[this._index].tryGameAd;
            var adid = this._jumpInfo[this._index].date[0].adId;
            if (tryGameAd && !tryGameAd.isReportShow) {
                tryGameAd.reportAdShow({
                    adId: adid
                });
                tryGameAd.isReportShow = true;
            }
        }
        else {
            this._jumping = false;
        }
        this.node.opacity == 0 && (this.node.opacity = 255);
    };
    NativeTryGameNode = __decorate([
        ccclass
    ], NativeTryGameNode);
    return NativeTryGameNode;
}(cc.Component));
exports.default = NativeTryGameNode;

cc._RF.pop();