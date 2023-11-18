
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/ShareOrVideo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af730WeuddAYrpP8Nt749SI', 'ShareOrVideo');
// scripts/UI/ShareOrVideo.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShareOrVideo = /** @class */ (function (_super) {
    __extends(ShareOrVideo, _super);
    function ShareOrVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._btn = false;
        _this.isGuideSKill = false;
        _this.shareNode = null;
        _this.videoNode = null;
        return _this;
    }
    Object.defineProperty(ShareOrVideo.prototype, "btn", {
        get: function () {
            return this._btn;
        },
        set: function (v) {
            this._btn = false;
            if (this.node.getChildByName("share")) {
                this.shareNode = this.node.getChildByName("share");
            }
            if (this.node.getChildByName("video")) {
                this.videoNode = this.node.getChildByName("video");
            }
        },
        enumerable: false,
        configurable: true
    });
    ShareOrVideo.prototype.onLoad = function () {
        // 监听点击
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            cc.game.emit(Constant_1.default.E_ShareOrVideo);
        });
        // 监听事件
        cc.game.on(Constant_1.default.E_ShareOrVideo, this.show, this);
    };
    ShareOrVideo.prototype.onDestroy = function () {
        // 注销事件
        cc.game.targetOff(this);
    };
    ShareOrVideo.prototype.start = function () {
        this.show();
    };
    ShareOrVideo.prototype.show = function () {
        if (this.isGuideSKill && CocosZ_1.cocosz.dataMgr.guide_skill) {
            // 隐藏分享图标
            if (this.shareNode && this.shareNode.isValid) {
                this.shareNode.active = false;
            }
            // 隐藏视频图标
            if (this.videoNode && this.videoNode.isValid) {
                this.videoNode.active = false;
            }
        }
        else {
            // 显示分享图标
            if (this.shareNode && this.shareNode.isValid) {
                this.shareNode.active = CocosZ_1.cocosz.canShare;
            }
            // 显示视频图标
            if (this.videoNode && this.videoNode.isValid) {
                this.videoNode.active = !CocosZ_1.cocosz.canShare;
            }
        }
    };
    __decorate([
        property()
    ], ShareOrVideo.prototype, "btn", null);
    __decorate([
        property({ type: cc.Boolean, tooltip: "是否新手指引免费使用" })
    ], ShareOrVideo.prototype, "isGuideSKill", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "分享图标" })
    ], ShareOrVideo.prototype, "shareNode", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "视频图标" })
    ], ShareOrVideo.prototype, "videoNode", void 0);
    ShareOrVideo = __decorate([
        ccclass
    ], ShareOrVideo);
    return ShareOrVideo;
}(cc.Component));
exports.default = ShareOrVideo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFNoYXJlT3JWaWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw4Q0FBNkM7QUFDN0Msa0RBQTZDO0FBRXZDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBZ0VDO1FBL0RHLFVBQUksR0FBWSxLQUFLLENBQUM7UUFnQnRCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQzs7SUF5QzlCLENBQUM7SUE3REcsc0JBQUksNkJBQUc7YUFBUDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDO2FBQ0QsVUFBUSxDQUFVO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0RDtZQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEQ7UUFDTCxDQUFDOzs7T0FUQTtJQW9CUyw2QkFBTSxHQUFoQjtRQUNJLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDdEMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU87UUFDUCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFUyxnQ0FBUyxHQUFuQjtRQUNJLE9BQU87UUFDUCxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRVMsNEJBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsMkJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNqRCxTQUFTO1lBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDakM7WUFDRCxTQUFTO1lBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDakM7U0FDSjthQUFNO1lBQ0gsU0FBUztZQUNULElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDLFFBQVEsQ0FBQzthQUMzQztZQUNELFNBQVM7WUFDVCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQzthQUM1QztTQUNKO0lBQ0wsQ0FBQztJQTVERDtRQURDLFFBQVEsRUFBRTsyQ0FHVjtJQVlEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO3NEQUN4QjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzttREFDbkI7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7bURBQ25CO0lBdkJULFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FnRWhDO0lBQUQsbUJBQUM7Q0FoRUQsQUFnRUMsQ0FoRXlDLEVBQUUsQ0FBQyxTQUFTLEdBZ0VyRDtrQkFoRW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvY29zWlwiO1xyXG5pbXBvcnQgQ29uc3RhbnQgZnJvbSBcIi4uL0ZyYW1ld29yay9Db25zdGFudFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlT3JWaWRlbyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBfYnRuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgZ2V0IGJ0bigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnRuO1xyXG4gICAgfVxyXG4gICAgc2V0IGJ0bih2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYnRuID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoYXJlXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2hhcmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWRlb1wiKSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZpZGVvXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Cb29sZWFuLCB0b29sdGlwOiBcIuaYr+WQpuaWsOaJi+aMh+W8leWFjei0ueS9v+eUqFwiIH0pXHJcbiAgICBpc0d1aWRlU0tpbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIuWIhuS6q+Wbvuagh1wiIH0pXHJcbiAgICBzaGFyZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi6KeG6aKR5Zu+5qCHXCIgfSlcclxuICAgIHZpZGVvTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDnm5HlkKzngrnlh7tcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX1NoYXJlT3JWaWRlbyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDnm5HlkKzkuovku7ZcclxuICAgICAgICBjYy5nYW1lLm9uKENvbnN0YW50LkVfU2hhcmVPclZpZGVvLCB0aGlzLnNob3csIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5rOo6ZSA5LqL5Lu2XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNHdWlkZVNLaWxsICYmIGNvY29zei5kYXRhTWdyLmd1aWRlX3NraWxsKSB7XHJcbiAgICAgICAgICAgIC8vIOmakOiXj+WIhuS6q+Wbvuagh1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZU5vZGUgJiYgdGhpcy5zaGFyZU5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g6ZqQ6JeP6KeG6aKR5Zu+5qCHXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZGVvTm9kZSAmJiB0aGlzLnZpZGVvTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOaYvuekuuWIhuS6q+Wbvuagh1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZU5vZGUgJiYgdGhpcy5zaGFyZU5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZU5vZGUuYWN0aXZlID0gY29jb3N6LmNhblNoYXJlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOaYvuekuuinhumikeWbvuagh1xyXG4gICAgICAgICAgICBpZiAodGhpcy52aWRlb05vZGUgJiYgdGhpcy52aWRlb05vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb05vZGUuYWN0aXZlID0gIWNvY29zei5jYW5TaGFyZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=