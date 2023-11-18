"use strict";
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