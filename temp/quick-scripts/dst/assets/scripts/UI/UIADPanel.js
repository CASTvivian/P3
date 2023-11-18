
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIADPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '003c2RLzLtIya/ty0NNYWCD', 'UIADPanel');
// scripts/UI/UIADPanel.ts

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
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var CocosZ_1 = require("../Framework/CocosZ");
var Msg_1 = require("../Framework/Msg");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnAD = null;
        _this.btnSkip = null;
        _this.isDiamond = false;
        return _this;
    }
    NewClass.prototype.start = function () {
        if (CocosZ_1.cocosz.isADON) {
            this.node.scale = 0;
            cc.tween(this.node).to(0.3, { scale: 1 }, { easing: "backOut" }).start();
            Utils_1.utils.SendEvent("页面-" + (this.isDiamond ? "钻石" : "金币"));
        }
        else {
            this.node.destroy();
        }
    };
    NewClass.prototype.setDiamond = function () {
        this.isDiamond = true;
        this.node.getChildByName("bg").active = false;
        this.node.getChildByName("bg1").active = true;
    };
    NewClass.prototype.watchAD = function () {
        var _this = this;
        Utils_1.utils.SendEvent("\u89C6\u9891-" + (this.isDiamond ? "钻石购买" : "金币购买") + "-\u64AD\u653E");
        CocosZ_1.cocosz.watchAD(function () {
            Utils_1.utils.SendEvent("\u89C6\u9891-" + (_this.isDiamond ? "钻石购买" : "金币购买") + "-\u6210\u529F");
            if (_this.isDiamond) {
                var num = CocosZ_1.cocosz.isDeBug ? 10000 : 200;
                CocosZ_1.cocosz.dataMgr.DiamondCount += num;
                Msg_1.default.Show(i18n.t("msg.gxhdzs") + num); //恭喜获得钻石
            }
            else {
                var num = CocosZ_1.cocosz.isDeBug ? 10000 : 500;
                CocosZ_1.cocosz.dataMgr.CoinCount += num;
                Msg_1.default.Show(i18n.t("msg.gxhdjb") + num); //恭喜获得金币
            }
            _this.node.destroy();
        }, function () {
            Utils_1.utils.SendEvent("\u89C6\u9891-" + (_this.isDiamond ? "钻石购买" : "金币购买") + "-\u5931\u8D25");
        });
    };
    NewClass.prototype.exit = function () {
        CocosZ_1.cocosz.audioMgr.playBtnEffect();
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnAD", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnSkip", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJQURQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBMEQ7QUFDMUQsOENBQTZDO0FBQzdDLHdDQUFtQztBQUNuQyxhQUFhO0FBQ2IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRS9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBZ0RDO1FBN0NHLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsYUFBTyxHQUFZLElBQUksQ0FBQztRQVl4QixlQUFTLEdBQVksS0FBSyxDQUFDOztJQStCL0IsQ0FBQztJQXpDRyx3QkFBSyxHQUFMO1FBQ0ksSUFBSSxlQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6RSxhQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFHRCw2QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xELENBQUM7SUFFRCwwQkFBTyxHQUFQO1FBQUEsaUJBa0JDO1FBakJHLGFBQUssQ0FBQyxTQUFTLENBQUMsbUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLG1CQUFLLENBQUMsQ0FBQTtRQUM1RCxlQUFNLENBQUMsT0FBTyxDQUFDO1lBQ1gsYUFBSyxDQUFDLFNBQVMsQ0FBQyxtQkFBTSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sbUJBQUssQ0FBQyxDQUFBO1lBQzVELElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsSUFBSSxHQUFHLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZDLGVBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQztnQkFDbkMsYUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUEsUUFBUTthQUNoRDtpQkFDSTtnQkFDRCxJQUFJLEdBQUcsR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDdkMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO2dCQUNoQyxhQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQSxRQUFRO2FBQ2hEO1lBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QixDQUFDLEVBQUU7WUFDQyxhQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFNLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxtQkFBSyxDQUFDLENBQUE7UUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsdUJBQUksR0FBSjtRQUNJLGVBQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBNUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDTTtJQUxQLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FnRDVCO0lBQUQsZUFBQztDQWhERCxBQWdEQyxDQWhEcUMsRUFBRSxDQUFDLFNBQVMsR0FnRGpEO2tCQWhEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvVXRpbHNcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IE1zZyBmcm9tIFwiLi4vRnJhbWV3b3JrL01zZ1wiO1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IGkxOG4gPSByZXF1aXJlKCdMYW5ndWFnZURhdGEnKTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5BRDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0blNraXA6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGlmIChjb2Nvc3ouaXNBRE9OKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImJhY2tPdXRcIiB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLpobXpnaItXCIgKyAodGhpcy5pc0RpYW1vbmQgPyBcIumSu+efs1wiIDogXCLph5HluIFcIikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRGlhbW9uZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2V0RGlhbW9uZCgpIHtcclxuICAgICAgICB0aGlzLmlzRGlhbW9uZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcxXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2hBRCgpIHtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoYOinhumikS0ke3RoaXMuaXNEaWFtb25kID8gXCLpkrvnn7PotK3kubBcIiA6IFwi6YeR5biB6LSt5LmwXCJ9LeaSreaUvmApXHJcbiAgICAgICAgY29jb3N6LndhdGNoQUQoKCkgPT4ge1xyXG4gICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoYOinhumikS0ke3RoaXMuaXNEaWFtb25kID8gXCLpkrvnn7PotK3kubBcIiA6IFwi6YeR5biB6LSt5LmwXCJ9LeaIkOWKn2ApXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlhbW9uZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IGNvY29zei5pc0RlQnVnID8gMTAwMDAgOiAyMDA7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5EaWFtb25kQ291bnQgKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgTXNnLlNob3coaTE4bi50KFwibXNnLmd4aGR6c1wiKSArIG51bSk7Ly/mga3llpzojrflvpfpkrvnn7NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBjb2Nvc3ouaXNEZUJ1ZyA/IDEwMDAwIDogNTAwO1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IG51bTtcclxuICAgICAgICAgICAgICAgIE1zZy5TaG93KGkxOG4udChcIm1zZy5neGhkamJcIikgKyBudW0pOy8v5oGt5Zac6I635b6X6YeR5biBXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChg6KeG6aKRLSR7dGhpcy5pc0RpYW1vbmQgPyBcIumSu+efs+i0reS5sFwiIDogXCLph5HluIHotK3kubBcIn0t5aSx6LSlYClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGV4aXQoKSB7XHJcbiAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlCdG5FZmZlY3QoKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==