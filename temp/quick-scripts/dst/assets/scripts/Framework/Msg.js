
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/Msg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxNc2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBa0M7QUFFbEM7SUFBQTtJQTJDQSxDQUFDO0lBbkNpQixRQUFJLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxLQUFjO1FBQzFDLElBQUksR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLE1BQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLGlDQUFpQztZQUNqQyxNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLE1BQUksRUFBRTtnQkFDTixNQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDekUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwRSxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFFbkIsTUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFJLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDcEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDZCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQVEsTUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFZCxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM5QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO3dCQUN4QixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7cUJBQzNCO3lCQUNJO3dCQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0o7Z0JBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBSSxDQUFDLENBQUM7YUFDMUI7U0FDSjthQUFNO1lBQ0gsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUF2Q2MsVUFBTSxHQUFZLEtBQUssQ0FBQztJQUV4QixXQUFPLEdBQVksS0FBSyxDQUFDO0lBRTFCLFdBQU8sR0FBbUIsRUFBRSxDQUFDO0lBcUMvQyxVQUFDO0NBM0NELEFBMkNDLElBQUE7a0JBM0NvQixHQUFHIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29jb3N6IH0gZnJvbSBcIi4vQ29jb3NaXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNc2cge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVG91Y2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHRpcExpc3Q6IEFycmF5PGNjLk5vZGU+ID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTaG93KG1zZzogc3RyaW5nLCBncm91cD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwcmUgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcIlRpcHNQYW5lbFwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGlmIChwcmUpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgICAgICAvLyBpZiAoZ3JvdXApIG5vZGUuZ3JvdXAgPSBncm91cDtcclxuICAgICAgICAgICAgbm9kZS5ncm91cCA9ICd1aSc7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjMoY2Mud2luU2l6ZS53aWR0aCAvIDIsIGNjLndpblNpemUuaGVpZ2h0IC8gMiArIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKG5vZGUsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgIGxldCBsYWJlbDogY2MuTGFiZWwgPSBjYy5maW5kKFwibGFiZWxcIiwgbm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IG1zZztcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0d2VlbiA9IGNjLnR3ZWVuKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdHdlZW4udG8oMC4yNSwgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJiYWNrT3V0XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0d2Vlbi5kZWxheSgyKVxyXG4gICAgICAgICAgICAgICAgdHdlZW4udG8oMC4yNSwgeyBzY2FsZTogMCB9LCB7IGVhc2luZzogXCJiYWNrSW5cIiB9KTtcclxuICAgICAgICAgICAgICAgIHR3ZWVuLmNhbGwoKCkgPT4geyBub2RlLmRlc3Ryb3koKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB0d2Vlbi5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBNc2cudGlwTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNc2cudGlwTGlzdFtpXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1zZy50aXBMaXN0W2ldLnkgKz0gMTIwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXNnLnRpcExpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIE1zZy50aXBMaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5sb2coXCLmj5DnpLrpnaLmnb/mmL7npLrlpLHotKUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=