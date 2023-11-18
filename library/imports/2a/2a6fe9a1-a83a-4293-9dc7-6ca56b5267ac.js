"use strict";
cc._RF.push(module, '2a6femhqDpCk53HbKVrUmes', 'GameMgr');
// scripts/Framework/GameMgr.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameCtr_1 = require("./GameCtr");
var CocosZ_1 = require("./CocosZ");
var Constant_1 = require("./Constant");
var Msg_1 = require("./Msg");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var YZ_Constant_1 = require("../../common-plugin/Scripts/YZ_Constant");
var YZ_LocalStorage_1 = require("../../common-plugin/Scripts/YZ_LocalStorage");
// @ts-ignore
var i18n = require('LanguageData');
/**
 * 游戏管理
 */
var GameMgr = /** @class */ (function () {
    function GameMgr() {
        this._state = Constant_1.GameState.None;
        this._gameCtr = new GameCtr_1.default();
        this.gameStartTime = 0;
        this.canTry = true;
        this.canGame = true;
    }
    Object.defineProperty(GameMgr, "inst", {
        get: function () {
            if (!GameMgr._inst) {
                GameMgr._inst = new GameMgr();
            }
            return GameMgr._inst;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameMgr.prototype, "State", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(GameMgr.prototype, "gameCtr", {
        get: function () {
            return this._gameCtr;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 开始游戏
     * @param 关卡ID
     */
    GameMgr.prototype.gameStart = function (levelId) {
        return __awaiter(this, void 0, void 0, function () {
            var rangeLevel;
            return __generator(this, function (_a) {
                YZ_LocalStorage_1.default.setItem(YZ_Constant_1.default.ST_RED_BAG_PROGRESS, '0');
                CocosZ_1.cocosz.curLevel = levelId;
                // 重置
                if (this.canTry) {
                    this.canTry = false;
                    this.gameCtr.curUseSkinId = -1;
                    // 能否弹试用
                    if (CocosZ_1.cocosz.isShowAd && CocosZ_1.cocosz.isADON && (CocosZ_1.cocosz.isDeBug || Utils_1.utils.isShowTrySkin(levelId))) {
                        rangeLevel = CocosZ_1.cocosz.dataMgr.getGunInfo(CocosZ_1.cocosz.dataMgr.CurRange).Level;
                        if (Math.random() < 0.5 && (rangeLevel < 3)) {
                            // 武器升级弹窗
                            CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UIWeaponLevelPanel);
                        }
                        else {
                            // 皮肤试用弹窗
                            CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UITrySkinPanel);
                        }
                    }
                    // 进入游戏
                    else if (this.canGame) {
                        this.canGame = false;
                        this._loadGameScene();
                    }
                }
                // 能否进入游戏
                else if (this.canGame) {
                    this.canGame = false;
                    this._loadGameScene();
                }
                return [2 /*return*/];
            });
        });
    };
    GameMgr.prototype._loadGameScene = function () {
        var _this = this;
        // 使用皮肤
        if (this.gameCtr.curUseSkinId < 0) {
            this.gameCtr.curUseSkinId = CocosZ_1.cocosz.dataMgr.CurSkinId;
        }
        //上报游戏开始
        Utils_1.utils.StartGame(CocosZ_1.cocosz.getLevelId().toString());
        //进入游戏场景
        CocosZ_1.cocosz.sceneMgr.loadScene("Game", function () {
            _this.gameStartTime = new Date().getTime();
            _this.canTry = true;
            _this.canGame = true;
            _this._gamePrepare();
            //显示过度页面
            CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIGameLoadingPage);
        });
    };
    /** 游戏预加载 */
    GameMgr.prototype._gamePrepare = function () {
        try {
            this.State = Constant_1.GameState.Prepare;
            //调用游戏初始化
            this.gameCtr.init();
        }
        catch (error) {
            cc.error("erro >>", error);
            // 资源没有准备好, 无法进入游戏
            CocosZ_1.cocosz.sceneMgr.loadScene("Home", function () {
                CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIHomePage);
                Msg_1.default.Show(i18n.t("msg.net_error")); //当前网络状态不佳，请重启游戏
            });
        }
    };
    /** 游戏胜利 */
    GameMgr.prototype.gameSuccess = function () {
        cc.log('游戏胜利!');
        this.State = Constant_1.GameState.Success;
        CocosZ_1.cocosz.audioMgr.playEffectWinner();
        // 上报游戏时间
        var gameTime = Math.round((new Date().getTime() - this.gameStartTime) / 1000 / 60);
        Utils_1.utils.SendEvent("游戏时间:" + gameTime + "分钟");
        //保存关卡解锁数据
        var rewardCallFunc = function (res) {
            cc.log("获取激励组件奖励+" + res.rewardValue);
            if (res) {
                CocosZ_1.cocosz.dataMgr.CoinCount += res.rewardValue;
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_COIN_CHANGE });
            }
        };
        var closeCallFunc = function () {
            cc.log("激励组件关闭！！！！！！");
            CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIOverPage);
        };
        //显示结算前广告
        Utils_1.utils.adManager.showBeforGameOverAd(CocosZ_1.cocosz.getLevelId(), YZ_Constant_1.LevelStatus.GameWin, 100, closeCallFunc, rewardCallFunc);
    };
    /** 游戏失败 */
    GameMgr.prototype.gameFailed = function () {
        cc.log('游戏失败!');
        this.State = Constant_1.GameState.Failed;
        CocosZ_1.cocosz.audioMgr.playEffectFailed();
        // 上报游戏时间
        var gameTime = Math.round((new Date().getTime() - this.gameStartTime) / 1000 / 60);
        Utils_1.utils.SendEvent("游戏时间:" + gameTime + "分钟");
        var rewardCallFunc = function (res) {
            cc.log("获取激励组件奖励+" + res.rewardValue);
            if (res) {
                //保存奖励值到本地
                CocosZ_1.cocosz.dataMgr.CoinCount += res.rewardValue;
                cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_COIN_CHANGE });
            }
        };
        var closeCallFunc = function () {
            cc.log("激励组件关闭！！！！！！");
            CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIOverPage);
        };
        Utils_1.utils.adManager.showBeforGameOverAd(CocosZ_1.cocosz.getLevelId(), YZ_Constant_1.LevelStatus.GameFail, 50, closeCallFunc, rewardCallFunc);
    };
    return GameMgr;
}());
exports.default = GameMgr;

cc._RF.pop();