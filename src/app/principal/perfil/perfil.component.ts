import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { PerfilService } from './perfil.service';
import { HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../core/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  // usuario = JSON.stringify(window.localStorage.getItem('usuario'));
  form = new FormGroup({
    nombre: new FormControl(this.perfilService.usuario.nombre, [Validators.required])
  });

  constructor(public perfilService: PerfilService) {
    this.perfilService.cargarStorage();
  }

  ngOnInit() {
   /*  this.usuario = JSON.parse(this.perfilService.cargarStorage()) */
  }

  onSubmit() {
    const nombre = this.form.value;
    /* console.log('Valor form: ', this.form.value); */
    this.perfilService.cambiarNombre(nombre)
      .subscribe( (data: any ) => {
        this.perfilService.guardarStorage(data.usuario);
        /* console.log('DATA: ', data); */
      }, err => {
        console.log('Error: ', err);
      });
  }

}
