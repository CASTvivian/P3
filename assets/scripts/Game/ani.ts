import { cocosz } from "../Framework/CocosZ";
import GameDate from "./gameDate";
import Weapon from "./weapon";

const { ccclass, property, executeInEditMode, playOnFocus } = cc._decorator;

@ccclass
@executeInEditMode
@playOnFocus
export default class Ani extends cc.Component {
    @property({ displayName: "间隔帧数" })
    times: number = 10;

    @property({ type: [cc.Node], displayName: "动画数组" })
    aniNodeArr: cc.Node[] = [];
    @property()
    _btnAdd: boolean = false;
    get btnAdd() { return this._btnAdd; }
    @property({ displayName: "添加动画" })
    set btnAdd(v) {
        this.aniNodeArr = [];
        this.node.children.forEach((n) => { this.aniNodeArr.push(n); })
    }
    @property({ displayName: "停止动画" })
    _btnStop: boolean = false;
    get btnStop() { return this._btnStop; }
    @property
    set btnStop(v) {
        this._btnStop = false;
        this.stopAni();
        this.aniNodeArr.forEach((node: cc.Node) => { node.opacity = 255; }, null)
    }
    @property({ displayName: "待机动画" })
    _btnDaiji: boolean = false;
    get btnDaiji() { return this._btnDaiji; }
    @property
    set btnDaiji(v) {
        this._btnDaiji = false;
        this.addAni("daiji", false);
    }
    @property({ displayName: "跑步动画" })
    _btnRun: boolean = false;
    get btnRun() { return this._btnRun; }
    @property
    set btnRun(v) {
        this._btnRun = false;
        this.addAni("run", false);
    }
    @property({ displayName: "攻击动画" })
    _btnAtk: boolean = false;
    get btnAtk() { return this._btnAtk; }
    @property
    set btnAtk(v) {
        this._btnAtk = false;
        this.addAni("atk", false);
    }
    @property({ displayName: "攻击动画2" })
    _btnAtk2: boolean = false;
    get btnAtk2() { return this._btnAtk2; }
    @property
    set btnAtk2(v) {
        this._btnAtk2 = false;
        this.addAni("atk2", false);
    }
    @property({ displayName: "死亡动画2" })
    _btnDeath: boolean = false;
    get btnDeath() { return this._btnAtk2; }
    @property
    set btnDeath(v) {
        this._btnDeath = false;
        this.addAni("death", false);
    }

    private handLeft: cc.Node = null;
    private body: cc.Node = null;
    private leg: cc.Node = null;
    private handRight: cc.Node = null;
    private head: cc.Node = null;
    private weapon: cc.Node = null;

    onLoad() {
        this.handLeft = cc.find("handLeft", this.node);
        this.body = cc.find("body", this.node);
        this.leg = cc.find("leg", this.node);
        this.handRight = cc.find("handRight", this.node);
        this.head = cc.find("head", this.node);
        this.weapon = cc.find("weapon", this.node);
    }

    start() { }

    public aniNode: cc.Node = null;//动画节点

    private _t: number = 0;//计时
    private _index: number = 0;//动画帧
    private _isLoop: boolean = false;//是否循环
    private _aniArr: any[] = [];//动画数组
    /**
     * 设置动画
     * @param name 动画名 
     * @param isLoop 是否循环
     * @param time 动画间隔
     */
    setAni(name: string, isLoop: boolean = false) {
        // 清空动画数组
        this._aniArr = [];
        // 播放动画
        this.playAni(name, isLoop);
    }
    /**
     * 添加动画
     * @param name 动画名 
     * @param isLoop 是否循环
     * @param time 动画间隔
     */
    addAni(name: string, isLoop: boolean) {
        if (this.aniNode) {
            this._aniArr.push({
                name: name,
                isLoop: isLoop,
            })
        } else {
            // 播放动画
            this.playAni(name, isLoop);
        }
    }

    /** 停止动画 */
    public stopAni() {
        // 清空动画数组
        this._aniArr = [];
        // 停止动画
        this.aniNode = null;
    }

    /** 是否包含动画 */
    public includeAni(name: string) {
        let r = false;
        this.aniNodeArr.forEach(n => {
            if (n.name == name)
                r = true;
        })
        return r;
    }

    /** 是否正在播放 */
    public isAni(name?: string) {
        if (this.aniNode && ((!name) || (name && this.aniNode.name.includes(name)))) {
            return true;
        } else {
            return false;
        }
    }

