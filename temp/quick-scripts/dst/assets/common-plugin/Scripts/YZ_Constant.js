
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_Constant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfQ29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7O0dBRUc7QUFDSCxJQUFZLGlCQXVDWDtBQXZDRCxXQUFZLGlCQUFpQjtJQUV6QixrQ0FBYSxDQUFBO0lBQ2I7O09BRUc7SUFDSCwrQ0FBMEIsQ0FBQTtJQUMxQjs7T0FFRztJQUNILHlDQUFvQixDQUFBO0lBQ3BCOztPQUVHO0lBQ0gsNENBQXVCLENBQUE7SUFDdkI7O01BRUU7SUFDRix3REFBbUMsQ0FBQTtJQUVuQzs7TUFFRTtJQUNGLHlDQUFvQixDQUFBO0lBRXBCOztNQUVFO0lBQ0YseUNBQW9CLENBQUE7SUFFcEI7O09BRUc7SUFDSCwyQ0FBc0IsQ0FBQTtJQUV0Qjs7TUFFRTtJQUNGLDJDQUFzQixDQUFBO0FBQzFCLENBQUMsRUF2Q1csaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUF1QzVCO0FBQUEsQ0FBQztBQUdGOztHQUVHO0FBQ0gsSUFBWSxVQVNYO0FBVEQsV0FBWSxVQUFVO0lBQ2xCOztPQUVHO0lBQ0gsMkJBQWEsQ0FBQTtJQUNiOztPQUVHO0lBQ0gsMkJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBVFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFTckI7QUFBQSxDQUFDO0FBSUY7SUFBQTtRQUNJOztXQUVHO1FBQ0gsZUFBVSxHQUFlLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDekM7O1dBRUc7UUFDSCxnQkFBVyxHQUFXLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBVFksU0FBUztRQURyQixPQUFPLENBQUMsV0FBVyxDQUFDO09BQ1IsU0FBUyxDQVNyQjtJQUFELGdCQUFDO0NBVEQsQUFTQyxJQUFBO0FBVFksOEJBQVM7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IjpbIlxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBiYW5uZXIg55qE5L2N572uXHJcbiAqL1xyXG5leHBvcnQgZW51bSBCZUZvckdhbWVPdmVyQWRJZCB7XHJcblxyXG4gICAgTm9uZSA9IFwibm9uZVwiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqtcclxuICAgICAqL1xyXG4gICAgU2hhcmVQYW5lbCA9IFwic2hhcmVfcGFuZWxcIixcclxuICAgIC8qKlxyXG4gICAgICog5a6d566xXHJcbiAgICAgKi9cclxuICAgIEdvbGRCb3ggPSBcImdvbGRfYm94XCIsXHJcbiAgICAvKipcclxuICAgICAqIOaKveWlllxyXG4gICAgICovXHJcbiAgICBUdXJudGFibGUgPSBcInR1cm50YWJsZVwiLFxyXG4gICAgLyoqXHJcbiAgICAqIOWIm+W7uuW/q+aNt+ahjOmdolxyXG4gICAgKi9cclxuICAgIENyZWF0ZVNob3J0Q3V0ID0gXCJjcmVhdGVfc2hvcnRfY3V0XCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOabtOWkmua4uOaIj+aOqOiNkFxyXG4gICAgKi9cclxuICAgIFJlY0dhbWUgPSBcInJlY19nYW1lXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW5uOi/kOWuneeusVxyXG4gICAgKi9cclxuICAgIEx1Y2tCb3ggPSBcImx1Y2tfYm94XCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkIzmraXmmL7npLpcclxuICAgICAqL1xyXG4gICAgU3luY1Nob3cgPSBcInN5bmNfc2hvd1wiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmqKHniYjlub/lkYpcclxuICAgICovXHJcbiAgICBDdXN0b21BZCA9IFwiY3VzdG9tX2FkXCIsXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIGJhbm5lciDnmoTkvY3nva5cclxuICovXHJcbmV4cG9ydCBlbnVtIFJld2FyZFR5cGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiDph5HluIFcclxuICAgICAqL1xyXG4gICAgR29sZCA9IFwiZ29sZFwiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDnmq7ogqRcclxuICAgICAqL1xyXG4gICAgU2tpbiA9IFwiU2tpblwiXHJcbn07XHJcblxyXG5cclxuQGNjY2xhc3MoXCJZWl9SZXdhcmRcIilcclxuZXhwb3J0IGNsYXNzIFlaX1Jld2FyZCB7XHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseexu+Wei1xyXG4gICAgICovXHJcbiAgICByZXdhcmRUeXBlOiBSZXdhcmRUeXBlID0gUmV3YXJkVHlwZS5Hb2xkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHlgLxcclxuICAgICAqL1xyXG4gICAgcmV3YXJkVmFsdWU6IG51bWJlciA9IDA7XHJcbn1cclxuLyoqXHJcbiAqIOS4iuaKpeWFs+WNoeeahOexu+Wei1xyXG4gKiBzdGFydOOAgWNvbXBsZXRl44CBZmFpbCAgIOOAgXNraXBcclxuICovXHJcbmV4cG9ydCBlbnVtIExldmVsU3RhdHVzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+W8gOWni1xyXG4gICAgICovXHJcbiAgICBHYW1lU3RhcnQgPSBcInN0YXJ0XCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/og5zliKlcclxuICAgICAqL1xyXG4gICAgR2FtZVdpbiA9IFwiY29tcGxldGVcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+Wksei0pVxyXG4gICAgICovXHJcbiAgICBHYW1lRmFpbCA9IFwiZmFpbFwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Lez6L+H5YWz5Y2hXHJcbiAgICAgKi9cclxuICAgIEdhbWVTa2lwID0gXCJza2lwXCIsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnu4Tku7bnsbvlnotcclxuICovXHJcbmV4cG9ydCBlbnVtIFN1YkxvY2F0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5pi+56S655qE5L2N572uXHJcbiAgICAgKiBpc1Jld2FyZCAvL+a/gOWKseaPkuWxj1xyXG4gICAgICogaXNRQ3Jvc3MgLy825Liq5LqS5o6o57uE5Lu2XHJcbiAgICAgKiBpc01vcmVHYW1lIC8v5pu05aSa5ri45oiPXHJcbiAgICAgKiBpc1N0YXRlbWVudCAvL+e7k+eul+e7hOS7tlxyXG4gICAgICogaXNUcnlHYW1lIC8v6K+V546p57uE5Lu2XHJcbiAgICAgKiBpc1l6QmFubmVyIC8v6Ieq5a6a5LmJYmFubmVyXHJcbiAgICAgKiBpc1Njcm9sbGJhciAvL+iHquWumuS5iea7muWKqOadoVxyXG4gICAgICogaXNWZXJ0aWNhbFBhbmVsIC8v56uW54q25LqS5o6oXHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICog5r+A5Yqx5o+S5bGPXHJcbiAgICAgKi9cclxuICAgIGlzUmV3YXJkID0gXCJpc1Jld2FyZFwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogNuS4quS6kuaOqOe7hOS7tlxyXG4gICAgICovXHJcbiAgICBpc1FDcm9zcyA9IFwiaXNRQ3Jvc3NcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOWkmua4uOaIj1xyXG4gICAgICovXHJcbiAgICBpc01vcmVHYW1lID0gXCJpc01vcmVHYW1lXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Pnrpfnu4Tku7ZcclxuICAgICAqL1xyXG4gICAgaXNTdGF0ZW1lbnQgPSBcImlzU3RhdGVtZW50XCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor5Xnjqnnu4Tku7ZcclxuICAgICAqL1xyXG4gICAgaXNUcnlHYW1lID0gXCJpc1RyeUdhbWVcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiHquWumuS5iWJhbm5lclxyXG4gICAgICovXHJcbiAgICBpc1l6QmFubmVyID0gXCJpc1l6QmFubmVyXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rlrprkuYnmu5rliqjmnaFcclxuICAgICAqL1xyXG4gICAgaXNTY3JvbGxiYXIgPSBcImlzU2Nyb2xsYmFyXCIsXHJcbiAgICAvKipcclxuICAgICog6YCA5Ye65by556qXXHJcbiAgICAqL1xyXG4gICAgaXNHYW1lRXhpdERpYWxvZyA9IFwiaXNHYW1lRXhpdERpYWxvZ1wiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uS5a2Q5o+S5bGPXHJcbiAgICAgKi9cclxuICAgIGlzQm94SW5zZXJ0QWQgPSBcImlzQm94SW5zZXJ0QWRcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul+WJjeW5v+WRilxyXG4gICAgICovXHJcbiAgICBpc0JlZm9yR2FtZU92ZXJBZCA9IFwiaXNCZWZvckdhbWVPdmVyQWRcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOerlueKtuS6kuaOqFxyXG4gICAgICovXHJcbiAgICBpc1ZlcnRpY2FsUGFuZWwgPSBcImlzVmVydGljYWxQYW5lbFwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDpnIfliqjnsbvlnotcclxuICovXHJcbmV4cG9ydCBlbnVtIFZpYnJhdGVUeXBlIHtcclxuICAgIC8qKlxyXG4gICAgICog55+t5oyvXHJcbiAgICAgKi9cclxuICAgIFNob3J0ID0gXCJzaG9ydFwiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDplb/mjK9cclxuICAgICAqL1xyXG4gICAgTG9uZyA9IFwibG9uZ1wiXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogYmFubmVyIOeahOS9jee9rlxyXG4gKi9cclxuZXhwb3J0IGVudW0gQmFubmVyTG9jYXRpb24ge1xyXG4gICAgTm9uZSA9IDAsXHJcbiAgICBIb21lLFxyXG4gICAgTGV2ZWwsXHJcbiAgICBTa2luLFxyXG4gICAgR2FtZSxcclxuICAgIFBhdXNlLFxyXG4gICAgT3ZlclxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOinhueqlyDnmoTkvY3nva5cclxuICovXHJcbmV4cG9ydCBlbnVtIFZpZXdMb2NhdGlvbiB7XHJcbiAgICBOb25lID0gMCxcclxuICAgIHNpZ24sXHJcbiAgICB0cnlTa2luLFxyXG4gICAgYm94LFxyXG4gICAgb3ZlcixcclxuICAgIGZhaWxCb3gsXHJcbiAgICBzdWNjZXNzQm94LFxyXG4gICAgd2luUGFuZWwsXHJcbiAgICB0dXJudGFibGVcclxufTtcclxuXHJcbi8qKlxyXG4gKiDpmL/mi4nkuIHlhbPljaHkuIrmiqXnsbvlnotcclxuICovXHJcbmV4cG9ydCBlbnVtIEFsZFN0YWdlVHlwZSB7XHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+W8gOWni1xyXG4gICAgICovXHJcbiAgICBTdGFydCA9IFwiU3RhcnRHYW1lXCIsXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+i/m+ihjOS4rVxyXG4gICAgICovXHJcbiAgICBSdW5uaW5nID0gXCJSdW5uaW5nXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/og5zliKlcclxuICAgICAqL1xyXG4gICAgR2FtZVdpbiA9IFwiR2FtZVdpblwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP5aSx6LSlXHJcbiAgICAgKi9cclxuICAgIEdhbWVGYWlsID0gXCJHYW1lRmFpbFwiLFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog6Zi/5ouJ5LiB5LqL5Lu25LiK5oql55qE57G75Z6LXHJcbiAqL1xyXG5leHBvcnQgZW51bSBBbGRFdmVudFR5cGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye755qu6IKk6K+V55SoXHJcbiAgICAgKi9cclxuICAgIFRyYWlsU2tpbkNsaWNrID0gXCLnmq7ogqTor5XnlKjngrnlh7tcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOearuiCpOivleeUqOaIkOWKn1xyXG4gICAgICovXHJcbiAgICBUcmFpbFNraW5TdWNjZXNzID0gXCLnmq7ogqTor5XnlKjmiJDlip9cIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOearuiCpOivleeUqOWksei0pVxyXG4gICAgICovXHJcbiAgICBUcmFpbFNraW5GYWlsID0gXCLnmq7ogqTor5XnlKjlpLHotKVcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+i3s+i/h+WFs+WNoVxyXG4gICAgICovXHJcbiAgICBTa2lwTGV2ZWxDbGljayA9IFwi54K55Ye76Lez6L+H5YWz5Y2hXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOi3s+i/h+WFs+WNoeaIkOWKn1xyXG4gICAgKi9cclxuICAgIFNraXBMZXZlbFN1Y2Nlc3MgPSBcIui3s+i/h+WFs+WNoeaIkOWKn1wiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDot7Pov4flhbPljaFcclxuICAgICovXHJcbiAgICBTa2lwTGV2ZWxGYWlsID0gXCLot7Pov4flhbPljaHlpLHotKVcIixcclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75ri45oiP57uT5p2f5Y+M5YCN6I635Y+W6YeR5biBXHJcbiAgICAgKi9cclxuICAgIEdhbWVPdmVyRG91YmxlR29sZENsaWNrID0gXCLngrnlh7vmuLjmiI/nu5PmnZ/lj4zlgI3ojrflj5bph5HluIFcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+e7k+adn+WPjOWAjeiOt+WPlumHkeW4geaIkOWKn1xyXG4gICAgICovXHJcbiAgICBHYW1lT3ZlckRvdWJsZUdvbGRTdWNjZXNzID0gXCLmuLjmiI/nu5PmnZ/lj4zlgI3ojrflj5bph5HluIHmiJDlip9cIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+e7k+adn+WPjOWAjeiOt+WPlumHkeW4geWksei0pVxyXG4gICAgICovXHJcbiAgICBHYW1lT3ZlckRvdWJsZUdvbGRGYWlsID0gXCLmuLjmiI/nu5PmnZ/lj4zlgI3ojrflj5bph5HluIHlpLHotKVcIixcclxuICAgIC8qKlxyXG4gICAgICog54K55Ye7562+5Yiw6I635Y+W5Y+M5YCN6YeR5biBXHJcbiAgICAgKi9cclxuICAgIFNpZ25Eb3VibGVHb2xkQ2xpY2sgPSBcIueCueWHu+etvuWIsOWPjOWAjemihuWPllwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog562+5Yiw6I635Y+W5Y+M5YCN6YeR5biB5oiQ5YqfXHJcbiAgICAgKi9cclxuICAgIFNpZ25Eb3VibGVHb2xkU3VjY2VzcyA9IFwi562+5Yiw5Y+M5YCN6aKG5Y+W5oiQ5YqfXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrb7liLDojrflj5blj4zlgI3ph5HluIHlpLHotKVcclxuICAgICAqL1xyXG4gICAgU2lnbkRvdWJsZUdvbGRGYWlsID0gXCLnrb7liLDlj4zlgI3pooblj5blpLHotKVcIixcclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP57uT5p2f5pmL57qn5LiJ5pifXHJcbiAgICAgKi9cclxuICAgIEdhbWVPdmVyRG91YmxlU3RhckNsaWNrID0gXCLngrnlh7vmuLjmiI/nu5PmnZ/mmYvnuqfkuInmmJ9cIixcclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP57uT5p2f5pmL57qn5LiJ5pifXHJcbiAgICAgKi9cclxuICAgIEdhbWVPdmVyRG91YmxlU3RhclN1Y2Nlc3MgPSBcIua4uOaIj+e7k+adn+aZi+e6p+S4ieaYn+aIkOWKn1wiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/nu5PmnZ/mmYvnuqfkuInmmJ9cclxuICAgICAqL1xyXG4gICAgR2FtZU92ZXJEb3VibGVTdGFyRmFpbCA9IFwi5ri45oiP57uT5p2f5pmL57qn5LiJ5pif5aSx6LSlXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/niYjmnKxcclxuICAgICAqIOa4uOaIj+WKoOi9veaIkOWKn+WQjuS4iuaKpVxyXG4gICAgICovXHJcbiAgICBHYW1lVmVyc2lvbiA9IFwi5ri45oiP54mI5pysXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vlhaXnmq7ogqTlnLrmma9cclxuICAgICAqL1xyXG4gICAgTG9hZFNraW5TY2VuZSA9IFwi6L+b5YWl55qu6IKk5Zy65pmvXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDotK3kubDnmq7ogqTmiJDlip9cclxuICAgICAqL1xyXG4gICAgUGF5U2tpbiA9IFwi6LSt5Lmw55qu6IKk5oiQ5YqfXCIsXHJcbn07XHJcblxyXG4vKipcclxuICog5b2S5Zug5LqL5Lu257G75Z6LXHJcbiAqL1xyXG5leHBvcnQgZW51bSBBdHRyaWJ1dGVkVHlwZSB7XHJcbiAgICAvKipcclxuICAgICAqIOa/gOa0u1xyXG4gICAgICovXHJcbiAgICBBY3RpdmUgPSAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPplK7ooYzkuLpcclxuICAgICAqL1xyXG4gICAgR2FtZUFkZGljdGlvbiA9IDI1XHJcbn07XHJcblxyXG4vKipcclxuICog5b2S5Zug5LqL5Lu2S2V5XHJcbiAqL1xyXG5leHBvcnQgZW51bSBBdHRyaWJ1dGVkS2V5IHtcclxuICAgIC8qKlxyXG4gICAgICog5r+A5rS7XHJcbiAgICAgKi9cclxuICAgIEFjdGl2ZSA9IFwiYWN0aXZlXCIsXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mUruihjOS4ulxyXG4gICAgICovXHJcbiAgICBHYW1lQWRkaWN0aW9uID0gXCJnYW1lX2FkZGljdGlvblwiXHJcbn07XHJcblxyXG4vKipcclxuICog5b2S5Zug5LqL5Lu2S2V5XHJcbiAqIFxyXG4gKiB1c2VyX2NsaWNrX2luc2VydF9hZF9hY3RpdmU6XCJ0cnVlXCIgLy/nlKjmiLfngrnlh7vmj5LlsY/kuYvlkI7kuIrmiqXmv4DmtLtcclxucGxheV9sZXZlbF9jb3VudF9hY3RpdmU6NSAvL+mqjOivgeW9k+WJjemXr+WFs+asoeaVsOaYr+WQpui+vuWIsOa/gOa0u+eUqOaIt+eahOadoeS7tlxyXG5wYXNzX2xldmVsX2NvdW50X2FjdGl2ZTo1IC8v6aqM6K+B5b2T5YmN6YCa5YWz5qyh5pWw5piv5ZCm6L6+5Yiw5r+A5rS755So5oi355qE5p2h5Lu2XHJcbmluc2VydF9hZF9maXJzdF9zaG93X2FjdGl2ZTogXCJ0cnVlXCIgLy/mj5LlsY/pppbmrKHlsZXnpLrmiJDlip/mmK/lkKbkuIrmiqXmv4DmtLvkuovku7ZcclxuICovXHJcbmV4cG9ydCBlbnVtIEF0dHJpYnV0ZWRWYWx1ZSB7XHJcbiAgICAvKipcclxuICAgICAqIOa/gOa0u1xyXG4gICAgICovXHJcbiAgICBBY3RpdmUgPSBcImFjdGl2ZVwiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPplK7ooYzkuLot55So5oi354K55Ye75o+S5bGP5LmL5ZCO5LiK5oql5r+A5rS7XHJcbiAgICAgKi9cclxuICAgIFVzZXJDbGlja0luc2VydEFkQWN0aW9uID0gXCJ1c2VyX2NsaWNrX2luc2VydF9hZF9hY3Rpb25cIixcclxuXHJcbiAgICAvKipcclxuICAgICog5YWz6ZSu6KGM5Li6LeW9k+WJjemXr+WFs+asoeaVsOihjOS4ulxyXG4gICAgKi9cclxuICAgIFBsYXlMZXZlbENvdW50QWN0aW9uID0gXCJwbGF5X2xldmVsX2NvdW50X2FjdGlvblwiLFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog5YWz6ZSu6KGM5Li6LeW9k+WJjemAmui/h+WFs+WNoeasoeaVsOihjOS4ulxyXG4gICAgKi9cclxuICAgIFBhc3NMZXZlbENvdW50QWN0aW9uID0gXCJwYXNzX2xldmVsX2NvdW50X2FjdGlvblwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlhbPplK7ooYzkuLot5o+S5bGP6aaW5qyh5bGV56S65oiQ5Yqf6KGM5Li6XHJcbiAgICAqL1xyXG4gICAgSW5zZXJ0QWRGaXJzdFNob3dBY3Rpb24gPSBcImluc2VydF9hZF9maXJzdF9zaG93X2FjdGlvblwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAqIOWFs+mUruihjOS4ui3muLjmiI/ml7bplb/ooYzkuLpcclxuICAgKi9cclxuICAgIEdhbWVUaW1lQWN0aW9uID0gXCJnYW1lX3RpbWVfYWN0aW9uXCIsXHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJhbm5lckxvY2F0aW9uIOi9rOaNouaIkOWvueW6lOeahOWtl+espuS4slxyXG4gKiBAcGFyYW0gbG9jYXRpb24gXHJcbiAqL1xyXG5leHBvcnQgbGV0IEJhbm5lckxvY2F0aW9uVG9TdHJpbmcgPSBmdW5jdGlvbiAobG9jYXRpb246IEJhbm5lckxvY2F0aW9uKSB7XHJcbiAgICBsZXQgc3RyOiBzdHJpbmdbXSA9IFtcIm5vbmVcIiwgXCJob21lXCIsIFwibGV2ZWxcIiwgXCJza2luXCIsIFwiZ2FtZVwiLCBcInBhdXNlXCIsIFwib3ZlclwiXTtcclxuICAgIHJldHVybiBzdHJbbG9jYXRpb25dO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvY2F0aW9u5a2X56ym5Liy6L2s5o2i5oiQ5a+55bqU55qEQmFubmVyTG9jYXRpb25cclxuICogQHBhcmFtIGxvY2F0aW9uU3RyaW5nIFxyXG4gKi9cclxuZXhwb3J0IGxldCBCYW5uZXJMb2NhdGlvblRvRW51bSA9IGZ1bmN0aW9uIChsb2NhdGlvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgc3RyOiBzdHJpbmdbXSA9IFtcIm5vbmVcIiwgXCJob21lXCIsIFwibGV2ZWxcIiwgXCJza2luXCIsIFwiZ2FtZVwiLCBcInBhdXNlXCIsIFwib3ZlclwiXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHN0cltpXSA9PSBsb2NhdGlvblN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gaSBhcyBCYW5uZXJMb2NhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEJhbm5lckxvY2F0aW9uLk5vbmU7XHJcbn1cclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9Db25zdGFudCB7XHJcblxyXG4gICAgLy8g5o6l5Y+j54mI5pys5Y+3XHJcbiAgICBwdWJsaWMgc3RhdGljIFNFUlZFUl9WRVJTSU9OOiBzdHJpbmcgPSBcInYxXCI7XHJcblxyXG4gICAgLy8g5bi46YeP5a6a5LmJXHJcbiAgICAvLyDorr7lpIdVSURcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfVUlEOiBzdHJpbmcgPSBcIlVJRFwiO1xyXG5cclxuXHJcbiAgICAvLyDmnI3liqHlmahVSURcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfU0VSVklDRV9VSUQ6IHN0cmluZyA9IFwiU0VSVklDRV9VSURcIjtcclxuXHJcbiAgICAvLyDnlKjmiLfmnaXmupBcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfU09VUkNFOiBzdHJpbmcgPSBcIlNPVVJDRVwiO1xyXG5cclxuICAgIC8vIOe6ouWMheW9k+WJjei/m+W6plxyXG4gICAgcHVibGljIHN0YXRpYyBTVF9SRURfQkFHX1BST0dSRVNTOiBzdHJpbmcgPSBcIllaX1JFRF9CQUdfUFJPR1JFU1NcIjtcclxuXHJcbiAgICAvLyDnuqLljIXmgLvov5vluqZcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfUkVEX0JBR19UT1RBTF9QUk9HUkVTUzogc3RyaW5nID0gXCJZWl9SRURfQkFHX1RPVEFMX1BST0dSRVNTXCI7XHJcblxyXG4gICAgLy8g57qi5YyF5L2Z6aKdXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1JFRF9CQUdfQkFMQU5DRTogc3RyaW5nID0gXCJZWl9SRURfQkFHX0JBTEFOQ0VcIjtcclxuXHJcbiAgICAvLyDnuqLljIXmgLvph5Hpop1cclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfUkVEX0JBR19UT1RBTF9NT05FWTogc3RyaW5nID0gXCJZWl9SRURfQkFHX1RPVEFMX01PTkVZXCI7XHJcblxyXG4gICAgLy8g5YWN6LS557qi5YyF6aKG5Y+W5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0ZSRUVfUkVEX0JBR19USU1FOiBzdHJpbmcgPSBcIllaX1NUX0ZSRUVfUkVEX0JBR19USU1FXCI7XHJcblxyXG4gICAgLy8g5pyA5ZCO6aKG5Y+W57qi5YyF55qE5YWz5Y2hXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0xBU1RfT1BFTl9MRVZFTDogc3RyaW5nID0gXCJZWl9TVF9MQVNUX09QRU5fTEVWRUxcIjtcclxuXHJcbiAgICAvLyDlrp3nrrHojrflj5blpZblirHnmoTmrKHmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfR0VUX0JPWF9SRVdBUkRfQ09VTlQ6IHN0cmluZyA9IFwiWVpfR0VUX0JPWF9SRVdBUkRfQ09VTlRcIjtcclxuXHJcblxyXG4gICAgLy8g57qi5YyF6L+b5bqmXHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFNUX1JFRF9CQUdfUFJPR1JFU1M6IHN0cmluZyA9IFwiWVpfUkVEX0JBR19QUk9HUkVTU1wiO1xyXG5cclxuXHJcbiAgICAvLyDnu4Tku7bkuovku7blrprkuYlcclxuICAgIHB1YmxpYyBzdGF0aWMgWVpfRXZlbnRDb21tb246IHN0cmluZyA9IFwiWVpfRXZlbnRDb21tb25cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgWVpfUHJpdmFjeUNsb3NlOiBzdHJpbmcgPSBcIllaX1ByaXZhY3lDbG9zZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFQ19TZXJ2ZXJJbml0OiBzdHJpbmcgPSBcIlNlcnZlckluaXRcIjtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBFQ19SZWFsTmFtZUF1dGhQYW5lbENsb3NlOiBzdHJpbmcgPSBcIlJlYWxOYW1lQXV0aFBhbmVsQ2xvc2VcIjtcclxuICAgIC8qKlxyXG4gICAgICog5pyN5Yqh5Zmo5pWw5o2u5ouJ5Y+W5oiQ5YqfXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRUNfU2VydmVyRGF0YUxvYWRTdWNjZXNzOiBzdHJpbmcgPSBcIlNlcnZlckRhdGFMb2FkU3VjY2Vzc1wiO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFlaX05hdGl2ZUFkQ2xpY2s6IHN0cmluZyA9IFwiWVpfTmF0aXZlQWRDbGlja1wiO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEVDX09uSGlkZTogc3RyaW5nID0gXCJFdmVudE9uSGlkZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFQ19PblNob3c6IHN0cmluZyA9IFwiRXZlbnRPblNob3dcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFlaX0dBTUVfWVNYWTogc3RyaW5nID0gXCJZWl9HQU1FX1lTWFlcIjtcclxuXHJcbiAgICAvLyDmmK/lkKbkuIrmiqXmv4DmtLtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfSVNfUkVQT1JUX1VTRVJfQUNUSVZFOiBzdHJpbmcgPSBcIlNUX0lTX1JFUE9SVF9VU0VSX0FDVElWRVwiO1xyXG5cclxuICAgIC8vIOaYr+WQpuS4iuaKpeWFs+mUrua/gOa0u1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9JU19SRVBPUlRfR0FNRV9BRERJQ1RJT046IHN0cmluZyA9IFwiU1RfSVNfUkVQT1JUX0dBTUVfQURESUNUSU9OXCI7XHJcblxyXG5cclxuICAgIC8vIOWQr+WKqOexu+Wei1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MVUFOQ0hfVFlQRTogc3RyaW5nID0gXCJTVF9MVUFOQ0hfVFlQRVwiO1xyXG5cclxuICAgIC8vIOWQr+WKqOWPguaVsFxyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MVUFOQ0hfREFUQTogc3RyaW5nID0gXCJTVF9MVUFOQ0hfREFUQVwiO1xyXG5cclxuICAgIC8vIOeZu+W9leaIkOWKn1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MT0dJTl9TVUNDRVNTOiBzdHJpbmcgPSBcIlNUX0xPR0lOX1NVQ0NFU1NcIjtcclxuXHJcbiAgICAvLyDnmbvlvZXlpLHotKVcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfTE9HSU5fRkFJTDogc3RyaW5nID0gXCJTVF9MT0dJTl9GQUlMXCI7XHJcblxyXG4gICAgLy8g6K6+5aSHSURcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfREVWSUNFX0lEOiBzdHJpbmcgPSBcIlNUX0RFVklDRV9JRFwiO1xyXG5cclxuICAgIC8vIOacrOWcsFVVSURcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfVVVJRDogc3RyaW5nID0gXCJTVF9VVUlEXCI7XHJcblxyXG4gICAgLy8g5LyY546pVUlEXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1lPVVdBTl9VSUQ6IHN0cmluZyA9IFwiU1RfWU9VV0FOX1VJRFwiO1xyXG5cclxuICAgIC8vIOaYr+WQpuacieiOt+WPlui/h2RldmljZV9pZFxyXG4gICAgcHVibGljIHN0YXRpYyBTVF9HRVRfREVWSUNFX0lEOiBzdHJpbmcgPSBcIlNUX0dFVF9ERVZJQ0VfSURcIjtcclxufVxyXG4iXX0=