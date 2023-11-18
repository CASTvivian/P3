import UIPage from "../Framework/UIPage";
import Msg from "../Framework/Msg";
import { PanelName } from "../Framework/Constant";
import { cocosz } from "../Framework/CocosZ";
import { utils } from "../../common-plugin/Scripts/Utils";
import { gameMgr } from "../Game/gameMgr";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
// @ts-ignore
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIRevivePanel extends UIPage {


    private _mask: cc.Node = null;
    private _panel: cc.Node = null;
    private _timeLabel: cc.Label = null;
    private _proIcon: cc.Sprite = null;

    private _btnVideo: cc.Node = null;
    private _btnPass: cc.Node = null;

    constructor() {
        super(PanelName.UIRevivePanel);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this._mask = this._page.getChildByName("Mask");

        this._panel = this._page.getChildByName("Panel");
        this._timeLabel = this._panel.getChildByName("time").getComponent(cc.Label);
        this._proIcon = this._panel.getChildByName("shangquan").getComponent(cc.Sprite);

        this._btnVideo = this._panel.getChildByName("BtnVideo");
        this._btnVideo.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
        this._btnPass = this._panel.getChildByName("BtnPass");
        this._btnPass.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
    }

    protected onOpen() {
        utils.SendEvent("页面-复活");
        this.showAd();
        this._initPanel();
        cocosz.pauseCount++;
    }

    protected onClose(): void {
        cocosz.pauseCount--;

    }

    showAd() { }

    _tw1: cc.Tween = null;
    _tw2: cc.Tween = null;
    private _initPanel() {
        let opacityBack = this._mask.opacity;
        this._mask.opacity = 0;
        cc.tween(this._mask).to(0.2, { opacity: opacityBack }).start();
        this._panel.scale = 0;
        cc.tween(this._panel)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();

        let count = 9;
        this._tw1 = cc.tween(this._timeLabel)
            .delay(1)
            .call(() => {
                this._timeLabel.string = (--count).toString();
            })
            .union()
            .repeat(9)
            .call(() => {
                cocosz.uiMgr.closePanel(PanelName.UIRevivePanel);
                gameMgr.fail();
            })
            .start();

        this._tw2 = cc.tween(this._proIcon)
            .to(9, { fillRange: 0 })
            .start();
    }

    stopTween() {
        if (cocosz.gameMode == 6) {
            this._tw1 && this._tw1.stop();
            this._tw2 && this._tw2.stop();
        }
    }

    /**
     * 所有按钮点击事件
     * @param event 
     * @param data 
     */
    private async _onBtnClickedHandler(event: cc.Event, data: any) {
        cocosz.audioMgr.playBtnEffect();
        this.stopTween();
        switch (event.target.name) {
            case "BtnVideo": {
                utils.umaEvent("gamefuhuo");
                // 分享
                if (this._btnVideo.getChildByName("share") && this._btnVideo.getChildByName("share").active) {
                    utils.SendEvent("分享-复活");
                    cocosz.share(() => {
                        utils.SendEvent("分享-复活-成功")
                        this._reLive();
                    }, () => {
                        utils.SendEvent("分享-复活-失败")
                        cocosz.uiMgr.closePanel(PanelName.UIRevivePanel);
                        gameMgr.fail();
                    })
                }
                // 视频
                else if (this._btnVideo.getChildByName("video") && this._btnVideo.getChildByName("video").active) {
                    utils.SendEvent("视频-复活-播放");
                    cocosz.watchAD(() => {
                        utils.SendEvent("视频-复活-成功")
                        this._reLive();
                    }, () => {
                        utils.SendEvent("视频-复活-失败")
                        cocosz.uiMgr.closePanel(PanelName.UIRevivePanel);
                        gameMgr.fail();
                    });
                }
                // 失败
                else {
                    cocosz.uiMgr.closePanel(PanelName.UIRevivePanel);
                    gameMgr.fail();
                }
                break;
            }
            case "BtnPass": {
                utils.umaEvent("gamesurr");
                cocosz.uiMgr.closePanel(PanelName.UIRevivePanel);
                gameMgr.fail();
                break;
            }
        }
    }

    /**
     * 复活事件 
     */
    private _reLive() {
        Msg.Show(i18n.t("msg.fhcg"));//复活成功
        cocosz.uiMgr.closePanel(PanelName.UIRevivePanel);
        gameMgr.revive();
    }

}
