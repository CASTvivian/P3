
import { cocosz } from "../Framework/CocosZ";
import { utils } from "../../common-plugin/Scripts/Utils";
import Constant, { ZindexLayer } from "../Framework/Constant";
import { upgradeMgr } from "./UpgradeMgr";
import setMap from "./setMap";
import { VibrateType } from "../../common-plugin/Scripts/YZ_Constant";
import Player from "./player";
import ZombieBase from "./ZombieBase";

const { ccclass, property } = cc._decorator;

//tag:{0:攻击范围，1:玩家身体，2:玩家腿部 6,减速，7,毒区 11:墙，12:道具，13:武器，14:草，15:房子,16:物资箱, 17:海水, 18:升级仓, 19:旗台}

export let gameMgr: GameMgr = null;

@ccclass
export default class GameMgr extends cc.Component {
    nodePoolObj: { [name: string]: cc.NodePool } = {}

    nodeGet(name: string, prefab: cc.Prefab): cc.Node {
        let node: cc.Node = null;
        // 创建新的节点池
        if (!this.nodePoolObj[name]) {
            this.nodePoolObj[name] = new cc.NodePool();
        }
        // 从节点池中获取节点
        if (this.nodePoolObj[name].size()) {
            node = this.nodePoolObj[name].get();
        } else if (prefab && prefab.isValid) {
            node = cc.instantiate(prefab);
        }
        // 防止预制体和节点名字不同
        if (node) { node.name = name; }
        return node;
    }
    nodePut(name: string, node: cc.Node): void {
        if (this.nodePoolObj[name] && node && node.isValid) {
            this.nodePoolObj[name].put(node);
        } else {
            cc.log("回收出错: ", name)
        }
    }

    canSHowGameBanner: boolean = true;

    tipLayer: cc.Node = null;
    setMapTs: setMap = null;
    playerTs: Player = null;

    uiGamePage: cc.Node = null;
    moveArea: cc.Node = null;
    yaogan: cc.Node = null;
    BtnBullet: cc.Node = null;

    posObj: object = {}

    // 躲猫猫模式
    dmmArr: cc.SpriteFrame[] = []

    @property(cc.Node)
    red: cc.Node = null;

    @property(cc.Prefab)
    hpTip: cc.Prefab = null;
    @property(cc.Prefab)
    effect_fire: cc.Prefab = null;
    @property(cc.Prefab)
    effect_hit: cc.Prefab = null;

    @property(cc.Prefab)
    itemList: cc.Prefab[] = [];
    @property(cc.Prefab)
    itemEffect: cc.Prefab[] = [];

    @property(cc.Prefab)
    spark: cc.Prefab = null;
    @property(cc.Prefab)
    blood: cc.Prefab = null;
    @property(cc.Prefab)
    testPoint: cc.Prefab = null;

    @property(cc.Prefab)
    player: cc.Prefab = null;

    @property(cc.SpriteFrame)
    jiaoyin: cc.SpriteFrame = null;

    @property(cc.Node)
    fj: cc.Node = null;
    @property(cc.Node)
    fjTip: cc.Node = null;

    @property(cc.Node)
    mainCamereRootNode: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null;
    // LIFE-CYCLE CALLBACKS:
    atk: cc.Node = null;
    safeCenter: cc.Vec2 = cc.v2(0, 0);
    redCircle: cc.Node = null;
    redCircle2: cc.Node = null;
    // mask: cc.Node = null;
    // maskMtl: cc.Material = null;

    mapSize: cc.Size = cc.winSize;
    miniMapSize: cc.Size = null;;

    btnSkill: cc.Node = null;
    btnSkillAd: cc.Node = null;
    rangedWeaponMess: cc.Node = null;
    rangedWeaponAdMess: cc.Node = null;
    ammo: cc.Label = null;
    ammoAd: cc.Label = null;

    kt: cc.Node = null;
    model6_touxiang: cc.Node = null;
    model6_btnShuxing: cc.Node = null;
    model6_shuxing: cc.Node = null;
    model6_jingyanBar: cc.ProgressBar = null;
    model6_levelLabel: cc.Label = null;
    model6_skillScrollView: cc.ScrollView = null;
    model6_skillScrollView_content: cc.Node = null;
    model6_skillScrollView_item: cc.Node = null;
    model6_timeLabel: cc.Label = null;
    model6_ts: cc.Node = null;
    model6_bossBar: cc.ProgressBar = null;
    timeStr: string = "";

