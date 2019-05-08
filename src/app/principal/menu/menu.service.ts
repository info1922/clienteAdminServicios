import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { PerfilService } from '../perfil/perfil.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  usuario: any;
  constructor(public perfilservice: PerfilService) {

    // this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.usuario = this.perfilservice.usuario;
  }

  // this.cargarStorage();
}
