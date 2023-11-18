import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

/**
 * bili广告组件
 */
@ccclass
export default class AdAgentBili extends AdAgent {


	_videoCallback: Function = null;
	_isVideoLoaded: boolean = false;

	_videoAd: any = null;
	_bannerAd: any = null;
	//@ts-ignore
	bl = window.bl;

	public Init() {

	}
	_curBannerAd: any = null;
	_bannerSizePercent: number = 0.1;
	_bannerBottom: number = 0;
	public ShowBanner(location: BannerLocation, args: any = null) {

		let argsTmp: any = args;

		if (argsTmp && argsTmp.width) {
			this._bannerSizePercent = argsTmp.width < 0 ? 0 : argsTmp.width;
			this._bannerSizePercent = argsTmp.width > 1 ? 1 : argsTmp.width;
		}

		if (argsTmp && argsTmp.bottom) {
			this._bannerBottom = argsTmp.bottom < 0 ? 0 : argsTmp.bottom;
			this._bannerBottom = argsTmp.bottom > cc.winSize.height ? cc.winSize.height : argsTmp.bottom;
		}
		// let bannerId: string = utils.config.biliConfig.bannerId;
		// utils.showLog("显示Banner广告: bannerId=" + bannerId);
		console.log("显示Banner广告");
		let params = {
			left: 0,
			width: 300,
			top: 0
		};
		//@ts-ignore
		let curBannerAd = bl.createBannerAd(params);
		if (curBannerAd) {
			curBannerAd.onError((err) => {
				utils.showLog("广告条加载失败! ", JSON.stringify(err));
				if (curBannerAd) {
					curBannerAd.destroy();
				}
			});

			let self = this;
			curBannerAd.onLoad(() => {
				curBannerAd.show().then(() => {
					if (self._curBannerAd) {
						self._curBannerAd.destroy();
					}
					self._curBannerAd = curBannerAd;
					utils.showLog("Banner广告显示成功!");

				}).catch((err) => {
					utils.showLog("Banner广告出错", JSON.stringify(err));
					if (curBannerAd) {
						curBannerAd.destroy();
					}
				});
			});

			curBannerAd.onResize((res) => {
				curBannerAd.style.width = utils.Tool_Bili.SysInfo.screenWidth * self._bannerSizePercent;
				curBannerAd.style.left = (utils.Tool_Bili.SysInfo.screenWidth - res.width) * 0.5;

				if (self._bannerBottom == cc.winSize.height) {
					curBannerAd.style.top = 0;
				} else {
					curBannerAd.style.top = utils.Tool_Bili.SysInfo.screenHeight - res.height - self._bannerBottom;
				}
			});
		} else {
			utils.showLog("广告条创建失败!");
		}
	}

	public ShowInterstitial() {
		utils.showLog("哔哩平台暂时无插屏广告");
	}


	public HideBanner(location: BannerLocation = BannerLocation.Home) {
		if (PlatUtils.IsBili) {
			if (this._bannerAd) {
				this._bannerAd.hide();
			}
		}
	}


	public ShowVideo(callback: Function) {
		if (PlatUtils.IsBili) {
			this._videoCallback = callback;
			let self = this;
			this.showRewardedVideoAd({
				onSuccess(res) {
					// 广告成功展示
					utils.showLog("bili视频展示成功！");
				},
				onFail(e) {
					// 广告失败了
					utils.showLog("bili视频广告展示失败！");
					utils.Tool_Bili.share((res, msg) => {
						if (res) {
							self._videoCallback && self._videoCallback(true, "");
							self._videoCallback = null;
						} else {
							self._videoCallback && self._videoCallback(false, "分享成功才可以获取奖励哦!");
							self._videoCallback = null;
						}
					});
				},
				onClose(e) {
					// 用户关闭了广告
					if (e.isEnded) {
						// 用户看完了
						utils.showLog("bili视频广告观看完毕，发送奖励");
						self._videoCallback && self._videoCallback(true, "");
					} else {
						// 用户没看完
						self._videoCallback && self._videoCallback(false, "观看完视频才能获得奖励!");
						self._videoCallback = null;
					}
				}
			});
		}
	}


	private showRewardedVideoAd({ onSuccess, onFail, onClose }) {
		// 创建激励视频对象实例:
		const ad = this.bl.createRewardedVideoAd();

		function adLoadHandler(e) {
			// !!!!!!
			// 重要！此处必须先 off 本次事件回调。
			// !!!!!!
			ad.offLoad(adLoadHandler);

			// 加载成功
			ad.show()
				.catch((e) => {
					// 激励视频展示失败
					if (typeof onFail === 'function') {
						onFail(e);
					}
					return Promise.reject(e);
				})
				.then((res) => {
					// 成功展示激励视频
					if (typeof onSuccess === 'function') {
						onSuccess(res);
					}
				})
		}

		function adErrorHandler(e) {
			// 激励广告出错
			if (typeof onFail === 'function') {
				onFail(e);
			}
			ad.offLoad(adLoadHandler);
			ad.offClose(adCloseHandler);
			ad.offError(adErrorHandler);
			ad.destroy();
		}

		function adCloseHandler(e) {
			// 用户点击“关闭广告”
			if (typeof onClose === 'function') {
				onClose(e);
			}
			ad.offLoad(adLoadHandler);
			ad.offClose(adCloseHandler);
			ad.offError(adErrorHandler);
			ad.destroy();
		}

		// 监听加载成功事件
		ad.offLoad(adLoadHandler);
		ad.onLoad(adLoadHandler);

		// 监听错误事件
		ad.offError(adErrorHandler);
		ad.onError(adErrorHandler);

		// 监听用户关闭事件
		ad.offClose(adCloseHandler);
		ad.onClose(adCloseHandler);

		// 加载
		ad.load();

		return ad;
	}


}
