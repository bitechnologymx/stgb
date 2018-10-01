import { HttpHeaders } from "@angular/common/http";

export class HttpUtils {

    public static getWsUrl() {
        return "https://baas.kinvey.com/rpc/kid_r1K1IHGAM/custom";
        //return "http://216.250.114.107:8080/st";
    }

    // Headers para get
    public static createRequestHeaderGet() : HttpHeaders {
        let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Basic a2lkX3IxSzFJSEdBTTozNWJjNTE0YTIyNzE0MzczYWRmZmMxMGU2YzU3MTgwYg==")
        .set("X-Kinvey-API-Version","3")
        ;
        return headers;
    }

    // Headers para post
    public static createRequestHeaderPost() : HttpHeaders {
        let headers = new HttpHeaders()
        .set("Authorization", "Basic a2lkX3IxSzFJSEdBTTozNWJjNTE0YTIyNzE0MzczYWRmZmMxMGU2YzU3MTgwYg==")
        .set("X-Kinvey-API-Version","3")
        ;
        return headers;
    }

    /**public static createRequestHeaderPost() : HttpHeaders {
        let headers = new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")
        .set("Authorization", "Basic a2lkX3IxSzFJSEdBTTozNWJjNTE0YTIyNzE0MzczYWRmZmMxMGU2YzU3MTgwYg==")
        .set("X-Kinvey-API-Version","3")
        ;
        return headers;
    }*/

    /*
    public static createRequestHeaderPost() : HttpHeaders {
        let headers = new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Content-Length", "length")
        ;
        return headers;
    }
    */

}
