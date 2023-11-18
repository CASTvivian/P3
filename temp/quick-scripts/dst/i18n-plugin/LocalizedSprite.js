
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/i18n-plugin/LocalizedSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f34ac2GGiVOBbG6XlfvgYP4', 'LocalizedSprite');
// LocalizedSprite.js

"use strict";

var SpriteFrameSet = require('SpriteFrameSet');

cc.Class({
  "extends": cc.Component,
  editor: {
    executeInEditMode: true,
    inspector: 'packages://i18n/inspector/localized-sprite.js',
    menu: 'i18n/LocalizedSprite'
  },
  properties: {
    spriteFrameSet: {
      "default": [],
      type: SpriteFrameSet
    }
  },
  onLoad: function onLoad() {
    this.fetchRender();
  },
  fetchRender: function fetchRender() {
    var sprite = this.getComponent(cc.Sprite);

    if (sprite) {
      this.sprite = sprite;
      this.updateSprite(window.i18n.curLang);
      return;
    }
  },
  getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
    for (var i = 0; i < this.spriteFrameSet.length; ++i) {
      if (this.spriteFrameSet[i].language === lang) {
        return this.spriteFrameSet[i].spriteFrame;
      }
    }
  },
  updateSprite: function updateSprite(language) {
    if (!this.sprite) {
      cc.error('Failed to update localized sprite, sprite component is invalid!');
      return;
    }

    var spriteFrame = this.getSpriteFrameByLang(language);

    if (!spriteFrame && this.spriteFrameSet[0]) {
      spriteFrame = this.spriteFrameSet[0].spriteFrame;
    }

    this.sprite.spriteFrame = spriteFrame;
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzXFxpMThuXFxydW50aW1lLXNjcmlwdHNcXExvY2FsaXplZFNwcml0ZS5qcyJdLCJuYW1lcyI6WyJTcHJpdGVGcmFtZVNldCIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJpbnNwZWN0b3IiLCJtZW51IiwicHJvcGVydGllcyIsInNwcml0ZUZyYW1lU2V0IiwidHlwZSIsIm9uTG9hZCIsImZldGNoUmVuZGVyIiwic3ByaXRlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwidXBkYXRlU3ByaXRlIiwid2luZG93IiwiaTE4biIsImN1ckxhbmciLCJnZXRTcHJpdGVGcmFtZUJ5TGFuZyIsImxhbmciLCJpIiwibGVuZ3RoIiwibGFuZ3VhZ2UiLCJzcHJpdGVGcmFtZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLGNBQWMsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQTlCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsaUJBQWlCLEVBQUUsSUFEZjtBQUVKQyxJQUFBQSxTQUFTLEVBQUUsK0NBRlA7QUFHSkMsSUFBQUEsSUFBSSxFQUFFO0FBSEYsR0FISDtBQVNMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVMsRUFERztBQUVaQyxNQUFBQSxJQUFJLEVBQUVYO0FBRk07QUFEUixHQVRQO0FBZ0JMWSxFQUFBQSxNQWhCSyxvQkFnQks7QUFDTixTQUFLQyxXQUFMO0FBQ0gsR0FsQkk7QUFvQkxBLEVBQUFBLFdBcEJLLHlCQW9CVTtBQUNYLFFBQUlDLE1BQU0sR0FBRyxLQUFLQyxZQUFMLENBQWtCYixFQUFFLENBQUNjLE1BQXJCLENBQWI7O0FBQ0EsUUFBSUYsTUFBSixFQUFZO0FBQ1IsV0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsV0FBS0csWUFBTCxDQUFrQkMsTUFBTSxDQUFDQyxJQUFQLENBQVlDLE9BQTlCO0FBQ0E7QUFDSDtBQUNKLEdBM0JJO0FBNkJMQyxFQUFBQSxvQkE3QkssZ0NBNkJpQkMsSUE3QmpCLEVBNkJ1QjtBQUN4QixTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2IsY0FBTCxDQUFvQmMsTUFBeEMsRUFBZ0QsRUFBRUQsQ0FBbEQsRUFBcUQ7QUFDakQsVUFBSSxLQUFLYixjQUFMLENBQW9CYSxDQUFwQixFQUF1QkUsUUFBdkIsS0FBb0NILElBQXhDLEVBQThDO0FBQzFDLGVBQU8sS0FBS1osY0FBTCxDQUFvQmEsQ0FBcEIsRUFBdUJHLFdBQTlCO0FBQ0g7QUFDSjtBQUNKLEdBbkNJO0FBcUNMVCxFQUFBQSxZQXJDSyx3QkFxQ1NRLFFBckNULEVBcUNtQjtBQUNwQixRQUFJLENBQUMsS0FBS1gsTUFBVixFQUFrQjtBQUNkWixNQUFBQSxFQUFFLENBQUN5QixLQUFILENBQVMsaUVBQVQ7QUFDQTtBQUNIOztBQUVELFFBQUlELFdBQVcsR0FBRyxLQUFLTCxvQkFBTCxDQUEwQkksUUFBMUIsQ0FBbEI7O0FBRUEsUUFBSSxDQUFDQyxXQUFELElBQWdCLEtBQUtoQixjQUFMLENBQW9CLENBQXBCLENBQXBCLEVBQTRDO0FBQ3hDZ0IsTUFBQUEsV0FBVyxHQUFHLEtBQUtoQixjQUFMLENBQW9CLENBQXBCLEVBQXVCZ0IsV0FBckM7QUFDSDs7QUFFRCxTQUFLWixNQUFMLENBQVlZLFdBQVosR0FBMEJBLFdBQTFCO0FBQ0g7QUFsREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3ByaXRlRnJhbWVTZXQgPSByZXF1aXJlKCdTcHJpdGVGcmFtZVNldCcpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2kxOG4vaW5zcGVjdG9yL2xvY2FsaXplZC1zcHJpdGUuanMnLFxuICAgICAgICBtZW51OiAnaTE4bi9Mb2NhbGl6ZWRTcHJpdGUnXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3ByaXRlRnJhbWVTZXQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogU3ByaXRlRnJhbWVTZXRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmZldGNoUmVuZGVyKCk7XG4gICAgfSxcblxuICAgIGZldGNoUmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGlmIChzcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTcHJpdGUod2luZG93LmkxOG4uY3VyTGFuZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0U3ByaXRlRnJhbWVCeUxhbmcgKGxhbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lU2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcHJpdGVGcmFtZVNldFtpXS5sYW5ndWFnZSA9PT0gbGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwcml0ZUZyYW1lU2V0W2ldLnNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVNwcml0ZSAobGFuZ3VhZ2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwcml0ZSkge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ0ZhaWxlZCB0byB1cGRhdGUgbG9jYWxpemVkIHNwcml0ZSwgc3ByaXRlIGNvbXBvbmVudCBpcyBpbnZhbGlkIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gdGhpcy5nZXRTcHJpdGVGcmFtZUJ5TGFuZyhsYW5ndWFnZSk7XG5cbiAgICAgICAgaWYgKCFzcHJpdGVGcmFtZSAmJiB0aGlzLnNwcml0ZUZyYW1lU2V0WzBdKSB7XG4gICAgICAgICAgICBzcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVTZXRbMF0uc3ByaXRlRnJhbWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgIH1cbn0pOyJdfQ==