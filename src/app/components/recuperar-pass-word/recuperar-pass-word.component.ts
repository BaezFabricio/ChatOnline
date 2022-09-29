import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-recuperar-pass-word',
  templateUrl: './recuperar-pass-word.component.html',
  styleUrls: ['./recuperar-pass-word.component.css']
})
export class RecuperarPassWordComponent implements OnInit {
  recuperarUsuario:FormGroup;
  loading:boolean = false;


  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router: Router,
    private firebaseError: FirebaseCodeErrorService    
  ) { 
    this.recuperarUsuario = this.fb.group({
      correo: ['',[Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }


  recuperar() {
    const email = this.recuperarUsuario.value.correo;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {

      this.toastr.info('Le enviamos un correo a su gmail para restablecer su password','Recuperar Password' );
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.CodeErrors(error.code) , 'error');
    })
  }
}
