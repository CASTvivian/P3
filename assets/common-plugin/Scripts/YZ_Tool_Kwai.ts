import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";
// 默认配置
let ST_DefaultServerConfig: string = "";
@ccclass
export default class YZ_Tool_Kwai {
    _recorder: any = null;
    _videoPath: string = null;

    _shareCallback: Function = null;


    recorderStarTime: number = 0; //开始录屏时间
    isAutoShare: boolean = true;  //是否自动分享
    isClickEnd: boolean = false;

    _serverConfig: any = null;

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
        return utils.config.kwaiConfig.version;
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
    //@ts-ignore
    kwaigame: any = kwaigame;


    /**
     * 上报登录接口获取UID
     */
    reportLogin() {
        if (this.isReport) return;
        this.isReport = true;
        let self = this;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - self._reportLoginTime) / 1000;
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
        if (PlatUtils.IsKwai) {


            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.kwai) {
                    utils.showLog("本地配置数据:" + JSON.stringify(configObj.kwai));
                    ST_DefaultServerConfig = JSON.stringify(configObj.kwai);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";

            // // 获取系统信息
            // this._sysInfo = this.swan.getSystemInfoSync();
            // if (this._sysInfo) {
            //     utils.showLog("百度小游戏平台信息: ", JSON.stringify(this._sysInfo));
            // } else {
            //     utils.showLog("系统信息获取失败!");
            // }

            this._loadConfig();
            this.initRecord();

            // utils.emitServerInitEvent();


        }
    }


    readyGo() {
        this.kwaigame.readyGo();
    }

    _loadConfig() {
        if (PlatUtils.IsKwai) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                if (ret) {
                    utils.showLog("快手服务器配置数据获取成功: data = ", data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("快手服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("快手服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {

                    if (this._serverConfig.shares && this._serverConfig.shares.sy_title) {
                        utils.config.otherconfig.shareTitle = this._serverConfig.shares.sy_title;
                    }
                    if (this._serverConfig.shares && this._serverConfig.shares.sy_img) {
                        utils.config.otherconfig.shareImgUrl = this._serverConfig.shares.sy_img;
                    }

                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.kwaiConfig.videoId = this._serverConfig.video_pos_id;
                        utils.config.kwaiConfig.insertId = this._serverConfig.intersititia_pos_id || utils.config.kwaiConfig.insertId;
                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                }
                utils.emitServerInitEvent();
            });
        }
    }



    initRecord() {
        if (!this.checkCanShowRecored()) {
            utils.showLog("当前平台不支持录屏组件！");
            return;
        }
        this._recorder = this.kwaigame.createMediaRecorder();
        if (this._recorder) {
            this._recorder.init({
                callback: (error) => {
                    if (error) {
                        utils.showLog("录屏初始化失败: " + JSON.stringify(error));
                        this._recorder = null;
                        return;
                    }
                    utils.showLog("录屏初始化成功");
                }
            });

            this._recorder.onError({
                listener: (error) => {
                    utils.isRecording = false;
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    utils.showLog("录屏终止: " + JSON.stringify(error));
                }
            });
        }


        // if (this._recorder) {
        //     this._recorder.onStart((res) => {
        //         self._videoPath = "";
        //         this.isClickEnd = false;
        //         this.is_auto_share_video = false;
        //         utils.isRecording = true;
        //         console.log("录屏开始>>>");
        //         utils.showLog('录屏开始');
        //         this.recorderStarTime = new Date().getTime();
        //         cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
        //     });

        //     this._recorder.onStop((res) => {
        //         utils.showLog("录屏结束 :" + res.videoPath);
        //         utils.isRecording = false;
        //         cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });


        //         let curTime: number = new Date().getTime();
        //         let interval: number = (curTime - this.recorderStarTime) / 1000;

        //         if (interval > 3) {
        //             self._videoPath = res.videoPath;
        //             utils.showLog("录屏时间大于3秒", interval);
        //             if (this.isAutoShare) {
        //                 if (this.isClickEnd) {
        //                     this.shareVideo();
        //                     this._shareCallback = null;
        //                     this.is_auto_share_video = true;
        //                 } else if (utils.checkResultShow(1)) {
        //                     utils.showLog("满足自动分享条件，弹出分享窗口！");
        //                     if (utils.rewardCloseFunc == null) {
        //                         utils.rewardValue = 0;
        //                         utils.showShareRecordPanel();
        //                     }
        //                 } else if (interval > 100) {
        //                     if (utils.rewardCloseFunc == null) {
        //                         utils.rewardValue = 0;
        //                         utils.showShareRecordPanel();
        //                     }
        //                 }
        //             } else {
        //                 this.isAutoShare = true;
        //             }
        //         } else {
        //             //@ts-ignore
        //             if (this.isClickEnd) {
        //                 this.tt.showToast({
        //                     title: "录屏时间小于3秒!",
        //                     icon: "fail",
        //                     duration: 2000,
        //                     success(res) {
        //                         console.log(`${res}`);
        //                     },
        //                     fail(res) {
        //                         console.log(`showToast调用失败`);
        //                     }
        //                 });
        //             }

        //             self._videoPath = "";

        //             utils.showLog("录屏时间小于3秒，录录屏地址置空！");
        //         }


        //     });
        // }
    }
    /**
     * 分享，有录屏就分享录屏，没有录屏就分享图片
     */
    public share(callback: Function) {
        if (PlatUtils.IsKwai) {
            this._shareCallback = callback;
            if (this.recorderStarTime > 0) {
                this.shareVideo();
            } else {
                this.shareImage();
            }
        }
    }

    /**
     * 验证是否支持录屏
     */
    checkCanShowRecored() {
        return this.kwaigame.isSupport(this.kwaigame.Support.features.Recorder);
    }


    /**
     * 分享录屏
     */
    shareVideo() {
        if (this._recorder) {
            if (!this._canShowRecord) {
                this._shareCallback && this._shareCallback(false, "录屏时间不足!")
                return;
            }
            this._recorder.publishVideo({
                callback: (error) => {
                    if (error) {
                        utils.showLog("分享录屏失败: " + JSON.stringify(error));
                        this._shareCallback && this._shareCallback(false, "分享录屏失败!")
                        return;
                    }
                    this._canShowRecord = false;
                    utils.showLog("分享录屏成功");
                    this._shareCallback && this._shareCallback(true, "分享录屏成功!")
                }
            });
        } else {
            if (this.checkCanShowRecored()) {
                utils.showLog("当前平台不支持录屏组件！");
            } else {
                utils.showLog("录屏初始化失败！");
            }

            this._shareCallback && this._shareCallback(false, "分享录屏失败!")
        }
    }
    /**
     * 开始录屏
     */
    public recordStart() {
        if (this._recorder) {
            this._recorder.start({
                callback: (error) => {
                    if (error) {
                        utils.isRecording = false;
                        utils.showLog("开始录屏失败: " + JSON.stringify(error));
                        return;
                    }
                    this._canShowRecord = false;
                    utils.isRecording = true;
                    this.recorderStarTime = new Date().getTime();
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
                    utils.showLog("开始录屏成功");
                }
            });
        }
    }


    _canShowRecord: boolean = false;
    /**
     * 结束录屏
     */
    public recordEnd() {
        if (this._recorder) {
            this._recorder.stop({
                callback: (error) => {
                    utils.isRecording = false;
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });
                    this._canShowRecord = false;
                    if (error) {
                        utils.showLog("停止录屏失败: " + JSON.stringify(error));
                        return;
                    }

                    utils.showLog("停止录屏成功");


                    let curTime: number = new Date().getTime();
                    let interval: number = (curTime - this.recorderStarTime) / 1000;

                    if (interval > 3) {
                        this._canShowRecord = true;
                        utils.showLog("录屏时间大于3秒", interval, " isClickEnd=", this.isClickEnd);
                        if (this.isAutoShare) {
                            if (this.isClickEnd) {
                                this.shareVideo();
                                this._shareCallback = null;
                            } else if (utils.checkResultShow(1)) {
                                utils.showLog("满足自动分享条件，弹出分享窗口！");
                                if (utils.rewardCloseFunc == null) {
                                    utils.rewardValue = 0;
                                    utils.showShareRecordPanel();
                                }
                            } else if (interval > 100) {
                                if (utils.rewardCloseFunc == null) {
                                    utils.rewardValue = 0;
                                    utils.showShareRecordPanel();
                                }
                            }
                        } else {
                            this.isAutoShare = true;
                        }
                    } else {
                        //@ts-ignore
                        if (this.isClickEnd) {
                            //     this.tt.showToast({
                            //         title: "录屏时间小于3秒!",
                            //         icon: "fail",
                            //         duration: 2000,
                            //         success(res) {
                            //             console.log(`${res}`);
                            //         },
                            //         fail(res) {
                            //             console.log(`showToast调用失败`);
                            //         }
                            //     });
                        }

                        // self._videoPath = "";

                        utils.showLog("录屏时间小于3秒，录录屏地址置空！");
                    }
                }
            });
        }
    }


    shareImage() {
        this.kwaigame.shareToMsg(this._getShareInfo());
    }

    _getShareInfo() {

        let params: any = {};
        params.title = utils.config.otherconfig.shareTitle;
        params.desc = utils.config.otherconfig.shareDesc ? utils.config.otherconfig.shareDesc : utils.config.otherconfig.shareTitle;
        params.iconUrl = utils.config.otherconfig.shareIcon ? utils.config.otherconfig.shareIcon : utils.config.otherconfig.shareImgUrl;
        params.imageUrl = utils.config.otherconfig.shareImgUrl;
        params.extension = {
            isShare: "share"
        };
        params.response = (result) => {
            utils.showLog("分享完成: " + JSON.stringify(result));
            this._shareCallback && this._shareCallback(true, "分享成功!");
        }
        return params;
    }


    /**
    * 上报关卡数据
    * @param level 当前关卡ID
    * @param levelName 关卡名称
    * @param status 状态
    */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsKwai) {
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
        if (PlatUtils.IsKwai) {
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



    _compareVersion(first: string, second: string) {
        return parseInt(first.split(".").join("")) >= parseInt(second.split(".").join(""));
    }

}