    totalNum: number = 0;
    deathNum: number = 0;
    playerRank: number = 1;
    //通关条件： 1击败所有敌人 2击败boss 3抵达撤离点
    passCondition: number = 1;
    bossName: string = "";

    map: cc.Node = null;
    startPoint: cc.Node = null;
    atkRange: cc.Node = null;

    curTime: number = 0;
    timeLabel: cc.Label = null;
    snow: cc.Node = null;
    qlzc: cc.Node = null;

    onLoad() {
        gameMgr = this;
        gameMgr.mainCamera.zoomRatio = 0.65;
        cocosz.pauseCount = 0;
    }


    start() {
        this.mainCamereRootNode.setContentSize(cc.winSize);
        this.mainCamereRootNode.width += 500;
        this.mainCamereRootNode.height += 500;

        // 飞机任务提示
        if (this.fjTip) {
            if ([5, 7].includes(cocosz.gameMode)) {
                this.fjTip.active = false;
            } else {
                this.fjTip.active = true;
                this.fjTip.zIndex = ZindexLayer.zindex_max;
            }
        }
    }

    protected lateUpdate(): void {
        if (cocosz.isPause || gameMgr.isWin || gameMgr.isFail) return;
        this.cameraFollow();
    }

    initPos() {
        if (cocosz.gameMode == 7) {
            // 坐标
            // rolePos0
            let bluePos = cc.find('posLayer/bluePos', gameMgr.map);
            if (bluePos) this.posObj["bluePos"] = bluePos.getPosition();
            // rolePos1
            let redPos = cc.find('posLayer/redPos', gameMgr.map);
            if (redPos) this.posObj["redPos"] = redPos.getPosition();
            // path0
            this.posObj["pathPos0"] = [];
            let pathPos0 = cc.find('posLayer/pathPos0', gameMgr.map);
            pathPos0 && pathPos0.children.forEach(node => { this.posObj["pathPos0"].push(node.getPosition()); });
            // path1
            this.posObj["pathPos1"] = [];
            let pathPos1 = cc.find('posLayer/pathPos1', gameMgr.map);
            pathPos1 && pathPos1.children.forEach(node => { this.posObj["pathPos1"].push(node.getPosition()); });
            // path2
            this.posObj["pathPos2"] = [];
            let pathPos2 = cc.find('posLayer/pathPos2', gameMgr.map);
            pathPos2 && pathPos2.children.forEach(node => { this.posObj["pathPos2"].push(node.getPosition()); });
        }
    }

    startGame() {
        // 添加提示层
        this.tipLayer = new cc.Node();
        this.tipLayer.name = "tipLayer";
        this.tipLayer.zIndex = ZindexLayer.zindex_roleLabel;
        this.tipLayer.setPosition(cc.Vec2.ZERO);
        this.tipLayer.setParent(gameMgr.map);
        // 小地图
        if (cocosz.gameMode == 6) {
            this.schedule(() => { this.update_model6_shuxing(); }, 1);
        }
        this.initPlayer();
    }

