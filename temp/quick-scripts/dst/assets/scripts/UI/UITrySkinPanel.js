
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UITrySkinPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9408ddmbX5KJqoO4VRkw0P1', 'UITrySkinPanel');
// scripts/UI/UITrySkinPanel.ts

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
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var UIPage_1 = require("../Framework/UIPage");
var ani_1 = require("../Game/ani");
var ccclass = cc._decorator.ccclass;
var UITrySkinPanel = /** @class */ (function (_super) {
    __extends(UITrySkinPanel, _super);
    function UITrySkinPanel() {
        var _this = _super.call(this, Constant_1.PanelName.UITrySkinPanel) || this;
        _this._mask = null;
        _this._panel = null;
        _this.aniArr = [];
        _this.btnArr = [];
        _this.skinArr = [];
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UITrySkinPanel.prototype.onLoad = function () {
        this._panel = this._page.getChildByName("Panel");
        this._mask = this._page.getChildByName("Mask");
        this.aniArr[0] = this._panel.getChildByName("ani0");
        this.aniArr[1] = this._panel.getChildByName("ani1");
        this.aniArr[2] = this._panel.getChildByName("ani2");
        var btnNames = ["BtnVideo0", "BtnVideo1", "BtnVideo2", "BtnPass"];
        for (var i = 0; i < btnNames.length; i++) {
            var btn = cc.find(btnNames[i], this._panel);
            if (btn) {
                this.btnArr[i] = btn;
                btn.on(cc.Node.EventType.TOUCH_END, this._onBtnClickedHandler, this);
            }
        }
    };
    UITrySkinPanel.prototype.onOpen = function () {
        var _this = this;
        Utils_1.utils.SendEvent("页面-皮肤试用");
        // 暂停游戏逻辑
        CocosZ_1.cocosz.pauseCount++;
        // 未解锁的皮肤id数组
        var arr = CocosZ_1.cocosz.dataMgr.getRandomLockSkin();
        if (arr.length > 0) {
            var _loop_1 = function (i) {
                if (arr.length > 0) {
                    var index = Math.floor(Math.random() * arr.length);
                    var id = arr[index];
                    arr.splice(index, 1);
                    this_1.skinArr[i] = id;
                    // 显示任务
                    var aniTs = this_1.aniArr[i].getComponent(ani_1.default);
                    aniTs.setSkinById(id);
                    aniTs.setWeaponById(CocosZ_1.cocosz.dataMgr.CurRange);
                    this_1.aniArr[i].opacity = 0;
                    CocosZ_1.cocosz.scheduleOnce(function () {
                        if (_this._page && _this.aniArr[i]) {
                            cc.tween(_this.aniArr[i])
                                .set({ y: 500, opacity: 255 })
                                .to(0.4, { y: 50 }, { easing: "sineOut" })
                                .start();
                        }
                    }, 0.3 * i);
                }
                else {
                    // 皮肤不够隐藏
                    this_1.aniArr[i].active = false;
                    this_1.btnArr[i].active = false;
                }
            };
            var this_1 = this;
            // 随机3个皮肤
            for (var i = 0; i < 3; i++) {
                _loop_1(i);
            }
        }
        else {
            // 没有未解锁皮肤，自动隐藏
            CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UITrySkinPanel);
        }
    };
    UITrySkinPanel.prototype.onClose = function () {
        CocosZ_1.cocosz.gameMgr.gameStart(CocosZ_1.cocosz.curLevel);
    };
    /**
     * 所有按钮点击事件
     * @param event
     * @param data
     */
    UITrySkinPanel.prototype._onBtnClickedHandler = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //播放按钮点击音效
                    return [4 /*yield*/, CocosZ_1.cocosz.audioMgr.playBtnEffect().catch()];
                    case 1:
                        //播放按钮点击音效
                        _a.sent();
                        switch (event.target.name) {
                            case "BtnVideo0":
                            case "BtnVideo1":
                            case "BtnVideo2": {
                                Utils_1.utils.SendEvent("视频-弹窗角色试用-播放");
                                CocosZ_1.cocosz.watchAD(function () {
                                    // 视频成功
                                    Utils_1.utils.SendEvent("视频-弹窗角色试用-成功");
                                    if (event.target.name == "BtnVideo0") {
                                        CocosZ_1.cocosz.gameMgr.gameCtr.curUseSkinId = _this.skinArr[0];
                                    }
                                    else if (event.target.name == "BtnVideo1") {
                                        CocosZ_1.cocosz.gameMgr.gameCtr.curUseSkinId = _this.skinArr[1];
                                    }
                                    else if (event.target.name == "BtnVideo2") {
                                        CocosZ_1.cocosz.gameMgr.gameCtr.curUseSkinId = _this.skinArr[2];
                                    }
                                    CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UITrySkinPanel);
                                }, function () {
                                    // 视频失败
                                    Utils_1.utils.SendEvent("视频-弹窗角色试用-失败");
                                    CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UITrySkinPanel);
                                });
                                break;
                            }
                            case "BtnPass": {
                                CocosZ_1.cocosz.uiMgr.closePanel(Constant_1.PanelName.UITrySkinPanel);
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UITrySkinPanel = __decorate([
        ccclass
    ], UITrySkinPanel);
    return UITrySkinPanel;
}(UIPage_1.default));
exports.default = UITrySkinPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJVHJ5U2tpblBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDJEQUEwRDtBQUUxRCw4Q0FBNkM7QUFDN0Msa0RBQWtEO0FBQ2xELDhDQUF5QztBQUN6QyxtQ0FBOEI7QUFFdEIsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFHbEM7SUFBNEMsa0NBQU07SUFXOUM7UUFBQSxZQUNJLGtCQUFNLG9CQUFTLENBQUMsY0FBYyxDQUFDLFNBRWxDO1FBWk8sV0FBSyxHQUFZLElBQUksQ0FBQztRQUN0QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFlBQU0sR0FBYyxFQUFFLENBQUM7UUFFdkIsWUFBTSxHQUFjLEVBQUUsQ0FBQztRQUUvQixhQUFPLEdBQWEsRUFBRSxDQUFDO1FBSW5CLEtBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O0lBQ3BDLENBQUM7SUFFUywrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENB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QUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7cUNBQ3pEO3lDQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksV0FBVyxFQUFFO3dDQUN6QyxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQ0FDekQ7b0NBQ0QsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQ0FDdEQsQ0FBQyxFQUFFO29DQUNDLE9BQU87b0NBQ1AsYUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtvQ0FDL0IsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQ0FDdEQsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsTUFBTTs2QkFDVDs0QkFDRCxLQUFLLFNBQVMsQ0FBQyxDQUFDO2dDQUNaLGVBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLG9CQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQ2xELE1BQU07NkJBQ1Q7eUJBQ0o7Ozs7O0tBQ0o7SUFqSGdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FrSGxDO0lBQUQscUJBQUM7Q0FsSEQsQUFrSEMsQ0FsSDJDLGdCQUFNLEdBa0hqRDtrQkFsSG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY2Nlc3MgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvVXRpbHNcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1laX0NvbnN0YW50XCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCB7IFBhbmVsTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IFVJUGFnZSBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJUGFnZVwiO1xyXG5pbXBvcnQgQW5pIGZyb20gXCIuLi9HYW1lL2FuaVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUcnlTa2luUGFuZWwgZXh0ZW5kcyBVSVBhZ2Uge1xyXG5cclxuICAgIHByaXZhdGUgX21hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYW5pQXJyOiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGJ0bkFycjogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgc2tpbkFycjogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQYW5lbE5hbWUuVUlUcnlTa2luUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCgpICYmIHRoaXMub25Mb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9wYW5lbCA9IHRoaXMuX3BhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLl9tYXNrID0gdGhpcy5fcGFnZS5nZXRDaGlsZEJ5TmFtZShcIk1hc2tcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pQXJyWzBdID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJhbmkwXCIpO1xyXG4gICAgICAgIHRoaXMuYW5pQXJyWzFdID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJhbmkxXCIpO1xyXG4gICAgICAgIHRoaXMuYW5pQXJyWzJdID0gdGhpcy5fcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJhbmkyXCIpO1xyXG5cclxuICAgICAgICBsZXQgYnRuTmFtZXM6IHN0cmluZ1tdID0gW1wiQnRuVmlkZW8wXCIsIFwiQnRuVmlkZW8xXCIsIFwiQnRuVmlkZW8yXCIsIFwiQnRuUGFzc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ0bk5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidG46IGNjLk5vZGUgPSBjYy5maW5kKGJ0bk5hbWVzW2ldLCB0aGlzLl9wYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuQXJyW2ldID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgYnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25CdG5DbGlja2VkSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLpobXpnaIt55qu6IKk6K+V55SoXCIpO1xyXG4gICAgICAgIC8vIOaaguWBnOa4uOaIj+mAu+i+kVxyXG4gICAgICAgIGNvY29zei5wYXVzZUNvdW50Kys7XHJcbiAgICAgICAgLy8g5pyq6Kej6ZSB55qE55qu6IKkaWTmlbDnu4RcclxuICAgICAgICBsZXQgYXJyID0gY29jb3N6LmRhdGFNZ3IuZ2V0UmFuZG9tTG9ja1NraW4oKTtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8g6ZqP5py6M+S4quearuiCpFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gYXJyW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraW5BcnJbaV0gPSBpZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmmL7npLrku7vliqFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5pVHMgPSB0aGlzLmFuaUFycltpXS5nZXRDb21wb25lbnQoQW5pKTtcclxuICAgICAgICAgICAgICAgICAgICBhbmlUcy5zZXRTa2luQnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pVHMuc2V0V2VhcG9uQnlJZChjb2Nvc3ouZGF0YU1nci5DdXJSYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmlBcnJbaV0ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYWdlICYmIHRoaXMuYW5pQXJyW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmFuaUFycltpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KHsgeTogNTAwLCBvcGFjaXR5OiAyNTUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oMC40LCB7IHk6IDUwIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMC4zICogaSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55qu6IKk5LiN5aSf6ZqQ6JePXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmlBcnJbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5BcnJbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmsqHmnInmnKrop6PplIHnmq7ogqTvvIzoh6rliqjpmpDol49cclxuICAgICAgICAgICAgY29jb3N6LnVpTWdyLmNsb3NlUGFuZWwoUGFuZWxOYW1lLlVJVHJ5U2tpblBhbmVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29jb3N6LmdhbWVNZ3IuZ2FtZVN0YXJ0KGNvY29zei5jdXJMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYDmnInmjInpkq7ngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudCBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIF9vbkJ0bkNsaWNrZWRIYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgLy/mkq3mlL7mjInpkq7ngrnlh7vpn7PmlYhcclxuICAgICAgICBhd2FpdCBjb2Nvc3ouYXVkaW9NZ3IucGxheUJ0bkVmZmVjdCgpLmNhdGNoKCk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQnRuVmlkZW8wXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdG5WaWRlbzFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkJ0blZpZGVvMlwiOiB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5by556qX6KeS6Imy6K+V55SoLeaSreaUvlwiKVxyXG4gICAgICAgICAgICAgICAgY29jb3N6LndhdGNoQUQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOinhumikeaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuinhumikS3lvLnnqpfop5LoibLor5XnlKgt5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lID09IFwiQnRuVmlkZW8wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmdhbWVNZ3IuZ2FtZUN0ci5jdXJVc2VTa2luSWQgPSB0aGlzLnNraW5BcnJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQubmFtZSA9PSBcIkJ0blZpZGVvMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5nYW1lTWdyLmdhbWVDdHIuY3VyVXNlU2tpbklkID0gdGhpcy5za2luQXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0Lm5hbWUgPT0gXCJCdG5WaWRlbzJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Nvc3ouZ2FtZU1nci5nYW1lQ3RyLmN1clVzZVNraW5JZCA9IHRoaXMuc2tpbkFyclsyXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLmNsb3NlUGFuZWwoUGFuZWxOYW1lLlVJVHJ5U2tpblBhbmVsKTtcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDop4bpopHlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5TZW5kRXZlbnQoXCLop4bpopEt5by556qX6KeS6Imy6K+V55SoLeWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvY29zei51aU1nci5jbG9zZVBhbmVsKFBhbmVsTmFtZS5VSVRyeVNraW5QYW5lbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkJ0blBhc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLmNsb3NlUGFuZWwoUGFuZWxOYW1lLlVJVHJ5U2tpblBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==