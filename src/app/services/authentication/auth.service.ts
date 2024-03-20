import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, user  } from '@angular/fire/auth';

import { Firestore, collection, collectionData, doc, setDoc, updateDoc, 
  increment, addDoc,
getDoc, docData, deleteDoc, where, query, collectionSnapshots } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor
  (
    private auth: Auth,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) 
     {

     }

     
  signIn(params: any): Observable<any>
  {
    return from 
    (
      signInWithEmailAndPassword(this.auth, params.email,params.password)
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    )
  }
  signUp(params: any): Observable<any>
  {

    return from
    (
      createUserWithEmailAndPassword
      (
        this.auth,
        params.email,
        params.password
      )
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) => 
      throwError(() => new Error(this.translateFirebaseErrorMessageForSignUp(error)))
      )
    );
  }
  resetPassword(email: any): Observable<any>
  {
    return from
    (
      sendPasswordResetEmail
      (
        this.auth,
        email
      )
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) => 
      throwError(() => new Error(this.translateFirebaseErrorMessageForSignUp(error)))
      )
    );
  }
  translateFirebaseErrorMessageForSignUp({code, message}: FirebaseError) {
    if (code === "auth/admin-restricted-operation") {
      return "Email is badly formatted.";
    }
    if (code === "auth/email-already-in-use") {
      return "Email already in use.";
    }
    if (code === "auth/missing-email")
    {
      return "Missing email"
    }
    if (code === "auth/missing-password")
    {
      return "Missing password"
    }
    return message;
  }
  translateFirebaseErrorMessage({code, message}: FirebaseError) {
    console.log("hehehe", code)
    if (code === "auth/invalid-credential") 
    {
      return "User not found.";
    }
    if (code === "auth/wrong-password") 
    {
      return "User not found.";
    }
    if (code === "auth/invalid-email")
    {
      return "Missing email"
    }
    if (code === "auth/missing-password")
    {
      return "Missing password"
    }
    return message;
  }
  get isLoggedIn(): boolean 
  {
   // return (user !== null) ? true : false;
    return isPlatformBrowser(this.platformId) ? sessionStorage.getItem('user') != null || sessionStorage.getItem('user') == '' ? true : false : false
  }
  SignOut()
  {
    this.auth.signOut();
    sessionStorage.removeItem('user');
  }

  setUserToSessionStorage(userobject: any) 
  {
      if (isPlatformBrowser(this.platformId))
      sessionStorage.setItem('user', JSON.stringify(userobject));
  }

  getCurrentUserLoggedinSessionStorageObject()
  {
    if (isPlatformBrowser(this.platformId))
    return JSON.parse(sessionStorage.getItem('user') as any)
  }

}

type FirebaseError = {
  code: string;
  message: string
};