    GameTime: number = 0;
    isGameStart: boolean = false;
    posList = [];
    initPlayer() {
        // 僵尸模式
        if (cocosz.gameMode == 6) {
            let player1 = cc.instantiate(this.player);
            player1.scale = 0.6;
            player1.setPosition(cc.v2(2000, 0).rotateSelf(2 * Math.PI * Math.random()));
            player1.setParent(this.map);
            this.totalNum++;
            // 飞机运输玩家
            this.fjEffect();
        }
    }
    fjEffect() {
        if (this.fj && this.playerTs) {
            this.uiGamePage.active = false;
            // 玩家
            this.scheduleOnce(() => {
                this.playerTs.node.opacity = 0;
                this.playerTs.playerMess.opacity = 1;
                this.playerTs.ghAniNode.opacity = 1;
            })
            // 相机
            this.followNode = this.fj;
            // 飞机
            this.fj.active = true;
            this.fj.setParent(gameMgr.map);
            this.scheduleOnce(() => { this.fj.zIndex = ZindexLayer.zindex_max; })
            let targetPos = cc.v2(this.playerTs.node.x, this.playerTs.node.y + 500);
            let dis = targetPos.sub(this.fj.getPosition());
            this.fj.scaleX = dis.x < 0 ? -1 : 1;
            // 动画
            let fjAni = this.fj.getComponent(sp.Skeleton);
            fjAni.addAnimation(0, "animation0", true);
            // 音效
            cocosz.audioMgr.playEffect("fj", true, 1);
            // 移动
            let t = dis.mag() / 800;
            cc.tween(this.fj)
                .to(t, { x: targetPos.x, y: targetPos.y })
                .call(() => {
                    fjAni.setAnimation(0, "animation1", false);
                    fjAni.addAnimation(0, "animation2", false);
                    fjAni.addAnimation(0, "animation4", false);
                    fjAni.addAnimation(0, "animation5", true);
                })
                .delay(2)
                .call(() => {
                    // 隐藏提示
                    if (this.fjTip) { this.fjTip.active = false; }
                    this.fj.zIndex = ZindexLayer.zindex_max - 1;
                    this.playerTs.node.zIndex = ZindexLayer.zindex_max;
                    // 玩家下降
                    this.playerTs.node.opacity = 255;
                    this.playerTs.rig.active = false;
                    this.followNode = this.playerTs.node;
                    this.playerTs.node.y += 600;
                    cc.tween(this.playerTs.node)
                        .delay(0.5)
                        .to(1, { y: this.playerTs.node.y - 600 })
                        .call(() => {
                            this.uiGamePage.active = true;
                            this.playerTs.node.zIndex = ZindexLayer.zindex_player;
                            this.playerTs.rig.active = true;
                            this.playerTs.playerMess.opacity = 255;
                            this.playerTs.ghAniNode.opacity = 255;
                            this.playerTs.updateAni("daiji_body", true);
                            // 初始化游戏
                            this.initGame();
                            if (cocosz.gameMode == 6) {
                                // 生成僵尸计时
                                this.schedule(this.createZombieCount, 1);
                            } else {
                                cc.log("模式有问题")
                            }
                        })
                        .start();
                })
                .delay(2)
                .call(() => {
                    this.fj.zIndex = ZindexLayer.zindex_max;
                    fjAni.setAnimation(0, "animation6", false);
                    fjAni.addAnimation(0, "animation7", false);
                    fjAni.addAnimation(0, "animation9", false);
                    fjAni.addAnimation(0, "animation0", true);
                })
                .delay(2)
                .to(2, { position: cc.v3(dis.normalize().mulSelf(2000).add(dis)) })
                .call(() => {
                    cocosz.audioMgr.stopEffect("fj");
                    this.fj.destroy();
                })
                .start();
        }
    }
    showGameTime() {
        if (this.model6_timeLabel && this.model6_timeLabel.isValid) {
            let s = this.GameTime;// 秒
            let m = 0;// 分
            let h = 0;// 小时
            if (s > 60) {
                m = Math.floor(s / 60);
                s = Math.floor(s % 60);
                if (m > 60) {
                    h = Math.floor(m / 60);
                    m = Math.floor(m % 60);
                }
            }
            let r = "";
            r += (h == 0 ? "" : h + ":");
            r += (m >= 10 ? "" + m : "0" + m);
            r += (s >= 10 ? ":" + s : ":0" + s);
            this.timeStr = r;
            this.model6_timeLabel.string = r;
        }
    }
    // 刷新血滴
    update_model6_xuedi() {
        if (gameMgr.playerTs && gameMgr.playerTs.hpNumNode && gameMgr.playerTs.hpNumNode.isValid) {
            gameMgr.playerTs.hpNumNode.active = true;
            gameMgr.playerTs.hpNumNode.width = Math.min(250, gameMgr.playerTs.totleHp * 50);
            gameMgr.playerTs.hpNumNode.children.forEach((n, i) => {
                if (i < gameMgr.playerTs.totleHp) {
                    n.active = true;
                    if (i < gameMgr.playerTs.HP) {
                        n.children[1].opacity = 255;
                    } else {
                        n.children[1].opacity = 0;
                    }
                } else {
                    n.active = false;
                }
            })
        }
    }
    // 刷新属性
    update_model6_shuxing() {
        if (upgradeMgr && gameMgr && gameMgr.model6_shuxing && gameMgr.model6_shuxing.isValid && gameMgr.model6_shuxing.active) {
            // 等级
            this.model6_shuxing.children[0].getComponent(cc.Label).string = upgradeMgr.curLevel.toString();
            // 伤害
            this.model6_shuxing.children[1].getComponent(cc.Label).string = (gameMgr.playerTs.atkNum * gameMgr.playerTs.atkRate).toFixed(0);
            // 射速
            this.model6_shuxing.children[2].getComponent(cc.Label).string = (gameMgr.playerTs.atkSpeed * gameMgr.playerTs.atkSpeedRate).toFixed(1);
            // 换弹
            this.model6_shuxing.children[3].getComponent(cc.Label).string = (gameMgr.playerTs.reloadSpeed * gameMgr.playerTs.reloadRate).toFixed(1);
            // 弹夹容量
            this.model6_shuxing.children[4].getComponent(cc.Label).string = gameMgr.playerTs.curWeapon.bulletNum.toString();
            // 移动速度
            this.model6_shuxing.children[5].getComponent(cc.Label).string = (gameMgr.playerTs.MoveSpeed * gameMgr.playerTs.speedRate).toFixed(0);
            // 拾取范围
            this.model6_shuxing.children[6].getComponent(cc.Label).string = upgradeMgr.jingyanRange.toString();
        }
    }

