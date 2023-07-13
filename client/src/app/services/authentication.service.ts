import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Auth,authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
          GoogleAuthProvider, 
          signInWithPopup,
          sendPasswordResetEmail,
          sendEmailVerification,
          user
          } 
        from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$=authState(this.auth);
   user1 = this.auth.currentUser;   
   readonly registerUrl;
   rootURL = '/api/open/user/signup/';
   
  constructor(private auth: Auth, private http: HttpClient) { 
    this.registerUrl = 'http://localhost:1000/api/open/user/signup/'
   }

 async login(username: any, password: any){
    return await signInWithEmailAndPassword(this.auth, username, password);
  }

  async signUp(username: any, email: any, password: any ){
    const singnup= await createUserWithEmailAndPassword(this.auth,email, password)
    return singnup;
  }

  async googleSignIn(){
    const provider = new GoogleAuthProvider();
   return await signInWithPopup(this.auth, provider);
  }

  forgotPassword(email: any){
    return from(sendPasswordResetEmail(this.auth, email))
  }

  logout(){
    return from(this.auth.signOut());
  }

  isLoggedIn() {
    var user = this.auth.currentUser;
    if (user?.emailVerified === true) {
      return true;
    }
    else {
      return false;
    }
  }

  saveUserInfo(userData: any){
  console.log("Inside UserData");
  console.log(userData);
  const userResponse =  this.http.post<any>(`${this.registerUrl}`,userData);
  console.log(userResponse);
  return userResponse ;
}

}
