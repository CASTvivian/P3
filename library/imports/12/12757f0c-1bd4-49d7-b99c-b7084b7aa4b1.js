"use strict";
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