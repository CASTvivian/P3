
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GameItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLHlDQUFvQztBQUNwQyw2Q0FBNEM7QUFDNUMsbURBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBeUpDO1FBdkpHOzs7Ozs7OztVQVFFO1FBQ0YsVUFBSSxHQUFRLElBQUksQ0FBQztRQUVqQixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBQ3ZCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFDM0IsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUNuQixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUNyQyxVQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLG9CQUFjLEdBQVcsQ0FBQyxDQUFDOztJQW9JL0IsQ0FBQztJQWxJRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxj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QyxPQUFPLENBQUMsS0FBSSxDQUFDLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDaEUsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN2RDtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUVMLENBQUM7SUFFRDs7O1FBR0k7SUFDSiw0QkFBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixhQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdEOzs7T0FHRztJQUNILGlDQUFjLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBeEpnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBeUo1QjtJQUFELGVBQUM7Q0F6SkQsQUF5SkMsQ0F6SnFDLEVBQUUsQ0FBQyxTQUFTLEdBeUpqRDtrQkF6Sm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8qXHJcbiAgICB7XHJcbiAgICAgICAgXCJpY29uXCI6IFwiaHR0cDovL2ZmLnRkNjh4LmNvbS94Y3gveWx5eGh6LzQ1MW0ucG5nXCIsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwi54K55Lqu5a6D55qE6Imy5b2pXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiXCIsXHJcbiAgICAgICAgXCJxcl9jb2RlXCI6IFwiXCIsXHJcbiAgICAgICAgXCJhcHBpZFwiOiBcInd4MzU1NjJkODE2ZDllZDlmYlwiXHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgZGF0YTogYW55ID0gbnVsbDtcclxuXHJcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgbGFiZWxOYW1lOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBsYWJlbFNoYWRvdzogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIF9kYXRhRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIF9yZWRQb2ludDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgX2xvY2F0aW9uOiBTdWJMb2NhdGlvbiA9IG51bGw7XHJcbiAgICBtYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIF9zdWJOYW1lTGVuZ3RoOiBudW1iZXIgPSA0O1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1hc2sgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMubWFzay5nZXRDaGlsZEJ5TmFtZShcIkljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5sYWJlbE5hbWUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGFiZWxTaGFkb3cgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFNoYWRvd1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2NhdGlvbiAmJiAodGhpcy5fbG9jYXRpb24gPT0gU3ViTG9jYXRpb24uaXNZekJhbm5lciB8fCB0aGlzLl9sb2NhdGlvbiA9PSBTdWJMb2NhdGlvbi5pc1Njcm9sbGJhciB8fCB0aGlzLl9sb2NhdGlvbiA9PSBTdWJMb2NhdGlvbi5pc01vcmVHYW1lIHx8IHRoaXMuX2xvY2F0aW9uID09IFN1YkxvY2F0aW9uLmlzQm94SW5zZXJ0QWQgfHwgdGhpcy5fbG9jYXRpb24gPT0gU3ViTG9jYXRpb24uaXNCZWZvckdhbWVPdmVyQWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZFBvaW50ID0gdGhpcy5tYXNrLmdldENoaWxkQnlOYW1lKFwicmVkcG9pbnRcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLnJlZCAmJiB0aGlzLmRhdGEucmVkICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnJlZCA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZFBvaW50LmdldENvbXBvbmVudChcIllaX0FjdGlvblNjYWxlXCIpLmlzUnVuQWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWRQb2ludCAmJiB0aGlzLl9yZWRQb2ludC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoZGF0YTogYW55LCBsb2NhdGlvbjogU3ViTG9jYXRpb24pIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fbG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBsZXQgY2hlY2tTdWJTdHJpbmcgPSBbU3ViTG9jYXRpb24uaXNCb3hJbnNlcnRBZCwgU3ViTG9jYXRpb24uaXNCZWZvckdhbWVPdmVyQWQsIFN1YkxvY2F0aW9uLmlzVmVydGljYWxQYW5lbF1cclxuICAgICAgICBpZiAoY2hlY2tTdWJTdHJpbmcuaW5kZXhPZih0aGlzLl9sb2NhdGlvbikgPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJOYW1lTGVuZ3RoID0gNjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2F0aW9uID09IFN1YkxvY2F0aW9uLmlzTW9yZUdhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3ViTmFtZUxlbmd0aCA9IDg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRhKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2ZW50OiBjYy5FdmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0RvdXlpbikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuVG9vbF9Eb3V5aW4uc2hvd01vcmVHYW1lc01vZGFsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcG9zdENsaWNrRGF0YSh0aGlzLmRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmlzX2p1bXAgJiYgdGhpcy5kYXRhLmlzX2p1bXAgPT0gXCJ0cnVlXCIgJiYgdGhpcy5kYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55u05o6l6Lez6L2sIVwiLCB0aGlzLmRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMubmF2aWdhdGVUb01pbmlHYW1lKHRoaXMuZGF0YSwgKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5LiK5oql5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3N0RGF0YSh0aGlzLmRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmlzX2p1bXAgJiYgdGhpcy5kYXRhLmlzX2p1bXAgPT0gXCJmYWxzZVwiICYmIHRoaXMuZGF0YS5xcl9jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS6jOe7tOeggei3s+i9rCFcIiwgdGhpcy5kYXRhLnFyX2NvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLndlY2hhdFRvb2wucHJldmlld0ltYWdlKHRoaXMuZGF0YS5xcl9jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIrmiqXmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3N0RGF0YSh0aGlzLmRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS4jeaUr+aMgeS6jOe7tOeggei3s+i9rCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5rKh5pyJaXNfanVtcOebtOaOpei3s+i9rCFcIiwgdGhpcy5kYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuYXBwaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5uYXZpZ2F0ZVRvTWluaUdhbWUodGhpcy5kYXRhLCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS4iuaKpeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc3REYXRhKHRoaXMuZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdXBkYXRlSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdhbWVOYW1lOiBzdHJpbmcgPSB0aGlzLmRhdGEubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLm5hbWUubGVuZ3RoID4gdGhpcy5fc3ViTmFtZUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lID0gZ2FtZU5hbWUuc2xpY2UoMCwgdGhpcy5fc3ViTmFtZUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWUgKz0gXCIuLi5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxOYW1lLnN0cmluZyA9IGdhbWVOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbFNoYWRvdy5zdHJpbmcgPSBnYW1lTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pY29uKSB7XHJcbiAgICAgICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKHRoaXMuZGF0YS5pY29uLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLmljb24gJiYgdGhpcy5pY29uLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOS4iuaKpei3s+i9rOaIkOWKn1xyXG4gICAgICAqIEBwYXJhbSBhcHBpZCBcclxuICAgICAgKi9cclxuICAgIF9wb3N0RGF0YShhcHBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdXRpbHMucG9zdERhdGFCeUxvY2F0aW9uKGFwcGlkLCB0aGlzLl9sb2NhdGlvbiwgMSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql54K55Ye7XHJcbiAgICAgKiBAcGFyYW0gYXBwaWQgXHJcbiAgICAgKi9cclxuICAgIF9wb3N0Q2xpY2tEYXRhKGFwcGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB1dGlscy5wb3N0RGF0YUJ5TG9jYXRpb24oYXBwaWQsIHRoaXMuX2xvY2F0aW9uLCAwKTtcclxuICAgIH1cclxufVxyXG4iXX0=