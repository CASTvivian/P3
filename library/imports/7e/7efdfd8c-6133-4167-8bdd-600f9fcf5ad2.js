"use strict";
cc._RF.push(module, '7efdf2MYTNBZ4vdYA+fz1rS', 'AldUtils');
// common-plugin/Scripts/AldUtils.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var YZ_Constant_1 = require("./YZ_Constant");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 阿拉丁辅助类
 */
var AldUtils = /** @class */ (function () {
    function AldUtils() {
    }
    /**
     * 游戏开始上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    AldUtils.StartGame = function (level, model) {
        var stageName = model ? model + ",\u7B2C" + level + "\u5173" : "\u7B2C" + level + "\u5173";
        var prarm = {
            stageId: "" + level,
            stageName: stageName
        };
        Utils_1.utils.showLog("\u5173\u5361\uFF1A" + stageName + "\u5F00\u59CB");
        Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.postLevel && Utils_1.utils.cur_tool.postLevel(level, YZ_Constant_1.LevelStatus.GameStart, stageName);
    };
    /**
    * 游戏胜利上报
    * @param level 当前关卡
    * @param star 获得星星： 默认为0
    * @param model 当前模式： 没有则省略
    */
    AldUtils.GameWin = function (level, star, model) {
        if (star === void 0) { star = 0; }
        var stageName = model ? model + ",\u7B2C" + level + "\u5173" : "\u7B2C" + level + "\u5173";
        var desc = model ? model + ",\u7B2C" + level + "\u5173\uFF0C\u6E38\u620F\u80DC\u5229\uFF01\u83B7\u5F97" + star + "\u661F" : "\u7B2C" + level + "\u5173\uFF0C\u6E38\u620F\u80DC\u5229\uFF01\u83B7\u5F97" + star + "\u661F";
        var prarm = {
            stageId: "" + level,
            stageName: stageName,
            event: 'complete',
            params: { desc: desc }
        };
        Utils_1.utils.showLog("\u5173\u5361\uFF1A" + stageName + "\u80DC\u5229");
        Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.postLevel && Utils_1.utils.cur_tool.postLevel(level, YZ_Constant_1.LevelStatus.GameWin, stageName);
    };
    /**
    * 游戏失败上报
    * @param level 当前关卡
    * @param model 当前模式： 没有则省略
    */
    AldUtils.GameFail = function (level, model) {
        var stageName = model ? model + ",\u7B2C" + level + "\u5173" : "\u7B2C" + level + "\u5173";
        var desc = model ? model + ",\u7B2C" + level + "\u5173\uFF0C\u6E38\u620F\u5931\u8D25!" : "\u7B2C" + level + "\u5173\uFF0C\u6E38\u620F\u5931\u8D25!";
        var prarm = {
            stageId: "" + level,
            stageName: stageName,
            event: 'fail',
            params: { desc: desc }
        };
        Utils_1.utils.showLog("\u5173\u5361\uFF1A" + stageName + "\u5931\u8D25");
        Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.postLevel && Utils_1.utils.cur_tool.postLevel(level, YZ_Constant_1.LevelStatus.GameFail, stageName);
    };
    /**
     * 跳过关卡上报
     * @param level 当前关卡
     * @param model 当前模式： 没有则省略
     */
    AldUtils.GameSkip = function (level, model) {
        var stageName = model ? model + ",\u7B2C" + level + "\u5173" : "\u7B2C" + level + "\u5173";
        Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.postLevel && Utils_1.utils.cur_tool.postLevel(level, YZ_Constant_1.LevelStatus.GameSkip, stageName);
    };
    /**
     * 游戏中使用道具上报
     * @param level 当前关卡
     * @param tooName 道具名称
     * @param model 当前模式： 没有则省略
     */
    AldUtils.UseTool = function (level, toolName, model) {
    };
    /**
     * 事件上报
     * @param eventName 事件名称
     */
    AldUtils.SendEvent = function (eventName) {
        Utils_1.utils.showLog("\u4E8B\u4EF6\u4E0A\u62A5:" + eventName);
        Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.sendEvent && Utils_1.utils.cur_tool.sendEvent(eventName);
    };
    AldUtils = __decorate([
        ccclass
    ], AldUtils);
    return AldUtils;
}());
exports.default = AldUtils;

cc._RF.pop();