import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,

})
export class HomeComponent {
  membershipId: string = '';
  checkedUsers: any[] = []; // List of users whose subscriptions were checked
  userFound: boolean = false; // Flag to check if user is found
  checked: boolean = false; // Flag to indicate a check was performed
  entries: any[] = []
  gymId = ""
  currentDateTime: string = "";

  constructor(private api:ApiService, private auth:AuthService, private routes: Router){}

  imageSrc: string | undefined;

  reloadEntries(){
    this.api.getEntriesFromToday(this.gymId).subscribe(entries=>{

      


        this.entries = entries

      
    })
  }

  ngOnInit(){
    var data = this.auth.getGymData()
    this.gymId = data.gym_id.toString()
    this.reloadEntries()

    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
    try {
      this.imageSrc = this.api.bufferToBase64(data.image['data']);    

    } catch (error) {
      
    }
  }


   checkSubscription() {
    this.checked = true; // Indicate a check has been performed

 
    this.api.getUser(this.membershipId).subscribe(user=>{
      if (user) {
        this.userFound = true;
        var exist = this.entries.find((item) => item.users_id === user.id);
        
        if (exist){
          alert("Este usuario ya ingreso hoy")
        }else{
          this.api.addEntry(user.id).subscribe(

            {
              next: (data) => {
                if ('error' in data) {
                  console.log(data.message);
                } else {
                  console.log('Data received:', data);
                  this.reloadEntries()
                }
              },
              error: (err) => {
                alert(err.error)
                console.error('Unexpected Error:', err);
              },
            }

          )  

        }
        //

      } else {
        this.userFound = false;
       alert("Usuario no existe")
      }
  
      // Clear the input field after checking
      this.membershipId = '';
    })


  }

  // Function to check if the expiration date has passed
  isExpired(expirationDate: string): boolean {
    return this.api.isExpired(expirationDate)
  }
  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString('es-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  bufferToBase64(data: any){
    if (data){
      return this.api.bufferToBase64(data)
    }
    return null
    
  }
  goToUser(user_id:string){
    this.routes.navigate(["user",user_id])
  }
}
