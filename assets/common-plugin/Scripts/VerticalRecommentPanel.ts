import { utils } from "./Utils";
import RecommendGamesNode from "./RecommendGamesNode";
import { SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import GameItem from "./GameItem";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VerticalRecommentPanel extends cc.Component {

    _recommendNode: cc.Node = null;
    _isInit: boolean = false;
    _gameList: Array<GameItem> = [];
    _data: any = null;

    onLoad() {
        this._recommendNode = cc.find("Panel/RecommendGamesNode", this.node);
        this._recommendNode.active = false;

        for (let i = 0; i < this._recommendNode.childrenCount; i++) {
            let gameItem: GameItem = this._recommendNode.children[i].getComponent("GameItem");
            this._gameList.push(gameItem);
        }
    }

    onEnable() {
        utils.registerServerInitEvent(() => {
            this._initWidget();
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }

    _initWidget() {
        if (this._isInit) return;

        let valid: boolean = true;
        if (utils.isVerticalRecommentPanel()) {
            if (PlatUtils.IsDouyin) {
                if (!utils.Tool_Douyin.isShowMoreGamesModal()) {
                    this.node.destroy();
                }
            }
            this._data = utils.getRecommondGameList();
            if (this.node.parent.getComponentsInChildren(VerticalRecommentPanel).length > 1) {
                var temp = []
                for (var i = this._data.length - 1; i >= 0; i--) {
                    temp.push(this._data[i]);
                }
                this._data = temp;
            }

            if (this._data) {
                if (this._data.length > 0) {
                    this._isInit = true;
                    this._initData();
                    this._recommendNode.active = true;
                    this.schedule(this._initData, 3)
                } else {
                    console.warn("交叉推广数据长度为0");
                    valid = false;
                }
            } else {
                console.warn("交叉推广数据为null!");
                valid = false;
            }
        }

        if (!valid) {
            this.node.destroy();
        }
    }


    _curIndex: number = 0;
    _initData() {
        this._gameList.forEach(gameItem => {
            if (this._curIndex > this._data.length - 1) {
                this._curIndex = 0;
            }
            gameItem.init(this._data[this._curIndex], SubLocation.isVerticalPanel);
            let duration = 0.03;
            if (CompatibleTool.engineVersion >= 220) {
                // let action = cc.repeat(cc.sequence(cc.rotateTo(duration, 85), cc.rotateTo(duration, 90), cc.rotateTo(duration, 95), cc.rotateTo(duration, 90)), 5);
                // gameItem.node.runAction(action);
                //@ts-ignore
                cc.tween(gameItem.node)
                    //@ts-ignore
                    .repeat(5, cc.tween()
                        .to(duration, { angle: 85 })
                        .to(duration, { angle: 90 })
                        .to(duration, { angle: 95 })
                        .to(duration, { angle: 90 })
                    )
                    .start();
            } else {
                let action = cc.repeat(cc.sequence(cc.rotateTo(duration, -85), cc.rotateTo(duration, -90), cc.rotateTo(duration, -95), cc.rotateTo(duration, -90)), 5);
                gameItem.node.runAction(action);
            }
            this._curIndex++;
        });
    }
}
