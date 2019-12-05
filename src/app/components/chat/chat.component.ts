import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  element: any;

  // esta variable la llenamos desde el html mediante el input
 mensaje: any = '';
  constructor(private servi: ChatService) {
    Swal.showLoading();
    // para mostrar los mensajes que tenemos en la base de bd
    this.servi.cargarMensajes().subscribe(() => {

      // una ves que recibimos los mensajes le hacemos un scrooll para que se muestren siempre los ultimos mensajes
      setTimeout(() => {
      this.element.scrollTop = this.element.scrollHeight;
          }, 40);
      Swal.close();
    });
  }

  ngOnInit() {
    // hacemos referencia a la clase que tenemos en el html
this.element = document.getElementById('app-mensaje');

  }

  postMensaje() {

if (this.mensaje.length === 0) {
  console.log('debes escribir un mensaje');
  return;
}

this.servi.GuardarMensajes(this.mensaje);
this.mensaje = '';
    // .then( () => this.mensaje = '' )
    // .catch( (err) => console.log('Error al enviar mensaje', err ));
  }
}
