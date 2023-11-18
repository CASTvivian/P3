import GameItem from "./GameItem";
import { SubLocation } from "./YZ_Constant";
import { utils } from "./Utils";
import QCrossWidgetItem from "./QCrossWidgetItem";
import CompatibleTool from "./CompatibleTool";
import List from "./List";

const { ccclass, property } = cc._decorator;

const _panelSize: cc.Size[] = [cc.size(225, 1000), cc.size(506, 1000)];
const _titleSize: cc.Size[] = [cc.size(111, 54), cc.size(275, 54)];
const _titleBgSize: cc.Size[] = [cc.size(376, 104), cc.size(545, 104)];
const _starSize: cc.Size[] = [cc.size(251, 89), cc.size(425, 89)];

@ccclass
export default class MoreGamesPanel extends cc.Component {

	_panel: cc.Node = null;
	_gameList: cc.Node = null;
	_originScale: number = 1;

	_gameItems: GameItem[] = [];
	_jumpList: any = null;
	_dataDirty: boolean = false;

	_closeBtnRight: cc.Node = null;
	_closeBtnLine: cc.Node = null;

	_title: cc.Node = null;
	_titleBg: cc.Node = null;
	_star: cc.Node = null;
	private gameItemNode: cc.Node = null;

	listView: List = null;

	onLoad() {
		if (utils.otherConfig && utils.otherConfig.group) {
			this.node.group = utils.otherConfig.group;
		}
		this._panel = this.node.getChildByName("Panel");
		this.listView = this._panel.getChildByName("GameList").getComponent(List)
		// this._gameList = this._panel.getChildByName("GameList").getComponent(cc.ScrollView).content;

		// this.gameItemNode = this._gameList.children[0];
		// this._gameList.removeAllChildren();

		this._closeBtnRight = this._panel.getChildByName("Btn_Close");
		this._closeBtnRight.active = true;
		this._closeBtnLine = this._panel.getChildByName("Btn_CloseSide");
		this._closeBtnLine.active = false;

		this._titleBg = cc.find("Title/TitleBg", this._panel);
		this._title = cc.find("Title/Txt", this._panel);
		this._star = cc.find("Title/Star", this._panel);

		this.node.active = false;
		let ratio: number = 1;
		if (cc.winSize.height < cc.winSize.width) {
			// 横屏游戏
			ratio = cc.winSize.width / 1920 * 0.5;
		} else {
			ratio = cc.winSize.width / 1080;
		}

		this._panel.scale = ratio;
		this._originScale = this._panel.scale;
	}

	update(dt) {
		if (this.autoScorll && !this.listView.scrollView.isScrolling()) {
			this.listView.content.y += dt * 100;
			this.listView._onScrolling();
		}
	}

	onListRender(item: cc.Node, idx: number) {
		let qcrossWidgetItem: GameItem = item.getComponent(GameItem);
		qcrossWidgetItem.init(this._jumpList[idx], SubLocation.isMoreGame);
	}

	autoScorll: boolean = false;
	private _initWidget() {
		if (this._jumpList.length > 5) {
			if (utils.ServerConfig.more_game_pannel_auto_scroll && utils.ServerConfig.more_game_pannel_auto_scroll == "false") {
				utils.showLog("服务器不开启自动滚动！");
			} else {
				this.scheduleOnce(() => {
					this.autoScorll = true;
				}, 1);
			}
		}

		utils.postRecommentShowData(SubLocation.isMoreGame);
	}

	public init(jumpList: any) {
		this._jumpList = jumpList;
		this._dataDirty = true;

		if (this._jumpList && this._jumpList.length > 0) {
			this._initWidget();
			this.listView.numItems = this._jumpList.length;
		} else {
			cc.warn("交叉推广数据为null, 6元素交叉推广组件不显示!");
			this.node.destroy();
		}
	}

	public show() {
		this.node.active = true;
		// this._panel.x = -this._panel.getContentSize().width;
		this._panel.y = 0;
		this._panel.runAction(cc.moveBy(0.3, cc.v2(this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()));
	}

	public hide() {
		let self = this;
		this._panel.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
			self.node.active = false;
		})));
	}

	public onCloseBtnHandler(event: any, data: any) {
		this.hide();
	}
}