    showBossHp(rate: number) {
        if (rate > 0) {
            if (this.model6_bossBar && cc.isValid(this.model6_bossBar)) {
                this.model6_bossBar.node.active = true;
                this.model6_bossBar.progress = rate;
            }
            if (this.model6_jingyanBar && cc.isValid(this.model6_jingyanBar)) {
                this.model6_jingyanBar.node.active = false;
            }
            if (this.model6_levelLabel && cc.isValid(this.model6_levelLabel)) {
                this.model6_levelLabel.node.active = false;
            }
        } else {
            if (this.model6_bossBar && cc.isValid(this.model6_bossBar)) {
                this.model6_bossBar.node.active = false;
                this.model6_bossBar.progress = rate;
            }
            if (this.model6_jingyanBar && cc.isValid(this.model6_jingyanBar)) {
                this.model6_jingyanBar.node.active = true;
            }
            if (this.model6_levelLabel && cc.isValid(this.model6_levelLabel)) {
                this.model6_levelLabel.node.active = true;
            }
        }
    }

    boss_border: cc.Node = null;
    zombieTime: number = 0;
    zombieCurNum: number = 0;
    zombieMaxNum: number = 0;
    zombieLength: number = 2;
    zombieArr = ["zombie_basic", "zombie_run", "zombie_drum", "zombie_jump", "zombie_bomb", "zombie_tank", "zombie_poison"]
    bossArr = ["boss1", "boss2", "boss3", "boss4", "boss11", "boss5", "boss12", "boss6", "boss7", "boss8", "boss9", "boss10", "boss13"]
    boss2Arr = [];
    /** 创建僵尸计时 */
    createZombieCount() {
        if (cocosz.isPause || gameMgr.isWin || gameMgr.isFail) return;
        // 游戏计时
        this.GameTime++;
        this.showGameTime();
        // 生成逻辑
        if (this.boss_border) return;
        // 僵尸生成时间计时
        this.zombieTime++;
        let count = 1;
        /** 创建Boss */
        if (0 === this.zombieTime % 100) {
            this.createBossZombie();
            // 更新普通僵尸
            if (this.zombieLength < this.zombieArr.length) this.zombieLength++;
        }
        // 大波僵尸
        else if (0 === this.zombieTime % 50) {
            // 提示
            if (this.model6_ts) {
                this.model6_ts.active = true;
                this.scheduleOnce(() => { this.model6_ts.active = false; }, 3)
                let spAni = this.model6_ts.getComponent(sp.Skeleton);
                spAni.setSkin("sclx_" + cocosz.curLanguage);
                spAni.setAnimation(0, "animation", true);
            }
            // 僵尸数量
            this.zombieMaxNum = 20 + Math.floor(this.zombieTime / 40) * 10;
            if (this.zombieMaxNum > 40) this.zombieMaxNum = 40;
            // 小于最大数量继续生成
            if (this.zombieCurNum < this.zombieMaxNum) {
                count = this.zombieMaxNum - this.zombieCurNum;
                // 分成k份生成，每份10
                let k = Math.ceil(count / 10);
                // 分帧创建
                let angle: number = 0;
                let inter: number = 36;
                for (let i = 0; i < k; i++) {
                    this.schedule(() => {
                        angle += inter;
                        this.createCommonZombie(cc.winSize.height / 2.5 / this.mainCamera.zoomRatio, angle);
                    }, 0.1, Math.ceil(count / k), i);
                }
            }
            // 生成击败boss
            for (let i = this.boss2Arr.length - 1; i >= 0 && i >= this.boss2Arr.length - 2; i--) {
                let resName = this.boss2Arr[i];
                cc.log("创建尸潮boss: ", resName)
                if (resName) { this.createZombie(resName, gameMgr.playerTs.node.getPosition(), cc.winSize.width / 2 / this.mainCamera.zoomRatio); }
            }
        }
        // 僵尸继续
        else if (0 === this.zombieTime % 51 || 0 === this.zombieTime % 52 || 0 === this.zombieTime % 53 || 0 === this.zombieTime % 54 || 0 === this.zombieTime % 55) {

        }
        // 随机少量僵尸
        else {
            // 僵尸数量
            this.zombieMaxNum = 5 + Math.floor(this.zombieTime / 20) * 5;
            if (this.zombieMaxNum > 20) this.zombieMaxNum = 20;
            // 小于最大数量继续生成
            if (this.zombieCurNum < this.zombieMaxNum) {
                // 随机数量
                count = Math.ceil(Math.random() * 4);
                this.schedule(() => { this.createCommonZombie(cc.winSize.height / 2.5 / this.mainCamera.zoomRatio); }, 0.1, count);
            }
        }
    }
    /** 创建普通僵尸 */
    createCommonZombie(dis: number, angle?: number) {
        let index = Math.floor(Math.random() * this.zombieLength);
        let resName = this.zombieArr[index];
        if (resName) { this.createZombie(resName, gameMgr.playerTs.node.getPosition(), dis, angle); }
    }
    /** 创建Boss僵尸 */
    createBossZombie() {
        if (this.bossArr.length) {
            this.createBossBorder();
            // 提示
            if (this.model6_ts) {
                this.model6_ts.active = true;
                this.scheduleOnce(() => { this.model6_ts.active = false; }, 3)
                let spAni = this.model6_ts.getComponent(sp.Skeleton);
                spAni.setSkin("bosslx_" + cocosz.curLanguage);
                spAni.setAnimation(0, "animation", true);
            }
            // boss
            let resName = this.bossArr.shift();
            let centerPos = gameMgr.playerTs.node.getPosition();
            if (this.boss_border) {
                centerPos = this.boss_border.getPosition();
            }
            if (resName) {
                this.boss2Arr.push(resName);
                this.createZombie(resName, centerPos, 300, null, true);
            }
        }
    }
    /** 创建boss边界 */
    createBossBorder() {
        // 边界
        let pre = cocosz.resMgr.getRes("boss_border", cc.Prefab);
        if (pre) {
            this.boss_border = cc.instantiate(pre);
            this.boss_border.setPosition(gameMgr.playerTs.node.getPosition());
            if (this.boss_border.x - this.boss_border.width / 2 < -gameMgr.mapSize.width / 2) {
                this.boss_border.x = -gameMgr.mapSize.width / 2 + this.boss_border.width / 2 + 100;
            } else if (this.boss_border.x + this.boss_border.width / 2 > gameMgr.mapSize.width / 2) {
                this.boss_border.x = gameMgr.mapSize.width / 2 - this.boss_border.width / 2 - 100;
            }
            if (this.boss_border.y - this.boss_border.height / 2 < -gameMgr.mapSize.height / 2) {
                this.boss_border.y = -gameMgr.mapSize.height / 2 + this.boss_border.height / 2 + 100;
            } else if (this.boss_border.y + this.boss_border.height / 2 > gameMgr.mapSize.height / 2) {
                this.boss_border.y = gameMgr.mapSize.height / 2 - this.boss_border.height / 2 - 300;
            }
            this.boss_border.setParent(this.map);
        }
    }
    /** 创建僵尸 */
    createZombie(resName: string, center: cc.Vec2, dis: number, angle?: number, isBoss: boolean = false) {
        // 预制体
        let prefab = cocosz.resMgr.getRes(resName, cc.Prefab);
        if (prefab) {
            // 坐标
            this._recursionCount = 0;
            let pos = this.getZombieBirthPos(center, dis, angle);
            if (pos) {
                // 僵尸
                let newZombie: cc.Node = this.nodeGet(resName, prefab);
                if (newZombie) {
                    let ts = newZombie.getComponent(ZombieBase);
                    if (ts && isBoss) { ts.isBoss = true; }
                    newZombie.setPosition(pos);
                    newZombie.setParent(gameMgr.map);
                    if (ts) ts.initNode();
                }
            }
        } else {
            cocosz.resMgr.loadAndCacheRes("prefab_zombie/" + resName, cc.Prefab, null, (err, res) => {
                if (!err) {
                    this.createZombie(resName, center, dis, angle, isBoss);
                }
            })
        }
    }
    /** 获取僵尸生成坐标 */
    private _recursionCount: number = 0;
    getZombieBirthPos(center: cc.Vec2, dis, angle?: number) {
        if (++this._recursionCount > 100) {
            return null;
        }
        let radians = 0;
        if (angle == null || angle == undefined) {
            radians = 2 * Math.PI * Math.random();
        } else {
            radians = cc.misc.degreesToRadians(angle);
        }
        let dif = cc.v2(dis + Math.floor(200 * Math.random()), 0).rotateSelf(radians);
        let pos = center.add(dif);
        if (pos.x > -gameMgr.mapSize.width / 2 + 400 && pos.x < gameMgr.mapSize.width / 2 - 400 &&
            pos.y < gameMgr.mapSize.height / 2 - 400 && pos.y > -gameMgr.mapSize.height / 2 + 400) {
            return pos;
        } else {
            return this.getZombieBirthPos(center, dis);
        }
    }

