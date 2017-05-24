import { NgIf } from '@angular/common/src/directives/ng_if';
import { Artist } from './../../models/artist.model';
import { UserService } from './../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//declaramos el uso de jQuery 
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
          <a class="btn btn-primary btn-sm" href="#" role="button" (click)="agregarAlbum()">Agregar Album</a>
         </p>
    </div>

    <!--Ventana modal controladora del album-->
    
    <div class="modal fade" id="frmModalAlbumEdit" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Añadir nuevo Album</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <!--Aproximacion por template-->       

        <form #formArtist="ngForm" (ngSubmit)="guardarArtista( formArtist )" novalidate>
          <div class="form-group" [ngClass]="{'has-warning': nombre.errors?.required && nombre.touched }">
            <label for="name" class="form-control-label">Nombre:</label>
            <input type="text"
                   name="nombre"
                   [(ngModel)]="artist.name"                                   
                   class="form-control form-control-warning"
                   #nombre="ngModel"  
                   required>
                <div *ngIf="nombre.errors?.required && nombre.touched" 
                     class="form-control-feedback small">
                  El nombre es obligatorio
                </div>
          </div>
          <div class="form-group" [ngClass]="{'has-warning': descripcion.errors?.required && descripcion.touched }">
            <label for="description" class="form-control-label">Descripción del Artista:</label>
            <textarea class="form-control form-control-warning"
              name="description"
              [(ngModel)]="artist.description"
              #descripcion="ngModel"
              required>
            </textarea>
             <div *ngIf="descripcion.errors?.required && descripcion.touched" 
                     class="form-control-feedback small">
                  Este campo es necesario
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="formArtist.invalid">Guardar artista</button>
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
  `]
})
export class DetalleArtistaComponent implements OnInit {

  userToken: string = this.userService.getStoredToken();
  artist: Artist;

  constructor( private activatedRoute: ActivatedRoute, private artistService: ArtistService, private userService: UserService ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( res =>{
      console.log('parametros',res.idArtist);
      this.artistService.getArtist(this.userToken, res.idArtist).subscribe( res=> {
        this.artist = res;
        console.log('EL valor es',this.artist.name);
      })
    })
  }

  agregarAlbum(){
     $('#frmModalAlbumEdit').modal('show');
  }

}
