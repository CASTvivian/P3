import { access } from "fs";
import PlatUtils from "../../common-plugin/Scripts/PlatUtils";
import { utils } from "../../common-plugin/Scripts/Utils";
import { BannerLocation } from "../../common-plugin/Scripts/YZ_Constant";
import { cocosz } from "../Framework/CocosZ";
import { PanelName } from "../Framework/Constant";
import UIPage from "../Framework/UIPage";
import Ani from "../Game/ani";

const { ccclass } = cc._decorator;

@ccclass
export default class UITrySkinPanel extends UIPage {

    private _mask: cc.Node = null;
    private _panel: cc.Node = null;

    private aniArr: cc.Node[] = [];

    private btnArr: cc.Node[] = [];

    skinArr: number[] = [];

    constructor() {
        super(PanelName.UITrySkinPanel);
        this.isValid() && this.onLoad();
    }

    protected onLoad() {
        this._panel = this._page.getChildByName("Panel");
        this._mask = this._page.getChildByName("Mask");

        this.aniArr[0] = this._panel.getChildByName("ani0");
        this.aniArr[1] = this._panel.getChildByName("ani1");
        this.aniArr[2] = this._panel.getChildByName("ani2");

        let btnNames: string[] = ["BtnVideo0", "BtnVideo1", "BtnVideo2", "BtnPass"];
        for (let i = 0; i < btnNames.length; i++) {
            let btn: cc.Node = cc.find(btnNames[i], this._panel);
            if (btn) {
                this.btnArr[i] = btn;
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            }
        }
    }

    protected onOpen() {
        utils.SendEvent("页面-皮肤试用");
        // 暂停游戏逻辑
        cocosz.pauseCount++;
        // 未解锁的皮肤id数组
        let arr = cocosz.dataMgr.getRandomLockSkin();
        if (arr.length > 0) {
            // 随机3个皮肤
            for (let i = 0; i < 3; i++) {
                if (arr.length > 0) {
                    let index = Math.floor(Math.random() * arr.length);
                    let id = arr[index];
                    arr.splice(index, 1);
                    this.skinArr[i] = id;
                    // 显示任务
                    let aniTs = this.aniArr[i].getComponent(Ani);
                    aniTs.setSkinById(id);
                    aniTs.setWeaponById(cocosz.dataMgr.CurRange);
                    this.aniArr[i].opacity = 0;
                    cocosz.scheduleOnce(() => {
                        if (this._page && this.aniArr[i]) {
                            cc.tween(this.aniArr[i])
                                .set({ y: 500, opacity: 255 })
                                .to(0.4, { y: 50 }, { easing: "sineOut" })
                                .start();
                        }
                    }, 0.3 * i)
                } else {
                    // 皮肤不够隐藏
                    this.aniArr[i].active = false;
                    this.btnArr[i].active = false;
                }
            }
        } else {
            // 没有未解锁皮肤，自动隐藏
            cocosz.uiMgr.closePanel(PanelName.UITrySkinPanel);
        }
    }

    protected onClose(): void {
        cocosz.gameMgr.gameStart(cocosz.curLevel);
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
            case "BtnVideo0":
            case "BtnVideo1":
            case "BtnVideo2": {
                utils.SendEvent("视频-弹窗角色试用-播放")
                cocosz.watchAD(() => {
                    // 视频成功
                    utils.SendEvent("视频-弹窗角色试用-成功")
                    if (event.target.name == "BtnVideo0") {
                        cocosz.gameMgr.gameCtr.curUseSkinId = this.skinArr[0];
                    } else if (event.target.name == "BtnVideo1") {
                        cocosz.gameMgr.gameCtr.curUseSkinId = this.skinArr[1];
                    } else if (event.target.name == "BtnVideo2") {
                        cocosz.gameMgr.gameCtr.curUseSkinId = this.skinArr[2];
                    }
                    cocosz.uiMgr.closePanel(PanelName.UITrySkinPanel);
                }, () => {
                    // 视频失败
                    utils.SendEvent("视频-弹窗角色试用-失败")
                    cocosz.uiMgr.closePanel(PanelName.UITrySkinPanel);
                })
                break;
            }
            case "BtnPass": {
                cocosz.uiMgr.closePanel(PanelName.UITrySkinPanel);
                break;
            }
        }
    }
}
