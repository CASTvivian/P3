
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RewardInsert.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7087bM2rPJIqI5a6FekvQ2X', 'RewardInsert');
// common-plugin/Scripts/RewardInsert.ts

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
var AldUtils_1 = require("./AldUtils");
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 激励插屏
 */
var RewardInsert = /** @class */ (function (_super) {
    __extends(RewardInsert, _super);
    function RewardInsert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._jumpList = null;
        _this._items = [];
        _this.isShow = false;
        _this._panel = null;
        _this._mask = null;
        return _this;
    }
    RewardInsert.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        this._mask = this.node.getChildByName("Mask");
        this._panel = this.node.getChildByName("Panel");
        for (var i = 0; i < 6; i++) {
            var item = this._panel.getChildByName("Item" + i);
            var qcrossWidgetItem = item.getComponent("QCrossWidgetItem");
            qcrossWidgetItem._location = YZ_Constant_1.SubLocation.isReward;
            this._items.push(qcrossWidgetItem);
        }
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
    };
    RewardInsert.prototype.start = function () {
        this._jumpList = Utils_1.utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        }
        else {
            cc.warn("交叉推广数据为null,激励插屏组件不显示!");
            Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(false, "激励组件加载失败！");
            Utils_1.utils.adManager.videoCallBack = null;
            this.node.destroy();
        }
    };
    RewardInsert.prototype._initWidget = function () {
        var idx = 0;
        for (var i = 0; i < this._jumpList.length; i++) {
            var data = this._jumpList[i];
            if (data && data.logo) {
                var itemIdx = idx;
                if (itemIdx >= this._items.length) {
                    return;
                }
                idx++;
                this._items[itemIdx].init(data);
            }
        }
    };
    RewardInsert.prototype.hide = function () {
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        this._panel.active = false;
        this._mask.active = false;
        // })));
    };
    RewardInsert.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
        Utils_1.utils.adManager.videoCallBack && Utils_1.utils.adManager.videoCallBack(false, "未点击试玩奖励！");
        Utils_1.utils.adManager.videoCallBack = null;
    };
    RewardInsert.prototype.update = function (dt) {
        if (!this.isShow) {
            Utils_1.utils.showLog("show insertReward>>>>>");
            AldUtils_1.default.SendEvent("显示激励插屏");
            this.isShow = true;
            this._panel.active = true;
            this._mask.active = true;
        }
    };
    RewardInsert = __decorate([
        ccclass
    ], RewardInsert);
    return RewardInsert;
}(cc.Component));
exports.default = RewardInsert;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmV3YXJkSW5zZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUVoQyx1Q0FBa0M7QUFDbEMsNkNBQTRDO0FBR3RDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBRUg7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFvRkM7UUFsRlcsZUFBUyxHQUFRLElBQUksQ0FBQztRQUN0QixZQUFNLEdBQXVCLEVBQUUsQ0FBQztRQUNqQyxZQUFNLEdBQVksS0FBSyxDQUFDO1FBRS9CLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsV0FBSyxHQUFZLElBQUksQ0FBQzs7SUE2RTFCLENBQUM7SUEzRUcsNkJBQU0sR0FBTjtRQUVJLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQU8sQ0FBRyxDQUFDLENBQUM7WUFDM0QsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9FLGdCQUFnQixDQUFDLFNBQVMsR0FBRyx5QkFBVyxDQUFDLFFBQVEs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LEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFuRmdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FvRmhDO0lBQUQsbUJBQUM7Q0FwRkQsQUFvRkMsQ0FwRnlDLEVBQUUsQ0FBQyxTQUFTLEdBb0ZyRDtrQkFwRm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBRQ3Jvc3NXaWRnZXRJdGVtIGZyb20gXCIuL1FDcm9zc1dpZGdldEl0ZW1cIjtcclxuaW1wb3J0IEFsZFV0aWxzIGZyb20gXCIuL0FsZFV0aWxzXCI7XHJcbmltcG9ydCB7IFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOa/gOWKseaPkuWxj1xyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkSW5zZXJ0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9qdW1wTGlzdDogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiBRQ3Jvc3NXaWRnZXRJdGVtW10gPSBbXTtcclxuICAgIHB1YmxpYyBpc1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX21hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl9tYXNrID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTWFza1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFuZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbFwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMuX3BhbmVsLmdldENoaWxkQnlOYW1lKGBJdGVtJHtpfWApO1xyXG4gICAgICAgICAgICBsZXQgcWNyb3NzV2lkZ2V0SXRlbTogUUNyb3NzV2lkZ2V0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KFwiUUNyb3NzV2lkZ2V0SXRlbVwiKTtcclxuICAgICAgICAgICAgcWNyb3NzV2lkZ2V0SXRlbS5fbG9jYXRpb24gPSBTdWJMb2NhdGlvbi5pc1Jld2FyZDtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaChxY3Jvc3NXaWRnZXRJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByYXRpbzogbnVtYmVyID0gMTtcclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxOTIwICogMC43O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDEwODA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wYW5lbC5zY2FsZSA9IHJhdGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuX2p1bXBMaXN0ID0gdXRpbHMuZ2V0UmVjb21tb25kR2FtZUxpc3QoKTtcclxuICAgICAgICBpZiAodGhpcy5fanVtcExpc3QgJiYgdGhpcy5fanVtcExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0V2lkZ2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2Mud2FybihcIuS6pOWPieaOqOW5v+aVsOaNruS4um51bGws5r+A5Yqx5o+S5bGP57uE5Lu25LiN5pi+56S6IVwiKTtcclxuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2sgJiYgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2soZmFsc2UsIFwi5r+A5Yqx57uE5Lu25Yqg6L295aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIudmlkZW9DYWxsQmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRXaWRnZXQoKSB7XHJcbiAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2p1bXBMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB0aGlzLl9qdW1wTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sb2dvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkeDogbnVtYmVyID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JZHggPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWR4Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtc1tpdGVtSWR4XS5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG5cclxuICAgICAgICAvLyB0aGlzLl9wYW5lbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMywgQ29tcGF0aWJsZVRvb2wucG9zaXRpb24oLXRoaXMuX3BhbmVsLmdldENvbnRlbnRTaXplKCkud2lkdGgsIDApKS5lYXNpbmcoY2MuZWFzZVF1YWRyYXRpY0FjdGlvbk91dCgpKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3BhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZUJ0bkhhbmRsZXIoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2sgJiYgdXRpbHMuYWRNYW5hZ2VyLnZpZGVvQ2FsbEJhY2soZmFsc2UsIFwi5pyq54K55Ye76K+V546p5aWW5Yqx77yBXCIpO1xyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci52aWRlb0NhbGxCYWNrID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1Nob3cpIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcInNob3cgaW5zZXJ0UmV3YXJkPj4+Pj5cIik7XHJcblxyXG4gICAgICAgICAgICBBbGRVdGlscy5TZW5kRXZlbnQoXCLmmL7npLrmv4DlirHmj5LlsY9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=