"use strict";
cc._RF.push(module, 'ca28dw/QkVP9IpkNRINo1+D', 'YZ_Constant');
// common-plugin/Scripts/YZ_Constant.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerLocationToEnum = exports.BannerLocationToString = exports.AttributedValue = exports.AttributedKey = exports.AttributedType = exports.AldEventType = exports.AldStageType = exports.ViewLocation = exports.BannerLocation = exports.VibrateType = exports.SubLocation = exports.LevelStatus = exports.YZ_Reward = exports.RewardType = exports.BeForGameOverAdId = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * banner 的位置
 */
var BeForGameOverAdId;
(function (BeForGameOverAdId) {
    BeForGameOverAdId["None"] = "none";
    /**
     * 分享
     */
    BeForGameOverAdId["SharePanel"] = "share_panel";
    /**
     * 宝箱
     */
    BeForGameOverAdId["GoldBox"] = "gold_box";
    /**
     * 抽奖
     */
    BeForGameOverAdId["Turntable"] = "turntable";
    /**
    * 创建快捷桌面
    */
    BeForGameOverAdId["CreateShortCut"] = "create_short_cut";
    /**
    * 更多游戏推荐
    */
    BeForGameOverAdId["RecGame"] = "rec_game";
    /**
    * 幸运宝箱
    */
    BeForGameOverAdId["LuckBox"] = "luck_box";
    /**
     * 同步显示
     */
    BeForGameOverAdId["SyncShow"] = "sync_show";
    /**
    * 模版广告
    */
    BeForGameOverAdId["CustomAd"] = "custom_ad";
})(BeForGameOverAdId = exports.BeForGameOverAdId || (exports.BeForGameOverAdId = {}));
;
/**
 * banner 的位置
 */
var RewardType;
(function (RewardType) {
    /**
     * 金币
     */
    RewardType["Gold"] = "gold";
    /**
     * 皮肤
     */
    RewardType["Skin"] = "Skin";
})(RewardType = exports.RewardType || (exports.RewardType = {}));
;
var YZ_Reward = /** @class */ (function () {
    function YZ_Reward() {
        /**
         * 奖励类型
         */
        this.rewardType = RewardType.Gold;
        /**
         * 奖励值
         */
        this.rewardValue = 0;
    }
    YZ_Reward = __decorate([
        ccclass("YZ_Reward")
    ], YZ_Reward);
    return YZ_Reward;
}());
exports.YZ_Reward = YZ_Reward;
/**
 * 上报关卡的类型
 * start、complete、fail   、skip
 */
var LevelStatus;
(function (LevelStatus) {
    /**
     * 游戏开始
     */
    LevelStatus["GameStart"] = "start";
    /**
     * 游戏胜利
     */
    LevelStatus["GameWin"] = "complete";
    /**
     * 游戏失败
     */
    LevelStatus["GameFail"] = "fail";
    /**
     * 跳过关卡
     */
    LevelStatus["GameSkip"] = "skip";
})(LevelStatus = exports.LevelStatus || (exports.LevelStatus = {}));
/**
 * 组件类型
 */
var SubLocation;
(function (SubLocation) {
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
    SubLocation["isReward"] = "isReward";
    /**
     * 6个互推组件
     */
    SubLocation["isQCross"] = "isQCross";
    /**
     * 更多游戏
     */
    SubLocation["isMoreGame"] = "isMoreGame";
    /**
     * 结算组件
     */
    SubLocation["isStatement"] = "isStatement";
    /**
     * 试玩组件
     */
    SubLocation["isTryGame"] = "isTryGame";
    /**
     * 自定义banner
     */
    SubLocation["isYzBanner"] = "isYzBanner";
    /**
     * 自定义滚动条
     */
    SubLocation["isScrollbar"] = "isScrollbar";
    /**
    * 退出弹窗
    */
    SubLocation["isGameExitDialog"] = "isGameExitDialog";
    /**
     * 盒子插屏
     */
    SubLocation["isBoxInsertAd"] = "isBoxInsertAd";
    /**
     * 结算前广告
     */
    SubLocation["isBeforGameOverAd"] = "isBeforGameOverAd";
    /**
     * 竖状互推
     */
    SubLocation["isVerticalPanel"] = "isVerticalPanel";
})(SubLocation = exports.SubLocation || (exports.SubLocation = {}));
/**
 * 震动类型
 */
