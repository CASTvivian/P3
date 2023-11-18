
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/CoinBord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96bb6h8GYdOW47cjyMPjHjl', 'CoinBord');
// scripts/UI/CoinBord.ts

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
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var Msg_1 = require("../Framework/Msg");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinBord = /** @class */ (function (_super) {
    __extends(CoinBord, _super);
    function CoinBord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._label = null;
        _this._icon = null;
        _this._adBtn = null;
        _this.isDiamond = false;
        return _this;
    }
    CoinBord.prototype.onLoad = function () {
        var _this = this;
        this._label = this.node.getChildByName("Label").getComponent(cc.Label);
        this._icon = this.node.getChildByName("Icon");
        this._adBtn = this.node.getChildByName("BtnAD");
        if (this._adBtn) {
            this._adBtn.on(cc.Node.EventType.TOUCH_END, (function () {
                var node = cc.instantiate(CocosZ_1.cocosz.resMgr.getRes("UIADPanel", cc.Prefab));
                cc.find("Canvas").addChild(node);
                if (_this.isDiamond) {
                    node.getComponent("UIADPanel").setDiamond();
                }
            }));
            this._adBtn.active = CocosZ_1.cocosz.isADON;
        }
    };
    CoinBord.prototype.onEnable = function () {
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        this._updateLabel();
    };
    CoinBord.prototype.onDisable = function () {
        cc.game.targetOff(this);
    };
    CoinBord.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
            case Constant_1.default.E_COIN_CHANGE: {
                this._updateLabel();
                break;
            }
            case Constant_1.default.E_Diamond_CHANGE: {
                this._updateLabel();
                break;
            }
        }
    };
    CoinBord.prototype._updateLabel = function () {
        if (this.isDiamond) {
            this._label.string = CocosZ_1.cocosz.dataMgr.DiamondCount + "";
        }
        else {
            this._label.string = CocosZ_1.cocosz.dataMgr.CoinCount + "";
        }
    };
    /**
     * 获取Icon的世界坐标位置(金币动画飞入使用)
     */
    CoinBord.prototype.getLocation = function () {
        var pos = this._icon.convertToWorldSpaceAR(cc.Vec3.ZERO);
        // let temp = cc.v2(pos.x, cc.winSize.height - 76)
        return pos;
    };
    CoinBord.prototype._addGold = function () {
        CocosZ_1.cocosz.dataMgr.CoinCount += 200;
        Msg_1.default.Show(i18n.t("msg.gxhdjb") + "200"); //恭喜获得金币
    };
    __decorate([
        property
    ], CoinBord.prototype, "isDiamond", void 0);
    CoinBord = __decorate([
        ccclass
    ], CoinBord);
    return CoinBord;
}(cc.Component));
exports.default = CoinBord;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXENvaW5Cb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE2QztBQUM3Qyw4Q0FBNkM7QUFDN0Msd0NBQW1DO0FBQ25DLGFBQWE7QUFDYixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFL0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUF1RUM7UUFyRVcsWUFBTSxHQUFhLElBQUksQ0FBQztRQUN4QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFZLEtBQUssQ0FBQzs7SUFnRS9CLENBQUM7SUE5REcseUJBQU0sR0FBTjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQy9DO1lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQsMkJBQVEsR0FBUjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGtCQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8sd0NBQXFCLEdBQTdCLFVBQThCLEtBQVU7UUFDcEMsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2hCLEtBQUssa0JBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixNQUFNO2FBQ1Q7WUFDRCxLQUFLLGtCQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7SUFFTywrQkFBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDekQ7YUFDSTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGVBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUN0RDtJQUVMLENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFXLEdBQWxCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELGtEQUFrRDtRQUNsRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTywyQkFBUSxHQUFoQjtRQUNJLGVBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNoQyxhQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQSxRQUFRO0lBQ25ELENBQUM7SUEvREQ7UUFEQyxRQUFROytDQUNrQjtJQVBWLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F1RTVCO0lBQUQsZUFBQztDQXZFRCxBQXVFQyxDQXZFcUMsRUFBRSxDQUFDLFNBQVMsR0F1RWpEO2tCQXZFb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25zdGFudCBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCBNc2cgZnJvbSBcIi4uL0ZyYW1ld29yay9Nc2dcIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29pbkJvcmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2FkQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGlzRGlhbW9uZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9sYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5faWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkljb25cIik7XHJcbiAgICAgICAgdGhpcy5fYWRCdG4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5BRFwiKTtcclxuICAgICAgICBpZiAodGhpcy5fYWRCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5fYWRCdG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShjb2Nvc3oucmVzTWdyLmdldFJlcyhcIlVJQURQYW5lbFwiLCBjYy5QcmVmYWIpKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RpYW1vbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlVJQURQYW5lbFwiKS5zZXREaWFtb25kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5fYWRCdG4uYWN0aXZlID0gY29jb3N6LmlzQURPTjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihDb25zdGFudC5FX0dBTUVfTE9HSUMsIHRoaXMuX29uR2FtZU1lc3NhZ2VIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25HYW1lTWVzc2FnZUhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0YW50LkVfQ09JTl9DSEFOR0U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENvbnN0YW50LkVfRGlhbW9uZF9DSEFOR0U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVMYWJlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0RpYW1vbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc3RyaW5nID0gY29jb3N6LmRhdGFNZ3IuRGlhbW9uZENvdW50ICsgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnN0cmluZyA9IGNvY29zei5kYXRhTWdyLkNvaW5Db3VudCArIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkljb27nmoTkuJbnlYzlnZDmoIfkvY3nva4o6YeR5biB5Yqo55S76aOe5YWl5L2/55SoKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TG9jYXRpb24oKSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuX2ljb24uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyk7XHJcbiAgICAgICAgLy8gbGV0IHRlbXAgPSBjYy52Mihwb3MueCwgY2Mud2luU2l6ZS5oZWlnaHQgLSA3NilcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FkZEdvbGQoKSB7XHJcbiAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IDIwMDtcclxuICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cuZ3hoZGpiXCIpICsgXCIyMDBcIik7Ly/mga3llpzojrflvpfph5HluIFcclxuICAgIH1cclxufVxyXG4iXX0=