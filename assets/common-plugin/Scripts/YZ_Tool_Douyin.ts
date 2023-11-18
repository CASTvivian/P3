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
export default class YZ_Tool_Douyin {

    _recorder: any = null;
    _videoPath: string = null;

    _shareCallback: Function = null;


    recorderStarTime: number = 0; //开始录屏时间
    isAutoShare: boolean = true;  //是否自动分享
    isClickEnd: boolean = false;
    isNewsArticleLite: boolean = false; //是否头条极速版
    //@ts-ignore
    tt = window.tt;
    /**
     * 服务器配置信息
     */
    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }


    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.douyinconfig.version;
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
        utils.showLog("douying暂时不获取uid，uid全部为0");
        this._uid = "0";

        // this.reportLogin();

    }

    login() {
        utils.showLog("douying login");
        //@ts-ignore
        tt.login({
            withRealNameAuthenticationInfo: true,
            success: (_res) => {
                utils.showLog("登录成功");
                // 调用 getUserInfo 前, 请确保登录成功
                //实名认证需要用户点击触发
                //@ts-ignore
                // 获取用户信息
                tt.getUserInfo({
                    // withCredentials: true,
                    withRealNameAuthenticationInfo: true,
                    success: (res) => {
                        utils.showLog(`getUserInfo 调用成功`, res.userInfo);
                        if (res.userInfo) {
                            if (res.userInfo.realNameAuthenticationStatus && res.userInfo.realNameAuthenticationStatus == "uncertified") {
                                utils.showLog(`getUserInfo 用户未进行实名制！`);
                                this.realNameAuth();
                            } else if (res.userInfo.realNameAuthenticationStatus && res.userInfo.realNameAuthenticationStatus == "certified") {
                                utils.showLog(`getUserInfo 用户已实名制！`);
                                cc.game.emit(YZ_Constant.ST_LOGIN_SUCCESS);
                            } else {
                                cc.game.emit(YZ_Constant.ST_LOGIN_FAIL);
                            }
                        }
                    },
                    fail(res) {
                        utils.showLog(`getUserInfo 调用失败`, res.errMsg);
                    }
                })
            },
            fail: () => {
                cc.game.emit(YZ_Constant.ST_LOGIN_FAIL);
                this.showToast("登录失败！");
            }
        });
    }

    realNameAuth() {
        utils.showLog("douying realNameAuth");
        //@ts-ignore
        tt.authenticateRealName({
            success: (_res) => {
                utils.showLog("用户实名认证成功");
                cc.game.emit(YZ_Constant.ST_LOGIN_SUCCESS);
            },
            fail: (res) => {
                this.showToast("实名制认证失败，请稍后重试！");
                cc.game.emit(YZ_Constant.ST_LOGIN_FAIL);
                utils.showLog("用户实名认证失败", res.errMsg);
            },
        });
    }


    _reportLoginTime: number = 0;
    _reportLoginInterval: number = 30;
    isReport: boolean = false;

    _jumpIds: string = "";

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
    _sysInfo: any = null;

    //是否是点完暂停按钮后自动分享得录屏
    is_auto_share_video: boolean = false;
    /**
     * 自动分享次数
    */
    recored_share_count: number = 0;
    appLaunchOptions: any[] = [];
    /**
     * 
     * @param data 配置数据.
     */
    public init(data: string) {

        if (PlatUtils.IsDouyin) {
            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.toutiao) {
                    utils.showLog("本地配置数据:" + JSON.stringify(configObj.toutiao));
                    ST_DefaultServerConfig = JSON.stringify(configObj.toutiao);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";

            this._sysInfo = this.tt.getSystemInfoSync();
            utils.showLog("抖音平台信息：" + JSON.stringify(this._sysInfo));
            if (this._sysInfo && this._sysInfo.appName && this._sysInfo.appName == "news_article_lite") {
                this.isNewsArticleLite = true;
            }


            // // 拉取服务器配置
            // this.loadJumpIds().then(() => {
            //     console.log("本地跳转ID加载成功！");
            //     this._loadConfig();
            // }).catch((erro) => {
            //     console.error("本地跳转ID加载失败：", erro);
            this._loadConfig();
            // })


            let self = this;

            this._recorder = this.tt.getGameRecorderManager();
            if (this._recorder) {
                this._recorder.onStart((res) => {
                    self._videoPath = "";
                    this.isClickEnd = false;
                    this.is_auto_share_video = false;
                    utils.isRecording = true;
                    console.log("录屏开始>>>");
                    utils.showLog('录屏开始');
                    this.recorderStarTime = new Date().getTime();
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordStart" });
                });

                this._recorder.onStop((res) => {
                    utils.showLog("录屏结束 :" + res.videoPath);
                    utils.isRecording = false;
                    cc.game.emit("YZ_CommonMessage", { type: "YZ_RecordEnd" });


                    let curTime: number = new Date().getTime();
                    let interval: number = (curTime - this.recorderStarTime) / 1000;

                    if (interval > 3) {
                        self._videoPath = res.videoPath;
                        utils.showLog("录屏时间大于3秒", interval);
                        if (this.isAutoShare) {
                            if (this.isClickEnd) {
                                this.shareVideo();
                                this._shareCallback = null;
                                this.is_auto_share_video = true;
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
                            this.tt.showToast({
                                title: "录屏时间小于3秒!",
                                icon: "fail",
                                duration: 2000,
                                success(res) {
                                    console.log(`${res}`);
                                },
                                fail(res) {
                                    console.log(`showToast调用失败`);
                                }
                            });
                        }

                        self._videoPath = "";

                        utils.showLog("录屏时间小于3秒，录录屏地址置空！");
                    }


                });
            }

            // 开启右上角分享按钮
            //@ts-ignore
            this.tt.showShareMenu({
                withShareTicket: false
            });

            //@ts-ignore
            this.tt.onShareAppMessage((res) => {
                return self._getShareInfo();
            });


            utils.registerServerInitEvent(() => {
                if (this.ServerConfig.add_favorite) {
                    setTimeout(() => {
                        utils.showLog("延迟调用添加搜藏!!");
                        this.showFavoriteGuide();
                    }, this.ServerConfig.add_favorite * 1000);
                }

            }, this);
        }
    }


    /**
      * 添加搜藏
      */
    showFavoriteGuide() {
        if (this.tt.showFavoriteGuide) {
            this.tt.showFavoriteGuide({
                type: "bar",
                content: "一键添加到我的小程序",
                position: this.ServerConfig.favorite_type ? this.ServerConfig.favorite_type : "bottom",
                success(res: any) {
                    utils.showLog("引导组件展示成功");
                },
                fail(res: any) {
                    utils.showLog("引导组件展示失败:ero=" + JSON.stringify(res));
                },
            });
        } else {
            utils.showLog("当前头条版本不支持添加收藏！");
        }

    }

    loadJumpIds() {
        return new Promise((resolve, reject) => {
            cc.loader.load("game.json", (err, res) => {
                if (!err) {
                    res.ttNavigateToMiniGameAppIdList.forEach(element => {
                        this._jumpIds += element + ",";
                    });
                    this._jumpIds.substring(0, this._jumpIds.lastIndexOf(","));
                    //@ts-ignore
                    resolve();
                }
                reject(err);
            });
        });

    }




    _loadConfig() {
        if (PlatUtils.IsDouyin) {
            let method: string = "m=g";

            utils.commomHttpRequest(ST_ServerUrl + method + `&jump_id=${this._jumpIds}`, (ret, data) => {
                if (ret && data) {
                    utils.showLog("抖音服务器配置数据获取成功: data = " + data);
                    let result = JSON.parse(data);
                    if (!utils.DebugLoacalConfig) {
                        this._serverConfig = result;
                    } else {
                        utils.showLog("调试模式，使用本地配置!");
                    }
                } else {
                    utils.showLog("抖音服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this.ServerConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this.ServerConfig.is_local_pos_id == "false") {
                        utils.showLog("使用服务器下发的广告ID");
                        utils.config.douyinconfig.bannerId = this.ServerConfig.banner_pos_id;
                        utils.config.douyinconfig.insertId = this.ServerConfig.intersititia_pos_id;
                        utils.config.douyinconfig.videoId = this.ServerConfig.video_pos_id;
                    }

                    if (this._serverConfig.shares && this._serverConfig.shares.sy_title) {
                        utils.config.otherconfig.shareTitle = this._serverConfig.shares.sy_title;
                    }
                    if (this._serverConfig.shares && this._serverConfig.shares.sy_img) {
                        utils.config.otherconfig.shareImgUrl = this._serverConfig.shares.sy_img;
                    }
                }

                utils.emitServerInitEvent();
            });
        }
    }

    /**
    * 开始录屏
    */
    public recordStart() {
        if (PlatUtils.IsDouyin) {
            if (this._recorder) {
                this._recorder.start({
                    duration: this.ServerConfig.record_duration ? this.ServerConfig.record_duration : 120
                });
            }

        }
    }

    /**
     * 结束录屏
     */
    public recordEnd() {
        if (PlatUtils.IsDouyin) {
            this._recorder.stop();
        }
    }

    /**
     * 分享，有录屏就分享录屏，没有录屏就分享图片
     */
    public share(callback?: Function) {
        if (PlatUtils.IsDouyin) {
            this._shareCallback = callback;
            if (this._videoPath && !utils.isRecording) {
                this.shareVideo();
            } else {
                this.shareImage();
            }
        }
    }

    /**
     * 分享录屏
     */
    public shareVideo() {
        if (PlatUtils.IsDouyin) {
            if (this._videoPath) {
                let self = this;
                //@ts-ignore
                this.tt.shareAppMessage({
                    channel: 'video',
                    extra: {
                        videoPath: self._videoPath // 可用录屏得到的视频地址
                    },
                    success() {
                        cc.log('视频分享成功!');
                        if (self._shareCallback) {
                            self._shareCallback(true);
                        }
                    },
                    fail(e) {
                        cc.log('视频分享失败!', JSON.stringify(e));
                        self._videoPath = "";
                        let msg: string = "分享失败!";
                        if (e && e.errMsg) {
                            msg = e.errMsg;
                            if (msg.indexOf("fail") != -1) {
                                console.log(self._sysInfo);
                                if (self._sysInfo.appName == "XiGua") {
                                    msg = "分享失败!";
                                } else {
                                    // 视频太短
                                    msg = "分享失败，录屏时间太短！";
                                }

                            } else {
                                msg = "分享失败!";
                            }
                        }
                        if (self._shareCallback) {
                            self._shareCallback(false, msg);
                        }
                        if (self.is_auto_share_video) {
                            self.is_auto_share_video = false;
                            self.tt.showToast({
                                title: msg,
                                icon: "fail",
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
                });
            }
        }
    }

    /**
     * 分享图片
     */
    public shareImage() {
        if (PlatUtils.IsDouyin) {
            let shareInfo = utils.getShareInfo();
            utils.showLog(`分享图片：title:${shareInfo.title}; imageUrl:${shareInfo.imageUrl}`);
            if (shareInfo) {
                let self = this;
                //@ts-ignore
                this.tt.shareAppMessage({
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl,
                    success() {
                        utils.showLog('图片分享成功!');
                        if (self._shareCallback) {
                            self._shareCallback(true);
                        }
                    },
                    fail(e) {
                        utils.showLog('图片分享失败!' + JSON.stringify(e));
                        if (self._shareCallback) {
                            self._shareCallback(false);
                        }
                    }
                });
            }
        }
    }
    /**
     * 显示更多游戏按钮
     */
    public showMoreGamesButton(params: any) {
        if (PlatUtils.IsDouyin) {
            let left: number = 0;
            let top: number = 0;
            let width: number = 0;
            let height: number = 0;
            if (cc.view.getDesignResolutionSize().width < 1080) {
                width = 188 / 1080 * this._sysInfo.screenWidth;
                height = 223 / 1080 * this._sysInfo.screenWidth;
            } else {
                width = 188 / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
                height = 223 / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
            }

            if (params) {
                if (params.left) {
                    left = params.left / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth;
                } else if (params.right) {
                    left = this._sysInfo.screenWidth - params.right / cc.view.getDesignResolutionSize().width * this._sysInfo.screenWidth - width;
                }

                if (params.top) {
                    top = params.top / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight;
                } else if (params.bottom) {
                    top = this._sysInfo.screenHeight - params.bottom / cc.view.getDesignResolutionSize().height * this._sysInfo.screenHeight - height;
                }
            }

            utils.showLog(`更多游戏按钮参数：left:${left}; top:${top}; width:${width}; height:${height}`);
            //@ts-ignore
            return this.tt.createMoreGamesButton({
                type: "image",
                image: "img/more_game.png",
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                    lineHeight: 40,
                    backgroundColor: "#ff0000",
                    textColor: "#ffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 4,
                    borderWidth: 0,
                    borderColor: '#ff0000'
                },
                appLaunchOptions: [
                ],
                onNavigateToMiniGame(res) {
                    utils.showLog('跳转其他小游戏' + res)
                    if (res && res.errCode == 0) {
                        // 跳转成功
                    }
                }
            });
        }
    }

    _getShareInfo() {
        if (PlatUtils.IsDouyin) {
            let shareInfo = utils.getShareInfo();
            if (shareInfo) {
                return {
                    title: shareInfo.title,
                    imageUrl: shareInfo.imageUrl,
                    success: function (res) {
                        utils.showLog("分享成功!");
                    },
                    fail: function (err) {
                        utils.showLog("分享失败!");
                    }
                }
            }
        }
        return {};
    }

    /**
     * 比较当前平台版本是否高于指定的版本号
     * @param miniVersion 最低平台版本号
     */
    public isOverMiniVersion(miniVersion: string) {
        if (PlatUtils.IsDouyin) {
            if (this._sysInfo && miniVersion != null) {
                return this._compareVersion(this._sysInfo.SDKVersion, miniVersion);
            }
        }
        return false;
    }

    _compareVersion(first: string, second: string) {
        return parseInt(first.split(".").join("")) >= parseInt(second.split(".").join(""));
    }


    /**
     * 判断是否支持显示更多游戏弹窗
     */
    isShowMoreGamesModal() {

        if (PlatUtils.IsAndroid && this.tt.showMoreGamesModal) {
            return true;
        }
        utils.showLog("当前版本不支持显示抖音更多游戏弹窗！");
        return false;
    }
    /**
     * 持显示更多游戏弹窗
     */
    showMoreGamesModal() {
        if (PlatUtils.IsAndroid) {
            this.tt.showMoreGamesModal({
                appLaunchOptions: [],
                success(res) {
                    console.log("success", res.errMsg);
                },
                fail(res) {
                    console.log("fail", res.errMsg);
                }
            });
        } else {
            utils.showMsg("当前平台暂时不支持跳转");
        }
    }

    /**
   * 获取交叉推广数据
   */
    public getRecommondGameList() {
        if (PlatUtils.IsDouyin
            && this.ServerConfig) {
            return this.ServerConfig.jump_list;
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
        if (PlatUtils.IsDouyin) {
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
        if (PlatUtils.IsDouyin) {
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
        if (PlatUtils.IsDouyin) {
            //@ts-ignore
            tt.showToast({
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

    public GameExit() {
        //@ts-ignore
        tt.exitMiniProgram({
            success(res) {
                console.log("调用成功", res.data);
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    }
}
