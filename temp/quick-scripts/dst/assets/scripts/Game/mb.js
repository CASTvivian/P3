
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/mb.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bbc16OLUIxBPILLHZnxIsqr', 'mb');
// scripts/Game/mb.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var gameMgr_1 = require("./gameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MB = /** @class */ (function (_super) {
    __extends(MB, _super);
    function MB() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clip = null;
        _this._spAni = null;
        _this.time = -1;
        _this.isAtk = false;
        _this.isHart = false;
        _this.canChangeState = true;
        return _this;
    }
    MB.prototype.onLoad = function () {
        // spine动画
        this._spAni = this.node.getChildByName("ani").getComponent(sp.Skeleton);
    };
    MB.prototype.start = function () {
        this.node.zIndex = Constant_1.ZindexLayer.zindex_mb;
        this._spAni.setAnimation(0, "daiji", false);
    };
    MB.prototype.update = function (dt) {
        if (CocosZ_1.cocosz.isPause || !gameMgr_1.gameMgr.isGameStart || gameMgr_1.gameMgr.isWin || gameMgr_1.gameMgr.isFail) {
            return;
        }
        if (++this.time % 15 == 0) {
            if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.isDeath == false) {
                var p1 = this.node.getPosition();
                var p2 = gameMgr_1.gameMgr.playerTs.node.getPosition();
                var dis = p1.subSelf(p2).mag();
                if (dis < 400) {
                    this.atkStart();
                    if (dis < 300) {
                        this.atkEnemy();
                    }
                }
                else {
                    this.atkEnd();
                }
            }
            else {
                this.atkEnd();
            }
        }
    };
    MB.prototype.atkEnemy = function () {
        if (this.isHart && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs) {
            gameMgr_1.gameMgr.playerTs.hart(1, null);
        }
    };
    MB.prototype.atkStart = function () {
        var _this = this;
        if (this.canChangeState && this.isAtk == false) {
            this.canChangeState = false;
            this.isAtk = true;
            this.node.stopAllActions();
            cc.tween(this.node)
                .call(function () {
                _this._spAni.setAnimation(0, "doudong", true);
            })
                .delay(0.5)
                .call(function () {
                if (_this.clip && _this.clip.isValid)
                    gameMgr_1.gameMgr.playClip(_this.clip, _this.node);
                _this._spAni.setAnimation(0, "zheng", false);
                _this._spAni.addAnimation(0, "zheng2", true);
                _this.isHart = true;
            })
                .delay(3)
                .call(function () {
                _this.canChangeState = true;
            })
                .start();
        }
    };
    MB.prototype.atkEnd = function () {
        if (this.canChangeState && this.isAtk == true) {
            this.isAtk = false;
            this.isHart = false;
            this._spAni.setAnimation(0, "daiji", false);
        }
    };
    __decorate([
        property({ type: cc.AudioClip, tooltip: "音效" })
    ], MB.prototype, "clip", void 0);
    MB = __decorate([
        ccclass
    ], MB);
    return MB;
}(cc.Component));
exports.default = MB;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcbWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsOENBQTZDO0FBQzdDLGtEQUFvRDtBQUNwRCxxQ0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0Msc0JBQVk7SUFBNUM7UUFBQSxxRUFtRkM7UUFqRkcsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFaEIsWUFBTSxHQUFnQixJQUFJLENBQUM7UUFhckMsVUFBSSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixvQkFBYyxHQUFZLElBQUksQ0FBQzs7SUErRG5DLENBQUM7SUE3RUcsbUJBQU0sR0FBTjtRQUNJLFVBQVU7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUdELGtCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBVyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFNRCxtQkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNMLElBQUksZUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLGlCQUFPLENBQUMsV0FBVyxJQUFJLGlCQUFPLENB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LE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUEvRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7b0NBQ3RCO0lBRlQsRUFBRTtRQUR0QixPQUFPO09BQ2EsRUFBRSxDQW1GdEI7SUFBRCxTQUFDO0NBbkZELEFBbUZDLENBbkYrQixFQUFFLENBQUMsU0FBUyxHQW1GM0M7a0JBbkZvQixFQUFFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IHsgWmluZGV4TGF5ZXIgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGdhbWVNZ3IgfSBmcm9tIFwiLi9nYW1lTWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTUIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQXVkaW9DbGlwLCB0b29sdGlwOiBcIumfs+aViFwiIH0pXHJcbiAgICBjbGlwOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBfc3BBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8gc3BpbmXliqjnlLtcclxuICAgICAgICB0aGlzLl9zcEFuaSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFuaVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X21iO1xyXG4gICAgICAgIHRoaXMuX3NwQW5pLnNldEFuaW1hdGlvbigwLCBcImRhaWppXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lOiBudW1iZXIgPSAtMTtcclxuICAgIGlzQXRrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc0hhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNhbkNoYW5nZVN0YXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmIChjb2Nvc3ouaXNQYXVzZSB8fCAhZ2FtZU1nci5pc0dhbWVTdGFydCB8fCBnYW1lTWdyLmlzV2luIHx8IGdhbWVNZ3IuaXNGYWlsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCsrdGhpcy50aW1lICUgMTUgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZU1nciAmJiBnYW1lTWdyLnBsYXllclRzICYmIGdhbWVNZ3IucGxheWVyVHMuaXNEZWF0aCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHAxID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcDIgPSBnYW1lTWdyLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXMgPSBwMS5zdWJTZWxmKHAyKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a1N0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a0VuZW15KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0a0VuZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdGtFbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdGtFbmVteSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhcnQgJiYgZ2FtZU1nciAmJiBnYW1lTWdyLnBsYXllclRzKSB7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMuaGFydCgxLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXRrU3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuQ2hhbmdlU3RhdGUgJiYgdGhpcy5pc0F0ayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbkNoYW5nZVN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBdGsgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwQW5pLnNldEFuaW1hdGlvbigwLCBcImRvdWRvbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuNSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGlwICYmIHRoaXMuY2xpcC5pc1ZhbGlkKSBnYW1lTWdyLnBsYXlDbGlwKHRoaXMuY2xpcCwgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJ6aGVuZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BBbmkuYWRkQW5pbWF0aW9uKDAsIFwiemhlbmcyXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIYXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkoMylcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbkNoYW5nZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0a0VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYW5DaGFuZ2VTdGF0ZSAmJiB0aGlzLmlzQXRrID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0F0ayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzSGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zcEFuaS5zZXRBbmltYXRpb24oMCwgXCJkYWlqaVwiLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=