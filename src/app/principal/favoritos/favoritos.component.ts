import { Component, OnInit } from '@angular/core';
import { FavoritosService } from './favoritos.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { TodosnegocioComponent } from '../todosnegocio/todosnegocio.component';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

    favoritos: any;
    constructor(
        public favService: FavoritosService,
        public wsService: WebsocketService,
        public todosNeg: TodosnegocioComponent) {
    }

    ngOnInit() {
        this.getFavoritos();

        this.favService.escucharFavoritos().subscribe((msg: any) => {
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

    quitFavorito(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
            this.todosNeg.Negocios();
        });
    }

}
