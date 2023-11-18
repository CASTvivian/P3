import { cocosz } from "../Framework/CocosZ";
import Constant from "../Framework/Constant";
import Msg from "../Framework/Msg";
import GameDate from "./gameDate";
import { gameMgr } from "./gameMgr";
import Person from "./person";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

export enum WeaponType {
    weapon_melee,
    weapon_range,
    weapon_rangeAd
}

@ccclass
export default class Weapon extends cc.Component {

    public static readonly WeaponName = ["ak", "cfq", "dao", "gj", "jgb", "sd", "hdl", "sq", "ju", "ld", "nnp", "gtst", "tb", "mb", "mq", "szg", "rsq", "cjj", "jtl", "sq2", "tj", "fs"]
    public static readonly meleeWaapon = [3, 4, 5, 13, 14];
    public static readonly rangeWeapon = [1, 2, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22];

    @property({ tooltip: "是否播放开火升级效果" })
    can_effect_hit: boolean = false;

    @property(cc.Node)
    hand_effect: cc.Node = null;
    @property(cc.Node)
    hand_2: cc.Node = null;

    @property
    weaponNum: number = 1;

    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(cc.Color)
    bulletCollor: cc.Color = cc.Color.WHITE;

    @property(cc.Prefab)
    shellCall: cc.Prefab = null;

    @property(cc.Prefab)
    atkEffect: cc.Prefab = null;

    @property
    atkNum: number = 10;

    @property
    atkRangeNum: number = 1000;

    @property
    flySpeed: number = 2000;

    @property({ tooltip: "开火时间" })
    @property
    atkSpeed: number = 0.4;

    @property({ tooltip: "弹夹弹药数量" })
    bulletNum: number = 5;

    @property({ tooltip: "总弹药数量" })
    bulletTotal: number = 5;

    @property({ tooltip: "装弹时间" })
    reload: number = 3;

    @property({ tooltip: "装弹音效" })
    audioName: string = "read";

    weaponLevel: number = 0;
    weaponType: WeaponType = WeaponType.weapon_melee;

    // 武器拥有者
    public person: Person = null;
    // 是否是远程武器
    public get isRangeWeapon(): boolean {
        return Weapon.rangeWeapon.includes(this.weaponNum);
    }
    // 子弹
    private _curBullet: number = 0;
    public get curBullet(): number {
        return this._curBullet;
    }
    public set curBullet(v: number) {
        if (v > this.bulletNum) { v = this.bulletNum; }
        else if (v < 0) { v = 0; }
        // 远程武器
        if (this.isRangeWeapon) {
            this._curBullet = v;
            // 装弹
            if (this._curBullet <= 0) {
                this.reloadBullet();
            }
            // 设置子弹UI
            this.setBulletUI();
        }
    }

