
import { cocosz } from "./CocosZ";

export default class ResMgr {

    private static _inst: ResMgr;
    public static get inst(): ResMgr {
        if (!ResMgr._inst) {
            ResMgr._inst = new ResMgr();
            ResMgr._inst._init();
        }
        return ResMgr._inst;
    }

    private _prefabDic: any = {};
    private _imgDic: any = {};
    private _atlasDic: any = {};
    private _audioDic: any = {};
    private _jsonDic: any = {};



    private _init() {
        // 根据平台做对应设置
    }

    /**
    * 缓存cocosz的音效
    * @param res 
    */
    public cacheCocoszAudio() {
        for (let i = 0; i < cocosz.audioList.length; i++) {
            const res = cocosz.audioList[i];
            this._cacheRes(res, cc.AudioClip);
        }
        cocosz.audioList = null;
    }

    /**
     * 加载资源
     * @param path 资源路径
     * @param type 资源类型
     * @param complete 加载完成回调
     */
    public loadRes(path: string, type: typeof cc.Asset, progress: Function, complete: Function) {
        let bundle = cocosz.getBundleWithPath(path);
        if (bundle) {
            bundle.load(path, type, (completedCount: number, totalCount: number, item: any) => {
                progress && progress(completedCount, totalCount, item);
            }, (error: Error, resource: any) => {
                if (error) {
                    cc.log("加载资源", path, "失败");
                }
                complete && complete(error, resource);
            });
        }
    }

    /**
     * 加载资源数组并且添加到本地缓存
     * @param url 资源路径数组
     * @param type 资源类型
     * @param progress 加载进度回调
     * @param complete 加载完成回调
     */
    public loadAndCacheResArray(urls: any[], type: typeof cc.Asset, progress: Function, complete: Function) {
        for (let i = 0; i < urls.length; i++) {
            this.loadAndCacheRes(urls[i], type, progress, complete);
        }
    }

    /**
     * 加载资源并且添加到本地缓存
     * @param url 资源路径
     * @param type 资源类型
     * @param progress 加载进度回调
     * @param complete 加载完成回调
     */
    public loadAndCacheRes(url: any, type: typeof cc.Asset, progress: Function, complete: Function) {
        let path = url.path ? url.path : url;
        let bundle = cocosz.getBundleWithPath(path);
        if (bundle) {
            bundle.load(path, type, (completedCount: number, totalCount: number, item: any) => {
                progress && progress(completedCount, totalCount, item);
            }, (error: Error, resource: any) => {
                if (error) {
                    cc.log("加载缓存资源", path, "失败");
                } else {
                    this._cacheRes(resource, type);
                }
                complete && complete(error, resource);
            });
        }
    }

    private _cacheRes(res: any, type: typeof cc.Asset) {
        if (type == cc.Prefab) {
            this._cachPrefab(res);
        } else if (type == cc.SpriteFrame) {
            this._cachTexture(res);
        } else if (type == cc.SpriteAtlas) {
            this._cachSpriteAtlas(res);
        } else if (type == cc.AudioClip) {
            this._cachAudioClip(res);
        } else if (type == cc.JsonAsset) {
            this._cachJsonAsset(res);
        }
    }

    private _cachPrefab(res: cc.Prefab) {
        if (res) {
            res.addRef();
            this._prefabDic[res.name] = res;
        }
    }

    private _cachTexture(res: cc.SpriteFrame) {
        if (res) {
            res.addRef();
            this._imgDic[res.name] = res;
        }
    }

    private _cachSpriteAtlas(res: cc.SpriteAtlas) {
        if (res) {
            res.addRef();
            this._atlasDic[res.name] = res;

            let spframes: cc.SpriteFrame[] = res.getSpriteFrames();
            for (let i = 0; i < spframes.length; i++) {
                this._cachTexture(spframes[i]);
            }
        }
    }

    private _cachAudioClip(res: cc.AudioClip) {
        if (res) {
            res.addRef();
            this._audioDic[res.name] = res;
        }
    }

    private _cachJsonAsset(res: cc.JsonAsset) {
        if (res) {
            res.addRef();
            this._jsonDic[res.name] = res;
        }
    }

    /**
     * 获取本地缓存资源
     * @param name 资源名称
     * @param type 类型
     */
    public getRes(name: string, type: typeof cc.Asset) {
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
    }

    private _check(name: string, res: any) {
        if (res && res.isValid) {
            return res;
        } else {
            cc.log("资源不存在：" + name);
            return null;
        }
    }


    /**
     * 释放一组资源
     * @param urlList 资源路径数组
     * @param type 资源类型
     */
    public releaseResArray(urlList: any[], type: typeof cc.Asset) {
        urlList.forEach(url => {
            let name = url.path.split("/").pop();
            if (name) {
                this.releaseSingleRes(name, type);
            }
        });
    }

    /**
     * 释放单个资源
     * @param res 单个资源
     */
    public releaseSingleRes(name: string, type: typeof cc.Asset) {
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
    }

}
