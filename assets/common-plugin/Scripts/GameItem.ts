import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import { SubLocation } from "./YZ_Constant";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameItem extends cc.Component {

    /*
    {
        "icon": "http://ff.td68x.com/xcx/ylyxhz/451m.png",
        "name": "点亮它的色彩",
        "path": "",
        "qr_code": "",
        "appid": "wx35562d816d9ed9fb"
    }
    */
    data: any = null;

    icon: cc.Sprite = null;
    labelName: cc.Label = null;
    labelShadow: cc.Label = null;

    _dataDirty: boolean = false;
    _redPoint: cc.Node = null;
    public _location: SubLocation = null;
    mask: cc.Node = null;
    _subNameLength: number = 4;

    onLoad() {
        this.mask = this.node.getChildByName("Mask");
        this.icon = this.mask.getChildByName("Icon").getComponent(cc.Sprite);
        this.labelName = this.node.getChildByName("Label").getComponent(cc.Label);
        this.labelShadow = this.node.getChildByName("LabelShadow").getComponent(cc.Label);
        if (this._location && (this._location == SubLocation.isYzBanner || this._location == SubLocation.isScrollbar || this._location == SubLocation.isMoreGame || this._location == SubLocation.isBoxInsertAd || this._location == SubLocation.isBeforGameOverAd)) {
            this._redPoint = this.mask.getChildByName("redpoint");
            if (this.data && this.data.red && this.data.red != "0") {
                if (this.data.red == "1") {
                    this._redPoint.getComponent("YZ_ActionScale").isRunAction = false;
                }
            } else {
                this._redPoint && this._redPoint.destroy();
            }
        }
    }

    public init(data: any, location: SubLocation) {
        this.data = data;
        this._dataDirty = true;
        this._location = location;
        let checkSubString = [SubLocation.isBoxInsertAd, SubLocation.isBeforGameOverAd, SubLocation.isVerticalPanel]
        if (checkSubString.indexOf(this._location) > -1) {
            this._subNameLength = 6;
        } else if (this._location == SubLocation.isMoreGame) {
            this._subNameLength = 8;
        }
    }

    update(dt: number) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.updateItem();
        }
    }

    onEnable() {
        if (!this.data) return;
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {

            if (PlatUtils.IsDouyin) {
                utils.Tool_Douyin.showMoreGamesModal();
                return;
            }
            this._postClickData(this.data.appid);
            if (this.data.is_jump && this.data.is_jump == "true" && this.data.appid) {
                utils.showLog("直接跳转!", this.data.appid);
                utils.navigateToMiniGame(this.data, (ret) => {
                    if (ret) {
                        // 上报数据
                        if (this.data && this.data.appid) {
                            this._postData(this.data.appid);
                        }
                    }
                });
            } else if (this.data.is_jump && this.data.is_jump == "false" && this.data.qr_code) {
                if (PlatUtils.IsWechat) {
                    utils.showLog("二维码跳转!", this.data.qr_code);
                    utils.wechatTool.previewImage(this.data.qr_code);
                    // 上报数据
                    if (this.data && this.data.appid) {
                        this._postData(this.data.appid);
                    }
                } else {
                    utils.showLog("不支持二维码跳转!");
                }
            } else {
                utils.showLog("没有is_jump直接跳转!", this.data.appid);
                if (this.data.appid) {
                    utils.navigateToMiniGame(this.data, (ret) => {
                        if (ret) {
                            // 上报数据
                            if (this.data.appid) {
                                this._postData(this.data.appid);
                            }
                        }
                    });
                }
            }
        }, this);
    }

    onDisable() {
        this.node.targetOff(this);
    }



    updateItem() {
        if (this.data) {
            if (this.data.name) {
                let gameName: string = this.data.name;

                if (this.data.name.length > this._subNameLength) {
                    gameName = gameName.slice(0, this._subNameLength);
                    gameName += "...";
                }
                this.labelName.string = gameName;
                this.labelShadow.string = gameName;
            }

            if (this.data.icon) {
                CompatibleTool.LoadRes(this.data.icon, (err, texture) => {
                    if (!err && cc.isValid(this) && this.icon && this.icon.spriteFrame) {
                        this.icon.spriteFrame = new cc.SpriteFrame(texture);
                    }
                });
            }
        } else {
            this.mask.active = false;
        }

    }

    /**
      * 上报跳转成功
      * @param appid 
      */
    _postData(appid: string) {
        utils.postDataByLocation(appid, this._location, 1);
    }


    /**
     * 上报点击
     * @param appid 
     */
    _postClickData(appid: string) {
        utils.postDataByLocation(appid, this._location, 0);
    }
}
