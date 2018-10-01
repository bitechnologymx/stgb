import { HttpHeaders } from "@angular/common/http";

export class LogUtils {

    public static debug(msj) {

      console.log( "----------------------------------------------");
      console.log( "..............................................");

      console.log( ".... " + msj);

      console.log( "..............................................");
      console.log( "----------------------------------------------");

    }

    public static inspect(object:any){

      console.log( "----------------------------------------------");
      console.log( "..............................................");
      console.dir(object);

      for(let prop in object){
          console.dir(prop)
      }
    }

}
