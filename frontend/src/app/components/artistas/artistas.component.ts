
import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { Artist } from './../../models/artist.model';
import { ArtistService } from './../../services/artist.service';
import { Router } from '@angular/router';

//Para poder trabajar con jquery bien.
declare let $: any;

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {
  
  userSession: User = this.userService.getStoredUSer();
  userToken: string = this.userService.getStoredToken();
  title: string = 'Artistas';
  artist: Artist = {
    name: null,
    description: null,
    image: null
  };
  urlImageArtist = `${this.artistService.urlPpal}/get-image-artist/`;
  page: string;
  


  constructor(private userService: UserService, private artistService: ArtistService, private router: Router) { }

  ngOnInit() {
    this.artistService.getArtists( this.userToken, this.page ).subscribe();

  }

  formModalArtista(){   
    $('#frmModalArtist').modal('show')
  }

  guardarArtista(){
        
    this.artistService.saveArtist(this.userToken, this.artist ).subscribe( 
      res=>{
        let artist = res;
        if(artist.image === null){
          console.log('LAIMAGEN ES NULA');
        }
        console.log('Artista guardado', artist );
        $('#frmModalArtist').modal('hide');
        
      },
      error=>{
        console.error(error);
      });

  }

  editarArtista(idArtist){
    this.artistService.editArtist(idArtist);

  }

  borrarArtista( idArtist ){
    this.artistService.deleteArtist( this.userToken, idArtist).subscribe();
  }

  verDetalleArtista(id){
    // console.log(id);
    this.router.navigate(['/detalle-artista', id])
  }

}
