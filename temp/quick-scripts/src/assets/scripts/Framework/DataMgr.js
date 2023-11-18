"use strict";
cc._RF.push(module, '0b76fObtN5FOKzSrvF3Frcp', 'DataMgr');
// scripts/Framework/DataMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weapon_1 = require("../Game/weapon");
var Constant_1 = require("./Constant");
/**
 * 数据管理类
 */
var DataMgr = /** @class */ (function () {
    function DataMgr() {
        this._dataPool = {};
    }
    Object.defineProperty(DataMgr, "inst", {
        get: function () {
            if (!DataMgr._inst) {
                DataMgr._inst = new DataMgr();
            }
            return DataMgr._inst;
        },
        enumerable: false,
        configurable: true
    });
    DataMgr.prototype.init = function () {
        // cc.sys.localStorage.clear();
        if (cc.sys.localStorage.getItem(Constant_1.default.ST_GameData)) {
            this._dataPool = JSON.parse(cc.sys.localStorage.getItem(Constant_1.default.ST_GameData));
        }
        else {
            // 初始金币
            this._dataPool[Constant_1.default.ST_CoinCount] = "1000";
            // 初始钻石
            this._dataPool[Constant_1.default.ST_DiamondCount] = "0";
            //初始化皮肤
            this._dataPool[Constant_1.default.ST_CurSkinId] = "0";
            //初始化武器
            this._dataPool[Constant_1.default.ST_CurMeleeId] = "13";
            this._dataPool[Constant_1.default.ST_CurRangeId] = "0";
            //初始签到信息
            this._dataPool[Constant_1.default.ST_LastDailyBonusIndex] = "-1";
            this._dataPool[Constant_1.default.ST_LastDailyBonusTime] = "0";
            //初始化关卡信息
            this._initLevelData();
            // 初始化皮肤数据
            this._initSkinData();
            //初始化枪械数据
            this._initGunData();
            this._save();
        }
    };
    /**
      * 初始化关卡信息
      */
    DataMgr.prototype._initLevelData = function () {
        "";
        var levelItemObj = {};
        // 简单
        var levelitem = new Constant_1.Levelitem("{\"Id\":\"" + 1001 + "\",\"State\":\"" + 1 + "\",\"Grade\":\"0\"}");
        levelItemObj["1001"] = levelitem;
        for (var i = 1002; i <= 1000 + Constant_1.default.CT_TotalLevelCount; i++) {
            var levelitem_1 = new Constant_1.Levelitem("{\"Id\":\"" + i + "\",\"State\":\"" + 0 + "\",\"Grade\":\"0\"}");
            levelItemObj[i.toString()] = levelitem_1;
        }
        // 困难
        for (var i = 2001; i <= 2000 + Constant_1.default.CT_TotalLevelCount; i++) {
            var levelitem_2 = new Constant_1.Levelitem("{\"Id\":\"" + i + "\",\"State\":\"" + 0 + "\",\"Grade\":\"0\"}");
            levelItemObj[i.toString()] = levelitem_2;
        }
        // 英雄
        for (var i = 3001; i <= 3000 + Constant_1.default.CT_TotalLevelCount; i++) {
            var levelitem_3 = new Constant_1.Levelitem("{\"Id\":\"" + i + "\",\"State\":\"" + 0 + "\",\"Grade\":\"0\"}");
            levelItemObj[i.toString()] = levelitem_3;
        }
        this._dataPool[Constant_1.default.ST_LevelItem] = JSON.stringify(levelItemObj);
    };
    DataMgr.prototype._initSkinData = function () {
        // 皮肤数据读表
        var price = [0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
        var skinInfoArr = [];
        var skinInfo = new Constant_1.SkinInfo("{\"Id\":\"" + 0 + "\",\"State\":\"2\",\"Price\":\"" + price[0] + "\",\"Level\":\"0\",\"VideoCount\":\"0\"}");
        skinInfoArr.push(skinInfo);
        for (var i = 1; i < price.length; i++) {
            var skinInfo_1 = new Constant_1.SkinInfo("{\"Id\":\"" + i + "\",\"State\":\"0\",\"Price\":\"" + price[i] + "\",\"Level\":\"0\",\"VideoCount\":\"0\"}");
            skinInfoArr.push(skinInfo_1);
        }
        this._dataPool[Constant_1.default.ST_SkinInfo] = JSON.stringify(skinInfoArr);
    };
    DataMgr.prototype._initGunData = function () {
        // 武器数据读表
        var price = [
            0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 0, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 1000, 1000
        ];
        var gunInfoArr = [];
        for (var i = 0; i < price.length; i++) {
            var gunInfo = null;
            if (i == 0 || i == 13) {
                gunInfo = new Constant_1.GunInfo("{\"Id\":\"" + i + "\",\"State\":\"2\",\"Price\":\"" + price[i] + "\",\"Level\":\"0\",\"VideoCount\":\"0\"}");
            }
            else {
                gunInfo = new Constant_1.GunInfo("{\"Id\":\"" + i + "\",\"State\":\"0\",\"Price\":\"" + price[i] + "\",\"Level\":\"0\",\"VideoCount\":\"0\"}");
            }
            gunInfoArr.push(gunInfo);
        }
        this._dataPool[Constant_1.default.ST_GunInfo] = JSON.stringify(gunInfoArr);
    };
    Object.defineProperty(DataMgr.prototype, "AudioOn", {
        //////////////////////////////////////////////////// 当前使用
        /** 声音开关 */
        get: function () {
            return this.getItem(Constant_1.default.ST_AudioOn, "1") == "1";
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_AudioOn, value ? "1" : "0");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "ShakeOn", {
        /** 震动开关 */
        get: function () {
            return this.getItem(Constant_1.default.ST_ShakeOn, "1") == "1";
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_ShakeOn, value ? "1" : "0");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "CoinCount", {
        /** 金币数据 */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_CoinCount, "0"));
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_CoinCount, value + "");
            cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_COIN_CHANGE });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "DiamondCount", {
        /** 取钻石数据 */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_DiamondCount, "0"));
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_DiamondCount, value + "");
            cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_Diamond_CHANGE });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "TotoalCount_6", {
        /** 总局数_割草模式 */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_TotoalCount + "6", "1"));
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_TotoalCount + "6", value + "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "LastDailyBonusIndex", {
        /** 最后奖励的天数 */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_LastDailyBonusIndex, "-1"));
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_LastDailyBonusIndex, value + "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "LastDailyBonusTime", {
        /** 最后一次签到的时间 */
        get: function () {
            return this.getItem(Constant_1.default.ST_LastDailyBonusTime, "0");
        },
        set: function (value) {
            this.setItem(Constant_1.default.ST_LastDailyBonusTime, value + "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "LastLoadDate", {
        /** 加载游戏日期 */
        get: function () {
            return this.getItem(Constant_1.default.ST_LastLoadDate, "");
        },
        set: function (v) {
            this.setItem(Constant_1.default.ST_LastLoadDate, v);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "OnlineToday", {
        /** 今日在线时间 */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_OnlineToday, "0"));
        },
        set: function (v) {
            this.setItem(Constant_1.default.ST_OnlineToday, v + "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "receiveToday", {
        /** 今日在线奖励领取数量 */
        get: function () {
            return JSON.parse(this.getItem(Constant_1.default.ST_ReceiveToday, "[0, 0, 0, 0, 0]"));
        },
        set: function (v) {
            this.setItem(Constant_1.default.ST_ReceiveToday, JSON.stringify(v));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "CurSkinId", {
        /**
         * 当前皮肤ID
         */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_CurSkinId, "0"));
        },
        /**
         * 设置当前皮肤ID
         */
        set: function (value) {
            if (value == this.CurSkinId) {
                return;
            }
            var preId = this.CurSkinId;
            var skinInfo = this.getSkinInfo(preId);
            if (skinInfo) {
                skinInfo.State = 1;
                this.setSkinInfo(preId, skinInfo);
            }
            var curSkinInfo = this.getSkinInfo(value);
            if (curSkinInfo) {
                curSkinInfo.State = 2;
                this.setSkinInfo(value, curSkinInfo);
            }
            this.setItem(Constant_1.default.ST_CurSkinId, value + "");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取皮肤信息
     * @param id 皮肤ID
     */
    DataMgr.prototype.getSkinInfo = function (id) {
        var skinInfos = this.getItem(Constant_1.default.ST_SkinInfo, "");
        if (skinInfos) {
            var skinInfoArr = JSON.parse(skinInfos);
            if (id >= 0 && id < skinInfoArr.length) {
                return skinInfoArr[id];
            }
        }
        return null;
    };
    /**
     * 保存皮肤信息
     * @param id 皮肤ID
     * @param info  皮肤信息
     */
    DataMgr.prototype.setSkinInfo = function (id, info) {
        var skinInfos = this.getItem(Constant_1.default.ST_SkinInfo, "");
        if (skinInfos) {
            var skinInfoArr = JSON.parse(skinInfos);
            if (id >= 0 && id < skinInfoArr.length) {
                skinInfoArr[id] = info;
                this.setItem(Constant_1.default.ST_SkinInfo, JSON.stringify(skinInfoArr));
            }
        }
    };
    /**
     * 随机获取3个未解锁的皮肤id
     */
    DataMgr.prototype.getRandomLockSkin = function () {
        var ids = [];
        var skinInfos = this.getItem(Constant_1.default.ST_SkinInfo, "");
        if (skinInfos) {
            var skinInfoArr = JSON.parse(skinInfos);
            for (var i = 0; i < skinInfoArr.length; i++) {
                if (skinInfoArr[i].State == 0) {
                    ids.push(skinInfoArr[i].Id);
                }
            }
        }
        return ids;
    };
    /**
     * 获取武器信息
     * @param id 武器ID
     */
    DataMgr.prototype.getGunInfo = function (id) {
        var gunInfos = this.getItem(Constant_1.default.ST_GunInfo, "");
        if (gunInfos) {
            var gunInfoArr = JSON.parse(gunInfos);
            if (id >= 0 && id < gunInfoArr.length) {
                return gunInfoArr[id];
            }
        }
        return null;
    };
    /**
     * 保存武器信息
     * @param id 皮肤ID
     * @param info  皮肤信息
     */
    DataMgr.prototype.setGunInfo = function (id, info) {
        var gunInfos = this.getItem(Constant_1.default.ST_GunInfo, "");
        if (gunInfos) {
            var gunInfoArr = JSON.parse(gunInfos);
            if (id >= 0 && id < gunInfoArr.length) {
                gunInfoArr[id] = info;
                this.setItem(Constant_1.default.ST_GunInfo, JSON.stringify(gunInfoArr));
            }
        }
    };
    Object.defineProperty(DataMgr.prototype, "CurMelee", {
        /**
        * 当前近战武器
        */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_CurMeleeId, "13"));
        },
        set: function (id) {
            if (id == this.CurMelee || !weapon_1.default.meleeWaapon.includes(id + 1)) {
                return;
            }
            var preId = this.CurMelee;
            var gunInfo = this.getGunInfo(preId);
            if (gunInfo) {
                gunInfo.State = 1;
                this.setGunInfo(preId, gunInfo);
            }
            var curGunInfo = this.getGunInfo(id);
            if (curGunInfo) {
                curGunInfo.State = 2;
                this.setGunInfo(id, curGunInfo);
            }
            this.setItem(Constant_1.default.ST_CurMeleeId, id + "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "CurRange", {
        /**
        * 当前远程武器
        */
        get: function () {
            return parseInt(this.getItem(Constant_1.default.ST_CurRangeId, "0"));
        },
        set: function (id) {
            if (id == this.CurRange || !weapon_1.default.rangeWeapon.includes(id + 1)) {
                return;
            }
            var preId = this.CurRange;
            var gunInfo = this.getGunInfo(preId);
            if (gunInfo) {
                gunInfo.State = 1;
                this.setGunInfo(preId, gunInfo);
            }
            var curGunInfo = this.getGunInfo(id);
            if (curGunInfo) {
                curGunInfo.State = 2;
                this.setGunInfo(id, curGunInfo);
            }
            this.setItem(Constant_1.default.ST_CurRangeId, id + "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "curWeapon", {
        get: function () {
            return this.CurRange;
        },
        set: function (id) {
            if (weapon_1.default.meleeWaapon.includes(id + 1)) {
                this.CurMelee = id;
            }
            else if (weapon_1.default.rangeWeapon.includes(id + 1)) {
                this.CurRange = id;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "guide_skill", {
        /** 技能指引 */
        get: function () {
            return this.getItem(Constant_1.default.ST_Guide_Skill, true);
        },
        /** 技能指引 */
        set: function (value) {
            this.setItem(Constant_1.default.ST_Guide_Skill, value);
            cc.game.emit(Constant_1.default.E_ShareOrVideo);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "best_time", {
        ///////////////// 历史最佳 //////////////////////
        // 游戏时间
        get: function () {
            return parseInt(this.getItem("best_time", "0"));
        },
        set: function (v) {
            if (v > this.best_time) {
                this.setItem("best_time", v + "");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "best_kill", {
        // 击杀数
        get: function () {
            return parseInt(this.getItem("best_kill", "0"));
        },
        set: function (v) {
            if (v > this.best_kill) {
                this.setItem("best_kill", v + "");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "best_level", {
        // 等级
        get: function () {
            return parseInt(this.getItem("best_level", "0"));
        },
        set: function (v) {
            if (v > this.best_level) {
                this.setItem("best_level", v + "");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "best_coin", {
        // 金币
        get: function () {
            return parseInt(this.getItem("best_coin", "0"));
        },
        set: function (v) {
            if (v > this.best_coin) {
                this.setItem("best_coin", v + "");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMgr.prototype, "shareNum", {
        // 分享次数
        get: function () {
            return this.getItem(Constant_1.default.ST_ShareNum, 0);
        },
        set: function (v) {
            this.setItem(Constant_1.default.ST_ShareNum, v);
            // 发送事件更新图标
            cc.game.emit(Constant_1.default.E_ShareOrVideo);
            cc.log("今日分享了", v, "次");
        },
        enumerable: false,
        configurable: true
    });
    ////////////////////////////////////////////////////////////////////////////////
    DataMgr.prototype.getItem = function (key, defaultValue) {
        if (this._dataPool[key] != undefined && this._dataPool[key] != null) {
            return this._dataPool[key];
        }
        return defaultValue;
    };
    DataMgr.prototype.setItem = function (key, value) {
        this._dataPool[key] = value;
        this._save();
    };
    DataMgr.prototype._save = function () {
        cc.sys.localStorage.setItem(Constant_1.default.ST_GameData, JSON.stringify(this._dataPool));
    };
    return DataMgr;
}());
exports.default = DataMgr;

cc._RF.pop();