import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ButikETicaret';
  constructor(public readonly authService:AuthService){
    console.log("app")
    authService.identitiyChech()
  }
}
