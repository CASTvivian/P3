"use strict";
cc._RF.push(module, '70e24eWKbRDM7QiZpIr5ChZ', 'YZ_RecordWidget');
// common-plugin/Scripts/YZ_RecordWidget.ts

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
var YZ_RecordWidget = /** @class */ (function (_super) {
    __extends(YZ_RecordWidget, _super);
    function YZ_RecordWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._normalBtn = null;
        _this._actionBtn = null;
        _this._isRecording = false;
        _this._originScale = 1;
        return _this;
    }
    YZ_RecordWidget.prototype.onLoad = function () {
        this._panel = this.node.getChildByName("Panel");
        this._panel.active = false;
        var background = this._panel.getChildByName("Background");
        this._normalBtn = background.getChildByName("normalBtn");
        this._actionBtn = background.getChildByName("actionBtn");
        this._originScale = this._actionBtn.scale;
    };
    YZ_RecordWidget.prototype._onGameMessage = function (event) {
        switch (event.type) {
            case "YZ_RecordStart": {
                this._updateState();
                break;
            }
            case "YZ_RecordEnd": {
                this._updateState();
                break;
            }
        }
    };
    YZ_RecordWidget.prototype.onEnable = function () {
        var _this = this;
        cc.game.on("YZ_CommonMessage", this._onGameMessage, this);
        Utils_1.utils.registerServerInitEvent(function () {
            _this._panel.on(cc.Node.EventType.TOUCH_END, function (event) {
                event.stopPropagation();
                if (!Utils_1.utils.isRecording) {
                    Utils_1.utils.recordStart();
                }
                else {
                    Utils_1.utils.isSuccess = undefined;
                    if (Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.isClickEnd != undefined) {
                        Utils_1.utils.cur_tool.isClickEnd = true;
                    }
                    Utils_1.utils.recordEnd();
                }
            }, _this);
            _this._updateState();
            if (Utils_1.utils.isShowRecordWidget()) {
                _this._panel.active = true;
            }
            else {
                Utils_1.utils.showLog("不支持录屏!");
                _this.node.destroy();
            }
        }, this);
        // if (PlatUtils.IsDouyin) {
        //     utils.showLog("record onEnable");
        //     utils.Tool_Douyin.isAutoShare = true;
        // }
        if (Utils_1.utils.cur_tool && Utils_1.utils.cur_tool.isAutoShare != undefined) {
            Utils_1.utils.cur_tool.isAutoShare = true;
        }
    };
    YZ_RecordWidget.prototype.onDisable = function () {
        cc.game.targetOff(this);
        // utils.isRecording = false;
        // this._updateState();
        // if (PlatUtils.IsDouyin) {
        //     utils.showLog("record onDisable");
        //     // utils.Tool_Douyin.isAutoShare = false;
        // }
        // utils.recordEnd();
    };
    YZ_RecordWidget.prototype._updateState = function () {
        if (Utils_1.utils.isRecording) {
            this._normalBtn.active = false;
            this._actionBtn.active = true;
            this._actionBtn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, this._originScale * 0.8), cc.scaleTo(0.3, this._originScale))));
        }
        else {
            this._normalBtn.active = true;
            this._actionBtn.stopAllActions();
            this._actionBtn.active = false;
        }
    };
    YZ_RecordWidget = __decorate([
        ccclass
    ], YZ_RecordWidget);
    return YZ_RecordWidget;
}(cc.Component));
exports.default = YZ_RecordWidget;

cc._RF.pop();