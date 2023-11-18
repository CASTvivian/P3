
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YzLoginPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8cae4S0CzlIDZZOb48XMdWd', 'YzLoginPanel');
// common-plugin/Scripts/YzLoginPanel.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YzLoginPanel = /** @class */ (function (_super) {
    __extends(YzLoginPanel, _super);
    function YzLoginPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ratio = 1;
        _this.okBtn = null;
        _this.successFunc = null;
        _this.failFunc = null;
        return _this;
        // update (dt) {}
    }
    YzLoginPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        var panel = cc.find("Panel", this.node);
        this.okBtn = cc.find("OKBtn", panel);
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            this.ratio = cc.winSize.width / 1920 * 0.75;
        }
        else {
            this.ratio = cc.winSize.width / 1080;
        }
        cc.find("Panel", this.node).scale = this.ratio;
    };
    YzLoginPanel.prototype.onDestroy = function () {
        cc.game.targetOff(this);
    };
    YzLoginPanel.prototype.onOKClickListener = function () {
        var _this = this;
        this.okBtn.getComponent(cc.Button).interactable = false;
        var successFunc = function () {
            Utils_1.utils.showLog("登录成功！");
            _this.successFunc && _this.successFunc();
            _this.node.destroy();
        };
        var failFunc = function (result) {
            _this.failFunc && _this.failFunc();
            _this.okBtn.getComponent(cc.Button).interactable = true;
            // utils.showMsg("登录失败，请重试");
        };
        cc.game.targetOff(this);
        cc.game.on(YZ_Constant_1.default.ST_LOGIN_SUCCESS, successFunc, this);
        cc.game.on(YZ_Constant_1.default.ST_LOGIN_FAIL, failFunc, this);
        Utils_1.utils.login(null, null);
    };
    YzLoginPanel.prototype.onCloseClickListener = function () {
        Utils_1.utils.GameExit();
    };
    YzLoginPanel = __decorate([
        ccclass
    ], YzLoginPanel);
    return YzLoginPanel;
}(cc.Component));
exports.default = YzLoginPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWXpMb2dpblBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGlDQUFnQztBQUNoQyw2Q0FBNEQ7QUFJdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFtRUM7UUEvREcsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixXQUFLLEdBQVksSUFBSSxDQUFDO1FBRXRCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLGNBQVEsR0FBYSxJQUFJLENBQUM7O1FBd0QxQixpQkFBaUI7SUFDckIsQ0FBQztJQXhERyw2QkFBTSxHQUFOO1FBRUksSUFBSSxhQUFLLENBQUMsV0FBVyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFckMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QyxPQUFPO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBRS9DO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUN4QztRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUVuRCxDQUFDO0lBR1MsZ0NBQVMsR0FBbkI7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsd0NBQWlCLEdBQWpCO1FBQUEsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBSXhELElBQUksV0FBVyxHQUFHO1lBQ2QsYUFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixLQUFJLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQTtRQUNELElBQUksUUFBUSxHQUFHLFVBQUMsTUFBVztZQUN2QixLQUFJLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN2RCw2QkFBNkI7UUFDakMsQ0FBQyxDQUFBO1FBRUQsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXRELGFBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCwyQ0FBb0IsR0FBcEI7UUFDSSxhQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQTdEZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQW1FaEM7SUFBRCxtQkFBQztDQW5FRCxBQW1FQyxDQW5FeUMsRUFBRSxDQUFDLFNBQVMsR0FtRXJEO2tCQW5Fb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IFlaX0NvbnN0YW50LCB7IEJhbm5lckxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcbmltcG9ydCBZWl9Mb2NhbFN0b3JhZ2UgZnJvbSBcIi4vWVpfTG9jYWxTdG9yYWdlXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFl6TG9naW5QYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuXG4gICAgcmF0aW86IG51bWJlciA9IDE7XG5cbiAgICBva0J0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBzdWNjZXNzRnVuYzogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgZmFpbEZ1bmM6IEZ1bmN0aW9uID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYW5lbCA9IGNjLmZpbmQoXCJQYW5lbFwiLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm9rQnRuID0gY2MuZmluZChcIk9LQnRuXCIsIHBhbmVsKTtcblxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNzU7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTA4MDtcbiAgICAgICAgfVxuICAgICAgICBjYy5maW5kKFwiUGFuZWxcIiwgdGhpcy5ub2RlKS5zY2FsZSA9IHRoaXMucmF0aW87XG5cbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xuICAgIH1cblxuICAgIG9uT0tDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLm9rQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuXG5cblxuICAgICAgICBsZXQgc3VjY2Vzc0Z1bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi55m75b2V5oiQ5Yqf77yBXCIpO1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzRnVuYyAmJiB0aGlzLnN1Y2Nlc3NGdW5jKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmYWlsRnVuYyA9IChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mYWlsRnVuYyAmJiB0aGlzLmZhaWxGdW5jKCk7XG4gICAgICAgICAgICB0aGlzLm9rQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAvLyB1dGlscy5zaG93TXNnKFwi55m75b2V5aSx6LSl77yM6K+36YeN6K+VXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XG4gICAgICAgIGNjLmdhbWUub24oWVpfQ29uc3RhbnQuU1RfTE9HSU5fU1VDQ0VTUywgc3VjY2Vzc0Z1bmMsIHRoaXMpO1xuICAgICAgICBjYy5nYW1lLm9uKFlaX0NvbnN0YW50LlNUX0xPR0lOX0ZBSUwsIGZhaWxGdW5jLCB0aGlzKTtcblxuICAgICAgICB1dGlscy5sb2dpbihudWxsLCBudWxsKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgdXRpbHMuR2FtZUV4aXQoKTtcbiAgICB9XG5cblxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuXG5cblxuXG5cblxuXG5cblxuIl19