var VibrateType;
(function (VibrateType) {
    /**
     * 短振
     */
    VibrateType["Short"] = "short";
    /**
     * 长振
     */
    VibrateType["Long"] = "long";
})(VibrateType = exports.VibrateType || (exports.VibrateType = {}));
/**
 * banner 的位置
 */
var BannerLocation;
(function (BannerLocation) {
    BannerLocation[BannerLocation["None"] = 0] = "None";
    BannerLocation[BannerLocation["Home"] = 1] = "Home";
    BannerLocation[BannerLocation["Level"] = 2] = "Level";
    BannerLocation[BannerLocation["Skin"] = 3] = "Skin";
    BannerLocation[BannerLocation["Game"] = 4] = "Game";
    BannerLocation[BannerLocation["Pause"] = 5] = "Pause";
    BannerLocation[BannerLocation["Over"] = 6] = "Over";
})(BannerLocation = exports.BannerLocation || (exports.BannerLocation = {}));
;
/**
 * 视窗 的位置
 */
var ViewLocation;
(function (ViewLocation) {
    ViewLocation[ViewLocation["None"] = 0] = "None";
    ViewLocation[ViewLocation["sign"] = 1] = "sign";
    ViewLocation[ViewLocation["trySkin"] = 2] = "trySkin";
    ViewLocation[ViewLocation["box"] = 3] = "box";
    ViewLocation[ViewLocation["over"] = 4] = "over";
    ViewLocation[ViewLocation["failBox"] = 5] = "failBox";
    ViewLocation[ViewLocation["successBox"] = 6] = "successBox";
    ViewLocation[ViewLocation["winPanel"] = 7] = "winPanel";
    ViewLocation[ViewLocation["turntable"] = 8] = "turntable";
})(ViewLocation = exports.ViewLocation || (exports.ViewLocation = {}));
;
/**
 * 阿拉丁关卡上报类型
 */
var AldStageType;
(function (AldStageType) {
    /**
     * 游戏开始
     */
    AldStageType["Start"] = "StartGame";
    /**
     * 游戏进行中
     */
    AldStageType["Running"] = "Running";
    /**
     * 游戏胜利
     */
    AldStageType["GameWin"] = "GameWin";
    /**
     * 游戏失败
     */
    AldStageType["GameFail"] = "GameFail";
})(AldStageType = exports.AldStageType || (exports.AldStageType = {}));
/**
 * 阿拉丁事件上报的类型
 */
