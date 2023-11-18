
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Framework/FlyCoin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJhbWV3b3JrXFxGbHlDb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQWtDO0FBS2xDOztHQUVHO0FBQ0g7SUFBQTtJQStDQSxDQUFDO0lBNUNHOzs7OztPQUtHO0lBQ1csWUFBSSxHQUFsQixVQUFtQixRQUFnQixFQUFFLEdBQVksRUFBRSxLQUFjLEVBQUUsT0FBa0I7UUFDakYsSUFBSSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksWUFBVSxHQUFXLENBQUMsQ0FBQztvQ0FDbEIsQ0FBQztnQkFDTixJQUFNLElBQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7d0JBQ25CLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7NEJBQ3BCLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO3lCQUNuQjs2QkFBTTs0QkFDSCxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzt5QkFDakI7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsSUFBSSxLQUFLO3dCQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDZixFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzdDLElBQU0sQ0FBQyxHQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDcEYsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSCxZQUFVLEVBQUUsQ0FBQzt3QkFDYixJQUFJLFlBQVUsSUFBSSxFQUFFLEVBQUU7NEJBQ2xCLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQzt5QkFDeEI7d0JBQ0QsZUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNiOztZQTNCTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTt3QkFBbEIsQ0FBQzthQTRCVDtTQUNKO2FBQU07WUFDSCxFQUFFLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVOLGNBQUM7QUFBRCxDQS9DQSxBQStDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuL0NvY29zWlwiO1xyXG5pbXBvcnQgQ29uc3RhbnQgZnJvbSBcIi4vQ29uc3RhbnRcIjtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIOaUtuWPlumHkeW4geaViOaenFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx5Q29pbiB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeR5biB5pWI5p6c5bGV56S65pa55rOVXHJcbiAgICAgKiBAcGFyYW0gcG9zIOWdkOagh1xyXG4gICAgICogQHBhcmFtIGdyb3VwIOWIhue7hFxyXG4gICAgICogQHBhcmFtIGNhbGxGdW4g5omA5pyJ6YeR5biB6aOe5Yiw5ZCO5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU2hvdyhpY29uTmFtZTogc3RyaW5nLCBwb3M6IGNjLlZlYzMsIGdyb3VwPzogc3RyaW5nLCBjYWxsRnVuPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcHJlID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJGbHlJY29uXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgaWYgKHByZSkge1xyXG4gICAgICAgICAgICBsZXQgZmluc2hDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09IGljb25OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXApIG5vZGUuZ3JvdXAgPSBncm91cDtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjMoY2Mud2luU2l6ZS53aWR0aCAqIDAuNSwgY2Mud2luU2l6ZS5oZWlnaHQgKiAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQobm9kZSwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQ6IGNjLlR3ZWVuID0gY2MudHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5ieSgwLjIsIHsgeDogTWF0aC5yYW5kb20oKSAqIDQwMCAtIDIwMCwgeTogTWF0aC5yYW5kb20oKSAqIDQwMCAtIDIwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0LmRlbGF5KE1hdGgucmFuZG9tKCkgKiAwLjUgKyAwLjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQucGFyYWxsZWwoY2MudHdlZW4oKS50bygwLjMsIHsgcG9zaXRpb246IHBvcyB9KSwgY2MudHdlZW4oKS50bygwLjMsIHsgc2NhbGU6IDAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbnNoQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbnNoQ291bnQgPT0gMTQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxGdW4gJiYgY2FsbEZ1bigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5RWZmZWN0KGljb25OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiUHJlZmFiIEZseUNvaW4gaXMgbm90IGZvdW5kIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufVxyXG4iXX0=