import Weapon from "../Game/weapon";
import Constant, { SkinInfo, Levelitem, SkillInfo, GunInfo } from "./Constant";

/**
 * 数据管理类
 */
export default class DataMgr {

    private static _inst: DataMgr;
    public static get inst(): DataMgr {
        if (!DataMgr._inst) {
            DataMgr._inst = new DataMgr();
        }
        return DataMgr._inst;
    }

    private _dataPool: any = {};

    public init() {
        // cc.sys.localStorage.clear();

        if (cc.sys.localStorage.getItem(Constant.ST_GameData)) {
            this._dataPool = JSON.parse(cc.sys.localStorage.getItem(Constant.ST_GameData));
        } else {
            // 初始金币
            this._dataPool[Constant.ST_CoinCount] = "1000";
            // 初始钻石
            this._dataPool[Constant.ST_DiamondCount] = "0";
            //初始化皮肤
            this._dataPool[Constant.ST_CurSkinId] = "0";
            //初始化武器
            this._dataPool[Constant.ST_CurMeleeId] = "13";
            this._dataPool[Constant.ST_CurRangeId] = "0";
            //初始签到信息
            this._dataPool[Constant.ST_LastDailyBonusIndex] = "-1";
            this._dataPool[Constant.ST_LastDailyBonusTime] = "0";

            //初始化关卡信息
            this._initLevelData();
            // 初始化皮肤数据
            this._initSkinData();
            //初始化枪械数据
            this._initGunData();

            this._save();
        }
    }
    /**
      * 初始化关卡信息
      */
    private _initLevelData() {
        ``
        let levelItemObj: { [key: string]: Levelitem } = {};
        // 简单
        let levelitem: Levelitem = new Levelitem(`{"Id":"${1001}","State":"${1}","Grade":"0"}`);
        levelItemObj["1001"] = levelitem;
        for (let i = 1002; i <= 1000 + Constant.CT_TotalLevelCount; i++) {
            let levelitem: Levelitem = new Levelitem(`{"Id":"${i}","State":"${0}","Grade":"0"}`);
            levelItemObj[i.toString()] = levelitem;
        }
        // 困难
        for (let i = 2001; i <= 2000 + Constant.CT_TotalLevelCount; i++) {
            let levelitem: Levelitem = new Levelitem(`{"Id":"${i}","State":"${0}","Grade":"0"}`);
            levelItemObj[i.toString()] = levelitem;
        }
        // 英雄
        for (let i = 3001; i <= 3000 + Constant.CT_TotalLevelCount; i++) {
            let levelitem: Levelitem = new Levelitem(`{"Id":"${i}","State":"${0}","Grade":"0"}`);
            levelItemObj[i.toString()] = levelitem;
        }
        this._dataPool[Constant.ST_LevelItem] = JSON.stringify(levelItemObj);
    }

