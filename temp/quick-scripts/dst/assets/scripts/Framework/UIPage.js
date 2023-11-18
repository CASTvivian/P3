
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/UIPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bbcc9AF2MhO8ouP3e6ksQiO', 'UIPage');
// scripts/Framework/UIPage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../common-plugin/Scripts/Utils");
var CocosZ_1 = require("./CocosZ");
var UIMgr_1 = require("./UIMgr");
var UIPage = /** @class */ (function () {
    function UIPage(pageName) {
        var _this = this;
        this._page = null;
        this._pageName = "";
        /** 页面状态 */
        this._isOpen = false;
        var prefab = CocosZ_1.cocosz.resMgr.getRes(pageName, cc.Prefab);
        if (prefab) {
            var node = cc.instantiate(prefab);
            if (node) {
                this._page = node;
                this._pageName = pageName;
                node.active = false;
                node.position = cc.Vec3.ZERO;
                this._isOpen = false;
                this.getUIRoot().addChild(node);
                node.group = 'ui';
            }
        }
        else {
            CocosZ_1.cocosz.resMgr.loadAndCacheRes("UI/" + pageName, cc.Prefab, null, function (err, res) {
                if (res) {
                    var node = cc.instantiate(res);
                    if (node) {
                        _this._page = node;
                        _this._pageName = pageName;
                        node.active = false;
                        node.position = cc.Vec3.ZERO;
                        _this._isOpen = false;
                        _this.getUIRoot().addChild(node);
                        node.group = 'ui';
                        _this.onLoad();
                        _this.open();
                    }
                }
                else {
                    cc.error("Prefab " + pageName + " is not found!");
                }
            });
        }
    }
    UIPage.prototype.open = function () {
        if (this.isValid()) {
            if (!this._isOpen) {
                // 恢复开关
                UIMgr_1.default.canOpen = true;
                // 打开界面
                this._isOpen = true;
                this._page.active = true;
                this.onOpen();
                // 插屏
                var serverValue = CocosZ_1.cocosz.getConfigByKey("isInterstitial_" + this._pageName);
                if (serverValue) {
                    // 每次都弹
                    if (serverValue === "true") {
                        CocosZ_1.cocosz.isShowAd && Utils_1.utils.adManager.ShowInterstitial();
                    }
                    // 几次弹一次
                    else if ((Number.isInteger(serverValue) && serverValue > 0)) {
                        if (!UIPage.interstitialCount[this._pageName]) {
                            UIPage.interstitialCount[this._pageName] = 0;
                        }
                        if (++UIPage.interstitialCount[this._pageName] % serverValue === 0) {
                            CocosZ_1.cocosz.isShowAd && Utils_1.utils.adManager.ShowInterstitial();
                        }
                    }
                }
            }
        }
        else {
            cc.log("Page is not found!");
        }
    };
    UIPage.prototype.close = function () {
        if (this._isOpen) {
            this._isOpen = false;
            this.onClose();
        }
        if (this.isValid()) {
            this._page.active = false;
            this.destroy();
        }
        // 资源销毁
        if ("UILoadingPage" === this._pageName) {
            CocosZ_1.cocosz.resMgr.releaseSingleRes(this._pageName, cc.Prefab);
        }
    };
    UIPage.prototype.destroy = function () {
        if (this._isOpen) {
            this._isOpen = false;
        }
        this.onDestroy();
        // 销毁界面
        if (this.isValid()) {
            this._page.destroy();
        }
    };
    UIPage.prototype.getUIRoot = function () {
        return cc.find("Canvas");
    };
    UIPage.prototype.isValid = function () {
        return this._page && cc.isValid(this._page);
    };
    UIPage.prototype.isOpen = function () {
        return this.isValid() && this._isOpen;
    };
    /**
     * 子类扩展：页面初始化时调用，注意不是引擎周期函数,此时引擎周期函数还没有调用
     */
    UIPage.prototype.onLoad = function () {
    };
    /**
     * 子类扩展：页面展示时调用
     */
    UIPage.prototype.onOpen = function () { };
    /**
     * 子类扩展：页面关闭时调用
     */
    UIPage.prototype.onClose = function () { };
    /**
     * 子类扩展：页面销毁时调用
     */
    UIPage.prototype.onDestroy = function () { };
    /** 记录页面插屏次数 */
    UIPage.interstitialCount = {};
    return UIPage;
}());
exports.default = UIPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxVSVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBMEQ7QUFDMUQsbUNBQWtDO0FBQ2xDLGlDQUE0QjtBQUc1QjtJQVNJLGdCQUFZLFFBQWdCO1FBQTVCLGlCQWlDQztRQXhDUyxVQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDakMsV0FBVztRQUNELFlBQU8sR0FBWSxLQUFLLENBQUM7UUFLL0IsSUFBSSxNQUFNLEdBQWMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksSUFBSSxHQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1NBQ0o7YUFBTTtZQUNILGVBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBQyxHQUFVLEVBQUUsR0FBUTtnQkFDbEYsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsSUFB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Z0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRU0sd0JBQU8sR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU87UUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVTLDBCQUFTLEdBQW5CO1FBQ0ksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSx3QkFBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSx1QkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDTyx1QkFBTSxHQUFoQjtJQUNBLENBQUM7SUFDRDs7T0FFRztJQUNPLHVCQUFNLEdBQWhCLGNBQXFCLENBQUM7SUFDdEI7O09BRUc7SUFDTyx3QkFBTyxHQUFqQixjQUFzQixDQUFDO0lBQ3ZCOztPQUVHO0lBQ08sMEJBQVMsR0FBbkIsY0FBd0IsQ0FBQztJQTFIekIsZUFBZTtJQUNELHdCQUFpQixHQUErQixFQUFFLENBQUM7SUFtSnJFLGFBQUM7Q0ExSkQsQUEwSkMsSUFBQTtrQkExSm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuLi8uLi9jb21tb24tcGx1Z2luL1NjcmlwdHMvVXRpbHNcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4vQ29jb3NaXCI7XHJcbmltcG9ydCBVSU1nciBmcm9tIFwiLi9VSU1nclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnZSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9wYWdlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBfcGFnZU5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKiog6aG16Z2i54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgX2lzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOiusOW9lemhtemdouaPkuWxj+asoeaVsCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnN0aXRpYWxDb3VudDogeyBbbmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYWdlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHByZWZhYjogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMocGFnZU5hbWUsIGNjLlByZWZhYik7XHJcbiAgICAgICAgaWYgKHByZWZhYikge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VOYW1lID0gcGFnZU5hbWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVSVJvb3QoKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSAndWknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29jb3N6LnJlc01nci5sb2FkQW5kQ2FjaGVSZXMoXCJVSS9cIiArIHBhZ2VOYW1lLCBjYy5QcmVmYWIsIG51bGwsIChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYWdlID0gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZU5hbWUgPSBwYWdlTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VUlSb290KCkuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ3JvdXAgPSAndWknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGBQcmVmYWIgJHtwYWdlTmFtZX0gaXMgbm90IGZvdW5kIWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc09wZW4pIHtcclxuICAgICAgICAgICAgICAgIC8vIOaBouWkjeW8gOWFs1xyXG4gICAgICAgICAgICAgICAgVUlNZ3IuY2FuT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyDmiZPlvIDnlYzpnaJcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xyXG4gICAgICAgICAgICAgICAgLy8g5o+S5bGPXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmVyVmFsdWUgPSBjb2Nvc3ouZ2V0Q29uZmlnQnlLZXkoXCJpc0ludGVyc3RpdGlhbF9cIiArIHRoaXMuX3BhZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOavj+asoemDveW8uVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJWYWx1ZSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29jb3N6LmlzU2hvd0FkICYmIHV0aWxzLmFkTWFuYWdlci5TaG93SW50ZXJzdGl0aWFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWHoOasoeW8ueS4gOasoVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChOdW1iZXIuaXNJbnRlZ2VyKHNlcnZlclZhbHVlKSAmJiBzZXJ2ZXJWYWx1ZSA+IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghVUlQYWdlLmludGVyc3RpdGlhbENvdW50W3RoaXMuX3BhZ2VOYW1lXSkgeyBVSVBhZ2UuaW50ZXJzdGl0aWFsQ291bnRbdGhpcy5fcGFnZU5hbWVdID0gMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytVSVBhZ2UuaW50ZXJzdGl0aWFsQ291bnRbdGhpcy5fcGFnZU5hbWVdICUgc2VydmVyVmFsdWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5pc1Nob3dBZCAmJiB1dGlscy5hZE1hbmFnZXIuU2hvd0ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiUGFnZSBpcyBub3QgZm91bmQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWdlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6LWE5rqQ6ZSA5q+BXHJcbiAgICAgICAgaWYgKFwiVUlMb2FkaW5nUGFnZVwiID09PSB0aGlzLl9wYWdlTmFtZSkge1xyXG4gICAgICAgICAgICBjb2Nvc3oucmVzTWdyLnJlbGVhc2VTaW5nbGVSZXModGhpcy5fcGFnZU5hbWUsIGNjLlByZWZhYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XHJcbiAgICAgICAgLy8g6ZSA5q+B55WM6Z2iXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2UuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VUlSb290KCkge1xyXG4gICAgICAgIHJldHVybiBjYy5maW5kKFwiQ2FudmFzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYWdlICYmIGNjLmlzVmFsaWQodGhpcy5fcGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgJiYgdGhpcy5faXNPcGVuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Q57G75omp5bGV77ya6aG16Z2i5Yid5aeL5YyW5pe26LCD55So77yM5rOo5oSP5LiN5piv5byV5pOO5ZGo5pyf5Ye95pWwLOatpOaXtuW8leaTjuWRqOacn+WHveaVsOi/mOayoeacieiwg+eUqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZDnsbvmianlsZXvvJrpobXpnaLlsZXnpLrml7bosIPnlKhcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZDnsbvmianlsZXvvJrpobXpnaLlhbPpl63ml7bosIPnlKhcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7IH1cclxuICAgIC8qKlxyXG4gICAgICog5a2Q57G75omp5bGV77ya6aG16Z2i6ZSA5q+B5pe26LCD55SoXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7IH1cclxuXHJcblxyXG4gICAgLy8gcHJpdmF0ZSBfcGxheVNob3dBbmltYXRpb24oKXtcclxuICAgIC8vICAgICBsZXQgYW5pbWF0aW9uczogY2MuQW5pbWF0aW9uW10gPSB0aGlzLl9wYWdlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLkFuaW1hdGlvbik7XHJcbiAgICAvLyAgICAgaWYoYW5pbWF0aW9ucyl7XHJcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaT0wO2k8YW5pbWF0aW9ucy5sZW5ndGg7aSsrKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBhbmltOiBjYy5BbmltYXRpb24gPSBhbmltYXRpb25zW2ldO1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGNsaXA6IGNjLkFuaW1hdGlvbkNsaXAgPSBhbmltLmRlZmF1bHRDbGlwO1xyXG4gICAgLy8gICAgICAgICAgICAgY2xpcC53cmFwTW9kZSA9IGNjLldyYXBNb2RlLk5vcm1hbDtcclxuICAgIC8vICAgICAgICAgICAgIGFuaW0ucGxheShjbGlwLm5hbWUpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHByaXZhdGUgX3BsYXlIaWRlQW5pbWF0aW9uKCl7XHJcbiAgICAvLyAgICAgbGV0IGFuaW1hdGlvbnM6IGNjLkFuaW1hdGlvbltdID0gdGhpcy5fcGFnZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5BbmltYXRpb24pO1xyXG4gICAgLy8gICAgIGlmKGFuaW1hdGlvbnMpe1xyXG4gICAgLy8gICAgICAgICBmb3IobGV0IGk9MDtpPGFuaW1hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgYW5pbTogY2MuQW5pbWF0aW9uID0gYW5pbWF0aW9uc1tpXTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBjbGlwOiBjYy5BbmltYXRpb25DbGlwID0gYW5pbS5kZWZhdWx0Q2xpcDtcclxuICAgIC8vICAgICAgICAgICAgIGNsaXAud3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5SZXZlcnNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYW5pbS5wbGF5KGNsaXAubmFtZSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuIl19