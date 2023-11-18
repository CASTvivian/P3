import UIPage from "../Framework/UIPage";
import Constant, { PageName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import { guideLayer } from "./GuideLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIGameLoadingPage extends UIPage {

    private _startTime: number = 0;

    constructor() {
        super(PageName.UIGameLoadingPage);
        this.isValid() && this.onLoad();
    }

    protected onOpen(): void {
        cc.game.on(Constant.E_GAME_LOGIC, this._onGameMessageHandler, this);
        this._startTime = new Date().getTime();
        cocosz.scheduleOnce(() => {
            cocosz.audioMgr.playEffect("fj", true, 1);
        }, 0.1);
    }

    protected onClose() {
        cc.game.targetOff(this);
        guideLayer.hideFjAni();
        guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
        cocosz.audioMgr.stopEffect("fj");
    }

    private _onGameMessageHandler(event: any) {
        switch (event.type) {
            case Constant.E_UPDATE_PROGRESS: {
                this._updateProgress(event.data);
                break;
            }
        }
    }

    private _updateProgress(pro: number) {
        if (pro >= 1) {
            let difTime = new Date().getTime() - this._startTime;
            if (difTime >= 6000) {
                cocosz.uiMgr.openPage(PageName.UIGamePage);
            } else {
                setTimeout(() => {
                    cocosz.uiMgr.openPage(PageName.UIGamePage);
                }, 6000 - difTime);
            }
        }
    }

}
