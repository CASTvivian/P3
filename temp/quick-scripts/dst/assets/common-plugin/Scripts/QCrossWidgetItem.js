
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/QCrossWidgetItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUUNyb3NzV2lkZ2V0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMseUNBQW9DO0FBQ3BDLDZDQUE0QztBQUM1QyxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUEwSkM7UUF4Skc7Ozs7Ozs7Ozs7VUFVRTtRQUNGLFVBQUksR0FBUSxJQUFJLENBQUM7UUFFVCxhQUFPLEdBQWMsSUFBSSxDQUFDO1FBQzFCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzdCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsZUFBUyxHQUFnQixJQUFJLENBQUM7O0lBdUl6QyxDQUFDO0lBcklHLGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sK0JBQUksR0FBWCxVQUFZLElBQVM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELGlDQUFNLEdBQU4sVUFBTyxFQUFVO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxF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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XHJcbmltcG9ydCB7IFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUUNyb3NzV2lkZ2V0SXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLypcclxuICAgIHtcclxuICAgICAgICBcIm5hbWVcIjogXCLnv7vmu5rnmoTpppnogqDlpKflhpLpmalcIixcclxuICAgICAgICBcImFwcGlkXCI6IFwid3gyYzRlZDQyMTgyMjRiMDQyXCIsXHJcbiAgICAgICAgXCJpY29uXCI6IFwiaHR0cHM6Ly94Y3gueW91bGV0ZC5jb20vaW1nL2ljb24vZmdkeGMucG5nXCIsXHJcbiAgICAgICBcImxvZ29cIjogXCJodHRwczovL3hjeC55b3VsZXRkLmNvbS9pbWcvbG9nby80LnBuZ1wiLFxyXG4gICAgICAgIFwiaXNfanVtcFwiOiBcInRydWVcIixcclxuICAgICAgICBcInBhdGhcIjogXCJcIixcclxuICAgICAgICBcInFyX2NvZGVcIjogXCJodHRwczovL3hjeC55b3VsZXRkLmNvbS9pbWcvcXJjb2RlL3FfZmdkeGMuanBnXCJcclxuICAgIH1cclxuICAgICovXHJcbiAgICBkYXRhOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2RhdGFEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIF9pc1Jld2FyZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBfbG9jYXRpb246IFN1YkxvY2F0aW9uID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkl0ZW1DbGlja0hhbmRsZXIsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29uSXRlbUNsaWNrSGFuZGxlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIl9vbkl0ZW1DbGlja0hhbmRsZXJcIik7XHJcblxyXG4gICAgICAgIGlmIChQbGF0VXRpbHMuSXNEb3V5aW4pIHtcclxuICAgICAgICAgICAgdXRpbHMuVG9vbF9Eb3V5aW4uc2hvd01vcmVHYW1lc01vZGFsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RDbGlja0RhdGEodGhpcy5kYXRhLmFwcGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmmK/mv4DlirHmqKHlvI/lsLHnm7TmjqXot7PovaxcclxuICAgICAgICBpZiAodGhpcy5fbG9jYXRpb24gPT0gU3ViTG9jYXRpb24uaXNSZXdhcmQpIHtcclxuICAgICAgICAgICAgdXRpbHMubmF2aWdhdGVUb01pbmlHYW1lKHRoaXMuZGF0YSwgKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4iuaKpeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc3REYXRhKHRoaXMuZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmv4DlirHmj5LlsY/ot7PovazmiJDlip/vvIHkuIvlj5HlpZblirHvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2sgJiYgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2socmV0KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIudmlkZW9DYWxsQmFjayA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5r+A5Yqx5o+S5bGP6Lez6L2s5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci52aWRlb0NhbGxCYWNrICYmIHV0aWxzLmFkTWFuYWdlci52aWRlb0NhbGxCYWNrKGZhbHNlLCBcIuiOt+WPluivleeOqeWlluWKseWksei0pe+8gVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci52aWRlb0NhbGxCYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkTWFuYWdlci5oaWRlUmV3YXJkSW5zZXJ0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kYXRhLmlzX2p1bXAgJiYgdGhpcy5kYXRhLmlzX2p1bXAgPT0gXCJ0cnVlXCIgJiYgdGhpcy5kYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLnm7TmjqXot7PovawhXCIsIHRoaXMuZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICAgIHV0aWxzLm5hdmlnYXRlVG9NaW5pR2FtZSh0aGlzLmRhdGEsIChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIrmiqXmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3N0RGF0YSh0aGlzLmRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaXNfanVtcCAmJiB0aGlzLmRhdGEuaXNfanVtcCA9PSBcImZhbHNlXCIgJiYgdGhpcy5kYXRhLnFyX2NvZGUpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc1dlY2hhdCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuS6jOe7tOeggei3s+i9rCFcIiwgdGhpcy5kYXRhLnFyX2NvZGUpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHMud2VjaGF0VG9vbC5wcmV2aWV3SW1hZ2UodGhpcy5kYXRhLnFyX2NvZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8g5LiK5oql5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX3Bvc3REYXRhKHRoaXMuZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5LiN5pSv5oyB5LqM57u056CB6Lez6L2sIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmsqHmnIlpc19qdW1w55u05o6l6Lez6L2sIVwiLCB0aGlzLmRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmFwcGlkKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5uYXZpZ2F0ZVRvTWluaUdhbWUodGhpcy5kYXRhLCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkuIrmiqXmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5hcHBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zdERhdGEodGhpcy5kYXRhLmFwcGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmxvZ28pIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBjYy5sb2FkZXIuZ2V0UmVzKHRoaXMuZGF0YS5sb2dvKTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX3Nwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBjYy5TaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRlbXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXModGhpcy5kYXRhLmxvZ28sIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX3Nwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogY2MuU2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql6Lez6L2s5oiQ5YqfXHJcbiAgICAgKiBAcGFyYW0gYXBwaWQgXHJcbiAgICAgKi9cclxuICAgIF9wb3N0RGF0YShhcHBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdXRpbHMucG9zdERhdGFCeUxvY2F0aW9uKGFwcGlkLCB0aGlzLl9sb2NhdGlvbiwgMSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql54K55Ye7XHJcbiAgICAgKiBAcGFyYW0gYXBwaWQgXHJcbiAgICAgKi9cclxuICAgIF9wb3N0Q2xpY2tEYXRhKGFwcGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB1dGlscy5wb3N0RGF0YUJ5TG9jYXRpb24oYXBwaWQsIHRoaXMuX2xvY2F0aW9uLCAwKTtcclxuICAgIH1cclxufVxyXG4iXX0=