
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/GameCtr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '127578MG9RJ17mctwhLeqSx', 'GameCtr');
// scripts/Framework/GameCtr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("./Constant");
var CocosZ_1 = require("./CocosZ");
var gameMgr_1 = require("../Game/gameMgr");
/**
 * 游戏控制类
 * 实现游戏的基础逻辑
 */
var GameCtr = /** @class */ (function () {
    function GameCtr() {
        this.curUseSkinId = -1; // 使用皮肤id
        this.loadProgress = 0; // 总加载进度
        this._loadMapPro = 0; // 地图加载进度
        this._totalCount = 0; // 资源总数
        this._compCount = 0; // 资源完成数量
        this._pathBack = "";
        this._prefabBack = null;
    }
    //游戏初始化
    GameCtr.prototype.init = function () {
        this.loadProgress = 0;
        this._loadMapPro = 0;
        this._totalCount = 0;
        this._compCount = 0;
        this.loadRes();
    };
    GameCtr.prototype.updateLoadRes = function () {
        this.loadProgress = (this._loadMapPro + this._compCount / this._totalCount) / 2;
        // 开启地图加载
        if (this._compCount >= this._totalCount && this._loadMapPro == 0) {
            this._loadMapPro = 0.01;
            this.loadMap();
        }
        cc.game.emit(Constant_1.default.E_GAME_LOGIC, { type: Constant_1.default.E_UPDATE_PROGRESS, data: this.loadProgress });
    };
    GameCtr.prototype.loadRes = function () {
        var _this = this;
        // 游戏音效
        var mess1 = [];
        // 地下城音效
        var mess2 = [];
        // 地下城技能预制体
        var mess3 = [];
        // 游戏音效
        CocosZ_1.cocosz.getDirWithPath("audio_game", cc.AudioClip, mess1);
        CocosZ_1.cocosz.resMgr.loadAndCacheResArray(mess1, cc.AudioClip, null, function () {
            _this._compCount++;
            _this.updateLoadRes();
        });
        // 地下城
        if (6 == CocosZ_1.cocosz.gameMode) {
            // 音效
            CocosZ_1.cocosz.getDirWithPath("audio_zombie", cc.AudioClip, mess2);
            CocosZ_1.cocosz.resMgr.loadAndCacheResArray(mess2, cc.AudioClip, null, function () {
                _this._compCount++;
                _this.updateLoadRes();
            });
            // 预制体
            CocosZ_1.cocosz.getDirWithPath("prefab_zombie_skill", cc.Prefab, mess3);
            CocosZ_1.cocosz.resMgr.loadAndCacheResArray(mess3, cc.Prefab, null, function () {
                _this._compCount++;
                _this.updateLoadRes();
            });
        }
        // 资源总数
        this._totalCount = mess1.length + mess2.length + mess3.length;
    };
    GameCtr.prototype.loadMap = function () {
        var _this = this;
        var path = "maps/mapzombie";
        // 释放地图资源
        if (this._pathBack != path && this._prefabBack && this._prefabBack.isValid) {
            cc.assetManager.releaseAsset(this._prefabBack);
        }
        // 加载地图
        CocosZ_1.cocosz.resMgr.loadRes(path, cc.Prefab, (function (cur, total) {
            if (cur / total > _this._loadMapPro) {
                _this._loadMapPro = cur / total;
            }
            if (_this._loadMapPro > 0.99)
                _this._loadMapPro = 0.99;
            _this.updateLoadRes();
        }), (function (err, res) {
            if (err) {
                console.log(err);
                CocosZ_1.cocosz.sceneMgr.loadScene("Home", (function () {
                    CocosZ_1.cocosz.uiMgr.openPage(Constant_1.PageName.UIHomePage);
                }));
            }
            else {
                _this._pathBack = path;
                _this._prefabBack = res;
                gameMgr_1.gameMgr.map = cc.instantiate(res);
                gameMgr_1.gameMgr.initPos();
                gameMgr_1.gameMgr.mapSize = gameMgr_1.gameMgr.map.getContentSize();
                gameMgr_1.gameMgr.node.addChild(gameMgr_1.gameMgr.map, -5);
                _this._loadMapPro = 1;
                _this.updateLoadRes();
            }
        }));
    };
    return GameCtr;
}());
exports.default = GameCtr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxHYW1lQ3RyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNFO0FBQ3RFLG1DQUFrQztBQUNsQywyQ0FBMEM7QUFHMUM7OztHQUdHO0FBRUg7SUFBQTtRQUVXLGlCQUFZLEdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxTQUFTO1FBRW5DLGlCQUFZLEdBQVcsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUNoQyxnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFBLFNBQVM7UUFDakMsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQy9CLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQSxTQUFTO1FBRWhDLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBYyxJQUFJLENBQUM7SUFzRjFDLENBQUM7SUFwRkcsT0FBTztJQUNBLHNCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELCtCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEYsU0FBUztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFP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LEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsZUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQy9CLGVBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDUDtpQkFDSTtnQkFDRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZCLGlCQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLGlCQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2xCLGlCQUFPLENBQUMsT0FBTyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMvQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0lBQ0wsY0FBQztBQUFELENBaEdBLEFBZ0dDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3RhbnQsIHsgR2FtZVN0YXRlLCBQYWdlTmFtZSwgUGFuZWxOYW1lIH0gZnJvbSBcIi4vQ29uc3RhbnRcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4vQ29jb3NaXCI7XHJcbmltcG9ydCB7IGdhbWVNZ3IgfSBmcm9tIFwiLi4vR2FtZS9nYW1lTWdyXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+aOp+WItuexu1xyXG4gKiDlrp7njrDmuLjmiI/nmoTln7rnoYDpgLvovpFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ3RyIHtcclxuXHJcbiAgICBwdWJsaWMgY3VyVXNlU2tpbklkOiBudW1iZXIgPSAtMTsvLyDkvb/nlKjnmq7ogqRpZFxyXG5cclxuICAgIHB1YmxpYyBsb2FkUHJvZ3Jlc3M6IG51bWJlciA9IDA7Ly8g5oC75Yqg6L296L+b5bqmXHJcbiAgICBwcml2YXRlIF9sb2FkTWFwUHJvOiBudW1iZXIgPSAwOy8vIOWcsOWbvuWKoOi9vei/m+W6plxyXG4gICAgcHJpdmF0ZSBfdG90YWxDb3VudDogbnVtYmVyID0gMDsvLyDotYTmupDmgLvmlbBcclxuICAgIHByaXZhdGUgX2NvbXBDb3VudDogbnVtYmVyID0gMDsvLyDotYTmupDlrozmiJDmlbDph49cclxuXHJcbiAgICBwcml2YXRlIF9wYXRoQmFjazogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3ByZWZhYkJhY2s6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/muLjmiI/liJ3lp4vljJZcclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMubG9hZFByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLl9sb2FkTWFwUHJvID0gMDtcclxuICAgICAgICB0aGlzLl90b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9jb21wQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMubG9hZFJlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUxvYWRSZXMoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkUHJvZ3Jlc3MgPSAodGhpcy5fbG9hZE1hcFBybyArIHRoaXMuX2NvbXBDb3VudCAvIHRoaXMuX3RvdGFsQ291bnQpIC8gMjtcclxuICAgICAgICAvLyDlvIDlkK/lnLDlm77liqDovb1cclxuICAgICAgICBpZiAodGhpcy5fY29tcENvdW50ID49IHRoaXMuX3RvdGFsQ291bnQgJiYgdGhpcy5fbG9hZE1hcFBybyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRNYXBQcm8gPSAwLjAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNYXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KENvbnN0YW50LkVfR0FNRV9MT0dJQywgeyB0eXBlOiBDb25zdGFudC5FX1VQREFURV9QUk9HUkVTUywgZGF0YTogdGhpcy5sb2FkUHJvZ3Jlc3MgfSlcclxuICAgIH1cclxuXHJcbiAgICBsb2FkUmVzKCkge1xyXG4gICAgICAgIC8vIOa4uOaIj+mfs+aViFxyXG4gICAgICAgIGxldCBtZXNzMTogYW55ID0gW107XHJcbiAgICAgICAgLy8g5Zyw5LiL5Z+O6Z+z5pWIXHJcbiAgICAgICAgbGV0IG1lc3MyOiBhbnkgPSBbXTtcclxuICAgICAgICAvLyDlnLDkuIvln47mioDog73pooTliLbkvZNcclxuICAgICAgICBsZXQgbWVzczM6IGFueSA9IFtdO1xyXG5cclxuICAgICAgICAvLyDmuLjmiI/pn7PmlYhcclxuICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJhdWRpb19nYW1lXCIsIGNjLkF1ZGlvQ2xpcCwgbWVzczEpO1xyXG4gICAgICAgIGNvY29zei5yZXNNZ3IubG9hZEFuZENhY2hlUmVzQXJyYXkobWVzczEsIGNjLkF1ZGlvQ2xpcCwgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wQ291bnQrKztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb2FkUmVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5Zyw5LiL5Z+OXHJcbiAgICAgICAgaWYgKDYgPT0gY29jb3N6LmdhbWVNb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIOmfs+aViFxyXG4gICAgICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJhdWRpb196b21iaWVcIiwgY2MuQXVkaW9DbGlwLCBtZXNzMik7XHJcbiAgICAgICAgICAgIGNvY29zei5yZXNNZ3IubG9hZEFuZENhY2hlUmVzQXJyYXkobWVzczIsIGNjLkF1ZGlvQ2xpcCwgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxvYWRSZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIOmihOWItuS9k1xyXG4gICAgICAgICAgICBjb2Nvc3ouZ2V0RGlyV2l0aFBhdGgoXCJwcmVmYWJfem9tYmllX3NraWxsXCIsIGNjLlByZWZhYiwgbWVzczMpO1xyXG4gICAgICAgICAgICBjb2Nvc3oucmVzTWdyLmxvYWRBbmRDYWNoZVJlc0FycmF5KG1lc3MzLCBjYy5QcmVmYWIsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMb2FkUmVzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOi1hOa6kOaAu+aVsFxyXG4gICAgICAgIHRoaXMuX3RvdGFsQ291bnQgPSBtZXNzMS5sZW5ndGggKyBtZXNzMi5sZW5ndGggKyBtZXNzMy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE1hcCgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IFwibWFwcy9tYXB6b21iaWVcIjtcclxuICAgICAgICAvLyDph4rmlL7lnLDlm77otYTmupBcclxuICAgICAgICBpZiAodGhpcy5fcGF0aEJhY2sgIT0gcGF0aCAmJiB0aGlzLl9wcmVmYWJCYWNrICYmIHRoaXMuX3ByZWZhYkJhY2suaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KHRoaXMuX3ByZWZhYkJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWKoOi9veWcsOWbvlxyXG4gICAgICAgIGNvY29zei5yZXNNZ3IubG9hZFJlcyhwYXRoLCBjYy5QcmVmYWIsICgoY3VyLCB0b3RhbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VyIC8gdG90YWwgPiB0aGlzLl9sb2FkTWFwUHJvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkTWFwUHJvID0gY3VyIC8gdG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRNYXBQcm8gPiAwLjk5KSB0aGlzLl9sb2FkTWFwUHJvID0gMC45OTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb2FkUmVzKCk7XHJcbiAgICAgICAgfSksICgoZXJyLCByZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LnNjZW5lTWdyLmxvYWRTY2VuZShcIkhvbWVcIiwgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2Nvc3oudWlNZ3Iub3BlblBhZ2UoUGFnZU5hbWUuVUlIb21lUGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoQmFjayA9IHBhdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVmYWJCYWNrID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1nci5tYXAgPSBjYy5pbnN0YW50aWF0ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1nci5pbml0UG9zKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lTWdyLm1hcFNpemUgPSBnYW1lTWdyLm1hcC5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1nci5ub2RlLmFkZENoaWxkKGdhbWVNZ3IubWFwLCAtNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkTWFwUHJvID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTG9hZFJlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICB9XHJcbn1cclxuIl19