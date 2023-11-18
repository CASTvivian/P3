import { utils } from "./Utils";
import { YZ_Reward, BannerLocation, ViewLocation } from "./YZ_Constant";
import CompatibleTool from "./CompatibleTool";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

// const gearInfo = [200, 100, 300, 400, 800, 500, 1000, 4000];
const ST_TurntableCounts = "turntable_counts";
const ST_TurntableTimes = "turntable_times";


/**
 * 转盘
 */
@ccclass
export default class YZ_Turntable extends cc.Component {

    @property(cc.Node)
    spinBtn: cc.Node = null;

    @property(cc.Sprite)
    wheelSp: cc.Sprite = null;

    @property(cc.Sprite)
    greaSprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    firstSpriteFrame: cc.SpriteFrame = null;


    @property(cc.SpriteFrame)
    secondSpriteFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    lastSpriteFrame: cc.SpriteFrame = null;

    @property({ type: cc.AudioClip })
    effectAudio: cc.AudioClip = null;

    @property(cc.Node)
    panel: cc.Node = null;




    @property(cc.Node)
    videoIcon: cc.Node = null


    @property(cc.Node)
    spriteDouble: cc.Node = null


    @property(cc.Node)
    spritePass: cc.Node = null


    @property(cc.Node)
    tirpNode: cc.Node = null

    @property(cc.Node)
    checked: cc.Node = null


    @property(cc.Node)
    closeBtn: cc.Node = null


    @property(cc.Node)
    videoBtn: cc.Node = null



    @property(cc.Node)
    resultMsg: cc.Node = null

    @property(cc.Label)
    turnCountLbl: cc.Label = null

    @property(sp.Skeleton)
    luckBox: sp.Skeleton = null;


    @property(cc.ProgressBar)
    countBar: cc.ProgressBar = null;

    @property(cc.Node)
    normalBtn: cc.Node = null


    @property(cc.Node)
    normalCloseBtn: cc.Node = null

    @property(cc.Node)
    topCloseBtn: cc.Node = null


    /**
     *  max: 15,
        min: 2,
     */
    maxSpeed: number = 12;

    /**
     * 减速前旋转时间
     *  max: 5,
        min: 1,
     */
    duration: number = 3;


    /**
     * 加速度
     *  max: 0.2,
        min: 0.01,
     */
    acc: number = 0.1;

    /**
     * 指定结束时的齿轮
     *  max: 17,
        min: 0,
     */
    targetID: number = 0;

    /**
     * 旋转结束是否回弹
     * 
     */
    springback: boolean = false;




    wheelState = 0;
    curSpeed = 0;
    spinTime = 0;                   //减速前旋转时间
    gearNum = 8;
    defaultAngle = 360 / 8 / 2 - 22;        //修正默认角度
    gearAngle = 360 / this.gearNum;   //每个齿轮的角度

    finalAngle = 0;                 //最终结果指定的角度
    effectFlag = 0;                 //用于音效播放
    audioID = 0;
    decAngle = 0;


    /**
     * 抽奖次数
     */
    _turntableCount: number = 0;

    /**
     * 抽奖次数
     */
    _turntablePlayCount: number = 0;

    get turntableCount() {
        return this._turntableCount;
    }

    set turntableCount(count: number) {
        this._turntableCount = count;
        YZ_LocalStorage.setItem(ST_TurntableTimes, new Date().toDateString());
        YZ_LocalStorage.setItem(ST_TurntableCounts, this._turntableCount);
    }

    get turntablePlayCount() {
        return this._turntablePlayCount;
    }

    luckBoxCount = 4;
    _updateProgress: boolean = false;
    _progress: number = 0;

