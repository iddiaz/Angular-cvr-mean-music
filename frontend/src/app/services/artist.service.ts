import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operator/map';
import { Artist } from './../models/artist.model';
import { Router } from '@angular/router';


@Injectable()
export class ArtistService {
  urlPpal: string;
  artistas: Artist[] = [];
  artist: Artist;


  constructor(private http: Http, private config: ConfigService, private router: Router) { 
    // console.log('artistasService Activo');
    this.urlPpal = this.config.GLOBAL.url;
  }

  // guardar artista en bd
  saveArtist(token, dataArtist: Artist){
    let url = `${this.urlPpal}/artist`;
    let body = JSON.stringify(dataArtist);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    })

    return this.http.post(url, body, {headers }).map( res => {
      // console.log( 'la respuesta ',res.json().artist);
       return res.json().artist;
    })
  }

  // Obtiene todos los artistas
  getArtists(token, page? ){
    let url = `${this.urlPpal}/artists/${page}`;
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    return this.http.get(url, {headers}).map(res => {
      this.artistas = res.json().artists;
     console.log('respuesta de getArtistas en servicio',this.artistas);
    })

  }


  // obtiene un artista
  getArtist(token, artistId: string ){
    let url = `${this.urlPpal}/artist/${artistId}`;
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    return this.http.get(url, {headers}).map(res => {
      return this.artist = res.json().artist;
      // console.log('respuesta de getArtista',this.artist);
    })

  }



  editArtist(idArtist){
    // metodo para edicion del artista
    this.router.navigate(['/artista', idArtist])
  }

  setUpdateArtist( token: string, artist: any ){
    //metodo para guardar el artista editado en bbdd
    let url = `${this.urlPpal}/artist/${artist._id}`;
    let body = JSON.stringify(artist);
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    });
    return this.http.put(url, body, {headers}).map(res => {
      return {
        artist : res.json().artist,
        status: res.status
      } 
    })
  }

  // Elimina un artista
  deleteArtist(token , idArtist){
    let url = `${this.urlPpal}/artist/${idArtist}`;
    
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    });

    // console.log('BORRAR ',token, idArtist);
    return this.http.delete(url, {headers}).map(res => {
      console.log(res);
      location.reload()

    } )
  }



}
