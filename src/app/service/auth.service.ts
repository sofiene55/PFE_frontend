import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isAuth:boolean=false;
  idUser?:any=this.getRolel();
  userRole?:string;

  constructor() {

    if(this.getId()){


      this.isAuth=true
      this.idUser=this.getRolel()
    }
    else{
      console.log(this.getId())
      this.isAuth=false
    }

   }




  saveAuth(id:string,role:string){
    localStorage.setItem('hub/id',btoa(id))
    localStorage.setItem('hub/role',btoa(role));
  }

  saveSession(id:string,role:string){
    sessionStorage.setItem('hub/id',btoa(id));
    sessionStorage.setItem('hub/role',btoa(role));
  }

  getId(){
    if(localStorage.getItem('hub/id')){
      return atob(localStorage.getItem('hub/id')!)
    }
    if(sessionStorage.getItem('hub/id')){
      return atob(sessionStorage.getItem('hub/id')!)
    }
    return null;
  }

  getRolel(){
    if(localStorage.getItem('hub/role')){
      return atob(localStorage.getItem('hub/role')!)
    }
    if(sessionStorage.getItem('hub/role')){
      return atob(sessionStorage.getItem('hub/role')!)
    }
    return null
  }

  deleteId(){
    localStorage.removeItem('hub/id');
  }

  deleteRole(){
    localStorage.removeItem('hub/role')
  }

  deleteSession(){
    sessionStorage.removeItem('hub/id');
    sessionStorage.removeItem('hub/role');
  }

  getRoleForNavBar():Observable<any>{
    let output:any=this.getRolel()
    console.log(output)
    return of(output)
  }
}