    private _initSkinData() {
        // 皮肤数据读表
        let price: number[] = [0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
        let skinInfoArr: SkinInfo[] = [];
        let skinInfo: SkinInfo = new SkinInfo(`{"Id":"${0}","State":"2","Price":"${price[0]}","Level":"0","VideoCount":"0"}`);
        skinInfoArr.push(skinInfo);
        for (let i = 1; i < price.length; i++) {
            let skinInfo: SkinInfo = new SkinInfo(`{"Id":"${i}","State":"0","Price":"${price[i]}","Level":"0","VideoCount":"0"}`);
            skinInfoArr.push(skinInfo);
        }
        this._dataPool[Constant.ST_SkinInfo] = JSON.stringify(skinInfoArr);
    }

    private _initGunData() {
        // 武器数据读表
        let price: number[] = [
            0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 0, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 1000, 1000
        ];
        let gunInfoArr: GunInfo[] = [];
        for (let i = 0; i < price.length; i++) {
            let gunInfo: GunInfo = null;
            if (i == 0 || i == 13) {
                gunInfo = new GunInfo(`{"Id":"${i}","State":"2","Price":"${price[i]}","Level":"0","VideoCount":"0"}`);
            } else {
                gunInfo = new GunInfo(`{"Id":"${i}","State":"0","Price":"${price[i]}","Level":"0","VideoCount":"0"}`);
            }
            gunInfoArr.push(gunInfo);
        }
        this._dataPool[Constant.ST_GunInfo] = JSON.stringify(gunInfoArr);
    }

    //////////////////////////////////////////////////// 当前使用
    /** 声音开关 */
    public get AudioOn() {
        return this.getItem(Constant.ST_AudioOn, "1") == "1";
    }
    public set AudioOn(value: boolean) {
        this.setItem(Constant.ST_AudioOn, value ? "1" : "0");
    }
    /** 震动开关 */
    public get ShakeOn(): boolean {
        return this.getItem(Constant.ST_ShakeOn, "1") == "1";
    }
    public set ShakeOn(value: boolean) {
        this.setItem(Constant.ST_ShakeOn, value ? "1" : "0");
    }
    /** 金币数据 */
    public get CoinCount() {
        return parseInt(this.getItem(Constant.ST_CoinCount, "0"));
    }
    public set CoinCount(value: number) {
        this.setItem(Constant.ST_CoinCount, value + "");
        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_COIN_CHANGE });
    }
    /** 取钻石数据 */
    public get DiamondCount() {
        return parseInt(this.getItem(Constant.ST_DiamondCount, "0"));
    }
    public set DiamondCount(value: number) {
        this.setItem(Constant.ST_DiamondCount, value + "");
        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_Diamond_CHANGE });
    }

    /** 总局数_割草模式 */
    public get TotoalCount_6() {
        return parseInt(this.getItem(Constant.ST_TotoalCount + "6", "1"));
    }
    public set TotoalCount_6(value: number) {
        this.setItem(Constant.ST_TotoalCount + "6", value + "");
    }

    /** 最后奖励的天数 */
    public get LastDailyBonusIndex() {
        return parseInt(this.getItem(Constant.ST_LastDailyBonusIndex, "-1"));
    }
    public set LastDailyBonusIndex(value: number) {
        this.setItem(Constant.ST_LastDailyBonusIndex, value + "");
    }

    /** 最后一次签到的时间 */
    public get LastDailyBonusTime() {
        return this.getItem(Constant.ST_LastDailyBonusTime, "0");
    }
    public set LastDailyBonusTime(value: string) {
        this.setItem(Constant.ST_LastDailyBonusTime, value + "");
    }

    /** 加载游戏日期 */
    public get LastLoadDate(): string {
        return this.getItem(Constant.ST_LastLoadDate, "")
    }
    public set LastLoadDate(v: string) {
        this.setItem(Constant.ST_LastLoadDate, v);
    }

    /** 今日在线时间 */
    public get OnlineToday(): number {
        return parseInt(this.getItem(Constant.ST_OnlineToday, "0"));
    }
    public set OnlineToday(v: number) {
        this.setItem(Constant.ST_OnlineToday, v + "");
    }
    /** 今日在线奖励领取数量 */
    public get receiveToday(): number[] {
        return JSON.parse(this.getItem(Constant.ST_ReceiveToday, "[0, 0, 0, 0, 0]"));
    }
    public set receiveToday(v: number[]) {
        this.setItem(Constant.ST_ReceiveToday, JSON.stringify(v));
    }

    /**
     * 当前皮肤ID
     */
    public get CurSkinId() {
        return parseInt(this.getItem(Constant.ST_CurSkinId, "0"));
    }

    /**
     * 设置当前皮肤ID
     */
    public set CurSkinId(value: number) {
        if (value == this.CurSkinId) {
            return;
        }

        let preId: number = this.CurSkinId;
        let skinInfo: SkinInfo = this.getSkinInfo(preId);
        if (skinInfo) {
            skinInfo.State = 1;
            this.setSkinInfo(preId, skinInfo);
        }

        let curSkinInfo: SkinInfo = this.getSkinInfo(value);
        if (curSkinInfo) {
            curSkinInfo.State = 2;
            this.setSkinInfo(value, curSkinInfo);
        }

        this.setItem(Constant.ST_CurSkinId, value + "");
    }

    /**
     * 获取皮肤信息
     * @param id 皮肤ID
     */
    public getSkinInfo(id: number) {
        let skinInfos: string = this.getItem(Constant.ST_SkinInfo, "");
        if (skinInfos) {
            let skinInfoArr: SkinInfo[] = JSON.parse(skinInfos);
            if (id >= 0 && id < skinInfoArr.length) {
                return skinInfoArr[id];
            }
        }
        return null;
    }

    /**
     * 保存皮肤信息
     * @param id 皮肤ID
     * @param info  皮肤信息
     */
    public setSkinInfo(id: number, info: SkinInfo) {
        let skinInfos: string = this.getItem(Constant.ST_SkinInfo, "");
        if (skinInfos) {
            let skinInfoArr: SkinInfo[] = JSON.parse(skinInfos);
            if (id >= 0 && id < skinInfoArr.length) {
                skinInfoArr[id] = info;
                this.setItem(Constant.ST_SkinInfo, JSON.stringify(skinInfoArr));
            }
        }
    }

    /**
     * 随机获取3个未解锁的皮肤id
     */
    public getRandomLockSkin() {
        let ids: number[] = [];
        let skinInfos: string = this.getItem(Constant.ST_SkinInfo, "");
        if (skinInfos) {
            let skinInfoArr: SkinInfo[] = JSON.parse(skinInfos);
            for (let i = 0; i < skinInfoArr.length; i++) {
                if (skinInfoArr[i].State == 0) {
                    ids.push(skinInfoArr[i].Id);
                }
            }
        }
        return ids;
    }

    /**
     * 获取武器信息
     * @param id 武器ID
     */
    public getGunInfo(id: number) {
        let gunInfos: string = this.getItem(Constant.ST_GunInfo, "");
        if (gunInfos) {
            let gunInfoArr: GunInfo[] = JSON.parse(gunInfos);
            if (id >= 0 && id < gunInfoArr.length) {
                return gunInfoArr[id];
            }
        }
        return null;
    }


    /**
     * 保存武器信息
     * @param id 皮肤ID
     * @param info  皮肤信息
     */
    public setGunInfo(id: number, info: GunInfo) {
        let gunInfos: string = this.getItem(Constant.ST_GunInfo, "");
        if (gunInfos) {
            let gunInfoArr: GunInfo[] = JSON.parse(gunInfos);
            if (id >= 0 && id < gunInfoArr.length) {
                gunInfoArr[id] = info;
                this.setItem(Constant.ST_GunInfo, JSON.stringify(gunInfoArr));
            }
        }
    }

    /**
    * 当前近战武器
    */
    public get CurMelee() {
        return parseInt(this.getItem(Constant.ST_CurMeleeId, "13"));
    }
    private set CurMelee(id: number) {
        if (id == this.CurMelee || !Weapon.meleeWaapon.includes(id + 1)) {
            return;
        }
        let preId: number = this.CurMelee;
        let gunInfo: GunInfo = this.getGunInfo(preId);
        if (gunInfo) {
            gunInfo.State = 1;
            this.setGunInfo(preId, gunInfo);
        }
        let curGunInfo: GunInfo = this.getGunInfo(id);
        if (curGunInfo) {
            curGunInfo.State = 2;
            this.setGunInfo(id, curGunInfo);
        }
        this.setItem(Constant.ST_CurMeleeId, id + "");
    }
    /**
    * 当前远程武器
    */
    public get CurRange() {
        return parseInt(this.getItem(Constant.ST_CurRangeId, "0"));
    }
    private set CurRange(id: number) {
        if (id == this.CurRange || !Weapon.rangeWeapon.includes(id + 1)) {
            return;
        }
        let preId: number = this.CurRange;
        let gunInfo: GunInfo = this.getGunInfo(preId);
        if (gunInfo) {
            gunInfo.State = 1;
            this.setGunInfo(preId, gunInfo);
        }
        let curGunInfo: GunInfo = this.getGunInfo(id);
        if (curGunInfo) {
            curGunInfo.State = 2;
            this.setGunInfo(id, curGunInfo);
        }
        this.setItem(Constant.ST_CurRangeId, id + "");
    }
    public get curWeapon() {
        return this.CurRange;
    }
    public set curWeapon(id: number) {
        if (Weapon.meleeWaapon.includes(id + 1)) {
            this.CurMelee = id;
        } else if (Weapon.rangeWeapon.includes(id + 1)) {
            this.CurRange = id;
        }
    }

    /** 技能指引 */
    public get guide_skill(): boolean {
        return this.getItem(Constant.ST_Guide_Skill, true);
    }
    /** 技能指引 */
    public set guide_skill(value: boolean) {
        this.setItem(Constant.ST_Guide_Skill, value);
        cc.game.emit(Constant.E_ShareOrVideo);
    }

    ///////////////// 历史最佳 //////////////////////
    // 游戏时间
    public get best_time(): number {
        return parseInt(this.getItem("best_time", "0"));
    }
    public set best_time(v: number) {
        if (v > this.best_time) {
            this.setItem("best_time", v + "");
        }
    }
    // 击杀数
    public get best_kill(): number {
        return parseInt(this.getItem("best_kill", "0"));
    }
    public set best_kill(v: number) {
        if (v > this.best_kill) {
            this.setItem("best_kill", v + "");
        }
    }
    // 等级
    public get best_level(): number {
        return parseInt(this.getItem("best_level", "0"));
    }
    public set best_level(v: number) {
        if (v > this.best_level) {
            this.setItem("best_level", v + "");
        }
    }
    // 金币
    public get best_coin(): number {
        return parseInt(this.getItem("best_coin", "0"));
    }
    public set best_coin(v: number) {
        if (v > this.best_coin) {
            this.setItem("best_coin", v + "");
        }
    }
    // 分享次数
    public get shareNum(): number {
        return this.getItem(Constant.ST_ShareNum, 0)
    }
    public set shareNum(v: number) {
        this.setItem(Constant.ST_ShareNum, v);
        // 发送事件更新图标
        cc.game.emit(Constant.E_ShareOrVideo);
        cc.log("今日分享了", v, "次");
    }

    ////////////////////////////////////////////////////////////////////////////////
    public getItem(key: string, defaultValue: any) {
        if (this._dataPool[key] != undefined && this._dataPool[key] != null) {
            return this._dataPool[key];
        }
        return defaultValue;
    }
    public setItem(key: string, value: any) {
        this._dataPool[key] = value;
        this._save();
    }
    private _save() {
        cc.sys.localStorage.setItem(Constant.ST_GameData, JSON.stringify(this._dataPool));
    }

}
