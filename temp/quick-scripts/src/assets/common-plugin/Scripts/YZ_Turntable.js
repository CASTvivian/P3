"use strict";
cc._RF.push(module, '51051Ce0K5D5bDuItdfCQ7T', 'YZ_Turntable');
// common-plugin/Scripts/YZ_Turntable.ts

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
var Utils_1 = require("./Utils");
var YZ_Constant_1 = require("./YZ_Constant");
var CompatibleTool_1 = require("./CompatibleTool");
var YZ_LocalStorage_1 = require("./YZ_LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// const gearInfo = [200, 100, 300, 400, 800, 500, 1000, 4000];
var ST_TurntableCounts = "turntable_counts";
var ST_TurntableTimes = "turntable_times";
/**
 * 转盘
 */
var YZ_Turntable = /** @class */ (function (_super) {
    __extends(YZ_Turntable, _super);
    function YZ_Turntable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spinBtn = null;
        _this.wheelSp = null;
        _this.greaSprite = null;
        _this.firstSpriteFrame = null;
        _this.secondSpriteFrame = null;
        _this.lastSpriteFrame = null;
        _this.effectAudio = null;
        _this.panel = null;
        _this.videoIcon = null;
        _this.spriteDouble = null;
        _this.spritePass = null;
        _this.tirpNode = null;
        _this.checked = null;
        _this.closeBtn = null;
        _this.videoBtn = null;
        _this.resultMsg = null;
        _this.turnCountLbl = null;
        _this.luckBox = null;
        _this.countBar = null;
        _this.normalBtn = null;
        _this.normalCloseBtn = null;
        _this.topCloseBtn = null;
        /**
         *  max: 15,
            min: 2,
         */
        _this.maxSpeed = 12;
        /**
         * 减速前旋转时间
         *  max: 5,
            min: 1,
         */
        _this.duration = 3;
        /**
         * 加速度
         *  max: 0.2,
            min: 0.01,
         */
        _this.acc = 0.1;
        /**
         * 指定结束时的齿轮
         *  max: 17,
            min: 0,
         */
        _this.targetID = 0;
        /**
         * 旋转结束是否回弹
         *
         */
        _this.springback = false;
        _this.wheelState = 0;
        _this.curSpeed = 0;
        _this.spinTime = 0; //减速前旋转时间
        _this.gearNum = 8;
        _this.defaultAngle = 360 / 8 / 2 - 22; //修正默认角度
        _this.gearAngle = 360 / _this.gearNum; //每个齿轮的角度
        _this.finalAngle = 0; //最终结果指定的角度
        _this.effectFlag = 0; //用于音效播放
        _this.audioID = 0;
        _this.decAngle = 0;
        /**
         * 抽奖次数
         */
        _this._turntableCount = 0;
        /**
         * 抽奖次数
         */
        _this._turntablePlayCount = 0;
        _this.luckBoxCount = 4;
        _this._updateProgress = false;
        _this._progress = 0;
        _this.defaultProgress = 0.00000001;
        /**
         * 奖励回调
         */
        _this.rewardCallFunc = null;
        _this.gearInfo = [200, 100, 300, 400, 800, 500, 1000, 4000];
        return _this;
    }
    Object.defineProperty(YZ_Turntable.prototype, "turntableCount", {
        get: function () {
            return this._turntableCount;
        },
        set: function (count) {
            this._turntableCount = count;
            YZ_LocalStorage_1.default.setItem(ST_TurntableTimes, new Date().toDateString());
            YZ_LocalStorage_1.default.setItem(ST_TurntableCounts, this._turntableCount);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YZ_Turntable.prototype, "turntablePlayCount", {
        get: function () {
            return this._turntablePlayCount;
        },
        set: function (count) {
            var _this = this;
            if (this.luckBoxCount - count == 0) {
                this.luckBox.node.active = true;
                count = 0;
                this.countBar.progress = this.defaultProgress;
                this.luckBox.setAnimation(1, "dakai", false);
                this.scheduleOnce(function () {
                    Utils_1.utils.SendEvent("转盘抽奖获取累计4次大奖！");
                    _this.showMsg(_this.gearInfo[7]);
                    if (_this.rewardCallFunc) {
                        var result = new YZ_Constant_1.YZ_Reward();
                        result.rewardValue = _this.gearInfo[7];
                        _this.rewardCallFunc(result);
                    }
                }, 0.6);
                this.scheduleOnce(function () {
                    _this.luckBox.setAnimation(1, "kd", false);
                }, 2);
                this.scheduleOnce(function () {
                    _this.luckBox.node.runAction(cc.sequence(cc.scaleTo(0.2, 0.8), cc.callFunc(function () {
                        _this.luckBox.node.active = false;
                        _this.luckBox.node.scale = 2;
                    })));
                }, 4);
            }
            this._turntablePlayCount = count;
            YZ_LocalStorage_1.default.setItem("turntablePlayCount", this._turntablePlayCount);
            this._progress = count / this.luckBoxCount;
            this.turnCountLbl.string = (this.luckBoxCount - count) + "";
            this.turnCountLbl.node.runAction(cc.sequence(cc.scaleTo(0.3, 1.8), cc.scaleTo(0.3, 1)));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化事件回调
     * @param closeCallFunc
     * @param rewardCallFunc
     */
    YZ_Turntable.prototype.init = function (closeCallFunc, rewardCallFunc, gearInfo, gearImagePath) {
        var _this = this;
        // this.closeCallFunc = closeCallFunc;
        this.rewardCallFunc = rewardCallFunc;
        if (gearInfo.length > 0) {
            this.gearInfo = gearInfo;
        }
        if (gearImagePath) {
            Utils_1.utils.showLog("配置为服务器的奖励图片：", gearImagePath);
            CompatibleTool_1.default.LoadRes(gearImagePath, function (err, res) {
                if (!err && cc.isValid(_this) && _this.greaSprite) {
                    _this.greaSprite.spriteFrame = new cc.SpriteFrame(res);
                }
            });
        }
    };
    YZ_Turntable.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this.wheelSp.node.rotation = this.defaultAngle;
        // this.spinBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     this.startTurnTable();
        // });
        Utils_1.utils.SendEvent("转盘抽奖-显示成功！");
        this.initCount();
        if (this.turntableCount <= 0) {
            this.normalBtn.active = false;
            this.videoBtn.active = true;
            this.normalCloseBtn.active = true;
            Utils_1.utils.showScaleAction(this.videoBtn, null, false, false);
        }
        else {
            this.normalCloseBtn.active = false;
            Utils_1.utils.showScaleAction(this.normalBtn, null, false, false);
        }
        Utils_1.utils.showSkipBtn(this.closeBtn, true);
        // if (this.turntableCount <= 0 && !CC_DEBUG) {
        //     let result = utils.controView(ViewLocation.turntable);
        //     if (result.is_open === true) {
        //         utils.delayShowNode(this.tirpNode);
        //         this.checked.active = result.isSelect;
        //         this.spritePass.active = !this.checked.active;
        //         this.spriteDouble.active = this.checked.active;
        //         this.videoIcon.active = this.checked.active;
        //         this.closeBtn.active = false;
        //         this.videoBtn.active = true;
        //         this.spinBtn.active = false;
        //     } else {
        //         this.checked.active = false;
        //         this.videoBtn.active = false;
        //         this.spinBtn.active = true;
        //         this.spinBtn.children[0].getComponent(cc.Sprite).spriteFrame = this.secondSpriteFrame;
        //     }
        // }
        this.rewardCallFunc = Utils_1.utils.rewardCallFunc;
        if (cc.winSize.height < cc.winSize.width) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
        }
        else {
            Utils_1.utils.adManager.ShowBanner(YZ_Constant_1.BannerLocation.Game);
        }
    };
    /**
     * 开始抽奖
     */
    YZ_Turntable.prototype.startTurnTable = function () {
        var _this = this;
        if (this.wheelState !== 0) {
            return;
        }
        if (this.turntableCount <= 0) {
            if (this.checked.active || this.spinBtn.active) {
                Utils_1.utils.adManager.ShowVideo(function (ret, msg) {
                    if (ret) {
                        _this.turntableCount = 1;
                        _this.startTurnTable();
                        Utils_1.utils.SendEvent("转盘抽奖获取奖励-成功！");
                    }
                    else {
                        Utils_1.utils.showMsg("观看完整视频可以获取一次抽奖机会！");
                        Utils_1.utils.SendEvent("转盘抽奖视频播放-失败！");
                        _this.onClose();
                    }
                });
                return;
            }
            else {
                // AldUtils.SendEvent("转盘抽奖-未勾选！");
                this.onClose();
                return;
            }
        }
        this.turntableCount = 0;
        this.targetID = this.getTargetId();
        this.decAngle = 2 * 360; // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
    };
    YZ_Turntable.prototype.onCheck = function () {
        this.checked.active = !this.checked.active;
        this.spritePass.active = !this.checked.active;
        this.spriteDouble.active = this.checked.active;
        this.videoIcon.active = this.checked.active;
        // AldUtils.SendEvent(`转盘抽奖-用户${this.checked.active ? "点击勾选" : "取消勾选"}`);
    };
    YZ_Turntable.prototype.onClose = function () {
        var _this = this;
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
            _this.node.destroy();
        })));
    };
    YZ_Turntable.prototype.onEnable = function () {
        this.panel.scale = 0;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = 0.6;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this.panel.runAction(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()));
    };
    YZ_Turntable.prototype.onDestroy = function () {
        if (Utils_1.utils.turnTablePanelCloseFunc) {
            Utils_1.utils.turnTablePanelCloseFunc();
            Utils_1.utils.turnTablePanelCloseFunc = null;
        }
        else {
            Utils_1.utils.rewardCloseFunc && Utils_1.utils.rewardCloseFunc();
            Utils_1.utils.rewardCloseFunc = null;
        }
        Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Game);
    };
    YZ_Turntable.prototype.checkBtnSpriteFrame = function () {
        if (this.turntableCount <= 0) {
            this.normalBtn.active = false;
            this.videoBtn.active = true;
            this.normalCloseBtn.active = true;
            Utils_1.utils.showScaleAction(this.videoBtn, null, false, false);
        }
        else {
            this.normalCloseBtn.active = false;
        }
        // if (this.turntableCount <= 0) {
        // let result = utils.controView(ViewLocation.turntable);
        // if (result.is_open === true) {
        //     utils.delayShowNode(this.tirpNode);
        //     this.checked.active = result.isSelect;
        //     this.spritePass.active = !this.checked.active;
        //     this.spriteDouble.active = this.checked.active;
        //     this.videoIcon.active = this.checked.active;
        //     this.closeBtn.active = false;
        //     this.videoBtn.active = true;
        //     this.spinBtn.active = false;
        // } else {
        //     this.checked.active = false;
        //     this.videoBtn.active = false;
        //     this.spinBtn.children[0].getComponent(cc.Sprite).spriteFrame = this.lastSpriteFrame;
        // }
        // }
    };
    YZ_Turntable.prototype.initCount = function () {
        var turntableCount = YZ_LocalStorage_1.default.getItem(ST_TurntableCounts);
        var day = YZ_LocalStorage_1.default.getItem(ST_TurntableTimes);
        var curDate = new Date();
        if (day != curDate.toDateString()) {
            this.turntableCount = 1;
        }
        else {
            this._turntableCount = turntableCount;
        }
        this.countBar.progress = this.defaultProgress;
        this.turntablePlayCount = YZ_LocalStorage_1.default.getItem("turntablePlayCount") ? YZ_LocalStorage_1.default.getItem("turntablePlayCount") : 0;
        this.countBar.progress = this.turntablePlayCount / this.luckBoxCount;
        Utils_1.utils.showLog("当前剩余抽奖次数：", this.turntableCount);
    };
    YZ_Turntable.prototype.test = function () {
        if (this.wheelState !== 0) {
            return;
        }
        this.targetID = this.getTargetId();
        cc.log("结果：", this.targetID);
        this.decAngle = 2 * 360; // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
    };
    YZ_Turntable.prototype.getTargetId = function () {
        var ranNum = Math.random(); //生成一个0-1的随机数
        var n = Math.random() / 4; //0-0.25随机数
        var result = 0;
        if (ranNum < 0.01) {
            result = 1; // 8
        }
        else if (ranNum < 0.04) {
            result = 0.9; // 7
        }
        else if (ranNum < 0.1) {
            result = 0.5; // 4
        }
        else if (ranNum < 0.2) {
            result = 0.7; // 5
        }
        else if (ranNum < 1) {
            result = Math.floor(Math.random() * 4) * 0.1; //0-4
        }
        return Math.floor(8 * result);
    };
    YZ_Turntable.prototype.showMsg = function (gold) {
        var msg = cc.instantiate(this.resultMsg);
        cc.find("kuang/goldLbl", msg).getComponent(cc.Label).string = "" + gold;
        msg.active = true;
        msg.scale = 0.3;
        this.node.addChild(msg);
        msg.runAction(cc.scaleTo(0.3, this.panel.scale).easing(cc.easeBackOut()));
        this.scheduleOnce(function () {
            msg.destroy();
            msg.removeFromParent();
        }, 1.2);
    };
    YZ_Turntable.prototype.showRes = function () {
        var _this = this;
        this.showMsg(this.gearInfo[this.targetID]);
        this.scheduleOnce(function () {
            _this.turntablePlayCount++;
        }, 1);
        if (this.rewardCallFunc) {
            var result = new YZ_Constant_1.YZ_Reward();
            result.rewardValue = this.gearInfo[this.targetID];
            this.rewardCallFunc(result);
        }
        this.checkBtnSpriteFrame();
    };
    YZ_Turntable.prototype.update = function (dt) {
        if (this.countBar.progress < this._progress) {
            this.countBar.progress += dt;
        }
        if (this.wheelState === 0) {
            return;
        }
        // 播放音效有可能卡
        this.effectFlag += this.curSpeed;
        if (this.effectFlag >= this.gearAngle) {
            this.audioID = cc.audioEngine.playEffect(this.effectAudio, false);
            this.effectFlag = 0;
        }
        if (this.wheelState == 1) {
            // cc.log('....加速,speed:' + this.curSpeed);
            this.spinTime += dt;
            this.wheelSp.node.rotation = this.wheelSp.node.rotation + this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            }
            else {
                if (this.spinTime < this.duration) {
                    return;
                }
                // cc.log('....开始减速');
                //设置目标角度
                this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                if (this.springback) {
                    this.finalAngle += this.gearAngle;
                }
                this.wheelSp.node.rotation = this.finalAngle;
                this.wheelState = 2;
            }
        }
        else if (this.wheelState == 2) {
            // cc.log('......减速');
            var curRo = this.wheelSp.node.rotation; //应该等于finalAngle
            var hadRo = curRo - this.finalAngle;
            this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + 0.2;
            this.wheelSp.node.rotation = curRo + this.curSpeed;
            if ((this.decAngle - hadRo) <= 0) {
                // cc.log('....停止');
                this.wheelState = 0;
                this.wheelSp.node.rotation = this.finalAngle;
                if (this.springback) {
                    //倒转一个齿轮
                    // var act = new cc.rotateBy(0.6, -this.gearAngle);
                    var act = cc.rotateBy(0.6, -this.gearAngle);
                    var seq = cc.sequence(cc.delayTime(0.2), act, cc.callFunc(this.showRes, this));
                    this.wheelSp.node.runAction(seq);
                }
                else {
                    this.showRes();
                }
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "spinBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], YZ_Turntable.prototype, "wheelSp", void 0);
    __decorate([
        property(cc.Sprite)
    ], YZ_Turntable.prototype, "greaSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], YZ_Turntable.prototype, "firstSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], YZ_Turntable.prototype, "secondSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], YZ_Turntable.prototype, "lastSpriteFrame", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], YZ_Turntable.prototype, "effectAudio", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "videoIcon", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "spriteDouble", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "spritePass", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "tirpNode", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "checked", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "closeBtn", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "videoBtn", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "resultMsg", void 0);
    __decorate([
        property(cc.Label)
    ], YZ_Turntable.prototype, "turnCountLbl", void 0);
    __decorate([
        property(sp.Skeleton)
    ], YZ_Turntable.prototype, "luckBox", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], YZ_Turntable.prototype, "countBar", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "normalBtn", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "normalCloseBtn", void 0);
    __decorate([
        property(cc.Node)
    ], YZ_Turntable.prototype, "topCloseBtn", void 0);
    YZ_Turntable = __decorate([
        ccclass
    ], YZ_Turntable);
    return YZ_Turntable;
}(cc.Component));
exports.default = YZ_Turntable;

cc._RF.pop();