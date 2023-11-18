
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/jingyan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '14607c2NPFLXrODbf9T8Km8', 'jingyan');
// scripts/Game/jingyan.ts

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
var YZ_Constant_1 = require("../../common-plugin/Scripts/YZ_Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var gameMgr_1 = require("./gameMgr");
var UpgradeMgr_1 = require("./UpgradeMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Jingyan = /** @class */ (function (_super) {
    __extends(Jingyan, _super);
    function Jingyan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRun = false;
        // 成功距离
        _this.moveSpeed = 1000;
        _this._time = -1;
        return _this;
    }
    Jingyan.prototype.onLoad = function () { };
    Jingyan.prototype.start = function () { };
    Jingyan.prototype.init = function () {
        var _this = this;
        this.isRun = false;
        cc.game.on(Constant_1.default.E_Skill_Citie, function (e) { _this.isRun = true; }, this);
    };
    Jingyan.prototype.finish = function () {
        UpgradeMgr_1.upgradeMgr.curJingyan += 1;
        cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Jingyan_Finish });
        if (!CocosZ_1.cocosz.isPause) {
            gameMgr_1.gameMgr.playEffect("jingyan");
            gameMgr_1.gameMgr.shakeEffect(0, 0, true, YZ_Constant_1.VibrateType.Long);
        }
        // 回收
        cc.game.targetOff(this);
        gameMgr_1.gameMgr && gameMgr_1.gameMgr.isValid && gameMgr_1.gameMgr.nodePut("jingyan", this.node);
    };
    Jingyan.prototype.update = function (dt) {
        if (this.isRun == false) {
            if (++this._time % 10 == 0) {
                this.activating();
            }
        }
        else {
            this.followTo(dt);
        }
    };
    Jingyan.prototype.activating = function () {
        if (UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.isValid && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.isValid) {
            var from = this.node.getPosition();
            var to = gameMgr_1.gameMgr.playerTs.node.getPosition();
            if (from.sub(to).mag() < UpgradeMgr_1.upgradeMgr.jingyanRange) {
                this.isRun = true;
            }
        }
    };
    Jingyan.prototype.followTo = function (dt) {
        if (UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.isValid && gameMgr_1.gameMgr && gameMgr_1.gameMgr.playerTs && gameMgr_1.gameMgr.playerTs.isValid) {
            var from = this.node.getPosition();
            var to = gameMgr_1.gameMgr.playerTs.node.getPosition();
            var div = to.subSelf(from);
            var moveDis = this.moveSpeed * dt;
            // 成功到达
            if (div.mag() < moveDis) {
                this.finish();
            }
            else {
                this.node.setPosition(from.addSelf(div.normalizeSelf().mulSelf(moveDis)));
            }
        }
    };
    Jingyan = __decorate([
        ccclass
    ], Jingyan);
    return Jingyan;
}(cc.Component));
exports.default = Jingyan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcamluZ3lhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUsOENBQTZDO0FBQzdDLGtEQUE2QztBQUM3QyxxQ0FBb0M7QUFDcEMsMkNBQTBDO0FBRXBDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBZ0VDO1FBOURHLFdBQUssR0FBWSxLQUFLLENBQUM7UUFFdkIsT0FBTztRQUNQLGVBQVMsR0FBVyxJQUFJLENBQUM7UUF1QmpCLFdBQUssR0FBVyxDQUFDLENBQUMsQ0FBQzs7SUFvQy9CLENBQUM7SUF6REcsd0JBQU0sR0FBTixjQUFXLENBQUM7SUFFWix1QkFBSyxHQUFMLGNBQWdCLENBQUM7SUFFakIsc0JBQUksR0FBSjtRQUFBLGlCQUdDO1FBRkcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBQyxDQUFDLElBQU8sS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELHdCQUFNLEdBQU47UUFDSSx1QkFBVSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGVBQU0sQ0FBQyxPQUFPLEVBQUU7WUFDakIsaUJBQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUIsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyRDtRQUNELEtBQUs7UUFDTCxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixpQkFBTyxJQUFJLGlCQUFPLENBQUMsT0FBTyxJQUFJLGlCQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUdTLHdCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0ksSUFBSSx1QkFBVSxJQUFJLHVCQUFVLENBQUMsT0FBTyxJQUFJLGlCQUFPLElBQUksaUJBQU8sQ0FBQyxRQUFRLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzdGLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUMsSUFBSSxFQUFFLEdBQVksaUJBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyx1QkFBVSxDQUFDLFlBQVksRUFBRTtnQkFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDckI7U0FDSjtJQUNMLENBQUM7SUFFRCwwQkFBUSxHQUFSLFVBQVMsRUFBRTtRQUNQLElBQUksdUJBQVUsSUFBSSx1QkFBVSxDQUFDLE9BQU8sSUFBSSxpQkFBTyxJQUFJLGlCQUFPLENBQUMsUUFBUSxJQUFJLGlCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUM3RixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLE9BQU87WUFDUCxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7SUFDTCxDQUFDO0lBL0RnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBZ0UzQjtJQUFELGNBQUM7Q0FoRUQsQUFnRUMsQ0FoRW9DLEVBQUUsQ0FBQyxTQUFTLEdBZ0VoRDtrQkFoRW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWJyYXRlVHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IENvbnN0YW50IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgZ2FtZU1nciB9IGZyb20gXCIuL2dhbWVNZ3JcIjtcclxuaW1wb3J0IHsgdXBncmFkZU1nciB9IGZyb20gXCIuL1VwZ3JhZGVNZ3JcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKaW5neWFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBpc1J1bjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIOaIkOWKn+i3neemu1xyXG4gICAgbW92ZVNwZWVkOiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAgIG9uTG9hZCgpIHsgfVxyXG5cclxuICAgIHN0YXJ0KCk6IHZvaWQgeyB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmlzUnVuID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihDb25zdGFudC5FX1NraWxsX0NpdGllLCAoZSkgPT4geyB0aGlzLmlzUnVuID0gdHJ1ZTsgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluaXNoKCkge1xyXG4gICAgICAgIHVwZ3JhZGVNZ3IuY3VySmluZ3lhbiArPSAxO1xyXG4gICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9KaW5neWFuX0ZpbmlzaCB9KTtcclxuICAgICAgICBpZiAoIWNvY29zei5pc1BhdXNlKSB7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IucGxheUVmZmVjdChcImppbmd5YW5cIik7XHJcbiAgICAgICAgICAgIGdhbWVNZ3Iuc2hha2VFZmZlY3QoMCwgMCwgdHJ1ZSwgVmlicmF0ZVR5cGUuTG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWbnuaUtlxyXG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgIGdhbWVNZ3IgJiYgZ2FtZU1nci5pc1ZhbGlkICYmIGdhbWVNZ3Iubm9kZVB1dChcImppbmd5YW5cIiwgdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF90aW1lOiBudW1iZXIgPSAtMTtcclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUnVuID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICgrK3RoaXMuX3RpbWUgJSAxMCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mb2xsb3dUbyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRpbmcoKSB7XHJcbiAgICAgICAgaWYgKHVwZ3JhZGVNZ3IgJiYgdXBncmFkZU1nci5pc1ZhbGlkICYmIGdhbWVNZ3IgJiYgZ2FtZU1nci5wbGF5ZXJUcyAmJiBnYW1lTWdyLnBsYXllclRzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGZyb206IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbGV0IHRvOiBjYy5WZWMyID0gZ2FtZU1nci5wbGF5ZXJUcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChmcm9tLnN1Yih0bykubWFnKCkgPCB1cGdyYWRlTWdyLmppbmd5YW5SYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1J1biA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9sbG93VG8oZHQpIHtcclxuICAgICAgICBpZiAodXBncmFkZU1nciAmJiB1cGdyYWRlTWdyLmlzVmFsaWQgJiYgZ2FtZU1nciAmJiBnYW1lTWdyLnBsYXllclRzICYmIGdhbWVNZ3IucGxheWVyVHMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgZnJvbSA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSBnYW1lTWdyLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbGV0IGRpdiA9IHRvLnN1YlNlbGYoZnJvbSk7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlRGlzID0gdGhpcy5tb3ZlU3BlZWQgKiBkdDtcclxuICAgICAgICAgICAgLy8g5oiQ5Yqf5Yiw6L6+XHJcbiAgICAgICAgICAgIGlmIChkaXYubWFnKCkgPCBtb3ZlRGlzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGZyb20uYWRkU2VsZihkaXYubm9ybWFsaXplU2VsZigpLm11bFNlbGYobW92ZURpcykpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=