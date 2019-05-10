import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { JwtService } from '../../core/services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from '../../principal/perfil/perfil.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginc: Subscription;
  us;
    form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }, {
    // validators: this.MatchPassword
    });

  constructor(
    public authService: AuthService,
    public jwtService: JwtService,
    public router: Router,
    private toastr: ToastrService,
    public perfilService: PerfilService,
    public wsService: WebsocketService) { }

  ngOnInit() {

  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }


    this.authService.login(this.form.value)
      .subscribe((data: any ) => {

          this.router.navigate(['principal']);

        // Mandamos el token al servidor
          this.wsService.loginWs(data);

          /* this.wsService.emitir('loginlogin', this.form.value); */
        }, err => {
        this.toastr.error('Correo o contraseña incorrecta', ' ' , {positionClass: 'toast-bottom-center'});
        console.error(err);
      });
  }


}
