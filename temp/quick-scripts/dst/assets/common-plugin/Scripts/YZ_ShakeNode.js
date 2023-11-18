
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/YZ_ShakeNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e2425kaMhpN4aU6KcM8BiLX', 'YZ_ShakeNode');
// common-plugin/Scripts/YZ_ShakeNode.ts

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
var YZ_ShakeNode = /** @class */ (function (_super) {
    __extends(YZ_ShakeNode, _super);
    function YZ_ShakeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YZ_ShakeNode.prototype.start = function () {
        this.schedule(this.shake, 3);
    };
    YZ_ShakeNode.prototype.shake = function () {
        var duration = 0.03;
        var action = cc.repeat(cc.sequence(cc.rotateTo(duration, 5), cc.rotateTo(duration, 0), cc.rotateTo(duration, -5), cc.rotateTo(duration, 0)), 5);
        this.node.runAction(action);
    };
    YZ_ShakeNode = __decorate([
        ccclass
    ], YZ_ShakeNode);
    return YZ_ShakeNode;
}(cc.Component));
exports.default = YZ_ShakeNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcWVpfU2hha2VOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREOztJQWFBLENBQUM7SUFYRyw0QkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBRUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQVpnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBYWhDO0lBQUQsbUJBQUM7Q0FiRCxBQWFDLENBYnlDLEVBQUUsQ0FBQyxTQUFTLEdBYXJEO2tCQWJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlaX1NoYWtlTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCBcclxue1xyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaGFrZSwgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hha2UoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IDAuMDM7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnJlcGVhdChjYy5zZXF1ZW5jZShjYy5yb3RhdGVUbyhkdXJhdGlvbiwgNSksIGNjLnJvdGF0ZVRvKGR1cmF0aW9uLDApICxjYy5yb3RhdGVUbyhkdXJhdGlvbiwtNSksIGNjLnJvdGF0ZVRvKGR1cmF0aW9uLDApKSw1KTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuIl19