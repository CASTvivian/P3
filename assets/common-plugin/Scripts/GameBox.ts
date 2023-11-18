import GameBoxSlideItem from "./GameBoxSlideItem";
import { utils } from "./Utils";
import GameBoxListItem from "./GameBoxListItem";

const { ccclass, property } = cc._decorator;


/**
 * 游戏盒子
 */
@ccclass
export default class GameBox extends cc.Component {

    // onLoad () {}
    @property({ type: cc.PageView, tooltip: "顶部滚动视图" })
    slidePageView: cc.PageView = null;

    @property({ type: cc.Node, tooltip: "推荐列表" })
    listContent: cc.Node = null;

    @property({ type: cc.Node, tooltip: "顶部的幻灯片节点" })
    topSlideNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "推荐列表节点" })
    recommentNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "推荐列表Banner节点" })
    recommentBanner: cc.Node = null;


    _boxInfo: any = null;
    _dataDirty: boolean = false;
    _slideList: GameBoxSlideItem[] = null;
    _appIdList: string[] = [];

    onLoad() {
        this.initListener();
    }

    onEnable() {
        this.postData();
        utils.registerServerInitEvent(() => {
            this._setNodeVisible();
        }, this);
    }

    onDisable() {
        utils.unregisterServerInitEvent(this);
    }

    _setNodeVisible() {
        this.initData();

        if (this._boxInfo) {
            this.initUi();
        } else {
            this.node.destroy();
        }
    }

    /**
     * 初始化UI
     */
    protected initUi(): void {
        this.slidePageView.removeAllPages();
        this.listContent.removeAllChildren();
        utils.showLog("gamebox initUi")
        if (!this._boxInfo) return;
        let slideData: any = this._boxInfo.banners;
        let listData: any = this._boxInfo.infos
        for (let i = 0; i < slideData.length; i++) {
            let slideNode: cc.Node = cc.instantiate(this.topSlideNode);
            let slideItem: GameBoxSlideItem = slideNode.getComponent("GameBoxSlideItem");
            slideNode.active = true;
            slideItem.initData(slideData[i]);
            this.slidePageView.addPage(slideNode);
        }

        for (let i = 0; i < listData.length; i++) {
            let listNode: cc.Node = cc.instantiate(this.recommentNode);
            let listItem: GameBoxListItem = listNode.getComponent("GameBoxListItem");
            let data = listData[i];
            listItem.init(data)
            this.listContent.addChild(listNode);
            if (data.banner) {
                let banner: cc.Node = cc.instantiate(this.recommentBanner);
                let slideItem: GameBoxSlideItem = banner.getComponent("GameBoxSlideItem");
                banner.active = true;

                slideItem.initData(data.banner);
                this.listContent.addChild(banner);
            }
        }

        this.startAutoChange();
    }

    /**
     * 开启轮播
     */
    startAutoChange() {
        this.schedule(() => {
            let count = this.slidePageView.getPages().length;
            let index = this.slidePageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            this.slidePageView.scrollToPage(index, 2);
        }, 3); //3秒一换
    }


    /**
     * 初始化监听事件
     */
    newPage: cc.Node = null;
    protected initListener(): void {
        // var _pool = new cc.NodePool();
        // this.slidePageView.node.on('scroll-began', () => {
        //     if (this.slidePageView.getCurrentPageIndex() == this.slidePageView.content.childrenCount - 1) {
        //         if (!this.newPage) {
        //             this.newPage = cc.instantiate(this.slidePageView.getPages()[0]);
        //         }
        //         this.slidePageView.addPage(this.newPage);

        //     }
        // });

        // this.slidePageView.node.on('scroll-ended', () => {
        //     if (this.slidePageView.getPages().length == 4) {
        //         _pool.put(this.slidePageView.content.children[1]);
        //         this.newPage = _pool.get();
        //         this.slidePageView.getPages().splice(1, 1);
        //     }
        // })
    }


    /**
     * 初始化数据
     * @param {boxInfo} 游戏盒子的json数据
     */
    public initData(): void {
        utils.showLog("gamebox initData")

        this._boxInfo = utils._wechatTool.gameBoxServerConfig;
        if (this._boxInfo) {
            utils.showLog("Gamebox 游戏盒子数据:", JSON.stringify(this._boxInfo));
        } else {
            utils.showLog("Gamebox 游戏盒子数据获取失败!", this._boxInfo);
        }
    }

    postData() {
        let url: string = `https://apps.youlesp.com/gbs?m=rclickV2&app_id=100000000001&game_id=${utils.config.wechatconfig.appID}`;
        utils.showLog("上报数据, url=", url);
        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                utils.showLog("数据上报成功！");
            } else {
                utils.showLog("数据上报失败！");
            }
        });
    }




    update(dt) {
        if (this._dataDirty) {
            this._dataDirty = false;
            this.node.active = true;
        }
    }
}
