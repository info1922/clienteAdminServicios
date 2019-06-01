import { Component, OnInit } from '@angular/core';
import { ListausuariosService } from './listausuarios.service';
import { Observable } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-listausuarios',
    templateUrl: './listausuarios.component.html',
    styleUrls: ['./listausuarios.component.scss']
})
export class ListausuariosComponent implements OnInit {


        usuariosActivosObsUser: Observable<any>;
        usuariosActivosObsAdmin: Observable<any>;
        usuariosActivosObsSuper: Observable<any>;
        usuariosActivosObsCliente: Observable<any>;

        caja = false;
        nombre = null;
        mensaje: string;
        id: string;

    constructor(
        public lista: ListausuariosService,
        public menu: MenuService,
        public app: AppComponent) {

    }

    ngOnInit() {
        this.cargaUsuarios();
        this.lista.obtenerconectados().subscribe( res => {
            console.log('Respuesta: ', res);
        });
    }

    cargaUsuarios() {
        this.usuariosActivosObsUser = this.lista.getUsuariosActivosUser();
        this.usuariosActivosObsAdmin = this.lista.getUsuariosActivosAdmin();
        this.usuariosActivosObsSuper = this.lista.getUsuariosActivosSuper();
        this.usuariosActivosObsCliente = this.lista.getUsuariosActivosCliente();
    }

    data(nombre: string, idDB: string) {
        this.caja = true;
        this.nombre = nombre;
        this.id = idDB;

    }

    enviarPrivado(msg: string) {
        this.lista.enviarprivado(this.id, msg).subscribe(resp => {

        });
    }

}
