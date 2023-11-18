
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/ListItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09c0c9GGz9I/KV6p6vh4QOI', 'ListItem');
// common-plugin/Scripts/ListItem.ts

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
/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/6/6
 * @doc 列表Item组件.
 * 说明：
 *      1、此组件须配合List组件使用。（配套的配套的..）
 * @end
 ******************************************/
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu, executionOrder = _a.executionOrder;
var SelectedType;
(function (SelectedType) {
    SelectedType[SelectedType["NONE"] = 0] = "NONE";
    SelectedType[SelectedType["TOGGLE"] = 1] = "TOGGLE";
    SelectedType[SelectedType["SWITCH"] = 2] = "SWITCH";
})(SelectedType || (SelectedType = {}));
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //图标
        _this.icon = null;
        //标题
        _this.title = null;
        //选择模式
        _this.selectedMode = SelectedType.NONE;
        //被选标志
        _this.selectedFlag = null;
        //被选择的SpriteFrame
        _this.selectedSpriteFrame = null;
        //未被选择的SpriteFrame
        _this._unselectedSpriteFrame = null;
        //自适应尺寸
        _this.adaptiveSize = false;
        //选择
        _this._selected = false;
        //是否已经注册过事件
        _this._eventReg = false;
        return _this;
    }
    Object.defineProperty(ListItem.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            if (!this.selectedFlag)
                return;
            switch (this.selectedMode) {
                case SelectedType.TOGGLE:
                    this.selectedFlag.active = val;
                    break;
                case SelectedType.SWITCH:
                    var sp = this.selectedFlag.getComponent(cc.Sprite);
                    if (sp)
                        sp.spriteFrame = val ? this.selectedSpriteFrame : this._unselectedSpriteFrame;
                    break;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "btnCom", {
        get: function () {
            if (!this._btnCom)
                this._btnCom = this.node.getComponent(cc.Button);
            return this._btnCom;
        },
        enumerable: false,
        configurable: true
    });
    ListItem.prototype.onLoad = function () {
        // //没有按钮组件的话，selectedFlag无效
        // if (!this.btnCom)
        //     this.selectedMode == SelectedType.NONE;
        //有选择模式时，保存相应的东西
        if (this.selectedMode == SelectedType.SWITCH) {
            var com = this.selectedFlag.getComponent(cc.Sprite);
            this._unselectedSpriteFrame = com.spriteFrame;
        }
    };
    ListItem.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
    };
    ListItem.prototype._registerEvent = function () {
        if (!this._eventReg) {
            if (this.btnCom && this.list.selectedMode > 0) {
                this.btnCom.clickEvents.unshift(this.createEvt(this, 'onClickThis'));
            }
            if (this.adaptiveSize) {
                this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
            }
            this._eventReg = true;
        }
    };
    ListItem.prototype._onSizeChange = function () {
        this.list._onItemAdaptive(this.node);
    };
    /**
     * 创建事件
     * @param {cc.Component} component 组件脚本
     * @param {string} handlerName 触发函数名称
     * @param {cc.Node} node 组件所在node（不传的情况下取component.node）
     * @returns cc.Component.EventHandler
     */
    ListItem.prototype.createEvt = function (component, handlerName, node) {
        if (node === void 0) { node = null; }
        if (!component.isValid)
            return; //有些异步加载的，节点以及销毁了。
        component['comName'] = component['comName'] || component.name.match(/\<(.*?)\>/g).pop().replace(/\<|>/g, '');
        var evt = new cc.Component.EventHandler();
        evt.target = node || component.node;
        evt.component = component['comName'];
        evt.handler = handlerName;
        return evt;
    };
    ListItem.prototype.showAni = function (aniType, callFunc, del) {
        var _this = this;
        var acts;
        switch (aniType) {
            case 0: //向上消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * 2),
                ];
                break;
            case 1: //向右消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * 2, 0),
                ];
                break;
            case 2: //向下消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * -2),
                ];
                break;
            case 3: //向左消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * -2, 0),
                ];
                break;
            default: //默认：缩小消失
                acts = [
                    cc.scaleTo(.3, .1),
                ];
                break;
        }
        if (callFunc || del) {
            acts.push(cc.callFunc(function () {
                if (del) {
                    _this.list._delSingleItem(_this.node);
                    for (var n = _this.list.displayData.length - 1; n >= 0; n--) {
                        if (_this.list.displayData[n].id == _this.listId) {
                            _this.list.displayData.splice(n, 1);
                            break;
                        }
                    }
                }
                callFunc();
            }));
        }
        this.node.runAction(cc.sequence(acts));
    };
    ListItem.prototype.onClickThis = function () {
        this.list.selectedId = this.listId;
    };
    __decorate([
        property({ type: cc.Sprite, tooltip: CC_DEV && '图标' })
    ], ListItem.prototype, "icon", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: CC_DEV && '标题' })
    ], ListItem.prototype, "title", void 0);
    __decorate([
        property({
            type: cc.Enum(SelectedType),
            tooltip: CC_DEV && '选择模式'
        })
    ], ListItem.prototype, "selectedMode", void 0);
    __decorate([
        property({
            type: cc.Node, tooltip: CC_DEV && '被选标志',
            visible: function () { return this.selectedMode > SelectedType.NONE; }
        })
    ], ListItem.prototype, "selectedFlag", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame, tooltip: CC_DEV && '被选择的SpriteFrame',
            visible: function () { return this.selectedMode == SelectedType.SWITCH; }
        })
    ], ListItem.prototype, "selectedSpriteFrame", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && '自适应尺寸（宽或高）',
        })
    ], ListItem.prototype, "adaptiveSize", void 0);
    ListItem = __decorate([
        ccclass,
        disallowMultiple(),
        menu('自定义组件/List Item'),
        executionOrder(-5001) //先于List
    ], ListItem);
    return ListItem;
}(cc.Component));
exports.default = ListItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcTGlzdEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7NENBTzRDO0FBQ3RDLElBQUEsS0FBZ0UsRUFBRSxDQUFDLFVBQVUsRUFBM0UsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsY0FBYyxvQkFBa0IsQ0FBQztBQUlwRixJQUFLLFlBSUo7QUFKRCxXQUFLLFlBQVk7SUFDYiwrQ0FBUSxDQUFBO0lBQ1IsbURBQVUsQ0FBQTtJQUNWLG1EQUFVLENBQUE7QUFDZCxDQUFDLEVBSkksWUFBWSxLQUFaLFlBQVksUUFJaEI7QUFNRDtJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXdLQztRQXZLRyxJQUFJO1FBRUosVUFBSSxHQUFjLElBQUksQ0FBQztRQUN2QixJQUFJO1FBRUosV0FBSyxHQUFZLElBQUksQ0FBQztRQUN0QixNQUFNO1FBS04sa0JBQVksR0FBaUIsWUFBWSxDQUFDLElBQUksQ0FBQztRQUMvQyxNQUFNO1FBS04sa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsaUJBQWlCO1FBS2pCLHlCQUFtQixHQUFtQixJQUFJLENBQUM7UUFDM0Msa0JBQWtCO1FBQ2xCLDRCQUFzQixHQUFtQixJQUFJLENBQUM7UUFDOUMsT0FBTztRQUlQLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLElBQUk7UUFDSixlQUFTLEdBQVksS0FBSyxDQUFDO1FBNEIzQixXQUFXO1FBQ0gsZUFBUyxHQUFHLEtBQUssQ0FBQzs7SUEwRzlCLENBQUM7SUF0SUcsc0JBQUksOEJBQVE7YUFlWjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBakJELFVBQWEsR0FBWTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUNy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QUN2QixjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBVSxRQUFRO09BQ25CLFFBQVEsQ0F3SzVCO0lBQUQsZUFBQztDQXhLRCxBQXdLQyxDQXhLcUMsRUFBRSxDQUFDLFNBQVMsR0F3S2pEO2tCQXhLb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEBhdXRob3Iga0wgPGtsazBAcXEuY29tPlxuICogQGRhdGUgMjAxOS82LzZcbiAqIEBkb2Mg5YiX6KGoSXRlbee7hOS7ti5cbiAqIOivtOaYju+8mlxuICogICAgICAx44CB5q2k57uE5Lu26aG76YWN5ZCITGlzdOe7hOS7tuS9v+eUqOOAgu+8iOmFjeWll+eahOmFjeWll+eahC4u77yJXG4gKiBAZW5kXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZGlzYWxsb3dNdWx0aXBsZSwgbWVudSwgZXhlY3V0aW9uT3JkZXIgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmltcG9ydCBMaXN0IGZyb20gJy4vTGlzdCc7XG5cbmVudW0gU2VsZWN0ZWRUeXBlIHtcbiAgICBOT05FID0gMCxcbiAgICBUT0dHTEUgPSAxLFxuICAgIFNXSVRDSCA9IDIsXG59XG5cbkBjY2NsYXNzXG5AZGlzYWxsb3dNdWx0aXBsZSgpXG5AbWVudSgn6Ieq5a6a5LmJ57uE5Lu2L0xpc3QgSXRlbScpXG5AZXhlY3V0aW9uT3JkZXIoLTUwMDEpICAgICAgICAgIC8v5YWI5LqOTGlzdFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIC8v5Zu+5qCHXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCB0b29sdGlwOiBDQ19ERVYgJiYgJ+WbvuaghycgfSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIC8v5qCH6aKYXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogQ0NfREVWICYmICfmoIfpopgnIH0pXG4gICAgdGl0bGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8v6YCJ5oup5qih5byPXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuRW51bShTZWxlY3RlZFR5cGUpLFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ+mAieaLqeaooeW8jydcbiAgICB9KVxuICAgIHNlbGVjdGVkTW9kZTogU2VsZWN0ZWRUeXBlID0gU2VsZWN0ZWRUeXBlLk5PTkU7XG4gICAgLy/ooqvpgInmoIflv5dcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBDQ19ERVYgJiYgJ+iiq+mAieagh+W/lycsXG4gICAgICAgIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnNlbGVjdGVkTW9kZSA+IFNlbGVjdGVkVHlwZS5OT05FIH1cbiAgICB9KVxuICAgIHNlbGVjdGVkRmxhZzogY2MuTm9kZSA9IG51bGw7XG4gICAgLy/ooqvpgInmi6nnmoRTcHJpdGVGcmFtZVxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCB0b29sdGlwOiBDQ19ERVYgJiYgJ+iiq+mAieaLqeeahFNwcml0ZUZyYW1lJyxcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNb2RlID09IFNlbGVjdGVkVHlwZS5TV0lUQ0ggfVxuICAgIH0pXG4gICAgc2VsZWN0ZWRTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIC8v5pyq6KKr6YCJ5oup55qEU3ByaXRlRnJhbWVcbiAgICBfdW5zZWxlY3RlZFNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgLy/oh6rpgILlupTlsLrlr7hcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ+iHqumAguW6lOWwuuWvuO+8iOWuveaIlumrmO+8iScsXG4gICAgfSlcbiAgICBhZGFwdGl2ZVNpemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+mAieaLqVxuICAgIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNldCBzZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWw7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZEZsYWcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3RlZE1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgU2VsZWN0ZWRUeXBlLlRPR0dMRTpcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRmxhZy5hY3RpdmUgPSB2YWw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNlbGVjdGVkVHlwZS5TV0lUQ0g6XG4gICAgICAgICAgICAgICAgbGV0IHNwOiBjYy5TcHJpdGUgPSB0aGlzLnNlbGVjdGVkRmxhZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3ApXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gdmFsID8gdGhpcy5zZWxlY3RlZFNwcml0ZUZyYW1lIDogdGhpcy5fdW5zZWxlY3RlZFNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cbiAgICAvL+aMiemSrue7hOS7tlxuICAgIHByaXZhdGUgX2J0bkNvbTogYW55O1xuICAgIGdldCBidG5Db20oKSB7XG4gICAgICAgIGlmICghdGhpcy5fYnRuQ29tKVxuICAgICAgICAgICAgdGhpcy5fYnRuQ29tID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICByZXR1cm4gdGhpcy5fYnRuQ29tO1xuICAgIH1cbiAgICAvL+S+nei1lueahExpc3Tnu4Tku7ZcbiAgICBwdWJsaWMgbGlzdDogTGlzdDtcbiAgICAvL+aYr+WQpuW3sue7j+azqOWGjOi/h+S6i+S7tlxuICAgIHByaXZhdGUgX2V2ZW50UmVnID0gZmFsc2U7XG4gICAgLy/luo/liJdpZFxuICAgIHB1YmxpYyBsaXN0SWQ6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gLy/msqHmnInmjInpkq7nu4Tku7bnmoTor53vvIxzZWxlY3RlZEZsYWfml6DmlYhcbiAgICAgICAgLy8gaWYgKCF0aGlzLmJ0bkNvbSlcbiAgICAgICAgLy8gICAgIHRoaXMuc2VsZWN0ZWRNb2RlID09IFNlbGVjdGVkVHlwZS5OT05FO1xuICAgICAgICAvL+aciemAieaLqeaooeW8j+aXtu+8jOS/neWtmOebuOW6lOeahOS4nOilv1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1vZGUgPT0gU2VsZWN0ZWRUeXBlLlNXSVRDSCkge1xuICAgICAgICAgICAgbGV0IGNvbTogY2MuU3ByaXRlID0gdGhpcy5zZWxlY3RlZEZsYWcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICB0aGlzLl91bnNlbGVjdGVkU3ByaXRlRnJhbWUgPSBjb20uc3ByaXRlRnJhbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl9vblNpemVDaGFuZ2UsIHRoaXMpO1xuICAgIH1cblxuICAgIF9yZWdpc3RlckV2ZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50UmVnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5idG5Db20gJiYgdGhpcy5saXN0LnNlbGVjdGVkTW9kZSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkNvbS5jbGlja0V2ZW50cy51bnNoaWZ0KHRoaXMuY3JlYXRlRXZ0KHRoaXMsICdvbkNsaWNrVGhpcycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFkYXB0aXZlU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuX29uU2l6ZUNoYW5nZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ldmVudFJlZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25TaXplQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmxpc3QuX29uSXRlbUFkYXB0aXZlKHRoaXMubm9kZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIm+W7uuS6i+S7tlxuICAgICAqIEBwYXJhbSB7Y2MuQ29tcG9uZW50fSBjb21wb25lbnQg57uE5Lu26ISa5pysXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhhbmRsZXJOYW1lIOinpuWPkeWHveaVsOWQjeensFxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gbm9kZSDnu4Tku7bmiYDlnKhub2Rl77yI5LiN5Lyg55qE5oOF5Ya15LiL5Y+WY29tcG9uZW50Lm5vZGXvvIlcbiAgICAgKiBAcmV0dXJucyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyXG4gICAgICovXG4gICAgY3JlYXRlRXZ0KGNvbXBvbmVudDogY2MuQ29tcG9uZW50LCBoYW5kbGVyTmFtZTogc3RyaW5nLCBub2RlOiBjYy5Ob2RlID0gbnVsbCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudC5pc1ZhbGlkKVxuICAgICAgICAgICAgcmV0dXJuOy8v5pyJ5Lqb5byC5q2l5Yqg6L2955qE77yM6IqC54K55Lul5Y+K6ZSA5q+B5LqG44CCXG4gICAgICAgIGNvbXBvbmVudFsnY29tTmFtZSddID0gY29tcG9uZW50Wydjb21OYW1lJ10gfHwgY29tcG9uZW50Lm5hbWUubWF0Y2goL1xcPCguKj8pXFw+L2cpLnBvcCgpLnJlcGxhY2UoL1xcPHw+L2csICcnKTtcbiAgICAgICAgbGV0IGV2dCA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGV2dC50YXJnZXQgPSBub2RlIHx8IGNvbXBvbmVudC5ub2RlO1xuICAgICAgICBldnQuY29tcG9uZW50ID0gY29tcG9uZW50Wydjb21OYW1lJ107XG4gICAgICAgIGV2dC5oYW5kbGVyID0gaGFuZGxlck5hbWU7XG4gICAgICAgIHJldHVybiBldnQ7XG4gICAgfVxuXG4gICAgc2hvd0FuaShhbmlUeXBlOiBudW1iZXIsIGNhbGxGdW5jOiBGdW5jdGlvbiwgZGVsOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBhY3RzOiBhbnlbXTtcbiAgICAgICAgc3dpdGNoIChhbmlUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIDA6IC8v5ZCR5LiK5raI5aSxXG4gICAgICAgICAgICAgICAgYWN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyguMiwgLjcpLFxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoLjMsIDAsIHRoaXMubm9kZS5oZWlnaHQgKiAyKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOiAvL+WQkeWPs+a2iOWksVxuICAgICAgICAgICAgICAgIGFjdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oLjIsIC43KSxcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KC4zLCB0aGlzLm5vZGUud2lkdGggKiAyLCAwKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOiAvL+WQkeS4i+a2iOWksVxuICAgICAgICAgICAgICAgIGFjdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oLjIsIC43KSxcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KC4zLCAwLCB0aGlzLm5vZGUuaGVpZ2h0ICogLTIpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6IC8v5ZCR5bem5raI5aSxXG4gICAgICAgICAgICAgICAgYWN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyguMiwgLjcpLFxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoLjMsIHRoaXMubm9kZS53aWR0aCAqIC0yLCAwKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogLy/pu5jorqTvvJrnvKnlsI/mtojlpLFcbiAgICAgICAgICAgICAgICBhY3RzID0gW1xuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKC4zLCAuMSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbEZ1bmMgfHwgZGVsKSB7XG4gICAgICAgICAgICBhY3RzLnB1c2goY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Ll9kZWxTaW5nbGVJdGVtKHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG46IG51bWJlciA9IHRoaXMubGlzdC5kaXNwbGF5RGF0YS5sZW5ndGggLSAxOyBuID49IDA7IG4tLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdC5kaXNwbGF5RGF0YVtuXS5pZCA9PSB0aGlzLmxpc3RJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5kaXNwbGF5RGF0YS5zcGxpY2UobiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbEZ1bmMoKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdHMpKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrVGhpcygpIHtcbiAgICAgICAgdGhpcy5saXN0LnNlbGVjdGVkSWQgPSB0aGlzLmxpc3RJZDtcbiAgICB9XG5cbn1cbiJdfQ==