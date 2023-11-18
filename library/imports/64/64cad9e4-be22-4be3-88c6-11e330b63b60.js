"use strict";
cc._RF.push(module, '64cadnkviJL44jGEeMwtjtg', 'Constant');
// scripts/Framework/Constant.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillInfo = exports.GunInfo = exports.SkinInfo = exports.Levelitem = exports.PanelName = exports.PageName = exports.ZindexLayer = exports.Starstate = exports.GameState = void 0;
var Constant = /** @class */ (function () {
    function Constant() {
    }
    /**
     * 总关卡数量
     */
    Constant.CT_TotalLevelCount = 20;
    /**
     * 每过一关奖励
     */
    Constant.CT_RewardCoinCount = 100;
    /**
     * 闯关失败奖励
     */
    Constant.CT_FailRewardCoinCount = 50;
    Constant.commonCJTimes = 1;
    Constant.weaponLevelPriceArr = [100, 300, 600];
    Constant.skinLevelPriceArr = [100, 200, 300, 400, 500, 600];
    Constant.ST_GameData = "GameData_dxcyxtgd";
    Constant.ST_BuildDate = "ST_BuildDate";
    Constant.ST_TotoalCount = "ST_TotoalCount";
    Constant.ST_CurModel1MapId = "ST_CurModel1MapId";
    Constant.ST_CurModel2MapId = "ST_CurModel2MapId";
    Constant.ST_CurLevelId = "ST_CurLevelId";
    /////////////////////////// 当前用到
    Constant.ST_AudioOn = "ST_AudioOn"; //音频开关
    Constant.ST_ShakeOn = "ST_ShakeOn"; //震动开关
    Constant.ST_CoinCount = "ST_CoinCount"; //金币数量
    Constant.ST_DiamondCount = "ST_DiamondCount";
    Constant.ST_OnlineToday = "ST_OnlineToday";
    Constant.ST_ReceiveToday = "ST_ReceiveToday";
    Constant.ST_LastLoadDate = "ST_LastLoadDate";
    Constant.ST_LastDailyBonusTime = "ST_LastDailyBonusTime";
    Constant.ST_LastDailyBonusIndex = "ST_LastDailyBonusIndex";
    Constant.ST_SkinInfo = "ST_SkinInfo";
    Constant.ST_CurSkinId = "ST_CurSkinId";
    Constant.ST_SkillInfo = "ST_SkillInfo";
    Constant.ST_CurSkillId = "ST_CurSkillId";
    Constant.ST_GunInfo = "ST_GunInfo";
    Constant.ST_CurMeleeId = "ST_CurMeleeId";
    Constant.ST_CurRangeId = "ST_CurRangeId";
    Constant.ST_LevelItem = "LevelItem";
    Constant.ST_ShareNum = "ST_ShareNum";
    /** 游戏逻辑事件 */
    Constant.E_GAME_LOGIC = "E_GAME_LOGIC";
    /** 更新进度条事件 */
    Constant.E_UPDATE_PROGRESS = "E_UPDATE_PROGRESS";
    /** 事件: Fly_Coin */
    Constant.E_Fly_Coin = "E_Fly_Coin";
    /** 事件：金币数量改变 */
    Constant.E_COIN_CHANGE = "E_COIN_CHANGE";
    /** 事件：钻石数量改变 */
    Constant.E_Diamond_CHANGE = "E_Diamond_CHANGE";
    /** 事件：经验值改变 */
    Constant.E_EXP_CHANGE = "E_EXP_CHANGE";
    /** 事件：抽奖得皮肤  */
    Constant.E_CJ_SKIN = "E_CJ_SKIN";
    /** 事件：抽奖得武器  */
    Constant.E_CJ_Weapon = "E_CJ_Weapon";
    /** 事件：显示分享或视频 */
    Constant.E_ShareOrVideo = "E_ShareOrVideo";
    /** 事件：地下城 */
    Constant.E_Player_Death = "E_Player_Death";
    Constant.E_Player_Hart = "E_Player_Hart";
    Constant.E_Bullet_Last = "E_Bullet_Last";
    Constant.E_Bullet_Reload = "E_Bullet_Reload";
    Constant.E_Zombie_Hart = "E_Zombie_Hart";
    Constant.E_Zombie_Death = "E_Zombie_Death";
    Constant.E_Jingyan_Finish = "E_Jingyan_Finish";
    Constant.E_Commonzombie_Destory = "E_Commonzombie_Destory";
    Constant.E_Allzombie_Destory = "E_Allzombie_Destory";
    /** 事件_磁铁 */
    Constant.E_Skill_Citie = "E_Skill_Citie";
    /** 指引_全屏爆炸 */
    Constant.ST_Guide_Skill = "ST_Guide_Skill";
    return Constant;
}());
exports.default = Constant;
var GameState;
(function (GameState) {
    GameState[GameState["None"] = -1] = "None";
    GameState[GameState["Prepare"] = 0] = "Prepare";
    GameState[GameState["Start"] = 1] = "Start";
    GameState[GameState["Success"] = 2] = "Success";
    GameState[GameState["Failed"] = 3] = "Failed";
    GameState[GameState["Pause"] = 4] = "Pause";
    GameState[GameState["Relive"] = 5] = "Relive";
})(GameState = exports.GameState || (exports.GameState = {}));
var Starstate;
(function (Starstate) {
    Starstate[Starstate["default"] = 0] = "default";
    Starstate[Starstate["bright"] = 1] = "bright";
    Starstate[Starstate["drown"] = 2] = "drown";
})(Starstate = exports.Starstate || (exports.Starstate = {}));
var ZindexLayer;
(function (ZindexLayer) {
    ZindexLayer[ZindexLayer["zindex_min"] = cc.macro.MIN_ZINDEX] = "zindex_min";
    ZindexLayer[ZindexLayer["zinedx_floorTip"] = cc.macro.MIN_ZINDEX + 1] = "zinedx_floorTip";
    ZindexLayer[ZindexLayer["zinedx_floorLiewen"] = cc.macro.MIN_ZINDEX + 2] = "zinedx_floorLiewen";
    ZindexLayer[ZindexLayer["zinedx_floorSkill"] = cc.macro.MIN_ZINDEX + 3] = "zinedx_floorSkill";
    ZindexLayer[ZindexLayer["zinedx_footPrint"] = cc.macro.MIN_ZINDEX + 4] = "zinedx_footPrint";
    ZindexLayer[ZindexLayer["zinedx_gh"] = cc.macro.MIN_ZINDEX + 5] = "zinedx_gh";
    ZindexLayer[ZindexLayer["zinedx_footYc"] = cc.macro.MIN_ZINDEX + 6] = "zinedx_footYc";
    ZindexLayer[ZindexLayer["zinedx_jingyan"] = cc.macro.MIN_ZINDEX + 7] = "zinedx_jingyan";
    ZindexLayer[ZindexLayer["zindex_shellcase"] = cc.macro.MIN_ZINDEX + 8] = "zindex_shellcase";
    ZindexLayer[ZindexLayer["default"] = 0] = "default";
    ZindexLayer[ZindexLayer["zindex_mb"] = 1] = "zindex_mb";
    ZindexLayer[ZindexLayer["zinedx_item"] = 100] = "zinedx_item";
    ZindexLayer[ZindexLayer["zinedx_dropbox"] = 200] = "zinedx_dropbox";
    ZindexLayer[ZindexLayer["zindex_zombie"] = 300] = "zindex_zombie";
    ZindexLayer[ZindexLayer["zindex_monster"] = 400] = "zindex_monster";
    ZindexLayer[ZindexLayer["zindex_enemy"] = 500] = "zindex_enemy";
    ZindexLayer[ZindexLayer["zindex_soldier"] = 600] = "zindex_soldier";
    ZindexLayer[ZindexLayer["zindex_ai"] = 700] = "zindex_ai";
    ZindexLayer[ZindexLayer["zindex_player"] = 800] = "zindex_player";
    ZindexLayer[ZindexLayer["zindex_tower"] = 900] = "zindex_tower";
    ZindexLayer[ZindexLayer["zindex_bullet"] = 1000] = "zindex_bullet";
    ZindexLayer[ZindexLayer["zindex_hp"] = 1100] = "zindex_hp";
    ZindexLayer[ZindexLayer["zindex_bomb"] = 1200] = "zindex_bomb";
    ZindexLayer[ZindexLayer["zindex_blood"] = 1300] = "zindex_blood";
    ZindexLayer[ZindexLayer["zindex_effect"] = 1400] = "zindex_effect";
    ZindexLayer[ZindexLayer["zindex_effect_fire"] = 1500] = "zindex_effect_fire";
    ZindexLayer[ZindexLayer["zindex_effect_spark"] = 1600] = "zindex_effect_spark";
    ZindexLayer[ZindexLayer["zindex_effect_hit"] = 1800] = "zindex_effect_hit";
    ZindexLayer[ZindexLayer["zindex_bullet_sky"] = 1900] = "zindex_bullet_sky";
    ZindexLayer[ZindexLayer["zindex_skill"] = cc.macro.MAX_ZINDEX - 6] = "zindex_skill";
    ZindexLayer[ZindexLayer["zindex_roleLabel"] = cc.macro.MAX_ZINDEX - 2] = "zindex_roleLabel";
    ZindexLayer[ZindexLayer["zindex_max"] = cc.macro.MAX_ZINDEX] = "zindex_max";
})(ZindexLayer = exports.ZindexLayer || (exports.ZindexLayer = {}));
///////////////////////////////////////////// 界面 /////////////////////////////////////////////
var PageName = /** @class */ (function () {
    function PageName() {
    }
    PageName.UILoadingPage = "UILoadingPage";
    PageName.UIHomePage = "UIHomePage";
    PageName.UIGamePage = "UIGamePage";
    PageName.UIOverPage = "UIOverPage";
    PageName.UIGameLoadingPage = "UIGameLoadingPage";
    return PageName;
}());
exports.PageName = PageName;
var PanelName = /** @class */ (function () {
    function PanelName() {
    }
    PanelName.UISignPanel = "UISignPanel";
    PanelName.UITurntablePanel = "UITurntablePanel";
    PanelName.UIRevivePanel = "UIRevivePanel";
    PanelName.UIUpgradePanel = "UIUpgradePanel";
    PanelName.UIPausePanel = "UIPausePanel";
    PanelName.UITrySkinPanel = "UITrySkinPanel";
    PanelName.UIWeaponLevelPanel = "UIWeaponLevelPanel";
    PanelName.UITimePanel = "UITimePanel";
    return PanelName;
}());
exports.PanelName = PanelName;
///////////////////////////////////////////////////
var Levelitem = /** @class */ (function () {
    function Levelitem(str) {
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
            if (info.Grade) {
                this.Grade = parseInt(info.Grade);
            }
            else {
                cc.log("Grade 字段不存在!");
            }
        }
        else {
            cc.log("构建 Levelitem 的字符串不合法!");
        }
    }
    Levelitem.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"State\":\"" + this.State + "\",\"Grade\":\"" + this.Grade + "\"}";
    };
    return Levelitem;
}());
exports.Levelitem = Levelitem;
var SkinInfo = /** @class */ (function () {
    function SkinInfo(str) {
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
            if (info.Price) {
                this.Price = parseInt(info.Price);
            }
            else {
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
        }
        else {
            cc.log("构建 SkinInfo 的字符串不合法!");
        }
    }
    SkinInfo.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"State\":" + this.State + "\",\"Price\":\"" + this.Price + "\",\"VideoCount\":\"" + this.VideoCount + "\"}";
    };
    return SkinInfo;
}());
exports.SkinInfo = SkinInfo;
var GunInfo = /** @class */ (function () {
    function GunInfo(str) {
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
            if (info.Price) {
                this.Price = parseInt(info.Price);
            }
            else {
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
        }
        else {
            cc.log("构建 GunInfo 的字符串不合法!");
        }
    }
    GunInfo.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"State\":\"" + this.State + "\",\"Price\":\"" + this.Price + "\",\"Level\":\"" + this.Level + "\",\"VideoCount\":\"" + this.VideoCount + "\"}";
    };
    return GunInfo;
}());
exports.GunInfo = GunInfo;
var SkillInfo = /** @class */ (function () {
    function SkillInfo(str) {
        // cc.log("构建 SkinInfo :", str);
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
            if (info.Price) {
                this.Price = parseInt(info.Price);
            }
            else {
                cc.log("Price 字段不存在!");
            }
        }
        else {
            cc.log("构建 SkillInfo 的字符串不合法!");
        }
    }
    SkillInfo.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"State\":\"" + this.State + "\",\"Price\":\"" + this.Price + "\"}";
    };
    return SkillInfo;
}());
exports.SkillInfo = SkillInfo;

cc._RF.pop();