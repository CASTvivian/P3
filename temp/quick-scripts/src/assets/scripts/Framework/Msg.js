"use strict";
cc._RF.push(module, 'b942cZiiK1H/oXLv3KFwjp+', 'Msg');
// scripts/Framework/Msg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CocosZ_1 = require("./CocosZ");
var Msg = /** @class */ (function () {
    function Msg() {
    }
    Msg.Show = function (msg, group) {
        var pre = CocosZ_1.cocosz.resMgr.getRes("TipsPanel", cc.Prefab);
        if (pre) {
            var node_1 = cc.instantiate(pre);
            // if (group) node.group = group;
            node_1.group = 'ui';
            if (node_1) {
                node_1.position = cc.v3(cc.winSize.width / 2, cc.winSize.height / 2 + 300);
                cc.director.getScene().addChild(node_1, 10000);
                var label = cc.find("label", node_1).getComponent(cc.Label);
                label.string = msg;
                node_1.scale = 0;
                var tween = cc.tween(node_1);
                tween.to(0.25, { scale: 1 }, { easing: "backOut" });
                tween.delay(2);
                tween.to(0.25, { scale: 0 }, { easing: "backIn" });
                tween.call(function () { node_1.destroy(); });
                tween.start();
                for (var i = Msg.tipList.length - 1; i >= 0; i--) {
                    if (Msg.tipList[i].isValid) {
                        Msg.tipList[i].y += 120;
                    }
                    else {
                        Msg.tipList.splice(i, 1);
                    }
                }
                Msg.tipList.push(node_1);
            }
        }
        else {
            cc.log("提示面板显示失败!");
        }
    };
    Msg.isShow = false;
    Msg.isTouch = false;
    Msg.tipList = [];
    return Msg;
}());
exports.default = Msg;

cc._RF.pop();