    private playAni(name: string, isLoop: boolean = false) {
        this.aniNode = null;
        this._index = 0;
        this._t = 0;
        // 隐藏其它动画
        this.aniNodeArr.forEach(child => {
            if (child.name == name) {
                // child.active = true;
                child.active = true;
                child.opacity = 255;
                this.aniNode = child;
            } else {
                // child.active = false;
                child.active = true;
                child.opacity = 0;
            }
        })
        // 循环播放
        this._isLoop = isLoop;
        // 输出
        if (this.aniNode) {
            // cc.log("播放动画：", name);
        } else {
            cc.log("动画不存在：" + name)
        }
    }

    protected lateUpdate(): void {
        if (this.aniNode && this.aniNode.isValid) {
            if (this._t % this.times == 0) {
                this._t = 0
                // 切换图片
                this.aniNode.children.forEach((child, index) => {
                    if (index == this._index) {
                        child.opacity = 255;
                    } else {
                        child.opacity = 0;
                    }
                })
                // 动画帧++
                this._index++;
                // 判断动画
                if (this._index >= this.aniNode.childrenCount) {
                    if (this._isLoop) {
                        // 循环的当前动画
                        this._index = 0;
                    } else if (this._aniArr.length > 0) {
                        // 下一个动画
                        let json = this._aniArr.shift();
                        this.playAni(json.name, json.isLoop);
                    } else {
                        // 结束动画
                        this.aniNode = null;
                        this._index = 0;
                    }
                }
            }
            // 帧自增
            this._t++;
        }
    }

    setSkinById(id: number) {
        this.setSkinByName((id + 1).toString());
        this.setGh(id);
    }
    setSkinByName(name: string) {
        this.head.children.forEach((child) => {
            if (child.name == name) {
                child.active = true;
                child.opacity = 255;
            } else {
                // child.active = false;
                child.active = true;
                child.opacity = 0;
            }
        });
    }

    setWeaponById(id: number) {
        this.setWeaponByName(Weapon.WeaponName[id]);
        this.setSD(id);
    }
    setWeaponByName(name: string) {
        if (GameDate.Weapon[name].atkRange > 300) {
            this.weapon.active = true;
            this.handLeft.active = false;
            this.handRight.active = false;
            const pre = cocosz.resMgr.getRes(`weapon_${name}`, cc.Prefab);
            if (pre) {
                let rangeWeapon = cc.instantiate(pre);
                rangeWeapon.removeComponent(Weapon);
                this.weapon.children[0] && this.weapon.children[0].isValid && this.weapon.children[0].destroy();
                this.weapon.addChild(rangeWeapon);
            }
        } else {
            this.weapon.active = false;
            this.handLeft.active = true;
            this.handRight.active = true;
            const pre = cocosz.resMgr.getRes(`weapon_${name}`, cc.Prefab);
            if (pre) {
                let meleeWeapon: cc.Node = cc.instantiate(pre);
                meleeWeapon.removeComponent(Weapon);
                this.handRight.children[0] && this.handRight.children[0].isValid && this.handRight.children[0].destroy();
                this.handRight.addChild(meleeWeapon);
            }
        }
    }

    /** 显示光环 */
    setGh(id: number) {
        let gh = this.node.getChildByName("gh");
        if (gh && gh.isValid) {
            let info = cocosz.dataMgr.getSkinInfo(id);
            if (info) {
                let ghAni = gh.getComponent(sp.Skeleton);
                gh.active = true;
                if (ghAni && ghAni.isValid) {
                    let personLevel = info.Level;
                    if (personLevel > 0) {
                        gh.color = cc.Color.WHITE;
                        let arr = ["", "y", "p", "r"];
                        ghAni.setSkin(arr[Math.ceil(personLevel / 2)]);
                        ghAni.setAnimation(0, "animation", true);
                    } else {
                        gh.color = cc.Color.BLACK;
                        ghAni.setSkin("r");
                        ghAni.setAnimation(0, "animation", true);
                    }
                }
            }
        }
    }

    /** 显示闪电 */
    setSD(id) {
        let info = cocosz.dataMgr.getGunInfo(id);
        this.node.walk((child) => {
            if (child.name == "sd") {
                if (info.Level > 0) {
                    child.active = true;
                    let spAni = child.getComponent(sp.Skeleton);
                    if (spAni) {
                        let arr = ["", "y", "p", "r"];
                        spAni && spAni.setSkin(arr[info.Level]);
                    }
                } else {
                    child.active = false;
                }
            }
        }, null);
    }
}

