"use strict";
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