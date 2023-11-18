import UIPage from "../Framework/UIPage";
import Constant, { PageName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UILoadingPage extends UIPage {

    private _loadingBar: cc.ProgressBar = null;

    constructor() {
        super(PageName.UILoadingPage);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        // 健康忠告
        let health = cc.find("health", this._page);
        if (health) {
            if (cocosz.curLanguage == "zh" && (PlatUtils.IsHuaWei || PlatUtils.IsOPPO || cocosz.isDeBug)) {
                health.active = true;
            } else {
                health.active = false;
            }
        }
        this._loadingBar = cc.find("LoadingBar", this._page).getComponent(cc.ProgressBar);
    }

    protected onOpen() {
        cc.game.on(Constant.E_GAME_LOGIC, this._onGameMassageHandler, this);
        // 进度默认0.01
        this._loadingBar.progress = 0.01;
        // 最低进度
        let r = 0.01;
        cc.tween(this._page)
            .delay(0.2)
            .call(() => {
                r += 0.01;
                if (r < 1) { this._updateProgress(r); }
            })
            .union()
            .repeatForever()
            .start();
    }

    protected onClose() {
        cc.game.targetOff(this);
    }

    _onGameMassageHandler(event: any) {
        this._loadingBar.node.active = true;
        switch (event.type) {
            case Constant.E_UPDATE_PROGRESS: {
                this._updateProgress(event.data);
                break;
            }
        }
    }

    _updateProgress(pro: number) {
        if (pro > this._loadingBar.progress)
            this._loadingBar.progress = pro;
    }

}
