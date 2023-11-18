
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/MoreGamesPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '369d4RM2rtPj4bmcA3rMp3j', 'MoreGamesPanel');
// common-plugin/Scripts/MoreGamesPanel.ts

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
var YZ_Constant_1 = require("./YZ_Constant");
var PlatUtils_1 = require("./PlatUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var _panelSize = [cc.size(225, 1000), cc.size(506, 1000)];
var _titleSize = [cc.size(111, 54), cc.size(275, 54)];
var _titleBgSize = [cc.size(376, 104), cc.size(545, 104)];
var _starSize = [cc.size(251, 89), cc.size(425, 89)];
var MoreGamesPanel = /** @class */ (function (_super) {
    __extends(MoreGamesPanel, _super);
    function MoreGamesPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._panel = null;
        _this._gameList = null;
        _this._originScale = 1;
        _this._gameItems = [];
        _this._jumpList = null;
        _this._dataDirty = false;
        _this._closeBtnRight = null;
        _this._closeBtnLine = null;
        _this._star = null;
        _this._items = [];
        _this.gameItemNode = null;
        _this._location = YZ_Constant_1.SubLocation.isMoreGame;
        return _this;
    }
    MoreGamesPanel.prototype.onLoad = function () {
        if (Utils_1.utils.otherConfig && Utils_1.utils.otherConfig.group) {
            this.node.group = Utils_1.utils.otherConfig.group;
        }
        if (!PlatUtils_1.default.IsNativeAndroid) {
            Utils_1.utils.adManager.HideBanner(YZ_Constant_1.BannerLocation.Home);
        }
        this._panel = this.node.getChildByName("Panel");
        this._gameList = this._panel.getChildByName("GameScrollView").getComponent(cc.ScrollView).content;
        this.gameItemNode = this._gameList.children[0];
        this._gameList.removeAllChildren();
        this.node.active = false;
        var ratio = 1;
        if (cc.winSize.height < cc.winSize.width) {
            // 横屏游戏
            ratio = cc.winSize.width / 1920 * 0.5;
        }
        else {
            ratio = cc.winSize.width / 1080;
        }
        this._panel.scale = ratio;
        this._originScale = this._panel.scale;
    };
    MoreGamesPanel.prototype._initWidget = function () {
        this._gameList.removeAllChildren();
        var totalRow = Math.floor(this._jumpList.length / 3);
        var totalClo = 3 * totalRow;
        for (var i = 0; i < totalClo; i++) {
            var data = this._jumpList[i];
            if (data && data.logo) {
                var tempNode = cc.instantiate(this.gameItemNode);
                var qcrossWidgetItem = tempNode.getComponent("QCrossWidgetItem");
                qcrossWidgetItem._location = this._location;
                qcrossWidgetItem.init(data);
                this._gameList.addChild(tempNode);
            }
        }
    };
    MoreGamesPanel.prototype.update = function () {
        if (this._dataDirty) {
            this._dataDirty = false;
            this._updatePanel();
        }
    };
    MoreGamesPanel.prototype._updatePanel = function () {
        Utils_1.utils.postRecommentShowData(this._location);
        this._initWidget();
        return;
    };
    MoreGamesPanel.prototype.init = function (jumpList) {
        this._jumpList = jumpList;
        this._dataDirty = true;
    };
    MoreGamesPanel.prototype.show = function () {
        this.node.active = true;
    };
    MoreGamesPanel.prototype.hide = function () {
        var self = this;
        // this._panel.runAction(cc.sequence(cc.moveTo(0.3, CompatibleTool.position(-this._panel.getContentSize().width, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(() => {
        self.node.active = false;
        // })));
        // if (!PlatUtils.IsNativeAndroid) {
        //     utils.adManager.ShowBanner(BannerLocation.Home);
        // }
    };
    MoreGamesPanel.prototype.onCloseBtnHandler = function (event, data) {
        this.hide();
    };
    MoreGamesPanel = __decorate([
        ccclass
    ], MoreGamesPanel);
    return MoreGamesPanel;
}(cc.Component));
exports.default = MoreGamesPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTW9yZUdhbWVzUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsaUNBQWdDO0FBQ2hDLDZDQUE0RDtBQUM1RCx5Q0FBb0M7QUFHOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxVQUFVLEdBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLElBQU0sVUFBVSxHQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRSxJQUFNLFlBQVksR0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkUsSUFBTSxTQUFTLEdBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBR2xFO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBbUdDO1FBakdHLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV6QixnQkFBVSxHQUFlLEVBQUUsQ0FBQztRQUM1QixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RC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ckM7U0FDSjtJQUNMLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQ0ksYUFBSyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTztJQUNYLENBQUM7SUFFTSw2QkFBSSxHQUFYLFVBQVksUUFBYTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRU0sNkJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sNkJBQUksR0FBWDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQiw2S0FBNks7UUFDN0ssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFFBQVE7UUFDUixvQ0FBb0M7UUFDcEMsdURBQXVEO1FBQ3ZELElBQUk7SUFDUixDQUFDO0lBRU0sMENBQWlCLEdBQXhCLFVBQXlCLEtBQVUsRUFBRSxJQUFTO1FBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBbEdnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBbUdsQztJQUFELHFCQUFDO0NBbkdELEFBbUdDLENBbkcyQyxFQUFFLENBQUMsU0FBUyxHQW1HdkQ7a0JBbkdvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVJdGVtIGZyb20gXCIuL0dhbWVJdGVtXCI7XHJcbmltcG9ydCBRQ3Jvc3NXaWRnZXRJdGVtIGZyb20gXCIuL1FDcm9zc1dpZGdldEl0ZW1cIjtcclxuaW1wb3J0IHsgdXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBCYW5uZXJMb2NhdGlvbiwgU3ViTG9jYXRpb24gfSBmcm9tIFwiLi9ZWl9Db25zdGFudFwiO1xyXG5pbXBvcnQgUGxhdFV0aWxzIGZyb20gXCIuL1BsYXRVdGlsc1wiO1xyXG5pbXBvcnQgQ29tcGF0aWJsZVRvb2wgZnJvbSBcIi4vQ29tcGF0aWJsZVRvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBfcGFuZWxTaXplOiBjYy5TaXplW10gPSBbY2Muc2l6ZSgyMjUsIDEwMDApLCBjYy5zaXplKDUwNiwgMTAwMCldO1xyXG5jb25zdCBfdGl0bGVTaXplOiBjYy5TaXplW10gPSBbY2Muc2l6ZSgxMTEsIDU0KSwgY2Muc2l6ZSgyNzUsIDU0KV07XHJcbmNvbnN0IF90aXRsZUJnU2l6ZTogY2MuU2l6ZVtdID0gW2NjLnNpemUoMzc2LCAxMDQpLCBjYy5zaXplKDU0NSwgMTA0KV07XHJcbmNvbnN0IF9zdGFyU2l6ZTogY2MuU2l6ZVtdID0gW2NjLnNpemUoMjUxLCA4OSksIGNjLnNpemUoNDI1LCA4OSldO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9yZUdhbWVzUGFuZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIF9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfZ2FtZUxpc3Q6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgX29yaWdpblNjYWxlOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIF9nYW1lSXRlbXM6IEdhbWVJdGVtW10gPSBbXTtcclxuICAgIF9qdW1wTGlzdDogYW55ID0gbnVsbDtcclxuICAgIF9kYXRhRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBfY2xvc2VCdG5SaWdodDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBfY2xvc2VCdG5MaW5lOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBfc3RhcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pdGVtczogUUNyb3NzV2lkZ2V0SXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIGdhbWVJdGVtTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgX2xvY2F0aW9uOiBTdWJMb2NhdGlvbiA9IFN1YkxvY2F0aW9uLmlzTW9yZUdhbWU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmICh1dGlscy5vdGhlckNvbmZpZyAmJiB1dGlscy5vdGhlckNvbmZpZy5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSB1dGlscy5vdGhlckNvbmZpZy5ncm91cDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghUGxhdFV0aWxzLklzTmF0aXZlQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB1dGlscy5hZE1hbmFnZXIuSGlkZUJhbm5lcihCYW5uZXJMb2NhdGlvbi5Ib21lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUGFuZWxcIik7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUxpc3QgPSB0aGlzLl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZUl0ZW1Ob2RlID0gdGhpcy5fZ2FtZUxpc3QuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgdGhpcy5fZ2FtZUxpc3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IDwgY2Mud2luU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyDmqKrlsY/muLjmiI9cclxuICAgICAgICAgICAgcmF0aW8gPSBjYy53aW5TaXplLndpZHRoIC8gMTkyMCAqIDAuNTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpbyA9IGNjLndpblNpemUud2lkdGggLyAxMDgwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcGFuZWwuc2NhbGUgPSByYXRpbztcclxuICAgICAgICB0aGlzLl9vcmlnaW5TY2FsZSA9IHRoaXMuX3BhbmVsLnNjYWxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIF9pbml0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVMaXN0LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IHRvdGFsUm93ID0gTWF0aC5mbG9vcih0aGlzLl9qdW1wTGlzdC5sZW5ndGggLyAzKTtcclxuICAgICAgICBsZXQgdG90YWxDbG8gPSAzICogdG90YWxSb3c7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENsbzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB0aGlzLl9qdW1wTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sb2dvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdhbWVJdGVtTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcWNyb3NzV2lkZ2V0SXRlbTogUUNyb3NzV2lkZ2V0SXRlbSA9IHRlbXBOb2RlLmdldENvbXBvbmVudChcIlFDcm9zc1dpZGdldEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBxY3Jvc3NXaWRnZXRJdGVtLl9sb2NhdGlvbiA9IHRoaXMuX2xvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgcWNyb3NzV2lkZ2V0SXRlbS5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZUxpc3QuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YURpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlUGFuZWwoKSB7XHJcbiAgICAgICAgdXRpbHMucG9zdFJlY29tbWVudFNob3dEYXRhKHRoaXMuX2xvY2F0aW9uKTtcclxuICAgICAgICB0aGlzLl9pbml0V2lkZ2V0KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGp1bXBMaXN0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9qdW1wTGlzdCA9IGp1bXBMaXN0O1xyXG4gICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIHRoaXMuX3BhbmVsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4zLCBDb21wYXRpYmxlVG9vbC5wb3NpdGlvbigtdGhpcy5fcGFuZWwuZ2V0Q29udGVudFNpemUoKS53aWR0aCwgMCkpLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uT3V0KCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH0pKSk7XHJcbiAgICAgICAgLy8gaWYgKCFQbGF0VXRpbHMuSXNOYXRpdmVBbmRyb2lkKSB7XHJcbiAgICAgICAgLy8gICAgIHV0aWxzLmFkTWFuYWdlci5TaG93QmFubmVyKEJhbm5lckxvY2F0aW9uLkhvbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZUJ0bkhhbmRsZXIoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19