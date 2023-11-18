"use strict";
cc._RF.push(module, 'c616dE5RypCGJJPz/ZeBEZZ', 'CompatibleTool');
// common-plugin/Scripts/CompatibleTool.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 兼容工具类
 */
var CompatibleTool = /** @class */ (function (_super) {
    __extends(CompatibleTool, _super);
    function CompatibleTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CompatibleTool, "engineVersion", {
        get: function () {
            if (this._engineVersion > 0)
                return this._engineVersion;
            var version = cc.ENGINE_VERSION;
            return parseInt((version.substr(version.indexOf(".") - 1, version.length)).split(".").join(""));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 坐标接口
     * 2.4以上返回v3，否则返回v2
     * @param x
     * @param y
     */
    CompatibleTool.position = function (x, y) {
        if (this.engineVersion >= 240) {
            //@ts-ignore
            return cc.v3(x, y);
        }
        return cc.v2(x, y);
    };
    /**
    * 坐标接口
    * 2.4以上返回v3，否则返回v2
    * @param x
    * @param y
    */
    CompatibleTool.LoadRes = function (remoteUrl, callBack) {
        if (this.engineVersion >= 240) {
            var str = remoteUrl.substr(remoteUrl.lastIndexOf("."));
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
        }
        else {
            var str = remoteUrl.substr(remoteUrl.lastIndexOf("."));
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
    };
    CompatibleTool._engineVersion = 0;
    CompatibleTool = __decorate([
        ccclass
    ], CompatibleTool);
    return CompatibleTool;
}(cc.Component));
exports.default = CompatibleTool;

cc._RF.pop();