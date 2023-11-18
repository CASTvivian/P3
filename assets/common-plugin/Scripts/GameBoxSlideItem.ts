import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

/**
 * 游戏盒子顶部的幻灯片
 */
@ccclass
export default class GameBoxSlideItem extends cc.Component {

    data: any = null;
    itemSprite: cc.Sprite = null;
    _dataDirty: boolean = false;

    lastPostTime: number = 0; //最后一次上报时间


    onLoad() {
        this.itemSprite = this.node.getComponent(cc.Sprite);
    }
    // start() {
    //     this.initUi();
    //     this.initListener();
    // }

    /**
     * 初始化UI
     */
    protected initUi(): void {

    }


    /**
     * 初始化监听事件
     */
    protected initListener(): void {

    }


    /**
     * 初始化数据
     */
    public initData(data: string): void {
        utils.showLog("#slideData=", data)
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
                        utils.showLog(`跳转失败!  res=${JSON.stringify(res)}`);
                    }
                });
            } else if (this.data.qr_code) {
                if (PlatUtils.IsWechat) {
                    utils.showLog("二维码跳转!", this.data.qr_code);
                    utils.wechatTool.previewImage(this.data.qr_code);
                    // 上报数据
                    // if (this.data && this.data.app_id) {
                    //     this._postData(this.data.app_id);
                    // }
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
        if (this.data && this.data.banner) {
            CompatibleTool.LoadRes(this.data.banner, (err, texture) => {
                utils.showLog(err, "err")
                if (!err && cc.isValid(this) && this.itemSprite) {
                    utils.showLog(this.node.active, "node <<<")
                    this.itemSprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
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

    // update (dt) {}
}
