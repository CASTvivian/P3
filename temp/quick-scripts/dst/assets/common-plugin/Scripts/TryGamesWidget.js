
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/TryGamesWidget.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44f5bUS0vVOsr9VFcezUfsI', 'TryGamesWidget');
// common-plugin/Scripts/TryGamesWidget.ts

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
var TryGamesWidget = /** @class */ (function (_super) {
    __extends(TryGamesWidget, _super);
    function TryGamesWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tryGameNode = null;
        _this._isInit = false;
        return _this;
    }
    TryGamesWidget.prototype.onLoad = function () {
        this._tryGameNode = this.getComponentInChildren("TryGameNode");
        this._tryGameNode.node.active = false;
    };
    TryGamesWidget.prototype.onEnable = function () {
        var _this = this;
        Utils_1.utils.registerServerInitEvent(function () {
            _this._initWidget();
        }, this);
    };
    TryGamesWidget.prototype.onDisable = function () {
        Utils_1.utils.unregisterServerInitEvent(this);
    };
    TryGamesWidget.prototype._initWidget = function () {
        if (this._isInit)
            return;
        var dataValid = true;
        var data = Utils_1.utils.getInnerRecommendData();
        if (data) {
            if (data.jump_list) {
                if (data.jump_list.length <= 0) {
                    cc.warn("字段jump_list的长度不合法！");
                    dataValid = false;
                }
            }
            else {
                cc.warn("字段jump_list不存在！");
                dataValid = false;
            }
        }
        else {
            cc.warn("交叉推广数据为null");
            dataValid = false;
        }
        if (dataValid) {
            this._isInit = true;
            Utils_1.utils.showLog("交叉推广数据:", JSON.stringify(data));
            this._tryGameNode.init({ "jump_refresh_time": data.jump_refresh_time, "jump_list": data.jump_list });
            this._tryGameNode.node.active = true;
        }
        else {
            this.node.destroy();
        }
    };
    TryGamesWidget = __decorate([
        ccclass
    ], TryGamesWidget);
    return TryGamesWidget;
}(cc.Component));
exports.default = TryGamesWidget;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcVHJ5R2FtZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBc0RDO1FBcERHLGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUNqQyxhQUFPLEdBQVksS0FBSyxDQUFDOztJQW1EN0IsQ0FBQztJQWpERywrQkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsYUFBSyxDQUFDLHVCQUF1QixDQUFDO1lBQzFCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUNJLGFBQUssQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBR3pCLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQztRQUM5QixJQUFJLElBQUksR0FBUSxhQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLElBQUksRUFBRTtZQUVOLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzVCLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDOUIsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDckI7YUFDSjtpQkFBTTtnQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzNCLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDckI7U0FDSjthQUFNO1lBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2QixTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3JHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDeEM7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBbkRnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBc0RsQztJQUFELHFCQUFDO0NBdERELEFBc0RDLENBdEQyQyxFQUFFLENBQUMsU0FBUyxHQXNEdkQ7a0JBdERvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyeUdhbWVOb2RlIGZyb20gXCIuL1RyeUdhbWVOb2RlXCI7XHJcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcnlHYW1lc1dpZGdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgX3RyeUdhbWVOb2RlOiBUcnlHYW1lTm9kZSA9IG51bGw7XHJcbiAgICBfaXNJbml0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgICB0aGlzLl90cnlHYW1lTm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihcIlRyeUdhbWVOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMuX3RyeUdhbWVOb2RlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdXRpbHMucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0V2lkZ2V0KCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHV0aWxzLnVucmVnaXN0ZXJTZXJ2ZXJJbml0RXZlbnQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRXaWRnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzSW5pdCkgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGRhdGFWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHV0aWxzLmdldElubmVyUmVjb21tZW5kRGF0YSgpO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5qdW1wX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmp1bXBfbGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLlrZfmrrVqdW1wX2xpc3TnmoTplb/luqbkuI3lkIjms5XvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwi5a2X5q61anVtcF9saXN05LiN5a2Y5Zyo77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgZGF0YVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwi5Lqk5Y+J5o6o5bm/5pWw5o2u5Li6bnVsbFwiKTtcclxuICAgICAgICAgICAgZGF0YVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YVZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHV0aWxzLnNob3dMb2coXCLkuqTlj4nmjqjlub/mlbDmja46XCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJ5R2FtZU5vZGUuaW5pdCh7IFwianVtcF9yZWZyZXNoX3RpbWVcIjogZGF0YS5qdW1wX3JlZnJlc2hfdGltZSwgXCJqdW1wX2xpc3RcIjogZGF0YS5qdW1wX2xpc3QgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyeUdhbWVOb2RlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==