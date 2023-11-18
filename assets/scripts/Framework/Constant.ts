export default class Constant {
    /**
     * 总关卡数量
     */
    public static CT_TotalLevelCount: number = 20;
    /**
     * 每过一关奖励
     */
    public static CT_RewardCoinCount: number = 100;
    /**
     * 闯关失败奖励
     */
    public static CT_FailRewardCoinCount: number = 50;

    public static commonCJTimes: number = 1;
    public static weaponLevelPriceArr: number[] = [100, 300, 600];
    public static skinLevelPriceArr: number[] = [100, 200, 300, 400, 500, 600];

    public static ST_GameData: string = "GameData_dxcyxtgd";
    public static ST_BuildDate: string = "ST_BuildDate";
    public static ST_TotoalCount: string = "ST_TotoalCount";
    public static ST_CurModel1MapId: string = "ST_CurModel1MapId";
    public static ST_CurModel2MapId: string = "ST_CurModel2MapId";
    public static ST_CurLevelId: string = "ST_CurLevelId";

    /////////////////////////// 当前用到
    public static ST_AudioOn: string = "ST_AudioOn"; //音频开关
    public static ST_ShakeOn: string = "ST_ShakeOn"; //震动开关
    public static ST_CoinCount: string = "ST_CoinCount"; //金币数量
    public static ST_DiamondCount: string = "ST_DiamondCount";
    public static ST_OnlineToday: string = "ST_OnlineToday";
    public static ST_ReceiveToday: string = "ST_ReceiveToday";
    public static ST_LastLoadDate: string = "ST_LastLoadDate";
    public static ST_LastDailyBonusTime: string = "ST_LastDailyBonusTime";
    public static ST_LastDailyBonusIndex: string = "ST_LastDailyBonusIndex";
    public static ST_SkinInfo: string = "ST_SkinInfo";
    public static ST_CurSkinId: string = "ST_CurSkinId";
    public static ST_SkillInfo: string = "ST_SkillInfo";
    public static ST_CurSkillId: string = "ST_CurSkillId";
    public static ST_GunInfo: string = "ST_GunInfo";
    public static ST_CurMeleeId: string = "ST_CurMeleeId";
    public static ST_CurRangeId: string = "ST_CurRangeId";
    public static ST_LevelItem: string = "LevelItem";
    public static ST_ShareNum: string = "ST_ShareNum";

    /** 游戏逻辑事件 */
    public static E_GAME_LOGIC: string = "E_GAME_LOGIC";
    /** 更新进度条事件 */
    public static E_UPDATE_PROGRESS: string = "E_UPDATE_PROGRESS";
    /** 事件: Fly_Coin */
    public static E_Fly_Coin: string = "E_Fly_Coin";
    /** 事件：金币数量改变 */
    public static E_COIN_CHANGE: string = "E_COIN_CHANGE";
    /** 事件：钻石数量改变 */
    public static E_Diamond_CHANGE: string = "E_Diamond_CHANGE";
    /** 事件：经验值改变 */
    public static E_EXP_CHANGE: string = "E_EXP_CHANGE";
    /** 事件：抽奖得皮肤  */
    public static E_CJ_SKIN: string = "E_CJ_SKIN";
    /** 事件：抽奖得武器  */
    public static E_CJ_Weapon: string = "E_CJ_Weapon";
    /** 事件：显示分享或视频 */
    public static E_ShareOrVideo: string = "E_ShareOrVideo";

    /** 事件：地下城 */
    public static E_Player_Death: string = "E_Player_Death";
    public static E_Player_Hart: string = "E_Player_Hart";
    public static E_Bullet_Last: string = "E_Bullet_Last";
    public static E_Bullet_Reload: string = "E_Bullet_Reload";
    public static E_Zombie_Hart: string = "E_Zombie_Hart";
    public static E_Zombie_Death: string = "E_Zombie_Death";
    public static E_Jingyan_Finish: string = "E_Jingyan_Finish";
    public static E_Commonzombie_Destory: string = "E_Commonzombie_Destory";
    public static E_Allzombie_Destory: string = "E_Allzombie_Destory";

    /** 事件_磁铁 */
    public static E_Skill_Citie: string = "E_Skill_Citie";
    /** 指引_全屏爆炸 */
    public static ST_Guide_Skill: string = "ST_Guide_Skill";
}

export enum GameState {
    None = -1,
    Prepare = 0,
    Start = 1,
    Success = 2,
    Failed = 3,
    Pause = 4,
    Relive = 5,
}

export enum Starstate {
    default = 0,
    bright = 1,
    drown = 2,
}

export enum ZindexLayer {
    zindex_min = cc.macro.MIN_ZINDEX,
    zinedx_floorTip = cc.macro.MIN_ZINDEX + 1,//地面提示
    zinedx_floorLiewen = cc.macro.MIN_ZINDEX + 2,//地面裂纹
    zinedx_floorSkill = cc.macro.MIN_ZINDEX + 3,//地面技能
    zinedx_footPrint = cc.macro.MIN_ZINDEX + 4,//脚印
    zinedx_gh = cc.macro.MIN_ZINDEX + 5,//人物光环
    zinedx_footYc = cc.macro.MIN_ZINDEX + 6,//烟尘
    zinedx_jingyan = cc.macro.MIN_ZINDEX + 7,//经验层
    zindex_shellcase = cc.macro.MIN_ZINDEX + 8,//弹壳
    default = 0,
    zindex_mb = 1,//墓碑
    zinedx_item = 100,//道具
    zinedx_dropbox = 200,//空投
    zindex_zombie = 300,//僵尸
    zindex_monster = 400,//怪物
    zindex_enemy = 500,//敌人
    zindex_soldier = 600,//敌人
    zindex_ai = 700,//ai
    zindex_player = 800,//玩家
    zindex_tower = 900,//塔
    zindex_bullet = 1000,//子弹
    zindex_hp = 1100,//血液
    zindex_bomb = 1200,//爆炸
    zindex_blood = 1300,//血液
    zindex_effect = 1400,//特效
    zindex_effect_fire = 1500,//特效_开火
    zindex_effect_spark = 1600,//特效_撞墙
    zindex_effect_hit = 1800,//特效_击中
    zindex_bullet_sky = 1900,//空中子弹
    zindex_skill = cc.macro.MAX_ZINDEX - 6,//技能
    zindex_roleLabel = cc.macro.MAX_ZINDEX - 2,//角色受伤提示文字
    zindex_max = cc.macro.MAX_ZINDEX,
}
///////////////////////////////////////////// 界面 /////////////////////////////////////////////
export class PageName {
    public static UILoadingPage: string = "UILoadingPage";
    public static UIHomePage: string = "UIHomePage";
    public static UIGamePage: string = "UIGamePage";
    public static UIOverPage: string = "UIOverPage";
    public static UIGameLoadingPage: string = "UIGameLoadingPage";
}

export class PanelName {
    public static UISignPanel: string = "UISignPanel";
    public static UITurntablePanel: string = "UITurntablePanel";
    public static UIRevivePanel: string = "UIRevivePanel";
    public static UIUpgradePanel: string = "UIUpgradePanel"
    public static UIPausePanel: string = "UIPausePanel";
    public static UITrySkinPanel: string = "UITrySkinPanel";
    public static UIWeaponLevelPanel: string = "UIWeaponLevelPanel";
    public static UITimePanel: string = "UITimePanel";
}

///////////////////////////////////////////////////
export class Levelitem {
    public Id: number;
    /**
     * 0代表上锁  
     * 1代表未完成  
     * 2代表完成
     */
    public State: number;

    public Grade: number;

    constructor(str: string) {
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }

            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }
            if (info.Grade) {
                this.Grade = parseInt(info.Grade);
            }
            else {
                cc.log("Grade 字段不存在!")
            }
        } else {
            cc.log("构建 Levelitem 的字符串不合法!");
        }
    }
    public ToString() {
        return `{"Id":"${this.Id}","State":"${this.State}","Grade":"${this.Grade}"}`;
    }
}



export class SkinInfo {
    public Id: number;
    /**
     * 0:未解锁
     * 1:已解锁
     * 2:当前使用
     */
    public State: number;
    public Price: number;
    public Level: number;
    public VideoCount: number;

    constructor(str: string) {
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }
            if (info.Price) {
                this.Price = parseInt(info.Price);
            } else {
                cc.log("Price 字段不存在!");
            }
            if (info.Level) {
                this.Level = parseInt(info.Level);
            }
            else {
                cc.log("Level 字段不存在!");
            }
            if (info.VideoCount) {
                this.VideoCount = parseInt(info.VideoCount);
            }
            else {
                cc.log("VideoCount 字段不存在!");
            }
        } else {
            cc.log("构建 SkinInfo 的字符串不合法!");
        }
    }

    public ToString() {
        return `{"Id":"${this.Id}","State":${this.State}","Price":"${this.Price}","VideoCount":"${this.VideoCount}"}`;
    }
}

export class GunInfo {
    public Id: number;
    /**
     * 0:未解锁
     * 1:已解锁
     * 2:当前使用
     */
    public State: number;
    public Price: number;
    public Level: number;
    public VideoCount: number;

    constructor(str: string) {
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }
            if (info.Price) {
                this.Price = parseInt(info.Price);
            } else {
                cc.log("Price 字段不存在!");
            }
            if (info.Level) {
                this.Level = parseInt(info.Level);
            }
            else {
                cc.log("Level 字段不存在!");
            }
            if (info.VideoCount) {
                this.VideoCount = parseInt(info.VideoCount);
            }
            else {
                cc.log("VideoCount 字段不存在!");
            }
        } else {
            cc.log("构建 GunInfo 的字符串不合法!");
        }

    }

    public ToString() {
        return `{"Id":"${this.Id}","State":"${this.State}","Price":"${this.Price}","Level":"${this.Level}","VideoCount":"${this.VideoCount}"}`;
    }
}

export class SkillInfo {
    public Id: number;
    /**
     * 0:未解锁
     * 1:已解锁
     * 2:当前使用
     */
    public State: number;
    public Price: number;

    constructor(str: string) {
        // cc.log("构建 SkinInfo :", str);
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }

            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }

            if (info.Price) {
                this.Price = parseInt(info.Price);
            } else {
                cc.log("Price 字段不存在!");
            }
        } else {
            cc.log("构建 SkillInfo 的字符串不合法!");
        }

    }

    public ToString() {
        return `{"Id":"${this.Id}","State":"${this.State}","Price":"${this.Price}"}`;
    }
}

