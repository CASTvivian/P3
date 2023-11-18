import { utils } from "./Utils";
import { SubLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TryGameNode extends cc.Component {
    _data: any = null;
    _icon: cc.Sprite = null;
    _nameLabel: cc.Label = null;
    _gameJumpInterval: number = -1;
    _jumpInfo: any = null;
    _index: number = -1;
    _jumping: boolean = false; // 控制是否在跳转
    _isFirst: boolean = false;
    _mask: cc.Node = null;

    onLoad() {
        this._icon = cc.find("Mask/Icon", this.node).getComponent(cc.Sprite);
        this._mask = cc.find("Mask", this.node);

        // this._nameLabel = cc.find("NameLabel", this.node).getComponent(cc.Label);
        // this._nameLabel.string = "";
    }

    /**
     * 
     * @param data 交叉推广数据
     * data:{
	   "jump_list": [
           {                                                        // 交叉推广挂件内容信息
		    "icon": "http://xcx.youletd.com/img/icon/fgdxc.png",
		    "name": "翻滚的香肠大冒险",
		    "path": "",
		    "js_jump": "true",
		    "qr_code": "http://xcx.youletd.com/img/qrcode/q_fgdxc.jpg",
		    "appid": "wx2c4ed4218224b042"
            }
        ]
     * }
     * 
     */
    public init(data: any) {
        this._data = data;
        if (this._data) {
            this._jumpInfo = this._data.jump_list;
            this._gameJumpInterval = this._data.jump_refresh_time;
            this._isFirst = true;
            this.node.active = false;
        } else {
            this.node.active = false;
        }
    }

    /**
     * 跳转成功过后显示下一个
     */
    showNextItem() {
        this.unscheduleAllCallbacks();
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
    }

    onEnable() {
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            if (this._jumpInfo[this._index] && this._jumpInfo[this._index].appid) {
                utils.showLog(`小游戏跳转! info=${this._jumpInfo[this._index]}`);
                if (PlatUtils.IsDouyin) {
                    utils.Tool_Douyin.showMoreGamesModal();
                } else if (PlatUtils.IsQQ) {
                    utils.adManager.ShowAppBox(true);
                } else {
                    let index: number = this._index;
                    this._postClickData(this._jumpInfo[index].appid);
                    utils.navigateToMiniGame(this._jumpInfo[index], (ret) => {
                        if (ret) {
                            // 上报数据
                            if (this._jumpInfo && this._jumpInfo[index] && this._jumpInfo[index].appid) {
                                this._postData(this._jumpInfo[index].appid);
                            }
                        }
                    });
                }
                this.showNextItem();

            }
        }, this);
    }

    onDisable() {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
    }

    jump() {
        if (this._jumping) return;

        this._jumping = true;

        this._index = this._index + 1;
        if (this._index >= this._jumpInfo.length) {
            this._index = 0;
        }
        let contentSize = this._icon.node.getContentSize();
        if (this._jumpInfo[this._index] && this._jumpInfo[this._index].icon) {
            // this._setName(this._jumpInfo[this._index].name);
            let remoteUrl = this._jumpInfo[this._index].icon;
            CompatibleTool.LoadRes(remoteUrl, (err, texture) => {
                if (!err && cc.isValid(this) && this._icon) {
                    this._icon.spriteFrame = new cc.SpriteFrame(texture);
                    this._icon.node.setContentSize(contentSize);
                    if (this._isFirst) {
                        utils.showLog("当前试玩第一次加载！！！！！");
                        this._mask.active = true;
                        this._isFirst = false;
                    }
                }
                this._jumping = false;
            });
        } else {
            this._jumping = false;
        }
    }

    _setName(name: string) {
        if (!name) {
            this._nameLabel.string = "";
        } else {
            if (name.length > 5) {
                this._nameLabel.string = name.slice(0, 5) + "...";
                this._nameLabel.node.scale = 0.7;
            } else {
                this._nameLabel.string = name;
            }
        }
    }

    // _postData(appid: string) {
    //     utils.postData(appid);
    // }

    /**
     * 上报跳转成功
     * @param appid 
     */
    _postData(appid: string) {
        utils.postDataByLocation(appid, SubLocation.isTryGame, 1);
    }


    /**
     * 上报点击
     * @param appid 
     */
    _postClickData(appid: string) {
        utils.postDataByLocation(appid, SubLocation.isTryGame, 0);
    }

}
