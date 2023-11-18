import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_NativeAdObject from "./YZ_NativeAdObject";
import YZ_Constant, { BannerLocation } from "./YZ_Constant";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_NativeItem extends cc.Component {

    private _nativeAdTiltle: cc.Label = null;
    private _nativeAdIcon: cc.Sprite = null;
    private _nativeAdDesc: cc.Label = null;
    private _nativeAdImg: cc.Sprite = null;
    private _closeBtn: cc.Node = null;
    private _downBtn: cc.Node = null;

    private _noImageView: cc.Node = null;

    _nativeAd: YZ_NativeAdObject = null;
    isShow: boolean = false;
    showType: number = 1;

    params?: any = null;

    content: cc.Node = null;


    onLoad() {
        this.content = this.node.children[0];
        this._noImageView = this.content.getChildByName("NoImageView");
        this._nativeAdTiltle = this._noImageView.getChildByName("title").getComponent(cc.Label);
        this._nativeAdIcon = this._noImageView.getChildByName("icon").getComponent(cc.Sprite);
        this._nativeAdDesc = this._noImageView.getChildByName("desc").getComponent(cc.Label);
        this._nativeAdImg = this.content.getChildByName("image").getComponent(cc.Sprite);
        // this._downBtn = this.content.getChildByName("Btn_Download");
        this._closeBtn = this.content.getChildByName("closeBtn");


        if (this.params) {
            if (this.params.parent) {
                this.node.width = this.node.parent.width;
                this.node.height = this.node.parent.height;
            }
        } else {
            if (utils.ServerConfig.st_native_ad_height) {
                this.node.height = utils.ServerConfig.st_native_ad_height;
            }
        }
        this.content.active = false;
        cc.game.on(YZ_Constant.YZ_NativeAdClick, () => {
            this.reportAdClick();
        }, this);
        // this._closeBtn.active = utils.ServerConfig.st_banner_close_but_show ? (utils.ServerConfig.st_banner_close_but_show == "true") : false;
        // this._downBtn.active = utils.ServerConfig.show_statement_nativeAd_closeBtn ? (utils.ServerConfig.show_statement_nativeAd_closeBtn == "true") : false;
    }

    onDisable() {
        cc.game.targetOff(this);
        this.node.destroy();
    }

    update() {
        if (this._nativeAd && !this.isShow) {
            this.isShow = true;
            this.showNativeAd();
        }
    }


    init(nativeObj: YZ_NativeAdObject) {
        utils.showLog("初始化单个原生广告>>>");
        this._nativeAd = nativeObj;
    }

    showNativeAd() {

        if (utils.ServerConfig.st_native_ad_is_hide_banner && utils.ServerConfig.st_native_ad_is_hide_banner == "true") {
            utils.showLog("服务器配置显示结算原生广告后隐藏banner >>>");
            utils.adManager.HideBanner(BannerLocation.Game);
        }

        if (utils.ServerConfig.st_native_ad_show_rec_banner && utils.ServerConfig.st_native_ad_show_rec_banner == "true") {
            utils.showRecBanner();
        }

        let nativeData = this._nativeAd.data;


        let title = nativeData.title;
        let desc = nativeData.desc;
        if (title.length > 6) {
            title = title.slice(0, 6);
            title += "...";
        }
        if (desc.length > 18) {
            desc = desc.slice(0, 17);
            desc += "...";
        }

        this._nativeAdTiltle.string = title;
        this._nativeAdDesc.string = desc;

        if (nativeData.imgUrlList && nativeData.imgUrlList.length > 0) {
            // 有图片，优先显示图片
            // this._titleLabel.node.active = true;
            // this._icon.node.active = false;
            // this._img.node.active = true;
            // this._desLabel.node.active = true;
            this._noImageView.active = false;
            this._nativeAdImg.node.active = true;

            CompatibleTool.LoadRes(nativeData.imgUrlList[0], (err, res) => {
                if (!err && cc.isValid(this) && this._nativeAdImg) {
                    this._nativeAdImg.spriteFrame = new cc.SpriteFrame(res);
                    this._nativeAdImg.node.active = true;
                    this.content.active = true;
                }
            });

        } else if (PlatUtils.IsOPPO && nativeData.iconUrlList && nativeData.iconUrlList.length > 0) {
            // 有icon

            this._nativeAdImg.node.active = false;
            this._noImageView.active = true;
            CompatibleTool.LoadRes(nativeData.iconUrlList[0], (err, res) => {
                if (!err && cc.isValid(this) && this._nativeAdIcon) {
                    this._nativeAdIcon.spriteFrame = new cc.SpriteFrame(res);
                    this.content.active = true;
                }
            });
        } else if (PlatUtils.IsVIVO && nativeData.icon) {
            // 有icon

            this._nativeAdImg.node.active = false;
            this._noImageView.active = true;


            CompatibleTool.LoadRes(nativeData.icon, (err, res) => {
                if (!err && cc.isValid(this) && this._nativeAdIcon) {
                    this._nativeAdIcon.spriteFrame = new cc.SpriteFrame(res);
                    this.content.active = true;
                }
            });
        }
        this.node.active = true;
        this.reportAdShow();
        if (this.params) {
            this.params.callBack && this.params.callBack();
        }
    }


    // onEnable() {
    //     // if (PlatUtils.IsOPPO || PlatUtils.IsVIVO) {
    //     //     if (!this._closeBtn.active) {
    //     //         this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
    //     //             this._reportAdClick();
    //     //         }, this);
    //     //     }
    //     // }
    // }

    // onDisable() {
    //     if (PlatUtils.IsOPPO || PlatUtils.IsVIVO) {
    //         this.node.targetOff(this);
    //     }
    // }

    onBtnClickHandler(event: cc.Event, data: any) {
        switch (event.target.name) {
            case "closeBtn": {
                this.node.active = false;
                break;
            }
            case "Btn_Download": {
                this.reportAdClick();
                break;
            }
        }
    }



    reportAdShow() {

        utils.showLog("reportAdShow");
        if (this._nativeAd) {
            this._nativeAd.reportAdShow();
        }
    }

    reportAdClick() {
        if (this._nativeAd) {
            this._nativeAd.reportAdClick();
        } else {
            utils.showLog("广告加载失败！");
        }
    }
}
