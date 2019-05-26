import { Component, OnInit } from '@angular/core';
import { TodosnegociosService } from './todosnegocios.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { NegocioService } from '../negocio/negocio.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../core/services/jwt.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FavoritosService } from '../favoritos/favoritos.service';
import { ToastrService } from 'ngx-toastr';

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
        public favService: FavoritosService,
        public toastService: ToastrService) {

            /* console.log(this.usuario._id); */
        }

    ngOnInit() {
        // this.negocios = this.nego.negocios;
        this.usuario = JSON.parse(this.jwtService.getUser());
        this.Negocios();
        this.escucharSocket();
        this.escucharMensajeEliminado();
        this.escucharMensajeEliminacionPersonal();
        this.escucharMensajeLike();
       /*  console.log('Usuario en ngOninit: ', this.usuario); */


    }

    escucharSocket() {
        this.wsService.escuchar('negocios')
            .subscribe((data: any) => {
                this.negocios = data;

            });
    }

    escucharMensajeEliminado() {
        this.wsService.escuchar('mensajeEliminacion')
            .subscribe((data: any) => {
                console.log('Mensaje: ', data);
            });
    }

    escucharMensajeEliminacionPersonal() {
        this.wsService.escuchar('mensajepersonal')
            .subscribe((data: any) => {
                this.toastService.warning(`${data.msg}`, ' ' , {
                    positionClass: 'toast-top-right',
                    timeOut: 5000,
                    progressBar: true,
                    closeButton: true
                });
            });
    }
    escucharMensajeLike() {
        this.wsService.escuchar('mensajepersonallike')
            .subscribe((data: any) => {
                this.toastService.info(`${data.msg}`, ' ',  {
                    positionClass: 'toast-top-right',
                    timeOut: 5000,
                    progressBar: true,
                    closeButton: true
                });
            });
    }

    Negocios() {
        this.todosNegocios.obtenerNegocios().subscribe((resp: any) => {
            this.negocios = resp;
        });
    }

    eliminarItem(negocio: any) {
        this.todosNegocios.eliminarNegocio(negocio).subscribe((resp: any) => {
        });

    }

    agregarFavorito(negocio: any, index: any) {
        // this.Negocios();
        const idU = this.usuario._id;
        // console.log('Servidor agreFav: ', {negocio, index, idU});
        const verificaU = negocio.favoritesUser.find(id =>  id === this.usuario._id);
        // console.log(verificaU);


        const es = [];

        this.todosNegocios.agregarFavorito(negocio._id).subscribe((res: any) => {
            /* console.log('Servidor agreFav: ', res); */
            this.Negocios();
            this.usuario = JSON.parse(this.jwtService.getUser());
            /* console.log('Usuario agreFav: ', this.usuario); */
        });
    }



    quitFavorito(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
            this.usuario = JSON.parse(this.jwtService.getUser());
            this.Negocios();
            /* console.log('Usuario quitFav: ', this.usuario); */
        });
    }

    quitFavoritoFavoritosComponente(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
        });
    }

    like(id: any) {
        this.todosNegocios.like(id).subscribe((res: any) => {
            this.usuario = JSON.parse(this.jwtService.getUser());
            this.Negocios();
        });
    }

    dislike(id: any) {
        this.todosNegocios.dislike(id).subscribe((res: any) => {
            this.usuario = JSON.parse(this.jwtService.getUser());
            this.Negocios();
        });
    }

}
