"use strict";
cc._RF.push(module, '9dc96Ec8p5F1pk+wC5O4y90', 'ani');
// scripts/Game/ani.ts

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
var CocosZ_1 = require("../Framework/CocosZ");
var gameDate_1 = require("./gameDate");
var weapon_1 = require("./weapon");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, playOnFocus = _a.playOnFocus;
var Ani = /** @class */ (function (_super) {
    __extends(Ani, _super);
    function Ani() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.times = 10;
        _this.aniNodeArr = [];
        _this._btnAdd = false;
        _this._btnStop = false;
        _this._btnDaiji = false;
        _this._btnRun = false;
        _this._btnAtk = false;
        _this._btnAtk2 = false;
        _this._btnDeath = false;
        _this.handLeft = null;
        _this.body = null;
        _this.leg = null;
        _this.handRight = null;
        _this.head = null;
        _this.weapon = null;
        _this.aniNode = null; //动画节点
        _this._t = 0; //计时
        _this._index = 0; //动画帧
        _this._isLoop = false; //是否循环
        _this._aniArr = []; //动画数组
        return _this;
    }
    Object.defineProperty(Ani.prototype, "btnAdd", {
        get: function () { return this._btnAdd; },
        set: function (v) {
            var _this = this;
            this.aniNodeArr = [];
            this.node.children.forEach(function (n) { _this.aniNodeArr.push(n); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ani.prototype, "btnStop", {
        get: function () { return this._btnStop; },
        set: function (v) {
            this._btnStop = false;
            this.stopAni();
            this.aniNodeArr.forEach(function (node) { node.opacity = 255; }, null);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ani.prototype, "btnDaiji", {
        get: function () { return this._btnDaiji; },
        set: function (v) {
            this._btnDaiji = false;
            this.addAni("daiji", false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ani.prototype, "btnRun", {
        get: function () { return this._btnRun; },
        set: function (v) {
            this._btnRun = false;
            this.addAni("run", false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ani.prototype, "btnAtk", {
        get: function () { return this._btnAtk; },
        set: function (v) {
            this._btnAtk = false;
            this.addAni("atk", false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ani.prototype, "btnAtk2", {
        get: function () { return this._btnAtk2; },
        set: function (v) {
            this._btnAtk2 = false;
            this.addAni("atk2", false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ani.prototype, "btnDeath", {
        get: function () { return this._btnAtk2; },
        set: function (v) {
            this._btnDeath = false;
            this.addAni("death", false);
        },
        enumerable: false,
        configurable: true
    });
    Ani.prototype.onLoad = function () {
        this.handLeft = cc.find("handLeft", this.node);
        this.body = cc.find("body", this.node);
        this.leg = cc.find("leg", this.node);
        this.handRight = cc.find("handRight", this.node);
        this.head = cc.find("head", this.node);
        this.weapon = cc.find("weapon", this.node);
    };
    Ani.prototype.start = function () { };
    /**
     * 设置动画
     * @param name 动画名
     * @param isLoop 是否循环
     * @param time 动画间隔
     */
    Ani.prototype.setAni = function (name, isLoop) {
        if (isLoop === void 0) { isLoop = false; }
        // 清空动画数组
        this._aniArr = [];
        // 播放动画
        this.playAni(name, isLoop);
    };
    /**
     * 添加动画
     * @param name 动画名
     * @param isLoop 是否循环
     * @param time 动画间隔
     */
    Ani.prototype.addAni = function (name, isLoop) {
        if (this.aniNode) {
            this._aniArr.push({
                name: name,
                isLoop: isLoop,
            });
        }
        else {
            // 播放动画
            this.playAni(name, isLoop);
        }
    };
    /** 停止动画 */
    Ani.prototype.stopAni = function () {
        // 清空动画数组
        this._aniArr = [];
        // 停止动画
        this.aniNode = null;
    };
    /** 是否包含动画 */
    Ani.prototype.includeAni = function (name) {
        var r = false;
        this.aniNodeArr.forEach(function (n) {
            if (n.name == name)
                r = true;
        });
        return r;
    };
    /** 是否正在播放 */
    Ani.prototype.isAni = function (name) {
        if (this.aniNode && ((!name) || (name && this.aniNode.name.includes(name)))) {
            return true;
        }
        else {
            return false;
        }
    };
    Ani.prototype.playAni = function (name, isLoop) {
        var _this = this;
        if (isLoop === void 0) { isLoop = false; }
        this.aniNode = null;
        this._index = 0;
        this._t = 0;
        // 隐藏其它动画
        this.aniNodeArr.forEach(function (child) {
            if (child.name == name) {
                // child.active = true;
                child.active = true;
                child.opacity = 255;
                _this.aniNode = child;
            }
            else {
                // child.active = false;
                child.active = true;
                child.opacity = 0;
            }
        });
        // 循环播放
        this._isLoop = isLoop;
        // 输出
        if (this.aniNode) {
            // cc.log("播放动画：", name);
        }
        else {
            cc.log("动画不存在：" + name);
        }
    };
    Ani.prototype.lateUpdate = function () {
        var _this = this;
        if (this.aniNode && this.aniNode.isValid) {
            if (this._t % this.times == 0) {
                this._t = 0;
                // 切换图片
                this.aniNode.children.forEach(function (child, index) {
                    if (index == _this._index) {
                        child.opacity = 255;
                    }
                    else {
                        child.opacity = 0;
                    }
                });
                // 动画帧++
                this._index++;
                // 判断动画
                if (this._index >= this.aniNode.childrenCount) {
                    if (this._isLoop) {
                        // 循环的当前动画
                        this._index = 0;
                    }
                    else if (this._aniArr.length > 0) {
                        // 下一个动画
                        var json = this._aniArr.shift();
                        this.playAni(json.name, json.isLoop);
                    }
                    else {
                        // 结束动画
                        this.aniNode = null;
                        this._index = 0;
                    }
                }
            }
            // 帧自增
            this._t++;
        }
    };
    Ani.prototype.setSkinById = function (id) {
        this.setSkinByName((id + 1).toString());
        this.setGh(id);
    };
    Ani.prototype.setSkinByName = function (name) {
        this.head.children.forEach(function (child) {
            if (child.name == name) {
                child.active = true;
                child.opacity = 255;
            }
            else {
                // child.active = false;
                child.active = true;
                child.opacity = 0;
            }
        });
    };
    Ani.prototype.setWeaponById = function (id) {
        this.setWeaponByName(weapon_1.default.WeaponName[id]);
        this.setSD(id);
    };
    Ani.prototype.setWeaponByName = function (name) {
        if (gameDate_1.default.Weapon[name].atkRange > 300) {
            this.weapon.active = true;
            this.handLeft.active = false;
            this.handRight.active = false;
            var pre = CocosZ_1.cocosz.resMgr.getRes("weapon_" + name, cc.Prefab);
            if (pre) {
                var rangeWeapon = cc.instantiate(pre);
                rangeWeapon.removeComponent(weapon_1.default);
                this.weapon.children[0] && this.weapon.children[0].isValid && this.weapon.children[0].destroy();
                this.weapon.addChild(rangeWeapon);
            }
        }
        else {
            this.weapon.active = false;
            this.handLeft.active = true;
            this.handRight.active = true;
            var pre = CocosZ_1.cocosz.resMgr.getRes("weapon_" + name, cc.Prefab);
            if (pre) {
                var meleeWeapon = cc.instantiate(pre);
                meleeWeapon.removeComponent(weapon_1.default);
                this.handRight.children[0] && this.handRight.children[0].isValid && this.handRight.children[0].destroy();
                this.handRight.addChild(meleeWeapon);
            }
        }
    };
    /** 显示光环 */
    Ani.prototype.setGh = function (id) {
        var gh = this.node.getChildByName("gh");
        if (gh && gh.isValid) {
            var info = CocosZ_1.cocosz.dataMgr.getSkinInfo(id);
            if (info) {
                var ghAni = gh.getComponent(sp.Skeleton);
                gh.active = true;
                if (ghAni && ghAni.isValid) {
                    var personLevel = info.Level;
                    if (personLevel > 0) {
                        gh.color = cc.Color.WHITE;
                        var arr = ["", "y", "p", "r"];
                        ghAni.setSkin(arr[Math.ceil(personLevel / 2)]);
                        ghAni.setAnimation(0, "animation", true);
                    }
                    else {
                        gh.color = cc.Color.BLACK;
                        ghAni.setSkin("r");
                        ghAni.setAnimation(0, "animation", true);
                    }
                }
            }
        }
    };
    /** 显示闪电 */
    Ani.prototype.setSD = function (id) {
        var info = CocosZ_1.cocosz.dataMgr.getGunInfo(id);
        this.node.walk(function (child) {
            if (child.name == "sd") {
                if (info.Level > 0) {
                    child.active = true;
                    var spAni = child.getComponent(sp.Skeleton);
                    if (spAni) {
                        var arr = ["", "y", "p", "r"];
                        spAni && spAni.setSkin(arr[info.Level]);
                    }
                }
                else {
                    child.active = false;
                }
            }
        }, null);
    };
    __decorate([
        property({ displayName: "间隔帧数" })
    ], Ani.prototype, "times", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "动画数组" })
    ], Ani.prototype, "aniNodeArr", void 0);
    __decorate([
        property()
    ], Ani.prototype, "_btnAdd", void 0);
    __decorate([
        property({ displayName: "添加动画" })
    ], Ani.prototype, "btnAdd", null);
    __decorate([
        property({ displayName: "停止动画" })
    ], Ani.prototype, "_btnStop", void 0);
    __decorate([
        property
    ], Ani.prototype, "btnStop", null);
    __decorate([
        property({ displayName: "待机动画" })
    ], Ani.prototype, "_btnDaiji", void 0);
    __decorate([
        property
    ], Ani.prototype, "btnDaiji", null);
    __decorate([
        property({ displayName: "跑步动画" })
    ], Ani.prototype, "_btnRun", void 0);
    __decorate([
        property
    ], Ani.prototype, "btnRun", null);
    __decorate([
        property({ displayName: "攻击动画" })
    ], Ani.prototype, "_btnAtk", void 0);
    __decorate([
        property
    ], Ani.prototype, "btnAtk", null);
    __decorate([
        property({ displayName: "攻击动画2" })
    ], Ani.prototype, "_btnAtk2", void 0);
    __decorate([
        property
    ], Ani.prototype, "btnAtk2", null);
    __decorate([
        property({ displayName: "死亡动画2" })
    ], Ani.prototype, "_btnDeath", void 0);
    __decorate([
        property
    ], Ani.prototype, "btnDeath", null);
    Ani = __decorate([
        ccclass,
        executeInEditMode,
        playOnFocus
    ], Ani);
    return Ani;
}(cc.Component));
exports.default = Ani;

cc._RF.pop();