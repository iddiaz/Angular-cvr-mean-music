import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
  <div class="jumbotron">
    <h1 class="display-3">{{title}}</h1>
    <p class="lead">La página que buscas no se encuentra</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p>
  </div>
  `,
  styles: []
})
export class ErrorPageComponent implements OnInit {
  title = 'Error 404!';
  constructor() { }

  ngOnInit() {
  }

}
