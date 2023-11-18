import MoreGamesPanel from "./MoreGamesPanel";
import { utils } from "./Utils";
import PlatUtils from "./PlatUtils";
import AldUtils from "./AldUtils";
import CompatibleTool from "./CompatibleTool";
import { SubLocation } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreGamesWidget extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.Prefab)
    prefab1: cc.Prefab = null;


    btnMoreGames: cc.Node = null;
    moreGamesPanel: MoreGamesPanel = null;

    bgTexture: cc.SpriteFrame;
    onLoad() {
        this.btnMoreGames = this.node.getChildByName("Btn_MoreGames");

        this.btnMoreGames.active = false;
        let self = this;
        let back = this.btnMoreGames.getChildByName("Background").getComponent(cc.Sprite);
        let backUrl
        if (utils.ServerConfig) {
            backUrl = utils.ServerConfig.more_game_icon;
        } else {
            cc.warn("没有服务器配置");
        }
        if (backUrl && !this.bgTexture) {
            CompatibleTool.LoadRes(backUrl, (err, texture) => {
                if (!err && cc.isValid(this) && back.node) {
                    let size: cc.Size = back.node.getContentSize();
                    self.bgTexture = new cc.SpriteFrame(texture);
                    back.spriteFrame = self.bgTexture;
                    back.node.setContentSize(size);
                }
            });
        }
    }

    onEnable() {
        utils.registerServerInitEvent(() => {
            this._setBtnVisible();
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }

    _setBtnVisible() {
        let valid: boolean = true;
        if (utils.isShowMoreGamesWidget()) {
            if (PlatUtils.IsQQ) {
                this.btnMoreGames.active = true;
            } else if (PlatUtils.Is4399) {
                this.btnMoreGames.active = true;
            } else if (PlatUtils.IsNativeAndroid && utils.Tool_Native && utils.config.nativeAndroidConfig.channel == "oppo") {
                this.btnMoreGames.active = true;
            } else if (utils.ServerConfig.show_oppo_rec && utils.ServerConfig.show_oppo_rec == "true") {
                this.btnMoreGames.active = true;
            } else {
                let gameList: any = utils.getRecommondGameList();
                if (gameList) {
                    if (gameList.length > 0 || CC_DEBUG) {
                        this.btnMoreGames.active = true;
                    } else {
                        cc.warn("交叉推广数据列表长度为0, 更多游戏按钮不显示!");
                        valid = false;
                    }
                } else {
                    cc.warn("交叉推广数据列表数据为null, 更多游戏按钮不显示!");
                    valid = false;
                }
            }

        } else {
            valid = false;
        }

        if (!valid) {
            this.node.destroy();
        }
    }

    onBtnClickedHandler(event: cc.Event, data: any) {
        if (PlatUtils.IsQQ) {
            utils.adManager.ShowAppBox(true);
            return;
        } else if (PlatUtils.Is4399) {
            utils.Tool_4399.showRecommend();
            return;
        } else if (PlatUtils.IsNativeAndroid && utils.Tool_Native && utils.Tool_Native.moreGameShowType == 1) {
            //如果是原生平台，判断显示的类型
            utils.Tool_Native.showMoreGames();
            utils.postDataByLocation("123", SubLocation.isMoreGame, 0);
        } else if (PlatUtils.IsDouyin) {
            utils.Tool_Douyin.showMoreGamesModal();
        }
        //  else if (PlatUtils.IsOPPO) {
        //     utils.oppoTool.showOppoGamePortal();
        // } 
        else {

            if (utils.ServerConfig.show_oppo_rec && utils.ServerConfig.show_oppo_rec == "true") {
                utils.showLog("服务器配置显示官方互推！");
                utils.oppoTool.showOppoGamePortal();
                return;
            }
            let jumpList: any = utils.getRecommondGameList();
            if (jumpList && jumpList.length > 0) {
                utils.showLog("MoreGamePanel 交叉推广数据:", JSON.stringify(jumpList));
                let panel;
                if (utils.ServerConfig.more_game_skin == 2 || CC_DEBUG) {
                    panel = cc.instantiate(this.prefab1);
                    panel.zIndex = 999999;
                    this.moreGamesPanel = panel.getComponent("MoreGamesPanel1");
                } else {
                    panel = cc.instantiate(this.prefab);
                    panel.zIndex = 999999;
                    this.moreGamesPanel = panel.getComponent("MoreGamesPanel");
                }

                cc.director.getScene().addChild(panel);
                this.moreGamesPanel._location = SubLocation.isMoreGame;
                this.moreGamesPanel.init(jumpList);
                this.moreGamesPanel.show();
                AldUtils.SendEvent("点击更多游戏按钮");

            } else {
                utils.showLog("获取交叉推广数据失败!");
            }
        }

    }

}
