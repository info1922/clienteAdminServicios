import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  loginMensanje: Subscription;
  constructor( public wsService: WebsocketService) { }

  ngOnInit() {
    /* this.loginMensanje = this.wsService.escucharLogin('loginuser').subscribe(msg => {
      console.log('Mensaje del servidor login: ', msg);
    }); */
  }



}
