
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/CompatibleTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcQ29tcGF0aWJsZVRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUE0QyxrQ0FBWTtJQUF4RDs7SUFpRUEsQ0FBQztJQTVERyxzQkFBVywrQkFBYTthQUF4QjtZQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN4RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hDLE9BQU8sUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbkcsQ0FBQzs7O09BQUE7SUFHRDs7Ozs7T0FLRztJQUNJLHVCQUFRLEdBQWYsVUFBZ0IsQ0FBQyxFQUFFLENBQUM7UUFFaEIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLEdBQUcsRUFBRTtZQUMzQixZQUFZO1lBQ1osT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QjtRQUVELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztNQUtFO0lBQ0ssc0JBQU8sR0FBZCxVQUFlLFNBQWlCLEVBQUUsUUFBa0I7UUFDaEQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLEdBQUcsRUFBRTtZQUMzQixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFO2dCQUNsRCxZQUFZO2dCQUNaLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEUsWUFBWTtnQkFDWixFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2pFLFlBQVk7Z0JBQ1osRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3BFO2lCQUNJO2dCQUNELFlBQVk7Z0JBQ1osRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7YUFBTTtZQUNILElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUU7Z0JBQ2xELFlBQVk7Z0JBQ1osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDM0QsWUFBWTtnQkFDWixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRCxZQUFZO2dCQUNaLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDN0Q7aUJBQ0k7Z0JBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0o7SUFDTCxDQUFDO0lBNURNLDZCQUFjLEdBQVcsQ0FBQyxDQUFDO0lBSGpCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpRWxDO0lBQUQscUJBQUM7Q0FqRUQsQUFpRUMsQ0FqRTJDLEVBQUUsQ0FBQyxTQUFTLEdBaUV2RDtrQkFqRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICog5YW85a655bel5YW357G7XG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wYXRpYmxlVG9vbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIHN0YXRpYyBfZW5naW5lVmVyc2lvbjogbnVtYmVyID0gMDtcblxuICAgIHN0YXRpYyBnZXQgZW5naW5lVmVyc2lvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fZW5naW5lVmVyc2lvbiA+IDApIHJldHVybiB0aGlzLl9lbmdpbmVWZXJzaW9uO1xuICAgICAgICBsZXQgdmVyc2lvbiA9IGNjLkVOR0lORV9WRVJTSU9OO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoKHZlcnNpb24uc3Vic3RyKHZlcnNpb24uaW5kZXhPZihcIi5cIikgLSAxLCB2ZXJzaW9uLmxlbmd0aCkpLnNwbGl0KFwiLlwiKS5qb2luKFwiXCIpKVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Z2Q5qCH5o6l5Y+jXG4gICAgICogMi405Lul5LiK6L+U5ZuedjPvvIzlkKbliJnov5Tlm552MlxuICAgICAqIEBwYXJhbSB4IFxuICAgICAqIEBwYXJhbSB5IFxuICAgICAqL1xuICAgIHN0YXRpYyBwb3NpdGlvbih4LCB5KTogYW55IHtcblxuICAgICAgICBpZiAodGhpcy5lbmdpbmVWZXJzaW9uID49IDI0MCkge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICByZXR1cm4gY2MudjMoeCwgeSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDlnZDmoIfmjqXlj6NcbiAgICAqIDIuNOS7peS4iui/lOWbnnYz77yM5ZCm5YiZ6L+U5ZuedjJcbiAgICAqIEBwYXJhbSB4IFxuICAgICogQHBhcmFtIHkgXG4gICAgKi9cbiAgICBzdGF0aWMgTG9hZFJlcyhyZW1vdGVVcmw6IHN0cmluZywgY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmVuZ2luZVZlcnNpb24gPj0gMjQwKSB7XG4gICAgICAgICAgICBsZXQgc3RyID0gcmVtb3RlVXJsLnN1YnN0cihyZW1vdGVVcmwubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgICAgIGlmIChzdHIgIT0gXCIuanBnXCIgJiYgc3RyICE9IFwiLnBuZ1wiICYmIHN0ciAhPSBcIi5qcGVnXCIpIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShyZW1vdGVVcmwsIHsgZXh0OiBcIi5qcGVnXCIgfSwgY2FsbEJhY2spO1xuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHJlbW90ZVVybCwgeyBleHQ6IFwiLmpwZ1wiIH0sIGNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShyZW1vdGVVcmwsIHsgZXh0OiBcIi5wbmdcIiB9LCBjYWxsQmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShyZW1vdGVVcmwsIGNhbGxCYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdHIgPSByZW1vdGVVcmwuc3Vic3RyKHJlbW90ZVVybC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICAgICAgaWYgKHN0ciAhPSBcIi5qcGdcIiAmJiBzdHIgIT0gXCIucG5nXCIgJiYgc3RyICE9IFwiLmpwZWdcIikge1xuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHsgdXJsOiByZW1vdGVVcmwsIHR5cGU6IFwianBlZ1wiIH0sIGNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7IHVybDogcmVtb3RlVXJsLCB0eXBlOiBcImpwZ1wiIH0sIGNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7IHVybDogcmVtb3RlVXJsLCB0eXBlOiBcInBuZ1wiIH0sIGNhbGxCYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHJlbW90ZVVybCwgY2FsbEJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=