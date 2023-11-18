import PlatUtils from "./PlatUtils";
import { AldEventType, LevelStatus } from "./YZ_Constant";
import { utils } from "./Utils";


const { ccclass, property } = cc._decorator;

/**
 * 阿拉丁辅助类
 */
@ccclass
export default class AldUtils {

    /**
     * 游戏开始上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    public static StartGame(level: string, model?: string): void {
        let stageName = model ? `${model},第${level}关` : `第${level}关`;
        let prarm: any = {
            stageId: `${level}`,
            stageName: stageName
        }
        utils.showLog(`关卡：${stageName}开始`)
        utils.cur_tool && utils.cur_tool.postLevel && utils.cur_tool.postLevel(level, LevelStatus.GameStart, stageName);
    }
    /**
    * 游戏胜利上报
    * @param level 当前关卡
    * @param star 获得星星： 默认为0
    * @param model 当前模式： 没有则省略
    */
    public static GameWin(level: string, star: number = 0, model?: string): void {
        let stageName = model ? `${model},第${level}关` : `第${level}关`;
        let desc = model ? `${model},第${level}关，游戏胜利！获得${star}星` : `第${level}关，游戏胜利！获得${star}星`;
        let prarm: any = {
            stageId: `${level}`,
            stageName: stageName,
            event: 'complete',
            params: { desc: desc }
        }
        utils.showLog(`关卡：${stageName}胜利`)

        utils.cur_tool && utils.cur_tool.postLevel && utils.cur_tool.postLevel(level, LevelStatus.GameWin, stageName);
    }

    /**
    * 游戏失败上报
    * @param level 当前关卡
    * @param model 当前模式： 没有则省略
    */
    public static GameFail(level: string, model?: string): void {
        let stageName = model ? `${model},第${level}关` : `第${level}关`;
        let desc = model ? `${model},第${level}关，游戏失败!` : `第${level}关，游戏失败!`;
        let prarm: any = {
            stageId: `${level}`,
            stageName: stageName,
            event: 'fail',
            params: { desc: desc }
        }
        utils.showLog(`关卡：${stageName}失败`)

        utils.cur_tool && utils.cur_tool.postLevel && utils.cur_tool.postLevel(level, LevelStatus.GameFail, stageName);
    }

    /**
     * 跳过关卡上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    public static GameSkip(level: string, model?: string): void {
        let stageName = model ? `${model},第${level}关` : `第${level}关`;
        utils.cur_tool && utils.cur_tool.postLevel && utils.cur_tool.postLevel(level, LevelStatus.GameSkip, stageName);
    }

    /**
     * 游戏中使用道具上报
     * @param level 当前关卡
     * @param tooName 道具名称
     * @param model 当前模式： 没有则省略
     */
    public static UseTool(level: string, toolName: string, model?: string): void {
    }

    /**
     * 事件上报
     * @param eventName 事件名称
     */
    public static SendEvent(eventName: string) {
        utils.showLog(`事件上报:${eventName}`);
        utils.cur_tool && utils.cur_tool.sendEvent && utils.cur_tool.sendEvent(eventName);
    }

}
