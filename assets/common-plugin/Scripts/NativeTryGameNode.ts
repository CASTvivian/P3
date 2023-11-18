import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import NativeTryGamesWidget from "./NativeTryGamesWidget";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NativeTryGameNode extends cc.Component {
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
    }

    /**
     * 
     * @param data 交叉推广数据
     * data:[{"date":{
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
                    }
                "tryGameAd":tryGameAd
            }
            ]
     * 
     */
    public init(data: any) {
        this._data = data;

        utils.showLog("原生抖动Node");
        if (this._data) {
            this._jumpInfo = this._data.jump_list;
            this._gameJumpInterval = this._data.jump_refresh_time;
            this._isFirst = true;
            this.node.active = true;
            if (PlatUtils.IsHuaWei) {
                this.node.getChildByName("source").getComponent(cc.Label).string = this._jumpInfo[this._index].date[0].source ? this._jumpInfo[this._index].date[0].source : "";
            }
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
    _nativeAd;
    onEnable() {
        this.jump();
        this.schedule(this.jump, this._gameJumpInterval);
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            if (this.node.opacity == 0) return;
            let tryGameAd = this._jumpInfo[this._index].tryGameAd;
            let adid = this._jumpInfo[this._index].date[0].adId;
            if (tryGameAd) {
                tryGameAd.reportAdClick({
                    adId: adid
                });
                utils.showLog("抖动试玩上报" + "tryGameAd:" + JSON.stringify(tryGameAd) + "adid:" + adid)
            }
            utils.nativeNeedChange = true;
            utils.tryGameDate.splice(this._index, 1)

            if (utils._nativeTryGameNode) {
                utils._nativeTryGameNode.getComponent(NativeTryGamesWidget).init();
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
        if (this._jumpInfo[this._index]) {
            let remoteUrl = PlatUtils.IsOPPO ? this._jumpInfo[this._index].date[0].iconUrlList[0] : this._jumpInfo[this._index].date[0].icon;
            if (!remoteUrl || PlatUtils.IsHuaWei) {
                remoteUrl = this._jumpInfo[this._index].date[0].imgUrlList[0]
            }
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

            let tryGameAd = this._jumpInfo[this._index].tryGameAd;
            let adid = this._jumpInfo[this._index].date[0].adId;
            if (tryGameAd && !tryGameAd.isReportShow) {
                tryGameAd.reportAdShow({
                    adId: adid
                });
                tryGameAd.isReportShow = true;
            }

        } else {
            this._jumping = false;
        }

        this.node.opacity == 0 && (this.node.opacity = 255);
    }
}
