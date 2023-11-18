"use strict";
cc._RF.push(module, '09313S8CXZCU4lptDwQuJIg', 'setMap');
// scripts/Game/setMap.ts

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
var CocosZ_1 = require("../Framework/CocosZ");
var gameMgr_1 = require("./gameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var setMap = /** @class */ (function (_super) {
    __extends(setMap, _super);
    function setMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dmmArr = [];
        _this.dikuai = null;
        _this.time = -1;
        _this.mainCameraPos = cc.Vec2.ZERO;
        _this.distanceX = 2500;
        _this.distanceY = 1500;
        return _this;
    }
    setMap.prototype.onLoad = function () {
        gameMgr_1.gameMgr.setMapTs = this;
        // 躲猫猫图片
        gameMgr_1.gameMgr.dmmArr = this.dmmArr;
        // 地块
        this.dikuai = this.node.getChildByName("dikuai");
        if (this.dikuai) {
            this.dikuai.zIndex = cc.macro.MIN_ZINDEX;
        }
        // 获取坐标
        if ([1, 2, 4].includes(CocosZ_1.cocosz.gameMode) && this.node.getChildByName("point")) {
            var point = this.node.getChildByName("point");
            for (var i = 0; i < point.childrenCount; i++) {
                gameMgr_1.gameMgr.posList[i] = i;
            }
        }
    };
    setMap.prototype.onDestroy = function () {
        gameMgr_1.gameMgr.setMapTs = null;
        ;
    };
    setMap.prototype.start = function () {
        for (var i = 0; i < this.node.children.length; i++) {
            // 初始zindex
            var child = this.node.children[i];
        }
    };
    setMap.prototype.lateUpdate = function () {
        if (CocosZ_1.cocosz.isPause || gameMgr_1.gameMgr.isWin || gameMgr_1.gameMgr.isFail)
            return;
        if (this.time++ % 30 == 0) {
            this.checkAllNode();
        }
    };
    setMap.prototype.checkAllNode = function () {
        if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.mainCamereRootNode) {
            this.mainCameraPos = gameMgr_1.gameMgr.mainCamereRootNode.getPosition();
            this.distanceX = cc.winSize.width / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
            this.distanceY = cc.winSize.height / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
        }
        // 地图节点
        var excludeArr = ["guide", "guidePath", "player", "colllider", "dikuai", "point", "itemPoint", "tree", "tipLayer", "jingyanLayer", "posLayer"];
        for (var i = 0; i < this.node.childrenCount; i++) {
            var child = this.node.children[i];
            if (excludeArr.includes(child.name) == false) {
                this.checkNode(child);
            }
        }
        // 地图地块
        var dikuai = this.node.getChildByName("dikuai");
        if (dikuai) {
            for (var i = 0; i < dikuai.childrenCount; i++) {
                var child = dikuai.children[i];
                this.checkNode(child);
            }
        }
    };
    setMap.prototype.checkNode = function (n, isRefresh) {
        if (isRefresh === void 0) { isRefresh = false; }
        if (isRefresh) {
            if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.mainCamereRootNode) {
                this.mainCameraPos = gameMgr_1.gameMgr.mainCamereRootNode.getPosition();
                this.distanceX = cc.winSize.width / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
                this.distanceY = cc.winSize.height / 2 / gameMgr_1.gameMgr.mainCamera.zoomRatio + 500;
            }
        }
        if (n && n.isValid && n.activeInHierarchy) {
            if (n.parent.name == this.node.name || n.parent.name == "dikuai") {
                if (n.opacity == 0 || n.opacity == 255) {
                    if (((n.x + n.width * Math.abs(n.scaleX) / 2) < (this.mainCameraPos.x - this.distanceX)) || ((n.x - n.width * Math.abs(n.scaleX) / 2) > (this.mainCameraPos.x + this.distanceX) ||
                        (n.y + n.height * Math.abs(n.scaleY) / 2) < (this.mainCameraPos.y - this.distanceY)) || ((n.y - n.height * Math.abs(n.scaleY) / 2) > (this.mainCameraPos.y + this.distanceY))) {
                        n.opacity = 0;
                        return false;
                    }
                    else {
                        n.opacity = 255;
                        return true;
                    }
                }
            }
        }
    };
    // 释放资源节点
    setMap.prototype.release = function (call) {
        var _this = this;
        // 删除dikaui子节点
        if (this.dikuai && this.dikuai.isValid && this.dikuai.childrenCount) {
            for (var i = 0; i < 2; i++) {
                var child = this.dikuai.children[i];
                if (child && child.isValid) {
                    child.destroy();
                }
            }
            setTimeout(function () { _this.release(call); });
        }
        // 删除普通节点
        else if (this.node.childrenCount) {
            for (var i = 0; i < 10; i++) {
                var child = this.node.children[i];
                if (child && child.isValid) {
                    child.destroy();
                }
            }
            setTimeout(function () { _this.release(call); });
        }
        // 结束后回调
        else {
            call && call();
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], setMap.prototype, "dmmArr", void 0);
    setMap = __decorate([
        ccclass
    ], setMap);
    return setMap;
}(cc.Component));
exports.default = setMap;

cc._RF.pop();