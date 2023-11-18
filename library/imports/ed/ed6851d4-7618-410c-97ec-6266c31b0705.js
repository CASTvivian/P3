"use strict";
cc._RF.push(module, 'ed685HUdhhBDJfsYmbDGwcF', 'FlyCoin');
// scripts/Framework/FlyCoin.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CocosZ_1 = require("./CocosZ");
/**
 * 收取金币效果
 */
var FlyCoin = /** @class */ (function () {
    function FlyCoin() {
    }
    /**
     * 金币效果展示方法
     * @param pos 坐标
     * @param group 分组
     * @param callFun 所有金币飞到后回调
     */
    FlyCoin.Show = function (iconName, pos, group, callFun) {
        var pre = CocosZ_1.cocosz.resMgr.getRes("FlyIcon", cc.Prefab);
        if (pre) {
            var finshCount_1 = 0;
            var _loop_1 = function (i) {
                var node = cc.instantiate(pre);
                if (node) {
                    node.children.forEach(function (c) {
                        if (c.name == iconName) {
                            c.opacity = 255;
                        }
                        else {
                            c.opacity = 0;
                        }
                    });
                    if (group)
                        node.group = group;
                    node.position = cc.v3(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
                    node.scale = 2;
                    cc.director.getScene().addChild(node, 10000);
                    var t = cc.tween(node);
                    t.by(0.2, { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 });
                    t.delay(Math.random() * 0.5 + 0.2);
                    t.parallel(cc.tween().to(0.3, { position: pos }), cc.tween().to(0.3, { scale: 0 }));
                    t.call(function () {
                        finshCount_1++;
                        if (finshCount_1 == 14) {
                            callFun && callFun();
                        }
                        CocosZ_1.cocosz.audioMgr.playEffect(iconName);
                        node.destroy();
                    });
                    t.start();
                }
            };
            for (var i = 0; i < 15; i++) {
                _loop_1(i);
            }
        }
        else {
            cc.log("Prefab FlyCoin is not found!");
        }
    };
    ;
    return FlyCoin;
}());
exports.default = FlyCoin;

cc._RF.pop();