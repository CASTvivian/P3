
const { ccclass, property } = cc._decorator;

/**
 * 兼容工具类
 */
@ccclass
export default class CompatibleTool extends cc.Component {


    static _engineVersion: number = 0;

    static get engineVersion(): number {
        if (this._engineVersion > 0) return this._engineVersion;
        let version = cc.ENGINE_VERSION;
        return parseInt((version.substr(version.indexOf(".") - 1, version.length)).split(".").join(""))
    }


    /**
     * 坐标接口
     * 2.4以上返回v3，否则返回v2
     * @param x 
     * @param y 
     */
    static position(x, y): any {

        if (this.engineVersion >= 240) {
            //@ts-ignore
            return cc.v3(x, y);
        }

        return cc.v2(x, y);
    }

    /**
    * 坐标接口
    * 2.4以上返回v3，否则返回v2
    * @param x 
    * @param y 
    */
    static LoadRes(remoteUrl: string, callBack: Function) {
        if (this.engineVersion >= 240) {
            let str = remoteUrl.substr(remoteUrl.lastIndexOf("."));
            if (str != ".jpg" && str != ".png" && str != ".jpeg") {
                //@ts-ignore
                cc.assetManager.loadRemote(remoteUrl, { ext: ".jpeg" }, callBack);
                //@ts-ignore
                cc.assetManager.loadRemote(remoteUrl, { ext: ".jpg" }, callBack);
                //@ts-ignore
                cc.assetManager.loadRemote(remoteUrl, { ext: ".png" }, callBack);
            }
            else {
                //@ts-ignore
                cc.assetManager.loadRemote(remoteUrl, callBack);
            }
        } else {
            let str = remoteUrl.substr(remoteUrl.lastIndexOf("."));
            if (str != ".jpg" && str != ".png" && str != ".jpeg") {
                //@ts-ignore
                cc.loader.load({ url: remoteUrl, type: "jpeg" }, callBack);
                //@ts-ignore
                cc.loader.load({ url: remoteUrl, type: "jpg" }, callBack);
                //@ts-ignore
                cc.loader.load({ url: remoteUrl, type: "png" }, callBack);
            }
            else {
                cc.loader.load(remoteUrl, callBack);
            }
        }
    }
    // update (dt) {}
}
