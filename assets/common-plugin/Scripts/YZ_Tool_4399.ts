import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

//<script src="http://h.api.4399.com/h5mini-2.0/h5api-interface.php"></script>

/**
 * uc工具类
 */
@ccclass
export default class YZ_Tool_4399 {
	//@ts-ignore
	_4399 = window.h5api;
	_sysInfo: any = {};
	public get SysInfo() {
		return this._sysInfo;
	}

	/**
 * 服务器配置信息
 */
	_serverConfig: any = null;
	public get ServerConfig() {
		return this._serverConfig;
	}


	/**
	 * 
	 * @param data 配置数据
	 */
	public init(data: string) {
		if (PlatUtils.Is4399) {

			// if (data) {
			// 	let configObj: any = JSON.parse(data);
			// 	if (configObj && configObj.uc) {
			// 		ST_DefaultServerConfig = JSON.stringify(configObj.uc);
			// 	}
			// }
			utils.showLog("4399 h5 平台初始化完成 >>");
			utils.emitServerInitEvent();

		}

	}

	public share(callBack: Function) {
		this._4399.share();
		callBack && callBack(true, "");
	}

	/**
	 * 显示推荐弹窗
	 */
	public showRecommend() {
		this._4399.showRecommend()
	}


}
