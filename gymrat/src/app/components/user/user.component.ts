import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true

})
export class UserComponent {
  
  user: any = {
    id: '',
    name: '',
    exp: '',
    gym_id: '',
  };

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  imageSrc: string | undefined;
  constructor(private route: ActivatedRoute, private api:ApiService){}

  ngOnInit(){
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {

      this.user.id = userId;
      this.api.getUser(userId).subscribe(data => {  
        this.user = data     
        try {
          //this.imageSrc = this.bufferToBase64(this.user['image']['data']);    
          
        } catch (error) {
          
        }
        
        

      })
    }
  }
  updateUser(){

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  bufferToBase64(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    const base64String = btoa(String.fromCharCode.apply(null, Array.from(byteArray)));
    return base64String;
  }

}
