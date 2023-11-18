import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import { cocosz } from "../Framework/CocosZ";
import { PanelName, ZindexLayer } from "../Framework/Constant";
import GameDate from "./gameDate";
import { gameMgr } from "./gameMgr";
import Weapon, { WeaponType } from "./weapon";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class Person extends cc.Component {
    // 光环特效
    ghAniNode: cc.Node = null;
    // 烟尘动画节点
    ycAniNode: cc.Node = null;

    personAtk: number = 0;
    playerName: string = "";
    personLevel: number = 0;
    atkNum: number = 40;
    atkRange: number = 800;
    atkSpeed: number = 4;
    reloadSpeed: number = 2;
    totleHp: number = 300;
    curHp: number = 300;

    atkRate: number = 1;
    speedRate: number = 1;
    atkSpeedRate: number = 1;
    reloadRate: number = 1;
    bulletRate: number = 1;
    meleeAtkRate: number = 1;
    damageReduction: number = 0;

    recoverItemNum: number = 0;
    killNum: number = 0;
    curKillNum: number = 0;

    MoveSpeed: number = 600;
    moveDir: cc.Vec2 = cc.v2(0, 0);
    atkDir: cc.Vec2 = cc.v2(0, 0);

    footNum: number = 0;
    lastPos: cc.Vec2 = cc.v2(0, 0);

    // 开关
    public canMove: boolean = true;//能否移动
    public canMoveDir: boolean = true;//能否改变移动方向

    // 检测范围
    detectRange: number = 1000;

    @property(cc.Material)
    mat_common: cc.Material = null;
    @property(cc.Material)
    mat_attacked: cc.Material = null;


    // onLoad () {}
    @property(cc.Node)
    body: cc.Node = null;
    @property(cc.Node)
    leg: cc.Node = null;
    @property(cc.Node)
    leg_back: cc.Node = null;
    @property(cc.Node)
    head: cc.Node = null;
    @property(cc.ProgressBar)
    hpBar: cc.ProgressBar = null;
    @property(cc.Node)
    hpSpr: cc.Node = null;
    @property(cc.ProgressBar)
    shieldBar: cc.ProgressBar = null;
    @property(cc.ProgressBar)
    atkBar: cc.ProgressBar = null;

    head_atk: cc.Node = null;
    head_hart: cc.Node = null;
    head_death: cc.Node = null;

    playerMess: cc.Node = null;
    ani: cc.Animation = null;

    id: number = 0;//1玩家
    isPlayer: boolean = false;
    atkTarget: cc.Node = null;

    weapon: cc.Node = null;
    weapon_dao: cc.Node = null;

    hpNumNode: cc.Node = null;

    get HP() {
        return this.curHp;
    }
    set HP(num) {
        num = Math.floor(num);
        if (num < 0) num = 0;
        else if (num > this.totleHp) num = this.totleHp;
        this.curHp = num;

        // 血条
        if (this.hpBar && this.hpBar.isValid) {
            this.hpBar.progress = this.curHp / this.totleHp;
        }
        // 主动使用道具
        if (this.isPlayer) {
            if (cocosz.gameMode == 6) {
                gameMgr.update_model6_xuedi();
            }
        }
    }
    _shield: number = 0;
    maxShield: number = 100;
    get Shiled() {
        return this._shield;
    }
    set Shiled(num) {
        cc.Tween.stopAllByTarget(this.shieldBar);
        this._shield = num;
        if (this._shield < 0) {
            this._shield = 0;
            this.shieldBar.node.opacity = 0;
            this.body.getChildByName("body").children[0].active = false;
        }
        else {
            this.shieldBar.node.opacity = 255;
        }
        cc.tween(this.shieldBar).to(0.3, { progress: this._shield / this.maxShield }).start();
    }

    rig: cc.RigidBody = null;

    protected onLoad(): void { }

    protected start(): void {
        // 人物信息
        if (this.playerMess && this.playerMess.isValid) {
            this._playerMessY = this.playerMess.y;
            this.playerMess.setParent(this.node.parent);
            this.playerMess.zIndex = ZindexLayer.zindex_hp;
            this.updateMess();
        } else if (this.hpBar && this.hpBar.isValid) {
            this._playerMessY = this.hpBar.node.y;
            this.hpBar.node.setParent(this.node.parent);
            this.hpBar.node.zIndex = ZindexLayer.zindex_hp;
            this.updateMess();
        }
    }

    curTime: number = 0;
    update(dt) { }
    lateUpdate(dt) { }

    protected _playerMessY: number = 200;
    /** 人物信息 */
    protected updateMess() {
        if (this.playerMess && this.playerMess.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP) {
                this.playerMess.active = true;
                this.playerMess.setPosition(this.node.x, this.node.y + this._playerMessY);
            } else {
                this.playerMess.active = false;
            }
        } else if (this.hpBar && this.hpBar.isValid && this.hpBar.node && this.hpBar.node.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP) {
                this.hpBar.node.active = true;
                this.hpBar.node.setPosition(this.node.x, this.node.y + this._playerMessY);
            } else {
                this.hpBar.node.active = false;
            }
        }
    }

    /** 光环 */
    protected updateGhAni() {
        if (this.ghAniNode && this.ghAniNode.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP) {
                this.ghAniNode.active = true;
                this.ghAniNode.angle = this.node.angle;
                this.ghAniNode.setPosition(this.node.x, this.node.y - 90);
            } else {
                this.ghAniNode.active = false;
            }
        }
    }

    /** 烟尘 */
    protected updateYcAni() {
        if (this.ycAniNode && this.ycAniNode.isValid) {
            if (this.node && this.node.isValid && this.node.active && this.node.opacity && this.HP && !this.moveDir.equals(cc.Vec2.ZERO)) {
                this.ycAniNode.active = true;
                this.ycAniNode.setPosition(this.node.x, this.node.y - 50);
                this.ycAniNode.scaleX = this.moveDir.x > 0 ? 1 : -1;
            } else {
                this.ycAniNode.active = false;
            }
        }
    }

    isReady: boolean = false;
    curSkin: number = 0;
    setProperty() {
        this.ani = this.body.getComponent(cc.Animation);
        this.node.getComponent(cc.CircleCollider).radius = this.detectRange;
        if (this.isPlayer) this.atkRange = 1000;

        this.personLevel = Math.floor(Math.random() * 6);
        let num1 = Weapon.meleeWaapon[Math.floor(Math.random() * Weapon.meleeWaapon.length)];
        let num2 = Weapon.rangeWeapon[Math.floor(Math.random() * 13/* Weapon.rangedWeapon.length */)];
        if (this.isPlayer) {
            num1 = cocosz.dataMgr.CurMelee + 1;
            num2 = cocosz.dataMgr.CurRange + 1;
            if (cocosz.gameMgr.gameCtr.curUseSkinId < 0) {
                this.curSkin = cocosz.dataMgr.CurSkinId;
            } else {
                this.curSkin = cocosz.gameMgr.gameCtr.curUseSkinId;
            }
            this.head.children[0].children[this.curSkin].active = true;
            let head1 = this.head.children[0].children[this.curSkin];
            this.head.children[1].children[this.curSkin].active = true;
            let head2 = this.head.children[1].children[this.curSkin];
            for (let i = this.head.children[0].childrenCount - 1; i >= 0; i--) {
                if (this.head.children[0].children[i].uuid != head1.uuid) {
                    this.head.children[0].children[i].destroy();
                }
            }
            for (let i = this.head.children[1].childrenCount - 1; i >= 0; i--) {
                if (this.head.children[1].children[i].uuid != head2.uuid) {
                    this.head.children[1].children[i].destroy();
                }
            }
            // 表情(父节点设置为正脸)
            this.head_atk = this.head.children[2].children[this.curSkin];
            this.head_atk.active = true;
            this.head_atk.opacity = 0;
            this.head_hart = this.head.children[3].children[this.curSkin];
            this.head_hart.active = true;
            this.head_hart.opacity = 0;
            this.head_death = this.head.children[4].children[this.curSkin];
            this.head_death.active = true;
            this.head_death.opacity = 0;

            this.head_atk.setParent(this.head.children[0]);
            this.head_hart.setParent(this.head.children[0]);
            this.head_death.setParent(this.head.children[0]);
            this.head_atk.zIndex = 1;
            this.head_hart.zIndex = 2;
            this.head_death.zIndex = 3;
            // 删除多余表情
            this.head.children[2].destroy();
            this.head.children[3].destroy();
            this.head.children[4].destroy();

            this.personLevel = cocosz.dataMgr.getSkinInfo(this.curSkin).Level;
            this.personAtk = GameDate.SkinMess[`${this.curSkin + 1}`].atk[this.personLevel];
            if (cocosz.gameMode == 6) {
                this.totleHp = GameDate.SkinMess[`${this.curSkin + 1}`].xuedi;
            } else {
                this.totleHp = GameDate.SkinMess[`${this.curSkin + 1}`].hp[this.personLevel];
            }
            // 玩家血量增加
            if ([1, 2, 4].includes(cocosz.gameMode)) {
                this.totleHp *= 4;
            }
            else if (3 == cocosz.gameMode) {
                if (cocosz.curLevel >= 15) {
                    this.totleHp *= 9;
                } else if (cocosz.curLevel >= 10) {
                    this.totleHp *= 8;
                } else if (cocosz.curLevel >= 5) {
                    this.totleHp *= 6;
                } else {
                    this.totleHp *= 4;
                }
            }
            else if (5 == cocosz.gameMode) {
                this.totleHp *= 6;
            }
            else if (7 == cocosz.gameMode) {
                this.totleHp *= 3;
            }
            this.HP = this.totleHp;
        }
        else { }
        // 初始武器
        if (cocosz.gameMode == 4) {
            if (this.isPlayer) {
                this.setNewWeapon(14 - 1);// 玩家固定木棒
            } else {
                this.setNewWeapon(num1 - 1);// 敌人随机近战武器
            }
            this.changeCurWeapon(this.meleeWeapon, false);
        } else {
            if (cocosz.gameMode === 7) {
                this.setNewWeapon(num2 - 1);
            }
            else {
                this.setNewWeapon(num1 - 1);
                this.setNewWeapon(num2 - 1);
            }
            this.changeCurWeapon(this.rangedWeapon, false);
            // 广告远程武器
            if (this.isPlayer /* && cocosz.isShowAd */) {
                cc.tween(gameMgr.rangedWeaponAdMess)
                    .call(() => {
                        this.refreshWeaponAd();
                    })
                    .delay(10)
                    .union()
                    .repeatForever()
                    .start();
            }
        }
        // 血条
        if (cocosz.gameMode == 6) {
            this.hpBar.node.active = false;
            this.atkBar.node.active = false;
        }
        // 角色速度
        this.MoveSpeed = 200 + GameDate.SkinMess[`${this.curSkin + 1}`].speed[this.personLevel];
        if (PlatUtils.IsOPPO) { this.MoveSpeed /= 2; }
        // 光环
        if (this.personLevel > 0) {
            this.ghAniNode.color = cc.Color.WHITE;
            let arr = ["", "y", "p", "r"];
            let ghAni = this.ghAniNode.getComponent(sp.Skeleton);
            if (ghAni) {
                ghAni.setSkin(arr[Math.ceil(this.personLevel / 2)]);
            }
        } else {
            this.ghAniNode.color = cc.Color.BLACK;
            let ghAni = this.ghAniNode.getComponent(sp.Skeleton);
            ghAni.setSkin("r");
            ghAni.setAnimation(0, "animation", true);
        }

        if (!this.playerName) {
            this.playerName = i18n.t("game.player") + this.id;
        }
        let name = this.playerMess.getChildByName("nameLabel");
        if (name) name.active = false;

        this.lastPos = this.node.getPosition();
        this.isReady = true;
    }

    /** 视频武器 */
    weaponAdArr = [9, 10, 14, 17, 18];
    weaponAdIndex: number = Math.floor(Math.random() * this.weaponAdArr.length);
    refreshWeaponAd() {
        if (cocosz.isPause || !this.isPlayer) { return; }
        if (++this.weaponAdIndex >= this.weaponAdArr.length) {
            this.weaponAdIndex = 0;
        }
        let weaponNum = this.weaponAdArr[this.weaponAdIndex];
        let str = Weapon.WeaponName[weaponNum];
        let prefab = cocosz.resMgr.getRes("weapon_" + str, cc.Prefab);
        let new_weapon = cc.instantiate(prefab);
        let new_weaponTs: Weapon = new_weapon.getComponent(Weapon);
        // 初始化
        new_weaponTs.person = this;
        this.body.addChild(new_weapon);
        new_weapon.active = false;
        new_weaponTs.weaponType = WeaponType.weapon_rangeAd;
        this.rangedWeaponAd && this.rangedWeaponAd.destroy();
        this.rangedWeaponAd = new_weapon;
        this.rangedWeaponAdNum = new_weaponTs.weaponNum;

        let str2 = "w_" + Weapon.WeaponName[this.rangedWeaponAdNum - 1];
        let spr2 = cocosz.resMgr.getRes(str2, cc.SpriteFrame);
        gameMgr.rangedWeaponAdMess.children[3].getComponent(cc.Sprite).spriteFrame = spr2;
        gameMgr.rangedWeaponAdMess.children[4].getComponent(cc.Sprite).spriteFrame = cocosz.resMgr.getRes("w_" + (weaponNum + 1), cc.SpriteFrame);
        gameMgr.rangedWeaponAdMess.children[5].getComponent(cc.Label).string = new_weaponTs.atkNum.toString();
        new_weaponTs.setBulletUI();
    }

    meleeWeaponNum: number = 3;
    rangedWeaponNum: number = 1;
    rangedWeaponAdNum: number = 1;
    meleeWeapon: cc.Node = null;
    rangedWeapon: cc.Node = null;
    rangedWeaponAd: cc.Node = null;
    curWeapon: Weapon = null;
    startPosNode: cc.Node = null;
    setNewWeapon(weaponNum: number = this.newWeapon) {
        if (weaponNum < 0) return;
        let str = Weapon.WeaponName[weaponNum];
        let prefab = cocosz.resMgr.getRes("weapon_" + str, cc.Prefab);
        let new_weapon = cc.instantiate(prefab);
        let new_weaponTs: Weapon = new_weapon.getComponent(Weapon);
        new_weaponTs.person = this;
        this.body.addChild(new_weapon);
        new_weapon.active = false;
        if (new_weaponTs.isRangeWeapon) {
            if (this.curWeapon && this.curWeapon.weaponType == WeaponType.weapon_rangeAd) {
                // 设置广告远程
                new_weaponTs.weaponType = WeaponType.weapon_rangeAd;
                this.rangedWeaponAd && this.rangedWeaponAd.destroy();
                this.rangedWeaponAd = new_weapon;
                this.rangedWeaponAdNum = new_weaponTs.weaponNum;
                if (this.isPlayer) {
                    let str2 = "w_" + Weapon.WeaponName[this.rangedWeaponAdNum - 1];
                    let spr2 = cocosz.resMgr.getRes(str2, cc.SpriteFrame);
                    gameMgr.rangedWeaponAdMess.children[3].getComponent(cc.Sprite).spriteFrame = spr2;
                    gameMgr.rangedWeaponAdMess.children[4].getComponent(cc.Sprite).spriteFrame = cocosz.resMgr.getRes("w_" + (weaponNum + 1), cc.SpriteFrame);
                    gameMgr.rangedWeaponAdMess.children[5].getComponent(cc.Label).string = new_weaponTs.atkNum.toString();
                    new_weaponTs.setBulletUI();
                }
            } else {
                // 设置远程
                new_weaponTs.weaponType = WeaponType.weapon_range;
                this.rangedWeapon && this.rangedWeapon.destroy();
                this.rangedWeapon = new_weapon;
                this.rangedWeaponNum = new_weaponTs.weaponNum;
                if (this.isPlayer) {
                    let str2 = "w_" + Weapon.WeaponName[this.rangedWeaponNum - 1];
                    let spr2 = cocosz.resMgr.getRes(str2, cc.SpriteFrame);
                    gameMgr.rangedWeaponMess.children[3].getComponent(cc.Sprite).spriteFrame = spr2;
                    gameMgr.rangedWeaponMess.children[4].getComponent(cc.Sprite).spriteFrame = cocosz.resMgr.getRes("w_" + (weaponNum + 1), cc.SpriteFrame);
                    gameMgr.rangedWeaponMess.children[5].getComponent(cc.Label).string = new_weaponTs.atkNum.toString();
                    new_weaponTs.setBulletUI();
                }
            }
        }
        else {
            // 设置近战
            new_weaponTs.weaponType = WeaponType.weapon_melee;
            this.meleeWeapon && this.meleeWeapon.destroy();
            this.meleeWeapon = new_weapon;
            this.meleeWeaponNum = new_weaponTs.weaponNum;
        }
        // 替换当前武器
        if (this.curWeapon && this.curWeapon.isRangeWeapon === new_weaponTs.isRangeWeapon) {
            this.changeCurWeapon(new_weapon, false);
        }
        // 销毁武器道具
        this.newWeapon = -1;
        if (this.newWeaponItem && this.newWeaponItem.isValid) this.newWeaponItem.destroy();
        this.newWeaponItem = null;
    }

    lastTime: number = 0;
    changeCurWeapon(newWeaponNode: cc.Node, isCheck: boolean = true) {
        if (!newWeaponNode || !newWeaponNode.isValid) return;
        if (this.curWeapon && this.curWeapon.isValid && newWeaponNode == this.curWeapon.node) return;
        let curTime = Number(new Date());
        if (isCheck && (curTime - this.lastTime < 1000)) return;
        this.lastTime = curTime;
        // 切换武器显示
        if (this.curWeapon && cc.isValid(this.curWeapon)) this.curWeapon.node.active = false;
        newWeaponNode.active = true;
        // 切换当前武器
        let newWeapinTs = newWeaponNode.getComponent(Weapon);
        if (newWeapinTs) {
            // UI效果
            if (this.isPlayer) {
                let newWeapinMess: cc.Node = null;
                if (newWeapinTs.weaponType == WeaponType.weapon_melee) {
                    gameMgr.BtnBullet.active = false;
                } else if (newWeapinTs.weaponType == WeaponType.weapon_range) {
                    newWeapinMess = gameMgr.rangedWeaponMess;
                } else if (newWeapinTs.weaponType == WeaponType.weapon_rangeAd) {
                    newWeapinMess = gameMgr.rangedWeaponAdMess;
                }
                newWeapinMess.children[0].active = true;

                if (this.curWeapon && this.curWeapon.isValid) {
                    cocosz.audioMgr.playEffect("changeWeapon");
                    let oldWeapinMess: cc.Node = null;
                    if (this.curWeapon.weaponType == WeaponType.weapon_melee) {
                    } else if (this.curWeapon.weaponType == WeaponType.weapon_range) {
                        oldWeapinMess = gameMgr.rangedWeaponMess;
                    } else if (this.curWeapon.weaponType == WeaponType.weapon_rangeAd) {
                        oldWeapinMess = gameMgr.rangedWeaponAdMess;
                    }
                    if (oldWeapinMess !== newWeapinMess) {
                        oldWeapinMess.children[0].active = false;
                        oldWeapinMess.children[1].active = true;
                        cc.tween(oldWeapinMess.children[1].getComponent(cc.Sprite))
                            .set({ fillRange: -1 })
                            .to(1, { fillRange: 0 })
                            .call(() => {
                                if (oldWeapinMess.isValid) {
                                    oldWeapinMess.children[1].active = false;
                                }
                            })
                            .start();
                    }
                }
            }
            // 开火点
            if (newWeapinTs.isRangeWeapon) {
                this.startPosNode = newWeaponNode.getChildByName("startPos");
            }
            this.curWeapon = newWeapinTs;
            this.atkNum = this.curWeapon.atkNum * (this.curWeapon.isRangeWeapon ? 1 : this.meleeAtkRate);
            this.atkSpeed = this.curWeapon.atkSpeed;
            this.reloadSpeed = this.curWeapon.reload;
        }
    }
    atkStart() { }

    atkEnemy() { }

    atkComplete() { }

    setWeaponAngle(dir: cc.Vec2) {
        if (this.curWeapon && this.curWeapon.isValid && this.curWeapon.isRangeWeapon) {
            if (dir.equals(cc.Vec2.ZERO)) {
                this.curWeapon.node.angle = 0;
            } else {
                if (dir.x < 0) {
                    this.curWeapon.node.angle = cc.v2(dir).signAngle(cc.v2(-1, 0)) / Math.PI * 180;
                } else {
                    this.curWeapon.node.angle = -cc.v2(dir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
                }
                if (dir.y > 0) {
                    if (this.curWeapon.node) this.rangedWeapon.zIndex = -1;
                } else {
                    if (this.curWeapon.node) this.rangedWeapon.zIndex = 1;
                }
            }
        }
    }

    _aniName: string = "";
    /**
     * 设置动画
     * @param name 动画名字 
     * @param enforce 强制播放
     */
    updateAni(name?: string, enforce: boolean = false) {
        if (enforce) {
            this._playAni(name);
        }
        else if (gameMgr.isGameStart) {
            if (this.isDeath) {
                name = "die";
            } else if (this.moveDir.equals(cc.Vec2.ZERO)) {
                name = "daiji_body";
            } else {
                name = "run_body";
            }
            this._playAni(name);
        }
    }
    _playAni(name: string) {
        if (name && name != this._aniName) {
            this.ani.play(name);
            this._aniName = name;
        }
    }

    getCurSpeed() {
        let speed: number = this.MoveSpeed * this.speedRate * (this.curWeapon && this.curWeapon.isRangeWeapon ? 1 : 1.2);
        if (speed > 1000) speed = 1000;
        return speed;
    }

    isAtk: boolean = false;
    udpateRBody(dir: cc.Vec2) {
        if (this.rig.type == cc.RigidBodyType.Dynamic) {
            if (this.canMove) {
                if (!dir.equals(cc.Vec2.ZERO)) {
                    this.rig.linearVelocity = dir.mul(this.getCurSpeed());
                } else {
                    this.rig.linearVelocity = cc.Vec2.ZERO;
                }
            }
        }
    }

    updatePerson() {
        let dir = null;
        if (this.atkDir && !this.atkDir.equals(cc.Vec2.ZERO)) {
            dir = this.atkDir;
        } else if (this.moveDir && !this.moveDir.equals(cc.Vec2.ZERO)) {
            dir = this.moveDir;
        } else {
            return;
        }

        if (dir.x < 0) this.body.scaleX = -Math.abs(this.body.scaleX);
        else this.body.scaleX = Math.abs(this.body.scaleX);

        if (dir.y > 0) {
            this.leg_back.opacity = 255;
            this.leg.opacity = 0;
            this.head.children[1].opacity = 255;
            this.head.children[0].opacity = 0;
        }
        else {
            this.leg_back.opacity = 0;
            this.leg.opacity = 255;
            this.head.children[0].opacity = 255;
            this.head.children[1].opacity = 0;
        }
        // 远程武器
        this.setWeaponAngle(dir);
    }

    updateAtk() {
        if (this.atkList.length > 0) {
            let dt = 1000;
            let n = -1;
            for (let i = 0; i < this.atkList.length; i++) {
                let ts = this.atkList[i].getComponent(Person);
                let dt2 = this.atkList[i].getPosition().sub(this.node.getPosition()).mag();
                if (dt2 < dt) {
                    dt = dt2;
                    n = i;
                }
            }
            if (n >= 0) {
                this.atkDir = cc.v2(this.atkList[n].getPosition().sub(this.node.getPosition()).normalize());
                this.atkTarget = this.atkList[n];
            }
            else {
                this.atkDir = this.moveDir.mag() == 0 ? this.atkDir : cc.v2(this.moveDir);
            }
        }
        else {
            this.atkDir = this.moveDir.mag() == 0 ? this.atkDir : cc.v2(this.moveDir);
        }
    }

    atkList: cc.Node[] = [];
    curItem: number = 0;
    curItemEffect: cc.Prefab = null;

    itemTarget: cc.Node = null;

    grassID: number = 0;
    houseID: number = 0;
    isInHouse: boolean = false;
    // 0:检测碰撞；1:检测子弹；2:检测在层级下，3:检测在层级上
    onCollisionEnter(other: cc.Collider, self: cc.Collider) { }
    newWeapon: number = -1;
    newWeaponItem: cc.Node = null;
    poisonCount: number = 0;

    onCollisionExit(other: cc.Collider, self: cc.Collider) { }

    isDeath: boolean = false;
    isAttackedEffect: boolean = false;
    maxNum: number = 0;
    /** 受伤 */
    hart(atkNum: number, from: cc.Node, dir: cc.Vec2 = null, isAudio: boolean = true, isEmit: boolean = true, labelColor?: cc.Color) { }

    isAvoidInjury: number = 0;
    /** 免伤 */
    avoidInjury(time: number) {
        this.isAvoidInjury++;
        this.scheduleOnce(() => {
            this.isAvoidInjury--;
        }, time);
    }

    killer: any = null;
    death() {
        this.isDeath = true;
        // 隐藏光环
        if (this.ghAniNode && this.ghAniNode.isValid) {
            this.ghAniNode.active = false;
        }
        if (this.playerMess && this.playerMess.isValid) {
            this.playerMess.active = false;
        }
        this.head_death.opacity = 255;
        // 死亡音效
        gameMgr.playEffect("death", this.node);

        this.unscheduleAllCallbacks();
        // this.ani.stop();
        // this.ani.play("die");
        this.updateAni("die");
        if (this.meleeWeapon) {
            let ani = this.meleeWeapon.getComponent(cc.Animation);
            ani && ani.stop();
        }
        this.leg.opacity = 255;
        this.leg_back.opacity = 0;
        this.head.children[0].opacity = 255;
        this.head.children[1].opacity = 0;

        if (this.curWeapon && this.curWeapon.isValid) this.curWeapon.node.active = false;
        if (this.rig) this.rig.active = false;
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.node.getComponent(cc.CircleCollider).enabled = false;

        gameMgr.deathNum++;
        if (this.isPlayer) {
            let rate = 0.3;
            cc.director.getScheduler().setTimeScale(rate);
            setTimeout(() => {
                cc.director.getScheduler().setTimeScale(1);
            }, rate * 3000);
        }
        if (cocosz.gameMode == 6) {
            if (this.isPlayer) {
                if (!gameMgr.isWin && !gameMgr.isFail) {
                    this.revivePos = this.node.getPosition();
                    this.scheduleOnce(() => {
                        cocosz.uiMgr.openPanel(PanelName.UIRevivePanel);
                    }, 2)
                }
            }
        }
    }

    revive() {
        if (gameMgr && !gameMgr.isWin && !gameMgr.isFail) {
            gameMgr.deathNum--;
            // 恢复光环
            if (this.ghAniNode && this.ghAniNode.isValid) {
                this.ghAniNode.active = true;
            }
            if (this.playerMess && this.playerMess.isValid) {
                this.playerMess.active = true;
            }
            if (this.rangedWeapon) this.rangedWeapon.getComponent(Weapon).reset();
            if (this.rangedWeaponAd) this.rangedWeaponAd.getComponent(Weapon).reset();
            // if (this.rangedWeapon) this.rangedWeapon.zIndex = 1;
            // if (this.rangedWeapon) this.rangedWeapon.angle = 0;
            if (this.meleeWeapon) {
                let ani = this.meleeWeapon.getComponent(cc.Animation);
                ani && ani.play();
            }
            if (this.curWeapon && this.curWeapon.isValid) this.curWeapon.node.active = true;
            this.head_death.opacity = 0;
            let pos = this.revivePos;
            this.node.setPosition(pos);
            this.HP = this.totleHp;


            this.body.setPosition(cc.v2(0, 0));
            this.body.angle = 0;
            this.leg.opacity = 255;
            this.leg_back.opacity = 0;

            this.head.children[0].opacity = 255;
            this.head.children[1].opacity = 0;
            if (this.node.scaleX < 0) this.node.scaleX *= -1;

            if (this.rig) this.rig.active = true;
            // this.node.getComponent(cc.RigidBody).enabled = true;
            this.node.getComponent(cc.BoxCollider).enabled = true;
            this.node.getComponent(cc.CircleCollider).enabled = true;

            this.isDeath = false;
            this.canMove = true;
        }
    }

    // findTime: number = 0;
    revivePos: cc.Vec2 = cc.v2(0, 0);

    creatItem() { }
}
