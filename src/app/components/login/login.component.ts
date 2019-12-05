import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public servi: ChatService) { }

  ngOnInit() {
  }

  autentica(proveedor: string) {
    console.log(proveedor);
    this.servi.login(proveedor);
  }

}
