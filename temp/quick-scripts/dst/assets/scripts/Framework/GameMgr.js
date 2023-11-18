
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/GameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxHYW1lTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLG1DQUFrQztBQUNsQyx1Q0FBc0U7QUFDdEUsNkJBQXdCO0FBQ3hCLDJEQUEwRDtBQUMxRCx1RUFBOEY7QUFDOUYsK0VBQTBFO0FBQzFFLGFBQWE7QUFDYixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFckM7O0dBRUc7QUFDSDtJQUFBO1FBVWMsV0FBTSxHQUFjLG9CQUFTLENBQUMsSUFBSSxDQUFDO1FBUXJDLGFBQVEsR0FBWSxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQU1uQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUN6QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFlBQU8sR0FBWSxJQUFJLENBQUM7SUF5SHBDLENBQUM7SUFoSkcsc0JBQWtCLGVBQUk7YUFBdEI7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDaEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO2FBQ2pDO1lBQ0QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsMEJBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUNELFVBQWlCLEtBQWdCO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBO0lBS3lDLENBQUM7SUFDM0Msc0JBQVcsNEJBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFNRDs7O09BR0c7SUFDVSwyQkFBUyxHQUF0QixVQUF1QixPQUFlOzs7O2dCQUNs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Q0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdkIsZUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUE7UUFFRCxhQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLGVBQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSx5QkFBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3RILENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FuSkEsQUFtSkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lQ3RyIGZyb20gXCIuL0dhbWVDdHJcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4vQ29jb3NaXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBQYWdlTmFtZSwgR2FtZVN0YXRlLCBQYW5lbE5hbWUgfSBmcm9tIFwiLi9Db25zdGFudFwiO1xyXG5pbXBvcnQgTXNnIGZyb20gXCIuL01zZ1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvVXRpbHNcIjtcclxuaW1wb3J0IFlaX0NvbnN0YW50LCB7IExldmVsU3RhdHVzLCBZWl9SZXdhcmQgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9ZWl9Mb2NhbFN0b3JhZ2VcIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG4vKipcclxuICog5ri45oiP566h55CGXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWdyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdDogR2FtZU1ncjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3QoKTogR2FtZU1nciB7XHJcbiAgICAgICAgaWYgKCFHYW1lTWdyLl9pbnN0KSB7XHJcbiAgICAgICAgICAgIEdhbWVNZ3IuX2luc3QgPSBuZXcgR2FtZU1ncigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZU1nci5faW5zdDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3N0YXRlOiBHYW1lU3RhdGUgPSBHYW1lU3RhdGUuTm9uZTtcclxuICAgIHB1YmxpYyBnZXQgU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBTdGF0ZSh2YWx1ZTogR2FtZVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nYW1lQ3RyOiBHYW1lQ3RyID0gbmV3IEdhbWVDdHIoKTs7XHJcbiAgICBwdWJsaWMgZ2V0IGdhbWVDdHIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVDdHI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnYW1lU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjYW5Ucnk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBjYW5HYW1lOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5ri45oiPXHJcbiAgICAgKiBAcGFyYW0g5YWz5Y2hSURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdhbWVTdGFydChsZXZlbElkOiBudW1iZXIpIHtcclxuICAgICAgICBZWl9Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShZWl9Db25zdGFudC5TVF9SRURfQkFHX1BST0dSRVNTLCAnMCcpO1xyXG4gICAgICAgIGNvY29zei5jdXJMZXZlbCA9IGxldmVsSWQ7XHJcbiAgICAgICAgLy8g6YeN572uXHJcbiAgICAgICAgaWYgKHRoaXMuY2FuVHJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuVHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUN0ci5jdXJVc2VTa2luSWQgPSAtMTtcclxuICAgICAgICAgICAgLy8g6IO95ZCm5by56K+V55SoXHJcbiAgICAgICAgICAgIGlmIChjb2Nvc3ouaXNTaG93QWQgJiYgY29jb3N6LmlzQURPTiAmJiAoY29jb3N6LmlzRGVCdWcgfHwgdXRpbHMuaXNTaG93VHJ5U2tpbihsZXZlbElkKSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZUxldmVsID0gY29jb3N6LmRhdGFNZ3IuZ2V0R3VuSW5mbyhjb2Nvc3ouZGF0YU1nci5DdXJSYW5nZSkuTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSAmJiAocmFuZ2VMZXZlbCA8IDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2m5Zmo5Y2H57qn5by556qXXHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVUlXZWFwb25MZXZlbFBhbmVsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55qu6IKk6K+V55So5by556qXXHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVUlUcnlTa2luUGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOi/m+WFpea4uOaIj1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNhbkdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZEdhbWVTY2VuZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiDveWQpui/m+WFpea4uOaIj1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FuR2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbkdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkR2FtZVNjZW5lKCkge1xyXG4gICAgICAgIC8vIOS9v+eUqOearuiCpFxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVDdHIuY3VyVXNlU2tpbklkIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVDdHIuY3VyVXNlU2tpbklkID0gY29jb3N6LmRhdGFNZ3IuQ3VyU2tpbklkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S4iuaKpea4uOaIj+W8gOWni1xyXG4gICAgICAgIHV0aWxzLlN0YXJ0R2FtZShjb2Nvc3ouZ2V0TGV2ZWxJZCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIC8v6L+b5YWl5ri45oiP5Zy65pmvXHJcbiAgICAgICAgY29jb3N6LnNjZW5lTWdyLmxvYWRTY2VuZShcIkdhbWVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYW5UcnkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lUHJlcGFyZSgpO1xyXG4gICAgICAgICAgICAvL+aYvuekuui/h+W6pumhtemdolxyXG4gICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhZ2UoUGFnZU5hbWUuVUlHYW1lTG9hZGluZ1BhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmuLjmiI/pooTliqDovb0gKi9cclxuICAgIHByaXZhdGUgX2dhbWVQcmVwYXJlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhdGUgPSBHYW1lU3RhdGUuUHJlcGFyZTtcclxuICAgICAgICAgICAgLy/osIPnlKjmuLjmiI/liJ3lp4vljJZcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ3RyLmluaXQoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcImVycm8gPj5cIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICAvLyDotYTmupDmsqHmnInlh4blpIflpb0sIOaXoOazlei/m+WFpea4uOaIj1xyXG4gICAgICAgICAgICBjb2Nvc3ouc2NlbmVNZ3IubG9hZFNjZW5lKFwiSG9tZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhZ2UoUGFnZU5hbWUuVUlIb21lUGFnZSk7XHJcbiAgICAgICAgICAgICAgICBNc2cuU2hvdyhpMThuLnQoXCJtc2cubmV0X2Vycm9yXCIpKTsvL+W9k+WJjee9kee7nOeKtuaAgeS4jeS9s++8jOivt+mHjeWQr+a4uOaIj1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOa4uOaIj+iDnOWIqSAqL1xyXG4gICAgcHVibGljIGdhbWVTdWNjZXNzKCkge1xyXG4gICAgICAgIGNjLmxvZygn5ri45oiP6IOc5YipIScpO1xyXG4gICAgICAgIHRoaXMuU3RhdGUgPSBHYW1lU3RhdGUuU3VjY2VzcztcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdFdpbm5lcigpO1xyXG4gICAgICAgIC8vIOS4iuaKpea4uOaIj+aXtumXtFxyXG4gICAgICAgIGxldCBnYW1lVGltZSA9IE1hdGgucm91bmQoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5nYW1lU3RhcnRUaW1lKSAvIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5ri45oiP5pe26Ze0OlwiICsgZ2FtZVRpbWUgKyBcIuWIhumSn1wiKTtcclxuICAgICAgICAvL+S/neWtmOWFs+WNoeino+mUgeaVsOaNrlxyXG4gICAgICAgIGxldCByZXdhcmRDYWxsRnVuYyA9IChyZXM6IFlaX1Jld2FyZCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2coXCLojrflj5bmv4DlirHnu4Tku7blpZblirErXCIgKyByZXMucmV3YXJkVmFsdWUpXHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkNvaW5Db3VudCArPSByZXMucmV3YXJkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB7IHR5cGU6IENvbnN0YW50LkVfQ09JTl9DSEFOR0UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgY2xvc2VDYWxsRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY2MubG9nKFwi5r+A5Yqx57uE5Lu25YWz6Zet77yB77yB77yB77yB77yB77yBXCIpO1xyXG4gICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhZ2UoUGFnZU5hbWUuVUlPdmVyUGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+aYvuekuue7k+eul+WJjeW5v+WRilxyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93QmVmb3JHYW1lT3ZlckFkKGNvY29zei5nZXRMZXZlbElkKCksIExldmVsU3RhdHVzLkdhbWVXaW4sIDEwMCwgY2xvc2VDYWxsRnVuYywgcmV3YXJkQ2FsbEZ1bmMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiog5ri45oiP5aSx6LSlICovXHJcbiAgICBwdWJsaWMgZ2FtZUZhaWxlZCgpIHtcclxuICAgICAgICBjYy5sb2coJ+a4uOaIj+Wksei0pSEnKTtcclxuICAgICAgICB0aGlzLlN0YXRlID0gR2FtZVN0YXRlLkZhaWxlZDtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdEZhaWxlZCgpO1xyXG4gICAgICAgIC8vIOS4iuaKpea4uOaIj+aXtumXtFxyXG4gICAgICAgIGxldCBnYW1lVGltZSA9IE1hdGgucm91bmQoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5nYW1lU3RhcnRUaW1lKSAvIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5ri45oiP5pe26Ze0OlwiICsgZ2FtZVRpbWUgKyBcIuWIhumSn1wiKTtcclxuICAgICAgICBsZXQgcmV3YXJkQ2FsbEZ1bmMgPSAocmVzOiBZWl9SZXdhcmQpID0+IHtcclxuICAgICAgICAgICAgY2MubG9nKFwi6I635Y+W5r+A5Yqx57uE5Lu25aWW5YqxK1wiICsgcmVzLnJld2FyZFZhbHVlKVxyXG4gICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+S/neWtmOWlluWKseWAvOWIsOacrOWcsFxyXG4gICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IHJlcy5yZXdhcmRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChDb25zdGFudC5FX0dBTUVfTE9HSUMsIHsgdHlwZTogQ29uc3RhbnQuRV9DT0lOX0NIQU5HRSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBjbG9zZUNhbGxGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2coXCLmv4DlirHnu4Tku7blhbPpl63vvIHvvIHvvIHvvIHvvIHvvIFcIik7XHJcbiAgICAgICAgICAgIGNvY29zei51aU1nci5vcGVuUGFnZShQYWdlTmFtZS5VSU92ZXJQYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLmFkTWFuYWdlci5zaG93QmVmb3JHYW1lT3ZlckFkKGNvY29zei5nZXRMZXZlbElkKCksIExldmVsU3RhdHVzLkdhbWVGYWlsLCA1MCwgY2xvc2VDYWxsRnVuYywgcmV3YXJkQ2FsbEZ1bmMpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==