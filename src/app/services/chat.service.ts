import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';
// esto lo traemos d la documentacion de angularfire..de la parte de coleccion
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensajes } from '../interfaces/mensajes';
import {map} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensajes>;


  public usuario: Usuario[] = [];
  private chats: Mensajes[] = [];
                                                // para autentificarnos
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
// con esto recibimos e usuraio que hemos registrado
    this.afAuth.authState.subscribe( user => {
     if (!user) {
            console.log('no hay usuario');

            return;
       }

     this.usuario.nombre = user.displayName;
     console.log(this.usuario.nombre);
     this.usuario.uid = user.uid;
     console.log(this.usuario.uid);

   });

  }

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = [];
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensajes>(
      "chats",
      // aqui mandamos un sql para ordenr los mensajes como queeremos
      ref => ref.orderBy("fecha", "desc").limit(9)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensajes[]) => {
        console.log(mensajes);

        // agregamos al principio del arreglo los mensajes
        this.chats = [];
        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        // return this.chats;
        // this.chats = mensaje;
      })
    );
  }

  GuardarMensajes(text: string) {
    const mensaje: Mensajes = {

      nombre: this.usuario.nombre,
      mensaje: text,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    // post message a bd
    return this.itemsCollection.add(mensaje);
  }
}
