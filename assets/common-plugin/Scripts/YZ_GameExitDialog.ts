import { utils } from "./Utils";
import QCrossWidgetItem from "./QCrossWidgetItem";
import { SubLocation } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_GameExitDialog extends cc.Component {

    private _jumpList: any = null;
    private _items: QCrossWidgetItem[] = [];


    _pageView: cc.PageView = null;
    _pageItem: cc.Node = null;
    _pageRecItem: cc.Node = null;
    _btnCanel: cc.Node = null;
    _btnOk: cc.Node = null;
    _panel: cc.Node = null;
    public nativeData: any = null;
    _nativeIsShow: boolean = false;



    onLoad() {
        this._panel = this.node.getChildByName("Panel");
        this._pageView = this._panel.getChildByName("PageView").getComponent(cc.PageView);
        this._pageItem = this._pageView.content.getChildByName("Panel");
        this._pageRecItem = this._pageItem.children[0];
        this._pageView.content.removeAllChildren();

        this._btnCanel = this._panel.getChildByName("btnCancel");
        this._btnOk = this._panel.getChildByName("btnOk");

        if (utils.otherConfig && utils.otherConfig.group) {
            this.node.group = utils.otherConfig.group;
        }
        let ratio: number = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
        } else {
            ratio = cc.winSize.width / 1080;
        }

        this._panel.scale = ratio;

    }

    start() {
        this._jumpList = utils.getRecommondGameList();
        if (this._jumpList && this._jumpList.length > 0) {
            this._initWidget();
        }

    }

    hideLastNode() {
        for (let i = 5; i > 2; i--) {
            this._items[i].node.active = false;
        }
    }

    onBtnCanelHandler(event: cc.Event, data: any) {
        utils.showLog("点击取消按钮！");
        this.node.destroy();
    }

    onBtnOkHandler(event: cc.Event, data: any) {
        utils.showLog("点击确定按钮！");
        utils.Tool_Native.GameExit();
    }

    private _initWidget() {

        
        utils.postRecommentShowData(SubLocation.isGameExitDialog);


        let totalPage: number = Math.floor(this._jumpList.length / 6);
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
                qcrossWidgetItem._location = SubLocation.isStatement;
                let data = this._jumpList[indx];
                tempNode.getComponent("QCrossWidgetItem").init(data);
                indx++;
            }
        }

        this.autoRefrshPageView();
        // let idx: number = 0;
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
        // utils.showLog(">>>>>>> autoRefrshPageView");

        let interval = 3;
        if (utils.ServerConfig && utils.ServerConfig.statement_auto_refresh) {
            interval = utils.ServerConfig.statement_auto_refresh;
        }

        utils.showLog(`退出弹窗组件${interval}秒自动刷新`);
        this.schedule(() => {
            let count = this._pageView.getPages().length;
            let index = this._pageView.getCurrentPageIndex();
            index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
            if (index == 0) {
                this._pageView.scrollToPage(index, 0);
            } else {
                this._pageView.scrollToPage(index, 2);
            }
        }, interval); //10秒一换
    }
}
