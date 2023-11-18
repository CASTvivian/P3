import AdAgent from "./AdAgent";
import { BannerLocation, BannerLocationToString } from "./YZ_Constant";
import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

const ST_JNIMessage: string = "JNIMessage";
const ST_VideoCallback: string = "VideoCallback";

@ccclass
export default class AdAgentNative extends AdAgent {

    private get _className() {
        return utils.Tool_Native.jniClassName;
    }

    private _videoCallback: Function = null;


    public get ServerConfig() {
        return utils.Tool_Native.ServerConfig;
    }



    public Init() {
        if (PlatUtils.IsNativeAndroid) {

            cc.game.on(ST_JNIMessage, (event: any) => {
                if (event.type == ST_VideoCallback) {
                    if (this._videoCallback) {
                        if (event.ret == true) {
                            this._videoCallback && this._videoCallback(true);
                        } else {
                            this._videoCallback && this._videoCallback(false, event.msg);
                        }
                        this._videoCallback = null;
                    }
                }
            });


        }
    }


    _showBannerTimerId: number = 0;

    public ShowBanner(location: BannerLocation = BannerLocation.Home, args: any = null, isTimeRefresh: boolean = false) {
        if (PlatUtils.IsNativeAndroid) {
            utils.showLog("AdAgentNative ShowBanner");

            let interval: number = 60;
            if (this.ServerConfig && this.ServerConfig.refresh_ad_time) {
                interval = this.ServerConfig.refresh_ad_time;
            }
            let jsonObj: any = {};
            jsonObj.location = location;
            jsonObj.isTimeRefresh = isTimeRefresh ? "true" : "false";


            try {
                utils.showLog("调用banner Json >>>" + JSON.stringify(jsonObj));
                jsb.reflection.callStaticMethod(this._className, "showBanner", "(Ljava/lang/String;)V", JSON.stringify(jsonObj));
            } catch (error) {
                utils.showLog(error);
            }

            clearInterval(this._showBannerTimerId);
            this._showBannerTimerId = setInterval(function () {
                utils.showLog(`定时刷新显示Banner广告！location:${location}; args:${JSON.stringify(args)}; 间隔时间:${interval}`);
                this.ShowBanner(location, args, true);
            }.bind(this), interval * 1000);
        }
    }


    public HideBanner(location: BannerLocation = BannerLocation.Home) {
        utils.showLog("AdAgentNative HideBanner");

        clearInterval(this._showBannerTimerId);
        jsb.reflection.callStaticMethod(this._className, "hideBanner", "(Ljava/lang/String;)V", location);
    }