    lastTime: number = 0;
    safeTime: number = 40;
    startPos: cc.Vec2 = null;
    initGame() {
        this.startPos = this.yaogan.getPosition();
        this.isGameStart = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
        this.moveArea.on(cc.Node.EventType.TOUCH_START, ((event: cc.Touch) => {
            let pos = event.getLocation();
            pos = this.node.convertToNodeSpaceAR(pos);
            this.yaogan.setPosition(pos);
        }), this);
        this.moveArea.on(cc.Node.EventType.TOUCH_MOVE, ((event: cc.Touch) => {
            let div = event.getLocation().sub(event.getStartLocation());
            if (div.mag() > 160) {
                div = div.mul(160 / div.mag());
            }
            this.yaogan.children[0].setPosition(div);
            gameMgr.playerTs.moveDir = div.normalize();
        }), this)
        this.moveArea.on(cc.Node.EventType.TOUCH_END, ((event: cc.Touch) => {
            this.yaogan.setPosition(this.startPos);
            this.yaogan.children[0].setPosition(cc.v2(0, 0));
            gameMgr.playerTs.moveDir = cc.v2(0, 0);
        }), this)
        this.moveArea.on(cc.Node.EventType.TOUCH_CANCEL, ((event: cc.Touch) => {
            this.yaogan.setPosition(this.startPos);
            this.yaogan.children[0].setPosition(cc.v2(0, 0));
            gameMgr.playerTs.moveDir = cc.v2(0, 0);
        }), this)
    }

