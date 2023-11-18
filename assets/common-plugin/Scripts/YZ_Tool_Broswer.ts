import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import { LevelStatus } from "./YZ_Constant";

const ST_ServerUrl: string = "http://apps.youlesp.com/aconfig?";
let ST_DefaultServerConfig: string = "";
const ST_NativeInsertAdClickTimes: string = "NativeInsertAdClickTimes";
const ST_LastDateTime: string = "LastDateTime";
const POST_ServerUrl: string = "https://report.youletd.com/gss?";

export default class YZ_Tool_Broswer {

	_serverConfig: any = null;
	public get ServerConfig() {
		return this._serverConfig;
	}

	_nativeInsertAdClickTimes: number = 0;
	public get NativeInsertAdClickTimes() {
		return this._nativeInsertAdClickTimes;
	}
	public _img_url: string = "app/editor/static/img/logo-with-text.png"
	// 桌面图标是否创建
	_shortcutCreated: boolean = false;
	public get ShortcutCreated() {
		return this._shortcutCreated;
	}
	get img_url(): string {
		return window.location.href + this._img_url;
	}
	/**
	 * 获取交叉推广数据
	 */
	public getRecommondGameList() {
		return [
			{
				"id": "30213731",
				"name": "测试一",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试二",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试三",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试四",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试五",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试六",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试七",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试八",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试九",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试10",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试11",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试12",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试13",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			},
			{
				"id": "30213731",
				"name": "测试14",
				"appid": "com.yzxx.hcrttt.kyx.nearme.gamecenter",
				"logo": this.img_url,
				"icon": this.img_url
			}
		];
	}
	/**
	 * 
	 * @param data 配置数据
	 */
	public init(data: string) {
		if (data) {
			let configObj: any = JSON.parse(data);
			if (configObj && configObj.oppo) {
				ST_DefaultServerConfig = JSON.stringify(configObj.oppo);
			}
		}
		let self = this;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', this.img_url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log("测试图片路径正常")
				self._loadConfig();
			}
			if (xhr.readyState == 4 && xhr.status == 404) {
				console.log("测试图片路径不存在切换图片路径");
				self._img_url = "app/editor/static/preview-templates/splash.png"
				self._loadConfig();
			}
		}
		xhr.ontimeout = function () {
			console.log("测试图片加载超时切换图片路径");
			self._img_url = "app/editor/static/preview-templates/splash.png"
			self._loadConfig();
		}
		xhr.onerror = function (err) {
			console.log("测试图片路径异常：" + err + "切换图片路径");
			self._img_url = "app/editor/static/preview-templates/splash.png"
			self._loadConfig();
		}
	}

	_loadConfig() {
		this._serverConfig = JSON.parse(ST_DefaultServerConfig);
		this._serverConfig.icon_jump = 5;
		this._serverConfig.jump_list = this.getRecommondGameList();
		utils.emitServerInitEvent();
	}

	/**
	 * 上报自定义事件
	 * @param level 当前关卡ID
	 * @param levelName 关卡名称
	 * @param status 状态
	 */
	public sendEvent(eventName: string) {
		if (PlatUtils.IsTest) {
			// let method = "m=revent";
			utils.showLog("上报自定义事件 " + eventName);
			// let url: string = POST_ServerUrl + method + `&event=${encodeURI(eventName)}`;
			// utils.commomHttpRequest(url, function (ret, data) {
			// 	if (ret) {
			// 		utils.showLog("上报自定义事件成功！");
			// 	} else {
			// 		utils.showLog("上报自定义事件失败！");
			// 	}
			// }.bind(this));
		}
	}
	/**
	 * 	
	 * @param level 当前关卡ID
	 * @param levelName 关卡名称
	 * @param status 状态
	 */
	public postLevel(level: string, status: LevelStatus, levelName?: string) {
		if (PlatUtils.IsTest) {
			// let method = "m=rlevel";

			utils.showLog(`关卡${level},${status}`);
			// let url: string = POST_ServerUrl + method + `&level_id=${level}&level_name=${encodeURI(levelName)}&status=${status}`;
			// utils.commomHttpRequest(url, function (ret, data) {
			// 	if (ret) {
			// 		utils.showLog("关卡数据上报成功！");
			// 	} else {
			// 		utils.showLog("关卡数据上报失败！");
			// 	}
			// }.bind(this));
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
		xhr.timeout = 6000;    // 单位毫秒
		let data: any = {};
		data.kyx = false;
		data.app_id = "6103b73b864a9558e6d65af8";
		data.channel = "m233";
		data.device_uid = 0;
		data.uid = "482501611";
		data.game_type = 2;
		data.device_data = "";
		data.game_version = "1.0.0";
		data.reqv = "";
		data.app_list = "";
		data.id_card = code;
		data.real_name = name;

		let requestData = JSON.stringify(data);
		let requestUrl: string = "https://apps.youlesp.com/gss?" + method + `&time_stamp=${(new Date()).getTime()}&json_data=${utils.aesEncrypt(requestData)}`;
		utils.showLog("服务器地址:" + requestUrl);
		xhr.open('GET', requestUrl);
		xhr.send();
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
