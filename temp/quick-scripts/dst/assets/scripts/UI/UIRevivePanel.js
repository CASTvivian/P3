
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UIRevivePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f624aGi/QlIuZDbTFGHQJuX', 'UIRevivePanel');
// scripts/UI/UIRevivePanel.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UIPage_1 = require("../Framework/UIPage");
var Msg_1 = require("../Framework/Msg");
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var gameMgr_1 = require("../Game/gameMgr");
// @ts-ignore
var i18n = require('LanguageData');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIRevivePanel = /** @class */ (function (_super) {
    __extends(UIRevivePanel, _super);
    function UIRevivePanel() {
        var _this = _super.call(this, Constant_1.PanelName.UIRevivePanel) || this;
        _this._mask = null;
        _this._panel = null;
        _this._timeLabel = null;
        _this._proIcon = null;
        _this._btnVideo = null;
        _this._btnPass = null;
        _this._tw1 = null;
        _this._tw2 = null;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UIRevivePanel.prototype.onLoad = function () {
        this._mask = this._page.getChildByName("Mask");
        this._panel = this._page.getChildByName("Panel");
        this._timeLabel = this._panel.getChildByName("time").getComponent(cc.Label);
        this._proIcon = this._panel.getChildByName("shangquan").getComponent(cc.Sprite);
        this._btnVideo = this._panel.getChildByName("BtnVideo");
        this._btnVideo.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
        this._btnPass = this._panel.getChildByName("BtnPass");
        this._btnPass.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
    };
    UIRevivePanel.prototype.onOpen = function () {
        Utils_1.utils.SendEvent("页面-复活");
        this.showAd();
        this._initPanel();
        CocosZ_1.cocosz.pauseCount++;
    };
    UIRevivePanel.prototype.onClose = function () {
        CocosZ_1.cocosz.pauseCount--;
    };
    UIRevivePanel.prototype.showAd = function () { };
    UIRevivePanel.prototype._initPanel = function () {
        var _this = this;
        var opacityBack = this._mask.opacity;
        this._mask.opacity = 0;
        cc.tween(this._mask).to(0.2, { opacity: opacityBack }).start();
        this._panel.scale = 0;
        cc.tween(this._panel)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
        var count = 9;
        this._tw1 = cc.tween(this._timeLabel)
            .delay(1)
            .call(function () {
            _this._timeLabel.string = (--count).toString();
        })
            .union()
            .repeat(9)
            .call(function () {
            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
            gameMgr_1.gameMgr.fail();
        })
            .start();
        this._tw2 = cc.tween(this._proIcon)
            .to(9, { fillRange: 0 })
            .start();
    };
    UIRevivePanel.prototype.stopTween = function () {
        if (CocosZ_1.cocosz.gameMode == 6) {
            this._tw1 && this._tw1.stop();
            this._tw2 && this._tw2.stop();
        }
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UIRevivePanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                CocosZ_1.cocosz.audioMgr.playBtnEffect();
                this.stopTween();
                switch (event.target.name) {
                    case "BtnVideo": {
                        Utils_1.utils.umaEvent("gamefuhuo");
                        // 分享
                        if (this._btnVideo.getChildByName("share") && this._btnVideo.getChildByName("share").active) {
                            Utils_1.utils.SendEvent("分享-复活");
                            CocosZ_1.cocosz.share(function () {
                                Utils_1.utils.SendEvent("分享-复活-成功");
                                _this._reLive();
                            }, function () {
                                Utils_1.utils.SendEvent("分享-复活-失败");
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                                gameMgr_1.gameMgr.fail();
                            });
                        }
                        // 视频
                        else if (this._btnVideo.getChildByName("video") && this._btnVideo.getChildByName("video").active) {
                            Utils_1.utils.SendEvent("视频-复活-播放");
                            CocosZ_1.cocosz.watchAD(function () {
                                Utils_1.utils.SendEvent("视频-复活-成功");
                                _this._reLive();
                            }, function () {
                                Utils_1.utils.SendEvent("视频-复活-失败");
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                                gameMgr_1.gameMgr.fail();
                            });
                        }
                        // 失败
                        else {
                            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                            gameMgr_1.gameMgr.fail();
                        }
                        break;
                    }
                    case "BtnPass": {
                        Utils_1.utils.umaEvent("gamesurr");
                        CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
                        gameMgr_1.gameMgr.fail();
                        break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 复活事件
     */
    UIRevivePanel.prototype._reLive = function () {
        Msg_1.default.Show(i18n.t("msg.fhcg")); //复活成功
        CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UIRevivePanel);
        gameMgr_1.gameMgr.revive();
    };
    UIRevivePanel = __decorate([
        ccclass
    ], UIRevivePanel);
    return UIRevivePanel;
}(UIPage_1.default));
exports.default = UIRevivePanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJUmV2aXZlUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHdDQUFtQztBQUNuQyxrREFBa0Q7QUFDbEQsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCwyQ0FBMEM7QUFFMUMsYUFBYTtBQUNiLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBTTtJQVc3QztRQUFBLFlBQ0ksa0JBQU0sb0JBQVMsQ0FBQyxhQUFhLENBQUMsU0FFakM7UUFYTyxXQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFDNUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUUzQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFrQ2pDLFVBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsVUFBSSxHQUFhLElBQUksQ0FBQztRQS9CbEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7SUFDcEMsQ0FBQztJQUVTLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFD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QUFDLG9CQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBMUlnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNElqQztJQUFELG9CQUFDO0NBNUlELEFBNElDLENBNUkwQyxnQkFBTSxHQTRJaEQ7a0JBNUlvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJUGFnZSBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJUGFnZVwiO1xyXG5pbXBvcnQgTXNnIGZyb20gXCIuLi9GcmFtZXdvcmsvTXNnXCI7XHJcbmltcG9ydCB7IFBhbmVsTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IGdhbWVNZ3IgfSBmcm9tIFwiLi4vR2FtZS9nYW1lTWdyXCI7XHJcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9QbGF0VXRpbHNcIjtcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnTGFuZ3VhZ2VEYXRhJyk7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSZXZpdmVQYW5lbCBleHRlbmRzIFVJUGFnZSB7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX21hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wcm9JY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2J0blZpZGVvOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J0blBhc3M6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFBhbmVsTmFtZS5VSVJldml2ZVBhbmVsKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJNYXNrXCIpO1xyXG5cclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLl90aW1lTGFiZWwgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9wcm9JY29uID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3F1YW5cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2J0blZpZGVvID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5WaWRlb1wiKTtcclxuICAgICAgICB0aGlzLl9idG5WaWRlby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnRuQ2xpY2tlZEhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2J0blBhc3MgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkJ0blBhc3NcIik7XHJcbiAgICAgICAgdGhpcy5fYnRuUGFzcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uQnRuQ2xpY2tlZEhhbmRsZXIsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6aG16Z2iLeWkjea0u1wiKTtcclxuICAgICAgICB0aGlzLnNob3dBZCgpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQYW5lbCgpO1xyXG4gICAgICAgIGNvY29zei5wYXVzZUNvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29jb3N6LnBhdXNlQ291bnQtLTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FkKCkgeyB9XHJcblxyXG4gICAgX3R3MTogY2MuVHdlZW4gPSBudWxsO1xyXG4gICAgX3R3MjogY2MuVHdlZW4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBhbmVsKCkge1xyXG4gICAgICAgIGxldCBvcGFjaXR5QmFjayA9IHRoaXMuX21hc2sub3BhY2l0eTtcclxuICAgICAgICB0aGlzLl9tYXNrLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuX21hc2spLnRvKDAuMiwgeyBvcGFjaXR5OiBvcGFjaXR5QmFjayB9KS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuX3BhbmVsLnNjYWxlID0gMDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLl9wYW5lbClcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJiYWNrT3V0XCIgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDk7XHJcbiAgICAgICAgdGhpcy5fdHcxID0gY2MudHdlZW4odGhpcy5fdGltZUxhYmVsKVxyXG4gICAgICAgICAgICAuZGVsYXkoMSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUxhYmVsLnN0cmluZyA9ICgtLWNvdW50KS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAucmVwZWF0KDkpXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVJldml2ZVBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGdhbWVNZ3IuZmFpbCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHcyID0gY2MudHdlZW4odGhpcy5fcHJvSWNvbilcclxuICAgICAgICAgICAgLnRvKDksIHsgZmlsbFJhbmdlOiAwIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BUd2VlbigpIHtcclxuICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlID09IDYpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHcxICYmIHRoaXMuX3R3MS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3MiAmJiB0aGlzLl90dzIuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJgOacieaMiemSrueCueWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIGV2ZW50IFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgX29uQnRuQ2xpY2tlZEhhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUJ0bkVmZmVjdCgpO1xyXG4gICAgICAgIHRoaXMuc3RvcFR3ZWVuKCk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQnRuVmlkZW9cIjoge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMudW1hRXZlbnQoXCJnYW1lZnVodW9cIik7XHJcbiAgICAgICAgICAgICAgICAvLyDliIbkuqtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idG5WaWRlby5nZXRDaGlsZEJ5TmFtZShcInNoYXJlXCIpICYmIHRoaXMuX2J0blZpZGVvLmdldENoaWxkQnlOYW1lKFwic2hhcmVcIikuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5YiG5LqrLeWkjea0u1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouc2hhcmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLliIbkuqst5aSN5rS7LeaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZUxpdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuWIhuS6qy3lpI3mtLst5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVJldml2ZVBhbmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOinhumikVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fYnRuVmlkZW8uZ2V0Q2hpbGRCeU5hbWUoXCJ2aWRlb1wiKSAmJiB0aGlzLl9idG5WaWRlby5nZXRDaGlsZEJ5TmFtZShcInZpZGVvXCIpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3lpI3mtLst5pKt5pS+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei53YXRjaEFEKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi6KeG6aKRLeWkjea0uy3miJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVMaXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5aSN5rS7LeWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlSZXZpdmVQYW5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVNZ3IuZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5aSx6LSlXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3IuY2xvc2VQYW5lbChQYW5lbE5hbWUuVUlSZXZpdmVQYW5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU1nci5mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQnRuUGFzc1wiOiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy51bWFFdmVudChcImdhbWVzdXJyXCIpO1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLmNsb3NlUGFuZWwoUGFuZWxOYW1lLlVJUmV2aXZlUGFuZWwpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1nci5mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkjea0u+S6i+S7tiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVMaXZlKCkge1xyXG4gICAgICAgIE1zZy5TaG93KGkxOG4udChcIm1zZy5maGNnXCIpKTsvL+Wkjea0u+aIkOWKn1xyXG4gICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVJldml2ZVBhbmVsKTtcclxuICAgICAgICBnYW1lTWdyLnJldml2ZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=