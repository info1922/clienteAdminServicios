import { Component, OnInit } from '@angular/core';
import { TodosnegociosService } from './todosnegocios.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { NegocioService } from '../negocio/negocio.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../core/services/jwt.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FavoritosService } from '../favoritos/favoritos.service';

@Component({
    selector: 'app-todosnegocio',
    templateUrl: './todosnegocio.component.html',
    styleUrls: ['./todosnegocio.component.css'],
})
export class TodosnegocioComponent implements OnInit {

    negocios: any;
    admins: any [] = [];
    usuario: any;
    superusuario = 'super';
    constructor(
        public nego: NegocioService,
        public todosNegocios: TodosnegociosService,
        public wsService: WebsocketService,
        public jwtService: JwtService,
        public favService: FavoritosService) {

            this.usuario = JSON.parse(this.jwtService.getUser());
            console.log(this.usuario._id);
        }

    ngOnInit() {
        // this.negocios = this.nego.negocios;
        this.Negocios();
        this.escucharSocket();

    }

    escucharSocket() {
        this.wsService.escuchar('negocios')
            .subscribe((data: any) => {
                this.negocios = data;
                /* console.log('Nueva data: ', data); */
            });
    }

    Negocios() {
        this.todosNegocios.obtenerNegocios().subscribe((resp: any) => {
            this.negocios = resp;
            console.log('Negocios: ', this.negocios);
        });
    }

    eliminarItem(negocio: any) {
        const body = {
            idNegocio: negocio._id,
            idUser: negocio.admin._id
        };

        this.todosNegocios.eliminarNegocio(negocio).subscribe();
        /* console.log('Negocio seleccionado: ', body); */
    }

    agregarFavorito(negocio: any) {
        /* console.log('Negocio seleccionado: ', negocio._id); */
        this.todosNegocios.agregarFavorito(negocio._id).subscribe();
    }

    quitFavorito(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
            /* console.log('Resultado: ', res); */
            // this.escucharSocket();
        });
    }




}