    public ShowInterstitial() {
        if (PlatUtils.IsNativeAndroid) {
            try {
                let delayShowTime = 0.5;
                if (this.ServerConfig && this.ServerConfig.intersititia_delay_show_time) {
                    delayShowTime = this.ServerConfig.intersititia_delay_show_time;
                }
                utils.showLog("AdAgentNative ShowInterstitial 延迟", delayShowTime, "秒调用！");

                utils.delayCall(() => {
                    jsb.reflection.callStaticMethod(this._className, "showInterstitial", "()V");
                }, delayShowTime);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }




    _showNativeIconTimerId: number = 0;

    /**
        * 显示浮窗广告挂件
        * @param params 
        * ```
        * {
        * group:string
        * left:number
        * bottom:number
        * scale:number
        * parent:cc.Node
        * }
        * ```
        * @returns 生成的组件
        */
    public showNativeTryGameWidget(params: any = null) {

        if (PlatUtils.IsNativeAndroid) {
            utils.showLog("AdAgentNative showNativeTryGameWidget=" + this.ServerConfig.show_native_icon_method);
            try {

                let interval: number = 15;
                if (this.ServerConfig && this.ServerConfig.icon_jump_native) {
                    let iv = parseInt(this.ServerConfig.icon_jump_native);
                    if (iv > 3) {
                        interval = iv;
                    } else {
                        utils.showLog("悬浮ICON必须大于3秒，当前默认为15秒刷新");
                    }
                }


                if (this.ServerConfig.show_native_icon_method) {
                    let style: any = {};
                    "left" in params && (style.left = params.left)
                    "right" in params && (style.right = params.right)
                    "top" in params && (style.top = params.top)
                    "bottom" in params && (style.bottom = params.bottom)
                    "location" in params && (style.location = params.location)

                    style.winSizeWidth = cc.winSize.width;
                    style.winSizeHeight = cc.winSize.height;
                    // style.left = params.left != undefined ? params.left : -1;
                    // style.right = params.right != undefined ? params.right : -1;
                    // style.top = params.top != undefined ? params.top : -1;
                    // style.bottom = params.bottom != undefined ? params.bottom : -1;
                    // style.location = params.location != undefined ? params.location : -1;

                    jsb.reflection.callStaticMethod(utils.Tool_Native.jniClassName, this.ServerConfig.show_native_icon_method, "(Ljava/lang/String;)V", JSON.stringify(style));


                } else {
                    let x = 10;
                    let y = 250;
                    if (params) {
                        if (params.top != null) {
                            y = params.top;
                        } else if (params.bottom != null) {
                            y = cc.winSize.height - params.bottom;
                        }
                        if (params.left != null) {
                            x = params.left;
                        } else if (params.right != null) {
                            x = cc.winSize.width - params.right;
                        }
                    }

                    jsb.reflection.callStaticMethod(utils.Tool_Native.jniClassName, "showFloatIcon", "(II)V", x, y);
                }


                clearInterval(this._showNativeIconTimerId);
                this._showNativeIconTimerId = setInterval(function () {
                    utils.showLog(`定时刷新显示原生悬浮ICON广告！ args:${params}; 间隔时间:${interval}`);
                    this.showNativeTryGameWidget(params);
                }.bind(this), interval * 1000);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }


    public ShowVideo(callback: Function) {
        if (PlatUtils.IsNativeAndroid) {
            utils.showLog("AdAgentNative ShowVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showVideo", "()V");
            } catch (error) {
                utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    }

    public showFullScreenVideo(callback: Function) {
        if (PlatUtils.IsNativeAndroid) {
            utils.showLog("AdAgentNative showFullScreenVideo");
            this._videoCallback = callback;
            try {
                jsb.reflection.callStaticMethod(this._className, "showFullScreenVideo", "()V");
            } catch (error) {
                utils.showLog(error);
                if (callback) {
                    callback(false);
                }
            }
        }
    }

    /**
    * 隐藏浮动试玩挂件
    */
    public hideNativeTryGameWidget() {
        if (PlatUtils.IsNativeAndroid) {
            clearInterval(this._showNativeIconTimerId);
            jsb.reflection.callStaticMethod(this._className, "hideFloatIcon", "()V");

            return;
        }
    }
}

export class NativeCallBack {

    /**
     *  1：播放完成
     *  2：播放失败
     *  3：无广告
     * 
     */
    public static videoCallBack(result: number, msg?: string) {
        console.log("视频广告回调函数 ------>result=", result, " msg=", msg);
        if (result == 1) {
            //播放成功
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: true });
        } else {
            //播放失败
            cc.game.emit(ST_JNIMessage, { type: ST_VideoCallback, ret: false, msg: msg ? msg : "暂无视频！" });
        }
    }

    public static sendEvent(eventMsg: string) {
        utils.showLog("事件上报：" + eventMsg);
        utils.SendEvent(eventMsg);
    }


    public static sendEventNew(eventName: string, eventId?: string, eventData?: string) {
        utils.showLog("事件上报：" + eventName);
        if (utils.Tool_Native) {
            utils.Tool_Native.sendEventNew(eventName, eventId, eventData)
        }
    }

    /**
     * 上报插屏点击时间
     */
    public static reportInsertClick() {
        utils.showLog("上报插屏点击时间：" + utils.overPageInsertAdIsTouch);
        if (utils.overPageInsertAdIsTouch) return;
        utils.overPageInsertAdIsTouch = true;
        let time = (new Date().getTime() - utils.overPageShowTime) / 1000;
        let json: any = {};
        json.data = time;
        utils.SendEventNew(`结算页面-插屏点击时间`, "overPageInsertAdTouch", JSON.stringify(json));
    }


    /**
     * 
     * @param idCard 
     * @param realName 
     */
    public static realNameAuth(idCard, realName) {
        utils.showLog("realNameAuth>>>> #idCard=" + idCard + " #realName=" + realName);
        utils.Tool_Native.realNameAuth(idCard, realName, (res, result) => {
            utils.showLog("realNameAuth>>>>  #res=" + res + " #result=" + result);

            if (res) {
                if (result) {
                    let res = JSON.parse(result);
                    switch (res.code) {
                        case 1:
                            utils.showMsg(res.msg);
                            utils.Tool_Native.realNameAuthResult(result);
                            break;
                        case 0:
                            if (res.nonage == "0") {
                                utils.setRealNameAuthLocalData("2")
                            } else {
                                utils.setRealNameAuthLocalData("1")
                            }
                            utils._isRealNameAuth = true;
                            if (res.msg) {
                                utils.showMsg(res.msg);
                            }
                            utils.Tool_Native.realNameAuthResult(result);
                            utils.scheduleOnce(() => {
                                utils.emitRealNameAuthCloseEvent();
                            }, 0.5);
                            break;
                        case 2:
                            //未成年限制内，显示下线
                            utils.setRealNameAuthLocalData("2");
                            utils.Tool_Native.realNameAuthResult(result);
                            break;
                    }
                } else {

                    let result: any = {};
                    result.code = "-1";
                    result.msg = "请求失败，请重新提交验证！"
                    utils.Tool_Native.realNameAuthResult(JSON.stringify(result))
                    utils.showMsg("请求失败，请重新提交验证！")
                }

            } else {
                utils.showMsg("请求失败，请重新提交验证！")
                let result: any = {};
                result.code = "-1";
                result.msg = "请求失败，请重新提交验证！"
                utils.Tool_Native.realNameAuthResult(JSON.stringify(result))
            }
        });
    }

}

cc["NativeCallBack"] = NativeCallBack;
