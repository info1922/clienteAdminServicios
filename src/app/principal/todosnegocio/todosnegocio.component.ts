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
    estatusG = undefined;
    negocios: any;
    admins: any [] = [];
    usuario: any;
    superusuario = 'super';
    favoritosEnUsuario: any;
    constructor(
        public nego: NegocioService,
        public todosNegocios: TodosnegociosService,
        public wsService: WebsocketService,
        public jwtService: JwtService,
        public favService: FavoritosService) {

            /* console.log(this.usuario._id); */
        }

    ngOnInit() {
        // this.negocios = this.nego.negocios;
        this.usuario = JSON.parse(this.jwtService.getUser());
        this.Negocios();
        this.escucharSocket();
        console.log('Usuario en ngOninit: ', this.usuario);


    }

    escucharSocket() {
        this.wsService.escuchar('negocios')
            .subscribe((data: any) => {
                this.negocios = data;

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

    agregarFavorito(negocio: any, index: any) {
        // this.Negocios();
        const idU = this.usuario._id;
        // console.log('Servidor agreFav: ', {negocio, index, idU});
        const verificaU = negocio.favoritesUser.find(id =>  id === this.usuario._id);
        // console.log(verificaU);


        const es = [];

        this.todosNegocios.agregarFavorito(negocio._id).subscribe((res: any) => {
            console.log('Servidor agreFav: ', res);
            this.Negocios();
            this.usuario = JSON.parse(this.jwtService.getUser());
            console.log('Usuario agreFav: ', this.usuario);
        });
    }



    quitFavorito(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
            this.usuario = JSON.parse(this.jwtService.getUser());
            this.Negocios();
            console.log('Usuario quitFav: ', this.usuario);
        });
    }

    quitFavoritoFavoritosComponente(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
        });
    }




}
