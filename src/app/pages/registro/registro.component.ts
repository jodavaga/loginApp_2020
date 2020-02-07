import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  usuario: UsuarioModel;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {

   }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    // Initialize form
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {

    if ( !this.registroForm.valid ) {
      return;
    }
    // Fills user info with form values
    this.usuario = this.registroForm.value;

    // Subscribe to service creating new user
    this.authService.createNewUser(this.usuario).subscribe( resp => {
      console.log(resp);
    }, (error) => {
      console.log(error.error.error.message);
    });
  }

  // Standar validations
  requiredValidation( control ) {
    if ( this.registroForm.get(control).touched && 
        (this.registroForm.get(control).errors && this.registroForm.get(control).errors.required) 
    ) {
      return true;
    } 

    return false;
  }


}
