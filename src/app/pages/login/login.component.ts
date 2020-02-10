import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router,
              private authService: AuthService
    ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Get email in local storage if checkbox is checked
    if (localStorage.getItem('email')) {
      this.loginForm.get('rememberMe').setValue(true);
      this.loginForm.get('email').setValue(localStorage.getItem('email'));
    }
  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }
    // Swal action fired
    this.swalFire('login');

    // save email to localstorage or delete it if checkbox is unchecked
    if (this.loginForm.get('rememberMe').value) {
      localStorage.setItem('email', this.loginForm.get('email').value);
    } else {
      localStorage.removeItem('email');
    }

    this.authService.loginUser( this.loginForm.value ).subscribe( resp => {
      // Successful response
      Swal.close();
      // Set idToken to localstorage
      console.log(resp);
      localStorage.setItem('idToken', resp['idToken']);
      this.router.navigate(['/home']);
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
      }).then( res => {

        if (res.value) {
          this.loginForm.reset();
        }
      });
    } else {
      Swal.fire({
        title: 'Login',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false
      });
      Swal.showLoading();
    }
  }

}
