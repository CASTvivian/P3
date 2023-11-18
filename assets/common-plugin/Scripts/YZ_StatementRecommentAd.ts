import { utils } from "./Utils";
import QCrossWidgetItem from "./QCrossWidgetItem";
import AldUtils from "./AldUtils";
import PlatUtils from "./PlatUtils";
import YZ_NativeItem from "./YZ_NativeItem";
import { SubLocation, BannerLocation } from "./YZ_Constant";
import List from "./List";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_StatementRecommentAd extends cc.Component {

    private _jumpList: any = null;
    private _items: QCrossWidgetItem[] = [];

    listView: List = null;

    _pageItem: cc.Node = null;
    _pageRecItem: cc.Node = null;
    _recListNode: cc.Node = null;

    public nativeData: any = null;
    private _nativeAd: cc.Node = null;
    public showNativeAd: boolean = true; //是否显示原生广告
    public yzItem: YZ_NativeItem = null;
    _nativeIsShow: boolean = false;


    onLoad() {
        this._recListNode = this.node.getChildByName("RecList");
        this.listView = this._recListNode.getChildByName("ScrollView").getComponent(List);
        this._nativeAd = this.node.getChildByName("nativeAd");
        AldUtils.SendEvent("显示结算推荐组件");
    }

    start() {

        if (this.showNativeAd) {
            this._recListNode.active = false;
            this.yzItem = this._nativeAd.getComponent("YZ_NativeItem");
            this.yzItem.showType = 1;
            utils.adManager.createNativeAd(null,this.yzItem);
            utils.showLog("交叉推广调用原生广告《《《《《《《");
        } else {
            this._recListNode.active = true;

            this._jumpList = utils.getRecommondGameList();

            if (this._jumpList && this._jumpList.length > 0) {
                this._initWidget();
                this.listView.numItems = this._jumpList.length;
            } else {
                cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
                this.node.destroy();
            }
        }

    }

    hideLastNode() {
        for (let i = 5; i > 2; i--) {
            this._items[i].node.active = false;
        }
    }

    update(dt) {
        if (this.yzItem && this.yzItem.content && this.yzItem.content.active && !this._nativeIsShow) {
            this._nativeIsShow = false;
            this._recListNode.active = false;

        }
        if (this.autoScorll && !this.listView.scrollView.isScrolling()) {
            this.listView.content.y += dt * 150;
            this.listView._onScrolling();
        }
    }

    onListRender(item: cc.Node, idx: number) {
        let qcrossWidgetItem: QCrossWidgetItem = item.getComponent("QCrossWidgetItem");
        qcrossWidgetItem._location = SubLocation.isStatement;
        qcrossWidgetItem.getComponent("QCrossWidgetItem").init(this._jumpList[idx]);
    }

    autoScorll: boolean = false;
    private _initWidget() {

        if (utils.ServerConfig.st_recomment_is_hide_banner && utils.ServerConfig.st_recomment_is_hide_banner == "true") {
            utils.showLog("服务器配置显示结算互推后隐藏banner >>>");
            utils.adManager.HideBanner(BannerLocation.Game);
            utils.adManager.HideBanner(BannerLocation.Over);
        }

        this.scheduleOnce(() => {
            this.autoScorll = true;
        }, 1);
        utils.postRecommentShowData(SubLocation.isStatement);
    }


}
