
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/AldUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQWxkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBMEQ7QUFDMUQsaUNBQWdDO0FBRzFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBRUg7SUFBQTtJQW1GQSxDQUFDO0lBakZHOzs7O09BSUc7SUFDVyxrQkFBUyxHQUF2QixVQUF3QixLQUFhLEVBQUUsS0FBYztRQUNqRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFJLEtBQUssZUFBSyxLQUFLLFdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBSSxLQUFLLFdBQUcsQ0FBQztRQUM3RCxJQUFJLEtBQUssR0FBUTtZQUNiLE9BQU8sRUFBRSxLQUFHLEtBQU87WUFDbkIsU0FBUyxFQUFFLFNBQVM7U0FDdkIsQ0FBQTtRQUNELGFBQUssQ0FBQyxPQUFPLENBQUMsdUJBQU0sU0FBUyxpQkFBSSxDQUFDLENBQUE7UUFDbEMsYUFBSyxDQUFDLFFBQVEsSUFBSSxhQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxhQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUseUJBQVcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUNEOzs7OztNQUtFO0lBQ1ksZ0JBQU8sR0FBckIsVUFBc0IsS0FBYSxFQUFFLElBQWdCLEVBQUUsS0FBYztRQUFoQyxxQkFBQSxFQUFBLFFBQWdCO1FBQ2pELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUksS0FBSyxlQUFLLEtBQUssV0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFJLEtBQUssV0FBRyxDQUFDO1FBQzdELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUksS0FBSyxlQUFLLEtBQUssOERBQVksSUFBSSxXQUFHLENBQUMsQ0FBQyxDQUFDLFdBQUksS0FBSyw4REFBWSxJQUFJLFdBQUcsQ0FBQztRQUN4RixJQUFJLEtBQUssR0FBUTtZQUNiLE9BQU8sRUFBRSxLQUFHLEtBQU87WUFDbkIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtTQUN6QixDQUFBO1FBQ0QsYUFBSyxDQUFDLE9BQU8sQ0FBQyx1QkFBTSxTQUFTLGlCQUFJLENBQUMsQ0FBQTtRQUVsQyxhQUFLLENBQUMsUUFBUSxJQUFJLGFBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLGFBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSx5QkFBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNZLGlCQUFRLEdBQXRCLFVBQXVCLEtBQWEsRUFBRSxLQUFjO1FBQ2hELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUksS0FBSyxlQUFLLEtBQUssV0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFJLEtBQUssV0FBRyxDQUFDO1FBQzdELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUksS0FBSyxlQUFLLEtBQUssMENBQVMsQ0FBQyxDQUFDLENBQUMsV0FBSSxLQUFLLDBDQUFTLENBQUM7UUFDcEUsSUFBSSxLQUFLLEdBQVE7WUFDYixPQUFPLEVBQUUsS0FBRyxLQUFPO1lBQ25CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtTQUN6QixDQUFBO1FBQ0QsYUFBSyxDQUFDLE9BQU8sQ0FBQyx1QkFBTSxTQUFTLGlCQUFJLENBQUMsQ0FBQTtRQUVsQyxhQUFLLENBQUMsUUFBUSxJQUFJLGFBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLGFBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSx5QkFBVyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLGlCQUFRLEdBQXRCLFVBQXVCLEtBQWEsRUFBRSxLQUFjO1FBQ2hELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUksS0FBSyxlQUFLLEtBQUssV0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFJLEtBQUssV0FBRyxDQUFDO1FBQzdELGFBQUssQ0FBQyxRQUFRLElBQUksYUFBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksYUFBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHlCQUFXLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLGdCQUFPLEdBQXJCLFVBQXNCLEtBQWEsRUFBRSxRQUFnQixFQUFFLEtBQWM7SUFDckUsQ0FBQztJQUVEOzs7T0FHRztJQUNXLGtCQUFTLEdBQXZCLFVBQXdCLFNBQWlCO1FBQ3JDLGFBQUssQ0FBQyxPQUFPLENBQUMsOEJBQVEsU0FBVyxDQUFDLENBQUM7UUFDbkMsYUFBSyxDQUFDLFFBQVEsSUFBSSxhQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxhQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBakZnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBbUY1QjtJQUFELGVBQUM7Q0FuRkQsQUFtRkMsSUFBQTtrQkFuRm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyBBbGRFdmVudFR5cGUsIExldmVsU3RhdHVzIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICog6Zi/5ouJ5LiB6L6F5Yqp57G7XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGRVdGlscyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lvIDlp4vkuIrmiqVcclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFcclxuICAgICAqIEBwYXJhbSBtb2RlbCDlvZPliY3mqKHlvI/vvJog5rKh5pyJ5YiZ55yB55WlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU3RhcnRHYW1lKGxldmVsOiBzdHJpbmcsIG1vZGVsPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YWdlTmFtZSA9IG1vZGVsID8gYCR7bW9kZWx9LOesrCR7bGV2ZWx95YWzYCA6IGDnrKwke2xldmVsfeWFs2A7XHJcbiAgICAgICAgbGV0IHByYXJtOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIHN0YWdlSWQ6IGAke2xldmVsfWAsXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogc3RhZ2VOYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWxzLnNob3dMb2coYOWFs+WNoe+8miR7c3RhZ2VOYW1lfeW8gOWni2ApXHJcbiAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wucG9zdExldmVsICYmIHV0aWxzLmN1cl90b29sLnBvc3RMZXZlbChsZXZlbCwgTGV2ZWxTdGF0dXMuR2FtZVN0YXJ0LCBzdGFnZU5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOa4uOaIj+iDnOWIqeS4iuaKpVxyXG4gICAgKiBAcGFyYW0gbGV2ZWwg5b2T5YmN5YWz5Y2hXHJcbiAgICAqIEBwYXJhbSBzdGFyIOiOt+W+l+aYn+aYn++8miDpu5jorqTkuLowXHJcbiAgICAqIEBwYXJhbSBtb2RlbCDlvZPliY3mqKHlvI/vvJog5rKh5pyJ5YiZ55yB55WlXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHYW1lV2luKGxldmVsOiBzdHJpbmcsIHN0YXI6IG51bWJlciA9IDAsIG1vZGVsPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YWdlTmFtZSA9IG1vZGVsID8gYCR7bW9kZWx9LOesrCR7bGV2ZWx95YWzYCA6IGDnrKwke2xldmVsfeWFs2A7XHJcbiAgICAgICAgbGV0IGRlc2MgPSBtb2RlbCA/IGAke21vZGVsfSznrKwke2xldmVsfeWFs++8jOa4uOaIj+iDnOWIqe+8geiOt+W+lyR7c3Rhcn3mmJ9gIDogYOesrCR7bGV2ZWx95YWz77yM5ri45oiP6IOc5Yip77yB6I635b6XJHtzdGFyfeaYn2A7XHJcbiAgICAgICAgbGV0IHByYXJtOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIHN0YWdlSWQ6IGAke2xldmVsfWAsXHJcbiAgICAgICAgICAgIHN0YWdlTmFtZTogc3RhZ2VOYW1lLFxyXG4gICAgICAgICAgICBldmVudDogJ2NvbXBsZXRlJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7IGRlc2M6IGRlc2MgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB1dGlscy5zaG93TG9nKGDlhbPljaHvvJoke3N0YWdlTmFtZX3og5zliKlgKVxyXG5cclxuICAgICAgICB1dGlscy5jdXJfdG9vbCAmJiB1dGlscy5jdXJfdG9vbC5wb3N0TGV2ZWwgJiYgdXRpbHMuY3VyX3Rvb2wucG9zdExldmVsKGxldmVsLCBMZXZlbFN0YXR1cy5HYW1lV2luLCBzdGFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmuLjmiI/lpLHotKXkuIrmiqVcclxuICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoVxyXG4gICAgKiBAcGFyYW0gbW9kZWwg5b2T5YmN5qih5byP77yaIOayoeacieWImeecgeeVpVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZUZhaWwobGV2ZWw6IHN0cmluZywgbW9kZWw/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc3RhZ2VOYW1lID0gbW9kZWwgPyBgJHttb2RlbH0s56ysJHtsZXZlbH3lhbNgIDogYOesrCR7bGV2ZWx95YWzYDtcclxuICAgICAgICBsZXQgZGVzYyA9IG1vZGVsID8gYCR7bW9kZWx9LOesrCR7bGV2ZWx95YWz77yM5ri45oiP5aSx6LSlIWAgOiBg56ysJHtsZXZlbH3lhbPvvIzmuLjmiI/lpLHotKUhYDtcclxuICAgICAgICBsZXQgcHJhcm06IGFueSA9IHtcclxuICAgICAgICAgICAgc3RhZ2VJZDogYCR7bGV2ZWx9YCxcclxuICAgICAgICAgICAgc3RhZ2VOYW1lOiBzdGFnZU5hbWUsXHJcbiAgICAgICAgICAgIGV2ZW50OiAnZmFpbCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogeyBkZXNjOiBkZXNjIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhg5YWz5Y2h77yaJHtzdGFnZU5hbWV95aSx6LSlYClcclxuXHJcbiAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wucG9zdExldmVsICYmIHV0aWxzLmN1cl90b29sLnBvc3RMZXZlbChsZXZlbCwgTGV2ZWxTdGF0dXMuR2FtZUZhaWwsIHN0YWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot7Pov4flhbPljaHkuIrmiqVcclxuICAgICAqIEBwYXJhbSBsZXZlbCDlvZPliY3lhbPljaFcclxuICAgICAqIEBwYXJhbSBtb2RlbCDlvZPliY3mqKHlvI/vvJog5rKh5pyJ5YiZ55yB55WlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVNraXAobGV2ZWw6IHN0cmluZywgbW9kZWw/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc3RhZ2VOYW1lID0gbW9kZWwgPyBgJHttb2RlbH0s56ysJHtsZXZlbH3lhbNgIDogYOesrCR7bGV2ZWx95YWzYDtcclxuICAgICAgICB1dGlscy5jdXJfdG9vbCAmJiB1dGlscy5jdXJfdG9vbC5wb3N0TGV2ZWwgJiYgdXRpbHMuY3VyX3Rvb2wucG9zdExldmVsKGxldmVsLCBMZXZlbFN0YXR1cy5HYW1lU2tpcCwgc3RhZ2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+S4reS9v+eUqOmBk+WFt+S4iuaKpVxyXG4gICAgICogQHBhcmFtIGxldmVsIOW9k+WJjeWFs+WNoVxyXG4gICAgICogQHBhcmFtIHRvb05hbWUg6YGT5YW35ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gbW9kZWwg5b2T5YmN5qih5byP77yaIOayoeacieWImeecgeeVpVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVzZVRvb2wobGV2ZWw6IHN0cmluZywgdG9vbE5hbWU6IHN0cmluZywgbW9kZWw/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tuS4iuaKpVxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSDkuovku7blkI3np7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZW5kRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB1dGlscy5zaG93TG9nKGDkuovku7bkuIrmiqU6JHtldmVudE5hbWV9YCk7XHJcbiAgICAgICAgdXRpbHMuY3VyX3Rvb2wgJiYgdXRpbHMuY3VyX3Rvb2wuc2VuZEV2ZW50ICYmIHV0aWxzLmN1cl90b29sLnNlbmRFdmVudChldmVudE5hbWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=