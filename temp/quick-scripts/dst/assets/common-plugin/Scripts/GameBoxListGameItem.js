
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GameBoxListGameItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZUJveExpc3RHYW1lSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMseUNBQW9DO0FBQ3BDLG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQXFIQztRQW5IRzs7Ozs7Ozs7Ozs7VUFXRTtRQUNGLFVBQUksR0FBUSxJQUFJLENBQUM7UUFFakIsVUFBSSxHQUFjLElBQUksQ0FBQztRQUN2QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVTs7SUFnR3hDLENBQUM7SUE5Rkcsb0NBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLGtDQUFJLEdB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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm94TGlzdEdhbWVJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKlxyXG4gICAge1xyXG4gICAgXCJpZFwiOiAyNzQsXHJcbiAgICBcImljb25cIjogXCJodHRwOi8vZmYudGQ2OHguY29tL3hjeC95bHl4aHovNDRyNC5wbmdcIixcclxuICAgIFwiYXBwX3BhdGhcIjogXCJwYWdlcy9pbmRleC9pbmRleD9hbGRfbWVkaWFfaWQ9NTc3OCZhbGRfbGlua19rZXk9MjFjNDYyYmM1NmIyODNiM1wiLFxyXG4gICAgXCJuYW1lXCI6IFwi5b+r5LmQ5ri45oiP55uS5a2QXCIsXHJcbiAgICBcInFyX2NvZGVcIjogXCJodHRwOi8vZmYudGQ2OHguY29tL3hjeC95bHl4aHovNDR4cC5wbmdcIixcclxuICAgIFwiaG9tZV90eXBlXCI6IDQsXHJcbiAgICBcImhvbWVfbmFtZVwiOiBcIuS8kemXsueyvumAiVwiLFxyXG4gICAgXCJhcHBfaWRcIjogXCJcIlxyXG5cclxuICAgICovXHJcbiAgICBkYXRhOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIGljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBsYWJlbE5hbWU6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIGxhYmVsU2hhZG93OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgX2RhdGFEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGFzdFBvc3RUaW1lOiBudW1iZXIgPSAwOyAvL+acgOWQjuS4gOasoeS4iuaKpeaXtumXtFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBsZXQgbWFzayA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hc2tcIik7XHJcbiAgICAgICAgdGhpcy5pY29uID0gbWFzay5nZXRDaGlsZEJ5TmFtZShcIkljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5sYWJlbE5hbWUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGFiZWxTaGFkb3cgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFNoYWRvd1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZXZlbnQ6IGNjLkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc3REYXRhKHRoaXMuZGF0YS5hcHBfaWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmFwcF9pZCAmJiB1dGlscy53ZWNoYXRUb29sLmNoZWNrQXBwSWQodGhpcy5kYXRhLmFwcF9pZCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55u05o6l6Lez6L2sIVwiLCB0aGlzLmRhdGEuYXBwX2lkKTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBJZDogdGhpcy5kYXRhLmFwcF9pZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiB0aGlzLmRhdGEuYXBwX3BhdGggPyB0aGlzLmRhdGEuYXBwX3BhdGggOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwi6Lez6L2s5aSx6LSl77yBXCIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhg6Lez6L2s5aSx6LSlISA7IHJlcz0ke0pTT04uc3RyaW5naWZ5KHJlcyl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLnFyX2NvZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNXZWNoYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LqM57u056CB6Lez6L2sIVwiLCB0aGlzLmRhdGEucXJfY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMud2VjaGF0VG9vbC5wcmV2aWV3SW1hZ2UodGhpcy5kYXRhLnFyX2NvZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiN5pSv5oyB5LqM57u056CB6Lez6L2sIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lTmFtZTogc3RyaW5nID0gdGhpcy5kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLm5hbWUubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOYW1lID0gZ2FtZU5hbWUuc2xpY2UoMCwgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5hbWUgKz0gXCIuLi5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxOYW1lLnN0cmluZyA9IGdhbWVOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbFNoYWRvdy5zdHJpbmcgPSBnYW1lTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pY29uKSB7XHJcbiAgICAgICAgICAgICAgICBDb21wYXRpYmxlVG9vbC5Mb2FkUmVzKHRoaXMuZGF0YS5pY29uLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLmljb24gJiYgdGhpcy5pY29uLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgX3Bvc3REYXRhKGFwcGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBsZXQgY3VyVGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy8gbGV0IGludGVydmFsOiBudW1iZXIgPSAoY3VyVGltZSAtIHRoaXMubGFzdFBvc3RUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgLy8gaWYgKGludGVydmFsID49IDMpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBgaHR0cHM6Ly9hcHBzLnlvdWxlc3AuY29tL2dicz9tPXJjbGlja1YyJmFwcF9pZD0ke2FwcGlkfSZnYW1lX2lkPSR7dXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5hcHBJRH1gO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXmlbDmja4sIHVybD1cIiwgdXJsKTtcclxuICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sYXN0UG9zdFRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBjYy53YXJuKFwi5LiK5oql55qE6Ze06ZqU5pe26Ze05bCP5LqOM+enklwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=