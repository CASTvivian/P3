import { utils } from "../../common-plugin/Scripts/Utils";
import { cocosz } from "../Framework/CocosZ";
import Constant, { PanelName, ZindexLayer } from "../Framework/Constant";
import Bullet from "./bullet";
import GameDate from "./gameDate";
import { gameMgr } from "./gameMgr";
import Person from "./person";
import { SkillType, upgradeMgr } from "./UpgradeMgr";
import Weapon from "./weapon";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends Person {

    onLoad() {
        this.isPlayer = true;
        this.id = 1;
        gameMgr.playerTs = this;
        if (this.hpSpr) {
            this.hpSpr.color = cc.Color.GREEN;
        }
        if (this.atkBar) {
            this.atkBar.node.children[1].color = cc.Color.YELLOW;
        }
        this.rig = this.node.getComponent(cc.RigidBody);
        if (this.rig) { this.rig.linearDamping = 0.2; }
        this.playerMess = this.node.getChildByName("playerMess");
        this.hpNumNode = this.playerMess.getChildByName("hpNum");
        // 光环
        this.ghAniNode = this.node.getChildByName("gh");
        // 烟尘
        this.ycAniNode = this.node.getChildByName("yc");
        // 相机跟随
        gameMgr.followNode = this.node;

        // 防止玩家和僵尸碰撞
        if (cocosz.gameMode == 6) {
            if (this.rig && this.rig.isValid) {
                this.rig.enabledContactListener = true;
            }
        }
    }

    start() {
        super.start();
        this.setProperty();
        this.node.zIndex = ZindexLayer.zindex_player;
        if (this.ghAniNode && this.ghAniNode.isValid) {
            this.ghAniNode.setParent(this.node.parent);
            this.ghAniNode.zIndex = ZindexLayer.zinedx_gh;
            this.updateGhAni();
        }
        if (this.ycAniNode && this.ycAniNode.isValid) {
            this.ycAniNode.setParent(this.node.parent);
            this.ycAniNode.zIndex = ZindexLayer.zinedx_footYc;
            this.updateYcAni();
        }
        // 血条
        if (this.hpSpr) {
            this.hpSpr.color = cc.Color.GREEN;
        }

    }

    lateUpdate(dt) {
        this.curTime++;
        if (cocosz.isPause || this.isDeath || gameMgr.isWin || gameMgr.isFail) {
            this.rig.linearVelocity = cc.v2(0, 0);
            return;
        };
        if (this.curTime % 15 == 0) {
            this.updateAni();
            this.creatFootPrint();
        }
        this.updateAtk();
        this.updatePerson();
        this.udpateRBody(this.moveDir);
        this.updateMess();
        this.updateGhAni();
        this.updateYcAni();
        if (this.atkTarget && this.atkTarget.isValid) {
            this.atkEnemy();
        }
    }

    recoverEffect() {
        let node = cc.instantiate(gameMgr.itemEffect[0]);
        node.parent = this.node;
    }

    lastTime: number = 0;
    checkTarget() {
        if (Number(new Date()) - this.lastTime < 500) return;
        this.lastTime = Number(new Date());
        let num = this.atkList.indexOf(this.atkTarget);
        if (num >= 0) {
            if (num == this.atkList.length - 1) {
                num = 0;
            }
            else {
                num += 1;
            }
            this.atkTarget = this.atkList[num];
        }
        else {
            this.atkTarget = this.atkList[0];
        }
    }

    lastAtkTime: number = 0;
    atkBulletNum: number = 1;
    atkEnemy() {
        if (!this.curWeapon || !this.curWeapon.isValid || this.isAtk) return;

        if (this.curWeapon && this.curWeapon.isRangeWeapon) {
            // 是否有子弹
            if (this.curWeapon._isReload || this.curWeapon.curBullet <= 0) {
                return;
            } else {
                if (cocosz.gameMode == 6 && this.curWeapon.curBullet == 1) {
                    cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Bullet_Last, node: this.node });
                }
                this.curWeapon.curBullet--;
            }
            // 抖动效果
            let t = (this.atkSpeed > 0.1 ? 0.1 : this.atkSpeed) / 3;
            cc.tween(this.rangedWeapon.children[0])
                .by(t, { x: -20, angle: 20 })
                .by(t, { x: 20, angle: -20 })
                .start();
            // 攻击效果
            let pos = this.startPosNode.getPosition();
            if (this.curWeapon.atkEffect) {
                let effect = cc.instantiate(this.curWeapon.atkEffect);
                if (this.curWeapon.weaponNum == 9 || this.curWeapon.weaponNum == 15) {
                    this.node.parent.addChild(effect, ZindexLayer.zindex_effect_fire, "effect");
                    effect.setPosition(this.startPosNode.parent.convertToWorldSpaceAR(pos).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2)));
                    if (this.body.scaleX > 0) {
                        effect.angle = this.rangedWeapon.angle;
                    }
                    else {
                        effect.angle = 180 - this.rangedWeapon.angle;
                    }
                }
                else {
                    this.curWeapon.node.addChild(effect, 1, "effect");
                    effect.setPosition(pos);
                }
                // 升级开火特效
                // if (this.curWeapon.can_effect_hit && this.curWeapon && this.curWeapon.weaponLevel > 0) {
                //     let effect_fire = cc.instantiate(gameMgr.effect_fire);
                //     effect_fire.parent = effect.parent;
                //     effect_fire.setPosition(effect.position);
                //     effect_fire.angle = effect.angle;
                //     // 颜色
                //     let arr = ["", "y", "p", "r"];
                //     let spAni = effect_fire.children[0].getComponent(sp.Skeleton);
                //     spAni && spAni.setSkin(arr[this.curWeapon.weaponLevel]);
                // }
            }
        }
        else {
            gameMgr.shakeEffect(2, 1, false);//屏幕晃动
            let ani = this.meleeWeapon.getComponent(cc.Animation);
            ani && ani.isValid && ani.play("atk_dao");
            this.scheduleOnce(() => {
                ani && ani.isValid && ani.play("daiji_dao");
            }, 0.18)
        }
        // 生成子弹
        let dir;
        if (this.atkDir && !this.atkDir.equals(cc.Vec2.ZERO)) {
            dir = this.atkDir;
        } else if (this.moveDir && !this.moveDir.equals(cc.Vec2.ZERO)) {
            dir = this.moveDir;
        } else {
            dir = this.body.scaleX > 0 ? cc.Vec2.RIGHT : cc.Vec2.RIGHT.negSelf();
        }
        if (this.atkBulletNum > 1) {
            for (let i = 0; i < this.atkBulletNum; i++) {
                let angle = ((this.atkBulletNum - 1) / 2 - i) * 15;
                let new_dir: cc.Vec2 = dir.rotate(cc.misc.degreesToRadians(angle));
                this.createBullet(new_dir);
            }
        } else {
            this.createBullet(dir);
        }
        // 攻击表情
        let t = this.atkSpeed > 0.1 ? 0.1 : this.atkSpeed;
        cc.tween(this.head_atk)
            .set({ opacity: 255 })
            .delay(t)
            .set({ opacity: 0 })
            .start();


        this.isAtk = true;
        if (this.curWeapon.isRangeWeapon && this.curWeapon.curBullet <= 0) {
            cc.tween(this.node)
                .delay(this.curWeapon.reload)
                .call(() => {
                    this.isAtk = false;
                })
                .start();
        } else {
            cc.tween(this.node)
                .delay(this.atkSpeed)
                .call(() => {
                    this.isAtk = false;
                })
                .start();
        }
        // 攻击音效
        let name = Weapon.WeaponName[this.curWeapon.weaponNum - 1];
        if (GameDate.Weapon[name] && GameDate.Weapon[name].music) {
            gameMgr.playEffect("shot_" + GameDate.Weapon[name].music, this.node);
        } else {
            gameMgr.playEffect(`shot_${Weapon.WeaponName[this.curWeapon.weaponNum - 1]}`, this.node);
        }
    }

    createBullet(dir: cc.Vec2) {
        let bullet = cc.instantiate(this.curWeapon.bullet);
        if (this.curWeapon.isRangeWeapon) {
            bullet.parent = this.node.parent;
            let fromPos = bullet.parent.convertToNodeSpaceAR(this.startPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
            bullet.setPosition(fromPos);
            bullet.angle = -cc.v2(dir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
            if (this.curWeapon.weaponNum == 2) {
                bullet.angle += (5 - Math.random() * 10);
            }
            if (this.curWeapon.flySpeed > 0) {
                let pos1 = bullet.getPosition();
                let pos2 = pos1.add(dir.mul(this.curWeapon.atkRangeNum));
                cc.tween(bullet)
                    .to(pos2.sub(pos1).mag() / this.curWeapon.flySpeed, { position: cc.v3(pos2) })
                    .call(() => {
                        let ts = bullet.getComponent(Bullet);
                        if (ts.boomEffect) {
                            let boom = cc.instantiate(ts.boomEffect)
                            boom.parent = ts.node.parent;
                            boom.setPosition(ts.node.getPosition());
                            let curBullet = boom.getComponent(Bullet);
                            curBullet.atk = ts.atk;
                            curBullet.atker = ts.atker;
                            curBullet.id = ts.id;
                            gameMgr.playEffect("explo", boom);
                            if (ts.hitEffect) {
                                let pos = bullet.getPosition();
                                let node = cc.instantiate(ts.hitEffect);
                                node.parent = bullet.parent;
                                node.setPosition(pos);
                                node.zIndex = ZindexLayer.zindex_effect_hit;
                            }
                        }
                        bullet.destroy()
                    })
                    .start();
                // 弹壳
                if (this.curWeapon.shellCall) {
                    let shellCase = cc.instantiate(this.curWeapon.shellCall);
                    shellCase.setParent(gameMgr.map);
                    shellCase.setPosition(this.node.position);
                    shellCase.scaleX = this.body.scale;
                }
            } else {
                cc.tween(bullet).delay(0.4).call(() => {
                    bullet.destroy()
                }).start();
            }

            let ts = bullet.getComponent(Bullet);
            ts.id = this.id;
            ts.atker = this.node;
            ts.atk = (this.atkNum + this.personAtk) * this.atkRate;
            ts.dir = dir;
        }
        else {
            this.node.addChild(bullet, -1);
            bullet.color = this.curWeapon.bulletCollor;
            if (this.atkDir.x < 0) {
                bullet.scaleX *= -1 / this.node.scaleX;
            }
            else {
                bullet.scaleX /= this.node.scaleX;
            }
            bullet.scaleY /= this.node.scaleY;
            cc.tween(bullet).delay(0.2).call(() => { bullet.destroy() }).start();

            let ts = bullet.getComponent(Bullet);
            ts.id = this.id;
            ts.atker = this.node;
            ts.atk = (this.atkNum + this.personAtk) * this.atkRate;
            ts.dir = dir;
        }
    }

    hart(atkNum: number, from: cc.Node, dir: cc.Vec2 = null, isAudio: boolean = true) {
        if (cocosz.isPause || this.isDeath || this.isAvoidInjury) return;
        if (cocosz.gameMode == 6 && upgradeMgr) {
            // 移动过程中15%的概率免伤
            if (upgradeMgr.isHaveSkill(SkillType.护甲靴子) && this.moveDir.mag() > 0 && Math.random() < 0.4) {
                // gameMgr.showRoleTip(this.node, "闪避", cc.Color.YELLOW);
                return;
            }
            else if (upgradeMgr.isHaveSkill(SkillType.神圣守护) && upgradeMgr.hudun && upgradeMgr.hudun.active) {
                upgradeMgr.updateHudun();
                // gameMgr.showRoleTip(this.node, "免伤", cc.Color.YELLOW);
                return;
            }
        }
        // 防止dir过大
        if (dir && dir.mag() > 3) dir.normalizeSelf().mulSelf(3);
        // 减伤
        atkNum = (1 - this.damageReduction) * atkNum;
        // 护盾
        if (this.Shiled > 0) {
            this.Shiled -= atkNum;
            if (this.Shiled < 0) {
                atkNum = -this.Shiled;
                this.Shiled = 0;
            } else {
                return;
            }
        }
        // 数字
        if (cocosz.gameMode != 6) {
            gameMgr.showRoleTip(this.node, Math.min(this.HP, atkNum).toFixed(0));
        }
        this.HP -= atkNum;
        // 受伤音效
        if (isAudio) {
            if (from) {
                let ts = from.getComponent(Person);
                if (ts && ts.curWeapon && ts.curWeapon.isRangeWeapon) {
                    gameMgr.playEffect("hurt_range", this.node);
                } else {
                    gameMgr.playEffect("hurt_melee", this.node);
                }
            } else {
                gameMgr.playEffect("hurt", this.node);
            }
        }
        // 屏幕闪红
        if (cocosz.gameMode == 6) {
            cc.tween(gameMgr.red)
                .to(0.5, { opacity: 255 }, { easing: "sineOut" })
                .to(0.5, { opacity: 0 }, { easing: "sineIn" })
                .start();
        }
        // 震动
        cocosz.vibrate("long");
        if (this.HP <= 0) {
            if (cocosz.gameMode == 6) cocosz.audioMgr.playEffect("GameOver");
            this.death();
            if (from) {
                let ts = from.getComponent(Person);
                ts.killNum++;
                ts.curKillNum++;
                // 更新最佳成绩
                if (ts.curKillNum > ts.maxNum) {
                    ts.maxNum = ts.curKillNum;
                }
                this.killer = ts;
                this.curKillNum = 0;
            }
            // 倒飞
            if (dir) {
                let p1 = this.node.getPosition();
                let pTo = p1.add(dir.normalizeSelf().mulSelf(200));
                let p2 = cc.v2((p1.x + pTo.x) / 2, p1.y + 200);
                cc.tween(this.node)
                    .bezierTo(0.3, p1, p2, pTo)
                    .start();
            }
            // 死亡事件
            if (cocosz.gameMode == 6) {
                cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Player_Death })
            }
        } else {
            // 受伤事件
            if (cocosz.gameMode == 6) {
                this.avoidInjury(2);
                cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Player_Hart })
            }
            // 效果
            if (!this.isAttackedEffect) {
                this.isAttackedEffect = true;
                // 后退
                if (this.rig.type == cc.RigidBodyType.Dynamic && dir) {
                    // 控制
                    this.canMove = false;
                    this.scheduleOnce(() => { this.canMove = true; }, 0.1);
                    // 后退
                    let div = dir.mulSelf(400 * dir.mag()).addSelf(this.rig.linearVelocity);
                    if (div.mag() > 500) {
                        div.normalizeSelf().mulSelf(500);
                    }
                    this.rig.linearVelocity = div;
                }
                // 晃头
                cc.tween(this.head)
                    .call(() => { this.head_hart.opacity = 255; })
                    .to(0.05, { angle: 15 })
                    .to(0.05, { angle: -15 })
                    .to(0.05, { angle: 15 })
                    .to(0.05, { angle: 0 })
                    .call(() => { this.head_hart.opacity = 0; })
                    .start();
                // 人物变色
                let spArr = this.body.getComponentsInChildren(cc.Sprite);
                cc.tween(this.body)
                    .call(() => { spArr.forEach((v, i) => { v.isValid && v.setMaterial(0, this.mat_attacked) }) })
                    .delay(0.1)
                    .call(() => { spArr.forEach((v, i) => { v.isValid && v.setMaterial(0, this.mat_common) }) })
                    .delay(0.1)
                    .union()
                    .repeat(cocosz.gameMode == 6 ? 5 : 2)
                    .call(() => { this.isAttackedEffect = false; })
                    .start();
            }
        }
    }

    creatFootPrint() {
        if (this.node.opacity == 0) return;
        let pos = this.node.getPosition();
        if (pos.sub(this.lastPos).mag() < 5) return;

        this.lastPos = cc.v2(pos);
        this.footNum++;
        // 脚步音效
        if (this.isPlayer && this.footNum % 3 == 0) {
            gameMgr.playEffect("footsteps", this.node);
        }
        // 脚印(雪地)
        if (gameMgr.map.name == "map2") {
            let node = new cc.Node();
            node.addComponent(cc.Sprite).spriteFrame = gameMgr.jiaoyin;
            cc.tween(node).delay(0.5).to(0.5, { opacity: 0 }).call(() => { node.destroy() }).start();
            node.parent = this.node.parent;
            node.zIndex = ZindexLayer.zinedx_footPrint;
            if (this.moveDir.mag() > 0) node.angle = 360 - cc.v2(this.moveDir).signAngle(cc.v2(1, 0)) / Math.PI * 180;
            pos.y -= 100 * this.node.scale;
            let pos2 = cc.v2(20, 0).rotate(node.angle / 180 * Math.PI).rotate(this.footNum % 2 == 0 ? Math.PI / 2 : -Math.PI / 2)
            pos.addSelf(pos2);
            node.setPosition(pos);
        }
    }

    // 0:检测碰撞；1:检测子弹；2:检测在层级下，3:检测在层级上
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (self.tag == 0) {
            // 敌人
            if (other.tag == 1) {
                let ts = other.node.getComponent(Person);
                if (ts && ts.id != this.id) {
                    this.atkList.push(other.node);
                    if (!cc.isValid(this.atkTarget) && other.node.isValid) {
                        this.atkTarget = other.node;
                    }
                }
            }
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        if (self.tag == 0) {
            let num = this.atkList.indexOf(other.node)
            if (other.tag == 1 && num >= 0) {
                this.atkList.splice(num, 1);
                if (this.atkList.length == 0) {
                    this.atkTarget = null;
                }
                else {
                    if (!cc.isValid(this.atkTarget) || other.node.uuid == this.atkTarget.uuid) {
                        this.atkTarget = this.atkList[0];
                    }
                }
            }
        }
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.node.group == "zombie") {
            contact.disabled = true;
        }
    }
}
