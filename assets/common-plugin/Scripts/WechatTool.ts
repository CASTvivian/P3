import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { AttributedKey, AttributedType, AttributedValue, BannerLocationToEnum, LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

const ST_ServerUrl: string = "https://apps.youlesp.com/gss?";

/**
 * 游戏盒子的请求链接
 */
const GB_ServerUrl: string = "https://apps.youlesp.com/gbs?";

// 默认配置
let ST_DefaultServerConfig: string = "";
// 默认配置
let GB_DefaultServerConfig: string = "";
const ST_LoadConfigInterval: number = 5000; // 毫秒


@ccclass
export default class WechatTool {

    /**
     * 服务器配置信息
     */
    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    /**
     * 游戏盒子配置信息
     */
    _gameBoxServerConfig: any = null;
    public get gameBoxServerConfig() {
        return this._gameBoxServerConfig;
    }

    //设备UID
    _uid: string = "0";

    public get uid() {
        if (this._uid != "0") return this._uid;
        this._login();
        return "0";
    }

    //服务器返回UID
    _service_uid: string = "0";

    /**
     * 服务器返回UID
     */
    public get serviceId() {
        if (this._service_uid != "0") return this._service_uid;
        this._login();
        return "0";
    }

    _sysInfo: any = null;
    public get SysInfo() {
        return this._sysInfo;
    }


    _shareCallback: Function = null;
    _isShare: boolean = false;

    _lastUpdateTime: number = 0;

    _appIdList: string[] = [];

    _jumpIds: string = "";

    //启动来源的场景：
    _luanchType: string = "";

    clue_token: string = "" //字节token

    wx_code: string = "" //登录后返回的code

    //来源APPID
    _source_app_id: string = "";

    //启动参数
    _luanchData: string = "";

    /**
     * 
     * @param data 配置数据
     */
    public init(data: string) {


        if (PlatUtils.IsWechat) {
            //@ts-ignore
            try {
                //@ts-ignore
                this._sysInfo = wx.getSystemInfoSync()
                utils.showLog("微信小游戏平台信息: " + JSON.stringify(this.SysInfo));
            } catch (e) {
                // Do something when catch error
            }

            try {
                this._luanchData = YZ_LocalStorage.getItem(YZ_Constant.ST_LUANCH_DATA);
                this._luanchType = YZ_LocalStorage.getItem(YZ_Constant.ST_LUANCH_TYPE);
                //@ts-ignore
                let options = wx.getLaunchOptionsSync()
                options && utils.showLog(">>获取到小程序启动参数：" + JSON.stringify(options));

                if (this._luanchData && this._luanchType) {
                    utils.showLog("获取到本地缓存数据启动类型：" + this._luanchType);
                    utils.showLog("获取到本地缓存数据启动参数：" + this._luanchData);
                } else {
                    if (options) {
                        if (options.scene) {
                            utils.showLog("获取到启动场景值：" + options.scene);
                            this._luanchType = options.scene;
                            YZ_LocalStorage.setItem(YZ_Constant.ST_LUANCH_TYPE, this._luanchType);
                        }

                        if (options.query) {
                            let queryData = JSON.stringify(options.query);
                            this._luanchData = queryData;
                            YZ_LocalStorage.setItem(YZ_Constant.ST_LUANCH_DATA, this._luanchData);
                            utils.showLog("获取到小程序启动参数：" + queryData);
                        }

                        if (options.referrerInfo && JSON.stringify(options.referrerInfo) != "{}") {
                            utils.showLog("获取到小程序来源信息：" + JSON.stringify(options.referrerInfo));
                            if (options.referrerInfo.appId) {
                                utils.showLog("获取到小程序启动来源的appId：" + options.referrerInfo.appId);
                                this._source_app_id = options.referrerInfo.appId;
                            }
                        }
                    }
                }
            } catch (erro) {
                utils.showLog("获取到小程序启动参数异常");
            }

            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.wechat) {
                    ST_DefaultServerConfig = JSON.stringify(configObj.wechat);
                }
                if (configObj && configObj.gamebox) {
                    GB_DefaultServerConfig = JSON.stringify(configObj.gamebox);
                }
            }

            // 拉取服务器配置
            // this.loadJumpIds().then(() => {
            //     console.log("本地跳转ID加载成功！");
            //     this._loadConfig();
            // }).catch((erro) => {
            //     console.error("本地跳转ID加载失败：", erro);
            this._loadConfig();
            // })

            //加载配置的跳转ID
            // this.loadAppIdList();
            // 开启右上角转发
            //@ts-ignore
            wx.showShareMenu();
            //@ts-ignore
            wx.onShareAppMessage(this._getShareInfo.bind(this));
            //@ts-ignore
            wx.onShow((res) => {
                cc.log("OnShow");
                if (this._isShare) {
                    this._isShare = false;
                    if (this._shareCallback) {
                        this._shareCallback(true, "分享成功!");
                    }
                }

                this._checkForUpdate();

                utils.emitCommonEvent(YZ_Constant.EC_OnShow);
            });
            //@ts-ignore
            wx.onHide(() => {
                cc.log("onHide");
                utils.emitCommonEvent(YZ_Constant.EC_OnHide);
            });

            this._checkForUpdate();
        }
    }

    _checkForUpdate() {
        if (PlatUtils.IsWechat) {
            if ((new Date()).getTime() - this._lastUpdateTime < ST_LoadConfigInterval) {
                cc.log("检查更新太频繁!");
                return;
            }
            this._lastUpdateTime = (new Date()).getTime();

            if (this.isOverMinVersion("1.9.90")) {
                cc.log("检查更新......");
                //@ts-ignore
                const updateManager = wx.getUpdateManager();

                updateManager.onCheckForUpdate((res) => {
                    // 请求完新版本信息的回调
                    if (res.hasUpdate) {
                        cc.log("有新版本需要更新!");
                    } else {
                        cc.log("没有新版本！");
                    }
                });

                updateManager.onUpdateReady(() => {
                    //@ts-ignore
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate();
                            }
                        }
                    });
                });

                updateManager.onUpdateFailed(() => {
                    // 新版本下载失败
                    cc.log("新版本下载失败！");
                });
            }
        }
    }

    _buildServerUrl() {
        let url: string = "";
        if (utils.config.wechatconfig && utils.config.wechatconfig.appID) {
            let appid: string = utils.config.wechatconfig.appID;
            let channel: string = "wechat";
            let jumpId: string = this._jumpIds ? this._jumpIds : utils.config.wechatconfig.jumpId;
            url = ST_ServerUrl + `kyx=true&app_id=${appid}&channel=${channel}&jump_id=${jumpId}`;
        } else {
            cc.log("微信 APPID配置出错！");
        }

        return url;
    }

    _buildGameBoxServerUrl() {
        let url: string = GB_ServerUrl + `m=ghome&index=0&type=1`;
        return url;
    }

    _loadConfig() {
        if (PlatUtils.IsWechat) {
            cc.log("加载服务器配置.......");
            let method: string = "m=g";
            let url: string = ST_ServerUrl + method
            // let jumpId: string = this._jumpIds ? this._jumpIds : utils.config.wechatconfig.jumpId;
            // url += `&jump_id=${jumpId}`
            utils.commomHttpRequest(url, (ret, data) => {
                if (ret) {
                    cc.log("微信服务器配置数据获取成功: data = ", data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                            } else {
                                cc.warn("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            cc.log("微信服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    cc.log("微信服务器配置数据获取失败, 使用本地配置!");
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

                    if (this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        cc.log("使用服务器下发的广告ID");
                        utils.config.wechatconfig.insertId = this.ServerConfig.intersititia_pos_id || utils.config.wechatconfig.insertId;
                        utils.config.wechatconfig.videoId = this.ServerConfig.video_pos_id || utils.config.wechatconfig.videoId;
                        utils.config.wechatconfig.boxId = this._serverConfig.box_pos_id || utils.config.wechatconfig.boxId;
                        utils.config.wechatconfig.bannerBoxId = this._serverConfig.banner_box_pos_id || utils.config.wechatconfig.bannerBoxId;
                        utils.config.wechatconfig.nativeBannerId = this._serverConfig.native_banner_pos_id || utils.config.wechatconfig.nativeBannerId;
                        utils.config.wechatconfig.nativeInsertIds = this._serverConfig.native_intersititial_pos_id || utils.config.wechatconfig.nativeInsertIds;

                        let bannerLocation: string[] = ["home", "game", "level", "skin", "pause", "over"];
                        for (let i = 0; i < bannerLocation.length; i++) {
                            if (this.ServerConfig.banner_pos_id[bannerLocation[i]]) {
                                utils.config.wechatconfig.setBannerId(BannerLocationToEnum(bannerLocation[i]), this.ServerConfig.banner_pos_id[bannerLocation[i]]);
                            }
                        }

                        if (this.ServerConfig.native_customad_configs) {
                            for (let i = 0; i < this.ServerConfig.native_customad_configs.length; i++) {
                                utils.showLog("获取到原生模版广告配置:" + this.ServerConfig.native_customad_configs[i].location, ">>>>", JSON.stringify(this.ServerConfig.native_customad_configs[i]));
                                utils.config.wechatconfig.setCustomAdInfo(this.ServerConfig.native_customad_configs[i].location, this.ServerConfig.native_customad_configs[i]);
                            }
                        }



                    } else {
                        cc.log("使用本地配置的广告ID");
                    }
                }

                utils.emitServerInitEvent();
                if (this._serverConfig && this._serverConfig.openBox) {
                    if (this._serverConfig.openBox != "true") {
                        cc.log("服务器游戏盒子配置为关闭状态！");
                        return;
                    }
                    url = this._buildGameBoxServerUrl();
                    utils.commomHttpRequest(url, (ret, data) => {
                        if (ret) {
                            cc.log("微信游戏盒子服务器配置数据获取成功: data = ", data);
                            if (data) {
                                let result = JSON.parse(data);
                                if (result) {
                                    if (!utils.DebugLoacalConfig) {
                                        this._gameBoxServerConfig = result;
                                    } else {
                                        cc.warn("开启了本地数据测试，使用本地配置!");
                                    }
                                } else {
                                    cc.log("微信游戏盒子微信服务器配置数据不是合法的JSON数据, 使用本地配置!");
                                }
                            }
                        } else {
                            cc.log("微信游戏盒子服务器配置数据获取失败, 使用本地配置!");
                        }

                        if (!this._gameBoxServerConfig) {
                            this._gameBoxServerConfig = JSON.parse(GB_DefaultServerConfig);
                        }
                    });
                }
            });



        }
    }

    /**
     * 
     * @param id 跳转ID
     * @param callback 跳转回调
     */
    public navigateToMiniProgram(id: string, callback: Function, path?: string) {
        if (PlatUtils.IsWechat) {
            let completeCallback: Function = callback;
            //@ts-ignore
            wx.navigateToMiniProgram({
                appId: id.indexOf(":") > -1 ? id.split(":")[0] : id,
                path: path ? path : "",
                success(res) {
                    if (completeCallback) {
                        completeCallback(true);
                    }
                },
                fail(res) {
                    // cc.log("跳转失败！", id);
                    cc.log(`跳转失败! id=${id}; res=${JSON.stringify(res)}`);
                    if (completeCallback) {
                        completeCallback(false);
                    }
                }
            });
        }
    }

    public getSystemInfo() {
        if (PlatUtils.IsWechat) {
            //@ts-ignore
            return wx.getSystemInfoSync();
        }
    }

    public previewImage(url: string) {
        if (PlatUtils.IsWechat) {
            //@ts-ignore
            wx.previewImage({
                urls: [url] // 需要预览的图片http链接列表
            });
        }
    }

    public share(callback: Function = null) {
        if (PlatUtils.IsWechat) {
            this._shareCallback = callback;
            this._isShare = true;
            //@ts-ignore
            wx.shareAppMessage(this._getShareInfo());
        }
    }

    /**
     * 上报数据
     */
    public postData(otherGameAppId: string) {
        if (PlatUtils.IsWechat) {
            let method = "m=rjump";
            let url: string = ST_ServerUrl + method + `&jump_app_id=${otherGameAppId}`;
            cc.log("上报数据, url=", url);
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    cc.log("数据上报成功！");
                } else {
                    cc.log("数据上报失败！");
                }
            });
        }
    }

    /**
    * 上报互推组件数据
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    public postDataByLocation(otherGameAppId: string, location: string, status: number = 0) {
        if (PlatUtils.IsWechat) {
            let method = "m=rjump";
            let url: string = ST_ServerUrl + method + `&jump_app_id=${otherGameAppId}&location=${location}&status=${status}`
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    cc.log("数据上报成功！");
                } else {
                    cc.log("数据上报失败！");
                }
            });
        }
    }

    /**
    * 上报互推组件显示位置
    * @param otherGameAppId 跳转的ID
    * @param location 当前位置
    * @param status 0:点击，1:跳转成功
    */
    public postRecommentShowData(location: string) {
        if (PlatUtils.IsWechat) {
            let method = "m=rjumpshow";
            let url: string = ST_ServerUrl + method + `&location=${location}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    cc.log("数据上报成功！");
                } else {
                    cc.log("数据上报失败！");
                }
            }.bind(this));
        }
    }

    _getShareInfo() {
        if (PlatUtils.IsWechat) {
            return {
                title: utils.config.otherconfig.shareTitle,
                imageUrl: utils.config.otherconfig.shareImgUrl
            };
        }

        return {};
    }

    public isOverMinVersion(minVersion: string) {
        //@ts-ignore
        let curVersion: string = wx.getSystemInfoSync().SDKVersion;
        return this._compareVersion(curVersion, minVersion) >= 0
    }


    _compareVersion(v1, v2) {
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
     * 获取交叉推广数据
     */
    public getRecommondGameList() {
        if (PlatUtils.IsWechat && utils.wechatTool && utils.wechatTool.ServerConfig) {
            return utils.wechatTool.ServerConfig.jump_list;
        }

        return null;
    }


    // /**
    //  * 加载游戏配置的跳转ID
    //  */
    // loadAppIdList() {
    //     CompatibleTool.LoadResRes("./src/game.json", (err, res) => {
    //         if (err) {
    //             cc.error('加载game.json文件出错', err);
    //             return;
    //         }
    //         if (res && res.navigateToMiniProgramAppIdList && res.navigateToMiniProgramAppIdList.length) {
    //             let taskQty = res.subpackages.length;
    //             for (let i = 0; i < taskQty; i++) {
    //                 this._appIdList.push(res.navigateToMiniProgramAppIdList[i].name);
    //             }
    //             cc.log("配置的跳转ID：", this._appIdList);
    //         }
    //     });
    // }


    /**
     * 验证ID 是否配置
     * @param appId 应用ID
     */
    checkAppId(appId: string) {

        if (utils.config.wechatconfig.jumpId.indexOf(appId) > -1) {
            return true;
        }
        cc.log("appId :", appId, "不再配置列表中!");
        return false;
    }


    _loginTime: number = 0;
    _loginInterval: number = 30;


    _login() {

        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._loginTime) / 1000;
        if (interval > 0 && interval < this._loginInterval) {
            utils.showLog(`登录请求间隔小于：${this._loginInterval}秒`);
            return;
        }
        this._loginTime = curTime;
        let self = this;

        this._uid = YZ_LocalStorage.getItem(YZ_Constant.ST_UID);
        this._uid = this._uid ? this._uid : "0";

        this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
        this._service_uid = this._service_uid ? this._service_uid : "0";
        utils.showLog("获取本地保存的uid=" + this._uid + "，服务器UID=" + this._service_uid);

        if (this._uid == "0") {
            //@ts-ignore
            wx.login({
                success(res) {
                    if (res.code) {
                        self.wx_code = res.code;
                        self.reportLogin(res.code);
                    } else {
                        utils.showLog('登录失败！' + res.errMsg)
                    }
                },
                fail() {

                },
                complete() {
                    self.reportLogin();
                }
            })
        }

    }
    _reportLoginTime: number = 0;
    _reportLoginInterval: number = 30;
    isReport: boolean = false;

    isReportActive: boolean = false;
    /**
     * 上报登录接口获取UID
     */
    async reportLogin(code: string = "") {
        if (this.isReport) return;
        this.isReport = true;

        let self = this;
        let curTime: number = new Date().getTime();
        let interval: number = (curTime - this._reportLoginTime) / 1000;
        if (interval > 0 && interval < this._reportLoginInterval) {
            utils.showLog(`上报登录获取UID小于：${this._reportLoginInterval}秒`);
            return;
        }
        this._reportLoginTime = curTime;
        let method = "m=login";
        let url: string = ST_ServerUrl + method + `&device_data=${encodeURI(JSON.stringify(this._sysInfo))}&code=${code}`;

        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                if (data) {
                    utils.showLog("#data=" + data);

                    let result = JSON.parse(data);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;

                        if (!self.isReportActive) {
                            self.isReportActive = true;
                            this.reportAttributedEvent(AttributedType.Active, AttributedKey.Active, AttributedValue.Active);
                        }
                        YZ_LocalStorage.setItem(YZ_Constant.ST_SERVICE_UID, self._service_uid);
                    }
                    if (result.device_uid) {
                        self._uid = "" + result.device_uid;
                        YZ_LocalStorage.setItem(YZ_Constant.ST_UID, self._uid);
                    }
                    utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid + " #device_id=" + self._uid);

                }
            }
            this.isReport = false;
        })
    }


    passCount: number = 0; //通关数据
    playCount: number = 0; //开始关卡数据
    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsWechat) {

            if (status == LevelStatus.GameWin) {
                this.passCount++;
                if (this.passCount === utils.getConfigByKey("pass_level_count_active")) {
                    this.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.PassLevelCountAction);
                }
            } else if (status === LevelStatus.GameStart) {
                this.playCount++;
                if (this.playCount == utils.getConfigByKey("play_level_count_active")) {
                    this.reportAttributedEvent(AttributedType.GameAddiction, AttributedKey.GameAddiction, AttributedValue.PlayLevelCountAction);
                }
            }


            let method = "m=rlevel";
            let url: string = ST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
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
        if (PlatUtils.IsWechat) {
            let method = "m=revent";
            let url: string = ST_ServerUrl + method + `&event=${encodeURI(eventName)}`;
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
        if (PlatUtils.IsWechat) {
            //@ts-ignore
            wx.showToast({
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


    /**
     * 上报归因事件
     * @param eventType 事件类型 0 激活， 25:关键行为
     * @param eventValue 事件描述
     */
    public reportAttributedEvent(eventType: AttributedType, eventKey: AttributedKey, eventValue: AttributedValue) {
        if (this._luanchType != "1069" && this._luanchType != "1036" && this._luanchType != "1065") {
            utils.showLog("luanchType=" + this._luanchType + ",不进行归因上报");
            return;
        }
        utils.showLog("上报归因事件：  #eventType=" + eventType + "#eventKey=" + eventKey + "#eventValue=" + eventValue);
        if (eventType == AttributedType.Active && YZ_LocalStorage.getItem(YZ_Constant.ST_IS_REPORT_USER_ACTIVE)) {
            utils.showLog("用户已经上报过激活，不再进行激活上报！");
            return;
        } else if (eventType == AttributedType.GameAddiction && YZ_LocalStorage.getItem(YZ_Constant.ST_IS_REPORT_GAME_ADDICTION)) {
            utils.showLog("用户已经上报过关键行为，不再进行激活上报！");
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.timeout = 15000;    // 单位毫秒
        let data: any = {};
        data.app_id = utils.config.wechatconfig.appID;
        data.channel = "wechat_kyx";
        data.uid = this._service_uid;
        data.event_type = eventType;
        data.event_key = eventKey;
        data.event_value = eventValue;
        data.app_version = utils.config.wechatconfig.version;
        data.code = this.wx_code;
        // data.clue_token = this.clue_token;
        data.luanchDate = encodeURI(this._luanchData);

        utils.showLog("归因请求参数:" + JSON.stringify(data));
        let requestData = JSON.stringify(data);
        utils.showLog("归因 > json_data=" + utils.aesEncrypt(requestData));
        let requestUrl: string = `https://track.youletd.com/wechatcounterpart/dockingreturn?json=${utils.aesEncrypt(requestData)}&time_stamp=${(new Date()).getTime()}`;
        utils.showLog("归因服务器地址:" + requestUrl);

        xhr.open('GET', requestUrl);
        xhr.send();
        xhr.onreadystatechange = function () {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (eventType == AttributedType.Active) YZ_LocalStorage.setItem(YZ_Constant.ST_IS_REPORT_USER_ACTIVE, "true");
                    if (eventType == AttributedType.GameAddiction) YZ_LocalStorage.setItem(YZ_Constant.ST_IS_REPORT_GAME_ADDICTION, "true");
                    utils.showLog("归因上报成功：", xhr.responseText);
                } else {
                    utils.showLog("归因上报失败！");
                }
            }
        }
        xhr.ontimeout = function () {
            utils.showLog("归因请求超时!");
        }
        xhr.onerror = function (err) {
            utils.showLog("归因请求失败!");
        }
    }


    /**
       * 友盟游戏开始上报
       * @param levelID 
       */
    public umaOnStart(levelID: string) {
        if (!this.checkUmeng()) return;
        //@ts-ignore
        wx.uma.stage.onStart({
            stageId: levelID,//该字段名称不可修改，必传
            stageName: `第${levelID}关`// 关卡id
        })
    }

    /**
     * 
     * @returns 是否开启友盟 
     */
    private checkUmeng(): boolean {
        //@ts-ignore
        if (!wx.uma) {
            utils.showLog("未对接友盟SDK");
            return false;
        }
        return true;
    }
    /**
     * 友盟结算上报
     * @param levelID 关卡id
     * @param stageId 
     * @param event 
     */
    public umaReportedLevel(levelID: string, event: LevelStatus) {
        if (!this.checkUmeng()) return;

        //@ts-ignore
        wx.uma.stage.onEnd({
            stageId: levelID,//该字段名称不可修改，必传
            stageName: `第${levelID}关`,
            event: event
        })
    }


    /**
     * 友盟自定义事件
     * @param eventId 事件ID，注意：事件ID必须要在后台配置
     * @param params 事件内容
     */
    public umaTrackEvent(eventId: string, params?) {
        if (!this.checkUmeng()) return;
        //@ts-ignore
        wx.uma.trackEvent(eventId, params);
    }



}
