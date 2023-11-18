import { utils } from "./Utils";
import QCrossWidgetItem from "./QCrossWidgetItem";
import AldUtils from "./AldUtils";
import { SubLocation } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QCrossWidget6 extends cc.Component {


    _pageView: cc.PageView = null;
    _pageItem: cc.Node = null;
    _pageRecItem: cc.Node = null;
    private _jumpList: any = null;
    private _items: QCrossWidgetItem[] = [];

    onLoad() {

        this._pageView = this.node.getChildByName("PageView").getComponent(cc.PageView);
        this._pageItem = this._pageView.content.getChildByName("Panel");
        this._pageRecItem = this._pageItem.children[0];
        this._pageView.content.removeAllChildren();
        // for (let i = 0; i < 6; i++) {
        //     let item: cc.Node = panel.getChildByName(`Item${i}`);
        //     let qcrossWidgetItem: QCrossWidgetItem = item.getComponent("QCrossWidgetItem");
        //     qcrossWidgetItem._location = "isQCross";

        //     this._items.push(item.getComponent("QCrossWidgetItem"));
        // }

        AldUtils.SendEvent("显示6元素交叉推广组件");
    }

    start() {
        this._jumpList = utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        } else {
            cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
            this.node.destroy();
        }
    }

    private _initWidget() {
        let totalPage: number = Math.ceil(this._jumpList.length / 6);
        // utils.showLog(`qcrosswidget >>> totalPage = ${totalPage}`);
        utils.showLog(`qcrosswidget >>> totalPage = ${totalPage}`);
        let indx: number = 0;
        for (let i = 0; i < totalPage; i++) {
            let page = cc.instantiate(this._pageItem);
            page.removeAllChildren();
            this._pageView.addPage(page);
            for (let j = 0; j < 6; j++) {
                if (!this._jumpList[indx]) break;
                let tempNode = cc.instantiate(this._pageRecItem);
                page.addChild(tempNode);

                let qcrossWidgetItem: QCrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = SubLocation.isQCross;
                let data = this._jumpList[indx];
                tempNode.getComponent("QCrossWidgetItem").init(data);
                indx++;
            }
        }

        this.autoRefrshPageView();
        // for (let i = 0; i < this._jumpList.length; i++) {
        //     let data: any = this._jumpList[i];
        //     if (data && data.logo) {
        //         let itemIdx: number = idx;
        //         if (itemIdx >= this._items.length) {
        //             return;
        //         }
        //         idx++;
        //         this._items[itemIdx].init(data);
        //     }
        // }
    }

    autoRefrshPageView() {
        this.unscheduleAllCallbacks();

        let interval = 3;
        if (utils.ServerConfig && utils.ServerConfig.statement_auto_refresh) {
            interval = utils.ServerConfig.statement_auto_refresh;
        }
        utils.showLog(`结算交叉推广组件${interval}秒自动刷新`);
        this.schedule(() => {
            let count = this._pageView.getPages().length;
            let index = this._pageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            if (index == 0) {
                this._pageView.scrollToPage(index, 0);
            } else {
                this._pageView.scrollToPage(index, 2);
            }
        }, interval);
    }
}
