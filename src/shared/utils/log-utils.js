"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogUtils = /** @class */ (function () {
    function LogUtils() {
    }
    LogUtils.debug = function (msj) {
        console.log("----------------------------------------------");
        console.log("..............................................");
        console.log(".... " + msj);
        console.log("..............................................");
        console.log("----------------------------------------------");
    };
    LogUtils.inspect = function (object) {
        console.log("----------------------------------------------");
        console.log("..............................................");
        console.dir(object);
        for (var prop in object) {
            console.dir(prop);
        }
    };
    return LogUtils;
}());
exports.LogUtils = LogUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFBQTtJQXlCQSxDQUFDO0lBdkJpQixjQUFLLEdBQW5CLFVBQW9CLEdBQUc7UUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBRSxnREFBZ0QsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUUsZ0RBQWdELENBQUMsQ0FBQztRQUUvRCxPQUFPLENBQUMsR0FBRyxDQUFFLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUU1QixPQUFPLENBQUMsR0FBRyxDQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBRSxnREFBZ0QsQ0FBQyxDQUFDO0lBRWpFLENBQUM7SUFFYSxnQkFBTyxHQUFyQixVQUFzQixNQUFVO1FBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUUsZ0RBQWdELENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQixHQUFHLENBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFTCxlQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nVXRpbHMge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWcobXNqKSB7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyggXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyggXCIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coIFwiLi4uLiBcIiArIG1zaik7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyggXCIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyggXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3BlY3Qob2JqZWN0OmFueSl7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyggXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyggXCIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG4gICAgICBjb25zb2xlLmRpcihvYmplY3QpO1xyXG5cclxuICAgICAgZm9yKGxldCBwcm9wIGluIG9iamVjdCl7XHJcbiAgICAgICAgICBjb25zb2xlLmRpcihwcm9wKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==