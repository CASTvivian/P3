"use strict";
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