import AdAgent from "./AdAgent";
import { BannerLocation, BannerLocationToString } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

const ST_JNIMessage: string = "JNIMessage";
const ST_VideoCallback: string = "VideoCallback";

@ccclass
export default class AdAgentIOS extends AdAgent {

    private _className: string = "JNIHelper";

    private _videoCallback: Function = null;


    public get ServerConfig() {
        return utils.Tool_IOS.ServerConfig;
    }


    public Init() {
        if (PlatUtils.IsNativeIOS) {

            cc.game.on(ST_JNIMessage, (event: any) => {
                if (event.type == ST_VideoCallback) {
                    if (this._videoCallback) {
                        if (!event.ret) {
                            this._videoCallback(event.ret, event.message ? event.message : "视频播放失败！");
                        } else {
                            this._videoCallback(event.ret);
                        }
                    }

                }
            });


        }
    }


    _showBannerTimerId: number = 0;

    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null) {
        if (PlatUtils.IsNativeIOS) {
            utils.showLog("AdAgentNative ShowBanner");

            // let interval: number = 18;
            // if (this.ServerConfig && this.ServerConfig.refresh_ad_time) {
            //     interval = this.ServerConfig.refresh_ad_time;
            // }

            // try {
            jsb.reflection.callStaticMethod(this._className, "showBanner:", BannerLocationToString(location));
            // } catch (error) {
            //     utils.showLog(error);
            // }

            // clearInterval(this._showBannerTimerId);
            // this._showBannerTimerId = setInterval(function () {
            //     utils.showLog(`定时刷新显示Banner广告！location:${location}; args:${JSON.stringify(args)}; 间隔时间:${interval}`);
            //     this.ShowBanner(location, args);
            // }.bind(this), interval * 1000);

        }
    }


    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        clearInterval(this._showBannerTimerId);
        jsb.reflection.callStaticMethod(this._className, "hideBanner:", BannerLocationToString(location));
    }



    public ShowInterstitial() {
        if (PlatUtils.IsNativeIOS) {
            try {
                let delayShowTime = 1;
                if (this.ServerConfig && this.ServerConfig.intersititia_delay_show_time) {
                    delayShowTime = this.ServerConfig.intersititia_delay_show_time;
                }
                utils.showLog("AdAgentNative ShowInterstitial 延迟", delayShowTime, "秒调用！");

                utils.delayCall(() => {
                    jsb.reflection.callStaticMethod(this._className, "showInterstitial");
                }, delayShowTime);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }



    public ShowVideo(callback: Function) {
        if (PlatUtils.IsNativeIOS) {
            utils.showLog("AdAgentNative ShowVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showVideo");
            } catch (error) {
                utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    }

    public showFullScreenVideo(callback?: Function) {
        if (PlatUtils.IsNativeIOS) {
            utils.showLog("AdAgentNative ShowVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showFullScreenVideo");
            } catch (error) {
                utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    }
}


export class NativeIosCallBack {

    /**
     *  1：播放完成
     *  2：播放失败
     *  3：无广告
     * 
     */
    public static videoCallBack(result: string, msg: string) {
        utils.showLog("视频广告回调函数 ------>#result=" + result + " #msg=" + msg ? msg : "");
        if (result == "1") {
            //播放成功
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: true });
        } else {
            //播放失败
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: false, message: msg });
        }
    }
}
window["NativeIosCallBack"] = NativeIosCallBack;
