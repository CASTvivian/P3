"use strict";
cc._RF.push(module, '038c46RnHFFRL5OfKlehQWS', 'TryGameNode');
// common-plugin/Scripts/TryGameNode.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TryGameNode = /** @class */ (function (_super) {
    __extends(TryGameNode, _super);
    function TryGameNode() {
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
    TryGameNode.prototype.onLoad = function () {
        this._icon = cc.find("Mask/Icon", this.node).getComponent(cc.Sprite);
        this._mask = cc.find("Mask", this.node);
        // this._nameLabel = cc.find("NameLabel", this.node).getComponent(cc.Label);
        // this._nameLabel.string = "";
    };
    /**
     *
     * @param data 交叉推广数据
     * data:{
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
     * }
     *
     */
    TryGameNode.prototype.init = function (data) {
        this._data = data;
        if (this._data) {
            this._jumpInfo = this._data.jump_list;
            this._gameJumpInterval = this._data.jump_refresh_time;
            this._isFirst = true;
            this.node.active = false;
        }
        else {
            this.node.active = false;
        }
    };
    /**
     * 跳转成功过后显示下一个
     */
    TryGameNode.prototype.showNextItem = function () {
        this.unscheduleAllCallbacks();
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
    };
    TryGameNode.prototype.onEnable = function () {
        var _this = this;
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (_this._jumpInfo[_this._index] && _this._jumpInfo[_this._index].appid) {
                Utils_1.utils.showLog("\u5C0F\u6E38\u620F\u8DF3\u8F6C! info=" + _this._jumpInfo[_this._index]);
                if (PlatUtils_1.default.IsDouyin) {
                    Utils_1.utils.Tool_Douyin.showMoreGamesModal();
                }
                else if (PlatUtils_1.default.IsQQ) {
                    Utils_1.utils.adManager.ShowAppBox(true);
                }
                else {
                    var index_1 = _this._index;
                    _this._postClickData(_this._jumpInfo[index_1].appid);
                    Utils_1.utils.navigateToMiniGame(_this._jumpInfo[index_1], function (ret) {
                        if (ret) {
                            // 上报数据
                            if (_this._jumpInfo && _this._jumpInfo[index_1] && _this._jumpInfo[index_1].appid) {
                                _this._postData(_this._jumpInfo[index_1].appid);
                            }
                        }
                    });
                }
                _this.showNextItem();
            }
        }, this);
    };
    TryGameNode.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
    };
    TryGameNode.prototype.jump = function () {
        var _this = this;
        if (this._jumping)
            return;
        this._jumping = true;
        this._index = this._index + 1;
        if (this._index >= this._jumpInfo.length) {
            this._index = 0;
        }
        var contentSize = this._icon.node.getContentSize();
        if (this._jumpInfo[this._index] && this._jumpInfo[this._index].icon) {
            // this._setName(this._jumpInfo[this._index].name);
            var remoteUrl = this._jumpInfo[this._index].icon;
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
        }
        else {
            this._jumping = false;
        }
    };
    TryGameNode.prototype._setName = function (name) {
        if (!name) {
            this._nameLabel.string = "";
        }
        else {
            if (name.length > 5) {
                this._nameLabel.string = name.slice(0, 5) + "...";
                this._nameLabel.node.scale = 0.7;
            }
            else {
                this._nameLabel.string = name;
            }
        }
    };
    // _postData(appid: string) {
    //     utils.postData(appid);
    // }
    /**
     * 上报跳转成功
     * @param appid
     */
    TryGameNode.prototype._postData = function (appid) {
        Utils_1.utils.postDataByLocation(appid, YZ_Constant_1.SubLocation.isTryGame, 1);
    };
    /**
     * 上报点击
     * @param appid
     */
    TryGameNode.prototype._postClickData = function (appid) {
        Utils_1.utils.postDataByLocation(appid, YZ_Constant_1.SubLocation.isTryGame, 0);
    };
    TryGameNode = __decorate([
        ccclass
    ], TryGameNode);
    return TryGameNode;
}(cc.Component));
exports.default = TryGameNode;

cc._RF.pop();