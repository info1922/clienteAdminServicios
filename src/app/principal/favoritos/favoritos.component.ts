import { Component, OnInit } from '@angular/core';
import { FavoritosService } from './favoritos.service';
import { WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

    favoritos: any;
    constructor(
        public favService: FavoritosService,
        public wsService: WebsocketService) {
    }

    ngOnInit() {
        this.getFavoritos();
        /* this.escucharSocket(); */

        this.favService.escucharFavoritos().subscribe((msg: any) => {
            /* console.log('Favoritos, ', msg.neFav); */
            this.favoritos = msg.neFav;
        });

    }



   /*  escucharSocket() {
        this.wsService.escuchar('favoritos')
            .subscribe((data: any) => {
                console.log('La data del socket: ', data);
                this.favoritos = data;
            });
    } */

    getFavoritos() {
        this.favService.getAllFavoritos().subscribe( (res: any) => {
            /* console.log('Respuesta del servicio: ', res.favoritos); */
            this.favoritos = res.favoritos;
        });
    }

}
