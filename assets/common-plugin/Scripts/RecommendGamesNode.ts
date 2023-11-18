import GamePage from "./GamePage";
import MoreGamesPanel from "./MoreGamesPanel";
import { utils } from "./Utils";
import { SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecommendGamesNode extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;
    @property(cc.Prefab)
    prefab1: cc.Prefab = null;

    moreGamesPanel: MoreGamesPanel = null;

    _pageView: cc.PageView = null;
    _content: cc.Node = null;
    _gamePageNode: cc.Node = null;

    _dataDirty: boolean = false;
    _isContentFilled: boolean = false;

    _scrollInterval: number = 3;
    _timeTmp: number = 0;

    _gameList: any = null;
    moreGame: cc.Node = null;

    onLoad() {
        let pageViewNode: cc.Node = this.node.getChildByName("PageView");
        this.moreGame = cc.find("bg/BtnMore", this.node);
        this._pageView = pageViewNode.getComponent(cc.PageView);
        this._content = this._pageView.content;

        this._gamePageNode = this._content.getChildByName("GamePage");
        this._content.removeAllChildren();
    }

    public init(data: any) {
        this._gameList = data;
        if (this._gameList && this._gameList.length > 0) {
            this._dataDirty = true;
        } else {
            this.node.active = false;
        }
    }

    onEnable() {
        let self = this;
        this.moreGame.on(cc.Node.EventType.TOUCH_START, (event) => {
            if (PlatUtils.IsDouyin) {
                utils.Tool_Douyin.showMoreGamesModal();
            } else if (!PlatUtils.IsOPPO || (utils.ServerConfig.recommend_bar_show_pannel && utils.ServerConfig.recommend_bar_show_pannel == "true")) {
                let panel;
                if (utils.ServerConfig.more_game_skin == 2) {
                    panel = cc.instantiate(self.prefab1);
                    panel.zIndex = 999;
                    self.moreGamesPanel = panel.getComponent("MoreGamesPanel1");
                } else {
                    panel = cc.instantiate(self.prefab);
                    panel.zIndex = 999;
                    self.moreGamesPanel = panel.getComponent("MoreGamesPanel");
                }

                cc.director.getScene().addChild(panel);
                self.moreGamesPanel._location = SubLocation.isScrollbar;
                self.moreGamesPanel.init(self._gameList);
                self.moreGamesPanel.show();
            } else {
                utils.showLog("服务器未配置显示更多游戏面板！");
            }
        });
    }

    onDisable() {
        this.moreGame.targetOff(this);
    }

    update(dt: number) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    }

    _updateContent() {

        if (this._gameList) {
            utils.postRecommentShowData(SubLocation.isScrollbar);

            let length: number = Math.floor(this._gameList.length / 4);
            let index = 0;
            for (let i = 0; i < length; i++) {
                let gamePageList = [];
                for (let j = 0; j < 4; j++) {
                    gamePageList.push(this._gameList[index]);
                    index++;
                }
                let gamePageNode = cc.instantiate(this._gamePageNode);
                let gamePage: GamePage = gamePageNode.getComponent("GamePage");
                gamePage.init(gamePageList);
                this._pageView.addPage(gamePageNode);
            }
            this._gamePageNode.destroy();
            this._isContentFilled = true;
            this.autoRefrshPageView();
        }
    }

    autoRefrshPageView() {
        this.unscheduleAllCallbacks();
        let interval = 3.5;
        this.schedule(() => {
            let count = this._pageView.getPages().length;
            let index = this._pageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            if (index == 0) {
                this._pageView.scrollToPage(index, 0);
            } else {
                this._pageView.scrollToPage(index, 2.5);
            }
        }, interval); //10秒一换
    }
}
