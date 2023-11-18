
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/NativeTryGamesWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '932f9ROnk9AN7mC5qMygyf7', 'NativeTryGamesWidget');
// common-plugin/Scripts/NativeTryGamesWidget.ts

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
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NativeTryGamesWidget = /** @class */ (function (_super) {
    __extends(NativeTryGamesWidget, _super);
    function NativeTryGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tryGameNode = null;
        _this._btnClose = null;
        return _this;
    }
    NativeTryGamesWidget.prototype.onLoad = function () {
        this._tryGameNode = this.getComponentInChildren("NativeTryGameNode");
        this._tryGameNode.node.active = false;
        this._btnClose = this._tryGameNode.node.getChildByName("BtnClose");
    };
    NativeTryGamesWidget.prototype.init = function () {
        if (!this._tryGameNode) {
            this._tryGameNode = this.getComponentInChildren("NativeTryGameNode");
            this._btnClose = this._tryGameNode.node.getChildByName("BtnClose");
        }
        if (Utils_1.utils.isShowNativeTryGamesWidget()) {
            var dataValid = true;
            if (Utils_1.utils.tryGameDate) {
                if (Utils_1.utils.tryGameDate.length <= 0) {
                    cc.warn("res的长度不合法！");
                    dataValid = false;
                }
            }
            else {
                cc.warn("res不存在！");
                dataValid = false;
            }
            Utils_1.utils.showLog("原生抖动dataValid：" + dataValid);
            if (dataValid) {
                Utils_1.utils.showLog("交叉推广数据:", JSON.stringify(Utils_1.utils.tryGameDate));
                this._tryGameNode.init({ "jump_refresh_time": Utils_1.utils.ServerConfig.icon_jump_native, "jump_list": Utils_1.utils.tryGameDate });
                this._tryGameNode.node.active = true;
                if (PlatUtils_1.default.IsHuaWei) {
                    Utils_1.utils.showLog("华为平台，显示关闭按钮>>>>>");
                    this._btnClose.active = true;
                }
            }
            else {
                this._tryGameNode.node.active = false;
            }
        }
        else {
            this._tryGameNode.node.active = false;
        }
    };
    NativeTryGamesWidget.prototype.close = function () {
        this._tryGameNode.node.opacity = 0;
    };
    NativeTryGamesWidget = __decorate([
        ccclass
    ], NativeTryGamesWidget);
    return NativeTryGamesWidget;
}(cc.Component));
exports.default = NativeTryGamesWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTmF0aXZlVHJ5R2FtZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWdDO0FBRWhDLHlDQUFvQztBQUU5QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrRCx3Q0FBWTtJQUE5RDtRQUFBLHFFQW1EQztRQWpERyxrQkFBWSxHQUFzQixJQUFJLENBQUM7UUFDdkMsZUFBUyxHQUFZLElBQUksQ0FBQzs7SUFnRDlCLENBQUM7SUE5Q0cscUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsbUNBQUksR0FBSjtRQUVJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEU7UUFHRCxJQUFJLGFBQUssQ0FBQywwQkFBMEIsRUFBRSxFQUFFO1lBQ3BDLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQztZQUM5QixJQUFJLGFBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLElBQUksYUFBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUMvQixFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN0QixTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUNyQjthQUNKO2lCQUFNO2dCQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25CLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDckI7WUFFRCxhQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxFQUFFO2dCQUNYLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsYUFBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsYUFBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ3JILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksbUJBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3BCLGFBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtvQkFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNoQzthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDekM7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxvQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBbERnQixvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQW1EeEM7SUFBRCwyQkFBQztDQW5ERCxBQW1EQyxDQW5EaUQsRUFBRSxDQUFDLFNBQVMsR0FtRDdEO2tCQW5Eb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyeUdhbWVOb2RlIGZyb20gXCIuL1RyeUdhbWVOb2RlXCI7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgTmF0aXZlVHJ5R2FtZU5vZGUgZnJvbSBcIi4vTmF0aXZlVHJ5R2FtZU5vZGVcIjtcbmltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4vUGxhdFV0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXRpdmVUcnlHYW1lc1dpZGdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBfdHJ5R2FtZU5vZGU6IE5hdGl2ZVRyeUdhbWVOb2RlID0gbnVsbDtcbiAgICBfYnRuQ2xvc2U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl90cnlHYW1lTm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihcIk5hdGl2ZVRyeUdhbWVOb2RlXCIpO1xuICAgICAgICB0aGlzLl90cnlHYW1lTm9kZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9idG5DbG9zZSA9IHRoaXMuX3RyeUdhbWVOb2RlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5DbG9zZVwiKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIGlmICghdGhpcy5fdHJ5R2FtZU5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyeUdhbWVOb2RlID0gdGhpcy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFwiTmF0aXZlVHJ5R2FtZU5vZGVcIik7XG4gICAgICAgICAgICB0aGlzLl9idG5DbG9zZSA9IHRoaXMuX3RyeUdhbWVOb2RlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCdG5DbG9zZVwiKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU2hvd05hdGl2ZVRyeUdhbWVzV2lkZ2V0KCkpIHtcbiAgICAgICAgICAgIGxldCBkYXRhVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHV0aWxzLnRyeUdhbWVEYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLnRyeUdhbWVEYXRlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJyZXPnmoTplb/luqbkuI3lkIjms5XvvIFcIik7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcInJlc+S4jeWtmOWcqO+8gVwiKTtcbiAgICAgICAgICAgICAgICBkYXRhVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuc2hvd0xvZyhcIuWOn+eUn+aKluWKqGRhdGFWYWxpZO+8mlwiICsgZGF0YVZhbGlkKTtcbiAgICAgICAgICAgIGlmIChkYXRhVmFsaWQpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Lqk5Y+J5o6o5bm/5pWw5o2uOlwiLCBKU09OLnN0cmluZ2lmeSh1dGlscy50cnlHYW1lRGF0ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyeUdhbWVOb2RlLmluaXQoeyBcImp1bXBfcmVmcmVzaF90aW1lXCI6IHV0aWxzLlNlcnZlckNvbmZpZy5pY29uX2p1bXBfbmF0aXZlLCBcImp1bXBfbGlzdFwiOiB1dGlscy50cnlHYW1lRGF0ZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cnlHYW1lTm9kZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKFBsYXRVdGlscy5Jc0h1YVdlaSkge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5zaG93TG9nKFwi5Y2O5Li65bmz5Y+w77yM5pi+56S65YWz6Zet5oyJ6ZKuPj4+Pj5cIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnRuQ2xvc2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyeUdhbWVOb2RlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cnlHYW1lTm9kZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX3RyeUdhbWVOb2RlLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxufVxuIl19