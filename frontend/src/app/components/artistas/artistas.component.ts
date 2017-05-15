
import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {
  
  userSession: User = this.userService.getStoredUSer();
  title: string = 'Artistas';
  artist: Object = {
    name: null,
    description: null,
    image: null
  };
  


  constructor(private userService: UserService) { }

  ngOnInit() {}

  formModalArtista(){   
    $('#frmModalArtist').modal()
  }

  guardarArtista( dataForm: NgForm ){
    console.log('enviando artista', dataForm);
    console.log('enviando artista', dataForm.value);
    console.log('enviando artista', this.artist);
  }

}