    protected onLoad(): void {
        // 等级
        if (!this.person || this.person.isPlayer) {
            this.weaponLevel = cocosz.dataMgr.getGunInfo(this.weaponNum - 1).Level;
        } else if ([1, 2, 3, 4, 5].includes(cocosz.gameMode)) {
            this.weaponLevel = Math.floor(Math.random() * 4);
        }
        this.atkNum = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].atk[this.weaponLevel];
        this.atkSpeed = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].atkSpeed[this.weaponLevel];
        this.bulletNum = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].bulletNum;
        this.bulletTotal = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].bulletTotal[this.weaponLevel];
        this.reload = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].reload;
        this.atkRangeNum = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].atkRange;
        if (this.person) this.bulletTotal = Math.ceil(this.bulletTotal * this.person.bulletRate);
        // 装弹
        this._curBullet = 0;
        this.addBullet();
        this.setSD();
    }

    protected start(): void { }

    setBulletUI() {
        // UI更新子弹数
        if (this.person && this.person.isPlayer) {
            if (this.weaponType == WeaponType.weapon_range) {
                if (gameMgr.ammo && gameMgr.ammo.isValid)
                    gameMgr.ammo.string = this._curBullet + "/" + ([6, 7].includes(cocosz.gameMode) ? "♾" : this.bulletTotal);
            } else if (this.weaponType == WeaponType.weapon_rangeAd) {
                if (gameMgr.ammoAd && gameMgr.ammoAd.isValid)
                    gameMgr.ammoAd.string = this._curBullet + "/" + ([6, 7].includes(cocosz.gameMode) ? "♾" : this.bulletTotal);
            }
        }
    }

    _arrName = ["", "y", "p", "r"]
    protected setSD(): void {
        // 闪电颜色
        if (this.person) {
            this.node.walk((child) => {
                if (child.name == "sd") {
                    if (this.weaponLevel > 0) {
                        child.active = true;
                        let spAni = child.getComponent(sp.Skeleton);
                        spAni && spAni.setSkin(this._arrName[this.weaponLevel]);
                    } else {
                        child.active = false;
                    }
                }
            }, null);
        }
    }

    // 重置子弹
    reset() {
        this.bulletTotal = GameDate.Weapon[Weapon.WeaponName[this.weaponNum - 1]].bulletTotal[this.weaponLevel];
        if (this.person) {
            this.bulletTotal = Math.ceil(this.bulletTotal * this.person.bulletRate);
        }
        this._curBullet = 0;
        this.addBullet();
    }

    // 装弹
    addBullet() {
        if (this.isRangeWeapon) {
            if (this.person && this.person.isPlayer) {
                // 子弹小于弹夹数量, 且还有备弹
                if (this.curBullet < this.bulletNum && this.bulletTotal > 0) {
                    if ([6, 7].includes(cocosz.gameMode)) {
                        this.curBullet = this.bulletNum;
                        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Bullet_Reload })
                    } else {
                        let n = this.bulletNum - this.curBullet;
                        if (this.bulletTotal >= n) {
                            // 子弹足够
                            this.bulletTotal -= n;
                            this.curBullet += n;
                        } else {
                            // 子弹不够
                            this.bulletTotal = 0;
                            this.curBullet += this.bulletTotal;
                        }
                    }
                }
            } else {
                this.curBullet = this.bulletNum;
            }
        }
    }

    // 装弹效果
    _isReload: boolean = false;
    reloadBullet() {
        if (this.isRangeWeapon && this._isReload == false) {
            this._isReload = true;
            if (this.person && this.person.isPlayer) {
                if (this.bulletTotal > 0) {
                    // 音效
                    cocosz.audioMgr.playEffect("reload");
                    // 动作
                    let y_back = 0;
                    if (this.hand_effect) {
                        y_back = this.hand_effect.y;
                        cc.tween(this.hand_effect)
                            .by(0.5, { y: 50 })
                            .by(0.5, { y: -50 })
                            .union()
                            .repeat(this.reload)
                            .start();
                    }
                    // 闪红
                    cc.tween(gameMgr.rangedWeaponMess.children[0])
                        .to(0.2, { color: cc.Color.RED })
                        .to(0.2, { color: cc.Color.WHITE })
                        .start();
                    cocosz.scheduleOnce(() => {
                        if (this && this.isValid) {
                            this._isReload = false;
                            this.addBullet();
                            if (this.hand_effect) {
                                this.hand_effect.stopAllActions();
                                this.hand_effect.y = y_back;// 还原手的位置
                            }
                            // 闪绿
                            cc.tween(gameMgr.rangedWeaponMess.children[0])
                                .to(0.2, { color: cc.Color.GREEN })
                                .to(0.2, { color: cc.Color.WHITE })
                                .start();
                        }
                    }, this.reload * this.person.reloadRate);
                    // 装弹按钮效果
                    if (gameMgr.BtnBullet.active && gameMgr.BtnBullet.children[3] && gameMgr.BtnBullet.children[3].active) {
                        // 装弹
                        gameMgr.BtnBullet.children[3].active = false;
                        gameMgr.BtnBullet.children[0].active = true;
                        // 进度填充
                        let t = gameMgr.playerTs.curWeapon.reload * gameMgr.playerTs.reloadRate;
                        gameMgr.BtnBullet.children[1].active = true;
                        let pro = gameMgr.BtnBullet.children[1].getComponent(cc.Sprite);
                        cc.tween(pro)
                            .set({ fillRange: 0 })
                            .to(t, { fillRange: -1 })
                            .call(() => {
                                gameMgr.BtnBullet.children[0].active = false;
                                gameMgr.BtnBullet.children[1].active = false;
                                gameMgr.BtnBullet.children[2].active = false;
                                gameMgr.BtnBullet.children[3].active = true;
                            })
                            .start();
                        gameMgr.BtnBullet.children[2].active = true;
                        let label = gameMgr.BtnBullet.children[2].getComponent(cc.Label);
                        cc.tween(label)
                            .call(() => { label.string = (t * (1 + pro.fillRange)).toFixed(1); })
                            .delay(0.1)
                            .union()
                            .repeat(t / 0.1)
                            .start()
                    }
                } else {
                    //没有备弹,提醒
                    this._isReload = false;
                    Msg.Show(i18n.t("msg.myzd"));//没有子弹
                    cocosz.audioMgr.playEffect("bag", false, 1);
                }
            } else {
                cocosz.scheduleOnce(() => {
                    if (this && this.isValid) {
                        this._isReload = false;
                        this.addBullet();
                    }
                }, this.reload);
            }
        }
    }
}
