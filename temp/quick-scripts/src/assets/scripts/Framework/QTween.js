"use strict";
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