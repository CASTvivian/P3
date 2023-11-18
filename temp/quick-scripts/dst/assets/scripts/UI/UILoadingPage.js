
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UI/UILoadingPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '672f4K2Ni5IvZKg5f59uM3H', 'UILoadingPage');
// scripts/UI/UILoadingPage.ts

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
var UIPage_1 = require("../Framework/UIPage");
var Constant_1 = require("../Framework/Constant");
var CocosZ_1 = require("../Framework/CocosZ");
var PlatUtils_1 = require("../../common-plugin/Scripts/PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UILoadingPage = /** @class */ (function (_super) {
    __extends(UILoadingPage, _super);
    function UILoadingPage() {
        var _this = _super.call(this, Constant_1.PageName.UILoadingPage) || this;
        _this._loadingBar = null;
        _this.isValid() && _this.onLoad();
        return _this;
    }
    UILoadingPage.prototype.onLoad = function () {
        // 健康忠告
        var health = cc.find("health", this._page);
        if (health) {
            if (CocosZ_1.cocosz.curLanguage == "zh" && (PlatUtils_1.default.IsHuaWei || PlatUtils_1.default.IsOPPO || CocosZ_1.cocosz.isDeBug)) {
                health.active = true;
            }
            else {
                health.active = false;
            }
        }
        this._loadingBar = cc.find("LoadingBar", this._page).getComponent(cc.ProgressBar);
    };
    UILoadingPage.prototype.onOpen = function () {
        var _this = this;
        cc.game.on(Constant_1.default.E_GAME_LOGIC, this._onGameMassageHandler, this);
        // 进度默认0.01
        this._loadingBar.progress = 0.01;
        // 最低进度
        var r = 0.01;
        cc.tween(this._page)
            .delay(0.2)
            .call(function () {
            r += 0.01;
            if (r < 1) {
                _this._updateProgress(r);
            }
        })
            .union()
            .repeatForever()
            .start();
    };
    UILoadingPage.prototype.onClose = function () {
        cc.game.targetOff(this);
    };
    UILoadingPage.prototype._onGameMassageHandler = function (event) {
        this._loadingBar.node.active = true;
        switch (event.type) {
            case Constant_1.default.E_UPDATE_PROGRESS: {
                this._updateProgress(event.data);
                break;
            }
        }
    };
    UILoadingPage.prototype._updateProgress = function (pro) {
        if (pro > this._loadingBar.progress)
            this._loadingBar.progress = pro;
    };
    UILoadingPage = __decorate([
        ccclass
    ], UILoadingPage);
    return UILoadingPage;
}(UIPage_1.default));
exports.default = UILoadingPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlcXFVJTG9hZGluZ1BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLGtEQUEyRDtBQUMzRCw4Q0FBNkM7QUFDN0MsbUVBQThEO0FBRXhELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFNO0lBSTdDO1FBQUEsWUFDSSxrQkFBTSxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxTQUVoQztRQUxPLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUl2QyxLQUFJLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztJQUNwQyxDQUFDO0lBRVMsOEJBQU0sR0FBaEI7UUFDSSxPQUFPO1FBQ1AsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFTLENBQUMsUUFBUSxJQUFJLG1CQUFTLENBQUMsTUFBTSxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUYsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDekI7U0FDSjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVTLDhCQUFNLEdBQWhCO1FBQUEsaUJBZUM7UUFkRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsV0FBVztRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNqQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLElBQUksQ0FBQztZQUNGLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQUUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUFFO1FBQzNDLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRTthQUNQLGFBQWEsRUFBRTthQUNmLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFUywrQkFBTyxHQUFqQjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCw2Q0FBcUIsR0FBckIsVUFBc0IsS0FBVTtRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLGtCQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQztJQUVELHVDQUFlLEdBQWYsVUFBZ0IsR0FBVztRQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3hDLENBQUM7SUF4RGdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwRGpDO0lBQUQsb0JBQUM7Q0ExREQsQUEwREMsQ0ExRDBDLGdCQUFNLEdBMERoRDtrQkExRG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlQYWdlIGZyb20gXCIuLi9GcmFtZXdvcmsvVUlQYWdlXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBQYWdlTmFtZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4uL0ZyYW1ld29yay9Db2Nvc1pcIjtcclxuaW1wb3J0IFBsYXRVdGlscyBmcm9tIFwiLi4vLi4vY29tbW9uLXBsdWdpbi9TY3JpcHRzL1BsYXRVdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTG9hZGluZ1BhZ2UgZXh0ZW5kcyBVSVBhZ2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQYWdlTmFtZS5VSUxvYWRpbmdQYWdlKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g5YGl5bq35b+g5ZGKXHJcbiAgICAgICAgbGV0IGhlYWx0aCA9IGNjLmZpbmQoXCJoZWFsdGhcIiwgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgaWYgKGhlYWx0aCkge1xyXG4gICAgICAgICAgICBpZiAoY29jb3N6LmN1ckxhbmd1YWdlID09IFwiemhcIiAmJiAoUGxhdFV0aWxzLklzSHVhV2VpIHx8IFBsYXRVdGlscy5Jc09QUE8gfHwgY29jb3N6LmlzRGVCdWcpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFsdGguYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWx0aC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2FkaW5nQmFyID0gY2MuZmluZChcIkxvYWRpbmdCYXJcIiwgdGhpcy5fcGFnZSkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIGNjLmdhbWUub24oQ29uc3RhbnQuRV9HQU1FX0xPR0lDLCB0aGlzLl9vbkdhbWVNYXNzYWdlSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgLy8g6L+b5bqm6buY6K6kMC4wMVxyXG4gICAgICAgIHRoaXMuX2xvYWRpbmdCYXIucHJvZ3Jlc3MgPSAwLjAxO1xyXG4gICAgICAgIC8vIOacgOS9jui/m+W6plxyXG4gICAgICAgIGxldCByID0gMC4wMTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLl9wYWdlKVxyXG4gICAgICAgICAgICAuZGVsYXkoMC4yKVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByICs9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICBpZiAociA8IDEpIHsgdGhpcy5fdXBkYXRlUHJvZ3Jlc3Mocik7IH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25HYW1lTWFzc2FnZUhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2xvYWRpbmdCYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0YW50LkVfVVBEQVRFX1BST0dSRVNTOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcyhldmVudC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVQcm9ncmVzcyhwcm86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChwcm8gPiB0aGlzLl9sb2FkaW5nQmFyLnByb2dyZXNzKVxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=