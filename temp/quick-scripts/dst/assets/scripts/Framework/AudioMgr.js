
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/AudioMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxBdWRpb01nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1DQUFrQztBQUVsQztJQUFBO1FBVVksZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QixrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDbkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQThDbEMsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQXVDM0IsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO0lBMkVwQyxDQUFDO0lBektHLHNCQUFrQixnQkFBSTthQUF0QjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNqQixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7YUFDbkM7WUFDRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyw2QkFBTzthQUdsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBTEQsVUFBbUIsS0FBYztZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDZCQUFPO2FBQWxCO1lBQ0ksT0FBTyxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNsQyxDQUFDO2FBQ0QsVUFBbUIsS0FBYztZQUM3QixlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFL0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9B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aUJBU0M7UUFUdUIsdUJBQUEsRUFBQSxVQUFrQjtRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixVQUFVLENBQUM7WUFDUCxJQUFJLGVBQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO2dCQUN0QixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNJLDJCQUFRLEdBQWY7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSw0QkFBUyxHQUFoQjtRQUNJLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9DLFFBQVE7SUFDWixDQUFDO0lBRU0sMEJBQU8sR0FBZDtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLHdCQUFLLEdBQWIsVUFBYyxJQUFrQixFQUFFLElBQWEsRUFBRSxNQUFjO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTCxlQUFDO0FBQUQsQ0E1S0EsQUE0S0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0VXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi1wbHVnaW4vU2NyaXB0cy9QbGF0VXRpbHNcIjtcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4vQ29jb3NaXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb01nciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3Q6IEF1ZGlvTWdyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdCgpOiBBdWRpb01nciB7XHJcbiAgICAgICAgaWYgKCFBdWRpb01nci5faW5zdCkge1xyXG4gICAgICAgICAgICBBdWRpb01nci5faW5zdCA9IG5ldyBBdWRpb01ncigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXVkaW9NZ3IuX2luc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VyTXVzaWNJZDogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9jdXJNdXNpY0NsaXA6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF92aWRlb09uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc2V0IHZpZGVvT24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl92aWRlb09uID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZpZGVvT24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZGVvT247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBBdWRpb09uKCkge1xyXG4gICAgICAgIHJldHVybiBjb2Nvc3ouZGF0YU1nci5BdWRpb09uO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBBdWRpb09uKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgY29jb3N6LmRhdGFNZ3IuQXVkaW9PbiA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1ck11c2ljQ2xpcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyTXVzaWNJZCA9IHRoaXMuX3BsYXkodGhpcy5fY3VyTXVzaWNDbGlwLCB0cnVlLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhdWRpb0xpc3Q6IEFycmF5PGNjLkF1ZGlvQ2xpcD4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAgICogQHBhcmFtIGlkICBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlCZ20obG9vcDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuQXVkaW9PbikgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzdHIgPSBcImJnbV91aVwiO1xyXG4gICAgICAgIGlmIChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgPT0gXCJIb21lXCIpIHtcclxuICAgICAgICAgICAgc3RyID0gXCJiZ21fdWlcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSA9PSBcIkdhbWVcIikge1xyXG4gICAgICAgICAgICBzdHIgPSBcImJnbV82XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXNfYmdtID0gY29jb3N6LnJlc01nci5nZXRSZXMoc3RyLCBjYy5BdWRpb0NsaXApO1xyXG4gICAgICAgIGlmIChyZXNfYmdtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbCgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHJlc19iZ20sIHRydWUpOyB9LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2d1aWRlQXVkaW9JZDogbnVtYmVyID0gLTE7XHJcbiAgICAvKiog5pKt5pS+5paw5omL6Z+z5pWIICovXHJcbiAgICBwdWJsaWMgcGxheUd1aWRlQXVkaW8obmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2d1aWRlQXVkaW9JZCAhPSAtMSkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKHRoaXMuX2d1aWRlQXVkaW9JZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2d1aWRlQXVkaW9JZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ndWlkZUF1ZGlvSWQgPSBjb2Nvc3ouYXVkaW9NZ3IucGxheUVmZmVjdChuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvumfs+aViFxyXG4gICAgICogQHBhcmFtIHVybCDpn7PpopHot6/lvoRcclxuICAgICAqIEBwYXJhbSBsb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIHZvbHVtZSDpn7Pph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlFZmZlY3QodXJsOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgdm9sdW1lOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9PbiB8fCAhdGhpcy5BdWRpb09uKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbXVzaWMgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyh1cmwsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgaWYgKG11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9JZExpc3RbdXJsXSA9IGNjLmF1ZGlvRW5naW5lLnBsYXkobXVzaWMsIGxvb3AsIHZvbHVtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1ZGlvSWRMaXN0W3VybF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmkq3mlL7pn7PmlYhcclxuICAgICogQHBhcmFtIHVybCDpn7PpopHot6/lvoRcclxuICAgICogQHBhcmFtIGxvb3Ag5piv5ZCm5b6q546vXHJcbiAgICAqIEBwYXJhbSB2b2x1bWUg6Z+z6YePXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHBsYXlDbGlwKGNsaXA6IGNjLkF1ZGlvQ2xpcCwgbG9vcDogYm9vbGVhbiA9IGZhbHNlLCB2b2x1bWU6IG51bWJlciA9IDEpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlb09uIHx8ICF0aGlzLkF1ZGlvT24pIHJldHVybjtcclxuICAgICAgICBpZiAoY2xpcCAmJiBjbGlwLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0lkTGlzdFtjbGlwLm5hbWVdID0gY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBsb29wLCB2b2x1bWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdWRpb0lkTGlzdFtjbGlwLm5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdWRpb0lkTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgcHVibGljIHN0b3BFZmZlY3QodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5hdWRpb0lkTGlzdFt1cmxdID49IDApIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmF1ZGlvSWRMaXN0W3VybF0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvSWRMaXN0W3VybF0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tFZmZlY3QodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5hdWRpb0lkTGlzdFt1cmxdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oyJ6ZKu6Z+z5pWIICovXHJcbiAgICBwdWJsaWMgcGxheUJ0bkVmZmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJidG5cIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgxKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiDmkq3mlL7og5zliKnpn7PmlYhcclxuICAgKi9cclxuICAgIHB1YmxpYyBwbGF5RWZmZWN0V2lubmVyKHZvbHVtZTogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIHRoaXMuc3RvcEFsbCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29jb3N6LmdhbWVNb2RlICE9IDYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcIndpblwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcInpvbWJpZV93aW5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7lpLHotKXpn7PmlYhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlFZmZlY3RGYWlsZWQodm9sdW1lOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wQWxsKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb2Nvc3ouZ2FtZU1vZGUgIT0gNikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiZmFpbFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcInpvbWJpZV9mYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnOaJgOaciemfs+aViFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGF1c2VBbGwoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzdW1lQWxsKCkge1xyXG4gICAgICAgIC8vIHV0aWxzLmRlbGF5Q2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb09uKSBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGwoKTtcclxuICAgICAgICAvLyB9LCAwKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wQWxsKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvSWRMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGxheShjbGlwOiBjYy5BdWRpb0NsaXAsIGxvb3A6IGJvb2xlYW4sIHZvbHVtZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkF1ZGlvT24pIHJldHVybiAtMTtcclxuICAgICAgICByZXR1cm4gY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBsb29wLCB2b2x1bWUpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==