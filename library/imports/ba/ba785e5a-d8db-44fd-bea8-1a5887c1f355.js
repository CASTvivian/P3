"use strict";
cc._RF.push(module, 'ba7855a2NtE/b6oGliHwfNV', 'gameMgr');
// scripts/Game/gameMgr.ts

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
exports.gameMgr = void 0;
var CocosZ_1 = require("../Framework/CocosZ");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var Constant_1 = require("../Framework/Constant");
var UpgradeMgr_1 = require("./UpgradeMgr");
var YZ_Constant_1 = require("../../common-plugin/Scripts/YZ_Constant");
var ZombieBase_1 = require("./ZombieBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//tag:{0:攻击范围，1:玩家身体，2:玩家腿部 6,减速，7,毒区 11:墙，12:道具，13:武器，14:草，15:房子,16:物资箱, 17:海水, 18:升级仓, 19:旗台}
exports.gameMgr = null;
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodePoolObj = {};
        _this.canSHowGameBanner = true;
        _this.tipLayer = null;
        _this.setMapTs = null;
        _this.playerTs = null;
        _this.uiGamePage = null;
        _this.moveArea = null;
        _this.yaogan = null;
        _this.BtnBullet = null;
        _this.posObj = {};
        // 躲猫猫模式
        _this.dmmArr = [];
        _this.red = null;
        _this.hpTip = null;
        _this.effect_fire = null;
        _this.effect_hit = null;
        _this.itemList = [];
        _this.itemEffect = [];
        _this.spark = null;
        _this.blood = null;
        _this.testPoint = null;
        _this.player = null;
        _this.jiaoyin = null;
        _this.fj = null;
        _this.fjTip = null;
        _this.mainCamereRootNode = null;
        _this.mainCamera = null;
        // LIFE-CYCLE CALLBACKS:
        _this.atk = null;
        _this.safeCenter = cc.v2(0, 0);
        _this.redCircle = null;
        _this.redCircle2 = null;
        // mask: cc.Node = null;
        // maskMtl: cc.Material = null;
        _this.mapSize = cc.winSize;
        _this.miniMapSize = null;
        _this.btnSkill = null;
        _this.btnSkillAd = null;
        _this.rangedWeaponMess = null;
        _this.rangedWeaponAdMess = null;
        _this.ammo = null;
        _this.ammoAd = null;
        _this.kt = null;
        _this.model6_touxiang = null;
        _this.model6_btnShuxing = null;
        _this.model6_shuxing = null;
        _this.model6_jingyanBar = null;
        _this.model6_levelLabel = null;
        _this.model6_skillScrollView = null;
        _this.model6_skillScrollView_content = null;
        _this.model6_skillScrollView_item = null;
        _this.model6_timeLabel = null;
        _this.model6_ts = null;
        _this.model6_bossBar = null;
        _this.timeStr = "";
        _this.totalNum = 0;
        _this.deathNum = 0;
        _this.playerRank = 1;
        //通关条件： 1击败所有敌人 2击败boss 3抵达撤离点
        _this.passCondition = 1;
        _this.bossName = "";
        _this.map = null;
        _this.startPoint = null;
        _this.atkRange = null;
        _this.curTime = 0;
        _this.timeLabel = null;
        _this.snow = null;
        _this.qlzc = null;
        _this.GameTime = 0;
        _this.isGameStart = false;
        _this.posList = [];
        _this.boss_border = null;
        _this.zombieTime = 0;
        _this.zombieCurNum = 0;
        _this.zombieMaxNum = 0;
        _this.zombieLength = 2;
        _this.zombieArr = ["zombie_basic", "zombie_run", "zombie_drum", "zombie_jump", "zombie_bomb", "zombie_tank", "zombie_poison"];
        _this.bossArr = ["boss1", "boss2", "boss3", "boss4", "boss11", "boss5", "boss12", "boss6", "boss7", "boss8", "boss9", "boss10", "boss13"];
        _this.boss2Arr = [];
        /** 获取僵尸生成坐标 */
        _this._recursionCount = 0;
        _this.lastTime = 0;
        _this.safeTime = 40;
        _this.startPos = null;
        _this.isUp = false;
        _this.isDown = false;
        _this.isLeft = false;
        _this.isRight = false;
        _this.isPre = true;
        _this.clipNameArr = {};
        _this.isFail = false;
        _this.isWin = false;
        _this.isRevive = false;
        /**
        * 震屏
        * @param dis 范围
        * @param times 次数
        * @param isVibrate 是否震动
        * @returns
        */
        _this._timeArr = [0, 0.04, 0.05, 0.06, 0.07];
        _this._disArr = [0, 3, 10, 20, 30];
        _this._vibrateTime = 0; // 震动时间
        return _this;
    }
    GameMgr.prototype.nodeGet = function (name, prefab) {
        var node = null;
        // 创建新的节点池
        if (!this.nodePoolObj[name]) {
            this.nodePoolObj[name] = new cc.NodePool();
        }
        // 从节点池中获取节点
        if (this.nodePoolObj[name].size()) {
            node = this.nodePoolObj[name].get();
        }
        else if (prefab && prefab.isValid) {
            node = cc.instantiate(prefab);
        }
        // 防止预制体和节点名字不同
        if (node) {
            node.name = name;
        }
        return node;
    };
    GameMgr.prototype.nodePut = function (name, node) {
        if (this.nodePoolObj[name] && node && node.isValid) {
            this.nodePoolObj[name].put(node);
        }
        else {
            cc.log("回收出错: ", name);
        }
    };
    ;
    GameMgr.prototype.onLoad = function () {
        exports.gameMgr = this;
        exports.gameMgr.mainCamera.zoomRatio = 0.65;
        CocosZ_1.cocosz.pauseCount = 0;
    };
    GameMgr.prototype.start = function () {
        this.mainCamereRootNode.setContentSize(cc.winSize);
        this.mainCamereRootNode.width += 500;
        this.mainCamereRootNode.height += 500;
        // 飞机任务提示
        if (this.fjTip) {
            if ([5, 7].includes(CocosZ_1.cocosz.gameMode)) {
                this.fjTip.active = false;
            }
            else {
                this.fjTip.active = true;
                this.fjTip.zIndex = Constant_1.ZindexLayer.zindex_max;
            }
        }
    };
    GameMgr.prototype.lateUpdate = function () {
        if (CocosZ_1.cocosz.isPause || exports.gameMgr.isWin || exports.gameMgr.isFail)
            return;
        this.cameraFollow();
    };
    GameMgr.prototype.initPos = function () {
        var _this = this;
        if (CocosZ_1.cocosz.gameMode == 7) {
            // 坐标
            // rolePos0
            var bluePos = cc.find('posLayer/bluePos', exports.gameMgr.map);
            if (bluePos)
                this.posObj["bluePos"] = bluePos.getPosition();
            // rolePos1
            var redPos = cc.find('posLayer/redPos', exports.gameMgr.map);
            if (redPos)
                this.posObj["redPos"] = redPos.getPosition();
            // path0
            this.posObj["pathPos0"] = [];
            var pathPos0 = cc.find('posLayer/pathPos0', exports.gameMgr.map);
            pathPos0 && pathPos0.children.forEach(function (node) { _this.posObj["pathPos0"].push(node.getPosition()); });
            // path1
            this.posObj["pathPos1"] = [];
            var pathPos1 = cc.find('posLayer/pathPos1', exports.gameMgr.map);
            pathPos1 && pathPos1.children.forEach(function (node) { _this.posObj["pathPos1"].push(node.getPosition()); });
            // path2
            this.posObj["pathPos2"] = [];
            var pathPos2 = cc.find('posLayer/pathPos2', exports.gameMgr.map);
            pathPos2 && pathPos2.children.forEach(function (node) { _this.posObj["pathPos2"].push(node.getPosition()); });
        }
    };
    GameMgr.prototype.startGame = function () {
        var _this = this;
        // 添加提示层
        this.tipLayer = new cc.Node();
        this.tipLayer.name = "tipLayer";
        this.tipLayer.zIndex = Constant_1.ZindexLayer.zindex_roleLabel;
        this.tipLayer.setPosition(cc.Vec2.ZERO);
        this.tipLayer.setParent(exports.gameMgr.map);
        // 小地图
        if (CocosZ_1.cocosz.gameMode == 6) {
            this.schedule(function () { _this.update_model6_shuxing(); }, 1);
        }
        this.initPlayer();
    };
    GameMgr.prototype.initPlayer = function () {
        // 僵尸模式
        if (CocosZ_1.cocosz.gameMode == 6) {
            var player1 = cc.instantiate(this.player);
            player1.scale = 0.6;
            player1.setPosition(cc.v2(2000, 0).rotateSelf(2 * Math.PI * Math.random()));
            player1.setParent(this.map);
            this.totalNum++;
            // 飞机运输玩家
            this.fjEffect();
        }
    };
    GameMgr.prototype.fjEffect = function () {
        var _this = this;
        if (this.fj && this.playerTs) {
            this.uiGamePage.active = false;
            // 玩家
            this.scheduleOnce(function () {
                _this.playerTs.node.opacity = 0;
                _this.playerTs.playerMess.opacity = 1;
                _this.playerTs.ghAniNode.opacity = 1;
            });
            // 相机
            this.followNode = this.fj;
            // 飞机
            this.fj.active = true;
            this.fj.setParent(exports.gameMgr.map);
            this.scheduleOnce(function () { _this.fj.zIndex = Constant_1.ZindexLayer.zindex_max; });
            var targetPos = cc.v2(this.playerTs.node.x, this.playerTs.node.y + 500);
            var dis = targetPos.sub(this.fj.getPosition());
            this.fj.scaleX = dis.x < 0 ? -1 : 1;
            // 动画
            var fjAni_1 = this.fj.getComponent(sp.Skeleton);
            fjAni_1.addAnimation(0, "animation0", true);
            // 音效
            CocosZ_1.cocosz.audioMgr.playEffect("fj", true, 1);
            // 移动
            var t = dis.mag() / 800;
            cc.tween(this.fj)
                .to(t, { x: targetPos.x, y: targetPos.y })
                .call(function () {
                fjAni_1.setAnimation(0, "animation1", false);
                fjAni_1.addAnimation(0, "animation2", false);
                fjAni_1.addAnimation(0, "animation4", false);
                fjAni_1.addAnimation(0, "animation5", true);
            })
                .delay(2)
                .call(function () {
                // 隐藏提示
                if (_this.fjTip) {
                    _this.fjTip.active = false;
                }
                _this.fj.zIndex = Constant_1.ZindexLayer.zindex_max - 1;
                _this.playerTs.node.zIndex = Constant_1.ZindexLayer.zindex_max;
                // 玩家下降
                _this.playerTs.node.opacity = 255;
                _this.playerTs.rig.active = false;
                _this.followNode = _this.playerTs.node;
                _this.playerTs.node.y += 600;
                cc.tween(_this.playerTs.node)
                    .delay(0.5)
                    .to(1, { y: _this.playerTs.node.y - 600 })
                    .call(function () {
                    _this.uiGamePage.active = true;
                    _this.playerTs.node.zIndex = Constant_1.ZindexLayer.zindex_player;
                    _this.playerTs.rig.active = true;
                    _this.playerTs.playerMess.opacity = 255;
                    _this.playerTs.ghAniNode.opacity = 255;
                    _this.playerTs.updateAni("daiji_body", true);
                    // 初始化游戏
                    _this.initGame();
                    if (CocosZ_1.cocosz.gameMode == 6) {
                        // 生成僵尸计时
                        _this.schedule(_this.createZombieCount, 1);
                    }
                    else {
                        cc.log("模式有问题");
                    }
                })
                    .start();
            })
                .delay(2)
                .call(function () {
                _this.fj.zIndex = Constant_1.ZindexLayer.zindex_max;
                fjAni_1.setAnimation(0, "animation6", false);
                fjAni_1.addAnimation(0, "animation7", false);
                fjAni_1.addAnimation(0, "animation9", false);
                fjAni_1.addAnimation(0, "animation0", true);
            })
                .delay(2)
                .to(2, { position: cc.v3(dis.normalize().mulSelf(2000).add(dis)) })
                .call(function () {
                CocosZ_1.cocosz.audioMgr.stopEffect("fj");
                _this.fj.destroy();
            })
                .start();
        }
    };
    GameMgr.prototype.showGameTime = function () {
        if (this.model6_timeLabel && this.model6_timeLabel.isValid) {
            var s = this.GameTime; // 秒
            var m = 0; // 分
            var h = 0; // 小时
            if (s > 60) {
                m = Math.floor(s / 60);
                s = Math.floor(s % 60);
                if (m > 60) {
                    h = Math.floor(m / 60);
                    m = Math.floor(m % 60);
                }
            }
            var r = "";
            r += (h == 0 ? "" : h + ":");
            r += (m >= 10 ? "" + m : "0" + m);
            r += (s >= 10 ? ":" + s : ":0" + s);
            this.timeStr = r;
            this.model6_timeLabel.string = r;
        }
    };
    // 刷新血滴
    GameMgr.prototype.update_model6_xuedi = function () {
        if (exports.gameMgr.playerTs && exports.gameMgr.playerTs.hpNumNode && exports.gameMgr.playerTs.hpNumNode.isValid) {
            exports.gameMgr.playerTs.hpNumNode.active = true;
            exports.gameMgr.playerTs.hpNumNode.width = Math.min(250, exports.gameMgr.playerTs.totleHp * 50);
            exports.gameMgr.playerTs.hpNumNode.children.forEach(function (n, i) {
                if (i < exports.gameMgr.playerTs.totleHp) {
                    n.active = true;
                    if (i < exports.gameMgr.playerTs.HP) {
                        n.children[1].opacity = 255;
                    }
                    else {
                        n.children[1].opacity = 0;
                    }
                }
                else {
                    n.active = false;
                }
            });
        }
    };
    // 刷新属性
    GameMgr.prototype.update_model6_shuxing = function () {
        if (UpgradeMgr_1.upgradeMgr && exports.gameMgr && exports.gameMgr.model6_shuxing && exports.gameMgr.model6_shuxing.isValid && exports.gameMgr.model6_shuxing.active) {
            // 等级
            this.model6_shuxing.children[0].getComponent(cc.Label).string = UpgradeMgr_1.upgradeMgr.curLevel.toString();
            // 伤害
            this.model6_shuxing.children[1].getComponent(cc.Label).string = (exports.gameMgr.playerTs.atkNum * exports.gameMgr.playerTs.atkRate).toFixed(0);
            // 射速
            this.model6_shuxing.children[2].getComponent(cc.Label).string = (exports.gameMgr.playerTs.atkSpeed * exports.gameMgr.playerTs.atkSpeedRate).toFixed(1);
            // 换弹
            this.model6_shuxing.children[3].getComponent(cc.Label).string = (exports.gameMgr.playerTs.reloadSpeed * exports.gameMgr.playerTs.reloadRate).toFixed(1);
            // 弹夹容量
            this.model6_shuxing.children[4].getComponent(cc.Label).string = exports.gameMgr.playerTs.curWeapon.bulletNum.toString();
            // 移动速度
            this.model6_shuxing.children[5].getComponent(cc.Label).string = (exports.gameMgr.playerTs.MoveSpeed * exports.gameMgr.playerTs.speedRate).toFixed(0);
            // 拾取范围
            this.model6_shuxing.children[6].getComponent(cc.Label).string = UpgradeMgr_1.upgradeMgr.jingyanRange.toString();
        }
    };
    GameMgr.prototype.showBossHp = function (rate) {
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
        }
        else {
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
    };
    /** 创建僵尸计时 */
    GameMgr.prototype.createZombieCount = function () {
        var _this = this;
        if (CocosZ_1.cocosz.isPause || exports.gameMgr.isWin || exports.gameMgr.isFail)
            return;
        // 游戏计时
        this.GameTime++;
        this.showGameTime();
        // 生成逻辑
        if (this.boss_border)
            return;
        // 僵尸生成时间计时
        this.zombieTime++;
        var count = 1;
        /** 创建Boss */
        if (0 === this.zombieTime % 100) {
            this.createBossZombie();
            // 更新普通僵尸
            if (this.zombieLength < this.zombieArr.length)
                this.zombieLength++;
        }
        // 大波僵尸
        else if (0 === this.zombieTime % 50) {
            // 提示
            if (this.model6_ts) {
                this.model6_ts.active = true;
                this.scheduleOnce(function () { _this.model6_ts.active = false; }, 3);
                var spAni = this.model6_ts.getComponent(sp.Skeleton);
                spAni.setSkin("sclx_" + CocosZ_1.cocosz.curLanguage);
                spAni.setAnimation(0, "animation", true);
            }
            // 僵尸数量
            this.zombieMaxNum = 20 + Math.floor(this.zombieTime / 40) * 10;
            if (this.zombieMaxNum > 40)
                this.zombieMaxNum = 40;
            // 小于最大数量继续生成
            if (this.zombieCurNum < this.zombieMaxNum) {
                count = this.zombieMaxNum - this.zombieCurNum;
                // 分成k份生成，每份10
                var k = Math.ceil(count / 10);
                // 分帧创建
                var angle_1 = 0;
                var inter_1 = 36;
                for (var i = 0; i < k; i++) {
                    this.schedule(function () {
                        angle_1 += inter_1;
                        _this.createCommonZombie(cc.winSize.height / 2.5 / _this.mainCamera.zoomRatio, angle_1);
                    }, 0.1, Math.ceil(count / k), i);
                }
            }
            // 生成击败boss
            for (var i = this.boss2Arr.length - 1; i >= 0 && i >= this.boss2Arr.length - 2; i--) {
                var resName = this.boss2Arr[i];
                cc.log("创建尸潮boss: ", resName);
                if (resName) {
                    this.createZombie(resName, exports.gameMgr.playerTs.node.getPosition(), cc.winSize.width / 2 / this.mainCamera.zoomRatio);
                }
            }
        }
        // 僵尸继续
        else if (0 === this.zombieTime % 51 || 0 === this.zombieTime % 52 || 0 === this.zombieTime % 53 || 0 === this.zombieTime % 54 || 0 === this.zombieTime % 55) {
        }
        // 随机少量僵尸
        else {
            // 僵尸数量
            this.zombieMaxNum = 5 + Math.floor(this.zombieTime / 20) * 5;
            if (this.zombieMaxNum > 20)
                this.zombieMaxNum = 20;
            // 小于最大数量继续生成
            if (this.zombieCurNum < this.zombieMaxNum) {
                // 随机数量
                count = Math.ceil(Math.random() * 4);
                this.schedule(function () { _this.createCommonZombie(cc.winSize.height / 2.5 / _this.mainCamera.zoomRatio); }, 0.1, count);
            }
        }
    };
    /** 创建普通僵尸 */
    GameMgr.prototype.createCommonZombie = function (dis, angle) {
        var index = Math.floor(Math.random() * this.zombieLength);
        var resName = this.zombieArr[index];
        if (resName) {
            this.createZombie(resName, exports.gameMgr.playerTs.node.getPosition(), dis, angle);
        }
    };
    /** 创建Boss僵尸 */
    GameMgr.prototype.createBossZombie = function () {
        var _this = this;
        if (this.bossArr.length) {
            this.createBossBorder();
            // 提示
            if (this.model6_ts) {
                this.model6_ts.active = true;
                this.scheduleOnce(function () { _this.model6_ts.active = false; }, 3);
                var spAni = this.model6_ts.getComponent(sp.Skeleton);
                spAni.setSkin("bosslx_" + CocosZ_1.cocosz.curLanguage);
                spAni.setAnimation(0, "animation", true);
            }
            // boss
            var resName = this.bossArr.shift();
            var centerPos = exports.gameMgr.playerTs.node.getPosition();
            if (this.boss_border) {
                centerPos = this.boss_border.getPosition();
            }
            if (resName) {
                this.boss2Arr.push(resName);
                this.createZombie(resName, centerPos, 300, null, true);
            }
        }
    };
    /** 创建boss边界 */
    GameMgr.prototype.createBossBorder = function () {
        // 边界
        var pre = CocosZ_1.cocosz.resMgr.getRes("boss_border", cc.Prefab);
        if (pre) {
            this.boss_border = cc.instantiate(pre);
            this.boss_border.setPosition(exports.gameMgr.playerTs.node.getPosition());
            if (this.boss_border.x - this.boss_border.width / 2 < -exports.gameMgr.mapSize.width / 2) {
                this.boss_border.x = -exports.gameMgr.mapSize.width / 2 + this.boss_border.width / 2 + 100;
            }
            else if (this.boss_border.x + this.boss_border.width / 2 > exports.gameMgr.mapSize.width / 2) {
                this.boss_border.x = exports.gameMgr.mapSize.width / 2 - this.boss_border.width / 2 - 100;
            }
            if (this.boss_border.y - this.boss_border.height / 2 < -exports.gameMgr.mapSize.height / 2) {
                this.boss_border.y = -exports.gameMgr.mapSize.height / 2 + this.boss_border.height / 2 + 100;
            }
            else if (this.boss_border.y + this.boss_border.height / 2 > exports.gameMgr.mapSize.height / 2) {
                this.boss_border.y = exports.gameMgr.mapSize.height / 2 - this.boss_border.height / 2 - 300;
            }
            this.boss_border.setParent(this.map);
        }
    };
    /** 创建僵尸 */
    GameMgr.prototype.createZombie = function (resName, center, dis, angle, isBoss) {
        var _this = this;
        if (isBoss === void 0) { isBoss = false; }
        // 预制体
        var prefab = CocosZ_1.cocosz.resMgr.getRes(resName, cc.Prefab);
        if (prefab) {
            // 坐标
            this._recursionCount = 0;
            var pos = this.getZombieBirthPos(center, dis, angle);
            if (pos) {
                // 僵尸
                var newZombie = this.nodeGet(resName, prefab);
                if (newZombie) {
                    var ts = newZombie.getComponent(ZombieBase_1.default);
                    if (ts && isBoss) {
                        ts.isBoss = true;
                    }
                    newZombie.setPosition(pos);
                    newZombie.setParent(exports.gameMgr.map);
                    if (ts)
                        ts.initNode();
                }
            }
        }
        else {
            CocosZ_1.cocosz.resMgr.loadAndCacheRes("prefab_zombie/" + resName, cc.Prefab, null, function (err, res) {
                if (!err) {
                    _this.createZombie(resName, center, dis, angle, isBoss);
                }
            });
        }
    };
    GameMgr.prototype.getZombieBirthPos = function (center, dis, angle) {
        if (++this._recursionCount > 100) {
            return null;
        }
        var radians = 0;
        if (angle == null || angle == undefined) {
            radians = 2 * Math.PI * Math.random();
        }
        else {
            radians = cc.misc.degreesToRadians(angle);
        }
        var dif = cc.v2(dis + Math.floor(200 * Math.random()), 0).rotateSelf(radians);
        var pos = center.add(dif);
        if (pos.x > -exports.gameMgr.mapSize.width / 2 + 400 && pos.x < exports.gameMgr.mapSize.width / 2 - 400 &&
            pos.y < exports.gameMgr.mapSize.height / 2 - 400 && pos.y > -exports.gameMgr.mapSize.height / 2 + 400) {
            return pos;
        }
        else {
            return this.getZombieBirthPos(center, dis);
        }
    };
    GameMgr.prototype.initGame = function () {
        var _this = this;
        this.startPos = this.yaogan.getPosition();
        this.isGameStart = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
        this.moveArea.on(cc.Node.EventType.TOUCH_START, (function (event) {
            var pos = event.getLocation();
            pos = _this.node.convertToNodeSpaceAR(pos);
            _this.yaogan.setPosition(pos);
        }), this);
        this.moveArea.on(cc.Node.EventType.TOUCH_MOVE, (function (event) {
            var div = event.getLocation().sub(event.getStartLocation());
            if (div.mag() > 160) {
                div = div.mul(160 / div.mag());
            }
            _this.yaogan.children[0].setPosition(div);
            exports.gameMgr.playerTs.moveDir = div.normalize();
        }), this);
        this.moveArea.on(cc.Node.EventType.TOUCH_END, (function (event) {
            _this.yaogan.setPosition(_this.startPos);
            _this.yaogan.children[0].setPosition(cc.v2(0, 0));
            exports.gameMgr.playerTs.moveDir = cc.v2(0, 0);
        }), this);
        this.moveArea.on(cc.Node.EventType.TOUCH_CANCEL, (function (event) {
            _this.yaogan.setPosition(_this.startPos);
            _this.yaogan.children[0].setPosition(cc.v2(0, 0));
            exports.gameMgr.playerTs.moveDir = cc.v2(0, 0);
        }), this);
    };
    GameMgr.prototype.keyDown = function (event) {
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
    };
    GameMgr.prototype.keyUp = function (event) {
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
    };
    GameMgr.prototype.cameraFollow = function () {
        var pos_to = null;
        var t = 0.1;
        if (this.followNode && this.followNode.isValid) {
            pos_to = this.followNode.getPosition();
            t = 0.1;
        }
        if (pos_to) {
            var pos_from = this.mainCamereRootNode.getPosition();
            var pos_out = cc.Vec2.ZERO;
            var ratio = this.mainCamera.zoomRatio;
            var winSize = new cc.Size(cc.winSize.width / ratio, cc.winSize.height / ratio);
            if (CocosZ_1.cocosz.gameMode == 7) {
                // 无边界
            }
            else {
                // 相机边界
                if ((pos_to.x + winSize.width / 2) > exports.gameMgr.mapSize.width / 2) {
                    pos_to.x = exports.gameMgr.mapSize.width / 2 - winSize.width / 2;
                }
                else if ((pos_to.x - winSize.width / 2) < -exports.gameMgr.mapSize.width / 2) {
                    pos_to.x = -exports.gameMgr.mapSize.width / 2 + winSize.width / 2;
                }
                if ((pos_to.y + winSize.height / 2) > exports.gameMgr.mapSize.height / 2) {
                    pos_to.y = exports.gameMgr.mapSize.height / 2 - winSize.height / 2;
                }
                else if ((pos_to.y - winSize.height / 2) < -exports.gameMgr.mapSize.height / 2) {
                    pos_to.y = -exports.gameMgr.mapSize.height / 2 + winSize.height / 2;
                }
            }
            if (pos_to.sub(pos_from).mag() < 1000) {
                cc.Vec2.lerp(pos_out, pos_from, pos_to, t);
                this.mainCamereRootNode.setPosition(pos_out);
            }
            else {
                this.mainCamereRootNode.setPosition(pos_to);
                // 更新节点透明度
                exports.gameMgr.setMapTs && exports.gameMgr.setMapTs.checkAllNode();
            }
        }
    };
    GameMgr.prototype.setDir = function () {
        var moveDir = cc.v2(0, 0);
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
    };
    GameMgr.prototype.restart = function () { };
    GameMgr.prototype.useMeleeWeapon = function () { };
    GameMgr.prototype.useRangedWeapon = function () {
        this.playerTs.changeCurWeapon(this.playerTs.rangedWeapon);
    };
    GameMgr.prototype.useRangedWeaponAd = function () {
        this.playerTs.changeCurWeapon(this.playerTs.rangedWeaponAd);
    };
    GameMgr.prototype.getNewWeapon = function () {
        CocosZ_1.cocosz.audioMgr.playEffect("changeWeapon");
        this.playerTs.setNewWeapon();
    };
    GameMgr.prototype.playEffect = function (name, node, interval) {
        var _this = this;
        if (interval === void 0) { interval = 0.2; }
        if (exports.gameMgr.isWin || exports.gameMgr.isFail || CocosZ_1.cocosz.isPause)
            return;
        if (this.clipNameArr[name]) {
            return;
        }
        var voice = 1;
        if (node && node.isValid && node.parent && node.parent.isValid) {
            var pos = node.getPosition();
            pos = node.parent.convertToWorldSpaceAR(pos);
            var pos2 = this.playerTs.node.getPosition();
            pos2 = this.playerTs.node.parent.convertToWorldSpaceAR(pos2);
            var dt = pos.sub(pos2).mag();
            if (dt > 2000) {
                return;
            }
        }
        CocosZ_1.cocosz.audioMgr.playEffect(name, false, voice);
        if (interval > 0) {
            this.clipNameArr[name] = 1;
            this.scheduleOnce(function () { _this.clipNameArr[name] = 0; }, interval);
        }
    };
    GameMgr.prototype.playClip = function (clip, node, interval) {
        var _this = this;
        if (interval === void 0) { interval = 0.2; }
        if (exports.gameMgr.isWin || exports.gameMgr.isFail || CocosZ_1.cocosz.isPause)
            return;
        if (this.clipNameArr[clip.name]) {
            return;
        }
        var voice = 1;
        if (node && node.isValid && node.parent && node.parent.isValid) {
            var pos = node.getPosition();
            pos = node.parent.convertToWorldSpaceAR(pos);
            var pos2 = this.playerTs.node.getPosition();
            pos2 = this.playerTs.node.parent.convertToWorldSpaceAR(pos2);
            var dt = pos.sub(pos2).mag();
            if (dt > 2000) {
                return;
            }
        }
        CocosZ_1.cocosz.audioMgr.playClip(clip, false, voice);
        // 记录
        if (interval > 0) {
            this.clipNameArr[clip.name] = 1;
            this.scheduleOnce(function () { _this.clipNameArr[clip.name] = 0; }, interval);
        }
    };
    /** 文字提示效果 */
    GameMgr.prototype.showRoleTip = function (node, str, labelColor) {
        var _this = this;
        if (labelColor === void 0) { labelColor = cc.Color.WHITE; }
        if (node && node.isValid && this.hpTip && this.hpTip.isValid && exports.gameMgr.tipLayer) {
            var tipNode_1 = this.nodeGet("hpTip", this.hpTip);
            if (tipNode_1) {
                tipNode_1.setParent(exports.gameMgr.tipLayer);
                // 初始化
                tipNode_1.setPosition(node.x + 200 * (Math.random() - 0.5), node.y + node.height / 2);
                tipNode_1.opacity = 255;
                tipNode_1.color = labelColor;
                tipNode_1.scale = (labelColor == cc.Color.WHITE ? 1 : 1.2);
                // 字体内容
                var tipLabel = tipNode_1.getComponent(cc.Label);
                if (tipLabel) {
                    tipLabel.string = str;
                }
                // 动效
                tipNode_1.stopAllActions();
                cc.tween(tipNode_1)
                    .by(0.5, { y: 20, scale: 1, })
                    .by(0.3, { y: 10, scale: -1, opacity: -255 })
                    .call(function () { _this.nodePut("hpTip", tipNode_1); })
                    .start();
            }
        }
    };
    GameMgr.prototype.fail = function () {
        var _this = this;
        if (this.isWin || this.isFail)
            return;
        CocosZ_1.cocosz.pauseCount++;
        this.isFail = true;
        this.unscheduleAllCallbacks();
        UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.qlzc.active = true;
            cc.tween(_this.qlzc)
                .delay(0.3)
                .call(function () { _this.qlzc.getChildByName("dian").children[0].active = true; })
                .delay(0.3)
                .call(function () { _this.qlzc.getChildByName("dian").children[1].active = true; })
                .delay(0.3)
                .call(function () { _this.qlzc.getChildByName("dian").children[2].active = true; })
                .delay(0.3)
                .call(function () {
                _this.qlzc.getChildByName("dian").children[0].active = false;
                _this.qlzc.getChildByName("dian").children[1].active = false;
                _this.qlzc.getChildByName("dian").children[2].active = false;
            })
                .union()
                .repeatForever()
                .start();
        }, 2);
        this.scheduleOnce(function () {
            CocosZ_1.cocosz.gameMgr.gameFailed();
        }, 4);
    };
    GameMgr.prototype.win = function () {
        var _this = this;
        if (this.isWin || this.isFail)
            return;
        CocosZ_1.cocosz.pauseCount++;
        this.isWin = true;
        this.unscheduleAllCallbacks();
        UpgradeMgr_1.upgradeMgr && UpgradeMgr_1.upgradeMgr.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.qlzc.active = true;
            cc.tween(_this.qlzc)
                .delay(0.3)
                .call(function () { _this.qlzc.getChildByName("dian").children[0].active = true; })
                .delay(0.3)
                .call(function () { _this.qlzc.getChildByName("dian").children[1].active = true; })
                .delay(0.3)
                .call(function () { _this.qlzc.getChildByName("dian").children[2].active = true; })
                .delay(0.3)
                .call(function () {
                _this.qlzc.getChildByName("dian").children[0].active = false;
                _this.qlzc.getChildByName("dian").children[1].active = false;
                _this.qlzc.getChildByName("dian").children[2].active = false;
            })
                .union()
                .repeatForever()
                .start();
        }, 2);
        this.scheduleOnce(function () {
            CocosZ_1.cocosz.gameMgr.gameSuccess();
        }, 4);
    };
    GameMgr.prototype.revive = function () {
        this.isRevive = true;
        this.playerTs.revive();
    };
    GameMgr.prototype.shakeEffect = function (extent, times, isVibrate, vibrateType) {
        if (extent === void 0) { extent = 1; }
        if (times === void 0) { times = 1; }
        if (isVibrate === void 0) { isVibrate = true; }
        if (vibrateType === void 0) { vibrateType = YZ_Constant_1.VibrateType.Short; }
        // 镜头晃动
        var t = this._timeArr[extent];
        var dis = this._disArr[extent];
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
        if (CocosZ_1.cocosz.dataMgr.ShakeOn) {
            var t_1 = new Date().getTime();
            if (t_1 - this._vibrateTime > 500) {
                this._vibrateTime = t_1;
                isVibrate && Utils_1.utils.vibrate(vibrateType);
            }
        }
    };
    GameMgr.prototype.guideSkip = function () {
        // 新手指引跳过
    };
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "red", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "hpTip", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "effect_fire", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "effect_hit", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "itemList", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "itemEffect", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "spark", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "blood", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "testPoint", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMgr.prototype, "player", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameMgr.prototype, "jiaoyin", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "fj", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "fjTip", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "mainCamereRootNode", void 0);
    __decorate([
        property(cc.Camera)
    ], GameMgr.prototype, "mainCamera", void 0);
    GameMgr = __decorate([
        ccclass
    ], GameMgr);
    return GameMgr;
}(cc.Component));
exports.default = GameMgr;

cc._RF.pop();