
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GameBoxSlideItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZUJveFNsaWRlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMseUNBQW9DO0FBQ3BDLG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7R0FFRztBQUVIO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBd0hDO1FBdEhHLFVBQUksR0FBUSxJQUFJLENBQUM7UUFDakIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFDN0IsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsa0JBQVksR0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVOztRQWlIcEMsaUJBQWlCO0lBQ3JCLENBQUM7SUEvR0csaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLDJCQUEyQjtJQUMzQixJQUFJO0lBRUo7O09BRUc7SUFDTyxpQ0FBTSxHQUFoQjtJQUVBLENBQUM7SUFHRDs7T0FFRztJQUNPLHVDQUFZLEdBQXRCO0lBRUEsQ0FBQztJQUdEOztPQUVHO0lBQ0ksbUNBQVEsR0FBZixVQUFnQixJQUFZO1FBQ3hCLGFBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sRUFBVTtRQUNiLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJ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SSxHQUFHLEdBQVcsb0RBQWtELEtBQUssaUJBQVksYUFBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBTyxDQUFDO1FBQ3ZILGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLGFBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtZQUNuQyxJQUFJLEdBQUcsRUFBRTtnQkFDTCwrQkFBK0I7Z0JBQy9CLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsV0FBVztRQUNYLDhCQUE4QjtRQUM5QixJQUFJO0lBRVIsQ0FBQztJQXJIZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0F3SHBDO0lBQUQsdUJBQUM7Q0F4SEQsQUF3SEMsQ0F4SDZDLEVBQUUsQ0FBQyxTQUFTLEdBd0h6RDtrQkF4SG9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+ebkuWtkOmhtumDqOeahOW5u+eBr+eJh1xyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJveFNsaWRlSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YTogYW55ID0gbnVsbDtcclxuICAgIGl0ZW1TcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgbGFzdFBvc3RUaW1lOiBudW1iZXIgPSAwOyAvL+acgOWQjuS4gOasoeS4iuaKpeaXtumXtFxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtU3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgfVxyXG4gICAgLy8gc3RhcnQoKSB7XHJcbiAgICAvLyAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIC8vICAgICB0aGlzLmluaXRMaXN0ZW5lcigpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWVUlcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXRVaSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW55uR5ZCs5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0TGlzdGVuZXIoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoZGF0YTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIiNzbGlkZURhdGE9XCIsIGRhdGEpXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIChldmVudDogY2MuRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcG9zdERhdGEodGhpcy5kYXRhLmFwcF9pZCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuYXBwX2lkICYmIHV0aWxzLndlY2hhdFRvb2wuY2hlY2tBcHBJZCh0aGlzLmRhdGEuYXBwX2lkKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnm7TmjqXot7PovawhXCIsIHRoaXMuZGF0YS5hcHBfaWQpO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcElkOiB0aGlzLmRhdGEuYXBwX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMuZGF0YS5hcHBfcGF0aCA/IHRoaXMuZGF0YS5hcHBfcGF0aCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLot7PovazlpLHotKXvvIFcIiwgaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKGDot7PovazlpLHotKUhICByZXM9JHtKU09OLnN0cmluZ2lmeShyZXMpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5xcl9jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUGxhdFV0aWxzLklzV2VjaGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS6jOe7tOeggei3s+i9rCFcIiwgdGhpcy5kYXRhLnFyX2NvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLndlY2hhdFRvb2wucHJldmlld0ltYWdlKHRoaXMuZGF0YS5xcl9jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIrmiqXmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5hcHBfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fcG9zdERhdGEodGhpcy5kYXRhLmFwcF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiN5pSv5oyB5LqM57u056CB6Lez6L2sIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuYmFubmVyKSB7XHJcbiAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXModGhpcy5kYXRhLmJhbm5lciwgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhlcnIsIFwiZXJyXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuaXRlbVNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2codGhpcy5ub2RlLmFjdGl2ZSwgXCJub2RlIDw8PFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBfcG9zdERhdGEoYXBwaWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGxldCBjdXJUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyBsZXQgaW50ZXJ2YWw6IG51bWJlciA9IChjdXJUaW1lIC0gdGhpcy5sYXN0UG9zdFRpbWUpIC8gMTAwMDtcclxuXHJcbiAgICAgICAgLy8gaWYgKGludGVydmFsID49IDMpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBgaHR0cHM6Ly9hcHBzLnlvdWxlc3AuY29tL2dicz9tPXJjbGlja1YyJmFwcF9pZD0ke2FwcGlkfSZnYW1lX2lkPSR7dXRpbHMuY29uZmlnLndlY2hhdGNvbmZpZy5hcHBJRH1gO1xyXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLkuIrmiqXmlbDmja4sIHVybD1cIiwgdXJsKTtcclxuICAgICAgICB1dGlscy5jb21tb21IdHRwUmVxdWVzdCh1cmwsIChyZXQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sYXN0UG9zdFRpbWUgPSBjdXJUaW1lO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuaVsOaNruS4iuaKpeaIkOWKn++8gVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmlbDmja7kuIrmiqXlpLHotKXvvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBjYy53YXJuKFwi5LiK5oql55qE6Ze06ZqU5pe26Ze05bCP5LqOM+enklwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19