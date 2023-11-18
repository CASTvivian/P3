
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/LogOutView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '97b23Mof7ZKYoQSZIRxxMNL', 'LogOutView');
// common-plugin/Scripts/LogOutView.ts

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
var LogOutView = /** @class */ (function (_super) {
    __extends(LogOutView, _super);
    function LogOutView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.content = null;
        _this.logLabel = null;
        _this.logArray = [];
        _this.clearBtn = null;
        _this.showLogViewBtn = null;
        _this.hideLogViewBtn = null;
        return _this;
        // update (dt) {}
    }
    LogOutView.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.7;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this.node.scale = ratio;
    };
    LogOutView.prototype.start = function () {
        var _this = this;
        this.initUi();
        this.initListener();
        this.initData();
        this.schedule(function () {
            _this.showLog();
        }, 0);
    };
    /**
     * 初始化UI
     */
    LogOutView.prototype.initUi = function () {
        this.scrollView = this.node.getChildByName("ScrollView").getComponent(cc.ScrollView);
        this.showLogViewBtn = this.node.getChildByName("BtnShowLogView");
        this.hideLogViewBtn = this.node.getChildByName("BtnHideLogView");
        this.clearBtn = this.node.getChildByName("BtnClearLog");
        this.content = this.scrollView.content;
        this.logLabel = this.content.children[0];
        this.content.removeAllChildren();
    };
    /**
     * 添加LOG输出
     * @param logContent log
     */
    LogOutView.prototype.addLog = function (logContent) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var str = "";
        str += logContent;
        optionalParams.forEach(function (element) {
            str += "," + element;
        });
        this.logArray.push(str);
    };
    LogOutView.prototype.showLog = function () {
        var _this = this;
        if (this.logArray.length > 0) {
            var tempAry = this.logArray;
            this.logArray = [];
            tempAry.forEach(function (log) {
                var tempLogLabel = cc.instantiate(_this.logLabel);
                tempLogLabel.getComponent(cc.Label).string = "\u65E5\u5FD7\u8F93\u51FA\uFF1A" + log;
                _this.content.addChild(tempLogLabel);
            });
        }
    };
    /**
     * 初始化监听事件
     */
    LogOutView.prototype.initListener = function () {
    };
    /**
     * 初始化数据
     */
    LogOutView.prototype.initData = function () {
    };
    /**
     * 显示日志框
     */
    LogOutView.prototype.onShowLogView = function () {
        this.scrollView.node.active = true;
        this.clearBtn.active = true;
        this.showLogViewBtn.active = false;
        this.hideLogViewBtn.active = true;
    };
    /**
     * 隐藏日志框
     */
    LogOutView.prototype.onHideLogView = function () {
        this.scrollView.node.active = false;
        this.clearBtn.active = false;
        this.showLogViewBtn.active = true;
        this.hideLogViewBtn.active = false;
    };
    /**
     * 清空日志
     */
    LogOutView.prototype.clearLogView = function () {
        this.content.removeAllChildren();
    };
    LogOutView = __decorate([
        ccclass
    ], LogOutView);
    return LogOutView;
}(cc.Component));
exports.default = LogOutView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTG9nT3V0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUE4SEM7UUE1SEcsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBRWpDLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixjQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUU3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRS9CLG9CQUFjLEdBQVksSUFBSSxDQUFDOztRQStHL0IsaUJBQWlCO0lBQ3JCLENBQUM7SUE3R0csMkJBQU0sR0FBTjtRQUNJLElBQUksYUFBSyxDQUFDLFdBQVcsSUFBSSxhQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztTQUM3QztRQUNELElBQUksS0FBSyxHQUFXLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RDLE9BQU87WUFDUCxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUN6QzthQUFNO1lBQ0gsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUss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QztJQUVEOztPQUVHO0lBQ0gsa0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFFdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBM0hnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBOEg5QjtJQUFELGlCQUFDO0NBOUhELEFBOEhDLENBOUh1QyxFQUFFLENBQUMsU0FBUyxHQThIbkQ7a0JBOUhvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ091dFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG5cclxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGxvZ0xhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBsb2dBcnJheTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNsZWFyQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBzaG93TG9nVmlld0J0bjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgaGlkZUxvZ1ZpZXdCdG46IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLm90aGVyQ29uZmlnICYmIHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IHV0aWxzLm90aGVyQ29uZmlnLmdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSByYXRpbztcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMb2coKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllVJXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0VWkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlNjcm9sbFZpZXdcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuc2hvd0xvZ1ZpZXdCdG4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5TaG93TG9nVmlld1wiKTtcclxuICAgICAgICB0aGlzLmhpZGVMb2dWaWV3QnRuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQnRuSGlkZUxvZ1ZpZXdcIik7XHJcbiAgICAgICAgdGhpcy5jbGVhckJ0biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJ0bkNsZWFyTG9nXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudDtcclxuICAgICAgICB0aGlzLmxvZ0xhYmVsID0gdGhpcy5jb250ZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoExPR+i+k+WHulxyXG4gICAgICogQHBhcmFtIGxvZ0NvbnRlbnQgbG9nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRMb2cobG9nQ29udGVudDogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICBzdHIgKz0gbG9nQ29udGVudDtcclxuICAgICAgICBvcHRpb25hbFBhcmFtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBzdHIgKz0gXCIsXCIgKyBlbGVtZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9nQXJyYXkucHVzaChzdHIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2hvd0xvZygpIHtcclxuICAgICAgICBpZiAodGhpcy5sb2dBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wQXJ5ID0gdGhpcy5sb2dBcnJheTtcclxuICAgICAgICAgICAgdGhpcy5sb2dBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICB0ZW1wQXJ5LmZvckVhY2gobG9nID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTG9nTGFiZWwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxvZ0xhYmVsKTtcclxuICAgICAgICAgICAgICAgIHRlbXBMb2dMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDml6Xlv5fovpPlh7rvvJoke2xvZ31gO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKHRlbXBMb2dMYWJlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluebkeWQrOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdExpc3RlbmVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXREYXRhKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaXpeW/l+ahhlxyXG4gICAgICovXHJcbiAgICBvblNob3dMb2dWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGVhckJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd0xvZ1ZpZXdCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oaWRlTG9nVmlld0J0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5pel5b+X5qGGXHJcbiAgICAgKi9cclxuICAgIG9uSGlkZUxvZ1ZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGVhckJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dMb2dWaWV3QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oaWRlTG9nVmlld0J0bi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrml6Xlv5dcclxuICAgICAqL1xyXG4gICAgY2xlYXJMb2dWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19