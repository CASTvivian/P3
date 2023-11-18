
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/i18n-plugin/LocalizedLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '744dcs4DCdNprNhG0xwq6FK', 'LocalizedLabel');
// LocalizedLabel.js

"use strict";

var i18n = require('LanguageData'); // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.


function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

cc.Class({
  "extends": cc.Component,
  editor: {
    executeInEditMode: true,
    menu: 'i18n/LocalizedLabel'
  },
  properties: {
    dataID: {
      get: function get() {
        return this._dataID;
      },
      set: function set(val) {
        if (this._dataID !== val) {
          this._dataID = val;

          if (CC_EDITOR) {
            this._debouncedUpdateLabel();
          } else {
            this.updateLabel();
          }
        }
      }
    },
    _dataID: ''
  },
  onLoad: function onLoad() {
    if (CC_EDITOR) {
      this._debouncedUpdateLabel = debounce(this.updateLabel, 200);
    }

    if (!i18n.inst) {
      i18n.init();
    } // cc.log('dataID: ' + this.dataID + ' value: ' + i18n.t(this.dataID));


    this.fetchRender();
  },
  fetchRender: function fetchRender() {
    var label = this.getComponent(cc.Label);

    if (label) {
      this.label = label;
      this.updateLabel();
      return;
    }
  },
  updateLabel: function updateLabel() {
    if (!this.label) {
      cc.error('Failed to update localized label, label component is invalid!');
      return;
    }

    var localizedString = i18n.t(this.dataID);

    if (localizedString) {
      this.label.string = i18n.t(this.dataID);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzXFxpMThuXFxydW50aW1lLXNjcmlwdHNcXExvY2FsaXplZExhYmVsLmpzIl0sIm5hbWVzIjpbImkxOG4iLCJyZXF1aXJlIiwiZGVib3VuY2UiLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJjb250ZXh0IiwiYXJncyIsImFyZ3VtZW50cyIsImxhdGVyIiwiYXBwbHkiLCJjYWxsTm93IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsIm1lbnUiLCJwcm9wZXJ0aWVzIiwiZGF0YUlEIiwiZ2V0IiwiX2RhdGFJRCIsInNldCIsInZhbCIsIkNDX0VESVRPUiIsIl9kZWJvdW5jZWRVcGRhdGVMYWJlbCIsInVwZGF0ZUxhYmVsIiwib25Mb2FkIiwiaW5zdCIsImluaXQiLCJmZXRjaFJlbmRlciIsImxhYmVsIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJlcnJvciIsImxvY2FsaXplZFN0cmluZyIsInQiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUFwQixFQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF3QkMsSUFBeEIsRUFBOEJDLFNBQTlCLEVBQXlDO0FBQ3JDLE1BQUlDLE9BQUo7QUFDQSxTQUFPLFlBQVc7QUFDZCxRQUFJQyxPQUFPLEdBQUcsSUFBZDtBQUFBLFFBQW9CQyxJQUFJLEdBQUdDLFNBQTNCOztBQUNBLFFBQUlDLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQVc7QUFDbkJKLE1BQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0EsVUFBSSxDQUFDRCxTQUFMLEVBQWdCRixJQUFJLENBQUNRLEtBQUwsQ0FBV0osT0FBWCxFQUFvQkMsSUFBcEI7QUFDbkIsS0FIRDs7QUFJQSxRQUFJSSxPQUFPLEdBQUdQLFNBQVMsSUFBSSxDQUFDQyxPQUE1QjtBQUNBTyxJQUFBQSxZQUFZLENBQUNQLE9BQUQsQ0FBWjtBQUNBQSxJQUFBQSxPQUFPLEdBQUdRLFVBQVUsQ0FBQ0osS0FBRCxFQUFRTixJQUFSLENBQXBCO0FBQ0EsUUFBSVEsT0FBSixFQUFhVCxJQUFJLENBQUNRLEtBQUwsQ0FBV0osT0FBWCxFQUFvQkMsSUFBcEI7QUFDaEIsR0FWRDtBQVdIOztBQUVETyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsaUJBQWlCLEVBQUUsSUFEZjtBQUVKQyxJQUFBQSxJQUFJLEVBQUU7QUFGRixHQUhIO0FBUUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsR0FESSxpQkFDRztBQUNILGVBQU8sS0FBS0MsT0FBWjtBQUNILE9BSEc7QUFJSkMsTUFBQUEsR0FKSSxlQUlDQyxHQUpELEVBSU07QUFDTixZQUFJLEtBQUtGLE9BQUwsS0FBaUJFLEdBQXJCLEVBQTBCO0FBQ3RCLGVBQUtGLE9BQUwsR0FBZUUsR0FBZjs7QUFDQSxjQUFJQyxTQUFKLEVBQWU7QUFDWCxpQkFBS0MscUJBQUw7QUFDSCxXQUZELE1BRU87QUFDSCxpQkFBS0MsV0FBTDtBQUNIO0FBQ0o7QUFDSjtBQWJHLEtBREE7QUFnQlJMLElBQUFBLE9BQU8sRUFBRTtBQWhCRCxHQVJQO0FBMkJMTSxFQUFBQSxNQTNCSyxvQkEyQks7QUFDTixRQUFHSCxTQUFILEVBQWM7QUFDVixXQUFLQyxxQkFBTCxHQUE2QjFCLFFBQVEsQ0FBQyxLQUFLMkIsV0FBTixFQUFtQixHQUFuQixDQUFyQztBQUNIOztBQUNELFFBQUksQ0FBQzdCLElBQUksQ0FBQytCLElBQVYsRUFBZ0I7QUFDWi9CLE1BQUFBLElBQUksQ0FBQ2dDLElBQUw7QUFDSCxLQU5LLENBT047OztBQUNBLFNBQUtDLFdBQUw7QUFDSCxHQXBDSTtBQXNDTEEsRUFBQUEsV0F0Q0sseUJBc0NVO0FBQ1gsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JwQixFQUFFLENBQUNxQixLQUFyQixDQUFaOztBQUNBLFFBQUlGLEtBQUosRUFBVztBQUNQLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFdBQUtMLFdBQUw7QUFDQTtBQUNIO0FBQ0osR0E3Q0k7QUErQ0xBLEVBQUFBLFdBL0NLLHlCQStDVTtBQUNYLFFBQUksQ0FBQyxLQUFLSyxLQUFWLEVBQWlCO0FBQ2JuQixNQUFBQSxFQUFFLENBQUNzQixLQUFILENBQVMsK0RBQVQ7QUFDQTtBQUNIOztBQUNELFFBQUlDLGVBQWUsR0FBR3RDLElBQUksQ0FBQ3VDLENBQUwsQ0FBTyxLQUFLakIsTUFBWixDQUF0Qjs7QUFDQSxRQUFJZ0IsZUFBSixFQUFxQjtBQUNqQixXQUFLSixLQUFMLENBQVdNLE1BQVgsR0FBb0J4QyxJQUFJLENBQUN1QyxDQUFMLENBQU8sS0FBS2pCLE1BQVosQ0FBcEI7QUFDSDtBQUNKO0FBeERJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGkxOG4gPSByZXF1aXJlKCdMYW5ndWFnZURhdGEnKTtcblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4vLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xufVxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgICAgICBtZW51OiAnaTE4bi9Mb2NhbGl6ZWRMYWJlbCdcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBkYXRhSUQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJRDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhSUQgIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhSUQgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYm91bmNlZFVwZGF0ZUxhYmVsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9kYXRhSUQ6ICcnXG4gICAgfSxcbiAgICBcbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZihDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYm91bmNlZFVwZGF0ZUxhYmVsID0gZGVib3VuY2UodGhpcy51cGRhdGVMYWJlbCwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWkxOG4uaW5zdCkge1xuICAgICAgICAgICAgaTE4bi5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2MubG9nKCdkYXRhSUQ6ICcgKyB0aGlzLmRhdGFJRCArICcgdmFsdWU6ICcgKyBpMThuLnQodGhpcy5kYXRhSUQpKTtcbiAgICAgICAgdGhpcy5mZXRjaFJlbmRlcigpO1xuICAgIH0sXG5cbiAgICBmZXRjaFJlbmRlciAoKSB7XG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG4gICAgfSxcblxuICAgIHVwZGF0ZUxhYmVsICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICBjYy5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBsb2NhbGl6ZWQgbGFiZWwsIGxhYmVsIGNvbXBvbmVudCBpcyBpbnZhbGlkIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsb2NhbGl6ZWRTdHJpbmcgPSBpMThuLnQodGhpcy5kYXRhSUQpO1xuICAgICAgICBpZiAobG9jYWxpemVkU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IGkxOG4udCh0aGlzLmRhdGFJRCk7XG4gICAgICAgIH1cbiAgICB9XG59KTsiXX0=