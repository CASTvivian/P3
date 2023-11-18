
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YzCustomAdPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3913b/5d+JET5bTvhP+7Ou3', 'YzCustomAdPanel');
// common-plugin/Scripts/YzCustomAdPanel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YzCustomAdPanel = /** @class */ (function (_super) {
    __extends(YzCustomAdPanel, _super);
    function YzCustomAdPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exitBtn = null;
        _this.closeCallFunc = null;
        //关闭按钮点击次数
        _this.closeCount = 1;
        _this.closeBtnClickCount = 0;
        return _this;
    }
    YzCustomAdPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        Utils_1.utils.adManager.showCustomAd({ location: 100 });
        var ratio = 0;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.75;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        if (Utils_1.utils.getConfigByKey("custom_panel_close_count")) {
            this.closeCount = Utils_1.utils.getConfigByKey("custom_panel_close_count");
        }
        cc.find("Panel", this.node).scale = ratio;
        this.exitBtn.runAction(cc.fadeIn(3));
    };
    YzCustomAdPanel.prototype.onExitBtnClickListener = function () {
        Utils_1.utils.showLog("退出游戏模版弹窗！");
        this.closeBtnClickCount++;
        if (this.closeCount == this.closeBtnClickCount) {
            cc.director.emit("CloseCustomADPanel");
            this.node.destroy();
            Utils_1.utils.adManager.hideCustomAd({ location: 100 });
            this.closeCallFunc && this.closeCallFunc();
        }
    };
    __decorate([
        property({ type: cc.Node })
    ], YzCustomAdPanel.prototype, "exitBtn", void 0);
    YzCustomAdPanel = __decorate([
        ccclass
    ], YzCustomAdPanel);
    return YzCustomAdPanel;
}(cc.Component));
exports.default = YzCustomAdPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWXpDdXN0b21BZFBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXlDQztRQXRDRyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRS9CLFVBQVU7UUFDVixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2Qix3QkFBa0IsR0FBVyxDQUFDLENBQUM7O0lBaUNuQyxDQUFDO0lBL0JHLGdDQUFNLEdBQU47UUFDSSxJQUFJLGFBQUssQ0FBQyxXQUFXLElBQUksYUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDN0M7UUFDRCxhQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEMsT0FBTztZQUNQLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzFDO2FBQU07WUFDSCxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxhQUFLLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFLLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDdEU7UUFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsQ0FBQztJQUVELGdEQUFzQixHQUF0QjtRQUNJLGFBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM1QyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsYUFBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFyQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO29EQUNKO0lBSFAsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQXlDbkM7SUFBRCxzQkFBQztDQXpDRCxBQXlDQyxDQXpDNEMsRUFBRSxDQUFDLFNBQVMsR0F5Q3hEO2tCQXpDb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFl6Q3VzdG9tQWRQYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlIH0pXG4gICAgZXhpdEJ0bjogY2MuTm9kZSA9IG51bGw7XG4gICAgY2xvc2VDYWxsRnVuYzogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgLy/lhbPpl63mjInpkq7ngrnlh7vmrKHmlbBcbiAgICBjbG9zZUNvdW50OiBudW1iZXIgPSAxO1xuICAgIGNsb3NlQnRuQ2xpY2tDb3VudDogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcbiAgICAgICAgfVxuICAgICAgICB1dGlscy5hZE1hbmFnZXIuc2hvd0N1c3RvbUFkKHsgbG9jYXRpb246IDEwMCB9KVxuICAgICAgICBsZXQgcmF0aW8gPSAwO1xuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDE5MjAgKiAwLjc1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTA4MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5nZXRDb25maWdCeUtleShcImN1c3RvbV9wYW5lbF9jbG9zZV9jb3VudFwiKSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUNvdW50ID0gdXRpbHMuZ2V0Q29uZmlnQnlLZXkoXCJjdXN0b21fcGFuZWxfY2xvc2VfY291bnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2MuZmluZChcIlBhbmVsXCIsIHRoaXMubm9kZSkuc2NhbGUgPSByYXRpbztcbiAgICAgICAgdGhpcy5leGl0QnRuLnJ1bkFjdGlvbihjYy5mYWRlSW4oMykpO1xuXG4gICAgfVxuXG4gICAgb25FeGl0QnRuQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgdXRpbHMuc2hvd0xvZyhcIumAgOWHuua4uOaIj+aooeeJiOW8ueeql++8gVwiKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bkNsaWNrQ291bnQrKztcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VDb3VudCA9PSB0aGlzLmNsb3NlQnRuQ2xpY2tDb3VudCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIkNsb3NlQ3VzdG9tQURQYW5lbFwiKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuaGlkZUN1c3RvbUFkKHsgbG9jYXRpb246IDEwMCB9KTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDYWxsRnVuYyAmJiB0aGlzLmNsb3NlQ2FsbEZ1bmMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==