import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";

export default class AdAgentGoogleWeb extends AdAgent {

	googleAd: any = null;

	public Init(): void {
		console.log("[init googleWebAd]");
		//@ts-ignore
		this.googleAd = window.googleApi
	}

	public ShowBanner(location: BannerLocation = null) {
		console.log("[YouzhiAd ShowBanner] :" + location);
		this.googleAd && this.googleAd.showBanner();
	}
	public ShowInterstitial() {
		console.log("[YouzhiAd ShowInterstitial]");
		this.googleAd && this.googleAd.ShowInterstitial();
	}

	public HideBanner(location: BannerLocation = null) {
		console.log("[YouzhiAd HideBanner]");
		this.googleAd && this.googleAd.hideBanner();
	}

	_videoIsPlay: boolean = false;
	public ShowVideo(callback: Function) {
		console.log("[YouzhiAd ShowVideo]");
		if (this._videoIsPlay) {
			console.warn("[YouzhiAd Video Ad is Loading]");
			return;
		}
		this._videoIsPlay = true;
		//@ts-ignore
		let videoAdSuccess = () => {
			this._videoIsPlay = false;
			callback(true, "视频播放成功!");
		}
		//@ts-ignore
		let videoAdFail = (msg) => {
			this._videoIsPlay = false;
			callback(false, msg ? msg : "视频播放失败!");
		}
		this.googleAd && this.googleAd.showVideo(videoAdSuccess, videoAdFail);
	}

}


// var googleApi = new Object();
// googleApi.showBanner = () => {
//   console.log("=====google showBanner=====");
// }
// googleApi.ShowInterstitial = () => {
//   console.log("=====google ShowInterstitial=====");
// }
// googleApi.hideBanner = () => {
//   console.log("=====google hideBanner=====");
// }
// googleApi.showVideo = (successFunc, failFunc) => {
//   console.log("=====google ShowVideo=====");
//   successFunc();
// }
// window.googleApi = googleApi;