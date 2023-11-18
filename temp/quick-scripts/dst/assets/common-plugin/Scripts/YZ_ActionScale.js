
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_ActionScale.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ecccKnp/lLRYK/tCxltDQL', 'YZ_ActionScale');
// common-plugin/Scripts/YZ_ActionScale.ts

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
var YZ_ActionScale = /** @class */ (function (_super) {
    __extends(YZ_ActionScale, _super);
    function YZ_ActionScale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRunAction = true;
        return _this;
    }
    YZ_ActionScale.prototype.onLoad = function () {
        if (this.isRunAction)
            this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1), cc.scaleTo(1, 0.5))));
    };
    YZ_ActionScale = __decorate([
        ccclass
    ], YZ_ActionScale);
    return YZ_ActionScale;
}(cc.Component));
exports.default = YZ_ActionScale;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfQWN0aW9uU2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFLQztRQUpHLGlCQUFXLEdBQVksSUFBSSxDQUFDOztJQUloQyxDQUFDO0lBSEcsK0JBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVc7WUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUpnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBS2xDO0lBQUQscUJBQUM7Q0FMRCxBQUtDLENBTDJDLEVBQUUsQ0FBQyxTQUFTLEdBS3ZEO2tCQUxvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZWl9BY3Rpb25TY2FsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBpc1J1bkFjdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5BY3Rpb24pIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDEsIDEpLCBjYy5zY2FsZVRvKDEsIDAuNSkpKSk7XHJcbiAgICB9XHJcbn1cclxuIl19