    defaultProgress: number = 0.00000001;
    set turntablePlayCount(count: number) {
        if (this.luckBoxCount - count == 0) {
            this.luckBox.node.active = true;
            count = 0;
            this.countBar.progress = this.defaultProgress;
            this.luckBox.setAnimation(1, "dakai", false);
            this.scheduleOnce(() => {
                utils.SendEvent("转盘抽奖获取累计4次大奖！");
                this.showMsg(this.gearInfo[7]);
                if (this.rewardCallFunc) {
                    let result: YZ_Reward = new YZ_Reward();
                    result.rewardValue = this.gearInfo[7]
                    this.rewardCallFunc(result);
                }
            }, 0.6);
            this.scheduleOnce(() => {
                this.luckBox.setAnimation(1, "kd", false);
            }, 2);
            this.scheduleOnce(() => {
                this.luckBox.node.runAction(cc.sequence(cc.scaleTo(0.2, 0.8), cc.callFunc(() => {
                    this.luckBox.node.active = false;
                    this.luckBox.node.scale = 2;
                })));
            }, 4);
        }
        this._turntablePlayCount = count;
        YZ_LocalStorage.setItem("turntablePlayCount", this._turntablePlayCount);
        this._progress = count / this.luckBoxCount;
        this.turnCountLbl.string = (this.luckBoxCount - count) + "";
        this.turnCountLbl.node.runAction(cc.sequence(cc.scaleTo(0.3, 1.8), cc.scaleTo(0.3, 1)));
    }



    /**
     * 奖励回调
     */
    rewardCallFunc: Function = null;


    gearInfo = [200, 100, 300, 400, 800, 500, 1000, 4000];

    /**
     * 初始化事件回调
     * @param closeCallFunc 
     * @param rewardCallFunc 
     */
    init(closeCallFunc: Function, rewardCallFunc: Function, gearInfo: [], gearImagePath?: string) {
        // this.closeCallFunc = closeCallFunc;
        this.rewardCallFunc = rewardCallFunc;
        if (gearInfo.length > 0) {
            this.gearInfo = gearInfo;
        }


        if (gearImagePath) {
            utils.showLog("配置为服务器的奖励图片：", gearImagePath);
            CompatibleTool.LoadRes(gearImagePath, (err, res) => {
                if (!err && cc.isValid(this) && this.greaSprite) {
                    this.greaSprite.spriteFrame = new cc.SpriteFrame(res);
                }
            });
        }
    }

    onLoad() {

        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        this.wheelSp.node.rotation = this.defaultAngle;
        // this.spinBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     this.startTurnTable();
        // });
        utils.SendEvent("转盘抽奖-显示成功！");

        this.initCount();
        if (this.turntableCount <= 0) {
            this.normalBtn.active = false;
            this.videoBtn.active = true;
            this.normalCloseBtn.active = true;
            utils.showScaleAction(this.videoBtn, null, false, false);
        } else {
            this.normalCloseBtn.active = false;
            utils.showScaleAction(this.normalBtn, null, false, false);
        }
        utils.showSkipBtn(this.closeBtn, true);
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



        this.rewardCallFunc = utils.rewardCallFunc;

        if (cc.winSize.height < cc.winSize.width) {
            utils.adManager.HideBanner(BannerLocation.Game);
        } else {
            utils.adManager.ShowBanner(BannerLocation.Game);
        }
    }



    /**
     * 开始抽奖
     */
    startTurnTable() {
        if (this.wheelState !== 0) {
            return;
        }
        if (this.turntableCount <= 0) {
            if (this.checked.active || this.spinBtn.active) {
                utils.adManager.ShowVideo((ret, msg) => {
                    if (ret) {
                        this.turntableCount = 1;
                        this.startTurnTable();
                        utils.SendEvent("转盘抽奖获取奖励-成功！");

                    } else {
                        utils.showMsg("观看完整视频可以获取一次抽奖机会！");
                        utils.SendEvent("转盘抽奖视频播放-失败！");
                        this.onClose();
                    }
                })
                return;
            } else {
                // AldUtils.SendEvent("转盘抽奖-未勾选！");
                this.onClose();
                return;
            }

        }

        this.turntableCount = 0;
        this.targetID = this.getTargetId();
        this.decAngle = 2 * 360;  // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
    }



