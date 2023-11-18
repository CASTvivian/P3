
const { ccclass, property } = cc._decorator;


/**
 * banner 的位置
 */
export enum BeForGameOverAdId {

    None = "none",
    /**
     * 分享
     */
    SharePanel = "share_panel",
    /**
     * 宝箱
     */
    GoldBox = "gold_box",
    /**
     * 抽奖
     */
    Turntable = "turntable",
    /**
    * 创建快捷桌面
    */
    CreateShortCut = "create_short_cut",

    /**
    * 更多游戏推荐
    */
    RecGame = "rec_game",

    /**
    * 幸运宝箱
    */
    LuckBox = "luck_box",

    /**
     * 同步显示
     */
    SyncShow = "sync_show",

    /**
    * 模版广告
    */
    CustomAd = "custom_ad",
};


/**
 * banner 的位置
 */
export enum RewardType {
    /**
     * 金币
     */
    Gold = "gold",
    /**
     * 皮肤
     */
    Skin = "Skin"
};


@ccclass("YZ_Reward")
export class YZ_Reward {
    /**
     * 奖励类型
     */
    rewardType: RewardType = RewardType.Gold;
    /**
     * 奖励值
     */
    rewardValue: number = 0;
}
/**
 * 上报关卡的类型
 * start、complete、fail   、skip
 */
export enum LevelStatus {

    /**
     * 游戏开始
     */
    GameStart = "start",

    /**
     * 游戏胜利
     */
    GameWin = "complete",

    /**
     * 游戏失败
     */
    GameFail = "fail",

    /**
     * 跳过关卡
     */
    GameSkip = "skip",
}

/**
 * 组件类型
 */
export enum SubLocation {
    /**
     * 当前显示的位置
     * isReward //激励插屏
     * isQCross //6个互推组件
     * isMoreGame //更多游戏
     * isStatement //结算组件
     * isTryGame //试玩组件
     * isYzBanner //自定义banner
     * isScrollbar //自定义滚动条
     * isVerticalPanel //竖状互推
     */
    /**
     * 激励插屏
     */
    isReward = "isReward",

    /**
     * 6个互推组件
     */
    isQCross = "isQCross",

    /**
     * 更多游戏
     */
    isMoreGame = "isMoreGame",

    /**
     * 结算组件
     */
    isStatement = "isStatement",

    /**
     * 试玩组件
     */
    isTryGame = "isTryGame",

    /**
     * 自定义banner
     */
    isYzBanner = "isYzBanner",

    /**
     * 自定义滚动条
     */
    isScrollbar = "isScrollbar",
    /**
    * 退出弹窗
    */
    isGameExitDialog = "isGameExitDialog",

    /**
     * 盒子插屏
     */
    isBoxInsertAd = "isBoxInsertAd",

    /**
     * 结算前广告
     */
    isBeforGameOverAd = "isBeforGameOverAd",

    /**
     * 竖状互推
     */
    isVerticalPanel = "isVerticalPanel"
}

/**
 * 震动类型
 */
export enum VibrateType {
    /**
     * 短振
     */
    Short = "short",
    /**
     * 长振
     */
    Long = "long"
}


/**
 * banner 的位置
 */
export enum BannerLocation {
    None = 0,
    Home,
    Level,
    Skin,
    Game,
    Pause,
    Over
};

/**
 * 视窗 的位置
 */
export enum ViewLocation {
    None = 0,
    sign,
    trySkin,
    box,
    over,
    failBox,
    successBox,
    winPanel,
    turntable
};

/**
 * 阿拉丁关卡上报类型
 */
export enum AldStageType {
    /**
     * 游戏开始
     */
    Start = "StartGame",
    /**
     * 游戏进行中
     */
    Running = "Running",

    /**
     * 游戏胜利
     */
    GameWin = "GameWin",

    /**
     * 游戏失败
     */
    GameFail = "GameFail",

}



/**
 * 阿拉丁事件上报的类型
 */
export enum AldEventType {

    /**
     * 点击皮肤试用
     */
    TrailSkinClick = "皮肤试用点击",

    /**
     * 皮肤试用成功
     */
    TrailSkinSuccess = "皮肤试用成功",

    /**
     * 皮肤试用失败
     */
    TrailSkinFail = "皮肤试用失败",

    /**
     * 点击跳过关卡
     */
    SkipLevelClick = "点击跳过关卡",

    /**
    * 跳过关卡成功
    */
    SkipLevelSuccess = "跳过关卡成功",

    /**
    * 跳过关卡
    */
    SkipLevelFail = "跳过关卡失败",
    /**
     * 点击游戏结束双倍获取金币
     */
    GameOverDoubleGoldClick = "点击游戏结束双倍获取金币",

    /**
     * 游戏结束双倍获取金币成功
     */
    GameOverDoubleGoldSuccess = "游戏结束双倍获取金币成功",

    /**
     * 游戏结束双倍获取金币失败
     */
    GameOverDoubleGoldFail = "游戏结束双倍获取金币失败",
    /**
     * 点击签到获取双倍金币
     */
    SignDoubleGoldClick = "点击签到双倍领取",

    /**
     * 签到获取双倍金币成功
     */
    SignDoubleGoldSuccess = "签到双倍领取成功",

    /**
     * 签到获取双倍金币失败
     */
    SignDoubleGoldFail = "签到双倍领取失败",
    /**
     * 游戏结束晋级三星
     */
    GameOverDoubleStarClick = "点击游戏结束晋级三星",
    /**
     * 游戏结束晋级三星
     */
    GameOverDoubleStarSuccess = "游戏结束晋级三星成功",
    /**
     * 游戏结束晋级三星
     */
    GameOverDoubleStarFail = "游戏结束晋级三星失败",

