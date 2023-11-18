import { utils } from "../../common-plugin/Scripts/Utils";
import { cocosz } from "./CocosZ";
import UIMgr from "./UIMgr";


export default class UIPage {

    protected _page: cc.Node = null;
    protected _pageName: string = "";
    /** 页面状态 */
    protected _isOpen: boolean = false;
    /** 记录页面插屏次数 */
    public static interstitialCount: { [name: string]: number } = {};

    constructor(pageName: string) {
        let prefab: cc.Prefab = cocosz.resMgr.getRes(pageName, cc.Prefab);
        if (prefab) {
            let node: cc.Node = cc.instantiate(prefab);
            if (node) {
                this._page = node;
                this._pageName = pageName;
                node.active = false;
                node.position = cc.Vec3.ZERO;
                this._isOpen = false;
                this.getUIRoot().addChild(node);
                node.group = 'ui';
            }
        } else {
            cocosz.resMgr.loadAndCacheRes("UI/" + pageName, cc.Prefab, null, (err: Error, res: any) => {
                if (res) {
                    let node: cc.Node = cc.instantiate(res);
                    if (node) {
                        this._page = node;
                        this._pageName = pageName;
                        node.active = false;
                        node.position = cc.Vec3.ZERO;
                        this._isOpen = false;
                        this.getUIRoot().addChild(node);
                        node.group = 'ui';
                        this.onLoad();
                        this.open();
                    }
                } else {
                    cc.error(`Prefab ${pageName} is not found!`);
                }
            })
        }
    }

    public open() {
        if (this.isValid()) {
            if (!this._isOpen) {
                // 恢复开关
                UIMgr.canOpen = true;
                // 打开界面
                this._isOpen = true;
                this._page.active = true;
                this.onOpen();
                // 插屏
                let serverValue = cocosz.getConfigByKey("isInterstitial_" + this._pageName);
                if (serverValue) {
                    // 每次都弹
                    if (serverValue === "true") {
                        cocosz.isShowAd && utils.adManager.ShowInterstitial();
                    }
                    // 几次弹一次
                    else if ((Number.isInteger(serverValue) && serverValue > 0)) {
                        if (!UIPage.interstitialCount[this._pageName]) { UIPage.interstitialCount[this._pageName] = 0; }
                        if (++UIPage.interstitialCount[this._pageName] % serverValue === 0) {
                            cocosz.isShowAd && utils.adManager.ShowInterstitial();
                        }
                    }
                }
            }
        } else {
            cc.log("Page is not found!");
        }
    }

    public close() {
        if (this._isOpen) {
            this._isOpen = false;
            this.onClose();
        }
        if (this.isValid()) {
            this._page.active = false;
            this.destroy();
        }
        // 资源销毁
        if ("UILoadingPage" === this._pageName) {
            cocosz.resMgr.releaseSingleRes(this._pageName, cc.Prefab);
        }
    }

    public destroy() {
        if (this._isOpen) {
            this._isOpen = false;
        }
        this.onDestroy();
        // 销毁界面
        if (this.isValid()) {
            this._page.destroy();
        }
    }

    protected getUIRoot() {
        return cc.find("Canvas");
    }

    public isValid() {
        return this._page && cc.isValid(this._page);
    }

    public isOpen(): boolean {
        return this.isValid() && this._isOpen;
    }

    /**
     * 子类扩展：页面初始化时调用，注意不是引擎周期函数,此时引擎周期函数还没有调用
     */
    protected onLoad() {
    }
    /**
     * 子类扩展：页面展示时调用
     */
    protected onOpen() { }
    /**
     * 子类扩展：页面关闭时调用
     */
    protected onClose() { }
    /**
     * 子类扩展：页面销毁时调用
     */
    protected onDestroy() { }


    // private _playShowAnimation(){
    //     let animations: cc.Animation[] = this._page.getComponentsInChildren(cc.Animation);
    //     if(animations){
    //         for(let i=0;i<animations.length;i++){
    //             let anim: cc.Animation = animations[i];
    //             let clip: cc.AnimationClip = anim.defaultClip;
    //             clip.wrapMode = cc.WrapMode.Normal;
    //             anim.play(clip.name);
    //         }
    //     }
    // }

    // private _playHideAnimation(){
    //     let animations: cc.Animation[] = this._page.getComponentsInChildren(cc.Animation);
    //     if(animations){
    //         for(let i=0;i<animations.length;i++){
    //             let anim: cc.Animation = animations[i];
    //             let clip: cc.AnimationClip = anim.defaultClip;
    //             clip.wrapMode = cc.WrapMode.Reverse;
    //             anim.play(clip.name);
    //         }
    //     }
    // }
}
