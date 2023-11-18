
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/TryGameNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcVHJ5R2FtZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLDZDQUE0QztBQUM1Qyx5Q0FBb0M7QUFDcEMsbURBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBMEpDO1FBekpHLFdBQUssR0FBUSxJQUFJLENBQUM7UUFDbEIsV0FBSyxHQUFjLElBQUksQ0FBQztRQUN4QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1Qix1QkFBaUIsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUMvQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQixjQUFRLEdBQVksS0FBSyxDQUFDLENBQUMsVUFBVTtRQUNyQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFdBQUssR0FBWSxJQUFJLENBQUM7O0lBaUoxQixDQUFDO0lBL0lHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLDRFQUE0RTtRQUM1RSwrQkFBK0I7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0ksMEJBQUksR0FBWCxVQUFZLElBQVM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGtDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFBQSxpQkEwQkM7UUF6QkcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUs7WUFDOUMsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xFLGFBQUssQ0FBQyxPQUFPLENBQUMsMENBQWUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxtQkFBUyxDQUFDLFFBQVEsRUFBRTtvQkFDcEIsYUFBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMxQztxQkFBTSxJQUFJLG1CQUFTLENBQUMsSUFBSSxFQUFFO29CQUN2QixhQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEM7cUJBQU07b0JBQ0gsSUFBSSxPQUFLLEdBQVcsS0FBSSxDQUFDLE1BQU0sQ0FBQztvQkFDaEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxhQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFLLENBQUMsRUFBRSxVQUFDLEdBQUc7d0JBQ2hELElBQUksR0FBRyxFQUFFOzRCQUNMLE9BQU87NEJBQ1AsSUFBSSxLQUFJLENBQUMsU0FBUyxJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0NBQ3hFLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDL0M7eUJBQ0o7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBRXZCO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUFBLGlCQTRCQztRQTNCRyxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUUxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUNELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25ELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ2pFLG1EQUFtRDtZQUNuRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakQsd0JBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87Z0JBQzNDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsS0FBSyxFQUFFO29CQUN4QyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNmLGFBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDaEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUN6QixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztxQkFDekI7aUJBQ0o7Z0JBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUMvQjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNqQztTQUNKO0lBQ0wsQ0FBQztJQUVELDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IsSUFBSTtJQUVKOzs7T0FHRztJQUNILCtCQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUseUJBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUdEOzs7T0FHRztJQUNILG9DQUFjLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUseUJBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQXhKZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTBKL0I7SUFBRCxrQkFBQztDQTFKRCxBQTBKQyxDQTFKd0MsRUFBRSxDQUFDLFNBQVMsR0EwSnBEO2tCQTFKb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcnlHYW1lTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBfZGF0YTogYW55ID0gbnVsbDtcclxuICAgIF9pY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgX25hbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgX2dhbWVKdW1wSW50ZXJ2YWw6IG51bWJlciA9IC0xO1xyXG4gICAgX2p1bXBJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgX2luZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIF9qdW1waW5nOiBib29sZWFuID0gZmFsc2U7IC8vIOaOp+WItuaYr+WQpuWcqOi3s+i9rFxyXG4gICAgX2lzRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9tYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5faWNvbiA9IGNjLmZpbmQoXCJNYXNrL0ljb25cIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLl9tYXNrID0gY2MuZmluZChcIk1hc2tcIiwgdGhpcy5ub2RlKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5fbmFtZUxhYmVsID0gY2MuZmluZChcIk5hbWVMYWJlbFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy8gdGhpcy5fbmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIOS6pOWPieaOqOW5v+aVsOaNrlxyXG4gICAgICogZGF0YTp7XHJcblx0ICAgXCJqdW1wX2xpc3RcIjogW1xyXG4gICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS6pOWPieaOqOW5v+aMguS7tuWGheWuueS/oeaBr1xyXG5cdFx0ICAgIFwiaWNvblwiOiBcImh0dHA6Ly94Y3gueW91bGV0ZC5jb20vaW1nL2ljb24vZmdkeGMucG5nXCIsXHJcblx0XHQgICAgXCJuYW1lXCI6IFwi57+75rua55qE6aaZ6IKg5aSn5YaS6ZmpXCIsXHJcblx0XHQgICAgXCJwYXRoXCI6IFwiXCIsXHJcblx0XHQgICAgXCJqc19qdW1wXCI6IFwidHJ1ZVwiLFxyXG5cdFx0ICAgIFwicXJfY29kZVwiOiBcImh0dHA6Ly94Y3gueW91bGV0ZC5jb20vaW1nL3FyY29kZS9xX2ZnZHhjLmpwZ1wiLFxyXG5cdFx0ICAgIFwiYXBwaWRcIjogXCJ3eDJjNGVkNDIxODIyNGIwNDJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICogfVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2p1bXBJbmZvID0gdGhpcy5fZGF0YS5qdW1wX2xpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2dhbWVKdW1wSW50ZXJ2YWwgPSB0aGlzLl9kYXRhLmp1bXBfcmVmcmVzaF90aW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0ZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PovazmiJDlip/ov4flkI7mmL7npLrkuIvkuIDkuKpcclxuICAgICAqL1xyXG4gICAgc2hvd05leHRJdGVtKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuanVtcCgpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5qdW1wLCB0aGlzLl9nYW1lSnVtcEludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuanVtcCwgdGhpcy5fZ2FtZUp1bXBJbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2p1bXBJbmZvW3RoaXMuX2luZGV4XSAmJiB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uYXBwaWQpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coYOWwj+a4uOaIj+i3s+i9rCEgaW5mbz0ke3RoaXMuX2p1bXBJbmZvW3RoaXMuX2luZGV4XX1gKTtcclxuICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5Ub29sX0RvdXlpbi5zaG93TW9yZUdhbWVzTW9kYWwoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxhdFV0aWxzLklzUVEpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd0FwcEJveCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLl9pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3N0Q2xpY2tEYXRhKHRoaXMuX2p1bXBJbmZvW2luZGV4XS5hcHBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMubmF2aWdhdGVUb01pbmlHYW1lKHRoaXMuX2p1bXBJbmZvW2luZGV4XSwgKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkuIrmiqXmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qdW1wSW5mbyAmJiB0aGlzLl9qdW1wSW5mb1tpbmRleF0gJiYgdGhpcy5fanVtcEluZm9baW5kZXhdLmFwcGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zdERhdGEodGhpcy5fanVtcEluZm9baW5kZXhdLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV4dEl0ZW0oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9qdW1waW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2p1bXBpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9pbmRleCA9IHRoaXMuX2luZGV4ICsgMTtcclxuICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gdGhpcy5fanVtcEluZm8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gdGhpcy5faWNvbi5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2p1bXBJbmZvW3RoaXMuX2luZGV4XSAmJiB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uaWNvbikge1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9zZXROYW1lKHRoaXMuX2p1bXBJbmZvW3RoaXMuX2luZGV4XS5uYW1lKTtcclxuICAgICAgICAgICAgbGV0IHJlbW90ZVVybCA9IHRoaXMuX2p1bXBJbmZvW3RoaXMuX2luZGV4XS5pY29uO1xyXG4gICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKHJlbW90ZVVybCwgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLl9pY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pY29uLm5vZGUuc2V0Q29udGVudFNpemUoY29udGVudFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3or5XnjqnnrKzkuIDmrKHliqDovb3vvIHvvIHvvIHvvIHvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNGaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2p1bXBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmFtZUxhYmVsLnN0cmluZyA9IG5hbWUuc2xpY2UoMCwgNSkgKyBcIi4uLlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmFtZUxhYmVsLm5vZGUuc2NhbGUgPSAwLjc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lTGFiZWwuc3RyaW5nID0gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBfcG9zdERhdGEoYXBwaWQ6IHN0cmluZykge1xyXG4gICAgLy8gICAgIHV0aWxzLnBvc3REYXRhKGFwcGlkKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpei3s+i9rOaIkOWKn1xyXG4gICAgICogQHBhcmFtIGFwcGlkIFxyXG4gICAgICovXHJcbiAgICBfcG9zdERhdGEoYXBwaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHV0aWxzLnBvc3REYXRhQnlMb2NhdGlvbihhcHBpZCwgU3ViTG9jYXRpb24uaXNUcnlHYW1lLCAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXngrnlh7tcclxuICAgICAqIEBwYXJhbSBhcHBpZCBcclxuICAgICAqL1xyXG4gICAgX3Bvc3RDbGlja0RhdGEoYXBwaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHV0aWxzLnBvc3REYXRhQnlMb2NhdGlvbihhcHBpZCwgU3ViTG9jYXRpb24uaXNUcnlHYW1lLCAwKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19