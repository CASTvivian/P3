import PlatUtils from "./PlatUtils";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_NativeAdObject {

    _nativeObj: any = null;

    _nativeAdData: any = null;

    is_reportClick: boolean = false;

    is_reportShow: boolean = false;

    get data() {
        return this._nativeAdData
    }

    set data(_data: any) {
        this._nativeAdData = _data;
    }



    /**
     * 上报原生广告展示
     */
    reportAdShow() {

        if (this._nativeAdData && !this.is_reportShow) {
            this.is_reportShow = true;
            utils.showLog("上报原生广告展示! adId:", this._nativeAdData.adId);
            if (this._nativeObj) {
                this._nativeObj.reportAdShow({
                    adId: this._nativeAdData.adId
                });
            }
        }
    }

    /**
     * 上报原生广告点击 
     * @param type 1:banner,2:结算广告
     */
    reportAdClick(type: number = 2) {
        this.is_reportClick = true;
        if (this._nativeAdData) {
            utils.showLog("上报原生广告点击! adId:", this._nativeAdData.adId);
            if (this._nativeObj) {
                this._nativeObj.reportAdClick({
                    adId: this._nativeAdData.adId
                });
                if (type == 2) {
                    if (PlatUtils.IsOPPO) {
                        utils.oppoTool.countNativeInserClick();
                    } else if (PlatUtils.IsVIVO) {
                        utils.Tool_Vivo.countNativeInserClick();
                    }
                }
            }
        }
    }
}
