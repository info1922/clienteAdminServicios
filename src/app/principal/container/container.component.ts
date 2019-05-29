import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../core/services/jwt.service';
import { ContainerService } from './container.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(
      public jwtService: JwtService,
      public con: ContainerService,
      public toas: ToastrService) { }

    usuarioTipo: any;
    ngOnInit() {
        this.usuarioTipo = this.permiso();
    }

    permiso() {
        const usuario = JSON.parse(this.jwtService.getUser());
        return usuario.role;
    }

}
