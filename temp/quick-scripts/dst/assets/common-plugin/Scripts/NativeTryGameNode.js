
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/NativeTryGameNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTmF0aXZlVHJ5R2FtZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLHlDQUFvQztBQUNwQywrREFBMEQ7QUFDMUQsbURBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBb0lDO1FBbklHLFdBQUssR0FBUSxJQUFJLENBQUM7UUFDbEIsV0FBSyxHQUFjLElBQUksQ0FBQztRQUN4QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1Qix1QkFBaUIsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUMvQixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQixjQUFRLEdBQVksS0FBSyxDQUFDLENBQUMsVUFBVTtRQUNyQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFdBQUssR0FBWSxJQUFJLENBQUM7O0lBMkgxQixDQUFDO0lBekhHLGtDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNJLGdDQUFJLEdBQVgsVUFBWSxJQUFTO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGFBQUssQ0FBQyxPQUFP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eEQsQ0FBQztJQW5JZ0IsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0FvSXJDO0lBQUQsd0JBQUM7Q0FwSUQsQUFvSUMsQ0FwSThDLEVBQUUsQ0FBQyxTQUFTLEdBb0kxRDtrQkFwSW9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XG5pbXBvcnQgTmF0aXZlVHJ5R2FtZXNXaWRnZXQgZnJvbSBcIi4vTmF0aXZlVHJ5R2FtZXNXaWRnZXRcIjtcbmltcG9ydCBDb21wYXRpYmxlVG9vbCBmcm9tIFwiLi9Db21wYXRpYmxlVG9vbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF0aXZlVHJ5R2FtZU5vZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIF9kYXRhOiBhbnkgPSBudWxsO1xuICAgIF9pY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIF9uYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBfZ2FtZUp1bXBJbnRlcnZhbDogbnVtYmVyID0gLTE7XG4gICAgX2p1bXBJbmZvOiBhbnkgPSBudWxsO1xuICAgIF9pbmRleDogbnVtYmVyID0gLTE7XG4gICAgX2p1bXBpbmc6IGJvb2xlYW4gPSBmYWxzZTsgLy8g5o6n5Yi25piv5ZCm5Zyo6Lez6L2sXG4gICAgX2lzRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfbWFzazogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX2ljb24gPSBjYy5maW5kKFwiTWFzay9JY29uXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHRoaXMuX21hc2sgPSBjYy5maW5kKFwiTWFza1wiLCB0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIOS6pOWPieaOqOW5v+aVsOaNrlxuICAgICAqIGRhdGE6W3tcImRhdGVcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwianVtcF9saXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS6pOWPieaOqOW5v+aMguS7tuWGheWuueS/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWNvblwiOiBcImh0dHA6Ly94Y3gueW91bGV0ZC5jb20vaW1nL2ljb24vZmdkeGMucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi57+75rua55qE6aaZ6IKg5aSn5YaS6ZmpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqc19qdW1wXCI6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicXJfY29kZVwiOiBcImh0dHA6Ly94Y3gueW91bGV0ZC5jb20vaW1nL3FyY29kZS9xX2ZnZHhjLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwaWRcIjogXCJ3eDJjNGVkNDIxODIyNGIwNDJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFwidHJ5R2FtZUFkXCI6dHJ5R2FtZUFkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICogXG4gICAgICovXG4gICAgcHVibGljIGluaXQoZGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuXG4gICAgICAgIHV0aWxzLnNob3dMb2coXCLljp/nlJ/mipbliqhOb2RlXCIpO1xuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fanVtcEluZm8gPSB0aGlzLl9kYXRhLmp1bXBfbGlzdDtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVKdW1wSW50ZXJ2YWwgPSB0aGlzLl9kYXRhLmp1bXBfcmVmcmVzaF90aW1lO1xuICAgICAgICAgICAgdGhpcy5faXNGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChQbGF0VXRpbHMuSXNIdWFXZWkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzb3VyY2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uZGF0ZVswXS5zb3VyY2UgPyB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uZGF0ZVswXS5zb3VyY2UgOiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Lez6L2s5oiQ5Yqf6L+H5ZCO5pi+56S65LiL5LiA5LiqXG4gICAgICovXG4gICAgc2hvd05leHRJdGVtKCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5qdW1wKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5qdW1wLCB0aGlzLl9nYW1lSnVtcEludGVydmFsKTtcbiAgICB9XG4gICAgX25hdGl2ZUFkO1xuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLmp1bXAoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmp1bXAsIHRoaXMuX2dhbWVKdW1wSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5vcGFjaXR5ID09IDApIHJldHVybjtcbiAgICAgICAgICAgIGxldCB0cnlHYW1lQWQgPSB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0udHJ5R2FtZUFkO1xuICAgICAgICAgICAgbGV0IGFkaWQgPSB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uZGF0ZVswXS5hZElkO1xuICAgICAgICAgICAgaWYgKHRyeUdhbWVBZCkge1xuICAgICAgICAgICAgICAgIHRyeUdhbWVBZC5yZXBvcnRBZENsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRJZDogYWRpZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLmipbliqjor5XnjqnkuIrmiqVcIiArIFwidHJ5R2FtZUFkOlwiICsgSlNPTi5zdHJpbmdpZnkodHJ5R2FtZUFkKSArIFwiYWRpZDpcIiArIGFkaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlscy5uYXRpdmVOZWVkQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHV0aWxzLnRyeUdhbWVEYXRlLnNwbGljZSh0aGlzLl9pbmRleCwgMSlcblxuICAgICAgICAgICAgaWYgKHV0aWxzLl9uYXRpdmVUcnlHYW1lTm9kZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLl9uYXRpdmVUcnlHYW1lTm9kZS5nZXRDb21wb25lbnQoTmF0aXZlVHJ5R2FtZXNXaWRnZXQpLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5ub2RlLnRhcmdldE9mZih0aGlzKTtcbiAgICB9XG5cbiAgICBqdW1wKCkge1xuICAgICAgICBpZiAodGhpcy5fanVtcGluZykgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX2p1bXBpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2luZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gdGhpcy5fanVtcEluZm8ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gdGhpcy5faWNvbi5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGlmICh0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0pIHtcbiAgICAgICAgICAgIGxldCByZW1vdGVVcmwgPSBQbGF0VXRpbHMuSXNPUFBPID8gdGhpcy5fanVtcEluZm9bdGhpcy5faW5kZXhdLmRhdGVbMF0uaWNvblVybExpc3RbMF0gOiB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uZGF0ZVswXS5pY29uO1xuICAgICAgICAgICAgaWYgKCFyZW1vdGVVcmwgfHwgUGxhdFV0aWxzLklzSHVhV2VpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3RlVXJsID0gdGhpcy5fanVtcEluZm9bdGhpcy5faW5kZXhdLmRhdGVbMF0uaW1nVXJsTGlzdFswXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29tcGF0aWJsZVRvb2wuTG9hZFJlcyhyZW1vdGVVcmwsIChlcnIsIHRleHR1cmUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBjYy5pc1ZhbGlkKHRoaXMpICYmIHRoaXMuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWNvbi5ub2RlLnNldENvbnRlbnRTaXplKGNvbnRlbnRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLlvZPliY3or5XnjqnnrKzkuIDmrKHliqDovb3vvIHvvIHvvIHvvIHvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fanVtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCB0cnlHYW1lQWQgPSB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0udHJ5R2FtZUFkO1xuICAgICAgICAgICAgbGV0IGFkaWQgPSB0aGlzLl9qdW1wSW5mb1t0aGlzLl9pbmRleF0uZGF0ZVswXS5hZElkO1xuICAgICAgICAgICAgaWYgKHRyeUdhbWVBZCAmJiAhdHJ5R2FtZUFkLmlzUmVwb3J0U2hvdykge1xuICAgICAgICAgICAgICAgIHRyeUdhbWVBZC5yZXBvcnRBZFNob3coe1xuICAgICAgICAgICAgICAgICAgICBhZElkOiBhZGlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdHJ5R2FtZUFkLmlzUmVwb3J0U2hvdyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2p1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID09IDAgJiYgKHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1KTtcbiAgICB9XG59XG4iXX0=