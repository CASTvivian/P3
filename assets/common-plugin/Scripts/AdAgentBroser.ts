import AdAgent from "./AdAgent";
import YZ_NativeBanner from "./YZ_NativeBanner";
import YZ_NativeInsert from "./YZ_NativeInsert";
import { BeForGameOverAdId, LevelStatus, BannerLocation } from "./YZ_Constant";
import { NativeBannerInfo } from "./CommonConfig";
import { utils } from "./Utils";
import YZ_NativeItem from "./YZ_NativeItem";
import YZ_NativeAdObject from "./YZ_NativeAdObject";

export default class AdAgentBroser extends AdAgent {
	_nativeBannerNode: cc.Node;
	_nativeInsertNode: cc.Node;

	_nativeBannerInfo: NativeBannerInfo = null;
	//当前显示Banner的位置
	_curLocation: BannerLocation = BannerLocation.None;
	/**
	 * 获取当前banner配置
	 */
	getNativeBannerInfo() {
		return new NativeBannerInfo();
	}

	public ShowBanner(location: BannerLocation = null) {
		if (this._curLocation != location) {
			this.HideBanner(location);
		}
		this._curLocation = location;
		if (this.getNativeBannerInfo().is_show_banner == -1) {
			utils.showLog("当前位置配置为不展示banner!");
			this.HideBanner(location);
			return;
		}
		if (!this._nativeBannerNode) {
			this._nativeBannerNode = cc.instantiate(utils.config.otherconfig.nativeBanner);
			cc.director.getScene().addChild(this._nativeBannerNode, 1000);
		}


		this._nativeBannerNode.active = true;
		let nativeBanner = this._nativeBannerNode.getComponent(YZ_NativeBanner);
		if (nativeBanner) {
			let addate = { title: "今日头条", desc: "看新闻用今日头条", imgUrlList: [utils.cur_tool.img_url], icon: utils.cur_tool.img_url };
			nativeBanner.init(null, addate, this.getNativeBannerInfo());
		}
		// utils.showRecommendGamesBanner();
	}
	public ShowInterstitial() {
		if (!this._nativeInsertNode) {
			this._nativeInsertNode = cc.instantiate(utils.config.otherconfig.nativeInsert);
			cc.director.getScene().addChild(this._nativeInsertNode, 9999);
		}
		this._nativeInsertNode.active = true;
		let nativeBanner = this._nativeInsertNode.getComponent(YZ_NativeInsert);
		if (nativeBanner) {
			let addate = { title: "今日头条", desc: "看新闻用今日头条", imgUrlList: [utils.cur_tool.img_url], icon: utils.cur_tool.img_url };
			nativeBanner.init(null, addate);
		}
		// utils.showRecommendGamesBanner();
	}
	showStatementAds(data) {
		utils.adManager.ShowInterstitial();
		// utils.showCrossWidget6();
	}
	public HideBanner(location: BannerLocation = null) {
		if (this._nativeBannerNode) {
			this._nativeBannerNode.active = false;
		}
		utils.hideRecommendGamesBanner();
	}
	public ShowVideo(callback: Function) {
		callback(true, "视频播放成功!");
	}

	showBeforGameOverAd(level: number, levelStatus: LevelStatus, rewardValue: number, closeCallFunc: Function, rewardFunc: Function): void {
		cc.log("显示结算前广告：  #Level= ", level, " #LevelStatys=", levelStatus, " #rewardValue = ", rewardValue);
		utils.currentLevel = level;
		utils.isSuccess = levelStatus == LevelStatus.GameWin;
		utils.rewardCallFunc = rewardFunc;
		utils.rewardCloseFunc = closeCallFunc;
		utils.rewardValue = rewardValue;

		let adType = utils.adManager.checkShowBeforGameOverAd(level, levelStatus == LevelStatus.GameWin);
		switch (adType) {
			case BeForGameOverAdId.SharePanel:
				utils.recordEnd();
				utils.showShareRecordPanel();
				break;
			case BeForGameOverAdId.GoldBox:
				utils.adManager.showRewardBoxPanel();
				break;
			case BeForGameOverAdId.Turntable:
				utils.adManager.showrewardTurnTablePanel();
				break;
			default:
				closeCallFunc && closeCallFunc();
				break;
		}

	}

	signleNativeAd: cc.Node = null;

	_curNativeItem: YZ_NativeItem = null;
	/**
	 * 创建结算页面推广组件
	 */
	public ShowSingleNativeAd(params?: any) {

		if (utils.config.otherconfig.singleNativeAd) {
			if (this.signleNativeAd && cc.isValid(this.signleNativeAd)) {
				this.signleNativeAd.destroy();
			}
			this.signleNativeAd = cc.instantiate(utils.config.otherconfig.singleNativeAd);

			let nativeItem: YZ_NativeItem = this.signleNativeAd.getComponent("YZ_NativeItem");
			nativeItem.showType = 2;
			nativeItem.params = params;
			this._curNativeItem = nativeItem;

			if (params && params.parent) {
				params.parent.addChild(this.signleNativeAd, cc.macro.MAX_ZINDEX);
			}
			let nativeObj = new YZ_NativeAdObject();
            let data = {
				imgUrlList: [utils.cur_tool.img_url],
                icon: utils.cur_tool.img_url,
                title: "爱奇艺视频",
                desc: "下载爱奇艺，即送VIP！"
            }
            nativeObj.data = data;
            nativeItem._nativeAd = nativeObj;
			this._curNativeItem.init(nativeObj);

			utils.showLog("单个原生广告创建成功！");
			return this.signleNativeAd;
		} else {
			utils.showLog("未找到预制体 singleNativeAd, 请查看CommonUtils组件上是否赋值！");
			return null;
		}
	}
}
