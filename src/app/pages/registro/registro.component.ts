import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  usuario: UsuarioModel;

  constructor(private formBuilder: FormBuilder) {

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
    console.log( this.registroForm );
    console.warn('Formulario enviado!');
    // Fills user info with form values
    this.usuario = this.registroForm.value;
    console.log( this.usuario );
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
