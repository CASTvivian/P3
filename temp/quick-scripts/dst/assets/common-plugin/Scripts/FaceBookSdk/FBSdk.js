
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common-plugin/Scripts/FaceBookSdk/FBSdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b54fpkUvRHgIx4K6bSw7eI', 'FBSdk');
// common-plugin/Scripts/FaceBookSdk/FBSdk.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FBAdManager_1 = require("./FBAdManager");
window["FBAdManager"] = FBAdManager_1.default;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29tbW9uLXBsdWdpblxcU2NyaXB0c1xcRmFjZUJvb2tTZGtcXEZCU2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxxQkFBVyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZCQWRNYW5hZ2VyIGZyb20gXCIuL0ZCQWRNYW5hZ2VyXCI7XG53aW5kb3dbXCJGQkFkTWFuYWdlclwiXSA9IEZCQWRNYW5hZ2VyOyJdfQ==