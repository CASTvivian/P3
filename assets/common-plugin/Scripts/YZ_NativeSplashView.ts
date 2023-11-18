import CompatibleTool from "./CompatibleTool";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_NativeSplashView extends cc.Component {

    _panel: cc.Node = null;
    _sourceLable: cc.Label = null;
    _titleLabel: cc.Label = null;
    _desLabel: cc.Label = null;
    _icon: cc.Sprite = null;
    // _mask: cc.Node = null;
    _btnLabel: cc.Label = null;
    _img: cc.Sprite = null;
    _timeLabel: cc.Label = null;

    _nativeAd: any = null;
    _data: any = null;
    _dataDirty: boolean = false;

    public get ServerConfig() {
        return utils.ServerConfig;
    }
    bgTexture: cc.SpriteFrame;
    btnTexture: cc.SpriteFrame;
    _btnDownLoad: cc.Node = null;
    ratio: number = 1;

    canSkip: boolean = true; //直接跳过
    onLoad() {

        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }

        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;
            this._panel = this.node.getChildByName("LandscapePanel");

        } else {
            this.ratio = cc.winSize.width / 1080;
            this._panel = this.node.getChildByName("PortraitPanel");
        }
        this._panel.active = true;
        // cc.game.addPersistRootNode(this.node);
        let canSkip = utils.getConfigByKey("native_splash_can_skip");
        if (canSkip == "false") {
            this.canSkip = false;
        }

        // this._panel = this.node.getChildByName("Panel");
        this._panel.scale = this.ratio;
        this._icon = this._panel.getChildByName("Icon").getComponent(cc.Sprite);
        this._img = this._panel.getChildByName("Img").getComponent(cc.Sprite);
        this._titleLabel = this._panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._desLabel = this._panel.getChildByName("DesLabel").getComponent(cc.Label);
        // this._mask = this.node.getChildByName("Mask");

        this._sourceLable = this._img.node.getChildByName("source").getComponent(cc.Label);

        this._btnDownLoad = this._panel.getChildByName("Btn_Download");
        this._btnLabel = this._btnDownLoad.getComponentInChildren(cc.Label);
        this._timeLabel = this._panel.getChildByName("time").children[0].getComponent(cc.Label);

        if (PlatUtils.IsHuaWei) {

            //@ts-ignore
            qg.onShow(this._reportAdShow.bind(this));
        }
        if (utils.getConfigByKey("native_splash_full_cilck") == "true") {
            this._btnDownLoad.active = true;
        }
        // this._panel.scale = ratio;

    }

    onDestroy() {
        if (PlatUtils.IsHuaWei) {
            //@ts-ignore
            qg.offShow(this._reportAdShow)
            this._nativeAd.destroy();
            cc.director.emit("SplashViewOff");
        }
    }

    init(nativeAd: any, data: any) {
        this._nativeAd = nativeAd;
        this._data = data;
        this._dataDirty = true;
    }

    update(dt: number) {
        if (this._data && this._dataDirty) {
            this._panel.active = true;
            // this._mask.active = true;
            this._dataDirty = false;
            this._updateContent();
        }
        if (!this._data) {
            this._panel.active = false;
            // this._mask.active = false;
        }
    }



    _updateContent() {
        if (this._data) {
            // 上报原生插屏广告
            this._reportAdShow();

            if (PlatUtils.IsHuaWei) {
                this._data.icon = "";
            }


            // utils.nativeInsertShowCount++;
            utils.showLog("data:", JSON.stringify(this._data));

            this._titleLabel.string = this._data.title ? this._data.title : "";
            this._desLabel.string = this._data.desc ? this._data.desc : "";
            this._panel.getChildByName("Btn_Install").getComponentInChildren(cc.Label).string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
            // this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
            // utils.showLog("this._btnLabel.string" + this._btnLabel.string);
            if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                // 有图片，优先显示图片
                this._titleLabel.node.active = true;
                this._icon.node.active = false;
                this._img.node.active = true;
                this._desLabel.node.active = true;

                let t: number = 5;
                let task = setInterval(() => {
                    t--;
                    if (t == 0) {
                        this._timeLabel.string = `跳过`;
                    } else if (t == -1) {
                        clearInterval(task);
                        this.node.destroy();
                    } else {
                        this._timeLabel.string = `点击跳过${t}s`;
                    }
                }, 1000)

                utils.showLog("有图片，优先显示图片");

                CompatibleTool.LoadRes(this._data.imgUrlList[0], (err, res) => {
                    utils.showLog("加载图片信息 ...." + err);
                    if (!err && cc.isValid(this) && this._img) {
                        this._img.spriteFrame = new cc.SpriteFrame(res);
                    }
                });

            } else if (PlatUtils.IsHuaWei && this._data.icon) {
                // 有icon
                utils.showLog("没有图片，显示icon");
                this._titleLabel.node.active = true;
                this._icon.node.active = true;
                this._img.node.active = false;
                this._desLabel.node.active = true;

                CompatibleTool.LoadRes(this._data.icon, (err, res) => {
                    if (!err && cc.isValid(this) && this._icon) {
                        this._icon.spriteFrame = new cc.SpriteFrame(res);
                    }
                });
            }
            else {
                utils.showLog("什么都没有!!!")
            }

            if (PlatUtils.IsHuaWei) {
                this._sourceLable.string = this._data.source ? this._data.source : "";
            }
        }
    }

    onBtnClickHandler(event: cc.Event, data: any) {
        switch (event.target.name) {
            case "time":
                if (this.canSkip) {
                    this.node.destroy();
                } else {
                    if (this._timeLabel.string == "跳过") {
                        this.node.destroy();
                    }
                }

                // this._panel.active = false;
                // this._mask.active = false;
                break;
            case "Btn_Close": {
                this.node.destroy();
                // this._panel.active = false;
                // this._mask.active = false;
                break;
            }
            case "Img":
            case "Icon":
            case "Btn_Install":
                this._reportAdClick();
                break;
            case "Btn_Download": {
                this._reportAdClick();
                break;
            }
        }
    }

    _reportAdShow() {
        if (this._data) {
            if (this._nativeAd && this._panel.active) {
                utils.showLog("上报原生插屏广告展示! adId:" + this._data.adId + " #active=" + this.node.active);

                this._nativeAd.reportAdShow({
                    adId: this._data.adId
                });
            }
        }
    }

    _reportAdClick() {
        if (this._data) {
            utils.showLog("上报原生开屏广告点击! adId:" + this._data.adId);
            if (this._nativeAd) {
                this._nativeAd.reportAdClick({
                    adId: this._data.adId
                });

                this._panel.active = false;
                // this._mask.active = false;


                if (PlatUtils.IsOPPO) {
                    utils.oppoTool.countNativeInserClick();
                } else if (PlatUtils.IsVIVO) {
                    utils.Tool_Vivo.countNativeInserClick();
                }

                if (PlatUtils.IsHuaWei) {
                    this.node.destroy();

                    this.downLoadAd();
                }

            }

        }
    }


    downLoadAd() {
        return;
        const resultCode = this._nativeAd.startDownload({
            adId: this._data.adId
        })
        utils.showLog('原生广告主动下载 resumeDownloadresultCode = ' + resultCode);
    }
}
