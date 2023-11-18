"use strict";
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