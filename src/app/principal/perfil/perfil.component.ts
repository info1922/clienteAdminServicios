import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { PerfilService } from './perfil.service';
import { HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../core/models/usuario';
import { WebsocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../core/services/jwt.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuario: any;
  mensajeSus: Subscription;
  nombre: string;
  form: FormGroup;
  // usuario = JSON.stringify(window.localStorage.getItem('usuario'));

  constructor(
    public perfilService: PerfilService,
    public authService: AuthService
    ) {
      this.usuario = this.authService.usuario;

      this.form = new FormGroup({
        nombre: new FormControl(this.usuario.nombre, [Validators.required])
      });
  }



  ngOnInit() {

    /** Cambios retornados por el sevido */
    /* this.mensajeSus = this.perfilService.escucharcambios().subscribe(msg => {
      console.log('Mensaje del servidor: ', msg);
      this.us = msg;
    }); */

  }



  /** Desuscribirse del subscribe  */
  ngOnDestroy() {
    /* this.mensajeSus.unsubscribe(); */
  }



  onSubmit() {
    const nombre = this.form.value;
    this.usuario.nombre = this.form.value;

    this.perfilService.cambiarNombre(nombre).subscribe( resp => {
      // console.log('respuesta: ', resp);
    });

  }

}
