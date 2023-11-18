import GameItem from "./GameItem";
import { SubLocation } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePage extends cc.Component {

    _gameList: any = null;
    _gameItemNodes: cc.Node[] = [];
    _isContentFilled: boolean = false;

    _dataDirty: boolean = false;

    public init(data: any) {
        this._gameList = data;
        this._dataDirty = true;
    }

    onLoad() {
        this._gameItemNodes = this.node.children;
        for (let i = 0; i < this._gameItemNodes.length; i++) {
            this._gameItemNodes[i].active = false;
        }
    }

    update(dt: number) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    }

    _updateContent() {
        if (this._gameList && this._gameList.length > 0 && this._gameList.length <= 5) {
            this._isContentFilled = true;

            let itemData = null;
            for (let i = 0; i < this._gameList.length; i++) {
                itemData = this._gameList[i];
                let newGameItemNode: cc.Node = this._gameItemNodes[i];
                let gameItem: GameItem = newGameItemNode.getComponent("GameItem");
                gameItem.init(itemData, SubLocation.isScrollbar);
                newGameItemNode.active = true;
            }
        }
    }
}
