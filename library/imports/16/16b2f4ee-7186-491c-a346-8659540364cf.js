"use strict";
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