var AldEventType;
(function (AldEventType) {
    /**
     * 点击皮肤试用
     */
    AldEventType["TrailSkinClick"] = "\u76AE\u80A4\u8BD5\u7528\u70B9\u51FB";
    /**
     * 皮肤试用成功
     */
    AldEventType["TrailSkinSuccess"] = "\u76AE\u80A4\u8BD5\u7528\u6210\u529F";
    /**
     * 皮肤试用失败
     */
    AldEventType["TrailSkinFail"] = "\u76AE\u80A4\u8BD5\u7528\u5931\u8D25";
    /**
     * 点击跳过关卡
     */
    AldEventType["SkipLevelClick"] = "\u70B9\u51FB\u8DF3\u8FC7\u5173\u5361";
    /**
    * 跳过关卡成功
    */
    AldEventType["SkipLevelSuccess"] = "\u8DF3\u8FC7\u5173\u5361\u6210\u529F";
    /**
    * 跳过关卡
    */
    AldEventType["SkipLevelFail"] = "\u8DF3\u8FC7\u5173\u5361\u5931\u8D25";
    /**
     * 点击游戏结束双倍获取金币
     */
    AldEventType["GameOverDoubleGoldClick"] = "\u70B9\u51FB\u6E38\u620F\u7ED3\u675F\u53CC\u500D\u83B7\u53D6\u91D1\u5E01";
    /**
     * 游戏结束双倍获取金币成功
     */
    AldEventType["GameOverDoubleGoldSuccess"] = "\u6E38\u620F\u7ED3\u675F\u53CC\u500D\u83B7\u53D6\u91D1\u5E01\u6210\u529F";
    /**
     * 游戏结束双倍获取金币失败
     */
    AldEventType["GameOverDoubleGoldFail"] = "\u6E38\u620F\u7ED3\u675F\u53CC\u500D\u83B7\u53D6\u91D1\u5E01\u5931\u8D25";
    /**
     * 点击签到获取双倍金币
     */
    AldEventType["SignDoubleGoldClick"] = "\u70B9\u51FB\u7B7E\u5230\u53CC\u500D\u9886\u53D6";
    /**
     * 签到获取双倍金币成功
     */
    AldEventType["SignDoubleGoldSuccess"] = "\u7B7E\u5230\u53CC\u500D\u9886\u53D6\u6210\u529F";
    /**
     * 签到获取双倍金币失败
     */
    AldEventType["SignDoubleGoldFail"] = "\u7B7E\u5230\u53CC\u500D\u9886\u53D6\u5931\u8D25";
    /**
     * 游戏结束晋级三星
     */
    AldEventType["GameOverDoubleStarClick"] = "\u70B9\u51FB\u6E38\u620F\u7ED3\u675F\u664B\u7EA7\u4E09\u661F";
    /**
     * 游戏结束晋级三星
     */
    AldEventType["GameOverDoubleStarSuccess"] = "\u6E38\u620F\u7ED3\u675F\u664B\u7EA7\u4E09\u661F\u6210\u529F";
    /**
     * 游戏结束晋级三星
     */
    AldEventType["GameOverDoubleStarFail"] = "\u6E38\u620F\u7ED3\u675F\u664B\u7EA7\u4E09\u661F\u5931\u8D25";
    /**
     * 游戏版本
     * 游戏加载成功后上报
     */
    AldEventType["GameVersion"] = "\u6E38\u620F\u7248\u672C";
    /**
     * 进入皮肤场景
     */
    AldEventType["LoadSkinScene"] = "\u8FDB\u5165\u76AE\u80A4\u573A\u666F";
    /**
     * 购买皮肤成功
     */
    AldEventType["PaySkin"] = "\u8D2D\u4E70\u76AE\u80A4\u6210\u529F";
})(AldEventType = exports.AldEventType || (exports.AldEventType = {}));
;
/**
 * 归因事件类型
 */
var AttributedType;
(function (AttributedType) {
    /**
     * 激活
     */
    AttributedType[AttributedType["Active"] = 0] = "Active";
    /**
     * 关键行为
     */
    AttributedType[AttributedType["GameAddiction"] = 25] = "GameAddiction";
})(AttributedType = exports.AttributedType || (exports.AttributedType = {}));
;
/**
 * 归因事件Key
 */
var AttributedKey;
(function (AttributedKey) {
    /**
     * 激活
     */
    AttributedKey["Active"] = "active";
    /**
     * 关键行为
     */
    AttributedKey["GameAddiction"] = "game_addiction";
})(AttributedKey = exports.AttributedKey || (exports.AttributedKey = {}));
;
/**
 * 归因事件Key
 *
 * user_click_insert_ad_active:"true" //用户点击插屏之后上报激活
play_level_count_active:5 //验证当前闯关次数是否达到激活用户的条件
pass_level_count_active:5 //验证当前通关次数是否达到激活用户的条件
insert_ad_first_show_active: "true" //插屏首次展示成功是否上报激活事件
 */
var AttributedValue;
(function (AttributedValue) {
    /**
     * 激活
     */
    AttributedValue["Active"] = "active";
    /**
     * 关键行为-用户点击插屏之后上报激活
     */
    AttributedValue["UserClickInsertAdAction"] = "user_click_insert_ad_action";
    /**
    * 关键行为-当前闯关次数行为
    */
    AttributedValue["PlayLevelCountAction"] = "play_level_count_action";
    /**
    * 关键行为-当前通过关卡次数行为
    */
    AttributedValue["PassLevelCountAction"] = "pass_level_count_action";
    /**
    * 关键行为-插屏首次展示成功行为
    */
    AttributedValue["InsertAdFirstShowAction"] = "insert_ad_first_show_action";
    /**
   * 关键行为-游戏时长行为
   */
    AttributedValue["GameTimeAction"] = "game_time_action";
})(AttributedValue = exports.AttributedValue || (exports.AttributedValue = {}));
;
/**
 * BannerLocation 转换成对应的字符串
 * @param location
 */
exports.BannerLocationToString = function (location) {
    var str = ["none", "home", "level", "skin", "game", "pause", "over"];
    return str[location];
};
/**
 * Location字符串转换成对应的BannerLocation
 * @param locationString
 */
