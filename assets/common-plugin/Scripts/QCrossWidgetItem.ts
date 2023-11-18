import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import { SubLocation } from "./YZ_Constant";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QCrossWidgetItem extends cc.Component {

    /*
    {
        "name": "翻滚的香肠大冒险",
        "appid": "wx2c4ed4218224b042",
        "icon": "https://xcx.youletd.com/img/icon/fgdxc.png",
       "logo": "https://xcx.youletd.com/img/logo/4.png",
        "is_jump": "true",
        "path": "",
        "qr_code": "https://xcx.youletd.com/img/qrcode/q_fgdxc.jpg"
    }
    */
    data: any = null;

    private _sprite: cc.Sprite = null;
    private _dataDirty: boolean = false;
    public _isReward: boolean = false;

    public _location: SubLocation = null;

    onLoad() {
        this._sprite = this.node.getComponent(cc.Sprite);
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

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onItemClickHandler, this);
    }

    onDisable() {
        this.node.targetOff(this);
    }

    private _onItemClickHandler() {
        console.log("_onItemClickHandler");

        if (PlatUtils.IsDouyin) {
            utils.Tool_Douyin.showMoreGamesModal();
            return;
        }

        if (this.data && this.data.appid) {
            this._postClickData(this.data.appid);
        }
        //如果是激励模式就直接跳转
        if (this._location == SubLocation.isReward) {
            utils.navigateToMiniGame(this.data, (ret) => {
                if (ret) {
                    // 上报数据
                    if (this.data && this.data.appid) {
                        this._postData(this.data.appid);
                    }
                    utils.showLog("激励插屏跳转成功！下发奖励！");
                    utils.adManager.videoCallBack && utils.adManager.videoCallBack(ret);
                    utils.adManager.videoCallBack = null;

                } else {
                    utils.showLog("激励插屏跳转失败！");
                    utils.adManager.videoCallBack && utils.adManager.videoCallBack(false, "获取试玩奖励失败！");
                }
                utils.adManager.videoCallBack = null;
                utils.adManager.hideRewardInsert();
            });
            return;
        }

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
                // // 上报数据
                // if (this.data && this.data.appid) {
                //     this._postData(this.data.appid);
                // }
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
    }

    updateItem() {

        if (this.data && this.data.logo) {
            let temp = cc.loader.getRes(this.data.logo);
            if (temp) {
                if (cc.isValid(this) && this._sprite) {
                    let size: cc.Size = this.node.getContentSize();
                    this._sprite.spriteFrame = new cc.SpriteFrame(temp);
                    this.node.setContentSize(size);
                }
            } else {
                CompatibleTool.LoadRes(this.data.logo, (err, texture) => {
                    if (!err && cc.isValid(this) && this._sprite) {
                        let size: cc.Size = this.node.getContentSize();
                        this._sprite.spriteFrame = new cc.SpriteFrame(texture);
                        this.node.setContentSize(size);
                    }
                });
            }

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
