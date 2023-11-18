import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";
import { LevelStatus } from "./YZ_Constant";

const ST_ServerUrl: string = "http://apps.youlesp.com/aconfig?";
let ST_DefaultServerConfig: string = "";
const ST_NativeInsertAdClickTimes: string = "NativeInsertAdClickTimes";
const ST_LastDateTime: string = "LastDateTime";
const POST_ServerUrl: string = "https://report.youletd.com/gss?";

export default class YZ_Tool_GoogleWeb {

	_serverConfig: any = null;
	public get ServerConfig() {
		return this._serverConfig;
	}

	/**
	 * 
	 * @param data 配置数据
	 */
	public init(data: string) {
		this._loadConfig();
	}

	_loadConfig() {
		utils.emitServerInitEvent();
	}

	/**
	 * 上报自定义事件
	 * @param level 当前关卡ID
	 * @param levelName 关卡名称
	 * @param status 状态
	 */
	public sendEvent(eventName: string) {

	}
	/**
	 * 	
	 * @param level 当前关卡ID
	 * @param levelName 关卡名称
	 * @param status 状态
	 */
	public postLevel(level: string, status: LevelStatus, levelName?: string) {

	}
 
}