exports.BannerLocationToEnum = function (locationString) {
    var str = ["none", "home", "level", "skin", "game", "pause", "over"];
    for (var i = 0; i < str.length; i++) {
        if (str[i] == locationString) {
            return i;
        }
    }
    return BannerLocation.None;
};
var YZ_Constant = /** @class */ (function () {
    function YZ_Constant() {
    }
    // 接口版本号
    YZ_Constant.SERVER_VERSION = "v1";
    // 常量定义
    // 设备UID
    YZ_Constant.ST_UID = "UID";
    // 服务器UID
    YZ_Constant.ST_SERVICE_UID = "SERVICE_UID";
    // 用户来源
    YZ_Constant.ST_SOURCE = "SOURCE";
    // 红包当前进度
    YZ_Constant.ST_RED_BAG_PROGRESS = "YZ_RED_BAG_PROGRESS";
    // 红包总进度
    YZ_Constant.ST_RED_BAG_TOTAL_PROGRESS = "YZ_RED_BAG_TOTAL_PROGRESS";
    // 红包余额
    YZ_Constant.ST_RED_BAG_BALANCE = "YZ_RED_BAG_BALANCE";
    // 红包总金额
    YZ_Constant.ST_RED_BAG_TOTAL_MONEY = "YZ_RED_BAG_TOTAL_MONEY";
    // 免费红包领取时间
    YZ_Constant.ST_FREE_RED_BAG_TIME = "YZ_ST_FREE_RED_BAG_TIME";
    // 最后领取红包的关卡
    YZ_Constant.ST_LAST_OPEN_LEVEL = "YZ_ST_LAST_OPEN_LEVEL";
    // 宝箱获取奖励的次数
    YZ_Constant.ST_GET_BOX_REWARD_COUNT = "YZ_GET_BOX_REWARD_COUNT";
    // 红包进度
    // public static ST_RED_BAG_PROGRESS: string = "YZ_RED_BAG_PROGRESS";
    // 组件事件定义
    YZ_Constant.YZ_EventCommon = "YZ_EventCommon";
    YZ_Constant.YZ_PrivacyClose = "YZ_PrivacyClose";
    YZ_Constant.EC_ServerInit = "ServerInit";
    YZ_Constant.EC_RealNameAuthPanelClose = "RealNameAuthPanelClose";
    /**
     * 服务器数据拉取成功
     */
    YZ_Constant.EC_ServerDataLoadSuccess = "ServerDataLoadSuccess";
    YZ_Constant.YZ_NativeAdClick = "YZ_NativeAdClick";
    YZ_Constant.EC_OnHide = "EventOnHide";
    YZ_Constant.EC_OnShow = "EventOnShow";
    YZ_Constant.YZ_GAME_YSXY = "YZ_GAME_YSXY";
    // 是否上报激活
    YZ_Constant.ST_IS_REPORT_USER_ACTIVE = "ST_IS_REPORT_USER_ACTIVE";
    // 是否上报关键激活
    YZ_Constant.ST_IS_REPORT_GAME_ADDICTION = "ST_IS_REPORT_GAME_ADDICTION";
    // 启动类型
    YZ_Constant.ST_LUANCH_TYPE = "ST_LUANCH_TYPE";
    // 启动参数
    YZ_Constant.ST_LUANCH_DATA = "ST_LUANCH_DATA";
    // 登录成功
    YZ_Constant.ST_LOGIN_SUCCESS = "ST_LOGIN_SUCCESS";
    // 登录失败
    YZ_Constant.ST_LOGIN_FAIL = "ST_LOGIN_FAIL";
    // 设备ID
    YZ_Constant.ST_DEVICE_ID = "ST_DEVICE_ID";
    // 本地UUID
    YZ_Constant.ST_UUID = "ST_UUID";
    // 优玩UID
    YZ_Constant.ST_YOUWAN_UID = "ST_YOUWAN_UID";
    // 是否有获取过device_id
    YZ_Constant.ST_GET_DEVICE_ID = "ST_GET_DEVICE_ID";
    YZ_Constant = __decorate([
        ccclass
    ], YZ_Constant);
    return YZ_Constant;
}());
exports.default = YZ_Constant;

cc._RF.pop();