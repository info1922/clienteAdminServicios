import { Component, OnInit } from '@angular/core';
import { TodosnegociosService } from './todosnegocios.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { NegocioService } from '../negocio/negocio.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../core/services/jwt.service';
import { trigger, transition, style, animate } from '@angular/animations';

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
        public jwtService: JwtService) {
            // this.Negocios();
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
               /*  console.log('Nueva data: ', data); */
            });
    }

    Negocios() {
        this.todosNegocios.obtenerNegocios().subscribe((resp: any) => {
            this.negocios = resp;
            this.admins = [];

            // tslint:disable-next-line:prefer-for-of
            /* for (const iterator of resp) {
                for (const iterator2 of iterator.admin) {
                    this.admins.push(iterator2);
                }
            } */
            // tslint:disable-next-line:prefer-for-of
            /* for (let index = 0; index < this.negocios.length; index++) {
                const element = this.negocios[index].admin;
                console.log(element);
                this.admins.push(element);

            } */

            /* console.log('Adminst: ', this.admins); */


           /*  console.log(this.admins); */
           /*  this.admins.push(this.negocios); */
            /* console.log('Negocios: ', this.negocios[0].admin.role); */
            /* console.log('Admins :', this.admins); */
        });
    }




}
