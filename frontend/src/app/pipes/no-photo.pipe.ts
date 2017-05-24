import { Pipe, PipeTransform } from '@angular/core';
import { ArtistService } from './../services/artist.service';
import { AlbumService } from '../services/album.service';

@Pipe({
  name: 'noPhoto'
})
export class NoPhotoPipe implements PipeTransform {

  urlArtistImage = `${this.artistService.urlPpal}/get-image-artist`;
  urlAlbumImage = `${this.albumService.urlPpal}/get-image-album`;
  noImage = 'assets/noimage.png';

  constructor(private artistService: ArtistService, private albumService: AlbumService){}

  transform(value: any, args?: any): any {

    // console.log('el valor recivido en el pipe', value);
    // console.log('el valor recivido en el args', args);


    if(!value) {
      return `${this.noImage}`;
    }
    // console.log('URL PARA LA IMAGEN DEL ARTISTA',`${this.urlArtistImage}/${value}`);
    // console.log('URL PARA LA IMAGEN DEL ALBUM',`${this.urlAlbumImage}/${value}`);

    if(value && args === 'imageAlbum') {
      return `${this.urlAlbumImage}/${value}`;
    }
    if (value && args === 'imageArtist') {
      return `${this.urlArtistImage}/${value}`;
    }
   
      
  }

}
