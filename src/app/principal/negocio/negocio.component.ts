import { Component, OnInit } from '@angular/core';
import { NegocioService } from './negocio.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Negocio } from '../../core/models/negocio';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent implements OnInit {
    form: FormGroup;
    /* Categorias de negocios */
    categoria = ['Alimentos y bebidas', 'Articulos de belleza', 'Licores', 'Ropa'];

    constructor(public negocioService: NegocioService) {

        /* Definicion del formulario */
        this.form = new FormGroup({
            nombre: new FormControl('', Validators.required),
            categoria: new FormControl(null),
            direccion: new FormControl(null),
            telefono: new FormControl(null),
            facebook: new FormControl(null)
        });

     }


    ngOnInit() {
    }

    onSubmit() {
        const negocio = new Negocio(
            this.form.value.nombre,
            this.form.value.categoria,
            this.form.value.direccion,
            this.form.value.telefono,
            this.form.value.facebook,
        );
        /* console.log('Datos del negocio: ', negocio); */

        this.negocioService.nuevoNegocio(negocio).subscribe();
    }


}
