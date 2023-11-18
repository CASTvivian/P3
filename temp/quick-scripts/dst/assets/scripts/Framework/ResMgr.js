
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/ResMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '16b2fTucYZJHKNGhllUA2TP', 'ResMgr');
// scripts/Framework/ResMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CocosZ_1 = require("./CocosZ");
var ResMgr = /** @class */ (function () {
    function ResMgr() {
        this._prefabDic = {};
        this._imgDic = {};
        this._atlasDic = {};
        this._audioDic = {};
        this._jsonDic = {};
    }
    Object.defineProperty(ResMgr, "inst", {
        get: function () {
            if (!ResMgr._inst) {
                ResMgr._inst = new ResMgr();
                ResMgr._inst._init();
            }
            return ResMgr._inst;
        },
        enumerable: false,
        configurable: true
    });
    ResMgr.prototype._init = function () {
        // 根据平台做对应设置
    };
    /**
    * 缓存cocosz的音效
    * @param res
    */
    ResMgr.prototype.cacheCocoszAudio = function () {
        for (var i = 0; i < CocosZ_1.cocosz.audioList.length; i++) {
            var res = CocosZ_1.cocosz.audioList[i];
            this._cacheRes(res, cc.AudioClip);
        }
        CocosZ_1.cocosz.audioList = null;
    };
    /**
     * 加载资源
     * @param path 资源路径
     * @param type 资源类型
     * @param complete 加载完成回调
     */
    ResMgr.prototype.loadRes = function (path, type, progress, complete) {
        var bundle = CocosZ_1.cocosz.getBundleWithPath(path);
        if (bundle) {
            bundle.load(path, type, function (completedCount, totalCount, item) {
                progress && progress(completedCount, totalCount, item);
            }, function (error, resource) {
                if (error) {
                    cc.log("加载资源", path, "失败");
                }
                complete && complete(error, resource);
            });
        }
    };
    /**
     * 加载资源数组并且添加到本地缓存
     * @param url 资源路径数组
     * @param type 资源类型
     * @param progress 加载进度回调
     * @param complete 加载完成回调
     */
    ResMgr.prototype.loadAndCacheResArray = function (urls, type, progress, complete) {
        for (var i = 0; i < urls.length; i++) {
            this.loadAndCacheRes(urls[i], type, progress, complete);
        }
    };
    /**
     * 加载资源并且添加到本地缓存
     * @param url 资源路径
     * @param type 资源类型
     * @param progress 加载进度回调
     * @param complete 加载完成回调
     */
    ResMgr.prototype.loadAndCacheRes = function (url, type, progress, complete) {
        var _this = this;
        var path = url.path ? url.path : url;
        var bundle = CocosZ_1.cocosz.getBundleWithPath(path);
        if (bundle) {
            bundle.load(path, type, function (completedCount, totalCount, item) {
                progress && progress(completedCount, totalCount, item);
            }, function (error, resource) {
                if (error) {
                    cc.log("加载缓存资源", path, "失败");
                }
                else {
                    _this._cacheRes(resource, type);
                }
                complete && complete(error, resource);
            });
        }
    };
    ResMgr.prototype._cacheRes = function (res, type) {
        if (type == cc.Prefab) {
            this._cachPrefab(res);
        }
        else if (type == cc.SpriteFrame) {
            this._cachTexture(res);
        }
        else if (type == cc.SpriteAtlas) {
            this._cachSpriteAtlas(res);
        }
        else if (type == cc.AudioClip) {
            this._cachAudioClip(res);
        }
        else if (type == cc.JsonAsset) {
            this._cachJsonAsset(res);
        }
    };
    ResMgr.prototype._cachPrefab = function (res) {
        if (res) {
            res.addRef();
            this._prefabDic[res.name] = res;
        }
    };
    ResMgr.prototype._cachTexture = function (res) {
        if (res) {
            res.addRef();
            this._imgDic[res.name] = res;
        }
    };
    ResMgr.prototype._cachSpriteAtlas = function (res) {
        if (res) {
            res.addRef();
            this._atlasDic[res.name] = res;
            var spframes = res.getSpriteFrames();
            for (var i = 0; i < spframes.length; i++) {
                this._cachTexture(spframes[i]);
            }
        }
    };
    ResMgr.prototype._cachAudioClip = function (res) {
        if (res) {
            res.addRef();
            this._audioDic[res.name] = res;
        }
    };
    ResMgr.prototype._cachJsonAsset = function (res) {
        if (res) {
            res.addRef();
            this._jsonDic[res.name] = res;
        }
    };
    /**
     * 获取本地缓存资源
     * @param name 资源名称
     * @param type 类型
     */
    ResMgr.prototype.getRes = function (name, type) {
        switch (type) {
            case cc.Prefab: {
                return this._check(name, this._prefabDic[name]);
            }
            case cc.SpriteFrame: {
                return this._check(name, this._imgDic[name]);
            }
            case cc.AudioClip: {
                return this._check(name, this._audioDic[name]);
            }
            case cc.JsonAsset: {
                return this._check(name, this._jsonDic[name]);
            }
            default: {
                cc.log("资源类型不存在：" + type);
                return null;
            }
        }
    };
    ResMgr.prototype._check = function (name, res) {
        if (res && res.isValid) {
            return res;
        }
        else {
            cc.log("资源不存在：" + name);
            return null;
        }
    };
    /**
     * 释放一组资源
     * @param urlList 资源路径数组
     * @param type 资源类型
     */
    ResMgr.prototype.releaseResArray = function (urlList, type) {
        var _this = this;
        urlList.forEach(function (url) {
            var name = url.path.split("/").pop();
            if (name) {
                _this.releaseSingleRes(name, type);
            }
        });
    };
    /**
     * 释放单个资源
     * @param res 单个资源
     */
    ResMgr.prototype.releaseSingleRes = function (name, type) {
        switch (type) {
            case cc.Prefab: {
                if (this._prefabDic[name] && cc.isValid(this._prefabDic[name])) {
                    this._prefabDic[name].decRef();
                    cc.assetManager.releaseAsset(this._prefabDic[name]);
                    this._prefabDic[name] = null;
                    // cc.log(`释放Prefab资源 ${name} 成功！`);
                }
                break;
            }
            case cc.SpriteFrame: {
                if (this._imgDic[name] && cc.isValid(this._imgDic[name])) {
                    this._imgDic[name].decRef();
                    cc.assetManager.releaseAsset(this._imgDic[name]);
                    this._imgDic[name] = null;
                    // cc.log(`释放SpriteFrame资源 ${name} 成功！`);
                }
                break;
            }
            case cc.SpriteAtlas: {
                if (this._atlasDic[name] && cc.isValid(this._atlasDic[name])) {
                    this._atlasDic[name].decRef();
                    cc.assetManager.releaseAsset(this._atlasDic[name]);
                    this._atlasDic[name] = null;
                    // cc.log(`释放SpriteFrame资源 ${name} 成功！`);
                }
                break;
            }
            case cc.AudioClip: {
                if (this._audioDic[name] && cc.isValid(this._audioDic[name])) {
                    this._audioDic[name].decRef();
                    cc.assetManager.releaseAsset(this._audioDic[name]);
                    this._audioDic[name] = null;
                    // cc.log(`释放AudioClip资源 ${name} 成功！`);
                }
                break;
            }
            case cc.JsonAsset: {
                if (this._jsonDic[name] && cc.isValid(this._jsonDic[name])) {
                    this._jsonDic[name].decRef();
                    cc.assetManager.releaseAsset(this._jsonDic[name]);
                    this._jsonDic[name] = null;
                    // cc.log(`释放JsonAsset资源 ${name} 成功！`);
                }
                break;
            }
            default: {
                cc.log("释放资源的类型出错");
            }
        }
    };
    return ResMgr;
}());
exports.default = ResMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxSZXNNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBa0M7QUFFbEM7SUFBQTtRQVdZLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFDckIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFRLEVBQUUsQ0FBQztJQThPL0IsQ0FBQztJQTFQRyxzQkFBa0IsY0FBSTthQUF0QjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QjtZQUNELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVVPLHNCQUFLLEdBQWI7UUFDSSxZQUFZO0lBQ2hCLENBQUM7SUFFRDs7O01BR0U7SUFDSyxpQ0FBZ0IsR0FBdkI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckM7UUFDRCxlQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSx3QkFBTyxHQUFkLFVBQWUsSUFBWSxFQUFFLElBQXFCLEVBQUUsUUFBa0IsRUFBRSxRQUFrQjtRQUN0RixJQUFJLE1BQU0sR0FBRyxlQUFNLENBQUMs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Q0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUM1Qix1Q0FBdUM7aUJBQzFDO2dCQUNELE1BQU07YUFDVDtZQUNELEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDN0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDM0IsdUNBQXVDO2lCQUMxQztnQkFDRCxNQUFNO2FBQ1Q7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDTCxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0o7SUFDTCxDQUFDO0lBRUwsYUFBQztBQUFELENBN1BBLEFBNlBDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4vQ29jb3NaXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNNZ3Ige1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0OiBSZXNNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0KCk6IFJlc01nciB7XHJcbiAgICAgICAgaWYgKCFSZXNNZ3IuX2luc3QpIHtcclxuICAgICAgICAgICAgUmVzTWdyLl9pbnN0ID0gbmV3IFJlc01ncigpO1xyXG4gICAgICAgICAgICBSZXNNZ3IuX2luc3QuX2luaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlc01nci5faW5zdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wcmVmYWJEaWM6IGFueSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfaW1nRGljOiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgX2F0bGFzRGljOiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgX2F1ZGlvRGljOiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgX2pzb25EaWM6IGFueSA9IHt9O1xyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdCgpIHtcclxuICAgICAgICAvLyDmoLnmja7lubPlj7DlgZrlr7nlupTorr7nva5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog57yT5a2YY29jb3N655qE6Z+z5pWIXHJcbiAgICAqIEBwYXJhbSByZXMgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNhY2hlQ29jb3N6QXVkaW8oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2Nvc3ouYXVkaW9MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGNvY29zei5hdWRpb0xpc3RbaV07XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlUmVzKHJlcywgY2MuQXVkaW9DbGlwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29jb3N6LmF1ZGlvTGlzdCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3otYTmupBcclxuICAgICAqIEBwYXJhbSBwYXRoIOi1hOa6kOi3r+W+hFxyXG4gICAgICogQHBhcmFtIHR5cGUg6LWE5rqQ57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGUg5Yqg6L295a6M5oiQ5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkUmVzKHBhdGg6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBwcm9ncmVzczogRnVuY3Rpb24sIGNvbXBsZXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBidW5kbGUgPSBjb2Nvc3ouZ2V0QnVuZGxlV2l0aFBhdGgocGF0aCk7XHJcbiAgICAgICAgaWYgKGJ1bmRsZSkge1xyXG4gICAgICAgICAgICBidW5kbGUubG9hZChwYXRoLCB0eXBlLCAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzICYmIHByb2dyZXNzKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKTtcclxuICAgICAgICAgICAgfSwgKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5Yqg6L296LWE5rqQXCIsIHBhdGgsIFwi5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29tcGxldGUgJiYgY29tcGxldGUoZXJyb3IsIHJlc291cmNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L296LWE5rqQ5pWw57uE5bm25LiU5re75Yqg5Yiw5pys5Zyw57yT5a2YXHJcbiAgICAgKiBAcGFyYW0gdXJsIOi1hOa6kOi3r+W+hOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHR5cGUg6LWE5rqQ57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gcHJvZ3Jlc3Mg5Yqg6L296L+b5bqm5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGUg5Yqg6L295a6M5oiQ5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQW5kQ2FjaGVSZXNBcnJheSh1cmxzOiBhbnlbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBwcm9ncmVzczogRnVuY3Rpb24sIGNvbXBsZXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRBbmRDYWNoZVJlcyh1cmxzW2ldLCB0eXBlLCBwcm9ncmVzcywgY29tcGxldGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vei1hOa6kOW5tuS4lOa3u+WKoOWIsOacrOWcsOe8k+WtmFxyXG4gICAgICogQHBhcmFtIHVybCDotYTmupDot6/lvoRcclxuICAgICAqIEBwYXJhbSB0eXBlIOi1hOa6kOexu+Wei1xyXG4gICAgICogQHBhcmFtIHByb2dyZXNzIOWKoOi9vei/m+W6puWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIOWKoOi9veWujOaIkOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFuZENhY2hlUmVzKHVybDogYW55LCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIHByb2dyZXNzOiBGdW5jdGlvbiwgY29tcGxldGU6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB1cmwucGF0aCA/IHVybC5wYXRoIDogdXJsO1xyXG4gICAgICAgIGxldCBidW5kbGUgPSBjb2Nvc3ouZ2V0QnVuZGxlV2l0aFBhdGgocGF0aCk7XHJcbiAgICAgICAgaWYgKGJ1bmRsZSkge1xyXG4gICAgICAgICAgICBidW5kbGUubG9hZChwYXRoLCB0eXBlLCAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzICYmIHByb2dyZXNzKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKTtcclxuICAgICAgICAgICAgfSwgKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5Yqg6L2957yT5a2Y6LWE5rqQXCIsIHBhdGgsIFwi5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVJlcyhyZXNvdXJjZSwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZShlcnJvciwgcmVzb3VyY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaGVSZXMocmVzOiBhbnksIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCkge1xyXG4gICAgICAgIGlmICh0eXBlID09IGNjLlByZWZhYikge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoUHJlZmFiKHJlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGNjLlNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hUZXh0dXJlKHJlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGNjLlNwcml0ZUF0bGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hTcHJpdGVBdGxhcyhyZXMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBjYy5BdWRpb0NsaXApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaEF1ZGlvQ2xpcChyZXMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBjYy5Kc29uQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaEpzb25Bc3NldChyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jYWNoUHJlZmFiKHJlczogY2MuUHJlZmFiKSB7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICByZXMuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZWZhYkRpY1tyZXMubmFtZV0gPSByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhY2hUZXh0dXJlKHJlczogY2MuU3ByaXRlRnJhbWUpIHtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIHJlcy5hZGRSZWYoKTtcclxuICAgICAgICAgICAgdGhpcy5faW1nRGljW3Jlcy5uYW1lXSA9IHJlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaFNwcml0ZUF0bGFzKHJlczogY2MuU3ByaXRlQXRsYXMpIHtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIHJlcy5hZGRSZWYoKTtcclxuICAgICAgICAgICAgdGhpcy5fYXRsYXNEaWNbcmVzLm5hbWVdID0gcmVzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNwZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gcmVzLmdldFNwcml0ZUZyYW1lcygpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwZnJhbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoVGV4dHVyZShzcGZyYW1lc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaEF1ZGlvQ2xpcChyZXM6IGNjLkF1ZGlvQ2xpcCkge1xyXG4gICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgcmVzLmFkZFJlZigpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdWRpb0RpY1tyZXMubmFtZV0gPSByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhY2hKc29uQXNzZXQocmVzOiBjYy5Kc29uQXNzZXQpIHtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIHJlcy5hZGRSZWYoKTtcclxuICAgICAgICAgICAgdGhpcy5fanNvbkRpY1tyZXMubmFtZV0gPSByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pys5Zyw57yT5a2Y6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gbmFtZSDotYTmupDlkI3np7BcclxuICAgICAqIEBwYXJhbSB0eXBlIOexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVzKG5hbWU6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuUHJlZmFiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2sobmFtZSwgdGhpcy5fcHJlZmFiRGljW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLlNwcml0ZUZyYW1lOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2sobmFtZSwgdGhpcy5faW1nRGljW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLkF1ZGlvQ2xpcDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrKG5hbWUsIHRoaXMuX2F1ZGlvRGljW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLkpzb25Bc3NldDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrKG5hbWUsIHRoaXMuX2pzb25EaWNbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIui1hOa6kOexu+Wei+S4jeWtmOWcqO+8mlwiICsgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jaGVjayhuYW1lOiBzdHJpbmcsIHJlczogYW55KSB7XHJcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIui1hOa6kOS4jeWtmOWcqO+8mlwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph4rmlL7kuIDnu4TotYTmupBcclxuICAgICAqIEBwYXJhbSB1cmxMaXN0IOi1hOa6kOi3r+W+hOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHR5cGUg6LWE5rqQ57G75Z6LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxlYXNlUmVzQXJyYXkodXJsTGlzdDogYW55W10sIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCkge1xyXG4gICAgICAgIHVybExpc3QuZm9yRWFjaCh1cmwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHVybC5wYXRoLnNwbGl0KFwiL1wiKS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVNpbmdsZVJlcyhuYW1lLCB0eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeK5pS+5Y2V5Liq6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gcmVzIOWNleS4qui1hOa6kFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsZWFzZVNpbmdsZVJlcyhuYW1lOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLlByZWZhYjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ByZWZhYkRpY1tuYW1lXSAmJiBjYy5pc1ZhbGlkKHRoaXMuX3ByZWZhYkRpY1tuYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmVmYWJEaWNbbmFtZV0uZGVjUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0aGlzLl9wcmVmYWJEaWNbbmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZWZhYkRpY1tuYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKGDph4rmlL5QcmVmYWLotYTmupAgJHtuYW1lfSDmiJDlip/vvIFgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgY2MuU3ByaXRlRnJhbWU6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbWdEaWNbbmFtZV0gJiYgY2MuaXNWYWxpZCh0aGlzLl9pbWdEaWNbbmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW1nRGljW25hbWVdLmRlY1JlZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQodGhpcy5faW1nRGljW25hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbWdEaWNbbmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhg6YeK5pS+U3ByaXRlRnJhbWXotYTmupAgJHtuYW1lfSDmiJDlip/vvIFgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgY2MuU3ByaXRlQXRsYXM6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hdGxhc0RpY1tuYW1lXSAmJiBjYy5pc1ZhbGlkKHRoaXMuX2F0bGFzRGljW25hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0bGFzRGljW25hbWVdLmRlY1JlZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQodGhpcy5fYXRsYXNEaWNbbmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0bGFzRGljW25hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coYOmHiuaUvlNwcml0ZUZyYW1l6LWE5rqQICR7bmFtZX0g5oiQ5Yqf77yBYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLkF1ZGlvQ2xpcDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F1ZGlvRGljW25hbWVdICYmIGNjLmlzVmFsaWQodGhpcy5fYXVkaW9EaWNbbmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXVkaW9EaWNbbmFtZV0uZGVjUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0aGlzLl9hdWRpb0RpY1tuYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXVkaW9EaWNbbmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhg6YeK5pS+QXVkaW9DbGlw6LWE5rqQICR7bmFtZX0g5oiQ5Yqf77yBYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLkpzb25Bc3NldDoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pzb25EaWNbbmFtZV0gJiYgY2MuaXNWYWxpZCh0aGlzLl9qc29uRGljW25hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pzb25EaWNbbmFtZV0uZGVjUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0aGlzLl9qc29uRGljW25hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qc29uRGljW25hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coYOmHiuaUvkpzb25Bc3NldOi1hOa6kCAke25hbWV9IOaIkOWKn++8gWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6YeK5pS+6LWE5rqQ55qE57G75Z6L5Ye66ZSZXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=