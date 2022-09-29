import { Component, OnInit } from '@angular/core';
import { users } from "src/app/models/users"
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Mensaje } from "src/app/models/interfazmensaje"
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dahsboard',
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements OnInit {
  dataUser: any;
  listaUsers : any = [];
  conectados: any = [];
  itemsCollection: AngularFirestoreCollection<Mensaje>;
  mensaje: string
  elemento: any
  objeUser: any;

  constructor(
    public cs: ChatService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore : AngularFirestore
    ) {
      this.cs.cargarMensajes().subscribe( () => {
        setTimeout( ()=> {this.elemento.scrollTop = this.elemento.scrollHeight}, 20)}  )
     }

  ngOnInit(): void {
    this.elemento = document.getElementById("app-mensajes")
    this.afAuth.currentUser.then(user => {
      if(user) {
        this.dataUser = user;
        this.guardarUser(this.dataUser);
        this.leerUsuarios(this.dataUser);
      }else {
        this.router.navigate(['/login']);
      }
    })
  }

  enviarMensaje(){
    if (this.mensaje.length === 0){
      return;
    }

    this.cs.agregarMensaje(this.mensaje)
    .then( ()=>{this.mensaje = ""} )
    .catch( (err)=>{console.log(alert("err"))} )
  }

  async guardarUser(dataUser: any) {
    const objeUser = {
      email: dataUser.email,
      uid: dataUser.uid,
      conectado: true,
    }

    const saveUser = async (objeUser: any) => {

      const res = this.firestore.collection('user').doc(objeUser.uid).set(objeUser)
      .then( ()=>{console.log(res)} )
      .catch( (err)=>{console.log(err)} )
      console.log(objeUser.uid)
      return res;
    }
    saveUser(objeUser);
  }
  

  leerUsuarios(dataUser: any) {
    const lectura = this.firestore.collection('user').get().toPromise();
    console.log(lectura)
    lectura.then((resp) => {

      const document = resp?.docs;
      for(let objet of document!) {
        let datosUser = new users();
        const dts:any = objet.data();
        datosUser.email = dts.email;
        datosUser.uid = dts.uid;
        datosUser.conectado = true;

        this.listaUsers.push(datosUser);
      }

      let existeUsuario = false;
      for(let unUser of this.listaUsers) {
        if(unUser.email == dataUser.email) {
          existeUsuario = true;
          break
        }
      }
      if(existeUsuario == false){
        this.guardarUser(dataUser);
      }

    }).catch(error => console.log(error));

    return this.listaUsers;
  }

  logOut() {
    const objeUser = {
      email: this.dataUser.email,
      uid: this.dataUser.uid,
      conectado: false
    }

    const saveUser = async (objeUser: any) => {

      const res = this.firestore.collection('user').doc(objeUser.uid).set(objeUser)
      .then( ()=>{console.log(res)} )
      .catch( (err)=>{console.log(err)} )
      console.log(objeUser.uid)
      return res;
    }
    saveUser(objeUser);

    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

}