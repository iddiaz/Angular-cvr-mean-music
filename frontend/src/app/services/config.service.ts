import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  GLOBAL = {
    url: 'http://localhost:3000/api',
    ip: '127.0.0.1'
  }

  constructor() { }

}
