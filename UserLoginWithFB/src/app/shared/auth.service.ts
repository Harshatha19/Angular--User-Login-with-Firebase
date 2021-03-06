import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){ //login method
this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
localStorage.setItem('token', 'true');
this.router.navigate(['/dashboard']);
//  if(res.user?.emailVerified == true){ //verify email to continue to dashboard
//   this.router.navigate(['/dashboard']);
//  }else {
//    this.router.navigate(['/verify-email'])
//  }

}, err => {
alert(err.message);
this.router.navigate(['/login']);
})
  }

  register(email: string, password: string){ //register method
this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
alert('Registration successfull');
this.router.navigate(['/login']);
this.sendEmailForVerification(res.user);
}, err => {
  alert(err.message)
  this.router.navigate(['/register']);
})
  }

  logout(){ //logout method
this.fireauth.signOut().then(() => {
localStorage.removeItem('token');
this.router.navigate(['/login']);
}, err => {
  alert(err.message);

})
  }

  forgotPassword(email: string){
this.fireauth.sendPasswordResetEmail(email).then(()=>{
this.router.navigate(['/verify-email']);
}, err => {
alert('Something went wrong!');
})
}
sendEmailForVerification(user: any){
user.sendEmailForVerification().then((res: any)=>{
  this.router.navigate(['/verify-email'])
}, (err: any) => {
  alert('Something went wrong! Try again')
}) 
}
  
}
