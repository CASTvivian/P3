"use strict";
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