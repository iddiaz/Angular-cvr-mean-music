import { User } from './../../models/user.model';
import { UploadService } from '../../services/upload.service';
import { AlbumService } from './../../services/album.service';
import { NgForm } from '@angular/forms/src/directives';
import { Artist } from './../../models/artist.model';
import { UserService } from './../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Album } from './../../models/album.model'

// uso de jQuery 
declare let $: any;

@Component({
  selector: 'app-detalle-artista',
  template: ` 
  <div class="jumbotron imgBack" *ngIf="artist" [ngStyle]="{'background-image': 'url(http://localhost:3000/api/get-image-artist/'+artist.image+')' }">
      <h1 class="display-3 red text-center">{{artist.name}}</h1>
      <p class="lead">{{artist.description}}</p>
      <hr class="my-4">
      <p>Lorem sum dolor let artist!!</p>
        <p class="lead">
        <button class="btn btn-primary btn-sm" href="#" role="button" (click)="agregarAlbum()">Agregar Album</button>
        </p>
  </div>

  <!--bloque de albums-->
  <div class="container-fluid">
  <div class="card-deck">
    <div class="card mb-3" *ngFor="let album of albums">  
       <div class="imgAlbumBck" [ngStyle]="{'background-image': 'url('+ ( album.image | noPhoto:'imageAlbum' ) +')'} ">
        <div class=" row">
          <div class="col-8 push-5 mt-3 ">
            <button *ngIf="userSession?.role == 'ROLE_ADMIN'" type="button" class="btn btn-success btn-sm" (click)="editarAlbum(album._id)"><i class="fa fa-edit"></i> Editar</button>
            <button *ngIf="userSession?.role == 'ROLE_ADMIN'" type="button" class="btn btn-danger btn-sm" (click)="borrarAlbum(album._id)"><i class="fa fa-trash"></i>Borrar</button>
          </div>
        </div>
      </div>
      <div class="card-block">
        <h4 class="card-title">{{album.title}}</h4>
        <p class="card-text">{{album.description}}</p>
        <button class="btn btn-outline-primary btn-block btn-sm" type="button">Ver más info</button>
      </div>
    </div>
  </div>
</div>    

    <!--Ventana modal controladora de la edición de album-->
    
<div class="modal fade" id="frmModalAlbumEdit" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog" role="document">
   <div class="alert alert-success animated fadeIn" role="alert" *ngIf="message">
      <strong>Muy bien!</strong> {{message}}
    </div>
    <div class="modal-content">
      <div class="modal-header">
        <h5 *ngIf="!isEdit" class="modal-title" id="exampleModalLabel">Añadir nuevo Album</h5>
        <h5 *ngIf="isEdit" class="modal-title" id="exampleModalLabel">Editar el Album</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <!--Aproximacion por template-->       

        <form #formAddAlbum="ngForm" (ngSubmit)="guardarAlbum()"  novalidate>
          <div class="form-group" [ngClass]="{'has-warning': titulo.errors?.required && titulo.touched}">
            <label for="titulo" class="form-control-label">Título del Album:</label>
            <input type="text"
                   name="title"
                   #titulo="ngModel"
                   [(ngModel)]="album.title"                                 
                   class="form-control form-control-warning"
                   required>
                <div *ngIf="titulo.touched && titulo.invalid"
                     class="form-control-feedback small">
                  El titulo es obligatorio
                </div>
          </div>

          <div class="form-group" [ngClass]="{'has-warning': descripcion.errors?.required && descripcion.touched}">
            <label for="titulo" class="form-control-label">Descripción:</label>
            <input type="text"
                   name="description"
                   #descripcion="ngModel"
                   [(ngModel)]="album.description"                                 
                   class="form-control form-control-warning"
                   required>
                <div *ngIf="descripcion.touched && descripcion.invalid"
                     class="form-control-feedback small">
                  La descripción es obligatoria
                </div>
          </div>

          <div class="form-group" [ngClass]="{'has-warning': anio.errors?.required && anio.touched}">
            <label for="titulo" class="form-control-label">Año:</label>
            <input type="number"
                   name="year"
                   #anio="ngModel"
                   [(ngModel)]="album.year"                                 
                   class="form-control form-control-warning"
                   required>
                <div *ngIf="anio.touched && anio.invalid"
                     class="form-control-feedback small">
                  El año es obligatorio
                </div>
          </div>
          <div class="form-group" *ngIf="isEdit">
            <label for="description" class="form-control-label">Imagen del Album:</label><br>
            <img class="img-thumbnail imgEdit" [src]="urlImagenAlbum" alt="">
          </div>
          <div class="form-group">
            <label for="titulo" class="form-control-label">Imagen de Album:</label>
            <input type="file"
                   name="image"
                   (change)="fileEvent($event)"                               
                   class="form-control form-control-warning">
          </div>
    
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="closeAndUpdate()">Cerrar</button>
            <button *ngIf="!isEdit" type="submit" class="btn btn-primary">Guardar album</button>
            <button *ngIf="isEdit" type="button" (click)="actualizarAlbum()" class="btn btn-success">Actualizar el album</button>
            <!--{{formArtist.valid | json}}-->
          </div>
        </form>

      </div>
    </div>
  </div>
</div>
  `,

  styles: [`
  .imgBack{      
     background: no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    height: 600px;
    opacity: .9; 
  }
  .imgAlbumBck {
    height: 280px;
    background-repeat: no-repeat;
    background-position: center, center;
    background-size: cover;  
  }
  .card{
  max-width: 318px;
  min-width: 318px;
  margin: 0px;
  padding: 0px;
  }
  .imgEdit{
    width: 300px !important;
  }


  @media (min-width: 576px){
    .card-deck .card:not(:first-child) {
        margin-left: 0px; 
    }
  
    .card-deck .card {
      flex: inherit;
    }
  }
  `]
})
export class DetalleArtistaComponent implements OnInit {
  userSession: User = this.userService.getStoredUSer();
  userToken: string = this.userService.getStoredToken();
  artist: Artist;
  album: Album = {    
    title: null,
    description: null,
    year: null,
    image: null,
    artist: null
  };
  albums: Album [];
  message: string;
  archivoASubir: any;
  urlImageToUpload: string;
  urlImagenAlbum: string;
  isEdit: boolean = false;
  albumImageName: string;

