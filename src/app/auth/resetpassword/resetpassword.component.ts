import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ResetpasswordService } from './resetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
    valor = false;
    form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }, {
    // validators: this.MatchPassword
    });

    constructor(public route: Router, public resetService: ResetpasswordService) { }

    sonIguales(val1: string, val2: string) {
        return(group: FormGroup) => {

            const password1 = group.controls[val1].value;
            const password2 = group.controls[val2].value;

            if (password1 === password2) {
                    return  null;
            }

            return {
                mensaje: 'Son diferentes',
                sonIguales: true
            };

        };
      }

    ngOnInit() {
            this.form = new FormGroup({
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            passwordConfirm: new FormControl(null, Validators.required)
        }, {
            validators: this.sonIguales('password', 'passwordConfirm')
        // validators: this.MatchPassword
        });
    }

    onSubmit() {
        if (this.form.value.password !== this.form.value.passwordConfirm) {
            this.valor = true;
            return false;
        } else {
            const cadena = this.route.url.split('/');
            const email = cadena.pop();

            this.valor = false;

            const body = {
                formulario: this.form.value,
                email
            };

            this.resetService.restorepassword(body).subscribe((res: any) => {
                console.log('Respuesta del servidor: ', res);
            });
            return true;
        }
    }


}
