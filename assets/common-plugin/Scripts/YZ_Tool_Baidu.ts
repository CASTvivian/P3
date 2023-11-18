import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

const ST_ServerUrl: string = "https://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "https://report.youletd.com/gss?";
// 默认配置
let ST_DefaultServerConfig: string = "";
@ccclass
export default class YZ_Tool_Baidu {
    _recorder: any = null;
    _recommendationButton: any = null;
    _videoPath: string = null;

    _serverConfig: any = null;
    _shareCallback: Function = null;

    //@ts-ignore
    swan: any = window.swan;
    public get ServerConfig() {
        return this._serverConfig;
    }

    _sysInfo: any = {};
    public get SysInfo() {
        return this._sysInfo;
    }

    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.baiduconfig.version;
    }

    //设备UID
    _uid: string = "0";

    public get uid() {
        // if (this._service_uid != "0") return this._uid;
        // this._login();
        return "0";
    }

    //服务器返回UID
    _service_uid: string = "0";

    /**
     * 服务器返回UID
     */
    public get serviceId() {
        if (this._service_uid != "0") return this._service_uid;
        this.reportLogin();
        return "0";
    }


    _loginTime: number = 0;
    _loginInterval: number = 30;
    async _login() {

        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._loginTime) / 1000;
        if (interval > 0 && interval < 30) {
            utils.showLog(`登录请求间隔小于：${this._loginInterval}秒`);
            return;
        }
        this._loginTime = curTime;
        let self = this;
        utils.showLog("baidu暂时不获取uid，uid全部为0");
        this._uid = "0";
        // this.reportLogin();

    }

    _reportLoginTime: number = 0;
    _reportLoginInterval: number = 30;
    isReport: boolean = false;

    /**
     * 上报登录接口获取UID
     */
    reportLogin() {
        if (this.isReport) return;
        this.isReport = true;
        let self = this;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - self._reportLoginTime) / 1000;
        console.log(curTime, curTime - self._reportLoginTime, interval)
        if (interval > 0 && interval < 30) {
            utils.showLog(`上报登录获取UID小于：${self._reportLoginInterval}秒`);
            return;
        }
        self._reportLoginTime = curTime;
        let method = "m=login";
        let url: string = ST_ServerUrl + method + `&device_data=0`;

        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                if (data) {
                    let result = JSON.parse(data);
                    utils.showLog("data=" + data);
                    utils.showLog("result=" + result);
                    utils.showLog("result.uid=" + result.uid);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        console.log("self._service_uid:" + self._service_uid)
                        utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage.setItem(YZ_Constant.ST_SERVICE_UID, self._service_uid);
                    }
                }
            } else {
                utils.showLog("获取数据失败1");
            }
            this.isReport = false;
        })
    }
    /**
     * 
     * @param data 配置数据
     */
    public init(data: string) {
        if (PlatUtils.IsBaidu) {
            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.baidu) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.baidu);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";

            // 获取系统信息
            this._sysInfo = this.swan.getSystemInfoSync();
            if (this._sysInfo) {
                utils.showLog("百度小游戏平台信息: ", JSON.stringify(this._sysInfo));
            } else {
                utils.showLog("系统信息获取失败!");
            }

            this._loadConfig();

            if (this.canRecord()) {
                this._recorder = this.swan.getVideoRecorderManager();
                if (this._recorder) {
                    this._recorder.onStart((res) => {
                        utils.showLog("开始录屏回调: ", res);
                        utils.isRecording = true;
                        cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
                    });

                    this._recorder.onStop((res) => {
                        utils.showLog("结束录屏回调: ", res.videoPath);
                        utils.isRecording = false;
                        this._videoPath = res.videoPath;
                        cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    });

                    this._recorder.onError((err) => {
                        utils.isRecording = false;
                        if (err) {
                            utils.showLog("录屏出错 : ", err.errCode, err.errMsg);
                            cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                        }
                    })
                }
            }

            // 显示左上角的分享菜单
            this.swan.showShareMenu();
            this.swan.onShareAppMessage(() => {
                return this._getShareInfo();
            });
        }
    }

    _loadConfig() {
        if (PlatUtils.IsBaidu) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                if (ret) {
                    utils.showLog("百度服务器配置数据获取成功: data = ", data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("百度服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("百度服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.baiduconfig.bannerId = this._serverConfig.banner_pos_id;
                        utils.config.baiduconfig.videoId = this._serverConfig.video_pos_id;
                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                }
                utils.emitServerInitEvent();
            });
        }
    }


    /**
     * 显示推荐游戏按钮
     */
    public showRecommendationButton(params: any) {
        let styleParams: any = params;
        if (PlatUtils.IsBaidu && this.canShowRecommendButton()) {
            if (false) {
                utils.showLog("按钮存在，直接显示");
                this._recommendationButton.show();
                this._setRecommendBtnStyle(this._recommendationButton, styleParams);
            } else {
                utils.showLog("创建并显示");
                this._recommendationButton = this.swan.createRecommendationButton({
                    type: 'list',
                    style: {
                        left: -300,
                        top: -300
                    }
                });

                if (this._recommendationButton) {
                    // 监听按钮资源加载完成
                    this._recommendationButton.onLoad(() => {
                        // 显示按钮
                        this._recommendationButton.show();
                        this._setRecommendBtnStyle(this._recommendationButton, styleParams);
                    });

                    this._recommendationButton.onError((err) => {
                        if (err) {
                            utils.showLog("交叉推广按钮出错 : ", err.errCode, err.errMsg);
                        }
                    });

                    // 触发资源加载
                    this._recommendationButton.load();
                }
            }

            return this._recommendationButton;
        } else {
            return null;
        }
    }

    _setRecommendBtnStyle(btn: any, params: any) {
        if (btn) {
            let left: number = 0;
            let top: number = 0;

            if (params) {
                utils.showLog("params:", params);
                if (params.left) {
                    left = params.left / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
                } else if (params.right) {
                    left = this._sysInfo.screenWidth - params.right / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth - btn.style.width;
                }

                if (params.top) {
                    top = params.top / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight;
                } else if (params.bottom) {
                    top = this._sysInfo.screenHeight - params.bottom / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight - btn.style.height;
                }
            }

            utils.showLog(`top:${top}; left:${left}`);
            btn.style.top = top;
            btn.style.left = left;
        }
    }

    /**
     * 隐藏推荐游戏按钮
     */
    public hideRecommendationButton() {
        if (PlatUtils.IsBaidu && this.canShowRecommendButton()) {
            if (this._recommendationButton) {
                this._recommendationButton.hide();
            }
        }
    }

    /**
    * 开始录屏
    */
    public recordStart() {
        if (PlatUtils.IsBaidu && this.canRecord()) {
            utils.showLog("开始录屏");
            if (this._recorder) {
                this._recorder.start({
                    duration: 120
                });
            }
        }
    }

    /**
     * 结束录屏
     */
    public recordEnd() {
        if (PlatUtils.IsBaidu && this.canRecord()) {
            utils.showLog("结束录屏");
            if (this._recorder) {
                this._recorder.stop();
            }
        }
    }

    /**
     * 分享录屏
     */
    public shareVideo() {
        if (PlatUtils.IsBaidu) {
            if (this._videoPath) {
                let self = this;
                this.swan.shareVideo({
                    videoPath: this._videoPath,
                    success() {
                        utils.showLog('分享成功');
                        self._videoPath = "";
                        if (self._shareCallback) {
                            self._shareCallback(true);
                        }
                    },
                    fail(res) {
                        self._videoPath = "";
                        utils.showLog('分享失败');
                        if (self._shareCallback) {
                            self._shareCallback(false, "分享失败!");
                        }
                    }
                });
            }
        }
    }

    /**
     * 分享图片
     */
    public shareImage() {
        if (PlatUtils.IsBaidu) {
            this.swan.shareAppMessage(this._getShareInfo());
        }
    }

    /**
     * 分享，有录屏就分享录屏，没有录屏就分享图片
     */
    public share(callback: Function) {
        if (PlatUtils.IsBaidu) {
            this._shareCallback = callback;
            if (this._videoPath) {
                this.shareVideo();
            } else {
                this.shareImage();
            }
        }
    }

    _getShareInfo() {
        if (PlatUtils.IsBaidu) {
            let shareInfo = utils.getShareInfo();
            let self = this;
            if (shareInfo) {
                return {
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl,
                    success: function (res) {
                        if (self._shareCallback) {
                            self._shareCallback(true);
                        }
                        utils.showLog("分享成功!");
                    },
                    fail: function (err) {
                        if (self._shareCallback) {
                            self._shareCallback(false, "分享失败!");
                        }
                        utils.showLog("分享失败!");
                    }
                }
            }
        }
        return {};
    }

    /**
     * 是否可以录屏
     */
    public canRecord() {
        if (PlatUtils.IsBaidu) {
            if (this._sysInfo) {
                return this._compareVersion(this._sysInfo.SDKVersion, "1.4.1") && PlatUtils.IsAndroid;
            }
            return false;
        }
        return false;
    }

    /**
     * 是否可以显示交叉推广按钮
     */
    public canShowRecommendButton() {
        if (PlatUtils.IsBaidu) {
            if (this._sysInfo) {
                return this._compareVersion(this._sysInfo.SDKVersion, "1.5.2") && PlatUtils.IsAndroid;
            }
            return false;
        }
        return false;
    }

    /**
    * 是否可以显示添加到我的小程序引导
    */
    public canShowFavoriteGuide() {
        if (PlatUtils.IsBaidu) {
            if (this._sysInfo) {
                return this._compareVersion(this._sysInfo.SDKVersion, "1.7.2");
            }
            return false;
        }
        return false;
    }



    _compareVersion(first: string, second: string) {
        return parseInt(first.split(".").join("")) >= parseInt(second.split(".").join(""));
    }


    /**
     * 跳转到指定的小游戏
     * @param pkgName 包名
     * @param callback Function(ret) 跳转回调. ret: true | false
     */
    public navigateToMiniGame(pkgName: string, callback: Function) {
        if (PlatUtils.IsBaidu) {
            let completeCallback: Function = callback;
            if (!pkgName) {
                utils.showLog("跳转ID为null");
                if (completeCallback) {
                    completeCallback(false);
                }
                return;
            }

            this.swan.navigateToMiniProgram({
                appKey: pkgName,
                path: "",
                extraData: {},
                success: (res) => {
                    utils.showLog("跳转成功！");
                    if (completeCallback) {
                        completeCallback(true);
                    }
                },
                fail: (error) => {
                    utils.showLog("跳转失败!");
                    if (completeCallback) {
                        completeCallback(false);
                    }
                }
            });
        }
    }

    /**
     * 上报数据
     */
    public postData(otherGameAppId: string) {
        if (PlatUtils.IsBaidu) {
            let appid: string = utils.config.baiduconfig.appID;
            let uid: string = "0";
            let channel: string = "baidu";
            let method = "m=jump";
            let url: string = `${POST_ServerUrl} + ${method} + &app_id=${appid}&uid=${uid}&channel=${channel}&jump_app_id=${otherGameAppId}`;
            utils.showLog("上报数据, url=", url);
            utils.commomHttpRequest(url, (ret, data) => {
                if (ret) {
                    utils.showLog("数据上报成功！");
                } else {
                    utils.showLog("数据上报失败！");
                }
            });
        }
    }

    /**
     * 获取交叉推广数据
     */
    public getRecommondGameList() {
        if (PlatUtils.IsBaidu
            && utils.Tool_Baidu
            && utils.Tool_Baidu.ServerConfig) {
            return utils.Tool_Baidu.ServerConfig.jump_list;
        }

        return null;
    }
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsBaidu) {
            let method = "m=rlevel";
            let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("关卡数据上报成功！");
                } else {
                    utils.showLog("关卡数据上报失败！");
                }
            }.bind(this));
        }
    }

    /**
  * 上报自定义事件
  * @param level 当前关卡ID
  * @param levelName 关卡名称
  * @param status 状态
  */
    public sendEvent(eventName: string) {
        if (PlatUtils.IsBaidu) {
            let method = "m=revent";
            let url: string = POST_ServerUrl + method + `&event=${encodeURI(eventName)}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("上报自定义事件成功！");
                } else {
                    utils.showLog("上报自定义事件失败！");
                }
            }.bind(this));
        }
    }


    /**
     * 弹出提示框
     * @param msg 消息
     */
    public showToast(msg: string) {
        if (PlatUtils.IsBaidu) {
            //@ts-ignore
            swan.showToast({
                title: msg,
                icon: "none",
                duration: 2000,
                success(res) {
                    console.log(`${res}`);
                },
                fail(res) {
                    console.log(`showToast调用失败`);
                }
            });
        }
    }
}
