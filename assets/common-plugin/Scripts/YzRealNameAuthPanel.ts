import { utils } from "./Utils";
import { BannerLocation } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YzRealNameAuthPanel extends cc.Component {


    edit_real_name: cc.EditBox = null;
    edit_id_card: cc.EditBox = null;
    realNameAuthPanel: cc.Node = null;
    msgNode: cc.Node = null;
    exitPanel: cc.Node = null;
    toVerifyPanel: cc.Node = null;
    offLinePanel: cc.Node = null;
    edit_default_color = null;

    _isOffLine: boolean = false;
    realNameAuthLandscapePanel:cc.Node = null;

    onLoad() {
        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        let ratio = 0;
        if (cc.winSize.height < cc.winSize.width) {
            this.realNameAuthPanel = cc.find("Panel/RealNameAuthLandscapePanel", this.node)
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.75;
        } else {
            this.realNameAuthPanel = cc.find("Panel/RealNameAuthPanel", this.node)
            ratio = cc.winSize.width / 1080;
        }

 
        this.exitPanel = cc.find("Panel/ExitPanel", this.node);
        this.toVerifyPanel = cc.find("Panel/ToVerifyPanel", this.node);
        this.offLinePanel = cc.find("Panel/OfflinePanel", this.node);

        this.edit_id_card = this.realNameAuthPanel.getChildByName("editIdCard").getComponent(cc.EditBox);
        this.edit_real_name = this.realNameAuthPanel.getChildByName("editRealName").getComponent(cc.EditBox);
        this.msgNode = cc.find("Panel/MsgNode", this.node);
        this.edit_default_color = this.edit_real_name.fontColor;
        if (this.edit_default_color == null) {
            this.edit_default_color = new cc.Color(0, 0, 0, 63);
        }
        cc.find("Panel", this.node).scale = ratio;

        if (this._isOffLine) {
            this.showOfferLine();
        } else {
            this.realNameAuthPanel.active = true;
        }
    }

    start() {
        // if (cc.winSize.height < cc.winSize.width) {
            // utils.adManager.HideBanner(BannerLocation.Home);
        // }
    }

    onDestroy() {
        utils.emitRealNameAuthCloseEvent();
    }


    onExitBtnClickListener() {
        utils.showLog("退出游戏！");
        utils.GameExit();
    }


    onBackAuthBtnClickListener() {
        this.toVerifyPanel.active = false;
        this.exitPanel.active = false;
        this.realNameAuthPanel.active = true;
    }


    showExitPanel() {
        this.toVerifyPanel.active = false;
        this.realNameAuthPanel.active = false;
        this.offLinePanel.active = false;
        this.exitPanel.active = true;
    }


    showOfferLine() {
        this.toVerifyPanel.active = false;
        this.exitPanel.active = false;
        this.realNameAuthPanel.active = false;
        this.offLinePanel.active = true;
    }

    regName = /^[\u4e00-\u9fa5]{2,4}$/;
    regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;


    _clickTime: number = 0;

    onPostBtnClickListener() {
        let nowTime = new Date().getTime();
        if ((nowTime - this._clickTime) / 1000 < 2) {
            this.showMsg('请勿频繁提交！');
            return;
        }

        this._clickTime = nowTime;
        if (!this.regName.test(this.edit_real_name.string)) {
            this.showMsg('真实姓名填写有误!');
            this.edit_real_name.fontColor = cc.Color.RED;
            this.edit_real_name.setFocus();
            return false;
        }
        this.edit_real_name.fontColor = this.edit_default_color;
        if (!this.regIdNo.test(this.edit_id_card.string)) {
            this.edit_id_card.fontColor = cc.Color.RED;
            this.showMsg('身份证号填写有误!');
            this.edit_id_card.setFocus();
            return false;
        }
        this.edit_id_card.fontColor = this.edit_default_color;

        utils.realNameAuth(this.edit_id_card.string, this.edit_real_name.string, (res, result) => {
            utils.showLog("实名认证结束：#result=" + JSON.stringify(result));
            if (res) {
                if (result) {
                    let res = JSON.parse(result);
                    switch (res.code) {
                        case 1:
                            this.showMsg(res.msg)
                            break;
                        case 0:
                            if (res.nonage == "0") {
                                utils.setRealNameAuthLocalData("2")
                            } else {
                                utils.setRealNameAuthLocalData("1")
                            }
                            utils._isRealNameAuth = true;
                            if (res.msg) {
                                this.showMsg(res.msg);
                            }
                            this.scheduleOnce(() => {
                                this.node.destroy();
                            }, 0.5);
                            break;
                        case 2:
                            utils.setRealNameAuthLocalData("2")
                            this.showOfferLine();
                            break;
                    }
                } else {
                    this.showMsg("请求失败，请重新提交验证！")
                }
            } else {
                this.showMsg("请求失败，请重新提交验证！")
            }
        })


    }

    showMsg(str: string) {
        let msgNode = cc.instantiate(this.msgNode);
        msgNode.getChildByName("msgLabel").getComponent(cc.Label).string = `${str}`;
        this.node.addChild(msgNode, cc.macro.MAX_ZINDEX);
        msgNode.active = true;
        msgNode.runAction(cc.sequence(cc.delayTime(0.8), cc.moveBy(0.3, cc.v2(0, +80)), cc.callFunc(() => {
            msgNode.destroy();
        })))
    }



}
