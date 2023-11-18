
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/RedBagProgressNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcUmVkQmFnUHJvZ3Jlc3NOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUsxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQTZFQztRQTVFRyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUM3QixpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFDbkMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUNqQyxlQUFTLEdBQVEsU0FBUyxDQUFDOztRQW1FM0IsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QixJQUFJO0lBR1IsQ0FBQztJQXZFRyxtQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFHTSxpQ0FBSSxHQUFYLFVBQVksSUFBVTtRQUF0QixpQkErQkM7UUE5QkcsSUFBSSxJQUFJLEVB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ZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgQmFubmVyTG9jYXRpb24sIFN1YkxvY2F0aW9uIH0gZnJvbSBcIi4vWVpfQ29uc3RhbnRcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IENvbXBhdGlibGVUb29sIGZyb20gXCIuL0NvbXBhdGlibGVUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkQmFnUHJvZ3Jlc3NOb2RlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByb2dyZXNzTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG4gICAgdHJpcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgdHJpcFByb2dyZXNzTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBfbG9jYXRpb246IGFueSA9IFwiZGVmYXVsdFwiO1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMYmwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMudHJpcE5vZGUgPSBjYy5maW5kKFwiTWFzay90cmlwTm9kZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMudHJpcE5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy50cmlwUHJvZ3Jlc3NMYmwgPSB0aGlzLnRyaXBOb2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhPzogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gZGF0YS5sb2NhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2coXCJ3aWQgcz09PT09PT09PT1cIiArIHV0aWxzLnl6UmVkQmFnSW5mby50b3RhbFByb2dyZXNzICsgXCIgcHJvID1cIiArIHV0aWxzLnl6UmVkQmFnSW5mby5wcm9ncmVzcyk7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHV0aWxzLnl6UmVkQmFnSW5mby5wcm9ncmVzcyAvIHV0aWxzLnl6UmVkQmFnSW5mby50b3RhbFByb2dyZXNzO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMYmwuc3RyaW5nID0gYCR7dXRpbHMueXpSZWRCYWdJbmZvLnByb2dyZXNzfS8ke3V0aWxzLnl6UmVkQmFnSW5mby50b3RhbFByb2dyZXNzfWBcclxuICAgICAgICB0aGlzLnRyaXBQcm9ncmVzc0xibC5zdHJpbmcgPSBg6YCa6L+HJHt1dGlscy55elJlZEJhZ0luZm8udG90YWxQcm9ncmVzc33lhbPljbPlj6/pooblj5bnuqLljIVgXHJcblxyXG4gICAgICAgIGlmICh1dGlscy55elJlZEJhZ0luZm8ucHJvZ3Jlc3MgPj0gdXRpbHMueXpSZWRCYWdJbmZvLnRvdGFsUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIk1hc2svSWNvbi9wcm9fY2doYlwiLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiTWFzay9JY29uL3Byb19mdWxsXCIsIHRoaXMubm9kZSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZChcIk1hc2svSWNvbi9wcm9fZnVsbFwiLCB0aGlzLm5vZGUpLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJNYXNrL0ljb24vcHJvX2Z1bGxcIiwgdGhpcy5ub2RlKS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMS4yKSwgY2Muc2NhbGVUbygwLjUsIDEpKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJNYXNrL0ljb24vcHJvX2NnaGJcIiwgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiTWFzay9JY29uL3Byb19mdWxsXCIsIHRoaXMubm9kZSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJNYXNrL0ljb24vcHJvX2Z1bGxcIiwgdGhpcy5ub2RlKS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaXBOb2RlICYmIGNjLmlzVmFsaWQodGhpcy50cmlwTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJpcE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjMpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpcE5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLnRyaXBOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaXBOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoNSksIGNjLmZhZGVPdXQoMC4zKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHV0aWxzLlNlbmRFdmVudChg57qi5YyF6L+b5bqm5oyC5Lu2LSR7dGhpcy5fbG9jYXRpb259LeWxleekuuaIkOWKn2ApO1xyXG4gICAgICAgIGNjLmdhbWUub24oXCJZWl9SRURfQkFHX1BST0dSRVNTX0NIQU5HRVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dPcGVuUmVkQmFnUGFuZWwoKSB7XHJcbiAgICAgICAgdXRpbHMuU2VuZEV2ZW50KGDnuqLljIXov5vluqbmjILku7YtJHt0aGlzLl9sb2NhdGlvbn0t54K55Ye75LiK5oqlYCk7XHJcbiAgICAgICAgaWYgKHV0aWxzLnl6UmVkQmFnSW5mby5wcm9ncmVzcyA+PSB1dGlscy55elJlZEJhZ0luZm8udG90YWxQcm9ncmVzcykge1xyXG4gICAgICAgICAgICB1dGlscy5zaG93T3BlblJlZEJhZ1BhbmVsKHsgc2hvd1R5cGU6IDIgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHMuc2hvd01zZyhcIuWGjeaMkeaImFwiICsgKHV0aWxzLnl6UmVkQmFnSW5mby50b3RhbFByb2dyZXNzIC0gdXRpbHMueXpSZWRCYWdJbmZvLnByb2dyZXNzKSArIFwi5YWz5Y2z5Y+v6aKG5Y+W546w6YeR57qi5YyFXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gX3Bvc3REYXRhKGFwcGlkOiBzdHJpbmcpIHtcclxuICAgIC8vICAgICB1dGlscy5wb3N0RGF0YShhcHBpZCk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxufVxyXG4iXX0=