import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

let ST_DefaultServerConfig: string = "";
const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?"


//  const ST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?";
//  const POST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?"


@ccclass
export default class YZ_Tool_Native {

    public className: string = "";

    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }

    /**
    * 当前版本号
    */
    public gameVersion(): string {
        return utils.config.nativeAndroidConfig.version;
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

    /**
     *  0：默认互推面板 1： 跳转到原生平台
     */
    moreGameShowType: number = 0;

    /**
     * 显示退出游戏弹窗的类型
     * 0：不弹窗 1:弹窗
     */
    showGameExitDialogType: number = 0;
    appList: string = "";

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
        let interval: number = (curTime - this._reportLoginTime) / 1000;
        if (interval > 0 && interval < this._reportLoginInterval) {
            utils.showLog(`上报登录获取UID小于：${this._reportLoginInterval}秒`);
            return;
        }
        this._reportLoginTime = curTime;
        let method = "m=loginv2";
        let url: string = ST_ServerUrl + method + `&device_data=${encodeURI(this.deviceInfo)}`;

        utils.commomHttpRequest(url, (ret, data) => {
            if (ret) {
                if (data) {
                    let result = JSON.parse(data);
                    utils.showLog(result);
                    if (result.uid) {
                        self._service_uid = "" + result.uid;
                        utils.showLog("服务器请求登录成功! _service_uid=" + self._service_uid);
                        YZ_LocalStorage.setItem(YZ_Constant.ST_SERVICE_UID, self._service_uid);
                    }
                    if (result.config) {
                        this._serverConfig = utils.aesDecrypt(result.config);
                        this.setLocalConfig(JSON.stringify(this._serverConfig));
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
    public init() {
        if (PlatUtils.IsNativeAndroid) {

            ST_DefaultServerConfig = this.getNativeData();

            if (ST_DefaultServerConfig) {
                let data: any = JSON.parse(ST_DefaultServerConfig);
                this.deviceInfo = data.device_info;
                this.moreGameShowType = data.more_game_type;
                this.showGameExitDialogType = data.show_game_exit_dialog;
                this.appList = data.app_list;
            } else {
                utils.showLog("没有获取到本地数据，组件初始化失败！");
                return;
            }

            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";


            this._loadConfig();



            if (PlatUtils.IsNativeAndroid) {
                //初始化时监听返回按钮退出事件
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event: any) => {
                    if (event.keyCode == cc.macro.KEY.escape || event.keyCode == cc.macro.KEY.back) {
                        if (PlatUtils.IsNativeAndroid) {
                            if (this.showGameExitDialogType == 1) {
                                this.showGameExitDialog();
                            } else {
                                this.GameExit();
                            }
                        }
                    }
                }, this);
            }
        }
    }


    _gameExitDialogNode: cc.Node = null;
    /**
     * 显示退出弹窗
     */
    private showGameExitDialog() {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "组件配置未初始化!");
            return null;
        }
        if (this._gameExitDialogNode && cc.isValid(this._gameExitDialogNode)) {
            utils.showLog("退出窗口还在。");
            return;
        }

        if (utils.config.otherconfig.gameExitDialog) {
            // if(utils.getRecommondGameList())
            let node: cc.Node = cc.instantiate(utils.config.otherconfig.gameExitDialog);
            if (node) {
                if (this._gameExitDialogNode && cc.isValid(this._gameExitDialogNode)) {
                    this._gameExitDialogNode.destroy();
                }
                this._gameExitDialogNode = node;
                this._gameExitDialogNode.group = "default";
                cc.director.getScene().addChild(this._gameExitDialogNode, 9999);
            }
        } else {
            utils.showLog("warn:" + "未找到预制体 GameExitDialog, 请查看CommonUtils组件上是否赋值 !");
        }

    }

    public GameExit() {
        if (PlatUtils.IsNativeAndroid) {
            cc.log("AdAgentNative GameExit");
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "gameExit", "()V");
            } catch (error) {
                cc.log(error);
            }
        }
    }


    /**
     * 获取更多游戏显示的类型
     * 0：默认互推面板 1： 跳转到原生平台
     */
    private getMoreGameShowType() {
        try {
            this.moreGameShowType = jsb.reflection.callStaticMethod(this.jniClassName, "getMoreGameShowType", "()I");
        } catch (error) {
            utils.showLog(error);
        }
    }



    deviceInfo: string = "";
    /**
     * 获取手机设备信息
     *  
     */
    private getDeviceInfo() {
        try {
            this.deviceInfo = jsb.reflection.callStaticMethod(this.jniClassName, "getDeviceInfo", "()Ljava/lang/String;");
            utils.showLog("获取原生平台手机设备信息：" + this.deviceInfo);
        } catch (error) {
            utils.showLog(error);
        }
    }

    /**
     * 跳转原生平台的更多游戏
     */
    public showMoreGames() {
        if (PlatUtils.IsNativeAndroid) {
            utils.showLog("AdAgentNative showMoreGame");
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "showNativeMoreGame", "()V");
            } catch (error) {
                cc.log(error);
            }
        }
    }

    _loadConfig() {
        if (PlatUtils.IsNativeAndroid) {
            let method: string = "m=g" + `&device_data=${encodeURI(this.deviceInfo)}&real_name_auth=${utils.getRealNameAuthLocalData()}`;

            this.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                this._curloadTimes++;
                let recall: boolean = false;
                if (ret) {
                    utils.showLog("原生安卓服务器配置数据获取成功: data = " + data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                                if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                    utils.showLogView = true;
                                }
                                if (result.more_game_type) {
                                    this.moreGameShowType = result.more_game_type;
                                }

                                if (result.show_game_exit_dialog) {
                                    this.showGameExitDialogType = result.show_game_exit_dialog;
                                }
                            } else {
                                utils.showLog("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("原生安卓服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("原生安卓服务器配置数据获取失败！");
                    if (this._curloadTimes < this._reloadTimes) {
                        utils.showLog("请求异常，重新拉取配置!");
                        recall = true;
                    }
                }
                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");
                    } else {
                        utils.showLog("使用本地配置的广告ID");
                    }
                }

                if (recall) {
                    this._loadConfig();
                } else if (!recall || this._curloadTimes >= this._reloadTimes) {
                    this.setLocalConfig(JSON.stringify(this._serverConfig));
                    utils.emitServerInitEvent();
                }
            });
        }
    }


    _reloadTimes: number = 6;
    _curloadTimes: number = 0;
    /**
     * 通用http请求，只封装了GET请求
     * @param url 请求的url地址
     * @param callback Function(ret:boolean, data:string) 
     * 请求结束回调，成功ret为true, data为返回的数据string。 失败为ret为false, data为空 
     */
    private commomHttpRequest(url: string, callback: Function) {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }

        let completeCallback = callback;
        let xhr = new XMLHttpRequest();
        xhr.timeout = 6000;    // 单位毫秒
        let requestUrl: string = url + `&kyx=false&app_id=${utils.config.nativeAndroidConfig.appID}&channel=${utils.config.nativeAndroidConfig.channel}&device_uid=${utils.Tool_Native.uid}&uid=${utils.Tool_Native.serviceId}&game_type=2&time_stamp=${(new Date()).getTime()}&game_version=${utils.config.nativeAndroidConfig.version}&reqv=${YZ_Constant.SERVER_VERSION}`
        utils.showLog("服务器地址:" + requestUrl);
        xhr.open('POST', requestUrl);
        xhr.send(`app_list=${this.appList}`);
        xhr.onreadystatechange = function () {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        completeCallback(true, utils.aesDecrypt(xhr.responseText));
                    }
                } else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }

            if (xhr.status != 200) {

            }
        }
        xhr.ontimeout = function () {
            utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        }
        xhr.onerror = function (err) {
            if (completeCallback) {
                completeCallback(false, "");
            }
        }
    }

    /**
     * 设置原生客户端数据数据
     * @param data 
     */
    private setLocalConfig(data: string) {
        try {
            utils.showLog("设置原生客户端数据数据" + data);
            jsb.reflection.callStaticMethod(this.jniClassName, "setLocalConfig", "(Ljava/lang/String;)V", data);
        } catch (error) {
            utils.showLog(error);
        }

    }


    /**
    * 获取原生客户端数据数据
    * @param data 
    */
    public getNativeData(): string {
        let data = "";
        try {
            data = jsb.reflection.callStaticMethod(this.jniClassName, "getLocalConfig", "()Ljava/lang/String;");
            utils.showLog("获取原生客户端数据数据 : " + data);
        } catch (error) {
            utils.showLog(error);
        }
        return data;
    }

    /**
    * 
    * @param id 跳转ID
    * @param callback 跳转回调
    */
    public navigateToGame(jsonData: string, callback: Function, path?: string) {
        if (PlatUtils.IsNativeAndroid) {
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "navigateToGame", "(Ljava/lang/String;)V", jsonData);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }

    /**
     * 获取JNI类名
     */
    public get jniClassName() {
        if (this.className) return this.className;
        try {
            this.className = jsb.reflection.callStaticMethod("aa.b.c.a", "a", "()Ljava/lang/String;");
        } catch (error) {

        }
        return this.className;
    }


    /**
    * 获取交叉推广数据
    */
    public getRecommondGameList() {
        if (PlatUtils.IsNativeAndroid
            && utils.Tool_Native
            && utils.Tool_Native.ServerConfig) {
            return utils.Tool_Native.ServerConfig.jump_list;
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
        if (PlatUtils.IsNativeAndroid) {
            let method = "m=rlevel";
            let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("关卡数据上报成功！");
                    // if (status == LevelStatus.GameStart) {
                    //     utils.showLog("配置数据获取成功: data = " + data);
                    //     if (data) {
                    //         let result = JSON.parse(data);
                    //         if (result) {
                    //             let keys = Object.keys(result);
                    //             for (let key in keys) {
                    //                 this._serverConfig[key] = result[key];
                    //                 utils.showLog("覆盖：#key=" + key, " #value=", result[key]);
                    //             }
                    //         }
                    //     }
                    // } else {
                    //     utils.showLog("OPPO服务器配置数据获取失败, 使用本地配置!");
                    // }
                } else {
                    utils.showLog("关卡数据上报失败！");
                }

            }.bind(this));
        }
    }

    /**
   * 上报互推组件显示位置
   * @param otherGameAppId 跳转的ID
   * @param location 当前位置
   * @param status 0:点击，1:跳转成功
   */
    public postRecommentShowData(location: string) {
        if (PlatUtils.IsNativeAndroid) {
            let method = "m=rjumpshow";
            let url: string = ST_ServerUrl + method + `&location=${location}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("上报互推组件显示位置成功！");
                } else {
                    utils.showLog("上报互推组件显示位置失败！");
                }
            }.bind(this));
        }
    }

    /**
     * 上报互推组件数据
     * @param otherGameAppId 跳转的ID
     * @param location 当前位置
     * @param status 0:点击，1:跳转成功
     */
    public postDataByLocation(otherGameAppId: string, location: string, status: number = 0) {
        if (PlatUtils.IsNativeAndroid) {
            let method = "m=rjump";
            let url: string = POST_ServerUrl + method + `&jump_app_id=${otherGameAppId}&location=${location}&status=${status}`

            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog(`数据上报成功`);
                } else {
                    utils.showLog("数据上报失败！");
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
        if (PlatUtils.IsNativeAndroid) {
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
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public sendEventNew(eventName: string, eventId: string = "default", eventData?: string, isCallBack: boolean = true) {
        if (PlatUtils.IsNativeAndroid) {
            let method = "m=reventv2";
            let url: string = POST_ServerUrl + method + `&event=${encodeURI(eventName)}&event_id=${eventId}`;
            if (eventData) {
                url += `&event_data=${encodeURI(eventData)}`
            }
            utils.showLog("自定义事件上报URL：" + url);
            utils.commomHttpRequest(url, (ret, data) => {
                if (ret) {
                    utils.showLog("上报自定义事件成功！");
                    isCallBack && this.callBackToEvent(data);
                } else {
                    utils.showLog("上报自定义事件失败！");
                    isCallBack && this.callBackToEvent("false");
                }
            });
        }
    }


    /**
   * 上报自定义事件
   * @param level 当前关卡ID
   * @param levelName 关卡名称
   * @param status 状态
   */
    public sendEventV3(eventName: string, eventId: string = "default", eventData?: string) {
        if (PlatUtils.IsNativeAndroid) {
            let method = "m=reventv2";
            let url: string = POST_ServerUrl + method + `&event=${encodeURI(eventName)}&event_id=${eventId}`;
            if (eventData) {
                url += `&event_data=${encodeURI(eventData)}`
            }
            utils.commomHttpRequest(url, (ret, data) => {
                if (ret) {
                    utils.showLog("上报自定义事件成功！");
                    this.callBackToEvent(data);
                } else {
                    utils.showLog("上报自定义事件失败！");
                    this.callBackToEvent("false");
                }
            });
        }
    }


    /**
     * 返回事件上报的结果给安卓端
     * @param result 
     */
    public callBackToEvent(result: string) {
        if (PlatUtils.IsNativeAndroid) {
            //@ts-ignore
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "callBackToEvent", "(Ljava/lang/String;)V", result);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }



    /**
      * 弹出提示框
      * @param msg 消息
      */
    public showToast(msg: string) {
        if (PlatUtils.IsNativeAndroid) {
            //@ts-ignore
            try {
                jsb.reflection.callStaticMethod(this.jniClassName, "showToast", "(Ljava/lang/String;)V", msg);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }



    /**
     * 显示隐私协议页面
     */
    public showPrivacyAgreement() {
        try {
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "showPrivacyAgreement", "()V");
        } catch (error) {
            utils.showLog(error);
        }
    }

    public showRealNameAuthPanel(parmes: string) {
        try {
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "showRealNameAuthPanel", "(Ljava/lang/String;)V", parmes);
        } catch (error) {
            utils.showLog(error);
        }
    }

    public realNameAuthResult(parmes: string) {
        try {
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "realNameAuthResult", "(Ljava/lang/String;)V", parmes);
        } catch (error) {
            utils.showLog(error);
        }
    }

    /**
     * 实名认证
     */
    public realNameAuth(code: string, name: string, callBack: Function) {
        if (!utils._isConfigInit) {
            utils.showLog("warn:" + "本地数据未初始化!");
            return;
        }
        let method: string = "m=realNameAuth"
        let completeCallback = callBack;
        let xhr = new XMLHttpRequest();
        xhr.timeout = 15000;    // 单位毫秒
        let requestUrl: string = "https://apps.youlesp.com/gss?" + method + `&time_stamp=${(new Date()).getTime()}`;
        let data: any = {};
        data.kyx = false;
        data.app_id = utils.config.nativeAndroidConfig.appID;
        data.channel = utils.config.nativeAndroidConfig.channel;
        data.device_uid = utils.Tool_Native.uid;
        data.uid = utils.Tool_Native.serviceId;
        data.game_type = 2;
        data.device_data = this.deviceInfo;
        data.game_version = utils.config.nativeAndroidConfig.version;
        data.reqv = YZ_Constant.SERVER_VERSION;
        data.app_list = this.appList;
        data.id_card = code;
        data.real_name = name;



        utils.showLog("服务器地址:" + requestUrl);
        utils.showLog("请求参数:" + JSON.stringify(data));

        let requestData = JSON.stringify(data);
        xhr.open('POST', requestUrl);
        xhr.send("json_data=" + utils.aesEncrypt(requestData));
        utils.showLog("json_data=:" + utils.aesEncrypt(requestData));

        xhr.onreadystatechange = function () {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (completeCallback) {
                        completeCallback(true, utils.aesDecrypt(xhr.responseText));
                    }
                } else {
                    if (completeCallback) {
                        completeCallback(false, "");
                    }
                }
            }

            if (xhr.status != 200) {

            }
        }
        xhr.ontimeout = function () {
            utils.showLog("请求超时!");
            if (completeCallback) {
                completeCallback(false, "");
            }
        }
        xhr.onerror = function (err) {
            if (completeCallback) {
                completeCallback(false, "");
            }
        }
    }


    /**
      * 友盟游戏开始上报
      * @param levelID 
      */
    public umaOnStart(levelID: string) {
        if (!this.checkUmeng()) return;

        this.umaTrackEvent("level", "um_plus_game_level", {
            game_level: levelID,//该字段名称不可修改，必传
            game_states: `0`
        })
    }

    /**
     * 
     * @returns 是否开启友盟 
     */
    private checkUmeng(): boolean {
        // if (!utils.config.oppoconfig.umengId) {
        //     return false;
        // }
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
        let status = 1;
        if (event == LevelStatus.GameFail) {
            status = -1;
        }
        this.umaTrackEvent("level", "um_plus_game_level", {
            game_level: levelID,//该字段名称不可修改，必传
            game_states: `${status}`
        })
    }


    /**
     * 友盟自定义事件
     * @param eventId 事件ID，注意：事件ID必须要在后台配置
     * @param params 事件内容
     */
    public umaTrackEvent(eventType: string = "custom", eventId: string, params?) {
        if (!this.checkUmeng()) return;
        try {
            if (params) {
                params = JSON.stringify(params);
            }
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.jniClassName, "umaTrackEvent", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", eventType, eventId, params);
        } catch (error) {
            utils.showLog(error);
        }
    }






}
