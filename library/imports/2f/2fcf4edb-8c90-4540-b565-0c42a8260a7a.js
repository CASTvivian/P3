"use strict";
cc._RF.push(module, '2fcf47bjJBFQLVlDEKoJgp6', 'AudioMgr');
// scripts/Framework/AudioMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CocosZ_1 = require("./CocosZ");
var AudioMgr = /** @class */ (function () {
    function AudioMgr() {
        this._curMusicId = -1;
        this._curMusicClip = null;
        this._videoOn = false;
        this._guideAudioId = -1;
        this.audioIdList = [];
    }
    Object.defineProperty(AudioMgr, "inst", {
        get: function () {
            if (!AudioMgr._inst) {
                AudioMgr._inst = new AudioMgr();
            }
            return AudioMgr._inst;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioMgr.prototype, "videoOn", {
        get: function () {
            return this._videoOn;
        },
        set: function (value) {
            this._videoOn = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioMgr.prototype, "AudioOn", {
        get: function () {
            return CocosZ_1.cocosz.dataMgr.AudioOn;
        },
        set: function (value) {
            CocosZ_1.cocosz.dataMgr.AudioOn = value;
            if (value) {
                if (this._curMusicClip) {
                    this._curMusicId = this._play(this._curMusicClip, true, 1);
                }
            }
            else {
                this.stopAll();
            }
        },
        enumerable: false,
        configurable: true
    });
    // audioList: Array<cc.AudioClip> = [];
    /**
     * 播放背景音乐
     * @param id
     */
    AudioMgr.prototype.playBgm = function (loop) {
        if (loop === void 0) { loop = true; }
        if (!this.AudioOn)
            return;
        var str = "bgm_ui";
        if (cc.director.getScene().name == "Home") {
            str = "bgm_ui";
        }
        else if (cc.director.getScene().name == "Game") {
            str = "bgm_6";
        }
        else {
            return;
        }
        var res_bgm = CocosZ_1.cocosz.resMgr.getRes(str, cc.AudioClip);
        if (res_bgm) {
            this.stopAll();
            setTimeout(function () { cc.audioEngine.playMusic(res_bgm, true); }, 0);
        }
    };
    /** 播放新手音效 */
    AudioMgr.prototype.playGuideAudio = function (name) {
        if (this._guideAudioId != -1) {
            cc.audioEngine.stop(this._guideAudioId);
            this._guideAudioId = -1;
        }
        this._guideAudioId = CocosZ_1.cocosz.audioMgr.playEffect(name);
    };
    /**
     * 播放音效
     * @param url 音频路径
     * @param loop 是否循环
     * @param volume 音量
     */
    AudioMgr.prototype.playEffect = function (url, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (this.videoOn || !this.AudioOn)
            return;
        var music = CocosZ_1.cocosz.resMgr.getRes(url, cc.AudioClip);
        if (music) {
            this.audioIdList[url] = cc.audioEngine.play(music, loop, volume);
            return this.audioIdList[url];
        }
    };
    /**
    * 播放音效
    * @param url 音频路径
    * @param loop 是否循环
    * @param volume 音量
    */
    AudioMgr.prototype.playClip = function (clip, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (this.videoOn || !this.AudioOn)
            return;
        if (clip && clip.isValid) {
            this.audioIdList[clip.name] = cc.audioEngine.play(clip, loop, volume);
            return this.audioIdList[clip.name];
        }
    };
    AudioMgr.prototype.stopEffect = function (url) {
        if (this.audioIdList[url] >= 0) {
            cc.audioEngine.stop(this.audioIdList[url]);
            this.audioIdList[url] = null;
        }
    };
    AudioMgr.prototype.checkEffect = function (url) {
        if (this.audioIdList[url]) {
            return true;
        }
        return false;
    };
    /**按钮音效 */
    AudioMgr.prototype.playBtnEffect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.playEffect("btn");
            setTimeout(function () {
                resolve(1);
            }, 200);
        });
    };
    /**
   * 播放胜利音效
   */
    AudioMgr.prototype.playEffectWinner = function (volume) {
        var _this = this;
        if (volume === void 0) { volume = 1; }
        this.stopAll();
        setTimeout(function () {
            if (CocosZ_1.cocosz.gameMode != 6) {
                _this.playEffect("win");
            }
            else {
                _this.playEffect("zombie_win");
            }
        });
    };
    /**
     * 播放失败音效
     */
    AudioMgr.prototype.playEffectFailed = function (volume) {
        var _this = this;
        if (volume === void 0) { volume = 1; }
        this.stopAll();
        setTimeout(function () {
            if (CocosZ_1.cocosz.gameMode != 6) {
                _this.playEffect("fail");
            }
            else {
                _this.playEffect("zombie_fail");
            }
        });
    };
    /**
     * 暂停所有音效
     */
    AudioMgr.prototype.pauseAll = function () {
        cc.audioEngine.pauseAll();
    };
    AudioMgr.prototype.resumeAll = function () {
        // utils.delayCall(() => {
        if (!this._videoOn)
            cc.audioEngine.resumeAll();
        // }, 0)
    };
    AudioMgr.prototype.stopAll = function () {
        cc.audioEngine.stopAll();
        this.audioIdList = [];
    };
    AudioMgr.prototype._play = function (clip, loop, volume) {
        if (!this.AudioOn)
            return -1;
        return cc.audioEngine.play(clip, loop, volume);
    };
    return AudioMgr;
}());
exports.default = AudioMgr;

cc._RF.pop();