
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/SceneMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a162cN35T1OAIoKBFHGNLm8', 'SceneMgr');
// scripts/Framework/SceneMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameMgr_1 = require("../Game/gameMgr");
var setMap_1 = require("../Game/setMap");
var GuideLayer_1 = require("../UI/GuideLayer");
var CocosZ_1 = require("./CocosZ");
var SceneMgr = /** @class */ (function () {
    function SceneMgr() {
        this._activeScene = "";
        this._timeInterval = 0;
    }
    Object.defineProperty(SceneMgr, "inst", {
        get: function () {
            if (!SceneMgr._inst) {
                SceneMgr._inst = new SceneMgr();
            }
            return SceneMgr._inst;
        },
        enumerable: false,
        configurable: true
    });
    SceneMgr.prototype.loadScene = function (name, onLunch) {
        var _this = this;
        if (this._activeScene == name) {
            var curTime = (new Date()).getTime();
            if (curTime - this._timeInterval < 1000) {
                return;
            }
        }
        this._timeInterval = new Date().getTime();
        // 加载场景开始前
        this.loadBefore(name, function () {
            // 加载场景
            cc.director.loadScene(name, function () {
                _this._activeScene = name;
                onLunch();
                // 加载场景完成后
                _this.loadFinish(name);
            });
        });
    };
    /** 加载场景开始前 */
    SceneMgr.prototype.loadBefore = function (name, call) {
        // 显示加载动画
        if (GuideLayer_1.guideLayer && GuideLayer_1.guideLayer.isValid) {
            if (name == "Home") {
                GuideLayer_1.guideLayer.node.zIndex = cc.macro.MAX_ZINDEX;
                GuideLayer_1.guideLayer.hideFjAni();
                GuideLayer_1.guideLayer.showBgAni();
            }
            else if (name == "Game") {
                GuideLayer_1.guideLayer.node.zIndex = cc.macro.MAX_ZINDEX;
                if ([5, 7].includes(CocosZ_1.cocosz.gameMode)) {
                    // 夺旗模式
                    GuideLayer_1.guideLayer.hideFjAni();
                    GuideLayer_1.guideLayer.showBgAni();
                }
                else {
                    GuideLayer_1.guideLayer.hideBgAni();
                    GuideLayer_1.guideLayer.showFjAni();
                }
            }
        }
        // 跳转前释放
        if (name == "Home") {
            // 逐帧释放关卡节点
            if (gameMgr_1.gameMgr && gameMgr_1.gameMgr.map && gameMgr_1.gameMgr.map.isValid) {
                var mapTs_1 = gameMgr_1.gameMgr.map.getComponent(setMap_1.default);
                if (mapTs_1) {
                    setTimeout(function () { mapTs_1.release(call); }, 100);
                    return;
                }
            }
        }
        call && call();
    };
    /** 加载场景完成后 */
    SceneMgr.prototype.loadFinish = function (name) {
        if (name == "Home") {
            // 加载动画(zindex)
            if (GuideLayer_1.guideLayer && GuideLayer_1.guideLayer.isValid) {
                GuideLayer_1.guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
            }
            // 释放资源
            // this.releaseRes();
        }
        else if (name == "Game") {
            GuideLayer_1.guideLayer.node.zIndex = cc.macro.MIN_ZINDEX;
        }
        // 刷新背景音效
        CocosZ_1.cocosz.audioMgr.playBgm();
    };
    /** 释放游戏资源 */
    SceneMgr.prototype.releaseRes = function () {
        // 释放游戏音效
        var audio_game = [];
        CocosZ_1.cocosz.getDirWithPath("audio_game", cc.AudioClip, audio_game);
        CocosZ_1.cocosz.resMgr.releaseResArray(audio_game, cc.AudioClip);
        if (6 == CocosZ_1.cocosz.gameMode) {
            // 释放地下城音效
            var audio_zombie = [];
            CocosZ_1.cocosz.getDirWithPath("audio_zombie", cc.AudioClip, audio_zombie);
            CocosZ_1.cocosz.resMgr.releaseResArray(audio_zombie, cc.AudioClip);
            // 释放僵尸预制体
            var prefab_zombie = [];
            CocosZ_1.cocosz.getDirWithPath("prefab_zombie", cc.Prefab, prefab_zombie);
            CocosZ_1.cocosz.resMgr.releaseResArray(prefab_zombie, cc.Prefab);
            // 释放技能预制体
            var prefab_zombie_skill = [];
            CocosZ_1.cocosz.getDirWithPath("prefab_zombie_skill", cc.Prefab, prefab_zombie_skill);
            CocosZ_1.cocosz.resMgr.releaseResArray(prefab_zombie_skill, cc.Prefab);
            // 释放技能图片
            var tex_zombie = [];
            CocosZ_1.cocosz.getDirWithPath("tex_zombie", cc.SpriteFrame, tex_zombie);
            CocosZ_1.cocosz.resMgr.releaseResArray(tex_zombie, cc.SpriteFrame);
        }
    };
    return SceneMgr;
}());
exports.default = SceneMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxTY2VuZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyx5Q0FBb0M7QUFDcEMsK0NBQTBEO0FBQzFELG1DQUFrQztBQUVsQztJQUFBO1FBVVksaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUM7SUFtR3RDLENBQUM7SUEzR0csc0JBQWtCLGdCQUFJO2FBQXRCO1lBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUNuQztZQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUtNLDRCQUFTLEdBQWhCLFVBQWlCLElBQVksRUFBRSxPQUFpQjtRQUFoRCxpQkFrQkM7UUFqQkcsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUMzQixJQUFJLE9BQU8sR0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksRUFBRTtnQkFDckMsT0FBTzthQUNWO1NBQ0o7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsVUFBVTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE9BQU87WUFDUCxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQztnQkFDVixVQUFVO2dCQUNWLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7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QyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUQsVUFBVTtZQUNWLElBQUksYUFBYSxHQUFRLEVBQUUsQ0FBQztZQUM1QixlQUFNLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2pFLGVBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsVUFBVTtZQUNWLElBQUksbUJBQW1CLEdBQVEsRUFBRSxDQUFDO1lBQ2xDLGVBQU0sQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdFLGVBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxTQUFTO1lBQ1QsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO1lBQ3pCLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDaEUsZUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3RDtJQUNMLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0E5R0EsQUE4R0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVNZ3IgfSBmcm9tIFwiLi4vR2FtZS9nYW1lTWdyXCI7XHJcbmltcG9ydCBzZXRNYXAgZnJvbSBcIi4uL0dhbWUvc2V0TWFwXCI7XHJcbmltcG9ydCBHdWlkZUxheWVyLCB7IGd1aWRlTGF5ZXIgfSBmcm9tIFwiLi4vVUkvR3VpZGVMYXllclwiO1xyXG5pbXBvcnQgeyBjb2Nvc3ogfSBmcm9tIFwiLi9Db2Nvc1pcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWdyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdDogU2NlbmVNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0KCk6IFNjZW5lTWdyIHtcclxuICAgICAgICBpZiAoIVNjZW5lTWdyLl9pbnN0KSB7XHJcbiAgICAgICAgICAgIFNjZW5lTWdyLl9pbnN0ID0gbmV3IFNjZW5lTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTY2VuZU1nci5faW5zdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVTY2VuZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3RpbWVJbnRlcnZhbDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgbG9hZFNjZW5lKG5hbWU6IHN0cmluZywgb25MdW5jaDogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlU2NlbmUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgY3VyVGltZTogbnVtYmVyID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgaWYgKGN1clRpbWUgLSB0aGlzLl90aW1lSW50ZXJ2YWwgPCAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGltZUludGVydmFsID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy8g5Yqg6L295Zy65pmv5byA5aeL5YmNXHJcbiAgICAgICAgdGhpcy5sb2FkQmVmb3JlKG5hbWUsICgpID0+IHtcclxuICAgICAgICAgICAgLy8g5Yqg6L295Zy65pmvXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShuYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVTY2VuZSA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICBvbkx1bmNoKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDliqDovb3lnLrmma/lrozmiJDlkI5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEZpbmlzaChuYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWKoOi9veWcuuaZr+W8gOWni+WJjSAqL1xyXG4gICAgbG9hZEJlZm9yZShuYW1lOiBzdHJpbmcsIGNhbGw6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLy8g5pi+56S65Yqg6L295Yqo55S7XHJcbiAgICAgICAgaWYgKGd1aWRlTGF5ZXIgJiYgZ3VpZGVMYXllci5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwiSG9tZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBndWlkZUxheWVyLm5vZGUuekluZGV4ID0gY2MubWFjcm8uTUFYX1pJTkRFWDtcclxuICAgICAgICAgICAgICAgIGd1aWRlTGF5ZXIuaGlkZUZqQW5pKCk7XHJcbiAgICAgICAgICAgICAgICBndWlkZUxheWVyLnNob3dCZ0FuaSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJHYW1lXCIpIHtcclxuICAgICAgICAgICAgICAgIGd1aWRlTGF5ZXIubm9kZS56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYO1xyXG4gICAgICAgICAgICAgICAgaWYgKFs1LCA3XS5pbmNsdWRlcyhjb2Nvc3ouZ2FtZU1vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aS65peX5qih5byPXHJcbiAgICAgICAgICAgICAgICAgICAgZ3VpZGVMYXllci5oaWRlRmpBbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICBndWlkZUxheWVyLnNob3dCZ0FuaSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBndWlkZUxheWVyLmhpZGVCZ0FuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGd1aWRlTGF5ZXIuc2hvd0ZqQW5pKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6Lez6L2s5YmN6YeK5pS+XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJIb21lXCIpIHtcclxuICAgICAgICAgICAgLy8g6YCQ5bin6YeK5pS+5YWz5Y2h6IqC54K5XHJcbiAgICAgICAgICAgIGlmIChnYW1lTWdyICYmIGdhbWVNZ3IubWFwICYmIGdhbWVNZ3IubWFwLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXBUcyA9IGdhbWVNZ3IubWFwLmdldENvbXBvbmVudChzZXRNYXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcFRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcFRzLnJlbGVhc2UoY2FsbCkgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbCAmJiBjYWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWKoOi9veWcuuaZr+WujOaIkOWQjiAqL1xyXG4gICAgbG9hZEZpbmlzaChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAobmFtZSA9PSBcIkhvbWVcIikge1xyXG4gICAgICAgICAgICAvLyDliqDovb3liqjnlLsoemluZGV4KVxyXG4gICAgICAgICAgICBpZiAoZ3VpZGVMYXllciAmJiBndWlkZUxheWVyLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGd1aWRlTGF5ZXIubm9kZS56SW5kZXggPSBjYy5tYWNyby5NSU5fWklOREVYO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOmHiuaUvui1hOa6kFxyXG4gICAgICAgICAgICAvLyB0aGlzLnJlbGVhc2VSZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PSBcIkdhbWVcIikge1xyXG4gICAgICAgICAgICBndWlkZUxheWVyLm5vZGUuekluZGV4ID0gY2MubWFjcm8uTUlOX1pJTkRFWDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yi35paw6IOM5pmv6Z+z5pWIXHJcbiAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlCZ20oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6YeK5pS+5ri45oiP6LWE5rqQICovXHJcbiAgICByZWxlYXNlUmVzKCkge1xyXG4gICAgICAgIC8vIOmHiuaUvua4uOaIj+mfs+aViFxyXG4gICAgICAgIGxldCBhdWRpb19nYW1lOiBhbnkgPSBbXTtcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJhdWRpb19nYW1lXCIsIGNjLkF1ZGlvQ2xpcCwgYXVkaW9fZ2FtZSk7XHJcbiAgICAgICAgY29jb3N6LnJlc01nci5yZWxlYXNlUmVzQXJyYXkoYXVkaW9fZ2FtZSwgY2MuQXVkaW9DbGlwKTtcclxuXHJcbiAgICAgICAgaWYgKDYgPT0gY29jb3N6LmdhbWVNb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIOmHiuaUvuWcsOS4i+Wfjumfs+aViFxyXG4gICAgICAgICAgICBsZXQgYXVkaW9fem9tYmllOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgY29jb3N6LmdldERpcldpdGhQYXRoKFwiYXVkaW9fem9tYmllXCIsIGNjLkF1ZGlvQ2xpcCwgYXVkaW9fem9tYmllKTtcclxuICAgICAgICAgICAgY29jb3N6LnJlc01nci5yZWxlYXNlUmVzQXJyYXkoYXVkaW9fem9tYmllLCBjYy5BdWRpb0NsaXApO1xyXG4gICAgICAgICAgICAvLyDph4rmlL7lg7XlsLjpooTliLbkvZNcclxuICAgICAgICAgICAgbGV0IHByZWZhYl96b21iaWU6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJwcmVmYWJfem9tYmllXCIsIGNjLlByZWZhYiwgcHJlZmFiX3pvbWJpZSk7XHJcbiAgICAgICAgICAgIGNvY29zei5yZXNNZ3IucmVsZWFzZVJlc0FycmF5KHByZWZhYl96b21iaWUsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIC8vIOmHiuaUvuaKgOiDvemihOWItuS9k1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiX3pvbWJpZV9za2lsbDogYW55ID0gW107XHJcbiAgICAgICAgICAgIGNvY29zei5nZXREaXJXaXRoUGF0aChcInByZWZhYl96b21iaWVfc2tpbGxcIiwgY2MuUHJlZmFiLCBwcmVmYWJfem9tYmllX3NraWxsKTtcclxuICAgICAgICAgICAgY29jb3N6LnJlc01nci5yZWxlYXNlUmVzQXJyYXkocHJlZmFiX3pvbWJpZV9za2lsbCwgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgLy8g6YeK5pS+5oqA6IO95Zu+54mHXHJcbiAgICAgICAgICAgIGxldCB0ZXhfem9tYmllOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgY29jb3N6LmdldERpcldpdGhQYXRoKFwidGV4X3pvbWJpZVwiLCBjYy5TcHJpdGVGcmFtZSwgdGV4X3pvbWJpZSk7XHJcbiAgICAgICAgICAgIGNvY29zei5yZXNNZ3IucmVsZWFzZVJlc0FycmF5KHRleF96b21iaWUsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19