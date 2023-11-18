import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameBoxListGameItem extends cc.Component {

    /*
    {
    "id": 274,
    "icon": "http://ff.td68x.com/xcx/ylyxhz/44r4.png",
    "app_path": "pages/index/index?ald_media_id=5778&ald_link_key=21c462bc56b283b3",
    "name": "快乐游戏盒子",
    "qr_code": "http://ff.td68x.com/xcx/ylyxhz/44xp.png",
    "home_type": 4,
    "home_name": "休闲精选",
    "app_id": ""

    */
    data: any = null;

    icon: cc.Sprite = null;
    labelName: cc.Label = null;
    labelShadow: cc.Label = null;

    _dataDirty: boolean = false;
    lastPostTime: number = 0; //最后一次上报时间

    onLoad() {
        let mask = this.node.getChildByName("Mask");
        this.icon = mask.getChildByName("Icon").getComponent(cc.Sprite);
        this.labelName = this.node.getChildByName("Label").getComponent(cc.Label);
        this.labelShadow = this.node.getChildByName("LabelShadow").getComponent(cc.Label);
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
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            this._postData(this.data.app_id);
            if (this.data.app_id && utils.wechatTool.checkAppId(this.data.app_id)) {

                utils.showLog("直接跳转!", this.data.app_id);
                //@ts-ignore
                wx.navigateToMiniProgram({
                    appId: this.data.app_id,
                    path: this.data.app_path ? this.data.app_path : "",
                    success(res) {
                    },
                    fail(res) {
                        // utils.showLog("跳转失败！", id);
                        utils.showLog(`跳转失败! ; res=${JSON.stringify(res)}`);
                    }
                });
            } else if (this.data.qr_code) {
                if (PlatUtils.IsWechat) {
                    utils.showLog("二维码跳转!", this.data.qr_code);
                    utils.wechatTool.previewImage(this.data.qr_code);
                } else {
                    utils.showLog("不支持二维码跳转!");
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
                if (this.data.name.length > 4) {
                    gameName = gameName.slice(0, 4);
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
        }

    }

    _postData(appid: string) {
        // let curTime: number = new Date().getTime();
        // let interval: number = (curTime - this.lastPostTime) / 1000;
        // if (interval >= 3) {
        let url: string = `https://apps.youlesp.com/gbs?m=rclickV2&app_id=${appid}&game_id=${utils.config.wechatconfig.appID}`;
        utils.showLog("上报数据, url=", url);
        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                // this.lastPostTime = curTime;
                utils.showLog("数据上报成功！");
            } else {
                utils.showLog("数据上报失败！");
            }
        });
        // } else {
        //     cc.warn("上报的间隔时间小于3秒");
        // }

    }

}
