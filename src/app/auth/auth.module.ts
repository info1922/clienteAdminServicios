import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ResetpasswordComponent],
  providers: [LoginComponent, RegisterComponent, PasswordComponent]
})
export class AuthModule { }
