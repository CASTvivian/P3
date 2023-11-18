
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIGameLoadingPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5a1dCIX/VATJjbaL5OivFz', 'UIGameLoadingPage');
// scripts/UI/UIGameLoadingPage.ts

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
var UIPage_1 = require("../Framework/UIPage");
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var GuideLayer_1 = require("./GuideLayer");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGameLoadingPage = /** @class */ (function (_super) {
    __extends(UIGameLoadingPage, _super);
    function UIGameLoadingPage() {
        var _this = _super.call(this, Constant_1.PageName.UIGameLoadingPage) || this;
        _this._startTime = 0;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIGameLoadingPage.prototype.onOpen = function () {
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMessageHandler, this);
        this._startTime = new Date().getTime();
        CocosZ_1.cocosz.scheduleOnce(function () {
            CocosZ_1.cocosz.audioMgr.playEffect("fj", true, 1);
        }, 0.1);
    };
    UIGameLoadingPage.prototype.onClose = function () {
        cc.game.targetOff(this);
        GuideLayer_1.guideLayer.hideFjAni();
        GuideLayer_1.guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
        CocosZ_1.cocosz.audioMgr.stopEffect("fj");
    };
    UIGameLoadingPage.prototype._onGameMessageHandler = function (event) {
        switch (event.type) {
            case Constant_1.default.E_UPDATE_PROGRESS: {
                this._updateProgress(event.data);
                break;
            }
        }
    };
    UIGameLoadingPage.prototype._updateProgress = function (pro) {
        if (pro >= 1) {
            var difTime = new Date().getTime() - this._startTime;
            if (difTime >= 6000) {
                CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIGamePage);
            }
            else {
                setTimeout(function () {
                    CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIGamePage);
                }, 6000 - difTime);
            }
        }
    };
    UIGameLoadingPage = __decorate([
        ccclass
    ], UIGameLoadingPage);
    return UIGameLoadingPage;
}(UIPage_1.default));
exports.default = UIGameLoadingPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJR2FtZUxvYWRpbmdQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxrREFBMkQ7QUFDM0QsOENBQTZDO0FBQzdDLDJDQUEwQztBQUVwQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyxxQ0FBTTtJQUlqRDtRQUFBLFlBQ0ksa0JBQU0sbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxTQUVwQztRQUxPLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBSTNCLEtBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O0lBQ3BDLENBQUM7SUFFUyxrQ0FBTSxHQUFoQjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGtCQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsZUFBTSxDQUFDLFlBQVksQ0FBQztZQUNoQixlQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFUyxtQ0FBTyxHQUFqQjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLHVCQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkIsdUJBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzdDLGVBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxpREFBcUIsR0FBN0IsVUFBOEIsS0FBVTtRQUNwQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxrQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7SUFFTywyQ0FBZSxHQUF2QixVQUF3QixHQUFXO1FBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNWLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyRCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ2pCLGVBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDO29CQUNQLGVBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsRUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUM7YUFDdEI7U0FDSjtJQUNMLENBQUM7SUE1Q2dCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBOENyQztJQUFELHdCQUFDO0NBOUNELEFBOENDLENBOUM4QyxnQkFBTSxHQThDcEQ7a0JBOUNvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlQYWdlIGZyb20gXCIuLi9GcmFtZXdvcmsvVUlQYWdlXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBQYWdlTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IHsgZ3VpZGVMYXllciB9IGZyb20gXCIuL0d1aWRlTGF5ZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUdhbWVMb2FkaW5nUGFnZSBleHRlbmRzIFVJUGFnZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFBhZ2VOYW1lLlVJR2FtZUxvYWRpbmdQYWdlKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKTogdm9pZCB7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihDb25zdGFudC5FX0dBTUVfTE9HSUMsIHRoaXMuX29uR2FtZU1lc3NhZ2VIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBjb2Nvc3ouc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlFZmZlY3QoXCJmalwiLCB0cnVlLCAxKTtcclxuICAgICAgICB9LCAwLjEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgIGd1aWRlTGF5ZXIuaGlkZUZqQW5pKCk7XHJcbiAgICAgICAgZ3VpZGVMYXllci5ub2RlLnpJbmRleCA9IGNjLm1hY3JvLk1JTl9aSU5ERVg7XHJcbiAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnN0b3BFZmZlY3QoXCJmalwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vbkdhbWVNZXNzYWdlSGFuZGxlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RhbnQuRV9VUERBVEVfUFJPR1JFU1M6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlUHJvZ3Jlc3MocHJvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocHJvID49IDEpIHtcclxuICAgICAgICAgICAgbGV0IGRpZlRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuX3N0YXJ0VGltZTtcclxuICAgICAgICAgICAgaWYgKGRpZlRpbWUgPj0gNjAwMCkge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYWdlKFBhZ2VOYW1lLlVJR2FtZVBhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYWdlKFBhZ2VOYW1lLlVJR2FtZVBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSwgNjAwMCAtIGRpZlRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=