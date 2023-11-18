import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LogOutView extends cc.Component {

    scrollView: cc.ScrollView = null;

    content: cc.Node = null;

    logLabel: cc.Node = null;

    logArray: Array<string> = [];

    clearBtn: cc.Node = null;

    showLogViewBtn: cc.Node = null;

    hideLogViewBtn: cc.Node = null;


    onLoad() {
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
        this.node.scale = ratio;
    }

    start() {
        this.initUi();
        this.initListener();
        this.initData();
        this.schedule(() => {
            this.showLog();
        }, 0);
    }

    /**
     * 初始化UI
     */
    protected initUi(): void {

        this.scrollView = this.node.getChildByName("ScrollView").getComponent(cc.ScrollView);
        this.showLogViewBtn = this.node.getChildByName("BtnShowLogView");
        this.hideLogViewBtn = this.node.getChildByName("BtnHideLogView");
        this.clearBtn = this.node.getChildByName("BtnClearLog");

        this.content = this.scrollView.content;
        this.logLabel = this.content.children[0];
        this.content.removeAllChildren();
    }


    /**
     * 添加LOG输出
     * @param logContent log
     */
    public addLog(logContent: any, ...optionalParams: any[]): void {
        let str = "";
        str += logContent;
        optionalParams.forEach(element => {
            str += "," + element;
        });
        this.logArray.push(str);
    }


    public showLog() {
        if (this.logArray.length > 0) {
            let tempAry = this.logArray;
            this.logArray = [];
            tempAry.forEach(log => {
                let tempLogLabel = cc.instantiate(this.logLabel);
                tempLogLabel.getComponent(cc.Label).string = `日志输出：${log}`;
                this.content.addChild(tempLogLabel);
            });
        }
    }

    /**
     * 初始化监听事件
     */
    protected initListener(): void {

    }


    /**
     * 初始化数据
     */
    protected initData(): void {

    }

    /**
     * 显示日志框
     */
    onShowLogView() {
        this.scrollView.node.active = true;
        this.clearBtn.active = true;
        this.showLogViewBtn.active = false;
        this.hideLogViewBtn.active = true;
    }

    /**
     * 隐藏日志框
     */
    onHideLogView() {
        this.scrollView.node.active = false;
        this.clearBtn.active = false;
        this.showLogViewBtn.active = true;
        this.hideLogViewBtn.active = false;

    }

    /**
     * 清空日志
     */
    clearLogView() {
        this.content.removeAllChildren();
    }

    // update (dt) {}
}
