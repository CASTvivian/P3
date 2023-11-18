import GameCtr from "./GameCtr";
import { cocosz } from "./CocosZ";
import Constant, { PageName, GameState, PanelName } from "./Constant";
import Msg from "./Msg";
import { utils } from "../../common-plugin/Scripts/Utils";
import YZ_Constant, { LevelStatus, YZ_Reward } from "../../common-plugin/Scripts/YZ_Constant";
import YZ_LocalStorage from "../../common-plugin/Scripts/YZ_LocalStorage";
// @ts-ignore
const i18n = require('LanguageData');

/**
 * 游戏管理
 */
export default class GameMgr {

    private static _inst: GameMgr;
    public static get inst(): GameMgr {
        if (!GameMgr._inst) {
            GameMgr._inst = new GameMgr();
        }
        return GameMgr._inst;
    }

    protected _state: GameState = GameState.None;
    public get State() {
        return this._state;
    }
    public set State(value: GameState) {
        this._state = value;
    }

    private _gameCtr: GameCtr = new GameCtr();;
    public get gameCtr() {
        return this._gameCtr;
    }


    public gameStartTime: number = 0;
    private canTry: boolean = true;
    private canGame: boolean = true;
    /**
     * 开始游戏
     * @param 关卡ID
     */
    public async gameStart(levelId: number) {
        YZ_LocalStorage.setItem(YZ_Constant.ST_RED_BAG_PROGRESS, '0');
        cocosz.curLevel = levelId;
        // 重置
        if (this.canTry) {
            this.canTry = false;
            this.gameCtr.curUseSkinId = -1;
            // 能否弹试用
            if (cocosz.isShowAd && cocosz.isADON && (cocosz.isDeBug || utils.isShowTrySkin(levelId))) {
                let rangeLevel = cocosz.dataMgr.getGunInfo(cocosz.dataMgr.CurRange).Level;
                if (Math.random() < 0.5 && (rangeLevel < 3)) {
                    // 武器升级弹窗
                    cocosz.uiMgr.openPanel(PanelName.UIWeaponLevelPanel);
                } else {
                    // 皮肤试用弹窗
                    cocosz.uiMgr.openPanel(PanelName.UITrySkinPanel);
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
    }

    private _loadGameScene() {
        // 使用皮肤
        if (this.gameCtr.curUseSkinId < 0) {
            this.gameCtr.curUseSkinId = cocosz.dataMgr.CurSkinId;
        }
        //上报游戏开始
        utils.StartGame(cocosz.getLevelId().toString());
        //进入游戏场景
        cocosz.sceneMgr.loadScene("Game", () => {
            this.gameStartTime = new Date().getTime();
            this.canTry = true;
            this.canGame = true;
            this._gamePrepare();
            //显示过度页面
            cocosz.uiMgr.openPage(PageName.UIGameLoadingPage);
        });
    }

    /** 游戏预加载 */
    private _gamePrepare() {
        try {
            this.State = GameState.Prepare;
            //调用游戏初始化
            this.gameCtr.init();
        } catch (error) {
            cc.error("erro >>", error);
            // 资源没有准备好, 无法进入游戏
            cocosz.sceneMgr.loadScene("Home", () => {
                cocosz.uiMgr.openPage(PageName.UIHomePage);
                Msg.Show(i18n.t("msg.net_error"));//当前网络状态不佳，请重启游戏
            });
        }
    }

    /** 游戏胜利 */
    public gameSuccess() {
        cc.log('游戏胜利!');
        this.State = GameState.Success;
        cocosz.audioMgr.playEffectWinner();
        // 上报游戏时间
        let gameTime = Math.round((new Date().getTime() - this.gameStartTime) / 1000 / 60);
        utils.SendEvent("游戏时间:" + gameTime + "分钟");
        //保存关卡解锁数据
        let rewardCallFunc = (res: YZ_Reward) => {
            cc.log("获取激励组件奖励+" + res.rewardValue)
            if (res) {
                cocosz.dataMgr.CoinCount += res.rewardValue;
                cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_COIN_CHANGE });
            }
        };

        let closeCallFunc = () => {
            cc.log("激励组件关闭！！！！！！");
            cocosz.uiMgr.openPage(PageName.UIOverPage);
        }

        //显示结算前广告
        utils.adManager.showBeforGameOverAd(cocosz.getLevelId(), LevelStatus.GameWin, 100, closeCallFunc, rewardCallFunc);

    }

    /** 游戏失败 */
    public gameFailed() {
        cc.log('游戏失败!');
        this.State = GameState.Failed;
        cocosz.audioMgr.playEffectFailed();
        // 上报游戏时间
        let gameTime = Math.round((new Date().getTime() - this.gameStartTime) / 1000 / 60);
        utils.SendEvent("游戏时间:" + gameTime + "分钟");
        let rewardCallFunc = (res: YZ_Reward) => {
            cc.log("获取激励组件奖励+" + res.rewardValue)
            if (res) {
                //保存奖励值到本地
                cocosz.dataMgr.CoinCount += res.rewardValue;
                cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_COIN_CHANGE });
            }
        };

        let closeCallFunc = () => {
            cc.log("激励组件关闭！！！！！！");
            cocosz.uiMgr.openPage(PageName.UIOverPage);
        }

        utils.adManager.showBeforGameOverAd(cocosz.getLevelId(), LevelStatus.GameFail, 50, closeCallFunc, rewardCallFunc);
    }
}
