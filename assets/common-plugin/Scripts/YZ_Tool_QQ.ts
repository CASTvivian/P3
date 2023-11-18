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
export default class YZ_Tool_QQ {

    /**
   * 服务器配置信息
   */
    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    _sysInfo: any = {};
    public get SysInfo() {
        return this._sysInfo;
    }


    // 桌面图标是否创建
    _shortcutCreated: boolean = false;
    public get ShortcutCreated() {
        return this._shortcutCreated;
    }

    _shareCallback: Function = null;
    _isShare: boolean = false;

    //设备UID
    _uid: string = "0";

    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.qqconfig.version;
    }

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
        utils.showLog("qq暂时不获取uid，uid全部为0");
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
        // utils.showLog(interval, " <<<<<<,interval", " _reportLoginTime >>>", self._reportLoginTime);
        // console.log(curTime, curTime - self._reportLoginTime, interval)
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
        if (PlatUtils.IsQQ) {

            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.qq) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.qq);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";

            try {
                //@ts-ignore
                this._sysInfo = qq.getSystemInfoSync()
                utils.showLog("QQ 小游戏平台信息: ", JSON.stringify(this.SysInfo));
            } catch (e) {
                utils.showLog("QQ 小游戏平台数据获取失败!");
            }

            this._loadConfig();

            // 开启右上角转发
            //@ts-ignore
            qq.showShareMenu();
            //@ts-ignore
            qq.onShareAppMessage(this._getShareInfo.bind(this));

            //@ts-ignore
            qq.onShow((res) => {
                utils.showLog("OnShow: ", res);
                if (this._isShare) {
                    this._isShare = false;
                    if (this._shareCallback) {
                        this._shareCallback(true, "分享成功!");
                    }
                }
            });

            utils.registerServerInitEvent(() => {
                if (this.canCreateShortcut()) {
                    if (utils.ServerConfig && utils.ServerConfig.start_auto_create_short_cut_time) {
                        utils.SendEvent("组件初始化成功，弹出自动创建桌面！");
                        utils.showLog(`组件初始化成功，${utils.ServerConfig.start_auto_create_short_cut_time}秒后弹出自动创建桌面！`)
                        setTimeout(() => {
                            this.createShortcut((res) => {
                                if (res) {
                                    utils.showLog("自动创建桌面成功！");
                                } else {
                                    utils.showLog("自动创建桌面失败！");
                                }
                            });
                        }, utils.ServerConfig.start_auto_create_short_cut_time * 1000);
                    }
                }

                if (utils.ServerConfig && utils.ServerConfig.auto_add_favorites && utils.ServerConfig.auto_add_favorites == "true") {
                    utils.showLog('自动添加到搜藏');
                    this.addFavorites();
                }


                utils.showLog('组件初始化完成,验证是否登陆！', utils.ServerConfig.add_recent_color_sign);
                if (utils.ServerConfig && utils.ServerConfig.add_recent_color_sign) {
                    if (utils.ServerConfig.add_recent_color_sign == 1) {
                        this.addColorSign();
                    } else {
                        //@ts-ignore
                        qq.checkSession({
                            success: () => {
                                utils.showLog("session_key 未过期，并且在本生命周期一直有效");
                                this.addRecentColorSign();
                                // session_key 未过期，并且在本生命周期一直有效
                            },
                            fail: () => {
                                // session_key 已经失效，需要重新执行登录流程
                                //@ts-ignore
                                qq.login({
                                    success: (res) => {
                                        if (res.code) {
                                            utils.showLog('登录成功！');
                                            this.addRecentColorSign();
                                        } else {
                                            utils.showLog('登录失败！' + res.errMsg)
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }, this);



        }
    }

    /**
    * 添加到彩签
    */
    addRecentColorSign() {
        utils.showLog("调用添加彩签>>>>>>>");
        //@ts-ignore
        qq.addRecentColorSign({
            query: 'a=1&b=2',
            success(res) {
                utils.showLog('addRecentColorSign success: ', res);
            },
            fail(err) {
                utils.showLog('addRecentColorSign fail: ', err);
            },
            complete(res) {
                utils.showLog('addRecentColorSign complete: ', res);
            }
        })
    }

    _loadConfig() {
        if (PlatUtils.IsQQ) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                if (ret) {
                    utils.showLog("QQ服务器配置数据获取成功: data = ", data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("QQ服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("QQ服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.shares) {
                        if (this._serverConfig.shares.sy_title) {
                            utils.config.otherconfig.shareTitle = this._serverConfig.shares.sy_title;
                        }
                        if (this._serverConfig.shares.sy_img) {
                            utils.config.otherconfig.shareImgUrl = this._serverConfig.shares.sy_img;
                        }
                    }

                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                        utils.config.qqconfig.bannerId = this._serverConfig.banner_pos_id;
                        utils.config.qqconfig.insertId = this._serverConfig.intersititia_pos_id;
                        utils.config.qqconfig.videoId = this._serverConfig.video_pos_id;
                        utils.config.qqconfig.boxId = this._serverConfig.box_pos_id;
                        utils.config.qqconfig.bannerBoxId = this._serverConfig.banner_box_pos_id;


                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                }
                utils.emitServerInitEvent();
            });
        }
    }


    public getSystemInfo() {
        if (PlatUtils.IsQQ) {
            return this._sysInfo;
        }
    }



    public share(callback: Function = null) {
        if (PlatUtils.IsQQ) {
            this._shareCallback = callback;
            this._isShare = true;
            //@ts-ignore
            qq.shareAppMessage(this._getShareInfo());
        }
    }

    /**
     * 上报数据
     */
    public postData(otherGameAppId: string) {
        if (PlatUtils.IsQQ) {
            let appid: string = utils.config.qqconfig.appID;
            let uid: string = "0";
            let channel: string = "qq";
            let url: string = `https://apps.youlesp.com/gs?m=jump&app_id=${appid}&uid=${uid}&channel=${channel}&jump_app_id=${otherGameAppId}`;
            utils.showLog("上报数据, url=", url);
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("数据上报成功！");
                } else {
                    utils.showLog("数据上报失败！");
                }
            });
        }
    }

    _getShareInfo() {
        if (PlatUtils.IsQQ) {
            return {
                title: utils.config.otherconfig.shareTitle,
                imageUrl: utils.config.otherconfig.shareImgUrl
            };
        }

        return {};
    }

    public isOverMinVersion(minVersion: string) {
        let curVersion: string = this._sysInfo.SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0;
    }


    _compareVersion(v1, v2) {
        if (!v1 || !v2) return -1;

        v1 = v1.split('.')
        v2 = v2.split('.')
        const len = Math.max(v1.length, v2.length)

        while (v1.length < len) {
            v1.push('0')
        }
        while (v2.length < len) {
            v2.push('0')
        }

        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i])
            const num2 = parseInt(v2[i])

            if (num1 > num2) {
                return 1
            } else if (num1 < num2) {
                return -1
            }
        }

        return 0
    }

    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsQQ) {

            if (status == LevelStatus.GameWin) {
                if (this.ServerConfig.rankey) {
                    //排行帮提交数据
                    let postKey = this.ServerConfig.rankey ? this.ServerConfig.rankey : "ranklevel";
                    let postValue = level;
                    //@ts-ignore
                    qq.setUserCloudStorage(
                        {
                            KVDataList: [
                                { key: postKey, value: postValue }
                            ],
                            success: function (res) {
                                utils.showLog('关卡记录成功');
                            },
                            fail: function (res) {
                                utils.showLog('关卡记录失败');
                            },
                            complete: function (res) {
                                utils.showLog('关卡记录调用完成');
                            },
                        })
                }
                let interval = this.ServerConfig.subscribe_interval;
                if (interval) {
                    try {
                        if (parseInt(level) % interval == 0) {
                            // 长期订阅
                            //@ts-ignore 
                            qq.subscribeAppMsg({
                                subscribe: true,
                                success(res) {
                                    utils.showLog("----添加订阅消息----成功", res);
                                },
                                fail(res) {
                                    utils.showLog("----添加订阅消息----失败", res);
                                }
                            });
                        }
                    } catch (error) {
                        utils.showLog("----添加订阅消息----异常");
                    }
                }
            }






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
        if (PlatUtils.IsQQ) {
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
        if (PlatUtils.IsQQ) {
            //@ts-ignore
            qq.showToast({
                title: msg,
                icon: "none",
                duration: 2000
            })
        }
    }


    /**
    * 是否可以创建桌面图标, 当前平台是否支持创建快捷方式
    */
    public canCreateShortcut() {
        console.log("canCreateShortcut ", this.isOverMinVersion("1.7.1"));
        if (PlatUtils.IsQQ && PlatUtils.IsAndroid) {
            return this.isOverMinVersion("1.7.1");
        }
        return false;
    }

    /**
     * 创建桌面图标
     */
    public createShortcut(callback: Function) {
        let callbackFunc = callback;

        if (PlatUtils.IsQQ && this.canCreateShortcut()) {
            //@ts-ignore
            qq.saveAppToDesktop({
                success: () => {
                    utils.showLog('桌面图标创建成功！');
                    this._shortcutCreated = true;
                    if (callbackFunc) {
                        callbackFunc(true);
                    }
                },
                fail: (err) => {
                    utils.showLog('qq创建桌面失败err' + err);
                    if (callbackFunc) {
                        callbackFunc(false);
                    }
                },
                complete: function () {
                }
            });
        } else {
            utils.showLog("当前平台版本不支持创建桌面");
            if (callbackFunc) {
                callbackFunc(false);
            }
        }
    }


    /**

     * 添加收藏

     * **/

    addFavorites() {
        utils.showLog('addFavorites >>>>');
        let fav = YZ_LocalStorage.getItem("qq_favorites");
        if ("1" == fav) {
            utils.showLog('had addToFavorites')
            return
        }

        let title = "好游戏哦";

        let img = "";

        if (utils.config.otherconfig) {
            if (utils.config.otherconfig.shareTitle) {
                title = utils.config.otherconfig.shareTitle
            }
            if (utils.config.otherconfig.shareImgUrl) {
                img = utils.config.otherconfig.shareImgUrl
            }
        }

        //@ts-ignore
        qq.addToFavorites({
            title: title,
            imageUrl: img,
            query: 'a=1&b=2',
            success: function (res) {
                utils.showLog('addToFavorites success', res)
                YZ_LocalStorage.setItem("qq_favorites", "1");
            },
            fail: function (err) {
                utils.showLog('addToFavorites fail', err)
            },
            complete: function (res) {
                utils.showLog('addToFavorites info', res)
            }
        })

    }



    /**
     * 添加普通彩签
     */
    addColorSign() {
        //@ts-ignore
        qq.addColorSign({
            success: function (res) {
                utils.showLog('addColorSign success', res)
            },
            fail: function (err) {
                utils.showLog('addColorSign fail', err)
            },
            complete: function (res) {
                utils.showLog('addColorSign info', res)
            }
        })


    }

    /**
     * 退出游戏
     */
    public GameExit() {
        if (PlatUtils.IsQQ) {
            utils.showLog("tool qq GameExit");
            try {
                //@ts-ignore
                qq.exitMiniProgram()
            } catch (error) {
                cc.log(error);
            }
        }
    }

}