    /**
     * 游戏版本
     * 游戏加载成功后上报
     */
    GameVersion = "游戏版本",

    /**
     * 进入皮肤场景
     */
    LoadSkinScene = "进入皮肤场景",

    /**
     * 购买皮肤成功
     */
    PaySkin = "购买皮肤成功",
};

/**
 * 归因事件类型
 */
export enum AttributedType {
    /**
     * 激活
     */
    Active = 0,
    /**
     * 关键行为
     */
    GameAddiction = 25
};

/**
 * 归因事件Key
 */
export enum AttributedKey {
    /**
     * 激活
     */
    Active = "active",
    /**
     * 关键行为
     */
    GameAddiction = "game_addiction"
};

/**
 * 归因事件Key
 * 
 * user_click_insert_ad_active:"true" //用户点击插屏之后上报激活
play_level_count_active:5 //验证当前闯关次数是否达到激活用户的条件
pass_level_count_active:5 //验证当前通关次数是否达到激活用户的条件
insert_ad_first_show_active: "true" //插屏首次展示成功是否上报激活事件
 */
export enum AttributedValue {
    /**
     * 激活
     */
    Active = "active",
    /**
     * 关键行为-用户点击插屏之后上报激活
     */
    UserClickInsertAdAction = "user_click_insert_ad_action",

    /**
    * 关键行为-当前闯关次数行为
    */
    PlayLevelCountAction = "play_level_count_action",


    /**
    * 关键行为-当前通过关卡次数行为
    */
    PassLevelCountAction = "pass_level_count_action",

    /**
    * 关键行为-插屏首次展示成功行为
    */
    InsertAdFirstShowAction = "insert_ad_first_show_action",

    /**
   * 关键行为-游戏时长行为
   */
    GameTimeAction = "game_time_action",

};

/**
 * BannerLocation 转换成对应的字符串
 * @param location 
 */
export let BannerLocationToString = function (location: BannerLocation) {
    let str: string[] = ["none", "home", "level", "skin", "game", "pause", "over"];
    return str[location];
};

/**
 * Location字符串转换成对应的BannerLocation
 * @param locationString 
 */
export let BannerLocationToEnum = function (locationString: string) {
    let str: string[] = ["none", "home", "level", "skin", "game", "pause", "over"];
    for (let i = 0; i < str.length; i++) {
        if (str[i] == locationString) {
            return i as BannerLocation;
        }
    }

    return BannerLocation.None;
}


@ccclass
export default class YZ_Constant {

    // 接口版本号
    public static SERVER_VERSION: string = "v1";

    // 常量定义
    // 设备UID
    public static ST_UID: string = "UID";


    // 服务器UID
    public static ST_SERVICE_UID: string = "SERVICE_UID";

    // 用户来源
    public static ST_SOURCE: string = "SOURCE";

    // 红包当前进度
    public static ST_RED_BAG_PROGRESS: string = "YZ_RED_BAG_PROGRESS";

    // 红包总进度
    public static ST_RED_BAG_TOTAL_PROGRESS: string = "YZ_RED_BAG_TOTAL_PROGRESS";

    // 红包余额
    public static ST_RED_BAG_BALANCE: string = "YZ_RED_BAG_BALANCE";

    // 红包总金额
    public static ST_RED_BAG_TOTAL_MONEY: string = "YZ_RED_BAG_TOTAL_MONEY";

    // 免费红包领取时间
    public static ST_FREE_RED_BAG_TIME: string = "YZ_ST_FREE_RED_BAG_TIME";

    // 最后领取红包的关卡
    public static ST_LAST_OPEN_LEVEL: string = "YZ_ST_LAST_OPEN_LEVEL";

    // 宝箱获取奖励的次数
    public static ST_GET_BOX_REWARD_COUNT: string = "YZ_GET_BOX_REWARD_COUNT";


    // 红包进度
    // public static ST_RED_BAG_PROGRESS: string = "YZ_RED_BAG_PROGRESS";


    // 组件事件定义
    public static YZ_EventCommon: string = "YZ_EventCommon";
    public static YZ_PrivacyClose: string = "YZ_PrivacyClose";
    public static EC_ServerInit: string = "ServerInit";


    public static EC_RealNameAuthPanelClose: string = "RealNameAuthPanelClose";
    /**
     * 服务器数据拉取成功
     */
    public static EC_ServerDataLoadSuccess: string = "ServerDataLoadSuccess";


    public static YZ_NativeAdClick: string = "YZ_NativeAdClick";


    public static EC_OnHide: string = "EventOnHide";
    public static EC_OnShow: string = "EventOnShow";

    public static YZ_GAME_YSXY: string = "YZ_GAME_YSXY";

    // 是否上报激活
    public static ST_IS_REPORT_USER_ACTIVE: string = "ST_IS_REPORT_USER_ACTIVE";

    // 是否上报关键激活
    public static ST_IS_REPORT_GAME_ADDICTION: string = "ST_IS_REPORT_GAME_ADDICTION";


    // 启动类型
    public static ST_LUANCH_TYPE: string = "ST_LUANCH_TYPE";

    // 启动参数
    public static ST_LUANCH_DATA: string = "ST_LUANCH_DATA";

    // 登录成功
    public static ST_LOGIN_SUCCESS: string = "ST_LOGIN_SUCCESS";

    // 登录失败
    public static ST_LOGIN_FAIL: string = "ST_LOGIN_FAIL";

    // 设备ID
    public static ST_DEVICE_ID: string = "ST_DEVICE_ID";

    // 本地UUID
    public static ST_UUID: string = "ST_UUID";

    // 优玩UID
    public static ST_YOUWAN_UID: string = "ST_YOUWAN_UID";

    // 是否有获取过device_id
    public static ST_GET_DEVICE_ID: string = "ST_GET_DEVICE_ID";
}
