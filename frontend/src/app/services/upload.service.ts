import { Injectable } from '@angular/core';


@Injectable()
export class UploadService {
  
 


  constructor( ) {}

  // Usamos metodo convencional ajax para subir el fichero esto estará en el servicio también
  makeFileRequest(url:string, token:string, params:Array<string>, files:Array<File>, name: string){
    
    return new Promise((resolve, reject )=>{
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();

      for(let i=0; i < files.length; i++){
        formData.append(name, files[i], files[i].name)
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status === 200) {
            resolve( JSON.parse(xhr.response) );
          }
          else{
            reject( xhr.response );
          }
        }
      }

      xhr.open('POST', url, true );
      xhr.setRequestHeader('Authorization', token );
      xhr.send(formData);
    })
  }

}