  constructor( private activatedRoute: ActivatedRoute,
               private artistService: ArtistService, 
               private userService: UserService,
               private albumService: AlbumService,
               private uploadService: UploadService ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( res =>{
    
      this.artistService.getArtist(this.userToken, res.idArtist).subscribe( res=> {
        this.artist = res;
        this.album.artist = this.artist._id;

        if( this.artist ){
          this.albumService.getAlbums(this.userToken, this.artist._id).subscribe( res =>{
            // console.log('desde el componente',res);
            this.albums = res;
          } );          
        }
      })
    });

  }

  agregarAlbum(){
     $('#frmModalAlbumEdit').modal('show');
  }

  closeAndUpdate(){
     $('#frmModalAlbumEdit').modal('hide');
     setTimeout(() => {
       window.location.reload();
     },500);
  }

  guardarAlbum(){ 
    
    this.albumService.saveAlbum( this.userToken, this.album ).subscribe( res => {
      // console.log(res);
      
      if(res.status === 200) {
        
        this.message = 'El album se ha creado correctamente';

        this.album = res.album;
        let idAlbum = res.album._id;

        if(this.archivoASubir){
          let url = `${this.artistService.urlPpal}/upload-image-album/${idAlbum}`

          this.uploadService.makeFileRequest(url, this.userToken,[], this.archivoASubir, 'image')
            .then( res => {

              this.albumService.getAlbums(this.userToken, this.artist._id).subscribe( res => {
                // console.log('albums recibidos despues de la peticion guardar',res);
              })

            })
            .catch(error => console.log(error));
        }
        
      }
    });

  }

  // captura evento del archivo a subir
  fileEvent( event : any ) {
    this.archivoASubir = <Array<File>>event.target.files;
    console.log('LOQUE SE VA A SUBIR',this.archivoASubir);
  }

  editarAlbum(albumId){

    this.albumService.getAlbum(this.userToken, albumId).subscribe( res => {
      this.album = res;
      this.urlImagenAlbum = `${this.artistService.urlPpal}/get-image-album/${this.album.image}`;
      this.isEdit = true;
      
      $('#frmModalAlbumEdit').modal('show');
    });
  }

  borrarAlbum(albumId){
    this.albumService.deleteAlbum(this.userToken, albumId).subscribe();
  }

  actualizarAlbum(){

    this.albumService.setUpdateAlbum(this.userToken, this.album).subscribe();
   
    if(this.archivoASubir){
      let url = `${this.artistService.urlPpal}/upload-image-album/${this.album._id}`

      this.uploadService.makeFileRequest(url, this.userToken,[], this.archivoASubir, 'image')
        .then( res => {
          console.log('el resultado en el then es', res);

        })
        .catch(error => console.log(error));
    } 
   
  }

}
