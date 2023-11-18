
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Turntable.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfVHVybnRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUNoQyw2Q0FBd0U7QUFDeEUsbURBQThDO0FBQzlDLHFEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QywrREFBK0Q7QUFDL0QsSUFBTSxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztBQUM5QyxJQUFNLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBRzVDOztHQUVHO0FBRUg7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFzaEJDO1FBbmhCRyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0Isc0JBQWdCLEdBQW1CLElBQUksQ0FBQztRQUl4Qyx1QkFBaUIsR0FBbUIsSUFBSSxDQUFDO1FBR3pDLHFCQUFlLEdBQW1CLElBQUksQ0FBQztRQUd2QyxpQkFBVyxHQUFpQixJQUFJLENBQUM7UUFHakMsV0FBSyxHQUFZLElBQUksQ0FBQztRQU10QixlQUFTLEdBQVksSUFBSSxDQUFBO1FBSXpCLGtCQUFZLEdBQVksSUFBSSxDQUFBO1FBSTVCLGdCQUFVLEdBQVksSUFBSSxDQUFBO1FBSTFCLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFHeEIsYUFBTyxHQUFZLElBQUksQ0FBQTtRQUl2QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBSXhCLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFLeEIsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUd6QixrQkFBWSxHQUFhLElBQUksQ0FBQTtRQUc3QixhQUFPLEdBQWdCLElBQUksQ0FBQztRQUk1QixjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdo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QUNBO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0k7SUFNdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDTztJQUl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNVO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1E7SUFJMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNLO0lBSXZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ007SUFJeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUt4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztpREFDTTtJQUk1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2tEQUNPO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ087SUFJekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNTO0lBL0VWLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FzaEJoQztJQUFELG1CQUFDO0NBdGhCRCxBQXNoQkMsQ0F0aEJ5QyxFQUFFLENBQUMsU0FBUyxHQXNoQnJEO2tCQXRoQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgeyBZWl9SZXdhcmQsIEJhbm5lckxvY2F0aW9uLCBWaWV3TG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XG5pbXBvcnQgWVpfTG9jYWxTdG9yYWdlIGZyb20gXCIuL1laX0xvY2FsU3RvcmFnZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vLyBjb25zdCBnZWFySW5mbyA9IFsyMDAsIDEwMCwgMzAwLCA0MDAsIDgwMCwgNTAwLCAxMDAwLCA0MDAwXTtcbmNvbnN0IFNUX1R1cm50YWJsZUNvdW50cyA9IFwidHVybnRhYmxlX2NvdW50c1wiO1xuY29uc3QgU1RfVHVybnRhYmxlVGltZXMgPSBcInR1cm50YWJsZV90aW1lc1wiO1xuXG5cbi8qKlxuICog6L2s55uYXG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9UdXJudGFibGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3BpbkJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHdoZWVsU3A6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGdyZWFTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgZmlyc3RTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgc2Vjb25kU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBsYXN0U3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkF1ZGlvQ2xpcCB9KVxuICAgIGVmZmVjdEF1ZGlvOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuXG5cblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdmlkZW9JY29uOiBjYy5Ob2RlID0gbnVsbFxuXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzcHJpdGVEb3VibGU6IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNwcml0ZVBhc3M6IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpcnBOb2RlOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hlY2tlZDogY2MuTm9kZSA9IG51bGxcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2xvc2VCdG46IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHZpZGVvQnRuOiBjYy5Ob2RlID0gbnVsbFxuXG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlc3VsdE1zZzogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0dXJuQ291bnRMYmw6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIGx1Y2tCb3g6IHNwLlNrZWxldG9uID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIGNvdW50QmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub3JtYWxCdG46IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG5vcm1hbENsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdG9wQ2xvc2VCdG46IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIC8qKlxuICAgICAqICBtYXg6IDE1LFxuICAgICAgICBtaW46IDIsXG4gICAgICovXG4gICAgbWF4U3BlZWQ6IG51bWJlciA9IDEyO1xuXG4gICAgLyoqXG4gICAgICog5YeP6YCf5YmN5peL6L2s5pe26Ze0XG4gICAgICogIG1heDogNSxcbiAgICAgICAgbWluOiAxLFxuICAgICAqL1xuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAzO1xuXG5cbiAgICAvKipcbiAgICAgKiDliqDpgJ/luqZcbiAgICAgKiAgbWF4OiAwLjIsXG4gICAgICAgIG1pbjogMC4wMSxcbiAgICAgKi9cbiAgICBhY2M6IG51bWJlciA9IDAuMTtcblxuICAgIC8qKlxuICAgICAqIOaMh+Wumue7k+adn+aXtueahOm9v+i9rlxuICAgICAqICBtYXg6IDE3LFxuICAgICAgICBtaW46IDAsXG4gICAgICovXG4gICAgdGFyZ2V0SUQ6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiDml4vovaznu5PmnZ/mmK/lkKblm57lvLlcbiAgICAgKiBcbiAgICAgKi9cbiAgICBzcHJpbmdiYWNrOiBib29sZWFuID0gZmFsc2U7XG5cblxuXG5cbiAgICB3aGVlbFN0YXRlID0gMDtcbiAgICBjdXJTcGVlZCA9IDA7XG4gICAgc3BpblRpbWUgPSAwOyAgICAgICAgICAgICAgICAgICAvL+WHj+mAn+WJjeaXi+i9rOaXtumXtFxuICAgIGdlYXJOdW0gPSA4O1xuICAgIGRlZmF1bHRBbmdsZSA9IDM2MCAvIDggLyAyIC0gMjI7ICAgICAgICAvL+S/ruato+m7mOiupOinkuW6plxuICAgIGdlYXJBbmdsZSA9IDM2MCAvIHRoaXMuZ2Vhck51bTsgICAvL+avj+S4qum9v+i9rueahOinkuW6plxuXG4gICAgZmluYWxBbmdsZSA9IDA7ICAgICAgICAgICAgICAgICAvL+acgOe7iOe7k+aenOaMh+WumueahOinkuW6plxuICAgIGVmZmVjdEZsYWcgPSAwOyAgICAgICAgICAgICAgICAgLy/nlKjkuo7pn7PmlYjmkq3mlL5cbiAgICBhdWRpb0lEID0gMDtcbiAgICBkZWNBbmdsZSA9IDA7XG5cblxuICAgIC8qKlxuICAgICAqIOaKveWlluasoeaVsFxuICAgICAqL1xuICAgIF90dXJudGFibGVDb3VudDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIOaKveWlluasoeaVsFxuICAgICAqL1xuICAgIF90dXJudGFibGVQbGF5Q291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBnZXQgdHVybnRhYmxlQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90dXJudGFibGVDb3VudDtcbiAgICB9XG5cbiAgICBzZXQgdHVybnRhYmxlQ291bnQoY291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90dXJudGFibGVDb3VudCA9IGNvdW50O1xuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVF9UdXJudGFibGVUaW1lcywgbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSk7XG4gICAgICAgIFlaX0xvY2FsU3RvcmFnZS5zZXRJdGVtKFNUX1R1cm50YWJsZUNvdW50cywgdGhpcy5fdHVybnRhYmxlQ291bnQpO1xuICAgIH1cblxuICAgIGdldCB0dXJudGFibGVQbGF5Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90dXJudGFibGVQbGF5Q291bnQ7XG4gICAgfVxuXG4gICAgbHVja0JveENvdW50ID0gNDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG5cbiAgICBkZWZhdWx0UHJvZ3Jlc3M6IG51bWJlciA9IDAuMDAwMDAwMDE7XG4gICAgc2V0IHR1cm50YWJsZVBsYXlDb3VudChjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmx1Y2tCb3hDb3VudCAtIGNvdW50ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubHVja0JveC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNvdW50QmFyLnByb2dyZXNzID0gdGhpcy5kZWZhdWx0UHJvZ3Jlc3M7XG4gICAgICAgICAgICB0aGlzLmx1Y2tCb3guc2V0QW5pbWF0aW9uKDEsIFwiZGFrYWlcIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIui9rOebmOaKveWlluiOt+WPlue0r+iuoTTmrKHlpKflpZbvvIFcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TXNnKHRoaXMuZ2VhckluZm9bN10pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJld2FyZENhbGxGdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IFlaX1Jld2FyZCA9IG5ldyBZWl9SZXdhcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJld2FyZFZhbHVlID0gdGhpcy5nZWFySW5mb1s3XVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMC42KTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmx1Y2tCb3guc2V0QW5pbWF0aW9uKDEsIFwia2RcIiwgZmFsc2UpO1xuICAgICAgICAgICAgfSwgMik7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sdWNrQm94Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAwLjgpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubHVja0JveC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmx1Y2tCb3gubm9kZS5zY2FsZSA9IDI7XG4gICAgICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgICAgIH0sIDQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3R1cm50YWJsZVBsYXlDb3VudCA9IGNvdW50O1xuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInR1cm50YWJsZVBsYXlDb3VudFwiLCB0aGlzLl90dXJudGFibGVQbGF5Q291bnQpO1xuICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IGNvdW50IC8gdGhpcy5sdWNrQm94Q291bnQ7XG4gICAgICAgIHRoaXMudHVybkNvdW50TGJsLnN0cmluZyA9ICh0aGlzLmx1Y2tCb3hDb3VudCAtIGNvdW50KSArIFwiXCI7XG4gICAgICAgIHRoaXMudHVybkNvdW50TGJsLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjgpLCBjYy5zY2FsZVRvKDAuMywgMSkpKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5aWW5Yqx5Zue6LCDXG4gICAgICovXG4gICAgcmV3YXJkQ2FsbEZ1bmM6IEZ1bmN0aW9uID0gbnVsbDtcblxuXG4gICAgZ2VhckluZm8gPSBbMjAwLCAxMDAsIDMwMCwgNDAwLCA4MDAsIDUwMCwgMTAwMCwgNDAwMF07XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbkuovku7blm57osINcbiAgICAgKiBAcGFyYW0gY2xvc2VDYWxsRnVuYyBcbiAgICAgKiBAcGFyYW0gcmV3YXJkQ2FsbEZ1bmMgXG4gICAgICovXG4gICAgaW5pdChjbG9zZUNhbGxGdW5jOiBGdW5jdGlvbiwgcmV3YXJkQ2FsbEZ1bmM6IEZ1bmN0aW9uLCBnZWFySW5mbzogW10sIGdlYXJJbWFnZVBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgLy8gdGhpcy5jbG9zZUNhbGxGdW5jID0gY2xvc2VDYWxsRnVuYztcbiAgICAgICAgdGhpcy5yZXdhcmRDYWxsRnVuYyA9IHJld2FyZENhbGxGdW5jO1xuICAgICAgICBpZiAoZ2VhckluZm8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5nZWFySW5mbyA9IGdlYXJJbmZvO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoZ2VhckltYWdlUGF0aCkge1xuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumFjee9ruS4uuacjeWKoeWZqOeahOWlluWKseWbvueJh++8mlwiLCBnZWFySW1hZ2VQYXRoKTtcbiAgICAgICAgICAgIENvbXBhdGlibGVUb29sLkxvYWRSZXMoZ2VhckltYWdlUGF0aCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgY2MuaXNWYWxpZCh0aGlzKSAmJiB0aGlzLmdyZWFTcHJpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmVhU3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbiA9IHRoaXMuZGVmYXVsdEFuZ2xlO1xuICAgICAgICAvLyB0aGlzLnNwaW5CdG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhcnRUdXJuVGFibGUoKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIui9rOebmOaKveWlli3mmL7npLrmiJDlip/vvIFcIik7XG5cbiAgICAgICAgdGhpcy5pbml0Q291bnQoKTtcbiAgICAgICAgaWYgKHRoaXMudHVybnRhYmxlQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ub3JtYWxCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnZpZGVvQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vcm1hbENsb3NlQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB1dGlscy5zaG93U2NhbGVBY3Rpb24odGhpcy52aWRlb0J0biwgbnVsbCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsQ2xvc2VCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB1dGlscy5zaG93U2NhbGVBY3Rpb24odGhpcy5ub3JtYWxCdG4sIG51bGwsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdXRpbHMuc2hvd1NraXBCdG4odGhpcy5jbG9zZUJ0biwgdHJ1ZSk7XG4gICAgICAgIC8vIGlmICh0aGlzLnR1cm50YWJsZUNvdW50IDw9IDAgJiYgIUNDX0RFQlVHKSB7XG4gICAgICAgIC8vICAgICBsZXQgcmVzdWx0ID0gdXRpbHMuY29udHJvVmlldyhWaWV3TG9jYXRpb24udHVybnRhYmxlKTtcbiAgICAgICAgLy8gICAgIGlmIChyZXN1bHQuaXNfb3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHV0aWxzLmRlbGF5U2hvd05vZGUodGhpcy50aXJwTm9kZSk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaGVja2VkLmFjdGl2ZSA9IHJlc3VsdC5pc1NlbGVjdDtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNwcml0ZVBhc3MuYWN0aXZlID0gIXRoaXMuY2hlY2tlZC5hY3RpdmU7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zcHJpdGVEb3VibGUuYWN0aXZlID0gdGhpcy5jaGVja2VkLmFjdGl2ZTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnZpZGVvSWNvbi5hY3RpdmUgPSB0aGlzLmNoZWNrZWQuYWN0aXZlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2xvc2VCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy52aWRlb0J0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3BpbkJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaGVja2VkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMudmlkZW9CdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zcGluQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zcGluQnRuLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zZWNvbmRTcHJpdGVGcmFtZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG5cblxuICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jID0gdXRpbHMucmV3YXJkQ2FsbEZ1bmM7XG5cbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgdXRpbHMuYWRNYW5hZ2VyLkhpZGVCYW5uZXIoQmFubmVyTG9jYXRpb24uR2FtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd0Jhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiDlvIDlp4vmir3lpZZcbiAgICAgKi9cbiAgICBzdGFydFR1cm5UYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR1cm50YWJsZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQuYWN0aXZlIHx8IHRoaXMuc3BpbkJ0bi5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKChyZXQsIG1zZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1cm50YWJsZUNvdW50ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUdXJuVGFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIui9rOebmOaKveWlluiOt+WPluWlluWKsS3miJDlip/vvIFcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLnNob3dNc2coXCLop4LnnIvlrozmlbTop4bpopHlj6/ku6Xojrflj5bkuIDmrKHmir3lpZbmnLrkvJrvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLovaznm5jmir3lpZbop4bpopHmkq3mlL4t5aSx6LSl77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWxkVXRpbHMuU2VuZEV2ZW50KFwi6L2s55uY5oq95aWWLeacquWLvumAie+8gVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHVybnRhYmxlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnRhcmdldElEID0gdGhpcy5nZXRUYXJnZXRJZCgpO1xuICAgICAgICB0aGlzLmRlY0FuZ2xlID0gMiAqIDM2MDsgIC8vIOWHj+mAn+aXi+i9rOS4pOWciFxuICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAxO1xuICAgICAgICB0aGlzLmN1clNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zcGluVGltZSA9IDA7XG4gICAgfVxuXG5cblxuICAgIG9uQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZC5hY3RpdmUgPSAhdGhpcy5jaGVja2VkLmFjdGl2ZTtcbiAgICAgICAgdGhpcy5zcHJpdGVQYXNzLmFjdGl2ZSA9ICF0aGlzLmNoZWNrZWQuYWN0aXZlO1xuICAgICAgICB0aGlzLnNwcml0ZURvdWJsZS5hY3RpdmUgPSB0aGlzLmNoZWNrZWQuYWN0aXZlO1xuICAgICAgICB0aGlzLnZpZGVvSWNvbi5hY3RpdmUgPSB0aGlzLmNoZWNrZWQuYWN0aXZlO1xuXG4gICAgICAgIC8vIEFsZFV0aWxzLlNlbmRFdmVudChg6L2s55uY5oq95aWWLeeUqOaItyR7dGhpcy5jaGVja2VkLmFjdGl2ZSA/IFwi54K55Ye75Yu+6YCJXCIgOiBcIuWPlua2iOWLvumAiVwifWApO1xuICAgIH1cblxuXG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLnBhbmVsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgMCkuZWFzaW5nKGNjLmVhc2VCYWNrSW4oKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH0pKSk7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMucGFuZWwuc2NhbGUgPSAwO1xuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XG4gICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA8IGNjLndpblNpemUud2lkdGgpIHtcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xuICAgICAgICAgICAgcmF0aW8gPSAwLjY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYW5lbC5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIHJhdGlvKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHV0aWxzLnR1cm5UYWJsZVBhbmVsQ2xvc2VGdW5jKSB7XG4gICAgICAgICAgICB1dGlscy50dXJuVGFibGVQYW5lbENsb3NlRnVuYygpO1xuICAgICAgICAgICAgdXRpbHMudHVyblRhYmxlUGFuZWxDbG9zZUZ1bmMgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jICYmIHV0aWxzLnJld2FyZENsb3NlRnVuYygpO1xuICAgICAgICAgICAgdXRpbHMucmV3YXJkQ2xvc2VGdW5jID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5HYW1lKVxuXG4gICAgfVxuXG5cbiAgICBjaGVja0J0blNwcml0ZUZyYW1lKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnR1cm50YWJsZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aWRlb0J0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ub3JtYWxDbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdXRpbHMuc2hvd1NjYWxlQWN0aW9uKHRoaXMudmlkZW9CdG4sIG51bGwsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vcm1hbENsb3NlQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0aGlzLnR1cm50YWJsZUNvdW50IDw9IDApIHtcbiAgICAgICAgLy8gbGV0IHJlc3VsdCA9IHV0aWxzLmNvbnRyb1ZpZXcoVmlld0xvY2F0aW9uLnR1cm50YWJsZSk7XG4gICAgICAgIC8vIGlmIChyZXN1bHQuaXNfb3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyAgICAgdXRpbHMuZGVsYXlTaG93Tm9kZSh0aGlzLnRpcnBOb2RlKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2hlY2tlZC5hY3RpdmUgPSByZXN1bHQuaXNTZWxlY3Q7XG4gICAgICAgIC8vICAgICB0aGlzLnNwcml0ZVBhc3MuYWN0aXZlID0gIXRoaXMuY2hlY2tlZC5hY3RpdmU7XG4gICAgICAgIC8vICAgICB0aGlzLnNwcml0ZURvdWJsZS5hY3RpdmUgPSB0aGlzLmNoZWNrZWQuYWN0aXZlO1xuICAgICAgICAvLyAgICAgdGhpcy52aWRlb0ljb24uYWN0aXZlID0gdGhpcy5jaGVja2VkLmFjdGl2ZTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2xvc2VCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICB0aGlzLnZpZGVvQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vICAgICB0aGlzLnNwaW5CdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNoZWNrZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICB0aGlzLnZpZGVvQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgdGhpcy5zcGluQnRuLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYXN0U3ByaXRlRnJhbWU7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGluaXRDb3VudCgpIHtcbiAgICAgICAgbGV0IHR1cm50YWJsZUNvdW50ID0gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RfVHVybnRhYmxlQ291bnRzKTtcblxuICAgICAgICBsZXQgZGF5OiBzdHJpbmcgPSBZWl9Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVF9UdXJudGFibGVUaW1lcyk7XG4gICAgICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgaWYgKGRheSAhPSBjdXJEYXRlLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICB0aGlzLnR1cm50YWJsZUNvdW50ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3R1cm50YWJsZUNvdW50ID0gdHVybnRhYmxlQ291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb3VudEJhci5wcm9ncmVzcyA9IHRoaXMuZGVmYXVsdFByb2dyZXNzO1xuICAgICAgICB0aGlzLnR1cm50YWJsZVBsYXlDb3VudCA9IFlaX0xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidHVybnRhYmxlUGxheUNvdW50XCIpID8gWVpfTG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0dXJudGFibGVQbGF5Q291bnRcIikgOiAwO1xuICAgICAgICB0aGlzLmNvdW50QmFyLnByb2dyZXNzID0gdGhpcy50dXJudGFibGVQbGF5Q291bnQgLyB0aGlzLmx1Y2tCb3hDb3VudDtcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuW9k+WJjeWJqeS9meaKveWlluasoeaVsO+8mlwiLCB0aGlzLnR1cm50YWJsZUNvdW50KTtcbiAgICB9XG5cbiAgICB0ZXN0KCkge1xuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YXJnZXRJRCA9IHRoaXMuZ2V0VGFyZ2V0SWQoKTtcbiAgICAgICAgY2MubG9nKFwi57uT5p6c77yaXCIsIHRoaXMudGFyZ2V0SUQpO1xuICAgICAgICB0aGlzLmRlY0FuZ2xlID0gMiAqIDM2MDsgIC8vIOWHj+mAn+aXi+i9rOS4pOWciFxuICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAxO1xuICAgICAgICB0aGlzLmN1clNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zcGluVGltZSA9IDA7XG4gICAgfVxuXG5cbiAgICBnZXRUYXJnZXRJZCgpIHtcbiAgICAgICAgdmFyIHJhbk51bSA9IE1hdGgucmFuZG9tKCk7Ly/nlJ/miJDkuIDkuKowLTHnmoTpmo/mnLrmlbBcbiAgICAgICAgdmFyIG4gPSBNYXRoLnJhbmRvbSgpIC8gNDsvLzAtMC4yNemaj+acuuaVsFxuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICAgICAgaWYgKHJhbk51bSA8IDAuMDEpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDE7IC8vIDhcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyYW5OdW0gPCAwLjA0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwLjk7IC8vIDdcbiAgICAgICAgfSBlbHNlIGlmIChyYW5OdW0gPCAwLjEpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDAuNTsgLy8gNFxuICAgICAgICB9IGVsc2UgaWYgKHJhbk51bSA8IDAuMikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMC43OyAvLyA1XG4gICAgICAgIH0gZWxzZSBpZiAocmFuTnVtIDwgMSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkgKiAwLjE7IC8vMC00XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoOCAqIHJlc3VsdCk7XG4gICAgfVxuXG5cbiAgICBzaG93TXNnKGdvbGQpIHtcbiAgICAgICAgbGV0IG1zZyA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVzdWx0TXNnKTtcbiAgICAgICAgY2MuZmluZChcImt1YW5nL2dvbGRMYmxcIiwgbXNnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2dvbGR9YFxuICAgICAgICBtc2cuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbXNnLnNjYWxlID0gMC4zO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobXNnKTtcblxuICAgICAgICBtc2cucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4zLCB0aGlzLnBhbmVsLnNjYWxlKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBtc2cuZGVzdHJveSgpO1xuICAgICAgICAgICAgbXNnLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgfSwgMS4yKTtcbiAgICB9XG5cbiAgICBzaG93UmVzKCkge1xuICAgICAgICB0aGlzLnNob3dNc2codGhpcy5nZWFySW5mb1t0aGlzLnRhcmdldElEXSk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50dXJudGFibGVQbGF5Q291bnQrKztcbiAgICAgICAgfSwgMSk7XG5cblxuXG4gICAgICAgIGlmICh0aGlzLnJld2FyZENhbGxGdW5jKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBZWl9SZXdhcmQgPSBuZXcgWVpfUmV3YXJkKCk7XG4gICAgICAgICAgICByZXN1bHQucmV3YXJkVmFsdWUgPSB0aGlzLmdlYXJJbmZvW3RoaXMudGFyZ2V0SURdXG4gICAgICAgICAgICB0aGlzLnJld2FyZENhbGxGdW5jKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0J0blNwcml0ZUZyYW1lKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50QmFyLnByb2dyZXNzIDwgdGhpcy5fcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRCYXIucHJvZ3Jlc3MgKz0gZHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5pKt5pS+6Z+z5pWI5pyJ5Y+v6IO95Y2hXG4gICAgICAgIHRoaXMuZWZmZWN0RmxhZyArPSB0aGlzLmN1clNwZWVkO1xuICAgICAgICBpZiAodGhpcy5lZmZlY3RGbGFnID49IHRoaXMuZ2VhckFuZ2xlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5lZmZlY3RBdWRpbywgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RGbGFnID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgLy8gY2MubG9nKCcuLi4u5Yqg6YCfLHNwZWVkOicgKyB0aGlzLmN1clNwZWVkKTtcbiAgICAgICAgICAgIHRoaXMuc3BpblRpbWUgKz0gZHQ7XG4gICAgICAgICAgICB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbiA9IHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uICsgdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clNwZWVkIDw9IHRoaXMubWF4U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1clNwZWVkICs9IHRoaXMuYWNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BpblRpbWUgPCB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKCcuLi4u5byA5aeL5YeP6YCfJyk7XG4gICAgICAgICAgICAgICAgLy/orr7nva7nm67moIfop5LluqZcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmFsQW5nbGUgPSAzNjAgLSB0aGlzLnRhcmdldElEICogdGhpcy5nZWFyQW5nbGUgKyB0aGlzLmRlZmF1bHRBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNwZWVkID0gdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcHJpbmdiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluYWxBbmdsZSArPSB0aGlzLmdlYXJBbmdsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLmZpbmFsQW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLndoZWVsU3RhdGUgPT0gMikge1xuICAgICAgICAgICAgLy8gY2MubG9nKCcuLi4uLi7lh4/pgJ8nKTtcbiAgICAgICAgICAgIHZhciBjdXJSbyA9IHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uOyAvL+W6lOivpeetieS6jmZpbmFsQW5nbGVcbiAgICAgICAgICAgIHZhciBoYWRSbyA9IGN1clJvIC0gdGhpcy5maW5hbEFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5jdXJTcGVlZCA9IHRoaXMubWF4U3BlZWQgKiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgLyB0aGlzLmRlY0FuZ2xlKSArIDAuMjtcbiAgICAgICAgICAgIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uID0gY3VyUm8gKyB0aGlzLmN1clNwZWVkO1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnLi4uLuWBnOatoicpO1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLmZpbmFsQW5nbGU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ByaW5nYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAvL+WAkui9rOS4gOS4qum9v+i9rlxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYWN0ID0gbmV3IGNjLnJvdGF0ZUJ5KDAuNiwgLXRoaXMuZ2VhckFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdCA9IGNjLnJvdGF0ZUJ5KDAuNiwgLXRoaXMuZ2VhckFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjIpLCBhY3QsIGNjLmNhbGxGdW5jKHRoaXMuc2hvd1JlcywgdGhpcykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndoZWVsU3Aubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==