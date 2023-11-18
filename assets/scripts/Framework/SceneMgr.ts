import { gameMgr } from "../Game/gameMgr";
import setMap from "../Game/setMap";
import GuideLayer, { guideLayer } from "../UI/GuideLayer";
import { cocosz } from "./CocosZ";

export default class SceneMgr {

    private static _inst: SceneMgr;
    public static get inst(): SceneMgr {
        if (!SceneMgr._inst) {
            SceneMgr._inst = new SceneMgr();
        }
        return SceneMgr._inst;
    }

    private _activeScene: string = "";
    private _timeInterval: number = 0;

    public loadScene(name: string, onLunch: Function) {
        if (this._activeScene == name) {
            let curTime: number = (new Date()).getTime();
            if (curTime - this._timeInterval < 1000) {
                return;
            }
        }
        this._timeInterval = new Date().getTime();
        // 加载场景开始前
        this.loadBefore(name, () => {
            // 加载场景
            cc.director.loadScene(name, () => {
                this._activeScene = name;
                onLunch();
                // 加载场景完成后
                this.loadFinish(name);
            });
        });
    }

    /** 加载场景开始前 */
    loadBefore(name: string, call: Function) {
        // 显示加载动画
        if (guideLayer && guideLayer.isValid) {
            if (name == "Home") {
                guideLayer.node.zIndex = cc.macro.MAX_ZINDEX;
                guideLayer.hideFjAni();
                guideLayer.showBgAni();
            } else if (name == "Game") {
                guideLayer.node.zIndex = cc.macro.MAX_ZINDEX;
                if ([5, 7].includes(cocosz.gameMode)) {
                    // 夺旗模式
                    guideLayer.hideFjAni();
                    guideLayer.showBgAni();
                } else {
                    guideLayer.hideBgAni();
                    guideLayer.showFjAni();
                }
            }
        }
        // 跳转前释放
        if (name == "Home") {
            // 逐帧释放关卡节点
            if (gameMgr && gameMgr.map && gameMgr.map.isValid) {
                let mapTs = gameMgr.map.getComponent(setMap);
                if (mapTs) {
                    setTimeout(() => { mapTs.release(call) }, 100);
                    return;
                }
            }
        }
        call && call();
    }

    /** 加载场景完成后 */
    loadFinish(name: string) {
        if (name == "Home") {
            // 加载动画(zindex)
            if (guideLayer && guideLayer.isValid) {
                guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
            }
            // 释放资源
            // this.releaseRes();
        }
        else if (name == "Game") {
            guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
        }
        // 刷新背景音效
        cocosz.audioMgr.playBgm();
    }

    /** 释放游戏资源 */
    releaseRes() {
        // 释放游戏音效
        let audio_game: any = [];
        cocosz.getDirWithPath("audio_game", cc.AudioClip, audio_game);
        cocosz.resMgr.releaseResArray(audio_game, cc.AudioClip);

        if (6 == cocosz.gameMode) {
            // 释放地下城音效
            let audio_zombie: any = [];
            cocosz.getDirWithPath("audio_zombie", cc.AudioClip, audio_zombie);
            cocosz.resMgr.releaseResArray(audio_zombie, cc.AudioClip);
            // 释放僵尸预制体
            let prefab_zombie: any = [];
            cocosz.getDirWithPath("prefab_zombie", cc.Prefab, prefab_zombie);
            cocosz.resMgr.releaseResArray(prefab_zombie, cc.Prefab);
            // 释放技能预制体
            let prefab_zombie_skill: any = [];
            cocosz.getDirWithPath("prefab_zombie_skill", cc.Prefab, prefab_zombie_skill);
            cocosz.resMgr.releaseResArray(prefab_zombie_skill, cc.Prefab);
            // 释放技能图片
            let tex_zombie: any = [];
            cocosz.getDirWithPath("tex_zombie", cc.SpriteFrame, tex_zombie);
            cocosz.resMgr.releaseResArray(tex_zombie, cc.SpriteFrame);
        }
    }
}
