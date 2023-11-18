
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/setMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09313S8CXZCU4lptDwQuJIg', 'setMap');
// scripts/Game/setMap.ts

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
var CocosZ_1 = require("../Framework/CocosZ");
var gameMgr_1 = require("./gameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var setMap = /** @class */ (function (_super) {
    __extends(setMap, _super);
    function setMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dmmArr = [];
        _this.dikuai = null;
        _this.time = -1;
        _this.mainCameraPos = cc.Vec2.ZERO;
        _this.distanceX = 2500;
        _this.distanceY = 1500;
        return _this;
    }
    setMap.prototype.onLoad = function () {
        gameMgr_1.gameMgr.setMapTs = this;
        // 躲猫猫图片
        gameMgr_1.gameMgr.dmmArr = this.dmmArr;
        // 地块
        this.dikuai = this.node.getChildByName("dikuai");
        if (this.dikuai) {
            this.dikuai.zIndex = cc.macro.MIN_ZINDEX;
        }
        // 获取坐标
        if ([1, 2, 4].includes(CocosZ_1.cocosz.gameMode) && this.node.getChildByName("point")) {
            var point = this.node.getChildByName("point");
            for (var i = 0; i < point.childrenCount; i++) {
                gameMgr_1.gameMgr.posList[i] = i;
            }
        }
    };
    setMap.prototype.onDestroy = function () {
        gameMgr_1.gameMgr.setMapTs = null;
        ;
    };
    setMap.prototype.start = function () {
        for (var i = 0; i < this.node.children.length; i++) {
            // 初始zindex
            var child = this.node.children[i];
        }
    };
    setMap.prototype.lateUpdate = function () {
        if (CocosZ_1.cocosz.isPause || gameMgr_1.gameMgr.isWin || gameMgr_1.gameMgr.isFail)
            return;
        if (this.time++ % 30 == 0) {
            this.checkAllNode();
        }
    };
    setMap.prototype.checkAllNode = function () {
        if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.mainCamereRootNode) {
            this.mainCameraPos = gameMgr_1.gameMgr.mainCamereRootNode.getPosition();
            this.distanceX = cc.winSize.width / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
            this.distanceY = cc.winSize.height / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
        }
        // 地图节点
        var excludeArr = ["guide", "guidePath", "player", "colllider", "dikuai", "point", "itemPoint", "tree", "tipLayer", "jingyanLayer", "posLayer"];
        for (var i = 0; i < this.node.childrenCount; i++) {
            var child = this.node.children[i];
            if (excludeArr.includes(child.name) == false) {
                this.checkNode(child);
            }
        }
        // 地图地块
        var dikuai = this.node.getChildByName("dikuai");
        if (dikuai) {
            for (var i = 0; i < dikuai.childrenCount; i++) {
                var child = dikuai.children[i];
                this.checkNode(child);
            }
        }
    };
    setMap.prototype.checkNode = function (n, isRefresh) {
        if (isRefresh === void 0) { isRefresh = false; }
        if (isRefresh) {
            if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.mainCamereRootNode) {
                this.mainCameraPos = gameMgr_1.gameMgr.mainCamereRootNode.getPosition();
                this.distanceX = cc.winSize.width / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
                this.distanceY = cc.winSize.height / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
            }
        }
        if (n && n.isValid && n.activeInHierarchy) {
            if (n.parent.name == this.node.name || n.parent.name == "dikuai") {
                if (n.opacity == 0 || n.opacity == 255) {
                    if (((n.x + n.width * Math.abs(n.scaleX) / 2) < (this.mainCameraPos.x - this.distanceX)) || ((n.x - n.width * Math.abs(n.scaleX) / 2) > (this.mainCameraPos.x + this.distanceX) ||
                        (n.y + n.height * Math.abs(n.scaleY) / 2) < (this.mainCameraPos.y - this.distanceY)) || ((n.y - n.height * Math.abs(n.scaleY) / 2) > (this.mainCameraPos.y + this.distanceY))) {
                        n.opacity = 0;
                        return false;
                    }
                    else {
                        n.opacity = 255;
                        return true;
                    }
                }
            }
        }
    };
    // 释放资源节点
    setMap.prototype.release = function (call) {
        var _this = this;
        // 删除dikaui子节点
        if (this.dikuai && this.dikuai.isValid && this.dikuai.childrenCount) {
            for (var i = 0; i < 2; i++) {
                var child = this.dikuai.children[i];
                if (child && child.isValid) {
                    child.destroy();
                }
            }
            setTimeout(function () { _this.release(call); });
        }
        // 删除普通节点
        else if (this.node.childrenCount) {
            for (var i = 0; i < 10; i++) {
                var child = this.node.children[i];
                if (child && child.isValid) {
                    child.destroy();
                }
            }
            setTimeout(function () { _this.release(call); });
        }
        // 结束后回调
        else {
            call && call();
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], setMap.prototype, "dmmArr", void 0);
    setMap = __decorate([
        ccclass
    ], setMap);
    return setMap;
}(cc.Component));
exports.default = setMap;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcc2V0TWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUU3QyxxQ0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUEySEM7UUF6SEcsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFFOUIsWUFBTSxHQUFZLElBQUksQ0FBQztRQWdDdkIsVUFBSSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBUWxCLG1CQUFhLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEMsZUFBUyxHQUFXLElBQUksQ0FBQztRQUN6QixlQUFTLEdBQVcsSUFBSSxDQUFDOztJQTZFN0IsQ0FBQztJQXJIYSx1QkFBTSxHQUFoQjtRQUNJLGlCQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN4QixRQUFRO1FBQ1IsaUJBQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixLQUFLO1FBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztTQUM1QztRQUNELE9BQU87UUFDUCxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFFLElBQUksS0FBSyxHQUFH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QUU7b0JBQ3hCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbkI7YUFDSjtZQUNELFVBQVUsQ0FBQyxjQUFRLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELFNBQVM7YUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO29CQUN4QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ25CO2FBQ0o7WUFDRCxVQUFVLENBQUMsY0FBUSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxRQUFRO2FBQ0g7WUFDRCxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBeEhEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzBDQUNHO0lBRmIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTJIMUI7SUFBRCxhQUFDO0NBM0hELEFBMkhDLENBM0htQyxFQUFFLENBQUMsU0FBUyxHQTJIL0M7a0JBM0hvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IHsgWmluZGV4TGF5ZXIgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGdhbWVNZ3IgfSBmcm9tIFwiLi9nYW1lTWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2V0TWFwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgZG1tQXJyOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgZGlrdWFpOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGdhbWVNZ3Iuc2V0TWFwVHMgPSB0aGlzO1xyXG4gICAgICAgIC8vIOi6sueMq+eMq+WbvueJh1xyXG4gICAgICAgIGdhbWVNZ3IuZG1tQXJyID0gdGhpcy5kbW1BcnI7XHJcbiAgICAgICAgLy8g5Zyw5Z2XXHJcbiAgICAgICAgdGhpcy5kaWt1YWkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaWt1YWlcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlrdWFpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlrdWFpLnpJbmRleCA9IGNjLm1hY3JvLk1JTl9aSU5ERVg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiOt+WPluWdkOagh1xyXG4gICAgICAgIGlmIChbMSwgMiwgNF0uaW5jbHVkZXMoY29jb3N6LmdhbWVNb2RlKSAmJiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwb2ludFwiKSkge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwb2ludFwiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3IucG9zTGlzdFtpXSA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBnYW1lTWdyLnNldE1hcFRzID0gbnVsbDs7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIOWIneWni3ppbmRleFxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRpbWU6IG51bWJlciA9IC0xO1xyXG4gICAgbGF0ZVVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAoY29jb3N6LmlzUGF1c2UgfHwgZ2FtZU1nci5pc1dpbiB8fCBnYW1lTWdyLmlzRmFpbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWUrKyAlIDMwID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbE5vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFpbkNhbWVyYVBvczogY2MuVmVjMiA9IGNjLlZlYzIuWkVSTztcclxuICAgIGRpc3RhbmNlWDogbnVtYmVyID0gMjUwMDtcclxuICAgIGRpc3RhbmNlWTogbnVtYmVyID0gMTUwMDtcclxuICAgIGNoZWNrQWxsTm9kZSgpIHtcclxuICAgICAgICBpZiAoZ2FtZU1nciAmJiBnYW1lTWdyLm1haW5DYW1lcmVSb290Tm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5DYW1lcmFQb3MgPSBnYW1lTWdyLm1haW5DYW1lcmVSb290Tm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlWCA9IGNjLndpblNpemUud2lkdGggLyAyIC8gZ2FtZU1nci5tYWluQ2FtZXJhLnpvb21SYXRpbyArIDUwMDtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZVkgPSBjYy53aW5TaXplLmhlaWdodCAvIDIgLyBnYW1lTWdyLm1haW5DYW1lcmEuem9vbVJhdGlvICsgNTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlnLDlm77oioLngrlcclxuICAgICAgICBsZXQgZXhjbHVkZUFyciA9IFtcImd1aWRlXCIsIFwiZ3VpZGVQYXRoXCIsIFwicGxheWVyXCIsIFwiY29sbGxpZGVyXCIsIFwiZGlrdWFpXCIsIFwicG9pbnRcIiwgXCJpdGVtUG9pbnRcIiwgXCJ0cmVlXCIsIFwidGlwTGF5ZXJcIiwgXCJqaW5neWFuTGF5ZXJcIiwgXCJwb3NMYXllclwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoZXhjbHVkZUFyci5pbmNsdWRlcyhjaGlsZC5uYW1lKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUoY2hpbGQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Zyw5Zu+5Zyw5Z2XXHJcbiAgICAgICAgbGV0IGRpa3VhaSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpa3VhaVwiKTtcclxuICAgICAgICBpZiAoZGlrdWFpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlrdWFpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gZGlrdWFpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUoY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrTm9kZShuOiBjYy5Ob2RlLCBpc1JlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChpc1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVNZ3IgJiYgZ2FtZU1nci5tYWluQ2FtZXJlUm9vdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbkNhbWVyYVBvcyA9IGdhbWVNZ3IubWFpbkNhbWVyZVJvb3ROb2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlWCA9IGNjLndpblNpemUud2lkdGggLyAyIC8gZ2FtZU1nci5tYWluQ2FtZXJhLnpvb21SYXRpbyArIDUwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VZID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC8gZ2FtZU1nci5tYWluQ2FtZXJhLnpvb21SYXRpbyArIDUwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobiAmJiBuLmlzVmFsaWQgJiYgbi5hY3RpdmVJbkhpZXJhcmNoeSkge1xyXG4gICAgICAgICAgICBpZiAobi5wYXJlbnQubmFtZSA9PSB0aGlzLm5vZGUubmFtZSB8fCBuLnBhcmVudC5uYW1lID09IFwiZGlrdWFpXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuLm9wYWNpdHkgPT0gMCB8fCBuLm9wYWNpdHkgPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgobi54ICsgbi53aWR0aCAqIE1hdGguYWJzKG4uc2NhbGVYKSAvIDIpIDwgKHRoaXMubWFpbkNhbWVyYVBvcy54IC0gdGhpcy5kaXN0YW5jZVgpKSB8fCAoKG4ueCAtIG4ud2lkdGggKiBNYXRoLmFicyhuLnNjYWxlWCkgLyAyKSA+ICh0aGlzLm1haW5DYW1lcmFQb3MueCArIHRoaXMuZGlzdGFuY2VYKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobi55ICsgbi5oZWlnaHQgKiBNYXRoLmFicyhuLnNjYWxlWSkgLyAyKSA8ICh0aGlzLm1haW5DYW1lcmFQb3MueSAtIHRoaXMuZGlzdGFuY2VZKSkgfHwgKChuLnkgLSBuLmhlaWdodCAqIE1hdGguYWJzKG4uc2NhbGVZKSAvIDIpID4gKHRoaXMubWFpbkNhbWVyYVBvcy55ICsgdGhpcy5kaXN0YW5jZVkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmHiuaUvui1hOa6kOiKgueCuVxyXG4gICAgcmVsZWFzZShjYWxsOiBGdW5jdGlvbikge1xyXG4gICAgICAgIC8vIOWIoOmZpGRpa2F1aeWtkOiKgueCuVxyXG4gICAgICAgIGlmICh0aGlzLmRpa3VhaSAmJiB0aGlzLmRpa3VhaS5pc1ZhbGlkICYmIHRoaXMuZGlrdWFpLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuZGlrdWFpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkICYmIGNoaWxkLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucmVsZWFzZShjYWxsKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWIoOmZpOaZrumAmuiKgueCuVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkICYmIGNoaWxkLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucmVsZWFzZShjYWxsKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOe7k+adn+WQjuWbnuiwg1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsICYmIGNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19