import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

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
    // Swal action fired
    this.swalFire('login');

    this.authService.loginUser( this.loginForm.value ).subscribe( resp => {
      Swal.close();
      console.log(resp);
    }, (error) => {
      // Fire authenticaiton error
      this.swalFire('error');
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

  // Swall actions

  swalFire( action ) {
    if (action === 'error') {
      Swal.fire({
        title: 'Error',
        text: 'Informacion incorrecta. Verifique e intente nuevamente',
        icon: 'error',
        showConfirmButton: true,
        allowOutsideClick: false
      });
    } else {
      Swal.fire({
        title: 'Login',
        text: 'Validando informacion',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false
      });
      Swal.isLoading();
    }
  }

}
