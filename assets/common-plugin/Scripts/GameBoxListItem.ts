import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import GameItem from "./GameItem";
import GameBoxListGameItem from "./GameBoxListGameItem";

const { ccclass, property } = cc._decorator;


/**
 * 推荐列表节点
 */
@ccclass
export default class GameBoxListItem extends cc.Component {

    data: any = null;

    titleLabel: cc.RichText = null;
    _dataDirty: boolean = false;
    _gameList: cc.Node = null;
    _gameItems: GameBoxListGameItem[] = [];

    onLoad() {
        this.titleLabel = this.node.getChildByName("titleLabel").getComponent(cc.RichText);
        this._gameList = this.node.getChildByName("listLay");
        for (let i = 0; i < this._gameList.childrenCount; i++) {
            this._gameItems.push(this._gameList.children[i].getComponent("GameBoxListGameItem"));
            this._gameList.children[i].active = false;
        }
    }

    public init(data: any) {
        this.data = data;
        this._dataDirty = true;
    }

    update(dt: number) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    }



    updateItem() {
        if (this.data) {
            utils.showLog("boxList: ", this.data);
            if (this.data.title) {
                this.titleLabel.string = "<b>" + this.data.title + "</b>";
            }

            if (this.data.infos && this.data.infos.length > 0) {
                for (let i = 0; i < this.data.infos.length; i++) {
                    if (this._gameItems[i]) {
                        this._gameItems[i].init(this.data.infos[i]);
                        this._gameItems[i].node.active = true;
                    }
                }
            }
        }

    }
}
