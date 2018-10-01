"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var HttpUtils = /** @class */ (function () {
    function HttpUtils() {
    }
    HttpUtils.getWsUrl = function () {
        return "https://baas.kinvey.com/rpc/kid_r1K1IHGAM/custom";
        //return "http://216.250.114.107:8080/st";
    };
    // Headers para get
    HttpUtils.createRequestHeaderGet = function () {
        var headers = new http_1.HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", "Basic a2lkX3IxSzFJSEdBTTozNWJjNTE0YTIyNzE0MzczYWRmZmMxMGU2YzU3MTgwYg==")
            .set("X-Kinvey-API-Version", "3");
        return headers;
    };
    // Headers para post
    HttpUtils.createRequestHeaderPost = function () {
        var headers = new http_1.HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")
            .set("Content-Length", "length")
            .set("Authorization", "Basic a2lkX3IxSzFJSEdBTTozNWJjNTE0YTIyNzE0MzczYWRmZmMxMGU2YzU3MTgwYg==")
            .set("X-Kinvey-API-Version", "3");
        return headers;
    };
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBbUQ7QUFFbkQ7SUFBQTtJQXNDQSxDQUFDO0lBcENpQixrQkFBUSxHQUF0QjtRQUNJLE1BQU0sQ0FBQyxrREFBa0QsQ0FBQztRQUMxRCwwQ0FBMEM7SUFDOUMsQ0FBQztJQUVELG1CQUFtQjtJQUNMLGdDQUFzQixHQUFwQztRQUNJLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDO2FBQ3ZDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsd0VBQXdFLENBQUM7YUFDOUYsR0FBRyxDQUFDLHNCQUFzQixFQUFDLEdBQUcsQ0FBQyxDQUMvQjtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELG9CQUFvQjtJQUNOLGlDQUF1QixHQUFyQztRQUNJLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFFLGtEQUFrRCxDQUFDO2FBQ3ZFLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUM7YUFDL0IsR0FBRyxDQUFDLGVBQWUsRUFBRSx3RUFBd0UsQ0FBQzthQUM5RixHQUFHLENBQUMsc0JBQXNCLEVBQUMsR0FBRyxDQUFDLENBQy9CO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBWUwsZ0JBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDO0FBdENZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwVXRpbHMge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0V3NVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9iYWFzLmtpbnZleS5jb20vcnBjL2tpZF9yMUsxSUhHQU0vY3VzdG9tXCI7XHJcbiAgICAgICAgLy9yZXR1cm4gXCJodHRwOi8vMjE2LjI1MC4xMTQuMTA3OjgwODAvc3RcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWFkZXJzIHBhcmEgZ2V0XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJlcXVlc3RIZWFkZXJHZXQoKSA6IEh0dHBIZWFkZXJzIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAgICAgLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJhc2ljIGEybGtYM0l4U3pGSlNFZEJUVG96TldKak5URTBZVEl5TnpFME16Y3pZV1JtWm1NeE1HVTJZelUzTVRnd1lnPT1cIilcclxuICAgICAgICAuc2V0KFwiWC1LaW52ZXktQVBJLVZlcnNpb25cIixcIjNcIilcclxuICAgICAgICA7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVhZGVycyBwYXJhIHBvc3RcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKSA6IEh0dHBIZWFkZXJzIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAgICAgLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOFwiKVxyXG4gICAgICAgIC5zZXQoXCJDb250ZW50LUxlbmd0aFwiLCBcImxlbmd0aFwiKVxyXG4gICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmFzaWMgYTJsa1gzSXhTekZKU0VkQlRUb3pOV0pqTlRFMFlUSXlOekUwTXpjellXUm1abU14TUdVMll6VTNNVGd3WWc9PVwiKVxyXG4gICAgICAgIC5zZXQoXCJYLUtpbnZleS1BUEktVmVyc2lvblwiLFwiM1wiKVxyXG4gICAgICAgIDtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpIDogSHR0cEhlYWRlcnMge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgICAgICAuc2V0KFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpXHJcbiAgICAgICAgLnNldChcIkNvbnRlbnQtTGVuZ3RoXCIsIFwibGVuZ3RoXCIpXHJcbiAgICAgICAgO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuXHJcbn1cclxuIl19