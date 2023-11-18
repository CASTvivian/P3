import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";
import YZ_LocalStorage from "./YZ_LocalStorage";

const { ccclass, property } = cc._decorator;


let ST_DefaultServerConfig: string = "";
const ST_ServerUrl: string = "http://apps.youlesp.com/gss?";
const POST_ServerUrl: string = "http://report.youlesp.com/gss?";
//@ts-ignore
const md5 = require('./md5.js');
const QTT_ServerUrl: string = "https://newidea4-gamecenter-backend.1sapp.com/x/open/user/ticket?"
const QTT_Report: string = "https://newidea4-gamecenter-backend.1sapp.com/x/open/report/round"
/**
 * 趣头条工具类
 */
@ccclass
export default class YZ_Tool_QTT {
    /**
        * 平台标示 
        */
    platForm: string = "";

    //@ts-ignore
    qttGame = window.qttGame;
    _serverConfig: any = null;
    public get ServerConfig() {
        return this._serverConfig;
    }
    /**
     * 用户临时标示
     */
    ticket: string = "";

    _ip: string = "192.168.0.1";
    _sign: string = "";
    /**
     * 服务器地址
     */
    private serverPath: string = "http://apps.youlesp.com/gss?";


    //设备UID
    _uid: string = "0";

    public get uid() {
        if (this._service_uid != "0") return this._uid;
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
        utils.showLog("qtt暂时不获取uid，uid全部为0");
        this._uid = "0";
        let url = this.getUrl();
        console.log("qtt获取用户的地址为：" + url)
        let xhr = new XMLHttpRequest();
        xhr.timeout = 6000;    // 单位毫秒
        xhr.open('get', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            utils.showLog("请求状态改变, reaedyState=", xhr.readyState, "; status=", xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log("请求成功");
                console.log(xhr.responseText);
                let msg = xhr.responseText
                let result = JSON.parse(msg);
                console.log(result)
                utils.showLog("获取数据成功1");
                self._uid = result.data.open_id;
                self.postServerData(QTT_REPORT_TYPE.ready);
                YZ_LocalStorage.setItem(YZ_Constant.ST_UID, self._uid);
                console.log(self._uid)
            }

            if (xhr.status != 200) {

            }
        }
        xhr.ontimeout = function () {
            utils.showLog("请求超时!");
        }
        xhr.onerror = function (err) {
            utils.showLog("请求出错! err=", JSON.stringify(err));
        }
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
                    if (result.ip) {
                        this._ip = result.ip;
                    }
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
     * 初始化
     * @param data 配置数据
     */
    public init(data: string): void {
        utils.showLog("qtt 初始化>>", data);
        if (data) {
            let configObj: any = JSON.parse(data);
            if (configObj && configObj.qutoutiao) {
                ST_DefaultServerConfig = JSON.stringify(configObj.qutoutiao);
            }
        }

        cc.game.on(QTT_REPORT_TYPE.ready, () => {
            this.postServerData(QTT_REPORT_TYPE.login);
        }, this)

        cc.game.on(QTT_REPORT_TYPE.login, () => {
            this.postServerData(QTT_REPORT_TYPE.load);
        }, this)
        this._uid = YZ_LocalStorage.getItem(YZ_Constant.ST_UID);
        this._uid = this._uid ? this._uid : "0";

        this.postServerData(QTT_REPORT_TYPE.ready);
        this._service_uid = YZ_LocalStorage.getItem(YZ_Constant.ST_SERVICE_UID);
        this._service_uid = this._service_uid ? this._service_uid : "0";

        this.platForm = this.GetRequest("platform");
        this.ticket = this.GetRequest("ticket");
        if (this.ticket && this.platForm) {
            // this.getUserInfo();
            // new QTTHELP().g
            // let qttHelp = new QTTHELP();
            // QTTHelp();
            // QTTHelp().then((res) => {
            //     utils.showLog(">>>>>>>>>>>");
            // }).catch(() => {

            // })
        }
        this.loadServerData();


    }

    /**
     * 每局结束上报数据
     */
    public postGameOverData(level: number): void {
        if (PlatUtils.IsQTT) {
            this.qttGame.completeTask();
            this.qttGame.userInfo({ role: '趣头条', region: '区域1', level: level, ce: '1000000', round: '1', revenue: '100000', extend_info: { age: '18' } })
        }
        // Sys

        let time = Math.floor(new Date().getTime() / 1000);
        const values: any = {
            app_id: utils.config.qttconfig.appID,
            open_id: this.uid,
            ip: this._ip,
            round: level,
            game_time: time,
        };
        this.getSign(values);
        var formData = new FormData();
        formData.append("app_id", values.app_id);
        formData.append("open_id", values.open_id);
        formData.append("ip", values.ip);
        formData.append("round", values.round);
        formData.append("game_time", values.game_time);
        formData.append("sign", this._sign);
        this.post(values)
    }

    iframe: HTMLIFrameElement = null;
    form: HTMLFormElement = null;
    post(values) {
        if (!this.form) {
            this.form = document.createElement("form")
        } else {
            this.form.innerHTML = "";
        }
        if (!this.iframe) {
            this.iframe = document.createElement("iframe")
        }
        this.form.action = QTT_Report;
        this.form.enctype = "application/x-www-form-urlencoded";
        this.form.method = "post";
        this.iframe.name = "form"
        this.iframe.id = "form"
        this.form.target = "form";
        for (var item in values) {
            var opt = document.createElement("textarea");
            opt.name = item;
            opt.value = values[item];
            this.form.appendChild(opt);
        }
        document.body.appendChild(this.iframe);
        this.iframe.appendChild(this.form);
        this.form.submit();

    }

    /**
     * 获取用户信息
     */
    public getUserInfo() {

        this.qttGame.getUserInfo(utils.config.qttconfig.appKey, utils.config.qttconfig.appID, this.ticket, this.platForm).then(res => {
            // 成功
            utils.showLog("获取用户信息成功 #userInfo=", JSON.stringify(res));
        }).catch(err => {
            // 失败
        })
    }


    /**
     * 通过参数名称获取链接里的值
     * @param key 参数名称
     */
    private GetRequest(key) {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str: string = url.substr(1);
            let strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        var value = theRequest[key];
        return value;
    }

    /**
    * 请求服务器数据
    */
    public loadServerData() {
        if (!this.uid) {
            cc.error("用户ID为空>>>");
            this._uid = "0";
        }
        let method: string = "m=g";
        utils.commomHttpRequest(ST_ServerUrl + method, (ret: boolean, data: any) => {
            utils.showLog("loadServerUserdate #ret=", ret, " #data=", data);
            if (ret) {
                if (data) {
                    utils.showLog("qtt服务器配置数据获取成功: data = ", data);
                    let result = JSON.parse(data);
                    if (result) {
                        if (!utils.DebugLoacalConfig) {
                            this._serverConfig = result;
                            if (this._serverConfig.is_show_log_view && this._serverConfig.is_show_log_view == "true") {
                                utils.showLogView = true;
                                utils.showLog();
                            }
                        } else {
                            cc.warn("开启了本地数据测试，使用本地配置!");
                        }
                    } else {
                        utils.showLog("qtt服务器配置数据不是合法的JSON数据, 使用本地配置!");
                    }
                } else {
                    utils.showLog("qtt服务器配置数据获取失败, 使用本地配置!");
                }

            } else {
            }
            if (!this._serverConfig) {
                this._serverConfig = JSON.parse(ST_DefaultServerConfig);
            } else {
                if (this._serverConfig.is_local_pos_id
                    && this._serverConfig.is_local_pos_id == "false") {
                    // 使用服务器下发的广告id
                    utils.showLog("使用服务器下发的广告id");
                    utils.showLog("趣头条没有广告id")
                } else {
                    utils.showLog("使用本地配置的广告ID");
                }
            }
            utils.emitServerInitEvent();
        })
    }

    /**
     * 上报关卡数据
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public postLevel(level: string, status: LevelStatus, levelName?: string) {
        if (PlatUtils.IsQTT) {
            let method = "m=rlevel";
            let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
            utils.commomHttpRequest(url, function (ret, data) {
                if (ret) {
                    utils.showLog("关卡数据上报成功！");
                } else {
                    utils.showLog("关卡数据上报失败！");
                }
            }.bind(this));

            if (status == LevelStatus.GameStart) {
                this.postServerData(QTT_REPORT_TYPE.start);
            }

            //上报到qtt的官方服务器
            if (status == LevelStatus.GameWin) {
                this.postGameOverData(Number(level));
            }
        }
    }

    getSign(values) {
        let s = this.sign(values);
        values.sign = s
        this.checkSign(values);
        this._sign = s;
    }
    public getUrl(): string {
        let params = this.getParams();
        const values: any = {
            app_id: utils.config.qttconfig.appID,
            platform: params.platform,
            ticket: params.ticket,
            time: Math.floor(new Date().getTime() / 1000)
        }
        let s = this.sign(values);
        values.sign = s
        this._sign = s;
        return QTT_ServerUrl + "app_id=" + values.app_id + "&platform=" + params.platform + "&ticket=" + params.ticket + "&time=" + values.time + "&sign=" + values.sign;
    }

    getParams(): any {
        let url: string = window.location.href;
        let paramArr = url.split("&");
        let platform;
        let ticket;
        paramArr.forEach(str => {

            if (str.indexOf("platform") != -1) {
                platform = str.split("=")[1];
            }
            if (str.indexOf("ticket") != -1) {
                ticket = str.split("=")[1];
            }
        });
        return { platform: platform, ticket: ticket };
    }
    public sign(values) {
        delete values.sign;
        values.app_key = utils.config.qttconfig.appKey;
        let keysArr = [];
        for (let key in values) {
            keysArr.push(key)
        }
        keysArr.sort();
        let keys = ''
        keysArr.forEach((e) => {
            keys += e;
            keys += values[e];
        });
        console.log("原串：" + keys)
        delete values.app_key;
        let sign = md5(keys);

        return sign;
    }

    public checkSign(values) {
        let sign1 = values.sign;
        if (!sign1) {
            console.log('sign error');
            return false;
        }
        let sign2 = this.sign(values);
        if (sign1 !== sign2) {
            console.log("sign error")
            return false;
        }
        console.log('ok')
        return true;
    }


    _isReady: boolean = false;
    _isLogin: boolean = false;
    _isLoad: boolean = false;
    _isStart: boolean = false;
    /** 
    *  趣头条服务器上报
    * 
    *  参数为object对象, 根据type 属性传入对应字段
    *   @param type {String} ready 游戏资源加载完毕  login 用户成功登陆 load 成功进入游戏界面/主页 start 开始游戏
    *   @param app_id { String} [必填] 
    *   @param open_id {String}  参考具体上报说明
    *   @param game_name {String} 参考具体上报说明
    *   @param extend_info  [选填] json对象 {}
    *   
    **/
    public postServerData(type: QTT_REPORT_TYPE, info?: any) {
        console.log("趣头条数据上报：" + type, this._uid)
        if (!this.uid && this._uid != "0") {
            cc.error("用户ID不存在 ,不上报数据>>>");
            return;
        }
        switch (type) {
            case QTT_REPORT_TYPE.ready:
                if (this._isReady) {
                    console.log("已经上传过资源加载完毕事件")
                    return;
                }
                break;
            case QTT_REPORT_TYPE.login:
                if (this._isLogin) {
                    console.log("以及上传过资源加载完毕事件")
                    return;
                }
                break;
            case QTT_REPORT_TYPE.load:
                if (this._isLoad) {
                    console.log("以及上传过资源加载完毕事件")
                    return;
                }
                break;
            case QTT_REPORT_TYPE.start:
                if (this._isStart) {
                    console.log("以及上传过资源加载完毕事件")
                    return;
                }
                break;
            default:
                break;
        }
        let app_id = utils.config.qttconfig.appID;
        let game_name = utils.config.qttconfig.gamename;
        let extend_info = info ? info : {};
        if (this.qttGame && this.qttGame.reportData) {
            switch (type) {
                case QTT_REPORT_TYPE.ready:
                    this._isReady = true;
                    break;
                case QTT_REPORT_TYPE.login:
                    this._isLogin = true;
                    break;
                case QTT_REPORT_TYPE.load:
                    this._isLoad = true;
                    break;
                case QTT_REPORT_TYPE.start:
                    this._isStart = true;
                    break;
            }
            this.qttGame.reportData({ "type": type, "open_id": this.uid, "app_id": app_id, "game_name": game_name, "extend_info": extend_info })
            console.log("趣头条成功发送事件：" + type);
            cc.game.emit(type);
        } else {
            let self = this;
            console.log("趣头条发送：" + type + "失败");
            setTimeout(() => {
                self.postServerData(type, info);
            }, 100);
        }
    }


    /**
     * 上报自定义事件
     * @param level 当前关卡ID
     * @param levelName 关卡名称
     * @param status 状态
     */
    public sendEvent(eventName: string) {
        if (PlatUtils.IsQTT) {
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
}

export enum QTT_REPORT_TYPE {
    ready = "ready",          //游戏资源加载完毕
    login = "login",          //用户成功登陆
    load = "load",            //成功进入游戏界面/主页
    start = "start",          //开始游戏
    newRole = "newRole",      //新增创角
    newUser = "newUser",      //新增用户
    upgrade = "upgrade",      //用户等级提升
    userInfo = "userInfo",    //用户游戏信息
    abnormal = "abnormal",    //游戏异常
}
