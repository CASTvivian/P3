"use strict";
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