import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['asd@asd.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm);
    console.warn('form sent');
    console.log(this.loginForm.value);

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
