
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/Constant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxDb25zdGFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBK0VBLENBQUM7SUE5RUc7O09BRUc7SUFDVywyQkFBa0IsR0FBVyxFQUFFLENBQUM7SUFDOUM7O09BRUc7SUFDVywyQkFBa0IsR0FBVyxHQUFHLENBQUM7SUFDL0M7O09BRUc7SUFDVywrQkFBc0IsR0FBVyxFQUFFLENBQUM7SUFFcEMsc0JBQWEsR0FBVyxDQUFDLENBQUM7SUFDMUIsNEJBQW1CLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELDBCQUFpQixHQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUU3RCxvQkFBVyxHQUFXLG1CQUFtQixDQUFDO0lBQzFDLHFCQUFZLEdBQVcsY0FBYyxDQUFDO0lBQ3RDLHVCQUFjLEdBQVcsZ0JBQWdCLENBQUM7SUFDMUMsMEJBQWlCLEdBQVcsbUJBQW1CLENBQUM7SUFDaEQsMEJBQWlCLEdBQVcsbUJBQW1CLENBQUM7SUFDaEQsc0JBQWEsR0FBVyxlQUFlLENBQUM7SUFFdEQsZ0NBQWdDO0lBQ2xCLG1CQUFVLEdBQVcsWUFBWSxDQUFDLENBQUMsTUFBTTtJQUN6QyxtQkFBVSxHQUFXLFlBQVksQ0FBQyxDQUFDLE1BQU07SUFDekMscUJBQVksR0FBVyxjQUFjLENBQUMsQ0FBQyxNQUFNO0lBQzdDLHdCQUFlLEdBQVcsaUJBQWlCLENBQUM7SUFDNUMsdUJBQWMsR0FBVyxnQkFBZ0IsQ0FBQztJQUMxQyx3QkFBZSxHQUFXLGlCQUFpQixDQUFDO0lBQzVDLHdCQUFlLEdBQVcsaUJBQWlCLENBQUM7SUFDNUMsOEJBQXFCLEdBQVcsdUJBQXVCLENBQUM7SUFDeEQsK0JBQXNCLEdBQVcsd0JBQXdCLENBQUM7SUFDMUQsb0JB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QUFDLENBQUM7YUFDMUI7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDMUI7U0FDSjthQUFNO1lBQ0gsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ25DO0lBRUwsQ0FBQztJQUVNLDRCQUFRLEdBQWY7UUFDSSxPQUFPLGVBQVUsSUFBSSxDQUFDLEVBQUUsdUJBQWMsSUFBSSxDQUFDLEtBQUssdUJBQWMsSUFBSSxDQUFDLEtBQUssUUFBSSxDQUFDO0lBQ2pGLENBQUM7SUFDTCxnQkFBQztBQUFELENBeENBLEFBd0NDLElBQUE7QUF4Q1ksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdGFudCB7XHJcbiAgICAvKipcclxuICAgICAqIOaAu+WFs+WNoeaVsOmHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENUX1RvdGFsTGV2ZWxDb3VudDogbnVtYmVyID0gMjA7XHJcbiAgICAvKipcclxuICAgICAqIOavj+i/h+S4gOWFs+WlluWKsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENUX1Jld2FyZENvaW5Db3VudDogbnVtYmVyID0gMTAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpl6/lhbPlpLHotKXlpZblirFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDVF9GYWlsUmV3YXJkQ29pbkNvdW50OiBudW1iZXIgPSA1MDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbW1vbkNKVGltZXM6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIHdlYXBvbkxldmVsUHJpY2VBcnI6IG51bWJlcltdID0gWzEwMCwgMzAwLCA2MDBdO1xyXG4gICAgcHVibGljIHN0YXRpYyBza2luTGV2ZWxQcmljZUFycjogbnVtYmVyW10gPSBbMTAwLCAyMDAsIDMwMCwgNDAwLCA1MDAsIDYwMF07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTVF9HYW1lRGF0YTogc3RyaW5nID0gXCJHYW1lRGF0YV9keGN5eHRnZFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9CdWlsZERhdGU6IHN0cmluZyA9IFwiU1RfQnVpbGREYXRlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1RvdG9hbENvdW50OiBzdHJpbmcgPSBcIlNUX1RvdG9hbENvdW50XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1ck1vZGVsMU1hcElkOiBzdHJpbmcgPSBcIlNUX0N1ck1vZGVsMU1hcElkXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1ck1vZGVsMk1hcElkOiBzdHJpbmcgPSBcIlNUX0N1ck1vZGVsMk1hcElkXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1ckxldmVsSWQ6IHN0cmluZyA9IFwiU1RfQ3VyTGV2ZWxJZFwiO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDlvZPliY3nlKjliLBcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfQXVkaW9Pbjogc3RyaW5nID0gXCJTVF9BdWRpb09uXCI7IC8v6Z+z6aKR5byA5YWzXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1NoYWtlT246IHN0cmluZyA9IFwiU1RfU2hha2VPblwiOyAvL+mch+WKqOW8gOWFs1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9Db2luQ291bnQ6IHN0cmluZyA9IFwiU1RfQ29pbkNvdW50XCI7IC8v6YeR5biB5pWw6YePXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0RpYW1vbmRDb3VudDogc3RyaW5nID0gXCJTVF9EaWFtb25kQ291bnRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfT25saW5lVG9kYXk6IHN0cmluZyA9IFwiU1RfT25saW5lVG9kYXlcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfUmVjZWl2ZVRvZGF5OiBzdHJpbmcgPSBcIlNUX1JlY2VpdmVUb2RheVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MYXN0TG9hZERhdGU6IHN0cmluZyA9IFwiU1RfTGFzdExvYWREYXRlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0xhc3REYWlseUJvbnVzVGltZTogc3RyaW5nID0gXCJTVF9MYXN0RGFpbHlCb251c1RpbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfTGFzdERhaWx5Qm9udXNJbmRleDogc3RyaW5nID0gXCJTVF9MYXN0RGFpbHlCb251c0luZGV4XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1NraW5JbmZvOiBzdHJpbmcgPSBcIlNUX1NraW5JbmZvXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1clNraW5JZDogc3RyaW5nID0gXCJTVF9DdXJTa2luSWRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfU2tpbGxJbmZvOiBzdHJpbmcgPSBcIlNUX1NraWxsSW5mb1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9DdXJTa2lsbElkOiBzdHJpbmcgPSBcIlNUX0N1clNraWxsSWRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfR3VuSW5mbzogc3RyaW5nID0gXCJTVF9HdW5JbmZvXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1ck1lbGVlSWQ6IHN0cmluZyA9IFwiU1RfQ3VyTWVsZWVJZFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9DdXJSYW5nZUlkOiBzdHJpbmcgPSBcIlNUX0N1clJhbmdlSWRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfTGV2ZWxJdGVtOiBzdHJpbmcgPSBcIkxldmVsSXRlbVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9TaGFyZU51bTogc3RyaW5nID0gXCJTVF9TaGFyZU51bVwiO1xyXG5cclxuICAgIC8qKiDmuLjmiI/pgLvovpHkuovku7YgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9HQU1FX0xPR0lDOiBzdHJpbmcgPSBcIkVfR0FNRV9MT0dJQ1wiO1xyXG4gICAgLyoqIOabtOaWsOi/m+W6puadoeS6i+S7tiAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX1VQREFURV9QUk9HUkVTUzogc3RyaW5nID0gXCJFX1VQREFURV9QUk9HUkVTU1wiO1xyXG4gICAgLyoqIOS6i+S7tjogRmx5X0NvaW4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9GbHlfQ29pbjogc3RyaW5nID0gXCJFX0ZseV9Db2luXCI7XHJcbiAgICAvKiog5LqL5Lu277ya6YeR5biB5pWw6YeP5pS55Y+YICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfQ09JTl9DSEFOR0U6IHN0cmluZyA9IFwiRV9DT0lOX0NIQU5HRVwiO1xyXG4gICAgLyoqIOS6i+S7tu+8mumSu+efs+aVsOmHj+aUueWPmCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX0RpYW1vbmRfQ0hBTkdFOiBzdHJpbmcgPSBcIkVfRGlhbW9uZF9DSEFOR0VcIjtcclxuICAgIC8qKiDkuovku7bvvJrnu4/pqozlgLzmlLnlj5ggKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9FWFBfQ0hBTkdFOiBzdHJpbmcgPSBcIkVfRVhQX0NIQU5HRVwiO1xyXG4gICAgLyoqIOS6i+S7tu+8muaKveWlluW+l+earuiCpCAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9DSl9TS0lOOiBzdHJpbmcgPSBcIkVfQ0pfU0tJTlwiO1xyXG4gICAgLyoqIOS6i+S7tu+8muaKveWlluW+l+atpuWZqCAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9DSl9XZWFwb246IHN0cmluZyA9IFwiRV9DSl9XZWFwb25cIjtcclxuICAgIC8qKiDkuovku7bvvJrmmL7npLrliIbkuqvmiJbop4bpopEgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9TaGFyZU9yVmlkZW86IHN0cmluZyA9IFwiRV9TaGFyZU9yVmlkZW9cIjtcclxuXHJcbiAgICAvKiog5LqL5Lu277ya5Zyw5LiL5Z+OICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfUGxheWVyX0RlYXRoOiBzdHJpbmcgPSBcIkVfUGxheWVyX0RlYXRoXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVfUGxheWVyX0hhcnQ6IHN0cmluZyA9IFwiRV9QbGF5ZXJfSGFydFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFX0J1bGxldF9MYXN0OiBzdHJpbmcgPSBcIkVfQnVsbGV0X0xhc3RcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgRV9CdWxsZXRfUmVsb2FkOiBzdHJpbmcgPSBcIkVfQnVsbGV0X1JlbG9hZFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFX1pvbWJpZV9IYXJ0OiBzdHJpbmcgPSBcIkVfWm9tYmllX0hhcnRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgRV9ab21iaWVfRGVhdGg6IHN0cmluZyA9IFwiRV9ab21iaWVfRGVhdGhcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgRV9KaW5neWFuX0ZpbmlzaDogc3RyaW5nID0gXCJFX0ppbmd5YW5fRmluaXNoXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVfQ29tbW9uem9tYmllX0Rlc3Rvcnk6IHN0cmluZyA9IFwiRV9Db21tb256b21iaWVfRGVzdG9yeVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFX0FsbHpvbWJpZV9EZXN0b3J5OiBzdHJpbmcgPSBcIkVfQWxsem9tYmllX0Rlc3RvcnlcIjtcclxuXHJcbiAgICAvKiog5LqL5Lu2X+ejgemTgSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX1NraWxsX0NpdGllOiBzdHJpbmcgPSBcIkVfU2tpbGxfQ2l0aWVcIjtcclxuICAgIC8qKiDmjIflvJVf5YWo5bGP54iG54K4ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0d1aWRlX1NraWxsOiBzdHJpbmcgPSBcIlNUX0d1aWRlX1NraWxsXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0ZSB7XHJcbiAgICBOb25lID0gLTEsXHJcbiAgICBQcmVwYXJlID0gMCxcclxuICAgIFN0YXJ0ID0gMSxcclxuICAgIFN1Y2Nlc3MgPSAyLFxyXG4gICAgRmFpbGVkID0gMyxcclxuICAgIFBhdXNlID0gNCxcclxuICAgIFJlbGl2ZSA9IDUsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFN0YXJzdGF0ZSB7XHJcbiAgICBkZWZhdWx0ID0gMCxcclxuICAgIGJyaWdodCA9IDEsXHJcbiAgICBkcm93biA9IDIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFppbmRleExheWVyIHtcclxuICAgIHppbmRleF9taW4gPSBjYy5tYWNyby5NSU5fWklOREVYLFxyXG4gICAgemluZWR4X2Zsb29yVGlwID0gY2MubWFjcm8uTUlOX1pJTkRFWCArIDEsLy/lnLDpnaLmj5DnpLpcclxuICAgIHppbmVkeF9mbG9vckxpZXdlbiA9IGNjLm1hY3JvLk1JTl9aSU5ERVggKyAyLC8v5Zyw6Z2i6KOC57q5XHJcbiAgICB6aW5lZHhfZmxvb3JTa2lsbCA9IGNjLm1hY3JvLk1JTl9aSU5ERVggKyAzLC8v5Zyw6Z2i5oqA6IO9XHJcbiAgICB6aW5lZHhfZm9vdFByaW50ID0gY2MubWFjcm8uTUlOX1pJTkRFWCArIDQsLy/ohJrljbBcclxuICAgIHppbmVkeF9naCA9IGNjLm1hY3JvLk1JTl9aSU5ERVggKyA1LC8v5Lq654mp5YWJ546vXHJcbiAgICB6aW5lZHhfZm9vdFljID0gY2MubWFjcm8uTUlOX1pJTkRFWCArIDYsLy/ng5/lsJhcclxuICAgIHppbmVkeF9qaW5neWFuID0gY2MubWFjcm8uTUlOX1pJTkRFWCArIDcsLy/nu4/pqozlsYJcclxuICAgIHppbmRleF9zaGVsbGNhc2UgPSBjYy5tYWNyby5NSU5fWklOREVYICsgOCwvL+W8ueWjs1xyXG4gICAgZGVmYXVsdCA9IDAsXHJcbiAgICB6aW5kZXhfbWIgPSAxLC8v5aKT56KRXHJcbiAgICB6aW5lZHhfaXRlbSA9IDEwMCwvL+mBk+WFt1xyXG4gICAgemluZWR4X2Ryb3Bib3ggPSAyMDAsLy/nqbrmipVcclxuICAgIHppbmRleF96b21iaWUgPSAzMDAsLy/lg7XlsLhcclxuICAgIHppbmRleF9tb25zdGVyID0gNDAwLC8v5oCq54mpXHJcbiAgICB6aW5kZXhfZW5lbXkgPSA1MDAsLy/mlYzkurpcclxuICAgIHppbmRleF9zb2xkaWVyID0gNjAwLC8v5pWM5Lq6XHJcbiAgICB6aW5kZXhfYWkgPSA3MDAsLy9haVxyXG4gICAgemluZGV4X3BsYXllciA9IDgwMCwvL+eOqeWutlxyXG4gICAgemluZGV4X3Rvd2VyID0gOTAwLC8v5aGUXHJcbiAgICB6aW5kZXhfYnVsbGV0ID0gMTAwMCwvL+WtkOW8uVxyXG4gICAgemluZGV4X2hwID0gMTEwMCwvL+ihgOa2slxyXG4gICAgemluZGV4X2JvbWIgPSAxMjAwLC8v54iG54K4XHJcbiAgICB6aW5kZXhfYmxvb2QgPSAxMzAwLC8v6KGA5rayXHJcbiAgICB6aW5kZXhfZWZmZWN0ID0gMTQwMCwvL+eJueaViFxyXG4gICAgemluZGV4X2VmZmVjdF9maXJlID0gMTUwMCwvL+eJueaViF/lvIDngatcclxuICAgIHppbmRleF9lZmZlY3Rfc3BhcmsgPSAxNjAwLC8v54m55pWIX+aSnuWimVxyXG4gICAgemluZGV4X2VmZmVjdF9oaXQgPSAxODAwLC8v54m55pWIX+WHu+S4rVxyXG4gICAgemluZGV4X2J1bGxldF9za3kgPSAxOTAwLC8v56m65Lit5a2Q5by5XHJcbiAgICB6aW5kZXhfc2tpbGwgPSBjYy5tYWNyby5NQVhfWklOREVYIC0gNiwvL+aKgOiDvVxyXG4gICAgemluZGV4X3JvbGVMYWJlbCA9IGNjLm1hY3JvLk1BWF9aSU5ERVggLSAyLC8v6KeS6Imy5Y+X5Lyk5o+Q56S65paH5a2XXHJcbiAgICB6aW5kZXhfbWF4ID0gY2MubWFjcm8uTUFYX1pJTkRFWCxcclxufVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g55WM6Z2iIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5leHBvcnQgY2xhc3MgUGFnZU5hbWUge1xyXG4gICAgcHVibGljIHN0YXRpYyBVSUxvYWRpbmdQYWdlOiBzdHJpbmcgPSBcIlVJTG9hZGluZ1BhZ2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlIb21lUGFnZTogc3RyaW5nID0gXCJVSUhvbWVQYWdlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJR2FtZVBhZ2U6IHN0cmluZyA9IFwiVUlHYW1lUGFnZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBVSU92ZXJQYWdlOiBzdHJpbmcgPSBcIlVJT3ZlclBhZ2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlHYW1lTG9hZGluZ1BhZ2U6IHN0cmluZyA9IFwiVUlHYW1lTG9hZGluZ1BhZ2VcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsTmFtZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJU2lnblBhbmVsOiBzdHJpbmcgPSBcIlVJU2lnblBhbmVsXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJVHVybnRhYmxlUGFuZWw6IHN0cmluZyA9IFwiVUlUdXJudGFibGVQYW5lbFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBVSVJldml2ZVBhbmVsOiBzdHJpbmcgPSBcIlVJUmV2aXZlUGFuZWxcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlVcGdyYWRlUGFuZWw6IHN0cmluZyA9IFwiVUlVcGdyYWRlUGFuZWxcIlxyXG4gICAgcHVibGljIHN0YXRpYyBVSVBhdXNlUGFuZWw6IHN0cmluZyA9IFwiVUlQYXVzZVBhbmVsXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJVHJ5U2tpblBhbmVsOiBzdHJpbmcgPSBcIlVJVHJ5U2tpblBhbmVsXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJV2VhcG9uTGV2ZWxQYW5lbDogc3RyaW5nID0gXCJVSVdlYXBvbkxldmVsUGFuZWxcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlUaW1lUGFuZWw6IHN0cmluZyA9IFwiVUlUaW1lUGFuZWxcIjtcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbmV4cG9ydCBjbGFzcyBMZXZlbGl0ZW0ge1xyXG4gICAgcHVibGljIElkOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIDDku6PooajkuIrplIEgIFxyXG4gICAgICogMeS7o+ihqOacquWujOaIkCAgXHJcbiAgICAgKiAy5Luj6KGo5a6M5oiQXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTdGF0ZTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBHcmFkZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGluZm86IGFueSA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICBpZiAoaW5mby5JZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JZCA9IHBhcnNlSW50KGluZm8uSWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiSWQg5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGluZm8uU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhdGUgPSBwYXJzZUludChpbmZvLlN0YXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlN0YXRlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uR3JhZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR3JhZGUgPSBwYXJzZUludChpbmZvLkdyYWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIkdyYWRlIOWtl+auteS4jeWtmOWcqCFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuaehOW7uiBMZXZlbGl0ZW0g55qE5a2X56ym5Liy5LiN5ZCI5rOVIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGB7XCJJZFwiOlwiJHt0aGlzLklkfVwiLFwiU3RhdGVcIjpcIiR7dGhpcy5TdGF0ZX1cIixcIkdyYWRlXCI6XCIke3RoaXMuR3JhZGV9XCJ9YDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbkluZm8ge1xyXG4gICAgcHVibGljIElkOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIDA65pyq6Kej6ZSBXHJcbiAgICAgKiAxOuW3suino+mUgVxyXG4gICAgICogMjrlvZPliY3kvb/nlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0YXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgUHJpY2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBMZXZlbDogbnVtYmVyO1xyXG4gICAgcHVibGljIFZpZGVvQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpbmZvOiBhbnkgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgaWYgKGluZm8uSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSWQgPSBwYXJzZUludChpbmZvLklkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIklkIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhdGUgPSBwYXJzZUludChpbmZvLlN0YXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlN0YXRlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uUHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJpY2UgPSBwYXJzZUludChpbmZvLlByaWNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlByaWNlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGV2ZWwgPSBwYXJzZUludChpbmZvLkxldmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIkxldmVsIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uVmlkZW9Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5WaWRlb0NvdW50ID0gcGFyc2VJbnQoaW5mby5WaWRlb0NvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlZpZGVvQ291bnQg5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuaehOW7uiBTa2luSW5mbyDnmoTlrZfnrKbkuLLkuI3lkIjms5UhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGB7XCJJZFwiOlwiJHt0aGlzLklkfVwiLFwiU3RhdGVcIjoke3RoaXMuU3RhdGV9XCIsXCJQcmljZVwiOlwiJHt0aGlzLlByaWNlfVwiLFwiVmlkZW9Db3VudFwiOlwiJHt0aGlzLlZpZGVvQ291bnR9XCJ9YDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEd1bkluZm8ge1xyXG4gICAgcHVibGljIElkOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIDA65pyq6Kej6ZSBXHJcbiAgICAgKiAxOuW3suino+mUgVxyXG4gICAgICogMjrlvZPliY3kvb/nlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIFN0YXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgUHJpY2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBMZXZlbDogbnVtYmVyO1xyXG4gICAgcHVibGljIFZpZGVvQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpbmZvOiBhbnkgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgaWYgKGluZm8uSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSWQgPSBwYXJzZUludChpbmZvLklkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIklkIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhdGUgPSBwYXJzZUludChpbmZvLlN0YXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlN0YXRlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uUHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJpY2UgPSBwYXJzZUludChpbmZvLlByaWNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlByaWNlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGV2ZWwgPSBwYXJzZUludChpbmZvLkxldmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIkxldmVsIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uVmlkZW9Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5WaWRlb0NvdW50ID0gcGFyc2VJbnQoaW5mby5WaWRlb0NvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlZpZGVvQ291bnQg5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuaehOW7uiBHdW5JbmZvIOeahOWtl+espuS4suS4jeWQiOazlSFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGB7XCJJZFwiOlwiJHt0aGlzLklkfVwiLFwiU3RhdGVcIjpcIiR7dGhpcy5TdGF0ZX1cIixcIlByaWNlXCI6XCIke3RoaXMuUHJpY2V9XCIsXCJMZXZlbFwiOlwiJHt0aGlzLkxldmVsfVwiLFwiVmlkZW9Db3VudFwiOlwiJHt0aGlzLlZpZGVvQ291bnR9XCJ9YDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNraWxsSW5mbyB7XHJcbiAgICBwdWJsaWMgSWQ6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogMDrmnKrop6PplIFcclxuICAgICAqIDE65bey6Kej6ZSBXHJcbiAgICAgKiAyOuW9k+WJjeS9v+eUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBQcmljZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gY2MubG9nKFwi5p6E5bu6IFNraW5JbmZvIDpcIiwgc3RyKTtcclxuICAgICAgICBsZXQgaW5mbzogYW55ID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklkID0gcGFyc2VJbnQoaW5mby5JZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJJZCDlrZfmrrXkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mby5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGF0ZSA9IHBhcnNlSW50KGluZm8uU3RhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiU3RhdGUg5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGluZm8uUHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJpY2UgPSBwYXJzZUludChpbmZvLlByaWNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlByaWNlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5sb2coXCLmnoTlu7ogU2tpbGxJbmZvIOeahOWtl+espuS4suS4jeWQiOazlSFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGB7XCJJZFwiOlwiJHt0aGlzLklkfVwiLFwiU3RhdGVcIjpcIiR7dGhpcy5TdGF0ZX1cIixcIlByaWNlXCI6XCIke3RoaXMuUHJpY2V9XCJ9YDtcclxuICAgIH1cclxufVxyXG5cclxuIl19