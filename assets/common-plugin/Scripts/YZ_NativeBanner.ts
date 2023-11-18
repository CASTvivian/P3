import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { BannerLocation } from "./YZ_Constant";
import { NativeBannerInfo } from "./CommonConfig";
import CompatibleTool from "./CompatibleTool";
import { YwAdType, YwAdStatus, AdEventParameter } from "./YouWanSDK/EventAdInfo";
import YouWanAnalytics from "./YouWanSDK/YouWanAnalytics";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_NativeBanner extends cc.Component {

    _panel: cc.Node = null;
    _icon: cc.Sprite = null;
    _hW_icon: cc.Sprite = null;

    _sourceLable: cc.Label = null
    _titleLabel: cc.Label = null;
    _desLabel: cc.Label = null;
    _btnLabel: cc.Label = null;
    _widget: cc.Widget = null;
    _closeBtn: cc.Node = null;
    _nativeAd: any = null;
    _data: any = null;
    _dataDirty: boolean = false;
    _panel_widget: cc.Widget = null;
    _closeBtn_widget: cc.Widget = null;
    _mask_widget: cc.Widget = null;

    _st_Panel: cc.Node = null;
    _st_Icon: cc.Sprite = null;
    _st_TitleLabel: cc.Label = null;
    _st_DesLabel: cc.Label = null;
    _st_BtnLabel: cc.Label = null;
    _st_Widget: cc.Widget = null;
    _st_Img: cc.Sprite = null;
    _st_CloseBtn: cc.Node = null;
    _st_BtnDown: cc.Node = null;
    _st_adMask: cc.Node = null;
    _st_down_btn_default_img: cc.SpriteFrame = null;
    nativeBannerInfo: NativeBannerInfo = null;
    _st_TitleLabel_Widget: cc.Widget = null;
    _st_DesLabel_Widget: cc.Widget = null;
    _st_Img_Widget: cc.Widget = null;
    _st_CloseBtn_Widget: cc.Widget = null;
    _st_BtnDown_Widget: cc.Widget = null;
    _st_adMask_Widget: cc.Widget = null;
    _st_Icon_widget: cc.Widget = null;
    _bg_mask: cc.Node = null;
    _alignType: string = "";
    _xmMask: cc.Node = null;

    public get ServerConfig() {
        return utils.ServerConfig;
    }


    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        cc.game.addPersistRootNode(this.node);

        this._panel = this.node.getChildByName("Panel");
        this._icon = this._panel.getChildByName("Icon").getComponent(cc.Sprite);
        this._hW_icon = this._panel.getChildByName("HuaweiIcon").getComponent(cc.Sprite);
        this._titleLabel = this._panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._desLabel = this._panel.getChildByName("DesLabel").getComponent(cc.Label);
        this._sourceLable = this._panel.getChildByName("source").getComponent(cc.Label);

        let btnDown = this._panel.getChildByName("Btn_Download");
        this._btnLabel = btnDown.getComponentInChildren(cc.Label);
        this._widget = this.getComponent(cc.Widget);
        this._panel_widget = this._panel.getComponent(cc.Widget);

        this._closeBtn = this._panel.getChildByName("Btn_Close");
        this._closeBtn_widget = this._closeBtn.getComponent(cc.Widget);
        this._mask_widget = this._panel.getChildByName("Mask").getComponent(cc.Widget);
        this._widget.left = 0;
        this._widget.right = 0;
        this._widget.bottom = 0;


        this._st_Panel = this.node.getChildByName("Panel_Statement");
        this._st_Widget = this._st_Panel.getComponent(cc.Widget);

        this._bg_mask = this.node.getChildByName("bgMask")



        this._st_Icon = this._st_Panel.getChildByName("IconMask").getChildByName("Icon").getComponent(cc.Sprite);
        this._st_TitleLabel = this._st_Panel.getChildByName("TitleLabel").getComponent(cc.Label);
        this._st_DesLabel = this._st_Panel.getChildByName("DesLabel").getComponent(cc.Label);
        this._st_BtnDown = this._st_Panel.getChildByName("Btn_Download");
        // this._st_BtnLabel = stBtnDown.getComponentInChildren(cc.Label);
        this._st_Img = this._st_Panel.getChildByName("adImage").getComponent(cc.Sprite)
        this._st_CloseBtn = this._st_Panel.getChildByName("Btn_Close");
        this._st_adMask = this._st_Panel.getChildByName("Mask");
        this._st_down_btn_default_img = this._st_BtnDown.getComponent(cc.Sprite).spriteFrame;

        this._st_TitleLabel_Widget = this._st_TitleLabel.getComponent(cc.Widget);
        this._st_DesLabel_Widget = this._st_DesLabel.getComponent(cc.Widget);
        this._st_Img_Widget = this._st_Img.getComponent(cc.Widget);
        this._st_CloseBtn_Widget = this._st_CloseBtn.getComponent(cc.Widget);
        this._st_BtnDown_Widget = this._st_BtnDown.getComponent(cc.Widget);
        this._st_adMask_Widget = this._st_adMask.getComponent(cc.Widget);
        this._st_Icon_widget = this._st_Panel.getChildByName("IconMask").getComponent(cc.Widget);


        if (PlatUtils.IsXiaoMi || CC_DEBUG) {
            this._panel.getChildByName("Xm_Mark").active = true;
            this._mask_widget.node.active = false;
        }

        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this._widget.left = cc.winSize.width * 0.25;
            this._widget.right = cc.winSize.width * 0.25;
            this._titleLabel.node.width = 400;
            ratio = cc.winSize.width / 1920;
        } else {
            ratio = cc.winSize.width / 1080;
        }
        this.node.scale = ratio;

    }

    onShow() {
        cc.game.emit("HuaWeiOnShow");
    }

    onEnable() {
        this._st_Panel.targetOff(this);
        this._panel.targetOff(this);
        cc.game.targetOff(this);


        if (PlatUtils.IsHuaWei) {
            console.log("注册监听事件 >>>>>.");
            cc.game.on(cc.game.EVENT_SHOW, () => {
                console.log("HuaWeiOnShow >>>>>>");
                this._reportAdShow();
            }, this);
        }


        if (PlatUtils.IsOPPO || PlatUtils.IsVIVO || PlatUtils.IsHuaWei || PlatUtils.IsXiaoMi) {

            this._st_Panel.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
                this._reportAdClick();
            }, this);

            this._panel.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
                this._reportAdClick();
            }, this);


            cc.game.on(YZ_Constant.YZ_NativeAdClick, () => {
                this._reportAdClick();
            }, this);
        }


    }


    onDisable() {
        if (PlatUtils.IsOPPO || PlatUtils.IsVIVO || PlatUtils.IsHuaWei || PlatUtils.IsXiaoMi) {
            this._st_Panel.targetOff(this);
            this._panel.targetOff(this);
        }
        cc.game.targetOff(this);
    }

    init(nativeAd: any, data: any, nativeBannerInfo: NativeBannerInfo) {
        this._nativeAd = nativeAd;
        this._data = data;
        this._dataDirty = true;
        this.nativeBannerInfo = nativeBannerInfo;


        // this.nativeBannerInfo.banner_show_height = 500;
        // this.nativeBannerInfo.st_banner_style = 1;
        // this.nativeBannerInfo.st_banner_down_but_show = 2;
        // this.nativeBannerInfo.show_st_banner = "true";
        // this.nativeBannerInfo.st_banner_width = 800;
        // this.nativeBannerInfo.st_banner_height = 300;

        if (this.nativeBannerInfo.show_st_banner == "true") {
            if (this.nativeBannerInfo.st_banner_style > -1) {
                if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                    this._panel.active = false;
                    this._st_Panel.active = true;
                } else {
                    this._panel.active = false;
                    this._st_Panel.active = false;
                }
            } else {
                this._panel.active = false;
                this._st_Panel.active = true;
            }

        } else {
            this._panel.active = true;
            this._st_Panel.active = false;
        }


        // if(this.nativeBannerInfo._alignType === "top")
        // {
        // this._widget.top = 0;
        // this._widget.isAlignTop = true;
        // this._widget.isAlignBottom = false;

        // this._widget.updateAlignment();

        // }
        // utils.showLog("当前显示位置为:", this.nativeBannerInfo.location, ">>显示参数为：", this.nativeBannerInfo.toStrong());

    }

    update(dt: number) {
        if (this._data && this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
        if (!this._data) {
            this._st_Panel.active = false;
            this._panel.active = false;
        }
    }



    _updateContent() {
        if (this._data) {
            // 上报展示

            this._reportAdShow();
           
            if (PlatUtils.IsHuaWei) {
                this._data.icon = "";
            }
            utils.nativeBannerShowCount++;
            if (this.nativeBannerInfo.show_st_banner == "true" && this.nativeBannerInfo.st_banner_style > -1) {
                if (this.nativeBannerInfo.st_banner_style == 1 || this.nativeBannerInfo.st_banner_style == 2) {
                    if (this.nativeBannerInfo.st_banner_width > -1) {
                        this._st_Panel.width = this.nativeBannerInfo.st_banner_width;
                    } else {
                        this._st_Panel.width = 821.4;
                    }
                    if (this.nativeBannerInfo.st_banner_height > -1) {
                        this._st_Panel.height = this.nativeBannerInfo.st_banner_height;
                    } else {
                        this._st_Panel.height = 589;
                    }
                    this._st_Widget.updateAlignment();
                    this._st_adMask_Widget.updateAlignment();
                    this._st_CloseBtn_Widget.updateAlignment();
                    this._st_BtnDown_Widget.updateAlignment();
                    this._st_Icon_widget.updateAlignment();
                } else {
                    this._st_Panel.width = 821.4;
                    this._st_Panel.height = 589;
                    this._st_Widget.updateAlignment();
                    this._st_adMask_Widget.updateAlignment();
                    this._st_CloseBtn_Widget.updateAlignment()
                    this._st_BtnDown_Widget.updateAlignment();
                    this._st_Icon_widget.updateAlignment();
                }

                if (this.nativeBannerInfo.st_banner_style == 0 || this.nativeBannerInfo.st_banner_style == 1) {
                    utils.showLog("//单图片样式，拉伸图片，并且隐藏标题和描述");
                    this._st_Img_Widget.top = 0;
                    this._st_Img_Widget.bottom = 0;
                    this._st_Img_Widget.isAlignTop = true;
                    this._st_Img_Widget.isAlignBottom = true;
                    this._st_Img_Widget.updateAlignment();
                    this._st_DesLabel.node.active = false;
                    this._st_TitleLabel.node.active = false;
                    this._st_Icon_widget.updateAlignment();
                } else if (this.nativeBannerInfo.st_banner_style == 2) {
                    utils.showLog("默认样式自定义宽高:展示标题和描述");
                    this._st_DesLabel.node.active = true;
                    this._st_TitleLabel.node.active = true;
                    this._st_DesLabel_Widget.updateAlignment();
                    this._st_TitleLabel_Widget.updateAlignment();
                    this._st_Img_Widget.isAlignTop = true;
                    this._st_Img_Widget.isAlignBottom = true;
                    this._st_Img_Widget.top = this._st_TitleLabel.node.height + this._st_TitleLabel_Widget.top;
                    this._st_Img_Widget.bottom = this._st_DesLabel_Widget.node.height + this._st_DesLabel_Widget.bottom;
                    this._st_Img_Widget.updateAlignment();
                    this._st_Icon_widget.updateAlignment();
                } else {
                    this._st_Img_Widget.isAlignTop = true;
                    this._st_Img_Widget.isAlignBottom = true;
                    this._st_Img_Widget.updateAlignment();
                    this._st_DesLabel.node.active = true;
                    this._st_TitleLabel.node.active = true;
                    this._st_Icon_widget.updateAlignment();
                }

            } else if (this.nativeBannerInfo.show_st_banner == "true") {
                utils.showLog("结算banner使用默认样式！");
                this._st_Panel.width = 821.4;
                this._st_Panel.height = 589;
                this._st_Img_Widget.isAlignTop = false;
                this._st_Img_Widget.isAlignBottom = false;
                this._st_Img_Widget.updateAlignment();
                this._st_DesLabel.node.active = true;
                this._st_TitleLabel.node.active = true;
                this._st_Widget.updateAlignment();
                this._st_adMask_Widget.updateAlignment();
                this._st_CloseBtn_Widget.updateAlignment()
                this._st_BtnDown_Widget.updateAlignment();
                this._st_Icon_widget.updateAlignment();
            }
            this._st_CloseBtn.scale = this.nativeBannerInfo.st_banner_scale < 1 ? this._st_CloseBtn.scale * this.nativeBannerInfo.st_banner_scale : 1;
            this._st_adMask.scale = this.nativeBannerInfo.st_banner_scale < 1 ? this._st_adMask.scale * this.nativeBannerInfo.st_banner_scale : 1;
            this._st_CloseBtn.active = this.nativeBannerInfo.st_banner_close_but_show == "true";
            this._st_CloseBtn.opacity = this.nativeBannerInfo.st_banner_close_but_alpha;

            if (this.ServerConfig.first_native_banner_delayed_count_close) {
                if (utils.nativeBannerShowCount > 3 && this.ServerConfig.first_native_banner_delayed_count_close) {
                    utils.nativeBannerResizeCloseBtnShowCount++;
                    if (utils.nativeBannerResizeCloseBtnShowCount % this.ServerConfig.native_banner_delayed_count_close == 0) {
                        utils.showLog(`原生banner关闭按钮设置服务器配置大小${this.ServerConfig.intersititia_close_but_size}`);
                        if (this.nativeBannerInfo.st_banner_close_but_range) {
                            this._st_CloseBtn.setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_range, this.nativeBannerInfo.st_banner_close_but_range));
                            this._st_CloseBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_size, this.nativeBannerInfo.st_banner_close_but_size));
                        }
                    }
                }
            } else {
                if (this.nativeBannerInfo.st_banner_close_but_range) {
                    this._st_CloseBtn.setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_range, this.nativeBannerInfo.st_banner_close_but_range));
                    this._st_CloseBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.st_banner_close_but_size, this.nativeBannerInfo.st_banner_close_but_size));
                }
            }



            if (this.nativeBannerInfo.st_banner_down_but_show) {

                this._st_BtnDown.active = true;
                if (this.nativeBannerInfo.st_banner_down_btn_image) {
                    utils.showLog("this.nativeBannerInfo.st_banner_down_btn_image", this.nativeBannerInfo.st_banner_down_btn_image);
                    CompatibleTool.LoadRes(this.nativeBannerInfo.st_banner_down_btn_image, (err, res) => {
                        if (!err && cc.isValid(this) && this._st_BtnDown) {
                            this._st_BtnDown.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
                            if (this.nativeBannerInfo.st_banner_down_but_margin_top) {
                                this._st_BtnDown_Widget.top = - (this._st_BtnDown.getContentSize().height + this.nativeBannerInfo.st_banner_down_but_margin_top);
                                this._st_BtnDown_Widget.updateAlignment();
                            } else {
                                this._st_BtnDown_Widget.top = - this._st_BtnDown.getContentSize().height;
                                this._st_BtnDown_Widget.updateAlignment();
                            }
                        }
                    });
                } else {
                    this._st_BtnDown.getComponent(cc.Sprite).spriteFrame = this._st_down_btn_default_img;
                    if (this.nativeBannerInfo.st_banner_down_but_margin_top) {
                        this._st_BtnDown_Widget.top -= this.nativeBannerInfo.st_banner_down_but_margin_top;
                        this._st_BtnDown_Widget.updateAlignment();
                    }
                }
                if (this.nativeBannerInfo.st_banner_down_but_show == 2) {
                    this._st_BtnDown.runAction(cc.sequence(cc.scaleTo(0.3, 1.2), cc.scaleTo(0.3, 1)).repeatForever());
                } else {
                    this._st_BtnDown.stopAllActions();
                }
                this._st_BtnDown.scale = this.node.scale;
            } else {
                this._st_BtnDown.active = false;
                this._st_BtnDown.stopAllActions();
            }
            this._closeBtn.active = this.nativeBannerInfo.banner_close_but_show == "true";

            this._closeBtn.opacity = this.nativeBannerInfo.banner_close_but_alpha;



            if (this.ServerConfig.first_native_banner_delayed_count_close) {
                if (utils.nativeBannerShowCount > 3 && this.ServerConfig.first_native_banner_delayed_count_close) {
                    if (utils.nativeBannerResizeCloseBtnShowCount % this.ServerConfig.native_banner_delayed_count_close == 0) {
                        utils.showLog(`原生banner关闭按钮设置服务器配置大小${this.ServerConfig.intersititia_close_but_size}`);
                        this._closeBtn.setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_range, this.nativeBannerInfo.banner_close_but_range));
                        this._closeBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_size, this.nativeBannerInfo.banner_close_but_size));
                    }
                }
            } else {
                this._closeBtn.setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_range, this.nativeBannerInfo.banner_close_but_range));
                this._closeBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_size, this.nativeBannerInfo.banner_close_but_size));
            }

            if (this.nativeBannerInfo.show_st_banner == "false") {

                // this.node.setContentSize(cc.size(this.node.getContentSize().width,));
                this._panel_widget.isAlignTop = false;
                this._panel_widget.bottom = 0;
                this._panel.setContentSize(cc.size(this.node.getContentSize().width, this.nativeBannerInfo.banner_show_height < 160 ? 160 : this.nativeBannerInfo.banner_show_height));
                this._panel_widget.updateAlignment();
                this._closeBtn_widget.updateAlignment();
                this._mask_widget.updateAlignment();
            } else {
                //缩放
                this._st_Panel.scale = this.nativeBannerInfo.st_banner_scale ? this.nativeBannerInfo.st_banner_scale : 1;
                this._st_Widget.bottom = this.nativeBannerInfo.st_banner_bottom ? this.nativeBannerInfo.st_banner_bottom : 0;
                this._st_Widget.updateAlignment();
            }
            if (this.nativeBannerInfo._alignType === "top") {
                if (this.nativeBannerInfo.show_st_banner == "true") {
                    this.node.height = this._st_Panel.height;
                    this.node.width = this._st_Panel.width;
                    this._st_CloseBtn_Widget.updateAlignment();
                    this._st_adMask_Widget.updateAlignment();
                } else {
                    this.node.height = this.nativeBannerInfo.banner_show_height < 160 ? 160 : this.nativeBannerInfo.banner_show_height;
                    this._panel_widget.updateAlignment();
                    this._closeBtn_widget.updateAlignment();
                    this._mask_widget.updateAlignment();
                }
                this._widget.isAlignTop = true;
                // this._widget.top = 0;
                this._widget.isAlignBottom = false;
                this._widget.updateAlignment();
            }



            if (this.nativeBannerInfo.show_st_banner == "true") {
                utils.showLog("服务器配置显示为结算banner >>>>>");
                if (this.nativeBannerInfo.st_banner_bg_mask_opacity > 0) {
                    this._bg_mask.opacity = this.nativeBannerInfo.st_banner_bg_mask_opacity;
                    this._bg_mask.setContentSize(cc.size(this.node.getContentSize().width, this._st_Panel.height));
                    this._st_adMask.active = false;
                } else {
                    this._bg_mask.active = false;
                }
                // 居底部距离
                this._st_TitleLabel.string = this._data.title ? this._data.title : "";
                this._st_DesLabel.string = this._data.desc ? this._data.desc : "";
                // this._data.imgUrlList = null;
                // this._st_BtnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
                if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                    // 有图片，优先显示图片
                    this._st_Icon.node.active = false;
                    this._st_Img.node.active = true;
                    CompatibleTool.LoadRes(this._data.imgUrlList[0], (err, res) => {
                        if (!err && cc.isValid(this) && this._st_Img) {
                            this._st_Img.spriteFrame = new cc.SpriteFrame(res);
                        }
                    });
                } else if (PlatUtils.IsOPPO && this._data.iconUrlList && this._data.iconUrlList.length > 0) {
                    // 有icon
                    this._st_Icon.node.active = true;
                    this._st_Img.node.active = false;

                    if (this.nativeBannerInfo.st_banner_style == 0 || this.nativeBannerInfo.st_banner_style == 1) {
                        utils.showLog("单图片样式-没有大图，显示默认原生样式banner");
                        this._titleLabel.string = this._data.title;
                        this._desLabel.string = this._data.desc;
                        this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
                        let iconUrl = PlatUtils.IsOPPO ? this._data.iconUrlList[0] : this._data.icon;
                        CompatibleTool.LoadRes(iconUrl, (err, res) => {
                            if (!err && cc.isValid(this) && this._icon) {
                                this._icon.spriteFrame = new cc.SpriteFrame(res);
                            }
                        });
                        this._st_Panel.active = false;
                        this._panel.active = true;
                    } else {
                        CompatibleTool.LoadRes(this._data.iconUrlList[0], (err, res) => {
                            if (!err && cc.isValid(this) && this._st_Icon) {
                                this._st_Icon.spriteFrame = new cc.SpriteFrame(res);
                            }
                        });
                    }

                } else if ((PlatUtils.IsVIVO || PlatUtils.IsHuaWei) && this._data.icon) {
                    // 有icon
                    this._st_Icon.node.active = true;
                    this._st_Img.node.active = false;
                    CompatibleTool.LoadRes(this._data.icon, (err, res) => {
                        if (!err && cc.isValid(this) && this._st_Icon) {
                            this._st_Icon.spriteFrame = new cc.SpriteFrame(res);
                        }
                    });
                }
            } else {

                this._titleLabel.string = this._data.title ? this._data.title : "";
                this._desLabel.string = this._data.desc ? this._data.desc : "";
                this._btnLabel.string = this._data.clickBtnTxt ? this._data.clickBtnTxt : "查看详情";
                if (PlatUtils.IsHuaWei) {
                    this._sourceLable.string = this._data.source ? this._data.source : "";
                    this._panel.getChildByName("Hw_Mark").active = true;
                    this._mask_widget.node.active = false;
                }

                let iconUrl = "";
                if (PlatUtils.IsOPPO) {
                    iconUrl = this._data.iconUrlList[0];
                } else {
                    iconUrl = this._data.icon;
                }

                if (iconUrl) {
                    CompatibleTool.LoadRes(iconUrl, (err, res) => {
                        if (!err && cc.isValid(this) && this._icon) {
                            this._icon.spriteFrame = new cc.SpriteFrame(res);
                        }
                    });
                } else {
                    if (this._data.imgUrlList && this._data.imgUrlList.length > 0) {
                        CompatibleTool.LoadRes(this._data.imgUrlList[0], (err, res) => {
                            if (!err && cc.isValid(this) && this._icon) {
                                if (PlatUtils.IsHuaWei) {
                                    this._icon.node.active = false;
                                    this._hW_icon.node.active = true;
                                    this._hW_icon.spriteFrame = new cc.SpriteFrame(res);
                                } else {
                                    this._icon.spriteFrame = new cc.SpriteFrame(res);
                                }
                            }
                        });
                    }
                }

            }


            // this.nativeBannerInfo.banner_close_but_range = 20;
            // this.nativeBannerInfo.banner_close_but_size = 50;
            if (PlatUtils.IsHuaWei) {
                this._closeBtn.setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_range, this.nativeBannerInfo.banner_close_but_range));
                this._closeBtn.getChildByName("Background").setContentSize(cc.size(this.nativeBannerInfo.banner_close_but_size, this.nativeBannerInfo.banner_close_but_size));
            }


            // this.nativeBannerInfo.st_banner_down_but_margin_top = -500;
            if (this.nativeBannerInfo.st_banner_down_but_margin_top != 0) {
                this._st_BtnDown_Widget.top = this.nativeBannerInfo.st_banner_down_but_margin_top;
                this._st_BtnDown_Widget.updateAlignment();
            }

            if (this.nativeBannerInfo.st_banner_down_but_show > 0) {
                this._st_BtnDown.active = true;
                if (this.nativeBannerInfo.st_banner_down_but_show === 2) {
                    this._st_BtnDown.runAction(cc.sequence(cc.scaleTo(0.3, 1.3), cc.scaleTo(0.3, 1)).repeatForever());
                } else {
                    this._st_BtnDown.stopAllActions();
                }
            } else {
                this._st_BtnDown.active = false;
                this._st_BtnDown.stopAllActions();
            }
        }
    }



    onBtnClickHandler(event: cc.Event, data: any) {
        switch (event.target.name) {
            case "Btn_Close": {
                this.node.active = false;
                if (PlatUtils.IsOPPO) {
                    utils.oppoTool.countBannerCloseCount();
                }
                utils._bannerCloseTime = new Date().getTime();
                break;
            }
            case "Btn_Download":
            case "bgMask": {
                this._reportAdClick();
                break;
            }
        }
    }

    _reportAdShow() {
        if (this._data) {

            if (this._nativeAd) {
                if (!this._data.isReportShow || PlatUtils.IsHuaWei) {
                    YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.SHOW_SUCCESS, new AdEventParameter(this._data.adId));

                    this._data.isReportShow = true;
                    utils.showLog("上报原生广告条展示！adId:" + this._data.adId);
                    this._nativeAd.reportAdShow({
                        adId: this._data.adId
                    });
                    utils.SendEvent("上报原生Banner广告展示,位置:" + this.nativeBannerInfo.location);
                } else {
                    utils.showLog("当前广告已经过上报展示！adId:" + this._data.adId, "，当前不做上报");
                }
            }
        }
    }

    _reportAdClick() {
        if (this._data) {
            utils.showLog("上报原生广告条点击! adId:" + this._data.adId);
            if (this._nativeAd) {
                if (!this._data.isReportClick || PlatUtils.IsHuaWei) {
                    YouWanAnalytics.EventAdWithObj(YwAdType.NATIVE_BANNER, YwAdStatus.CLICK, new AdEventParameter(this._data.adId));

                    this._data.isReportClick = true;
                    this._nativeAd.reportAdClick({
                        adId: this._data.adId,
                        isAutoDownload: true
                    });
                    if (PlatUtils.IsHuaWei) {
                        this.downLoadAd();
                    }
                }
                this._data = null;
                if (this.nativeBannerInfo.banner_click_refresh == "true" && !PlatUtils.IsHuaWei) {

                    utils.showLog("点击之后-先隐藏广告-再刷新广告条！");
                    utils.adManager.HideBanner(this.nativeBannerInfo.location);
                    // 刷新banner
                    utils.adManager.ShowBanner(this.nativeBannerInfo.location, { isRefresh: true });
                } else {
                    cc.game.targetOff(this);
                    this.node.active = false;
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
