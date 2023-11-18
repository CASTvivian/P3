import GameItem from "./GameItem";
import QCrossWidgetItem from "./QCrossWidgetItem";
import { utils } from "./Utils";
import { BannerLocation, SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

const _panelSize: cc.Size[] = [cc.size(225, 1000), cc.size(506, 1000)];
const _titleSize: cc.Size[] = [cc.size(111, 54), cc.size(275, 54)];
const _titleBgSize: cc.Size[] = [cc.size(376, 104), cc.size(545, 104)];
const _starSize: cc.Size[] = [cc.size(251, 89), cc.size(425, 89)];

@ccclass
export default class MoreGamesPanel extends cc.Component {

    _panel: cc.Node = null;
    _gameList: cc.Node = null;
    _originScale: number = 1;

    _gameItems: GameItem[] = [];
    _jumpList: any = null;
    _dataDirty: boolean = false;

    _closeBtnRight: cc.Node = null;
    _closeBtnLine: cc.Node = null;

    _star: cc.Node = null;
    private _items: QCrossWidgetItem[] = [];
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
        this._gameList = this._panel.getChildByName("GameScrollView").getComponent(cc.ScrollView).content;
        this.gameItemNode = this._gameList.children[0];
        this._gameList.removeAllChildren();


        this.node.active = false;
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    }


    private _initWidget() {
        this._gameList.removeAllChildren();
        let totalRow = Math.floor(this._jumpList.length / 3);
        let totalClo = 3 * totalRow;
        for (let i = 0; i < totalClo; i++) {
            let data: any = this._jumpList[i];
            if (data && data.logo) {
                let tempNode = cc.instantiate(this.gameItemNode);
                let qcrossWidgetItem: QCrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = this._location;
                qcrossWidgetItem.init(data);
                this._gameList.addChild(tempNode);
            }
        }
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
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        self.node.active = false;
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    }

    public onCloseBtnHandler(event: any, data: any) {
        this.hide();
    }
}
