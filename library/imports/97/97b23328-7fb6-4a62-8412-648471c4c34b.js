"use strict";
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