    isUp: boolean = false;
    isDown: boolean = false;
    isLeft: boolean = false;
    isRight: boolean = false;
    keyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case 87: {
                if (!this.isUp) {
                    this.isUp = true;
                    this.setDir();
                }
                break;
            }
            case 83: {
                if (!this.isDown) {
                    this.isDown = true;
                    this.setDir();
                }
                break;
            }
            case 65: {
                if (!this.isLeft) {
                    this.isLeft = true;
                    this.setDir();
                }
                break;
            }
            case 68: {
                if (!this.isRight) {
                    this.isRight = true;
                    this.setDir();
                }
                break;
            }
        }
    }

    keyUp(event) {
        switch (event.keyCode) {
            case 87: {
                this.isUp = false;
                this.setDir();
                break;
            }
            case 83: {
                this.isDown = false;
                this.setDir();
                break;
            }
            case 65: {
                this.isLeft = false;
                this.setDir();
                break;
            }
            case 68: {
                this.isRight = false;
                this.setDir();
                break;
            }
        }
    }

    followNode: cc.Node;
    isPre: boolean = true;
    cameraFollow() {
        let pos_to = null;
        let t = 0.1;
        if (this.followNode && this.followNode.isValid) {
            pos_to = this.followNode.getPosition();
            t = 0.1;
        }
        if (pos_to) {
            let pos_from = this.mainCamereRootNode.getPosition();
            let pos_out = cc.Vec2.ZERO;
            let ratio = this.mainCamera.zoomRatio;
            let winSize = new cc.Size(cc.winSize.width / ratio, cc.winSize.height / ratio);
            if (cocosz.gameMode == 7) {
                // 无边界
            } else {
                // 相机边界
                if ((pos_to.x + winSize.width / 2) > gameMgr.mapSize.width / 2) {
                    pos_to.x = gameMgr.mapSize.width / 2 - winSize.width / 2;
                } else if ((pos_to.x - winSize.width / 2) < -gameMgr.mapSize.width / 2) {
                    pos_to.x = -gameMgr.mapSize.width / 2 + winSize.width / 2;
                }
                if ((pos_to.y + winSize.height / 2) > gameMgr.mapSize.height / 2) {
                    pos_to.y = gameMgr.mapSize.height / 2 - winSize.height / 2;
                } else if ((pos_to.y - winSize.height / 2) < -gameMgr.mapSize.height / 2) {
                    pos_to.y = -gameMgr.mapSize.height / 2 + winSize.height / 2;
                }
            }
            if (pos_to.sub(pos_from).mag() < 1000) {
                cc.Vec2.lerp(pos_out, pos_from, pos_to, t);
                this.mainCamereRootNode.setPosition(pos_out);
            } else {
                this.mainCamereRootNode.setPosition(pos_to);
                // 更新节点透明度
                gameMgr.setMapTs && gameMgr.setMapTs.checkAllNode();
            }
        }
    }

    setDir() {
        let moveDir = cc.v2(0, 0);
        if (this.isUp) {
            moveDir.y++;
        }
        if (this.isLeft) {
            moveDir.x--;
        }
        if (this.isRight) {
            moveDir.x++;
        }
        if (this.isDown) {
            moveDir.y--;
        }
        this.playerTs.moveDir = moveDir.normalize();
    }

    restart() { }

    useMeleeWeapon() { }

    useRangedWeapon() {
        this.playerTs.changeCurWeapon(this.playerTs.rangedWeapon);
    }

    useRangedWeaponAd() {
        this.playerTs.changeCurWeapon(this.playerTs.rangedWeaponAd);
    }

    getNewWeapon() {
        cocosz.audioMgr.playEffect("changeWeapon");
        this.playerTs.setNewWeapon();
    }


    clipNameArr: any = {};
    playEffect(name: string, node?: cc.Node, interval: number = 0.2) {
        if (gameMgr.isWin || gameMgr.isFail || cocosz.isPause) return;
        if (this.clipNameArr[name]) {
            return;
        }
        let voice = 1;
        if (node && node.isValid && node.parent && node.parent.isValid) {
            let pos = node.getPosition();
            pos = node.parent.convertToWorldSpaceAR(pos);
            let pos2 = this.playerTs.node.getPosition();
            pos2 = this.playerTs.node.parent.convertToWorldSpaceAR(pos2);
            let dt = pos.sub(pos2).mag();
            if (dt > 2000) { return; }
        }
        cocosz.audioMgr.playEffect(name, false, voice);
        if (interval > 0) {
            this.clipNameArr[name] = 1;
            this.scheduleOnce(() => { this.clipNameArr[name] = 0; }, interval);
        }
    }
    playClip(clip: cc.AudioClip, node: cc.Node, interval: number = 0.2) {
        if (gameMgr.isWin || gameMgr.isFail || cocosz.isPause) return;
        if (this.clipNameArr[clip.name]) {
            return;
        }
        let voice = 1;
        if (node && node.isValid && node.parent && node.parent.isValid) {
            let pos = node.getPosition();
            pos = node.parent.convertToWorldSpaceAR(pos);
            let pos2 = this.playerTs.node.getPosition();
            pos2 = this.playerTs.node.parent.convertToWorldSpaceAR(pos2);
            let dt = pos.sub(pos2).mag();
            if (dt > 2000) { return; }
        }
        cocosz.audioMgr.playClip(clip, false, voice);
        // 记录
        if (interval > 0) {
            this.clipNameArr[clip.name] = 1;
            this.scheduleOnce(() => { this.clipNameArr[clip.name] = 0; }, interval);
        }
    }

    /** 文字提示效果 */
    showRoleTip(node: cc.Node, str: string, labelColor: cc.Color = cc.Color.WHITE) {
        if (node && node.isValid && this.hpTip && this.hpTip.isValid && gameMgr.tipLayer) {
            let tipNode = this.nodeGet("hpTip", this.hpTip);
            if (tipNode) {
                tipNode.setParent(gameMgr.tipLayer);
                // 初始化
                tipNode.setPosition(node.x + 200 * (Math.random() - 0.5), node.y + node.height / 2);
                tipNode.opacity = 255;
                tipNode.color = labelColor;
                tipNode.scale = (labelColor == cc.Color.WHITE ? 1 : 1.2);
                // 字体内容
                let tipLabel = tipNode.getComponent(cc.Label);
                if (tipLabel) { tipLabel.string = str; }
                // 动效
                tipNode.stopAllActions();
                cc.tween(tipNode)
                    .by(0.5, { y: 20, scale: 1, })
                    .by(0.3, { y: 10, scale: -1, opacity: -255 })
                    .call(() => { this.nodePut("hpTip", tipNode); })
                    .start();
            }
        }
    }

    isFail: boolean = false;
    fail() {
        if (this.isWin || this.isFail) return;
        cocosz.pauseCount++;
        this.isFail = true;
        this.unscheduleAllCallbacks();
        upgradeMgr && upgradeMgr.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            this.qlzc.active = true;
            cc.tween(this.qlzc)
                .delay(0.3)
                .call(() => { this.qlzc.getChildByName("dian").children[0].active = true })
                .delay(0.3)
                .call(() => { this.qlzc.getChildByName("dian").children[1].active = true })
                .delay(0.3)
                .call(() => { this.qlzc.getChildByName("dian").children[2].active = true })
                .delay(0.3)
                .call(() => {
                    this.qlzc.getChildByName("dian").children[0].active = false;
                    this.qlzc.getChildByName("dian").children[1].active = false;
                    this.qlzc.getChildByName("dian").children[2].active = false;
                })
                .union()
                .repeatForever()
                .start();
        }, 2)
        this.scheduleOnce(() => {
            cocosz.gameMgr.gameFailed();
        }, 4)
    }

    isWin: boolean = false;
    win() {
        if (this.isWin || this.isFail) return;
        cocosz.pauseCount++;
        this.isWin = true;
        this.unscheduleAllCallbacks();
        upgradeMgr && upgradeMgr.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            this.qlzc.active = true;
            cc.tween(this.qlzc)
                .delay(0.3)
                .call(() => { this.qlzc.getChildByName("dian").children[0].active = true })
                .delay(0.3)
                .call(() => { this.qlzc.getChildByName("dian").children[1].active = true })
                .delay(0.3)
                .call(() => { this.qlzc.getChildByName("dian").children[2].active = true })
                .delay(0.3)
                .call(() => {
                    this.qlzc.getChildByName("dian").children[0].active = false;
                    this.qlzc.getChildByName("dian").children[1].active = false;
                    this.qlzc.getChildByName("dian").children[2].active = false;
                })
                .union()
                .repeatForever()
                .start();
        }, 2)
        this.scheduleOnce(() => {
            cocosz.gameMgr.gameSuccess();
        }, 4)

    }

    isRevive: boolean = false;
    revive() {
        this.isRevive = true;
        this.playerTs.revive();
    }

    /**
    * 震屏
    * @param dis 范围
    * @param times 次数
    * @param isVibrate 是否震动
    * @returns 
    */
    private _timeArr = [0, 0.04, 0.05, 0.06, 0.07];
    private _disArr = [0, 3, 10, 20, 30];
    private _vibrateTime: number = 0;// 震动时间
    public shakeEffect(extent: 0 | 1 | 2 | 3 | 4 = 1, times: number = 1, isVibrate: boolean = true, vibrateType: VibrateType = VibrateType.Short) {
        // 镜头晃动
        let t = this._timeArr[extent];
        let dis = this._disArr[extent];
        if (extent > 0 && times > 0) {
            this.mainCamera.node.stopAllActions();
            this.mainCamera.node.setPosition(0, 0, 0);
            cc.tween(this.mainCamera.node)
                .to(t, { position: cc.v3(dis, dis) })
                .to(t, { position: cc.v3(0, -dis) })
                .to(t, { position: cc.v3(-dis, dis) })
                .to(t, { position: cc.v3(-dis, -dis) })
                .to(t, { position: cc.v3(0, dis) })
                .to(t, { position: cc.v3(0, 0) })
                .union()
                .repeat(times)
                .start();
        }
        // 震动,间隔1秒
        if (cocosz.dataMgr.ShakeOn) {
            let t = new Date().getTime();
            if (t - this._vibrateTime > 500) {
                this._vibrateTime = t;
                isVibrate && utils.vibrate(vibrateType);
            }
        }
    }

    guideSkip() {
        // 新手指引跳过
    }

}
