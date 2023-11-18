
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game/gameDate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9716b694upCZocbSYxp8T5t', 'gameDate');
// scripts/Game/gameDate.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardType = exports.PriceType = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PriceType;
(function (PriceType) {
    PriceType[PriceType["Gold"] = 0] = "Gold";
    PriceType[PriceType["Diamond"] = 1] = "Diamond";
    PriceType[PriceType["RankReward"] = 2] = "RankReward";
    PriceType[PriceType["ZhuanPanReward"] = 3] = "ZhuanPanReward";
    PriceType[PriceType["Level"] = 4] = "Level";
})(PriceType = exports.PriceType || (exports.PriceType = {}));
var RewardType;
(function (RewardType) {
    RewardType[RewardType["Gold"] = 0] = "Gold";
    RewardType[RewardType["Diamond"] = 1] = "Diamond";
    RewardType[RewardType["Skin"] = 2] = "Skin";
    RewardType[RewardType["Weapon"] = 3] = "Weapon";
})(RewardType = exports.RewardType || (exports.RewardType = {}));
var GameDate = /** @class */ (function () {
    function GameDate() {
    }
    GameDate.TimeReward = [
        { time: 1 * 60, coinNum: 1000, diamondNum: 100 },
        { time: 5 * 60, coinNum: 1500, diamondNum: 150 },
        { time: 15 * 60, coinNum: 2000, diamondNum: 200 },
        { time: 30 * 60, coinNum: 3000, diamondNum: 250 },
        { time: 60 * 60, coinNum: 5000, diamondNum: 300 },
    ];
    GameDate.TurntableReward = [
        { type: RewardType.Gold, num: 100 },
        { type: RewardType.Gold, num: 50 },
        { type: RewardType.Diamond, num: 10 },
        { type: RewardType.Gold, num: 50 },
        { type: RewardType.Gold, num: 150 },
        { type: RewardType.Skin, num: 11 },
        { type: RewardType.Gold, num: 200 },
        { type: RewardType.Gold, num: 50 },
        { type: RewardType.Diamond, num: 20 },
        { type: RewardType.Gold, num: 50 },
        { type: RewardType.Gold, num: 200 },
        { type: RewardType.Weapon, num: 14 }
    ];
    GameDate.Weapon = {
        "ak": {
            name: "ak步枪",
            id: 0,
            atk: [30, 33, 35, 40],
            atkRange: 1000,
            flySpeed: 2500,
            atkSpeed: [1 / 3.5, 1 / 3.5, 1 / 4, 1 / 4],
            bulletNum: 30,
            bulletTotal: [90, 90, 90, 120],
            reload: 3,
            priceType: PriceType.Gold,
            price: 0
        },
        "cfq": {
            name: "冲锋枪",
            id: 1,
            atk: [20, 22, 25, 30],
            atkRange: 1000,
            flySpeed: 2500,
            atkSpeed: [1 / 4, 1 / 4, 1 / 4.5, 1 / 5],
            bulletNum: 25,
            bulletTotal: [75, 75, 100, 100],
            reload: 2.5,
            priceType: PriceType.Gold,
            price: 1000
        },
        "dao": {
            name: "刀",
            id: 2,
            atk: [60, 65, 72, 75],
            atkRange: 300,
            flySpeed: 0,
            atkSpeed: [1 / 2, 1 / 2.5, 1 / 3, 1 / 3],
            bulletNum: 1,
            bulletTotal: [1, 1, 1, 1],
            reload: 3,
            priceType: PriceType.Gold,
            price: 2000
        },
        "gj": {
            name: "光剑",
            id: 3,
            atk: [55, 66, 72, 80],
            atkRange: 300,
            flySpeed: 0,
            atkSpeed: [1 / 2, 1 / 2.5, 1 / 3, 1 / 3],
            bulletNum: 1,
            bulletTotal: [1, 1, 1, 1],
            reload: 3,
            priceType: PriceType.Gold,
            price: 3500
        },
        "jgb": {
            name: "金箍棒",
            id: 4,
            atk: [100, 150, 200, 250],
            atkRange: 300,
            flySpeed: 0,
            atkSpeed: [1 / 1, 1 / 1, 1 / 1.5, 1 / 1.5],
            bulletNum: 1,
            bulletTotal: [1, 1, 1, 1],
            reload: 3,
            priceType: PriceType.Diamond,
            price: 500
        },
        "sd": {
            name: "散弹枪",
            id: 5,
            atk: [140, 160, 180, 200],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 2, 1 / 2, 1 / 2, 1 / 2],
            bulletNum: 2,
            bulletTotal: [10, 12, 14, 16],
            reload: 3,
            priceType: PriceType.Gold,
            price: 1500
        },
        "hdl": {
            name: "HDL",
            id: 6,
            atk: [40, 45, 48, 50],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 3, 1 / 4, 1 / 5, 1 / 5],
            bulletNum: 20,
            bulletTotal: [60, 80, 100, 120],
            reload: 2.5,
            priceType: PriceType.Gold,
            price: 2000
        },
        "sq": {
            name: "手枪",
            id: 7,
            atk: [40, 45, 50, 60],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 2, 1 / 2.5, 1 / 2.5, 1 / 4],
            bulletNum: 8,
            bulletTotal: [24, 32, 40, 48],
            reload: 2,
            priceType: PriceType.Gold,
            price: 500
        },
        "ju": {
            name: "狙击枪",
            id: 8,
            atk: [200, 250, 300, 400],
            atkRange: 1500,
            flySpeed: 2500,
            atkSpeed: [1 / 1, 1 / 1, 1 / 2, 1 / 2],
            bulletNum: 2,
            bulletTotal: [8, 10, 12, 14],
            reload: 3,
            priceType: PriceType.Gold,
            price: 5000
        },
        "ld": {
            name: "榴弹枪",
            id: 9,
            atk: [100, 120, 130, 140],
            atkRange: 800,
            flySpeed: 2000,
            atkSpeed: [1 / 2, 1 / 2.5, 1 / 4, 1 / 4],
            bulletNum: 3,
            bulletTotal: [15, 18, 21, 24],
            reload: 3,
            priceType: PriceType.Diamond,
            price: 500
        },
        "nnp": {
            name: "鸟鸟枪",
            id: 10,
            atk: [75, 80, 90, 100],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 2, 1 / 2, 1 / 3, 1 / 4],
            bulletNum: 5,
            bulletTotal: [20, 25, 30, 35],
            reload: 3,
            priceType: PriceType.ZhuanPanReward,
            price: 0,
            videoCount: 5
        },
        "gtst": {
            name: "钢铁手套",
            id: 11,
            atk: [30, 40, 45, 60],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 5, 1 / 5, 1 / 5, 1 / 5],
            bulletNum: 10,
            bulletTotal: [40, 50, 60, 70],
            reload: 3,
            priceType: PriceType.Diamond,
            price: 300
        },
        "tb": {
            name: "铁棒",
            id: 12,
            atk: [40, 50, 55, 60],
            atkRange: 300,
            flySpeed: 0,
            atkSpeed: [1 / 2, 1 / 2.5, 1 / 3, 1 / 3],
            bulletNum: 1,
            bulletTotal: [1, 1, 1, 1],
            reload: 3,
            priceType: PriceType.Gold,
            price: 1000
        },
        "mb": {
            name: "木棒",
            id: 13,
            atk: [30, 35, 40, 50],
            atkRange: 300,
            flySpeed: 0,
            atkSpeed: [1 / 2, 1 / 2.5, 1 / 3, 1 / 3],
            bulletNum: 1,
            bulletTotal: [1, 1, 1, 1],
            reload: 3,
            priceType: PriceType.Gold,
            price: 500
        },
        "mq": {
            name: "喵枪",
            id: 14,
            atk: [40, 44, 46, 50],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 5, 1 / 5, 1 / 5, 1 / 5],
            bulletNum: 30,
            bulletTotal: [60, 70, 80, 90],
            reload: 3,
            priceType: PriceType.ZhuanPanReward,
            price: 0,
            videoCount: 1
        },
        "szg": {
            name: "弩箭",
            id: 15,
            atk: [110, 150, 200, 250],
            atkRange: 2000,
            flySpeed: 3000,
            atkSpeed: [1 / 1, 1 / 1, 1 / 1, 1 / 2],
            bulletNum: 1,
            bulletTotal: [11, 12, 13, 15],
            reload: 3,
            priceType: PriceType.Diamond,
            price: 500
        },
        "rsq": {
            name: "镭射枪",
            id: 16,
            atk: [35, 40, 45, 50],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 5, 1 / 5, 1 / 5, 1 / 5],
            bulletNum: 15,
            bulletTotal: [45, 50, 75, 90],
            reload: 3,
            priceType: PriceType.Gold,
            price: 3000
        },
        "cjj": {
            name: "尖叫鸡",
            id: 17,
            atk: [50, 54, 63, 72],
            atkRange: 600,
            flySpeed: 0,
            atkSpeed: [1 / 2, 1 / 2, 1 / 3, 1 / 3],
            bulletNum: 5,
            bulletTotal: [30, 35, 40, 45],
            reload: 3,
            priceType: PriceType.Diamond,
            price: 300,
            videoCount: 1
        },
        "jtl": {
            name: "加特林",
            id: 18,
            atk: [30, 35, 40, 45],
            atkRange: 1000,
            flySpeed: 2500,
            atkSpeed: [1 / 9, 1 / 9, 1 / 9, 1 / 9],
            bulletNum: 50,
            bulletTotal: [150, 150, 200, 250],
            reload: 3,
            priceType: PriceType.Diamond,
            price: 1000,
            videoCount: 2
        },
        "sq2": {
            name: "双枪",
            music: "sq",
            id: 19,
            atk: [40, 45, 50, 60],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 4, 1 / 4, 1 / 4, 1 / 4],
            bulletNum: 12,
            bulletTotal: [48, 48, 60, 60],
            reload: 2,
            priceType: PriceType.Gold,
            price: 2000
        },
        "tj": {
            name: "突击步枪",
            music: "ak",
            id: 20,
            atk: [30, 35, 40, 50],
            atkRange: 1000,
            flySpeed: 2500,
            atkSpeed: [1 / 7, 1 / 7, 1 / 7, 1 / 7],
            bulletNum: 15,
            bulletTotal: [90, 90, 90, 105],
            reload: 3,
            priceType: PriceType.Gold,
            price: 2000
        },
        "fs": {
            name: "辐射",
            music: "rsq",
            id: 21,
            atk: [35, 40, 45, 50],
            atkRange: 1000,
            flySpeed: 2000,
            atkSpeed: [1 / 5, 1 / 5, 1 / 5, 1 / 5],
            bulletNum: 15,
            bulletTotal: [45, 45, 60, 60],
            reload: 3,
            priceType: PriceType.Gold,
            price: 2000
        }
    };
    GameDate.SkinMess = {
        "1": {
            name: "小黑人",
            xuedi: 3,
            hp: [330, 350, 360, 370, 380, 400, 450],
            atk: [1, 2, 4, 6, 8, 9, 10],
            speed: [520, 530, 540, 550, 560, 570, 580],
            priceType: PriceType.Gold,
            price: 0
        },
        "2": {
            name: "螺丝脑",
            xuedi: 3,
            hp: [350, 370, 380, 390, 420, 430, 440],
            atk: [2, 4, 5, 6, 8, 10, 12],
            speed: [525, 535, 545, 555, 565, 575, 600],
            priceType: PriceType.Gold,
            price: 1000
        },
        "3": {
            name: "蝙蝠头",
            xuedi: 4,
            hp: [360, 370, 380, 390, 400, 420, 450],
            atk: [4, 6, 8, 10, 12, 14, 18],
            speed: [523, 534, 556, 576, 587, 602, 624],
            priceType: PriceType.Gold,
            price: 2500
        },
        "4": {
            name: "铁盔头",
            xuedi: 6,
            hp: [400, 420, 440, 460, 480, 500, 520],
            atk: [1, 2, 4, 6, 8, 10, 12],
            speed: [502, 513, 523, 533, 543, 553, 563],
            priceType: PriceType.Diamond,
            price: 1000,
            videoCount: 2
        },
        "5": {
            name: "牛头",
            xuedi: 5,
            hp: [366, 374, 382, 396, 420, 450, 480],
            atk: [3, 5, 7, 11, 14, 15, 18],
            speed: [525, 534, 556, 566, 573, 584, 600],
            priceType: PriceType.Diamond,
            price: 500,
            videoCount: 1
        },
        "6": {
            name: "骷髅头",
            xuedi: 4,
            hp: [363, 372, 384, 397, 420, 444, 453],
            atk: [1, 3, 7, 9, 11, 14, 16],
            speed: [500, 510, 520, 530, 540, 550, 560],
            priceType: PriceType.Diamond,
            price: 300
        },
        "7": {
            name: "海兵头",
            xuedi: 4,
            hp: [363, 372, 386, 393, 424, 452, 463],
            atk: [2, 3, 6, 8, 11, 13, 14],
            speed: [515, 534, 555, 572, 584, 603, 610],
            priceType: PriceType.Gold,
            price: 2000
        },
        "8": {
            name: "小女孩",
            xuedi: 4,
            hp: [362, 377, 386, 393, 429, 444, 458],
            atk: [1, 2, 4, 6, 8, 10, 12],
            speed: [521, 530, 550, 570, 580, 600, 606],
            priceType: PriceType.Gold,
            price: 2000
        },
        "9": {
            name: "小盒子",
            xuedi: 4,
            hp: [364, 376, 387, 392, 421, 447, 463],
            atk: [1, 3, 6, 9, 12, 15, 16],
            speed: [525, 535, 545, 555, 565, 575, 600],
            priceType: PriceType.Diamond,
            price: 250
        },
        "10": {
            name: "小红帽",
            xuedi: 3,
            hp: [362, 373, 385, 396, 421, 456, 480],
            atk: [2, 5, 8, 12, 14, 15, 16],
            speed: [523, 544, 554, 573, 585, 509, 606],
            priceType: PriceType.Gold,
            price: 1500
        },
        "11": {
            name: "拳皇",
            xuedi: 5,
            hp: [368, 376, 384, 396, 425, 458, 468],
            atk: [1, 5, 8, 10, 15, 17, 20],
            speed: [524, 533, 544, 556, 571, 582, 605],
            priceType: PriceType.ZhuanPanReward,
            price: 0,
            videoCount: 1
        },
        "12": {
            name: "灰胡子",
            xuedi: 4,
            hp: [353, 372, 385, 403, 421, 444, 459],
            atk: [1, 2, 3, 5, 6, 9, 11],
            speed: [502, 513, 534, 543, 558, 563, 584],
            priceType: PriceType.Gold,
            price: 2000
        }
    };
    GameDate.EnemyMess = {
        "0": {
            name: "史莱姆",
            hp: 95,
            atk: 34,
            atkSpeed: 1 / 0.5,
            atkRange: 300,
            speed: 330
        },
        "1": {
            name: "小红人",
            hp: 130,
            atk: 0,
            atkSpeed: 1,
            atkRange: 800,
            speed: 450
        },
        "2": {
            name: "拳击手",
            hp: 400,
            atk: 50,
            atkSpeed: 1 / 0.5,
            atkRange: 400,
            speed: 400
        },
        "3": {
            name: "机枪手",
            hp: 250,
            atk: 0,
            atkSpeed: 1,
            atkRange: 1000,
            speed: 400
        },
        "4": {
            name: "雪人",
            hp: 600,
            atk: 40,
            atkSpeed: 1 / 0.5,
            atkRange: 300,
            speed: 400,
        },
        "5": {
            name: "双枪",
            hp: 1000,
            atk: 0,
            atkSpeed: 1,
            atkRange: 1000,
            speed: 450
        },
        "6": {
            name: "堡垒",
            hp: 500,
            atk: 50,
            atkSpeed: 1,
            atkRange: 1000,
            speed: 0
        },
        "7": {
            name: "海豹突击",
            hp: 400,
            atk: 0,
            atkSpeed: 1,
            atkRange: 1000,
            speed: 450
        },
        "8": {
            name: "辐射者",
            hp: 400,
            atk: 0,
            atkSpeed: 1,
            atkRange: 1000,
            speed: 420
        },
        "9": {
            name: "坦克炮",
            hp: 800,
            atk: 200,
            atkSpeed: 1 / 0.5,
            atkRange: 1000,
            speed: 440
        },
        "10": {
            name: "树人",
            hp: 500,
            atk: 50,
            atkSpeed: 1 / 0.5,
            atkRange: 300,
            speed: 200
        },
        "11": {
            name: "野猪",
            hp: 400,
            atk: 50,
            atkSpeed: 1 / 0.5,
            atkRange: 400,
            speed: 300
        },
        "12": {
            name: "树精",
            hp: 1000,
            atk: 50,
            atkSpeed: 1 / 0.5,
            atkRange: 500,
            speed: 250
        },
        "13": {
            name: "蜥蜴",
            hp: 1000,
            atk: 60,
            atkSpeed: 1,
            atkRange: 500,
            speed: 450
        }
    };
    GameDate.SkillMess = {
        "1": {
            name: "自愈",
            cd: 10,
            num: 30,
            introduce_zh: "恢复血量",
            introduce_en: "Restore HP",
            level: [
                { num: "150%", introduce_zh: "回复量提升50%", introduce_en: "Increase the number of replies by 50%" },
                { num: "150%", cd: "80%", introduce_zh: "回复量提升50%,冷却时间减少20%", introduce_en: "Recovery increased by 50%, cooling time reduced by 20%" },
                { num: "150%", cd: "50%", introduce_zh: "回复量提升50%,冷却时间减少50%", introduce_en: "Recovery increased by 50%, cooling time reduced by 50%" }
            ]
        },
        "2": {
            name: "血蝠",
            cd: 10,
            num: 50,
            target: "enemy",
            introduce_zh: "召唤血蝠攻击敌人",
            introduce_en: "Summon blood bats to attack enemies",
            level: [
                { num: "125%", scale: "1.5", introduce_zh: "伤害提升25%", introduce_en: "Damage increased by 25%" },
                { num: "125%", cd: "70%", scale: "1.5", introduce_zh: "伤害提升25%,冷却时间减少30%", introduce_en: "Damage increased by 25%, cooling time reduced by 30%" },
                { num: "145%", cd: "50%", scale: "1.5", introduce_zh: "伤害提升45%,冷却时间减少50%", introduce_en: "Damage increased by 45%, cooling time reduced by 50%" }
            ]
        },
        "3": {
            name: "铁甲",
            cd: 10,
            num: 2,
            introduce_zh: "生成护盾抵挡伤害",
            introduce_en: "Generate shield to resist damage",
            level: [
                { num: "150%", cd: "80%", scale: "1.2", introduce_zh: "持续3秒,冷却时间减少20%", introduce_en: "Lasts for 3 seconds, cooling time reduced by 20%" },
                { num: "200%", cd: "70%", scale: "1.4", introduce_zh: "持续4秒,冷却时间减少30%", introduce_en: "Lasts for 4 seconds, cooling time reduced by 30%" },
                { num: "250%", cd: "60%", scale: "1.6", introduce_zh: "持续5秒,冷却时间减少40%", introduce_en: "Lasts for 5 seconds, cooling time reduced by 40%" }
            ]
        },
        "4": {
            name: "愤怒",
            cd: 10,
            num: 40,
            introduce_zh: "增加攻击力",
            introduce_en: "Increase attack power",
            level: [
                { num: "120%", introduce_zh: "攻击力提升20%", introduce_en: "Attack power increased by 20%" },
                { num: "130%", cd: "90%", introduce_zh: "攻击力提升30%,冷却时间减少10%", introduce_en: "Attack power increased by 30%, cooling time reduced by 10%" },
                { num: "140%", cd: "70%", introduce_zh: "攻击力提升40%,冷却时间减少30%", introduce_en: "Attack power increased by 40%, cooling time reduced by 30%" }
            ]
        },
        "5": {
            name: "冥火",
            cd: 10,
            num: 100,
            target: "enemy",
            introduce_zh: "召唤火焰攻击敌人",
            introduce_en: "Summon fire to attack enemies",
            level: [
                { num: "120%", scale: "1.5", introduce_zh: "伤害提升20%", introduce_en: "Attack power increased by 20%" },
                { num: "150%", scale: "1.5", introduce_zh: "伤害提升50%", introduce_en: "Attack power increased by 50%" },
                { num: "150%", cd: "50%", scale: "1.5", introduce_zh: "伤害提升50%,冷却时间减少50%", introduce_en: "Damage increased by 50%, cooling time reduced by 50%" }
            ]
        },
        "6": {
            name: "水盾",
            cd: 10,
            num: 0.5,
            introduce_zh: "召唤水球护盾",
            introduce_en: "Summon water polo shield",
            level: [
                { num: "120%", introduce_zh: "护盾增加20%", introduce_en: "Shield increased by 20%" },
                { num: "130%", cd: "80%", introduce_zh: "护盾增加30%,冷却时间减少20%", introduce_en: "Shield increased by 30%, cooling time reduced by 20%" },
                { num: "130%", cd: "60%", introduce_zh: "护盾增加30%,冷却时间减少40%", introduce_en: "Shield increased by 30%, cooling time reduced by 40%" }
            ]
        },
        "7": {
            name: "风刃",
            cd: 10,
            num: 40,
            target: "enemy",
            introduce_zh: "释放风刃攻击敌人",
            introduce_en: "Release the wind to attack the enemy",
            level: [
                { num: "120%", cd: "80%", scale: "1.5", introduce_zh: "伤害提升20%,冷却时间减少20%", introduce_en: "Damage increased by 20%, cooling time reduced by 20%" },
                { num: "150%", cd: "70%", scale: "1.5", introduce_zh: "伤害提升50%,冷却时间减少30%", introduce_en: "Damage increased by 50%, cooling time reduced by 30%" },
                { num: "150%", cd: "50%", scale: "1.5", introduce_zh: "伤害提升50%,冷却时间减少50%", introduce_en: "Damage increased by 50%, cooling time reduced by 50%" }
            ]
        },
        "8": {
            name: "盲盒",
            cd: 20,
            num: 1,
            introduce_zh: "随机掉落道具",
            introduce_en: "Random dropping items",
            level: [
                { num: "200%", introduce_zh: "掉落道具+1", introduce_en: "Drop item+1" },
                { num: "300%", introduce_zh: "掉落道具+2", introduce_en: "Drop item+2" },
                { num: "300%", cd: "80%", introduce_zh: "掉落道具+2,冷却时间减少20%", introduce_en: "Drop item+2, cooling time reduced by 20%" }
            ]
        },
        "9": {
            name: "毒域",
            cd: 15,
            num: 4,
            target: "enemy",
            introduce_zh: "召唤毒阵",
            introduce_en: "Random dropping items",
            level: [
                { num: "125%", scale: "1.2", introduce_zh: "持续5秒,范围扩大20%", introduce_en: "Lasts for 5 seconds, the range expands by 20%" },
                { num: "150%", scale: "1.5", introduce_zh: "持续6秒,范围扩大50%", introduce_en: "Lasts for 6 seconds, the range expands by 50%" },
                { num: "150%", scale: "1.5", cd: "60%", introduce_zh: "持续6秒,范围扩大50,冷却时间减少40%", introduce_en: "Lasts for 6 seconds, the range is expanded by 50%" }
            ]
        },
        "10": {
            name: "至高之拳",
            cd: 10,
            num: 140,
            target: "enemy",
            introduce_zh: "召唤拳头攻击",
            introduce_en: "Summon fist attack",
            level: [
                { num: "120%", scale: "1.5", introduce_zh: "伤害提升25%", introduce_en: "Damage increased by 25%" },
                { num: "130%", cd: "60%", scale: "1.5", introduce_zh: "伤害提升25%,冷却时间减少40%", introduce_en: "Damage increased by 25%, cooling time reduced by 40%" },
                { num: "140%", cd: "40%", scale: "1.5", introduce_zh: "伤害提升25%,冷却时间减少60%", introduce_en: "Damage increased by 25%, cooling time reduced by 60%" }
            ]
        },
        "11": {
            name: "瞬闪",
            cd: 2,
            num: 300,
            introduce_zh: "闪现一段距离",
            introduce_en: "Flash a distance",
            level: [
                { num: "120%", introduce_zh: "闪现范围+20%", introduce_en: "Flash range+20%" },
                { num: "150%", introduce_zh: "闪现范围+50%", introduce_en: "Flash range+50%" },
                { num: "150%", cd: "50%", introduce_zh: "闪现范围+50%,冷却时间减少50%", introduce_en: "Flash range+50%, cooling time reduced by 50%" }
            ]
        },
        "12": {
            name: "世界缩小器",
            cd: 0,
            num: 1,
            introduce_zh: "血量增加,人物变大",
            introduce_en: "The life increases and the character becomes larger",
            level: [
                { num: "120%", scale: "1", introduce_zh: "血量增加20%,人物变大", introduce_en: "HP increased by 20%, and the character became larger" },
                { num: "140%", scale: "1.1", introduce_zh: "血量增加40%,人物变大", introduce_en: "HP increased by 40%, and the character became larger" },
                { num: "150%", scale: "1.2", introduce_zh: "血量增加50%,人物变大", introduce_en: "HP increased by 50%, and the character became larger" }
            ]
        },
        "13": {
            name: "世界扩大仪",
            cd: 0,
            num: 1,
            introduce_zh: "速度增加,人物变小",
            introduce_en: "The speed increases and the characters become smaller",
            level: [
                { num: "120%", scale: "0.6", introduce_zh: "速度增加20%,人物变小", introduce_en: "Speed increases by 20%, and the characters become smaller" },
                { num: "135%", scale: "0.55", introduce_zh: "速度增加35%,人物变小", introduce_en: "Speed increases by 35%, and the characters become smaller" },
                { num: "150%", scale: "0.5", introduce_zh: "速度增加50%,人物变小", introduce_en: "Speed increases by 50%, and the characters become smaller" }
            ]
        },
        "14": {
            name: "暴走药剂",
            cd: 0,
            num: 1,
            introduce_zh: "射速提升,换弹加快",
            introduce_en: "Increase the firing speed and speed up the cartridge change",
            level: [
                { num: "80%", introduce_zh: "射速增加20%", introduce_en: "Fire speed increased by 20%" },
                { num: "70%", reload: "60%", introduce_zh: "射速增加30%,换弹提升40%", introduce_en: "The firing speed is increased by 30%, cartridge change is increased by 40%" },
                { num: "60%", reload: "40%", introduce_zh: "射速增加40%,换弹提升60%", introduce_en: "The firing speed is increased by 40%, cartridge change is increased by 60%" }
            ]
        },
        "15": {
            name: "子弹背包",
            cd: 0,
            num: 1,
            introduce_zh: "增加子弹",
            introduce_en: "Add bullets",
            level: [
                { num: "120%", introduce_zh: "子弹数量增加20%", introduce_en: "Number of bullets increased by 20%" },
                { num: "140%", introduce_zh: "子弹数量增加40%", introduce_en: "Number of bullets increased by 40%" },
                { num: "160%", introduce_zh: "子弹数量增加60%", introduce_en: "Number of bullets increased by 60%" }
            ]
        },
        "16": {
            name: "刀客",
            cd: 0,
            num: 1,
            introduce_zh: "近战武器伤害提升",
            introduce_en: "Melee weapon damage increased",
            level: [
                { num: "120%", introduce_zh: "近战伤害增加20%", introduce_en: "Melee damage increased by 20%" },
                { num: "140%", introduce_zh: "近战伤害增加40%", introduce_en: "Melee damage increased by 40%" },
                { num: "180%", introduce_zh: "近战伤害增加80%", introduce_en: "Melee damage increased by 80%" }
            ]
        }
    };
    GameDate.PathMess = {
        path: {
            mapWidth: 6000,
            mapHeight: 5000,
            gridWidth: 200,
            gridHeight: 200,
            pathArr: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }
    };
    GameDate.ZombieMess = {
        "0": {
            name: "小僵",
            hp: 90,
            atk: 1,
            atkRange: 200,
            speed: 420
        },
        "1": {
            name: "铁通僵",
            hp: 200,
            atk: 1,
            atkRange: 200,
            speed: 400
        },
        "2": {
            name: "跑步僵",
            hp: 120,
            atk: 1,
            atkRange: 220,
            speed: 450
        },
        "3": {
            name: "跳跃僵",
            hp: 150,
            atk: 1,
            atkRange: 220,
            speed: 440
        },
        "4": {
            name: "菜刀僵",
            hp: 300,
            atk: 1,
            atkRange: 220,
            speed: 400
        },
        "5": {
            name: "炸弹僵",
            hp: 150,
            atk: 1,
            atkRange: 1000,
            speed: 400
        },
        "6": {
            name: "毒药僵",
            hp: 250,
            atk: 1,
            atkRange: 1000,
            speed: 400
        },
        "7": {
            name: "金币僵",
            hp: 250,
            atk: 1,
            atkRange: 200,
            speed: 400
        },
        "8": {
            name: "boss1",
            hp: 1500,
            atk: 1,
            atkRange: 300,
            speed: 500
        },
        "9": {
            name: "boss2",
            hp: 2000,
            atk: 1,
            atkRange: 350,
            speed: 500
        },
        "10": {
            name: "boss3",
            hp: 2500,
            atk: 1,
            atkRange: 200,
            speed: 500
        },
        "11": {
            name: "boss4",
            hp: 3000,
            atk: 1,
            atkRange: 250,
            speed: 500
        },
        "12": {
            name: "boss5",
            hp: 3500,
            atk: 1,
            atkRange: 250,
            speed: 500
        },
        "13": {
            name: "boss6",
            hp: 4000,
            atk: 1,
            atkRange: 250,
            speed: 500
        },
        "14": {
            name: "boss7",
            hp: 4500,
            atk: 1,
            atkRange: 450,
            speed: 500
        },
        "15": {
            name: "boss8",
            hp: 5000,
            atk: 1,
            atkRange: 400,
            speed: 500
        },
        "16": {
            name: "boss9",
            hp: 5500,
            atk: 1,
            atkRange: 300,
            speed: 500
        },
        "17": {
            name: "boss10",
            hp: 6000,
            atk: 1,
            atkRange: 200,
            speed: 500
        },
        "18": {
            name: "boss11",
            hp: 6600,
            atk: 1,
            atkRange: 300,
            speed: 500
        },
        "19": {
            name: "boss12",
            hp: 7200,
            atk: 1,
            atkRange: 450,
            speed: 500
        },
        "20": {
            name: "boss13",
            hp: 8000,
            atk: 1,
            atkRange: 300,
            speed: 500
        }
    };
    GameDate = __decorate([
        ccclass
    ], GameDate);
    return GameDate;
}());
exports.default = GameDate;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZVxcZ2FtZURhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBWSxTQU1YO0FBTkQsV0FBWSxTQUFTO0lBQ2pCLHlDQUFJLENBQUE7SUFDSiwrQ0FBTyxDQUFBO0lBQ1AscURBQVUsQ0FBQTtJQUNWLDZEQUFjLENBQUE7SUFDZCwyQ0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQU5XLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBTXBCO0FBRUQsSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ2xCLDJDQUFRLENBQUE7SUFDUixpREFBTyxDQUFBO0lBQ1AsMkNBQUksQ0FBQTtJQUNKLCtDQUFNLENBQUE7QUFDVixDQUFDLEVBTFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUFHRDtJQUFBO0lBNjZCQSxDQUFDO0lBMzZCMEIsbUJBQVUsR0FBNEQ7UUFDekYsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDaEQsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDaEQsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDakQsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDakQsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7S0FDcEQsQ0FBQTtJQUVzQix3QkFBZSxHQUF3QztRQUMxRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7UUFDbkMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNyQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDbEMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQ25DLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNsQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7UUFDbkMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNyQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDbEMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQ25DLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtLQUN2QyxDQUFBO0lBRXNCLGVBQU0sR0FBRztRQUM1QixJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsTUFBTTtZQUNaLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO1lBQzlCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxDQUFDO1NBQ1g7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQy9CLE1BQU0sRUFBRSxHQUFHO1lBQ1gsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNULEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsRUFBRSxDQUFDO1lBQ1osV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsRUFBRSxDQUFDO1lBQ1osV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ3pCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxDQUFDO1lBQ1osV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPO1lBQzVCLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFNBQVMsRUFBRSxDQUFDO1lBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLENBQUMsRUFB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QUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFNBQVMsRUFBRSxDQUFDO1lBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPO1lBQzVCLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxFQUFFO1lBQ04sR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxFQUFFO1lBQ04sR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FB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Q0FBQyxDQUFDO1lBQ3RDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ2Q7S0FDSixDQUFBO0lBRXNCLGlCQUFRLEdBQUc7UUFDOUIsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsQ0FBQztTQUNYO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDNUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNkO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDOUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNkO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDNUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTztZQUM1QixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDOUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTztZQUM1QixLQUFLLEVBQUUsR0FBRztZQUNWLFVBQVUsRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDN0IsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTztZQUM1QixLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDN0IsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNkO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDNUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNkO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDN0IsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTztZQUM1QixLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDOUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNkO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDOUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsY0FBYztZQUNuQyxLQUFLLEVBQUUsQ0FBQztZQUNSLFVBQVUsRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNkO0tBQ0osQ0FBQTtJQUVzQixrQkFBUyxHQUFHO1FBQy9CLEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEVBQUU7WUFDTixHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRztZQUNqQixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxHQUFHO1lBQ1AsR0FBRyxFQUFFLENBQUM7WUFDTixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRztZQUNqQixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxHQUFHO1lBQ1AsR0FBRyxFQUFFLENBQUM7WUFDTixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRztZQUNqQixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxJQUFJO1lBQ1IsR0FBRyxFQUFFLENBQUM7WUFDTixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxDQUFDO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsQ0FBQztTQUNYO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLE1BQU07WUFDWixFQUFFLEVBQUUsR0FBRztZQUNQLEdBQUcsRUFBRSxDQUFDO1lBQ04sUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsS0FBSztZQUNYLEVBQUUsRUFBRSxHQUFHO1lBQ1AsR0FBRyxFQUFFLENBQUM7WUFDTixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsR0FBRztZQUNSLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRztZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxHQUFHO1lBQ1AsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUc7WUFDakIsUUFBUSxFQUFFLEdBQUc7WUFDYixLQUFLLEVBQUUsR0FBRztTQUNiO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsR0FBRztZQUNQLEdBQUcsRUFBRSxFQUFFO1lBQ1AsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHO1lBQ2pCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRztZQUNqQixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxJQUFJO1lBQ1IsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtLQUNKLENBQUE7SUFFc0Isa0JBQVMsR0FBRztRQUMvQixHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxFQUFFO1lBQ04sR0FBRyxFQUFFLEVBQUU7WUFDUCxZQUFZLEVBQUUsTUFBTTtZQUNwQixZQUFZLEVBQUUsWUFBWTtZQUMxQixLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLHVDQUF1QyxFQUFFO2dCQUNoRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLHdEQUF3RCxFQUFFO2dCQUN0SSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLHdEQUF3RCxFQUFFO2FBQ3pJO1NBQ0o7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxFQUFFO1lBQ04sR0FBRyxFQUFFLEVBQUU7WUFDUCxNQUFNLEVBQUUsT0FBTztZQUNmLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFlBQVksRUFBRSxxQ0FBcUM7WUFDbkQsS0FBSyxFQUFFO2dCQUNILEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFO2dCQUMvRixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsc0RBQXNELEVBQUU7Z0JBQ2pKLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxzREFBc0QsRUFBRTthQUNwSjtTQUNKO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsRUFBRTtZQUNOLEdBQUcsRUFBRSxDQUFDO1lBQ04sWUFBWSxFQUFFLFVBQVU7WUFDeEIsWUFBWSxFQUFFLGtDQUFrQztZQUNoRCxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGtEQUFrRCxFQUFFO2dCQUMxSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsa0RBQWtELEVBQUU7Z0JBQzFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxrREFBa0QsRUFBRTthQUM3STtTQUNKO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsRUFBRTtZQUNOLEdBQUcsRUFBRSxFQUFFO1lBQ1AsWUFBWSxFQUFFLE9BQU87WUFDckIsWUFBWSxFQUFFLHVCQUF1QjtZQUNyQyxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO2dCQUN4RixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLDREQUE0RCxFQUFFO2dCQUMxSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLDREQUE0RCxFQUFFO2FBQzdJO1NBQ0o7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxFQUFFO1lBQ04sR0FBRyxFQUFFLEdBQUc7WUFDUixNQUFNLEVBQUUsT0FBTztZQUNmLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFlBQVksRUFBRSwrQkFBK0I7WUFDN0MsS0FBSyxFQUFFO2dCQUNILEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO2dCQUNyRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSwrQkFBK0IsRUFBRTtnQkFDckcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHNEQUFzRCxFQUFFO2FBQ3BKO1NBQ0o7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxFQUFFO1lBQ04sR0FBRyxFQUFFLEdBQUc7WUFDUixZQUFZLEVBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUUsMEJBQTBCO1lBQ3hDLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUseUJBQXlCLEVBQUU7Z0JBQ2pGLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsc0RBQXNELEVBQUU7Z0JBQ25JLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsc0RBQXNELEVBQUU7YUFDdEk7U0FDSjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLEVBQUU7WUFDTixHQUFHLEVBQUUsRUFBRTtZQUNQLE1BQU0sRUFBRSxPQUFPO1lBQ2YsWUFBWSxFQUFFLFVBQVU7WUFDeEIsWUFBWSxFQUFFLHNDQUFzQztZQUNwRCxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHNEQUFzRCxFQUFFO2dCQUNqSixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsc0RBQXNELEVBQUU7Z0JBQ2pKLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxzREFBc0QsRUFBRTthQUNwSjtTQUNKO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsRUFBRTtZQUNOLEdBQUcsRUFBRSxDQUFDO1lBQ04sWUFBWSxFQUFFLFFBQVE7WUFDdEIsWUFBWSxFQUFFLHVCQUF1QjtZQUNyQyxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtnQkFDcEUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtnQkFDcEUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSwwQ0FBMEMsRUFBRTthQUN6SDtTQUNKO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsRUFBRTtZQUNOLEdBQUcsRUFBRSxDQUFDO1lBQ04sTUFBTSxFQUFFLE9BQU87WUFDZixZQUFZLEVBQUUsTUFBTTtZQUNwQixZQUFZLEVBQUUsdUJBQXVCO1lBQ3JDLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSwrQ0FBK0MsRUFBRTtnQkFDMUgsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsK0NBQStDLEVBQUU7Z0JBQzFILEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxtREFBbUQsRUFBRTthQUNySjtTQUNKO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLE1BQU07WUFDWixFQUFFLEVBQUUsRUFBRTtZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsTUFBTSxFQUFFLE9BQU87WUFDZixZQUFZLEVBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUUsb0JBQW9CO1lBQ2xDLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSx5QkFBeUIsRUFBRTtnQkFDL0YsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHNEQUFzRCxFQUFFO2dCQUNqSixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsc0RBQXNELEVBQUU7YUFDcEo7U0FDSjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUsR0FBRztZQUNSLFlBQVksRUFBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsS0FBSyxFQUFFO2dCQUNILEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTtnQkFDMUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFO2dCQUMxRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLDhDQUE4QyxFQUFFO2FBQy9IO1NBQ0o7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsT0FBTztZQUNiLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUM7WUFDTixZQUFZLEVBQUUsV0FBVztZQUN6QixZQUFZLEVBQUUscURBQXFEO1lBQ25FLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxzREFBc0QsRUFBRTtnQkFDL0gsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsc0RBQXNELEVBQUU7Z0JBQ2pJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLHNEQUFzRCxFQUFFO2FBQ3BJO1NBQ0o7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsT0FBTztZQUNiLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUM7WUFDTixZQUFZLEVBQUUsV0FBVztZQUN6QixZQUFZLEVBQUUsdURBQXVEO1lBQ3JFLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSwyREFBMkQsRUFBRTtnQkFDdEksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsMkRBQTJELEVBQUU7Z0JBQ3ZJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLDJEQUEyRCxFQUFFO2FBQ3pJO1NBQ0o7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsTUFBTTtZQUNaLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUM7WUFDTixZQUFZLEVBQUUsV0FBVztZQUN6QixZQUFZLEVBQUUsNkRBQTZEO1lBQzNFLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsNkJBQTZCLEVBQUU7Z0JBQ3BGLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsNEVBQTRFLEVBQUU7Z0JBQzFKLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsNEVBQTRFLEVBQUU7YUFDN0o7U0FDSjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxNQUFNO1lBQ1osRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUsQ0FBQztZQUNOLFlBQVksRUFBRSxNQUFNO1lBQ3BCLFlBQVksRUFBRSxhQUFhO1lBQzNCLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsb0NBQW9DLEVBQUU7Z0JBQzlGLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxvQ0FBb0MsRUFBRTtnQkFDOUYsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLG9DQUFvQyxFQUFFO2FBQ2pHO1NBQ0o7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLENBQUM7WUFDTixZQUFZLEVBQUUsVUFBVTtZQUN4QixZQUFZLEVBQUUsK0JBQStCO1lBQzdDLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsK0JBQStCLEVBQUU7Z0JBQ3pGLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSwrQkFBK0IsRUFBRTtnQkFDekYsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO2FBQzVGO1NBQ0o7S0FDSixDQUFBO0lBRXNCLGlCQUFRLEdBQUc7UUFDOUIsSUFBSSxFQUFFO1lBQ0YsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxHQUFHO1lBQ2QsVUFBVSxFQUFFLEdBQUc7WUFFZixPQUFPLEVBQUU7Z0JBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5RTtTQUNKO0tBQ0osQ0FBQTtJQUVzQixtQkFBVSxHQUFHO1FBQ2hDLEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLEVBQUU7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxPQUFPO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLElBQUk7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7U0FDYjtLQUNKLENBQUE7SUE1NkJnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBNjZCNUI7SUFBRCxlQUFDO0NBNzZCRCxBQTY2QkMsSUFBQTtrQkE3NkJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBQcmljZVR5cGUge1xyXG4gICAgR29sZCxcclxuICAgIERpYW1vbmQsXHJcbiAgICBSYW5rUmV3YXJkLFxyXG4gICAgWmh1YW5QYW5SZXdhcmQsXHJcbiAgICBMZXZlbFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBSZXdhcmRUeXBlIHtcclxuICAgIEdvbGQgPSAwLFxyXG4gICAgRGlhbW9uZCxcclxuICAgIFNraW4sXHJcbiAgICBXZWFwb25cclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZURhdGUge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVGltZVJld2FyZDogeyB0aW1lOiBudW1iZXIsIGNvaW5OdW06IG51bWJlciwgZGlhbW9uZE51bTogbnVtYmVyIH1bXSA9IFtcclxuICAgICAgICB7IHRpbWU6IDEgKiA2MCwgY29pbk51bTogMTAwMCwgZGlhbW9uZE51bTogMTAwIH0sXHJcbiAgICAgICAgeyB0aW1lOiA1ICogNjAsIGNvaW5OdW06IDE1MDAsIGRpYW1vbmROdW06IDE1MCB9LFxyXG4gICAgICAgIHsgdGltZTogMTUgKiA2MCwgY29pbk51bTogMjAwMCwgZGlhbW9uZE51bTogMjAwIH0sXHJcbiAgICAgICAgeyB0aW1lOiAzMCAqIDYwLCBjb2luTnVtOiAzMDAwLCBkaWFtb25kTnVtOiAyNTAgfSxcclxuICAgICAgICB7IHRpbWU6IDYwICogNjAsIGNvaW5OdW06IDUwMDAsIGRpYW1vbmROdW06IDMwMCB9LFxyXG4gICAgXVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHVybnRhYmxlUmV3YXJkOiB7IHR5cGU6IFJld2FyZFR5cGUsIG51bTogbnVtYmVyIH1bXSA9IFtcclxuICAgICAgICB7IHR5cGU6IFJld2FyZFR5cGUuR29sZCwgbnVtOiAxMDAgfSxcclxuICAgICAgICB7IHR5cGU6IFJld2FyZFR5cGUuR29sZCwgbnVtOiA1MCB9LFxyXG4gICAgICAgIHsgdHlwZTogUmV3YXJkVHlwZS5EaWFtb25kLCBudW06IDEwIH0sXHJcbiAgICAgICAgeyB0eXBlOiBSZXdhcmRUeXBlLkdvbGQsIG51bTogNTAgfSxcclxuICAgICAgICB7IHR5cGU6IFJld2FyZFR5cGUuR29sZCwgbnVtOiAxNTAgfSxcclxuICAgICAgICB7IHR5cGU6IFJld2FyZFR5cGUuU2tpbiwgbnVtOiAxMSB9LFxyXG4gICAgICAgIHsgdHlwZTogUmV3YXJkVHlwZS5Hb2xkLCBudW06IDIwMCB9LFxyXG4gICAgICAgIHsgdHlwZTogUmV3YXJkVHlwZS5Hb2xkLCBudW06IDUwIH0sXHJcbiAgICAgICAgeyB0eXBlOiBSZXdhcmRUeXBlLkRpYW1vbmQsIG51bTogMjAgfSxcclxuICAgICAgICB7IHR5cGU6IFJld2FyZFR5cGUuR29sZCwgbnVtOiA1MCB9LFxyXG4gICAgICAgIHsgdHlwZTogUmV3YXJkVHlwZS5Hb2xkLCBudW06IDIwMCB9LFxyXG4gICAgICAgIHsgdHlwZTogUmV3YXJkVHlwZS5XZWFwb24sIG51bTogMTQgfVxyXG4gICAgXVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgV2VhcG9uID0ge1xyXG4gICAgICAgIFwiYWtcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImFr5q2l5p6qXCIsXHJcbiAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICBhdGs6IFszMCwgMzMsIDM1LCA0MF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMjUwMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gMy41LCAxIC8gMy41LCAxIC8gNCwgMSAvIDRdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDMwLFxyXG4gICAgICAgICAgICBidWxsZXRUb3RhbDogWzkwLCA5MCwgOTAsIDEyMF0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2ZxXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlhrLplIvmnqpcIixcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIGF0azogWzIwLCAyMiwgMjUsIDMwXSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDEwMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAyNTAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyA0LCAxIC8gNCwgMSAvIDQuNSwgMSAvIDVdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDI1LFxyXG4gICAgICAgICAgICBidWxsZXRUb3RhbDogWzc1LCA3NSwgMTAwLCAxMDBdLFxyXG4gICAgICAgICAgICByZWxvYWQ6IDIuNSxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDEwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZGFvXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLliIBcIixcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIGF0azogWzYwLCA2NSwgNzIsIDc1XSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDMwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDIsIDEgLyAyLjUsIDEgLyAzLCAxIC8gM10sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogMSxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgcmVsb2FkOiAzLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5Hb2xkLFxyXG4gICAgICAgICAgICBwcmljZTogMjAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnalwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5YWJ5YmRXCIsXHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBhdGs6IFs1NSwgNjYsIDcyLCA4MF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAzMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyAyLCAxIC8gMi41LCAxIC8gMywgMSAvIDNdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDEsXHJcbiAgICAgICAgICAgIGJ1bGxldFRvdGFsOiBbMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDM1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiamdiXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLph5Hnro3mo5JcIixcclxuICAgICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgICAgIGF0azogWzEwMCwgMTUwLCAyMDAsIDI1MF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAzMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyAxLCAxIC8gMSwgMSAvIDEuNSwgMSAvIDEuNV0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogMSxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgcmVsb2FkOiAzLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5EaWFtb25kLFxyXG4gICAgICAgICAgICBwcmljZTogNTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNkXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmlaPlvLnmnqpcIixcclxuICAgICAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgICAgIGF0azogWzE0MCwgMTYwLCAxODAsIDIwMF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gMiwgMSAvIDIsIDEgLyAyLCAxIC8gMl0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogMixcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsxMCwgMTIsIDE0LCAxNl0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDE1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiaGRsXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJIRExcIixcclxuICAgICAgICAgICAgaWQ6IDYsXHJcbiAgICAgICAgICAgIGF0azogWzQwLCA0NSwgNDgsIDUwXSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDEwMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyAzLCAxIC8gNCwgMSAvIDUsIDEgLyA1XSxcclxuICAgICAgICAgICAgYnVsbGV0TnVtOiAyMCxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFs2MCwgODAsIDEwMCwgMTIwXSxcclxuICAgICAgICAgICAgcmVsb2FkOiAyLjUsXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkdvbGQsXHJcbiAgICAgICAgICAgIHByaWNlOiAyMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNxXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmiYvmnqpcIixcclxuICAgICAgICAgICAgaWQ6IDcsXHJcbiAgICAgICAgICAgIGF0azogWzQwLCA0NSwgNTAsIDYwXSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDEwMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyAyLCAxIC8gMi41LCAxIC8gMi41LCAxIC8gNF0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogOCxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsyNCwgMzIsIDQwLCA0OF0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMixcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi54uZ5Ye75p6qXCIsXHJcbiAgICAgICAgICAgIGlkOiA4LFxyXG4gICAgICAgICAgICBhdGs6IFsyMDAsIDI1MCwgMzAwLCA0MDBdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTUwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDI1MDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDEsIDEgLyAxLCAxIC8gMiwgMSAvIDJdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDIsXHJcbiAgICAgICAgICAgIGJ1bGxldFRvdGFsOiBbOCwgMTAsIDEyLCAxNF0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDUwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibGRcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuamtOW8ueaeqlwiLFxyXG4gICAgICAgICAgICBpZDogOSxcclxuICAgICAgICAgICAgYXRrOiBbMTAwLCAxMjAsIDEzMCwgMTQwXSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDgwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDIsIDEgLyAyLjUsIDEgLyA0LCAxIC8gNF0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogMyxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsxNSwgMTgsIDIxLCAyNF0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuRGlhbW9uZCxcclxuICAgICAgICAgICAgcHJpY2U6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJubnBcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIum4n+m4n+aeqlwiLFxyXG4gICAgICAgICAgICBpZDogMTAsXHJcbiAgICAgICAgICAgIGF0azogWzc1LCA4MCwgOTAsIDEwMF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gMiwgMSAvIDIsIDEgLyAzLCAxIC8gNF0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogNSxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsyMCwgMjUsIDMwLCAzNV0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuWmh1YW5QYW5SZXdhcmQsXHJcbiAgICAgICAgICAgIHByaWNlOiAwLFxyXG4gICAgICAgICAgICB2aWRlb0NvdW50OiA1XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImd0c3RcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIumSoumTgeaJi+Wll1wiLFxyXG4gICAgICAgICAgICBpZDogMTEsXHJcbiAgICAgICAgICAgIGF0azogWzMwLCA0MCwgNDUsIDYwXSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDEwMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyA1LCAxIC8gNSwgMSAvIDUsIDEgLyA1XSxcclxuICAgICAgICAgICAgYnVsbGV0TnVtOiAxMCxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFs0MCwgNTAsIDYwLCA3MF0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuRGlhbW9uZCxcclxuICAgICAgICAgICAgcHJpY2U6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0YlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6ZOB5qOSXCIsXHJcbiAgICAgICAgICAgIGlkOiAxMixcclxuICAgICAgICAgICAgYXRrOiBbNDAsIDUwLCA1NSwgNjBdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMzAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gMiwgMSAvIDIuNSwgMSAvIDMsIDEgLyAzXSxcclxuICAgICAgICAgICAgYnVsbGV0TnVtOiAxLFxyXG4gICAgICAgICAgICBidWxsZXRUb3RhbDogWzEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICByZWxvYWQ6IDMsXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkdvbGQsXHJcbiAgICAgICAgICAgIHByaWNlOiAxMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1iXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmnKjmo5JcIixcclxuICAgICAgICAgICAgaWQ6IDEzLFxyXG4gICAgICAgICAgICBhdGs6IFszMCwgMzUsIDQwLCA1MF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAzMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyAyLCAxIC8gMi41LCAxIC8gMywgMSAvIDNdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDEsXHJcbiAgICAgICAgICAgIGJ1bGxldFRvdGFsOiBbMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtcVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5Za15p6qXCIsXHJcbiAgICAgICAgICAgIGlkOiAxNCxcclxuICAgICAgICAgICAgYXRrOiBbNDAsIDQ0LCA0NiwgNTBdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTAwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDUsIDEgLyA1LCAxIC8gNSwgMSAvIDVdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDMwLFxyXG4gICAgICAgICAgICBidWxsZXRUb3RhbDogWzYwLCA3MCwgODAsIDkwXSxcclxuICAgICAgICAgICAgcmVsb2FkOiAzLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5aaHVhblBhblJld2FyZCxcclxuICAgICAgICAgICAgcHJpY2U6IDAsXHJcbiAgICAgICAgICAgIHZpZGVvQ291bnQ6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic3pnXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlvKnnrq1cIixcclxuICAgICAgICAgICAgaWQ6IDE1LFxyXG4gICAgICAgICAgICBhdGs6IFsxMTAsIDE1MCwgMjAwLCAyNTBdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMjAwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDMwMDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDEsIDEgLyAxLCAxIC8gMSwgMSAvIDJdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDEsXHJcbiAgICAgICAgICAgIGJ1bGxldFRvdGFsOiBbMTEsIDEyLCAxMywgMTVdLFxyXG4gICAgICAgICAgICByZWxvYWQ6IDMsXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkRpYW1vbmQsXHJcbiAgICAgICAgICAgIHByaWNlOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicnNxXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLpla3lsITmnqpcIixcclxuICAgICAgICAgICAgaWQ6IDE2LFxyXG4gICAgICAgICAgICBhdGs6IFszNSwgNDAsIDQ1LCA1MF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gNSwgMSAvIDUsIDEgLyA1LCAxIC8gNV0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogMTUsXHJcbiAgICAgICAgICAgIGJ1bGxldFRvdGFsOiBbNDUsIDUwLCA3NSwgOTBdLFxyXG4gICAgICAgICAgICByZWxvYWQ6IDMsXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkdvbGQsXHJcbiAgICAgICAgICAgIHByaWNlOiAzMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNqalwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5bCW5Y+r6bihXCIsXHJcbiAgICAgICAgICAgIGlkOiAxNyxcclxuICAgICAgICAgICAgYXRrOiBbNTAsIDU0LCA2MywgNzJdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogNjAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gMiwgMSAvIDIsIDEgLyAzLCAxIC8gM10sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogNSxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFszMCwgMzUsIDQwLCA0NV0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuRGlhbW9uZCxcclxuICAgICAgICAgICAgcHJpY2U6IDMwMCxcclxuICAgICAgICAgICAgdmlkZW9Db3VudDogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdGxcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuWKoOeJueael1wiLFxyXG4gICAgICAgICAgICBpZDogMTgsXHJcbiAgICAgICAgICAgIGF0azogWzMwLCAzNSwgNDAsIDQ1XSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDEwMDAsXHJcbiAgICAgICAgICAgIGZseVNwZWVkOiAyNTAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogWzEgLyA5LCAxIC8gOSwgMSAvIDksIDEgLyA5XSxcclxuICAgICAgICAgICAgYnVsbGV0TnVtOiA1MCxcclxuICAgICAgICAgICAgYnVsbGV0VG90YWw6IFsxNTAsIDE1MCwgMjAwLCAyNTBdLFxyXG4gICAgICAgICAgICByZWxvYWQ6IDMsXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkRpYW1vbmQsXHJcbiAgICAgICAgICAgIHByaWNlOiAxMDAwLFxyXG4gICAgICAgICAgICB2aWRlb0NvdW50OiAyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNxMlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5Y+M5p6qXCIsXHJcbiAgICAgICAgICAgIG11c2ljOiBcInNxXCIsXHJcbiAgICAgICAgICAgIGlkOiAxOSxcclxuICAgICAgICAgICAgYXRrOiBbNDAsIDQ1LCA1MCwgNjBdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTAwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDQsIDEgLyA0LCAxIC8gNCwgMSAvIDRdLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDEyLFxyXG4gICAgICAgICAgICBidWxsZXRUb3RhbDogWzQ4LCA0OCwgNjAsIDYwXSxcclxuICAgICAgICAgICAgcmVsb2FkOiAyLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5Hb2xkLFxyXG4gICAgICAgICAgICBwcmljZTogMjAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0alwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi56qB5Ye75q2l5p6qXCIsXHJcbiAgICAgICAgICAgIG11c2ljOiBcImFrXCIsXHJcbiAgICAgICAgICAgIGlkOiAyMCxcclxuICAgICAgICAgICAgYXRrOiBbMzAsIDM1LCA0MCwgNTBdLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTAwMCxcclxuICAgICAgICAgICAgZmx5U3BlZWQ6IDI1MDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiBbMSAvIDcsIDEgLyA3LCAxIC8gNywgMSAvIDddLFxyXG4gICAgICAgICAgICBidWxsZXROdW06IDE1LFxyXG4gICAgICAgICAgICBidWxsZXRUb3RhbDogWzkwLCA5MCwgOTAsIDEwNV0sXHJcbiAgICAgICAgICAgIHJlbG9hZDogMyxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDIwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZnNcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIui+kOWwhFwiLFxyXG4gICAgICAgICAgICBtdXNpYzogXCJyc3FcIixcclxuICAgICAgICAgICAgaWQ6IDIxLFxyXG4gICAgICAgICAgICBhdGs6IFszNSwgNDAsIDQ1LCA1MF0sXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBmbHlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IFsxIC8gNSwgMSAvIDUsIDEgLyA1LCAxIC8gNV0sXHJcbiAgICAgICAgICAgIGJ1bGxldE51bTogMTUsXHJcbiAgICAgICAgICAgIGJ1bGxldFRvdGFsOiBbNDUsIDQ1LCA2MCwgNjBdLFxyXG4gICAgICAgICAgICByZWxvYWQ6IDMsXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkdvbGQsXHJcbiAgICAgICAgICAgIHByaWNlOiAyMDAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU2tpbk1lc3MgPSB7XHJcbiAgICAgICAgXCIxXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlsI/pu5HkurpcIixcclxuICAgICAgICAgICAgeHVlZGk6IDMsXHJcbiAgICAgICAgICAgIGhwOiBbMzMwLCAzNTAsIDM2MCwgMzcwLCAzODAsIDQwMCwgNDUwXSxcclxuICAgICAgICAgICAgYXRrOiBbMSwgMiwgNCwgNiwgOCwgOSwgMTBdLFxyXG4gICAgICAgICAgICBzcGVlZDogWzUyMCwgNTMwLCA1NDAsIDU1MCwgNTYwLCA1NzAsIDU4MF0sXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkdvbGQsXHJcbiAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjJcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuieuuS4neiEkVwiLFxyXG4gICAgICAgICAgICB4dWVkaTogMyxcclxuICAgICAgICAgICAgaHA6IFszNTAsIDM3MCwgMzgwLCAzOTAsIDQyMCwgNDMwLCA0NDBdLFxyXG4gICAgICAgICAgICBhdGs6IFsyLCA0LCA1LCA2LCA4LCAxMCwgMTJdLFxyXG4gICAgICAgICAgICBzcGVlZDogWzUyNSwgNTM1LCA1NDUsIDU1NSwgNTY1LCA1NzUsIDYwMF0sXHJcbiAgICAgICAgICAgIHByaWNlVHlwZTogUHJpY2VUeXBlLkdvbGQsXHJcbiAgICAgICAgICAgIHByaWNlOiAxMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjNcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuidmeidoOWktFwiLFxyXG4gICAgICAgICAgICB4dWVkaTogNCxcclxuICAgICAgICAgICAgaHA6IFszNjAsIDM3MCwgMzgwLCAzOTAsIDQwMCwgNDIwLCA0NTBdLFxyXG4gICAgICAgICAgICBhdGs6IFs0LCA2LCA4LCAxMCwgMTIsIDE0LCAxOF0sXHJcbiAgICAgICAgICAgIHNwZWVkOiBbNTIzLCA1MzQsIDU1NiwgNTc2LCA1ODcsIDYwMiwgNjI0XSxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDI1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiNFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6ZOB55uU5aS0XCIsXHJcbiAgICAgICAgICAgIHh1ZWRpOiA2LFxyXG4gICAgICAgICAgICBocDogWzQwMCwgNDIwLCA0NDAsIDQ2MCwgNDgwLCA1MDAsIDUyMF0sXHJcbiAgICAgICAgICAgIGF0azogWzEsIDIsIDQsIDYsIDgsIDEwLCAxMl0sXHJcbiAgICAgICAgICAgIHNwZWVkOiBbNTAyLCA1MTMsIDUyMywgNTMzLCA1NDMsIDU1MywgNTYzXSxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuRGlhbW9uZCxcclxuICAgICAgICAgICAgcHJpY2U6IDEwMDAsXHJcbiAgICAgICAgICAgIHZpZGVvQ291bnQ6IDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiNVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi54mb5aS0XCIsXHJcbiAgICAgICAgICAgIHh1ZWRpOiA1LFxyXG4gICAgICAgICAgICBocDogWzM2NiwgMzc0LCAzODIsIDM5NiwgNDIwLCA0NTAsIDQ4MF0sXHJcbiAgICAgICAgICAgIGF0azogWzMsIDUsIDcsIDExLCAxNCwgMTUsIDE4XSxcclxuICAgICAgICAgICAgc3BlZWQ6IFs1MjUsIDUzNCwgNTU2LCA1NjYsIDU3MywgNTg0LCA2MDBdLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5EaWFtb25kLFxyXG4gICAgICAgICAgICBwcmljZTogNTAwLFxyXG4gICAgICAgICAgICB2aWRlb0NvdW50OiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjZcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIumqt+mrheWktFwiLFxyXG4gICAgICAgICAgICB4dWVkaTogNCxcclxuICAgICAgICAgICAgaHA6IFszNjMsIDM3MiwgMzg0LCAzOTcsIDQyMCwgNDQ0LCA0NTNdLFxyXG4gICAgICAgICAgICBhdGs6IFsxLCAzLCA3LCA5LCAxMSwgMTQsIDE2XSxcclxuICAgICAgICAgICAgc3BlZWQ6IFs1MDAsIDUxMCwgNTIwLCA1MzAsIDU0MCwgNTUwLCA1NjBdLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5EaWFtb25kLFxyXG4gICAgICAgICAgICBwcmljZTogMzAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjdcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIua1t+WFteWktFwiLFxyXG4gICAgICAgICAgICB4dWVkaTogNCxcclxuICAgICAgICAgICAgaHA6IFszNjMsIDM3MiwgMzg2LCAzOTMsIDQyNCwgNDUyLCA0NjNdLFxyXG4gICAgICAgICAgICBhdGs6IFsyLCAzLCA2LCA4LCAxMSwgMTMsIDE0XSxcclxuICAgICAgICAgICAgc3BlZWQ6IFs1MTUsIDUzNCwgNTU1LCA1NzIsIDU4NCwgNjAzLCA2MTBdLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5Hb2xkLFxyXG4gICAgICAgICAgICBwcmljZTogMjAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI4XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlsI/lpbPlralcIixcclxuICAgICAgICAgICAgeHVlZGk6IDQsXHJcbiAgICAgICAgICAgIGhwOiBbMzYyLCAzNzcsIDM4NiwgMzkzLCA0MjksIDQ0NCwgNDU4XSxcclxuICAgICAgICAgICAgYXRrOiBbMSwgMiwgNCwgNiwgOCwgMTAsIDEyXSxcclxuICAgICAgICAgICAgc3BlZWQ6IFs1MjEsIDUzMCwgNTUwLCA1NzAsIDU4MCwgNjAwLCA2MDZdLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5Hb2xkLFxyXG4gICAgICAgICAgICBwcmljZTogMjAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI5XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlsI/nm5LlrZBcIixcclxuICAgICAgICAgICAgeHVlZGk6IDQsXHJcbiAgICAgICAgICAgIGhwOiBbMzY0LCAzNzYsIDM4NywgMzkyLCA0MjEsIDQ0NywgNDYzXSxcclxuICAgICAgICAgICAgYXRrOiBbMSwgMywgNiwgOSwgMTIsIDE1LCAxNl0sXHJcbiAgICAgICAgICAgIHNwZWVkOiBbNTI1LCA1MzUsIDU0NSwgNTU1LCA1NjUsIDU3NSwgNjAwXSxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuRGlhbW9uZCxcclxuICAgICAgICAgICAgcHJpY2U6IDI1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5bCP57qi5bi9XCIsXHJcbiAgICAgICAgICAgIHh1ZWRpOiAzLFxyXG4gICAgICAgICAgICBocDogWzM2MiwgMzczLCAzODUsIDM5NiwgNDIxLCA0NTYsIDQ4MF0sXHJcbiAgICAgICAgICAgIGF0azogWzIsIDUsIDgsIDEyLCAxNCwgMTUsIDE2XSxcclxuICAgICAgICAgICAgc3BlZWQ6IFs1MjMsIDU0NCwgNTU0LCA1NzMsIDU4NSwgNTA5LCA2MDZdLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5Hb2xkLFxyXG4gICAgICAgICAgICBwcmljZTogMTUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5ouz55qHXCIsXHJcbiAgICAgICAgICAgIHh1ZWRpOiA1LFxyXG4gICAgICAgICAgICBocDogWzM2OCwgMzc2LCAzODQsIDM5NiwgNDI1LCA0NTgsIDQ2OF0sXHJcbiAgICAgICAgICAgIGF0azogWzEsIDUsIDgsIDEwLCAxNSwgMTcsIDIwXSxcclxuICAgICAgICAgICAgc3BlZWQ6IFs1MjQsIDUzMywgNTQ0LCA1NTYsIDU3MSwgNTgyLCA2MDVdLFxyXG4gICAgICAgICAgICBwcmljZVR5cGU6IFByaWNlVHlwZS5aaHVhblBhblJld2FyZCxcclxuICAgICAgICAgICAgcHJpY2U6IDAsXHJcbiAgICAgICAgICAgIHZpZGVvQ291bnQ6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMTJcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIueBsOiDoeWtkFwiLFxyXG4gICAgICAgICAgICB4dWVkaTogNCxcclxuICAgICAgICAgICAgaHA6IFszNTMsIDM3MiwgMzg1LCA0MDMsIDQyMSwgNDQ0LCA0NTldLFxyXG4gICAgICAgICAgICBhdGs6IFsxLCAyLCAzLCA1LCA2LCA5LCAxMV0sXHJcbiAgICAgICAgICAgIHNwZWVkOiBbNTAyLCA1MTMsIDUzNCwgNTQzLCA1NTgsIDU2MywgNTg0XSxcclxuICAgICAgICAgICAgcHJpY2VUeXBlOiBQcmljZVR5cGUuR29sZCxcclxuICAgICAgICAgICAgcHJpY2U6IDIwMDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFbmVteU1lc3MgPSB7XHJcbiAgICAgICAgXCIwXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlj7LojrHlp4ZcIixcclxuICAgICAgICAgICAgaHA6IDk1LFxyXG4gICAgICAgICAgICBhdGs6IDM0LFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSAvIDAuNSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDMwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDMzMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlsI/nuqLkurpcIixcclxuICAgICAgICAgICAgaHA6IDEzMCxcclxuICAgICAgICAgICAgYXRrOiAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDgwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQ1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIyXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmi7Plh7vmiYtcIixcclxuICAgICAgICAgICAgaHA6IDQwMCxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IDEgLyAwLjUsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiA0MDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiM1wiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5py65p6q5omLXCIsXHJcbiAgICAgICAgICAgIGhwOiAyNTAsXHJcbiAgICAgICAgICAgIGF0azogMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBzcGVlZDogNDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjRcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIumbquS6ulwiLFxyXG4gICAgICAgICAgICBocDogNjAwLFxyXG4gICAgICAgICAgICBhdGs6IDQwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSAvIDAuNSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDMwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiNVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5Y+M5p6qXCIsXHJcbiAgICAgICAgICAgIGhwOiAxMDAwLFxyXG4gICAgICAgICAgICBhdGs6IDAsXHJcbiAgICAgICAgICAgIGF0a1NwZWVkOiAxLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTAwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQ1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI2XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLloKHlnpJcIixcclxuICAgICAgICAgICAgaHA6IDUwMCxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI3XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmtbfosbnnqoHlh7tcIixcclxuICAgICAgICAgICAgaHA6IDQwMCxcclxuICAgICAgICAgICAgYXRrOiAwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDEwMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0NTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiOFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6L6Q5bCE6ICFXCIsXHJcbiAgICAgICAgICAgIGhwOiA0MDAsXHJcbiAgICAgICAgICAgIGF0azogMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBzcGVlZDogNDIwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjlcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuWdpuWFi+eCrlwiLFxyXG4gICAgICAgICAgICBocDogODAwLFxyXG4gICAgICAgICAgICBhdGs6IDIwMCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IDEgLyAwLjUsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAxMDAwLFxyXG4gICAgICAgICAgICBzcGVlZDogNDQwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjEwXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmoJHkurpcIixcclxuICAgICAgICAgICAgaHA6IDUwMCxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgYXRrU3BlZWQ6IDEgLyAwLjUsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAzMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMTFcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIumHjueMqlwiLFxyXG4gICAgICAgICAgICBocDogNDAwLFxyXG4gICAgICAgICAgICBhdGs6IDUwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSAvIDAuNSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDQwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5qCR57K+XCIsXHJcbiAgICAgICAgICAgIGhwOiAxMDAwLFxyXG4gICAgICAgICAgICBhdGs6IDUwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSAvIDAuNSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDUwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDI1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxM1wiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6Jyl6Jy0XCIsXHJcbiAgICAgICAgICAgIGhwOiAxMDAwLFxyXG4gICAgICAgICAgICBhdGs6IDYwLFxyXG4gICAgICAgICAgICBhdGtTcGVlZDogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDUwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQ1MFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNraWxsTWVzcyA9IHtcclxuICAgICAgICBcIjFcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuiHquaEiFwiLFxyXG4gICAgICAgICAgICBjZDogMTAsXHJcbiAgICAgICAgICAgIG51bTogMzAsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLmgaLlpI3ooYDph49cIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIlJlc3RvcmUgSFBcIixcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjE1MCVcIiwgaW50cm9kdWNlX3poOiBcIuWbnuWkjemHj+aPkOWNhzUwJVwiLCBpbnRyb2R1Y2VfZW46IFwiSW5jcmVhc2UgdGhlIG51bWJlciBvZiByZXBsaWVzIGJ5IDUwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNTAlXCIsIGNkOiBcIjgwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5Zue5aSN6YeP5o+Q5Y2HNTAlLOWGt+WNtOaXtumXtOWHj+WwkTIwJVwiLCBpbnRyb2R1Y2VfZW46IFwiUmVjb3ZlcnkgaW5jcmVhc2VkIGJ5IDUwJSwgY29vbGluZyB0aW1lIHJlZHVjZWQgYnkgMjAlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjE1MCVcIiwgY2Q6IFwiNTAlXCIsIGludHJvZHVjZV96aDogXCLlm57lpI3ph4/mj5DljYc1MCUs5Ya35Y205pe26Ze05YeP5bCRNTAlXCIsIGludHJvZHVjZV9lbjogXCJSZWNvdmVyeSBpbmNyZWFzZWQgYnkgNTAlLCBjb29saW5nIHRpbWUgcmVkdWNlZCBieSA1MCVcIiB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6KGA6J2gXCIsXHJcbiAgICAgICAgICAgIGNkOiAxMCxcclxuICAgICAgICAgICAgbnVtOiA1MCxcclxuICAgICAgICAgICAgdGFyZ2V0OiBcImVuZW15XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLlj6zllKTooYDonaDmlLvlh7vmlYzkurpcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIlN1bW1vbiBibG9vZCBiYXRzIHRvIGF0dGFjayBlbmVtaWVzXCIsXHJcbiAgICAgICAgICAgIGxldmVsOiBbXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMjUlXCIsIHNjYWxlOiBcIjEuNVwiLCBpbnRyb2R1Y2Vfemg6IFwi5Lyk5a6z5o+Q5Y2HMjUlXCIsIGludHJvZHVjZV9lbjogXCJEYW1hZ2UgaW5jcmVhc2VkIGJ5IDI1JVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMjUlXCIsIGNkOiBcIjcwJVwiLCBzY2FsZTogXCIxLjVcIiwgaW50cm9kdWNlX3poOiBcIuS8pOWus+aPkOWNhzI1JSzlhrfljbTml7bpl7Tlh4/lsJEzMCVcIiwgaW50cm9kdWNlX2VuOiBcIkRhbWFnZSBpbmNyZWFzZWQgYnkgMjUlLCBjb29saW5nIHRpbWUgcmVkdWNlZCBieSAzMCVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTQ1JVwiLCBjZDogXCI1MCVcIiwgc2NhbGU6IFwiMS41XCIsIGludHJvZHVjZV96aDogXCLkvKTlrrPmj5DljYc0NSUs5Ya35Y205pe26Ze05YeP5bCRNTAlXCIsIGludHJvZHVjZV9lbjogXCJEYW1hZ2UgaW5jcmVhc2VkIGJ5IDQ1JSwgY29vbGluZyB0aW1lIHJlZHVjZWQgYnkgNTAlXCIgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjNcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIumTgeeUslwiLFxyXG4gICAgICAgICAgICBjZDogMTAsXHJcbiAgICAgICAgICAgIG51bTogMixcclxuICAgICAgICAgICAgaW50cm9kdWNlX3poOiBcIueUn+aIkOaKpOebvuaKteaMoeS8pOWus1wiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2VfZW46IFwiR2VuZXJhdGUgc2hpZWxkIHRvIHJlc2lzdCBkYW1hZ2VcIixcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjE1MCVcIiwgY2Q6IFwiODAlXCIsIHNjYWxlOiBcIjEuMlwiLCBpbnRyb2R1Y2Vfemg6IFwi5oyB57utM+enkizlhrfljbTml7bpl7Tlh4/lsJEyMCVcIiwgaW50cm9kdWNlX2VuOiBcIkxhc3RzIGZvciAzIHNlY29uZHMsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIyMDAlXCIsIGNkOiBcIjcwJVwiLCBzY2FsZTogXCIxLjRcIiwgaW50cm9kdWNlX3poOiBcIuaMgee7rTTnp5Is5Ya35Y205pe26Ze05YeP5bCRMzAlXCIsIGludHJvZHVjZV9lbjogXCJMYXN0cyBmb3IgNCBzZWNvbmRzLCBjb29saW5nIHRpbWUgcmVkdWNlZCBieSAzMCVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMjUwJVwiLCBjZDogXCI2MCVcIiwgc2NhbGU6IFwiMS42XCIsIGludHJvZHVjZV96aDogXCLmjIHnu60156eSLOWGt+WNtOaXtumXtOWHj+WwkTQwJVwiLCBpbnRyb2R1Y2VfZW46IFwiTGFzdHMgZm9yIDUgc2Vjb25kcywgY29vbGluZyB0aW1lIHJlZHVjZWQgYnkgNDAlXCIgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjRcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuaEpOaAklwiLFxyXG4gICAgICAgICAgICBjZDogMTAsXHJcbiAgICAgICAgICAgIG51bTogNDAsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLlop7liqDmlLvlh7vliptcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIkluY3JlYXNlIGF0dGFjayBwb3dlclwiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTIwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5pS75Ye75Yqb5o+Q5Y2HMjAlXCIsIGludHJvZHVjZV9lbjogXCJBdHRhY2sgcG93ZXIgaW5jcmVhc2VkIGJ5IDIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMzAlXCIsIGNkOiBcIjkwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5pS75Ye75Yqb5o+Q5Y2HMzAlLOWGt+WNtOaXtumXtOWHj+WwkTEwJVwiLCBpbnRyb2R1Y2VfZW46IFwiQXR0YWNrIHBvd2VyIGluY3JlYXNlZCBieSAzMCUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDEwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNDAlXCIsIGNkOiBcIjcwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5pS75Ye75Yqb5o+Q5Y2HNDAlLOWGt+WNtOaXtumXtOWHj+WwkTMwJVwiLCBpbnRyb2R1Y2VfZW46IFwiQXR0YWNrIHBvd2VyIGluY3JlYXNlZCBieSA0MCUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDMwJVwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI1XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlhqXngatcIixcclxuICAgICAgICAgICAgY2Q6IDEwLFxyXG4gICAgICAgICAgICBudW06IDEwMCxcclxuICAgICAgICAgICAgdGFyZ2V0OiBcImVuZW15XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLlj6zllKTngavnhLDmlLvlh7vmlYzkurpcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIlN1bW1vbiBmaXJlIHRvIGF0dGFjayBlbmVtaWVzXCIsXHJcbiAgICAgICAgICAgIGxldmVsOiBbXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMjAlXCIsIHNjYWxlOiBcIjEuNVwiLCBpbnRyb2R1Y2Vfemg6IFwi5Lyk5a6z5o+Q5Y2HMjAlXCIsIGludHJvZHVjZV9lbjogXCJBdHRhY2sgcG93ZXIgaW5jcmVhc2VkIGJ5IDIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNTAlXCIsIHNjYWxlOiBcIjEuNVwiLCBpbnRyb2R1Y2Vfemg6IFwi5Lyk5a6z5o+Q5Y2HNTAlXCIsIGludHJvZHVjZV9lbjogXCJBdHRhY2sgcG93ZXIgaW5jcmVhc2VkIGJ5IDUwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNTAlXCIsIGNkOiBcIjUwJVwiLCBzY2FsZTogXCIxLjVcIiwgaW50cm9kdWNlX3poOiBcIuS8pOWus+aPkOWNhzUwJSzlhrfljbTml7bpl7Tlh4/lsJE1MCVcIiwgaW50cm9kdWNlX2VuOiBcIkRhbWFnZSBpbmNyZWFzZWQgYnkgNTAlLCBjb29saW5nIHRpbWUgcmVkdWNlZCBieSA1MCVcIiB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiNlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5rC055u+XCIsXHJcbiAgICAgICAgICAgIGNkOiAxMCxcclxuICAgICAgICAgICAgbnVtOiAwLjUsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLlj6zllKTmsLTnkIPmiqTnm75cIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIlN1bW1vbiB3YXRlciBwb2xvIHNoaWVsZFwiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTIwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5oqk55u+5aKe5YqgMjAlXCIsIGludHJvZHVjZV9lbjogXCJTaGllbGQgaW5jcmVhc2VkIGJ5IDIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMzAlXCIsIGNkOiBcIjgwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5oqk55u+5aKe5YqgMzAlLOWGt+WNtOaXtumXtOWHj+WwkTIwJVwiLCBpbnRyb2R1Y2VfZW46IFwiU2hpZWxkIGluY3JlYXNlZCBieSAzMCUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMzAlXCIsIGNkOiBcIjYwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5oqk55u+5aKe5YqgMzAlLOWGt+WNtOaXtumXtOWHj+WwkTQwJVwiLCBpbnRyb2R1Y2VfZW46IFwiU2hpZWxkIGluY3JlYXNlZCBieSAzMCUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDQwJVwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI3XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLpo47liINcIixcclxuICAgICAgICAgICAgY2Q6IDEwLFxyXG4gICAgICAgICAgICBudW06IDQwLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IFwiZW5lbXlcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX3poOiBcIumHiuaUvumjjuWIg+aUu+WHu+aVjOS6ulwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2VfZW46IFwiUmVsZWFzZSB0aGUgd2luZCB0byBhdHRhY2sgdGhlIGVuZW15XCIsXHJcbiAgICAgICAgICAgIGxldmVsOiBbXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMjAlXCIsIGNkOiBcIjgwJVwiLCBzY2FsZTogXCIxLjVcIiwgaW50cm9kdWNlX3poOiBcIuS8pOWus+aPkOWNhzIwJSzlhrfljbTml7bpl7Tlh4/lsJEyMCVcIiwgaW50cm9kdWNlX2VuOiBcIkRhbWFnZSBpbmNyZWFzZWQgYnkgMjAlLCBjb29saW5nIHRpbWUgcmVkdWNlZCBieSAyMCVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTUwJVwiLCBjZDogXCI3MCVcIiwgc2NhbGU6IFwiMS41XCIsIGludHJvZHVjZV96aDogXCLkvKTlrrPmj5DljYc1MCUs5Ya35Y205pe26Ze05YeP5bCRMzAlXCIsIGludHJvZHVjZV9lbjogXCJEYW1hZ2UgaW5jcmVhc2VkIGJ5IDUwJSwgY29vbGluZyB0aW1lIHJlZHVjZWQgYnkgMzAlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjE1MCVcIiwgY2Q6IFwiNTAlXCIsIHNjYWxlOiBcIjEuNVwiLCBpbnRyb2R1Y2Vfemg6IFwi5Lyk5a6z5o+Q5Y2HNTAlLOWGt+WNtOaXtumXtOWHj+WwkTUwJVwiLCBpbnRyb2R1Y2VfZW46IFwiRGFtYWdlIGluY3JlYXNlZCBieSA1MCUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDUwJVwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI4XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLnm7Lnm5JcIixcclxuICAgICAgICAgICAgY2Q6IDIwLFxyXG4gICAgICAgICAgICBudW06IDEsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLpmo/mnLrmjonokL3pgZPlhbdcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIlJhbmRvbSBkcm9wcGluZyBpdGVtc1wiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMjAwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5o6J6JC96YGT5YW3KzFcIiwgaW50cm9kdWNlX2VuOiBcIkRyb3AgaXRlbSsxXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjMwMCVcIiwgaW50cm9kdWNlX3poOiBcIuaOieiQvemBk+WFtysyXCIsIGludHJvZHVjZV9lbjogXCJEcm9wIGl0ZW0rMlwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIzMDAlXCIsIGNkOiBcIjgwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5o6J6JC96YGT5YW3KzIs5Ya35Y205pe26Ze05YeP5bCRMjAlXCIsIGludHJvZHVjZV9lbjogXCJEcm9wIGl0ZW0rMiwgY29vbGluZyB0aW1lIHJlZHVjZWQgYnkgMjAlXCIgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjlcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuavkuWfn1wiLFxyXG4gICAgICAgICAgICBjZDogMTUsXHJcbiAgICAgICAgICAgIG51bTogNCxcclxuICAgICAgICAgICAgdGFyZ2V0OiBcImVuZW15XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLlj6zllKTmr5LpmLVcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIlJhbmRvbSBkcm9wcGluZyBpdGVtc1wiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTI1JVwiLCBzY2FsZTogXCIxLjJcIiwgaW50cm9kdWNlX3poOiBcIuaMgee7rTXnp5Is6IyD5Zu05omp5aSnMjAlXCIsIGludHJvZHVjZV9lbjogXCJMYXN0cyBmb3IgNSBzZWNvbmRzLCB0aGUgcmFuZ2UgZXhwYW5kcyBieSAyMCVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTUwJVwiLCBzY2FsZTogXCIxLjVcIiwgaW50cm9kdWNlX3poOiBcIuaMgee7rTbnp5Is6IyD5Zu05omp5aSnNTAlXCIsIGludHJvZHVjZV9lbjogXCJMYXN0cyBmb3IgNiBzZWNvbmRzLCB0aGUgcmFuZ2UgZXhwYW5kcyBieSA1MCVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTUwJVwiLCBzY2FsZTogXCIxLjVcIiwgY2Q6IFwiNjAlXCIsIGludHJvZHVjZV96aDogXCLmjIHnu60256eSLOiMg+WbtOaJqeWkpzUwLOWGt+WNtOaXtumXtOWHj+WwkTQwJVwiLCBpbnRyb2R1Y2VfZW46IFwiTGFzdHMgZm9yIDYgc2Vjb25kcywgdGhlIHJhbmdlIGlzIGV4cGFuZGVkIGJ5IDUwJVwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6Iez6auY5LmL5ouzXCIsXHJcbiAgICAgICAgICAgIGNkOiAxMCxcclxuICAgICAgICAgICAgbnVtOiAxNDAsXHJcbiAgICAgICAgICAgIHRhcmdldDogXCJlbmVteVwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2Vfemg6IFwi5Y+s5ZSk5ouz5aS05pS75Ye7XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV9lbjogXCJTdW1tb24gZmlzdCBhdHRhY2tcIixcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjEyMCVcIiwgc2NhbGU6IFwiMS41XCIsIGludHJvZHVjZV96aDogXCLkvKTlrrPmj5DljYcyNSVcIiwgaW50cm9kdWNlX2VuOiBcIkRhbWFnZSBpbmNyZWFzZWQgYnkgMjUlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjEzMCVcIiwgY2Q6IFwiNjAlXCIsIHNjYWxlOiBcIjEuNVwiLCBpbnRyb2R1Y2Vfemg6IFwi5Lyk5a6z5o+Q5Y2HMjUlLOWGt+WNtOaXtumXtOWHj+WwkTQwJVwiLCBpbnRyb2R1Y2VfZW46IFwiRGFtYWdlIGluY3JlYXNlZCBieSAyNSUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDQwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNDAlXCIsIGNkOiBcIjQwJVwiLCBzY2FsZTogXCIxLjVcIiwgaW50cm9kdWNlX3poOiBcIuS8pOWus+aPkOWNhzI1JSzlhrfljbTml7bpl7Tlh4/lsJE2MCVcIiwgaW50cm9kdWNlX2VuOiBcIkRhbWFnZSBpbmNyZWFzZWQgYnkgMjUlLCBjb29saW5nIHRpbWUgcmVkdWNlZCBieSA2MCVcIiB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMTFcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIueerOmXqlwiLFxyXG4gICAgICAgICAgICBjZDogMixcclxuICAgICAgICAgICAgbnVtOiAzMDAsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLpl6rnjrDkuIDmrrXot53nprtcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIkZsYXNoIGEgZGlzdGFuY2VcIixcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjEyMCVcIiwgaW50cm9kdWNlX3poOiBcIumXqueOsOiMg+WbtCsyMCVcIiwgaW50cm9kdWNlX2VuOiBcIkZsYXNoIHJhbmdlKzIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNTAlXCIsIGludHJvZHVjZV96aDogXCLpl6rnjrDojIPlm7QrNTAlXCIsIGludHJvZHVjZV9lbjogXCJGbGFzaCByYW5nZSs1MCVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTUwJVwiLCBjZDogXCI1MCVcIiwgaW50cm9kdWNlX3poOiBcIumXqueOsOiMg+WbtCs1MCUs5Ya35Y205pe26Ze05YeP5bCRNTAlXCIsIGludHJvZHVjZV9lbjogXCJGbGFzaCByYW5nZSs1MCUsIGNvb2xpbmcgdGltZSByZWR1Y2VkIGJ5IDUwJVwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5LiW55WM57yp5bCP5ZmoXCIsXHJcbiAgICAgICAgICAgIGNkOiAwLFxyXG4gICAgICAgICAgICBudW06IDEsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLooYDph4/lop7liqAs5Lq654mp5Y+Y5aSnXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV9lbjogXCJUaGUgbGlmZSBpbmNyZWFzZXMgYW5kIHRoZSBjaGFyYWN0ZXIgYmVjb21lcyBsYXJnZXJcIixcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjEyMCVcIiwgc2NhbGU6IFwiMVwiLCBpbnRyb2R1Y2Vfemg6IFwi6KGA6YeP5aKe5YqgMjAlLOS6uueJqeWPmOWkp1wiLCBpbnRyb2R1Y2VfZW46IFwiSFAgaW5jcmVhc2VkIGJ5IDIwJSwgYW5kIHRoZSBjaGFyYWN0ZXIgYmVjYW1lIGxhcmdlclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNDAlXCIsIHNjYWxlOiBcIjEuMVwiLCBpbnRyb2R1Y2Vfemg6IFwi6KGA6YeP5aKe5YqgNDAlLOS6uueJqeWPmOWkp1wiLCBpbnRyb2R1Y2VfZW46IFwiSFAgaW5jcmVhc2VkIGJ5IDQwJSwgYW5kIHRoZSBjaGFyYWN0ZXIgYmVjYW1lIGxhcmdlclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNTAlXCIsIHNjYWxlOiBcIjEuMlwiLCBpbnRyb2R1Y2Vfemg6IFwi6KGA6YeP5aKe5YqgNTAlLOS6uueJqeWPmOWkp1wiLCBpbnRyb2R1Y2VfZW46IFwiSFAgaW5jcmVhc2VkIGJ5IDUwJSwgYW5kIHRoZSBjaGFyYWN0ZXIgYmVjYW1lIGxhcmdlclwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxM1wiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5LiW55WM5omp5aSn5LuqXCIsXHJcbiAgICAgICAgICAgIGNkOiAwLFxyXG4gICAgICAgICAgICBudW06IDEsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV96aDogXCLpgJ/luqblop7liqAs5Lq654mp5Y+Y5bCPXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV9lbjogXCJUaGUgc3BlZWQgaW5jcmVhc2VzIGFuZCB0aGUgY2hhcmFjdGVycyBiZWNvbWUgc21hbGxlclwiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTIwJVwiLCBzY2FsZTogXCIwLjZcIiwgaW50cm9kdWNlX3poOiBcIumAn+W6puWinuWKoDIwJSzkurrnianlj5jlsI9cIiwgaW50cm9kdWNlX2VuOiBcIlNwZWVkIGluY3JlYXNlcyBieSAyMCUsIGFuZCB0aGUgY2hhcmFjdGVycyBiZWNvbWUgc21hbGxlclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxMzUlXCIsIHNjYWxlOiBcIjAuNTVcIiwgaW50cm9kdWNlX3poOiBcIumAn+W6puWinuWKoDM1JSzkurrnianlj5jlsI9cIiwgaW50cm9kdWNlX2VuOiBcIlNwZWVkIGluY3JlYXNlcyBieSAzNSUsIGFuZCB0aGUgY2hhcmFjdGVycyBiZWNvbWUgc21hbGxlclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNTAlXCIsIHNjYWxlOiBcIjAuNVwiLCBpbnRyb2R1Y2Vfemg6IFwi6YCf5bqm5aKe5YqgNTAlLOS6uueJqeWPmOWwj1wiLCBpbnRyb2R1Y2VfZW46IFwiU3BlZWQgaW5jcmVhc2VzIGJ5IDUwJSwgYW5kIHRoZSBjaGFyYWN0ZXJzIGJlY29tZSBzbWFsbGVyXCIgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjE0XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmmrTotbDoja/liYJcIixcclxuICAgICAgICAgICAgY2Q6IDAsXHJcbiAgICAgICAgICAgIG51bTogMSxcclxuICAgICAgICAgICAgaW50cm9kdWNlX3poOiBcIuWwhOmAn+aPkOWNhyzmjaLlvLnliqDlv6tcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlX2VuOiBcIkluY3JlYXNlIHRoZSBmaXJpbmcgc3BlZWQgYW5kIHNwZWVkIHVwIHRoZSBjYXJ0cmlkZ2UgY2hhbmdlXCIsXHJcbiAgICAgICAgICAgIGxldmVsOiBbXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCI4MCVcIiwgaW50cm9kdWNlX3poOiBcIuWwhOmAn+WinuWKoDIwJVwiLCBpbnRyb2R1Y2VfZW46IFwiRmlyZSBzcGVlZCBpbmNyZWFzZWQgYnkgMjAlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjcwJVwiLCByZWxvYWQ6IFwiNjAlXCIsIGludHJvZHVjZV96aDogXCLlsITpgJ/lop7liqAzMCUs5o2i5by55o+Q5Y2HNDAlXCIsIGludHJvZHVjZV9lbjogXCJUaGUgZmlyaW5nIHNwZWVkIGlzIGluY3JlYXNlZCBieSAzMCUsIGNhcnRyaWRnZSBjaGFuZ2UgaXMgaW5jcmVhc2VkIGJ5IDQwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCI2MCVcIiwgcmVsb2FkOiBcIjQwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5bCE6YCf5aKe5YqgNDAlLOaNouW8ueaPkOWNhzYwJVwiLCBpbnRyb2R1Y2VfZW46IFwiVGhlIGZpcmluZyBzcGVlZCBpcyBpbmNyZWFzZWQgYnkgNDAlLCBjYXJ0cmlkZ2UgY2hhbmdlIGlzIGluY3JlYXNlZCBieSA2MCVcIiB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMTVcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuWtkOW8ueiDjOWMhVwiLFxyXG4gICAgICAgICAgICBjZDogMCxcclxuICAgICAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2Vfemg6IFwi5aKe5Yqg5a2Q5by5XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV9lbjogXCJBZGQgYnVsbGV0c1wiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTIwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi5a2Q5by55pWw6YeP5aKe5YqgMjAlXCIsIGludHJvZHVjZV9lbjogXCJOdW1iZXIgb2YgYnVsbGV0cyBpbmNyZWFzZWQgYnkgMjAlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjE0MCVcIiwgaW50cm9kdWNlX3poOiBcIuWtkOW8ueaVsOmHj+WinuWKoDQwJVwiLCBpbnRyb2R1Y2VfZW46IFwiTnVtYmVyIG9mIGJ1bGxldHMgaW5jcmVhc2VkIGJ5IDQwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNjAlXCIsIGludHJvZHVjZV96aDogXCLlrZDlvLnmlbDph4/lop7liqA2MCVcIiwgaW50cm9kdWNlX2VuOiBcIk51bWJlciBvZiBidWxsZXRzIGluY3JlYXNlZCBieSA2MCVcIiB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMTZcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIuWIgOWuolwiLFxyXG4gICAgICAgICAgICBjZDogMCxcclxuICAgICAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2Vfemg6IFwi6L+R5oiY5q2m5Zmo5Lyk5a6z5o+Q5Y2HXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZV9lbjogXCJNZWxlZSB3ZWFwb24gZGFtYWdlIGluY3JlYXNlZFwiLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAgeyBudW06IFwiMTIwJVwiLCBpbnRyb2R1Y2Vfemg6IFwi6L+R5oiY5Lyk5a6z5aKe5YqgMjAlXCIsIGludHJvZHVjZV9lbjogXCJNZWxlZSBkYW1hZ2UgaW5jcmVhc2VkIGJ5IDIwJVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG51bTogXCIxNDAlXCIsIGludHJvZHVjZV96aDogXCLov5HmiJjkvKTlrrPlop7liqA0MCVcIiwgaW50cm9kdWNlX2VuOiBcIk1lbGVlIGRhbWFnZSBpbmNyZWFzZWQgYnkgNDAlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbnVtOiBcIjE4MCVcIiwgaW50cm9kdWNlX3poOiBcIui/keaImOS8pOWus+WinuWKoDgwJVwiLCBpbnRyb2R1Y2VfZW46IFwiTWVsZWUgZGFtYWdlIGluY3JlYXNlZCBieSA4MCVcIiB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQYXRoTWVzcyA9IHtcclxuICAgICAgICBwYXRoOiB7XHJcbiAgICAgICAgICAgIG1hcFdpZHRoOiA2MDAwLFxyXG4gICAgICAgICAgICBtYXBIZWlnaHQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGdyaWRXaWR0aDogMjAwLFxyXG4gICAgICAgICAgICBncmlkSGVpZ2h0OiAyMDAsXHJcblxyXG4gICAgICAgICAgICBwYXRoQXJyOiBbXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFpvbWJpZU1lc3MgPSB7XHJcbiAgICAgICAgXCIwXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLlsI/lg7VcIixcclxuICAgICAgICAgICAgaHA6IDkwLFxyXG4gICAgICAgICAgICBhdGs6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAyMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0MjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6ZOB6YCa5YO1XCIsXHJcbiAgICAgICAgICAgIGhwOiAyMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDIwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIyXCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLot5HmraXlg7VcIixcclxuICAgICAgICAgICAgaHA6IDEyMCxcclxuICAgICAgICAgICAgYXRrOiAxLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMjIwLFxyXG4gICAgICAgICAgICBzcGVlZDogNDUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjNcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIui3s+i3g+WDtVwiLFxyXG4gICAgICAgICAgICBocDogMTUwLFxyXG4gICAgICAgICAgICBhdGs6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAyMjAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0NDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiNFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi6I+c5YiA5YO1XCIsXHJcbiAgICAgICAgICAgIGhwOiAzMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDIyMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI1XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLngrjlvLnlg7VcIixcclxuICAgICAgICAgICAgaHA6IDE1MCxcclxuICAgICAgICAgICAgYXRrOiAxLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTAwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI2XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLmr5Loja/lg7VcIixcclxuICAgICAgICAgICAgaHA6IDI1MCxcclxuICAgICAgICAgICAgYXRrOiAxLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMTAwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI3XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCLph5HluIHlg7VcIixcclxuICAgICAgICAgICAgaHA6IDI1MCxcclxuICAgICAgICAgICAgYXRrOiAxLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMjAwLFxyXG4gICAgICAgICAgICBzcGVlZDogNDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjhcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImJvc3MxXCIsXHJcbiAgICAgICAgICAgIGhwOiAxNTAwLFxyXG4gICAgICAgICAgICBhdGs6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAzMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiOVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczJcIixcclxuICAgICAgICAgICAgaHA6IDIwMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDM1MCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczNcIixcclxuICAgICAgICAgICAgaHA6IDI1MDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDIwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczRcIixcclxuICAgICAgICAgICAgaHA6IDMwMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDI1MCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxMlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczVcIixcclxuICAgICAgICAgICAgaHA6IDM1MDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDI1MCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxM1wiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczZcIixcclxuICAgICAgICAgICAgaHA6IDQwMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDI1MCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxNFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczdcIixcclxuICAgICAgICAgICAgaHA6IDQ1MDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDQ1MCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxNVwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczhcIixcclxuICAgICAgICAgICAgaHA6IDUwMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDQwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxNlwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczlcIixcclxuICAgICAgICAgICAgaHA6IDU1MDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDMwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxN1wiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczEwXCIsXHJcbiAgICAgICAgICAgIGhwOiA2MDAwLFxyXG4gICAgICAgICAgICBhdGs6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAyMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMThcIjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImJvc3MxMVwiLFxyXG4gICAgICAgICAgICBocDogNjYwMCxcclxuICAgICAgICAgICAgYXRrOiAxLFxyXG4gICAgICAgICAgICBhdGtSYW5nZTogMzAwLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjE5XCI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJib3NzMTJcIixcclxuICAgICAgICAgICAgaHA6IDcyMDAsXHJcbiAgICAgICAgICAgIGF0azogMSxcclxuICAgICAgICAgICAgYXRrUmFuZ2U6IDQ1MCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIyMFwiOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYm9zczEzXCIsXHJcbiAgICAgICAgICAgIGhwOiA4MDAwLFxyXG4gICAgICAgICAgICBhdGs6IDEsXHJcbiAgICAgICAgICAgIGF0a1JhbmdlOiAzMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==