
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/ani.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcYW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUM3Qyx1Q0FBa0M7QUFDbEMsbUNBQThCO0FBRXhCLElBQUEsS0FBd0QsRUFBRSxDQUFDLFVBQVUsRUFBbkUsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsV0FBVyxpQkFBa0IsQ0FBQztBQUs1RTtJQUFpQyx1QkFBWTtJQUE3QztRQUFBLHFFQXlTQztRQXZTRyxXQUFLLEdBQVcsRUFBRSxDQUFDO1FBR25CLGdCQUFVLEdBQWMsRUFBRSxDQUFDO1FBRTNCLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFRekIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQVMxQixlQUFTLEdBQVksS0FBSyxDQUFDO1FBUTNCLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFRekIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQVF6QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBUTFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFRbkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixVQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFDcEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixVQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFheEIsYUFBTyxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFN0IsUUFBRSxHQUFXLENBQUMsQ0FBQyxDQUFBLElBQUk7UUFDbkIsWUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFBLEtBQUs7UUFDeEIsYUFBTyxHQUFZLEtBQUssQ0FBQyxDQUFBLE1BQU07UUFDL0IsYUFBTyxHQUFVLEVBQUUsQ0FBQyxDQUFBLE1BQU07O0lBa050QyxDQUFDO0lBalNHLHNCQUFJLHVCQUFNO2FBQVYs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IiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IEdhbWVEYXRlIGZyb20gXCIuL2dhbWVEYXRlXCI7XHJcbmltcG9ydCBXZWFwb24gZnJvbSBcIi4vd2VhcG9uXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgcGxheU9uRm9jdXMgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuQHBsYXlPbkZvY3VzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLpl7TpmpTluKfmlbBcIiB9KVxyXG4gICAgdGltZXM6IG51bWJlciA9IDEwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5Ob2RlXSwgZGlzcGxheU5hbWU6IFwi5Yqo55S75pWw57uEXCIgfSlcclxuICAgIGFuaU5vZGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIF9idG5BZGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGdldCBidG5BZGQoKSB7IHJldHVybiB0aGlzLl9idG5BZGQ7IH1cclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIua3u+WKoOWKqOeUu1wiIH0pXHJcbiAgICBzZXQgYnRuQWRkKHYpIHtcclxuICAgICAgICB0aGlzLmFuaU5vZGVBcnIgPSBbXTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4uZm9yRWFjaCgobikgPT4geyB0aGlzLmFuaU5vZGVBcnIucHVzaChuKTsgfSlcclxuICAgIH1cclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuWBnOatouWKqOeUu1wiIH0pXHJcbiAgICBfYnRuU3RvcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZ2V0IGJ0blN0b3AoKSB7IHJldHVybiB0aGlzLl9idG5TdG9wOyB9XHJcbiAgICBAcHJvcGVydHlcclxuICAgIHNldCBidG5TdG9wKHYpIHtcclxuICAgICAgICB0aGlzLl9idG5TdG9wID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQW5pKCk7XHJcbiAgICAgICAgdGhpcy5hbmlOb2RlQXJyLmZvckVhY2goKG5vZGU6IGNjLk5vZGUpID0+IHsgbm9kZS5vcGFjaXR5ID0gMjU1OyB9LCBudWxsKVxyXG4gICAgfVxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5b6F5py65Yqo55S7XCIgfSlcclxuICAgIF9idG5EYWlqaTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZ2V0IGJ0bkRhaWppKCkgeyByZXR1cm4gdGhpcy5fYnRuRGFpamk7IH1cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgc2V0IGJ0bkRhaWppKHYpIHtcclxuICAgICAgICB0aGlzLl9idG5EYWlqaSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkQW5pKFwiZGFpamlcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi6LeR5q2l5Yqo55S7XCIgfSlcclxuICAgIF9idG5SdW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGdldCBidG5SdW4oKSB7IHJldHVybiB0aGlzLl9idG5SdW47IH1cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgc2V0IGJ0blJ1bih2KSB7XHJcbiAgICAgICAgdGhpcy5fYnRuUnVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRBbmkoXCJydW5cIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5pS75Ye75Yqo55S7XCIgfSlcclxuICAgIF9idG5BdGs6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGdldCBidG5BdGsoKSB7IHJldHVybiB0aGlzLl9idG5BdGs7IH1cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgc2V0IGJ0bkF0ayh2KSB7XHJcbiAgICAgICAgdGhpcy5fYnRuQXRrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRBbmkoXCJhdGtcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5pS75Ye75Yqo55S7MlwiIH0pXHJcbiAgICBfYnRuQXRrMjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZ2V0IGJ0bkF0azIoKSB7IHJldHVybiB0aGlzLl9idG5BdGsyOyB9XHJcbiAgICBAcHJvcGVydHlcclxuICAgIHNldCBidG5BdGsyKHYpIHtcclxuICAgICAgICB0aGlzLl9idG5BdGsyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRBbmkoXCJhdGsyXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuatu+S6oeWKqOeUuzJcIiB9KVxyXG4gICAgX2J0bkRlYXRoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBnZXQgYnRuRGVhdGgoKSB7IHJldHVybiB0aGlzLl9idG5BdGsyOyB9XHJcbiAgICBAcHJvcGVydHlcclxuICAgIHNldCBidG5EZWF0aCh2KSB7XHJcbiAgICAgICAgdGhpcy5fYnRuRGVhdGggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZEFuaShcImRlYXRoXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRMZWZ0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgYm9keTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGxlZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGhhbmRSaWdodDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGhlYWQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB3ZWFwb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmhhbmRMZWZ0ID0gY2MuZmluZChcImhhbmRMZWZ0XCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gY2MuZmluZChcImJvZHlcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmxlZyA9IGNjLmZpbmQoXCJsZWdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmhhbmRSaWdodCA9IGNjLmZpbmQoXCJoYW5kUmlnaHRcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmhlYWQgPSBjYy5maW5kKFwiaGVhZFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gY2MuZmluZChcIndlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkgeyB9XHJcblxyXG4gICAgcHVibGljIGFuaU5vZGU6IGNjLk5vZGUgPSBudWxsOy8v5Yqo55S76IqC54K5XHJcblxyXG4gICAgcHJpdmF0ZSBfdDogbnVtYmVyID0gMDsvL+iuoeaXtlxyXG4gICAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlciA9IDA7Ly/liqjnlLvluKdcclxuICAgIHByaXZhdGUgX2lzTG9vcDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5b6q546vXHJcbiAgICBwcml2YXRlIF9hbmlBcnI6IGFueVtdID0gW107Ly/liqjnlLvmlbDnu4RcclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDliqjnlLvlkI0gXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIHRpbWUg5Yqo55S76Ze06ZqUXHJcbiAgICAgKi9cclxuICAgIHNldEFuaShuYW1lOiBzdHJpbmcsIGlzTG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgLy8g5riF56m65Yqo55S75pWw57uEXHJcbiAgICAgICAgdGhpcy5fYW5pQXJyID0gW107XHJcbiAgICAgICAgLy8g5pKt5pS+5Yqo55S7XHJcbiAgICAgICAgdGhpcy5wbGF5QW5pKG5hbWUsIGlzTG9vcCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg5Yqo55S75ZCNIFxyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqIEBwYXJhbSB0aW1lIOWKqOeUu+mXtOmalFxyXG4gICAgICovXHJcbiAgICBhZGRBbmkobmFtZTogc3RyaW5nLCBpc0xvb3A6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5hbmlOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaUFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBpc0xvb3A6IGlzTG9vcCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmkq3mlL7liqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pKG5hbWUsIGlzTG9vcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlgZzmraLliqjnlLsgKi9cclxuICAgIHB1YmxpYyBzdG9wQW5pKCkge1xyXG4gICAgICAgIC8vIOa4heepuuWKqOeUu+aVsOe7hFxyXG4gICAgICAgIHRoaXMuX2FuaUFyciA9IFtdO1xyXG4gICAgICAgIC8vIOWBnOatouWKqOeUu1xyXG4gICAgICAgIHRoaXMuYW5pTm9kZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYr+WQpuWMheWQq+WKqOeUuyAqL1xyXG4gICAgcHVibGljIGluY2x1ZGVBbmkobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaU5vZGVBcnIuZm9yRWFjaChuID0+IHtcclxuICAgICAgICAgICAgaWYgKG4ubmFtZSA9PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgciA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5piv5ZCm5q2j5Zyo5pKt5pS+ICovXHJcbiAgICBwdWJsaWMgaXNBbmkobmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmFuaU5vZGUgJiYgKCghbmFtZSkgfHwgKG5hbWUgJiYgdGhpcy5hbmlOb2RlLm5hbWUuaW5jbHVkZXMobmFtZSkpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheUFuaShuYW1lOiBzdHJpbmcsIGlzTG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hbmlOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdCA9IDA7XHJcbiAgICAgICAgLy8g6ZqQ6JeP5YW25a6D5Yqo55S7XHJcbiAgICAgICAgdGhpcy5hbmlOb2RlQXJyLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaU5vZGUgPSBjaGlsZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDlvqrnjq/mkq3mlL5cclxuICAgICAgICB0aGlzLl9pc0xvb3AgPSBpc0xvb3A7XHJcbiAgICAgICAgLy8g6L6T5Ye6XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pTm9kZSkge1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCLmkq3mlL7liqjnlLvvvJpcIiwgbmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKFwi5Yqo55S75LiN5a2Y5Zyo77yaXCIgKyBuYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbGF0ZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5hbmlOb2RlICYmIHRoaXMuYW5pTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90ICUgdGhpcy50aW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ID0gMFxyXG4gICAgICAgICAgICAgICAgLy8g5YiH5o2i5Zu+54mHXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaU5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IHRoaXMuX2luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIOWKqOeUu+W4pysrXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5Yqo55S7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gdGhpcy5hbmlOb2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNMb29wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW+queOr+eahOW9k+WJjeWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9hbmlBcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkuIvkuIDkuKrliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpzb24gPSB0aGlzLl9hbmlBcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QW5pKGpzb24ubmFtZSwganNvbi5pc0xvb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOe7k+adn+WKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaU5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOW4p+iHquWinlxyXG4gICAgICAgICAgICB0aGlzLl90Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFNraW5CeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldFNraW5CeU5hbWUoKGlkICsgMSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRHaChpZCk7XHJcbiAgICB9XHJcbiAgICBzZXRTa2luQnlOYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaGVhZC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0V2VhcG9uQnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRXZWFwb25CeU5hbWUoV2VhcG9uLldlYXBvbk5hbWVbaWRdKTtcclxuICAgICAgICB0aGlzLnNldFNEKGlkKTtcclxuICAgIH1cclxuICAgIHNldFdlYXBvbkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoR2FtZURhdGUuV2VhcG9uW25hbWVdLmF0a1JhbmdlID4gMzAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZExlZnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZFJpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBwcmUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhgd2VhcG9uXyR7bmFtZX1gLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuZ2VXZWFwb24gPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAgICAgcmFuZ2VXZWFwb24ucmVtb3ZlQ29tcG9uZW50KFdlYXBvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi5jaGlsZHJlblswXSAmJiB0aGlzLndlYXBvbi5jaGlsZHJlblswXS5pc1ZhbGlkICYmIHRoaXMud2VhcG9uLmNoaWxkcmVuWzBdLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLmFkZENoaWxkKHJhbmdlV2VhcG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRMZWZ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZFJpZ2h0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKGB3ZWFwb25fJHtuYW1lfWAsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIGlmIChwcmUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZWxlZVdlYXBvbjogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZSk7XHJcbiAgICAgICAgICAgICAgICBtZWxlZVdlYXBvbi5yZW1vdmVDb21wb25lbnQoV2VhcG9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZFJpZ2h0LmNoaWxkcmVuWzBdICYmIHRoaXMuaGFuZFJpZ2h0LmNoaWxkcmVuWzBdLmlzVmFsaWQgJiYgdGhpcy5oYW5kUmlnaHQuY2hpbGRyZW5bMF0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kUmlnaHQuYWRkQ2hpbGQobWVsZWVXZWFwb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmmL7npLrlhYnnjq8gKi9cclxuICAgIHNldEdoKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZ2ggPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnaFwiKTtcclxuICAgICAgICBpZiAoZ2ggJiYgZ2guaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IGNvY29zei5kYXRhTWdyLmdldFNraW5JbmZvKGlkKTtcclxuICAgICAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgICAgIGxldCBnaEFuaSA9IGdoLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBnaC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdoQW5pICYmIGdoQW5pLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyc29uTGV2ZWwgPSBpbmZvLkxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJzb25MZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2guY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IFtcIlwiLCBcInlcIiwgXCJwXCIsIFwiclwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2hBbmkuc2V0U2tpbihhcnJbTWF0aC5jZWlsKHBlcnNvbkxldmVsIC8gMildKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2hBbmkuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdoLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdoQW5pLnNldFNraW4oXCJyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnaEFuaS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmmL7npLrpl6rnlLUgKi9cclxuICAgIHNldFNEKGlkKSB7XHJcbiAgICAgICAgbGV0IGluZm8gPSBjb2Nvc3ouZGF0YU1nci5nZXRHdW5JbmZvKGlkKTtcclxuICAgICAgICB0aGlzLm5vZGUud2FsaygoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT0gXCJzZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5MZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcEFuaSA9IGNoaWxkLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwQW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXCJcIiwgXCJ5XCIsIFwicFwiLCBcInJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwQW5pICYmIHNwQW5pLnNldFNraW4oYXJyW2luZm8uTGV2ZWxdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbnVsbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==