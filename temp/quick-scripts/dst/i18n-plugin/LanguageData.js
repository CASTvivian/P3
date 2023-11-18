
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/i18n-plugin/LanguageData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61de062n4dJ7ZM9/Xdumozn', 'LanguageData');
// LanguageData.js

"use strict";

var Polyglot = require('polyglot.min');

var polyInst = null;

if (!window.i18n) {
  window.i18n = {
    languages: {},
    curLang: ''
  };
}

if (CC_EDITOR) {
  Editor.Profile.load('profile://project/i18n.json', function (err, profile) {
    window.i18n.curLang = profile.data['default_language'];

    if (polyInst) {
      var data = loadLanguageData(window.i18n.curLang) || {};
      initPolyglot(data);
    }
  });
}

function loadLanguageData(language) {
  return window.i18n.languages[language];
}

function initPolyglot(data) {
  if (data) {
    if (polyInst) {
      polyInst.replace(data);
    } else {
      polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      });
    }
  }
}

module.exports = {
  /**
   * This method allow you to switch language during runtime, language argument should be the same as your data file name
   * such as when language is 'zh', it will load your 'zh.js' data source.
   * @method init
   * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
   */
  init: function init(language) {
    if (language === window.i18n.curLang) {
      return;
    }

    var data = loadLanguageData(language) || {};
    window.i18n.curLang = language;
    initPolyglot(data);
    this.inst = polyInst;
  },

  /**
   * this method takes a text key as input, and return the localized string
   * Please read https://github.com/airbnb/polyglot.js for details
   * @method t
   * @return {String} localized string
   * @example
   *
   * var myText = i18n.t('MY_TEXT_KEY');
   *
   * // if your data source is defined as
   * // {"hello_name": "Hello, %{name}"}
   * // you can use the following to interpolate the text
   * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
   */
  t: function t(key, opt) {
    if (polyInst) {
      return polyInst.t(key, opt);
    }
  },
  inst: polyInst,
  updateSceneRenderers: function updateSceneRenderers() {
    // very costly iterations
    var rootNodes = cc.director.getScene().children; // walk all nodes with localize label and update

    var allLocalizedLabels = [];

    for (var i = 0; i < rootNodes.length; ++i) {
      var labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
      Array.prototype.push.apply(allLocalizedLabels, labels);
    }

    for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
      var label = allLocalizedLabels[_i];
      if (!label.node.active) continue;
      label.updateLabel();
    } // walk all nodes with localize sprite and update


    var allLocalizedSprites = [];

    for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
      var sprites = rootNodes[_i2].getComponentsInChildren('LocalizedSprite');

      Array.prototype.push.apply(allLocalizedSprites, sprites);
    }

    for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
      var sprite = allLocalizedSprites[_i3];
      if (!sprite.node.active) continue;
      sprite.updateSprite(window.i18n.curLang);
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzXFxpMThuXFxydW50aW1lLXNjcmlwdHNcXExhbmd1YWdlRGF0YS5qcyJdLCJuYW1lcyI6WyJQb2x5Z2xvdCIsInJlcXVpcmUiLCJwb2x5SW5zdCIsIndpbmRvdyIsImkxOG4iLCJsYW5ndWFnZXMiLCJjdXJMYW5nIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiUHJvZmlsZSIsImxvYWQiLCJlcnIiLCJwcm9maWxlIiwiZGF0YSIsImxvYWRMYW5ndWFnZURhdGEiLCJpbml0UG9seWdsb3QiLCJsYW5ndWFnZSIsInJlcGxhY2UiLCJwaHJhc2VzIiwiYWxsb3dNaXNzaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImluaXQiLCJpbnN0IiwidCIsImtleSIsIm9wdCIsInVwZGF0ZVNjZW5lUmVuZGVyZXJzIiwicm9vdE5vZGVzIiwiY2MiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiY2hpbGRyZW4iLCJhbGxMb2NhbGl6ZWRMYWJlbHMiLCJpIiwibGVuZ3RoIiwibGFiZWxzIiwiZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4iLCJBcnJheSIsInByb3RvdHlwZSIsInB1c2giLCJhcHBseSIsImxhYmVsIiwibm9kZSIsImFjdGl2ZSIsInVwZGF0ZUxhYmVsIiwiYWxsTG9jYWxpemVkU3ByaXRlcyIsInNwcml0ZXMiLCJzcHJpdGUiLCJ1cGRhdGVTcHJpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUF4Qjs7QUFFQSxJQUFJQyxRQUFRLEdBQUcsSUFBZjs7QUFDQSxJQUFJLENBQUNDLE1BQU0sQ0FBQ0MsSUFBWixFQUFrQjtBQUNkRCxFQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYztBQUNWQyxJQUFBQSxTQUFTLEVBQUUsRUFERDtBQUVWQyxJQUFBQSxPQUFPLEVBQUM7QUFGRSxHQUFkO0FBSUg7O0FBRUQsSUFBSUMsU0FBSixFQUFlO0FBQ1hDLEVBQUFBLE1BQU0sQ0FBQ0MsT0FB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UUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7O0FBQ0EsU0FBSyxJQUFJWixHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHTixTQUFTLENBQUNPLE1BQTlCLEVBQXNDLEVBQUVELEdBQXhDLEVBQTJDO0FBQ3ZDLFVBQUlhLE9BQU8sR0FBR25CLFNBQVMsQ0FBQ00sR0FBRCxDQUFULENBQWFHLHVCQUFiLENBQXFDLGlCQUFyQyxDQUFkOztBQUNBQyxNQUFBQSxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLElBQWhCLENBQXFCQyxLQUFyQixDQUEyQkssbUJBQTNCLEVBQWdEQyxPQUFoRDtBQUNIOztBQUNELFNBQUssSUFBSWIsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR1ksbUJBQW1CLENBQUNYLE1BQXhDLEVBQWdELEVBQUVELEdBQWxELEVBQXFEO0FBQ2pELFVBQUljLE1BQU0sR0FBR0YsbUJBQW1CLENBQUNaLEdBQUQsQ0FBaEM7QUFDQSxVQUFHLENBQUNjLE1BQU0sQ0FBQ0wsSUFBUCxDQUFZQyxNQUFoQixFQUF1QjtBQUN2QkksTUFBQUEsTUFBTSxDQUFDQyxZQUFQLENBQW9COUMsTUFBTSxDQUFDQyxJQUFQLENBQVlFLE9BQWhDO0FBQ0g7QUFDSjtBQTlEWSxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUG9seWdsb3QgPSByZXF1aXJlKCdwb2x5Z2xvdC5taW4nKTtcblxubGV0IHBvbHlJbnN0ID0gbnVsbDtcbmlmICghd2luZG93LmkxOG4pIHtcbiAgICB3aW5kb3cuaTE4biA9IHtcbiAgICAgICAgbGFuZ3VhZ2VzOiB7fSxcbiAgICAgICAgY3VyTGFuZzonJ1xuICAgIH07XG59XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBFZGl0b3IuUHJvZmlsZS5sb2FkKCdwcm9maWxlOi8vcHJvamVjdC9pMThuLmpzb24nLCAoZXJyLCBwcm9maWxlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5pMThuLmN1ckxhbmcgPSBwcm9maWxlLmRhdGFbJ2RlZmF1bHRfbGFuZ3VhZ2UnXTtcbiAgICAgICAgaWYgKHBvbHlJbnN0KSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGxvYWRMYW5ndWFnZURhdGEod2luZG93LmkxOG4uY3VyTGFuZykgfHwge307XG4gICAgICAgICAgICBpbml0UG9seWdsb3QoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZExhbmd1YWdlRGF0YSAobGFuZ3VhZ2UpIHtcbiAgICByZXR1cm4gd2luZG93LmkxOG4ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcbn1cblxuZnVuY3Rpb24gaW5pdFBvbHlnbG90IChkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaWYgKHBvbHlJbnN0KSB7XG4gICAgICAgICAgICBwb2x5SW5zdC5yZXBsYWNlKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9seUluc3QgPSBuZXcgUG9seWdsb3QoeyBwaHJhc2VzOiBkYXRhLCBhbGxvd01pc3Npbmc6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGFsbG93IHlvdSB0byBzd2l0Y2ggbGFuZ3VhZ2UgZHVyaW5nIHJ1bnRpbWUsIGxhbmd1YWdlIGFyZ3VtZW50IHNob3VsZCBiZSB0aGUgc2FtZSBhcyB5b3VyIGRhdGEgZmlsZSBuYW1lXG4gICAgICogc3VjaCBhcyB3aGVuIGxhbmd1YWdlIGlzICd6aCcsIGl0IHdpbGwgbG9hZCB5b3VyICd6aC5qcycgZGF0YSBzb3VyY2UuXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHBhcmFtIGxhbmd1YWdlIC0gdGhlIGxhbmd1YWdlIHNwZWNpZmljIGRhdGEgZmlsZSBuYW1lLCBzdWNoIGFzICd6aCcgdG8gbG9hZCAnemguanMnXG4gICAgICovXG4gICAgaW5pdCAobGFuZ3VhZ2UpIHtcbiAgICAgICAgaWYgKGxhbmd1YWdlID09PSB3aW5kb3cuaTE4bi5jdXJMYW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGEgPSBsb2FkTGFuZ3VhZ2VEYXRhKGxhbmd1YWdlKSB8fCB7fTtcbiAgICAgICAgd2luZG93LmkxOG4uY3VyTGFuZyA9IGxhbmd1YWdlO1xuICAgICAgICBpbml0UG9seWdsb3QoZGF0YSk7XG4gICAgICAgIHRoaXMuaW5zdCA9IHBvbHlJbnN0O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgdGFrZXMgYSB0ZXh0IGtleSBhcyBpbnB1dCwgYW5kIHJldHVybiB0aGUgbG9jYWxpemVkIHN0cmluZ1xuICAgICAqIFBsZWFzZSByZWFkIGh0dHBzOi8vZ2l0aHViLmNvbS9haXJibmIvcG9seWdsb3QuanMgZm9yIGRldGFpbHNcbiAgICAgKiBAbWV0aG9kIHRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxvY2FsaXplZCBzdHJpbmdcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG15VGV4dCA9IGkxOG4udCgnTVlfVEVYVF9LRVknKTtcbiAgICAgKlxuICAgICAqIC8vIGlmIHlvdXIgZGF0YSBzb3VyY2UgaXMgZGVmaW5lZCBhc1xuICAgICAqIC8vIHtcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwifVxuICAgICAqIC8vIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgdG8gaW50ZXJwb2xhdGUgdGhlIHRleHRcbiAgICAgKiB2YXIgZ3JlZXRpbmdUZXh0ID0gaTE4bi50KCdoZWxsb19uYW1lJywge25hbWU6ICduYW50YXMnfSk7IC8vIEhlbGxvLCBuYW50YXNcbiAgICAgKi9cbiAgICB0IChrZXksIG9wdCkge1xuICAgICAgICBpZiAocG9seUluc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBwb2x5SW5zdC50KGtleSwgb3B0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbnN0OiBwb2x5SW5zdCxcblxuICAgIHVwZGF0ZVNjZW5lUmVuZGVyZXJzICgpIHsgLy8gdmVyeSBjb3N0bHkgaXRlcmF0aW9uc1xuICAgICAgICBsZXQgcm9vdE5vZGVzID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5jaGlsZHJlbjtcbiAgICAgICAgLy8gd2FsayBhbGwgbm9kZXMgd2l0aCBsb2NhbGl6ZSBsYWJlbCBhbmQgdXBkYXRlXG4gICAgICAgIGxldCBhbGxMb2NhbGl6ZWRMYWJlbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb290Tm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbHMgPSByb290Tm9kZXNbaV0uZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oJ0xvY2FsaXplZExhYmVsJyk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhbGxMb2NhbGl6ZWRMYWJlbHMsIGxhYmVscyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxMb2NhbGl6ZWRMYWJlbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGFsbExvY2FsaXplZExhYmVsc1tpXTtcbiAgICAgICAgICAgIGlmKCFsYWJlbC5ub2RlLmFjdGl2ZSljb250aW51ZTtcbiAgICAgICAgICAgIGxhYmVsLnVwZGF0ZUxhYmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2FsayBhbGwgbm9kZXMgd2l0aCBsb2NhbGl6ZSBzcHJpdGUgYW5kIHVwZGF0ZVxuICAgICAgICBsZXQgYWxsTG9jYWxpemVkU3ByaXRlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvb3ROb2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHNwcml0ZXMgPSByb290Tm9kZXNbaV0uZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oJ0xvY2FsaXplZFNwcml0ZScpO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYWxsTG9jYWxpemVkU3ByaXRlcywgc3ByaXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxMb2NhbGl6ZWRTcHJpdGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgc3ByaXRlID0gYWxsTG9jYWxpemVkU3ByaXRlc1tpXTtcbiAgICAgICAgICAgIGlmKCFzcHJpdGUubm9kZS5hY3RpdmUpY29udGludWU7XG4gICAgICAgICAgICBzcHJpdGUudXBkYXRlU3ByaXRlKHdpbmRvdy5pMThuLmN1ckxhbmcpO1xuICAgICAgICB9XG4gICAgfVxufTsiXX0=