import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private authService: AuthService
    ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);

    this.authService.loginUser( this.loginForm.value ).subscribe( resp => {
      console.log(resp);
    }, (error) => {
      console.log(error.error.error.message);
    });

  }

  // Standar validations
  requiredValidation( control ) {
    if ( this.loginForm.get(control).touched && 
        (this.loginForm.get(control).errors && this.loginForm.get(control).errors.required) 
    ) {
      return true;
    } 

    return false;
  }

}
