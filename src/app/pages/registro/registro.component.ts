import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
              private authService: AuthService,
              private router: Router) {

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
      // Alert fired
      Swal.fire({
        title: 'Registrado',
        text: `Usuario registrado correctamente`,
        icon: 'success',
        allowOutsideClick: false,
        showConfirmButton: false
      });

      this.authService.createToken(resp['idToken']);
      // Alert closed at 1s after successful
      setTimeout(() => {
        console.log(resp);
        Swal.close();
      }, 1000);

    }, (error) => {
      // Alert fired on error
      Swal.fire({
        title: 'Error',
        text: 'Usuario ya existe. Login por favor',
        icon: 'error',
        allowOutsideClick: false,
        showConfirmButton: true
      }).then( e => {
        // Redirected after confirm error
        console.log(e.value);
        if (e.value) {
          console.log(error.error.error.message);
          Swal.close();
          this.router.navigate(['/login']);
        }
      });
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
