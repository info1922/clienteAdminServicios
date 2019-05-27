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
            console.log('Cambios de favoritos');
            this.favoritos = msg.neFav;
            console.log(this.favoritos);
        });
    }

    getFavoritos() {
        this.favService.getAllFavoritos().subscribe( (res: any) => {
            this.favoritos = res.favoritos;

        });
    }

    quitFavorito(id: any) {
        this.favService.quitarFavorito(id).subscribe((res: any) => {
            this.favService.escucharFavoritos().subscribe((msg: any) => {
                this.todosNeg.Negocios();
                this.favoritos = msg.neFav;
                console.log(this.favoritos);
            });
        });
    }

}
