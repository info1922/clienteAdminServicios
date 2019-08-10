import { Component, OnInit } from '@angular/core';
import { TodosnegociosService } from './todosnegocios.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { NegocioService } from '../negocio/negocio.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../core/services/jwt.service';
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
            // this.escucharMensajeEliminado();
        }

    ngOnInit() {
        // this.negocios = this.nego.negocios;
        this.usuario = JSON.parse(this.jwtService.getUser());
        this.escucharSocket();
        this.Negocios();
        this.escucharMensajeEliminacionPersonal();

        // this.escucharMensajeLike();


    }

    escucharSocket() {
        this.wsService.escuchar('negocios')
            .subscribe((data: any) => {
                this.negocios = data;
                this.usuario = JSON.parse(this.jwtService.getUser());
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
                console.log('Mensaje Personal', data);
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
            this.usuario = JSON.parse(this.jwtService.getUser());
        });
    }

    eliminarItem(negocio: any) {
        this.todosNegocios.eliminarNegocio(negocio).subscribe((resp: any) => {
        });

    }

    agregarFavorito(negocio: any, index: any) {

        const idU = this.usuario._id;

        const verificaU = negocio.favoritesUser.find(id =>  id === this.usuario._id);
        const es = [];

        this.todosNegocios.agregarFavorito(negocio._id).subscribe((res: any) => {
            this.Negocios();
            this.usuario = JSON.parse(this.jwtService.getUser());

        });
    }



    quitFavorito(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
            this.Negocios();
            this.usuario = JSON.parse(this.jwtService.getUser());

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
