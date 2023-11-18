import Constant, { GameState, PageName, PanelName } from "./Constant";
import { cocosz } from "./CocosZ";
import { gameMgr } from "../Game/gameMgr";


/**
 * 游戏控制类
 * 实现游戏的基础逻辑
 */

export default class GameCtr {

    public curUseSkinId: number = -1;// 使用皮肤id

    public loadProgress: number = 0;// 总加载进度
    private _loadMapPro: number = 0;// 地图加载进度
    private _totalCount: number = 0;// 资源总数
    private _compCount: number = 0;// 资源完成数量

    private _pathBack: string = "";
    private _prefabBack: cc.Prefab = null;

    //游戏初始化
    public init() {
        this.loadProgress = 0;
        this._loadMapPro = 0;
        this._totalCount = 0;
        this._compCount = 0;
        this.loadRes();
    }

    updateLoadRes() {
        this.loadProgress = (this._loadMapPro + this._compCount / this._totalCount) / 2;
        // 开启地图加载
        if (this._compCount >= this._totalCount && this._loadMapPro == 0) {
            this._loadMapPro = 0.01;
            this.loadMap();
        }
        cc.game.emit(Constant.E_GAME_LOGIC, { type: Constant.E_UPDATE_PROGRESS, data: this.loadProgress })
    }

    loadRes() {
        // 游戏音效
        let mess1: any = [];
        // 地下城音效
        let mess2: any = [];
        // 地下城技能预制体
        let mess3: any = [];

        // 游戏音效
        cocosz.getDirWithPath("audio_game", cc.AudioClip, mess1);
        cocosz.resMgr.loadAndCacheResArray(mess1, cc.AudioClip, null, () => {
            this._compCount++;
            this.updateLoadRes();
        });
        // 地下城
        if (6 == cocosz.gameMode) {
            // 音效
            cocosz.getDirWithPath("audio_zombie", cc.AudioClip, mess2);
            cocosz.resMgr.loadAndCacheResArray(mess2, cc.AudioClip, null, () => {
                this._compCount++;
                this.updateLoadRes();
            });
            // 预制体
            cocosz.getDirWithPath("prefab_zombie_skill", cc.Prefab, mess3);
            cocosz.resMgr.loadAndCacheResArray(mess3, cc.Prefab, null, () => {
                this._compCount++;
                this.updateLoadRes();
            })
        }
        // 资源总数
        this._totalCount = mess1.length + mess2.length + mess3.length;
    }

    loadMap() {
        let path = "maps/mapzombie";
        // 释放地图资源
        if (this._pathBack != path && this._prefabBack && this._prefabBack.isValid) {
            cc.assetManager.releaseAsset(this._prefabBack)
        }
        // 加载地图
        cocosz.resMgr.loadRes(path, cc.Prefab, ((cur, total) => {
            if (cur / total > this._loadMapPro) {
                this._loadMapPro = cur / total;
            }
            if (this._loadMapPro > 0.99) this._loadMapPro = 0.99;
            this.updateLoadRes();
        }), ((err, res: any) => {
            if (err) {
                console.log(err);
                cocosz.sceneMgr.loadScene("Home", (() => {
                    cocosz.uiMgr.openPage(PageName.UIHomePage);
                }));
            }
            else {
                this._pathBack = path;
                this._prefabBack = res;
                gameMgr.map = cc.instantiate(res);
                gameMgr.initPos();
                gameMgr.mapSize = gameMgr.map.getContentSize();
                gameMgr.node.addChild(gameMgr.map, -5);
                this._loadMapPro = 1;
                this.updateLoadRes();
            }
        }))
    }
}
