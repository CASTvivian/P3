
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_ListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab5e3FTZ+ZMjIuRaK60SQz/', 'YZ_ListView');
// common-plugin/Scripts/YZ_ListView.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var CompatibleTool_1 = require("./CompatibleTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YZ_ListView = /** @class */ (function (_super) {
    __extends(YZ_ListView, _super);
    function YZ_ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scrollView = null;
        _this._content = null;
        _this._itemObj = null;
        _this._visibleCount = 5;
        _this._totalCount = 0;
        _this._itemSize = cc.size(0, 0);
        _this._spaceX = 0;
        _this._bannerSize = cc.size(0, 0);
        _this._itemArray = [];
        _this._curOffsetX = 0;
        _this._minOffsetX = 0;
        _this._maxOffsetX = 0;
        // 起始位置的索引值
        _this._startIndex = 0;
        // 滑动方向 -1 向左， 1 向右
        _this._scrollDir = 0;
        // 交叉推广数据,数组
        _this._recommendData = null;
        _this._dataDirty = false;
        _this._isInit = false;
        _this._isScorllBar = false; //是否滚动条
        _this._location = null; //显示位置
        _this._itemPosX = 0;
        _this._itemtmp = null;
        _this._itemToCenterLength = 0;
        _this._percent = 1;
        _this._canAutoScroll = true;
        _this._autoScrollInterval = 2.5;
        _this._timeTmp = 0;
        return _this;
    }
    YZ_ListView.prototype.onLoad = function () {
        this._scrollView = this.getComponent(cc.ScrollView);
        this._content = this._scrollView.content;
        this._itemObj = cc.find("GamePage", this._content);
        this._itemSize = this._itemObj.getContentSize();
        this._startIndex = 0;
        this._bannerSize = this.node.getContentSize();
    };
    YZ_ListView.prototype.onEnable = function () {
        this._scrollView.node.on("scrolling", this.OnScroll, this);
        this._scrollView.node.on("scroll-ended", this.onScrollEnded, this);
    };
    YZ_ListView.prototype.onDisable = function () {
        this._scrollView.node.targetOff(this);
    };
    YZ_ListView.prototype.update = function (dt) {
        if (this._isInit) {
            if (this._scrollView) {
                if (this._scrollView.isScrolling) {
                    for (var i = 0; i < this._itemArray.length; i++) {
                        this._itemtmp = this._itemArray[i];
                        this._itemToCenterLength = Math.abs(this._itemtmp.x + this._content.x - this._bannerSize.width * 0.5);
                        if ((this._itemSize.width - this._itemToCenterLength) > 0) {
                            this._percent = (this._itemSize.width - this._itemToCenterLength) / this._itemSize.width;
                            // if (!this._isScorllBar) {
                            //     this._itemtmp.scale = 1 + this._percent * 0.2;
                            // }
                        }
                        else {
                            if (!this._isScorllBar) {
                                this._itemtmp.scale = 1;
                            }
                        }
                    }
                }
            }
            this.autoScroll(dt);
        }
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    };
    YZ_ListView.prototype.init = function (data, isScorllBar) {
        if (isScorllBar === void 0) { isScorllBar = false; }
        if (data) {
            this._recommendData = data;
            this._totalCount = data.length;
            this._dataDirty = true;
            this._isScorllBar = isScorllBar;
            if (this._isScorllBar) {
                this._location = YZ_Constant_1.SubLocation.isScrollbar;
                this._autoScrollInterval = 0.3;
            }
            else {
                this._location = YZ_Constant_1.SubLocation.isYzBanner;
            }
        }
    };
    YZ_ListView.prototype._updateContent = function () {
        // 初始化content大小
        var num = this._recommendData.length;
        this._content.setContentSize(cc.size(this._itemSize.width * num, this._itemSize.height));
        this.InitObjs();
    };
    YZ_ListView.prototype.InitObjs = function () {
        var obj = null;
        for (var i = 0; i < this._totalCount; i++) {
            obj = cc.instantiate(this._itemObj);
            obj.x = this._spaceX * 0.5 + this._itemSize.width * 0.5 + this._itemSize.width * i + this._spaceX * i;
            obj.y = 0;
            obj.getComponentInChildren("GameItem").init(this._recommendData[i], this._location);
            this._content.addChild(obj);
            this._itemArray.push(obj);
        }
        var unvisibleCount = this._totalCount - this._visibleCount;
        this._maxOffsetX = (this._spaceX + this._itemSize.width) * unvisibleCount * -1;
        this._itemObj.destroy();
        this._isInit = true;
    };
    YZ_ListView.prototype.OnScroll = function (scrollview, eventType, customEventData) {
        this._content.stopAllActions();
        this._canAutoScroll = false;
        if (this._scrollView.getScrollOffset().x < this._curOffsetX) {
            this._scrollDir = -1;
        }
        else {
            this._scrollDir = 1;
        }
        this._curOffsetX = this._scrollView.getScrollOffset().x;
        if (this._scrollView.getScrollOffset().x == 0) {
            // utils.showLog("到达最左端......");
            // 向右滑动，到达最左端
            this._arriveLeft();
        }
        else if (this._scrollView.getScrollOffset().x == this._maxOffsetX) {
            // utils.showLog("到达最右端......");
            // 向左滑动，到达最右端
            this._arriveRight();
        }
    };
    YZ_ListView.prototype.onScrollEnded = function (scrollview, eventType, customEventData) {
        var stopIdx = 0;
        var tmp = Math.abs(this._curOffsetX) % (this._itemSize.width + this._spaceX);
        if (tmp > (this._itemSize.width + this._spaceX) * 0.5) {
            // 前进一格
            stopIdx = Math.ceil(Math.abs(this._curOffsetX) / (this._itemSize.width + this._spaceX));
        }
        else {
            // 后退一格
            stopIdx = Math.floor(Math.abs(this._curOffsetX) / (this._itemSize.width + this._spaceX));
        }
        var posX = (this._itemSize.width + this._spaceX) * stopIdx * -1;
        this._curOffsetX = posX;
        this.scroll(posX, 0.3);
    };
    YZ_ListView.prototype._arriveLeft = function () {
        this._scrollView.setContentPosition(CompatibleTool_1.default.position(this._maxOffsetX, 0));
        this._curOffsetX = this._maxOffsetX;
        this._startIndex = (this._visibleCount + this._startIndex) % this._totalCount;
        this.refreshItem();
    };
    YZ_ListView.prototype._arriveRight = function () {
        this._scrollView.setContentPosition(CompatibleTool_1.default.position(0, 0));
        this._curOffsetX = 0;
        this._startIndex = (this._startIndex + this._totalCount - this._visibleCount) % this._totalCount;
        this.refreshItem();
    };
    YZ_ListView.prototype.refreshItem = function () {
        var posIdx = 0;
        var obj = null;
        for (var i = 0; i < this._totalCount; i++) {
            posIdx = (this._totalCount - this._startIndex + i) % this._totalCount;
            obj = this._itemArray[i];
            obj.x = this._spaceX * 0.5 + this._itemSize.width * 0.5 + this._spaceX * posIdx + this._itemSize.width * posIdx;
        }
    };
    YZ_ListView.prototype.autoScroll = function (dt) {
        if (this._canAutoScroll) {
            this._timeTmp += dt;
            if (this._timeTmp >= this._autoScrollInterval) {
                this._timeTmp = 0;
                var posX = this._curOffsetX - this._itemSize.width - this._spaceX;
                this._curOffsetX = posX;
                this._scrollDir = -1;
                if (this._isScorllBar) {
                    this.scroll(posX, 0);
                }
                else {
                    this.scroll(posX, 0.5);
                }
            }
        }
        else {
            this._timeTmp = 0;
        }
    };
    YZ_ListView.prototype.scroll = function (posX, duration) {
        var _this = this;
        this._content.runAction(cc.sequence(cc.moveTo(duration, CompatibleTool_1.default.position(posX, 0)), cc.callFunc(function () {
            _this._canAutoScroll = true;
            if (_this._scrollDir == 1 && _this._curOffsetX == 0) {
                _this._arriveLeft();
            }
            else if (_this._scrollDir == -1 && _this._curOffsetX == _this._maxOffsetX) {
                _this._arriveRight();
            }
        })));
    };
    YZ_ListView = __decorate([
        ccclass
    ], YZ_ListView);
    return YZ_ListView;
}(cc.Component));
exports.default = YZ_ListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfTGlzdFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQTZOQztRQTNORyxpQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGVBQVMsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGlCQUFXLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFckMsZ0JBQVUsR0FBYyxFQUFFLENBQUM7UUFFM0IsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsV0FBVztRQUNYLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLG1CQUFtQjtRQUNuQixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixZQUFZO1FBQ1osb0JBQWMsR0FBUSxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBWSxHQUFZLEtBQUssQ0FBQyxDQUFDLE9BQU87UUFFL0IsZUFBUyxHQUFnQixJQUFJLENBQUMsQ0FBQyxNQUFNO1FBcUI1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IHsgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9MaXN0VmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgX3Njcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG4gICAgX2NvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2l0ZW1PYmo6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIF92aXNpYmxlQ291bnQ6IG51bWJlciA9IDU7XHJcbiAgICBfdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfaXRlbVNpemU6IGNjLlNpemUgPSBjYy5zaXplKDAsIDApO1xyXG4gICAgX3NwYWNlWDogbnVtYmVyID0gMDtcclxuICAgIF9iYW5uZXJTaXplOiBjYy5TaXplID0gY2Muc2l6ZSgwLCAwKTtcclxuXHJcbiAgICBfaXRlbUFycmF5OiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBfY3VyT2Zmc2V0WDogbnVtYmVyID0gMDtcclxuICAgIF9taW5PZmZzZXRYOiBudW1iZXIgPSAwO1xyXG4gICAgX21heE9mZnNldFg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy8g6LW35aeL5L2N572u55qE57Si5byV5YC8XHJcbiAgICBfc3RhcnRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8vIOa7keWKqOaWueWQkSAtMSDlkJHlt6bvvIwgMSDlkJHlj7NcclxuICAgIF9zY3JvbGxEaXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy8g5Lqk5Y+J5o6o5bm/5pWw5o2uLOaVsOe7hFxyXG4gICAgX3JlY29tbWVuZERhdGE6IGFueSA9IG51bGw7XHJcbiAgICBfZGF0YURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNJbml0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfaXNTY29ybGxCYXI6IGJvb2xlYW4gPSBmYWxzZTsgLy/mmK/lkKbmu5rliqjmnaFcclxuXHJcbiAgICBwdWJsaWMgX2xvY2F0aW9uOiBTdWJMb2NhdGlvbiA9IG51bGw7IC8v5pi+56S65L2N572uXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5fY29udGVudCA9IHRoaXMuX3Njcm9sbFZpZXcuY29udGVudDtcclxuICAgICAgICB0aGlzLl9pdGVtT2JqID0gY2MuZmluZChcIkdhbWVQYWdlXCIsIHRoaXMuX2NvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1TaXplID0gdGhpcy5faXRlbU9iai5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuX2Jhbm5lclNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3Lm5vZGUub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5PblNjcm9sbCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsVmlldy5ub2RlLm9uKFwic2Nyb2xsLWVuZGVkXCIsIHRoaXMub25TY3JvbGxFbmRlZCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbFZpZXcubm9kZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2l0ZW1Qb3NYOiBudW1iZXIgPSAwO1xyXG4gICAgX2l0ZW10bXA6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX2l0ZW1Ub0NlbnRlckxlbmd0aDogbnVtYmVyID0gMDtcclxuICAgIF9wZXJjZW50OiBudW1iZXIgPSAxO1xyXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbml0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsVmlldy5pc1Njcm9sbGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faXRlbUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW10bXAgPSB0aGlzLl9pdGVtQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1Ub0NlbnRlckxlbmd0aCA9IE1hdGguYWJzKHRoaXMuX2l0ZW10bXAueCArIHRoaXMuX2NvbnRlbnQueCAtIHRoaXMuX2Jhbm5lclNpemUud2lkdGggKiAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuX2l0ZW1TaXplLndpZHRoIC0gdGhpcy5faXRlbVRvQ2VudGVyTGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BlcmNlbnQgPSAodGhpcy5faXRlbVNpemUud2lkdGggLSB0aGlzLl9pdGVtVG9DZW50ZXJMZW5ndGgpIC8gdGhpcy5faXRlbVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIXRoaXMuX2lzU2NvcmxsQmFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5faXRlbXRtcC5zY2FsZSA9IDEgKyB0aGlzLl9wZXJjZW50ICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1Njb3JsbEJhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW10bXAuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmF1dG9TY3JvbGwoZHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhOiBhbnksIGlzU2NvcmxsQmFyOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvbW1lbmREYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5fdG90YWxDb3VudCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Njb3JsbEJhciA9IGlzU2NvcmxsQmFyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNTY29ybGxCYXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gU3ViTG9jYXRpb24uaXNTY3JvbGxiYXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsSW50ZXJ2YWwgPSAwLjM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IFN1YkxvY2F0aW9uLmlzWXpCYW5uZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlQ29udGVudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJZjb250ZW505aSn5bCPXHJcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gdGhpcy5fcmVjb21tZW5kRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5zZXRDb250ZW50U2l6ZShjYy5zaXplKHRoaXMuX2l0ZW1TaXplLndpZHRoICogbnVtLCB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQpKTtcclxuICAgICAgICB0aGlzLkluaXRPYmpzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdE9ianMoKSB7XHJcbiAgICAgICAgbGV0IG9iajogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90b3RhbENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgb2JqID0gY2MuaW5zdGFudGlhdGUodGhpcy5faXRlbU9iaik7XHJcbiAgICAgICAgICAgIG9iai54ID0gdGhpcy5fc3BhY2VYICogMC41ICsgdGhpcy5faXRlbVNpemUud2lkdGggKiAwLjUgKyB0aGlzLl9pdGVtU2l6ZS53aWR0aCAqIGkgKyB0aGlzLl9zcGFjZVggKiBpO1xyXG4gICAgICAgICAgICBvYmoueSA9IDA7XHJcbiAgICAgICAgICAgIG9iai5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFwiR2FtZUl0ZW1cIikuaW5pdCh0aGlzLl9yZWNvbW1lbmREYXRhW2ldLCB0aGlzLl9sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQuYWRkQ2hpbGQob2JqKTtcclxuICAgICAgICAgICAgdGhpcy5faXRlbUFycmF5LnB1c2gob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB1bnZpc2libGVDb3VudDogbnVtYmVyID0gdGhpcy5fdG90YWxDb3VudCAtIHRoaXMuX3Zpc2libGVDb3VudDtcclxuICAgICAgICB0aGlzLl9tYXhPZmZzZXRYID0gKHRoaXMuX3NwYWNlWCArIHRoaXMuX2l0ZW1TaXplLndpZHRoKSAqIHVudmlzaWJsZUNvdW50ICogLTE7XHJcblxyXG4gICAgICAgIHRoaXMuX2l0ZW1PYmouZGVzdHJveSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9pc0luaXQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIE9uU2Nyb2xsKHNjcm9sbHZpZXc6IGNjLlNjcm9sbFZpZXcsIGV2ZW50VHlwZTogY2MuU2Nyb2xsVmlldy5FdmVudFR5cGUsIGN1c3RvbUV2ZW50RGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX2NhbkF1dG9TY3JvbGwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbFZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCkueCA8IHRoaXMuX2N1ck9mZnNldFgpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRGlyID0gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRGlyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VyT2Zmc2V0WCA9IHRoaXMuX3Njcm9sbFZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCkueDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbFZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCkueCA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIHV0aWxzLnNob3dMb2coXCLliLDovr7mnIDlt6bnq68uLi4uLi5cIik7XHJcbiAgICAgICAgICAgIC8vIOWQkeWPs+a7keWKqO+8jOWIsOi+vuacgOW3puerr1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJpdmVMZWZ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zY3JvbGxWaWV3LmdldFNjcm9sbE9mZnNldCgpLnggPT0gdGhpcy5fbWF4T2Zmc2V0WCkge1xyXG4gICAgICAgICAgICAvLyB1dGlscy5zaG93TG9nKFwi5Yiw6L6+5pyA5Y+z56uvLi4uLi4uXCIpO1xyXG4gICAgICAgICAgICAvLyDlkJHlt6bmu5HliqjvvIzliLDovr7mnIDlj7Pnq69cclxuICAgICAgICAgICAgdGhpcy5fYXJyaXZlUmlnaHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU2Nyb2xsRW5kZWQoc2Nyb2xsdmlldzogY2MuU2Nyb2xsVmlldywgZXZlbnRUeXBlOiBjYy5TY3JvbGxWaWV3LkV2ZW50VHlwZSwgY3VzdG9tRXZlbnREYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgc3RvcElkeDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgdG1wOiBudW1iZXIgPSBNYXRoLmFicyh0aGlzLl9jdXJPZmZzZXRYKSAlICh0aGlzLl9pdGVtU2l6ZS53aWR0aCArIHRoaXMuX3NwYWNlWCk7XHJcbiAgICAgICAgaWYgKHRtcCA+ICh0aGlzLl9pdGVtU2l6ZS53aWR0aCArIHRoaXMuX3NwYWNlWCkgKiAwLjUpIHtcclxuICAgICAgICAgICAgLy8g5YmN6L+b5LiA5qC8XHJcbiAgICAgICAgICAgIHN0b3BJZHggPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5fY3VyT2Zmc2V0WCkgLyAodGhpcy5faXRlbVNpemUud2lkdGggKyB0aGlzLl9zcGFjZVgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDlkI7pgIDkuIDmoLxcclxuICAgICAgICAgICAgc3RvcElkeCA9IE1hdGguZmxvb3IoTWF0aC5hYnModGhpcy5fY3VyT2Zmc2V0WCkgLyAodGhpcy5faXRlbVNpemUud2lkdGggKyB0aGlzLl9zcGFjZVgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvc1g6IG51bWJlciA9ICh0aGlzLl9pdGVtU2l6ZS53aWR0aCArIHRoaXMuX3NwYWNlWCkgKiBzdG9wSWR4ICogLTE7XHJcbiAgICAgICAgdGhpcy5fY3VyT2Zmc2V0WCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy5zY3JvbGwocG9zWCwgMC4zKTtcclxuICAgIH1cclxuXHJcbiAgICBfYXJyaXZlTGVmdCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3LnNldENvbnRlbnRQb3NpdGlvbihDb21wYXRpYmxlVG9vbC5wb3NpdGlvbih0aGlzLl9tYXhPZmZzZXRYLCAwKSk7XHJcbiAgICAgICAgdGhpcy5fY3VyT2Zmc2V0WCA9IHRoaXMuX21heE9mZnNldFg7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRJbmRleCA9ICh0aGlzLl92aXNpYmxlQ291bnQgKyB0aGlzLl9zdGFydEluZGV4KSAlIHRoaXMuX3RvdGFsQ291bnQ7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9hcnJpdmVSaWdodCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3LnNldENvbnRlbnRQb3NpdGlvbihDb21wYXRpYmxlVG9vbC5wb3NpdGlvbigwLCAwKSk7XHJcbiAgICAgICAgdGhpcy5fY3VyT2Zmc2V0WCA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRJbmRleCA9ICh0aGlzLl9zdGFydEluZGV4ICsgdGhpcy5fdG90YWxDb3VudCAtIHRoaXMuX3Zpc2libGVDb3VudCkgJSB0aGlzLl90b3RhbENvdW50O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hJdGVtKCkge1xyXG4gICAgICAgIGxldCBwb3NJZHg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG9iajogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90b3RhbENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcG9zSWR4ID0gKHRoaXMuX3RvdGFsQ291bnQgLSB0aGlzLl9zdGFydEluZGV4ICsgaSkgJSB0aGlzLl90b3RhbENvdW50O1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLl9pdGVtQXJyYXlbaV07XHJcbiAgICAgICAgICAgIG9iai54ID0gdGhpcy5fc3BhY2VYICogMC41ICsgdGhpcy5faXRlbVNpemUud2lkdGggKiAwLjUgKyB0aGlzLl9zcGFjZVggKiBwb3NJZHggKyB0aGlzLl9pdGVtU2l6ZS53aWR0aCAqIHBvc0lkeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NhbkF1dG9TY3JvbGw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgX2F1dG9TY3JvbGxJbnRlcnZhbDogbnVtYmVyID0gMi41O1xyXG4gICAgX3RpbWVUbXA6IG51bWJlciA9IDA7XHJcbiAgICBhdXRvU2Nyb2xsKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FuQXV0b1Njcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lVG1wICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGltZVRtcCA+PSB0aGlzLl9hdXRvU2Nyb2xsSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVUbXAgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvc1g6IG51bWJlciA9IHRoaXMuX2N1ck9mZnNldFggLSB0aGlzLl9pdGVtU2l6ZS53aWR0aCAtIHRoaXMuX3NwYWNlWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ck9mZnNldFggPSBwb3NYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRGlyID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNTY29ybGxCYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbChwb3NYLCAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwocG9zWCwgMC41KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lVG1wID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsKHBvc1g6IG51bWJlciwgZHVyYXRpb246IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbyhkdXJhdGlvbiwgQ29tcGF0aWJsZVRvb2wucG9zaXRpb24ocG9zWCwgMCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbkF1dG9TY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsRGlyID09IDEgJiYgdGhpcy5fY3VyT2Zmc2V0WCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcnJpdmVMZWZ0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2Nyb2xsRGlyID09IC0xICYmIHRoaXMuX2N1ck9mZnNldFggPT0gdGhpcy5fbWF4T2Zmc2V0WCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyaXZlUmlnaHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuIl19