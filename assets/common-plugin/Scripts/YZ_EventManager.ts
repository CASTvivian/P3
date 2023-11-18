import YZ_Constant from "./YZ_Constant";

const {ccclass, property} = cc._decorator;

@ccclass
export default class YZ_EventManager extends cc.Component {

    public static registerEvent(name: string , handler: any, target : any){
        cc.game.on(name, handler, target);
    }

    public static unregisterEvent(target:any){
        cc.game.targetOff(target);
    }

    public static emitCommonEvent(args: object){
        cc.game.emit(YZ_Constant.YZ_EventCommon, args);
    }
}
