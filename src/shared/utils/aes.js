"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha256_1 = require("crypto-js/sha256");
var hmac_sha512_1 = require("crypto-js/hmac-sha512");
var enc_base64_1 = require("crypto-js/enc-base64");
var message = "", nonce = "", path = "", privateKey = "";
var hashDigest = sha256_1.default(nonce + message);
var hmacDigest = enc_base64_1.default.stringify(hmac_sha512_1.default(path + hashDigest, privateKey));
var AESUtils = /** @class */ (function () {
    function AESUtils() {
    }
    return AESUtils;
}());
exports.AESUtils = AESUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXNDO0FBQ3RDLHFEQUErQztBQUMvQyxtREFBMEM7QUFFMUMsSUFBTSxPQUFPLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQzNELElBQU0sVUFBVSxHQUFHLGdCQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLElBQU0sVUFBVSxHQUFHLG9CQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRS9FO0lBQUE7SUFFQSxDQUFDO0lBQUQsZUFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hhMjU2IGZyb20gJ2NyeXB0by1qcy9zaGEyNTYnO1xyXG5pbXBvcnQgaG1hY1NIQTUxMiBmcm9tICdjcnlwdG8tanMvaG1hYy1zaGE1MTInO1xyXG5pbXBvcnQgQmFzZTY0IGZyb20gJ2NyeXB0by1qcy9lbmMtYmFzZTY0JztcclxuXHJcbmNvbnN0IG1lc3NhZ2UgPSBcIlwiLCBub25jZSA9IFwiXCIsIHBhdGggPSBcIlwiLCBwcml2YXRlS2V5ID0gXCJcIjtcclxuY29uc3QgaGFzaERpZ2VzdCA9IHNoYTI1Nihub25jZSArIG1lc3NhZ2UpO1xyXG5jb25zdCBobWFjRGlnZXN0ID0gQmFzZTY0LnN0cmluZ2lmeShobWFjU0hBNTEyKHBhdGggKyBoYXNoRGlnZXN0LCBwcml2YXRlS2V5KSk7XHJcblxyXG5leHBvcnQgY2xhc3MgQUVTVXRpbHMge1xyXG5cclxufVxyXG4iXX0=