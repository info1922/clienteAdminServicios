import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {


    form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    }, {
    // validators: this.MatchPassword
    });

  constructor( public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.authService.resetlink(this.form.value).subscribe((data: any) => {
        console.log('Data: ', data);
    }, error => {
        console.log(error.error.mensaje);
    });
  }

}
