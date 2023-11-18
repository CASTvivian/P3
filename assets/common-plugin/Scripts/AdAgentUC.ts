import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

/**
 * uc广告组件
 */
@ccclass
export default class AdAgentUC extends AdAgent {


	_videoCallback: Function = null;
	_isVideoLoaded: boolean = false;

	_videoAd: any = null;
	_bannerAd: any = null;
	//@ts-ignore
	uc = window.uc;

	public Init() {
		utils.showLog("UC 广告初始化");
		this.initVideo();
		if (!this._sysInfo) {
			this._sysInfo = this.uc.getSystemInfoSync()
			if (typeof this._sysInfo === 'string') {
				try {
					this._sysInfo = JSON.parse(this._sysInfo);
				} catch (e) { }
			}
		}
	}


	_sysInfo: any = {};

	public ShowBanner() {

		if (this._bannerAd) {
			this._bannerAd.destroy();
			this._bannerAd = null;
		}
		// 0:左上 1：顶部居中 2：右上
		// 3：左边垂直居中 4：居中 5：右边垂直居中
		// 6：左下 7：底部居中 8：右下 （默认为0）
		utils.showLog("uc banner width>>", this._sysInfo.screenWidth, " #height>>", this._sysInfo.screenWidth * 194 / 345)
		this._bannerAd = this.uc.createBannerAd({
			style: {
				gravity: 7,
				bottom: 0, 		// 底部 margin
				width: cc.winSize.height < cc.winSize.width ? 250 : this._sysInfo.screenWidth, // 建议最小宽度 250dp，最大宽度为屏幕尺寸
				height: this._sysInfo.screenWidth / 4,
			}
		})
		if (this._bannerAd) {
			this._bannerAd.show()
			this._bannerAd.onError(err => {
				utils.showLog("UC平台banner出错" + err);
			});
		}
	}

	public ShowInterstitial() {

		// if(this.)
		utils.showLog("展示插屏广告");
		const interstitialAd = this.uc.createInterstitialAd();
		interstitialAd.load()
			.then()
			.catch(err => utils.showLog(`插屏加载异常：${err}`));
		interstitialAd.onLoad(() => {
			interstitialAd.offLoad(); // 取消 load 事件的监听，不传 callback 的话会取消所有的监听
			interstitialAd
				.show()
				.then()
				.catch(err => utils.showLog(`插屏展示异常：${err}`));
			utils.showLog('UC插屏广告加载成功');
		});

		interstitialAd.onError(err => {
			utils.showLog(err)
		});
	}

	initVideo() {
		this._videoAd = this.uc.createRewardVideoAd();
		this._videoAd.onLoad(() => {
			utils.showLog('激励视频 广告加载成功');
		});
		this._videoAd.onError(err => {
			utils.showLog("出错了：" + err);

			if (this._videoCallback) {
				this._videoCallback(false, "暂无视频广告");
				this._videoCallback = null;
			}
		});

		this._videoAd.onClose(res => {
			utils.showLog("用户关闭视频" + res);
			if (res && res.isEnded) {

				if (this._videoCallback) {
					this._videoCallback(true, "");
					this._videoCallback = null;
				}
			} else {
				if (this._videoCallback) {
					this._videoCallback(false, "视频播放完毕才能够获取奖励!");
					this._videoCallback = null;
				}
			}
		});
	}
	public ShowVideo(callback: Function) {
		if (PlatUtils.ISUC) {
			this._videoCallback = callback;
			if (!this._videoAd) {
				this.initVideo();
			} else {
				this._videoAd.show();
			}

		}
	}
}
