import { BannerLocation, LevelStatus } from "./YZ_Constant";
import YZ_NativeItem from "./YZ_NativeItem";

const { ccclass, property } = cc._decorator;

@ccclass("AdAgent")
export default class AdAgent {

    public Init() { }
    public ShowBanner(location: any, args: any) { }
    public HideBanner(location: BannerLocation) { }
    public ShowInterstitial(location: BannerLocation) { }
    public ShowVideo(callback: Function) { }
    public showInteractiveAd(): void { }
    public ShowAppBox(isMoreGame?: boolean): void { }
    public HideAppBox(): void { }
    public showRewardInsert(): void { }
    public hideRewardInsert(): void { }
    public ShowCloseBtnBanner(location: BannerLocation, args: any) { }
    public ShowStatementRecomment(): any { }
    public getNativeAdData(args?: any): any { }
    public showStatementAds(data?: any): any { }
    public createNativeAd(params: any = null, yzItem?: YZ_NativeItem) { }
    public hideKyxBanner() { }
    public showNativeTryGameWidget(params: any = null) { }
    public hideNativeTryGameWidget() { }
    public showBlockAd(parme?: any) { }
    public hideBlockAd() { }
    public showFullScreenVideo(callback?: Function) { }
    public showNativeSplashView(callBack?: Function) { }
    public ShowSingleNativeAd(params?: any) { }
    public HideSingleNativeAd(params?: any) { }
    public showCustomAd(params?: any) { }
    public hideCustomAd(params?: any) { }
    public createCustomADBanner() { }
}
