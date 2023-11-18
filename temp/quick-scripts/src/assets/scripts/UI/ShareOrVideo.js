"use strict";
cc._RF.push(module, 'af730WeuddAYrpP8Nt749SI', 'ShareOrVideo');
// scripts/UI/ShareOrVideo.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShareOrVideo = /** @class */ (function (_super) {
    __extends(ShareOrVideo, _super);
    function ShareOrVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._btn = false;
        _this.isGuideSKill = false;
        _this.shareNode = null;
        _this.videoNode = null;
        return _this;
    }
    Object.defineProperty(ShareOrVideo.prototype, "btn", {
        get: function () {
            return this._btn;
        },
        set: function (v) {
            this._btn = false;
            if (this.node.getChildByName("share")) {
                this.shareNode = this.node.getChildByName("share");
            }
            if (this.node.getChildByName("video")) {
                this.videoNode = this.node.getChildByName("video");
            }
        },
        enumerable: false,
        configurable: true
    });
    ShareOrVideo.prototype.onLoad = function () {
        // 监听点击
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            cc.game.emit(Constant_1.default.E_ShareOrVideo);
        });
        // 监听事件
        cc.game.on(Constant_1.default.E_ShareOrVideo, this.show, this);
    };
    ShareOrVideo.prototype.onDestroy = function () {
        // 注销事件
        cc.game.targetOff(this);
    };
    ShareOrVideo.prototype.start = function () {
        this.show();
    };
    ShareOrVideo.prototype.show = function () {
        if (this.isGuideSKill && CocosZ_1.cocosz.dataMgr.guide_skill) {
            // 隐藏分享图标
            if (this.shareNode && this.shareNode.isValid) {
                this.shareNode.active = false;
            }
            // 隐藏视频图标
            if (this.videoNode && this.videoNode.isValid) {
                this.videoNode.active = false;
            }
        }
        else {
            // 显示分享图标
            if (this.shareNode && this.shareNode.isValid) {
                this.shareNode.active = CocosZ_1.cocosz.canShare;
            }
            // 显示视频图标
            if (this.videoNode && this.videoNode.isValid) {
                this.videoNode.active = !CocosZ_1.cocosz.canShare;
            }
        }
    };
    __decorate([
        property()
    ], ShareOrVideo.prototype, "btn", null);
    __decorate([
        property({ type: cc.Boolean, tooltip: "是否新手指引免费使用" })
    ], ShareOrVideo.prototype, "isGuideSKill", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "分享图标" })
    ], ShareOrVideo.prototype, "shareNode", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "视频图标" })
    ], ShareOrVideo.prototype, "videoNode", void 0);
    ShareOrVideo = __decorate([
        ccclass
    ], ShareOrVideo);
    return ShareOrVideo;
}(cc.Component));
exports.default = ShareOrVideo;

cc._RF.pop();