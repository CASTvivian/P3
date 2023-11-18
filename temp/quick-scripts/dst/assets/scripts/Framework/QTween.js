
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/QTween.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '05a06upE5xFF5F3p1c1BzPh', 'QTween');
// scripts/Framework/QTween.ts

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
exports.TweenMess = exports.TweenTyep = void 0;
var TweenTyep;
(function (TweenTyep) {
    TweenTyep[TweenTyep["move"] = 0] = "move";
    TweenTyep[TweenTyep["circle"] = 1] = "circle";
    TweenTyep[TweenTyep["bezier"] = 2] = "bezier";
    TweenTyep[TweenTyep["rotate"] = 3] = "rotate";
    TweenTyep[TweenTyep["scale"] = 4] = "scale";
})(TweenTyep = exports.TweenTyep || (exports.TweenTyep = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TweenMess = /** @class */ (function () {
    function TweenMess() {
        this.tweenType = TweenTyep.move;
        this.posList = [cc.v2(0, 0)];
        this.angleV = 0;
        this.actTime = 1;
        this.delayTime = 0;
    }
    __decorate([
        property({ type: cc.Enum(TweenTyep) })
    ], TweenMess.prototype, "tweenType", void 0);
    __decorate([
        property({ type: [cc.Vec2] })
    ], TweenMess.prototype, "posList", void 0);
    __decorate([
        property({ visible: function () { return this.tweenType == TweenTyep.circle || this.tweenType == TweenTyep.rotate; } })
    ], TweenMess.prototype, "angleV", void 0);
    __decorate([
        property()
    ], TweenMess.prototype, "actTime", void 0);
    __decorate([
        property()
    ], TweenMess.prototype, "delayTime", void 0);
    TweenMess = __decorate([
        ccclass("TweenMess")
    ], TweenMess);
    return TweenMess;
}());
exports.TweenMess = TweenMess;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tweenList = [];
        _this.startNum = 0;
        _this.mainTween = null;
        _this.angleConut = 0;
        _this.centerPos = cc.v2(0, 0);
        _this.isRotate = false;
        return _this;
    }
    // @property
    // delayTime: number = 0;
    NewClass.prototype.start = function () {
        this.creatTween();
        this.node.opacity = 255;
    };
    NewClass.prototype.creatTween = function () {
        var _this = this;
        this.mainTween = cc.tween(this.node);
        if (this.tweenList.length <= 0)
            return;
        var _loop_1 = function (i) {
            var tw = this_1.tweenList[i];
            if (tw.tweenType == TweenTyep.move) {
                this_1.mainTween.to(tw.actTime, { position: tw.posList[0] }).delay(tw.delayTime);
            }
            else if (tw.tweenType == TweenTyep.bezier) {
                this_1.runRotate();
                this_1.mainTween.bezierTo(tw.actTime, tw.posList[0], tw.posList[1], tw.posList[2]).delay(tw.delayTime);
            }
            else if (tw.tweenType == TweenTyep.circle) {
                this_1.mainTween.call(function () {
                    _this.CurAngle = 0;
                    _this.centerPos = tw.posList[0];
                    // @ts-ignore
                    var tween = cc.tween(_this).to(tw.actTime, { CurAngle: tw.angleV * tw.actTime }).start();
                }).delay(tw.actTime + tw.delayTime);
            }
            else if (tw.tweenType == TweenTyep.rotate) {
                this_1.mainTween.by(tw.actTime, { angle: tw.angleV });
            }
            else if (tw.tweenType == TweenTyep.scale) {
                this_1.mainTween.to(tw.actTime, { scaleX: tw.posList[0].x, scaleY: tw.posList[0].y }).delay(tw.delayTime);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.tweenList.length; i++) {
            _loop_1(i);
        }
        this.mainTween.union().repeatForever().start();
    };
    Object.defineProperty(NewClass.prototype, "CurAngle", {
        get: function () {
            return this.angleConut;
        },
        set: function (num) {
            if (Math.abs(this.angleConut - num) < 10) {
                var pos = cc.v2(this.node.getPosition());
                pos = pos.sub(this.centerPos).rotate((num - this.angleConut) / 180 * Math.PI).add(this.centerPos);
                this.node.setPosition(pos);
            }
            this.angleConut = num;
        },
        enumerable: false,
        configurable: true
    });
    NewClass.prototype.runRotate = function () {
        var _this = this;
        if (this.isRotate)
            return;
        this.isRotate = true;
        if (this.node.x < 0) {
            this.schedule(function () { _this.node.angle += 3; }, 0.01);
        }
        else {
            this.schedule(function () { _this.node.angle -= 3; }, 0.01);
        }
    };
    __decorate([
        property({ type: [TweenMess] })
    ], NewClass.prototype, "tweenList", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxRVHdlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNqQix5Q0FBUSxDQUFBO0lBQ1IsNkNBQU0sQ0FBQTtJQUNOLDZDQUFNLENBQUE7SUFDTiw2Q0FBTSxDQUFBO0lBQ04sMkNBQUssQ0FBQTtBQUNULENBQUMsRUFOVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQUVLLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7UUFFSSxjQUFTLEdBQWMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUV0QyxZQUFPLEdBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFFcEIsY0FBUyxHQUFXLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBVEc7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2dEQUNEO0lBRXRDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7OENBQ1U7SUFFeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLGdCQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDOzZDQUN6RjtJQUVuQjtRQURDLFFBQVEsRUFBRTs4Q0FDUztJQUVwQjtR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QzthQUM5QjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQzFCLENBQUM7OztPQVRBO0lBWUQsNEJBQVMsR0FBVDtRQUFBLGlCQVNDO1FBUkcsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2RDthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFyRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOytDQUNDO0lBSGhCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F5RTVCO0lBQUQsZUFBQztDQXpFRCxBQXlFQyxDQXpFcUMsRUFBRSxDQUFDLFNBQVMsR0F5RWpEO2tCQXpFb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFR3ZWVuVHllcCB7XHJcbiAgICBtb3ZlID0gMCxcclxuICAgIGNpcmNsZSxcclxuICAgIGJlemllcixcclxuICAgIHJvdGF0ZSxcclxuICAgIHNjYWxlXHJcbn1cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzcyhcIlR3ZWVuTWVzc1wiKVxyXG5leHBvcnQgY2xhc3MgVHdlZW5NZXNzIHtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oVHdlZW5UeWVwKSB9KVxyXG4gICAgdHdlZW5UeXBlOiBUd2VlblR5ZXAgPSBUd2VlblR5ZXAubW92ZTtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5WZWMyXSB9KVxyXG4gICAgcG9zTGlzdDogQXJyYXk8Y2MuVmVjMj4gPSBbY2MudjIoMCwgMCldO1xyXG4gICAgQHByb3BlcnR5KHsgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudHdlZW5UeXBlID09IFR3ZWVuVHllcC5jaXJjbGUgfHwgdGhpcy50d2VlblR5cGUgPT0gVHdlZW5UeWVwLnJvdGF0ZSB9IH0pXHJcbiAgICBhbmdsZVY6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgYWN0VGltZTogbnVtYmVyID0gMTtcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBkZWxheVRpbWU6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbVHdlZW5NZXNzXSB9KVxyXG4gICAgdHdlZW5MaXN0OiBBcnJheTxUd2Vlbk1lc3M+ID0gW107XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyBkZWxheVRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdFR3ZWVuKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROdW06IG51bWJlciA9IDA7XHJcbiAgICBtYWluVHdlZW46IGNjLlR3ZWVuID0gbnVsbDtcclxuICAgIGNyZWF0VHdlZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYWluVHdlZW4gPSBjYy50d2Vlbih0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVuTGlzdC5sZW5ndGggPD0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2Vlbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHR3ID0gdGhpcy50d2Vlbkxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmICh0dy50d2VlblR5cGUgPT0gVHdlZW5UeWVwLm1vdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblR3ZWVuLnRvKHR3LmFjdFRpbWUsIHsgcG9zaXRpb246IHR3LnBvc0xpc3RbMF0gfSkuZGVsYXkodHcuZGVsYXlUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0dy50d2VlblR5cGUgPT0gVHdlZW5UeWVwLmJlemllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5Sb3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblR3ZWVuLmJlemllclRvKHR3LmFjdFRpbWUsIHR3LnBvc0xpc3RbMF0sIHR3LnBvc0xpc3RbMV0sIHR3LnBvc0xpc3RbMl0pLmRlbGF5KHR3LmRlbGF5VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHcudHdlZW5UeXBlID09IFR3ZWVuVHllcC5jaXJjbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblR3ZWVuLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VyQW5nbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VudGVyUG9zID0gdHcucG9zTGlzdFswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2VlbiA9IGNjLnR3ZWVuKHRoaXMpLnRvKHR3LmFjdFRpbWUsIHsgQ3VyQW5nbGU6IHR3LmFuZ2xlViAqIHR3LmFjdFRpbWUgfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5kZWxheSh0dy5hY3RUaW1lICsgdHcuZGVsYXlUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0dy50d2VlblR5cGUgPT0gVHdlZW5UeWVwLnJvdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVHdlZW4uYnkodHcuYWN0VGltZSwgeyBhbmdsZTogdHcuYW5nbGVWIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR3LnR3ZWVuVHlwZSA9PSBUd2VlblR5ZXAuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblR3ZWVuLnRvKHR3LmFjdFRpbWUsIHsgc2NhbGVYOiB0dy5wb3NMaXN0WzBdLngsIHNjYWxlWTogdHcucG9zTGlzdFswXS55IH0pLmRlbGF5KHR3LmRlbGF5VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWluVHdlZW4udW5pb24oKS5yZXBlYXRGb3JldmVyKCkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmdsZUNvbnV0OiBudW1iZXIgPSAwO1xyXG4gICAgY2VudGVyUG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcbiAgICBnZXQgQ3VyQW5nbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5nbGVDb251dDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgQ3VyQW5nbGUobnVtKSB7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGVDb251dCAtIG51bSkgPCAxMCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gY2MudjIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBwb3MgPSBwb3Muc3ViKHRoaXMuY2VudGVyUG9zKS5yb3RhdGUoKG51bSAtIHRoaXMuYW5nbGVDb251dCkgLyAxODAgKiBNYXRoLlBJKS5hZGQodGhpcy5jZW50ZXJQb3MpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmdsZUNvbnV0ID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUm90YXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBydW5Sb3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSb3RhdGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUm90YXRlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4geyB0aGlzLm5vZGUuYW5nbGUgKz0gMyB9LCAwLjAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4geyB0aGlzLm5vZGUuYW5nbGUgLT0gMyB9LCAwLjAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19