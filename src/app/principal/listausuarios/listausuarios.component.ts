import { Component, OnInit } from '@angular/core';
import { ListausuariosService } from './listausuarios.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-listausuarios',
    templateUrl: './listausuarios.component.html',
    styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

    usuariosActivosObsUser: Observable<any>;
    usuariosActivosObsAdmin: Observable<any>;
    usuariosActivosObsSuper: Observable<any>;
    usuariosActivosObsCliente: Observable<any>;

    constructor(public lista: ListausuariosService) { }

    ngOnInit() {
        this.usuariosActivosObsUser = this.lista.getUsuariosActivosUser();
        this.usuariosActivosObsAdmin = this.lista.getUsuariosActivosAdmin();
        this.usuariosActivosObsSuper = this.lista.getUsuariosActivosSuper();
        this.usuariosActivosObsCliente = this.lista.getUsuariosActivosCliente();

    }

}
