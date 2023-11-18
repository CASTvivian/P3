
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RewardRedBagPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '946b7F+eyBGEbvsWerWCHnf', 'RewardRedBagPanel');
// common-plugin/Scripts/RewardRedBagPanel.ts

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
var RewardRedBagPanel = /** @class */ (function (_super) {
    __extends(RewardRedBagPanel, _super);
    function RewardRedBagPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        return _this;
    }
    // _location: SubLocation = SubLocation.isMoreGame;
    RewardRedBagPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        this._panel = this.node.getChildByName("Panel");
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this.init();
    };
    RewardRedBagPanel.prototype.openRedBag = function () {
        Utils_1.utils.SendEvent("恭喜获得红包弹窗-点击领取红包！");
        Utils_1.utils.showOpenRedBagPanel({ showType: 2 });
        this.hide();
    };
    RewardRedBagPanel.prototype.init = function () {
        Utils_1.utils.SendEvent("恭喜获得红包弹窗-展示成功！");
    };
    RewardRedBagPanel.prototype.hide = function () {
        this.node.active = false;
    };
    RewardRedBagPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    RewardRedBagPanel = __decorate([
        ccclass
    ], RewardRedBagPanel);
    return RewardRedBagPanel;
}(cc.Component));
exports.default = RewardRedBagPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmV3YXJkUmVkQmFnUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBNkNDO1FBM0NXLFlBQU0sR0FBWSxJQUFJLENBQUM7O0lBMkNuQyxDQUFDO0lBdkNHLG1EQUFtRDtJQUVuRCxrQ0FBTSxHQUFOO1FBQ0ksSUFBSSxhQUFLLENBQUMsV0FBVyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoRCxJQUFJLEtBQUssR0FBVyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QyxPQUFPO1lBQ1AsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7U0FDekM7YUFBTTtZQUNILEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQ0FBVSxHQUFWO1FBQ0ksYUFBSyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BDLGFBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBR00sZ0NBQUksR0FBWDtRQUNJLGFBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBR00sZ0NBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU0sNkNBQWlCLEdBQXhCLFVBQXlCLEtBQVUsRUFBRSxJQUFTO1FBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBNUNnQixpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQTZDckM7SUFBRCx3QkFBQztDQTdDRCxBQTZDQyxDQTdDOEMsRUFBRSxDQUFDLFNBQVMsR0E2QzFEO2tCQTdDb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkUmVkQmFnUGFuZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgX3BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIC8vIF9sb2NhdGlvbjogU3ViTG9jYXRpb24gPSBTdWJMb2NhdGlvbi5pc01vcmVHYW1lO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBpZiAodXRpbHMub3RoZXJDb25maWcgJiYgdXRpbHMub3RoZXJDb25maWcuZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdyb3VwID0gdXRpbHMub3RoZXJDb25maWcuZ3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XHJcblxyXG4gICAgICAgIGxldCByYXRpbzogbnVtYmVyID0gMTtcclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgPCBjYy53aW5TaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIOaoquWxj+a4uOaIj1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxOTIwICogMC41O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIDEwODA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wYW5lbC5zY2FsZSA9IHJhdGlvO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5SZWRCYWcoKSB7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KFwi5oGt5Zac6I635b6X57qi5YyF5by556qXLeeCueWHu+mihuWPlue6ouWMhe+8gVwiKTtcclxuICAgICAgICB1dGlscy5zaG93T3BlblJlZEJhZ1BhbmVsKHsgc2hvd1R5cGU6IDIgfSk7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChcIuaBreWWnOiOt+W+l+e6ouWMheW8ueeqly3lsZXnpLrmiJDlip/vvIFcIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZUJ0bkhhbmRsZXIoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19