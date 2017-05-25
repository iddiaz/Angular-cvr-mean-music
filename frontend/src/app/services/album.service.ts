import { Album } from './../models/album.model';
import { ConfigService } from './config.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operator/map';


@Injectable()
export class AlbumService {

  urlPpal = this.config.GLOBAL.url;
  album: Album;

  constructor(private http: Http, private config: ConfigService) { 
    console.log('servicio de albums cargado');
    console.log(this.urlPpal);
  }

  saveAlbum( token, params ){
   let url = `${this.urlPpal}/album`;
   let body = params;
   let headers = new Headers({
     
     'Authorization': token
   })
   
   return this.http.post(url, body, {headers}).map( res => {
     console.log(res);
     return {
       album : res.json().album,
       status: res.status       
     }
   })

  }

  getAlbums( token: string, idArtist?: string ){
    let url = `${this.urlPpal}/albums/${idArtist}`;
    let body = idArtist;
    let headers = new Headers({
      'Authorization': token
    });

    return this.http.get(url, {headers}).map( res => {
      return res.json().albumsStored;
     
    })
  }

  getAlbum( token: string, idAlbum: string){
    let url = `${this.urlPpal}/album/${idAlbum}`;
    let headers = new Headers({
      'Authorization': token
    })
    return this.http.get(url, {headers}).map( res => {
      return res.json().albumStored;
    
    })
  }

  setUpdateAlbum(token, params){
    let url = `${this.urlPpal}/album/${params._id}`;
    let body = params;
    let headers = new Headers ({
      'Authorization': token
    })

    return this.http.put( url, body, {headers}).map( res => {
      console.log('ACTUALIZACION DE ALBUM', res.json());
    })
  }

  deleteAlbum(token, albumId){
    let url = `${this.urlPpal}/album/${albumId}`;
     
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    });

    return this.http.delete(url, {headers}).map(res => {
      console.log(res);
      location.reload();

    } )
  }

}
