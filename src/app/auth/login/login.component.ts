import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { JwtService } from '../../core/services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from '../../principal/perfil/perfil.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }, {
    // validators: this.MatchPassword
    });

/*     usuario: any; */

  constructor(
    public authService: AuthService,
    public jwtService: JwtService,
    public router: Router,
    private toastr: ToastrService,
    public perfilService: PerfilService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
    this.authService.login(this.form.value)
      .subscribe((data: any ) => {
          console.log(data);
          this.jwtService.setToken(data.token);
          this.perfilService.guardarStorage(data.user);
          // localStorage.setItem('usuario', JSON.stringify(data.user));
          this.router.navigate(['principal']);
      }, err => {
        this.toastr.error('Correo o contraseña incorrecta', ' ' , {positionClass: 'toast-bottom-center'});
        console.error(err);
      });
  }


}
