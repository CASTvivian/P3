
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/GameSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d7b2Hq1SdGo4Ah6K+9Y1sO', 'GameSDK');
// common-plugin/Scripts/GameSDK.js

"use strict";

(function () {
  var GameSDK = window.GameSDK = {
    // CallBack
    callBacks: {},
    // Internal -- Call Native
    callNative: function callNative(cmd, param) {
      param = param == null ? "" : JSON.stringify(param);
      var rt = loadRuntime();
      rt.callCustomCommand({
        success: function success(msg) {
          console.log('success:', msg);
        },
        fail: function fail(msg) {
          console.log('fail:', msg);
        }
      }, cmd, param);
    },
    nativeCallback: function nativeCallback(cmd, param) {
      var func = this.callBacks[cmd];

      if (func) {
        func(JSON.parse(param));
      }
    },
    registerCallback: function registerCallback(cmd, func) {
      this.callBacks[cmd] = func;
    },
    // 设置回调函数
    setOnInitCB: function setOnInitCB(func) {
      this.registerCallback("onInit", func);
    },
    setOnRoomInfoCB: function setOnRoomInfoCB(func) {
      this.registerCallback("onRoomInfo", func);
    },
    setOnReadyCB: function setOnReadyCB(func) {
      this.registerCallback("onReady", func);
    },
    setOnStartCB: function setOnStartCB(func) {
      this.registerCallback("onStart", func);
    },
    setOnMessageCB: function setOnMessageCB(func) {
      this.registerCallback("onMessage", func);
    },
    setOnFinishCB: function setOnFinishCB(func) {
      this.registerCallback("onFinish", func);
    },
    setOnAudioCB: function setOnAudioCB(func) {
      this.registerCallback("onAudio", func);
    },
    setOnResumeCB: function setOnResumeCB(func) {
      this.registerCallback("onResume", func);
    },
    setOnPauseCB: function setOnPauseCB(func) {
      this.registerCallback("onPause", func);
    },
    setOnPayCB: function setOnPayCB(func) {
      this.registerCallback("onPay", func);
    },
    // 初始化SDK
    // 参数:
    //   gameId: int 游戏ID
    init: function init(gameId) {
      var param = {
        "gameId": gameId
      };
      this.callNative("init", param);
    },
    // 退出游戏
    // 参数:
    //   reason: int 退出原因: 1 - 正常退出，2-异常退出
    quit: function quit(reason) {
      var param = {
        "reason": reason
      };
      this.callNative("quit", param);
    },
    // 获取游戏房间信息
    getRoomInfo: function getRoomInfo() {
      this.callNative("getRoomInfo");
    },
    // 游戏终止
    // 参数:
    //   result: int 游戏结果: 1、胜，2、负，3、平
    finish: function finish(result) {
      var param = {
        "result": result
      };
      this.callNative("finish", param);
    },
    // 设置屏幕朝向
    // 参数:
    //    orientation: int 屏幕朝向: 0、横屏，1、竖屏
    setOrientation: function setOrientation(orientation) {
      var param = {
        "orientation": orientation
      };
      this.callNative("setOrientation", param);
    },
    // 设置声音
    // 参数:
    //   enable: int 是否开启: 0、关闭，1、开启
    //   volume: int 音量
    setAudio: function setAudio(enable, volume) {
      var param = {
        "enable": enable,
        "volume": volume
      };
      this.callNative("setAudio", param);
    },
    // 设置麦克风
    // 参数:
    //   enable: int 是否开启: 0、关闭，1、开启
    //   volume: int 音量: 0 ~ 100
    setMic: function setMic(enable, volume) {
      var param = {
        "enable": enable,
        "volume": volume
      };
      this.callNative("setMic", param);
    },
    // 设置游戏加载进度（SDK版本 >= 2）
    // 参数:
    //    progress: int 加载进度: 0 ~ 100
    // 说明: 从SDK版本2开始，平台增加了统一的游戏加载进度界面，用于游戏后台加载时显示。
    //      游戏需要在初始化后，通过此函数报告游戏加载进度。加载界面将显示“加载中...”
    //      当进度>=100%时，加载界面并不会关闭，加载界面将提醒用户“等待对手进入中...”
    //      因此，游戏需要在对手都进入房间后，调用hideLoadProgress函数关闭加载界面。
    setLoadProgress: function setLoadProgress(progress) {
      var param = {
        "progress": progress
      };
      this.callNative("setLoadProgress", param);
    },
    // 隐藏游戏加载进度（SDK版本 >= 2）
    // 参数:
    //    无
    // 说明: 用于关闭加载进度界面。此后玩家才可以和游戏交互。
    hideLoadProgress: function hideLoadProgress() {
      var param = {};
      this.callNative("hideLoadProgress", param);
    },
    // 游戏准备
    // 参数
    //   userData: string 用户数据
    ready: function ready(userData) {
      var param = {
        "userData": userData
      };
      this.callNative("ready", param);
    },
    // 游戏消息广播
    // 参数
    //  message: string 广播的消息
    //  includeMe: int 是否也广播给自己: 0、不包含，1、包含
    broadcast: function broadcast(message, includeMe) {
      if (includeMe == null) {
        includeMe = 0;
      }

      var param = {
        "message": message,
        "includeMe": includeMe
      };
      this.callNative("broadcast", param);
    },
    // 游戏结束
    // 参数
    //   result: int 游戏结果: 1、胜，2、负，3、平
    gameOver: function gameOver(result) {
      var param = {
        "result": result
      };
      this.callNative("gameOver", param);
    },
    // 游戏支付
    // 参数
    //   orderId: int 订单号
    //   goodsName: string 商品名称
    //   goodsDesc: string 商品描述
    //   orderAmount: int 订单金额
    //   extension： string 透传参数
    //   notifyURL: string 支付付款通知地址
    pay: function pay(orderId, goodsName, goodsDesc, orderAmount, extension, notifyURL) {
      var param = {
        "orderId": orderId,
        "goodsName": goodsName,
        "goodsDesc": goodsDesc,
        "orderAmount": orderAmount,
        "extension": extension,
        "notifyURL": notifyURL
      };
      this.callNative("pay", param);
    }
  };
})();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcR2FtZVNESy5qcyJdLCJuYW1lcyI6WyJHYW1lU0RLIiwid2luZG93IiwiY2FsbEJhY2tzIiwiY2FsbE5hdGl2ZSIsImNtZCIsInBhcmFtIiwiSlNPTiIsInN0cmluZ2lmeSIsInJ0IiwibG9hZFJ1bnRpbWUiLCJjYWxsQ3VzdG9tQ29tbWFuZCIsInN1Y2Nlc3MiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsIm5hdGl2ZUNhbGxiYWNrIiwiZnVuYyIsInBhcnNlIiwicmVnaXN0ZXJDYWxsYmFjayIsInNldE9uSW5pdENCIiwic2V0T25Sb29tSW5mb0NCIiwic2V0T25SZWFkeUNCIiwic2V0T25TdGFydENCIiwic2V0T25NZXNzYWdlQ0IiLCJzZXRPbkZpbmlzaENCIiwic2V0T25BdWRpb0NCIiwic2V0T25SZXN1bWVDQiIsInNldE9uUGF1c2VDQiIsInNldE9uUGF5Q0IiLCJpbml0IiwiZ2FtZUlkIiwicXVpdCIsInJlYXNvbiIsImdldFJvb21JbmZvIiwiZmluaXNoIiwicmVzdWx0Iiwic2V0T3JpZW50YXRpb24iLCJvcmllbnRhdGlvbiIsInNldEF1ZGlvIiwiZW5hYmxlIiwidm9sdW1lIiwic2V0TWljIiwic2V0TG9hZFByb2dyZXNzIiwicHJvZ3Jlc3MiLCJoaWRlTG9hZFByb2dyZXNzIiwicmVhZHkiLCJ1c2VyRGF0YSIsImJyb2FkY2FzdCIsIm1lc3NhZ2UiLCJpbmNsdWRlTWUiLCJnYW1lT3ZlciIsInBheSIsIm9yZGVySWQiLCJnb29kc05hbWUiLCJnb29kc0Rlc2MiLCJvcmRlckFtb3VudCIsImV4dGVuc2lvbiIsIm5vdGlmeVVSTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsQ0FBQyxZQUFXO0FBQ1IsTUFBSUEsT0FBTyxHQUFHQyxNQUFNLENBQUNELE9BQVAsR0FBaUI7QUFDM0I7QUFDQUUsSUFBQUEsU0FBUyxFQUFFLEVBRmdCO0FBRzNCO0FBQ0FD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dkIsVUFBSS9CLEtBQUssR0FBRztBQUNSLGtCQUFVK0I7QUFERixPQUFaO0FBR0EsV0FBS2pDLFVBQUwsQ0FBZ0IsVUFBaEIsRUFBNEJFLEtBQTVCO0FBQ0gsS0FuTTBCO0FBcU0zQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ErQyxJQUFBQSxHQUFHLEVBQUUsYUFBU0MsT0FBVCxFQUFrQkMsU0FBbEIsRUFBNkJDLFNBQTdCLEVBQXdDQyxXQUF4QyxFQUFxREMsU0FBckQsRUFBZ0VDLFNBQWhFLEVBQTJFO0FBQzVFLFVBQUlyRCxLQUFLLEdBQUc7QUFDUixtQkFBV2dELE9BREg7QUFFUixxQkFBYUMsU0FGTDtBQUdSLHFCQUFhQyxTQUhMO0FBSVIsdUJBQWVDLFdBSlA7QUFLUixxQkFBYUMsU0FMTDtBQU1SLHFCQUFhQztBQU5MLE9BQVo7QUFRQSxXQUFLdkQsVUFBTCxDQUFnQixLQUFoQixFQUF1QkUsS0FBdkI7QUFDSDtBQXZOMEIsR0FBL0I7QUF5TkgsQ0ExTkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIEdhbWVTREsgPSB3aW5kb3cuR2FtZVNESyA9IHtcclxuICAgICAgICAvLyBDYWxsQmFja1xyXG4gICAgICAgIGNhbGxCYWNrczoge30sXHJcbiAgICAgICAgLy8gSW50ZXJuYWwgLS0gQ2FsbCBOYXRpdmVcclxuICAgICAgICBjYWxsTmF0aXZlOiBmdW5jdGlvbihjbWQsIHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHBhcmFtID0gcGFyYW0gPT0gbnVsbCA/IFwiXCIgOiBKU09OLnN0cmluZ2lmeShwYXJhbSk7XHJcbiAgICAgICAgICAgIHZhciBydCA9IGxvYWRSdW50aW1lKCk7XHJcbiAgICAgICAgICAgIHJ0LmNhbGxDdXN0b21Db21tYW5kKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3M6JywgbXNnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKG1zZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsOicsIG1zZyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LCBjbWQsIHBhcmFtKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuYXRpdmVDYWxsYmFjazogZnVuY3Rpb24oY21kLCBwYXJhbSkge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMuY2FsbEJhY2tzW2NtZF07XHJcbiAgICAgICAgICAgIGlmIChmdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jKEpTT04ucGFyc2UocGFyYW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlZ2lzdGVyQ2FsbGJhY2s6IGZ1bmN0aW9uKGNtZCwgZnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrc1tjbWRdID0gZnVuYztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDorr7nva7lm57osIPlh73mlbBcclxuICAgICAgICBzZXRPbkluaXRDQjogZnVuY3Rpb24oZnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ2FsbGJhY2soXCJvbkluaXRcIiwgZnVuYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0T25Sb29tSW5mb0NCOiBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhcIm9uUm9vbUluZm9cIiwgZnVuYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0T25SZWFkeUNCOiBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhcIm9uUmVhZHlcIiwgZnVuYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0T25TdGFydENCOiBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhcIm9uU3RhcnRcIiwgZnVuYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0T25NZXNzYWdlQ0I6IGZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNhbGxiYWNrKFwib25NZXNzYWdlXCIsIGZ1bmMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldE9uRmluaXNoQ0I6IGZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNhbGxiYWNrKFwib25GaW5pc2hcIiwgZnVuYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0T25BdWRpb0NCOiBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhcIm9uQXVkaW9cIiwgZnVuYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0T25SZXN1bWVDQjogZnVuY3Rpb24oZnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ2FsbGJhY2soXCJvblJlc3VtZVwiLCBmdW5jKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRPblBhdXNlQ0I6IGZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNhbGxiYWNrKFwib25QYXVzZVwiLCBmdW5jKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRPblBheUNCOiBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhcIm9uUGF5XCIsIGZ1bmMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOWIneWni+WMllNES1xyXG4gICAgICAgIC8vIOWPguaVsDpcclxuICAgICAgICAvLyAgIGdhbWVJZDogaW50IOa4uOaIj0lEXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oZ2FtZUlkKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIFwiZ2FtZUlkXCI6IGdhbWVJZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxOYXRpdmUoXCJpbml0XCIsIHBhcmFtKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDpgIDlh7rmuLjmiI9cclxuICAgICAgICAvLyDlj4LmlbA6XHJcbiAgICAgICAgLy8gICByZWFzb246IGludCDpgIDlh7rljp/lm6A6IDEgLSDmraPluLjpgIDlh7rvvIwyLeW8guW4uOmAgOWHulxyXG4gICAgICAgIHF1aXQ6IGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBcInJlYXNvblwiOiByZWFzb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwicXVpdFwiLCBwYXJhbSk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIOiOt+WPlua4uOaIj+aIv+mXtOS/oeaBr1xyXG4gICAgICAgIGdldFJvb21JbmZvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwiZ2V0Um9vbUluZm9cIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g5ri45oiP57uI5q2iXHJcbiAgICAgICAgLy8g5Y+C5pWwOlxyXG4gICAgICAgIC8vICAgcmVzdWx0OiBpbnQg5ri45oiP57uT5p6cOiAx44CB6IOc77yMMuOAgei0n++8jDPjgIHlubNcclxuICAgICAgICBmaW5pc2g6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdFwiOiByZXN1bHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwiZmluaXNoXCIsIHBhcmFtKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDorr7nva7lsY/luZXmnJ3lkJFcclxuICAgICAgICAvLyDlj4LmlbA6XHJcbiAgICAgICAgLy8gICAgb3JpZW50YXRpb246IGludCDlsY/luZXmnJ3lkJE6IDDjgIHmqKrlsY/vvIwx44CB56uW5bGPXHJcbiAgICAgICAgc2V0T3JpZW50YXRpb246IGZ1bmN0aW9uKG9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIFwib3JpZW50YXRpb25cIjogb3JpZW50YXRpb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwic2V0T3JpZW50YXRpb25cIiwgcGFyYW0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOiuvue9ruWjsOmfs1xyXG4gICAgICAgIC8vIOWPguaVsDpcclxuICAgICAgICAvLyAgIGVuYWJsZTogaW50IOaYr+WQpuW8gOWQrzogMOOAgeWFs+mXre+8jDHjgIHlvIDlkK9cclxuICAgICAgICAvLyAgIHZvbHVtZTogaW50IOmfs+mHj1xyXG4gICAgICAgIHNldEF1ZGlvOiBmdW5jdGlvbihlbmFibGUsIHZvbHVtZSkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBcImVuYWJsZVwiOiBlbmFibGUsXHJcbiAgICAgICAgICAgICAgICBcInZvbHVtZVwiOiB2b2x1bWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwic2V0QXVkaW9cIiwgcGFyYW0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOiuvue9rum6puWFi+mjjlxyXG4gICAgICAgIC8vIOWPguaVsDpcclxuICAgICAgICAvLyAgIGVuYWJsZTogaW50IOaYr+WQpuW8gOWQrzogMOOAgeWFs+mXre+8jDHjgIHlvIDlkK9cclxuICAgICAgICAvLyAgIHZvbHVtZTogaW50IOmfs+mHjzogMCB+IDEwMFxyXG4gICAgICAgIHNldE1pYzogZnVuY3Rpb24oZW5hYmxlLCB2b2x1bWUpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbmFibGVcIjogZW5hYmxlLFxyXG4gICAgICAgICAgICAgICAgXCJ2b2x1bWVcIjogdm9sdW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbE5hdGl2ZShcInNldE1pY1wiLCBwYXJhbSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g6K6+572u5ri45oiP5Yqg6L296L+b5bqm77yIU0RL54mI5pysID49IDLvvIlcclxuICAgICAgICAvLyDlj4LmlbA6XHJcbiAgICAgICAgLy8gICAgcHJvZ3Jlc3M6IGludCDliqDovb3ov5vluqY6IDAgfiAxMDBcclxuICAgICAgICAvLyDor7TmmI46IOS7jlNES+eJiOacrDLlvIDlp4vvvIzlubPlj7Dlop7liqDkuobnu5/kuIDnmoTmuLjmiI/liqDovb3ov5vluqbnlYzpnaLvvIznlKjkuo7muLjmiI/lkI7lj7DliqDovb3ml7bmmL7npLrjgIJcclxuICAgICAgICAvLyAgICAgIOa4uOaIj+mcgOimgeWcqOWIneWni+WMluWQju+8jOmAmui/h+atpOWHveaVsOaKpeWRiua4uOaIj+WKoOi9vei/m+W6puOAguWKoOi9veeVjOmdouWwhuaYvuekuuKAnOWKoOi9veS4rS4uLuKAnVxyXG4gICAgICAgIC8vICAgICAg5b2T6L+b5bqmPj0xMDAl5pe277yM5Yqg6L2955WM6Z2i5bm25LiN5Lya5YWz6Zet77yM5Yqg6L2955WM6Z2i5bCG5o+Q6YaS55So5oi34oCc562J5b6F5a+55omL6L+b5YWl5LitLi4u4oCdXHJcbiAgICAgICAgLy8gICAgICDlm6DmraTvvIzmuLjmiI/pnIDopoHlnKjlr7nmiYvpg73ov5vlhaXmiL/pl7TlkI7vvIzosIPnlKhoaWRlTG9hZFByb2dyZXNz5Ye95pWw5YWz6Zet5Yqg6L2955WM6Z2i44CCXHJcbiAgICAgICAgc2V0TG9hZFByb2dyZXNzOiBmdW5jdGlvbihwcm9ncmVzcykge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBcInByb2dyZXNzXCI6IHByb2dyZXNzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbE5hdGl2ZShcInNldExvYWRQcm9ncmVzc1wiLCBwYXJhbSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g6ZqQ6JeP5ri45oiP5Yqg6L296L+b5bqm77yIU0RL54mI5pysID49IDLvvIlcclxuICAgICAgICAvLyDlj4LmlbA6XHJcbiAgICAgICAgLy8gICAg5pegXHJcbiAgICAgICAgLy8g6K+05piOOiDnlKjkuo7lhbPpl63liqDovb3ov5vluqbnlYzpnaLjgILmraTlkI7njqnlrrbmiY3lj6/ku6XlkozmuLjmiI/kuqTkupLjgIJcclxuICAgICAgICBoaWRlTG9hZFByb2dyZXNzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbE5hdGl2ZShcImhpZGVMb2FkUHJvZ3Jlc3NcIiwgcGFyYW0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOa4uOaIj+WHhuWkh1xyXG4gICAgICAgIC8vIOWPguaVsFxyXG4gICAgICAgIC8vICAgdXNlckRhdGE6IHN0cmluZyDnlKjmiLfmlbDmja5cclxuICAgICAgICByZWFkeTogZnVuY3Rpb24odXNlckRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VyRGF0YVwiOiB1c2VyRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbE5hdGl2ZShcInJlYWR5XCIsIHBhcmFtKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDmuLjmiI/mtojmga/lub/mkq1cclxuICAgICAgICAvLyDlj4LmlbBcclxuICAgICAgICAvLyAgbWVzc2FnZTogc3RyaW5nIOW5v+aSreeahOa2iOaBr1xyXG4gICAgICAgIC8vICBpbmNsdWRlTWU6IGludCDmmK/lkKbkuZ/lub/mkq3nu5noh6rlt7E6IDDjgIHkuI3ljIXlkKvvvIwx44CB5YyF5ZCrXHJcbiAgICAgICAgYnJvYWRjYXN0OiBmdW5jdGlvbihtZXNzYWdlLCBpbmNsdWRlTWUpIHtcclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVNZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlTWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlTWVcIjogaW5jbHVkZU1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwiYnJvYWRjYXN0XCIsIHBhcmFtKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDmuLjmiI/nu5PmnZ9cclxuICAgICAgICAvLyDlj4LmlbBcclxuICAgICAgICAvLyAgIHJlc3VsdDogaW50IOa4uOaIj+e7k+aenDogMeOAgeiDnO+8jDLjgIHotJ/vvIwz44CB5bmzXHJcbiAgICAgICAgZ2FtZU92ZXI6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdFwiOiByZXN1bHQsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYWxsTmF0aXZlKFwiZ2FtZU92ZXJcIiwgcGFyYW0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOa4uOaIj+aUr+S7mFxyXG4gICAgICAgIC8vIOWPguaVsFxyXG4gICAgICAgIC8vICAgb3JkZXJJZDogaW50IOiuouWNleWPt1xyXG4gICAgICAgIC8vICAgZ29vZHNOYW1lOiBzdHJpbmcg5ZWG5ZOB5ZCN56ewXHJcbiAgICAgICAgLy8gICBnb29kc0Rlc2M6IHN0cmluZyDllYblk4Hmj4/ov7BcclxuICAgICAgICAvLyAgIG9yZGVyQW1vdW50OiBpbnQg6K6i5Y2V6YeR6aKdXHJcbiAgICAgICAgLy8gICBleHRlbnNpb27vvJogc3RyaW5nIOmAj+S8oOWPguaVsFxyXG4gICAgICAgIC8vICAgbm90aWZ5VVJMOiBzdHJpbmcg5pSv5LuY5LuY5qy+6YCa55+l5Zyw5Z2AXHJcbiAgICAgICAgcGF5OiBmdW5jdGlvbihvcmRlcklkLCBnb29kc05hbWUsIGdvb2RzRGVzYywgb3JkZXJBbW91bnQsIGV4dGVuc2lvbiwgbm90aWZ5VVJMKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIFwib3JkZXJJZFwiOiBvcmRlcklkLFxyXG4gICAgICAgICAgICAgICAgXCJnb29kc05hbWVcIjogZ29vZHNOYW1lLFxyXG4gICAgICAgICAgICAgICAgXCJnb29kc0Rlc2NcIjogZ29vZHNEZXNjLFxyXG4gICAgICAgICAgICAgICAgXCJvcmRlckFtb3VudFwiOiBvcmRlckFtb3VudCxcclxuICAgICAgICAgICAgICAgIFwiZXh0ZW5zaW9uXCI6IGV4dGVuc2lvbixcclxuICAgICAgICAgICAgICAgIFwibm90aWZ5VVJMXCI6IG5vdGlmeVVSTFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbE5hdGl2ZShcInBheVwiLCBwYXJhbSk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufSkoKSJdfQ==