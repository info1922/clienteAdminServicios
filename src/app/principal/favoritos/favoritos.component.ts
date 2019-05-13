import { Component, OnInit } from '@angular/core';
import { FavoritosService } from './favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

    favoritos: any;
    constructor(public favService: FavoritosService) {
    }

    ngOnInit() {
        this.getFavoritos();

    }

    getFavoritos() {
            this.favService.getAllFavoritos().subscribe( (res: any) => {
            console.log('Respuesta del servicio: ', res);
            this.favoritos = res.favoritos;
        });
    }

}
