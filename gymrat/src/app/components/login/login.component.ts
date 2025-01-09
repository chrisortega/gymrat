import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,

})
export class LoginComponent {
  
  username:string  = ''
  password:string = ''

constructor(private api:ApiService, private auth: AuthService){}

  onLogin(){
    console.log(this.username,this.password)
    this.api.login(this.username,this.password).subscribe(response=>{
      this.auth.logout()
      this.auth.clear()
      this.auth.login(response["access_token"])
      
      this.auth.setVariables({
        userId: response.userId,
        email: response.email,
        image: response.image,
        gym_name: response.gym_name,  
        gym_id: response.gym_id, 
        
      })
      window.location.replace('/')
    })

  }
}
