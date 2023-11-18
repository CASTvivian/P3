"use strict";
cc._RF.push(module, 'e9a673D3vhJ67LdUZDWkzQe', 'RedBagProgressNode');
// common-plugin/Scripts/RedBagProgressNode.ts

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
var RedBagProgressNode = /** @class */ (function (_super) {
    __extends(RedBagProgressNode, _super);
    function RedBagProgressNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressLbl = null;
        _this.progressBar = null;
        _this.tripNode = null;
        _this.tripProgressLbl = null;
        _this._location = "default";
        return _this;
        // _postData(appid: string) {
        //     utils.postData(appid);
        // }
    }
    RedBagProgressNode.prototype.onLoad = function () {
        this.progressLbl = this.node.getComponentInChildren(cc.Label);
        this.progressBar = this.node.getComponentInChildren(cc.ProgressBar);
        this.tripNode = cc.find("Mask/tripNode", this.node);
        this.tripNode.opacity = 0;
        this.tripProgressLbl = this.tripNode.getComponentInChildren(cc.Label);
    };
    RedBagProgressNode.prototype.init = function (data) {
        var _this = this;
        if (data) {
            if (data.location) {
                this._location = data.location;
            }
        }
        cc.log("wid s==========" + Utils_1.utils.yzRedBagInfo.totalProgress + " pro =" + Utils_1.utils.yzRedBagInfo.progress);
        this.progressBar.progress = Utils_1.utils.yzRedBagInfo.progress / Utils_1.utils.yzRedBagInfo.totalProgress;
        this.progressLbl.string = Utils_1.utils.yzRedBagInfo.progress + "/" + Utils_1.utils.yzRedBagInfo.totalProgress;
        this.tripProgressLbl.string = "\u901A\u8FC7" + Utils_1.utils.yzRedBagInfo.totalProgress + "\u5173\u5373\u53EF\u9886\u53D6\u7EA2\u5305";
        if (Utils_1.utils.yzRedBagInfo.progress >= Utils_1.utils.yzRedBagInfo.totalProgress) {
            cc.find("Mask/Icon/pro_cghb", this.node).active = false;
            cc.find("Mask/Icon/pro_full", this.node).active = true;
            cc.find("Mask/Icon/pro_full", this.node).stopAllActions();
            cc.find("Mask/Icon/pro_full", this.node).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }
        else {
            cc.find("Mask/Icon/pro_cghb", this.node).active = true;
            cc.find("Mask/Icon/pro_full", this.node).active = false;
            cc.find("Mask/Icon/pro_full", this.node).stopAllActions();
        }
        setTimeout(function () {
            if (_this.tripNode && cc.isValid(_this.tripNode)) {
                _this.tripNode.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(function () {
                    if (_this.tripNode && cc.isValid(_this.tripNode)) {
                        _this.tripNode.runAction(cc.sequence(cc.delayTime(5), cc.fadeOut(0.3)));
                    }
                })));
            }
        }, 3000);
    };
    RedBagProgressNode.prototype.onEnable = function () {
        var _this = this;
        this.init();
        Utils_1.utils.SendEvent("\u7EA2\u5305\u8FDB\u5EA6\u6302\u4EF6-" + this._location + "-\u5C55\u793A\u6210\u529F");
        cc.game.on("YZ_RED_BAG_PROGRESS_CHANGE", function () {
            _this.init();
        }, this);
    };
    RedBagProgressNode.prototype.showOpenRedBagPanel = function () {
        Utils_1.utils.SendEvent("\u7EA2\u5305\u8FDB\u5EA6\u6302\u4EF6-" + this._location + "-\u70B9\u51FB\u4E0A\u62A5");
        if (Utils_1.utils.yzRedBagInfo.progress >= Utils_1.utils.yzRedBagInfo.totalProgress) {
            Utils_1.utils.showOpenRedBagPanel({ showType: 2 });
        }
        else {
            Utils_1.utils.showMsg("再挑战" + (Utils_1.utils.yzRedBagInfo.totalProgress - Utils_1.utils.yzRedBagInfo.progress) + "关即可领取现金红包");
        }
    };
    RedBagProgressNode.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
        this.node.targetOff(this);
        cc.game.targetOff(this);
    };
    RedBagProgressNode = __decorate([
        ccclass
    ], RedBagProgressNode);
    return RedBagProgressNode;
}(cc.Component));
exports.default = RedBagProgressNode;

cc._RF.pop();