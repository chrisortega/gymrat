import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu2Component } from "./menu2/menu2.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gymrat';
}
