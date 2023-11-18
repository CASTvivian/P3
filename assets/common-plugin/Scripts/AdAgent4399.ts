import AdAgent from "./AdAgent";
import { BannerLocation } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

/**
 * uc广告组件
 */
@ccclass
export default class AdAgent4399 extends AdAgent {


	_videoCallback: Function = null;
	_isVideoLoaded: boolean = false;

	_videoAd: any = null;

	//@ts-ignore
	_4399 = window.h5api;
	_canPlayAd: boolean = true;
	_remain: number = 0;

	public Init() {
		this.checkPlayAd();
	}

	/**
	 * 获得是否可以播放广告及剩余次数
	 */
	public checkPlayAd() {
		this._canPlayAd = true;
		return;
		// this._4399.canPlayAd((data: any) => {
		// 	if (data.canPlayAd) {
		// 		this._canPlayAd = data.canPlayAd;
		// 	} else {
		// 		this._canPlayAd = false;
		// 	}
		// 	if (data.remain) {
		// 		this._remain = data.remain;
		// 	}
		// 	utils.showLog("是否可播放广告", data.canPlayAd, "剩余次数", data.remain)
		// })
	}



	public ShowBanner() {
		utils.showLog("4399平台暂无banner广告");
	}



	public ShowInterstitial() {
		utils.showLog("4399平台暂时无插屏广告");
	}

	/**
	* 播放全屏广告
	* @param callback   播放广告时的广告状态回调函数
	*/
	public ShowVideo(callback: Function) {
		if (PlatUtils.Is4399) {
			this._videoCallback = callback;
			if (this._canPlayAd) {
				this._4399.playAd((obj: any) => {
					utils.showLog('代码:' + obj.code + ',消息:' + obj.message)
					if (obj.code === 10000) {
						utils.showLog('视频开始播放')
					} else if (obj.code === 10001) {
						utils.showLog('视频播放结束')
						if (this._videoCallback) {
							this._videoCallback(true, "");
							this._videoCallback = null;
						}
						this.checkPlayAd();
					} else {
						if (this._videoCallback) {
							this._videoCallback(false, "激励视频异常!");
							this._videoCallback = null;
						}
						this.checkPlayAd();
						utils.showLog('视频广告异常')
					}

				})
			} else {
				utils.showLog('4399获取到不能播放广告! #this._canPlayAd=', this._canPlayAd, "剩余次数", this._remain);
				if (this._videoCallback) {
					this._videoCallback(false, "今日次数用完，明天再来!");
					this._videoCallback = null;
				}
				this.checkPlayAd();
			}

		}
	}


}
