import GameItem from "./GameItem";
import { utils } from "./Utils";
import { BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BeforGameOverRecGamesPanel extends cc.Component {

    _panel: cc.Node = null;
    _gameList: cc.Node = null;
    _originScale: number = 1;

    _gameItems: GameItem[] = [];
    _jumpList: any = null;
    _dataDirty: boolean = false;
    _is_Horizontal: boolean = false;

    _closeBtnRight: cc.Node = null;
    _closeBtnLine: cc.Node = null;

    _star: cc.Node = null;
    private gameItemNode: cc.Node = null;

    _location: SubLocation = SubLocation.isMoreGame;

    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }

        if (!PlatUtils.IsNativeAndroid) {
            utils.adManager.HideBanner(BannerLocation.Home);
        }

        this._panel = this.node.getChildByName("Panel");


        this.node.active = false;


        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920;
            this._is_Horizontal = true;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        if (this._is_Horizontal) {
            this._panel.getChildByName("VGameScrollView").active = false
            this._panel.getChildByName("VHead").active = false
            this._gameList = this._panel.getChildByName("HGameScrollView").getComponent(cc.ScrollView).content;
            this.gameItemNode = this._gameList.children[0];
            this._gameList.removeAllChildren();

        } else {
            this._panel.getChildByName("HGameScrollView").active = false;
            this._panel.getChildByName("HHead").active = false
            this._gameList = this._panel.getChildByName("VGameScrollView").getComponent(cc.ScrollView).content;
            this.gameItemNode = this._gameList.children[0];
            this._gameList.removeAllChildren();
        }


        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    }


    private _initWidget() {
        this.scheduleOnce(() => {
            this._gameList.removeAllChildren();
            let clo = this._is_Horizontal ? 7 : 4;
            let totalRow = Math.floor(this._jumpList.length / clo);
            let totalClo = clo * totalRow;
            for (let i = 0; i < totalClo; i++) {
                let data: any = this._jumpList[i];
                if (data && data.logo) {
                    let tempNode = cc.instantiate(this.gameItemNode);
                    let gameItem: GameItem = tempNode.getComponent("GameItem");
                    gameItem.init(data, this._location);
                    this._gameList.addChild(tempNode);
                }
            }
        })

    }

    update() {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updatePanel();
        }
    }

    _updatePanel() {
        utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    }

    public init(jumpList: any) {
        this._jumpList = jumpList;
        this._dataDirty = true;
    }

    public show() {
        this.node.active = true;
    }

    public hide() {
        let self = this;
        self.node.active = false;


        if (utils.rewardRecGamePanelCloseFunc) {
            utils.rewardRecGamePanelCloseFunc();
            utils.rewardRecGamePanelCloseFunc = null;;
        } else {
            utils.rewardCloseFunc && utils.rewardCloseFunc();
            utils.rewardCloseFunc = null;
        }
    }

    public onCloseBtnHandler(event: any, data: any) {
        this.hide();
    }
}