    onCheck() {
        this.checked.active = !this.checked.active;
        this.spritePass.active = !this.checked.active;
        this.spriteDouble.active = this.checked.active;
        this.videoIcon.active = this.checked.active;

        // AldUtils.SendEvent(`转盘抽奖-用户${this.checked.active ? "点击勾选" : "取消勾选"}`);
    }



    onClose() {
        this.panel.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()), cc.callFunc(() => {
            this.node.destroy();
        })));
    }

    onEnable() {
        this.panel.scale = 0;
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = 0.6;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this.panel.runAction(cc.scaleTo(0.3, ratio).easing(cc.easeBackOut()));
    }

    onDestroy() {
        if (utils.turnTablePanelCloseFunc) {
            utils.turnTablePanelCloseFunc();
            utils.turnTablePanelCloseFunc = null;
        } else {
            utils.rewardCloseFunc && utils.rewardCloseFunc();
            utils.rewardCloseFunc = null;
        }
        utils.adManager.HideBanner(BannerLocation.Game)

    }


    checkBtnSpriteFrame() {

        if (this.turntableCount <= 0) {
            this.normalBtn.active = false;
            this.videoBtn.active = true;
            this.normalCloseBtn.active = true;
            utils.showScaleAction(this.videoBtn, null, false, false);
        } else {
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
    }

    initCount() {
        let turntableCount = YZ_LocalStorage.getItem(ST_TurntableCounts);

        let day: string = YZ_LocalStorage.getItem(ST_TurntableTimes);
        let curDate = new Date();
        if (day != curDate.toDateString()) {
            this.turntableCount = 1;
        } else {
            this._turntableCount = turntableCount;
        }
        this.countBar.progress = this.defaultProgress;
        this.turntablePlayCount = YZ_LocalStorage.getItem("turntablePlayCount") ? YZ_LocalStorage.getItem("turntablePlayCount") : 0;
        this.countBar.progress = this.turntablePlayCount / this.luckBoxCount;
        utils.showLog("当前剩余抽奖次数：", this.turntableCount);
    }

    test() {
        if (this.wheelState !== 0) {
            return;
        }
        this.targetID = this.getTargetId();
        cc.log("结果：", this.targetID);
        this.decAngle = 2 * 360;  // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
    }


    getTargetId() {
        var ranNum = Math.random();//生成一个0-1的随机数
        var n = Math.random() / 4;//0-0.25随机数
        let result = 0;
        if (ranNum < 0.01) {
            result = 1; // 8
        }
        else if (ranNum < 0.04) {
            result = 0.9; // 7
        } else if (ranNum < 0.1) {
            result = 0.5; // 4
        } else if (ranNum < 0.2) {
            result = 0.7; // 5
        } else if (ranNum < 1) {
            result = Math.floor(Math.random() * 4) * 0.1; //0-4
        }
        return Math.floor(8 * result);
    }


    showMsg(gold) {
        let msg = cc.instantiate(this.resultMsg);
        cc.find("kuang/goldLbl", msg).getComponent(cc.Label).string = `${gold}`
        msg.active = true;
        msg.scale = 0.3;
        this.node.addChild(msg);

        msg.runAction(cc.scaleTo(0.3, this.panel.scale).easing(cc.easeBackOut()));
        this.scheduleOnce(() => {
            msg.destroy();
            msg.removeFromParent();
        }, 1.2);
    }

    showRes() {
        this.showMsg(this.gearInfo[this.targetID]);

        this.scheduleOnce(() => {
            this.turntablePlayCount++;
        }, 1);



        if (this.rewardCallFunc) {
            let result: YZ_Reward = new YZ_Reward();
            result.rewardValue = this.gearInfo[this.targetID]
            this.rewardCallFunc(result);
        }
        this.checkBtnSpriteFrame();
    }

    update(dt) {
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
    }
}
