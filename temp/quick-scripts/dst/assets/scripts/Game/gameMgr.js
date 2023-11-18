
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/gameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcZ2FtZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCxrREFBOEQ7QUFDOUQsMkNBQTBDO0FBRTFDLHVFQUFzRTtBQUV0RSwyQ0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsK0ZBQStGO0FBRXBGLFFBQUEsT0FBTyxHQUFZLElBQUksQ0FBQztBQUduQztJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQXM0QkM7UUFyNEJHLGlCQUFXLEdBQW9DLEVBQUUsQ0FBQTtRQTBCakQsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBRWxDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4QixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUN2QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLFlBQU0sR0FBVyxFQUFFLENBQUE7UUFFbkIsUUFBUTtRQUNSLFlBQU0sR0FBcUIsRUFBRSxDQUFBO1FBRzdCLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFHcEIsV0FBSyxHQUFjLElBQUksQ0FBQztRQUV4QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUU5QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUUzQixnQkFBVSxHQUFnQixFQUFFLENBQUM7UUFHN0IsV0FBSyxHQUFjLElBQUksQ0FBQztRQUV4QixXQUFLLEdBQWMsSUFBSSxDQUFDO1FBRXhCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsWUFB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QUUsQ0FBQyxNQUFNLENBQUM7NkNBQ087SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBDQUNJO0lBRXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MENBQ0k7SUFFeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJDQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NENBQ007SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1Q0FDQztJQUVuQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNJO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ2lCO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ1M7SUEvRVosT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQXM0QjNCO0lBQUQsY0FBQztDQXQ0QkQsQUFzNEJDLENBdDRCb0MsRUFBRSxDQUFDLFNBQVMsR0FzNEJoRDtrQkF0NEJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9VdGlsc1wiO1xyXG5pbXBvcnQgQ29uc3RhbnQsIHsgWmluZGV4TGF5ZXIgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IHVwZ3JhZGVNZ3IgfSBmcm9tIFwiLi9VcGdyYWRlTWdyXCI7XHJcbmltcG9ydCBzZXRNYXAgZnJvbSBcIi4vc2V0TWFwXCI7XHJcbmltcG9ydCB7IFZpYnJhdGVUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgWm9tYmllQmFzZSBmcm9tIFwiLi9ab21iaWVCYXNlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLy90YWc6ezA65pS75Ye76IyD5Zu077yMMTrnjqnlrrbouqvkvZPvvIwyOueOqeWutuiFv+mDqCA2LOWHj+mAn++8jDcs5q+S5Yy6IDExOuWime+8jDEyOumBk+WFt++8jDEzOuatpuWZqO+8jDE0OuiNie+8jDE1OuaIv+WtkCwxNjrnianotYTnrrEsIDE3Oua1t+awtCwgMTg65Y2H57qn5LuTLCAxOTrml5flj7B9XHJcblxyXG5leHBvcnQgbGV0IGdhbWVNZ3I6IEdhbWVNZ3IgPSBudWxsO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1nciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBub2RlUG9vbE9iajogeyBbbmFtZTogc3RyaW5nXTogY2MuTm9kZVBvb2wgfSA9IHt9XHJcblxyXG4gICAgbm9kZUdldChuYW1lOiBzdHJpbmcsIHByZWZhYjogY2MuUHJlZmFiKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8vIOWIm+W7uuaWsOeahOiKgueCueaxoFxyXG4gICAgICAgIGlmICghdGhpcy5ub2RlUG9vbE9ialtuYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVQb29sT2JqW25hbWVdID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOS7juiKgueCueaxoOS4reiOt+WPluiKgueCuVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGVQb29sT2JqW25hbWVdLnNpemUoKSkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5ub2RlUG9vbE9ialtuYW1lXS5nZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHByZWZhYiAmJiBwcmVmYWIuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6Ziy5q2i6aKE5Yi25L2T5ZKM6IqC54K55ZCN5a2X5LiN5ZCMXHJcbiAgICAgICAgaWYgKG5vZGUpIHsgbm9kZS5uYW1lID0gbmFtZTsgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgbm9kZVB1dChuYW1lOiBzdHJpbmcsIG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlUG9vbE9ialtuYW1lXSAmJiBub2RlICYmIG5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVQb29sT2JqW25hbWVdLnB1dChub2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5sb2coXCLlm57mlLblh7rplJk6IFwiLCBuYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYW5TSG93R2FtZUJhbm5lcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgdGlwTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgc2V0TWFwVHM6IHNldE1hcCA9IG51bGw7XHJcbiAgICBwbGF5ZXJUczogUGxheWVyID0gbnVsbDtcclxuXHJcbiAgICB1aUdhbWVQYWdlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIG1vdmVBcmVhOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHlhb2dhbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBCdG5CdWxsZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHBvc09iajogb2JqZWN0ID0ge31cclxuXHJcbiAgICAvLyDourLnjKvnjKvmqKHlvI9cclxuICAgIGRtbUFycjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZWQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBocFRpcDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBlZmZlY3RfZmlyZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBlZmZlY3RfaGl0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBpdGVtTGlzdDogY2MuUHJlZmFiW10gPSBbXTtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBpdGVtRWZmZWN0OiBjYy5QcmVmYWJbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBzcGFyazogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBibG9vZDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0ZXN0UG9pbnQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHBsYXllcjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBqaWFveWluOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmajogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZqVGlwOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG1haW5DYW1lcmVSb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQ2FtZXJhKVxyXG4gICAgbWFpbkNhbWVyYTogY2MuQ2FtZXJhID0gbnVsbDtcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgYXRrOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHNhZmVDZW50ZXI6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcclxuICAgIHJlZENpcmNsZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICByZWRDaXJjbGUyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8vIG1hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLy8gbWFza010bDogY2MuTWF0ZXJpYWwgPSBudWxsO1xyXG5cclxuICAgIG1hcFNpemU6IGNjLlNpemUgPSBjYy53aW5TaXplO1xyXG4gICAgbWluaU1hcFNpemU6IGNjLlNpemUgPSBudWxsOztcclxuXHJcbiAgICBidG5Ta2lsbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBidG5Ta2lsbEFkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHJhbmdlZFdlYXBvbk1lc3M6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcmFuZ2VkV2VhcG9uQWRNZXNzOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGFtbW86IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIGFtbW9BZDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIGt0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIG1vZGVsNl90b3V4aWFuZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBtb2RlbDZfYnRuU2h1eGluZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBtb2RlbDZfc2h1eGluZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBtb2RlbDZfamluZ3lhbkJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG4gICAgbW9kZWw2X2xldmVsTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIG1vZGVsNl9za2lsbFNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG4gICAgbW9kZWw2X3NraWxsU2Nyb2xsVmlld19jb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIG1vZGVsNl9za2lsbFNjcm9sbFZpZXdfaXRlbTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBtb2RlbDZfdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBtb2RlbDZfdHM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgbW9kZWw2X2Jvc3NCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIHRpbWVTdHI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgdG90YWxOdW06IG51bWJlciA9IDA7XHJcbiAgICBkZWF0aE51bTogbnVtYmVyID0gMDtcclxuICAgIHBsYXllclJhbms6IG51bWJlciA9IDE7XHJcbiAgICAvL+mAmuWFs+adoeS7tu+8miAx5Ye76LSl5omA5pyJ5pWM5Lq6IDLlh7votKVib3NzIDPmirXovr7mkqTnprvngrlcclxuICAgIHBhc3NDb25kaXRpb246IG51bWJlciA9IDE7XHJcbiAgICBib3NzTmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBtYXA6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgc3RhcnRQb2ludDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBhdGtSYW5nZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgY3VyVGltZTogbnVtYmVyID0gMDtcclxuICAgIHRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgc25vdzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBxbHpjOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgZ2FtZU1nciA9IHRoaXM7XHJcbiAgICAgICAgZ2FtZU1nci5tYWluQ2FtZXJhLnpvb21SYXRpbyA9IDAuNjU7XHJcbiAgICAgICAgY29jb3N6LnBhdXNlQ291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLm1haW5DYW1lcmVSb290Tm9kZS5zZXRDb250ZW50U2l6ZShjYy53aW5TaXplKTtcclxuICAgICAgICB0aGlzLm1haW5DYW1lcmVSb290Tm9kZS53aWR0aCArPSA1MDA7XHJcbiAgICAgICAgdGhpcy5tYWluQ2FtZXJlUm9vdE5vZGUuaGVpZ2h0ICs9IDUwMDtcclxuXHJcbiAgICAgICAgLy8g6aOe5py65Lu75Yqh5o+Q56S6XHJcbiAgICAgICAgaWYgKHRoaXMuZmpUaXApIHtcclxuICAgICAgICAgICAgaWYgKFs1LCA3XS5pbmNsdWRlcyhjb2Nvc3ouZ2FtZU1vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZqVGlwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5malRpcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5malRpcC56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfbWF4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsYXRlVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjb2Nvc3ouaXNQYXVzZSB8fCBnYW1lTWdyLmlzV2luIHx8IGdhbWVNZ3IuaXNGYWlsKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jYW1lcmFGb2xsb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UG9zKCkge1xyXG4gICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNykge1xyXG4gICAgICAgICAgICAvLyDlnZDmoIdcclxuICAgICAgICAgICAgLy8gcm9sZVBvczBcclxuICAgICAgICAgICAgbGV0IGJsdWVQb3MgPSBjYy5maW5kKCdwb3NMYXllci9ibHVlUG9zJywgZ2FtZU1nci5tYXApO1xyXG4gICAgICAgICAgICBpZiAoYmx1ZVBvcykgdGhpcy5wb3NPYmpbXCJibHVlUG9zXCJdID0gYmx1ZVBvcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAvLyByb2xlUG9zMVxyXG4gICAgICAgICAgICBsZXQgcmVkUG9zID0gY2MuZmluZCgncG9zTGF5ZXIvcmVkUG9zJywgZ2FtZU1nci5tYXApO1xyXG4gICAgICAgICAgICBpZiAocmVkUG9zKSB0aGlzLnBvc09ialtcInJlZFBvc1wiXSA9IHJlZFBvcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAvLyBwYXRoMFxyXG4gICAgICAgICAgICB0aGlzLnBvc09ialtcInBhdGhQb3MwXCJdID0gW107XHJcbiAgICAgICAgICAgIGxldCBwYXRoUG9zMCA9IGNjLmZpbmQoJ3Bvc0xheWVyL3BhdGhQb3MwJywgZ2FtZU1nci5tYXApO1xyXG4gICAgICAgICAgICBwYXRoUG9zMCAmJiBwYXRoUG9zMC5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4geyB0aGlzLnBvc09ialtcInBhdGhQb3MwXCJdLnB1c2gobm9kZS5nZXRQb3NpdGlvbigpKTsgfSk7XHJcbiAgICAgICAgICAgIC8vIHBhdGgxXHJcbiAgICAgICAgICAgIHRoaXMucG9zT2JqW1wicGF0aFBvczFcIl0gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHBhdGhQb3MxID0gY2MuZmluZCgncG9zTGF5ZXIvcGF0aFBvczEnLCBnYW1lTWdyLm1hcCk7XHJcbiAgICAgICAgICAgIHBhdGhQb3MxICYmIHBhdGhQb3MxLmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7IHRoaXMucG9zT2JqW1wicGF0aFBvczFcIl0ucHVzaChub2RlLmdldFBvc2l0aW9uKCkpOyB9KTtcclxuICAgICAgICAgICAgLy8gcGF0aDJcclxuICAgICAgICAgICAgdGhpcy5wb3NPYmpbXCJwYXRoUG9zMlwiXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcGF0aFBvczIgPSBjYy5maW5kKCdwb3NMYXllci9wYXRoUG9zMicsIGdhbWVNZ3IubWFwKTtcclxuICAgICAgICAgICAgcGF0aFBvczIgJiYgcGF0aFBvczIuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHsgdGhpcy5wb3NPYmpbXCJwYXRoUG9zMlwiXS5wdXNoKG5vZGUuZ2V0UG9zaXRpb24oKSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgLy8g5re75Yqg5o+Q56S65bGCXHJcbiAgICAgICAgdGhpcy50aXBMYXllciA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy50aXBMYXllci5uYW1lID0gXCJ0aXBMYXllclwiO1xyXG4gICAgICAgIHRoaXMudGlwTGF5ZXIuekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X3JvbGVMYWJlbDtcclxuICAgICAgICB0aGlzLnRpcExheWVyLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgdGhpcy50aXBMYXllci5zZXRQYXJlbnQoZ2FtZU1nci5tYXApO1xyXG4gICAgICAgIC8vIOWwj+WcsOWbvlxyXG4gICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNikge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHsgdGhpcy51cGRhdGVfbW9kZWw2X3NodXhpbmcoKTsgfSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdFBsYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEdhbWVUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgaXNHYW1lU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBvc0xpc3QgPSBbXTtcclxuICAgIGluaXRQbGF5ZXIoKSB7XHJcbiAgICAgICAgLy8g5YO15bC45qih5byPXHJcbiAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSA9PSA2KSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIxID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIxLnNjYWxlID0gMC42O1xyXG4gICAgICAgICAgICBwbGF5ZXIxLnNldFBvc2l0aW9uKGNjLnYyKDIwMDAsIDApLnJvdGF0ZVNlbGYoMiAqIE1hdGguUEkgKiBNYXRoLnJhbmRvbSgpKSk7XHJcbiAgICAgICAgICAgIHBsYXllcjEuc2V0UGFyZW50KHRoaXMubWFwKTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbE51bSsrO1xyXG4gICAgICAgICAgICAvLyDpo57mnLrov5DovpPnjqnlrrZcclxuICAgICAgICAgICAgdGhpcy5makVmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZqRWZmZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZqICYmIHRoaXMucGxheWVyVHMpIHtcclxuICAgICAgICAgICAgdGhpcy51aUdhbWVQYWdlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyDnjqnlrrZcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJUcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJUcy5wbGF5ZXJNZXNzLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJUcy5naEFuaU5vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIOebuOaculxyXG4gICAgICAgICAgICB0aGlzLmZvbGxvd05vZGUgPSB0aGlzLmZqO1xyXG4gICAgICAgICAgICAvLyDpo57mnLpcclxuICAgICAgICAgICAgdGhpcy5mai5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZqLnNldFBhcmVudChnYW1lTWdyLm1hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5mai56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfbWF4OyB9KVxyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zID0gY2MudjIodGhpcy5wbGF5ZXJUcy5ub2RlLngsIHRoaXMucGxheWVyVHMubm9kZS55ICsgNTAwKTtcclxuICAgICAgICAgICAgbGV0IGRpcyA9IHRhcmdldFBvcy5zdWIodGhpcy5mai5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5mai5zY2FsZVggPSBkaXMueCA8IDAgPyAtMSA6IDE7XHJcbiAgICAgICAgICAgIC8vIOWKqOeUu1xyXG4gICAgICAgICAgICBsZXQgZmpBbmkgPSB0aGlzLmZqLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIGZqQW5pLmFkZEFuaW1hdGlvbigwLCBcImFuaW1hdGlvbjBcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIOmfs+aViFxyXG4gICAgICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChcImZqXCIsIHRydWUsIDEpO1xyXG4gICAgICAgICAgICAvLyDnp7vliqhcclxuICAgICAgICAgICAgbGV0IHQgPSBkaXMubWFnKCkgLyA4MDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZmopXHJcbiAgICAgICAgICAgICAgICAudG8odCwgeyB4OiB0YXJnZXRQb3MueCwgeTogdGFyZ2V0UG9zLnkgfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24xXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5hZGRBbmltYXRpb24oMCwgXCJhbmltYXRpb24yXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5hZGRBbmltYXRpb24oMCwgXCJhbmltYXRpb240XCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5hZGRBbmltYXRpb24oMCwgXCJhbmltYXRpb241XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgyKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmakOiXj+aPkOekulxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZqVGlwKSB7IHRoaXMuZmpUaXAuYWN0aXZlID0gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZqLnpJbmRleCA9IFppbmRleExheWVyLnppbmRleF9tYXggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVHMubm9kZS56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOeOqeWutuS4i+mZjVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVHMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVHMucmlnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93Tm9kZSA9IHRoaXMucGxheWVyVHMubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclRzLm5vZGUueSArPSA2MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5ZXJUcy5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC41KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMSwgeyB5OiB0aGlzLnBsYXllclRzLm5vZGUueSAtIDYwMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVpR2FtZVBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVHMubm9kZS56SW5kZXggPSBaaW5kZXhMYXllci56aW5kZXhfcGxheWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJUcy5yaWcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVHMucGxheWVyTWVzcy5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJUcy5naEFuaU5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVHMudXBkYXRlQW5pKFwiZGFpamlfYm9keVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWIneWni+WMlua4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0R2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvY29zei5nYW1lTW9kZSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g55Sf5oiQ5YO15bC46K6h5pe2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmNyZWF0ZVpvbWJpZUNvdW50LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5qih5byP5pyJ6Zeu6aKYXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgyKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmouekluZGV4ID0gWmluZGV4TGF5ZXIuemluZGV4X21heDtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb242XCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5hZGRBbmltYXRpb24oMCwgXCJhbmltYXRpb243XCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5hZGRBbmltYXRpb24oMCwgXCJhbmltYXRpb245XCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmakFuaS5hZGRBbmltYXRpb24oMCwgXCJhbmltYXRpb24wXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgyKVxyXG4gICAgICAgICAgICAgICAgLnRvKDIsIHsgcG9zaXRpb246IGNjLnYzKGRpcy5ub3JtYWxpemUoKS5tdWxTZWxmKDIwMDApLmFkZChkaXMpKSB9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei5hdWRpb01nci5zdG9wRWZmZWN0KFwiZmpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mai5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvd0dhbWVUaW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsNl90aW1lTGFiZWwgJiYgdGhpcy5tb2RlbDZfdGltZUxhYmVsLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IHMgPSB0aGlzLkdhbWVUaW1lOy8vIOenklxyXG4gICAgICAgICAgICBsZXQgbSA9IDA7Ly8g5YiGXHJcbiAgICAgICAgICAgIGxldCBoID0gMDsvLyDlsI/ml7ZcclxuICAgICAgICAgICAgaWYgKHMgPiA2MCkge1xyXG4gICAgICAgICAgICAgICAgbSA9IE1hdGguZmxvb3IocyAvIDYwKTtcclxuICAgICAgICAgICAgICAgIHMgPSBNYXRoLmZsb29yKHMgJSA2MCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobSA+IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaCA9IE1hdGguZmxvb3IobSAvIDYwKTtcclxuICAgICAgICAgICAgICAgICAgICBtID0gTWF0aC5mbG9vcihtICUgNjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByID0gXCJcIjtcclxuICAgICAgICAgICAgciArPSAoaCA9PSAwID8gXCJcIiA6IGggKyBcIjpcIik7XHJcbiAgICAgICAgICAgIHIgKz0gKG0gPj0gMTAgPyBcIlwiICsgbSA6IFwiMFwiICsgbSk7XHJcbiAgICAgICAgICAgIHIgKz0gKHMgPj0gMTAgPyBcIjpcIiArIHMgOiBcIjowXCIgKyBzKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lU3RyID0gcjtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbDZfdGltZUxhYmVsLnN0cmluZyA9IHI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5Yi35paw6KGA5ru0XHJcbiAgICB1cGRhdGVfbW9kZWw2X3h1ZWRpKCkge1xyXG4gICAgICAgIGlmIChnYW1lTWdyLnBsYXllclRzICYmIGdhbWVNZ3IucGxheWVyVHMuaHBOdW1Ob2RlICYmIGdhbWVNZ3IucGxheWVyVHMuaHBOdW1Ob2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5ocE51bU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5ocE51bU5vZGUud2lkdGggPSBNYXRoLm1pbigyNTAsIGdhbWVNZ3IucGxheWVyVHMudG90bGVIcCAqIDUwKTtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5ocE51bU5vZGUuY2hpbGRyZW4uZm9yRWFjaCgobiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBnYW1lTWdyLnBsYXllclRzLnRvdGxlSHApIHtcclxuICAgICAgICAgICAgICAgICAgICBuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBnYW1lTWdyLnBsYXllclRzLkhQKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4uY2hpbGRyZW5bMV0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuLmNoaWxkcmVuWzFdLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDliLfmlrDlsZ7mgKdcclxuICAgIHVwZGF0ZV9tb2RlbDZfc2h1eGluZygpIHtcclxuICAgICAgICBpZiAodXBncmFkZU1nciAmJiBnYW1lTWdyICYmIGdhbWVNZ3IubW9kZWw2X3NodXhpbmcgJiYgZ2FtZU1nci5tb2RlbDZfc2h1eGluZy5pc1ZhbGlkICYmIGdhbWVNZ3IubW9kZWw2X3NodXhpbmcuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIC8vIOetiee6p1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsNl9zaHV4aW5nLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdXBncmFkZU1nci5jdXJMZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyDkvKTlrrNcclxuICAgICAgICAgICAgdGhpcy5tb2RlbDZfc2h1eGluZy5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChnYW1lTWdyLnBsYXllclRzLmF0a051bSAqIGdhbWVNZ3IucGxheWVyVHMuYXRrUmF0ZSkudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgLy8g5bCE6YCfXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWw2X3NodXhpbmcuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoZ2FtZU1nci5wbGF5ZXJUcy5hdGtTcGVlZCAqIGdhbWVNZ3IucGxheWVyVHMuYXRrU3BlZWRSYXRlKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAvLyDmjaLlvLlcclxuICAgICAgICAgICAgdGhpcy5tb2RlbDZfc2h1eGluZy5jaGlsZHJlblszXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChnYW1lTWdyLnBsYXllclRzLnJlbG9hZFNwZWVkICogZ2FtZU1nci5wbGF5ZXJUcy5yZWxvYWRSYXRlKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAvLyDlvLnlpLnlrrnph49cclxuICAgICAgICAgICAgdGhpcy5tb2RlbDZfc2h1eGluZy5jaGlsZHJlbls0XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdhbWVNZ3IucGxheWVyVHMuY3VyV2VhcG9uLmJ1bGxldE51bS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyDnp7vliqjpgJ/luqZcclxuICAgICAgICAgICAgdGhpcy5tb2RlbDZfc2h1eGluZy5jaGlsZHJlbls1XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChnYW1lTWdyLnBsYXllclRzLk1vdmVTcGVlZCAqIGdhbWVNZ3IucGxheWVyVHMuc3BlZWRSYXRlKS50b0ZpeGVkKDApO1xyXG4gICAgICAgICAgICAvLyDmi77lj5bojIPlm7RcclxuICAgICAgICAgICAgdGhpcy5tb2RlbDZfc2h1eGluZy5jaGlsZHJlbls2XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHVwZ3JhZGVNZ3IuamluZ3lhblJhbmdlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dCb3NzSHAocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsNl9ib3NzQmFyICYmIGNjLmlzVmFsaWQodGhpcy5tb2RlbDZfYm9zc0JhcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWw2X2Jvc3NCYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbDZfYm9zc0Jhci5wcm9ncmVzcyA9IHJhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWw2X2ppbmd5YW5CYXIgJiYgY2MuaXNWYWxpZCh0aGlzLm1vZGVsNl9qaW5neWFuQmFyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbDZfamluZ3lhbkJhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsNl9sZXZlbExhYmVsICYmIGNjLmlzVmFsaWQodGhpcy5tb2RlbDZfbGV2ZWxMYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWw2X2xldmVsTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsNl9ib3NzQmFyICYmIGNjLmlzVmFsaWQodGhpcy5tb2RlbDZfYm9zc0JhcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWw2X2Jvc3NCYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWw2X2Jvc3NCYXIucHJvZ3Jlc3MgPSByYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsNl9qaW5neWFuQmFyICYmIGNjLmlzVmFsaWQodGhpcy5tb2RlbDZfamluZ3lhbkJhcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWw2X2ppbmd5YW5CYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsNl9sZXZlbExhYmVsICYmIGNjLmlzVmFsaWQodGhpcy5tb2RlbDZfbGV2ZWxMYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWw2X2xldmVsTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJvc3NfYm9yZGVyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHpvbWJpZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICB6b21iaWVDdXJOdW06IG51bWJlciA9IDA7XHJcbiAgICB6b21iaWVNYXhOdW06IG51bWJlciA9IDA7XHJcbiAgICB6b21iaWVMZW5ndGg6IG51bWJlciA9IDI7XHJcbiAgICB6b21iaWVBcnIgPSBbXCJ6b21iaWVfYmFzaWNcIiwgXCJ6b21iaWVfcnVuXCIsIFwiem9tYmllX2RydW1cIiwgXCJ6b21iaWVfanVtcFwiLCBcInpvbWJpZV9ib21iXCIsIFwiem9tYmllX3RhbmtcIiwgXCJ6b21iaWVfcG9pc29uXCJdXHJcbiAgICBib3NzQXJyID0gW1wiYm9zczFcIiwgXCJib3NzMlwiLCBcImJvc3MzXCIsIFwiYm9zczRcIiwgXCJib3NzMTFcIiwgXCJib3NzNVwiLCBcImJvc3MxMlwiLCBcImJvc3M2XCIsIFwiYm9zczdcIiwgXCJib3NzOFwiLCBcImJvc3M5XCIsIFwiYm9zczEwXCIsIFwiYm9zczEzXCJdXHJcbiAgICBib3NzMkFyciA9IFtdO1xyXG4gICAgLyoqIOWIm+W7uuWDteWwuOiuoeaXtiAqL1xyXG4gICAgY3JlYXRlWm9tYmllQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKGNvY29zei5pc1BhdXNlIHx8IGdhbWVNZ3IuaXNXaW4gfHwgZ2FtZU1nci5pc0ZhaWwpIHJldHVybjtcclxuICAgICAgICAvLyDmuLjmiI/orqHml7ZcclxuICAgICAgICB0aGlzLkdhbWVUaW1lKys7XHJcbiAgICAgICAgdGhpcy5zaG93R2FtZVRpbWUoKTtcclxuICAgICAgICAvLyDnlJ/miJDpgLvovpFcclxuICAgICAgICBpZiAodGhpcy5ib3NzX2JvcmRlcikgcmV0dXJuO1xyXG4gICAgICAgIC8vIOWDteWwuOeUn+aIkOaXtumXtOiuoeaXtlxyXG4gICAgICAgIHRoaXMuem9tYmllVGltZSsrO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDE7XHJcbiAgICAgICAgLyoqIOWIm+W7ukJvc3MgKi9cclxuICAgICAgICBpZiAoMCA9PT0gdGhpcy56b21iaWVUaW1lICUgMTAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQm9zc1pvbWJpZSgpO1xyXG4gICAgICAgICAgICAvLyDmm7TmlrDmma7pgJrlg7XlsLhcclxuICAgICAgICAgICAgaWYgKHRoaXMuem9tYmllTGVuZ3RoIDwgdGhpcy56b21iaWVBcnIubGVuZ3RoKSB0aGlzLnpvbWJpZUxlbmd0aCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpKfms6Llg7XlsLhcclxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnpvbWJpZVRpbWUgJSA1MCkge1xyXG4gICAgICAgICAgICAvLyDmj5DnpLpcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWw2X3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsNl90cy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLm1vZGVsNl90cy5hY3RpdmUgPSBmYWxzZTsgfSwgMylcclxuICAgICAgICAgICAgICAgIGxldCBzcEFuaSA9IHRoaXMubW9kZWw2X3RzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBzcEFuaS5zZXRTa2luKFwic2NseF9cIiArIGNvY29zei5jdXJMYW5ndWFnZSk7XHJcbiAgICAgICAgICAgICAgICBzcEFuaS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5YO15bC45pWw6YePXHJcbiAgICAgICAgICAgIHRoaXMuem9tYmllTWF4TnVtID0gMjAgKyBNYXRoLmZsb29yKHRoaXMuem9tYmllVGltZSAvIDQwKSAqIDEwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy56b21iaWVNYXhOdW0gPiA0MCkgdGhpcy56b21iaWVNYXhOdW0gPSA0MDtcclxuICAgICAgICAgICAgLy8g5bCP5LqO5pyA5aSn5pWw6YeP57un57ut55Sf5oiQXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnpvbWJpZUN1ck51bSA8IHRoaXMuem9tYmllTWF4TnVtKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IHRoaXMuem9tYmllTWF4TnVtIC0gdGhpcy56b21iaWVDdXJOdW07XHJcbiAgICAgICAgICAgICAgICAvLyDliIbmiJBr5Lu955Sf5oiQ77yM5q+P5Lu9MTBcclxuICAgICAgICAgICAgICAgIGxldCBrID0gTWF0aC5jZWlsKGNvdW50IC8gMTApO1xyXG4gICAgICAgICAgICAgICAgLy8g5YiG5bin5Yib5bu6XHJcbiAgICAgICAgICAgICAgICBsZXQgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXI6IG51bWJlciA9IDM2O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgKz0gaW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbW9uWm9tYmllKGNjLndpblNpemUuaGVpZ2h0IC8gMi41IC8gdGhpcy5tYWluQ2FtZXJhLnpvb21SYXRpbywgYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDAuMSwgTWF0aC5jZWlsKGNvdW50IC8gayksIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOeUn+aIkOWHu+i0pWJvc3NcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYm9zczJBcnIubGVuZ3RoIC0gMTsgaSA+PSAwICYmIGkgPj0gdGhpcy5ib3NzMkFyci5sZW5ndGggLSAyOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXNOYW1lID0gdGhpcy5ib3NzMkFycltpXTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWIm+W7uuWwuOa9rmJvc3M6IFwiLCByZXNOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc05hbWUpIHsgdGhpcy5jcmVhdGVab21iaWUocmVzTmFtZSwgZ2FtZU1nci5wbGF5ZXJUcy5ub2RlLmdldFBvc2l0aW9uKCksIGNjLndpblNpemUud2lkdGggLyAyIC8gdGhpcy5tYWluQ2FtZXJhLnpvb21SYXRpbyk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlg7XlsLjnu6fnu61cclxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnpvbWJpZVRpbWUgJSA1MSB8fCAwID09PSB0aGlzLnpvbWJpZVRpbWUgJSA1MiB8fCAwID09PSB0aGlzLnpvbWJpZVRpbWUgJSA1MyB8fCAwID09PSB0aGlzLnpvbWJpZVRpbWUgJSA1NCB8fCAwID09PSB0aGlzLnpvbWJpZVRpbWUgJSA1NSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6ZqP5py65bCR6YeP5YO15bC4XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOWDteWwuOaVsOmHj1xyXG4gICAgICAgICAgICB0aGlzLnpvbWJpZU1heE51bSA9IDUgKyBNYXRoLmZsb29yKHRoaXMuem9tYmllVGltZSAvIDIwKSAqIDU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnpvbWJpZU1heE51bSA+IDIwKSB0aGlzLnpvbWJpZU1heE51bSA9IDIwO1xyXG4gICAgICAgICAgICAvLyDlsI/kuo7mnIDlpKfmlbDph4/nu6fnu63nlJ/miJBcclxuICAgICAgICAgICAgaWYgKHRoaXMuem9tYmllQ3VyTnVtIDwgdGhpcy56b21iaWVNYXhOdW0pIHtcclxuICAgICAgICAgICAgICAgIC8vIOmaj+acuuaVsOmHj1xyXG4gICAgICAgICAgICAgICAgY291bnQgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7IHRoaXMuY3JlYXRlQ29tbW9uWm9tYmllKGNjLndpblNpemUuaGVpZ2h0IC8gMi41IC8gdGhpcy5tYWluQ2FtZXJhLnpvb21SYXRpbyk7IH0sIDAuMSwgY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIOWIm+W7uuaZrumAmuWDteWwuCAqL1xyXG4gICAgY3JlYXRlQ29tbW9uWm9tYmllKGRpczogbnVtYmVyLCBhbmdsZT86IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuem9tYmllTGVuZ3RoKTtcclxuICAgICAgICBsZXQgcmVzTmFtZSA9IHRoaXMuem9tYmllQXJyW2luZGV4XTtcclxuICAgICAgICBpZiAocmVzTmFtZSkgeyB0aGlzLmNyZWF0ZVpvbWJpZShyZXNOYW1lLCBnYW1lTWdyLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKSwgZGlzLCBhbmdsZSk7IH1cclxuICAgIH1cclxuICAgIC8qKiDliJvlu7pCb3Nz5YO15bC4ICovXHJcbiAgICBjcmVhdGVCb3NzWm9tYmllKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJvc3NBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQm9zc0JvcmRlcigpO1xyXG4gICAgICAgICAgICAvLyDmj5DnpLpcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWw2X3RzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsNl90cy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLm1vZGVsNl90cy5hY3RpdmUgPSBmYWxzZTsgfSwgMylcclxuICAgICAgICAgICAgICAgIGxldCBzcEFuaSA9IHRoaXMubW9kZWw2X3RzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBzcEFuaS5zZXRTa2luKFwiYm9zc2x4X1wiICsgY29jb3N6LmN1ckxhbmd1YWdlKTtcclxuICAgICAgICAgICAgICAgIHNwQW5pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBib3NzXHJcbiAgICAgICAgICAgIGxldCByZXNOYW1lID0gdGhpcy5ib3NzQXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJQb3MgPSBnYW1lTWdyLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYm9zc19ib3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlclBvcyA9IHRoaXMuYm9zc19ib3JkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3NzMkFyci5wdXNoKHJlc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVab21iaWUocmVzTmFtZSwgY2VudGVyUG9zLCAzMDAsIG51bGwsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIOWIm+W7umJvc3PovrnnlYwgKi9cclxuICAgIGNyZWF0ZUJvc3NCb3JkZXIoKSB7XHJcbiAgICAgICAgLy8g6L6555WMXHJcbiAgICAgICAgbGV0IHByZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwiYm9zc19ib3JkZXJcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9zc19ib3JkZXIgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICB0aGlzLmJvc3NfYm9yZGVyLnNldFBvc2l0aW9uKGdhbWVNZ3IucGxheWVyVHMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYm9zc19ib3JkZXIueCAtIHRoaXMuYm9zc19ib3JkZXIud2lkdGggLyAyIDwgLWdhbWVNZ3IubWFwU2l6ZS53aWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9zc19ib3JkZXIueCA9IC1nYW1lTWdyLm1hcFNpemUud2lkdGggLyAyICsgdGhpcy5ib3NzX2JvcmRlci53aWR0aCAvIDIgKyAxMDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ib3NzX2JvcmRlci54ICsgdGhpcy5ib3NzX2JvcmRlci53aWR0aCAvIDIgPiBnYW1lTWdyLm1hcFNpemUud2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvc3NfYm9yZGVyLnggPSBnYW1lTWdyLm1hcFNpemUud2lkdGggLyAyIC0gdGhpcy5ib3NzX2JvcmRlci53aWR0aCAvIDIgLSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYm9zc19ib3JkZXIueSAtIHRoaXMuYm9zc19ib3JkZXIuaGVpZ2h0IC8gMiA8IC1nYW1lTWdyLm1hcFNpemUuaGVpZ2h0IC8gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3NzX2JvcmRlci55ID0gLWdhbWVNZ3IubWFwU2l6ZS5oZWlnaHQgLyAyICsgdGhpcy5ib3NzX2JvcmRlci5oZWlnaHQgLyAyICsgMTAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYm9zc19ib3JkZXIueSArIHRoaXMuYm9zc19ib3JkZXIuaGVpZ2h0IC8gMiA+IGdhbWVNZ3IubWFwU2l6ZS5oZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvc3NfYm9yZGVyLnkgPSBnYW1lTWdyLm1hcFNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYm9zc19ib3JkZXIuaGVpZ2h0IC8gMiAtIDMwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJvc3NfYm9yZGVyLnNldFBhcmVudCh0aGlzLm1hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIOWIm+W7uuWDteWwuCAqL1xyXG4gICAgY3JlYXRlWm9tYmllKHJlc05hbWU6IHN0cmluZywgY2VudGVyOiBjYy5WZWMyLCBkaXM6IG51bWJlciwgYW5nbGU/OiBudW1iZXIsIGlzQm9zczogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgLy8g6aKE5Yi25L2TXHJcbiAgICAgICAgbGV0IHByZWZhYiA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKHJlc05hbWUsIGNjLlByZWZhYik7XHJcbiAgICAgICAgaWYgKHByZWZhYikge1xyXG4gICAgICAgICAgICAvLyDlnZDmoIdcclxuICAgICAgICAgICAgdGhpcy5fcmVjdXJzaW9uQ291bnQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRab21iaWVCaXJ0aFBvcyhjZW50ZXIsIGRpcywgYW5nbGUpO1xyXG4gICAgICAgICAgICBpZiAocG9zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlg7XlsLhcclxuICAgICAgICAgICAgICAgIGxldCBuZXdab21iaWU6IGNjLk5vZGUgPSB0aGlzLm5vZGVHZXQocmVzTmFtZSwgcHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdab21iaWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHMgPSBuZXdab21iaWUuZ2V0Q29tcG9uZW50KFpvbWJpZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cyAmJiBpc0Jvc3MpIHsgdHMuaXNCb3NzID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1pvbWJpZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1pvbWJpZS5zZXRQYXJlbnQoZ2FtZU1nci5tYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cykgdHMuaW5pdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvY29zei5yZXNNZ3IubG9hZEFuZENhY2hlUmVzKFwicHJlZmFiX3pvbWJpZS9cIiArIHJlc05hbWUsIGNjLlByZWZhYiwgbnVsbCwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlWm9tYmllKHJlc05hbWUsIGNlbnRlciwgZGlzLCBhbmdsZSwgaXNCb3NzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiog6I635Y+W5YO15bC455Sf5oiQ5Z2Q5qCHICovXHJcbiAgICBwcml2YXRlIF9yZWN1cnNpb25Db3VudDogbnVtYmVyID0gMDtcclxuICAgIGdldFpvbWJpZUJpcnRoUG9zKGNlbnRlcjogY2MuVmVjMiwgZGlzLCBhbmdsZT86IG51bWJlcikge1xyXG4gICAgICAgIGlmICgrK3RoaXMuX3JlY3Vyc2lvbkNvdW50ID4gMTAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmFkaWFucyA9IDA7XHJcbiAgICAgICAgaWYgKGFuZ2xlID09IG51bGwgfHwgYW5nbGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJhZGlhbnMgPSAyICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmFkaWFucyA9IGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyhhbmdsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkaWYgPSBjYy52MihkaXMgKyBNYXRoLmZsb29yKDIwMCAqIE1hdGgucmFuZG9tKCkpLCAwKS5yb3RhdGVTZWxmKHJhZGlhbnMpO1xyXG4gICAgICAgIGxldCBwb3MgPSBjZW50ZXIuYWRkKGRpZik7XHJcbiAgICAgICAgaWYgKHBvcy54ID4gLWdhbWVNZ3IubWFwU2l6ZS53aWR0aCAvIDIgKyA0MDAgJiYgcG9zLnggPCBnYW1lTWdyLm1hcFNpemUud2lkdGggLyAyIC0gNDAwICYmXHJcbiAgICAgICAgICAgIHBvcy55IDwgZ2FtZU1nci5tYXBTaXplLmhlaWdodCAvIDIgLSA0MDAgJiYgcG9zLnkgPiAtZ2FtZU1nci5tYXBTaXplLmhlaWdodCAvIDIgKyA0MDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRab21iaWVCaXJ0aFBvcyhjZW50ZXIsIGRpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxhc3RUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgc2FmZVRpbWU6IG51bWJlciA9IDQwO1xyXG4gICAgc3RhcnRQb3M6IGNjLlZlYzIgPSBudWxsO1xyXG4gICAgaW5pdEdhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IHRoaXMueWFvZ2FuLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5pc0dhbWVTdGFydCA9IHRydWU7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLmtleURvd24sIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMua2V5VXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubW92ZUFyZWEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsICgoZXZlbnQ6IGNjLlRvdWNoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKTtcclxuICAgICAgICAgICAgdGhpcy55YW9nYW4uc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICB9KSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb3ZlQXJlYS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCAoKGV2ZW50OiBjYy5Ub3VjaCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGl2ID0gZXZlbnQuZ2V0TG9jYXRpb24oKS5zdWIoZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgaWYgKGRpdi5tYWcoKSA+IDE2MCkge1xyXG4gICAgICAgICAgICAgICAgZGl2ID0gZGl2Lm11bCgxNjAgLyBkaXYubWFnKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMueWFvZ2FuLmNoaWxkcmVuWzBdLnNldFBvc2l0aW9uKGRpdik7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMubW92ZURpciA9IGRpdi5ub3JtYWxpemUoKTtcclxuICAgICAgICB9KSwgdGhpcylcclxuICAgICAgICB0aGlzLm1vdmVBcmVhLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKChldmVudDogY2MuVG91Y2gpID0+IHtcclxuICAgICAgICAgICAgdGhpcy55YW9nYW4uc2V0UG9zaXRpb24odGhpcy5zdGFydFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMueWFvZ2FuLmNoaWxkcmVuWzBdLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgZ2FtZU1nci5wbGF5ZXJUcy5tb3ZlRGlyID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgfSksIHRoaXMpXHJcbiAgICAgICAgdGhpcy5tb3ZlQXJlYS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsICgoZXZlbnQ6IGNjLlRvdWNoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMueWFvZ2FuLnNldFBvc2l0aW9uKHRoaXMuc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICB0aGlzLnlhb2dhbi5jaGlsZHJlblswXS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgIGdhbWVNZ3IucGxheWVyVHMubW92ZURpciA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIH0pLCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIGlzVXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNMZWZ0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBrZXlEb3duKGV2ZW50OiBjYy5FdmVudC5FdmVudEtleWJvYXJkKSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgODc6IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA4Mzoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA2NToge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA2ODoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBrZXlVcChldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIDg3OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDgzOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREaXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNjU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA2ODoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9sbG93Tm9kZTogY2MuTm9kZTtcclxuICAgIGlzUHJlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGNhbWVyYUZvbGxvdygpIHtcclxuICAgICAgICBsZXQgcG9zX3RvID0gbnVsbDtcclxuICAgICAgICBsZXQgdCA9IDAuMTtcclxuICAgICAgICBpZiAodGhpcy5mb2xsb3dOb2RlICYmIHRoaXMuZm9sbG93Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHBvc190byA9IHRoaXMuZm9sbG93Tm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0ID0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zX3RvKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3NfZnJvbSA9IHRoaXMubWFpbkNhbWVyZVJvb3ROb2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIGxldCBwb3Nfb3V0ID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgICAgICBsZXQgcmF0aW8gPSB0aGlzLm1haW5DYW1lcmEuem9vbVJhdGlvO1xyXG4gICAgICAgICAgICBsZXQgd2luU2l6ZSA9IG5ldyBjYy5TaXplKGNjLndpblNpemUud2lkdGggLyByYXRpbywgY2Mud2luU2l6ZS5oZWlnaHQgLyByYXRpbyk7XHJcbiAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgLy8g5peg6L6555WMXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDnm7jmnLrovrnnlYxcclxuICAgICAgICAgICAgICAgIGlmICgocG9zX3RvLnggKyB3aW5TaXplLndpZHRoIC8gMikgPiBnYW1lTWdyLm1hcFNpemUud2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zX3RvLnggPSBnYW1lTWdyLm1hcFNpemUud2lkdGggLyAyIC0gd2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChwb3NfdG8ueCAtIHdpblNpemUud2lkdGggLyAyKSA8IC1nYW1lTWdyLm1hcFNpemUud2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zX3RvLnggPSAtZ2FtZU1nci5tYXBTaXplLndpZHRoIC8gMiArIHdpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChwb3NfdG8ueSArIHdpblNpemUuaGVpZ2h0IC8gMikgPiBnYW1lTWdyLm1hcFNpemUuaGVpZ2h0IC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc190by55ID0gZ2FtZU1nci5tYXBTaXplLmhlaWdodCAvIDIgLSB3aW5TaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChwb3NfdG8ueSAtIHdpblNpemUuaGVpZ2h0IC8gMikgPCAtZ2FtZU1nci5tYXBTaXplLmhlaWdodCAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NfdG8ueSA9IC1nYW1lTWdyLm1hcFNpemUuaGVpZ2h0IC8gMiArIHdpblNpemUuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9zX3RvLnN1Yihwb3NfZnJvbSkubWFnKCkgPCAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5WZWMyLmxlcnAocG9zX291dCwgcG9zX2Zyb20sIHBvc190bywgdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5DYW1lcmVSb290Tm9kZS5zZXRQb3NpdGlvbihwb3Nfb3V0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbkNhbWVyZVJvb3ROb2RlLnNldFBvc2l0aW9uKHBvc190byk7XHJcbiAgICAgICAgICAgICAgICAvLyDmm7TmlrDoioLngrnpgI/mmI7luqZcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3Iuc2V0TWFwVHMgJiYgZ2FtZU1nci5zZXRNYXBUcy5jaGVja0FsbE5vZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXREaXIoKSB7XHJcbiAgICAgICAgbGV0IG1vdmVEaXIgPSBjYy52MigwLCAwKTtcclxuICAgICAgICBpZiAodGhpcy5pc1VwKSB7XHJcbiAgICAgICAgICAgIG1vdmVEaXIueSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0xlZnQpIHtcclxuICAgICAgICAgICAgbW92ZURpci54LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzUmlnaHQpIHtcclxuICAgICAgICAgICAgbW92ZURpci54Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRG93bikge1xyXG4gICAgICAgICAgICBtb3ZlRGlyLnktLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJUcy5tb3ZlRGlyID0gbW92ZURpci5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0YXJ0KCkgeyB9XHJcblxyXG4gICAgdXNlTWVsZWVXZWFwb24oKSB7IH1cclxuXHJcbiAgICB1c2VSYW5nZWRXZWFwb24oKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJUcy5jaGFuZ2VDdXJXZWFwb24odGhpcy5wbGF5ZXJUcy5yYW5nZWRXZWFwb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZVJhbmdlZFdlYXBvbkFkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyVHMuY2hhbmdlQ3VyV2VhcG9uKHRoaXMucGxheWVyVHMucmFuZ2VkV2VhcG9uQWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5ld1dlYXBvbigpIHtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChcImNoYW5nZVdlYXBvblwiKTtcclxuICAgICAgICB0aGlzLnBsYXllclRzLnNldE5ld1dlYXBvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjbGlwTmFtZUFycjogYW55ID0ge307XHJcbiAgICBwbGF5RWZmZWN0KG5hbWU6IHN0cmluZywgbm9kZT86IGNjLk5vZGUsIGludGVydmFsOiBudW1iZXIgPSAwLjIpIHtcclxuICAgICAgICBpZiAoZ2FtZU1nci5pc1dpbiB8fCBnYW1lTWdyLmlzRmFpbCB8fCBjb2Nvc3ouaXNQYXVzZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaXBOYW1lQXJyW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZvaWNlID0gMTtcclxuICAgICAgICBpZiAobm9kZSAmJiBub2RlLmlzVmFsaWQgJiYgbm9kZS5wYXJlbnQgJiYgbm9kZS5wYXJlbnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gbm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBwb3MgPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocG9zKTtcclxuICAgICAgICAgICAgbGV0IHBvczIgPSB0aGlzLnBsYXllclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgcG9zMiA9IHRoaXMucGxheWVyVHMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBvczIpO1xyXG4gICAgICAgICAgICBsZXQgZHQgPSBwb3Muc3ViKHBvczIpLm1hZygpO1xyXG4gICAgICAgICAgICBpZiAoZHQgPiAyMDAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChuYW1lLCBmYWxzZSwgdm9pY2UpO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlwTmFtZUFycltuYW1lXSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5jbGlwTmFtZUFycltuYW1lXSA9IDA7IH0sIGludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwbGF5Q2xpcChjbGlwOiBjYy5BdWRpb0NsaXAsIG5vZGU6IGNjLk5vZGUsIGludGVydmFsOiBudW1iZXIgPSAwLjIpIHtcclxuICAgICAgICBpZiAoZ2FtZU1nci5pc1dpbiB8fCBnYW1lTWdyLmlzRmFpbCB8fCBjb2Nvc3ouaXNQYXVzZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaXBOYW1lQXJyW2NsaXAubmFtZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdm9pY2UgPSAxO1xyXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuaXNWYWxpZCAmJiBub2RlLnBhcmVudCAmJiBub2RlLnBhcmVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHBvcyA9IG5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwb3MpO1xyXG4gICAgICAgICAgICBsZXQgcG9zMiA9IHRoaXMucGxheWVyVHMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBwb3MyID0gdGhpcy5wbGF5ZXJUcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocG9zMik7XHJcbiAgICAgICAgICAgIGxldCBkdCA9IHBvcy5zdWIocG9zMikubWFnKCk7XHJcbiAgICAgICAgICAgIGlmIChkdCA+IDIwMDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5Q2xpcChjbGlwLCBmYWxzZSwgdm9pY2UpO1xyXG4gICAgICAgIC8vIOiusOW9lVxyXG4gICAgICAgIGlmIChpbnRlcnZhbCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlwTmFtZUFycltjbGlwLm5hbWVdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLmNsaXBOYW1lQXJyW2NsaXAubmFtZV0gPSAwOyB9LCBpbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmloflrZfmj5DnpLrmlYjmnpwgKi9cclxuICAgIHNob3dSb2xlVGlwKG5vZGU6IGNjLk5vZGUsIHN0cjogc3RyaW5nLCBsYWJlbENvbG9yOiBjYy5Db2xvciA9IGNjLkNvbG9yLldISVRFKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5pc1ZhbGlkICYmIHRoaXMuaHBUaXAgJiYgdGhpcy5ocFRpcC5pc1ZhbGlkICYmIGdhbWVNZ3IudGlwTGF5ZXIpIHtcclxuICAgICAgICAgICAgbGV0IHRpcE5vZGUgPSB0aGlzLm5vZGVHZXQoXCJocFRpcFwiLCB0aGlzLmhwVGlwKTtcclxuICAgICAgICAgICAgaWYgKHRpcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRpcE5vZGUuc2V0UGFyZW50KGdhbWVNZ3IudGlwTGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8g5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICB0aXBOb2RlLnNldFBvc2l0aW9uKG5vZGUueCArIDIwMCAqIChNYXRoLnJhbmRvbSgpIC0gMC41KSwgbm9kZS55ICsgbm9kZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgICAgIHRpcE5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIHRpcE5vZGUuY29sb3IgPSBsYWJlbENvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGlwTm9kZS5zY2FsZSA9IChsYWJlbENvbG9yID09IGNjLkNvbG9yLldISVRFID8gMSA6IDEuMik7XHJcbiAgICAgICAgICAgICAgICAvLyDlrZfkvZPlhoXlrrlcclxuICAgICAgICAgICAgICAgIGxldCB0aXBMYWJlbCA9IHRpcE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aXBMYWJlbCkgeyB0aXBMYWJlbC5zdHJpbmcgPSBzdHI7IH1cclxuICAgICAgICAgICAgICAgIC8vIOWKqOaViFxyXG4gICAgICAgICAgICAgICAgdGlwTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGlwTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAuYnkoMC41LCB7IHk6IDIwLCBzY2FsZTogMSwgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYnkoMC4zLCB7IHk6IDEwLCBzY2FsZTogLTEsIG9wYWNpdHk6IC0yNTUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMubm9kZVB1dChcImhwVGlwXCIsIHRpcE5vZGUpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRmFpbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZmFpbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1dpbiB8fCB0aGlzLmlzRmFpbCkgcmV0dXJuO1xyXG4gICAgICAgIGNvY29zei5wYXVzZUNvdW50Kys7XHJcbiAgICAgICAgdGhpcy5pc0ZhaWwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHVwZ3JhZGVNZ3IgJiYgdXBncmFkZU1nci51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnFsemMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5xbHpjKVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5xbHpjLmdldENoaWxkQnlOYW1lKFwiZGlhblwiKS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkoMC4zKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyB0aGlzLnFsemMuZ2V0Q2hpbGRCeU5hbWUoXCJkaWFuXCIpLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgwLjMpXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMucWx6Yy5nZXRDaGlsZEJ5TmFtZShcImRpYW5cIikuY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnFsemMuZ2V0Q2hpbGRCeU5hbWUoXCJkaWFuXCIpLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucWx6Yy5nZXRDaGlsZEJ5TmFtZShcImRpYW5cIikuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xbHpjLmdldENoaWxkQnlOYW1lKFwiZGlhblwiKS5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfSwgMilcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvY29zei5nYW1lTWdyLmdhbWVGYWlsZWQoKTtcclxuICAgICAgICB9LCA0KVxyXG4gICAgfVxyXG5cclxuICAgIGlzV2luOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB3aW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNXaW4gfHwgdGhpcy5pc0ZhaWwpIHJldHVybjtcclxuICAgICAgICBjb2Nvc3oucGF1c2VDb3VudCsrO1xyXG4gICAgICAgIHRoaXMuaXNXaW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHVwZ3JhZGVNZ3IgJiYgdXBncmFkZU1nci51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnFsemMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5xbHpjKVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5xbHpjLmdldENoaWxkQnlOYW1lKFwiZGlhblwiKS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkoMC4zKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyB0aGlzLnFsemMuZ2V0Q2hpbGRCeU5hbWUoXCJkaWFuXCIpLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgwLjMpXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IHRoaXMucWx6Yy5nZXRDaGlsZEJ5TmFtZShcImRpYW5cIikuY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnFsemMuZ2V0Q2hpbGRCeU5hbWUoXCJkaWFuXCIpLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucWx6Yy5nZXRDaGlsZEJ5TmFtZShcImRpYW5cIikuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xbHpjLmdldENoaWxkQnlOYW1lKFwiZGlhblwiKS5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfSwgMilcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvY29zei5nYW1lTWdyLmdhbWVTdWNjZXNzKCk7XHJcbiAgICAgICAgfSwgNClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXNSZXZpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJldml2ZSgpIHtcclxuICAgICAgICB0aGlzLmlzUmV2aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBsYXllclRzLnJldml2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDpnIflsY9cclxuICAgICogQHBhcmFtIGRpcyDojIPlm7RcclxuICAgICogQHBhcmFtIHRpbWVzIOasoeaVsFxyXG4gICAgKiBAcGFyYW0gaXNWaWJyYXRlIOaYr+WQpumch+WKqFxyXG4gICAgKiBAcmV0dXJucyBcclxuICAgICovXHJcbiAgICBwcml2YXRlIF90aW1lQXJyID0gWzAsIDAuMDQsIDAuMDUsIDAuMDYsIDAuMDddO1xyXG4gICAgcHJpdmF0ZSBfZGlzQXJyID0gWzAsIDMsIDEwLCAyMCwgMzBdO1xyXG4gICAgcHJpdmF0ZSBfdmlicmF0ZVRpbWU6IG51bWJlciA9IDA7Ly8g6ZyH5Yqo5pe26Ze0XHJcbiAgICBwdWJsaWMgc2hha2VFZmZlY3QoZXh0ZW50OiAwIHwgMSB8IDIgfCAzIHwgNCA9IDEsIHRpbWVzOiBudW1iZXIgPSAxLCBpc1ZpYnJhdGU6IGJvb2xlYW4gPSB0cnVlLCB2aWJyYXRlVHlwZTogVmlicmF0ZVR5cGUgPSBWaWJyYXRlVHlwZS5TaG9ydCkge1xyXG4gICAgICAgIC8vIOmVnOWktOaZg+WKqFxyXG4gICAgICAgIGxldCB0ID0gdGhpcy5fdGltZUFycltleHRlbnRdO1xyXG4gICAgICAgIGxldCBkaXMgPSB0aGlzLl9kaXNBcnJbZXh0ZW50XTtcclxuICAgICAgICBpZiAoZXh0ZW50ID4gMCAmJiB0aW1lcyA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ2FtZXJhLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ2FtZXJhLm5vZGUuc2V0UG9zaXRpb24oMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubWFpbkNhbWVyYS5ub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKHQsIHsgcG9zaXRpb246IGNjLnYzKGRpcywgZGlzKSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKHQsIHsgcG9zaXRpb246IGNjLnYzKDAsIC1kaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAudG8odCwgeyBwb3NpdGlvbjogY2MudjMoLWRpcywgZGlzKSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKHQsIHsgcG9zaXRpb246IGNjLnYzKC1kaXMsIC1kaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAudG8odCwgeyBwb3NpdGlvbjogY2MudjMoMCwgZGlzKSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKHQsIHsgcG9zaXRpb246IGNjLnYzKDAsIDApIH0pXHJcbiAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgLnJlcGVhdCh0aW1lcylcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDpnIfliqgs6Ze06ZqUMeenklxyXG4gICAgICAgIGlmIChjb2Nvc3ouZGF0YU1nci5TaGFrZU9uKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGlmICh0IC0gdGhpcy5fdmlicmF0ZVRpbWUgPiA1MDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpYnJhdGVUaW1lID0gdDtcclxuICAgICAgICAgICAgICAgIGlzVmlicmF0ZSAmJiB1dGlscy52aWJyYXRlKHZpYnJhdGVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBndWlkZVNraXAoKSB7XHJcbiAgICAgICAgLy8g5paw5omL5oyH5byV6Lez6L+HXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==