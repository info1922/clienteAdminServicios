import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../core/models/usuario';
import { AuthService } from '../../core/services/auth.service';
import {AbstractControl} from '@angular/forms';
import {Chance} from 'chance';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   ra = new Chance();
    form = new FormGroup({
      correo: new FormControl('algo@algo.com', [Validators.required, Validators.email]),
      role: new FormControl(null, [Validators.required]),
      nombre: new FormControl(this.ra.string({length: 9}), [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, Validators.required)
  }, {
  // validators: this.MatchPassword
  });


    constructor(
      public autService: AuthService,
      public router: Router) { }

      errorR = true;
      roles = ['user', 'admin', 'super'];
    ngOnInit() {

    }



    soniguales(val1: string, val2: string) {
      return(group: FormGroup) => {
        const password1 = group.controls[val1].value;
        const password2 = group.controls[val2].value;

        console.log(password1);
        console.log(password2);
        if (password1 === password2) {
          return  null;
        }
        return {
          sonIguales: true
        };
      };
    }

    onSubmit() {
      const usuario = new Usuario(
        this.form.value.correo,
        this.form.value.role,
        this.form.value.nombre,
        this.form.value.password
      );

      console.log(this.form.value);

      this.autService.registro(usuario)
        .subscribe( data => {
          this.router.navigate(['login']);
          console.log(data);
        }, err => {
          this.errorR = false;
          console.log(err);
        });
    }


}
