import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

/**
 * uc广告组件
 */
@ccclass
export default class AdAgentCocosplay extends AdAgent {

	banner: any = null;
	interstitialAd: any = {};
	videoAd: any = {};

	bannerLoaded = false;
	interstitialAdLoaded = false;
	videoAdLoaded = false;
	_videoCallback: Function = null;
	_isVideoLoaded: boolean = false;

	_videoAd: any = null;
	_bannerAd: any = null;
	//@ts-ignore
	uc = window.uc;

	public Init() {

		utils.registerServerInitEvent(() => {
			this.initBanner();
			this.createInsertAd();
			this.createVideoAd();
		}, this)
	}

	initBanner() {
		let self = this;
		self.bannerLoaded = false;
		//@ts-ignore
		self.banner = AdSDK.createBannerAd("1", utils.config.cocosConfig.bannerId, 2);
		//注册onLoad函数,游戏调用创建banner时，AdSDK通知平台创建广告，当创建成功，会执行该回调函数通知游戏
		self.banner.onLoad(function () {
			self.bannerLoaded = true;
			console.log("banner 创建banner成功，可以调用展示");
		});
		//注册onError函数,游戏调用创建banner时，AdSDK通知平台创建广告，当创建失败，会执行该回调函数通知游戏
		self.banner.onError(function (param) {
			self.destroyBannerAd();
			console.log("banner 创建banner失败，错误码 = ", param.errorCode);
		});
		console.log('banner 游戏创建banner广告');
	}

	ShowBanner() {
		let self = this;
		// self.createBannerAd()
		// self.bannerLoaded = false;


		if (self.bannerLoaded) {//Object.keys(banner).length &&
			self.banner.show().then(function () {
				console.log('banner 广告显示成功')
			}, function (err) {
				console.log('banner 广告显示失败')
			});
			console.log('banner 展示banner广告');
		} else {
			console.log('banner 未加载成功');
		}
	}

	HideBanner() {
		this.banner.hide();
		console.log('banner 隐藏banner广告');
	}


	destroyBannerAd() {
		this.bannerLoaded = false;
		this.banner.destroy();
		this.banner = null;
		console.log('banner 销毁banner广告');
	}

	public get ServerConfig() {
		return utils._tool_Cocosplay.ServerConfig;
	}

	//插屏显示次数
	_insertShowCount: number = 0;

	_insertLastShowTime: number = 0;
	/**
	 * 验证插屏是否能展示
	 * 1、次数限制 默认每日8次
	 * 2、时间限制 默认60秒
	 */
	private checkInsertAdShow(): boolean {
		let maxShowCount = this.ServerConfig.intersititial_max_show_count;
		maxShowCount = 0;
		let intervalTime = this.ServerConfig.intersititial_interval_time;
		let curTime: number = new Date().getTime();
		let interval: number = (curTime - this._insertLastShowTime) / 1000;

		utils.showLog("cocos服务器插屏最大显示次数为：" + maxShowCount + ",间隔显示时间为：" + intervalTime + "秒！");
		utils.showLog("cocos插屏当前广告显示次数：" + this._insertShowCount + "次，间隔时间：" + interval + "秒！");
		if (maxShowCount > 0 && this._insertShowCount >= maxShowCount) {
			utils.showLog("cocos插屏广告显示的次数达到" + maxShowCount + "次。插屏不显示");
			return false;
		}

		if (intervalTime > 0 && interval < intervalTime) {
			utils.showLog("cocos插屏广告显示的间隔少于" + intervalTime + "秒。插屏不显示");
			return false;
		}

		return true;
	}

	// 创建插屏广告 展示一次调用一次创建
	// 参数
	//   adId: string 广告序号ID 游戏自定义
	//   interstitialAdId: string 插屏广告ID 需后台申请
	//   style: int 广告类型 1 全屏 2 半屏
	public ShowInterstitial() {
		let self = this
		if (!self.checkInsertAdShow()) return;
		if (self.interstitialAdLoaded) {
			self.interstitialAd.show().then(function () {
				self._insertLastShowTime = new Date().getTime();
				self.destroyInterstitialAd();
				self.createInsertAd();
			}, function (err) {
				console.log("interstitialAd 广告显示失败")
			})
			console.log("interstitialAd 游戏展示插屏广告");
		}
	}
	public createInsertAd() {
		let self = this
		utils.showLog("插屏id为：" + utils.config.cocosConfig.insertId)
		//@ts-ignore
		this.interstitialAd = AdSDK.createInterstitialAd("1", utils.config.cocosConfig.insertId, 2);

		this.interstitialAd.onLoad(function () {
			self.interstitialAdLoaded = true;
			console.log("interstitialAd 创建插屏成功，可以调用展示");
		});

		self.interstitialAd.onError(function (param) {
			console.log("interstitialAd 创建插屏失败，错误码 = ", param.errorCode);
			self.destroyInterstitialAd();
		})
	}
	hideInterstitialAd() {
		this.interstitialAd.hide();
		console.log("interstitialAd 游戏隐藏插屏广告");
	}


	destroyInterstitialAd() {
		this.interstitialAdLoaded = false;
		this.interstitialAd.destroy();
		console.log("interstitialAd 游戏销毁插屏广告");
	}

	// 创建激励视频广告 展示一次创建一次
	// 参数
	//   adId: string 广告序号ID 游戏自定义
	//   videoAdId: string 视频广告ID 需后台申请
	//   screenOrientation: int 广告类型 1 横屏 2 竖屏
	public ShowVideo(callback: Function) {
		let self = this;
		self._videoCallback = callback;
		if (self.videoAdLoaded) {
			self.videoAd.show().then(function () {
				if (self._videoCallback) {
					self._videoCallback(true, "视频播放成功");
					self._videoCallback = null;
				}
			}, function (err) {
				if (self._videoCallback) {
					self._videoCallback(false, "暂无视频广告");
					self._videoCallback = null;
				}
			})
		} else {

			if (self._videoCallback) {
				self._videoCallback(false, "暂无视频广告");
				self._videoCallback = null;
			}
			self.createVideoAd();
		}
	}

	createVideoAd() {

		let self = this;
		console.log("视频id为：" + utils.config.cocosConfig.videoId)
		//@ts-ignore
		self.videoAd = AdSDK.createRewardedVideoAd("1", utils.config.cocosConfig.videoId, 2);

		self.videoAd.onLoad(function () {
			self.videoAdLoaded = true;
			console.log("rewardedvideoAd 创建视频广告成功，可以调用展示")
		});

		self.videoAd.onError(function (param) {
			console.log("rewardedvideoAd 创建视频广告失败，错误码 = ", param.errorCode);
			self.destroyRewardedVideoAd();//加载广告失败，销毁

			if (self._videoCallback) {
				self._videoCallback(false, "暂无视频广告");
				self._videoCallback = null;
			}
		});
		self.videoAd.onClose(function () {
			if (self._videoCallback) {
				self._videoCallback(false, "观看完视频才能获得奖励!");
				self._videoCallback = null;
			}
			self.destroyRewardedVideoAd();//视频广告关闭，销毁
			self.createVideoAd();
		});
	}

	destroyRewardedVideoAd() {
		this.videoAdLoaded = false;
		this.videoAd.destroy();
		console.log("rewardedvideoAd 游戏销毁视频广告");
	}
}
