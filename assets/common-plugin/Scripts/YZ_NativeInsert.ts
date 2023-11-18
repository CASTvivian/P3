import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import CompatibleTool from "./CompatibleTool";
import YZ_Constant from "./YZ_Constant";
import { YwAdType, YwAdStatus, AdEventParameter } from "./YouWanSDK/EventAdInfo";
import YouWanAnalytics from "./YouWanSDK/YouWanAnalytics";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_NativeInsert extends cc.Component {

    _panel: cc.Node = null;
    _sourceLable: cc.Label = null;
    _titleLabel: cc.Label = null;
    _desLabel: cc.Label = null;
    _icon: cc.Sprite = null;
    _mask: cc.Node = null;
    _btnLabel: cc.Label = null;
    _closeBtn: cc.Node = null;
    _img: cc.Sprite = null;
    _hideInstallBtn: cc.Node = null;

    _nativeAd: any = null;
    _data: any = null;
    _dataDirty: boolean = false;

    public get ServerConfig() {
        return utils.ServerConfig;
    }
    bgTexture: cc.SpriteFrame;
    btnTexture: cc.SpriteFrame;
    _btnDownLoad: cc.Node = null;
    _defaultCloseSize = 60;
    onLoad() {

        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        cc.game.addPersistRootNode(this.node);


        this._panel = this.node.getChildByName("Panel");
        this._icon = this._panel.getChildByName("Icon").getComponent(cc.Sprite);
        this._img = this._panel.getChildByName("Img").getComponent(cc.Sprite);
        this._titleLabel = this._panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._desLabel = this._panel.getChildByName("DesLabel").getComponent(cc.Label);
        this._mask = this.node.getChildByName("Mask");
        this._sourceLable = this._panel.getChildByName("Img").getChildByName("source").getComponent(cc.Label);
        this._btnDownLoad = this._panel.getChildByName("Btn_Download");
        this._btnLabel = this._btnDownLoad.getComponentInChildren(cc.Label);

        this._hideInstallBtn = this._panel.getChildByName("Btn_HideInstall");
        this._closeBtn = this._hideInstallBtn.getChildByName("Btn_Close");

        let self = this;
        let bg = this._panel.getChildByName("bg").getComponent(cc.Sprite);
        let bgUrl = utils.ServerConfig.native_intersititial_bg_img;
        if (bgUrl && !this.bgTexture) {
            CompatibleTool.LoadRes(bgUrl, (err, texture) => {
                if (!err && cc.isValid(self) && self._panel) {
                    let size: cc.Size = self._panel.getChildByName("bg").getContentSize();
                    self.bgTexture = new cc.SpriteFrame(texture);
                    bg.spriteFrame = self.bgTexture;
                    self._panel.getChildByName("bg").setContentSize(size);
                }
            });
        }
        let back = this._panel.getChildByName("Btn_Install").getChildByName("Background").getComponent(cc.Sprite);
        let backUrl = utils.ServerConfig.native_intersititial_btn_img;
        if (backUrl && !this.btnTexture) {
            CompatibleTool.LoadRes(backUrl, (err, texture) => {
                if (!err && cc.isValid(self) && self._panel) {
                    let size: cc.Size = self._panel.getChildByName("Btn_Install").getContentSize();
                    self.btnTexture = new cc.SpriteFrame(texture);
                    back.spriteFrame = self.btnTexture;
                    self._panel.getChildByName("Btn_Install").setContentSize(size);
                }
            });
        }
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;

            // if (PlatUtils.IsVIVO) {
            //     ratio = cc.winSize.width / 1920 * 0.7 * (1280 / utils.cur_tool.SysInfo.screenWidth);
            // } else {
            // if (!PlatUtils.IsHuaWei) {

            // this._panel.width = cc.winSize.width / 2;
            // this._panel.height = cc.winSize.height * 0.9;
            // this._desLabel.getComponent(cc.Widget).bottom = 200;
            // this._desLabel.getComponent(cc.Widget).updateAlignment();
            // this._panel.getChildByName("Btn_Install").getComponent(cc.Widget).bottom = 50;
            // this._panel.getChildByName("Btn_Install").getComponent(cc.Widget).updateAlignment();


            // this._img.node.getComponent(cc.Widget).top = (this._titleLabel.node.y - this._desLabel.node.y) / 3;
            // this._img.node.getComponent(cc.Widget).bottom = (this._titleLabel.node.y - this._desLabel.node.y) / 2
            // this._img.node.getComponent(cc.Widget).updateAlignment();

            // this._titleLabel.node.getComponent(cc.Widget).top = 70;
            // this._titleLabel.node.getComponent(cc.Widget).updateAlignment();

            // this._closeBtn.getComponent(cc.Widget).top = 65;
            // this._closeBtn.getComponent(cc.Widget).updateAlignment();
            // }else{
            this._panel.scale = ratio;
            // }


        } else {
            this._panel.getComponent(cc.Widget).isAlignBottom = true;
            this._panel.getComponent(cc.Widget).bottom = 378;
            this._panel.getComponent(cc.Widget).updateAlignment();
            ratio = cc.winSize.width / 1080;
            this._panel.scale = ratio;
        }


        /**
                if (PlatUtils.IsHuaWei) {
        
                    let closeBtnRange = this.ServerConfig.intersititia_close_but_range ? this.ServerConfig.intersititia_close_but_range : this._closeBtn.getContentSize().height;
                    let closeBtnSize = this.ServerConfig.intersititia_close_but_size ? this.ServerConfig.intersititia_close_but_size : this._closeBtn.getContentSize().height;
        
                    this._closeBtn.setContentSize(cc.size(closeBtnRange, closeBtnRange));
                    this._closeBtn.getChildByName("Background").setContentSize(cc.size(closeBtnSize, closeBtnSize));
        
                    this._btnDownLoad.active = false;
                    //@ts-ignore
                    // qg.onShow(this._reportAdShow.bind(this));
                }
            */
        if (PlatUtils.IsXiaoMi) {
            this._panel.getChildByName("Xm_Mask").active = true;
        }
        // this._panel.scale = ratio;
    }



    onEnable() {

        if (PlatUtils.IsHuaWei) {
            utils.showLog("注册原生插屏监听事件 >>>>>.");

            cc.game.targetOff(this);
            cc.game.on(cc.game.EVENT_SHOW, () => {
                console.log("HuaWeiOnShow >>>>>>");
                this._reportAdShow();
            }, this);
        }
        if (PlatUtils.IsOPPO || PlatUtils.IsVIVO || PlatUtils.IsHuaWei || PlatUtils.IsXiaoMi) {

            this._panel.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
                this._reportAdClick();
            }, this);


            cc.game.on(YZ_Constant.YZ_NativeAdClick, () => {
                this._reportAdClick();
            }, this);
        }


    }

    onDestroy() {
        if (PlatUtils.IsHuaWei) {
            cc.game.targetOff(this);
            utils.adManager.ShowBanner();
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
            this._mask.active = true;
            this._dataDirty = false;
            this._updateContent();
        }
        if (!this._data) {
            this._panel.active = false;
            this._mask.active = false;
        }
    }



    _updateContent() {

        // this.ServerConfig.intersititia_close_but_range = 10;
        // this.ServerConfig.intersititia_close_but_size = 90;
        if (this._data) {
            // 上报原生插屏广告
            this._reportAdShow();
            utils.nativeInsertShowCount++;

            if (this.ServerConfig.first_interstitial_delayed_level_close) {
                if (utils.nativeInsertShowCount > 3 && this.ServerConfig.interstitial_delayed_level_close) {
                    utils.nativeInsertResizeCloseBtnShowCount++;
                    if (utils.nativeInsertResizeCloseBtnShowCount % this.ServerConfig.interstitial_delayed_level_close == 0) {
                        utils.showLog(`原生插屏关闭按钮设置服务器配置大小${this.ServerConfig.intersititia_close_but_size}`);
                        let closeBtnSize = this.ServerConfig.intersititia_close_but_size ? this.ServerConfig.intersititia_close_but_size : this._defaultCloseSize;
                        this._hideInstallBtn.setContentSize(cc.size(closeBtnSize, closeBtnSize));
                    }
                } else {
                    utils.showLog(`原生插屏关闭按钮,不满足服务器条件，设置为默认大小！`);
                    this._hideInstallBtn.setContentSize(cc.size(this._defaultCloseSize, this._defaultCloseSize));
                }
            } else {
                let closeBtnSize = this.ServerConfig.intersititia_close_but_size ? this.ServerConfig.intersititia_close_but_size : this._defaultCloseSize;
                this._hideInstallBtn.setContentSize(cc.size(closeBtnSize, closeBtnSize));
            }




            this._closeBtn.getChildByName("Background").opacity = CC_DEBUG ? 255 : 0;
            this._hideInstallBtn.opacity = this.ServerConfig.intersititia_close_but_alpha ? this.ServerConfig.intersititia_close_but_alpha : 255;
            let closeBtnRange = this.ServerConfig.intersititia_close_but_range ? this.ServerConfig.intersititia_close_but_range : this._defaultCloseSize;
            this._closeBtn.setContentSize(cc.size(closeBtnRange, closeBtnRange));

            this._titleLabel.string = this._data.title ? this._data.title : "";
            this._desLabel.string = this._data.desc ? this._data.desc : "";
            this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";

            if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                // 有图片，优先显示图片
                this._titleLabel.node.active = true;
                this._icon.node.active = false;
                this._img.node.active = true;
                this._desLabel.node.active = true;

                CompatibleTool.LoadRes(this._data.imgUrlList[0], (err, res) => {
                    utils.showLog("加载图片信息 ...." + err);
                    if (!err && cc.isValid(this) && this._img) {
                        this._img.spriteFrame = new cc.SpriteFrame(res);
                    }
                });

            } else if (PlatUtils.IsOPPO && this._data.iconUrlList && this._data.iconUrlList.length > 0) {
                // 有icon
                this._titleLabel.node.active = true;
                this._icon.node.active = true;
                this._img.node.active = false;
                this._desLabel.node.active = true;

                CompatibleTool.LoadRes(this._data.iconUrlList[0], (err, res) => {
                    if (!err && cc.isValid(this) && this._icon) {
                        this._icon.spriteFrame = new cc.SpriteFrame(res);
                    }
                });
            } else if ((PlatUtils.IsVIVO || PlatUtils.IsHuaWei) && this._data.icon) {
                // 有icon
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

            this._hideInstallBtn.active = false;
            this._closeBtn.active = false;
            // if(this.ServerConfig.intersititia_close_delay_time == 0){
            //     this._closeBtn.active = true;
            //     this._hideInstallBtn.active = true;
            // }else{
            this.scheduleOnce(() => {
                this._closeBtn.active = true;
                this._hideInstallBtn.active = true;
            }, this.ServerConfig.intersititia_close_delay_time || 0);
            // }
            if (PlatUtils.IsHuaWei) {
                this._sourceLable.string = this._data.source ? this._data.source : "";
            }

        }
    }

    onBtnClickHandler(event: cc.Event, data: any) {
        console.log("event.target.name:", event.target.name);
        switch (event.target.name) {
            case "Btn_Close": {
                this._panel.active = false;
                this._mask.active = false;
                break;
            }
            case "Btn_HideInstall":
            case "Img":
            case "Btn_Install":
                this._reportAdClick();
                break;
            case "Btn_Download": {
                if (utils.ServerConfig.native_intersititial_click_range && utils.ServerConfig.native_intersititial_click_range == 2) {
                    utils.showLog("服务器native_intersititial_click_range配置为2，只能点击安装按钮算安装");
                    return;
                }
                this._reportAdClick();
                break;
            }
        }
    }

    _reportAdShow() {
        if (this._data) {
            if (this._nativeAd && this._panel.active) {
                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(this._data.adId));

                utils.showLog("上报原生插屏广告展示! adId:" + this._data.adId + " #active=" + this.node.active);

                this._nativeAd.reportAdShow({
                    adId: this._data.adId
                });
            }
        }
    }

    _reportAdClick() {
        if (this._data) {
            utils.showLog("上报原生插屏广告点击! adId:" + this._data.adId);


            if (this._nativeAd) {

                YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_INTERSITITIAL, YwAdStatus.CLICK, new AdEventParameter(this._data.adId));

                this._nativeAd.reportAdClick({
                    adId: this._data.adId
                });

                // 服务器控制点击后是否关闭插屏广告
                if (this.ServerConfig.intersititial_click_close ? (this.ServerConfig.intersititial_click_close == "true") : true) {
                    this._panel.active = false;
                    this._mask.active = false;
                }

                // 点击后调整关闭按钮大小和触发按钮相同的大小
                this._closeBtn.active = true;
                this._hideInstallBtn.active = true;
                this._closeBtn.setContentSize(cc.size(this.ServerConfig.intersititia_close_but_range, this.ServerConfig.intersititia_close_but_range));
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
