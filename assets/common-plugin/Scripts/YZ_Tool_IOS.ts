import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;

let ST_DefaultServerConfig: string = "";

const ST_ServerUrl: string = "https://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "https://report.youletd.com/gss?";

//  const ST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?";
//  const POST_ServerUrl: string = "http://192.168.31.39:8080/GameBoxServer/gss?"


@ccclass
export default class YZ_Tool_IOS {

    public className: string = "JNIHelper";

    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }


    /**
     * 当前版本号
     */
    public gameVersion(): string {
        return utils.config.nativeIoSConfig.version;
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
        let method = "m=login";
        let url: string = ST_ServerUrl + method + `&device_data=${encodeURI(this.deviceInfo)}`;

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
    public init(data) {
        if (PlatUtils.IsNativeIOS) {

            if (data) {
                let configObj: any = JSON.parse(data);
                if (configObj && configObj.ios) {
                    utils.showLog("本地配置数据:" + JSON.stringify(configObj.ios));
                    ST_DefaultServerConfig = JSON.stringify(configObj.ios);
                }
            }
            this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
            this._service_uid = this._service_uid ? this._service_uid : "0";


            this._loadConfig();



            // if (PlatUtils.IsNativeIOS) {
            //     //初始化时监听返回按钮退出事件
            //     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event: any) => {
            //         if (event.keyCode == cc.macro.KEY.escape || event.keyCode == cc.macro.KEY.back) {
            //             if (PlatUtils.IsNativeIOS) {
            //                 if (this.showGameExitDialogType == 1) {
            //                     this.showGameExitDialog();
            //                 } else {
            //                     this.GameExit();
            //                 }
            //             }
            //         }
            //     }, this);
            // }
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
        if (PlatUtils.IsNativeIOS) {
            cc.log("AdAgentNative GameExit");
            try {
                jsb.reflection.callStaticMethod(this.className, "gameExit");
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
            this.moreGameShowType = jsb.reflection.callStaticMethod(this.className, "getMoreGameShowType", "()I");
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
            this.deviceInfo = jsb.reflection.callStaticMethod(this.className, "getDeviceInfo", "()Ljava/lang/String;");
            utils.showLog("获取原生平台手机设备信息：" + this.deviceInfo);
        } catch (error) {
            utils.showLog(error);
        }
    }

    /**
     * 跳转原生平台的更多游戏
     */
    public showMoreGames() {
        if (PlatUtils.IsNativeIOS) {
            utils.showLog("AdAgentNative showMoreGame");
            try {
                jsb.reflection.callStaticMethod(this.className, "showNativeMoreGame", "()V");
            } catch (error) {
                cc.log(error);
            }
        }
    }

    _loadConfig() {
        if (PlatUtils.IsNativeIOS) {
            let method: string = "m=g";
            utils.commomHttpRequest(ST_ServerUrl + method, (ret, data) => {
                if (ret) {
                    utils.showLog("原生IOS服务器配置数据获取成功: data = " + data);
                    if (data) {
                        let result = JSON.parse(data);
                        if (result) {
                            if (!utils.DebugLoacalConfig) {
                                this._serverConfig = result;
                                if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                    utils.showLogView = true;
                                }
                            } else {
                                utils.showLog("开启了本地数据测试，使用本地配置!");
                            }
                        } else {
                            utils.showLog("原生安卓服务器配置数据不是合法的JSON数据, 使用本地配置!");
                        }
                    }
                } else {
                    utils.showLog("原生安卓服务器配置数据获取失败, 使用本地配置!");
                }

                if (!this._serverConfig) {
                    this._serverConfig = JSON.parse(ST_DefaultServerConfig);
                } else {
                    if (this._serverConfig.is_local_pos_id
                        && this._serverConfig.is_local_pos_id == "false") {
                        // 使用服务器下发的广告id
                        utils.showLog("使用服务器下发的广告id");

                        utils.config.nativeIoSConfig.bannerId = this._serverConfig.banner_pos_id;
                        utils.config.nativeIoSConfig.insertId = this._serverConfig.intersititia_pos_id;
                        utils.config.nativeIoSConfig.videoId = this._serverConfig.video_pos_id;
                    } else {
                        this._serverConfig.video_pos_id = utils.config.nativeIoSConfig.videoId
                        this._serverConfig.banner_pos_id = utils.config.nativeIoSConfig.bannerId;
                        this._serverConfig.intersititia_pos_id = utils.config.nativeIoSConfig.insertId;
                        utils.showLog("使用本地配置的广告ID");
                    }
                }


                utils.showLog("执行IOS >>> 初始化");
                jsb.reflection.callStaticMethod(this.className, "init:", JSON.stringify(this._serverConfig));

                // this.setLocalConfig(JSON.stringify(this._serverConfig));
                utils.emitServerInitEvent();

            });
        }
    }


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
        let requestUrl: string = url + `&kyx=false&app_id=${utils.config.nativeAndroidConfig.appID}&channel=${utils.config.nativeAndroidConfig.channel}&device_uid=${utils.Tool_Native.uid}&uid=${utils.Tool_Native.serviceId}&game_type=2&time_stamp=${(new Date()).getTime()}`
        utils.showLog("服务器地址:" + requestUrl);
        xhr.open('POST', requestUrl);
        xhr.send(`app_list=${this.appList}`);
        xhr.onreadystatechange = function () {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (completeCallback) {
                    completeCallback(true, xhr.responseText);
                }
            }

            if (xhr.status != 200) {
                if (completeCallback) {
                    completeCallback(false, "");
                }
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
            jsb.reflection.callStaticMethod(this.className, "setLocalConfig", "(Ljava/lang/String;)V", data);
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
            data = jsb.reflection.callStaticMethod(this.className, "getLocalConfig");
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
    public navigateToGame(appId: string, callback: Function, path?: string) {
        if (PlatUtils.IsNativeIOS) {
            try {
                jsb.reflection.callStaticMethod(this.className, "navigateToGame:", appId);
            } catch (error) {
                utils.showLog(error);
            }
        }
    }


    /**
    * 获取交叉推广数据
    */
    public getRecommondGameList() {
        if (PlatUtils.IsNativeIOS
            && utils.Tool_IOS
            && utils.Tool_IOS.ServerConfig) {
            return utils.Tool_IOS.ServerConfig.jump_list;
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
        if (PlatUtils.IsNativeIOS) {
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
        if (PlatUtils.IsNativeIOS) {
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
        if (PlatUtils.IsNativeIOS) {
            console.log("showToast >>>>>");
            //@ts-ignore
            jsb.reflection.callStaticMethod(this.className, "showToast:", msg);
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
        data.app_id = utils.config.nativeIoSConfig.appID;
        data.channel = "ios";
        data.device_uid = this.uid;
        data.uid = this.serviceId;
        data.game_type = 2;
        data.device_data = this.deviceInfo;
        data.game_version = utils.config.nativeIoSConfig.version;
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

}
