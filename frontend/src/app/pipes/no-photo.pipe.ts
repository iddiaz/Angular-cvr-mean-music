import { Pipe, PipeTransform } from '@angular/core';
import { ArtistService } from './../services/artist.service';

@Pipe({
  name: 'noPhoto'
})
export class NoPhotoPipe implements PipeTransform {

  url = `${this.artistService.urlPpal}/get-image-artist`;
  noImage = 'assets/noimage.png';

  constructor(private artistService: ArtistService){}

  transform(value: any, args?: any): any {


    if(!value) {
      return `${this.noImage}`;
    }

    return `${this.url}/${value}`;  
   
      
  }

}
