
import CompatibleTool from "./CompatibleTool";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { BannerLocation } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";


const { ccclass, property } = cc._decorator;

@ccclass
export default class YzUserPrivacyPanel extends cc.Component {

    _userPrivacyInfo: cc.Node = null;

    _checkExit: cc.Node = null;

    _mainPanel: cc.Node = null;

    _userPrivacyDesc: cc.Label = null;

    showDesc: boolean = false; //直接显示详情页面

    ratio: number = 1;

    imgCount: number = 7; //图片数量 横屏：5 竖屏：7
    scale: number = 1.5;
    imgPath: string = "http://xcx.youletd.com/xcx/h5/privacyImg/"

    companyInfoNode: cc.Node = null;
    onLoad() {

        if (PlatUtils.IsWechat || PlatUtils.IsQQ || PlatUtils.IsDouyin || PlatUtils.IsBaidu) {
            this.imgPath = "https://xcx.youletd.com/xcx/h5/privacyImg/"
        }
        this._userPrivacyInfo = cc.find("PrivacyDesc", this.node)
        this._checkExit = cc.find("CheckPanel", this.node)

        this._mainPanel = cc.find("Panel", this.node);

        // this._userPrivacyDesc = this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("item").getComponent(cc.Label);

        // if (utils.ServerConfig.user_privacy_info) {
        //     this._userPrivacyDesc.string = utils.ServerConfig.user_privacy_info;
        // }

        if (this.showDesc) {
            this._mainPanel.active = false;
            this._checkExit.active = false;
            // this._userPrivacyInfo.active = true;
            this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").active = false;

            this.showDescPanel();
        }


        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;
            this.imgCount = 5;
            this.imgPath += "h_"
            this.scale = 1.4;
        } else {
            this.ratio = cc.winSize.width / 1080;
            this.imgPath += "p_"
        }

        this._mainPanel.scale = this.ratio;
        this._checkExit.scale = this.ratio;
        this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").scale = this.ratio;
        this._userPrivacyInfo.getChildByName("view").getChildByName("closeImg").scale = this.ratio;
        this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").scale = this.ratio;
        this.companyInfoNode = this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("ContactInfo");


        let subject = "深圳市优智信息技术有限公司";
        let contact = "联系邮箱：youzhixx@163.com";
        if (utils.ServerConfig.company) {
            subject = utils.ServerConfig.company.subject;
            contact = utils.ServerConfig.company.contact;
        }


        this.companyInfoNode.getChildByName("subject").getComponent(cc.Label).string = subject;
        this.companyInfoNode.getChildByName("contact").getComponent(cc.Label).string = contact;



    }


    // onDestroy() {
    //     utils.emitPrivacyCloseEvent();
    // }

    onOKClickListener() {
        YZ_LocalStorage.setItem(YZ_Constant.YZ_GAME_YSXY, "isOK");
        this.node.destroy();
        utils.emitPrivacyCloseEvent();
    }

    onCloseClickListener() {
        if (PlatUtils.IsHuaWei) {
            utils.GameExit();
            return;
        }
        if (this._checkExit.active && (PlatUtils.IsQQ || PlatUtils.IsOPPO || PlatUtils.IsXiaoMi)) {
            utils.GameExit();
            return;
        }
        this._checkExit.active = !this._checkExit.active;
        this._mainPanel.active = !this._mainPanel.active;
    }

    onClosePrivacyDesc() {

        if (this.showDesc) {
            this.node.destroy();
        } else {
            this._userPrivacyInfo.active = false;
            let childs = this._userPrivacyInfo.getComponent(cc.ScrollView).content.children;
            for (let i = 0; i < childs.length; i++) {
                childs[i].active = false;
            }
        }
    }

    is_btn_jump_desc: boolean = false;
    onJumpDescBtnClickListner() {
        this.is_btn_jump_desc = true;
        this.showDescPanel();
    }



    showDescPanel() {
        this._userPrivacyInfo.active = true;
        this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").active = true;

        this.scheduleOnce(() => {
            let p = new cc.Node();
            p.addComponent(cc.Sprite);
            for (let i = 1; i <= this.imgCount; i++) {
                let p = new cc.Node();
                p.addComponent(cc.Sprite);
                this._userPrivacyInfo.getComponent(cc.ScrollView).content.addChild(p);
                // cc.loader.loadRes("img_font/h_" + i, (err, res) => {
                //     if (!err && cc.isValid(this)) {
                //         p.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
                //         console.log(p.width, "===", p.height);
                //         p.height *= this.scale * this.ratio;
                //         p.width *= this.scale * this.ratio;
                //         if (i >= 1) {
                //             this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").active = false;
                //         }
                //     } else {
                //         utils.showLog("yinsi");
                //     }
                // })
                CompatibleTool.LoadRes(this.imgPath + i + ".png", (err, res) => {
                    if (!err && cc.isValid(this)) {
                        p.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
                        p.height *= this.scale * this.ratio;
                        p.width *= this.scale * this.ratio;
                        if (i >= 1) {
                            this._userPrivacyInfo.getChildByName("view").getChildByName("LaodingLabel").active = false;
                        }
                        if (i >= this.imgCount) {
                            this.companyInfoNode.zIndex = this.imgCount;
                            this.companyInfoNode.active = true;

                            if (this.is_btn_jump_desc) {
                                this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").zIndex = this.imgCount + 1;
                                this._userPrivacyInfo.getComponent(cc.ScrollView).content.getChildByName("choiseNode").active = true;
                            }

                        }

                    } else {
                        utils.showMsg("隐私协议加载失败，请关闭窗口重新打开");
                    }
                })
            }
            // let childs = this._userPrivacyInfo.getComponent(cc.ScrollView).content.children;
            // for (let i = 0; i < childs.length; i++) {
            //     childs[i].opacity = 0;
            //     childs[i].active = true;
            //     childs[i].runAction(cc.fadeIn(0.3));
            // }
        }, 0.5);
    }



    // update (dt) {}
}









