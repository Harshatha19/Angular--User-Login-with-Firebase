import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";
  
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }
  register(){
    if(this.email == ''){
      alert('please enter email')
      return; 
    }
    if(this.password == ''){
      alert('please enter password')
      return; 
    }
  
    this.authservice.register(this.email, this.password);
    this.email= '';
    this.password = '';
  }
}
