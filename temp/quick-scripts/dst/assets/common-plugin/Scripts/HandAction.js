
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/HandAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '790e4sDjF5IWJNaXfl/M8R4', 'HandAction');
// common-plugin/Scripts/HandAction.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HandAction = /** @class */ (function (_super) {
    __extends(HandAction, _super);
    function HandAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.runTime = 0.3;
        return _this;
        // update (dt) {}
    }
    HandAction.prototype.onLoad = function () {
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.node.scale = cc.view.getDesignResolutionSize().width / 1920 * 0.5;
        }
        else {
            this.node.scale = cc.view.getDesignResolutionSize().width / 1080 * 0.5;
        }
    };
    HandAction.prototype.onEnable = function () {
        this.node.runAction(cc.sequence(cc.moveBy(this.runTime, cc.v2(-50, +50)), cc.moveBy(this.runTime, cc.v2(+50, -50))).repeatForever());
    };
    HandAction.prototype.onDisable = function () {
        this.node.stopAllActions();
    };
    __decorate([
        property({ type: cc.Float })
    ], HandAction.prototype, "runTime", void 0);
    HandAction = __decorate([
        ccclass
    ], HandAction);
    return HandAction;
}(cc.Component));
exports.default = HandAction;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcSGFuZEFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQXVCQztRQXBCRyxhQUFPLEdBQVcsR0FBRyxDQUFDOztRQW1CdEIsaUJBQWlCO0lBQ3JCLENBQUM7SUFsQkcsMkJBQU0sR0FBTjtRQUNJLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEMsT0FBTztZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUMxRTthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQzFFO0lBQ0wsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBO0lBQ3hJLENBQUM7SUFHRCw4QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBbEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzsrQ0FDUDtJQUhMLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F1QjlCO0lBQUQsaUJBQUM7Q0F2QkQsQUF1QkMsQ0F2QnVDLEVBQUUsQ0FBQyxTQUFTLEdBdUJuRDtrQkF2Qm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kQWN0aW9uIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0IH0pXG4gICAgcnVuVGltZTogbnVtYmVyID0gMC4zO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKS53aWR0aCAvIDE5MjAgKiAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSBjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCkud2lkdGggLyAxMDgwICogMC41O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KHRoaXMucnVuVGltZSwgY2MudjIoLTUwLCArNTApKSwgY2MubW92ZUJ5KHRoaXMucnVuVGltZSwgY2MudjIoKzUwLCAtNTApKSkucmVwZWF0Rm9yZXZlcigpKVxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==