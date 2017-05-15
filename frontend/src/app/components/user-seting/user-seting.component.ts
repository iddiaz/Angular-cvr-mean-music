import { ConfigService } from '../../services/config.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-seting',
  templateUrl: './user-seting.component.html',
  styles: []
})
export class UserSetingComponent implements OnInit {

  title: string = 'User Setings';
  userData: any;
  userToken: string;
  formUserSeting: FormGroup;
  paternMailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  alertMessage: string;
  isShow: boolean = true;
  filesToUpload: any;

  url: string;
  urlGetImage: string;




  constructor( private userService: UserService, private config: ConfigService ) {

    this.userData = this.userService.getStoredUSer();
    this.userToken = this.userService.getStoredToken();
    this.url = `${this.config.GLOBAL.url}/upload-image-user/${this.userData._id}`;
    this.urlGetImage = `${this.config.GLOBAL.url}`;
    
    if( this.userData){
      this.formUserSeting = new FormGroup ({
      '_id': new FormControl (this.userData._id),
      'token': new FormControl(this.userToken),
      'name': new FormControl(this.userData.name, Validators.required),
      'surname': new FormControl(this.userData.surname, Validators.required ),
      'email': new FormControl(this.userData.email , [
          Validators.required,
          Validators.pattern(this.paternMailValidation)
          ]),
      // 'image': new FormControl (this.filesToUpload)
      // 'password': new FormControl('', [Validators.required, Validators.minLength(4)] ),
      // 'passwordSim': new FormControl()

    })

    }

   }

  ngOnInit() {

  }

  updateUser( ){

    this.userService.updateUser( this.formUserSeting.value ).subscribe(
      res => {

        this.userData = res;       
        this.userService.setStoredUser(this.userData);
        console.log('Datos de usuario',this.userData);
        this.userService.settingUserProfile$(this.userData);
        // Si la BBDD no devuelve el objeto actualizado directamnte, tendríamos que setearlo previamiente en el localstorage de este modo
        // this.userService.setStoredUser(this.formUserSeting.value);
 

        if(this.filesToUpload){

          this.makeFileRequest(this.url, [], this.filesToUpload )
            .then((res: any) =>{
                this.userData.image = res.image;
                this.userService.setStoredUser(this.userData);
                this.userData = this.userService.getStoredUSer();
                
                // document.getElementById('imgProfile').setAttribute('src', this.urlGetImage +'/get-image-user/'+this.userData.image );
                this.userService.settingUserProfile$( this.userData);
            })
        }

        this.userData = this.userService.getStoredUSer();
        this.alertMessage = 'Datos actualizados correctamente';

      },
      
      error => console.log(error)
    )
  }

  filechangeEvent(fileInput: any ) {
   
    this.filesToUpload = fileInput.target.files; 
    // o tambien => this.filesToUpload =  fileInput.srcElement.files;

    
    
  }
  
  // Usamos metodo convencional ajax para subir el fichero esto estará en el servicio también
  makeFileRequest(url:string, params:Array<string>, files:Array<File>){
    
    return new Promise((resolve, reject )=>{
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();

      for(let i=0; i < files.length; i++){
        formData.append('image', files[i], files[i].name)
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
      xhr.setRequestHeader('Authorization', this.userToken );
      xhr.send(formData);
    })
  }

}
