import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import YZ_Constant, { LevelStatus } from "./YZ_Constant";

const { ccclass, property } = cc._decorator;

/**
 * 哔哩工具类
 */
@ccclass
export default class YZ_Tool_Bili {

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
		if (PlatUtils.IsBili) {

			// if (data) {
			// 	let configObj: any = JSON.parse(data);
			// 	if (configObj && configObj.uc) {
			// 		ST_DefaultServerConfig = JSON.stringify(configObj.uc);
			// 	}
			// }
			utils.showLog("哔哩 平台初始化完成 >>");
			this.initSystemInfo();
			utils.emitServerInitEvent();
		}

	}

	/**
	 * 分享
	 * @param callback 回调
	 */
	public share(callback: Function = null) {
		//@ts-ignore
		bl.shareAppMessage({
			title: utils.config.otherconfig.shareTitle,
			imageUrl: utils.config.otherconfig.shareImgUrl,
			success: () => {
				utils.showLog("bili 分享成功！");
				callback && callback(true)
			},
			fail: () => {
				utils.showLog("bili 分享失败！");
				callback && callback(false, "分享失败！");
			}
		})
	}



	/**
	 * 初始化获取系统信息参数
	 */
	public initSystemInfo() {
		if (PlatUtils.IsBili) {
			//@ts-ignore
			this._sysInfo = bl.getSystemInfoSync();
		}
	}

}
