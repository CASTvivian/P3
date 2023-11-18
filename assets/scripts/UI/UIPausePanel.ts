import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import { utils } from "../../common-plugin/Scripts/Utils";
import { BannerLocation } from "../../common-plugin/Scripts/YZ_Constant";
import { cocosz } from "../Framework/CocosZ";
import { PageName, PanelName } from "../Framework/Constant";
import TweenEffect from "../Framework/TweenEffect";
import UIPage from "../Framework/UIPage";
import { gameMgr } from "../Game/gameMgr";
import { upgradeMgr } from "../Game/UpgradeMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIPausePanel extends UIPage {

    constructor() {
        super(PanelName.UIPausePanel);
        this.isValid() && this.onLoad();
    }

    private _mask: cc.Node = null;
    private _panel: cc.Node = null;
    onLoad() {
        this._mask = this._page.getChildByName("mask");
        this._panel = this._page.getChildByName("Panel");
        let btnNames: string[] = ["BtnRestart", "BtnResume", "BtnHome"];
        for (let i = 0; i < btnNames.length; i++) {
            let btn: cc.Node = cc.find(btnNames[i], this._panel);
            btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
        }
    }

    protected onOpen(): void {
        utils.SendEvent("页面-暂停");
        this.showAd();
        TweenEffect.panel_mask_opacity(this._mask);
        TweenEffect.panel_open_moveY(this._panel);
        cocosz.pauseCount++;
    }
    protected onClose(): void {
        if (PlatUtils.IsVIVO) {
            utils.adManager.hideCustomAd({ location: BannerLocation.Pause });
        }
        cocosz.pauseCount--;
    }

    showAd() {
        if (cocosz.isShowAd) {
            if (PlatUtils.IsVIVO) {
                utils.adManager.showCustomAd({ location: BannerLocation.Pause });
            }
        }
    }

    /**
     * 所有按钮点击事件
     * @param event 
     * @param data 
     */
    private async _onBtnClickedHandler(event: cc.Event, data: any) {
        //播放按钮点击音效
        await cocosz.audioMgr.playBtnEffect().catch();
        switch (event.target.name) {
            case "BtnRestart": {
                gameMgr.isFail = true;
                gameMgr.unscheduleAllCallbacks();
                upgradeMgr && upgradeMgr.unscheduleAllCallbacks();
                cocosz.uiMgr.closePanel(PanelName.UIPausePanel);
                if (cocosz.gameMode == 6) {
                    cocosz.gameMgr.gameStart(cocosz.dataMgr.TotoalCount_6);
                }
                break;
            }
            case "BtnResume": {
                cc.tween(this._panel)
                    .to(0.5, { y: this._panel.y + 1000 }, { easing: "sineOut" })
                    .call(() => {
                        cocosz.uiMgr.closePanel(PanelName.UIPausePanel);
                    })
                    .start();
                break;
            }
            case "BtnHome": {
                gameMgr.isFail = true;
                gameMgr.unscheduleAllCallbacks();
                upgradeMgr && upgradeMgr.unscheduleAllCallbacks();
                cocosz.uiMgr.closePanel(PanelName.UIPausePanel);
                cocosz.sceneMgr.loadScene("Home", (() => {
                    cocosz.uiMgr.openPage(PageName.UIHomePage);
                }))
                break;
            }
        }
    }

}
