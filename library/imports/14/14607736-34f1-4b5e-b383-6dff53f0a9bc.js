"use strict";
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