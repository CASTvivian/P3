
import CompatibleTool from "./CompatibleTool";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { BannerLocation } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";


const { ccclass, property } = cc._decorator;

@ccclass
export default class YzLoginPanel extends cc.Component {



    ratio: number = 1;

    okBtn: cc.Node = null;

    successFunc: Function = null;

    failFunc: Function = null;
    onLoad() {

        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }

        let panel = cc.find("Panel", this.node);
        this.okBtn = cc.find("OKBtn", panel);

        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;

        } else {
            this.ratio = cc.winSize.width / 1080;
        }
        cc.find("Panel", this.node).scale = this.ratio;

    }


    protected onDestroy(): void {
        cc.game.targetOff(this);
    }

    onOKClickListener() {
        this.okBtn.getComponent(cc.Button).interactable = false;



        let successFunc = () => {
            utils.showLog("登录成功！");
            this.successFunc && this.successFunc();
            this.node.destroy();
        }
        let failFunc = (result: any) => {
            this.failFunc && this.failFunc();
            this.okBtn.getComponent(cc.Button).interactable = true;
            // utils.showMsg("登录失败，请重试");
        }

        cc.game.targetOff(this);
        cc.game.on(YZ_Constant.ST_LOGIN_SUCCESS, successFunc, this);
        cc.game.on(YZ_Constant.ST_LOGIN_FAIL, failFunc, this);

        utils.login(null, null);
    }

    onCloseClickListener() {
        utils.GameExit();
    }




    // update (dt) {}
}









