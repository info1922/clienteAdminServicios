import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form = new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('', Validators.required)
    });

    constructor() { }

    ngOnInit() {
    }

}
