import { Injectable } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(public wsService: WebsocketService) { }

}
