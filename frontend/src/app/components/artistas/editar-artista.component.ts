import { Artist } from './../../models/artist.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ArtistService } from './../../services/artist.service';
import { UploadService } from './../../services/upload.service';

@Component({
  selector: 'app-editar-artista',
  template: `
  <div class="container mt-5">
    <div class="row">
      <div class="col-8">
          <div class="alert alert-success" role="alert"*ngIf="message">
            <strong>Muy bien!</strong> {{message}}
          </div>
          <h4 class="text-center">Editar Artista</h4>
          <form #formEditArtist="ngForm" (ngSubmit)="saveArtist( formEditArtist )" novalidate>
          <div class="form-group" >
            <label for="name" class="form-control-label">Nombre:</label>
            <input type="text"
                   name="name"
                   [(ngModel)]="artist.name"                                   
                   class="form-control form-control-warning"                    
                   required>
               
          </div>
          <div class="form-group">
            <label for="description" class="form-control-label">Descripción del Artista:</label>
            <textarea class="form-control form-control-warning"
              name="description"
              [(ngModel)]="artist.description"
              required>
            </textarea>         
          </div>

          <div class="form-group" *ngIf="artist.image">
            <label for="description" class="form-control-label">Imagen del Artista:</label><br>
            <img class="imgEdit" [src]="urlImageArtist" alt="">
          </div>

          <label for="image" class="form-control-label">Editar Imagen:</label>
          <input type="file" class="form-control" placeholder="subir Imagen" (change)="setFile($event)">        

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="volver()">Volver</button>
            <button type="submit" class="btn btn-primary" (submit)="saveArtist()">Guardar artista</button>
            <!--{{formArtist.valid | json}}-->
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  styles: [`
   .imgEdit{
     width:400px;
   }
 `]
})
export class EditarArtistaComponent implements OnInit {

  artist: Artist = {
    name: null,
    description: null,
    image: null
  }
  urlImageArtist: string;
  urlImageToUpload: string;
  userToken: string = this.userService.getStoredToken();
  message: string;
  filesToUpload: Array<File>;

  constructor(
    private artistService: ArtistService, 
    private userService: UserService, 
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute, 
    private router: Router ) { }

  ngOnInit() {
    // console.log(this.userToken);
    this.activatedRoute.params.subscribe(res =>{
      let idArtist = res.idArtist;
     
      this.artistService.getArtist(this.userToken, idArtist ).subscribe( res => {
        this.artist = res;
        console.log('EL ARTISTA AL INICO',this.artist);
       
        this.urlImageToUpload = `${this.artistService.urlPpal}/upload-image-artist/${idArtist}`;
        
        if (this.artist.image){
        this.urlImageArtist = `${this.artistService.urlPpal}/get-image-artist/${this.artist.image}`;
      }
        
      });
      
 

    });

  }

  saveArtist(){
   
    this.artistService.setUpdateArtist(this.userToken, this.artist).subscribe( res =>{
      this.artist = res.artist;

      console.log(this.filesToUpload);
        
      if(this.filesToUpload) {
        this.uploadService.makeFileRequest(this.urlImageToUpload, this.userToken,[], this.filesToUpload, 'image')
        .then( result => {
          // console.log( 'resultado de subir el archivo', result );
          // this.artist.image = result.artist.image;
          window.location.reload(); 
        },
        error => console.log(error))

      }
      // la actualizacion de los datos debería ser en tiempo real y dinamica sin recarga de página
      // window.location.reload();     
       

      if(res.status === 200) {
        this.message = 'El artista se ha actualizado corractamente'
      } else {
        this.message = 'Ha ocurrido un error';
      }
    });
  }

  deleteArtist(){
    this.artistService.deleteArtist(this.userToken, this.artist );
    this.router.navigate(['home']);
    // this.router.navigate(['artistas']);
  }

  volver(){
    this.router.navigate(['artistas'])
  }
  
  // recoge valor de imagen adjuntada
  setFile(fileInput: any ){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log('LOQUE SE VA A SUBIR',this.filesToUpload);

  }

}
