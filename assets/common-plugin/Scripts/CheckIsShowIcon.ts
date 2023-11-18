// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { utils } from "./Utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckIsShowIcon extends cc.Component {

    onEnable() {
        if (utils.ServerConfig && utils.ServerConfig.show_video_icon && utils.ServerConfig.show_video_icon == "false") {
            this.node.active = false;
        } else {
            this.node.active = true;
        }
    }
}
